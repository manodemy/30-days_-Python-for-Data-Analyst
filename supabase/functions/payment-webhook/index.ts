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

// ─────────────────────────────────────────────────────────────
// Referral Commission Logic
// Called after enrollment is confirmed. Idempotent via UNIQUE(order_id).
// ─────────────────────────────────────────────────────────────
async function processReferralCommission(supabase: any, order: any, buyerUserId: string) {
  try {
    if (!order.referral_code) return;

    // IDEMPOTENCY: check if earning already exists for this order
    const { data: existing } = await supabase
      .from('referral_earnings')
      .select('id')
      .eq('order_id', order.id)
      .single();
    if (existing) {
      console.log(`[Referral] Earning already exists for order ${order.id} — skipping`);
      return;
    }

    // Look up referrer
    const { data: refCode } = await supabase
      .from('referral_codes')
      .select('user_id')
      .eq('code', order.referral_code)
      .eq('is_active', true)
      .single();
    if (!refCode) return;

    const referrerUserId = refCode.user_id;

    // Anti-fraud: self-referral
    if (referrerUserId === buyerUserId) return;

    // Get both profiles
    const [{ data: referrerProfile }, { data: buyerProfile }] = await Promise.all([
      supabase.from('profiles').select('country, referral_banned').eq('id', referrerUserId).single(),
      supabase.from('profiles').select('country').eq('id', buyerUserId).single()
    ]);

    if (referrerProfile?.referral_banned) return;

    // Get config
    const { data: configRow } = await supabase.from('settings').select('value').eq('key', 'referral_config').single();
    const cfg = configRow?.value || {};
    if (cfg.program_active === false) return;

    // Velocity check: max referrals per day
    const maxPerDay = cfg.max_referrals_per_day || 10;
    const dayAgo = new Date(Date.now() - 86400000).toISOString();
    const { count: todayCount } = await supabase
      .from('referral_earnings')
      .select('id', { count: 'exact', head: true })
      .eq('referrer_user_id', referrerUserId)
      .gte('created_at', dayAgo);
    if ((todayCount || 0) >= maxPerDay) {
      console.log(`[Referral] Velocity limit reached for ${referrerUserId}`);
      return;
    }

    const buyerCountry = buyerProfile?.country || 'US';
    const referrerCountry = referrerProfile?.country || 'US';
    const isBuyerIndian = buyerCountry === 'IN';
    const isReferrerIndian = referrerCountry === 'IN';

    const originalAmount = isBuyerIndian ? (cfg.reward_inr || 20000) : (cfg.reward_usd || 200);
    const originalCurrency = isBuyerIndian ? 'INR' : 'USD';
    const payoutCurrency = isReferrerIndian ? 'INR' : 'USD';
    const isCrossBorder = originalCurrency !== payoutCurrency;

    let creditedAmount = originalAmount;
    let exchangeRate: number | null = null;
    let exchangeRateSource: string | null = null;
    let exchangeRateTimestamp: string | null = null;

    if (isCrossBorder) {
      // Try cached rate first
      const { data: cached } = await supabase
        .from('exchange_rate_cache')
        .select('rate, source, fetched_at')
        .eq('base_currency', 'USD')
        .eq('target_currency', 'INR')
        .gt('expires_at', new Date().toISOString())
        .single();

      if (cached) {
        exchangeRate = cached.rate;
        exchangeRateSource = cached.source;
        exchangeRateTimestamp = cached.fetched_at;
      } else {
        try {
          const rateRes = await fetch('https://api.exchangerate-api.com/v4/latest/USD', { signal: AbortSignal.timeout(5000) });
          const rateData = await rateRes.json();
          exchangeRate = rateData.rates?.INR || 83.50;
          exchangeRateSource = 'https://api.exchangerate-api.com/v4/latest/USD';
          exchangeRateTimestamp = new Date().toISOString();
          const cacheMinutes = cfg.exchange_rate_cache_minutes || 60;
          await supabase.from('exchange_rate_cache').upsert({
            base_currency: 'USD', target_currency: 'INR',
            rate: exchangeRate, source: exchangeRateSource,
            fetched_at: exchangeRateTimestamp,
            expires_at: new Date(Date.now() + cacheMinutes * 60000).toISOString()
          }, { onConflict: 'base_currency,target_currency' });
        } catch {
          // Fallback: use last known rate
          const { data: lastKnown } = await supabase
            .from('exchange_rate_cache').select('rate, source, fetched_at')
            .eq('base_currency', 'USD').eq('target_currency', 'INR')
            .order('fetched_at', { ascending: false }).limit(1).single();
          exchangeRate = lastKnown?.rate || 83.50;
          exchangeRateSource = 'fallback';
          exchangeRateTimestamp = lastKnown?.fetched_at || new Date().toISOString();
        }
      }

      if (originalCurrency === 'USD' && payoutCurrency === 'INR') {
        creditedAmount = Math.round((originalAmount / 100) * exchangeRate! * 100);
      } else if (originalCurrency === 'INR' && payoutCurrency === 'USD') {
        creditedAmount = Math.round((originalAmount / 100) / exchangeRate! * 100);
      }
    }

    // Yearly cap check (Indian FY: April–March; cap checked against created_at)
    const now = new Date();
    const fyStart = now.getMonth() >= 3
      ? new Date(now.getFullYear(), 3, 1)
      : new Date(now.getFullYear() - 1, 3, 1);

    const { data: fyEarnings } = await supabase
      .from('referral_earnings')
      .select('credited_amount')
      .eq('referrer_user_id', referrerUserId)
      .in('status', ['earned', 'confirmed', 'paid'])
      .gte('created_at', fyStart.toISOString());

    const fyTotal = (fyEarnings || []).reduce((s: number, e: any) => s + e.credited_amount, 0);
    const yearlyCap = isReferrerIndian ? (cfg.yearly_cap_inr || 1000000) : (cfg.yearly_cap_usd || 12000);

    if (fyTotal + creditedAmount > yearlyCap) {
      console.log(`[Referral] Cap exceeded for ${referrerUserId}: FY total ${fyTotal} + ${creditedAmount} > ${yearlyCap}`);
      return;
    }

    // Create the earning
    const coolingDays = cfg.cooling_period_days || 7;
    const coolingEndsAt = new Date(Date.now() + coolingDays * 86400000).toISOString();

    const { error: insertError } = await supabase.from('referral_earnings').insert({
      referrer_user_id: referrerUserId,
      referred_user_id: buyerUserId,
      order_id: order.id,
      buyer_country: buyerCountry,
      referrer_country: referrerCountry,
      is_cross_border: isCrossBorder,
      original_amount: originalAmount,
      original_currency: originalCurrency,
      credited_amount: creditedAmount,
      credited_currency: payoutCurrency,
      exchange_rate: exchangeRate,
      exchange_rate_source: exchangeRateSource,
      exchange_rate_timestamp: exchangeRateTimestamp,
      status: 'earned',
      cooling_ends_at: coolingEndsAt
    });

    // 23505 = unique_violation: another path already created the earning — that's fine
    if (insertError && insertError.code === '23505') {
      console.log(`[Referral] Race condition: earning already created for order ${order.id}`);
      return;
    }
    if (insertError) {
      console.error('[Referral] Insert error:', insertError);
      return;
    }

    // Increment purchase count on referral code
    await supabase.rpc('increment_referral_purchases', { p_code: order.referral_code });

    // Log purchase event
    await supabase.from('referral_tracking').insert({
      referrer_user_id: referrerUserId,
      referral_code: order.referral_code,
      referred_user_id: buyerUserId,
      event_type: 'purchase',
      order_id: order.id,
      metadata: { is_cross_border: isCrossBorder, exchange_rate: exchangeRate }
    });

    // Notify referrer
    const sym = payoutCurrency === 'INR' ? '₹' : '$';
    const decimals = payoutCurrency === 'INR' ? 0 : 2;
    const formattedAmount = `${sym}${(creditedAmount / 100).toFixed(decimals)}`;
    const crossNote = isCrossBorder
      ? ` (converted from ${originalCurrency === 'USD' ? `$${(originalAmount/100).toFixed(2)}` : `₹${(originalAmount/100).toFixed(0)}`})`
      : '';

    await supabase.from('notifications').insert({
      type: 'referral',
      title: '🎉 Referral Earned!',
      body: `You earned ${formattedAmount}${crossNote} from a referral! Withdrawable in ${coolingDays} days.`,
      metadata: { referrer_user_id: referrerUserId }
    });

    console.log(`[Referral] Commission created: ${payoutCurrency} ${creditedAmount} for user ${referrerUserId}`);
  } catch (err) {
    console.error('[Referral] processReferralCommission error:', err);
  }
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

          // Save buyer's phone to profiles if available
          if (payment.contact) {
            await supabase
              .from('profiles')
              .update({ phone: payment.contact })
              .eq('id', order.user_id)
            console.log(`[payment-webhook] Saved phone ${payment.contact} for user ${order.user_id}`)
          }

          // Create enrollment
          await supabase.from('enrollments').upsert({
            user_id: order.user_id,
            course_id: order.course_id,
            payment_id: paymentRecord?.id,
            enrolled_at: new Date().toISOString(),
            batch_id: order.batch_id || null
          }, { onConflict: 'user_id,course_id' })

          // Trigger Referral Commission (idempotent)
          await processReferralCommission(supabase, order, order.user_id)
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
            enrolled_at: new Date().toISOString(),
            batch_id: order.batch_id || null
          }, { onConflict: 'user_id,course_id' })

          // Trigger Referral Commission (idempotent)
          await processReferralCommission(supabase, order, order.user_id)
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
