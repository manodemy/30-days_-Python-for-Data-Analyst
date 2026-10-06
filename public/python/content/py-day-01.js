// Python Day 01 — Data Types & Memory Management (Unified Single-Document Architecture)
if (!window.COURSE_CONTENT) window.COURSE_CONTENT = {};
window.COURSE_CONTENT['pyDay01'] = {
  day: 1,
  title: "Data Types & Memory Management",
  emoji: "🔢",
  topics: [
    { id: 'day01WhyPythonSection', label: '01. Why Python in Modern Analytics', duration: '0:47' },
    { id: 'day01ToolMatrixSection', label: '02. Tool Matrix: SQL vs Excel vs Python', duration: '0:46' },
    { id: 'day01MutabilitySection', label: '03. Mutability & Shared References', duration: '0:48' },
    { id: 'day01DataTypesSection', label: '04. Master Data Types Reference', duration: '0:47' },
    { id: 'day01MemorySection', label: '05. Memory Architecture & RAM Pointers', duration: '0:50' }
  ],

  slides: [
    {
      title: "Data Types & Memory Management",
      duration: "3:58",
      html: `
<!-- ═══ EMBEDDED PYTHON FLAGSHIP VISUAL DESIGN STYLES ═══ -->
<style>
  /* ══════════════════════════════════════════════════════════
     BASE & DARK THEME (DEFAULT)
     ══════════════════════════════════════════════════════════ */

  /* ── Flagship Dual-Box Heading Architecture (SQL Day 01 Parity) ── */
  .heading-box-wrap,
  .slide-section-title.heading-box-wrap {
    display: flex !important;
    align-items: stretch !important;
    gap: 0 !important;
    background: transparent !important;
    border: none !important;
    padding: 0 !important;
    margin: 24px 0 14px 0 !important;
    filter: drop-shadow(0 4px 14px rgba(0, 0, 0, 0.35)) !important;
  }
  .slide-section:first-child .heading-box-wrap,
  #day01WhyPythonSection .heading-box-wrap {
    margin-top: 4px !important;
  }

  /* Left Box: Monospace Number Badge (Exact SQL Day 01 Parity from 2nd Image) */
  .heading-num-box {
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    background: linear-gradient(135deg, #6366f1, #8b5cf6) !important;
    color: #ffffff !important;
    font-family: 'JetBrains Mono', var(--mono, monospace) !important;
    font-size: 0.88rem !important;
    font-weight: 800 !important;
    letter-spacing: 0.05em !important;
    padding: 8px 14px !important;
    border-radius: 8px 0 0 8px !important;
    border: 1px solid rgba(139, 92, 246, 0.6) !important;
    border-right: none !important;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.25) !important;
    flex-shrink: 0 !important;
    min-width: 44px !important;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3) !important;
  }

  /* Right Box: Matte Title Box (Always Deep Obsidian Dark — Exact 2nd Image Parity) */
  .heading-title-box {
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
    flex: 1 !important;
    background: #0f172a !important; /* Deep obsidian matte from SQL Day 01 */
    border: 1px solid rgba(255, 255, 255, 0.08) !important;
    border-left: 1px solid rgba(139, 92, 246, 0.4) !important;
    border-radius: 0 8px 8px 0 !important;
    padding: 8px 16px !important;
    color: #f8fafc !important;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05) !important;
  }

  .heading-title-text {
    flex: 1 !important;
    color: #f8fafc !important;
    font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif !important;
    font-size: 1.05rem !important;
    font-weight: 800 !important;
    letter-spacing: -0.015em !important;
    line-height: 1.35 !important;
    display: flex !important;
    align-items: center !important;
    gap: 10px !important;
  }

  .heading-icon {
    font-size: 1.15rem !important;
    display: inline-flex !important;
    align-items: center !important;
    line-height: 1 !important;
  }

  /* Audio Play Button in Heading */
  .heading-title-box .audio-play-btn,
  .heading-with-audio .audio-play-btn {
    width: 26px !important;
    height: 26px !important;
    min-width: 26px !important;
    min-height: 26px !important;
    max-width: 26px !important;
    max-height: 26px !important;
    border-radius: 6px !important;
    border: 1px solid rgba(255, 255, 255, 0.14) !important;
    background: rgba(255, 255, 255, 0.08) !important;
    color: #94a3b8 !important;
    cursor: pointer !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    padding: 0 !important;
    margin: 0 !important;
    flex-shrink: 0 !important;
    transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease, transform 0.15s ease !important;
  }

  .heading-title-box .audio-play-btn:hover,
  .heading-with-audio .audio-play-btn:hover {
    background: #ef4444 !important;
    border-color: #ef4444 !important;
    color: #ffffff !important;
    box-shadow: 0 0 10px rgba(239, 68, 68, 0.45) !important;
    transform: scale(1.05) !important;
  }

  .heading-title-box .audio-play-btn.playing,
  .heading-with-audio .audio-play-btn.playing {
    background: #ef4444 !important;
    border-color: #ef4444 !important;
    color: #ffffff !important;
    box-shadow: 0 0 12px rgba(239, 68, 68, 0.5) !important;
  }

  /* General Typography & Heading Hierarchy (Dark Mode) */
  .slide-section h1,
  .slide-section h2,
  .slide-section h3,
  .slide-section h4 {
    font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif !important;
    color: #f8fafc !important;
    letter-spacing: -0.015em !important;
  }

  @media (max-width: 640px) {
    .heading-num-box {
      font-size: 0.80rem !important;
      padding: 7px 10px !important;
      min-width: 40px !important;
    }
    .heading-title-box {
      padding: 7px 12px !important;
    }
    .heading-title-text {
      font-size: 0.88rem !important;
      gap: 6px !important;
    }
    .heading-icon {
      font-size: 1rem !important;
    }
    .heading-title-box .audio-play-btn {
      width: 24px !important;
      height: 24px !important;
      min-width: 24px !important;
      min-height: 24px !important;
    }
  }

  .py-infographic-card {
    background: linear-gradient(135deg, rgba(15, 23, 42, 0.96) 0%, rgba(8, 14, 28, 0.98) 100%);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    padding: 16px 18px;
    margin: 14px 0;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.05);
    transition: background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
  }
  .py-info-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    margin-bottom: 12px;
    padding-bottom: 8px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  }
  .py-info-title {
    font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 0.82rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #38bdf8;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .py-badge {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.68rem;
    font-weight: 700;
    padding: 2px 8px;
    border-radius: 4px;
    background: rgba(56, 189, 248, 0.12);
    border: 1px solid rgba(56, 189, 248, 0.28);
    color: #38bdf8;
  }
  .py-badge-gold {
    background: rgba(245, 158, 11, 0.12);
    border-color: rgba(245, 158, 11, 0.28);
    color: #fbbf24;
  }
  .py-badge-green {
    background: rgba(34, 197, 94, 0.12);
    border-color: rgba(34, 197, 94, 0.28);
    color: #4ade80;
  }
  .py-badge-purple {
    background: rgba(168, 85, 247, 0.12);
    border-color: rgba(168, 85, 247, 0.28);
    color: #c084fc;
  }
  .py-badge-rose {
    background: rgba(244, 63, 94, 0.12);
    border-color: rgba(244, 63, 94, 0.28);
    color: #fb7185;
  }

  /* CPython Object Header Grid */
  .cpython-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
    margin-top: 10px;
  }
  @media (max-width: 640px) {
    .cpython-grid { grid-template-columns: 1fr 1fr; }
  }
  .cpython-cell {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.07);
    border-radius: 8px;
    padding: 10px;
    text-align: center;
    transition: all 0.2s ease;
  }
  .cpython-cell:hover {
    background: rgba(56, 189, 248, 0.06);
    border-color: rgba(56, 189, 248, 0.3);
  }
  .cpython-cell-size {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.65rem;
    font-weight: 700;
    color: #94a3b8;
    margin-bottom: 4px;
  }
  .cpython-cell-name {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.78rem;
    font-weight: 800;
    color: #f8fafc;
  }
  .cpython-cell-desc {
    font-size: 0.70rem;
    color: #64748b;
    margin-top: 4px;
    line-height: 1.3;
  }

  /* Mutability Cards Base */
  .py-mut-card {
    border-radius: 8px;
    padding: 12px;
    transition: all 0.2s ease;
  }
  .py-mut-card.mut-green {
    background: rgba(16, 185, 129, 0.06);
    border: 1px solid rgba(16, 185, 129, 0.25);
  }
  .py-mut-card.mut-rose {
    background: rgba(244, 63, 94, 0.06);
    border: 1px solid rgba(244, 63, 94, 0.25);
  }
  .py-mut-card p {
    font-size: 0.75rem;
    color: #cbd5e1;
    margin: 0 0 8px;
    line-height: 1.45;
  }
  .py-mut-card .mut-ex {
    font-size: 0.70rem;
    color: #94a3b8;
    margin-bottom: 6px;
  }

  /* Memory Cards Base */
  .py-mem-card {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.07);
    border-radius: 8px;
    padding: 12px;
    transition: all 0.2s ease;
  }
  .py-mem-card-title {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.80rem;
    font-weight: 800;
    margin-bottom: 4px;
  }
  .py-mem-blue { color: #38bdf8; }
  .py-mem-green { color: #4ade80; }
  .py-mem-amber { color: #fbbf24; }
  .py-mem-purple { color: #c084fc; }
  .py-mem-card .py-mem-desc {
    font-size: 0.75rem;
    color: #cbd5e1;
    line-height: 1.5;
  }

  /* Code Block Box */
  .py-code-box {
    margin: 0;
    padding: 8px 10px;
    background: rgba(0, 0, 0, 0.45);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 6px;
    font-size: 0.74rem;
    color: #f8fafc;
    font-family: 'JetBrains Mono', monospace;
  }

  /* ══════════════════════════════════════════════════════════
     SUPERPOWERS FLAGSHIP SHOWCASE DESIGN (DARK THEME)
     ══════════════════════════════════════════════════════════ */
  .py-sp-showcase {
    background: linear-gradient(145deg, rgba(15, 23, 42, 0.96) 0%, rgba(10, 16, 31, 0.98) 100%);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 14px;
    padding: 20px 22px;
    margin: 16px 0;
    box-shadow: 0 16px 40px -10px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.06);
    transition: background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
  }
  .py-sp-header {
    margin-bottom: 18px;
    padding-bottom: 14px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }
  .py-sp-title-row {
    display: flex;
    align-items: center;
    gap: 14px;
    flex-wrap: wrap;
  }
  .py-sp-header-icon {
    width: 42px;
    height: 42px;
    border-radius: 12px;
    background: linear-gradient(135deg, rgba(56, 189, 248, 0.16) 0%, rgba(99, 102, 241, 0.22) 100%);
    border: 1px solid rgba(56, 189, 248, 0.35);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    flex-shrink: 0;
    box-shadow: 0 4px 14px rgba(56, 189, 248, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }
  .py-sp-header-text {
    display: flex;
    flex-direction: column;
    gap: 2px;
    flex: 1;
  }
  .py-sp-title {
    margin: 0;
    font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 1.12rem;
    font-weight: 800;
    letter-spacing: -0.015em;
    color: #f8fafc !important;
    line-height: 1.3;
  }
  .py-sp-subtitle {
    margin: 3px 0 0 0;
    font-size: 0.82rem;
    color: #94a3b8 !important;
    font-weight: 500;
    letter-spacing: 0.01em;
    line-height: 1.4;
  }
  .py-sp-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
  @media (max-width: 680px) {
    .py-sp-grid { grid-template-columns: 1fr; }
  }
  .py-sp-card {
    background: rgba(255, 255, 255, 0.025);
    border: 1px solid rgba(255, 255, 255, 0.07);
    border-radius: 12px;
    padding: 14px 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: all 0.22s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
  }
  .py-sp-card:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.04);
    box-shadow: 0 10px 24px -6px rgba(0, 0, 0, 0.4);
  }
  .py-sp-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    opacity: 0.85;
  }
  .py-sp-card.sp-blue::before { background: linear-gradient(90deg, #38bdf8, transparent); }
  .py-sp-card.sp-blue:hover { border-color: rgba(56, 189, 248, 0.4); }
  .py-sp-card.sp-green::before { background: linear-gradient(90deg, #34d399, transparent); }
  .py-sp-card.sp-green:hover { border-color: rgba(52, 211, 153, 0.4); }
  .py-sp-card.sp-amber::before { background: linear-gradient(90deg, #fbbf24, transparent); }
  .py-sp-card.sp-amber:hover { border-color: rgba(251, 191, 36, 0.4); }
  .py-sp-card.sp-purple::before { background: linear-gradient(90deg, #c084fc, transparent); }
  .py-sp-card.sp-purple:hover { border-color: rgba(192, 132, 252, 0.4); }

  .py-sp-card-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  .py-sp-card-header {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .py-sp-icon {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    flex-shrink: 0;
  }
  .sp-blue .py-sp-icon { background: rgba(56, 189, 248, 0.12); border: 1px solid rgba(56, 189, 248, 0.25); }
  .sp-green .py-sp-icon { background: rgba(52, 211, 153, 0.12); border: 1px solid rgba(52, 211, 153, 0.25); }
  .sp-amber .py-sp-icon { background: rgba(251, 191, 36, 0.12); border: 1px solid rgba(251, 191, 36, 0.25); }
  .sp-purple .py-sp-icon { background: rgba(192, 132, 252, 0.12); border: 1px solid rgba(192, 132, 252, 0.25); }

  .py-sp-card-title {
    font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 0.88rem;
    font-weight: 700;
    color: #f8fafc !important;
  }
  .py-sp-num {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.68rem;
    font-weight: 800;
    padding: 2px 7px;
    border-radius: 4px;
  }
  .sp-blue .py-sp-num { color: #38bdf8; background: rgba(56, 189, 248, 0.1); border: 1px solid rgba(56, 189, 248, 0.2); }
  .sp-green .py-sp-num { color: #34d399; background: rgba(52, 211, 153, 0.1); border: 1px solid rgba(52, 211, 153, 0.2); }
  .sp-amber .py-sp-num { color: #fbbf24; background: rgba(251, 191, 36, 0.1); border: 1px solid rgba(251, 191, 36, 0.2); }
  .sp-purple .py-sp-num { color: #c084fc; background: rgba(192, 132, 252, 0.1); border: 1px solid rgba(192, 132, 252, 0.2); }

  .py-sp-desc {
    font-size: 0.77rem;
    line-height: 1.55;
    color: #cbd5e1 !important;
    margin: 0 0 10px 0;
  }
  .py-sp-tag {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 0.70rem;
    font-weight: 600;
    padding: 3px 8px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.07);
    color: #e2e8f0;
    align-self: flex-start;
  }

  /* 05 AI Flagship Banner */
  .py-sp-ai-banner {
    margin-top: 12px;
    background: linear-gradient(135deg, rgba(147, 51, 234, 0.15) 0%, rgba(79, 70, 229, 0.12) 50%, rgba(15, 23, 42, 0.85) 100%);
    border: 1px solid rgba(168, 85, 247, 0.35);
    border-radius: 12px;
    padding: 16px 18px;
    display: flex;
    align-items: center;
    gap: 16px;
    box-shadow: 0 10px 28px -6px rgba(147, 51, 234, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.08);
    transition: all 0.22s ease;
  }
  .py-sp-ai-banner:hover {
    border-color: rgba(168, 85, 247, 0.55);
    box-shadow: 0 12px 32px -4px rgba(147, 51, 234, 0.35);
  }
  .py-sp-ai-icon {
    width: 42px;
    height: 42px;
    border-radius: 10px;
    background: linear-gradient(135deg, #a855f7 0%, #ec4899 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    flex-shrink: 0;
    box-shadow: 0 4px 14px rgba(168, 85, 247, 0.4);
  }
  .py-sp-ai-body { flex: 1; }
  .py-sp-ai-title-row {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 4px;
    flex-wrap: wrap;
  }
  .py-sp-ai-title {
    font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 0.92rem;
    font-weight: 800;
    color: #fdf4ff !important;
    letter-spacing: -0.01em;
  }
  .py-sp-ai-pill {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.65rem;
    font-weight: 700;
    padding: 2px 7px;
    border-radius: 4px;
    background: rgba(236, 72, 153, 0.16);
    border: 1px solid rgba(236, 72, 153, 0.38);
    color: #f472b6;
  }
  .py-sp-ai-text {
    font-size: 0.78rem;
    color: #e2e8f0 !important;
    line-height: 1.55;
    margin: 0;
  }
  .py-sp-code-pill {
    display: inline-block;
    background: rgba(168, 85, 247, 0.22) !important;
    color: #f5d0fe !important;
    border: 1px solid rgba(168, 85, 247, 0.45) !important;
    padding: 1px 7px !important;
    border-radius: 5px !important;
    font-family: 'JetBrains Mono', monospace !important;
    font-size: 0.73rem !important;
    font-weight: 600 !important;
    vertical-align: middle;
  }

  /* ══════════════════════════════════════════════════════════
     LIGHT MODE THEME ADAPTATIONS ([data-theme="light"])
     ══════════════════════════════════════════════════════════ */

  /* ── Keep Heading Box Dark in Light Mode (Exactly Like 2nd Image) ── */
  [data-theme="light"] .heading-box-wrap,
  [data-theme="light"] .slide-section-title.heading-box-wrap {
    filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.16)) !important;
  }
  [data-theme="light"] .heading-num-box {
    background: linear-gradient(135deg, #6366f1, #8b5cf6) !important;
    color: #ffffff !important;
    border: 1px solid rgba(139, 92, 246, 0.6) !important;
    border-right: none !important;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.25) !important;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3) !important;
  }
  [data-theme="light"] .heading-title-box {
    background: #0f172a !important; /* Retain deep obsidian matte in light mode */
    border: 1px solid rgba(255, 255, 255, 0.08) !important;
    border-left: 1px solid rgba(139, 92, 246, 0.4) !important;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 3px 10px rgba(0, 0, 0, 0.12) !important;
  }
  [data-theme="light"] .heading-title-text {
    color: #f8fafc !important; /* Crisp white text inside dark box */
  }
  [data-theme="light"] .heading-title-box .audio-play-btn {
    background: rgba(255, 255, 255, 0.08) !important;
    border: 1px solid rgba(255, 255, 255, 0.12) !important;
    color: #94a3b8 !important;
  }
  [data-theme="light"] .heading-title-box .audio-play-btn:hover {
    background: #ef4444 !important;
    border-color: #ef4444 !important;
    color: #ffffff !important;
    box-shadow: 0 0 10px rgba(239, 68, 68, 0.4) !important;
  }
  [data-theme="light"] .heading-title-box .audio-play-btn.playing {
    background: #ef4444 !important;
    border-color: #ef4444 !important;
    color: #ffffff !important;
    box-shadow: 0 0 10px rgba(239, 68, 68, 0.4) !important;
  }
  [data-theme="light"] .slide-section h1,
  [data-theme="light"] .slide-section h2,
  [data-theme="light"] .slide-section h3,
  [data-theme="light"] .slide-section h4 {
    color: #0f172a !important;
  }

  [data-theme="light"] .py-sp-showcase {
    background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);
    border: 1px solid #e2e8f0;
    box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.05), inset 0 1px 0 #ffffff;
  }
  [data-theme="light"] .py-sp-header {
    border-bottom: 1.5px solid #e2e8f0;
    padding-bottom: 14px;
    margin-bottom: 18px;
  }
  [data-theme="light"] .py-sp-header-icon {
    background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
    border: 1.5px solid #38bdf8;
    box-shadow: 0 4px 14px rgba(2, 132, 199, 0.15);
    width: 44px;
    height: 44px;
    border-radius: 12px;
  }
  [data-theme="light"] .py-sp-title {
    color: #0f172a !important;
    font-size: 1.25rem !important;
    font-weight: 800 !important;
    letter-spacing: -0.02em !important;
  }
  [data-theme="light"] .py-sp-subtitle {
    color: #334155 !important;
    font-size: 0.88rem !important;
    font-weight: 500 !important;
  }

  /* Light Mode 4 Cards */
  [data-theme="light"] .py-sp-card {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
  }
  [data-theme="light"] .py-sp-card:hover {
    background: #ffffff;
    transform: translateY(-2px);
    box-shadow: 0 10px 25px -4px rgba(0, 0, 0, 0.08);
  }
  [data-theme="light"] .py-sp-card.sp-blue:hover { border-color: #38bdf8; }
  [data-theme="light"] .py-sp-card.sp-green:hover { border-color: #34d399; }
  [data-theme="light"] .py-sp-card.sp-amber:hover { border-color: #fbbf24; }
  [data-theme="light"] .py-sp-card.sp-purple:hover { border-color: #c084fc; }

  [data-theme="light"] .py-sp-card-title {
    color: #0f172a !important;
  }
  [data-theme="light"] .py-sp-desc { color: #1e293b !important; font-weight: 500; }
  [data-theme="light"] .sp-blue .py-sp-icon {
    background: #f0f9ff;
    border: 1px solid #bae6fd;
  }
  [data-theme="light"] .sp-green .py-sp-icon {
    background: #f0fdf4;
    border: 1px solid #bbf7d0;
  }
  [data-theme="light"] .sp-amber .py-sp-icon {
    background: #fffbeb;
    border: 1px solid #fde68a;
  }
  [data-theme="light"] .sp-purple .py-sp-icon {
    background: #faf5ff;
    border: 1px solid #ddd6fe;
  }
  [data-theme="light"] .sp-blue .py-sp-num {
    color: #0284c7;
    background: #e0f2fe;
    border: 1px solid #bae6fd;
  }
  [data-theme="light"] .sp-green .py-sp-num {
    color: #16a34a;
    background: #dcfce7;
    border: 1px solid #bbf7d0;
  }
  [data-theme="light"] .sp-amber .py-sp-num {
    color: #d97706;
    background: #fef3c7;
    border: 1px solid #fde68a;
  }
  [data-theme="light"] .sp-purple .py-sp-num {
    color: #7c3aed;
    background: #f3e8ff;
    border: 1px solid #ddd6fe;
  }
  [data-theme="light"] .py-sp-tag {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    color: #334155;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
  }

  /* Light Mode 05 AI Banner */
  [data-theme="light"] .py-sp-ai-banner {
    background: linear-gradient(135deg, #faf5ff 0%, #f5f3ff 50%, #ffffff 100%);
    border: 1px solid #d8b4fe;
    box-shadow: 0 8px 24px -4px rgba(124, 58, 237, 0.08), inset 0 1px 0 #ffffff;
  }
  [data-theme="light"] .py-sp-ai-banner:hover {
    border-color: #c084fc;
    box-shadow: 0 12px 28px -4px rgba(124, 58, 237, 0.14);
  }
  [data-theme="light"] .py-sp-ai-icon {
    background: linear-gradient(135deg, #9333ea 0%, #db2777 100%);
    box-shadow: 0 4px 12px rgba(147, 51, 234, 0.25);
    color: #ffffff;
  }
  [data-theme="light"] .py-sp-ai-title {
    color: #581c87 !important;
  }
  [data-theme="light"] .py-sp-ai-pill {
    background: #fdf2f8;
    border: 1px solid #fbcfe8;
    color: #be185d;
  }
  [data-theme="light"] .py-sp-ai-text {
    color: #334155 !important;
  }
  [data-theme="light"] .py-sp-code-pill {
    background: #ede9fe !important;
    color: #6d28d9 !important;
    border: 1px solid #c4b5fd !important;
  }

  /* Other Cards Light Mode Adaptations */
  [data-theme="light"] .py-infographic-card {
    background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);
    border: 1px solid #e2e8f0;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.04), inset 0 1px 0 #ffffff;
  }
  [data-theme="light"] .py-info-header {
    border-bottom: 1px solid #e2e8f0;
  }
  [data-theme="light"] .py-info-title {
    color: #0284c7;
  }
  [data-theme="light"] .py-badge-gold {
    background: #fef3c7;
    border-color: #fde68a;
    color: #b45309;
  }
  [data-theme="light"] .py-badge-green {
    background: #dcfce7;
    border-color: #bbf7d0;
    color: #15803d;
  }
  [data-theme="light"] .py-badge-purple {
    background: #f3e8ff;
    border-color: #ddd6fe;
    color: #6d28d9;
  }
  [data-theme="light"] .py-badge-rose {
    background: #ffe4e6;
    border-color: #fecdd3;
    color: #e11d48;
  }
  [data-theme="light"] .cpython-cell {
    background: #ffffff;
    border: 1px solid #e2e8f0;
  }
  [data-theme="light"] .cpython-cell:hover {
    background: #f0f9ff;
    border-color: #38bdf8;
  }
  [data-theme="light"] .cpython-cell-size { color: #0284c7; font-weight: 700; }
  [data-theme="light"] .cpython-cell-name {
    color: #0f172a;
  }
  [data-theme="light"] .cpython-cell-desc { color: #1e293b; font-weight: 500; }

  /* Mutability & Memory Light Mode */
  [data-theme="light"] .py-mut-card.mut-green {
    background: #f0fdf4;
    border: 1px solid #86efac;
  }
  [data-theme="light"] .py-mut-card.mut-rose {
    background: #fff1f2;
    border: 1px solid #fecdd3;
  }
  [data-theme="light"] .py-mut-card p {
    color: #334155 !important;
  }
  [data-theme="light"] .py-mut-card .mut-ex { color: #1e293b !important; font-weight: 600; }
  [data-theme="light"] .py-mem-card {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02);
  }
  [data-theme="light"] .py-mem-card .py-mem-desc { color: #1e293b !important; font-weight: 500; }
  [data-theme="light"] .py-code-box {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    color: #0f172a;
  }
  [data-theme="light"] .py-code-box .code-comment { color: #047857; font-weight: 600; font-style: italic; }

  /* ══════════════════════════════════════════════════════════
     MUTABILITY ARCHITECTURE SHOWCASE (LIGHT & DARK DUAL THEME)
     ══════════════════════════════════════════════════════════ */
  .py-mut-showcase {
    background: linear-gradient(145deg, rgba(15, 23, 42, 0.96) 0%, rgba(10, 16, 31, 0.98) 100%);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 14px;
    padding: 20px 22px;
    margin: 16px 0;
    box-shadow: 0 16px 40px -10px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.06);
    transition: all 0.3s ease;
  }
  .py-mut-header {
    margin-bottom: 18px;
    padding-bottom: 14px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }
  .py-mut-title-row {
    display: flex;
    align-items: center;
    gap: 14px;
    flex-wrap: wrap;
  }
  .py-mut-header-icon {
    width: 42px;
    height: 42px;
    border-radius: 12px;
    background: linear-gradient(135deg, rgba(168, 85, 247, 0.18) 0%, rgba(99, 102, 241, 0.22) 100%);
    border: 1px solid rgba(168, 85, 247, 0.35);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    flex-shrink: 0;
    box-shadow: 0 4px 14px rgba(168, 85, 247, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }
  .py-mut-title {
    margin: 0;
    font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 1.12rem;
    font-weight: 800;
    letter-spacing: -0.015em;
    color: #f8fafc !important;
    line-height: 1.3;
  }
  .py-mut-subtitle {
    margin: 6px 0 0 56px;
    font-size: 0.88rem;
    color: #94a3b8 !important;
    font-weight: 500;
    letter-spacing: 0.01em;
    line-height: 1.4;
  }
  @media (max-width: 640px) {
    .py-mut-subtitle {
      margin-left: 0;
    }
  }

  /* Dual Comparison Columns Grid */
  .py-mut-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
  }
  @media (max-width: 768px) {
    .py-mut-grid { grid-template-columns: 1fr; }
  }

  .py-mut-panel {
    border-radius: 12px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    transition: all 0.25s ease;
    position: relative;
    overflow: hidden;
  }
  .py-mut-panel::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
  }

  /* Mutable (Green) */
  .py-mut-panel.panel-mutable {
    background: rgba(16, 185, 129, 0.04);
    border: 1px solid rgba(16, 185, 129, 0.22);
  }
  .py-mut-panel.panel-mutable::before {
    background: linear-gradient(90deg, #10b981 0%, #34d399 100%);
  }
  .py-mut-panel.panel-mutable:hover {
    border-color: rgba(16, 185, 129, 0.45);
    box-shadow: 0 10px 25px -5px rgba(16, 185, 129, 0.15);
  }

  /* Immutable (Rose) */
  .py-mut-panel.panel-immutable {
    background: rgba(244, 63, 94, 0.04);
    border: 1px solid rgba(244, 63, 94, 0.22);
  }
  .py-mut-panel.panel-immutable::before {
    background: linear-gradient(90deg, #f43f5e 0%, #fb7185 100%);
  }
  .py-mut-panel.panel-immutable:hover {
    border-color: rgba(244, 63, 94, 0.45);
    box-shadow: 0 10px 25px -5px rgba(244, 63, 94, 0.15);
  }

  /* Distinct Box for Headings */
  .py-mut-header-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 10px 14px;
    border-radius: 10px;
    margin-bottom: 12px;
    min-height: 64px;
    box-sizing: border-box;
    transition: all 0.2s ease;
  }
  .mut-header-green {
    background: rgba(16, 185, 129, 0.08);
    border: 1px solid rgba(16, 185, 129, 0.28);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
  }
  .mut-header-rose {
    background: rgba(244, 63, 94, 0.08);
    border: 1px solid rgba(244, 63, 94, 0.28);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
  }

  [data-theme="light"] .mut-header-green {
    background: #f0fdf4;
    border: 1px solid #86efac;
    box-shadow: 0 1px 4px rgba(16, 185, 129, 0.08);
  }
  [data-theme="light"] .mut-header-rose {
    background: #fff1f2;
    border: 1px solid #fecdd3;
    box-shadow: 0 1px 4px rgba(244, 63, 94, 0.08);
  }

  .py-mut-panel-title-wrap {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .py-mut-panel-icon {
    width: 36px;
    height: 36px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.15rem;
    flex-shrink: 0;
  }
  .mut-header-green .py-mut-panel-icon {
    background: rgba(16, 185, 129, 0.16);
    border: 1px solid rgba(16, 185, 129, 0.32);
  }
  [data-theme="light"] .mut-header-green .py-mut-panel-icon {
    background: #ffffff;
    border: 1px solid #86efac;
    box-shadow: 0 1px 2px rgba(16, 185, 129, 0.1);
  }
  .mut-header-rose .py-mut-panel-icon {
    background: rgba(244, 63, 94, 0.16);
    border: 1px solid rgba(244, 63, 94, 0.32);
  }
  [data-theme="light"] .mut-header-rose .py-mut-panel-icon {
    background: #ffffff;
    border: 1px solid #fecdd3;
    box-shadow: 0 1px 2px rgba(244, 63, 94, 0.1);
  }

  .py-mut-panel-name {
    margin: 0;
    font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 0.98rem;
    font-weight: 800;
    letter-spacing: -0.01em;
  }
  .mut-header-green .py-mut-panel-name { color: #4ade80 !important; }
  [data-theme="light"] .mut-header-green .py-mut-panel-name { color: #15803d !important; }
  .mut-header-rose .py-mut-panel-name { color: #fb7185 !important; }
  [data-theme="light"] .mut-header-rose .py-mut-panel-name { color: #be123c !important; }

  .py-mut-panel-sub {
    display: block;
    font-size: 0.68rem;
    font-weight: 500;
    color: #94a3b8;
    white-space: nowrap;
  }
  [data-theme="light"] .py-mut-panel-sub { display: block; font-size: 0.68rem; font-weight: 700; color: #1e293b; white-space: nowrap; }

  /* Vertical Stacked Pill: "Cannot" / "Change" */
  .py-mut-status-pill {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    line-height: 1.15;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.62rem;
    font-weight: 800;
    padding: 4px 8px;
    border-radius: 6px;
    white-space: nowrap;
    flex-shrink: 0;
    letter-spacing: 0.03em;
    text-transform: uppercase;
  }
  .py-mut-status-pill span {
    display: block;
    line-height: 1.15;
  }
  .pill-mutable {
    background: rgba(16, 185, 129, 0.18);
    border: 1px solid rgba(16, 185, 129, 0.38);
    color: #34d399;
  }
  [data-theme="light"] .pill-mutable {
    background: #dcfce7;
    border: 1px solid #86efac;
    color: #15803d;
    box-shadow: 0 1px 2px rgba(16, 185, 129, 0.1);
  }
  .pill-immutable {
    background: rgba(244, 63, 94, 0.18);
    border: 1px solid rgba(244, 63, 94, 0.38);
    color: #fb7185;
  }
  [data-theme="light"] .pill-immutable {
    background: #ffe4e6;
    border: 1px solid #fecdd3;
    color: #be123c;
    box-shadow: 0 1px 2px rgba(244, 63, 94, 0.1);
  }

  .py-mut-desc {
    font-size: 0.78rem;
    line-height: 1.55;
    color: #cbd5e1 !important;
    margin: 0 0 12px 0;
    min-height: 72px;
    box-sizing: border-box;
  }

  .py-mut-types-row {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 12px;
    min-height: 30px;
    box-sizing: border-box;
    flex-wrap: wrap;
  }
  .py-mut-types-label {
    font-size: 0.70rem;
    color: #94a3b8;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
  .py-mut-type-tag {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.70rem;
    font-weight: 700;
    padding: 1px 7px;
    border-radius: 4px;
  }
  .panel-mutable .py-mut-type-tag {
    background: rgba(16, 185, 129, 0.15);
    border: 1px solid rgba(16, 185, 129, 0.3);
    color: #6ee7b7;
  }
  .panel-immutable .py-mut-type-tag {
    background: rgba(244, 63, 94, 0.15);
    border: 1px solid rgba(244, 63, 94, 0.3);
    color: #fca5a5;
  }

  /* Sleek Visual Code Card Inside Panel */
  .py-mut-code-wrap {
    background: rgba(0, 0, 0, 0.45);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 8px;
    overflow: hidden;
    min-height: 122px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  .py-mut-code-topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 10px;
    background: rgba(255, 255, 255, 0.03);
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.68rem;
  }
  .panel-mutable .py-mut-code-topbar { color: #34d399; }
  .panel-immutable .py-mut-code-topbar { color: #fb7185; }

  .py-mut-code-wrap pre {
    margin: 0;
    padding: 10px 12px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.74rem;
    color: #f8fafc;
    line-height: 1.6;
    overflow-x: auto;
  }

  .py-mut-takeaway {
    margin-top: 0;
    font-size: 0.72rem;
    padding: 8px 12px;
    border-radius: 6px;
    line-height: 1.45;
    min-height: 60px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
  }
  .panel-mutable .py-mut-takeaway {
    margin-top: 0;
    font-size: 0.72rem;
    padding: 8px 12px;
    border-radius: 6px;
    line-height: 1.45;
    min-height: 60px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
  }
  .panel-immutable .py-mut-takeaway {
    margin-top: 0;
    font-size: 0.72rem;
    padding: 8px 12px;
    border-radius: 6px;
    line-height: 1.45;
    min-height: 60px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
  }

  /* ══════════════════════════════════════════════════════════
     LIGHT MODE OVERRIDES FOR MUTABILITY SHOWCASE
     ══════════════════════════════════════════════════════════ */
  [data-theme="light"] .py-mut-showcase {
    background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);
    border: 1px solid #e2e8f0;
    box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.05), inset 0 1px 0 #ffffff;
  }
  [data-theme="light"] .py-mut-header {
    border-bottom: 1.5px solid #e2e8f0;
    padding-bottom: 14px;
    margin-bottom: 18px;
  }
  [data-theme="light"] .py-mut-header-icon {
    background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%);
    border: 1.5px solid #c084fc;
    box-shadow: 0 4px 14px rgba(168, 85, 247, 0.15);
    width: 44px;
    height: 44px;
    border-radius: 12px;
  }
  [data-theme="light"] .py-mut-title {
    color: #0f172a !important;
    font-size: 1.25rem !important;
    font-weight: 800 !important;
    letter-spacing: -0.02em !important;
  }
  [data-theme="light"] .py-mut-subtitle {
    color: #334155 !important;
    font-size: 0.88rem !important;
    font-weight: 500 !important;
  }

  /* Light Mode Panels */
  [data-theme="light"] .py-mut-panel.panel-mutable {
    background: #ffffff;
    border: 1px solid #d1fae5;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
  }
  [data-theme="light"] .py-mut-panel.panel-mutable:hover {
    border-color: #86efac;
    box-shadow: 0 8px 20px -4px rgba(16, 185, 129, 0.12);
  }
  [data-theme="light"] .panel-mutable .py-mut-panel-title {
    color: #15803d !important;
  }
  [data-theme="light"] .panel-mutable .py-mut-meta-pill {
    background: #dcfce7;
    color: #166534;
    border: 1px solid #86efac;
  }
  [data-theme="light"] .panel-mutable .py-mut-type-tag {
    background: #dcfce7;
    border: 1px solid #86efac;
    color: #15803d;
  }
  [data-theme="light"] .panel-mutable .py-mut-takeaway {
    margin-top: 0;
    font-size: 0.72rem;
    padding: 8px 12px;
    border-radius: 6px;
    line-height: 1.45;
    min-height: 60px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
  }

  [data-theme="light"] .py-mut-panel.panel-immutable {
    background: #ffffff;
    border: 1px solid #ffe4e6;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
  }
  [data-theme="light"] .py-mut-panel.panel-immutable:hover {
    border-color: #fda4af;
    box-shadow: 0 8px 20px -4px rgba(244, 63, 94, 0.12);
  }
  [data-theme="light"] .panel-immutable .py-mut-panel-title {
    color: #be123c !important;
  }
  [data-theme="light"] .panel-immutable .py-mut-meta-pill {
    background: #ffe4e6;
    color: #9f1239;
    border: 1px solid #fecdd3;
  }
  [data-theme="light"] .panel-immutable .py-mut-type-tag {
    background: #ffe4e6;
    border: 1px solid #fecdd3;
    color: #be123c;
  }
  [data-theme="light"] .panel-immutable .py-mut-takeaway {
    margin-top: 0;
    font-size: 0.72rem;
    padding: 8px 12px;
    border-radius: 6px;
    line-height: 1.45;
    min-height: 60px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
  }

  [data-theme="light"] .py-mut-desc {
    font-size: 0.78rem;
    line-height: 1.55;
    color: #1e293b !important;
    margin: 0 0 12px 0;
    min-height: 72px;
    box-sizing: border-box;
    font-weight: 500;
  }
  [data-theme="light"] .py-mut-analogy-badge { color: #1e293b !important; font-weight: 700; }
  [data-theme="light"] .py-mut-types-label { color: #0f172a !important; font-weight: 800; }

  [data-theme="light"] .py-mut-code-wrap {
    background: #f8fafc !important;
    border: 1.5px solid #cbd5e1 !important;
    border-radius: 8px;
    overflow: hidden;
    min-height: 122px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  [data-theme="light"] .py-mut-code-topbar {
    background: #f8fafc;
    border-bottom: 1px solid #e2e8f0;
  }
  [data-theme="light"] .panel-mutable .py-mut-code-topbar { color: #15803d; }
  [data-theme="light"] .panel-immutable .py-mut-code-topbar { color: #be123c; }
  [data-theme="light"] .py-mut-code-wrap pre {
    color: #0f172a;
  }
  [data-theme="light"] .py-mut-code-wrap pre .code-comment { color: #047857 !important; font-weight: 600 !important; font-style: italic !important; }


  /* ══════════════════════════════════════════════════════════
     ANTI-SQUEEZE & RESPONSIVE SPLIT-PANE STYLING
     ══════════════════════════════════════════════════════════ */
  /* Prevent table squeezing and word splitting */
  .db-mock-table-wrap {
    width: 100% !important;
    overflow-x: auto !important;
    -webkit-overflow-scrolling: touch;
    margin: 14px 0;
    border-radius: 10px;
  }
  .db-mock-table-wrap .db-table-mock {
    min-width: 650px !important;
    width: 100%;
    border-collapse: collapse;
  }
  .db-mock-table-wrap .db-table-mock th,
  .db-mock-table-wrap .db-table-mock td {
    padding: 8px 12px !important;
    vertical-align: middle;
  }
  /* Code & Syntax pills NEVER break into multiple lines when squeezed */
  .db-mock-table-wrap code,
  .db-mock-table-wrap .db-table-mock code {
    white-space: nowrap !important;
    display: inline-block !important;
    word-break: normal !important;
    overflow-wrap: normal !important;
    hyphens: none !important;
  }
  /* Prevent Category, Type, Keyword, Syntax, and Mutability columns from line-breaking */
  .db-mock-table-wrap .db-table-mock th:nth-child(1),
  .db-mock-table-wrap .db-table-mock td:nth-child(1),
  .db-mock-table-wrap .db-table-mock th:nth-child(2),
  .db-mock-table-wrap .db-table-mock td:nth-child(2),
  .db-mock-table-wrap .db-table-mock th:nth-child(3),
  .db-mock-table-wrap .db-table-mock td:nth-child(3),
  .db-mock-table-wrap .db-table-mock th:nth-child(4),
  .db-mock-table-wrap .db-table-mock td:nth-child(4),
  .db-mock-table-wrap .db-table-mock th:nth-child(6),
  .db-mock-table-wrap .db-table-mock td:nth-child(6) {
    white-space: nowrap !important;
  }
  /* Description column wraps naturally with legible line height */
  .db-mock-table-wrap .db-table-mock td:nth-child(5) {
    white-space: normal !important;
    min-width: 180px;
    line-height: 1.45;
  }
  .db-mock-table-wrap .py-badge {
    white-space: nowrap !important;
    display: inline-block;
  }

  /* ══════════════════════════════════════════════════════════
     TOOL MATRIX: FLAGSHIP COMPARISON SHOWCASE
     ══════════════════════════════════════════════════════════ */
  .py-matrix-showcase {
    background: linear-gradient(145deg, #0d1527 0%, #080d1a 100%);
    border: 1px solid rgba(56, 189, 248, 0.22);
    border-radius: 12px;
    padding: 16px;
    margin: 16px 0;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
    position: relative;
    overflow: hidden;
  }
  .py-matrix-header {
    margin-bottom: 18px;
    padding-bottom: 14px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }
  .py-matrix-title-row {
    display: flex;
    align-items: center;
    gap: 14px;
    flex-wrap: wrap;
  }
  .py-matrix-header-icon {
    font-size: 1.25rem;
    line-height: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 42px;
    height: 42px;
    border-radius: 12px;
    background: linear-gradient(135deg, rgba(16, 185, 129, 0.16) 0%, rgba(56, 189, 248, 0.22) 100%);
    border: 1px solid rgba(56, 189, 248, 0.35);
    flex-shrink: 0;
    box-shadow: 0 4px 14px rgba(56, 189, 248, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }
  .py-matrix-header-text {
    display: flex;
    flex-direction: column;
    gap: 2px;
    flex: 1;
  }
  .py-matrix-title-row {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
  }
  .py-matrix-title {
    margin: 0;
    font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 1.12rem;
    font-weight: 800;
    letter-spacing: -0.015em;
    color: #f8fafc;
    line-height: 1.3;
  }
  .py-matrix-subtitle {
    margin: 3px 0 0 0;
    font-size: 0.82rem;
    color: #94a3b8;
    font-weight: 500;
    letter-spacing: 0.01em;
    line-height: 1.4;
  }

  /* Matrix Table Container */
  .py-matrix-table-wrap {
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(11, 17, 32, 0.6);
  }
  .py-matrix-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    min-width: 620px;
    font-family: inherit;
  }
  .py-matrix-table th {
    background: #0f172a;
    color: #94a3b8;
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    padding: 10px 14px;
    text-align: left;
    border-bottom: 2px solid rgba(255, 255, 255, 0.1);
    white-space: nowrap;
  }
  .py-matrix-table td {
    padding: 12px 14px;
    font-size: 0.82rem;
    line-height: 1.45;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    color: #e2e8f0;
    vertical-align: middle;
  }
  .py-matrix-table tr:last-child td {
    border-bottom: none;
  }
  .py-matrix-table tbody tr {
    transition: background-color 0.2s ease;
  }
  .py-matrix-table tbody tr:hover {
    background: rgba(255, 255, 255, 0.03);
  }

  /* Tool Identity Pills */
  .py-tool-pill {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 12px;
    border-radius: 8px;
    font-weight: 700;
    font-size: 0.84rem;
    letter-spacing: -0.01em;
    white-space: nowrap;
  }
  .py-tool-pill.tool-sql {
    background: rgba(56, 189, 248, 0.12);
    color: #38bdf8;
    border: 1px solid rgba(56, 189, 248, 0.3);
  }
  .py-tool-pill.tool-excel {
    background: rgba(34, 197, 94, 0.12);
    color: #4ade80;
    border: 1px solid rgba(34, 197, 94, 0.3);
  }
  .py-tool-pill.tool-python {
    background: rgba(245, 158, 11, 0.15);
    color: #fbbf24;
    border: 1px solid rgba(245, 158, 11, 0.38);
    box-shadow: 0 0 10px rgba(245, 158, 11, 0.12);
  }
  .py-tool-flag {
    font-size: 0.65rem;
    font-weight: 800;
    padding: 1px 5px;
    border-radius: 4px;
    background: #fbbf24;
    color: #0b1120;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    margin-left: 2px;
  }
  .py-matrix-highlight-row {
    background: rgba(245, 158, 11, 0.04) !important;
  }
  .py-matrix-highlight-row:hover {
    background: rgba(245, 158, 11, 0.08) !important;
  }

  /* Role & Advantage Content */
  .py-matrix-role {
    font-weight: 500;
    color: #cbd5e1;
  }
  .py-matrix-adv {
    color: #e2e8f0;
  }

  /* Capacity / Limits Badges */
  .py-matrix-limit {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 4px 10px;
    border-radius: 6px;
    font-size: 0.74rem;
    font-weight: 600;
    white-space: nowrap;
  }
  .py-matrix-limit.limit-massive {
    background: rgba(56, 189, 248, 0.1);
    color: #38bdf8;
    border: 1px solid rgba(56, 189, 248, 0.25);
  }
  .py-matrix-limit.limit-small {
    background: rgba(244, 63, 94, 0.1);
    color: #fb7185;
    border: 1px solid rgba(244, 63, 94, 0.25);
  }
  .py-matrix-limit.limit-large {
    background: rgba(168, 85, 247, 0.12);
    color: #c084fc;
    border: 1px solid rgba(168, 85, 247, 0.28);
  }

  /* ══════ LIGHT MODE THEME ADAPTATION ══════ */
  [data-theme="light"] .py-matrix-showcase {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  }
  [data-theme="light"] .py-matrix-header {
    border-bottom: 1.5px solid #e2e8f0;
    padding-bottom: 14px;
    margin-bottom: 18px;
  }
  [data-theme="light"] .py-matrix-header-icon {
    background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
    border: 1.5px solid #34d399;
    box-shadow: 0 4px 14px rgba(16, 185, 129, 0.15);
    width: 44px;
    height: 44px;
    border-radius: 12px;
  }
  [data-theme="light"] .py-matrix-title {
    color: #0f172a !important;
    font-size: 1.25rem !important;
    font-weight: 800 !important;
    letter-spacing: -0.02em !important;
  }
  [data-theme="light"] .py-matrix-subtitle {
    color: #334155 !important;
    font-size: 0.88rem !important;
    font-weight: 500 !important;
  }
  [data-theme="light"] .py-matrix-table-wrap {
    border-color: #e2e8f0;
    background: #ffffff;
  }
  [data-theme="light"] .py-matrix-table th { background: #f1f5f9; color: #0f172a; font-weight: 800; border-bottom: 2px solid #cbd5e1; }
  [data-theme="light"] .py-matrix-table td {
    color: #334155;
    border-bottom: 1px solid #f1f5f9;
  }
  [data-theme="light"] .py-matrix-table tbody tr:hover {
    background: #f8fafc;
  }
  [data-theme="light"] .py-tool-pill.tool-sql {
    background: #e0f2fe;
    color: #0369a1;
    border-color: #bae6fd;
  }
  [data-theme="light"] .py-tool-pill.tool-excel {
    background: #dcfce7;
    color: #15803d;
    border-color: #bbf7d0;
  }
  [data-theme="light"] .py-tool-pill.tool-python {
    background: #fef3c7;
    color: #b45309;
    border-color: #fde68a;
    box-shadow: 0 0 10px rgba(245, 158, 11, 0.1);
  }
  [data-theme="light"] .py-tool-flag {
    background: #d97706;
    color: #ffffff;
  }
  [data-theme="light"] .py-matrix-highlight-row {
    background: #fffbeb !important;
  }
  [data-theme="light"] .py-matrix-highlight-row:hover {
    background: #fef3c7 !important;
  }
  [data-theme="light"] .py-matrix-role { color: #0f172a; font-weight: 700; }
  [data-theme="light"] .py-matrix-adv {
    color: #1e293b;
  }
  [data-theme="light"] .py-matrix-limit.limit-massive {
    background: #e0f2fe;
    color: #0369a1;
    border-color: #bae6fd;
  }
  [data-theme="light"] .py-matrix-limit.limit-small {
    background: #ffe4e6;
    color: #e11d48;
    border-color: #fecdd3;
  }
  [data-theme="light"] .py-matrix-limit.limit-large {
    background: #f3e8ff;
    color: #7e22ce;
    border-color: #e9d5ff;
  }

  /* Flexible auto-fit for cards when theory pane is squeezed by split-resizer */
  .py-sp-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)) !important;
    gap: 12px;
  }
  .py-mut-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)) !important;
    gap: 14px;
  }

  /* ══════════════════════════════════════════════════════════
     FROZEN (STICKY) COLUMNS FOR MASTER REFERENCE TABLE
     ══════════════════════════════════════════════════════════ */
  .slide-card,
  .slide-content,
  #slideBodyText,
  .slide-section {
    overflow-x: clip !important;
    max-width: 100% !important;
    box-sizing: border-box !important;
  }

  .db-mock-table-wrap {
    width: 100% !important;
    max-width: 100% !important;
    overflow-x: auto !important;
    overflow-y: hidden !important;
    overscroll-behavior-x: contain !important;
    overscroll-behavior-y: auto !important;
    -webkit-overflow-scrolling: touch !important;
    position: relative !important;
    display: block !important;
    border-radius: 10px !important;
    border: 1px solid rgba(255, 255, 255, 0.1) !important;
    background: #0c0e14 !important;
    box-sizing: border-box !important;
  }

  /* Fixed table layout for mathematical pixel alignment */
  .db-mock-table-wrap .db-table-mock.py-master-ref-table {
    table-layout: fixed !important;
    overflow: visible !important;
    border-radius: 0 !important;
    border-collapse: separate !important;
    border-spacing: 0 !important;
    width: 780px !important;
    min-width: 780px !important;
    max-width: 780px !important;
    background: #0c0e14 !important;
    margin: 0 !important;
  }

  /* Explicit column widths for fixed table layout */
  .py-master-ref-table th:nth-child(1),
  .py-master-ref-table td:nth-child(1) {
    width: 110px !important;
    min-width: 110px !important;
    max-width: 110px !important;
    box-sizing: border-box !important;
  }
  .py-master-ref-table th:nth-child(2),
  .py-master-ref-table td:nth-child(2) {
    width: 110px !important;
    min-width: 110px !important;
    max-width: 110px !important;
    box-sizing: border-box !important;
  }
  .py-master-ref-table th:nth-child(3),
  .py-master-ref-table td:nth-child(3) {
    width: 95px !important;
    min-width: 95px !important;
    max-width: 95px !important;
    box-sizing: border-box !important;
  }
  .py-master-ref-table th:nth-child(4),
  .py-master-ref-table td:nth-child(4) {
    width: 155px !important;
    min-width: 155px !important;
    max-width: 155px !important;
    box-sizing: border-box !important;
  }
  .py-master-ref-table th:nth-child(5),
  .py-master-ref-table td:nth-child(5) {
    width: 195px !important;
    min-width: 195px !important;
    max-width: 195px !important;
    box-sizing: border-box !important;
  }
  .py-master-ref-table th:nth-child(6),
  .py-master-ref-table td:nth-child(6) {
    width: 115px !important;
    min-width: 115px !important;
    max-width: 115px !important;
    box-sizing: border-box !important;
  }

  /* Prevent child elements in non-sticky cells from creating higher stacking contexts */
  .py-master-ref-table code,
  .py-master-ref-table .py-badge {
    position: static !important;
    z-index: 0 !important;
  }

  /* Non-sticky cells: solid background & lower z-index so they slide cleanly behind */
  .py-master-ref-table th:nth-child(n+3),
  .py-master-ref-table td:nth-child(n+3) {
    position: relative !important;
    z-index: 1 !important;
    background: #0c0e14 !important;
  }

  /* Column 1: Category (Sticky at Left 0) */
  .py-master-ref-table th:nth-child(1),
  .py-master-ref-table td:nth-child(1) {
    position: -webkit-sticky !important;
    position: sticky !important;
    left: 0 !important;
    z-index: 20 !important;
    white-space: nowrap !important;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
    background: #0f1422 !important;
  }

  /* Column 2: Data Type (Sticky at Left 110px) */
  .py-master-ref-table th:nth-child(2),
  .py-master-ref-table td:nth-child(2) {
    position: -webkit-sticky !important;
    position: sticky !important;
    left: 110px !important;
    z-index: 20 !important;
    white-space: nowrap !important;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
    border-right: 2px solid rgba(56, 189, 248, 0.45) !important;
    box-shadow: 6px 0 16px rgba(0, 0, 0, 0.65) !important;
    background: #0f1422 !important;
  }

  /* Sticky headers (z-index: 25) */
  .py-master-ref-table th:nth-child(1),
  .py-master-ref-table th:nth-child(2) {
    z-index: 25 !important;
    background: #141b2d !important;
    border-bottom: 2px solid rgba(255, 255, 255, 0.15) !important;
  }

  /* Row Hover Highlighting */
  .py-master-ref-table tbody tr:hover td:nth-child(1),
  .py-master-ref-table tbody tr:hover td:nth-child(2) {
    background: #182238 !important;
  }
  .py-master-ref-table tbody tr:hover td:nth-child(n+3) {
    background: #121622 !important;
  }

  /* ══════ LIGHT MODE THEME ADAPTATION ══════ */
  [data-theme="light"] .db-mock-table-wrap {
    border: 1px solid #e2e8f0 !important;
    background: #ffffff !important;
  }
  [data-theme="light"] .db-mock-table-wrap .db-table-mock.py-master-ref-table {
    background: #ffffff !important;
  }
  [data-theme="light"] .py-master-ref-table th:nth-child(n+3),
  [data-theme="light"] .py-master-ref-table td:nth-child(n+3) {
    background: #ffffff !important;
  }
  [data-theme="light"] .py-master-ref-table th:nth-child(1),
  [data-theme="light"] .py-master-ref-table th:nth-child(2) {
    background: #f1f5f9 !important;
    color: #0f172a !important;
    font-weight: 900 !important;
    border-bottom: 2px solid #cbd5e1 !important;
  }
  [data-theme="light"] .py-master-ref-table td:nth-child(1),
  [data-theme="light"] .py-master-ref-table td:nth-child(2) {
    background: #ffffff !important;
    color: #0f172a !important;
    font-weight: 800 !important;
    border-bottom: 1px solid #e2e8f0 !important;
  }
  [data-theme="light"] .py-master-ref-table th:nth-child(2),
  [data-theme="light"] .py-master-ref-table td:nth-child(2) {
    border-right: 2px solid #cbd5e1 !important;
    box-shadow: 6px 0 14px rgba(0, 0, 0, 0.08) !important;
  }
  [data-theme="light"] .py-master-ref-table tbody tr:hover td:nth-child(1),
  [data-theme="light"] .py-master-ref-table tbody tr:hover td:nth-child(2) {
    background: #f8fafc !important;
  }
  [data-theme="light"] .py-master-ref-table tbody tr:hover td:nth-child(n+3) {
    background: #f1f5f9 !important;
  }

  /* ══════════════════════════════════════════════════════════
     HOW PYTHON MANAGES MEMORY (UNDER THE HOOD) — VERTICAL FLOWCHART
     ACADEMIC TEXTBOOK COLOR SCIENCE ARCHITECTURE (LIGHT & DARK THEMES)
     ══════════════════════════════════════════════════════════ */
  .py-vfc-canvas {
    background: #090e1c;
    background-image: radial-gradient(circle, rgba(99, 102, 241, 0.16) 1.2px, transparent 1.2px);
    background-size: 20px 20px;
    border: 1.5px solid rgba(99, 102, 241, 0.3);
    border-radius: 18px;
    padding: 28px 24px;
    margin: 24px 0 16px 0;
    box-shadow: 0 16px 44px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.05);
    position: relative;
    overflow: hidden;
  }

  /* Flowchart Header */
  .py-vfc-header {
    text-align: center;
    margin-bottom: 24px;
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    position: relative;
  }
  .py-vfc-title-wrap {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 6px;
  }
  .py-vfc-logo {
    width: 36px;
    height: 36px;
    filter: drop-shadow(0 0 12px rgba(56, 189, 248, 0.45));
  }
  .py-vfc-main-title {
    margin: 0;
    font-size: 1.45rem;
    font-weight: 900;
    letter-spacing: -0.02em;
    color: #f8fafc;
    text-transform: uppercase;
  }
  .py-vfc-sub-title {
    margin: 0 0 14px 0;
    font-size: 0.88rem;
    font-weight: 700;
    color: #38bdf8;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  /* Header Meta: Breadcrumb + Sticky Note */
  .py-vfc-header-meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    flex-wrap: wrap;
    margin-top: 12px;
  }
  .py-vfc-pipeline-stepper,
  .py-vfc-breadcrumb {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 6px 12px;
    background: rgba(15, 23, 42, 0.85);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 12px;
    box-shadow: 0 8px 24px -4px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.05);
    max-width: 100%;
    overflow-x: auto;
    scrollbar-width: none;
    -webkit-overflow-scrolling: touch;
  }
  .py-vfc-pipeline-stepper::-webkit-scrollbar,
  .py-vfc-breadcrumb::-webkit-scrollbar {
    display: none;
  }
  .py-vfc-step {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 12px;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.06);
    font-size: 0.78rem;
    font-weight: 700;
    color: #cbd5e1;
    white-space: nowrap;
    transition: all 0.2s ease;
  }
  .py-vfc-step:hover {
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(255, 255, 255, 0.12);
  }
  .py-vfc-step-idx {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.68rem;
    font-weight: 800;
    padding: 1px 5px;
    border-radius: 4px;
    background: rgba(99, 102, 241, 0.18);
    border: 1px solid rgba(99, 102, 241, 0.3);
    color: #818cf8;
    line-height: 1.2;
  }
  .py-vfc-step-arrow {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #6366f1;
    opacity: 0.8;
    flex-shrink: 0;
  }
  .py-vfc-step-arrow svg {
    display: block;
  }
  .py-vfc-step.step-active {
    background: linear-gradient(135deg, rgba(56, 189, 248, 0.16) 0%, rgba(99, 102, 241, 0.2) 100%);
    border: 1px solid rgba(56, 189, 248, 0.45);
    color: #38bdf8;
    box-shadow: 0 2px 10px rgba(56, 189, 248, 0.15);
  }
  .py-vfc-step.step-active .py-vfc-step-idx {
    background: rgba(56, 189, 248, 0.2);
    border-color: rgba(56, 189, 248, 0.45);
    color: #38bdf8;
  }
  .py-vfc-breadcrumb-sep {
    color: #818cf8;
    font-weight: 900;
  }
  .py-vfc-breadcrumb span.highlight {
    color: #38bdf8;
    font-weight: 800;
  }
  
  

  /* ══════ VERTICAL FLOWCHART PIPELINE & CONNECTORS ══════ */
  .py-vfc-pipeline {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 780px;
    margin: 0 auto;
    width: 100%;
  }

  /* Vertical Flow Connector with Stem and Arrow Badge */
  .py-vfc-connector {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: -1px 0;
    position: relative;
    z-index: 1;
  }
  .py-vfc-stem {
    width: 2px;
    height: 14px;
    background: linear-gradient(180deg, rgba(99, 102, 241, 0.7), rgba(56, 189, 248, 0.85));
  }
  .py-vfc-arrow-badge {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: #0d1527;
    border: 1.5px solid #38bdf8;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 14px rgba(56, 189, 248, 0.35);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  .py-vfc-arrow-badge:hover {
    transform: scale(1.1);
    box-shadow: 0 0 20px rgba(56, 189, 248, 0.6);
  }
  .py-vfc-arrow-badge svg {
    filter: drop-shadow(0 0 4px rgba(56, 189, 248, 0.6));
  }

  /* Base Vertical Flowchart Node */
  .py-vfc-node {
    width: 100%;
    box-sizing: border-box;
    background: #0d1527;
    border: 1.5px solid rgba(255, 255, 255, 0.1);
    border-radius: 14px;
    padding: 16px 18px;
    box-shadow: 0 6px 22px rgba(0, 0, 0, 0.38);
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
    position: relative;
    z-index: 2;
  }
  .py-vfc-node:hover {
    box-shadow: 0 10px 28px rgba(99, 102, 241, 0.22);
  }

  /* Distinct Accent Borders per Node */
  .vnode-code { border-color: rgba(99, 102, 241, 0.5); }
  .vnode-objects { border-color: rgba(168, 85, 247, 0.5); }
  .vnode-ram { border-color: rgba(34, 197, 94, 0.55); }
  .vnode-pointers { border-color: rgba(56, 189, 248, 0.55); }
  .vnode-reuse { border-color: rgba(56, 189, 248, 0.45); }
  .vnode-mutable { border-color: rgba(34, 197, 94, 0.45); }
  .vnode-immutable { border-color: rgba(244, 63, 94, 0.45); }
  .vnode-mgmt { border-color: rgba(99, 102, 241, 0.45); }
  .vnode-summary { border-color: rgba(250, 204, 21, 0.5); }

  /* Node Header */
  .py-vfc-node-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 12px;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  }
  .py-vfc-node-title-group {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .py-vfc-step-num {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: #6366f1;
    color: #ffffff;
    font-size: 0.78rem;
    font-weight: 900;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    box-shadow: 0 2px 8px rgba(99, 102, 241, 0.4);
  }
  .py-vfc-node-title {
    font-size: 0.95rem;
    font-weight: 800;
    color: #f1f5f9;
    letter-spacing: -0.01em;
  }
  .py-vfc-stage-pill {
    font-size: 0.68rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    padding: 3px 10px;
    border-radius: 9999px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #94a3b8;
  }

  /* Node Inner Canvas Box (Dynamic Auto Height) */
  .py-vfc-canvas-box {
    background: #060a14;
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 10px;
    padding: 12px 14px;
    margin-bottom: 10px;
  }

  /* Node 1: Code Window */
  .py-vfc-code-block {
    font-family: var(--font-mono, monospace);
    font-size: 0.82rem;
    color: #e2e8f0;
    line-height: 1.6;
    background: transparent;
    margin: 0;
  }
  .py-vfc-code-line {
    display: flex;
    gap: 12px;
  }
  .py-vfc-line-num {
    color: #475569;
    user-select: none;
    font-size: 0.74rem;
    width: 16px;
    text-align: right;
  }
  .code-kw { color: #f472b6; }
  .code-str { color: #facc15; }
  .code-num { color: #4ade80; }
  .code-var { color: #38bdf8; }

  /* Node 2: Object Stack (Grid) */
  .py-vfc-obj-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 10px;
  }
  .py-vfc-obj-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    background: rgba(15, 23, 42, 0.75);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 8px;
    padding: 8px 12px;
  }
  .py-vfc-val-pill {
    font-family: var(--font-mono, monospace);
    font-size: 0.78rem;
    font-weight: 700;
    padding: 3px 10px;
    border-radius: 5px;
    letter-spacing: 0.02em;
  }
  .pill-green {
    background: rgba(34, 197, 94, 0.18);
    border: 1px solid #22c55e;
    color: #4ade80;
  }
  .pill-amber {
    background: rgba(245, 158, 11, 0.18);
    border: 1px solid #f59e0b;
    color: #fbbf24;
  }
  .pill-purple {
    background: rgba(168, 85, 247, 0.18);
    border: 1px solid #a855f7;
    color: #c084fc;
  }
  .py-vfc-obj-label {
    font-size: 0.72rem;
    color: #94a3b8;
    font-weight: 600;
  }

  /* Node 3: System RAM Architecture */
  .py-vfc-ram-wrap {
    border: 1.5px solid #22c55e;
    border-radius: 10px;
    background: rgba(34, 197, 94, 0.03);
    padding: 10px 12px;
  }
  .py-vfc-ram-tag {
    font-size: 0.72rem;
    font-weight: 800;
    color: #22c55e;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .py-vfc-ram-sections {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .py-vfc-code-area {
    background: rgba(15, 23, 42, 0.85);
    border: 1px dashed rgba(255, 255, 255, 0.15);
    border-radius: 6px;
    padding: 6px 10px;
    font-size: 0.72rem;
    color: #94a3b8;
  }
  .py-vfc-heap-area {
    background: rgba(15, 23, 42, 0.95);
    border: 1px solid rgba(34, 197, 94, 0.35);
    border-radius: 6px;
    padding: 8px 10px;
  }
  .py-vfc-heap-title {
    font-size: 0.72rem;
    font-weight: 800;
    color: #86efac;
    margin-bottom: 6px;
    display: flex;
    justify-content: space-between;
  }
  .py-vfc-heap-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.72rem;
  }
  .py-vfc-heap-table th {
    text-align: left;
    color: #64748b;
    font-weight: 700;
    font-size: 0.65rem;
    text-transform: uppercase;
    padding: 3px 6px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }
  .py-vfc-heap-table td {
    padding: 5px 6px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  }
  .py-vfc-heap-table tr:last-child td {
    border-bottom: none;
  }
  .py-vfc-hex {
    font-family: var(--font-mono, monospace);
    font-size: 0.72rem;
    color: #38bdf8;
    background: rgba(56, 189, 248, 0.1);
    padding: 2px 6px;
    border-radius: 4px;
    display: inline-block;
  }
  .py-vfc-type-dim {
    font-size: 0.68rem;
    color: #64748b;
  }

  /* Node 4: Pointer List */
  .py-vfc-pointer-list {
    display: flex;
    flex-direction: column;
    gap: 7px;
  }
  .py-vfc-ptr-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    background: rgba(15, 23, 42, 0.75);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 8px;
    padding: 6px 12px;
  }
  .py-vfc-var-label {
    font-family: var(--font-mono, monospace);
    font-size: 0.78rem;
    font-weight: 800;
    color: #38bdf8;
    background: rgba(56, 189, 248, 0.12);
    border: 1px solid rgba(56, 189, 248, 0.3);
    padding: 2px 8px;
    border-radius: 4px;
  }
  .py-vfc-ptr-arrow {
    color: #818cf8;
    font-weight: 900;
    font-size: 0.78rem;
  }

  /* Node Footer Text */
  .py-vfc-node-footer {
    font-size: 0.76rem;
    color: #94a3b8;
    line-height: 1.45;
  }
  .py-vfc-node-footer strong {
    color: #e2e8f0;
  }

  /* ══════ FLOWCHART TRANSITION BRIDGE BANNER ══════ */
  .py-vfc-bridge {
    width: 100%;
    box-sizing: border-box;
    text-align: center;
    margin: 0;
    padding: 14px 18px;
    background: #0f172a;
    border: 1px solid rgba(99, 102, 241, 0.35);
    border-radius: 14px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
    position: relative;
    z-index: 2;
  }
  .py-vfc-bridge-title {
    font-size: 0.82rem;
    font-weight: 800;
    color: #a5b4fc;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
  .py-vfc-bridge-pills {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    flex-wrap: wrap;
    font-size: 0.76rem;
    font-weight: 700;
  }
  .bridge-pill {
    padding: 4px 12px;
    border-radius: 9999px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: #e2e8f0;
  }
  .bridge-sep {
    color: #6366f1;
    font-weight: 900;
  }

  /* Node 5: Fork Diagram */
  .py-vfc-fork-diagram {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    width: 100%;
    padding: 8px 0;
  }
  .py-vfc-fork-vars {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .py-vfc-fork-arrows {
    font-size: 1.3rem;
    color: #818cf8;
    font-weight: 900;
    line-height: 1;
  }

  /* Node 8: Memory Management 3-Card Grid */
  .py-vfc-cycle-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
    gap: 10px;
  }
  .py-vfc-cycle-item {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    background: rgba(15, 23, 42, 0.75);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 8px;
    padding: 10px 12px;
  }
  .py-vfc-cycle-icon {
    font-size: 1.15rem;
    flex-shrink: 0;
    margin-top: 1px;
  }
  .py-vfc-cycle-text {
    font-size: 0.72rem;
    line-height: 1.4;
    color: #cbd5e1;
  }
  .py-vfc-cycle-text strong {
    color: #f8fafc;
    font-size: 0.76rem;
  }

  /* Node 9: Summary & Gold Card */
  .py-vfc-legend-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 8px;
    margin-bottom: 12px;
  }
  .py-vfc-legend-item {
    font-size: 0.74rem;
    color: #cbd5e1;
    display: flex;
    align-items: center;
    gap: 8px;
    background: rgba(15, 23, 42, 0.75);
    padding: 6px 10px;
    border-radius: 6px;
    border: 1px solid rgba(255, 255, 255, 0.06);
  }
  .py-vfc-gold-card {
    background: linear-gradient(135deg, #fef08a 0%, #facc15 100%);
    border: 1px solid #eab308;
    border-radius: 10px;
    padding: 12px 16px;
    text-align: center;
    color: #713f12;
    font-size: 0.84rem;
    font-weight: 800;
    box-shadow: 0 4px 16px rgba(250, 204, 21, 0.25);
  }
  .py-vfc-footer-ribbon {
    margin-top: 10px;
    text-align: center;
    font-size: 0.78rem;
    font-weight: 700;
    color: #94a3b8;
    letter-spacing: 0.02em;
  }

  /* ══════════════════════════════════════════════════════════
     LIGHT MODE THEME ADAPTATION — ACADEMIC TEXTBOOK COLOR SCIENCE
     BRIGHT, HIGH-VISIBILITY, SATURATED JEWEL TONES (100% CLEAN CONTRAST)
     ══════════════════════════════════════════════════════════ */
  [data-theme="light"] .py-vfc-canvas {
    background: #ffffff !important;
    background-image: radial-gradient(circle, rgba(37, 99, 235, 0.1) 1.2px, transparent 1.2px) !important;
    border: 2px solid #cbd5e1 !important;
    box-shadow: 0 10px 32px rgba(15, 23, 42, 0.06) !important;
  }
  [data-theme="light"] .py-vfc-header {
    border-bottom: 1.5px solid #e2e8f0 !important;
  }
  [data-theme="light"] .py-vfc-main-title {
    color: #0f172a !important;
  }
  [data-theme="light"] .py-vfc-sub-title {
    color: #1d4ed8 !important;
    font-weight: 800 !important;
  }
  [data-theme="light"] .py-vfc-pipeline-stepper,
  [data-theme="light"] .py-vfc-breadcrumb {
    background: #ffffff !important;
    border: 1px solid #e2e8f0 !important;
    box-shadow: 0 4px 16px -2px rgba(0, 0, 0, 0.05) !important;
  }
  [data-theme="light"] .py-vfc-step {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    color: #334155;
  }
  [data-theme="light"] .py-vfc-step:hover {
    background: #f1f5f9;
    border-color: #cbd5e1;
  }
  [data-theme="light"] .py-vfc-step-idx {
    background: #e0e7ff;
    border-color: #c7d2fe;
    color: #4338ca;
  }
  [data-theme="light"] .py-vfc-step-arrow {
    color: #3b82f6;
    opacity: 0.9;
  }
  [data-theme="light"] .py-vfc-step.step-active {
    background: linear-gradient(135deg, #eff6ff 0%, #e0e7ff 100%);
    border: 1px solid #93c5fd;
    color: #1d4ed8;
    box-shadow: 0 2px 8px rgba(37, 99, 235, 0.12);
  }
  [data-theme="light"] .py-vfc-step.step-active .py-vfc-step-idx {
    background: #dbeafe;
    border-color: #93c5fd;
    color: #1d4ed8;
  }
  [data-theme="light"] .py-vfc-breadcrumb-sep {
    color: #2563eb !important;
    font-weight: 900 !important;
  }
  [data-theme="light"] .py-vfc-breadcrumb span.highlight {
    color: #1d4ed8 !important;
    font-weight: 900 !important;
  }
  

  /* Nodes in Light Mode */
  [data-theme="light"] .py-vfc-node {
    background: #ffffff !important;
    border: 1.5px solid #cbd5e1 !important;
    box-shadow: 0 4px 16px rgba(15, 23, 42, 0.05) !important;
    position: relative !important;
    z-index: 2 !important;
  }
  [data-theme="light"] .py-vfc-node:hover {
    box-shadow: 0 10px 24px rgba(37, 99, 235, 0.12) !important;
  }
  [data-theme="light"] .vnode-code { border-color: #3b82f6 !important; }
  [data-theme="light"] .vnode-objects { border-color: #a855f7 !important; }
  [data-theme="light"] .vnode-ram { border-color: #16a34a !important; }
  [data-theme="light"] .vnode-pointers { border-color: #0284c7 !important; }
  [data-theme="light"] .vnode-reuse { border-color: #0284c7 !important; }
  [data-theme="light"] .vnode-mutable { border-color: #16a34a !important; }
  [data-theme="light"] .vnode-immutable { border-color: #e11d48 !important; }
  [data-theme="light"] .vnode-mgmt { border-color: #6366f1 !important; }
  [data-theme="light"] .vnode-summary { border-color: #ca8a04 !important; }

  [data-theme="light"] .py-vfc-node-header {
    border-bottom: 1.5px solid #f1f5f9 !important;
  }
  [data-theme="light"] .py-vfc-node-title {
    color: #0f172a !important;
    font-weight: 900 !important;
  }
  [data-theme="light"] .py-vfc-stage-pill {
    background: #eff6ff !important;
    border: 1.5px solid #bfdbfe !important;
    color: #1d4ed8 !important;
    font-weight: 800 !important;
  }

  /* Flowchart Arrow Connectors in Light Mode */
  [data-theme="light"] .py-vfc-stem {
    background: linear-gradient(180deg, #60a5fa, #1d4ed8) !important;
    width: 2px !important;
  }
  [data-theme="light"] .py-vfc-arrow-badge {
    background: #ffffff !important;
    border: 2px solid #2563eb !important;
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25) !important;
  }
  [data-theme="light"] .py-vfc-arrow-badge svg path {
    stroke: #1d4ed8 !important;
    stroke-width: 3 !important;
  }

  /* Inner Canvas Box in Light Mode */
  [data-theme="light"] .py-vfc-canvas-box {
    background: #f8fafc !important;
    border: 1.5px solid #e2e8f0 !important;
  }

  /* Syntax Highlighting in Light Mode — Bright & High Contrast */
  [data-theme="light"] .py-vfc-code-block {
    color: #0f172a !important;
    font-weight: 600 !important;
  }
  [data-theme="light"] .py-vfc-code-block .code-var {
    color: #0284c7 !important;
    font-weight: 700 !important;
  }
  [data-theme="light"] .py-vfc-code-block .code-num {
    color: #15803d !important;
    font-weight: 800 !important;
  }
  [data-theme="light"] .py-vfc-code-block .code-str {
    color: #c2410c !important;
    font-weight: 700 !important;
  }
  [data-theme="light"] .py-vfc-code-block .code-kw {
    color: #be123c !important;
    font-weight: 800 !important;
  }
  [data-theme="light"] .py-vfc-line-num {
    color: #64748b !important;
    font-weight: 700 !important;
  }

  /* Object Pills in Light Mode — Saturated High Visibility */
  [data-theme="light"] .py-vfc-obj-item {
    background: #ffffff !important;
    border: 1.5px solid #cbd5e1 !important;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03) !important;
  }
  [data-theme="light"] .pill-green {
    background: #f0fdf4 !important;
    border: 1.5px solid #86efac !important;
    color: #15803d !important;
    font-weight: 800 !important;
  }
  [data-theme="light"] .pill-amber {
    background: #fefce8 !important;
    border: 1.5px solid #fde047 !important;
    color: #b45309 !important;
    font-weight: 800 !important;
  }
  [data-theme="light"] .pill-purple {
    background: #faf5ff !important;
    border: 1.5px solid #d8b4fe !important;
    color: #7e22ce !important;
    font-weight: 800 !important;
  }
  [data-theme="light"] .py-vfc-obj-label {
    color: #0f172a !important;
    font-weight: 700 !important;
  }

  /* System RAM in Light Mode */
  [data-theme="light"] .py-vfc-ram-wrap {
    background: #f0fdf4 !important;
    border: 2px solid #22c55e !important;
  }
  [data-theme="light"] .py-vfc-ram-tag {
    color: #15803d !important;
    font-weight: 900 !important;
  }
  [data-theme="light"] .py-vfc-code-area {
    background: #ffffff !important;
    border: 1.5px dashed #cbd5e1 !important;
    color: #0f172a !important;
    font-weight: 600 !important;
  }
  [data-theme="light"] .py-vfc-heap-area {
    background: #ffffff !important;
    border: 1.5px solid #86efac !important;
  }
  [data-theme="light"] .py-vfc-heap-title {
    color: #15803d !important;
    font-weight: 900 !important;
  }
  [data-theme="light"] .py-vfc-heap-table th {
    color: #0f172a !important;
    font-weight: 800 !important;
    border-bottom: 2px solid #cbd5e1 !important;
  }
  [data-theme="light"] .py-vfc-heap-table td {
    color: #0f172a !important;
    border-bottom: 1px solid #e2e8f0 !important;
  }

  /* Monospace Hex Address Pills in Light Mode — Bright Cobalt */
  [data-theme="light"] .py-vfc-hex {
    background: #eff6ff !important;
    border: 1.5px solid #93c5fd !important;
    color: #1d4ed8 !important;
    font-weight: 800 !important;
  }
  [data-theme="light"] .py-vfc-type-dim {
    color: #334155 !important;
    font-weight: 700 !important;
  }

  /* Pointer Rows in Light Mode */
  [data-theme="light"] .py-vfc-ptr-row {
    background: #ffffff !important;
    border: 1.5px solid #cbd5e1 !important;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03) !important;
  }
  [data-theme="light"] .py-vfc-var-label {
    background: #eff6ff !important;
    border: 1.5px solid #93c5fd !important;
    color: #1d4ed8 !important;
    font-weight: 800 !important;
  }
  [data-theme="light"] .py-vfc-ptr-arrow {
    color: #2563eb !important;
    font-weight: 900 !important;
  }

  /* Flowchart Milestone Bridge in Light Mode */
  [data-theme="light"] .py-vfc-bridge {
    background: #f8fafc !important;
    border: 2px solid #6366f1 !important;
    box-shadow: 0 4px 16px rgba(99, 102, 241, 0.12) !important;
    position: relative !important;
    z-index: 2 !important;
    margin: 0 !important;
  }
  [data-theme="light"] .py-vfc-bridge-title {
    color: #4338ca !important;
    font-weight: 900 !important;
  }
  [data-theme="light"] .bridge-pill {
    background: #ffffff !important;
    border: 1.5px solid #cbd5e1 !important;
    color: #0f172a !important;
    font-weight: 800 !important;
  }
  [data-theme="light"] .bridge-sep {
    color: #4f46e5 !important;
    font-weight: 900 !important;
  }

  /* Fork Diagram in Light Mode */
  [data-theme="light"] .py-vfc-fork-arrows {
    color: #2563eb !important;
  }

  /* Memory Management 3-Card Grid in Light Mode */
  [data-theme="light"] .py-vfc-cycle-item {
    background: #ffffff !important;
    border: 1.5px solid #cbd5e1 !important;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03) !important;
  }
  [data-theme="light"] .py-vfc-cycle-text {
    color: #1e293b !important;
    font-size: 0.74rem !important;
    font-weight: 500 !important;
  }
  [data-theme="light"] .py-vfc-cycle-text strong {
    color: #0f172a !important;
    font-weight: 900 !important;
    font-size: 0.80rem !important;
  }

  /* Summary Legend in Light Mode */
  [data-theme="light"] .py-vfc-legend-item {
    background: #ffffff !important;
    border: 1.5px solid #cbd5e1 !important;
    color: #0f172a !important;
    font-weight: 700 !important;
  }
  [data-theme="light"] .py-vfc-gold-card {
    background: linear-gradient(135deg, #fef08a 0%, #facc15 100%) !important;
    border: 2px solid #ca8a04 !important;
    color: #713f12 !important;
    font-weight: 900 !important;
    font-size: 0.88rem !important;
    box-shadow: 0 4px 16px rgba(202, 138, 4, 0.25) !important;
  }
  [data-theme="light"] .py-vfc-footer-ribbon {
    color: #1e293b !important;
    font-weight: 800 !important;
  }

  /* Node Footers in Light Mode — Crisp High Legibility */
  [data-theme="light"] .py-vfc-node-footer {
    color: #1e293b !important;
    font-weight: 500 !important;
    line-height: 1.55 !important;
  }
  [data-theme="light"] .py-vfc-node-footer strong {
    color: #0f172a !important;
    font-weight: 900 !important;
  }
  [data-theme="light"] .py-vfc-node-footer code {
    background: #eff6ff !important;
    color: #1d4ed8 !important;
    border: 1px solid #bfdbfe !important;
    padding: 1px 6px !important;
    border-radius: 4px !important;
    font-weight: 800 !important;
  }




  /* ══════════════════════════════════════════════════════════
     PRODUCTION DATA TRAP CARD (SHARED MUTABLE REFERENCES)
     ══════════════════════════════════════════════════════════ */
  .py-analyst-trap-card {
    background: linear-gradient(145deg, rgba(20, 27, 45, 0.95) 0%, rgba(13, 19, 33, 0.98) 100%);
    border: 1.5px solid rgba(244, 63, 94, 0.4);
    border-radius: 12px;
    padding: 16px 18px;
    margin-top: 14px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
    width: 100%;
    box-sizing: border-box;
  }
  .py-trap-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 10px;
    flex-wrap: wrap;
  }
  .py-trap-badge {
    background: rgba(244, 63, 94, 0.2);
    border: 1px solid #f43f5e;
    color: #fb7185;
    font-family: var(--font-mono, monospace);
    font-size: 0.68rem;
    font-weight: 800;
    padding: 2px 8px;
    border-radius: 4px;
    letter-spacing: 0.05em;
  }
  .py-trap-title {
    margin: 0;
    font-size: 0.88rem;
    font-weight: 800;
    color: #f1f5f9;
    letter-spacing: -0.01em;
  }
  .py-trap-text {
    font-size: 0.76rem;
    color: #cbd5e1;
    line-height: 1.5;
    margin: 0 0 12px 0;
  }
  .py-trap-text strong {
    color: #f8fafc;
  }
  .py-trap-code-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
  }
  @media (max-width: 640px) {
    .py-trap-code-grid {
      grid-template-columns: 1fr;
    }
  }
  .py-trap-box {
    border-radius: 8px;
    padding: 10px 12px;
  }
  .trap-danger {
    background: rgba(244, 63, 94, 0.08);
    border: 1px solid rgba(244, 63, 94, 0.35);
  }
  .trap-solution {
    background: rgba(34, 197, 94, 0.08);
    border: 1px solid rgba(34, 197, 94, 0.35);
  }
  .py-trap-box-label {
    font-size: 0.72rem;
    font-weight: 800;
    margin-bottom: 6px;
  }
  .trap-danger .py-trap-box-label { color: #fb7185; }
  .trap-solution .py-trap-box-label { color: #4ade80; }
  .py-trap-box pre {
    margin: 0;
    background: transparent;
    font-family: var(--font-mono, monospace);
    font-size: 0.76rem;
    color: #e2e8f0;
    line-height: 1.5;
  }

  /* Live Terminal Tip in Flowchart */
  .py-fc-live-tip {
    margin-top: 10px;
    background: rgba(56, 189, 248, 0.08);
    border: 1px dashed rgba(56, 189, 248, 0.4);
    border-radius: 8px;
    padding: 8px 12px;
    display: flex;
    align-items: flex-start;
    gap: 8px;
  }
  .py-fc-tip-icon {
    font-size: 1rem;
    flex-shrink: 0;
    margin-top: 1px;
  }
  .py-fc-tip-text {
    font-size: 0.72rem;
    line-height: 1.45;
    color: #cbd5e1;
  }
  .py-fc-tip-text strong {
    color: #38bdf8;
  }
  .py-fc-tip-text code {
    font-family: var(--font-mono, monospace);
    background: rgba(0, 0, 0, 0.4);
    color: #4ade80;
    padding: 1px 5px;
    border-radius: 4px;
    font-size: 0.70rem;
  }

  /* Mobile Swipe Pill for Master Reference Table */
  .py-table-mobile-hint {
    display: none;
    align-items: center;
    justify-content: flex-end;
    gap: 6px;
    font-size: 0.70rem;
    font-weight: 700;
    color: #38bdf8;
    margin-bottom: 6px;
  }
  @media (max-width: 768px) {
    .py-table-mobile-hint {
      display: flex;
    }
  }

  /* Interactive Hover Linkage for Pointer Rows */
  .py-vfc-ptr-row {
    transition: all 0.2s ease !important;
    cursor: default;
  }
  .py-vfc-ptr-row:hover {
    transform: translateX(4px);
    border-color: rgba(56, 189, 248, 0.5) !important;
    background: rgba(15, 23, 42, 0.95) !important;
    box-shadow: 0 4px 14px rgba(56, 189, 248, 0.15) !important;
  }
  .py-vfc-ptr-row:hover .py-vfc-ptr-arrow {
    transform: scale(1.15);
    color: #38bdf8 !important;
  }

  /* ═══ LIGHT MODE THEME ADAPTATION FOR NEW ELEMENTS ═══ */
  [data-theme="light"] .py-analyst-trap-card {
    background: #ffffff !important;
    border: 1.5px solid #fecdd3 !important;
    box-shadow: 0 4px 16px rgba(225, 29, 72, 0.06) !important;
    width: 100% !important;
    box-sizing: border-box !important;
  }
  [data-theme="light"] .py-trap-badge {
    background: #ffe4e6 !important;
    border-color: #fda4af !important;
    color: #be123c !important;
  }
  [data-theme="light"] .py-trap-title {
    color: #0f172a !important;
  }
  [data-theme="light"] .py-trap-text {
    color: #1e293b !important;
  }
  [data-theme="light"] .py-trap-text strong {
    color: #0f172a !important;
  }
  [data-theme="light"] .trap-danger {
    background: #fff1f2 !important;
    border-color: #fecdd3 !important;
  }
  [data-theme="light"] .trap-danger .py-trap-box-label {
    color: #be123c !important;
  }
  [data-theme="light"] .trap-solution {
    background: #f0fdf4 !important;
    border-color: #bbf7d0 !important;
  }
  [data-theme="light"] .trap-solution .py-trap-box-label {
    color: #15803d !important;
  }
  [data-theme="light"] .py-trap-box pre {
    color: #0f172a !important;
  }
  [data-theme="light"] .py-trap-box pre .code-comment {
    color: #047857 !important;
  }
  [data-theme="light"] .py-fc-live-tip {
    background: #f0f9ff !important;
    border-color: #93c5fd !important;
  }
  [data-theme="light"] .py-fc-tip-text {
    color: #1e293b !important;
  }
  [data-theme="light"] .py-fc-tip-text strong {
    color: #0284c7 !important;
  }
  [data-theme="light"] .py-fc-tip-text code {
    background: #e0f2fe !important;
    color: #0369a1 !important;
    border: 1px solid #bae6fd !important;
  }
  [data-theme="light"] .py-table-mobile-hint {
    color: #0284c7;
  }
  [data-theme="light"] .py-vfc-ptr-row:hover {
    background: #f0f9ff !important;
    border-color: #38bdf8 !important;
    box-shadow: 0 4px 12px rgba(2, 132, 199, 0.12) !important;
  }
  [data-theme="light"] .py-vfc-ptr-row:hover .py-vfc-ptr-arrow {
    color: #0284c7 !important;
  }

  /* ═══════════════════════════════════════════════════════════════
     THEORY NARRATION PLAYBACK ISOLATION & SPOTLIGHTS (SQL Day 02 Parity)
     ═══════════════════════════════════════════════════════════════ */
  .stunning-section-entry {
    animation: stunningSectionPop 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards !important;
    will-change: opacity, transform !important;
  }
  @keyframes stunningSectionPop {
    0% {
      opacity: 0;
      transform: translateY(16px) scale(0.98);
      filter: blur(3px);
    }
    60% {
      opacity: 0.95;
      transform: translateY(-2px) scale(1.005);
      filter: blur(0px);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
      filter: blur(0px);
    }
  }
  .instant-display {
    animation: none !important;
    transition: none !important;
    opacity: 1 !important;
    transform: none !important;
    filter: none !important;
  }

  /* Playback Active: Inactive sections are dimmed and non-distracting */
  .playback-active .slide-section.section-hidden {
    opacity: 0.18 !important;
    filter: blur(0.4px) !important;
    pointer-events: none !important;
    transition: opacity 0.35s ease, filter 0.35s ease !important;
  }

  /* Card Spotlight Glow */
  .py-sp-card.card-active-spotlight,
  .py-sp-ai-banner.card-active-spotlight,
  .py-mut-panel.card-active-spotlight,
  .py-analyst-trap-card.card-active-spotlight,
  .py-vfc-node.card-active-spotlight,
  .card-active-spotlight {
    transform: scale(1.025) translateY(-3px) !important;
    border-color: #38bdf8 !important;
    background: rgba(14, 165, 233, 0.12) !important;
    box-shadow: 0 10px 28px -4px rgba(56, 189, 248, 0.35), 0 0 0 2px rgba(56, 189, 248, 0.7) !important;
    z-index: 5 !important;
    transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1) !important;
  }

  [data-theme="light"] .py-sp-card.card-active-spotlight,
  [data-theme="light"] .py-sp-ai-banner.card-active-spotlight,
  [data-theme="light"] .py-mut-panel.card-active-spotlight,
  [data-theme="light"] .py-analyst-trap-card.card-active-spotlight,
  [data-theme="light"] .py-vfc-node.card-active-spotlight,
  [data-theme="light"] .card-active-spotlight {
    border-color: #0284c7 !important;
    background: #f0f9ff !important;
    box-shadow: 0 10px 24px -4px rgba(2, 132, 199, 0.28), 0 0 0 2px #0284c7 !important;
  }

  /* Table Row Active Spotlight */
  .py-matrix-table tr.row-active-spotlight,
  .py-master-ref-table tr.row-active-spotlight,
  table tr.row-active-spotlight {
    background: rgba(59, 130, 246, 0.18) !important;
    border-left: 4px solid #38bdf8 !important;
    box-shadow: inset 0 0 12px rgba(56, 189, 248, 0.15) !important;
    transition: background 0.25s ease, border-color 0.25s ease !important;
  }
  .py-matrix-table tr.row-active-spotlight td,
  .py-master-ref-table tr.row-active-spotlight td,
  table tr.row-active-spotlight td {
    color: #f8fafc !important;
    font-weight: 600 !important;
  }

  [data-theme="light"] .py-matrix-table tr.row-active-spotlight,
  [data-theme="light"] .py-master-ref-table tr.row-active-spotlight,
  [data-theme="light"] table tr.row-active-spotlight {
    background: rgba(2, 132, 199, 0.12) !important;
    border-left: 4px solid #0284c7 !important;
  }
  [data-theme="light"] .py-matrix-table tr.row-active-spotlight td,
  [data-theme="light"] .py-master-ref-table tr.row-active-spotlight td,
  [data-theme="light"] table tr.row-active-spotlight td {
    color: #0f172a !important;
  }

  /* ══════════════════════════════════════════════════════════
     WORLD-CLASS INTERACTIVE & VISUAL ENHANCEMENTS (10/10 UX)
     ══════════════════════════════════════════════════════════ */

  /* 1. Dynamic Table Row Spotlight & Hover FX */
  .py-master-ref-table tbody tr,
  .py-matrix-table tbody tr {
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1) !important;
    cursor: pointer;
  }
  .py-master-ref-table tbody tr:hover,
  .py-matrix-table tbody tr:hover {
    background: rgba(56, 189, 248, 0.08) !important;
    transform: translateX(4px);
    box-shadow: inset 3px 0 0 #38bdf8 !important;
  }
  [data-theme="light"] .py-master-ref-table tbody tr:hover,
  [data-theme="light"] .py-matrix-table tbody tr:hover {
    background: #f0f9ff !important;
    box-shadow: inset 3px 0 0 #0284c7 !important;
  }

  /* 2. Top Gradient Accent Lines & Hover Micro-Elevation */
  .py-sp-card,
  .py-mut-showcase,
  .py-matrix-showcase,
  .py-analyst-trap-card,
  .py-vfc-canvas {
    position: relative !important;
    overflow: hidden !important;
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease !important;
  }
  .py-sp-card::before,
  .py-mut-showcase::before,
  .py-matrix-showcase::before,
  .py-analyst-trap-card::before,
  .py-vfc-canvas::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #38bdf8 0%, #818cf8 50%, #34d399 100%);
    opacity: 0.85;
    z-index: 2;
  }
  .py-sp-card:hover {
    transform: translateY(-3px) !important;
    box-shadow: 0 12px 28px -6px rgba(0, 0, 0, 0.4), 0 0 16px rgba(56, 189, 248, 0.15) !important;
    border-color: rgba(56, 189, 248, 0.4) !important;
  }
  [data-theme="light"] .py-sp-card:hover {
    transform: translateY(-3px) !important;
    box-shadow: 0 12px 24px -4px rgba(0, 0, 0, 0.08), 0 0 12px rgba(2, 132, 199, 0.12) !important;
    border-color: #0284c7 !important;
  }

  /* 3. Code Card Micro-Glow & Typography Polish */
  .py-trap-box pre,
  .py-code-box {
    transition: border-color 0.3s ease, box-shadow 0.3s ease !important;
  }
  .py-trap-box pre:hover,
  .py-code-box:hover {
    border-color: rgba(56, 189, 248, 0.4) !important;
    box-shadow: 0 4px 16px rgba(56, 189, 248, 0.12) !important;
  }
  [data-theme="light"] .py-trap-box pre:hover,
  [data-theme="light"] .py-code-box:hover {
    border-color: #0284c7 !important;
    box-shadow: 0 4px 16px rgba(2, 132, 199, 0.12) !important;
  }

  /* Heading & Block Active Spotlight */
  .heading-box-wrap.narration-spotlight-active,
  .narration-spotlight-active {
    border-color: #38bdf8 !important;
    box-shadow: 0 0 16px rgba(56, 189, 248, 0.3) !important;
    transition: all 0.3s ease !important;
  }

</style>

<!-- ═══ SECTION 1: 01. Why Python for Data Analysis? ═══ -->
<div class="slide-section" id="day01WhyPythonSection">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingWhyPython">
    <span class="heading-num-box">01</span>
    <span class="heading-title-box">
      <span class="heading-title-text"><span class="heading-icon">🐍</span> Python in Modern Data Analytics</span>
      <button class="audio-play-btn" onclick="playAudio('Day01/New_PyDay01Audio01.mp3', this)" title="Play narration">
        <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
      </button>
    </span>
  </h2>
  <p><strong>Python</strong> is a high-level, interpreted programming language known for its clean syntax and readability. Created by Guido van Rossum in 1991, Python emphasizes code simplicity, enabling developers and analysts to express complex logic in fewer lines of code than traditional languages like C++ or Java.</p>

  <!-- 🎯 Why Data Analysts Need Python Card -->
  <div class="py-sp-showcase">
    <!-- Header -->
    <div class="py-sp-header">
      <div class="py-sp-title-row">
        <div class="py-sp-header-icon">🎯</div>
        <h3 class="py-sp-title">Why Data Analysts Need Python?</h3>
      </div>
    </div>

    <!-- 2x2 Core Superpowers Grid -->
    <div class="py-sp-grid">
      <!-- 01 Massive Datasets -->
      <div class="py-sp-card sp-blue">
        <div>
          <div class="py-sp-card-top">
            <div class="py-sp-card-header">
              <div class="py-sp-icon">📈</div>
              <div class="py-sp-card-title">Handling Massive Datasets</div>
            </div>
            <span class="py-sp-num">01</span>
          </div>
          <p class="py-sp-desc">Excel crashes or locks up on sheets with ~1M rows. Python processes millions of rows in seconds without memory bottlenecks.</p>
        </div>
        <div class="py-sp-tag">⚡ Beyond 1M-Row Limits</div>
      </div>

      <!-- 02 Automates Workflows -->
      <div class="py-sp-card sp-green">
        <div>
          <div class="py-sp-card-top">
            <div class="py-sp-card-header">
              <div class="py-sp-icon">🤖</div>
              <div class="py-sp-card-title">Automating Repetitive Workflows</div>
            </div>
            <span class="py-sp-num">02</span>
          </div>
          <p class="py-sp-desc">Write an end-to-end script once to clean pipelines, refresh weekly dashboards, and email stakeholders automatically.</p>
        </div>
        <div class="py-sp-tag">⏱️ Hours of Work → 1 Click</div>
      </div>

      <!-- 03 Cleans Messy Data -->
      <div class="py-sp-card sp-amber">
        <div>
          <div class="py-sp-card-top">
            <div class="py-sp-card-header">
              <div class="py-sp-icon">🧹</div>
              <div class="py-sp-card-title">DATA SANITIZATION</div>
            </div>
            <span class="py-sp-num">03</span>
          </div>
          <p class="py-sp-desc">Effortlessly impute missing values, standardize inconsistent date formats, and ingest messy text, CSV, or API payloads.</p>
        </div>
        <div class="py-sp-tag">🧼 Automated Prep</div>
      </div>

      <!-- 04 Advanced Visualizations -->
      <div class="py-sp-card sp-purple">
        <div>
          <div class="py-sp-card-top">
            <div class="py-sp-card-header">
              <div class="py-sp-icon">📊</div>
              <div class="py-sp-card-title">ADVANCED VISUALIZATIONS</div>
            </div>
            <span class="py-sp-num">04</span>
          </div>
          <p class="py-sp-desc">Move beyond generic bar charts. Build interactive heatmaps, distribution plots, and executive-ready visual stories.</p>
        </div>
        <div class="py-sp-tag">🎨 Publication Quality</div>
      </div>
    </div>

    <!-- 05 AI Flagship Showcase Banner -->
    <div class="py-sp-ai-banner">
      <div class="py-sp-ai-icon">✨</div>
      <div class="py-sp-ai-body">
        <div class="py-sp-ai-title-row">
          <span class="py-sp-ai-title">05. GATEWAY TO AI &amp; MACHINE LEARNING</span>
          <span class="py-sp-ai-pill">🔮 High-Value Skill</span>
        </div>
        <p class="py-sp-ai-text">
          Predict future trends, customer churn, and revenue demand using machine learning libraries like 
          <span class="py-sp-code-pill">scikit-learn</span> and 
          <span class="py-sp-code-pill">statsmodels</span>.
        </p>
      </div>
    </div>
  </div>
</div>

  <!-- 🤝 Tool Matrix: Where Python Fits In -->
  <div class="slide-section py-matrix-showcase" id="day01ToolMatrixSection">
    <!-- Header -->
    <div class="py-matrix-header">
      <div class="py-matrix-title-row">
        <div class="py-matrix-header-icon">🤝</div>
        <h3 class="py-matrix-title">Tool Matrix: SQL vs. Excel vs. Python in Analytics</h3>
        <button class="audio-play-btn" onclick="playAudio('Day01/New_PyDay01Audio02.mp3', this)" title="Play narration">
          <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
        </button>
      </div>
    </div>

    <!-- Scrollable Table Wrapper -->
    <div class="py-matrix-table-wrap">
      <table class="py-matrix-table">
        <thead>
          <tr>
            <th style="width:130px;">Tool</th>
            <th style="width:230px;">Primary Role</th>
            <th style="width:210px;">Data Limits</th>
            <th>Key Advantage</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div class="py-tool-pill tool-sql">
                <span>🗄️</span>
                <span>SQL</span>
              </div>
            </td>
            <td class="py-matrix-role">
              Fetch raw database tables &amp; initial joins
            </td>
            <td>
              <span class="py-matrix-limit limit-massive">
                ⚡ Massive (Server Scale)
              </span>
            </td>
            <td class="py-matrix-adv">
              Fast server-side filtering, indexing &amp; instant aggregations
            </td>
          </tr>
          <tr>
            <td>
              <div class="py-tool-pill tool-excel">
                <span>📊</span>
                <span>Excel</span>
              </div>
            </td>
            <td class="py-matrix-role">
              Quick ad-hoc spreadsheet checks &amp; pivot tables
            </td>
            <td>
              <span class="py-matrix-limit limit-small">
                ⚠️ Small (&lt; 1M Rows)
              </span>
            </td>
            <td class="py-matrix-adv">
              Instant visual tabular editing, financial modeling &amp; easy sharing
            </td>
          </tr>
          <tr class="py-matrix-highlight-row">
            <td>
              <div class="py-tool-pill tool-python">
                <span>🐍</span>
                <span>Python</span>
                <span class="py-tool-flag">Core</span>
              </div>
            </td>
            <td class="py-matrix-role">
              Deep analysis, automated ETL &amp; statistics
            </td>
            <td>
              <span class="py-matrix-limit limit-large">
                🚀 Large (RAM / Cluster)
              </span>
            </td>
            <td class="py-matrix-adv">
              Unmatched flexibility, ML models, custom pipelines &amp; automated reporting
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

<!-- ═══ SECTION 2: 02. Mutable vs. Immutable Objects ═══ -->
<div class="slide-section" id="day01MutabilitySection">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingMutability">
    <span class="heading-num-box">02</span>
    <span class="heading-title-box">
      <span class="heading-title-text"><span class="heading-icon">🔄</span> Object Mutability: Mutable vs. Immutable</span>
      <button class="audio-play-btn" onclick="playAudio('Day01/New_PyDay01Audio03.mp3', this)" title="Play narration">
        <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
      </button>
    </span>
  </h2>
  <p>In Python, every piece of data you save is stored in computer memory as an <strong>object</strong>. Understanding mutability is essential for writing error-free data code and preventing accidental corruption of raw datasets.</p>

  <!-- 🔄 Mutability Architecture Dual Comparison Showcase -->
  <div class="py-mut-showcase">
    <!-- Header -->
    <div class="py-mut-header">
      <div class="py-mut-title-row">
        <div class="py-mut-header-icon">🔄</div>
        <h3 class="py-mut-title">Mutable vs. Immutable Objects in RAM</h3>
      </div>
      <p class="py-mut-subtitle">How Python handles in-place memory updates vs. brand-new object reallocation in RAM</p>
    </div>

    <!-- 2-Column Analogy Grid -->
    <div class="py-mut-grid">
      <!-- Left Column: Mutable -->
      <div class="py-mut-panel panel-mutable">
        <!-- 1. Header Box -->
        <div class="py-mut-header-box mut-header-green">
          <div class="py-mut-panel-title-wrap">
            <div class="py-mut-panel-icon">✏️</div>
            <div>
              <h4 class="py-mut-panel-name">Mutable Objects (list, dict, set)</h4>
              <span class="py-mut-panel-sub">In-Place Modification</span>
            </div>
          </div>
          <span class="py-mut-status-pill pill-mutable"><span>Can</span><span>Change</span></span>
        </div>

        <!-- 2. Description Paragraph -->
        <p class="py-mut-desc">
          The value can be updated directly <strong>inside existing RAM</strong>. The object stays at the exact same memory address (like wiping &amp; rewriting on a whiteboard).
        </p>

        <!-- 3. Types Row -->
        <div class="py-mut-types-row">
          <span class="py-mut-types-label">Types:</span>
          <span class="py-mut-type-tag">list</span>
          <span class="py-mut-type-tag">dict</span>
          <span class="py-mut-type-tag">set</span>
        </div>

        <!-- 4. Code Block -->
        <div class="py-mut-code-wrap">
          <div class="py-mut-code-topbar">
            <span>● RAM: Preserved</span>
            <span>id(sales) = Same</span>
          </div>
          <pre><code>sales = [100, 200, 300]
sales[0] = 150  <span class="code-comment"># ✅ In-place update</span>
print(sales)    <span class="code-comment"># [150, 200, 300]</span></code></pre>
        </div>

        <!-- 5. Analyst Advantage -->
        <div class="py-mut-takeaway">
          <div><strong>💡 Data Analyst Advantage:</strong> Highly memory-efficient for appending, sorting, and transforming large datasets without duplicating RAM.</div>
        </div>
      </div>

      <!-- Right Column: Immutable -->
      <div class="py-mut-panel panel-immutable">
        <!-- 1. Header Box -->
        <div class="py-mut-header-box mut-header-rose">
          <div class="py-mut-panel-title-wrap">
            <div class="py-mut-panel-icon">🔒</div>
            <div>
              <h4 class="py-mut-panel-name">Immutable Objects (int, float, str, tuple)</h4>
              <span class="py-mut-panel-sub">Write-Protected (Reallocated)</span>
            </div>
          </div>
          <span class="py-mut-status-pill pill-immutable"><span>Cannot</span><span>Change</span></span>
        </div>

        <!-- 2. Description Paragraph -->
        <p class="py-mut-desc">
          Once created, the value <strong>can never be modified in-place</strong>. Any update allocates a brand-new object in memory (like reprinting a physical sheet).
        </p>

        <!-- 3. Types Row -->
        <div class="py-mut-types-row">
          <span class="py-mut-types-label">Types:</span>
          <span class="py-mut-type-tag">int</span>
          <span class="py-mut-type-tag">float</span>
          <span class="py-mut-type-tag">str</span>
          <span class="py-mut-type-tag">tuple</span>
        </div>

        <!-- 4. Code Block -->
        <div class="py-mut-code-wrap">
          <div class="py-mut-code-topbar">
            <span>⚠️ RAM: Reallocated</span>
            <span>id(city) = New</span>
          </div>
          <pre><code>city = "Boston"
<span class="code-comment"># city[0] = "b"  ❌ TypeError (read-only)</span>
city = "Austin"  <span class="code-comment"># 🔄 Rebinds new object</span></code></pre>
        </div>

        <!-- 5. Analyst Advantage -->
        <div class="py-mut-takeaway">
          <div><strong>💡 Data Analyst Advantage:</strong> Safe from accidental mutations. Guaranteed thread-safety and constant hash keys for dictionary lookups.</div>
        </div>
      </div>
    </div>
    
    <!-- ⚠️ Senior Analyst Gotcha: Shared Mutable Reference Trap -->
    <div class="py-analyst-trap-card">
      <div class="py-trap-header">
        <div class="py-trap-badge">⚠️ PRODUCTION DATA TRAP</div>
        <h4 class="py-trap-title">The Shared Reference Pitfall (Why <code>clean = raw</code> Corrupts Analysis)</h4>
      </div>
      <div class="py-trap-content">
        <p class="py-trap-text">
          In Python, assignment (<code>=</code>) <strong>never copies data</strong>. It only creates a second pointer pointing to the <em>exact same list in RAM</em>. Mutating one variable silently corrupts your original dataset!
        </p>
        <div class="py-trap-code-grid">
          <div class="py-trap-box trap-danger">
            <div class="py-trap-box-label">❌ The Bug: Shared Mutation</div>
            <pre><code>raw = [100, 200, 300]
clean = raw          <span class="code-comment"># ⚠️ Same address in RAM!</span>
clean.append(999)    <span class="code-comment"># Mutates in-place</span>
print(raw)           <span class="code-comment"># [100, 200, 300, 999] 💥</span></code></pre>
          </div>
          <div class="py-trap-box trap-solution">
            <div class="py-trap-box-label">✅ The Fix: Explicit Memory Copy</div>
            <pre><code>raw = [100, 200, 300]
clean = raw.copy()   <span class="code-comment"># 🛡️ Allocates new RAM object</span>
clean.append(999)    <span class="code-comment"># Independent list</span>
print(raw)           <span class="code-comment"># [100, 200, 300] ✨ Safe!</span></code></pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- ═══ SECTION 3: 03. Master Data Types Reference ═══ -->
<div class="slide-section" id="day01DataTypesSection">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingDataTypes">
    <span class="heading-num-box">03</span>
    <span class="heading-title-box">
      <span class="heading-title-text"><span class="heading-icon">📋</span> Master Data Types &amp; Structures Reference</span>
      <button class="audio-play-btn" onclick="playAudio('Day01/New_PyDay01Audio04.mp3', this)" title="Play narration">
        <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
      </button>
    </span>
  </h2>
  <p>Every piece of data in Python has an associated type. Below is the complete reference matrix of Python data types categorized for data analysis:</p>

  <div class="py-table-mobile-hint">
    <span>Swipe horizontally to view all columns</span>
    <span>➔</span>
  </div>
  <div class="db-mock-table-wrap">
    <table class="db-table-mock db-table-mock--compact py-master-ref-table">
      <thead>
        <tr>
          <th>Category</th>
          <th>Data Type</th>
          <th>Keyword</th>
          <th>Syntax Example</th>
          <th>Description</th>
          <th>Mutability</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Numeric</strong></td>
          <td>Integer</td>
          <td><code>int</code></td>
          <td><code>age = 25</code></td>
          <td>Whole numbers (counts, IDs)</td>
          <td><span class="py-badge py-badge-rose" style="padding:1px 6px;">🔒 Immutable</span></td>
        </tr>
        <tr>
          <td><strong>Numeric</strong></td>
          <td>Float</td>
          <td><code>float</code></td>
          <td><code>price = 99.99</code></td>
          <td>Decimal numbers (revenue, percentages)</td>
          <td><span class="py-badge py-badge-rose" style="padding:1px 6px;">🔒 Immutable</span></td>
        </tr>
        <tr>
          <td><strong>Numeric</strong></td>
          <td>Complex</td>
          <td><code>complex</code></td>
          <td><code>z = 3 + 5j</code></td>
          <td>Real &amp; imaginary numbers (scientific calculations)</td>
          <td><span class="py-badge py-badge-rose" style="padding:1px 6px;">🔒 Immutable</span></td>
        </tr>
        <tr>
          <td><strong>Text</strong></td>
          <td>String</td>
          <td><code>str</code></td>
          <td><code>city = "Chicago"</code></td>
          <td>Text enclosed in quotes (names, categories)</td>
          <td><span class="py-badge py-badge-rose" style="padding:1px 6px;">🔒 Immutable</span></td>
        </tr>
        <tr>
          <td><strong>Boolean</strong></td>
          <td>Boolean</td>
          <td><code>bool</code></td>
          <td><code>is_active = True</code></td>
          <td>Logic flags (<code>True</code> or <code>False</code>)</td>
          <td><span class="py-badge py-badge-rose" style="padding:1px 6px;">🔒 Immutable</span></td>
        </tr>
        <tr>
          <td><strong>Sequence</strong></td>
          <td>List</td>
          <td><code>list</code></td>
          <td><code>[10, 20, 30]</code></td>
          <td>Ordered, editable collection of items</td>
          <td><span class="py-badge py-badge-green" style="padding:1px 6px;">✏️ Mutable</span></td>
        </tr>
        <tr>
          <td><strong>Sequence</strong></td>
          <td>Tuple</td>
          <td><code>tuple</code></td>
          <td><code>(10, 20, 30)</code></td>
          <td>Ordered, read-only (locked) collection</td>
          <td><span class="py-badge py-badge-rose" style="padding:1px 6px;">🔒 Immutable</span></td>
        </tr>
        <tr>
          <td><strong>Sequence</strong></td>
          <td>Range</td>
          <td><code>range</code></td>
          <td><code>range(0, 10)</code></td>
          <td>Sequence of numbers (used in loops)</td>
          <td><span class="py-badge py-badge-rose" style="padding:1px 6px;">🔒 Immutable</span></td>
        </tr>
        <tr>
          <td><strong>Mapping</strong></td>
          <td>Dictionary</td>
          <td><code>dict</code></td>
          <td><code>{"id": 1, "name": "A"}</code></td>
          <td>Key-Value pairs (structured records)</td>
          <td><span class="py-badge py-badge-green" style="padding:1px 6px;">✏️ Mutable</span></td>
        </tr>
        <tr>
          <td><strong>Set</strong></td>
          <td>Set</td>
          <td><code>set</code></td>
          <td><code>{1, 2, 3}</code></td>
          <td>Unordered collection of unique items (no duplicates)</td>
          <td><span class="py-badge py-badge-green" style="padding:1px 6px;">✏️ Mutable</span></td>
        </tr>
        <tr>
          <td><strong>Set</strong></td>
          <td>Frozen Set</td>
          <td><code>frozenset</code></td>
          <td><code>frozenset([1, 2])</code></td>
          <td>Immutable version of a set</td>
          <td><span class="py-badge py-badge-rose" style="padding:1px 6px;">🔒 Immutable</span></td>
        </tr>
        <tr>
          <td><strong>None</strong></td>
          <td>NoneType</td>
          <td><code>None</code></td>
          <td><code>data = None</code></td>
          <td>Represents missing or null values (SQL NULL equivalent)</td>
          <td><span class="py-badge py-badge-rose" style="padding:1px 6px;">🔒 Immutable</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<!-- ═══ SECTION 4: 04. How Python Manages Memory in RAM ═══ -->
<div class="slide-section" id="day01MemorySection">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingMemory">
    <span class="heading-num-box">04</span>
    <span class="heading-title-box">
      <span class="heading-title-text"><span class="heading-icon">🧠</span> Memory Management &amp; Object References in RAM</span>
      <button class="audio-play-btn" onclick="playAudio('Day01/New_PyDay01Audio05.mp3', this)" title="Play narration">
        <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
      </button>
    </span>
  </h2>
  <p>In Python, understanding how code connects to RAM prevents subtle data corruption bugs when passing datasets between functions.</p>

  <!-- 🧭 Interactive Vertical Flowchart: How Python Manages Memory -->
  <div class="py-vfc-canvas" id="cpythonMemoryFlowSection">
    
    <!-- Flowchart Canvas Top Header -->
    <div class="py-vfc-header">
      <div class="py-vfc-title-wrap">
        <svg class="py-vfc-logo" viewBox="0 0 24 24" fill="none">
          <path d="M11.9 1.5c-3.1 0-5 1.5-5 3.5v2.5h5v.8H4.4C2.3 8.3 1 9.8 1 12.3c0 2.8 1.8 3.8 4 3.8h1.8v-2.3c0-2 1.7-3.8 3.8-3.8h4.9c1.4 0 2.5-1.1 2.5-2.5V4.9c0-2-1.9-3.4-6.1-3.4zm-2.4 1.8c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1z" fill="#38bdf8"/>
          <path d="M12.1 22.5c3.1 0 5-1.5 5-3.5v-2.5h-5v-.8h7.5c2.1 0 3.4-1.5 3.4-4 0-2.8-1.8-3.8-4-3.8h-1.8v2.3c0 2-1.7 3.8-3.8 3.8h-4.9c-1.4 0-2.5 1.1-2.5 2.5v2.8c0 2 1.9 3.2 6.1 3.2zm2.4-1.8c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z" fill="#facc15"/>
        </svg>
        <h3 class="py-vfc-main-title">How Python Manages Memory Under the Hood</h3>
      </div>
      <div class="py-vfc-sub-title">Runtime Memory Architecture &amp; Execution Pipeline</div>
      
      <!-- Header Meta: Pipeline Breadcrumb & Pinned Sticky Note -->
      <div class="py-vfc-header-meta" style="justify-content:center;">
        <div class="py-vfc-pipeline-stepper" role="list">
          <div class="py-vfc-step" role="listitem">
            <span class="py-vfc-step-idx">01</span>
            <span>Source Code</span>
          </div>
          <div class="py-vfc-step-arrow" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </div>
          <div class="py-vfc-step" role="listitem">
            <span class="py-vfc-step-idx">02</span>
            <span>Heap Objects</span>
          </div>
          <div class="py-vfc-step-arrow" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </div>
          <div class="py-vfc-step" role="listitem">
            <span class="py-vfc-step-idx">03</span>
            <span>RAM Pointers</span>
          </div>
          <div class="py-vfc-step-arrow" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </div>
          <div class="py-vfc-step" role="listitem">
            <span class="py-vfc-step-idx">04</span>
            <span>Reassignment &amp; Identity</span>
          </div>
          <div class="py-vfc-step-arrow" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </div>
          <div class="py-vfc-step" role="listitem">
            <span class="py-vfc-step-idx">05</span>
            <span>Garbage Collection</span>
          </div>
        </div>

        
      </div>
    </div>

    <!-- ═══════════════ VERTICAL FLOWCHART PIPELINE ═══════════════ -->
    <div class="py-vfc-pipeline">

      <!-- ─── NODE 1: YOUR PYTHON CODE ─── -->
      <div class="py-vfc-node vnode-code">
        <div class="py-vfc-node-header">
          <div class="py-vfc-node-title-group">
            <span class="py-vfc-step-num">1</span>
            <span class="py-vfc-node-title">1. Source Code Execution</span></div><span class="py-vfc-stage-pill">Execution Phase</span>
        </div>
        <div class="py-vfc-canvas-box">
          <pre class="py-vfc-code-block"><code><span class="py-vfc-code-line"><span class="py-vfc-line-num">1</span><span class="code-var">a</span> = <span class="code-num">10</span></span>
<span class="py-vfc-code-line"><span class="py-vfc-line-num">2</span><span class="code-var">b</span> = <span class="code-num">10</span></span>
<span class="py-vfc-code-line"><span class="py-vfc-line-num">3</span><span class="code-var">name</span> = <span class="code-str">"manodemy"</span></span>
<span class="py-vfc-code-line"><span class="py-vfc-line-num">4</span><span class="code-var">lst</span> = [<span class="code-num">1</span>, <span class="code-num">2</span>, <span class="code-num">3</span>]</span></code></pre>
        </div>
        <div class="py-vfc-node-footer">
          You write some code. Python executes it line-by-line from top to bottom.
        </div>
      </div>

      
                  <!-- Flowchart Downward Connector -->
      <div class="py-vfc-connector">
        <div class="py-vfc-stem"></div>
        <div class="py-vfc-arrow-badge" title="Proceed to next step">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M12 4v13M6 12l6 6 6-6" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="py-vfc-stem"></div>
      </div>


      <!-- ─── NODE 2: PYTHON CREATES OBJECTS ─── -->
      <div class="py-vfc-node vnode-objects">
        <div class="py-vfc-node-header">
          <div class="py-vfc-node-title-group">
            <span class="py-vfc-step-num" style="background:#a855f7;">2</span>
            <span class="py-vfc-node-title">2. Object Allocation in Memory</span></div><span class="py-vfc-stage-pill">Object Instantiation</span>
        </div>
        <div class="py-vfc-canvas-box">
          <div class="py-vfc-obj-grid">
            <div class="py-vfc-obj-item">
              <span class="py-vfc-val-pill pill-green">10</span>
              <span class="py-vfc-obj-label">Integer object (int)</span>
            </div>
            <div class="py-vfc-obj-item">
              <span class="py-vfc-val-pill pill-amber">"manodemy"</span>
              <span class="py-vfc-obj-label">String object (str)</span>
            </div>
            <div class="py-vfc-obj-item">
              <span class="py-vfc-val-pill pill-purple">[1, 2, 3]</span>
              <span class="py-vfc-obj-label">List object (list)</span>
            </div>
          </div>
        </div>
        <div class="py-vfc-node-footer">
          For each literal value, Python dynamically allocates a dedicated object in computer memory.
        </div>
      </div>

      
                  <!-- Flowchart Downward Connector -->
      <div class="py-vfc-connector">
        <div class="py-vfc-stem"></div>
        <div class="py-vfc-arrow-badge" title="Proceed to next step">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M12 4v13M6 12l6 6 6-6" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="py-vfc-stem"></div>
      </div>


      <!-- ─── NODE 3: MEMORY: WHERE OBJECTS LIVE ─── -->
      <div class="py-vfc-node vnode-ram">
        <div class="py-vfc-node-header">
          <div class="py-vfc-node-title-group">
            <span class="py-vfc-step-num" style="background:#16a34a;">3</span>
            <span class="py-vfc-node-title">3. System RAM: Code Area vs. Object Heap</span></div><span class="py-vfc-stage-pill">RAM Architecture</span>
        </div>
        <div class="py-vfc-canvas-box">
          <div class="py-vfc-ram-wrap">
            <div class="py-vfc-ram-tag">
              <span>⚡</span> System Memory (RAM Architecture)
            </div>
            <div class="py-vfc-ram-sections">
              <div class="py-vfc-code-area">
                <strong>Code / Program Area</strong>: Functions, classes, bytecode instructions.
              </div>
              <div class="py-vfc-heap-area">
                <div class="py-vfc-heap-title">
                  <span>Heap (Objects Space)</span>
                  <span style="font-size:0.65rem;opacity:0.75;">Dynamic Allocations</span>
                </div>
                <table class="py-vfc-heap-table">
                  <thead>
                    <tr>
                      <th>Address</th>
                      <th>Object Value</th>
                      <th>Type</th>
                      <th>Status / Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><span class="py-vfc-hex">0x1001</span></td>
                      <td><span class="py-vfc-val-pill pill-green">10</span></td>
                      <td><span class="py-vfc-type-dim">int</span></td>
                      <td style="color:#94a3b8;font-size:0.68rem;">Cached in integer pool</td>
                    </tr>
                    <tr>
                      <td><span class="py-vfc-hex">0x1002</span></td>
                      <td><span class="py-vfc-val-pill pill-green">10</span></td>
                      <td><span class="py-vfc-type-dim">int</span></td>
                      <td style="color:#94a3b8;font-size:0.68rem;">Integer object</td>
                    </tr>
                    <tr>
                      <td><span class="py-vfc-hex">0x2001</span></td>
                      <td><span class="py-vfc-val-pill pill-amber">"manodemy"</span></td>
                      <td><span class="py-vfc-type-dim">str</span></td>
                      <td style="color:#94a3b8;font-size:0.68rem;">Heap string</td>
                    </tr>
                    <tr>
                      <td><span class="py-vfc-hex">0x3001</span></td>
                      <td><span class="py-vfc-val-pill pill-purple">[1, 2, 3]</span></td>
                      <td><span class="py-vfc-type-dim">list</span></td>
                      <td style="color:#94a3b8;font-size:0.68rem;">Heap mutable container</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="py-vfc-node-footer">
          RAM holds your code and objects in the Heap. Every object gets assigned a unique hexadecimal memory address.
        </div>
      </div>

      
                  <!-- Flowchart Downward Connector -->
      <div class="py-vfc-connector">
        <div class="py-vfc-stem"></div>
        <div class="py-vfc-arrow-badge" title="Proceed to next step">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M12 4v13M6 12l6 6 6-6" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="py-vfc-stem"></div>
      </div>


      <!-- ─── NODE 4: VARIABLES POINT TO OBJECTS ─── -->
      <div class="py-vfc-node vnode-pointers">
        <div class="py-vfc-node-header">
          <div class="py-vfc-node-title-group">
            <span class="py-vfc-step-num" style="background:#0284c7;">4</span>
            <span class="py-vfc-node-title">4. Variable Names as Memory Pointers</span></div><span class="py-vfc-stage-pill">Reference Binding</span>
        </div>
        <div class="py-vfc-canvas-box">
          <div class="py-vfc-pointer-list">
            <div class="py-vfc-ptr-row">
              <span class="py-vfc-var-label">a</span>
              <span class="py-vfc-ptr-arrow">──▶ points to ──▶</span>
              <span class="py-vfc-hex">0x1001</span>
              <span class="py-vfc-ptr-arrow">──▶</span>
              <span class="py-vfc-val-pill pill-green">10</span>
              <span class="py-vfc-type-dim">(int)</span>
            </div>
            <div class="py-vfc-ptr-row">
              <span class="py-vfc-var-label">b</span>
              <span class="py-vfc-ptr-arrow">──▶ points to ──▶</span>
              <span class="py-vfc-hex">0x1002</span>
              <span class="py-vfc-ptr-arrow">──▶</span>
              <span class="py-vfc-val-pill pill-green">10</span>
              <span class="py-vfc-type-dim">(int)</span>
            </div>
            <div class="py-vfc-ptr-row">
              <span class="py-vfc-var-label">name</span>
              <span class="py-vfc-ptr-arrow">──▶ points to ──▶</span>
              <span class="py-vfc-hex">0x2001</span>
              <span class="py-vfc-ptr-arrow">──▶</span>
              <span class="py-vfc-val-pill pill-amber">"manodemy"</span>
              <span class="py-vfc-type-dim">(str)</span>
            </div>
            <div class="py-vfc-ptr-row">
              <span class="py-vfc-var-label">lst</span>
              <span class="py-vfc-ptr-arrow">──▶ points to ──▶</span>
              <span class="py-vfc-hex">0x3001</span>
              <span class="py-vfc-ptr-arrow">──▶</span>
              <span class="py-vfc-val-pill pill-purple">[1, 2, 3]</span>
              <span class="py-vfc-type-dim">(list)</span>
            </div>
          </div>
                </div>
        <div class="py-fc-live-tip">
          <span class="py-fc-tip-icon">🔬</span>
          <div class="py-fc-tip-text">
            <strong>Analyst Pro-Tip (Inspect Your Physical RAM):</strong> In Python, run <code>hex(id(a))</code> to see the actual hardware memory address assigned by your OS (e.g., <code>0x7f9a1b20</code>). If <code>id(a) == id(c)</code>, both variables share the exact same object in RAM!
          </div>
        </div>
        <div class="py-vfc-node-footer">
          Variables do not store data directly! They are just name tags that hold the <strong>memory address</strong> of the object.
        </div>
      </div>

      <!-- ═══════════════ FLOWCHART MILESTONE BRIDGE ═══════════════ -->
      <div class="py-vfc-connector">
        <div class="py-vfc-stem"></div>
        <div class="py-vfc-arrow-badge" title="Memory dynamics transition">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M12 4v13M6 12l6 6 6-6" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="py-vfc-stem"></div>
      </div>

      <div class="py-vfc-bridge">
        <div class="py-vfc-bridge-title">
          <span>⚡</span> MEMORY DYNAMICS: SHARED OBJECT CACHING vs. IN-PLACE MUTATION <span>⚡</span>
        </div>
        <div class="py-vfc-bridge-pills">
          <span class="bridge-pill">Same data ➔ Same object (sometimes)</span>
          <span class="bridge-sep">•</span>
          <span class="bridge-pill">New data ➔ New object</span>
        </div>
      </div>

      <div class="py-vfc-connector">
        <div class="py-vfc-stem"></div>
        <div class="py-vfc-arrow-badge" title="Behavior scenarios">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M12 4v13M6 12l6 6 6-6" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="py-vfc-stem"></div>
      </div>

      <!-- ─── NODE 5: CREATE ANOTHER VARIABLE ─── -->
      <div class="py-vfc-node vnode-reuse">
        <div class="py-vfc-node-header">
          <div class="py-vfc-node-title-group">
            <span class="py-vfc-step-num" style="background:#0284c7;">5</span>
            <span class="py-vfc-node-title">5. Integer Caching &amp; Memory Reuse (c = 10)</span></div><span class="py-vfc-stage-pill">Small Int Pooling</span>
        </div>
        <div class="py-vfc-canvas-box">
          <div style="font-family:var(--font-mono, monospace);font-size:0.84rem;color:#38bdf8;margin-bottom:8px;">
            <strong>c = 10</strong>
          </div>
          <div style="font-size:0.74rem;color:#94a3b8;line-height:1.45;margin-bottom:10px;">
            Python checks: <em>"Is there already an object for 10 in the integer pool?"</em><br/>
            <span style="color:#4ade80;font-weight:700;">➔ YES! So Python reuses the existing object at 0x1001.</span>
          </div>
          <div class="py-vfc-fork-diagram">
            <div class="py-vfc-fork-vars">
              <span class="py-vfc-var-label" style="border-color:#a855f7;color:#c084fc;">a</span>
              <span class="py-vfc-var-label" style="border-color:#a855f7;color:#c084fc;">c</span>
            </div>
            <div class="py-vfc-fork-arrows">⎫<br/>⎭──▶</div>
            <div style="text-align:center;">
              <span class="py-vfc-val-pill pill-green" style="font-size:0.84rem;padding:4px 12px;">10</span><br/>
              <span class="py-vfc-hex" style="font-size:0.68rem;margin-top:4px;display:inline-block;">0x1001 (Shared Address)</span>
            </div>
          </div>
        </div>
        <div class="py-vfc-node-footer">
          Both <code>a</code> and <code>c</code> point to the same integer object at memory address <code>0x1001</code>! No redundant memory was wasted.
        </div>
      </div>

      
                  <!-- Flowchart Downward Connector -->
      <div class="py-vfc-connector">
        <div class="py-vfc-stem"></div>
        <div class="py-vfc-arrow-badge" title="Proceed to next step">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M12 4v13M6 12l6 6 6-6" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="py-vfc-stem"></div>
      </div>


      <!-- ─── NODE 6: MUTABLE OBJECTS (LISTS) ─── -->
      <div class="py-vfc-node vnode-mutable">
        <div class="py-vfc-node-header">
          <div class="py-vfc-node-title-group">
            <span class="py-vfc-step-num" style="background:#16a34a;">6</span>
            <span class="py-vfc-node-title">6. In-Place Mutation of Mutable Objects (Lists)</span></div><span class="py-vfc-stage-pill">In-Place Mutation</span>
        </div>
        <div class="py-vfc-canvas-box">
          <div style="font-family:var(--font-mono, monospace);font-size:0.80rem;color:#e2e8f0;margin-bottom:6px;">
            <span class="code-var">lst</span> = [<span class="code-num">1</span>, <span class="code-num">2</span>, <span class="code-num">3</span>]<br/>
            <span class="code-var">lst</span>.<span class="code-kw">append</span>(<span class="code-num">4</span>)
          </div>
          <div style="font-size:0.74rem;color:#94a3b8;line-height:1.45;margin-bottom:8px;">
            Lists are mutable. When you append 4, Python modifies the object in-place at the <strong>exact same memory address</strong>.
          </div>
          <div style="display:flex;align-items:center;justify-content:center;gap:10px;padding:4px 0;">
            <span class="py-vfc-var-label">lst</span>
            <span class="py-vfc-ptr-arrow">──▶ points to ──▶</span>
            <div style="text-align:center;">
              <span class="py-vfc-val-pill pill-purple" style="font-size:0.80rem;padding:4px 12px;">[1, 2, 3, 4]</span><br/>
              <span class="py-vfc-hex" style="font-size:0.68rem;margin-top:4px;display:inline-block;">0x3001 (Same Address!)</span>
            </div>
          </div>
        </div>
        <div class="py-vfc-node-footer">
          The list object is updated <strong>in the same memory location</strong> without allocating new RAM or changing addresses.
        </div>
      </div>

      
                  <!-- Flowchart Downward Connector -->
      <div class="py-vfc-connector">
        <div class="py-vfc-stem"></div>
        <div class="py-vfc-arrow-badge" title="Proceed to next step">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M12 4v13M6 12l6 6 6-6" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="py-vfc-stem"></div>
      </div>


      <!-- ─── NODE 7: IMMUTABLE OBJECTS (INTS & STRINGS) ─── -->
      <div class="py-vfc-node vnode-immutable">
        <div class="py-vfc-node-header">
          <div class="py-vfc-node-title-group">
            <span class="py-vfc-step-num" style="background:#e11d48;">7</span>
            <span class="py-vfc-node-title">7. Rebinding &amp; Allocation for Immutable Objects (Integers &amp; Strings)</span></div><span class="py-vfc-stage-pill">Object Reallocation</span>
        </div>
        <div class="py-vfc-canvas-box">
          <div style="font-family:var(--font-mono, monospace);font-size:0.80rem;color:#e2e8f0;margin-bottom:6px;">
            <span class="code-var">a</span> = <span class="code-num">10</span><br/>
            <span class="code-var">a</span> = <span class="code-num">20</span>
          </div>
          <div style="font-size:0.74rem;color:#94a3b8;line-height:1.45;margin-bottom:8px;">
            Integers &amp; strings can't change. Python allocates a <strong>brand-new object</strong> for the new value.
          </div>
          <div style="display:flex;align-items:center;justify-content:center;gap:10px;padding:4px 0;">
            <span class="py-vfc-var-label">a</span>
            <span class="py-vfc-ptr-arrow">──▶ rebinds to ──▶</span>
            <div style="text-align:center;">
              <span class="py-vfc-val-pill pill-green" style="font-size:0.80rem;padding:4px 12px;">20</span><br/>
              <span class="py-vfc-hex" style="font-size:0.68rem;margin-top:4px;display:inline-block;color:#f43f5e;border-color:rgba(244,63,94,0.4);">0x4001 (New Address!)</span>
            </div>
          </div>
        </div>
        <div class="py-vfc-node-footer">
          Now <code>a</code> points to a new object with a <strong>different address</strong> in memory. Old object <code>10</code> stays untouched.
        </div>
      </div>

      
                  <!-- Flowchart Downward Connector -->
      <div class="py-vfc-connector">
        <div class="py-vfc-stem"></div>
        <div class="py-vfc-arrow-badge" title="Proceed to next step">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M12 4v13M6 12l6 6 6-6" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="py-vfc-stem"></div>
      </div>


      <!-- ─── NODE 8: AUTOMATIC MEMORY MANAGEMENT ─── -->
      <div class="py-vfc-node vnode-mgmt">
        <div class="py-vfc-node-header">
          <div class="py-vfc-node-title-group">
            <span class="py-vfc-step-num" style="background:#4f46e5;">8</span>
            <span class="py-vfc-node-title">8. Automated Memory Lifecycle: Reference Counting &amp; GC</span></div><span class="py-vfc-stage-pill">Automated GC</span>
        </div>
        <div class="py-vfc-canvas-box">
          <div class="py-vfc-cycle-grid">
            <div class="py-vfc-cycle-item">
              <span class="py-vfc-cycle-icon">♻️</span>
              <div class="py-vfc-cycle-text">
                <strong>Reference Counting</strong><br/>
                Python continuously counts how many variables point to each object.
              </div>
            </div>
            <div class="py-vfc-cycle-item">
              <span class="py-vfc-cycle-icon">🗑️</span>
              <div class="py-vfc-cycle-text">
                <strong>Garbage Collection</strong><br/>
                When an object's reference count drops to 0, Python immediately frees RAM.
              </div>
            </div>
            <div class="py-vfc-cycle-item">
              <span class="py-vfc-cycle-icon">⚙️</span>
              <div class="py-vfc-cycle-text">
                <strong>Memory Pooling</strong><br/>
                Small integers (-5 to 256) and interned strings are cached for instant access.
              </div>
            </div>
          </div>
        </div>
        <div class="py-vfc-node-footer">
          Zero manual cleanup needed. Python manages RAM seamlessly so you can focus entirely on data logic.
        </div>
      </div>

      
                  <!-- Flowchart Downward Connector -->
      <div class="py-vfc-connector">
        <div class="py-vfc-stem"></div>
        <div class="py-vfc-arrow-badge" title="Proceed to next step">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M12 4v13M6 12l6 6 6-6" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="py-vfc-stem"></div>
      </div>


      <!-- ─── NODE 9: IN SIMPLE WORDS... ─── -->
      <div class="py-vfc-node vnode-summary">
        <div class="py-vfc-node-header">
          <div class="py-vfc-node-title-group">
            <span class="py-vfc-step-num" style="background:#ca8a04;">9</span>
            <span class="py-vfc-node-title">9. Core Mental Model: Objects, References &amp; Memory</span></div><span class="py-vfc-stage-pill">Core Mental Model</span>
        </div>
        <div class="py-vfc-canvas-box">
          <div class="py-vfc-legend-grid">
            <div class="py-vfc-legend-item">💡 <strong>Objects</strong> = Data in RAM</div>
            <div class="py-vfc-legend-item">🔗 <strong>Variables</strong> = Name labels</div>
            <div class="py-vfc-legend-item">♻️ <strong>Reuses</strong> = Smart RAM caching</div>
            <div class="py-vfc-legend-item">🗑️ <strong>Auto Clean</strong> = Zero leaks</div>
          </div>
          <div class="py-vfc-gold-card">
            You write the code.<br/>
            <strong>Python handles the memory! 😊</strong>
          </div>
        </div>
        <div class="py-vfc-footer-ribbon">
          Python = Simple Code + Smart Memory Management = Powerful Results 💙
        </div>
      </div>

    </div>

  </div>
</div>




`
    }
  ],

  practiceQuestions: [
    {
        "id": 1,
        "prompt": "<strong>[Easy] Your First Python Output: The print() Function</strong><br/>Use Python's built-in <code>print()</code> function to output the greeting message: <code>\"Hello, Python for Data Analysis!\"</code> to the console.",
        "starterCode": "",
        "ref": "print(\"Hello, Python for Data Analysis!\")\n",
        "questionAudio": "Day01/New_PyDay01Question01.mp3",
        "solutionAudio": "Day01/New_PyDay01Question01sol.mp3",
        "validation": {
            "mode": "stdout_contains",
            "stdoutContains": "Hello, Python for Data Analysis!"
        }
    },
    {
        "id": 2,
        "prompt": "<strong>[Easy] Printing Numbers & Inline Arithmetic</strong><br/>The <code>print()</code> function can directly display numbers and calculate math expressions. Use <code>print()</code> to calculate and display the sum of <code>150 + 250</code>.",
        "starterCode": "",
        "ref": "print(150 + 250)\n",
        "questionAudio": "Day01/New_PyDay01Question02.mp3",
        "solutionAudio": "Day01/New_PyDay01Question02sol.mp3",
        "validation": {
            "mode": "stdout_contains",
            "stdoutContains": "400"
        }
    },
    {
        "id": 3,
        "prompt": "<strong>[Easy] Printing Multiple Values with Commas</strong><br/>You can print multiple items in a single line by separating them with commas. Use <code>print()</code> to output the label <code>\"Total Records:\"</code> followed by the number <code>500</code>.",
        "starterCode": "",
        "ref": "print(\"Total Records:\", 500)\n",
        "questionAudio": "Day01/New_PyDay01Question03.mp3",
        "solutionAudio": "Day01/New_PyDay01Question03sol.mp3",
        "validation": {
            "mode": "stdout_contains",
            "stdoutContains": "Total Records: 500"
        }
    },
    {
        "id": 4,
        "prompt": "<strong>[Easy] Integer (int) Variable Creation</strong><br/>Integers store whole numbers without decimals. Create an integer variable named <code>employee_count</code> with value <code>150</code>, and print it.",
        "starterCode": "",
        "ref": "employee_count = 150\nprint(\"Employee Count:\", employee_count)\n",
        "questionAudio": "Day01/New_PyDay01Question04.mp3",
        "solutionAudio": "Day01/New_PyDay01Question04sol.mp3",
        "validation": {
            "mode": "variable_check",
            "checkVars": [
                {
                    "name": "employee_count",
                    "type": "int",
                    "value": 150
                }
            ]
        }
    },
    {
        "id": 5,
        "prompt": "<strong>[Easy] Float (float) Variable Creation</strong><br/>Floats store decimal numbers. Create a float variable named <code>average_salary</code> with value <code>75450.50</code>, and print it.",
        "starterCode": "",
        "ref": "average_salary = 75450.50\nprint(\"Average Salary:\", average_salary)\n",
        "questionAudio": "Day01/New_PyDay01Question05.mp3",
        "solutionAudio": "Day01/New_PyDay01Question05sol.mp3",
        "validation": {
            "mode": "variable_check",
            "checkVars": [
                {
                    "name": "average_salary",
                    "type": "float",
                    "value": 75450.5
                }
            ]
        }
    },
    {
        "id": 6,
        "prompt": "<strong>[Easy] String (str) Variable Creation</strong><br/>Strings store text enclosed in quotation marks. Create a string variable named <code>company_name</code> with value <code>\"Manodemy\"</code>, and print it.",
        "starterCode": "",
        "ref": "company_name = \"Manodemy\"\nprint(\"Company Name:\", company_name)\n",
        "questionAudio": "Day01/New_PyDay01Question06.mp3",
        "solutionAudio": "Day01/New_PyDay01Question06sol.mp3",
        "validation": {
            "mode": "variable_check",
            "checkVars": [
                {
                    "name": "company_name",
                    "type": "string",
                    "value": "Manodemy"
                }
            ]
        }
    },
    {
        "id": 7,
        "prompt": "<strong>[Easy] Boolean (bool) Variable Creation</strong><br/>Booleans represent truth values and can only be <code>True</code> or <code>False</code> (capitalized). Create a boolean variable named <code>is_full_time</code> set to <code>True</code>, and print it.",
        "starterCode": "",
        "ref": "is_full_time = True\nprint(\"Full Time Status:\", is_full_time)\n",
        "questionAudio": "Day01/New_PyDay01Question07.mp3",
        "solutionAudio": "Day01/New_PyDay01Question07sol.mp3",
        "validation": {
            "mode": "variable_check",
            "checkVars": [
                {
                    "name": "is_full_time",
                    "type": "bool",
                    "value": true
                }
            ]
        }
    },
    {
        "id": 8,
        "prompt": "<strong>[Easy] List (list) Variable Creation</strong><br/>Lists are ordered, mutable sequences in square brackets <code>[]</code>. Create a list variable named <code>sales_figures</code> containing <code>[1200, 1450, 1800]</code>, and print it.",
        "starterCode": "",
        "ref": "sales_figures = [1200, 1450, 1800]\nprint(\"Sales Figures:\", sales_figures)\n",
        "questionAudio": "Day01/New_PyDay01Question08.mp3",
        "solutionAudio": "Day01/New_PyDay01Question08sol.mp3",
        "validation": {
            "mode": "variable_check",
            "checkVars": [
                {
                    "name": "sales_figures",
                    "type": "list",
                    "value": [
                        1200,
                        1450,
                        1800
                    ]
                }
            ]
        }
    },
    {
        "id": 9,
        "prompt": "<strong>[Easy] Tuple (tuple) Variable Creation</strong><br/>Tuples are ordered, immutable (locked) sequences in parentheses <code>()</code>. Create a tuple variable named <code>server_location</code> containing <code>(\"Mumbai\", 19.07, 72.87)</code>, and print it.",
        "starterCode": "",
        "ref": "server_location = (\"Mumbai\", 19.07, 72.87)\nprint(\"Server Location:\", server_location)\n",
        "questionAudio": "Day01/New_PyDay01Question09.mp3",
        "solutionAudio": "Day01/New_PyDay01Question09sol.mp3",
        "validation": {
            "mode": "variable_check",
            "checkVars": [
                {
                    "name": "server_location",
                    "type": "tuple"
                }
            ]
        }
    },
    {
        "id": 10,
        "prompt": "<strong>[Easy] Dictionary (dict) Variable Creation</strong><br/>Dictionaries store key-value pairs in curly braces <code>{}</code>. Create a dictionary named <code>customer_profile</code> with keys <code>\"name\": \"Aarav\"</code> and <code>\"orders\": 5</code>, and print it.",
        "starterCode": "",
        "ref": "customer_profile = {\"name\": \"Aarav\", \"orders\": 5}\nprint(\"Customer Profile:\", customer_profile)\n",
        "questionAudio": "Day01/New_PyDay01Question10.mp3",
        "solutionAudio": "Day01/New_PyDay01Question10sol.mp3",
        "validation": {
            "mode": "variable_check",
            "checkVars": [
                {
                    "name": "customer_profile",
                    "type": "dict",
                    "keys": [
                        "name",
                        "orders"
                    ]
                }
            ]
        }
    },
    {
        "id": 11,
        "prompt": "<strong>[Easy] Set (set) Variable Creation</strong><br/>Sets are collections of unique elements in curly braces <code>{}</code>. Create a set named <code>unique_tags</code> containing <code>{\"python\", \"sql\", \"analytics\"}</code>, and print it.",
        "starterCode": "",
        "ref": "unique_tags = {\"python\", \"sql\", \"analytics\"}\nprint(\"Unique Tags:\", unique_tags)\n",
        "questionAudio": "Day01/New_PyDay01Question11.mp3",
        "solutionAudio": "Day01/New_PyDay01Question11sol.mp3",
        "validation": {
            "mode": "variable_check",
            "checkVars": [
                {
                    "name": "unique_tags",
                    "type": "set"
                }
            ]
        }
    },
    {
        "id": 12,
        "prompt": "<strong>[Easy] NoneType (None) Variable Creation</strong><br/>In Python, <code>None</code> represents the absence of a value (like SQL <code>NULL</code>). Create a variable named <code>bonus_amount</code> assigned to <code>None</code>, and print it.",
        "starterCode": "",
        "ref": "bonus_amount = None\nprint(\"Bonus Amount:\", bonus_amount)\n",
        "questionAudio": "Day01/New_PyDay01Question12.mp3",
        "solutionAudio": "Day01/New_PyDay01Question12sol.mp3",
        "validation": {
            "mode": "variable_check",
            "checkVars": [
                {
                    "name": "bonus_amount",
                    "type": "none"
                }
            ]
        }
    },
    {
        "id": 13,
        "prompt": "<strong>[Hard] Composite Fraud Detection Keys (Tuple-Keyed defaultdict)</strong><br/>Build a composite fraud detection system. Create a <code>defaultdict(float)</code> named <code>fraud_map</code>. For each transaction in the list (each is a dict with <code>user_id</code>, <code>device</code>, <code>ip</code>, <code>amount</code>), form a tuple key <code>(user_id, device, ip)</code> and accumulate the <code>amount</code>.",
        "starterCode": "",
        "ref": "from collections import defaultdict\n\ntransactions = [\n    {\"user_id\": \"U01\", \"device\": \"mobile\", \"ip\": \"10.0.0.1\", \"amount\": 120.50},\n    {\"user_id\": \"U01\", \"device\": \"mobile\", \"ip\": \"10.0.0.1\", \"amount\": 340.00},\n    {\"user_id\": \"U02\", \"device\": \"desktop\", \"ip\": \"192.168.1.5\", \"amount\": 85.75},\n    {\"user_id\": \"U01\", \"device\": \"mobile\", \"ip\": \"10.0.0.2\", \"amount\": 500.00},\n]\n\nfraud_map = defaultdict(float)\nfor tx in transactions:\n    key = (tx[\"user_id\"], tx[\"device\"], tx[\"ip\"])\n    fraud_map[key] += tx[\"amount\"]\nprint(dict(fraud_map))\n",
        "questionAudio": "Day01/New_PyDay01Question13.mp3",
        "solutionAudio": "Day01/New_PyDay01Question13sol.mp3",
        "validation": {
            "mode": "variable_check",
            "checkVars": [
                {
                    "name": "fraud_map",
                    "type": "dict"
                }
            ]
        }
    },
    {
        "id": 14,
        "prompt": "<strong>[Hard] Recursive Nested Dict Flattener with None Coalescing</strong><br/>Write a recursive function <code>flatten_dict(d, parent_key='')</code> that converts nested dictionaries into flat dot-notation keys. Replace any <code>None</code> values with the string <code>'N/A'</code>. Store the result of flattening <code>nested</code> in <code>flat</code>.",
        "starterCode": "",
        "ref": "nested = {\n    \"user\": {\n        \"name\": \"Aarav\",\n        \"address\": {\n            \"city\": \"Mumbai\",\n            \"pin\": None\n        }\n    },\n    \"score\": 95\n}\n\ndef flatten_dict(d, parent_key=''):\n    items = {}\n    for k, v in d.items():\n        new_key = f\"{parent_key}.{k}\" if parent_key else k\n        if isinstance(v, dict):\n            items.update(flatten_dict(v, new_key))\n        else:\n            items[new_key] = 'N/A' if v is None else v\n    return items\n\nflat = flatten_dict(nested)\nprint(flat)\n",
        "questionAudio": "Day01/New_PyDay01Question14.mp3",
        "solutionAudio": "Day01/New_PyDay01Question14sol.mp3",
        "validation": {
            "mode": "variable_check",
            "checkVars": [
                {
                    "name": "flat",
                    "type": "dict",
                    "keys": ["user.name", "user.address.city", "user.address.pin", "score"]
                }
            ]
        }
    },
    {
        "id": 15,
        "prompt": "<strong>[Hard] Dynamic List Over-Allocation Growth Tracker</strong><br/>Track when Python's list allocator jumps in size. Append integers 0–20 to a list one at a time. Each time <code>sys.getsizeof(lst)</code> increases versus the previous step, record a tuple <code>(index, size)</code> into a list named <code>jump_sizes</code>.",
        "starterCode": "",
        "ref": "import sys\n\nlst = []\njump_sizes = []\nprev_size = sys.getsizeof(lst)\n\nfor i in range(21):\n    lst.append(i)\n    cur_size = sys.getsizeof(lst)\n    if cur_size > prev_size:\n        jump_sizes.append((i, cur_size))\n        prev_size = cur_size\n\nprint(jump_sizes)\n",
        "questionAudio": "Day01/New_PyDay01Question15.mp3",
        "solutionAudio": "Day01/New_PyDay01Question15sol.mp3",
        "validation": {
            "mode": "variable_check",
            "checkVars": [
                {
                    "name": "jump_sizes",
                    "type": "list"
                }
            ]
        }
    }
],

  testQuestions: [
    {
      id: 1,
      prompt: "Create a variable <code>sales = 1_000_000</code> using underscore separators. Store <code>type(sales).__name__</code> in <code>result_type</code> and the value in <code>result_value</code>.",
      starterCode: "",
      validation: {
        mode: "variable_check",
        checkVars: [
          { name: "result_type",  type: "string", value: "int" },
          { name: "result_value", type: "int",    value: 1000000 }
        ]
      }
    },
    {
      id: 2,
      prompt: "Compute <code>2 ** 200</code> and store the digit count via <code>len(str(...))</code> in <code>digit_count</code>. Python integers never overflow — prove it!",
      starterCode: "",
      validation: {
        mode: "variable_check",
        checkVars: [
          { name: "digit_count", type: "int", value: 61 }
        ]
      }
    },
    {
      id: 3,
      prompt: "Demonstrate the float trap: check <code>0.1 + 0.2 == 0.3</code> (store in <code>is_equal</code>, expect <code>False</code>). Then fix with <code>math.isclose()</code> (store in <code>is_close_ok</code>, expect <code>True</code>).",
      starterCode: "",
      validation: {
        mode: "variable_check",
        checkVars: [
          { name: "is_equal",    type: "bool", value: false },
          { name: "is_close_ok", type: "bool", value: true }
        ]
      }
    },
    {
      id: 4,
      prompt: "Test integer caching: <code>a = 100; b = 100</code>, check <code>a is b</code> → store in <code>small_int_is</code>. Then <code>a = 300; b = 300</code>, check again → store in <code>big_int_is</code>. CPython caches -5 to 256; above that, <code>is</code> is undefined behavior!",
      starterCode: "",
      validation: {
        mode: "variable_check",
        checkVars: [
          { name: "small_int_is", type: "bool", value: true }
        ]
      }
    },
    {
      id: 5,
      prompt: "NaN trap: store <code>math.nan != math.nan</code> in <code>nan_check</code> (expect <code>True</code>). Explain in a comment why this silently breaks naive <code>value == some_nan</code> deduplication logic.",
      starterCode: "",
      validation: {
        mode: "variable_check",
        checkVars: [
          { name: "nan_check", type: "bool", value: true }
        ]
      }
    },
    {
      id: 6,
      prompt: "Reverse <code>\"DataAnalyst\"</code> using slicing; store the result in <code>result</code>.",
      starterCode: "",
      validation: {
        mode: "variable_check",
        checkVars: [
          { name: "result", type: "string", value: "tsylananataD" }
        ]
      }
    },
    {
      id: 7,
      prompt: "Check falsiness of <code>\"\"</code>, <code>0</code>, <code>[]</code>, <code>{}</code>, <code>None</code>, and <code>0.0</code> — store results as a list of booleans in <code>result</code> (all should be <code>False</code>).",
      starterCode: "",
      validation: {
        mode: "variable_check",
        checkVars: [
          { name: "result", type: "list", value: [false, false, false, false, false, false] }
        ]
      }
    },
    {
      id: 8,
      prompt: "Create a <code>frozenset({1,2,3})</code>, attempt <code>.add(4)</code>, catch the <code>AttributeError</code>, and store the exception's type name in <code>error_type</code>.",
      starterCode: "",
      validation: {
        mode: "variable_check",
        checkVars: [
          { name: "error_type", type: "string", value: "AttributeError" }
        ]
      }
    },
    {
      id: 9,
      prompt: "Use <code>sys.getsizeof()</code> to compare memory: <code>int(0)</code>, <code>float(0.0)</code>, <code>bool(False)</code>. Store as a dict <code>result</code> mapping type name → byte size.",
      starterCode: "",
      validation: {
        mode: "variable_check",
        checkVars: [
          { name: "result", type: "dict", keys: ["int", "float", "bool"] }
        ]
      }
    },
    {
      id: 10,
      prompt: "Find the intersection of <code>{1,2,3,4}</code> and <code>{3,4,5,6}</code> using the <code>&</code> operator; store in <code>result</code>.",
      starterCode: "",
      validation: {
        mode: "variable_check",
        checkVars: [
          { name: "result", type: "set", value: [3, 4] }
        ]
      }
    },
    {
      id: 11,
      prompt: "Create a <code>namedtuple Employee(name, salary, dept)</code>, instantiate one record, and access fields by name. Store the salary in <code>result</code>.",
      starterCode: "",
      validation: {
        mode: "variable_check",
        checkVars: [
          { name: "result", type: "int", value: 112800 }
        ]
      }
    },
    {
      id: 12,
      prompt: "Demonstrate string interning: <code>a = 'hello'; b = 'hello'</code>; check <code>a is b</code>, store in <code>result</code>. Explain in a comment why this should NEVER be relied on in application logic.",
      starterCode: "",
      validation: {
        mode: "variable_check",
        checkVars: [
          { name: "result", type: "truthy" }  // True in CPython for compile-time literals
        ]
      }
    },
    {
      id: 13,
      prompt: "Prove <code>bool</code> is a subclass of <code>int</code>: check <code>isinstance(True, int)</code> (store in <code>is_subclass</code>) and compute <code>True + True + False</code> (store in <code>sum_result</code>, expect <code>2</code>).",
      starterCode: "",
      validation: {
        mode: "variable_check",
        checkVars: [
          { name: "is_subclass", type: "bool",  value: true },
          { name: "sum_result",  type: "int",   value: 2 }
        ]
      }
    },
    {
      id: 14,
      prompt: "Conversion pipeline: <code>\"3.14\"</code> → <code>float</code> → <code>int</code> → <code>complex</code>. Store each intermediate in <code>step1</code>, <code>step2</code>, <code>step3</code>.",
      starterCode: "",
      validation: {
        mode: "variable_check",
        checkVars: [
          { name: "step1", type: "float", value: 3.14, tolerance: 0.001 },
          { name: "step2", type: "int",   value: 3 }
        ]
      }
    },
    {
      id: 15,
      prompt: "Build a <code>defaultdict(list)</code> grouping a list of names by first letter. Store the resulting dict in <code>result</code>.",
      starterCode: "",
      validation: {
        mode: "variable_check",
        checkVars: [
          { name: "result", type: "dict", keys: ["A", "B", "C", "D"] }
        ]
      }
    },
    {
      id: 16,
      prompt: "Demonstrate the mutable-default-argument trap: define <code>def add(item, lst=[])</code>, call it twice with different items. Store both return values in <code>call1</code>, <code>call2</code> — showing accumulation, not two fresh lists!",
      starterCode: "",
      validation: {
        mode: "variable_check",
        checkVars: [
          { name: "call2", type: "list", length: 2 }
        ]
      }
    },
    {
      id: 17,
      prompt: "Compare <code>dict.get(\"key\", \"default\")</code> vs <code>dict[\"key\"]</code> on a missing key. Store the <code>.get()</code> result in <code>safe_result</code> and the exception type name in <code>error_type</code>.",
      starterCode: "",
      validation: {
        mode: "variable_check",
        checkVars: [
          { name: "safe_result", type: "string", value: "Not Available" },
          { name: "error_type",  type: "string", value: "KeyError" }
        ]
      }
    },
    {
      id: 18,
      prompt: "Tuple unpacking with <code>*</code>: <code>a, *b, c = (1,2,3,4,5)</code>. Store <code>a</code>, <code>b</code>, <code>c</code> separately.",
      starterCode: "",
      validation: {
        mode: "variable_check",
        checkVars: [
          { name: "a", type: "int",  value: 1 },
          { name: "b", type: "list", value: [2, 3, 4] },
          { name: "c", type: "int",  value: 5 }
        ]
      }
    },
    {
      id: 19,
      prompt: "Shallow copy trap: <code>a=[[1,2],[3,4]]; b=a.copy(); b[0][0]=99</code>. Store <code>a</code> after mutation in <code>result</code> (trap: <code>a</code> is affected!). Fix with <code>copy.deepcopy</code>, store in <code>result_fixed</code>.",
      starterCode: "",
      validation: {
        mode: "variable_check",
        checkVars: [
          { name: "result",       type: "list", value: [[99,2],[3,4]] },
          { name: "result_fixed", type: "list", value: [[1,2],[3,4]] }
        ]
      }
    },
    {
      id: 20,
      prompt: "Use <code>Counter(\"mississippi\")</code> and store the 3 most common characters (with counts) in <code>result</code> using <code>.most_common(3)</code>.",
      starterCode: "",
      validation: {
        mode: "variable_check",
        checkVars: [
          { name: "result", type: "list", length: 3 }
        ]
      }
    },
    {
      id: 21,
      prompt: "Categorical data with <code>Enum</code>: define <code>class Status(Enum)</code> with <code>ACTIVE=1, INACTIVE=2, PENDING=3</code>. Store <code>Status.ACTIVE.value</code> in <code>result</code>. Add a comment explaining why Enum beats raw strings for categorical columns.",
      starterCode: "",
      validation: {
        mode: "variable_check",
        checkVars: [
          { name: "result", type: "int", value: 1 }
        ]
      }
    },
    {
      id: 22,
      prompt: "Build a <code>dict</code> from two parallel lists using <code>dict(zip([\"a\",\"b\",\"c\"], [1,2,3]))</code>; store in <code>result</code>.",
      starterCode: "",
      validation: {
        mode: "variable_check",
        checkVars: [
          { name: "result", type: "dict", keys: ["revenue", "cost", "profit"] }
        ]
      }
    },
    {
      id: 23,
      prompt: "Use <code>float('inf')</code> as a seed to find the minimum of a list WITHOUT using <code>min()</code>; store in <code>result</code>.",
      starterCode: "",
      validation: {
        mode: "variable_check",
        checkVars: [
          { name: "result", type: "int", value: 5 }
        ]
      }
    },
    {
      id: 24,
      prompt: "Type-based dispatch: build <code>dispatch = {int: lambda x: x*2, str: lambda x: x.upper()}</code> and call <code>dispatch[type(5)](5)</code>. Store result in <code>result</code>.",
      starterCode: "",
      validation: {
        mode: "variable_check",
        checkVars: [
          { name: "result", type: "int", value: 10 }
        ]
      }
    },
    {
      id: 25,
      prompt: "Time comparison: measure lookup time of <code>x in a_list</code> vs <code>x in a_set</code> (1000 elements each). Store durations in <code>list_time</code>, <code>set_time</code>, and a boolean <code>set_faster</code> (expect <code>True</code>).",
      starterCode: "",
      validation: {
        mode: "variable_check",
        checkVars: [
          { name: "set_faster", type: "bool", value: true }
        ]
      }
    }
  ]
};
