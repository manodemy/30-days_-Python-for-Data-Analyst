// Python Course Content — Day 19 (Merging, Joining & Concatenating DataFrames)
if (!window.COURSE_CONTENT) window.COURSE_CONTENT = {};
window.COURSE_CONTENT['pyDay23'] = {
  "day": 23,
  "title": "Merging & Joining DataFrames",
  "topics": [
    "Relational Operations (Merge vs Concat)",
    "pd.concat() Axis Concatenation",
    "pd.merge() Join Types",
    "Multi-Key Joins & Suffixes",
    "Fuzzy & Approximate Merging",
    "Index-Based Joins (.join)",
    "Combining Overlapping Data (combine_first)",
    "Merge Validation (validate param)",
    "Common Anti-Patterns",
    "Review & Interview Questions"
],
  "slides": [
    {
      "title": "Merging, Joining & Concatenating DataFrames",
      "html": "<style>\n  /* ══════════════════════════════════════════════════════════\n     BASE & DARK THEME (DEFAULT)\n     ══════════════════════════════════════════════════════════ */\n\n  /* ── Flagship Dual-Box Heading Architecture (SQL Day 01 Parity) ── */\n  .heading-box-wrap,\n  .slide-section-title.heading-box-wrap {\n    display: flex !important;\n    align-items: stretch !important;\n    gap: 0 !important;\n    background: transparent !important;\n    border: none !important;\n    padding: 0 !important;\n    margin: 24px 0 14px 0 !important;\n    filter: drop-shadow(0 4px 14px rgba(0, 0, 0, 0.35)) !important;\n  }\n  .slide-section:first-child .heading-box-wrap {\n    margin-top: 4px !important;\n  }\n\n  /* Left Box: Monospace Number Badge */\n  .heading-num-box {\n    display: inline-flex !important;\n    align-items: center !important;\n    justify-content: center !important;\n    background: linear-gradient(135deg, #6366f1, #8b5cf6) !important;\n    color: #ffffff !important;\n    font-family: 'JetBrains Mono', var(--mono, monospace) !important;\n    font-size: 0.88rem !important;\n    font-weight: 800 !important;\n    letter-spacing: 0.05em !important;\n    padding: 8px 14px !important;\n    border-radius: 8px 0 0 8px !important;\n    border: 1px solid rgba(139, 92, 246, 0.6) !important;\n    border-right: none !important;\n    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.25) !important;\n    flex-shrink: 0 !important;\n    min-width: 44px !important;\n    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3) !important;\n  }\n\n  /* Right Box: Matte Title Box */\n  .heading-title-box {\n    display: flex !important;\n    align-items: center !important;\n    justify-content: space-between !important;\n    flex: 1 !important;\n    background: #0f172a !important;\n    border: 1px solid rgba(255, 255, 255, 0.08) !important;\n    border-left: 1px solid rgba(139, 92, 246, 0.4) !important;\n    border-radius: 0 8px 8px 0 !important;\n    padding: 8px 16px !important;\n    color: #f8fafc !important;\n    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05) !important;\n  }\n\n  .heading-title-text {\n    flex: 1 !important;\n    color: #f8fafc !important;\n    font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif !important;\n    font-size: 1.05rem !important;\n    font-weight: 800 !important;\n    letter-spacing: -0.015em !important;\n    line-height: 1.35 !important;\n    display: flex !important;\n    align-items: center !important;\n    gap: 10px !important;\n  }\n\n  /* Audio Play Button in Heading */\n  .heading-title-box .audio-play-btn,\n  .heading-with-audio .audio-play-btn {\n    width: 26px !important;\n    height: 26px !important;\n    min-width: 26px !important;\n    min-height: 26px !important;\n    max-width: 26px !important;\n    max-height: 26px !important;\n    border-radius: 6px !important;\n    border: 1px solid rgba(255, 255, 255, 0.14) !important;\n    background: rgba(255, 255, 255, 0.08) !important;\n    color: #94a3b8 !important;\n    cursor: pointer !important;\n    display: inline-flex !important;\n    align-items: center !important;\n    justify-content: center !important;\n    padding: 0 !important;\n    margin: 0 !important;\n    flex-shrink: 0 !important;\n    transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease, transform 0.15s ease !important;\n  }\n\n  .heading-title-box .audio-play-btn:hover,\n  .heading-with-audio .audio-play-btn:hover {\n    background: #ef4444 !important;\n    border-color: #ef4444 !important;\n    color: #ffffff !important;\n    box-shadow: 0 0 10px rgba(239, 68, 68, 0.45) !important;\n    transform: scale(1.05) !important;\n  }\n\n  .heading-title-box .audio-play-btn.playing,\n  .heading-with-audio .audio-play-btn.playing {\n    background: #ef4444 !important;\n    border-color: #ef4444 !important;\n    color: #ffffff !important;\n    box-shadow: 0 0 12px rgba(239, 68, 68, 0.5) !important;\n  }\n\n  .slide-section h1,\n  .slide-section h2,\n  .slide-section h3,\n  .slide-section h4 {\n    font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif !important;\n    color: #f8fafc !important;\n    letter-spacing: -0.015em !important;\n  }\n\n  .section-intro-text {\n    font-size: 0.88rem !important;\n    line-height: 1.65 !important;\n    color: #cbd5e1 !important;\n    margin: 10px 0 14px 0 !important;\n  }\n\n  /* Topic Subcard */\n  .topic-subcard {\n    background: linear-gradient(135deg, rgba(15, 23, 42, 0.96) 0%, rgba(8, 14, 28, 0.98) 100%) !important;\n    border: 1px solid rgba(255, 255, 255, 0.08) !important;\n    border-radius: 12px !important;\n    padding: 16px 18px !important;\n    margin: 16px 0 !important;\n    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.05) !important;\n  }\n\n  .table-header-wrap {\n    display: flex !important;\n    align-items: center !important;\n    justify-content: space-between !important;\n    gap: 10px !important;\n    margin-bottom: 12px !important;\n    padding-bottom: 8px !important;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;\n  }\n\n  .table-header-title {\n    margin: 0 !important;\n    font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif !important;\n    font-size: 0.92rem !important;\n    font-weight: 700 !important;\n    color: #f8fafc !important;\n    letter-spacing: -0.01em !important;\n  }\n\n  /* ══════════════════════════════════════════════════════════\n     2D FROZEN TABLES (COLUMN 1 STICKY AT LEFT:0, ZERO BLEED)\n     ══════════════════════════════════════════════════════════ */\n  .db-mock-table-wrap {\n    width: 100% !important;\n    overflow-x: auto !important;\n    -webkit-overflow-scrolling: touch;\n    margin: 14px 0 !important;\n    border-radius: 10px !important;\n    border: 1px solid rgba(255, 255, 255, 0.08) !important;\n    background: #090d16 !important;\n  }\n\n  .db-table-mock {\n    min-width: 680px !important;\n    width: 100% !important;\n    border-collapse: separate !important;\n    border-spacing: 0 !important;\n    font-size: 0.82rem !important;\n    color: #e2e8f0 !important;\n  }\n\n  .db-table-mock th {\n    background: #111a30 !important;\n    color: #38bdf8 !important;\n    font-family: 'JetBrains Mono', monospace !important;\n    font-size: 0.72rem !important;\n    font-weight: 700 !important;\n    text-transform: uppercase !important;\n    letter-spacing: 0.05em !important;\n    padding: 10px 14px !important;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.12) !important;\n    text-align: left !important;\n    vertical-align: middle !important;\n  }\n\n  .db-table-mock td {\n    padding: 9px 14px !important;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.05) !important;\n    vertical-align: middle !important;\n    line-height: 1.5 !important;\n  }\n\n  .db-table-mock tr:last-child td {\n    border-bottom: none !important;\n  }\n\n  .db-table-mock tr:hover td {\n    background: rgba(56, 189, 248, 0.04) !important;\n  }\n\n  /* Sticky First Column Mechanics */\n  .arith-sticky-table th:first-child {\n    position: sticky !important;\n    left: 0 !important;\n    z-index: 30 !important;\n    background-color: #111a30 !important;\n    border-right: 2px solid rgba(56, 189, 248, 0.38) !important;\n    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.4) !important;\n  }\n\n  .arith-sticky-table td:first-child {\n    position: sticky !important;\n    left: 0 !important;\n    z-index: 10 !important;\n    background-color: #0d1527 !important;\n    border-right: 2px solid rgba(56, 189, 248, 0.38) !important;\n    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.4) !important;\n    font-weight: 600 !important;\n  }\n\n  .arith-sticky-table tr:hover td:first-child {\n    background-color: #131e38 !important;\n  }\n\n  /* ══════════════════════════════════════════════════════════\n     macOS IDE CODE SUBCARDS (TRAFFIC LIGHTS & SYNTAX TOKENS)\n     ══════════════════════════════════════════════════════════ */\n  .mental-model-card {\n    background: #090d16 !important;\n    border: 1px solid rgba(255, 255, 255, 0.08) !important;\n    border-radius: 10px !important;\n    overflow: hidden !important;\n    margin: 16px 0 !important;\n    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4) !important;\n  }\n\n  .code-subblock-traffic-lights {\n    display: flex !important;\n    align-items: center !important;\n    gap: 6px !important;\n    padding: 9px 14px !important;\n    background: #0f172a !important;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;\n  }\n\n  .traffic-light-dot {\n    width: 10px !important;\n    height: 10px !important;\n    border-radius: 50% !important;\n    display: inline-block !important;\n  }\n\n  .traffic-light-dot.red { background: #ff5f56 !important; }\n  .traffic-light-dot.yellow { background: #ffbd2e !important; }\n  .traffic-light-dot.green { background: #27c93f !important; }\n\n  .code-subblock-title {\n    margin-left: 8px !important;\n    font-family: 'JetBrains Mono', monospace !important;\n    font-size: 0.74rem !important;\n    color: #94a3b8 !important;\n    font-weight: 600 !important;\n    letter-spacing: 0.02em !important;\n  }\n\n  .py-code-box {\n    margin: 0 !important;\n    padding: 14px 16px !important;\n    background: #080c14 !important;\n    overflow-x: auto !important;\n  }\n\n  .py-code-box pre {\n    margin: 0 !important;\n    padding: 0 !important;\n    font-family: 'JetBrains Mono', monospace !important;\n    font-size: 0.78rem !important;\n    line-height: 1.65 !important;\n    color: #f8fafc !important;\n  }\n\n  /* Syntax Token Colors */\n  .code-keyword { color: #f43f5e !important; font-weight: 700 !important; }\n  .code-builtin { color: #38bdf8 !important; font-weight: 600 !important; }\n  .code-string { color: #34d399 !important; }\n  .code-number { color: #fbbf24 !important; }\n  .code-comment { color: #64748b !important; font-style: italic !important; }\n\n  /* ══════════════════════════════════════════════════════════\n     CRIMSON ANTI-PATTERN DIAGNOSTIC CARDS\n     ══════════════════════════════════════════════════════════ */\n  .anti-pattern-card {\n    background: linear-gradient(135deg, rgba(244, 63, 94, 0.08) 0%, rgba(15, 23, 42, 0.85) 100%) !important;\n    border: 1px solid rgba(244, 63, 94, 0.3) !important;\n    border-left: 4px solid #f43f5e !important;\n    border-radius: 12px !important;\n    padding: 18px 20px !important;\n    margin: 22px 0 14px 0 !important;\n    box-shadow: 0 8px 24px -4px rgba(0, 0, 0, 0.35) !important;\n  }\n\n  .anti-pattern-header {\n    display: flex !important;\n    align-items: center !important;\n    gap: 10px !important;\n    margin-bottom: 12px !important;\n  }\n\n  .anti-pattern-icon {\n    width: 32px !important;\n    height: 32px !important;\n    border-radius: 8px !important;\n    background: rgba(244, 63, 94, 0.15) !important;\n    border: 1px solid rgba(244, 63, 94, 0.35) !important;\n    display: flex !important;\n    align-items: center !important;\n    justify-content: center !important;\n    font-size: 1.1rem !important;\n    color: #fb7185 !important;\n    flex-shrink: 0 !important;\n  }\n\n  .anti-pattern-title {\n    font-family: 'JetBrains Mono', monospace !important;\n    font-size: 0.78rem !important;\n    font-weight: 800 !important;\n    text-transform: uppercase !important;\n    letter-spacing: 0.08em !important;\n    color: #fb7185 !important;\n  }\n\n  .anti-pattern-tag {\n    font-size: 0.65rem !important;\n    padding: 2px 8px !important;\n    border-radius: 4px !important;\n    background: rgba(244, 63, 94, 0.2) !important;\n    color: #fca5a5 !important;\n    font-weight: 700 !important;\n  }\n\n  .anti-pattern-grid {\n    display: grid !important;\n    grid-template-columns: 1fr 1fr !important;\n    gap: 14px !important;\n  }\n\n  @media (max-width: 768px) {\n    .anti-pattern-grid { grid-template-columns: 1fr !important; }\n  }\n\n  .ap-side-box {\n    padding: 12px 14px !important;\n    border-radius: 8px !important;\n    font-size: 0.82rem !important;\n    line-height: 1.5 !important;\n  }\n\n  .ap-bad-box {\n    background: rgba(244, 63, 94, 0.08) !important;\n    border: 1px solid rgba(244, 63, 94, 0.25) !important;\n    color: #fecdd3 !important;\n  }\n\n  .ap-good-box {\n    background: rgba(16, 185, 129, 0.08) !important;\n    border: 1px solid rgba(16, 185, 129, 0.25) !important;\n    color: #a7f3d0 !important;\n  }\n\n  .ap-box-label {\n    font-family: 'JetBrains Mono', monospace !important;\n    font-size: 0.70rem !important;\n    font-weight: 800 !important;\n    text-transform: uppercase !important;\n    letter-spacing: 0.06em !important;\n    margin-bottom: 6px !important;\n    display: flex !important;\n    align-items: center !important;\n    gap: 6px !important;\n  }\n\n  .ap-bad-box .ap-box-label { color: #f87171 !important; }\n  .ap-good-box .ap-box-label { color: #34d399 !important; }\n\n  .ap-side-box pre {\n    margin: 6px 0 0 0 !important;\n    padding: 8px 10px !important;\n    border-radius: 6px !important;\n    background: rgba(0, 0, 0, 0.35) !important;\n    font-family: 'JetBrains Mono', monospace !important;\n    font-size: 0.78rem !important;\n  }\n\n  .ap-code-bad {\n    color: #f87171 !important;\n    background: rgba(244, 63, 94, 0.15) !important;\n    padding: 2px 6px !important;\n    border-radius: 4px !important;\n  }\n\n  .ap-code-fix {\n    color: #34d399 !important;\n    background: rgba(16, 185, 129, 0.15) !important;\n    padding: 2px 6px !important;\n    border-radius: 4px !important;\n  }\n\n  .ap-result-bad {\n    color: #fca5a5 !important;\n    font-weight: 600 !important;\n  }\n\n  /* ══════════════════════════════════════════════════════════\n     SENIOR ANALYST / FAANG INTERVIEW SPOTLIGHT\n     ══════════════════════════════════════════════════════════ */\n  .interview-item {\n    margin: 16px 0 !important;\n    padding: 4px 0 !important;\n  }\n\n  .interview-question {\n    font-size: 0.88rem !important;\n    color: #38bdf8 !important;\n    margin-bottom: 8px !important;\n    line-height: 1.5 !important;\n  }\n\n  .interview-answer {\n    font-size: 0.82rem !important;\n    line-height: 1.6 !important;\n    color: #cbd5e1 !important;\n    padding-left: 12px !important;\n    border-left: 2px solid rgba(56, 189, 248, 0.3) !important;\n  }\n\n  .interview-divider {\n    border: none !important;\n    border-top: 1px solid rgba(255, 255, 255, 0.06) !important;\n    margin: 16px 0 !important;\n  }\n\n  /* Badges */\n  .py-badge {\n    font-family: 'JetBrains Mono', monospace !important;\n    font-size: 0.68rem !important;\n    font-weight: 700 !important;\n    padding: 2px 8px !important;\n    border-radius: 4px !important;\n    background: rgba(56, 189, 248, 0.12) !important;\n    border: 1px solid rgba(56, 189, 248, 0.28) !important;\n    color: #38bdf8 !important;\n  }\n\n  .py-badge-gold {\n    background: rgba(245, 158, 11, 0.12) !important;\n    border-color: rgba(245, 158, 11, 0.28) !important;\n    color: #fbbf24 !important;\n  }\n\n  .py-badge-green {\n    background: rgba(34, 197, 94, 0.12) !important;\n    border-color: rgba(34, 197, 94, 0.28) !important;\n    color: #4ade80 !important;\n  }\n\n  .py-badge-rose {\n    background: rgba(244, 63, 94, 0.12) !important;\n    border-color: rgba(244, 63, 94, 0.28) !important;\n    color: #fb7185 !important;\n  }\n\n  /* ══════════════════════════════════════════════════════════\n     LIGHT MODE THEME ADAPTATIONS ([data-theme=\"light\"])\n     ══════════════════════════════════════════════════════════ */\n  [data-theme=\"light\"] .heading-box-wrap {\n    filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.16)) !important;\n  }\n\n  [data-theme=\"light\"] .heading-num-box {\n    background: linear-gradient(135deg, #6366f1, #8b5cf6) !important;\n    color: #ffffff !important;\n  }\n\n  [data-theme=\"light\"] .heading-title-box {\n    background: #0f172a !important; /* Retains obsidian matte */\n    color: #f8fafc !important;\n  }\n\n  [data-theme=\"light\"] .slide-section h1,\n  [data-theme=\"light\"] .slide-section h2,\n  [data-theme=\"light\"] .slide-section h3,\n  [data-theme=\"light\"] .slide-section h4 {\n    color: #0f172a !important;\n  }\n\n  [data-theme=\"light\"] .section-intro-text {\n    color: #334155 !important;\n  }\n\n  [data-theme=\"light\"] .topic-subcard {\n    background: #ffffff !important;\n    border-color: #e2e8f0 !important;\n    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05) !important;\n  }\n\n  [data-theme=\"light\"] .table-header-wrap {\n    border-bottom-color: #e2e8f0 !important;\n  }\n\n  [data-theme=\"light\"] .table-header-title {\n    color: #0f172a !important;\n  }\n\n  [data-theme=\"light\"] .db-mock-table-wrap {\n    background: #ffffff !important;\n    border-color: #e2e8f0 !important;\n  }\n\n  [data-theme=\"light\"] .db-table-mock {\n    color: #1e293b !important;\n  }\n\n  [data-theme=\"light\"] .db-table-mock th {\n    background: #f1f5f9 !important;\n    color: #0369a1 !important;\n    border-bottom-color: #cbd5e1 !important;\n  }\n\n  [data-theme=\"light\"] .db-table-mock td {\n    border-bottom-color: #f1f5f9 !important;\n  }\n\n  [data-theme=\"light\"] .db-table-mock tr:hover td {\n    background: #f8fafc !important;\n  }\n\n  [data-theme=\"light\"] .arith-sticky-table th:first-child {\n    background-color: #f1f5f9 !important;\n    border-right-color: #cbd5e1 !important;\n    box-shadow: 2px 0 6px rgba(0, 0, 0, 0.06) !important;\n  }\n\n  [data-theme=\"light\"] .arith-sticky-table td:first-child {\n    background-color: #ffffff !important;\n    border-right-color: #cbd5e1 !important;\n    box-shadow: 2px 0 6px rgba(0, 0, 0, 0.06) !important;\n  }\n\n  [data-theme=\"light\"] .arith-sticky-table tr:hover td:first-child {\n    background-color: #f8fafc !important;\n  }\n\n  [data-theme=\"light\"] .mental-model-card {\n    background: #ffffff !important;\n    border-color: #cbd5e1 !important;\n    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06) !important;\n  }\n\n  [data-theme=\"light\"] .code-subblock-traffic-lights {\n    background: #f8fafc !important;\n    border-bottom-color: #e2e8f0 !important;\n  }\n\n  [data-theme=\"light\"] .code-subblock-title {\n    color: #475569 !important;\n  }\n\n  [data-theme=\"light\"] .py-code-box {\n    background: #f8fafc !important;\n  }\n\n  [data-theme=\"light\"] .py-code-box pre {\n    color: #0f172a !important;\n  }\n\n  [data-theme=\"light\"] .anti-pattern-card {\n    background: linear-gradient(135deg, #fff1f2 0%, #ffffff 100%) !important;\n    border-color: rgba(244, 63, 94, 0.3) !important;\n    border-left-color: #e11d48 !important;\n    box-shadow: 0 4px 16px rgba(244, 63, 94, 0.1) !important;\n  }\n\n  [data-theme=\"light\"] .ap-bad-box {\n    background: #fff1f2 !important;\n    border-color: #fecdd3 !important;\n    color: #9f1239 !important;\n  }\n\n  [data-theme=\"light\"] .ap-good-box {\n    background: #f0fdf4 !important;\n    border-color: #bbf7d0 !important;\n    color: #166534 !important;\n  }\n\n  [data-theme=\"light\"] .ap-side-box pre {\n    background: #ffffff !important;\n    border: 1px solid #e2e8f0 !important;\n    color: #0f172a !important;\n  }\n\n  [data-theme=\"light\"] .interview-question {\n    color: #0284c7 !important;\n  }\n\n  [data-theme=\"light\"] .interview-answer {\n    color: #334155 !important;\n    border-left-color: rgba(2, 132, 199, 0.3) !important;\n  }\n\n  [data-theme=\"light\"] .interview-divider {\n    border-top-color: #e2e8f0 !important;\n  }\n\n  /* ── 2D Frozen Table System (Manodemy Gold Standard Parity) ── */\n  .db-mock-table-wrap {\n    max-height: 540px !important;\n    overflow: auto !important;\n    position: relative !important;\n    border-radius: 0 0 8px 8px !important;\n  }\n  .db-mock-table-wrap thead th {\n    position: sticky !important;\n    top: 0 !important;\n    z-index: 12 !important;\n    background-color: #0f172a !important;\n  }\n  .db-mock-table-wrap tbody td:first-child,\n  .db-mock-table-wrap thead th:first-child {\n    position: sticky !important;\n    left: 0 !important;\n    z-index: 15 !important;\n    background-color: #0f172a !important;\n  }\n  .db-mock-table-wrap thead th:first-child {\n    z-index: 25 !important;\n  }\n  [data-theme=\"light\"] .db-mock-table-wrap thead th {\n    background-color: #f1f5f9 !important;\n  }\n  [data-theme=\"light\"] .db-mock-table-wrap tbody td:first-child,\n  [data-theme=\"light\"] .db-mock-table-wrap thead th:first-child {\n    background-color: #ffffff !important;\n  }\n\n\n  /* ═════════════════════════════════════════════════════════════════════\n     MANODEMY UNIVERSAL 2D FROZEN TABLE SYSTEM (FLAGSHIP DAY 04 PARITY)\n     ═════════════════════════════════════════════════════════════════════ */\n  .db-mock-table-wrap {\n    position: relative !important;\n    overflow: auto !important;\n    overflow-x: auto !important;\n    overflow-y: auto !important;\n    max-height: 520px !important;\n    -webkit-overflow-scrolling: touch !important;\n    border-radius: 0 0 12px 12px !important;\n    border: 1px solid rgba(56, 189, 248, 0.25) !important;\n    border-top: none !important;\n    background: #090e1a !important;\n    box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.35) !important;\n    margin: 0 0 16px 0 !important;\n  }\n  .db-mock-table-wrap::-webkit-scrollbar {\n    width: 8px !important;\n    height: 8px !important;\n  }\n  .db-mock-table-wrap::-webkit-scrollbar-track {\n    background: #0d1527 !important;\n    border-radius: 4px !important;\n  }\n  .db-mock-table-wrap::-webkit-scrollbar-thumb {\n    background: rgba(56, 189, 248, 0.35) !important;\n    border-radius: 4px !important;\n  }\n  .db-mock-table-wrap::-webkit-scrollbar-thumb:hover {\n    background: rgba(56, 189, 248, 0.6) !important;\n  }\n\n  .db-table-mock {\n    border-collapse: separate !important;\n    border-spacing: 0 !important;\n    overflow: visible !important;\n    margin: 0 !important;\n    font-size: 0.85rem !important;\n    width: 100% !important;\n    min-width: 960px !important;\n    table-layout: auto !important;\n  }\n\n  .db-table-mock thead th {\n    position: -webkit-sticky !important;\n    position: sticky !important;\n    top: 0 !important;\n    z-index: 20 !important;\n    background-color: #131d35 !important;\n    color: #e2e8f0 !important;\n    font-weight: 700 !important;\n    font-size: 0.82rem !important;\n    letter-spacing: 0.02em !important;\n    text-transform: none !important;\n    padding: 13px 16px !important;\n    border-bottom: 2px solid rgba(56, 189, 248, 0.35) !important;\n    box-sizing: border-box !important;\n    vertical-align: middle !important;\n  }\n\n  .db-table-mock thead th:nth-child(1) {\n    position: -webkit-sticky !important;\n    position: sticky !important;\n    top: 0 !important;\n    left: 0 !important;\n    z-index: 30 !important;\n    background-color: #111a30 !important;\n    border-right: 2px solid rgba(56, 189, 248, 0.38) !important;\n    border-bottom: 2px solid rgba(56, 189, 248, 0.38) !important;\n    box-shadow: 4px 4px 14px -2px rgba(0, 0, 0, 0.55) !important;\n    color: #f8fafc !important;\n  }\n\n  .db-table-mock tbody td:nth-child(1) {\n    position: -webkit-sticky !important;\n    position: sticky !important;\n    left: 0 !important;\n    top: auto !important;\n    z-index: 10 !important;\n    box-sizing: border-box !important;\n    background-color: #0d1527 !important;\n    border-right: 2px solid rgba(56, 189, 248, 0.38) !important;\n    box-shadow: 4px 0 14px -2px rgba(0, 0, 0, 0.55) !important;\n    text-align: left !important;\n    padding: 12px 16px !important;\n    vertical-align: middle !important;\n    white-space: nowrap !important;\n  }\n\n  .db-table-mock tbody tr:hover td:nth-child(1) {\n    background-color: #162038 !important;\n    background: #162038 !important;\n    opacity: 1 !important;\n    z-index: 15 !important;\n    border-right: 2px solid rgba(56, 189, 248, 0.5) !important;\n  }\n\n  .db-table-mock tbody tr:hover td:not(:first-child) {\n    background-color: rgba(56, 189, 248, 0.05) !important;\n  }\n\n  .db-table-mock td:nth-child(1) code {\n    display: inline-flex !important;\n    align-items: center !important;\n    max-width: 100% !important;\n    min-height: 28px !important;\n    padding: 4px 10px !important;\n    font-family: 'JetBrains Mono', monospace !important;\n    font-weight: 700 !important;\n    font-size: 0.82rem !important;\n    background: rgba(56, 189, 248, 0.12) !important;\n    border: 1px solid rgba(56, 189, 248, 0.35) !important;\n    border-radius: 6px !important;\n    color: #38bdf8 !important;\n    white-space: nowrap !important;\n    letter-spacing: -0.01em !important;\n  }\n\n\n  /* ═════════════════════════════════════════════════════════════════════\n     MANODEMY UNIVERSAL TABLE COLOR SCIENCE ENGINE (DARK & LIGHT THEMES)\n     100% Parity with Flagship Python Days 01–05\n     ═════════════════════════════════════════════════════════════════════ */\n\n  /* ── 1. DARK MODE (DEFAULT) TABLE FONT COLORS ── */\n  .db-table-mock thead th {\n    color: #e2e8f0 !important;\n    font-family: 'Outfit', -apple-system, sans-serif !important;\n    font-weight: 700 !important;\n    font-size: 0.82rem !important;\n    letter-spacing: 0.02em !important;\n    background-color: #131d35 !important;\n    border-bottom: 2px solid rgba(56, 189, 248, 0.35) !important;\n  }\n\n  .db-table-mock thead th:nth-child(1) {\n    color: #f8fafc !important;\n    font-weight: 800 !important;\n    background-color: #111a30 !important;\n    border-right: 2px solid rgba(56, 189, 248, 0.38) !important;\n    border-bottom: 2px solid rgba(56, 189, 248, 0.38) !important;\n  }\n\n  .db-table-mock td {\n    color: #cbd5e1 !important;\n    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;\n    font-size: 0.85rem !important;\n    line-height: 1.55 !important;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.06) !important;\n  }\n\n  .db-table-mock td strong {\n    color: #f8fafc !important;\n    font-weight: 700 !important;\n  }\n\n  .db-table-mock td em {\n    color: #94a3b8 !important;\n    font-style: italic !important;\n  }\n\n  /* Column 1 Code Badge (Electric Cyan) */\n  .db-table-mock td:nth-child(1) code {\n    color: #38bdf8 !important;\n    background: rgba(56, 189, 248, 0.12) !important;\n    border: 1px solid rgba(56, 189, 248, 0.35) !important;\n    border-radius: 6px !important;\n    font-family: 'JetBrains Mono', 'Fira Code', monospace !important;\n    font-size: 0.82rem !important;\n    font-weight: 700 !important;\n    letter-spacing: -0.01em !important;\n    padding: 4px 10px !important;\n  }\n\n  /* Regular Data Columns Code Tags */\n  .db-table-mock td:not(:first-child) code,\n  .db-table-mock td code {\n    color: #f1f5f9 !important;\n    background: rgba(15, 23, 42, 0.7) !important;\n    border: 1px solid rgba(255, 255, 255, 0.12) !important;\n    border-radius: 5px !important;\n    font-family: 'JetBrains Mono', 'Fira Code', monospace !important;\n    font-size: 0.81rem !important;\n    line-height: 1.45 !important;\n    padding: 3px 8px !important;\n  }\n\n  /* Anti-Pattern Table Colors (Dark Mode) */\n  .anti-pattern-table thead th:nth-child(1) {\n    background-color: #1a162b !important;\n    color: #fca5a5 !important;\n    border-bottom: 2px solid rgba(244, 63, 94, 0.4) !important;\n    border-right: 2px solid rgba(244, 63, 94, 0.4) !important;\n  }\n\n  .anti-pattern-table thead th:nth-child(2) {\n    color: #6ee7b7 !important;\n  }\n\n  .anti-pattern-table tbody td:nth-child(1) code {\n    background: rgba(244, 63, 94, 0.14) !important;\n    border: 1px solid rgba(244, 63, 94, 0.38) !important;\n    color: #fda4af !important;\n  }\n\n  .anti-pattern-table tbody td:nth-child(2) code,\n  .anti-pattern-table tbody td:nth-child(4) code {\n    background: rgba(16, 185, 129, 0.12) !important;\n    border: 1px solid rgba(16, 185, 129, 0.35) !important;\n    color: #6ee7b7 !important;\n  }\n\n  .anti-pattern-table .ap-result-bad, .anti-pattern-table .ap-bad-text {\n    color: #fb7185 !important;\n  }\n  .anti-pattern-table .ap-result-good, .anti-pattern-table .ap-good-text {\n    color: #34d399 !important;\n  }\n\n  /* ── 2. LIGHT MODE ([data-theme=\"light\"]) TABLE FONT COLORS ── */\n  [data-theme=\"light\"] .db-table-mock thead th {\n    color: #0369a1 !important;\n    background-color: #f8fafc !important;\n    border-bottom: 2px solid #cbd5e1 !important;\n    font-weight: 700 !important;\n  }\n\n  [data-theme=\"light\"] .db-table-mock thead th:nth-child(1) {\n    color: #0f172a !important;\n    background-color: #f1f5f9 !important;\n    border-right: 2px solid #cbd5e1 !important;\n    border-bottom: 2px solid #cbd5e1 !important;\n    font-weight: 800 !important;\n  }\n\n  [data-theme=\"light\"] .db-table-mock td {\n    color: #334155 !important;\n    border-bottom: 1px solid #e2e8f0 !important;\n  }\n\n  [data-theme=\"light\"] .db-table-mock td strong {\n    color: #0f172a !important;\n    font-weight: 700 !important;\n  }\n\n  [data-theme=\"light\"] .db-table-mock td em {\n    color: #64748b !important;\n  }\n\n  /* Column 1 Code Badge (Crisp Azure Blue) */\n  [data-theme=\"light\"] .db-table-mock td:nth-child(1) code {\n    color: #0284c7 !important;\n    background: #e0f2fe !important;\n    border: 1px solid #7dd3fc !important;\n  }\n\n  /* Regular Data Columns Code Tags (Light Mode) */\n  [data-theme=\"light\"] .db-table-mock td:not(:first-child) code,\n  [data-theme=\"light\"] .db-table-mock td code {\n    color: #0f172a !important;\n    background: #f1f5f9 !important;\n    border: 1px solid #e2e8f0 !important;\n  }\n\n  /* Anti-Pattern Table Colors (Light Mode) */\n  [data-theme=\"light\"] .anti-pattern-table thead th:nth-child(1) {\n    background-color: #fff1f2 !important;\n    color: #be123c !important;\n    border-bottom: 2px solid #fecdd3 !important;\n    border-right: 2px solid #fecdd3 !important;\n  }\n\n  [data-theme=\"light\"] .anti-pattern-table thead th:nth-child(2) {\n    color: #059669 !important;\n  }\n\n  [data-theme=\"light\"] .anti-pattern-table tbody td:nth-child(1) code {\n    background: #ffe4e6 !important;\n    border-color: #fecdd3 !important;\n    color: #e11d48 !important;\n  }\n\n  [data-theme=\"light\"] .anti-pattern-table tbody td:nth-child(2) code,\n  [data-theme=\"light\"] .anti-pattern-table tbody td:nth-child(4) code {\n    background: #ecfdf5 !important;\n    border-color: #a7f3d0 !important;\n    color: #059669 !important;\n  }\n\n  [data-theme=\"light\"] .anti-pattern-table .ap-result-bad, [data-theme=\"light\"] .anti-pattern-table .ap-bad-text {\n    color: #e11d48 !important;\n  }\n  [data-theme=\"light\"] .anti-pattern-table .ap-result-good, [data-theme=\"light\"] .anti-pattern-table .ap-good-text {\n    color: #059669 !important;\n  }\n</style>\n\n  <!-- ══════════════════════════════════════════════════════════\n       SECTION 01: THE RELATIONAL ALGEBRA MENTAL MODEL\n       ══════════════════════════════════════════════════════════ -->\n  <section id=\"day19RelationalSection\" class=\"slide-section\">\n    <h2 class=\"slide-section-title heading-box-wrap heading-with-audio\" id=\"headingRelational\">\n      <span class=\"heading-num-box\">01</span>\n      <span class=\"heading-title-box\">\n        <span class=\"heading-title-text\">Relational Operations (Merge vs Concat)</span>\n        <button class=\"audio-play-btn\" onclick=\"playAudio('Day19/New_PyDay19Audio01.mp3', this)\" title=\"Play narration\">\n          <svg class=\"audio-play-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><polygon points=\"5 3 19 12 5 21 5 3\"></polygon></svg>\n          <svg class=\"audio-pause-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><rect x=\"6\" y=\"4\" width=\"4\" height=\"16\"></rect><rect x=\"14\" y=\"4\" width=\"4\" height=\"16\"></rect></svg>\n        </button>\n      </span>\n    </h2>\n    <p class=\"section-intro-text\">Data rarely lives in a solitary table. Enterprise data architectures segregate facts, dimensions, and transactional events across distinct schemas. In pandas, combining DataFrames is governed by three primary primitives corresponding directly to foundational relational algebra: <code>pd.merge()</code>, <code>DataFrame.join()</code>, and <code>pd.concat()</code>. Choosing the exact appropriate tool determines pipeline correctness, memory footprint, and computational complexity.</p>\n\n    <!-- 2D Frozen Sticky Table: 3 Core Combination Paradigms -->\n    <div class=\"topic-subcard\" id=\"day19ThreeToolsTableSection\">\n      <div class=\"table-header-wrap\">\n        <h4 class=\"table-header-title\">The Three Relational Combination Primitives in Pandas</h4>\n        <div class=\"table-header-actions\">\n        <div class=\"table-search-box\">\n        <svg class=\"table-search-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"11\" cy=\"11\" r=\"8\"></circle><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"></line></svg>\n        <input type=\"text\" class=\"table-search-input\" placeholder=\"Filter table...\" onkeyup=\"filterTable(this)\">\n        </div>\n        </div>\n      </div>\n      <div class=\"db-mock-table-wrap\">\n        <table class=\"db-table-mock arith-sticky-table\">\n          <thead>\n            <tr>\n              <th>Combination Tool</th>\n              <th>SQL Equivalent</th>\n              <th>Combination Vector</th>\n              <th>Key Alignment Basis</th>\n              <th>Primary Production Use Case</th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr>\n              <td><code>pd.merge(a, b, on=...)</code></td>\n              <td><code>JOIN</code> / <code>INNER</code> / <code>LEFT</code></td>\n              <td>Column Enrichment</td>\n              <td>Shared Key Columns (e.g., <code>id</code>)</td>\n              <td>Joining transactions to dimension lookups by key values</td>\n            </tr>\n            <tr>\n              <td><code>left.join(right)</code></td>\n              <td><code>JOIN ... ON l.id = r.id</code></td>\n              <td>Column Enrichment</td>\n              <td>Row Index Labels (<code>index</code>)</td>\n              <td>Combining frames already indexed by primary business key</td>\n            </tr>\n            <tr>\n              <td><code>pd.concat([a, b], axis=0)</code></td>\n              <td><code>UNION ALL</code></td>\n              <td>Row Stacking</td>\n              <td>Column Headers</td>\n              <td>Appending periodic monthly/daily batch log files</td>\n            </tr>\n            <tr>\n              <td><code>pd.concat([a, b], axis=1)</code></td>\n              <td>Horizontal Stitch</td>\n              <td>Side-by-Side Columns</td>\n              <td>Row Index Labels</td>\n              <td>Assembling independent feature vectors for ML pipelines</td>\n            </tr>\n          </tbody>\n        </table>\n      </div>\n    </div>\n\n    <!-- macOS IDE Card: Three Combining Paradigms -->\n    <div class=\"mental-model-card\">\n      <div class=\"code-subblock-traffic-lights\">\n        <span class=\"traffic-light-dot red\"></span>\n        <span class=\"traffic-light-dot yellow\"></span>\n        <span class=\"traffic-light-dot green\"></span>\n        <span class=\"code-subblock-title\">01_combining_primitives.py — merge vs join vs concat</span>\n      </div>\n      <div class=\"py-code-box\">\n        <pre><code><span class=\"code-keyword\">import</span> pandas <span class=\"code-keyword\">as</span> pd\n\n<span class=\"code-comment\"># 1. pd.merge: Relational join on shared key column</span>\nemp = pd.DataFrame({<span class=\"code-string\">\"emp_id\"</span>: [<span class=\"code-number\">1</span>, <span class=\"code-number\">2</span>], <span class=\"code-string\">\"name\"</span>: [<span class=\"code-string\">\"Asha\"</span>, <span class=\"code-string\">\"Ravi\"</span>], <span class=\"code-string\">\"dept_id\"</span>: [<span class=\"code-number\">10</span>, <span class=\"code-number\">20</span>]})\ndept = pd.DataFrame({<span class=\"code-string\">\"dept_id\"</span>: [<span class=\"code-number\">10</span>, <span class=\"code-number\">20</span>], <span class=\"code-string\">\"dept_name\"</span>: [<span class=\"code-string\">\"HR\"</span>, <span class=\"code-string\">\"Engineering\"</span>]})\nmerged = pd.merge(emp, dept, on=<span class=\"code-string\">\"dept_id\"</span>)\n\n<span class=\"code-comment\"># 2. left.join: Relational join on row index</span>\nrev = pd.DataFrame({<span class=\"code-string\">\"revenue\"</span>: [<span class=\"code-number\">100</span>, <span class=\"code-number\">250</span>]}, index=[<span class=\"code-string\">\"Q1\"</span>, <span class=\"code-string\">\"Q2\"</span>])\ncost = pd.DataFrame({<span class=\"code-string\">\"cost\"</span>: [<span class=\"code-number\">70</span>, <span class=\"code-number\">160</span>]}, index=[<span class=\"code-string\">\"Q1\"</span>, <span class=\"code-string\">\"Q2\"</span>])\njoined = rev.join(cost)\n\n<span class=\"code-comment\"># 3. pd.concat: Vertical stacking of identical partitions</span>\njan = pd.DataFrame({<span class=\"code-string\">\"sales\"</span>: [<span class=\"code-number\">12</span>, <span class=\"code-number\">18</span>]})\nfeb = pd.DataFrame({<span class=\"code-string\">\"sales\"</span>: [<span class=\"code-number\">22</span>, <span class=\"code-number\">30</span>]})\nstacked = pd.concat([jan, feb], ignore_index=<span class=\"code-builtin\">True</span>)</code></pre>\n      </div>\n    </div>\n  </section>\n\n  <!-- ══════════════════════════════════════════════════════════\n       SECTION 02: PD.MERGE() ANATOMY & JOIN TYPES\n       ══════════════════════════════════════════════════════════ -->\n  <section id=\"day19MergeAnatomySection\" class=\"slide-section\">\n    <h2 class=\"slide-section-title heading-box-wrap heading-with-audio\" id=\"headingMergeAnatomy\">\n      <span class=\"heading-num-box\">02</span>\n      <span class=\"heading-title-box\">\n        <span class=\"heading-title-text\">pd.concat() Axis Concatenation</span>\n        <button class=\"audio-play-btn\" onclick=\"playAudio('Day19/New_PyDay19Audio02.mp3', this)\" title=\"Play narration\">\n          <svg class=\"audio-play-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><polygon points=\"5 3 19 12 5 21 5 3\"></polygon></svg>\n          <svg class=\"audio-pause-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><rect x=\"6\" y=\"4\" width=\"4\" height=\"16\"></rect><rect x=\"14\" y=\"4\" width=\"4\" height=\"16\"></rect></svg>\n        </button>\n      </span>\n    </h2>\n    <p class=\"section-intro-text\">The <code>how</code> argument governs row survival. Like SQL join predicates, the choice between <code>'inner'</code>, <code>'left'</code>, <code>'right'</code>, <code>'outer'</code>, and <code>'cross'</code> dictates which keys survive in the final output dataset and how unmatched columns are populated with IEEE-754 <code>NaN</code> sentinels.</p>\n\n    <!-- 2D Frozen Sticky Table: Join Types Comparison -->\n    <div class=\"topic-subcard\" id=\"day19JoinTypesTableSection\">\n      <div class=\"table-header-wrap\">\n        <h4 class=\"table-header-title\">Relational Join Behavior &amp; Row Preservation Matrix</h4>\n        <div class=\"table-header-actions\">\n        <div class=\"table-search-box\">\n        <svg class=\"table-search-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"11\" cy=\"11\" r=\"8\"></circle><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"></line></svg>\n        <input type=\"text\" class=\"table-search-input\" placeholder=\"Filter table...\" onkeyup=\"filterTable(this)\">\n        </div>\n        </div>\n      </div>\n      <div class=\"db-mock-table-wrap\">\n        <table class=\"db-table-mock arith-sticky-table\">\n          <thead>\n            <tr>\n              <th>how= Mode</th>\n              <th>SQL Equivalent</th>\n              <th>Left Keys Kept</th>\n              <th>Right Keys Kept</th>\n              <th>Unmatched Cells</th>\n              <th>Maximum Row Count</th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr>\n              <td><code>how='inner'</code> (default)</td>\n              <td><code>INNER JOIN</code></td>\n              <td>Only matching</td>\n              <td>Only matching</td>\n              <td>No nulls introduced</td>\n              <td>$min(N_L, N_R)$ if keys unique</td>\n            </tr>\n            <tr>\n              <td><code>how='left'</code></td>\n              <td><code>LEFT OUTER JOIN</code></td>\n              <td>100% of Left</td>\n              <td>Only matching</td>\n              <td>Right columns become <code>NaN</code></td>\n              <td>$ge N_L$ (preserves all left rows)</td>\n            </tr>\n            <tr>\n              <td><code>how='right'</code></td>\n              <td><code>RIGHT OUTER JOIN</code></td>\n              <td>Only matching</td>\n              <td>100% of Right</td>\n              <td>Left columns become <code>NaN</code></td>\n              <td>$ge N_R$ (preserves all right rows)</td>\n            </tr>\n            <tr>\n              <td><code>how='outer'</code></td>\n              <td><code>FULL OUTER JOIN</code></td>\n              <td>100% of Left</td>\n              <td>100% of Right</td>\n              <td>Missing values on either side become <code>NaN</code></td>\n              <td>$N_L + N_R - \text{overlap}$</td>\n            </tr>\n            <tr>\n              <td><code>how='cross'</code></td>\n              <td><code>CROSS JOIN</code></td>\n              <td>Every row</td>\n              <td>Every row</td>\n              <td>No keys needed; no nulls</td>\n              <td>Strictly $N_L \times N_R$ (Cartesian)</td>\n            </tr>\n          </tbody>\n        </table>\n      </div>\n    </div>\n\n    <!-- macOS IDE Card: All 5 Join Types Execution -->\n    <div class=\"mental-model-card\">\n      <div class=\"code-subblock-traffic-lights\">\n        <span class=\"traffic-light-dot red\"></span>\n        <span class=\"traffic-light-dot yellow\"></span>\n        <span class=\"traffic-light-dot green\"></span>\n        <span class=\"code-subblock-title\">02_join_types_walkthrough.py — Output row survival</span>\n      </div>\n      <div class=\"py-code-box\">\n        <pre><code><span class=\"code-keyword\">import</span> pandas <span class=\"code-keyword\">as</span> pd\n\nemp = pd.DataFrame({<span class=\"code-string\">\"emp_id\"</span>: [<span class=\"code-number\">1</span>, <span class=\"code-number\">2</span>, <span class=\"code-number\">3</span>, <span class=\"code-number\">4</span>], <span class=\"code-string\">\"name\"</span>: [<span class=\"code-string\">\"Asha\"</span>, <span class=\"code-string\">\"Ravi\"</span>, <span class=\"code-string\">\"Zoya\"</span>, <span class=\"code-string\">\"Kabir\"</span>], <span class=\"code-string\">\"dept_id\"</span>: [<span class=\"code-number\">10</span>, <span class=\"code-number\">20</span>, <span class=\"code-number\">20</span>, <span class=\"code-number\">99</span>]})\ndept = pd.DataFrame({<span class=\"code-string\">\"dept_id\"</span>: [<span class=\"code-number\">10</span>, <span class=\"code-number\">20</span>, <span class=\"code-number\">30</span>], <span class=\"code-string\">\"dept\"</span>: [<span class=\"code-string\">\"HR\"</span>, <span class=\"code-string\">\"IT\"</span>, <span class=\"code-string\">\"Sales\"</span>]})\n\n<span class=\"code-comment\"># 1. Inner: Only keys in BOTH (10, 20) -> Kabir (99) and Sales (30) dropped</span>\ninner_df = pd.merge(emp, dept, on=<span class=\"code-string\">\"dept_id\"</span>, how=<span class=\"code-string\">\"inner\"</span>)\n\n<span class=\"code-comment\"># 2. Left: All 4 employees kept; Kabir dept becomes NaN</span>\nleft_df = pd.merge(emp, dept, on=<span class=\"code-string\">\"dept_id\"</span>, how=<span class=\"code-string\">\"left\"</span>)\n\n<span class=\"code-comment\"># 3. Right: All 3 depts kept; Sales name becomes NaN</span>\nright_df = pd.merge(emp, dept, on=<span class=\"code-string\">\"dept_id\"</span>, how=<span class=\"code-string\">\"right\"</span>)\n\n<span class=\"code-comment\"># 4. Outer: Union of all keys {10, 20, 30, 99}</span>\nouter_df = pd.merge(emp, dept, on=<span class=\"code-string\">\"dept_id\"</span>, how=<span class=\"code-string\">\"outer\"</span>)\n\n<span class=\"code-comment\"># 5. Cross: Every employee with every department (4 * 3 = 12 rows)</span>\ncross_df = pd.merge(emp[[<span class=\"code-string\">\"name\"</span>]], dept[[<span class=\"code-string\">\"dept\"</span>]], how=<span class=\"code-string\">\"cross\"</span>)</code></pre>\n      </div>\n    </div>\n  </section>\n\n  <!-- ══════════════════════════════════════════════════════════\n       SECTION 03: KEY ALIGNMENT MECHANICS\n       ══════════════════════════════════════════════════════════ -->\n  <section id=\"day19KeyAlignmentSection\" class=\"slide-section\">\n    <h2 class=\"slide-section-title heading-box-wrap heading-with-audio\" id=\"headingKeyAlignment\">\n      <span class=\"heading-num-box\">03</span>\n      <span class=\"heading-title-box\">\n        <span class=\"heading-title-text\">pd.merge() Join Types</span>\n        <button class=\"audio-play-btn\" onclick=\"playAudio('Day19/New_PyDay19Audio03.mp3', this)\" title=\"Play narration\">\n          <svg class=\"audio-play-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><polygon points=\"5 3 19 12 5 21 5 3\"></polygon></svg>\n          <svg class=\"audio-pause-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><rect x=\"6\" y=\"4\" width=\"4\" height=\"16\"></rect><rect x=\"14\" y=\"4\" width=\"4\" height=\"16\"></rect></svg>\n        </button>\n      </span>\n    </h2>\n    <p class=\"section-intro-text\">Real-world databases rarely maintain uniform naming conventions across microservices. An entity identifier might be named <code>cust_id</code> in your order system, <code>id</code> in Salesforce, and <code>account_num</code> in the enterprise ledger. The <code>on</code> parameter requires identical names, whereas <code>left_on</code> and <code>right_on</code> bridge asymmetric schema naming.</p>\n\n    <!-- 2D Frozen Sticky Table: Key Alignment Patterns -->\n    <div class=\"topic-subcard\" id=\"day19KeySpecsTableSection\">\n      <div class=\"table-header-wrap\">\n        <h4 class=\"table-header-title\">Key Specification Patterns &amp; Column Retention Rules</h4>\n        <div class=\"table-header-actions\">\n        <div class=\"table-search-box\">\n        <svg class=\"table-search-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"11\" cy=\"11\" r=\"8\"></circle><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"></line></svg>\n        <input type=\"text\" class=\"table-search-input\" placeholder=\"Filter table...\" onkeyup=\"filterTable(this)\">\n        </div>\n        </div>\n      </div>\n      <div class=\"db-mock-table-wrap\">\n        <table class=\"db-table-mock arith-sticky-table\">\n          <thead>\n            <tr>\n              <th>Alignment Method</th>\n              <th>Invocation Syntax</th>\n              <th>Key Columns Retained</th>\n              <th>Production Cleanup Requirement</th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr>\n              <td>Uniform Single Key</td>\n              <td><code>on=\"customer_id\"</code></td>\n              <td>1 key column</td>\n              <td>None; shared name preserved cleanly</td>\n            </tr>\n            <tr>\n              <td>Asymmetric Keys</td>\n              <td><code>left_on=\"cust\", right_on=\"id\"</code></td>\n              <td>Both <code>cust</code> and <code>id</code></td>\n              <td>Must drop redundant right key: <code>.drop(columns=\"id\")</code></td>\n            </tr>\n            <tr>\n              <td>Composite Multi-Key</td>\n              <td><code>on=[\"fiscal_year\", \"quarter\"]</code></td>\n              <td>Exact list preserved</td>\n              <td>All keys must match simultaneously (AND condition)</td>\n            </tr>\n            <tr>\n              <td>Asymmetric Composite</td>\n              <td><code>left_on=[\"y\", \"q\"], right_on=[\"year\", \"quarter\"]</code></td>\n              <td>All 4 key columns retained</td>\n              <td>Drop redundant right pair: <code>.drop(columns=[\"year\", \"quarter\"])</code></td>\n            </tr>\n          </tbody>\n        </table>\n      </div>\n    </div>\n\n    <!-- macOS IDE Card: Key Alignment in Production -->\n    <div class=\"mental-model-card\">\n      <div class=\"code-subblock-traffic-lights\">\n        <span class=\"traffic-light-dot red\"></span>\n        <span class=\"traffic-light-dot yellow\"></span>\n        <span class=\"traffic-light-dot green\"></span>\n        <span class=\"code-subblock-title\">03_key_alignment_patterns.py — Asymmetric &amp; composite matching</span>\n      </div>\n      <div class=\"py-code-box\">\n        <pre><code><span class=\"code-keyword\">import</span> pandas <span class=\"code-keyword\">as</span> pd\n\norders = pd.DataFrame({<span class=\"code-string\">\"order_id\"</span>: [<span class=\"code-number\">101</span>, <span class=\"code-number\">102</span>], <span class=\"code-string\">\"cust\"</span>: [<span class=\"code-number\">901</span>, <span class=\"code-number\">902</span>], <span class=\"code-string\">\"amount\"</span>: [<span class=\"code-number\">45.0</span>, <span class=\"code-number\">80.0</span>]})\ncusts = pd.DataFrame({<span class=\"code-string\">\"id\"</span>: [<span class=\"code-number\">901</span>, <span class=\"code-number\">902</span>], <span class=\"code-string\">\"name\"</span>: [<span class=\"code-string\">\"Asha\"</span>, <span class=\"code-string\">\"Ravi\"</span>]})\n\n<span class=\"code-comment\"># Asymmetric merge: pandas keeps BOTH 'cust' and 'id'</span>\nm = pd.merge(orders, custs, left_on=<span class=\"code-string\">\"cust\"</span>, right_on=<span class=\"code-string\">\"id\"</span>, how=<span class=\"code-string\">\"left\"</span>)\nclean = m.drop(columns=<span class=\"code-string\">\"id\"</span>)\n<span class=\"code-builtin\">print</span>(clean.columns.tolist())  <span class=\"code-comment\"># ['order_id', 'cust', 'amount', 'name']</span>\n\n<span class=\"code-comment\"># Composite multi-key merge: both fiscal_year and quarter must match</span>\nactuals = pd.DataFrame({<span class=\"code-string\">\"y\"</span>: [<span class=\"code-number\">2026</span>, <span class=\"code-number\">2026</span>], <span class=\"code-string\">\"q\"</span>: [<span class=\"code-number\">1</span>, <span class=\"code-number\">2</span>], <span class=\"code-string\">\"rev\"</span>: [<span class=\"code-number\">100</span>, <span class=\"code-number\">150</span>]})\nforecast = pd.DataFrame({<span class=\"code-string\">\"y\"</span>: [<span class=\"code-number\">2026</span>, <span class=\"code-number\">2026</span>], <span class=\"code-string\">\"q\"</span>: [<span class=\"code-number\">1</span>, <span class=\"code-number\">2</span>], <span class=\"code-string\">\"target\"</span>: [<span class=\"code-number\">95</span>, <span class=\"code-number\">140</span>]})\nbudget = pd.merge(actuals, forecast, on=[<span class=\"code-string\">\"y\"</span>, <span class=\"code-string\">\"q\"</span>])</code></pre>\n      </div>\n    </div>\n  </section>\n\n  <!-- ══════════════════════════════════════════════════════════\n       SECTION 04: SUFFIX COLLISION MANAGEMENT\n       ══════════════════════════════════════════════════════════ -->\n  <section id=\"day19SuffixesSection\" class=\"slide-section\">\n    <h2 class=\"slide-section-title heading-box-wrap heading-with-audio\" id=\"headingSuffixes\">\n      <span class=\"heading-num-box\">04</span>\n      <span class=\"heading-title-box\">\n        <span class=\"heading-title-text\">Multi-Key Joins & Suffixes</span>\n        <button class=\"audio-play-btn\" onclick=\"playAudio('Day19/New_PyDay19Audio04.mp3', this)\" title=\"Play narration\">\n          <svg class=\"audio-play-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><polygon points=\"5 3 19 12 5 21 5 3\"></polygon></svg>\n          <svg class=\"audio-pause-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><rect x=\"6\" y=\"4\" width=\"4\" height=\"16\"></rect><rect x=\"14\" y=\"4\" width=\"4\" height=\"16\"></rect></svg>\n        </button>\n      </span>\n    </h2>\n    <p class=\"section-intro-text\">When non-key columns share identical names across both DataFrames, column name collisions occur. By default, pandas appends <code>_x</code> and <code>_y</code>. In production pipelines, relying on default suffixes creates catastrophic silent failures: when an upstream team adds a previously unshared column (e.g. <code>created_at</code> or <code>status</code>), existing downstream queries reading <code>df['status']</code> instantly raise an unhandled <code>KeyError</code> because the column was quietly transformed into <code>status_x</code> and <code>status_y</code>!</p>\n\n    <!-- Crimson Anti-Pattern Card: Suffix Collision Schema Drift -->\n    <div class=\"anti-pattern-card\">\n      <div class=\"anti-pattern-header\">\n        <div class=\"anti-pattern-icon\">⚠️</div>\n        <div class=\"anti-pattern-title\">Anti-Pattern: Relying on Default Suffixes (_x, _y)</div>\n        <span class=\"anti-pattern-tag\">SILENT DOWNSTREAM KEYERROR</span>\n      </div>\n      <div class=\"anti-pattern-grid\">\n        <div class=\"ap-side-box ap-bad-box\">\n          <div class=\"ap-box-label\">❌ Fragile Code (Default Suffixes)</div>\n          <p>Accepting default suffixes breaks production the moment a dimension table adds a shared column name:</p>\n          <pre><code># Upstream adds 'region' column\njoined = spans.merge(owners, on=\"service\")\n# joined now has 'region_x' & 'region_y'\nprint(joined[\"region\"])  # CRASH! KeyError: 'region'</code></pre>\n        </div>\n        <div class=\"ap-side-box ap-good-box\">\n          <div class=\"ap-box-label\">✅ Defensive Production Fix</div>\n          <p>Explicitly assign semantic suffixes or select only necessary columns before joining:</p>\n          <pre><code>joined = spans.merge(\n    owners[[\"service\", \"team\"]],\n    on=\"service\",\n    how=\"left\",\n    suffixes=(\"\", \"_owner\")\n)\n# joined['region'] is preserved unharmed</code></pre>\n        </div>\n      </div>\n    </div>\n\n    <!-- 2D Frozen Sticky Table: Suffix Strategies -->\n    <div class=\"topic-subcard\" id=\"day19SuffixTableSection\">\n      <div class=\"table-header-wrap\">\n        <h4 class=\"table-header-title\">Suffix Disambiguation &amp; Column Namespace Protection Matrix</h4>\n        <div class=\"table-header-actions\">\n        <div class=\"table-search-box\">\n        <svg class=\"table-search-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"11\" cy=\"11\" r=\"8\"></circle><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"></line></svg>\n        <input type=\"text\" class=\"table-search-input\" placeholder=\"Filter table...\" onkeyup=\"filterTable(this)\">\n        </div>\n        </div>\n      </div>\n      <div class=\"db-mock-table-wrap\">\n        <table class=\"db-table-mock arith-sticky-table\">\n          <thead>\n            <tr>\n              <th>Suffix Policy</th>\n              <th>Syntax Pattern</th>\n              <th>Left Non-Key Name</th>\n              <th>Right Non-Key Name</th>\n              <th>Production Vulnerability Level</th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr>\n              <td>Default Pandas Suffixes</td>\n              <td><code>suffixes=('_x', '_y')</code></td>\n              <td><code>col_x</code></td>\n              <td><code>col_y</code></td>\n              <td><span class=\"py-badge py-badge-rose\">High Risk</span> (Cryptic; breaks on schema drift)</td>\n            </tr>\n            <tr>\n              <td>Semantic Domain Suffixes</td>\n              <td><code>suffixes=('_order', '_cust')</code></td>\n              <td><code>amount_order</code></td>\n              <td><code>amount_cust</code></td>\n              <td><span class=\"py-badge py-badge-green\">Low Risk</span> (Explicit business meaning)</td>\n            </tr>\n            <tr>\n              <td>Asymmetric Preservation</td>\n              <td><code>suffixes=('', '_owner')</code></td>\n              <td><code>region</code> (untouched)</td>\n              <td><code>region_owner</code></td>\n              <td><span class=\"py-badge py-badge-green\">Safe</span> (Guarantees left namespace stability)</td>\n            </tr>\n            <tr>\n              <td>Projection Filtering</td>\n              <td><code>right[['id', 'needed_col']]</code></td>\n              <td><code>col</code> (unique)</td>\n              <td>N/A (omitted)</td>\n              <td><span class=\"py-badge py-badge-green\">Safest</span> (Zero collision possibility)</td>\n            </tr>\n          </tbody>\n        </table>\n      </div>\n    </div>\n  </section>\n\n  <!-- ══════════════════════════════════════════════════════════\n       SECTION 05: INDEX-BASED JOINS & DF.JOIN()\n       ══════════════════════════════════════════════════════════ -->\n  <section id=\"day19IndexJoinSection\" class=\"slide-section\">\n    <h2 class=\"slide-section-title heading-box-wrap heading-with-audio\" id=\"headingIndexJoin\">\n      <span class=\"heading-num-box\">05</span>\n      <span class=\"heading-title-box\">\n        <span class=\"heading-title-text\">Fuzzy & Approximate Merging</span>\n        <button class=\"audio-play-btn\" onclick=\"playAudio('Day19/New_PyDay19Audio05.mp3', this)\" title=\"Play narration\">\n          <svg class=\"audio-play-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><polygon points=\"5 3 19 12 5 21 5 3\"></polygon></svg>\n          <svg class=\"audio-pause-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><rect x=\"6\" y=\"4\" width=\"4\" height=\"16\"></rect><rect x=\"14\" y=\"4\" width=\"4\" height=\"16\"></rect></svg>\n        </button>\n      </span>\n    </h2>\n    <p class=\"section-intro-text\">DataFrames can join directly on row index labels instead of columnar keys. When DataFrames are already indexed by a unique business key (e.g. <code>ticker</code> or <code>timestamp</code>), joining on the index leverages pre-existing index hash tables and binary search structures, bypassing column hashing costs.</p>\n\n    <!-- 2D Frozen Sticky Table: merge vs join -->\n    <div class=\"topic-subcard\" id=\"day19MergeVsJoinTableSection\">\n      <div class=\"table-header-wrap\">\n        <h4 class=\"table-header-title\">Comparison: pd.merge() on Index vs DataFrame.join()</h4>\n        <div class=\"table-header-actions\">\n        <div class=\"table-search-box\">\n        <svg class=\"table-search-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"11\" cy=\"11\" r=\"8\"></circle><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"></line></svg>\n        <input type=\"text\" class=\"table-search-input\" placeholder=\"Filter table...\" onkeyup=\"filterTable(this)\">\n        </div>\n        </div>\n      </div>\n      <div class=\"db-mock-table-wrap\">\n        <table class=\"db-table-mock arith-sticky-table\">\n          <thead>\n            <tr>\n              <th>Feature Property</th>\n              <th>pd.merge(..., left_index=True)</th>\n              <th>DataFrame.join(other)</th>\n              <th>Architectural Difference</th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr>\n              <td>Default Join Mode</td>\n              <td><code>how='inner'</code></td>\n              <td><code>how='left'</code></td>\n              <td><code>join()</code> preserves all left rows by default</td>\n            </tr>\n            <tr>\n              <td>Key Matching Target</td>\n              <td>Columns OR Indices</td>\n              <td>Index-to-Index (or Column-to-Index)</td>\n              <td><code>join()</code> is a convenience shorthand for index lookups</td>\n            </tr>\n            <tr>\n              <td>Overlapping Name Handling</td>\n              <td><code>suffixes=('_x', '_y')</code></td>\n              <td><code>lsuffix='_l', rsuffix='_r'</code></td>\n              <td><code>join()</code> raises <code>ValueError</code> if overlapping and no suffix</td>\n            </tr>\n            <tr>\n              <td>Multi-DataFrame Support</td>\n              <td>Two frames only</td>\n              <td>Can take a list: <code>df.join([df2, df3])</code></td>\n              <td><code>join()</code> can stitch multiple frames on index in one call</td>\n            </tr>\n          </tbody>\n        </table>\n      </div>\n    </div>\n\n    <!-- macOS IDE Card: Index Join Mechanics -->\n    <div class=\"mental-model-card\">\n      <div class=\"code-subblock-traffic-lights\">\n        <span class=\"traffic-light-dot red\"></span>\n        <span class=\"traffic-light-dot yellow\"></span>\n        <span class=\"traffic-light-dot green\"></span>\n        <span class=\"code-subblock-title\">05_index_joining_mechanics.py — Index-to-index &amp; column-to-index</span>\n      </div>\n      <div class=\"py-code-box\">\n        <pre><code><span class=\"code-keyword\">import</span> pandas <span class=\"code-keyword\">as</span> pd\n\nsales = pd.DataFrame({<span class=\"code-string\">\"units\"</span>: [<span class=\"code-number\">10</span>, <span class=\"code-number\">20</span>, <span class=\"code-number\">30</span>]}, index=[<span class=\"code-string\">\"a\"</span>, <span class=\"code-string\">\"b\"</span>, <span class=\"code-string\">\"c\"</span>])\ncost = pd.DataFrame({<span class=\"code-string\">\"unit_cost\"</span>: [<span class=\"code-number\">1.5</span>, <span class=\"code-number\">2.0</span>, <span class=\"code-number\">4.0</span>]}, index=[<span class=\"code-string\">\"b\"</span>, <span class=\"code-string\">\"c\"</span>, <span class=\"code-string\">\"d\"</span>])\n\n<span class=\"code-comment\"># 1. df.join: Defaults to LEFT join on index</span>\nleft_joined = sales.join(cost)  <span class=\"code-comment\"># 'a' kept with unit_cost=NaN; 'd' dropped</span>\n\n<span class=\"code-comment\"># 2. df.join with how='inner': Keeps only shared labels ('b', 'c')</span>\ninner_joined = sales.join(cost, how=<span class=\"code-string\">\"inner\"</span>)\n\n<span class=\"code-comment\"># 3. pd.merge on indices: Outer join preserving all labels</span>\nouter_merged = pd.merge(sales, cost, left_index=<span class=\"code-builtin\">True</span>, right_index=<span class=\"code-builtin\">True</span>, how=<span class=\"code-string\">\"outer\"</span>)\n\n<span class=\"code-comment\"># 4. Mixed: Column to Index</span>\nevents = pd.DataFrame({<span class=\"code-string\">\"ticker\"</span>: [<span class=\"code-string\">\"AAPL\"</span>, <span class=\"code-string\">\"GOOG\"</span>], <span class=\"code-string\">\"shares\"</span>: [<span class=\"code-number\">10</span>, <span class=\"code-number\">5</span>]})\nmetadata = pd.DataFrame({<span class=\"code-string\">\"sector\"</span>: [<span class=\"code-string\">\"Tech\"</span>, <span class=\"code-string\">\"Search\"</span>]}, index=[<span class=\"code-string\">\"AAPL\"</span>, <span class=\"code-string\">\"GOOG\"</span>])\nenriched = events.merge(metadata, left_on=<span class=\"code-string\">\"ticker\"</span>, right_index=<span class=\"code-builtin\">True</span>)</code></pre>\n      </div>\n    </div>\n  </section>\n\n  <!-- ══════════════════════════════════════════════════════════\n       SECTION 06: AUDIT MATCH PROVENANCE & ANTI-JOINS\n       ══════════════════════════════════════════════════════════ -->\n  <section id=\"day19IndicatorSection\" class=\"slide-section\">\n    <h2 class=\"slide-section-title heading-box-wrap heading-with-audio\" id=\"headingIndicator\">\n      <span class=\"heading-num-box\">06</span>\n      <span class=\"heading-title-box\">\n        <span class=\"heading-title-text\">Index-Based Joins (.join)</span>\n        <button class=\"audio-play-btn\" onclick=\"playAudio('Day19/New_PyDay19Audio06.mp3', this)\" title=\"Play narration\">\n          <svg class=\"audio-play-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><polygon points=\"5 3 19 12 5 21 5 3\"></polygon></svg>\n          <svg class=\"audio-pause-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><rect x=\"6\" y=\"4\" width=\"4\" height=\"16\"></rect><rect x=\"14\" y=\"4\" width=\"4\" height=\"16\"></rect></svg>\n        </button>\n      </span>\n    </h2>\n    <p class=\"section-intro-text\">Auditing reconciliation pipelines requires knowing exactly which source table generated each record. Passing <code>indicator=True</code> appends a categorical <code>_merge</code> column with three exact string categories: <code>'left_only'</code>, <code>'right_only'</code>, and <code>'both'</code>. This provides a direct implementation for relational Anti-Joins and data quality audits.</p>\n\n    <!-- 2D Frozen Sticky Table: Set Operations & Provenance -->\n    <div class=\"topic-subcard\" id=\"day19AuditTableSection\">\n      <div class=\"table-header-wrap\">\n        <h4 class=\"table-header-title\">Relational Set Operators &amp; Pandas Provenance Methods</h4>\n        <div class=\"table-header-actions\">\n        <div class=\"table-search-box\">\n        <svg class=\"table-search-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"11\" cy=\"11\" r=\"8\"></circle><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"></line></svg>\n        <input type=\"text\" class=\"table-search-input\" placeholder=\"Filter table...\" onkeyup=\"filterTable(this)\">\n        </div>\n        </div>\n      </div>\n      <div class=\"db-mock-table-wrap\">\n        <table class=\"db-table-mock arith-sticky-table\">\n          <thead>\n            <tr>\n              <th>Relational Operator</th>\n              <th>Pandas Implementation Technique</th>\n              <th>SQL Equivalent Syntax</th>\n              <th>Primary Business Application</th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr>\n              <td>Provenance Audit</td>\n              <td><code>pd.merge(a, b, on='k', how='outer', indicator=True)</code></td>\n              <td>Full outer join with <code>CASE WHEN</code> origin flag</td>\n              <td>Reconciling payment gateways against enterprise general ledgers</td>\n            </tr>\n            <tr>\n              <td>Anti-Join ($A setminus B$)</td>\n              <td><code>m[m['_merge'] == 'left_only']</code> or <code>a[~a['k'].isin(b['k'])]</code></td>\n              <td><code>WHERE NOT EXISTS (...)</code></td>\n              <td>Extracting churned users, unbilled orders, or missing catalog SKUs</td>\n            </tr>\n            <tr>\n              <td>Semi-Join ($A ltimes B$)</td>\n              <td><code>a[a['k'].isin(b['k'])]</code></td>\n              <td><code>WHERE EXISTS (...)</code></td>\n              <td>Filtering customers who placed orders without duplicating customer rows</td>\n            </tr>\n            <tr>\n              <td>Symmetric Difference</td>\n              <td><code>m[m['_merge'] != 'both']</code></td>\n              <td>$(A cup B) setminus (A cap B)$</td>\n              <td>Finding data mismatches and divergent transactions across two systems</td>\n            </tr>\n          </tbody>\n        </table>\n      </div>\n    </div>\n\n    <!-- macOS IDE Card: Anti-Join and Semi-Join Code -->\n    <div class=\"mental-model-card\">\n      <div class=\"code-subblock-traffic-lights\">\n        <span class=\"traffic-light-dot red\"></span>\n        <span class=\"traffic-light-dot yellow\"></span>\n        <span class=\"traffic-light-dot green\"></span>\n        <span class=\"code-subblock-title\">06_antijoin_and_semijoin.py — Extracting churn &amp; active records</span>\n      </div>\n      <div class=\"py-code-box\">\n        <pre><code><span class=\"code-keyword\">import</span> pandas <span class=\"code-keyword\">as</span> pd\n\ncust = pd.DataFrame({<span class=\"code-string\">\"id\"</span>: [<span class=\"code-number\">1</span>, <span class=\"code-number\">2</span>, <span class=\"code-number\">3</span>, <span class=\"code-number\">4</span>], <span class=\"code-string\">\"name\"</span>: [<span class=\"code-string\">\"Asha\"</span>, <span class=\"code-string\">\"Ravi\"</span>, <span class=\"code-string\">\"Zoya\"</span>, <span class=\"code-string\">\"Kabir\"</span>]})\norders = pd.DataFrame({<span class=\"code-string\">\"cust\"</span>: [<span class=\"code-number\">1</span>, <span class=\"code-number\">1</span>, <span class=\"code-number\">3</span>], <span class=\"code-string\">\"amt\"</span>: [<span class=\"code-number\">50</span>, <span class=\"code-number\">60</span>, <span class=\"code-number\">70</span>]})\n\n<span class=\"code-comment\"># 1. Anti-Join: Customers who NEVER placed an order (Ravi, Kabir)</span>\nunpurchased = cust[~cust[<span class=\"code-string\">\"id\"</span>].isin(orders[<span class=\"code-string\">\"cust\"</span>])]\n<span class=\"code-builtin\">print</span>(unpurchased[<span class=\"code-string\">\"name\"</span>].tolist())  <span class=\"code-comment\"># ['Ravi', 'Kabir']</span>\n\n<span class=\"code-comment\"># 2. Semi-Join: Customers who ordered at least once (Asha, Zoya) - NO row duplication</span>\nactive_custs = cust[cust[<span class=\"code-string\">\"id\"</span>].isin(orders[<span class=\"code-string\">\"cust\"</span>])]\n<span class=\"code-builtin\">print</span>(active_custs[<span class=\"code-string\">\"name\"</span>].tolist())  <span class=\"code-comment\"># ['Asha', 'Zoya']</span>\n\n<span class=\"code-comment\"># 3. Indicator Audit: Tracking match origin explicitly</span>\naudit = cust.merge(orders, left_on=<span class=\"code-string\">\"id\"</span>, right_on=<span class=\"code-string\">\"cust\"</span>, how=<span class=\"code-string\">\"left\"</span>, indicator=<span class=\"code-builtin\">True</span>)\n<span class=\"code-builtin\">print</span>(audit[[<span class=\"code-string\">\"name\"</span>, <span class=\"code-string\">\"_merge\"</span>]])</code></pre>\n      </div>\n    </div>\n  </section>\n\n  <!-- ══════════════════════════════════════════════════════════\n       SECTION 07: CARDINALITY CONTRACTS & VALIDATION\n       ══════════════════════════════════════════════════════════ -->\n  <section id=\"day19CardinalitySection\" class=\"slide-section\">\n    <h2 class=\"slide-section-title heading-box-wrap heading-with-audio\" id=\"headingCardinality\">\n      <span class=\"heading-num-box\">07</span>\n      <span class=\"heading-title-box\">\n        <span class=\"heading-title-text\">Combining Overlapping Data (combine_first)</span>\n        <button class=\"audio-play-btn\" onclick=\"playAudio('Day19/New_PyDay19Audio07.mp3', this)\" title=\"Play narration\">\n          <svg class=\"audio-play-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><polygon points=\"5 3 19 12 5 21 5 3\"></polygon></svg>\n          <svg class=\"audio-pause-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><rect x=\"6\" y=\"4\" width=\"4\" height=\"16\"></rect><rect x=\"14\" y=\"4\" width=\"4\" height=\"16\"></rect></svg>\n        </button>\n      </span>\n    </h2>\n    <p class=\"section-intro-text\">The most notorious, financially catastrophic bug in enterprise data analytics is the <strong>accidental Cartesian fanout</strong>. If a dimension table inadvertently contains duplicate keys (for instance, during a customer migration or retry loop), every matching fact row is multiplied. Total revenue and financial sums double or triple silently with zero warnings and zero exceptions!</p>\n\n    <!-- Crimson Anti-Pattern Card: Fanout Explosion -->\n    <div class=\"anti-pattern-card\">\n      <div class=\"anti-pattern-header\">\n        <div class=\"anti-pattern-icon\">⚠️</div>\n        <div class=\"anti-pattern-title\">Anti-Pattern: Unvalidated Dimension Enrichment</div>\n        <span class=\"anti-pattern-tag\">CRITICAL FINANCIAL DATA CORRUPTION</span>\n      </div>\n      <div class=\"anti-pattern-grid\">\n        <div class=\"ap-side-box ap-bad-box\">\n          <div class=\"ap-box-label\">❌ Buggy Code (Silent Multiplier)</div>\n          <p>Merging without cardinality validation multiplies rows when lookup keys repeat, doubling reported sums:</p>\n          <pre><code># owners has 2 rows for service 'api'\nenriched = spans.merge(owners, on=\"service\", how=\"left\")\n# Every 'api' span is now duplicated!\n# Revenue / latency totals silently inflate!</code></pre>\n        </div>\n        <div class=\"ap-side-box ap-good-box\">\n          <div class=\"ap-box-label\">✅ Production Fix (Cardinality Contract)</div>\n          <p>Assert relationship cardinality to turn silent corruption into instant fail-fast exceptions:</p>\n          <pre><code>enriched = spans.merge(\n    owners,\n    on=\"service\",\n    how=\"left\",\n    validate=\"many_to_one\"\n)\n# Raises pd.errors.MergeError if right key is non-unique</code></pre>\n        </div>\n      </div>\n    </div>\n\n    <!-- 2D Frozen Sticky Table: validate= Options -->\n    <div class=\"topic-subcard\" id=\"day19ValidateTableSection\">\n      <div class=\"table-header-wrap\">\n        <h4 class=\"table-header-title\">The Four Relational Cardinality Contracts in Pandas</h4>\n        <div class=\"table-header-actions\">\n        <div class=\"table-search-box\">\n        <svg class=\"table-search-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"11\" cy=\"11\" r=\"8\"></circle><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"></line></svg>\n        <input type=\"text\" class=\"table-search-input\" placeholder=\"Filter table...\" onkeyup=\"filterTable(this)\">\n        </div>\n        </div>\n      </div>\n      <div class=\"db-mock-table-wrap\">\n        <table class=\"db-table-mock arith-sticky-table\">\n          <thead>\n            <tr>\n              <th>validate= Option</th>\n              <th>Left Key Uniqueness</th>\n              <th>Right Key Uniqueness</th>\n              <th>Expected Relational Structure</th>\n              <th>Failure Exception Raised</th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr>\n              <td><code>validate='one_to_one'</code> (1:1)</td>\n              <td>Must be unique</td>\n              <td>Must be unique</td>\n              <td>Strict 1-to-1 mapping (e.g. Employee to Passport)</td>\n              <td><code>MergeError</code> if duplicate on either side</td>\n            </tr>\n            <tr>\n              <td><code>validate='many_to_one'</code> (m:1)</td>\n              <td>Can repeat</td>\n              <td>Must be unique</td>\n              <td>Facts to Dimension table (Orders to Customers)</td>\n              <td><code>MergeError</code> if right key has duplicates</td>\n            </tr>\n            <tr>\n              <td><code>validate='one_to_many'</code> (1:m)</td>\n              <td>Must be unique</td>\n              <td>Can repeat</td>\n              <td>Parent to Child table (Customer to Invoices)</td>\n              <td><code>MergeError</code> if left key has duplicates</td>\n            </tr>\n            <tr>\n              <td><code>validate='many_to_many'</code> (m:m)</td>\n              <td>Can repeat</td>\n              <td>Can repeat</td>\n              <td>Cartesian fanout per key ($N \times M$ output rows)</td>\n              <td>Never raises; allows full fanout</td>\n            </tr>\n          </tbody>\n        </table>\n      </div>\n    </div>\n  </section>\n\n  <!-- ══════════════════════════════════════════════════════════\n       SECTION 08: PD.CONCAT() STACKING MECHANICS\n       ══════════════════════════════════════════════════════════ -->\n  <section id=\"day19ConcatSection\" class=\"slide-section\">\n    <h2 class=\"slide-section-title heading-box-wrap heading-with-audio\" id=\"headingConcat\">\n      <span class=\"heading-num-box\">08</span>\n      <span class=\"heading-title-box\">\n        <span class=\"heading-title-text\">Merge Validation (validate param)</span>\n        <button class=\"audio-play-btn\" onclick=\"playAudio('Day19/New_PyDay19Audio08.mp3', this)\" title=\"Play narration\">\n          <svg class=\"audio-play-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><polygon points=\"5 3 19 12 5 21 5 3\"></polygon></svg>\n          <svg class=\"audio-pause-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><rect x=\"6\" y=\"4\" width=\"4\" height=\"16\"></rect><rect x=\"14\" y=\"4\" width=\"4\" height=\"16\"></rect></svg>\n        </button>\n      </span>\n    </h2>\n    <p class=\"section-intro-text\">While <code>pd.merge</code> and <code>df.join</code> match rows based on relational keys, <code>pd.concat()</code> performs purely positional or label-aligned concatenation along a specified dimension axis. Setting <code>axis=0</code> stacks rows vertically (like SQL <code>UNION ALL</code>), while <code>axis=1</code> places DataFrames side by side horizontally aligned by their row index.</p>\n\n    <!-- 2D Frozen Sticky Table: Concat Dimensions -->\n    <div class=\"topic-subcard\" id=\"day19ConcatAxesTableSection\">\n      <div class=\"table-header-wrap\">\n        <h4 class=\"table-header-title\">Concatenation Dimensions, Join Modes &amp; Structural Outcomes</h4>\n        <div class=\"table-header-actions\">\n        <div class=\"table-search-box\">\n        <svg class=\"table-search-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"11\" cy=\"11\" r=\"8\"></circle><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"></line></svg>\n        <input type=\"text\" class=\"table-search-input\" placeholder=\"Filter table...\" onkeyup=\"filterTable(this)\">\n        </div>\n        </div>\n      </div>\n      <div class=\"db-mock-table-wrap\">\n        <table class=\"db-table-mock arith-sticky-table\">\n          <thead>\n            <tr>\n              <th>Dimension &amp; Join</th>\n              <th>Operation Axis</th>\n              <th>Primary Alignment Basis</th>\n              <th>Unshared Attribute Behavior</th>\n              <th>Common Analytical Scenario</th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr>\n              <td>Row Stack Outer (default)</td>\n              <td><code>axis=0, join='outer'</code></td>\n              <td>Column Names</td>\n              <td>Union of columns; missing cells filled with <code>NaN</code></td>\n              <td>Stacking daily sales files where some days track promo codes</td>\n            </tr>\n            <tr>\n              <td>Row Stack Inner</td>\n              <td><code>axis=0, join='inner'</code></td>\n              <td>Column Names</td>\n              <td>Intersection only; unshared columns strictly discarded</td>\n              <td>Stacking heterogeneous schema versions to common core fields</td>\n            </tr>\n            <tr>\n              <td>Column Stitch (Horizontal)</td>\n              <td><code>axis=1, join='outer'</code></td>\n              <td>Row Index Labels</td>\n              <td>Union of row index labels; unshared rows get <code>NaN</code></td>\n              <td>Combining extracted feature matrices with ground truth labels</td>\n            </tr>\n            <tr>\n              <td>Column Stitch Inner</td>\n              <td><code>axis=1, join='inner'</code></td>\n              <td>Row Index Labels</td>\n              <td>Only index labels present in all frames retained</td>\n              <td>Aligning synchronized timeseries across multiple sensors</td>\n            </tr>\n          </tbody>\n        </table>\n      </div>\n    </div>\n\n    <!-- macOS IDE Card: Concat Dimensions in Code -->\n    <div class=\"mental-model-card\">\n      <div class=\"code-subblock-traffic-lights\">\n        <span class=\"traffic-light-dot red\"></span>\n        <span class=\"traffic-light-dot yellow\"></span>\n        <span class=\"traffic-light-dot green\"></span>\n        <span class=\"code-subblock-title\">08_concat_dimensions_in_action.py — Row stacking &amp; column stitching</span>\n      </div>\n      <div class=\"py-code-box\">\n        <pre><code><span class=\"code-keyword\">import</span> pandas <span class=\"code-keyword\">as</span> pd\n\njan = pd.DataFrame({<span class=\"code-string\">\"id\"</span>: [<span class=\"code-number\">1</span>, <span class=\"code-number\">2</span>], <span class=\"code-string\">\"amt\"</span>: [<span class=\"code-number\">10</span>, <span class=\"code-number\">20</span>]})\nfeb = pd.DataFrame({<span class=\"code-string\">\"id\"</span>: [<span class=\"code-number\">3</span>, <span class=\"code-number\">4</span>], <span class=\"code-string\">\"amt\"</span>: [<span class=\"code-number\">30</span>, <span class=\"code-number\">40</span>], <span class=\"code-string\">\"promo\"</span>: [<span class=\"code-string\">\"SAVE10\"</span>, <span class=\"code-string\">\"VIP\"</span>]})\n\n<span class=\"code-comment\"># 1. axis=0, outer: Stacks rows; 'promo' populated with NaN for jan</span>\nstacked_outer = pd.concat([jan, feb], ignore_index=<span class=\"code-builtin\">True</span>)\n\n<span class=\"code-comment\"># 2. axis=0, inner: Discards 'promo' because jan lacks it</span>\nstacked_inner = pd.concat([jan, feb], join=<span class=\"code-string\">\"inner\"</span>, ignore_index=<span class=\"code-builtin\">True</span>)\n<span class=\"code-builtin\">print</span>(stacked_inner.columns.tolist())  <span class=\"code-comment\"># ['id', 'amt']</span>\n\n<span class=\"code-comment\"># 3. axis=1: Side-by-side stitch aligned on the index</span>\nmetrics = pd.DataFrame({<span class=\"code-string\">\"precision\"</span>: [<span class=\"code-number\">0.91</span>, <span class=\"code-number\">0.88</span>]}, index=[<span class=\"code-string\">\"m1\"</span>, <span class=\"code-string\">\"m2\"</span>])\ntiming = pd.DataFrame({<span class=\"code-string\">\"p99_ms\"</span>: [<span class=\"code-number\">14.2</span>, <span class=\"code-number\">9.8</span>]}, index=[<span class=\"code-string\">\"m1\"</span>, <span class=\"code-string\">\"m2\"</span>])\neval_summary = pd.concat([metrics, timing], axis=<span class=\"code-number\">1</span>)</code></pre>\n      </div>\n    </div>\n  </section>\n\n  <!-- ══════════════════════════════════════════════════════════\n       SECTION 09: INDEX SANITATION & LOOP CONCAT SAFETY\n       ══════════════════════════════════════════════════════════ -->\n  <section id=\"day19IndexSanitationSection\" class=\"slide-section\">\n    <h2 class=\"slide-section-title heading-box-wrap heading-with-audio\" id=\"headingIndexSanitation\">\n      <span class=\"heading-num-box\">09</span>\n      <span class=\"heading-title-box\">\n        <span class=\"heading-title-text\">Common Anti-Patterns</span>\n        <button class=\"audio-play-btn\" onclick=\"playAudio('Day19/New_PyDay19Audio09.mp3', this)\" title=\"Play narration\">\n          <svg class=\"audio-play-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><polygon points=\"5 3 19 12 5 21 5 3\"></polygon></svg>\n          <svg class=\"audio-pause-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><rect x=\"6\" y=\"4\" width=\"4\" height=\"16\"></rect><rect x=\"14\" y=\"4\" width=\"4\" height=\"16\"></rect></svg>\n        </button>\n      </span>\n    </h2>\n    <p class=\"section-intro-text\">Two critical engineering traps await unsuspecting engineers during concatenation: <strong>duplicate index labels</strong> and <strong>iterative in-loop concatenation</strong>. When you stack frames without <code>ignore_index=True</code>, original indices (such as <code>[0, 1]</code> and <code>[0, 1]</code>) are preserved verbatim, producing repeated labels that corrupt downstream <code>.loc</code> indexing. Furthermore, calling <code>pd.concat</code> inside a <code>for</code> loop triggers quadratic memory reallocation ($O(N^2)$), copying data on every single iteration!</p>\n\n    <!-- Crimson Anti-Pattern Card: In-Loop Concatenation -->\n    <div class=\"anti-pattern-card\">\n      <div class=\"anti-pattern-header\">\n        <div class=\"anti-pattern-icon\">⚠️</div>\n        <div class=\"anti-pattern-title\">Anti-Pattern: Concatenating DataFrames Inside a Loop</div>\n        <span class=\"anti-pattern-tag\">O(N^2) CPU &amp; MEMORY SPIKE</span>\n      </div>\n      <div class=\"anti-pattern-grid\">\n        <div class=\"ap-side-box ap-bad-box\">\n          <div class=\"ap-box-label\">❌ Catastrophic In-Loop Concat</div>\n          <p>Iteratively concatenating copies the entire accumulated table in memory on every single loop iteration:</p>\n          <pre><code># DISASTER: O(N^2) copies (DataFrame.append removed)\ndf_total = pd.DataFrame()\nfor file in file_list:\n    chunk = pd.read_csv(file)\n    df_total = pd.concat([df_total, chunk])</code></pre>\n        </div>\n        <div class=\"ap-side-box ap-good-box\">\n          <div class=\"ap-box-label\">✅ Elite Production Pattern</div>\n          <p>Collect chunks into an in-memory list, then perform a single one-shot concatenation ($O(N)$):</p>\n          <pre><code># O(N) allocation: concat exactly ONCE\nchunks = [pd.read_csv(f) for f in file_list]\ndf_total = pd.concat(chunks, ignore_index=True)\n# Peak memory reduced by up to 80%</code></pre>\n        </div>\n      </div>\n    </div>\n\n    <!-- 2D Frozen Sticky Table: Provenance & Sanitation Strategies -->\n    <div class=\"topic-subcard\" id=\"day19SanitationTableSection\">\n      <div class=\"table-header-wrap\">\n        <h4 class=\"table-header-title\">Index Hygiene &amp; Batch Provenance Management</h4>\n        <div class=\"table-header-actions\">\n        <div class=\"table-search-box\">\n        <svg class=\"table-search-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"11\" cy=\"11\" r=\"8\"></circle><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"></line></svg>\n        <input type=\"text\" class=\"table-search-input\" placeholder=\"Filter table...\" onkeyup=\"filterTable(this)\">\n        </div>\n        </div>\n      </div>\n      <div class=\"db-mock-table-wrap\">\n        <table class=\"db-table-mock arith-sticky-table\">\n          <thead>\n            <tr>\n              <th>Sanitation Pattern</th>\n              <th>Code Invocation</th>\n              <th>Resulting Index Structure</th>\n              <th>Memory &amp; Downstream Benefit</th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr>\n              <td>Clean Linear Indexing</td>\n              <td><code>pd.concat(frames, ignore_index=True)</code></td>\n              <td>Contiguous <code>0..N-1</code> RangeIndex</td>\n              <td>Eliminates duplicate label bugs; fastest downstream indexing</td>\n            </tr>\n            <tr>\n              <td>Hierarchical MultiIndex</td>\n              <td><code>pd.concat(frames, keys=['US', 'EU'])</code></td>\n              <td>2-Level MultiIndex (<code>region</code>, <code>int</code>)</td>\n              <td>Maintains partition boundaries; slices easily via <code>.loc['US']</code></td>\n            </tr>\n            <tr>\n              <td>Dictionary Tagging</td>\n              <td><code>pd.concat({'2026-Q1': q1, '2026-Q2': q2})</code></td>\n              <td>MultiIndex keyed by dictionary keys</td>\n              <td>Self-documenting provenance without manual column assignment</td>\n            </tr>\n            <tr>\n              <td>In-Memory Column Tagging</td>\n              <td><code>pd.concat([d.assign(month=m) for ...])</code></td>\n              <td>Standard column: <code>df['month']</code></td>\n              <td>Optimized for downstream <code>groupby('month')</code> aggregation</td>\n            </tr>\n          </tbody>\n        </table>\n      </div>\n    </div>\n  </section>\n\n  <!-- ══════════════════════════════════════════════════════════\n       SECTION 10: 10 CRITICAL ANTI-PATTERNS, CPYTHON DEEP DIVE & FAANG SPOTLIGHT\n       ══════════════════════════════════════════════════════════ -->\n  <section id=\"day19AntiPatternsSection\" class=\"slide-section\">\n    <h2 class=\"slide-section-title heading-box-wrap heading-with-audio\" id=\"headingAntiPatterns\">\n      <span class=\"heading-num-box\">10</span>\n      <span class=\"heading-title-box\">\n        <span class=\"heading-title-text\">Review & Interview Questions</span>\n        <button class=\"audio-play-btn\" onclick=\"playAudio('Day19/New_PyDay19Audio10.mp3', this)\" title=\"Play narration\">\n          <svg class=\"audio-play-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><polygon points=\"5 3 19 12 5 21 5 3\"></polygon></svg>\n          <svg class=\"audio-pause-icon\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><rect x=\"6\" y=\"4\" width=\"4\" height=\"16\"></rect><rect x=\"14\" y=\"4\" width=\"4\" height=\"16\"></rect></svg>\n        </button>\n      </span>\n    </h2>\n    <p class=\"section-intro-text\">Mastering relational table operations separates junior scriptwriters from staff-level data platform architects. Below is an engineering autopsy of CPython join internals, the 10 most lethal merge anti-patterns, a master quick reference cheat sheet, and 25 technical interview questions asked at Meta, Amazon, and Google.</p>\n\n    <!-- Engineering Deep Dive Card: CPython Hash Joins -->\n    <div class=\"topic-subcard\" id=\"day19DeepDiveSection\">\n      <div class=\"table-header-wrap\">\n        <h4 class=\"table-header-title\">Engineering Deep Dive: CPython Hash-Join Factorization &amp; Peak Memory Profiles</h4>\n      </div>\n      <p class=\"section-intro-text\">\n        <strong>CPython Join Factorization:</strong> When you call <code>pd.merge()</code>, pandas does not perform a naive nested loop ($O(N \times M)$). Instead, it factorizes the key columns of both DataFrames into a shared integer code space using an internal hash table (<strong>khash</strong>). It then delegates row matching to optimized C routines in <code>pandas._libs.join</code>, which compute two integer coordinate arrays: <code>left_indexer</code> and <code>right_indexer</code>.\n      </p>\n      <p class=\"section-intro-text\">\n        <strong>The Take() Allocation Bottleneck:</strong> The output DataFrame is constructed by applying <code>.take(indexer)</code> across every single column block of each frame. Consequently, joining two frames is <strong>never in-place</strong>. Peak memory during a merge holds: <em>Left DataFrame + Right DataFrame + Left Indexer + Right Indexer + Output DataFrame</em>. Joining a 4 GB telemetry table with a 1 GB lookup can instantly spike process memory past 10 GB!\n      </p>\n      <p class=\"section-intro-text\">\n        <strong>The IEEE-754 NaN Key Anomaly:</strong> In ANSI SQL, <code>NULL = NULL</code> is universally <code>UNKNOWN</code> (never matches). In pandas, however, <strong>NaN keys match other NaN keys</strong>! If your transactions table carries unassigned <code>NaN</code> user IDs and your users table has a single placeholder row with <code>NaN</code>, every unassigned transaction will match that placeholder row, attributing thousands of unrelated actions to a single entity!\n      </p>\n    </div>\n\n    <!-- Master Quick Reference Table -->\n    <div class=\"topic-subcard\" id=\"day19QuickRefSection\">\n      <div class=\"table-header-wrap\">\n        <h4 class=\"table-header-title\">Master Quick Reference: Every Core Merging &amp; Joining Operation</h4>\n        <div class=\"table-header-actions\">\n        <div class=\"table-search-box\">\n        <svg class=\"table-search-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"11\" cy=\"11\" r=\"8\"></circle><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"></line></svg>\n        <input type=\"text\" class=\"table-search-input\" placeholder=\"Filter table...\" onkeyup=\"filterTable(this)\">\n        </div>\n        </div>\n      </div>\n      <div class=\"db-mock-table-wrap\">\n        <table class=\"db-table-mock arith-sticky-table\">\n          <thead>\n            <tr>\n              <th>Operation Task</th>\n              <th>Production Code Snippet</th>\n              <th>Algorithmic Complexity</th>\n              <th>Key Behavioral Rule</th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr>\n              <td>Key-Based Left Join</td>\n              <td><code>pd.merge(a, b, on='k', how='left')</code></td>\n              <td>$O(N + M)$ hash join</td>\n              <td>All left rows kept; right unmatched become <code>NaN</code></td>\n            </tr>\n            <tr>\n              <td>Asymmetric Key Names</td>\n              <td><code>a.merge(b, left_on='x', right_on='y')</code></td>\n              <td>$O(N + M)$ hash join</td>\n              <td>Retains both <code>x</code> and <code>y</code>; drop one afterwards</td>\n            </tr>\n            <tr>\n              <td>Index-to-Index Join</td>\n              <td><code>a.join(b, how='inner')</code></td>\n              <td>$O(N + M)$ (binary if sorted)</td>\n              <td>Defaults to <code>how='left'</code> on index; requires unique columns</td>\n            </tr>\n            <tr>\n              <td>Cardinality Validation</td>\n              <td><code>a.merge(b, on='k', validate='many_to_one')</code></td>\n              <td>$O(N + M)$ + $O(M)$ uniqueness</td>\n              <td>Raises <code>MergeError</code> if right key contains duplicates</td>\n            </tr>\n            <tr>\n              <td>Provenance Audit</td>\n              <td><code>a.merge(b, on='k', how='outer', indicator=True)</code></td>\n              <td>$O(N + M)$</td>\n              <td>Adds <code>_merge</code> categorical: <code>left_only</code>, <code>right_only</code>, <code>both</code></td>\n            </tr>\n            <tr>\n              <td>Pure Anti-Join</td>\n              <td><code>a[~a['k'].isin(b['k'])]</code></td>\n              <td>$O(N)$ set probe</td>\n              <td>Finds records in A with zero corresponding records in B</td>\n            </tr>\n            <tr>\n              <td>Vertical Row Stacking</td>\n              <td><code>pd.concat([a, b], ignore_index=True)</code></td>\n              <td>$O(N + M)$ memory copy</td>\n              <td>Resets index to clean <code>0..N-1</code> range</td>\n            </tr>\n            <tr>\n              <td>Horizontal Column Stitch</td>\n              <td><code>pd.concat([a, b], axis=1)</code></td>\n              <td>$O(N + M)$ index alignment</td>\n              <td>Places frames side by side aligned on row index labels</td>\n            </tr>\n            <tr>\n              <td>Nearest Earlier Event</td>\n              <td><code>pd.merge_asof(trades, quotes, on='t')</code></td>\n              <td>$O(N + M)$ scan on sorted keys</td>\n              <td>Both frames must be strictly pre-sorted by merge key</td>\n            </tr>\n          </tbody>\n        </table>\n      </div>\n    </div>\n\n    <!-- ZERO-OVERLAP Master Anti-Pattern Diagnostic Table -->\n    <div class=\"topic-subcard\" id=\"day19AntiPatternTableSection\">\n      <div class=\"table-header-wrap\">\n        <h4 class=\"table-header-title\">The 10 Critical Pandas Merge Anti-Patterns (Root Cause &amp; Production Fix)</h4>\n        <div class=\"table-header-actions\">\n        <div class=\"table-search-box\">\n        <svg class=\"table-search-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"11\" cy=\"11\" r=\"8\"></circle><line x1=\"21\" y1=\"21\" x2=\"16.65\" y2=\"16.65\"></line></svg>\n        <input type=\"text\" class=\"table-search-input\" placeholder=\"Filter table...\" onkeyup=\"filterTable(this)\">\n        </div>\n        </div>\n      </div>\n      <div class=\"db-mock-table-wrap\">\n        <table class=\"db-table-mock anti-pattern-table arith-sticky-table\">\n          <thead>\n            <tr>\n              <th>Anti-Pattern Code</th>\n              <th>What Happens (Symptom)</th>\n              <th>Why It Fails (Root Cause)</th>\n              <th>Production Safe Pattern</th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr>\n              <td><code class=\"ap-code-bad\">spans.merge(owners, on=\"service\")</code></td>\n              <td><span class=\"ap-result-bad\">Totals double silently</span></td>\n              <td>Duplicate keys in <code>owners</code> trigger an undetected Cartesian fanout ($M \times N$).</td>\n              <td><code class=\"ap-code-fix\">merge(..., validate=\"many_to_one\")</code></td>\n            </tr>\n            <tr>\n              <td><code class=\"ap-code-bad\">a.merge(b, on=\"k\")</code> (expecting left join)</td>\n              <td><span class=\"ap-result-bad\">Unmatched rows vanish</span></td>\n              <td>Default join is <code>how='inner'</code>, silently dropping rows lacking matches.</td>\n              <td><code class=\"ap-code-fix\">a.merge(b, on=\"k\", how=\"left\")</code></td>\n            </tr>\n            <tr>\n              <td><code class=\"ap-code-bad\">merge(df_int, df_str, on=\"id\")</code></td>\n              <td><span class=\"ap-result-bad\">ValueError: dtype mismatch</span></td>\n              <td>Pandas refuses to join <code>int64</code> with <code>object</code>/<code>str</code> keys.</td>\n              <td><code class=\"ap-code-fix\">df_str['id'] = df_str['id'].astype(int)</code></td>\n            </tr>\n            <tr>\n              <td><code class=\"ap-code-bad\">orders.merge(geo, on=\"city\")</code></td>\n              <td><span class=\"ap-result-bad\">Empty / partial matches</span></td>\n              <td>Invisible leading spaces (<code>' Pune'</code> vs <code>'pune'</code>) cause equality failures.</td>\n              <td><code class=\"ap-code-fix\">s.str.strip().str.lower()</code> before merge</td>\n            </tr>\n            <tr>\n              <td><code class=\"ap-code-bad\">spans.merge(meta, on=\"id\")</code></td>\n              <td><span class=\"ap-result-bad\">KeyError on downstream columns</span></td>\n              <td>Default suffixes convert colliding columns to <code>_x</code> and <code>_y</code>.</td>\n              <td><code class=\"ap-code-fix\">suffixes=('', '_meta')</code></td>\n            </tr>\n            <tr>\n              <td><code class=\"ap-code-bad\">for f in files: df = pd.concat([df, chunk])</code></td>\n              <td><span class=\"ap-result-bad\">Pipeline throttles / OOM</span></td>\n              <td>Concatenating inside a loop causes quadratic ($O(N^2)$) memory reallocation.</td>\n              <td><code class=\"ap-code-fix\">pd.concat([read(f) for f in files])</code> once</td>\n            </tr>\n            <tr>\n              <td><code class=\"ap-code-bad\">pd.concat([df1, df2])</code> (no ignore_index)</td>\n              <td><span class=\"ap-result-bad\">Duplicate index labels</span></td>\n              <td>Original indices <code>0, 1</code> and <code>0, 1</code> conflict, corrupting future <code>.loc</code> calls.</td>\n              <td><code class=\"ap-code-fix\">pd.concat(..., ignore_index=True)</code></td>\n            </tr>\n            <tr>\n              <td><code class=\"ap-code-bad\">a.merge(b, on=\"missing_key\")</code></td>\n              <td><span class=\"ap-result-bad\">NaN joins with NaN</span></td>\n              <td>Unlike SQL NULL, pandas treats NaN keys as identical, falsely linking null rows.</td>\n              <td><code class=\"ap-code-fix\">df.dropna(subset=['k'])</code> before merge</td>\n            </tr>\n            <tr>\n              <td><code class=\"ap-code-bad\">df1.join(df2)</code> with identical columns</td>\n              <td><span class=\"ap-result-bad\">ValueError: columns overlap</span></td>\n              <td><code>join()</code> does not apply auto-suffixes; it crashes if unhandled.</td>\n              <td><code class=\"ap-code-fix\">df1.join(df2, lsuffix='_l', rsuffix='_r')</code></td>\n            </tr>\n            <tr>\n              <td><code class=\"ap-code-bad\">merge_asof(trades, quotes, on=\"t\")</code></td>\n              <td><span class=\"ap-result-bad\">ValueError: keys must be sorted</span></td>\n              <td><code>merge_asof</code> requires both frames to be monotonically pre-sorted by key.</td>\n              <td><code class=\"ap-code-fix\">df.sort_values('t')</code> prior to asof join</td>\n            </tr>\n          </tbody>\n        </table>\n      </div>\n    </div>\n\n    <!-- FAANG Technical Interview Spotlight: 25 Questions -->\n    <div class=\"topic-subcard\" id=\"day19FAANGSpotlightSection\">\n      <div class=\"table-header-wrap\">\n        <h4 class=\"table-header-title\">Top 25 Senior Analyst &amp; FAANG Technical Interview Questions</h4>\n      </div>\n      <p class=\"section-intro-text\">These 25 comprehensive technical questions evaluate real-world relational data modeling, join mechanics, memory engineering, and pipeline integrity tested in FAANG / Tier-1 tech interviews.</p>\n\n      <div class=\"interview-item\" id=\"pyDay23IQ1\">\n        <p class=\"interview-question\"><strong>Q1: What is the fundamental difference between merge, join, and concat in pandas?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: <code>pd.merge()</code> joins tables based on shared column keys (equivalent to SQL <code>JOIN</code>). <code>DataFrame.join()</code> is an index-centric convenience method defaulting to a left join on row index labels. <code>pd.concat()</code> stitches DataFrames along a geometric dimension axis (<code>axis=0</code> for row union like SQL <code>UNION ALL</code>; <code>axis=1</code> for side-by-side horizontal column binding aligned on index labels).</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n\n      <div class=\"interview-item\" id=\"pyDay23IQ2\">\n        <p class=\"interview-question\"><strong>Q2: List the five join types supported by pd.merge() and what each keeps.</strong></p>\n        <div class=\"interview-answer\"><p><em>A: <code>'inner'</code> keeps only keys present in both DataFrames. <code>'left'</code> preserves all left rows, populating unmatched right attributes with NaN. <code>'right'</code> preserves all right rows, populating unmatched left attributes with NaN. <code>'outer'</code> keeps the union of all keys from both frames. <code>'cross'</code> computes the full Cartesian product ($M \times N$) without requiring any join keys.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n\n      <div class=\"interview-item\" id=\"pyDay23IQ3\">\n        <p class=\"interview-question\"><strong>Q3: How do you merge two DataFrames when their join key columns have different names?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: Use <code>left_on='left_col'</code> and <code>right_on='right_col'</code>. Note that pandas retains both columns in the resulting DataFrame. In production pipelines, you should immediately drop the redundant key using <code>.drop(columns='right_col')</code> to prevent schema bloat.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n\n      <div class=\"interview-item\" id=\"pyDay23IQ4\">\n        <p class=\"interview-question\"><strong>Q4: What is the purpose of the suffixes parameter in pd.merge()?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: When both DataFrames share non-key columns with identical names, pandas appends suffixes to avoid namespace collisions. The default is <code>('_x', '_y')</code>. Specifying explicit domain suffixes (e.g. <code>suffixes=('_order', '_customer')</code> or <code>suffixes=('', '_meta')</code>) is essential for pipeline maintainability and schema drift defense.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n\n      <div class=\"interview-item\" id=\"pyDay23IQ5\">\n        <p class=\"interview-question\"><strong>Q5: What does indicator=True do and how is it used in data auditing?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: It adds a categorical column named <code>_merge</code> with values <code>'left_only'</code>, <code>'right_only'</code>, or <code>'both'</code>. It is primarily used to audit bilateral reconciliations and build Anti-Joins by filtering rows where <code>_merge == 'left_only'</code>.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n\n      <div class=\"interview-item\" id=\"pyDay23IQ6\">\n        <p class=\"interview-question\"><strong>Q6: What happens during an accidental many-to-many merge?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: If a key has $M$ occurrences in the left DataFrame and $N$ occurrences in the right, the merge generates $M \times N$ output rows for that key. This silent multiplication explodes table length, exhausts memory, and drastically inflates metric totals (e.g. doubling reported revenue).</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n\n      <div class=\"interview-item\" id=\"pyDay23IQ7\">\n        <p class=\"interview-question\"><strong>Q7: How does the validate parameter protect against fanout bugs?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: <code>validate</code> takes <code>'one_to_one'</code>, <code>'many_to_one'</code>, <code>'one_to_many'</code>, or <code>'many_to_many'</code>. If the actual data violates the specified contract (for example, if a lookup table in a <code>many_to_one</code> merge contains duplicate keys), pandas immediately raises <code>pd.errors.MergeError</code>, halting the pipeline before corrupt data reaches downstream dashboards.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n\n      <div class=\"interview-item\" id=\"pyDay23IQ8\">\n        <p class=\"interview-question\"><strong>Q8: What is an Anti-Join and what are the two ways to write it in pandas?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: An Anti-Join returns rows from table A that have no matching key in table B. Method 1: Left merge with <code>indicator=True</code> and filter <code>df[df['_merge'] == 'left_only']</code>. Method 2 (more idiomatic and memory-efficient): <code>df_a[~df_a['key'].isin(df_b['key'])]</code>.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n\n      <div class=\"interview-item\" id=\"pyDay23IQ9\">\n        <p class=\"interview-question\"><strong>Q9: How should you concatenate 12 monthly CSV files with identical schemas?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: Read each file into a Python list: <code>frames = [pd.read_csv(f) for f in file_list]</code>, then call <code>pd.concat(frames, ignore_index=True)</code> exactly once. Never iteratively call <code>pd.concat</code> in a loop.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n\n      <div class=\"interview-item\" id=\"pyDay23IQ10\">\n        <p class=\"interview-question\"><strong>Q10: Why must you almost always set ignore_index=True when stacking with pd.concat?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: Without <code>ignore_index=True</code>, pandas preserves the original index labels of every input frame. Stacking two frames with 0-based indices creates repeated labels <code>[0, 1, ..., 0, 1]</code>. Downstream label selections using <code>.loc[0]</code> will return multiple rows instead of a single series, causing subtle production crashes.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n\n      <div class=\"interview-item\" id=\"pyDay23IQ11\">\n        <p class=\"interview-question\"><strong>Q11: What is the difference between join='outer' and join='inner' in pd.concat()?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: In row stacking (<code>axis=0</code>), <code>join='outer'</code> (default) preserves the union of all columns across all frames, filling missing values with NaN. <code>join='inner'</code> computes the intersection, keeping only columns present in every single input DataFrame.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n\n      <div class=\"interview-item\" id=\"pyDay23IQ12\">\n        <p class=\"interview-question\"><strong>Q12: What does axis=1 accomplish in pd.concat()?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: It places DataFrames side by side horizontally, aligning rows strictly by their index labels. Rows without an index partner in the other frame are populated with NaN (or dropped if <code>join='inner'</code>).</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n\n      <div class=\"interview-item\" id=\"pyDay23IQ13\">\n        <p class=\"interview-question\"><strong>Q13: Why was DataFrame.append() permanently removed in pandas 2.0?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: <code>append()</code> created the false impression that rows could be added in-place like a Python list. Because DataFrames are contiguous block memory arrays, every call to <code>append()</code> copied the entire existing DataFrame, leading to severe $O(N^2)$ memory and CPU degradation. Removing it forces developers to accumulate lists and call <code>pd.concat</code> once ($O(N)$).</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n\n      <div class=\"interview-item\" id=\"pyDay23IQ14\">\n        <p class=\"interview-question\"><strong>Q14: Why does merging an int64 column with a string column fail in pandas?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: Pandas enforces strict type equality during key factorization. Merging <code>int64</code> with <code>object</code>/<code>str</code> raises <code>ValueError: You are trying to merge on int64 and str columns for key '...'</code>. You must explicitly cast them using <code>.astype(int)</code> or <code>.astype(str)</code> prior to merging.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n\n      <div class=\"interview-item\" id=\"pyDay23IQ15\">\n        <p class=\"interview-question\"><strong>Q15: How do NaN keys behave during a merge in pandas compared to SQL?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: In standard SQL, <code>NULL = NULL</code> evaluates to false/unknown, so NULL keys never match. In pandas, <strong>NaN matches NaN</strong> because key codes compare equal in the internal factorization engine. Unchecked missing keys will match other missing keys, generating unintended cross-row associations.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n\n      <div class=\"interview-item\" id=\"pyDay23IQ16\">\n        <p class=\"interview-question\"><strong>Q16: What is pd.merge_asof() and what is its primary production use case?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: <code>pd.merge_asof()</code> performs an ordered temporal join that matches each left record to the nearest preceding right record by timestamp (or numeric key). It is widely used in quantitative finance to match trade execution timestamps to the most recent prevailing market quote. Both frames must be monotonically pre-sorted by the key.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n\n      <div class=\"interview-item\" id=\"pyDay23IQ17\">\n        <p class=\"interview-question\"><strong>Q17: What are the default join type and key alignment for DataFrame.join()?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: <code>df.join()</code> defaults to <code>how='left'</code> (unlike <code>merge</code> which defaults to <code>how='inner'</code>) and matches strictly on row index labels. If column names collide, it does not auto-suffix; you must supply <code>lsuffix</code> and/or <code>rsuffix</code> or it raises a <code>ValueError</code>.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n\n      <div class=\"interview-item\" id=\"pyDay23IQ18\">\n        <p class=\"interview-question\"><strong>Q18: How do you verify join integrity and detect row count inflation in production?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: 1) Assert <code>validate='many_to_one'</code>. 2) Compare <code>len(merged) == len(left_df)</code> for left joins. 3) Verify that the right key is unique using <code>assert right_df['key'].is_unique</code> prior to joining.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n\n      <div class=\"interview-item\" id=\"pyDay23IQ19\">\n        <p class=\"interview-question\"><strong>Q19: How do you perform a merge across multiple composite columns?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: Pass a list of column names: <code>pd.merge(df1, df2, on=['fiscal_year', 'region_code'])</code>. Rows only match if all specified key columns match simultaneously.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n\n      <div class=\"interview-item\" id=\"pyDay23IQ20\">\n        <p class=\"interview-question\"><strong>Q20: What tools does pandas provide to compare two versions of the same table?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: <code>df1.equals(df2)</code> checks for strict identicality including dtypes and indices. <code>df1.compare(df2)</code> highlights differing cells side-by-side for frames with matching shape and labels. An outer merge with <code>indicator=True</code> audits added, dropped, and common rows.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n\n      <div class=\"interview-item\" id=\"pyDay23IQ21\">\n        <p class=\"interview-question\"><strong>Q21: How do you calculate total customer spend including customers with 0 orders?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: Aggregate orders first: <code>spend = orders.groupby('cust_id', as_index=False)['amt'].sum()</code>. Then perform a left join from customers: <code>customers.merge(spend, on='cust_id', how='left').fillna({'amt': 0.0})</code>. Aggregating prior to merging prevents row fanout.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n\n      <div class=\"interview-item\" id=\"pyDay23IQ22\">\n        <p class=\"interview-question\"><strong>Q22: How do you tag source batch metadata onto stacked monthly files?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: Method 1: Assign a source column to each chunk: <code>pd.concat([df.assign(month=m) for m, df in months.items()], ignore_index=True)</code>. Method 2: Pass a dictionary or <code>keys=</code> to <code>pd.concat</code> to create a hierarchical MultiIndex.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n\n      <div class=\"interview-item\" id=\"pyDay23IQ23\">\n        <p class=\"interview-question\"><strong>Q23: How do you perform an atomic Upsert (Update + Insert) using pandas?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: Anti-join existing data against incoming keys to remove outdated records: <code>clean_old = old[~old['id'].isin(new['id'])]</code>, then vertically concatenate the new records: <code>pd.concat([clean_old, new], ignore_index=True)</code>.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n\n      <div class=\"interview-item\" id=\"pyDay23IQ24\">\n        <p class=\"interview-question\"><strong>Q24: What join algorithm does pd.merge() employ under the hood?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: Pandas uses an in-memory hash join. It factorizes the keys into shared integer codes using a hash table, evaluates matches in C via <code>pandas._libs.join</code>, and constructs indexer arrays for left and right positions, running in roughly $O(N + M)$ time.</em></p></div>\n      </div>\n      <hr class=\"interview-divider\" />\n\n      <div class=\"interview-item\" id=\"pyDay23IQ25\">\n        <p class=\"interview-question\"><strong>Q25: What strategies minimize memory consumption during massive table merges?</strong></p>\n        <div class=\"interview-answer\"><p><em>A: 1) Prune inputs beforehand: <code>left[['key', 'needed_col']].merge(...)</code>. 2) Downcast high-cardinality string keys to categorical or integer codes. 3) For datasets exceeding available RAM, process data in partitioned chunks or push the join to an analytical database engine (e.g. DuckDB, BigQuery, Snowflake).</em></p></div>\n      </div>\n    </div>\n  </section>\n"
    }
  ],
  "practiceQuestions": [
    {
      "id": 1,
      "difficulty": "Easy",
      "category": "merge_basics",
      "title": "Basic Inner Merge on Common Key",
      "given": "orders = pd.DataFrame({'oid': [1, 2, 3], 'cid': [10, 20, 30]})\ncusts = pd.DataFrame({'cid': [20, 30, 40], 'name': ['Ravi', 'Zoya', 'Amit']})",
      "outputs": [
        "p1_oids",
        "p1_names"
      ],
      "starterCode": "",
      "desc": "Given orders and custs DataFrames, perform an inner merge on 'cid'. Extract the resulting 'oid' column into list p1_oids ([2, 3]) and 'name' into list p1_names (['Ravi', 'Zoya']).",
      "prompt": "<strong>[Easy] Basic Inner Merge on Common Key</strong><p>Given <code>orders</code> and <code>custs</code>: Perform an inner join using <code>m = pd.merge(orders, custs, on='cid')</code>. Extract <code>p1_oids = m['oid'].tolist()</code> and <code>p1_names = m['name'].tolist()</code>.</p>",
      "ref": "import pandas as pd\norders = pd.DataFrame({'oid': [1, 2, 3], 'cid': [10, 20, 30]})\ncusts = pd.DataFrame({'cid': [20, 30, 40], 'name': ['Ravi', 'Zoya', 'Amit']})\nm = pd.merge(orders, custs, on='cid')\np1_oids = m['oid'].tolist()\np1_names = m['name'].tolist()\nprint(f'{p1_oids=}, {p1_names=}')\n",
      "solution": "import pandas as pd\norders = pd.DataFrame({'oid': [1, 2, 3], 'cid': [10, 20, 30]})\ncusts = pd.DataFrame({'cid': [20, 30, 40], 'name': ['Ravi', 'Zoya', 'Amit']})\nm = pd.merge(orders, custs, on='cid')\np1_oids = m['oid'].tolist()\np1_names = m['name'].tolist()\nprint(f'{p1_oids=}, {p1_names=}')\n",
      "target": "p1_oids=[2, 3], p1_names=['Ravi', 'Zoya']\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "p1_oids",
            "type": "list",
            "value": [
              2,
              3
            ]
          },
          {
            "name": "p1_names",
            "type": "list",
            "value": [
              "Ravi",
              "Zoya"
            ]
          }
        ]
      },
      "explanation": "Inner merge only retains rows with keys present in both DataFrames (cid values 20 and 30).",
      "hint": "Use pd.merge(orders, custs, on='cid') then extract .tolist()."
    },
    {
      "id": 2,
      "difficulty": "Easy",
      "category": "merge_basics",
      "title": "Left Join Preserving All Primary Records",
      "given": "emp = pd.DataFrame({'id': [1, 2, 3], 'dept_id': [10, 20, 99]})\ndept = pd.DataFrame({'dept_id': [10, 20], 'dname': ['Eng', 'HR']})",
      "outputs": [
        "p2_row_count",
        "p2_null_count"
      ],
      "starterCode": "",
      "desc": "Given employees and departments, execute a left join on 'dept_id'. Store total resulting rows in p2_row_count (3) and the number of unassigned department nulls in p2_null_count (1).",
      "prompt": "<strong>[Easy] Left Join Preserving All Primary Records</strong><p>Perform <code>m = pd.merge(emp, dept, on='dept_id', how='left')</code>. Extract <code>p2_row_count = len(m)</code> and <code>p2_null_count = int(m['dname'].isna().sum())</code>.</p>",
      "ref": "import pandas as pd\nemp = pd.DataFrame({'id': [1, 2, 3], 'dept_id': [10, 20, 99]})\ndept = pd.DataFrame({'dept_id': [10, 20], 'dname': ['Eng', 'HR']})\nm = pd.merge(emp, dept, on='dept_id', how='left')\np2_row_count = len(m)\np2_null_count = int(m['dname'].isna().sum())\nprint(f'{p2_row_count=}, {p2_null_count=}')\n",
      "solution": "import pandas as pd\nemp = pd.DataFrame({'id': [1, 2, 3], 'dept_id': [10, 20, 99]})\ndept = pd.DataFrame({'dept_id': [10, 20], 'dname': ['Eng', 'HR']})\nm = pd.merge(emp, dept, on='dept_id', how='left')\np2_row_count = len(m)\np2_null_count = int(m['dname'].isna().sum())\nprint(f'{p2_row_count=}, {p2_null_count=}')\n",
      "target": "p2_row_count=3, p2_null_count=1\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "p2_row_count",
            "type": "int",
            "value": 3
          },
          {
            "name": "p2_null_count",
            "type": "int",
            "value": 1
          }
        ]
      },
      "explanation": "how='left' keeps all left rows (id 1, 2, 3). For dept_id 99, right columns become NaN.",
      "hint": "pd.merge(emp, dept, on='dept_id', how='left') and check .isna().sum()."
    },
    {
      "id": 3,
      "difficulty": "Easy",
      "category": "merge_basics",
      "title": "Right Join for Dimension Completeness",
      "given": "emp = pd.DataFrame({'eid': [101, 102], 'did': [1, 2]})\ndepts = pd.DataFrame({'did': [1, 2, 3], 'dept': ['Sales', 'Ops', 'Finance']})",
      "outputs": [
        "p3_depts",
        "p3_unassigned"
      ],
      "starterCode": "",
      "desc": "Given employees and departments, perform a right join on 'did' to preserve all departments. Extract 'dept' into p3_depts (['Sales', 'Ops', 'Finance']) and the count of unstaffed departments into p3_unassigned (1).",
      "prompt": "<strong>[Easy] Right Join for Dimension Completeness</strong><p>Execute <code>m = pd.merge(emp, depts, on='did', how='right')</code>. Extract <code>p3_depts = m['dept'].tolist()</code> and <code>p3_unassigned = int(m['eid'].isna().sum())</code>.</p>",
      "ref": "import pandas as pd\nemp = pd.DataFrame({'eid': [101, 102], 'did': [1, 2]})\ndepts = pd.DataFrame({'did': [1, 2, 3], 'dept': ['Sales', 'Ops', 'Finance']})\nm = pd.merge(emp, depts, on='did', how='right')\np3_depts = m['dept'].tolist()\np3_unassigned = int(m['eid'].isna().sum())\nprint(f'{p3_depts=}, {p3_unassigned=}')\n",
      "solution": "import pandas as pd\nemp = pd.DataFrame({'eid': [101, 102], 'did': [1, 2]})\ndepts = pd.DataFrame({'did': [1, 2, 3], 'dept': ['Sales', 'Ops', 'Finance']})\nm = pd.merge(emp, depts, on='did', how='right')\np3_depts = m['dept'].tolist()\np3_unassigned = int(m['eid'].isna().sum())\nprint(f'{p3_depts=}, {p3_unassigned=}')\n",
      "target": "p3_depts=['Sales', 'Ops', 'Finance'], p3_unassigned=1\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "p3_depts",
            "type": "list",
            "value": [
              "Sales",
              "Ops",
              "Finance"
            ]
          },
          {
            "name": "p3_unassigned",
            "type": "int",
            "value": 1
          }
        ]
      },
      "explanation": "how='right' guarantees every right row is kept, populating unmatched left attributes with NaN.",
      "hint": "pd.merge(emp, depts, on='did', how='right') preserves all 3 depts."
    },
    {
      "id": 4,
      "difficulty": "Easy",
      "category": "merge_basics",
      "title": "Full Outer Join for Bilateral Reconciliation",
      "given": "sys_a = pd.DataFrame({'uid': [1, 2], 'bal_a': [100, 200]})\nsys_b = pd.DataFrame({'uid': [2, 3], 'bal_b': [200, 300]})",
      "outputs": [
        "p4_uids",
        "p4_total_rows"
      ],
      "starterCode": "",
      "desc": "Given balances from two banking ledgers, execute a full outer merge on 'uid'. Extract the sorted list of all unique account ids into p4_uids ([1, 2, 3]) and total rows into p4_total_rows (3).",
      "prompt": "<strong>[Easy] Full Outer Join for Bilateral Reconciliation</strong><p>Perform <code>m = pd.merge(sys_a, sys_b, on='uid', how='outer')</code>. Extract <code>p4_uids = sorted(m['uid'].tolist())</code> and <code>p4_total_rows = len(m)</code>.</p>",
      "ref": "import pandas as pd\nsys_a = pd.DataFrame({'uid': [1, 2], 'bal_a': [100, 200]})\nsys_b = pd.DataFrame({'uid': [2, 3], 'bal_b': [200, 300]})\nm = pd.merge(sys_a, sys_b, on='uid', how='outer')\np4_uids = sorted(m['uid'].tolist())\np4_total_rows = len(m)\nprint(f'{p4_uids=}, {p4_total_rows=}')\n",
      "solution": "import pandas as pd\nsys_a = pd.DataFrame({'uid': [1, 2], 'bal_a': [100, 200]})\nsys_b = pd.DataFrame({'uid': [2, 3], 'bal_b': [200, 300]})\nm = pd.merge(sys_a, sys_b, on='uid', how='outer')\np4_uids = sorted(m['uid'].tolist())\np4_total_rows = len(m)\nprint(f'{p4_uids=}, {p4_total_rows=}')\n",
      "target": "p4_uids=[1, 2, 3], p4_total_rows=3\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "p4_uids",
            "type": "list",
            "value": [
              1,
              2,
              3
            ]
          },
          {
            "name": "p4_total_rows",
            "type": "int",
            "value": 3
          }
        ]
      },
      "explanation": "how='outer' computes the union of keys across both frames, retaining all unique accounts.",
      "hint": "pd.merge(sys_a, sys_b, on='uid', how='outer')."
    },
    {
      "id": 5,
      "difficulty": "Easy",
      "category": "key_alignment",
      "title": "Asymmetric Key Names with left_on & right_on",
      "given": "orders = pd.DataFrame({'order_id': [1, 2], 'customer_id': [101, 102]})\ncustomers = pd.DataFrame({'id': [101, 102], 'name': ['Asha', 'Ravi']})",
      "outputs": [
        "p5_cols",
        "p5_len"
      ],
      "starterCode": "",
      "desc": "Given tables with differing ID column names, left merge on left_on='customer_id', right_on='id' and drop the redundant right key 'id'. Extract sorted columns into p5_cols (['customer_id', 'name', 'order_id']) and row count into p5_len (2).",
      "prompt": "<strong>[Easy] Asymmetric Key Names with left_on & right_on</strong><p>Perform <code>m = pd.merge(orders, customers, left_on='customer_id', right_on='id', how='left').drop(columns='id')</code>. Extract <code>p5_cols = sorted(m.columns.tolist())</code> and <code>p5_len = len(m)</code>.</p>",
      "ref": "import pandas as pd\norders = pd.DataFrame({'order_id': [1, 2], 'customer_id': [101, 102]})\ncustomers = pd.DataFrame({'id': [101, 102], 'name': ['Asha', 'Ravi']})\nm = pd.merge(orders, customers, left_on='customer_id', right_on='id', how='left').drop(columns='id')\np5_cols = sorted(m.columns.tolist())\np5_len = len(m)\nprint(f'{p5_cols=}, {p5_len=}')\n",
      "solution": "import pandas as pd\norders = pd.DataFrame({'order_id': [1, 2], 'customer_id': [101, 102]})\ncustomers = pd.DataFrame({'id': [101, 102], 'name': ['Asha', 'Ravi']})\nm = pd.merge(orders, customers, left_on='customer_id', right_on='id', how='left').drop(columns='id')\np5_cols = sorted(m.columns.tolist())\np5_len = len(m)\nprint(f'{p5_cols=}, {p5_len=}')\n",
      "target": "p5_cols=['customer_id', 'name', 'order_id'], p5_len=2\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "p5_cols",
            "type": "list",
            "value": [
              "customer_id",
              "name",
              "order_id"
            ]
          },
          {
            "name": "p5_len",
            "type": "int",
            "value": 2
          }
        ]
      },
      "explanation": "When join key names differ, pandas retains both in the output. Dropping the duplicate cleans the schema.",
      "hint": "Use left_on='customer_id', right_on='id' then .drop(columns='id')."
    },
    {
      "id": 6,
      "difficulty": "Easy",
      "category": "suffixes",
      "title": "Disambiguating Colliding Columns with Suffixes",
      "given": "left = pd.DataFrame({'id': [1, 2], 'score': [85, 90]})\nright = pd.DataFrame({'id': [1, 2], 'score': [88, 92]})",
      "outputs": [
        "p6_cols",
        "p6_final_scores"
      ],
      "starterCode": "",
      "desc": "Given tables sharing the non-key column 'score', inner merge on 'id' specifying suffixes=('_midterm', '_final'). Extract sorted column names into p6_cols (['id', 'score_final', 'score_midterm']) and final scores into p6_final_scores ([88, 92]).",
      "prompt": "<strong>[Easy] Disambiguating Colliding Columns with Suffixes</strong><p>Perform <code>m = pd.merge(left, right, on='id', suffixes=('_midterm', '_final'))</code>. Extract <code>p6_cols = sorted(m.columns.tolist())</code> and <code>p6_final_scores = m['score_final'].tolist()</code>.</p>",
      "ref": "import pandas as pd\nleft = pd.DataFrame({'id': [1, 2], 'score': [85, 90]})\nright = pd.DataFrame({'id': [1, 2], 'score': [88, 92]})\nm = pd.merge(left, right, on='id', suffixes=('_midterm', '_final'))\np6_cols = sorted(m.columns.tolist())\np6_final_scores = m['score_final'].tolist()\nprint(f'{p6_cols=}, {p6_final_scores=}')\n",
      "solution": "import pandas as pd\nleft = pd.DataFrame({'id': [1, 2], 'score': [85, 90]})\nright = pd.DataFrame({'id': [1, 2], 'score': [88, 92]})\nm = pd.merge(left, right, on='id', suffixes=('_midterm', '_final'))\np6_cols = sorted(m.columns.tolist())\np6_final_scores = m['score_final'].tolist()\nprint(f'{p6_cols=}, {p6_final_scores=}')\n",
      "target": "p6_cols=['id', 'score_final', 'score_midterm'], p6_final_scores=[88, 92]\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "p6_cols",
            "type": "list",
            "value": [
              "id",
              "score_final",
              "score_midterm"
            ]
          },
          {
            "name": "p6_final_scores",
            "type": "list",
            "value": [
              88,
              92
            ]
          }
        ]
      },
      "explanation": "suffixes=('...', '...') renames colliding non-key columns, avoiding ambiguous _x and _y defaults.",
      "hint": "Pass suffixes=('_midterm', '_final') to pd.merge."
    },
    {
      "id": 7,
      "difficulty": "Easy",
      "category": "index_join",
      "title": "Index-Aligned Join with df.join()",
      "given": "df1 = pd.DataFrame({'revenue': [500, 700]}, index=['Q1', 'Q2'])\ndf2 = pd.DataFrame({'cost': [300, 400]}, index=['Q1', 'Q2'])",
      "outputs": [
        "p7_profit"
      ],
      "starterCode": "",
      "desc": "Given two index-aligned quarterly financial tables, combine them using df1.join(df2). Compute quarterly profit (revenue - cost) as a list into p7_profit ([200, 300]).",
      "prompt": "<strong>[Easy] Index-Aligned Join with df.join()</strong><p>Join index-aligned frames via <code>m = df1.join(df2)</code> and extract profit into <code>p7_profit = (m['revenue'] - m['cost']).tolist()</code>.</p>",
      "ref": "import pandas as pd\ndf1 = pd.DataFrame({'revenue': [500, 700]}, index=['Q1', 'Q2'])\ndf2 = pd.DataFrame({'cost': [300, 400]}, index=['Q1', 'Q2'])\nm = df1.join(df2)\np7_profit = (m['revenue'] - m['cost']).tolist()\nprint(f'{p7_profit=}')\n",
      "solution": "import pandas as pd\ndf1 = pd.DataFrame({'revenue': [500, 700]}, index=['Q1', 'Q2'])\ndf2 = pd.DataFrame({'cost': [300, 400]}, index=['Q1', 'Q2'])\nm = df1.join(df2)\np7_profit = (m['revenue'] - m['cost']).tolist()\nprint(f'{p7_profit=}')\n",
      "target": "p7_profit=[200, 300]\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "p7_profit",
            "type": "list",
            "value": [
              200,
              300
            ]
          }
        ]
      },
      "explanation": "df.join() performs a left join directly on row index labels by default.",
      "hint": "m = df1.join(df2) then calculate (m['revenue'] - m['cost']).tolist()."
    },
    {
      "id": 8,
      "difficulty": "Easy",
      "category": "concat_stack",
      "title": "Vertical Row Stacking with ignore_index=True",
      "given": "jan = pd.DataFrame({'day': [1, 2], 'sales': [10, 20]})\nfeb = pd.DataFrame({'day': [1, 2], 'sales': [30, 40]})",
      "outputs": [
        "p8_len",
        "p8_max_index"
      ],
      "starterCode": "",
      "desc": "Given January and February sales files, stack them vertically using pd.concat with ignore_index=True. Extract total rows into p8_len (4) and the maximum index value into p8_max_index (3).",
      "prompt": "<strong>[Easy] Vertical Row Stacking with ignore_index=True</strong><p>Stack frames via <code>m = pd.concat([jan, feb], ignore_index=True)</code>. Extract <code>p8_len = len(m)</code> and <code>p8_max_index = int(m.index.max())</code>.</p>",
      "ref": "import pandas as pd\njan = pd.DataFrame({'day': [1, 2], 'sales': [10, 20]})\nfeb = pd.DataFrame({'day': [1, 2], 'sales': [30, 40]})\nm = pd.concat([jan, feb], ignore_index=True)\np8_len = len(m)\np8_max_index = int(m.index.max())\nprint(f'{p8_len=}, {p8_max_index=}')\n",
      "solution": "import pandas as pd\njan = pd.DataFrame({'day': [1, 2], 'sales': [10, 20]})\nfeb = pd.DataFrame({'day': [1, 2], 'sales': [30, 40]})\nm = pd.concat([jan, feb], ignore_index=True)\np8_len = len(m)\np8_max_index = int(m.index.max())\nprint(f'{p8_len=}, {p8_max_index=}')\n",
      "target": "p8_len=4, p8_max_index=3\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "p8_len",
            "type": "int",
            "value": 4
          },
          {
            "name": "p8_max_index",
            "type": "int",
            "value": 3
          }
        ]
      },
      "explanation": "ignore_index=True discards original index labels and generates a clean contiguous 0..N-1 RangeIndex.",
      "hint": "pd.concat([jan, feb], ignore_index=True)."
    },
    {
      "id": 9,
      "difficulty": "Medium",
      "category": "composite_keys",
      "title": "Composite Multi-Column Merge Alignment",
      "given": "q_actual = pd.DataFrame({'year': [2026, 2026], 'quarter': [1, 2], 'actual': [100, 150]})\nq_target = pd.DataFrame({'year': [2026, 2026], 'quarter': [1, 2], 'target': [90, 140]})",
      "outputs": [
        "p9_deltas"
      ],
      "starterCode": "",
      "desc": "Given tables indexed by multiple business keys ('year', 'quarter'), perform an inner merge matching both columns. Calculate variance (actual - target) into p9_deltas ([10, 10]).",
      "prompt": "<strong>[Medium] Composite Multi-Column Merge Alignment</strong><p>Merge on multiple keys: <code>m = pd.merge(q_actual, q_target, on=['year', 'quarter'])</code> and extract <code>p9_deltas = (m['actual'] - m['target']).tolist()</code>.</p>",
      "ref": "import pandas as pd\nq_actual = pd.DataFrame({'year': [2026, 2026], 'quarter': [1, 2], 'actual': [100, 150]})\nq_target = pd.DataFrame({'year': [2026, 2026], 'quarter': [1, 2], 'target': [90, 140]})\nm = pd.merge(q_actual, q_target, on=['year', 'quarter'])\np9_deltas = (m['actual'] - m['target']).tolist()\nprint(f'{p9_deltas=}')\n",
      "solution": "import pandas as pd\nq_actual = pd.DataFrame({'year': [2026, 2026], 'quarter': [1, 2], 'actual': [100, 150]})\nq_target = pd.DataFrame({'year': [2026, 2026], 'quarter': [1, 2], 'target': [90, 140]})\nm = pd.merge(q_actual, q_target, on=['year', 'quarter'])\np9_deltas = (m['actual'] - m['target']).tolist()\nprint(f'{p9_deltas=}')\n",
      "target": "p9_deltas=[10, 10]\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "p9_deltas",
            "type": "list",
            "value": [
              10,
              10
            ]
          }
        ]
      },
      "explanation": "Passing on=['year', 'quarter'] requires both key columns to match simultaneously.",
      "hint": "pd.merge(q_actual, q_target, on=['year', 'quarter'])."
    },
    {
      "id": 10,
      "difficulty": "Medium",
      "category": "audit_indicator",
      "title": "Match Provenance Tracking with indicator=True",
      "given": "base = pd.DataFrame({'id': [1, 2, 3]})\nupdate = pd.DataFrame({'id': [2, 3, 4]})",
      "outputs": [
        "p10_counts"
      ],
      "starterCode": "",
      "desc": "Given base and update tables, execute a full outer merge with indicator=True. Count occurrences in the '_merge' column and store as a dictionary into p10_counts ({'both': 2, 'left_only': 1, 'right_only': 1}).",
      "prompt": "<strong>[Medium] Match Provenance Tracking with indicator=True</strong><p>Audit table changes via <code>m = pd.merge(base, update, on='id', how='outer', indicator=True)</code>. Extract <code>p10_counts = {str(k): int(v) for k, v in m['_merge'].value_counts().to_dict().items()}</code>.</p>",
      "ref": "import pandas as pd\nbase = pd.DataFrame({'id': [1, 2, 3]})\nupdate = pd.DataFrame({'id': [2, 3, 4]})\nm = pd.merge(base, update, on='id', how='outer', indicator=True)\np10_counts = {str(k): int(v) for k, v in m['_merge'].value_counts().to_dict().items()}\nprint(f'{p10_counts=}')\n",
      "solution": "import pandas as pd\nbase = pd.DataFrame({'id': [1, 2, 3]})\nupdate = pd.DataFrame({'id': [2, 3, 4]})\nm = pd.merge(base, update, on='id', how='outer', indicator=True)\np10_counts = {str(k): int(v) for k, v in m['_merge'].value_counts().to_dict().items()}\nprint(f'{p10_counts=}')\n",
      "target": "p10_counts={'both': 2, 'left_only': 1, 'right_only': 1}\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "p10_counts",
            "type": "dict"
          }
        ]
      },
      "explanation": "indicator=True creates a categorical '_merge' column indicating whether a row was from left_only, right_only, or both.",
      "hint": "pd.merge(base, update, on='id', how='outer', indicator=True)."
    },
    {
      "id": 11,
      "difficulty": "Medium",
      "category": "anti_join",
      "title": "Anti-Join: Identifying Unmatched Records",
      "given": "all_users = pd.DataFrame({'uid': [1, 2, 3, 4], 'name': ['A', 'B', 'C', 'D']})\nactive_subscribers = pd.DataFrame({'uid': [2, 4]})",
      "outputs": [
        "p11_unsubscribed",
        "p11_count"
      ],
      "starterCode": "",
      "desc": "Given all users and active subscribers, execute an anti-join using boolean negation (~isin) to find users who have never subscribed. Store sorted uids in p11_unsubscribed ([1, 3]) and count in p11_count (2).",
      "prompt": "<strong>[Medium] Anti-Join: Identifying Unmatched Records</strong><p>Perform an anti-join: <code>p11_unsubscribed = sorted(all_users[~all_users['uid'].isin(active_subscribers['uid'])]['uid'].tolist())</code> and <code>p11_count = len(p11_unsubscribed)</code>.</p>",
      "ref": "import pandas as pd\nall_users = pd.DataFrame({'uid': [1, 2, 3, 4], 'name': ['A', 'B', 'C', 'D']})\nactive_subscribers = pd.DataFrame({'uid': [2, 4]})\np11_unsubscribed = sorted(all_users[~all_users['uid'].isin(active_subscribers['uid'])]['uid'].tolist())\np11_count = len(p11_unsubscribed)\nprint(f'{p11_unsubscribed=}, {p11_count=}')\n",
      "solution": "import pandas as pd\nall_users = pd.DataFrame({'uid': [1, 2, 3, 4], 'name': ['A', 'B', 'C', 'D']})\nactive_subscribers = pd.DataFrame({'uid': [2, 4]})\np11_unsubscribed = sorted(all_users[~all_users['uid'].isin(active_subscribers['uid'])]['uid'].tolist())\np11_count = len(p11_unsubscribed)\nprint(f'{p11_unsubscribed=}, {p11_count=}')\n",
      "target": "p11_unsubscribed=[1, 3], p11_count=2\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "p11_unsubscribed",
            "type": "list",
            "value": [
              1,
              3
            ]
          },
          {
            "name": "p11_count",
            "type": "int",
            "value": 2
          }
        ]
      },
      "explanation": "An anti-join filters rows in A with no match in B using ~df['key'].isin(...).",
      "hint": "Filter all_users with ~all_users['uid'].isin(active_subscribers['uid'])."
    },
    {
      "id": 12,
      "difficulty": "Medium",
      "category": "semi_join",
      "title": "Semi-Join: Filtering Without Row Duplication",
      "given": "catalog = pd.DataFrame({'sku': [10, 20, 30, 40], 'item': ['Pen', 'Book', 'Bag', 'Desk']})\norder_items = pd.DataFrame({'sku': [20, 20, 30]})",
      "outputs": [
        "p12_skus"
      ],
      "starterCode": "",
      "desc": "Given product catalog and repeated order line items, perform a semi-join using isin to find catalog items ordered at least once without duplicating catalog rows. Store sorted skus in p12_skus ([20, 30]).",
      "prompt": "<strong>[Medium] Semi-Join: Filtering Without Row Duplication</strong><p>Extract unique active SKUs: <code>p12_skus = sorted(catalog[catalog['sku'].isin(order_items['sku'])]['sku'].tolist())</code>.</p>",
      "ref": "import pandas as pd\ncatalog = pd.DataFrame({'sku': [10, 20, 30, 40], 'item': ['Pen', 'Book', 'Bag', 'Desk']})\norder_items = pd.DataFrame({'sku': [20, 20, 30]})\np12_skus = sorted(catalog[catalog['sku'].isin(order_items['sku'])]['sku'].tolist())\nprint(f'{p12_skus=}')\n",
      "solution": "import pandas as pd\ncatalog = pd.DataFrame({'sku': [10, 20, 30, 40], 'item': ['Pen', 'Book', 'Bag', 'Desk']})\norder_items = pd.DataFrame({'sku': [20, 20, 30]})\np12_skus = sorted(catalog[catalog['sku'].isin(order_items['sku'])]['sku'].tolist())\nprint(f'{p12_skus=}')\n",
      "target": "p12_skus=[20, 30]\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "p12_skus",
            "type": "list",
            "value": [
              20,
              30
            ]
          }
        ]
      },
      "explanation": "A semi-join preserves the original uniqueness of the left table while checking existence in the right table.",
      "hint": "Use catalog[catalog['sku'].isin(order_items['sku'])]."
    },
    {
      "id": 13,
      "difficulty": "Medium",
      "category": "cardinality_validation",
      "title": "Enforcing Cardinality Contracts with validate=",
      "given": "tx = pd.DataFrame({'tx_id': [1, 2, 3], 'store_id': [10, 10, 20]})\nstores = pd.DataFrame({'store_id': [10, 20], 'city': ['Pune', 'Mumbai']})",
      "outputs": [
        "p13_cities",
        "p13_valid"
      ],
      "starterCode": "",
      "desc": "Given transactions and a stores lookup table, left merge asserting validate='many_to_one'. Extract the mapped city list into p13_cities (['Pune', 'Pune', 'Mumbai']) and set p13_valid = True.",
      "prompt": "<strong>[Medium] Enforcing Cardinality Contracts with validate=</strong><p>Perform validated merge: <code>m = pd.merge(tx, stores, on='store_id', how='left', validate='many_to_one')</code>. Extract <code>p13_cities = m['city'].tolist()</code> and <code>p13_valid = True</code>.</p>",
      "ref": "import pandas as pd\ntx = pd.DataFrame({'tx_id': [1, 2, 3], 'store_id': [10, 10, 20]})\nstores = pd.DataFrame({'store_id': [10, 20], 'city': ['Pune', 'Mumbai']})\nm = pd.merge(tx, stores, on='store_id', how='left', validate='many_to_one')\np13_cities = m['city'].tolist()\np13_valid = True\nprint(f'{p13_cities=}, {p13_valid=}')\n",
      "solution": "import pandas as pd\ntx = pd.DataFrame({'tx_id': [1, 2, 3], 'store_id': [10, 10, 20]})\nstores = pd.DataFrame({'store_id': [10, 20], 'city': ['Pune', 'Mumbai']})\nm = pd.merge(tx, stores, on='store_id', how='left', validate='many_to_one')\np13_cities = m['city'].tolist()\np13_valid = True\nprint(f'{p13_cities=}, {p13_valid=}')\n",
      "target": "p13_cities=['Pune', 'Pune', 'Mumbai'], p13_valid=True\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "p13_cities",
            "type": "list",
            "value": [
              "Pune",
              "Pune",
              "Mumbai"
            ]
          },
          {
            "name": "p13_valid",
            "type": "bool",
            "value": true
          }
        ]
      },
      "explanation": "validate='many_to_one' verifies that keys in the right DataFrame are strictly unique, preventing row duplication explosions.",
      "hint": "pd.merge(tx, stores, on='store_id', how='left', validate='many_to_one')."
    },
    {
      "id": 14,
      "difficulty": "Medium",
      "category": "concat_stack",
      "title": "Horizontal Concatenation along axis=1",
      "given": "df_metrics = pd.DataFrame({'accuracy': [0.92, 0.95]}, index=['model_a', 'model_b'])\ndf_timing = pd.DataFrame({'latency_ms': [12.4, 8.1]}, index=['model_a', 'model_b'])",
      "outputs": [
        "p14_shape",
        "p14_cols"
      ],
      "starterCode": "",
      "desc": "Given separate metric and timing evaluation tables indexed by model name, stitch them side-by-side using pd.concat with axis=1. Extract shape into p14_shape ([2, 2]) and sorted column names into p14_cols (['accuracy', 'latency_ms']).",
      "prompt": "<strong>[Medium] Horizontal Concatenation along axis=1</strong><p>Stitch frames horizontally: <code>m = pd.concat([df_metrics, df_timing], axis=1)</code>. Extract <code>p14_shape = list(m.shape)</code> and <code>p14_cols = sorted(m.columns.tolist())</code>.</p>",
      "ref": "import pandas as pd\ndf_metrics = pd.DataFrame({'accuracy': [0.92, 0.95]}, index=['model_a', 'model_b'])\ndf_timing = pd.DataFrame({'latency_ms': [12.4, 8.1]}, index=['model_a', 'model_b'])\nm = pd.concat([df_metrics, df_timing], axis=1)\np14_shape = list(m.shape)\np14_cols = sorted(m.columns.tolist())\nprint(f'{p14_shape=}, {p14_cols=}')\n",
      "solution": "import pandas as pd\ndf_metrics = pd.DataFrame({'accuracy': [0.92, 0.95]}, index=['model_a', 'model_b'])\ndf_timing = pd.DataFrame({'latency_ms': [12.4, 8.1]}, index=['model_a', 'model_b'])\nm = pd.concat([df_metrics, df_timing], axis=1)\np14_shape = list(m.shape)\np14_cols = sorted(m.columns.tolist())\nprint(f'{p14_shape=}, {p14_cols=}')\n",
      "target": "p14_shape=[2, 2], p14_cols=['accuracy', 'latency_ms']\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "p14_shape",
            "type": "list",
            "value": [
              2,
              2
            ]
          },
          {
            "name": "p14_cols",
            "type": "list",
            "value": [
              "accuracy",
              "latency_ms"
            ]
          }
        ]
      },
      "explanation": "axis=1 places tables side-by-side aligned strictly by their row index labels.",
      "hint": "pd.concat([df_metrics, df_timing], axis=1)."
    },
    {
      "id": 15,
      "difficulty": "Medium",
      "category": "concat_stack",
      "title": "Inner Join Column Intersection on Concat",
      "given": "jan = pd.DataFrame({'id': [1, 2], 'amt': [10, 20], 'notes': ['ok', 'late']})\nfeb = pd.DataFrame({'id': [3, 4], 'amt': [30, 40], 'region': ['north', 'south']})",
      "outputs": [
        "p15_cols",
        "p15_total_amt"
      ],
      "starterCode": "",
      "desc": "Given tables with differing non-common columns, vertically stack them keeping ONLY shared columns by passing join='inner' and ignore_index=True. Extract sorted columns into p15_cols (['amt', 'id']) and sum of 'amt' into p15_total_amt (100).",
      "prompt": "<strong>[Medium] Inner Join Column Intersection on Concat</strong><p>Stack shared columns only: <code>m = pd.concat([jan, feb], join='inner', ignore_index=True)</code>. Extract <code>p15_cols = sorted(m.columns.tolist())</code> and <code>p15_total_amt = int(m['amt'].sum())</code>.</p>",
      "ref": "import pandas as pd\njan = pd.DataFrame({'id': [1, 2], 'amt': [10, 20], 'notes': ['ok', 'late']})\nfeb = pd.DataFrame({'id': [3, 4], 'amt': [30, 40], 'region': ['north', 'south']})\nm = pd.concat([jan, feb], join='inner', ignore_index=True)\np15_cols = sorted(m.columns.tolist())\np15_total_amt = int(m['amt'].sum())\nprint(f'{p15_cols=}, {p15_total_amt=}')\n",
      "solution": "import pandas as pd\njan = pd.DataFrame({'id': [1, 2], 'amt': [10, 20], 'notes': ['ok', 'late']})\nfeb = pd.DataFrame({'id': [3, 4], 'amt': [30, 40], 'region': ['north', 'south']})\nm = pd.concat([jan, feb], join='inner', ignore_index=True)\np15_cols = sorted(m.columns.tolist())\np15_total_amt = int(m['amt'].sum())\nprint(f'{p15_cols=}, {p15_total_amt=}')\n",
      "target": "p15_cols=['amt', 'id'], p15_total_amt=100\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "p15_cols",
            "type": "list",
            "value": [
              "amt",
              "id"
            ]
          },
          {
            "name": "p15_total_amt",
            "type": "int",
            "value": 100
          }
        ]
      },
      "explanation": "join='inner' discards unshared columns ('notes' and 'region'), yielding only the intersection of column sets.",
      "hint": "pd.concat([jan, feb], join='inner', ignore_index=True)."
    },
    {
      "id": 16,
      "difficulty": "Medium",
      "category": "concat_stack",
      "title": "Hierarchical MultiIndex Batch Tagging",
      "given": "batch1 = pd.DataFrame({'temp': [21.5, 22.0]})\nbatch2 = pd.DataFrame({'temp': [23.1, 23.8]})",
      "outputs": [
        "p16_levels"
      ],
      "starterCode": "",
      "desc": "Given two sensor batches, vertically stack them while preserving source tags by passing keys=['batch_a', 'batch_b']. Extract the outer MultiIndex level values into list p16_levels (['batch_a', 'batch_a', 'batch_b', 'batch_b']).",
      "prompt": "<strong>[Medium] Hierarchical MultiIndex Batch Tagging</strong><p>Tag stacked batches: <code>m = pd.concat([batch1, batch2], keys=['batch_a', 'batch_b'])</code>. Extract <code>p16_levels = m.index.get_level_values(0).tolist()</code>.</p>",
      "ref": "import pandas as pd\nbatch1 = pd.DataFrame({'temp': [21.5, 22.0]})\nbatch2 = pd.DataFrame({'temp': [23.1, 23.8]})\nm = pd.concat([batch1, batch2], keys=['batch_a', 'batch_b'])\np16_levels = m.index.get_level_values(0).tolist()\nprint(f'{p16_levels=}')\n",
      "solution": "import pandas as pd\nbatch1 = pd.DataFrame({'temp': [21.5, 22.0]})\nbatch2 = pd.DataFrame({'temp': [23.1, 23.8]})\nm = pd.concat([batch1, batch2], keys=['batch_a', 'batch_b'])\np16_levels = m.index.get_level_values(0).tolist()\nprint(f'{p16_levels=}')\n",
      "target": "p16_levels=['batch_a', 'batch_a', 'batch_b', 'batch_b']\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "p16_levels",
            "type": "list",
            "value": [
              "batch_a",
              "batch_a",
              "batch_b",
              "batch_b"
            ]
          }
        ]
      },
      "explanation": "Passing keys= constructs an outer index hierarchy that uniquely tracks the origin of each row.",
      "hint": "pd.concat([batch1, batch2], keys=['batch_a', 'batch_b'])."
    },
    {
      "id": 17,
      "difficulty": "Hard",
      "category": "aggregation_merge",
      "title": "Aggregated Spend Merge with Zero-Filled Nulls",
      "given": "customers = pd.DataFrame({'cid': [1, 2, 3], 'name': ['Asha', 'Ravi', 'Zoya']})\norders = pd.DataFrame({'cid': [1, 1, 3], 'amt': [50.0, 70.0, 40.0]})",
      "outputs": [
        "p17_spend"
      ],
      "starterCode": "",
      "desc": "Calculate total spend per customer name, including customers who placed no orders (imputing 0.0). Aggregate orders by cid, left merge onto customers, and fill missing amt with 0.0. Store dictionary of {name: total_amt} into p17_spend ({'Asha': 120.0, 'Ravi': 0.0, 'Zoya': 40.0}).",
      "prompt": "<strong>[Hard] Aggregated Spend Merge with Zero-Filled Nulls</strong><p>Aggregate then left merge: <code>spend = orders.groupby('cid', as_index=False)['amt'].sum()</code>, then <code>m = customers.merge(spend, on='cid', how='left').fillna({'amt': 0.0})</code>. Extract <code>p17_spend = dict(zip(m['name'], m['amt']))</code>.</p>",
      "ref": "import pandas as pd\ncustomers = pd.DataFrame({'cid': [1, 2, 3], 'name': ['Asha', 'Ravi', 'Zoya']})\norders = pd.DataFrame({'cid': [1, 1, 3], 'amt': [50.0, 70.0, 40.0]})\nspend = orders.groupby('cid', as_index=False)['amt'].sum()\nm = customers.merge(spend, on='cid', how='left').fillna({'amt': 0.0})\np17_spend = dict(zip(m['name'], m['amt']))\nprint(f'{p17_spend=}')\n",
      "solution": "import pandas as pd\ncustomers = pd.DataFrame({'cid': [1, 2, 3], 'name': ['Asha', 'Ravi', 'Zoya']})\norders = pd.DataFrame({'cid': [1, 1, 3], 'amt': [50.0, 70.0, 40.0]})\nspend = orders.groupby('cid', as_index=False)['amt'].sum()\nm = customers.merge(spend, on='cid', how='left').fillna({'amt': 0.0})\np17_spend = dict(zip(m['name'], m['amt']))\nprint(f'{p17_spend=}')\n",
      "target": "p17_spend={'Asha': 120.0, 'Ravi': 0.0, 'Zoya': 40.0}\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "p17_spend",
            "type": "dict"
          }
        ]
      },
      "explanation": "Aggregating before merging avoids cartesian inflation and ensures every customer appears with their exact total spend.",
      "hint": "Groupby orders on cid, left merge onto customers, fillna with 0.0."
    },
    {
      "id": 18,
      "difficulty": "Hard",
      "category": "key_sanitation",
      "title": "Healing Mismatched Key Dtypes (str vs int)",
      "given": "users = pd.DataFrame({'id': [101, 102], 'name': ['Alice', 'Bob']})\nclicks = pd.DataFrame({'id': ['101', '102'], 'clicks': [5, 12]})",
      "outputs": [
        "p18_clicks_sum",
        "p18_names"
      ],
      "starterCode": "",
      "desc": "Merging integer keys with string keys raises a ValueError. Sanitize clicks['id'] to int, merge on 'id', and extract total clicks in p18_clicks_sum (17) and names list into p18_names (['Alice', 'Bob']).",
      "prompt": "<strong>[Hard] Healing Mismatched Key Dtypes (str vs int)</strong><p>Cast before merging: <code>clicks['id'] = clicks['id'].astype(int)</code>, then <code>m = pd.merge(users, clicks, on='id')</code>. Extract <code>p18_clicks_sum = int(m['clicks'].sum())</code> and <code>p18_names = m['name'].tolist()</code>.</p>",
      "ref": "import pandas as pd\nusers = pd.DataFrame({'id': [101, 102], 'name': ['Alice', 'Bob']})\nclicks = pd.DataFrame({'id': ['101', '102'], 'clicks': [5, 12]})\nclicks['id'] = clicks['id'].astype(int)\nm = pd.merge(users, clicks, on='id')\np18_clicks_sum = int(m['clicks'].sum())\np18_names = m['name'].tolist()\nprint(f'{p18_clicks_sum=}, {p18_names=}')\n",
      "solution": "import pandas as pd\nusers = pd.DataFrame({'id': [101, 102], 'name': ['Alice', 'Bob']})\nclicks = pd.DataFrame({'id': ['101', '102'], 'clicks': [5, 12]})\nclicks['id'] = clicks['id'].astype(int)\nm = pd.merge(users, clicks, on='id')\np18_clicks_sum = int(m['clicks'].sum())\np18_names = m['name'].tolist()\nprint(f'{p18_clicks_sum=}, {p18_names=}')\n",
      "target": "p18_clicks_sum=17, p18_names=['Alice', 'Bob']\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "p18_clicks_sum",
            "type": "int",
            "value": 17
          },
          {
            "name": "p18_names",
            "type": "list",
            "value": [
              "Alice",
              "Bob"
            ]
          }
        ]
      },
      "explanation": "Pandas prohibits cross-dtype merges between integer and string representations. Explicit type alignment is mandatory.",
      "hint": "Cast clicks['id'] using .astype(int) before pd.merge."
    },
    {
      "id": 19,
      "difficulty": "Hard",
      "category": "key_sanitation",
      "title": "String Key Normalization (Whitespace & Case)",
      "given": "raw_orders = pd.DataFrame({'city': [' Pune ', 'DELHI'], 'val': [100, 200]})\ngeo_lookup = pd.DataFrame({'city': ['pune', 'delhi'], 'tier': [1, 1]})",
      "outputs": [
        "p19_tiers"
      ],
      "starterCode": "",
      "desc": "Given raw inputs with irregular whitespace and casing, normalize raw_orders['city_clean'] with .str.strip().str.lower() and merge with geo_lookup on city_clean / city. Extract tier values into p19_tiers ([1, 1]).",
      "prompt": "<strong>[Hard] String Key Normalization (Whitespace & Case)</strong><p>Clean text keys: <code>raw_orders['city_clean'] = raw_orders['city'].str.strip().str.lower()</code>. Merge via <code>m = raw_orders.merge(geo_lookup, left_on='city_clean', right_on='city')</code>. Extract <code>p19_tiers = m['tier'].tolist()</code>.</p>",
      "ref": "import pandas as pd\nraw_orders = pd.DataFrame({'city': [' Pune ', 'DELHI'], 'val': [100, 200]})\ngeo_lookup = pd.DataFrame({'city': ['pune', 'delhi'], 'tier': [1, 1]})\nraw_orders['city_clean'] = raw_orders['city'].str.strip().str.lower()\nm = raw_orders.merge(geo_lookup, left_on='city_clean', right_on='city')\np19_tiers = m['tier'].tolist()\nprint(f'{p19_tiers=}')\n",
      "solution": "import pandas as pd\nraw_orders = pd.DataFrame({'city': [' Pune ', 'DELHI'], 'val': [100, 200]})\ngeo_lookup = pd.DataFrame({'city': ['pune', 'delhi'], 'tier': [1, 1]})\nraw_orders['city_clean'] = raw_orders['city'].str.strip().str.lower()\nm = raw_orders.merge(geo_lookup, left_on='city_clean', right_on='city')\np19_tiers = m['tier'].tolist()\nprint(f'{p19_tiers=}')\n",
      "target": "p19_tiers=[1, 1]\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "p19_tiers",
            "type": "list",
            "value": [
              1,
              1
            ]
          }
        ]
      },
      "explanation": "Invisible leading/trailing spaces and mismatched capitalization cause joins to fail silently with empty results.",
      "hint": "Use .str.strip().str.lower() before merging."
    },
    {
      "id": 20,
      "difficulty": "Hard",
      "category": "asof_merge",
      "title": "Temporal Lookups with pd.merge_asof()",
      "given": "trades = pd.DataFrame({'t': pd.to_datetime(['2026-01-01 10:00:03', '2026-01-01 10:00:09']), 'px': [101, 102]})\nquotes = pd.DataFrame({'t': pd.to_datetime(['2026-01-01 10:00:00', '2026-01-01 10:00:05']), 'bid': [100, 101]})",
      "outputs": [
        "p20_bids"
      ],
      "starterCode": "",
      "desc": "Match each execution trade to the nearest preceding quote price in force using pd.merge_asof on timestamp 't'. Extract the matched bid prices into p20_bids ([100, 101]).",
      "prompt": "<strong>[Hard] Temporal Lookups with pd.merge_asof()</strong><p>Perform ordered temporal lookup: <code>m = pd.merge_asof(trades, quotes, on='t')</code>. Extract <code>p20_bids = m['bid'].tolist()</code>.</p>",
      "ref": "import pandas as pd\ntrades = pd.DataFrame({'t': pd.to_datetime(['2026-01-01 10:00:03', '2026-01-01 10:00:09']), 'px': [101, 102]})\nquotes = pd.DataFrame({'t': pd.to_datetime(['2026-01-01 10:00:00', '2026-01-01 10:00:05']), 'bid': [100, 101]})\nm = pd.merge_asof(trades, quotes, on='t')\np20_bids = m['bid'].tolist()\nprint(f'{p20_bids=}')\n",
      "solution": "import pandas as pd\ntrades = pd.DataFrame({'t': pd.to_datetime(['2026-01-01 10:00:03', '2026-01-01 10:00:09']), 'px': [101, 102]})\nquotes = pd.DataFrame({'t': pd.to_datetime(['2026-01-01 10:00:00', '2026-01-01 10:00:05']), 'bid': [100, 101]})\nm = pd.merge_asof(trades, quotes, on='t')\np20_bids = m['bid'].tolist()\nprint(f'{p20_bids=}')\n",
      "target": "p20_bids=[100, 101]\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "p20_bids",
            "type": "list",
            "value": [
              100,
              101
            ]
          }
        ]
      },
      "explanation": "merge_asof matches each left record to the nearest right record whose timestamp is on or before the left timestamp.",
      "hint": "pd.merge_asof(trades, quotes, on='t')."
    }
  ],
  "testQuestions": [
    {
      "id": 1,
      "difficulty": "Easy",
      "category": "merge_basics",
      "title": "Inner Join Result Length",
      "desc": "Given a = pd.DataFrame({'k': [1, 2, 3]}) and b = pd.DataFrame({'k': [2, 3, 4]}), compute t1_len = len(pd.merge(a, b, on='k')) (2).",
      "prompt": "<strong>[Assessment Q1] Inner Join Result Length</strong><p>Compute <code>t1_len = len(pd.merge(a, b, on='k'))</code> for <code>a = pd.DataFrame({'k': [1, 2, 3]})</code> and <code>b = pd.DataFrame({'k': [2, 3, 4]})</code>.</p>",
      "starterCode": "",
      "ref": "import pandas as pd\na = pd.DataFrame({'k': [1, 2, 3]})\nb = pd.DataFrame({'k': [2, 3, 4]})\nt1_len = len(pd.merge(a, b, on='k'))\nprint(f'{t1_len=}')\n",
      "solution": "import pandas as pd\na = pd.DataFrame({'k': [1, 2, 3]})\nb = pd.DataFrame({'k': [2, 3, 4]})\nt1_len = len(pd.merge(a, b, on='k'))\nprint(f'{t1_len=}')\n",
      "target": "t1_len=2\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t1_len",
            "type": "int",
            "value": 2
          }
        ]
      }
    },
    {
      "id": 2,
      "difficulty": "Easy",
      "category": "merge_basics",
      "title": "Left Join Row Preservation Count",
      "desc": "Given a = pd.DataFrame({'k': [1, 2, 3]}) and b = pd.DataFrame({'k': [2]}), compute t2_len = len(pd.merge(a, b, on='k', how='left')) (3).",
      "prompt": "<strong>[Assessment Q2] Left Join Row Preservation Count</strong><p>Compute <code>t2_len = len(pd.merge(a, b, on='k', how='left'))</code> for <code>a = pd.DataFrame({'k': [1, 2, 3]})</code> and <code>b = pd.DataFrame({'k': [2]})</code>.</p>",
      "starterCode": "",
      "ref": "import pandas as pd\na = pd.DataFrame({'k': [1, 2, 3]})\nb = pd.DataFrame({'k': [2]})\nt2_len = len(pd.merge(a, b, on='k', how='left'))\nprint(f'{t2_len=}')\n",
      "solution": "import pandas as pd\na = pd.DataFrame({'k': [1, 2, 3]})\nb = pd.DataFrame({'k': [2]})\nt2_len = len(pd.merge(a, b, on='k', how='left'))\nprint(f'{t2_len=}')\n",
      "target": "t2_len=3\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t2_len",
            "type": "int",
            "value": 3
          }
        ]
      }
    },
    {
      "id": 3,
      "difficulty": "Easy",
      "category": "merge_basics",
      "title": "Full Outer Join Key Count",
      "desc": "Given a = pd.DataFrame({'k': [1, 2]}) and b = pd.DataFrame({'k': [2, 3]}), compute t3_len = len(pd.merge(a, b, on='k', how='outer')) (3).",
      "prompt": "<strong>[Assessment Q3] Full Outer Join Key Count</strong><p>Compute <code>t3_len = len(pd.merge(a, b, on='k', how='outer'))</code> for <code>a = pd.DataFrame({'k': [1, 2]})</code> and <code>b = pd.DataFrame({'k': [2, 3]})</code>.</p>",
      "starterCode": "",
      "ref": "import pandas as pd\na = pd.DataFrame({'k': [1, 2]})\nb = pd.DataFrame({'k': [2, 3]})\nt3_len = len(pd.merge(a, b, on='k', how='outer'))\nprint(f'{t3_len=}')\n",
      "solution": "import pandas as pd\na = pd.DataFrame({'k': [1, 2]})\nb = pd.DataFrame({'k': [2, 3]})\nt3_len = len(pd.merge(a, b, on='k', how='outer'))\nprint(f'{t3_len=}')\n",
      "target": "t3_len=3\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t3_len",
            "type": "int",
            "value": 3
          }
        ]
      }
    },
    {
      "id": 4,
      "difficulty": "Easy",
      "category": "cross_join",
      "title": "Cartesian Cross Join Output Rows",
      "desc": "Given a = pd.DataFrame({'x': ['A', 'B']}) and b = pd.DataFrame({'y': [1, 2, 3]}), compute t4_cross_len = len(pd.merge(a, b, how='cross')) (6).",
      "prompt": "<strong>[Assessment Q4] Cartesian Cross Join Output Rows</strong><p>Compute <code>t4_cross_len = len(pd.merge(a, b, how='cross'))</code> for <code>a = pd.DataFrame({'x': ['A', 'B']})</code> and <code>b = pd.DataFrame({'y': [1, 2, 3]})</code>.</p>",
      "starterCode": "",
      "ref": "import pandas as pd\na = pd.DataFrame({'x': ['A', 'B']})\nb = pd.DataFrame({'y': [1, 2, 3]})\nt4_cross_len = len(pd.merge(a, b, how='cross'))\nprint(f'{t4_cross_len=}')\n",
      "solution": "import pandas as pd\na = pd.DataFrame({'x': ['A', 'B']})\nb = pd.DataFrame({'y': [1, 2, 3]})\nt4_cross_len = len(pd.merge(a, b, how='cross'))\nprint(f'{t4_cross_len=}')\n",
      "target": "t4_cross_len=6\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t4_cross_len",
            "type": "int",
            "value": 6
          }
        ]
      }
    },
    {
      "id": 5,
      "difficulty": "Easy",
      "category": "key_alignment",
      "title": "Asymmetric Key Merged Value Sum",
      "desc": "Given a = pd.DataFrame({'left_id': [1, 2]}) and b = pd.DataFrame({'right_id': [1, 2], 'val': [10, 20]}), merge on left_on='left_id', right_on='right_id' and compute t5_val_sum = int(m['val'].sum()) (30).",
      "prompt": "<strong>[Assessment Q5] Asymmetric Key Merged Value Sum</strong><p>Compute <code>t5_val_sum = int(pd.merge(a, b, left_on='left_id', right_on='right_id')['val'].sum())</code>.</p>",
      "starterCode": "",
      "ref": "import pandas as pd\na = pd.DataFrame({'left_id': [1, 2]})\nb = pd.DataFrame({'right_id': [1, 2], 'val': [10, 20]})\nm = pd.merge(a, b, left_on='left_id', right_on='right_id')\nt5_val_sum = int(m['val'].sum())\nprint(f'{t5_val_sum=}')\n",
      "solution": "import pandas as pd\na = pd.DataFrame({'left_id': [1, 2]})\nb = pd.DataFrame({'right_id': [1, 2], 'val': [10, 20]})\nm = pd.merge(a, b, left_on='left_id', right_on='right_id')\nt5_val_sum = int(m['val'].sum())\nprint(f'{t5_val_sum=}')\n",
      "target": "t5_val_sum=30\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t5_val_sum",
            "type": "int",
            "value": 30
          }
        ]
      }
    },
    {
      "id": 6,
      "difficulty": "Easy",
      "category": "suffixes",
      "title": "Custom Suffix Column Verification",
      "desc": "Given a = pd.DataFrame({'k': [1], 'v': [10]}) and b = pd.DataFrame({'k': [1], 'v': [20]}), merge with suffixes=('_x1', '_y1') and store sorted column names in t6_cols (['k', 'v_x1', 'v_y1']).",
      "prompt": "<strong>[Assessment Q6] Custom Suffix Column Verification</strong><p>Compute <code>t6_cols = sorted(pd.merge(a, b, on='k', suffixes=('_x1', '_y1')).columns.tolist())</code>.</p>",
      "starterCode": "",
      "ref": "import pandas as pd\na = pd.DataFrame({'k': [1], 'v': [10]})\nb = pd.DataFrame({'k': [1], 'v': [20]})\nm = pd.merge(a, b, on='k', suffixes=('_x1', '_y1'))\nt6_cols = sorted(m.columns.tolist())\nprint(f'{t6_cols=}')\n",
      "solution": "import pandas as pd\na = pd.DataFrame({'k': [1], 'v': [10]})\nb = pd.DataFrame({'k': [1], 'v': [20]})\nm = pd.merge(a, b, on='k', suffixes=('_x1', '_y1'))\nt6_cols = sorted(m.columns.tolist())\nprint(f'{t6_cols=}')\n",
      "target": "t6_cols=['k', 'v_x1', 'v_y1']\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t6_cols",
            "type": "list",
            "value": [
              "k",
              "v_x1",
              "v_y1"
            ]
          }
        ]
      }
    },
    {
      "id": 7,
      "difficulty": "Easy",
      "category": "concat_stack",
      "title": "Stacked Row Total Sum",
      "desc": "Given a = pd.DataFrame({'v': [1, 2]}) and b = pd.DataFrame({'v': [3, 4]}), compute t7_sum = int(pd.concat([a, b], ignore_index=True)['v'].sum()) (10).",
      "prompt": "<strong>[Assessment Q7] Stacked Row Total Sum</strong><p>Compute <code>t7_sum = int(pd.concat([a, b], ignore_index=True)['v'].sum())</code> for <code>a = pd.DataFrame({'v': [1, 2]})</code> and <code>b = pd.DataFrame({'v': [3, 4]})</code>.</p>",
      "starterCode": "",
      "ref": "import pandas as pd\na = pd.DataFrame({'v': [1, 2]})\nb = pd.DataFrame({'v': [3, 4]})\nt7_sum = int(pd.concat([a, b], ignore_index=True)['v'].sum())\nprint(f'{t7_sum=}')\n",
      "solution": "import pandas as pd\na = pd.DataFrame({'v': [1, 2]})\nb = pd.DataFrame({'v': [3, 4]})\nt7_sum = int(pd.concat([a, b], ignore_index=True)['v'].sum())\nprint(f'{t7_sum=}')\n",
      "target": "t7_sum=10\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t7_sum",
            "type": "int",
            "value": 10
          }
        ]
      }
    },
    {
      "id": 8,
      "difficulty": "Easy",
      "category": "concat_stack",
      "title": "Clean Monotonic Index Reset Assertion",
      "desc": "Verify that ignore_index=True produces a strictly monotonic increasing RangeIndex. Set t8_is_monotonic = bool(pd.concat([a, b], ignore_index=True).index.is_monotonic_increasing) (True).",
      "prompt": "<strong>[Assessment Q8] Clean Monotonic Index Reset Assertion</strong><p>Set <code>t8_is_monotonic = bool(pd.concat([a, b], ignore_index=True).index.is_monotonic_increasing)</code> for <code>a = pd.DataFrame({'v': [1, 2]})</code> and <code>b = pd.DataFrame({'v': [3, 4]})</code>.</p>",
      "starterCode": "",
      "ref": "import pandas as pd\na = pd.DataFrame({'v': [1, 2]})\nb = pd.DataFrame({'v': [3, 4]})\nt8_is_monotonic = bool(pd.concat([a, b], ignore_index=True).index.is_monotonic_increasing)\nprint(f'{t8_is_monotonic=}')\n",
      "solution": "import pandas as pd\na = pd.DataFrame({'v': [1, 2]})\nb = pd.DataFrame({'v': [3, 4]})\nt8_is_monotonic = bool(pd.concat([a, b], ignore_index=True).index.is_monotonic_increasing)\nprint(f'{t8_is_monotonic=}')\n",
      "target": "t8_is_monotonic=True\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t8_is_monotonic",
            "type": "bool",
            "value": true
          }
        ]
      }
    },
    {
      "id": 9,
      "difficulty": "Medium",
      "category": "audit_indicator",
      "title": "Left-Only Rows Count via indicator=True",
      "desc": "Given a = pd.DataFrame({'k': [1, 2]}) and b = pd.DataFrame({'k': [2, 3]}), perform outer merge with indicator=True and compute t9_left_only_count = int((m['_merge'] == 'left_only').sum()) (1).",
      "prompt": "<strong>[Assessment Q9] Left-Only Rows Count via indicator=True</strong><p>Compute <code>t9_left_only_count = int((pd.merge(a, b, on='k', how='outer', indicator=True)['_merge'] == 'left_only').sum())</code>.</p>",
      "starterCode": "",
      "ref": "import pandas as pd\na = pd.DataFrame({'k': [1, 2]})\nb = pd.DataFrame({'k': [2, 3]})\nm = pd.merge(a, b, on='k', how='outer', indicator=True)\nt9_left_only_count = int((m['_merge'] == 'left_only').sum())\nprint(f'{t9_left_only_count=}')\n",
      "solution": "import pandas as pd\na = pd.DataFrame({'k': [1, 2]})\nb = pd.DataFrame({'k': [2, 3]})\nm = pd.merge(a, b, on='k', how='outer', indicator=True)\nt9_left_only_count = int((m['_merge'] == 'left_only').sum())\nprint(f'{t9_left_only_count=}')\n",
      "target": "t9_left_only_count=1\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t9_left_only_count",
            "type": "int",
            "value": 1
          }
        ]
      }
    },
    {
      "id": 10,
      "difficulty": "Medium",
      "category": "anti_join",
      "title": "Anti-Join Unmatched Key Extraction",
      "desc": "Given a = pd.DataFrame({'k': [1, 2, 3]}) and b = pd.DataFrame({'k': [2]}), extract keys in a not in b into list t10_anti_keys = a[~a['k'].isin(b['k'])]['k'].tolist() ([1, 3]).",
      "prompt": "<strong>[Assessment Q10] Anti-Join Unmatched Key Extraction</strong><p>Compute <code>t10_anti_keys = a[~a['k'].isin(b['k'])]['k'].tolist()</code>.</p>",
      "starterCode": "",
      "ref": "import pandas as pd\na = pd.DataFrame({'k': [1, 2, 3]})\nb = pd.DataFrame({'k': [2]})\nt10_anti_keys = a[~a['k'].isin(b['k'])]['k'].tolist()\nprint(f'{t10_anti_keys=}')\n",
      "solution": "import pandas as pd\na = pd.DataFrame({'k': [1, 2, 3]})\nb = pd.DataFrame({'k': [2]})\nt10_anti_keys = a[~a['k'].isin(b['k'])]['k'].tolist()\nprint(f'{t10_anti_keys=}')\n",
      "target": "t10_anti_keys=[1, 3]\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t10_anti_keys",
            "type": "list",
            "value": [
              1,
              3
            ]
          }
        ]
      }
    },
    {
      "id": 11,
      "difficulty": "Medium",
      "category": "semi_join",
      "title": "Semi-Join Matched Key Extraction",
      "desc": "Given a = pd.DataFrame({'k': [1, 2, 3]}) and b = pd.DataFrame({'k': [2, 4]}), extract keys in a that exist in b into list t11_semi_keys = a[a['k'].isin(b['k'])]['k'].tolist() ([2]).",
      "prompt": "<strong>[Assessment Q11] Semi-Join Matched Key Extraction</strong><p>Compute <code>t11_semi_keys = a[a['k'].isin(b['k'])]['k'].tolist()</code>.</p>",
      "starterCode": "",
      "ref": "import pandas as pd\na = pd.DataFrame({'k': [1, 2, 3]})\nb = pd.DataFrame({'k': [2, 4]})\nt11_semi_keys = a[a['k'].isin(b['k'])]['k'].tolist()\nprint(f'{t11_semi_keys=}')\n",
      "solution": "import pandas as pd\na = pd.DataFrame({'k': [1, 2, 3]})\nb = pd.DataFrame({'k': [2, 4]})\nt11_semi_keys = a[a['k'].isin(b['k'])]['k'].tolist()\nprint(f'{t11_semi_keys=}')\n",
      "target": "t11_semi_keys=[2]\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t11_semi_keys",
            "type": "list",
            "value": [
              2
            ]
          }
        ]
      }
    },
    {
      "id": 12,
      "difficulty": "Medium",
      "category": "index_join",
      "title": "df.join() Unmatched Null Count",
      "desc": "Given left = pd.DataFrame({'x': [1, 2]}, index=['a', 'b']) and right = pd.DataFrame({'y': [3, 4]}, index=['b', 'c']), execute left.join(right) and compute t12_null_count = int(m['y'].isna().sum()) (1).",
      "prompt": "<strong>[Assessment Q12] df.join() Unmatched Null Count</strong><p>Compute <code>t12_null_count = int(left.join(right)['y'].isna().sum())</code>.</p>",
      "starterCode": "",
      "ref": "import pandas as pd\nleft = pd.DataFrame({'x': [1, 2]}, index=['a', 'b'])\nright = pd.DataFrame({'y': [3, 4]}, index=['b', 'c'])\nm = left.join(right)\nt12_null_count = int(m['y'].isna().sum())\nprint(f'{t12_null_count=}')\n",
      "solution": "import pandas as pd\nleft = pd.DataFrame({'x': [1, 2]}, index=['a', 'b'])\nright = pd.DataFrame({'y': [3, 4]}, index=['b', 'c'])\nm = left.join(right)\nt12_null_count = int(m['y'].isna().sum())\nprint(f'{t12_null_count=}')\n",
      "target": "t12_null_count=1\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t12_null_count",
            "type": "int",
            "value": 1
          }
        ]
      }
    },
    {
      "id": 13,
      "difficulty": "Medium",
      "category": "index_join",
      "title": "df.join(how='inner') Matched Rows",
      "desc": "Given left = pd.DataFrame({'x': [1, 2]}, index=['a', 'b']) and right = pd.DataFrame({'y': [3, 4]}, index=['b', 'c']), compute t13_len = len(left.join(right, how='inner')) (1).",
      "prompt": "<strong>[Assessment Q13] df.join(how='inner') Matched Rows</strong><p>Compute <code>t13_len = len(left.join(right, how='inner'))</code>.</p>",
      "starterCode": "",
      "ref": "import pandas as pd\nleft = pd.DataFrame({'x': [1, 2]}, index=['a', 'b'])\nright = pd.DataFrame({'y': [3, 4]}, index=['b', 'c'])\nt13_len = len(left.join(right, how='inner'))\nprint(f'{t13_len=}')\n",
      "solution": "import pandas as pd\nleft = pd.DataFrame({'x': [1, 2]}, index=['a', 'b'])\nright = pd.DataFrame({'y': [3, 4]}, index=['b', 'c'])\nt13_len = len(left.join(right, how='inner'))\nprint(f'{t13_len=}')\n",
      "target": "t13_len=1\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t13_len",
            "type": "int",
            "value": 1
          }
        ]
      }
    },
    {
      "id": 14,
      "difficulty": "Medium",
      "category": "composite_keys",
      "title": "Composite Key Left Join Retrieval",
      "desc": "Given a = pd.DataFrame({'y': [2026, 2026], 'm': [1, 2], 'v': [10, 20]}) and b = pd.DataFrame({'y': [2026], 'm': [2], 'rate': [1.5]}), left merge on ['y', 'm'] and extract t14_val = float(m[m['m'] == 2]['rate'].iloc[0]) (1.5).",
      "prompt": "<strong>[Assessment Q14] Composite Key Left Join Retrieval</strong><p>Compute <code>t14_val = float(pd.merge(a, b, on=['y', 'm'], how='left').query('m == 2')['rate'].iloc[0])</code>.</p>",
      "starterCode": "",
      "ref": "import pandas as pd\na = pd.DataFrame({'y': [2026, 2026], 'm': [1, 2], 'v': [10, 20]})\nb = pd.DataFrame({'y': [2026], 'm': [2], 'rate': [1.5]})\nm = pd.merge(a, b, on=['y', 'm'], how='left')\nt14_val = float(m[m['m'] == 2]['rate'].iloc[0])\nprint(f'{t14_val=}')\n",
      "solution": "import pandas as pd\na = pd.DataFrame({'y': [2026, 2026], 'm': [1, 2], 'v': [10, 20]})\nb = pd.DataFrame({'y': [2026], 'm': [2], 'rate': [1.5]})\nm = pd.merge(a, b, on=['y', 'm'], how='left')\nt14_val = float(m[m['m'] == 2]['rate'].iloc[0])\nprint(f'{t14_val=}')\n",
      "target": "t14_val=1.5\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t14_val",
            "type": "float",
            "value": 1.5,
            "tolerance": 0.01
          }
        ]
      }
    },
    {
      "id": 15,
      "difficulty": "Medium",
      "category": "concat_stack",
      "title": "Side-by-Side Horizontal Concat Shape",
      "desc": "Given a = pd.DataFrame({'x': [1, 2]}, index=[10, 20]) and b = pd.DataFrame({'y': [3, 4]}, index=[10, 20]), compute t15_shape = list(pd.concat([a, b], axis=1).shape) ([2, 2]).",
      "prompt": "<strong>[Assessment Q15] Side-by-Side Horizontal Concat Shape</strong><p>Compute <code>t15_shape = list(pd.concat([a, b], axis=1).shape)</code>.</p>",
      "starterCode": "",
      "ref": "import pandas as pd\na = pd.DataFrame({'x': [1, 2]}, index=[10, 20])\nb = pd.DataFrame({'y': [3, 4]}, index=[10, 20])\nt15_shape = list(pd.concat([a, b], axis=1).shape)\nprint(f'{t15_shape=}')\n",
      "solution": "import pandas as pd\na = pd.DataFrame({'x': [1, 2]}, index=[10, 20])\nb = pd.DataFrame({'y': [3, 4]}, index=[10, 20])\nt15_shape = list(pd.concat([a, b], axis=1).shape)\nprint(f'{t15_shape=}')\n",
      "target": "t15_shape=[2, 2]\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t15_shape",
            "type": "list",
            "value": [
              2,
              2
            ]
          }
        ]
      }
    },
    {
      "id": 16,
      "difficulty": "Medium",
      "category": "concat_stack",
      "title": "Outer Concat Union Column Set",
      "desc": "Given a = pd.DataFrame({'x': [1]}) and b = pd.DataFrame({'x': [2], 'y': [3]}), compute t16_cols = sorted(pd.concat([a, b]).columns.tolist()) (['x', 'y']).",
      "prompt": "<strong>[Assessment Q16] Outer Concat Union Column Set</strong><p>Compute <code>t16_cols = sorted(pd.concat([a, b]).columns.tolist())</code>.</p>",
      "starterCode": "",
      "ref": "import pandas as pd\na = pd.DataFrame({'x': [1]})\nb = pd.DataFrame({'x': [2], 'y': [3]})\nt16_cols = sorted(pd.concat([a, b]).columns.tolist())\nprint(f'{t16_cols=}')\n",
      "solution": "import pandas as pd\na = pd.DataFrame({'x': [1]})\nb = pd.DataFrame({'x': [2], 'y': [3]})\nt16_cols = sorted(pd.concat([a, b]).columns.tolist())\nprint(f'{t16_cols=}')\n",
      "target": "t16_cols=['x', 'y']\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t16_cols",
            "type": "list",
            "value": [
              "x",
              "y"
            ]
          }
        ]
      }
    },
    {
      "id": 17,
      "difficulty": "Medium",
      "category": "concat_stack",
      "title": "Inner Concat Shared Column Intersection",
      "desc": "Given a = pd.DataFrame({'x': [1]}) and b = pd.DataFrame({'x': [2], 'y': [3]}), compute t17_cols = pd.concat([a, b], join='inner').columns.tolist() (['x']).",
      "prompt": "<strong>[Assessment Q17] Inner Concat Shared Column Intersection</strong><p>Compute <code>t17_cols = pd.concat([a, b], join='inner').columns.tolist()</code>.</p>",
      "starterCode": "",
      "ref": "import pandas as pd\na = pd.DataFrame({'x': [1]})\nb = pd.DataFrame({'x': [2], 'y': [3]})\nt17_cols = pd.concat([a, b], join='inner').columns.tolist()\nprint(f'{t17_cols=}')\n",
      "solution": "import pandas as pd\na = pd.DataFrame({'x': [1]})\nb = pd.DataFrame({'x': [2], 'y': [3]})\nt17_cols = pd.concat([a, b], join='inner').columns.tolist()\nprint(f'{t17_cols=}')\n",
      "target": "t17_cols=['x']\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t17_cols",
            "type": "list",
            "value": [
              "x"
            ]
          }
        ]
      }
    },
    {
      "id": 18,
      "difficulty": "Medium",
      "category": "aggregation_merge",
      "title": "Left Join Imputed Total Revenue",
      "desc": "Given cust = pd.DataFrame({'id': [1, 2], 'name': ['A', 'B']}) and orders = pd.DataFrame({'id': [1], 'amt': [50.0]}), left merge and fillna with 0.0. Compute t18_total = float(m['amt'].sum()) (50.0).",
      "prompt": "<strong>[Assessment Q18] Left Join Imputed Total Revenue</strong><p>Compute <code>t18_total = float(cust.merge(orders, on='id', how='left').fillna({'amt': 0.0})['amt'].sum())</code>.</p>",
      "starterCode": "",
      "ref": "import pandas as pd\ncust = pd.DataFrame({'id': [1, 2], 'name': ['A', 'B']})\norders = pd.DataFrame({'id': [1], 'amt': [50.0]})\nm = cust.merge(orders, on='id', how='left').fillna({'amt': 0.0})\nt18_total = float(m['amt'].sum())\nprint(f'{t18_total=}')\n",
      "solution": "import pandas as pd\ncust = pd.DataFrame({'id': [1, 2], 'name': ['A', 'B']})\norders = pd.DataFrame({'id': [1], 'amt': [50.0]})\nm = cust.merge(orders, on='id', how='left').fillna({'amt': 0.0})\nt18_total = float(m['amt'].sum())\nprint(f'{t18_total=}')\n",
      "target": "t18_total=50.0\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t18_total",
            "type": "float",
            "value": 50,
            "tolerance": 0.01
          }
        ]
      }
    },
    {
      "id": 19,
      "difficulty": "Hard",
      "category": "cardinality_validation",
      "title": "Trapping MergeError on 1:1 Violation",
      "desc": "Given a = pd.DataFrame({'k': [1, 1]}) and b = pd.DataFrame({'k': [1]}), assert validate='one_to_one' in a try/except block catching pd.errors.MergeError. Set t19_caught = True.",
      "prompt": "<strong>[Assessment Q19] Trapping MergeError on 1:1 Violation</strong><p>Trap duplicate keys: Wrap <code>pd.merge(a, b, on='k', validate='one_to_one')</code> in a <code>try...except pd.errors.MergeError:</code> block and set <code>t19_caught = True</code>.</p>",
      "starterCode": "",
      "ref": "import pandas as pd\na = pd.DataFrame({'k': [1, 1]})\nb = pd.DataFrame({'k': [1]})\ntry:\n    pd.merge(a, b, on='k', validate='one_to_one')\n    t19_caught = False\nexcept pd.errors.MergeError:\n    t19_caught = True\nprint(f'{t19_caught=}')\n",
      "solution": "import pandas as pd\na = pd.DataFrame({'k': [1, 1]})\nb = pd.DataFrame({'k': [1]})\ntry:\n    pd.merge(a, b, on='k', validate='one_to_one')\n    t19_caught = False\nexcept pd.errors.MergeError:\n    t19_caught = True\nprint(f'{t19_caught=}')\n",
      "target": "t19_caught=True\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t19_caught",
            "type": "bool",
            "value": true
          }
        ]
      }
    },
    {
      "id": 20,
      "difficulty": "Hard",
      "category": "cardinality_validation",
      "title": "Deduplicated many_to_one Validation",
      "desc": "Given a = pd.DataFrame({'k': [1, 1], 'x': ['a1', 'a2']}) and b = pd.DataFrame({'k': [1, 1], 'y': ['b1', 'b2']}), deduplicate b via drop_duplicates('k') and merge with validate='many_to_one'. Compute t20_rows = len(m) (2).",
      "prompt": "<strong>[Assessment Q20] Deduplicated many_to_one Validation</strong><p>Deduplicate right frame and merge: <code>m = pd.merge(a, b.drop_duplicates('k'), on='k', validate='many_to_one')</code>. Compute <code>t20_rows = len(m)</code>.</p>",
      "starterCode": "",
      "ref": "import pandas as pd\na = pd.DataFrame({'k': [1, 1], 'x': ['a1', 'a2']})\nb = pd.DataFrame({'k': [1, 1], 'y': ['b1', 'b2']})\nm = pd.merge(a, b.drop_duplicates('k'), on='k', validate='many_to_one')\nt20_rows = len(m)\nprint(f'{t20_rows=}')\n",
      "solution": "import pandas as pd\na = pd.DataFrame({'k': [1, 1], 'x': ['a1', 'a2']})\nb = pd.DataFrame({'k': [1, 1], 'y': ['b1', 'b2']})\nm = pd.merge(a, b.drop_duplicates('k'), on='k', validate='many_to_one')\nt20_rows = len(m)\nprint(f'{t20_rows=}')\n",
      "target": "t20_rows=2\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t20_rows",
            "type": "int",
            "value": 2
          }
        ]
      }
    },
    {
      "id": 21,
      "difficulty": "Hard",
      "category": "concat_stack",
      "title": "Dictionary Concat Outer Index Extraction",
      "desc": "Given t21_us = pd.DataFrame({'v': [10, 20]}) and t21_eu = pd.DataFrame({'v': [30, 40]}), concat as a dict {'US': t21_us, 'EU': t21_eu}. Extract sorted unique level 0 index values into t21_regions (['EU', 'US']).",
      "prompt": "<strong>[Assessment Q21] Dictionary Concat Outer Index Extraction</strong><p>Compute <code>t21_regions = sorted(list(set(pd.concat({'US': t21_us, 'EU': t21_eu}).index.get_level_values(0))))</code>.</p>",
      "starterCode": "",
      "ref": "import pandas as pd\nt21_us = pd.DataFrame({'v': [10, 20]})\nt21_eu = pd.DataFrame({'v': [30, 40]})\nm = pd.concat({'US': t21_us, 'EU': t21_eu})\nt21_regions = sorted(list(set(m.index.get_level_values(0))))\nprint(f'{t21_regions=}')\n",
      "solution": "import pandas as pd\nt21_us = pd.DataFrame({'v': [10, 20]})\nt21_eu = pd.DataFrame({'v': [30, 40]})\nm = pd.concat({'US': t21_us, 'EU': t21_eu})\nt21_regions = sorted(list(set(m.index.get_level_values(0))))\nprint(f'{t21_regions=}')\n",
      "target": "t21_regions=['EU', 'US']\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t21_regions",
            "type": "list",
            "value": [
              "EU",
              "US"
            ]
          }
        ]
      }
    },
    {
      "id": 22,
      "difficulty": "Hard",
      "category": "key_sanitation",
      "title": "Coercing Key String Dtype Prior to Merge",
      "desc": "Given a = pd.DataFrame({'k': [1], 'v': [100]}) and b = pd.DataFrame({'k': ['1'], 'rate': [1.2]}), cast b['k'] to int and merge on 'k'. Compute t22_len = len(m) (1).",
      "prompt": "<strong>[Assessment Q22] Coercing Key String Dtype Prior to Merge</strong><p>Cast and merge: <code>b['k'] = b['k'].astype(int)</code>, then <code>t22_len = len(pd.merge(a, b, on='k'))</code>.</p>",
      "starterCode": "",
      "ref": "import pandas as pd\na = pd.DataFrame({'k': [1], 'v': [100]})\nb = pd.DataFrame({'k': ['1'], 'rate': [1.2]})\nb['k'] = b['k'].astype(int)\nm = pd.merge(a, b, on='k')\nt22_len = len(m)\nprint(f'{t22_len=}')\n",
      "solution": "import pandas as pd\na = pd.DataFrame({'k': [1], 'v': [100]})\nb = pd.DataFrame({'k': ['1'], 'rate': [1.2]})\nb['k'] = b['k'].astype(int)\nm = pd.merge(a, b, on='k')\nt22_len = len(m)\nprint(f'{t22_len=}')\n",
      "target": "t22_len=1\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t22_len",
            "type": "int",
            "value": 1
          }
        ]
      }
    },
    {
      "id": 23,
      "difficulty": "Hard",
      "category": "key_sanitation",
      "title": "Stripping Whitespace for Exact Key Match",
      "desc": "Given a = pd.DataFrame({'city': ['pune', 'delhi'], 'code': [10, 20]}) and b = pd.DataFrame({'city': [' pune ', 'delhi '], 'state': ['MH', 'DL']}), strip whitespace from b['city'] and merge on 'city'. Compute t23_len = len(pd.merge(a, b, on='city')) (2).",
      "prompt": "<strong>[Assessment Q23] Stripping Whitespace for Exact Key Match</strong><p>Clean whitespace: <code>b['city'] = b['city'].str.strip()</code>, then <code>t23_len = len(pd.merge(a, b, on='city'))</code>.</p>",
      "starterCode": "",
      "ref": "import pandas as pd\na = pd.DataFrame({'city': ['pune', 'delhi'], 'code': [10, 20]})\nb = pd.DataFrame({'city': [' pune ', 'delhi '], 'state': ['MH', 'DL']})\nb['city'] = b['city'].str.strip()\nm = pd.merge(a, b, on='city')\nt23_len = len(m)\nprint(f'{t23_len=}')\n",
      "solution": "import pandas as pd\na = pd.DataFrame({'city': ['pune', 'delhi'], 'code': [10, 20]})\nb = pd.DataFrame({'city': [' pune ', 'delhi '], 'state': ['MH', 'DL']})\nb['city'] = b['city'].str.strip()\nm = pd.merge(a, b, on='city')\nt23_len = len(m)\nprint(f'{t23_len=}')\n",
      "target": "t23_len=2\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t23_len",
            "type": "int",
            "value": 2
          }
        ]
      }
    },
    {
      "id": 24,
      "difficulty": "Hard",
      "category": "asof_merge",
      "title": "merge_asof Preceding Event Price Match",
      "desc": "Given trades = pd.DataFrame({'t': pd.to_datetime(['2026-01-01 10:00:03']), 'px': [101]}) and quotes = pd.DataFrame({'t': pd.to_datetime(['2026-01-01 10:00:00', '2026-01-01 10:00:05']), 'bid': [100, 101]}), perform pd.merge_asof(trades, quotes, on='t') and extract t24_matched_bid = int(m['bid'].iloc[0]) (100).",
      "prompt": "<strong>[Assessment Q24] merge_asof Preceding Event Price Match</strong><p>Execute <code>m = pd.merge_asof(trades, quotes, on='t')</code> and extract <code>t24_matched_bid = int(m['bid'].iloc[0])</code>.</p>",
      "starterCode": "",
      "ref": "import pandas as pd\ntrades = pd.DataFrame({'t': pd.to_datetime(['2026-01-01 10:00:03']), 'px': [101]})\nquotes = pd.DataFrame({'t': pd.to_datetime(['2026-01-01 10:00:00', '2026-01-01 10:00:05']), 'bid': [100, 101]})\nm = pd.merge_asof(trades, quotes, on='t')\nt24_matched_bid = int(m['bid'].iloc[0])\nprint(f'{t24_matched_bid=}')\n",
      "solution": "import pandas as pd\ntrades = pd.DataFrame({'t': pd.to_datetime(['2026-01-01 10:00:03']), 'px': [101]})\nquotes = pd.DataFrame({'t': pd.to_datetime(['2026-01-01 10:00:00', '2026-01-01 10:00:05']), 'bid': [100, 101]})\nm = pd.merge_asof(trades, quotes, on='t')\nt24_matched_bid = int(m['bid'].iloc[0])\nprint(f'{t24_matched_bid=}')\n",
      "target": "t24_matched_bid=100\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t24_matched_bid",
            "type": "int",
            "value": 100
          }
        ]
      }
    },
    {
      "id": 25,
      "difficulty": "Hard",
      "category": "upsert",
      "title": "Atomic Upsert Implementation with Anti-Join & Concat",
      "desc": "Given old = pd.DataFrame({'id': [1, 2], 'val': ['a', 'b']}) and new = pd.DataFrame({'id': [2, 3], 'val': ['B_updated', 'c']}), drop overwritten keys from old using ~old['id'].isin(new['id']), concat new, sort by 'id', and extract t25_vals = out['val'].tolist() (['a', 'B_updated', 'c']).",
      "prompt": "<strong>[Assessment Q25] Atomic Upsert Implementation with Anti-Join & Concat</strong><p>Perform atomic upsert: <code>out = pd.concat([old[~old['id'].isin(new['id'])], new]).sort_values('id')</code> and extract <code>t25_vals = out['val'].tolist()</code>.</p>",
      "starterCode": "",
      "ref": "import pandas as pd\nold = pd.DataFrame({'id': [1, 2], 'val': ['a', 'b']})\nnew = pd.DataFrame({'id': [2, 3], 'val': ['B_updated', 'c']})\nout = pd.concat([old[~old['id'].isin(new['id'])], new]).sort_values('id')\nt25_vals = out['val'].tolist()\nprint(f'{t25_vals=}')\n",
      "solution": "import pandas as pd\nold = pd.DataFrame({'id': [1, 2], 'val': ['a', 'b']})\nnew = pd.DataFrame({'id': [2, 3], 'val': ['B_updated', 'c']})\nout = pd.concat([old[~old['id'].isin(new['id'])], new]).sort_values('id')\nt25_vals = out['val'].tolist()\nprint(f'{t25_vals=}')\n",
      "target": "t25_vals=['a', 'B_updated', 'c']\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "t25_vals",
            "type": "list",
            "value": [
              "a",
              "B_updated",
              "c"
            ]
          }
        ]
      }
    }
  ]
};
