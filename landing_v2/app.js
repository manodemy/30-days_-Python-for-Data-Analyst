"use strict";

/* Manodemy Landing v2.0 — App Logic */



document.addEventListener('DOMContentLoaded', () => {

  /* ═══ REFERRAL LINK CAPTURE ═══ */
  const urlParams = new URLSearchParams(window.location.search);
  const refParam = urlParams.get('ref');
  
  if (refParam && refParam.trim().length === 8) {
    const cleanRef = refParam.trim().toUpperCase();
    localStorage.setItem('manodemy_ref', cleanRef);
    localStorage.setItem('manodemy_ref_time', String(Date.now()));
    
    // Clean URL query parameters to avoid ugly urls
    const cleanUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
    window.history.replaceState({ path: cleanUrl }, '', cleanUrl);
  }

  // Display referral banner if code is active (valid for 30 days)
  const savedRef = localStorage.getItem('manodemy_ref');
  const savedRefTime = localStorage.getItem('manodemy_ref_time');
  const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000;

  if (savedRef && savedRefTime && (Date.now() - parseInt(savedRefTime) < thirtyDaysMs)) {
    const banner = document.createElement('div');
    banner.id = 'referralBanner';
    banner.style.cssText = `
      background: linear-gradient(135deg, rgba(6, 182, 212, 0.25), rgba(59, 130, 246, 0.25));
      border-bottom: 1px solid rgba(0, 230, 246, 0.4);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      color: #00E6F6;
      text-align: center;
      padding: 12px 24px;
      font-weight: 600;
      font-size: 0.95rem;
      z-index: 9999;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      animation: slideDown 0.4s ease-out;
      font-family: 'Outfit', sans-serif;
    `;
    banner.innerHTML = `
      <span>🎉 <strong>Referral Applied:</strong> You will get an extra discount (₹100 / $1) at checkout!</span>
      <button id="closeReferralBanner" style="
        background: none;
        border: none;
        color: rgba(255,255,255,0.7);
        font-size: 1.3rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
        transition: color 0.2s;
      " onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,0.7)'">&times;</button>
    `;
    
    // Add slideDown animation keyframes dynamically if not present
    if (!document.getElementById('refAnimationStyles')) {
      const style = document.createElement('style');
      style.id = 'refAnimationStyles';
      style.innerHTML = `
        @keyframes slideDown {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `;
      document.head.appendChild(style);
    }
    
    document.body.insertBefore(banner, document.body.firstChild);
    
    document.getElementById('closeReferralBanner').addEventListener('click', () => {
      banner.style.transition = 'all 0.3s ease';
      banner.style.height = '0';
      banner.style.padding = '0';
      banner.style.opacity = '0';
      setTimeout(() => banner.remove(), 300);
    });
  }

  /* ═══ NAV SCROLL ═══ */

  const nav = document.querySelector('.nav');

  const onScroll = () => {

    if (window.scrollY > 60) nav.classList.add('nav--scrolled');

    else nav.classList.remove('nav--scrolled');

  };

  window.addEventListener('scroll', onScroll, { passive: true });

  onScroll();



  /* ═══ MOBILE MENU (Dropdown) ═══ */

  const hamburger = document.getElementById('hamburger');

  const overlay = document.getElementById('mobileOverlay');

  if (hamburger && overlay) {

    const toggle = (open) => {

      overlay.classList.toggle('active', open);

      hamburger.setAttribute('aria-expanded', String(open));

      if (open) {

        const first = overlay.querySelector('a');

        if (first) first.focus();

      }

    };

    // Toggle on hamburger click (click again to close)
    hamburger.addEventListener('click', (e) => {

      e.stopPropagation();

      toggle(!overlay.classList.contains('active'));

    });

    // Close when a menu link is clicked
    overlay.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggle(false)));

    // Close when clicking outside the dropdown
    document.addEventListener('click', (e) => {

      if (overlay.classList.contains('active') && !overlay.contains(e.target) && e.target !== hamburger) {

        toggle(false);

      }

    });

    // Close on Escape key
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && overlay.classList.contains('active')) toggle(false); });

  }



  /* ═══ HERO VIDEO — Click-to-Play ═══ */

  window.loadHeroVideo = function () {

    const poster = document.getElementById('videoPoster');

    const iframe = document.getElementById('heroVideoFrame');

    if (!poster || !iframe) return;

    // Inject autoplay YouTube src on click (avoids autoplay policy blocking)

    iframe.src = 'https://www.youtube.com/embed/RpB3d0miEhY?autoplay=1&rel=0&modestbranding=1&color=white&iv_load_policy=3';

    // Fade out poster, reveal iframe

    poster.classList.add('hidden');

    iframe.classList.remove('hidden');

  };



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

        window.location.href = '/day01.html';

      } else if (card.dataset.day === '02') {

        window.location.href = '/day02.html';

      } else if (isPaid) {

        window.location.href = `/day${card.dataset.day}.html`;

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

  async function fetchAndDisplayLiveSignups() {
    if (!supabaseClient) return;
    try {
      const { data: count, error } = await supabaseClient.rpc('get_signup_count');
      if (error) {
        console.warn("[Stats] Failed to fetch live signup count:", error.message);
        return;
      }
      const signupCount = parseInt(count, 10);
      if (isNaN(signupCount)) return;

      const totalCount = signupCount;

      // 1. Update right column proof card
      const activeLearnersEl = document.getElementById('hero-active-learners');
      if (activeLearnersEl) {
        activeLearnersEl.textContent = totalCount.toLocaleString('en-US') + '+ Sign Ups';
      }

      // 2. Update social proof strip data-count attribute
      const socialProofEl = document.getElementById('social-proof-learners');
      if (socialProofEl) {
        socialProofEl.dataset.count = totalCount;
        socialProofEl.textContent = totalCount.toLocaleString('en-US') + '+';
      }


    } catch (e) {
      console.warn("[Stats] Error loading live signups:", e);
    }
  }



  const CustomAuthStorage = {
    getItem: (key) => {
      let val = null;
      const match = document.cookie.match(new RegExp('(^| )' + key + '=([^;]+)'));
      if (match) {
        try { val = decodeURIComponent(match[2]); } catch (e) {}
      }
      if (!val) {
        try { val = localStorage.getItem(key); } catch (e) {}
      }
      if (val) {
        try { document.cookie = `${key}=${encodeURIComponent(val)}; path=/; max-age=604800; secure; samesite=lax`; } catch (e) {}
        try { localStorage.setItem(key, val); } catch (e) {}
      }
      return val;
    },
    setItem: (key, value) => {
      try { document.cookie = `${key}=${encodeURIComponent(value)}; path=/; max-age=604800; secure; samesite=lax`; } catch (e) {}
      try { localStorage.setItem(key, value); } catch (e) {}
    },
    removeItem: (key) => {
      try { document.cookie = `${key}=; path=/; max-age=0; secure; samesite=lax`; } catch (e) {}
      try { localStorage.removeItem(key); } catch (e) {}
    }
  };

  try {

    if (window.supabase) {

      supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
        auth: {
          storage: CustomAuthStorage
        }
      });
      fetchAndDisplayLiveSignups();

    }

  } catch (e) {

    console.error("❌ Error initializing Supabase:", e);

  }



  // ═══════ GEO-PRICING & STATE ═══════

  let userCountry = 'US';

  let currentPricing = { amount: 1900, currency: 'USD', display: '$19', original: '$99', discount: '81% OFF' };



  async function setupGeoPricing() {

    const priceNow = document.getElementById('priceNow') || document.querySelector('.price-now span');

    const priceOld = document.getElementById('priceOld') || document.querySelector('.price-old');

    const priceInr = document.getElementById('priceInr') || document.querySelector('.price-inr');

    const discountBadge = document.getElementById('discountBadge') || document.querySelector('.discount-pill');

    const checkoutAmount = document.getElementById('checkoutAmount');

    const checkoutOriginal = document.getElementById('checkoutOriginal');



    // 1. Try URL override first (e.g. ?country=IN or ?country=US)
    const urlParams = new URLSearchParams(window.location.search);
    const countryParam = urlParams.get('country');
    let geoDetected = false;

    if (countryParam) {
      const cp = countryParam.toUpperCase();
      if (cp === 'IN' || cp === 'US') {
        userCountry = cp;
        geoDetected = true;
        console.log("[Geo-pricing] Country overridden via URL:", userCountry);
      }
    }

    // 2. Try Timezone detection (IST timezone is UTC+5:30, i.e., offset of -330 minutes)
    if (!geoDetected) {
      try {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const offset = new Date().getTimezoneOffset();
        if (tz === 'Asia/Kolkata' || tz === 'Asia/Calcutta' || offset === -330) {
          userCountry = 'IN';
          geoDetected = true;
          console.log("[Geo-pricing] Detected India timezone.");
        }
      } catch (e) {
        console.warn("[Geo-pricing] Timezone check failed:", e);
      }
    }

    // 3. Try logged-in user profile country from Supabase
    if (!geoDetected && supabaseClient) {
      try {
        const { data: { session } } = await supabaseClient.auth.getSession();
        if (session) {
          const { data: profile } = await supabaseClient
            .from('profiles')
            .select('country')
            .eq('id', session.user.id)
            .single();
          if (profile?.country && profile.country.length === 2 && profile.country !== 'Unknown') {
            userCountry = profile.country.toUpperCase();
            geoDetected = true;
            console.log("[Geo-pricing] Stored profile country loaded:", userCountry);
          }
        }
      } catch (e) {
        console.warn("[Geo-pricing] Failed to fetch country from profile:", e);
      }
    }

    // 4. Try standard Geo IP APIs if not detected yet
    if (!geoDetected) {
      const geoAPIs = [
        { url: 'https://get.geojs.io/v1/ip/country.json', parse: d => d.country },
        { url: 'https://ipapi.co/json/', parse: d => d.country_code },
        { url: 'https://api.country.is/', parse: d => d.country },
      ];

      try {
        const promises = geoAPIs.map(api => 
          fetch(api.url, { signal: AbortSignal.timeout(1500) })
            .then(res => res.json())
            .then(data => {
              const code = api.parse(data);
              if (code && code.length === 2) return code.toUpperCase();
              throw new Error("Invalid code");
            })
        );
        const resolvedCountry = await Promise.any(promises);
        if (resolvedCountry) {
          userCountry = resolvedCountry;
          geoDetected = true;
          console.log("[Geo-pricing] Detected via parallel API:", userCountry);
        }
      } catch (err) {
        console.warn("[Geo-pricing] Parallel lookup failed or timed out:", err);
      }
    }

    // 5. Fallback: browser language
    if (!geoDetected) {
      const lang = navigator.language || navigator.languages?.[0] || '';
      if (lang === 'en-IN' || lang.endsWith('-IN')) {
        userCountry = 'IN';
      } else {
        console.warn("Geo-pricing: all APIs failed, defaulting to USD.");
        userCountry = 'US';
      }
    }



    let prices = { inr: 149900, usd: 1900, original_inr: 999900, original_usd: 9900, discount_label_inr: '85% OFF', discount_label_usd: '81% OFF' };

    try {

      if (supabaseClient) {

        const { data: dbPricing } = await supabaseClient.from('settings').select('value').eq('key', 'pricing').single();

        if (dbPricing && dbPricing.value) {

          prices = {

            inr: dbPricing.value.inr || 149900,

            usd: dbPricing.value.usd || 1900,

            original_inr: 999900,

            original_usd: 9900,

            discount_label_inr: '85% OFF',

            discount_label_usd: '81% OFF'

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



    // Update comparison table costs dynamically

    const compCostMano = document.getElementById('compare-cost-mano');

    const compCostVideo = document.getElementById('compare-cost-video');

    const compCostSub = document.getElementById('compare-cost-sub');

    const compCostBootcamp = document.getElementById('compare-cost-bootcamp');



    if (userCountry === 'IN') {

      if (compCostMano) compCostMano.innerHTML = '&#x20B9;1,499 (One-Time)';

      if (compCostVideo) compCostVideo.innerHTML = '&#x20B9;800 - &#x20B9;16,000';

      if (compCostSub) compCostSub.innerHTML = '&#x20B9;13,500 - &#x20B9;40,000 / Year';

      if (compCostBootcamp) compCostBootcamp.innerHTML = '&#x20B9;4,00,000 - &#x20B9;13,00,000 Upfront';

    } else {

      if (compCostMano) compCostMano.innerHTML = '$19 (One-Time)';

      if (compCostVideo) compCostVideo.innerHTML = '$10 - $200';

      if (compCostSub) compCostSub.innerHTML = '$168 - $504 / Year';

      if (compCostBootcamp) compCostBootcamp.innerHTML = '$5,000 - $16,450 Upfront';

    }



    document.querySelectorAll('[data-cta="buy"], .btn-nav-buy, .sticky-buy').forEach(btn => {

      btn.innerHTML = btn.innerHTML

        .replace(/\$99/g, currentPricing.display)

        .replace(/&#x20B9;9,999/g, currentPricing.display)

        .replace(/₹9,999/g, currentPricing.display)

        .replace(/\$19/g, currentPricing.display)

        .replace(/&#x20B9;1,499/g, currentPricing.display)

        .replace(/₹1,499/g, currentPricing.display);

    });



    setupGatewayButtons();

    // Remove loading state to reveal final dynamic prices
    document.body.classList.remove('pricing-loading');
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

        <button class="gateway-btn razorpay" id="payRazorpay" type="button">

          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 4l5.5 16h3L17 7.5 14.5 20h3L23 4h-3l-4 11L12.5 4h-3l-4 11L1.5 4H3z"/></svg>

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

    const ppBtn = document.getElementById('payPaypal');



    if (rzpBtn) rzpBtn.addEventListener('click', () => initiatePayment('razorpay'));

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
    navSignin.addEventListener('click', async (e) => {
      if (navSignin.textContent === 'Sign Out') {
        e.preventDefault();
        if (supabaseClient) {
          await supabaseClient.auth.signOut();
          localStorage.removeItem('manodemy_auth');
          localStorage.removeItem('manodemy_enrolled');
          window.location.reload();
        }
        return;
      }
      if (localStorage.getItem('manodemy_auth') === 'true' || navSignin.textContent === 'Dashboard' || navSignin.textContent === 'My Score Card') return;
      e.preventDefault();
      openAuthModal('login');
    });
  }



  // Open signup modal if redirect reason is login_required
  const pageParams = new URLSearchParams(window.location.search);
  if (pageParams.get('reason') === 'login_required') {
    setTimeout(() => {
      openAuthModal('login');
      // Clean query parameters to avoid showing ?reason=login_required on reload
      const cleanUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
      window.history.replaceState({ path: cleanUrl }, '', cleanUrl);
    }, 200);
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

          final_amount: appliedCouponAmount || undefined,

          referral_code: localStorage.getItem('manodemy_ref') || undefined

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

                  razorpay_signature: response.razorpay_signature,

                  contact: response.contact || ''   // ← buyer's phone from Razorpay checkout

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
      couponApplyBtn.disabled = true;

      try {
        const { data, error } = await supabaseClient
          .from('coupons')
          .select('discount_type, discount_value, is_active, expires_at, applies_to')
          .eq('code', code.toUpperCase())
          .single();

        const isActive = data ? (Boolean(data.is_active) === true) : false;
        const expiry = data ? data.expires_at : null;
        const isExpired = expiry && new Date(expiry) < new Date();
        const appliesTo = data?.applies_to || 'both';
        const currencyMatch = appliesTo === 'both' || appliesTo === currentPricing.currency;

        if (data && isActive && !isExpired && currencyMatch) {
          const type = data.discount_type || 'percentage';
          const val = data.discount_value ?? 0;
          
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
          const ppBtn = document.getElementById('payPaypal');
          
          if (rzpBtn) {
            const labelText = (currentPricing.currency === 'INR') ? 'Pay with Razorpay' : 'Pay with Card';
            rzpBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 4l5.5 16h3L17 7.5 14.5 20h3L23 4h-3l-4 11L12.5 4h-3l-4 11L1.5 4H3z"/></svg> ${labelText} — ${displayPrice}`;
          }
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
      } catch (err) {
        console.error('[Coupon] Error:', err);
        couponApplyBtn.textContent = '❌ Error';
        couponApplyBtn.style.color = '#F43F5E';
        setTimeout(() => {
          couponApplyBtn.textContent = 'Apply';
          couponApplyBtn.style.color = '';
        }, 2000);
      } finally {
        couponApplyBtn.disabled = false;
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

            redirectTo: (() => {
              // Use production URL when running locally (file:// or localhost)
              // so it matches Supabase's whitelisted redirect URLs
              const isLocal = window.location.protocol === 'file:' ||
                              window.location.hostname === 'localhost' ||
                              window.location.hostname === '127.0.0.1';
              return isLocal
                ? 'https://manodemy.com/landing_v2/index.html'
                : window.location.href;
            })(),

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



  async function updateNavForLoggedIn(user) {
    const signInBtn = document.getElementById('navSignin');
    if (!signInBtn) return;
    if (!user) {
      signInBtn.textContent = 'Sign In';
      signInBtn.href = '#';
      signInBtn.style.display = 'inline-flex';
      return;
    }

    try {
      if (supabaseClient) {
        const { data: profile } = await supabaseClient
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();

        if (profile && profile.role === 'admin') {
          signInBtn.textContent = '⚙️ Admin Panel';
          signInBtn.href = '../admin.html';
          signInBtn.style.display = 'inline-flex';
          return;
        }
      }
    } catch (e) {
      console.warn('[Admin] Failed to check admin role:', e);
    }

    if (user.email === 'manodamy25@gmail.com') {
      signInBtn.textContent = '⚙️ Admin Panel';
      signInBtn.href = '../admin.html';
      signInBtn.style.display = 'inline-flex';
      return;
    }

    signInBtn.textContent = 'My Score Card';
    signInBtn.href = '../home.html';
    signInBtn.style.display = 'inline-flex';
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

    document.querySelectorAll('[data-cta="buy"]').forEach(btn => {
      if (!btn.closest('.hero-ctas') && !btn.closest('.premium-hero-ctas')) {
        if (btn.classList.contains('btn-nav-buy')) {
          btn.textContent = 'Continue →';
        } else {
          btn.textContent = 'Continue Learning →';
        }
        btn.href = '../home.html';
        btn.onclick = null;
      }
    });

    // 2. Hide the default hero-ctas
    const heroCtas = document.querySelector('.hero-ctas');
    if (heroCtas) {
      heroCtas.style.setProperty('display', 'none', 'important');
    }

    // 3. Render the premium CTAs below the hero-proof cards in the right column
    const heroProof = document.querySelector('.hero-proof');
    if (heroProof) {
      let premiumCtas = document.querySelector('.premium-hero-ctas');
      if (!premiumCtas) {
        premiumCtas = document.createElement('div');
        premiumCtas.className = 'premium-hero-ctas';
        heroProof.parentNode.insertBefore(premiumCtas, heroProof.nextSibling);
      }

      premiumCtas.innerHTML = `
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

      // 4. Inject premium styles dynamically
      if (!document.getElementById('premium-paid-btn-styles')) {
        const styleEl = document.createElement('style');
        styleEl.id = 'premium-paid-btn-styles';
        styleEl.textContent = `
          .premium-hero-ctas {
            display: flex !important;
            flex-direction: row !important;
            gap: 12px !important;
            flex-wrap: nowrap !important;
            margin-top: 1.5rem !important;
            width: 100% !important;
            justify-content: center !important;
            align-items: center !important;
          }
          
          .premium-btn {
            flex: 1 1 auto !important;
            width: auto !important;
            min-width: 140px !important;
            font-family: 'Outfit', sans-serif !important;
            font-weight: 800 !important;
            font-size: 12.5px !important;
            letter-spacing: 0.04em !important;
            text-transform: uppercase !important;
            padding: 12px 20px !important;
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

      // 5. Attach Share Handler
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



  const setAuthCookie = (token, expiresSec) => {
    const maxAge = expiresSec || 604800; // default 7 days
    document.cookie = `sb-access-token=${token}; path=/; max-age=${maxAge}; SameSite=Lax; Secure`;
  };

  const clearAuthCookie = () => {
    document.cookie = `sb-access-token=; path=/; max-age=0; SameSite=Lax; Secure`;
  };

  const handleUserSession = async (session) => {

    if (session) {

      localStorage.setItem('manodemy_auth', 'true');

      if (session.access_token) {
        setAuthCookie(session.access_token, session.expires_in);
      }

      updateNavForLoggedIn(session.user);

      await checkPurchaseStatus(supabaseClient, session.user.id);

      await saveCountryToProfile(userCountry);

    } else {

      localStorage.removeItem('manodemy_auth');

      localStorage.removeItem('manodemy_enrolled');

      clearAuthCookie();

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

          if (!window.pendingBuyIntent) {
            window.location.href = '../home.html';
          }

        } else if (event === 'SIGNED_OUT') {

          localStorage.removeItem('manodemy_auth');

          localStorage.removeItem('manodemy_enrolled');

          clearAuthCookie();

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


  /* ═══ BACK TO TOP BUTTON LOGIC ═══ */
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

});

