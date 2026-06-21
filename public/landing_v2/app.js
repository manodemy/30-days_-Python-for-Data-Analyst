"use strict";

document.addEventListener('DOMContentLoaded', () => {

  /* ═══ REFERRAL LINK CAPTURE ═══ */
  const urlParams = new URLSearchParams(window.location.search);
  const refParam = urlParams.get('ref');
  
  if (refParam && refParam.trim().length === 8) {
    const cleanRef = refParam.trim().toUpperCase();
    localStorage.setItem('manodemy_ref', cleanRef);
    localStorage.setItem('manodemy_ref_time', String(Date.now()));
    
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

  /* ═══ MOBILE NAV OVERLAY ═══ */
  const hamburger = document.getElementById('hamburger');
  const overlay = document.getElementById('mobileOverlay');

  if (hamburger && overlay) {
    const toggle = (open) => {
      overlay.classList.toggle('active', open);
      hamburger.setAttribute('aria-expanded', String(open));
    };

    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      toggle(!overlay.classList.contains('active'));
    });

    overlay.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggle(false)));
    
    document.addEventListener('click', (e) => {
      if (overlay.classList.contains('active') && !overlay.contains(e.target) && e.target !== hamburger) {
        toggle(false);
      }
    });
  }

  /* ═══ STICKY BOTTOM MOBILE CTA ═══ */
  const stickyCta = document.getElementById('stickyMobileCta');
  const checkStickyCta = () => {
    if (!stickyCta) return;
    // Show sticky bottom bar only after scrolling past 600px on mobile
    if (window.innerWidth <= 768 && window.scrollY > 600) {
      stickyCta.style.display = 'block';
    } else {
      stickyCta.style.display = 'none';
    }
  };
  window.addEventListener('scroll', checkStickyCta, { passive: true });
  window.addEventListener('resize', checkStickyCta, { passive: true });

  /* ═══ FAQ ACCORDION ═══ */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close other FAQs
      faqItems.forEach(other => {
        other.classList.remove('active');
        other.querySelector('.faq-answer').style.maxHeight = '0';
      });

      if (!isActive) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });

    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        question.click();
      }
    });
  });

  /* ═══ CURRICULUM TABS ═══ */
  const currTabs = document.querySelectorAll('.curr-tab');
  currTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      currTabs.forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.curr-panel').forEach(p => p.classList.remove('active'));
      document.querySelectorAll('.curr-panel').forEach(p => p.style.display = 'none');
      
      tab.classList.add('active');
      const activePanel = document.getElementById('panel-' + target);
      if (activePanel) {
        activePanel.classList.add('active');
        activePanel.style.display = 'block';
      }
    });
  });

  /* ═══ SCROLL REVEAL (Intersection Observer) ═══ */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Stagger siblings
        const siblings = entry.target.parentElement?.querySelectorAll('.reveal');
        if (siblings) {
          let idx = Array.from(siblings).indexOf(entry.target);
          entry.target.style.transitionDelay = `${idx * 80}ms`;
        }
        entry.target.classList.add('visible');
        if (entry.target.classList.contains('section-head')) {
          const h2 = entry.target.querySelector('h2');
          if (h2) {
            scrambleText(h2, 800);
          }
        }
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

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

  // document.querySelectorAll('[data-count]').forEach(el => counterObs.observe(el));

  /* ═══ 3D STACK INTERACTIVE PARALLAX & FLOATING ANIMATIONS ═══ */
  const heroStack = document.getElementById('heroStack');
  let mouseX = 0, mouseY = 0;
  let currentRotX = 0, currentRotY = 0;
  let useGyro = false;
  let gyroBeta = 0, gyroGamma = 0;

  // Spring smoothing constants
  const springConstant = 0.08;

  // Cards definitions for stagger entrance and idle float
  const cards = [
    {
      el: document.querySelector('.card-python'),
      restingY: 48,
      amplitude: 7,
      period: 7, // seconds
      phase: 0,
      baseTransform: 'translateZ(-40px) rotateY(5deg)'
    },
    {
      el: document.querySelector('.card-excel'),
      restingY: 24,
      amplitude: 8,
      period: 8, // seconds
      phase: 2,
      baseTransform: 'translateZ(0px) rotateY(-4deg)'
    },
    {
      el: document.querySelector('.card-sql'),
      restingY: 0,
      amplitude: 9,
      period: 6, // seconds
      phase: 4,
      baseTransform: 'translateZ(40px)'
    }
  ];

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let entranceSettled = false;

  // Entrance choreography (on first paint / load)
  if (prefersReducedMotion) {
    cards.forEach(card => {
      if (card.el) {
        card.el.style.opacity = '1';
        card.el.style.transform = `${card.baseTransform} translateY(${card.restingY}px)`;
      }
    });
    entranceSettled = true;
  } else {
    // Initial states: opacity 0, translateY offset +40px, scale 0.96
    cards.forEach(card => {
      if (card.el) {
        card.el.style.opacity = '0';
        card.el.style.transform = `${card.baseTransform} translateY(${card.restingY + 40}px) scale(0.96)`;
        card.el.style.transition = 'none';
      }
    });

    // Force reflow
    if (cards[0] && cards[0].el) cards[0].el.offsetHeight;

    // Stagger in back-to-front (Python -> Excel -> SQL)
    cards.forEach((card, index) => {
      if (card.el) {
        card.el.style.transition = 'transform 600ms cubic-bezier(0.16, 1, 0.3, 1), opacity 600ms cubic-bezier(0.16, 1, 0.3, 1)';
        setTimeout(() => {
          card.el.style.opacity = '1';
          card.el.style.transform = `${card.baseTransform} translateY(${card.restingY}px)`;
        }, index * 120);
      }
    });

    // Once settled, remove transition rules to enable lag-free rAF updates
    setTimeout(() => {
      entranceSettled = true;
      cards.forEach(card => {
        if (card.el) {
          card.el.style.transition = 'none';
        }
      });
    }, 120 * 2 + 650);
  }

  let heroInViewport = true;
  let animationFrameId = null;

  const updateParallax = () => {
    if (!heroStack) return;

    let targetRotX = 0;
    let targetRotY = 0;

    if (useGyro) {
      // Gyroscope tilt mapping (max ±6deg)
      targetRotY = Math.max(-6, Math.min(6, gyroGamma / 4));
      targetRotX = Math.max(-6, Math.min(6, (gyroBeta - 45) / 4)); // assume 45deg standard viewing tilt
    } else {
      // Mouse mapping (max ±6deg)
      targetRotY = mouseX * 6;
      targetRotX = mouseY * -6;
    }

    // Apply spring lerp interpolation
    currentRotX += (targetRotX - currentRotX) * springConstant;
    currentRotY += (targetRotY - currentRotY) * springConstant;

    heroStack.style.transform = `rotateX(${currentRotX}deg) rotateY(${currentRotY}deg)`;
    const roadmapStack = document.getElementById('roadmapStack');
    if (roadmapStack) {
      roadmapStack.style.transform = `rotateX(${currentRotX * 0.7}deg) rotateY(${currentRotY * 0.7}deg)`;
    }

    // Independent float loops (only if settled and not reduced motion)
    if (entranceSettled && !prefersReducedMotion) {
      const time = performance.now();
      cards.forEach(card => {
        if (card.el) {
          const floatY = Math.sin((time / 1000) * (2 * Math.PI / card.period) + card.phase) * card.amplitude;
          card.el.style.transform = `${card.baseTransform} translateY(${card.restingY + floatY}px)`;
        }
      });
    }

    if (!window.IntersectionObserver || heroInViewport) {
      animationFrameId = requestAnimationFrame(updateParallax);
    }
  };

  // Mouse move handler (desktop)
  window.addEventListener('mousemove', (e) => {
    if (useGyro) return;
    const normX = (e.clientX / window.innerWidth) * 2 - 1;
    const normY = (e.clientY / window.innerHeight) * 2 - 1;
    mouseX = normX;
    mouseY = normY;
  });

  // Tap-to-enable Gyro Tilt on mobile (using standard browser API)
  if (heroStack) {
    heroStack.addEventListener('click', async () => {
      if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
        try {
          const permissionState = await DeviceOrientationEvent.requestPermission();
          if (permissionState === 'granted') {
            useGyro = true;
            window.addEventListener('deviceorientation', handleOrientation, true);
          }
        } catch (err) {
          console.warn("Gyro permission denied:", err);
        }
      } else if (typeof DeviceOrientationEvent !== 'undefined') {
        useGyro = true;
        window.addEventListener('deviceorientation', handleOrientation, true);
      }
    });

    // Scroll linked fallback tilt if sensors not active/granted
    window.addEventListener('scroll', () => {
      if (useGyro) return;
      const rect = heroStack.getBoundingClientRect();
      const viewHeight = window.innerHeight;
      const centerPercent = (rect.top + rect.height / 2) / viewHeight;
      // Map scroll location to ±3deg card tilt fallback
      const scrollTilt = (centerPercent * 2 - 1) * 3;
      currentRotY = scrollTilt;
    }, { passive: true });
  }

  function handleOrientation(event) {
    if (event.beta !== null) gyroBeta = event.beta;
    if (event.gamma !== null) gyroGamma = event.gamma;
  }

  // Viewport checking to pause RAF when out of viewport
  let scenesInViewport = 0;
  const parallaxObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        scenesInViewport++;
      } else {
        scenesInViewport = Math.max(0, scenesInViewport - 1);
      }
    });

    if (scenesInViewport > 0) {
      if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(updateParallax);
      }
    } else {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    }
  }, { threshold: 0.05 });

  const heroSection = document.querySelector('.hero');
  const roadmapScene = document.querySelector('.roadmap-scene');
  if (window.IntersectionObserver) {
    if (heroSection) parallaxObserver.observe(heroSection);
    if (roadmapScene) parallaxObserver.observe(roadmapScene);
  } else {
    // Start animation loop directly if observer not supported
    requestAnimationFrame(updateParallax);
  }

  /* ═══ CHECKOUT & PRICING REGIONAL GATEWAY ═══ */
  const SUPABASE_URL = window.MANODEMY_CONFIG?.SUPA_URL || 'https://erqoyvbuhmkyvcqgwcbz.supabase.co';
  const SUPABASE_ANON_KEY = window.MANODEMY_CONFIG?.SUPA_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVycW95dmJ1aG1reXZjcWd3Y2J6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkzODk1MTIsImV4cCI6MjA5NDk2NTUxMn0.9UnIfq8xMrKANPPTtoOADKH-NJ_it9HDp7xrJL4FXtw';
  
  let supabaseClient = null;
  let userCountry = 'US';
  let pricingConfigs = {
    selfpaced: { amount: 4900,  currency: 'USD', display: '$49',   original: '$149',    discount: '67% OFF', planName: '60-Day Self-Paced Masterclass' },
    live:      { amount: 14900, currency: 'USD', display: '$149',  original: '$499',    discount: '70% OFF', planName: '60-Day Daily Live Masterclass' }
  };
  let activeTier = 'selfpaced';

  if (window.supabase) {
    try {
      supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      fetchLiveCounts();
    } catch (e) {
      console.error("Supabase init error:", e);
    }
  }

  // Fetch live learner stats from Supabase
  async function fetchLiveCounts() {
    if (!supabaseClient) return;
    try {
      const { data: count, error } = await supabaseClient.rpc('get_signup_count');
      if (error) throw error;
      const num = parseInt(count, 10);
      if (isNaN(num)) return;

      const activeLearnersEl = document.getElementById('hero-active-learners');
      if (activeLearnersEl) activeLearnersEl.textContent = num.toLocaleString('en-US') + '+ Sign Ups';

      const socialProofEl = document.getElementById('social-proof-learners');
      if (socialProofEl) {
        socialProofEl.dataset.count = num;
        socialProofEl.textContent = num.toLocaleString('en-US') + '+';
      }
    } catch (err) {
      console.warn("Learner count RPC failed, fallback active:", err);
    }
  }

  // Setup regional checkout pricing (two-tier: self-paced + daily live)
  async function detectGeoPricing() {
    // Timezone check
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const offset = new Date().getTimezoneOffset();
      if (tz === 'Asia/Kolkata' || tz === 'Asia/Calcutta' || offset === -330) {
        userCountry = 'IN';
      }
    } catch (e) {}

    // Geo IP lookup
    try {
      const res = await fetch('https://get.geojs.io/v1/ip/country.json', { signal: AbortSignal.timeout(1500) });
      if (res.ok) {
        const data = await res.json();
        if (data.country === 'IN') userCountry = 'IN';
      }
    } catch (err) {}

    if (userCountry === 'IN') {
      pricingConfigs.selfpaced = { amount: 299900, currency: 'INR', display: '₹2,999',  original: '₹9,999',   discount: '70% OFF', planName: '60-Day Self-Paced Masterclass' };
      pricingConfigs.live      = { amount: 999900, currency: 'INR', display: '₹9,999',  original: '₹39,999',  discount: '75% OFF', planName: '60-Day Daily Live Masterclass' };
    } else {
      pricingConfigs.selfpaced = { amount: 4900,   currency: 'USD', display: '$49',     original: '$149',     discount: '67% OFF', planName: '60-Day Self-Paced Masterclass' };
      pricingConfigs.live      = { amount: 14900,  currency: 'USD', display: '$149',    original: '$499',     discount: '70% OFF', planName: '60-Day Daily Live Masterclass' };
    }

    const sp = pricingConfigs.selfpaced;
    const lv = pricingConfigs.live;

    // Update self-paced pricing card
    const priceSelfNow      = document.getElementById('priceSelfNow');
    const priceSelfOld      = document.getElementById('priceSelfOld');
    const priceSelfDiscount = document.getElementById('priceSelfDiscount');
    if (priceSelfNow)      priceSelfNow.textContent      = sp.display;
    if (priceSelfOld)      priceSelfOld.textContent      = sp.original;
    if (priceSelfDiscount) priceSelfDiscount.textContent = sp.discount;

    // Update live pricing card
    const priceLiveNow      = document.getElementById('priceLiveNow');
    const priceLiveOld      = document.getElementById('priceLiveOld');
    const priceLiveDiscount = document.getElementById('priceLiveDiscount');
    if (priceLiveNow)      priceLiveNow.textContent      = lv.display;
    if (priceLiveOld)      priceLiveOld.textContent      = lv.original;
    if (priceLiveDiscount) priceLiveDiscount.textContent = lv.discount;

    // Update nav / mobile menu "from" price (self-paced is the entry price)
    document.querySelectorAll('.dynamic-price-from').forEach(el => el.textContent = sp.display);

    // Update live price in final CTA
    document.querySelectorAll('.dynamic-price-live').forEach(el => el.textContent = lv.display);

    // Update sticky mobile CTA (shows self-paced price)
    const mPrice    = document.querySelector('.m-price');
    const mPriceOld = document.querySelector('.m-price-old');
    if (mPrice)    mPrice.textContent    = sp.display;
    if (mPriceOld) mPriceOld.textContent = sp.original;

    // Update comparison table cost row
    const compareCostMano = document.getElementById('compare-cost-mano');
    if (compareCostMano) compareCostMano.textContent = `From ${sp.display} (One-Time)`;

    // Set checkout to default tier
    updateCheckoutForTier('selfpaced');
  }

  detectGeoPricing();

  // Update checkout modal UI for the selected tier
  function updateCheckoutForTier(tier) {
    activeTier = tier;
    const cfg = pricingConfigs[tier];
    const isLive = tier === 'live';

    const checkoutAmount   = document.getElementById('checkoutAmount');
    const checkoutOriginal = document.getElementById('checkoutOriginal');
    const checkoutTierPill = document.getElementById('checkoutTierPill');
    const checkoutPlanName = document.getElementById('checkoutPlanName');
    const switchBtn        = document.getElementById('checkoutSwitchTier');

    if (checkoutAmount)   checkoutAmount.textContent   = cfg.display;
    if (checkoutOriginal) checkoutOriginal.textContent = cfg.original;
    if (checkoutPlanName) checkoutPlanName.textContent = cfg.planName;

    if (checkoutTierPill) {
      checkoutTierPill.textContent  = isLive ? '🎥 Daily Live Plan' : '⚡ Self-Paced Plan';
      checkoutTierPill.className    = `checkout-tier-pill checkout-tier-pill--${tier}`;
    }

    const other    = isLive ? 'selfpaced' : 'live';
    const otherCfg = pricingConfigs[other];
    if (switchBtn) {
      switchBtn.textContent = isLive
        ? `Switch to Self-Paced plan (${otherCfg.display})`
        : `Switch to Daily Live plan (${otherCfg.display})`;
    }
  }

  /* ═══ CHECKOUT MODAL FLOW ═══ */
  const checkoutOverlay = document.getElementById('checkoutOverlay');
  const checkoutClose = document.getElementById('checkoutClose');
  const buyButtons = document.querySelectorAll('[data-cta="buy"]');

  const openCheckout = (tier = 'selfpaced') => {
    if (localStorage.getItem('manodemy_enrolled') === 'true') {
      window.location.href = '/home.html';
      return;
    }
    updateCheckoutForTier(tier);
    if (checkoutOverlay) {
      checkoutOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      renderPaymentGateways();
    }
  };

  const closeCheckout = () => {
    if (checkoutOverlay) {
      checkoutOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  buyButtons.forEach(btn => btn.addEventListener('click', (e) => {
    e.preventDefault();
    const tier = btn.dataset.tier || 'selfpaced';
    openCheckout(tier);
  }));

  // Tier switch button inside checkout modal
  const switchTierBtn = document.getElementById('checkoutSwitchTier');
  if (switchTierBtn) {
    switchTierBtn.addEventListener('click', () => {
      const newTier = activeTier === 'live' ? 'selfpaced' : 'live';
      updateCheckoutForTier(newTier);
      renderPaymentGateways();
    });
  }

  if (checkoutClose) checkoutClose.addEventListener('click', closeCheckout);
  if (checkoutOverlay) {
    checkoutOverlay.addEventListener('click', (e) => {
      if (e.target === checkoutOverlay) closeCheckout();
    });
  }

  // Render gate selection: Razorpay for INR, PayPal for USD
  function renderPaymentGateways() {
    const gateContainer = document.getElementById('gatewayButtons');
    if (!gateContainer) return;
    
    gateContainer.innerHTML = '';
    
    if (userCountry === 'IN') {
      const btn = document.createElement('button');
      btn.className = 'btn-auth-submit';
      btn.style.background = '#10B981';
      btn.innerHTML = '💳 Pay with Razorpay (UPI, Cards, Netbanking)';
      btn.onclick = triggerRazorpayPayment;
      gateContainer.appendChild(btn);
    } else {
      const btn = document.createElement('button');
      btn.className = 'btn-auth-submit';
      btn.style.background = '#FFB020';
      btn.style.color = '#000';
      btn.innerHTML = '💳 Pay securely with PayPal';
      btn.onclick = triggerPayPalPayment;
      gateContainer.appendChild(btn);
    }
  }

  function triggerRazorpayPayment() {
    const cfg = pricingConfigs[activeTier];
    alert("Razorpay checkout mock selected. Plan: " + cfg.planName + " — Price: " + cfg.display);
  }

  function triggerPayPalPayment() {
    const cfg = pricingConfigs[activeTier];
    alert("PayPal checkout mock selected. Plan: " + cfg.planName + " — Price: " + cfg.display);
  }

  /* ═══ DAY CARD NAVIGATION ═══ */
  const dayCards = document.querySelectorAll('.day-card');
  dayCards.forEach(card => {
    card.addEventListener('click', () => {
      const day = card.dataset.day;
      const isPaid = localStorage.getItem('manodemy_enrolled') === 'true';
      let path = '/day01.html';

      // Detect track type
      const grid = card.closest('.curriculum-grid');
      let track = 'python';
      if (card.closest('#panel-sql')) track = 'sql';
      else if (card.closest('#panel-excel')) track = 'excel';

      if (track === 'sql') {
        if (day === '01') window.location.href = '/sql/day01.html';
        else if (isPaid) window.location.href = `/sql/day${day}.html`;
        else openCheckout();
      } else if (track === 'excel') {
        if (day === '01') window.location.href = '/excel/day01.html';
        else if (isPaid) window.location.href = `/excel/day${day}.html`;
        else openCheckout();
      } else {
        if (day === '01') window.location.href = '/day01.html';
        else if (day === '02') window.location.href = '/day02.html';
        else if (isPaid) window.location.href = `/day${day}.html`;
        else openCheckout();
      }
    });

    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });

  /* ═══ LIVE CLASS SCHEDULER & COUNTDOWNS (IST) ═══ */
  function getISTDate() {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    return new Date(utc + (3600000 * 5.5)); // IST is UTC + 5:30
  }

  function getSessionStatus(type) {
    const istNow = getISTDate();
    const currentDay = istNow.getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat
    const currentHours = istNow.getHours();
    const currentMinutes = istNow.getMinutes();
    const currentSeconds = istNow.getSeconds();

    const currentWeekMinutes = (currentDay * 24 * 60) + (currentHours * 60) + currentMinutes;

    let sessions = [];
    if (type === 'demo') {
      // Saturday & Sunday, 6:00 PM – 7:00 PM IST (Day 6 and 0)
      sessions = [
        { day: 6, startH: 18, startM: 0, endH: 19, endM: 0 },
        { day: 0, startH: 18, startM: 0, endH: 19, endM: 0 }
      ];
    } else if (type === 'batch1') {
      // Daily, 7:30 PM – 8:30 PM IST (Days 0 to 6)
      for (let d = 0; d < 7; d++) {
        sessions.push({ day: d, startH: 19, startM: 30, endH: 20, endM: 30 });
      }
    } else if (type === 'batch2') {
      // Daily, 8:30 PM – 9:30 PM IST (Days 0 to 6)
      for (let d = 0; d < 7; d++) {
        sessions.push({ day: d, startH: 20, startM: 30, endH: 21, endM: 30 });
      }
    }

    // 1. Check if active right now
    for (let s of sessions) {
      if (currentDay === s.day) {
        const nowMin = (currentHours * 60) + currentMinutes;
        const startMin = (s.startH * 60) + s.startM;
        const endMin = (s.endH * 60) + s.endM;
        if (nowMin >= startMin && nowMin < endMin) {
          const minRemaining = endMin - nowMin - 1;
          const secRemaining = 60 - currentSeconds;
          return {
            isActive: true,
            statusText: '🟢 LIVE NOW',
            countdownText: `Ends in ${minRemaining}m ${secRemaining}s`
          };
        }
      }
    }

    // 2. Calculate time to next session start
    let minDiff = Infinity;
    for (let s of sessions) {
      const sessionWeekMinutes = (s.day * 24 * 60) + (s.startH * 60) + s.startM;
      let diff = sessionWeekMinutes - currentWeekMinutes;
      if (diff <= 0) {
        diff += 7 * 24 * 60; // Next week's slot
      }
      if (diff < minDiff) {
        minDiff = diff;
      }
    }

    minDiff = minDiff - 1; // Adjust for second boundary
    const days = Math.floor(minDiff / (24 * 60));
    const hours = Math.floor((minDiff % (24 * 60)) / 60);
    const minutes = minDiff % 60;
    const seconds = 60 - currentSeconds;

    let countdownText = 'Starts in ';
    if (days > 0) {
      countdownText += `${days}d ${hours}h ${minutes}m ${seconds}s`;
    } else if (hours > 0) {
      countdownText += `${hours}h ${minutes}m ${seconds}s`;
    } else {
      countdownText += `${minutes}m ${seconds}s`;
    }

    return {
      isActive: false,
      statusText: '🔴 Scheduled',
      countdownText: countdownText
    };
  }

  function updateLiveScheduler() {
    const types = ['demo', 'batch1', 'batch2'];
    
    types.forEach(type => {
      const status = getSessionStatus(type);
      const statusPill = document.getElementById(`status-${type}`);
      const countdownBox = document.getElementById(`countdown-${type}`);
      const joinBtn = document.getElementById(`btn-${type}`);
      
      if (statusPill) {
        statusPill.textContent = status.statusText;
        if (status.isActive) {
          statusPill.classList.add('live-now');
        } else {
          statusPill.classList.remove('live-now');
        }
      }
      
      if (countdownBox) {
        countdownBox.textContent = status.countdownText;
        if (status.isActive) {
          countdownBox.classList.add('active');
        } else {
          countdownBox.classList.remove('active');
        }
      }
      
      if (joinBtn) {
        if (status.isActive) {
          joinBtn.removeAttribute('disabled');
          joinBtn.classList.add('active');
          joinBtn.classList.remove('disabled');
        } else {
          joinBtn.setAttribute('disabled', 'true');
          joinBtn.classList.remove('active');
          joinBtn.classList.add('disabled');
        }
      }
    });
  }

  // Bind batch join event handlers
  const btnBatch1 = document.getElementById('btn-batch1');
  const btnBatch2 = document.getElementById('btn-batch2');
  const btnDemo = document.getElementById('btn-demo');

  const checkAndJoinBatch = (meetUrl) => {
    const enrolled = localStorage.getItem('manodemy_enrolled') === 'true';
    if (enrolled) {
      window.open(meetUrl, '_blank', 'noopener,noreferrer');
    } else {
      alert("🔒 This batch is for enrolled students only. Please enroll in the Daily Live tier to access cohort links!");
      openCheckout('live');
    }
  };

  if (btnBatch1) {
    btnBatch1.addEventListener('click', (e) => {
      e.preventDefault();
      if (!btnBatch1.classList.contains('active')) return;
      checkAndJoinBatch('https://meet.google.com/ndy-jymp-azz');
    });
  }

  if (btnBatch2) {
    btnBatch2.addEventListener('click', (e) => {
      e.preventDefault();
      if (!btnBatch2.classList.contains('active')) return;
      checkAndJoinBatch('https://meet.google.com/gjy-jsxd-txa');
    });
  }

  if (btnDemo) {
    btnDemo.addEventListener('click', (e) => {
      if (!btnDemo.classList.contains('active')) {
        e.preventDefault();
      }
    });
  }

  updateLiveScheduler();
  setInterval(updateLiveScheduler, 1000);

  /* ═══ V6 MOTION SYSTEM: TEXT SCRAMBLER REVEAL ═══ */
  function scrambleText(element, durationMs = 1000) {
    // Disabled text scrambling animation to display all content immediately on refresh/scroll
  }

});
