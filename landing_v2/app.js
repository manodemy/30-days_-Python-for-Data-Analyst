"use strict";

/* Manodemy Landing v2.0 — App Logic */



document.addEventListener('DOMContentLoaded', () => {



  /* ═══ NAV SCROLL ═══ */

  const nav = document.querySelector('.nav');

  const onScroll = () => {

    if (window.scrollY > 60) nav.classList.add('nav--scrolled');

    else nav.classList.remove('nav--scrolled');

  };

  window.addEventListener('scroll', onScroll, { passive: true });

  onScroll();



  /* ═══ MOBILE MENU ═══ */

  const hamburger = document.getElementById('hamburger');

  const overlay = document.getElementById('mobileOverlay');

  const mobileClose = document.getElementById('mobileClose');

  if (hamburger && overlay) {

    const toggle = (open) => {

      overlay.classList.toggle('active', open);

      hamburger.setAttribute('aria-expanded', String(open));

      if (open) {

        const first = overlay.querySelector('a');

        if (first) first.focus();

      }

    };

    hamburger.addEventListener('click', () => toggle(true));

    mobileClose?.addEventListener('click', () => toggle(false));

    overlay.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggle(false)));

    document.addEventListener('keydown', e => { if (e.key === 'Escape' && overlay.classList.contains('active')) toggle(false); });

  }



  /* ═══ TYPING TERMINAL ═══ */

  const codeExamples = [

    { lines: [

      { text: '# Load and analyze sales data', cls: 'cmt' },

      { text: 'import', cls: 'kw' }, { text: ' pandas ', cls: '' }, { text: 'as', cls: 'kw' }, { text: ' pd', cls: '' },

      { text: "df = pd.read_csv('sales_data.csv')", cls: '' },

      { text: "summary = df.groupby('region')['revenue'].sum()", cls: '' },

      { text: 'print(summary.sort_values(ascending=False))', cls: '' }

    ]},

    { lines: [

      { text: '# Top 5 products by revenue', cls: 'cmt' },

      { text: "top5 = (df.groupby('product')", cls: '' },

      { text: "          .agg({'revenue': 'sum', 'units': 'count'})", cls: '' },

      { text: "          .sort_values('revenue', ascending=False)", cls: '' },

      { text: '          .head(5))', cls: '' },

      { text: 'print(top5)', cls: '' }

    ]},

    { lines: [

      { text: '# Monthly revenue trend', cls: 'cmt' },

      { text: "df['date'] = pd.to_datetime(df['date'])", cls: '' },

      { text: "monthly = df.resample('M', on='date')['revenue'].sum()", cls: '' },

      { text: "monthly.plot(kind='line', title='Revenue Trend')", cls: '' }

    ]}

  ];



  const display = document.getElementById('typingDisplay');

  const cursorEl = document.getElementById('typingCursor');

  let exIdx = 0, charIdx = 0, lineIdx = 0, typeTimer = null;



  function flattenExample(ex) {

    let result = '';

    const raw = ex.lines;

    for (let i = 0; i < raw.length; i++) {

      const line = raw[i];

      // Simple approach: just use text with syntax spans

      if (line.cls === 'kw' || line.cls === 'cmt' || line.cls === 'str' || line.cls === 'num') {

        result += `<span class="${line.cls}">${line.text}</span>`;

      } else {

        result += escapeHTML(line.text);

      }

      if (i < raw.length - 1 && !raw[i].text.endsWith(' ') && raw[i+1]?.cls !== 'kw' && raw[i+1]?.cls !== '') {

        result += '\n';

      }

    }

    return result;

  }



  function escapeHTML(s) {

    return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

  }



  function getPlainText(ex) {

    return ex.lines.map(l => l.text).join('\n');

  }



  function highlightCode(text) {

    let h = escapeHTML(text);

    return h.replace(

      /(#[^\n]*)|('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*")|\b(import|as|from|def|return|print|for|in|if|else|True|False|None)\b|\b(\d+)\b/g,

      (match, p1, p2, p3, p4) => {

        if (p1) return `<span class="cmt">${p1}</span>`;

        if (p2) return `<span class="str">${p2}</span>`;

        if (p3) return `<span class="kw">${p3}</span>`;

        if (p4) return `<span class="num">${p4}</span>`;

        return match;

      }

    );

  }



  function typeExample() {

    if (!display) return;

    const plain = getPlainText(codeExamples[exIdx]);

    if (charIdx <= plain.length) {

      const partial = plain.substring(0, charIdx);

      display.innerHTML = highlightCode(partial);

      charIdx++;

      typeTimer = setTimeout(typeExample, 35);

    } else {

      typeTimer = setTimeout(() => {

        exIdx = (exIdx + 1) % codeExamples.length;

        charIdx = 0;

        display.style.opacity = '0';

        setTimeout(() => {

          display.innerHTML = '';

          display.style.opacity = '1';

          typeExample();

        }, 400);

      }, 2500);

    }

  }

  if (display) typeExample();



  /* ═══ COUNTER ANIMATION ═══ */

  function easeOutQuad(t) { return t * (2 - t); }

  function animateCounter(el, target, suffix, duration) {

    duration = duration || 1500;

    const start = performance.now();

    const update = (now) => {

      const elapsed = Math.min((now - start) / duration, 1);

      const value = Math.floor(easeOutQuad(elapsed) * target);

      el.textContent = value.toLocaleString('en-IN') + (suffix || '');

      if (elapsed < 1) requestAnimationFrame(update);

      else el.textContent = target.toLocaleString('en-IN') + (suffix || '');

    };

    requestAnimationFrame(update);

  }



  /* ═══ INTERSECTION OBSERVER — Reveal + Counters ═══ */

  const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry, i) => {

      if (entry.isIntersecting) {

        // Stagger siblings

        const siblings = entry.target.parentElement?.querySelectorAll('.reveal');

        if (siblings) {

          let idx = Array.from(siblings).indexOf(entry.target);

          entry.target.style.transitionDelay = `${idx * 80}ms`;

        }

        entry.target.classList.add('visible');

        observer.unobserve(entry.target);

      }

    });

  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));



  const counterObs = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        const el = entry.target;

        const target = parseInt(el.dataset.count, 10);

        const suffix = el.dataset.suffix || '';

        animateCounter(el, target, suffix);

        counterObs.unobserve(el);

      }

    });

  }, { threshold: 0.5 });

  document.querySelectorAll('[data-count]').forEach(el => counterObs.observe(el));



  /* ═══ PRICING MODAL CONTROLLER ═══ */

  const pricingModal = document.getElementById('pricingModal');

  const closePricingModalBtn = document.getElementById('btnClosePricingModal');



  const openPricingModal = () => {

    if (window._userHasPurchased || localStorage.getItem('manodemy_enrolled') === 'true') {

      window.location.href = '../home.html';

      return;

    }

    if (pricingModal) {

      pricingModal.classList.add('active');

      document.body.style.overflow = 'hidden';

    }

  };



  const closePricingModal = () => {

    if (pricingModal) {

      pricingModal.classList.remove('active');

      document.body.style.overflow = '';

    }

  };



  if (closePricingModalBtn) {

    closePricingModalBtn.addEventListener('click', closePricingModal);

  }

  if (pricingModal) {

    pricingModal.addEventListener('click', e => {

      if (e.target === pricingModal) closePricingModal();

    });

    document.addEventListener('keydown', e => {

      if (e.key === 'Escape' && pricingModal.classList.contains('active')) {

        closePricingModal();

      }

    });

  }



  // Intercept click on elements linking to pricing to open pricing modal

  document.querySelectorAll('a[href="#pricing"], [data-cta="buy"]').forEach(el => {

    if (el.id === 'navSignin') return;

    if (el.closest('.modal-version')) return;



    el.addEventListener('click', e => {

      e.preventDefault();

      openPricingModal();

    });

  });



  /* ═══ DAY CARD CLICKS ═══ */

  const cards = document.querySelectorAll('.day-card');

  cards.forEach(card => {

    card.addEventListener('click', () => {

      const isPaid = window._userHasPurchased || localStorage.getItem('manodemy_enrolled') === 'true';

      if (card.dataset.day === '01') {

        window.location.href = '../day01.html';

      } else if (card.dataset.day === '02') {

        window.location.href = '../day02.html';

      } else if (isPaid) {

        window.location.href = `../day${card.dataset.day}.html`;

      } else {

        openPricingModal();

      }

    });

    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); card.click(); } });

  });



  /* ═══ COUNTDOWN TIMER ═══ */

  const countdownEl = document.getElementById('countdown');

  if (countdownEl) {

    const deadline = new Date(countdownEl.dataset.deadline || '2026-12-31T23:59:59');

    const urgencyBar = document.getElementById('urgencyBar');

    const tick = () => {

      const diff = deadline - Date.now();

      if (diff <= 0) { if (urgencyBar) urgencyBar.style.display = 'none'; return; }

      const d = Math.floor(diff / 86400000);

      const h = Math.floor((diff % 86400000) / 3600000);

      const m = Math.floor((diff % 3600000) / 60000);

      const s = Math.floor((diff % 60000) / 1000);

      countdownEl.innerHTML = `<span>${d}D</span> : <span>${String(h).padStart(2,'0')}H</span> : <span>${String(m).padStart(2,'0')}M</span> : <span>${String(s).padStart(2,'0')}S</span>`;

    };

    tick();

    setInterval(tick, 1000);

  }



  // ═══════ SUPABASE CLIENT ═══════

  const SUPABASE_URL = window.MANODEMY_CONFIG?.SUPA_URL || 'https://erqoyvbuhmkyvcqgwcbz.supabase.co';

  const SUPABASE_ANON_KEY = window.MANODEMY_CONFIG?.SUPA_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVycW95dmJ1aG1reXZjcWd3Y2J6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkzODk1MTIsImV4cCI6MjA5NDk2NTUxMn0.9UnIfq8xMrKANPPTtoOADKH-NJ_it9HDp7xrJL4FXtw';

  const RAZORPAY_KEY_ID = 'rzp_live_SnbHZn5Q7rYNAP';

  const PAYPAL_CLIENT_ID = '';



  let supabaseClient = null;

  try {

    if (window.supabase) {

      supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    }

  } catch (e) {

    console.error("❌ Error initializing Supabase:", e);

  }



  // ═══════ GEO-PRICING & STATE ═══════

  let userCountry = 'US';

  let currentPricing = { amount: 1900, currency: 'USD', display: '$19', original: '$69', discount: '72% OFF' };



  async function setupGeoPricing() {

    const priceNow = document.getElementById('priceNow') || document.querySelector('.price-now span');

    const priceOld = document.getElementById('priceOld') || document.querySelector('.price-old');

    const priceInr = document.getElementById('priceInr') || document.querySelector('.price-inr');

    const discountBadge = document.getElementById('discountBadge') || document.querySelector('.discount-pill');

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



    let prices = { inr: 149900, usd: 1900, original_inr: 499900, original_usd: 6900, discount_label_inr: '70% OFF', discount_label_usd: '72% OFF' };

    try {

      if (supabaseClient) {

        const { data: dbPricing } = await supabaseClient.from('settings').select('value').eq('key', 'pricing').single();

        if (dbPricing && dbPricing.value) {

          prices = {

            inr: dbPricing.value.inr,

            usd: dbPricing.value.usd,

            original_inr: dbPricing.value.original_inr,

            original_usd: dbPricing.value.original_usd,

            discount_label_inr: dbPricing.value.discount_label,

            discount_label_usd: dbPricing.value.discount_label_usd

          };

        } else {

          const pRes = await fetch(SUPABASE_URL + '/functions/v1/get-pricing');

          if (pRes.ok) prices = await pRes.json();

        }

      } else {

        const pRes = await fetch(SUPABASE_URL + '/functions/v1/get-pricing');

        if (pRes.ok) prices = await pRes.json();

      }

    } catch (e) {

      console.log('Using fallback pricing:', e.message);

    }



    if (userCountry === 'IN') {

      const calcDisc = Math.round(((prices.original_inr - prices.inr) / prices.original_inr) * 100);

      currentPricing = { amount: prices.inr, currency: 'INR', display: '₹' + (prices.inr/100).toLocaleString('en-IN'), original: '₹' + (prices.original_inr/100).toLocaleString('en-IN'), discount: calcDisc + '% OFF' };

      if (priceInr) {

        priceInr.innerHTML = '<strong>Special Offer for Indian cohort</strong>';

        priceInr.style.color = 'var(--cyan)';

      }

    } else {

      const calcDisc = Math.round(((prices.original_usd - prices.usd) / prices.original_usd) * 100);

      currentPricing = { amount: prices.usd, currency: 'USD', display: '$' + (prices.usd/100), original: '$' + (prices.original_usd/100), discount: calcDisc + '% OFF' };

      if (priceInr) {

        priceInr.innerHTML = 'or dynamic international payment options';

      }

    }



    if (priceNow) priceNow.textContent = currentPricing.display;

    if (priceOld) priceOld.textContent = currentPricing.original;

    if (discountBadge) discountBadge.textContent = currentPricing.discount;

    if (checkoutAmount) checkoutAmount.textContent = currentPricing.display;

    if (checkoutOriginal) checkoutOriginal.textContent = currentPricing.original;



    document.querySelectorAll('.btn-nav-buy, .btn-gold--outline[data-cta="buy"], .sticky-buy').forEach(btn => {

      btn.textContent = `Buy Now — ${currentPricing.display}`;

    });



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

        <p style="text-align:center;font-size:0.75rem;color:var(--ink-dim);margin:0">UPI • Cards • Net Banking • Wallets</p>

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

        <p style="text-align:center;font-size:0.75rem;color:var(--ink-dim);margin:0">Visa • Mastercard • PayPal Balance</p>

      `;

    }



    const rzpBtn = document.getElementById('payRazorpay');

    const stripeBtn = document.getElementById('payStripe');

    const ppBtn = document.getElementById('payPaypal');



    if (rzpBtn) rzpBtn.addEventListener('click', () => initiatePayment('razorpay'));

    if (stripeBtn) stripeBtn.addEventListener('click', () => initiatePayment('stripe'));

    if (ppBtn) ppBtn.addEventListener('click', () => initiatePayment('paypal'));

  }



  // ═══════ EMBEDDED CHECKOUT ACTION FLOW ═══════

  const pricingDetailsView = document.getElementById('pricingDetailsView');

  const pricingCheckoutView = document.getElementById('pricingCheckoutView');

  const btnPricingBuy = document.getElementById('btnPricingBuy');

  const checkoutBackToDetails = document.getElementById('checkoutBackToDetails');



  if (btnPricingBuy) {

    btnPricingBuy.addEventListener('click', () => {

      if (!supabaseClient) {

        alert("Auth service offline.");

        return;

      }

      

      supabaseClient.auth.getSession().then(({ data: { session } }) => {

        if (!session) {

          window.pendingBuyIntent = true;

          closePricingModal();

          openAuthModal('login');

          return;

        }



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

            if (error) console.warn('[Telemetry] checkout_initiated Insertion failed:', error.message);

          });

        }



        if (pricingDetailsView && pricingCheckoutView) {

          pricingDetailsView.style.display = 'none';

          pricingCheckoutView.style.display = 'block';

        }

      });

    });

  }



  if (checkoutBackToDetails) {

    checkoutBackToDetails.addEventListener('click', () => {

      if (pricingDetailsView && pricingCheckoutView) {

        pricingCheckoutView.style.display = 'none';

        pricingDetailsView.style.display = 'block';

      }

    });

  }



  // ═══════ AUTH MODAL OVERLAY TRIGGER & LOGIC ═══════

  const authModal = document.getElementById('authModal');

  const btnCloseAuthModal = document.getElementById('btnCloseAuthModal');

  const authForm = document.getElementById('authForm');

  const authTitle = document.getElementById('authTitle');

  const authSubtitle = document.getElementById('authSubtitle');

  const authMsg = document.getElementById('authMessage');

  const socialAuthSection = document.getElementById('socialAuthSection');

  

  const authNameGroup = document.getElementById('authNameGroup');

  const authPasswordGroup = document.getElementById('authPasswordGroup');

  const authConfirmGroup = document.getElementById('authConfirmGroup');

  

  const authName = document.getElementById('authName');

  const authEmail = document.getElementById('authEmail');

  const authPassword = document.getElementById('authPassword');

  const authConfirmPassword = document.getElementById('authConfirmPassword');

  const btnAuthSubmit = document.getElementById('btnAuthSubmit');

  const authGoogleBtn = document.getElementById('authGoogleBtn');



  const linkSignup = document.getElementById('linkSignup');

  const linkForgot = document.getElementById('linkForgot');

  const linkBackToLogin = document.getElementById('linkBackToLogin');



  let authState = 'login';

  window.pendingBuyIntent = false;



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



  const openAuthModal = (state = 'login') => {

    switchAuthState(state);

    if (authModal) {

      authModal.classList.add('active');

      document.body.style.overflow = 'hidden';

    }

  };



  const closeAuthModal = () => {

    if (authModal) {

      authModal.classList.remove('active');

      document.body.style.overflow = '';

      clearAuthMessage();

    }

  };



  if (btnCloseAuthModal) btnCloseAuthModal.addEventListener('click', closeAuthModal);

  if (authModal) {

    authModal.addEventListener('click', e => { if (e.target === authModal) closeAuthModal(); });

  }



  const switchAuthState = (state) => {

    authState = state;

    clearAuthMessage();



    if (state === 'login') {

      if (authTitle) authTitle.innerHTML = 'Join the Challenge';

      if (authSubtitle) authSubtitle.textContent = 'Sign in to start learning';

      if (socialAuthSection) socialAuthSection.style.display = '';

      if (authNameGroup) authNameGroup.style.display = 'none';

      if (authPasswordGroup) authPasswordGroup.style.display = '';

      if (authConfirmGroup) authConfirmGroup.style.display = 'none';

      if (btnAuthSubmit) btnAuthSubmit.textContent = 'Login';

      if (linkForgot) linkForgot.style.display = '';

      if (linkSignup) linkSignup.style.display = '';

      if (linkBackToLogin) linkBackToLogin.style.display = 'none';

    } else if (state === 'signup') {

      if (authTitle) authTitle.innerHTML = 'Create Account';

      if (authSubtitle) authSubtitle.textContent = 'Join thousands of learners';

      if (socialAuthSection) socialAuthSection.style.display = 'none';

      if (authNameGroup) authNameGroup.style.display = '';

      if (authPasswordGroup) authPasswordGroup.style.display = '';

      if (authConfirmGroup) authConfirmGroup.style.display = '';

      if (btnAuthSubmit) btnAuthSubmit.textContent = 'Sign Up';

      if (linkForgot) linkForgot.style.display = 'none';

      if (linkSignup) linkSignup.style.display = 'none';

      if (linkBackToLogin) linkBackToLogin.style.display = '';

    } else if (state === 'forgot') {

      if (authTitle) authTitle.innerHTML = 'Reset Password';

      if (authSubtitle) authSubtitle.textContent = 'Enter your email to receive a reset link';

      if (socialAuthSection) socialAuthSection.style.display = 'none';

      if (authNameGroup) authNameGroup.style.display = 'none';

      if (authPasswordGroup) authPasswordGroup.style.display = 'none';

      if (authConfirmGroup) authConfirmGroup.style.display = 'none';

      if (btnAuthSubmit) btnAuthSubmit.textContent = 'Send Reset Link';

      if (linkForgot) linkForgot.style.display = 'none';

      if (linkSignup) linkSignup.style.display = 'none';

      if (linkBackToLogin) linkBackToLogin.style.display = '';

    }

  };



  if (linkSignup) linkSignup.addEventListener('click', e => { e.preventDefault(); switchAuthState('signup'); });

  if (linkForgot) linkForgot.addEventListener('click', e => { e.preventDefault(); switchAuthState('forgot'); });

  if (linkBackToLogin) linkBackToLogin.addEventListener('click', e => { e.preventDefault(); switchAuthState('login'); });



  const navSignin = document.getElementById('navSignin');

  if (navSignin) {

    navSignin.addEventListener('click', (e) => {

      if (localStorage.getItem('manodemy_auth') === 'true' || navSignin.textContent === 'Dashboard') return;

      e.preventDefault();

      openAuthModal('login');

    });

  }



  // ═══════ COUNTRY CAPTURE PIPELINE ═══════

  async function saveCountryToProfile(fallbackCountry) {

    if (!supabaseClient) return;

    try {

      const { data: { session } } = await supabaseClient.auth.getSession();

      if (!session) return;



      const { data: profile } = await supabaseClient

        .from('profiles')

        .select('country')

        .eq('id', session.user.id)

        .single();



      if (profile?.country && profile.country !== 'US' && profile.country !== 'Unknown') {

        return;

      }



      let countryCode = fallbackCountry || null;

      const geoApis = [

        'https://get.geojs.io/v1/ip/country.json',

        'https://ipapi.co/json/'

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

        } catch (_) {}

      }



      if (!countryCode) {

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

        console.log('[Manodemy] Country saved:', countryCode);

      }

    } catch (e) {

      console.warn('[Manodemy] Country capture failed:', e.message);

    }

  }



  // ═══════ PAYMENT INITIATION ═══════

  async function initiatePayment(gateway) {

    const spinner = document.getElementById('checkoutSpinner');

    const buttons = document.getElementById('gatewayButtons');



    try {

      if (spinner) spinner.classList.add('active');

      if (buttons) buttons.style.opacity = '0.4';



      const { data: { session } } = await supabaseClient.auth.getSession();

      if (!session) throw new Error('Please sign in to proceed with your checkout purchase.');



      const couponEl = document.getElementById('couponInput');

      const coupon = couponEl ? couponEl.value.trim() : '';



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

          final_amount: appliedCouponAmount || undefined

        })

      });



      const data = await res.json();

      if (data.error) {

        if (data.enrolled) {

          alert('You already have access! Redirecting to curriculum dashboard...');

          unlockAllDays();

          updateCTAsForPaidUser();

          closePricingModal();

          window.location.href = '../home.html';

          return;

        }

        throw new Error(data.error);

      }



      if (gateway === 'razorpay') {

        if (typeof Razorpay === 'undefined') {

          await new Promise((resolve, reject) => {

            const s = document.createElement('script');

            s.src = 'https://checkout.razorpay.com/v1/checkout.js';

            s.onload = resolve; s.onerror = reject;

            document.head.appendChild(s);

          });

        }



        const finalAmount = appliedCouponAmount || data.amount;

        const options = {

          key: RAZORPAY_KEY_ID,

          amount: finalAmount,

          currency: data.currency,

          order_id: data.razorpay_order_id,

          name: 'Manodemy',

          description: '30-Day Python Data Analytics Masterclass',

          handler: async function (response) {

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

                unlockAllDays();

                updateCTAsForPaidUser();

                closePricingModal();

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

        rzp.on('payment.failed', function () {

          window.location.href = `payment-failed.html?reason=declined`;

        });

        rzp.open();

        closePricingModal();

      }

      else if (gateway === 'stripe') {

        if (data.stripe_session_url) {

          window.location.href = data.stripe_session_url;

        }

      }

      else if (gateway === 'paypal') {

        await loadPayPalSDK();

        closePricingModal();

        await handlePayPalPayment(data, session);

      }



    } catch (error) {

      console.error('Payment error:', error);

      alert('Payment processing failed: ' + error.message);

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

    const ppContainer = document.createElement('div');

    ppContainer.id = 'paypal-button-container';

    ppContainer.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:12000;background:#111827;padding:2rem;border-radius:16px;border:1px solid rgba(255,255,255,0.1);min-width:350px';

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

            unlockAllDays();

            updateCTAsForPaidUser();

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

      onError: () => { ppContainer.remove(); alert('PayPal error. Checkout session cancelled.'); }

    }).render('#paypal-button-container');

  }



  // ═══════ COUPON STATE & VALIDATION ═══════

  let appliedCouponCode = '';

  let appliedCouponAmount = null;



  const couponApplyBtn = document.getElementById('couponApply');

  if (couponApplyBtn) {

    couponApplyBtn.addEventListener('click', async () => {

      const input = document.getElementById('couponInput');

      const code = input?.value?.trim();

      if (!code) return;



      if (!supabaseClient) return;

      couponApplyBtn.textContent = 'Verifying...';

      

      const { data, error } = await supabaseClient

        .from('coupons')

        .select('discount_type, discount_value, discount_percent, is_active, active, expires_at, valid_until, applies_to')

        .eq('code', code.toUpperCase())

        .single();



      const isActive = data

        ? (Boolean(data.is_active) === true && Boolean(data.active) !== false)

        : false;



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

          const currencySymbol = currentPricing.currency === 'INR' ? '₹' : '$';

          label = `✅ ${currencySymbol}${val} OFF!`;

        }



        const displayPrice = currentPricing.currency === 'INR'

          ? '₹' + (newAmount / 100).toLocaleString('en-IN')

          : '$' + (newAmount / 100);



        appliedCouponCode = code.toUpperCase();

        appliedCouponAmount = newAmount;

        

        const rzpBtn = document.getElementById('payRazorpay');

        const stripeBtn = document.getElementById('payStripe');

        const ppBtn = document.getElementById('payPaypal');

        

        if (rzpBtn) rzpBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 4l5.5 16h3L17 7.5 14.5 20h3L23 4h-3l-4 11L12.5 4h-3l-4 11L1.5 4H3z"/></svg> Pay with Razorpay — ${displayPrice}`;

        if (stripeBtn) stripeBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z"/></svg> Pay with Card — ${displayPrice}`;

        if (ppBtn) ppBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797H9.603c-.564 0-1.04.408-1.13.964L7.076 21.337z"/></svg> Pay with PayPal — ${displayPrice}`;



        couponApplyBtn.textContent = label;

        couponApplyBtn.style.color = '#10B981';

      } else {

        appliedCouponCode = '';

        appliedCouponAmount = null;



        let msg = '❌ Invalid';

        if (isExpired) msg = '❌ Expired';

        else if (!currencyMatch) msg = `❌ Only for ${appliesTo}`;

        

        couponApplyBtn.textContent = msg;

        couponApplyBtn.style.color = '#F43F5E';

        setTimeout(() => {

          couponApplyBtn.textContent = 'Apply';

          couponApplyBtn.style.color = '';

        }, 2000);

      }

    });

  }



  // ═══════ AUTH SUBMISSION PIPELINE ═══════

  if (authForm) {

    authForm.addEventListener('submit', async (e) => {

      e.preventDefault();

      clearAuthMessage();

      if (!supabaseClient) { setAuthMessage("Authentication services are currently unavailable.", "error"); return; }



      const email = authEmail.value.trim();

      const password = authPassword.value;

      const name = authName ? authName.value.trim() : '';

      const confirmPass = authConfirmPassword ? authConfirmPassword.value : '';



      btnAuthSubmit.disabled = true;

      btnAuthSubmit.style.opacity = '0.7';

      const originalText = btnAuthSubmit.textContent;



      try {

        if (authState === 'login') {

          btnAuthSubmit.textContent = 'Signing in...';

          const { error } = await supabaseClient.auth.signInWithPassword({ email, password });

          if (error) {

            if (error.message.toLowerCase().includes('invalid login credentials')) {

              throw new Error("Incorrect email or password. Need an account? Click 'Create Account'.");

            }

            throw error;

          }

          closeAuthModal();

          const { data: { session } } = await supabaseClient.auth.getSession();

          if (session) {

            updateNavForLoggedIn(session.user);

            await checkPurchaseStatus(supabaseClient, session.user.id);

            await saveCountryToProfile(userCountry);

            if (window.pendingBuyIntent) {

              window.pendingBuyIntent = false;

              if (pricingDetailsView && pricingCheckoutView) {

                pricingDetailsView.style.display = 'none';

                pricingCheckoutView.style.display = 'block';

              }

              openPricingModal();

            }

          }

        }

        else if (authState === 'signup') {

          if (!name) { setAuthMessage("Please enter your full name.", "error"); throw new Error("_handled"); }

          if (password.length < 6) { setAuthMessage("Password must be at least 6 characters.", "error"); throw new Error("_handled"); }

          if (password !== confirmPass) { setAuthMessage("Passwords do not match.", "error"); throw new Error("_handled"); }

          

          btnAuthSubmit.textContent = 'Creating Account...';

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

          btnAuthSubmit.textContent = 'Sending...';

          const basePath = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/'));

          const resetUrl = window.location.origin + basePath + '/reset-password.html';

          const { error } = await supabaseClient.auth.resetPasswordForEmail(email, { redirectTo: resetUrl });

          if (error) throw error;

          setAuthMessage("If an account exists, a recovery link has been sent to your email.", "success");

        }

      } catch (err) {

        if (err.message !== "_handled") { setAuthMessage(err.message, "error"); }

      } finally {

        btnAuthSubmit.disabled = false;

        btnAuthSubmit.style.opacity = '1';

        btnAuthSubmit.textContent = originalText;

      }

    });

  }



  if (authGoogleBtn) {

    authGoogleBtn.addEventListener('click', async (e) => {

      e.preventDefault();

      if (!supabaseClient) { setAuthMessage("Authentication services are currently unavailable.", "error"); return; }

      

      const originalText = authGoogleBtn.innerHTML;

      authGoogleBtn.innerHTML = 'Redirecting securely...';

      authGoogleBtn.disabled = true;

      authGoogleBtn.style.opacity = '0.7';

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

          authGoogleBtn.innerHTML = originalText;

          authGoogleBtn.disabled = false;

          authGoogleBtn.style.opacity = '1';

        }

      } catch (err) {

        authGoogleBtn.innerHTML = originalText;

        authGoogleBtn.disabled = false;

        authGoogleBtn.style.opacity = '1';

      }

    });

  }



  function updateNavForLoggedIn(user) {

    const signInBtn = document.getElementById('navSignin');

    if (signInBtn) {

      if (user && user.email === 'manodamy25@gmail.com') {

        signInBtn.textContent = '⚙️ Admin Panel';

        signInBtn.href = '../admin.html';

        signInBtn.style.display = 'inline-flex';

      } else {

        signInBtn.style.display = 'none';

      }

    }

  }



  function unlockAllDays() {

    document.querySelectorAll('.day-card.locked').forEach(card => {

      card.classList.remove('locked');

      const lock = card.querySelector('.lock-badge');

      if (lock) lock.remove();

    });

    window._userHasPurchased = true;

  }



  function updateCTAsForPaidUser() {

    // 1. Update standard buy buttons elsewhere

    document.querySelectorAll('[data-cta="buy"]').forEach(btn => {

      if (!btn.closest('.hero-ctas')) {

        btn.textContent = 'Continue Learning →';

        btn.href = '../home.html';

        btn.onclick = null;

      }

    });



    // 2. Redesign the hero CTAs for purchased V2 users

    const heroCtas = document.querySelector('.hero-ctas');

    if (heroCtas) {

      heroCtas.innerHTML = `

        <button id="heroShareBtn" class="premium-btn premium-btn--share" aria-label="Share this course">

          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px; vertical-align: middle;">

            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>

            <polyline points="16 6 12 2 8 6"></polyline>

            <line x1="12" y1="2" x2="12" y2="15"></line>

          </svg>

          Share this Course

        </button>

        <a href="../home.html" class="premium-btn premium-btn--continue" aria-label="Continue to Dashboard">

          🚀 Continue Learning

          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="margin-left: 8px; transition: transform 0.3s ease; vertical-align: middle;">

            <line x1="5" y1="12" x2="19" y2="12"></line>

            <polyline points="12 5 19 12 12 19"></polyline>

          </svg>

        </a>

      `;



      // 3. Inject premium styles dynamically

      if (!document.getElementById('premium-paid-btn-styles')) {

        const styleEl = document.createElement('style');

        styleEl.id = 'premium-paid-btn-styles';

        styleEl.textContent = `

          .hero-ctas {

            display: flex !important;

            gap: 1rem !important;

            flex-wrap: wrap !important;

            margin-top: 1.5rem !important;

          }

          

          .premium-btn {

            font-family: 'Outfit', sans-serif !important;

            font-weight: 800 !important;

            font-size: 13.5px !important;

            letter-spacing: 0.05em !important;

            text-transform: uppercase !important;

            padding: 14px 28px !important;

            border-radius: 50px !important;

            display: inline-flex !important;

            align-items: center !important;

            justify-content: center !important;

            cursor: pointer !important;

            transition: all 0.35s cubic-bezier(0.25, 0.8, 0.25, 1) !important;

            text-decoration: none !important;

            white-space: nowrap !important;

            border: none !important;

          }

          

          .premium-btn--share {

            background: rgba(15, 23, 42, 0.45) !important;

            color: rgba(255, 255, 255, 0.85) !important;

            border: 1.5px solid rgba(255, 255, 255, 0.08) !important;

            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.35) !important;

          }

          

          .premium-btn--share:hover {

            background: rgba(15, 23, 42, 0.75) !important;

            color: #ffffff !important;

            border-color: rgba(0, 230, 246, 0.45) !important;

            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5), 0 0 15px rgba(0, 230, 246, 0.15) !important;

            transform: translateY(-2px) !important;

          }

          

          .premium-btn--continue {

            background: linear-gradient(135deg, #00e6f6 0%, #0072ff 100%) !important;

            color: #ffffff !important;

            box-shadow: 0 8px 25px rgba(0, 114, 255, 0.35), 0 0 15px rgba(0, 230, 246, 0.18) !important;

          }

          

          .premium-btn--continue:hover {

            transform: translateY(-3px) scale(1.025) !important;

            box-shadow: 0 12px 35px rgba(0, 114, 255, 0.5), 0 0 25px rgba(0, 230, 246, 0.35) !important;

          }

          

          .premium-btn--continue:hover svg {

            transform: translateX(4px) !important;

          }

          

          /* Premium Toast Style */

          .premium-toast {

            position: fixed !important;

            bottom: 30px !important;

            left: 50% !important;

            transform: translate(-50%, 50px) scale(0.95) !important;

            background: rgba(7, 10, 19, 0.92) !important;

            backdrop-filter: blur(12px) !important;

            border: 1.5px solid rgba(0, 230, 246, 0.45) !important;

            color: #ffffff !important;

            padding: 12px 24px !important;

            border-radius: 12px !important;

            font-family: 'Outfit', sans-serif !important;

            font-weight: 700 !important;

            font-size: 13.5px !important;

            box-shadow: 0 15px 35px rgba(0,0,0,0.6), 0 0 20px rgba(0,230,246,0.2) !important;

            z-index: 999999 !important;

            opacity: 0 !important;

            pointer-events: none !important;

            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;

          }

          

          .premium-toast.show {

            opacity: 1 !important;

            transform: translate(-50%, 0) scale(1) !important;

          }

        `;

        document.head.appendChild(styleEl);

      }



      // 4. Attach Share Handler

      const shareBtn = document.getElementById('heroShareBtn');

      if (shareBtn) {

        shareBtn.addEventListener('click', (e) => {

          e.preventDefault();

          const shareData = {

            title: '30 Days of Python for Data Analyst - V2',

            text: 'Learn Python by actually coding! Check out this incredible hands-on course.',

            url: window.location.origin + '/30-days-Python-for-Data-Analyst-V2/landing_v2/index.html'

          };

          

          const displayToast = () => {

            let toast = document.getElementById('premiumShareToast');

            if (!toast) {

              toast = document.createElement('div');

              toast.id = 'premiumShareToast';

              toast.className = 'premium-toast';

              toast.innerHTML = '📋 Course link copied to clipboard! Share it with your friends.';

              document.body.appendChild(toast);

            }

            // Trigger animation

            setTimeout(() => toast.classList.add('show'), 50);

            setTimeout(() => toast.classList.remove('show'), 3500);

          };



          if (navigator.share) {

            navigator.share(shareData).catch(() => {

              navigator.clipboard.writeText(shareData.url).then(displayToast);

            });

          } else {

            navigator.clipboard.writeText(shareData.url).then(displayToast);

          }

        });

      }

    }



    const stickyBar = document.getElementById('mobileSticky');

    if (stickyBar) stickyBar.style.display = 'none';

  }



  async function checkPurchaseStatus(sb, userId) {

    try {

      const { data: isEnrolled } = await sb.rpc('check_enrollment', { p_course_id: 'python-30day' });

      const { data: profile } = await sb.from('profiles').select('plan, role').eq('id', userId).single();

      

      if (isEnrolled === true || profile?.plan === 'pro' || profile?.plan === 'paid') {

        localStorage.setItem('manodemy_enrolled', 'true');

        unlockAllDays();

        updateCTAsForPaidUser();

        const pricingSection = document.getElementById('pricing');

        if (pricingSection) pricingSection.style.display = 'none';

        closePricingModal();

      }

      

      // Admin link is handled directly in place of the dashboard button.

    } catch (e) {

      console.warn("Purchase status check skipped:", e.message);

    }

  }



  const handleUserSession = async (session) => {

    if (session) {

      localStorage.setItem('manodemy_auth', 'true');

      updateNavForLoggedIn(session.user);

      await checkPurchaseStatus(supabaseClient, session.user.id);

      await saveCountryToProfile(userCountry);

    } else {

      localStorage.removeItem('manodemy_auth');

      localStorage.removeItem('manodemy_enrolled');

    }

  };



  (async () => {

    // Start Geo-Pricing lookup

    await setupGeoPricing();



    if (!supabaseClient) return;

    try {

      const { data: { session } } = await supabaseClient.auth.getSession();

      await handleUserSession(session);

      

      supabaseClient.auth.onAuthStateChange(async (event, session) => {

        if (event === 'SIGNED_IN' && session) {

          await handleUserSession(session);

        } else if (event === 'SIGNED_OUT') {

          localStorage.removeItem('manodemy_auth');

          localStorage.removeItem('manodemy_enrolled');

          window.location.reload();

        }

      });

    } catch (e) {

      console.warn("Session check failed silently:", e);

    }

  })();



  /* ═══ SMOOTH SCROLL for anchor links ═══ */

  document.querySelectorAll('a[href^="#"]').forEach(a => {

    a.addEventListener('click', e => {

      const target = document.querySelector(a.getAttribute('href'));

      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }

    });

  });

});

