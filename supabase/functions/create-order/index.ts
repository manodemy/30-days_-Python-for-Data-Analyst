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

    const { gateway, currency, coupon_code, final_amount, referral_code, batch_id } = await req.json()

    // ── Dynamic Pricing from settings table ──
    const { data: pricingSetting } = await supabase.from('settings').select('value').eq('key', 'pricing').single()
    const prices = pricingSetting?.value || { inr: 149900, usd: 1900 }
    let amount = currency === 'INR' ? prices.inr : prices.usd  // paise / cents
    let currencyCode = currency || 'INR'
    const originalAmount = amount // capture pre-discount price for discount calculation

    // ── Use client-side pre-calculated amount if provided (already validated) ──
    // This ensures Razorpay always receives the exact discounted price the user saw
    if (final_amount && final_amount > 0 && final_amount < amount) {
      console.log(`[Order] Using client pre-calculated amount: ${final_amount} (was ${amount})`)
      amount = Math.round(final_amount)
    } else if (coupon_code) {
      // Fallback: apply coupon server-side if no final_amount provided
      console.log(`[Order] Checking coupon: ${coupon_code}`)
      const { data: coupon } = await supabase
        .from('coupons')
        .select('*')
        .eq('code', coupon_code.toUpperCase())
        .single()

      if (coupon) {
        const isCouponActive = (coupon.is_active === true && coupon.active !== false)
        const appliesTo = coupon.applies_to || 'both'
        const currencyMatch = (appliesTo === 'both' || appliesTo === currencyCode)
        const notExpired = !coupon.expires_at || new Date(coupon.expires_at) > new Date()
        const hasUses = !coupon.max_uses || (coupon.used_count || 0) < coupon.max_uses

        if (isCouponActive && currencyMatch && notExpired && hasUses) {
          const type = coupon.discount_type || 'percentage'
          // discount_value stores the amount for BOTH types (discount_percent is always NULL)
          const val = coupon.discount_value || coupon.discount_percent || 0
          console.log(`[Order] Coupon type: ${type}, val: ${val}`)

          if (type === 'percentage') {
            amount = Math.round(amount * (1 - val / 100))
          } else {
            // val is in whole rupees (e.g. 1000), convert to paise
            amount = Math.max(0, amount - (val * 100))
          }

          await supabase
            .from('coupons')
            .update({ used_count: (coupon.used_count || 0) + 1 })
            .eq('id', coupon.id)
        }
      }
    }

    // ── Referral Buyer Discount ──
    // If a valid referral code is present, apply a discount to the buyer's price.
    // Commission is NOT credited here — that happens in verify-payment / payment-webhook.
    let validatedReferralCode: string | null = null
    if (referral_code && typeof referral_code === 'string' && referral_code.trim().length > 0) {
      const code = referral_code.trim().toUpperCase()
      const { data: refCodeRow } = await supabase
        .from('referral_codes')
        .select('user_id, is_active')
        .eq('code', code)
        .single()

      if (refCodeRow && refCodeRow.is_active && refCodeRow.user_id !== user.id) {
        // Code is valid and not a self-referral — apply buyer discount
        const { data: refConfig } = await supabase
          .from('settings')
          .select('value')
          .eq('key', 'referral_config')
          .single()

        const cfg = refConfig?.value || {}
        if (cfg.program_active !== false) {
          const discount = currencyCode === 'INR'
            ? (cfg.discount_inr || 10000)   // ₹100 in paise
            : (cfg.discount_usd || 100)      // $1 in cents

          amount = Math.max(100, amount - discount) // floor at 1 rupee/cent
          validatedReferralCode = code
          console.log(`[Order] Referral discount applied: -${discount} ${currencyCode} for code ${code}`)
        }
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

    // ── Compute discount value in INR (for analytics) ──
    // originalAmount and amount are in paise/cents; convert to whole currency for INR column
    const INR_USD_RATE = 83.5
    let coupon_discount_inr = 0
    if (originalAmount > amount) {
      const discountRaw = (originalAmount - amount) / 100.0 // convert from paise/cents
      coupon_discount_inr = currencyCode === 'INR' ? discountRaw : Math.round(discountRaw * INR_USD_RATE)
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
        status: 'pending',
        coupon_code: coupon_code ? coupon_code.toUpperCase() : null,  // ← save applied coupon code
        coupon_discount_inr,                                            // ← save discount amount in INR
        referral_code: validatedReferralCode,                            // ← save referral code for commission
        batch_id: batch_id || null                                      // ← save selected batch ID
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
