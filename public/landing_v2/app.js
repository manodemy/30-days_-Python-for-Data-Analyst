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
  let navScrolled = false;
  const onScroll = () => {
    const shouldScroll = window.scrollY > 60;
    if (shouldScroll !== navScrolled) {
      navScrolled = shouldScroll;
      nav.classList.toggle('nav--scrolled', shouldScroll);
    }
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
  let stickyVisible = false;
  
  const checkStickyCta = () => {
    if (!stickyCta) return;
    // Show sticky bottom bar only after scrolling past 600px on mobile
    const shouldBeVisible = (window.innerWidth <= 768 && window.scrollY > 600);
    if (shouldBeVisible !== stickyVisible) {
      stickyVisible = shouldBeVisible;
      stickyCta.style.display = shouldBeVisible ? 'flex' : 'none';
    }
  };
  window.addEventListener('scroll', checkStickyCta, { passive: true });
  window.addEventListener('resize', checkStickyCta, { passive: true });

  // Tab switching logic inside sticky bottom mobile CTA
  const stickyTabs = document.querySelectorAll('#stickyMobileCta .cta-tab-btn');
  const stickyEnrollBtn = document.getElementById('stickyEnrollBtn');

  if (stickyTabs.length > 0) {
    stickyTabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        e.preventDefault();
        stickyTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const tier = tab.dataset.tabTier || 'selfpaced';
        if (stickyEnrollBtn) {
          stickyEnrollBtn.dataset.tier = tier;
        }

        const cfg = pricingConfigs[tier];
        const mPrice = document.querySelector('.m-price');
        const mPriceOld = document.querySelector('.m-price-old');
        if (mPrice && cfg) mPrice.textContent = cfg.display;
        if (mPriceOld && cfg) mPriceOld.textContent = cfg.original;
      });
    });
  }

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
    let heroStackTop = 0;
    let heroStackHeight = 0;

    const measureHeroStack = () => {
      if (heroStack) {
        const rect = heroStack.getBoundingClientRect();
        heroStackTop = rect.top + window.scrollY;
        heroStackHeight = rect.height;
      }
    };
    measureHeroStack();
    window.addEventListener('resize', measureHeroStack, { passive: true });

    window.addEventListener('scroll', () => {
      if (useGyro) return;
      const centerPercent = (heroStackTop - window.scrollY + heroStackHeight / 2) / window.innerHeight;
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
  const RAZORPAY_KEY_ID = 'rzp_live_SnbHZn5Q7rYNAP';
  const PAYPAL_CLIENT_ID = '';
  
  let supabaseClient = null;
  let userCountry = 'US';
  let pricingConfigs = {
    selfpaced: { amount: 4900,  currency: 'USD', display: '$49',   original: '$149',    discount: '67% OFF', planName: '60-Day Self-Paced Masterclass' },
    live:      { amount: 14900, currency: 'USD', display: '$149',  original: '$499',    discount: '70% OFF', planName: '60-Day Daily Live Masterclass' }
  };
  let activeTier = 'selfpaced';
  
  let appliedCouponCode = '';
  let appliedCouponAmount = null;
  let currentPricing = { amount: 4900, currency: 'USD', display: '$49', original: '$149', discount: '67% OFF' };

  const CustomAuthStorage = {
          getItem: (key) => {
            let val = null;
            const match = document.cookie.match(new RegExp('(^| )' + key + '=([^;]+)'));
            if (match) {
              try { val = decodeURIComponent(match[2]); } catch (e) {}
            }
            if (!val) {
              let chunks = [];
              for (let i = 0; ; i++) {
                const chunkMatch = document.cookie.match(new RegExp('(^| )' + key + '\.' + i + '=([^;]+)'));
                if (chunkMatch) {
                  try { chunks.push(decodeURIComponent(chunkMatch[2])); } catch (e) { break; }
                } else {
                  break;
                }
              }
              if (chunks.length > 0) {
                val = chunks.join('');
              }
            }
            if (!val) {
              try { val = localStorage.getItem(key); } catch (e) {}
            }
            if (val) {
              try { localStorage.setItem(key, val); } catch (e) {}
              if (!document.cookie.includes(key)) {
                CustomAuthStorage.setItem(key, val);
              }
            }
            return val;
          },
          setItem: (key, value) => {
            try { localStorage.setItem(key, value); } catch (e) {}
            document.cookie = `${key}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; secure; samesite=lax`;
            for (let i = 0; i < 10; i++) {
              document.cookie = `${key}.${i}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; secure; samesite=lax`;
            }
            const encodedValue = encodeURIComponent(value);
            const MAX_CHUNK_SIZE = 3000;
            if (encodedValue.length <= MAX_CHUNK_SIZE) {
              try {
                document.cookie = `${key}=${encodedValue}; path=/; max-age=604800; secure; samesite=lax`;
              } catch (e) {}
            } else {
              let offset = 0;
              let chunkIndex = 0;
              while (offset < encodedValue.length) {
                const chunk = encodedValue.slice(offset, offset + MAX_CHUNK_SIZE);
                try {
                  document.cookie = `${key}.${chunkIndex}=${chunk}; path=/; max-age=604800; secure; samesite=lax`;
                } catch (e) {}
                offset += MAX_CHUNK_SIZE;
                chunkIndex++;
              }
            }
          },
          removeItem: (key) => {
            try { localStorage.removeItem(key); } catch (e) {}
            document.cookie = `${key}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; secure; samesite=lax`;
            for (let i = 0; i < 10; i++) {
              document.cookie = `${key}.${i}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; secure; samesite=lax`;
            }
          }
        };

  if (window.supabase) {
    try {
      supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
        auth: {
          storage: CustomAuthStorage
        }
      });
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

    // Update sticky mobile CTA based on active tab
    const mPrice    = document.querySelector('.m-price');
    const mPriceOld = document.querySelector('.m-price-old');
    const activeTab = document.querySelector('#stickyMobileCta .cta-tab-btn.active');
    const activeTier = activeTab ? activeTab.dataset.tabTier : 'selfpaced';
    const activeCfg = pricingConfigs[activeTier];
    if (mPrice && activeCfg)    mPrice.textContent    = activeCfg.display;
    if (mPriceOld && activeCfg) mPriceOld.textContent = activeCfg.original;

    // Update comparison table cost row
    const compareCostMano = document.getElementById('compare-cost-mano');
    if (compareCostMano) compareCostMano.textContent = `From ${sp.display} (One-Time)`;

    // Set checkout to default tier
    updateCheckoutForTier('selfpaced');
  }

  // Update checkout modal UI for the selected tier
  function updateCheckoutForTier(tier) {
    activeTier = tier;
    const cfg = pricingConfigs[tier];
    const isLive = tier === 'live';

    currentPricing = {
      amount: cfg.amount,
      currency: cfg.currency,
      display: cfg.display,
      original: cfg.original,
      discount: cfg.discount
    };

    const checkoutAmount   = document.getElementById('checkoutAmount');
    const checkoutOriginal = document.getElementById('checkoutOriginal');
    const checkoutTierPill = document.getElementById('checkoutTierPill');
    const checkoutPlanName = document.getElementById('checkoutPlanName');
    const switchBtn        = document.getElementById('checkoutSwitchTier');

    if (checkoutAmount)   checkoutAmount.textContent   = cfg.display;
    if (checkoutOriginal) checkoutOriginal.textContent = cfg.original;
    if (checkoutPlanName) checkoutPlanName.textContent = cfg.planName;

    if (checkoutTierPill) {
      checkoutTierPill.textContent  = isLive ? '🎥 Live Class Plan' : '⚡ Self-Paced Plan';
      checkoutTierPill.className    = `checkout-tier-pill checkout-tier-pill--${tier}`;
    }

    const other    = isLive ? 'selfpaced' : 'live';
    const otherCfg = pricingConfigs[other];
    if (switchBtn) {
      switchBtn.textContent = isLive
        ? `Switch to Self-Paced plan (${otherCfg.display})`
        : `Switch to Live Class Plan (${otherCfg.display})`;
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
    
    // Clone pricing card to show inside checkout
    const container = document.getElementById('checkoutCardContainer');
    if (container) {
      container.innerHTML = '';
      const originalCard = document.querySelector(`.pricing-card--${tier}`);
      if (originalCard) {
        const clonedCard = originalCard.cloneNode(true);
        const buyBtn = clonedCard.querySelector('.pricing-buy-btn');
        if (buyBtn) buyBtn.style.display = 'none';
        const previewLink = clonedCard.querySelector('.pricing-meet-link');
        if (previewLink) previewLink.style.display = 'none';
        container.appendChild(clonedCard);
      }
    }

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
      
      const container = document.getElementById('checkoutCardContainer');
      if (container) {
        container.innerHTML = '';
        const originalCard = document.querySelector(`.pricing-card--${newTier}`);
        if (originalCard) {
          const clonedCard = originalCard.cloneNode(true);
          const buyBtn = clonedCard.querySelector('.pricing-buy-btn');
          if (buyBtn) buyBtn.style.display = 'none';
          const previewLink = clonedCard.querySelector('.pricing-meet-link');
          if (previewLink) previewLink.style.display = 'none';
          container.appendChild(clonedCard);
        }
      }

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
    
    const displayPrice = appliedCouponAmount !== null
      ? (currentPricing.currency === 'INR' ? '₹' + (appliedCouponAmount / 100).toLocaleString('en-IN') : '$' + (appliedCouponAmount / 100))
      : currentPricing.display;
    
    if (userCountry === 'IN') {
      const btn = document.createElement('button');
      btn.className = 'btn-auth-submit';
      btn.style.background = '#10B981';
      btn.innerHTML = `💳 Pay with Razorpay (UPI, Cards, Netbanking) — ${displayPrice}`;
      btn.onclick = () => handlePaymentClick('razorpay');
      gateContainer.appendChild(btn);
    } else {
      const btn = document.createElement('button');
      btn.className = 'btn-auth-submit';
      btn.style.background = '#FFB020';
      btn.style.color = '#000';
      btn.innerHTML = `💳 Pay securely with PayPal — ${displayPrice}`;
      btn.onclick = () => handlePaymentClick('paypal');
      gateContainer.appendChild(btn);
    }
  }

  async function handlePaymentClick(gateway) {
    if (!supabaseClient) {
      alert("Authentication services are currently offline.");
      return;
    }
    
    try {
      const { data: { session } } = await supabaseClient.auth.getSession();
      if (!session) {
        window.pendingCheckout = {
          tier: activeTier,
          gateway: gateway
        };
        closeCheckout();
        openAuthModal('login');
        return;
      }
      
      await initiatePayment(gateway);
    } catch (err) {
      console.error("Payment click handler failed:", err);
    }
  }

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
          closeCheckout();
          window.location.href = '/home.html';
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
          description: '60-Day Data Analyst Masterclass',
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
                  contact: response.contact || ''
                })
              });
              const result = await verifyRes.json();
              if (result.success) {
                unlockAllDays();
                updateCTAsForPaidUser();
                closeCheckout();
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
        closeCheckout();
      } else if (gateway === 'paypal') {
        await loadPayPalSDK();
        closeCheckout();
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

  /* ═══ DAY CARD NAVIGATION ═══ */
  const dayCards = document.querySelectorAll('.day-card');
  dayCards.forEach(card => {
    card.addEventListener('click', () => {
      const day = card.dataset.day;
      const isPaid = localStorage.getItem('manodemy_enrolled') === 'true'
        || localStorage.getItem('manodemy_enrolled_sql') === 'true'
        || localStorage.getItem('manodemy_enrolled_excel') === 'true'
        || localStorage.getItem('manodemy_enrolled_python') === 'true';
      let path = '/day01.html';

      // Detect track type
      const grid = card.closest('.curriculum-grid');
      let track = 'python';
      if (card.closest('#panel-sql')) track = 'sql';
      else if (card.closest('#panel-excel')) track = 'excel';

      if (track === 'sql') {
        if (day === '01') window.location.href = '/sql/day01.html';
        else if (day === '02') window.location.href = '/sql/day02.html';
        else if (isPaid) window.location.href = `/notebook/sql-day${day}`;
        else openCheckout();
      } else if (track === 'excel') {
        if (day === '01') window.location.href = '/excel/day01.html';
        else if (day === '02') window.location.href = '/excel/day02.html';
        else if (isPaid) window.location.href = `/notebook/excel-day${day}`;
        else openCheckout();
      } else {
        if (day === '01') window.location.href = '/day01.html';
        else if (day === '02') window.location.href = '/day02.html';
        else if (isPaid) window.location.href = `/notebook/day${day}`;
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
      alert("🔒 This batch is for enrolled students only. Please enroll in the Live Class Plan to access cohort links!");
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

  /* ═══ NAVBAR ENROLL DROPDOWNS ═══ */
  const navEnrollBtn = document.getElementById('navEnrollBtn');
  const navEnrollDropdown = document.getElementById('navEnrollDropdown');
  const mobEnrollBtn = document.getElementById('mobEnrollBtn');
  const mobEnrollDropdown = document.getElementById('mobEnrollDropdown');

  const toggleDropdown = (btn, menu) => {
    if (!menu) return;
    const isActive = menu.classList.contains('active');
    
    // Close other nav buy dropdowns first
    if (navEnrollDropdown && navEnrollDropdown !== menu) navEnrollDropdown.classList.remove('active');
    if (mobEnrollDropdown && mobEnrollDropdown !== menu) mobEnrollDropdown.classList.remove('active');
    
    if (isActive) {
      menu.classList.remove('active');
    } else {
      menu.classList.add('active');
    }
  };

  if (navEnrollBtn && navEnrollDropdown) {
    navEnrollBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleDropdown(navEnrollBtn, navEnrollDropdown);
    });
  }

  if (mobEnrollBtn && mobEnrollDropdown) {
    mobEnrollBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleDropdown(mobEnrollBtn, mobEnrollDropdown);
    });
  }

  // Prevent dropdown closing when clicking inside the menus
  document.querySelectorAll('.nav-buy-dropdown-menu, .mob-buy-dropdown-menu').forEach(menu => {
    menu.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  });

  // Bind clicks on "Enroll" buttons inside the dropdown menus
  document.querySelectorAll('.dropdown-tier-buy').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const tier = btn.dataset.tier || 'selfpaced';
      
      // Close dropdown menus
      if (navEnrollDropdown) navEnrollDropdown.classList.remove('active');
      if (mobEnrollDropdown) mobEnrollDropdown.classList.remove('active');
      
      // Open Checkout
      openCheckout(tier);
    });
  });

  // Close dropdowns when clicking anywhere outside
  document.addEventListener('click', () => {
    if (navEnrollDropdown) navEnrollDropdown.classList.remove('active');
    if (mobEnrollDropdown) mobEnrollDropdown.classList.remove('active');
  });

  /* ═══ V6 MOTION SYSTEM: TEXT SCRAMBLER REVEAL ═══ */
  function scrambleText(element, durationMs = 1000) {
    // Disabled text scrambling animation to display all content immediately on refresh/scroll
  }

  // ═══════ COUPON STATE & VALIDATION ═══════
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

          appliedCouponCode = code.toUpperCase();
          appliedCouponAmount = newAmount;

          renderPaymentGateways();
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
          renderPaymentGateways();
        }
      } catch (err) {
        console.error('[Coupon] Error:', err);
        couponApplyBtn.textContent = '❌ Error';
        couponApplyBtn.style.color = '#F43F5E';
        setTimeout(() => {
          couponApplyBtn.textContent = 'Apply';
          couponApplyBtn.style.color = '';
        }, 2000);
        renderPaymentGateways();
      } finally {
        couponApplyBtn.disabled = false;
      }
    });
  }

  // ═══════ AUTH REGISTRATION & EVENT LISTENERS ═══════
  const authModal = document.getElementById('authModal');
  const landingLoginForm = document.getElementById('landingLoginForm');
  const googleSigninBtn = document.getElementById('google-signin-btn');
  const btnLandingSubmit = document.getElementById('btnLandingSubmit');
  
  const linkLandingForgot = document.getElementById('linkLandingForgot');
  const linkLandingSignup = document.getElementById('linkLandingSignup');
  const linkBackToLogin = document.getElementById('linkBackToLogin');
  
  const authTitle = document.getElementById('authTitle');
  const authSubtitle = document.getElementById('authSubtitle');
  const authMsg = document.getElementById('authMessage');
  const socialAuthSection = document.getElementById('socialAuthSection');
  
  const landingName = document.getElementById('landingName');
  const landingEmail = document.getElementById('landingEmail');
  const landingPassword = document.getElementById('landingPassword');
  const landingConfirmPassword = document.getElementById('landingConfirmPassword');
  
  let authState = 'login'; // 'login' | 'signup' | 'forgot'
  window.pendingCheckout = null;
  window.justSignedIn = false;
  
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

  const switchAuthState = (state) => {
    authState = state;
    clearAuthMessage();

    if (state === 'login') {
      if (authTitle) authTitle.innerHTML = 'Join the Challenge';
      if (authSubtitle) authSubtitle.textContent = 'Sign in to start learning';
      if (socialAuthSection) socialAuthSection.style.display = '';
      if (landingName) landingName.style.display = 'none';
      if (landingPassword) landingPassword.style.display = '';
      if (landingConfirmPassword) landingConfirmPassword.style.display = 'none';
      if (btnLandingSubmit) btnLandingSubmit.textContent = 'Login';
      if (linkLandingForgot) linkLandingForgot.style.display = '';
      if (linkLandingSignup) { linkLandingSignup.style.display = ''; linkLandingSignup.textContent = 'Create Account'; }
      if (linkBackToLogin) linkBackToLogin.style.display = 'none';
    } else if (state === 'signup') {
      if (authTitle) authTitle.innerHTML = 'Create Account';
      if (authSubtitle) authSubtitle.textContent = 'Join thousands of learners';
      if (socialAuthSection) socialAuthSection.style.display = 'none';
      if (landingName) landingName.style.display = '';
      if (landingPassword) landingPassword.style.display = '';
      if (landingConfirmPassword) landingConfirmPassword.style.display = '';
      if (btnLandingSubmit) btnLandingSubmit.textContent = 'Sign Up';
      if (linkLandingForgot) linkLandingForgot.style.display = 'none';
      if (linkLandingSignup) linkLandingSignup.style.display = 'none';
      if (linkBackToLogin) linkBackToLogin.style.display = '';
    } else if (state === 'forgot') {
      if (authTitle) authTitle.innerHTML = 'Reset Password';
      if (authSubtitle) authSubtitle.textContent = 'Enter your email to receive a reset link';
      if (socialAuthSection) socialAuthSection.style.display = 'none';
      if (landingName) landingName.style.display = 'none';
      if (landingPassword) landingPassword.style.display = 'none';
      if (landingConfirmPassword) landingConfirmPassword.style.display = 'none';
      if (btnLandingSubmit) btnLandingSubmit.textContent = 'Send Reset Link';
      if (linkLandingForgot) linkLandingForgot.style.display = 'none';
      if (linkLandingSignup) linkLandingSignup.style.display = 'none';
      if (linkBackToLogin) linkBackToLogin.style.display = '';
    }
  };

  if (linkLandingSignup) linkLandingSignup.addEventListener('click', e => { e.preventDefault(); switchAuthState('signup'); });
  if (linkLandingForgot) linkLandingForgot.addEventListener('click', e => { e.preventDefault(); switchAuthState('forgot'); });
  if (linkBackToLogin) linkBackToLogin.addEventListener('click', e => { e.preventDefault(); switchAuthState('login'); });

  if (landingLoginForm) {
    landingLoginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      clearAuthMessage();
      if (!supabaseClient) { setAuthMessage("Authentication services are currently offline.", "error"); return; }

      const email = landingEmail.value.trim();
      const password = landingPassword.value;
      const name = landingName ? landingName.value.trim() : '';
      const confirmPass = landingConfirmPassword ? landingConfirmPassword.value : '';

      btnLandingSubmit.disabled = true;
      btnLandingSubmit.style.opacity = '0.7';
      const originalText = btnLandingSubmit.textContent;

      try {
        if (authState === 'login') {
          btnLandingSubmit.textContent = 'Signing in...';
          window.justSignedIn = true;
          const { error } = await supabaseClient.auth.signInWithPassword({ email, password });
          if (error) {
            window.justSignedIn = false;
            if (error.message.toLowerCase().includes('invalid login credentials')) {
              throw new Error("Incorrect email or password. Need an account? Click 'Create Account'.");
            }
            throw error;
          }
          closeAuthModal();
        } else if (authState === 'signup') {
          if (!name) { setAuthMessage("Please enter your full name.", "error"); throw new Error("_handled"); }
          if (password.length < 6) { setAuthMessage("Password must be at least 6 characters.", "error"); throw new Error("_handled"); }
          if (password !== confirmPass) { setAuthMessage("Passwords do not match.", "error"); throw new Error("_handled"); }

          btnLandingSubmit.textContent = 'Creating Account...';
          window.justSignedIn = true;
          const { data, error } = await supabaseClient.auth.signUp({
            email, password,
            options: { data: { full_name: name } }
          });
          if (error) {
            window.justSignedIn = false;
            throw error;
          }
          if (data?.user?.identities?.length === 0) {
            window.justSignedIn = false;
            setAuthMessage("This email is already registered. Please log in.", "info");
          } else {
            setAuthMessage("Account created! Check your email to verify, then log in.", "success");
          }
        } else if (authState === 'forgot') {
          btnLandingSubmit.textContent = 'Sending...';
          const basePath = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/'));
          const resetUrl = window.location.origin + basePath + '/reset-password.html';
          const { error } = await supabaseClient.auth.resetPasswordForEmail(email, { redirectTo: resetUrl });
          if (error) throw error;
          setAuthMessage("If an account exists, a recovery link has been sent to your email.", "success");
        }
      } catch (err) {
        if (err.message !== "_handled") { setAuthMessage(err.message, "error"); }
      } finally {
        btnLandingSubmit.disabled = false;
        btnLandingSubmit.style.opacity = '1';
        btnLandingSubmit.textContent = originalText;
      }
    });
  }

  if (googleSigninBtn) {
    googleSigninBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      if (!supabaseClient) { setAuthMessage("Authentication services are currently offline.", "error"); return; }

      const originalText = googleSigninBtn.innerHTML;
      googleSigninBtn.innerHTML = 'Redirecting securely...';
      googleSigninBtn.disabled = true;
      googleSigninBtn.style.opacity = '0.7';

      localStorage.setItem('manodemy_oauth_in_progress', 'true');
      if (window.pendingCheckout) {
        localStorage.setItem('manodemy_pending_checkout', JSON.stringify(window.pendingCheckout));
      }

      try {
        const { error } = await supabaseClient.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: (() => {
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
          googleSigninBtn.innerHTML = originalText;
          googleSigninBtn.disabled = false;
          googleSigninBtn.style.opacity = '1';
        }
      } catch (err) {
        googleSigninBtn.innerHTML = originalText;
        googleSigninBtn.disabled = false;
        googleSigninBtn.style.opacity = '1';
      }
    });
  }

  const navSignin = document.getElementById('navSignin');
  if (navSignin) {
    navSignin.addEventListener('click', async (e) => {
      const text = navSignin.textContent || '';
      if (text.includes('Sign Out') || text.includes('Log Out')) {
        e.preventDefault();
        if (supabaseClient) {
          await supabaseClient.auth.signOut();
          localStorage.removeItem('manodemy_auth');
          localStorage.removeItem('manodemy_enrolled');
          window.location.reload();
        }
        return;
      }
      if (localStorage.getItem('manodemy_auth') === 'true' || text.includes('Dashboard') || text.includes('Score Card') || text.includes('Admin')) return;
      e.preventDefault();
      openAuthModal('login');
    });
  }

  async function updateNavForLoggedIn(user) {
    const signInBtn = document.getElementById('navSignin');
    const coursesDropdown = document.getElementById('navMyCoursesDropdown');
    
    if (coursesDropdown) {
      coursesDropdown.style.display = user ? 'block' : 'none';
    }
    
    if (!signInBtn) return;
    if (!user) {
      signInBtn.textContent = 'Sign In';
      signInBtn.href = 'javascript:void(0)';
      return;
    }

    signInBtn.removeAttribute('onclick');

    try {
      if (supabaseClient) {
        const { data: profile } = await supabaseClient
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();

        if (profile && profile.role === 'admin') {
          signInBtn.textContent = '⚙️ Admin Panel';
          signInBtn.href = '/admin.html';
          return;
        }
      }
    } catch (e) {
      console.warn('[Admin] Failed to check admin role:', e);
    }

    if (user.email === 'manodamy25@gmail.com') {
      signInBtn.textContent = '⚙️ Admin Panel';
      signInBtn.href = '/admin.html';
      return;
    }

    signInBtn.textContent = 'My Score Card';
    signInBtn.href = '/home.html';
  }

  function unlockAllDays() {
    document.querySelectorAll('.day-card.locked, .day-card.coming-soon').forEach(card => {
      card.classList.remove('locked');
      card.classList.remove('coming-soon');
      const lock = card.querySelector('.badge-lock');
      if (lock) lock.remove();
    });
    window._userHasPurchased = true;
  }

  function updateCTAsForPaidUser() {
    const navEnrollBtn = document.getElementById('navEnrollBtn');
    if (navEnrollBtn) navEnrollBtn.style.display = 'none';
    const mobEnrollBtn = document.getElementById('mobEnrollBtn');
    if (mobEnrollBtn) mobEnrollBtn.style.display = 'none';
    
    document.querySelectorAll('[data-cta="buy"]').forEach(btn => {
      btn.textContent = 'Continue Learning →';
      btn.href = '/home.html';
      btn.onclick = null;
    });

    unlockAllDays();
  }

  async function checkPurchaseStatus(sb, userId) {
    try {
      const { data: enrolledSql } = await sb.rpc('check_enrollment', { p_course_id: 'sql-20day' });
      const { data: enrolledExcel } = await sb.rpc('check_enrollment', { p_course_id: 'excel-12day' });
      const { data: profile } = await sb.from('profiles').select('plan, plan_type, role').eq('id', userId).single();
      
      const hasPurchased = (
        enrolledSql === true ||
        enrolledExcel === true ||
        profile?.plan === 'pro' ||
        profile?.plan_type === 'premium' ||
        profile?.plan_type === 'pro' ||
        profile?.role === 'admin'
      );
      
      if (hasPurchased) {
        localStorage.setItem('manodemy_enrolled', 'true');
        unlockAllDays();
        updateCTAsForPaidUser();
        const pricingSection = document.getElementById('pricing');
        if (pricingSection) pricingSection.style.display = 'none';
        closeCheckout();
      } else {
        localStorage.setItem('manodemy_enrolled', 'false');
        const pricingSection = document.getElementById('pricing');
        if (pricingSection) pricingSection.style.display = 'block';
      }
    } catch (e) {
      console.warn("Purchase status check skipped:", e.message);
    }
  }

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
        console.log('[Manodemy] Country saved to profile:', countryCode);
      }
    } catch (e) {
      console.warn('[Manodemy] Country capture failed:', e.message);
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
      updateNavForLoggedIn(null);
    }
  };

  (async () => {
    const oauthInProgress = localStorage.getItem('manodemy_oauth_in_progress') === 'true';
    localStorage.removeItem('manodemy_oauth_in_progress');

    const storedPending = localStorage.getItem('manodemy_pending_checkout');
    if (storedPending) {
      try {
        window.pendingCheckout = JSON.parse(storedPending);
      } catch (e) {}
      localStorage.removeItem('manodemy_pending_checkout');
    }

    await detectGeoPricing();

    if (!supabaseClient) return;
    try {
      const { data: { session } } = await supabaseClient.auth.getSession();
      await handleUserSession(session);
      
      supabaseClient.auth.onAuthStateChange(async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          await handleUserSession(session);
          
          const stored = localStorage.getItem('manodemy_pending_checkout');
          if (stored) {
            try { window.pendingCheckout = JSON.parse(stored); } catch(e){}
            localStorage.removeItem('manodemy_pending_checkout');
          }
          
          if (window.pendingCheckout) {
            const currentPending = window.pendingCheckout;
            window.pendingCheckout = null;
            openCheckout(currentPending.tier);
            initiatePayment(currentPending.gateway);
          } else if (window.pendingWriteReview) {
            // User clicked "Write Review" → stay on page; reviews.js will open the form
            window.justSignedIn = false;
          } else if (window.justSignedIn || oauthInProgress) {
            window.justSignedIn = false;
            setTimeout(() => {
              if (!window.pendingCheckout && !window.pendingWriteReview) {
                window.location.href = '/home.html';
              }
            }, 300);
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

});

