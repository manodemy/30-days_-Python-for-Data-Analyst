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
        // $2 (200 cents) × 83.70 = ₹167.40 (16740 paise)
        creditedAmount = Math.round((originalAmount / 100) * exchangeRate! * 100);
      } else if (originalCurrency === 'INR' && payoutCurrency === 'USD') {
        // ₹200 (20000 paise) / 83.70 = $2.39 (239 cents)
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
    // Non-fatal: log but don't fail the payment
    console.error('[Referral] processReferralCommission error:', err);
  }
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
      // Safeguard: If order was marked paid by webhook first, check if profile phone is set.
      if (gateway === 'razorpay' && body.razorpay_payment_id) {
        try {
          const { data: profile } = await supabase
            .from('profiles')
            .select('phone')
            .eq('id', user.id)
            .single()

          if (!profile || !profile.phone) {
            const rzpKeyId = Deno.env.get('RAZORPAY_KEY_ID')!
            const rzpSecret = Deno.env.get('RAZORPAY_KEY_SECRET')!
            const rzpPaymentRes = await fetch(
              `https://api.razorpay.com/v1/payments/${body.razorpay_payment_id}`,
              { headers: { 'Authorization': 'Basic ' + btoa(`${rzpKeyId}:${rzpSecret}`) } }
            )
            const rzpPaymentData = await rzpPaymentRes.json()
            const buyerPhone = rzpPaymentData.contact || null
            if (buyerPhone) {
              await supabase.from('profiles').update({ phone: buyerPhone }).eq('id', user.id)
            }
          }
        } catch (e) {
          console.error('[verify-payment] Could not check/fetch Razorpay payment details:', e)
        }
      }

      // Attempt referral commission even on already-paid path (UNIQUE guard makes it idempotent)
      await processReferralCommission(supabase, order, user.id)

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

      const expectedSig = await generateHmacSha256(rzpSecret, `${razorpay_order_id}|${razorpay_payment_id}`)

      if (expectedSig !== razorpay_signature) {
        await supabase.from('orders').update({ status: 'failed' }).eq('id', order_id)
        throw new Error('Invalid payment signature — possible tampering detected')
      }

      let buyerPhone: string | null = null
      try {
        const rzpPaymentRes = await fetch(
          `https://api.razorpay.com/v1/payments/${razorpay_payment_id}`,
          { headers: { 'Authorization': 'Basic ' + btoa(`${rzpKeyId}:${rzpSecret}`) } }
        )
        const rzpPaymentData = await rzpPaymentRes.json()
        buyerPhone = rzpPaymentData.contact || null
      } catch (e) {
        console.error('[verify-payment] Could not fetch Razorpay payment details:', e)
      }

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

      await supabase.from('orders').update({ status: 'paid', updated_at: new Date().toISOString() }).eq('id', order_id)

      if (buyerPhone) {
        await supabase.from('profiles').update({ phone: buyerPhone }).eq('id', user.id)
      }

      await supabase.from('enrollments').upsert({
        user_id: user.id,
        course_id: order.course_id,
        payment_id: payment.id,
        enrolled_at: new Date().toISOString(),
        batch_id: order.batch_id || null
      }, { onConflict: 'user_id,course_id' })

      // ── Referral Commission (idempotent — UNIQUE on order_id prevents double) ──
      await processReferralCommission(supabase, order, user.id)

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

      const tokenRes = await fetch(`${ppBase}/v1/oauth2/token`, {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + btoa(`${ppClientId}:${ppSecret}`),
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials'
      })
      const { access_token } = await tokenRes.json()

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
        enrolled_at: new Date().toISOString(),
        batch_id: order.batch_id || null
      }, { onConflict: 'user_id,course_id' })

      // ── Referral Commission ──
      await processReferralCommission(supabase, order, user.id)

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
