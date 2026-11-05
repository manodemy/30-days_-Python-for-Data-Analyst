// Python Course Content — Day 10 (Functions, Parameters, Variable Scope & Lambdas)
if (!window.COURSE_CONTENT) window.COURSE_CONTENT = {};
window.COURSE_CONTENT['pyDay10'] = {
  "day": 10,
  "title": "Functions, Scope & Lambdas",
  "emoji": "\ud83d\udce6",
  "topics": [
    "Function Definitions & Architecture",
    "Positional & Keyword Arguments",
    "Default & Mutable Arguments",
    "Variable Arguments (*args, **kwargs)",
    "Positional-Only & Keyword-Only",
    "Return Values & Unpacking",
    "Variable Scope & LEGB Rule",
    "Lambda Expressions",
    "Common Anti-Patterns",
    "Review & Interview Questions"
],
  "slides": [
    {
      "title": "Functions, Parameters, Variable Scope & Lambdas",
      "html": "<style>\n  /* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n     BASE & DARK THEME (DEFAULT)\n     \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n  /* \u2500\u2500 Flagship Dual-Box Heading Architecture (SQL Day 01 Parity) \u2500\u2500 */\n  .heading-box-wrap,\n  .slide-section-title.heading-box-wrap {\n    display: flex !important;\n    align-items: stretch !important;\n    gap: 0 !important;\n    background: transparent !important;\n    border: none !important;\n    padding: 0 !important;\n    margin: 24px 0 14px 0 !important;\n    filter: drop-shadow(0 4px 14px rgba(0, 0, 0, 0.35)) !important;\n  }\n  .heading-num-box {\n    display: flex !important;\n    align-items: center !important;\n    justify-content: center !important;\n    min-width: 48px !important;\n    padding: 0 14px !important;\n    background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%) !important;\n    color: #ffffff !important;\n    font-family: 'JetBrains Mono', monospace !important;\n    font-size: 1.05rem !important;\n    font-weight: 800 !important;\n    letter-spacing: 0.05em !important;\n    border-radius: 8px 0 0 8px !important;\n    border: 1px solid rgba(56, 189, 248, 0.4) !important;\n    border-right: none !important;\n    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2) !important;\n    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4) !important;\n  }\n  .heading-title-box {\n    display: flex !important;\n    align-items: center !important;\n    justify-content: space-between !important;\n    flex: 1 !important;\n    padding: 10px 16px !important;\n    background: linear-gradient(90deg, #0b1329 0%, #080e1e 100%) !important;\n    border-radius: 0 8px 8px 0 !important;\n    border: 1px solid rgba(56, 189, 248, 0.25) !important;\n    border-left: 1px solid rgba(56, 189, 248, 0.15) !important;\n    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05) !important;\n  }\n  .heading-title-text {\n    font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif !important;\n    font-size: 1.08rem !important;\n    font-weight: 700 !important;\n    color: #f0f6fc !important;\n    letter-spacing: -0.01em !important;\n    line-height: 1.35 !important;\n  }\n  .audio-play-btn {\n    display: inline-flex !important;\n    align-items: center !important;\n    justify-content: center !important;\n    width: 28px !important;\n    height: 28px !important;\n    margin-left: 12px !important;\n    border-radius: 50% !important;\n    background: rgba(56, 189, 248, 0.15) !important;\n    border: 1px solid rgba(56, 189, 248, 0.4) !important;\n    color: #38bdf8 !important;\n    cursor: pointer !important;\n    transition: all 0.2s ease !important;\n    flex-shrink: 0 !important;\n  }\n  .audio-play-btn:hover {\n    background: rgba(56, 189, 248, 0.3) !important;\n    transform: scale(1.08) !important;\n    color: #ffffff !important;\n  }\n\n  /* \u2500\u2500 2D Frozen Table System \u2500\u2500 */\n  .table-header-wrap {\n    display: flex !important;\n    align-items: center !important;\n    justify-content: space-between !important;\n    padding: 10px 14px !important;\n    background-color: #0d1527 !important;\n    border: 1px solid rgba(255, 255, 255, 0.08) !important;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.06) !important;\n    border-radius: 8px 8px 0 0 !important;\n  }\n  .table-header-title {\n    margin: 0 !important;\n    font-size: 0.92rem !important;\n    font-weight: 700 !important;\n    color: #f8fafc !important;\n  }\n  .table-search-box {\n    display: flex !important;\n    align-items: center !important;\n    background: rgba(0, 0, 0, 0.4) !important;\n    border: 1px solid rgba(255, 255, 255, 0.12) !important;\n    border-radius: 6px !important;\n    padding: 4px 8px !important;\n    gap: 6px !important;\n  }\n  .table-search-input {\n    background: transparent !important;\n    border: none !important;\n    color: #f8fafc !important;\n    font-size: 0.8rem !important;\n    outline: none !important;\n    width: 140px !important;\n  }\n  .db-mock-table-wrap {\n    max-height: 520px !important;\n    overflow: auto !important;\n    position: relative !important;\n    border: 1px solid rgba(255, 255, 255, 0.08) !important;\n    border-top: none !important;\n    border-radius: 0 0 8px 8px !important;\n    margin-bottom: 18px !important;\n  }\n  .db-mock-table-wrap thead th {\n    position: sticky !important;\n    top: 0 !important;\n    z-index: 12 !important;\n    background-color: #0f172a !important;\n    color: #38bdf8 !important;\n    font-weight: 700 !important;\n    font-size: 0.82rem !important;\n    padding: 10px 12px !important;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.12) !important;\n  }\n  .db-mock-table-wrap tbody td:first-child,\n  .db-mock-table-wrap thead th:first-child {\n    position: sticky !important;\n    left: 0 !important;\n    z-index: 15 !important;\n    background-color: #0f172a !important;\n    font-family: 'JetBrains Mono', monospace !important;\n    font-weight: 600 !important;\n  }\n  .db-mock-table-wrap thead th:first-child {\n    z-index: 25 !important;\n  }\n  .db-mock-table-wrap tbody td {\n    padding: 8px 12px !important;\n    font-size: 0.82rem !important;\n    color: #cbd5e1 !important;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.04) !important;\n  }\n\n  /* \u2500\u2500 macOS IDE Code Subblock \u2500\u2500 */\n  .code-subblock {\n    background: #080d1a !important;\n    border: 1px solid rgba(56, 189, 248, 0.2) !important;\n    border-radius: 8px !important;\n    margin: 14px 0 !important;\n    overflow: hidden !important;\n    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4) !important;\n  }\n  .code-subblock-header {\n    display: flex !important;\n    align-items: center !important;\n    justify-content: space-between !important;\n    padding: 8px 14px !important;\n    background: #050811 !important;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;\n  }\n  .mac-dots {\n    display: flex !important;\n    gap: 6px !important;\n  }\n  .mac-dot {\n    width: 10px !important;\n    height: 10px !important;\n    border-radius: 50% !important;\n  }\n  .mac-dot.red { background: #ef4444 !important; }\n  .mac-dot.yellow { background: #f59e0b !important; }\n  .mac-dot.green { background: #10b981 !important; }\n  .code-subblock-title {\n    font-family: 'JetBrains Mono', monospace !important;\n    font-size: 0.78rem !important;\n    color: #94a3b8 !important;\n  }\n  .code-subblock-body {\n    padding: 12px 16px !important;\n    margin: 0 !important;\n    background: #080d1a !important;\n    font-family: 'JetBrains Mono', monospace !important;\n    font-size: 0.84rem !important;\n    line-height: 1.55 !important;\n    color: #e2e8f0 !important;\n    overflow-x: auto !important;\n  }\n  .py-kw { color: #f43f5e !important; font-weight: 700 !important; }\n  .py-fn { color: #38bdf8 !important; }\n  .py-str { color: #34d399 !important; }\n  .py-num { color: #fbbf24 !important; }\n  .py-var { color: #e2e8f0 !important; }\n  .py-comment { color: #64748b !important; font-style: italic !important; }\n  [data-theme=\"light\"] .py-kw { color: #be123c !important; }\n  [data-theme=\"light\"] .py-fn { color: #1d4ed8 !important; }\n  [data-theme=\"light\"] .py-str { color: #15803d !important; }\n  [data-theme=\"light\"] .py-num { color: #b45309 !important; }\n  [data-theme=\"light\"] .py-var { color: #0f172a !important; font-weight: 600 !important; }\n  [data-theme=\"light\"] .py-comment { color: #64748b !important; }\n  [data-theme=\"light\"] .ap-code-bad { color: #be123c !important; background: #fff1f2 !important; border: 1px solid #fecdd3 !important; }\n  [data-theme=\"light\"] .ap-code-fix { color: #047857 !important; background: #ecfdf5 !important; border: 1px solid #a7f3d0 !important; }\n\n  /* \u2500\u2500 Master Anti-Pattern Table \u2500\u2500 */\n  .anti-pattern-table thead th {\n    background-color: #1a080d !important;\n    color: #fb7185 !important;\n  }\n  .ap-code-bad {\n    color: #f87171 !important;\n    font-family: 'JetBrains Mono', monospace !important;\n    background: rgba(239, 68, 68, 0.1) !important;\n    padding: 2px 6px !important;\n    border-radius: 4px !important;\n  }\n  .ap-result-bad {\n    color: #fca5a5 !important;\n    font-size: 0.78rem !important;\n  }\n  .ap-code-fix {\n    color: #34d399 !important;\n    font-family: 'JetBrains Mono', monospace !important;\n    background: rgba(16, 185, 129, 0.1) !important;\n    padding: 2px 6px !important;\n    border-radius: 4px !important;\n  }\n\n  /* \u2500\u2500 Key Notes Cards \u2500\u2500 */\n  .py-keynotes-card {\n    background: linear-gradient(135deg, rgba(8, 14, 30, 0.8) 0%, rgba(13, 22, 45, 0.8) 100%) !important;\n    border: 1px solid rgba(56, 189, 248, 0.25) !important;\n    border-radius: 8px !important;\n    padding: 14px 18px !important;\n    margin: 16px 0 !important;\n  }\n  .py-keynotes-header {\n    display: flex !important;\n    align-items: center !important;\n    gap: 8px !important;\n    margin-bottom: 8px !important;\n  }\n  .py-keynotes-badge {\n    background: rgba(56, 189, 248, 0.2) !important;\n    color: #38bdf8 !important;\n    font-size: 0.72rem !important;\n    font-weight: 800 !important;\n    padding: 2px 8px !important;\n    border-radius: 4px !important;\n    letter-spacing: 0.05em !important;\n  }\n  .py-keynotes-title {\n    font-size: 0.92rem !important;\n    font-weight: 700 !important;\n    color: #f8fafc !important;\n    margin: 0 !important;\n  }\n  .py-keynotes-list {\n    margin: 0 !important;\n    padding-left: 20px !important;\n    color: #cbd5e1 !important;\n    font-size: 0.84rem !important;\n    line-height: 1.6 !important;\n    text-align: justify !important;\n    text-align-last: left !important;\n  }\n\n  /* \u2500\u2500 Interview Box \u2500\u2500 */\n  .interview-box {\n    background: #090e1f !important;\n    border: 1px solid rgba(56, 189, 248, 0.25) !important;\n    border-radius: 10px !important;\n    padding: 20px !important;\n    margin-top: 18px !important;\n  }\n  .interview-header-title {\n    color: #38bdf8 !important;\n    font-size: 1.05rem !important;\n    font-weight: 800 !important;\n    margin-bottom: 16px !important;\n  }\n  .interview-item {\n    margin: 12px 0 !important;\n  }\n  .interview-question {\n    color: #f8fafc !important;\n    font-size: 0.9rem !important;\n    margin-bottom: 6px !important;\n  }\n  .interview-answer {\n    color: #94a3b8 !important;\n    font-size: 0.84rem !important;\n    line-height: 1.55 !important;\n    padding-left: 12px !important;\n    border-left: 2px solid rgba(56, 189, 248, 0.3) !important;\n  }\n  .interview-divider {\n    border: none !important;\n    border-top: 1px solid rgba(255, 255, 255, 0.06) !important;\n    margin: 12px 0 !important;\n  }\n\n  /* \u2500\u2500 Light Theme Overrides \u2500\u2500 */\n  [data-theme=\"light\"] .heading-num-box {\n    background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%) !important;\n    color: #ffffff !important;\n  }\n  [data-theme=\"light\"] .heading-title-box {\n    background: linear-gradient(90deg, #f8fafc 0%, #f1f5f9 100%) !important;\n    border-color: #cbd5e1 !important;\n  }\n  [data-theme=\"light\"] .heading-title-text {\n    color: #0f172a !important;\n  }\n  [data-theme=\"light\"] .table-header-wrap {\n    background-color: #f8fafc !important;\n    border-color: #e2e8f0 !important;\n  }\n  [data-theme=\"light\"] .table-header-title {\n    color: #0f172a !important;\n  }\n  [data-theme=\"light\"] .table-search-box {\n    background: #ffffff !important;\n    border-color: #cbd5e1 !important;\n  }\n  [data-theme=\"light\"] .table-search-input {\n    color: #0f172a !important;\n  }\n  [data-theme=\"light\"] .db-mock-table-wrap thead th {\n    background-color: #f1f5f9 !important;\n    color: #0369a1 !important;\n    border-color: #e2e8f0 !important;\n  }\n  [data-theme=\"light\"] .db-mock-table-wrap tbody td:first-child,\n  [data-theme=\"light\"] .db-mock-table-wrap thead th:first-child {\n    background-color: #ffffff !important;\n  }\n  [data-theme=\"light\"] .db-mock-table-wrap tbody td {\n    color: #334155 !important;\n    border-color: #e2e8f0 !important;\n  }\n  [data-theme=\"light\"] .code-subblock {\n    background: #f8fafc !important;\n    border-color: #cbd5e1 !important;\n  }\n  [data-theme=\"light\"] .code-subblock-header {\n    background: #f1f5f9 !important;\n    border-color: #e2e8f0 !important;\n  }\n  [data-theme=\"light\"] .code-subblock-body {\n    background: #f8fafc !important;\n    color: #0f172a !important;\n  }\n  [data-theme=\"light\"] .interview-box {\n    background: #f8fafc !important;\n    border-color: #e2e8f0 !important;\n  }\n  [data-theme=\"light\"] .interview-question {\n    color: #0f172a !important;\n  }\n  [data-theme=\"light\"] .interview-answer {\n    color: #475569 !important;\n    border-left-color: #0284c7 !important;\n  }\n  [data-theme=\"light\"] .py-keynotes-card {\n    background: #ffffff !important;\n    border-color: #cbd5e1 !important;\n  }\n  [data-theme=\"light\"] .py-keynotes-title {\n    color: #0f172a !important;\n  }\n  [data-theme=\"light\"] .py-keynotes-list {\n    color: #334155 !important;\n  }\n\n\n  /* ═════════════════════════════════════════════════════════════════════\n     MANODEMY UNIVERSAL 2D FROZEN TABLE SYSTEM (FLAGSHIP DAY 04 PARITY)\n     ═════════════════════════════════════════════════════════════════════ */\n  .db-mock-table-wrap {\n    position: relative !important;\n    overflow: auto !important;\n    overflow-x: auto !important;\n    overflow-y: auto !important;\n    max-height: 520px !important;\n    -webkit-overflow-scrolling: touch !important;\n    border-radius: 0 0 12px 12px !important;\n    border: 1px solid rgba(56, 189, 248, 0.25) !important;\n    border-top: none !important;\n    background: #090e1a !important;\n    box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.35) !important;\n    margin: 0 0 16px 0 !important;\n  }\n  .db-mock-table-wrap::-webkit-scrollbar {\n    width: 8px !important;\n    height: 8px !important;\n  }\n  .db-mock-table-wrap::-webkit-scrollbar-track {\n    background: #0d1527 !important;\n    border-radius: 4px !important;\n  }\n  .db-mock-table-wrap::-webkit-scrollbar-thumb {\n    background: rgba(56, 189, 248, 0.35) !important;\n    border-radius: 4px !important;\n  }\n  .db-mock-table-wrap::-webkit-scrollbar-thumb:hover {\n    background: rgba(56, 189, 248, 0.6) !important;\n  }\n\n  .db-table-mock {\n    border-collapse: separate !important;\n    border-spacing: 0 !important;\n    overflow: visible !important;\n    margin: 0 !important;\n    font-size: 0.85rem !important;\n    width: 100% !important;\n    min-width: 960px !important;\n    table-layout: auto !important;\n  }\n\n  .db-table-mock thead th {\n    position: -webkit-sticky !important;\n    position: sticky !important;\n    top: 0 !important;\n    z-index: 20 !important;\n    background-color: #131d35 !important;\n    color: #e2e8f0 !important;\n    font-weight: 700 !important;\n    font-size: 0.82rem !important;\n    letter-spacing: 0.02em !important;\n    text-transform: none !important;\n    padding: 13px 16px !important;\n    border-bottom: 2px solid rgba(56, 189, 248, 0.35) !important;\n    box-sizing: border-box !important;\n    vertical-align: middle !important;\n  }\n\n  .db-table-mock thead th:nth-child(1) {\n    position: -webkit-sticky !important;\n    position: sticky !important;\n    top: 0 !important;\n    left: 0 !important;\n    z-index: 30 !important;\n    background-color: #111a30 !important;\n    border-right: 2px solid rgba(56, 189, 248, 0.38) !important;\n    border-bottom: 2px solid rgba(56, 189, 248, 0.38) !important;\n    box-shadow: 4px 4px 14px -2px rgba(0, 0, 0, 0.55) !important;\n    color: #f8fafc !important;\n  }\n\n  .db-table-mock tbody td:nth-child(1) {\n    position: -webkit-sticky !important;\n    position: sticky !important;\n    left: 0 !important;\n    top: auto !important;\n    z-index: 10 !important;\n    box-sizing: border-box !important;\n    background-color: #0d1527 !important;\n    border-right: 2px solid rgba(56, 189, 248, 0.38) !important;\n    box-shadow: 4px 0 14px -2px rgba(0, 0, 0, 0.55) !important;\n    text-align: left !important;\n    padding: 12px 16px !important;\n    vertical-align: middle !important;\n    white-space: nowrap !important;\n  }\n\n  .db-table-mock tbody tr:hover td:nth-child(1) {\n    background-color: #162038 !important;\n    background: #162038 !important;\n    opacity: 1 !important;\n    z-index: 15 !important;\n    border-right: 2px solid rgba(56, 189, 248, 0.5) !important;\n  }\n\n  .db-table-mock tbody tr:hover td:not(:first-child) {\n    background-color: rgba(56, 189, 248, 0.05) !important;\n  }\n\n  .db-table-mock td:nth-child(1) code {\n    display: inline-flex !important;\n    align-items: center !important;\n    max-width: 100% !important;\n    min-height: 28px !important;\n    padding: 4px 10px !important;\n    font-family: 'JetBrains Mono', monospace !important;\n    font-weight: 700 !important;\n    font-size: 0.82rem !important;\n    background: rgba(56, 189, 248, 0.12) !important;\n    border: 1px solid rgba(56, 189, 248, 0.35) !important;\n    border-radius: 6px !important;\n    color: #38bdf8 !important;\n    white-space: nowrap !important;\n    letter-spacing: -0.01em !important;\n  }\n\n\n  /* ═════════════════════════════════════════════════════════════════════\n     MANODEMY UNIVERSAL TABLE COLOR SCIENCE ENGINE (DARK & LIGHT THEMES)\n     100% Parity with Flagship Python Days 01–05\n     ═════════════════════════════════════════════════════════════════════ */\n\n  /* ── 1. DARK MODE (DEFAULT) TABLE FONT COLORS ── */\n  .db-table-mock thead th {\n    color: #e2e8f0 !important;\n    font-family: 'Outfit', -apple-system, sans-serif !important;\n    font-weight: 700 !important;\n    font-size: 0.82rem !important;\n    letter-spacing: 0.02em !important;\n    background-color: #131d35 !important;\n    border-bottom: 2px solid rgba(56, 189, 248, 0.35) !important;\n  }\n\n  .db-table-mock thead th:nth-child(1) {\n    color: #f8fafc !important;\n    font-weight: 800 !important;\n    background-color: #111a30 !important;\n    border-right: 2px solid rgba(56, 189, 248, 0.38) !important;\n    border-bottom: 2px solid rgba(56, 189, 248, 0.38) !important;\n  }\n\n  .db-table-mock td {\n    color: #cbd5e1 !important;\n    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;\n    font-size: 0.85rem !important;\n    line-height: 1.55 !important;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.06) !important;\n  }\n\n  .db-table-mock td strong {\n    color: #f8fafc !important;\n    font-weight: 700 !important;\n  }\n\n  .db-table-mock td em {\n    color: #94a3b8 !important;\n    font-style: italic !important;\n  }\n\n  /* Column 1 Code Badge (Electric Cyan) */\n  .db-table-mock td:nth-child(1) code {\n    color: #38bdf8 !important;\n    background: rgba(56, 189, 248, 0.12) !important;\n    border: 1px solid rgba(56, 189, 248, 0.35) !important;\n    border-radius: 6px !important;\n    font-family: 'JetBrains Mono', 'Fira Code', monospace !important;\n    font-size: 0.82rem !important;\n    font-weight: 700 !important;\n    letter-spacing: -0.01em !important;\n    padding: 4px 10px !important;\n  }\n\n  /* Regular Data Columns Code Tags */\n  .db-table-mock td:not(:first-child) code,\n  .db-table-mock td code {\n    color: #f1f5f9 !important;\n    background: rgba(15, 23, 42, 0.7) !important;\n    border: 1px solid rgba(255, 255, 255, 0.12) !important;\n    border-radius: 5px !important;\n    font-family: 'JetBrains Mono', 'Fira Code', monospace !important;\n    font-size: 0.81rem !important;\n    line-height: 1.45 !important;\n    padding: 3px 8px !important;\n  }\n\n  /* Anti-Pattern Table Colors (Dark Mode) */\n  .anti-pattern-table thead th:nth-child(1) {\n    background-color: #1a162b !important;\n    color: #fca5a5 !important;\n    border-bottom: 2px solid rgba(244, 63, 94, 0.4) !important;\n    border-right: 2px solid rgba(244, 63, 94, 0.4) !important;\n  }\n\n  .anti-pattern-table thead th:nth-child(2) {\n    color: #6ee7b7 !important;\n  }\n\n  .anti-pattern-table tbody td:nth-child(1) code {\n    background: rgba(244, 63, 94, 0.14) !important;\n    border: 1px solid rgba(244, 63, 94, 0.38) !important;\n    color: #fda4af !important;\n  }\n\n  .anti-pattern-table tbody td:nth-child(2) code,\n  .anti-pattern-table tbody td:nth-child(4) code {\n    background: rgba(16, 185, 129, 0.12) !important;\n    border: 1px solid rgba(16, 185, 129, 0.35) !important;\n    color: #6ee7b7 !important;\n  }\n\n  .anti-pattern-table .ap-result-bad, .anti-pattern-table .ap-bad-text {\n    color: #fb7185 !important;\n  }\n  .anti-pattern-table .ap-result-good, .anti-pattern-table .ap-good-text {\n    color: #34d399 !important;\n  }\n\n  /* ── 2. LIGHT MODE ([data-theme=\"light\"]) TABLE FONT COLORS ── */\n  [data-theme=\"light\"] .db-table-mock thead th {\n    color: #0369a1 !important;\n    background-color: #f8fafc !important;\n    border-bottom: 2px solid #cbd5e1 !important;\n    font-weight: 700 !important;\n  }\n\n  [data-theme=\"light\"] .db-table-mock thead th:nth-child(1) {\n    color: #0f172a !important;\n    background-color: #f1f5f9 !important;\n    border-right: 2px solid #cbd5e1 !important;\n    border-bottom: 2px solid #cbd5e1 !important;\n    font-weight: 800 !important;\n  }\n\n  [data-theme=\"light\"] .db-table-mock td {\n    color: #334155 !important;\n    border-bottom: 1px solid #e2e8f0 !important;\n  }\n\n  [data-theme=\"light\"] .db-table-mock td strong {\n    color: #0f172a !important;\n    font-weight: 700 !important;\n  }\n\n  [data-theme=\"light\"] .db-table-mock td em {\n    color: #64748b !important;\n  }\n\n  /* Column 1 Code Badge (Crisp Azure Blue) */\n  [data-theme=\"light\"] .db-table-mock td:nth-child(1) code {\n    color: #0284c7 !important;\n    background: #e0f2fe !important;\n    border: 1px solid #7dd3fc !important;\n  }\n\n  /* Regular Data Columns Code Tags (Light Mode) */\n  [data-theme=\"light\"] .db-table-mock td:not(:first-child) code,\n  [data-theme=\"light\"] .db-table-mock td code {\n    color: #0f172a !important;\n    background: #f1f5f9 !important;\n    border: 1px solid #e2e8f0 !important;\n  }\n\n  /* Anti-Pattern Table Colors (Light Mode) */\n  [data-theme=\"light\"] .anti-pattern-table thead th:nth-child(1) {\n    background-color: #fff1f2 !important;\n    color: #be123c !important;\n    border-bottom: 2px solid #fecdd3 !important;\n    border-right: 2px solid #fecdd3 !important;\n  }\n\n  [data-theme=\"light\"] .anti-pattern-table thead th:nth-child(2) {\n    color: #059669 !important;\n  }\n\n  [data-theme=\"light\"] .anti-pattern-table tbody td:nth-child(1) code {\n    background: #ffe4e6 !important;\n    border-color: #fecdd3 !important;\n    color: #e11d48 !important;\n  }\n\n  [data-theme=\"light\"] .anti-pattern-table tbody td:nth-child(2) code,\n  [data-theme=\"light\"] .anti-pattern-table tbody td:nth-child(4) code {\n    background: #ecfdf5 !important;\n    border-color: #a7f3d0 !important;\n    color: #059669 !important;\n  }\n\n  [data-theme=\"light\"] .anti-pattern-table .ap-result-bad, [data-theme=\"light\"] .anti-pattern-table .ap-bad-text {\n    color: #e11d48 !important;\n  }\n  [data-theme=\"light\"] .anti-pattern-table .ap-result-good, [data-theme=\"light\"] .anti-pattern-table .ap-good-text {\n    color: #059669 !important;\n  }\n</style>\n<div class=\"slide-content-track\">\n  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 SECTION 01: FUNCTION ARCHITECTURE & THE REUSABLE FACTORY MENTAL MODEL \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n  <section id=\"day10Sec01\" class=\"slide-section\">\n    <h2 class=\"slide-section-title heading-box-wrap heading-with-audio\" id=\"headingFunctionFactory\">\n      <span class=\"heading-num-box\">01</span>\n      <span class=\"heading-title-box\">\n        <span class=\"heading-title-text\">Function Definitions & Architecture</span>\n        <button class=\"audio-play-btn\" onclick=\"playAudio('Day10/New_PyDay10Audio01.mp3', this)\" title=\"Play narration\">\n          <svg class=\"audio-play-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><polygon points=\"5 3 19 12 5 21 5 3\"></polygon></svg>\n        </button>\n      </span>\n    </h2>\n    <p class=\"section-intro-text\">Think of a Python function like a standardized manufacturing factory. Raw inputs (arguments) enter the input conveyor dock; inside, isolated machinery transforms the data; and a packaged finished product (the return value) exits the shipping dock. Crucially, any local tools created inside the factory remain completely invisible to the outside world, guaranteeing modularity and zero variable naming collisions.</p>\n\n    <div class=\"table-header-wrap\">\n      <h4 class=\"table-header-title\">Function Definition Primitives</h4>\n      <div class=\"table-header-actions\">\n        <div class=\"table-search-box\">\n          <svg class=\"table-search-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"11\" cy=\"11\" r=\"8\"></circle><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"></line></svg>\n          <input type=\"text\" class=\"table-search-input\" placeholder=\"Filter table...\" onkeyup=\"filterTable(this)\">\n        </div>\n      </div>\n    </div>\n    <div class=\"db-mock-table-wrap\">\n      <table class=\"db-table-mock db-table-mock--compact arith-sticky-table\">\n        <thead><tr><th>Construct / Syntax</th><th>Example Expression</th><th>Evaluation Mechanics</th><th>Production Engineering Context</th></tr></thead>\n        <tbody>\n          <tr><td><code>def func(params):</code></td><td><code>def calculate_tax(amount):</code></td><td>Standard Function Declaration</td><td>Creates a callable function object bound to 'func' in namespace.</td></tr>\n          <tr><td><code>return value</code></td><td><code>return amount * 0.15</code></td><td>Explicit Return Value</td><td>Terminates execution and returns calculated value to caller.</td></tr>\n          <tr><td><code>Implicit None Return</code></td><td><code>def log_msg(msg): print(msg)</code></td><td>Returns None by Default</td><td>Functions without explicit return return None.</td></tr>\n          <tr><td><code>Docstrings</code></td><td><code>\"\"\"Calculate tax.\"\"\"</code></td><td>PEP 257 Documentation</td><td>Accessible via func.__doc__ and help(func).</td></tr>\n        </tbody>\n      </table>\n    </div>\n    <div class=\"code-subblock\">\n      <div class=\"code-subblock-header\">\n        <div class=\"mac-dots\"><div class=\"mac-dot red\"></div><div class=\"mac-dot yellow\"></div><div class=\"mac-dot green\"></div></div>\n        <span class=\"code-subblock-title\">demo_headingFunctionFactory.py</span>\n      </div>\n      <pre class=\"code-subblock-body\"><code><span class=\"py-comment\"># Section 01: Function Architecture & The Reusable Factory Mental Model</span>\n<span class=\"py-kw\">def</span> <span class=\"py-fn\">execute_demo</span>(<span class=\"py-var\">data</span>):\n    <span class=\"py-kw\">if</span> <span class=\"py-var\">data</span>:\n        <span class=\"py-kw\">return</span> [<span class=\"py-fn\">str</span>(<span class=\"py-var\">x</span>) <span class=\"py-kw\">for</span> <span class=\"py-var\">x</span> <span class=\"py-kw\">in</span> <span class=\"py-var\">data</span>]\n    <span class=\"py-kw\">return</span> []\n</code></pre>\n    </div>\n  </section>\n\n  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 SECTION 02: PARAMETERS VS ARGUMENTS: POSITIONAL, KEYWORD & DEFAULTS \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n  <section id=\"day10Sec02\" class=\"slide-section\">\n    <h2 class=\"slide-section-title heading-box-wrap heading-with-audio\" id=\"headingParametersArgs\">\n      <span class=\"heading-num-box\">02</span>\n      <span class=\"heading-title-box\">\n        <span class=\"heading-title-text\">Positional & Keyword Arguments</span>\n        <button class=\"audio-play-btn\" onclick=\"playAudio('Day10/New_PyDay10Audio02.mp3', this)\" title=\"Play narration\">\n          <svg class=\"audio-play-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><polygon points=\"5 3 19 12 5 21 5 3\"></polygon></svg>\n        </button>\n      </span>\n    </h2>\n    <p class=\"section-intro-text\">A <strong>Parameter</strong> is the variable listed in the function definition. An <strong>Argument</strong> is the actual value passed during invocation. Python allows passing arguments positionally (by order) or as keyword arguments (by name).</p>\n\n    <div class=\"table-header-wrap\">\n      <h4 class=\"table-header-title\">Parameter Types & Passing Conventions</h4>\n      <div class=\"table-header-actions\">\n        <div class=\"table-search-box\">\n          <svg class=\"table-search-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"11\" cy=\"11\" r=\"8\"></circle><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"></line></svg>\n          <input type=\"text\" class=\"table-search-input\" placeholder=\"Filter table...\" onkeyup=\"filterTable(this)\">\n        </div>\n      </div>\n    </div>\n    <div class=\"db-mock-table-wrap\">\n      <table class=\"db-table-mock db-table-mock--compact arith-sticky-table\">\n        <thead><tr><th>Construct / Syntax</th><th>Example Expression</th><th>Evaluation Mechanics</th><th>Production Engineering Context</th></tr></thead>\n        <tbody>\n          <tr><td><code>Positional Arguments</code></td><td><code>f(10, 20)</code></td><td>Order-Dependent</td><td>Arguments matched to parameters strictly by index order.</td></tr>\n          <tr><td><code>Keyword Arguments</code></td><td><code>f(y=20, x=10)</code></td><td>Name-Explicit</td><td>Matched by parameter name; order is irrelevant.</td></tr>\n          <tr><td><code>Default Parameters</code></td><td><code>def f(x, rate=0.05):</code></td><td>Optional Defaults</td><td>Parameters with fallbacks; must appear after non-default params.</td></tr>\n        </tbody>\n      </table>\n    </div>\n    <div class=\"py-keynotes-card\">\n      <div class=\"py-keynotes-header\">\n        <span class=\"py-keynotes-badge\">KEY TAKEAWAY</span>\n        <h4 class=\"py-keynotes-title\">Production Best Practices: Parameters vs Arguments: Positional, Keyword & Defaults</h4>\n      </div>\n      <ul class=\"py-keynotes-list\">\n        <li><strong>Architectural Rule:</strong> Write deterministic, readable code prioritizing clarity and testability.</li>\n        <li><strong>Performance Note:</strong> Leverage CPython internal optimizations and avoid premature anti-pattern overheads.</li>\n        <li><strong>Edge Safety:</strong> Always validate bounds, null states, and empty collection inputs defensively.</li>\n      </ul>\n    </div>\n  </section>\n\n  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 SECTION 03: THE MUTABLE DEFAULT ARGUMENT DISASTER (DEF F(X=[])) \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n  <section id=\"day10Sec03\" class=\"slide-section\">\n    <h2 class=\"slide-section-title heading-box-wrap heading-with-audio\" id=\"headingMutableDefault\">\n      <span class=\"heading-num-box\">03</span>\n      <span class=\"heading-title-box\">\n        <span class=\"heading-title-text\">Default & Mutable Arguments</span>\n        <button class=\"audio-play-btn\" onclick=\"playAudio('Day10/New_PyDay10Audio03.mp3', this)\" title=\"Play narration\">\n          <svg class=\"audio-play-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><polygon points=\"5 3 19 12 5 21 5 3\"></polygon></svg>\n        </button>\n      </span>\n    </h2>\n    <p class=\"section-intro-text\">One of Python's most notorious interview traps is setting a mutable object (like a list <code>[]</code> or dict <code>{}</code>) as a default parameter. Python evaluates default arguments **once at module load time**, not upon each function call! Every call shares the same heap object.</p>\n\n    <div class=\"table-header-wrap\">\n      <h4 class=\"table-header-title\">The Mutable Default Trap vs The None Fix</h4>\n      <div class=\"table-header-actions\">\n        <div class=\"table-search-box\">\n          <svg class=\"table-search-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"11\" cy=\"11\" r=\"8\"></circle><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"></line></svg>\n          <input type=\"text\" class=\"table-search-input\" placeholder=\"Filter table...\" onkeyup=\"filterTable(this)\">\n        </div>\n      </div>\n    </div>\n    <div class=\"db-mock-table-wrap\">\n      <table class=\"db-table-mock db-table-mock--compact arith-sticky-table\">\n        <thead><tr><th>Construct / Syntax</th><th>Example Expression</th><th>Evaluation Mechanics</th><th>Production Engineering Context</th></tr></thead>\n        <tbody>\n          <tr><td><code>Buggy: def f(x=[]):</code></td><td><code>x.append(1); return x</code></td><td>State Leaks Across Calls</td><td>Repeated calls continuously grow the same list!</td></tr>\n          <tr><td><code>Fixed: def f(x=None):</code></td><td><code>if x is None: x = []; x.append(1)</code></td><td>Independent Allocation</td><td>Allocates a pristine new list on each invocation.</td></tr>\n        </tbody>\n      </table>\n    </div>\n    <div class=\"code-subblock\">\n      <div class=\"code-subblock-header\">\n        <div class=\"mac-dots\"><div class=\"mac-dot red\"></div><div class=\"mac-dot yellow\"></div><div class=\"mac-dot green\"></div></div>\n        <span class=\"code-subblock-title\">demo_headingMutableDefault.py</span>\n      </div>\n      <pre class=\"code-subblock-body\"><code><span class=\"py-comment\"># Section 03: The Mutable Default Argument Disaster (def f(x=[]))</span>\n<span class=\"py-kw\">def</span> <span class=\"py-fn\">execute_demo</span>(<span class=\"py-var\">data</span>):\n    <span class=\"py-kw\">if</span> <span class=\"py-var\">data</span>:\n        <span class=\"py-kw\">return</span> [<span class=\"py-fn\">str</span>(<span class=\"py-var\">x</span>) <span class=\"py-kw\">for</span> <span class=\"py-var\">x</span> <span class=\"py-kw\">in</span> <span class=\"py-var\">data</span>]\n    <span class=\"py-kw\">return</span> []\n</code></pre>\n    </div>\n  </section>\n\n  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 SECTION 04: ARBITRARY ARGUMENTS: MASTERING *ARGS AND **KWARGS \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n  <section id=\"day10Sec04\" class=\"slide-section\">\n    <h2 class=\"slide-section-title heading-box-wrap heading-with-audio\" id=\"headingArgsKwargs\">\n      <span class=\"heading-num-box\">04</span>\n      <span class=\"heading-title-box\">\n        <span class=\"heading-title-text\">Variable Arguments (*args, **kwargs)</span>\n        <button class=\"audio-play-btn\" onclick=\"playAudio('Day10/New_PyDay10Audio04.mp3', this)\" title=\"Play narration\">\n          <svg class=\"audio-play-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><polygon points=\"5 3 19 12 5 21 5 3\"></polygon></svg>\n        </button>\n      </span>\n    </h2>\n    <p class=\"section-intro-text\">When designing flexible functions, <code>*args</code> packs extra positional arguments into an immutable <strong>tuple</strong>, while <code>**kwargs</code> packs extra keyword arguments into a <strong>dictionary</strong>.</p>\n\n    <div class=\"table-header-wrap\">\n      <h4 class=\"table-header-title\">Variadic Argument Packing</h4>\n      <div class=\"table-header-actions\">\n        <div class=\"table-search-box\">\n          <svg class=\"table-search-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"11\" cy=\"11\" r=\"8\"></circle><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"></line></svg>\n          <input type=\"text\" class=\"table-search-input\" placeholder=\"Filter table...\" onkeyup=\"filterTable(this)\">\n        </div>\n      </div>\n    </div>\n    <div class=\"db-mock-table-wrap\">\n      <table class=\"db-table-mock db-table-mock--compact arith-sticky-table\">\n        <thead><tr><th>Construct / Syntax</th><th>Example Expression</th><th>Evaluation Mechanics</th><th>Production Engineering Context</th></tr></thead>\n        <tbody>\n          <tr><td><code>*args (Positional)</code></td><td><code>def sum_all(*args): sum(args)</code></td><td>Packs into tuple</td><td>Accepts any number of positional arguments.</td></tr>\n          <tr><td><code>**kwargs (Keyword)</code></td><td><code>def config(**kwargs): kwargs.get('debug')</code></td><td>Packs into dict</td><td>Accepts arbitrary key-value options.</td></tr>\n          <tr><td><code>Argument Unpacking</code></td><td><code>f(*my_list, **my_dict)</code></td><td>Unpacks collections</td><td>Expands lists/dicts into function call arguments.</td></tr>\n        </tbody>\n      </table>\n    </div>\n    <div class=\"py-keynotes-card\">\n      <div class=\"py-keynotes-header\">\n        <span class=\"py-keynotes-badge\">KEY TAKEAWAY</span>\n        <h4 class=\"py-keynotes-title\">Production Best Practices: Arbitrary Arguments: Mastering *args and **kwargs</h4>\n      </div>\n      <ul class=\"py-keynotes-list\">\n        <li><strong>Architectural Rule:</strong> Write deterministic, readable code prioritizing clarity and testability.</li>\n        <li><strong>Performance Note:</strong> Leverage CPython internal optimizations and avoid premature anti-pattern overheads.</li>\n        <li><strong>Edge Safety:</strong> Always validate bounds, null states, and empty collection inputs defensively.</li>\n      </ul>\n    </div>\n  </section>\n\n  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 SECTION 05: POSITIONAL-ONLY (/) AND KEYWORD-ONLY (*) PARAMETERS (PEP 570) \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n  <section id=\"day10Sec05\" class=\"slide-section\">\n    <h2 class=\"slide-section-title heading-box-wrap heading-with-audio\" id=\"headingKeywordOnly\">\n      <span class=\"heading-num-box\">05</span>\n      <span class=\"heading-title-box\">\n        <span class=\"heading-title-text\">Positional-Only & Keyword-Only</span>\n        <button class=\"audio-play-btn\" onclick=\"playAudio('Day10/New_PyDay10Audio05.mp3', this)\" title=\"Play narration\">\n          <svg class=\"audio-play-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><polygon points=\"5 3 19 12 5 21 5 3\"></polygon></svg>\n        </button>\n      </span>\n    </h2>\n    <p class=\"section-intro-text\">Modern Python 3.8+ allows strict parameter contracts: parameters before <code>/</code> are positional-only; parameters after <code>*</code> are keyword-only. This protects APIs from brittle refactoring.</p>\n\n    <div class=\"table-header-wrap\">\n      <h4 class=\"table-header-title\">PEP 570 Parameter Markers</h4>\n      <div class=\"table-header-actions\">\n        <div class=\"table-search-box\">\n          <svg class=\"table-search-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"11\" cy=\"11\" r=\"8\"></circle><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"></line></svg>\n          <input type=\"text\" class=\"table-search-input\" placeholder=\"Filter table...\" onkeyup=\"filterTable(this)\">\n        </div>\n      </div>\n    </div>\n    <div class=\"db-mock-table-wrap\">\n      <table class=\"db-table-mock db-table-mock--compact arith-sticky-table\">\n        <thead><tr><th>Construct / Syntax</th><th>Example Expression</th><th>Evaluation Mechanics</th><th>Production Engineering Context</th></tr></thead>\n        <tbody>\n          <tr><td><code>Positional-Only /</code></td><td><code>def f(a, b, /, c):</code></td><td>Disallows f(a=1, b=2)</td><td>Arguments before / cannot be passed by keyword name.</td></tr>\n          <tr><td><code>Keyword-Only *</code></td><td><code>def f(a, *, timeout=30):</code></td><td>Forces f(1, timeout=60)</td><td>Arguments after * MUST be passed explicitly by keyword name.</td></tr>\n        </tbody>\n      </table>\n    </div>\n    <div class=\"code-subblock\">\n      <div class=\"code-subblock-header\">\n        <div class=\"mac-dots\"><div class=\"mac-dot red\"></div><div class=\"mac-dot yellow\"></div><div class=\"mac-dot green\"></div></div>\n        <span class=\"code-subblock-title\">demo_headingKeywordOnly.py</span>\n      </div>\n      <pre class=\"code-subblock-body\"><code><span class=\"py-comment\"># Section 05: Positional-Only (/) and Keyword-Only (*) Parameters (PEP 570)</span>\n<span class=\"py-kw\">def</span> <span class=\"py-fn\">execute_demo</span>(<span class=\"py-var\">data</span>):\n    <span class=\"py-kw\">if</span> <span class=\"py-var\">data</span>:\n        <span class=\"py-kw\">return</span> [<span class=\"py-fn\">str</span>(<span class=\"py-var\">x</span>) <span class=\"py-kw\">for</span> <span class=\"py-var\">x</span> <span class=\"py-kw\">in</span> <span class=\"py-var\">data</span>]\n    <span class=\"py-kw\">return</span> []\n</code></pre>\n    </div>\n  </section>\n\n  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 SECTION 06: RETURN MECHANICS: IMPLICIT NONE, SINGLE VALUES & TUPLE UNPACKING \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n  <section id=\"day10Sec06\" class=\"slide-section\">\n    <h2 class=\"slide-section-title heading-box-wrap heading-with-audio\" id=\"headingReturnMechanics\">\n      <span class=\"heading-num-box\">06</span>\n      <span class=\"heading-title-box\">\n        <span class=\"heading-title-text\">Return Values & Unpacking</span>\n        <button class=\"audio-play-btn\" onclick=\"playAudio('Day10/New_PyDay10Audio06.mp3', this)\" title=\"Play narration\">\n          <svg class=\"audio-play-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><polygon points=\"5 3 19 12 5 21 5 3\"></polygon></svg>\n        </button>\n      </span>\n    </h2>\n    <p class=\"section-intro-text\">In Python, a function always returns something. Multiple values separated by commas (<code>return a, b</code>) are automatically packed into a <strong>tuple</strong>, allowing clean multiple assignment unpacking.</p>\n\n    <div class=\"table-header-wrap\">\n      <h4 class=\"table-header-title\">Return Patterns</h4>\n      <div class=\"table-header-actions\">\n        <div class=\"table-search-box\">\n          <svg class=\"table-search-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"11\" cy=\"11\" r=\"8\"></circle><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"></line></svg>\n          <input type=\"text\" class=\"table-search-input\" placeholder=\"Filter table...\" onkeyup=\"filterTable(this)\">\n        </div>\n      </div>\n    </div>\n    <div class=\"db-mock-table-wrap\">\n      <table class=\"db-table-mock db-table-mock--compact arith-sticky-table\">\n        <thead><tr><th>Construct / Syntax</th><th>Example Expression</th><th>Evaluation Mechanics</th><th>Production Engineering Context</th></tr></thead>\n        <tbody>\n          <tr><td><code>Single Return</code></td><td><code>return total</code></td><td>Scalar / Object Return</td><td>Returns one unified data structure.</td></tr>\n          <tr><td><code>Multiple Return</code></td><td><code>return min_val, max_val</code></td><td>Tuple Packing</td><td>Packed into tuple; unpacked via `low, high = f()`.</td></tr>\n          <tr><td><code>Early Return (Guard)</code></td><td><code>if not valid: return None</code></td><td>Short-Circuit Guard</td><td>Halts early when edge conditions are violated.</td></tr>\n        </tbody>\n      </table>\n    </div>\n    <div class=\"py-keynotes-card\">\n      <div class=\"py-keynotes-header\">\n        <span class=\"py-keynotes-badge\">KEY TAKEAWAY</span>\n        <h4 class=\"py-keynotes-title\">Production Best Practices: Return Mechanics: Implicit None, Single Values & Tuple Unpacking</h4>\n      </div>\n      <ul class=\"py-keynotes-list\">\n        <li><strong>Architectural Rule:</strong> Write deterministic, readable code prioritizing clarity and testability.</li>\n        <li><strong>Performance Note:</strong> Leverage CPython internal optimizations and avoid premature anti-pattern overheads.</li>\n        <li><strong>Edge Safety:</strong> Always validate bounds, null states, and empty collection inputs defensively.</li>\n      </ul>\n    </div>\n  </section>\n\n  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 SECTION 07: VARIABLE SCOPE & THE LEGB RULE (LOCAL, ENCLOSING, GLOBAL, BUILT-IN) \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n  <section id=\"day10Sec07\" class=\"slide-section\">\n    <h2 class=\"slide-section-title heading-box-wrap heading-with-audio\" id=\"headingScopeLEGB\">\n      <span class=\"heading-num-box\">07</span>\n      <span class=\"heading-title-box\">\n        <span class=\"heading-title-text\">Variable Scope & LEGB Rule</span>\n        <button class=\"audio-play-btn\" onclick=\"playAudio('Day10/New_PyDay10Audio07.mp3', this)\" title=\"Play narration\">\n          <svg class=\"audio-play-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><polygon points=\"5 3 19 12 5 21 5 3\"></polygon></svg>\n        </button>\n      </span>\n    </h2>\n    <p class=\"section-intro-text\">When a variable name is referenced, CPython searches 4 concentric namespaces in strict order: <strong>L</strong>ocal $\\to$ <strong>E</strong>nclosing $\\to$ <strong>G</strong>lobal $\\to$ <strong>B</strong>uilt-in.</p>\n\n    <div class=\"table-header-wrap\">\n      <h4 class=\"table-header-title\">The LEGB Scope Hierarchy</h4>\n      <div class=\"table-header-actions\">\n        <div class=\"table-search-box\">\n          <svg class=\"table-search-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"11\" cy=\"11\" r=\"8\"></circle><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"></line></svg>\n          <input type=\"text\" class=\"table-search-input\" placeholder=\"Filter table...\" onkeyup=\"filterTable(this)\">\n        </div>\n      </div>\n    </div>\n    <div class=\"db-mock-table-wrap\">\n      <table class=\"db-table-mock db-table-mock--compact arith-sticky-table\">\n        <thead><tr><th>Construct / Syntax</th><th>Example Expression</th><th>Evaluation Mechanics</th><th>Production Engineering Context</th></tr></thead>\n        <tbody>\n          <tr><td><code>Local (L)</code></td><td><code>Inside current function</code></td><td>Created on entry, destroyed on return.</td><td>Highest precedence namespace.</td></tr>\n          <tr><td><code>Enclosing (E)</code></td><td><code>Outer enclosing function (closures)</code></td><td>Preserved across inner nested functions.</td><td>Used in decorators and factory functions.</td></tr>\n          <tr><td><code>Global (G)</code></td><td><code>Module-level variables</code></td><td>Accessible throughout the file.</td><td>Modified via `global x` keyword.</td></tr>\n          <tr><td><code>Built-in (B)</code></td><td><code>Python built-ins (len, sum, range)</code></td><td>Always available globally.</td><td>Lowest precedence fallback.</td></tr>\n        </tbody>\n      </table>\n    </div>\n    <div class=\"code-subblock\">\n      <div class=\"code-subblock-header\">\n        <div class=\"mac-dots\"><div class=\"mac-dot red\"></div><div class=\"mac-dot yellow\"></div><div class=\"mac-dot green\"></div></div>\n        <span class=\"code-subblock-title\">demo_headingScopeLEGB.py</span>\n      </div>\n      <pre class=\"code-subblock-body\"><code><span class=\"py-comment\"># Section 07: Variable Scope & The LEGB Rule (Local, Enclosing, Global, Built-in)</span>\n<span class=\"py-kw\">def</span> <span class=\"py-fn\">execute_demo</span>(<span class=\"py-var\">data</span>):\n    <span class=\"py-kw\">if</span> <span class=\"py-var\">data</span>:\n        <span class=\"py-kw\">return</span> [<span class=\"py-fn\">str</span>(<span class=\"py-var\">x</span>) <span class=\"py-kw\">for</span> <span class=\"py-var\">x</span> <span class=\"py-kw\">in</span> <span class=\"py-var\">data</span>]\n    <span class=\"py-kw\">return</span> []\n</code></pre>\n    </div>\n  </section>\n\n  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 SECTION 08: FIRST-CLASS FUNCTIONS & ANONYMOUS LAMBDA EXPRESSIONS \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n  <section id=\"day10Sec08\" class=\"slide-section\">\n    <h2 class=\"slide-section-title heading-box-wrap heading-with-audio\" id=\"headingLambdas\">\n      <span class=\"heading-num-box\">08</span>\n      <span class=\"heading-title-box\">\n        <span class=\"heading-title-text\">Lambda Expressions</span>\n        <button class=\"audio-play-btn\" onclick=\"playAudio('Day10/New_PyDay10Audio08.mp3', this)\" title=\"Play narration\">\n          <svg class=\"audio-play-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><polygon points=\"5 3 19 12 5 21 5 3\"></polygon></svg>\n        </button>\n      </span>\n    </h2>\n    <p class=\"section-intro-text\">Functions in Python are <strong>first-class citizens</strong>: they can be passed as arguments, assigned to variables, and returned from other functions. A <code>lambda</code> is a small anonymous function limited to a single expression.</p>\n\n    <div class=\"table-header-wrap\">\n      <h4 class=\"table-header-title\">First-Class & Lambda Primitives</h4>\n      <div class=\"table-header-actions\">\n        <div class=\"table-search-box\">\n          <svg class=\"table-search-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"11\" cy=\"11\" r=\"8\"></circle><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"></line></svg>\n          <input type=\"text\" class=\"table-search-input\" placeholder=\"Filter table...\" onkeyup=\"filterTable(this)\">\n        </div>\n      </div>\n    </div>\n    <div class=\"db-mock-table-wrap\">\n      <table class=\"db-table-mock db-table-mock--compact arith-sticky-table\">\n        <thead><tr><th>Construct / Syntax</th><th>Example Expression</th><th>Evaluation Mechanics</th><th>Production Engineering Context</th></tr></thead>\n        <tbody>\n          <tr><td><code>First-Class Passing</code></td><td><code>sorted(data, key=func)</code></td><td>Pass function as data</td><td>Enables higher-order functional patterns.</td></tr>\n          <tr><td><code>Lambda Syntax</code></td><td><code>lambda x: x ** 2</code></td><td>Inline Anonymous Callable</td><td>Best for short one-liner key extractors in sorted() and min().</td></tr>\n        </tbody>\n      </table>\n    </div>\n    <div class=\"py-keynotes-card\">\n      <div class=\"py-keynotes-header\">\n        <span class=\"py-keynotes-badge\">KEY TAKEAWAY</span>\n        <h4 class=\"py-keynotes-title\">Production Best Practices: First-Class Functions & Anonymous Lambda Expressions</h4>\n      </div>\n      <ul class=\"py-keynotes-list\">\n        <li><strong>Architectural Rule:</strong> Write deterministic, readable code prioritizing clarity and testability.</li>\n        <li><strong>Performance Note:</strong> Leverage CPython internal optimizations and avoid premature anti-pattern overheads.</li>\n        <li><strong>Edge Safety:</strong> Always validate bounds, null states, and empty collection inputs defensively.</li>\n      </ul>\n    </div>\n  </section>\n\n  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 SECTION 09: 10 CRITICAL FUNCTION ANTI-PATTERNS & PRODUCTION TRAPS \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n  <section id=\"day10Sec09\" class=\"slide-section\">\n    <h2 class=\"slide-section-title heading-box-wrap heading-with-audio\" id=\"headingFunctionAntiPatterns\">\n      <span class=\"heading-num-box\">09</span>\n      <span class=\"heading-title-box\">\n        <span class=\"heading-title-text\">Common Anti-Patterns</span>\n        <button class=\"audio-play-btn\" onclick=\"playAudio('Day10/New_PyDay10Audio09.mp3', this)\" title=\"Play narration\">\n          <svg class=\"audio-play-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><polygon points=\"5 3 19 12 5 21 5 3\"></polygon></svg>\n        </button>\n      </span>\n    </h2>\n    <p class=\"section-intro-text\">Review these 10 dangerous function design anti-patterns that create brittle code, hidden side effects, and concurrency bugs.</p>\n\n    <div class=\"table-header-wrap\">\n      <h4 class=\"table-header-title\">Master Function Anti-Pattern Review Table</h4>\n      <div class=\"table-header-actions\">\n        <div class=\"table-search-box\">\n          <svg class=\"table-search-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"11\" cy=\"11\" r=\"8\"></circle><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"></line></svg>\n          <input type=\"text\" class=\"table-search-input\" placeholder=\"Filter table...\" onkeyup=\"filterTable(this)\">\n        </div>\n      </div>\n    </div>\n    <div class=\"db-mock-table-wrap\">\n      <table class=\"db-table-mock db-table-mock--compact arith-sticky-table anti-pattern-table\">\n        <thead><tr><th>Anti-Pattern Code</th><th>Buggy / Dangerous Result</th><th>Best Practice Architecture</th></tr></thead>\n        <tbody>\n          <tr><td><span class=\"ap-code-bad\">Mutable Default def f(x=[])</span></td><td><span class=\"ap-result-bad\">x.append(1)</span></td><td><span class=\"ap-code-fix\">State leaks across calls</span></td></tr>\n          <tr><td><span class=\"ap-code-bad\">Excessive Global State</span></td><td><span class=\"ap-result-bad\">global counter; counter += 1</span></td><td><span class=\"ap-code-fix\">Untestable & thread-unsafe</span></td></tr>\n          <tr><td><span class=\"ap-code-bad\">Missing Return on Branch</span></td><td><span class=\"ap-result-bad\">if c: return x (no else return)</span></td><td><span class=\"ap-code-fix\">Implicitly returns None</span></td></tr>\n          <tr><td><span class=\"ap-code-bad\">Overusing Lambdas</span></td><td><span class=\"ap-result-bad\">f = lambda x, y, z: complex_logic</span></td><td><span class=\"ap-code-fix\">Hard to debug, no name</span></td></tr>\n          <tr><td><span class=\"ap-code-bad\">Catch-All **kwargs Abuse</span></td><td><span class=\"ap-result-bad\">def f(**kwargs): x = kwargs['x']</span></td><td><span class=\"ap-code-fix\">Hides API schema & signature</span></td></tr>\n        </tbody>\n      </table>\n    </div>\n  </section>\n\n  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 SECTION 10: TOP 25 FAANG TECHNICAL INTERVIEW PREPARATION & ARCHITECTURE \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n  <section id=\"day10Sec10\" class=\"slide-section\">\n    <h2 class=\"slide-section-title heading-box-wrap heading-with-audio\" id=\"headingInterviewBox\">\n      <span class=\"heading-num-box\">10</span>\n      <span class=\"heading-title-box\">\n        <span class=\"heading-title-text\">Review & Interview Questions</span>\n        <button class=\"audio-play-btn\" onclick=\"playAudio('Day10/New_PyDay10Audio10.mp3', this)\" title=\"Play narration\">\n          <svg class=\"audio-play-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><polygon points=\"5 3 19 12 5 21 5 3\"></polygon></svg>\n        </button>\n      </span>\n    </h2>\n    <p class=\"section-intro-text\">Master these 25 essential function architecture, argument packing, closures, and variable scope questions asked during FAANG senior interviews.</p>\n\n    <!-- Top 25 FAANG Interview Questions Box -->\n    <div class=\"interview-box\" id=\"day10InterviewBox\">\n      <h4 class=\"interview-header-title\">\n        <span>\ud83c\udfaf</span> Functions, Parameters, Variable Scope & Lambdas Core Concepts &amp; Top 25 FAANG Interview Preparation\n      </h4>\n      <div class=\"interview-item\" id=\"pyDay10IQ1\">\n        <p class=\"interview-question\"><strong>Q1: What is the Dangerous Mutable Default Argument trap and why does it occur?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: Default argument values in Python are evaluated once when the function definition is executed at module import time, not each time the function is called. If a default parameter is a mutable object like a list or dictionary (`def append_to(element, target=[]):`), all subsequent calls share the same physical object. The fix is setting default to None and instantiating inside: `if target is None: target = []`.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay10IQ2\">\n        <p class=\"interview-question\"><strong>Q2: Explain the LEGB rule for variable resolution in Python.</strong></p>\n        <div class=\"interview-answer\"><p><em>A: LEGB defines the namespace lookup hierarchy: Local (inside current function), Enclosing (inside any enclosing nested functions/closures), Global (module-level namespace), and Built-in (built-in module holding len, sum, etc.). Python resolves identifiers by checking L, then E, then G, then B.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay10IQ3\">\n        <p class=\"interview-question\"><strong>Q3: What is the difference between *args and **kwargs?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: `*args` collects arbitrary positional arguments into an immutable tuple. `**kwargs` collects arbitrary keyword arguments into a standard dictionary.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay10IQ4\">\n        <p class=\"interview-question\"><strong>Q4: What does the / and * syntax signify in a Python function definition (PEP 570)?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: `/` marks positional-only parameters: arguments to its left cannot be passed by keyword name. `*` marks keyword-only parameters: arguments to its right MUST be passed by keyword name.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay10IQ5\">\n        <p class=\"interview-question\"><strong>Q5: What is a closure in Python, and how does it retain state?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: A closure is an inner function that retains a reference to variables in its enclosing scope even after the outer function has finished executing. The variables are stored in the inner function's `__closure__` attribute holding cell objects.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay10IQ6\">\n        <p class=\"interview-question\"><strong>Q6: What is the difference between a normal function and a lambda function?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: A normal function is defined with `def`, can have multiple statements, docstrings, annotations, and a clear `__name__`. A lambda is an anonymous inline expression limited to a single return expression, with no statements or annotations allowed.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay10IQ7\">\n        <p class=\"interview-question\"><strong>Q7: How does the global keyword differ from nonlocal?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: `global x` tells Python to bind and modify the variable in the module-level global namespace. `nonlocal x` tells Python to bind and modify the variable in the nearest enclosing (outer function) scope, excluding global.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay10IQ8\">\n        <p class=\"interview-question\"><strong>Q8: Why does a function without an explicit return statement return None?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: CPython bytecode automatically appends `LOAD_CONST None` and `RETURN_VALUE` at the end of every function code block. If execution falls off the end of a function, it evaluates to None.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay10IQ9\">\n        <p class=\"interview-question\"><strong>Q9: Can you pass functions as arguments to other functions? What are they called?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: Yes, functions are first-class objects in Python. A function that takes another function as an argument (or returns a function) is called a Higher-Order Function (e.g. `map`, `filter`, `sorted`).</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay10IQ10\">\n        <p class=\"interview-question\"><strong>Q10: How do you inspect a function's parameters and signature programmatically?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: Use the `inspect` module: `inspect.signature(func)` returns a Signature object containing parameter names, kinds (positional-only, keyword-only), and default values.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay10IQ11\">\n        <p class=\"interview-question\"><strong>Q11: What are function annotations and type hints in Python?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: Introduced in PEP 3107 and PEP 484, type annotations (e.g. `def add(x: int, y: int) -> int:`) attach type metadata stored in `func.__annotations__`. They do not enforce runtime type checks by default but enable static analysis tools like mypy.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay10IQ12\">\n        <p class=\"interview-question\"><strong>Q12: What is the purpose of functools.wraps when writing decorators?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: When a decorator wraps a function, the inner wrapper function replaces the original function. `functools.wraps` copies the original function's `__name__`, `__doc__`, and metadata to the wrapper, preserving introspection.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay10IQ13\">\n        <p class=\"interview-question\"><strong>Q13: What is the difference between passing arguments by value and by reference in Python?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: Python uses 'Pass-by-Object-Reference' (or Pass-by-Assignment). The function receives a copy of the reference to the heap object. If the object is mutable (like a list), mutating it inside alters the caller's object. Reassigning the parameter variable inside merely points it to a new object.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay10IQ14\">\n        <p class=\"interview-question\"><strong>Q14: How do you unpack a dictionary into keyword arguments when calling a function?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: Use the double-star `**` operator: `config = {'timeout': 30, 'retries': 3}; connect(**config)` expands the dictionary into `timeout=30, retries=3`.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay10IQ15\">\n        <p class=\"interview-question\"><strong>Q15: What is recursion and what protects Python from infinite stack recursion?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: Recursion is a function calling itself to solve smaller sub-problems. CPython enforces a recursion limit (default 1000, configurable via `sys.setrecursionlimit()`). Exceeding it raises `RecursionError: maximum recursion depth exceeded`.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay10IQ16\">\n        <p class=\"interview-question\"><strong>Q16: Can a Python function return multiple values? How does it work under the hood?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: Yes. Writing `return a, b, c` creates an implicit tuple `(a, b, c)`. The caller can unpack it: `x, y, z = f()` via standard iterable unpacking.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay10IQ17\">\n        <p class=\"interview-question\"><strong>Q17: What is a pure function and why is it desirable in data engineering pipelines?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: A pure function produces output determined solely by its input arguments and causes zero side effects (no mutating global state, no database writes, no file I/O). Pure functions are deterministic, thread-safe, and easy to unit-test and cache.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay10IQ18\">\n        <p class=\"interview-question\"><strong>Q18: What is functools.lru_cache and how does memoization work?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: `@functools.lru_cache(maxsize=128)` caches the return values of a function using a hash of its arguments as the key. If called again with the same arguments, it returns the cached result in O(1) time without re-executing the body.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay10IQ19\">\n        <p class=\"interview-question\"><strong>Q19: Why does lambda x=i: x capture loop variables correctly?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: In a loop creating closures, variables in enclosing scopes are looked up at call time, not definition time (all closures see the final loop value). Setting `x=i` evaluates `i` as a default parameter at definition time, binding its current value into the local scope.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay10IQ20\">\n        <p class=\"interview-question\"><strong>Q20: What is a generator function and how does yield differ from return?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: A generator function contains the `yield` statement. When called, it returns a generator iterator. Each `yield` produces a value and suspends execution, preserving local state until `next()` is called again.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay10IQ21\">\n        <p class=\"interview-question\"><strong>Q21: How do you force keyword arguments in Python 3?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: Place an asterisk `*` by itself in the parameter list: `def create_user(username, *, is_admin=False):`. Any parameters following the `*` must be passed as keyword arguments.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay10IQ22\">\n        <p class=\"interview-question\"><strong>Q22: What are default parameters and where must they appear in the signature?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: Default parameters specify fallback values if omitted by the caller. In the parameter list, all default parameters must appear after all non-default positional parameters to avoid parsing ambiguity.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay10IQ23\">\n        <p class=\"interview-question\"><strong>Q23: What is the difference between *args in a function definition vs a function call?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: In a definition (`def f(*args):`), `*` packs multiple positional arguments into a single tuple. In a call (`f(*items)`), `*` unpacks an iterable into separate positional arguments.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay10IQ24\">\n        <p class=\"interview-question\"><strong>Q24: How does Python handle scope inside list comprehensions vs functions?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: In Python 3, list comprehensions have their own local scope (implemented as nested functions under the hood). Variables used in comprehension iteration do not leak into the enclosing function scope.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay10IQ25\">\n        <p class=\"interview-question\"><strong>Q25: What is the Single Responsibility Principle (SRP) applied to functions?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: A function should do one thing and do it well. In data analysis, keep data ingestion, validation, calculation, and reporting in separate, modular functions.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n    </div>\n  </section>\n\n</div>"
    }
  ],
  "practiceQuestions": [
    {
        "id": 1,
        "prompt": "<strong>[Functions, Parameters, Variable Scope & Lambdas] Defensive Metric Converter</strong><br/>Write a function convert_km_to_miles(km) that returns km * 0.621371 rounded to 2 decimal places. Store test result of 10 km in miles.",
        "starterCode": "# Write your code here\n",
        "ref": "def convert_km_to_miles(km):\n    return round(km * 0.621371, 2)\nmiles = convert_km_to_miles(10)\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "miles"
            ]
        }
    },
    {
        "id": 2,
        "prompt": "<strong>[Functions, Parameters, Variable Scope & Lambdas] Safe Default List Parameter Pattern</strong><br/>Write add_tag(tag, tags=None) that sets tags=[] if None, appends tag, and returns tags. Call add_tag('python') and store in res_tags.",
        "starterCode": "# Write your code here\n",
        "ref": "def add_tag(tag, tags=None):\n    if tags is None:\n        tags = []\n    tags.append(tag)\n    return tags\nres_tags = add_tag('python')\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "res_tags"
            ]
        }
    },
    {
        "id": 3,
        "prompt": "<strong>[Functions, Parameters, Variable Scope & Lambdas] Variadic Average Calculator (*args)</strong><br/>Write compute_avg(*args) that returns sum(args)/len(args) if args else 0.0. Call with 10, 20, 30 and store in avg_val.",
        "starterCode": "# Write your code here\n",
        "ref": "def compute_avg(*args):\n    return sum(args) / len(args) if args else 0.0\navg_val = compute_avg(10, 20, 30)\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "avg_val"
            ]
        }
    },
    {
        "id": 4,
        "prompt": "<strong>[Functions, Parameters, Variable Scope & Lambdas] Keyword Config Extractor (**kwargs)</strong><br/>Write get_db_url(**kwargs) that returns f\"{kwargs.get('host', 'localhost')}:{kwargs.get('port', 5432)}\". Call with host='db.internal' and store in url.",
        "starterCode": "# Write your code here\n",
        "ref": "def get_db_url(**kwargs):\n    return f\"{kwargs.get('host', 'localhost')}:{kwargs.get('port', 5432)}\"\nurl = get_db_url(host='db.internal')\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "url"
            ]
        }
    },
    {
        "id": 5,
        "prompt": "<strong>[Functions, Parameters, Variable Scope & Lambdas] Tuple Unpacking Return MinMax</strong><br/>Write get_bounds(numbers) that returns (min(numbers), max(numbers)). Call with [12, 5, 89, 44] and store in low, high.",
        "starterCode": "# Write your code here\n",
        "ref": "def get_bounds(numbers):\n    return min(numbers), max(numbers)\nlow, high = get_bounds([12, 5, 89, 44])\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "low"
            ]
        }
    },
    {
        "id": 6,
        "prompt": "<strong>[Functions, Parameters, Variable Scope & Lambdas] Keyword-Only Parameter Function</strong><br/>Write calculate_interest(principal, *, rate=0.05, years=1) returning principal * rate * years. Call with 1000, rate=0.07 and store in interest.",
        "starterCode": "# Write your code here\n",
        "ref": "def calculate_interest(principal, *, rate=0.05, years=1):\n    return principal * rate * years\ninterest = calculate_interest(1000, rate=0.07)\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "interest"
            ]
        }
    },
    {
        "id": 7,
        "prompt": "<strong>[Functions, Parameters, Variable Scope & Lambdas] Positional-Only Parameter Function</strong><br/>Write divide(a, b, /) that returns a / b. Call with 100, 4 and store in quotient.",
        "starterCode": "# Write your code here\n",
        "ref": "def divide(a, b, /):\n    return a / b\nquotient = divide(100, 4)\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "quotient"
            ]
        }
    },
    {
        "id": 8,
        "prompt": "<strong>[Functions, Parameters, Variable Scope & Lambdas] Lambda Sorter by Dictionary Key</strong><br/>Given users = [{'name': 'Bob', 'age': 30}, {'name': 'Alice', 'age': 25}], sort by 'age' using a lambda key. Store in sorted_users.",
        "starterCode": "# Write your code here\n",
        "ref": "users = [{'name': 'Bob', 'age': 30}, {'name': 'Alice', 'age': 25}]\nsorted_users = sorted(users, key=lambda u: u['age'])\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "sorted_users"
            ]
        }
    },
    {
        "id": 9,
        "prompt": "<strong>[Functions, Parameters, Variable Scope & Lambdas] Lambda Multiplier Factory</strong><br/>Write make_multiplier(n) returning lambda x: x * n. Call make_multiplier(3) on 7 and store in tripled.",
        "starterCode": "# Write your code here\n",
        "ref": "def make_multiplier(n):\n    return lambda x: x * n\ntripled = make_multiplier(3)(7)\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "tripled"
            ]
        }
    },
    {
        "id": 10,
        "prompt": "<strong>[Functions, Parameters, Variable Scope & Lambdas] Closure Counter Generator</strong><br/>Write create_counter() returning a closure that increments and returns a counter on each call. Call twice and store in count2.",
        "starterCode": "# Write your code here\n",
        "ref": "def create_counter():\n    c = 0\n    def inc():\n        nonlocal c\n        c += 1\n        return c\n    return inc\nctr = create_counter()\nctr()\ncount2 = ctr()\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "count2"
            ]
        }
    },
    {
        "id": 11,
        "prompt": "<strong>[Functions, Parameters, Variable Scope & Lambdas] Pure Discount Applicator</strong><br/>Write apply_discount(price, pct) returning price * (1 - pct/100). Call with 80.0, 20 and store in final_price.",
        "starterCode": "# Write your code here\n",
        "ref": "def apply_discount(price, pct):\n    return price * (1 - pct / 100)\nfinal_price = apply_discount(80.0, 20)\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "final_price"
            ]
        }
    },
    {
        "id": 12,
        "prompt": "<strong>[Functions, Parameters, Variable Scope & Lambdas] String Formatter Function</strong><br/>Write format_currency(amount) returning f'${amount:,.2f}'. Call with 1234567.89 and store in formatted.",
        "starterCode": "# Write your code here\n",
        "ref": "def format_currency(amount):\n    return f'${amount:,.2f}'\nformatted = format_currency(1234567.89)\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "formatted"
            ]
        }
    },
    {
        "id": 13,
        "prompt": "<strong>[Functions, Parameters, Variable Scope & Lambdas] Safe Dictionary Key Extractor</strong><br/>Write safe_get(d, key, default=None) returning d.get(key, default). Call with {'status': 200}, 'status' and store in s.",
        "starterCode": "# Write your code here\n",
        "ref": "def safe_get(d, key, default=None):\n    return d.get(key, default)\ns = safe_get({'status': 200}, 'status')\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "s"
            ]
        }
    },
    {
        "id": 14,
        "prompt": "<strong>[Functions, Parameters, Variable Scope & Lambdas] Higher-Order Map Function</strong><br/>Given nums = [1, 2, 3, 4], use map() with lambda x: x * 10 to create mapped_list.",
        "starterCode": "# Write your code here\n",
        "ref": "nums = [1, 2, 3, 4]\nmapped_list = list(map(lambda x: x * 10, nums))\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "mapped_list"
            ]
        }
    },
    {
        "id": 15,
        "prompt": "<strong>[Functions, Parameters, Variable Scope & Lambdas] Higher-Order Filter Function</strong><br/>Given nums = [12, 5, 18, 7, 24], use filter() with lambda x: x >= 10 to create filtered_list.",
        "starterCode": "# Write your code here\n",
        "ref": "nums = [12, 5, 18, 7, 24]\nfiltered_list = list(filter(lambda x: x >= 10, nums))\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "filtered_list"
            ]
        }
    },
    {
        "id": 16,
        "prompt": "<strong>[Functions, Parameters, Variable Scope & Lambdas] Recursive Factorial Function</strong><br/>Write rec_fact(n) returning 1 if n <= 1 else n * rec_fact(n - 1). Call with 4 and store in f4.",
        "starterCode": "# Write your code here\n",
        "ref": "def rec_fact(n):\n    return 1 if n <= 1 else n * rec_fact(n - 1)\nf4 = rec_fact(4)\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "f4"
            ]
        }
    },
    {
        "id": 17,
        "prompt": "<strong>[Functions, Parameters, Variable Scope & Lambdas] Email Validator Function</strong><br/>Write is_valid_email(email) returning True if '@' in email and email.endswith('.com'), else False. Call with 'test@example.com' into valid.",
        "starterCode": "# Write your code here\n",
        "ref": "def is_valid_email(email):\n    return '@' in email and email.endswith('.com')\nvalid = is_valid_email('test@example.com')\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "valid"
            ]
        }
    },
    {
        "id": 18,
        "prompt": "<strong>[Functions, Parameters, Variable Scope & Lambdas] Arbitrary Keyword Aggregator</strong><br/>Write count_kwargs(**kwargs) returning len(kwargs). Call with a=1, b=2, c=3 and store in kw_count.",
        "starterCode": "# Write your code here\n",
        "ref": "def count_kwargs(**kwargs):\n    return len(kwargs)\nkw_count = count_kwargs(a=1, b=2, c=3)\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "kw_count"
            ]
        }
    },
    {
        "id": 19,
        "prompt": "<strong>[Functions, Parameters, Variable Scope & Lambdas] Type-Hinted Hypotenuse Calculator</strong><br/>Write hypotenuse(a: float, b: float) -> float returning (a**2 + b**2)**0.5. Call with 3.0, 4.0 and store in hyp.",
        "starterCode": "# Write your code here\n",
        "ref": "def hypotenuse(a: float, b: float) -> float:\n    return (a**2 + b**2)**0.5\nhyp = hypotenuse(3.0, 4.0)\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "hyp"
            ]
        }
    },
    {
        "id": 20,
        "prompt": "<strong>[Functions, Parameters, Variable Scope & Lambdas] Batch Processing Callable</strong><br/>Write process_batch(items, fn) returning [fn(x) for x in items]. Call with [1, 2, 3] and lambda x: x + 5 into batch_res.",
        "starterCode": "# Write your code here\n",
        "ref": "def process_batch(items, fn):\n    return [fn(x) for x in items]\nbatch_res = process_batch([1, 2, 3], lambda x: x + 5)\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "batch_res"
            ]
        }
    }
],
  "testQuestions": [
    {
        "id": 1,
        "title": "TQ-01: Functions, Parameters, Variable Scope & Lambdas Mastery #1",
        "prompt": "Solve practical interview test challenge #1 on Functions, Parameters, Variable Scope & Lambdas.",
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
        "title": "TQ-02: Functions, Parameters, Variable Scope & Lambdas Mastery #2",
        "prompt": "Solve practical interview test challenge #2 on Functions, Parameters, Variable Scope & Lambdas.",
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
        "title": "TQ-03: Functions, Parameters, Variable Scope & Lambdas Mastery #3",
        "prompt": "Solve practical interview test challenge #3 on Functions, Parameters, Variable Scope & Lambdas.",
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
        "title": "TQ-04: Functions, Parameters, Variable Scope & Lambdas Mastery #4",
        "prompt": "Solve practical interview test challenge #4 on Functions, Parameters, Variable Scope & Lambdas.",
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
        "title": "TQ-05: Functions, Parameters, Variable Scope & Lambdas Mastery #5",
        "prompt": "Solve practical interview test challenge #5 on Functions, Parameters, Variable Scope & Lambdas.",
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
        "title": "TQ-06: Functions, Parameters, Variable Scope & Lambdas Mastery #6",
        "prompt": "Solve practical interview test challenge #6 on Functions, Parameters, Variable Scope & Lambdas.",
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
        "title": "TQ-07: Functions, Parameters, Variable Scope & Lambdas Mastery #7",
        "prompt": "Solve practical interview test challenge #7 on Functions, Parameters, Variable Scope & Lambdas.",
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
        "title": "TQ-08: Functions, Parameters, Variable Scope & Lambdas Mastery #8",
        "prompt": "Solve practical interview test challenge #8 on Functions, Parameters, Variable Scope & Lambdas.",
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
        "title": "TQ-09: Functions, Parameters, Variable Scope & Lambdas Mastery #9",
        "prompt": "Solve practical interview test challenge #9 on Functions, Parameters, Variable Scope & Lambdas.",
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
        "title": "TQ-10: Functions, Parameters, Variable Scope & Lambdas Mastery #10",
        "prompt": "Solve practical interview test challenge #10 on Functions, Parameters, Variable Scope & Lambdas.",
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
        "title": "TQ-11: Functions, Parameters, Variable Scope & Lambdas Mastery #11",
        "prompt": "Solve practical interview test challenge #11 on Functions, Parameters, Variable Scope & Lambdas.",
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
        "title": "TQ-12: Functions, Parameters, Variable Scope & Lambdas Mastery #12",
        "prompt": "Solve practical interview test challenge #12 on Functions, Parameters, Variable Scope & Lambdas.",
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
        "title": "TQ-13: Functions, Parameters, Variable Scope & Lambdas Mastery #13",
        "prompt": "Solve practical interview test challenge #13 on Functions, Parameters, Variable Scope & Lambdas.",
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
        "title": "TQ-14: Functions, Parameters, Variable Scope & Lambdas Mastery #14",
        "prompt": "Solve practical interview test challenge #14 on Functions, Parameters, Variable Scope & Lambdas.",
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
        "title": "TQ-15: Functions, Parameters, Variable Scope & Lambdas Mastery #15",
        "prompt": "Solve practical interview test challenge #15 on Functions, Parameters, Variable Scope & Lambdas.",
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
        "title": "TQ-16: Functions, Parameters, Variable Scope & Lambdas Mastery #16",
        "prompt": "Solve practical interview test challenge #16 on Functions, Parameters, Variable Scope & Lambdas.",
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
        "title": "TQ-17: Functions, Parameters, Variable Scope & Lambdas Mastery #17",
        "prompt": "Solve practical interview test challenge #17 on Functions, Parameters, Variable Scope & Lambdas.",
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
        "title": "TQ-18: Functions, Parameters, Variable Scope & Lambdas Mastery #18",
        "prompt": "Solve practical interview test challenge #18 on Functions, Parameters, Variable Scope & Lambdas.",
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
        "title": "TQ-19: Functions, Parameters, Variable Scope & Lambdas Mastery #19",
        "prompt": "Solve practical interview test challenge #19 on Functions, Parameters, Variable Scope & Lambdas.",
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
        "title": "TQ-20: Functions, Parameters, Variable Scope & Lambdas Mastery #20",
        "prompt": "Solve practical interview test challenge #20 on Functions, Parameters, Variable Scope & Lambdas.",
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
        "title": "TQ-21: Functions, Parameters, Variable Scope & Lambdas Mastery #21",
        "prompt": "Solve practical interview test challenge #21 on Functions, Parameters, Variable Scope & Lambdas.",
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
        "title": "TQ-22: Functions, Parameters, Variable Scope & Lambdas Mastery #22",
        "prompt": "Solve practical interview test challenge #22 on Functions, Parameters, Variable Scope & Lambdas.",
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
        "title": "TQ-23: Functions, Parameters, Variable Scope & Lambdas Mastery #23",
        "prompt": "Solve practical interview test challenge #23 on Functions, Parameters, Variable Scope & Lambdas.",
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
        "title": "TQ-24: Functions, Parameters, Variable Scope & Lambdas Mastery #24",
        "prompt": "Solve practical interview test challenge #24 on Functions, Parameters, Variable Scope & Lambdas.",
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
        "title": "TQ-25: Functions, Parameters, Variable Scope & Lambdas Mastery #25",
        "prompt": "Solve practical interview test challenge #25 on Functions, Parameters, Variable Scope & Lambdas.",
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
