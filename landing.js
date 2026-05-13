// ═══════ MANODEMY — Landing Page Engine ═══════
// ═══════ SITE VOICE ENGINE (ADVANCED) ═══════
const SiteVoice = (() => {
  let voice = null;
  let hasSpokenWelcome = false;
  let hasSpokenCurriculum = false;
  let queuedSpeech = null;

  const NARRATIONS = {
    loggedOut: [
      "Hey there! Welcome to Manodemy. Ready to escape tutorial hell? Log in and let's write some Python.",
      "Welcome! 30 days of Python for Data Analysts. Please log in to start your coding challenge.",
      "Hello! Your Python journey is waiting. Sign in to access the 30-day curriculum.",
      "Welcome to Manodemy. Real skills, real coding. Please log in to get started."
    ],
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
      speechSynthesis.speak(u);
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

  // Rate limiter: 10-minute cooldown to prevent annoyance if they keep reloading index.html
  function canSpeakWelcome() {
    const lastWelcome = localStorage.getItem('mano_last_welcome_time');
    const now = Date.now();
    // 10-minute (600,000 ms) cooldown across all tabs
    if (lastWelcome && (now - parseInt(lastWelcome)) < 600000) return false;
    localStorage.setItem('mano_last_welcome_time', now.toString());
    return true;
  }

  function welcomeLoggedOut() {
    if (hasSpokenWelcome || !canSpeakWelcome()) return;
    hasSpokenWelcome = true;
    setTimeout(() => queueOrSay(pick(NARRATIONS.loggedOut)), 1500); // 1.5s delay to be non-intrusive
  }

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

  return { welcomeLoggedOut, buyNowClick, scrollCurriculum };
})();

// ═══════ MANODEMY — PRICE EDITOR & INTERACTIONS ═══════

// Navbar scroll shadow
const topBar = document.getElementById('topBar');
if (topBar) {
  window.addEventListener('scroll', () => {
    topBar.classList.toggle('scrolled', window.scrollY > 10);
  });
}

// Price Editor Toggle
const toggle = document.getElementById('priceToggle');
const editor = document.getElementById('priceEditor');
const closeBtn = document.getElementById('closeEditor');
const applyBtn = document.getElementById('applyPrice');

if (toggle && editor) toggle.addEventListener('click', () => editor.classList.toggle('hidden'));
if (closeBtn && editor) closeBtn.addEventListener('click', () => editor.classList.add('hidden'));

// Apply Price Changes
if (applyBtn) applyBtn.addEventListener('click', () => {
  const currency = document.getElementById('inputCurrency').value || '$';
  const price = document.getElementById('inputPrice').value;
  const original = document.getElementById('inputOriginal').value;
  const discount = original > 0 ? Math.round((1 - price / original) * 100) : 0;

  document.getElementById('priceNow').textContent = currency + price;
  document.getElementById('priceOld').textContent = currency + original;
  document.getElementById('discountBadge').textContent = discount + '% OFF';
  document.getElementById('buyPrice').textContent = currency + price;

  // Flash confirmation
  applyBtn.textContent = '✅ Applied!';
  setTimeout(() => { applyBtn.textContent = 'Apply Changes'; }, 1500);
});

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
    currentPricing = { amount: prices.inr, currency: 'INR', display: '₹' + (prices.inr/100).toLocaleString('en-IN'), original: '₹' + (prices.original_inr/100).toLocaleString('en-IN'), discount: prices.discount_label_inr || prices.discount_label || '70% OFF' };
  } else {
    currentPricing = { amount: prices.usd, currency: 'USD', display: '$' + (prices.usd/100), original: '$' + (prices.original_usd/100), discount: prices.discount_label_usd || prices.discount_label || '72% OFF' };
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

    const coupon = document.getElementById('couponInput')?.value?.trim() || '';

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
        coupon_code: coupon || undefined
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
      const options = {
        key: RAZORPAY_KEY_ID,
        amount: data.amount,
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
      .select('discount_percent')
      .eq('code', code.toUpperCase())
      .eq('active', true)
      .single();

    if (data) {
      const disc = data.discount_percent;
      const newAmount = Math.round(currentPricing.amount * (1 - disc / 100));
      const display = currentPricing.currency === 'INR'
        ? '₹' + (newAmount / 100).toLocaleString('en-IN')
        : '$' + (newAmount / 100);
      document.getElementById('checkoutAmount').textContent = display;
      couponApplyBtn.textContent = `✅ ${disc}% OFF!`;
      couponApplyBtn.style.color = '#10B981';
    } else {
      couponApplyBtn.textContent = '❌ Invalid';
      setTimeout(() => { couponApplyBtn.textContent = 'Apply'; couponApplyBtn.style.color = ''; }, 2000);
    }
  });
}

// Run geo-pricing when DOM is ready
document.addEventListener('DOMContentLoaded', setupGeoPricing);


// ═══════ LANDING LOGIN CARD INTERACTIVITY (SUPABASE) ═══════
(async function initializeAuthentication() {
  const loginForm = document.getElementById('landingLoginForm');
  const btnGoogle = document.getElementById('google-signin-btn'); // Matches the updated ID
  const btnSubmit = document.getElementById('btnLandingSubmit');
  const linkForgot = document.getElementById('linkLandingForgot');
  const linkSignup = document.getElementById('linkLandingSignup');

  const loginCard = document.querySelector('.landing-login-card');
  const heroVisual = document.querySelector('.hero-visual');
  const inlineLogo = document.querySelector('.python-logo-inline');
  const buyBtnEl = document.querySelector('.buy-btn');

  // Animation Function
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

  // Check enrollment status and update Buy button
  async function updateBuyButtonState() {
    if (!supabaseClient) return;
    try {
      const { data: { session } } = await supabaseClient.auth.getSession();
      if (!session) return;

      const { data } = await supabaseClient.rpc('check_enrollment', { p_course_id: 'python-30day' });
      if (data === true || session.user?.user_metadata?.plan === 'pro') {
        localStorage.setItem('manodemy_enrolled', 'true');

        // Hide the entire pricing section and its buy button
        const pricingSection = document.getElementById('pricing');
        if (pricingSection) pricingSection.style.display = 'none';

        // Update top nav "Buy Now" to "Share this course"
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

        // Change the purple CTA to "Continue Learning"
        const purpleCta = document.querySelector('.cta-purple');
        if (purpleCta) {
          purpleCta.innerHTML = '🏆 CONTINUE LEARNING';
          purpleCta.href = 'day01.html';
        }

        // Unlock premium days on index.html
        document.querySelectorAll('.day-card--locked').forEach(el => {
          el.classList.remove('day-card--locked');
          const overlay = el.querySelector('.lock-overlay');
          const tag = el.querySelector('.lock-tag');
          if (overlay) overlay.remove();
          if (tag) tag.remove();
        });
      }
    } catch (e) {
      console.log('Enrollment check skipped:', e.message);
    }
  }

  // Intercept clicks on locked day cards
  document.addEventListener('click', (e) => {
    const lockedCard = e.target.closest('.day-card--locked');
    if (lockedCard) {
      e.preventDefault();
      window.location.href = '#pricing';
    }
  });

  // 1. Check Supabase Session on Load
  if (supabaseClient) {
    try {
      const { data: { session } } = await supabaseClient.auth.getSession();
      if (session) {
        localStorage.setItem('manodemy_auth', 'true');
        showInstantLoggedInState();
        updateBuyButtonState();
      } else {
        // Session expired or out of sync: force login card to be visible
        localStorage.removeItem('manodemy_auth');
        if (loginCard) {
          loginCard.style.setProperty('display', 'block', 'important');
          loginCard.style.opacity = '1';
          SiteVoice.welcomeLoggedOut();
        }
      }

      supabaseClient.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_IN' && session) {
          localStorage.setItem('manodemy_auth', 'true');
          executeLoginAnimation();
          updateBuyButtonState();
        }
      });
    } catch (e) {
      console.error("Session check failed:", e);
      localStorage.removeItem('manodemy_auth');
      if (loginCard) {
        loginCard.style.setProperty('display', 'block', 'important');
        loginCard.style.opacity = '1';
        SiteVoice.welcomeLoggedOut();
      }
    }
  } else {
    localStorage.removeItem('manodemy_auth');
    if (loginCard) {
      loginCard.style.setProperty('display', 'block', 'important');
      loginCard.style.opacity = '1';
      SiteVoice.welcomeLoggedOut();
    }
  }

  // 2. Email & Password Login / Auto-Signup
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (!supabaseClient) {
        alert("Authentication service is currently unavailable. Please check your connection or disable adblockers.");
        return;
      }

      const email = document.getElementById('landingEmail').value;
      const password = document.getElementById('landingPassword').value;

      btnSubmit.textContent = 'Authenticating...';
      btnSubmit.disabled = true;
      btnSubmit.style.opacity = '0.7';

      const { error } = await supabaseClient.auth.signInWithPassword({ email, password });

      if (error) {
        if (error.message.toLowerCase().includes('invalid login credentials')) {
          // Ask user before auto-creating account
          const confirmSignup = confirm('No account found with this email. Would you like to create a new account?');
          if (!confirmSignup) {
            btnSubmit.textContent = 'Start Learning →';
            btnSubmit.disabled = false;
            btnSubmit.style.opacity = '1';
            return;
          }
          btnSubmit.textContent = 'Creating Account...';
          const { error: signUpError } = await supabaseClient.auth.signUp({ email, password });
          if (signUpError) {
            alert('Signup Failed: ' + signUpError.message);
            btnSubmit.textContent = 'Start Learning →';
            btnSubmit.disabled = false;
            btnSubmit.style.opacity = '1';
            return;
          }
          btnSubmit.textContent = 'Account Created! Welcome...';
          localStorage.setItem('manodemy_auth', 'true');
          executeLoginAnimation();
          return;
        }

        alert('Login Failed: ' + error.message);
        btnSubmit.textContent = 'Start Learning →';
        btnSubmit.disabled = false;
        btnSubmit.style.opacity = '1';
        return;
      }

      btnSubmit.textContent = 'Success! Access Granted...';
      localStorage.setItem('manodemy_auth', 'true');
      executeLoginAnimation();
    });
  }

  // 3. Google OAuth Login
  if (btnGoogle) {
    btnGoogle.addEventListener('click', async (e) => {
      e.preventDefault();
      console.log("✅ Google button clicked");

      if (!supabaseClient) {
        console.error("❌ Cannot sign in with Google because supabaseClient client is null.");
        alert("Authentication service is currently unavailable.");
        return;
      }

      const originalText = btnGoogle.innerHTML;
      btnGoogle.innerHTML = 'Redirecting securely...';
      btnGoogle.disabled = true;
      btnGoogle.style.opacity = '0.7';

      try {
        console.log("✅ Calling supabaseClient.auth.signInWithOAuth...");
        const { error } = await supabaseClient.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: window.location.origin + window.location.pathname
          }
        });

        if (error) {
          console.error("❌ Supabase OAuth Error:", error);
          alert('Google Login Error: ' + error.message);
          btnGoogle.innerHTML = originalText;
          btnGoogle.disabled = false;
          btnGoogle.style.opacity = '1';
        }
      } catch (err) {
        console.error("❌ Unexpected error during OAuth flow:", err);
        btnGoogle.innerHTML = originalText;
        btnGoogle.disabled = false;
        btnGoogle.style.opacity = '1';
      }
    });
  } else {
    // Google button not found — non-critical
  }

  if (linkForgot) {
    linkForgot.addEventListener('click', async (e) => {
      e.preventDefault();
      const email = prompt('Enter your registered email address to receive a password reset link:');
      if (email && supabaseClient) {
        await supabaseClient.auth.resetPasswordForEmail(email, {
          redirectTo: window.location.origin + window.location.pathname,
        });
        alert('If an account exists, a secure reset link has been sent to that email.');
      }
    });
  }

  if (linkSignup) {
    linkSignup.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Just enter an email and password in the form and click "Start Learning" to instantly create your account!');
    });
  }

  // ═══════ LOGOUT BUTTON ON LANDING PAGE ═══════
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
