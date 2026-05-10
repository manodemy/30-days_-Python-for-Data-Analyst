// ═══════════════════════════════════════════════════════════════
// Supabase Edge Function: payment-webhook
// Receives webhooks from Razorpay and Stripe (no auth required)
// Deploy: supabase functions deploy payment-webhook --no-verify-jwt
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

serve(async (req) => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  )

  const url = new URL(req.url)
  const provider = url.searchParams.get('provider') // ?provider=razorpay or ?provider=stripe

  try {
    const rawBody = await req.text()

    // ══════════ RAZORPAY WEBHOOK ══════════
    if (provider === 'razorpay') {
      const webhookSecret = Deno.env.get('RAZORPAY_WEBHOOK_SECRET')!
      const signature = req.headers.get('x-razorpay-signature')!

      const expectedSig = await generateHmacSha256(webhookSecret, rawBody)
      if (expectedSig !== signature) {
        return new Response('Invalid signature', { status: 401 })
      }

      const event = JSON.parse(rawBody)
      const eventType = event.event

      if (eventType === 'payment.captured') {
        const payment = event.payload.payment.entity
        const rzpOrderId = payment.order_id

        // Find our order
        const { data: order } = await supabase
          .from('orders')
          .select('*')
          .eq('gateway_order_id', rzpOrderId)
          .single()

        if (order && order.status !== 'paid') {
          // Record payment
          const { data: paymentRecord } = await supabase
            .from('payments')
            .insert({
              order_id: order.id,
              gateway_payment_id: payment.id,
              amount: payment.amount,
              currency: payment.currency,
              method: payment.method,
              status: 'captured',
              raw_response: payment,
              verified_at: new Date().toISOString()
            })
            .select()
            .single()

          // Update order
          await supabase
            .from('orders')
            .update({ status: 'paid', updated_at: new Date().toISOString() })
            .eq('id', order.id)

          // Create enrollment
          await supabase.from('enrollments').upsert({
            user_id: order.user_id,
            course_id: order.course_id,
            payment_id: paymentRecord?.id,
            enrolled_at: new Date().toISOString()
          }, { onConflict: 'user_id,course_id' })
        }
      }

      if (eventType === 'payment.failed') {
        const payment = event.payload.payment.entity
        const { data: order } = await supabase
          .from('orders')
          .select('id')
          .eq('gateway_order_id', payment.order_id)
          .single()

        if (order) {
          await supabase.from('orders').update({ status: 'failed' }).eq('id', order.id)
          await supabase.from('payments').insert({
            order_id: order.id,
            gateway_payment_id: payment.id,
            amount: payment.amount,
            currency: payment.currency,
            status: 'failed',
            raw_response: payment
          })
        }
      }

      return new Response(JSON.stringify({ received: true }), { status: 200 })
    }

    // ══════════ STRIPE WEBHOOK ══════════
    if (provider === 'stripe') {
      const stripeWebhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')!
      const sigHeader = req.headers.get('stripe-signature')!

      // Stripe signature verification
      const elements = sigHeader.split(',')
      const timestamp = elements.find(e => e.startsWith('t='))?.split('=')[1]
      const v1Sig = elements.find(e => e.startsWith('v1='))?.split('=')[1]

      const signedPayload = `${timestamp}.${rawBody}`
      const expectedSig = await generateHmacSha256(stripeWebhookSecret, signedPayload)

      if (expectedSig !== v1Sig) {
        return new Response('Invalid signature', { status: 401 })
      }

      const event = JSON.parse(rawBody)

      if (event.type === 'checkout.session.completed') {
        const session = event.data.object
        const sessionId = session.id
        const userId = session.metadata?.user_id
        const courseId = session.metadata?.course_id || 'python-30day'

        const { data: order } = await supabase
          .from('orders')
          .select('*')
          .eq('gateway_order_id', sessionId)
          .single()

        if (order && order.status !== 'paid') {
          const { data: paymentRecord } = await supabase
            .from('payments')
            .insert({
              order_id: order.id,
              gateway_payment_id: session.payment_intent,
              amount: session.amount_total,
              currency: session.currency?.toUpperCase(),
              method: 'card',
              status: 'captured',
              raw_response: session,
              verified_at: new Date().toISOString()
            })
            .select()
            .single()

          await supabase
            .from('orders')
            .update({ status: 'paid', updated_at: new Date().toISOString() })
            .eq('id', order.id)

          await supabase.from('enrollments').upsert({
            user_id: order.user_id,
            course_id: courseId,
            payment_id: paymentRecord?.id,
            enrolled_at: new Date().toISOString()
          }, { onConflict: 'user_id,course_id' })
        }
      }

      return new Response(JSON.stringify({ received: true }), { status: 200 })
    }

    return new Response('Unknown provider', { status: 400 })

  } catch (error) {
    console.error('Webhook error:', error)
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }
})
