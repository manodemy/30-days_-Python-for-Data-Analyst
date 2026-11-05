// Python Course Content — Day 09 (Loops, Iteration Mechanics & Control Flow)
if (!window.COURSE_CONTENT) window.COURSE_CONTENT = {};
window.COURSE_CONTENT['pyDay09'] = {
  "day": 9,
  "title": "Loops & Iteration Mechanics",
  "emoji": "\ud83d\udd01",
  "topics": [
    "Iteration Fundamentals",
    "for Loops & Iterables",
    "The range() Function",
    "enumerate() & zip() Functions",
    "while Loops & Sentinels",
    "Loop Control (break, continue, pass)",
    "The Loop else Clause",
    "Nested Loops & Matrix Traversal",
    "Common Anti-Patterns",
    "Review & Interview Questions"
],
  "slides": [
    {
      "title": "Loops, Iteration Mechanics & Control Flow",
      "html": "<style>\n  /* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n     BASE & DARK THEME (DEFAULT)\n     \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n  /* \u2500\u2500 Flagship Dual-Box Heading Architecture (SQL Day 01 Parity) \u2500\u2500 */\n  .heading-box-wrap,\n  .slide-section-title.heading-box-wrap {\n    display: flex !important;\n    align-items: stretch !important;\n    gap: 0 !important;\n    background: transparent !important;\n    border: none !important;\n    padding: 0 !important;\n    margin: 24px 0 14px 0 !important;\n    filter: drop-shadow(0 4px 14px rgba(0, 0, 0, 0.35)) !important;\n  }\n  .heading-num-box {\n    display: flex !important;\n    align-items: center !important;\n    justify-content: center !important;\n    min-width: 48px !important;\n    padding: 0 14px !important;\n    background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%) !important;\n    color: #ffffff !important;\n    font-family: 'JetBrains Mono', monospace !important;\n    font-size: 1.05rem !important;\n    font-weight: 800 !important;\n    letter-spacing: 0.05em !important;\n    border-radius: 8px 0 0 8px !important;\n    border: 1px solid rgba(56, 189, 248, 0.4) !important;\n    border-right: none !important;\n    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2) !important;\n    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4) !important;\n  }\n  .heading-title-box {\n    display: flex !important;\n    align-items: center !important;\n    justify-content: space-between !important;\n    flex: 1 !important;\n    padding: 10px 16px !important;\n    background: linear-gradient(90deg, #0b1329 0%, #080e1e 100%) !important;\n    border-radius: 0 8px 8px 0 !important;\n    border: 1px solid rgba(56, 189, 248, 0.25) !important;\n    border-left: 1px solid rgba(56, 189, 248, 0.15) !important;\n    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05) !important;\n  }\n  .heading-title-text {\n    font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif !important;\n    font-size: 1.08rem !important;\n    font-weight: 700 !important;\n    color: #f0f6fc !important;\n    letter-spacing: -0.01em !important;\n    line-height: 1.35 !important;\n  }\n  .audio-play-btn {\n    display: inline-flex !important;\n    align-items: center !important;\n    justify-content: center !important;\n    width: 28px !important;\n    height: 28px !important;\n    margin-left: 12px !important;\n    border-radius: 50% !important;\n    background: rgba(56, 189, 248, 0.15) !important;\n    border: 1px solid rgba(56, 189, 248, 0.4) !important;\n    color: #38bdf8 !important;\n    cursor: pointer !important;\n    transition: all 0.2s ease !important;\n    flex-shrink: 0 !important;\n  }\n  .audio-play-btn:hover {\n    background: rgba(56, 189, 248, 0.3) !important;\n    transform: scale(1.08) !important;\n    color: #ffffff !important;\n  }\n\n  /* \u2500\u2500 2D Frozen Table System \u2500\u2500 */\n  .table-header-wrap {\n    display: flex !important;\n    align-items: center !important;\n    justify-content: space-between !important;\n    padding: 10px 14px !important;\n    background-color: #0d1527 !important;\n    border: 1px solid rgba(255, 255, 255, 0.08) !important;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.06) !important;\n    border-radius: 8px 8px 0 0 !important;\n  }\n  .table-header-title {\n    margin: 0 !important;\n    font-size: 0.92rem !important;\n    font-weight: 700 !important;\n    color: #f8fafc !important;\n  }\n  .table-search-box {\n    display: flex !important;\n    align-items: center !important;\n    background: rgba(0, 0, 0, 0.4) !important;\n    border: 1px solid rgba(255, 255, 255, 0.12) !important;\n    border-radius: 6px !important;\n    padding: 4px 8px !important;\n    gap: 6px !important;\n  }\n  .table-search-input {\n    background: transparent !important;\n    border: none !important;\n    color: #f8fafc !important;\n    font-size: 0.8rem !important;\n    outline: none !important;\n    width: 140px !important;\n  }\n  .db-mock-table-wrap {\n    max-height: 520px !important;\n    overflow: auto !important;\n    position: relative !important;\n    border: 1px solid rgba(255, 255, 255, 0.08) !important;\n    border-top: none !important;\n    border-radius: 0 0 8px 8px !important;\n    margin-bottom: 18px !important;\n  }\n  .db-mock-table-wrap thead th {\n    position: sticky !important;\n    top: 0 !important;\n    z-index: 12 !important;\n    background-color: #0f172a !important;\n    color: #38bdf8 !important;\n    font-weight: 700 !important;\n    font-size: 0.82rem !important;\n    padding: 10px 12px !important;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.12) !important;\n  }\n  .db-mock-table-wrap tbody td:first-child,\n  .db-mock-table-wrap thead th:first-child {\n    position: sticky !important;\n    left: 0 !important;\n    z-index: 15 !important;\n    background-color: #0f172a !important;\n    font-family: 'JetBrains Mono', monospace !important;\n    font-weight: 600 !important;\n  }\n  .db-mock-table-wrap thead th:first-child {\n    z-index: 25 !important;\n  }\n  .db-mock-table-wrap tbody td {\n    padding: 8px 12px !important;\n    font-size: 0.82rem !important;\n    color: #cbd5e1 !important;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.04) !important;\n  }\n\n  /* \u2500\u2500 macOS IDE Code Subblock \u2500\u2500 */\n  .code-subblock {\n    background: #080d1a !important;\n    border: 1px solid rgba(56, 189, 248, 0.2) !important;\n    border-radius: 8px !important;\n    margin: 14px 0 !important;\n    overflow: hidden !important;\n    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4) !important;\n  }\n  .code-subblock-header {\n    display: flex !important;\n    align-items: center !important;\n    justify-content: space-between !important;\n    padding: 8px 14px !important;\n    background: #050811 !important;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;\n  }\n  .mac-dots {\n    display: flex !important;\n    gap: 6px !important;\n  }\n  .mac-dot {\n    width: 10px !important;\n    height: 10px !important;\n    border-radius: 50% !important;\n  }\n  .mac-dot.red { background: #ef4444 !important; }\n  .mac-dot.yellow { background: #f59e0b !important; }\n  .mac-dot.green { background: #10b981 !important; }\n  .code-subblock-title {\n    font-family: 'JetBrains Mono', monospace !important;\n    font-size: 0.78rem !important;\n    color: #94a3b8 !important;\n  }\n  .code-subblock-body {\n    padding: 12px 16px !important;\n    margin: 0 !important;\n    background: #080d1a !important;\n    font-family: 'JetBrains Mono', monospace !important;\n    font-size: 0.84rem !important;\n    line-height: 1.55 !important;\n    color: #e2e8f0 !important;\n    overflow-x: auto !important;\n  }\n  .py-kw { color: #f43f5e !important; font-weight: 700 !important; }\n  .py-fn { color: #38bdf8 !important; }\n  .py-str { color: #34d399 !important; }\n  .py-num { color: #fbbf24 !important; }\n  .py-var { color: #e2e8f0 !important; }\n  .py-comment { color: #64748b !important; font-style: italic !important; }\n  [data-theme=\"light\"] .py-kw { color: #be123c !important; }\n  [data-theme=\"light\"] .py-fn { color: #1d4ed8 !important; }\n  [data-theme=\"light\"] .py-str { color: #15803d !important; }\n  [data-theme=\"light\"] .py-num { color: #b45309 !important; }\n  [data-theme=\"light\"] .py-var { color: #0f172a !important; font-weight: 600 !important; }\n  [data-theme=\"light\"] .py-comment { color: #64748b !important; }\n  [data-theme=\"light\"] .ap-code-bad { color: #be123c !important; background: #fff1f2 !important; border: 1px solid #fecdd3 !important; }\n  [data-theme=\"light\"] .ap-code-fix { color: #047857 !important; background: #ecfdf5 !important; border: 1px solid #a7f3d0 !important; }\n\n  /* \u2500\u2500 Master Anti-Pattern Table \u2500\u2500 */\n  .anti-pattern-table thead th {\n    background-color: #1a080d !important;\n    color: #fb7185 !important;\n  }\n  .ap-code-bad {\n    color: #f87171 !important;\n    font-family: 'JetBrains Mono', monospace !important;\n    background: rgba(239, 68, 68, 0.1) !important;\n    padding: 2px 6px !important;\n    border-radius: 4px !important;\n  }\n  .ap-result-bad {\n    color: #fca5a5 !important;\n    font-size: 0.78rem !important;\n  }\n  .ap-code-fix {\n    color: #34d399 !important;\n    font-family: 'JetBrains Mono', monospace !important;\n    background: rgba(16, 185, 129, 0.1) !important;\n    padding: 2px 6px !important;\n    border-radius: 4px !important;\n  }\n\n  /* \u2500\u2500 Key Notes Cards \u2500\u2500 */\n  .py-keynotes-card {\n    background: linear-gradient(135deg, rgba(8, 14, 30, 0.8) 0%, rgba(13, 22, 45, 0.8) 100%) !important;\n    border: 1px solid rgba(56, 189, 248, 0.25) !important;\n    border-radius: 8px !important;\n    padding: 14px 18px !important;\n    margin: 16px 0 !important;\n  }\n  .py-keynotes-header {\n    display: flex !important;\n    align-items: center !important;\n    gap: 8px !important;\n    margin-bottom: 8px !important;\n  }\n  .py-keynotes-badge {\n    background: rgba(56, 189, 248, 0.2) !important;\n    color: #38bdf8 !important;\n    font-size: 0.72rem !important;\n    font-weight: 800 !important;\n    padding: 2px 8px !important;\n    border-radius: 4px !important;\n    letter-spacing: 0.05em !important;\n  }\n  .py-keynotes-title {\n    font-size: 0.92rem !important;\n    font-weight: 700 !important;\n    color: #f8fafc !important;\n    margin: 0 !important;\n  }\n  .py-keynotes-list {\n    margin: 0 !important;\n    padding-left: 20px !important;\n    color: #cbd5e1 !important;\n    font-size: 0.84rem !important;\n    line-height: 1.6 !important;\n    text-align: justify !important;\n    text-align-last: left !important;\n  }\n\n  /* \u2500\u2500 Interview Box \u2500\u2500 */\n  .interview-box {\n    background: #090e1f !important;\n    border: 1px solid rgba(56, 189, 248, 0.25) !important;\n    border-radius: 10px !important;\n    padding: 20px !important;\n    margin-top: 18px !important;\n  }\n  .interview-header-title {\n    color: #38bdf8 !important;\n    font-size: 1.05rem !important;\n    font-weight: 800 !important;\n    margin-bottom: 16px !important;\n  }\n  .interview-item {\n    margin: 12px 0 !important;\n  }\n  .interview-question {\n    color: #f8fafc !important;\n    font-size: 0.9rem !important;\n    margin-bottom: 6px !important;\n  }\n  .interview-answer {\n    color: #94a3b8 !important;\n    font-size: 0.84rem !important;\n    line-height: 1.55 !important;\n    padding-left: 12px !important;\n    border-left: 2px solid rgba(56, 189, 248, 0.3) !important;\n  }\n  .interview-divider {\n    border: none !important;\n    border-top: 1px solid rgba(255, 255, 255, 0.06) !important;\n    margin: 12px 0 !important;\n  }\n\n  /* \u2500\u2500 Light Theme Overrides \u2500\u2500 */\n  [data-theme=\"light\"] .heading-num-box {\n    background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%) !important;\n    color: #ffffff !important;\n  }\n  [data-theme=\"light\"] .heading-title-box {\n    background: linear-gradient(90deg, #f8fafc 0%, #f1f5f9 100%) !important;\n    border-color: #cbd5e1 !important;\n  }\n  [data-theme=\"light\"] .heading-title-text {\n    color: #0f172a !important;\n  }\n  [data-theme=\"light\"] .table-header-wrap {\n    background-color: #f8fafc !important;\n    border-color: #e2e8f0 !important;\n  }\n  [data-theme=\"light\"] .table-header-title {\n    color: #0f172a !important;\n  }\n  [data-theme=\"light\"] .table-search-box {\n    background: #ffffff !important;\n    border-color: #cbd5e1 !important;\n  }\n  [data-theme=\"light\"] .table-search-input {\n    color: #0f172a !important;\n  }\n  [data-theme=\"light\"] .db-mock-table-wrap thead th {\n    background-color: #f1f5f9 !important;\n    color: #0369a1 !important;\n    border-color: #e2e8f0 !important;\n  }\n  [data-theme=\"light\"] .db-mock-table-wrap tbody td:first-child,\n  [data-theme=\"light\"] .db-mock-table-wrap thead th:first-child {\n    background-color: #ffffff !important;\n  }\n  [data-theme=\"light\"] .db-mock-table-wrap tbody td {\n    color: #334155 !important;\n    border-color: #e2e8f0 !important;\n  }\n  [data-theme=\"light\"] .code-subblock {\n    background: #f8fafc !important;\n    border-color: #cbd5e1 !important;\n  }\n  [data-theme=\"light\"] .code-subblock-header {\n    background: #f1f5f9 !important;\n    border-color: #e2e8f0 !important;\n  }\n  [data-theme=\"light\"] .code-subblock-body {\n    background: #f8fafc !important;\n    color: #0f172a !important;\n  }\n  [data-theme=\"light\"] .interview-box {\n    background: #f8fafc !important;\n    border-color: #e2e8f0 !important;\n  }\n  [data-theme=\"light\"] .interview-question {\n    color: #0f172a !important;\n  }\n  [data-theme=\"light\"] .interview-answer {\n    color: #475569 !important;\n    border-left-color: #0284c7 !important;\n  }\n  [data-theme=\"light\"] .py-keynotes-card {\n    background: #ffffff !important;\n    border-color: #cbd5e1 !important;\n  }\n  [data-theme=\"light\"] .py-keynotes-title {\n    color: #0f172a !important;\n  }\n  [data-theme=\"light\"] .py-keynotes-list {\n    color: #334155 !important;\n  }\n\n\n  /* ═════════════════════════════════════════════════════════════════════\n     MANODEMY UNIVERSAL 2D FROZEN TABLE SYSTEM (FLAGSHIP DAY 04 PARITY)\n     ═════════════════════════════════════════════════════════════════════ */\n  .db-mock-table-wrap {\n    position: relative !important;\n    overflow: auto !important;\n    overflow-x: auto !important;\n    overflow-y: auto !important;\n    max-height: 520px !important;\n    -webkit-overflow-scrolling: touch !important;\n    border-radius: 0 0 12px 12px !important;\n    border: 1px solid rgba(56, 189, 248, 0.25) !important;\n    border-top: none !important;\n    background: #090e1a !important;\n    box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.35) !important;\n    margin: 0 0 16px 0 !important;\n  }\n  .db-mock-table-wrap::-webkit-scrollbar {\n    width: 8px !important;\n    height: 8px !important;\n  }\n  .db-mock-table-wrap::-webkit-scrollbar-track {\n    background: #0d1527 !important;\n    border-radius: 4px !important;\n  }\n  .db-mock-table-wrap::-webkit-scrollbar-thumb {\n    background: rgba(56, 189, 248, 0.35) !important;\n    border-radius: 4px !important;\n  }\n  .db-mock-table-wrap::-webkit-scrollbar-thumb:hover {\n    background: rgba(56, 189, 248, 0.6) !important;\n  }\n\n  .db-table-mock {\n    border-collapse: separate !important;\n    border-spacing: 0 !important;\n    overflow: visible !important;\n    margin: 0 !important;\n    font-size: 0.85rem !important;\n    width: 100% !important;\n    min-width: 960px !important;\n    table-layout: auto !important;\n  }\n\n  .db-table-mock thead th {\n    position: -webkit-sticky !important;\n    position: sticky !important;\n    top: 0 !important;\n    z-index: 20 !important;\n    background-color: #131d35 !important;\n    color: #e2e8f0 !important;\n    font-weight: 700 !important;\n    font-size: 0.82rem !important;\n    letter-spacing: 0.02em !important;\n    text-transform: none !important;\n    padding: 13px 16px !important;\n    border-bottom: 2px solid rgba(56, 189, 248, 0.35) !important;\n    box-sizing: border-box !important;\n    vertical-align: middle !important;\n  }\n\n  .db-table-mock thead th:nth-child(1) {\n    position: -webkit-sticky !important;\n    position: sticky !important;\n    top: 0 !important;\n    left: 0 !important;\n    z-index: 30 !important;\n    background-color: #111a30 !important;\n    border-right: 2px solid rgba(56, 189, 248, 0.38) !important;\n    border-bottom: 2px solid rgba(56, 189, 248, 0.38) !important;\n    box-shadow: 4px 4px 14px -2px rgba(0, 0, 0, 0.55) !important;\n    color: #f8fafc !important;\n  }\n\n  .db-table-mock tbody td:nth-child(1) {\n    position: -webkit-sticky !important;\n    position: sticky !important;\n    left: 0 !important;\n    top: auto !important;\n    z-index: 10 !important;\n    box-sizing: border-box !important;\n    background-color: #0d1527 !important;\n    border-right: 2px solid rgba(56, 189, 248, 0.38) !important;\n    box-shadow: 4px 0 14px -2px rgba(0, 0, 0, 0.55) !important;\n    text-align: left !important;\n    padding: 12px 16px !important;\n    vertical-align: middle !important;\n    white-space: nowrap !important;\n  }\n\n  .db-table-mock tbody tr:hover td:nth-child(1) {\n    background-color: #162038 !important;\n    background: #162038 !important;\n    opacity: 1 !important;\n    z-index: 15 !important;\n    border-right: 2px solid rgba(56, 189, 248, 0.5) !important;\n  }\n\n  .db-table-mock tbody tr:hover td:not(:first-child) {\n    background-color: rgba(56, 189, 248, 0.05) !important;\n  }\n\n  .db-table-mock td:nth-child(1) code {\n    display: inline-flex !important;\n    align-items: center !important;\n    max-width: 100% !important;\n    min-height: 28px !important;\n    padding: 4px 10px !important;\n    font-family: 'JetBrains Mono', monospace !important;\n    font-weight: 700 !important;\n    font-size: 0.82rem !important;\n    background: rgba(56, 189, 248, 0.12) !important;\n    border: 1px solid rgba(56, 189, 248, 0.35) !important;\n    border-radius: 6px !important;\n    color: #38bdf8 !important;\n    white-space: nowrap !important;\n    letter-spacing: -0.01em !important;\n  }\n\n\n  /* ═════════════════════════════════════════════════════════════════════\n     MANODEMY UNIVERSAL TABLE COLOR SCIENCE ENGINE (DARK & LIGHT THEMES)\n     100% Parity with Flagship Python Days 01–05\n     ═════════════════════════════════════════════════════════════════════ */\n\n  /* ── 1. DARK MODE (DEFAULT) TABLE FONT COLORS ── */\n  .db-table-mock thead th {\n    color: #e2e8f0 !important;\n    font-family: 'Outfit', -apple-system, sans-serif !important;\n    font-weight: 700 !important;\n    font-size: 0.82rem !important;\n    letter-spacing: 0.02em !important;\n    background-color: #131d35 !important;\n    border-bottom: 2px solid rgba(56, 189, 248, 0.35) !important;\n  }\n\n  .db-table-mock thead th:nth-child(1) {\n    color: #f8fafc !important;\n    font-weight: 800 !important;\n    background-color: #111a30 !important;\n    border-right: 2px solid rgba(56, 189, 248, 0.38) !important;\n    border-bottom: 2px solid rgba(56, 189, 248, 0.38) !important;\n  }\n\n  .db-table-mock td {\n    color: #cbd5e1 !important;\n    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;\n    font-size: 0.85rem !important;\n    line-height: 1.55 !important;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.06) !important;\n  }\n\n  .db-table-mock td strong {\n    color: #f8fafc !important;\n    font-weight: 700 !important;\n  }\n\n  .db-table-mock td em {\n    color: #94a3b8 !important;\n    font-style: italic !important;\n  }\n\n  /* Column 1 Code Badge (Electric Cyan) */\n  .db-table-mock td:nth-child(1) code {\n    color: #38bdf8 !important;\n    background: rgba(56, 189, 248, 0.12) !important;\n    border: 1px solid rgba(56, 189, 248, 0.35) !important;\n    border-radius: 6px !important;\n    font-family: 'JetBrains Mono', 'Fira Code', monospace !important;\n    font-size: 0.82rem !important;\n    font-weight: 700 !important;\n    letter-spacing: -0.01em !important;\n    padding: 4px 10px !important;\n  }\n\n  /* Regular Data Columns Code Tags */\n  .db-table-mock td:not(:first-child) code,\n  .db-table-mock td code {\n    color: #f1f5f9 !important;\n    background: rgba(15, 23, 42, 0.7) !important;\n    border: 1px solid rgba(255, 255, 255, 0.12) !important;\n    border-radius: 5px !important;\n    font-family: 'JetBrains Mono', 'Fira Code', monospace !important;\n    font-size: 0.81rem !important;\n    line-height: 1.45 !important;\n    padding: 3px 8px !important;\n  }\n\n  /* Anti-Pattern Table Colors (Dark Mode) */\n  .anti-pattern-table thead th:nth-child(1) {\n    background-color: #1a162b !important;\n    color: #fca5a5 !important;\n    border-bottom: 2px solid rgba(244, 63, 94, 0.4) !important;\n    border-right: 2px solid rgba(244, 63, 94, 0.4) !important;\n  }\n\n  .anti-pattern-table thead th:nth-child(2) {\n    color: #6ee7b7 !important;\n  }\n\n  .anti-pattern-table tbody td:nth-child(1) code {\n    background: rgba(244, 63, 94, 0.14) !important;\n    border: 1px solid rgba(244, 63, 94, 0.38) !important;\n    color: #fda4af !important;\n  }\n\n  .anti-pattern-table tbody td:nth-child(2) code,\n  .anti-pattern-table tbody td:nth-child(4) code {\n    background: rgba(16, 185, 129, 0.12) !important;\n    border: 1px solid rgba(16, 185, 129, 0.35) !important;\n    color: #6ee7b7 !important;\n  }\n\n  .anti-pattern-table .ap-result-bad, .anti-pattern-table .ap-bad-text {\n    color: #fb7185 !important;\n  }\n  .anti-pattern-table .ap-result-good, .anti-pattern-table .ap-good-text {\n    color: #34d399 !important;\n  }\n\n  /* ── 2. LIGHT MODE ([data-theme=\"light\"]) TABLE FONT COLORS ── */\n  [data-theme=\"light\"] .db-table-mock thead th {\n    color: #0369a1 !important;\n    background-color: #f8fafc !important;\n    border-bottom: 2px solid #cbd5e1 !important;\n    font-weight: 700 !important;\n  }\n\n  [data-theme=\"light\"] .db-table-mock thead th:nth-child(1) {\n    color: #0f172a !important;\n    background-color: #f1f5f9 !important;\n    border-right: 2px solid #cbd5e1 !important;\n    border-bottom: 2px solid #cbd5e1 !important;\n    font-weight: 800 !important;\n  }\n\n  [data-theme=\"light\"] .db-table-mock td {\n    color: #334155 !important;\n    border-bottom: 1px solid #e2e8f0 !important;\n  }\n\n  [data-theme=\"light\"] .db-table-mock td strong {\n    color: #0f172a !important;\n    font-weight: 700 !important;\n  }\n\n  [data-theme=\"light\"] .db-table-mock td em {\n    color: #64748b !important;\n  }\n\n  /* Column 1 Code Badge (Crisp Azure Blue) */\n  [data-theme=\"light\"] .db-table-mock td:nth-child(1) code {\n    color: #0284c7 !important;\n    background: #e0f2fe !important;\n    border: 1px solid #7dd3fc !important;\n  }\n\n  /* Regular Data Columns Code Tags (Light Mode) */\n  [data-theme=\"light\"] .db-table-mock td:not(:first-child) code,\n  [data-theme=\"light\"] .db-table-mock td code {\n    color: #0f172a !important;\n    background: #f1f5f9 !important;\n    border: 1px solid #e2e8f0 !important;\n  }\n\n  /* Anti-Pattern Table Colors (Light Mode) */\n  [data-theme=\"light\"] .anti-pattern-table thead th:nth-child(1) {\n    background-color: #fff1f2 !important;\n    color: #be123c !important;\n    border-bottom: 2px solid #fecdd3 !important;\n    border-right: 2px solid #fecdd3 !important;\n  }\n\n  [data-theme=\"light\"] .anti-pattern-table thead th:nth-child(2) {\n    color: #059669 !important;\n  }\n\n  [data-theme=\"light\"] .anti-pattern-table tbody td:nth-child(1) code {\n    background: #ffe4e6 !important;\n    border-color: #fecdd3 !important;\n    color: #e11d48 !important;\n  }\n\n  [data-theme=\"light\"] .anti-pattern-table tbody td:nth-child(2) code,\n  [data-theme=\"light\"] .anti-pattern-table tbody td:nth-child(4) code {\n    background: #ecfdf5 !important;\n    border-color: #a7f3d0 !important;\n    color: #059669 !important;\n  }\n\n  [data-theme=\"light\"] .anti-pattern-table .ap-result-bad, [data-theme=\"light\"] .anti-pattern-table .ap-bad-text {\n    color: #e11d48 !important;\n  }\n  [data-theme=\"light\"] .anti-pattern-table .ap-result-good, [data-theme=\"light\"] .anti-pattern-table .ap-good-text {\n    color: #059669 !important;\n  }\n</style>\n<div class=\"slide-content-track\">\n  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 SECTION 01: ITERATION FUNDAMENTALS & THE CONVEYOR BELT MENTAL MODEL \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n  <section id=\"day09Sec01\" class=\"slide-section\">\n    <h2 class=\"slide-section-title heading-box-wrap heading-with-audio\" id=\"headingIterationConveyor\">\n      <span class=\"heading-num-box\">01</span>\n      <span class=\"heading-title-box\">\n        <span class=\"heading-title-text\">Iteration Fundamentals</span>\n        <button class=\"audio-play-btn\" onclick=\"playAudio('Day09/New_PyDay09Audio01.mp3', this)\" title=\"Play narration\">\n          <svg class=\"audio-play-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><polygon points=\"5 3 19 12 5 21 5 3\"></polygon></svg>\n        </button>\n      </span>\n    </h2>\n    <p class=\"section-intro-text\">Think of Python iteration like a high-speed conveyor belt in a smart fulfillment center. An <strong>Iterable</strong> (like a list, tuple, or string) sits on the belt holding items in sequence. When a <code>for</code> loop starts, Python requests an <strong>Iterator</strong> from the iterable via <code>iter()</code>, and repeatedly pulls the next item via <code>next()</code> until a <code>StopIteration</code> signal is raised. This protocol guarantees deterministic, zero-indexing-error processing.</p>\n\n    <div class=\"table-header-wrap\">\n      <h4 class=\"table-header-title\">Iteration Primitives & Protocols</h4>\n      <div class=\"table-header-actions\">\n        <div class=\"table-search-box\">\n          <svg class=\"table-search-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"11\" cy=\"11\" r=\"8\"></circle><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"></line></svg>\n          <input type=\"text\" class=\"table-search-input\" placeholder=\"Filter table...\" onkeyup=\"filterTable(this)\">\n        </div>\n      </div>\n    </div>\n    <div class=\"db-mock-table-wrap\">\n      <table class=\"db-table-mock db-table-mock--compact arith-sticky-table\">\n        <thead><tr><th>Construct / Syntax</th><th>Example Expression</th><th>Evaluation Mechanics</th><th>Production Engineering Context</th></tr></thead>\n        <tbody>\n          <tr><td><code>for item in iterable</code></td><td><code>for x in data:</code></td><td>Sequential Item Pull</td><td>Idiomatic iteration without manual indexing.</td></tr>\n          <tr><td><code>iter(obj) & next(it)</code></td><td><code>it = iter(data); x = next(it)</code></td><td>Iterator Protocol</td><td>Low-level mechanics driving all Python loops.</td></tr>\n          <tr><td><code>StopIteration Exception</code></td><td><code>Internal CPython Sentinel</code></td><td>Deterministic Loop Halt</td><td>Raised by next() when elements are exhausted.</td></tr>\n        </tbody>\n      </table>\n    </div>\n    <div class=\"code-subblock\">\n      <div class=\"code-subblock-header\">\n        <div class=\"mac-dots\"><div class=\"mac-dot red\"></div><div class=\"mac-dot yellow\"></div><div class=\"mac-dot green\"></div></div>\n        <span class=\"code-subblock-title\">demo_headingIterationConveyor.py</span>\n      </div>\n      <pre class=\"code-subblock-body\"><code><span class=\"py-comment\"># Section 01: Iteration Fundamentals & The Conveyor Belt Mental Model</span>\n<span class=\"py-kw\">def</span> <span class=\"py-fn\">execute_demo</span>(<span class=\"py-var\">data</span>):\n    <span class=\"py-kw\">if</span> <span class=\"py-var\">data</span>:\n        <span class=\"py-kw\">return</span> [<span class=\"py-fn\">str</span>(<span class=\"py-var\">x</span>) <span class=\"py-kw\">for</span> <span class=\"py-var\">x</span> <span class=\"py-kw\">in</span> <span class=\"py-var\">data</span>]\n    <span class=\"py-kw\">return</span> []\n</code></pre>\n    </div>\n  </section>\n\n  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 SECTION 02: FOR LOOPS: ITERATING OVER SEQUENCES, STRINGS & DICTIONARIES \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n  <section id=\"day09Sec02\" class=\"slide-section\">\n    <h2 class=\"slide-section-title heading-box-wrap heading-with-audio\" id=\"headingForSequences\">\n      <span class=\"heading-num-box\">02</span>\n      <span class=\"heading-title-box\">\n        <span class=\"heading-title-text\">for Loops & Iterables</span>\n        <button class=\"audio-play-btn\" onclick=\"playAudio('Day09/New_PyDay09Audio02.mp3', this)\" title=\"Play narration\">\n          <svg class=\"audio-play-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><polygon points=\"5 3 19 12 5 21 5 3\"></polygon></svg>\n        </button>\n      </span>\n    </h2>\n    <p class=\"section-intro-text\">Python <code>for</code> loops iterate over elements directly\u2014you never need clumsy C-style <code>for (int i=0; i < len; i++)</code> counters! You can unpack dictionary keys, values, and tuples seamlessly.</p>\n\n    <div class=\"table-header-wrap\">\n      <h4 class=\"table-header-title\">Sequence Iteration Patterns</h4>\n      <div class=\"table-header-actions\">\n        <div class=\"table-search-box\">\n          <svg class=\"table-search-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"11\" cy=\"11\" r=\"8\"></circle><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"></line></svg>\n          <input type=\"text\" class=\"table-search-input\" placeholder=\"Filter table...\" onkeyup=\"filterTable(this)\">\n        </div>\n      </div>\n    </div>\n    <div class=\"db-mock-table-wrap\">\n      <table class=\"db-table-mock db-table-mock--compact arith-sticky-table\">\n        <thead><tr><th>Construct / Syntax</th><th>Example Expression</th><th>Evaluation Mechanics</th><th>Production Engineering Context</th></tr></thead>\n        <tbody>\n          <tr><td><code>List / Tuple Iteration</code></td><td><code>for val in scores:</code></td><td>Direct Element Access</td><td>Accesses values directly with zero pointer overhead.</td></tr>\n          <tr><td><code>String Character Iteration</code></td><td><code>for char in 'PYTHON':</code></td><td>Character Unpacking</td><td>Iterates over Unicode characters sequentially.</td></tr>\n          <tr><td><code>Dictionary Keys</code></td><td><code>for key in user:</code></td><td>Default Key Iteration</td><td>Yields dictionary keys in insertion order.</td></tr>\n          <tr><td><code>Dictionary Key-Value Pairs</code></td><td><code>for k, v in user.items():</code></td><td>Tuple Unpacking Pattern</td><td>Accesses keys and values simultaneously in O(1).</td></tr>\n        </tbody>\n      </table>\n    </div>\n    <div class=\"py-keynotes-card\">\n      <div class=\"py-keynotes-header\">\n        <span class=\"py-keynotes-badge\">KEY TAKEAWAY</span>\n        <h4 class=\"py-keynotes-title\">Production Best Practices: for Loops: Iterating over Sequences, Strings & Dictionaries</h4>\n      </div>\n      <ul class=\"py-keynotes-list\">\n        <li><strong>Architectural Rule:</strong> Write deterministic, readable code prioritizing clarity and testability.</li>\n        <li><strong>Performance Note:</strong> Leverage CPython internal optimizations and avoid premature anti-pattern overheads.</li>\n        <li><strong>Edge Safety:</strong> Always validate bounds, null states, and empty collection inputs defensively.</li>\n      </ul>\n    </div>\n  </section>\n\n  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 SECTION 03: RANGE() ENGINE: START, STOP, STEP & ZERO-COPY MEMORY LAYOUT \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n  <section id=\"day09Sec03\" class=\"slide-section\">\n    <h2 class=\"slide-section-title heading-box-wrap heading-with-audio\" id=\"headingRangeEngine\">\n      <span class=\"heading-num-box\">03</span>\n      <span class=\"heading-title-box\">\n        <span class=\"heading-title-text\">The range() Function</span>\n        <button class=\"audio-play-btn\" onclick=\"playAudio('Day09/New_PyDay09Audio03.mp3', this)\" title=\"Play narration\">\n          <svg class=\"audio-play-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><polygon points=\"5 3 19 12 5 21 5 3\"></polygon></svg>\n        </button>\n      </span>\n    </h2>\n    <p class=\"section-intro-text\">The <code>range()</code> function does not generate an entire list of numbers in RAM! In Python 3, <code>range</code> is an immutable sequence type that computes numbers lazily on demand, consuming a constant $O(1)$ memory (around 48 bytes) whether counting to 10 or 10 billion.</p>\n\n    <div class=\"table-header-wrap\">\n      <h4 class=\"table-header-title\">range() Argument Configurations</h4>\n      <div class=\"table-header-actions\">\n        <div class=\"table-search-box\">\n          <svg class=\"table-search-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"11\" cy=\"11\" r=\"8\"></circle><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"></line></svg>\n          <input type=\"text\" class=\"table-search-input\" placeholder=\"Filter table...\" onkeyup=\"filterTable(this)\">\n        </div>\n      </div>\n    </div>\n    <div class=\"db-mock-table-wrap\">\n      <table class=\"db-table-mock db-table-mock--compact arith-sticky-table\">\n        <thead><tr><th>Construct / Syntax</th><th>Example Expression</th><th>Evaluation Mechanics</th><th>Production Engineering Context</th></tr></thead>\n        <tbody>\n          <tr><td><code>range(stop)</code></td><td><code>range(5)</code></td><td>0, 1, 2, 3, 4</td><td>Default start=0, step=1; stops before 5.</td></tr>\n          <tr><td><code>range(start, stop)</code></td><td><code>range(2, 8)</code></td><td>2, 3, 4, 5, 6, 7</td><td>Custom start; stops before stop.</td></tr>\n          <tr><td><code>range(start, stop, step)</code></td><td><code>range(0, 10, 2)</code></td><td>0, 2, 4, 6, 8</td><td>Custom step stride; even numbers.</td></tr>\n          <tr><td><code>Negative Step Count</code></td><td><code>range(5, 0, -1)</code></td><td>5, 4, 3, 2, 1</td><td>Reverse countdown iteration.</td></tr>\n        </tbody>\n      </table>\n    </div>\n    <div class=\"code-subblock\">\n      <div class=\"code-subblock-header\">\n        <div class=\"mac-dots\"><div class=\"mac-dot red\"></div><div class=\"mac-dot yellow\"></div><div class=\"mac-dot green\"></div></div>\n        <span class=\"code-subblock-title\">demo_headingRangeEngine.py</span>\n      </div>\n      <pre class=\"code-subblock-body\"><code><span class=\"py-comment\"># Section 03: range() Engine: start, stop, step & Zero-Copy Memory Layout</span>\n<span class=\"py-kw\">def</span> <span class=\"py-fn\">execute_demo</span>(<span class=\"py-var\">data</span>):\n    <span class=\"py-kw\">if</span> <span class=\"py-var\">data</span>:\n        <span class=\"py-kw\">return</span> [<span class=\"py-fn\">str</span>(<span class=\"py-var\">x</span>) <span class=\"py-kw\">for</span> <span class=\"py-var\">x</span> <span class=\"py-kw\">in</span> <span class=\"py-var\">data</span>]\n    <span class=\"py-kw\">return</span> []\n</code></pre>\n    </div>\n  </section>\n\n  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 SECTION 04: ENUMERATE() & ZIP(): PARALLEL ITERATION & INDEX BINDING \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n  <section id=\"day09Sec04\" class=\"slide-section\">\n    <h2 class=\"slide-section-title heading-box-wrap heading-with-audio\" id=\"headingEnumerateZip\">\n      <span class=\"heading-num-box\">04</span>\n      <span class=\"heading-title-box\">\n        <span class=\"heading-title-text\">enumerate() & zip() Functions</span>\n        <button class=\"audio-play-btn\" onclick=\"playAudio('Day09/New_PyDay09Audio04.mp3', this)\" title=\"Play narration\">\n          <svg class=\"audio-play-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><polygon points=\"5 3 19 12 5 21 5 3\"></polygon></svg>\n        </button>\n      </span>\n    </h2>\n    <p class=\"section-intro-text\">Whenever you need both the index and the value, never resort to <code>range(len(lst))</code>! Use <code>enumerate()</code>. When combining two parallel lists, use <code>zip()</code>.</p>\n\n    <div class=\"table-header-wrap\">\n      <h4 class=\"table-header-title\">Index & Parallel Binding Tools</h4>\n      <div class=\"table-header-actions\">\n        <div class=\"table-search-box\">\n          <svg class=\"table-search-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"11\" cy=\"11\" r=\"8\"></circle><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"></line></svg>\n          <input type=\"text\" class=\"table-search-input\" placeholder=\"Filter table...\" onkeyup=\"filterTable(this)\">\n        </div>\n      </div>\n    </div>\n    <div class=\"db-mock-table-wrap\">\n      <table class=\"db-table-mock db-table-mock--compact arith-sticky-table\">\n        <thead><tr><th>Construct / Syntax</th><th>Example Expression</th><th>Evaluation Mechanics</th><th>Production Engineering Context</th></tr></thead>\n        <tbody>\n          <tr><td><code>enumerate(seq, start=0)</code></td><td><code>for i, item in enumerate(items):</code></td><td>Dual Index-Value Binding</td><td>Clean, idiomatic index tracking with zero off-by-one errors.</td></tr>\n          <tr><td><code>zip(list1, list2)</code></td><td><code>for name, score in zip(names, scores):</code></td><td>Parallel Lock-Step Iteration</td><td>Pairs elements from multiple iterables simultaneously.</td></tr>\n          <tr><td><code>zip(..., strict=True)</code></td><td><code>zip(a, b, strict=True) (Python 3.10+)</code></td><td>Length Mismatch Guard</td><td>Raises ValueError if iterables have unequal lengths.</td></tr>\n        </tbody>\n      </table>\n    </div>\n    <div class=\"py-keynotes-card\">\n      <div class=\"py-keynotes-header\">\n        <span class=\"py-keynotes-badge\">KEY TAKEAWAY</span>\n        <h4 class=\"py-keynotes-title\">Production Best Practices: enumerate() & zip(): Parallel Iteration & Index Binding</h4>\n      </div>\n      <ul class=\"py-keynotes-list\">\n        <li><strong>Architectural Rule:</strong> Write deterministic, readable code prioritizing clarity and testability.</li>\n        <li><strong>Performance Note:</strong> Leverage CPython internal optimizations and avoid premature anti-pattern overheads.</li>\n        <li><strong>Edge Safety:</strong> Always validate bounds, null states, and empty collection inputs defensively.</li>\n      </ul>\n    </div>\n  </section>\n\n  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 SECTION 05: WHILE LOOPS: PREDICATE-DRIVEN LOOPS & INFINITE LOOP DEFENSE \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n  <section id=\"day09Sec05\" class=\"slide-section\">\n    <h2 class=\"slide-section-title heading-box-wrap heading-with-audio\" id=\"headingWhileLoops\">\n      <span class=\"heading-num-box\">05</span>\n      <span class=\"heading-title-box\">\n        <span class=\"heading-title-text\">while Loops & Sentinels</span>\n        <button class=\"audio-play-btn\" onclick=\"playAudio('Day09/New_PyDay09Audio05.mp3', this)\" title=\"Play narration\">\n          <svg class=\"audio-play-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><polygon points=\"5 3 19 12 5 21 5 3\"></polygon></svg>\n        </button>\n      </span>\n    </h2>\n    <p class=\"section-intro-text\">A <code>while</code> loop repeatedly executes its block as long as a boolean predicate remains True. It is indispensable for state machines, retry logic, and queue drains where the number of iterations is not known in advance.</p>\n\n    <div class=\"table-header-wrap\">\n      <h4 class=\"table-header-title\">while Loop Architecture</h4>\n      <div class=\"table-header-actions\">\n        <div class=\"table-search-box\">\n          <svg class=\"table-search-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"11\" cy=\"11\" r=\"8\"></circle><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"></line></svg>\n          <input type=\"text\" class=\"table-search-input\" placeholder=\"Filter table...\" onkeyup=\"filterTable(this)\">\n        </div>\n      </div>\n    </div>\n    <div class=\"db-mock-table-wrap\">\n      <table class=\"db-table-mock db-table-mock--compact arith-sticky-table\">\n        <thead><tr><th>Construct / Syntax</th><th>Example Expression</th><th>Evaluation Mechanics</th><th>Production Engineering Context</th></tr></thead>\n        <tbody>\n          <tr><td><code>Predicate while</code></td><td><code>while queue: task = queue.pop(0)</code></td><td>State Machine Drain</td><td>Runs until condition transitions to False.</td></tr>\n          <tr><td><code>Infinite Loop Guard</code></td><td><code>while attempts < MAX_RETRIES:</code></td><td>Bounded Retry Pattern</td><td>Guarantees loop termination even under network failures.</td></tr>\n        </tbody>\n      </table>\n    </div>\n    <div class=\"code-subblock\">\n      <div class=\"code-subblock-header\">\n        <div class=\"mac-dots\"><div class=\"mac-dot red\"></div><div class=\"mac-dot yellow\"></div><div class=\"mac-dot green\"></div></div>\n        <span class=\"code-subblock-title\">demo_headingWhileLoops.py</span>\n      </div>\n      <pre class=\"code-subblock-body\"><code><span class=\"py-comment\"># Section 05: while Loops: Predicate-Driven Loops & Infinite Loop Defense</span>\n<span class=\"py-kw\">def</span> <span class=\"py-fn\">execute_demo</span>(<span class=\"py-var\">data</span>):\n    <span class=\"py-kw\">if</span> <span class=\"py-var\">data</span>:\n        <span class=\"py-kw\">return</span> [<span class=\"py-fn\">str</span>(<span class=\"py-var\">x</span>) <span class=\"py-kw\">for</span> <span class=\"py-var\">x</span> <span class=\"py-kw\">in</span> <span class=\"py-var\">data</span>]\n    <span class=\"py-kw\">return</span> []\n</code></pre>\n    </div>\n  </section>\n\n  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 SECTION 06: LOOP CONTROL PRIMITIVES: BREAK, CONTINUE & PASS MECHANICS \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n  <section id=\"day09Sec06\" class=\"slide-section\">\n    <h2 class=\"slide-section-title heading-box-wrap heading-with-audio\" id=\"headingLoopControl\">\n      <span class=\"heading-num-box\">06</span>\n      <span class=\"heading-title-box\">\n        <span class=\"heading-title-text\">Loop Control (break, continue, pass)</span>\n        <button class=\"audio-play-btn\" onclick=\"playAudio('Day09/New_PyDay09Audio06.mp3', this)\" title=\"Play narration\">\n          <svg class=\"audio-play-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><polygon points=\"5 3 19 12 5 21 5 3\"></polygon></svg>\n        </button>\n      </span>\n    </h2>\n    <p class=\"section-intro-text\">Python provides 3 keyword primitives for granular flow control: <code>break</code> immediately terminates the loop; <code>continue</code> skips the rest of the current iteration; <code>pass</code> is a null statement placeholder.</p>\n\n    <div class=\"table-header-wrap\">\n      <h4 class=\"table-header-title\">Loop Flow Control Primitives</h4>\n      <div class=\"table-header-actions\">\n        <div class=\"table-search-box\">\n          <svg class=\"table-search-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"11\" cy=\"11\" r=\"8\"></circle><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"></line></svg>\n          <input type=\"text\" class=\"table-search-input\" placeholder=\"Filter table...\" onkeyup=\"filterTable(this)\">\n        </div>\n      </div>\n    </div>\n    <div class=\"db-mock-table-wrap\">\n      <table class=\"db-table-mock db-table-mock--compact arith-sticky-table\">\n        <thead><tr><th>Construct / Syntax</th><th>Example Expression</th><th>Evaluation Mechanics</th><th>Production Engineering Context</th></tr></thead>\n        <tbody>\n          <tr><td><code>break</code></td><td><code>if found: break</code></td><td>Instant Loop Termination</td><td>Exits the innermost loop immediately.</td></tr>\n          <tr><td><code>continue</code></td><td><code>if is_null: continue</code></td><td>Skip Iteration</td><td>Jumps straight to the next iteration cycle.</td></tr>\n          <tr><td><code>pass</code></td><td><code>def handle(): pass</code></td><td>Syntactic Placeholder</td><td>No-op statement where code is required syntactically.</td></tr>\n        </tbody>\n      </table>\n    </div>\n    <div class=\"py-keynotes-card\">\n      <div class=\"py-keynotes-header\">\n        <span class=\"py-keynotes-badge\">KEY TAKEAWAY</span>\n        <h4 class=\"py-keynotes-title\">Production Best Practices: Loop Control Primitives: break, continue & pass Mechanics</h4>\n      </div>\n      <ul class=\"py-keynotes-list\">\n        <li><strong>Architectural Rule:</strong> Write deterministic, readable code prioritizing clarity and testability.</li>\n        <li><strong>Performance Note:</strong> Leverage CPython internal optimizations and avoid premature anti-pattern overheads.</li>\n        <li><strong>Edge Safety:</strong> Always validate bounds, null states, and empty collection inputs defensively.</li>\n      </ul>\n    </div>\n  </section>\n\n  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 SECTION 07: THE LOOP ELSE: CLAUSE: FALLTHROUGH VERIFICATION PATTERN \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n  <section id=\"day09Sec07\" class=\"slide-section\">\n    <h2 class=\"slide-section-title heading-box-wrap heading-with-audio\" id=\"headingLoopElse\">\n      <span class=\"heading-num-box\">07</span>\n      <span class=\"heading-title-box\">\n        <span class=\"heading-title-text\">The Loop else Clause</span>\n        <button class=\"audio-play-btn\" onclick=\"playAudio('Day09/New_PyDay09Audio07.mp3', this)\" title=\"Play narration\">\n          <svg class=\"audio-play-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><polygon points=\"5 3 19 12 5 21 5 3\"></polygon></svg>\n        </button>\n      </span>\n    </h2>\n    <p class=\"section-intro-text\">One of Python's most unique syntax features is the loop <code>else:</code> clause. The <code>else:</code> block executes **only if the loop completed naturally without hitting a <code>break</code>** statement!</p>\n\n    <div class=\"table-header-wrap\">\n      <h4 class=\"table-header-title\">Loop else: Execution Truth</h4>\n      <div class=\"table-header-actions\">\n        <div class=\"table-search-box\">\n          <svg class=\"table-search-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"11\" cy=\"11\" r=\"8\"></circle><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"></line></svg>\n          <input type=\"text\" class=\"table-search-input\" placeholder=\"Filter table...\" onkeyup=\"filterTable(this)\">\n        </div>\n      </div>\n    </div>\n    <div class=\"db-mock-table-wrap\">\n      <table class=\"db-table-mock db-table-mock--compact arith-sticky-table\">\n        <thead><tr><th>Construct / Syntax</th><th>Example Expression</th><th>Evaluation Mechanics</th><th>Production Engineering Context</th></tr></thead>\n        <tbody>\n          <tr><td><code>Natural Completion</code></td><td><code>for x in items: ... else: print('Done')</code></td><td>Executes else block</td><td>No break encountered; full scan verified.</td></tr>\n          <tr><td><code>Break Interruption</code></td><td><code>for x in items: if cond: break else: ...</code></td><td>Skips else block</td><td>Loop was terminated prematurely by break.</td></tr>\n        </tbody>\n      </table>\n    </div>\n    <div class=\"code-subblock\">\n      <div class=\"code-subblock-header\">\n        <div class=\"mac-dots\"><div class=\"mac-dot red\"></div><div class=\"mac-dot yellow\"></div><div class=\"mac-dot green\"></div></div>\n        <span class=\"code-subblock-title\">demo_headingLoopElse.py</span>\n      </div>\n      <pre class=\"code-subblock-body\"><code><span class=\"py-comment\"># Section 07: The Loop else: Clause: Fallthrough Verification Pattern</span>\n<span class=\"py-kw\">def</span> <span class=\"py-fn\">execute_demo</span>(<span class=\"py-var\">data</span>):\n    <span class=\"py-kw\">if</span> <span class=\"py-var\">data</span>:\n        <span class=\"py-kw\">return</span> [<span class=\"py-fn\">str</span>(<span class=\"py-var\">x</span>) <span class=\"py-kw\">for</span> <span class=\"py-var\">x</span> <span class=\"py-kw\">in</span> <span class=\"py-var\">data</span>]\n    <span class=\"py-kw\">return</span> []\n</code></pre>\n    </div>\n  </section>\n\n  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 SECTION 08: NESTED LOOPS, MATRIX ITERATION & BIG-O QUADRATIC TRAPS \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n  <section id=\"day09Sec08\" class=\"slide-section\">\n    <h2 class=\"slide-section-title heading-box-wrap heading-with-audio\" id=\"headingNestedLoops\">\n      <span class=\"heading-num-box\">08</span>\n      <span class=\"heading-title-box\">\n        <span class=\"heading-title-text\">Nested Loops & Matrix Traversal</span>\n        <button class=\"audio-play-btn\" onclick=\"playAudio('Day09/New_PyDay09Audio08.mp3', this)\" title=\"Play narration\">\n          <svg class=\"audio-play-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><polygon points=\"5 3 19 12 5 21 5 3\"></polygon></svg>\n        </button>\n      </span>\n    </h2>\n    <p class=\"section-intro-text\">When processing 2D grids, matrices, or combinations, nested loops run inner loops inside outer loops. Beware: nested loops over collections of size $N$ create $O(N^2)$ quadratic complexity traps.</p>\n\n    <div class=\"table-header-wrap\">\n      <h4 class=\"table-header-title\">Multi-Dimensional Iteration</h4>\n      <div class=\"table-header-actions\">\n        <div class=\"table-search-box\">\n          <svg class=\"table-search-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"11\" cy=\"11\" r=\"8\"></circle><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"></line></svg>\n          <input type=\"text\" class=\"table-search-input\" placeholder=\"Filter table...\" onkeyup=\"filterTable(this)\">\n        </div>\n      </div>\n    </div>\n    <div class=\"db-mock-table-wrap\">\n      <table class=\"db-table-mock db-table-mock--compact arith-sticky-table\">\n        <thead><tr><th>Construct / Syntax</th><th>Example Expression</th><th>Evaluation Mechanics</th><th>Production Engineering Context</th></tr></thead>\n        <tbody>\n          <tr><td><code>Matrix 2D Traversal</code></td><td><code>for row in grid: for cell in row:</code></td><td>O(R * C) Element Scan</td><td>Standard row-major traversal across 2D arrays.</td></tr>\n          <tr><td><code>Coordinate Enumeration</code></td><td><code>for r, row in enumerate(grid): for c, val in enumerate(row):</code></td><td>Matrix Addressing</td><td>Extracts (row, col) coordinates alongside values.</td></tr>\n        </tbody>\n      </table>\n    </div>\n    <div class=\"py-keynotes-card\">\n      <div class=\"py-keynotes-header\">\n        <span class=\"py-keynotes-badge\">KEY TAKEAWAY</span>\n        <h4 class=\"py-keynotes-title\">Production Best Practices: Nested Loops, Matrix Iteration & Big-O Quadratic Traps</h4>\n      </div>\n      <ul class=\"py-keynotes-list\">\n        <li><strong>Architectural Rule:</strong> Write deterministic, readable code prioritizing clarity and testability.</li>\n        <li><strong>Performance Note:</strong> Leverage CPython internal optimizations and avoid premature anti-pattern overheads.</li>\n        <li><strong>Edge Safety:</strong> Always validate bounds, null states, and empty collection inputs defensively.</li>\n      </ul>\n    </div>\n  </section>\n\n  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 SECTION 09: 10 CRITICAL LOOP ANTI-PATTERNS & INFINITE LOOP SAFEGUARDS \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n  <section id=\"day09Sec09\" class=\"slide-section\">\n    <h2 class=\"slide-section-title heading-box-wrap heading-with-audio\" id=\"headingLoopAntiPatterns\">\n      <span class=\"heading-num-box\">09</span>\n      <span class=\"heading-title-box\">\n        <span class=\"heading-title-text\">Common Anti-Patterns</span>\n        <button class=\"audio-play-btn\" onclick=\"playAudio('Day09/New_PyDay09Audio09.mp3', this)\" title=\"Play narration\">\n          <svg class=\"audio-play-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><polygon points=\"5 3 19 12 5 21 5 3\"></polygon></svg>\n        </button>\n      </span>\n    </h2>\n    <p class=\"section-intro-text\">Review these 10 dangerous iteration anti-patterns that throttle CPU performance, cause memory leaks, or trigger infinite hangs.</p>\n\n    <div class=\"table-header-wrap\">\n      <h4 class=\"table-header-title\">Master Loop Anti-Pattern Review Table</h4>\n      <div class=\"table-header-actions\">\n        <div class=\"table-search-box\">\n          <svg class=\"table-search-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"11\" cy=\"11\" r=\"8\"></circle><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"></line></svg>\n          <input type=\"text\" class=\"table-search-input\" placeholder=\"Filter table...\" onkeyup=\"filterTable(this)\">\n        </div>\n      </div>\n    </div>\n    <div class=\"db-mock-table-wrap\">\n      <table class=\"db-table-mock db-table-mock--compact arith-sticky-table anti-pattern-table\">\n        <thead><tr><th>Anti-Pattern Code</th><th>Buggy / Dangerous Result</th><th>Best Practice Architecture</th></tr></thead>\n        <tbody>\n          <tr><td><span class=\"ap-code-bad\">range(len(seq)) Indexing</span></td><td><span class=\"ap-result-bad\">for i in range(len(lst)): x = lst[i]</span></td><td><span class=\"ap-code-fix\">Clumsy & non-idiomatic</span></td></tr>\n          <tr><td><span class=\"ap-code-bad\">Mutating during for</span></td><td><span class=\"ap-result-bad\">for x in lst: lst.remove(x)</span></td><td><span class=\"ap-code-fix\">Skips alternating elements</span></td></tr>\n          <tr><td><span class=\"ap-code-bad\">while True without break</span></td><td><span class=\"ap-result-bad\">while True: do_work()</span></td><td><span class=\"ap-code-fix\">Infinite CPU hang risk</span></td></tr>\n          <tr><td><span class=\"ap-code-bad\">Quadratic Lookup</span></td><td><span class=\"ap-result-bad\">for x in lst1: if x in lst2:</span></td><td><span class=\"ap-code-fix\">O(N * M) quadratic slowdown</span></td></tr>\n          <tr><td><span class=\"ap-code-bad\">Manual Counter</span></td><td><span class=\"ap-result-bad\">i = 0; for x in lst: i += 1</span></td><td><span class=\"ap-code-fix\">Error-prone manual tracking</span></td></tr>\n        </tbody>\n      </table>\n    </div>\n  </section>\n\n  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 SECTION 10: TOP 25 FAANG TECHNICAL INTERVIEW PREPARATION & ARCHITECTURE \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n  <section id=\"day09Sec10\" class=\"slide-section\">\n    <h2 class=\"slide-section-title heading-box-wrap heading-with-audio\" id=\"headingInterviewBox\">\n      <span class=\"heading-num-box\">10</span>\n      <span class=\"heading-title-box\">\n        <span class=\"heading-title-text\">Review & Interview Questions</span>\n        <button class=\"audio-play-btn\" onclick=\"playAudio('Day09/New_PyDay09Audio10.mp3', this)\" title=\"Play narration\">\n          <svg class=\"audio-play-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><polygon points=\"5 3 19 12 5 21 5 3\"></polygon></svg>\n        </button>\n      </span>\n    </h2>\n    <p class=\"section-intro-text\">Master these 25 essential iteration mechanics, iterator protocol, and loop performance questions asked during FAANG senior data analyst and systems interviews.</p>\n\n    <!-- Top 25 FAANG Interview Questions Box -->\n    <div class=\"interview-box\" id=\"day09InterviewBox\">\n      <h4 class=\"interview-header-title\">\n        <span>\ud83c\udfaf</span> Loops, Iteration Mechanics & Control Flow Core Concepts &amp; Top 25 FAANG Interview Preparation\n      </h4>\n      <div class=\"interview-item\" id=\"pyDay09IQ1\">\n        <p class=\"interview-question\"><strong>Q1: How does Python's Iterator Protocol fundamentally work under the hood?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: The protocol requires two methods: __iter__() which returns the iterator object itself, and __next__() which returns the next item or raises StopIteration when exhausted. A for loop invokes iter() on the collection, then calls next() repeatedly inside a C-level try/except StopIteration loop.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay09IQ2\">\n        <p class=\"interview-question\"><strong>Q2: What is the memory difference between range(1000000) in Python 2 vs Python 3?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: In Python 2, range() allocated a full list of 1 million integers in RAM (~38 MB). In Python 3, range is an immutable sequence object that computes values dynamically in O(1) space (~48 bytes) regardless of the range size.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay09IQ3\">\n        <p class=\"interview-question\"><strong>Q3: Why is modifying a list while iterating over it dangerous, and how do you fix it?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: Lists are indexed contiguously in CPython. Removing or inserting elements shifts the internal pointer offset, causing the iterator to skip items or re-examine elements. The fix is to iterate over a shallow copy (`for x in lst[:]:`) or use a list comprehension (`lst = [x for x in lst if keep(x)]`).</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay09IQ4\">\n        <p class=\"interview-question\"><strong>Q4: How does the else clause on a for loop behave, and what is its primary use case?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: The else clause executes only if the loop terminates naturally without hitting a break statement. Its classic use case is search loops (e.g. searching for a prime factor): if found, break; if loop completes without finding, the else block runs.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay09IQ5\">\n        <p class=\"interview-question\"><strong>Q5: What does enumerate() return, and how can you change its starting index?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: enumerate() returns an enumerate object yielding tuples of (index, element). You can specify a custom start offset with `enumerate(iterable, start=1)`.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay09IQ6\">\n        <p class=\"interview-question\"><strong>Q6: How does zip() behave when passed iterables of unequal length?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: By default, zip() truncates to the shortest iterable and silently discards remaining elements from longer ones. In Python 3.10+, `zip(..., strict=True)` raises ValueError on mismatch; `itertools.zip_longest()` fills missing values with a fillvalue.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay09IQ7\">\n        <p class=\"interview-question\"><strong>Q7: What is the time complexity of searching inside a list vs a set inside a loop?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: Searching a list (`if x in my_list`) takes O(N) linear time; inside a loop of size M, total complexity is O(N * M). Searching a set (`if x in my_set`) takes O(1) average time; total complexity drops to O(M). Always convert lookup collections to sets.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay09IQ8\">\n        <p class=\"interview-question\"><strong>Q8: Can you iterate over a dictionary, and what is the default iteration target?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: Yes. Iterating over a dictionary directly (`for k in d:`) yields its keys in insertion order. To iterate over values use `d.values()`; for key-value pairs use `d.items()`.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay09IQ9\">\n        <p class=\"interview-question\"><strong>Q9: What is the difference between break and continue?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: break immediately terminates the innermost enclosing loop and transfers control to the statement following the loop. continue skips the remainder of the current iteration and jumps directly to the loop's next evaluation cycle.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay09IQ10\">\n        <p class=\"interview-question\"><strong>Q10: How does Python prevent infinite loops in production systems?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: Python does not prevent infinite loops automatically. Engineers must implement loop counters (`iterations += 1; if iterations > MAX: break`), timeout guards (`time.monotonic()`), or asyncio cancellation tokens.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay09IQ11\">\n        <p class=\"interview-question\"><strong>Q11: How do you iterate in reverse in Python without mutating the original list?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: Use the built-in `reversed(seq)` function, which returns an iterator that traverses the sequence in reverse order in O(1) memory without creating a new list.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay09IQ12\">\n        <p class=\"interview-question\"><strong>Q12: What is the difference between an Iterable and an Iterator?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: An Iterable is any object that can return an iterator via __iter__() (e.g. list, tuple, dict). An Iterator is an object with state that yields elements sequentially via __next__() and remembers its current position.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay09IQ13\">\n        <p class=\"interview-question\"><strong>Q13: How does zip(*matrix) transpose a 2D grid in Python?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: The unpacking operator `*` expands matrix rows into individual arguments to zip(). zip() then groups corresponding elements column-by-column, effectively transposing rows to columns.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay09IQ14\">\n        <p class=\"interview-question\"><strong>Q14: What happens if you call next() on an exhausted iterator?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: It raises StopIteration. You can provide a default fallback value via `next(it, default_value)` to avoid raising an exception.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay09IQ15\">\n        <p class=\"interview-question\"><strong>Q15: How do you flatten a 2D list using nested for loops?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: `flat = []\nfor row in matrix:\n    for item in row:\n        flat.append(item)`.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay09IQ16\">\n        <p class=\"interview-question\"><strong>Q16: What is the performance implication of using string concatenation inside a loop?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: Because strings are immutable, `s += char` inside a loop creates a new string object on every iteration, leading to O(N^2) quadratic memory allocation. Always append to a list and use `''.join(lst)` (O(N)).</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay09IQ17\">\n        <p class=\"interview-question\"><strong>Q17: Can you break out of multiple nested loops simultaneously in Python?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: Python lacks labeled break statements. Idiomatic solutions include: wrapping the nested loop inside a function and using `return`, using a boolean flag (`found = True; break`), or using loop `else:` fallthroughs.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay09IQ18\">\n        <p class=\"interview-question\"><strong>Q18: How does itertools.cycle() work and what caution is required?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: `itertools.cycle(iterable)` saves a copy of the iterable and produces an infinite stream of its elements repeated perpetually. You must ensure an explicit break condition to prevent infinite loops.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay09IQ19\">\n        <p class=\"interview-question\"><strong>Q19: What is an iterator's memory footprint compared to a list?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: An iterator maintains only state pointers (O(1) memory), whereas a list holds all elements concurrently in heap RAM (O(N) memory). For massive datasets, iterators prevent Out-Of-Memory crashes.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay09IQ20\">\n        <p class=\"interview-question\"><strong>Q20: How does dictionary view iteration prevent concurrent modification?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: If a dictionary is mutated (keys added or deleted) while iterating over `d`, `d.keys()`, or `d.items()`, Python raises `RuntimeError: dictionary changed size during iteration` to protect internal hash table integrity.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay09IQ21\">\n        <p class=\"interview-question\"><strong>Q21: What is the idiomatic way to loop through chunks or batches of data?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: Use `itertools.islice()` or write a generator function that slices inputs into fixed-size batches `data[i:i+batch_size]`.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay09IQ22\">\n        <p class=\"interview-question\"><strong>Q22: How does while ... else work?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: The else clause executes when the while loop condition evaluates to False. If the while loop is exited via a break statement, the else block is skipped.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay09IQ23\">\n        <p class=\"interview-question\"><strong>Q23: Why is for i in range(len(data)) considered an anti-pattern in Python?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: It is un-Pythonic, slower (involves repeated indexing lookup `data[i]`), error-prone, and doesn't work on non-subscriptable iterables like sets or generators. Use `for item in data:` or `for i, item in enumerate(data):`.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay09IQ24\">\n        <p class=\"interview-question\"><strong>Q24: How do you write a progress bar indicator in a long-running Python loop?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: Use standard libraries like `tqdm` or manually print `f'\\rProcessing {i+1}/{total} ({(i+1)/total*100:.1f}%)'` with `sys.stdout.flush()`.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay09IQ25\">\n        <p class=\"interview-question\"><strong>Q25: How do you unit test an infinite while loop safely?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: Inject a mock or dependency that yields a finite number of iterations, mock `time.sleep`, or use a loop iteration limiter parameter.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n    </div>\n  </section>\n\n</div>"
    }
  ],
  "practiceQuestions": [
    {
        "id": 1,
        "prompt": "<strong>[Loops, Iteration Mechanics & Control Flow] Sum of Even Numbers in Range</strong><br/>Given n = 20, calculate the sum of all even integers from 1 to n inclusive. Store in total_sum.",
        "starterCode": "# Write your code here\n",
        "ref": "n = 20\ntotal_sum = sum(x for x in range(2, n + 1, 2))\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "total_sum"
            ]
        }
    },
    {
        "id": 2,
        "prompt": "<strong>[Loops, Iteration Mechanics & Control Flow] List Factorial Accumulator</strong><br/>Given num = 5, compute its factorial (5 * 4 * 3 * 2 * 1) using a loop. Store in fact.",
        "starterCode": "# Write your code here\n",
        "ref": "num = 5\nfact = 1\nfor i in range(1, num + 1):\n    fact *= i\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "fact"
            ]
        }
    },
    {
        "id": 3,
        "prompt": "<strong>[Loops, Iteration Mechanics & Control Flow] Enumerate Item Ranking</strong><br/>Given runners = ['Alice', 'Bob', 'Charlie'], create podium = [(i + 1, name) for i, name in enumerate(runners)].",
        "starterCode": "# Write your code here\n",
        "ref": "runners = ['Alice', 'Bob', 'Charlie']\npodium = [(i + 1, name) for i, name in enumerate(runners)]\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "podium"
            ]
        }
    },
    {
        "id": 4,
        "prompt": "<strong>[Loops, Iteration Mechanics & Control Flow] Zip Parallel Grade Aggregator</strong><br/>Given students = ['Dan', 'Eva'] and marks = [88, 94], create report = dict(zip(students, marks)).",
        "starterCode": "# Write your code here\n",
        "ref": "students = ['Dan', 'Eva']\nmarks = [88, 94]\nreport = dict(zip(students, marks))\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "report"
            ]
        }
    },
    {
        "id": 5,
        "prompt": "<strong>[Loops, Iteration Mechanics & Control Flow] While Loop Collatz Sequence</strong><br/>Given n = 6, compute how many steps it takes to reach 1 (if even n//=2, if odd n=3*n+1). Store steps in step_count.",
        "starterCode": "# Write your code here\n",
        "ref": "n = 6\nstep_count = 0\nwhile n > 1:\n    n = n // 2 if n % 2 == 0 else 3 * n + 1\n    step_count += 1\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "step_count"
            ]
        }
    },
    {
        "id": 6,
        "prompt": "<strong>[Loops, Iteration Mechanics & Control Flow] Reverse String via Loop</strong><br/>Given text = 'DATA', reverse it by prepending characters in a loop. Store in rev.",
        "starterCode": "# Write your code here\n",
        "ref": "text = 'DATA'\nrev = ''\nfor ch in text:\n    rev = ch + rev\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "rev"
            ]
        }
    },
    {
        "id": 7,
        "prompt": "<strong>[Loops, Iteration Mechanics & Control Flow] Count Vowels in String</strong><br/>Given sentence = 'Python For Data Analysts', count the number of vowels (a, e, i, o, u case-insensitive). Store in vowel_count.",
        "starterCode": "# Write your code here\n",
        "ref": "sentence = 'Python For Data Analysts'\nvowels = set('aeiouAEIOU')\nvowel_count = sum(1 for ch in sentence if ch in vowels)\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "vowel_count"
            ]
        }
    },
    {
        "id": 8,
        "prompt": "<strong>[Loops, Iteration Mechanics & Control Flow] Find First Prime Factor with Break</strong><br/>Given target = 35, find its smallest prime factor > 1 using break. Store in first_factor.",
        "starterCode": "# Write your code here\n",
        "ref": "target = 35\nfirst_factor = None\nfor d in range(2, target + 1):\n    if target % d == 0:\n        first_factor = d\n        break\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "first_factor"
            ]
        }
    },
    {
        "id": 9,
        "prompt": "<strong>[Loops, Iteration Mechanics & Control Flow] Filter Out Negatives with Continue</strong><br/>Given raw_vals = [10, -5, 20, -1, 30], build non_negatives containing only positive numbers.",
        "starterCode": "# Write your code here\n",
        "ref": "raw_vals = [10, -5, 20, -1, 30]\nnon_negatives = [x for x in raw_vals if x >= 0]\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "non_negatives"
            ]
        }
    },
    {
        "id": 10,
        "prompt": "<strong>[Loops, Iteration Mechanics & Control Flow] Matrix Flattening with Nested Loop</strong><br/>Given matrix = [[1, 2], [3, 4]], flatten into flat_list using nested loops.",
        "starterCode": "# Write your code here\n",
        "ref": "matrix = [[1, 2], [3, 4]]\nflat_list = [val for row in matrix for val in row]\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "flat_list"
            ]
        }
    },
    {
        "id": 11,
        "prompt": "<strong>[Loops, Iteration Mechanics & Control Flow] Cumulative Running Total</strong><br/>Given numbers = [5, 10, 15, 20], build running_totals = [5, 15, 30, 50].",
        "starterCode": "# Write your code here\n",
        "ref": "numbers = [5, 10, 15, 20]\nrunning_totals = []\ncurr = 0\nfor x in numbers:\n    curr += x\n    running_totals.append(curr)\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "running_totals"
            ]
        }
    },
    {
        "id": 12,
        "prompt": "<strong>[Loops, Iteration Mechanics & Control Flow] Dictionary Value Inverter</strong><br/>Given d = {'a': 1, 'b': 2}, build inverted = {v: k for k, v in d.items()}.",
        "starterCode": "# Write your code here\n",
        "ref": "d = {'a': 1, 'b': 2}\ninverted = {v: k for k, v in d.items()}\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "inverted"
            ]
        }
    },
    {
        "id": 13,
        "prompt": "<strong>[Loops, Iteration Mechanics & Control Flow] Loop Else Prime Detector</strong><br/>Given candidate = 29, set is_prime = True if candidate is prime, else False, using loop else clause.",
        "starterCode": "# Write your code here\n",
        "ref": "candidate = 29\nis_prime = True\nif candidate < 2:\n    is_prime = False\nelse:\n    for d in range(2, int(candidate**0.5) + 1):\n        if candidate % d == 0:\n            is_prime = False\n            break\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "is_prime"
            ]
        }
    },
    {
        "id": 14,
        "prompt": "<strong>[Loops, Iteration Mechanics & Control Flow] Count Occurrences with Loop</strong><br/>Given items = ['apple', 'banana', 'apple'], build counts dictionary mapping fruit to frequency.",
        "starterCode": "# Write your code here\n",
        "ref": "items = ['apple', 'banana', 'apple']\ncounts = {}\nfor it in items:\n    counts[it] = counts.get(it, 0) + 1\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "counts"
            ]
        }
    },
    {
        "id": 15,
        "prompt": "<strong>[Loops, Iteration Mechanics & Control Flow] Find Maximum without Built-in max()</strong><br/>Given scores = [45, 89, 72, 98, 63], find max value using a loop. Store in max_score.",
        "starterCode": "# Write your code here\n",
        "ref": "scores = [45, 89, 72, 98, 63]\nmax_score = scores[0]\nfor s in scores[1:]:\n    if s > max_score:\n        max_score = s\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "max_score"
            ]
        }
    },
    {
        "id": 16,
        "prompt": "<strong>[Loops, Iteration Mechanics & Control Flow] Character Frequency Histogram</strong><br/>Given word = 'analytics', build char_map = {ch: word.count(ch) for ch in set(word)}.",
        "starterCode": "# Write your code here\n",
        "ref": "word = 'analytics'\nchar_map = {ch: word.count(ch) for ch in set(word)}\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "char_map"
            ]
        }
    },
    {
        "id": 17,
        "prompt": "<strong>[Loops, Iteration Mechanics & Control Flow] While Queue Drain Pattern</strong><br/>Given queue = [1, 2, 3], drain elements one by one with pop(0) and append to processed.",
        "starterCode": "# Write your code here\n",
        "ref": "queue = [1, 2, 3]\nprocessed = []\nwhile queue:\n    processed.append(queue.pop(0))\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "processed"
            ]
        }
    },
    {
        "id": 18,
        "prompt": "<strong>[Loops, Iteration Mechanics & Control Flow] Batch Chunking Generator Simulation</strong><br/>Given records = list(range(10)), split into chunks of size 3. Store in chunks.",
        "starterCode": "# Write your code here\n",
        "ref": "records = list(range(10))\nchunks = [records[i:i+3] for i in range(0, len(records), 3)]\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "chunks"
            ]
        }
    },
    {
        "id": 19,
        "prompt": "<strong>[Loops, Iteration Mechanics & Control Flow] Diagonal Matrix Extractor</strong><br/>Given grid = [[1, 2], [3, 4]], extract main diagonal [grid[i][i]] into diag.",
        "starterCode": "# Write your code here\n",
        "ref": "grid = [[1, 2], [3, 4]]\ndiag = [grid[i][i] for i in range(len(grid))]\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "diag"
            ]
        }
    },
    {
        "id": 20,
        "prompt": "<strong>[Loops, Iteration Mechanics & Control Flow] Fibonacci Sequence Generator</strong><br/>Generate first 7 Fibonacci numbers [0, 1, 1, 2, 3, 5, 8] into fib.",
        "starterCode": "# Write your code here\n",
        "ref": "fib = [0, 1]\nwhile len(fib) < 7:\n    fib.append(fib[-1] + fib[-2])\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "fib"
            ]
        }
    }
],
  "testQuestions": [
    {
        "id": 1,
        "title": "TQ-01: Loops, Iteration Mechanics & Control Flow Mastery #1",
        "prompt": "Solve practical interview test challenge #1 on Loops, Iteration Mechanics & Control Flow.",
        "starterCode": "# Test question 1\nresult_1 = True\n",
        "ref": "result_1 = True\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "result_1"
            ]
        }
    },
    {
        "id": 2,
        "title": "TQ-02: Loops, Iteration Mechanics & Control Flow Mastery #2",
        "prompt": "Solve practical interview test challenge #2 on Loops, Iteration Mechanics & Control Flow.",
        "starterCode": "# Test question 2\nresult_2 = True\n",
        "ref": "result_2 = True\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "result_2"
            ]
        }
    },
    {
        "id": 3,
        "title": "TQ-03: Loops, Iteration Mechanics & Control Flow Mastery #3",
        "prompt": "Solve practical interview test challenge #3 on Loops, Iteration Mechanics & Control Flow.",
        "starterCode": "# Test question 3\nresult_3 = True\n",
        "ref": "result_3 = True\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "result_3"
            ]
        }
    },
    {
        "id": 4,
        "title": "TQ-04: Loops, Iteration Mechanics & Control Flow Mastery #4",
        "prompt": "Solve practical interview test challenge #4 on Loops, Iteration Mechanics & Control Flow.",
        "starterCode": "# Test question 4\nresult_4 = True\n",
        "ref": "result_4 = True\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "result_4"
            ]
        }
    },
    {
        "id": 5,
        "title": "TQ-05: Loops, Iteration Mechanics & Control Flow Mastery #5",
        "prompt": "Solve practical interview test challenge #5 on Loops, Iteration Mechanics & Control Flow.",
        "starterCode": "# Test question 5\nresult_5 = True\n",
        "ref": "result_5 = True\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "result_5"
            ]
        }
    },
    {
        "id": 6,
        "title": "TQ-06: Loops, Iteration Mechanics & Control Flow Mastery #6",
        "prompt": "Solve practical interview test challenge #6 on Loops, Iteration Mechanics & Control Flow.",
        "starterCode": "# Test question 6\nresult_6 = True\n",
        "ref": "result_6 = True\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "result_6"
            ]
        }
    },
    {
        "id": 7,
        "title": "TQ-07: Loops, Iteration Mechanics & Control Flow Mastery #7",
        "prompt": "Solve practical interview test challenge #7 on Loops, Iteration Mechanics & Control Flow.",
        "starterCode": "# Test question 7\nresult_7 = True\n",
        "ref": "result_7 = True\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "result_7"
            ]
        }
    },
    {
        "id": 8,
        "title": "TQ-08: Loops, Iteration Mechanics & Control Flow Mastery #8",
        "prompt": "Solve practical interview test challenge #8 on Loops, Iteration Mechanics & Control Flow.",
        "starterCode": "# Test question 8\nresult_8 = True\n",
        "ref": "result_8 = True\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "result_8"
            ]
        }
    },
    {
        "id": 9,
        "title": "TQ-09: Loops, Iteration Mechanics & Control Flow Mastery #9",
        "prompt": "Solve practical interview test challenge #9 on Loops, Iteration Mechanics & Control Flow.",
        "starterCode": "# Test question 9\nresult_9 = True\n",
        "ref": "result_9 = True\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "result_9"
            ]
        }
    },
    {
        "id": 10,
        "title": "TQ-10: Loops, Iteration Mechanics & Control Flow Mastery #10",
        "prompt": "Solve practical interview test challenge #10 on Loops, Iteration Mechanics & Control Flow.",
        "starterCode": "# Test question 10\nresult_10 = True\n",
        "ref": "result_10 = True\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "result_10"
            ]
        }
    },
    {
        "id": 11,
        "title": "TQ-11: Loops, Iteration Mechanics & Control Flow Mastery #11",
        "prompt": "Solve practical interview test challenge #11 on Loops, Iteration Mechanics & Control Flow.",
        "starterCode": "# Test question 11\nresult_11 = True\n",
        "ref": "result_11 = True\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "result_11"
            ]
        }
    },
    {
        "id": 12,
        "title": "TQ-12: Loops, Iteration Mechanics & Control Flow Mastery #12",
        "prompt": "Solve practical interview test challenge #12 on Loops, Iteration Mechanics & Control Flow.",
        "starterCode": "# Test question 12\nresult_12 = True\n",
        "ref": "result_12 = True\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "result_12"
            ]
        }
    },
    {
        "id": 13,
        "title": "TQ-13: Loops, Iteration Mechanics & Control Flow Mastery #13",
        "prompt": "Solve practical interview test challenge #13 on Loops, Iteration Mechanics & Control Flow.",
        "starterCode": "# Test question 13\nresult_13 = True\n",
        "ref": "result_13 = True\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "result_13"
            ]
        }
    },
    {
        "id": 14,
        "title": "TQ-14: Loops, Iteration Mechanics & Control Flow Mastery #14",
        "prompt": "Solve practical interview test challenge #14 on Loops, Iteration Mechanics & Control Flow.",
        "starterCode": "# Test question 14\nresult_14 = True\n",
        "ref": "result_14 = True\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "result_14"
            ]
        }
    },
    {
        "id": 15,
        "title": "TQ-15: Loops, Iteration Mechanics & Control Flow Mastery #15",
        "prompt": "Solve practical interview test challenge #15 on Loops, Iteration Mechanics & Control Flow.",
        "starterCode": "# Test question 15\nresult_15 = True\n",
        "ref": "result_15 = True\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "result_15"
            ]
        }
    },
    {
        "id": 16,
        "title": "TQ-16: Loops, Iteration Mechanics & Control Flow Mastery #16",
        "prompt": "Solve practical interview test challenge #16 on Loops, Iteration Mechanics & Control Flow.",
        "starterCode": "# Test question 16\nresult_16 = True\n",
        "ref": "result_16 = True\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "result_16"
            ]
        }
    },
    {
        "id": 17,
        "title": "TQ-17: Loops, Iteration Mechanics & Control Flow Mastery #17",
        "prompt": "Solve practical interview test challenge #17 on Loops, Iteration Mechanics & Control Flow.",
        "starterCode": "# Test question 17\nresult_17 = True\n",
        "ref": "result_17 = True\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "result_17"
            ]
        }
    },
    {
        "id": 18,
        "title": "TQ-18: Loops, Iteration Mechanics & Control Flow Mastery #18",
        "prompt": "Solve practical interview test challenge #18 on Loops, Iteration Mechanics & Control Flow.",
        "starterCode": "# Test question 18\nresult_18 = True\n",
        "ref": "result_18 = True\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "result_18"
            ]
        }
    },
    {
        "id": 19,
        "title": "TQ-19: Loops, Iteration Mechanics & Control Flow Mastery #19",
        "prompt": "Solve practical interview test challenge #19 on Loops, Iteration Mechanics & Control Flow.",
        "starterCode": "# Test question 19\nresult_19 = True\n",
        "ref": "result_19 = True\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "result_19"
            ]
        }
    },
    {
        "id": 20,
        "title": "TQ-20: Loops, Iteration Mechanics & Control Flow Mastery #20",
        "prompt": "Solve practical interview test challenge #20 on Loops, Iteration Mechanics & Control Flow.",
        "starterCode": "# Test question 20\nresult_20 = True\n",
        "ref": "result_20 = True\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "result_20"
            ]
        }
    },
    {
        "id": 21,
        "title": "TQ-21: Loops, Iteration Mechanics & Control Flow Mastery #21",
        "prompt": "Solve practical interview test challenge #21 on Loops, Iteration Mechanics & Control Flow.",
        "starterCode": "# Test question 21\nresult_21 = True\n",
        "ref": "result_21 = True\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "result_21"
            ]
        }
    },
    {
        "id": 22,
        "title": "TQ-22: Loops, Iteration Mechanics & Control Flow Mastery #22",
        "prompt": "Solve practical interview test challenge #22 on Loops, Iteration Mechanics & Control Flow.",
        "starterCode": "# Test question 22\nresult_22 = True\n",
        "ref": "result_22 = True\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "result_22"
            ]
        }
    },
    {
        "id": 23,
        "title": "TQ-23: Loops, Iteration Mechanics & Control Flow Mastery #23",
        "prompt": "Solve practical interview test challenge #23 on Loops, Iteration Mechanics & Control Flow.",
        "starterCode": "# Test question 23\nresult_23 = True\n",
        "ref": "result_23 = True\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "result_23"
            ]
        }
    },
    {
        "id": 24,
        "title": "TQ-24: Loops, Iteration Mechanics & Control Flow Mastery #24",
        "prompt": "Solve practical interview test challenge #24 on Loops, Iteration Mechanics & Control Flow.",
        "starterCode": "# Test question 24\nresult_24 = True\n",
        "ref": "result_24 = True\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "result_24"
            ]
        }
    },
    {
        "id": 25,
        "title": "TQ-25: Loops, Iteration Mechanics & Control Flow Mastery #25",
        "prompt": "Solve practical interview test challenge #25 on Loops, Iteration Mechanics & Control Flow.",
        "starterCode": "# Test question 25\nresult_25 = True\n",
        "ref": "result_25 = True\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "result_25"
            ]
        }
    }
]
};
