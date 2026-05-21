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

  /* ═══ DAY CARD CLICKS ═══ */
  const cards = document.querySelectorAll('.day-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      if (card.dataset.day === '01') {
        window.location.href = '../day01.html';
      } else if (card.dataset.day === '02') {
        window.location.href = '../day02.html';
      } else if (window._userHasPurchased) {
        window.location.href = `../day${card.dataset.day}.html`;
      } else {
        document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
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

  /* ═══ SUPABASE AUTH (silent, never blocks) ═══ */
  const initSupabase = () => {
    if (!window.MANODEMY_CONFIG?.SUPA_URL || !window.MANODEMY_CONFIG?.SUPA_KEY) {
      return null;
    }
    try {
      return window.supabase?.createClient(
        window.MANODEMY_CONFIG.SUPA_URL,
        window.MANODEMY_CONFIG.SUPA_KEY
      );
    } catch { return null; }
  };

  function updateNavForLoggedIn(user) {
    const signInBtn = document.getElementById('navSignin');
    if (signInBtn) {
      signInBtn.textContent = 'Dashboard';
      signInBtn.href = '../day01.html';
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
    document.querySelectorAll('[data-cta="buy"]').forEach(btn => {
      btn.textContent = 'Continue Learning →';
      btn.href = '../day01.html';
    });
    const stickyBar = document.getElementById('mobileSticky');
    if (stickyBar) stickyBar.style.display = 'none';
  }

  async function checkPurchaseStatus(sb, userId) {
    try {
      const { data } = await sb.from('profiles').select('plan').eq('id', userId).single();
      if (data?.plan === 'paid') {
        unlockAllDays();
        updateCTAsForPaidUser();
      }
    } catch { /* fail silently */ }
  }

  (async () => {
    const sb = initSupabase();
    if (!sb) return;
    try {
      const { data: { session } } = await sb.auth.getSession();
      if (session) {
        updateNavForLoggedIn(session.user);
        await checkPurchaseStatus(sb, session.user.id);
      }
    } catch { /* Never show error — page works without auth */ }
  })();

  /* ═══ SMOOTH SCROLL for anchor links ═══ */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });
});
