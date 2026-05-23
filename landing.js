// ═══════ MANODEMY — Landing Page Engine ═══════
// ═══════ SITE VOICE ENGINE (ADVANCED) ═══════
const SiteVoice = (() => {
  let voice = null;
  let hasSpokenWelcome = false;
  let hasSpokenCurriculum = false;
  let queuedSpeech = null;

  const NARRATIONS = {
    buyNow: [
      "Great choice! Taking you to secure checkout.",
      "Securing your checkout now. You're making a great investment in your skills."
    ],
    curriculum: [
      "Here is your 30-day roadmap. Every single day is an interactive coding notebook.",
      "Take a look at the curriculum. Over 750 technical interview questions await you."
    ]
  };

  function loadVoices() {
    if (!window.speechSynthesis) return;
    const all = speechSynthesis.getVoices();
    if (!all.length) return;
    const tiers = [
      v => /natural/i.test(v.name) && /neerja|prabhat/i.test(v.name) && v.lang.startsWith('en'),
      v => /natural/i.test(v.name) && v.lang.startsWith('en-IN'),
      v => /online/i.test(v.name) && v.lang.startsWith('en-IN'),
      v => v.lang.startsWith('en-IN'),
      v => /natural/i.test(v.name) && /jenny|aria|ana|sonia/i.test(v.name) && v.lang.startsWith('en'),
      v => /natural/i.test(v.name) && v.lang.startsWith('en')
    ];
    for (const test of tiers) {
      const found = all.find(test);
      if (found) { voice = found; return; }
    }
    voice = all[0];
  }

  function say(text) {
    if (!window.speechSynthesis) return;
    try {
      if (localStorage.getItem('mano_voice_muted') === '1') return;
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      if (voice) u.voice = voice;
      u.rate = 1.0;
      
      // Fix Chromium GC bug where utterance stops abruptly
      window._currentUtterance = u;
      
      speechSynthesis.speak(u);
      // Hack to unstick Chromium voice queue
      speechSynthesis.resume();
    } catch(e) {}
  }

  // Handle browser autoplay policies
  function queueOrSay(text) {
    if (navigator.userActivation && navigator.userActivation.hasBeenActive) {
      say(text);
    } else {
      queuedSpeech = text;
      const playOnInteraction = () => {
        if (queuedSpeech) say(queuedSpeech);
        queuedSpeech = null;
        document.removeEventListener('click', playOnInteraction);
        document.removeEventListener('keydown', playOnInteraction);
      };
      document.addEventListener('click', playOnInteraction, { once: true });
      document.addEventListener('keydown', playOnInteraction, { once: true });
    }
  }

  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

  function buyNowClick() {
    say(pick(NARRATIONS.buyNow));
  }

  function scrollCurriculum() {
    if (hasSpokenCurriculum) return;
    hasSpokenCurriculum = true;
    say(pick(NARRATIONS.curriculum));
  }

  if (window.speechSynthesis) {
    loadVoices();
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = loadVoices;
    }
  }

  return { buyNowClick, scrollCurriculum };
})();

// ═══════ MANODEMY — PRICE EDITOR & INTERACTIONS ═══════

// Navbar scroll shadow
const topBar = document.getElementById('topBar');
if (topBar) {
  window.addEventListener('scroll', () => {
    topBar.classList.toggle('scrolled', window.scrollY > 10);
  });
}


// Smooth scroll-reveal animation
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.stat-card, .feature-card, .cta-btn, .pricing-box').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// Curriculum Voice Observer
const curriculumObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      if (typeof SiteVoice !== 'undefined') SiteVoice.scrollCurriculum();
      curriculumObserver.disconnect();
    }
  });
}, { threshold: 0.3 });

document.addEventListener('DOMContentLoaded', () => {
  const curriculumGrid = document.querySelector('.curriculum-grid');
  if (curriculumGrid) curriculumObserver.observe(curriculumGrid);
});

// ═══════ SUPABASE CLIENT ═══════
const SUPABASE_URL = 'https://gvhnwmuyrwissgkumeif.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_x0gyXkcrCSaxSG23Zyi7qA__v1sBgOq';

// Payment gateway publishable keys (safe for frontend)
const RAZORPAY_KEY_ID = 'rzp_live_SnbHZn5Q7rYNAP';   // Live Razorpay key
const PAYPAL_CLIENT_ID = '';             // Set your PayPal client ID to enable

let supabaseClient = null;
try {
  if (window.supabase) {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  } else {

  }
} catch (e) {
  console.error("❌ Error initializing Supabase:", e);
}

// ═══════ GEO-PRICING & PAYMENT ROUTING ═══════
let userCountry = 'US';
let currentPricing = { amount: 1900, currency: 'USD', display: '$19', original: '$69', discount: '72% OFF' };

async function setupGeoPricing() {
  const priceNow = document.getElementById('priceNow');
  const priceOld = document.getElementById('priceOld');
  const discountBadge = document.getElementById('discountBadge');
  const buyPrice = document.getElementById('buyPrice');
  const checkoutAmount = document.getElementById('checkoutAmount');
  const checkoutOriginal = document.getElementById('checkoutOriginal');

  try {
    const response = await fetch('https://get.geojs.io/v1/ip/country.json');
    const data = await response.json();
    userCountry = data.country || 'US';
  } catch (error) {
    console.error("Geo-pricing API failed. Using default USD.", error);
    userCountry = 'US';
  }

  // Fetch dynamic pricing from Supabase settings
  let prices = { inr: 149900, usd: 1900, original_inr: 499900, original_usd: 6900, discount_label_inr: '70% OFF', discount_label_usd: '72% OFF' };
  try {
    const pRes = await fetch(SUPABASE_URL + '/functions/v1/get-pricing');
    if (pRes.ok) prices = await pRes.json();
  } catch (e) { console.log('Using fallback pricing'); }

  if (userCountry === 'IN') {
    const calcDisc = Math.round(((prices.original_inr - prices.inr) / prices.original_inr) * 100);
    currentPricing = { amount: prices.inr, currency: 'INR', display: '₹' + (prices.inr/100).toLocaleString('en-IN'), original: '₹' + (prices.original_inr/100).toLocaleString('en-IN'), discount: calcDisc + '% OFF' };
  } else {
    const calcDisc = Math.round(((prices.original_usd - prices.usd) / prices.original_usd) * 100);
    currentPricing = { amount: prices.usd, currency: 'USD', display: '$' + (prices.usd/100), original: '$' + (prices.original_usd/100), discount: calcDisc + '% OFF' };
  }

  if (priceNow) priceNow.textContent = currentPricing.display;
  if (priceOld) priceOld.textContent = currentPricing.original;
  if (buyPrice) buyPrice.textContent = currentPricing.display;
  if (discountBadge) discountBadge.textContent = currentPricing.discount;
  if (checkoutAmount) checkoutAmount.textContent = currentPricing.display;
  if (checkoutOriginal) checkoutOriginal.textContent = currentPricing.original;

  setupGatewayButtons();
}

function setupGatewayButtons() {
  const container = document.getElementById('gatewayButtons');
  if (!container) return;

  if (userCountry === 'IN') {
    container.innerHTML = `
      <button class="gateway-btn razorpay" id="payRazorpay" type="button">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 4l5.5 16h3L17 7.5 14.5 20h3L23 4h-3l-4 11L12.5 4h-3l-4 11L1.5 4H3z"/></svg>
        Pay with Razorpay — ${currentPricing.display}
      </button>
      <p style="text-align:center;font-size:0.75rem;color:#64748b;margin:0">UPI • Cards • Net Banking • Wallets</p>
    `;
  } else {
    container.innerHTML = `
      <button class="gateway-btn stripe" id="payStripe" type="button">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z"/></svg>
        Pay with Card — ${currentPricing.display}
      </button>
      <button class="gateway-btn paypal" id="payPaypal" type="button">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797H9.603c-.564 0-1.04.408-1.13.964L7.076 21.337z"/></svg>
        Pay with PayPal — ${currentPricing.display}
      </button>
      <p style="text-align:center;font-size:0.75rem;color:#64748b;margin:0">Visa • Mastercard • PayPal Balance</p>
    `;
  }

  // Attach event listeners
  const rzpBtn = document.getElementById('payRazorpay');
  const stripeBtn = document.getElementById('payStripe');
  const ppBtn = document.getElementById('payPaypal');

  if (rzpBtn) rzpBtn.addEventListener('click', () => { if (typeof SiteVoice !== 'undefined') SiteVoice.buyNowClick(); initiatePayment('razorpay'); });
  if (stripeBtn) stripeBtn.addEventListener('click', () => { if (typeof SiteVoice !== 'undefined') SiteVoice.buyNowClick(); initiatePayment('stripe'); });
  if (ppBtn) ppBtn.addEventListener('click', () => { if (typeof SiteVoice !== 'undefined') SiteVoice.buyNowClick(); initiatePayment('paypal'); });
}

// ═══════ CHECKOUT MODAL ═══════
const checkoutOverlay = document.getElementById('checkoutOverlay');
const checkoutCloseBtn = document.getElementById('checkoutClose');
const buyBtn = document.getElementById('buyBtn');
const topBuyBtn = document.querySelector('.top-buy-btn');

window.pendingBuyIntent = false;

function openCheckout() {
  if (!supabaseClient) {
    alert('Please sign in first to purchase the course.');
    return;
  }
  // Check if user is logged in
  supabaseClient.auth.getSession().then(({ data: { session } }) => {
    if (!session) {
      window.pendingBuyIntent = true;
      // Smooth scroll to hero section (where login is)
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // Pulse the login card
      const loginCard = document.querySelector('.landing-login-card');
      if (loginCard && loginCard.style.display !== 'none') {
        loginCard.classList.add('highlight-pulse');
        setTimeout(() => loginCard.classList.remove('highlight-pulse'), 2000);
      }
      setTimeout(() => document.getElementById('landingEmail')?.focus(), 500);
      return;
    }
    // ── Log Buy Click to activity_logs (feeds the funnel "Buy Clicks" metric) ──
    // DEDUP FIX: Only log once per page session — opening modal multiple times shouldn't
    // inflate the checkout count. SQL already uses COUNT(DISTINCT user_id) but this
    // prevents unnecessary DB writes and keeps data clean.
    if (!window._checkoutEventLogged) {
      window._checkoutEventLogged = true;
      supabaseClient.from('activity_logs').insert([{
        user_id: session.user.id,
        event_type: 'checkout_initiated',
        page_url: window.location.pathname,
        metadata: {
          currency: currentPricing.currency,
          amount: currentPricing.amount,
          country: userCountry
        }
      }]).then(({ error }) => {
        if (error) console.warn('[Telemetry] ⚠️ Buy click log failed:', error.message);
        else console.log('[Telemetry] ✅ checkout_initiated logged');
      });
    }
    if (checkoutOverlay) checkoutOverlay.classList.add('active');
  });
}

if (buyBtn) buyBtn.addEventListener('click', (e) => { e.preventDefault(); openCheckout(); });
if (topBuyBtn) topBuyBtn.addEventListener('click', (e) => { e.preventDefault(); openCheckout(); });
if (checkoutCloseBtn) checkoutCloseBtn.addEventListener('click', () => {
  checkoutOverlay?.classList.remove('active');
});
if (checkoutOverlay) checkoutOverlay.addEventListener('click', (e) => {
  if (e.target === checkoutOverlay) checkoutOverlay.classList.remove('active');
});
// Escape key closes checkout modal
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && checkoutOverlay?.classList.contains('active')) {
    checkoutOverlay.classList.remove('active');
  }
});

// ═══════ PAYMENT INITIATION ═══════
async function initiatePayment(gateway) {
  const spinner = document.getElementById('checkoutSpinner');
  const buttons = document.getElementById('gatewayButtons');

  try {
    if (spinner) spinner.classList.add('active');
    if (buttons) buttons.style.opacity = '0.4';

    const { data: { session } } = await supabaseClient.auth.getSession();
    if (!session) throw new Error('Please sign in first');

    const couponEl = document.getElementById('couponInput');
    const coupon = couponEl ? couponEl.value.trim() : '';

    // Call Supabase Edge Function to create order
    const res = await fetch(`${SUPABASE_URL}/functions/v1/create-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`
      },
      body: JSON.stringify({
        gateway,
        currency: currentPricing.currency,
        coupon_code: appliedCouponCode || coupon || undefined,
        final_amount: appliedCouponAmount || undefined  // pre-validated client-side amount
      })
    });

    const data = await res.json();
    if (data.error) {
      if (data.enrolled) {
        alert('You already have access! Redirecting to course...');
        localStorage.setItem('manodemy_enrolled', 'true');
        localStorage.setItem('manodemy_auth', 'true');
        window.location.href = 'day01.html';
        return;
      }
      throw new Error(data.error);
    }

    // ── RAZORPAY (lazy-load SDK) ──
    if (gateway === 'razorpay') {
      if (typeof Razorpay === 'undefined') {
        await new Promise((resolve, reject) => {
          const s = document.createElement('script');
          s.src = 'https://checkout.razorpay.com/v1/checkout.js';
          s.onload = resolve; s.onerror = reject;
          document.head.appendChild(s);
        });
      }

      // Use the pre-validated discounted amount if coupon was applied
      const finalAmount = appliedCouponAmount || data.amount;
      console.log('[Payment] Amount sent to Razorpay:', finalAmount, '| Server returned:', data.amount, '| Coupon amount:', appliedCouponAmount);

      const options = {
        key: RAZORPAY_KEY_ID,
        amount: finalAmount,
        currency: data.currency,
        order_id: data.razorpay_order_id,
        name: 'Manodemy',
        description: '30-Day Python Data Analytics Masterclass',
        handler: async function (response) {
          // Verify payment server-side
          try {
            const verifyRes = await fetch(`${SUPABASE_URL}/functions/v1/verify-payment`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session.access_token}`
              },
              body: JSON.stringify({
                gateway: 'razorpay',
                order_id: data.order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature
              })
            });
            const result = await verifyRes.json();
            if (result.success) {
              localStorage.setItem('manodemy_enrolled', 'true');
              window.location.href = `payment-success.html?order_id=${data.order_id}`;
            } else {
              window.location.href = `payment-failed.html?order_id=${data.order_id}`;
            }
          } catch (e) {
            window.location.href = `payment-failed.html?reason=verification`;
          }
        },
        prefill: { email: session.user.email },
        theme: { color: '#0B0F19' },
        modal: { ondismiss: () => { resetCheckoutUI(); } }
      };
      const rzp = new Razorpay(options);
      rzp.on('payment.failed', function (response) {
        window.location.href = `payment-failed.html?reason=declined`;
      });
      rzp.open();
      checkoutOverlay?.classList.remove('active');
    }

    // ── STRIPE ──
    else if (gateway === 'stripe') {
      if (data.stripe_session_url) {
        window.location.href = data.stripe_session_url;
      }
    }

    // ── PAYPAL ──
    else if (gateway === 'paypal') {
      // Load PayPal SDK dynamically then render buttons
      await loadPayPalSDK();
      checkoutOverlay?.classList.remove('active');
      await handlePayPalPayment(data, session);
    }

  } catch (error) {
    console.error('Payment error:', error);
    alert('Payment error: ' + error.message);
  } finally {
    resetCheckoutUI();
  }
}

function resetCheckoutUI() {
  const spinner = document.getElementById('checkoutSpinner');
  const buttons = document.getElementById('gatewayButtons');
  if (spinner) spinner.classList.remove('active');
  if (buttons) buttons.style.opacity = '1';
}

// ═══════ PAYPAL DYNAMIC LOADING ═══════
let paypalLoaded = false;
function loadPayPalSDK() {
  if (paypalLoaded) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=${currentPricing.currency}`;
    script.onload = () => { paypalLoaded = true; resolve(); };
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

async function handlePayPalPayment(orderData, session) {
  // Create a temporary container for PayPal buttons
  const ppContainer = document.createElement('div');
  ppContainer.id = 'paypal-button-container';
  ppContainer.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:3000;background:#111827;padding:2rem;border-radius:16px;border:1px solid rgba(255,255,255,0.1);min-width:350px';
  document.body.appendChild(ppContainer);

  paypal.Buttons({
    createOrder: () => orderData.paypal_order_id,
    onApprove: async (ppData) => {
      try {
        const verifyRes = await fetch(`${SUPABASE_URL}/functions/v1/verify-payment`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.access_token}`
          },
          body: JSON.stringify({
            gateway: 'paypal',
            order_id: orderData.order_id,
            paypal_order_id: ppData.orderID
          })
        });
        const result = await verifyRes.json();
        ppContainer.remove();
        if (result.success) {
          localStorage.setItem('manodemy_enrolled', 'true');
          window.location.href = `payment-success.html?order_id=${orderData.order_id}`;
        } else {
          window.location.href = `payment-failed.html?order_id=${orderData.order_id}`;
        }
      } catch (e) {
        ppContainer.remove();
        window.location.href = 'payment-failed.html?reason=verification';
      }
    },
    onCancel: () => { ppContainer.remove(); },
    onError: (err) => { ppContainer.remove(); alert('PayPal error. Please try again.'); }
  }).render('#paypal-button-container');
}

// ═══════ COUPON STATE (persisted for payment) ═══════
let appliedCouponCode = '';
let appliedCouponAmount = null; // discounted amount in paise/cents

// ═══════ COUPON VALIDATION ═══════
const couponApplyBtn = document.getElementById('couponApply');
if (couponApplyBtn) {
  couponApplyBtn.addEventListener('click', async () => {
    const input = document.getElementById('couponInput');
    const code = input?.value?.trim();
    if (!code) return;

    if (!supabaseClient) return;
    const { data, error } = await supabaseClient
      .from('coupons')
      .select('discount_type, discount_value, discount_percent, is_active, active, expires_at, valid_until, applies_to')
      .eq('code', code.toUpperCase())
      .single();

    console.log('[Coupon] Raw data from DB:', JSON.stringify(data));
    console.log('[Coupon] is_active:', data?.is_active, '| type:', typeof data?.is_active);
    console.log('[Coupon] active:', data?.active, '| type:', typeof data?.active);

    // Use Boolean() to handle PostgreSQL returning 1/0 or true/false or null
    const isActive = data
      ? (Boolean(data.is_active) === true && Boolean(data.active) !== false)
      : false;

    console.log('[Coupon] isActive result:', isActive);

    const expiry = data ? (data.expires_at || data.valid_until) : null;
    const isExpired = expiry && new Date(expiry) < new Date();
    
    const appliesTo = data?.applies_to || 'both';
    const currencyMatch = appliesTo === 'both' || appliesTo === currentPricing.currency;


    if (data && isActive && !isExpired && currencyMatch) {
      const type = data.discount_type || 'percentage';
      const val = data.discount_value ?? data.discount_percent ?? 0;
      
      let newAmount;
      let label;
      
      if (type === 'percentage') {
        newAmount = Math.round(currentPricing.amount * (1 - val / 100));
        label = `✅ ${val}% OFF!`;
      } else {
        newAmount = Math.max(0, currentPricing.amount - (val * 100));
        // MED-3 FIX: Use correct currency symbol based on user's detected pricing
        const currencySymbol = currentPricing.currency === 'INR' ? '₹' : '$';
        label = `✅ ${currencySymbol}${val} OFF!`;
      }

      const displayPrice = currentPricing.currency === 'INR'
        ? '₹' + (newAmount / 100).toLocaleString('en-IN')
        : '$' + (newAmount / 100);

      // ✅ Store discounted amount globally so initiatePayment uses it
      appliedCouponCode = code.toUpperCase();
      appliedCouponAmount = newAmount;
      
      // Update gateway button text only
      const razorpayBtn = document.getElementById('payRazorpay');
      const stripeBtn = document.getElementById('payStripe');
      const paypalBtn = document.getElementById('payPaypal');
      
      if (razorpayBtn) razorpayBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 4l5.5 16h3L17 7.5 14.5 20h3L23 4h-3l-4 11L12.5 4h-3l-4 11L1.5 4H3z"/></svg> Pay with Razorpay — ${displayPrice}`;
      if (stripeBtn) stripeBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z"/></svg> Pay with Card — ${displayPrice}`;
      if (paypalBtn) paypalBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797H9.603c-.564 0-1.04.408-1.13.964L7.076 21.337z"/></svg> Pay with PayPal — ${displayPrice}`;

      couponApplyBtn.textContent = label;
      couponApplyBtn.style.color = '#10B981';
    } else {
      // Reset any previously stored coupon on failure
      appliedCouponCode = '';
      appliedCouponAmount = null;

      let msg = '❌ Invalid';
      if (isExpired) msg = '❌ Expired';
      else if (!currencyMatch) msg = `❌ Only for ${appliesTo}`;
      
      couponApplyBtn.textContent = msg;
      setTimeout(() => { couponApplyBtn.textContent = 'Apply'; couponApplyBtn.style.color = ''; }, 2000);
    }
  });
}

// Run geo-pricing when DOM is ready
document.addEventListener('DOMContentLoaded', setupGeoPricing);


// ═══════ LANDING LOGIN CARD INTERACTIVITY (SUPABASE) ═══════
(async function initializeAuthentication() {
  // ═══════ AUTH STATE MANAGEMENT ═══════
  let authState = 'login'; // 'login' | 'signup' | 'forgot'

  const loginForm = document.getElementById('landingLoginForm');
  const btnGoogle = document.getElementById('google-signin-btn');
  const btnSubmit = document.getElementById('btnLandingSubmit');
  const linkForgot = document.getElementById('linkLandingForgot');
  const linkSignup = document.getElementById('linkLandingSignup');
  const linkBack = document.getElementById('linkBackToLogin');
  const authTitle = document.getElementById('authTitle');
  const authSubtitle = document.getElementById('authSubtitle');
  const authMsg = document.getElementById('authMessage');
  const socialSection = document.getElementById('socialAuthSection');
  const nameField = document.getElementById('landingName');
  const passwordField = document.getElementById('landingPassword');
  const confirmField = document.getElementById('landingConfirmPassword');

  const loginCard = document.querySelector('.landing-login-card');
  const heroVisual = document.querySelector('.hero-visual');
  const inlineLogo = document.querySelector('.python-logo-inline');
  const buyBtnEl = document.querySelector('.buy-btn');

  // ── Inline Message Helpers (replaces all alert/confirm/prompt) ──
  const setAuthMessage = (msg, type = 'info') => {
    if (!authMsg) return;
    authMsg.textContent = msg;
    authMsg.style.display = 'block';
    if (type === 'error') {
      authMsg.style.background = 'rgba(244, 63, 94, 0.15)';
      authMsg.style.color = '#F43F5E';
      authMsg.style.border = '1px solid rgba(244, 63, 94, 0.3)';
    } else if (type === 'success') {
      authMsg.style.background = 'rgba(16, 185, 129, 0.15)';
      authMsg.style.color = '#10B981';
      authMsg.style.border = '1px solid rgba(16, 185, 129, 0.3)';
    } else {
      authMsg.style.background = 'rgba(0, 230, 246, 0.1)';
      authMsg.style.color = '#00E6F6';
      authMsg.style.border = '1px solid rgba(0, 230, 246, 0.2)';
    }
  };
  const clearAuthMessage = () => { if (authMsg) authMsg.style.display = 'none'; };

  // ── State Switcher ──
  const switchAuthState = (state) => {
    authState = state;
    clearAuthMessage();

    if (state === 'login') {
      if (authTitle) authTitle.textContent = 'Join the Challenge';
      if (authSubtitle) authSubtitle.textContent = 'Sign in to start learning';
      if (socialSection) socialSection.style.display = '';
      if (nameField) nameField.style.display = 'none';
      if (passwordField) passwordField.style.display = '';
      if (confirmField) confirmField.style.display = 'none';
      if (btnSubmit) btnSubmit.textContent = 'Login';
      if (linkForgot) linkForgot.style.display = '';
      if (linkSignup) { linkSignup.style.display = ''; linkSignup.textContent = 'Create Account'; }
      if (linkBack) linkBack.style.display = 'none';
      // Restore normal spacing from compact signup mode
      if (loginForm) loginForm.style.gap = '';
      document.querySelectorAll('#landingLoginForm .landing-input').forEach(el => el.style.padding = '');
      if (btnSubmit) btnSubmit.style.padding = '';
      if (authSubtitle) authSubtitle.style.marginBottom = '';
    } else if (state === 'signup') {
      if (authTitle) authTitle.textContent = 'Create Account';
      if (authSubtitle) { authSubtitle.textContent = 'Join thousands of learners'; authSubtitle.style.marginBottom = '0.4rem'; }
      if (socialSection) socialSection.style.display = 'none';
      if (nameField) nameField.style.display = '';
      if (passwordField) passwordField.style.display = '';
      if (confirmField) confirmField.style.display = '';
      if (btnSubmit) btnSubmit.textContent = 'Sign Up';
      if (linkForgot) linkForgot.style.display = 'none';
      if (linkSignup) linkSignup.style.display = 'none';
      if (linkBack) linkBack.style.display = '';
      // Compact mode: reduce spacing to match login height
      if (loginForm) loginForm.style.gap = '0.5rem';
      document.querySelectorAll('#landingLoginForm .landing-input').forEach(el => el.style.padding = '0.55rem 0.8rem');
      if (btnSubmit) btnSubmit.style.padding = '0.65rem';
    } else if (state === 'forgot') {
      if (authTitle) authTitle.textContent = 'Reset Password';
      if (authSubtitle) authSubtitle.textContent = 'Enter your email to receive a reset link';
      if (socialSection) socialSection.style.display = 'none';
      if (nameField) nameField.style.display = 'none';
      if (passwordField) passwordField.style.display = 'none';
      if (confirmField) confirmField.style.display = 'none';
      if (btnSubmit) btnSubmit.textContent = 'Send Reset Link';
      if (linkForgot) linkForgot.style.display = 'none';
      if (linkSignup) linkSignup.style.display = 'none';
      if (linkBack) linkBack.style.display = '';
    }
  };

  // ── Login Animation ──
  const executeLoginAnimation = () => {
    if (!loginCard || loginCard.style.display === 'none') return;
    loginCard.classList.add('login-card-leaving');
    setTimeout(() => {
      loginCard.style.display = 'none';
      if (inlineLogo && heroVisual) {
        const firstRect = inlineLogo.getBoundingClientRect();
        heroVisual.appendChild(inlineLogo);
        inlineLogo.classList.remove('python-logo-inline');
        inlineLogo.classList.add('python-logo-hero');
        const lastRect = inlineLogo.getBoundingClientRect();
        const deltaX = firstRect.left - lastRect.left;
        const deltaY = firstRect.top - lastRect.top;
        const scaleW = firstRect.width / lastRect.width;
        const scaleH = firstRect.height / lastRect.height;
        const animation = inlineLogo.animate([
          { transform: `translate(${deltaX}px, ${deltaY}px) scale(${scaleW}, ${scaleH})`, filter: 'drop-shadow(0 0 20px rgba(0, 230, 246, 0.4))' },
          { transform: 'translate(0, 0) scale(1)', filter: 'drop-shadow(0 0 80px rgba(0, 230, 246, 0.8))' }
        ], { duration: 1200, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', fill: 'forwards' });
        animation.onfinish = () => {
          inlineLogo.classList.add('float-hero-anim');
          if (window.pendingBuyIntent && typeof openCheckout === 'function') {
            window.pendingBuyIntent = false;
            openCheckout();
          }
        };
      } else {
        if (window.pendingBuyIntent && typeof openCheckout === 'function') {
          window.pendingBuyIntent = false;
          openCheckout();
        }
      }
    }, 500);
  };

  const showInstantLoggedInState = () => {
    if (loginCard) loginCard.style.display = 'none';
    if (inlineLogo && heroVisual) {
      heroVisual.appendChild(inlineLogo);
      inlineLogo.classList.remove('python-logo-inline');
      inlineLogo.classList.add('python-logo-hero', 'float-hero-anim');
    }
  };

  // ── Enrollment & Buy Button ──
  async function updateBuyButtonState() {
    if (!supabaseClient) return;
    try {
      const { data: { session } } = await supabaseClient.auth.getSession();
      if (!session) return;
      const { data } = await supabaseClient.rpc('check_enrollment', { p_course_id: 'python-30day' });
      if (data === true || session.user?.user_metadata?.plan === 'pro') {
        localStorage.setItem('manodemy_enrolled', 'true');
        const pricingSection = document.getElementById('pricing');
        if (pricingSection) pricingSection.style.display = 'none';
        const topBuyBtnEl = document.querySelector('.top-buy-btn');
        if (topBuyBtnEl) {
          topBuyBtnEl.innerHTML = '🔗 Share this course';
          topBuyBtnEl.href = '#';
          topBuyBtnEl.onclick = (e) => {
            e.preventDefault();
            navigator.clipboard.writeText(window.location.origin + window.location.pathname);
            topBuyBtnEl.innerHTML = '✅ Link Copied!';
            setTimeout(() => { topBuyBtnEl.innerHTML = '🔗 Share this course'; }, 2000);
          };
        }
        const purpleCta = document.querySelector('.cta-purple');
        if (purpleCta) { purpleCta.innerHTML = '🏆 CONTINUE LEARNING'; purpleCta.href = 'day01.html'; }
        document.querySelectorAll('.day-card--locked').forEach(el => {
          el.classList.remove('day-card--locked');
          const overlay = el.querySelector('.lock-overlay');
          const tag = el.querySelector('.lock-tag');
          if (overlay) overlay.remove();
          if (tag) tag.remove();
        });
      }
    } catch (e) { console.log('Enrollment check skipped:', e.message); }
  }

  // ── Admin Nav Link (conditional) ──
  // ── Admin Nav Link (conditional) ──
  async function checkAdminAccess() {
    if (!supabaseClient) return;
    try {
      const { data: { session } } = await supabaseClient.auth.getSession();
      if (!session) return;
      const { data: profile } = await supabaseClient.from('profiles').select('role').eq('id', session.user.id).single();
      if (profile?.role === 'admin') {
        const nav = document.querySelector('.top-actions');
        if (nav && !document.getElementById('adminNavLink')) {
          const adminLink = document.createElement('a');
          adminLink.id = 'adminNavLink';
          adminLink.href = 'admin.html';
          adminLink.textContent = '⚙️ Admin';
          adminLink.style.cssText = 'color:#F5A623;font-size:0.85rem;margin-right:0.8rem;text-decoration:none;font-weight:600;';
          nav.insertBefore(adminLink, nav.firstChild);
        }
      }
    } catch (e) { /* non-critical */ }
  }

  // Intercept clicks on locked day cards
  document.addEventListener('click', (e) => {
    const lockedCard = e.target.closest('.day-card--locked');
    if (lockedCard) { e.preventDefault(); window.location.href = '#pricing'; }
  });

  // ═══════ FOOTER LINK HANDLERS ═══════
  if (linkSignup) {
    linkSignup.onclick = (e) => { e.preventDefault(); switchAuthState('signup'); };
  }
  if (linkForgot) {
    linkForgot.onclick = (e) => { e.preventDefault(); switchAuthState('forgot'); };
  }
  if (linkBack) {
    linkBack.onclick = (e) => { e.preventDefault(); switchAuthState('login'); };
  }

  // ═══════ COUNTRY CAPTURE PIPELINE ═══════
  // Reliably fetches the user's ISO country code from two free geo APIs
  // and writes it to profiles only if not already set.
  async function saveCountryToProfile(fallbackCountry) {
    if (!supabaseClient) return;
    try {
      const { data: { session } } = await supabaseClient.auth.getSession();
      if (!session) return;

      // Check if country is already saved — don't overwrite good data
      const { data: profile } = await supabaseClient
        .from('profiles')
        .select('country')
        .eq('id', session.user.id)
        .single();

      if (profile?.country && profile.country !== 'US' && profile.country !== 'Unknown') {
        // Country already set with a real value — skip
        return;
      }

      // Try to get fresh country code from geo API
      let countryCode = fallbackCountry || null;
      const geoApis = [
        'https://get.geojs.io/v1/ip/country.json',   // Primary: fast, no auth
        'https://ipapi.co/json/'                        // Fallback
      ];
      for (const api of geoApis) {
        try {
          const res = await fetch(api, { signal: AbortSignal.timeout(4000) });
          const json = await res.json();
          const code = json.country || json.country_code;
          if (code && code.length === 2) {
            countryCode = code.toUpperCase();
            break;
          }
        } catch (_) { /* try next API */ }
      }

      if (!countryCode) {
        // Last resort: derive from browser locale (e.g. "en-IN" → "IN")
        const locale = navigator.language || navigator.languages?.[0] || '';
        const parts = locale.split('-');
        if (parts.length > 1 && parts[1].length === 2) {
          countryCode = parts[1].toUpperCase();
        }
      }

      if (countryCode) {
        await supabaseClient
          .from('profiles')
          .update({ country: countryCode })
          .eq('id', session.user.id);
        console.log('[Manodemy] Country saved to profile:', countryCode);
      }
    } catch (e) {
      console.warn('[Manodemy] Country capture failed (non-critical):', e.message);
    }
  }

  // ═══════ 1. CHECK SESSION ON LOAD ═══════
  if (supabaseClient) {
    try {
      const { data: { session } } = await supabaseClient.auth.getSession();
      if (session) {
        localStorage.setItem('manodemy_auth', 'true');
        showInstantLoggedInState();
        updateBuyButtonState();
        checkAdminAccess();
        // Capture country for existing session on every page load (idempotent — skips if already set)
        saveCountryToProfile(userCountry);
      } else {
        localStorage.removeItem('manodemy_auth');
        if (loginCard) { loginCard.style.setProperty('display', 'block', 'important'); loginCard.style.opacity = '1'; }
      }
      supabaseClient.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_IN' && session) {
          localStorage.setItem('manodemy_auth', 'true');
          executeLoginAnimation();
          updateBuyButtonState();
          checkAdminAccess();
          // Always capture country on fresh login
          saveCountryToProfile(userCountry);
        }
      });
    } catch (e) {
      console.error("Session check failed:", e);
      localStorage.removeItem('manodemy_auth');
      if (loginCard) { loginCard.style.setProperty('display', 'block', 'important'); loginCard.style.opacity = '1'; }
    }
  } else {
    localStorage.removeItem('manodemy_auth');
    if (loginCard) { loginCard.style.setProperty('display', 'block', 'important'); loginCard.style.opacity = '1'; }
  }

  // ═══════ 2. FORM SUBMIT HANDLER ═══════
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      clearAuthMessage();
      if (!supabaseClient) { setAuthMessage("Auth service unavailable. Check your connection.", "error"); return; }

      const email = document.getElementById('landingEmail').value.trim();
      const password = document.getElementById('landingPassword').value;
      const name = nameField ? nameField.value.trim() : '';
      const confirmPass = confirmField ? confirmField.value : '';

      btnSubmit.disabled = true;
      btnSubmit.style.opacity = '0.7';
      const originalText = btnSubmit.textContent;

      try {
        if (authState === 'login') {
          btnSubmit.textContent = 'Signing in...';
          const { error } = await supabaseClient.auth.signInWithPassword({ email, password });
          if (error) {
            if (error.message.toLowerCase().includes('invalid login credentials')) {
              throw new Error("Incorrect email or password. Need an account? Click 'Create Account'.");
            }
            throw error;
          }
          localStorage.setItem('manodemy_auth', 'true');
          executeLoginAnimation();
          updateBuyButtonState();
          checkAdminAccess();
        }
        else if (authState === 'signup') {
          if (!name) { setAuthMessage("Please enter your full name.", "error"); throw new Error("_handled"); }
          if (password.length < 6) { setAuthMessage("Password must be at least 6 characters.", "error"); throw new Error("_handled"); }
          if (password !== confirmPass) { setAuthMessage("Passwords do not match.", "error"); throw new Error("_handled"); }
          btnSubmit.textContent = 'Creating Account...';
          const { data, error } = await supabaseClient.auth.signUp({
            email, password,
            options: { data: { full_name: name } }
          });
          if (error) throw error;
          if (data?.user?.identities?.length === 0) {
            setAuthMessage("This email is already registered. Please log in.", "info");
          } else {
            setAuthMessage("Account created! Check your email to verify, then log in.", "success");
          }
        }
        else if (authState === 'forgot') {
          btnSubmit.textContent = 'Sending...';
          const basePath = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/'));
          const resetUrl = window.location.origin + basePath + '/reset-password.html';
          const { error } = await supabaseClient.auth.resetPasswordForEmail(email, { redirectTo: resetUrl });
          if (error) throw error;
          setAuthMessage("If an account exists, a reset link has been sent to your email.", "success");
        }
      } catch (err) {
        if (err.message !== "_handled") { setAuthMessage(err.message, "error"); }
      } finally {
        btnSubmit.disabled = false;
        btnSubmit.style.opacity = '1';
        btnSubmit.textContent = originalText;
      }
    });
  }

  // ═══════ 3. GOOGLE OAUTH ═══════
  if (btnGoogle) {
    btnGoogle.addEventListener('click', async (e) => {
      e.preventDefault();
      if (!supabaseClient) { setAuthMessage("Auth service unavailable.", "error"); return; }
      const originalText = btnGoogle.innerHTML;
      btnGoogle.innerHTML = 'Redirecting securely...';
      btnGoogle.disabled = true;
      btnGoogle.style.opacity = '0.7';
      try {
        const { error } = await supabaseClient.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: window.location.href,
            queryParams: { access_type: 'offline', prompt: 'consent' }
          }
        });
        if (error) {
          setAuthMessage('Google Login Error: ' + error.message, "error");
          btnGoogle.innerHTML = originalText;
          btnGoogle.disabled = false;
          btnGoogle.style.opacity = '1';
        }
      } catch (err) {
        btnGoogle.innerHTML = originalText;
        btnGoogle.disabled = false;
        btnGoogle.style.opacity = '1';
      }
    });
  }

  // ═══════ 4. LOGOUT ═══════
  const logoutBtn = document.getElementById('logoutBtn');
  if (supabaseClient) {
    const { data: { session } } = await supabaseClient.auth.getSession();
    if (session && logoutBtn) {
      logoutBtn.style.display = 'inline-flex';
      logoutBtn.addEventListener('click', async () => {
        await supabaseClient.auth.signOut();
        localStorage.removeItem('manodemy_auth');
        localStorage.removeItem('manodemy_enrolled');
        window.location.reload();
      });
    }
  }
})();

// Auto-open checkout flow if redirected from a locked day
window.addEventListener('load', () => {
  if (window.location.hash.includes('locked=true')) {
    setTimeout(() => {
      if (typeof openCheckout === 'function') openCheckout();
    }, 600);
  }
});

