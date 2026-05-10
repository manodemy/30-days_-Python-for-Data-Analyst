// ═══════════════════════════════════════════════════════════════
// Supabase Edge Function: create-order
// Handles Razorpay, Stripe, and PayPal order creation securely
// Deploy: supabase functions deploy create-order
// ═══════════════════════════════════════════════════════════════

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    // Verify JWT from request
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) throw new Error('Missing authorization header')

    const { data: { user }, error: authError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    )
    if (authError || !user) throw new Error('Unauthorized')

    const { gateway, currency, coupon_code } = await req.json()

    // ── Pricing logic ──
    let amount = currency === 'INR' ? 149900 : 1900  // paise / cents
    let currencyCode = currency || 'INR'

    // Apply coupon if provided
    if (coupon_code) {
      const { data: coupon } = await supabase
        .from('coupons')
        .select('*')
        .eq('code', coupon_code.toUpperCase())
        .eq('active', true)
        .single()

      if (coupon && coupon.used_count < coupon.max_uses) {
        amount = Math.round(amount * (1 - coupon.discount_percent / 100))
        await supabase
          .from('coupons')
          .update({ used_count: coupon.used_count + 1 })
          .eq('id', coupon.id)
      }
    }

    // Check if already enrolled
    const { data: existing } = await supabase
      .from('enrollments')
      .select('id')
      .eq('user_id', user.id)
      .eq('course_id', 'python-30day')
      .single()

    if (existing) {
      return new Response(
        JSON.stringify({ error: 'Already enrolled', enrolled: true }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    // ── Create order in DB ──
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: user.id,
        course_id: 'python-30day',
        amount,
        currency: currencyCode,
        gateway,
        status: 'pending'
      })
      .select()
      .single()

    if (orderError) throw orderError

    let gatewayResponse = {}

    // ══════════ RAZORPAY ══════════
    if (gateway === 'razorpay') {
      const rzpKeyId = Deno.env.get('RAZORPAY_KEY_ID')!
      const rzpSecret = Deno.env.get('RAZORPAY_KEY_SECRET')!

      const rzpRes = await fetch('https://api.razorpay.com/v1/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + btoa(`${rzpKeyId}:${rzpSecret}`)
        },
        body: JSON.stringify({
          amount,
          currency: currencyCode,
          receipt: order.id,
          notes: { course: 'python-30day', user_id: user.id }
        })
      })

      const rzpOrder = await rzpRes.json()
      if (rzpOrder.error) throw new Error(rzpOrder.error.description)

      // Update order with gateway ID
      await supabase
        .from('orders')
        .update({ gateway_order_id: rzpOrder.id })
        .eq('id', order.id)

      gatewayResponse = {
        razorpay_order_id: rzpOrder.id,
        razorpay_key_id: rzpKeyId,
        amount,
        currency: currencyCode,
        order_id: order.id
      }
    }

    // ══════════ STRIPE ══════════
    else if (gateway === 'stripe') {
      const stripeSecret = Deno.env.get('STRIPE_SECRET_KEY')!
      const origin = req.headers.get('origin') || 'https://your-username.github.io/manodemy_web'

      const params = new URLSearchParams()
      params.append('payment_method_types[]', 'card')
      params.append('line_items[0][price_data][currency]', currencyCode.toLowerCase())
      params.append('line_items[0][price_data][unit_amount]', String(amount))
      params.append('line_items[0][price_data][product_data][name]', 'Manodemy — 30-Day Python Masterclass')
      params.append('line_items[0][price_data][product_data][description]', '30 Interactive Notebooks • 750+ Interview Questions • Lifetime Access')
      params.append('line_items[0][quantity]', '1')
      params.append('mode', 'payment')
      params.append('success_url', `${origin}/payment-success.html?session_id={CHECKOUT_SESSION_ID}&order_id=${order.id}`)
      params.append('cancel_url', `${origin}/payment-failed.html?order_id=${order.id}`)
      params.append('client_reference_id', order.id)
      params.append('customer_email', user.email || '')
      params.append('metadata[user_id]', user.id)
      params.append('metadata[course_id]', 'python-30day')

      const stripeRes = await fetch('https://api.stripe.com/v1/checkout/sessions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${stripeSecret}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params.toString()
      })

      const session = await stripeRes.json()
      if (session.error) throw new Error(session.error.message)

      await supabase
        .from('orders')
        .update({ gateway_order_id: session.id })
        .eq('id', order.id)

      gatewayResponse = {
        stripe_session_url: session.url,
        order_id: order.id
      }
    }

    // ══════════ PAYPAL ══════════
    else if (gateway === 'paypal') {
      const ppClientId = Deno.env.get('PAYPAL_CLIENT_ID')!
      const ppSecret = Deno.env.get('PAYPAL_CLIENT_SECRET')!
      const ppBase = Deno.env.get('PAYPAL_ENV') === 'live'
        ? 'https://api-m.paypal.com'
        : 'https://api-m.sandbox.paypal.com'

      // Get access token
      const tokenRes = await fetch(`${ppBase}/v1/oauth2/token`, {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + btoa(`${ppClientId}:${ppSecret}`),
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials'
      })
      const tokenData = await tokenRes.json()

      // Create order
      const ppAmount = (amount / 100).toFixed(2)
      const ppRes = await fetch(`${ppBase}/v2/checkout/orders`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${tokenData.access_token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          intent: 'CAPTURE',
          purchase_units: [{
            reference_id: order.id,
            description: 'Manodemy — 30-Day Python Masterclass',
            amount: { currency_code: currencyCode, value: ppAmount }
          }]
        })
      })

      const ppOrder = await ppRes.json()

      await supabase
        .from('orders')
        .update({ gateway_order_id: ppOrder.id })
        .eq('id', order.id)

      gatewayResponse = {
        paypal_order_id: ppOrder.id,
        order_id: order.id
      }
    }

    return new Response(
      JSON.stringify(gatewayResponse),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    )
  }
})
