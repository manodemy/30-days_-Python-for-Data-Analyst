// Python Course Content — Day 22 (Matplotlib Fundamentals & Visual Encodings)
if (!window.COURSE_CONTENT) window.COURSE_CONTENT = {};
window.COURSE_CONTENT['pyDay26'] = {
  "day": 26,
  "title": "Data Viz with Matplotlib",
  "topics": [
    "Figure vs Axes Architecture",
    "Line Plots & Temporal Trends",
    "Bar Charts & Grouped Bars",
    "Scatter Plots & Colormaps",
    "Histograms & Box Plots",
    "Subplot Grids (plt.subplots)",
    "Titles, Labels & Spines",
    "Annotations & Arrows",
    "Styles, Themes & Exporting",
    "Review & Interview Questions"
],
  "slides": [
    {
      "title": "Matplotlib Fundamentals & Visual Encodings",
      "html": "<style>\n  /* ════════════════════════════════════════════════════════════════\n     BASE & DARK THEME (DEFAULT)\n     ════════════════════════════════════════════════════════════════ */\n\n  /* ── Flagship Dual-Box Heading Architecture (SQL Day 01 Parity) ── */\n  .heading-box-wrap,\n  .slide-section-title.heading-box-wrap {\n    display: flex !important;\n    align-items: stretch !important;\n    gap: 0 !important;\n    background: transparent !important;\n    border: none !important;\n    padding: 0 !important;\n    margin: 24px 0 14px 0 !important;\n    filter: drop-shadow(0 4px 14px rgba(0, 0, 0, 0.35)) !important;\n  }\n  .slide-section:first-child .heading-box-wrap,\n  #day01WhyPythonSection .heading-box-wrap {\n    margin-top: 4px !important;\n  }\n\n  /* Left Box: Monospace Number Badge */\n  .heading-num-box {\n    display: inline-flex !important;\n    align-items: center !important;\n    justify-content: center !important;\n    background: linear-gradient(135deg, #6366f1, #8b5cf6) !important;\n    color: #ffffff !important;\n    font-family: 'JetBrains Mono', var(--mono, monospace) !important;\n    font-size: 0.88rem !important;\n    font-weight: 800 !important;\n    letter-spacing: 0.05em !important;\n    padding: 8px 14px !important;\n    border-radius: 8px 0 0 8px !important;\n    border: 1px solid rgba(139, 92, 246, 0.6) !important;\n    border-right: none !important;\n    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.25) !important;\n    flex-shrink: 0 !important;\n    min-width: 44px !important;\n    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3) !important;\n  }\n\n  /* Right Box: Matte Title Box */\n  .heading-title-box {\n    display: flex !important;\n    align-items: center !important;\n    justify-content: space-between !important;\n    flex: 1 !important;\n    background: #0f172a !important;\n    border: 1px solid rgba(255, 255, 255, 0.08) !important;\n    border-left: 1px solid rgba(139, 92, 246, 0.4) !important;\n    border-radius: 0 8px 8px 0 !important;\n    padding: 8px 16px !important;\n    color: #f8fafc !important;\n    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05) !important;\n  }\n\n  .heading-title-text {\n    flex: 1 !important;\n    color: #f8fafc !important;\n    font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif !important;\n    font-size: 1.05rem !important;\n    font-weight: 800 !important;\n    letter-spacing: -0.015em !important;\n    line-height: 1.35 !important;\n    display: flex !important;\n    align-items: center !important;\n    gap: 10px !important;\n  }\n\n  .heading-icon {\n    font-size: 1.15rem !important;\n    display: inline-flex !important;\n    align-items: center !important;\n    line-height: 1 !important;\n  }\n\n  /* Audio Play Button in Heading */\n  .heading-title-box .audio-play-btn,\n  .heading-with-audio .audio-play-btn {\n    width: 26px !important;\n    height: 26px !important;\n    min-width: 26px !important;\n    min-height: 26px !important;\n    max-width: 26px !important;\n    max-height: 26px !important;\n    border-radius: 6px !important;\n    border: 1px solid rgba(255, 255, 255, 0.14) !important;\n    background: rgba(255, 255, 255, 0.08) !important;\n    color: #94a3b8 !important;\n    cursor: pointer !important;\n    display: inline-flex !important;\n    align-items: center !important;\n    justify-content: center !important;\n    padding: 0 !important;\n    margin: 0 !important;\n    flex-shrink: 0 !important;\n    transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease, transform 0.15s ease !important;\n  }\n\n  .heading-title-box .audio-play-btn:hover,\n  .heading-with-audio .audio-play-btn:hover {\n    background: #ef4444 !important;\n    border-color: #ef4444 !important;\n    color: #ffffff !important;\n    box-shadow: 0 0 10px rgba(239, 68, 68, 0.45) !important;\n    transform: scale(1.05) !important;\n  }\n\n  .heading-title-box .audio-play-btn.playing,\n  .heading-with-audio .audio-play-btn.playing {\n    background: #ef4444 !important;\n    border-color: #ef4444 !important;\n    color: #ffffff !important;\n    box-shadow: 0 0 12px rgba(239, 68, 68, 0.5) !important;\n  }\n\n  .slide-section h1,\n  .slide-section h2,\n  .slide-section h3,\n  .slide-section h4 {\n    font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif !important;\n    color: #f8fafc !important;\n    letter-spacing: -0.015em !important;\n  }\n\n  .topic-subcard {\n    background: linear-gradient(145deg, rgba(15, 23, 42, 0.96) 0%, rgba(10, 16, 31, 0.98) 100%);\n    border: 1px solid rgba(255, 255, 255, 0.08);\n    border-radius: 12px;\n    padding: 16px 18px;\n    margin: 14px 0;\n    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.05);\n  }\n  .table-header-wrap {\n    margin-bottom: 12px;\n    padding-bottom: 8px;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.08);\n  }\n  .table-header-title {\n    margin: 0;\n    font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;\n    font-size: 0.96rem;\n    font-weight: 800;\n    color: #38bdf8;\n    letter-spacing: -0.01em;\n  }\n  .section-intro-text {\n    font-size: 0.88rem;\n    line-height: 1.6;\n    color: #cbd5e1;\n    margin: 0 0 12px 0;\n  }\n\n  /* 2D Frozen Sticky Tables */\n  .db-mock-table-wrap {\n    width: 100%;\n    overflow-x: auto;\n    margin: 10px 0;\n    border-radius: 8px;\n    border: 1px solid rgba(255, 255, 255, 0.08);\n  }\n  .db-table-mock {\n    width: 100%;\n    border-collapse: collapse;\n    font-size: 0.82rem;\n    text-align: left;\n    background: #090e17;\n  }\n  .db-table-mock th {\n    background: #0f172a;\n    color: #94a3b8;\n    font-weight: 700;\n    text-transform: uppercase;\n    font-size: 0.70rem;\n    letter-spacing: 0.05em;\n    padding: 10px 14px;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.12);\n  }\n  .db-table-mock td {\n    padding: 9px 14px;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.05);\n    color: #e2e8f0;\n    line-height: 1.45;\n  }\n  .db-table-mock tbody tr:hover {\n    background: rgba(255, 255, 255, 0.03);\n  }\n  .arith-sticky-table th:first-child,\n  .arith-sticky-table td:first-child {\n    position: sticky !important;\n    left: 0 !important;\n    z-index: 2 !important;\n    background: #0d1527 !important;\n    font-weight: 700;\n    box-shadow: 2px 0 6px rgba(0, 0, 0, 0.4);\n  }\n  .arith-sticky-table th:first-child {\n    background: #111a30 !important;\n    z-index: 3 !important;\n  }\n\n  /* macOS IDE Traffic Light Code Subcards */\n  .mental-model-card {\n    background: rgba(0, 0, 0, 0.45);\n    border: 1px solid rgba(255, 255, 255, 0.08);\n    border-radius: 10px;\n    overflow: hidden;\n    margin: 12px 0;\n    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);\n  }\n  .code-subblock-traffic-lights {\n    display: flex;\n    align-items: center;\n    gap: 6px;\n    padding: 8px 12px;\n    background: rgba(255, 255, 255, 0.04);\n    border-bottom: 1px solid rgba(255, 255, 255, 0.08);\n  }\n  .traffic-light-dot {\n    width: 10px;\n    height: 10px;\n    border-radius: 50%;\n    display: inline-block;\n  }\n  .traffic-light-dot.red { background: #ef4444; }\n  .traffic-light-dot.yellow { background: #f59e0b; }\n  .traffic-light-dot.green { background: #10b981; }\n  .code-subblock-title {\n    margin-left: 8px;\n    font-family: 'JetBrains Mono', monospace;\n    font-size: 0.74rem;\n    font-weight: 600;\n    color: #94a3b8;\n  }\n\n  .py-code-box {\n    margin: 0;\n    padding: 12px 14px;\n    font-size: 0.78rem;\n    color: #f8fafc;\n    font-family: 'JetBrains Mono', monospace;\n    line-height: 1.6;\n    overflow-x: auto;\n  }\n  .py-code-box pre {\n    margin: 0;\n    font-family: inherit;\n  }\n  .code-keyword { color: #f43f5e; font-weight: 700; }\n  .code-builtin { color: #38bdf8; font-weight: 600; }\n  .code-string { color: #34d399; }\n  .code-number { color: #fbbf24; }\n  .code-comment { color: #64748b; font-style: italic; }\n  .code-title { color: #a78bfa; font-weight: 700; }\n\n  /* Anti-Pattern Table */\n  .anti-pattern-table .ap-code-bad {\n    color: #f43f5e;\n    font-family: 'JetBrains Mono', monospace;\n    font-weight: 700;\n    background: rgba(244, 63, 94, 0.1);\n    padding: 2px 6px;\n    border-radius: 4px;\n    border: 1px solid rgba(244, 63, 94, 0.25);\n  }\n  .anti-pattern-table .ap-result-bad {\n    color: #fb7185;\n    font-weight: 600;\n  }\n  .anti-pattern-table .ap-code-fix {\n    color: #34d399;\n    font-family: 'JetBrains Mono', monospace;\n    font-weight: 700;\n    background: rgba(52, 211, 153, 0.1);\n    padding: 2px 6px;\n    border-radius: 4px;\n    border: 1px solid rgba(52, 211, 153, 0.25);\n  }\n\n  /* FAANG Interview Spotlight */\n  .interview-box {\n    margin-top: 10px;\n  }\n  .interview-item {\n    padding: 10px 0;\n  }\n  .interview-question {\n    font-size: 0.85rem;\n    color: #f8fafc;\n    margin: 0 0 6px 0;\n    line-height: 1.45;\n  }\n  .interview-question strong {\n    color: #38bdf8;\n  }\n  .interview-answer {\n    font-size: 0.80rem;\n    color: #cbd5e1;\n    line-height: 1.55;\n  }\n  .interview-answer em {\n    font-style: normal;\n    color: #94a3b8;\n  }\n  .interview-divider {\n    border: none;\n    border-top: 1px solid rgba(255, 255, 255, 0.06);\n    margin: 8px 0;\n  }\n\n  /* ════════════════════════════════════════════════════════════════\n     LIGHT MODE THEME ADAPTATIONS ([data-theme=\"light\"])\n     ════════════════════════════════════════════════════════════════ */\n  [data-theme=\"light\"] .heading-box-wrap,\n  [data-theme=\"light\"] .slide-section-title.heading-box-wrap {\n    filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.16)) !important;\n  }\n  [data-theme=\"light\"] .heading-num-box {\n    background: linear-gradient(135deg, #6366f1, #8b5cf6) !important;\n    color: #ffffff !important;\n    border: 1px solid rgba(139, 92, 246, 0.6) !important;\n    border-right: none !important;\n    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.25) !important;\n    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3) !important;\n  }\n  [data-theme=\"light\"] .heading-title-box {\n    background: #0f172a !important;\n    border: 1px solid rgba(255, 255, 255, 0.08) !important;\n    border-left: 1px solid rgba(139, 92, 246, 0.4) !important;\n    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 3px 10px rgba(0, 0, 0, 0.12) !important;\n  }\n  [data-theme=\"light\"] .heading-title-text {\n    color: #f8fafc !important;\n  }\n  [data-theme=\"light\"] .topic-subcard {\n    background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);\n    border: 1px solid #e2e8f0;\n    box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.05), inset 0 1px 0 #ffffff;\n  }\n  [data-theme=\"light\"] .table-header-wrap {\n    border-bottom: 1.5px solid #e2e8f0;\n  }\n  [data-theme=\"light\"] .table-header-title {\n    color: #0284c7;\n  }\n  [data-theme=\"light\"] .section-intro-text {\n    color: #334155;\n  }\n  [data-theme=\"light\"] .db-mock-table-wrap {\n    border-color: #e2e8f0;\n  }\n  [data-theme=\"light\"] .db-table-mock {\n    background: #ffffff;\n  }\n  [data-theme=\"light\"] .db-table-mock th {\n    background: #f1f5f9;\n    color: #475569;\n    border-bottom: 1.5px solid #cbd5e1;\n  }\n  [data-theme=\"light\"] .db-table-mock td {\n    border-bottom: 1px solid #f1f5f9;\n    color: #1e293b;\n  }\n  [data-theme=\"light\"] .db-table-mock tbody tr:hover {\n    background: #f8fafc;\n  }\n  [data-theme=\"light\"] .arith-sticky-table th:first-child,\n  [data-theme=\"light\"] .arith-sticky-table td:first-child {\n    background: #f8fafc !important;\n    box-shadow: 2px 0 6px rgba(0, 0, 0, 0.06);\n  }\n  [data-theme=\"light\"] .arith-sticky-table th:first-child {\n    background: #e2e8f0 !important;\n  }\n  [data-theme=\"light\"] .mental-model-card {\n    background: #f8fafc;\n    border: 1px solid #e2e8f0;\n    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);\n  }\n  [data-theme=\"light\"] .code-subblock-traffic-lights {\n    background: #f1f5f9;\n    border-bottom: 1px solid #e2e8f0;\n  }\n  [data-theme=\"light\"] .code-subblock-title {\n    color: #475569;\n  }\n  [data-theme=\"light\"] .py-code-box {\n    background: #ffffff;\n    color: #0f172a;\n  }\n  [data-theme=\"light\"] .code-comment { color: #047857; font-weight: 600; }\n  [data-theme=\"light\"] .code-keyword { color: #be123c; }\n  [data-theme=\"light\"] .code-builtin { color: #0284c7; }\n  [data-theme=\"light\"] .code-string { color: #0f766e; }\n  [data-theme=\"light\"] .code-number { color: #b45309; }\n  [data-theme=\"light\"] .code-title { color: #6d28d9; }\n  [data-theme=\"light\"] .interview-question { color: #0f172a; }\n  [data-theme=\"light\"] .interview-question strong { color: #0284c7; }\n  [data-theme=\"light\"] .interview-answer { color: #334155; }\n  [data-theme=\"light\"] .interview-answer em { color: #475569; }\n  [data-theme=\"light\"] .interview-divider { border-color: #e2e8f0; }\n\n  /* ── 2D Frozen Table System (Manodemy Gold Standard Parity) ── */\n  .db-mock-table-wrap {\n    max-height: 540px !important;\n    overflow: auto !important;\n    position: relative !important;\n    border-radius: 0 0 8px 8px !important;\n  }\n  .db-mock-table-wrap thead th {\n    position: sticky !important;\n    top: 0 !important;\n    z-index: 12 !important;\n    background-color: #0f172a !important;\n  }\n  .db-mock-table-wrap tbody td:first-child,\n  .db-mock-table-wrap thead th:first-child {\n    position: sticky !important;\n    left: 0 !important;\n    z-index: 15 !important;\n    background-color: #0f172a !important;\n  }\n  .db-mock-table-wrap thead th:first-child {\n    z-index: 25 !important;\n  }\n  [data-theme=\"light\"] .db-mock-table-wrap thead th {\n    background-color: #f1f5f9 !important;\n  }\n  [data-theme=\"light\"] .db-mock-table-wrap tbody td:first-child,\n  [data-theme=\"light\"] .db-mock-table-wrap thead th:first-child {\n    background-color: #ffffff !important;\n  }\n\n\n  /* ═════════════════════════════════════════════════════════════════════\n     MANODEMY UNIVERSAL 2D FROZEN TABLE SYSTEM (FLAGSHIP DAY 04 PARITY)\n     ═════════════════════════════════════════════════════════════════════ */\n  .db-mock-table-wrap {\n    position: relative !important;\n    overflow: auto !important;\n    overflow-x: auto !important;\n    overflow-y: auto !important;\n    max-height: 520px !important;\n    -webkit-overflow-scrolling: touch !important;\n    border-radius: 0 0 12px 12px !important;\n    border: 1px solid rgba(56, 189, 248, 0.25) !important;\n    border-top: none !important;\n    background: #090e1a !important;\n    box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.35) !important;\n    margin: 0 0 16px 0 !important;\n  }\n  .db-mock-table-wrap::-webkit-scrollbar {\n    width: 8px !important;\n    height: 8px !important;\n  }\n  .db-mock-table-wrap::-webkit-scrollbar-track {\n    background: #0d1527 !important;\n    border-radius: 4px !important;\n  }\n  .db-mock-table-wrap::-webkit-scrollbar-thumb {\n    background: rgba(56, 189, 248, 0.35) !important;\n    border-radius: 4px !important;\n  }\n  .db-mock-table-wrap::-webkit-scrollbar-thumb:hover {\n    background: rgba(56, 189, 248, 0.6) !important;\n  }\n\n  .db-table-mock {\n    border-collapse: separate !important;\n    border-spacing: 0 !important;\n    overflow: visible !important;\n    margin: 0 !important;\n    font-size: 0.85rem !important;\n    width: 100% !important;\n    min-width: 960px !important;\n    table-layout: auto !important;\n  }\n\n  .db-table-mock thead th {\n    position: -webkit-sticky !important;\n    position: sticky !important;\n    top: 0 !important;\n    z-index: 20 !important;\n    background-color: #131d35 !important;\n    color: #e2e8f0 !important;\n    font-weight: 700 !important;\n    font-size: 0.82rem !important;\n    letter-spacing: 0.02em !important;\n    text-transform: none !important;\n    padding: 13px 16px !important;\n    border-bottom: 2px solid rgba(56, 189, 248, 0.35) !important;\n    box-sizing: border-box !important;\n    vertical-align: middle !important;\n  }\n\n  .db-table-mock thead th:nth-child(1) {\n    position: -webkit-sticky !important;\n    position: sticky !important;\n    top: 0 !important;\n    left: 0 !important;\n    z-index: 30 !important;\n    background-color: #111a30 !important;\n    border-right: 2px solid rgba(56, 189, 248, 0.38) !important;\n    border-bottom: 2px solid rgba(56, 189, 248, 0.38) !important;\n    box-shadow: 4px 4px 14px -2px rgba(0, 0, 0, 0.55) !important;\n    color: #f8fafc !important;\n  }\n\n  .db-table-mock tbody td:nth-child(1) {\n    position: -webkit-sticky !important;\n    position: sticky !important;\n    left: 0 !important;\n    top: auto !important;\n    z-index: 10 !important;\n    box-sizing: border-box !important;\n    background-color: #0d1527 !important;\n    border-right: 2px solid rgba(56, 189, 248, 0.38) !important;\n    box-shadow: 4px 0 14px -2px rgba(0, 0, 0, 0.55) !important;\n    text-align: left !important;\n    padding: 12px 16px !important;\n    vertical-align: middle !important;\n    white-space: nowrap !important;\n  }\n\n  .db-table-mock tbody tr:hover td:nth-child(1) {\n    background-color: #162038 !important;\n    background: #162038 !important;\n    opacity: 1 !important;\n    z-index: 15 !important;\n    border-right: 2px solid rgba(56, 189, 248, 0.5) !important;\n  }\n\n  .db-table-mock tbody tr:hover td:not(:first-child) {\n    background-color: rgba(56, 189, 248, 0.05) !important;\n  }\n\n  .db-table-mock td:nth-child(1) code {\n    display: inline-flex !important;\n    align-items: center !important;\n    max-width: 100% !important;\n    min-height: 28px !important;\n    padding: 4px 10px !important;\n    font-family: 'JetBrains Mono', monospace !important;\n    font-weight: 700 !important;\n    font-size: 0.82rem !important;\n    background: rgba(56, 189, 248, 0.12) !important;\n    border: 1px solid rgba(56, 189, 248, 0.35) !important;\n    border-radius: 6px !important;\n    color: #38bdf8 !important;\n    white-space: nowrap !important;\n    letter-spacing: -0.01em !important;\n  }\n\n\n  /* ═════════════════════════════════════════════════════════════════════\n     MANODEMY UNIVERSAL TABLE COLOR SCIENCE ENGINE (DARK & LIGHT THEMES)\n     100% Parity with Flagship Python Days 01–05\n     ═════════════════════════════════════════════════════════════════════ */\n\n  /* ── 1. DARK MODE (DEFAULT) TABLE FONT COLORS ── */\n  .db-table-mock thead th {\n    color: #e2e8f0 !important;\n    font-family: 'Outfit', -apple-system, sans-serif !important;\n    font-weight: 700 !important;\n    font-size: 0.82rem !important;\n    letter-spacing: 0.02em !important;\n    background-color: #131d35 !important;\n    border-bottom: 2px solid rgba(56, 189, 248, 0.35) !important;\n  }\n\n  .db-table-mock thead th:nth-child(1) {\n    color: #f8fafc !important;\n    font-weight: 800 !important;\n    background-color: #111a30 !important;\n    border-right: 2px solid rgba(56, 189, 248, 0.38) !important;\n    border-bottom: 2px solid rgba(56, 189, 248, 0.38) !important;\n  }\n\n  .db-table-mock td {\n    color: #cbd5e1 !important;\n    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;\n    font-size: 0.85rem !important;\n    line-height: 1.55 !important;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.06) !important;\n  }\n\n  .db-table-mock td strong {\n    color: #f8fafc !important;\n    font-weight: 700 !important;\n  }\n\n  .db-table-mock td em {\n    color: #94a3b8 !important;\n    font-style: italic !important;\n  }\n\n  /* Column 1 Code Badge (Electric Cyan) */\n  .db-table-mock td:nth-child(1) code {\n    color: #38bdf8 !important;\n    background: rgba(56, 189, 248, 0.12) !important;\n    border: 1px solid rgba(56, 189, 248, 0.35) !important;\n    border-radius: 6px !important;\n    font-family: 'JetBrains Mono', 'Fira Code', monospace !important;\n    font-size: 0.82rem !important;\n    font-weight: 700 !important;\n    letter-spacing: -0.01em !important;\n    padding: 4px 10px !important;\n  }\n\n  /* Regular Data Columns Code Tags */\n  .db-table-mock td:not(:first-child) code,\n  .db-table-mock td code {\n    color: #f1f5f9 !important;\n    background: rgba(15, 23, 42, 0.7) !important;\n    border: 1px solid rgba(255, 255, 255, 0.12) !important;\n    border-radius: 5px !important;\n    font-family: 'JetBrains Mono', 'Fira Code', monospace !important;\n    font-size: 0.81rem !important;\n    line-height: 1.45 !important;\n    padding: 3px 8px !important;\n  }\n\n  /* Anti-Pattern Table Colors (Dark Mode) */\n  .anti-pattern-table thead th:nth-child(1) {\n    background-color: #1a162b !important;\n    color: #fca5a5 !important;\n    border-bottom: 2px solid rgba(244, 63, 94, 0.4) !important;\n    border-right: 2px solid rgba(244, 63, 94, 0.4) !important;\n  }\n\n  .anti-pattern-table thead th:nth-child(2) {\n    color: #6ee7b7 !important;\n  }\n\n  .anti-pattern-table tbody td:nth-child(1) code {\n    background: rgba(244, 63, 94, 0.14) !important;\n    border: 1px solid rgba(244, 63, 94, 0.38) !important;\n    color: #fda4af !important;\n  }\n\n  .anti-pattern-table tbody td:nth-child(2) code,\n  .anti-pattern-table tbody td:nth-child(4) code {\n    background: rgba(16, 185, 129, 0.12) !important;\n    border: 1px solid rgba(16, 185, 129, 0.35) !important;\n    color: #6ee7b7 !important;\n  }\n\n  .anti-pattern-table .ap-result-bad, .anti-pattern-table .ap-bad-text {\n    color: #fb7185 !important;\n  }\n  .anti-pattern-table .ap-result-good, .anti-pattern-table .ap-good-text {\n    color: #34d399 !important;\n  }\n\n  /* ── 2. LIGHT MODE ([data-theme=\"light\"]) TABLE FONT COLORS ── */\n  [data-theme=\"light\"] .db-table-mock thead th {\n    color: #0369a1 !important;\n    background-color: #f8fafc !important;\n    border-bottom: 2px solid #cbd5e1 !important;\n    font-weight: 700 !important;\n  }\n\n  [data-theme=\"light\"] .db-table-mock thead th:nth-child(1) {\n    color: #0f172a !important;\n    background-color: #f1f5f9 !important;\n    border-right: 2px solid #cbd5e1 !important;\n    border-bottom: 2px solid #cbd5e1 !important;\n    font-weight: 800 !important;\n  }\n\n  [data-theme=\"light\"] .db-table-mock td {\n    color: #334155 !important;\n    border-bottom: 1px solid #e2e8f0 !important;\n  }\n\n  [data-theme=\"light\"] .db-table-mock td strong {\n    color: #0f172a !important;\n    font-weight: 700 !important;\n  }\n\n  [data-theme=\"light\"] .db-table-mock td em {\n    color: #64748b !important;\n  }\n\n  /* Column 1 Code Badge (Crisp Azure Blue) */\n  [data-theme=\"light\"] .db-table-mock td:nth-child(1) code {\n    color: #0284c7 !important;\n    background: #e0f2fe !important;\n    border: 1px solid #7dd3fc !important;\n  }\n\n  /* Regular Data Columns Code Tags (Light Mode) */\n  [data-theme=\"light\"] .db-table-mock td:not(:first-child) code,\n  [data-theme=\"light\"] .db-table-mock td code {\n    color: #0f172a !important;\n    background: #f1f5f9 !important;\n    border: 1px solid #e2e8f0 !important;\n  }\n\n  /* Anti-Pattern Table Colors (Light Mode) */\n  [data-theme=\"light\"] .anti-pattern-table thead th:nth-child(1) {\n    background-color: #fff1f2 !important;\n    color: #be123c !important;\n    border-bottom: 2px solid #fecdd3 !important;\n    border-right: 2px solid #fecdd3 !important;\n  }\n\n  [data-theme=\"light\"] .anti-pattern-table thead th:nth-child(2) {\n    color: #059669 !important;\n  }\n\n  [data-theme=\"light\"] .anti-pattern-table tbody td:nth-child(1) code {\n    background: #ffe4e6 !important;\n    border-color: #fecdd3 !important;\n    color: #e11d48 !important;\n  }\n\n  [data-theme=\"light\"] .anti-pattern-table tbody td:nth-child(2) code,\n  [data-theme=\"light\"] .anti-pattern-table tbody td:nth-child(4) code {\n    background: #ecfdf5 !important;\n    border-color: #a7f3d0 !important;\n    color: #059669 !important;\n  }\n\n  [data-theme=\"light\"] .anti-pattern-table .ap-result-bad, [data-theme=\"light\"] .anti-pattern-table .ap-bad-text {\n    color: #e11d48 !important;\n  }\n  [data-theme=\"light\"] .anti-pattern-table .ap-result-good, [data-theme=\"light\"] .anti-pattern-table .ap-good-text {\n    color: #059669 !important;\n  }\n</style>\n<div class=\"py-slides-container\">\n\n<!-- ═══════════════ SECTION 01: FIGURE VS AXES ARCHITECTURE ═══════════════ -->\n<div class=\"slide-section\" id=\"day22Section01\">\n  <h2 class=\"slide-section-title heading-box-wrap heading-with-audio\" id=\"headingFigureVsAxes\">\n    <span class=\"heading-num-box\">01</span>\n    <span class=\"heading-title-box\">\n      <span class=\"heading-title-text\"><span class=\"heading-icon\">🎨</span> Figure vs Axes Architecture</div>\n      <button class=\"audio-play-btn\" onclick=\"playAudio('Day22/New_PyDay22Audio01.mp3', this)\" title=\"Play narration\">\n        <svg class=\"audio-play-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><polygon points=\"5 3 19 12 5 21 5 3\"></polygon></svg>\n        <svg class=\"audio-pause-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><rect x=\"6\" y=\"4\" width=\"4\" height=\"16\"></rect><rect x=\"14\" y=\"4\" width=\"4\" height=\"16\"></rect></svg>\n      </button>\n    </span>\n  </h2>\n  <p class=\"section-intro-text\">\n    Matplotlib is Python's foundational visualization engine. High-level charting libraries like Pandas <code>.plot()</code> and Seaborn draw directly onto Matplotlib surfaces. To customize enterprise graphics with precision, one must master its core object hierarchy: the <strong>Figure</strong> (the canvas) versus the <strong>Axes</strong> (an individual plot area). In production pipelines and FAANG interviews, the stateful <code>plt.plot()</code> syntax is considered an anti-pattern; the object-oriented <code>fig, ax = plt.subplots()</code> pattern is mandatory.\n  </p>\n\n  <div class=\"topic-subcard\">\n    <div class=\"table-header-wrap\">\n      <h4 class=\"table-header-title\">The Matplotlib Core Object Hierarchy</h4>\n        <div class=\"table-header-actions\">\n        <div class=\"table-search-box\">\n        <svg class=\"table-search-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"11\" cy=\"11\" r=\"8\"></circle><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"></line></svg>\n        <input type=\"text\" class=\"table-search-input\" placeholder=\"Filter table...\" onkeyup=\"filterTable(this)\">\n        </div>\n        </div>\n    </div>\n    <div class=\"db-mock-table-wrap\">\n      <table class=\"db-table-mock arith-sticky-table\">\n        <thead>\n          <tr>\n            <th>Matplotlib Object</th>\n            <th>What It Represents</th>\n            <th>Factory Constructor / Accessor</th>\n            <th>Production &amp; Engineering Significance</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n            <td><code>Figure</code> (<code>fig</code>)</td>\n            <td>The entire canvas, window, or exported image buffer</td>\n            <td><code>fig, ax = plt.subplots()</code></td>\n            <td>Owns all child Axes, overall suptitle, colorbars, and pixel buffer export (<code>fig.savefig</code>).</td>\n          </tr>\n          <tr>\n            <td><code>Axes</code> (<code>ax</code>)</td>\n            <td>One bounded rectangular plot area with its coordinate system</td>\n            <td><code>fig.subplots()</code> or <code>axes[row, col]</code></td>\n            <td>The primary canvas where data marks are drawn (<code>ax.plot</code>, <code>ax.scatter</code>, <code>ax.bar</code>, etc.).</td>\n          </tr>\n          <tr>\n            <td><code>Axis</code> (<code>ax.xaxis</code> / <code>yaxis</code>)</td>\n            <td>The horizontal or vertical scale lines, ticks, and labels</td>\n            <td><code>ax.xaxis</code>, <code>ax.yaxis</code></td>\n            <td>Governs numerical scale limits, date locators, and currency/percent formatters.</td>\n          </tr>\n          <tr>\n            <td><code>Artists</code></td>\n            <td>Every visible glyph rendered onto the figure canvas</td>\n            <td>Returned by plotting methods</td>\n            <td>Includes <code>Line2D</code>, <code>Rectangle</code> (patches), <code>Text</code>, <code>Collections</code>, and legends.</td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n  </div>\n\n  <div class=\"topic-subcard\">\n    <div class=\"table-header-wrap\">\n      <h4 class=\"table-header-title\">Object-Oriented API vs Stateful Pyplot Interface</h4>\n    </div>\n    <div class=\"mental-model-card\">\n      <div class=\"code-subblock-traffic-lights\">\n        <span class=\"traffic-light-dot red\"></span>\n        <span class=\"traffic-light-dot yellow\"></span>\n        <span class=\"traffic-light-dot green\"></span>\n        <span class=\"code-subblock-title\">figure_vs_axes_architecture.py — Explicit Canvas &amp; Artist Construction</span>\n      </div>\n      <div class=\"py-code-box\">\n        <pre><code><span class=\"code-keyword\">import</span> matplotlib.pyplot <span class=\"code-keyword\">as</span> plt\n\n<span class=\"code-comment\"># PRODUCTION MANDATE: Object-Oriented Interface</span>\nfig, ax = plt.subplots(figsize=(<span class=\"code-number\">7</span>, <span class=\"code-number\">3.5</span>), dpi=<span class=\"code-number\">100</span>)\n\n<span class=\"code-comment\"># Draw onto the explicit 'ax' target</span>\nlines = ax.plot([<span class=\"code-number\">1</span>, <span class=\"code-number\">2</span>, <span class=\"code-number\">3</span>, <span class=\"code-number\">4</span>], [<span class=\"code-number\">10</span>, <span class=\"code-number\">25</span>, <span class=\"code-number\">18</span>, <span class=\"code-number\">32</span>], label=<span class=\"code-string\">\"Active Nodes\"</span>)\nax.set_title(<span class=\"code-string\">\"Cluster Node Scale-Out\"</span>, loc=<span class=\"code-string\">\"left\"</span>, fontweight=<span class=\"code-string\">\"bold\"</span>)\nax.set_xlabel(<span class=\"code-string\">\"Cluster Epoch\"</span>)\nax.set_ylabel(<span class=\"code-string\">\"Node Count\"</span>)\nax.legend()\n\n<span class=\"code-comment\"># Inspect the internal Artist Tree</span>\n<span class=\"code-builtin\">print</span>(<span class=\"code-string\">f\"Figure owns {len(fig.axes)} Axes\"</span>)\n<span class=\"code-builtin\">print</span>(<span class=\"code-string\">f\"Axes owns {len(ax.lines)} Line2D artist: {ax.lines[0].get_ydata().tolist()}\"</span>)\n\n<span class=\"code-comment\"># Free memory explicitly</span>\nplt.close(fig)</code></pre>\n      </div>\n    </div>\n  </div>\n</div>\n\n<!-- ═══════════════ SECTION 02: LINE PLOTS FOR TRENDS ═══════════════ -->\n<div class=\"slide-section\" id=\"day22Section02\">\n  <h2 class=\"slide-section-title heading-box-wrap heading-with-audio\" id=\"headingLinePlots\">\n    <span class=\"heading-num-box\">02</span>\n    <span class=\"heading-title-box\">\n      <span class=\"heading-title-text\"><span class=\"heading-icon\">📈</span> Line Plots & Temporal Trends</div>\n      <button class=\"audio-play-btn\" onclick=\"playAudio('Day22/New_PyDay22Audio02.mp3', this)\" title=\"Play narration\">\n        <svg class=\"audio-play-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><polygon points=\"5 3 19 12 5 21 5 3\"></polygon></svg>\n        <svg class=\"audio-pause-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><rect x=\"6\" y=\"4\" width=\"4\" height=\"16\"></rect><rect x=\"14\" y=\"4\" width=\"4\" height=\"16\"></rect></svg>\n      </button>\n    </span>\n  </h2>\n  <p class=\"section-intro-text\">\n    A line plot is the universal default choice for tracking quantitative metrics across a continuous sequence or chronological timeline. Matplotlib allows precise calibration of stroke dynamics, marker glyphs, transparency, and categorical color mapping to establish an intuitive visual hierarchy.\n  </p>\n\n  <div class=\"topic-subcard\">\n    <div class=\"table-header-wrap\">\n      <h4 class=\"table-header-title\">Visual Encoding Options for Line Plots</h4>\n        <div class=\"table-header-actions\">\n        <div class=\"table-search-box\">\n        <svg class=\"table-search-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"11\" cy=\"11\" r=\"8\"></circle><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"></line></svg>\n        <input type=\"text\" class=\"table-search-input\" placeholder=\"Filter table...\" onkeyup=\"filterTable(this)\">\n        </div>\n        </div>\n    </div>\n    <div class=\"db-mock-table-wrap\">\n      <table class=\"db-table-mock arith-sticky-table\">\n        <thead>\n          <tr>\n            <th>Encoding Parameter</th>\n            <th>Type / Format</th>\n            <th>Common Values &amp; Syntax</th>\n            <th>Visual &amp; Analytical Purpose</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n            <td><code>color</code> (<code>c</code>)</td>\n            <td>Hex code, named color, or cycle ID</td>\n            <td><code>'#1D4ED8'</code>, <code>'teal'</code>, <code>'C0'</code>, <code>'crimson'</code></td>\n            <td>Establishes distinct visual identity; pick WCAG accessible palettes.</td>\n          </tr>\n          <tr>\n            <td><code>linestyle</code> (<code>ls</code>)</td>\n            <td>String shorthand</td>\n            <td><code>'-'</code> (solid), <code>'--'</code> (dashed), <code>':'</code> (dotted), <code>'-.'</code></td>\n            <td>Differentiates primary metrics (solid) from baselines, targets, or forecasts (dashed).</td>\n          </tr>\n          <tr>\n            <td><code>marker</code></td>\n            <td>Glyph symbol</td>\n            <td><code>'o'</code> (circle), <code>'s'</code> (square), <code>'^'</code> (triangle), <code>'x'</code>, <code>'D'</code></td>\n            <td>Pinpoints exact discrete sample points along a continuous trend line.</td>\n          </tr>\n          <tr>\n            <td><code>linewidth</code> (<code>lw</code>)</td>\n            <td>Floating point (points)</td>\n            <td><code>1.5</code>, <code>2.0</code>, <code>3.0</code></td>\n            <td>Emphasizes foreground focus series while attenuating background reference series.</td>\n          </tr>\n          <tr>\n            <td><code>alpha</code></td>\n            <td>Float [0.0 to 1.0]</td>\n            <td><code>0.25</code> (ghost), <code>0.70</code> (semi-opaque), <code>1.0</code></td>\n            <td>Resolves visual crowding and overplotting when rendering multi-series curves.</td>\n          </tr>\n          <tr>\n            <td><code>label</code></td>\n            <td>String</td>\n            <td><code>\"Actual ARR\"</code>, <code>\"SLA Threshold\"</code></td>\n            <td>Registers the line in the axes legend compiler triggered via <code>ax.legend()</code>.</td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n  </div>\n\n  <div class=\"topic-subcard\">\n    <div class=\"table-header-wrap\">\n      <h4 class=\"table-header-title\">Monthly KPI Tracking: Sales vs Target Performance</h4>\n    </div>\n    <div class=\"mental-model-card\">\n      <div class=\"code-subblock-traffic-lights\">\n        <span class=\"traffic-light-dot red\"></span>\n        <span class=\"traffic-light-dot yellow\"></span>\n        <span class=\"traffic-light-dot green\"></span>\n        <span class=\"code-subblock-title\">monthly_sales_trend.py — Multi-Series Line Styling</span>\n      </div>\n      <div class=\"py-code-box\">\n        <pre><code><span class=\"code-keyword\">import</span> numpy <span class=\"code-keyword\">as</span> np\n<span class=\"code-keyword\">import</span> matplotlib.pyplot <span class=\"code-keyword\">as</span> plt\n\nmonths = np.arange(<span class=\"code-number\">1</span>, <span class=\"code-number\">13</span>)\nsales = [<span class=\"code-number\">12</span>, <span class=\"code-number\">14</span>, <span class=\"code-number\">13</span>, <span class=\"code-number\">17</span>, <span class=\"code-number\">21</span>, <span class=\"code-number\">24</span>, <span class=\"code-number\">23</span>, <span class=\"code-number\">26</span>, <span class=\"code-number\">22</span>, <span class=\"code-number\">20</span>, <span class=\"code-number\">25</span>, <span class=\"code-number\">30</span>]\n\nfig, ax = plt.subplots(figsize=(<span class=\"code-number\">7</span>, <span class=\"code-number\">3.2</span>))\n<span class=\"code-comment\"># Solid actual series with discrete observation markers</span>\nax.plot(months, sales, marker=<span class=\"code-string\">\"o\"</span>, color=<span class=\"code-string\">\"#1D4ED8\"</span>, linewidth=<span class=\"code-number\">2.5</span>, label=<span class=\"code-string\">\"Actual Sales\"</span>)\n<span class=\"code-comment\"># Dashed target benchmark line</span>\nax.plot(months, [<span class=\"code-number\">20</span>] * <span class=\"code-number\">12</span>, linestyle=<span class=\"code-string\">\"--\"</span>, color=<span class=\"code-string\">\"#DC2626\"</span>, linewidth=<span class=\"code-number\">1.5</span>, label=<span class=\"code-string\">\"Target Benchmark\"</span>)\n\nax.set_xticks(months, list(<span class=\"code-string\">\"JFMAMJJASOND\"</span>))\nax.set_title(<span class=\"code-string\">\"Monthly Revenue vs Target Benchmark\"</span>, loc=<span class=\"code-string\">\"left\"</span>, fontweight=<span class=\"code-string\">\"bold\"</span>)\nax.set_xlabel(<span class=\"code-string\">\"Fiscal Month\"</span>)\nax.set_ylabel(<span class=\"code-string\">\"Revenue ($k)\"</span>)\nax.grid(alpha=<span class=\"code-number\">0.25</span>, linestyle=<span class=\"code-string\">\":\"</span>)\nax.legend(loc=<span class=\"code-string\">\"upper left\"</span>, frameon=<span class=\"code-keyword\">True</span>)\nplt.tight_layout()\nplt.close(fig)</code></pre>\n      </div>\n    </div>\n  </div>\n</div>\n\n<!-- ═══════════════ SECTION 03: BAR CHARTS ═══════════════ -->\n<div class=\"slide-section\" id=\"day22Section03\">\n  <h2 class=\"slide-section-title heading-box-wrap heading-with-audio\" id=\"headingBarCharts\">\n    <span class=\"heading-num-box\">03</span>\n    <span class=\"heading-title-box\">\n      <span class=\"heading-title-text\"><span class=\"heading-icon\">📊</span> Bar Charts & Grouped Bars</div>\n      <button class=\"audio-play-btn\" onclick=\"playAudio('Day22/New_PyDay22Audio03.mp3', this)\" title=\"Play narration\">\n        <svg class=\"audio-play-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><polygon points=\"5 3 19 12 5 21 5 3\"></polygon></svg>\n        <svg class=\"audio-pause-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><rect x=\"6\" y=\"4\" width=\"4\" height=\"16\"></rect><rect x=\"14\" y=\"4\" width=\"4\" height=\"16\"></rect></svg>\n      </button>\n    </span>\n  </h2>\n  <p class=\"section-intro-text\">\n    Bar charts are the gold standard for category comparisons. When dealing with long labels (e.g. database table names or job titles), horizontal bars (<code>barh</code>) preserve horizontal scanability. For multi-variable categories, engineers rely on offset-grouped bars or cumulative stacked bars. <strong>The Golden Rule:</strong> The numerical value axis of every bar chart must start at 0; truncating the baseline distorts perceptual proportions.\n  </p>\n\n  <div class=\"topic-subcard\">\n    <div class=\"table-header-wrap\">\n      <h4 class=\"table-header-title\">Bar Chart Architectural Formats</h4>\n        <div class=\"table-header-actions\">\n        <div class=\"table-search-box\">\n        <svg class=\"table-search-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"11\" cy=\"11\" r=\"8\"></circle><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"></line></svg>\n        <input type=\"text\" class=\"table-search-input\" placeholder=\"Filter table...\" onkeyup=\"filterTable(this)\">\n        </div>\n        </div>\n    </div>\n    <div class=\"db-mock-table-wrap\">\n      <table class=\"db-table-mock arith-sticky-table\">\n        <thead>\n          <tr>\n            <th>Bar Chart Style</th>\n            <th>Primary Method</th>\n            <th>Coordinate Mechanics</th>\n            <th>Best Use Case &amp; Gotcha</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n            <td>Vertical Bars</td>\n            <td><code>ax.bar(x, height)</code></td>\n            <td>Categories on x, heights along y</td>\n            <td>Ideal for few categories (&le; 7). Clutters quickly with long string labels.</td>\n          </tr>\n          <tr>\n            <td>Horizontal Bars</td>\n            <td><code>ax.barh(y, width)</code></td>\n            <td>Categories on y, widths along x</td>\n            <td>Superior for &gt; 8 categories or long text labels. Always sort descending!</td>\n          </tr>\n          <tr>\n            <td>Grouped Bars</td>\n            <td><code>ax.bar(indices &plusmn; w/2, ...)</code></td>\n            <td>Offset coordinate index by bar width</td>\n            <td>Compares 2-3 metrics side-by-side across groups (e.g. Q1 vs Q2).</td>\n          </tr>\n          <tr>\n            <td>Stacked Bars</td>\n            <td><code>ax.bar(..., bottom=series1)</code></td>\n            <td>Pass previous cumulative sum to <code>bottom=</code></td>\n            <td>Shows part-to-whole decomposition when aggregate totals dominate parts.</td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n  </div>\n\n  <div class=\"topic-subcard\">\n    <div class=\"table-header-wrap\">\n      <h4 class=\"table-header-title\">Sorted Horizontal Bars &amp; Grouped Quarterly Comparison</h4>\n    </div>\n    <div class=\"mental-model-card\">\n      <div class=\"code-subblock-traffic-lights\">\n        <span class=\"traffic-light-dot red\"></span>\n        <span class=\"traffic-light-dot yellow\"></span>\n        <span class=\"traffic-light-dot green\"></span>\n        <span class=\"code-subblock-title\">bar_chart_mastery.py — Sorting, Grouping &amp; Labels</span>\n      </div>\n      <div class=\"py-code-box\">\n        <pre><code><span class=\"code-keyword\">import</span> numpy <span class=\"code-keyword\">as</span> np\n<span class=\"code-keyword\">import</span> matplotlib.pyplot <span class=\"code-keyword\">as</span> plt\n\nregions = [<span class=\"code-string\">\"North\"</span>, <span class=\"code-string\">\"South\"</span>, <span class=\"code-string\">\"East\"</span>, <span class=\"code-string\">\"West\"</span>]\nq1 = np.array([<span class=\"code-number\">40</span>, <span class=\"code-number\">55</span>, <span class=\"code-number\">30</span>, <span class=\"code-number\">45</span>])\nq2 = np.array([<span class=\"code-number\">50</span>, <span class=\"code-number\">48</span>, <span class=\"code-number\">35</span>, <span class=\"code-number\">60</span>])\n\nfig, (ax1, ax2) = plt.subplots(<span class=\"code-number\">1</span>, <span class=\"code-number\">2</span>, figsize=(<span class=\"code-number\">10</span>, <span class=\"code-number\">3.2</span>))\n\n<span class=\"code-comment\"># Panel 1: Sorted Horizontal Bars with direct value labels</span>\nsort_idx = np.argsort(q1)\nbars = ax1.barh(np.array(regions)[sort_idx], q1[sort_idx], color=<span class=\"code-string\">\"#34D399\"</span>)\nax1.bar_label(bars, padding=<span class=\"code-number\">3</span>, fontsize=<span class=\"code-number\">9</span>)\nax1.set_title(<span class=\"code-string\">\"Q1 Sales (Sorted)\"</span>, loc=<span class=\"code-string\">\"left\"</span>, fontweight=<span class=\"code-string\">\"bold\"</span>)\nax1.set_xlim(<span class=\"code-number\">0</span>, <span class=\"code-number\">70</span>)\n\n<span class=\"code-comment\"># Panel 2: Grouped Bars with coordinate index offsetting</span>\nwidth = <span class=\"code-number\">0.36</span>\nidx = np.arange(len(regions))\nax2.bar(idx - width/<span class=\"code-number\">2</span>, q1, width, label=<span class=\"code-string\">\"Q1\"</span>, color=<span class=\"code-string\">\"#60A5FA\"</span>)\nax2.bar(idx + width/<span class=\"code-number\">2</span>, q2, width, label=<span class=\"code-string\">\"Q2\"</span>, color=<span class=\"code-string\">\"#F59E0B\"</span>)\nax2.set_xticks(idx, regions)\nax2.set_title(<span class=\"code-string\">\"Quarterly Comparison by Region\"</span>, loc=<span class=\"code-string\">\"left\"</span>, fontweight=<span class=\"code-string\">\"bold\"</span>)\nax2.legend()\n\nplt.tight_layout()\nplt.close(fig)</code></pre>\n      </div>\n    </div>\n  </div>\n</div>\n\n<!-- ═══════════════ SECTION 04: SCATTER PLOTS ═══════════════ -->\n<div class=\"slide-section\" id=\"day22Section04\">\n  <h2 class=\"slide-section-title heading-box-wrap heading-with-audio\" id=\"headingScatterPlots\">\n    <span class=\"heading-num-box\">04</span>\n    <span class=\"heading-title-box\">\n      <span class=\"heading-title-text\"><span class=\"heading-icon\">🔵</span> Scatter Plots & Colormaps</div>\n      <button class=\"audio-play-btn\" onclick=\"playAudio('Day22/New_PyDay22Audio04.mp3', this)\" title=\"Play narration\">\n        <svg class=\"audio-play-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><polygon points=\"5 3 19 12 5 21 5 3\"></polygon></svg>\n        <svg class=\"audio-pause-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><rect x=\"6\" y=\"4\" width=\"4\" height=\"16\"></rect><rect x=\"14\" y=\"4\" width=\"4\" height=\"16\"></rect></svg>\n      </button>\n    </span>\n  </h2>\n  <p class=\"section-intro-text\">\n    Scatter plots reveal relationships, correlations, and clusters between two continuous variables. Matplotlib elevates 2D scatter plots into 4-dimensional analytical representations by mapping dot size (<code>s</code>) to a 3rd metric and color gradient (<code>c</code> with <code>cmap</code>) to a 4th metric. In big-data environments, overplotting is mitigated with alpha transparency or hexbin aggregations.\n  </p>\n\n  <div class=\"topic-subcard\">\n    <div class=\"table-header-wrap\">\n      <h4 class=\"table-header-title\">Colormap Families &amp; Perception Rules</h4>\n        <div class=\"table-header-actions\">\n        <div class=\"table-search-box\">\n        <svg class=\"table-search-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"11\" cy=\"11\" r=\"8\"></circle><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"></line></svg>\n        <input type=\"text\" class=\"table-search-input\" placeholder=\"Filter table...\" onkeyup=\"filterTable(this)\">\n        </div>\n        </div>\n    </div>\n    <div class=\"db-mock-table-wrap\">\n      <table class=\"db-table-mock arith-sticky-table\">\n        <thead>\n          <tr>\n            <th>Colormap Family</th>\n            <th>Recommended Maps</th>\n            <th>Data Characteristics</th>\n            <th>Perceptual Uniformity Status</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n            <td>Sequential</td>\n            <td><code>'viridis'</code>, <code>'plasma'</code>, <code>'Blues'</code></td>\n            <td>Monotonically ordered numerical data (0 to max)</td>\n            <td>Perceptually uniform; grayscale &amp; color-blind safe.</td>\n          </tr>\n          <tr>\n            <td>Diverging</td>\n            <td><code>'coolwarm'</code>, <code>'RdBu'</code>, <code>'bwr'</code></td>\n            <td>Data with a critical neutral center (e.g. 0 profit, 50% baseline)</td>\n            <td>Equal visual emphasis on positive and negative extremes.</td>\n          </tr>\n          <tr>\n            <td>Qualitative</td>\n            <td><code>'tab10'</code>, <code>'Set2'</code>, <code>'Paired'</code></td>\n            <td>Unordered discrete categorical classes</td>\n            <td>Distinct hues without implying rank or order.</td>\n          </tr>\n          <tr>\n            <td>Anti-Pattern: Jet / Rainbow</td>\n            <td><code>'jet'</code>, <code>'rainbow'</code></td>\n            <td><strong>STRICTLY PROHIBITED IN PRODUCTION</strong></td>\n            <td>Non-uniform luminance; creates false edges and fails color-blind readers.</td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n  </div>\n\n  <div class=\"topic-subcard\">\n    <div class=\"table-header-wrap\">\n      <h4 class=\"table-header-title\">4-Variable Scatter Plot with Fitted Regression Line</h4>\n    </div>\n    <div class=\"mental-model-card\">\n      <div class=\"code-subblock-traffic-lights\">\n        <span class=\"traffic-light-dot red\"></span>\n        <span class=\"traffic-light-dot yellow\"></span>\n        <span class=\"traffic-light-dot green\"></span>\n        <span class=\"code-subblock-title\">multivariate_scatter_trend.py — High-Dimensional Visual Encodings</span>\n      </div>\n      <div class=\"py-code-box\">\n        <pre><code><span class=\"code-keyword\">import</span> numpy <span class=\"code-keyword\">as</span> np\n<span class=\"code-keyword\">import</span> matplotlib.pyplot <span class=\"code-keyword\">as</span> plt\n\nrng = np.random.default_rng(<span class=\"code-number\">42</span>)\nx = rng.uniform(<span class=\"code-number\">1</span>, <span class=\"code-number\">10</span>, <span class=\"code-number\">80</span>)\ny = <span class=\"code-number\">2.5</span> * x + rng.normal(<span class=\"code-number\">0</span>, <span class=\"code-number\">2.5</span>, <span class=\"code-number\">80</span>)\nsize = rng.uniform(<span class=\"code-number\">20</span>, <span class=\"code-number\">180</span>, <span class=\"code-number\">80</span>)    <span class=\"code-comment\"># 3rd Dimension: Dot Area</span>\nlatency = y * <span class=\"code-number\">1.2</span>                  <span class=\"code-comment\"># 4th Dimension: Colormap</span>\n\nfig, ax = plt.subplots(figsize=(<span class=\"code-number\">6.5</span>, <span class=\"code-number\">3.5</span>))\nsc = ax.scatter(x, y, s=size, c=latency, cmap=<span class=\"code-string\">\"viridis\"</span>, alpha=<span class=\"code-number\">0.75</span>, edgecolor=<span class=\"code-string\">\"white\"</span>, linewidth=<span class=\"code-number\">0.5</span>)\n\n<span class=\"code-comment\"># Fit OLS Linear Regression Trend Line</span>\nm, b = np.polyfit(x, y, <span class=\"code-number\">1</span>)\nx_grid = np.linspace(<span class=\"code-number\">1</span>, <span class=\"code-number\">10</span>, <span class=\"code-number\">50</span>)\nax.plot(x_grid, m * x_grid + b, color=<span class=\"code-string\">\"#DC2626\"</span>, linestyle=<span class=\"code-string\">\"--\"</span>, label=<span class=\"code-string\">f\"Trend: y = {m:.2f}x + {b:.2f}\"</span>)\n\nfig.colorbar(sc, ax=ax, label=<span class=\"code-string\">\"Observed Latency (ms)\"</span>)\nax.set_title(<span class=\"code-string\">\"Ad Spend vs User Acquisition with Latency Encoding\"</span>, loc=<span class=\"code-string\">\"left\"</span>, fontweight=<span class=\"code-string\">\"bold\"</span>)\nax.set_xlabel(<span class=\"code-string\">\"Ad Spend ($k)\"</span>)\nax.set_ylabel(<span class=\"code-string\">\"Users Acquired (k)\"</span>)\nax.legend()\nplt.tight_layout()\nplt.close(fig)</code></pre>\n      </div>\n    </div>\n  </div>\n</div>\n\n<!-- ═══════════════ SECTION 05: HISTOGRAMS & BIN WIDTH HEURISTICS ═══════════════ -->\n<div class=\"slide-section\" id=\"day22Section05\">\n  <h2 class=\"slide-section-title heading-box-wrap heading-with-audio\" id=\"headingHistograms\">\n    <span class=\"heading-num-box\">05</span>\n    <span class=\"heading-title-box\">\n      <span class=\"heading-title-text\"><span class=\"heading-icon\">📉</span> Histograms & Box Plots</div>\n      <button class=\"audio-play-btn\" onclick=\"playAudio('Day22/New_PyDay22Audio05.mp3', this)\" title=\"Play narration\">\n        <svg class=\"audio-play-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><polygon points=\"5 3 19 12 5 21 5 3\"></polygon></svg>\n        <svg class=\"audio-pause-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><rect x=\"6\" y=\"4\" width=\"4\" height=\"16\"></rect><rect x=\"14\" y=\"4\" width=\"4\" height=\"16\"></rect></svg>\n      </button>\n    </span>\n  </h2>\n  <p class=\"section-intro-text\">\n    Histograms partition continuous data into adjacent intervals (bins) to reveal the underlying probability density, modality, skewness, and tails. Choosing the number of bins is critical: too few bins oversmoothes important features (like bimodal peaks), while too many introduces noisy sampling artifacts. Using the <strong>Freedman-Diaconis rule</strong> yields an optimal bin width resilient to extreme outliers.\n  </p>\n\n  <div class=\"topic-subcard\">\n    <div class=\"table-header-wrap\">\n      <h4 class=\"table-header-title\">Mathematical Binning Heuristics Compared</h4>\n        <div class=\"table-header-actions\">\n        <div class=\"table-search-box\">\n        <svg class=\"table-search-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"11\" cy=\"11\" r=\"8\"></circle><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"></line></svg>\n        <input type=\"text\" class=\"table-search-input\" placeholder=\"Filter table...\" onkeyup=\"filterTable(this)\">\n        </div>\n        </div>\n    </div>\n    <div class=\"db-mock-table-wrap\">\n      <table class=\"db-table-mock arith-sticky-table\">\n        <thead>\n          <tr>\n            <th>Binning Rule</th>\n            <th>Formula for Bin Width / Count</th>\n            <th>Underlying Assumptions</th>\n            <th>Production Resilience</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n            <td>Freedman-Diaconis</td>\n            <td><code>h = 2 &times; IQR(x) &times; n^(-1/3)</code></td>\n            <td>None (non-parametric, uses robust IQR)</td>\n            <td><strong>Highest Resilience:</strong> Completely unaffected by severe heavy-tailed outliers.</td>\n          </tr>\n          <tr>\n            <td>Scott's Rule</td>\n            <td><code>h = 3.49 &times; &sigma; &times; n^(-1/3)</code></td>\n            <td>Assumes data is approximately Gaussian</td>\n            <td>Sensitive to outliers because standard deviation &sigma; explodes.</td>\n          </tr>\n          <tr>\n            <td>Sturges' Rule</td>\n            <td><code>k = 1 + log2(n)</code> (bin count)</td>\n            <td>Assumes symmetric binomial distribution</td>\n            <td>Fails on n &gt; 1,000; severely oversmoothes big datasets.</td>\n          </tr>\n          <tr>\n            <td>Square Root</td>\n            <td><code>k = &radic;n</code></td>\n            <td>Heuristic rule of thumb</td>\n            <td>Simple baseline, but lacks theoretical distribution bounds.</td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n  </div>\n\n  <div class=\"topic-subcard\">\n    <div class=\"table-header-wrap\">\n      <h4 class=\"table-header-title\">Histogram with Central Tendency &amp; Grouped Box Plots</h4>\n    </div>\n    <div class=\"mental-model-card\">\n      <div class=\"code-subblock-traffic-lights\">\n        <span class=\"traffic-light-dot red\"></span>\n        <span class=\"traffic-light-dot yellow\"></span>\n        <span class=\"traffic-light-dot green\"></span>\n        <span class=\"code-subblock-title\">distribution_diagnostics.py — Histogram &amp; Boxplot Architecture</span>\n      </div>\n      <div class=\"py-code-box\">\n        <pre><code><span class=\"code-keyword\">import</span> numpy <span class=\"code-keyword\">as</span> np\n<span class=\"code-keyword\">import</span> matplotlib.pyplot <span class=\"code-keyword\">as</span> plt\n\nrng = np.random.default_rng(<span class=\"code-number\">10</span>)\nsample = rng.normal(loc=<span class=\"code-number\">65</span>, scale=<span class=\"code-number\">12</span>, size=<span class=\"code-number\">600</span>)\n\nfig, (ax1, ax2) = plt.subplots(<span class=\"code-number\">1</span>, <span class=\"code-number\">2</span>, figsize=(<span class=\"code-number\">9.5</span>, <span class=\"code-number\">3.2</span>))\n\n<span class=\"code-comment\"># Panel 1: Histogram with Freedman-Diaconis bins & vertical mean indicator</span>\ncounts, edges, patches = ax1.hist(sample, bins=<span class=\"code-string\">\"auto\"</span>, color=<span class=\"code-string\">\"#93C5FD\"</span>, edgecolor=<span class=\"code-string\">\"white\"</span>, density=<span class=\"code-keyword\">True</span>)\nmean_val = sample.mean()\nax1.axvline(mean_val, color=<span class=\"code-string\">\"#DC2626\"</span>, linestyle=<span class=\"code-string\">\"--\"</span>, linewidth=<span class=\"code-number\">2</span>, label=<span class=\"code-string\">f\"Mean: {mean_val:.1f}\"</span>)\nax1.set_title(<span class=\"code-string\">\"Distribution Shape (Density)\"</span>, loc=<span class=\"code-string\">\"left\"</span>, fontweight=<span class=\"code-string\">\"bold\"</span>)\nax1.legend()\n\n<span class=\"code-comment\"># Panel 2: Comparative Box Plots across groups</span>\nax2.boxplot([sample, sample * <span class=\"code-number\">0.8</span> + <span class=\"code-number\">5</span>, sample * <span class=\"code-number\">1.1</span> - <span class=\"code-number\">8</span>], tick_labels=[<span class=\"code-string\">\"Cohort A\"</span>, <span class=\"code-string\">\"Cohort B\"</span>, <span class=\"code-string\">\"Cohort C\"</span>])\nax2.set_title(<span class=\"code-string\">\"Cohort Spread & Outlier Comparison\"</span>, loc=<span class=\"code-string\">\"left\"</span>, fontweight=<span class=\"code-string\">\"bold\"</span>)\n\nplt.tight_layout()\nplt.close(fig)</code></pre>\n      </div>\n    </div>\n  </div>\n</div>\n\n\n<!-- ═══════════════ SECTION 06: MULTI-PLOT GRIDS & SUBPLOTS ═══════════════ -->\n<div class=\"slide-section\" id=\"day22Section06\">\n  <h2 class=\"slide-section-title heading-box-wrap heading-with-audio\" id=\"headingSubplots\">\n    <span class=\"heading-num-box\">06</span>\n    <span class=\"heading-title-box\">\n      <span class=\"heading-title-text\"><span class=\"heading-icon\">🔲</span> Subplot Grids (plt.subplots)</div>\n      <button class=\"audio-play-btn\" onclick=\"playAudio('Day22/New_PyDay22Audio06.mp3', this)\" title=\"Play narration\">\n        <svg class=\"audio-play-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><polygon points=\"5 3 19 12 5 21 5 3\"></polygon></svg>\n        <svg class=\"audio-pause-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><rect x=\"6\" y=\"4\" width=\"4\" height=\"16\"></rect><rect x=\"14\" y=\"4\" width=\"4\" height=\"16\"></rect></svg>\n      </button>\n    </span>\n  </h2>\n  <p class=\"section-intro-text\">\n    Multi-panel dashboards (\"small multiples\") allow analysts to compare metrics across segments without cramming unreadable lines into a single coordinate system. The <code>plt.subplots(nrows, ncols)</code> factory returns a NumPy 2D array of Axes. Synchronizing scales across panels with <code>sharex=True</code> and <code>sharey=True</code> is vital for accurate cross-panel visual comparisons. To avoid title and axis collisions, always use <code>constrained_layout=True</code>.\n  </p>\n\n  <div class=\"topic-subcard\">\n    <div class=\"table-header-wrap\">\n      <h4 class=\"table-header-title\">Subplot Coordination Parameters &amp; Layout Engines</h4>\n        <div class=\"table-header-actions\">\n        <div class=\"table-search-box\">\n        <svg class=\"table-search-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"11\" cy=\"11\" r=\"8\"></circle><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"></line></svg>\n        <input type=\"text\" class=\"table-search-input\" placeholder=\"Filter table...\" onkeyup=\"filterTable(this)\">\n        </div>\n        </div>\n    </div>\n    <div class=\"db-mock-table-wrap\">\n      <table class=\"db-table-mock arith-sticky-table\">\n        <thead>\n          <tr>\n            <th>Feature / Parameter</th>\n            <th>Code Syntax</th>\n            <th>Underlying Behavior</th>\n            <th>When to Apply</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n            <td>Grid Shape</td>\n            <td><code>plt.subplots(2, 2)</code></td>\n            <td>Returns Figure and <code>(2, 2)</code> ndarray of Axes</td>\n            <td>Multi-metric executive dashboards.</td>\n          </tr>\n          <tr>\n            <td>Shared X Axis</td>\n            <td><code>sharex=True</code></td>\n            <td>Links horizontal pan/zoom and hides inner tick labels</td>\n            <td>Stacked time series sharing identical chronological bounds.</td>\n          </tr>\n          <tr>\n            <td>Shared Y Axis</td>\n            <td><code>sharey=True</code></td>\n            <td>Unifies vertical scales across small multiples</td>\n            <td>Cross-cohort comparison where equal heights must mean equal values.</td>\n          </tr>\n          <tr>\n            <td>Dual Axis (Twin)</td>\n            <td><code>twin = ax.twinx()</code></td>\n            <td>Creates overlay Axes sharing X with an independent right Y axis</td>\n            <td>Correlating volume (bars) with margin % (line). Use with extreme caution!</td>\n          </tr>\n          <tr>\n            <td>Constrained Layout</td>\n            <td><code>constrained_layout=True</code></td>\n            <td>Dynamic layout solver that prevents label and title overlaps</td>\n            <td>Superior modern alternative to manual <code>plt.tight_layout()</code>.</td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n  </div>\n\n  <div class=\"topic-subcard\">\n    <div class=\"table-header-wrap\">\n      <h4 class=\"table-header-title\">Multi-Panel Grid Layout with Linked Coordinates &amp; Twin Axes</h4>\n    </div>\n    <div class=\"mental-model-card\">\n      <div class=\"code-subblock-traffic-lights\">\n        <span class=\"traffic-light-dot red\"></span>\n        <span class=\"traffic-light-dot yellow\"></span>\n        <span class=\"traffic-light-dot green\"></span>\n        <span class=\"code-subblock-title\">complex_grid_layout.py — Modern Constrained Multi-Axes Architecture</span>\n      </div>\n      <div class=\"py-code-box\">\n        <pre><code><span class=\"code-keyword\">import</span> matplotlib.pyplot <span class=\"code-keyword\">as</span> plt\n\nmonths = [<span class=\"code-string\">\"Jan\"</span>, <span class=\"code-string\">\"Feb\"</span>, <span class=\"code-string\">\"Mar\"</span>, <span class=\"code-string\">\"Apr\"</span>]\nrevenue = [<span class=\"code-number\">120</span>, <span class=\"code-number\">150</span>, <span class=\"code-number\">135</span>, <span class=\"code-number\">170</span>]\nmargin_pct = [<span class=\"code-number\">18.5</span>, <span class=\"code-number\">22.0</span>, <span class=\"code-number\">19.2</span>, <span class=\"code-number\">25.1</span>]\n\n<span class=\"code-comment\"># Modern constrained layout eliminates title/label overlaps</span>\nfig, (ax_left, ax_right) = plt.subplots(<span class=\"code-number\">1</span>, <span class=\"code-number\">2</span>, figsize=(<span class=\"code-number\">10</span>, <span class=\"code-number\">3.2</span>), constrained_layout=<span class=\"code-keyword\">True</span>)\n\n<span class=\"code-comment\"># Left Panel: Primary bar chart + twinx percentage overlay</span>\nax_left.bar(months, revenue, color=<span class=\"code-string\">\"#93C5FD\"</span>, label=<span class=\"code-string\">\"Revenue ($k)\"</span>)\nax_left.set_ylabel(<span class=\"code-string\">\"Gross Revenue ($k)\"</span>, color=<span class=\"code-string\">\"#1E3A8A\"</span>)\ntwin = ax_left.twinx()\ntwin.plot(months, margin_pct, color=<span class=\"code-string\">\"#DC2626\"</span>, marker=<span class=\"code-string\">\"o\"</span>, linewidth=<span class=\"code-number\">2</span>, label=<span class=\"code-string\">\"Margin %\"</span>)\ntwin.set_ylabel(<span class=\"code-string\">\"Operating Margin (%)\"</span>, color=<span class=\"code-string\">\"#DC2626\"</span>)\nax_left.set_title(<span class=\"code-string\">\"Revenue vs Margin Dynamics\"</span>, loc=<span class=\"code-string\">\"left\"</span>, fontweight=<span class=\"code-string\">\"bold\"</span>)\n\n<span class=\"code-comment\"># Right Panel: Focused pie allocation (only &le; 4 categories)</span>\nax_right.pie([<span class=\"code-number\">45</span>, <span class=\"code-number\">30</span>, <span class=\"code-number\">15</span>, <span class=\"code-number\">10</span>], labels=[<span class=\"code-string\">\"SaaS\"</span>, <span class=\"code-string\">\"Services\"</span>, <span class=\"code-string\">\"Ads\"</span>, <span class=\"code-string\">\"Other\"</span>], autopct=<span class=\"code-string\">\"%1.0f%%\"</span>,\n             colors=[<span class=\"code-string\">\"#60A5FA\"</span>, <span class=\"code-string\">\"#34D399\"</span>, <span class=\"code-string\">\"#FBBF24\"</span>, <span class=\"code-string\">\"#F87171\"</span>], startangle=<span class=\"code-number\">90</span>)\nax_right.set_title(<span class=\"code-string\">\"Revenue Channel Share\"</span>, loc=<span class=\"code-string\">\"left\"</span>, fontweight=<span class=\"code-string\">\"bold\"</span>)\n\nfig.suptitle(<span class=\"code-string\">\"Executive Enterprise Dashboard\"</span>, fontsize=<span class=\"code-number\">12</span>, fontweight=<span class=\"code-string\">\"bold\"</span>)\nplt.close(fig)</code></pre>\n      </div>\n    </div>\n  </div>\n</div>\n\n<!-- ═══════════════ SECTION 07: LABELING MASTERY ═══════════════ -->\n<div class=\"slide-section\" id=\"day22Section07\">\n  <h2 class=\"slide-section-title heading-box-wrap heading-with-audio\" id=\"headingLabeling\">\n    <span class=\"heading-num-box\">07</span>\n    <span class=\"heading-title-box\">\n      <span class=\"heading-title-text\"><span class=\"heading-icon\">🏷️</span> Titles, Labels & Spines</div>\n      <button class=\"audio-play-btn\" onclick=\"playAudio('Day22/New_PyDay22Audio07.mp3', this)\" title=\"Play narration\">\n        <svg class=\"audio-play-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><polygon points=\"5 3 19 12 5 21 5 3\"></polygon></svg>\n        <svg class=\"audio-pause-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><rect x=\"6\" y=\"4\" width=\"4\" height=\"16\"></rect><rect x=\"14\" y=\"4\" width=\"4\" height=\"16\"></rect></svg>\n      </button>\n    </span>\n  </h2>\n  <p class=\"section-intro-text\">\n    A visualization without thoughtful labeling is an ambiguous puzzle. Professional corporate reporting demands maximum data-to-ink ratio (Edward Tufte's principle): stripping non-informative visual borders (\"spines\"), formatting large numbers into standard business abbreviations (e.g. <code>$1.2M</code> instead of <code>1200000.0</code>), rotating dense tick labels, and placing legends where they never obstruct data curves.\n  </p>\n\n  <div class=\"topic-subcard\">\n    <div class=\"table-header-wrap\">\n      <h4 class=\"table-header-title\">The Complete Labeling &amp; Formatting Toolkit</h4>\n        <div class=\"table-header-actions\">\n        <div class=\"table-search-box\">\n        <svg class=\"table-search-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"11\" cy=\"11\" r=\"8\"></circle><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"></line></svg>\n        <input type=\"text\" class=\"table-search-input\" placeholder=\"Filter table...\" onkeyup=\"filterTable(this)\">\n        </div>\n        </div>\n    </div>\n    <div class=\"db-mock-table-wrap\">\n      <table class=\"db-table-mock arith-sticky-table\">\n        <thead>\n          <tr>\n            <th>Styling Goal</th>\n            <th>Primary Method Call</th>\n            <th>Key Modifiers &amp; Arguments</th>\n            <th>Visual Effect</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n            <td>Clear Titles &amp; Labels</td>\n            <td><code>ax.set_title()</code>, <code>ax.set_xlabel()</code></td>\n            <td><code>loc='left'</code>, <code>fontweight='bold'</code></td>\n            <td>Delivers an unambiguous takeaway message before data inspection.</td>\n          </tr>\n          <tr>\n            <td>Spine Stripping</td>\n            <td><code>ax.spines[['top', 'right']].set_visible(False)</code></td>\n            <td>Pass list of spine keys</td>\n            <td>Removes visual box prison, creating modern open editorial layout.</td>\n          </tr>\n          <tr>\n            <td>Number Formatting</td>\n            <td><code>ax.yaxis.set_major_formatter(FuncFormatter(...))</code></td>\n            <td><code>lambda v, _: f\"{v/1e6:.1f}M\"</code></td>\n            <td>Converts raw millions or thousands into compact executive notation.</td>\n          </tr>\n          <tr>\n            <td>Percent Formatting</td>\n            <td><code>ax.yaxis.set_major_formatter(PercentFormatter(1.0))</code></td>\n            <td><code>xmax=1.0</code> for ratios</td>\n            <td>Automatically formats <code>0.25</code> as <code>25%</code>.</td>\n          </tr>\n          <tr>\n            <td>Legend Placement</td>\n            <td><code>ax.legend(bbox_to_anchor=(1.02, 1), loc='upper left')</code></td>\n            <td><code>bbox_to_anchor</code> coordinates</td>\n            <td>Places legend outside plot area to avoid blocking data curves.</td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n  </div>\n\n  <div class=\"topic-subcard\">\n    <div class=\"table-header-wrap\">\n      <h4 class=\"table-header-title\">Executive Presentation Styling: Currency Formatter &amp; Minimal Spines</h4>\n    </div>\n    <div class=\"mental-model-card\">\n      <div class=\"code-subblock-traffic-lights\">\n        <span class=\"traffic-light-dot red\"></span>\n        <span class=\"traffic-light-dot yellow\"></span>\n        <span class=\"traffic-light-dot green\"></span>\n        <span class=\"code-subblock-title\">executive_presentation_styling.py — Clean Editorial Data Presentation</span>\n      </div>\n      <div class=\"py-code-box\">\n        <pre><code><span class=\"code-keyword\">import</span> numpy <span class=\"code-keyword\">as</span> np\n<span class=\"code-keyword\">import</span> matplotlib.pyplot <span class=\"code-keyword\">as</span> plt\n<span class=\"code-keyword\">from</span> matplotlib.ticker <span class=\"code-keyword\">import</span> FuncFormatter\n\nyears = np.arange(<span class=\"code-number\">2018</span>, <span class=\"code-number\">2027</span>)\nrev = np.array([<span class=\"code-number\">1.2</span>, <span class=\"code-number\">1.5</span>, <span class=\"code-number\">1.4</span>, <span class=\"code-number\">2.1</span>, <span class=\"code-number\">2.8</span>, <span class=\"code-number\">3.1</span>, <span class=\"code-number\">3.9</span>, <span class=\"code-number\">4.6</span>, <span class=\"code-number\">5.2</span>]) * <span class=\"code-number\">1e6</span>\n\nfig, ax = plt.subplots(figsize=(<span class=\"code-number\">7</span>, <span class=\"code-number\">3.2</span>))\nax.plot(years, rev, color=<span class=\"code-string\">\"#7C3AED\"</span>, linewidth=<span class=\"code-number\">2.5</span>, marker=<span class=\"code-string\">\"o\"</span>)\nax.fill_between(years, rev, alpha=<span class=\"code-number\">0.12</span>, color=<span class=\"code-string\">\"#7C3AED\"</span>)\n\n<span class=\"code-comment\"># Format y-axis ticks into millions ($M)</span>\nax.yaxis.set_major_formatter(FuncFormatter(<span class=\"code-keyword\">lambda</span> v, _: <span class=\"code-string\">f\"${v / 1e6:.1f}M\"</span>))\n\n<span class=\"code-comment\"># Declutter: Strip top and right frame borders</span>\nax.spines[[<span class=\"code-string\">\"top\"</span>, <span class=\"code-string\">\"right\"</span>]].set_visible(<span class=\"code-keyword\">False</span>)\nax.set_title(<span class=\"code-string\">\"Annual Enterprise ARR: FY2018 - FY2026\"</span>, loc=<span class=\"code-string\">\"left\"</span>, fontweight=<span class=\"code-string\">\"bold\"</span>)\nax.set_ylabel(<span class=\"code-string\">\"Annual Recurring Revenue\"</span>)\nplt.tight_layout()\nplt.close(fig)</code></pre>\n      </div>\n    </div>\n  </div>\n</div>\n\n<!-- ═══════════════ SECTION 08: VISUAL ANNOTATIONS & EMPHASIS ═══════════════ -->\n<div class=\"slide-section\" id=\"day22Section08\">\n  <h2 class=\"slide-section-title heading-box-wrap heading-with-audio\" id=\"headingAnnotations\">\n    <span class=\"heading-num-box\">08</span>\n    <span class=\"heading-title-box\">\n      <span class=\"heading-title-text\"><span class=\"heading-icon\">🎯</span> Annotations & Arrows</div>\n      <button class=\"audio-play-btn\" onclick=\"playAudio('Day22/New_PyDay22Audio08.mp3', this)\" title=\"Play narration\">\n        <svg class=\"audio-play-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><polygon points=\"5 3 19 12 5 21 5 3\"></polygon></svg>\n        <svg class=\"audio-pause-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><rect x=\"6\" y=\"4\" width=\"4\" height=\"16\"></rect><rect x=\"14\" y=\"4\" width=\"4\" height=\"16\"></rect></svg>\n      </button>\n    </span>\n  </h2>\n  <p class=\"section-intro-text\">\n    Annotations bridge raw statistical data with narrative business intelligence. Rather than forcing executives to decode an obscure outlier by referencing external spreadsheets, an engineer directly highlights anomalies using <code>ax.annotate()</code> with vector arrows, benchmark thresholds via <code>ax.axhline()</code>, and shaded confidence intervals via <code>ax.fill_between()</code>.\n  </p>\n\n  <div class=\"topic-subcard\">\n    <div class=\"table-header-wrap\">\n      <h4 class=\"table-header-title\">Annotation &amp; Reference Graphic Primitives</h4>\n        <div class=\"table-header-actions\">\n        <div class=\"table-search-box\">\n        <svg class=\"table-search-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"11\" cy=\"11\" r=\"8\"></circle><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"></line></svg>\n        <input type=\"text\" class=\"table-search-input\" placeholder=\"Filter table...\" onkeyup=\"filterTable(this)\">\n        </div>\n        </div>\n    </div>\n    <div class=\"db-mock-table-wrap\">\n      <table class=\"db-table-mock arith-sticky-table\">\n        <thead>\n          <tr>\n            <th>Annotation Method</th>\n            <th>Primary Parameters</th>\n            <th>Coordinate System</th>\n            <th>Use Case &amp; Best Practice</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n            <td><code>ax.annotate()</code></td>\n            <td><code>text, xy, xytext, arrowprops</code></td>\n            <td>Data coordinates (<code>xy</code>) to text offset (<code>xytext</code>)</td>\n            <td>Callouts for structural dips, product launches, or policy changes.</td>\n          </tr>\n          <tr>\n            <td><code>ax.axhline(y)</code></td>\n            <td><code>y, color, linestyle, linewidth</code></td>\n            <td>Data y, spanning 0 to 1 across axes width</td>\n            <td>Static budget ceilings, SLA upper bounds, or zero breakeven marks.</td>\n          </tr>\n          <tr>\n            <td><code>ax.axvline(x)</code></td>\n            <td><code>x, color, linestyle, linewidth</code></td>\n            <td>Data x, spanning 0 to 1 across axes height</td>\n            <td>Major release dates, economic shocks, or model retraining epochs.</td>\n          </tr>\n          <tr>\n            <td><code>ax.axhspan(ymin, ymax)</code></td>\n            <td><code>ymin, ymax, alpha, color</code></td>\n            <td>Horizontal data band across full width</td>\n            <td>Defines acceptable SLA latency bands or healthy tolerance zones.</td>\n          </tr>\n          <tr>\n            <td><code>ax.fill_between()</code></td>\n            <td><code>x, y1, y2, alpha, color</code></td>\n            <td>Area between two continuous curves</td>\n            <td>Confidence intervals, forecast ranges, or cumulative delta volumes.</td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n  </div>\n\n  <div class=\"topic-subcard\">\n    <div class=\"table-header-wrap\">\n      <h4 class=\"table-header-title\">Annotating Anomaly Dip with Arrow Callout &amp; Benchmark Threshold</h4>\n    </div>\n    <div class=\"mental-model-card\">\n      <div class=\"code-subblock-traffic-lights\">\n        <span class=\"traffic-light-dot red\"></span>\n        <span class=\"traffic-light-dot yellow\"></span>\n        <span class=\"traffic-light-dot green\"></span>\n        <span class=\"code-subblock-title\">annotated_anomaly_detection.py — Precision Directed Annotations</span>\n      </div>\n      <div class=\"py-code-box\">\n        <pre><code><span class=\"code-keyword\">import</span> numpy <span class=\"code-keyword\">as</span> np\n<span class=\"code-keyword\">import</span> matplotlib.pyplot <span class=\"code-keyword\">as</span> plt\n\nyears = np.array([<span class=\"code-number\">2018</span>, <span class=\"code-number\">2019</span>, <span class=\"code-number\">2020</span>, <span class=\"code-number\">2021</span>, <span class=\"code-number\">2022</span>, <span class=\"code-number\">2023</span>])\narr = np.array([<span class=\"code-number\">1.2</span>, <span class=\"code-number\">1.8</span>, <span class=\"code-number\">1.4</span>, <span class=\"code-number\">2.6</span>, <span class=\"code-number\">3.4</span>, <span class=\"code-number\">4.5</span>])\n\nfig, ax = plt.subplots(figsize=(<span class=\"code-number\">6.8</span>, <span class=\"code-number\">3.2</span>))\nax.plot(years, arr, marker=<span class=\"code-string\">\"o\"</span>, color=<span class=\"code-string\">\"#2563EB\"</span>, linewidth=<span class=\"code-number\">2</span>)\n\n<span class=\"code-comment\"># Target baseline marker across full span</span>\nax.axhline(<span class=\"code-number\">3.0</span>, color=<span class=\"code-string\">\"#94A3B8\"</span>, linestyle=<span class=\"code-string\">\":\"</span>, label=<span class=\"code-string\">\"Target ($3M)\"</span>)\n\n<span class=\"code-comment\"># Direct Annotation with Arrow Pointer</span>\nax.annotate(\n    <span class=\"code-string\">\"Pandemic Dip (-22%)\"</span>,\n    xy=(<span class=\"code-number\">2020</span>, <span class=\"code-number\">1.4</span>),\n    xytext=(<span class=\"code-number\">2020.3</span>, <span class=\"code-number\">2.3</span>),\n    arrowprops=<span class=\"code-builtin\">dict</span>(arrowstyle=<span class=\"code-string\">\"->\"</span>, color=<span class=\"code-string\">\"#DC2626\"</span>, lw=<span class=\"code-number\">1.5</span>),\n    fontweight=<span class=\"code-string\">\"bold\"</span>,\n    color=<span class=\"code-string\">\"#DC2626\"</span>\n)\n\nax.set_title(<span class=\"code-string\">\"Enterprise ARR Trajectory with Macro Anomaly Callout\"</span>, loc=<span class=\"code-string\">\"left\"</span>, fontweight=<span class=\"code-string\">\"bold\"</span>)\nax.set_ylabel(<span class=\"code-string\">\"ARR ($M)\"</span>)\nax.legend()\nplt.tight_layout()\nplt.close(fig)</code></pre>\n      </div>\n    </div>\n  </div>\n</div>\n\n<!-- ═══════════════ SECTION 09: STYLING, THEMES & PUBLICATION FIGURES ═══════════════ -->\n<div class=\"slide-section\" id=\"day22Section09\">\n  <h2 class=\"slide-section-title heading-box-wrap heading-with-audio\" id=\"headingStylingSaving\">\n    <span class=\"heading-num-box\">09</span>\n    <span class=\"heading-title-box\">\n      <span class=\"heading-title-text\"><span class=\"heading-icon\">💎</span> Styles, Themes & Exporting</div>\n      <button class=\"audio-play-btn\" onclick=\"playAudio('Day22/New_PyDay22Audio09.mp3', this)\" title=\"Play narration\">\n        <svg class=\"audio-play-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><polygon points=\"5 3 19 12 5 21 5 3\"></polygon></svg>\n        <svg class=\"audio-pause-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><rect x=\"6\" y=\"4\" width=\"4\" height=\"16\"></rect><rect x=\"14\" y=\"4\" width=\"4\" height=\"16\"></rect></svg>\n      </button>\n    </span>\n  </h2>\n  <p class=\"section-intro-text\">\n    High-impact graphics require high-fidelity rendering. Global themes can be set with <code>plt.style.use()</code> or scoped within temporary context managers (<code>plt.rc_context()</code>). When saving publication figures for academic papers, slide decks, or web dashboards, engineers configure resolution (<code>dpi=300</code>), vector formats (SVG, PDF) for infinite scalability, and <code>bbox_inches='tight'</code> to ensure legends and titles are never clipped.\n  </p>\n\n  <div class=\"topic-subcard\">\n    <div class=\"table-header-wrap\">\n      <h4 class=\"table-header-title\">Image Export Formats &amp; Engineering Trade-Offs</h4>\n        <div class=\"table-header-actions\">\n        <div class=\"table-search-box\">\n        <svg class=\"table-search-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"11\" cy=\"11\" r=\"8\"></circle><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"></line></svg>\n        <input type=\"text\" class=\"table-search-input\" placeholder=\"Filter table...\" onkeyup=\"filterTable(this)\">\n        </div>\n        </div>\n    </div>\n    <div class=\"db-mock-table-wrap\">\n      <table class=\"db-table-mock arith-sticky-table\">\n        <thead>\n          <tr>\n            <th>Export Format</th>\n            <th>Type</th>\n            <th>Primary Command</th>\n            <th>Resolution &amp; File Size Profile</th>\n            <th>Target Medium</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n            <td>PNG</td>\n            <td>Raster</td>\n            <td><code>fig.savefig('p.png', dpi=300)</code></td>\n            <td>Fixed pixel grid; size scales with <code>width &times; height &times; dpi^2</code></td>\n            <td>Websites, Slack notifications, PowerPoint slides.</td>\n          </tr>\n          <tr>\n            <td>SVG</td>\n            <td>Vector (XML)</td>\n            <td><code>fig.savefig('p.svg')</code></td>\n            <td>Infinite resolution; scales with number of Artist glyphs</td>\n            <td>Interactive web apps, D3.js embeddings, print layouts.</td>\n          </tr>\n          <tr>\n            <td>PDF</td>\n            <td>Vector</td>\n            <td><code>fig.savefig('p.pdf')</code></td>\n            <td>Infinite resolution; embedded fonts &amp; true paths</td>\n            <td>Academic publications, LaTeX papers, formal annual reports.</td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n  </div>\n\n  <div class=\"topic-subcard\">\n    <div class=\"table-header-wrap\">\n      <h4 class=\"table-header-title\">Production Figure Export Routine with Tight Bounding Boxes</h4>\n    </div>\n    <div class=\"mental-model-card\">\n      <div class=\"code-subblock-traffic-lights\">\n        <span class=\"traffic-light-dot red\"></span>\n        <span class=\"traffic-light-dot yellow\"></span>\n        <span class=\"traffic-light-dot green\"></span>\n        <span class=\"code-subblock-title\">publication_export_pipeline.py — Multi-Format Serialization</span>\n      </div>\n      <div class=\"py-code-box\">\n        <pre><code><span class=\"code-keyword\">import</span> matplotlib.pyplot <span class=\"code-keyword\">as</span> plt\n\n<span class=\"code-comment\"># Apply temporary styling context without polluting global runtime</span>\n<span class=\"code-keyword\">with</span> plt.rc_context({<span class=\"code-string\">\"font.size\"</span>: <span class=\"code-number\">10</span>, <span class=\"code-string\">\"lines.linewidth\"</span>: <span class=\"code-number\">2.5</span>}):\n    fig, ax = plt.subplots(figsize=(<span class=\"code-number\">6</span>, <span class=\"code-number\">3</span>))\n    ax.plot([<span class=\"code-number\">1</span>, <span class=\"code-number\">2</span>, <span class=\"code-number\">3</span>], [<span class=\"code-number\">10</span>, <span class=\"code-number\">25</span>, <span class=\"code-number\">15</span>], color=<span class=\"code-string\">\"#059669\"</span>)\n    ax.set_title(<span class=\"code-string\">\"Publication Ready Metrics\"</span>)\n\n    <span class=\"code-comment\"># 1. High-Resolution PNG (Raster for slides and web)</span>\n    fig.savefig(<span class=\"code-string\">\"figure.png\"</span>, dpi=<span class=\"code-number\">300</span>, bbox_inches=<span class=\"code-string\">\"tight\"</span>, transparent=<span class=\"code-keyword\">False</span>)\n\n    <span class=\"code-comment\"># 2. Scalable Vector Graphics (Infinite crispness in browsers)</span>\n    fig.savefig(<span class=\"code-string\">\"figure.svg\"</span>, bbox_inches=<span class=\"code-string\">\"tight\"</span>)\n\n    <span class=\"code-comment\"># 3. PDF for Academic / Print Documents</span>\n    fig.savefig(<span class=\"code-string\">\"figure.pdf\"</span>, bbox_inches=<span class=\"code-string\">\"tight\"</span>)\n\n    <span class=\"code-comment\"># Crucial: Always free figure canvas memory</span>\n    plt.close(fig)</code></pre>\n      </div>\n    </div>\n  </div>\n</div>\n\n<!-- ═══════════════ SECTION 10: PRODUCTION VISUALIZATION & FAANG SPOTLIGHT ═══════════════ -->\n<div class=\"slide-section\" id=\"day22Section10\">\n  <h2 class=\"slide-section-title heading-box-wrap heading-with-audio\" id=\"headingProductionMatplotlib\">\n    <span class=\"heading-num-box\">10</span>\n    <span class=\"heading-title-box\">\n      <span class=\"heading-title-text\"><span class=\"heading-icon\">🛡️</span> Review & Interview Questions</div>\n      <button class=\"audio-play-btn\" onclick=\"playAudio('Day22/New_PyDay22Audio10.mp3', this)\" title=\"Play narration\">\n        <svg class=\"audio-play-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><polygon points=\"5 3 19 12 5 21 5 3\"></polygon></svg>\n        <svg class=\"audio-pause-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><rect x=\"6\" y=\"4\" width=\"4\" height=\"16\"></rect><rect x=\"14\" y=\"4\" width=\"4\" height=\"16\"></rect></svg>\n      </button>\n    </span>\n  </h2>\n  <p class=\"section-intro-text\">\n    Running Matplotlib in high-concurrency microservices, report workers, or automated batch jobs introduces severe architectural vulnerabilities: process-wide figure memory leaks from Pyplot's module-level registry (<code>_pylab_helpers.Gcf</code>), multi-threaded data collisions on shared <code>plt.gca()</code> pointers, and heavy memory bloat from uncompressed RGBA pixel buffers. Below is the deep dive autopsy, the 10 critical anti-patterns, and 25 elite FAANG technical interview questions.\n  </p>\n\n  <!-- Engineering Deep Dive Card -->\n  <div class=\"topic-subcard\">\n    <div class=\"table-header-wrap\">\n      <h4 class=\"table-header-title\">Engineering Deep Dive: The Pyplot Figure Registry &amp; Multi-Threaded Memory Leaks</h4>\n    </div>\n    <p class=\"section-intro-text\">\n      <strong>The Bottleneck:</strong> A reporting microservice renders tenant latency charts using <code>plt.figure()</code> and <code>plt.plot()</code>. Under continuous requests, the service's resident memory (RSS) climbs by dozens of megabytes per minute until the Linux OOM-killer terminates the container. Concurrently, tenants report that lines from other organizations' metrics appear on their private charts!\n    </p>\n    <p class=\"section-intro-text\">\n      <strong>CPython Runtime Mechanics:</strong> <code>matplotlib.pyplot</code> is a state machine. Every invocation of <code>plt.figure()</code> or <code>plt.subplots()</code> creates a <code>FigureManager</code> and registers it in <code>_pylab_helpers.Gcf</code>, a module-level dictionary. <em>Nothing removes a figure from this dictionary except an explicit <code>plt.close(fig)</code> call!</em> Because Figures and their child Artists hold strong back-references to each other (<code>artist.axes</code> and <code>axes.figure</code>), circular reference cycles exist. Normal CPython reference counting cannot free them; even after <code>del fig</code>, memory is trapped until the cyclic garbage collector runs. Furthermore, <code>plt.gca()</code> points to a process-wide variable without thread locks; concurrent threads calling <code>plt.plot()</code> interleave their commands onto the same current Axes!\n    </p>\n    <div class=\"mental-model-card\">\n      <div class=\"code-subblock-traffic-lights\">\n        <span class=\"traffic-light-dot red\"></span>\n        <span class=\"traffic-light-dot yellow\"></span>\n        <span class=\"traffic-light-dot green\"></span>\n        <span class=\"code-subblock-title\">thread_safe_chart_worker.py — Registry-Free Pure OOP Rendering</span>\n      </div>\n      <div class=\"py-code-box\">\n        <pre><code><span class=\"code-keyword\">import</span> io\n<span class=\"code-keyword\">from</span> matplotlib.figure <span class=\"code-keyword\">import</span> Figure\n<span class=\"code-keyword\">from</span> matplotlib.backends.backend_agg <span class=\"code-keyword\">import</span> FigureCanvasAgg\n\n<span class=\"code-keyword\">def</span> <span class=\"code-title\">render_tenant_chart</span>(tenant_id: <span class=\"code-builtin\">str</span>, timestamps: <span class=\"code-builtin\">list</span>, latencies: <span class=\"code-builtin\">list</span>) -> <span class=\"code-builtin\">bytes</span>:\n    <span class=\"code-string\">\"\"\"Renders a latency chart completely bypassing pyplot's global registry.\n    Thread-safe, non-leaking, and immune to concurrent gca() state corruption.\n    \"\"\"</span>\n    <span class=\"code-comment\"># 1. Instantiate pure Figure instance (NOT registered in pyplot's Gcf)</span>\n    fig = Figure(figsize=(<span class=\"code-number\">7</span>, <span class=\"code-number\">3.2</span>), dpi=<span class=\"code-number\">100</span>)\n    FigureCanvasAgg(fig)\n    \n    <span class=\"code-comment\"># 2. Draw strictly through instance subplots</span>\n    ax = fig.subplots()\n    ax.plot(timestamps, latencies, color=<span class=\"code-string\">\"#2563EB\"</span>, linewidth=<span class=\"code-number\">2</span>)\n    ax.set_title(<span class=\"code-string\">f\"Tenant: {tenant_id} Latency Profile\"</span>, loc=<span class=\"code-string\">\"left\"</span>, fontweight=<span class=\"code-string\">\"bold\"</span>)\n    ax.set_ylabel(<span class=\"code-string\">\"P99 (ms)\"</span>)\n    \n    <span class=\"code-comment\"># 3. Stream to in-memory byte buffer</span>\n    buffer = io.BytesIO()\n    fig.savefig(buffer, format=<span class=\"code-string\">\"png\"</span>, bbox_inches=<span class=\"code-string\">\"tight\"</span>)\n    <span class=\"code-keyword\">return</span> buffer.getvalue()</code></pre>\n      </div>\n    </div>\n  </div>\n\n  <!-- Master Quick Reference Table -->\n  <div class=\"topic-subcard\">\n    <div class=\"table-header-wrap\">\n      <h4 class=\"table-header-title\">Master Quick Reference: Complete Matplotlib Visual Syntax</h4>\n        <div class=\"table-header-actions\">\n        <div class=\"table-search-box\">\n        <svg class=\"table-search-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"11\" cy=\"11\" r=\"8\"></circle><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"></line></svg>\n        <input type=\"text\" class=\"table-search-input\" placeholder=\"Filter table...\" onkeyup=\"filterTable(this)\">\n        </div>\n        </div>\n    </div>\n    <div class=\"db-mock-table-wrap\">\n      <table class=\"db-table-mock arith-sticky-table\">\n        <thead>\n          <tr>\n            <th>Plotting Operation</th>\n            <th>Idiomatic Python / Matplotlib Pattern</th>\n            <th>Key Modifiers &amp; Edge Cases</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n            <td>Init Canvas &amp; Axes</td>\n            <td><code>fig, ax = plt.subplots(figsize=(7, 3.5))</code></td>\n            <td>Use <code>constrained_layout=True</code> for multi-panel grids</td>\n          </tr>\n          <tr>\n            <td>Line Chart</td>\n            <td><code>ax.plot(x, y, marker='o', ls='--', lw=2)</code></td>\n            <td>Always supply <code>label='...'</code> for legend generation</td>\n          </tr>\n          <tr>\n            <td>Vertical Bar Chart</td>\n            <td><code>ax.bar(categories, values, color='#3B82F6')</code></td>\n            <td>Attach labels via <code>ax.bar_label(bars)</code></td>\n          </tr>\n          <tr>\n            <td>Horizontal Bar Chart</td>\n            <td><code>ax.barh(categories, values)</code></td>\n            <td>Sort categories with <code>np.argsort()</code> first</td>\n          </tr>\n          <tr>\n            <td>Scatter (4-Variable)</td>\n            <td><code>sc = ax.scatter(x, y, s=sizes, c=colors, cmap='viridis')</code></td>\n            <td>Pair with <code>fig.colorbar(sc, ax=ax)</code></td>\n          </tr>\n          <tr>\n            <td>Histogram (Auto Bins)</td>\n            <td><code>counts, edges, _ = ax.hist(data, bins='auto')</code></td>\n            <td>Use <code>density=True</code> for probability density functions</td>\n          </tr>\n          <tr>\n            <td>Subplots Grid</td>\n            <td><code>fig, axes = plt.subplots(2, 2, sharex=True)</code></td>\n            <td>Access via 2D index <code>axes[r, c]</code></td>\n          </tr>\n          <tr>\n            <td>Dual Axis (Twin)</td>\n            <td><code>twin = ax.twinx()</code></td>\n            <td>Matches X axis while allowing independent right Y axis</td>\n          </tr>\n          <tr>\n            <td>Direct Annotation</td>\n            <td><code>ax.annotate('Dip', xy=(x, y), xytext=(x1, y1), arrowprops=...)</code></td>\n            <td>Directs focus without forcing legend cross-referencing</td>\n          </tr>\n          <tr>\n            <td>Export High-Res Image</td>\n            <td><code>fig.savefig('plot.png', dpi=300, bbox_inches='tight')</code></td>\n            <td>Always call <code>plt.close(fig)</code> immediately after saving</td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n  </div>\n\n  <!-- The 10 Critical Matplotlib Anti-Patterns -->\n  <div class=\"topic-subcard\">\n    <div class=\"table-header-wrap\">\n      <h4 class=\"table-header-title\">The 10 Critical Matplotlib Anti-Patterns (Root Cause &amp; Production Fix)</h4>\n        <div class=\"table-header-actions\">\n        <div class=\"table-search-box\">\n        <svg class=\"table-search-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"11\" cy=\"11\" r=\"8\"></circle><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"></line></svg>\n        <input type=\"text\" class=\"table-search-input\" placeholder=\"Filter table...\" onkeyup=\"filterTable(this)\">\n        </div>\n        </div>\n    </div>\n    <div class=\"db-mock-table-wrap\">\n      <table class=\"db-table-mock db-table-mock--compact anti-pattern-table arith-sticky-table\">\n        <thead>\n          <tr>\n            <th>Anti-Pattern Code</th>\n            <th>What Happens (Symptom)</th>\n            <th>Why It Fails (Root Cause)</th>\n            <th>Production Safe Pattern</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n            <td><code class=\"ap-code-bad\">plt.plot()</code> + <code class=\"ap-code-bad\">ax.plot()</code> mix</td>\n            <td><span class=\"ap-result-bad\">Marks land on wrong axis</span></td>\n            <td>Stateful <code>plt</code> calls target implicit \"current\" axes, which may differ from <code>ax</code>.</td>\n            <td><code class=\"ap-code-fix\">fig, ax = plt.subplots() then only call ax.*</code></td>\n          </tr>\n          <tr>\n            <td><code class=\"ap-code-bad\">Missing plt.close(fig)</code></td>\n            <td><span class=\"ap-result-bad\">OOM leak; >20 figures warning</span></td>\n            <td><code>_pylab_helpers.Gcf</code> holds strong references indefinitely in module memory.</td>\n            <td><code class=\"ap-code-fix\">Always plt.close(fig) or use OOP Figure()</code></td>\n          </tr>\n          <tr>\n            <td><code class=\"ap-code-bad\">Truncated bar baseline</code></td>\n            <td><span class=\"ap-result-bad\">Perceptually misleading charts</span></td>\n            <td>Cutting the y-axis exaggerates tiny numerical differences into massive visual columns.</td>\n            <td><code class=\"ap-code-fix\">ax.set_ylim(0, None) strictly on bar charts</code></td>\n          </tr>\n          <tr>\n            <td><code class=\"ap-code-bad\">Overlapping subplots</code></td>\n            <td><span class=\"ap-result-bad\">Titles collide with axis labels</span></td>\n            <td>Default bounding boxes ignore label margins in dense multi-axes grids.</td>\n            <td><code class=\"ap-code-fix\">constrained_layout=True in plt.subplots()</code></td>\n          </tr>\n          <tr>\n            <td><code class=\"ap-code-bad\">Rainbow / Jet colormap</code></td>\n            <td><span class=\"ap-result-bad\">Inaccessible; false visual bands</span></td>\n            <td>Jet lacks monotonic luminance progression and fails color-blind viewers.</td>\n            <td><code class=\"ap-code-fix\">Use 'viridis', 'plasma', or 'coolwarm'</code></td>\n          </tr>\n          <tr>\n            <td><code class=\"ap-code-bad\">Dates passed as raw strings</code></td>\n            <td><span class=\"ap-result-bad\">Categorical / alphabetical disorder</span></td>\n            <td>Strings are treated as arbitrary categories rather than continuous chronological time.</td>\n            <td><code class=\"ap-code-fix\">Convert with pd.to_datetime() before plotting</code></td>\n          </tr>\n          <tr>\n            <td><code class=\"ap-code-bad\">Plotting millions of points</code></td>\n            <td><span class=\"ap-result-bad\">Browser crashes / huge raster lag</span></td>\n            <td>Allocates millions of distinct Line2D artists or massive vector path buffers.</td>\n            <td><code class=\"ap-code-fix\">Hexbin, 2D histogram, or rasterized=True</code></td>\n          </tr>\n          <tr>\n            <td><code class=\"ap-code-bad\">Misleading twinx() scales</code></td>\n            <td><span class=\"ap-result-bad\">Implies false causality/correlation</span></td>\n            <td>Two arbitrary vertical scales can be manipulated to visually mimic each other.</td>\n            <td><code class=\"ap-code-fix\">Use side-by-side subplots with shared x</code></td>\n          </tr>\n          <tr>\n            <td><code class=\"ap-code-bad\">del fig without plt.close()</code></td>\n            <td><span class=\"ap-result-bad\">Memory NOT released</span></td>\n            <td>Circular back-references (artist &harr; axes &harr; figure) keep refcount above zero.</td>\n            <td><code class=\"ap-code-fix\">plt.close(fig); gc.collect() in batch loops</code></td>\n          </tr>\n          <tr>\n            <td><code class=\"ap-code-bad\">plt.savefig() after show()</code></td>\n            <td><span class=\"ap-result-bad\">Saved file is completely blank</span></td>\n            <td>In GUI backends, <code>plt.show()</code> flushes and clears the figure canvas upon closing.</td>\n            <td><code class=\"ap-code-fix\">Always call fig.savefig() BEFORE plt.show()</code></td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n  </div>\n\n  <!-- FAANG Interview Spotlight: Top 25 Questions -->\n  <div class=\"topic-subcard\">\n    <div class=\"table-header-wrap\">\n      <h4 class=\"table-header-title\">\n        <span style=\"display:inline-flex; align-items:center; gap:8px;\">\n          <span>🎯</span> FAANG Interview Spotlight: Top 25 Technical Matplotlib Questions\n        </span>\n      </h4>\n    </div>\n    <div class=\"interview-box\">\n\n      <div class=\"interview-item\" id=\"pyDay26IQ1\">\n        <p class=\"interview-question\"><strong>Q1: What is the fundamental architectural difference between the pyplot interface and the Object-Oriented interface?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: The pyplot interface (e.g. plt.plot) is a stateful convenience wrapper that mutates hidden global state pointers (plt.gcf() and plt.gca()). The Object-Oriented interface (fig, ax = plt.subplots()) explicitly returns the Figure canvas and Axes instances, providing fine-grained control over subplots, preventing thread race conditions, and enabling non-leaking enterprise pipelines.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n\n      <div class=\"interview-item\" id=\"pyDay26IQ2\">\n        <p class=\"interview-question\"><strong>Q2: Explain the distinct roles of Figure, Axes, and Axis objects.</strong></p>\n        <div class=\"interview-answer\"><p><em>A: A Figure is the top-level canvas and pixel buffer that contains all graphic elements. An Axes is an individual plot bounded by coordinates, containing titles, labels, grids, and plotted data marks. An Axis (ax.xaxis/ax.yaxis) is a child of an Axes that governs numeric limits, tick placement, and tick label formatting.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n\n      <div class=\"interview-item\" id=\"pyDay26IQ3\">\n        <p class=\"interview-question\"><strong>Q3: Why must fig.savefig() be invoked before plt.show()?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: In interactive GUI backends, plt.show() blocks execution and disposes of or flushes the current canvas buffer upon window closure. Calling savefig() afterwards attempts to serialize a cleared buffer, writing a blank white image.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n\n      <div class=\"interview-item\" id=\"pyDay26IQ4\">\n        <p class=\"interview-question\"><strong>Q4: How do sharex and sharey coordinate multi-panel subplots?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: sharex=True and sharey=True link the data limit transforms across all generated Axes in a grid. Panning or zooming in one panel instantly updates all shared panels, and Matplotlib automatically suppresses redundant inner tick labels to declutter layout.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n\n      <div class=\"interview-item\" id=\"pyDay26IQ5\">\n        <p class=\"interview-question\"><strong>Q5: Which chart type should be chosen for temporal trends, category comparisons, relationships, and distributions?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: Line plots for continuous temporal trends; bar charts (vertical or barh with zero baselines) for category comparisons; scatter plots (with trendlines) for relationships between two numeric variables; histograms and box plots for univariate distribution shape and spread.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n\n      <div class=\"interview-item\" id=\"pyDay26IQ6\">\n        <p class=\"interview-question\"><strong>Q6: How does bin selection affect histogram interpretation, and what heuristic is safest?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: Too few bins oversmoothes multi-modal features; too many creates noisy sampling spikes. The Freedman-Diaconis rule (h = 2 &times; IQR &times; n^(-1/3)) is safest because it relies on the interquartile range (IQR), making bin width robust against extreme heavy-tailed outliers.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n\n      <div class=\"interview-item\" id=\"pyDay26IQ7\">\n        <p class=\"interview-question\"><strong>Q7: How do you implement grouped and stacked bar charts from scratch?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: Grouped bars: offset category indices by half the bar width (e.g. idx - w/2 and idx + w/2). Stacked bars: pass bottom=series1 to the second ax.bar() call so it accumulates upon the preceding heights.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n\n      <div class=\"interview-item\" id=\"pyDay26IQ8\">\n        <p class=\"interview-question\"><strong>Q8: What are the analytical risks of dual-axis (twinx) charts?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: Dual Y axes with disparate scales and origins can be visually manipulated to make completely unrelated metrics appear correlated. In production, small multiples (separate stacked subplots sharing an X axis) are strongly preferred.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n\n      <div class=\"interview-item\" id=\"pyDay26IQ9\">\n        <p class=\"interview-question\"><strong>Q9: How do you format tick values into currency or percentages dynamically?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: Use ax.yaxis.set_major_formatter() with FuncFormatter(lambda v, _: f\"${v/1e6:.1f}M\") for currency abbreviations, or PercentFormatter(1.0) for ratios. This decouples data storage from display formatting.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n\n      <div class=\"interview-item\" id=\"pyDay26IQ10\">\n        <p class=\"interview-question\"><strong>Q10: How do you position a legend outside the Axes area without clipping?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: Pass bbox_to_anchor=(1.02, 1), loc='upper left' to ax.legend(), and ensure fig.savefig(..., bbox_inches='tight') is used so the external bounding box expands to fit the legend.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n\n      <div class=\"interview-item\" id=\"pyDay26IQ11\">\n        <p class=\"interview-question\"><strong>Q11: Why is the 'jet' (rainbow) colormap considered an engineering anti-pattern?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: Jet lacks monotonic luminance (yellow is perceived as much brighter than green or red), creating artificial visual boundaries where none exist in the data, and it is completely indecipherable to readers with red-green color blindness. Use 'viridis' or 'plasma'.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n\n      <div class=\"interview-item\" id=\"pyDay26IQ12\">\n        <p class=\"interview-question\"><strong>Q12: How do you draw horizontal and vertical reference lines across an entire plot?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: Use ax.axhline(y=target) for horizontal benchmarks and ax.axvline(x=date) for vertical event markers. These lines automatically span the full coordinate boundary regardless of axis zooming.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n\n      <div class=\"interview-item\" id=\"pyDay26IQ13\">\n        <p class=\"interview-question\"><strong>Q13: How can a 2D scatter plot encode up to four numeric dimensions?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: Dimension 1 = X position; Dimension 2 = Y position; Dimension 3 = marker size (s=series); Dimension 4 = marker color hue via a continuous colormap (c=series, cmap='viridis'), accompanied by a colorbar.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n\n      <div class=\"interview-item\" id=\"pyDay26IQ14\">\n        <p class=\"interview-question\"><strong>Q14: How does Pandas plotting interact with Matplotlib under the hood?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: df.plot() and Series.plot() wrap Matplotlib. They return a standard Matplotlib Axes object (or accept an existing one via ax=ax), allowing seamless chaining of all native Matplotlib methods like set_title, annotate, and tick formatting.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n\n      <div class=\"interview-item\" id=\"pyDay26IQ15\">\n        <p class=\"interview-question\"><strong>Q15: When should you save figures as SVG/PDF versus PNG?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: Use PNG (raster) for web slides, real-time dashboards, and Slack bots where fast pixel decoding is required. Use SVG or PDF (vector) for print publication, responsive web interfaces, or LaTeX documents where glyphs must retain infinite sharp scaling without pixelation.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n\n      <div class=\"interview-item\" id=\"pyDay26IQ16\">\n        <p class=\"interview-question\"><strong>Q16: When is a logarithmic scale (set_yscale('log')) justified?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: When data spans several orders of magnitude (e.g. website traffic from 10 to 10,000,000) or displays exponential / power-law growth. It prevents small values from being crushed against the axis.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n\n      <div class=\"interview-item\" id=\"pyDay26IQ17\">\n        <p class=\"interview-question\"><strong>Q17: How should chronological dates be formatted on the X-axis?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: Never plot raw date strings! Convert them to datetime objects (pd.to_datetime), then use matplotlib.dates formatters (DateFormatter('%b %Y')) and call fig.autofmt_xdate() to angle the labels.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n\n      <div class=\"interview-item\" id=\"pyDay26IQ18\">\n        <p class=\"interview-question\"><strong>Q18: How do you modify visual defaults temporarily without polluting global state?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: Use the context manager plt.rc_context(dictionary). All rcParams changes within the with-block are automatically reverted upon exiting, preventing side effects across test suites or services.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n\n      <div class=\"interview-item\" id=\"pyDay26IQ19\">\n        <p class=\"interview-question\"><strong>Q19: What causes the 'more than 20 figures have been opened' runtime warning?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: Calling plt.figure() or plt.subplots() repeatedly inside a loop without calling plt.close(fig). Pyplot's module registry accumulates figures in memory until explicitly closed.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n\n      <div class=\"interview-item\" id=\"pyDay26IQ20\">\n        <p class=\"interview-question\"><strong>Q20: What is a Matplotlib backend and which backend is required in backend servers?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: A backend is the rendering engine that converts Artist trees into pixels or vector files. In headless Docker containers and CI/CD servers, the 'Agg' backend (non-interactive raster renderer) must be used via matplotlib.use('Agg') before importing pyplot.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n\n      <div class=\"interview-item\" id=\"pyDay26IQ21\">\n        <p class=\"interview-question\"><strong>Q21: How do you add direct numerical labels onto bar chart rectangles?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: Capture the BarContainer returned by ax.bar() or ax.barh(), then call ax.bar_label(bars, padding=3). This eliminates the need for manual text coordinate calculation.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n\n      <div class=\"interview-item\" id=\"pyDay26IQ22\">\n        <p class=\"interview-question\"><strong>Q22: Why is pyplot unsafe in multi-threaded microservices?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: Pyplot maintains process-wide pointers to 'current figure' and 'current axes' without thread-safety locks. Concurrent requests calling plt.plot() will interleave drawing commands onto the same Axes instance.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n\n      <div class=\"interview-item\" id=\"pyDay26IQ23\">\n        <p class=\"interview-question\"><strong>Q23: How do you render 50 million data points without crashing Matplotlib?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: Never pass 50 million raw points to ax.plot or ax.scatter! Pre-aggregate into 2D histograms, use hexbinning, pass rasterized=True to rasterize heavy layers while keeping text vector, or use specialized engines like Datashader.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n\n      <div class=\"interview-item\" id=\"pyDay26IQ24\">\n        <p class=\"interview-question\"><strong>Q24: What controls the uncompressed RAM footprint of a rendered figure?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: The Agg canvas allocates width &times; height &times; dpi^2 &times; 4 bytes (RGBA). An 8 &times; 6 inch figure at 300 dpi allocates 2,400 &times; 1,800 &times; 4 = ~17.28 MB in memory during rendering. Quadrupling DPI multiplies memory by 16.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n\n      <div class=\"interview-item\" id=\"pyDay26IQ25\">\n        <p class=\"interview-question\"><strong>Q25: How do you unit-test visualization code in production CI pipelines?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: Instead of brittle pixel-diff testing, assert directly on Artist properties: verify len(ax.lines), inspect ax.lines[0].get_ydata(), check ax.get_title(), verify ax.get_xlim(), and use matplotlib.testing.compare with strict tolerances when image regression tests are required.</em></p></div>\n      </div>\n\n    </div>\n  </div>\n</div>\n\n</div>"
    }
  ],
  "practiceQuestions": [
    {
      "id": 1,
      "difficulty": "Easy",
      "category": "architecture",
      "title": "Figure Canvas & Axes Subplots Count",
      "given": "fig, axes = plt.subplots(1, 2)",
      "outputs": [
        "q1_axes_count"
      ],
      "starterCode": "",
      "desc": "Create a figure with 2 horizontal subplots using plt.subplots(1, 2). Extract the total number of child Axes on the figure into integer q1_axes_count (2) and close the figure.",
      "prompt": "<strong>[Easy] Figure Canvas & Axes Subplots Count</strong><p>Import <code>matplotlib.pyplot as plt</code>. Call <code>fig, axes = plt.subplots(1, 2)</code>. Extract <code>q1_axes_count = len(fig.axes)</code> and close the figure with <code>plt.close(fig)</code>.</p>",
      "ref": "import matplotlib.pyplot as plt\nfig, axes = plt.subplots(1, 2)\nq1_axes_count = len(fig.axes)\nplt.close(fig)\nprint(f'{q1_axes_count=}')\n",
      "solution": "import matplotlib.pyplot as plt\nfig, axes = plt.subplots(1, 2)\nq1_axes_count = len(fig.axes)\nplt.close(fig)\nprint(f'{q1_axes_count=}')\n",
      "target": "q1_axes_count=2\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "q1_axes_count",
            "type": "int",
            "value": 2
          }
        ]
      },
      "explanation": "plt.subplots(1, 2) returns a Figure containing an array of 2 Axes objects registered in fig.axes.",
      "hint": "Use len(fig.axes) then plt.close(fig)."
    },
    {
      "id": 2,
      "difficulty": "Easy",
      "category": "line_plot",
      "title": "Inspecting Plotted Line Data Length",
      "given": "sales = [10, 15, 12, 18, 25]",
      "outputs": [
        "q2_line_len"
      ],
      "starterCode": "",
      "desc": "Given sales = [10, 15, 12, 18, 25], plot the series with ax.plot(sales, marker='o'). Extract the number of data points from the first Line2D artist into integer q2_line_len (5) and close the figure.",
      "prompt": "<strong>[Easy] Inspecting Plotted Line Data Length</strong><p>Given <code>sales = [10, 15, 12, 18, 25]</code>: Initialize <code>fig, ax = plt.subplots()</code> and plot with <code>ax.plot(sales, marker='o')</code>. Extract <code>q2_line_len = len(ax.lines[0].get_ydata())</code> and call <code>plt.close(fig)</code>.</p>",
      "ref": "import matplotlib.pyplot as plt\nfig, ax = plt.subplots()\nsales = [10, 15, 12, 18, 25]\nax.plot(sales, marker='o')\nq2_line_len = len(ax.lines[0].get_ydata())\nplt.close(fig)\nprint(f'{q2_line_len=}')\n",
      "solution": "import matplotlib.pyplot as plt\nfig, ax = plt.subplots()\nsales = [10, 15, 12, 18, 25]\nax.plot(sales, marker='o')\nq2_line_len = len(ax.lines[0].get_ydata())\nplt.close(fig)\nprint(f'{q2_line_len=}')\n",
      "target": "q2_line_len=5\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "q2_line_len",
            "type": "int",
            "value": 5
          }
        ]
      },
      "explanation": "ax.lines is a list of Line2D artist objects; get_ydata() returns the array of plotted y coordinates.",
      "hint": "Call len(ax.lines[0].get_ydata())."
    },
    {
      "id": 3,
      "difficulty": "Easy",
      "category": "bar_chart",
      "title": "Bar Chart Rectangle Patch Count",
      "given": "cats = ['N', 'S', 'E', 'W']; vals = [40, 55, 30, 45]",
      "outputs": [
        "q3_bar_count"
      ],
      "starterCode": "",
      "desc": "Plot vertical bars using ax.bar(['N', 'S', 'E', 'W'], [40, 55, 30, 45]). Extract the number of drawn rectangle patches in q3_bar_count (4) and close the figure.",
      "prompt": "<strong>[Easy] Bar Chart Rectangle Patch Count</strong><p>Given <code>cats = ['N', 'S', 'E', 'W']</code> and <code>vals = [40, 55, 30, 45]</code>: Call <code>fig, ax = plt.subplots()</code> and <code>ax.bar(cats, vals)</code>. Extract <code>q3_bar_count = len(ax.patches)</code> and close with <code>plt.close(fig)</code>.</p>",
      "ref": "import matplotlib.pyplot as plt\nfig, ax = plt.subplots()\nax.bar(['N', 'S', 'E', 'W'], [40, 55, 30, 45])\nq3_bar_count = len(ax.patches)\nplt.close(fig)\nprint(f'{q3_bar_count=}')\n",
      "solution": "import matplotlib.pyplot as plt\nfig, ax = plt.subplots()\nax.bar(['N', 'S', 'E', 'W'], [40, 55, 30, 45])\nq3_bar_count = len(ax.patches)\nplt.close(fig)\nprint(f'{q3_bar_count=}')\n",
      "target": "q3_bar_count=4\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "q3_bar_count",
            "type": "int",
            "value": 4
          }
        ]
      },
      "explanation": "Each bar drawn by ax.bar() is stored as a Rectangle object in ax.patches.",
      "hint": "Extract len(ax.patches)."
    },
    {
      "id": 4,
      "difficulty": "Easy",
      "category": "scatter",
      "title": "Scatter Plot Dot Size Extraction",
      "given": "sc = ax.scatter([1, 2, 3], [4, 5, 6], s=[20, 50, 80])",
      "outputs": [
        "q4_scatter_sizes"
      ],
      "starterCode": "",
      "desc": "Plot a scatter plot with sizes s=[20, 50, 80]. Extract the list of integer sizes using sc.get_sizes().tolist() into list q4_scatter_sizes ([20, 50, 80]) and close the figure.",
      "prompt": "<strong>[Easy] Scatter Plot Dot Size Extraction</strong><p>Call <code>fig, ax = plt.subplots()</code> and <code>sc = ax.scatter([1, 2, 3], [4, 5, 6], s=[20, 50, 80])</code>. Extract <code>q4_scatter_sizes = [int(x) for x in sc.get_sizes().tolist()]</code> and close with <code>plt.close(fig)</code>.</p>",
      "ref": "import matplotlib.pyplot as plt\nfig, ax = plt.subplots()\nsc = ax.scatter([1, 2, 3], [4, 5, 6], s=[20, 50, 80])\nq4_scatter_sizes = [int(x) for x in sc.get_sizes().tolist()]\nplt.close(fig)\nprint(f'{q4_scatter_sizes=}')\n",
      "solution": "import matplotlib.pyplot as plt\nfig, ax = plt.subplots()\nsc = ax.scatter([1, 2, 3], [4, 5, 6], s=[20, 50, 80])\nq4_scatter_sizes = [int(x) for x in sc.get_sizes().tolist()]\nplt.close(fig)\nprint(f'{q4_scatter_sizes=}')\n",
      "target": "q4_scatter_sizes=[20, 50, 80]\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "q4_scatter_sizes",
            "type": "list",
            "value": [
              20,
              50,
              80
            ]
          }
        ]
      },
      "explanation": "sc.get_sizes() returns a numpy array representing the area in points^2 of each scatter marker.",
      "hint": "Convert sc.get_sizes().tolist() to int list."
    },
    {
      "id": 5,
      "difficulty": "Easy",
      "category": "histogram",
      "title": "Histogram Bin Count Verification",
      "given": "data = [1, 2, 2, 3, 3, 3, 4, 4, 5]",
      "outputs": [
        "q5_hist_bins"
      ],
      "starterCode": "",
      "desc": "Plot a histogram of [1, 2, 2, 3, 3, 3, 4, 4, 5] specifying bins=5. Extract the number of bin counts returned into integer q5_hist_bins (5) and close the figure.",
      "prompt": "<strong>[Easy] Histogram Bin Count Verification</strong><p>Given <code>data = [1, 2, 2, 3, 3, 3, 4, 4, 5]</code>: Call <code>fig, ax = plt.subplots()</code> and <code>counts, edges, _ = ax.hist(data, bins=5)</code>. Extract <code>q5_hist_bins = len(counts)</code> and call <code>plt.close(fig)</code>.</p>",
      "ref": "import matplotlib.pyplot as plt\nfig, ax = plt.subplots()\ncounts, edges, _ = ax.hist([1, 2, 2, 3, 3, 3, 4, 4, 5], bins=5)\nq5_hist_bins = len(counts)\nplt.close(fig)\nprint(f'{q5_hist_bins=}')\n",
      "solution": "import matplotlib.pyplot as plt\nfig, ax = plt.subplots()\ncounts, edges, _ = ax.hist([1, 2, 2, 3, 3, 3, 4, 4, 5], bins=5)\nq5_hist_bins = len(counts)\nplt.close(fig)\nprint(f'{q5_hist_bins=}')\n",
      "target": "q5_hist_bins=5\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "q5_hist_bins",
            "type": "int",
            "value": 5
          }
        ]
      },
      "explanation": "ax.hist() returns a 3-tuple: (counts, bin_edges, patches). len(counts) equals the number of bins.",
      "hint": "Check len(counts)."
    },
    {
      "id": 6,
      "difficulty": "Medium",
      "category": "histogram",
      "title": "Freedman-Diaconis Bin Width Computation",
      "given": "sample_data = np.array([10, 12, 14, 15, 18, 20, 22, 25, 28, 30])",
      "outputs": [
        "q6_fd_width"
      ],
      "starterCode": "",
      "desc": "Given sample_data, compute the Freedman-Diaconis optimal bin width h = 2 * IQR / (n^(1/3)). Round to 2 decimal places in float q6_fd_width (9.28).",
      "prompt": "<strong>[Medium] Freedman-Diaconis Bin Width Computation</strong><p>Define a function <code>calc_freedman_diaconis_width(data)</code> that calculates <code>q75, q25 = np.percentile(data, [75, 25])</code>, <code>iqr = q75 - q25</code>, and returns <code>round(2.0 * iqr / (len(data) ** (1/3)), 2)</code>. Test on <code>sample_data = np.array([10, 12, 14, 15, 18, 20, 22, 25, 28, 30])</code> into <code>q6_fd_width</code>.</p>",
      "ref": "import numpy as np\ndef calc_freedman_diaconis_width(data):\n    q75, q25 = np.percentile(data, [75, 25])\n    iqr = q75 - q25\n    n = len(data)\n    return round(2.0 * iqr / (n ** (1/3)), 2)\nsample_data = np.array([10, 12, 14, 15, 18, 20, 22, 25, 28, 30])\nq6_fd_width = calc_freedman_diaconis_width(sample_data)\nprint(f'{q6_fd_width=}')\n",
      "solution": "import numpy as np\ndef calc_freedman_diaconis_width(data):\n    q75, q25 = np.percentile(data, [75, 25])\n    iqr = q75 - q25\n    n = len(data)\n    return round(2.0 * iqr / (n ** (1/3)), 2)\nsample_data = np.array([10, 12, 14, 15, 18, 20, 22, 25, 28, 30])\nq6_fd_width = calc_freedman_diaconis_width(sample_data)\nprint(f'{q6_fd_width=}')\n",
      "target": "q6_fd_width=9.28\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "q6_fd_width",
            "type": "float",
            "value": 9.28,
            "tolerance": 0.02
          }
        ]
      },
      "explanation": "Freedman-Diaconis bin width formula is 2 * IQR(x) * n^(-1/3), providing optimal robust binning.",
      "hint": "Use np.percentile(data, [75, 25]) to calculate IQR."
    },
    {
      "id": 7,
      "difficulty": "Easy",
      "category": "subplots",
      "title": "Verifying Linked Shared X-Axis in Subplots",
      "given": "fig, axes = plt.subplots(2, 2, sharex=True)",
      "outputs": [
        "q7_shared_x"
      ],
      "starterCode": "",
      "desc": "Create a 2x2 subplot grid with sharex=True. Verify that axes[0, 0] and axes[1, 0] share their x-axis into boolean q7_shared_x (True) and close the figure.",
      "prompt": "<strong>[Easy] Verifying Linked Shared X-Axis in Subplots</strong><p>Call <code>fig, axes = plt.subplots(2, 2, sharex=True)</code>. Check <code>q7_shared_x = bool(axes[0, 0].get_shared_x_axes().joined(axes[0, 0], axes[1, 0]))</code> and close with <code>plt.close(fig)</code>.</p>",
      "ref": "import matplotlib.pyplot as plt\nfig, axes = plt.subplots(2, 2, sharex=True)\nq7_shared_x = bool(axes[0, 0].get_shared_x_axes().joined(axes[0, 0], axes[1, 0]))\nplt.close(fig)\nprint(f'{q7_shared_x=}')\n",
      "solution": "import matplotlib.pyplot as plt\nfig, axes = plt.subplots(2, 2, sharex=True)\nq7_shared_x = bool(axes[0, 0].get_shared_x_axes().joined(axes[0, 0], axes[1, 0]))\nplt.close(fig)\nprint(f'{q7_shared_x=}')\n",
      "target": "q7_shared_x=True\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "q7_shared_x",
            "type": "bool",
            "value": true
          }
        ]
      },
      "explanation": "axes[0, 0].get_shared_x_axes().joined(a, b) confirms that two Axes share identical horizontal scaling.",
      "hint": "Use get_shared_x_axes().joined(axes[0, 0], axes[1, 0])."
    },
    {
      "id": 8,
      "difficulty": "Easy",
      "category": "labeling",
      "title": "Assigning and Extracting Axes Title",
      "given": "ax.set_title('Quarterly Performance')",
      "outputs": [
        "q8_title_text"
      ],
      "starterCode": "",
      "desc": "Set the title of an Axes to 'Quarterly Performance'. Extract the title string via ax.get_title() into string q8_title_text ('Quarterly Performance') and close the figure.",
      "prompt": "<strong>[Easy] Assigning and Extracting Axes Title</strong><p>Call <code>fig, ax = plt.subplots()</code>, set <code>ax.set_title('Quarterly Performance')</code>, extract <code>q8_title_text = str(ax.get_title())</code>, and close with <code>plt.close(fig)</code>.</p>",
      "ref": "import matplotlib.pyplot as plt\nfig, ax = plt.subplots()\nax.set_title('Quarterly Performance')\nq8_title_text = str(ax.get_title())\nplt.close(fig)\nprint(f'{q8_title_text=}')\n",
      "solution": "import matplotlib.pyplot as plt\nfig, ax = plt.subplots()\nax.set_title('Quarterly Performance')\nq8_title_text = str(ax.get_title())\nplt.close(fig)\nprint(f'{q8_title_text=}')\n",
      "target": "q8_title_text='Quarterly Performance'\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "q8_title_text",
            "type": "string",
            "value": "Quarterly Performance"
          }
        ]
      },
      "explanation": "ax.get_title() retrieves the text string assigned to the primary title artist.",
      "hint": "Use ax.get_title()."
    },
    {
      "id": 9,
      "difficulty": "Easy",
      "category": "labeling",
      "title": "Percentage Axis Tick Formatting",
      "given": "from matplotlib.ticker import PercentFormatter",
      "outputs": [
        "q9_formatted_pct"
      ],
      "starterCode": "",
      "desc": "Attach PercentFormatter(1.0) to y-axis. Format the value 0.75 using ax.yaxis.get_major_formatter().format_data(0.75) into string q9_formatted_pct ('75%') and close figure.",
      "prompt": "<strong>[Easy] Percentage Axis Tick Formatting</strong><p>Import <code>from matplotlib.ticker import PercentFormatter</code>. Call <code>fig, ax = plt.subplots()</code> and <code>ax.yaxis.set_major_formatter(PercentFormatter(1.0))</code>. Extract <code>q9_formatted_pct = str(ax.yaxis.get_major_formatter().format_data(0.75))</code> and call <code>plt.close(fig)</code>.</p>",
      "ref": "import matplotlib.pyplot as plt\nfrom matplotlib.ticker import PercentFormatter\nfig, ax = plt.subplots()\nax.yaxis.set_major_formatter(PercentFormatter(1.0))\nq9_formatted_pct = str(ax.yaxis.get_major_formatter().format_data(0.75))\nplt.close(fig)\nprint(f'{q9_formatted_pct=}')\n",
      "solution": "import matplotlib.pyplot as plt\nfrom matplotlib.ticker import PercentFormatter\nfig, ax = plt.subplots()\nax.yaxis.set_major_formatter(PercentFormatter(1.0))\nq9_formatted_pct = str(ax.yaxis.get_major_formatter().format_data(0.75))\nplt.close(fig)\nprint(f'{q9_formatted_pct=}')\n",
      "target": "q9_formatted_pct='75%'\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "q9_formatted_pct",
            "type": "string",
            "value": "75%"
          }
        ]
      },
      "explanation": "PercentFormatter(1.0) multiplies decimal ratios by 100 and appends the '%' sign.",
      "hint": "Call ax.yaxis.get_major_formatter().format_data(0.75)."
    },
    {
      "id": 10,
      "difficulty": "Easy",
      "category": "labeling",
      "title": "Compiling and Inspecting Legend Labels",
      "given": "ax.plot([1, 2], [3, 4], label='Sales'); ax.plot([1, 2], [2, 1], label='Cost')",
      "outputs": [
        "q10_legend_labels"
      ],
      "starterCode": "",
      "desc": "Plot two series labeled 'Sales' and 'Cost'. Generate the legend via leg = ax.legend() and extract the label strings into list q10_legend_labels (['Sales', 'Cost']) and close the figure.",
      "prompt": "<strong>[Easy] Compiling and Inspecting Legend Labels</strong><p>Plot two lines with labels: <code>ax.plot([1, 2], [3, 4], label='Sales')</code> and <code>ax.plot([1, 2], [2, 1], label='Cost')</code>. Call <code>leg = ax.legend()</code>, extract <code>q10_legend_labels = [t.get_text() for t in leg.get_texts()]</code>, and close with <code>plt.close(fig)</code>.</p>",
      "ref": "import matplotlib.pyplot as plt\nfig, ax = plt.subplots()\nax.plot([1, 2], [3, 4], label='Sales')\nax.plot([1, 2], [2, 1], label='Cost')\nleg = ax.legend()\nq10_legend_labels = [t.get_text() for t in leg.get_texts()]\nplt.close(fig)\nprint(f'{q10_legend_labels=}')\n",
      "solution": "import matplotlib.pyplot as plt\nfig, ax = plt.subplots()\nax.plot([1, 2], [3, 4], label='Sales')\nax.plot([1, 2], [2, 1], label='Cost')\nleg = ax.legend()\nq10_legend_labels = [t.get_text() for t in leg.get_texts()]\nplt.close(fig)\nprint(f'{q10_legend_labels=}')\n",
      "target": "q10_legend_labels=['Sales', 'Cost']\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "q10_legend_labels",
            "type": "list",
            "value": [
              "Sales",
              "Cost"
            ]
          }
        ]
      },
      "explanation": "leg.get_texts() returns the Text artist instances rendered inside the legend box.",
      "hint": "Extract [t.get_text() for t in leg.get_texts()]."
    },
    {
      "id": 11,
      "difficulty": "Easy",
      "category": "annotation",
      "title": "Adding Direct Point Annotation",
      "given": "ax.annotate('Peak', xy=(2, 25), xytext=(2, 28))",
      "outputs": [
        "q11_annotate_text"
      ],
      "starterCode": "",
      "desc": "Add an annotation 'Peak' to an Axes at xy=(2, 25) with text position xytext=(2, 28). Extract the annotation text from ax.texts[0].get_text() into string q11_annotate_text ('Peak') and close the figure.",
      "prompt": "<strong>[Easy] Adding Direct Point Annotation</strong><p>Call <code>fig, ax = plt.subplots()</code> and <code>ax.annotate('Peak', xy=(2, 25), xytext=(2, 28))</code>. Extract <code>q11_annotate_text = str(ax.texts[0].get_text())</code> and call <code>plt.close(fig)</code>.</p>",
      "ref": "import matplotlib.pyplot as plt\nfig, ax = plt.subplots()\nax.annotate('Peak', xy=(2, 25), xytext=(2, 28))\nq11_annotate_text = str(ax.texts[0].get_text())\nplt.close(fig)\nprint(f'{q11_annotate_text=}')\n",
      "solution": "import matplotlib.pyplot as plt\nfig, ax = plt.subplots()\nax.annotate('Peak', xy=(2, 25), xytext=(2, 28))\nq11_annotate_text = str(ax.texts[0].get_text())\nplt.close(fig)\nprint(f'{q11_annotate_text=}')\n",
      "target": "q11_annotate_text='Peak'\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "q11_annotate_text",
            "type": "string",
            "value": "Peak"
          }
        ]
      },
      "explanation": "ax.annotate() creates an Annotation artist stored in ax.texts.",
      "hint": "Inspect ax.texts[0].get_text()."
    },
    {
      "id": 12,
      "difficulty": "Easy",
      "category": "annotation",
      "title": "Drawing Horizontal Target Benchmark Line",
      "given": "line = ax.axhline(100.0, color='red', linestyle='--')",
      "outputs": [
        "q12_ref_line_y"
      ],
      "starterCode": "",
      "desc": "Draw a horizontal benchmark line at y=100.0 using ax.axhline(100.0). Extract the y-data coordinate from the line into float q12_ref_line_y (100.0) and close the figure.",
      "prompt": "<strong>[Easy] Drawing Horizontal Target Benchmark Line</strong><p>Call <code>fig, ax = plt.subplots()</code> and <code>line = ax.axhline(100.0, color='red', linestyle='--')</code>. Extract <code>q12_ref_line_y = float(line.get_ydata()[0])</code> and close with <code>plt.close(fig)</code>.</p>",
      "ref": "import matplotlib.pyplot as plt\nfig, ax = plt.subplots()\nline = ax.axhline(100.0, color='red', linestyle='--')\nq12_ref_line_y = float(line.get_ydata()[0])\nplt.close(fig)\nprint(f'{q12_ref_line_y=}')\n",
      "solution": "import matplotlib.pyplot as plt\nfig, ax = plt.subplots()\nline = ax.axhline(100.0, color='red', linestyle='--')\nq12_ref_line_y = float(line.get_ydata()[0])\nplt.close(fig)\nprint(f'{q12_ref_line_y=}')\n",
      "target": "q12_ref_line_y=100.0\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "q12_ref_line_y",
            "type": "float",
            "value": 100,
            "tolerance": 0.01
          }
        ]
      },
      "explanation": "ax.axhline() draws a full-width horizontal benchmark line with y coordinates matching the given scalar.",
      "hint": "Extract float(line.get_ydata()[0])."
    },
    {
      "id": 13,
      "difficulty": "Medium",
      "category": "subplots",
      "title": "Creating Dual Y-Axis with twinx()",
      "given": "twin = ax.twinx()",
      "outputs": [
        "q13_twinx_axes"
      ],
      "starterCode": "",
      "desc": "Given fig, ax = plt.subplots(), create an overlay twin y-axis via twin = ax.twinx(). Verify that the figure now owns exactly 2 Axes in integer q13_twinx_axes (2) and close the figure.",
      "prompt": "<strong>[Medium] Creating Dual Y-Axis with twinx()</strong><p>Initialize <code>fig, ax = plt.subplots()</code> and create <code>twin = ax.twinx()</code>. Extract <code>q13_twinx_axes = len(fig.axes)</code> and close with <code>plt.close(fig)</code>.</p>",
      "ref": "import matplotlib.pyplot as plt\nfig, ax = plt.subplots()\ntwin = ax.twinx()\nq13_twinx_axes = len(fig.axes)\nplt.close(fig)\nprint(f'{q13_twinx_axes=}')\n",
      "solution": "import matplotlib.pyplot as plt\nfig, ax = plt.subplots()\ntwin = ax.twinx()\nq13_twinx_axes = len(fig.axes)\nplt.close(fig)\nprint(f'{q13_twinx_axes=}')\n",
      "target": "q13_twinx_axes=2\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "q13_twinx_axes",
            "type": "int",
            "value": 2
          }
        ]
      },
      "explanation": "ax.twinx() creates an overlay Axes sharing the original X axis, registering a second Axes on fig.",
      "hint": "Check len(fig.axes) after calling ax.twinx()."
    },
    {
      "id": 14,
      "difficulty": "Medium",
      "category": "bar_chart",
      "title": "Stacked Bar Cumulative Height Verification",
      "given": "a = np.array([10, 20]); b = np.array([5, 15])",
      "outputs": [
        "q14_stacked_bar_height"
      ],
      "starterCode": "",
      "desc": "Draw two stacked bar series: ax.bar([0, 1], a) and ax.bar([0, 1], b, bottom=a). Extract the top coordinate of the second stacked bar patch in integer q14_stacked_bar_height (35) and close the figure.",
      "prompt": "<strong>[Medium] Stacked Bar Cumulative Height Verification</strong><p>Given <code>a = np.array([10, 20])</code> and <code>b = np.array([5, 15])</code>: Call <code>fig, ax = plt.subplots()</code>, draw <code>ax.bar([0, 1], a, label='a')</code>, then <code>ax.bar([0, 1], b, bottom=a, label='b')</code>. Extract <code>q14_stacked_bar_height = int(ax.patches[3].get_y() + ax.patches[3].get_height())</code> and close with <code>plt.close(fig)</code>.</p>",
      "ref": "import numpy as np\nimport matplotlib.pyplot as plt\nfig, ax = plt.subplots()\na = np.array([10, 20])\nb = np.array([5, 15])\nax.bar([0, 1], a, label='a')\nax.bar([0, 1], b, bottom=a, label='b')\nq14_stacked_bar_height = int(ax.patches[3].get_y() + ax.patches[3].get_height())\nplt.close(fig)\nprint(f'{q14_stacked_bar_height=}')\n",
      "solution": "import numpy as np\nimport matplotlib.pyplot as plt\nfig, ax = plt.subplots()\na = np.array([10, 20])\nb = np.array([5, 15])\nax.bar([0, 1], a, label='a')\nax.bar([0, 1], b, bottom=a, label='b')\nq14_stacked_bar_height = int(ax.patches[3].get_y() + ax.patches[3].get_height())\nplt.close(fig)\nprint(f'{q14_stacked_bar_height=}')\n",
      "target": "q14_stacked_bar_height=35\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "q14_stacked_bar_height",
            "type": "int",
            "value": 35
          }
        ]
      },
      "explanation": "Passing bottom=a stacks series b on top of series a, giving a total top height of 20 + 15 = 35 for index 1.",
      "hint": "Check patch[3].get_y() + patch[3].get_height()."
    },
    {
      "id": 15,
      "difficulty": "Easy",
      "category": "styling",
      "title": "Logarithmic Scale Transformation",
      "given": "ax.set_yscale('log')",
      "outputs": [
        "q15_log_scale"
      ],
      "starterCode": "",
      "desc": "Transform the y-axis to logarithmic scale using ax.set_yscale('log'). Extract the active scale string via ax.get_yscale() into string q15_log_scale ('log') and close the figure.",
      "prompt": "<strong>[Easy] Logarithmic Scale Transformation</strong><p>Call <code>fig, ax = plt.subplots()</code>, set <code>ax.set_yscale('log')</code>, extract <code>q15_log_scale = str(ax.get_yscale())</code>, and close with <code>plt.close(fig)</code>.</p>",
      "ref": "import matplotlib.pyplot as plt\nfig, ax = plt.subplots()\nax.set_yscale('log')\nq15_log_scale = str(ax.get_yscale())\nplt.close(fig)\nprint(f'{q15_log_scale=}')\n",
      "solution": "import matplotlib.pyplot as plt\nfig, ax = plt.subplots()\nax.set_yscale('log')\nq15_log_scale = str(ax.get_yscale())\nplt.close(fig)\nprint(f'{q15_log_scale=}')\n",
      "target": "q15_log_scale='log'\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "q15_log_scale",
            "type": "string",
            "value": "log"
          }
        ]
      },
      "explanation": "ax.set_yscale('log') transforms the coordinate mapping from linear to logarithmic base-10.",
      "hint": "Extract ax.get_yscale()."
    },
    {
      "id": 16,
      "difficulty": "Easy",
      "category": "architecture",
      "title": "Plotting Directly from Pandas DataFrame",
      "given": "df = pd.DataFrame({'val': [10, 20, 30]})",
      "outputs": [
        "q16_patch_count"
      ],
      "starterCode": "",
      "desc": "Given DataFrame df, call ax = df.plot(kind='bar'). Verify that the returned object is a Matplotlib Axes by extracting the number of drawn bar patches into integer q16_patch_count (3) and close the figure.",
      "prompt": "<strong>[Easy] Plotting Directly from Pandas DataFrame</strong><p>Given <code>df = pd.DataFrame({'val': [10, 20, 30]})</code>: Call <code>ax = df.plot(kind='bar')</code>. Extract <code>q16_patch_count = len(ax.patches)</code> and close with <code>plt.close(ax.figure)</code>.</p>",
      "ref": "import pandas as pd\nimport matplotlib.pyplot as plt\ndf = pd.DataFrame({'val': [10, 20, 30]})\nax = df.plot(kind='bar')\nq16_patch_count = len(ax.patches)\nplt.close(ax.figure)\nprint(f'{q16_patch_count=}')\n",
      "solution": "import pandas as pd\nimport matplotlib.pyplot as plt\ndf = pd.DataFrame({'val': [10, 20, 30]})\nax = df.plot(kind='bar')\nq16_patch_count = len(ax.patches)\nplt.close(ax.figure)\nprint(f'{q16_patch_count=}')\n",
      "target": "q16_patch_count=3\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "q16_patch_count",
            "type": "int",
            "value": 3
          }
        ]
      },
      "explanation": "df.plot() returns a standard Matplotlib Axes instance, containing 3 Rectangle patches.",
      "hint": "Use len(ax.patches) and close ax.figure."
    },
    {
      "id": 17,
      "difficulty": "Medium",
      "category": "bar_chart",
      "title": "Sorting Categories for Horizontal Bar Chart",
      "given": "d = {'Apples': 50, 'Oranges': 20, 'Bananas': 80}",
      "outputs": [
        "q17_sorted_fruits"
      ],
      "starterCode": "",
      "desc": "Given dictionary d of fruit inventories, sort categories ascending by quantity so the largest bar appears at the top of a horizontal barh chart. Extract the sorted fruit names into list q17_sorted_fruits (['Oranges', 'Apples', 'Bananas']).",
      "prompt": "<strong>[Medium] Sorting Categories for Horizontal Bar Chart</strong><p>Given <code>d = {'Apples': 50, 'Oranges': 20, 'Bananas': 80}</code>: Sort items ascending by value with <code>sorted(d.items(), key=lambda kv: kv[1])</code>. Extract the fruit names into <code>q17_sorted_fruits = [k for k, _ in sorted(d.items(), key=lambda kv: kv[1])]</code>.</p>",
      "ref": "d = {'Apples': 50, 'Oranges': 20, 'Bananas': 80}\nq17_sorted_fruits = [k for k, _ in sorted(d.items(), key=lambda kv: kv[1])]\nprint(f'{q17_sorted_fruits=}')\n",
      "solution": "d = {'Apples': 50, 'Oranges': 20, 'Bananas': 80}\nq17_sorted_fruits = [k for k, _ in sorted(d.items(), key=lambda kv: kv[1])]\nprint(f'{q17_sorted_fruits=}')\n",
      "target": "q17_sorted_fruits=['Oranges', 'Apples', 'Bananas']\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "q17_sorted_fruits",
            "type": "list",
            "value": [
              "Oranges",
              "Apples",
              "Bananas"
            ]
          }
        ]
      },
      "explanation": "Sorting ascending before plotting with ax.barh ensures the highest-value category appears at the top.",
      "hint": "Sort by kv[1] using key=lambda kv: kv[1]."
    },
    {
      "id": 18,
      "difficulty": "Hard",
      "category": "production",
      "title": "Agg Canvas Uncompressed RGBA Memory Footprint",
      "given": "calc_rgba_bytes(width_in, height_in, dpi)",
      "outputs": [
        "q18_rgba_bytes"
      ],
      "starterCode": "",
      "desc": "Define def calc_rgba_bytes(width_in, height_in, dpi): return int(width_in * dpi * height_in * dpi * 4). Compute the exact RGBA buffer size in bytes for an 8x6 inch figure rendered at 300 dpi into integer q18_rgba_bytes (17280000).",
      "prompt": "<strong>[Hard] Agg Canvas Uncompressed RGBA Memory Footprint</strong><p>Define <code>def calc_rgba_bytes(width_in, height_in, dpi): return int(width_in * dpi * height_in * dpi * 4)</code>. Compute <code>q18_rgba_bytes = calc_rgba_bytes(8, 6, 300)</code>.</p>",
      "ref": "def calc_rgba_bytes(width_in, height_in, dpi):\n    return int(width_in * dpi * height_in * dpi * 4)\nq18_rgba_bytes = calc_rgba_bytes(8, 6, 300)\nprint(f'{q18_rgba_bytes=}')\n",
      "solution": "def calc_rgba_bytes(width_in, height_in, dpi):\n    return int(width_in * dpi * height_in * dpi * 4)\nq18_rgba_bytes = calc_rgba_bytes(8, 6, 300)\nprint(f'{q18_rgba_bytes=}')\n",
      "target": "q18_rgba_bytes=17280000\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "q18_rgba_bytes",
            "type": "int",
            "value": 17280000
          }
        ]
      },
      "explanation": "Agg canvas memory scales as width_px * height_px * 4 bytes per pixel. 8*300 * 6*300 * 4 = 17,280,000 bytes (~17.28 MB).",
      "hint": "Multiply width_in * dpi * height_in * dpi * 4."
    },
    {
      "id": 19,
      "difficulty": "Medium",
      "category": "subplots",
      "title": "Subplots 2D Grid Shape and Total Axes",
      "given": "fig, axes = plt.subplots(3, 4)",
      "outputs": [
        "q19_grid_shape",
        "q19_total_axes"
      ],
      "starterCode": "",
      "desc": "Create a 3x4 subplots grid. Extract the axes array dimensions into list q19_grid_shape ([3, 4]) and total Axes count on the figure in q19_total_axes (12) and close the figure.",
      "prompt": "<strong>[Medium] Subplots 2D Grid Shape and Total Axes</strong><p>Call <code>fig, axes = plt.subplots(3, 4)</code>. Extract <code>q19_grid_shape = list(axes.shape)</code> and <code>q19_total_axes = len(fig.axes)</code>. Close with <code>plt.close(fig)</code>.</p>",
      "ref": "import matplotlib.pyplot as plt\nfig, axes = plt.subplots(3, 4)\nq19_grid_shape = list(axes.shape)\nq19_total_axes = len(fig.axes)\nplt.close(fig)\nprint(f'{q19_grid_shape=}, {q19_total_axes=}')\n",
      "solution": "import matplotlib.pyplot as plt\nfig, axes = plt.subplots(3, 4)\nq19_grid_shape = list(axes.shape)\nq19_total_axes = len(fig.axes)\nplt.close(fig)\nprint(f'{q19_grid_shape=}, {q19_total_axes=}')\n",
      "target": "q19_grid_shape=[3, 4], q19_total_axes=12\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "q19_grid_shape",
            "type": "list",
            "value": [
              3,
              4
            ]
          },
          {
            "name": "q19_total_axes",
            "type": "int",
            "value": 12
          }
        ]
      },
      "explanation": "plt.subplots(3, 4) returns a (3, 4) numpy ndarray of Axes; fig.axes contains all 12 axes.",
      "hint": "Use list(axes.shape) and len(fig.axes)."
    },
    {
      "id": 20,
      "difficulty": "Hard",
      "category": "production",
      "title": "Figure Registry Cleanup Verification",
      "given": "fig = plt.figure()",
      "outputs": [
        "q20_closed_ok"
      ],
      "starterCode": "",
      "desc": "Create a figure, verify its number exists in plt.fignum_exists(fig.number), then call plt.close(fig) and verify it no longer exists. Record verification into boolean q20_closed_ok (True).",
      "prompt": "<strong>[Hard] Figure Registry Cleanup Verification</strong><p>Create <code>fig = plt.figure()</code>, store <code>f_num = fig.number</code>, verify <code>ex_before = plt.fignum_exists(f_num)</code>, call <code>plt.close(fig)</code>, and verify <code>ex_after = plt.fignum_exists(f_num)</code>. Assign <code>q20_closed_ok = bool(ex_before and not ex_after)</code>.</p>",
      "ref": "import matplotlib.pyplot as plt\nfig = plt.figure()\nf_num = fig.number\nex_before = plt.fignum_exists(f_num)\nplt.close(fig)\nex_after = plt.fignum_exists(f_num)\nq20_closed_ok = bool(ex_before and not ex_after)\nprint(f'{q20_closed_ok=}')\n",
      "solution": "import matplotlib.pyplot as plt\nfig = plt.figure()\nf_num = fig.number\nex_before = plt.fignum_exists(f_num)\nplt.close(fig)\nex_after = plt.fignum_exists(f_num)\nq20_closed_ok = bool(ex_before and not ex_after)\nprint(f'{q20_closed_ok=}')\n",
      "target": "q20_closed_ok=True\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "q20_closed_ok",
            "type": "bool",
            "value": true
          }
        ]
      },
      "explanation": "plt.close(fig) purges the FigureManager from pyplot's _pylab_helpers.Gcf registry, freeing process memory.",
      "hint": "Check plt.fignum_exists before and after plt.close(fig)."
    }
  ],
  "testQuestions": [
    {
      "id": 1,
      "difficulty": "Easy",
      "category": "architecture",
      "title": "Figure vs Axes Type Identification",
      "desc": "Initialize fig, ax = plt.subplots(). Extract type(fig).__name__ into string t1_fig_type ('Figure') and type(ax).__name__ into string t1_ax_type ('Axes') and close the figure.",
      "prompt": "<strong>[Assessment Q1] Figure vs Axes Type Identification</strong><p>Call <code>fig, ax = plt.subplots()</code>. Extract <code>t1_fig_type = str(type(fig).__name__)</code> and <code>t1_ax_type = str(type(ax).__name__)</code>. Close with <code>plt.close(fig)</code>.</p>",
      "starterCode": "",
      "ref": "import matplotlib.pyplot as plt\nfig, ax = plt.subplots()\nt1_fig_type = str(type(fig).__name__)\nt1_ax_type = str(type(ax).__name__)\nplt.close(fig)\nprint(f'{t1_fig_type=}, {t1_ax_type=}')\n",
      "solution": "import matplotlib.pyplot as plt\nfig, ax = plt.subplots()\nt1_fig_type = str(type(fig).__name__)\nt1_ax_type = str(type(ax).__name__)\nplt.close(fig)\nprint(f'{t1_fig_type=}, {t1_ax_type=}')\n",
      "target": "t1_fig_type='Figure', t1_ax_type='Axes'\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t1_fig_type",
            "type": "string",
            "value": "Figure"
          },
          {
            "name": "t1_ax_type",
            "type": "string",
            "value": "Axes"
          }
        ]
      }
    },
    {
      "id": 2,
      "difficulty": "Easy",
      "category": "line_plot",
      "title": "Summing Line Y-Data Values",
      "desc": "Plot line ax.plot([1, 2, 3, 4], [10, 20, 15, 30]). Extract the sum of all plotted y coordinates into integer t2_y_sum (75) and close the figure.",
      "prompt": "<strong>[Assessment Q2] Summing Line Y-Data Values</strong><p>Call <code>fig, ax = plt.subplots()</code> and <code>ax.plot([1, 2, 3, 4], [10, 20, 15, 30])</code>. Extract <code>t2_y_sum = int(sum(ax.lines[0].get_ydata()))</code> and close with <code>plt.close(fig)</code>.</p>",
      "starterCode": "",
      "ref": "import matplotlib.pyplot as plt\nfig, ax = plt.subplots()\nax.plot([1, 2, 3, 4], [10, 20, 15, 30])\nt2_y_sum = int(sum(ax.lines[0].get_ydata()))\nplt.close(fig)\nprint(f'{t2_y_sum=}')\n",
      "solution": "import matplotlib.pyplot as plt\nfig, ax = plt.subplots()\nax.plot([1, 2, 3, 4], [10, 20, 15, 30])\nt2_y_sum = int(sum(ax.lines[0].get_ydata()))\nplt.close(fig)\nprint(f'{t2_y_sum=}')\n",
      "target": "t2_y_sum=75\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t2_y_sum",
            "type": "int",
            "value": 75
          }
        ]
      }
    },
    {
      "id": 3,
      "difficulty": "Easy",
      "category": "bar_chart",
      "title": "Automated Bar Labels with bar_label",
      "desc": "Given bars = ax.bar(['A', 'B'], [15, 25]), attach labels using labels = ax.bar_label(bars). Extract the label text strings into list t3_labels (['15', '25']) and close the figure.",
      "prompt": "<strong>[Assessment Q3] Automated Bar Labels with bar_label</strong><p>Call <code>fig, ax = plt.subplots()</code>, draw <code>bars = ax.bar(['A', 'B'], [15, 25])</code>, and attach <code>labels = ax.bar_label(bars)</code>. Extract <code>t3_labels = [str(t.get_text()) for t in labels]</code> and close with <code>plt.close(fig)</code>.</p>",
      "starterCode": "",
      "ref": "import matplotlib.pyplot as plt\nfig, ax = plt.subplots()\nbars = ax.bar(['A', 'B'], [15, 25])\nlabels = ax.bar_label(bars)\nt3_labels = [str(t.get_text()) for t in labels]\nplt.close(fig)\nprint(f'{t3_labels=}')\n",
      "solution": "import matplotlib.pyplot as plt\nfig, ax = plt.subplots()\nbars = ax.bar(['A', 'B'], [15, 25])\nlabels = ax.bar_label(bars)\nt3_labels = [str(t.get_text()) for t in labels]\nplt.close(fig)\nprint(f'{t3_labels=}')\n",
      "target": "t3_labels=['15', '25']\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t3_labels",
            "type": "list",
            "value": [
              "15",
              "25"
            ]
          }
        ]
      }
    },
    {
      "id": 4,
      "difficulty": "Easy",
      "category": "bar_chart",
      "title": "Horizontal Bar Width Extraction",
      "desc": "Draw horizontal bars: ax.barh(['Jan', 'Feb'], [120, 150]). Extract the width of the second bar rectangle in integer t4_feb_width (150) and close the figure.",
      "prompt": "<strong>[Assessment Q4] Horizontal Bar Width Extraction</strong><p>Call <code>fig, ax = plt.subplots()</code> and <code>ax.barh(['Jan', 'Feb'], [120, 150])</code>. Extract <code>t4_feb_width = int(ax.patches[1].get_width())</code> and close with <code>plt.close(fig)</code>.</p>",
      "starterCode": "",
      "ref": "import matplotlib.pyplot as plt\nfig, ax = plt.subplots()\nax.barh(['Jan', 'Feb'], [120, 150])\nt4_feb_width = int(ax.patches[1].get_width())\nplt.close(fig)\nprint(f'{t4_feb_width=}')\n",
      "solution": "import matplotlib.pyplot as plt\nfig, ax = plt.subplots()\nax.barh(['Jan', 'Feb'], [120, 150])\nt4_feb_width = int(ax.patches[1].get_width())\nplt.close(fig)\nprint(f'{t4_feb_width=}')\n",
      "target": "t4_feb_width=150\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t4_feb_width",
            "type": "int",
            "value": 150
          }
        ]
      }
    },
    {
      "id": 5,
      "difficulty": "Easy",
      "category": "scatter",
      "title": "Color-Encoded Scatter Array Length",
      "desc": "Create a scatter plot sc = ax.scatter([1, 2], [3, 4], c=[0.2, 0.8], cmap='viridis'). Extract the length of the scalar color array into integer t5_has_c (2) and close the figure.",
      "prompt": "<strong>[Assessment Q5] Color-Encoded Scatter Array Length</strong><p>Call <code>fig, ax = plt.subplots()</code> and <code>sc = ax.scatter([1, 2], [3, 4], c=[0.2, 0.8], cmap='viridis')</code>. Extract <code>t5_has_c = int(len(sc.get_array()))</code> and close with <code>plt.close(fig)</code>.</p>",
      "starterCode": "",
      "ref": "import matplotlib.pyplot as plt\nfig, ax = plt.subplots()\nsc = ax.scatter([1, 2], [3, 4], c=[0.2, 0.8], cmap='viridis')\nt5_has_c = int(len(sc.get_array()))\nplt.close(fig)\nprint(f'{t5_has_c=}')\n",
      "solution": "import matplotlib.pyplot as plt\nfig, ax = plt.subplots()\nsc = ax.scatter([1, 2], [3, 4], c=[0.2, 0.8], cmap='viridis')\nt5_has_c = int(len(sc.get_array()))\nplt.close(fig)\nprint(f'{t5_has_c=}')\n",
      "target": "t5_has_c=2\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t5_has_c",
            "type": "int",
            "value": 2
          }
        ]
      }
    },
    {
      "id": 6,
      "difficulty": "Easy",
      "category": "histogram",
      "title": "Histogram Total Frequency Conservation",
      "desc": "Plot a histogram of 10 items [1, 2, 2, 3, 3, 3, 4, 4, 5, 5] with bins=4. Verify that the sum of bin counts equals total data points in integer t6_total_counts (10) and close the figure.",
      "prompt": "<strong>[Assessment Q6] Histogram Total Frequency Conservation</strong><p>Call <code>fig, ax = plt.subplots()</code> and <code>counts, edges, _ = ax.hist([1, 2, 2, 3, 3, 3, 4, 4, 5, 5], bins=4)</code>. Extract <code>t6_total_counts = int(counts.sum())</code> and close with <code>plt.close(fig)</code>.</p>",
      "starterCode": "",
      "ref": "import matplotlib.pyplot as plt\nfig, ax = plt.subplots()\ncounts, edges, _ = ax.hist([1, 2, 2, 3, 3, 3, 4, 4, 5, 5], bins=4)\nt6_total_counts = int(counts.sum())\nplt.close(fig)\nprint(f'{t6_total_counts=}')\n",
      "solution": "import matplotlib.pyplot as plt\nfig, ax = plt.subplots()\ncounts, edges, _ = ax.hist([1, 2, 2, 3, 3, 3, 4, 4, 5, 5], bins=4)\nt6_total_counts = int(counts.sum())\nplt.close(fig)\nprint(f'{t6_total_counts=}')\n",
      "target": "t6_total_counts=10\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t6_total_counts",
            "type": "int",
            "value": 10
          }
        ]
      }
    },
    {
      "id": 7,
      "difficulty": "Easy",
      "category": "subplots",
      "title": "Verifying Linked Shared Y-Axis",
      "desc": "Create fig, axes = plt.subplots(1, 2, sharey=True). Verify that axes[0] and axes[1] share their vertical scale in boolean t7_shared_y (True) and close the figure.",
      "prompt": "<strong>[Assessment Q7] Verifying Linked Shared Y-Axis</strong><p>Call <code>fig, axes = plt.subplots(1, 2, sharey=True)</code>. Check <code>t7_shared_y = bool(axes[0].get_shared_y_axes().joined(axes[0], axes[1]))</code> and close with <code>plt.close(fig)</code>.</p>",
      "starterCode": "",
      "ref": "import matplotlib.pyplot as plt\nfig, axes = plt.subplots(1, 2, sharey=True)\nt7_shared_y = bool(axes[0].get_shared_y_axes().joined(axes[0], axes[1]))\nplt.close(fig)\nprint(f'{t7_shared_y=}')\n",
      "solution": "import matplotlib.pyplot as plt\nfig, axes = plt.subplots(1, 2, sharey=True)\nt7_shared_y = bool(axes[0].get_shared_y_axes().joined(axes[0], axes[1]))\nplt.close(fig)\nprint(f'{t7_shared_y=}')\n",
      "target": "t7_shared_y=True\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t7_shared_y",
            "type": "bool",
            "value": true
          }
        ]
      }
    },
    {
      "id": 8,
      "difficulty": "Easy",
      "category": "labeling",
      "title": "Axis Labels Assignment and Extraction",
      "desc": "Assign ax.set_xlabel('Time (s)') and ax.set_ylabel('Amplitude (V)'). Extract the labels into list t8_labels (['Time (s)', 'Amplitude (V)']) and close the figure.",
      "prompt": "<strong>[Assessment Q8] Axis Labels Assignment and Extraction</strong><p>Call <code>fig, ax = plt.subplots()</code>, set <code>ax.set_xlabel('Time (s)')</code> and <code>ax.set_ylabel('Amplitude (V)')</code>. Extract <code>t8_labels = [str(ax.get_xlabel()), str(ax.get_ylabel())]</code> and close with <code>plt.close(fig)</code>.</p>",
      "starterCode": "",
      "ref": "import matplotlib.pyplot as plt\nfig, ax = plt.subplots()\nax.set_xlabel('Time (s)')\nax.set_ylabel('Amplitude (V)')\nt8_labels = [str(ax.get_xlabel()), str(ax.get_ylabel())]\nplt.close(fig)\nprint(f'{t8_labels=}')\n",
      "solution": "import matplotlib.pyplot as plt\nfig, ax = plt.subplots()\nax.set_xlabel('Time (s)')\nax.set_ylabel('Amplitude (V)')\nt8_labels = [str(ax.get_xlabel()), str(ax.get_ylabel())]\nplt.close(fig)\nprint(f'{t8_labels=}')\n",
      "target": "t8_labels=['Time (s)', 'Amplitude (V)']\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t8_labels",
            "type": "list",
            "value": [
              "Time (s)",
              "Amplitude (V)"
            ]
          }
        ]
      }
    },
    {
      "id": 9,
      "difficulty": "Medium",
      "category": "labeling",
      "title": "Custom Currency Tick Formatter with FuncFormatter",
      "desc": "Define formatter = FuncFormatter(lambda v, _: f'${v:.1f}k'). Format the value 2.5 into string t9_formatted_currency ('$2.5k').",
      "prompt": "<strong>[Assessment Q9] Custom Currency Tick Formatter with FuncFormatter</strong><p>Import <code>from matplotlib.ticker import FuncFormatter</code>. Create <code>formatter = FuncFormatter(lambda v, _: f'${v:.1f}k')</code>. Extract <code>t9_formatted_currency = str(formatter.format_data(2.5))</code>.</p>",
      "starterCode": "",
      "ref": "from matplotlib.ticker import FuncFormatter\nformatter = FuncFormatter(lambda v, _: f'${v:.1f}k')\nt9_formatted_currency = str(formatter.format_data(2.5))\nprint(f'{t9_formatted_currency=}')\n",
      "solution": "from matplotlib.ticker import FuncFormatter\nformatter = FuncFormatter(lambda v, _: f'${v:.1f}k')\nt9_formatted_currency = str(formatter.format_data(2.5))\nprint(f'{t9_formatted_currency=}')\n",
      "target": "t9_formatted_currency='$2.5k'\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t9_formatted_currency",
            "type": "string",
            "value": "$2.5k"
          }
        ]
      }
    },
    {
      "id": 10,
      "difficulty": "Easy",
      "category": "labeling",
      "title": "Counting Rendered Legend Items",
      "desc": "Plot two lines with labels 'A' and 'B', call leg = ax.legend(loc='upper left'). Extract the number of legend label text elements into integer t10_leg_count (2) and close the figure.",
      "prompt": "<strong>[Assessment Q10] Counting Rendered Legend Items</strong><p>Plot two series: <code>ax.plot([1, 2], label='A')</code> and <code>ax.plot([2, 1], label='B')</code>. Call <code>leg = ax.legend(loc='upper left')</code>, extract <code>t10_leg_count = int(len(leg.get_texts()))</code>, and close with <code>plt.close(fig)</code>.</p>",
      "starterCode": "",
      "ref": "import matplotlib.pyplot as plt\nfig, ax = plt.subplots()\nax.plot([1, 2], label='A')\nax.plot([2, 1], label='B')\nleg = ax.legend(loc='upper left')\nt10_leg_count = int(len(leg.get_texts()))\nplt.close(fig)\nprint(f'{t10_leg_count=}')\n",
      "solution": "import matplotlib.pyplot as plt\nfig, ax = plt.subplots()\nax.plot([1, 2], label='A')\nax.plot([2, 1], label='B')\nleg = ax.legend(loc='upper left')\nt10_leg_count = int(len(leg.get_texts()))\nplt.close(fig)\nprint(f'{t10_leg_count=}')\n",
      "target": "t10_leg_count=2\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t10_leg_count",
            "type": "int",
            "value": 2
          }
        ]
      }
    },
    {
      "id": 11,
      "difficulty": "Easy",
      "category": "annotation",
      "title": "Vertical Event Reference Line Coordinate",
      "desc": "Draw a vertical reference marker line = ax.axvline(42.5, color='green'). Extract the x coordinate from the line into float t11_vline_x (42.5) and close the figure.",
      "prompt": "<strong>[Assessment Q11] Vertical Event Reference Line Coordinate</strong><p>Call <code>fig, ax = plt.subplots()</code> and <code>line = ax.axvline(42.5, color='green')</code>. Extract <code>t11_vline_x = float(line.get_xdata()[0])</code> and close with <code>plt.close(fig)</code>.</p>",
      "starterCode": "",
      "ref": "import matplotlib.pyplot as plt\nfig, ax = plt.subplots()\nline = ax.axvline(42.5, color='green')\nt11_vline_x = float(line.get_xdata()[0])\nplt.close(fig)\nprint(f'{t11_vline_x=}')\n",
      "solution": "import matplotlib.pyplot as plt\nfig, ax = plt.subplots()\nline = ax.axvline(42.5, color='green')\nt11_vline_x = float(line.get_xdata()[0])\nplt.close(fig)\nprint(f'{t11_vline_x=}')\n",
      "target": "t11_vline_x=42.5\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t11_vline_x",
            "type": "float",
            "value": 42.5,
            "tolerance": 0.01
          }
        ]
      }
    },
    {
      "id": 12,
      "difficulty": "Easy",
      "category": "annotation",
      "title": "Verifying Annotation Text Content",
      "desc": "Add annotation ax.annotate('Outlier', xy=(5, 95), xytext=(6, 110)). Extract the text string from ax.texts[0].get_text() into string t12_anno_str ('Outlier') and close the figure.",
      "prompt": "<strong>[Assessment Q12] Verifying Annotation Text Content</strong><p>Call <code>fig, ax = plt.subplots()</code> and <code>ax.annotate('Outlier', xy=(5, 95), xytext=(6, 110))</code>. Extract <code>t12_anno_str = str(ax.texts[0].get_text())</code> and close with <code>plt.close(fig)</code>.</p>",
      "starterCode": "",
      "ref": "import matplotlib.pyplot as plt\nfig, ax = plt.subplots()\nax.annotate('Outlier', xy=(5, 95), xytext=(6, 110))\nt12_anno_str = str(ax.texts[0].get_text())\nplt.close(fig)\nprint(f'{t12_anno_str=}')\n",
      "solution": "import matplotlib.pyplot as plt\nfig, ax = plt.subplots()\nax.annotate('Outlier', xy=(5, 95), xytext=(6, 110))\nt12_anno_str = str(ax.texts[0].get_text())\nplt.close(fig)\nprint(f'{t12_anno_str=}')\n",
      "target": "t12_anno_str='Outlier'\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t12_anno_str",
            "type": "string",
            "value": "Outlier"
          }
        ]
      }
    },
    {
      "id": 13,
      "difficulty": "Medium",
      "category": "subplots",
      "title": "Dual-Axis Artist Distribution",
      "desc": "Draw bars on ax and a line on twin = ax.twinx(). Extract the count of bar patches in t13_patches (2) and line artists on twin in t13_lines (1) and close the figure.",
      "prompt": "<strong>[Assessment Q13] Dual-Axis Artist Distribution</strong><p>Call <code>fig, ax = plt.subplots()</code>, draw <code>ax.bar(['M1', 'M2'], [10, 20])</code>, create <code>twin = ax.twinx()</code>, and plot <code>twin.plot(['M1', 'M2'], [5.5, 6.2])</code>. Extract <code>t13_patches = int(len(ax.patches))</code> and <code>t13_lines = int(len(twin.lines))</code>. Close with <code>plt.close(fig)</code>.</p>",
      "starterCode": "",
      "ref": "import matplotlib.pyplot as plt\nfig, ax = plt.subplots()\nax.bar(['M1', 'M2'], [10, 20])\ntwin = ax.twinx()\ntwin.plot(['M1', 'M2'], [5.5, 6.2])\nt13_patches = int(len(ax.patches))\nt13_lines = int(len(twin.lines))\nplt.close(fig)\nprint(f'{t13_patches=}, {t13_lines=}')\n",
      "solution": "import matplotlib.pyplot as plt\nfig, ax = plt.subplots()\nax.bar(['M1', 'M2'], [10, 20])\ntwin = ax.twinx()\ntwin.plot(['M1', 'M2'], [5.5, 6.2])\nt13_patches = int(len(ax.patches))\nt13_lines = int(len(twin.lines))\nplt.close(fig)\nprint(f'{t13_patches=}, {t13_lines=}')\n",
      "target": "t13_patches=2, t13_lines=1\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t13_patches",
            "type": "int",
            "value": 2
          },
          {
            "name": "t13_lines",
            "type": "int",
            "value": 1
          }
        ]
      }
    },
    {
      "id": 14,
      "difficulty": "Medium",
      "category": "bar_chart",
      "title": "Grouped Bar Chart Total Patch Count",
      "desc": "Draw two groups of 2 bars using width=0.35: ax.bar(i - w/2, [10, 20]) and ax.bar(i + w/2, [15, 25]). Extract the total number of rectangle patches in integer t14_total_patches (4) and close the figure.",
      "prompt": "<strong>[Assessment Q14] Grouped Bar Chart Total Patch Count</strong><p>Given <code>w = 0.35</code> and <code>i = np.arange(2)</code>: Call <code>fig, ax = plt.subplots()</code>, draw <code>ax.bar(i - w/2, [10, 20], width=w)</code> and <code>ax.bar(i + w/2, [15, 25], width=w)</code>. Extract <code>t14_total_patches = int(len(ax.patches))</code> and close with <code>plt.close(fig)</code>.</p>",
      "starterCode": "",
      "ref": "import numpy as np\nimport matplotlib.pyplot as plt\nfig, ax = plt.subplots()\nw = 0.35\ni = np.arange(2)\nax.bar(i - w/2, [10, 20], width=w)\nax.bar(i + w/2, [15, 25], width=w)\nt14_total_patches = int(len(ax.patches))\nplt.close(fig)\nprint(f'{t14_total_patches=}')\n",
      "solution": "import numpy as np\nimport matplotlib.pyplot as plt\nfig, ax = plt.subplots()\nw = 0.35\ni = np.arange(2)\nax.bar(i - w/2, [10, 20], width=w)\nax.bar(i + w/2, [15, 25], width=w)\nt14_total_patches = int(len(ax.patches))\nplt.close(fig)\nprint(f'{t14_total_patches=}')\n",
      "target": "t14_total_patches=4\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t14_total_patches",
            "type": "int",
            "value": 4
          }
        ]
      }
    },
    {
      "id": 15,
      "difficulty": "Easy",
      "category": "styling",
      "title": "Decluttering Spines Visibility Check",
      "desc": "Hide top and right spines via ax.spines['top'].set_visible(False) and ax.spines['right'].set_visible(False). Extract the visibility of the top spine into boolean t15_top_visible (False) and close the figure.",
      "prompt": "<strong>[Assessment Q15] Decluttering Spines Visibility Check</strong><p>Call <code>fig, ax = plt.subplots()</code>, set <code>ax.spines['top'].set_visible(False)</code> and <code>ax.spines['right'].set_visible(False)</code>. Extract <code>t15_top_visible = bool(ax.spines['top'].get_visible())</code> and close with <code>plt.close(fig)</code>.</p>",
      "starterCode": "",
      "ref": "import matplotlib.pyplot as plt\nfig, ax = plt.subplots()\nax.spines['top'].set_visible(False)\nax.spines['right'].set_visible(False)\nt15_top_visible = bool(ax.spines['top'].get_visible())\nplt.close(fig)\nprint(f'{t15_top_visible=}')\n",
      "solution": "import matplotlib.pyplot as plt\nfig, ax = plt.subplots()\nax.spines['top'].set_visible(False)\nax.spines['right'].set_visible(False)\nt15_top_visible = bool(ax.spines['top'].get_visible())\nplt.close(fig)\nprint(f'{t15_top_visible=}')\n",
      "target": "t15_top_visible=False\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t15_top_visible",
            "type": "bool",
            "value": false
          }
        ]
      }
    },
    {
      "id": 16,
      "difficulty": "Easy",
      "category": "architecture",
      "title": "Pandas Series Plot Line Peak Extraction",
      "desc": "Given Series s = pd.Series([100, 200, 300]), call ax = s.plot(kind='line'). Extract the maximum y-data point from the line into integer t16_y_max (300) and close the figure.",
      "prompt": "<strong>[Assessment Q16] Pandas Series Plot Line Peak Extraction</strong><p>Given <code>s = pd.Series([100, 200, 300])</code>: Call <code>ax = s.plot(kind='line')</code>. Extract <code>t16_y_max = int(max(ax.lines[0].get_ydata()))</code> and close with <code>plt.close(ax.figure)</code>.</p>",
      "starterCode": "",
      "ref": "import pandas as pd\nimport matplotlib.pyplot as plt\ns = pd.Series([100, 200, 300])\nax = s.plot(kind='line')\nt16_y_max = int(max(ax.lines[0].get_ydata()))\nplt.close(ax.figure)\nprint(f'{t16_y_max=}')\n",
      "solution": "import pandas as pd\nimport matplotlib.pyplot as plt\ns = pd.Series([100, 200, 300])\nax = s.plot(kind='line')\nt16_y_max = int(max(ax.lines[0].get_ydata()))\nplt.close(ax.figure)\nprint(f'{t16_y_max=}')\n",
      "target": "t16_y_max=300\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t16_y_max",
            "type": "int",
            "value": 300
          }
        ]
      }
    },
    {
      "id": 17,
      "difficulty": "Medium",
      "category": "styling",
      "title": "Saving Figure to In-Memory PNG Buffer",
      "desc": "Render a figure to BytesIO buffer via fig.savefig(buf, format='png'). Verify the buffer begins with the standard PNG magic byte sequence in boolean t17_is_png (True) and close the figure.",
      "prompt": "<strong>[Assessment Q17] Saving Figure to In-Memory PNG Buffer</strong><p>Import <code>import io</code>. Call <code>fig, ax = plt.subplots()</code> and <code>ax.plot([1, 2], [3, 4])</code>. Save to buffer: <code>buf = io.BytesIO()</code>; <code>fig.savefig(buf, format='png')</code>. Verify <code>t17_is_png = bool(buf.getvalue().startswith(b'\\x89PNG'))</code> and close with <code>plt.close(fig)</code>.</p>",
      "starterCode": "",
      "ref": "import io\nimport matplotlib.pyplot as plt\nfig, ax = plt.subplots()\nax.plot([1, 2], [3, 4])\nbuf = io.BytesIO()\nfig.savefig(buf, format='png')\nt17_is_png = bool(buf.getvalue().startswith(b'\\x89PNG'))\nplt.close(fig)\nprint(f'{t17_is_png=}')\n",
      "solution": "import io\nimport matplotlib.pyplot as plt\nfig, ax = plt.subplots()\nax.plot([1, 2], [3, 4])\nbuf = io.BytesIO()\nfig.savefig(buf, format='png')\nt17_is_png = bool(buf.getvalue().startswith(b'\\x89PNG'))\nplt.close(fig)\nprint(f'{t17_is_png=}')\n",
      "target": "t17_is_png=True\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t17_is_png",
            "type": "bool",
            "value": true
          }
        ]
      }
    },
    {
      "id": 18,
      "difficulty": "Medium",
      "category": "styling",
      "title": "Physical Figure Dimensions to Pixel Resolution",
      "desc": "Define def calc_pixel_dims(w, h, dpi): return [int(w * dpi), int(h * dpi)]. Calculate the width and height in pixels for a 10x6 inch figure rendered at 200 dpi into list t18_pixels ([2000, 1200]).",
      "prompt": "<strong>[Assessment Q18] Physical Figure Dimensions to Pixel Resolution</strong><p>Define <code>def calc_pixel_dims(w, h, dpi): return [int(w * dpi), int(h * dpi)]</code>. Compute <code>t18_pixels = calc_pixel_dims(10, 6, 200)</code>.</p>",
      "starterCode": "",
      "ref": "def calc_pixel_dims(w, h, dpi):\n    return [int(w * dpi), int(h * dpi)]\nt18_pixels = calc_pixel_dims(10, 6, 200)\nprint(f'{t18_pixels=}')\n",
      "solution": "def calc_pixel_dims(w, h, dpi):\n    return [int(w * dpi), int(h * dpi)]\nt18_pixels = calc_pixel_dims(10, 6, 200)\nprint(f'{t18_pixels=}')\n",
      "target": "t18_pixels=[2000, 1200]\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t18_pixels",
            "type": "list",
            "value": [
              2000,
              1200
            ]
          }
        ]
      }
    },
    {
      "id": 19,
      "difficulty": "Medium",
      "category": "styling",
      "title": "Scoped rc_context Linewidth Override",
      "desc": "Use with plt.rc_context({'lines.linewidth': 4.5}): to plot a line on ax. Extract the plotted line's get_linewidth() into float t19_linewidth (4.5) and close the figure.",
      "prompt": "<strong>[Assessment Q19] Scoped rc_context Linewidth Override</strong><p>Call <code>fig, ax = plt.subplots()</code>. Inside <code>with plt.rc_context({'lines.linewidth': 4.5}):</code> plot <code>(line,) = ax.plot([1, 2])</code> and extract <code>t19_linewidth = float(line.get_linewidth())</code>. Close with <code>plt.close(fig)</code>.</p>",
      "starterCode": "",
      "ref": "import matplotlib.pyplot as plt\nfig, ax = plt.subplots()\nwith plt.rc_context({'lines.linewidth': 4.5}):\n    (line,) = ax.plot([1, 2])\n    t19_linewidth = float(line.get_linewidth())\nplt.close(fig)\nprint(f'{t19_linewidth=}')\n",
      "solution": "import matplotlib.pyplot as plt\nfig, ax = plt.subplots()\nwith plt.rc_context({'lines.linewidth': 4.5}):\n    (line,) = ax.plot([1, 2])\n    t19_linewidth = float(line.get_linewidth())\nplt.close(fig)\nprint(f'{t19_linewidth=}')\n",
      "target": "t19_linewidth=4.5\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t19_linewidth",
            "type": "float",
            "value": 4.5,
            "tolerance": 0.01
          }
        ]
      }
    },
    {
      "id": 20,
      "difficulty": "Medium",
      "category": "histogram",
      "title": "Bin Count Calculation from Range and Width",
      "desc": "Given min_val=0, max_val=100, and bin_width=10, write helper def calc_num_bins(min_val, max_val, bin_width): return int(np.ceil((max_val - min_val) / bin_width)). Compute for range into integer t20_num_bins (10).",
      "prompt": "<strong>[Assessment Q20] Bin Count Calculation from Range and Width</strong><p>Import <code>import numpy as np</code>. Define <code>def calc_num_bins(min_val, max_val, bin_width): return int(np.ceil((max_val - min_val) / bin_width))</code>. Compute <code>t20_num_bins = calc_num_bins(0, 100, 10)</code>.</p>",
      "starterCode": "",
      "ref": "import numpy as np\ndef calc_num_bins(min_val, max_val, bin_width):\n    return int(np.ceil((max_val - min_val) / bin_width))\nt20_num_bins = calc_num_bins(0, 100, 10)\nprint(f'{t20_num_bins=}')\n",
      "solution": "import numpy as np\ndef calc_num_bins(min_val, max_val, bin_width):\n    return int(np.ceil((max_val - min_val) / bin_width))\nt20_num_bins = calc_num_bins(0, 100, 10)\nprint(f'{t20_num_bins=}')\n",
      "target": "t20_num_bins=10\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t20_num_bins",
            "type": "int",
            "value": 10
          }
        ]
      }
    },
    {
      "id": 21,
      "difficulty": "Medium",
      "category": "histogram",
      "title": "Box Plot Box Artist Count",
      "desc": "Draw a boxplot bp = ax.boxplot([10, 20, 30, 40, 50]). Extract the number of drawn boxes into integer t21_num_boxes (1) and close the figure.",
      "prompt": "<strong>[Assessment Q21] Box Plot Box Artist Count</strong><p>Call <code>fig, ax = plt.subplots()</code> and <code>bp = ax.boxplot([10, 20, 30, 40, 50])</code>. Extract <code>t21_num_boxes = int(len(bp['boxes']))</code> and close with <code>plt.close(fig)</code>.</p>",
      "starterCode": "",
      "ref": "import matplotlib.pyplot as plt\nfig, ax = plt.subplots()\nbp = ax.boxplot([10, 20, 30, 40, 50])\nt21_num_boxes = int(len(bp['boxes']))\nplt.close(fig)\nprint(f'{t21_num_boxes=}')\n",
      "solution": "import matplotlib.pyplot as plt\nfig, ax = plt.subplots()\nbp = ax.boxplot([10, 20, 30, 40, 50])\nt21_num_boxes = int(len(bp['boxes']))\nplt.close(fig)\nprint(f'{t21_num_boxes=}')\n",
      "target": "t21_num_boxes=1\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t21_num_boxes",
            "type": "int",
            "value": 1
          }
        ]
      }
    },
    {
      "id": 22,
      "difficulty": "Hard",
      "category": "production",
      "title": "Purging All Figures with plt.close('all')",
      "desc": "Open 3 figures in a loop, then call plt.close('all'). Verify that the count of open figure numbers returned by plt.get_fignums() equals 0 in integer t22_open_figs (0).",
      "prompt": "<strong>[Assessment Q22] Purging All Figures with plt.close('all')</strong><p>Loop 3 times calling <code>plt.figure()</code>. Call <code>plt.close('all')</code>. Extract <code>t22_open_figs = int(len(plt.get_fignums()))</code>.</p>",
      "starterCode": "",
      "ref": "import matplotlib.pyplot as plt\nfor _ in range(3):\n    plt.figure()\nplt.close('all')\nt22_open_figs = int(len(plt.get_fignums()))\nprint(f'{t22_open_figs=}')\n",
      "solution": "import matplotlib.pyplot as plt\nfor _ in range(3):\n    plt.figure()\nplt.close('all')\nt22_open_figs = int(len(plt.get_fignums()))\nprint(f'{t22_open_figs=}')\n",
      "target": "t22_open_figs=0\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t22_open_figs",
            "type": "int",
            "value": 0
          }
        ]
      }
    },
    {
      "id": 23,
      "difficulty": "Medium",
      "category": "annotation",
      "title": "Shaded Area Collection Count with fill_between",
      "desc": "Draw a shaded area under a curve using ax.fill_between([1, 2, 3], [10, 20, 30], alpha=0.2). Extract the number of PolyCollection artists stored in ax.collections into integer t23_has_collections (1) and close the figure.",
      "prompt": "<strong>[Assessment Q23] Shaded Area Collection Count with fill_between</strong><p>Call <code>fig, ax = plt.subplots()</code> and <code>ax.fill_between([1, 2, 3], [10, 20, 30], alpha=0.2)</code>. Extract <code>t23_has_collections = int(len(ax.collections))</code> and close with <code>plt.close(fig)</code>.</p>",
      "starterCode": "",
      "ref": "import matplotlib.pyplot as plt\nfig, ax = plt.subplots()\nax.fill_between([1, 2, 3], [10, 20, 30], alpha=0.2)\nt23_has_collections = int(len(ax.collections))\nplt.close(fig)\nprint(f'{t23_has_collections=}')\n",
      "solution": "import matplotlib.pyplot as plt\nfig, ax = plt.subplots()\nax.fill_between([1, 2, 3], [10, 20, 30], alpha=0.2)\nt23_has_collections = int(len(ax.collections))\nplt.close(fig)\nprint(f'{t23_has_collections=}')\n",
      "target": "t23_has_collections=1\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t23_has_collections",
            "type": "int",
            "value": 1
          }
        ]
      }
    },
    {
      "id": 24,
      "difficulty": "Hard",
      "category": "production",
      "title": "Registry-Free Pure OOP Canvas Instantiation",
      "desc": "Instantiate Figure() and FigureCanvasAgg(f) directly without touching pyplot. Verify that this figure is NOT registered in pyplot's get_fignums() into boolean t24_in_pyplot (False).",
      "prompt": "<strong>[Assessment Q24] Registry-Free Pure OOP Canvas Instantiation</strong><p>Import <code>from matplotlib.figure import Figure</code> and <code>from matplotlib.backends.backend_agg import FigureCanvasAgg</code>. Initialize <code>f = Figure()</code>, <code>c = FigureCanvasAgg(f)</code>, and draw <code>ax = f.subplots(); ax.plot([1, 2])</code>. Verify <code>t24_in_pyplot = bool(hasattr(f, 'number') and f.number in plt.get_fignums())</code>.</p>",
      "starterCode": "",
      "ref": "import matplotlib.pyplot as plt\nfrom matplotlib.figure import Figure\nfrom matplotlib.backends.backend_agg import FigureCanvasAgg\nf = Figure()\nc = FigureCanvasAgg(f)\nax = f.subplots()\nax.plot([1, 2])\nt24_in_pyplot = bool(hasattr(f, 'number') and f.number in plt.get_fignums())\nprint(f'{t24_in_pyplot=}')\n",
      "solution": "import matplotlib.pyplot as plt\nfrom matplotlib.figure import Figure\nfrom matplotlib.backends.backend_agg import FigureCanvasAgg\nf = Figure()\nc = FigureCanvasAgg(f)\nax = f.subplots()\nax.plot([1, 2])\nt24_in_pyplot = bool(hasattr(f, 'number') and f.number in plt.get_fignums())\nprint(f'{t24_in_pyplot=}')\n",
      "target": "t24_in_pyplot=False\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t24_in_pyplot",
            "type": "bool",
            "value": false
          }
        ]
      }
    },
    {
      "id": 25,
      "difficulty": "Medium",
      "category": "scatter",
      "title": "Linear Regression Trend Line Fitting",
      "desc": "Given x = np.array([0, 1, 2, 3]) and y = np.array([1, 3, 5, 7]), fit degree-1 polynomial m, b = np.polyfit(x, y, 1). Extract slope float t25_slope (2.0) and intercept float t25_intercept (1.0).",
      "prompt": "<strong>[Assessment Q25] Linear Regression Trend Line Fitting</strong><p>Given <code>x = np.array([0, 1, 2, 3])</code> and <code>y = np.array([1, 3, 5, 7])</code>: Fit with <code>m, b = np.polyfit(x, y, 1)</code>. Extract <code>t25_slope = float(round(m, 1))</code> and <code>t25_intercept = float(round(b, 1))</code>.</p>",
      "starterCode": "",
      "ref": "import numpy as np\nx = np.array([0, 1, 2, 3])\ny = np.array([1, 3, 5, 7])\nm, b = np.polyfit(x, y, 1)\nt25_slope = float(round(m, 1))\nt25_intercept = float(round(b, 1))\nprint(f'{t25_slope=}, {t25_intercept=}')\n",
      "solution": "import numpy as np\nx = np.array([0, 1, 2, 3])\ny = np.array([1, 3, 5, 7])\nm, b = np.polyfit(x, y, 1)\nt25_slope = float(round(m, 1))\nt25_intercept = float(round(b, 1))\nprint(f'{t25_slope=}, {t25_intercept=}')\n",
      "target": "t25_slope=2.0, t25_intercept=1.0\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t25_slope",
            "type": "float",
            "value": 2,
            "tolerance": 0.01
          },
          {
            "name": "t25_intercept",
            "type": "float",
            "value": 1,
            "tolerance": 0.01
          }
        ]
      }
    }
  ]
};
