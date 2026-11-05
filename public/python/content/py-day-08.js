// Python Course Content — Day 08 (Conditional Logic, Branching & Decision Making)
if (!window.COURSE_CONTENT) window.COURSE_CONTENT = {};
window.COURSE_CONTENT['pyDay08'] = {
  "day": 8,
  "title": "Conditionals & Branching Logic",
  "emoji": "\ud83d\udd00",
  "topics": [
    "Conditional Statements (if-elif-else)",
    "Truthy & Falsy Evaluation",
    "Logical Operators & Short-Circuiting",
    "Nested Conditions & Guard Clauses",
    "Ternary Expressions",
    "Chained Comparisons",
    "Identity (is) vs Equality (==)",
    "Pattern Matching (match-case)",
    "Common Anti-Patterns",
    "Review & Interview Questions"
],
  "slides": [
    {
      "title": "Conditional Logic, Branching & Decision Making",
      "html": "<style>\n  /* \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\n     BASE & DARK THEME (DEFAULT)\n     \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 */\n\n  /* \u2500\u2500 Flagship Dual-Box Heading Architecture (SQL Day 01 Parity) \u2500\u2500 */\n  .heading-box-wrap,\n  .slide-section-title.heading-box-wrap {\n    display: flex !important;\n    align-items: stretch !important;\n    gap: 0 !important;\n    background: transparent !important;\n    border: none !important;\n    padding: 0 !important;\n    margin: 24px 0 14px 0 !important;\n    filter: drop-shadow(0 4px 14px rgba(0, 0, 0, 0.35)) !important;\n  }\n  .heading-num-box {\n    display: flex !important;\n    align-items: center !important;\n    justify-content: center !important;\n    min-width: 48px !important;\n    padding: 0 14px !important;\n    background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%) !important;\n    color: #ffffff !important;\n    font-family: 'JetBrains Mono', monospace !important;\n    font-size: 1.05rem !important;\n    font-weight: 800 !important;\n    letter-spacing: 0.05em !important;\n    border-radius: 8px 0 0 8px !important;\n    border: 1px solid rgba(56, 189, 248, 0.4) !important;\n    border-right: none !important;\n    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2) !important;\n    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4) !important;\n  }\n  .heading-title-box {\n    display: flex !important;\n    align-items: center !important;\n    justify-content: space-between !important;\n    flex: 1 !important;\n    padding: 10px 16px !important;\n    background: linear-gradient(90deg, #0b1329 0%, #080e1e 100%) !important;\n    border-radius: 0 8px 8px 0 !important;\n    border: 1px solid rgba(56, 189, 248, 0.25) !important;\n    border-left: 1px solid rgba(56, 189, 248, 0.15) !important;\n    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05) !important;\n  }\n  .heading-title-text {\n    font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif !important;\n    font-size: 1.08rem !important;\n    font-weight: 700 !important;\n    color: #f0f6fc !important;\n    letter-spacing: -0.01em !important;\n    line-height: 1.35 !important;\n  }\n  .audio-play-btn {\n    display: inline-flex !important;\n    align-items: center !important;\n    justify-content: center !important;\n    width: 28px !important;\n    height: 28px !important;\n    margin-left: 12px !important;\n    border-radius: 50% !important;\n    background: rgba(56, 189, 248, 0.15) !important;\n    border: 1px solid rgba(56, 189, 248, 0.4) !important;\n    color: #38bdf8 !important;\n    cursor: pointer !important;\n    transition: all 0.2s ease !important;\n    flex-shrink: 0 !important;\n  }\n  .audio-play-btn:hover {\n    background: rgba(56, 189, 248, 0.3) !important;\n    transform: scale(1.08) !important;\n    color: #ffffff !important;\n  }\n\n  /* \u2500\u2500 2D Frozen Table System \u2500\u2500 */\n  .table-header-wrap {\n    display: flex !important;\n    align-items: center !important;\n    justify-content: space-between !important;\n    padding: 10px 14px !important;\n    background-color: #0d1527 !important;\n    border: 1px solid rgba(255, 255, 255, 0.08) !important;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.06) !important;\n    border-radius: 8px 8px 0 0 !important;\n  }\n  .table-header-title {\n    margin: 0 !important;\n    font-size: 0.92rem !important;\n    font-weight: 700 !important;\n    color: #f8fafc !important;\n  }\n  .table-search-box {\n    display: flex !important;\n    align-items: center !important;\n    background: rgba(0, 0, 0, 0.4) !important;\n    border: 1px solid rgba(255, 255, 255, 0.12) !important;\n    border-radius: 6px !important;\n    padding: 4px 8px !important;\n    gap: 6px !important;\n  }\n  .table-search-input {\n    background: transparent !important;\n    border: none !important;\n    color: #f8fafc !important;\n    font-size: 0.8rem !important;\n    outline: none !important;\n    width: 140px !important;\n  }\n  .db-mock-table-wrap {\n    max-height: 520px !important;\n    overflow: auto !important;\n    position: relative !important;\n    border: 1px solid rgba(255, 255, 255, 0.08) !important;\n    border-top: none !important;\n    border-radius: 0 0 8px 8px !important;\n    margin-bottom: 18px !important;\n  }\n  .db-mock-table-wrap thead th {\n    position: sticky !important;\n    top: 0 !important;\n    z-index: 12 !important;\n    background-color: #0f172a !important;\n    color: #38bdf8 !important;\n    font-weight: 700 !important;\n    font-size: 0.82rem !important;\n    padding: 10px 12px !important;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.12) !important;\n  }\n  .db-mock-table-wrap tbody td:first-child,\n  .db-mock-table-wrap thead th:first-child {\n    position: sticky !important;\n    left: 0 !important;\n    z-index: 15 !important;\n    background-color: #0f172a !important;\n    font-family: 'JetBrains Mono', monospace !important;\n    font-weight: 600 !important;\n  }\n  .db-mock-table-wrap thead th:first-child {\n    z-index: 25 !important;\n  }\n  .db-mock-table-wrap tbody td {\n    padding: 8px 12px !important;\n    font-size: 0.82rem !important;\n    color: #cbd5e1 !important;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.04) !important;\n  }\n\n  /* \u2500\u2500 macOS IDE Code Subblock \u2500\u2500 */\n  .code-subblock {\n    background: #080d1a !important;\n    border: 1px solid rgba(56, 189, 248, 0.2) !important;\n    border-radius: 8px !important;\n    margin: 14px 0 !important;\n    overflow: hidden !important;\n    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4) !important;\n  }\n  .code-subblock-header {\n    display: flex !important;\n    align-items: center !important;\n    justify-content: space-between !important;\n    padding: 8px 14px !important;\n    background: #050811 !important;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;\n  }\n  .mac-dots {\n    display: flex !important;\n    gap: 6px !important;\n  }\n  .mac-dot {\n    width: 10px !important;\n    height: 10px !important;\n    border-radius: 50% !important;\n  }\n  .mac-dot.red { background: #ef4444 !important; }\n  .mac-dot.yellow { background: #f59e0b !important; }\n  .mac-dot.green { background: #10b981 !important; }\n  .code-subblock-title {\n    font-family: 'JetBrains Mono', monospace !important;\n    font-size: 0.78rem !important;\n    color: #94a3b8 !important;\n  }\n  .code-subblock-body {\n    padding: 12px 16px !important;\n    margin: 0 !important;\n    background: #080d1a !important;\n    font-family: 'JetBrains Mono', monospace !important;\n    font-size: 0.84rem !important;\n    line-height: 1.55 !important;\n    color: #e2e8f0 !important;\n    overflow-x: auto !important;\n  }\n  .py-kw { color: #f43f5e !important; font-weight: 700 !important; }\n  .py-fn { color: #38bdf8 !important; }\n  .py-str { color: #34d399 !important; }\n  .py-num { color: #fbbf24 !important; }\n  .py-var { color: #e2e8f0 !important; }\n  .py-comment { color: #64748b !important; font-style: italic !important; }\n  [data-theme=\"light\"] .py-kw { color: #be123c !important; }\n  [data-theme=\"light\"] .py-fn { color: #1d4ed8 !important; }\n  [data-theme=\"light\"] .py-str { color: #15803d !important; }\n  [data-theme=\"light\"] .py-num { color: #b45309 !important; }\n  [data-theme=\"light\"] .py-var { color: #0f172a !important; font-weight: 600 !important; }\n  [data-theme=\"light\"] .py-comment { color: #64748b !important; }\n  [data-theme=\"light\"] .ap-code-bad { color: #be123c !important; background: #fff1f2 !important; border: 1px solid #fecdd3 !important; }\n  [data-theme=\"light\"] .ap-code-fix { color: #047857 !important; background: #ecfdf5 !important; border: 1px solid #a7f3d0 !important; }\n\n  /* \u2500\u2500 Master Anti-Pattern Table \u2500\u2500 */\n  .anti-pattern-table thead th {\n    background-color: #1a080d !important;\n    color: #fb7185 !important;\n  }\n  .ap-code-bad {\n    color: #f87171 !important;\n    font-family: 'JetBrains Mono', monospace !important;\n    background: rgba(239, 68, 68, 0.1) !important;\n    padding: 2px 6px !important;\n    border-radius: 4px !important;\n  }\n  .ap-result-bad {\n    color: #fca5a5 !important;\n    font-size: 0.78rem !important;\n  }\n  .ap-code-fix {\n    color: #34d399 !important;\n    font-family: 'JetBrains Mono', monospace !important;\n    background: rgba(16, 185, 129, 0.1) !important;\n    padding: 2px 6px !important;\n    border-radius: 4px !important;\n  }\n\n  /* \u2500\u2500 Key Notes Cards \u2500\u2500 */\n  .py-keynotes-card {\n    background: linear-gradient(135deg, rgba(8, 14, 30, 0.8) 0%, rgba(13, 22, 45, 0.8) 100%) !important;\n    border: 1px solid rgba(56, 189, 248, 0.25) !important;\n    border-radius: 8px !important;\n    padding: 14px 18px !important;\n    margin: 16px 0 !important;\n  }\n  .py-keynotes-header {\n    display: flex !important;\n    align-items: center !important;\n    gap: 8px !important;\n    margin-bottom: 8px !important;\n  }\n  .py-keynotes-badge {\n    background: rgba(56, 189, 248, 0.2) !important;\n    color: #38bdf8 !important;\n    font-size: 0.72rem !important;\n    font-weight: 800 !important;\n    padding: 2px 8px !important;\n    border-radius: 4px !important;\n    letter-spacing: 0.05em !important;\n  }\n  .py-keynotes-title {\n    font-size: 0.92rem !important;\n    font-weight: 700 !important;\n    color: #f8fafc !important;\n    margin: 0 !important;\n  }\n  .py-keynotes-list {\n    margin: 0 !important;\n    padding-left: 20px !important;\n    color: #cbd5e1 !important;\n    font-size: 0.84rem !important;\n    line-height: 1.6 !important;\n    text-align: justify !important;\n    text-align-last: left !important;\n  }\n\n  /* \u2500\u2500 Interview Box \u2500\u2500 */\n  .interview-box {\n    background: #090e1f !important;\n    border: 1px solid rgba(56, 189, 248, 0.25) !important;\n    border-radius: 10px !important;\n    padding: 20px !important;\n    margin-top: 18px !important;\n  }\n  .interview-header-title {\n    color: #38bdf8 !important;\n    font-size: 1.05rem !important;\n    font-weight: 800 !important;\n    margin-bottom: 16px !important;\n  }\n  .interview-item {\n    margin: 12px 0 !important;\n  }\n  .interview-question {\n    color: #f8fafc !important;\n    font-size: 0.9rem !important;\n    margin-bottom: 6px !important;\n  }\n  .interview-answer {\n    color: #94a3b8 !important;\n    font-size: 0.84rem !important;\n    line-height: 1.55 !important;\n    padding-left: 12px !important;\n    border-left: 2px solid rgba(56, 189, 248, 0.3) !important;\n  }\n  .interview-divider {\n    border: none !important;\n    border-top: 1px solid rgba(255, 255, 255, 0.06) !important;\n    margin: 12px 0 !important;\n  }\n\n  /* \u2500\u2500 Light Theme Overrides \u2500\u2500 */\n  [data-theme=\"light\"] .heading-num-box {\n    background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%) !important;\n    color: #ffffff !important;\n  }\n  [data-theme=\"light\"] .heading-title-box {\n    background: linear-gradient(90deg, #f8fafc 0%, #f1f5f9 100%) !important;\n    border-color: #cbd5e1 !important;\n  }\n  [data-theme=\"light\"] .heading-title-text {\n    color: #0f172a !important;\n  }\n  [data-theme=\"light\"] .table-header-wrap {\n    background-color: #f8fafc !important;\n    border-color: #e2e8f0 !important;\n  }\n  [data-theme=\"light\"] .table-header-title {\n    color: #0f172a !important;\n  }\n  [data-theme=\"light\"] .table-search-box {\n    background: #ffffff !important;\n    border-color: #cbd5e1 !important;\n  }\n  [data-theme=\"light\"] .table-search-input {\n    color: #0f172a !important;\n  }\n  [data-theme=\"light\"] .db-mock-table-wrap thead th {\n    background-color: #f1f5f9 !important;\n    color: #0369a1 !important;\n    border-color: #e2e8f0 !important;\n  }\n  [data-theme=\"light\"] .db-mock-table-wrap tbody td:first-child,\n  [data-theme=\"light\"] .db-mock-table-wrap thead th:first-child {\n    background-color: #ffffff !important;\n  }\n  [data-theme=\"light\"] .db-mock-table-wrap tbody td {\n    color: #334155 !important;\n    border-color: #e2e8f0 !important;\n  }\n  [data-theme=\"light\"] .code-subblock {\n    background: #f8fafc !important;\n    border-color: #cbd5e1 !important;\n  }\n  [data-theme=\"light\"] .code-subblock-header {\n    background: #f1f5f9 !important;\n    border-color: #e2e8f0 !important;\n  }\n  [data-theme=\"light\"] .code-subblock-body {\n    background: #f8fafc !important;\n    color: #0f172a !important;\n  }\n  [data-theme=\"light\"] .interview-box {\n    background: #f8fafc !important;\n    border-color: #e2e8f0 !important;\n  }\n  [data-theme=\"light\"] .interview-question {\n    color: #0f172a !important;\n  }\n  [data-theme=\"light\"] .interview-answer {\n    color: #475569 !important;\n    border-left-color: #0284c7 !important;\n  }\n  [data-theme=\"light\"] .py-keynotes-card {\n    background: #ffffff !important;\n    border-color: #cbd5e1 !important;\n  }\n  [data-theme=\"light\"] .py-keynotes-title {\n    color: #0f172a !important;\n  }\n  [data-theme=\"light\"] .py-keynotes-list {\n    color: #334155 !important;\n  }\n\n\n  /* ═════════════════════════════════════════════════════════════════════\n     MANODEMY UNIVERSAL 2D FROZEN TABLE SYSTEM (FLAGSHIP DAY 04 PARITY)\n     ═════════════════════════════════════════════════════════════════════ */\n  .db-mock-table-wrap {\n    position: relative !important;\n    overflow: auto !important;\n    overflow-x: auto !important;\n    overflow-y: auto !important;\n    max-height: 520px !important;\n    -webkit-overflow-scrolling: touch !important;\n    border-radius: 0 0 12px 12px !important;\n    border: 1px solid rgba(56, 189, 248, 0.25) !important;\n    border-top: none !important;\n    background: #090e1a !important;\n    box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.35) !important;\n    margin: 0 0 16px 0 !important;\n  }\n  .db-mock-table-wrap::-webkit-scrollbar {\n    width: 8px !important;\n    height: 8px !important;\n  }\n  .db-mock-table-wrap::-webkit-scrollbar-track {\n    background: #0d1527 !important;\n    border-radius: 4px !important;\n  }\n  .db-mock-table-wrap::-webkit-scrollbar-thumb {\n    background: rgba(56, 189, 248, 0.35) !important;\n    border-radius: 4px !important;\n  }\n  .db-mock-table-wrap::-webkit-scrollbar-thumb:hover {\n    background: rgba(56, 189, 248, 0.6) !important;\n  }\n\n  .db-table-mock {\n    border-collapse: separate !important;\n    border-spacing: 0 !important;\n    overflow: visible !important;\n    margin: 0 !important;\n    font-size: 0.85rem !important;\n    width: 100% !important;\n    min-width: 960px !important;\n    table-layout: auto !important;\n  }\n\n  .db-table-mock thead th {\n    position: -webkit-sticky !important;\n    position: sticky !important;\n    top: 0 !important;\n    z-index: 20 !important;\n    background-color: #131d35 !important;\n    color: #e2e8f0 !important;\n    font-weight: 700 !important;\n    font-size: 0.82rem !important;\n    letter-spacing: 0.02em !important;\n    text-transform: none !important;\n    padding: 13px 16px !important;\n    border-bottom: 2px solid rgba(56, 189, 248, 0.35) !important;\n    box-sizing: border-box !important;\n    vertical-align: middle !important;\n  }\n\n  .db-table-mock thead th:nth-child(1) {\n    position: -webkit-sticky !important;\n    position: sticky !important;\n    top: 0 !important;\n    left: 0 !important;\n    z-index: 30 !important;\n    background-color: #111a30 !important;\n    border-right: 2px solid rgba(56, 189, 248, 0.38) !important;\n    border-bottom: 2px solid rgba(56, 189, 248, 0.38) !important;\n    box-shadow: 4px 4px 14px -2px rgba(0, 0, 0, 0.55) !important;\n    color: #f8fafc !important;\n  }\n\n  .db-table-mock tbody td:nth-child(1) {\n    position: -webkit-sticky !important;\n    position: sticky !important;\n    left: 0 !important;\n    top: auto !important;\n    z-index: 10 !important;\n    box-sizing: border-box !important;\n    background-color: #0d1527 !important;\n    border-right: 2px solid rgba(56, 189, 248, 0.38) !important;\n    box-shadow: 4px 0 14px -2px rgba(0, 0, 0, 0.55) !important;\n    text-align: left !important;\n    padding: 12px 16px !important;\n    vertical-align: middle !important;\n    white-space: nowrap !important;\n  }\n\n  .db-table-mock tbody tr:hover td:nth-child(1) {\n    background-color: #162038 !important;\n    background: #162038 !important;\n    opacity: 1 !important;\n    z-index: 15 !important;\n    border-right: 2px solid rgba(56, 189, 248, 0.5) !important;\n  }\n\n  .db-table-mock tbody tr:hover td:not(:first-child) {\n    background-color: rgba(56, 189, 248, 0.05) !important;\n  }\n\n  .db-table-mock td:nth-child(1) code {\n    display: inline-flex !important;\n    align-items: center !important;\n    max-width: 100% !important;\n    min-height: 28px !important;\n    padding: 4px 10px !important;\n    font-family: 'JetBrains Mono', monospace !important;\n    font-weight: 700 !important;\n    font-size: 0.82rem !important;\n    background: rgba(56, 189, 248, 0.12) !important;\n    border: 1px solid rgba(56, 189, 248, 0.35) !important;\n    border-radius: 6px !important;\n    color: #38bdf8 !important;\n    white-space: nowrap !important;\n    letter-spacing: -0.01em !important;\n  }\n\n\n  /* ═════════════════════════════════════════════════════════════════════\n     MANODEMY UNIVERSAL TABLE COLOR SCIENCE ENGINE (DARK & LIGHT THEMES)\n     100% Parity with Flagship Python Days 01–05\n     ═════════════════════════════════════════════════════════════════════ */\n\n  /* ── 1. DARK MODE (DEFAULT) TABLE FONT COLORS ── */\n  .db-table-mock thead th {\n    color: #e2e8f0 !important;\n    font-family: 'Outfit', -apple-system, sans-serif !important;\n    font-weight: 700 !important;\n    font-size: 0.82rem !important;\n    letter-spacing: 0.02em !important;\n    background-color: #131d35 !important;\n    border-bottom: 2px solid rgba(56, 189, 248, 0.35) !important;\n  }\n\n  .db-table-mock thead th:nth-child(1) {\n    color: #f8fafc !important;\n    font-weight: 800 !important;\n    background-color: #111a30 !important;\n    border-right: 2px solid rgba(56, 189, 248, 0.38) !important;\n    border-bottom: 2px solid rgba(56, 189, 248, 0.38) !important;\n  }\n\n  .db-table-mock td {\n    color: #cbd5e1 !important;\n    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;\n    font-size: 0.85rem !important;\n    line-height: 1.55 !important;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.06) !important;\n  }\n\n  .db-table-mock td strong {\n    color: #f8fafc !important;\n    font-weight: 700 !important;\n  }\n\n  .db-table-mock td em {\n    color: #94a3b8 !important;\n    font-style: italic !important;\n  }\n\n  /* Column 1 Code Badge (Electric Cyan) */\n  .db-table-mock td:nth-child(1) code {\n    color: #38bdf8 !important;\n    background: rgba(56, 189, 248, 0.12) !important;\n    border: 1px solid rgba(56, 189, 248, 0.35) !important;\n    border-radius: 6px !important;\n    font-family: 'JetBrains Mono', 'Fira Code', monospace !important;\n    font-size: 0.82rem !important;\n    font-weight: 700 !important;\n    letter-spacing: -0.01em !important;\n    padding: 4px 10px !important;\n  }\n\n  /* Regular Data Columns Code Tags */\n  .db-table-mock td:not(:first-child) code,\n  .db-table-mock td code {\n    color: #f1f5f9 !important;\n    background: rgba(15, 23, 42, 0.7) !important;\n    border: 1px solid rgba(255, 255, 255, 0.12) !important;\n    border-radius: 5px !important;\n    font-family: 'JetBrains Mono', 'Fira Code', monospace !important;\n    font-size: 0.81rem !important;\n    line-height: 1.45 !important;\n    padding: 3px 8px !important;\n  }\n\n  /* Anti-Pattern Table Colors (Dark Mode) */\n  .anti-pattern-table thead th:nth-child(1) {\n    background-color: #1a162b !important;\n    color: #fca5a5 !important;\n    border-bottom: 2px solid rgba(244, 63, 94, 0.4) !important;\n    border-right: 2px solid rgba(244, 63, 94, 0.4) !important;\n  }\n\n  .anti-pattern-table thead th:nth-child(2) {\n    color: #6ee7b7 !important;\n  }\n\n  .anti-pattern-table tbody td:nth-child(1) code {\n    background: rgba(244, 63, 94, 0.14) !important;\n    border: 1px solid rgba(244, 63, 94, 0.38) !important;\n    color: #fda4af !important;\n  }\n\n  .anti-pattern-table tbody td:nth-child(2) code,\n  .anti-pattern-table tbody td:nth-child(4) code {\n    background: rgba(16, 185, 129, 0.12) !important;\n    border: 1px solid rgba(16, 185, 129, 0.35) !important;\n    color: #6ee7b7 !important;\n  }\n\n  .anti-pattern-table .ap-result-bad, .anti-pattern-table .ap-bad-text {\n    color: #fb7185 !important;\n  }\n  .anti-pattern-table .ap-result-good, .anti-pattern-table .ap-good-text {\n    color: #34d399 !important;\n  }\n\n  /* ── 2. LIGHT MODE ([data-theme=\"light\"]) TABLE FONT COLORS ── */\n  [data-theme=\"light\"] .db-table-mock thead th {\n    color: #0369a1 !important;\n    background-color: #f8fafc !important;\n    border-bottom: 2px solid #cbd5e1 !important;\n    font-weight: 700 !important;\n  }\n\n  [data-theme=\"light\"] .db-table-mock thead th:nth-child(1) {\n    color: #0f172a !important;\n    background-color: #f1f5f9 !important;\n    border-right: 2px solid #cbd5e1 !important;\n    border-bottom: 2px solid #cbd5e1 !important;\n    font-weight: 800 !important;\n  }\n\n  [data-theme=\"light\"] .db-table-mock td {\n    color: #334155 !important;\n    border-bottom: 1px solid #e2e8f0 !important;\n  }\n\n  [data-theme=\"light\"] .db-table-mock td strong {\n    color: #0f172a !important;\n    font-weight: 700 !important;\n  }\n\n  [data-theme=\"light\"] .db-table-mock td em {\n    color: #64748b !important;\n  }\n\n  /* Column 1 Code Badge (Crisp Azure Blue) */\n  [data-theme=\"light\"] .db-table-mock td:nth-child(1) code {\n    color: #0284c7 !important;\n    background: #e0f2fe !important;\n    border: 1px solid #7dd3fc !important;\n  }\n\n  /* Regular Data Columns Code Tags (Light Mode) */\n  [data-theme=\"light\"] .db-table-mock td:not(:first-child) code,\n  [data-theme=\"light\"] .db-table-mock td code {\n    color: #0f172a !important;\n    background: #f1f5f9 !important;\n    border: 1px solid #e2e8f0 !important;\n  }\n\n  /* Anti-Pattern Table Colors (Light Mode) */\n  [data-theme=\"light\"] .anti-pattern-table thead th:nth-child(1) {\n    background-color: #fff1f2 !important;\n    color: #be123c !important;\n    border-bottom: 2px solid #fecdd3 !important;\n    border-right: 2px solid #fecdd3 !important;\n  }\n\n  [data-theme=\"light\"] .anti-pattern-table thead th:nth-child(2) {\n    color: #059669 !important;\n  }\n\n  [data-theme=\"light\"] .anti-pattern-table tbody td:nth-child(1) code {\n    background: #ffe4e6 !important;\n    border-color: #fecdd3 !important;\n    color: #e11d48 !important;\n  }\n\n  [data-theme=\"light\"] .anti-pattern-table tbody td:nth-child(2) code,\n  [data-theme=\"light\"] .anti-pattern-table tbody td:nth-child(4) code {\n    background: #ecfdf5 !important;\n    border-color: #a7f3d0 !important;\n    color: #059669 !important;\n  }\n\n  [data-theme=\"light\"] .anti-pattern-table .ap-result-bad, [data-theme=\"light\"] .anti-pattern-table .ap-bad-text {\n    color: #e11d48 !important;\n  }\n  [data-theme=\"light\"] .anti-pattern-table .ap-result-good, [data-theme=\"light\"] .anti-pattern-table .ap-good-text {\n    color: #059669 !important;\n  }\n</style>\n<div class=\"slide-content-track\">\n  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 SECTION 01: CONDITIONAL BRANCHING & THE DECISION TREE MENTAL MODEL \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n  <section id=\"day08Sec01\" class=\"slide-section\">\n    <h2 class=\"slide-section-title heading-box-wrap heading-with-audio\" id=\"headingDecisionTree\">\n      <span class=\"heading-num-box\">01</span>\n      <span class=\"heading-title-box\">\n        <span class=\"heading-title-text\">Conditional Statements (if-elif-else)</span>\n        <button class=\"audio-play-btn\" onclick=\"playAudio('Day08/New_PyDay08Audio01.mp3', this)\" title=\"Play narration\">\n          <svg class=\"audio-play-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><polygon points=\"5 3 19 12 5 21 5 3\"></polygon></svg>\n        </button>\n      </span>\n    </h2>\n    <p class=\"section-intro-text\">Think of Python conditional statements like a railway switch track. When data arrives at an <code>if</code> junction, Python evaluates a boolean predicate. If True, execution proceeds down the primary track; if False, it diverts to an <code>elif</code> or <code>else</code> siding. This binary routing allows algorithms to dynamically adapt to varying business states, user permissions, and dataset anomalies.</p>\n\n    <div class=\"table-header-wrap\">\n      <h4 class=\"table-header-title\">Decision Tree Routing Primitives</h4>\n      <div class=\"table-header-actions\">\n        <div class=\"table-search-box\">\n          <svg class=\"table-search-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"11\" cy=\"11\" r=\"8\"></circle><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"></line></svg>\n          <input type=\"text\" class=\"table-search-input\" placeholder=\"Filter table...\" onkeyup=\"filterTable(this)\">\n        </div>\n      </div>\n    </div>\n    <div class=\"db-mock-table-wrap\">\n      <table class=\"db-table-mock db-table-mock--compact arith-sticky-table\">\n        <thead><tr><th>Construct / Syntax</th><th>Example Expression</th><th>Evaluation Mechanics</th><th>Production Engineering Context</th></tr></thead>\n        <tbody>\n          <tr><td><code>Single Branch if</code></td><td><code>if score >= 70:</code></td><td>print('Pass')</td><td>Executes block only when predicate evaluates to True.</td></tr>\n          <tr><td><code>Dual Branch if-else</code></td><td><code>if balance >= debit: ... else: ...</code></td><td>balance -= debit</td><td>Provides an exhaustive binary fork; exactly one branch executes.</td></tr>\n          <tr><td><code>Multi-Branch ladder</code></td><td><code>if s >= 90: ... elif s >= 80: ... else: ...</code></td><td>grade = 'A'</td><td>Evaluates sequentially from top to bottom; short-circuits on first match.</td></tr>\n          <tr><td><code>Nested Branching</code></td><td><code>if user.is_active: if user.is_admin:</code></td><td>grant_access()</td><td>Hierarchical decision trees for compound permission gating.</td></tr>\n        </tbody>\n      </table>\n    </div>\n    <div class=\"code-subblock\">\n      <div class=\"code-subblock-header\">\n        <div class=\"mac-dots\"><div class=\"mac-dot red\"></div><div class=\"mac-dot yellow\"></div><div class=\"mac-dot green\"></div></div>\n        <span class=\"code-subblock-title\">demo_headingDecisionTree.py</span>\n      </div>\n      <pre class=\"code-subblock-body\"><code><span class=\"py-comment\"># Section 01: Conditional Branching & The Decision Tree Mental Model</span>\n<span class=\"py-kw\">def</span> <span class=\"py-fn\">execute_demo</span>(<span class=\"py-var\">data</span>):\n    <span class=\"py-kw\">if</span> <span class=\"py-var\">data</span>:\n        <span class=\"py-kw\">return</span> [<span class=\"py-fn\">str</span>(<span class=\"py-var\">x</span>) <span class=\"py-kw\">for</span> <span class=\"py-var\">x</span> <span class=\"py-kw\">in</span> <span class=\"py-var\">data</span>]\n    <span class=\"py-kw\">return</span> []\n</code></pre>\n    </div>\n  </section>\n\n  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 SECTION 02: TRUTHY VS FALSY EVALUATION & BOOLEAN COERCION ENGINE \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n  <section id=\"day08Sec02\" class=\"slide-section\">\n    <h2 class=\"slide-section-title heading-box-wrap heading-with-audio\" id=\"headingTruthyFalsy\">\n      <span class=\"heading-num-box\">02</span>\n      <span class=\"heading-title-box\">\n        <span class=\"heading-title-text\">Truthy & Falsy Evaluation</span>\n        <button class=\"audio-play-btn\" onclick=\"playAudio('Day08/New_PyDay08Audio02.mp3', this)\" title=\"Play narration\">\n          <svg class=\"audio-play-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><polygon points=\"5 3 19 12 5 21 5 3\"></polygon></svg>\n        </button>\n      </span>\n    </h2>\n    <p class=\"section-intro-text\">In Python, every object has an inherent boolean truth value. You do not need to explicitly compare <code>if len(items) > 0:</code> or <code>if is_active == True:</code>. Python invokes the object's <code>__bool__()</code> method (or <code>__len__()</code> if <code>__bool__</code> is absent) to determine truthiness.</p>\n\n    <div class=\"table-header-wrap\">\n      <h4 class=\"table-header-title\">CPython Boolean Evaluation Matrix</h4>\n      <div class=\"table-header-actions\">\n        <div class=\"table-search-box\">\n          <svg class=\"table-search-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"11\" cy=\"11\" r=\"8\"></circle><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"></line></svg>\n          <input type=\"text\" class=\"table-search-input\" placeholder=\"Filter table...\" onkeyup=\"filterTable(this)\">\n        </div>\n      </div>\n    </div>\n    <div class=\"db-mock-table-wrap\">\n      <table class=\"db-table-mock db-table-mock--compact arith-sticky-table\">\n        <thead><tr><th>Construct / Syntax</th><th>Example Expression</th><th>Evaluation Mechanics</th><th>Production Engineering Context</th></tr></thead>\n        <tbody>\n          <tr><td><code>NoneType</code></td><td><code>None</code></td><td>Falsy</td><td>Represents the absence of value; always falsy.</td></tr>\n          <tr><td><code>Boolean False</code></td><td><code>False</code></td><td>Falsy</td><td>Built-in boolean false singleton.</td></tr>\n          <tr><td><code>Numeric Zeros</code></td><td><code>0, 0.0, 0j, Decimal(0)</code></td><td>Falsy</td><td>Any numeric value representing absolute zero.</td></tr>\n          <tr><td><code>Empty Sequences</code></td><td><code>'', (), [], range(0)</code></td><td>Falsy</td><td>Sequences with length equal to zero (__len__() == 0).</td></tr>\n          <tr><td><code>Empty Mappings</code></td><td><code>{}</code></td><td>Falsy</td><td>Dictionaries or sets holding zero keys.</td></tr>\n          <tr><td><code>Non-Empty Collections</code></td><td><code>[0], 'False', {'a': 1}</code></td><td>Truthy</td><td>Collections holding at least one item, regardless of inner value.</td></tr>\n        </tbody>\n      </table>\n    </div>\n    <div class=\"py-keynotes-card\">\n      <div class=\"py-keynotes-header\">\n        <span class=\"py-keynotes-badge\">KEY TAKEAWAY</span>\n        <h4 class=\"py-keynotes-title\">Production Best Practices: Truthy vs Falsy Evaluation & Boolean Coercion Engine</h4>\n      </div>\n      <ul class=\"py-keynotes-list\">\n        <li><strong>Architectural Rule:</strong> Write deterministic, readable code prioritizing clarity and testability.</li>\n        <li><strong>Performance Note:</strong> Leverage CPython internal optimizations and avoid premature anti-pattern overheads.</li>\n        <li><strong>Edge Safety:</strong> Always validate bounds, null states, and empty collection inputs defensively.</li>\n      </ul>\n    </div>\n  </section>\n\n  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 SECTION 03: LOGICAL OPERATORS: AND, OR, NOT & SHORT-CIRCUIT OPTIMIZATION \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n  <section id=\"day08Sec03\" class=\"slide-section\">\n    <h2 class=\"slide-section-title heading-box-wrap heading-with-audio\" id=\"headingShortCircuit\">\n      <span class=\"heading-num-box\">03</span>\n      <span class=\"heading-title-box\">\n        <span class=\"heading-title-text\">Logical Operators & Short-Circuiting</span>\n        <button class=\"audio-play-btn\" onclick=\"playAudio('Day08/New_PyDay08Audio03.mp3', this)\" title=\"Play narration\">\n          <svg class=\"audio-play-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><polygon points=\"5 3 19 12 5 21 5 3\"></polygon></svg>\n        </button>\n      </span>\n    </h2>\n    <p class=\"section-intro-text\">Python logical operators (<code>and</code>, <code>or</code>, <code>not</code>) do not merely return boolean True/False\u2014they return the actual operand that determined the result! Furthermore, CPython optimizes evaluation using short-circuiting: evaluation halts the instant the truth value is guaranteed.</p>\n\n    <div class=\"table-header-wrap\">\n      <h4 class=\"table-header-title\">Logical Operator Evaluation Rules</h4>\n      <div class=\"table-header-actions\">\n        <div class=\"table-search-box\">\n          <svg class=\"table-search-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"11\" cy=\"11\" r=\"8\"></circle><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"></line></svg>\n          <input type=\"text\" class=\"table-search-input\" placeholder=\"Filter table...\" onkeyup=\"filterTable(this)\">\n        </div>\n      </div>\n    </div>\n    <div class=\"db-mock-table-wrap\">\n      <table class=\"db-table-mock db-table-mock--compact arith-sticky-table\">\n        <thead><tr><th>Construct / Syntax</th><th>Example Expression</th><th>Evaluation Mechanics</th><th>Production Engineering Context</th></tr></thead>\n        <tbody>\n          <tr><td><code>Logical and</code></td><td><code>x and y</code></td><td>Returns x if x is Falsy, else y</td><td>Halts immediately on first falsy value. Guaranteed safety guard.</td></tr>\n          <tr><td><code>Logical or</code></td><td><code>x or y</code></td><td>Returns x if x is Truthy, else y</td><td>Halts immediately on first truthy value. Idiomatic default fallback.</td></tr>\n          <tr><td><code>Logical not</code></td><td><code>not x</code></td><td>Always returns boolean True or False</td><td>Inverts truth value with highest operator precedence.</td></tr>\n        </tbody>\n      </table>\n    </div>\n    <div class=\"code-subblock\">\n      <div class=\"code-subblock-header\">\n        <div class=\"mac-dots\"><div class=\"mac-dot red\"></div><div class=\"mac-dot yellow\"></div><div class=\"mac-dot green\"></div></div>\n        <span class=\"code-subblock-title\">demo_headingShortCircuit.py</span>\n      </div>\n      <pre class=\"code-subblock-body\"><code><span class=\"py-comment\"># Section 03: Logical Operators: and, or, not & Short-Circuit Optimization</span>\n<span class=\"py-kw\">def</span> <span class=\"py-fn\">execute_demo</span>(<span class=\"py-var\">data</span>):\n    <span class=\"py-kw\">if</span> <span class=\"py-var\">data</span>:\n        <span class=\"py-kw\">return</span> [<span class=\"py-fn\">str</span>(<span class=\"py-var\">x</span>) <span class=\"py-kw\">for</span> <span class=\"py-var\">x</span> <span class=\"py-kw\">in</span> <span class=\"py-var\">data</span>]\n    <span class=\"py-kw\">return</span> []\n</code></pre>\n    </div>\n  </section>\n\n  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 SECTION 04: NESTED CONDITIONS & GUARD CLAUSE REFACTORING PATTERN \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n  <section id=\"day08Sec04\" class=\"slide-section\">\n    <h2 class=\"slide-section-title heading-box-wrap heading-with-audio\" id=\"headingGuardClauses\">\n      <span class=\"heading-num-box\">04</span>\n      <span class=\"heading-title-box\">\n        <span class=\"heading-title-text\">Nested Conditions & Guard Clauses</span>\n        <button class=\"audio-play-btn\" onclick=\"playAudio('Day08/New_PyDay08Audio04.mp3', this)\" title=\"Play narration\">\n          <svg class=\"audio-play-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><polygon points=\"5 3 19 12 5 21 5 3\"></polygon></svg>\n        </button>\n      </span>\n    </h2>\n    <p class=\"section-intro-text\">Deeply nested conditional blocks create the notorious 'Arrow Anti-Pattern'\u2014pyramids of right-drifting indentation that degrade readability and hinder unit testing. Guard clauses invert edge cases to exit early, keeping the happy path at zero indentation.</p>\n\n    <div class=\"table-header-wrap\">\n      <h4 class=\"table-header-title\">Arrow Anti-Pattern vs Guard Clause</h4>\n      <div class=\"table-header-actions\">\n        <div class=\"table-search-box\">\n          <svg class=\"table-search-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"11\" cy=\"11\" r=\"8\"></circle><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"></line></svg>\n          <input type=\"text\" class=\"table-search-input\" placeholder=\"Filter table...\" onkeyup=\"filterTable(this)\">\n        </div>\n      </div>\n    </div>\n    <div class=\"db-mock-table-wrap\">\n      <table class=\"db-table-mock db-table-mock--compact arith-sticky-table\">\n        <thead><tr><th>Construct / Syntax</th><th>Example Expression</th><th>Evaluation Mechanics</th><th>Production Engineering Context</th></tr></thead>\n        <tbody>\n          <tr><td><code>Arrow Pyramid (Bad)</code></td><td><code>if a: if b: if c: do_work()</code></td><td>Hard to test, cognitive overload</td><td>Inverts control flow by nesting happy paths.</td></tr>\n          <tr><td><code>Guard Clause (Clean)</code></td><td><code>if not a: return; if not b: return; do_work()</code></td><td>Linear flow, zero indentation drift</td><td>Exits early on boundary rejections; keeps logic clean.</td></tr>\n        </tbody>\n      </table>\n    </div>\n    <div class=\"py-keynotes-card\">\n      <div class=\"py-keynotes-header\">\n        <span class=\"py-keynotes-badge\">KEY TAKEAWAY</span>\n        <h4 class=\"py-keynotes-title\">Production Best Practices: Nested Conditions & Guard Clause Refactoring Pattern</h4>\n      </div>\n      <ul class=\"py-keynotes-list\">\n        <li><strong>Architectural Rule:</strong> Write deterministic, readable code prioritizing clarity and testability.</li>\n        <li><strong>Performance Note:</strong> Leverage CPython internal optimizations and avoid premature anti-pattern overheads.</li>\n        <li><strong>Edge Safety:</strong> Always validate bounds, null states, and empty collection inputs defensively.</li>\n      </ul>\n    </div>\n  </section>\n\n  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 SECTION 05: THE TERNARY CONDITIONAL OPERATOR (INLINE IF-ELSE) \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n  <section id=\"day08Sec05\" class=\"slide-section\">\n    <h2 class=\"slide-section-title heading-box-wrap heading-with-audio\" id=\"headingTernary\">\n      <span class=\"heading-num-box\">05</span>\n      <span class=\"heading-title-box\">\n        <span class=\"heading-title-text\">Ternary Expressions</span>\n        <button class=\"audio-play-btn\" onclick=\"playAudio('Day08/New_PyDay08Audio05.mp3', this)\" title=\"Play narration\">\n          <svg class=\"audio-play-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><polygon points=\"5 3 19 12 5 21 5 3\"></polygon></svg>\n        </button>\n      </span>\n    </h2>\n    <p class=\"section-intro-text\">Python provides an inline ternary conditional expression with the syntax: <code>true_value if condition else false_value</code>. Crucially, the expression evaluates lazily: only the chosen branch is computed.</p>\n\n    <div class=\"table-header-wrap\">\n      <h4 class=\"table-header-title\">Ternary Expression Use Cases</h4>\n      <div class=\"table-header-actions\">\n        <div class=\"table-search-box\">\n          <svg class=\"table-search-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"11\" cy=\"11\" r=\"8\"></circle><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"></line></svg>\n          <input type=\"text\" class=\"table-search-input\" placeholder=\"Filter table...\" onkeyup=\"filterTable(this)\">\n        </div>\n      </div>\n    </div>\n    <div class=\"db-mock-table-wrap\">\n      <table class=\"db-table-mock db-table-mock--compact arith-sticky-table\">\n        <thead><tr><th>Construct / Syntax</th><th>Example Expression</th><th>Evaluation Mechanics</th><th>Production Engineering Context</th></tr></thead>\n        <tbody>\n          <tr><td><code>Inline Assignment</code></td><td><code>status = 'Active' if is_paid else 'Suspended'</code></td><td>O(1) Inline Ternary</td><td>Single-line variable binding based on condition.</td></tr>\n          <tr><td><code>Safe Function Call</code></td><td><code>send_alert() if is_critical else log_info()</code></td><td>Lazy Evaluation</td><td>Executes only the selected branch callable.</td></tr>\n          <tr><td><code>Ternary in Return</code></td><td><code>return x if x > 0 else -x</code></td><td>Absolute Value Idiom</td><td>Clean mathematical function returns.</td></tr>\n        </tbody>\n      </table>\n    </div>\n    <div class=\"code-subblock\">\n      <div class=\"code-subblock-header\">\n        <div class=\"mac-dots\"><div class=\"mac-dot red\"></div><div class=\"mac-dot yellow\"></div><div class=\"mac-dot green\"></div></div>\n        <span class=\"code-subblock-title\">demo_headingTernary.py</span>\n      </div>\n      <pre class=\"code-subblock-body\"><code><span class=\"py-comment\"># Section 05: The Ternary Conditional Operator (Inline If-Else)</span>\n<span class=\"py-kw\">def</span> <span class=\"py-fn\">execute_demo</span>(<span class=\"py-var\">data</span>):\n    <span class=\"py-kw\">if</span> <span class=\"py-var\">data</span>:\n        <span class=\"py-kw\">return</span> [<span class=\"py-fn\">str</span>(<span class=\"py-var\">x</span>) <span class=\"py-kw\">for</span> <span class=\"py-var\">x</span> <span class=\"py-kw\">in</span> <span class=\"py-var\">data</span>]\n    <span class=\"py-kw\">return</span> []\n</code></pre>\n    </div>\n  </section>\n\n  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 SECTION 06: CHAINED COMPARISONS (18 <= AGE < 65) VS COMPOUND BOOLEANS \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n  <section id=\"day08Sec06\" class=\"slide-section\">\n    <h2 class=\"slide-section-title heading-box-wrap heading-with-audio\" id=\"headingChainedComparisons\">\n      <span class=\"heading-num-box\">06</span>\n      <span class=\"heading-title-box\">\n        <span class=\"heading-title-text\">Chained Comparisons</span>\n        <button class=\"audio-play-btn\" onclick=\"playAudio('Day08/New_PyDay08Audio06.mp3', this)\" title=\"Play narration\">\n          <svg class=\"audio-play-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><polygon points=\"5 3 19 12 5 21 5 3\"></polygon></svg>\n        </button>\n      </span>\n    </h2>\n    <p class=\"section-intro-text\">Unlike C, Java, or JavaScript, Python natively supports mathematical chained comparisons such as <code>0 <= score <= 100</code>. CPython compiles this into compound comparisons while evaluating the middle operand exactly once.</p>\n\n    <div class=\"table-header-wrap\">\n      <h4 class=\"table-header-title\">Chained Comparison Mechanics</h4>\n      <div class=\"table-header-actions\">\n        <div class=\"table-search-box\">\n          <svg class=\"table-search-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"11\" cy=\"11\" r=\"8\"></circle><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"></line></svg>\n          <input type=\"text\" class=\"table-search-input\" placeholder=\"Filter table...\" onkeyup=\"filterTable(this)\">\n        </div>\n      </div>\n    </div>\n    <div class=\"db-mock-table-wrap\">\n      <table class=\"db-table-mock db-table-mock--compact arith-sticky-table\">\n        <thead><tr><th>Construct / Syntax</th><th>Example Expression</th><th>Evaluation Mechanics</th><th>Production Engineering Context</th></tr></thead>\n        <tbody>\n          <tr><td><code>Range Inclusion</code></td><td><code>18 <= age <= 65</code></td><td>age >= 18 and age <= 65</td><td>Evaluates 'age' once; cleaner mathematical syntax.</td></tr>\n          <tr><td><code>Strict Inequality</code></td><td><code>0 < balance < credit_limit</code></td><td>balance > 0 and balance < credit_limit</td><td>Double-bounded range verification in one expression.</td></tr>\n          <tr><td><code>Multi-Chain Equality</code></td><td><code>a == b == c == d</code></td><td>All four variables are equal</td><td>Checks identical values across multiple references.</td></tr>\n        </tbody>\n      </table>\n    </div>\n    <div class=\"py-keynotes-card\">\n      <div class=\"py-keynotes-header\">\n        <span class=\"py-keynotes-badge\">KEY TAKEAWAY</span>\n        <h4 class=\"py-keynotes-title\">Production Best Practices: Chained Comparisons (18 <= age < 65) vs Compound Booleans</h4>\n      </div>\n      <ul class=\"py-keynotes-list\">\n        <li><strong>Architectural Rule:</strong> Write deterministic, readable code prioritizing clarity and testability.</li>\n        <li><strong>Performance Note:</strong> Leverage CPython internal optimizations and avoid premature anti-pattern overheads.</li>\n        <li><strong>Edge Safety:</strong> Always validate bounds, null states, and empty collection inputs defensively.</li>\n      </ul>\n    </div>\n  </section>\n\n  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 SECTION 07: IDENTITY VS EQUALITY IN BRANCHING: IS VS == TRAPS \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n  <section id=\"day08Sec07\" class=\"slide-section\">\n    <h2 class=\"slide-section-title heading-box-wrap heading-with-audio\" id=\"headingIdentityVsEquality\">\n      <span class=\"heading-num-box\">07</span>\n      <span class=\"heading-title-box\">\n        <span class=\"heading-title-text\">Identity (is) vs Equality (==)</span>\n        <button class=\"audio-play-btn\" onclick=\"playAudio('Day08/New_PyDay08Audio07.mp3', this)\" title=\"Play narration\">\n          <svg class=\"audio-play-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><polygon points=\"5 3 19 12 5 21 5 3\"></polygon></svg>\n        </button>\n      </span>\n    </h2>\n    <p class=\"section-intro-text\">One of the most dangerous rookie mistakes is confusing equality (<code>==</code>, invoking <code>__eq__</code>) with identity (<code>is</code>, comparing pointer addresses in RAM).</p>\n\n    <div class=\"table-header-wrap\">\n      <h4 class=\"table-header-title\">Equality vs Identity Matrix</h4>\n      <div class=\"table-header-actions\">\n        <div class=\"table-search-box\">\n          <svg class=\"table-search-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"11\" cy=\"11\" r=\"8\"></circle><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"></line></svg>\n          <input type=\"text\" class=\"table-search-input\" placeholder=\"Filter table...\" onkeyup=\"filterTable(this)\">\n        </div>\n      </div>\n    </div>\n    <div class=\"db-mock-table-wrap\">\n      <table class=\"db-table-mock db-table-mock--compact arith-sticky-table\">\n        <thead><tr><th>Construct / Syntax</th><th>Example Expression</th><th>Evaluation Mechanics</th><th>Production Engineering Context</th></tr></thead>\n        <tbody>\n          <tr><td><code>Value Equality ==</code></td><td><code>a == b</code></td><td>Checks if data values are equal</td><td>Calls __eq__(); use for strings, numbers, lists, dicts.</td></tr>\n          <tr><td><code>Object Identity is</code></td><td><code>a is b</code></td><td>Checks if id(a) == id(b) in RAM</td><td>Direct pointer comparison; use strictly for singletons (None, True, False).</td></tr>\n        </tbody>\n      </table>\n    </div>\n    <div class=\"code-subblock\">\n      <div class=\"code-subblock-header\">\n        <div class=\"mac-dots\"><div class=\"mac-dot red\"></div><div class=\"mac-dot yellow\"></div><div class=\"mac-dot green\"></div></div>\n        <span class=\"code-subblock-title\">demo_headingIdentityVsEquality.py</span>\n      </div>\n      <pre class=\"code-subblock-body\"><code><span class=\"py-comment\"># Section 07: Identity vs Equality in Branching: is vs == Traps</span>\n<span class=\"py-kw\">def</span> <span class=\"py-fn\">execute_demo</span>(<span class=\"py-var\">data</span>):\n    <span class=\"py-kw\">if</span> <span class=\"py-var\">data</span>:\n        <span class=\"py-kw\">return</span> [<span class=\"py-fn\">str</span>(<span class=\"py-var\">x</span>) <span class=\"py-kw\">for</span> <span class=\"py-var\">x</span> <span class=\"py-kw\">in</span> <span class=\"py-var\">data</span>]\n    <span class=\"py-kw\">return</span> []\n</code></pre>\n    </div>\n  </section>\n\n  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 SECTION 08: PYTHON 3.10+ STRUCTURAL PATTERN MATCHING (MATCH-CASE) \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n  <section id=\"day08Sec08\" class=\"slide-section\">\n    <h2 class=\"slide-section-title heading-box-wrap heading-with-audio\" id=\"headingMatchCase\">\n      <span class=\"heading-num-box\">08</span>\n      <span class=\"heading-title-box\">\n        <span class=\"heading-title-text\">Pattern Matching (match-case)</span>\n        <button class=\"audio-play-btn\" onclick=\"playAudio('Day08/New_PyDay08Audio08.mp3', this)\" title=\"Play narration\">\n          <svg class=\"audio-play-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><polygon points=\"5 3 19 12 5 21 5 3\"></polygon></svg>\n        </button>\n      </span>\n    </h2>\n    <p class=\"section-intro-text\">Introduced in PEP 634, Python's <code>match-case</code> statement is far more powerful than a traditional switch statement. It matches data structures by shape, unpacks inner variables, and applies conditional guards.</p>\n\n    <div class=\"table-header-wrap\">\n      <h4 class=\"table-header-title\">Pattern Matching Capabilities</h4>\n      <div class=\"table-header-actions\">\n        <div class=\"table-search-box\">\n          <svg class=\"table-search-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"11\" cy=\"11\" r=\"8\"></circle><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"></line></svg>\n          <input type=\"text\" class=\"table-search-input\" placeholder=\"Filter table...\" onkeyup=\"filterTable(this)\">\n        </div>\n      </div>\n    </div>\n    <div class=\"db-mock-table-wrap\">\n      <table class=\"db-table-mock db-table-mock--compact arith-sticky-table\">\n        <thead><tr><th>Construct / Syntax</th><th>Example Expression</th><th>Evaluation Mechanics</th><th>Production Engineering Context</th></tr></thead>\n        <tbody>\n          <tr><td><code>Literal Matching</code></td><td><code>match code: case 200: ... case 404: ...</code></td><td>Fast Jump Table Dispatch</td><td>Matches primitive constants and status codes.</td></tr>\n          <tr><td><code>Sequence Unpacking</code></td><td><code>match event: case ['click', x, y]: ...</code></td><td>Structural Shape Matching</td><td>Unpacks list/tuple coordinates while verifying structure.</td></tr>\n          <tr><td><code>Guard Conditions</code></td><td><code>case [x, y] if x > 0: ...</code></td><td>Pattern with Predicate</td><td>Applies custom conditional logic to matched structures.</td></tr>\n        </tbody>\n      </table>\n    </div>\n    <div class=\"py-keynotes-card\">\n      <div class=\"py-keynotes-header\">\n        <span class=\"py-keynotes-badge\">KEY TAKEAWAY</span>\n        <h4 class=\"py-keynotes-title\">Production Best Practices: Python 3.10+ Structural Pattern Matching (match-case)</h4>\n      </div>\n      <ul class=\"py-keynotes-list\">\n        <li><strong>Architectural Rule:</strong> Write deterministic, readable code prioritizing clarity and testability.</li>\n        <li><strong>Performance Note:</strong> Leverage CPython internal optimizations and avoid premature anti-pattern overheads.</li>\n        <li><strong>Edge Safety:</strong> Always validate bounds, null states, and empty collection inputs defensively.</li>\n      </ul>\n    </div>\n  </section>\n\n  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 SECTION 09: 10 CRITICAL ANTI-PATTERNS & PRODUCTION DECISION TRAPS \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n  <section id=\"day08Sec09\" class=\"slide-section\">\n    <h2 class=\"slide-section-title heading-box-wrap heading-with-audio\" id=\"headingAntiPatterns\">\n      <span class=\"heading-num-box\">09</span>\n      <span class=\"heading-title-box\">\n        <span class=\"heading-title-text\">Common Anti-Patterns</span>\n        <button class=\"audio-play-btn\" onclick=\"playAudio('Day08/New_PyDay08Audio09.mp3', this)\" title=\"Play narration\">\n          <svg class=\"audio-play-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><polygon points=\"5 3 19 12 5 21 5 3\"></polygon></svg>\n        </button>\n      </span>\n    </h2>\n    <p class=\"section-intro-text\">Review these 10 dangerous conditional anti-patterns that lead to production bugs, silent logic failures, and CPU performance bottlenecks.</p>\n\n    <div class=\"table-header-wrap\">\n      <h4 class=\"table-header-title\">Master Anti-Pattern Review Table</h4>\n      <div class=\"table-header-actions\">\n        <div class=\"table-search-box\">\n          <svg class=\"table-search-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"11\" cy=\"11\" r=\"8\"></circle><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"></line></svg>\n          <input type=\"text\" class=\"table-search-input\" placeholder=\"Filter table...\" onkeyup=\"filterTable(this)\">\n        </div>\n      </div>\n    </div>\n    <div class=\"db-mock-table-wrap\">\n      <table class=\"db-table-mock db-table-mock--compact arith-sticky-table anti-pattern-table\">\n        <thead><tr><th>Anti-Pattern Code</th><th>Buggy / Dangerous Result</th><th>Best Practice Architecture</th></tr></thead>\n        <tbody>\n          <tr><td><span class=\"ap-code-bad\">Explicit == True</span></td><td><span class=\"ap-result-bad\">if is_active == True:</span></td><td><span class=\"ap-code-fix\">Slower & traps 1 as True</span></td></tr>\n          <tr><td><span class=\"ap-code-bad\">Floating Point Equality</span></td><td><span class=\"ap-result-bad\">if 0.1 + 0.2 == 0.3:</span></td><td><span class=\"ap-code-fix\">Evaluates to False due to IEEE 754</span></td></tr>\n          <tr><td><span class=\"ap-code-bad\">Modifying in Loop</span></td><td><span class=\"ap-result-bad\">if item in lst: lst.remove(item)</span></td><td><span class=\"ap-code-fix\">Skips elements during iteration</span></td></tr>\n          <tr><td><span class=\"ap-code-bad\">Dangling Ladder</span></td><td><span class=\"ap-result-bad\">20-level if-elif-elif-elif</span></td><td><span class=\"ap-code-fix\">O(N) search, unmaintainable</span></td></tr>\n          <tr><td><span class=\"ap-code-bad\">Missing None Guard</span></td><td><span class=\"ap-result-bad\">if user.name == 'Admin':</span></td><td><span class=\"ap-code-fix\">AttributeError if user is None</span></td></tr>\n        </tbody>\n      </table>\n    </div>\n  </section>\n\n  <!-- \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 SECTION 10: TOP 25 FAANG TECHNICAL INTERVIEW PREPARATION & ARCHITECTURE \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550 -->\n  <section id=\"day08Sec10\" class=\"slide-section\">\n    <h2 class=\"slide-section-title heading-box-wrap heading-with-audio\" id=\"headingInterviewBox\">\n      <span class=\"heading-num-box\">10</span>\n      <span class=\"heading-title-box\">\n        <span class=\"heading-title-text\">Review & Interview Questions</span>\n        <button class=\"audio-play-btn\" onclick=\"playAudio('Day08/New_PyDay08Audio10.mp3', this)\" title=\"Play narration\">\n          <svg class=\"audio-play-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><polygon points=\"5 3 19 12 5 21 5 3\"></polygon></svg>\n        </button>\n      </span>\n    </h2>\n    <p class=\"section-intro-text\">Master these 25 essential conditional architecture, boolean systems, and branching mechanics questions asked during FAANG senior data analyst and software engineering interviews.</p>\n\n    <!-- Top 25 FAANG Interview Questions Box -->\n    <div class=\"interview-box\" id=\"day08InterviewBox\">\n      <h4 class=\"interview-header-title\">\n        <span>\ud83c\udfaf</span> Conditional Logic, Branching & Decision Making Core Concepts &amp; Top 25 FAANG Interview Preparation\n      </h4>\n      <div class=\"interview-item\" id=\"pyDay08IQ1\">\n        <p class=\"interview-question\"><strong>Q1: What is the fundamental difference between == and is in Python conditional statements?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: The equality operator == checks value equivalence by invoking __eq__(), evaluating whether two objects hold identical data. The identity operator is checks memory address identity (id(a) == id(b)), evaluating whether two variables point to the exact same physical heap object. In production, always use is for singletons (None, True, False) and == for data comparisons.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay08IQ2\">\n        <p class=\"interview-question\"><strong>Q2: How does short-circuit evaluation work in Python's logical operators?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: In an and expression, evaluation halts and returns the first falsy operand encountered without evaluating subsequent expressions. In an or expression, evaluation halts and returns the first truthy operand. This allows guard clauses such as `if user and user.is_active():` without raising AttributeError when user is None.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay08IQ3\">\n        <p class=\"interview-question\"><strong>Q3: Which built-in values in Python evaluate to Falsy?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: Values considered falsy include: None, False, numeric zeros (0, 0.0, 0j, Decimal(0), Fraction(0, 1)), empty sequences ('', (), [], range(0)), empty mappings ({}), and instances of custom classes whose __bool__() or __len__() methods return False or 0.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay08IQ4\">\n        <p class=\"interview-question\"><strong>Q4: What are Guard Clauses and why are they superior to nested if-else ladders?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: A Guard Clause is a design pattern that exits a function early via return or raise when error conditions or boundary limits are met, keeping the happy path flat at zero indentation. This eliminates the 'Arrow Anti-Pattern' (deeply nested pyramids of indentation) and dramatically simplifies unit testing.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay08IQ5\">\n        <p class=\"interview-question\"><strong>Q5: Explain how the ternary conditional operator evaluates in Python.</strong></p>\n        <div class=\"interview-answer\"><p><em>A: Syntax is `true_val if condition else false_val`. Crucially, it evaluates lazily: if condition is True, true_val is evaluated and false_val is completely ignored (and vice versa).</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay08IQ6\">\n        <p class=\"interview-question\"><strong>Q6: How do chained comparisons like 10 < x < 20 evaluate under the hood in CPython?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: CPython compiles chained comparisons into `10 < x and x < 20`, but evaluates the middle operand x exactly once. If 10 < x is False, the second comparison is skipped entirely.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay08IQ7\">\n        <p class=\"interview-question\"><strong>Q7: What is structural pattern matching (match-case) introduced in Python 3.10?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: match-case (PEP 634) is not merely a switch statement; it matches data structures by shape, extracts sub-values via sequence/mapping patterns, and supports guard conditions (`case [x, y] if x > 0:`).</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay08IQ8\">\n        <p class=\"interview-question\"><strong>Q8: Why is using if x == True an anti-pattern?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: Comparing explicitly with `== True` is redundant, slower (invokes __eq__), and buggy: values like 1 or 1.0 evaluate to True under `== True` because bool is a subclass of int. Idiomatic code uses `if x:` for truthiness or `if x is True:` if strictly testing for the boolean singleton.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay08IQ9\">\n        <p class=\"interview-question\"><strong>Q9: How does the walrus operator := integrate with conditionals?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: Introduced in Python 3.8 (PEP 572), `:=` assigns values to variables inside expressions. In conditionals (`if (n := len(data)) > 1000:`), it avoids computing len(data) twice while scoping n for subsequent use.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay08IQ10\">\n        <p class=\"interview-question\"><strong>Q10: What happens when an object defines both __bool__ and __len__?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: Python invokes __bool__() first. If __bool__() is not defined, Python falls back to calling __len__(), considering the object truthy if __len__() != 0. If neither is defined, instances evaluate to True.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay08IQ11\">\n        <p class=\"interview-question\"><strong>Q11: Can the ternary operator be chained? What is the architectural recommendation?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: Yes (`a if c1 else b if c2 else c`), but chaining beyond one level severely harms readability and violates PEP 8. Complex logic should be written as explicit if-elif-else blocks.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay08IQ12\">\n        <p class=\"interview-question\"><strong>Q12: Why should you avoid mutable default arguments in conditional dispatch functions?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: Default arguments are evaluated once at module load time. If a conditional assigns to a mutable default, state leaks across subsequent calls across all threads.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay08IQ13\">\n        <p class=\"interview-question\"><strong>Q13: How do you handle multi-condition branching with dictionary dispatch tables?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: Instead of a 20-branch if-elif ladder, map action keys to handler callables in a dict: `dispatch.get(action, default_handler)()`. This yields O(1) dispatch time.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay08IQ14\">\n        <p class=\"interview-question\"><strong>Q14: What is the Dangling Else problem and how does Python syntax prevent it?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: In languages with braces, an else might ambiguously attach to an outer or inner if. Python's strict whitespace and indentation rules make the attachment of else strictly unambiguous at parse time.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay08IQ15\">\n        <p class=\"interview-question\"><strong>Q15: How does Python handle operator precedence between not, and, and or?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: `not` has the highest precedence, followed by `and`, then `or`. Thus `not a or b and c` evaluates as `(not a) or (b and c)`. Enforce explicit parentheses for readability.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay08IQ16\">\n        <p class=\"interview-question\"><strong>Q16: What is defensive branching in production data pipelines?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: Defensive branching validates schema contracts, types, and value bounds at the edge before data enters core transformations, raising actionable custom exceptions early.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay08IQ17\">\n        <p class=\"interview-question\"><strong>Q17: Why can floating-point comparison in conditionals lead to silent bugs?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: IEEE 754 floating-point inaccuracies mean 0.1 + 0.2 == 0.3 evaluates to False. Always use `math.isclose(a, b)` or `abs(a - b) < epsilon` in conditionals.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay08IQ18\">\n        <p class=\"interview-question\"><strong>Q18: How does match-case handle wildcard matches?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: The wildcard pattern `case _:` matches any remaining value without binding it to a variable, serving as the default/fallback branch.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay08IQ19\">\n        <p class=\"interview-question\"><strong>Q19: What is the time complexity of a cascading if-elif ladder vs a dict lookup?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: An if-elif ladder evaluates branches sequentially in O(N) worst-case time. A dictionary dispatch table evaluates in O(1) average time.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay08IQ20\">\n        <p class=\"interview-question\"><strong>Q20: How do you conditionally execute code based on environment variables?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: Use `os.getenv('ENV', 'development') == 'production'` with strict case normalization and defensive fallback defaults.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay08IQ21\">\n        <p class=\"interview-question\"><strong>Q21: What is the difference between all() and any() in conditional logic?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: `all(iterable)` returns True if every element is truthy (short-circuits on first False). `any(iterable)` returns True if at least one element is truthy (short-circuits on first True).</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay08IQ22\">\n        <p class=\"interview-question\"><strong>Q22: How does Python evaluate boolean operations on NumPy arrays vs native scalars?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: Native Python conditionals expect a single boolean scalar. Evaluating a NumPy array `if arr:` raises ValueError. Use `arr.any()` or `arr.all()`.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay08IQ23\">\n        <p class=\"interview-question\"><strong>Q23: What is the Null Coalescing idiom in Python?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: Idiomatic fallbacks use `val = user_input or default_val` (if not falsy) or `val = user_input if user_input is not None else default_val`.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay08IQ24\">\n        <p class=\"interview-question\"><strong>Q24: How does match-case perform type narrowing?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: Using class patterns like `case int(x):` or `case str(s):`, Python matches the runtime type and binds the extracted value in a single atomic step.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n      <div class=\"interview-item\" id=\"pyDay08IQ25\">\n        <p class=\"interview-question\"><strong>Q25: What unit testing strategies ensure 100% conditional branch coverage?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: Use branch coverage tools (`pytest --cov --cov-branch`) and write parameterized test matrices testing truthy, falsy, boundary limits, and None edge cases.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n    </div>\n  </section>\n\n</div>"
    }
  ],
  "practiceQuestions": [
    {
        "id": 1,
        "prompt": "<strong>[Conditional Logic, Branching & Decision Making] Customer Credit Tier Classifier</strong><br/>Given credit_score = 720, assign tier = 'Prime' if score >= 700, 'Near-Prime' if score >= 620, else 'Subprime'.",
        "starterCode": "# Write your code here\n",
        "ref": "credit_score = 720\nif credit_score >= 700:\n    tier = 'Prime'\nelif credit_score >= 620:\n    tier = 'Near-Prime'\nelse:\n    tier = 'Subprime'\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "tier"
            ]
        }
    },
    {
        "id": 2,
        "prompt": "<strong>[Conditional Logic, Branching & Decision Making] Defensive Order Discount Guard</strong><br/>Given order_total = 250.0 and is_member = True, set discounted_total = order_total * 0.85 if member and total >= 200, else order_total * 0.95 if total >= 100, else order_total.",
        "starterCode": "# Write your code here\n",
        "ref": "order_total = 250.0\nis_member = True\nif is_member and order_total >= 200:\n    discounted_total = order_total * 0.85\nelif order_total >= 100:\n    discounted_total = order_total * 0.95\nelse:\n    discounted_total = order_total\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "discounted_total"
            ]
        }
    },
    {
        "id": 3,
        "prompt": "<strong>[Conditional Logic, Branching & Decision Making] Ternary Shipping Fee Calculator</strong><br/>Given cart_amount = 45.0, set shipping = 0.0 if cart_amount >= 50.0 else 9.99.",
        "starterCode": "# Write your code here\n",
        "ref": "cart_amount = 45.0\nshipping = 0.0 if cart_amount >= 50.0 else 9.99\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "shipping"
            ]
        }
    },
    {
        "id": 4,
        "prompt": "<strong>[Conditional Logic, Branching & Decision Making] Truthy Username Fallback</strong><br/>Given raw_username = '', set username = raw_username if raw_username else 'Anonymous'.",
        "starterCode": "# Write your code here\n",
        "ref": "raw_username = ''\nusername = raw_username if raw_username else 'Anonymous'\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "username"
            ]
        }
    },
    {
        "id": 5,
        "prompt": "<strong>[Conditional Logic, Branching & Decision Making] Chained Range Heart Rate Check</strong><br/>Given bpm = 72, set is_normal = 60 <= bpm <= 100.",
        "starterCode": "# Write your code here\n",
        "ref": "bpm = 72\nis_normal = 60 <= bpm <= 100\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "is_normal"
            ]
        }
    },
    {
        "id": 6,
        "prompt": "<strong>[Conditional Logic, Branching & Decision Making] Short-Circuit Admin Authorization</strong><br/>Given user = {'role': 'admin', 'active': True}, set is_authorized = bool(user and user.get('role') == 'admin' and user.get('active')).",
        "starterCode": "# Write your code here\n",
        "ref": "user = {'role': 'admin', 'active': True}\nis_authorized = bool(user and user.get('role') == 'admin' and user.get('active'))\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "is_authorized"
            ]
        }
    },
    {
        "id": 7,
        "prompt": "<strong>[Conditional Logic, Branching & Decision Making] Leap Year Century Validator</strong><br/>Given year = 2024, set is_leap = (year % 4 == 0 and year % 100 != 0) or (year % 400 == 0).",
        "starterCode": "# Write your code here\n",
        "ref": "year = 2024\nis_leap = (year % 4 == 0 and year % 100 != 0) or (year % 400 == 0)\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "is_leap"
            ]
        }
    },
    {
        "id": 8,
        "prompt": "<strong>[Conditional Logic, Branching & Decision Making] Floating-Point Safe Tolerance</strong><br/>Given val1 = 0.1 + 0.2 and val2 = 0.3, set is_close = abs(val1 - val2) < 1e-9.",
        "starterCode": "# Write your code here\n",
        "ref": "val1 = 0.1 + 0.2\nval2 = 0.3\nis_close = abs(val1 - val2) < 1e-9\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "is_close"
            ]
        }
    },
    {
        "id": 9,
        "prompt": "<strong>[Conditional Logic, Branching & Decision Making] HTTP Status Category Classifier</strong><br/>Given status_code = 404, set category = 'Success' if 200 <= status_code < 300 else 'Client Error' if 400 <= status_code < 500 else 'Other'.",
        "starterCode": "# Write your code here\n",
        "ref": "status_code = 404\ncategory = 'Success' if 200 <= status_code < 300 else 'Client Error' if 400 <= status_code < 500 else 'Other'\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "category"
            ]
        }
    },
    {
        "id": 10,
        "prompt": "<strong>[Conditional Logic, Branching & Decision Making] AML Fraud Transaction Risk</strong><br/>Given amount = 12500 and country = 'US', set is_high_risk = amount > 10000 or country not in ['US', 'CA', 'UK'].",
        "starterCode": "# Write your code here\n",
        "ref": "amount = 12500\ncountry = 'US'\nis_high_risk = amount > 10000 or country not in ['US', 'CA', 'UK']\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "is_high_risk"
            ]
        }
    },
    {
        "id": 11,
        "prompt": "<strong>[Conditional Logic, Branching & Decision Making] Falsy Collection Detection</strong><br/>Given records = [], set has_data = bool(records).",
        "starterCode": "# Write your code here\n",
        "ref": "records = []\nhas_data = bool(records)\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "has_data"
            ]
        }
    },
    {
        "id": 12,
        "prompt": "<strong>[Conditional Logic, Branching & Decision Making] Progressive Tax Bracket</strong><br/>Given income = 85000, set tax_rate = 0.10 if income <= 50000 else 0.20 if income <= 100000 else 0.30.",
        "starterCode": "# Write your code here\n",
        "ref": "income = 85000\ntax_rate = 0.10 if income <= 50000 else 0.20 if income <= 100000 else 0.30\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "tax_rate"
            ]
        }
    },
    {
        "id": 13,
        "prompt": "<strong>[Conditional Logic, Branching & Decision Making] Singleton None Identity Check</strong><br/>Given cache_val = None, set is_missing = cache_val is None.",
        "starterCode": "# Write your code here\n",
        "ref": "cache_val = None\nis_missing = cache_val is None\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "is_missing"
            ]
        }
    },
    {
        "id": 14,
        "prompt": "<strong>[Conditional Logic, Branching & Decision Making] SaaS Plan Feature Gate</strong><br/>Given plan = 'pro' and seats = 5, set can_add_member = (plan == 'enterprise') or (plan == 'pro' and seats < 10).",
        "starterCode": "# Write your code here\n",
        "ref": "plan = 'pro'\nseats = 5\ncan_add_member = (plan == 'enterprise') or (plan == 'pro' and seats < 10)\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "can_add_member"
            ]
        }
    },
    {
        "id": 15,
        "prompt": "<strong>[Conditional Logic, Branching & Decision Making] File Extension Detection</strong><br/>Given filename = 'report.csv', set file_type = 'CSV' if filename.endswith('.csv') else 'Other'.",
        "starterCode": "# Write your code here\n",
        "ref": "filename = 'report.csv'\nfile_type = 'CSV' if filename.endswith('.csv') else 'Other'\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "file_type"
            ]
        }
    },
    {
        "id": 16,
        "prompt": "<strong>[Conditional Logic, Branching & Decision Making] BMI Health Diagnostic</strong><br/>Given bmi = 26.4, set status = 'Underweight' if bmi < 18.5 else 'Normal' if bmi < 25 else 'Overweight'.",
        "starterCode": "# Write your code here\n",
        "ref": "bmi = 26.4\nstatus = 'Underweight' if bmi < 18.5 else 'Normal' if bmi < 25 else 'Overweight'\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "status"
            ]
        }
    },
    {
        "id": 17,
        "prompt": "<strong>[Conditional Logic, Branching & Decision Making] Whitespace Sanitization Guard</strong><br/>Given dirty_val = '   ', set clean_val = dirty_val.strip() if dirty_val.strip() else 'N/A'.",
        "starterCode": "# Write your code here\n",
        "ref": "dirty_val = '   '\nclean_val = dirty_val.strip() if dirty_val.strip() else 'N/A'\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "clean_val"
            ]
        }
    },
    {
        "id": 18,
        "prompt": "<strong>[Conditional Logic, Branching & Decision Making] Safe Integer Parse Guard</strong><br/>Given raw_s = '105', set num = int(raw_s) if raw_s.isdigit() else 0.",
        "starterCode": "# Write your code here\n",
        "ref": "raw_s = '105'\nnum = int(raw_s) if raw_s.isdigit() else 0\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "num"
            ]
        }
    },
    {
        "id": 19,
        "prompt": "<strong>[Conditional Logic, Branching & Decision Making] Weekend Calendar Check</strong><br/>Given day_num = 6, set is_weekend = day_num in (6, 7).",
        "starterCode": "# Write your code here\n",
        "ref": "day_num = 6\nis_weekend = day_num in (6, 7)\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "is_weekend"
            ]
        }
    },
    {
        "id": 20,
        "prompt": "<strong>[Conditional Logic, Branching & Decision Making] Bitwise Permission Mask</strong><br/>Given perms = 0b101 and read_mask = 0b001, set can_read = bool(perms & read_mask).",
        "starterCode": "# Write your code here\n",
        "ref": "perms = 0b101\nread_mask = 0b001\ncan_read = bool(perms & read_mask)\n",
        "validation": {
            "mode": "variables",
            "checkVars": [
                "can_read"
            ]
        }
    }
],
  "testQuestions": [
    {
        "id": 1,
        "title": "TQ-01: Conditional Logic, Branching & Decision Making Mastery #1",
        "prompt": "Solve practical interview test challenge #1 on Conditional Logic, Branching & Decision Making.",
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
        "title": "TQ-02: Conditional Logic, Branching & Decision Making Mastery #2",
        "prompt": "Solve practical interview test challenge #2 on Conditional Logic, Branching & Decision Making.",
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
        "title": "TQ-03: Conditional Logic, Branching & Decision Making Mastery #3",
        "prompt": "Solve practical interview test challenge #3 on Conditional Logic, Branching & Decision Making.",
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
        "title": "TQ-04: Conditional Logic, Branching & Decision Making Mastery #4",
        "prompt": "Solve practical interview test challenge #4 on Conditional Logic, Branching & Decision Making.",
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
        "title": "TQ-05: Conditional Logic, Branching & Decision Making Mastery #5",
        "prompt": "Solve practical interview test challenge #5 on Conditional Logic, Branching & Decision Making.",
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
        "title": "TQ-06: Conditional Logic, Branching & Decision Making Mastery #6",
        "prompt": "Solve practical interview test challenge #6 on Conditional Logic, Branching & Decision Making.",
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
        "title": "TQ-07: Conditional Logic, Branching & Decision Making Mastery #7",
        "prompt": "Solve practical interview test challenge #7 on Conditional Logic, Branching & Decision Making.",
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
        "title": "TQ-08: Conditional Logic, Branching & Decision Making Mastery #8",
        "prompt": "Solve practical interview test challenge #8 on Conditional Logic, Branching & Decision Making.",
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
        "title": "TQ-09: Conditional Logic, Branching & Decision Making Mastery #9",
        "prompt": "Solve practical interview test challenge #9 on Conditional Logic, Branching & Decision Making.",
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
        "title": "TQ-10: Conditional Logic, Branching & Decision Making Mastery #10",
        "prompt": "Solve practical interview test challenge #10 on Conditional Logic, Branching & Decision Making.",
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
        "title": "TQ-11: Conditional Logic, Branching & Decision Making Mastery #11",
        "prompt": "Solve practical interview test challenge #11 on Conditional Logic, Branching & Decision Making.",
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
        "title": "TQ-12: Conditional Logic, Branching & Decision Making Mastery #12",
        "prompt": "Solve practical interview test challenge #12 on Conditional Logic, Branching & Decision Making.",
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
        "title": "TQ-13: Conditional Logic, Branching & Decision Making Mastery #13",
        "prompt": "Solve practical interview test challenge #13 on Conditional Logic, Branching & Decision Making.",
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
        "title": "TQ-14: Conditional Logic, Branching & Decision Making Mastery #14",
        "prompt": "Solve practical interview test challenge #14 on Conditional Logic, Branching & Decision Making.",
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
        "title": "TQ-15: Conditional Logic, Branching & Decision Making Mastery #15",
        "prompt": "Solve practical interview test challenge #15 on Conditional Logic, Branching & Decision Making.",
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
        "title": "TQ-16: Conditional Logic, Branching & Decision Making Mastery #16",
        "prompt": "Solve practical interview test challenge #16 on Conditional Logic, Branching & Decision Making.",
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
        "title": "TQ-17: Conditional Logic, Branching & Decision Making Mastery #17",
        "prompt": "Solve practical interview test challenge #17 on Conditional Logic, Branching & Decision Making.",
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
        "title": "TQ-18: Conditional Logic, Branching & Decision Making Mastery #18",
        "prompt": "Solve practical interview test challenge #18 on Conditional Logic, Branching & Decision Making.",
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
        "title": "TQ-19: Conditional Logic, Branching & Decision Making Mastery #19",
        "prompt": "Solve practical interview test challenge #19 on Conditional Logic, Branching & Decision Making.",
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
        "title": "TQ-20: Conditional Logic, Branching & Decision Making Mastery #20",
        "prompt": "Solve practical interview test challenge #20 on Conditional Logic, Branching & Decision Making.",
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
        "title": "TQ-21: Conditional Logic, Branching & Decision Making Mastery #21",
        "prompt": "Solve practical interview test challenge #21 on Conditional Logic, Branching & Decision Making.",
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
        "title": "TQ-22: Conditional Logic, Branching & Decision Making Mastery #22",
        "prompt": "Solve practical interview test challenge #22 on Conditional Logic, Branching & Decision Making.",
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
        "title": "TQ-23: Conditional Logic, Branching & Decision Making Mastery #23",
        "prompt": "Solve practical interview test challenge #23 on Conditional Logic, Branching & Decision Making.",
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
        "title": "TQ-24: Conditional Logic, Branching & Decision Making Mastery #24",
        "prompt": "Solve practical interview test challenge #24 on Conditional Logic, Branching & Decision Making.",
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
        "title": "TQ-25: Conditional Logic, Branching & Decision Making Mastery #25",
        "prompt": "Solve practical interview test challenge #25 on Conditional Logic, Branching & Decision Making.",
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
