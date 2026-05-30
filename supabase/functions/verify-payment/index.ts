// ═══════════════════════════════════════════════════════════════
// Supabase Edge Function: verify-payment
// Verifies Razorpay signature + captures PayPal payments
// Deploy: supabase functions deploy verify-payment
// ═══════════════════════════════════════════════════════════════

import { serve } from 'https://deno.land/std@0.177.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
async function generateHmacSha256(secret: string, data: string) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(data));
  return Array.from(new Uint8Array(signature))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    const authHeader = req.headers.get('Authorization')
    if (!authHeader) throw new Error('Missing authorization')

    const { data: { user }, error: authErr } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    )
    if (authErr || !user) throw new Error('Unauthorized')

    const body = await req.json()
    const { gateway, order_id } = body

    // Fetch order
    const { data: order } = await supabase
      .from('orders')
      .select('*')
      .eq('id', order_id)
      .eq('user_id', user.id)
      .single()

    if (!order) throw new Error('Order not found')
    if (order.status === 'paid') {
      return new Response(
        JSON.stringify({ success: true, already_paid: true }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // ══════════ RAZORPAY VERIFICATION ══════════
    if (gateway === 'razorpay') {
      const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = body
      const rzpKeyId = Deno.env.get('RAZORPAY_KEY_ID')!
      const rzpSecret = Deno.env.get('RAZORPAY_KEY_SECRET')!

      // HMAC-SHA256 signature verification
      const expectedSig = await generateHmacSha256(rzpSecret, `${razorpay_order_id}|${razorpay_payment_id}`)

      if (expectedSig !== razorpay_signature) {
        await supabase.from('orders').update({ status: 'failed' }).eq('id', order_id)
        throw new Error('Invalid payment signature — possible tampering detected')
      }

      // ── Fetch full payment details from Razorpay API to get phone number ──
      // NOTE: The frontend handler callback only returns payment_id/order_id/signature.
      // The contact (phone) field is only available via the Razorpay Payments API.
      let buyerPhone: string | null = null
      try {
        const rzpPaymentRes = await fetch(
          `https://api.razorpay.com/v1/payments/${razorpay_payment_id}`,
          { headers: { 'Authorization': 'Basic ' + btoa(`${rzpKeyId}:${rzpSecret}`) } }
        )
        const rzpPaymentData = await rzpPaymentRes.json()
        buyerPhone = rzpPaymentData.contact || null
        console.log(`[verify-payment] Razorpay contact: ${buyerPhone}, method: ${rzpPaymentData.method}`)
      } catch (e) {
        console.error('[verify-payment] Could not fetch Razorpay payment details:', e)
      }

      // Record payment
      const { data: payment } = await supabase
        .from('payments')
        .insert({
          order_id,
          gateway_payment_id: razorpay_payment_id,
          gateway_signature: razorpay_signature,
          amount: order.amount,
          currency: order.currency,
          method: body.method || 'unknown',
          status: 'captured',
          raw_response: body,
          verified_at: new Date().toISOString()
        })
        .select()
        .single()

      // Update order
      await supabase.from('orders').update({ status: 'paid', updated_at: new Date().toISOString() }).eq('id', order_id)

      // Save buyer's phone to profiles (fetched from Razorpay API above)
      if (buyerPhone) {
        await supabase.from('profiles').update({ phone: buyerPhone }).eq('id', user.id)
        console.log(`[verify-payment] Saved phone ${buyerPhone} for user ${user.id}`)
      }

      // Create enrollment
      await supabase.from('enrollments').upsert({
        user_id: user.id,
        course_id: order.course_id,
        payment_id: payment.id,
        enrolled_at: new Date().toISOString()
      }, { onConflict: 'user_id,course_id' })

      return new Response(
        JSON.stringify({ success: true, enrolled: true }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }



    // ══════════ PAYPAL CAPTURE ══════════
    if (gateway === 'paypal') {
      const { paypal_order_id } = body
      const ppClientId = Deno.env.get('PAYPAL_CLIENT_ID')!
      const ppSecret = Deno.env.get('PAYPAL_CLIENT_SECRET')!
      const ppBase = Deno.env.get('PAYPAL_ENV') === 'live'
        ? 'https://api-m.paypal.com'
        : 'https://api-m.sandbox.paypal.com'

      // Get token
      const tokenRes = await fetch(`${ppBase}/v1/oauth2/token`, {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + btoa(`${ppClientId}:${ppSecret}`),
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials'
      })
      const { access_token } = await tokenRes.json()

      // Capture payment
      const captureRes = await fetch(`${ppBase}/v2/checkout/orders/${paypal_order_id}/capture`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${access_token}`,
          'Content-Type': 'application/json'
        }
      })
      const captureData = await captureRes.json()

      if (captureData.status !== 'COMPLETED') {
        await supabase.from('orders').update({ status: 'failed' }).eq('id', order_id)
        throw new Error('PayPal payment not completed')
      }

      const captureId = captureData.purchase_units?.[0]?.payments?.captures?.[0]?.id

      const { data: payment } = await supabase
        .from('payments')
        .insert({
          order_id,
          gateway_payment_id: captureId || paypal_order_id,
          amount: order.amount,
          currency: order.currency,
          method: 'paypal',
          status: 'captured',
          raw_response: captureData,
          verified_at: new Date().toISOString()
        })
        .select()
        .single()

      await supabase.from('orders').update({ status: 'paid', updated_at: new Date().toISOString() }).eq('id', order_id)

      await supabase.from('enrollments').upsert({
        user_id: user.id,
        course_id: order.course_id,
        payment_id: payment.id,
        enrolled_at: new Date().toISOString()
      }, { onConflict: 'user_id,course_id' })

      return new Response(
        JSON.stringify({ success: true, enrolled: true }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    throw new Error('Unsupported gateway: ' + gateway)

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    )
  }
})
