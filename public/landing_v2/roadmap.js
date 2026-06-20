/**
 * Manodemy 60-Day Clock Orbital Animation
 * ─────────────────────────────────────────
 * Replaces the road animation with a premium clock-face metaphor:
 *  • 60 day-dots orbit a large glowing ring (top → clockwise)
 *  • The active dot grows large, shows "Day N" text, and pulses
 *  • Milestone nodes (Day 1, 18, 30, 60) are permanently visible with phase labels
 *  • The centre circle shows the live topic with icon + smooth cross-fade
 *  • After Day 60, a "Get Your Certificate 🎓" celebration state triggers,
 *    then the whole animation loops from Day 1 seamlessly
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── 1. Curriculum ─── */
  const CURRICULUM = [
    // SQL Phase — Days 1-18
    { day:1,  title:"Intro to SQL & Databases",        phase:"sql",    status:"FREE" },
    { day:2,  title:"SELECT & Filtering",               phase:"sql",    status:"PREMIUM" },
    { day:3,  title:"Sorting, Patterns & CASE",         phase:"sql",    status:"PREMIUM" },
    { day:4,  title:"Aggregate Functions & GROUP BY",   phase:"sql",    status:"PREMIUM" },
    { day:5,  title:"Joins & Relationships",            phase:"sql",    status:"PREMIUM" },
    { day:6,  title:"Subqueries",                       phase:"sql",    status:"PREMIUM" },
    { day:7,  title:"Common Table Expressions",         phase:"sql",    status:"PREMIUM" },
    { day:8,  title:"Window Functions I: Ranking",      phase:"sql",    status:"PREMIUM" },
    { day:9,  title:"Window Functions II: Analytics",   phase:"sql",    status:"PREMIUM" },
    { day:10, title:"Date & Time Functions",            phase:"sql",    status:"PREMIUM" },
    { day:11, title:"String & Type Functions",          phase:"sql",    status:"PREMIUM" },
    { day:12, title:"Data Cleaning & Wrangling",        phase:"sql",    status:"PREMIUM" },
    { day:13, title:"Set Operations & Joins",           phase:"sql",    status:"PREMIUM" },
    { day:14, title:"Query Optimisation",               phase:"sql",    status:"PREMIUM" },
    { day:15, title:"Views & Reusable Objects",         phase:"sql",    status:"PREMIUM" },
    { day:16, title:"Advanced Analytics Patterns",      phase:"sql",    status:"PREMIUM" },
    { day:17, title:"Data Modelling & dbt",             phase:"sql",    status:"PREMIUM" },
    { day:18, title:"BI Capstone & Interview Prep",     phase:"sql",    status:"PREMIUM" },
    // Excel Phase — Days 19-30
    { day:19, title:"Excel Orientation & Formulas",     phase:"excel",  status:"PREMIUM" },
    { day:20, title:"Formatting, Sorting & Filtering",  phase:"excel",  status:"PREMIUM" },
    { day:21, title:"Data Cleaning Essentials",         phase:"excel",  status:"PREMIUM" },
    { day:22, title:"Excel Tables",                     phase:"excel",  status:"PREMIUM" },
    { day:23, title:"Lookup & Reference Functions",     phase:"excel",  status:"PREMIUM" },
    { day:24, title:"Logic Functions",                  phase:"excel",  status:"PREMIUM" },
    { day:25, title:"Text Functions",                   phase:"excel",  status:"PREMIUM" },
    { day:26, title:"Date & Time Functions",            phase:"excel",  status:"PREMIUM" },
    { day:27, title:"Conditional Aggregation",          phase:"excel",  status:"PREMIUM" },
    { day:28, title:"PivotTables Core Mechanics",       phase:"excel",  status:"PREMIUM" },
    { day:29, title:"PivotTables Advanced & Charts",    phase:"excel",  status:"PREMIUM" },
    { day:30, title:"Validation, What-If & Capstone",  phase:"excel",  status:"PREMIUM" },
    // Python Phase — Days 31-60
    { day:31, title:"Data Types and Memory",            phase:"python", status:"PREMIUM" },
    { day:32, title:"Operators and Expressions",        phase:"python", status:"PREMIUM" },
    { day:33, title:"Strings",                          phase:"python", status:"PREMIUM" },
    { day:34, title:"Lists",                            phase:"python", status:"PREMIUM" },
    { day:35, title:"Tuples",                           phase:"python", status:"PREMIUM" },
    { day:36, title:"Sets",                             phase:"python", status:"PREMIUM" },
    { day:37, title:"Dictionaries",                     phase:"python", status:"PREMIUM" },
    { day:38, title:"Conditionals",                     phase:"python", status:"PREMIUM" },
    { day:39, title:"Loops",                            phase:"python", status:"PREMIUM" },
    { day:40, title:"Functions",                        phase:"python", status:"PREMIUM" },
    { day:41, title:"Modules",                          phase:"python", status:"PREMIUM" },
    { day:42, title:"Comprehensions",                   phase:"python", status:"PREMIUM" },
    { day:43, title:"Lambda Functions",                 phase:"python", status:"PREMIUM" },
    { day:44, title:"Exceptions",                       phase:"python", status:"PREMIUM" },
    { day:45, title:"File Handling",                    phase:"python", status:"PREMIUM" },
    { day:46, title:"OOP Basics",                       phase:"python", status:"PREMIUM" },
    { day:47, title:"OOP Advanced",                     phase:"python", status:"PREMIUM" },
    { day:48, title:"Regex",                            phase:"python", status:"PREMIUM" },
    { day:49, title:"Generators and Iterators",         phase:"python", status:"PREMIUM" },
    { day:50, title:"Capstone Project",                 phase:"python", status:"PREMIUM" },
    { day:51, title:"NumPy Fundamentals",               phase:"python", status:"PREMIUM" },
    { day:52, title:"NumPy Advanced",                   phase:"python", status:"PREMIUM" },
    { day:53, title:"Pandas Introduction",              phase:"python", status:"PREMIUM" },
    { day:54, title:"Pandas Selection",                 phase:"python", status:"PREMIUM" },
    { day:55, title:"Pandas Cleaning",                  phase:"python", status:"PREMIUM" },
    { day:56, title:"Pandas GroupBy",                   phase:"python", status:"PREMIUM" },
    { day:57, title:"Pandas Merging",                   phase:"python", status:"PREMIUM" },
    { day:58, title:"Pandas Time Series",               phase:"python", status:"PREMIUM" },
    { day:59, title:"Data Visualization",               phase:"python", status:"PREMIUM" },
    { day:60, title:"Phase Analysis & Review",          phase:"python", status:"PREMIUM" },
  ];

  /* ─── 2. Phase colour palette ─── */
  const PHASE = {
    sql:    { color:'#10B981', glow:'rgba(16,185,129,0.45)',  label:'Complete SQL',    icon:'🗄️' },
    excel:  { color:'#FFB020', glow:'rgba(255,176,32,0.45)',  label:'Complete EXCEL',  icon:'📊' },
    python: { color:'#00E6F6', glow:'rgba(0,230,246,0.45)',   label:'Complete Python', icon:'🐍' },
  };

  /* Milestone days that get permanent large-bubble markers on the ring */
  const MILESTONES = [
    { day:1,  labelTop:'Start',          labelBot:null,              offsetDir:  1 },
    { day:18, labelTop:'Complete SQL',   labelBot:'18 days',         offsetDir:  1 },
    { day:30, labelTop:'Complete EXCEL', labelBot:'12 days',         offsetDir: -1 },
    { day:60, labelTop:'Complete Python',labelBot:'30 days',         offsetDir:  1 },
  ];

  /* ─── 3. Grab / create the container ─── */
  const container = document.getElementById('heroRoadmapContainer');
  if (!container) { console.warn('[ClockRoadmap] #heroRoadmapContainer not found.'); return; }

  // Clear existing children (old SVG roadmap + day card)
  container.innerHTML = '';
  container.style.cssText += 'display:flex;align-items:center;justify-content:center;overflow:visible;background:#060913;';

  /* ─── 4. Create Canvas ─── */
  const canvas = document.createElement('canvas');
  canvas.id = 'clockCanvas';
  canvas.style.cssText = 'display:block;width:100%;height:100%;';
  container.appendChild(canvas);

  /* ─── 5. Sizing ─── */
  let W, H, CX, CY, OUTER_R, INNER_R, DOT_BASE;

  function resize() {
    const rect = container.getBoundingClientRect();
    W = rect.width  || 500;
    H = rect.height || 480;
    canvas.width  = W * devicePixelRatio;
    canvas.height = H * devicePixelRatio;
    CX = W / 2;
    CY = H / 2;
    // Outer orbit radius — snug inside the container, leaving space for labels
    OUTER_R  = Math.min(CX, CY) * 0.72;
    INNER_R  = OUTER_R * 0.52;   // inner info-circle radius
    DOT_BASE = Math.max(3.5, OUTER_R * 0.033);
  }
  resize();
  window.addEventListener('resize', () => { resize(); });

  const ctx = canvas.getContext('2d');

  /* ─── 6. Animation state ─── */
  let currentDay  = 0;   // 0-indexed
  let targetDay   = 0;
  let interpAngle = 0;   // animated angle of the active dot (radians)
  let certMode    = false;
  let certTimer   = 0;
  let lastTimestamp = null;
  let rafId = null;

  /* Each dot has an animated radius for smooth grow/shrink */
  const dotRadii = new Float32Array(60).fill(DOT_BASE);

  /* Centre panel cross-fade state */
  const panel = {
    day:    1,
    title:  CURRICULUM[0].title,
    phase:  CURRICULUM[0].phase,
    alpha:  1,       // 1 = fully visible
    fading: false,
    nextDay:   1,
    nextTitle: '',
    nextPhase: '',
  };

  /* ─── 7. Geometry helpers ─── */
  function dayAngle(dayIdx) {
    // Day 0 (Day 1) starts at 12-o'clock (−π/2), goes clockwise
    return -Math.PI / 2 + (dayIdx / 60) * Math.PI * 2;
  }

  function orbPos(angle, r) {
    return { x: CX + Math.cos(angle) * r, y: CY + Math.sin(angle) * r };
  }

  /* ─── 8. Draw helpers ─── */
  function drawRing(r, lineWidth, color, alpha = 1) {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = color;
    ctx.lineWidth   = lineWidth;
    ctx.beginPath();
    ctx.arc(CX, CY, r, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  function drawGlow(x, y, r, color) {
    const grad = ctx.createRadialGradient(x, y, 0, x, y, r * 2.2);
    grad.addColorStop(0,   color.replace(')', ',0.55)').replace('rgb','rgba'));
    grad.addColorStop(0.5, color.replace(')', ',0.15)').replace('rgb','rgba'));
    grad.addColorStop(1,   'transparent');
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, r * 2.2, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.restore();
  }

  /* Helper – turn hex/named color to a safe rgba without regex headaches */
  const HEX_TO_RGBA = {
    '#10B981': 'rgba(16,185,129,',
    '#FFB020': 'rgba(255,176,32,',
    '#00E6F6': 'rgba(0,230,246,',
    '#9B59B6': 'rgba(155,89,182,',
  };
  function glowColor(hex, alpha) {
    return (HEX_TO_RGBA[hex] || 'rgba(255,255,255,') + alpha + ')';
  }

  /* Phase colour for a day index (0-based) */
  function phaseColor(idx) {
    if (idx < 18)  return PHASE.sql.color;
    if (idx < 30)  return PHASE.excel.color;
    return PHASE.python.color;
  }
  function phaseKey(idx) {
    if (idx < 18)  return 'sql';
    if (idx < 30)  return 'excel';
    return 'python';
  }

  /* ─── 9. Draw the outer ring arc segments (coloured by phase) ─── */
  function drawRingSegments(completedUpTo) {
    const phases = [
      { start:0,  end:18, key:'sql'    },
      { start:18, end:30, key:'excel'  },
      { start:30, end:60, key:'python' },
    ];
    const lw = Math.max(1.2, OUTER_R * 0.011);
    phases.forEach(ph => {
      const a1 = dayAngle(ph.start);
      const a2 = dayAngle(ph.end);
      const col = PHASE[ph.key].color;

      // Dim background arc
      ctx.save();
      ctx.strokeStyle = glowColor(col, 0.12);
      ctx.lineWidth = lw * 2.2;
      ctx.lineCap = 'butt';
      ctx.beginPath();
      ctx.arc(CX, CY, OUTER_R, a1, a2);
      ctx.stroke();
      ctx.restore();

      // Bright completed portion
      const completedEnd = Math.max(ph.start, Math.min(completedUpTo, ph.end));
      if (completedEnd > ph.start) {
        const a2c = dayAngle(completedEnd);
        ctx.save();
        ctx.strokeStyle = glowColor(col, 0.65);
        ctx.lineWidth = lw * 1.1;
        ctx.lineCap = 'round';
        ctx.shadowColor = col;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(CX, CY, OUTER_R, a1, a2c);
        ctx.stroke();
        ctx.restore();
      }
    });
  }

  /* ─── 10. Draw individual day dots ─── */
  function drawDots(activeIdx, interpAngle) {
    for (let i = 0; i < 60; i++) {
      const angle = dayAngle(i);
      const pos = orbPos(angle, OUTER_R);
      const col = phaseColor(i);
      const isActive = (i === activeIdx);
      const isCompleted = (i < activeIdx);

      let r = dotRadii[i];
      const targetR = isActive ? DOT_BASE * 3.2 : DOT_BASE;
      // Smoothly approach target radius (interpolated per frame in tick)
      dotRadii[i] += (targetR - dotRadii[i]) * 0.14;

      const alpha = isActive ? 1 : isCompleted ? 0.75 : 0.2;

      ctx.save();
      ctx.globalAlpha = alpha;

      if (isActive) {
        // Outer glow ring
        ctx.shadowColor = col;
        ctx.shadowBlur = 22;
        // Pulse ring
        const pulseR = dotRadii[i] * 2.2;
        ctx.strokeStyle = glowColor(col, 0.35);
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, pulseR, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Core dot
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, dotRadii[i], 0, Math.PI * 2);
      ctx.fillStyle = col;
      if (isActive) {
        ctx.shadowColor = col;
        ctx.shadowBlur = 28;
      }
      ctx.fill();

      // Dot border for active
      if (isActive) {
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 1.8;
        ctx.stroke();
      }

      ctx.restore();

      // "Day N" label for active dot
      if (isActive) {
        const fontSize = Math.max(9, dotRadii[i] * 0.75);
        ctx.save();
        ctx.globalAlpha = Math.min(1, (dotRadii[i] - DOT_BASE) / (DOT_BASE * 2.2));
        ctx.fillStyle = '#fff';
        ctx.font = `700 ${fontSize}px 'Outfit', sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowColor = 'rgba(0,0,0,0.7)';
        ctx.shadowBlur = 4;
        ctx.fillText(`Day`, pos.x, pos.y - fontSize * 0.6);
        ctx.fillText(`${i + 1}`, pos.x, pos.y + fontSize * 0.55);
        ctx.restore();
      }
    }
  }

  /* ─── 11. Draw milestone bubbles ─── */
  function drawMilestones(activeIdx) {
    MILESTONES.forEach(m => {
      const idx = m.day - 1;
      const angle = dayAngle(idx);
      const pos = orbPos(angle, OUTER_R);
      const col = phaseColor(idx);
      const isActive = (idx === activeIdx);
      const isPassed = (idx < activeIdx || activeIdx >= 59);

      const bubR = Math.max(22, OUTER_R * 0.16);
      const alpha = isPassed || isActive ? 1 : 0.35;

      ctx.save();
      ctx.globalAlpha = alpha;

      // Glow halo
      if (isPassed || isActive) {
        const halo = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, bubR * 2);
        halo.addColorStop(0,   glowColor(col, 0.3));
        halo.addColorStop(1,   'transparent');
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, bubR * 2, 0, Math.PI * 2);
        ctx.fillStyle = halo;
        ctx.fill();
      }

      // Bubble fill
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, bubR, 0, Math.PI * 2);
      ctx.fillStyle = isPassed || isActive
        ? col
        : 'rgba(20,27,45,0.8)';
      if (isPassed || isActive) {
        ctx.shadowColor = col;
        ctx.shadowBlur = 20;
      }
      ctx.fill();

      // Bubble border
      ctx.strokeStyle = col;
      ctx.lineWidth   = 2;
      ctx.stroke();

      // Day text
      const fs1 = Math.max(8, bubR * 0.37);
      const fs2 = Math.max(10, bubR * 0.48);
      ctx.fillStyle = isPassed || isActive ? '#fff' : col;
      ctx.font = `600 ${fs1}px 'Outfit', sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.shadowBlur = 0;
      ctx.fillText('Day', pos.x, pos.y - fs2 * 0.5);
      ctx.font = `800 ${fs2}px 'Outfit', sans-serif`;
      ctx.fillText(m.day, pos.x, pos.y + fs2 * 0.52);

      ctx.restore();

      // Phase label outside the ring
      const labelR = OUTER_R + bubR + Math.max(12, bubR * 0.5);
      const labelPos = orbPos(angle, labelR);

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = col;
      ctx.font = `700 ${Math.max(10, bubR * 0.38)}px 'Outfit', sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      // Slight offset so labels don't overlap the ring
      const offsetY = Math.sin(angle) * 10;
      ctx.fillText(m.labelTop, labelPos.x, labelPos.y + offsetY);
      if (m.labelBot) {
        ctx.globalAlpha = alpha * 0.7;
        ctx.font = `500 ${Math.max(8.5, bubR * 0.31)}px 'Outfit', sans-serif`;
        ctx.fillStyle = '#94a3b8';
        ctx.fillText(m.labelBot, labelPos.x, labelPos.y + offsetY + Math.max(13, bubR * 0.42));
      }
      ctx.restore();
    });
  }

  /* ─── 12. Draw inner circle & centre panel ─── */
  function drawCentrePanel(activeIdx) {
    const col     = phaseColor(activeIdx);
    const phKey   = phaseKey(activeIdx);
    const phInfo  = PHASE[phKey];

    // Background circle
    ctx.save();
    const bgGrad = ctx.createRadialGradient(CX, CY, 0, CX, CY, INNER_R);
    bgGrad.addColorStop(0,   'rgba(12,18,35,0.97)');
    bgGrad.addColorStop(0.75,'rgba(8,13,27,0.97)');
    bgGrad.addColorStop(1,   'rgba(4,8,18,0.97)');
    ctx.beginPath();
    ctx.arc(CX, CY, INNER_R, 0, Math.PI * 2);
    ctx.fillStyle = bgGrad;
    ctx.fill();

    // Glowing border
    ctx.strokeStyle = glowColor(col, 0.4);
    ctx.lineWidth   = Math.max(1.5, INNER_R * 0.025);
    ctx.shadowColor = col;
    ctx.shadowBlur  = 18;
    ctx.stroke();
    ctx.restore();

    if (certMode) {
      drawCertContent();
      return;
    }

    // Content with cross-fade alpha
    const a = panel.alpha;
    const phaseCol = phaseColor(panel.day - 1);

    // Status badge
    const badgeW = INNER_R * 0.5;
    const badgeH = INNER_R * 0.12;
    const bx = CX - badgeW / 2;
    const by = CY - INNER_R * 0.56;
    ctx.save();
    ctx.globalAlpha = a;
    ctx.beginPath();
    roundRect(ctx, bx, by, badgeW, badgeH, badgeH / 2);
    const isFree = CURRICULUM[panel.day - 1].status === 'FREE';
    ctx.fillStyle = isFree ? 'rgba(16,185,129,0.18)' : 'rgba(99,102,241,0.18)';
    ctx.fill();
    ctx.strokeStyle = isFree ? 'rgba(16,185,129,0.5)' : 'rgba(99,102,241,0.4)';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillStyle = isFree ? '#10B981' : '#818cf8';
    ctx.font = `800 ${Math.max(8, INNER_R * 0.09)}px 'Outfit', sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(isFree ? 'FREE' : 'PREMIUM', CX, by + badgeH / 2);
    ctx.restore();

    // "Day XX" big number
    ctx.save();
    ctx.globalAlpha = a;
    ctx.fillStyle = phaseCol;
    ctx.font = `800 ${Math.max(18, INNER_R * 0.2)}px 'JetBrains Mono', monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = phaseCol;
    ctx.shadowBlur = 14;
    ctx.fillText(`Day ${String(panel.day).padStart(2, '0')}`, CX, CY - INNER_R * 0.26);
    ctx.restore();

    // Phase icon
    ctx.save();
    ctx.globalAlpha = a;
    ctx.font = `${Math.max(16, INNER_R * 0.18)}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(PHASE[phaseKey(panel.day - 1)].icon, CX, CY + INNER_R * 0.01);
    ctx.restore();

    // Topic title — word-wrapped
    ctx.save();
    ctx.globalAlpha = a;
    ctx.fillStyle   = '#f1f5f9';
    const titleSize = Math.max(9, INNER_R * 0.1);
    ctx.font = `700 ${titleSize}px 'Outfit', sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowBlur = 0;
    wrapText(ctx, panel.title, CX, CY + INNER_R * 0.26, INNER_R * 1.55, titleSize * 1.4);
    ctx.restore();
  }

  /* Completion certificate state */
  function drawCertContent() {
    const pulse = 0.88 + 0.12 * Math.sin(certTimer * 3.5);
    ctx.save();
    ctx.globalAlpha = Math.min(1, certTimer * 1.5);

    // Trophy emoji
    ctx.font = `${Math.max(24, INNER_R * 0.28)}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🏆', CX, CY - INNER_R * 0.3);

    // Gold gradient text
    const grad = ctx.createLinearGradient(CX - INNER_R * 0.7, 0, CX + INNER_R * 0.7, 0);
    grad.addColorStop(0, '#FFB020');
    grad.addColorStop(0.5,'#fff');
    grad.addColorStop(1, '#FFB020');
    ctx.fillStyle = grad;
    ctx.font = `800 ${Math.max(11, INNER_R * 0.13)}px 'Outfit', sans-serif`;
    ctx.shadowColor = '#FFB020';
    ctx.shadowBlur = 18 * pulse;
    ctx.fillText('Get Your', CX, CY + INNER_R * 0.07);
    ctx.fillText('Certificate', CX, CY + INNER_R * 0.07 + Math.max(14, INNER_R * 0.16));

    ctx.restore();
  }

  /* ─── 13. Tick markers (clock numerals replacement) ─── */
  function drawTickMarks() {
    for (let i = 0; i < 60; i++) {
      const angle = dayAngle(i);
      const isMaj = (i % 10 === 0);
      const r1 = OUTER_R + (isMaj ? 6 : 3);
      const r2 = OUTER_R + (isMaj ? 11 : 5.5);
      const p1 = orbPos(angle, r1);
      const p2 = orbPos(angle, r2);
      ctx.save();
      ctx.strokeStyle = isMaj ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.07)';
      ctx.lineWidth = isMaj ? 1.5 : 1;
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
      ctx.restore();
    }
  }

  /* ─── 14. Canvas text helpers ─── */
  function wrapText(ctx, text, x, y, maxWidth, lineH) {
    const words = text.split(' ');
    let line = '';
    const lines = [];
    for (let w of words) {
      const test = line ? line + ' ' + w : w;
      if (ctx.measureText(test).width > maxWidth && line) {
        lines.push(line);
        line = w;
      } else {
        line = test;
      }
    }
    if (line) lines.push(line);
    const totalH = lines.length * lineH;
    lines.forEach((l, i) => {
      ctx.fillText(l, x, y - totalH / 2 + i * lineH + lineH / 2);
    });
  }

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }

  /* ─── 15. Advance logic ─── */
  const STEP_INTERVAL = 900;  // ms per day step (smooth advance speed)
  const CERT_HOLD     = 3200; // ms to hold cert screen
  let   elapsed       = 0;
  let   stepAccum     = 0;

  function advance(dt) {
    if (certMode) {
      certTimer += dt / 1000;
      if (certTimer > CERT_HOLD / 1000) {
        // Reset
        certMode    = false;
        certTimer   = 0;
        currentDay  = 0;
        targetDay   = 0;
        panel.day   = 1;
        panel.title = CURRICULUM[0].title;
        panel.phase = CURRICULUM[0].phase;
        panel.alpha = 1;
        panel.fading = false;
        for (let i = 0; i < 60; i++) dotRadii[i] = DOT_BASE;
      }
      return;
    }

    stepAccum += dt;
    if (stepAccum >= STEP_INTERVAL) {
      stepAccum -= STEP_INTERVAL;
      const prevDay = currentDay;
      currentDay = (currentDay + 1) % 60;

      if (prevDay === 59 && currentDay === 0) {
        // Just finished day 60
        certMode  = true;
        certTimer = 0;
        return;
      }

      // Trigger panel cross-fade to next day
      if (!panel.fading) {
        panel.fading    = true;
        panel.nextDay   = currentDay + 1;
        panel.nextTitle = CURRICULUM[currentDay].title;
        panel.nextPhase = CURRICULUM[currentDay].phase;
      }
    }

    // Panel cross-fade: fade out then in
    if (panel.fading) {
      panel.alpha -= dt / 160;
      if (panel.alpha <= 0) {
        panel.alpha  = 0;
        panel.day    = panel.nextDay;
        panel.title  = panel.nextTitle;
        panel.phase  = panel.nextPhase;
        panel.fading = false;
      }
    } else if (panel.alpha < 1) {
      panel.alpha = Math.min(1, panel.alpha + dt / 200);
    }
  }

  /* ─── 16. Main render loop ─── */
  function tick(ts) {
    rafId = requestAnimationFrame(tick);
    const dt = lastTimestamp ? Math.min(ts - lastTimestamp, 80) : 16;
    lastTimestamp = ts;

    advance(dt);

    // Scale for HiDPI
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    ctx.clearRect(0, 0, W, H);

    // BG gradient
    const bg = ctx.createRadialGradient(CX, CY, 0, CX, CY, Math.max(W, H));
    bg.addColorStop(0,   '#0d1323');
    bg.addColorStop(0.6, '#080c19');
    bg.addColorStop(1,   '#04060f');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    /* Subtle ambient ring */
    drawRing(OUTER_R, 1.0, 'rgba(255,255,255,0.04)', 1);

    /* Phase arc segments */
    drawRingSegments(currentDay + 1);

    /* Tick marks */
    drawTickMarks();

    /* All 60 dots */
    drawDots(currentDay);

    /* Milestone bubbles */
    drawMilestones(currentDay);

    /* Centre info panel */
    drawCentrePanel(currentDay);

    /* Cert ring glow burst */
    if (certMode) {
      const t = Math.min(1, certTimer / 0.6);
      const grad = ctx.createRadialGradient(CX, CY, INNER_R * 0.8, CX, CY, OUTER_R * 1.1);
      grad.addColorStop(0,   `rgba(255,176,32,${0.18 * t})`);
      grad.addColorStop(0.5, `rgba(255,176,32,${0.06 * t})`);
      grad.addColorStop(1,   'transparent');
      ctx.save();
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(CX, CY, OUTER_R * 1.1, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  /* ─── 17. Kick off ─── */
  requestAnimationFrame(tick);

}); // end DOMContentLoaded
