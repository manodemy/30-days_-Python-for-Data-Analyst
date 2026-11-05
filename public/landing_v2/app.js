"use strict";

document.addEventListener('DOMContentLoaded', () => {

  /* ═══ CAMPAIGN & AD ATTRIBUTION CAPTURE ═══ */
  if (window.self !== window.top) return; // Prevent iframe embedding from firing tracking

  const urlParams = new URLSearchParams(window.location.search);
  const utmCamp = urlParams.get('utm_campaign') || urlParams.get('campaign') || urlParams.get('c');
  const utmSource = urlParams.get('utm_source') || (document.referrer.includes('instagram.com') ? 'instagram' : 'direct');

  if (utmCamp) {
    const cleanCamp = utmCamp.toLowerCase().trim();
    const existingFirst = localStorage.getItem('manodemy_first_campaign');
    if (!existingFirst) {
      localStorage.setItem('manodemy_first_campaign', cleanCamp);
      document.cookie = `manodemy_first_campaign=${cleanCamp}; path=/; max-age=2592000; SameSite=Lax`;
    }
    localStorage.setItem('manodemy_last_campaign', cleanCamp);
    document.cookie = `manodemy_last_campaign=${cleanCamp}; path=/; max-age=2592000; SameSite=Lax`;
  }

  let visitorId = localStorage.getItem('manodemy_visitor_id');
  if (!visitorId) {
    const cookieMatch = document.cookie.match(/(?:^|; )manodemy_visitor_id=([^;]*)/);
    if (cookieMatch) visitorId = decodeURIComponent(cookieMatch[1]);
  }
  if (!visitorId) {
    visitorId = 'vis_' + Math.random().toString(36).substring(2, 11) + Date.now().toString(36);
    localStorage.setItem('manodemy_visitor_id', visitorId);
  }
  document.cookie = `manodemy_visitor_id=${visitorId}; path=/; max-age=2592000; SameSite=Lax`;

  // Transmit debounced campaign click to Supabase ONLY when utm_campaign is explicitly present
  const campaignToTrack = utmCamp ? utmCamp.toLowerCase().trim() : null;
  if (campaignToTrack) {
    // Rapid-Fire Protection: check if already logged by edge shortlink or in same session within 20s
    const debounceKey = `manodemy_last_click_${campaignToTrack}`;
    const lastTrackTime = parseInt(sessionStorage.getItem(debounceKey) || '0', 10);
    const now = Date.now();
    const isDebounced = (now - lastTrackTime < 20000);
    const isEdgeTracked = document.cookie.includes('manodemy_edge_tracked=1');

    if (isEdgeTracked) {
      sessionStorage.setItem(debounceKey, now.toString());
      document.cookie = 'manodemy_edge_tracked=; path=/; max-age=0; SameSite=Lax';
    } else if (!isDebounced) {
      sessionStorage.setItem(debounceKey, now.toString());

      const SUPA_URL = 'https://erqoyvbuhmkyvcqgwcbz.supabase.co';
      const SUPA_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVycW95dmJ1aG1reXZjcWd3Y2J6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkzODk1MTIsImV4cCI6MjA5NDk2NTUxMn0.9UnIfq8xMrKANPPTtoOADKH-NJ_it9HDp7xrJL4FXtw';

      try {
        fetch(`${SUPA_URL}/rest/v1/campaign_clicks`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': SUPA_KEY,
            'Authorization': `Bearer ${SUPA_KEY}`,
            'Prefer': 'return=minimal'
          },
          body: JSON.stringify({
            campaign_name: campaignToTrack,
            source: utmSource,
            visitor_id: visitorId
          })
        }).then(r => {
          if (r.ok) {
            console.log('[Attribution] ✅ Click logged to campaign_clicks:', campaignToTrack);
          }
        }).catch(err => {
          console.warn('[Attribution] REST notice:', err);
        });
      } catch (err) {
        console.warn('[Attribution] Direct fetch notice:', err);
      }
    }
  }

  window.getAttributionPayload = function() {
    const lastCamp = localStorage.getItem('manodemy_last_campaign') || (document.cookie.match(/(?:^|; )manodemy_last_campaign=([^;]*)/)?.[1]);
    const firstCamp = localStorage.getItem('manodemy_first_campaign') || (document.cookie.match(/(?:^|; )manodemy_first_campaign=([^;]*)/)?.[1]);
    return {
      campaign_name: lastCamp || 'organic_untracked',
      first_touch_campaign: firstCamp || lastCamp || 'organic_untracked',
      last_touch_campaign: lastCamp || 'organic_untracked',
      visitor_id: visitorId || undefined
    };
  };

  /* ═══ REFERRAL LINK CAPTURE ═══ */
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

  document.querySelectorAll('[data-count]:not(#social-proof-learners)').forEach(el => counterObs.observe(el));

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
  const PAYPAL_CLIENT_ID = 'AUPgj63sEEbLWYePzfnuu5prjv15UCPmaUmUY2XwWRRt4H4eI05bmGZpPGguOqhWO23Gg2nzfAMo94vs';
  
  let supabaseClient = null;
  let userCountry = 'US';
  let pricingConfigs = {
    selfpaced: { amount: 4900,  currency: 'USD', display: '$49',   original: '$149',    discount: '67% OFF', planName: '60-Day Self-Paced Masterclass' }
  };
  let activeTier = 'selfpaced';
  
  let appliedCouponCode = '';
  let appliedCouponAmount = null;
  let currentPricing = { amount: 4900, currency: 'USD', display: '$49', original: '$149', discount: '67% OFF' };

  const isSecureEnv = window.location.protocol === 'https:';
  const secureCookieFlag = isSecureEnv ? '; Secure' : '';

  const CustomAuthStorage = {
    getItem: (key) => {
      let val = null;
      try {
        const match = document.cookie.match(new RegExp('(?:^|; )' + key.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'));
        if (match) {
          try { val = decodeURIComponent(match[1]); } catch (e) { val = match[1]; }
        }
        if (!val) {
          let chunks = [];
          for (let i = 0; i < 10; i++) {
            const chunkMatch = document.cookie.match(new RegExp('(?:^|; )' + key.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '\\.' + i + '=([^;]*)'));
            if (chunkMatch) {
              try { chunks.push(decodeURIComponent(chunkMatch[1])); } catch (e) { chunks.push(chunkMatch[1]); }
            } else {
              break;
            }
          }
          if (chunks.length > 0) val = chunks.join('');
        }
      } catch (e) {}

      if (!val) {
        try { val = localStorage.getItem(key); } catch (e) {}
      }
      if (val) {
        try { localStorage.setItem(key, val); } catch (e) {}
        if (!document.cookie.includes(key)) {
          try { CustomAuthStorage.setItem(key, val); } catch (e) {}
        }
      }
      return val;
    },
    setItem: (key, value) => {
      try { localStorage.setItem(key, value); } catch (e) {}
      try {
        document.cookie = `${key}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT${secureCookieFlag}; SameSite=Lax`;
        for (let i = 0; i < 10; i++) {
          document.cookie = `${key}.${i}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT${secureCookieFlag}; SameSite=Lax`;
        }
        const encodedValue = encodeURIComponent(value);
        const MAX_CHUNK_SIZE = 3000;
        if (encodedValue.length <= MAX_CHUNK_SIZE) {
          document.cookie = `${key}=${encodedValue}; path=/; max-age=604800${secureCookieFlag}; SameSite=Lax`;
        } else {
          let offset = 0;
          let chunkIndex = 0;
          while (offset < encodedValue.length) {
            const chunk = encodedValue.substring(offset, offset + MAX_CHUNK_SIZE);
            document.cookie = `${key}.${chunkIndex}=${chunk}; path=/; max-age=604800${secureCookieFlag}; SameSite=Lax`;
            offset += MAX_CHUNK_SIZE;
            chunkIndex++;
          }
        }
      } catch (e) {}
    },
    removeItem: (key) => {
      try { localStorage.removeItem(key); } catch (e) {}
      try {
        document.cookie = `${key}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT${secureCookieFlag}; SameSite=Lax`;
        for (let i = 0; i < 10; i++) {
          document.cookie = `${key}.${i}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT${secureCookieFlag}; SameSite=Lax`;
        }
      } catch (e) {}
    }
  };

  async function ensureSupabaseClient() {
    if (supabaseClient) return supabaseClient;
    if (window.supabase && typeof window.supabase.createClient === 'function') {
      try {
        supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
          auth: { storage: CustomAuthStorage }
        });
        return supabaseClient;
      } catch (e) {
        console.error("Supabase init error:", e);
      }
    }
    return new Promise((resolve) => {
      let attempts = 0;
      const checkInterval = setInterval(() => {
        attempts++;
        if (window.supabase && typeof window.supabase.createClient === 'function') {
          clearInterval(checkInterval);
          try {
            supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
              auth: { storage: CustomAuthStorage }
            });
            resolve(supabaseClient);
          } catch (e) {
            resolve(null);
          }
        } else if (attempts >= 10) {
          clearInterval(checkInterval);
          const script = document.createElement('script');
          script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.39.0/dist/umd/supabase.min.js';
          script.onload = () => {
            try {
              supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
                auth: { storage: CustomAuthStorage }
              });
              resolve(supabaseClient);
            } catch (e) {
              resolve(null);
            }
          };
          script.onerror = () => resolve(null);
          document.head.appendChild(script);
        }
      }, 100);
    });
  }

  // Initialize immediately if window.supabase is ready
  ensureSupabaseClient().then(client => {
    if (client) fetchLiveCounts();
  });

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
        counterObs.observe(socialProofEl);
      }
    } catch (err) {
      console.warn("Learner count RPC failed, fallback active:", err);
      const socialProofEl = document.getElementById('social-proof-learners');
      if (socialProofEl) {
        socialProofEl.dataset.count = 28;
        counterObs.observe(socialProofEl);
      }
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

    // Default fallbacks
    let inrConfig = { amount: 199900, currency: 'INR', display: '₹1,999', original: '₹4,999', discount: '60% OFF', planName: '60-Day Self-Paced Masterclass' };
    let usdConfig = { amount: 4900, currency: 'USD', display: '$49', original: '$149', discount: '67% OFF', planName: '60-Day Self-Paced Masterclass' };

    // Fetch live prices from Supabase settings table
    if (supabaseClient) {
      try {
        const { data: pricingSetting } = await supabaseClient
          .from('settings')
          .select('value')
          .eq('key', 'pricing')
          .single();

        if (pricingSetting && pricingSetting.value) {
          const v = pricingSetting.value;
          if (v.inr && v.original_inr) {
            const inrSale = Number(v.inr) / 100;
            const inrOrig = Number(v.original_inr) / 100;
            const inrPct = v.discount_label || (inrOrig > inrSale ? Math.round(((inrOrig - inrSale) / inrOrig) * 100) + '% OFF' : '70% OFF');
            inrConfig = {
              amount: Number(v.inr),
              currency: 'INR',
              display: '₹' + inrSale.toLocaleString('en-IN'),
              original: '₹' + inrOrig.toLocaleString('en-IN'),
              discount: inrPct,
              planName: '60-Day Self-Paced Masterclass'
            };
          }
          if (v.usd && v.original_usd) {
            const usdSale = Number(v.usd) / 100;
            const usdOrig = Number(v.original_usd) / 100;
            const usdPct = v.discount_label_usd || (usdOrig > usdSale ? Math.round(((usdOrig - usdSale) / usdOrig) * 100) + '% OFF' : '67% OFF');
            usdConfig = {
              amount: Number(v.usd),
              currency: 'USD',
              display: '$' + usdSale,
              original: '$' + usdOrig,
              discount: usdPct,
              planName: '60-Day Self-Paced Masterclass'
            };
          }
        }
      } catch (err) {
        console.warn('[Pricing] Using default fallback pricing:', err);
      }
    }

    // Try reading latest version from pricing_versions if available
    if (supabaseClient) {
      try {
        const { data: latestInr } = await supabaseClient.from('pricing_versions').select('*').eq('region', 'INR').order('effective_from', { ascending: false }).limit(1).maybeSingle();
        if (latestInr && latestInr.sale_price) {
          const inrSale = Number(latestInr.sale_price);
          const inrOrig = Number(latestInr.original_price);
          const inrPct = latestInr.discount_label || (inrOrig > inrSale ? Math.round(((inrOrig - inrSale) / inrOrig) * 100) + '% OFF' : '70% OFF');
          inrConfig = {
            amount: inrSale * 100,
            currency: 'INR',
            display: '₹' + inrSale.toLocaleString('en-IN'),
            original: '₹' + inrOrig.toLocaleString('en-IN'),
            discount: inrPct,
            planName: '60-Day Self-Paced Masterclass'
          };
        }
        const { data: latestUsd } = await supabaseClient.from('pricing_versions').select('*').eq('region', 'USD').order('effective_from', { ascending: false }).limit(1).maybeSingle();
        if (latestUsd && latestUsd.sale_price) {
          const usdSale = Number(latestUsd.sale_price);
          const usdOrig = Number(latestUsd.original_price);
          const usdPct = latestUsd.discount_label || (usdOrig > usdSale ? Math.round(((usdOrig - usdSale) / usdOrig) * 100) + '% OFF' : '67% OFF');
          usdConfig = {
            amount: Math.round(usdSale * 100),
            currency: 'USD',
            display: '$' + usdSale,
            original: '$' + usdOrig,
            discount: usdPct,
            planName: '60-Day Self-Paced Masterclass'
          };
        }
      } catch (pvErr) {}
    }

    if (userCountry === 'IN') {
      pricingConfigs.selfpaced = inrConfig;
    } else {
      pricingConfigs.selfpaced = usdConfig;
    }

    const sp = pricingConfigs.selfpaced;

    // Update self-paced pricing card
    const priceSelfNow      = document.getElementById('priceSelfNow');
    const priceSelfOld      = document.getElementById('priceSelfOld');
    const priceSelfDiscount = document.getElementById('priceSelfDiscount');
    if (priceSelfNow)      priceSelfNow.textContent      = sp.display;
    if (priceSelfOld)      priceSelfOld.textContent      = sp.original;
    if (priceSelfDiscount) priceSelfDiscount.textContent = sp.discount;

    // Update all percentage off badges & ticker text elements across the landing page
    document.querySelectorAll('.dynamic-discount').forEach(el => el.textContent = sp.discount);

    // Update nav / mobile menu "from" price (self-paced is the entry price)
    document.querySelectorAll('.dynamic-price-from').forEach(el => el.textContent = sp.display);

    // Update sticky mobile CTA
    const mPrice    = document.querySelector('.m-price');
    const mPriceOld = document.querySelector('.m-price-old');
    if (mPrice && sp)    mPrice.textContent    = sp.display;
    if (mPriceOld && sp) mPriceOld.textContent = sp.original;

    // Update comparison table cost row dynamically based on regional currency
    const compareCostMano = document.getElementById('compare-cost-mano');
    const compareCostVideo = document.getElementById('compare-cost-video');
    const compareCostSub = document.getElementById('compare-cost-sub');
    const compareCostBootcamp = document.getElementById('compare-cost-bootcamp');

    if (userCountry === 'IN') {
      if (compareCostMano) compareCostMano.textContent = `✅ ${sp.display} (One-Time Lifetime Access)`;
      if (compareCostVideo) compareCostVideo.textContent = `⚠️ ₹3,000 – ₹10,000+ (Separate courses add up)`;
      if (compareCostSub) compareCostSub.textContent = `❌ ₹15,000 – ₹25,000 / year recurring`;
      if (compareCostBootcamp) compareCostBootcamp.textContent = `❌ ₹50,000 – ₹2,50,000+ Upfront / ISAs`;
    } else {
      if (compareCostMano) compareCostMano.textContent = `✅ ${sp.display} (One-Time Lifetime Access)`;
      if (compareCostVideo) compareCostVideo.textContent = `⚠️ $150+ (Adds up across courses)`;
      if (compareCostSub) compareCostSub.textContent = `❌ $300 – $500 / year recurring`;
      if (compareCostBootcamp) compareCostBootcamp.textContent = `❌ $5,000 – $15,000 Upfront`;
    }

    // Update FAQ section price mentions dynamically
    const faqCompare = document.getElementById('faq-cost-compare');
    const faqSale = document.getElementById('faq-cost-sale');
    const faqOrig = document.getElementById('faq-cost-orig');
    if (faqCompare) faqCompare.textContent = sp.display;
    if (faqSale) faqSale.textContent = sp.display;
    if (faqOrig) faqOrig.textContent = sp.original;

    // Realtime Zero-Reload broadcast subscription
    if (supabaseClient && !window._pricingRealtimeActive) {
      window._pricingRealtimeActive = true;
      try {
        supabaseClient.channel('public:pricing_versions')
          .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'pricing_versions' }, (payload) => {
            console.log('[Pricing Realtime] Received live pricing version broadcast:', payload.new);
            detectGeoPricing();
          })
          .on('postgres_changes', { event: '*', schema: 'public', table: 'settings', filter: 'key=eq.pricing' }, () => {
            detectGeoPricing();
          })
          .subscribe();
      } catch (rtErr) {
        console.warn('[Pricing Realtime] Subscription fallback:', rtErr);
      }
    }

    // Set checkout to default tier
    updateCheckoutForTier('selfpaced');
  }

  // Update checkout modal UI for the selected tier
  function updateCheckoutForTier(tier = 'selfpaced') {
    activeTier = 'selfpaced';
    const cfg = pricingConfigs['selfpaced'] || pricingConfigs[tier] || { amount: 49, currency: 'USD', display: '$49', original: '$199', planName: 'Full Access Pass' };

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
    const batchSection     = document.getElementById('checkoutBatchSection');

    if (checkoutAmount)   checkoutAmount.textContent   = cfg.display;
    if (checkoutOriginal) checkoutOriginal.textContent = cfg.original;
    if (checkoutPlanName) checkoutPlanName.textContent = cfg.planName;

    if (checkoutTierPill) {
      checkoutTierPill.textContent  = '⚡ Self-Paced Plan';
      checkoutTierPill.className    = 'checkout-tier-pill checkout-tier-pill--selfpaced';
    }

    if (batchSection) {
      batchSection.style.display = 'none';
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
    updateCheckoutForTier('selfpaced');
    window.selectedBatchId = null;

    // Clone pricing card to show inside checkout
    const container = document.getElementById('checkoutCardContainer');
    if (container) {
      container.innerHTML = '';
      const originalCard = document.querySelector('.pricing-banner-rough') || document.querySelector('.pricing-banner-redesign') || document.querySelector('.pricing-card--selfpaced') || document.querySelector('.pricing-card');
      if (originalCard) {
        const clonedCard = originalCard.cloneNode(true);
        const buyBtn = clonedCard.querySelector('.pricing-buy-btn') || clonedCard.querySelector('[data-cta="buy"]');
        if (buyBtn) buyBtn.style.display = 'none';
        const freeEscape = clonedCard.querySelector('.pricing-free-escape');
        if (freeEscape) freeEscape.style.display = 'none';
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
    openCheckout('selfpaced');
  }));

  if (checkoutClose) checkoutClose.addEventListener('click', closeCheckout);
  if (checkoutOverlay) {
    checkoutOverlay.addEventListener('click', (e) => {
      if (e.target === checkoutOverlay) closeCheckout();
    });
  }

  // Dynamic checkout batch selection — bound after batches are loaded
  function populateCheckoutBatches(preferredBatchId = null) {
    const container = document.getElementById('checkoutBatchOptions');
    if (!container) return;
    container.innerHTML = '';

    const paidBatches = (window._liveBatches || []).filter(b => b.batch_type === 'paid');
    if (paidBatches.length === 0) return;

    const selectedBatch = preferredBatchId || window.selectedBatchId || paidBatches[0]?.batch_id;
    window.selectedBatchId = selectedBatch;

    paidBatches.forEach((batch, idx) => {
      const isCurrent = batch.batch_id === selectedBatch;
      const card = document.createElement('div');
      card.className = 'checkout-batch-card' + (isCurrent ? ' active' : '');
      card.dataset.batchId = batch.batch_id;
      card.style.cssText = `border: ${isCurrent ? '2px solid var(--cyan)' : '1px solid var(--border)'}; border-radius: 8px; padding: 10px 12px; cursor: pointer; display: flex; justify-content: space-between; align-items: center; background: ${isCurrent ? 'rgba(0, 180, 216, 0.04)' : 'var(--base)'}; transition: var(--transition);`;

      const startH = parseInt(batch.start_time?.split(':')[0] || '19');
      const startM = parseInt(batch.start_time?.split(':')[1] || '30');
      const endH = parseInt(batch.end_time?.split(':')[0] || '20');
      const endM = parseInt(batch.end_time?.split(':')[1] || '30');
      const fmtTime = (h, m) => { const p = h >= 12 ? 'PM' : 'AM'; return `${h > 12 ? h-12 : h||12}:${String(m).padStart(2,'0')} ${p}`; };
      const days = !batch.schedule_days || batch.schedule_days.length === 7 ? 'Daily' : batch.schedule_days.length === 5 ? 'Weekdays' : batch.schedule_days.length === 2 ? 'Weekends' : 'Custom';

      card.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
          ${batch.instructor_avatar ? `<img src="${batch.instructor_avatar}" style="width:32px;height:32px;border-radius:50%;object-fit:cover;" alt="">` : ''}
          <div style="display: flex; flex-direction: column; gap: 2px;">
            <span style="font-size: 13px; font-weight: 700; color: var(--text-primary);">${batch.batch_name}</span>
            <span style="font-size: 11px; color: var(--text-secondary);">🕒 ${fmtTime(startH, startM)} – ${fmtTime(endH, endM)} IST (${days})</span>
          </div>
        </div>
        <span class="checkout-batch-radio" style="width: 16px; height: 16px; border-radius: 50%; border: ${isCurrent ? '2px solid var(--cyan)' : '1.5px solid var(--text-muted)'}; display: flex; align-items: center; justify-content: center; background: ${isCurrent ? 'var(--cyan)' : 'transparent'}; box-shadow: ${isCurrent ? 'inset 0 0 0 3px var(--base)' : 'none'}; transition: all 0.2s ease;"></span>
      `;

      card.addEventListener('click', () => {
        window.selectedBatchId = batch.batch_id;
        container.querySelectorAll('.checkout-batch-card').forEach(c => {
          const isC = c.dataset.batchId === batch.batch_id;
          c.classList.toggle('active', isC);
          c.style.borderColor = isC ? 'var(--cyan)' : 'var(--border)';
          c.style.border = isC ? '2px solid var(--cyan)' : '1px solid var(--border)';
          c.style.background = isC ? 'rgba(0, 180, 216, 0.04)' : 'var(--base)';
          const radio = c.querySelector('.checkout-batch-radio');
          if (radio) {
            radio.style.borderColor = isC ? 'var(--cyan)' : 'var(--text-muted)';
            radio.style.backgroundColor = isC ? 'var(--cyan)' : 'transparent';
            radio.style.boxShadow = isC ? 'inset 0 0 0 3px var(--base)' : 'none';
          }
        });
      });

      container.appendChild(card);
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
          referral_code: localStorage.getItem('manodemy_ref') || undefined,
          campaign_name: localStorage.getItem('manodemy_last_campaign') || 'organic_untracked',
          attribution: (typeof getAttributionPayload === 'function' ? getAttributionPayload() : undefined)
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
        if (typeof fbq === 'function') {
          fbq('track', 'InitiateCheckout', { content_name: '60-Day Data Analyst Masterclass', value: 1999.00, currency: 'INR' });
        }
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
      let path = '/python/day01.html';

      // Detect track type
      const grid = card.closest('.curriculum-grid');
      let track = 'python';
      if (card.closest('#panel-sql')) track = 'sql';
      else if (card.closest('#panel-excel')) track = 'excel';

      if (track === 'sql') {
        const dayInt = parseInt(day, 10);
        if (dayInt >= 1 && dayInt <= 17) {
          window.location.href = `/sql/day${day}.html`;
        } else if (isPaid) {
          window.location.href = `/notebook/sql-day${day}`;
        } else {
          openCheckout();
        }
      } else if (track === 'excel') {
        if (day === '01') window.location.href = '/excel/day01.html';
        else if (day === '02') window.location.href = '/excel/day02.html';
        else if (isPaid) window.location.href = `/notebook/excel-day${day}`;
        else openCheckout();
      } else {
        if (day === '01') window.location.href = '/python/day01.html';
        else if (day === '02') window.location.href = '/python/day02.html';
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

  /* ═══ CLEANED LANDING CORE ═══ */

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
    // Also close the nav menu card
    const navCard = document.getElementById('navMenuDropdownCard');
    if (navCard) navCard.classList.remove('active');
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
          .select('discount_type, discount_value, is_active, starts_at, expires_at, applies_to')
          .eq('code', code.toUpperCase())
          .single();

        const isActive = data ? (Boolean(data.is_active) === true) : false;
        const starts = data ? data.starts_at : null;
        const isNotStarted = starts && new Date(starts) > new Date();
        const expiry = data ? data.expires_at : null;
        const isExpired = expiry && new Date(expiry) < new Date();
        const appliesTo = data?.applies_to || 'both';
        const currencyMatch = appliesTo === 'both' || appliesTo === currentPricing.currency;

        if (data && isActive && !isNotStarted && !isExpired && currencyMatch) {
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

  // 1-Click URL Promo Auto-Apply (e.g. ?coupon=SUMMER50 or #coupon=SUMMER50)
  function checkUrlForCoupon() {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      let couponParam = urlParams.get('coupon') || urlParams.get('promo') || urlParams.get('discount');
      
      if (!couponParam && window.location.hash) {
        const hashStr = window.location.hash.replace(/^#/, '');
        const hashParams = new URLSearchParams(hashStr.includes('?') ? hashStr.split('?')[1] : hashStr);
        couponParam = hashParams.get('coupon') || hashParams.get('promo');
        
        // If hash is #checkout or contains checkout, open the modal
        if (hashStr.includes('checkout') && checkoutOverlay) {
          setTimeout(() => {
            checkoutOverlay.classList.add('active');
            renderPaymentGateways();
          }, 400);
        }
      }

      if (couponParam) {
        const couponInput = document.getElementById('couponInput');
        if (couponInput) {
          couponInput.value = couponParam.toUpperCase();
          setTimeout(() => {
            if (couponApplyBtn) couponApplyBtn.click();
          }, 300);
        }
      }
    } catch (e) {
      console.warn('[Coupon Auto-Apply] URL check failed:', e);
    }
  }

  // ═══════ HARDENED DUAL-TOUCH ATTRIBUTION SNIFFER ═══════
  const ATTRIBUTION_EXPIRY_DAYS = 90;
  const ALLOWED_SOURCES = ['google', 'facebook', 'meta', 'telegram', 'reddit', 'youtube', 'linkedin', 'instagram', 'email', 'organic', 'direct', 'referral', 'influencer'];
  const ALLOWED_MEDIUMS = ['cpc', 'channel_post', 'sponsor_ad', 'banner', 'social', 'organic', 'email', 'referral', 'affiliate'];

  function sanitizeClientInput(str, isCoupon = false) {
    if (!str) return '';
    const trimmed = String(str).trim();
    const transformed = isCoupon ? trimmed.toUpperCase() : trimmed.toLowerCase();
    return transformed.replace(/[^a-z0-9_\-]/gi, '').substring(0, 100);
  }

  function getCookie(name) {
    const v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
  }

  function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = name + "=" + value + ";path=/;expires=" + d.toUTCString() + ";SameSite=Lax;Secure";
  }

  window.captureAttributionData = function() {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const rawSource = urlParams.get('utm_source');
      const rawMedium = urlParams.get('utm_medium');
      
      if (!rawSource && !rawMedium) return;

      const src = sanitizeClientInput(rawSource);
      const med = sanitizeClientInput(rawMedium);
      const camp = sanitizeClientInput(urlParams.get('utm_campaign') || 'direct');
      const content = sanitizeClientInput(urlParams.get('utm_content') || 'none');
      const creativeId = sanitizeClientInput(urlParams.get('creative_id') || 'none');
      const coupon = sanitizeClientInput(urlParams.get('coupon'), true);

      const validSource = ALLOWED_SOURCES.includes(src) ? src : 'unknown';
      const validMedium = ALLOWED_MEDIUMS.includes(med) ? med : 'unknown';

      const touchData = {
        source: validSource,
        medium: validMedium,
        campaign: camp,
        content: content,
        creative_id: creativeId,
        coupon: coupon,
        timestamp: new Date().toISOString()
      };

      let attrRecord = null;
      try {
        const cData = getCookie('_manodemy_attr');
        if (cData) attrRecord = JSON.parse(decodeURIComponent(cData));
      } catch (e) {}

      if (!attrRecord) {
        attrRecord = {
          first_touch: touchData,
          last_touch: touchData
        };
      } else {
        attrRecord.last_touch = touchData;
      }

      const encoded = encodeURIComponent(JSON.stringify(attrRecord));
      setCookie('_manodemy_attr', encoded, ATTRIBUTION_EXPIRY_DAYS);
      try { localStorage.setItem('manodemy_attribution', JSON.stringify(attrRecord)); } catch (e) {}
    } catch (err) {
      console.warn('[Attribution] Capture error:', err);
    }
  };

  function getAttributionPayload() {
    try {
      const cData = getCookie('_manodemy_attr');
      if (cData) return JSON.parse(decodeURIComponent(cData));
      const ls = localStorage.getItem('manodemy_attribution');
      if (ls) return JSON.parse(ls);
    } catch (e) {}
    return null;
  }

  // Auto-check for promo in URL on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      checkUrlForCoupon();
      captureAttributionData();
    });
  } else {
    checkUrlForCoupon();
    captureAttributionData();
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
      
      const sb = await ensureSupabaseClient();
      if (!sb) { setAuthMessage("Authentication services are currently initializing. Please try again in a moment.", "error"); return; }

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
          const { data, error } = await sb.auth.signInWithPassword({ email, password });
          if (error) {
            if (error.message.toLowerCase().includes('invalid login credentials')) {
              throw new Error("Incorrect email or password. Need an account? Click 'Create Account'.");
            }
            if (error.message.toLowerCase().includes('email not confirmed')) {
              throw new Error("Please verify your email address before logging in, or reset password.");
            }
            throw error;
          }

          if (data && data.session) {
            localStorage.setItem('manodemy_auth', 'true');
            localStorage.setItem('manodemy_user_email', email);
            if (data.session.access_token) {
              setAuthCookie(data.session.access_token, data.session.expires_in);
            }
            await updateNavForLoggedIn(data.session.user || { email: email });
          }

          setAuthMessage("Signed in successfully! Redirecting...", "success");

          setTimeout(() => {
            closeAuthModal();

            const isAdm = email.toLowerCase() === 'manodamy25@gmail.com' || email.toLowerCase().includes('manodemy') || email.toLowerCase().includes('manodamy');
            if (isAdm) {
              window.location.href = '/admin.html';
              return;
            }

            if (window.pendingCheckout) {
              const currentPending = window.pendingCheckout;
              window.pendingCheckout = null;
              openCheckout(currentPending.tier);
              initiatePayment(currentPending.gateway);
              return;
            }

            const urlP = new URLSearchParams(window.location.search);
            const redirectParam = urlP.get('redirect');
            if (redirectParam && redirectParam.startsWith('/')) {
              window.location.href = redirectParam;
              return;
            }

            window.location.href = '/home.html';
          }, 350);
        } else if (authState === 'signup') {
          if (!name) { setAuthMessage("Please enter your full name.", "error"); throw new Error("_handled"); }
          if (password.length < 6) { setAuthMessage("Password must be at least 6 characters.", "error"); throw new Error("_handled"); }
          if (password !== confirmPass) { setAuthMessage("Passwords do not match.", "error"); throw new Error("_handled"); }

          btnLandingSubmit.textContent = 'Creating Account...';
          window.justSignedIn = true;
          const { data, error } = await sb.auth.signUp({
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
          const { error } = await sb.auth.resetPasswordForEmail(email, { redirectTo: resetUrl });
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
      const sb = await ensureSupabaseClient();
      if (!sb) { setAuthMessage("Authentication services are currently initializing. Please try again.", "error"); return; }

      const originalText = googleSigninBtn.innerHTML;
      googleSigninBtn.innerHTML = 'Redirecting securely...';
      googleSigninBtn.disabled = true;
      googleSigninBtn.style.opacity = '0.7';

      localStorage.setItem('manodemy_oauth_in_progress', 'true');
      if (window.pendingCheckout) {
        localStorage.setItem('manodemy_pending_checkout', JSON.stringify(window.pendingCheckout));
      }

      try {
        const urlParams = new URLSearchParams(window.location.search);
        const redirectParam = urlParams.get('redirect');
        const targetNext = window.pendingCheckout 
          ? '/landing_v2/index.html?resume_checkout=true' 
          : (redirectParam && redirectParam.startsWith('/') ? redirectParam : '/home.html');
        const redirectUrl = window.location.origin + '/auth/callback?next=' + encodeURIComponent(targetNext);

        const { error } = await sb.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: redirectUrl,
            queryParams: {
              access_type: 'offline',
              prompt: 'consent'
            }
          }
        });
        if (error) {
          setAuthMessage('Google Login Error: ' + error.message, "error");
          googleSigninBtn.innerHTML = originalText;
          googleSigninBtn.disabled = false;
          googleSigninBtn.style.opacity = '1';
        }
      } catch (err) {
        setAuthMessage('Google Login Error: ' + (err.message || 'Network error'), "error");
        googleSigninBtn.innerHTML = originalText;
        googleSigninBtn.disabled = false;
        googleSigninBtn.style.opacity = '1';
      }
    });
  }

  const navSignin = document.getElementById('navSignin');
  if (navSignin) {
    navSignin.addEventListener('click', async (e) => {
      const text = (navSignin.textContent || '').trim();
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

      const href = navSignin.getAttribute('href');
      if (href && href !== 'javascript:void(0)' && href !== '#') {
        e.preventDefault();
        window.location.href = href;
        return;
      }

      if (text.includes('Admin')) {
        e.preventDefault();
        window.location.href = '/admin.html';
        return;
      }

      if (text.includes('Instructor')) {
        e.preventDefault();
        window.location.href = '/instructor-dashboard.html';
        return;
      }

      if (text.toLowerCase().includes('score card') || text.toLowerCase().includes('dashboard')) {
        e.preventDefault();
        window.location.href = '/home.html';
        return;
      }

      e.preventDefault();
      openAuthModal('login');
    });
  }

  function getStoredUser() {
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && (k.startsWith('sb-') && k.endsWith('-auth-token'))) {
          const raw = localStorage.getItem(k);
          if (raw) {
            const parsed = JSON.parse(raw);
            if (parsed && (parsed.user || parsed.access_token)) {
              return parsed.user || { email: parsed.user?.email || localStorage.getItem('manodemy_user_email') };
            }
          }
        }
      }
    } catch (e) {}

    try {
      const raw = CustomAuthStorage.getItem('sb-erqoyvbuhmkyvcqgwcbz-auth-token');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && (parsed.user || parsed.access_token)) {
          return parsed.user || { email: parsed.user?.email || localStorage.getItem('manodemy_user_email') };
        }
      }
    } catch (e) {}

    const isAuthLocal = localStorage.getItem('manodemy_auth') === 'true';
    const cachedEmail = localStorage.getItem('manodemy_user_email') || '';
    if (isAuthLocal && cachedEmail) {
      return { email: cachedEmail };
    }

    return null;
  }

  async function updateNavForLoggedIn(user) {
    const signInBtn = document.getElementById('navSignin');
    const navCardAdminItem = document.getElementById('navCardAdminItem');
    const mobOverlayAdminItem = document.getElementById('mobOverlayAdminItem');
    const navCardSignin = document.getElementById('navCardSignin');
    const mobOverlaySignin = document.getElementById('mobOverlaySignin');
    const coursesDropdown = document.getElementById('navMyCoursesDropdown');
    
    if (coursesDropdown) {
      coursesDropdown.style.display = user ? 'block' : 'none';
    }
    
    // Clean up any existing dynamic extra button to prevent duplication
    const existingExtra = document.getElementById('navInstructorExtra');
    if (existingExtra) existingExtra.remove();
    
    if (!user) {
      if (navCardAdminItem) navCardAdminItem.style.display = 'none';
      if (mobOverlayAdminItem) mobOverlayAdminItem.style.display = 'none';
      if (signInBtn) {
        signInBtn.textContent = 'Sign In';
        signInBtn.href = 'javascript:void(0)';
        signInBtn.setAttribute('onclick', "document.getElementById('authModal').classList.add('active');");
      }
      if (navCardSignin) {
        navCardSignin.textContent = '👤 Sign In';
        navCardSignin.href = 'javascript:void(0)';
        navCardSignin.setAttribute('onclick', "closeNavMenuCard(); document.getElementById('authModal').classList.add('active');");
      }
      if (mobOverlaySignin) {
        mobOverlaySignin.textContent = '👤 Sign In';
        mobOverlaySignin.href = 'javascript:void(0)';
        mobOverlaySignin.setAttribute('onclick', "document.getElementById('mobileOverlay').classList.remove('active'); document.getElementById('authModal').classList.add('active');");
      }
      return;
    }

    if (signInBtn) signInBtn.removeAttribute('onclick');
    if (navCardSignin) navCardSignin.removeAttribute('onclick');
    if (mobOverlaySignin) mobOverlaySignin.removeAttribute('onclick');

    const email = (user.email || '').toLowerCase();
    let isAdmin = email === 'manodamy25@gmail.com' || email.includes('manodemy') || email.includes('manodamy');

    try {
      if (supabaseClient && user.id) {
        const { data: profile } = await supabaseClient
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();

        if (profile && (profile.role === 'admin' || profile.role === 'instructor')) {
          isAdmin = true;
        }
      }
    } catch (e) {
      console.warn('[Admin] Failed to check roles:', e);
    }

    // Toggle menu items for admin
    if (navCardAdminItem) navCardAdminItem.style.display = isAdmin ? 'flex' : 'none';
    if (mobOverlayAdminItem) mobOverlayAdminItem.style.display = isAdmin ? 'block' : 'none';

    const btnText = isAdmin ? '⚙️ Admin Panel' : 'Score Card';
    const targetUrl = isAdmin ? '/admin.html' : '/home.html';

    const setupBtn = (el, text, url) => {
      if (!el) return;
      el.textContent = text;
      el.href = url;
      el.onclick = (e) => {
        e.preventDefault();
        window.location.href = url;
      };
    };

    setupBtn(signInBtn, btnText, targetUrl);
    setupBtn(navCardSignin, btnText, targetUrl);
    setupBtn(mobOverlaySignin, btnText, targetUrl);
  }

  function unlockAllDays() {
    document.querySelectorAll('.day-card').forEach(card => {
      card.classList.remove('locked');
      card.classList.remove('coming-soon');
      const badge = card.querySelector('.day-badge') || card.querySelector('.badge');
      if (badge && !badge.classList.contains('badge-free')) {
        badge.textContent = 'AVAILABLE';
        badge.classList.remove('badge-lock', 'badge-locked');
        badge.classList.add('badge-free');
      }
      card.style.opacity = '1';
      card.style.pointerEvents = 'auto';
      card.style.cursor = 'pointer';
      const dayNum = card.getAttribute('data-day');
      if (dayNum) {
        card.onclick = (e) => {
          e.preventDefault();
          window.location.href = `/sql/day${dayNum}.html`;
        };
      }
    });
  }

  const checkPurchaseStatus = async (sb, userId) => {
    if (!sb || !userId) return;
    try {
      const { data, error } = await sb
        .from('profiles')
        .select('plan, plan_type')
        .eq('id', userId)
        .single();
        
      if (error) {
        console.warn("Could not check user plan:", error.message);
        return;
      }
      
      if (data && (data.plan === 'enrolled' || data.plan_type === 'selfpaced' || data.plan_type === 'full' || data.plan === 'purchased')) {
        localStorage.setItem('manodemy_enrolled', 'true');
        unlockAllDays();
        
        // Hide all Buy / Enroll CTA buttons across the landing page for enrolled users
        document.querySelectorAll('.btn-buy, .btn-nav-buy, .btn-hero-buy, .nav-card-buy-btn, .mob-menu-buy').forEach(btn => {
          btn.style.display = 'none';
        });
      }
    } catch (e) {
      console.warn("Failed checking profile purchase status:", e);
    }
  };

  async function saveCountryToProfile(countryCode) {
    if (!supabaseClient) return;
    try {
      const { data: { session } } = await supabaseClient.auth.getSession();
      if (!session || !session.user) return;

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
      }
    } catch (e) {
      console.warn('[Manodemy] Country capture failed:', e.message);
    }
  }

  const setAuthCookie = (token, expiresSec) => {
    const maxAge = expiresSec || 604800; // default 7 days
    const isSecure = window.location.protocol === 'https:';
    document.cookie = `sb-access-token=${token}; path=/; max-age=${maxAge}; SameSite=Lax${isSecure ? '; Secure' : ''}`;
  };

  const clearAuthCookie = () => {
    const isSecure = window.location.protocol === 'https:';
    document.cookie = `sb-access-token=; path=/; max-age=0; SameSite=Lax${isSecure ? '; Secure' : ''}`;
  };

  const handleUserSession = async (session) => {
    if (session && session.user) {
      localStorage.setItem('manodemy_auth', 'true');
      if (session.user.email) {
        localStorage.setItem('manodemy_user_email', session.user.email);
      }
      if (session.access_token) {
        setAuthCookie(session.access_token, session.expires_in);
      }
      updateNavForLoggedIn(session.user);
      if (session.user.id) {
        const sb = await ensureSupabaseClient();
        await checkPurchaseStatus(sb || supabaseClient, session.user.id);

        // Sync first_touch_campaign and last_touch_campaign to profiles table for attribution tracking
        const firstCamp = localStorage.getItem('manodemy_first_campaign') || (document.cookie.match(/(?:^|; )manodemy_first_campaign=([^;]*)/)?.[1]);
        const lastCamp = localStorage.getItem('manodemy_last_campaign') || (document.cookie.match(/(?:^|; )manodemy_last_campaign=([^;]*)/)?.[1]) || firstCamp;
        if (firstCamp || lastCamp) {
          try {
            const client = sb || supabaseClient;
            if (client) {
              await client.from('profiles').update({
                first_touch_campaign: firstCamp || null,
                last_touch_campaign: lastCamp || null
              }).eq('id', session.user.id);
              console.log('[Attribution] Synced user campaign to profile:', firstCamp, lastCamp);
            }
          } catch (attrErr) {
            console.warn('[Attribution] Profile attribution sync notice:', attrErr);
          }
        }
      }
      await saveCountryToProfile(userCountry);
    } else {
      const stored = getStoredUser();
      if (stored) {
        updateNavForLoggedIn(stored);
      } else {
        localStorage.removeItem('manodemy_auth');
        localStorage.removeItem('manodemy_enrolled');
        localStorage.removeItem('manodemy_user_email');
        clearAuthCookie();
        updateNavForLoggedIn(null);
      }
    }
  };

  (async () => {
    let justExtractedOAuth = false;
    // 0. Detect and clean OAuth hash token if user just returned from Google OAuth
    if (window.location.hash && window.location.hash.includes('access_token=')) {
      try {
        const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ''));
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token') || '';
        const expiresIn = parseInt(hashParams.get('expires_in') || '3600', 10);
        if (accessToken) {
          justExtractedOAuth = true;
          localStorage.setItem('manodemy_auth', 'true');
          setAuthCookie(accessToken, expiresIn);

          // Decode the JWT to extract the real user's email (do NOT hardcode)
          let userEmail = '';
          try {
            const jwtPayload = JSON.parse(atob(accessToken.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
            userEmail = jwtPayload.email || jwtPayload.user_metadata?.email || '';
          } catch (jwtErr) {}

          // Construct Supabase token session JSON and write to CustomAuthStorage & localStorage
          const expiresAt = Math.floor(Date.now() / 1000) + expiresIn;
          const sessionObj = {
            access_token: accessToken,
            token_type: 'bearer',
            expires_in: expiresIn,
            expires_at: expiresAt,
            refresh_token: refreshToken,
            user: { email: userEmail }
          };
          try {
            const rawTokenKey = 'sb-erqoyvbuhmkyvcqgwcbz-auth-token';
            localStorage.setItem(rawTokenKey, JSON.stringify(sessionObj));
            CustomAuthStorage.setItem(rawTokenKey, JSON.stringify(sessionObj));
            if (userEmail) localStorage.setItem('manodemy_user_email', userEmail);
          } catch (e) {}

          // Clean hash from address bar without reloading
          window.history.replaceState(null, document.title, window.location.pathname + window.location.search);
        }
      } catch (e) {}
    }

    // 1. Instant preliminary UI check from cache/cookie so navbar updates IMMEDIATELY on page render
    const initialUser = getStoredUser();
    if (initialUser) {
      updateNavForLoggedIn(initialUser);
    }

    const oauthInProgress = localStorage.getItem('manodemy_oauth_in_progress') === 'true' || justExtractedOAuth;
    localStorage.removeItem('manodemy_oauth_in_progress');

    const storedPending = localStorage.getItem('manodemy_pending_checkout');
    if (storedPending) {
      try {
        window.pendingCheckout = JSON.parse(storedPending);
      } catch (e) {}
      localStorage.removeItem('manodemy_pending_checkout');
    }

    detectGeoPricing();

    const sb = await ensureSupabaseClient();
    if (!sb) return;
    try {
      const { data: { session } } = await sb.auth.getSession();
      if (session) {
        await handleUserSession(session);
      } else {
        const fallbackUser = getStoredUser();
        if (fallbackUser) {
          updateNavForLoggedIn(fallbackUser);
        }
      }
      
      sb.auth.onAuthStateChange(async (event, session) => {
        if ((event === 'INITIAL_SESSION' || event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'USER_UPDATED') && session) {
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
            window.justSignedIn = false;
          } else if (window.justSignedIn || oauthInProgress) {
            window.justSignedIn = false;
            setTimeout(() => {
              if (!window.pendingCheckout && !window.pendingWriteReview) {
                const urlP = new URLSearchParams(window.location.search);
                const redirectParam = urlP.get('redirect');
                if (redirectParam && redirectParam.startsWith('/')) {
                  window.location.href = redirectParam;
                  return;
                }
                window.location.href = '/home.html';
              }
            }, 300);
          }
        } else if (event === 'SIGNED_OUT') {
          localStorage.removeItem('manodemy_auth');
          localStorage.removeItem('manodemy_enrolled');
          localStorage.removeItem('manodemy_user_email');
          clearAuthCookie();
          updateNavForLoggedIn(null);
          window.location.reload();
        }
      });
    } catch (e) {
      console.warn("Session check failed silently:", e);
    }
  })();

});

/* ═══════════════════════════════════════════════════════
   NAV HAMBURGER MENU — Global functions (called from HTML onclick attrs)
   Must live outside DOMContentLoaded so they are globally accessible.
═══════════════════════════════════════════════════════ */
function toggleNavMenuCard(event) {
  if (event) event.stopPropagation();
  const card = document.getElementById('navMenuDropdownCard');
  if (!card) return;
  card.classList.toggle('active');
}

function closeNavMenuCard() {
  const card = document.getElementById('navMenuDropdownCard');
  if (card) card.classList.remove('active');
}
