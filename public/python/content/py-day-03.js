window.COURSE_CONTENT = window.COURSE_CONTENT || {};
window.COURSE_CONTENT.pyDay03 = {
  "day": 3,
  "title": "Strings & Text Processing",
  "duration": "60 min",
  "slides": [
    {
      "id": 0,
      "title": "Python Strings & Text Processing",
      "html": "<style>\n\n  /* ══════════════════════════════════════════════════════════\n     BASE & DARK THEME (DEFAULT)\n     ══════════════════════════════════════════════════════════ */\n\n  /* ── Flagship Dual-Box Heading Architecture (SQL Day 01 Parity) ── */\n  .heading-box-wrap,\n  .slide-section-title.heading-box-wrap {\n    display: flex !important;\n    align-items: stretch !important;\n    gap: 0 !important;\n    background: transparent !important;\n    border: none !important;\n    padding: 0 !important;\n    margin: 24px 0 14px 0 !important;\n    filter: drop-shadow(0 4px 14px rgba(0, 0, 0, 0.35)) !important;\n  }\n  .slide-section:first-child .heading-box-wrap,\n  #day01WhyPythonSection .heading-box-wrap {\n    margin-top: 4px !important;\n  }\n\n  /* Left Box: Monospace Number Badge (Exact SQL Day 01 Parity from 2nd Image) */\n  .heading-num-box {\n    display: inline-flex !important;\n    align-items: center !important;\n    justify-content: center !important;\n    background: linear-gradient(135deg, #6366f1, #8b5cf6) !important;\n    color: #ffffff !important;\n    font-family: 'JetBrains Mono', var(--mono, monospace) !important;\n    font-size: 0.88rem !important;\n    font-weight: 800 !important;\n    letter-spacing: 0.05em !important;\n    padding: 8px 14px !important;\n    border-radius: 8px 0 0 8px !important;\n    border: 1px solid rgba(139, 92, 246, 0.6) !important;\n    border-right: none !important;\n    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.25) !important;\n    flex-shrink: 0 !important;\n    min-width: 44px !important;\n    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3) !important;\n  }\n\n  /* Right Box: Matte Title Box (Always Deep Obsidian Dark — Exact 2nd Image Parity) */\n  .heading-title-box {\n    display: flex !important;\n    align-items: center !important;\n    justify-content: space-between !important;\n    flex: 1 !important;\n    background: #0f172a !important; /* Deep obsidian matte from SQL Day 01 */\n    border: 1px solid rgba(255, 255, 255, 0.08) !important;\n    border-left: 1px solid rgba(139, 92, 246, 0.4) !important;\n    border-radius: 0 8px 8px 0 !important;\n    padding: 8px 16px !important;\n    color: #f8fafc !important;\n    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05) !important;\n  }\n\n  .heading-title-text {\n    flex: 1 !important;\n    color: #f8fafc !important;\n    font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif !important;\n    font-size: 1.05rem !important;\n    font-weight: 800 !important;\n    letter-spacing: -0.015em !important;\n    line-height: 1.35 !important;\n    display: flex !important;\n    align-items: center !important;\n    gap: 10px !important;\n  }\n\n  .heading-icon {\n    font-size: 1.15rem !important;\n    display: inline-flex !important;\n    align-items: center !important;\n    line-height: 1 !important;\n  }\n\n  /* Audio Play Button in Heading */\n  .heading-title-box .audio-play-btn,\n  .heading-with-audio .audio-play-btn {\n    width: 26px !important;\n    height: 26px !important;\n    min-width: 26px !important;\n    min-height: 26px !important;\n    max-width: 26px !important;\n    max-height: 26px !important;\n    border-radius: 6px !important;\n    border: 1px solid rgba(255, 255, 255, 0.14) !important;\n    background: rgba(255, 255, 255, 0.08) !important;\n    color: #94a3b8 !important;\n    cursor: pointer !important;\n    display: inline-flex !important;\n    align-items: center !important;\n    justify-content: center !important;\n    padding: 0 !important;\n    margin: 0 !important;\n    flex-shrink: 0 !important;\n    transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease, transform 0.15s ease !important;\n  }\n\n  .heading-title-box .audio-play-btn:hover,\n  .heading-with-audio .audio-play-btn:hover {\n    background: #ef4444 !important;\n    border-color: #ef4444 !important;\n    color: #ffffff !important;\n    box-shadow: 0 0 10px rgba(239, 68, 68, 0.45) !important;\n    transform: scale(1.05) !important;\n  }\n\n  .heading-title-box .audio-play-btn.playing,\n  .heading-with-audio .audio-play-btn.playing {\n    background: #ef4444 !important;\n    border-color: #ef4444 !important;\n    color: #ffffff !important;\n    box-shadow: 0 0 12px rgba(239, 68, 68, 0.5) !important;\n  }\n\n  /* General Typography & Heading Hierarchy (Dark Mode) */\n  .slide-section h1,\n  .slide-section h2,\n  .slide-section h3,\n  .slide-section h4 {\n    font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif !important;\n    color: #f8fafc !important;\n    letter-spacing: -0.015em !important;\n  }\n\n  @media (max-width: 640px) {\n    .heading-num-box {\n      font-size: 0.80rem !important;\n      padding: 7px 10px !important;\n      min-width: 40px !important;\n    }\n    .heading-title-box {\n      padding: 7px 12px !important;\n    }\n    .heading-title-text {\n      font-size: 0.88rem !important;\n      gap: 6px !important;\n    }\n    .heading-icon {\n      font-size: 1rem !important;\n    }\n    .heading-title-box .audio-play-btn {\n      width: 24px !important;\n      height: 24px !important;\n      min-width: 24px !important;\n      min-height: 24px !important;\n    }\n  }\n\n  .py-infographic-card {\n    background: linear-gradient(135deg, rgba(15, 23, 42, 0.96) 0%, rgba(8, 14, 28, 0.98) 100%);\n    border: 1px solid rgba(255, 255, 255, 0.08);\n    border-radius: 12px;\n    padding: 16px 18px;\n    margin: 14px 0;\n    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.05);\n    transition: background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;\n  }\n  .py-info-header {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: 10px;\n    margin-bottom: 12px;\n    padding-bottom: 8px;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.06);\n  }\n  .py-info-title {\n    font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;\n    font-size: 0.82rem;\n    font-weight: 800;\n    text-transform: uppercase;\n    letter-spacing: 0.08em;\n    color: #38bdf8;\n    display: flex;\n    align-items: center;\n    gap: 8px;\n  }\n  .py-badge {\n    font-family: 'JetBrains Mono', monospace;\n    font-size: 0.68rem;\n    font-weight: 700;\n    padding: 2px 8px;\n    border-radius: 4px;\n    background: rgba(56, 189, 248, 0.12);\n    border: 1px solid rgba(56, 189, 248, 0.28);\n    color: #38bdf8;\n  }\n  .py-badge-gold {\n    background: rgba(245, 158, 11, 0.12);\n    border-color: rgba(245, 158, 11, 0.28);\n    color: #fbbf24;\n  }\n  .py-badge-green {\n    background: rgba(34, 197, 94, 0.12);\n    border-color: rgba(34, 197, 94, 0.28);\n    color: #4ade80;\n  }\n  .py-badge-purple {\n    background: rgba(168, 85, 247, 0.12);\n    border-color: rgba(168, 85, 247, 0.28);\n    color: #c084fc;\n  }\n  .py-badge-rose {\n    background: rgba(244, 63, 94, 0.12);\n    border-color: rgba(244, 63, 94, 0.28);\n    color: #fb7185;\n  }\n\n  /* CPython Object Header Grid */\n  .cpython-grid {\n    display: grid;\n    grid-template-columns: repeat(4, 1fr);\n    gap: 8px;\n    margin-top: 10px;\n  }\n  @media (max-width: 640px) {\n    .cpython-grid { grid-template-columns: 1fr 1fr; }\n  }\n  .cpython-cell {\n    background: rgba(255, 255, 255, 0.03);\n    border: 1px solid rgba(255, 255, 255, 0.07);\n    border-radius: 8px;\n    padding: 10px;\n    text-align: center;\n    transition: all 0.2s ease;\n  }\n  .cpython-cell:hover {\n    background: rgba(56, 189, 248, 0.06);\n    border-color: rgba(56, 189, 248, 0.3);\n  }\n  .cpython-cell-size {\n    font-family: 'JetBrains Mono', monospace;\n    font-size: 0.65rem;\n    font-weight: 700;\n    color: #94a3b8;\n    margin-bottom: 4px;\n  }\n  .cpython-cell-name {\n    font-family: 'JetBrains Mono', monospace;\n    font-size: 0.78rem;\n    font-weight: 800;\n    color: #f8fafc;\n  }\n  .cpython-cell-desc {\n    font-size: 0.70rem;\n    color: #64748b;\n    margin-top: 4px;\n    line-height: 1.3;\n  }\n\n  /* Mutability Cards Base */\n  .py-mut-card {\n    border-radius: 8px;\n    padding: 12px;\n    transition: all 0.2s ease;\n  }\n  .py-mut-card.mut-green {\n    background: rgba(16, 185, 129, 0.06);\n    border: 1px solid rgba(16, 185, 129, 0.25);\n  }\n  .py-mut-card.mut-rose {\n    background: rgba(244, 63, 94, 0.06);\n    border: 1px solid rgba(244, 63, 94, 0.25);\n  }\n  .py-mut-card p {\n    font-size: 0.75rem;\n    color: #cbd5e1;\n    margin: 0 0 8px;\n    line-height: 1.45;\n  }\n  .py-mut-card .mut-ex {\n    font-size: 0.70rem;\n    color: #94a3b8;\n    margin-bottom: 6px;\n  }\n\n  /* Memory Cards Base */\n  .py-mem-card {\n    background: rgba(255, 255, 255, 0.03);\n    border: 1px solid rgba(255, 255, 255, 0.07);\n    border-radius: 8px;\n    padding: 12px;\n    transition: all 0.2s ease;\n  }\n  .py-mem-card-title {\n    font-family: 'JetBrains Mono', monospace;\n    font-size: 0.80rem;\n    font-weight: 800;\n    margin-bottom: 4px;\n  }\n  .py-mem-blue { color: #38bdf8; }\n  .py-mem-green { color: #4ade80; }\n  .py-mem-amber { color: #fbbf24; }\n  .py-mem-purple { color: #c084fc; }\n  .py-mem-card .py-mem-desc {\n    font-size: 0.75rem;\n    color: #cbd5e1;\n    line-height: 1.5;\n  }\n\n  /* Code Block Box */\n  .py-code-box {\n    margin: 0;\n    padding: 8px 10px;\n    background: rgba(0, 0, 0, 0.45);\n    border: 1px solid rgba(255, 255, 255, 0.08);\n    border-radius: 6px;\n    font-size: 0.74rem;\n    color: #f8fafc;\n    font-family: 'JetBrains Mono', monospace;\n  }\n\n  /* ══════════════════════════════════════════════════════════\n     SUPERPOWERS FLAGSHIP SHOWCASE DESIGN (DARK THEME)\n     ══════════════════════════════════════════════════════════ */\n  .py-sp-showcase {\n    background: linear-gradient(145deg, rgba(15, 23, 42, 0.96) 0%, rgba(10, 16, 31, 0.98) 100%);\n    border: 1px solid rgba(255, 255, 255, 0.08);\n    border-radius: 14px;\n    padding: 20px 22px;\n    margin: 16px 0;\n    box-shadow: 0 16px 40px -10px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.06);\n    transition: background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;\n  }\n  .py-sp-header {\n    margin-bottom: 18px;\n    padding-bottom: 14px;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.08);\n  }\n  .py-sp-title-row {\n    display: flex;\n    align-items: center;\n    gap: 14px;\n    flex-wrap: wrap;\n  }\n  .py-sp-header-icon {\n    width: 42px;\n    height: 42px;\n    border-radius: 12px;\n    background: linear-gradient(135deg, rgba(56, 189, 248, 0.16) 0%, rgba(99, 102, 241, 0.22) 100%);\n    border: 1px solid rgba(56, 189, 248, 0.35);\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-size: 1.25rem;\n    flex-shrink: 0;\n    box-shadow: 0 4px 14px rgba(56, 189, 248, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.1);\n  }\n  .py-sp-header-text {\n    display: flex;\n    flex-direction: column;\n    gap: 2px;\n    flex: 1;\n  }\n  .py-sp-title {\n    margin: 0;\n    font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;\n    font-size: 1.12rem;\n    font-weight: 800;\n    letter-spacing: -0.015em;\n    color: #f8fafc !important;\n    line-height: 1.3;\n  }\n  .py-sp-subtitle {\n    margin: 3px 0 0 0;\n    font-size: 0.82rem;\n    color: #94a3b8 !important;\n    font-weight: 500;\n    letter-spacing: 0.01em;\n    line-height: 1.4;\n  }\n  .py-sp-grid {\n    display: grid;\n    grid-template-columns: repeat(2, 1fr);\n    gap: 12px;\n  }\n  @media (max-width: 680px) {\n    .py-sp-grid { grid-template-columns: 1fr; }\n  }\n  .py-sp-card {\n    background: rgba(255, 255, 255, 0.025);\n    border: 1px solid rgba(255, 255, 255, 0.07);\n    border-radius: 12px;\n    padding: 14px 16px;\n    display: flex;\n    flex-direction: column;\n    justify-content: space-between;\n    transition: all 0.22s cubic-bezier(0.4, 0, 0.2, 1);\n    position: relative;\n    overflow: hidden;\n  }\n  .py-sp-card:hover {\n    transform: translateY(-2px);\n    background: rgba(255, 255, 255, 0.04);\n    box-shadow: 0 10px 24px -6px rgba(0, 0, 0, 0.4);\n  }\n  .py-sp-card::before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    height: 2px;\n    opacity: 0.85;\n  }\n  .py-sp-card.sp-blue::before { background: linear-gradient(90deg, #38bdf8, transparent); }\n  .py-sp-card.sp-blue:hover { border-color: rgba(56, 189, 248, 0.4); }\n  .py-sp-card.sp-green::before { background: linear-gradient(90deg, #34d399, transparent); }\n  .py-sp-card.sp-green:hover { border-color: rgba(52, 211, 153, 0.4); }\n  .py-sp-card.sp-amber::before { background: linear-gradient(90deg, #fbbf24, transparent); }\n  .py-sp-card.sp-amber:hover { border-color: rgba(251, 191, 36, 0.4); }\n  .py-sp-card.sp-purple::before { background: linear-gradient(90deg, #c084fc, transparent); }\n  .py-sp-card.sp-purple:hover { border-color: rgba(192, 132, 252, 0.4); }\n\n  .py-sp-card-top {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    margin-bottom: 10px;\n  }\n  .py-sp-card-header {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n  }\n  .py-sp-icon {\n    width: 32px;\n    height: 32px;\n    border-radius: 8px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-size: 1rem;\n    flex-shrink: 0;\n  }\n  .sp-blue .py-sp-icon { background: rgba(56, 189, 248, 0.12); border: 1px solid rgba(56, 189, 248, 0.25); }\n  .sp-green .py-sp-icon { background: rgba(52, 211, 153, 0.12); border: 1px solid rgba(52, 211, 153, 0.25); }\n  .sp-amber .py-sp-icon { background: rgba(251, 191, 36, 0.12); border: 1px solid rgba(251, 191, 36, 0.25); }\n  .sp-purple .py-sp-icon { background: rgba(192, 132, 252, 0.12); border: 1px solid rgba(192, 132, 252, 0.25); }\n\n  .py-sp-card-title {\n    font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;\n    font-size: 0.88rem;\n    font-weight: 700;\n    color: #f8fafc !important;\n  }\n  .py-sp-num {\n    font-family: 'JetBrains Mono', monospace;\n    font-size: 0.68rem;\n    font-weight: 800;\n    padding: 2px 7px;\n    border-radius: 4px;\n  }\n  .sp-blue .py-sp-num { color: #38bdf8; background: rgba(56, 189, 248, 0.1); border: 1px solid rgba(56, 189, 248, 0.2); }\n  .sp-green .py-sp-num { color: #34d399; background: rgba(52, 211, 153, 0.1); border: 1px solid rgba(52, 211, 153, 0.2); }\n  .sp-amber .py-sp-num { color: #fbbf24; background: rgba(251, 191, 36, 0.1); border: 1px solid rgba(251, 191, 36, 0.2); }\n  .sp-purple .py-sp-num { color: #c084fc; background: rgba(192, 132, 252, 0.1); border: 1px solid rgba(192, 132, 252, 0.2); }\n\n  .py-sp-desc {\n    font-size: 0.77rem;\n    line-height: 1.55;\n    color: #cbd5e1 !important;\n    margin: 0 0 10px 0;\n  }\n  .py-sp-tag {\n    display: inline-flex;\n    align-items: center;\n    gap: 5px;\n    font-size: 0.70rem;\n    font-weight: 600;\n    padding: 3px 8px;\n    border-radius: 6px;\n    background: rgba(255, 255, 255, 0.04);\n    border: 1px solid rgba(255, 255, 255, 0.07);\n    color: #e2e8f0;\n    align-self: flex-start;\n  }\n\n  /* 05 AI Flagship Banner */\n  .py-sp-ai-banner {\n    margin-top: 12px;\n    background: linear-gradient(135deg, rgba(147, 51, 234, 0.15) 0%, rgba(79, 70, 229, 0.12) 50%, rgba(15, 23, 42, 0.85) 100%);\n    border: 1px solid rgba(168, 85, 247, 0.35);\n    border-radius: 12px;\n    padding: 16px 18px;\n    display: flex;\n    align-items: center;\n    gap: 16px;\n    box-shadow: 0 10px 28px -6px rgba(147, 51, 234, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.08);\n    transition: all 0.22s ease;\n  }\n  .py-sp-ai-banner:hover {\n    border-color: rgba(168, 85, 247, 0.55);\n    box-shadow: 0 12px 32px -4px rgba(147, 51, 234, 0.35);\n  }\n  .py-sp-ai-icon {\n    width: 42px;\n    height: 42px;\n    border-radius: 10px;\n    background: linear-gradient(135deg, #a855f7 0%, #ec4899 100%);\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-size: 1.25rem;\n    flex-shrink: 0;\n    box-shadow: 0 4px 14px rgba(168, 85, 247, 0.4);\n  }\n  .py-sp-ai-body { flex: 1; }\n  .py-sp-ai-title-row {\n    display: flex;\n    align-items: center;\n    gap: 8px;\n    margin-bottom: 4px;\n    flex-wrap: wrap;\n  }\n  .py-sp-ai-title {\n    font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;\n    font-size: 0.92rem;\n    font-weight: 800;\n    color: #fdf4ff !important;\n    letter-spacing: -0.01em;\n  }\n  .py-sp-ai-pill {\n    font-family: 'JetBrains Mono', monospace;\n    font-size: 0.65rem;\n    font-weight: 700;\n    padding: 2px 7px;\n    border-radius: 4px;\n    background: rgba(236, 72, 153, 0.16);\n    border: 1px solid rgba(236, 72, 153, 0.38);\n    color: #f472b6;\n  }\n  .py-sp-ai-text {\n    font-size: 0.78rem;\n    color: #e2e8f0 !important;\n    line-height: 1.55;\n    margin: 0;\n  }\n  .py-sp-code-pill {\n    display: inline-block;\n    background: rgba(168, 85, 247, 0.22) !important;\n    color: #f5d0fe !important;\n    border: 1px solid rgba(168, 85, 247, 0.45) !important;\n    padding: 1px 7px !important;\n    border-radius: 5px !important;\n    font-family: 'JetBrains Mono', monospace !important;\n    font-size: 0.73rem !important;\n    font-weight: 600 !important;\n    vertical-align: middle;\n  }\n\n  /* ══════════════════════════════════════════════════════════\n     LIGHT MODE THEME ADAPTATIONS ([data-theme=\"light\"])\n     ══════════════════════════════════════════════════════════ */\n\n  /* ── Keep Heading Box Dark in Light Mode (Exactly Like 2nd Image) ── */\n  [data-theme=\"light\"] .heading-box-wrap,\n  [data-theme=\"light\"] .slide-section-title.heading-box-wrap {\n    filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.16)) !important;\n  }\n  [data-theme=\"light\"] .heading-num-box {\n    background: linear-gradient(135deg, #6366f1, #8b5cf6) !important;\n    color: #ffffff !important;\n    border: 1px solid rgba(139, 92, 246, 0.6) !important;\n    border-right: none !important;\n    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.25) !important;\n    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3) !important;\n  }\n  [data-theme=\"light\"] .heading-title-box {\n    background: #0f172a !important; /* Retain deep obsidian matte in light mode */\n    border: 1px solid rgba(255, 255, 255, 0.08) !important;\n    border-left: 1px solid rgba(139, 92, 246, 0.4) !important;\n    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 3px 10px rgba(0, 0, 0, 0.12) !important;\n  }\n  [data-theme=\"light\"] .heading-title-text {\n    color: #f8fafc !important; /* Crisp white text inside dark box */\n  }\n  [data-theme=\"light\"] .heading-title-box .audio-play-btn {\n    background: rgba(255, 255, 255, 0.08) !important;\n    border: 1px solid rgba(255, 255, 255, 0.12) !important;\n    color: #94a3b8 !important;\n  }\n  [data-theme=\"light\"] .heading-title-box .audio-play-btn:hover {\n    background: #ef4444 !important;\n    border-color: #ef4444 !important;\n    color: #ffffff !important;\n    box-shadow: 0 0 10px rgba(239, 68, 68, 0.4) !important;\n  }\n  [data-theme=\"light\"] .heading-title-box .audio-play-btn.playing {\n    background: #ef4444 !important;\n    border-color: #ef4444 !important;\n    color: #ffffff !important;\n    box-shadow: 0 0 10px rgba(239, 68, 68, 0.4) !important;\n  }\n  [data-theme=\"light\"] .slide-section h1,\n  [data-theme=\"light\"] .slide-section h2,\n  [data-theme=\"light\"] .slide-section h3,\n  [data-theme=\"light\"] .slide-section h4 {\n    color: #0f172a !important;\n  }\n\n  [data-theme=\"light\"] .py-sp-showcase {\n    background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);\n    border: 1px solid #e2e8f0;\n    box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.05), inset 0 1px 0 #ffffff;\n  }\n  [data-theme=\"light\"] .py-sp-header {\n    border-bottom: 1.5px solid #e2e8f0;\n    padding-bottom: 14px;\n    margin-bottom: 18px;\n  }\n  [data-theme=\"light\"] .py-sp-header-icon {\n    background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);\n    border: 1.5px solid #38bdf8;\n    box-shadow: 0 4px 14px rgba(2, 132, 199, 0.15);\n    width: 44px;\n    height: 44px;\n    border-radius: 12px;\n  }\n  [data-theme=\"light\"] .py-sp-title {\n    color: #0f172a !important;\n    font-size: 1.25rem !important;\n    font-weight: 800 !important;\n    letter-spacing: -0.02em !important;\n  }\n  [data-theme=\"light\"] .py-sp-subtitle {\n    color: #334155 !important;\n    font-size: 0.88rem !important;\n    font-weight: 500 !important;\n  }\n\n  /* Light Mode 4 Cards */\n  [data-theme=\"light\"] .py-sp-card {\n    background: #ffffff;\n    border: 1px solid #e2e8f0;\n    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);\n  }\n  [data-theme=\"light\"] .py-sp-card:hover {\n    background: #ffffff;\n    transform: translateY(-2px);\n    box-shadow: 0 10px 25px -4px rgba(0, 0, 0, 0.08);\n  }\n  [data-theme=\"light\"] .py-sp-card.sp-blue:hover { border-color: #38bdf8; }\n  [data-theme=\"light\"] .py-sp-card.sp-green:hover { border-color: #34d399; }\n  [data-theme=\"light\"] .py-sp-card.sp-amber:hover { border-color: #fbbf24; }\n  [data-theme=\"light\"] .py-sp-card.sp-purple:hover { border-color: #c084fc; }\n\n  [data-theme=\"light\"] .py-sp-card-title {\n    color: #0f172a !important;\n  }\n  [data-theme=\"light\"] .py-sp-desc { color: #1e293b !important; font-weight: 500; }\n  [data-theme=\"light\"] .sp-blue .py-sp-icon {\n    background: #f0f9ff;\n    border: 1px solid #bae6fd;\n  }\n  [data-theme=\"light\"] .sp-green .py-sp-icon {\n    background: #f0fdf4;\n    border: 1px solid #bbf7d0;\n  }\n  [data-theme=\"light\"] .sp-amber .py-sp-icon {\n    background: #fffbeb;\n    border: 1px solid #fde68a;\n  }\n  [data-theme=\"light\"] .sp-purple .py-sp-icon {\n    background: #faf5ff;\n    border: 1px solid #ddd6fe;\n  }\n  [data-theme=\"light\"] .sp-blue .py-sp-num {\n    color: #0284c7;\n    background: #e0f2fe;\n    border: 1px solid #bae6fd;\n  }\n  [data-theme=\"light\"] .sp-green .py-sp-num {\n    color: #16a34a;\n    background: #dcfce7;\n    border: 1px solid #bbf7d0;\n  }\n  [data-theme=\"light\"] .sp-amber .py-sp-num {\n    color: #d97706;\n    background: #fef3c7;\n    border: 1px solid #fde68a;\n  }\n  [data-theme=\"light\"] .sp-purple .py-sp-num {\n    color: #7c3aed;\n    background: #f3e8ff;\n    border: 1px solid #ddd6fe;\n  }\n  [data-theme=\"light\"] .py-sp-tag {\n    background: #f8fafc;\n    border: 1px solid #e2e8f0;\n    color: #334155;\n    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);\n  }\n\n  /* Light Mode 05 AI Banner */\n  [data-theme=\"light\"] .py-sp-ai-banner {\n    background: linear-gradient(135deg, #faf5ff 0%, #f5f3ff 50%, #ffffff 100%);\n    border: 1px solid #d8b4fe;\n    box-shadow: 0 8px 24px -4px rgba(124, 58, 237, 0.08), inset 0 1px 0 #ffffff;\n  }\n  [data-theme=\"light\"] .py-sp-ai-banner:hover {\n    border-color: #c084fc;\n    box-shadow: 0 12px 28px -4px rgba(124, 58, 237, 0.14);\n  }\n  [data-theme=\"light\"] .py-sp-ai-icon {\n    background: linear-gradient(135deg, #9333ea 0%, #db2777 100%);\n    box-shadow: 0 4px 12px rgba(147, 51, 234, 0.25);\n    color: #ffffff;\n  }\n  [data-theme=\"light\"] .py-sp-ai-title {\n    color: #581c87 !important;\n  }\n  [data-theme=\"light\"] .py-sp-ai-pill {\n    background: #fdf2f8;\n    border: 1px solid #fbcfe8;\n    color: #be185d;\n  }\n  [data-theme=\"light\"] .py-sp-ai-text {\n    color: #334155 !important;\n  }\n  [data-theme=\"light\"] .py-sp-code-pill {\n    background: #ede9fe !important;\n    color: #6d28d9 !important;\n    border: 1px solid #c4b5fd !important;\n  }\n\n  /* Other Cards Light Mode Adaptations */\n  [data-theme=\"light\"] .py-infographic-card {\n    background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);\n    border: 1px solid #e2e8f0;\n    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.04), inset 0 1px 0 #ffffff;\n  }\n  [data-theme=\"light\"] .py-info-header {\n    border-bottom: 1px solid #e2e8f0;\n  }\n  [data-theme=\"light\"] .py-info-title {\n    color: #0284c7;\n  }\n  [data-theme=\"light\"] .py-badge-gold {\n    background: #fef3c7;\n    border-color: #fde68a;\n    color: #b45309;\n  }\n  [data-theme=\"light\"] .py-badge-green {\n    background: #dcfce7;\n    border-color: #bbf7d0;\n    color: #15803d;\n  }\n  [data-theme=\"light\"] .py-badge-purple {\n    background: #f3e8ff;\n    border-color: #ddd6fe;\n    color: #6d28d9;\n  }\n  [data-theme=\"light\"] .py-badge-rose {\n    background: #ffe4e6;\n    border-color: #fecdd3;\n    color: #e11d48;\n  }\n  [data-theme=\"light\"] .cpython-cell {\n    background: #ffffff;\n    border: 1px solid #e2e8f0;\n  }\n  [data-theme=\"light\"] .cpython-cell:hover {\n    background: #f0f9ff;\n    border-color: #38bdf8;\n  }\n  [data-theme=\"light\"] .cpython-cell-size { color: #0284c7; font-weight: 700; }\n  [data-theme=\"light\"] .cpython-cell-name {\n    color: #0f172a;\n  }\n  [data-theme=\"light\"] .cpython-cell-desc { color: #1e293b; font-weight: 500; }\n\n  /* Mutability & Memory Light Mode */\n  [data-theme=\"light\"] .py-mut-card.mut-green {\n    background: #f0fdf4;\n    border: 1px solid #86efac;\n  }\n  [data-theme=\"light\"] .py-mut-card.mut-rose {\n    background: #fff1f2;\n    border: 1px solid #fecdd3;\n  }\n  [data-theme=\"light\"] .py-mut-card p {\n    color: #334155 !important;\n  }\n  [data-theme=\"light\"] .py-mut-card .mut-ex { color: #1e293b !important; font-weight: 600; }\n  [data-theme=\"light\"] .py-mem-card {\n    background: #ffffff;\n    border: 1px solid #e2e8f0;\n    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02);\n  }\n  [data-theme=\"light\"] .py-mem-card .py-mem-desc { color: #1e293b !important; font-weight: 500; }\n  [data-theme=\"light\"] .py-code-box {\n    background: #f8fafc;\n    border: 1px solid #e2e8f0;\n    color: #0f172a;\n  }\n  [data-theme=\"light\"] .py-code-box .code-comment { color: #047857; font-weight: 600; font-style: italic; }\n\n  /* ══════════════════════════════════════════════════════════\n     MUTABILITY ARCHITECTURE SHOWCASE (LIGHT & DARK DUAL THEME)\n     ══════════════════════════════════════════════════════════ */\n  .py-mut-showcase {\n    background: linear-gradient(145deg, rgba(15, 23, 42, 0.96) 0%, rgba(10, 16, 31, 0.98) 100%);\n    border: 1px solid rgba(255, 255, 255, 0.08);\n    border-radius: 14px;\n    padding: 20px 22px;\n    margin: 16px 0;\n    box-shadow: 0 16px 40px -10px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.06);\n    transition: all 0.3s ease;\n  }\n  .py-mut-header {\n    margin-bottom: 18px;\n    padding-bottom: 14px;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.08);\n  }\n  .py-mut-title-row {\n    display: flex;\n    align-items: center;\n    gap: 14px;\n    flex-wrap: wrap;\n  }\n  .py-mut-header-icon {\n    width: 42px;\n    height: 42px;\n    border-radius: 12px;\n    background: linear-gradient(135deg, rgba(168, 85, 247, 0.18) 0%, rgba(99, 102, 241, 0.22) 100%);\n    border: 1px solid rgba(168, 85, 247, 0.35);\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-size: 1.25rem;\n    flex-shrink: 0;\n    box-shadow: 0 4px 14px rgba(168, 85, 247, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1);\n  }\n  .py-mut-title {\n    margin: 0;\n    font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;\n    font-size: 1.12rem;\n    font-weight: 800;\n    letter-spacing: -0.015em;\n    color: #f8fafc !important;\n    line-height: 1.3;\n  }\n  .py-mut-subtitle {\n    margin: 6px 0 0 56px;\n    font-size: 0.88rem;\n    color: #94a3b8 !important;\n    font-weight: 500;\n    letter-spacing: 0.01em;\n    line-height: 1.4;\n  }\n  @media (max-width: 640px) {\n    .py-mut-subtitle {\n      margin-left: 0;\n    }\n  }\n\n  /* Dual Comparison Columns Grid */\n  .py-mut-grid {\n    display: grid;\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n    gap: 14px;\n  }\n  @media (max-width: 768px) {\n    .py-mut-grid { grid-template-columns: 1fr; }\n  }\n\n  .py-mut-panel {\n    border-radius: 12px;\n    padding: 16px;\n    display: flex;\n    flex-direction: column;\n    justify-content: flex-start;\n    transition: all 0.25s ease;\n    position: relative;\n    overflow: hidden;\n  }\n  .py-mut-panel::before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    height: 3px;\n  }\n\n  /* Mutable (Green) */\n  .py-mut-panel.panel-mutable {\n    background: rgba(16, 185, 129, 0.04);\n    border: 1px solid rgba(16, 185, 129, 0.22);\n  }\n  .py-mut-panel.panel-mutable::before {\n    background: linear-gradient(90deg, #10b981 0%, #34d399 100%);\n  }\n  .py-mut-panel.panel-mutable:hover {\n    border-color: rgba(16, 185, 129, 0.45);\n    box-shadow: 0 10px 25px -5px rgba(16, 185, 129, 0.15);\n  }\n\n  /* Immutable (Rose) */\n  .py-mut-panel.panel-immutable {\n    background: rgba(244, 63, 94, 0.04);\n    border: 1px solid rgba(244, 63, 94, 0.22);\n  }\n  .py-mut-panel.panel-immutable::before {\n    background: linear-gradient(90deg, #f43f5e 0%, #fb7185 100%);\n  }\n  .py-mut-panel.panel-immutable:hover {\n    border-color: rgba(244, 63, 94, 0.45);\n    box-shadow: 0 10px 25px -5px rgba(244, 63, 94, 0.15);\n  }\n\n  /* Distinct Box for Headings */\n  .py-mut-header-box {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: 10px;\n    padding: 10px 14px;\n    border-radius: 10px;\n    margin-bottom: 12px;\n    min-height: 64px;\n    box-sizing: border-box;\n    transition: all 0.2s ease;\n  }\n  .mut-header-green {\n    background: rgba(16, 185, 129, 0.08);\n    border: 1px solid rgba(16, 185, 129, 0.28);\n    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);\n  }\n  .mut-header-rose {\n    background: rgba(244, 63, 94, 0.08);\n    border: 1px solid rgba(244, 63, 94, 0.28);\n    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);\n  }\n\n  [data-theme=\"light\"] .mut-header-green {\n    background: #f0fdf4;\n    border: 1px solid #86efac;\n    box-shadow: 0 1px 4px rgba(16, 185, 129, 0.08);\n  }\n  [data-theme=\"light\"] .mut-header-rose {\n    background: #fff1f2;\n    border: 1px solid #fecdd3;\n    box-shadow: 0 1px 4px rgba(244, 63, 94, 0.08);\n  }\n\n  .py-mut-panel-title-wrap {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n  }\n  .py-mut-panel-icon {\n    width: 36px;\n    height: 36px;\n    border-radius: 8px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-size: 1.15rem;\n    flex-shrink: 0;\n  }\n  .mut-header-green .py-mut-panel-icon {\n    background: rgba(16, 185, 129, 0.16);\n    border: 1px solid rgba(16, 185, 129, 0.32);\n  }\n  [data-theme=\"light\"] .mut-header-green .py-mut-panel-icon {\n    background: #ffffff;\n    border: 1px solid #86efac;\n    box-shadow: 0 1px 2px rgba(16, 185, 129, 0.1);\n  }\n  .mut-header-rose .py-mut-panel-icon {\n    background: rgba(244, 63, 94, 0.16);\n    border: 1px solid rgba(244, 63, 94, 0.32);\n  }\n  [data-theme=\"light\"] .mut-header-rose .py-mut-panel-icon {\n    background: #ffffff;\n    border: 1px solid #fecdd3;\n    box-shadow: 0 1px 2px rgba(244, 63, 94, 0.1);\n  }\n\n  .py-mut-panel-name {\n    margin: 0;\n    font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;\n    font-size: 0.98rem;\n    font-weight: 800;\n    letter-spacing: -0.01em;\n  }\n  .mut-header-green .py-mut-panel-name { color: #4ade80 !important; }\n  [data-theme=\"light\"] .mut-header-green .py-mut-panel-name { color: #15803d !important; }\n  .mut-header-rose .py-mut-panel-name { color: #fb7185 !important; }\n  [data-theme=\"light\"] .mut-header-rose .py-mut-panel-name { color: #be123c !important; }\n\n  .py-mut-panel-sub {\n    display: block;\n    font-size: 0.68rem;\n    font-weight: 500;\n    color: #94a3b8;\n    white-space: nowrap;\n  }\n  [data-theme=\"light\"] .py-mut-panel-sub { display: block; font-size: 0.68rem; font-weight: 700; color: #1e293b; white-space: nowrap; }\n\n  /* Vertical Stacked Pill: \"Cannot\" / \"Change\" */\n  .py-mut-status-pill {\n    display: inline-flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    text-align: center;\n    line-height: 1.15;\n    font-family: 'JetBrains Mono', monospace;\n    font-size: 0.62rem;\n    font-weight: 800;\n    padding: 4px 8px;\n    border-radius: 6px;\n    white-space: nowrap;\n    flex-shrink: 0;\n    letter-spacing: 0.03em;\n    text-transform: uppercase;\n  }\n  .py-mut-status-pill span {\n    display: block;\n    line-height: 1.15;\n  }\n  .pill-mutable {\n    background: rgba(16, 185, 129, 0.18);\n    border: 1px solid rgba(16, 185, 129, 0.38);\n    color: #34d399;\n  }\n  [data-theme=\"light\"] .pill-mutable {\n    background: #dcfce7;\n    border: 1px solid #86efac;\n    color: #15803d;\n    box-shadow: 0 1px 2px rgba(16, 185, 129, 0.1);\n  }\n  .pill-immutable {\n    background: rgba(244, 63, 94, 0.18);\n    border: 1px solid rgba(244, 63, 94, 0.38);\n    color: #fb7185;\n  }\n  [data-theme=\"light\"] .pill-immutable {\n    background: #ffe4e6;\n    border: 1px solid #fecdd3;\n    color: #be123c;\n    box-shadow: 0 1px 2px rgba(244, 63, 94, 0.1);\n  }\n\n  .py-mut-desc {\n    font-size: 0.78rem;\n    line-height: 1.55;\n    color: #cbd5e1 !important;\n    margin: 0 0 12px 0;\n    min-height: 72px;\n    box-sizing: border-box;\n  }\n\n  .py-mut-types-row {\n    display: flex;\n    align-items: center;\n    gap: 6px;\n    margin-bottom: 12px;\n    min-height: 30px;\n    box-sizing: border-box;\n    flex-wrap: wrap;\n  }\n  .py-mut-types-label {\n    font-size: 0.70rem;\n    color: #94a3b8;\n    font-weight: 600;\n    text-transform: uppercase;\n    letter-spacing: 0.04em;\n  }\n  .py-mut-type-tag {\n    font-family: 'JetBrains Mono', monospace;\n    font-size: 0.70rem;\n    font-weight: 700;\n    padding: 1px 7px;\n    border-radius: 4px;\n  }\n  .panel-mutable .py-mut-type-tag {\n    background: rgba(16, 185, 129, 0.15);\n    border: 1px solid rgba(16, 185, 129, 0.3);\n    color: #6ee7b7;\n  }\n  .panel-immutable .py-mut-type-tag {\n    background: rgba(244, 63, 94, 0.15);\n    border: 1px solid rgba(244, 63, 94, 0.3);\n    color: #fca5a5;\n  }\n\n  /* Sleek Visual Code Card Inside Panel */\n  .py-mut-code-wrap {\n    background: rgba(0, 0, 0, 0.45);\n    border: 1px solid rgba(255, 255, 255, 0.08);\n    border-radius: 8px;\n    overflow: hidden;\n    min-height: 122px;\n    box-sizing: border-box;\n    display: flex;\n    flex-direction: column;\n    justify-content: space-between;\n    margin-bottom: 10px;\n  }\n  .py-mut-code-topbar {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    padding: 6px 10px;\n    background: rgba(255, 255, 255, 0.03);\n    border-bottom: 1px solid rgba(255, 255, 255, 0.06);\n    font-family: 'JetBrains Mono', monospace;\n    font-size: 0.68rem;\n  }\n  .panel-mutable .py-mut-code-topbar { color: #34d399; }\n  .panel-immutable .py-mut-code-topbar { color: #fb7185; }\n\n  .py-mut-code-wrap pre {\n    margin: 0;\n    padding: 10px 12px;\n    font-family: 'JetBrains Mono', monospace;\n    font-size: 0.74rem;\n    color: #f8fafc;\n    line-height: 1.6;\n    overflow-x: auto;\n  }\n\n  .py-mut-takeaway {\n    margin-top: 0;\n    font-size: 0.72rem;\n    padding: 8px 12px;\n    border-radius: 6px;\n    line-height: 1.45;\n    min-height: 60px;\n    box-sizing: border-box;\n    display: flex;\n    align-items: center;\n  }\n  .panel-mutable .py-mut-takeaway {\n    margin-top: 0;\n    font-size: 0.72rem;\n    padding: 8px 12px;\n    border-radius: 6px;\n    line-height: 1.45;\n    min-height: 60px;\n    box-sizing: border-box;\n    display: flex;\n    align-items: center;\n  }\n  .panel-immutable .py-mut-takeaway {\n    margin-top: 0;\n    font-size: 0.72rem;\n    padding: 8px 12px;\n    border-radius: 6px;\n    line-height: 1.45;\n    min-height: 60px;\n    box-sizing: border-box;\n    display: flex;\n    align-items: center;\n  }\n\n  /* ══════════════════════════════════════════════════════════\n     LIGHT MODE OVERRIDES FOR MUTABILITY SHOWCASE\n     ══════════════════════════════════════════════════════════ */\n  [data-theme=\"light\"] .py-mut-showcase {\n    background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);\n    border: 1px solid #e2e8f0;\n    box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.05), inset 0 1px 0 #ffffff;\n  }\n  [data-theme=\"light\"] .py-mut-header {\n    border-bottom: 1.5px solid #e2e8f0;\n    padding-bottom: 14px;\n    margin-bottom: 18px;\n  }\n  [data-theme=\"light\"] .py-mut-header-icon {\n    background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%);\n    border: 1.5px solid #c084fc;\n    box-shadow: 0 4px 14px rgba(168, 85, 247, 0.15);\n    width: 44px;\n    height: 44px;\n    border-radius: 12px;\n  }\n  [data-theme=\"light\"] .py-mut-title {\n    color: #0f172a !important;\n    font-size: 1.25rem !important;\n    font-weight: 800 !important;\n    letter-spacing: -0.02em !important;\n  }\n  [data-theme=\"light\"] .py-mut-subtitle {\n    color: #334155 !important;\n    font-size: 0.88rem !important;\n    font-weight: 500 !important;\n  }\n\n  /* Light Mode Panels */\n  [data-theme=\"light\"] .py-mut-panel.panel-mutable {\n    background: #ffffff;\n    border: 1px solid #d1fae5;\n    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);\n  }\n  [data-theme=\"light\"] .py-mut-panel.panel-mutable:hover {\n    border-color: #86efac;\n    box-shadow: 0 8px 20px -4px rgba(16, 185, 129, 0.12);\n  }\n  [data-theme=\"light\"] .panel-mutable .py-mut-panel-title {\n    color: #15803d !important;\n  }\n  [data-theme=\"light\"] .panel-mutable .py-mut-meta-pill {\n    background: #dcfce7;\n    color: #166534;\n    border: 1px solid #86efac;\n  }\n  [data-theme=\"light\"] .panel-mutable .py-mut-type-tag {\n    background: #dcfce7;\n    border: 1px solid #86efac;\n    color: #15803d;\n  }\n  [data-theme=\"light\"] .panel-mutable .py-mut-takeaway {\n    margin-top: 0;\n    font-size: 0.72rem;\n    padding: 8px 12px;\n    border-radius: 6px;\n    line-height: 1.45;\n    min-height: 60px;\n    box-sizing: border-box;\n    display: flex;\n    align-items: center;\n  }\n\n  [data-theme=\"light\"] .py-mut-panel.panel-immutable {\n    background: #ffffff;\n    border: 1px solid #ffe4e6;\n    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);\n  }\n  [data-theme=\"light\"] .py-mut-panel.panel-immutable:hover {\n    border-color: #fda4af;\n    box-shadow: 0 8px 20px -4px rgba(244, 63, 94, 0.12);\n  }\n  [data-theme=\"light\"] .panel-immutable .py-mut-panel-title {\n    color: #be123c !important;\n  }\n  [data-theme=\"light\"] .panel-immutable .py-mut-meta-pill {\n    background: #ffe4e6;\n    color: #9f1239;\n    border: 1px solid #fecdd3;\n  }\n  [data-theme=\"light\"] .panel-immutable .py-mut-type-tag {\n    background: #ffe4e6;\n    border: 1px solid #fecdd3;\n    color: #be123c;\n  }\n  [data-theme=\"light\"] .panel-immutable .py-mut-takeaway {\n    margin-top: 0;\n    font-size: 0.72rem;\n    padding: 8px 12px;\n    border-radius: 6px;\n    line-height: 1.45;\n    min-height: 60px;\n    box-sizing: border-box;\n    display: flex;\n    align-items: center;\n  }\n\n  [data-theme=\"light\"] .py-mut-desc {\n    font-size: 0.78rem;\n    line-height: 1.55;\n    color: #1e293b !important;\n    margin: 0 0 12px 0;\n    min-height: 72px;\n    box-sizing: border-box;\n    font-weight: 500;\n  }\n  [data-theme=\"light\"] .py-mut-analogy-badge { color: #1e293b !important; font-weight: 700; }\n  [data-theme=\"light\"] .py-mut-types-label { color: #0f172a !important; font-weight: 800; }\n\n  [data-theme=\"light\"] .py-mut-code-wrap {\n    background: #f8fafc !important;\n    border: 1.5px solid #cbd5e1 !important;\n    border-radius: 8px;\n    overflow: hidden;\n    min-height: 122px;\n    box-sizing: border-box;\n    display: flex;\n    flex-direction: column;\n    justify-content: space-between;\n    margin-bottom: 10px;\n  }\n  [data-theme=\"light\"] .py-mut-code-topbar {\n    background: #f8fafc;\n    border-bottom: 1px solid #e2e8f0;\n  }\n  [data-theme=\"light\"] .panel-mutable .py-mut-code-topbar { color: #15803d; }\n  [data-theme=\"light\"] .panel-immutable .py-mut-code-topbar { color: #be123c; }\n  [data-theme=\"light\"] .py-mut-code-wrap pre {\n    color: #0f172a;\n  }\n  [data-theme=\"light\"] .py-mut-code-wrap pre .code-comment { color: #047857 !important; font-weight: 600 !important; font-style: italic !important; }\n\n\n  /* ══════════════════════════════════════════════════════════\n     ANTI-SQUEEZE & RESPONSIVE SPLIT-PANE STYLING\n     ══════════════════════════════════════════════════════════ */\n  /* Prevent table squeezing and word splitting */\n  .db-mock-table-wrap {\n    width: 100% !important;\n    overflow-x: auto !important;\n    -webkit-overflow-scrolling: touch;\n    margin: 14px 0;\n    border-radius: 10px;\n  }\n  .db-mock-table-wrap .db-table-mock {\n    min-width: 650px !important;\n    width: 100%;\n    border-collapse: collapse;\n  }\n  .db-mock-table-wrap .db-table-mock th,\n  .db-mock-table-wrap .db-table-mock td {\n    padding: 8px 12px !important;\n    vertical-align: middle;\n  }\n  /* Code & Syntax pills NEVER break into multiple lines when squeezed */\n  .db-mock-table-wrap code,\n  .db-mock-table-wrap .db-table-mock code {\n    white-space: nowrap !important;\n    display: inline-block !important;\n    word-break: normal !important;\n    overflow-wrap: normal !important;\n    hyphens: none !important;\n  }\n  /* Prevent Category, Type, Keyword, Syntax, and Mutability columns from line-breaking */\n  .db-mock-table-wrap .db-table-mock th:nth-child(1),\n  .db-mock-table-wrap .db-table-mock td:nth-child(1),\n  .db-mock-table-wrap .db-table-mock th:nth-child(2),\n  .db-mock-table-wrap .db-table-mock td:nth-child(2),\n  .db-mock-table-wrap .db-table-mock th:nth-child(3),\n  .db-mock-table-wrap .db-table-mock td:nth-child(3),\n  .db-mock-table-wrap .db-table-mock th:nth-child(4),\n  .db-mock-table-wrap .db-table-mock td:nth-child(4),\n  .db-mock-table-wrap .db-table-mock th:nth-child(6),\n  .db-mock-table-wrap .db-table-mock td:nth-child(6) {\n    white-space: nowrap !important;\n  }\n  /* Description column wraps naturally with legible line height */\n  .db-mock-table-wrap .db-table-mock td:nth-child(5) {\n    white-space: normal !important;\n    min-width: 180px;\n    line-height: 1.45;\n  }\n  .db-mock-table-wrap .py-badge {\n    white-space: nowrap !important;\n    display: inline-block;\n  }\n\n  /* ══════════════════════════════════════════════════════════\n     TOOL MATRIX: FLAGSHIP COMPARISON SHOWCASE\n     ══════════════════════════════════════════════════════════ */\n  .py-matrix-showcase {\n    background: linear-gradient(145deg, #0d1527 0%, #080d1a 100%);\n    border: 1px solid rgba(56, 189, 248, 0.22);\n    border-radius: 12px;\n    padding: 16px;\n    margin: 16px 0;\n    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);\n    position: relative;\n    overflow: hidden;\n  }\n  .py-matrix-header {\n    margin-bottom: 18px;\n    padding-bottom: 14px;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.08);\n  }\n  .py-matrix-title-row {\n    display: flex;\n    align-items: center;\n    gap: 14px;\n    flex-wrap: wrap;\n  }\n  .py-matrix-header-icon {\n    font-size: 1.25rem;\n    line-height: 1;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    width: 42px;\n    height: 42px;\n    border-radius: 12px;\n    background: linear-gradient(135deg, rgba(16, 185, 129, 0.16) 0%, rgba(56, 189, 248, 0.22) 100%);\n    border: 1px solid rgba(56, 189, 248, 0.35);\n    flex-shrink: 0;\n    box-shadow: 0 4px 14px rgba(56, 189, 248, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.1);\n  }\n  .py-matrix-header-text {\n    display: flex;\n    flex-direction: column;\n    gap: 2px;\n    flex: 1;\n  }\n  .py-matrix-title-row {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n    flex-wrap: wrap;\n  }\n  .py-matrix-title {\n    margin: 0;\n    font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;\n    font-size: 1.12rem;\n    font-weight: 800;\n    letter-spacing: -0.015em;\n    color: #f8fafc;\n    line-height: 1.3;\n  }\n  .py-matrix-subtitle {\n    margin: 3px 0 0 0;\n    font-size: 0.82rem;\n    color: #94a3b8;\n    font-weight: 500;\n    letter-spacing: 0.01em;\n    line-height: 1.4;\n  }\n\n  /* Matrix Table Container */\n  .py-matrix-table-wrap {\n    width: 100%;\n    overflow-x: auto;\n    -webkit-overflow-scrolling: touch;\n    border-radius: 8px;\n    border: 1px solid rgba(255, 255, 255, 0.08);\n    background: rgba(11, 17, 32, 0.6);\n  }\n  .py-matrix-table {\n    width: 100%;\n    border-collapse: separate;\n    border-spacing: 0;\n    min-width: 620px;\n    font-family: inherit;\n  }\n  .py-matrix-table th {\n    background: #0f172a;\n    color: #94a3b8;\n    font-size: 0.72rem;\n    font-weight: 700;\n    text-transform: uppercase;\n    letter-spacing: 0.06em;\n    padding: 10px 14px;\n    text-align: left;\n    border-bottom: 2px solid rgba(255, 255, 255, 0.1);\n    white-space: nowrap;\n  }\n  .py-matrix-table td {\n    padding: 12px 14px;\n    font-size: 0.82rem;\n    line-height: 1.45;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.06);\n    color: #e2e8f0;\n    vertical-align: middle;\n  }\n  .py-matrix-table tr:last-child td {\n    border-bottom: none;\n  }\n  .py-matrix-table tbody tr {\n    transition: background-color 0.2s ease;\n  }\n  .py-matrix-table tbody tr:hover {\n    background: rgba(255, 255, 255, 0.03);\n  }\n\n  /* Tool Identity Pills */\n  .py-tool-pill {\n    display: inline-flex;\n    align-items: center;\n    gap: 8px;\n    padding: 6px 12px;\n    border-radius: 8px;\n    font-weight: 700;\n    font-size: 0.84rem;\n    letter-spacing: -0.01em;\n    white-space: nowrap;\n  }\n  .py-tool-pill.tool-sql {\n    background: rgba(56, 189, 248, 0.12);\n    color: #38bdf8;\n    border: 1px solid rgba(56, 189, 248, 0.3);\n  }\n  .py-tool-pill.tool-excel {\n    background: rgba(34, 197, 94, 0.12);\n    color: #4ade80;\n    border: 1px solid rgba(34, 197, 94, 0.3);\n  }\n  .py-tool-pill.tool-python {\n    background: rgba(245, 158, 11, 0.15);\n    color: #fbbf24;\n    border: 1px solid rgba(245, 158, 11, 0.38);\n    box-shadow: 0 0 10px rgba(245, 158, 11, 0.12);\n  }\n  .py-tool-flag {\n    font-size: 0.65rem;\n    font-weight: 800;\n    padding: 1px 5px;\n    border-radius: 4px;\n    background: #fbbf24;\n    color: #0b1120;\n    text-transform: uppercase;\n    letter-spacing: 0.04em;\n    margin-left: 2px;\n  }\n  .py-matrix-highlight-row {\n    background: rgba(245, 158, 11, 0.04) !important;\n  }\n  .py-matrix-highlight-row:hover {\n    background: rgba(245, 158, 11, 0.08) !important;\n  }\n\n  /* Role & Advantage Content */\n  .py-matrix-role {\n    font-weight: 500;\n    color: #cbd5e1;\n  }\n  .py-matrix-adv {\n    color: #e2e8f0;\n  }\n\n  /* Capacity / Limits Badges */\n  .py-matrix-limit {\n    display: inline-flex;\n    align-items: center;\n    gap: 5px;\n    padding: 4px 10px;\n    border-radius: 6px;\n    font-size: 0.74rem;\n    font-weight: 600;\n    white-space: nowrap;\n  }\n  .py-matrix-limit.limit-massive {\n    background: rgba(56, 189, 248, 0.1);\n    color: #38bdf8;\n    border: 1px solid rgba(56, 189, 248, 0.25);\n  }\n  .py-matrix-limit.limit-small {\n    background: rgba(244, 63, 94, 0.1);\n    color: #fb7185;\n    border: 1px solid rgba(244, 63, 94, 0.25);\n  }\n  .py-matrix-limit.limit-large {\n    background: rgba(168, 85, 247, 0.12);\n    color: #c084fc;\n    border: 1px solid rgba(168, 85, 247, 0.28);\n  }\n\n  /* ══════ LIGHT MODE THEME ADAPTATION ══════ */\n  [data-theme=\"light\"] .py-matrix-showcase {\n    background: #ffffff;\n    border: 1px solid #e2e8f0;\n    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);\n  }\n  [data-theme=\"light\"] .py-matrix-header {\n    border-bottom: 1.5px solid #e2e8f0;\n    padding-bottom: 14px;\n    margin-bottom: 18px;\n  }\n  [data-theme=\"light\"] .py-matrix-header-icon {\n    background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);\n    border: 1.5px solid #34d399;\n    box-shadow: 0 4px 14px rgba(16, 185, 129, 0.15);\n    width: 44px;\n    height: 44px;\n    border-radius: 12px;\n  }\n  [data-theme=\"light\"] .py-matrix-title {\n    color: #0f172a !important;\n    font-size: 1.25rem !important;\n    font-weight: 800 !important;\n    letter-spacing: -0.02em !important;\n  }\n  [data-theme=\"light\"] .py-matrix-subtitle {\n    color: #334155 !important;\n    font-size: 0.88rem !important;\n    font-weight: 500 !important;\n  }\n  [data-theme=\"light\"] .py-matrix-table-wrap {\n    border-color: #e2e8f0;\n    background: #ffffff;\n  }\n  [data-theme=\"light\"] .py-matrix-table th { background: #f1f5f9; color: #0f172a; font-weight: 800; border-bottom: 2px solid #cbd5e1; }\n  [data-theme=\"light\"] .py-matrix-table td {\n    color: #334155;\n    border-bottom: 1px solid #f1f5f9;\n  }\n  [data-theme=\"light\"] .py-matrix-table tbody tr:hover {\n    background: #f8fafc;\n  }\n  [data-theme=\"light\"] .py-tool-pill.tool-sql {\n    background: #e0f2fe;\n    color: #0369a1;\n    border-color: #bae6fd;\n  }\n  [data-theme=\"light\"] .py-tool-pill.tool-excel {\n    background: #dcfce7;\n    color: #15803d;\n    border-color: #bbf7d0;\n  }\n  [data-theme=\"light\"] .py-tool-pill.tool-python {\n    background: #fef3c7;\n    color: #b45309;\n    border-color: #fde68a;\n    box-shadow: 0 0 10px rgba(245, 158, 11, 0.1);\n  }\n  [data-theme=\"light\"] .py-tool-flag {\n    background: #d97706;\n    color: #ffffff;\n  }\n  [data-theme=\"light\"] .py-matrix-highlight-row {\n    background: #fffbeb !important;\n  }\n  [data-theme=\"light\"] .py-matrix-highlight-row:hover {\n    background: #fef3c7 !important;\n  }\n  [data-theme=\"light\"] .py-matrix-role { color: #0f172a; font-weight: 700; }\n  [data-theme=\"light\"] .py-matrix-adv {\n    color: #1e293b;\n  }\n  [data-theme=\"light\"] .py-matrix-limit.limit-massive {\n    background: #e0f2fe;\n    color: #0369a1;\n    border-color: #bae6fd;\n  }\n  [data-theme=\"light\"] .py-matrix-limit.limit-small {\n    background: #ffe4e6;\n    color: #e11d48;\n    border-color: #fecdd3;\n  }\n  [data-theme=\"light\"] .py-matrix-limit.limit-large {\n    background: #f3e8ff;\n    color: #7e22ce;\n    border-color: #e9d5ff;\n  }\n\n  /* Flexible auto-fit for cards when theory pane is squeezed by split-resizer */\n  .py-sp-grid {\n    display: grid;\n    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)) !important;\n    gap: 12px;\n  }\n  .py-mut-grid {\n    display: grid;\n    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)) !important;\n    gap: 14px;\n  }\n\n  /* ══════════════════════════════════════════════════════════\n     FROZEN (STICKY) COLUMNS FOR MASTER REFERENCE TABLE\n     ══════════════════════════════════════════════════════════ */\n  .slide-card,\n  .slide-content,\n  #slideBodyText,\n  .slide-section {\n    overflow-x: clip !important;\n    max-width: 100% !important;\n    box-sizing: border-box !important;\n  }\n\n  .db-mock-table-wrap {\n    width: 100% !important;\n    max-width: 100% !important;\n    overflow-x: auto !important;\n    overflow-y: hidden !important;\n    overscroll-behavior-x: contain !important;\n    overscroll-behavior-y: auto !important;\n    -webkit-overflow-scrolling: touch !important;\n    position: relative !important;\n    display: block !important;\n    border-radius: 10px !important;\n    border: 1px solid rgba(255, 255, 255, 0.1) !important;\n    background: #0c0e14 !important;\n    box-sizing: border-box !important;\n  }\n\n  /* Fixed table layout for mathematical pixel alignment */\n  .db-mock-table-wrap .db-table-mock.py-master-ref-table {\n    table-layout: fixed !important;\n    overflow: visible !important;\n    border-radius: 0 !important;\n    border-collapse: separate !important;\n    border-spacing: 0 !important;\n    width: 780px !important;\n    min-width: 780px !important;\n    max-width: 780px !important;\n    background: #0c0e14 !important;\n    margin: 0 !important;\n  }\n\n  /* Explicit column widths for fixed table layout */\n  .py-master-ref-table th:nth-child(1),\n  .py-master-ref-table td:nth-child(1) {\n    width: 110px !important;\n    min-width: 110px !important;\n    max-width: 110px !important;\n    box-sizing: border-box !important;\n  }\n  .py-master-ref-table th:nth-child(2),\n  .py-master-ref-table td:nth-child(2) {\n    width: 110px !important;\n    min-width: 110px !important;\n    max-width: 110px !important;\n    box-sizing: border-box !important;\n  }\n  .py-master-ref-table th:nth-child(3),\n  .py-master-ref-table td:nth-child(3) {\n    width: 95px !important;\n    min-width: 95px !important;\n    max-width: 95px !important;\n    box-sizing: border-box !important;\n  }\n  .py-master-ref-table th:nth-child(4),\n  .py-master-ref-table td:nth-child(4) {\n    width: 155px !important;\n    min-width: 155px !important;\n    max-width: 155px !important;\n    box-sizing: border-box !important;\n  }\n  .py-master-ref-table th:nth-child(5),\n  .py-master-ref-table td:nth-child(5) {\n    width: 195px !important;\n    min-width: 195px !important;\n    max-width: 195px !important;\n    box-sizing: border-box !important;\n  }\n  .py-master-ref-table th:nth-child(6),\n  .py-master-ref-table td:nth-child(6) {\n    width: 115px !important;\n    min-width: 115px !important;\n    max-width: 115px !important;\n    box-sizing: border-box !important;\n  }\n\n  /* Prevent child elements in non-sticky cells from creating higher stacking contexts */\n  .py-master-ref-table code,\n  .py-master-ref-table .py-badge {\n    position: static !important;\n    z-index: 0 !important;\n  }\n\n  /* Non-sticky cells: solid background & lower z-index so they slide cleanly behind */\n  .py-master-ref-table th:nth-child(n+3),\n  .py-master-ref-table td:nth-child(n+3) {\n    position: relative !important;\n    z-index: 1 !important;\n    background: #0c0e14 !important;\n  }\n\n  /* Column 1: Category (Sticky at Left 0) */\n  .py-master-ref-table th:nth-child(1),\n  .py-master-ref-table td:nth-child(1) {\n    position: -webkit-sticky !important;\n    position: sticky !important;\n    left: 0 !important;\n    z-index: 20 !important;\n    white-space: nowrap !important;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;\n    background: #0f1422 !important;\n  }\n\n  /* Column 2: Data Type (Sticky at Left 110px) */\n  .py-master-ref-table th:nth-child(2),\n  .py-master-ref-table td:nth-child(2) {\n    position: -webkit-sticky !important;\n    position: sticky !important;\n    left: 110px !important;\n    z-index: 20 !important;\n    white-space: nowrap !important;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;\n    border-right: 2px solid rgba(56, 189, 248, 0.45) !important;\n    box-shadow: 6px 0 16px rgba(0, 0, 0, 0.65) !important;\n    background: #0f1422 !important;\n  }\n\n  /* Sticky headers (z-index: 25) */\n  .py-master-ref-table th:nth-child(1),\n  .py-master-ref-table th:nth-child(2) {\n    z-index: 25 !important;\n    background: #141b2d !important;\n    border-bottom: 2px solid rgba(255, 255, 255, 0.15) !important;\n  }\n\n  /* Row Hover Highlighting */\n  .py-master-ref-table tbody tr:hover td:nth-child(1),\n  .py-master-ref-table tbody tr:hover td:nth-child(2) {\n    background: #182238 !important;\n  }\n  .py-master-ref-table tbody tr:hover td:nth-child(n+3) {\n    background: #121622 !important;\n  }\n\n  /* ══════ LIGHT MODE THEME ADAPTATION ══════ */\n  [data-theme=\"light\"] .db-mock-table-wrap {\n    border: 1px solid #e2e8f0 !important;\n    background: #ffffff !important;\n  }\n  [data-theme=\"light\"] .db-mock-table-wrap .db-table-mock.py-master-ref-table {\n    background: #ffffff !important;\n  }\n  [data-theme=\"light\"] .py-master-ref-table th:nth-child(n+3),\n  [data-theme=\"light\"] .py-master-ref-table td:nth-child(n+3) {\n    background: #ffffff !important;\n  }\n  [data-theme=\"light\"] .py-master-ref-table th:nth-child(1),\n  [data-theme=\"light\"] .py-master-ref-table th:nth-child(2) {\n    background: #f1f5f9 !important;\n    color: #0f172a !important;\n    font-weight: 900 !important;\n    border-bottom: 2px solid #cbd5e1 !important;\n  }\n  [data-theme=\"light\"] .py-master-ref-table td:nth-child(1),\n  [data-theme=\"light\"] .py-master-ref-table td:nth-child(2) {\n    background: #ffffff !important;\n    color: #0f172a !important;\n    font-weight: 800 !important;\n    border-bottom: 1px solid #e2e8f0 !important;\n  }\n  [data-theme=\"light\"] .py-master-ref-table th:nth-child(2),\n  [data-theme=\"light\"] .py-master-ref-table td:nth-child(2) {\n    border-right: 2px solid #cbd5e1 !important;\n    box-shadow: 6px 0 14px rgba(0, 0, 0, 0.08) !important;\n  }\n  [data-theme=\"light\"] .py-master-ref-table tbody tr:hover td:nth-child(1),\n  [data-theme=\"light\"] .py-master-ref-table tbody tr:hover td:nth-child(2) {\n    background: #f8fafc !important;\n  }\n  [data-theme=\"light\"] .py-master-ref-table tbody tr:hover td:nth-child(n+3) {\n    background: #f1f5f9 !important;\n  }\n\n  /* ══════════════════════════════════════════════════════════\n     HOW PYTHON MANAGES MEMORY (UNDER THE HOOD) — VERTICAL FLOWCHART\n     ACADEMIC TEXTBOOK COLOR SCIENCE ARCHITECTURE (LIGHT & DARK THEMES)\n     ══════════════════════════════════════════════════════════ */\n  .py-vfc-canvas {\n    background: #090e1c;\n    background-image: radial-gradient(circle, rgba(99, 102, 241, 0.16) 1.2px, transparent 1.2px);\n    background-size: 20px 20px;\n    border: 1.5px solid rgba(99, 102, 241, 0.3);\n    border-radius: 18px;\n    padding: 28px 24px;\n    margin: 24px 0 16px 0;\n    box-shadow: 0 16px 44px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.05);\n    position: relative;\n    overflow: hidden;\n  }\n\n  /* Flowchart Header */\n  .py-vfc-header {\n    text-align: center;\n    margin-bottom: 24px;\n    padding-bottom: 20px;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.08);\n    position: relative;\n  }\n  .py-vfc-title-wrap {\n    display: inline-flex;\n    align-items: center;\n    gap: 12px;\n    margin-bottom: 6px;\n  }\n  .py-vfc-logo {\n    width: 36px;\n    height: 36px;\n    filter: drop-shadow(0 0 12px rgba(56, 189, 248, 0.45));\n  }\n  .py-vfc-main-title {\n    margin: 0;\n    font-size: 1.45rem;\n    font-weight: 900;\n    letter-spacing: -0.02em;\n    color: #f8fafc;\n    text-transform: uppercase;\n  }\n  .py-vfc-sub-title {\n    margin: 0 0 14px 0;\n    font-size: 0.88rem;\n    font-weight: 700;\n    color: #38bdf8;\n    letter-spacing: 0.06em;\n    text-transform: uppercase;\n  }\n\n  /* Header Meta: Breadcrumb + Sticky Note */\n  .py-vfc-header-meta {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: 16px;\n    flex-wrap: wrap;\n    margin-top: 12px;\n  }\n  .py-vfc-pipeline-stepper,\n  .py-vfc-breadcrumb {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    gap: 8px;\n    padding: 6px 12px;\n    background: rgba(15, 23, 42, 0.85);\n    border: 1px solid rgba(255, 255, 255, 0.08);\n    border-radius: 12px;\n    box-shadow: 0 8px 24px -4px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.05);\n    max-width: 100%;\n    overflow-x: auto;\n    scrollbar-width: none;\n    -webkit-overflow-scrolling: touch;\n  }\n  .py-vfc-pipeline-stepper::-webkit-scrollbar,\n  .py-vfc-breadcrumb::-webkit-scrollbar {\n    display: none;\n  }\n  .py-vfc-step {\n    display: inline-flex;\n    align-items: center;\n    gap: 8px;\n    padding: 6px 12px;\n    border-radius: 8px;\n    background: rgba(255, 255, 255, 0.03);\n    border: 1px solid rgba(255, 255, 255, 0.06);\n    font-size: 0.78rem;\n    font-weight: 700;\n    color: #cbd5e1;\n    white-space: nowrap;\n    transition: all 0.2s ease;\n  }\n  .py-vfc-step:hover {\n    background: rgba(255, 255, 255, 0.06);\n    border-color: rgba(255, 255, 255, 0.12);\n  }\n  .py-vfc-step-idx {\n    font-family: 'JetBrains Mono', monospace;\n    font-size: 0.68rem;\n    font-weight: 800;\n    padding: 1px 5px;\n    border-radius: 4px;\n    background: rgba(99, 102, 241, 0.18);\n    border: 1px solid rgba(99, 102, 241, 0.3);\n    color: #818cf8;\n    line-height: 1.2;\n  }\n  .py-vfc-step-arrow {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    color: #6366f1;\n    opacity: 0.8;\n    flex-shrink: 0;\n  }\n  .py-vfc-step-arrow svg {\n    display: block;\n  }\n  .py-vfc-step.step-active {\n    background: linear-gradient(135deg, rgba(56, 189, 248, 0.16) 0%, rgba(99, 102, 241, 0.2) 100%);\n    border: 1px solid rgba(56, 189, 248, 0.45);\n    color: #38bdf8;\n    box-shadow: 0 2px 10px rgba(56, 189, 248, 0.15);\n  }\n  .py-vfc-step.step-active .py-vfc-step-idx {\n    background: rgba(56, 189, 248, 0.2);\n    border-color: rgba(56, 189, 248, 0.45);\n    color: #38bdf8;\n  }\n  .py-vfc-breadcrumb-sep {\n    color: #818cf8;\n    font-weight: 900;\n  }\n  .py-vfc-breadcrumb span.highlight {\n    color: #38bdf8;\n    font-weight: 800;\n  }\n  \n  \n\n  /* ══════ VERTICAL FLOWCHART PIPELINE & CONNECTORS ══════ */\n  .py-vfc-pipeline {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    max-width: 780px;\n    margin: 0 auto;\n    width: 100%;\n  }\n\n  /* Vertical Flow Connector with Stem and Arrow Badge */\n  .py-vfc-connector {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    margin: -1px 0;\n    position: relative;\n    z-index: 1;\n  }\n  .py-vfc-stem {\n    width: 2px;\n    height: 14px;\n    background: linear-gradient(180deg, rgba(99, 102, 241, 0.7), rgba(56, 189, 248, 0.85));\n  }\n  .py-vfc-arrow-badge {\n    width: 32px;\n    height: 32px;\n    border-radius: 50%;\n    background: #0d1527;\n    border: 1.5px solid #38bdf8;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    box-shadow: 0 0 14px rgba(56, 189, 248, 0.35);\n    transition: transform 0.2s ease, box-shadow 0.2s ease;\n  }\n  .py-vfc-arrow-badge:hover {\n    transform: scale(1.1);\n    box-shadow: 0 0 20px rgba(56, 189, 248, 0.6);\n  }\n  .py-vfc-arrow-badge svg {\n    filter: drop-shadow(0 0 4px rgba(56, 189, 248, 0.6));\n  }\n\n  /* Base Vertical Flowchart Node */\n  .py-vfc-node {\n    width: 100%;\n    box-sizing: border-box;\n    background: #0d1527;\n    border: 1.5px solid rgba(255, 255, 255, 0.1);\n    border-radius: 14px;\n    padding: 16px 18px;\n    box-shadow: 0 6px 22px rgba(0, 0, 0, 0.38);\n    transition: border-color 0.2s ease, box-shadow 0.2s ease;\n    position: relative;\n    z-index: 2;\n  }\n  .py-vfc-node:hover {\n    box-shadow: 0 10px 28px rgba(99, 102, 241, 0.22);\n  }\n\n  /* Distinct Accent Borders per Node */\n  .vnode-code { border-color: rgba(99, 102, 241, 0.5); }\n  .vnode-objects { border-color: rgba(168, 85, 247, 0.5); }\n  .vnode-ram { border-color: rgba(34, 197, 94, 0.55); }\n  .vnode-pointers { border-color: rgba(56, 189, 248, 0.55); }\n  .vnode-reuse { border-color: rgba(56, 189, 248, 0.45); }\n  .vnode-mutable { border-color: rgba(34, 197, 94, 0.45); }\n  .vnode-immutable { border-color: rgba(244, 63, 94, 0.45); }\n  .vnode-mgmt { border-color: rgba(99, 102, 241, 0.45); }\n  .vnode-summary { border-color: rgba(250, 204, 21, 0.5); }\n\n  /* Node Header */\n  .py-vfc-node-header {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: 12px;\n    margin-bottom: 12px;\n    padding-bottom: 10px;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.06);\n  }\n  .py-vfc-node-title-group {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n  }\n  .py-vfc-step-num {\n    width: 26px;\n    height: 26px;\n    border-radius: 50%;\n    background: #6366f1;\n    color: #ffffff;\n    font-size: 0.78rem;\n    font-weight: 900;\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    flex-shrink: 0;\n    box-shadow: 0 2px 8px rgba(99, 102, 241, 0.4);\n  }\n  .py-vfc-node-title {\n    font-size: 0.95rem;\n    font-weight: 800;\n    color: #f1f5f9;\n    letter-spacing: -0.01em;\n  }\n  .py-vfc-stage-pill {\n    font-size: 0.68rem;\n    font-weight: 700;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n    padding: 3px 10px;\n    border-radius: 9999px;\n    background: rgba(255, 255, 255, 0.05);\n    border: 1px solid rgba(255, 255, 255, 0.1);\n    color: #94a3b8;\n  }\n\n  /* Node Inner Canvas Box (Dynamic Auto Height) */\n  .py-vfc-canvas-box {\n    background: #060a14;\n    border: 1px solid rgba(255, 255, 255, 0.06);\n    border-radius: 10px;\n    padding: 12px 14px;\n    margin-bottom: 10px;\n  }\n\n  /* Node 1: Code Window */\n  .py-vfc-code-block {\n    font-family: var(--font-mono, monospace);\n    font-size: 0.82rem;\n    color: #e2e8f0;\n    line-height: 1.6;\n    background: transparent;\n    margin: 0;\n  }\n  .py-vfc-code-line {\n    display: flex;\n    gap: 12px;\n  }\n  .py-vfc-line-num {\n    color: #475569;\n    user-select: none;\n    font-size: 0.74rem;\n    width: 16px;\n    text-align: right;\n  }\n  .code-kw { color: #f472b6; }\n  .code-str { color: #facc15; }\n  .code-num { color: #4ade80; }\n  .code-var { color: #38bdf8; }\n\n  /* Node 2: Object Stack (Grid) */\n  .py-vfc-obj-grid {\n    display: grid;\n    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n    gap: 10px;\n  }\n  .py-vfc-obj-item {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: 8px;\n    background: rgba(15, 23, 42, 0.75);\n    border: 1px solid rgba(255, 255, 255, 0.08);\n    border-radius: 8px;\n    padding: 8px 12px;\n  }\n  .py-vfc-val-pill {\n    font-family: var(--font-mono, monospace);\n    font-size: 0.78rem;\n    font-weight: 700;\n    padding: 3px 10px;\n    border-radius: 5px;\n    letter-spacing: 0.02em;\n  }\n  .pill-green {\n    background: rgba(34, 197, 94, 0.18);\n    border: 1px solid #22c55e;\n    color: #4ade80;\n  }\n  .pill-amber {\n    background: rgba(245, 158, 11, 0.18);\n    border: 1px solid #f59e0b;\n    color: #fbbf24;\n  }\n  .pill-purple {\n    background: rgba(168, 85, 247, 0.18);\n    border: 1px solid #a855f7;\n    color: #c084fc;\n  }\n  .py-vfc-obj-label {\n    font-size: 0.72rem;\n    color: #94a3b8;\n    font-weight: 600;\n  }\n\n  /* Node 3: System RAM Architecture */\n  .py-vfc-ram-wrap {\n    border: 1.5px solid #22c55e;\n    border-radius: 10px;\n    background: rgba(34, 197, 94, 0.03);\n    padding: 10px 12px;\n  }\n  .py-vfc-ram-tag {\n    font-size: 0.72rem;\n    font-weight: 800;\n    color: #22c55e;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n    margin-bottom: 8px;\n    display: flex;\n    align-items: center;\n    gap: 6px;\n  }\n  .py-vfc-ram-sections {\n    display: flex;\n    flex-direction: column;\n    gap: 8px;\n  }\n  .py-vfc-code-area {\n    background: rgba(15, 23, 42, 0.85);\n    border: 1px dashed rgba(255, 255, 255, 0.15);\n    border-radius: 6px;\n    padding: 6px 10px;\n    font-size: 0.72rem;\n    color: #94a3b8;\n  }\n  .py-vfc-heap-area {\n    background: rgba(15, 23, 42, 0.95);\n    border: 1px solid rgba(34, 197, 94, 0.35);\n    border-radius: 6px;\n    padding: 8px 10px;\n  }\n  .py-vfc-heap-title {\n    font-size: 0.72rem;\n    font-weight: 800;\n    color: #86efac;\n    margin-bottom: 6px;\n    display: flex;\n    justify-content: space-between;\n  }\n  .py-vfc-heap-table {\n    width: 100%;\n    border-collapse: collapse;\n    font-size: 0.72rem;\n  }\n  .py-vfc-heap-table th {\n    text-align: left;\n    color: #64748b;\n    font-weight: 700;\n    font-size: 0.65rem;\n    text-transform: uppercase;\n    padding: 3px 6px;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.08);\n  }\n  .py-vfc-heap-table td {\n    padding: 5px 6px;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.04);\n  }\n  .py-vfc-heap-table tr:last-child td {\n    border-bottom: none;\n  }\n  .py-vfc-hex {\n    font-family: var(--font-mono, monospace);\n    font-size: 0.72rem;\n    color: #38bdf8;\n    background: rgba(56, 189, 248, 0.1);\n    padding: 2px 6px;\n    border-radius: 4px;\n    display: inline-block;\n  }\n  .py-vfc-type-dim {\n    font-size: 0.68rem;\n    color: #64748b;\n  }\n\n  /* Node 4: Pointer List */\n  .py-vfc-pointer-list {\n    display: flex;\n    flex-direction: column;\n    gap: 7px;\n  }\n  .py-vfc-ptr-row {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: 8px;\n    background: rgba(15, 23, 42, 0.75);\n    border: 1px solid rgba(255, 255, 255, 0.06);\n    border-radius: 8px;\n    padding: 6px 12px;\n  }\n  .py-vfc-var-label {\n    font-family: var(--font-mono, monospace);\n    font-size: 0.78rem;\n    font-weight: 800;\n    color: #38bdf8;\n    background: rgba(56, 189, 248, 0.12);\n    border: 1px solid rgba(56, 189, 248, 0.3);\n    padding: 2px 8px;\n    border-radius: 4px;\n  }\n  .py-vfc-ptr-arrow {\n    color: #818cf8;\n    font-weight: 900;\n    font-size: 0.78rem;\n  }\n\n  /* Node Footer Text */\n  .py-vfc-node-footer {\n    font-size: 0.76rem;\n    color: #94a3b8;\n    line-height: 1.45;\n  }\n  .py-vfc-node-footer strong {\n    color: #e2e8f0;\n  }\n\n  /* ══════ FLOWCHART TRANSITION BRIDGE BANNER ══════ */\n  .py-vfc-bridge {\n    width: 100%;\n    box-sizing: border-box;\n    text-align: center;\n    margin: 0;\n    padding: 14px 18px;\n    background: #0f172a;\n    border: 1px solid rgba(99, 102, 241, 0.35);\n    border-radius: 14px;\n    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);\n    position: relative;\n    z-index: 2;\n  }\n  .py-vfc-bridge-title {\n    font-size: 0.82rem;\n    font-weight: 800;\n    color: #a5b4fc;\n    letter-spacing: 0.06em;\n    text-transform: uppercase;\n    margin-bottom: 8px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    gap: 8px;\n  }\n  .py-vfc-bridge-pills {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    gap: 12px;\n    flex-wrap: wrap;\n    font-size: 0.76rem;\n    font-weight: 700;\n  }\n  .bridge-pill {\n    padding: 4px 12px;\n    border-radius: 9999px;\n    background: rgba(255, 255, 255, 0.05);\n    border: 1px solid rgba(255, 255, 255, 0.1);\n    color: #e2e8f0;\n  }\n  .bridge-sep {\n    color: #6366f1;\n    font-weight: 900;\n  }\n\n  /* Node 5: Fork Diagram */\n  .py-vfc-fork-diagram {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    gap: 12px;\n    width: 100%;\n    padding: 8px 0;\n  }\n  .py-vfc-fork-vars {\n    display: flex;\n    flex-direction: column;\n    gap: 8px;\n  }\n  .py-vfc-fork-arrows {\n    font-size: 1.3rem;\n    color: #818cf8;\n    font-weight: 900;\n    line-height: 1;\n  }\n\n  /* Node 8: Memory Management 3-Card Grid */\n  .py-vfc-cycle-grid {\n    display: grid;\n    grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));\n    gap: 10px;\n  }\n  .py-vfc-cycle-item {\n    display: flex;\n    align-items: flex-start;\n    gap: 10px;\n    background: rgba(15, 23, 42, 0.75);\n    border: 1px solid rgba(255, 255, 255, 0.06);\n    border-radius: 8px;\n    padding: 10px 12px;\n  }\n  .py-vfc-cycle-icon {\n    font-size: 1.15rem;\n    flex-shrink: 0;\n    margin-top: 1px;\n  }\n  .py-vfc-cycle-text {\n    font-size: 0.72rem;\n    line-height: 1.4;\n    color: #cbd5e1;\n  }\n  .py-vfc-cycle-text strong {\n    color: #f8fafc;\n    font-size: 0.76rem;\n  }\n\n  /* Node 9: Summary & Gold Card */\n  .py-vfc-legend-grid {\n    display: grid;\n    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));\n    gap: 8px;\n    margin-bottom: 12px;\n  }\n  .py-vfc-legend-item {\n    font-size: 0.74rem;\n    color: #cbd5e1;\n    display: flex;\n    align-items: center;\n    gap: 8px;\n    background: rgba(15, 23, 42, 0.75);\n    padding: 6px 10px;\n    border-radius: 6px;\n    border: 1px solid rgba(255, 255, 255, 0.06);\n  }\n  .py-vfc-gold-card {\n    background: linear-gradient(135deg, #fef08a 0%, #facc15 100%);\n    border: 1px solid #eab308;\n    border-radius: 10px;\n    padding: 12px 16px;\n    text-align: center;\n    color: #713f12;\n    font-size: 0.84rem;\n    font-weight: 800;\n    box-shadow: 0 4px 16px rgba(250, 204, 21, 0.25);\n  }\n  .py-vfc-footer-ribbon {\n    margin-top: 10px;\n    text-align: center;\n    font-size: 0.78rem;\n    font-weight: 700;\n    color: #94a3b8;\n    letter-spacing: 0.02em;\n  }\n\n  /* ══════════════════════════════════════════════════════════\n     LIGHT MODE THEME ADAPTATION — ACADEMIC TEXTBOOK COLOR SCIENCE\n     BRIGHT, HIGH-VISIBILITY, SATURATED JEWEL TONES (100% CLEAN CONTRAST)\n     ══════════════════════════════════════════════════════════ */\n  [data-theme=\"light\"] .py-vfc-canvas {\n    background: #ffffff !important;\n    background-image: radial-gradient(circle, rgba(37, 99, 235, 0.1) 1.2px, transparent 1.2px) !important;\n    border: 2px solid #cbd5e1 !important;\n    box-shadow: 0 10px 32px rgba(15, 23, 42, 0.06) !important;\n  }\n  [data-theme=\"light\"] .py-vfc-header {\n    border-bottom: 1.5px solid #e2e8f0 !important;\n  }\n  [data-theme=\"light\"] .py-vfc-main-title {\n    color: #0f172a !important;\n  }\n  [data-theme=\"light\"] .py-vfc-sub-title {\n    color: #1d4ed8 !important;\n    font-weight: 800 !important;\n  }\n  [data-theme=\"light\"] .py-vfc-pipeline-stepper,\n  [data-theme=\"light\"] .py-vfc-breadcrumb {\n    background: #ffffff !important;\n    border: 1px solid #e2e8f0 !important;\n    box-shadow: 0 4px 16px -2px rgba(0, 0, 0, 0.05) !important;\n  }\n  [data-theme=\"light\"] .py-vfc-step {\n    background: #f8fafc;\n    border: 1px solid #e2e8f0;\n    color: #334155;\n  }\n  [data-theme=\"light\"] .py-vfc-step:hover {\n    background: #f1f5f9;\n    border-color: #cbd5e1;\n  }\n  [data-theme=\"light\"] .py-vfc-step-idx {\n    background: #e0e7ff;\n    border-color: #c7d2fe;\n    color: #4338ca;\n  }\n  [data-theme=\"light\"] .py-vfc-step-arrow {\n    color: #3b82f6;\n    opacity: 0.9;\n  }\n  [data-theme=\"light\"] .py-vfc-step.step-active {\n    background: linear-gradient(135deg, #eff6ff 0%, #e0e7ff 100%);\n    border: 1px solid #93c5fd;\n    color: #1d4ed8;\n    box-shadow: 0 2px 8px rgba(37, 99, 235, 0.12);\n  }\n  [data-theme=\"light\"] .py-vfc-step.step-active .py-vfc-step-idx {\n    background: #dbeafe;\n    border-color: #93c5fd;\n    color: #1d4ed8;\n  }\n  [data-theme=\"light\"] .py-vfc-breadcrumb-sep {\n    color: #2563eb !important;\n    font-weight: 900 !important;\n  }\n  [data-theme=\"light\"] .py-vfc-breadcrumb span.highlight {\n    color: #1d4ed8 !important;\n    font-weight: 900 !important;\n  }\n  \n\n  /* Nodes in Light Mode */\n  [data-theme=\"light\"] .py-vfc-node {\n    background: #ffffff !important;\n    border: 1.5px solid #cbd5e1 !important;\n    box-shadow: 0 4px 16px rgba(15, 23, 42, 0.05) !important;\n    position: relative !important;\n    z-index: 2 !important;\n  }\n  [data-theme=\"light\"] .py-vfc-node:hover {\n    box-shadow: 0 10px 24px rgba(37, 99, 235, 0.12) !important;\n  }\n  [data-theme=\"light\"] .vnode-code { border-color: #3b82f6 !important; }\n  [data-theme=\"light\"] .vnode-objects { border-color: #a855f7 !important; }\n  [data-theme=\"light\"] .vnode-ram { border-color: #16a34a !important; }\n  [data-theme=\"light\"] .vnode-pointers { border-color: #0284c7 !important; }\n  [data-theme=\"light\"] .vnode-reuse { border-color: #0284c7 !important; }\n  [data-theme=\"light\"] .vnode-mutable { border-color: #16a34a !important; }\n  [data-theme=\"light\"] .vnode-immutable { border-color: #e11d48 !important; }\n  [data-theme=\"light\"] .vnode-mgmt { border-color: #6366f1 !important; }\n  [data-theme=\"light\"] .vnode-summary { border-color: #ca8a04 !important; }\n\n  [data-theme=\"light\"] .py-vfc-node-header {\n    border-bottom: 1.5px solid #f1f5f9 !important;\n  }\n  [data-theme=\"light\"] .py-vfc-node-title {\n    color: #0f172a !important;\n    font-weight: 900 !important;\n  }\n  [data-theme=\"light\"] .py-vfc-stage-pill {\n    background: #eff6ff !important;\n    border: 1.5px solid #bfdbfe !important;\n    color: #1d4ed8 !important;\n    font-weight: 800 !important;\n  }\n\n  /* Flowchart Arrow Connectors in Light Mode */\n  [data-theme=\"light\"] .py-vfc-stem {\n    background: linear-gradient(180deg, #60a5fa, #1d4ed8) !important;\n    width: 2px !important;\n  }\n  [data-theme=\"light\"] .py-vfc-arrow-badge {\n    background: #ffffff !important;\n    border: 2px solid #2563eb !important;\n    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25) !important;\n  }\n  [data-theme=\"light\"] .py-vfc-arrow-badge svg path {\n    stroke: #1d4ed8 !important;\n    stroke-width: 3 !important;\n  }\n\n  /* Inner Canvas Box in Light Mode */\n  [data-theme=\"light\"] .py-vfc-canvas-box {\n    background: #f8fafc !important;\n    border: 1.5px solid #e2e8f0 !important;\n  }\n\n  /* Syntax Highlighting in Light Mode — Bright & High Contrast */\n  [data-theme=\"light\"] .py-vfc-code-block {\n    color: #0f172a !important;\n    font-weight: 600 !important;\n  }\n  [data-theme=\"light\"] .py-vfc-code-block .code-var {\n    color: #0284c7 !important;\n    font-weight: 700 !important;\n  }\n  [data-theme=\"light\"] .py-vfc-code-block .code-num {\n    color: #15803d !important;\n    font-weight: 800 !important;\n  }\n  [data-theme=\"light\"] .py-vfc-code-block .code-str {\n    color: #c2410c !important;\n    font-weight: 700 !important;\n  }\n  [data-theme=\"light\"] .py-vfc-code-block .code-kw {\n    color: #be123c !important;\n    font-weight: 800 !important;\n  }\n  [data-theme=\"light\"] .py-vfc-line-num {\n    color: #64748b !important;\n    font-weight: 700 !important;\n  }\n\n  /* Object Pills in Light Mode — Saturated High Visibility */\n  [data-theme=\"light\"] .py-vfc-obj-item {\n    background: #ffffff !important;\n    border: 1.5px solid #cbd5e1 !important;\n    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03) !important;\n  }\n  [data-theme=\"light\"] .pill-green {\n    background: #f0fdf4 !important;\n    border: 1.5px solid #86efac !important;\n    color: #15803d !important;\n    font-weight: 800 !important;\n  }\n  [data-theme=\"light\"] .pill-amber {\n    background: #fefce8 !important;\n    border: 1.5px solid #fde047 !important;\n    color: #b45309 !important;\n    font-weight: 800 !important;\n  }\n  [data-theme=\"light\"] .pill-purple {\n    background: #faf5ff !important;\n    border: 1.5px solid #d8b4fe !important;\n    color: #7e22ce !important;\n    font-weight: 800 !important;\n  }\n  [data-theme=\"light\"] .py-vfc-obj-label {\n    color: #0f172a !important;\n    font-weight: 700 !important;\n  }\n\n  /* System RAM in Light Mode */\n  [data-theme=\"light\"] .py-vfc-ram-wrap {\n    background: #f0fdf4 !important;\n    border: 2px solid #22c55e !important;\n  }\n  [data-theme=\"light\"] .py-vfc-ram-tag {\n    color: #15803d !important;\n    font-weight: 900 !important;\n  }\n  [data-theme=\"light\"] .py-vfc-code-area {\n    background: #ffffff !important;\n    border: 1.5px dashed #cbd5e1 !important;\n    color: #0f172a !important;\n    font-weight: 600 !important;\n  }\n  [data-theme=\"light\"] .py-vfc-heap-area {\n    background: #ffffff !important;\n    border: 1.5px solid #86efac !important;\n  }\n  [data-theme=\"light\"] .py-vfc-heap-title {\n    color: #15803d !important;\n    font-weight: 900 !important;\n  }\n  [data-theme=\"light\"] .py-vfc-heap-table th {\n    color: #0f172a !important;\n    font-weight: 800 !important;\n    border-bottom: 2px solid #cbd5e1 !important;\n  }\n  [data-theme=\"light\"] .py-vfc-heap-table td {\n    color: #0f172a !important;\n    border-bottom: 1px solid #e2e8f0 !important;\n  }\n\n  /* Monospace Hex Address Pills in Light Mode — Bright Cobalt */\n  [data-theme=\"light\"] .py-vfc-hex {\n    background: #eff6ff !important;\n    border: 1.5px solid #93c5fd !important;\n    color: #1d4ed8 !important;\n    font-weight: 800 !important;\n  }\n  [data-theme=\"light\"] .py-vfc-type-dim {\n    color: #334155 !important;\n    font-weight: 700 !important;\n  }\n\n  /* Pointer Rows in Light Mode */\n  [data-theme=\"light\"] .py-vfc-ptr-row {\n    background: #ffffff !important;\n    border: 1.5px solid #cbd5e1 !important;\n    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03) !important;\n  }\n  [data-theme=\"light\"] .py-vfc-var-label {\n    background: #eff6ff !important;\n    border: 1.5px solid #93c5fd !important;\n    color: #1d4ed8 !important;\n    font-weight: 800 !important;\n  }\n  [data-theme=\"light\"] .py-vfc-ptr-arrow {\n    color: #2563eb !important;\n    font-weight: 900 !important;\n  }\n\n  /* Flowchart Milestone Bridge in Light Mode */\n  [data-theme=\"light\"] .py-vfc-bridge {\n    background: #f8fafc !important;\n    border: 2px solid #6366f1 !important;\n    box-shadow: 0 4px 16px rgba(99, 102, 241, 0.12) !important;\n    position: relative !important;\n    z-index: 2 !important;\n    margin: 0 !important;\n  }\n  [data-theme=\"light\"] .py-vfc-bridge-title {\n    color: #4338ca !important;\n    font-weight: 900 !important;\n  }\n  [data-theme=\"light\"] .bridge-pill {\n    background: #ffffff !important;\n    border: 1.5px solid #cbd5e1 !important;\n    color: #0f172a !important;\n    font-weight: 800 !important;\n  }\n  [data-theme=\"light\"] .bridge-sep {\n    color: #4f46e5 !important;\n    font-weight: 900 !important;\n  }\n\n  /* Fork Diagram in Light Mode */\n  [data-theme=\"light\"] .py-vfc-fork-arrows {\n    color: #2563eb !important;\n  }\n\n  /* Memory Management 3-Card Grid in Light Mode */\n  [data-theme=\"light\"] .py-vfc-cycle-item {\n    background: #ffffff !important;\n    border: 1.5px solid #cbd5e1 !important;\n    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03) !important;\n  }\n  [data-theme=\"light\"] .py-vfc-cycle-text {\n    color: #1e293b !important;\n    font-size: 0.74rem !important;\n    font-weight: 500 !important;\n  }\n  [data-theme=\"light\"] .py-vfc-cycle-text strong {\n    color: #0f172a !important;\n    font-weight: 900 !important;\n    font-size: 0.80rem !important;\n  }\n\n  /* Summary Legend in Light Mode */\n  [data-theme=\"light\"] .py-vfc-legend-item {\n    background: #ffffff !important;\n    border: 1.5px solid #cbd5e1 !important;\n    color: #0f172a !important;\n    font-weight: 700 !important;\n  }\n  [data-theme=\"light\"] .py-vfc-gold-card {\n    background: linear-gradient(135deg, #fef08a 0%, #facc15 100%) !important;\n    border: 2px solid #ca8a04 !important;\n    color: #713f12 !important;\n    font-weight: 900 !important;\n    font-size: 0.88rem !important;\n    box-shadow: 0 4px 16px rgba(202, 138, 4, 0.25) !important;\n  }\n  [data-theme=\"light\"] .py-vfc-footer-ribbon {\n    color: #1e293b !important;\n    font-weight: 800 !important;\n  }\n\n  /* Node Footers in Light Mode — Crisp High Legibility */\n  [data-theme=\"light\"] .py-vfc-node-footer {\n    color: #1e293b !important;\n    font-weight: 500 !important;\n    line-height: 1.55 !important;\n  }\n  [data-theme=\"light\"] .py-vfc-node-footer strong {\n    color: #0f172a !important;\n    font-weight: 900 !important;\n  }\n  [data-theme=\"light\"] .py-vfc-node-footer code {\n    background: #eff6ff !important;\n    color: #1d4ed8 !important;\n    border: 1px solid #bfdbfe !important;\n    padding: 1px 6px !important;\n    border-radius: 4px !important;\n    font-weight: 800 !important;\n  }\n\n\n\n\n  /* ══════════════════════════════════════════════════════════\n     PRODUCTION DATA TRAP CARD (SHARED MUTABLE REFERENCES)\n     ══════════════════════════════════════════════════════════ */\n  .py-analyst-trap-card {\n    background: linear-gradient(145deg, rgba(20, 27, 45, 0.95) 0%, rgba(13, 19, 33, 0.98) 100%);\n    border: 1.5px solid rgba(244, 63, 94, 0.4);\n    border-radius: 12px;\n    padding: 16px 18px;\n    margin-top: 14px;\n    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);\n    width: 100%;\n    box-sizing: border-box;\n  }\n  .py-trap-header {\n    display: flex;\n    align-items: center;\n    gap: 12px;\n    margin-bottom: 10px;\n    flex-wrap: wrap;\n  }\n  .py-trap-badge {\n    background: rgba(244, 63, 94, 0.2);\n    border: 1px solid #f43f5e;\n    color: #fb7185;\n    font-family: var(--font-mono, monospace);\n    font-size: 0.68rem;\n    font-weight: 800;\n    padding: 2px 8px;\n    border-radius: 4px;\n    letter-spacing: 0.05em;\n  }\n  .py-trap-title {\n    margin: 0;\n    font-size: 0.88rem;\n    font-weight: 800;\n    color: #f1f5f9;\n    letter-spacing: -0.01em;\n  }\n  .py-trap-text {\n    font-size: 0.76rem;\n    color: #cbd5e1;\n    line-height: 1.5;\n    margin: 0 0 12px 0;\n  }\n  .py-trap-text strong {\n    color: #f8fafc;\n  }\n  .py-trap-code-grid {\n    display: grid;\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n    gap: 14px;\n  }\n  @media (max-width: 640px) {\n    .py-trap-code-grid {\n      grid-template-columns: 1fr;\n    }\n  }\n  .py-trap-box {\n    border-radius: 8px;\n    padding: 10px 12px;\n  }\n  .trap-danger {\n    background: rgba(244, 63, 94, 0.08);\n    border: 1px solid rgba(244, 63, 94, 0.35);\n  }\n  .trap-solution {\n    background: rgba(34, 197, 94, 0.08);\n    border: 1px solid rgba(34, 197, 94, 0.35);\n  }\n  .py-trap-box-label {\n    font-size: 0.72rem;\n    font-weight: 800;\n    margin-bottom: 6px;\n  }\n  .trap-danger .py-trap-box-label { color: #fb7185; }\n  .trap-solution .py-trap-box-label { color: #4ade80; }\n  .py-trap-box pre {\n    margin: 0;\n    background: transparent;\n    font-family: var(--font-mono, monospace);\n    font-size: 0.76rem;\n    color: #e2e8f0;\n    line-height: 1.5;\n  }\n\n  /* Live Terminal Tip in Flowchart */\n  .py-fc-live-tip {\n    margin-top: 10px;\n    background: rgba(56, 189, 248, 0.08);\n    border: 1px dashed rgba(56, 189, 248, 0.4);\n    border-radius: 8px;\n    padding: 8px 12px;\n    display: flex;\n    align-items: flex-start;\n    gap: 8px;\n  }\n  .py-fc-tip-icon {\n    font-size: 1rem;\n    flex-shrink: 0;\n    margin-top: 1px;\n  }\n  .py-fc-tip-text {\n    font-size: 0.72rem;\n    line-height: 1.45;\n    color: #cbd5e1;\n  }\n  .py-fc-tip-text strong {\n    color: #38bdf8;\n  }\n  .py-fc-tip-text code {\n    font-family: var(--font-mono, monospace);\n    background: rgba(0, 0, 0, 0.4);\n    color: #4ade80;\n    padding: 1px 5px;\n    border-radius: 4px;\n    font-size: 0.70rem;\n  }\n\n  /* Mobile Swipe Pill for Master Reference Table */\n  .py-table-mobile-hint {\n    display: none;\n    align-items: center;\n    justify-content: flex-end;\n    gap: 6px;\n    font-size: 0.70rem;\n    font-weight: 700;\n    color: #38bdf8;\n    margin-bottom: 6px;\n  }\n  @media (max-width: 768px) {\n    .py-table-mobile-hint {\n      display: flex;\n    }\n  }\n\n  /* Interactive Hover Linkage for Pointer Rows */\n  .py-vfc-ptr-row {\n    transition: all 0.2s ease !important;\n    cursor: default;\n  }\n  .py-vfc-ptr-row:hover {\n    transform: translateX(4px);\n    border-color: rgba(56, 189, 248, 0.5) !important;\n    background: rgba(15, 23, 42, 0.95) !important;\n    box-shadow: 0 4px 14px rgba(56, 189, 248, 0.15) !important;\n  }\n  .py-vfc-ptr-row:hover .py-vfc-ptr-arrow {\n    transform: scale(1.15);\n    color: #38bdf8 !important;\n  }\n\n  /* ═══ LIGHT MODE THEME ADAPTATION FOR NEW ELEMENTS ═══ */\n  [data-theme=\"light\"] .py-analyst-trap-card {\n    background: #ffffff !important;\n    border: 1.5px solid #fecdd3 !important;\n    box-shadow: 0 4px 16px rgba(225, 29, 72, 0.06) !important;\n    width: 100% !important;\n    box-sizing: border-box !important;\n  }\n  [data-theme=\"light\"] .py-trap-badge {\n    background: #ffe4e6 !important;\n    border-color: #fda4af !important;\n    color: #be123c !important;\n  }\n  [data-theme=\"light\"] .py-trap-title {\n    color: #0f172a !important;\n  }\n  [data-theme=\"light\"] .py-trap-text {\n    color: #1e293b !important;\n  }\n  [data-theme=\"light\"] .py-trap-text strong {\n    color: #0f172a !important;\n  }\n  [data-theme=\"light\"] .trap-danger {\n    background: #fff1f2 !important;\n    border-color: #fecdd3 !important;\n  }\n  [data-theme=\"light\"] .trap-danger .py-trap-box-label {\n    color: #be123c !important;\n  }\n  [data-theme=\"light\"] .trap-solution {\n    background: #f0fdf4 !important;\n    border-color: #bbf7d0 !important;\n  }\n  [data-theme=\"light\"] .trap-solution .py-trap-box-label {\n    color: #15803d !important;\n  }\n  [data-theme=\"light\"] .py-trap-box pre {\n    color: #0f172a !important;\n  }\n  [data-theme=\"light\"] .py-trap-box pre .code-comment {\n    color: #047857 !important;\n  }\n  [data-theme=\"light\"] .py-fc-live-tip {\n    background: #f0f9ff !important;\n    border-color: #93c5fd !important;\n  }\n  [data-theme=\"light\"] .py-fc-tip-text {\n    color: #1e293b !important;\n  }\n  [data-theme=\"light\"] .py-fc-tip-text strong {\n    color: #0284c7 !important;\n  }\n  [data-theme=\"light\"] .py-fc-tip-text code {\n    background: #e0f2fe !important;\n    color: #0369a1 !important;\n    border: 1px solid #bae6fd !important;\n  }\n  [data-theme=\"light\"] .py-table-mobile-hint {\n    color: #0284c7;\n  }\n  [data-theme=\"light\"] .py-vfc-ptr-row:hover {\n    background: #f0f9ff !important;\n    border-color: #38bdf8 !important;\n    box-shadow: 0 4px 12px rgba(2, 132, 199, 0.12) !important;\n  }\n  [data-theme=\"light\"] .py-vfc-ptr-row:hover .py-vfc-ptr-arrow {\n    color: #0284c7 !important;\n  }\n\n  /* ═══════════════════════════════════════════════════════════════\n     THEORY NARRATION PLAYBACK ISOLATION & SPOTLIGHTS (SQL Day 02 Parity)\n     ═══════════════════════════════════════════════════════════════ */\n  .stunning-section-entry {\n    animation: stunningSectionPop 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards !important;\n    will-change: opacity, transform !important;\n  }\n  @keyframes stunningSectionPop {\n    0% {\n      opacity: 0;\n      transform: translateY(16px) scale(0.98);\n      filter: blur(3px);\n    }\n    60% {\n      opacity: 0.95;\n      transform: translateY(-2px) scale(1.005);\n      filter: blur(0px);\n    }\n    100% {\n      opacity: 1;\n      transform: translateY(0) scale(1);\n      filter: blur(0px);\n    }\n  }\n  .instant-display {\n    animation: none !important;\n    transition: none !important;\n    opacity: 1 !important;\n    transform: none !important;\n    filter: none !important;\n  }\n\n  /* Playback Active: Inactive sections are dimmed and non-distracting */\n  .playback-active .slide-section.section-hidden {\n    opacity: 0.18 !important;\n    filter: blur(0.4px) !important;\n    pointer-events: none !important;\n    transition: opacity 0.35s ease, filter 0.35s ease !important;\n  }\n\n  /* Card Spotlight Glow */\n  .py-sp-card.card-active-spotlight,\n  .py-sp-ai-banner.card-active-spotlight,\n  .py-mut-panel.card-active-spotlight,\n  .py-analyst-trap-card.card-active-spotlight,\n  .py-vfc-node.card-active-spotlight,\n  .card-active-spotlight {\n    transform: scale(1.025) translateY(-3px) !important;\n    border-color: #38bdf8 !important;\n    background: rgba(14, 165, 233, 0.12) !important;\n    box-shadow: 0 10px 28px -4px rgba(56, 189, 248, 0.35), 0 0 0 2px rgba(56, 189, 248, 0.7) !important;\n    z-index: 5 !important;\n    transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1) !important;\n  }\n\n  [data-theme=\"light\"] .py-sp-card.card-active-spotlight,\n  [data-theme=\"light\"] .py-sp-ai-banner.card-active-spotlight,\n  [data-theme=\"light\"] .py-mut-panel.card-active-spotlight,\n  [data-theme=\"light\"] .py-analyst-trap-card.card-active-spotlight,\n  [data-theme=\"light\"] .py-vfc-node.card-active-spotlight,\n  [data-theme=\"light\"] .card-active-spotlight {\n    border-color: #0284c7 !important;\n    background: #f0f9ff !important;\n    box-shadow: 0 10px 24px -4px rgba(2, 132, 199, 0.28), 0 0 0 2px #0284c7 !important;\n  }\n\n  /* Table Row Active Spotlight */\n  .py-matrix-table tr.row-active-spotlight,\n  .py-master-ref-table tr.row-active-spotlight,\n  table tr.row-active-spotlight {\n    background: rgba(59, 130, 246, 0.18) !important;\n    border-left: 4px solid #38bdf8 !important;\n    box-shadow: inset 0 0 12px rgba(56, 189, 248, 0.15) !important;\n    transition: background 0.25s ease, border-color 0.25s ease !important;\n  }\n  .py-matrix-table tr.row-active-spotlight td,\n  .py-master-ref-table tr.row-active-spotlight td,\n  table tr.row-active-spotlight td {\n    color: #f8fafc !important;\n    font-weight: 600 !important;\n  }\n\n  [data-theme=\"light\"] .py-matrix-table tr.row-active-spotlight,\n  [data-theme=\"light\"] .py-master-ref-table tr.row-active-spotlight,\n  [data-theme=\"light\"] table tr.row-active-spotlight {\n    background: rgba(2, 132, 199, 0.12) !important;\n    border-left: 4px solid #0284c7 !important;\n  }\n  [data-theme=\"light\"] .py-matrix-table tr.row-active-spotlight td,\n  [data-theme=\"light\"] .py-master-ref-table tr.row-active-spotlight td,\n  [data-theme=\"light\"] table tr.row-active-spotlight td {\n    color: #0f172a !important;\n  }\n\n  /* ══════════════════════════════════════════════════════════\n     WORLD-CLASS INTERACTIVE & VISUAL ENHANCEMENTS (10/10 UX)\n     ══════════════════════════════════════════════════════════ */\n\n  /* 1. Dynamic Table Row Spotlight & Hover FX */\n  .py-master-ref-table tbody tr,\n  .py-matrix-table tbody tr {\n    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1) !important;\n    cursor: pointer;\n  }\n  .py-master-ref-table tbody tr:hover,\n  .py-matrix-table tbody tr:hover {\n    background: rgba(56, 189, 248, 0.08) !important;\n    transform: translateX(4px);\n    box-shadow: inset 3px 0 0 #38bdf8 !important;\n  }\n  [data-theme=\"light\"] .py-master-ref-table tbody tr:hover,\n  [data-theme=\"light\"] .py-matrix-table tbody tr:hover {\n    background: #f0f9ff !important;\n    box-shadow: inset 3px 0 0 #0284c7 !important;\n  }\n\n  /* 2. Top Gradient Accent Lines & Hover Micro-Elevation */\n  .py-sp-card,\n  .py-mut-showcase,\n  .py-matrix-showcase,\n  .py-analyst-trap-card,\n  .py-vfc-canvas {\n    position: relative !important;\n    overflow: hidden !important;\n    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease !important;\n  }\n  .py-sp-card::before,\n  .py-mut-showcase::before,\n  .py-matrix-showcase::before,\n  .py-analyst-trap-card::before,\n  .py-vfc-canvas::before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    height: 3px;\n    background: linear-gradient(90deg, #38bdf8 0%, #818cf8 50%, #34d399 100%);\n    opacity: 0.85;\n    z-index: 2;\n  }\n  .py-sp-card:hover {\n    transform: translateY(-3px) !important;\n    box-shadow: 0 12px 28px -6px rgba(0, 0, 0, 0.4), 0 0 16px rgba(56, 189, 248, 0.15) !important;\n    border-color: rgba(56, 189, 248, 0.4) !important;\n  }\n  [data-theme=\"light\"] .py-sp-card:hover {\n    transform: translateY(-3px) !important;\n    box-shadow: 0 12px 24px -4px rgba(0, 0, 0, 0.08), 0 0 12px rgba(2, 132, 199, 0.12) !important;\n    border-color: #0284c7 !important;\n  }\n\n  /* 3. Code Card Micro-Glow & Typography Polish */\n  .py-trap-box pre,\n  .py-code-box {\n    transition: border-color 0.3s ease, box-shadow 0.3s ease !important;\n  }\n  .py-trap-box pre:hover,\n  .py-code-box:hover {\n    border-color: rgba(56, 189, 248, 0.4) !important;\n    box-shadow: 0 4px 16px rgba(56, 189, 248, 0.12) !important;\n  }\n  [data-theme=\"light\"] .py-trap-box pre:hover,\n  [data-theme=\"light\"] .py-code-box:hover {\n    border-color: #0284c7 !important;\n    box-shadow: 0 4px 16px rgba(2, 132, 199, 0.12) !important;\n  }\n\n  /* Heading & Block Active Spotlight */\n  .heading-box-wrap.narration-spotlight-active,\n  .narration-spotlight-active {\n    border-color: #38bdf8 !important;\n    box-shadow: 0 0 16px rgba(56, 189, 248, 0.3) !important;\n    transition: all 0.3s ease !important;\n  }\n\n\n\r\n  /* ═════════════════════════════════════════════════════════════════════\r\n     UNIFORM VERTICAL RHYTHM & SPACING SYSTEM (100% Consistent Across Day 02)\r\n     ═════════════════════════════════════════════════════════════════════ */\r\n  .slide-section {\r\n    margin-top: 36px !important;\r\n    margin-bottom: 0 !important;\r\n  }\r\n  .slide-section:first-child {\r\n    margin-top: 8px !important;\r\n  }\r\n  .slide-section-title.heading-box-wrap {\r\n    margin: 0 0 14px 0 !important;\r\n  }\r\n  .section-intro-text {\r\n    margin: 0 0 14px 0 !important;\r\n    font-size: 0.92rem !important;\r\n    line-height: 1.6 !important;\r\n  }\r\n  .topic-subcard {\r\n    margin: 14px 0 0 0 !important;\r\n    position: relative !important;\r\n  }\r\n  .topic-subcard + .topic-subcard {\r\n    margin-top: 16px !important;\r\n  }\r\n  .subcard-header-with-audio {\r\n    display: flex !important;\r\n    align-items: center !important;\r\n    gap: 8px !important;\r\n    margin: 0 0 10px 0 !important;\r\n    padding: 0 !important;\r\n  }\r\n  .subcard-header-title {\r\n    margin: 0 !important;\r\n    font-size: 0.92rem !important;\r\n    font-weight: 700 !important;\r\n    color: #38bdf8 !important;\r\n    letter-spacing: -0.01em !important;\r\n  }\r\n  [data-theme=\"light\"] .subcard-header-title {\r\n    color: #0284c7 !important;\r\n  }\r\n  .code-block-container {\r\n    margin: 0 !important;\r\n    padding: 0 !important;\r\n    display: flex !important;\r\n    flex-direction: column !important;\r\n    gap: 12px !important;\r\n  }\r\n  .code-subblock {\r\n    margin: 0 !important;\r\n  }\r\n  .interview-box {\r\n    margin-top: 14px !important;\r\n    margin-bottom: 0 !important;\r\n  }\r\n\r\n  /* Table Card Header: Clean non-floating header that stays attached to its card */\r\n  .table-header-wrap {\r\n    position: relative !important;\r\n    top: auto !important;\r\n    left: auto !important;\r\n    z-index: 1 !important;\r\n    background-color: #0d1527 !important;\r\n    display: flex !important;\r\n    justify-content: space-between !important;\r\n    align-items: center !important;\r\n    padding: 10px 14px !important;\r\n    margin: 0 !important;\r\n    border-radius: 8px 8px 0 0 !important;\r\n    border: 1px solid rgba(255, 255, 255, 0.08) !important;\r\n    border-bottom: 1px solid rgba(255, 255, 255, 0.06) !important;\r\n  }\r\n  /* Explicitly prevent any vertical floating or sticking for headers during scroll */\r\n  .table-header-wrap,\r\n  .arith-sticky-table thead,\r\n  .arith-sticky-table th,\r\n  .precedence-table thead,\r\n  .precedence-table th,\r\n  .anti-pattern-table thead,\r\n  .anti-pattern-table th {\r\n    top: auto !important;\r\n  }\r\n  .table-header-title {\r\n    margin: 0 !important;\r\n    font-size: 0.92rem !important;\r\n    font-weight: 700 !important;\r\n    color: #f8fafc !important;\r\n    letter-spacing: -0.01em !important;\r\n  }\r\n  [data-theme=\"light\"] .table-header-wrap {\r\n    background-color: #ffffff !important;\r\n    border-color: #e2e8f0 !important;\r\n  }\r\n  [data-theme=\"light\"] .table-header-title {\r\n    color: #0f172a !important;\r\n  }\r\n  .table-header-left {\r\n    display: flex !important;\r\n    align-items: center !important;\r\n    gap: 8px !important;\r\n    flex: 1 !important;\r\n  }\r\n  .table-search-box {\r\n    position: relative !important;\r\n    display: flex !important;\r\n    align-items: center !important;\r\n    background: rgba(0, 0, 0, 0.4) !important;\r\n    border: 1px solid rgba(255, 255, 255, 0.12) !important;\r\n    border-radius: 6px !important;\r\n    padding: 3px 8px 3px 26px !important;\r\n    transition: all 0.2s ease !important;\r\n  }\r\n  .table-search-box:focus-within {\r\n    border-color: #38bdf8 !important;\r\n    box-shadow: 0 0 12px rgba(56, 189, 248, 0.28) !important;\r\n    background: rgba(0, 0, 0, 0.6) !important;\r\n  }\r\n  .table-search-icon {\r\n    position: absolute !important;\r\n    left: 8px !important;\r\n    color: #64748b !important;\r\n    pointer-events: none !important;\r\n  }\r\n  .table-search-input {\r\n    background: transparent !important;\r\n    border: none !important;\r\n    outline: none !important;\r\n    font-family: 'JetBrains Mono', monospace !important;\r\n    font-size: 0.72rem !important;\r\n    color: #f1f5f9 !important;\r\n    width: 130px !important;\r\n    transition: width 0.2s ease !important;\r\n  }\r\n  .table-search-input:focus {\r\n    width: 175px !important;\r\n  }\r\n  .table-search-input::placeholder {\r\n    color: #64748b !important;\r\n    font-size: 0.70rem !important;\r\n  }\r\n  .table-scroll-hint {\r\n    display: none !important;\r\n  }\r\n  .db-mock-table-wrap::-webkit-scrollbar {\r\n    height: 6px !important;\r\n  }\r\n  .db-mock-table-wrap::-webkit-scrollbar-track {\r\n    background: rgba(0, 0, 0, 0.25) !important;\r\n    border-radius: 4px !important;\r\n  }\r\n  .db-mock-table-wrap::-webkit-scrollbar-thumb {\r\n    background: rgba(56, 189, 248, 0.35) !important;\r\n    border-radius: 4px !important;\r\n  }\r\n  .db-mock-table-wrap::-webkit-scrollbar-thumb:hover {\r\n    background: #38bdf8 !important;\r\n  }\r\n  .db-table-mock td code,\r\n  .db-table-mock .prec-ops-wrap code {\r\n    cursor: pointer !important;\r\n    transition: all 0.15s ease !important;\r\n  }\r\n  .db-table-mock td code:hover,\r\n  .db-table-mock .prec-ops-wrap code:hover {\r\n    transform: translateY(-1px) !important;\r\n    border-color: #38bdf8 !important;\r\n    box-shadow: 0 2px 8px rgba(56, 189, 248, 0.3) !important;\r\n  }\r\n  .table-code-copied {\r\n    background: rgba(16, 185, 129, 0.3) !important;\r\n    border-color: #10b981 !important;\r\n    color: #34d399 !important;\r\n    box-shadow: 0 0 10px rgba(16, 185, 129, 0.45) !important;\r\n  }\r\n  .table-empty-row td {\r\n    text-align: center !important;\r\n    padding: 24px 16px !important;\r\n    color: #94a3b8 !important;\r\n    font-style: italic !important;\r\n    font-size: 0.82rem !important;\r\n    background: rgba(0, 0, 0, 0.2) !important;\r\n  }\r\n  .db-table-mock tbody tr:nth-child(even) td {\r\n    background-color: rgba(255, 255, 255, 0.015);\r\n  }\r\n  [data-theme=\"light\"] .table-search-box {\r\n    background: #f8fafc !important;\r\n    border-color: #cbd5e1 !important;\r\n  }\r\n  [data-theme=\"light\"] .table-search-box:focus-within {\r\n    border-color: #0284c7 !important;\r\n    background: #ffffff !important;\r\n    box-shadow: 0 0 10px rgba(2, 132, 199, 0.18) !important;\r\n  }\r\n  [data-theme=\"light\"] .table-search-input {\r\n    color: #0f172a !important;\r\n  }\r\n  [data-theme=\"light\"] .table-search-icon {\r\n    color: #94a3b8 !important;\r\n  }\r\n  [data-theme=\"light\"] .table-scroll-hint {\r\n    display: none !important;\r\n  }\r\n  [data-theme=\"light\"] .db-mock-table-wrap::-webkit-scrollbar-track {\r\n    background: #f1f5f9 !important;\r\n  }\r\n  [data-theme=\"light\"] .db-mock-table-wrap::-webkit-scrollbar-thumb {\r\n    background: rgba(2, 132, 199, 0.35) !important;\r\n  }\r\n  [data-theme=\"light\"] .table-empty-row td {\r\n    background: #f8fafc !important;\r\n    color: #64748b !important;\r\n  }\r\n  [data-theme=\"light\"] .db-table-mock tbody tr:nth-child(even) td {\r\n    background-color: #fafbfd !important;\r\n  }\r\n  .db-mock-table-wrap {\r\n    margin-top: 0 !important;\r\n    border-top-left-radius: 0 !important;\r\n    border-top-right-radius: 0 !important;\r\n    position: relative !important;\r\n    overflow-x: auto !important;\r\n    -webkit-overflow-scrolling: touch !important;\r\n  }\r\n  .db-table-mock.arith-sticky-table {\r\n    border-collapse: separate !important;\r\n    border-spacing: 0 !important;\r\n    min-width: 680px !important;\r\n    width: 100% !important;\r\n    overflow: visible !important;\r\n    margin: 0 !important;\r\n  }\r\n  .arith-sticky-table,\r\n  .arith-sticky-table th,\r\n  .arith-sticky-table td {\r\n    box-sizing: border-box !important;\r\n  }\r\n  /* Column 1: Operator - Frozen Horizontally ONLY (NO vertical float) */\r\n  .arith-sticky-table th:nth-child(1),\r\n  .arith-sticky-table td:nth-child(1) {\r\n    position: sticky !important;\r\n    left: 0 !important;\r\n    top: auto !important;\r\n    z-index: 10 !important;\r\n    width: 80px !important;\r\n    min-width: 80px !important;\r\n    max-width: 80px !important;\r\n    box-sizing: border-box !important;\r\n    background-color: #0d1527 !important;\r\n    border-right: 1px solid rgba(255, 255, 255, 0.08) !important;\r\n    text-align: center !important;\r\n    padding: 8px 6px !important;\r\n  }\r\n  .arith-sticky-table th:nth-child(1) {\r\n    background-color: #131d35 !important;\r\n    z-index: 11 !important;\r\n  }\r\n  .arith-sticky-table td:nth-child(1) code {\r\n    display: inline-flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    min-width: 36px;\r\n    height: 28px;\r\n    padding: 0 8px;\r\n    font-family: 'JetBrains Mono', monospace;\r\n    font-weight: 700;\r\n    font-size: 0.85rem;\r\n    background: rgba(56, 189, 248, 0.12);\r\n    border: 1px solid rgba(56, 189, 248, 0.3);\r\n    border-radius: 6px;\r\n    color: #38bdf8;\r\n  }\r\n  /* Column 2: Name - Frozen Horizontally ONLY (NO vertical float) */\r\n  .arith-sticky-table th:nth-child(2),\r\n  .arith-sticky-table td:nth-child(2) {\r\n    position: sticky !important;\r\n    left: 80px !important;\r\n    top: auto !important;\r\n    z-index: 10 !important;\r\n    width: 140px !important;\r\n    min-width: 140px !important;\r\n    max-width: 140px !important;\r\n    box-sizing: border-box !important;\r\n    background-color: #0d1527 !important;\r\n    border-right: 2px solid rgba(56, 189, 248, 0.35) !important;\r\n    box-shadow: 4px 0 10px -2px rgba(0, 0, 0, 0.45) !important;\r\n    font-weight: 600 !important;\r\n    padding: 8px 12px !important;\r\n  }\r\n  .arith-sticky-table th:nth-child(2) {\r\n    background-color: #131d35 !important;\r\n    z-index: 11 !important;\r\n  }\r\n  .arith-sticky-table tbody tr:hover td:nth-child(1),\r\n  .arith-sticky-table tbody tr:hover td:nth-child(2) {\r\n    background-color: #162038 !important;\r\n  }\r\n  /* Light mode for sticky table */\r\n  [data-theme=\"light\"] .arith-sticky-table th:nth-child(1),\r\n  [data-theme=\"light\"] .arith-sticky-table th:nth-child(2) {\r\n    background-color: #f1f5f9 !important;\r\n    border-right-color: #cbd5e1 !important;\r\n  }\r\n  [data-theme=\"light\"] .arith-sticky-table td:nth-child(1),\r\n  [data-theme=\"light\"] .arith-sticky-table td:nth-child(2) {\r\n    background-color: #ffffff !important;\r\n    border-right-color: #e2e8f0 !important;\r\n  }\r\n  [data-theme=\"light\"] .arith-sticky-table td:nth-child(1) code {\r\n    background: #e0f2fe;\r\n    border-color: #7dd3fc;\r\n    color: #0284c7;\r\n  }\r\n  [data-theme=\"light\"] .arith-sticky-table td:nth-child(2) {\r\n    border-right: 2px solid rgba(14, 165, 233, 0.4) !important;\r\n    box-shadow: 4px 0 10px -2px rgba(0, 0, 0, 0.08) !important;\r\n  }\r\n  [data-theme=\"light\"] .arith-sticky-table tbody tr:hover td:nth-child(1),\r\n  [data-theme=\"light\"] .arith-sticky-table tbody tr:hover td:nth-child(2) {\r\n    background-color: #f8fafc !important;\r\n  }\r\n\r\n  /* ═════════════════════════════════════════════════════════════════════\r\n     SECTION 08: OPERATOR PRECEDENCE HIERARCHY TABLE (Frozen Col 1 & 2 - Zero Overlap)\r\n     ═════════════════════════════════════════════════════════════════════ */\r\n  .db-table-mock.arith-sticky-table.precedence-table,\r\n  .db-mock-table-wrap .db-table-mock.precedence-table {\r\n    border-collapse: separate !important;\r\n    border-spacing: 0 !important;\r\n    min-width: 920px !important;\r\n    width: 100% !important;\r\n    overflow: visible !important;\r\n    margin: 0 !important;\r\n  }\r\n  .precedence-table,\r\n  .precedence-table th,\r\n  .precedence-table td {\r\n    box-sizing: border-box !important;\r\n  }\r\n  .precedence-table th,\r\n  .precedence-table td {\r\n    padding: 10px 14px !important;\r\n    vertical-align: middle !important;\r\n    border-bottom: 1px solid rgba(255, 255, 255, 0.06) !important;\r\n    font-size: 0.84rem !important;\r\n    line-height: 1.45 !important;\r\n    box-sizing: border-box !important;\r\n  }\r\n  .precedence-table th {\r\n    background-color: #131d35 !important;\r\n    color: #94a3b8 !important;\r\n    font-weight: 700 !important;\r\n    text-transform: uppercase !important;\r\n    letter-spacing: 0.04em !important;\r\n    font-size: 0.74rem !important;\r\n    border-bottom: 2px solid rgba(56, 189, 248, 0.35) !important;\r\n    white-space: nowrap !important;\r\n  }\r\n  /* Precedence Column 1: Precedence Level - Frozen horizontally at left 0 */\r\n  .precedence-table th:nth-child(1),\r\n  .precedence-table td:nth-child(1),\r\n  .arith-sticky-table.precedence-table th:nth-child(1),\r\n  .arith-sticky-table.precedence-table td:nth-child(1) {\r\n    position: -webkit-sticky !important;\r\n    position: sticky !important;\r\n    left: 0 !important;\r\n    top: auto !important;\r\n    z-index: 10 !important;\r\n    width: 160px !important;\r\n    min-width: 160px !important;\r\n    max-width: 160px !important;\r\n    box-sizing: border-box !important;\r\n    background-color: #0d1527 !important;\r\n    border-right: 1px solid rgba(255, 255, 255, 0.08) !important;\r\n    text-align: left !important;\r\n    padding: 10px 14px !important;\r\n  }\r\n  .precedence-table th:nth-child(1),\r\n  .arith-sticky-table.precedence-table th:nth-child(1) {\r\n    background-color: #131d35 !important;\r\n    z-index: 12 !important;\r\n  }\r\n  /* Precedence Column 2: Operators - Frozen horizontally at left 160px */\r\n  .precedence-table th:nth-child(2),\r\n  .precedence-table td:nth-child(2),\r\n  .arith-sticky-table.precedence-table th:nth-child(2),\r\n  .arith-sticky-table.precedence-table td:nth-child(2) {\r\n    position: -webkit-sticky !important;\r\n    position: sticky !important;\r\n    left: 160px !important;\r\n    top: auto !important;\r\n    z-index: 10 !important;\r\n    width: 200px !important;\r\n    min-width: 200px !important;\r\n    max-width: 200px !important;\r\n    box-sizing: border-box !important;\r\n    background-color: #0d1527 !important;\r\n    border-right: 2px solid rgba(56, 189, 248, 0.35) !important;\r\n    box-shadow: 4px 0 10px -2px rgba(0, 0, 0, 0.45) !important;\r\n    padding: 10px 14px !important;\r\n  }\r\n  .precedence-table th:nth-child(2),\r\n  .arith-sticky-table.precedence-table th:nth-child(2) {\r\n    background-color: #131d35 !important;\r\n    z-index: 12 !important;\r\n  }\r\n  .precedence-table th:nth-child(3),\r\n  .precedence-table td:nth-child(3),\r\n  .arith-sticky-table.precedence-table th:nth-child(3),\r\n  .arith-sticky-table.precedence-table td:nth-child(3) {\r\n    width: 150px !important;\r\n    min-width: 140px !important;\r\n    text-align: center !important;\r\n    position: relative !important;\r\n    z-index: 1 !important;\r\n  }\r\n  .precedence-table th:nth-child(4),\r\n  .precedence-table td:nth-child(4),\r\n  .arith-sticky-table.precedence-table th:nth-child(4),\r\n  .arith-sticky-table.precedence-table td:nth-child(4) {\r\n    min-width: 320px !important;\r\n    position: relative !important;\r\n    z-index: 1 !important;\r\n  }\r\n  .precedence-table tbody tr:hover td,\r\n  .arith-sticky-table.precedence-table tbody tr:hover td {\r\n    background-color: rgba(56, 189, 248, 0.05) !important;\r\n  }\r\n  .precedence-table tbody tr:hover td:nth-child(1),\r\n  .precedence-table tbody tr:hover td:nth-child(2),\r\n  .arith-sticky-table.precedence-table tbody tr:hover td:nth-child(1),\r\n  .arith-sticky-table.precedence-table tbody tr:hover td:nth-child(2) {\r\n    background-color: #162038 !important;\r\n  }\r\n  .prec-tier-badge {\r\n    display: inline-block;\r\n    padding: 3px 8px;\r\n    font-family: 'JetBrains Mono', monospace;\r\n    font-size: 0.75rem;\r\n    font-weight: 700;\r\n    border-radius: 5px;\r\n    background: rgba(255, 255, 255, 0.05);\r\n    border: 1px solid rgba(255, 255, 255, 0.1);\r\n    color: #f1f5f9;\r\n    white-space: nowrap;\r\n  }\r\n  .prec-tier-1 {\r\n    background: rgba(244, 63, 94, 0.15);\r\n    border-color: rgba(244, 63, 94, 0.35);\r\n    color: #fb7185;\r\n  }\r\n  .prec-tier-2 {\r\n    background: rgba(245, 158, 11, 0.18);\r\n    border-color: rgba(245, 158, 11, 0.4);\r\n    color: #fbbf24;\r\n  }\r\n  .prec-tier-15 {\r\n    background: rgba(148, 163, 184, 0.12);\r\n    border-color: rgba(148, 163, 184, 0.3);\r\n    color: #94a3b8;\r\n  }\r\n  .prec-ops-wrap {\r\n    display: flex;\r\n    flex-wrap: wrap;\r\n    gap: 4px;\r\n    align-items: center;\r\n  }\r\n  .prec-ops-wrap code {\r\n    display: inline-flex;\r\n    align-items: center;\r\n    padding: 2px 7px;\r\n    font-family: 'JetBrains Mono', monospace;\r\n    font-size: 0.8rem;\r\n    font-weight: 600;\r\n    border-radius: 4px;\r\n    background: rgba(56, 189, 248, 0.1);\r\n    border: 1px solid rgba(56, 189, 248, 0.25);\r\n    color: #38bdf8;\r\n  }\r\n  .prec-op-highlight {\r\n    background: rgba(245, 158, 11, 0.2) !important;\r\n    border-color: rgba(245, 158, 11, 0.45) !important;\r\n    color: #fcd34d !important;\r\n    font-weight: 800 !important;\r\n  }\r\n  .prec-assoc-tag {\r\n    display: inline-block;\r\n    padding: 3px 9px;\r\n    border-radius: 5px;\r\n    font-size: 0.72rem;\r\n    font-weight: 700;\r\n    white-space: nowrap;\r\n  }\r\n  .prec-assoc-ltr {\r\n    background: rgba(56, 189, 248, 0.1);\r\n    color: #7dd3fc;\r\n    border: 1px solid rgba(56, 189, 248, 0.25);\r\n  }\r\n  .prec-assoc-rtl {\r\n    background: rgba(245, 158, 11, 0.15);\r\n    color: #fbbf24;\r\n    border: 1px solid rgba(245, 158, 11, 0.35);\r\n  }\r\n\r\n  /* Light mode for Precedence Table */\r\n  [data-theme=\"light\"] .precedence-table th,\r\n  [data-theme=\"light\"] .arith-sticky-table.precedence-table th {\r\n    background-color: #f1f5f9 !important;\r\n    color: #475569 !important;\r\n    border-bottom-color: #cbd5e1 !important;\r\n  }\r\n  [data-theme=\"light\"] .precedence-table td,\r\n  [data-theme=\"light\"] .arith-sticky-table.precedence-table td {\r\n    border-bottom-color: #f1f5f9 !important;\r\n    color: #1e293b !important;\r\n  }\r\n  [data-theme=\"light\"] .precedence-table tbody tr:hover td,\r\n  [data-theme=\"light\"] .arith-sticky-table.precedence-table tbody tr:hover td {\r\n    background-color: #f8fafc !important;\r\n  }\r\n  [data-theme=\"light\"] .precedence-table th:nth-child(1),\r\n  [data-theme=\"light\"] .precedence-table th:nth-child(2),\r\n  [data-theme=\"light\"] .arith-sticky-table.precedence-table th:nth-child(1),\r\n  [data-theme=\"light\"] .arith-sticky-table.precedence-table th:nth-child(2) {\r\n    background-color: #f1f5f9 !important;\r\n    border-right-color: #cbd5e1 !important;\r\n  }\r\n  [data-theme=\"light\"] .precedence-table td:nth-child(1),\r\n  [data-theme=\"light\"] .precedence-table td:nth-child(2),\r\n  [data-theme=\"light\"] .arith-sticky-table.precedence-table td:nth-child(1),\r\n  [data-theme=\"light\"] .arith-sticky-table.precedence-table td:nth-child(2) {\r\n    background-color: #ffffff !important;\r\n    border-right-color: #e2e8f0 !important;\r\n  }\r\n  [data-theme=\"light\"] .precedence-table td:nth-child(2),\r\n  [data-theme=\"light\"] .arith-sticky-table.precedence-table td:nth-child(2) {\r\n    border-right: 2px solid rgba(14, 165, 233, 0.4) !important;\r\n    box-shadow: 4px 0 10px -2px rgba(0, 0, 0, 0.08) !important;\r\n  }\r\n  [data-theme=\"light\"] .precedence-table tbody tr:hover td:nth-child(1),\r\n  [data-theme=\"light\"] .precedence-table tbody tr:hover td:nth-child(2),\r\n  [data-theme=\"light\"] .arith-sticky-table.precedence-table tbody tr:hover td:nth-child(1),\r\n  [data-theme=\"light\"] .arith-sticky-table.precedence-table tbody tr:hover td:nth-child(2) {\r\n    background-color: #f8fafc !important;\r\n  }\r\n  [data-theme=\"light\"] .prec-tier-badge {\r\n    background: #f1f5f9;\r\n    border-color: #cbd5e1;\r\n    color: #0f172a;\r\n  }\r\n  [data-theme=\"light\"] .prec-tier-1 {\r\n    background: #ffe4e6;\r\n    border-color: #fecdd3;\r\n    color: #e11d48;\r\n  }\r\n  [data-theme=\"light\"] .prec-tier-2 {\r\n    background: #fef3c7;\r\n    border-color: #fde68a;\r\n    color: #d97706;\r\n  }\r\n  [data-theme=\"light\"] .prec-ops-wrap code {\r\n    background: #e0f2fe;\r\n    border-color: #bae6fd;\r\n    color: #0284c7;\r\n  }\r\n  [data-theme=\"light\"] .prec-assoc-ltr {\r\n    background: #f0fdf4;\r\n    color: #16a34a;\r\n    border-color: #bbf7d0;\r\n  }\r\n  [data-theme=\"light\"] .prec-assoc-rtl {\r\n    background: #fffbeb;\r\n    color: #b45309;\r\n    border-color: #fde68a;\r\n  }\r\n\r\n  /* ═════════════════════════════════════════════════════════════════════\r\n     SECTION 09: MASTER ANTI-PATTERN REVIEW TABLE (Frozen Col 1 & 2 - Zero Overlap)\r\n     ═════════════════════════════════════════════════════════════════════ */\r\n  .db-table-mock.arith-sticky-table.anti-pattern-table,\r\n  .db-mock-table-wrap .db-table-mock.anti-pattern-table {\r\n    border-collapse: separate !important;\r\n    border-spacing: 0 !important;\r\n    min-width: 960px !important;\r\n    width: 100% !important;\r\n    overflow: visible !important;\r\n    margin: 0 !important;\r\n  }\r\n  .anti-pattern-table,\r\n  .anti-pattern-table th,\r\n  .anti-pattern-table td {\r\n    box-sizing: border-box !important;\r\n  }\r\n  .anti-pattern-table th,\r\n  .anti-pattern-table td {\r\n    padding: 10px 14px !important;\r\n    vertical-align: middle !important;\r\n    border-bottom: 1px solid rgba(255, 255, 255, 0.06) !important;\r\n    font-size: 0.84rem !important;\r\n    line-height: 1.45 !important;\r\n    box-sizing: border-box !important;\r\n  }\r\n  .anti-pattern-table th {\r\n    background-color: #131d35 !important;\r\n    color: #94a3b8 !important;\r\n    font-weight: 700 !important;\r\n    text-transform: uppercase !important;\r\n    letter-spacing: 0.04em !important;\r\n    font-size: 0.74rem !important;\r\n    border-bottom: 2px solid rgba(244, 63, 94, 0.35) !important;\r\n    white-space: nowrap !important;\r\n  }\r\n  /* Anti-Pattern Column 1: Buggy Code Pattern - Only this column is frozen horizontally */\r\n  .anti-pattern-table th:nth-child(1),\r\n  .anti-pattern-table td:nth-child(1),\r\n  .arith-sticky-table.anti-pattern-table th:nth-child(1),\r\n  .arith-sticky-table.anti-pattern-table td:nth-child(1) {\r\n    position: -webkit-sticky !important;\r\n    position: sticky !important;\r\n    left: 0 !important;\r\n    top: auto !important;\r\n    z-index: 10 !important;\r\n    width: 220px !important;\r\n    min-width: 220px !important;\r\n    max-width: 220px !important;\r\n    box-sizing: border-box !important;\r\n    background-color: #0d1527 !important;\r\n    border-right: 2px solid rgba(244, 63, 94, 0.4) !important;\r\n    box-shadow: 4px 0 10px -2px rgba(0, 0, 0, 0.45) !important;\r\n    text-align: left !important;\r\n    padding: 10px 14px !important;\r\n  }\r\n  .anti-pattern-table th:nth-child(1),\r\n  .arith-sticky-table.anti-pattern-table th:nth-child(1) {\r\n    background-color: #131d35 !important;\r\n    z-index: 12 !important;\r\n  }\r\n  /* Override code block styling inside column 1 */\r\n  .anti-pattern-table td:nth-child(1) code,\r\n  .arith-sticky-table.anti-pattern-table td:nth-child(1) code {\r\n    display: inline-block !important;\r\n    min-width: 0 !important;\r\n    height: auto !important;\r\n    padding: 3px 8px !important;\r\n    background: rgba(244, 63, 94, 0.12) !important;\r\n    border: 1px solid rgba(244, 63, 94, 0.3) !important;\r\n    color: #fca5a5 !important;\r\n    white-space: normal !important;\r\n  }\r\n  /* Anti-Pattern Column 2: Runtime Result - Scrolls normally with content (NOT frozen) */\r\n  .anti-pattern-table th:nth-child(2),\r\n  .anti-pattern-table td:nth-child(2),\r\n  .arith-sticky-table.anti-pattern-table th:nth-child(2),\r\n  .arith-sticky-table.anti-pattern-table td:nth-child(2) {\r\n    position: relative !important;\r\n    left: auto !important;\r\n    top: auto !important;\r\n    z-index: 1 !important;\r\n    width: 200px !important;\r\n    min-width: 180px !important;\r\n    box-sizing: border-box !important;\r\n    border-right: 1px solid rgba(255, 255, 255, 0.06) !important;\r\n    padding: 10px 14px !important;\r\n  }\r\n  .anti-pattern-table th:nth-child(3),\r\n  .anti-pattern-table td:nth-child(3),\r\n  .arith-sticky-table.anti-pattern-table th:nth-child(3),\r\n  .arith-sticky-table.anti-pattern-table td:nth-child(3) {\r\n    min-width: 260px !important;\r\n    position: relative !important;\r\n    z-index: 1 !important;\r\n  }\r\n  .anti-pattern-table th:nth-child(4),\r\n  .anti-pattern-table td:nth-child(4),\r\n  .arith-sticky-table.anti-pattern-table th:nth-child(4),\r\n  .arith-sticky-table.anti-pattern-table td:nth-child(4) {\r\n    width: 230px !important;\r\n    min-width: 210px !important;\r\n    position: relative !important;\r\n    z-index: 1 !important;\r\n  }\r\n  .anti-pattern-table tbody tr:hover td,\r\n  .arith-sticky-table.anti-pattern-table tbody tr:hover td {\r\n    background-color: rgba(244, 63, 94, 0.04) !important;\r\n  }\r\n  .anti-pattern-table tbody tr:hover td:nth-child(1),\r\n  .arith-sticky-table.anti-pattern-table tbody tr:hover td:nth-child(1) {\r\n    background-color: #162038 !important;\r\n  }\r\n  .ap-code-bug {\r\n    display: inline-block;\r\n    padding: 3px 8px;\r\n    font-family: 'JetBrains Mono', monospace;\r\n    font-size: 0.8rem;\r\n    font-weight: 600;\r\n    border-radius: 5px;\r\n    background: rgba(244, 63, 94, 0.12);\r\n    border: 1px solid rgba(244, 63, 94, 0.3);\r\n    color: #fca5a5;\r\n    word-break: break-word;\r\n  }\r\n  .ap-result-bad {\r\n    color: #f87171;\r\n    font-weight: 600;\r\n  }\r\n  .ap-code-fix {\r\n    display: inline-block;\r\n    padding: 3px 8px;\r\n    font-family: 'JetBrains Mono', monospace;\r\n    font-size: 0.8rem;\r\n    font-weight: 600;\r\n    border-radius: 5px;\r\n    background: rgba(16, 185, 129, 0.12);\r\n    border: 1px solid rgba(16, 185, 129, 0.32);\r\n    color: #6ee7b7;\r\n    word-break: break-word;\r\n  }\r\n\r\n  /* Light mode for Anti-Pattern Table */\r\n  [data-theme=\"light\"] .anti-pattern-table th,\r\n  [data-theme=\"light\"] .arith-sticky-table.anti-pattern-table th {\r\n    background-color: #f1f5f9 !important;\r\n    color: #475569 !important;\r\n    border-bottom-color: #cbd5e1 !important;\r\n  }\r\n  [data-theme=\"light\"] .anti-pattern-table td,\r\n  [data-theme=\"light\"] .arith-sticky-table.anti-pattern-table td {\r\n    border-bottom-color: #f1f5f9 !important;\r\n    color: #1e293b !important;\r\n  }\r\n  [data-theme=\"light\"] .anti-pattern-table tbody tr:hover td,\r\n  [data-theme=\"light\"] .arith-sticky-table.anti-pattern-table tbody tr:hover td {\r\n    background-color: #fef2f2 !important;\r\n  }\r\n  [data-theme=\"light\"] .anti-pattern-table th:nth-child(1),\r\n  [data-theme=\"light\"] .arith-sticky-table.anti-pattern-table th:nth-child(1) {\r\n    background-color: #f1f5f9 !important;\r\n    border-right-color: #cbd5e1 !important;\r\n  }\r\n  [data-theme=\"light\"] .anti-pattern-table td:nth-child(1),\r\n  [data-theme=\"light\"] .arith-sticky-table.anti-pattern-table td:nth-child(1) {\r\n    background-color: #ffffff !important;\r\n    border-right: 2px solid rgba(244, 63, 94, 0.4) !important;\r\n    box-shadow: 4px 0 10px -2px rgba(0, 0, 0, 0.08) !important;\r\n  }\r\n  [data-theme=\"light\"] .anti-pattern-table th:nth-child(2),\r\n  [data-theme=\"light\"] .arith-sticky-table.anti-pattern-table th:nth-child(2) {\r\n    border-right: 1px solid #e2e8f0 !important;\r\n  }\r\n  [data-theme=\"light\"] .anti-pattern-table td:nth-child(2),\r\n  [data-theme=\"light\"] .arith-sticky-table.anti-pattern-table td:nth-child(2) {\r\n    border-right: 1px solid #e2e8f0 !important;\r\n    box-shadow: none !important;\r\n  }\r\n  [data-theme=\"light\"] .anti-pattern-table tbody tr:hover td:nth-child(1),\r\n  [data-theme=\"light\"] .arith-sticky-table.anti-pattern-table tbody tr:hover td:nth-child(1) {\r\n    background-color: #fef2f2 !important;\r\n  }\r\n  [data-theme=\"light\"] .anti-pattern-table td:nth-child(1) code,\r\n  [data-theme=\"light\"] .arith-sticky-table.anti-pattern-table td:nth-child(1) code {\r\n    background: #fee2e2 !important;\r\n    border-color: #fca5a5 !important;\r\n    color: #b91c1c !important;\r\n  }\r\n\r\n  /* ═════════════════════════════════════════════════════════════════════\r\n     STUNNING KEY NOTES CARD DESIGN SYSTEM (Inherited Body Font + Glassmorphism)\r\n     ═════════════════════════════════════════════════════════════════════ */\r\n  .py-keynotes-card {\r\n    background: linear-gradient(135deg, rgba(15, 23, 42, 0.85) 0%, rgba(30, 41, 59, 0.65) 100%) !important;\r\n    backdrop-filter: blur(12px);\r\n    -webkit-backdrop-filter: blur(12px);\r\n    border: 1px solid rgba(56, 189, 248, 0.28) !important;\r\n    border-left: 4px solid #38bdf8 !important;\r\n    border-radius: 12px !important;\r\n    padding: 16px 20px !important;\r\n    margin: 18px 0 10px 0 !important;\r\n    display: grid !important;\r\n    grid-template-columns: auto 1fr !important;\r\n    column-gap: 12px !important;\r\n    row-gap: 14px !important;\r\n    align-items: center !important;\r\n    box-shadow: 0 8px 24px -4px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.06) !important;\r\n    font-family: inherit !important;\r\n  }\r\n  .py-keynotes-icon-wrap {\r\n    grid-column: 1 !important;\r\n    grid-row: 1 !important;\r\n    width: 34px !important;\r\n    height: 34px !important;\r\n    border-radius: 9px !important;\r\n    background: rgba(56, 189, 248, 0.12) !important;\r\n    border: 1px solid rgba(56, 189, 248, 0.28) !important;\r\n    display: flex !important;\r\n    align-items: center !important;\r\n    justify-content: center !important;\r\n    font-size: 1.15rem !important;\r\n    flex-shrink: 0 !important;\r\n    box-shadow: 0 0 12px rgba(56, 189, 248, 0.2) !important;\r\n  }\r\n  .py-keynotes-body {\r\n    display: contents !important;\r\n  }\r\n  .py-keynotes-header {\r\n    grid-column: 2 !important;\r\n    grid-row: 1 !important;\r\n    display: flex !important;\r\n    align-items: center !important;\r\n    gap: 10px !important;\r\n    margin-bottom: 0 !important;\r\n  }\r\n  .py-keynotes-title {\r\n    font-size: 0.78rem !important;\r\n    font-weight: 800 !important;\r\n    text-transform: uppercase !important;\r\n    letter-spacing: 0.08em !important;\r\n    color: #38bdf8 !important;\r\n    font-family: inherit !important;\r\n  }\r\n  .py-keynotes-tag {\r\n    font-size: 0.68rem !important;\r\n    padding: 2px 10px !important;\r\n    border-radius: 12px !important;\r\n    background: rgba(56, 189, 248, 0.14) !important;\r\n    border: 1px solid rgba(56, 189, 248, 0.28) !important;\r\n    color: #7dd3fc !important;\r\n    font-weight: 700 !important;\r\n    font-family: inherit !important;\r\n  }\r\n  .py-keynotes-list {\r\n    grid-column: 1 / -1 !important;\r\n    grid-row: 2 !important;\r\n    margin: 0 !important;\r\n    padding: 0 !important;\r\n    list-style: none !important;\r\n    font-family: inherit !important;\r\n    width: 100% !important;\r\n  }\r\n  .py-keynotes-list li {\r\n    position: relative !important;\r\n    padding-left: 24px !important;\r\n    margin-bottom: 10px !important;\r\n    font-size: 0.85rem !important;\r\n    line-height: 1.65 !important;\r\n    color: #e2e8f0 !important;\r\n    font-family: inherit !important;\r\n    text-align: justify !important;\r\n    text-align-last: left !important;\r\n    text-justify: inter-word !important;\r\n  }\r\n  .py-keynotes-list li:last-child {\r\n    margin-bottom: 0 !important;\r\n  }\r\n  .py-keynotes-list li::before {\r\n    content: \"\" !important;\r\n    position: absolute !important;\r\n    left: 4px !important;\r\n    top: 9px !important;\r\n    width: 7px !important;\r\n    height: 7px !important;\r\n    border-radius: 50% !important;\r\n    background: #38bdf8 !important;\r\n    box-shadow: 0 0 8px rgba(56, 189, 248, 0.85) !important;\r\n  }\r\n  .py-keynotes-list li strong {\r\n    color: #f8fafc !important;\r\n    font-weight: 700 !important;\r\n  }\r\n  .py-keynotes-list li code {\r\n    font-family: 'JetBrains Mono', monospace !important;\r\n    background: rgba(56, 189, 248, 0.12) !important;\r\n    border: 1px solid rgba(56, 189, 248, 0.25) !important;\r\n    padding: 2px 6px !important;\r\n    border-radius: 5px !important;\r\n    color: #38bdf8 !important;\r\n    font-size: 0.8rem !important;\r\n    font-weight: 600 !important;\r\n  }\r\n  /* Light Theme for Keynotes */\r\n  [data-theme=\"light\"] .py-keynotes-card {\r\n    background: linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%) !important;\r\n    border: 1px solid rgba(14, 165, 233, 0.3) !important;\r\n    border-left: 4px solid #0284c7 !important;\r\n    box-shadow: 0 8px 24px -4px rgba(14, 165, 233, 0.12), inset 0 1px 0 #ffffff !important;\r\n  }\r\n  [data-theme=\"light\"] .py-keynotes-icon-wrap {\r\n    background: #e0f2fe !important;\r\n    border-color: #bae6fd !important;\r\n    box-shadow: 0 0 12px rgba(14, 165, 233, 0.18) !important;\r\n  }\r\n  [data-theme=\"light\"] .py-keynotes-title {\r\n    color: #0284c7 !important;\r\n  }\r\n  [data-theme=\"light\"] .py-keynotes-tag {\r\n    background: #e0f2fe !important;\r\n    border-color: #bae6fd !important;\r\n    color: #0369a1 !important;\r\n  }\r\n  [data-theme=\"light\"] .py-keynotes-list li {\r\n    color: #334155 !important;\r\n  }\r\n  [data-theme=\"light\"] .py-keynotes-list li::before {\r\n    background: #0284c7 !important;\r\n    box-shadow: 0 0 6px rgba(2, 132, 199, 0.5) !important;\r\n  }\r\n  [data-theme=\"light\"] .py-keynotes-list li strong {\r\n    color: #0f172a !important;\r\n  }\r\n  [data-theme=\"light\"] .py-keynotes-list li code {\r\n    background: #e0f2fe !important;\r\n    border-color: #7dd3fc !important;\r\n    color: #0369a1 !important;\r\n  }\r\n\r\n  /* ═════════════════════════════════════════════════════════════════════\r\n     COGNITIVE LEARNING & SCIENTIFIC VISUAL MODELS DESIGN SYSTEM\r\n     ═════════════════════════════════════════════════════════════════════ */\r\n\r\n  /* 🧠 10-Second Recall Hook (Mnemonic / Interview Anchor) */\r\n  .py-recall-hook {\r\n    background: linear-gradient(135deg, rgba(56, 189, 248, 0.08) 0%, rgba(168, 85, 247, 0.08) 100%);\r\n    border: 1px solid rgba(56, 189, 248, 0.25);\r\n    border-left: 4px solid #38bdf8;\r\n    border-radius: 10px;\r\n    padding: 14px 18px;\r\n    margin: 20px 0 10px 0;\r\n    display: flex;\r\n    gap: 14px;\r\n    align-items: flex-start;\r\n    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);\r\n  }\r\n  .py-recall-icon {\r\n    font-size: 1.4rem;\r\n    line-height: 1;\r\n    flex-shrink: 0;\r\n  }\r\n  .py-recall-body {\r\n    flex: 1;\r\n  }\r\n  .py-recall-header {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 8px;\r\n    margin-bottom: 4px;\r\n  }\r\n  .py-recall-title {\r\n    font-family: 'JetBrains Mono', monospace;\r\n    font-size: 0.72rem;\r\n    font-weight: 800;\r\n    text-transform: uppercase;\r\n    letter-spacing: 0.08em;\r\n    color: #38bdf8;\r\n  }\r\n  .py-recall-tag {\r\n    font-size: 0.65rem;\r\n    padding: 1px 6px;\r\n    border-radius: 4px;\r\n    background: rgba(56, 189, 248, 0.15);\r\n    color: #bae6fd;\r\n    font-weight: 600;\r\n  }\r\n  .py-recall-list {\r\n    margin: 0;\r\n    padding-left: 1.5rem;\r\n    list-style-type: disc;\r\n    font-family: 'JetBrains Mono', monospace;\r\n    font-size: 0.82rem;\r\n    color: #e2e8f0;\r\n    line-height: 1.6;\r\n  }\r\n  .py-recall-list li {\r\n    margin-bottom: 6px;\r\n  }\r\n  [data-theme=\"light\"] .py-recall-list { color: #334155; }\r\n  .py-recall-text {\r\n    font-size: 0.82rem;\r\n    line-height: 1.55;\r\n    color: #e2e8f0;\r\n    margin: 0;\r\n  }\r\n  .py-recall-text code {\r\n    font-family: 'JetBrains Mono', monospace;\r\n    background: rgba(0, 0, 0, 0.35);\r\n    padding: 2px 5px;\r\n    border-radius: 4px;\r\n    color: #38bdf8;\r\n    font-size: 0.78rem;\r\n  }\r\n\r\n  /* 💡 Visual Cognitive Model Container */\r\n  .cog-model-card {\r\n    background: rgba(15, 23, 42, 0.65);\r\n    border: 1px solid rgba(255, 255, 255, 0.08);\r\n    border-radius: 12px;\r\n    padding: 18px;\r\n    margin: 18px 0;\r\n    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);\r\n  }\r\n  .cog-model-header {\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: space-between;\r\n    margin-bottom: 14px;\r\n    padding-bottom: 10px;\r\n    border-bottom: 1px solid rgba(255, 255, 255, 0.08);\r\n  }\r\n  .cog-model-title-wrap {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 10px;\r\n  }\r\n  .cog-model-badge {\r\n    background: rgba(56, 189, 248, 0.15);\r\n    border: 1px solid rgba(56, 189, 248, 0.3);\r\n    color: #38bdf8;\r\n    font-family: 'JetBrains Mono', monospace;\r\n    font-size: 0.68rem;\r\n    font-weight: 800;\r\n    padding: 3px 8px;\r\n    border-radius: 5px;\r\n    text-transform: uppercase;\r\n  }\r\n  .cog-model-title {\r\n    font-size: 0.92rem;\r\n    font-weight: 800;\r\n    color: #f8fafc;\r\n    margin: 0;\r\n  }\r\n  .cog-model-subtitle {\r\n    font-size: 0.72rem;\r\n    color: #94a3b8;\r\n  }\r\n\r\n  /* Diagram 1: Number Line Euclidean Floor Division */\r\n  .numline-wrap {\r\n    position: relative;\r\n    padding: 30px 14px 16px 14px;\r\n    background: rgba(0, 0, 0, 0.25);\r\n    border-radius: 8px;\r\n    border: 1px solid rgba(255, 255, 255, 0.05);\r\n  }\r\n  .numline-axis {\r\n    display: flex;\r\n    justify-content: space-between;\r\n    align-items: center;\r\n    position: relative;\r\n    margin: 30px 10px 10px 10px;\r\n    height: 4px;\r\n    background: linear-gradient(90deg, #f43f5e 0%, #38bdf8 50%, #22c55e 100%);\r\n    border-radius: 2px;\r\n  }\r\n  .numline-tick {\r\n    position: relative;\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n  }\r\n  .numline-dot {\r\n    width: 12px;\r\n    height: 12px;\r\n    border-radius: 50%;\r\n    background: #0f172a;\r\n    border: 2px solid #94a3b8;\r\n    z-index: 2;\r\n  }\r\n  .numline-val {\r\n    font-family: 'JetBrains Mono', monospace;\r\n    font-size: 0.75rem;\r\n    font-weight: 700;\r\n    color: #94a3b8;\r\n    margin-top: 6px;\r\n  }\r\n  .numline-pointer-left {\r\n    position: absolute;\r\n    top: -46px;\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    transform: translateX(-50%);\r\n  }\r\n  .numline-pill {\r\n    padding: 3px 8px;\r\n    border-radius: 5px;\r\n    font-family: 'JetBrains Mono', monospace;\r\n    font-size: 0.70rem;\r\n    font-weight: 800;\r\n    white-space: nowrap;\r\n  }\r\n  .pill-danger {\r\n    background: rgba(244, 63, 94, 0.25);\r\n    border: 1px solid #f43f5e;\r\n    color: #fca5a5;\r\n  }\r\n  .pill-success {\r\n    background: rgba(34, 197, 94, 0.25);\r\n    border: 1px solid #22c55e;\r\n    color: #86efac;\r\n  }\r\n  .pill-info {\r\n    background: rgba(56, 189, 248, 0.25);\r\n    border: 1px solid #38bdf8;\r\n    color: #bae6fd;\r\n  }\r\n  .numline-arrow-down {\r\n    width: 0;\r\n    height: 0;\r\n    border-left: 5px solid transparent;\r\n    border-right: 5px solid transparent;\r\n    border-top: 6px solid #38bdf8;\r\n  }\r\n  .arrow-rose { border-top-color: #f43f5e; }\r\n  .arrow-green { border-top-color: #22c55e; }\r\n  .numline-legend {\r\n    display: flex;\r\n    flex-wrap: wrap;\r\n    gap: 16px;\r\n    margin-top: 14px;\r\n    padding-top: 12px;\r\n    border-top: 1px dashed rgba(255, 255, 255, 0.08);\r\n    font-size: 0.74rem;\r\n    color: #cbd5e1;\r\n  }\r\n  .numline-legend-item {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 6px;\r\n  }\r\n\r\n  /* Diagram 2: RAM Memory Pointer Architecture */\r\n  .ram-schematic-grid {\r\n    display: grid;\r\n    grid-template-columns: 1fr 1fr;\r\n    gap: 14px;\r\n  }\r\n  @media (max-width: 768px) {\r\n    .ram-schematic-grid { grid-template-columns: 1fr; }\r\n  }\r\n  .ram-schematic-box {\r\n    background: rgba(0, 0, 0, 0.25);\r\n    border: 1px solid rgba(255, 255, 255, 0.08);\r\n    border-radius: 8px;\r\n    padding: 14px;\r\n  }\r\n  .ram-schematic-head {\r\n    display: flex;\r\n    justify-content: space-between;\r\n    align-items: center;\r\n    margin-bottom: 10px;\r\n    padding-bottom: 8px;\r\n    border-bottom: 1px solid rgba(255, 255, 255, 0.06);\r\n  }\r\n  .ram-head-title {\r\n    font-family: 'JetBrains Mono', monospace;\r\n    font-size: 0.76rem;\r\n    font-weight: 800;\r\n  }\r\n  .ram-node-row {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 10px;\r\n    margin: 8px 0;\r\n    font-family: 'JetBrains Mono', monospace;\r\n    font-size: 0.75rem;\r\n  }\r\n  .ram-var-tag {\r\n    background: rgba(56, 189, 248, 0.15);\r\n    border: 1px solid rgba(56, 189, 248, 0.3);\r\n    color: #38bdf8;\r\n    padding: 4px 10px;\r\n    border-radius: 6px;\r\n    font-weight: 700;\r\n    width: 60px;\r\n    text-align: center;\r\n  }\r\n  .ram-arrow-connector {\r\n    color: #64748b;\r\n    font-weight: 700;\r\n  }\r\n  .ram-address-block {\r\n    flex: 1;\r\n    background: rgba(255, 255, 255, 0.03);\r\n    border: 1px solid rgba(255, 255, 255, 0.1);\r\n    border-radius: 6px;\r\n    padding: 6px 12px;\r\n    display: flex;\r\n    justify-content: space-between;\r\n    align-items: center;\r\n  }\r\n  .ram-addr-label {\r\n    font-size: 0.65rem;\r\n    color: #94a3b8;\r\n  }\r\n  .ram-addr-val {\r\n    color: #fbbf24;\r\n    font-weight: 700;\r\n  }\r\n  .ram-content-val {\r\n    color: #f8fafc;\r\n    font-weight: 700;\r\n  }\r\n\r\n  /* Diagram 3: Circuit Breaker Flowchart */\r\n  .circuit-grid {\r\n    display: grid;\r\n    grid-template-columns: 1fr 1fr;\r\n    gap: 14px;\r\n  }\r\n  @media (max-width: 768px) {\r\n    .circuit-grid { grid-template-columns: 1fr; }\r\n  }\r\n  .circuit-box {\r\n    background: rgba(0, 0, 0, 0.25);\r\n    border: 1px solid rgba(255, 255, 255, 0.08);\r\n    border-radius: 8px;\r\n    padding: 14px;\r\n  }\r\n  .circuit-step-list {\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 8px;\r\n    margin-top: 8px;\r\n  }\r\n  .circuit-step-node {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 10px;\r\n    padding: 8px 12px;\r\n    border-radius: 6px;\r\n    background: rgba(255, 255, 255, 0.03);\r\n    border: 1px solid rgba(255, 255, 255, 0.06);\r\n    font-family: 'JetBrains Mono', monospace;\r\n    font-size: 0.74rem;\r\n  }\r\n  .circuit-badge {\r\n    padding: 2px 7px;\r\n    border-radius: 4px;\r\n    font-size: 0.65rem;\r\n    font-weight: 800;\r\n    text-transform: uppercase;\r\n  }\r\n  .circuit-badge--halt {\r\n    background: rgba(244, 63, 94, 0.2);\r\n    color: #f43f5e;\r\n    border: 1px solid rgba(244, 63, 94, 0.4);\r\n  }\r\n  .circuit-badge--pass {\r\n    background: rgba(34, 197, 94, 0.2);\r\n    color: #22c55e;\r\n    border: 1px solid rgba(34, 197, 94, 0.4);\r\n  }\r\n\r\n  /* Diagram 4: Twin House Identity vs Equality */\r\n  .twin-house-grid {\r\n    display: grid;\r\n    grid-template-columns: 1fr 1fr;\r\n    gap: 14px;\r\n    margin-top: 10px;\r\n  }\r\n  @media (max-width: 640px) {\r\n    .twin-house-grid { grid-template-columns: 1fr; }\r\n  }\r\n  .twin-card {\r\n    background: rgba(0, 0, 0, 0.25);\r\n    border: 1px solid rgba(255, 255, 255, 0.08);\r\n    border-radius: 8px;\r\n    padding: 14px;\r\n    text-align: center;\r\n  }\r\n  .twin-house-icon {\r\n    font-size: 2rem;\r\n    margin-bottom: 4px;\r\n  }\r\n  .twin-house-title {\r\n    font-family: 'JetBrains Mono', monospace;\r\n    font-size: 0.84rem;\r\n    font-weight: 800;\r\n    color: #f8fafc;\r\n  }\r\n  .twin-house-addr {\r\n    font-family: 'JetBrains Mono', monospace;\r\n    font-size: 0.70rem;\r\n    color: #fbbf24;\r\n    margin-bottom: 8px;\r\n  }\r\n  .twin-furniture-box {\r\n    background: rgba(255, 255, 255, 0.04);\r\n    border: 1px dashed rgba(255, 255, 255, 0.15);\r\n    border-radius: 6px;\r\n    padding: 8px;\r\n    font-family: 'JetBrains Mono', monospace;\r\n    font-size: 0.76rem;\r\n    color: #38bdf8;\r\n    margin-bottom: 8px;\r\n  }\r\n  .twin-verdict-row {\r\n    display: flex;\r\n    justify-content: space-around;\r\n    padding-top: 8px;\r\n    border-top: 1px solid rgba(255, 255, 255, 0.08);\r\n    font-family: 'JetBrains Mono', monospace;\r\n    font-size: 0.74rem;\r\n  }\r\n\r\n  /* Diagram 5: 8-Bit Hardware Register & RBAC Switchboard */\r\n  .dip-register-grid {\r\n    display: grid;\r\n    grid-template-columns: repeat(8, 1fr);\r\n    gap: 6px;\r\n    margin: 12px 0;\r\n  }\r\n  @media (max-width: 640px) {\r\n    .dip-register-grid { grid-template-columns: repeat(4, 1fr); }\r\n  }\r\n  .dip-cell {\r\n    background: rgba(0, 0, 0, 0.35);\r\n    border: 1px solid rgba(255, 255, 255, 0.08);\r\n    border-radius: 6px;\r\n    padding: 8px 4px;\r\n    text-align: center;\r\n    font-family: 'JetBrains Mono', monospace;\r\n  }\r\n  .dip-bit-idx {\r\n    font-size: 0.62rem;\r\n    color: #64748b;\r\n    margin-bottom: 2px;\r\n  }\r\n  .dip-bit-power {\r\n    font-size: 0.72rem;\r\n    font-weight: 800;\r\n    color: #94a3b8;\r\n  }\r\n  .dip-bit-flag {\r\n    font-size: 0.62rem;\r\n    font-weight: 700;\r\n    margin: 4px 0;\r\n    height: 16px;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n  }\r\n  .dip-switch-indicator {\r\n    width: 14px;\r\n    height: 14px;\r\n    border-radius: 50%;\r\n    margin: 4px auto 0 auto;\r\n    border: 2px solid #64748b;\r\n  }\r\n  .switch-on {\r\n    background: #22c55e;\r\n    border-color: #4ade80;\r\n    box-shadow: 0 0 8px rgba(34, 197, 94, 0.6);\r\n  }\r\n  .switch-off {\r\n    background: #1e293b;\r\n    border-color: #475569;\r\n  }\r\n\r\n  /* Diagram 6: Walrus Stream Pipeline */\r\n  .walrus-flow-wrap {\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: space-between;\r\n    gap: 8px;\r\n    background: rgba(0, 0, 0, 0.25);\r\n    border: 1px solid rgba(255, 255, 255, 0.08);\r\n    border-radius: 8px;\r\n    padding: 14px;\r\n    margin-top: 10px;\r\n    overflow-x: auto;\r\n  }\r\n  .walrus-flow-step {\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    text-align: center;\r\n    min-width: 120px;\r\n  }\r\n  .walrus-step-badge {\r\n    background: rgba(168, 85, 247, 0.15);\r\n    border: 1px solid rgba(168, 85, 247, 0.3);\r\n    color: #c084fc;\r\n    font-family: 'JetBrains Mono', monospace;\r\n    font-size: 0.68rem;\r\n    font-weight: 800;\r\n    padding: 2px 8px;\r\n    border-radius: 4px;\r\n    margin-bottom: 6px;\r\n  }\r\n  .walrus-step-desc {\r\n    font-family: 'JetBrains Mono', monospace;\r\n    font-size: 0.72rem;\r\n    color: #cbd5e1;\r\n  }\r\n\r\n  /* Diagram 7: PEUMASCILA Mnemonic Ladder */\r\n  .ladder-container {\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 6px;\r\n    margin: 14px 0;\r\n  }\r\n  .ladder-rung {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 12px;\r\n    padding: 8px 14px;\r\n    border-radius: 8px;\r\n    background: rgba(255, 255, 255, 0.03);\r\n    border: 1px solid rgba(255, 255, 255, 0.07);\r\n    font-family: 'JetBrains Mono', monospace;\r\n    transition: transform 0.2s ease;\r\n  }\r\n  .ladder-rung:hover {\r\n    transform: translateX(4px);\r\n  }\r\n  .ladder-letter {\r\n    width: 24px;\r\n    height: 24px;\r\n    border-radius: 6px;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    font-size: 0.82rem;\r\n    font-weight: 900;\r\n  }\r\n  .rung-rose { background: rgba(244, 63, 94, 0.2); color: #fb7185; border: 1px solid rgba(244, 63, 94, 0.4); }\r\n  .rung-gold { background: rgba(245, 158, 11, 0.2); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.4); }\r\n  .rung-purple { background: rgba(168, 85, 247, 0.2); color: #c084fc; border: 1px solid rgba(168, 85, 247, 0.4); }\r\n  .rung-blue { background: rgba(56, 189, 248, 0.2); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.4); }\r\n  .rung-green { background: rgba(34, 197, 94, 0.2); color: #4ade80; border: 1px solid rgba(34, 197, 94, 0.4); }\r\n  .rung-muted { background: rgba(255, 255, 255, 0.05); color: #94a3b8; border: 1px solid rgba(255, 255, 255, 0.1); }\r\n  .ladder-title {\r\n    font-size: 0.80rem;\r\n    font-weight: 800;\r\n    color: #f8fafc;\r\n    width: 140px;\r\n  }\r\n  .ladder-ops {\r\n    flex: 1;\r\n    font-size: 0.74rem;\r\n    color: #94a3b8;\r\n  }\r\n  .ladder-priority {\r\n    font-size: 0.65rem;\r\n    padding: 2px 7px;\r\n    border-radius: 4px;\r\n    background: rgba(255, 255, 255, 0.05);\r\n    color: #cbd5e1;\r\n  }\r\n\r\n  /* Light mode adaptations for all cognitive learning components */\r\n  [data-theme=\"light\"] .py-recall-hook {\r\n    background: linear-gradient(135deg, rgba(2, 132, 199, 0.08) 0%, rgba(147, 51, 234, 0.08) 100%);\r\n    border-color: rgba(2, 132, 199, 0.3);\r\n    border-left-color: #0284c7;\r\n    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);\r\n  }\r\n  [data-theme=\"light\"] .py-recall-title { color: #0284c7; }\r\n  [data-theme=\"light\"] .py-recall-text { color: #1e293b; }\r\n  [data-theme=\"light\"] .py-recall-text code {\r\n    background: #f1f5f9;\r\n    color: #0369a1;\r\n    border: 1px solid #cbd5e1;\r\n  }\r\n  [data-theme=\"light\"] .cog-model-card {\r\n    background: #ffffff;\r\n    border-color: #e2e8f0;\r\n    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);\r\n  }\r\n\r\n  /* Bitmask RBAC Card */\r\n  .bitmask-grid {\r\n    display: grid;\r\n    grid-template-columns: repeat(4, 1fr);\r\n    gap: 10px;\r\n    margin-top: 12px;\r\n  }\r\n  @media (max-width: 768px) {\r\n    .bitmask-grid { grid-template-columns: repeat(2, 1fr); }\r\n  }\r\n  @media (max-width: 480px) {\r\n    .bitmask-grid { grid-template-columns: 1fr; }\r\n  }\r\n  .bitmask-cell {\r\n    background: rgba(255, 255, 255, 0.03);\r\n    border: 1px solid rgba(255, 255, 255, 0.07);\r\n    border-radius: 8px;\r\n    padding: 12px;\r\n    text-align: center;\r\n  }\r\n  .bitmask-cell-title {\r\n    font-family: 'JetBrains Mono', monospace;\r\n    font-size: 0.78rem;\r\n    font-weight: 800;\r\n  }\r\n  .bitmask-cell-title--blue { color: #38bdf8; }\r\n  .bitmask-cell-title--green { color: #34d399; }\r\n  .bitmask-cell-title--amber { color: #fbbf24; }\r\n  .bitmask-cell-title--purple { color: #c084fc; }\r\n\r\n  .bitmask-cell-sub {\r\n    font-size: 0.68rem;\r\n    color: #94a3b8;\r\n    margin-top: 4px;\r\n  }\r\n  .bitmask-actions {\r\n    display: flex;\r\n    justify-content: space-around;\r\n    margin-top: 10px;\r\n    font-family: 'JetBrains Mono', monospace;\r\n    font-size: 0.72rem;\r\n    color: #cbd5e1;\r\n  }\r\n\r\n  /* Arity Grid */\r\n  .arity-grid {\r\n    display: grid;\r\n    grid-template-columns: repeat(3, 1fr);\r\n    gap: 12px;\r\n    margin: 16px 0;\r\n  }\r\n  @media (max-width: 640px) {\r\n    .arity-grid { grid-template-columns: 1fr; }\r\n  }\r\n  .arity-card {\r\n    background: rgba(255, 255, 255, 0.03);\r\n    border: 1px solid rgba(255, 255, 255, 0.08);\r\n    border-radius: 10px;\r\n    padding: 14px;\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 8px;\r\n  }\r\n  .arity-head {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 8px;\r\n  }\r\n  .arity-badge {\r\n    background: rgba(56, 189, 248, 0.15);\r\n    border: 1px solid rgba(56, 189, 248, 0.3);\r\n    color: #38bdf8;\r\n    font-family: 'JetBrains Mono', monospace;\r\n    font-size: 0.72rem;\r\n    font-weight: 800;\r\n    width: 22px;\r\n    height: 22px;\r\n    border-radius: 6px;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n  }\r\n  .arity-name {\r\n    font-weight: 700;\r\n    font-size: 0.88rem;\r\n    color: #f8fafc;\r\n  }\r\n  .arity-desc {\r\n    font-size: 0.75rem;\r\n    color: #94a3b8;\r\n    margin: 0;\r\n    line-height: 1.4;\r\n  }\r\n  .arity-chips {\r\n    display: flex;\r\n    flex-wrap: wrap;\r\n    gap: 6px;\r\n    margin-top: 4px;\r\n  }\r\n  .arity-chip {\r\n    font-family: 'JetBrains Mono', monospace;\r\n    font-size: 0.72rem;\r\n    background: rgba(0, 0, 0, 0.3);\r\n    border: 1px solid rgba(255, 255, 255, 0.1);\r\n    border-radius: 4px;\r\n    padding: 2px 7px;\r\n    color: #e2e8f0;\r\n  }\r\n\r\n\r\n  /* Operator Classification Grid */\r\n  .op-matrix-list {\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 12px;\r\n    margin-top: 14px;\r\n  }\r\n  .op-family-card {\r\n    background: rgba(255, 255, 255, 0.02);\r\n    border: 1px solid rgba(255, 255, 255, 0.08);\r\n    border-radius: 8px;\r\n    padding: 14px;\r\n  }\r\n  .op-family-header {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 12px;\r\n    margin-bottom: 12px;\r\n  }\r\n  @media (max-width: 640px) {\r\n    .op-family-header { flex-direction: column; align-items: flex-start; gap: 6px; }\r\n  }\r\n  .op-family-desc {\r\n    font-size: 0.75rem;\r\n    color: #94a3b8;\r\n    line-height: 1.4;\r\n  }\r\n  .op-symbols-grid {\r\n    display: flex;\r\n    flex-wrap: wrap;\r\n    gap: 8px;\r\n  }\r\n  .op-symbol-box {\r\n    background: rgba(0, 0, 0, 0.3);\r\n    border: 1px solid rgba(255, 255, 255, 0.1);\r\n    border-radius: 6px;\r\n    padding: 6px 12px;\r\n    font-family: 'JetBrains Mono', monospace;\r\n    font-size: 0.85rem;\r\n    color: #f8fafc;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    min-width: 40px;\r\n    transition: all 0.2s ease;\r\n  }\r\n  .op-symbol-box:hover {\r\n    background: rgba(56, 189, 248, 0.1);\r\n    border-color: rgba(56, 189, 248, 0.4);\r\n    color: #38bdf8;\r\n    transform: translateY(-2px);\r\n  }\r\n  [data-theme=\"light\"] .op-family-card {\r\n    background: #f8fafc;\r\n    border-color: #e2e8f0;\r\n  }\r\n  [data-theme=\"light\"] .op-family-desc {\r\n    color: #475569;\r\n  }\r\n  [data-theme=\"light\"] .op-symbol-box {\r\n    background: #ffffff;\r\n    border-color: #cbd5e1;\r\n    color: #0f172a;\r\n  }\r\n  [data-theme=\"light\"] .op-symbol-box:hover {\r\n    background: #f0f9ff;\r\n    border-color: #38bdf8;\r\n    color: #0284c7;\r\n  }\r\n\r\n  /* Category pills */\r\n  .fam-chip {\r\n    display: inline-block;\r\n    padding: 2px 8px;\r\n    border-radius: 4px;\r\n    font-size: 0.72rem;\r\n    font-weight: 700;\r\n    font-family: 'Outfit', sans-serif;\r\n  }\r\n  .fam-chip--arith { background: rgba(56, 189, 248, 0.15); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.3); }\r\n  .fam-chip--assign { background: rgba(168, 85, 247, 0.15); color: #c084fc; border: 1px solid rgba(168, 85, 247, 0.3); }\r\n  .fam-chip--compare { background: rgba(52, 211, 153, 0.15); color: #34d399; border: 1px solid rgba(52, 211, 153, 0.3); }\r\n  .fam-chip--logic { background: rgba(251, 191, 36, 0.15); color: #fbbf24; border: 1px solid rgba(251, 191, 36, 0.3); }\r\n  .fam-chip--ident { background: rgba(244, 63, 94, 0.15); color: #fb7185; border: 1px solid rgba(244, 63, 94, 0.3); }\r\n  .fam-chip--member { background: rgba(14, 165, 233, 0.15); color: #38bdf8; border: 1px solid rgba(14, 165, 233, 0.3); }\r\n  .fam-chip--bitwise { background: rgba(234, 88, 12, 0.15); color: #fb923c; border: 1px solid rgba(234, 88, 12, 0.3); }\r\n  .fam-chip--cond { background: rgba(16, 185, 129, 0.15); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.3); }\r\n  .fam-chip--spotlight {\r\n    background: rgba(245, 158, 11, 0.18);\r\n    color: #fbbf24;\r\n    border: 1px solid rgba(245, 158, 11, 0.45);\r\n    letter-spacing: 0.03em;\r\n    font-size: 0.72rem;\r\n    font-weight: 700;\r\n    padding: 3px 9px;\r\n    border-radius: 6px;\r\n    vertical-align: middle;\r\n    display: inline-flex;\r\n    align-items: center;\r\n    gap: 4px;\r\n    box-shadow: 0 1px 4px rgba(245, 158, 11, 0.1);\r\n  }\r\n  [data-theme=\"light\"] .fam-chip--spotlight {\r\n    background: rgba(245, 158, 11, 0.14);\r\n    color: #b45309;\r\n    border-color: rgba(245, 158, 11, 0.35);\r\n  }\r\n\r\n  /* Subcards with divider */\r\n  .topic-subcard {\r\n    margin-top: 22px;\r\n    padding-top: 16px;\r\n    border-top: 1px dashed rgba(255, 255, 255, 0.1);\r\n  }\r\n\r\n  /* Table and Section Header Utilities (100% Class-Driven, 0 Inline Styles) */\r\n  .table-header-wrap {\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: space-between;\r\n    gap: 8px;\r\n    margin-bottom: 8px;\r\n    padding: 0 4px;\r\n  }\r\n  .table-header-title {\r\n    margin: 0;\r\n    font-size: 0.95rem;\r\n    font-weight: 800;\r\n    letter-spacing: -0.01em;\r\n    flex: 1;\r\n  }\r\n  .subcard-header-with-audio {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 8px;\r\n    margin-bottom: 8px;\r\n  }\r\n  .subcard-header-title {\r\n    margin: 0;\r\n    font-size: 0.95rem;\r\n    font-weight: 800;\r\n    flex: 1;\r\n  }\r\n  .pipeline-flow-box {\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: space-between;\r\n    padding: 12px 16px;\r\n    background: rgba(255, 255, 255, 0.02);\r\n    border: 1px solid rgba(255, 255, 255, 0.06);\r\n    border-radius: 8px;\r\n    font-family: 'JetBrains Mono', monospace;\r\n    font-size: 0.75rem;\r\n    margin-top: 6px;\r\n    overflow-x: auto;\r\n  }\r\n  .pipeline-flow-tip {\r\n    font-size: 0.75rem;\r\n    color: #94a3b8;\r\n    margin-top: 8px;\r\n    line-height: 1.5;\r\n  }\r\n  .tok-blue { color: #38bdf8; }\r\n  .tok-green { color: #34d399; }\r\n  .tok-amber { color: #fbbf24; }\r\n  .tok-purple { color: #a855f7; }\r\n  .tok-rose { color: #f43f5e; }\r\n  .tok-muted { color: #64748b; }\r\n\r\n  /* 3-Column Complexity Grid */\r\n  .complexity-grid {\r\n    display: grid;\r\n    grid-template-columns: repeat(3, 1fr);\r\n    gap: 10px;\r\n    margin-top: 6px;\r\n  }\r\n  @media (max-width: 640px) {\r\n    .complexity-grid { grid-template-columns: 1fr; }\r\n  }\r\n  .complexity-cell {\r\n    background: rgba(255, 255, 255, 0.03);\r\n    border: 1px solid rgba(255, 255, 255, 0.07);\r\n    border-radius: 8px;\r\n    padding: 12px;\r\n    text-align: center;\r\n  }\r\n  .complexity-expr {\r\n    font-family: 'JetBrains Mono', monospace;\r\n    font-size: 0.70rem;\r\n    color: #94a3b8;\r\n  }\r\n  .complexity-val {\r\n    font-family: 'JetBrains Mono', monospace;\r\n    font-size: 0.95rem;\r\n    font-weight: 800;\r\n    margin: 6px 0;\r\n  }\r\n  .complexity-desc {\r\n    font-size: 0.70rem;\r\n    color: #64748b;\r\n  }\r\n\r\n  /* Dual Short-Circuit Rule Grid */\r\n  .dual-rule-grid {\r\n    display: grid;\r\n    grid-template-columns: 1fr 1fr;\r\n    gap: 12px;\r\n    margin-top: 6px;\r\n  }\r\n  @media (max-width: 640px) {\r\n    .dual-rule-grid { grid-template-columns: 1fr; }\r\n  }\r\n  .dual-rule-box {\r\n    background: rgba(255, 255, 255, 0.03);\r\n    border: 1px solid rgba(255, 255, 255, 0.07);\r\n    border-radius: 8px;\r\n    padding: 12px;\r\n  }\r\n  .dual-rule-title {\r\n    font-family: 'JetBrains Mono', monospace;\r\n    font-size: 0.78rem;\r\n    font-weight: 700;\r\n    margin-bottom: 6px;\r\n  }\r\n  .dual-rule-text {\r\n    font-family: 'JetBrains Mono', monospace;\r\n    font-size: 0.75rem;\r\n    color: #cbd5e1;\r\n    line-height: 1.6;\r\n  }\r\n\r\n  /* Interview Q&A Layout */\r\n  .interview-header-title {\r\n    color: #38bdf8;\r\n    font-size: 1rem;\r\n    margin-bottom: 14px;\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 8px;\r\n  }\r\n  .interview-divider {\r\n    border: none;\r\n    border-top: 1px dashed rgba(255, 255, 255, 0.1);\r\n    margin: 12px 0;\r\n  }\r\n\n\n  /* ═════════════════════════════════════════════════════════════════════\n     DAY 03 SPECIFIC EXTENSIONS: FLAWLESS TABLE SYSTEM & SINGLE-COLUMN FREEZE\n     ═════════════════════════════════════════════════════════════════════ */\n  #day03FundamentalsSection {\n    margin-top: 4px !important;\n  }\n  #day03FundamentalsSection .heading-box-wrap {\n    margin-top: 0 !important;\n  }\n\n  /* Section 01 Taxonomy Matrix Cards & Descriptions */\n  #day03FundamentalsSection .op-family-card {\n    padding: 16px 18px !important;\n  }\n  #day03FundamentalsSection .op-family-header {\n    display: flex !important;\n    flex-direction: column !important;\n    align-items: flex-start !important;\n    gap: 8px !important;\n    margin-bottom: 12px !important;\n    width: 100% !important;\n  }\n  #day03FundamentalsSection .fam-chip {\n    display: inline-flex !important;\n    align-items: center !important;\n    align-self: flex-start !important;\n    flex-shrink: 0 !important;\n    margin: 0 !important;\n  }\n  #day03FundamentalsSection .op-family-desc {\n    display: block !important;\n    width: 100% !important;\n    box-sizing: border-box !important;\n    font-size: 0.83rem !important;\n    line-height: 1.6 !important;\n    color: #94a3b8 !important;\n    margin: 0 !important;\n    text-align: justify !important;\n    text-align-last: left !important;\n    text-justify: inter-word !important;\n  }\n  #day03FundamentalsSection .op-family-desc code {\n    font-family: 'JetBrains Mono', monospace !important;\n    font-size: 0.77rem !important;\n    padding: 1px 5px !important;\n    background: rgba(56, 189, 248, 0.1) !important;\n    border: 1px solid rgba(56, 189, 248, 0.25) !important;\n    border-radius: 4px !important;\n    color: #38bdf8 !important;\n    white-space: nowrap !important;\n  }\n  #day03FundamentalsSection .op-family-desc strong,\n  #day03FundamentalsSection .op-family-desc em {\n    color: #e2e8f0 !important;\n    font-weight: 600 !important;\n  }\n  [data-theme=\"light\"] #day03FundamentalsSection .op-family-desc {\n    color: #334155 !important;\n  }\n  [data-theme=\"light\"] #day03FundamentalsSection .op-family-desc code {\n    background: #e0f2fe !important;\n    border-color: #7dd3fc !important;\n    color: #0284c7 !important;\n  }\n  [data-theme=\"light\"] #day03FundamentalsSection .op-family-desc strong,\n  [data-theme=\"light\"] #day03FundamentalsSection .op-family-desc em {\n    color: #0f172a !important;\n  }\n\n  /* Key Notes Justified Text Alignment */\n  .py-keynotes-list li {\n    text-align: justify !important;\n    text-align-last: left !important;\n    text-justify: inter-word !important;\n  }\n\n  /* Table Header Actions (Search Input + Audio Play Button) */\n  .table-header-actions {\n    display: flex !important;\n    align-items: center !important;\n    gap: 10px !important;\n  }\n\n  /* 1. UNIVERSAL SINGLE-COLUMN FREEZE (Strictly Un-freeze Col 2 Across Token/Slicing/Method Tables) */\n  .db-table-mock.arith-sticky-table th:nth-child(2),\n  .db-table-mock.arith-sticky-table td:nth-child(2),\n  .slicing-table th:nth-child(2),\n  .slicing-table td:nth-child(2),\n  .method-table th:nth-child(2),\n  .method-table td:nth-child(2),\n  .token-table th:nth-child(2),\n  .token-table td:nth-child(2) {\n    position: static !important;\n    left: auto !important;\n    z-index: 1 !important;\n    box-shadow: none !important;\n    border-right: 1px solid rgba(255, 255, 255, 0.06) !important;\n    font-weight: 600 !important;\n    white-space: nowrap !important;\n  }\n\n  /* Light mode un-freeze Col 2 */\n  [data-theme=\"light\"] .db-table-mock.arith-sticky-table th:nth-child(2),\n  [data-theme=\"light\"] .db-table-mock.arith-sticky-table td:nth-child(2),\n  [data-theme=\"light\"] .slicing-table th:nth-child(2),\n  [data-theme=\"light\"] .slicing-table td:nth-child(2),\n  [data-theme=\"light\"] .method-table th:nth-child(2),\n  [data-theme=\"light\"] .method-table td:nth-child(2),\n  [data-theme=\"light\"] .token-table th:nth-child(2),\n  [data-theme=\"light\"] .token-table td:nth-child(2) {\n    position: static !important;\n    left: auto !important;\n    z-index: 1 !important;\n    box-shadow: none !important;\n    border-right: 1px solid #e2e8f0 !important;\n    background-color: transparent !important;\n  }\n\n  /* Column 1 Base Code Chip Formatting - Zero wrap, Zero vertical clip */\n  .arith-sticky-table td:nth-child(1) code,\n  .token-table td:nth-child(1) code,\n  .slicing-table td:nth-child(1) code,\n  .method-table td:nth-child(1) code {\n    display: inline-flex !important;\n    align-items: center !important;\n    min-width: 0 !important;\n    height: auto !important;\n    min-height: 28px !important;\n    padding: 3px 8px !important;\n    font-family: 'JetBrains Mono', 'Fira Code', monospace !important;\n    font-weight: 700 !important;\n    font-size: 0.82rem !important;\n    background: rgba(56, 189, 248, 0.12) !important;\n    border: 1px solid rgba(56, 189, 248, 0.3) !important;\n    border-radius: 6px !important;\n    color: #38bdf8 !important;\n    white-space: nowrap !important;\n    letter-spacing: -0.01em !important;\n  }\n\n  [data-theme=\"light\"] .arith-sticky-table td:nth-child(1) code,\n  [data-theme=\"light\"] .token-table td:nth-child(1) code,\n  [data-theme=\"light\"] .slicing-table td:nth-child(1) code,\n  [data-theme=\"light\"] .method-table td:nth-child(1) code {\n    background: #e0f2fe !important;\n    border-color: #7dd3fc !important;\n    color: #0284c7 !important;\n  }\n\n  /* 2. TOKEN TABLES (Tables 1, 2, 4: Escapes, Operators, Formatting) */\n  .db-table-mock.token-table {\n    min-width: 760px !important;\n  }\n  .token-table th:nth-child(1),\n  .token-table td:nth-child(1) {\n    position: sticky !important;\n    left: 0 !important;\n    top: auto !important;\n    z-index: 10 !important;\n    width: 105px !important;\n    min-width: 95px !important;\n    max-width: 115px !important;\n    box-sizing: border-box !important;\n    background-color: #0d1527 !important;\n    border-right: 1px solid rgba(56, 189, 248, 0.28) !important;\n    box-shadow: 4px 0 10px -2px rgba(0, 0, 0, 0.45) !important;\n    text-align: center !important;\n    padding: 8px 10px !important;\n  }\n  .token-table th:nth-child(1) {\n    background-color: #131d35 !important;\n    z-index: 12 !important;\n  }\n  .token-table td:nth-child(1) code {\n    justify-content: center !important;\n  }\n\n  /* 3. SLICING TABLE (Table 3: Section 04 Slicing Geometry) */\n  .db-table-mock.slicing-table {\n    min-width: 800px !important;\n  }\n  .slicing-table th:nth-child(1),\n  .slicing-table td:nth-child(1) {\n    position: sticky !important;\n    left: 0 !important;\n    top: auto !important;\n    z-index: 10 !important;\n    width: 130px !important;\n    min-width: 120px !important;\n    max-width: 140px !important;\n    box-sizing: border-box !important;\n    background-color: #0d1527 !important;\n    border-right: 1px solid rgba(56, 189, 248, 0.28) !important;\n    box-shadow: 4px 0 10px -2px rgba(0, 0, 0, 0.45) !important;\n    text-align: left !important;\n    padding: 8px 12px !important;\n  }\n  .slicing-table th:nth-child(1) {\n    background-color: #131d35 !important;\n    z-index: 12 !important;\n  }\n\n  /* 4. METHOD TABLES (Tables 5, 6, 7: Methods, Search, Predicates) */\n  .db-table-mock.method-table {\n    min-width: 920px !important;\n  }\n  .method-table th:nth-child(1),\n  .method-table td:nth-child(1) {\n    position: sticky !important;\n    left: 0 !important;\n    top: auto !important;\n    z-index: 10 !important;\n    width: 185px !important;\n    min-width: 175px !important;\n    max-width: 200px !important;\n    box-sizing: border-box !important;\n    background-color: #0d1527 !important;\n    border-right: 1px solid rgba(56, 189, 248, 0.28) !important;\n    box-shadow: 4px 0 10px -2px rgba(0, 0, 0, 0.45) !important;\n    text-align: left !important;\n    padding: 8px 12px !important;\n  }\n  .method-table th:nth-child(1) {\n    background-color: #131d35 !important;\n    z-index: 12 !important;\n  }\n\n  /* 5. ANTI-PATTERN TABLE (Table 8: Section 09 14 Traps - Zero Overlap Layout) */\n  .db-table-mock.anti-pattern-table,\n  .db-mock-table-wrap .db-table-mock.anti-pattern-table {\n    min-width: 1260px !important;\n    width: 100% !important;\n    table-layout: fixed !important;\n    border-collapse: separate !important;\n    border-spacing: 0 !important;\n    overflow: visible !important;\n  }\n\n  /* Anti-Pattern Col 1: Buggy Code Pattern (Sticky Left: 0) */\n  .anti-pattern-table th:nth-child(1),\n  .anti-pattern-table td:nth-child(1),\n  .arith-sticky-table.anti-pattern-table th:nth-child(1),\n  .arith-sticky-table.anti-pattern-table td:nth-child(1) {\n    position: -webkit-sticky !important;\n    position: sticky !important;\n    left: 0 !important;\n    top: auto !important;\n    z-index: 10 !important;\n    width: 270px !important;\n    min-width: 270px !important;\n    max-width: 270px !important;\n    box-sizing: border-box !important;\n    background-color: #0d1527 !important;\n    border-right: 2px solid rgba(244, 63, 94, 0.45) !important;\n    box-shadow: 4px 0 12px -2px rgba(0, 0, 0, 0.5) !important;\n    text-align: left !important;\n    padding: 10px 14px !important;\n    white-space: normal !important;\n    word-break: break-word !important;\n    vertical-align: middle !important;\n  }\n  .anti-pattern-table th:nth-child(1),\n  .arith-sticky-table.anti-pattern-table th:nth-child(1) {\n    background-color: #131d35 !important;\n    z-index: 12 !important;\n    color: #fca5a5 !important;\n  }\n  .anti-pattern-table td:nth-child(1) code,\n  .anti-pattern-table td:nth-child(1) code.ap-code-bug,\n  .arith-sticky-table.anti-pattern-table td:nth-child(1) code {\n    display: inline-block !important;\n    max-width: 100% !important;\n    white-space: pre-wrap !important;\n    word-break: break-word !important;\n    overflow-wrap: anywhere !important;\n    padding: 4px 8px !important;\n    line-height: 1.4 !important;\n    background: rgba(244, 63, 94, 0.12) !important;\n    border: 1px solid rgba(244, 63, 94, 0.3) !important;\n    color: #fca5a5 !important;\n    border-radius: 6px !important;\n    font-family: 'JetBrains Mono', 'Fira Code', monospace !important;\n    font-size: 0.81rem !important;\n  }\n\n  /* Anti-Pattern Col 2: Runtime Result (Unfrozen, Natural Flow, Distinct Column) */\n  .anti-pattern-table th:nth-child(2),\n  .anti-pattern-table td:nth-child(2),\n  .arith-sticky-table.anti-pattern-table th:nth-child(2),\n  .arith-sticky-table.anti-pattern-table td:nth-child(2) {\n    position: static !important;\n    left: auto !important;\n    top: auto !important;\n    z-index: 1 !important;\n    box-shadow: none !important;\n    width: 270px !important;\n    min-width: 270px !important;\n    max-width: 270px !important;\n    box-sizing: border-box !important;\n    border-right: 1px solid rgba(255, 255, 255, 0.08) !important;\n    padding: 10px 14px !important;\n    white-space: normal !important;\n    word-break: break-word !important;\n    overflow-wrap: break-word !important;\n    vertical-align: middle !important;\n    font-weight: 500 !important;\n    line-height: 1.45 !important;\n    background-color: transparent !important;\n  }\n  .anti-pattern-table td:nth-child(2) .ap-result-bad,\n  .arith-sticky-table.anti-pattern-table td:nth-child(2) .ap-result-bad {\n    display: inline !important;\n    white-space: normal !important;\n    word-break: break-word !important;\n    color: #f87171 !important;\n    font-weight: 600 !important;\n  }\n  .ap-expected {\n    display: inline-block !important;\n    font-size: 0.78rem !important;\n    color: #94a3b8 !important;\n    margin-left: 4px !important;\n    font-style: italic !important;\n    white-space: nowrap !important;\n  }\n  [data-theme=\"light\"] .ap-expected {\n    color: #64748b !important;\n  }\n\n  /* Anti-Pattern Col 3: Root Cause / Python Mechanism */\n  .anti-pattern-table th:nth-child(3),\n  .anti-pattern-table td:nth-child(3),\n  .arith-sticky-table.anti-pattern-table th:nth-child(3),\n  .arith-sticky-table.anti-pattern-table td:nth-child(3) {\n    position: static !important;\n    left: auto !important;\n    top: auto !important;\n    z-index: 1 !important;\n    box-shadow: none !important;\n    width: 360px !important;\n    min-width: 360px !important;\n    max-width: 360px !important;\n    box-sizing: border-box !important;\n    border-right: 1px solid rgba(255, 255, 255, 0.08) !important;\n    padding: 10px 14px !important;\n    white-space: normal !important;\n    word-break: normal !important;\n    overflow-wrap: break-word !important;\n    vertical-align: middle !important;\n    line-height: 1.45 !important;\n    color: #cbd5e1 !important;\n    font-size: 0.84rem !important;\n    background-color: transparent !important;\n  }\n  .anti-pattern-table td:nth-child(3) code,\n  .arith-sticky-table.anti-pattern-table td:nth-child(3) code {\n    white-space: nowrap !important;\n    padding: 1px 5px !important;\n    font-size: 0.78rem !important;\n    background: rgba(56, 189, 248, 0.1) !important;\n    border: 1px solid rgba(56, 189, 248, 0.25) !important;\n    border-radius: 4px !important;\n    color: #38bdf8 !important;\n  }\n\n  /* Anti-Pattern Col 4: Recommended Production Fix */\n  .anti-pattern-table th:nth-child(4),\n  .anti-pattern-table td:nth-child(4),\n  .arith-sticky-table.anti-pattern-table th:nth-child(4),\n  .arith-sticky-table.anti-pattern-table td:nth-child(4) {\n    position: static !important;\n    left: auto !important;\n    top: auto !important;\n    z-index: 1 !important;\n    box-shadow: none !important;\n    width: 360px !important;\n    min-width: 360px !important;\n    max-width: 360px !important;\n    box-sizing: border-box !important;\n    padding: 10px 14px !important;\n    white-space: normal !important;\n    word-break: break-word !important;\n    overflow-wrap: break-word !important;\n    vertical-align: middle !important;\n    line-height: 1.45 !important;\n    background-color: transparent !important;\n  }\n  .anti-pattern-table td:nth-child(4) code,\n  .anti-pattern-table td:nth-child(4) code.ap-code-fix,\n  .arith-sticky-table.anti-pattern-table td:nth-child(4) code {\n    display: inline-block !important;\n    max-width: 100% !important;\n    white-space: pre-wrap !important;\n    word-break: break-word !important;\n    overflow-wrap: anywhere !important;\n    padding: 4px 8px !important;\n    line-height: 1.4 !important;\n    background: rgba(16, 185, 129, 0.12) !important;\n    border: 1px solid rgba(16, 185, 129, 0.3) !important;\n    color: #34d399 !important;\n    border-radius: 6px !important;\n    font-family: 'JetBrains Mono', 'Fira Code', monospace !important;\n    font-size: 0.81rem !important;\n  }\n\n  /* Column 3 override from global .db-table-mock rule */\n  .db-table-mock td:nth-child(3) {\n    white-space: nowrap !important;\n    font-size: 0.83rem !important;\n  }\n  .anti-pattern-table td:nth-child(3) {\n    white-space: normal !important;\n  }\n\n  /* Hover states for sticky Column 1 */\n  .token-table tbody tr:hover td:nth-child(1),\n  .slicing-table tbody tr:hover td:nth-child(1),\n  .method-table tbody tr:hover td:nth-child(1) {\n    background-color: #162038 !important;\n  }\n  .anti-pattern-table tbody tr:hover td:nth-child(1),\n  .arith-sticky-table.anti-pattern-table tbody tr:hover td:nth-child(1) {\n    background-color: #1a1e2e !important;\n  }\n\n  /* Light mode for sticky Column 1 */\n  [data-theme=\"light\"] .token-table th:nth-child(1),\n  [data-theme=\"light\"] .slicing-table th:nth-child(1),\n  [data-theme=\"light\"] .method-table th:nth-child(1) {\n    background-color: #f1f5f9 !important;\n    border-right-color: #cbd5e1 !important;\n  }\n  [data-theme=\"light\"] .token-table td:nth-child(1),\n  [data-theme=\"light\"] .slicing-table td:nth-child(1),\n  [data-theme=\"light\"] .method-table td:nth-child(1) {\n    background-color: #ffffff !important;\n    border-right-color: rgba(14, 165, 233, 0.35) !important;\n    box-shadow: 4px 0 10px -2px rgba(0, 0, 0, 0.08) !important;\n  }\n  [data-theme=\"light\"] .token-table tbody tr:hover td:nth-child(1),\n  [data-theme=\"light\"] .slicing-table tbody tr:hover td:nth-child(1),\n  [data-theme=\"light\"] .method-table tbody tr:hover td:nth-child(1) {\n    background-color: #f8fafc !important;\n  }\n\n  /* Light mode for Anti-Pattern Table */\n  [data-theme=\"light\"] .anti-pattern-table th:nth-child(1),\n  [data-theme=\"light\"] .arith-sticky-table.anti-pattern-table th:nth-child(1) {\n    background-color: #fef2f2 !important;\n    border-right-color: #fecdd3 !important;\n    color: #991b1b !important;\n  }\n  [data-theme=\"light\"] .anti-pattern-table td:nth-child(1),\n  [data-theme=\"light\"] .arith-sticky-table.anti-pattern-table td:nth-child(1) {\n    background-color: #ffffff !important;\n    border-right-color: rgba(244, 63, 94, 0.35) !important;\n    box-shadow: 4px 0 10px -2px rgba(0, 0, 0, 0.08) !important;\n  }\n  [data-theme=\"light\"] .anti-pattern-table td:nth-child(1) code,\n  [data-theme=\"light\"] .anti-pattern-table td:nth-child(1) code.ap-code-bug,\n  [data-theme=\"light\"] .arith-sticky-table.anti-pattern-table td:nth-child(1) code {\n    background: #fff1f2 !important;\n    border-color: #fecdd3 !important;\n    color: #e11d48 !important;\n  }\n  [data-theme=\"light\"] .anti-pattern-table tbody tr:hover td:nth-child(1),\n  [data-theme=\"light\"] .arith-sticky-table.anti-pattern-table tbody tr:hover td:nth-child(1) {\n    background-color: #fff1f2 !important;\n  }\n  [data-theme=\"light\"] .anti-pattern-table th:nth-child(2),\n  [data-theme=\"light\"] .anti-pattern-table td:nth-child(2),\n  [data-theme=\"light\"] .arith-sticky-table.anti-pattern-table th:nth-child(2),\n  [data-theme=\"light\"] .arith-sticky-table.anti-pattern-table td:nth-child(2) {\n    border-right: 1px solid #e2e8f0 !important;\n    color: #475569 !important;\n    background-color: transparent !important;\n  }\n  [data-theme=\"light\"] .anti-pattern-table td:nth-child(2) .ap-result-bad,\n  [data-theme=\"light\"] .arith-sticky-table.anti-pattern-table td:nth-child(2) .ap-result-bad {\n    color: #dc2626 !important;\n  }\n  [data-theme=\"light\"] .anti-pattern-table th:nth-child(3),\n  [data-theme=\"light\"] .anti-pattern-table td:nth-child(3),\n  [data-theme=\"light\"] .arith-sticky-table.anti-pattern-table th:nth-child(3),\n  [data-theme=\"light\"] .arith-sticky-table.anti-pattern-table td:nth-child(3) {\n    border-right: 1px solid #e2e8f0 !important;\n    color: #334155 !important;\n    background-color: transparent !important;\n  }\n  [data-theme=\"light\"] .anti-pattern-table td:nth-child(3) code,\n  [data-theme=\"light\"] .arith-sticky-table.anti-pattern-table td:nth-child(3) code {\n    background: #e0f2fe !important;\n    border-color: #7dd3fc !important;\n    color: #0284c7 !important;\n  }\n  [data-theme=\"light\"] .anti-pattern-table th:nth-child(4),\n  [data-theme=\"light\"] .anti-pattern-table td:nth-child(4),\n  [data-theme=\"light\"] .arith-sticky-table.anti-pattern-table th:nth-child(4),\n  [data-theme=\"light\"] .arith-sticky-table.anti-pattern-table td:nth-child(4) {\n    color: #334155 !important;\n    background-color: transparent !important;\n  }\n  [data-theme=\"light\"] .anti-pattern-table td:nth-child(4) code,\n  [data-theme=\"light\"] .anti-pattern-table td:nth-child(4) code.ap-code-fix,\n  [data-theme=\"light\"] .arith-sticky-table.anti-pattern-table td:nth-child(4) code {\n    background: #ecfdf5 !important;\n    border-color: #a7f3d0 !important;\n    color: #059669 !important;\n  }\n\n  /* 6. SEMANTIC TOKENS, RETURN BADGES & ARROWS */\n  .tbl-arrow {\n    display: inline-block !important;\n    margin: 0 6px !important;\n    color: #38bdf8 !important;\n    font-weight: 700 !important;\n    user-select: none !important;\n  }\n  .tbl-ret-str {\n    display: inline-block !important;\n    padding: 1px 6px !important;\n    font-family: 'JetBrains Mono', monospace !important;\n    font-size: 0.80rem !important;\n    font-weight: 600 !important;\n    background: rgba(16, 185, 129, 0.12) !important;\n    border: 1px solid rgba(16, 185, 129, 0.3) !important;\n    border-radius: 4px !important;\n    color: #34d399 !important;\n    white-space: nowrap !important;\n  }\n  .tbl-ret-num {\n    display: inline-block !important;\n    padding: 1px 6px !important;\n    font-family: 'JetBrains Mono', monospace !important;\n    font-size: 0.80rem !important;\n    font-weight: 600 !important;\n    background: rgba(245, 158, 11, 0.12) !important;\n    border: 1px solid rgba(245, 158, 11, 0.3) !important;\n    border-radius: 4px !important;\n    color: #fbbf24 !important;\n    white-space: nowrap !important;\n  }\n  .tbl-ret-list,\n  .tbl-ret-tuple {\n    display: inline-block !important;\n    padding: 1px 6px !important;\n    font-family: 'JetBrains Mono', monospace !important;\n    font-size: 0.80rem !important;\n    font-weight: 600 !important;\n    background: rgba(168, 85, 247, 0.12) !important;\n    border: 1px solid rgba(168, 85, 247, 0.3) !important;\n    border-radius: 4px !important;\n    color: #c084fc !important;\n    white-space: nowrap !important;\n  }\n  .tbl-ret-bool {\n    display: inline-block !important;\n    padding: 1px 7px !important;\n    font-family: 'JetBrains Mono', monospace !important;\n    font-size: 0.76rem !important;\n    font-weight: 700 !important;\n    border-radius: 4px !important;\n    white-space: nowrap !important;\n    letter-spacing: 0.02em !important;\n  }\n  .tbl-ret-bool.true {\n    background: rgba(16, 185, 129, 0.15) !important;\n    border: 1px solid rgba(16, 185, 129, 0.35) !important;\n    color: #34d399 !important;\n  }\n  .tbl-ret-bool.false {\n    background: rgba(244, 63, 94, 0.15) !important;\n    border: 1px solid rgba(244, 63, 94, 0.35) !important;\n    color: #fb7185 !important;\n  }\n  .py-ver-badge {\n    display: inline-block !important;\n    padding: 1px 5px !important;\n    font-size: 0.68rem !important;\n    font-weight: 700 !important;\n    border-radius: 4px !important;\n    background: rgba(14, 165, 233, 0.18) !important;\n    border: 1px solid rgba(14, 165, 233, 0.4) !important;\n    color: #38bdf8 !important;\n    margin-left: 6px !important;\n    vertical-align: middle !important;\n    letter-spacing: 0.02em !important;\n  }\n  .tbl-spotlight-badge {\n    display: inline-block !important;\n    padding: 1px 5px !important;\n    font-size: 0.68rem !important;\n    font-weight: 700 !important;\n    border-radius: 4px !important;\n    background: rgba(245, 158, 11, 0.18) !important;\n    border: 1px solid rgba(245, 158, 11, 0.4) !important;\n    color: #fbbf24 !important;\n    margin-left: 6px !important;\n    vertical-align: middle !important;\n    letter-spacing: 0.02em !important;\n  }\n\n  /* Light mode for semantic tokens */\n  [data-theme=\"light\"] .tbl-arrow {\n    color: #0284c7 !important;\n  }\n  [data-theme=\"light\"] .tbl-ret-str {\n    background: #ecfdf5 !important;\n    border-color: #a7f3d0 !important;\n    color: #059669 !important;\n  }\n  [data-theme=\"light\"] .tbl-ret-num {\n    background: #fffbeb !important;\n    border-color: #fde68a !important;\n    color: #d97706 !important;\n  }\n  [data-theme=\"light\"] .tbl-ret-list,\n  [data-theme=\"light\"] .tbl-ret-tuple {\n    background: #faf5ff !important;\n    border-color: #e9d5ff !important;\n    color: #7e22ce !important;\n  }\n  [data-theme=\"light\"] .tbl-ret-bool.true {\n    background: #ecfdf5 !important;\n    border-color: #a7f3d0 !important;\n    color: #059669 !important;\n  }\n  [data-theme=\"light\"] .tbl-ret-bool.false {\n    background: #fff1f2 !important;\n    border-color: #fecdd3 !important;\n    color: #e11d48 !important;\n  }\n  [data-theme=\"light\"] .py-ver-badge {\n    background: #e0f2fe !important;\n    border-color: #7dd3fc !important;\n    color: #0284c7 !important;\n  }\n  [data-theme=\"light\"] .tbl-spotlight-badge {\n    background: #fef3c7 !important;\n    border-color: #fcd34d !important;\n    color: #b45309 !important;\n  }\n\n  @media (max-width: 640px) {\n    .table-header-actions {\n      flex-wrap: wrap !important;\n      justify-content: flex-end !important;\n    }\n    .table-search-input {\n      width: 100px !important;\n    }\n    .table-search-input:focus {\n      width: 130px !important;\n    }\n  }\n\n</style>\n\n<!-- ═══ SECTION 01: Foundations & Unicode Architecture ═══ -->\n<div class=\"slide-section\" id=\"day03FundamentalsSection\">\n  <h2 class=\"slide-section-title heading-box-wrap heading-with-audio\" id=\"headingFundamentals\">\n    <span class=\"heading-num-box\">01</span>\n    <span class=\"heading-title-box\">\n      <span class=\"heading-title-text\">String Fundamentals</span>\n    </span>\n  </h2>\n  <p class=\"section-intro-text\">Strings in Python represent text data — from names and labels to SQL queries and data files. Think of a string like text written on a whiteboard with permanent ink: strings are <strong>immutable</strong> (cannot be changed in-place). Any method like stripping whitespace or converting case always creates a clean new string safely in memory.</p>\n\n  <!-- Master Classification Table (Exact Day 02 direct layout) -->\n  <div class=\"db-mock-table-wrap\">\n    <div class=\"table-header-wrap\">\n      <h4 class=\"table-header-title\">Complete Python String Literal Taxonomy &amp; Memory Architecture</h4>\n    </div>\n    <div class=\"op-matrix-list\">\n      \n      <div class=\"op-family-card\">\n        <div class=\"op-family-header\">\n          <span class=\"fam-chip fam-chip--arith\">Single &amp; Double Quotes</span>\n          <span class=\"op-family-desc\">Standard single-line text delimiters. Both work identically in Python. Having both allows you to nest quotes inside each other (like <code>\"It's easy\"</code> or <code>'He said \"hi\"'</code>) without backslash escapes.</span>\n        </div>\n        <div class=\"op-symbols-grid\">\n          <div class=\"op-symbol-box\"><code>'Data'</code></div>\n          <div class=\"op-symbol-box\"><code>\"Python\"</code></div>\n          <div class=\"op-symbol-box\"><code>\"It's easy\"</code></div>\n          <div class=\"op-symbol-box\"><code>'He said \"hi\"'</code></div>\n        </div>\n      </div>\n\n      <div class=\"op-family-card\">\n        <div class=\"op-family-header\">\n          <span class=\"fam-chip fam-chip--assign\">Triple Quotes</span>\n          <span class=\"op-family-desc\">Multi-line string delimiters using <code>'''</code> or <code>\"\"\"</code>. They automatically preserve line breaks and indentation without needing <code>\\n</code>, making them ideal for docstrings and SQL queries.</span>\n        </div>\n        <div class=\"op-symbols-grid\">\n          <div class=\"op-symbol-box\"><code>'''Multi-line'''</code></div>\n          <div class=\"op-symbol-box\"><code>\"\"\"Docstring\"\"\"</code></div>\n          <div class=\"op-symbol-box\"><code>\"\"\"SQL Query\"\"\"</code></div>\n        </div>\n      </div>\n\n      <div class=\"op-family-card\">\n        <div class=\"op-family-header\">\n          <span class=\"fam-chip fam-chip--compare\">Raw Strings (r\"\")</span>\n          <span class=\"op-family-desc\">Strings prefixed with <code>r</code> that treat backslashes as plain literal characters instead of escape codes. Essential for regular expressions and Windows filepaths (e.g. <code>r\"C:Users\"</code>).</span>\n        </div>\n        <div class=\"op-symbols-grid\">\n          <div class=\"op-symbol-box\"><code>r\"C:Usersdata\"</code></div>\n          <div class=\"op-symbol-box\"><code>r\"d{3}-d{4}\"</code></div>\n          <div class=\"op-symbol-box\"><code>r\"regex\b\"</code></div>\n        </div>\n      </div>\n\n      <div class=\"op-family-card\">\n        <div class=\"op-family-header\">\n          <span class=\"fam-chip fam-chip--logic\">Formatted f-strings (f\"\")</span>\n          <span class=\"op-family-desc\">Modern string formatting prefixed with <code>f</code>. Variables and expressions inside <code>{...}</code> are evaluated directly at runtime, making them faster, cleaner, and easier to read than older methods.</span>\n        </div>\n        <div class=\"op-symbols-grid\">\n          <div class=\"op-symbol-box\"><code>f\"Name: {user}\"</code></div>\n          <div class=\"op-symbol-box\"><code>f\"Cost: {price:.2f}\"</code></div>\n          <div class=\"op-symbol-box\"><code>f\"{debug=}\"</code></div>\n        </div>\n      </div>\n\n      <div class=\"op-family-card\">\n        <div class=\"op-family-header\">\n          <span class=\"fam-chip fam-chip--ident\">🧠 Senior Spotlight: Byte Strings (b\"\")</span>\n          <span class=\"op-family-desc\">Raw binary data made of 8-bit bytes (0–255) prefixed with <code>b</code>. Used for network sockets, image files, and cryptography. Convert to text strings using <code>.decode('utf-8')</code>.</span>\n        </div>\n        <div class=\"op-symbols-grid\">\n          <div class=\"op-symbol-box\"><code>b\"raw_bytes\"</code></div>\n          <div class=\"op-symbol-box\"><code>b\"\u0000ÿ\"</code></div>\n          <div class=\"op-symbol-box\"><code>.decode('utf-8')</code></div>\n        </div>\n      </div>\n\n      <div class=\"op-family-card\">\n        <div class=\"op-family-header\">\n          <span class=\"fam-chip fam-chip--member\">Unicode Code Points</span>\n          <span class=\"op-family-desc\">Universal text standard where every character maps to a unique number ID. In Python, use <code>ord('A')</code> to find its code (65) and <code>chr(65)</code> to turn that number back into a character.</span>\n        </div>\n        <div class=\"op-symbols-grid\">\n          <div class=\"op-symbol-box\"><code>ord('A') &rarr; 65</code></div>\n          <div class=\"op-symbol-box\"><code>chr(65) &rarr; 'A'</code></div>\n          <div class=\"op-symbol-box\"><code>ord('🐍') &rarr; 128013</code></div>\n        </div>\n      </div>\n\n      <div class=\"op-family-card\">\n        <div class=\"op-family-header\">\n          <span class=\"fam-chip fam-chip--bitwise\">🧠 Senior Spotlight: CPython Memory Layout</span>\n          <span class=\"op-family-desc\">CPython's smart memory optimizer (PEP 393): uses 1 byte per character for English text, 2 bytes for standard alphabets, and 4 bytes for emojis to save RAM while keeping instant character access.</span>\n        </div>\n        <div class=\"op-symbols-grid\">\n          <div class=\"op-symbol-box\"><code>1B (Latin-1/ASCII)</code></div>\n          <div class=\"op-symbol-box\"><code>2B (UCS-2 Scripts)</code></div>\n          <div class=\"op-symbol-box\"><code>4B (UCS-4 Emojis)</code></div>\n        </div>\n      </div>\n\n      <div class=\"op-family-card\">\n        <div class=\"op-family-header\">\n          <span class=\"fam-chip fam-chip--cond\">String Immutability</span>\n          <span class=\"op-family-desc\">Strings cannot be changed after creation. Trying to modify a character in-place (like <code>s[0] = 'X'</code>) causes a <code>TypeError</code>; operations like <code>+=</code> always create a new string in memory.</span>\n        </div>\n        <div class=\"op-symbols-grid\">\n          <div class=\"op-symbol-box\"><code>s[0] = 'X' &rarr; Error</code></div>\n          <div class=\"op-symbol-box\"><code>+= creates new str</code></div>\n          <div class=\"op-symbol-box\"><code>Safe Dict Key</code></div>\n        </div>\n      </div>\n\n    </div>\n  </div>\n</div>\n\n\n<!-- ═══ SECTION 02: Escape Sequences & Raw Strings ═══ -->\n<div class=\"slide-section\" id=\"day03EscapesSection\">\n  <h2 class=\"slide-section-title heading-box-wrap heading-with-audio\" id=\"headingEscapes\">\n    <span class=\"heading-num-box\">02</span>\n    <span class=\"heading-title-box\">\n      <span class=\"heading-title-text\">Escape Sequences & Raw Strings</span>\n      <button class=\"audio-play-btn\" onclick=\"playAudio('Day03/New_PyDay03Audio04.mp3', this)\" title=\"Play narration\">\n        <svg class=\"play-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M8 5v14l11-7z\"/></svg>\n      </button>\n    </span>\n  </h2>\n  <p class=\"section-intro-text\">An escape sequence begins with a backslash (<code>\\</code>), signaling to the Python parser to translate the subsequent character into a special control code. When working with Windows filepaths or regular expressions, backslashes can trigger unintended escapes. Prefixing literals with <code>r</code> creates <strong>raw strings</strong>, treating backslashes as literal characters.</p>\n\n  <!-- Escape Sequence Reference Table Subcard -->\n  <div class=\"topic-subcard\" id=\"day03EscapesTableSection\">\n    <div class=\"table-header-wrap\">\n      <div class=\"table-header-left\">\n        <h4 class=\"table-header-title\">Escape Sequences &amp; Raw String Reference</h4>\n      </div>\n      <div class=\"table-header-actions\">\n        <div class=\"table-search-box\">\n        <svg class=\"table-search-icon\" width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\"><circle cx=\"11\" cy=\"11\" r=\"8\"/><path d=\"m21 21-4.3-4.3\"/></svg>\n        <input type=\"text\" class=\"table-search-input\" placeholder=\"Filter escapes...\" oninput=\"filterTableRows(this)\" />\n      </div>\n        <button class=\"audio-play-btn\" onclick=\"playAudio('Day03/New_PyDay03Audio05.mp3', this)\" title=\"Play narration\">\n        <svg class=\"play-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M8 5v14l11-7z\"/></svg>\n      </button>\n      </div>\n    </div>\n    <div class=\"db-mock-table-wrap\">\n      <table class=\"db-table-mock db-table-mock--compact arith-sticky-table token-table\">\n        <thead><tr><th>Sequence</th><th>Name / Purpose</th><th>Syntax Example</th><th>Behavior / Output Rule</th></tr></thead>\n        <tbody>\n          <tr><td><code>\\n</code></td><td>Line Feed (Newline)</td><td><code>\"Line1\\nLine2\"</code></td><td>Breaks text onto a new line (ASCII 10)</td></tr>\n          <tr><td><code>\\t</code></td><td>Horizontal Tab</td><td><code>\"Col1\\tCol2\"</code></td><td>Advances cursor to next tab stop (ASCII 9)</td></tr>\n          <tr><td><code>\\\\</code></td><td>Literal Backslash</td><td><code>\"C:\\\\Users\\\\Data\"</code></td><td>Escapes the backslash itself to produce a single <code>\\</code></td></tr>\n          <tr><td><code>\\'</code></td><td>Single Quote</td><td><code>'It\\'s Python'</code></td><td>Allows single quote inside single-quoted string</td></tr>\n          <tr><td><code>\\\"</code></td><td>Double Quote</td><td><code>\"He said \\\"hi\\\"\"</code></td><td>Allows double quote inside double-quoted string</td></tr>\n          <tr><td><code>\\r</code></td><td>Carriage Return</td><td><code>\"Loading...\\rDone\"</code></td><td>Returns cursor to start of line; overwrites earlier text</td></tr>\n          <tr><td><code>\\uXXXX</code></td><td>Unicode 16-bit Code Point</td><td><code>\"\\u00BD\"</code> <span class=\"tbl-arrow\">&rarr;</span> <span class=\"tbl-ret-str\">\"½\"</span></td><td>Injects Unicode character by 4-digit hexadecimal code point</td></tr>\n          <tr><td><code>r\"...\"</code></td><td>Raw String Literal</td><td><code>r\"C:\\new\\folder\"</code> <span class=\"tbl-arrow\">&rarr;</span> <span class=\"tbl-ret-str\">\"C:\\new\\folder\"</span></td><td>Treats all backslashes as literal characters; disables escapes</td></tr>\n        </tbody>\n      </table>\n    </div>\n  </div>\n\n  <!-- Code Container Subcard -->\n  <div class=\"topic-subcard\" id=\"day03EscapesCodeSection\">\n    <div class=\"subcard-header-with-audio\">\n      <h4 class=\"subcard-header-title\">Escape Sequences and Raw Strings in Practice</h4>\n      <button class=\"audio-play-btn\" onclick=\"playAudio('Day03/New_PyDay03Audio06.mp3', this)\" title=\"Play narration\">\n        <svg class=\"play-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M8 5v14l11-7z\"/></svg>\n      </button>\n    </div>\n    <div class=\"code-block-container\">\n      <div class=\"code-subblock\">\n        <pre><code><span class=\"code-comment\"># Escape Sequences in Action</span>\nescaped = <span class=\"code-str\">\"Python\\tData\\nAnalytics\"</span>\n<span class=\"code-fn\">print</span>(escaped)\n<span class=\"code-comment\"># Output:\n# Python  Data\n# Analytics</span>\n\n<span class=\"code-comment\"># Windows Filepath Trap vs Raw String Fix</span>\nfaulty_path = <span class=\"code-str\">\"C:\\new\\tools\"</span>     <span class=\"code-comment\"># \\n parsed as newline, \\t parsed as tab!</span>\nclean_path = <span class=\"code-str\">r\"C:\\new\\tools\"</span>     <span class=\"code-comment\"># Prefix r disables escape parsing!</span>\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">f\"Clean Path: {clean_path}\"</span>)   <span class=\"code-comment\"># Output: Clean Path: C:\\new\\tools</span>\n\n<span class=\"code-comment\"># Developer Debugging: repr() vs str()</span>\nhidden_text = <span class=\"code-str\">\"Hello\\n\\tWorld\"</span>\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">f\"str():  {str(hidden_text)}\"</span>)    <span class=\"code-comment\"># Formatted for end users (expanded)</span>\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">f\"repr(): {repr(hidden_text)}\"</span>)   <span class=\"code-comment\"># Developer inspection: 'Hello\\n\\tWorld'</span></code></pre>\n      </div>\n    </div>\n  </div>\n\n  <!-- 💡 Key Notes -->\n  <div class=\"py-recall-hook py-keynotes-card\">\n    <div class=\"py-keynotes-icon-wrap\">💡</div>\n    <div class=\"py-recall-body py-keynotes-body\">\n      <div class=\"py-recall-header py-keynotes-header\">\n        <span class=\"py-recall-title py-keynotes-title\">Key Notes</span>\n        <span class=\"py-recall-tag py-keynotes-tag\">Escape & Raw String Rules</span>\n      </div>\n      <ul class=\"py-keynotes-list\">\n        <li><strong>Always use <code>r\"\"</code> for Filepaths and RegEx</strong>: Windows directories (e.g. <code>C:\\new\\text</code>) trigger invisible newline (<code>\\n</code>) and tab (<code>\\t</code>) corruption without the raw <code>r</code> prefix.</li>\n        <li><strong><code>repr()</code> for Production Debugging</strong>: When diagnosing malformed CSV strings or user input, <code>print(repr(s))</code> reveals hidden trailing whitespace, newlines, and unprintable escape characters immediately.</li>\n        <li><strong>Raw String Ending Limitation</strong>: A raw string literal cannot end with an odd number of backslashes (e.g. <code>r\"folder\\\"</code> is a syntax error because the final quote is escaped). Use <code>r\"folder\" + \"\\\\\"</code> instead.</li>\n      </ul>\n    </div>\n  </div>\n</div>\n\n\n<!-- ═══ SECTION 03: String Operators ═══ -->\n<div class=\"slide-section\" id=\"day03ConcatSection\">\n  <h2 class=\"slide-section-title heading-box-wrap heading-with-audio\" id=\"headingConcat\">\n    <span class=\"heading-num-box\">03</span>\n    <span class=\"heading-title-box\">\n      <span class=\"heading-title-text\">String Immutability & Concat</span>\n      <button class=\"audio-play-btn\" onclick=\"playAudio('Day03/New_PyDay03Audio07.mp3', this)\" title=\"Play narration\">\n        <svg class=\"play-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M8 5v14l11-7z\"/></svg>\n      </button>\n    </span>\n  </h2>\n  <p class=\"section-intro-text\">Python supports fundamental sequence operations on strings: concatenation (<code>+</code>) joins strings end-to-end, and repetition (<code>*</code>) duplicates text multiple times. Relational comparisons (<code>&lt;</code>, <code>&gt;</code>, <code>==</code>) compare strings character-by-character based on their underlying Unicode code points in <strong>lexicographical order</strong>.</p>\n\n  <!-- String Operators Reference Table Subcard -->\n  <div class=\"topic-subcard\" id=\"day03ConcatTableSection\">\n    <div class=\"table-header-wrap\">\n      <div class=\"table-header-left\">\n        <h4 class=\"table-header-title\">String Operators &amp; Relational Comparison Reference</h4>\n      </div>\n      <div class=\"table-header-actions\">\n        <div class=\"table-search-box\">\n        <svg class=\"table-search-icon\" width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\"><circle cx=\"11\" cy=\"11\" r=\"8\"/><path d=\"m21 21-4.3-4.3\"/></svg>\n        <input type=\"text\" class=\"table-search-input\" placeholder=\"Filter operators...\" oninput=\"filterTableRows(this)\" />\n      </div>\n        <button class=\"audio-play-btn\" onclick=\"playAudio('Day03/New_PyDay03Audio08.mp3', this)\" title=\"Play narration\">\n        <svg class=\"play-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M8 5v14l11-7z\"/></svg>\n      </button>\n      </div>\n    </div>\n    <div class=\"db-mock-table-wrap\">\n      <table class=\"db-table-mock db-table-mock--compact arith-sticky-table token-table\">\n        <thead><tr><th>Operator</th><th>Name</th><th>Syntax Example</th><th>Behavior / Type Rule</th></tr></thead>\n        <tbody>\n          <tr><td><code>+</code></td><td>Concatenation</td><td><code>\"Data\" + \"base\"</code> <span class=\"tbl-arrow\">&rarr;</span> <span class=\"tbl-ret-str\">\"Database\"</span></td><td>Allocates a new string containing both operands. Both must be strings.</td></tr>\n          <tr><td><code>*</code></td><td>Repetition</td><td><code>\"=\" * 5</code> <span class=\"tbl-arrow\">&rarr;</span> <span class=\"tbl-ret-str\">\"=====\"</span></td><td>Repeats string N times. Right operand must be an integer.</td></tr>\n          <tr><td><code>==</code></td><td>Value Equality</td><td><code>\"cat\" == \"cat\"</code> <span class=\"tbl-arrow\">&rarr;</span> <span class=\"tbl-ret-bool true\">True</span></td><td>Compares character-by-character content equality. Case-sensitive.</td></tr>\n          <tr><td><code>!=</code></td><td>Value Inequality</td><td><code>\"cat\" != \"dog\"</code> <span class=\"tbl-arrow\">&rarr;</span> <span class=\"tbl-ret-bool true\">True</span></td><td>Returns True if string contents or lengths differ.</td></tr>\n          <tr><td><code>&lt; / &gt;</code></td><td>Lexicographical Order</td><td><code>\"Apple\" &lt; \"banana\"</code> <span class=\"tbl-arrow\">&rarr;</span> <span class=\"tbl-ret-bool true\">True</span></td><td>Compares Unicode code points. Uppercase letters (65-90) precede lowercase (97-122).</td></tr>\n          <tr><td><code>in</code></td><td>Membership Test</td><td><code>\"art\" in \"Earth\"</code> <span class=\"tbl-arrow\">&rarr;</span> <span class=\"tbl-ret-bool true\">True</span></td><td>Returns True if substring exists anywhere within string ($O(N)$ scanning).</td></tr>\n          <tr><td><code>not in</code></td><td>Non-Membership</td><td><code>\"sql\" not in \"python\"</code> <span class=\"tbl-arrow\">&rarr;</span> <span class=\"tbl-ret-bool true\">True</span></td><td>Returns True if substring does not exist within target string.</td></tr>\n        </tbody>\n      </table>\n    </div>\n  </div>\n\n  <!-- Code Container Subcard -->\n  <div class=\"topic-subcard\" id=\"day03ConcatCodeSection\">\n    <div class=\"subcard-header-with-audio\">\n      <h4 class=\"subcard-header-title\">String Operations & Memory Verification in Python</h4>\n      <button class=\"audio-play-btn\" onclick=\"playAudio('Day03/New_PyDay03Audio09.mp3', this)\" title=\"Play narration\">\n        <svg class=\"play-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M8 5v14l11-7z\"/></svg>\n      </button>\n    </div>\n    <div class=\"code-block-container\">\n      <div class=\"code-subblock\">\n        <pre><code><span class=\"code-comment\"># String Concatenation & Immutability Verification</span>\nfirst = <span class=\"code-str\">\"Data\"</span>\nlast = <span class=\"code-str\">\"Analyst\"</span>\nfull_title = first + <span class=\"code-str\">\" \"</span> + last\ndivider = <span class=\"code-str\">\"-\"</span> * <span class=\"code-num\">20</span>\n<span class=\"code-fn\">print</span>(full_title)                  <span class=\"code-comment\"># Output: Data Analyst</span>\n<span class=\"code-fn\">print</span>(divider)                     <span class=\"code-comment\"># Output: --------------------</span>\n\n<span class=\"code-comment\"># Memory Verification (New Allocation on Modification)</span>\noriginal_id = <span class=\"code-fn\">id</span>(first)\nfirst += <span class=\"code-str\">\" Engineering\"</span>\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">f\"New Memory Allocated: {id(first) != original_id}\"</span>)  <span class=\"code-comment\"># Output: True (New object in RAM!)</span>\n\n<span class=\"code-comment\"># Unicode Code Point Ordering Trap</span>\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">f\"'Z' &lt; 'a': {'Z' &lt; 'a'}\"</span>)     <span class=\"code-comment\"># Output: True! ('Z' is 90, 'a' is 97)</span>\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">f\"ord('Z'): {ord('Z')}, ord('a'): {ord('a')}\"</span>)  <span class=\"code-comment\"># Output: ord('Z'): 90, ord('a'): 97</span>\n\n<span class=\"code-comment\"># Case-Insensitive Comparison via casefold()</span>\ninput_1 = <span class=\"code-str\">\"PYTHON\"</span>\ninput_2 = <span class=\"code-str\">\"python\"</span>\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">f\"Exact Equal:    {input_1 == input_2}\"</span>)              <span class=\"code-comment\"># Output: False</span>\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">f\"Normalized Equal: {input_1.casefold() == input_2.casefold()}\"</span>)  <span class=\"code-comment\"># Output: True</span></code></pre>\n      </div>\n    </div>\n  </div>\n\n  <!-- 💡 Key Notes -->\n  <div class=\"py-recall-hook py-keynotes-card\">\n    <div class=\"py-keynotes-icon-wrap\">💡</div>\n    <div class=\"py-recall-body py-keynotes-body\">\n      <div class=\"py-recall-header py-keynotes-header\">\n        <span class=\"py-recall-title py-keynotes-title\">Key Notes</span>\n        <span class=\"py-recall-tag py-keynotes-tag\">Operator & Comparison Rules</span>\n      </div>\n      <ul class=\"py-keynotes-list\">\n        <li><strong>No Automatic Type Coercion</strong>: Attempting <code>\"Score: \" + 95</code> raises a fatal <code>TypeError</code>. Python never silently converts numbers to text in <code>+</code> operations. Use <code>f\"Score: {95}\"</code> or <code>str(95)</code>.</li>\n        <li><strong>Uppercase Precedes Lowercase</strong>: In ASCII/Unicode, all uppercase letters (A-Z = 65-90) precede lowercase letters (a-z = 97-122). Therefore, <code>\"Zebra\" &lt; \"apple\"</code> evaluates to <code>True</code>.</li>\n        <li><strong>Use <code>.casefold()</code> for Comparison</strong>: When comparing strings without regard to case, use <code>.casefold()</code> instead of <code>.lower()</code>. <code>casefold()</code> implements full Unicode case-folding rules (handling German 'ß', Greek letters, etc.).</li>\n      </ul>\n    </div>\n  </div>\n</div>\n\n\n<!-- ═══ SECTION 04: Indexing & Slicing ═══ -->\n<div class=\"slide-section\" id=\"day03SlicingSection\">\n  <h2 class=\"slide-section-title heading-box-wrap heading-with-audio\" id=\"headingSlicing\">\n    <span class=\"heading-num-box\">04</span>\n    <span class=\"heading-title-box\">\n      <span class=\"heading-title-text\">Indexing, Slicing & Striding</span>\n      <button class=\"audio-play-btn\" onclick=\"playAudio('Day03/New_PyDay03Audio10.mp3', this)\" title=\"Play narration\">\n        <svg class=\"play-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M8 5v14l11-7z\"/></svg>\n      </button>\n    </span>\n  </h2>\n  <p class=\"section-intro-text\">Python strings are 0-indexed sequences. Elements can be accessed from the beginning using positive indices (<code>0..len-1</code>) or from the end using negative indices (<code>-1..-len</code>). Slicing extracts substrings using the syntax <code>[start:stop:step]</code>, where <code>start</code> is inclusive and <code>stop</code> is exclusive. Slices never raise <code>IndexError</code> when boundaries exceed string length.</p>\n\n  <!-- Slice Geometry Reference Table Subcard -->\n  <div class=\"topic-subcard\" id=\"day03SlicingTableSection\">\n    <div class=\"table-header-wrap\">\n      <div class=\"table-header-left\">\n        <h4 class=\"table-header-title\">Slice Geometry &amp; Index Boundary Reference</h4>\n      </div>\n      <div class=\"table-header-actions\">\n        <div class=\"table-search-box\">\n        <svg class=\"table-search-icon\" width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\"><circle cx=\"11\" cy=\"11\" r=\"8\"/><path d=\"m21 21-4.3-4.3\"/></svg>\n        <input type=\"text\" class=\"table-search-input\" placeholder=\"Filter slices...\" oninput=\"filterTableRows(this)\" />\n      </div>\n        <button class=\"audio-play-btn\" onclick=\"playAudio('Day03/New_PyDay03Audio11.mp3', this)\" title=\"Play narration\">\n        <svg class=\"play-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M8 5v14l11-7z\"/></svg>\n      </button>\n      </div>\n    </div>\n    <div class=\"db-mock-table-wrap\">\n      <table class=\"db-table-mock db-table-mock--compact arith-sticky-table slicing-table\">\n        <thead><tr><th>Slice Pattern</th><th>Name / Intent</th><th>Example on \"Python\"</th><th>Boundary &amp; Behavior Rule</th></tr></thead>\n        <tbody>\n          <tr><td><code>s[0]</code></td><td>First Character</td><td><code>s[0]</code> <span class=\"tbl-arrow\">&rarr;</span> <span class=\"tbl-ret-str\">\"P\"</span></td><td>Positive index; raises <code>IndexError</code> if string is empty</td></tr>\n          <tr><td><code>s[-1]</code></td><td>Last Character</td><td><code>s[-1]</code> <span class=\"tbl-arrow\">&rarr;</span> <span class=\"tbl-ret-str\">\"n\"</span></td><td>Negative index; identical to <code>s[len(s)-1]</code></td></tr>\n          <tr><td><code>s[1:4]</code></td><td>Window Slice</td><td><code>s[1:4]</code> <span class=\"tbl-arrow\">&rarr;</span> <span class=\"tbl-ret-str\">\"yth\"</span></td><td>Includes index 1, 2, 3; excludes index 4 (stop exclusive)</td></tr>\n          <tr><td><code>s[:3]</code></td><td>Prefix Slice</td><td><code>s[:3]</code> <span class=\"tbl-arrow\">&rarr;</span> <span class=\"tbl-ret-str\">\"Pyt\"</span></td><td>Omits start; defaults to index 0 up to stop (length 3)</td></tr>\n          <tr><td><code>s[3:]</code></td><td>Suffix Slice</td><td><code>s[3:]</code> <span class=\"tbl-arrow\">&rarr;</span> <span class=\"tbl-ret-str\">\"hon\"</span></td><td>Omits stop; slices from index 3 through the end</td></tr>\n          <tr><td><code>s[::2]</code></td><td>Stride / Step Slice</td><td><code>s[::2]</code> <span class=\"tbl-arrow\">&rarr;</span> <span class=\"tbl-ret-str\">\"Pto\"</span></td><td>Selects every 2nd character (indices 0, 2, 4)</td></tr>\n          <tr><td><code>s[::-1]</code></td><td>Full String Reversal</td><td><code>s[::-1]</code> <span class=\"tbl-arrow\">&rarr;</span> <span class=\"tbl-ret-str\">\"nohtyP\"</span></td><td>Negative step (-1) walks backwards across full sequence</td></tr>\n          <tr><td><code>s[2:100]</code></td><td>Out-of-Bounds Slice</td><td><code>s[2:100]</code> <span class=\"tbl-arrow\">&rarr;</span> <span class=\"tbl-ret-str\">\"thon\"</span></td><td>Clamps safely to <code>len(s)</code> without raising <code>IndexError</code></td></tr>\n        </tbody>\n      </table>\n    </div>\n  </div>\n\n  <!-- Code Container Subcard -->\n  <div class=\"topic-subcard\" id=\"day03SlicingCodeSection\">\n    <div class=\"subcard-header-with-audio\">\n      <h4 class=\"subcard-header-title\">String Indexing & Slicing in Action</h4>\n      <button class=\"audio-play-btn\" onclick=\"playAudio('Day03/New_PyDay03Audio12.mp3', this)\" title=\"Play narration\">\n        <svg class=\"play-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M8 5v14l11-7z\"/></svg>\n      </button>\n    </div>\n    <div class=\"code-block-container\">\n      <div class=\"code-subblock\">\n        <pre><code><span class=\"code-comment\"># Bidirectional Indexing on \"Python\"</span>\ntext = <span class=\"code-str\">\"Python\"</span>\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">f\"First: {text[0]}, Last: {text[-1]}\"</span>)            <span class=\"code-comment\"># Output: First: P, Last: n</span>\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">f\"Penultimate: {text[-2]}\"</span>)                      <span class=\"code-comment\"># Output: Penultimate: o</span>\n\n<span class=\"code-comment\"># Substring Slicing Geometry (start:stop:step)</span>\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">f\"Prefix [ :3]:   '{text[:3]}'\"</span>)                  <span class=\"code-comment\"># Output: 'Pyt'</span>\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">f\"Suffix [3: ]:   '{text[3:]}'\"</span>)                  <span class=\"code-comment\"># Output: 'hon'</span>\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">f\"Even Stride:    '{text[::2]}'\"</span>)                 <span class=\"code-comment\"># Output: 'Pto'</span>\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">f\"Reversed:       '{text[::-1]}'\"</span>)                <span class=\"code-comment\"># Output: 'nohtyP'</span>\n\n<span class=\"code-comment\"># Safety: Slices Clamp Gracefully vs Indexing Crashing</span>\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">f\"Safe Slice [1:100]: '{text[1:100]}'\"</span>)           <span class=\"code-comment\"># Output: 'ython' (No IndexError!)</span></code></pre>\n      </div>\n    </div>\n  </div>\n\n  <!-- 💡 Key Notes -->\n  <div class=\"py-recall-hook py-keynotes-card\">\n    <div class=\"py-keynotes-icon-wrap\">💡</div>\n    <div class=\"py-recall-body py-keynotes-body\">\n      <div class=\"py-recall-header py-keynotes-header\">\n        <span class=\"py-recall-title py-keynotes-title\">Key Notes</span>\n        <span class=\"py-recall-tag py-keynotes-tag\">Slice Geometry Rules</span>\n      </div>\n      <ul class=\"py-keynotes-list\">\n        <li><strong>Start Inclusive, Stop Exclusive</strong>: The slice <code>s[i:j]</code> contains exactly <code>j - i</code> characters starting at index <code>i</code> up to <code>j-1</code>. This makes partitioning clean: <code>s[:k] + s[k:] == s</code>.</li>\n        <li><strong>Clamping Behavior</strong>: Direct indexing past the end (<code>s[100]</code>) immediately crashes with <code>IndexError</code>. However, slicing (<code>s[0:100]</code>) clamps gracefully to the available length without throwing errors.</li>\n        <li><strong>Reversal Idiom</strong>: <code>s[::-1]</code> creates a new reversed string in $O(N)$ time. Because strings are immutable, this does not affect the original sequence.</li>\n      </ul>\n    </div>\n  </div>\n</div>\n\n\n<!-- ═══ SECTION 05: Modern String Formatting ═══ -->\n<div class=\"slide-section\" id=\"day03FormattingSection\">\n  <h2 class=\"slide-section-title heading-box-wrap heading-with-audio\" id=\"headingFormatting\">\n    <span class=\"heading-num-box\">05</span>\n    <span class=\"heading-title-box\">\n      <span class=\"heading-title-text\">String Formatting & f-Strings</span>\n      <button class=\"audio-play-btn\" onclick=\"playAudio('Day03/New_PyDay03Audio13.mp3', this)\" title=\"Play narration\">\n        <svg class=\"play-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M8 5v14l11-7z\"/></svg>\n      </button>\n    </span>\n  </h2>\n  <p class=\"section-intro-text\">Python string formatting evolved from C-style printf (<code>%</code>) to <code>str.format()</code>, culminating in modern <strong>Formatted String Literals (f-strings)</strong> introduced in Python 3.6 (PEP 498). F-strings evaluate arbitrary expressions at runtime with superior performance and readability. Format specifiers placed after a colon (<code>:</code>) control numeric precision, currency commas, and column padding.</p>\n\n  <!-- Format Specifiers Reference Table Subcard -->\n  <div class=\"topic-subcard\" id=\"day03FormattingTableSection\">\n    <div class=\"table-header-wrap\">\n      <div class=\"table-header-left\">\n        <h4 class=\"table-header-title\">F-String Format Specifiers Reference</h4>\n      </div>\n      <div class=\"table-header-actions\">\n        <div class=\"table-search-box\">\n        <svg class=\"table-search-icon\" width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\"><circle cx=\"11\" cy=\"11\" r=\"8\"/><path d=\"m21 21-4.3-4.3\"/></svg>\n        <input type=\"text\" class=\"table-search-input\" placeholder=\"Filter specifiers...\" oninput=\"filterTableRows(this)\" />\n      </div>\n        <button class=\"audio-play-btn\" onclick=\"playAudio('Day03/New_PyDay03Audio14.mp3', this)\" title=\"Play narration\">\n        <svg class=\"play-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M8 5v14l11-7z\"/></svg>\n      </button>\n      </div>\n    </div>\n    <div class=\"db-mock-table-wrap\">\n      <table class=\"db-table-mock db-table-mock--compact arith-sticky-table token-table\">\n        <thead><tr><th>Specifier</th><th>Name</th><th>Syntax Example</th><th>Output / Alignment Rule</th></tr></thead>\n        <tbody>\n          <tr><td><code>:.2f</code></td><td>Fixed Decimal Places</td><td><code>f\"{3.14159:.2f}\"</code> <span class=\"tbl-arrow\">&rarr;</span> <span class=\"tbl-ret-str\">\"3.14\"</span></td><td>Rounds float to 2 decimal places</td></tr>\n          <tr><td><code>:,</code></td><td>Thousands Grouping</td><td><code>f\"{1000000:,}\"</code> <span class=\"tbl-arrow\">&rarr;</span> <span class=\"tbl-ret-str\">\"1,000,000\"</span></td><td>Adds comma separator for readability</td></tr>\n          <tr><td><code>:$,.2f</code></td><td>Currency Formatting</td><td><code>f\"$\\{1250.5:,.2f\\}\"</code> <span class=\"tbl-arrow\">&rarr;</span> <span class=\"tbl-ret-str\">\"$1,250.50\"</span></td><td>Combines currency symbol, commas and 2 decimals</td></tr>\n          <tr><td><code>:04d</code></td><td>Zero Padding</td><td><code>f\"{42:04d}\"</code> <span class=\"tbl-arrow\">&rarr;</span> <span class=\"tbl-ret-str\">\"0042\"</span></td><td>Pads integer with leading zeros to width 4</td></tr>\n          <tr><td><code>:&lt;10</code></td><td>Left Alignment</td><td><code>f\"{'Data':&lt;10}\"</code> <span class=\"tbl-arrow\">&rarr;</span> <span class=\"tbl-ret-str\">\"'Data      '\"</span></td><td>Pads spaces on right to minimum width 10</td></tr>\n          <tr><td><code>:&gt;10</code></td><td>Right Alignment</td><td><code>f\"{'Data':&gt;10}\"</code> <span class=\"tbl-arrow\">&rarr;</span> <span class=\"tbl-ret-str\">\"'      Data'\"</span></td><td>Pads spaces on left to minimum width 10</td></tr>\n          <tr><td><code>:^10</code></td><td>Center Alignment</td><td><code>f\"{'Data':^10}\"</code> <span class=\"tbl-arrow\">&rarr;</span> <span class=\"tbl-ret-str\">\"'   Data   '\"</span></td><td>Centers text with equal padding on both sides</td></tr>\n          <tr><td><code>:.1%</code></td><td>Percentage Format</td><td><code>f\"{0.856:.1%}\"</code> <span class=\"tbl-arrow\">&rarr;</span> <span class=\"tbl-ret-str\">\"85.6%\"</span></td><td>Multiplies by 100 and appends percentage sign</td></tr>\n          <tr><td><code>=</code></td><td>Self-Documenting</td><td><code>f\"{price=}\"</code> <span class=\"tbl-arrow\">&rarr;</span> <span class=\"tbl-ret-str\">\"price=49.99\"</span> <span class=\"py-ver-badge\">3.8+</span></td><td>Prints variable name and value automatically</td></tr>\n        </tbody>\n      </table>\n    </div>\n  </div>\n\n  <!-- Code Container Subcard -->\n  <div class=\"topic-subcard\" id=\"day03FormattingCodeSection\">\n    <div class=\"subcard-header-with-audio\">\n      <h4 class=\"subcard-header-title\">Modern f-string Formatting in Python</h4>\n      <button class=\"audio-play-btn\" onclick=\"playAudio('Day03/New_PyDay03Audio15.mp3', this)\" title=\"Play narration\">\n        <svg class=\"play-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M8 5v14l11-7z\"/></svg>\n      </button>\n    </div>\n    <div class=\"code-block-container\">\n      <div class=\"code-subblock\">\n        <pre><code><span class=\"code-comment\"># Modern f-String Formatting Pipeline</span>\nitem = <span class=\"code-str\">\"GPU Server\"</span>\nqty = <span class=\"code-num\">4</span>\nprice = <span class=\"code-num\">2499.85</span>\ntotal = qty * price\n\n<span class=\"code-comment\"># Column Alignment & Financial Number Formatting</span>\nheader = <span class=\"code-str\">f\"{'ITEM':&lt;16} {'QTY':&gt;5} {'PRICE':&gt;12} {'TOTAL':&gt;14}\"</span>\nrow    = <span class=\"code-str\">f\"{item:&lt;16} {qty:&gt;5d} {\"$\" + f\"{price:,.2f}\":&gt;12} {\"$\" + f\"{total:,.2f}\":&gt;14}\"</span>\n<span class=\"code-fn\">print</span>(header)\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">\"-\"</span> * <span class=\"code-num\">50</span>)\n<span class=\"code-fn\">print</span>(row)\n\n<span class=\"code-comment\"># Senior Spotlight: Self-Documenting f\"{var=}\" (Python 3.8+)</span>\nbatch_id = <span class=\"code-num\">4096</span>\nstatus = <span class=\"code-str\">\"ACTIVE\"</span>\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">f\"DEBUG: {batch_id=}, {status=}\"</span>)  <span class=\"code-comment\"># Output: DEBUG: batch_id=4096, status='ACTIVE'</span></code></pre>\n      </div>\n    </div>\n  </div>\n\n  <!-- 💡 Key Notes -->\n  <div class=\"py-recall-hook py-keynotes-card\">\n    <div class=\"py-keynotes-icon-wrap\">💡</div>\n    <div class=\"py-recall-body py-keynotes-body\">\n      <div class=\"py-recall-header py-keynotes-header\">\n        <span class=\"py-recall-title py-keynotes-title\">Key Notes</span>\n        <span class=\"py-recall-tag py-keynotes-tag\">Formatting Best Practices</span>\n      </div>\n      <ul class=\"py-keynotes-list\">\n        <li><strong>Prefer f-strings over <code>%</code> and <code>str.format()</code></strong>: F-strings are parsed directly into bytecode instructions, making them up to 3x faster than legacy format methods while drastically reducing boilerplate.</li>\n        <li><strong>Format Specifiers Do Not Alter Data</strong>: Writing <code>f\"{val:.2f}\"</code> formats the displayed text only; the underlying <code>val</code> float in memory retains full floating-point precision.</li>\n        <li><strong>Escaping Curly Braces</strong>: To print literal curly braces inside an f-string, double them up: <code>f\"{{key: {val}}}\"</code> produces <code>\"{key: 42}\"</code>.</li>\n      </ul>\n    </div>\n  </div>\n</div>\n\n\n<!-- ═══ SECTION 06: Transformation & Case Normalization ═══ -->\n<div class=\"slide-section\" id=\"day03MethodsSection\">\n  <h2 class=\"slide-section-title heading-box-wrap heading-with-audio\" id=\"headingMethods\">\n    <span class=\"heading-num-box\">06</span>\n    <span class=\"heading-title-box\">\n      <span class=\"heading-title-text\">Case Normalization & Stripping</span>\n      <button class=\"audio-play-btn\" onclick=\"playAudio('Day03/New_PyDay03Audio16.mp3', this)\" title=\"Play narration\">\n        <svg class=\"play-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M8 5v14l11-7z\"/></svg>\n      </button>\n    </span>\n  </h2>\n  <p class=\"section-intro-text\">Because strings are immutable, methods that alter text never modify the original object in-place; they return a newly allocated string. Case conversion normalizes messy user input for search engines, while trimming methods remove unwanted whitespace and boundary tokens.</p>\n\n  <!-- Methods Reference Table Subcard -->\n  <div class=\"topic-subcard\" id=\"day03MethodsTableSection\">\n    <div class=\"table-header-wrap\">\n      <div class=\"table-header-left\">\n        <h4 class=\"table-header-title\">String Transformation &amp; Cleaning Method Reference</h4>\n      </div>\n      <div class=\"table-header-actions\">\n        <div class=\"table-search-box\">\n        <svg class=\"table-search-icon\" width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\"><circle cx=\"11\" cy=\"11\" r=\"8\"/><path d=\"m21 21-4.3-4.3\"/></svg>\n        <input type=\"text\" class=\"table-search-input\" placeholder=\"Filter methods...\" oninput=\"filterTableRows(this)\" />\n      </div>\n      </div>\n    </div>\n    <div class=\"db-mock-table-wrap\">\n      <table class=\"db-table-mock db-table-mock--compact arith-sticky-table method-table\">\n        <thead><tr><th>Method</th><th>Name / Category</th><th>Syntax Example</th><th>Return Rule &amp; Caveats</th></tr></thead>\n        <tbody>\n          <tr><td><code>.upper()</code></td><td>Uppercase</td><td><code>\"data\".upper()</code> <span class=\"tbl-arrow\">&rarr;</span> <span class=\"tbl-ret-str\">\"DATA\"</span></td><td>Converts all cased characters to uppercase</td></tr>\n          <tr><td><code>.lower()</code></td><td>Lowercase</td><td><code>\"DATA\".lower()</code> <span class=\"tbl-arrow\">&rarr;</span> <span class=\"tbl-ret-str\">\"data\"</span></td><td>Converts all cased characters to lowercase</td></tr>\n          <tr><td><code>.title()</code></td><td>Title Case</td><td><code>\"data analyst\".title()</code> <span class=\"tbl-arrow\">&rarr;</span> <span class=\"tbl-ret-str\">\"Data Analyst\"</span></td><td>Capitalizes words after boundaries (apostrophe trap!)</td></tr>\n          <tr><td><code>.capitalize()</code></td><td>Sentence Case</td><td><code>\"hello world\".capitalize()</code> <span class=\"tbl-arrow\">&rarr;</span> <span class=\"tbl-ret-str\">\"Hello world\"</span></td><td>Capitalizes first character only; lowercases all others</td></tr>\n          <tr><td><code>.casefold()</code></td><td>Unicode Fold</td><td><code>\"ß\".casefold()</code> <span class=\"tbl-arrow\">&rarr;</span> <span class=\"tbl-ret-str\">\"ss\"</span> <span class=\"tbl-spotlight-badge\">Unicode</span></td><td>Aggressive lowercase for robust Unicode comparison</td></tr>\n          <tr><td><code>.strip()</code></td><td>Bidirectional Trim</td><td><code>\"  data  \".strip()</code> <span class=\"tbl-arrow\">&rarr;</span> <span class=\"tbl-ret-str\">\"data\"</span></td><td>Strips whitespace or specified characters from both ends</td></tr>\n          <tr><td><code>.lstrip() / .rstrip()</code></td><td>Left/Right Trim</td><td><code>\"  data\".lstrip()</code> <span class=\"tbl-arrow\">&rarr;</span> <span class=\"tbl-ret-str\">\"data\"</span></td><td>Strips whitespace from left or right edge only</td></tr>\n          <tr><td><code>.removeprefix()</code></td><td>Remove Prefix</td><td><code>\"Test_01\".removeprefix(\"Test_\")</code> <span class=\"tbl-arrow\">&rarr;</span> <span class=\"tbl-ret-str\">\"01\"</span> <span class=\"py-ver-badge\">3.9+</span></td><td>Safely removes exact substring prefix without set stripping</td></tr>\n          <tr><td><code>.removesuffix()</code></td><td>Remove Suffix</td><td><code>\"data.csv\".removesuffix(\".csv\")</code> <span class=\"tbl-arrow\">&rarr;</span> <span class=\"tbl-ret-str\">\"data\"</span> <span class=\"py-ver-badge\">3.9+</span></td><td>Safely removes exact substring suffix without set stripping</td></tr>\n          <tr><td><code>.zfill(w)</code></td><td>Zero Fill</td><td><code>\"42\".zfill(5)</code> <span class=\"tbl-arrow\">&rarr;</span> <span class=\"tbl-ret-str\">\"00042\"</span></td><td>Left-pads numeric string with zeros to reach width <code>w</code></td></tr>\n          <tr><td><code>.center(w, [f])</code></td><td>Center Pad</td><td><code>\"hi\".center(6, \"-\")</code> <span class=\"tbl-arrow\">&rarr;</span> <span class=\"tbl-ret-str\">\"--hi--\"</span></td><td>Centers string in field of width <code>w</code> padded with <code>f</code></td></tr>\n          <tr><td><code>.ljust() / .rjust()</code></td><td>Left/Right Pad</td><td><code>\"cat\".ljust(5, \".\")</code> <span class=\"tbl-arrow\">&rarr;</span> <span class=\"tbl-ret-str\">\"cat..\"</span></td><td>Pads string to width <code>w</code> on right or left</td></tr>\n        </tbody>\n      </table>\n    </div>\n  </div>\n\n  <!-- Code Container Subcard -->\n  <div class=\"topic-subcard\" id=\"day03MethodsCodeSection\">\n    <div class=\"subcard-header-with-audio\">\n      <h4 class=\"subcard-header-title\">String Cleaning & Normalization Pipeline</h4>\n      <button class=\"audio-play-btn\" onclick=\"playAudio('Day03/New_PyDay03Audio18.mp3', this)\" title=\"Play narration\">\n        <svg class=\"play-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M8 5v14l11-7z\"/></svg>\n      </button>\n    </div>\n    <div class=\"code-block-container\">\n      <div class=\"code-subblock\">\n        <pre><code><span class=\"code-comment\"># Raw Form Input Cleaning Pipeline</span>\nraw_input = <span class=\"code-str\">\"  USER_Name_42@Example.COM \\n\\t \"</span>\ncleaned = raw_input.strip().lower()\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">f\"Cleaned Email: '{cleaned}'\"</span>)  <span class=\"code-comment\"># Output: 'user_name_42@example.com'</span>\n\n<span class=\"code-comment\"># The strip() Character Set Trap vs removeprefix/removesuffix</span>\nurl = <span class=\"code-str\">\"www.example.com\"</span>\nflawed = url.strip(<span class=\"code-str\">\"w.com\"</span>)           <span class=\"code-comment\"># Strips any 'w', '.', 'c', 'o', 'm' from edges!</span>\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">f\"Flawed Strip: '{flawed}'\"</span>)    <span class=\"code-comment\"># Strips characters indiscriminately!</span>\n\n<span class=\"code-comment\"># Safe Prefix / Suffix Removal (Python 3.9+)</span>\nsafe = url.removeprefix(<span class=\"code-str\">\"www.\"</span>).removesuffix(<span class=\"code-str\">\".com\"</span>)\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">f\"Safe Trim:    '{safe}'\"</span>)      <span class=\"code-comment\"># Output: 'example' (Guaranteed exact match!)</span></code></pre>\n      </div>\n    </div>\n  </div>\n\n  <!-- 💡 Key Notes -->\n  <div class=\"py-recall-hook py-keynotes-card\">\n    <div class=\"py-keynotes-icon-wrap\">💡</div>\n    <div class=\"py-recall-body py-keynotes-body\">\n      <div class=\"py-recall-header py-keynotes-header\">\n        <span class=\"py-recall-title py-keynotes-title\">Key Notes</span>\n        <span class=\"py-recall-tag py-keynotes-tag\">Transformation Best Practices</span>\n      </div>\n      <ul class=\"py-keynotes-list\">\n        <li><strong><code>strip(chars)</code> is a Character Set, NOT a Substring</strong>: <code>\"spaghetti\".strip(\"spi\")</code> strips characters as a set. For exact prefix/suffix stripping, always use Python 3.9's <code>.removeprefix()</code> and <code>.removesuffix()</code>.</li>\n        <li><strong>The <code>.title()</code> Apostrophe Pitfall</strong>: <code>\"they're\".title()</code> turns into <code>\"They'Re\"</code> because the apostrophe is treated as a word boundary. For names with apostrophes (e.g. O'Connor), use <code>string.capwords()</code> or regex.</li>\n        <li><strong>All Methods Return New Objects</strong>: String methods never alter the caller in-place. If you don't reassign (<code>s = s.strip()</code>), the result is immediately discarded by the garbage collector.</li>\n      </ul>\n    </div>\n  </div>\n</div>\n\n\n<!-- ═══ SECTION 07: Search, Splitting & Joining ═══ -->\n<div class=\"slide-section\" id=\"day03SearchSection\">\n  <h2 class=\"slide-section-title heading-box-wrap heading-with-audio\" id=\"headingSearch\">\n    <span class=\"heading-num-box\">07</span>\n    <span class=\"heading-title-box\">\n      <span class=\"heading-title-text\">Searching, Splitting & Joining</span>\n      <button class=\"audio-play-btn\" onclick=\"playAudio('Day03/New_PyDay03Audio19.mp3', this)\" title=\"Play narration\">\n        <svg class=\"play-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M8 5v14l11-7z\"/></svg>\n      </button>\n    </span>\n  </h2>\n  <p class=\"section-intro-text\">Deconstructing and reassembling text is a daily requirement in data processing. Splitting breaks delimited strings (such as CSV rows or log lines) into lists, while joining combines iterables into efficient single-allocation strings. Python provides safe searching methods alongside strict indexing alternatives.</p>\n\n  <!-- Search & Split Reference Table Subcard -->\n  <div class=\"topic-subcard\" id=\"day03SearchTableSection\">\n    <div class=\"table-header-wrap\">\n      <div class=\"table-header-left\">\n        <h4 class=\"table-header-title\">Search, Split, Join &amp; Partition Reference</h4>\n      </div>\n      <div class=\"table-header-actions\">\n        <div class=\"table-search-box\">\n        <svg class=\"table-search-icon\" width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\"><circle cx=\"11\" cy=\"11\" r=\"8\"/><path d=\"m21 21-4.3-4.3\"/></svg>\n        <input type=\"text\" class=\"table-search-input\" placeholder=\"Filter search methods...\" oninput=\"filterTableRows(this)\" />\n      </div>\n      </div>\n    </div>\n    <div class=\"db-mock-table-wrap\">\n      <table class=\"db-table-mock db-table-mock--compact arith-sticky-table method-table\">\n        <thead><tr><th>Method</th><th>Name</th><th>Syntax Example</th><th>Return Rule / Failure Handling</th></tr></thead>\n        <tbody>\n          <tr><td><code>.find(sub)</code></td><td>Find Substring (Safe)</td><td><code>\"python\".find(\"th\")</code> <span class=\"tbl-arrow\">&rarr;</span> <span class=\"tbl-ret-num\">2</span></td><td>Returns lowest index if found; returns <strong>-1</strong> if not found</td></tr>\n          <tr><td><code>.rfind(sub)</code></td><td>Find from Right</td><td><code>\"banana\".rfind(\"an\")</code> <span class=\"tbl-arrow\">&rarr;</span> <span class=\"tbl-ret-num\">3</span></td><td>Returns highest index if found; returns <strong>-1</strong> if not found</td></tr>\n          <tr><td><code>.index(sub)</code></td><td>Index Substring (Strict)</td><td><code>\"python\".index(\"th\")</code> <span class=\"tbl-arrow\">&rarr;</span> <span class=\"tbl-ret-num\">2</span></td><td>Returns lowest index; raises <strong>ValueError</strong> if not found</td></tr>\n          <tr><td><code>.rindex(sub)</code></td><td>Index from Right</td><td><code>\"banana\".rindex(\"an\")</code> <span class=\"tbl-arrow\">&rarr;</span> <span class=\"tbl-ret-num\">3</span></td><td>Returns highest index; raises <strong>ValueError</strong> if not found</td></tr>\n          <tr><td><code>.count(sub)</code></td><td>Count Occurrences</td><td><code>\"banana\".count(\"an\")</code> <span class=\"tbl-arrow\">&rarr;</span> <span class=\"tbl-ret-num\">2</span></td><td>Returns non-overlapping count of substring occurrences</td></tr>\n          <tr><td><code>.startswith(p)</code></td><td>Prefix Match</td><td><code>\"data.csv\".startswith(\"data\")</code> <span class=\"tbl-arrow\">&rarr;</span> <span class=\"tbl-ret-bool true\">True</span></td><td>Accepts single string or tuple of candidates: <code>(\"http:\", \"https:\")</code></td></tr>\n          <tr><td><code>.endswith(s)</code></td><td>Suffix Match</td><td><code>\"data.csv\".endswith(\".csv\")</code> <span class=\"tbl-arrow\">&rarr;</span> <span class=\"tbl-ret-bool true\">True</span></td><td>Accepts single string or tuple of file extensions: <code>(\".csv\", \".tsv\")</code></td></tr>\n          <tr><td><code>.replace(old, new)</code></td><td>Substring Replace</td><td><code>\"a-b-c\".replace(\"-\", \":\")</code> <span class=\"tbl-arrow\">&rarr;</span> <span class=\"tbl-ret-str\">\"a:b:c\"</span></td><td>Replaces all occurrences; optional count argument limits replacements</td></tr>\n          <tr><td><code>.split([sep])</code></td><td>Split to List</td><td><code>\"a,b,c\".split(\",\")</code> <span class=\"tbl-arrow\">&rarr;</span> <span class=\"tbl-ret-list\">['a', 'b', 'c']</span></td><td>Splits on delimiter; if sep omitted, splits on arbitrary whitespace</td></tr>\n          <tr><td><code>.rsplit([sep])</code></td><td>Split from Right</td><td><code>\"a/b/c\".rsplit(\"/\", 1)</code> <span class=\"tbl-arrow\">&rarr;</span> <span class=\"tbl-ret-list\">['a/b', 'c']</span></td><td>Splits from right; highly useful when paired with maxsplit</td></tr>\n          <tr><td><code>.splitlines()</code></td><td>Split on Newlines</td><td><code>\"a\\nb\\rc\".splitlines()</code> <span class=\"tbl-arrow\">&rarr;</span> <span class=\"tbl-ret-list\">['a', 'b', 'c']</span></td><td>Splits on all universal newline boundaries (\\n, \\r, \\r\\n)</td></tr>\n          <tr><td><code>sep.join(list)</code></td><td>Join Iterable</td><td><code>\", \".join(['a', 'b'])</code> <span class=\"tbl-arrow\">&rarr;</span> <span class=\"tbl-ret-str\">\"a, b\"</span></td><td>High-performance $O(N)$ concatenation using separator</td></tr>\n          <tr><td><code>.partition(sep)</code></td><td>3-Tuple Partition</td><td><code>\"user=42\".partition(\"=\")</code> <span class=\"tbl-arrow\">&rarr;</span> <span class=\"tbl-ret-tuple\">('user', '=', '42')</span></td><td>Splits at FIRST match into (before, sep, after); never raises error</td></tr>\n          <tr><td><code>.rpartition(sep)</code></td><td>Right Partition</td><td><code>\"a.b.c\".rpartition(\".\")</code> <span class=\"tbl-arrow\">&rarr;</span> <span class=\"tbl-ret-tuple\">('a.b', '.', 'c')</span></td><td>Splits at LAST match into (before, sep, after); ideal for filenames</td></tr>\n        </tbody>\n      </table>\n    </div>\n  </div>\n\n  <!-- Code Container Subcard -->\n  <div class=\"topic-subcard\" id=\"day03SearchCodeSection\">\n    <div class=\"subcard-header-with-audio\">\n      <h4 class=\"subcard-header-title\">Searching, Splitting & High-Performance Joining</h4>\n      <button class=\"audio-play-btn\" onclick=\"playAudio('Day03/New_PyDay03Audio20.mp3', this)\" title=\"Play narration\">\n        <svg class=\"play-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M8 5v14l11-7z\"/></svg>\n      </button>\n    </div>\n    <div class=\"code-block-container\">\n      <div class=\"code-subblock\">\n        <pre><code><span class=\"code-comment\"># find() vs index() Defensive Error Handling</span>\nhaystack = <span class=\"code-str\">\"Analytics Pipeline\"</span>\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">f\"find('tics'):  {haystack.find('tics')}\"</span>)   <span class=\"code-comment\"># Output: 5</span>\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">f\"find('Java'):  {haystack.find('Java')}\"</span>)   <span class=\"code-comment\"># Output: -1 (Safe!)</span>\n\n<span class=\"code-comment\"># partition() for Safe Key-Value Parsing (Zero IndexError Risk)</span>\nconfig_entry = <span class=\"code-str\">\"DATABASE_HOST=db.internal.aws\"</span>\nkey, sep, val = config_entry.partition(<span class=\"code-str\">\"=\"</span>)\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">f\"Key: '{key}', Val: '{val}'\"</span>)              <span class=\"code-comment\"># Output: Key: 'DATABASE_HOST', Val: 'db.internal.aws'</span>\n\n<span class=\"code-comment\"># High-Performance String Assembly (join vs += Loop)</span>\nwords = [<span class=\"code-str\">\"Python\"</span>, <span class=\"code-str\">\"Data\"</span>, <span class=\"code-str\">\"Engineering\"</span>, <span class=\"code-str\">\"Track\"</span>]\nassembled = <span class=\"code-str\">\" &gt; \"</span>.join(words)\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">f\"Joined Pipeline: {assembled}\"</span>)              <span class=\"code-comment\"># Output: Python &gt; Data &gt; Engineering &gt; Track</span></code></pre>\n      </div>\n    </div>\n  </div>\n\n  <!-- 💡 Key Notes -->\n  <div class=\"py-recall-hook py-keynotes-card\">\n    <div class=\"py-keynotes-icon-wrap\">💡</div>\n    <div class=\"py-recall-body py-keynotes-body\">\n      <div class=\"py-recall-header py-keynotes-header\">\n        <span class=\"py-recall-title py-keynotes-title\">Key Notes</span>\n        <span class=\"py-recall-tag py-keynotes-tag\">Search & Split Best Practices</span>\n      </div>\n      <ul class=\"py-keynotes-list\">\n        <li><strong>Never Use <code>+=</code> Inside Large Loops</strong>: Repeated concatenation allocates $N$ intermediate strings, creating an $O(N^2)$ quadratic memory bottleneck. Always accumulate into a list and call <code>\"\".join(items)</code> for $O(N)$ single allocation.</li>\n        <li><strong><code>find()</code> vs <code>index()</code></strong>: Use <code>.find()</code> when a missing substring is expected (check <code>pos != -1</code>). Use <code>.index()</code> inside <code>try/except ValueError</code> blocks when a missing substring indicates invalid data.</li>\n        <li><strong><code>.partition()</code> Guarantees a 3-Tuple</strong>: Unlike <code>.split(\"=\", 1)</code> which raises <code>ValueError: not enough values to unpack</code> if the separator is missing, <code>.partition()</code> returns <code>(original_str, \"\", \"\")</code> safely.</li>\n      </ul>\n    </div>\n  </div>\n</div>\n\n\n<!-- ═══ SECTION 08: Validation & Inspection ═══ -->\n<div class=\"slide-section\" id=\"day03ValidationSection\">\n  <h2 class=\"slide-section-title heading-box-wrap heading-with-audio\" id=\"headingValidation\">\n    <span class=\"heading-num-box\">08</span>\n    <span class=\"heading-title-box\">\n      <span class=\"heading-title-text\">Validation & Character Classes</span>\n      <button class=\"audio-play-btn\" onclick=\"playAudio('Day03/New_PyDay03Audio21.mp3', this)\" title=\"Play narration\">\n        <svg class=\"play-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M8 5v14l11-7z\"/></svg>\n      </button>\n    </span>\n  </h2>\n  <p class=\"section-intro-text\">Predicate methods inspect string characters and return a boolean verdict. They are essential for input validation, sanitizing incoming query parameters, and verifying schema conformance. Knowing the exact Unicode boundary distinctions prevents subtle validation security vulnerabilities.</p>\n\n  <!-- Validation Reference Table Subcard -->\n  <div class=\"topic-subcard\" id=\"day03ValidationTableSection\">\n    <div class=\"table-header-wrap\">\n      <div class=\"table-header-left\">\n        <h4 class=\"table-header-title\">Predicate &amp; Character Validation Reference</h4>\n      </div>\n      <div class=\"table-header-actions\">\n        <div class=\"table-search-box\">\n        <svg class=\"table-search-icon\" width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\"><circle cx=\"11\" cy=\"11\" r=\"8\"/><path d=\"m21 21-4.3-4.3\"/></svg>\n        <input type=\"text\" class=\"table-search-input\" placeholder=\"Filter predicates...\" oninput=\"filterTableRows(this)\" />\n      </div>\n      </div>\n    </div>\n    <div class=\"db-mock-table-wrap\">\n      <table class=\"db-table-mock db-table-mock--compact arith-sticky-table method-table\">\n        <thead><tr><th>Predicate</th><th>Category</th><th>True Condition Example</th><th>False Case &amp; Trap</th></tr></thead>\n        <tbody>\n          <tr><td><code>.isalpha()</code></td><td>Alphabetic Only</td><td><code>\"Python\".isalpha()</code> <span class=\"tbl-arrow\">&rarr;</span> <span class=\"tbl-ret-bool true\">True</span></td><td><code>\"Py 3\".isalpha()</code> <span class=\"tbl-arrow\">&rarr;</span> <span class=\"tbl-ret-bool false\">False</span> (spaces fail)</td></tr>\n          <tr><td><code>.isdigit()</code></td><td>Digits Only</td><td><code>\"12345\".isdigit()</code> <span class=\"tbl-arrow\">&rarr;</span> <span class=\"tbl-ret-bool true\">True</span></td><td><code>\"-5\".isdigit()</code> <span class=\"tbl-arrow\">&rarr;</span> <span class=\"tbl-ret-bool false\">False</span> (negatives fail)</td></tr>\n          <tr><td><code>.isalnum()</code></td><td>Alphanumeric</td><td><code>\"Py312\".isalnum()</code> <span class=\"tbl-arrow\">&rarr;</span> <span class=\"tbl-ret-bool true\">True</span></td><td><code>\"py_3\".isalnum()</code> <span class=\"tbl-arrow\">&rarr;</span> <span class=\"tbl-ret-bool false\">False</span> (underscores fail)</td></tr>\n          <tr><td><code>.isspace()</code></td><td>Whitespace Characters</td><td><code>\"  \\t\\n \".isspace()</code> <span class=\"tbl-arrow\">&rarr;</span> <span class=\"tbl-ret-bool true\">True</span></td><td><code>\"\".isspace()</code> <span class=\"tbl-arrow\">&rarr;</span> <span class=\"tbl-ret-bool false\">False</span> (empty string fails)</td></tr>\n          <tr><td><code>.isnumeric()</code></td><td>Numeric Unicode</td><td><code>\"½\".isnumeric()</code> <span class=\"tbl-arrow\">&rarr;</span> <span class=\"tbl-ret-bool true\">True</span></td><td><code>\"3.14\".isnumeric()</code> <span class=\"tbl-arrow\">&rarr;</span> <span class=\"tbl-ret-bool false\">False</span> (decimals fail)</td></tr>\n          <tr><td><code>.isdecimal()</code></td><td>Strict Decimal Digits</td><td><code>\"42\".isdecimal()</code> <span class=\"tbl-arrow\">&rarr;</span> <span class=\"tbl-ret-bool true\">True</span></td><td><code>\"²\".isdecimal()</code> <span class=\"tbl-arrow\">&rarr;</span> <span class=\"tbl-ret-bool false\">False</span> (superscripts fail)</td></tr>\n          <tr><td><code>.isidentifier()</code></td><td>Valid Python Variable</td><td><code>\"_data_var\".isidentifier()</code> <span class=\"tbl-arrow\">&rarr;</span> <span class=\"tbl-ret-bool true\">True</span></td><td><code>\"42user\".isidentifier()</code> <span class=\"tbl-arrow\">&rarr;</span> <span class=\"tbl-ret-bool false\">False</span> (starts with digit)</td></tr>\n          <tr><td><code>.isprintable()</code></td><td>Printable Characters</td><td><code>\"Hello!\".isprintable()</code> <span class=\"tbl-arrow\">&rarr;</span> <span class=\"tbl-ret-bool true\">True</span></td><td><code>\"\\n\".isprintable()</code> <span class=\"tbl-arrow\">&rarr;</span> <span class=\"tbl-ret-bool false\">False</span> (escapes fail)</td></tr>\n          <tr><td><code>.isascii()</code></td><td>7-Bit ASCII Range</td><td><code>\"Data\".isascii()</code> <span class=\"tbl-arrow\">&rarr;</span> <span class=\"tbl-ret-bool true\">True</span></td><td><code>\"🐍\".isascii()</code> <span class=\"tbl-arrow\">&rarr;</span> <span class=\"tbl-ret-bool false\">False</span> (emoji fail)</td></tr>\n        </tbody>\n      </table>\n    </div>\n  </div>\n\n  <!-- Code Container Subcard -->\n  <div class=\"topic-subcard\" id=\"day03ValidationCodeSection\">\n    <div class=\"subcard-header-with-audio\">\n      <h4 class=\"subcard-header-title\">Production Input Sanitization & Validation</h4>\n      <button class=\"audio-play-btn\" onclick=\"playAudio('Day03/New_PyDay03Audio22.mp3', this)\" title=\"Play narration\">\n        <svg class=\"play-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M8 5v14l11-7z\"/></svg>\n      </button>\n    </div>\n    <div class=\"code-block-container\">\n      <div class=\"code-subblock\">\n        <pre><code><span class=\"code-comment\"># Strict Integer Conversion Guard</span>\ndef parse_positive_int(user_str: str) -&gt; int:\n    cleaned = user_str.strip()\n    if not cleaned.isdecimal():\n        raise ValueError(f\"Invalid integer: {repr(user_str)}\")\n    return int(cleaned)\n\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">f\"Valid:   {parse_positive_int('  4096  ')}\"</span>)   <span class=\"code-comment\"># Output: 4096</span>\n\n<span class=\"code-comment\"># The isdigit() vs isdecimal() Unicode Trap</span>\nsuperscript_two = <span class=\"code-str\">\"²\"</span>\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">f\"'²'.isdigit():   {superscript_two.isdigit()}\"</span>)    <span class=\"code-comment\"># True (Unicode digit!)</span>\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">f\"'²'.isdecimal(): {superscript_two.isdecimal()}\"</span>)  <span class=\"code-comment\"># False (Not base-10 decimal!)</span>\n\n<span class=\"code-comment\"># Identifier Verification for Dynamic SQL Column Name Checking</span>\ncol_candidate = <span class=\"code-str\">\"user_id_primary\"</span>\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">f\"Safe SQL Col Name: {col_candidate.isidentifier()}\"</span>)  <span class=\"code-comment\"># Output: True</span></code></pre>\n      </div>\n    </div>\n  </div>\n\n  <!-- 💡 Key Notes -->\n  <div class=\"py-recall-hook py-keynotes-card\">\n    <div class=\"py-keynotes-icon-wrap\">💡</div>\n    <div class=\"py-recall-body py-keynotes-body\">\n      <div class=\"py-recall-header py-keynotes-header\">\n        <span class=\"py-recall-title py-keynotes-title\">Key Notes</span>\n        <span class=\"py-recall-tag py-keynotes-tag\">Validation Rules & Gotchas</span>\n      </div>\n      <ul class=\"py-keynotes-list\">\n        <li><strong>Empty Strings Fail All Predicates</strong>: <code>\"\".isalpha()</code>, <code>\"\".isdigit()</code>, and <code>\"\".isspace()</code> all return <code>False</code>. Always test length or truthiness before relying on predicate methods.</li>\n        <li><strong>Negative Numbers Fail <code>.isdigit()</code></strong>: Because the minus sign (<code>-</code>) is punctuation, <code>\"-42\".isdigit()</code> evaluates to <code>False</code>. Use <code>s.lstrip(\"-\").isdigit()</code> or a <code>try/except ValueError</code> block for signed numbers.</li>\n        <li><strong>Decimal vs Digit vs Numeric Hierarchy</strong>: <code>isdecimal() &sube; isdigit() &sube; isnumeric()</code>. For parsing integers safely, always prefer <code>.isdecimal()</code> to reject superscripts (<code>²</code>) and vulgar fractions (<code>½</code>).</li>\n      </ul>\n    </div>\n  </div>\n</div>\n\n\n<!-- ═══ SECTION 09: Master Anti-Patterns ═══ -->\n<div class=\"slide-section\" id=\"day03MistakesSection\">\n  <h2 class=\"slide-section-title heading-box-wrap heading-with-audio\" id=\"headingMistakes\">\n    <span class=\"heading-num-box\">09</span>\n    <span class=\"heading-title-box\">\n      <span class=\"heading-title-text\">Common Anti-Patterns</span>\n    </span>\n  </h2>\n\n  <!-- Master Anti-Pattern Review Table Subcard (Exact Day 02 ADR-018 frozen Col 1) -->\n  <div class=\"topic-subcard\" id=\"day03MistakesTableSection\">\n    <div class=\"table-header-wrap\">\n      <div class=\"table-header-left\">\n        <h4 class=\"table-header-title\">Master Anti-Pattern Review Table</h4>\n      </div>\n      <div class=\"table-header-actions\">\n        <div class=\"table-search-box\">\n          <svg class=\"table-search-icon\" width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\"><circle cx=\"11\" cy=\"11\" r=\"8\"/><path d=\"m21 21-4.3-4.3\"/></svg>\n          <input type=\"text\" class=\"table-search-input\" placeholder=\"Search traps &amp; fixes...\" oninput=\"filterTableRows(this)\" />\n        </div>\n      </div>\n    </div>\n    <div class=\"db-mock-table-wrap\">\n      <table class=\"db-table-mock db-table-mock--compact arith-sticky-table anti-pattern-table\">\n        <thead>\n          <tr>\n            <th>Buggy Code Pattern</th>\n            <th>Runtime Result</th>\n            <th>Root Cause / Python Mechanism</th>\n            <th>Recommended Production Fix</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n            <td><code class=\"ap-code-bug\">s = \"Hello\"; s[0] = \"h\"</code></td>\n            <td><span class=\"ap-result-bad\">TypeError: 'str' does not support item assignment</span></td>\n            <td>Strings are completely immutable in memory</td>\n            <td><code class=\"ap-code-fix\">s = \"h\" + s[1:]</code></td>\n          </tr>\n          <tr>\n            <td><code class=\"ap-code-bug\">\"Score: \" + 100</code></td>\n            <td><span class=\"ap-result-bad\">TypeError: can only concatenate str to str</span></td>\n            <td>Python never coerces numbers to strings implicitly</td>\n            <td><code class=\"ap-code-fix\">f\"Score: {100}\"</code></td>\n          </tr>\n          <tr>\n            <td><code class=\"ap-code-bug\">path = \"C:\\new\\test.txt\"</code></td>\n            <td><span class=\"ap-result-bad\">C:&lt;newline&gt;ew&lt;tab&gt;est.txt</span></td>\n            <td><code>\\n</code> and <code>\\t</code> interpreted as escape sequences</td>\n            <td><code class=\"ap-code-fix\">path = r\"C:\\new\\test.txt\"</code></td>\n          </tr>\n          <tr>\n            <td><code class=\"ap-code-bug\">\"www.python.org\".strip(\"w.org\")</code></td>\n            <td><span class=\"ap-result-bad\">'pyth'</span> <span class=\"ap-expected\">(expected 'python')</span></td>\n            <td><code>strip()</code> removes any character in set; stripped trailing 'o'</td>\n            <td><code class=\"ap-code-fix\">s.removeprefix(\"www.\").removesuffix(\".org\")</code></td>\n          </tr>\n          <tr>\n            <td><code class=\"ap-code-bug\">out = \"\"; for x in items: out += x</code></td>\n            <td><span class=\"ap-result-bad\">Extreme quadratic latency $O(N^2)$</span></td>\n            <td>Allocates brand-new string in memory on each iteration</td>\n            <td><code class=\"ap-code-fix\">out = \"\".join(items)</code></td>\n          </tr>\n          <tr>\n            <td><code class=\"ap-code-bug\">pos = s.find(\"x\"); if pos: ...</code></td>\n            <td><span class=\"ap-result-bad\">Skips character at index 0</span></td>\n            <td>If found at index 0, <code>pos == 0</code> evaluates to False</td>\n            <td><code class=\"ap-code-fix\">if pos != -1: ...</code></td>\n          </tr>\n          <tr>\n            <td><code class=\"ap-code-bug\">\"-42\".isdigit()</code></td>\n            <td><span class=\"ap-result-bad\">False</span></td>\n            <td>Minus sign <code>-</code> is punctuation, not a digit</td>\n            <td><code class=\"ap-code-fix\">s.lstrip(\"-\").isdigit()</code></td>\n          </tr>\n          <tr>\n            <td><code class=\"ap-code-bug\">\"Apple\" &lt; \"banana\"</code></td>\n            <td><span class=\"ap-result-bad\">True</span></td>\n            <td>ASCII uppercase (65-90) always precedes lowercase (97-122)</td>\n            <td><code class=\"ap-code-fix\">a.casefold() &lt; b.casefold()</code></td>\n          </tr>\n          <tr>\n            <td><code class=\"ap-code-bug\">\"they're\".title()</code></td>\n            <td><span class=\"ap-result-bad\">\"They'Re\"</span></td>\n            <td>Apostrophe treated as word boundary by <code>title()</code></td>\n            <td><code class=\"ap-code-fix\">import string; string.capwords(s)</code></td>\n          </tr>\n          <tr>\n            <td><code class=\"ap-code-bug\">k, v = \"foo\".split(\"=\", 1)</code></td>\n            <td><span class=\"ap-result-bad\">ValueError: not enough values to unpack</span></td>\n            <td>Split returns length-1 list if delimiter missing</td>\n            <td><code class=\"ap-code-fix\">k, sep, v = \"foo\".partition(\"=\")</code></td>\n          </tr>\n          <tr>\n            <td><code class=\"ap-code-bug\">val = \"   \"; if not val: ...</code></td>\n            <td><span class=\"ap-result-bad\">Condition not triggered (treated as truthy)</span></td>\n            <td>Whitespace string has length &gt; 0, evaluating to True</td>\n            <td><code class=\"ap-code-fix\">if not val.strip(): ...</code></td>\n          </tr>\n          <tr>\n            <td><code class=\"ap-code-bug\">r\"path\\dir\\\"</code></td>\n            <td><span class=\"ap-result-bad\">SyntaxError: EOL while scanning string literal</span></td>\n            <td>Raw string cannot end with an odd number of backslashes</td>\n            <td><code class=\"ap-code-fix\">r\"path\\dir\" + \"\\\\\"</code></td>\n          </tr>\n          <tr>\n            <td><code class=\"ap-code-bug\">query = f\"SELECT * WHERE id = '{uid}'\"</code></td>\n            <td><span class=\"ap-result-bad\">Fatal SQL Injection Vulnerability</span></td>\n            <td>Never concatenate or interpolate raw user input into SQL</td>\n            <td><code class=\"ap-code-fix\">cursor.execute(\"... WHERE id = %s\", (uid,))</code></td>\n          </tr>\n          <tr>\n            <td><code class=\"ap-code-bug\">\"½\".isnumeric() == \"½\".isdecimal()</code></td>\n            <td><span class=\"ap-result-bad\">False</span></td>\n            <td><code>isnumeric()</code> accepts fractions; <code>isdecimal()</code> strictly base-10</td>\n            <td><code class=\"ap-code-fix\">Use isdecimal() for database integers</code></td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n  </div>\n</div>\n\n\n<!-- ═══ SECTION 10: Interview Questions ═══ -->\n<div class=\"slide-section\" id=\"day03InterviewSection\">\n  <h2 class=\"slide-section-title heading-box-wrap heading-with-audio\" id=\"headingInterview\">\n    <span class=\"heading-num-box\">10</span>\n    <span class=\"heading-title-box\">\n      <span class=\"heading-title-text\">Review & Interview Questions</span>\n    </span>\n  </h2>\n\n  <div class=\"interview-box\">\n    <h4 class=\"interview-header-title\">\n      <span>🎯</span> Python Strings &amp; Text Processing Core Concepts\n    </h4>\n\n    <div id=\"pyDay03IQ1\">\n      <p><strong>Q1: Why are strings immutable in Python, and how does this affect memory?</strong></p>\n      <p><em>A: String immutability enables CPython string interning (reusing identical string literals via <code>PyASCIIObject</code>), guarantees deterministic dictionary hash keys, and prevents side effects across shared references. Any string transformation creates a new object in memory.</em></p>\n    </div>\n    <hr class=\"interview-divider\" />\n\n    <div id=\"pyDay03IQ2\">\n      <p><strong>Q2: What is the computational complexity of repeated string concatenation with <code>+=</code> inside a loop?</strong></p>\n      <p><em>A: It is $O(N^2)$ quadratic. Because strings cannot be modified in-place, each <code>+=</code> allocates a new string in memory and copies all previous characters. The optimal pattern is appending substrings to a list and calling <code>\"\".join(list)</code> in $O(N)$ linear time.</em></p>\n    </div>\n    <hr class=\"interview-divider\" />\n\n    <div id=\"pyDay03IQ3\">\n      <p><strong>Q3: How does CPython represent strings in memory under PEP 393?</strong></p>\n      <p><em>A: CPython uses a flexible string representation: 1 byte per character (Latin-1) if all characters fit in ASCII/Latin-1 (0-255), 2 bytes (UCS-2) for characters up to U+FFFF, and 4 bytes (UCS-4) for full Unicode up to U+10FFFF. This saves up to 75% memory compared to uniform 4-byte representations.</em></p>\n    </div>\n    <hr class=\"interview-divider\" />\n\n    <div id=\"pyDay03IQ4\">\n      <p><strong>Q4: What is the difference between <code>str()</code> and <code>repr()</code> in Python?</strong></p>\n      <p><em>A: <code>str()</code> returns a human-readable string representation intended for end-user display. <code>repr()</code> returns an unambiguous, developer-focused representation showing raw escape sequences (e.g. <code>'\\n'</code>, <code>'\\t'</code>) and quotes. When debugging strings, always use <code>repr()</code>.</em></p>\n    </div>\n    <hr class=\"interview-divider\" />\n\n    <div id=\"pyDay03IQ5\">\n      <p><strong>Q5: Why does <code>\"Apple\" &lt; \"banana\"</code> evaluate to <code>True</code>?</strong></p>\n      <p><em>A: Python compares strings lexicographically based on their Unicode code points. Uppercase ASCII letters ('A'-'Z') have code points 65-90, while lowercase letters ('a'-'z') have code points 97-122. Since 65 &lt; 97, all uppercase words precede lowercase words.</em></p>\n    </div>\n    <hr class=\"interview-divider\" />\n\n    <div id=\"pyDay03IQ6\">\n      <p><strong>Q6: How does <code>.casefold()</code> differ from <code>.lower()</code>?</strong></p>\n      <p><em>A: <code>.lower()</code> performs standard lowercase mapping. <code>.casefold()</code> implements full Unicode case-folding rules designed for caseless comparisons. For example, German lowercase sharp s <code>'ß'.casefold()</code> produces <code>'ss'</code>, whereas <code>'ß'.lower()</code> leaves <code>'ß'</code> intact.</em></p>\n    </div>\n    <hr class=\"interview-divider\" />\n\n    <div id=\"pyDay03IQ7\">\n      <p><strong>Q7: Why does <code>s.find(\"x\")</code> returning 0 cause bugs when used as a boolean condition?</strong></p>\n      <p><em>A: In Python, the integer <code>0</code> evaluates to <code>False</code> in boolean contexts. If substring <code>\"x\"</code> is found at index 0, <code>if s.find(\"x\"):</code> evaluates to <code>False</code> and skips execution. Always defensively check <code>if s.find(\"x\") != -1:</code> or use <code>if \"x\" in s:</code>.</em></p>\n    </div>\n    <hr class=\"interview-divider\" />\n\n    <div id=\"pyDay03IQ8\">\n      <p><strong>Q8: What is the difference between <code>.strip(\"abc\")</code> and <code>.removeprefix(\"abc\")</code>?</strong></p>\n      <p><em>A: <code>.strip(\"abc\")</code> treats its argument as a character set, stripping any combination of 'a', 'b', and 'c' from both ends until a different character is encountered. <code>.removeprefix(\"abc\")</code> (Python 3.9+) strictly matches and removes the exact sequence <code>\"abc\"</code> from the beginning once.</em></p>\n    </div>\n    <hr class=\"interview-divider\" />\n\n    <div id=\"pyDay03IQ9\">\n      <p><strong>Q9: How do string slices handle out-of-bounds indices compared to direct indexing?</strong></p>\n      <p><em>A: Direct indexing outside valid bounds (e.g. <code>s[100]</code>) immediately raises an <code>IndexError</code>. In contrast, slicing (e.g. <code>s[0:100]</code> or <code>s[50:100]</code>) clamps gracefully to the string boundaries without raising any exception.</em></p>\n    </div>\n    <hr class=\"interview-divider\" />\n\n    <div id=\"pyDay03IQ10\">\n      <p><strong>Q10: Why does <code>s[::-1]</code> reverse a string, and what is its performance?</strong></p>\n      <p><em>A: In the extended slice <code>[start:stop:step]</code>, a negative step (<code>-1</code>) tells Python to traverse the sequence backward from end to beginning. It executes in $O(N)$ linear time in optimized C code and allocates a new reversed string.</em></p>\n    </div>\n    <hr class=\"interview-divider\" />\n\n    <div id=\"pyDay03IQ11\">\n      <p><strong>Q11: Why does raw string <code>r\"C:\\path\\\"</code> cause a SyntaxError in Python?</strong></p>\n      <p><em>A: Raw strings treat backslashes literally, but the Python parser still uses backslashes to escape quotation marks. A trailing backslash escapes the closing quote mark, leaving the string literal unclosed and triggering a syntax error. Solution: <code>r\"C:\\path\" + \"\\\\\"</code>.</em></p>\n    </div>\n    <hr class=\"interview-divider\" />\n\n    <div id=\"pyDay03IQ12\">\n      <p><strong>Q12: What is the self-documenting f-string syntax in Python 3.8+?</strong></p>\n      <p><em>A: Appending an equals sign (<code>=</code>) after an expression inside curly braces (e.g. <code>f\"{x=}\"</code>) outputs both the text of the expression and its evaluated value: <code>\"x=42\"</code>. It is invaluable for rapid logging and debugging.</em></p>\n    </div>\n    <hr class=\"interview-divider\" />\n\n    <div id=\"pyDay03IQ13\">\n      <p><strong>Q13: What is the hierarchy between <code>.isdecimal()</code>, <code>.isdigit()</code>, and <code>.isnumeric()</code>?</strong></p>\n      <p><em>A: <code>.isdecimal()</code> is the strictest subset (base-10 ASCII/Unicode digits 0-9). <code>.isdigit()</code> is broader, including superscripts (²). <code>.isnumeric()</code> is the broadest, including Roman numerals, fractions (½), and currency numerics. For integer conversion, always use <code>.isdecimal()</code>.</em></p>\n    </div>\n    <hr class=\"interview-divider\" />\n\n    <div id=\"pyDay03IQ14\">\n      <p><strong>Q14: How does <code>.partition()</code> prevent <code>ValueError: not enough values to unpack</code> compared to <code>.split()</code>?</strong></p>\n      <p><em>A: <code>s.split(\"=\", 1)</code> returns a list of 1 element if <code>\"=\"</code> is absent, causing unpacking into <code>k, v</code> to fail with ValueError. <code>s.partition(\"=\")</code> is guaranteed to return a 3-tuple <code>(before, sep, after)</code>; if absent, it returns <code>(s, \"\", \"\")</code> safely.</em></p>\n    </div>\n    <hr class=\"interview-divider\" />\n\n    <div id=\"pyDay03IQ15\">\n      <p><strong>Q15: Why is <code>\"\".isspace()</code> evaluated to <code>False</code>?</strong></p>\n      <p><em>A: All character classification predicate methods (<code>.isalpha()</code>, <code>.isdigit()</code>, <code>.isspace()</code>, etc.) require the string to contain at least one character to return <code>True</code>. Empty strings have zero characters and thus always return <code>False</code>.</em></p>\n    </div>\n    <hr class=\"interview-divider\" />\n\n    <div id=\"pyDay03IQ16\">\n      <p><strong>Q16: How do you format a float as currency with comma thousands separators and 2 decimal places using f-strings?</strong></p>\n      <p><em>A: Using the format specifier <code>:,.2f</code>: <code>f\"${val:,.2f}\"</code> formats <code>1250000.5</code> into <code>\"$1,250,000.50\"</code>.</em></p>\n    </div>\n    <hr class=\"interview-divider\" />\n\n    <div id=\"pyDay03IQ17\">\n      <p><strong>Q17: What does the <code>!r</code> conversion flag do inside an f-string?</strong></p>\n      <p><em>A: The <code>!r</code> flag forces Python to call <code>repr()</code> on the expression rather than <code>str()</code>. For instance, <code>f\"{val!r}\"</code> wraps strings in quotes and preserves escape characters, making log outputs unambiguous.</em></p>\n    </div>\n    <hr class=\"interview-divider\" />\n\n    <div id=\"pyDay03IQ18\">\n      <p><strong>Q18: What is string interning in CPython?</strong></p>\n      <p><em>A: CPython automatically caches and shares memory for short, ASCII-only strings that look like Python identifiers. This ensures that duplicate string literals point to the exact same memory address (<code>a is b == True</code>), accelerating dictionary lookups by comparing memory pointers instead of character arrays.</em></p>\n    </div>\n    <hr class=\"interview-divider\" />\n\n    <div id=\"pyDay03IQ19\">\n      <p><strong>Q19: How do you check if a string starts with any of multiple prefixes cleanly?</strong></p>\n      <p><em>A: Pass a tuple of prefixes directly to <code>.startswith()</code>: <code>url.startswith((\"http://\", \"https://\", \"ftp://\"))</code> returns <code>True</code> if any match. Passing a list raises a TypeError.</em></p>\n    </div>\n    <hr class=\"interview-divider\" />\n\n    <div id=\"pyDay03IQ20\">\n      <p><strong>Q20: Why does <code>\"123\" * -3</code> evaluate to <code>\"\"</code> instead of raising an error?</strong></p>\n      <p><em>A: In Python sequence repetition, multiplying a sequence by zero or any negative integer produces an empty sequence of that type without raising an exception.</em></p>\n    </div>\n    <hr class=\"interview-divider\" />\n\n    <div id=\"pyDay03IQ21\">\n      <p><strong>Q21: What is the time complexity of the <code>in</code> operator for substring search in CPython?</strong></p>\n      <p><em>A: CPython uses a combination of Boyer-Moore and Horspool algorithms for substring matching. The worst-case complexity is $O(N cdot M)$ and the average-case is $O(N / M)$, making it substantially faster than naive linear scanning.</em></p>\n    </div>\n    <hr class=\"interview-divider\" />\n\n    <div id=\"pyDay03IQ22\">\n      <p><strong>Q22: How does <code>.splitlines()</code> handle line endings compared to <code>.split(\"\\n\")</code>?</strong></p>\n      <p><em>A: <code>.split(\"\\n\")</code> only splits on Unix LF newlines. <code>.splitlines()</code> automatically handles all universal line terminators: <code>\\n</code>, <code>\\r</code>, <code>\\r\\n</code>, <code>\\v</code>, <code>\\f</code>, and Unicode line separators (U+2028), preventing phantom empty lines from Windows CRLF files.</em></p>\n    </div>\n    <hr class=\"interview-divider\" />\n\n    <div id=\"pyDay03IQ23\">\n      <p><strong>Q23: How can you dynamically pad a string with zeros to a specific width without f-strings?</strong></p>\n      <p><em>A: Use <code>.zfill(width)</code>: <code>\"42\".zfill(6)</code> returns <code>\"000042\"</code>. It correctly handles leading signs (<code>\"-42\".zfill(6)</code> produces <code>\"-00042\"</code>).</em></p>\n    </div>\n    <hr class=\"interview-divider\" />\n\n    <div id=\"pyDay03IQ24\">\n      <p><strong>Q24: What is the result of <code>bool(\"   \")</code> versus <code>bool(\"\")</code>?</strong></p>\n      <p><em>A: <code>bool(\"\")</code> is <code>False</code> because an empty string has length 0. <code>bool(\"   \")</code> is <code>True</code> because a whitespace string has length &gt; 0. To verify if a string contains actual non-whitespace content, always use <code>bool(s.strip())</code>.</em></p>\n    </div>\n    <hr class=\"interview-divider\" />\n\n    <div id=\"pyDay03IQ25\">\n      <p><strong>Q25: Why is string interpolation in SQL queries considered a critical vulnerability, and what is the proper pattern?</strong></p>\n      <p><em>A: Interpolating strings into SQL queries allows attackers to inject malicious SQL syntax (SQL Injection). The fix is parameterized queries where parameters are passed separately to the database driver (e.g. <code>cursor.execute(\"SELECT * FROM users WHERE email = %s\", (email,))</code>).</em></p>\n    </div>\n  </div>\n</div>\n"
    }
  ],
  "practiceQuestions": [
    {
      "id": 1,
      "difficulty": "Easy",
      "category": "indexing",
      "title": "First, Last and Length",
      "given": "language = \"Python\"",
      "outputs": [
        "first",
        "last",
        "size"
      ],
      "starterCode": "",
      "prompt": "<strong>[Easy] First, Last and Length</strong><p>Given:</p><pre><code>language = &quot;Python&quot;</code></pre><p>Store the first character in <code>first</code>, the last character in <code>last</code>, and the character count in <code>size</code>.</p>",
      "ref": "language = \"Python\"\n\nfirst = language[0]\nlast = language[-1]\nsize = len(language)\nprint(first, last, size)\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "first",
            "type": "string",
            "value": "P",
            "exact": true
          },
          {
            "name": "last",
            "type": "string",
            "value": "n",
            "exact": true
          },
          {
            "name": "size",
            "type": "int",
            "value": 6,
            "exact": true
          }
        ]
      },
      "explanation": "Index 0 starts the string; -1 selects its last character. len returns an int, connecting strings to Day 01 types.",
      "hint": "Use language[0] for first, language[-1] for last, and len(language) for character count."
    },
    {
      "id": 2,
      "difficulty": "Easy",
      "category": "types",
      "title": "Text Digits and Arithmetic",
      "given": "digits = \"42\"\nincrement = 8",
      "outputs": [
        "combined",
        "total",
        "kind"
      ],
      "starterCode": "",
      "prompt": "<strong>[Easy] Text Digits and Arithmetic</strong><p>Given:</p><pre><code>digits = &quot;42&quot;\nincrement = 8</code></pre><p>Append the text form of increment to digits in <code>combined</code>. Convert digits to an integer and add increment in <code>total</code>. Store the type name of digits in <code>kind</code>.</p>",
      "ref": "digits = \"42\"\nincrement = 8\n\ncombined = digits + str(increment)\ntotal = int(digits) + increment\nkind = type(digits).__name__\nprint(combined, total, kind)\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "combined",
            "type": "string",
            "value": "428",
            "exact": true
          },
          {
            "name": "total",
            "type": "int",
            "value": 50,
            "exact": true
          },
          {
            "name": "kind",
            "type": "string",
            "value": "str",
            "exact": true
          }
        ]
      },
      "explanation": "The Day 02 + operator concatenates two strings or adds two integers. Explicit conversion keeps these behaviors separate. type(digits).__name__ reads the type name as text; it does not convert digits to an integer.",
      "hint": "Use digits + str(increment) for text joining, int(digits) + increment for addition, and type(digits).__name__ for type name."
    },
    {
      "id": 3,
      "difficulty": "Easy",
      "category": "operators",
      "title": "Build a Label and Divider",
      "given": "team = \"Data\"\nrepeat = 3",
      "outputs": [
        "label",
        "divider",
        "contains_at"
      ],
      "starterCode": "",
      "prompt": "<strong>[Easy] Build a Label and Divider</strong><p>Given:</p><pre><code>team = &quot;Data&quot;\nrepeat = 3</code></pre><p>Build <code>label</code> as <code>&quot;Team: Data&quot;</code> using team, repeat <code>&quot;-&quot;</code> exactly repeat times in <code>divider</code>, and store whether <code>&quot;at&quot;</code> occurs in team in <code>contains_at</code>.</p>",
      "ref": "team = \"Data\"\nrepeat = 3\n\nlabel = \"Team: \" + team\ndivider = \"-\" * repeat\ncontains_at = \"at\" in team\nprint(label, divider, contains_at)\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "label",
            "type": "string",
            "value": "Team: Data",
            "exact": true
          },
          {
            "name": "divider",
            "type": "string",
            "value": "---",
            "exact": true
          },
          {
            "name": "contains_at",
            "type": "bool",
            "value": true,
            "exact": true
          }
        ]
      },
      "explanation": "+ joins text, * repeats it, and in tests a substring. Membership produces a bool.",
      "hint": "Use &quot;Team: &quot; + team, &quot;-&quot; * repeat, and &quot;at&quot; in team."
    },
    {
      "id": 4,
      "difficulty": "Easy",
      "category": "slicing",
      "title": "Read a Product Code",
      "given": "code = \"PY-2048\"",
      "outputs": [
        "prefix",
        "number_text",
        "tail"
      ],
      "starterCode": "",
      "prompt": "<strong>[Easy] Read a Product Code</strong><p>Given:</p><pre><code>code = &quot;PY-2048&quot;</code></pre><p>Use slices to store the first two characters in <code>prefix</code>, everything after the hyphen in <code>number_text</code>, and the final two characters in <code>tail</code>.</p>",
      "ref": "code = \"PY-2048\"\n\nprefix = code[:2]\nnumber_text = code[3:]\ntail = code[-2:]\nprint(prefix, number_text, tail)\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "prefix",
            "type": "string",
            "value": "PY",
            "exact": true
          },
          {
            "name": "number_text",
            "type": "string",
            "value": "2048",
            "exact": true
          },
          {
            "name": "tail",
            "type": "string",
            "value": "48",
            "exact": true
          }
        ]
      },
      "explanation": "The stop index is excluded. Slicing numeric characters still produces str values.",
      "hint": "Slice code[:2] for first 2 chars, code[3:] for chars after hyphen, and code[-2:] for last 2 chars."
    },
    {
      "id": 5,
      "difficulty": "Easy",
      "category": "slicing",
      "title": "Steps and Reverse",
      "given": "text = \"abcdefg\"",
      "outputs": [
        "every_second",
        "backwards",
        "beyond"
      ],
      "starterCode": "",
      "prompt": "<strong>[Easy] Steps and Reverse</strong><p>Given:</p><pre><code>text = &quot;abcdefg&quot;</code></pre><p>Store characters at indexes 0, 2, 4, 6 in <code>every_second</code>, the whole string backwards in <code>backwards</code>, and <code>text[20:30]</code> in <code>beyond</code>.</p>",
      "ref": "text = \"abcdefg\"\n\nevery_second = text[::2]\nbackwards = text[::-1]\nbeyond = text[20:30]\nprint(every_second, backwards, beyond)\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "every_second",
            "type": "string",
            "value": "aceg",
            "exact": true
          },
          {
            "name": "backwards",
            "type": "string",
            "value": "gfedcba",
            "exact": true
          },
          {
            "name": "beyond",
            "type": "string",
            "value": "",
            "exact": true
          }
        ]
      },
      "explanation": "A step controls the stride; -1 walks backwards. This slice starts beyond the end, so it is empty. Partly out-of-range slices clip to the available characters instead of raising IndexError.",
      "hint": "Use step [::2] to jump by 2, [::-1] to reverse, and text[20:30] for out-of-range slice."
    },
    {
      "id": 6,
      "difficulty": "Easy",
      "category": "case",
      "title": "Methods Leave the Original",
      "given": "raw = \"mIxEd Case\"",
      "outputs": [
        "lowered",
        "uppered",
        "titled",
        "original"
      ],
      "starterCode": "",
      "prompt": "<strong>[Easy] Methods Leave the Original</strong><p>Given:</p><pre><code>raw = &quot;mIxEd Case&quot;</code></pre><p>Store the lowercase form in <code>lowered</code>, uppercase form in <code>uppered</code>, title-cased form in <code>titled</code>, and the unchanged input in <code>original</code>.</p>",
      "ref": "raw = \"mIxEd Case\"\n\nlowered = raw.lower()\nuppered = raw.upper()\ntitled = raw.title()\noriginal = raw\nprint(lowered, uppered, titled, original)\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "lowered",
            "type": "string",
            "value": "mixed case",
            "exact": true
          },
          {
            "name": "uppered",
            "type": "string",
            "value": "MIXED CASE",
            "exact": true
          },
          {
            "name": "titled",
            "type": "string",
            "value": "Mixed Case",
            "exact": true
          },
          {
            "name": "original",
            "type": "string",
            "value": "mIxEd Case",
            "exact": true
          }
        ]
      },
      "explanation": "These methods return strings; they do not mutate raw. Assign the returned values to retain them.",
      "hint": "Use raw.lower(), raw.upper(), raw.title(), and raw for original."
    },
    {
      "id": 7,
      "difficulty": "Medium",
      "category": "validation",
      "title": "Trim Before Validation",
      "given": "raw_code = \" 12A \"\nraw_name = \" BC \"\nspaced = \" 7 7 \"",
      "outputs": [
        "clean_code",
        "code_ok",
        "name_ok",
        "spaced_ok"
      ],
      "starterCode": "",
      "prompt": "<strong>[Medium] Trim Before Validation</strong><p>Given:</p><pre><code>raw_code = &quot; 12A &quot;\nraw_name = &quot; BC &quot;\nspaced = &quot; 7 7 &quot;</code></pre><p>Strip raw_code into <code>clean_code</code>. Test clean_code.isalnum() in <code>code_ok</code>. Strip raw_name and test isalpha() in <code>name_ok</code>. Strip spaced and test isalnum() in <code>spaced_ok</code>; its internal space stays.</p>",
      "ref": "raw_code = \" 12A \"\nraw_name = \" BC \"\nspaced = \" 7 7 \"\n\nclean_code = raw_code.strip()\ncode_ok = clean_code.isalnum()\nname_ok = raw_name.strip().isalpha()\nspaced_ok = spaced.strip().isalnum()\nprint(clean_code, code_ok, name_ok, spaced_ok)\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "clean_code",
            "type": "string",
            "value": "12A",
            "exact": true
          },
          {
            "name": "code_ok",
            "type": "bool",
            "value": true,
            "exact": true
          },
          {
            "name": "name_ok",
            "type": "bool",
            "value": true,
            "exact": true
          },
          {
            "name": "spaced_ok",
            "type": "bool",
            "value": false,
            "exact": true
          }
        ]
      },
      "explanation": "Validate the trimmed value. strip removes boundary whitespace only, so &quot;7 7&quot; is not alphanumeric.",
      "hint": "Use raw_code.strip() then .isalnum() on clean values."
    },
    {
      "id": 8,
      "difficulty": "Medium",
      "category": "split-join",
      "title": "Choose the Exact Separator",
      "given": "raw = \"1,2,3,4,5\"",
      "outputs": [
        "parts",
        "csv_line",
        "tight",
        "line_len"
      ],
      "starterCode": "",
      "prompt": "<strong>[Medium] Choose the Exact Separator</strong><p>Given:</p><pre><code>raw = &quot;1,2,3,4,5&quot;</code></pre><p>Split raw on commas into <code>parts</code>. Join with comma plus one space into <code>csv_line</code>. Join with NO separator into <code>tight</code>: <code>&quot;12345&quot;</code>. Store the length of csv_line in <code>line_len</code>.</p>",
      "ref": "raw = \"1,2,3,4,5\"\n\nparts = raw.split(\",\")\ncsv_line = \", \".join(parts)\ntight = \"\".join(parts)\nline_len = len(csv_line)\nprint(parts, csv_line, tight, line_len)\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "parts",
            "type": "list",
            "value": [
              "1",
              "2",
              "3",
              "4",
              "5"
            ],
            "exact": true
          },
          {
            "name": "csv_line",
            "type": "string",
            "value": "1, 2, 3, 4, 5",
            "exact": true
          },
          {
            "name": "tight",
            "type": "string",
            "value": "12345",
            "exact": true
          },
          {
            "name": "line_len",
            "type": "int",
            "value": 13,
            "exact": true
          }
        ]
      },
      "explanation": "split produces a list of strings, so no conversion or loop is needed. The commas are separators consumed by split; joining the pieces with an empty string inserts nothing between them.",
      "hint": "Use raw.split(&quot;,&quot;), then &quot;, &quot;.join(parts), &quot;&quot;.join(parts), and len(csv_line)."
    },
    {
      "id": 9,
      "difficulty": "Medium",
      "category": "whitespace",
      "title": "Clean a Report Heading",
      "given": "raw = \"  monthly   revenue report  \"",
      "outputs": [
        "trimmed",
        "words",
        "heading",
        "word_count"
      ],
      "starterCode": "",
      "prompt": "<strong>[Medium] Clean a Report Heading</strong><p>Given:</p><pre><code>raw = &quot;  monthly   revenue report  &quot;</code></pre><p>Store the boundary-trimmed text in <code>trimmed</code>, split on whitespace into <code>words</code>, join words with one space and title-case into <code>heading</code>, and store the word count in <code>word_count</code>.</p>",
      "ref": "raw = \"  monthly   revenue report  \"\n\ntrimmed = raw.strip()\nwords = raw.split()\nheading = \" \".join(words).title()\nword_count = len(words)\nprint(trimmed, words, heading, word_count)\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "trimmed",
            "type": "string",
            "value": "monthly   revenue report",
            "exact": true
          },
          {
            "name": "words",
            "type": "list",
            "value": [
              "monthly",
              "revenue",
              "report"
            ],
            "exact": true
          },
          {
            "name": "heading",
            "type": "string",
            "value": "Monthly Revenue Report",
            "exact": true
          },
          {
            "name": "word_count",
            "type": "int",
            "value": 3,
            "exact": true
          }
        ]
      },
      "explanation": "strip preserves the three internal spaces. split without an argument collapses whitespace runs; join rebuilds predictable spacing.",
      "hint": "Use raw.strip(), raw.split(), &quot; &quot;.join(words).title(), and len(words)."
    },
    {
      "id": 10,
      "difficulty": "Medium",
      "category": "search",
      "title": "Locate a Status",
      "given": "log = \"INFO start | WARN retry | INFO end\"",
      "outputs": [
        "warning_index",
        "info_count",
        "error_index"
      ],
      "starterCode": "",
      "prompt": "<strong>[Medium] Locate a Status</strong><p>Given:</p><pre><code>log = &quot;INFO start | WARN retry | INFO end&quot;</code></pre><p>Find the zero-based start of <code>&quot;WARN&quot;</code> in <code>warning_index</code>, count <code>&quot;INFO&quot;</code> in <code>info_count</code>, and store the find result for absent text <code>&quot;ERROR&quot;</code> in <code>error_index</code>.</p>",
      "ref": "log = \"INFO start | WARN retry | INFO end\"\n\nwarning_index = log.find(\"WARN\")\ninfo_count = log.count(\"INFO\")\nerror_index = log.find(\"ERROR\")\nprint(warning_index, info_count, error_index)\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "warning_index",
            "type": "int",
            "value": 13,
            "exact": true
          },
          {
            "name": "info_count",
            "type": "int",
            "value": 2,
            "exact": true
          },
          {
            "name": "error_index",
            "type": "int",
            "value": -1,
            "exact": true
          }
        ]
      },
      "explanation": "find returns a starting index or -1. count counts non-overlapping occurrences.",
      "hint": "Use log.find(&quot;WARN&quot;), log.count(&quot;INFO&quot;), and log.find(&quot;ERROR&quot;)."
    },
    {
      "id": 11,
      "difficulty": "Medium",
      "category": "replace",
      "title": "Replace One or All",
      "given": "raw = \"red-red-red\"",
      "outputs": [
        "first_only",
        "all_changed",
        "original"
      ],
      "starterCode": "",
      "prompt": "<strong>[Medium] Replace One or All</strong><p>Given:</p><pre><code>raw = &quot;red-red-red&quot;</code></pre><p>Replace only the first <code>&quot;red&quot;</code> with <code>&quot;blue&quot;</code> in <code>first_only</code>. Replace every <code>&quot;red&quot;</code> with <code>&quot;blue&quot;</code> in <code>all_changed</code>. Store the unchanged input in <code>original</code>.</p>",
      "ref": "raw = \"red-red-red\"\n\nfirst_only = raw.replace(\"red\", \"blue\", 1)\nall_changed = raw.replace(\"red\", \"blue\")\noriginal = raw\nprint(first_only, all_changed, original)\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "first_only",
            "type": "string",
            "value": "blue-red-red",
            "exact": true
          },
          {
            "name": "all_changed",
            "type": "string",
            "value": "blue-blue-blue",
            "exact": true
          },
          {
            "name": "original",
            "type": "string",
            "value": "red-red-red",
            "exact": true
          }
        ]
      },
      "explanation": "The optional third argument limits replacements. Neither call changes raw.",
      "hint": "Use raw.replace(&quot;red&quot;, &quot;blue&quot;, 1) for first occurrence, and raw.replace(&quot;red&quot;, &quot;blue&quot;) for all."
    },
    {
      "id": 12,
      "difficulty": "Medium",
      "category": "boundaries",
      "title": "Filename Inspection",
      "given": "filename = \"report.q3.csv\"",
      "outputs": [
        "pieces",
        "extension",
        "stem",
        "is_csv"
      ],
      "starterCode": "",
      "prompt": "<strong>[Medium] Filename Inspection</strong><p>Given:</p><pre><code>filename = &quot;report.q3.csv&quot;</code></pre><p>Split on dots into <code>pieces</code>, store the last piece in <code>extension</code>, remove the final four characters (the known suffix <code>&quot;.csv&quot;</code>) into <code>stem</code>, and test endswith(&quot;.csv&quot;) in <code>is_csv</code>.</p>",
      "ref": "filename = \"report.q3.csv\"\n\npieces = filename.split(\".\")\nextension = pieces[-1]\nstem = filename[:-4]\nis_csv = filename.endswith(\".csv\")\nprint(pieces, extension, stem, is_csv)\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "pieces",
            "type": "list",
            "value": [
              "report",
              "q3",
              "csv"
            ],
            "exact": true
          },
          {
            "name": "extension",
            "type": "string",
            "value": "csv",
            "exact": true
          },
          {
            "name": "stem",
            "type": "string",
            "value": "report.q3",
            "exact": true
          },
          {
            "name": "is_csv",
            "type": "bool",
            "value": true,
            "exact": true
          }
        ]
      },
      "explanation": "The final list element is the extension. Removing the known suffix with a slice preserves the earlier dot.",
      "hint": "Use filename.split(&quot;.&quot;), pieces[-1], filename[:-4], and filename.endswith(&quot;.csv&quot;)."
    },
    {
      "id": 13,
      "difficulty": "Medium",
      "category": "formatting",
      "title": "Format an Order",
      "given": "product = \"Widget\"\nprice = 249.5\nqty = 4\norder_id = 42",
      "outputs": [
        "label",
        "total_line",
        "order_code"
      ],
      "starterCode": "",
      "prompt": "<strong>[Medium] Format an Order</strong><p>Given:</p><pre><code>product = &quot;Widget&quot;\nprice = 249.5\nqty = 4\norder_id = 42</code></pre><p>Build <code>label</code> as <code>&quot;Widget x4 @ 249.50 each&quot;</code>, <code>total_line</code> as <code>&quot;Total: 998.00&quot;</code> using price times qty, and <code>order_code</code> as <code>&quot;00042&quot;</code> using five-digit zero padding.</p>",
      "ref": "product = \"Widget\"\nprice = 249.5\nqty = 4\norder_id = 42\n\nlabel = f\"{product} x{qty} @ {price:.2f} each\"\ntotal_line = f\"Total: {price * qty:.2f}\"\norder_code = f\"{order_id:05d}\"\nprint(label, total_line, order_code)\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "label",
            "type": "string",
            "value": "Widget x4 @ 249.50 each",
            "exact": true
          },
          {
            "name": "total_line",
            "type": "string",
            "value": "Total: 998.00",
            "exact": true
          },
          {
            "name": "order_code",
            "type": "string",
            "value": "00042",
            "exact": true
          }
        ]
      },
      "explanation": ".2f formats two decimal places; 05d formats an integer with leading zeros.",
      "hint": "Use f-strings: {price:.2f} for 2 decimals, and {order_id:05d} for 5-digit padding."
    },
    {
      "id": 14,
      "difficulty": "Medium",
      "category": "escapes",
      "title": "Newlines Are Characters",
      "given": "heading = \"Day 03\"\ntopic = \"Strings\"",
      "outputs": [
        "message",
        "size",
        "single_line"
      ],
      "starterCode": "",
      "prompt": "<strong>[Medium] Newlines Are Characters</strong><p>Given:</p><pre><code>heading = &quot;Day 03&quot;\ntopic = &quot;Strings&quot;</code></pre><p>Build <code>message</code> from heading, one newline, and topic. Store its character count in <code>size</code> and replace that newline with <code>&quot; | &quot;</code> in <code>single_line</code>.</p>",
      "ref": "heading = \"Day 03\"\ntopic = \"Strings\"\n\nmessage = heading + \"\\n\" + topic\nsize = len(message)\nsingle_line = message.replace(\"\\n\", \" | \")\nprint(message, size, single_line)\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "message",
            "type": "string",
            "value": "Day 03\nStrings",
            "exact": true
          },
          {
            "name": "size",
            "type": "int",
            "value": 14,
            "exact": true
          },
          {
            "name": "single_line",
            "type": "string",
            "value": "Day 03 | Strings",
            "exact": true
          }
        ]
      },
      "explanation": "The escape \\n becomes one newline character. It counts once in len.",
      "hint": "Join with &quot;\\n&quot;, find len(message), and use .replace(&quot;\\n&quot;, &quot; | &quot;)."
    },
    {
      "id": 15,
      "difficulty": "Hard",
      "category": "immutability",
      "title": "Repair a First Letter",
      "given": "word = \"python\"",
      "outputs": [
        "fixed",
        "original",
        "same"
      ],
      "starterCode": "",
      "prompt": "<strong>[Hard] Repair a First Letter</strong><p>Given:</p><pre><code>word = &quot;python&quot;</code></pre><p>Build <code>fixed</code> with an uppercase first character and the unchanged remaining characters. Store word in <code>original</code> and store whether fixed equals original in <code>same</code>. Do not assign to a string index.</p>",
      "ref": "word = \"python\"\n\nfixed = word[0].upper() + word[1:]\noriginal = word\nsame = fixed == original\nprint(fixed, original, same)\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "fixed",
            "type": "string",
            "value": "Python",
            "exact": true
          },
          {
            "name": "original",
            "type": "string",
            "value": "python",
            "exact": true
          },
          {
            "name": "same",
            "type": "bool",
            "value": false,
            "exact": true
          }
        ]
      },
      "explanation": "Build a new string from slices. A different first-character case makes equality False.",
      "hint": "Build fixed = word[0].upper() + word[1:], set original = word, and test fixed == original."
    },
    {
      "id": 16,
      "difficulty": "Hard",
      "category": "comparison",
      "title": "Normalize and Compare",
      "given": "raw = \" Level \"\nother = \"LEVEL\"",
      "outputs": [
        "normalized",
        "is_palindrome",
        "same_ignoring_case"
      ],
      "starterCode": "",
      "prompt": "<strong>[Hard] Normalize and Compare</strong><p>Given:</p><pre><code>raw = &quot; Level &quot;\nother = &quot;LEVEL&quot;</code></pre><p>Strip and lowercase raw into <code>normalized</code>. Store whether it reads the same backwards in <code>is_palindrome</code>, and compare it with lowercase other in <code>same_ignoring_case</code>. Inputs contain only ASCII letters and spaces.</p>",
      "ref": "raw = \" Level \"\nother = \"LEVEL\"\n\nnormalized = raw.strip().lower()\nis_palindrome = normalized == normalized[::-1]\nsame_ignoring_case = normalized == other.lower()\nprint(normalized, is_palindrome, same_ignoring_case)\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "normalized",
            "type": "string",
            "value": "level",
            "exact": true
          },
          {
            "name": "is_palindrome",
            "type": "bool",
            "value": true,
            "exact": true
          },
          {
            "name": "same_ignoring_case",
            "type": "bool",
            "value": true,
            "exact": true
          }
        ]
      },
      "explanation": "Normalize before comparing. Reversal plus equality needs no loop; lower suffices for the supplied ASCII inputs.",
      "hint": "Use raw.strip().lower(), test normalized == normalized[::-1], and compare with other.lower()."
    },
    {
      "id": 17,
      "difficulty": "Hard",
      "category": "masking",
      "title": "Mask an Example Account",
      "given": "account = \"ACC20481237\"\nvisible = 4",
      "outputs": [
        "tail",
        "hidden_count",
        "masked"
      ],
      "starterCode": "",
      "prompt": "<strong>[Hard] Mask an Example Account</strong><p>Given:</p><pre><code>account = &quot;ACC20481237&quot;\nvisible = 4</code></pre><p>Store the final visible characters in <code>tail</code>, the hidden character count in <code>hidden_count</code>, and that many asterisks followed by tail in <code>masked</code>. This is a fictional identifier.</p>",
      "ref": "account = \"ACC20481237\"\nvisible = 4\n\ntail = account[-visible:]\nhidden_count = len(account) - visible\nmasked = \"*\" * hidden_count + tail\nprint(tail, hidden_count, masked)\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "tail",
            "type": "string",
            "value": "1237",
            "exact": true
          },
          {
            "name": "hidden_count",
            "type": "int",
            "value": 7,
            "exact": true
          },
          {
            "name": "masked",
            "type": "string",
            "value": "*******1237",
            "exact": true
          }
        ]
      },
      "explanation": "Day 02 subtraction calculates the mask width. Repetition and slicing assemble the result.",
      "hint": "Slice tail = account[-visible:], hidden_count = len(account) - visible, and &quot;*&quot; * hidden_count + tail."
    },
    {
      "id": 18,
      "difficulty": "Hard",
      "category": "validation",
      "title": "Validate a Simple Label",
      "given": "raw = \" A3F9Z2 \"\nminimum = 4\nmaximum = 8",
      "outputs": [
        "clean",
        "alnum",
        "length_ok",
        "valid",
        "decimal_is_digits"
      ],
      "starterCode": "",
      "prompt": "<strong>[Hard] Validate a Simple Label</strong><p>Given:</p><pre><code>raw = &quot; A3F9Z2 &quot;\nminimum = 4\nmaximum = 8</code></pre><p>Strip raw into <code>clean</code>. Store clean.isalnum() in <code>alnum</code>, whether its length is within the inclusive bounds in <code>length_ok</code>, and whether BOTH conditions hold in <code>valid</code>. Store <code>&quot;3.5&quot;.isdigit()</code> in <code>decimal_is_digits</code>.</p>",
      "ref": "raw = \" A3F9Z2 \"\nminimum = 4\nmaximum = 8\n\nclean = raw.strip()\nalnum = clean.isalnum()\nlength_ok = minimum <= len(clean) <= maximum\nvalid = alnum and length_ok\ndecimal_is_digits = \"3.5\".isdigit()\nprint(clean, alnum, length_ok, valid, decimal_is_digits)\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "clean",
            "type": "string",
            "value": "A3F9Z2",
            "exact": true
          },
          {
            "name": "alnum",
            "type": "bool",
            "value": true,
            "exact": true
          },
          {
            "name": "length_ok",
            "type": "bool",
            "value": true,
            "exact": true
          },
          {
            "name": "valid",
            "type": "bool",
            "value": true,
            "exact": true
          },
          {
            "name": "decimal_is_digits",
            "type": "bool",
            "value": false,
            "exact": true
          }
        ]
      },
      "explanation": "Combine string predicates with chained comparisons and and. A decimal point is not a digit.",
      "hint": "Use clean = raw.strip(), clean.isalnum(), minimum &lt;= len(clean) &lt;= maximum, and alnum and length_ok."
    },
    {
      "id": 19,
      "difficulty": "Hard",
      "category": "split-join",
      "title": "A Fixed Three-Field Record",
      "given": "record = \"Ada|Python|03\"",
      "outputs": [
        "fields",
        "name",
        "track",
        "day",
        "summary"
      ],
      "starterCode": "",
      "prompt": "<strong>[Hard] A Fixed Three-Field Record</strong><p>Given:</p><pre><code>record = &quot;Ada|Python|03&quot;</code></pre><p>Split on <code>&quot;|&quot;</code> into <code>fields</code>. Store the first field in <code>name</code>, the second lowercased in <code>track</code>, and the third converted to an integer in <code>day</code>. Build <code>summary</code> as <code>&quot;Ada: python day 3&quot;</code>. This record has exactly three fields.</p>",
      "ref": "record = \"Ada|Python|03\"\n\nfields = record.split(\"|\")\nname = fields[0]\ntrack = fields[1].lower()\nday = int(fields[2])\nsummary = f\"{name}: {track} day {day}\"\nprint(fields, name, track, day, summary)\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "fields",
            "type": "list",
            "value": [
              "Ada",
              "Python",
              "03"
            ],
            "exact": true
          },
          {
            "name": "name",
            "type": "string",
            "value": "Ada",
            "exact": true
          },
          {
            "name": "track",
            "type": "string",
            "value": "python",
            "exact": true
          },
          {
            "name": "day",
            "type": "int",
            "value": 3,
            "exact": true
          },
          {
            "name": "summary",
            "type": "string",
            "value": "Ada: python day 3",
            "exact": true
          }
        ]
      },
      "explanation": "Select known positions from a fixed record, then convert only the numeric field.",
      "hint": "Use record.split(&quot;|&quot;), extract fields[0], fields[1].lower(), int(fields[2]), and format summary with f-string."
    },
    {
      "id": 20,
      "difficulty": "Hard",
      "category": "pipeline",
      "title": "Publish a Clean Topic Slug",
      "given": "raw_title = \"  Python   Strings & Text  \"\nprefix = \"learn\"",
      "outputs": [
        "words",
        "clean_title",
        "normalized",
        "slug",
        "valid_prefix"
      ],
      "starterCode": "",
      "prompt": "<strong>[Hard] Publish a Clean Topic Slug</strong><p>Given:</p><pre><code>raw_title = &quot;  Python   Strings &amp; Text  &quot;\nprefix = &quot;learn&quot;</code></pre><p>Split raw_title on whitespace into <code>words</code>, join with one space into <code>clean_title</code>, lowercase it and replace <code>&quot; &amp; &quot;</code> with <code>&quot; and &quot;</code> into <code>normalized</code>. Replace spaces with hyphens and prepend prefix plus <code>&quot;/&quot;</code> into <code>slug</code>. Test startswith(&quot;learn/&quot;) in <code>valid_prefix</code>.</p>",
      "ref": "raw_title = \"  Python   Strings & Text  \"\nprefix = \"learn\"\n\nwords = raw_title.split()\nclean_title = \" \".join(words)\nnormalized = clean_title.lower().replace(\" & \", \" and \")\nslug = prefix + \"/\" + normalized.replace(\" \", \"-\")\nvalid_prefix = slug.startswith(\"learn/\")\nprint(words, clean_title, normalized, slug, valid_prefix)\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "words",
            "type": "list",
            "value": [
              "Python",
              "Strings",
              "&",
              "Text"
            ],
            "exact": true
          },
          {
            "name": "clean_title",
            "type": "string",
            "value": "Python Strings & Text",
            "exact": true
          },
          {
            "name": "normalized",
            "type": "string",
            "value": "python strings and text",
            "exact": true
          },
          {
            "name": "slug",
            "type": "string",
            "value": "learn/python-strings-and-text",
            "exact": true
          },
          {
            "name": "valid_prefix",
            "type": "bool",
            "value": true,
            "exact": true
          }
        ]
      },
      "explanation": "Normalize whitespace before replacing the exact ampersand phrase. This handles the specified input, not arbitrary URL escaping.",
      "hint": "Use raw_title.split(), &quot; &quot;.join(words), .lower().replace(&quot; &amp; &quot;, &quot; and &quot;), and prefix + &quot;/&quot; + normalized.replace(&quot; &quot;, &quot;-&quot;)."
    }
  ],
  "testQuestions": [
    {
      "id": 1,
      "difficulty": "Easy",
      "category": "types",
      "title": "Quoted Quantities",
      "given": "quantity = \"12\"\nextra = 3",
      "outputs": [
        "joined",
        "total"
      ],
      "starterCode": "",
      "prompt": "<strong>[Easy] Quoted Quantities</strong><p>Given:</p><pre><code>quantity = &quot;12&quot;\nextra = 3</code></pre><p>Store quantity followed by the text form of extra in <code>joined</code>, and their integer sum in <code>total</code>.</p>",
      "ref": "quantity = \"12\"\nextra = 3\n\njoined = quantity + str(extra)\ntotal = int(quantity) + extra\nprint(joined, total)\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "joined",
            "type": "string",
            "value": "123",
            "exact": true
          },
          {
            "name": "total",
            "type": "int",
            "value": 15,
            "exact": true
          }
        ]
      },
      "explanation": "Text concatenation and integer addition have different results.",
      "hint": ""
    },
    {
      "id": 2,
      "difficulty": "Easy",
      "category": "indexing",
      "title": "An Identifier",
      "given": "tag = \"DS-03\"",
      "outputs": [
        "first",
        "last",
        "size"
      ],
      "starterCode": "",
      "prompt": "<strong>[Easy] An Identifier</strong><p>Given:</p><pre><code>tag = &quot;DS-03&quot;</code></pre><p>Store the first character in <code>first</code>, last character in <code>last</code>, and character count in <code>size</code>.</p>",
      "ref": "tag = \"DS-03\"\n\nfirst = tag[0]\nlast = tag[-1]\nsize = len(tag)\nprint(first, last, size)\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "first",
            "type": "string",
            "value": "D",
            "exact": true
          },
          {
            "name": "last",
            "type": "string",
            "value": "3",
            "exact": true
          },
          {
            "name": "size",
            "type": "int",
            "value": 5,
            "exact": true
          }
        ]
      },
      "explanation": "Hyphens count as characters; -1 selects the last character.",
      "hint": ""
    },
    {
      "id": 3,
      "difficulty": "Easy",
      "category": "operators",
      "title": "Repeat a Marker",
      "given": "marker = \"ab\"\ncount = 3",
      "outputs": [
        "repeated",
        "size"
      ],
      "starterCode": "",
      "prompt": "<strong>[Easy] Repeat a Marker</strong><p>Given:</p><pre><code>marker = &quot;ab&quot;\ncount = 3</code></pre><p>Repeat marker count times in <code>repeated</code>; store the character count of repeated in <code>size</code>.</p>",
      "ref": "marker = \"ab\"\ncount = 3\n\nrepeated = marker * count\nsize = len(repeated)\nprint(repeated, size)\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "repeated",
            "type": "string",
            "value": "ababab",
            "exact": true
          },
          {
            "name": "size",
            "type": "int",
            "value": 6,
            "exact": true
          }
        ]
      },
      "explanation": "Repetition duplicates the full two-character marker three times.",
      "hint": ""
    },
    {
      "id": 4,
      "difficulty": "Easy",
      "category": "slicing",
      "title": "Slice a Date",
      "given": "date_text = \"2026-10-06\"",
      "outputs": [
        "year",
        "month",
        "day_text"
      ],
      "starterCode": "",
      "prompt": "<strong>[Easy] Slice a Date</strong><p>Given:</p><pre><code>date_text = &quot;2026-10-06&quot;</code></pre><p>Store the first four characters in <code>year</code>, characters at indexes 5 and 6 in <code>month</code>, and the last two characters in <code>day_text</code>.</p>",
      "ref": "date_text = \"2026-10-06\"\n\nyear = date_text[:4]\nmonth = date_text[5:7]\nday_text = date_text[-2:]\nprint(year, month, day_text)\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "year",
            "type": "string",
            "value": "2026",
            "exact": true
          },
          {
            "name": "month",
            "type": "string",
            "value": "10",
            "exact": true
          },
          {
            "name": "day_text",
            "type": "string",
            "value": "06",
            "exact": true
          }
        ]
      },
      "explanation": "Slicing preserves leading zeros because the result remains text.",
      "hint": ""
    },
    {
      "id": 5,
      "difficulty": "Easy",
      "category": "slicing",
      "title": "A Stepped Slice",
      "given": "text = \"0123456789\"",
      "outputs": [
        "odd_positions",
        "backwards"
      ],
      "starterCode": "",
      "prompt": "<strong>[Easy] A Stepped Slice</strong><p>Given:</p><pre><code>text = &quot;0123456789&quot;</code></pre><p>Store characters at indexes 1, 3, 5, 7 in <code>odd_positions</code> and the full reverse in <code>backwards</code>.</p>",
      "ref": "text = \"0123456789\"\n\nodd_positions = text[1:9:2]\nbackwards = text[::-1]\nprint(odd_positions, backwards)\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "odd_positions",
            "type": "string",
            "value": "1357",
            "exact": true
          },
          {
            "name": "backwards",
            "type": "string",
            "value": "9876543210",
            "exact": true
          }
        ]
      },
      "explanation": "The stop at 9 excludes index 9; a negative step reverses the sequence.",
      "hint": ""
    },
    {
      "id": 6,
      "difficulty": "Easy",
      "category": "case",
      "title": "Normalize a Name",
      "given": "name = \"aDA lOVELACE\"",
      "outputs": [
        "display",
        "key"
      ],
      "starterCode": "",
      "prompt": "<strong>[Easy] Normalize a Name</strong><p>Given:</p><pre><code>name = &quot;aDA lOVELACE&quot;</code></pre><p>Store its title-cased form in <code>display</code> and lowercase form in <code>key</code>.</p>",
      "ref": "name = \"aDA lOVELACE\"\n\ndisplay = name.title()\nkey = name.lower()\nprint(display, key)\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "display",
            "type": "string",
            "value": "Ada Lovelace",
            "exact": true
          },
          {
            "name": "key",
            "type": "string",
            "value": "ada lovelace",
            "exact": true
          }
        ]
      },
      "explanation": "For these space-separated words, title() uppercases each first letter and lowercases the rest. It uses character-based boundaries, so punctuation and real names can need different handling.",
      "hint": ""
    },
    {
      "id": 7,
      "difficulty": "Easy",
      "category": "whitespace",
      "title": "Preserve Internal Spaces",
      "given": "raw = \"  data  team  \"",
      "outputs": [
        "clean",
        "size"
      ],
      "starterCode": "",
      "prompt": "<strong>[Easy] Preserve Internal Spaces</strong><p>Given:</p><pre><code>raw = &quot;  data  team  &quot;</code></pre><p>Strip only boundary whitespace into <code>clean</code>; store its length in <code>size</code>. Preserve the two internal spaces.</p>",
      "ref": "raw = \"  data  team  \"\n\nclean = raw.strip()\nsize = len(clean)\nprint(clean, size)\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "clean",
            "type": "string",
            "value": "data  team",
            "exact": true
          },
          {
            "name": "size",
            "type": "int",
            "value": 10,
            "exact": true
          }
        ]
      },
      "explanation": "strip preserves both internal spaces.",
      "hint": ""
    },
    {
      "id": 8,
      "difficulty": "Easy",
      "category": "escapes",
      "title": "A Two-Line Message",
      "given": "first_line = \"Hello\"\nsecond_line = \"Python\"",
      "outputs": [
        "message",
        "newline_count"
      ],
      "starterCode": "",
      "prompt": "<strong>[Easy] A Two-Line Message</strong><p>Given:</p><pre><code>first_line = &quot;Hello&quot;\nsecond_line = &quot;Python&quot;</code></pre><p>Join the lines with one newline in <code>message</code>, and count newline characters in <code>newline_count</code>.</p>",
      "ref": "first_line = \"Hello\"\nsecond_line = \"Python\"\n\nmessage = first_line + \"\\n\" + second_line\nnewline_count = message.count(\"\\n\")\nprint(message, newline_count)\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "message",
            "type": "string",
            "value": "Hello\nPython",
            "exact": true
          },
          {
            "name": "newline_count",
            "type": "int",
            "value": 1,
            "exact": true
          }
        ]
      },
      "explanation": "\\n represents one line-break character.",
      "hint": ""
    },
    {
      "id": 9,
      "difficulty": "Medium",
      "category": "operators",
      "title": "Case-Sensitive Membership",
      "given": "text = \"Data Science\"",
      "outputs": [
        "has_exact",
        "has_lower",
        "missing_sql"
      ],
      "starterCode": "",
      "prompt": "<strong>[Medium] Case-Sensitive Membership</strong><p>Given:</p><pre><code>text = &quot;Data Science&quot;</code></pre><p>Test membership of <code>&quot;Data&quot;</code> in <code>has_exact</code>, membership of <code>&quot;data&quot;</code> in <code>has_lower</code>, and absence of <code>&quot;SQL&quot;</code> in <code>missing_sql</code>.</p>",
      "ref": "text = \"Data Science\"\n\nhas_exact = \"Data\" in text\nhas_lower = \"data\" in text\nmissing_sql = \"SQL\" not in text\nprint(has_exact, has_lower, missing_sql)\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "has_exact",
            "type": "bool",
            "value": true,
            "exact": true
          },
          {
            "name": "has_lower",
            "type": "bool",
            "value": false,
            "exact": true
          },
          {
            "name": "missing_sql",
            "type": "bool",
            "value": true,
            "exact": true
          }
        ]
      },
      "explanation": "Membership is case-sensitive; not in negates the test.",
      "hint": ""
    },
    {
      "id": 10,
      "difficulty": "Medium",
      "category": "search",
      "title": "Search at Index Zero",
      "given": "text = \"start middle end\"",
      "outputs": [
        "start_index",
        "missing_index",
        "has_start"
      ],
      "starterCode": "",
      "prompt": "<strong>[Medium] Search at Index Zero</strong><p>Given:</p><pre><code>text = &quot;start middle end&quot;</code></pre><p>Store the find result for <code>&quot;start&quot;</code> in <code>start_index</code>, for <code>&quot;missing&quot;</code> in <code>missing_index</code>, and membership of <code>&quot;start&quot;</code> in <code>has_start</code>.</p>",
      "ref": "text = \"start middle end\"\n\nstart_index = text.find(\"start\")\nmissing_index = text.find(\"missing\")\nhas_start = \"start\" in text\nprint(start_index, missing_index, has_start)\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "start_index",
            "type": "int",
            "value": 0,
            "exact": true
          },
          {
            "name": "missing_index",
            "type": "int",
            "value": -1,
            "exact": true
          },
          {
            "name": "has_start",
            "type": "bool",
            "value": true,
            "exact": true
          }
        ]
      },
      "explanation": "A match at zero is present. find(...) &gt; 0 would miss it.",
      "hint": ""
    },
    {
      "id": 11,
      "difficulty": "Medium",
      "category": "search",
      "title": "Non-Overlapping Counts",
      "given": "text = \"aaaaa\"",
      "outputs": [
        "pair_count",
        "letter_count"
      ],
      "starterCode": "",
      "prompt": "<strong>[Medium] Non-Overlapping Counts</strong><p>Given:</p><pre><code>text = &quot;aaaaa&quot;</code></pre><p>Count non-overlapping occurrences of <code>&quot;aa&quot;</code> in <code>pair_count</code> and occurrences of <code>&quot;a&quot;</code> in <code>letter_count</code>.</p>",
      "ref": "text = \"aaaaa\"\n\npair_count = text.count(\"aa\")\nletter_count = text.count(\"a\")\nprint(pair_count, letter_count)\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "pair_count",
            "type": "int",
            "value": 2,
            "exact": true
          },
          {
            "name": "letter_count",
            "type": "int",
            "value": 5,
            "exact": true
          }
        ]
      },
      "explanation": "count does not reuse a character in overlapping pairs.",
      "hint": ""
    },
    {
      "id": 12,
      "difficulty": "Medium",
      "category": "replace",
      "title": "A Limited Replacement",
      "given": "text = \"cat cat cat\"",
      "outputs": [
        "changed",
        "original"
      ],
      "starterCode": "",
      "prompt": "<strong>[Medium] A Limited Replacement</strong><p>Given:</p><pre><code>text = &quot;cat cat cat&quot;</code></pre><p>Replace the first TWO occurrences of <code>&quot;cat&quot;</code> with <code>&quot;dog&quot;</code> in <code>changed</code>, and retain text in <code>original</code>.</p>",
      "ref": "text = \"cat cat cat\"\n\nchanged = text.replace(\"cat\", \"dog\", 2)\noriginal = text\nprint(changed, original)\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "changed",
            "type": "string",
            "value": "dog dog cat",
            "exact": true
          },
          {
            "name": "original",
            "type": "string",
            "value": "cat cat cat",
            "exact": true
          }
        ]
      },
      "explanation": "The limit controls replacements; the source is immutable.",
      "hint": ""
    },
    {
      "id": 13,
      "difficulty": "Medium",
      "category": "boundaries",
      "title": "File Boundary Checks",
      "given": "filename = \"report.CSV\"",
      "outputs": [
        "right_prefix",
        "exact_suffix",
        "normalized_suffix"
      ],
      "starterCode": "",
      "prompt": "<strong>[Medium] File Boundary Checks</strong><p>Given:</p><pre><code>filename = &quot;report.CSV&quot;</code></pre><p>Store startswith(&quot;report&quot;) in <code>right_prefix</code>, endswith(&quot;.csv&quot;) on filename in <code>exact_suffix</code>, and endswith(&quot;.csv&quot;) on its lowercase form in <code>normalized_suffix</code>.</p>",
      "ref": "filename = \"report.CSV\"\n\nright_prefix = filename.startswith(\"report\")\nexact_suffix = filename.endswith(\".csv\")\nnormalized_suffix = filename.lower().endswith(\".csv\")\nprint(right_prefix, exact_suffix, normalized_suffix)\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "right_prefix",
            "type": "bool",
            "value": true,
            "exact": true
          },
          {
            "name": "exact_suffix",
            "type": "bool",
            "value": false,
            "exact": true
          },
          {
            "name": "normalized_suffix",
            "type": "bool",
            "value": true,
            "exact": true
          }
        ]
      },
      "explanation": "Boundary methods compare case-sensitively unless you normalize first.",
      "hint": ""
    },
    {
      "id": 14,
      "difficulty": "Medium",
      "category": "split-join",
      "title": "Empty Fields Matter",
      "given": "raw = \"a,,b,\"",
      "outputs": [
        "fields",
        "joined",
        "field_count"
      ],
      "starterCode": "",
      "prompt": "<strong>[Medium] Empty Fields Matter</strong><p>Given:</p><pre><code>raw = &quot;a,,b,&quot;</code></pre><p>Split on commas into <code>fields</code>, preserving empty fields. Join fields with <code>&quot;|&quot;</code> into <code>joined</code>, and store their count in <code>field_count</code>.</p>",
      "ref": "raw = \"a,,b,\"\n\nfields = raw.split(\",\")\njoined = \"|\".join(fields)\nfield_count = len(fields)\nprint(fields, joined, field_count)\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "fields",
            "type": "list",
            "value": [
              "a",
              "",
              "b",
              ""
            ],
            "exact": true
          },
          {
            "name": "joined",
            "type": "string",
            "value": "a||b|",
            "exact": true
          },
          {
            "name": "field_count",
            "type": "int",
            "value": 4,
            "exact": true
          }
        ]
      },
      "explanation": "Explicit separators keep empty fields, including one after a trailing separator.",
      "hint": ""
    },
    {
      "id": 15,
      "difficulty": "Medium",
      "category": "split-join",
      "title": "Normalize Mixed Whitespace",
      "given": "raw = \"  red\\tgreen\\nblue  \"",
      "outputs": [
        "words",
        "joined",
        "word_count"
      ],
      "starterCode": "",
      "prompt": "<strong>[Medium] Normalize Mixed Whitespace</strong><p>Given:</p><pre><code>raw = &quot;  red\\tgreen\\nblue  &quot;</code></pre><p>Split on whitespace into <code>words</code>, join with <code>&quot;/&quot;</code> into <code>joined</code>, and store the word count in <code>word_count</code>.</p>",
      "ref": "raw = \"  red\\tgreen\\nblue  \"\n\nwords = raw.split()\njoined = \"/\".join(words)\nword_count = len(words)\nprint(words, joined, word_count)\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "words",
            "type": "list",
            "value": [
              "red",
              "green",
              "blue"
            ],
            "exact": true
          },
          {
            "name": "joined",
            "type": "string",
            "value": "red/green/blue",
            "exact": true
          },
          {
            "name": "word_count",
            "type": "int",
            "value": 3,
            "exact": true
          }
        ]
      },
      "explanation": "split() collapses runs of tabs, newlines and spaces.",
      "hint": ""
    },
    {
      "id": 16,
      "difficulty": "Medium",
      "category": "formatting",
      "title": "A Receipt Line",
      "given": "item = \"Pen\"\nprice = 12.5\nqty = 3",
      "outputs": [
        "receipt"
      ],
      "starterCode": "",
      "prompt": "<strong>[Medium] A Receipt Line</strong><p>Given:</p><pre><code>item = &quot;Pen&quot;\nprice = 12.5\nqty = 3</code></pre><p>Build <code>receipt</code> as <code>&quot;Pen x3 = 37.50&quot;</code> using the inputs and two decimal places for price times qty.</p>",
      "ref": "item = \"Pen\"\nprice = 12.5\nqty = 3\n\nreceipt = f\"{item} x{qty} = {price * qty:.2f}\"\nprint(receipt)\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "receipt",
            "type": "string",
            "value": "Pen x3 = 37.50",
            "exact": true
          }
        ]
      },
      "explanation": "Arithmetic runs before formatting; .2f supplies the trailing zero.",
      "hint": ""
    },
    {
      "id": 17,
      "difficulty": "Medium",
      "category": "formatting",
      "title": "A Fixed-Width Code",
      "given": "number = 73\nwidth = 5",
      "outputs": [
        "code",
        "size"
      ],
      "starterCode": "",
      "prompt": "<strong>[Medium] A Fixed-Width Code</strong><p>Given:</p><pre><code>number = 73\nwidth = 5</code></pre><p>Convert number to text and pad with leading zeros to width characters in <code>code</code>. Store its length in <code>size</code>.</p>",
      "ref": "number = 73\nwidth = 5\n\ncode = str(number).zfill(width)\nsize = len(code)\nprint(code, size)\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "code",
            "type": "string",
            "value": "00073",
            "exact": true
          },
          {
            "name": "size",
            "type": "int",
            "value": 5,
            "exact": true
          }
        ]
      },
      "explanation": "zfill pads text on the left to a minimum width.",
      "hint": ""
    },
    {
      "id": 18,
      "difficulty": "Medium",
      "category": "validation",
      "title": "Text Predicates",
      "given": "letters = \"Data\"\nalphanumeric = \"Data03\"\namount = \"3.5\"\nempty = \"\"",
      "outputs": [
        "letters_ok",
        "code_ok",
        "digits_ok",
        "empty_ok"
      ],
      "starterCode": "",
      "prompt": "<strong>[Medium] Text Predicates</strong><p>Given:</p><pre><code>letters = &quot;Data&quot;\nalphanumeric = &quot;Data03&quot;\namount = &quot;3.5&quot;\nempty = &quot;&quot;</code></pre><p>Store letters.isalpha() in <code>letters_ok</code>, alphanumeric.isalnum() in <code>code_ok</code>, amount.isdigit() in <code>digits_ok</code>, and empty.isalnum() in <code>empty_ok</code>.</p>",
      "ref": "letters = \"Data\"\nalphanumeric = \"Data03\"\namount = \"3.5\"\nempty = \"\"\n\nletters_ok = letters.isalpha()\ncode_ok = alphanumeric.isalnum()\ndigits_ok = amount.isdigit()\nempty_ok = empty.isalnum()\nprint(letters_ok, code_ok, digits_ok, empty_ok)\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "letters_ok",
            "type": "bool",
            "value": true,
            "exact": true
          },
          {
            "name": "code_ok",
            "type": "bool",
            "value": true,
            "exact": true
          },
          {
            "name": "digits_ok",
            "type": "bool",
            "value": false,
            "exact": true
          },
          {
            "name": "empty_ok",
            "type": "bool",
            "value": false,
            "exact": true
          }
        ]
      },
      "explanation": "These predicates need at least one qualifying character. A dot prevents isdigit from succeeding.",
      "hint": ""
    },
    {
      "id": 19,
      "difficulty": "Hard",
      "category": "immutability",
      "title": "Rebuild a Word",
      "given": "word = \"cat\"\nreplacement = \"b\"",
      "outputs": [
        "updated",
        "original"
      ],
      "starterCode": "",
      "prompt": "<strong>[Hard] Rebuild a Word</strong><p>Given:</p><pre><code>word = &quot;cat&quot;\nreplacement = &quot;b&quot;</code></pre><p>Build <code>updated</code> by replacing only the first character with replacement using concatenation and a slice. Store word in <code>original</code>.</p>",
      "ref": "word = \"cat\"\nreplacement = \"b\"\n\nupdated = replacement + word[1:]\noriginal = word\nprint(updated, original)\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "updated",
            "type": "string",
            "value": "bat",
            "exact": true
          },
          {
            "name": "original",
            "type": "string",
            "value": "cat",
            "exact": true
          }
        ]
      },
      "explanation": "Build a new string without attempting forbidden item assignment.",
      "hint": ""
    },
    {
      "id": 20,
      "difficulty": "Hard",
      "category": "comparison",
      "title": "Compare Normalized Names",
      "given": "left = \" Alice \"\nright = \"ALICE\"",
      "outputs": [
        "same_raw",
        "same_clean"
      ],
      "starterCode": "",
      "prompt": "<strong>[Hard] Compare Normalized Names</strong><p>Given:</p><pre><code>left = &quot; Alice &quot;\nright = &quot;ALICE&quot;</code></pre><p>Store direct equality in <code>same_raw</code>. Strip and lowercase both values, then store their equality in <code>same_clean</code>.</p>",
      "ref": "left = \" Alice \"\nright = \"ALICE\"\n\nsame_raw = left == right\nsame_clean = left.strip().lower() == right.strip().lower()\nprint(same_raw, same_clean)\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "same_raw",
            "type": "bool",
            "value": false,
            "exact": true
          },
          {
            "name": "same_clean",
            "type": "bool",
            "value": true,
            "exact": true
          }
        ]
      },
      "explanation": "Exact equality includes case and spaces.",
      "hint": ""
    },
    {
      "id": 21,
      "difficulty": "Hard",
      "category": "masking",
      "title": "Keep a Suffix Visible",
      "given": "token = \"TRAIN-2048\"\nvisible = 4",
      "outputs": [
        "suffix",
        "masked"
      ],
      "starterCode": "",
      "prompt": "<strong>[Hard] Keep a Suffix Visible</strong><p>Given:</p><pre><code>token = &quot;TRAIN-2048&quot;\nvisible = 4</code></pre><p>Store the final visible characters in <code>suffix</code>, and replace every earlier character with an asterisk in <code>masked</code>.</p>",
      "ref": "token = \"TRAIN-2048\"\nvisible = 4\n\nsuffix = token[-visible:]\nmasked = \"*\" * (len(token) - visible) + suffix\nprint(suffix, masked)\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "suffix",
            "type": "string",
            "value": "2048",
            "exact": true
          },
          {
            "name": "masked",
            "type": "string",
            "value": "******2048",
            "exact": true
          }
        ]
      },
      "explanation": "Parentheses compute the hidden width before repetition.",
      "hint": ""
    },
    {
      "id": 22,
      "difficulty": "Hard",
      "category": "comparison",
      "title": "A Non-Palindrome",
      "given": "raw = \" Python \"",
      "outputs": [
        "clean",
        "backwards",
        "is_palindrome"
      ],
      "starterCode": "",
      "prompt": "<strong>[Hard] A Non-Palindrome</strong><p>Given:</p><pre><code>raw = &quot; Python &quot;</code></pre><p>Strip and lowercase raw in <code>clean</code>, reverse clean in <code>backwards</code>, and compare those results in <code>is_palindrome</code>.</p>",
      "ref": "raw = \" Python \"\n\nclean = raw.strip().lower()\nbackwards = clean[::-1]\nis_palindrome = clean == backwards\nprint(clean, backwards, is_palindrome)\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "clean",
            "type": "string",
            "value": "python",
            "exact": true
          },
          {
            "name": "backwards",
            "type": "string",
            "value": "nohtyp",
            "exact": true
          },
          {
            "name": "is_palindrome",
            "type": "bool",
            "value": false,
            "exact": true
          }
        ]
      },
      "explanation": "The normalized sequences must be equal to form a palindrome.",
      "hint": ""
    },
    {
      "id": 23,
      "difficulty": "Hard",
      "category": "validation",
      "title": "A Rejected Label",
      "given": "raw = \" A_3 \"\nminimum = 2\nmaximum = 5",
      "outputs": [
        "clean",
        "length_ok",
        "valid"
      ],
      "starterCode": "",
      "prompt": "<strong>[Hard] A Rejected Label</strong><p>Given:</p><pre><code>raw = &quot; A_3 &quot;\nminimum = 2\nmaximum = 5</code></pre><p>Strip raw in <code>clean</code>. Store whether its length is within the inclusive bounds in <code>length_ok</code>; store whether BOTH that condition and isalnum hold in <code>valid</code>.</p>",
      "ref": "raw = \" A_3 \"\nminimum = 2\nmaximum = 5\n\nclean = raw.strip()\nlength_ok = minimum <= len(clean) <= maximum\nvalid = length_ok and clean.isalnum()\nprint(clean, length_ok, valid)\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "clean",
            "type": "string",
            "value": "A_3",
            "exact": true
          },
          {
            "name": "length_ok",
            "type": "bool",
            "value": true,
            "exact": true
          },
          {
            "name": "valid",
            "type": "bool",
            "value": false,
            "exact": true
          }
        ]
      },
      "explanation": "Underscore is not an alphanumeric character.",
      "hint": ""
    },
    {
      "id": 24,
      "difficulty": "Hard",
      "category": "split-join",
      "title": "Extract a Fixed Pair",
      "given": "record = \"topic=Strings\"",
      "outputs": [
        "fields",
        "key",
        "value",
        "label"
      ],
      "starterCode": "",
      "prompt": "<strong>[Hard] Extract a Fixed Pair</strong><p>Given:</p><pre><code>record = &quot;topic=Strings&quot;</code></pre><p>Split on <code>&quot;=&quot;</code> into <code>fields</code>; lowercase the first field into <code>key</code> and uppercase the second into <code>value</code>. Build <code>label</code> as <code>&quot;topic: STRINGS&quot;</code>. This record has exactly one equals sign.</p>",
      "ref": "record = \"topic=Strings\"\n\nfields = record.split(\"=\")\nkey = fields[0].lower()\nvalue = fields[1].upper()\nlabel = key + \": \" + value\nprint(fields, key, value, label)\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "fields",
            "type": "list",
            "value": [
              "topic",
              "Strings"
            ],
            "exact": true
          },
          {
            "name": "key",
            "type": "string",
            "value": "topic",
            "exact": true
          },
          {
            "name": "value",
            "type": "string",
            "value": "STRINGS",
            "exact": true
          },
          {
            "name": "label",
            "type": "string",
            "value": "topic: STRINGS",
            "exact": true
          }
        ]
      },
      "explanation": "Select the known positions from the supplied two-field record.",
      "hint": ""
    },
    {
      "id": 25,
      "difficulty": "Hard",
      "category": "pipeline",
      "title": "Build a Training Path",
      "given": "raw = \"  Learn   Python Strings  \"\nroot = \"courses\"",
      "outputs": [
        "words",
        "clean_title",
        "path",
        "word_count"
      ],
      "starterCode": "",
      "prompt": "<strong>[Hard] Build a Training Path</strong><p>Given:</p><pre><code>raw = &quot;  Learn   Python Strings  &quot;\nroot = &quot;courses&quot;</code></pre><p>Split raw on whitespace into <code>words</code>, join with one space into <code>clean_title</code>, and build <code>path</code> from root, <code>&quot;/&quot;</code>, and the lowercase title with spaces replaced by hyphens. Store the word count in <code>word_count</code>.</p>",
      "ref": "raw = \"  Learn   Python Strings  \"\nroot = \"courses\"\n\nwords = raw.split()\nclean_title = \" \".join(words)\npath = root + \"/\" + clean_title.lower().replace(\" \", \"-\")\nword_count = len(words)\nprint(words, clean_title, path, word_count)\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "words",
            "type": "list",
            "value": [
              "Learn",
              "Python",
              "Strings"
            ],
            "exact": true
          },
          {
            "name": "clean_title",
            "type": "string",
            "value": "Learn Python Strings",
            "exact": true
          },
          {
            "name": "path",
            "type": "string",
            "value": "courses/learn-python-strings",
            "exact": true
          },
          {
            "name": "word_count",
            "type": "int",
            "value": 3,
            "exact": true
          }
        ]
      },
      "explanation": "Combine split, join, case conversion and replacement without loops.",
      "hint": ""
    }
  ]
};
