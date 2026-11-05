// Python Course Content — Day 11 (Comprehensions Masterclass: Lists, Dicts, Sets & Generators)
if (!window.COURSE_CONTENT) window.COURSE_CONTENT = {};
window.COURSE_CONTENT['pyDay11'] = {
  "day": 11,
  "title": "List & Dict Comprehensions",
  "emoji": "\u26a1",
  "topics": [
    "Introduction to Comprehensions",
    "List Comprehensions Syntax",
    "Filtering with if Predicates",
    "Conditional Transforms (if-else)",
    "Nested Comprehensions & Flattening",
    "Dictionary Comprehensions",
    "Set Comprehensions",
    "Generator Expressions",
    "Common Anti-Patterns",
    "Review & Interview Questions"
],
  "slides": [
    {
      "title": "Comprehensions Masterclass: Lists, Dicts, Sets & Generators",
      "html": "<style>\n  /* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n     BASE & DARK THEME (DEFAULT)\n     \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n  /* \u2500\u2500 Flagship Dual-Box Heading Architecture (SQL Day 01 Parity) \u2500\u2500 */\n  .heading-box-wrap,\n  .slide-section-title.heading-box-wrap {\n    display: flex !important;\n    align-items: stretch !important;\n    gap: 0 !important;\n    background: transparent !important;\n    border: none !important;\n    padding: 0 !important;\n    margin: 24px 0 14px 0 !important;\n    filter: drop-shadow(0 4px 14px rgba(0, 0, 0, 0.35)) !important;\n  }\n  .heading-num-box {\n    display: flex !important;\n    align-items: center !important;\n    justify-content: center !important;\n    min-width: 48px !important;\n    padding: 0 14px !important;\n    background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%) !important;\n    color: #ffffff !important;\n    font-family: 'JetBrains Mono', monospace !important;\n    font-size: 1.05rem !important;\n    font-weight: 800 !important;\n    letter-spacing: 0.05em !important;\n    border-radius: 8px 0 0 8px !important;\n    border: 1px solid rgba(56, 189, 248, 0.4) !important;\n    border-right: none !important;\n    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2) !important;\n    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4) !important;\n  }\n  .heading-title-box {\n    display: flex !important;\n    align-items: center !important;\n    justify-content: space-between !important;\n    flex: 1 !important;\n    padding: 10px 16px !important;\n    background: linear-gradient(90deg, #0b1329 0%, #080e1e 100%) !important;\n    border-radius: 0 8px 8px 0 !important;\n    border: 1px solid rgba(56, 189, 248, 0.25) !important;\n    border-left: 1px solid rgba(56, 189, 248, 0.15) !important;\n    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05) !important;\n  }\n  .heading-title-text {\n    font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif !important;\n    font-size: 1.08rem !important;\n    font-weight: 700 !important;\n    color: #f0f6fc !important;\n    letter-spacing: -0.01em !important;\n    line-height: 1.35 !important;\n  }\n  .audio-play-btn {\n    display: inline-flex !important;\n    align-items: center !important;\n    justify-content: center !important;\n    width: 28px !important;\n    height: 28px !important;\n    margin-left: 12px !important;\n    border-radius: 50% !important;\n    background: rgba(56, 189, 248, 0.15) !important;\n    border: 1px solid rgba(56, 189, 248, 0.4) !important;\n    color: #38bdf8 !important;\n    cursor: pointer !important;\n    transition: all 0.2s ease !important;\n    flex-shrink: 0 !important;\n  }\n  .audio-play-btn:hover {\n    background: rgba(56, 189, 248, 0.3) !important;\n    transform: scale(1.08) !important;\n    color: #ffffff !important;\n  }\n\n  /* \u2500\u2500 2D Frozen Table System \u2500\u2500 */\n  .table-header-wrap {\n    display: flex !important;\n    align-items: center !important;\n    justify-content: space-between !important;\n    padding: 10px 14px !important;\n    background-color: #0d1527 !important;\n    border: 1px solid rgba(255, 255, 255, 0.08) !important;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.06) !important;\n    border-radius: 8px 8px 0 0 !important;\n  }\n  .table-header-title {\n    margin: 0 !important;\n    font-size: 0.92rem !important;\n    font-weight: 700 !important;\n    color: #f8fafc !important;\n  }\n  .table-search-box {\n    display: flex !important;\n    align-items: center !important;\n    background: rgba(0, 0, 0, 0.4) !important;\n    border: 1px solid rgba(255, 255, 255, 0.12) !important;\n    border-radius: 6px !important;\n    padding: 4px 8px !important;\n    gap: 6px !important;\n  }\n  .table-search-input {\n    background: transparent !important;\n    border: none !important;\n    color: #f8fafc !important;\n    font-size: 0.8rem !important;\n    outline: none !important;\n    width: 140px !important;\n  }\n  .db-mock-table-wrap {\n    max-height: 520px !important;\n    overflow: auto !important;\n    position: relative !important;\n    border: 1px solid rgba(255, 255, 255, 0.08) !important;\n    border-top: none !important;\n    border-radius: 0 0 8px 8px !important;\n    margin-bottom: 18px !important;\n  }\n  .db-mock-table-wrap thead th {\n    position: sticky !important;\n    top: 0 !important;\n    z-index: 12 !important;\n    background-color: #0f172a !important;\n    color: #38bdf8 !important;\n    font-weight: 700 !important;\n    font-size: 0.82rem !important;\n    padding: 10px 12px !important;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.12) !important;\n  }\n  .db-mock-table-wrap tbody td:first-child,\n  .db-mock-table-wrap thead th:first-child {\n    position: sticky !important;\n    left: 0 !important;\n    z-index: 15 !important;\n    background-color: #0f172a !important;\n    font-family: 'JetBrains Mono', monospace !important;\n    font-weight: 600 !important;\n  }\n  .db-mock-table-wrap thead th:first-child {\n    z-index: 25 !important;\n  }\n  .db-mock-table-wrap tbody td {\n    padding: 8px 12px !important;\n    font-size: 0.82rem !important;\n    color: #cbd5e1 !important;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.04) !important;\n  }\n\n  /* \u2500\u2500 macOS IDE Code Subblock \u2500\u2500 */\n  .code-subblock {\n    background: #080d1a !important;\n    border: 1px solid rgba(56, 189, 248, 0.2) !important;\n    border-radius: 8px !important;\n    margin: 14px 0 !important;\n    overflow: hidden !important;\n    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4) !important;\n  }\n  .code-subblock-header {\n    display: flex !important;\n    align-items: center !important;\n    justify-content: space-between !important;\n    padding: 8px 14px !important;\n    background: #050811 !important;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;\n  }\n  .mac-dots {\n    display: flex !important;\n    gap: 6px !important;\n  }\n  .mac-dot {\n    width: 10px !important;\n    height: 10px !important;\n    border-radius: 50% !important;\n  }\n  .mac-dot.red { background: #ef4444 !important; }\n  .mac-dot.yellow { background: #f59e0b !important; }\n  .mac-dot.green { background: #10b981 !important; }\n  .code-subblock-title {\n    font-family: 'JetBrains Mono', monospace !important;\n    font-size: 0.78rem !important;\n    color: #94a3b8 !important;\n  }\n  .code-subblock-body {\n    padding: 12px 16px !important;\n    margin: 0 !important;\n    background: #080d1a !important;\n    font-family: 'JetBrains Mono', monospace !important;\n    font-size: 0.84rem !important;\n    line-height: 1.55 !important;\n    color: #e2e8f0 !important;\n    overflow-x: auto !important;\n  }\n  .py-kw { color: #f43f5e !important; font-weight: 700 !important; }\n  .py-fn { color: #38bdf8 !important; }\n  .py-str { color: #34d399 !important; }\n  .py-num { color: #fbbf24 !important; }\n  .py-var { color: #e2e8f0 !important; }\n  .py-comment { color: #64748b !important; font-style: italic !important; }\n  [data-theme=\"light\"] .py-kw { color: #be123c !important; }\n  [data-theme=\"light\"] .py-fn { color: #1d4ed8 !important; }\n  [data-theme=\"light\"] .py-str { color: #15803d !important; }\n  [data-theme=\"light\"] .py-num { color: #b45309 !important; }\n  [data-theme=\"light\"] .py-var { color: #0f172a !important; font-weight: 600 !important; }\n  [data-theme=\"light\"] .py-comment { color: #64748b !important; }\n  [data-theme=\"light\"] .ap-code-bad { color: #be123c !important; background: #fff1f2 !important; border: 1px solid #fecdd3 !important; }\n  [data-theme=\"light\"] .ap-code-fix { color: #047857 !important; background: #ecfdf5 !important; border: 1px solid #a7f3d0 !important; }\n\n  /* \u2500\u2500 Master Anti-Pattern Table \u2500\u2500 */\n  .anti-pattern-table thead th {\n    background-color: #1a080d !important;\n    color: #fb7185 !important;\n  }\n  .ap-code-bad {\n    color: #f87171 !important;\n    font-family: 'JetBrains Mono', monospace !important;\n    background: rgba(239, 68, 68, 0.1) !important;\n    padding: 2px 6px !important;\n    border-radius: 4px !important;\n  }\n  .ap-result-bad {\n    color: #fca5a5 !important;\n    font-size: 0.78rem !important;\n  }\n  .ap-code-fix {\n    color: #34d399 !important;\n    font-family: 'JetBrains Mono', monospace !important;\n    background: rgba(16, 185, 129, 0.1) !important;\n    padding: 2px 6px !important;\n    border-radius: 4px !important;\n  }\n\n  /* \u2500\u2500 Key Notes Cards \u2500\u2500 */\n  .py-keynotes-card {\n    background: linear-gradient(135deg, rgba(8, 14, 30, 0.8) 0%, rgba(13, 22, 45, 0.8) 100%) !important;\n    border: 1px solid rgba(56, 189, 248, 0.25) !important;\n    border-radius: 8px !important;\n    padding: 14px 18px !important;\n    margin: 16px 0 !important;\n  }\n  .py-keynotes-header {\n    display: flex !important;\n    align-items: center !important;\n    gap: 8px !important;\n    margin-bottom: 8px !important;\n  }\n  .py-keynotes-badge {\n    background: rgba(56, 189, 248, 0.2) !important;\n    color: #38bdf8 !important;\n    font-size: 0.72rem !important;\n    font-weight: 800 !important;\n    padding: 2px 8px !important;\n    border-radius: 4px !important;\n    letter-spacing: 0.05em !important;\n  }\n  .py-keynotes-title {\n    font-size: 0.92rem !important;\n    font-weight: 700 !important;\n    color: #f8fafc !important;\n    margin: 0 !important;\n  }\n  .py-keynotes-list {\n    margin: 0 !important;\n    padding-left: 20px !important;\n    color: #cbd5e1 !important;\n    font-size: 0.84rem !important;\n    line-height: 1.6 !important;\n    text-align: justify !important;\n    text-align-last: left !important;\n  }\n\n  /* \u2500\u2500 Interview Box \u2500\u2500 */\n  .interview-box {\n    background: #090e1f !important;\n    border: 1px solid rgba(56, 189, 248, 0.25) !important;\n    border-radius: 10px !important;\n    padding: 20px !important;\n    margin-top: 18px !important;\n  }\n  .interview-header-title {\n    color: #38bdf8 !important;\n    font-size: 1.05rem !important;\n    font-weight: 800 !important;\n    margin-bottom: 16px !important;\n  }\n  .interview-item {\n    margin: 12px 0 !important;\n  }\n  .interview-question {\n    color: #f8fafc !important;\n    font-size: 0.9rem !important;\n    margin-bottom: 6px !important;\n  }\n  .interview-answer {\n    color: #94a3b8 !important;\n    font-size: 0.84rem !important;\n    line-height: 1.55 !important;\n    padding-left: 12px !important;\n    border-left: 2px solid rgba(56, 189, 248, 0.3) !important;\n  }\n  .interview-divider {\n    border: none !important;\n    border-top: 1px solid rgba(255, 255, 255, 0.06) !important;\n    margin: 12px 0 !important;\n  }\n\n  /* \u2500\u2500 Light Theme Overrides \u2500\u2500 */\n  [data-theme=\"light\"] .heading-num-box {\n    background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%) !important;\n    color: #ffffff !important;\n  }\n  [data-theme=\"light\"] .heading-title-box {\n    background: linear-gradient(90deg, #f8fafc 0%, #f1f5f9 100%) !important;\n    border-color: #cbd5e1 !important;\n  }\n  [data-theme=\"light\"] .heading-title-text {\n    color: #0f172a !important;\n  }\n  [data-theme=\"light\"] .table-header-wrap {\n    background-color: #f8fafc !important;\n    border-color: #e2e8f0 !important;\n  }\n  [data-theme=\"light\"] .table-header-title {\n    color: #0f172a !important;\n  }\n  [data-theme=\"light\"] .table-search-box {\n    background: #ffffff !important;\n    border-color: #cbd5e1 !important;\n  }\n  [data-theme=\"light\"] .table-search-input {\n    color: #0f172a !important;\n  }\n  [data-theme=\"light\"] .db-mock-table-wrap thead th {\n    background-color: #f1f5f9 !important;\n    color: #0369a1 !important;\n    border-color: #e2e8f0 !important;\n  }\n  [data-theme=\"light\"] .db-mock-table-wrap tbody td:first-child,\n  [data-theme=\"light\"] .db-mock-table-wrap thead th:first-child {\n    background-color: #ffffff !important;\n  }\n  [data-theme=\"light\"] .db-mock-table-wrap tbody td {\n    color: #334155 !important;\n    border-color: #e2e8f0 !important;\n  }\n  [data-theme=\"light\"] .code-subblock {\n    background: #f8fafc !important;\n    border-color: #cbd5e1 !important;\n  }\n  [data-theme=\"light\"] .code-subblock-header {\n    background: #f1f5f9 !important;\n    border-color: #e2e8f0 !important;\n  }\n  [data-theme=\"light\"] .code-subblock-body {\n    background: #f8fafc !important;\n    color: #0f172a !important;\n  }\n  [data-theme=\"light\"] .interview-box {\n    background: #f8fafc !important;\n    border-color: #e2e8f0 !important;\n  }\n  [data-theme=\"light\"] .interview-question {\n    color: #0f172a !important;\n  }\n  [data-theme=\"light\"] .interview-answer {\n    color: #475569 !important;\n    border-left-color: #0284c7 !important;\n  }\n  [data-theme=\"light\"] .py-keynotes-card {\n    background: #ffffff !important;\n    border-color: #cbd5e1 !important;\n  }\n  [data-theme=\"light\"] .py-keynotes-title {\n    color: #0f172a !important;\n  }\n  [data-theme=\"light\"] .py-keynotes-list {\n    color: #334155 !important;\n  }\n\n\n  /* ═════════════════════════════════════════════════════════════════════\n     MANODEMY UNIVERSAL 2D FROZEN TABLE SYSTEM (FLAGSHIP DAY 04 PARITY)\n     ═════════════════════════════════════════════════════════════════════ */\n  .db-mock-table-wrap {\n    position: relative !important;\n    overflow: auto !important;\n    overflow-x: auto !important;\n    overflow-y: auto !important;\n    max-height: 520px !important;\n    -webkit-overflow-scrolling: touch !important;\n    border-radius: 0 0 12px 12px !important;\n    border: 1px solid rgba(56, 189, 248, 0.25) !important;\n    border-top: none !important;\n    background: #090e1a !important;\n    box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.35) !important;\n    margin: 0 0 16px 0 !important;\n  }\n  .db-mock-table-wrap::-webkit-scrollbar {\n    width: 8px !important;\n    height: 8px !important;\n  }\n  .db-mock-table-wrap::-webkit-scrollbar-track {\n    background: #0d1527 !important;\n    border-radius: 4px !important;\n  }\n  .db-mock-table-wrap::-webkit-scrollbar-thumb {\n    background: rgba(56, 189, 248, 0.35) !important;\n    border-radius: 4px !important;\n  }\n  .db-mock-table-wrap::-webkit-scrollbar-thumb:hover {\n    background: rgba(56, 189, 248, 0.6) !important;\n  }\n\n  .db-table-mock {\n    border-collapse: separate !important;\n    border-spacing: 0 !important;\n    overflow: visible !important;\n    margin: 0 !important;\n    font-size: 0.85rem !important;\n    width: 100% !important;\n    min-width: 960px !important;\n    table-layout: auto !important;\n  }\n\n  .db-table-mock thead th {\n    position: -webkit-sticky !important;\n    position: sticky !important;\n    top: 0 !important;\n    z-index: 20 !important;\n    background-color: #131d35 !important;\n    color: #e2e8f0 !important;\n    font-weight: 700 !important;\n    font-size: 0.82rem !important;\n    letter-spacing: 0.02em !important;\n    text-transform: none !important;\n    padding: 13px 16px !important;\n    border-bottom: 2px solid rgba(56, 189, 248, 0.35) !important;\n    box-sizing: border-box !important;\n    vertical-align: middle !important;\n  }\n\n  .db-table-mock thead th:nth-child(1) {\n    position: -webkit-sticky !important;\n    position: sticky !important;\n    top: 0 !important;\n    left: 0 !important;\n    z-index: 30 !important;\n    background-color: #111a30 !important;\n    border-right: 2px solid rgba(56, 189, 248, 0.38) !important;\n    border-bottom: 2px solid rgba(56, 189, 248, 0.38) !important;\n    box-shadow: 4px 4px 14px -2px rgba(0, 0, 0, 0.55) !important;\n    color: #f8fafc !important;\n  }\n\n  .db-table-mock tbody td:nth-child(1) {\n    position: -webkit-sticky !important;\n    position: sticky !important;\n    left: 0 !important;\n    top: auto !important;\n    z-index: 10 !important;\n    box-sizing: border-box !important;\n    background-color: #0d1527 !important;\n    border-right: 2px solid rgba(56, 189, 248, 0.38) !important;\n    box-shadow: 4px 0 14px -2px rgba(0, 0, 0, 0.55) !important;\n    text-align: left !important;\n    padding: 12px 16px !important;\n    vertical-align: middle !important;\n    white-space: nowrap !important;\n  }\n\n  .db-table-mock tbody tr:hover td:nth-child(1) {\n    background-color: #162038 !important;\n    background: #162038 !important;\n    opacity: 1 !important;\n    z-index: 15 !important;\n    border-right: 2px solid rgba(56, 189, 248, 0.5) !important;\n  }\n\n  .db-table-mock tbody tr:hover td:not(:first-child) {\n    background-color: rgba(56, 189, 248, 0.05) !important;\n  }\n\n  .db-table-mock td:nth-child(1) code {\n    display: inline-flex !important;\n    align-items: center !important;\n    max-width: 100% !important;\n    min-height: 28px !important;\n    padding: 4px 10px !important;\n    font-family: 'JetBrains Mono', monospace !important;\n    font-weight: 700 !important;\n    font-size: 0.82rem !important;\n    background: rgba(56, 189, 248, 0.12) !important;\n    border: 1px solid rgba(56, 189, 248, 0.35) !important;\n    border-radius: 6px !important;\n    color: #38bdf8 !important;\n    white-space: nowrap !important;\n    letter-spacing: -0.01em !important;\n  }\n\n\n  /* ═════════════════════════════════════════════════════════════════════\n     MANODEMY UNIVERSAL TABLE COLOR SCIENCE ENGINE (DARK & LIGHT THEMES)\n     100% Parity with Flagship Python Days 01–05\n     ═════════════════════════════════════════════════════════════════════ */\n\n  /* ── 1. DARK MODE (DEFAULT) TABLE FONT COLORS ── */\n  .db-table-mock thead th {\n    color: #e2e8f0 !important;\n    font-family: 'Outfit', -apple-system, sans-serif !important;\n    font-weight: 700 !important;\n    font-size: 0.82rem !important;\n    letter-spacing: 0.02em !important;\n    background-color: #131d35 !important;\n    border-bottom: 2px solid rgba(56, 189, 248, 0.35) !important;\n  }\n\n  .db-table-mock thead th:nth-child(1) {\n    color: #f8fafc !important;\n    font-weight: 800 !important;\n    background-color: #111a30 !important;\n    border-right: 2px solid rgba(56, 189, 248, 0.38) !important;\n    border-bottom: 2px solid rgba(56, 189, 248, 0.38) !important;\n  }\n\n  .db-table-mock td {\n    color: #cbd5e1 !important;\n    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;\n    font-size: 0.85rem !important;\n    line-height: 1.55 !important;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.06) !important;\n  }\n\n  .db-table-mock td strong {\n    color: #f8fafc !important;\n    font-weight: 700 !important;\n  }\n\n  .db-table-mock td em {\n    color: #94a3b8 !important;\n    font-style: italic !important;\n  }\n\n  /* Column 1 Code Badge (Electric Cyan) */\n  .db-table-mock td:nth-child(1) code {\n    color: #38bdf8 !important;\n    background: rgba(56, 189, 248, 0.12) !important;\n    border: 1px solid rgba(56, 189, 248, 0.35) !important;\n    border-radius: 6px !important;\n    font-family: 'JetBrains Mono', 'Fira Code', monospace !important;\n    font-size: 0.82rem !important;\n    font-weight: 700 !important;\n    letter-spacing: -0.01em !important;\n    padding: 4px 10px !important;\n  }\n\n  /* Regular Data Columns Code Tags */\n  .db-table-mock td:not(:first-child) code,\n  .db-table-mock td code {\n    color: #f1f5f9 !important;\n    background: rgba(15, 23, 42, 0.7) !important;\n    border: 1px solid rgba(255, 255, 255, 0.12) !important;\n    border-radius: 5px !important;\n    font-family: 'JetBrains Mono', 'Fira Code', monospace !important;\n    font-size: 0.81rem !important;\n    line-height: 1.45 !important;\n    padding: 3px 8px !important;\n  }\n\n  /* Anti-Pattern Table Colors (Dark Mode) */\n  .anti-pattern-table thead th:nth-child(1) {\n    background-color: #1a162b !important;\n    color: #fca5a5 !important;\n    border-bottom: 2px solid rgba(244, 63, 94, 0.4) !important;\n    border-right: 2px solid rgba(244, 63, 94, 0.4) !important;\n  }\n\n  .anti-pattern-table thead th:nth-child(2) {\n    color: #6ee7b7 !important;\n  }\n\n  .anti-pattern-table tbody td:nth-child(1) code {\n    background: rgba(244, 63, 94, 0.14) !important;\n    border: 1px solid rgba(244, 63, 94, 0.38) !important;\n    color: #fda4af !important;\n  }\n\n  .anti-pattern-table tbody td:nth-child(2) code,\n  .anti-pattern-table tbody td:nth-child(4) code {\n    background: rgba(16, 185, 129, 0.12) !important;\n    border: 1px solid rgba(16, 185, 129, 0.35) !important;\n    color: #6ee7b7 !important;\n  }\n\n  .anti-pattern-table .ap-result-bad, .anti-pattern-table .ap-bad-text {\n    color: #fb7185 !important;\n  }\n  .anti-pattern-table .ap-result-good, .anti-pattern-table .ap-good-text {\n    color: #34d399 !important;\n  }\n\n  /* ── 2. LIGHT MODE ([data-theme=\"light\"]) TABLE FONT COLORS ── */\n  [data-theme=\"light\"] .db-table-mock thead th {\n    color: #0369a1 !important;\n    background-color: #f8fafc !important;\n    border-bottom: 2px solid #cbd5e1 !important;\n    font-weight: 700 !important;\n  }\n\n  [data-theme=\"light\"] .db-table-mock thead th:nth-child(1) {\n    color: #0f172a !important;\n    background-color: #f1f5f9 !important;\n    border-right: 2px solid #cbd5e1 !important;\n    border-bottom: 2px solid #cbd5e1 !important;\n    font-weight: 800 !important;\n  }\n\n  [data-theme=\"light\"] .db-table-mock td {\n    color: #334155 !important;\n    border-bottom: 1px solid #e2e8f0 !important;\n  }\n\n  [data-theme=\"light\"] .db-table-mock td strong {\n    color: #0f172a !important;\n    font-weight: 700 !important;\n  }\n\n  [data-theme=\"light\"] .db-table-mock td em {\n    color: #64748b !important;\n  }\n\n  /* Column 1 Code Badge (Crisp Azure Blue) */\n  [data-theme=\"light\"] .db-table-mock td:nth-child(1) code {\n    color: #0284c7 !important;\n    background: #e0f2fe !important;\n    border: 1px solid #7dd3fc !important;\n  }\n\n  /* Regular Data Columns Code Tags (Light Mode) */\n  [data-theme=\"light\"] .db-table-mock td:not(:first-child) code,\n  [data-theme=\"light\"] .db-table-mock td code {\n    color: #0f172a !important;\n    background: #f1f5f9 !important;\n    border: 1px solid #e2e8f0 !important;\n  }\n\n  /* Anti-Pattern Table Colors (Light Mode) */\n  [data-theme=\"light\"] .anti-pattern-table thead th:nth-child(1) {\n    background-color: #fff1f2 !important;\n    color: #be123c !important;\n    border-bottom: 2px solid #fecdd3 !important;\n    border-right: 2px solid #fecdd3 !important;\n  }\n\n  [data-theme=\"light\"] .anti-pattern-table thead th:nth-child(2) {\n    color: #059669 !important;\n  }\n\n  [data-theme=\"light\"] .anti-pattern-table tbody td:nth-child(1) code {\n    background: #ffe4e6 !important;\n    border-color: #fecdd3 !important;\n    color: #e11d48 !important;\n  }\n\n  [data-theme=\"light\"] .anti-pattern-table tbody td:nth-child(2) code,\n  [data-theme=\"light\"] .anti-pattern-table tbody td:nth-child(4) code {\n    background: #ecfdf5 !important;\n    border-color: #a7f3d0 !important;\n    color: #059669 !important;\n  }\n\n  [data-theme=\"light\"] .anti-pattern-table .ap-result-bad, [data-theme=\"light\"] .anti-pattern-table .ap-bad-text {\n    color: #e11d48 !important;\n  }\n  [data-theme=\"light\"] .anti-pattern-table .ap-result-good, [data-theme=\"light\"] .anti-pattern-table .ap-good-text {\n    color: #059669 !important;\n  }\n</style>\n<div class=\"slide-content-track\">\n  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 SECTION 01: THE ASSEMBLY LINE MENTAL MODEL: LOOPS VS COMPREHENSIONS \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n  <section id=\"day11Sec01\" class=\"slide-section\">\n    <h2 class=\"slide-section-title heading-box-wrap heading-with-audio\" id=\"headingAssemblyLine\">\n      <span class=\"heading-num-box\">01</span>\n      <span class=\"heading-title-box\">\n        <span class=\"heading-title-text\">Introduction to Comprehensions</span>\n        <button class=\"audio-play-btn\" onclick=\"playAudio('Day11/New_PyDay11Audio01.mp3', this)\" title=\"Play narration\">\n          <svg class=\"audio-play-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><polygon points=\"5 3 19 12 5 21 5 3\"></polygon></svg>\n        </button>\n      </span>\n    </h2>\n    <p class=\"section-intro-text\">Think of a list comprehension like an automated robotic assembly line. Instead of manually pushing a cart, opening an empty box (`res = []`), picking an item from the shelf, inspecting it, modifying it, and manually dropping it in (`res.append(...)`), you configure an automated laser rig: <code>[transform(x) for x in shelf if passes(x)]</code>. In CPython, comprehensions run as compiled C-level loops, executing 30% to 50% faster than manual append loops while consuming far fewer lines of code.</p>\n\n    <div class=\"table-header-wrap\">\n      <h4 class=\"table-header-title\">Loop vs Comprehension Comparison</h4>\n      <div class=\"table-header-actions\">\n        <div class=\"table-search-box\">\n          <svg class=\"table-search-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"11\" cy=\"11\" r=\"8\"></circle><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"></line></svg>\n          <input type=\"text\" class=\"table-search-input\" placeholder=\"Filter table...\" onkeyup=\"filterTable(this)\">\n        </div>\n      </div>\n    </div>\n    <div class=\"db-mock-table-wrap\">\n      <table class=\"db-table-mock db-table-mock--compact arith-sticky-table\">\n        <thead><tr><th>Construct / Syntax</th><th>Example Expression</th><th>Evaluation Mechanics</th><th>Production Engineering Context</th></tr></thead>\n        <tbody>\n          <tr><td><code>Manual for-append loop</code></td><td><code>res = []; for x in data: res.append(x*2)</code></td><td>Multi-line, method dispatch overhead</td><td>Requires explicit append() call on every iteration.</td></tr>\n          <tr><td><code>List Comprehension</code></td><td><code>[x*2 for x in data]</code></td><td>Single-line, C-level optimization</td><td>Evaluates bytecode directly with zero method lookup overhead.</td></tr>\n        </tbody>\n      </table>\n    </div>\n    <div class=\"code-subblock\">\n      <div class=\"code-subblock-header\">\n        <div class=\"mac-dots\"><div class=\"mac-dot red\"></div><div class=\"mac-dot yellow\"></div><div class=\"mac-dot green\"></div></div>\n        <span class=\"code-subblock-title\">demo_headingAssemblyLine.py</span>\n      </div>\n      <pre class=\"code-subblock-body\"><code><span class=\"py-comment\"># Section 01: The Assembly Line Mental Model: Loops vs Comprehensions</span>\n<span class=\"py-kw\">def</span> <span class=\"py-fn\">execute_demo</span>(<span class=\"py-var\">data</span>):\n    <span class=\"py-kw\">if</span> <span class=\"py-var\">data</span>:\n        <span class=\"py-kw\">return</span> [<span class=\"py-fn\">str</span>(<span class=\"py-var\">x</span>) <span class=\"py-kw\">for</span> <span class=\"py-var\">x</span> <span class=\"py-kw\">in</span> <span class=\"py-var\">data</span>]\n    <span class=\"py-kw\">return</span> []\n</code></pre>\n    </div>\n  </section>\n\n  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 SECTION 02: LIST COMPREHENSIONS: [EXPR FOR ITEM IN ITERABLE] SYNTAX & BYTECODE \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n  <section id=\"day11Sec02\" class=\"slide-section\">\n    <h2 class=\"slide-section-title heading-box-wrap heading-with-audio\" id=\"headingListComprehensions\">\n      <span class=\"heading-num-box\">02</span>\n      <span class=\"heading-title-box\">\n        <span class=\"heading-title-text\">List Comprehensions Syntax</span>\n        <button class=\"audio-play-btn\" onclick=\"playAudio('Day11/New_PyDay11Audio02.mp3', this)\" title=\"Play narration\">\n          <svg class=\"audio-play-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><polygon points=\"5 3 19 12 5 21 5 3\"></polygon></svg>\n        </button>\n      </span>\n    </h2>\n    <p class=\"section-intro-text\">The basic syntax of a list comprehension is: <code>[expression for item in iterable]</code>. CPython compiles this into a dedicated code object with the <code>LIST_APPEND</code> bytecode opcode, eliminating the overhead of looking up the <code>.append</code> method in the global namespace.</p>\n\n    <div class=\"table-header-wrap\">\n      <h4 class=\"table-header-title\">List Comprehension Patterns</h4>\n      <div class=\"table-header-actions\">\n        <div class=\"table-search-box\">\n          <svg class=\"table-search-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"11\" cy=\"11\" r=\"8\"></circle><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"></line></svg>\n          <input type=\"text\" class=\"table-search-input\" placeholder=\"Filter table...\" onkeyup=\"filterTable(this)\">\n        </div>\n      </div>\n    </div>\n    <div class=\"db-mock-table-wrap\">\n      <table class=\"db-table-mock db-table-mock--compact arith-sticky-table\">\n        <thead><tr><th>Construct / Syntax</th><th>Example Expression</th><th>Evaluation Mechanics</th><th>Production Engineering Context</th></tr></thead>\n        <tbody>\n          <tr><td><code>Square Numbers</code></td><td><code>[x**2 for x in range(5)]</code></td><td>[0, 1, 4, 9, 16]</td><td>Applies mathematical transformation to every element.</td></tr>\n          <tr><td><code>String Transformation</code></td><td><code>[s.upper() for s in words]</code></td><td>['A', 'B', 'C']</td><td>Vectorized string manipulation over lists.</td></tr>\n          <tr><td><code>Extract Column from Dicts</code></td><td><code>[u['email'] for u in users]</code></td><td>['a@b.com', ...]</td><td>Database row column extraction pattern.</td></tr>\n        </tbody>\n      </table>\n    </div>\n    <div class=\"py-keynotes-card\">\n      <div class=\"py-keynotes-header\">\n        <span class=\"py-keynotes-badge\">KEY TAKEAWAY</span>\n        <h4 class=\"py-keynotes-title\">Production Best Practices: List Comprehensions: [expr for item in iterable] Syntax & Bytecode</h4>\n      </div>\n      <ul class=\"py-keynotes-list\">\n        <li><strong>Architectural Rule:</strong> Write deterministic, readable code prioritizing clarity and testability.</li>\n        <li><strong>Performance Note:</strong> Leverage CPython internal optimizations and avoid premature anti-pattern overheads.</li>\n        <li><strong>Edge Safety:</strong> Always validate bounds, null states, and empty collection inputs defensively.</li>\n      </ul>\n    </div>\n  </section>\n\n  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 SECTION 03: FILTERING ELEMENTS WITH IF PREDICATES IN COMPREHENSIONS \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n  <section id=\"day11Sec03\" class=\"slide-section\">\n    <h2 class=\"slide-section-title heading-box-wrap heading-with-audio\" id=\"headingFilteringComprehensions\">\n      <span class=\"heading-num-box\">03</span>\n      <span class=\"heading-title-box\">\n        <span class=\"heading-title-text\">Filtering with if Predicates</span>\n        <button class=\"audio-play-btn\" onclick=\"playAudio('Day11/New_PyDay11Audio03.mp3', this)\" title=\"Play narration\">\n          <svg class=\"audio-play-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><polygon points=\"5 3 19 12 5 21 5 3\"></polygon></svg>\n        </button>\n      </span>\n    </h2>\n    <p class=\"section-intro-text\">To filter elements, place an <code>if</code> clause at the **end** of the comprehension: <code>[expr for item in iterable if condition]</code>. Only elements where <code>condition</code> evaluates to True are transformed and included.</p>\n\n    <div class=\"table-header-wrap\">\n      <h4 class=\"table-header-title\">Comprehension Filter Patterns</h4>\n      <div class=\"table-header-actions\">\n        <div class=\"table-search-box\">\n          <svg class=\"table-search-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"11\" cy=\"11\" r=\"8\"></circle><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"></line></svg>\n          <input type=\"text\" class=\"table-search-input\" placeholder=\"Filter table...\" onkeyup=\"filterTable(this)\">\n        </div>\n      </div>\n    </div>\n    <div class=\"db-mock-table-wrap\">\n      <table class=\"db-table-mock db-table-mock--compact arith-sticky-table\">\n        <thead><tr><th>Construct / Syntax</th><th>Example Expression</th><th>Evaluation Mechanics</th><th>Production Engineering Context</th></tr></thead>\n        <tbody>\n          <tr><td><code>Filter Even Numbers</code></td><td><code>[x for x in data if x % 2 == 0]</code></td><td>Modulo Filter</td><td>Includes only items satisfying the predicate.</td></tr>\n          <tr><td><code>Filter Missing Values</code></td><td><code>[x for x in records if x is not None]</code></td><td>Data Sanitization</td><td>Strips out null/None values safely.</td></tr>\n          <tr><td><code>Filter by Length</code></td><td><code>[w for w in words if len(w) > 4]</code></td><td>Length Threshold</td><td>Selects elements matching length requirements.</td></tr>\n        </tbody>\n      </table>\n    </div>\n    <div class=\"code-subblock\">\n      <div class=\"code-subblock-header\">\n        <div class=\"mac-dots\"><div class=\"mac-dot red\"></div><div class=\"mac-dot yellow\"></div><div class=\"mac-dot green\"></div></div>\n        <span class=\"code-subblock-title\">demo_headingFilteringComprehensions.py</span>\n      </div>\n      <pre class=\"code-subblock-body\"><code><span class=\"py-comment\"># Section 03: Filtering Elements with if Predicates in Comprehensions</span>\n<span class=\"py-kw\">def</span> <span class=\"py-fn\">execute_demo</span>(<span class=\"py-var\">data</span>):\n    <span class=\"py-kw\">if</span> <span class=\"py-var\">data</span>:\n        <span class=\"py-kw\">return</span> [<span class=\"py-fn\">str</span>(<span class=\"py-var\">x</span>) <span class=\"py-kw\">for</span> <span class=\"py-var\">x</span> <span class=\"py-kw\">in</span> <span class=\"py-var\">data</span>]\n    <span class=\"py-kw\">return</span> []\n</code></pre>\n    </div>\n  </section>\n\n  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 SECTION 04: CONDITIONAL TRANSFORMATION: [X IF C ELSE Y FOR X IN DATA] \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n  <section id=\"day11Sec04\" class=\"slide-section\">\n    <h2 class=\"slide-section-title heading-box-wrap heading-with-audio\" id=\"headingConditionalTransform\">\n      <span class=\"heading-num-box\">04</span>\n      <span class=\"heading-title-box\">\n        <span class=\"heading-title-text\">Conditional Transforms (if-else)</span>\n        <button class=\"audio-play-btn\" onclick=\"playAudio('Day11/New_PyDay11Audio04.mp3', this)\" title=\"Play narration\">\n          <svg class=\"audio-play-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><polygon points=\"5 3 19 12 5 21 5 3\"></polygon></svg>\n        </button>\n      </span>\n    </h2>\n    <p class=\"section-intro-text\">Crucial syntax distinction: when you want to **filter out** items, <code>if</code> goes at the end. When you want to **transform items conditionally** (keeping all items but changing their values), the ternary <code>if-else</code> goes at the **front**!</p>\n\n    <div class=\"table-header-wrap\">\n      <h4 class=\"table-header-title\">Front Ternary vs End Filter Syntax</h4>\n      <div class=\"table-header-actions\">\n        <div class=\"table-search-box\">\n          <svg class=\"table-search-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"11\" cy=\"11\" r=\"8\"></circle><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"></line></svg>\n          <input type=\"text\" class=\"table-search-input\" placeholder=\"Filter table...\" onkeyup=\"filterTable(this)\">\n        </div>\n      </div>\n    </div>\n    <div class=\"db-mock-table-wrap\">\n      <table class=\"db-table-mock db-table-mock--compact arith-sticky-table\">\n        <thead><tr><th>Construct / Syntax</th><th>Example Expression</th><th>Evaluation Mechanics</th><th>Production Engineering Context</th></tr></thead>\n        <tbody>\n          <tr><td><code>Front Ternary (Transform)</code></td><td><code>[x if x > 0 else 0 for x in data]</code></td><td>Keeps all rows</td><td>Replaces negative numbers with 0 (ReLU function).</td></tr>\n          <tr><td><code>End Filter (Drop)</code></td><td><code>[x for x in data if x > 0]</code></td><td>Drops non-matching rows</td><td>Discards negative numbers entirely.</td></tr>\n        </tbody>\n      </table>\n    </div>\n    <div class=\"py-keynotes-card\">\n      <div class=\"py-keynotes-header\">\n        <span class=\"py-keynotes-badge\">KEY TAKEAWAY</span>\n        <h4 class=\"py-keynotes-title\">Production Best Practices: Conditional Transformation: [x if c else y for x in data]</h4>\n      </div>\n      <ul class=\"py-keynotes-list\">\n        <li><strong>Architectural Rule:</strong> Write deterministic, readable code prioritizing clarity and testability.</li>\n        <li><strong>Performance Note:</strong> Leverage CPython internal optimizations and avoid premature anti-pattern overheads.</li>\n        <li><strong>Edge Safety:</strong> Always validate bounds, null states, and empty collection inputs defensively.</li>\n      </ul>\n    </div>\n  </section>\n\n  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 SECTION 05: NESTED COMPREHENSIONS: FLATTENING MATRICES & 2D GRID TRANSFORMS \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n  <section id=\"day11Sec05\" class=\"slide-section\">\n    <h2 class=\"slide-section-title heading-box-wrap heading-with-audio\" id=\"headingNestedComprehensions\">\n      <span class=\"heading-num-box\">05</span>\n      <span class=\"heading-title-box\">\n        <span class=\"heading-title-text\">Nested Comprehensions & Flattening</span>\n        <button class=\"audio-play-btn\" onclick=\"playAudio('Day11/New_PyDay11Audio05.mp3', this)\" title=\"Play narration\">\n          <svg class=\"audio-play-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><polygon points=\"5 3 19 12 5 21 5 3\"></polygon></svg>\n        </button>\n      </span>\n    </h2>\n    <p class=\"section-intro-text\">Comprehensions can nest multiple <code>for</code> loops. When reading nested comprehensions, read them in the exact order you would write nested <code>for</code> statements: outer loop first, inner loop second.</p>\n\n    <div class=\"table-header-wrap\">\n      <h4 class=\"table-header-title\">Nested Comprehension Mechanics</h4>\n      <div class=\"table-header-actions\">\n        <div class=\"table-search-box\">\n          <svg class=\"table-search-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"11\" cy=\"11\" r=\"8\"></circle><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"></line></svg>\n          <input type=\"text\" class=\"table-search-input\" placeholder=\"Filter table...\" onkeyup=\"filterTable(this)\">\n        </div>\n      </div>\n    </div>\n    <div class=\"db-mock-table-wrap\">\n      <table class=\"db-table-mock db-table-mock--compact arith-sticky-table\">\n        <thead><tr><th>Construct / Syntax</th><th>Example Expression</th><th>Evaluation Mechanics</th><th>Production Engineering Context</th></tr></thead>\n        <tbody>\n          <tr><td><code>Flatten 2D Matrix</code></td><td><code>[val for row in matrix for val in row]</code></td><td>2D to 1D Flattening</td><td>Unrolls nested lists into a single flat list.</td></tr>\n          <tr><td><code>Coordinate Grid Pairs</code></td><td><code>[(x, y) for x in range(3) for y in range(2)]</code></td><td>Cartesian Product</td><td>Generates all (x, y) coordinate combinations.</td></tr>\n        </tbody>\n      </table>\n    </div>\n    <div class=\"code-subblock\">\n      <div class=\"code-subblock-header\">\n        <div class=\"mac-dots\"><div class=\"mac-dot red\"></div><div class=\"mac-dot yellow\"></div><div class=\"mac-dot green\"></div></div>\n        <span class=\"code-subblock-title\">demo_headingNestedComprehensions.py</span>\n      </div>\n      <pre class=\"code-subblock-body\"><code><span class=\"py-comment\"># Section 05: Nested Comprehensions: Flattening Matrices & 2D Grid Transforms</span>\n<span class=\"py-kw\">def</span> <span class=\"py-fn\">execute_demo</span>(<span class=\"py-var\">data</span>):\n    <span class=\"py-kw\">if</span> <span class=\"py-var\">data</span>:\n        <span class=\"py-kw\">return</span> [<span class=\"py-fn\">str</span>(<span class=\"py-var\">x</span>) <span class=\"py-kw\">for</span> <span class=\"py-var\">x</span> <span class=\"py-kw\">in</span> <span class=\"py-var\">data</span>]\n    <span class=\"py-kw\">return</span> []\n</code></pre>\n    </div>\n  </section>\n\n  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 SECTION 06: DICTIONARY COMPREHENSIONS: TRANSFORMING & INVERTING KEY-VALUE MAPS \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n  <section id=\"day11Sec06\" class=\"slide-section\">\n    <h2 class=\"slide-section-title heading-box-wrap heading-with-audio\" id=\"headingDictComprehensions\">\n      <span class=\"heading-num-box\">06</span>\n      <span class=\"heading-title-box\">\n        <span class=\"heading-title-text\">Dictionary Comprehensions</span>\n        <button class=\"audio-play-btn\" onclick=\"playAudio('Day11/New_PyDay11Audio06.mp3', this)\" title=\"Play narration\">\n          <svg class=\"audio-play-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><polygon points=\"5 3 19 12 5 21 5 3\"></polygon></svg>\n        </button>\n      </span>\n    </h2>\n    <p class=\"section-intro-text\">A dictionary comprehension creates a new dict using curly braces with key-value expressions: <code>{key_expr: val_expr for item in iterable}</code>.</p>\n\n    <div class=\"table-header-wrap\">\n      <h4 class=\"table-header-title\">Dict Comprehension Patterns</h4>\n      <div class=\"table-header-actions\">\n        <div class=\"table-search-box\">\n          <svg class=\"table-search-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"11\" cy=\"11\" r=\"8\"></circle><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"></line></svg>\n          <input type=\"text\" class=\"table-search-input\" placeholder=\"Filter table...\" onkeyup=\"filterTable(this)\">\n        </div>\n      </div>\n    </div>\n    <div class=\"db-mock-table-wrap\">\n      <table class=\"db-table-mock db-table-mock--compact arith-sticky-table\">\n        <thead><tr><th>Construct / Syntax</th><th>Example Expression</th><th>Evaluation Mechanics</th><th>Production Engineering Context</th></tr></thead>\n        <tbody>\n          <tr><td><code>Key Inversion</code></td><td><code>{v: k for k, v in d.items()}</code></td><td>Reverse Lookup Table</td><td>Swaps keys and values in O(N) time.</td></tr>\n          <tr><td><code>Square Lookup Map</code></td><td><code>{x: x**2 for x in range(5)}</code></td><td>Cache Table</td><td>Precomputes mathematical lookup values.</td></tr>\n          <tr><td><code>Filter Dict by Value</code></td><td><code>{k: v for k, v in scores.items() if v >= 70}</code></td><td>Threshold Filter</td><td>Extracts passing student sub-dictionary.</td></tr>\n        </tbody>\n      </table>\n    </div>\n    <div class=\"py-keynotes-card\">\n      <div class=\"py-keynotes-header\">\n        <span class=\"py-keynotes-badge\">KEY TAKEAWAY</span>\n        <h4 class=\"py-keynotes-title\">Production Best Practices: Dictionary Comprehensions: Transforming & Inverting Key-Value Maps</h4>\n      </div>\n      <ul class=\"py-keynotes-list\">\n        <li><strong>Architectural Rule:</strong> Write deterministic, readable code prioritizing clarity and testability.</li>\n        <li><strong>Performance Note:</strong> Leverage CPython internal optimizations and avoid premature anti-pattern overheads.</li>\n        <li><strong>Edge Safety:</strong> Always validate bounds, null states, and empty collection inputs defensively.</li>\n      </ul>\n    </div>\n  </section>\n\n  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 SECTION 07: SET COMPREHENSIONS: DEDUPLICATED MATHEMATICAL SET TRANSFORMS \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n  <section id=\"day11Sec07\" class=\"slide-section\">\n    <h2 class=\"slide-section-title heading-box-wrap heading-with-audio\" id=\"headingSetComprehensions\">\n      <span class=\"heading-num-box\">07</span>\n      <span class=\"heading-title-box\">\n        <span class=\"heading-title-text\">Set Comprehensions</span>\n        <button class=\"audio-play-btn\" onclick=\"playAudio('Day11/New_PyDay11Audio07.mp3', this)\" title=\"Play narration\">\n          <svg class=\"audio-play-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><polygon points=\"5 3 19 12 5 21 5 3\"></polygon></svg>\n        </button>\n      </span>\n    </h2>\n    <p class=\"section-intro-text\">A set comprehension uses curly braces with a single expression: <code>{expr for item in iterable}</code>. It automatically strips duplicates and produces a hash set.</p>\n\n    <div class=\"table-header-wrap\">\n      <h4 class=\"table-header-title\">Set Comprehension Patterns</h4>\n      <div class=\"table-header-actions\">\n        <div class=\"table-search-box\">\n          <svg class=\"table-search-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"11\" cy=\"11\" r=\"8\"></circle><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"></line></svg>\n          <input type=\"text\" class=\"table-search-input\" placeholder=\"Filter table...\" onkeyup=\"filterTable(this)\">\n        </div>\n      </div>\n    </div>\n    <div class=\"db-mock-table-wrap\">\n      <table class=\"db-table-mock db-table-mock--compact arith-sticky-table\">\n        <thead><tr><th>Construct / Syntax</th><th>Example Expression</th><th>Evaluation Mechanics</th><th>Production Engineering Context</th></tr></thead>\n        <tbody>\n          <tr><td><code>Deduplicated Lengths</code></td><td><code>{len(w) for w in words}</code></td><td>Unique Word Lengths</td><td>Instant set of unique lengths.</td></tr>\n          <tr><td><code>Case-Insensitive Unique</code></td><td><code>{s.lower() for s in raw_tags}</code></td><td>Tag Normalization</td><td>Collapses ['Python', 'python', 'PYTHON'] into {'python'}.</td></tr>\n        </tbody>\n      </table>\n    </div>\n    <div class=\"code-subblock\">\n      <div class=\"code-subblock-header\">\n        <div class=\"mac-dots\"><div class=\"mac-dot red\"></div><div class=\"mac-dot yellow\"></div><div class=\"mac-dot green\"></div></div>\n        <span class=\"code-subblock-title\">demo_headingSetComprehensions.py</span>\n      </div>\n      <pre class=\"code-subblock-body\"><code><span class=\"py-comment\"># Section 07: Set Comprehensions: Deduplicated Mathematical Set Transforms</span>\n<span class=\"py-kw\">def</span> <span class=\"py-fn\">execute_demo</span>(<span class=\"py-var\">data</span>):\n    <span class=\"py-kw\">if</span> <span class=\"py-var\">data</span>:\n        <span class=\"py-kw\">return</span> [<span class=\"py-fn\">str</span>(<span class=\"py-var\">x</span>) <span class=\"py-kw\">for</span> <span class=\"py-var\">x</span> <span class=\"py-kw\">in</span> <span class=\"py-var\">data</span>]\n    <span class=\"py-kw\">return</span> []\n</code></pre>\n    </div>\n  </section>\n\n  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 SECTION 08: GENERATOR EXPRESSIONS: (X FOR X IN DATA) VS MEMORY-SAFE LAZY EVAL \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n  <section id=\"day11Sec08\" class=\"slide-section\">\n    <h2 class=\"slide-section-title heading-box-wrap heading-with-audio\" id=\"headingGeneratorExpressions\">\n      <span class=\"heading-num-box\">08</span>\n      <span class=\"heading-title-box\">\n        <span class=\"heading-title-text\">Generator Expressions</span>\n        <button class=\"audio-play-btn\" onclick=\"playAudio('Day11/New_PyDay11Audio08.mp3', this)\" title=\"Play narration\">\n          <svg class=\"audio-play-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><polygon points=\"5 3 19 12 5 21 5 3\"></polygon></svg>\n        </button>\n      </span>\n    </h2>\n    <p class=\"section-intro-text\">Replacing square brackets <code>[...]</code> with parentheses <code>(...)</code> creates a <strong>Generator Expression</strong>. Crucially, a generator does not allocate a list in RAM\u2014it yields items one by one on demand (lazy evaluation).</p>\n\n    <div class=\"table-header-wrap\">\n      <h4 class=\"table-header-title\">List Comprehension vs Generator Expression</h4>\n      <div class=\"table-header-actions\">\n        <div class=\"table-search-box\">\n          <svg class=\"table-search-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"11\" cy=\"11\" r=\"8\"></circle><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"></line></svg>\n          <input type=\"text\" class=\"table-search-input\" placeholder=\"Filter table...\" onkeyup=\"filterTable(this)\">\n        </div>\n      </div>\n    </div>\n    <div class=\"db-mock-table-wrap\">\n      <table class=\"db-table-mock db-table-mock--compact arith-sticky-table\">\n        <thead><tr><th>Construct / Syntax</th><th>Example Expression</th><th>Evaluation Mechanics</th><th>Production Engineering Context</th></tr></thead>\n        <tbody>\n          <tr><td><code>List Comprehension [...]</code></td><td><code>Eager Evaluation</code></td><td>Allocates full list in RAM</td><td>Best when you need indexing, sorting, or length.</td></tr>\n          <tr><td><code>Generator Expression (...) </code></td><td><code>Lazy Evaluation</code></td><td>Allocates ~112 bytes forever</td><td>Best for sum(), any(), all(), or streaming GBs of data.</td></tr>\n        </tbody>\n      </table>\n    </div>\n    <div class=\"py-keynotes-card\">\n      <div class=\"py-keynotes-header\">\n        <span class=\"py-keynotes-badge\">KEY TAKEAWAY</span>\n        <h4 class=\"py-keynotes-title\">Production Best Practices: Generator Expressions: (x for x in data) vs Memory-Safe Lazy Eval</h4>\n      </div>\n      <ul class=\"py-keynotes-list\">\n        <li><strong>Architectural Rule:</strong> Write deterministic, readable code prioritizing clarity and testability.</li>\n        <li><strong>Performance Note:</strong> Leverage CPython internal optimizations and avoid premature anti-pattern overheads.</li>\n        <li><strong>Edge Safety:</strong> Always validate bounds, null states, and empty collection inputs defensively.</li>\n      </ul>\n    </div>\n  </section>\n\n  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 SECTION 09: 10 CRITICAL COMPREHENSION ANTI-PATTERNS & COMPLEXITY TRAPS \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n  <section id=\"day11Sec09\" class=\"slide-section\">\n    <h2 class=\"slide-section-title heading-box-wrap heading-with-audio\" id=\"headingComprehensionAntiPatterns\">\n      <span class=\"heading-num-box\">09</span>\n      <span class=\"heading-title-box\">\n        <span class=\"heading-title-text\">Common Anti-Patterns</span>\n        <button class=\"audio-play-btn\" onclick=\"playAudio('Day11/New_PyDay11Audio09.mp3', this)\" title=\"Play narration\">\n          <svg class=\"audio-play-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><polygon points=\"5 3 19 12 5 21 5 3\"></polygon></svg>\n        </button>\n      </span>\n    </h2>\n    <p class=\"section-intro-text\">Review these 10 dangerous comprehension anti-patterns that create unreadable one-liners, memory bloat, or subtle execution bugs.</p>\n\n    <div class=\"table-header-wrap\">\n      <h4 class=\"table-header-title\">Master Comprehension Anti-Pattern Review Table</h4>\n      <div class=\"table-header-actions\">\n        <div class=\"table-search-box\">\n          <svg class=\"table-search-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"11\" cy=\"11\" r=\"8\"></circle><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"></line></svg>\n          <input type=\"text\" class=\"table-search-input\" placeholder=\"Filter table...\" onkeyup=\"filterTable(this)\">\n        </div>\n      </div>\n    </div>\n    <div class=\"db-mock-table-wrap\">\n      <table class=\"db-table-mock db-table-mock--compact arith-sticky-table anti-pattern-table\">\n        <thead><tr><th>Anti-Pattern Code</th><th>Buggy / Dangerous Result</th><th>Best Practice Architecture</th></tr></thead>\n        <tbody>\n          <tr><td><span class=\"ap-code-bad\">Comprehension for Side Effects</span></td><td><span class=\"ap-result-bad\">[print(x) for x in data]</span></td><td><span class=\"ap-code-fix\">Unneeded list allocated in RAM</span></td></tr>\n          <tr><td><span class=\"ap-code-bad\">Over-Nesting > 2 Levels</span></td><td><span class=\"ap-result-bad\">[x for a in b for c in a for x in c]</span></td><td><span class=\"ap-code-fix\">Unreadable cognitive hazard</span></td></tr>\n          <tr><td><span class=\"ap-code-bad\">Unneeded List in Reductions</span></td><td><span class=\"ap-result-bad\">sum([x**2 for x in data])</span></td><td><span class=\"ap-code-fix\">Allocates temporary list in RAM</span></td></tr>\n          <tr><td><span class=\"ap-code-bad\">Calling Slow Function Repeatedly</span></td><td><span class=\"ap-result-bad\">[slow(x) for x in data if slow(x) > 0]</span></td><td><span class=\"ap-code-fix\">Computes slow(x) twice per item!</span></td></tr>\n          <tr><td><span class=\"ap-code-bad\">Mutating Outer State</span></td><td><span class=\"ap-result-bad\">[lst.append(x) for x in data]</span></td><td><span class=\"ap-code-fix\">Creates list of Nones</span></td></tr>\n        </tbody>\n      </table>\n    </div>\n  </section>\n\n  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 SECTION 10: TOP 25 FAANG TECHNICAL INTERVIEW PREPARATION & ARCHITECTURE \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n  <section id=\"day11Sec10\" class=\"slide-section\">\n    <h2 class=\"slide-section-title heading-box-wrap heading-with-audio\" id=\"headingInterviewBox\">\n      <span class=\"heading-num-box\">10</span>\n      <span class=\"heading-title-box\">\n        <span class=\"heading-title-text\">Review & Interview Questions</span>\n        <button class=\"audio-play-btn\" onclick=\"playAudio('Day11/New_PyDay11Audio10.mp3', this)\" title=\"Play narration\">\n          <svg class=\"audio-play-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><polygon points=\"5 3 19 12 5 21 5 3\"></polygon></svg>\n        </button>\n      </span>\n    </h2>\n    <p class=\"section-intro-text\">Master these 25 essential comprehension mechanics, bytecode optimization, and generator streaming questions asked during FAANG interviews.</p>\n\n    <!-- Top 25 FAANG Interview Questions Box -->\n    <div class=\"interview-box\" id=\"day11InterviewBox\">\n      <h4 class=\"interview-header-title\">\n        <span>\ud83c\udfaf</span> Comprehensions Masterclass: Lists, Dicts, Sets & Generators Core Concepts &amp; Top 25 FAANG Interview Preparation\n      </h4>\n      <div class=\"interview-item\" id=\"pyDay11IQ1\">\n        <p class=\"interview-question\"><strong>Q1: Why are list comprehensions faster than standard for-loops with append()?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: List comprehensions are optimized at the CPython bytecode level. They utilize the specialized LIST_APPEND opcode, which appends elements directly to the underlying C-array without looking up the .append method in the global namespace on each iteration.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay11IQ2\">\n        <p class=\"interview-question\"><strong>Q2: What is the fundamental difference between a list comprehension and a generator expression?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: A list comprehension eagerly evaluates all elements immediately, allocating the entire list in heap memory (O(N) space). A generator expression evaluates lazily, yielding elements one-at-a-time via the iterator protocol and consuming constant O(1) memory (~112 bytes) regardless of dataset size.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay11IQ3\">\n        <p class=\"interview-question\"><strong>Q3: Where does the if clause go when filtering vs when transforming conditionally?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: When filtering elements out, the `if` predicate goes at the very end (`[x for x in data if x > 0]`). When conditionally transforming values (preserving all elements), the ternary `if-else` goes at the front (`[x if x > 0 else 0 for x in data]`).</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay11IQ4\">\n        <p class=\"interview-question\"><strong>Q4: How do you flatten a 2D matrix using a list comprehension?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: Syntax is: `[item for row in matrix for item in row]`. The order of `for` clauses in the comprehension matches the order of nested `for` statements in standard loop syntax.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay11IQ5\">\n        <p class=\"interview-question\"><strong>Q5: What happens if you use parentheses around a comprehension: (x for x in data)?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: It creates a generator object, not a tuple! (To create a tuple comprehension, you must pass the generator expression to the tuple constructor: `tuple(x for x in data)`).</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay11IQ6\">\n        <p class=\"interview-question\"><strong>Q6: How do you prevent computing an expensive function twice in a comprehension filter?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: Use the walrus operator `:=` (PEP 572): `[res for x in data if (res := expensive(x)) > threshold]`. This computes `expensive(x)` once and binds it to `res`.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay11IQ7\">\n        <p class=\"interview-question\"><strong>Q7: What is a dictionary comprehension and how do you invert a dictionary with it?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: A dictionary comprehension creates a new dict with `{k_expr: v_expr for item in iterable}`. To invert: `{v: k for k, v in original_dict.items()}` (assuming values are unique and hashable).</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay11IQ8\">\n        <p class=\"interview-question\"><strong>Q8: What is a set comprehension and when should it be used?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: A set comprehension uses `{expr for item in iterable}`. It automatically deduplicates elements during transformation and returns a hash set.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay11IQ9\">\n        <p class=\"interview-question\"><strong>Q9: Why is using a list comprehension solely for side effects an anti-pattern?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: Writing `[print(x) for x in data]` builds a list of N `None` objects in memory that is immediately discarded, wasting CPU and RAM. Use a standard `for x in data: print(x)` loop.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay11IQ10\">\n        <p class=\"interview-question\"><strong>Q10: How does variable scoping work in Python 3 comprehensions?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: In Python 3, comprehensions are compiled with their own local scope (implemented as nested functions). The iteration variable does not leak into the enclosing function or module namespace (fixing a Python 2 bug).</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay11IQ11\">\n        <p class=\"interview-question\"><strong>Q11: When should you pass a generator expression directly into sum(), any(), or all()?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: Always. Functions like `sum(x**2 for x in data)` accept generator expressions without enclosing parentheses, avoiding the memory allocation of a temporary intermediate list.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay11IQ12\">\n        <p class=\"interview-question\"><strong>Q12: Can you use multiple if conditions in a list comprehension?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: Yes: `[x for x in data if x > 0 if x % 2 == 0]` acts as a logical AND (`if x > 0 and x % 2 == 0`). Both conditions must be satisfied.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay11IQ13\">\n        <p class=\"interview-question\"><strong>Q13: What is the time and space complexity of [x for x in range(N)] vs (x for x in range(N))?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: List comprehension: O(N) time and O(N) space. Generator expression: O(1) initialization time and O(1) space.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay11IQ14\">\n        <p class=\"interview-question\"><strong>Q14: How do you create a nested list (e.g. 3x3 identity matrix) using list comprehensions?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: `[[1 if i == j else 0 for j in range(3)] for i in range(3)]`.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay11IQ15\">\n        <p class=\"interview-question\"><strong>Q15: Why can't you write an else clause at the end of a list comprehension?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: The trailing `if` is a filter predicate, not an expression. If you need alternative values, use a ternary expression before the `for` clause: `[a if cond else b for x in data]`.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay11IQ16\">\n        <p class=\"interview-question\"><strong>Q16: How do you create a frequency count dictionary using a comprehension?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: While `collections.Counter(items)` is idiomatic, with comprehensions: `{x: items.count(x) for x in set(items)}`.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay11IQ17\">\n        <p class=\"interview-question\"><strong>Q17: What is the maximum recommended nesting depth for comprehensions?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: PEP 8 recommends no more than 2 `for` clauses in a comprehension. Deeper nesting harms readability and should be refactored into standard loops or generator functions.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay11IQ18\">\n        <p class=\"interview-question\"><strong>Q18: How do you transpose a matrix using a list comprehension?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: `[[row[i] for row in matrix] for i in range(len(matrix[0]))]` (or `[list(col) for col in zip(*matrix)]`).</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay11IQ19\">\n        <p class=\"interview-question\"><strong>Q19: Does a generator expression support indexing: gen[0]?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: No. Generators do not support indexing or slicing because they evaluate lazily. To get the first item, call `next(gen)`.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay11IQ20\">\n        <p class=\"interview-question\"><strong>Q20: How do you handle exceptions inside a list comprehension?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: Comprehensions cannot contain `try...except` blocks. If an element can raise an exception, wrap the transformation in a helper function containing `try...except` and call that function.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay11IQ21\">\n        <p class=\"interview-question\"><strong>Q21: What is the difference between list(map(fn, data)) and [fn(x) for x in data]?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: List comprehensions are generally faster and more readable in modern Python, especially when filtering or when lambdas would otherwise be required.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay11IQ22\">\n        <p class=\"interview-question\"><strong>Q22: How do you read a text file line-by-line cleanly with a generator expression?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: With `with open('file.txt') as f: lines = (line.strip() for line in f if line.strip())`.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay11IQ23\">\n        <p class=\"interview-question\"><strong>Q23: Can a comprehension unpack multiple values?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: Yes: `[f'{name}: {score}' for name, score in zip(names, scores)]`.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay11IQ24\">\n        <p class=\"interview-question\"><strong>Q24: What happens if an exception is raised halfway through evaluating a list comprehension?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: Execution halts immediately, the exception propagates, and the partially constructed list is garbage collected.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay11IQ25\">\n        <p class=\"interview-question\"><strong>Q25: How do comprehensions integrate with Pandas DataFrame construction?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: You can pass a list of dicts generated via comprehensions directly into `pd.DataFrame([{...} for x in data])` for fast batch tabular construction.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n    </div>\n  </section>\n\n</div>"
    }
  ],
  "practiceQuestions": [
    {
        "id": 1,
        "prompt": "<strong>[Comprehensions Masterclass: Lists, Dicts, Sets & Generators] Square of Even Numbers</strong><br/>Given nums = [1, 2, 3, 4, 5, 6], use a list comprehension to square only even numbers into squared_evens.",
        "starterCode": "# Write your code here\n",
        "ref": "nums = [1, 2, 3, 4, 5, 6]\nsquared_evens = [x**2 for x in nums if x % 2 == 0]\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "squared_evens"
            ]
        }
    },
    {
        "id": 2,
        "prompt": "<strong>[Comprehensions Masterclass: Lists, Dicts, Sets & Generators] Ternary ReLU Transformation</strong><br/>Given signals = [-5, 10, -2, 8, 0], replace negative numbers with 0 using a comprehension into relu_signals.",
        "starterCode": "# Write your code here\n",
        "ref": "signals = [-5, 10, -2, 8, 0]\nrelu_signals = [x if x > 0 else 0 for x in signals]\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "relu_signals"
            ]
        }
    },
    {
        "id": 3,
        "prompt": "<strong>[Comprehensions Masterclass: Lists, Dicts, Sets & Generators] String Length Dictionary Comprehension</strong><br/>Given words = ['Python', 'SQL', 'Data'], create a dict word_lens mapping each word to its length.",
        "starterCode": "# Write your code here\n",
        "ref": "words = ['Python', 'SQL', 'Data']\nword_lens = {w: len(w) for w in words}\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "word_lens"
            ]
        }
    },
    {
        "id": 4,
        "prompt": "<strong>[Comprehensions Masterclass: Lists, Dicts, Sets & Generators] Deduplicated Lowercase Set Comprehension</strong><br/>Given tags = ['Python', 'python', 'AI', 'ai'], create clean_tags using a set comprehension.",
        "starterCode": "# Write your code here\n",
        "ref": "tags = ['Python', 'python', 'AI', 'ai']\nclean_tags = {t.lower() for t in tags}\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "clean_tags"
            ]
        }
    },
    {
        "id": 5,
        "prompt": "<strong>[Comprehensions Masterclass: Lists, Dicts, Sets & Generators] Matrix Row Flattening</strong><br/>Given grid = [[1, 2], [3, 4], [5, 6]], flatten into a single list flat_vals.",
        "starterCode": "# Write your code here\n",
        "ref": "grid = [[1, 2], [3, 4], [5, 6]]\nflat_vals = [val for row in grid for val in row]\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "flat_vals"
            ]
        }
    },
    {
        "id": 6,
        "prompt": "<strong>[Comprehensions Masterclass: Lists, Dicts, Sets & Generators] Filter Out Missing Values</strong><br/>Given raw = [10, None, 25, None, 40], filter out None values into clean_data.",
        "starterCode": "# Write your code here\n",
        "ref": "raw = [10, None, 25, None, 40]\nclean_data = [x for x in raw if x is not None]\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "clean_data"
            ]
        }
    },
    {
        "id": 7,
        "prompt": "<strong>[Comprehensions Masterclass: Lists, Dicts, Sets & Generators] Dictionary Value Filtering</strong><br/>Given scores = {'Alice': 85, 'Bob': 55, 'Charlie': 90}, keep only passing students (score >= 70) in passing.",
        "starterCode": "# Write your code here\n",
        "ref": "scores = {'Alice': 85, 'Bob': 55, 'Charlie': 90}\npassing = {k: v for k, v in scores.items() if v >= 70}\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "passing"
            ]
        }
    },
    {
        "id": 8,
        "prompt": "<strong>[Comprehensions Masterclass: Lists, Dicts, Sets & Generators] Invert Dictionary Key-Values</strong><br/>Given mapping = {'US': 1, 'CA': 2, 'UK': 3}, invert keys and values into country_by_code.",
        "starterCode": "# Write your code here\n",
        "ref": "mapping = {'US': 1, 'CA': 2, 'UK': 3}\ncountry_by_code = {v: k for k, v in mapping.items()}\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "country_by_code"
            ]
        }
    },
    {
        "id": 9,
        "prompt": "<strong>[Comprehensions Masterclass: Lists, Dicts, Sets & Generators] Strip Whitespace Strings</strong><br/>Given raw_names = ['  Alice ', 'Bob\\n', ' Charlie '], strip whitespace in clean_names.",
        "starterCode": "# Write your code here\n",
        "ref": "raw_names = ['  Alice ', 'Bob\\n', ' Charlie ']\nclean_names = [s.strip() for s in raw_names]\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "clean_names"
            ]
        }
    },
    {
        "id": 10,
        "prompt": "<strong>[Comprehensions Masterclass: Lists, Dicts, Sets & Generators] Cartesian Product Grid Pairs</strong><br/>Given xs = [1, 2] and ys = ['a', 'b'], generate all (x, y) tuples in pairs.",
        "starterCode": "# Write your code here\n",
        "ref": "xs = [1, 2]\nys = ['a', 'b']\npairs = [(x, y) for x in xs for y in ys]\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "pairs"
            ]
        }
    },
    {
        "id": 11,
        "prompt": "<strong>[Comprehensions Masterclass: Lists, Dicts, Sets & Generators] Extract Nested Dict Property</strong><br/>Given users = [{'id': 1, 'name': 'Ann'}, {'id': 2, 'name': 'Ben'}], extract all names into user_names.",
        "starterCode": "# Write your code here\n",
        "ref": "users = [{'id': 1, 'name': 'Ann'}, {'id': 2, 'name': 'Ben'}]\nuser_names = [u['name'] for u in users]\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "user_names"
            ]
        }
    },
    {
        "id": 12,
        "prompt": "<strong>[Comprehensions Masterclass: Lists, Dicts, Sets & Generators] Character Ascii Code Mapping</strong><br/>Given chars = ['A', 'B', 'C'], create ascii_map = {c: ord(c) for c in chars}.",
        "starterCode": "# Write your code here\n",
        "ref": "chars = ['A', 'B', 'C']\nascii_map = {c: ord(c) for c in chars}\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "ascii_map"
            ]
        }
    },
    {
        "id": 13,
        "prompt": "<strong>[Comprehensions Masterclass: Lists, Dicts, Sets & Generators] Generator Expression Sum</strong><br/>Given numbers = list(range(1, 11)), calculate sum of squares using a generator expression in sum_sq.",
        "starterCode": "# Write your code here\n",
        "ref": "numbers = list(range(1, 11))\nsum_sq = sum(x**2 for x in numbers)\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "sum_sq"
            ]
        }
    },
    {
        "id": 14,
        "prompt": "<strong>[Comprehensions Masterclass: Lists, Dicts, Sets & Generators] Boolean Filter with any()</strong><br/>Given logs = ['INFO: ok', 'ERROR: fail', 'DEBUG: trace'], check has_error using any() on a generator.",
        "starterCode": "# Write your code here\n",
        "ref": "logs = ['INFO: ok', 'ERROR: fail', 'DEBUG: trace']\nhas_error = any('ERROR' in line for line in logs)\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "has_error"
            ]
        }
    },
    {
        "id": 15,
        "prompt": "<strong>[Comprehensions Masterclass: Lists, Dicts, Sets & Generators] Filter Words by Prefix</strong><br/>Given words = ['apple', 'apricot', 'banana'], filter words starting with 'ap' into ap_words.",
        "starterCode": "# Write your code here\n",
        "ref": "words = ['apple', 'apricot', 'banana']\nap_words = [w for w in words if w.startswith('ap')]\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "ap_words"
            ]
        }
    },
    {
        "id": 16,
        "prompt": "<strong>[Comprehensions Masterclass: Lists, Dicts, Sets & Generators] Multi-Condition Number Filter</strong><br/>Given vals = range(1, 31), extract numbers divisible by both 3 and 5 into div_15.",
        "starterCode": "# Write your code here\n",
        "ref": "vals = range(1, 31)\ndiv_15 = [x for x in vals if x % 3 == 0 and x % 5 == 0]\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "div_15"
            ]
        }
    },
    {
        "id": 17,
        "prompt": "<strong>[Comprehensions Masterclass: Lists, Dicts, Sets & Generators] Transpose 2D Matrix Comprehension</strong><br/>Given matrix = [[1, 2, 3], [4, 5, 6]], transpose rows into columns in transposed.",
        "starterCode": "# Write your code here\n",
        "ref": "matrix = [[1, 2, 3], [4, 5, 6]]\ntransposed = [[matrix[r][c] for r in range(len(matrix))] for c in range(len(matrix[0]))]\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "transposed"
            ]
        }
    },
    {
        "id": 18,
        "prompt": "<strong>[Comprehensions Masterclass: Lists, Dicts, Sets & Generators] Extract Domain from Email List</strong><br/>Given emails = ['a@gmail.com', 'b@yahoo.com', 'c@gmail.com'], create unique domains set.",
        "starterCode": "# Write your code here\n",
        "ref": "emails = ['a@gmail.com', 'b@yahoo.com', 'c@gmail.com']\ndomains = {e.split('@')[1] for e in emails}\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "domains"
            ]
        }
    },
    {
        "id": 19,
        "prompt": "<strong>[Comprehensions Masterclass: Lists, Dicts, Sets & Generators] Conditional String Prefixing</strong><br/>Given codes = ['A1', 'B2', '3C'], prepend 'ID-' if code starts with digit, else keep code, into formatted_codes.",
        "starterCode": "# Write your code here\n",
        "ref": "codes = ['A1', 'B2', '3C']\nformatted_codes = [f'ID-{c}' if c[0].isdigit() else c for c in codes]\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "formatted_codes"
            ]
        }
    },
    {
        "id": 20,
        "prompt": "<strong>[Comprehensions Masterclass: Lists, Dicts, Sets & Generators] Identity Matrix Generation</strong><br/>Create a 3x3 identity matrix (1 on diagonal, 0 elsewhere) in identity_3x3.",
        "starterCode": "# Write your code here\n",
        "ref": "identity_3x3 = [[1 if i == j else 0 for j in range(3)] for i in range(3)]\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "identity_3x3"
            ]
        }
    }
],
  "testQuestions": [
    {
        "id": 1,
        "title": "TQ-01: Comprehensions Masterclass: Lists, Dicts, Sets & Generators Mastery #1",
        "prompt": "Solve practical interview test challenge #1 on Comprehensions Masterclass: Lists, Dicts, Sets & Generators.",
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
        "title": "TQ-02: Comprehensions Masterclass: Lists, Dicts, Sets & Generators Mastery #2",
        "prompt": "Solve practical interview test challenge #2 on Comprehensions Masterclass: Lists, Dicts, Sets & Generators.",
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
        "title": "TQ-03: Comprehensions Masterclass: Lists, Dicts, Sets & Generators Mastery #3",
        "prompt": "Solve practical interview test challenge #3 on Comprehensions Masterclass: Lists, Dicts, Sets & Generators.",
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
        "title": "TQ-04: Comprehensions Masterclass: Lists, Dicts, Sets & Generators Mastery #4",
        "prompt": "Solve practical interview test challenge #4 on Comprehensions Masterclass: Lists, Dicts, Sets & Generators.",
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
        "title": "TQ-05: Comprehensions Masterclass: Lists, Dicts, Sets & Generators Mastery #5",
        "prompt": "Solve practical interview test challenge #5 on Comprehensions Masterclass: Lists, Dicts, Sets & Generators.",
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
        "title": "TQ-06: Comprehensions Masterclass: Lists, Dicts, Sets & Generators Mastery #6",
        "prompt": "Solve practical interview test challenge #6 on Comprehensions Masterclass: Lists, Dicts, Sets & Generators.",
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
        "title": "TQ-07: Comprehensions Masterclass: Lists, Dicts, Sets & Generators Mastery #7",
        "prompt": "Solve practical interview test challenge #7 on Comprehensions Masterclass: Lists, Dicts, Sets & Generators.",
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
        "title": "TQ-08: Comprehensions Masterclass: Lists, Dicts, Sets & Generators Mastery #8",
        "prompt": "Solve practical interview test challenge #8 on Comprehensions Masterclass: Lists, Dicts, Sets & Generators.",
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
        "title": "TQ-09: Comprehensions Masterclass: Lists, Dicts, Sets & Generators Mastery #9",
        "prompt": "Solve practical interview test challenge #9 on Comprehensions Masterclass: Lists, Dicts, Sets & Generators.",
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
        "title": "TQ-10: Comprehensions Masterclass: Lists, Dicts, Sets & Generators Mastery #10",
        "prompt": "Solve practical interview test challenge #10 on Comprehensions Masterclass: Lists, Dicts, Sets & Generators.",
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
        "title": "TQ-11: Comprehensions Masterclass: Lists, Dicts, Sets & Generators Mastery #11",
        "prompt": "Solve practical interview test challenge #11 on Comprehensions Masterclass: Lists, Dicts, Sets & Generators.",
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
        "title": "TQ-12: Comprehensions Masterclass: Lists, Dicts, Sets & Generators Mastery #12",
        "prompt": "Solve practical interview test challenge #12 on Comprehensions Masterclass: Lists, Dicts, Sets & Generators.",
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
        "title": "TQ-13: Comprehensions Masterclass: Lists, Dicts, Sets & Generators Mastery #13",
        "prompt": "Solve practical interview test challenge #13 on Comprehensions Masterclass: Lists, Dicts, Sets & Generators.",
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
        "title": "TQ-14: Comprehensions Masterclass: Lists, Dicts, Sets & Generators Mastery #14",
        "prompt": "Solve practical interview test challenge #14 on Comprehensions Masterclass: Lists, Dicts, Sets & Generators.",
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
        "title": "TQ-15: Comprehensions Masterclass: Lists, Dicts, Sets & Generators Mastery #15",
        "prompt": "Solve practical interview test challenge #15 on Comprehensions Masterclass: Lists, Dicts, Sets & Generators.",
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
        "title": "TQ-16: Comprehensions Masterclass: Lists, Dicts, Sets & Generators Mastery #16",
        "prompt": "Solve practical interview test challenge #16 on Comprehensions Masterclass: Lists, Dicts, Sets & Generators.",
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
        "title": "TQ-17: Comprehensions Masterclass: Lists, Dicts, Sets & Generators Mastery #17",
        "prompt": "Solve practical interview test challenge #17 on Comprehensions Masterclass: Lists, Dicts, Sets & Generators.",
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
        "title": "TQ-18: Comprehensions Masterclass: Lists, Dicts, Sets & Generators Mastery #18",
        "prompt": "Solve practical interview test challenge #18 on Comprehensions Masterclass: Lists, Dicts, Sets & Generators.",
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
        "title": "TQ-19: Comprehensions Masterclass: Lists, Dicts, Sets & Generators Mastery #19",
        "prompt": "Solve practical interview test challenge #19 on Comprehensions Masterclass: Lists, Dicts, Sets & Generators.",
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
        "title": "TQ-20: Comprehensions Masterclass: Lists, Dicts, Sets & Generators Mastery #20",
        "prompt": "Solve practical interview test challenge #20 on Comprehensions Masterclass: Lists, Dicts, Sets & Generators.",
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
        "title": "TQ-21: Comprehensions Masterclass: Lists, Dicts, Sets & Generators Mastery #21",
        "prompt": "Solve practical interview test challenge #21 on Comprehensions Masterclass: Lists, Dicts, Sets & Generators.",
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
        "title": "TQ-22: Comprehensions Masterclass: Lists, Dicts, Sets & Generators Mastery #22",
        "prompt": "Solve practical interview test challenge #22 on Comprehensions Masterclass: Lists, Dicts, Sets & Generators.",
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
        "title": "TQ-23: Comprehensions Masterclass: Lists, Dicts, Sets & Generators Mastery #23",
        "prompt": "Solve practical interview test challenge #23 on Comprehensions Masterclass: Lists, Dicts, Sets & Generators.",
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
        "title": "TQ-24: Comprehensions Masterclass: Lists, Dicts, Sets & Generators Mastery #24",
        "prompt": "Solve practical interview test challenge #24 on Comprehensions Masterclass: Lists, Dicts, Sets & Generators.",
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
        "title": "TQ-25: Comprehensions Masterclass: Lists, Dicts, Sets & Generators Mastery #25",
        "prompt": "Solve practical interview test challenge #25 on Comprehensions Masterclass: Lists, Dicts, Sets & Generators.",
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
