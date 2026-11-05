window.COURSE_CONTENT = window.COURSE_CONTENT || {};
window.COURSE_CONTENT.pyDay05 = {
  "day": 5,
  "title": "Tuples & Immutability",
  "emoji": "🔒",
  "topics": [
    {
      "id": "day05FundamentalsSection",
      "label": "01. Tuple Fundamentals",
      "duration": "2:30"
    },
    {
      "id": "day05MemorySection",
      "label": "02. Tuple Memory Architecture",
      "duration": "2:45"
    },
    {
      "id": "day05IndexingSection",
      "label": "03. Indexing & Negative Indices",
      "duration": "2:15"
    },
    {
      "id": "day05SlicingSection",
      "label": "04. Slicing & Striding Rules",
      "duration": "2:20"
    },
    {
      "id": "day05MethodsSection",
      "label": "05. Tuple Methods (.count, .index)",
      "duration": "2:50"
    },
    {
      "id": "day05UnpackingSection",
      "label": "06. Packing & Unpacking (*rest)",
      "duration": "2:40"
    },
    {
      "id": "day05ApplicationsSection",
      "label": "07. NamedTuples & Composite Keys",
      "duration": "2:30"
    },
    {
      "id": "day05DecisionSection",
      "label": "08. Tuples vs Lists Matrix",
      "duration": "2:00"
    },
    {
      "id": "day05MistakesSection",
      "label": "09. Common Anti-Patterns",
      "duration": "2:40"
    },
    {
      "id": "day05InterviewQuestions",
      "label": "10. Review & Interview Questions",
      "duration": "3:30"
    }
  ],
  "slides": [
    {
      "id": "slide-1",
      "title": "Python Tuples & Immutability",
      "html": "<style>\n\n  /* ══════════════════════════════════════════════════════════\n     BASE & DARK THEME (DEFAULT)\n     ══════════════════════════════════════════════════════════ */\n\n  /* ── Flagship Dual-Box Heading Architecture (SQL Day 01 Parity) ── */\n  .heading-box-wrap,\n  .slide-section-title.heading-box-wrap {\n    display: flex !important;\n    align-items: stretch !important;\n    gap: 0 !important;\n    background: transparent !important;\n    border: none !important;\n    padding: 0 !important;\n    margin: 24px 0 14px 0 !important;\n    filter: drop-shadow(0 4px 14px rgba(0, 0, 0, 0.35)) !important;\n  }\n  .slide-section:first-child .heading-box-wrap,\n  #day01WhyPythonSection .heading-box-wrap {\n    margin-top: 4px !important;\n  }\n\n  /* Left Box: Monospace Number Badge (Exact SQL Day 01 Parity from 2nd Image) */\n  .heading-num-box {\n    display: inline-flex !important;\n    align-items: center !important;\n    justify-content: center !important;\n    background: linear-gradient(135deg, #6366f1, #8b5cf6) !important;\n    color: #ffffff !important;\n    font-family: 'JetBrains Mono', var(--mono, monospace) !important;\n    font-size: 0.88rem !important;\n    font-weight: 800 !important;\n    letter-spacing: 0.05em !important;\n    padding: 8px 14px !important;\n    border-radius: 8px 0 0 8px !important;\n    border: 1px solid rgba(139, 92, 246, 0.6) !important;\n    border-right: none !important;\n    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.25) !important;\n    flex-shrink: 0 !important;\n    min-width: 44px !important;\n    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3) !important;\n  }\n\n  /* Right Box: Matte Title Box (Always Deep Obsidian Dark — Exact 2nd Image Parity) */\n  .heading-title-box {\n    display: flex !important;\n    align-items: center !important;\n    justify-content: space-between !important;\n    flex: 1 !important;\n    background: #0f172a !important; /* Deep obsidian matte from SQL Day 01 */\n    border: 1px solid rgba(255, 255, 255, 0.08) !important;\n    border-left: 1px solid rgba(139, 92, 246, 0.4) !important;\n    border-radius: 0 8px 8px 0 !important;\n    padding: 8px 16px !important;\n    color: #f8fafc !important;\n    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05) !important;\n  }\n\n  .heading-title-text {\n    flex: 1 !important;\n    color: #f8fafc !important;\n    font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif !important;\n    font-size: 1.05rem !important;\n    font-weight: 800 !important;\n    letter-spacing: -0.015em !important;\n    line-height: 1.35 !important;\n    display: flex !important;\n    align-items: center !important;\n    gap: 10px !important;\n  }\n\n  .heading-icon {\n    font-size: 1.15rem !important;\n    display: inline-flex !important;\n    align-items: center !important;\n    line-height: 1 !important;\n  }\n\n  /* Audio Play Button in Heading */\n  .heading-title-box .audio-play-btn,\n  .heading-with-audio .audio-play-btn {\n    width: 26px !important;\n    height: 26px !important;\n    min-width: 26px !important;\n    min-height: 26px !important;\n    max-width: 26px !important;\n    max-height: 26px !important;\n    border-radius: 6px !important;\n    border: 1px solid rgba(255, 255, 255, 0.14) !important;\n    background: rgba(255, 255, 255, 0.08) !important;\n    color: #94a3b8 !important;\n    cursor: pointer !important;\n    display: inline-flex !important;\n    align-items: center !important;\n    justify-content: center !important;\n    padding: 0 !important;\n    margin: 0 !important;\n    flex-shrink: 0 !important;\n    transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease, transform 0.15s ease !important;\n  }\n\n  .heading-title-box .audio-play-btn:hover,\n  .heading-with-audio .audio-play-btn:hover {\n    background: #ef4444 !important;\n    border-color: #ef4444 !important;\n    color: #ffffff !important;\n    box-shadow: 0 0 10px rgba(239, 68, 68, 0.45) !important;\n    transform: scale(1.05) !important;\n  }\n\n  .heading-title-box .audio-play-btn.playing,\n  .heading-with-audio .audio-play-btn.playing {\n    background: #ef4444 !important;\n    border-color: #ef4444 !important;\n    color: #ffffff !important;\n    box-shadow: 0 0 12px rgba(239, 68, 68, 0.5) !important;\n  }\n\n  /* General Typography & Heading Hierarchy (Dark Mode) */\n  .slide-section h1,\n  .slide-section h2,\n  .slide-section h3,\n  .slide-section h4 {\n    font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif !important;\n    color: #f8fafc !important;\n    letter-spacing: -0.015em !important;\n  }\n\n  @media (max-width: 640px) {\n    .heading-num-box {\n      font-size: 0.80rem !important;\n      padding: 7px 10px !important;\n      min-width: 40px !important;\n    }\n    .heading-title-box {\n      padding: 7px 12px !important;\n    }\n    .heading-title-text {\n      font-size: 0.88rem !important;\n      gap: 6px !important;\n    }\n    .heading-icon {\n      font-size: 1rem !important;\n    }\n    .heading-title-box .audio-play-btn {\n      width: 24px !important;\n      height: 24px !important;\n      min-width: 24px !important;\n      min-height: 24px !important;\n    }\n  }\n\n  .py-infographic-card {\n    background: linear-gradient(135deg, rgba(15, 23, 42, 0.96) 0%, rgba(8, 14, 28, 0.98) 100%);\n    border: 1px solid rgba(255, 255, 255, 0.08);\n    border-radius: 12px;\n    padding: 16px 18px;\n    margin: 14px 0;\n    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.05);\n    transition: background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;\n  }\n  .py-info-header {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: 10px;\n    margin-bottom: 12px;\n    padding-bottom: 8px;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.06);\n  }\n  .py-info-title {\n    font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;\n    font-size: 0.82rem;\n    font-weight: 800;\n    text-transform: uppercase;\n    letter-spacing: 0.08em;\n    color: #38bdf8;\n    display: flex;\n    align-items: center;\n    gap: 8px;\n  }\n  .py-badge {\n    font-family: 'JetBrains Mono', monospace;\n    font-size: 0.68rem;\n    font-weight: 700;\n    padding: 2px 8px;\n    border-radius: 4px;\n    background: rgba(56, 189, 248, 0.12);\n    border: 1px solid rgba(56, 189, 248, 0.28);\n    color: #38bdf8;\n  }\n  .py-badge-gold {\n    background: rgba(245, 158, 11, 0.12);\n    border-color: rgba(245, 158, 11, 0.28);\n    color: #fbbf24;\n  }\n  .py-badge-green {\n    background: rgba(34, 197, 94, 0.12);\n    border-color: rgba(34, 197, 94, 0.28);\n    color: #4ade80;\n  }\n  .py-badge-purple {\n    background: rgba(168, 85, 247, 0.12);\n    border-color: rgba(168, 85, 247, 0.28);\n    color: #c084fc;\n  }\n  .py-badge-rose {\n    background: rgba(244, 63, 94, 0.12);\n    border-color: rgba(244, 63, 94, 0.28);\n    color: #fb7185;\n  }\n\n  /* CPython Object Header Grid */\n  .cpython-grid {\n    display: grid;\n    grid-template-columns: repeat(4, 1fr);\n    gap: 8px;\n    margin-top: 10px;\n  }\n  @media (max-width: 640px) {\n    .cpython-grid { grid-template-columns: 1fr 1fr; }\n  }\n  .cpython-cell {\n    background: rgba(255, 255, 255, 0.03);\n    border: 1px solid rgba(255, 255, 255, 0.07);\n    border-radius: 8px;\n    padding: 10px;\n    text-align: center;\n    transition: all 0.2s ease;\n  }\n  .cpython-cell:hover {\n    background: rgba(56, 189, 248, 0.06);\n    border-color: rgba(56, 189, 248, 0.3);\n  }\n  .cpython-cell-size {\n    font-family: 'JetBrains Mono', monospace;\n    font-size: 0.65rem;\n    font-weight: 700;\n    color: #94a3b8;\n    margin-bottom: 4px;\n  }\n  .cpython-cell-name {\n    font-family: 'JetBrains Mono', monospace;\n    font-size: 0.78rem;\n    font-weight: 800;\n    color: #f8fafc;\n  }\n  .cpython-cell-desc {\n    font-size: 0.70rem;\n    color: #64748b;\n    margin-top: 4px;\n    line-height: 1.3;\n  }\n\n  /* Mutability Cards Base */\n  .py-mut-card {\n    border-radius: 8px;\n    padding: 12px;\n    transition: all 0.2s ease;\n  }\n  .py-mut-card.mut-green {\n    background: rgba(16, 185, 129, 0.06);\n    border: 1px solid rgba(16, 185, 129, 0.25);\n  }\n  .py-mut-card.mut-rose {\n    background: rgba(244, 63, 94, 0.06);\n    border: 1px solid rgba(244, 63, 94, 0.25);\n  }\n  .py-mut-card p {\n    font-size: 0.75rem;\n    color: #cbd5e1;\n    margin: 0 0 8px;\n    line-height: 1.45;\n  }\n  .py-mut-card .mut-ex {\n    font-size: 0.70rem;\n    color: #94a3b8;\n    margin-bottom: 6px;\n  }\n\n  /* Memory Cards Base */\n  .py-mem-card {\n    background: rgba(255, 255, 255, 0.03);\n    border: 1px solid rgba(255, 255, 255, 0.07);\n    border-radius: 8px;\n    padding: 12px;\n    transition: all 0.2s ease;\n  }\n  .py-mem-card-title {\n    font-family: 'JetBrains Mono', monospace;\n    font-size: 0.80rem;\n    font-weight: 800;\n    margin-bottom: 4px;\n  }\n  .py-mem-blue { color: #38bdf8; }\n  .py-mem-green { color: #4ade80; }\n  .py-mem-amber { color: #fbbf24; }\n  .py-mem-purple { color: #c084fc; }\n  .py-mem-card .py-mem-desc {\n    font-size: 0.75rem;\n    color: #cbd5e1;\n    line-height: 1.5;\n  }\n\n  /* Code Block Box */\n  .py-code-box {\n    margin: 0;\n    padding: 8px 10px;\n    background: rgba(0, 0, 0, 0.45);\n    border: 1px solid rgba(255, 255, 255, 0.08);\n    border-radius: 6px;\n    font-size: 0.74rem;\n    color: #f8fafc;\n    font-family: 'JetBrains Mono', monospace;\n  }\n\n  /* ══════════════════════════════════════════════════════════\n     SUPERPOWERS FLAGSHIP SHOWCASE DESIGN (DARK THEME)\n     ══════════════════════════════════════════════════════════ */\n  .py-sp-showcase {\n    background: linear-gradient(145deg, rgba(15, 23, 42, 0.96) 0%, rgba(10, 16, 31, 0.98) 100%);\n    border: 1px solid rgba(255, 255, 255, 0.08);\n    border-radius: 14px;\n    padding: 20px 22px;\n    margin: 16px 0;\n    box-shadow: 0 16px 40px -10px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.06);\n    transition: background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;\n  }\n  .py-sp-header {\n    margin-bottom: 18px;\n    padding-bottom: 14px;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.08);\n  }\n  .py-sp-title-row {\n    display: flex;\n    align-items: center;\n    gap: 14px;\n    flex-wrap: wrap;\n  }\n  .py-sp-header-icon {\n    width: 42px;\n    height: 42px;\n    border-radius: 12px;\n    background: linear-gradient(135deg, rgba(56, 189, 248, 0.16) 0%, rgba(99, 102, 241, 0.22) 100%);\n    border: 1px solid rgba(56, 189, 248, 0.35);\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-size: 1.25rem;\n    flex-shrink: 0;\n    box-shadow: 0 4px 14px rgba(56, 189, 248, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.1);\n  }\n  .py-sp-header-text {\n    display: flex;\n    flex-direction: column;\n    gap: 2px;\n    flex: 1;\n  }\n  .py-sp-title {\n    margin: 0;\n    font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;\n    font-size: 1.12rem;\n    font-weight: 800;\n    letter-spacing: -0.015em;\n    color: #f8fafc !important;\n    line-height: 1.3;\n  }\n  .py-sp-subtitle {\n    margin: 3px 0 0 0;\n    font-size: 0.82rem;\n    color: #94a3b8 !important;\n    font-weight: 500;\n    letter-spacing: 0.01em;\n    line-height: 1.4;\n  }\n  .py-sp-grid {\n    display: grid;\n    grid-template-columns: repeat(2, 1fr);\n    gap: 12px;\n  }\n  @media (max-width: 680px) {\n    .py-sp-grid { grid-template-columns: 1fr; }\n  }\n  .py-sp-card {\n    background: rgba(255, 255, 255, 0.025);\n    border: 1px solid rgba(255, 255, 255, 0.07);\n    border-radius: 12px;\n    padding: 14px 16px;\n    display: flex;\n    flex-direction: column;\n    justify-content: space-between;\n    transition: all 0.22s cubic-bezier(0.4, 0, 0.2, 1);\n    position: relative;\n    overflow: hidden;\n  }\n  .py-sp-card:hover {\n    transform: translateY(-2px);\n    background: rgba(255, 255, 255, 0.04);\n    box-shadow: 0 10px 24px -6px rgba(0, 0, 0, 0.4);\n  }\n  .py-sp-card::before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    height: 2px;\n    opacity: 0.85;\n  }\n  .py-sp-card.sp-blue::before { background: linear-gradient(90deg, #38bdf8, transparent); }\n  .py-sp-card.sp-blue:hover { border-color: rgba(56, 189, 248, 0.4); }\n  .py-sp-card.sp-green::before { background: linear-gradient(90deg, #34d399, transparent); }\n  .py-sp-card.sp-green:hover { border-color: rgba(52, 211, 153, 0.4); }\n  .py-sp-card.sp-amber::before { background: linear-gradient(90deg, #fbbf24, transparent); }\n  .py-sp-card.sp-amber:hover { border-color: rgba(251, 191, 36, 0.4); }\n  .py-sp-card.sp-purple::before { background: linear-gradient(90deg, #c084fc, transparent); }\n  .py-sp-card.sp-purple:hover { border-color: rgba(192, 132, 252, 0.4); }\n\n  .py-sp-card-top {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    margin-bottom: 10px;\n  }\n  .py-sp-card-header {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n  }\n  .py-sp-icon {\n    width: 32px;\n    height: 32px;\n    border-radius: 8px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-size: 1rem;\n    flex-shrink: 0;\n  }\n  .sp-blue .py-sp-icon { background: rgba(56, 189, 248, 0.12); border: 1px solid rgba(56, 189, 248, 0.25); }\n  .sp-green .py-sp-icon { background: rgba(52, 211, 153, 0.12); border: 1px solid rgba(52, 211, 153, 0.25); }\n  .sp-amber .py-sp-icon { background: rgba(251, 191, 36, 0.12); border: 1px solid rgba(251, 191, 36, 0.25); }\n  .sp-purple .py-sp-icon { background: rgba(192, 132, 252, 0.12); border: 1px solid rgba(192, 132, 252, 0.25); }\n\n  .py-sp-card-title {\n    font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;\n    font-size: 0.88rem;\n    font-weight: 700;\n    color: #f8fafc !important;\n  }\n  .py-sp-num {\n    font-family: 'JetBrains Mono', monospace;\n    font-size: 0.68rem;\n    font-weight: 800;\n    padding: 2px 7px;\n    border-radius: 4px;\n  }\n  .sp-blue .py-sp-num { color: #38bdf8; background: rgba(56, 189, 248, 0.1); border: 1px solid rgba(56, 189, 248, 0.2); }\n  .sp-green .py-sp-num { color: #34d399; background: rgba(52, 211, 153, 0.1); border: 1px solid rgba(52, 211, 153, 0.2); }\n  .sp-amber .py-sp-num { color: #fbbf24; background: rgba(251, 191, 36, 0.1); border: 1px solid rgba(251, 191, 36, 0.2); }\n  .sp-purple .py-sp-num { color: #c084fc; background: rgba(192, 132, 252, 0.1); border: 1px solid rgba(192, 132, 252, 0.2); }\n\n  .py-sp-desc {\n    font-size: 0.77rem;\n    line-height: 1.55;\n    color: #cbd5e1 !important;\n    margin: 0 0 10px 0;\n  }\n  .py-sp-tag {\n    display: inline-flex;\n    align-items: center;\n    gap: 5px;\n    font-size: 0.70rem;\n    font-weight: 600;\n    padding: 3px 8px;\n    border-radius: 6px;\n    background: rgba(255, 255, 255, 0.04);\n    border: 1px solid rgba(255, 255, 255, 0.07);\n    color: #e2e8f0;\n    align-self: flex-start;\n  }\n\n  /* 05 AI Flagship Banner */\n  .py-sp-ai-banner {\n    margin-top: 12px;\n    background: linear-gradient(135deg, rgba(147, 51, 234, 0.15) 0%, rgba(79, 70, 229, 0.12) 50%, rgba(15, 23, 42, 0.85) 100%);\n    border: 1px solid rgba(168, 85, 247, 0.35);\n    border-radius: 12px;\n    padding: 16px 18px;\n    display: flex;\n    align-items: center;\n    gap: 16px;\n    box-shadow: 0 10px 28px -6px rgba(147, 51, 234, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.08);\n    transition: all 0.22s ease;\n  }\n  .py-sp-ai-banner:hover {\n    border-color: rgba(168, 85, 247, 0.55);\n    box-shadow: 0 12px 32px -4px rgba(147, 51, 234, 0.35);\n  }\n  .py-sp-ai-icon {\n    width: 42px;\n    height: 42px;\n    border-radius: 10px;\n    background: linear-gradient(135deg, #a855f7 0%, #ec4899 100%);\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-size: 1.25rem;\n    flex-shrink: 0;\n    box-shadow: 0 4px 14px rgba(168, 85, 247, 0.4);\n  }\n  .py-sp-ai-body { flex: 1; }\n  .py-sp-ai-title-row {\n    display: flex;\n    align-items: center;\n    gap: 8px;\n    margin-bottom: 4px;\n    flex-wrap: wrap;\n  }\n  .py-sp-ai-title {\n    font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;\n    font-size: 0.92rem;\n    font-weight: 800;\n    color: #fdf4ff !important;\n    letter-spacing: -0.01em;\n  }\n  .py-sp-ai-pill {\n    font-family: 'JetBrains Mono', monospace;\n    font-size: 0.65rem;\n    font-weight: 700;\n    padding: 2px 7px;\n    border-radius: 4px;\n    background: rgba(236, 72, 153, 0.16);\n    border: 1px solid rgba(236, 72, 153, 0.38);\n    color: #f472b6;\n  }\n  .py-sp-ai-text {\n    font-size: 0.78rem;\n    color: #e2e8f0 !important;\n    line-height: 1.55;\n    margin: 0;\n  }\n  .py-sp-code-pill {\n    display: inline-block;\n    background: rgba(168, 85, 247, 0.22) !important;\n    color: #f5d0fe !important;\n    border: 1px solid rgba(168, 85, 247, 0.45) !important;\n    padding: 1px 7px !important;\n    border-radius: 5px !important;\n    font-family: 'JetBrains Mono', monospace !important;\n    font-size: 0.73rem !important;\n    font-weight: 600 !important;\n    vertical-align: middle;\n  }\n\n  /* ══════════════════════════════════════════════════════════\n     LIGHT MODE THEME ADAPTATIONS ([data-theme=\"light\"])\n     ══════════════════════════════════════════════════════════ */\n\n  /* ── Keep Heading Box Dark in Light Mode (Exactly Like 2nd Image) ── */\n  [data-theme=\"light\"] .heading-box-wrap,\n  [data-theme=\"light\"] .slide-section-title.heading-box-wrap {\n    filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.16)) !important;\n  }\n  [data-theme=\"light\"] .heading-num-box {\n    background: linear-gradient(135deg, #6366f1, #8b5cf6) !important;\n    color: #ffffff !important;\n    border: 1px solid rgba(139, 92, 246, 0.6) !important;\n    border-right: none !important;\n    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.25) !important;\n    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3) !important;\n  }\n  [data-theme=\"light\"] .heading-title-box {\n    background: #0f172a !important; /* Retain deep obsidian matte in light mode */\n    border: 1px solid rgba(255, 255, 255, 0.08) !important;\n    border-left: 1px solid rgba(139, 92, 246, 0.4) !important;\n    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 3px 10px rgba(0, 0, 0, 0.12) !important;\n  }\n  [data-theme=\"light\"] .heading-title-text {\n    color: #f8fafc !important; /* Crisp white text inside dark box */\n  }\n  [data-theme=\"light\"] .heading-title-box .audio-play-btn {\n    background: rgba(255, 255, 255, 0.08) !important;\n    border: 1px solid rgba(255, 255, 255, 0.12) !important;\n    color: #94a3b8 !important;\n  }\n  [data-theme=\"light\"] .heading-title-box .audio-play-btn:hover {\n    background: #ef4444 !important;\n    border-color: #ef4444 !important;\n    color: #ffffff !important;\n    box-shadow: 0 0 10px rgba(239, 68, 68, 0.4) !important;\n  }\n  [data-theme=\"light\"] .heading-title-box .audio-play-btn.playing {\n    background: #ef4444 !important;\n    border-color: #ef4444 !important;\n    color: #ffffff !important;\n    box-shadow: 0 0 10px rgba(239, 68, 68, 0.4) !important;\n  }\n  [data-theme=\"light\"] .slide-section h1,\n  [data-theme=\"light\"] .slide-section h2,\n  [data-theme=\"light\"] .slide-section h3,\n  [data-theme=\"light\"] .slide-section h4 {\n    color: #0f172a !important;\n  }\n\n  [data-theme=\"light\"] .py-sp-showcase {\n    background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);\n    border: 1px solid #e2e8f0;\n    box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.05), inset 0 1px 0 #ffffff;\n  }\n  [data-theme=\"light\"] .py-sp-header {\n    border-bottom: 1.5px solid #e2e8f0;\n    padding-bottom: 14px;\n    margin-bottom: 18px;\n  }\n  [data-theme=\"light\"] .py-sp-header-icon {\n    background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);\n    border: 1.5px solid #38bdf8;\n    box-shadow: 0 4px 14px rgba(2, 132, 199, 0.15);\n    width: 44px;\n    height: 44px;\n    border-radius: 12px;\n  }\n  [data-theme=\"light\"] .py-sp-title {\n    color: #0f172a !important;\n    font-size: 1.25rem !important;\n    font-weight: 800 !important;\n    letter-spacing: -0.02em !important;\n  }\n  [data-theme=\"light\"] .py-sp-subtitle {\n    color: #334155 !important;\n    font-size: 0.88rem !important;\n    font-weight: 500 !important;\n  }\n\n  /* Light Mode 4 Cards */\n  [data-theme=\"light\"] .py-sp-card {\n    background: #ffffff;\n    border: 1px solid #e2e8f0;\n    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);\n  }\n  [data-theme=\"light\"] .py-sp-card:hover {\n    background: #ffffff;\n    transform: translateY(-2px);\n    box-shadow: 0 10px 25px -4px rgba(0, 0, 0, 0.08);\n  }\n  [data-theme=\"light\"] .py-sp-card.sp-blue:hover { border-color: #38bdf8; }\n  [data-theme=\"light\"] .py-sp-card.sp-green:hover { border-color: #34d399; }\n  [data-theme=\"light\"] .py-sp-card.sp-amber:hover { border-color: #fbbf24; }\n  [data-theme=\"light\"] .py-sp-card.sp-purple:hover { border-color: #c084fc; }\n\n  [data-theme=\"light\"] .py-sp-card-title {\n    color: #0f172a !important;\n  }\n  [data-theme=\"light\"] .py-sp-desc { color: #1e293b !important; font-weight: 500; }\n  [data-theme=\"light\"] .sp-blue .py-sp-icon {\n    background: #f0f9ff;\n    border: 1px solid #bae6fd;\n  }\n  [data-theme=\"light\"] .sp-green .py-sp-icon {\n    background: #f0fdf4;\n    border: 1px solid #bbf7d0;\n  }\n  [data-theme=\"light\"] .sp-amber .py-sp-icon {\n    background: #fffbeb;\n    border: 1px solid #fde68a;\n  }\n  [data-theme=\"light\"] .sp-purple .py-sp-icon {\n    background: #faf5ff;\n    border: 1px solid #ddd6fe;\n  }\n  [data-theme=\"light\"] .sp-blue .py-sp-num {\n    color: #0284c7;\n    background: #e0f2fe;\n    border: 1px solid #bae6fd;\n  }\n  [data-theme=\"light\"] .sp-green .py-sp-num {\n    color: #16a34a;\n    background: #dcfce7;\n    border: 1px solid #bbf7d0;\n  }\n  [data-theme=\"light\"] .sp-amber .py-sp-num {\n    color: #d97706;\n    background: #fef3c7;\n    border: 1px solid #fde68a;\n  }\n  [data-theme=\"light\"] .sp-purple .py-sp-num {\n    color: #7c3aed;\n    background: #f3e8ff;\n    border: 1px solid #ddd6fe;\n  }\n  [data-theme=\"light\"] .py-sp-tag {\n    background: #f8fafc;\n    border: 1px solid #e2e8f0;\n    color: #334155;\n    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);\n  }\n\n  /* Light Mode 05 AI Banner */\n  [data-theme=\"light\"] .py-sp-ai-banner {\n    background: linear-gradient(135deg, #faf5ff 0%, #f5f3ff 50%, #ffffff 100%);\n    border: 1px solid #d8b4fe;\n    box-shadow: 0 8px 24px -4px rgba(124, 58, 237, 0.08), inset 0 1px 0 #ffffff;\n  }\n  [data-theme=\"light\"] .py-sp-ai-banner:hover {\n    border-color: #c084fc;\n    box-shadow: 0 12px 28px -4px rgba(124, 58, 237, 0.14);\n  }\n  [data-theme=\"light\"] .py-sp-ai-icon {\n    background: linear-gradient(135deg, #9333ea 0%, #db2777 100%);\n    box-shadow: 0 4px 12px rgba(147, 51, 234, 0.25);\n    color: #ffffff;\n  }\n  [data-theme=\"light\"] .py-sp-ai-title {\n    color: #581c87 !important;\n  }\n  [data-theme=\"light\"] .py-sp-ai-pill {\n    background: #fdf2f8;\n    border: 1px solid #fbcfe8;\n    color: #be185d;\n  }\n  [data-theme=\"light\"] .py-sp-ai-text {\n    color: #334155 !important;\n  }\n  [data-theme=\"light\"] .py-sp-code-pill {\n    background: #ede9fe !important;\n    color: #6d28d9 !important;\n    border: 1px solid #c4b5fd !important;\n  }\n\n  /* Other Cards Light Mode Adaptations */\n  [data-theme=\"light\"] .py-infographic-card {\n    background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);\n    border: 1px solid #e2e8f0;\n    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.04), inset 0 1px 0 #ffffff;\n  }\n  [data-theme=\"light\"] .py-info-header {\n    border-bottom: 1px solid #e2e8f0;\n  }\n  [data-theme=\"light\"] .py-info-title {\n    color: #0284c7;\n  }\n  [data-theme=\"light\"] .py-badge-gold {\n    background: #fef3c7;\n    border-color: #fde68a;\n    color: #b45309;\n  }\n  [data-theme=\"light\"] .py-badge-green {\n    background: #dcfce7;\n    border-color: #bbf7d0;\n    color: #15803d;\n  }\n  [data-theme=\"light\"] .py-badge-purple {\n    background: #f3e8ff;\n    border-color: #ddd6fe;\n    color: #6d28d9;\n  }\n  [data-theme=\"light\"] .py-badge-rose {\n    background: #ffe4e6;\n    border-color: #fecdd3;\n    color: #e11d48;\n  }\n  [data-theme=\"light\"] .cpython-cell {\n    background: #ffffff;\n    border: 1px solid #e2e8f0;\n  }\n  [data-theme=\"light\"] .cpython-cell:hover {\n    background: #f0f9ff;\n    border-color: #38bdf8;\n  }\n  [data-theme=\"light\"] .cpython-cell-size { color: #0284c7; font-weight: 700; }\n  [data-theme=\"light\"] .cpython-cell-name {\n    color: #0f172a;\n  }\n  [data-theme=\"light\"] .cpython-cell-desc { color: #1e293b; font-weight: 500; }\n\n  /* Mutability & Memory Light Mode */\n  [data-theme=\"light\"] .py-mut-card.mut-green {\n    background: #f0fdf4;\n    border: 1px solid #86efac;\n  }\n  [data-theme=\"light\"] .py-mut-card.mut-rose {\n    background: #fff1f2;\n    border: 1px solid #fecdd3;\n  }\n  [data-theme=\"light\"] .py-mut-card p {\n    color: #334155 !important;\n  }\n  [data-theme=\"light\"] .py-mut-card .mut-ex { color: #1e293b !important; font-weight: 600; }\n  [data-theme=\"light\"] .py-mem-card {\n    background: #ffffff;\n    border: 1px solid #e2e8f0;\n    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02);\n  }\n  [data-theme=\"light\"] .py-mem-card .py-mem-desc { color: #1e293b !important; font-weight: 500; }\n  [data-theme=\"light\"] .py-code-box {\n    background: #f8fafc;\n    border: 1px solid #e2e8f0;\n    color: #0f172a;\n  }\n  [data-theme=\"light\"] .py-code-box .code-comment { color: #047857; font-weight: 600; font-style: italic; }\n\n  /* ══════════════════════════════════════════════════════════\n     MUTABILITY ARCHITECTURE SHOWCASE (LIGHT & DARK DUAL THEME)\n     ══════════════════════════════════════════════════════════ */\n  .py-mut-showcase {\n    background: linear-gradient(145deg, rgba(15, 23, 42, 0.96) 0%, rgba(10, 16, 31, 0.98) 100%);\n    border: 1px solid rgba(255, 255, 255, 0.08);\n    border-radius: 14px;\n    padding: 20px 22px;\n    margin: 16px 0;\n    box-shadow: 0 16px 40px -10px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.06);\n    transition: all 0.3s ease;\n  }\n  .py-mut-header {\n    margin-bottom: 18px;\n    padding-bottom: 14px;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.08);\n  }\n  .py-mut-title-row {\n    display: flex;\n    align-items: center;\n    gap: 14px;\n    flex-wrap: wrap;\n  }\n  .py-mut-header-icon {\n    width: 42px;\n    height: 42px;\n    border-radius: 12px;\n    background: linear-gradient(135deg, rgba(168, 85, 247, 0.18) 0%, rgba(99, 102, 241, 0.22) 100%);\n    border: 1px solid rgba(168, 85, 247, 0.35);\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-size: 1.25rem;\n    flex-shrink: 0;\n    box-shadow: 0 4px 14px rgba(168, 85, 247, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1);\n  }\n  .py-mut-title {\n    margin: 0;\n    font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;\n    font-size: 1.12rem;\n    font-weight: 800;\n    letter-spacing: -0.015em;\n    color: #f8fafc !important;\n    line-height: 1.3;\n  }\n  .py-mut-subtitle {\n    margin: 6px 0 0 56px;\n    font-size: 0.88rem;\n    color: #94a3b8 !important;\n    font-weight: 500;\n    letter-spacing: 0.01em;\n    line-height: 1.4;\n  }\n  @media (max-width: 640px) {\n    .py-mut-subtitle {\n      margin-left: 0;\n    }\n  }\n\n  /* Dual Comparison Columns Grid */\n  .py-mut-grid {\n    display: grid;\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n    gap: 14px;\n  }\n  @media (max-width: 768px) {\n    .py-mut-grid { grid-template-columns: 1fr; }\n  }\n\n  .py-mut-panel {\n    border-radius: 12px;\n    padding: 16px;\n    display: flex;\n    flex-direction: column;\n    justify-content: flex-start;\n    transition: all 0.25s ease;\n    position: relative;\n    overflow: hidden;\n  }\n  .py-mut-panel::before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    height: 3px;\n  }\n\n  /* Mutable (Green) */\n  .py-mut-panel.panel-mutable {\n    background: rgba(16, 185, 129, 0.04);\n    border: 1px solid rgba(16, 185, 129, 0.22);\n  }\n  .py-mut-panel.panel-mutable::before {\n    background: linear-gradient(90deg, #10b981 0%, #34d399 100%);\n  }\n  .py-mut-panel.panel-mutable:hover {\n    border-color: rgba(16, 185, 129, 0.45);\n    box-shadow: 0 10px 25px -5px rgba(16, 185, 129, 0.15);\n  }\n\n  /* Immutable (Rose) */\n  .py-mut-panel.panel-immutable {\n    background: rgba(244, 63, 94, 0.04);\n    border: 1px solid rgba(244, 63, 94, 0.22);\n  }\n  .py-mut-panel.panel-immutable::before {\n    background: linear-gradient(90deg, #f43f5e 0%, #fb7185 100%);\n  }\n  .py-mut-panel.panel-immutable:hover {\n    border-color: rgba(244, 63, 94, 0.45);\n    box-shadow: 0 10px 25px -5px rgba(244, 63, 94, 0.15);\n  }\n\n  /* Distinct Box for Headings */\n  .py-mut-header-box {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: 10px;\n    padding: 10px 14px;\n    border-radius: 10px;\n    margin-bottom: 12px;\n    min-height: 64px;\n    box-sizing: border-box;\n    transition: all 0.2s ease;\n  }\n  .mut-header-green {\n    background: rgba(16, 185, 129, 0.08);\n    border: 1px solid rgba(16, 185, 129, 0.28);\n    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);\n  }\n  .mut-header-rose {\n    background: rgba(244, 63, 94, 0.08);\n    border: 1px solid rgba(244, 63, 94, 0.28);\n    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);\n  }\n\n  [data-theme=\"light\"] .mut-header-green {\n    background: #f0fdf4;\n    border: 1px solid #86efac;\n    box-shadow: 0 1px 4px rgba(16, 185, 129, 0.08);\n  }\n  [data-theme=\"light\"] .mut-header-rose {\n    background: #fff1f2;\n    border: 1px solid #fecdd3;\n    box-shadow: 0 1px 4px rgba(244, 63, 94, 0.08);\n  }\n\n  .py-mut-panel-title-wrap {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n  }\n  .py-mut-panel-icon {\n    width: 36px;\n    height: 36px;\n    border-radius: 8px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-size: 1.15rem;\n    flex-shrink: 0;\n  }\n  .mut-header-green .py-mut-panel-icon {\n    background: rgba(16, 185, 129, 0.16);\n    border: 1px solid rgba(16, 185, 129, 0.32);\n  }\n  [data-theme=\"light\"] .mut-header-green .py-mut-panel-icon {\n    background: #ffffff;\n    border: 1px solid #86efac;\n    box-shadow: 0 1px 2px rgba(16, 185, 129, 0.1);\n  }\n  .mut-header-rose .py-mut-panel-icon {\n    background: rgba(244, 63, 94, 0.16);\n    border: 1px solid rgba(244, 63, 94, 0.32);\n  }\n  [data-theme=\"light\"] .mut-header-rose .py-mut-panel-icon {\n    background: #ffffff;\n    border: 1px solid #fecdd3;\n    box-shadow: 0 1px 2px rgba(244, 63, 94, 0.1);\n  }\n\n  .py-mut-panel-name {\n    margin: 0;\n    font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;\n    font-size: 0.98rem;\n    font-weight: 800;\n    letter-spacing: -0.01em;\n  }\n  .mut-header-green .py-mut-panel-name { color: #4ade80 !important; }\n  [data-theme=\"light\"] .mut-header-green .py-mut-panel-name { color: #15803d !important; }\n  .mut-header-rose .py-mut-panel-name { color: #fb7185 !important; }\n  [data-theme=\"light\"] .mut-header-rose .py-mut-panel-name { color: #be123c !important; }\n\n  .py-mut-panel-sub {\n    display: block;\n    font-size: 0.68rem;\n    font-weight: 500;\n    color: #94a3b8;\n    white-space: nowrap;\n  }\n  [data-theme=\"light\"] .py-mut-panel-sub { display: block; font-size: 0.68rem; font-weight: 700; color: #1e293b; white-space: nowrap; }\n\n  /* Vertical Stacked Pill: \"Cannot\" / \"Change\" */\n  .py-mut-status-pill {\n    display: inline-flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    text-align: center;\n    line-height: 1.15;\n    font-family: 'JetBrains Mono', monospace;\n    font-size: 0.62rem;\n    font-weight: 800;\n    padding: 4px 8px;\n    border-radius: 6px;\n    white-space: nowrap;\n    flex-shrink: 0;\n    letter-spacing: 0.03em;\n    text-transform: uppercase;\n  }\n  .py-mut-status-pill span {\n    display: block;\n    line-height: 1.15;\n  }\n  .pill-mutable {\n    background: rgba(16, 185, 129, 0.18);\n    border: 1px solid rgba(16, 185, 129, 0.38);\n    color: #34d399;\n  }\n  [data-theme=\"light\"] .pill-mutable {\n    background: #dcfce7;\n    border: 1px solid #86efac;\n    color: #15803d;\n    box-shadow: 0 1px 2px rgba(16, 185, 129, 0.1);\n  }\n  .pill-immutable {\n    background: rgba(244, 63, 94, 0.18);\n    border: 1px solid rgba(244, 63, 94, 0.38);\n    color: #fb7185;\n  }\n  [data-theme=\"light\"] .pill-immutable {\n    background: #ffe4e6;\n    border: 1px solid #fecdd3;\n    color: #be123c;\n    box-shadow: 0 1px 2px rgba(244, 63, 94, 0.1);\n  }\n\n  .py-mut-desc {\n    font-size: 0.78rem;\n    line-height: 1.55;\n    color: #cbd5e1 !important;\n    margin: 0 0 12px 0;\n    min-height: 72px;\n    box-sizing: border-box;\n  }\n\n  .py-mut-types-row {\n    display: flex;\n    align-items: center;\n    gap: 6px;\n    margin-bottom: 12px;\n    min-height: 30px;\n    box-sizing: border-box;\n    flex-wrap: wrap;\n  }\n  .py-mut-types-label {\n    font-size: 0.70rem;\n    color: #94a3b8;\n    font-weight: 600;\n    text-transform: uppercase;\n    letter-spacing: 0.04em;\n  }\n  .py-mut-type-tag {\n    font-family: 'JetBrains Mono', monospace;\n    font-size: 0.70rem;\n    font-weight: 700;\n    padding: 1px 7px;\n    border-radius: 4px;\n  }\n  .panel-mutable .py-mut-type-tag {\n    background: rgba(16, 185, 129, 0.15);\n    border: 1px solid rgba(16, 185, 129, 0.3);\n    color: #6ee7b7;\n  }\n  .panel-immutable .py-mut-type-tag {\n    background: rgba(244, 63, 94, 0.15);\n    border: 1px solid rgba(244, 63, 94, 0.3);\n    color: #fca5a5;\n  }\n\n  /* Sleek Visual Code Card Inside Panel */\n  .py-mut-code-wrap {\n    background: rgba(0, 0, 0, 0.45);\n    border: 1px solid rgba(255, 255, 255, 0.08);\n    border-radius: 8px;\n    overflow: hidden;\n    min-height: 122px;\n    box-sizing: border-box;\n    display: flex;\n    flex-direction: column;\n    justify-content: space-between;\n    margin-bottom: 10px;\n  }\n  .py-mut-code-topbar {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    padding: 6px 10px;\n    background: rgba(255, 255, 255, 0.03);\n    border-bottom: 1px solid rgba(255, 255, 255, 0.06);\n    font-family: 'JetBrains Mono', monospace;\n    font-size: 0.68rem;\n  }\n  .panel-mutable .py-mut-code-topbar { color: #34d399; }\n  .panel-immutable .py-mut-code-topbar { color: #fb7185; }\n\n  .py-mut-code-wrap pre {\n    margin: 0;\n    padding: 10px 12px;\n    font-family: 'JetBrains Mono', monospace;\n    font-size: 0.74rem;\n    color: #f8fafc;\n    line-height: 1.6;\n    overflow-x: auto;\n  }\n\n  .py-mut-takeaway {\n    margin-top: 0;\n    font-size: 0.72rem;\n    padding: 8px 12px;\n    border-radius: 6px;\n    line-height: 1.45;\n    min-height: 60px;\n    box-sizing: border-box;\n    display: flex;\n    align-items: center;\n  }\n  .panel-mutable .py-mut-takeaway {\n    margin-top: 0;\n    font-size: 0.72rem;\n    padding: 8px 12px;\n    border-radius: 6px;\n    line-height: 1.45;\n    min-height: 60px;\n    box-sizing: border-box;\n    display: flex;\n    align-items: center;\n  }\n  .panel-immutable .py-mut-takeaway {\n    margin-top: 0;\n    font-size: 0.72rem;\n    padding: 8px 12px;\n    border-radius: 6px;\n    line-height: 1.45;\n    min-height: 60px;\n    box-sizing: border-box;\n    display: flex;\n    align-items: center;\n  }\n\n  /* ══════════════════════════════════════════════════════════\n     LIGHT MODE OVERRIDES FOR MUTABILITY SHOWCASE\n     ══════════════════════════════════════════════════════════ */\n  [data-theme=\"light\"] .py-mut-showcase {\n    background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);\n    border: 1px solid #e2e8f0;\n    box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.05), inset 0 1px 0 #ffffff;\n  }\n  [data-theme=\"light\"] .py-mut-header {\n    border-bottom: 1.5px solid #e2e8f0;\n    padding-bottom: 14px;\n    margin-bottom: 18px;\n  }\n  [data-theme=\"light\"] .py-mut-header-icon {\n    background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%);\n    border: 1.5px solid #c084fc;\n    box-shadow: 0 4px 14px rgba(168, 85, 247, 0.15);\n    width: 44px;\n    height: 44px;\n    border-radius: 12px;\n  }\n  [data-theme=\"light\"] .py-mut-title {\n    color: #0f172a !important;\n    font-size: 1.25rem !important;\n    font-weight: 800 !important;\n    letter-spacing: -0.02em !important;\n  }\n  [data-theme=\"light\"] .py-mut-subtitle {\n    color: #334155 !important;\n    font-size: 0.88rem !important;\n    font-weight: 500 !important;\n  }\n\n  /* Light Mode Panels */\n  [data-theme=\"light\"] .py-mut-panel.panel-mutable {\n    background: #ffffff;\n    border: 1px solid #d1fae5;\n    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);\n  }\n  [data-theme=\"light\"] .py-mut-panel.panel-mutable:hover {\n    border-color: #86efac;\n    box-shadow: 0 8px 20px -4px rgba(16, 185, 129, 0.12);\n  }\n  [data-theme=\"light\"] .panel-mutable .py-mut-panel-title {\n    color: #15803d !important;\n  }\n  [data-theme=\"light\"] .panel-mutable .py-mut-meta-pill {\n    background: #dcfce7;\n    color: #166534;\n    border: 1px solid #86efac;\n  }\n  [data-theme=\"light\"] .panel-mutable .py-mut-type-tag {\n    background: #dcfce7;\n    border: 1px solid #86efac;\n    color: #15803d;\n  }\n  [data-theme=\"light\"] .panel-mutable .py-mut-takeaway {\n    margin-top: 0;\n    font-size: 0.72rem;\n    padding: 8px 12px;\n    border-radius: 6px;\n    line-height: 1.45;\n    min-height: 60px;\n    box-sizing: border-box;\n    display: flex;\n    align-items: center;\n  }\n\n  [data-theme=\"light\"] .py-mut-panel.panel-immutable {\n    background: #ffffff;\n    border: 1px solid #ffe4e6;\n    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);\n  }\n  [data-theme=\"light\"] .py-mut-panel.panel-immutable:hover {\n    border-color: #fda4af;\n    box-shadow: 0 8px 20px -4px rgba(244, 63, 94, 0.12);\n  }\n  [data-theme=\"light\"] .panel-immutable .py-mut-panel-title {\n    color: #be123c !important;\n  }\n  [data-theme=\"light\"] .panel-immutable .py-mut-meta-pill {\n    background: #ffe4e6;\n    color: #9f1239;\n    border: 1px solid #fecdd3;\n  }\n  [data-theme=\"light\"] .panel-immutable .py-mut-type-tag {\n    background: #ffe4e6;\n    border: 1px solid #fecdd3;\n    color: #be123c;\n  }\n  [data-theme=\"light\"] .panel-immutable .py-mut-takeaway {\n    margin-top: 0;\n    font-size: 0.72rem;\n    padding: 8px 12px;\n    border-radius: 6px;\n    line-height: 1.45;\n    min-height: 60px;\n    box-sizing: border-box;\n    display: flex;\n    align-items: center;\n  }\n\n  [data-theme=\"light\"] .py-mut-desc {\n    font-size: 0.78rem;\n    line-height: 1.55;\n    color: #1e293b !important;\n    margin: 0 0 12px 0;\n    min-height: 72px;\n    box-sizing: border-box;\n    font-weight: 500;\n  }\n  [data-theme=\"light\"] .py-mut-analogy-badge { color: #1e293b !important; font-weight: 700; }\n  [data-theme=\"light\"] .py-mut-types-label { color: #0f172a !important; font-weight: 800; }\n\n  [data-theme=\"light\"] .py-mut-code-wrap {\n    background: #f8fafc !important;\n    border: 1.5px solid #cbd5e1 !important;\n    border-radius: 8px;\n    overflow: hidden;\n    min-height: 122px;\n    box-sizing: border-box;\n    display: flex;\n    flex-direction: column;\n    justify-content: space-between;\n    margin-bottom: 10px;\n  }\n  [data-theme=\"light\"] .py-mut-code-topbar {\n    background: #f8fafc;\n    border-bottom: 1px solid #e2e8f0;\n  }\n  [data-theme=\"light\"] .panel-mutable .py-mut-code-topbar { color: #15803d; }\n  [data-theme=\"light\"] .panel-immutable .py-mut-code-topbar { color: #be123c; }\n  [data-theme=\"light\"] .py-mut-code-wrap pre {\n    color: #0f172a;\n  }\n  [data-theme=\"light\"] .py-mut-code-wrap pre .code-comment { color: #047857 !important; font-weight: 600 !important; font-style: italic !important; }\n\n\n  /* ══════════════════════════════════════════════════════════\n     ANTI-SQUEEZE & RESPONSIVE SPLIT-PANE STYLING\n     ══════════════════════════════════════════════════════════ */\n  /* Prevent table squeezing and word splitting */\n  .db-mock-table-wrap {\n    width: 100% !important;\n    overflow-x: auto !important;\n    -webkit-overflow-scrolling: touch;\n    margin: 14px 0;\n    border-radius: 10px;\n  }\n  .db-mock-table-wrap .db-table-mock {\n    min-width: 650px !important;\n    width: 100%;\n    border-collapse: collapse;\n  }\n  .db-mock-table-wrap .db-table-mock th,\n  .db-mock-table-wrap .db-table-mock td {\n    padding: 8px 12px !important;\n    vertical-align: middle;\n  }\n  /* Code & Syntax pills NEVER break into multiple lines when squeezed */\n  .db-mock-table-wrap code,\n  .db-mock-table-wrap .db-table-mock code {\n    white-space: nowrap !important;\n    display: inline-block !important;\n    word-break: normal !important;\n    overflow-wrap: normal !important;\n    hyphens: none !important;\n  }\n  /* Prevent Category, Type, Keyword, Syntax, and Mutability columns from line-breaking */\n  .db-mock-table-wrap .db-table-mock th:nth-child(1),\n  .db-mock-table-wrap .db-table-mock td:nth-child(1),\n  .db-mock-table-wrap .db-table-mock th:nth-child(2),\n  .db-mock-table-wrap .db-table-mock td:nth-child(2),\n  .db-mock-table-wrap .db-table-mock th:nth-child(3),\n  .db-mock-table-wrap .db-table-mock td:nth-child(3),\n  .db-mock-table-wrap .db-table-mock th:nth-child(4),\n  .db-mock-table-wrap .db-table-mock td:nth-child(4),\n  .db-mock-table-wrap .db-table-mock th:nth-child(6),\n  .db-mock-table-wrap .db-table-mock td:nth-child(6) {\n    white-space: nowrap !important;\n  }\n  /* Description column wraps naturally with legible line height */\n  .db-mock-table-wrap .db-table-mock td:nth-child(5) {\n    white-space: normal !important;\n    min-width: 180px;\n    line-height: 1.45;\n  }\n  .db-mock-table-wrap .py-badge {\n    white-space: nowrap !important;\n    display: inline-block;\n  }\n\n  /* ══════════════════════════════════════════════════════════\n     TOOL MATRIX: FLAGSHIP COMPARISON SHOWCASE\n     ══════════════════════════════════════════════════════════ */\n  .py-matrix-showcase {\n    background: linear-gradient(145deg, #0d1527 0%, #080d1a 100%);\n    border: 1px solid rgba(56, 189, 248, 0.22);\n    border-radius: 12px;\n    padding: 16px;\n    margin: 16px 0;\n    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);\n    position: relative;\n    overflow: hidden;\n  }\n  .py-matrix-header {\n    margin-bottom: 18px;\n    padding-bottom: 14px;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.08);\n  }\n  .py-matrix-title-row {\n    display: flex;\n    align-items: center;\n    gap: 14px;\n    flex-wrap: wrap;\n  }\n  .py-matrix-header-icon {\n    font-size: 1.25rem;\n    line-height: 1;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    width: 42px;\n    height: 42px;\n    border-radius: 12px;\n    background: linear-gradient(135deg, rgba(16, 185, 129, 0.16) 0%, rgba(56, 189, 248, 0.22) 100%);\n    border: 1px solid rgba(56, 189, 248, 0.35);\n    flex-shrink: 0;\n    box-shadow: 0 4px 14px rgba(56, 189, 248, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.1);\n  }\n  .py-matrix-header-text {\n    display: flex;\n    flex-direction: column;\n    gap: 2px;\n    flex: 1;\n  }\n  .py-matrix-title-row {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n    flex-wrap: wrap;\n  }\n  .py-matrix-title {\n    margin: 0;\n    font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;\n    font-size: 1.12rem;\n    font-weight: 800;\n    letter-spacing: -0.015em;\n    color: #f8fafc;\n    line-height: 1.3;\n  }\n  .py-matrix-subtitle {\n    margin: 3px 0 0 0;\n    font-size: 0.82rem;\n    color: #94a3b8;\n    font-weight: 500;\n    letter-spacing: 0.01em;\n    line-height: 1.4;\n  }\n\n  /* Matrix Table Container */\n  .py-matrix-table-wrap {\n    width: 100%;\n    overflow-x: auto;\n    -webkit-overflow-scrolling: touch;\n    border-radius: 8px;\n    border: 1px solid rgba(255, 255, 255, 0.08);\n    background: rgba(11, 17, 32, 0.6);\n  }\n  .py-matrix-table {\n    width: 100%;\n    border-collapse: separate;\n    border-spacing: 0;\n    min-width: 620px;\n    font-family: inherit;\n  }\n  .py-matrix-table th {\n    background: #0f172a;\n    color: #94a3b8;\n    font-size: 0.72rem;\n    font-weight: 700;\n    text-transform: uppercase;\n    letter-spacing: 0.06em;\n    padding: 10px 14px;\n    text-align: left;\n    border-bottom: 2px solid rgba(255, 255, 255, 0.1);\n    white-space: nowrap;\n  }\n  .py-matrix-table td {\n    padding: 12px 14px;\n    font-size: 0.82rem;\n    line-height: 1.45;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.06);\n    color: #e2e8f0;\n    vertical-align: middle;\n  }\n  .py-matrix-table tr:last-child td {\n    border-bottom: none;\n  }\n  .py-matrix-table tbody tr {\n    transition: background-color 0.2s ease;\n  }\n  .py-matrix-table tbody tr:hover {\n    background: rgba(255, 255, 255, 0.03);\n  }\n\n  /* Tool Identity Pills */\n  .py-tool-pill {\n    display: inline-flex;\n    align-items: center;\n    gap: 8px;\n    padding: 6px 12px;\n    border-radius: 8px;\n    font-weight: 700;\n    font-size: 0.84rem;\n    letter-spacing: -0.01em;\n    white-space: nowrap;\n  }\n  .py-tool-pill.tool-sql {\n    background: rgba(56, 189, 248, 0.12);\n    color: #38bdf8;\n    border: 1px solid rgba(56, 189, 248, 0.3);\n  }\n  .py-tool-pill.tool-excel {\n    background: rgba(34, 197, 94, 0.12);\n    color: #4ade80;\n    border: 1px solid rgba(34, 197, 94, 0.3);\n  }\n  .py-tool-pill.tool-python {\n    background: rgba(245, 158, 11, 0.15);\n    color: #fbbf24;\n    border: 1px solid rgba(245, 158, 11, 0.38);\n    box-shadow: 0 0 10px rgba(245, 158, 11, 0.12);\n  }\n  .py-tool-flag {\n    font-size: 0.65rem;\n    font-weight: 800;\n    padding: 1px 5px;\n    border-radius: 4px;\n    background: #fbbf24;\n    color: #0b1120;\n    text-transform: uppercase;\n    letter-spacing: 0.04em;\n    margin-left: 2px;\n  }\n  .py-matrix-highlight-row {\n    background: rgba(245, 158, 11, 0.04) !important;\n  }\n  .py-matrix-highlight-row:hover {\n    background: rgba(245, 158, 11, 0.08) !important;\n  }\n\n  /* Role & Advantage Content */\n  .py-matrix-role {\n    font-weight: 500;\n    color: #cbd5e1;\n  }\n  .py-matrix-adv {\n    color: #e2e8f0;\n  }\n\n  /* Capacity / Limits Badges */\n  .py-matrix-limit {\n    display: inline-flex;\n    align-items: center;\n    gap: 5px;\n    padding: 4px 10px;\n    border-radius: 6px;\n    font-size: 0.74rem;\n    font-weight: 600;\n    white-space: nowrap;\n  }\n  .py-matrix-limit.limit-massive {\n    background: rgba(56, 189, 248, 0.1);\n    color: #38bdf8;\n    border: 1px solid rgba(56, 189, 248, 0.25);\n  }\n  .py-matrix-limit.limit-small {\n    background: rgba(244, 63, 94, 0.1);\n    color: #fb7185;\n    border: 1px solid rgba(244, 63, 94, 0.25);\n  }\n  .py-matrix-limit.limit-large {\n    background: rgba(168, 85, 247, 0.12);\n    color: #c084fc;\n    border: 1px solid rgba(168, 85, 247, 0.28);\n  }\n\n  /* ══════ LIGHT MODE THEME ADAPTATION ══════ */\n  [data-theme=\"light\"] .py-matrix-showcase {\n    background: #ffffff;\n    border: 1px solid #e2e8f0;\n    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);\n  }\n  [data-theme=\"light\"] .py-matrix-header {\n    border-bottom: 1.5px solid #e2e8f0;\n    padding-bottom: 14px;\n    margin-bottom: 18px;\n  }\n  [data-theme=\"light\"] .py-matrix-header-icon {\n    background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);\n    border: 1.5px solid #34d399;\n    box-shadow: 0 4px 14px rgba(16, 185, 129, 0.15);\n    width: 44px;\n    height: 44px;\n    border-radius: 12px;\n  }\n  [data-theme=\"light\"] .py-matrix-title {\n    color: #0f172a !important;\n    font-size: 1.25rem !important;\n    font-weight: 800 !important;\n    letter-spacing: -0.02em !important;\n  }\n  [data-theme=\"light\"] .py-matrix-subtitle {\n    color: #334155 !important;\n    font-size: 0.88rem !important;\n    font-weight: 500 !important;\n  }\n  [data-theme=\"light\"] .py-matrix-table-wrap {\n    border-color: #e2e8f0;\n    background: #ffffff;\n  }\n  [data-theme=\"light\"] .py-matrix-table th { background: #f1f5f9; color: #0f172a; font-weight: 800; border-bottom: 2px solid #cbd5e1; }\n  [data-theme=\"light\"] .py-matrix-table td {\n    color: #334155;\n    border-bottom: 1px solid #f1f5f9;\n  }\n  [data-theme=\"light\"] .py-matrix-table tbody tr:hover {\n    background: #f8fafc;\n  }\n  [data-theme=\"light\"] .py-tool-pill.tool-sql {\n    background: #e0f2fe;\n    color: #0369a1;\n    border-color: #bae6fd;\n  }\n  [data-theme=\"light\"] .py-tool-pill.tool-excel {\n    background: #dcfce7;\n    color: #15803d;\n    border-color: #bbf7d0;\n  }\n  [data-theme=\"light\"] .py-tool-pill.tool-python {\n    background: #fef3c7;\n    color: #b45309;\n    border-color: #fde68a;\n    box-shadow: 0 0 10px rgba(245, 158, 11, 0.1);\n  }\n  [data-theme=\"light\"] .py-tool-flag {\n    background: #d97706;\n    color: #ffffff;\n  }\n  [data-theme=\"light\"] .py-matrix-highlight-row {\n    background: #fffbeb !important;\n  }\n  [data-theme=\"light\"] .py-matrix-highlight-row:hover {\n    background: #fef3c7 !important;\n  }\n  [data-theme=\"light\"] .py-matrix-role { color: #0f172a; font-weight: 700; }\n  [data-theme=\"light\"] .py-matrix-adv {\n    color: #1e293b;\n  }\n  [data-theme=\"light\"] .py-matrix-limit.limit-massive {\n    background: #e0f2fe;\n    color: #0369a1;\n    border-color: #bae6fd;\n  }\n  [data-theme=\"light\"] .py-matrix-limit.limit-small {\n    background: #ffe4e6;\n    color: #e11d48;\n    border-color: #fecdd3;\n  }\n  [data-theme=\"light\"] .py-matrix-limit.limit-large {\n    background: #f3e8ff;\n    color: #7e22ce;\n    border-color: #e9d5ff;\n  }\n\n  /* Flexible auto-fit for cards when theory pane is squeezed by split-resizer */\n  .py-sp-grid {\n    display: grid;\n    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)) !important;\n    gap: 12px;\n  }\n  .py-mut-grid {\n    display: grid;\n    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)) !important;\n    gap: 14px;\n  }\n\n  /* ══════════════════════════════════════════════════════════\n     FROZEN (STICKY) COLUMNS FOR MASTER REFERENCE TABLE\n     ══════════════════════════════════════════════════════════ */\n  .slide-card,\n  .slide-content,\n  #slideBodyText,\n  .slide-section {\n    overflow-x: clip !important;\n    max-width: 100% !important;\n    box-sizing: border-box !important;\n  }\n\n  .db-mock-table-wrap {\n    width: 100% !important;\n    max-width: 100% !important;\n    overflow-x: auto !important;\n    overflow-y: hidden !important;\n    overscroll-behavior-x: contain !important;\n    overscroll-behavior-y: auto !important;\n    -webkit-overflow-scrolling: touch !important;\n    position: relative !important;\n    display: block !important;\n    border-radius: 10px !important;\n    border: 1px solid rgba(255, 255, 255, 0.1) !important;\n    background: #0c0e14 !important;\n    box-sizing: border-box !important;\n  }\n\n  /* Fixed table layout for mathematical pixel alignment */\n  .db-mock-table-wrap .db-table-mock.py-master-ref-table {\n    table-layout: fixed !important;\n    overflow: visible !important;\n    border-radius: 0 !important;\n    border-collapse: separate !important;\n    border-spacing: 0 !important;\n    width: 780px !important;\n    min-width: 780px !important;\n    max-width: 780px !important;\n    background: #0c0e14 !important;\n    margin: 0 !important;\n  }\n\n  /* Explicit column widths for fixed table layout */\n  .py-master-ref-table th:nth-child(1),\n  .py-master-ref-table td:nth-child(1) {\n    width: 110px !important;\n    min-width: 110px !important;\n    max-width: 110px !important;\n    box-sizing: border-box !important;\n  }\n  .py-master-ref-table th:nth-child(2),\n  .py-master-ref-table td:nth-child(2) {\n    width: 110px !important;\n    min-width: 110px !important;\n    max-width: 110px !important;\n    box-sizing: border-box !important;\n  }\n  .py-master-ref-table th:nth-child(3),\n  .py-master-ref-table td:nth-child(3) {\n    width: 95px !important;\n    min-width: 95px !important;\n    max-width: 95px !important;\n    box-sizing: border-box !important;\n  }\n  .py-master-ref-table th:nth-child(4),\n  .py-master-ref-table td:nth-child(4) {\n    width: 155px !important;\n    min-width: 155px !important;\n    max-width: 155px !important;\n    box-sizing: border-box !important;\n  }\n  .py-master-ref-table th:nth-child(5),\n  .py-master-ref-table td:nth-child(5) {\n    width: 195px !important;\n    min-width: 195px !important;\n    max-width: 195px !important;\n    box-sizing: border-box !important;\n  }\n  .py-master-ref-table th:nth-child(6),\n  .py-master-ref-table td:nth-child(6) {\n    width: 115px !important;\n    min-width: 115px !important;\n    max-width: 115px !important;\n    box-sizing: border-box !important;\n  }\n\n  /* Prevent child elements in non-sticky cells from creating higher stacking contexts */\n  .py-master-ref-table code,\n  .py-master-ref-table .py-badge {\n    position: static !important;\n    z-index: 0 !important;\n  }\n\n  /* Non-sticky cells: solid background & lower z-index so they slide cleanly behind */\n  .py-master-ref-table th:nth-child(n+3),\n  .py-master-ref-table td:nth-child(n+3) {\n    position: relative !important;\n    z-index: 1 !important;\n    background: #0c0e14 !important;\n  }\n\n  /* Column 1: Category (Sticky at Left 0) */\n  .py-master-ref-table th:nth-child(1),\n  .py-master-ref-table td:nth-child(1) {\n    position: -webkit-sticky !important;\n    position: sticky !important;\n    left: 0 !important;\n    z-index: 20 !important;\n    white-space: nowrap !important;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;\n    background: #0f1422 !important;\n  }\n\n  /* Column 2: Data Type (Sticky at Left 110px) */\n  .py-master-ref-table th:nth-child(2),\n  .py-master-ref-table td:nth-child(2) {\n    position: -webkit-sticky !important;\n    position: sticky !important;\n    left: 110px !important;\n    z-index: 20 !important;\n    white-space: nowrap !important;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;\n    border-right: 2px solid rgba(56, 189, 248, 0.45) !important;\n    box-shadow: 6px 0 16px rgba(0, 0, 0, 0.65) !important;\n    background: #0f1422 !important;\n  }\n\n  /* Sticky headers (z-index: 25) */\n  .py-master-ref-table th:nth-child(1),\n  .py-master-ref-table th:nth-child(2) {\n    z-index: 25 !important;\n    background: #141b2d !important;\n    border-bottom: 2px solid rgba(255, 255, 255, 0.15) !important;\n  }\n\n  /* Row Hover Highlighting */\n  .py-master-ref-table tbody tr:hover td:nth-child(1),\n  .py-master-ref-table tbody tr:hover td:nth-child(2) {\n    background: #182238 !important;\n  }\n  .py-master-ref-table tbody tr:hover td:nth-child(n+3) {\n    background: #121622 !important;\n  }\n\n  /* ══════ LIGHT MODE THEME ADAPTATION ══════ */\n  [data-theme=\"light\"] .db-mock-table-wrap {\n    border: 1px solid #e2e8f0 !important;\n    background: #ffffff !important;\n  }\n  [data-theme=\"light\"] .db-mock-table-wrap .db-table-mock.py-master-ref-table {\n    background: #ffffff !important;\n  }\n  [data-theme=\"light\"] .py-master-ref-table th:nth-child(n+3),\n  [data-theme=\"light\"] .py-master-ref-table td:nth-child(n+3) {\n    background: #ffffff !important;\n  }\n  [data-theme=\"light\"] .py-master-ref-table th:nth-child(1),\n  [data-theme=\"light\"] .py-master-ref-table th:nth-child(2) {\n    background: #f1f5f9 !important;\n    color: #0f172a !important;\n    font-weight: 900 !important;\n    border-bottom: 2px solid #cbd5e1 !important;\n  }\n  [data-theme=\"light\"] .py-master-ref-table td:nth-child(1),\n  [data-theme=\"light\"] .py-master-ref-table td:nth-child(2) {\n    background: #ffffff !important;\n    color: #0f172a !important;\n    font-weight: 800 !important;\n    border-bottom: 1px solid #e2e8f0 !important;\n  }\n  [data-theme=\"light\"] .py-master-ref-table th:nth-child(2),\n  [data-theme=\"light\"] .py-master-ref-table td:nth-child(2) {\n    border-right: 2px solid #cbd5e1 !important;\n    box-shadow: 6px 0 14px rgba(0, 0, 0, 0.08) !important;\n  }\n  [data-theme=\"light\"] .py-master-ref-table tbody tr:hover td:nth-child(1),\n  [data-theme=\"light\"] .py-master-ref-table tbody tr:hover td:nth-child(2) {\n    background: #f8fafc !important;\n  }\n  [data-theme=\"light\"] .py-master-ref-table tbody tr:hover td:nth-child(n+3) {\n    background: #f1f5f9 !important;\n  }\n\n  /* ══════════════════════════════════════════════════════════\n     HOW PYTHON MANAGES MEMORY (UNDER THE HOOD) — VERTICAL FLOWCHART\n     ACADEMIC TEXTBOOK COLOR SCIENCE ARCHITECTURE (LIGHT & DARK THEMES)\n     ══════════════════════════════════════════════════════════ */\n  .py-vfc-canvas {\n    background: #090e1c;\n    background-image: radial-gradient(circle, rgba(99, 102, 241, 0.16) 1.2px, transparent 1.2px);\n    background-size: 20px 20px;\n    border: 1.5px solid rgba(99, 102, 241, 0.3);\n    border-radius: 18px;\n    padding: 28px 24px;\n    margin: 24px 0 16px 0;\n    box-shadow: 0 16px 44px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.05);\n    position: relative;\n    overflow: hidden;\n  }\n\n  /* Flowchart Header */\n  .py-vfc-header {\n    text-align: center;\n    margin-bottom: 24px;\n    padding-bottom: 20px;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.08);\n    position: relative;\n  }\n  .py-vfc-title-wrap {\n    display: inline-flex;\n    align-items: center;\n    gap: 12px;\n    margin-bottom: 6px;\n  }\n  .py-vfc-logo {\n    width: 36px;\n    height: 36px;\n    filter: drop-shadow(0 0 12px rgba(56, 189, 248, 0.45));\n  }\n  .py-vfc-main-title {\n    margin: 0;\n    font-size: 1.45rem;\n    font-weight: 900;\n    letter-spacing: -0.02em;\n    color: #f8fafc;\n    text-transform: uppercase;\n  }\n  .py-vfc-sub-title {\n    margin: 0 0 14px 0;\n    font-size: 0.88rem;\n    font-weight: 700;\n    color: #38bdf8;\n    letter-spacing: 0.06em;\n    text-transform: uppercase;\n  }\n\n  /* Header Meta: Breadcrumb + Sticky Note */\n  .py-vfc-header-meta {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: 16px;\n    flex-wrap: wrap;\n    margin-top: 12px;\n  }\n  .py-vfc-pipeline-stepper,\n  .py-vfc-breadcrumb {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    gap: 8px;\n    padding: 6px 12px;\n    background: rgba(15, 23, 42, 0.85);\n    border: 1px solid rgba(255, 255, 255, 0.08);\n    border-radius: 12px;\n    box-shadow: 0 8px 24px -4px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.05);\n    max-width: 100%;\n    overflow-x: auto;\n    scrollbar-width: none;\n    -webkit-overflow-scrolling: touch;\n  }\n  .py-vfc-pipeline-stepper::-webkit-scrollbar,\n  .py-vfc-breadcrumb::-webkit-scrollbar {\n    display: none;\n  }\n  .py-vfc-step {\n    display: inline-flex;\n    align-items: center;\n    gap: 8px;\n    padding: 6px 12px;\n    border-radius: 8px;\n    background: rgba(255, 255, 255, 0.03);\n    border: 1px solid rgba(255, 255, 255, 0.06);\n    font-size: 0.78rem;\n    font-weight: 700;\n    color: #cbd5e1;\n    white-space: nowrap;\n    transition: all 0.2s ease;\n  }\n  .py-vfc-step:hover {\n    background: rgba(255, 255, 255, 0.06);\n    border-color: rgba(255, 255, 255, 0.12);\n  }\n  .py-vfc-step-idx {\n    font-family: 'JetBrains Mono', monospace;\n    font-size: 0.68rem;\n    font-weight: 800;\n    padding: 1px 5px;\n    border-radius: 4px;\n    background: rgba(99, 102, 241, 0.18);\n    border: 1px solid rgba(99, 102, 241, 0.3);\n    color: #818cf8;\n    line-height: 1.2;\n  }\n  .py-vfc-step-arrow {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    color: #6366f1;\n    opacity: 0.8;\n    flex-shrink: 0;\n  }\n  .py-vfc-step-arrow svg {\n    display: block;\n  }\n  .py-vfc-step.step-active {\n    background: linear-gradient(135deg, rgba(56, 189, 248, 0.16) 0%, rgba(99, 102, 241, 0.2) 100%);\n    border: 1px solid rgba(56, 189, 248, 0.45);\n    color: #38bdf8;\n    box-shadow: 0 2px 10px rgba(56, 189, 248, 0.15);\n  }\n  .py-vfc-step.step-active .py-vfc-step-idx {\n    background: rgba(56, 189, 248, 0.2);\n    border-color: rgba(56, 189, 248, 0.45);\n    color: #38bdf8;\n  }\n  .py-vfc-breadcrumb-sep {\n    color: #818cf8;\n    font-weight: 900;\n  }\n  .py-vfc-breadcrumb span.highlight {\n    color: #38bdf8;\n    font-weight: 800;\n  }\n  \n  \n\n  /* ══════ VERTICAL FLOWCHART PIPELINE & CONNECTORS ══════ */\n  .py-vfc-pipeline {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    max-width: 780px;\n    margin: 0 auto;\n    width: 100%;\n  }\n\n  /* Vertical Flow Connector with Stem and Arrow Badge */\n  .py-vfc-connector {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    margin: -1px 0;\n    position: relative;\n    z-index: 1;\n  }\n  .py-vfc-stem {\n    width: 2px;\n    height: 14px;\n    background: linear-gradient(180deg, rgba(99, 102, 241, 0.7), rgba(56, 189, 248, 0.85));\n  }\n  .py-vfc-arrow-badge {\n    width: 32px;\n    height: 32px;\n    border-radius: 50%;\n    background: #0d1527;\n    border: 1.5px solid #38bdf8;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    box-shadow: 0 0 14px rgba(56, 189, 248, 0.35);\n    transition: transform 0.2s ease, box-shadow 0.2s ease;\n  }\n  .py-vfc-arrow-badge:hover {\n    transform: scale(1.1);\n    box-shadow: 0 0 20px rgba(56, 189, 248, 0.6);\n  }\n  .py-vfc-arrow-badge svg {\n    filter: drop-shadow(0 0 4px rgba(56, 189, 248, 0.6));\n  }\n\n  /* Base Vertical Flowchart Node */\n  .py-vfc-node {\n    width: 100%;\n    box-sizing: border-box;\n    background: #0d1527;\n    border: 1.5px solid rgba(255, 255, 255, 0.1);\n    border-radius: 14px;\n    padding: 16px 18px;\n    box-shadow: 0 6px 22px rgba(0, 0, 0, 0.38);\n    transition: border-color 0.2s ease, box-shadow 0.2s ease;\n    position: relative;\n    z-index: 2;\n  }\n  .py-vfc-node:hover {\n    box-shadow: 0 10px 28px rgba(99, 102, 241, 0.22);\n  }\n\n  /* Distinct Accent Borders per Node */\n  .vnode-code { border-color: rgba(99, 102, 241, 0.5); }\n  .vnode-objects { border-color: rgba(168, 85, 247, 0.5); }\n  .vnode-ram { border-color: rgba(34, 197, 94, 0.55); }\n  .vnode-pointers { border-color: rgba(56, 189, 248, 0.55); }\n  .vnode-reuse { border-color: rgba(56, 189, 248, 0.45); }\n  .vnode-mutable { border-color: rgba(34, 197, 94, 0.45); }\n  .vnode-immutable { border-color: rgba(244, 63, 94, 0.45); }\n  .vnode-mgmt { border-color: rgba(99, 102, 241, 0.45); }\n  .vnode-summary { border-color: rgba(250, 204, 21, 0.5); }\n\n  /* Node Header */\n  .py-vfc-node-header {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: 12px;\n    margin-bottom: 12px;\n    padding-bottom: 10px;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.06);\n  }\n  .py-vfc-node-title-group {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n  }\n  .py-vfc-step-num {\n    width: 26px;\n    height: 26px;\n    border-radius: 50%;\n    background: #6366f1;\n    color: #ffffff;\n    font-size: 0.78rem;\n    font-weight: 900;\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    flex-shrink: 0;\n    box-shadow: 0 2px 8px rgba(99, 102, 241, 0.4);\n  }\n  .py-vfc-node-title {\n    font-size: 0.95rem;\n    font-weight: 800;\n    color: #f1f5f9;\n    letter-spacing: -0.01em;\n  }\n  .py-vfc-stage-pill {\n    font-size: 0.68rem;\n    font-weight: 700;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n    padding: 3px 10px;\n    border-radius: 9999px;\n    background: rgba(255, 255, 255, 0.05);\n    border: 1px solid rgba(255, 255, 255, 0.1);\n    color: #94a3b8;\n  }\n\n  /* Node Inner Canvas Box (Dynamic Auto Height) */\n  .py-vfc-canvas-box {\n    background: #060a14;\n    border: 1px solid rgba(255, 255, 255, 0.06);\n    border-radius: 10px;\n    padding: 12px 14px;\n    margin-bottom: 10px;\n  }\n\n  /* Node 1: Code Window */\n  .py-vfc-code-block {\n    font-family: var(--font-mono, monospace);\n    font-size: 0.82rem;\n    color: #e2e8f0;\n    line-height: 1.6;\n    background: transparent;\n    margin: 0;\n  }\n  .py-vfc-code-line {\n    display: flex;\n    gap: 12px;\n  }\n  .py-vfc-line-num {\n    color: #475569;\n    user-select: none;\n    font-size: 0.74rem;\n    width: 16px;\n    text-align: right;\n  }\n  .code-kw { color: #f472b6; }\n  .code-str { color: #facc15; }\n  .code-num { color: #4ade80; }\n  .code-var { color: #38bdf8; }\n\n  /* Node 2: Object Stack (Grid) */\n  .py-vfc-obj-grid {\n    display: grid;\n    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n    gap: 10px;\n  }\n  .py-vfc-obj-item {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: 8px;\n    background: rgba(15, 23, 42, 0.75);\n    border: 1px solid rgba(255, 255, 255, 0.08);\n    border-radius: 8px;\n    padding: 8px 12px;\n  }\n  .py-vfc-val-pill {\n    font-family: var(--font-mono, monospace);\n    font-size: 0.78rem;\n    font-weight: 700;\n    padding: 3px 10px;\n    border-radius: 5px;\n    letter-spacing: 0.02em;\n  }\n  .pill-green {\n    background: rgba(34, 197, 94, 0.18);\n    border: 1px solid #22c55e;\n    color: #4ade80;\n  }\n  .pill-amber {\n    background: rgba(245, 158, 11, 0.18);\n    border: 1px solid #f59e0b;\n    color: #fbbf24;\n  }\n  .pill-purple {\n    background: rgba(168, 85, 247, 0.18);\n    border: 1px solid #a855f7;\n    color: #c084fc;\n  }\n  .py-vfc-obj-label {\n    font-size: 0.72rem;\n    color: #94a3b8;\n    font-weight: 600;\n  }\n\n  /* Node 3: System RAM Architecture */\n  .py-vfc-ram-wrap {\n    border: 1.5px solid #22c55e;\n    border-radius: 10px;\n    background: rgba(34, 197, 94, 0.03);\n    padding: 10px 12px;\n  }\n  .py-vfc-ram-tag {\n    font-size: 0.72rem;\n    font-weight: 800;\n    color: #22c55e;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n    margin-bottom: 8px;\n    display: flex;\n    align-items: center;\n    gap: 6px;\n  }\n  .py-vfc-ram-sections {\n    display: flex;\n    flex-direction: column;\n    gap: 8px;\n  }\n  .py-vfc-code-area {\n    background: rgba(15, 23, 42, 0.85);\n    border: 1px dashed rgba(255, 255, 255, 0.15);\n    border-radius: 6px;\n    padding: 6px 10px;\n    font-size: 0.72rem;\n    color: #94a3b8;\n  }\n  .py-vfc-heap-area {\n    background: rgba(15, 23, 42, 0.95);\n    border: 1px solid rgba(34, 197, 94, 0.35);\n    border-radius: 6px;\n    padding: 8px 10px;\n  }\n  .py-vfc-heap-title {\n    font-size: 0.72rem;\n    font-weight: 800;\n    color: #86efac;\n    margin-bottom: 6px;\n    display: flex;\n    justify-content: space-between;\n  }\n  .py-vfc-heap-table {\n    width: 100%;\n    border-collapse: collapse;\n    font-size: 0.72rem;\n  }\n  .py-vfc-heap-table th {\n    text-align: left;\n    color: #64748b;\n    font-weight: 700;\n    font-size: 0.65rem;\n    text-transform: uppercase;\n    padding: 3px 6px;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.08);\n  }\n  .py-vfc-heap-table td {\n    padding: 5px 6px;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.04);\n  }\n  .py-vfc-heap-table tr:last-child td {\n    border-bottom: none;\n  }\n  .py-vfc-hex {\n    font-family: var(--font-mono, monospace);\n    font-size: 0.72rem;\n    color: #38bdf8;\n    background: rgba(56, 189, 248, 0.1);\n    padding: 2px 6px;\n    border-radius: 4px;\n    display: inline-block;\n  }\n  .py-vfc-type-dim {\n    font-size: 0.68rem;\n    color: #64748b;\n  }\n\n  /* Node 4: Pointer List */\n  .py-vfc-pointer-list {\n    display: flex;\n    flex-direction: column;\n    gap: 7px;\n  }\n  .py-vfc-ptr-row {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: 8px;\n    background: rgba(15, 23, 42, 0.75);\n    border: 1px solid rgba(255, 255, 255, 0.06);\n    border-radius: 8px;\n    padding: 6px 12px;\n  }\n  .py-vfc-var-label {\n    font-family: var(--font-mono, monospace);\n    font-size: 0.78rem;\n    font-weight: 800;\n    color: #38bdf8;\n    background: rgba(56, 189, 248, 0.12);\n    border: 1px solid rgba(56, 189, 248, 0.3);\n    padding: 2px 8px;\n    border-radius: 4px;\n  }\n  .py-vfc-ptr-arrow {\n    color: #818cf8;\n    font-weight: 900;\n    font-size: 0.78rem;\n  }\n\n  /* Node Footer Text */\n  .py-vfc-node-footer {\n    font-size: 0.76rem;\n    color: #94a3b8;\n    line-height: 1.45;\n  }\n  .py-vfc-node-footer strong {\n    color: #e2e8f0;\n  }\n\n  /* ══════ FLOWCHART TRANSITION BRIDGE BANNER ══════ */\n  .py-vfc-bridge {\n    width: 100%;\n    box-sizing: border-box;\n    text-align: center;\n    margin: 0;\n    padding: 14px 18px;\n    background: #0f172a;\n    border: 1px solid rgba(99, 102, 241, 0.35);\n    border-radius: 14px;\n    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);\n    position: relative;\n    z-index: 2;\n  }\n  .py-vfc-bridge-title {\n    font-size: 0.82rem;\n    font-weight: 800;\n    color: #a5b4fc;\n    letter-spacing: 0.06em;\n    text-transform: uppercase;\n    margin-bottom: 8px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    gap: 8px;\n  }\n  .py-vfc-bridge-pills {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    gap: 12px;\n    flex-wrap: wrap;\n    font-size: 0.76rem;\n    font-weight: 700;\n  }\n  .bridge-pill {\n    padding: 4px 12px;\n    border-radius: 9999px;\n    background: rgba(255, 255, 255, 0.05);\n    border: 1px solid rgba(255, 255, 255, 0.1);\n    color: #e2e8f0;\n  }\n  .bridge-sep {\n    color: #6366f1;\n    font-weight: 900;\n  }\n\n  /* Node 5: Fork Diagram */\n  .py-vfc-fork-diagram {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    gap: 12px;\n    width: 100%;\n    padding: 8px 0;\n  }\n  .py-vfc-fork-vars {\n    display: flex;\n    flex-direction: column;\n    gap: 8px;\n  }\n  .py-vfc-fork-arrows {\n    font-size: 1.3rem;\n    color: #818cf8;\n    font-weight: 900;\n    line-height: 1;\n  }\n\n  /* Node 8: Memory Management 3-Card Grid */\n  .py-vfc-cycle-grid {\n    display: grid;\n    grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));\n    gap: 10px;\n  }\n  .py-vfc-cycle-item {\n    display: flex;\n    align-items: flex-start;\n    gap: 10px;\n    background: rgba(15, 23, 42, 0.75);\n    border: 1px solid rgba(255, 255, 255, 0.06);\n    border-radius: 8px;\n    padding: 10px 12px;\n  }\n  .py-vfc-cycle-icon {\n    font-size: 1.15rem;\n    flex-shrink: 0;\n    margin-top: 1px;\n  }\n  .py-vfc-cycle-text {\n    font-size: 0.72rem;\n    line-height: 1.4;\n    color: #cbd5e1;\n  }\n  .py-vfc-cycle-text strong {\n    color: #f8fafc;\n    font-size: 0.76rem;\n  }\n\n  /* Node 9: Summary & Gold Card */\n  .py-vfc-legend-grid {\n    display: grid;\n    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));\n    gap: 8px;\n    margin-bottom: 12px;\n  }\n  .py-vfc-legend-item {\n    font-size: 0.74rem;\n    color: #cbd5e1;\n    display: flex;\n    align-items: center;\n    gap: 8px;\n    background: rgba(15, 23, 42, 0.75);\n    padding: 6px 10px;\n    border-radius: 6px;\n    border: 1px solid rgba(255, 255, 255, 0.06);\n  }\n  .py-vfc-gold-card {\n    background: linear-gradient(135deg, #fef08a 0%, #facc15 100%);\n    border: 1px solid #eab308;\n    border-radius: 10px;\n    padding: 12px 16px;\n    text-align: center;\n    color: #713f12;\n    font-size: 0.84rem;\n    font-weight: 800;\n    box-shadow: 0 4px 16px rgba(250, 204, 21, 0.25);\n  }\n  .py-vfc-footer-ribbon {\n    margin-top: 10px;\n    text-align: center;\n    font-size: 0.78rem;\n    font-weight: 700;\n    color: #94a3b8;\n    letter-spacing: 0.02em;\n  }\n\n  /* ══════════════════════════════════════════════════════════\n     LIGHT MODE THEME ADAPTATION — ACADEMIC TEXTBOOK COLOR SCIENCE\n     BRIGHT, HIGH-VISIBILITY, SATURATED JEWEL TONES (100% CLEAN CONTRAST)\n     ══════════════════════════════════════════════════════════ */\n  [data-theme=\"light\"] .py-vfc-canvas {\n    background: #ffffff !important;\n    background-image: radial-gradient(circle, rgba(37, 99, 235, 0.1) 1.2px, transparent 1.2px) !important;\n    border: 2px solid #cbd5e1 !important;\n    box-shadow: 0 10px 32px rgba(15, 23, 42, 0.06) !important;\n  }\n  [data-theme=\"light\"] .py-vfc-header {\n    border-bottom: 1.5px solid #e2e8f0 !important;\n  }\n  [data-theme=\"light\"] .py-vfc-main-title {\n    color: #0f172a !important;\n  }\n  [data-theme=\"light\"] .py-vfc-sub-title {\n    color: #1d4ed8 !important;\n    font-weight: 800 !important;\n  }\n  [data-theme=\"light\"] .py-vfc-pipeline-stepper,\n  [data-theme=\"light\"] .py-vfc-breadcrumb {\n    background: #ffffff !important;\n    border: 1px solid #e2e8f0 !important;\n    box-shadow: 0 4px 16px -2px rgba(0, 0, 0, 0.05) !important;\n  }\n  [data-theme=\"light\"] .py-vfc-step {\n    background: #f8fafc;\n    border: 1px solid #e2e8f0;\n    color: #334155;\n  }\n  [data-theme=\"light\"] .py-vfc-step:hover {\n    background: #f1f5f9;\n    border-color: #cbd5e1;\n  }\n  [data-theme=\"light\"] .py-vfc-step-idx {\n    background: #e0e7ff;\n    border-color: #c7d2fe;\n    color: #4338ca;\n  }\n  [data-theme=\"light\"] .py-vfc-step-arrow {\n    color: #3b82f6;\n    opacity: 0.9;\n  }\n  [data-theme=\"light\"] .py-vfc-step.step-active {\n    background: linear-gradient(135deg, #eff6ff 0%, #e0e7ff 100%);\n    border: 1px solid #93c5fd;\n    color: #1d4ed8;\n    box-shadow: 0 2px 8px rgba(37, 99, 235, 0.12);\n  }\n  [data-theme=\"light\"] .py-vfc-step.step-active .py-vfc-step-idx {\n    background: #dbeafe;\n    border-color: #93c5fd;\n    color: #1d4ed8;\n  }\n  [data-theme=\"light\"] .py-vfc-breadcrumb-sep {\n    color: #2563eb !important;\n    font-weight: 900 !important;\n  }\n  [data-theme=\"light\"] .py-vfc-breadcrumb span.highlight {\n    color: #1d4ed8 !important;\n    font-weight: 900 !important;\n  }\n  \n\n  /* Nodes in Light Mode */\n  [data-theme=\"light\"] .py-vfc-node {\n    background: #ffffff !important;\n    border: 1.5px solid #cbd5e1 !important;\n    box-shadow: 0 4px 16px rgba(15, 23, 42, 0.05) !important;\n    position: relative !important;\n    z-index: 2 !important;\n  }\n  [data-theme=\"light\"] .py-vfc-node:hover {\n    box-shadow: 0 10px 24px rgba(37, 99, 235, 0.12) !important;\n  }\n  [data-theme=\"light\"] .vnode-code { border-color: #3b82f6 !important; }\n  [data-theme=\"light\"] .vnode-objects { border-color: #a855f7 !important; }\n  [data-theme=\"light\"] .vnode-ram { border-color: #16a34a !important; }\n  [data-theme=\"light\"] .vnode-pointers { border-color: #0284c7 !important; }\n  [data-theme=\"light\"] .vnode-reuse { border-color: #0284c7 !important; }\n  [data-theme=\"light\"] .vnode-mutable { border-color: #16a34a !important; }\n  [data-theme=\"light\"] .vnode-immutable { border-color: #e11d48 !important; }\n  [data-theme=\"light\"] .vnode-mgmt { border-color: #6366f1 !important; }\n  [data-theme=\"light\"] .vnode-summary { border-color: #ca8a04 !important; }\n\n  [data-theme=\"light\"] .py-vfc-node-header {\n    border-bottom: 1.5px solid #f1f5f9 !important;\n  }\n  [data-theme=\"light\"] .py-vfc-node-title {\n    color: #0f172a !important;\n    font-weight: 900 !important;\n  }\n  [data-theme=\"light\"] .py-vfc-stage-pill {\n    background: #eff6ff !important;\n    border: 1.5px solid #bfdbfe !important;\n    color: #1d4ed8 !important;\n    font-weight: 800 !important;\n  }\n\n  /* Flowchart Arrow Connectors in Light Mode */\n  [data-theme=\"light\"] .py-vfc-stem {\n    background: linear-gradient(180deg, #60a5fa, #1d4ed8) !important;\n    width: 2px !important;\n  }\n  [data-theme=\"light\"] .py-vfc-arrow-badge {\n    background: #ffffff !important;\n    border: 2px solid #2563eb !important;\n    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25) !important;\n  }\n  [data-theme=\"light\"] .py-vfc-arrow-badge svg path {\n    stroke: #1d4ed8 !important;\n    stroke-width: 3 !important;\n  }\n\n  /* Inner Canvas Box in Light Mode */\n  [data-theme=\"light\"] .py-vfc-canvas-box {\n    background: #f8fafc !important;\n    border: 1.5px solid #e2e8f0 !important;\n  }\n\n  /* Syntax Highlighting in Light Mode — Bright & High Contrast */\n  [data-theme=\"light\"] .py-vfc-code-block {\n    color: #0f172a !important;\n    font-weight: 600 !important;\n  }\n  [data-theme=\"light\"] .py-vfc-code-block .code-var {\n    color: #0284c7 !important;\n    font-weight: 700 !important;\n  }\n  [data-theme=\"light\"] .py-vfc-code-block .code-num {\n    color: #15803d !important;\n    font-weight: 800 !important;\n  }\n  [data-theme=\"light\"] .py-vfc-code-block .code-str {\n    color: #c2410c !important;\n    font-weight: 700 !important;\n  }\n  [data-theme=\"light\"] .py-vfc-code-block .code-kw {\n    color: #be123c !important;\n    font-weight: 800 !important;\n  }\n  [data-theme=\"light\"] .py-vfc-line-num {\n    color: #64748b !important;\n    font-weight: 700 !important;\n  }\n\n  /* Object Pills in Light Mode — Saturated High Visibility */\n  [data-theme=\"light\"] .py-vfc-obj-item {\n    background: #ffffff !important;\n    border: 1.5px solid #cbd5e1 !important;\n    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03) !important;\n  }\n  [data-theme=\"light\"] .pill-green {\n    background: #f0fdf4 !important;\n    border: 1.5px solid #86efac !important;\n    color: #15803d !important;\n    font-weight: 800 !important;\n  }\n  [data-theme=\"light\"] .pill-amber {\n    background: #fefce8 !important;\n    border: 1.5px solid #fde047 !important;\n    color: #b45309 !important;\n    font-weight: 800 !important;\n  }\n  [data-theme=\"light\"] .pill-purple {\n    background: #faf5ff !important;\n    border: 1.5px solid #d8b4fe !important;\n    color: #7e22ce !important;\n    font-weight: 800 !important;\n  }\n  [data-theme=\"light\"] .py-vfc-obj-label {\n    color: #0f172a !important;\n    font-weight: 700 !important;\n  }\n\n  /* System RAM in Light Mode */\n  [data-theme=\"light\"] .py-vfc-ram-wrap {\n    background: #f0fdf4 !important;\n    border: 2px solid #22c55e !important;\n  }\n  [data-theme=\"light\"] .py-vfc-ram-tag {\n    color: #15803d !important;\n    font-weight: 900 !important;\n  }\n  [data-theme=\"light\"] .py-vfc-code-area {\n    background: #ffffff !important;\n    border: 1.5px dashed #cbd5e1 !important;\n    color: #0f172a !important;\n    font-weight: 600 !important;\n  }\n  [data-theme=\"light\"] .py-vfc-heap-area {\n    background: #ffffff !important;\n    border: 1.5px solid #86efac !important;\n  }\n  [data-theme=\"light\"] .py-vfc-heap-title {\n    color: #15803d !important;\n    font-weight: 900 !important;\n  }\n  [data-theme=\"light\"] .py-vfc-heap-table th {\n    color: #0f172a !important;\n    font-weight: 800 !important;\n    border-bottom: 2px solid #cbd5e1 !important;\n  }\n  [data-theme=\"light\"] .py-vfc-heap-table td {\n    color: #0f172a !important;\n    border-bottom: 1px solid #e2e8f0 !important;\n  }\n\n  /* Monospace Hex Address Pills in Light Mode — Bright Cobalt */\n  [data-theme=\"light\"] .py-vfc-hex {\n    background: #eff6ff !important;\n    border: 1.5px solid #93c5fd !important;\n    color: #1d4ed8 !important;\n    font-weight: 800 !important;\n  }\n  [data-theme=\"light\"] .py-vfc-type-dim {\n    color: #334155 !important;\n    font-weight: 700 !important;\n  }\n\n  /* Pointer Rows in Light Mode */\n  [data-theme=\"light\"] .py-vfc-ptr-row {\n    background: #ffffff !important;\n    border: 1.5px solid #cbd5e1 !important;\n    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03) !important;\n  }\n  [data-theme=\"light\"] .py-vfc-var-label {\n    background: #eff6ff !important;\n    border: 1.5px solid #93c5fd !important;\n    color: #1d4ed8 !important;\n    font-weight: 800 !important;\n  }\n  [data-theme=\"light\"] .py-vfc-ptr-arrow {\n    color: #2563eb !important;\n    font-weight: 900 !important;\n  }\n\n  /* Flowchart Milestone Bridge in Light Mode */\n  [data-theme=\"light\"] .py-vfc-bridge {\n    background: #f8fafc !important;\n    border: 2px solid #6366f1 !important;\n    box-shadow: 0 4px 16px rgba(99, 102, 241, 0.12) !important;\n    position: relative !important;\n    z-index: 2 !important;\n    margin: 0 !important;\n  }\n  [data-theme=\"light\"] .py-vfc-bridge-title {\n    color: #4338ca !important;\n    font-weight: 900 !important;\n  }\n  [data-theme=\"light\"] .bridge-pill {\n    background: #ffffff !important;\n    border: 1.5px solid #cbd5e1 !important;\n    color: #0f172a !important;\n    font-weight: 800 !important;\n  }\n  [data-theme=\"light\"] .bridge-sep {\n    color: #4f46e5 !important;\n    font-weight: 900 !important;\n  }\n\n  /* Fork Diagram in Light Mode */\n  [data-theme=\"light\"] .py-vfc-fork-arrows {\n    color: #2563eb !important;\n  }\n\n  /* Memory Management 3-Card Grid in Light Mode */\n  [data-theme=\"light\"] .py-vfc-cycle-item {\n    background: #ffffff !important;\n    border: 1.5px solid #cbd5e1 !important;\n    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03) !important;\n  }\n  [data-theme=\"light\"] .py-vfc-cycle-text {\n    color: #1e293b !important;\n    font-size: 0.74rem !important;\n    font-weight: 500 !important;\n  }\n  [data-theme=\"light\"] .py-vfc-cycle-text strong {\n    color: #0f172a !important;\n    font-weight: 900 !important;\n    font-size: 0.80rem !important;\n  }\n\n  /* Summary Legend in Light Mode */\n  [data-theme=\"light\"] .py-vfc-legend-item {\n    background: #ffffff !important;\n    border: 1.5px solid #cbd5e1 !important;\n    color: #0f172a !important;\n    font-weight: 700 !important;\n  }\n  [data-theme=\"light\"] .py-vfc-gold-card {\n    background: linear-gradient(135deg, #fef08a 0%, #facc15 100%) !important;\n    border: 2px solid #ca8a04 !important;\n    color: #713f12 !important;\n    font-weight: 900 !important;\n    font-size: 0.88rem !important;\n    box-shadow: 0 4px 16px rgba(202, 138, 4, 0.25) !important;\n  }\n  [data-theme=\"light\"] .py-vfc-footer-ribbon {\n    color: #1e293b !important;\n    font-weight: 800 !important;\n  }\n\n  /* Node Footers in Light Mode — Crisp High Legibility */\n  [data-theme=\"light\"] .py-vfc-node-footer {\n    color: #1e293b !important;\n    font-weight: 500 !important;\n    line-height: 1.55 !important;\n  }\n  [data-theme=\"light\"] .py-vfc-node-footer strong {\n    color: #0f172a !important;\n    font-weight: 900 !important;\n  }\n  [data-theme=\"light\"] .py-vfc-node-footer code {\n    background: #eff6ff !important;\n    color: #1d4ed8 !important;\n    border: 1px solid #bfdbfe !important;\n    padding: 1px 6px !important;\n    border-radius: 4px !important;\n    font-weight: 800 !important;\n  }\n\n\n\n\n  /* ══════════════════════════════════════════════════════════\n     PRODUCTION DATA TRAP CARD (SHARED MUTABLE REFERENCES)\n     ══════════════════════════════════════════════════════════ */\n  .py-analyst-trap-card {\n    background: linear-gradient(145deg, rgba(20, 27, 45, 0.95) 0%, rgba(13, 19, 33, 0.98) 100%);\n    border: 1.5px solid rgba(244, 63, 94, 0.4);\n    border-radius: 12px;\n    padding: 16px 18px;\n    margin-top: 14px;\n    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);\n    width: 100%;\n    box-sizing: border-box;\n  }\n  .py-trap-header {\n    display: flex;\n    align-items: center;\n    gap: 12px;\n    margin-bottom: 10px;\n    flex-wrap: wrap;\n  }\n  .py-trap-badge {\n    background: rgba(244, 63, 94, 0.2);\n    border: 1px solid #f43f5e;\n    color: #fb7185;\n    font-family: var(--font-mono, monospace);\n    font-size: 0.68rem;\n    font-weight: 800;\n    padding: 2px 8px;\n    border-radius: 4px;\n    letter-spacing: 0.05em;\n  }\n  .py-trap-title {\n    margin: 0;\n    font-size: 0.88rem;\n    font-weight: 800;\n    color: #f1f5f9;\n    letter-spacing: -0.01em;\n  }\n  .py-trap-text {\n    font-size: 0.76rem;\n    color: #cbd5e1;\n    line-height: 1.5;\n    margin: 0 0 12px 0;\n  }\n  .py-trap-text strong {\n    color: #f8fafc;\n  }\n  .py-trap-code-grid {\n    display: grid;\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n    gap: 14px;\n  }\n  @media (max-width: 640px) {\n    .py-trap-code-grid {\n      grid-template-columns: 1fr;\n    }\n  }\n  .py-trap-box {\n    border-radius: 8px;\n    padding: 10px 12px;\n  }\n  .trap-danger {\n    background: rgba(244, 63, 94, 0.08);\n    border: 1px solid rgba(244, 63, 94, 0.35);\n  }\n  .trap-solution {\n    background: rgba(34, 197, 94, 0.08);\n    border: 1px solid rgba(34, 197, 94, 0.35);\n  }\n  .py-trap-box-label {\n    font-size: 0.72rem;\n    font-weight: 800;\n    margin-bottom: 6px;\n  }\n  .trap-danger .py-trap-box-label { color: #fb7185; }\n  .trap-solution .py-trap-box-label { color: #4ade80; }\n  .py-trap-box pre {\n    margin: 0;\n    background: transparent;\n    font-family: var(--font-mono, monospace);\n    font-size: 0.76rem;\n    color: #e2e8f0;\n    line-height: 1.5;\n  }\n\n  /* Live Terminal Tip in Flowchart */\n  .py-fc-live-tip {\n    margin-top: 10px;\n    background: rgba(56, 189, 248, 0.08);\n    border: 1px dashed rgba(56, 189, 248, 0.4);\n    border-radius: 8px;\n    padding: 8px 12px;\n    display: flex;\n    align-items: flex-start;\n    gap: 8px;\n  }\n  .py-fc-tip-icon {\n    font-size: 1rem;\n    flex-shrink: 0;\n    margin-top: 1px;\n  }\n  .py-fc-tip-text {\n    font-size: 0.72rem;\n    line-height: 1.45;\n    color: #cbd5e1;\n  }\n  .py-fc-tip-text strong {\n    color: #38bdf8;\n  }\n  .py-fc-tip-text code {\n    font-family: var(--font-mono, monospace);\n    background: rgba(0, 0, 0, 0.4);\n    color: #4ade80;\n    padding: 1px 5px;\n    border-radius: 4px;\n    font-size: 0.70rem;\n  }\n\n  /* Mobile Swipe Pill for Master Reference Table */\n  .py-table-mobile-hint {\n    display: none;\n    align-items: center;\n    justify-content: flex-end;\n    gap: 6px;\n    font-size: 0.70rem;\n    font-weight: 700;\n    color: #38bdf8;\n    margin-bottom: 6px;\n  }\n  @media (max-width: 768px) {\n    .py-table-mobile-hint {\n      display: flex;\n    }\n  }\n\n  /* Interactive Hover Linkage for Pointer Rows */\n  .py-vfc-ptr-row {\n    transition: all 0.2s ease !important;\n    cursor: default;\n  }\n  .py-vfc-ptr-row:hover {\n    transform: translateX(4px);\n    border-color: rgba(56, 189, 248, 0.5) !important;\n    background: rgba(15, 23, 42, 0.95) !important;\n    box-shadow: 0 4px 14px rgba(56, 189, 248, 0.15) !important;\n  }\n  .py-vfc-ptr-row:hover .py-vfc-ptr-arrow {\n    transform: scale(1.15);\n    color: #38bdf8 !important;\n  }\n\n  /* ═══ LIGHT MODE THEME ADAPTATION FOR NEW ELEMENTS ═══ */\n  [data-theme=\"light\"] .py-analyst-trap-card {\n    background: #ffffff !important;\n    border: 1.5px solid #fecdd3 !important;\n    box-shadow: 0 4px 16px rgba(225, 29, 72, 0.06) !important;\n    width: 100% !important;\n    box-sizing: border-box !important;\n  }\n  [data-theme=\"light\"] .py-trap-badge {\n    background: #ffe4e6 !important;\n    border-color: #fda4af !important;\n    color: #be123c !important;\n  }\n  [data-theme=\"light\"] .py-trap-title {\n    color: #0f172a !important;\n  }\n  [data-theme=\"light\"] .py-trap-text {\n    color: #1e293b !important;\n  }\n  [data-theme=\"light\"] .py-trap-text strong {\n    color: #0f172a !important;\n  }\n  [data-theme=\"light\"] .trap-danger {\n    background: #fff1f2 !important;\n    border-color: #fecdd3 !important;\n  }\n  [data-theme=\"light\"] .trap-danger .py-trap-box-label {\n    color: #be123c !important;\n  }\n  [data-theme=\"light\"] .trap-solution {\n    background: #f0fdf4 !important;\n    border-color: #bbf7d0 !important;\n  }\n  [data-theme=\"light\"] .trap-solution .py-trap-box-label {\n    color: #15803d !important;\n  }\n  [data-theme=\"light\"] .py-trap-box pre {\n    color: #0f172a !important;\n  }\n  [data-theme=\"light\"] .py-trap-box pre .code-comment {\n    color: #047857 !important;\n  }\n  [data-theme=\"light\"] .py-fc-live-tip {\n    background: #f0f9ff !important;\n    border-color: #93c5fd !important;\n  }\n  [data-theme=\"light\"] .py-fc-tip-text {\n    color: #1e293b !important;\n  }\n  [data-theme=\"light\"] .py-fc-tip-text strong {\n    color: #0284c7 !important;\n  }\n  [data-theme=\"light\"] .py-fc-tip-text code {\n    background: #e0f2fe !important;\n    color: #0369a1 !important;\n    border: 1px solid #bae6fd !important;\n  }\n  [data-theme=\"light\"] .py-table-mobile-hint {\n    color: #0284c7;\n  }\n  [data-theme=\"light\"] .py-vfc-ptr-row:hover {\n    background: #f0f9ff !important;\n    border-color: #38bdf8 !important;\n    box-shadow: 0 4px 12px rgba(2, 132, 199, 0.12) !important;\n  }\n  [data-theme=\"light\"] .py-vfc-ptr-row:hover .py-vfc-ptr-arrow {\n    color: #0284c7 !important;\n  }\n\n  /* ═══════════════════════════════════════════════════════════════\n     THEORY NARRATION PLAYBACK ISOLATION & SPOTLIGHTS (SQL Day 02 Parity)\n     ═══════════════════════════════════════════════════════════════ */\n  .stunning-section-entry {\n    animation: stunningSectionPop 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards !important;\n    will-change: opacity, transform !important;\n  }\n  @keyframes stunningSectionPop {\n    0% {\n      opacity: 0;\n      transform: translateY(16px) scale(0.98);\n      filter: blur(3px);\n    }\n    60% {\n      opacity: 0.95;\n      transform: translateY(-2px) scale(1.005);\n      filter: blur(0px);\n    }\n    100% {\n      opacity: 1;\n      transform: translateY(0) scale(1);\n      filter: blur(0px);\n    }\n  }\n  .instant-display {\n    animation: none !important;\n    transition: none !important;\n    opacity: 1 !important;\n    transform: none !important;\n    filter: none !important;\n  }\n\n  /* Playback Active: Inactive sections are dimmed and non-distracting */\n  .playback-active .slide-section.section-hidden {\n    opacity: 0.18 !important;\n    filter: blur(0.4px) !important;\n    pointer-events: none !important;\n    transition: opacity 0.35s ease, filter 0.35s ease !important;\n  }\n\n  /* Card Spotlight Glow */\n  .py-sp-card.card-active-spotlight,\n  .py-sp-ai-banner.card-active-spotlight,\n  .py-mut-panel.card-active-spotlight,\n  .py-analyst-trap-card.card-active-spotlight,\n  .py-vfc-node.card-active-spotlight,\n  .card-active-spotlight {\n    transform: scale(1.025) translateY(-3px) !important;\n    border-color: #38bdf8 !important;\n    background: rgba(14, 165, 233, 0.12) !important;\n    box-shadow: 0 10px 28px -4px rgba(56, 189, 248, 0.35), 0 0 0 2px rgba(56, 189, 248, 0.7) !important;\n    z-index: 5 !important;\n    transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1) !important;\n  }\n\n  [data-theme=\"light\"] .py-sp-card.card-active-spotlight,\n  [data-theme=\"light\"] .py-sp-ai-banner.card-active-spotlight,\n  [data-theme=\"light\"] .py-mut-panel.card-active-spotlight,\n  [data-theme=\"light\"] .py-analyst-trap-card.card-active-spotlight,\n  [data-theme=\"light\"] .py-vfc-node.card-active-spotlight,\n  [data-theme=\"light\"] .card-active-spotlight {\n    border-color: #0284c7 !important;\n    background: #f0f9ff !important;\n    box-shadow: 0 10px 24px -4px rgba(2, 132, 199, 0.28), 0 0 0 2px #0284c7 !important;\n  }\n\n  /* Table Row Active Spotlight */\n  .py-matrix-table tr.row-active-spotlight,\n  .py-master-ref-table tr.row-active-spotlight,\n  table tr.row-active-spotlight {\n    background: rgba(59, 130, 246, 0.18) !important;\n    border-left: 4px solid #38bdf8 !important;\n    box-shadow: inset 0 0 12px rgba(56, 189, 248, 0.15) !important;\n    transition: background 0.25s ease, border-color 0.25s ease !important;\n  }\n  .py-matrix-table tr.row-active-spotlight td,\n  .py-master-ref-table tr.row-active-spotlight td,\n  table tr.row-active-spotlight td {\n    color: #f8fafc !important;\n    font-weight: 600 !important;\n  }\n\n  [data-theme=\"light\"] .py-matrix-table tr.row-active-spotlight,\n  [data-theme=\"light\"] .py-master-ref-table tr.row-active-spotlight,\n  [data-theme=\"light\"] table tr.row-active-spotlight {\n    background: rgba(2, 132, 199, 0.12) !important;\n    border-left: 4px solid #0284c7 !important;\n  }\n  [data-theme=\"light\"] .py-matrix-table tr.row-active-spotlight td,\n  [data-theme=\"light\"] .py-master-ref-table tr.row-active-spotlight td,\n  [data-theme=\"light\"] table tr.row-active-spotlight td {\n    color: #0f172a !important;\n  }\n\n  /* ══════════════════════════════════════════════════════════\n     WORLD-CLASS INTERACTIVE & VISUAL ENHANCEMENTS (10/10 UX)\n     ══════════════════════════════════════════════════════════ */\n\n  /* 1. Dynamic Table Row Spotlight & Hover FX */\n  .py-master-ref-table tbody tr,\n  .py-matrix-table tbody tr {\n    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1) !important;\n    cursor: pointer;\n  }\n  .py-master-ref-table tbody tr:hover,\n  .py-matrix-table tbody tr:hover {\n    background: rgba(56, 189, 248, 0.08) !important;\n    transform: translateX(4px);\n    box-shadow: inset 3px 0 0 #38bdf8 !important;\n  }\n  [data-theme=\"light\"] .py-master-ref-table tbody tr:hover,\n  [data-theme=\"light\"] .py-matrix-table tbody tr:hover {\n    background: #f0f9ff !important;\n    box-shadow: inset 3px 0 0 #0284c7 !important;\n  }\n\n  /* 2. Top Gradient Accent Lines & Hover Micro-Elevation */\n  .py-sp-card,\n  .py-mut-showcase,\n  .py-matrix-showcase,\n  .py-analyst-trap-card,\n  .py-vfc-canvas {\n    position: relative !important;\n    overflow: hidden !important;\n    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease !important;\n  }\n  .py-sp-card::before,\n  .py-mut-showcase::before,\n  .py-matrix-showcase::before,\n  .py-analyst-trap-card::before,\n  .py-vfc-canvas::before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    height: 3px;\n    background: linear-gradient(90deg, #38bdf8 0%, #818cf8 50%, #34d399 100%);\n    opacity: 0.85;\n    z-index: 2;\n  }\n  .py-sp-card:hover {\n    transform: translateY(-3px) !important;\n    box-shadow: 0 12px 28px -6px rgba(0, 0, 0, 0.4), 0 0 16px rgba(56, 189, 248, 0.15) !important;\n    border-color: rgba(56, 189, 248, 0.4) !important;\n  }\n  [data-theme=\"light\"] .py-sp-card:hover {\n    transform: translateY(-3px) !important;\n    box-shadow: 0 12px 24px -4px rgba(0, 0, 0, 0.08), 0 0 12px rgba(2, 132, 199, 0.12) !important;\n    border-color: #0284c7 !important;\n  }\n\n  /* 3. Code Card Micro-Glow & Typography Polish */\n  .py-trap-box pre,\n  .py-code-box {\n    transition: border-color 0.3s ease, box-shadow 0.3s ease !important;\n  }\n  .py-trap-box pre:hover,\n  .py-code-box:hover {\n    border-color: rgba(56, 189, 248, 0.4) !important;\n    box-shadow: 0 4px 16px rgba(56, 189, 248, 0.12) !important;\n  }\n  [data-theme=\"light\"] .py-trap-box pre:hover,\n  [data-theme=\"light\"] .py-code-box:hover {\n    border-color: #0284c7 !important;\n    box-shadow: 0 4px 16px rgba(2, 132, 199, 0.12) !important;\n  }\n\n  /* Heading & Block Active Spotlight */\n  .heading-box-wrap.narration-spotlight-active,\n  .narration-spotlight-active {\n    border-color: #38bdf8 !important;\n    box-shadow: 0 0 16px rgba(56, 189, 248, 0.3) !important;\n    transition: all 0.3s ease !important;\n  }\n\n\n  /* ═════════════════════════════════════════════════════════════════════\n     DAY 01 10/10 ELEVATION: ZERO INLINE STYLES & PEDAGOGICAL COMPONENTS\n     ═════════════════════════════════════════════════════════════════════ */\n  .col-w-130 { width: 130px !important; }\n  .col-w-230 { width: 230px !important; }\n  .col-w-210 { width: 210px !important; }\n  .py-badge-compact { padding: 1px 6px !important; }\n\n  /* Step Color Modifiers */\n  .step-num-purple { background: #a855f7 !important; }\n  .step-num-green { background: #16a34a !important; }\n  .step-num-sky { background: #0284c7 !important; }\n  .step-num-rose { background: #e11d48 !important; }\n  .step-num-indigo { background: #4f46e5 !important; }\n  .step-num-amber { background: #ca8a04 !important; }\n\n  /* Memory Diagram Helpers */\n  .py-vfc-header-meta.meta-center { justify-content: center !important; }\n  .py-vfc-heap-sub { font-size: 0.65rem !important; opacity: 0.75 !important; }\n  .py-vfc-status-cell { color: #94a3b8 !important; font-size: 0.68rem !important; }\n  [data-theme=\"light\"] .py-vfc-status-cell { color: #64748b !important; }\n\n  .py-vfc-snippet-lead {\n    font-family: var(--font-mono, monospace) !important;\n    font-size: 0.84rem !important;\n    color: #38bdf8 !important;\n    margin-bottom: 8px !important;\n  }\n  [data-theme=\"light\"] .py-vfc-snippet-lead { color: #0284c7 !important; }\n\n  .py-vfc-snippet-lead-mono {\n    font-family: var(--font-mono, monospace) !important;\n    font-size: 0.80rem !important;\n    color: #e2e8f0 !important;\n    margin-bottom: 6px !important;\n  }\n  [data-theme=\"light\"] .py-vfc-snippet-lead-mono { color: #0f172a !important; }\n\n  .py-vfc-expl-text {\n    font-size: 0.74rem !important;\n    color: #94a3b8 !important;\n    line-height: 1.45 !important;\n    margin-bottom: 10px !important;\n  }\n  [data-theme=\"light\"] .py-vfc-expl-text { color: #475569 !important; }\n\n  .py-vfc-expl-text-sm {\n    font-size: 0.74rem !important;\n    color: #94a3b8 !important;\n    line-height: 1.45 !important;\n    margin-bottom: 8px !important;\n  }\n  [data-theme=\"light\"] .py-vfc-expl-text-sm { color: #475569 !important; }\n\n  .py-vfc-success-badge { color: #4ade80 !important; font-weight: 700 !important; }\n  [data-theme=\"light\"] .py-vfc-success-badge { color: #16a34a !important; }\n\n  .var-label-purple { border-color: #a855f7 !important; color: #c084fc !important; }\n  [data-theme=\"light\"] .var-label-purple { border-color: #9333ea !important; color: #7e22ce !important; }\n\n  .py-vfc-pill-center { text-align: center !important; }\n  .py-vfc-pill-lg { font-size: 0.84rem !important; padding: 4px 12px !important; }\n  .py-vfc-pill-md { font-size: 0.80rem !important; padding: 4px 12px !important; }\n  .py-vfc-hex-shared { font-size: 0.68rem !important; margin-top: 4px !important; display: inline-block !important; }\n  .py-vfc-hex-new {\n    font-size: 0.68rem !important;\n    margin-top: 4px !important;\n    display: inline-block !important;\n    color: #f43f5e !important;\n    border-color: rgba(244, 63, 94, 0.4) !important;\n  }\n  [data-theme=\"light\"] .py-vfc-hex-new {\n    color: #e11d48 !important;\n    border-color: rgba(225, 29, 72, 0.4) !important;\n  }\n  .py-vfc-ptr-row {\n    display: flex !important;\n    align-items: center !important;\n    justify-content: center !important;\n    gap: 10px !important;\n    padding: 4px 0 !important;\n  }\n\n  /* 🧠 SENIOR SPOTLIGHT & RECALL HOOK */\n  .py-recall-hook {\n    background: linear-gradient(135deg, rgba(56, 189, 248, 0.08) 0%, rgba(168, 85, 247, 0.08) 100%) !important;\n    border: 1px solid rgba(56, 189, 248, 0.25) !important;\n    border-left: 4px solid #38bdf8 !important;\n    border-radius: 12px !important;\n    padding: 16px 20px !important;\n    margin: 22px 0 12px 0 !important;\n    display: flex !important;\n    gap: 14px !important;\n    align-items: flex-start !important;\n    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25) !important;\n  }\n  .py-recall-icon { font-size: 1.4rem !important; line-height: 1 !important; flex-shrink: 0 !important; }\n  .py-recall-body { flex: 1 !important; }\n  .py-recall-header { display: flex !important; align-items: center !important; gap: 8px !important; margin-bottom: 6px !important; }\n  .py-recall-title {\n    font-family: 'JetBrains Mono', monospace !important;\n    font-size: 0.74rem !important;\n    font-weight: 800 !important;\n    text-transform: uppercase !important;\n    letter-spacing: 0.08em !important;\n    color: #38bdf8 !important;\n  }\n  .py-recall-tag {\n    font-size: 0.65rem !important;\n    padding: 2px 8px !important;\n    border-radius: 4px !important;\n    background: rgba(56, 189, 248, 0.15) !important;\n    color: #bae6fd !important;\n    font-weight: 700 !important;\n  }\n  .py-recall-text { font-size: 0.84rem !important; line-height: 1.55 !important; color: #cbd5e1 !important; margin: 0 !important; }\n  .py-recall-text strong { color: #f8fafc !important; }\n  .py-recall-text code {\n    font-family: 'JetBrains Mono', monospace !important;\n    background: rgba(0, 0, 0, 0.35) !important;\n    padding: 2px 6px !important;\n    border-radius: 4px !important;\n    color: #38bdf8 !important;\n    font-size: 0.80rem !important;\n  }\n\n  [data-theme=\"light\"] .py-recall-hook {\n    background: linear-gradient(135deg, #f0f9ff 0%, #f5f3ff 100%) !important;\n    border-color: rgba(14, 165, 233, 0.3) !important;\n    border-left-color: #0284c7 !important;\n    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06) !important;\n  }\n  [data-theme=\"light\"] .py-recall-title { color: #0284c7 !important; }\n  [data-theme=\"light\"] .py-recall-tag { background: #e0f2fe !important; color: #0369a1 !important; }\n  [data-theme=\"light\"] .py-recall-text { color: #334155 !important; }\n  [data-theme=\"light\"] .py-recall-text strong { color: #0f172a !important; }\n  [data-theme=\"light\"] .py-recall-text code { background: #e0f2fe !important; color: #0369a1 !important; }\n\n  /* ⚠️ ANTI-PATTERN DIAGNOSTIC CARD */\n  .anti-pattern-card {\n    background: linear-gradient(135deg, rgba(244, 63, 94, 0.08) 0%, rgba(15, 23, 42, 0.85) 100%) !important;\n    border: 1px solid rgba(244, 63, 94, 0.3) !important;\n    border-left: 4px solid #f43f5e !important;\n    border-radius: 12px !important;\n    padding: 18px 20px !important;\n    margin: 22px 0 14px 0 !important;\n    box-shadow: 0 8px 24px -4px rgba(0, 0, 0, 0.35) !important;\n  }\n  .anti-pattern-header {\n    display: flex !important;\n    align-items: center !important;\n    gap: 10px !important;\n    margin-bottom: 12px !important;\n  }\n  .anti-pattern-icon {\n    width: 32px !important;\n    height: 32px !important;\n    border-radius: 8px !important;\n    background: rgba(244, 63, 94, 0.15) !important;\n    border: 1px solid rgba(244, 63, 94, 0.35) !important;\n    display: flex !important;\n    align-items: center !important;\n    justify-content: center !important;\n    font-size: 1.1rem !important;\n    color: #fb7185 !important;\n    flex-shrink: 0 !important;\n  }\n  .anti-pattern-title {\n    font-family: 'JetBrains Mono', monospace !important;\n    font-size: 0.78rem !important;\n    font-weight: 800 !important;\n    text-transform: uppercase !important;\n    letter-spacing: 0.08em !important;\n    color: #fb7185 !important;\n  }\n  .anti-pattern-tag {\n    font-size: 0.65rem !important;\n    padding: 2px 8px !important;\n    border-radius: 4px !important;\n    background: rgba(244, 63, 94, 0.2) !important;\n    color: #fca5a5 !important;\n    font-weight: 700 !important;\n  }\n  .anti-pattern-grid {\n    display: grid !important;\n    grid-template-columns: 1fr 1fr !important;\n    gap: 14px !important;\n  }\n  @media (max-width: 768px) {\n    .anti-pattern-grid { grid-template-columns: 1fr !important; }\n  }\n  .ap-side-box {\n    padding: 12px 14px !important;\n    border-radius: 8px !important;\n    font-size: 0.82rem !important;\n    line-height: 1.5 !important;\n  }\n  .ap-bad-box {\n    background: rgba(244, 63, 94, 0.08) !important;\n    border: 1px solid rgba(244, 63, 94, 0.25) !important;\n    color: #fecdd3 !important;\n  }\n  .ap-good-box {\n    background: rgba(16, 185, 129, 0.08) !important;\n    border: 1px solid rgba(16, 185, 129, 0.25) !important;\n    color: #a7f3d0 !important;\n  }\n  .ap-box-label {\n    font-family: 'JetBrains Mono', monospace !important;\n    font-size: 0.70rem !important;\n    font-weight: 800 !important;\n    text-transform: uppercase !important;\n    letter-spacing: 0.06em !important;\n    margin-bottom: 6px !important;\n    display: flex !important;\n    align-items: center !important;\n    gap: 6px !important;\n  }\n  .ap-bad-box .ap-box-label { color: #f87171 !important; }\n  .ap-good-box .ap-box-label { color: #34d399 !important; }\n  .ap-side-box pre {\n    margin: 6px 0 0 0 !important;\n    padding: 8px 10px !important;\n    border-radius: 6px !important;\n    background: rgba(0, 0, 0, 0.35) !important;\n    font-family: 'JetBrains Mono', monospace !important;\n    font-size: 0.78rem !important;\n  }\n\n  [data-theme=\"light\"] .anti-pattern-card {\n    background: linear-gradient(135deg, #fff1f2 0%, #ffffff 100%) !important;\n    border-color: rgba(244, 63, 94, 0.3) !important;\n    border-left-color: #e11d48 !important;\n    box-shadow: 0 8px 24px -4px rgba(244, 63, 94, 0.1) !important;\n  }\n  [data-theme=\"light\"] .anti-pattern-icon { background: #fee2e2 !important; color: #e11d48 !important; }\n  [data-theme=\"light\"] .anti-pattern-title { color: #e11d48 !important; }\n  [data-theme=\"light\"] .anti-pattern-tag { background: #ffe4e6 !important; color: #be123c !important; }\n  [data-theme=\"light\"] .ap-bad-box { background: #fff1f2 !important; border-color: #fecdd3 !important; color: #9f1239 !important; }\n  [data-theme=\"light\"] .ap-good-box { background: #f0fdf4 !important; border-color: #bbf7d0 !important; color: #166534 !important; }\n  [data-theme=\"light\"] .ap-side-box pre { background: #ffffff !important; border: 1px solid #e2e8f0 !important; }\n\n  /* 💼 PRO INTERVIEW SPOTLIGHT CARD */\n  .pro-interview-card {\n    background: linear-gradient(135deg, rgba(168, 85, 247, 0.08) 0%, rgba(15, 23, 42, 0.85) 100%) !important;\n    border: 1px solid rgba(168, 85, 247, 0.3) !important;\n    border-left: 4px solid #a855f7 !important;\n    border-radius: 12px !important;\n    padding: 18px 20px !important;\n    margin: 22px 0 14px 0 !important;\n    box-shadow: 0 8px 24px -4px rgba(0, 0, 0, 0.35) !important;\n  }\n  .pro-interview-header {\n    display: flex !important;\n    align-items: center !important;\n    gap: 10px !important;\n    margin-bottom: 10px !important;\n  }\n  .pro-interview-icon {\n    width: 32px !important;\n    height: 32px !important;\n    border-radius: 8px !important;\n    background: rgba(168, 85, 247, 0.15) !important;\n    border: 1px solid rgba(168, 85, 247, 0.35) !important;\n    display: flex !important;\n    align-items: center !important;\n    justify-content: center !important;\n    font-size: 1.1rem !important;\n    color: #c084fc !important;\n    flex-shrink: 0 !important;\n  }\n  .pro-interview-title {\n    font-family: 'JetBrains Mono', monospace !important;\n    font-size: 0.78rem !important;\n    font-weight: 800 !important;\n    text-transform: uppercase !important;\n    letter-spacing: 0.08em !important;\n    color: #c084fc !important;\n  }\n  .pro-interview-tag {\n    font-size: 0.65rem !important;\n    padding: 2px 8px !important;\n    border-radius: 4px !important;\n    background: rgba(168, 85, 247, 0.2) !important;\n    color: #e9d5ff !important;\n    font-weight: 700 !important;\n  }\n  .pro-interview-body {\n    font-size: 0.84rem !important;\n    line-height: 1.55 !important;\n    color: #cbd5e1 !important;\n  }\n  .pro-interview-body strong { color: #f8fafc !important; }\n  .pro-interview-body code {\n    font-family: 'JetBrains Mono', monospace !important;\n    background: rgba(0, 0, 0, 0.35) !important;\n    padding: 2px 6px !important;\n    border-radius: 4px !important;\n    color: #c084fc !important;\n    font-size: 0.80rem !important;\n  }\n\n  [data-theme=\"light\"] .pro-interview-card {\n    background: linear-gradient(135deg, #faf5ff 0%, #ffffff 100%) !important;\n    border-color: rgba(168, 85, 247, 0.3) !important;\n    border-left-color: #9333ea !important;\n    box-shadow: 0 8px 24px -4px rgba(168, 85, 247, 0.1) !important;\n  }\n  [data-theme=\"light\"] .pro-interview-icon { background: #f3e8ff !important; color: #9333ea !important; }\n  [data-theme=\"light\"] .pro-interview-title { color: #9333ea !important; }\n  [data-theme=\"light\"] .pro-interview-tag { background: #f3e8ff !important; color: #7e22ce !important; }\n  [data-theme=\"light\"] .pro-interview-body { color: #334155 !important; }\n  [data-theme=\"light\"] .pro-interview-body strong { color: #0f172a !important; }\n  [data-theme=\"light\"] .pro-interview-body code { background: #f3e8ff !important; color: #7e22ce !important; }\n\n  /* 💎 MASTER KEY NOTES GLASSMORPHIC CARD */\n  .py-keynotes-card {\n    background: linear-gradient(135deg, rgba(15, 23, 42, 0.85) 0%, rgba(30, 41, 59, 0.65) 100%) !important;\n    backdrop-filter: blur(12px) !important;\n    -webkit-backdrop-filter: blur(12px) !important;\n    border: 1px solid rgba(56, 189, 248, 0.28) !important;\n    border-left: 4px solid #38bdf8 !important;\n    border-radius: 12px !important;\n    padding: 18px 22px !important;\n    margin: 24px 0 14px 0 !important;\n    box-shadow: 0 8px 24px -4px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.06) !important;\n  }\n  .py-keynotes-header {\n    display: flex !important;\n    align-items: center !important;\n    gap: 10px !important;\n    margin-bottom: 12px !important;\n  }\n  .py-keynotes-icon-wrap {\n    width: 34px !important;\n    height: 34px !important;\n    border-radius: 9px !important;\n    background: rgba(56, 189, 248, 0.12) !important;\n    border: 1px solid rgba(56, 189, 248, 0.28) !important;\n    display: flex !important;\n    align-items: center !important;\n    justify-content: center !important;\n    font-size: 1.15rem !important;\n    flex-shrink: 0 !important;\n    box-shadow: 0 0 12px rgba(56, 189, 248, 0.2) !important;\n  }\n  .py-keynotes-title {\n    font-size: 0.82rem !important;\n    font-weight: 800 !important;\n    text-transform: uppercase !important;\n    letter-spacing: 0.08em !important;\n    color: #38bdf8 !important;\n  }\n  .py-keynotes-tag {\n    font-size: 0.68rem !important;\n    padding: 2px 10px !important;\n    border-radius: 12px !important;\n    background: rgba(56, 189, 248, 0.14) !important;\n    border: 1px solid rgba(56, 189, 248, 0.28) !important;\n    color: #7dd3fc !important;\n    font-weight: 700 !important;\n  }\n  .py-keynotes-list {\n    margin: 0 !important;\n    padding-left: 1.2rem !important;\n    list-style-type: disc !important;\n    font-size: 0.84rem !important;\n    color: #cbd5e1 !important;\n    line-height: 1.65 !important;\n  }\n  .py-keynotes-list li { margin-bottom: 6px !important; }\n  .py-keynotes-list li strong { color: #f8fafc !important; }\n  .py-keynotes-list li code {\n    font-family: 'JetBrains Mono', monospace !important;\n    background: rgba(56, 189, 248, 0.1) !important;\n    border: 1px solid rgba(56, 189, 248, 0.25) !important;\n    color: #38bdf8 !important;\n    padding: 2px 6px !important;\n    border-radius: 4px !important;\n    font-size: 0.80rem !important;\n  }\n\n  [data-theme=\"light\"] .py-keynotes-card {\n    background: linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%) !important;\n    border: 1px solid rgba(14, 165, 233, 0.3) !important;\n    border-left: 4px solid #0284c7 !important;\n    box-shadow: 0 8px 24px -4px rgba(14, 165, 233, 0.12), inset 0 1px 0 #ffffff !important;\n  }\n  [data-theme=\"light\"] .py-keynotes-icon-wrap {\n    background: #e0f2fe !important;\n    border-color: #bae6fd !important;\n    box-shadow: 0 0 12px rgba(14, 165, 233, 0.18) !important;\n  }\n  [data-theme=\"light\"] .py-keynotes-title { color: #0284c7 !important; }\n  [data-theme=\"light\"] .py-keynotes-tag {\n    background: #e0f2fe !important;\n    border-color: #bae6fd !important;\n    color: #0369a1 !important;\n  }\n  [data-theme=\"light\"] .py-keynotes-list { color: #334155 !important; }\n  [data-theme=\"light\"] .py-keynotes-list li strong { color: #0f172a !important; }\n  [data-theme=\"light\"] .py-keynotes-list li code {\n    background: #e0f2fe !important;\n    border-color: #7dd3fc !important;\n    color: #0369a1 !important;\n  }\n\n\n\r\n  /* ═════════════════════════════════════════════════════════════════════\r\n     UNIFORM VERTICAL RHYTHM & SPACING SYSTEM (100% Consistent Across Day 02)\r\n     ═════════════════════════════════════════════════════════════════════ */\r\n  .slide-section {\r\n    margin-top: 36px !important;\r\n    margin-bottom: 0 !important;\r\n  }\r\n  .slide-section:first-child {\r\n    margin-top: 8px !important;\r\n  }\r\n  .slide-section-title.heading-box-wrap {\r\n    margin: 0 0 14px 0 !important;\r\n  }\r\n  .section-intro-text {\r\n    margin: 0 0 14px 0 !important;\r\n    font-size: 0.92rem !important;\r\n    line-height: 1.6 !important;\r\n  }\r\n  .topic-subcard {\r\n    margin: 14px 0 0 0 !important;\r\n    position: relative !important;\r\n  }\r\n  .topic-subcard + .topic-subcard {\r\n    margin-top: 16px !important;\r\n  }\r\n  .subcard-header-with-audio {\r\n    display: flex !important;\r\n    align-items: center !important;\r\n    gap: 8px !important;\r\n    margin: 0 0 10px 0 !important;\r\n    padding: 0 !important;\r\n  }\r\n  .subcard-header-title {\r\n    margin: 0 !important;\r\n    font-size: 0.92rem !important;\r\n    font-weight: 700 !important;\r\n    color: #38bdf8 !important;\r\n    letter-spacing: -0.01em !important;\r\n  }\r\n  [data-theme=\"light\"] .subcard-header-title {\r\n    color: #0284c7 !important;\r\n  }\r\n  .code-block-container {\r\n    margin: 0 !important;\r\n    padding: 0 !important;\r\n    display: flex !important;\r\n    flex-direction: column !important;\r\n    gap: 12px !important;\r\n  }\r\n  .code-subblock {\r\n    margin: 0 !important;\r\n  }\r\n  .interview-box {\r\n    margin-top: 14px !important;\r\n    margin-bottom: 0 !important;\r\n  }\r\n\r\n  /* Table Card Header: Clean non-floating header that stays attached to its card */\r\n  .table-header-wrap {\r\n    position: relative !important;\r\n    top: auto !important;\r\n    left: auto !important;\r\n    z-index: 1 !important;\r\n    background-color: #0d1527 !important;\r\n    display: flex !important;\r\n    justify-content: space-between !important;\r\n    align-items: center !important;\r\n    padding: 10px 14px !important;\r\n    margin: 0 !important;\r\n    border-radius: 8px 8px 0 0 !important;\r\n    border: 1px solid rgba(255, 255, 255, 0.08) !important;\r\n    border-bottom: 1px solid rgba(255, 255, 255, 0.06) !important;\r\n  }\r\n  /* Explicitly prevent any vertical floating or sticking for headers during scroll */\r\n  .table-header-wrap,\r\n  .arith-sticky-table thead,\r\n  .arith-sticky-table th,\r\n  .precedence-table thead,\r\n  .precedence-table th,\r\n  .anti-pattern-table thead,\r\n  .anti-pattern-table th {\r\n    top: auto !important;\r\n  }\r\n  .table-header-title {\r\n    margin: 0 !important;\r\n    font-size: 0.92rem !important;\r\n    font-weight: 700 !important;\r\n    color: #f8fafc !important;\r\n    letter-spacing: -0.01em !important;\r\n  }\r\n  [data-theme=\"light\"] .table-header-wrap {\r\n    background-color: #ffffff !important;\r\n    border-color: #e2e8f0 !important;\r\n  }\r\n  [data-theme=\"light\"] .table-header-title {\r\n    color: #0f172a !important;\r\n  }\r\n  .table-header-left {\r\n    display: flex !important;\r\n    align-items: center !important;\r\n    gap: 8px !important;\r\n    flex: 1 !important;\r\n  }\r\n  .table-search-box {\r\n    position: relative !important;\r\n    display: flex !important;\r\n    align-items: center !important;\r\n    background: rgba(0, 0, 0, 0.4) !important;\r\n    border: 1px solid rgba(255, 255, 255, 0.12) !important;\r\n    border-radius: 6px !important;\r\n    padding: 3px 8px 3px 26px !important;\r\n    transition: all 0.2s ease !important;\r\n  }\r\n  .table-search-box:focus-within {\r\n    border-color: #38bdf8 !important;\r\n    box-shadow: 0 0 12px rgba(56, 189, 248, 0.28) !important;\r\n    background: rgba(0, 0, 0, 0.6) !important;\r\n  }\r\n  .table-search-icon {\r\n    position: absolute !important;\r\n    left: 8px !important;\r\n    color: #64748b !important;\r\n    pointer-events: none !important;\r\n  }\r\n  .table-search-input {\r\n    background: transparent !important;\r\n    border: none !important;\r\n    outline: none !important;\r\n    font-family: 'JetBrains Mono', monospace !important;\r\n    font-size: 0.72rem !important;\r\n    color: #f1f5f9 !important;\r\n    width: 130px !important;\r\n    transition: width 0.2s ease !important;\r\n  }\r\n  .table-search-input:focus {\r\n    width: 175px !important;\r\n  }\r\n  .table-search-input::placeholder {\r\n    color: #64748b !important;\r\n    font-size: 0.70rem !important;\r\n  }\r\n  .table-scroll-hint {\r\n    display: none !important;\r\n  }\r\n  .db-mock-table-wrap::-webkit-scrollbar {\r\n    height: 6px !important;\r\n  }\r\n  .db-mock-table-wrap::-webkit-scrollbar-track {\r\n    background: rgba(0, 0, 0, 0.25) !important;\r\n    border-radius: 4px !important;\r\n  }\r\n  .db-mock-table-wrap::-webkit-scrollbar-thumb {\r\n    background: rgba(56, 189, 248, 0.35) !important;\r\n    border-radius: 4px !important;\r\n  }\r\n  .db-mock-table-wrap::-webkit-scrollbar-thumb:hover {\r\n    background: #38bdf8 !important;\r\n  }\r\n  .db-table-mock td code,\r\n  .db-table-mock .prec-ops-wrap code {\r\n    cursor: pointer !important;\r\n    transition: all 0.15s ease !important;\r\n  }\r\n  .db-table-mock td code:hover,\r\n  .db-table-mock .prec-ops-wrap code:hover {\r\n    transform: translateY(-1px) !important;\r\n    border-color: #38bdf8 !important;\r\n    box-shadow: 0 2px 8px rgba(56, 189, 248, 0.3) !important;\r\n  }\r\n  .table-code-copied {\r\n    background: rgba(16, 185, 129, 0.3) !important;\r\n    border-color: #10b981 !important;\r\n    color: #34d399 !important;\r\n    box-shadow: 0 0 10px rgba(16, 185, 129, 0.45) !important;\r\n  }\r\n  .table-empty-row td {\r\n    text-align: center !important;\r\n    padding: 24px 16px !important;\r\n    color: #94a3b8 !important;\r\n    font-style: italic !important;\r\n    font-size: 0.82rem !important;\r\n    background: rgba(0, 0, 0, 0.2) !important;\r\n  }\r\n  .db-table-mock tbody tr:nth-child(even) td {\r\n    background-color: rgba(255, 255, 255, 0.015);\r\n  }\r\n  [data-theme=\"light\"] .table-search-box {\r\n    background: #f8fafc !important;\r\n    border-color: #cbd5e1 !important;\r\n  }\r\n  [data-theme=\"light\"] .table-search-box:focus-within {\r\n    border-color: #0284c7 !important;\r\n    background: #ffffff !important;\r\n    box-shadow: 0 0 10px rgba(2, 132, 199, 0.18) !important;\r\n  }\r\n  [data-theme=\"light\"] .table-search-input {\r\n    color: #0f172a !important;\r\n  }\r\n  [data-theme=\"light\"] .table-search-icon {\r\n    color: #94a3b8 !important;\r\n  }\r\n  [data-theme=\"light\"] .table-scroll-hint {\r\n    display: none !important;\r\n  }\r\n  [data-theme=\"light\"] .db-mock-table-wrap::-webkit-scrollbar-track {\r\n    background: #f1f5f9 !important;\r\n  }\r\n  [data-theme=\"light\"] .db-mock-table-wrap::-webkit-scrollbar-thumb {\r\n    background: rgba(2, 132, 199, 0.35) !important;\r\n  }\r\n  [data-theme=\"light\"] .table-empty-row td {\r\n    background: #f8fafc !important;\r\n    color: #64748b !important;\r\n  }\r\n  [data-theme=\"light\"] .db-table-mock tbody tr:nth-child(even) td {\r\n    background-color: #fafbfd !important;\r\n  }\r\n  .db-mock-table-wrap {\r\n    margin-top: 0 !important;\r\n    border-top-left-radius: 0 !important;\r\n    border-top-right-radius: 0 !important;\r\n    position: relative !important;\r\n    overflow-x: auto !important;\r\n    -webkit-overflow-scrolling: touch !important;\r\n  }\r\n  .db-table-mock.arith-sticky-table {\r\n    border-collapse: separate !important;\r\n    border-spacing: 0 !important;\r\n    min-width: 680px !important;\r\n    width: 100% !important;\r\n    overflow: visible !important;\r\n    margin: 0 !important;\r\n  }\r\n  .arith-sticky-table,\r\n  .arith-sticky-table th,\r\n  .arith-sticky-table td {\r\n    box-sizing: border-box !important;\r\n  }\r\n  /* Column 1: Operator - Frozen Horizontally ONLY (NO vertical float) */\r\n  .arith-sticky-table th:nth-child(1),\r\n  .arith-sticky-table td:nth-child(1) {\r\n    position: sticky !important;\r\n    left: 0 !important;\r\n    top: auto !important;\r\n    z-index: 10 !important;\r\n    width: 80px !important;\r\n    min-width: 80px !important;\r\n    max-width: 80px !important;\r\n    box-sizing: border-box !important;\r\n    background-color: #0d1527 !important;\r\n    border-right: 1px solid rgba(255, 255, 255, 0.08) !important;\r\n    text-align: center !important;\r\n    padding: 8px 6px !important;\r\n  }\r\n  .arith-sticky-table th:nth-child(1) {\r\n    background-color: #131d35 !important;\r\n    z-index: 11 !important;\r\n  }\r\n  .arith-sticky-table td:nth-child(1) code {\r\n    display: inline-flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    min-width: 36px;\r\n    height: 28px;\r\n    padding: 0 8px;\r\n    font-family: 'JetBrains Mono', monospace;\r\n    font-weight: 700;\r\n    font-size: 0.85rem;\r\n    background: rgba(56, 189, 248, 0.12);\r\n    border: 1px solid rgba(56, 189, 248, 0.3);\r\n    border-radius: 6px;\r\n    color: #38bdf8;\r\n  }\r\n  /* Column 2: Name - Frozen Horizontally ONLY (NO vertical float) */\r\n  .arith-sticky-table th:nth-child(2),\r\n  .arith-sticky-table td:nth-child(2) {\r\n    position: sticky !important;\r\n    left: 80px !important;\r\n    top: auto !important;\r\n    z-index: 10 !important;\r\n    width: 140px !important;\r\n    min-width: 140px !important;\r\n    max-width: 140px !important;\r\n    box-sizing: border-box !important;\r\n    background-color: #0d1527 !important;\r\n    border-right: 2px solid rgba(56, 189, 248, 0.35) !important;\r\n    box-shadow: 4px 0 10px -2px rgba(0, 0, 0, 0.45) !important;\r\n    font-weight: 600 !important;\r\n    padding: 8px 12px !important;\r\n  }\r\n  .arith-sticky-table th:nth-child(2) {\r\n    background-color: #131d35 !important;\r\n    z-index: 11 !important;\r\n  }\r\n  .arith-sticky-table tbody tr:hover td:nth-child(1),\r\n  .arith-sticky-table tbody tr:hover td:nth-child(2) {\r\n    background-color: #162038 !important;\r\n  }\r\n  /* Light mode for sticky table */\r\n  [data-theme=\"light\"] .arith-sticky-table th:nth-child(1),\r\n  [data-theme=\"light\"] .arith-sticky-table th:nth-child(2) {\r\n    background-color: #f1f5f9 !important;\r\n    border-right-color: #cbd5e1 !important;\r\n  }\r\n  [data-theme=\"light\"] .arith-sticky-table td:nth-child(1),\r\n  [data-theme=\"light\"] .arith-sticky-table td:nth-child(2) {\r\n    background-color: #ffffff !important;\r\n    border-right-color: #e2e8f0 !important;\r\n  }\r\n  [data-theme=\"light\"] .arith-sticky-table td:nth-child(1) code {\r\n    background: #e0f2fe;\r\n    border-color: #7dd3fc;\r\n    color: #0284c7;\r\n  }\r\n  [data-theme=\"light\"] .arith-sticky-table td:nth-child(2) {\r\n    border-right: 2px solid rgba(14, 165, 233, 0.4) !important;\r\n    box-shadow: 4px 0 10px -2px rgba(0, 0, 0, 0.08) !important;\r\n  }\r\n  [data-theme=\"light\"] .arith-sticky-table tbody tr:hover td:nth-child(1),\r\n  [data-theme=\"light\"] .arith-sticky-table tbody tr:hover td:nth-child(2) {\r\n    background-color: #f8fafc !important;\r\n  }\r\n\r\n  /* ═════════════════════════════════════════════════════════════════════\r\n     SECTION 08: OPERATOR PRECEDENCE HIERARCHY TABLE (Frozen Col 1 & 2 - Zero Overlap)\r\n     ═════════════════════════════════════════════════════════════════════ */\r\n  .db-table-mock.arith-sticky-table.precedence-table,\r\n  .db-mock-table-wrap .db-table-mock.precedence-table {\r\n    border-collapse: separate !important;\r\n    border-spacing: 0 !important;\r\n    min-width: 920px !important;\r\n    width: 100% !important;\r\n    overflow: visible !important;\r\n    margin: 0 !important;\r\n  }\r\n  .precedence-table,\r\n  .precedence-table th,\r\n  .precedence-table td {\r\n    box-sizing: border-box !important;\r\n  }\r\n  .precedence-table th,\r\n  .precedence-table td {\r\n    padding: 10px 14px !important;\r\n    vertical-align: middle !important;\r\n    border-bottom: 1px solid rgba(255, 255, 255, 0.06) !important;\r\n    font-size: 0.84rem !important;\r\n    line-height: 1.45 !important;\r\n    box-sizing: border-box !important;\r\n  }\r\n  .precedence-table th {\r\n    background-color: #131d35 !important;\r\n    color: #94a3b8 !important;\r\n    font-weight: 700 !important;\r\n    text-transform: uppercase !important;\r\n    letter-spacing: 0.04em !important;\r\n    font-size: 0.74rem !important;\r\n    border-bottom: 2px solid rgba(56, 189, 248, 0.35) !important;\r\n    white-space: nowrap !important;\r\n  }\r\n  /* Precedence Column 1: Precedence Level - Frozen horizontally at left 0 */\r\n  .precedence-table th:nth-child(1),\r\n  .precedence-table td:nth-child(1),\r\n  .arith-sticky-table.precedence-table th:nth-child(1),\r\n  .arith-sticky-table.precedence-table td:nth-child(1) {\r\n    position: -webkit-sticky !important;\r\n    position: sticky !important;\r\n    left: 0 !important;\r\n    top: auto !important;\r\n    z-index: 10 !important;\r\n    width: 160px !important;\r\n    min-width: 160px !important;\r\n    max-width: 160px !important;\r\n    box-sizing: border-box !important;\r\n    background-color: #0d1527 !important;\r\n    border-right: 1px solid rgba(255, 255, 255, 0.08) !important;\r\n    text-align: left !important;\r\n    padding: 10px 14px !important;\r\n  }\r\n  .precedence-table th:nth-child(1),\r\n  .arith-sticky-table.precedence-table th:nth-child(1) {\r\n    background-color: #131d35 !important;\r\n    z-index: 12 !important;\r\n  }\r\n  /* Precedence Column 2: Operators - Frozen horizontally at left 160px */\r\n  .precedence-table th:nth-child(2),\r\n  .precedence-table td:nth-child(2),\r\n  .arith-sticky-table.precedence-table th:nth-child(2),\r\n  .arith-sticky-table.precedence-table td:nth-child(2) {\r\n    position: -webkit-sticky !important;\r\n    position: sticky !important;\r\n    left: 160px !important;\r\n    top: auto !important;\r\n    z-index: 10 !important;\r\n    width: 200px !important;\r\n    min-width: 200px !important;\r\n    max-width: 200px !important;\r\n    box-sizing: border-box !important;\r\n    background-color: #0d1527 !important;\r\n    border-right: 2px solid rgba(56, 189, 248, 0.35) !important;\r\n    box-shadow: 4px 0 10px -2px rgba(0, 0, 0, 0.45) !important;\r\n    padding: 10px 14px !important;\r\n  }\r\n  .precedence-table th:nth-child(2),\r\n  .arith-sticky-table.precedence-table th:nth-child(2) {\r\n    background-color: #131d35 !important;\r\n    z-index: 12 !important;\r\n  }\r\n  .precedence-table th:nth-child(3),\r\n  .precedence-table td:nth-child(3),\r\n  .arith-sticky-table.precedence-table th:nth-child(3),\r\n  .arith-sticky-table.precedence-table td:nth-child(3) {\r\n    width: 150px !important;\r\n    min-width: 140px !important;\r\n    text-align: center !important;\r\n    position: relative !important;\r\n    z-index: 1 !important;\r\n  }\r\n  .precedence-table th:nth-child(4),\r\n  .precedence-table td:nth-child(4),\r\n  .arith-sticky-table.precedence-table th:nth-child(4),\r\n  .arith-sticky-table.precedence-table td:nth-child(4) {\r\n    min-width: 320px !important;\r\n    position: relative !important;\r\n    z-index: 1 !important;\r\n  }\r\n  .precedence-table tbody tr:hover td,\r\n  .arith-sticky-table.precedence-table tbody tr:hover td {\r\n    background-color: rgba(56, 189, 248, 0.05) !important;\r\n  }\r\n  .precedence-table tbody tr:hover td:nth-child(1),\r\n  .precedence-table tbody tr:hover td:nth-child(2),\r\n  .arith-sticky-table.precedence-table tbody tr:hover td:nth-child(1),\r\n  .arith-sticky-table.precedence-table tbody tr:hover td:nth-child(2) {\r\n    background-color: #162038 !important;\r\n  }\r\n  .prec-tier-badge {\r\n    display: inline-block;\r\n    padding: 3px 8px;\r\n    font-family: 'JetBrains Mono', monospace;\r\n    font-size: 0.75rem;\r\n    font-weight: 700;\r\n    border-radius: 5px;\r\n    background: rgba(255, 255, 255, 0.05);\r\n    border: 1px solid rgba(255, 255, 255, 0.1);\r\n    color: #f1f5f9;\r\n    white-space: nowrap;\r\n  }\r\n  .prec-tier-1 {\r\n    background: rgba(244, 63, 94, 0.15);\r\n    border-color: rgba(244, 63, 94, 0.35);\r\n    color: #fb7185;\r\n  }\r\n  .prec-tier-2 {\r\n    background: rgba(245, 158, 11, 0.18);\r\n    border-color: rgba(245, 158, 11, 0.4);\r\n    color: #fbbf24;\r\n  }\r\n  .prec-tier-15 {\r\n    background: rgba(148, 163, 184, 0.12);\r\n    border-color: rgba(148, 163, 184, 0.3);\r\n    color: #94a3b8;\r\n  }\r\n  .prec-ops-wrap {\r\n    display: flex;\r\n    flex-wrap: wrap;\r\n    gap: 4px;\r\n    align-items: center;\r\n  }\r\n  .prec-ops-wrap code {\r\n    display: inline-flex;\r\n    align-items: center;\r\n    padding: 2px 7px;\r\n    font-family: 'JetBrains Mono', monospace;\r\n    font-size: 0.8rem;\r\n    font-weight: 600;\r\n    border-radius: 4px;\r\n    background: rgba(56, 189, 248, 0.1);\r\n    border: 1px solid rgba(56, 189, 248, 0.25);\r\n    color: #38bdf8;\r\n  }\r\n  .prec-op-highlight {\r\n    background: rgba(245, 158, 11, 0.2) !important;\r\n    border-color: rgba(245, 158, 11, 0.45) !important;\r\n    color: #fcd34d !important;\r\n    font-weight: 800 !important;\r\n  }\r\n  .prec-assoc-tag {\r\n    display: inline-block;\r\n    padding: 3px 9px;\r\n    border-radius: 5px;\r\n    font-size: 0.72rem;\r\n    font-weight: 700;\r\n    white-space: nowrap;\r\n  }\r\n  .prec-assoc-ltr {\r\n    background: rgba(56, 189, 248, 0.1);\r\n    color: #7dd3fc;\r\n    border: 1px solid rgba(56, 189, 248, 0.25);\r\n  }\r\n  .prec-assoc-rtl {\r\n    background: rgba(245, 158, 11, 0.15);\r\n    color: #fbbf24;\r\n    border: 1px solid rgba(245, 158, 11, 0.35);\r\n  }\r\n\r\n  /* Light mode for Precedence Table */\r\n  [data-theme=\"light\"] .precedence-table th,\r\n  [data-theme=\"light\"] .arith-sticky-table.precedence-table th {\r\n    background-color: #f1f5f9 !important;\r\n    color: #475569 !important;\r\n    border-bottom-color: #cbd5e1 !important;\r\n  }\r\n  [data-theme=\"light\"] .precedence-table td,\r\n  [data-theme=\"light\"] .arith-sticky-table.precedence-table td {\r\n    border-bottom-color: #f1f5f9 !important;\r\n    color: #1e293b !important;\r\n  }\r\n  [data-theme=\"light\"] .precedence-table tbody tr:hover td,\r\n  [data-theme=\"light\"] .arith-sticky-table.precedence-table tbody tr:hover td {\r\n    background-color: #f8fafc !important;\r\n  }\r\n  [data-theme=\"light\"] .precedence-table th:nth-child(1),\r\n  [data-theme=\"light\"] .precedence-table th:nth-child(2),\r\n  [data-theme=\"light\"] .arith-sticky-table.precedence-table th:nth-child(1),\r\n  [data-theme=\"light\"] .arith-sticky-table.precedence-table th:nth-child(2) {\r\n    background-color: #f1f5f9 !important;\r\n    border-right-color: #cbd5e1 !important;\r\n  }\r\n  [data-theme=\"light\"] .precedence-table td:nth-child(1),\r\n  [data-theme=\"light\"] .precedence-table td:nth-child(2),\r\n  [data-theme=\"light\"] .arith-sticky-table.precedence-table td:nth-child(1),\r\n  [data-theme=\"light\"] .arith-sticky-table.precedence-table td:nth-child(2) {\r\n    background-color: #ffffff !important;\r\n    border-right-color: #e2e8f0 !important;\r\n  }\r\n  [data-theme=\"light\"] .precedence-table td:nth-child(2),\r\n  [data-theme=\"light\"] .arith-sticky-table.precedence-table td:nth-child(2) {\r\n    border-right: 2px solid rgba(14, 165, 233, 0.4) !important;\r\n    box-shadow: 4px 0 10px -2px rgba(0, 0, 0, 0.08) !important;\r\n  }\r\n  [data-theme=\"light\"] .precedence-table tbody tr:hover td:nth-child(1),\r\n  [data-theme=\"light\"] .precedence-table tbody tr:hover td:nth-child(2),\r\n  [data-theme=\"light\"] .arith-sticky-table.precedence-table tbody tr:hover td:nth-child(1),\r\n  [data-theme=\"light\"] .arith-sticky-table.precedence-table tbody tr:hover td:nth-child(2) {\r\n    background-color: #f8fafc !important;\r\n  }\r\n  [data-theme=\"light\"] .prec-tier-badge {\r\n    background: #f1f5f9;\r\n    border-color: #cbd5e1;\r\n    color: #0f172a;\r\n  }\r\n  [data-theme=\"light\"] .prec-tier-1 {\r\n    background: #ffe4e6;\r\n    border-color: #fecdd3;\r\n    color: #e11d48;\r\n  }\r\n  [data-theme=\"light\"] .prec-tier-2 {\r\n    background: #fef3c7;\r\n    border-color: #fde68a;\r\n    color: #d97706;\r\n  }\r\n  [data-theme=\"light\"] .prec-ops-wrap code {\r\n    background: #e0f2fe;\r\n    border-color: #bae6fd;\r\n    color: #0284c7;\r\n  }\r\n  [data-theme=\"light\"] .prec-assoc-ltr {\r\n    background: #f0fdf4;\r\n    color: #16a34a;\r\n    border-color: #bbf7d0;\r\n  }\r\n  [data-theme=\"light\"] .prec-assoc-rtl {\r\n    background: #fffbeb;\r\n    color: #b45309;\r\n    border-color: #fde68a;\r\n  }\r\n\r\n  /* ═════════════════════════════════════════════════════════════════════\r\n     SECTION 09: MASTER ANTI-PATTERN REVIEW TABLE (Frozen Col 1 & 2 - Zero Overlap)\r\n     ═════════════════════════════════════════════════════════════════════ */\r\n  .db-table-mock.arith-sticky-table.anti-pattern-table,\r\n  .db-mock-table-wrap .db-table-mock.anti-pattern-table {\r\n    border-collapse: separate !important;\r\n    border-spacing: 0 !important;\r\n    min-width: 960px !important;\r\n    width: 100% !important;\r\n    overflow: visible !important;\r\n    margin: 0 !important;\r\n  }\r\n  .anti-pattern-table,\r\n  .anti-pattern-table th,\r\n  .anti-pattern-table td {\r\n    box-sizing: border-box !important;\r\n  }\r\n  .anti-pattern-table th,\r\n  .anti-pattern-table td {\r\n    padding: 10px 14px !important;\r\n    vertical-align: middle !important;\r\n    border-bottom: 1px solid rgba(255, 255, 255, 0.06) !important;\r\n    font-size: 0.84rem !important;\r\n    line-height: 1.45 !important;\r\n    box-sizing: border-box !important;\r\n  }\r\n  .anti-pattern-table th {\r\n    background-color: #131d35 !important;\r\n    color: #94a3b8 !important;\r\n    font-weight: 700 !important;\r\n    text-transform: uppercase !important;\r\n    letter-spacing: 0.04em !important;\r\n    font-size: 0.74rem !important;\r\n    border-bottom: 2px solid rgba(244, 63, 94, 0.35) !important;\r\n    white-space: nowrap !important;\r\n  }\r\n  /* Anti-Pattern Column 1: Buggy Code Pattern - Only this column is frozen horizontally */\r\n  .anti-pattern-table th:nth-child(1),\r\n  .anti-pattern-table td:nth-child(1),\r\n  .arith-sticky-table.anti-pattern-table th:nth-child(1),\r\n  .arith-sticky-table.anti-pattern-table td:nth-child(1) {\r\n    position: -webkit-sticky !important;\r\n    position: sticky !important;\r\n    left: 0 !important;\r\n    top: auto !important;\r\n    z-index: 10 !important;\r\n    width: 220px !important;\r\n    min-width: 220px !important;\r\n    max-width: 220px !important;\r\n    box-sizing: border-box !important;\r\n    background-color: #0d1527 !important;\r\n    border-right: 2px solid rgba(244, 63, 94, 0.4) !important;\r\n    box-shadow: 4px 0 10px -2px rgba(0, 0, 0, 0.45) !important;\r\n    text-align: left !important;\r\n    padding: 10px 14px !important;\r\n  }\r\n  .anti-pattern-table th:nth-child(1),\r\n  .arith-sticky-table.anti-pattern-table th:nth-child(1) {\r\n    background-color: #131d35 !important;\r\n    z-index: 12 !important;\r\n  }\r\n  /* Override code block styling inside column 1 */\r\n  .anti-pattern-table td:nth-child(1) code,\r\n  .arith-sticky-table.anti-pattern-table td:nth-child(1) code {\r\n    display: inline-block !important;\r\n    min-width: 0 !important;\r\n    height: auto !important;\r\n    padding: 3px 8px !important;\r\n    background: rgba(244, 63, 94, 0.12) !important;\r\n    border: 1px solid rgba(244, 63, 94, 0.3) !important;\r\n    color: #fca5a5 !important;\r\n    white-space: normal !important;\r\n  }\r\n  /* Anti-Pattern Column 2: Runtime Result - Scrolls normally with content (NOT frozen) */\r\n  .anti-pattern-table th:nth-child(2),\r\n  .anti-pattern-table td:nth-child(2),\r\n  .arith-sticky-table.anti-pattern-table th:nth-child(2),\r\n  .arith-sticky-table.anti-pattern-table td:nth-child(2) {\r\n    position: relative !important;\r\n    left: auto !important;\r\n    top: auto !important;\r\n    z-index: 1 !important;\r\n    width: 200px !important;\r\n    min-width: 180px !important;\r\n    box-sizing: border-box !important;\r\n    border-right: 1px solid rgba(255, 255, 255, 0.06) !important;\r\n    padding: 10px 14px !important;\r\n  }\r\n  .anti-pattern-table th:nth-child(3),\r\n  .anti-pattern-table td:nth-child(3),\r\n  .arith-sticky-table.anti-pattern-table th:nth-child(3),\r\n  .arith-sticky-table.anti-pattern-table td:nth-child(3) {\r\n    min-width: 260px !important;\r\n    position: relative !important;\r\n    z-index: 1 !important;\r\n  }\r\n  .anti-pattern-table th:nth-child(4),\r\n  .anti-pattern-table td:nth-child(4),\r\n  .arith-sticky-table.anti-pattern-table th:nth-child(4),\r\n  .arith-sticky-table.anti-pattern-table td:nth-child(4) {\r\n    width: 230px !important;\r\n    min-width: 210px !important;\r\n    position: relative !important;\r\n    z-index: 1 !important;\r\n  }\r\n  .anti-pattern-table tbody tr:hover td,\r\n  .arith-sticky-table.anti-pattern-table tbody tr:hover td {\r\n    background-color: rgba(244, 63, 94, 0.04) !important;\r\n  }\r\n  .anti-pattern-table tbody tr:hover td:nth-child(1),\r\n  .arith-sticky-table.anti-pattern-table tbody tr:hover td:nth-child(1) {\r\n    background-color: #162038 !important;\r\n  }\r\n  .ap-code-bug {\r\n    display: inline-block;\r\n    padding: 3px 8px;\r\n    font-family: 'JetBrains Mono', monospace;\r\n    font-size: 0.8rem;\r\n    font-weight: 600;\r\n    border-radius: 5px;\r\n    background: rgba(244, 63, 94, 0.12);\r\n    border: 1px solid rgba(244, 63, 94, 0.3);\r\n    color: #fca5a5;\r\n    word-break: break-word;\r\n  }\r\n  .ap-result-bad {\r\n    color: #f87171;\r\n    font-weight: 600;\r\n  }\r\n  .ap-code-fix {\r\n    display: inline-block;\r\n    padding: 3px 8px;\r\n    font-family: 'JetBrains Mono', monospace;\r\n    font-size: 0.8rem;\r\n    font-weight: 600;\r\n    border-radius: 5px;\r\n    background: rgba(16, 185, 129, 0.12);\r\n    border: 1px solid rgba(16, 185, 129, 0.32);\r\n    color: #6ee7b7;\r\n    word-break: break-word;\r\n  }\r\n\r\n  /* Light mode for Anti-Pattern Table */\r\n  [data-theme=\"light\"] .anti-pattern-table th,\r\n  [data-theme=\"light\"] .arith-sticky-table.anti-pattern-table th {\r\n    background-color: #f1f5f9 !important;\r\n    color: #475569 !important;\r\n    border-bottom-color: #cbd5e1 !important;\r\n  }\r\n  [data-theme=\"light\"] .anti-pattern-table td,\r\n  [data-theme=\"light\"] .arith-sticky-table.anti-pattern-table td {\r\n    border-bottom-color: #f1f5f9 !important;\r\n    color: #1e293b !important;\r\n  }\r\n  [data-theme=\"light\"] .anti-pattern-table tbody tr:hover td,\r\n  [data-theme=\"light\"] .arith-sticky-table.anti-pattern-table tbody tr:hover td {\r\n    background-color: #fef2f2 !important;\r\n  }\r\n  [data-theme=\"light\"] .anti-pattern-table th:nth-child(1),\r\n  [data-theme=\"light\"] .arith-sticky-table.anti-pattern-table th:nth-child(1) {\r\n    background-color: #f1f5f9 !important;\r\n    border-right-color: #cbd5e1 !important;\r\n  }\r\n  [data-theme=\"light\"] .anti-pattern-table td:nth-child(1),\r\n  [data-theme=\"light\"] .arith-sticky-table.anti-pattern-table td:nth-child(1) {\r\n    background-color: #ffffff !important;\r\n    border-right: 2px solid rgba(244, 63, 94, 0.4) !important;\r\n    box-shadow: 4px 0 10px -2px rgba(0, 0, 0, 0.08) !important;\r\n  }\r\n  [data-theme=\"light\"] .anti-pattern-table th:nth-child(2),\r\n  [data-theme=\"light\"] .arith-sticky-table.anti-pattern-table th:nth-child(2) {\r\n    border-right: 1px solid #e2e8f0 !important;\r\n  }\r\n  [data-theme=\"light\"] .anti-pattern-table td:nth-child(2),\r\n  [data-theme=\"light\"] .arith-sticky-table.anti-pattern-table td:nth-child(2) {\r\n    border-right: 1px solid #e2e8f0 !important;\r\n    box-shadow: none !important;\r\n  }\r\n  [data-theme=\"light\"] .anti-pattern-table tbody tr:hover td:nth-child(1),\r\n  [data-theme=\"light\"] .arith-sticky-table.anti-pattern-table tbody tr:hover td:nth-child(1) {\r\n    background-color: #fef2f2 !important;\r\n  }\r\n  [data-theme=\"light\"] .anti-pattern-table td:nth-child(1) code,\r\n  [data-theme=\"light\"] .arith-sticky-table.anti-pattern-table td:nth-child(1) code {\r\n    background: #fee2e2 !important;\r\n    border-color: #fca5a5 !important;\r\n    color: #b91c1c !important;\r\n  }\r\n\r\n  /* ═════════════════════════════════════════════════════════════════════\r\n     STUNNING KEY NOTES CARD DESIGN SYSTEM (Inherited Body Font + Glassmorphism)\r\n     ═════════════════════════════════════════════════════════════════════ */\r\n  .py-keynotes-card {\r\n    background: linear-gradient(135deg, rgba(15, 23, 42, 0.85) 0%, rgba(30, 41, 59, 0.65) 100%) !important;\r\n    backdrop-filter: blur(12px);\r\n    -webkit-backdrop-filter: blur(12px);\r\n    border: 1px solid rgba(56, 189, 248, 0.28) !important;\r\n    border-left: 4px solid #38bdf8 !important;\r\n    border-radius: 12px !important;\r\n    padding: 16px 20px !important;\r\n    margin: 18px 0 10px 0 !important;\r\n    display: grid !important;\r\n    grid-template-columns: auto 1fr !important;\r\n    column-gap: 12px !important;\r\n    row-gap: 14px !important;\r\n    align-items: center !important;\r\n    box-shadow: 0 8px 24px -4px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.06) !important;\r\n    font-family: inherit !important;\r\n  }\r\n  .py-keynotes-icon-wrap {\r\n    grid-column: 1 !important;\r\n    grid-row: 1 !important;\r\n    width: 34px !important;\r\n    height: 34px !important;\r\n    border-radius: 9px !important;\r\n    background: rgba(56, 189, 248, 0.12) !important;\r\n    border: 1px solid rgba(56, 189, 248, 0.28) !important;\r\n    display: flex !important;\r\n    align-items: center !important;\r\n    justify-content: center !important;\r\n    font-size: 1.15rem !important;\r\n    flex-shrink: 0 !important;\r\n    box-shadow: 0 0 12px rgba(56, 189, 248, 0.2) !important;\r\n  }\r\n  .py-keynotes-body {\r\n    display: contents !important;\r\n  }\r\n  .py-keynotes-header {\r\n    grid-column: 2 !important;\r\n    grid-row: 1 !important;\r\n    display: flex !important;\r\n    align-items: center !important;\r\n    gap: 10px !important;\r\n    margin-bottom: 0 !important;\r\n  }\r\n  .py-keynotes-title {\r\n    font-size: 0.78rem !important;\r\n    font-weight: 800 !important;\r\n    text-transform: uppercase !important;\r\n    letter-spacing: 0.08em !important;\r\n    color: #38bdf8 !important;\r\n    font-family: inherit !important;\r\n  }\r\n  .py-keynotes-tag {\r\n    font-size: 0.68rem !important;\r\n    padding: 2px 10px !important;\r\n    border-radius: 12px !important;\r\n    background: rgba(56, 189, 248, 0.14) !important;\r\n    border: 1px solid rgba(56, 189, 248, 0.28) !important;\r\n    color: #7dd3fc !important;\r\n    font-weight: 700 !important;\r\n    font-family: inherit !important;\r\n  }\r\n  .py-keynotes-list {\r\n    grid-column: 1 / -1 !important;\r\n    grid-row: 2 !important;\r\n    margin: 0 !important;\r\n    padding: 0 !important;\r\n    list-style: none !important;\r\n    font-family: inherit !important;\r\n    width: 100% !important;\r\n  }\r\n  .py-keynotes-list li {\r\n    position: relative !important;\r\n    padding-left: 24px !important;\r\n    margin-bottom: 10px !important;\r\n    font-size: 0.85rem !important;\r\n    line-height: 1.65 !important;\r\n    color: #e2e8f0 !important;\r\n    font-family: inherit !important;\r\n    text-align: justify !important;\r\n    text-align-last: left !important;\r\n    text-justify: inter-word !important;\r\n  }\r\n  .py-keynotes-list li:last-child {\r\n    margin-bottom: 0 !important;\r\n  }\r\n  .py-keynotes-list li::before {\r\n    content: \"\" !important;\r\n    position: absolute !important;\r\n    left: 4px !important;\r\n    top: 9px !important;\r\n    width: 7px !important;\r\n    height: 7px !important;\r\n    border-radius: 50% !important;\r\n    background: #38bdf8 !important;\r\n    box-shadow: 0 0 8px rgba(56, 189, 248, 0.85) !important;\r\n  }\r\n  .py-keynotes-list li strong {\r\n    color: #f8fafc !important;\r\n    font-weight: 700 !important;\r\n  }\r\n  .py-keynotes-list li code {\r\n    font-family: 'JetBrains Mono', monospace !important;\r\n    background: rgba(56, 189, 248, 0.12) !important;\r\n    border: 1px solid rgba(56, 189, 248, 0.25) !important;\r\n    padding: 2px 6px !important;\r\n    border-radius: 5px !important;\r\n    color: #38bdf8 !important;\r\n    font-size: 0.8rem !important;\r\n    font-weight: 600 !important;\r\n  }\r\n  /* Light Theme for Keynotes */\r\n  [data-theme=\"light\"] .py-keynotes-card {\r\n    background: linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%) !important;\r\n    border: 1px solid rgba(14, 165, 233, 0.3) !important;\r\n    border-left: 4px solid #0284c7 !important;\r\n    box-shadow: 0 8px 24px -4px rgba(14, 165, 233, 0.12), inset 0 1px 0 #ffffff !important;\r\n  }\r\n  [data-theme=\"light\"] .py-keynotes-icon-wrap {\r\n    background: #e0f2fe !important;\r\n    border-color: #bae6fd !important;\r\n    box-shadow: 0 0 12px rgba(14, 165, 233, 0.18) !important;\r\n  }\r\n  [data-theme=\"light\"] .py-keynotes-title {\r\n    color: #0284c7 !important;\r\n  }\r\n  [data-theme=\"light\"] .py-keynotes-tag {\r\n    background: #e0f2fe !important;\r\n    border-color: #bae6fd !important;\r\n    color: #0369a1 !important;\r\n  }\r\n  [data-theme=\"light\"] .py-keynotes-list li {\r\n    color: #334155 !important;\r\n  }\r\n  [data-theme=\"light\"] .py-keynotes-list li::before {\r\n    background: #0284c7 !important;\r\n    box-shadow: 0 0 6px rgba(2, 132, 199, 0.5) !important;\r\n  }\r\n  [data-theme=\"light\"] .py-keynotes-list li strong {\r\n    color: #0f172a !important;\r\n  }\r\n  [data-theme=\"light\"] .py-keynotes-list li code {\r\n    background: #e0f2fe !important;\r\n    border-color: #7dd3fc !important;\r\n    color: #0369a1 !important;\r\n  }\r\n\r\n  /* ═════════════════════════════════════════════════════════════════════\r\n     COGNITIVE LEARNING & SCIENTIFIC VISUAL MODELS DESIGN SYSTEM\r\n     ═════════════════════════════════════════════════════════════════════ */\r\n\r\n  /* 🧠 10-Second Recall Hook (Mnemonic / Interview Anchor) */\r\n  .py-recall-hook {\r\n    background: linear-gradient(135deg, rgba(56, 189, 248, 0.08) 0%, rgba(168, 85, 247, 0.08) 100%);\r\n    border: 1px solid rgba(56, 189, 248, 0.25);\r\n    border-left: 4px solid #38bdf8;\r\n    border-radius: 10px;\r\n    padding: 14px 18px;\r\n    margin: 20px 0 10px 0;\r\n    display: flex;\r\n    gap: 14px;\r\n    align-items: flex-start;\r\n    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);\r\n  }\r\n  .py-recall-icon {\r\n    font-size: 1.4rem;\r\n    line-height: 1;\r\n    flex-shrink: 0;\r\n  }\r\n  .py-recall-body {\r\n    flex: 1;\r\n  }\r\n  .py-recall-header {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 8px;\r\n    margin-bottom: 4px;\r\n  }\r\n  .py-recall-title {\r\n    font-family: 'JetBrains Mono', monospace;\r\n    font-size: 0.72rem;\r\n    font-weight: 800;\r\n    text-transform: uppercase;\r\n    letter-spacing: 0.08em;\r\n    color: #38bdf8;\r\n  }\r\n  .py-recall-tag {\r\n    font-size: 0.65rem;\r\n    padding: 1px 6px;\r\n    border-radius: 4px;\r\n    background: rgba(56, 189, 248, 0.15);\r\n    color: #bae6fd;\r\n    font-weight: 600;\r\n  }\r\n  .py-recall-list {\r\n    margin: 0;\r\n    padding-left: 1.5rem;\r\n    list-style-type: disc;\r\n    font-family: 'JetBrains Mono', monospace;\r\n    font-size: 0.82rem;\r\n    color: #e2e8f0;\r\n    line-height: 1.6;\r\n  }\r\n  .py-recall-list li {\r\n    margin-bottom: 6px;\r\n  }\r\n  [data-theme=\"light\"] .py-recall-list { color: #334155; }\r\n  .py-recall-text {\r\n    font-size: 0.82rem;\r\n    line-height: 1.55;\r\n    color: #e2e8f0;\r\n    margin: 0;\r\n  }\r\n  .py-recall-text code {\r\n    font-family: 'JetBrains Mono', monospace;\r\n    background: rgba(0, 0, 0, 0.35);\r\n    padding: 2px 5px;\r\n    border-radius: 4px;\r\n    color: #38bdf8;\r\n    font-size: 0.78rem;\r\n  }\r\n\r\n  /* 💡 Visual Cognitive Model Container */\r\n  .cog-model-card {\r\n    background: rgba(15, 23, 42, 0.65);\r\n    border: 1px solid rgba(255, 255, 255, 0.08);\r\n    border-radius: 12px;\r\n    padding: 18px;\r\n    margin: 18px 0;\r\n    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);\r\n  }\r\n  .cog-model-header {\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: space-between;\r\n    margin-bottom: 14px;\r\n    padding-bottom: 10px;\r\n    border-bottom: 1px solid rgba(255, 255, 255, 0.08);\r\n  }\r\n  .cog-model-title-wrap {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 10px;\r\n  }\r\n  .cog-model-badge {\r\n    background: rgba(56, 189, 248, 0.15);\r\n    border: 1px solid rgba(56, 189, 248, 0.3);\r\n    color: #38bdf8;\r\n    font-family: 'JetBrains Mono', monospace;\r\n    font-size: 0.68rem;\r\n    font-weight: 800;\r\n    padding: 3px 8px;\r\n    border-radius: 5px;\r\n    text-transform: uppercase;\r\n  }\r\n  .cog-model-title {\r\n    font-size: 0.92rem;\r\n    font-weight: 800;\r\n    color: #f8fafc;\r\n    margin: 0;\r\n  }\r\n  .cog-model-subtitle {\r\n    font-size: 0.72rem;\r\n    color: #94a3b8;\r\n  }\r\n\r\n  /* Diagram 1: Number Line Euclidean Floor Division */\r\n  .numline-wrap {\r\n    position: relative;\r\n    padding: 30px 14px 16px 14px;\r\n    background: rgba(0, 0, 0, 0.25);\r\n    border-radius: 8px;\r\n    border: 1px solid rgba(255, 255, 255, 0.05);\r\n  }\r\n  .numline-axis {\r\n    display: flex;\r\n    justify-content: space-between;\r\n    align-items: center;\r\n    position: relative;\r\n    margin: 30px 10px 10px 10px;\r\n    height: 4px;\r\n    background: linear-gradient(90deg, #f43f5e 0%, #38bdf8 50%, #22c55e 100%);\r\n    border-radius: 2px;\r\n  }\r\n  .numline-tick {\r\n    position: relative;\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n  }\r\n  .numline-dot {\r\n    width: 12px;\r\n    height: 12px;\r\n    border-radius: 50%;\r\n    background: #0f172a;\r\n    border: 2px solid #94a3b8;\r\n    z-index: 2;\r\n  }\r\n  .numline-val {\r\n    font-family: 'JetBrains Mono', monospace;\r\n    font-size: 0.75rem;\r\n    font-weight: 700;\r\n    color: #94a3b8;\r\n    margin-top: 6px;\r\n  }\r\n  .numline-pointer-left {\r\n    position: absolute;\r\n    top: -46px;\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    transform: translateX(-50%);\r\n  }\r\n  .numline-pill {\r\n    padding: 3px 8px;\r\n    border-radius: 5px;\r\n    font-family: 'JetBrains Mono', monospace;\r\n    font-size: 0.70rem;\r\n    font-weight: 800;\r\n    white-space: nowrap;\r\n  }\r\n  .pill-danger {\r\n    background: rgba(244, 63, 94, 0.25);\r\n    border: 1px solid #f43f5e;\r\n    color: #fca5a5;\r\n  }\r\n  .pill-success {\r\n    background: rgba(34, 197, 94, 0.25);\r\n    border: 1px solid #22c55e;\r\n    color: #86efac;\r\n  }\r\n  .pill-info {\r\n    background: rgba(56, 189, 248, 0.25);\r\n    border: 1px solid #38bdf8;\r\n    color: #bae6fd;\r\n  }\r\n  .numline-arrow-down {\r\n    width: 0;\r\n    height: 0;\r\n    border-left: 5px solid transparent;\r\n    border-right: 5px solid transparent;\r\n    border-top: 6px solid #38bdf8;\r\n  }\r\n  .arrow-rose { border-top-color: #f43f5e; }\r\n  .arrow-green { border-top-color: #22c55e; }\r\n  .numline-legend {\r\n    display: flex;\r\n    flex-wrap: wrap;\r\n    gap: 16px;\r\n    margin-top: 14px;\r\n    padding-top: 12px;\r\n    border-top: 1px dashed rgba(255, 255, 255, 0.08);\r\n    font-size: 0.74rem;\r\n    color: #cbd5e1;\r\n  }\r\n  .numline-legend-item {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 6px;\r\n  }\r\n\r\n  /* Diagram 2: RAM Memory Pointer Architecture */\r\n  .ram-schematic-grid {\r\n    display: grid;\r\n    grid-template-columns: 1fr 1fr;\r\n    gap: 14px;\r\n  }\r\n  @media (max-width: 768px) {\r\n    .ram-schematic-grid { grid-template-columns: 1fr; }\r\n  }\r\n  .ram-schematic-box {\r\n    background: rgba(0, 0, 0, 0.25);\r\n    border: 1px solid rgba(255, 255, 255, 0.08);\r\n    border-radius: 8px;\r\n    padding: 14px;\r\n  }\r\n  .ram-schematic-head {\r\n    display: flex;\r\n    justify-content: space-between;\r\n    align-items: center;\r\n    margin-bottom: 10px;\r\n    padding-bottom: 8px;\r\n    border-bottom: 1px solid rgba(255, 255, 255, 0.06);\r\n  }\r\n  .ram-head-title {\r\n    font-family: 'JetBrains Mono', monospace;\r\n    font-size: 0.76rem;\r\n    font-weight: 800;\r\n  }\r\n  .ram-node-row {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 10px;\r\n    margin: 8px 0;\r\n    font-family: 'JetBrains Mono', monospace;\r\n    font-size: 0.75rem;\r\n  }\r\n  .ram-var-tag {\r\n    background: rgba(56, 189, 248, 0.15);\r\n    border: 1px solid rgba(56, 189, 248, 0.3);\r\n    color: #38bdf8;\r\n    padding: 4px 10px;\r\n    border-radius: 6px;\r\n    font-weight: 700;\r\n    width: 60px;\r\n    text-align: center;\r\n  }\r\n  .ram-arrow-connector {\r\n    color: #64748b;\r\n    font-weight: 700;\r\n  }\r\n  .ram-address-block {\r\n    flex: 1;\r\n    background: rgba(255, 255, 255, 0.03);\r\n    border: 1px solid rgba(255, 255, 255, 0.1);\r\n    border-radius: 6px;\r\n    padding: 6px 12px;\r\n    display: flex;\r\n    justify-content: space-between;\r\n    align-items: center;\r\n  }\r\n  .ram-addr-label {\r\n    font-size: 0.65rem;\r\n    color: #94a3b8;\r\n  }\r\n  .ram-addr-val {\r\n    color: #fbbf24;\r\n    font-weight: 700;\r\n  }\r\n  .ram-content-val {\r\n    color: #f8fafc;\r\n    font-weight: 700;\r\n  }\r\n\r\n  /* Diagram 3: Circuit Breaker Flowchart */\r\n  .circuit-grid {\r\n    display: grid;\r\n    grid-template-columns: 1fr 1fr;\r\n    gap: 14px;\r\n  }\r\n  @media (max-width: 768px) {\r\n    .circuit-grid { grid-template-columns: 1fr; }\r\n  }\r\n  .circuit-box {\r\n    background: rgba(0, 0, 0, 0.25);\r\n    border: 1px solid rgba(255, 255, 255, 0.08);\r\n    border-radius: 8px;\r\n    padding: 14px;\r\n  }\r\n  .circuit-step-list {\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 8px;\r\n    margin-top: 8px;\r\n  }\r\n  .circuit-step-node {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 10px;\r\n    padding: 8px 12px;\r\n    border-radius: 6px;\r\n    background: rgba(255, 255, 255, 0.03);\r\n    border: 1px solid rgba(255, 255, 255, 0.06);\r\n    font-family: 'JetBrains Mono', monospace;\r\n    font-size: 0.74rem;\r\n  }\r\n  .circuit-badge {\r\n    padding: 2px 7px;\r\n    border-radius: 4px;\r\n    font-size: 0.65rem;\r\n    font-weight: 800;\r\n    text-transform: uppercase;\r\n  }\r\n  .circuit-badge--halt {\r\n    background: rgba(244, 63, 94, 0.2);\r\n    color: #f43f5e;\r\n    border: 1px solid rgba(244, 63, 94, 0.4);\r\n  }\r\n  .circuit-badge--pass {\r\n    background: rgba(34, 197, 94, 0.2);\r\n    color: #22c55e;\r\n    border: 1px solid rgba(34, 197, 94, 0.4);\r\n  }\r\n\r\n  /* Diagram 4: Twin House Identity vs Equality */\r\n  .twin-house-grid {\r\n    display: grid;\r\n    grid-template-columns: 1fr 1fr;\r\n    gap: 14px;\r\n    margin-top: 10px;\r\n  }\r\n  @media (max-width: 640px) {\r\n    .twin-house-grid { grid-template-columns: 1fr; }\r\n  }\r\n  .twin-card {\r\n    background: rgba(0, 0, 0, 0.25);\r\n    border: 1px solid rgba(255, 255, 255, 0.08);\r\n    border-radius: 8px;\r\n    padding: 14px;\r\n    text-align: center;\r\n  }\r\n  .twin-house-icon {\r\n    font-size: 2rem;\r\n    margin-bottom: 4px;\r\n  }\r\n  .twin-house-title {\r\n    font-family: 'JetBrains Mono', monospace;\r\n    font-size: 0.84rem;\r\n    font-weight: 800;\r\n    color: #f8fafc;\r\n  }\r\n  .twin-house-addr {\r\n    font-family: 'JetBrains Mono', monospace;\r\n    font-size: 0.70rem;\r\n    color: #fbbf24;\r\n    margin-bottom: 8px;\r\n  }\r\n  .twin-furniture-box {\r\n    background: rgba(255, 255, 255, 0.04);\r\n    border: 1px dashed rgba(255, 255, 255, 0.15);\r\n    border-radius: 6px;\r\n    padding: 8px;\r\n    font-family: 'JetBrains Mono', monospace;\r\n    font-size: 0.76rem;\r\n    color: #38bdf8;\r\n    margin-bottom: 8px;\r\n  }\r\n  .twin-verdict-row {\r\n    display: flex;\r\n    justify-content: space-around;\r\n    padding-top: 8px;\r\n    border-top: 1px solid rgba(255, 255, 255, 0.08);\r\n    font-family: 'JetBrains Mono', monospace;\r\n    font-size: 0.74rem;\r\n  }\r\n\r\n  /* Diagram 5: 8-Bit Hardware Register & RBAC Switchboard */\r\n  .dip-register-grid {\r\n    display: grid;\r\n    grid-template-columns: repeat(8, 1fr);\r\n    gap: 6px;\r\n    margin: 12px 0;\r\n  }\r\n  @media (max-width: 640px) {\r\n    .dip-register-grid { grid-template-columns: repeat(4, 1fr); }\r\n  }\r\n  .dip-cell {\r\n    background: rgba(0, 0, 0, 0.35);\r\n    border: 1px solid rgba(255, 255, 255, 0.08);\r\n    border-radius: 6px;\r\n    padding: 8px 4px;\r\n    text-align: center;\r\n    font-family: 'JetBrains Mono', monospace;\r\n  }\r\n  .dip-bit-idx {\r\n    font-size: 0.62rem;\r\n    color: #64748b;\r\n    margin-bottom: 2px;\r\n  }\r\n  .dip-bit-power {\r\n    font-size: 0.72rem;\r\n    font-weight: 800;\r\n    color: #94a3b8;\r\n  }\r\n  .dip-bit-flag {\r\n    font-size: 0.62rem;\r\n    font-weight: 700;\r\n    margin: 4px 0;\r\n    height: 16px;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n  }\r\n  .dip-switch-indicator {\r\n    width: 14px;\r\n    height: 14px;\r\n    border-radius: 50%;\r\n    margin: 4px auto 0 auto;\r\n    border: 2px solid #64748b;\r\n  }\r\n  .switch-on {\r\n    background: #22c55e;\r\n    border-color: #4ade80;\r\n    box-shadow: 0 0 8px rgba(34, 197, 94, 0.6);\r\n  }\r\n  .switch-off {\r\n    background: #1e293b;\r\n    border-color: #475569;\r\n  }\r\n\r\n  /* Diagram 6: Walrus Stream Pipeline */\r\n  .walrus-flow-wrap {\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: space-between;\r\n    gap: 8px;\r\n    background: rgba(0, 0, 0, 0.25);\r\n    border: 1px solid rgba(255, 255, 255, 0.08);\r\n    border-radius: 8px;\r\n    padding: 14px;\r\n    margin-top: 10px;\r\n    overflow-x: auto;\r\n  }\r\n  .walrus-flow-step {\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    text-align: center;\r\n    min-width: 120px;\r\n  }\r\n  .walrus-step-badge {\r\n    background: rgba(168, 85, 247, 0.15);\r\n    border: 1px solid rgba(168, 85, 247, 0.3);\r\n    color: #c084fc;\r\n    font-family: 'JetBrains Mono', monospace;\r\n    font-size: 0.68rem;\r\n    font-weight: 800;\r\n    padding: 2px 8px;\r\n    border-radius: 4px;\r\n    margin-bottom: 6px;\r\n  }\r\n  .walrus-step-desc {\r\n    font-family: 'JetBrains Mono', monospace;\r\n    font-size: 0.72rem;\r\n    color: #cbd5e1;\r\n  }\r\n\r\n  /* Diagram 7: PEUMASCILA Mnemonic Ladder */\r\n  .ladder-container {\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 6px;\r\n    margin: 14px 0;\r\n  }\r\n  .ladder-rung {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 12px;\r\n    padding: 8px 14px;\r\n    border-radius: 8px;\r\n    background: rgba(255, 255, 255, 0.03);\r\n    border: 1px solid rgba(255, 255, 255, 0.07);\r\n    font-family: 'JetBrains Mono', monospace;\r\n    transition: transform 0.2s ease;\r\n  }\r\n  .ladder-rung:hover {\r\n    transform: translateX(4px);\r\n  }\r\n  .ladder-letter {\r\n    width: 24px;\r\n    height: 24px;\r\n    border-radius: 6px;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    font-size: 0.82rem;\r\n    font-weight: 900;\r\n  }\r\n  .rung-rose { background: rgba(244, 63, 94, 0.2); color: #fb7185; border: 1px solid rgba(244, 63, 94, 0.4); }\r\n  .rung-gold { background: rgba(245, 158, 11, 0.2); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.4); }\r\n  .rung-purple { background: rgba(168, 85, 247, 0.2); color: #c084fc; border: 1px solid rgba(168, 85, 247, 0.4); }\r\n  .rung-blue { background: rgba(56, 189, 248, 0.2); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.4); }\r\n  .rung-green { background: rgba(34, 197, 94, 0.2); color: #4ade80; border: 1px solid rgba(34, 197, 94, 0.4); }\r\n  .rung-muted { background: rgba(255, 255, 255, 0.05); color: #94a3b8; border: 1px solid rgba(255, 255, 255, 0.1); }\r\n  .ladder-title {\r\n    font-size: 0.80rem;\r\n    font-weight: 800;\r\n    color: #f8fafc;\r\n    width: 140px;\r\n  }\r\n  .ladder-ops {\r\n    flex: 1;\r\n    font-size: 0.74rem;\r\n    color: #94a3b8;\r\n  }\r\n  .ladder-priority {\r\n    font-size: 0.65rem;\r\n    padding: 2px 7px;\r\n    border-radius: 4px;\r\n    background: rgba(255, 255, 255, 0.05);\r\n    color: #cbd5e1;\r\n  }\r\n\r\n  /* Light mode adaptations for all cognitive learning components */\r\n  [data-theme=\"light\"] .py-recall-hook {\r\n    background: linear-gradient(135deg, rgba(2, 132, 199, 0.08) 0%, rgba(147, 51, 234, 0.08) 100%);\r\n    border-color: rgba(2, 132, 199, 0.3);\r\n    border-left-color: #0284c7;\r\n    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);\r\n  }\r\n  [data-theme=\"light\"] .py-recall-title { color: #0284c7; }\r\n  [data-theme=\"light\"] .py-recall-text { color: #1e293b; }\r\n  [data-theme=\"light\"] .py-recall-text code {\r\n    background: #f1f5f9;\r\n    color: #0369a1;\r\n    border: 1px solid #cbd5e1;\r\n  }\r\n  [data-theme=\"light\"] .cog-model-card {\r\n    background: #ffffff;\r\n    border-color: #e2e8f0;\r\n    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);\r\n  }\r\n\r\n  /* Bitmask RBAC Card */\r\n  .bitmask-grid {\r\n    display: grid;\r\n    grid-template-columns: repeat(4, 1fr);\r\n    gap: 10px;\r\n    margin-top: 12px;\r\n  }\r\n  @media (max-width: 768px) {\r\n    .bitmask-grid { grid-template-columns: repeat(2, 1fr); }\r\n  }\r\n  @media (max-width: 480px) {\r\n    .bitmask-grid { grid-template-columns: 1fr; }\r\n  }\r\n  .bitmask-cell {\r\n    background: rgba(255, 255, 255, 0.03);\r\n    border: 1px solid rgba(255, 255, 255, 0.07);\r\n    border-radius: 8px;\r\n    padding: 12px;\r\n    text-align: center;\r\n  }\r\n  .bitmask-cell-title {\r\n    font-family: 'JetBrains Mono', monospace;\r\n    font-size: 0.78rem;\r\n    font-weight: 800;\r\n  }\r\n  .bitmask-cell-title--blue { color: #38bdf8; }\r\n  .bitmask-cell-title--green { color: #34d399; }\r\n  .bitmask-cell-title--amber { color: #fbbf24; }\r\n  .bitmask-cell-title--purple { color: #c084fc; }\r\n\r\n  .bitmask-cell-sub {\r\n    font-size: 0.68rem;\r\n    color: #94a3b8;\r\n    margin-top: 4px;\r\n  }\r\n  .bitmask-actions {\r\n    display: flex;\r\n    justify-content: space-around;\r\n    margin-top: 10px;\r\n    font-family: 'JetBrains Mono', monospace;\r\n    font-size: 0.72rem;\r\n    color: #cbd5e1;\r\n  }\r\n\r\n  /* Arity Grid */\r\n  .arity-grid {\r\n    display: grid;\r\n    grid-template-columns: repeat(3, 1fr);\r\n    gap: 12px;\r\n    margin: 16px 0;\r\n  }\r\n  @media (max-width: 640px) {\r\n    .arity-grid { grid-template-columns: 1fr; }\r\n  }\r\n  .arity-card {\r\n    background: rgba(255, 255, 255, 0.03);\r\n    border: 1px solid rgba(255, 255, 255, 0.08);\r\n    border-radius: 10px;\r\n    padding: 14px;\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 8px;\r\n  }\r\n  .arity-head {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 8px;\r\n  }\r\n  .arity-badge {\r\n    background: rgba(56, 189, 248, 0.15);\r\n    border: 1px solid rgba(56, 189, 248, 0.3);\r\n    color: #38bdf8;\r\n    font-family: 'JetBrains Mono', monospace;\r\n    font-size: 0.72rem;\r\n    font-weight: 800;\r\n    width: 22px;\r\n    height: 22px;\r\n    border-radius: 6px;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n  }\r\n  .arity-name {\r\n    font-weight: 700;\r\n    font-size: 0.88rem;\r\n    color: #f8fafc;\r\n  }\r\n  .arity-desc {\r\n    font-size: 0.75rem;\r\n    color: #94a3b8;\r\n    margin: 0;\r\n    line-height: 1.4;\r\n  }\r\n  .arity-chips {\r\n    display: flex;\r\n    flex-wrap: wrap;\r\n    gap: 6px;\r\n    margin-top: 4px;\r\n  }\r\n  .arity-chip {\r\n    font-family: 'JetBrains Mono', monospace;\r\n    font-size: 0.72rem;\r\n    background: rgba(0, 0, 0, 0.3);\r\n    border: 1px solid rgba(255, 255, 255, 0.1);\r\n    border-radius: 4px;\r\n    padding: 2px 7px;\r\n    color: #e2e8f0;\r\n  }\r\n\r\n\r\n  /* Operator Classification Grid */\r\n  .op-matrix-list {\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 12px;\r\n    margin-top: 14px;\r\n  }\r\n  .op-family-card {\r\n    background: rgba(255, 255, 255, 0.02);\r\n    border: 1px solid rgba(255, 255, 255, 0.08);\r\n    border-radius: 8px;\r\n    padding: 14px;\r\n  }\r\n  .op-family-header {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 12px;\r\n    margin-bottom: 12px;\r\n  }\r\n  @media (max-width: 640px) {\r\n    .op-family-header { flex-direction: column; align-items: flex-start; gap: 6px; }\r\n  }\r\n  .op-family-desc {\r\n    font-size: 0.75rem;\r\n    color: #94a3b8;\r\n    line-height: 1.4;\r\n  }\r\n  .op-symbols-grid {\r\n    display: flex;\r\n    flex-wrap: wrap;\r\n    gap: 8px;\r\n  }\r\n  .op-symbol-box {\r\n    background: rgba(0, 0, 0, 0.3);\r\n    border: 1px solid rgba(255, 255, 255, 0.1);\r\n    border-radius: 6px;\r\n    padding: 6px 12px;\r\n    font-family: 'JetBrains Mono', monospace;\r\n    font-size: 0.85rem;\r\n    color: #f8fafc;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    min-width: 40px;\r\n    transition: all 0.2s ease;\r\n  }\r\n  .op-symbol-box:hover {\r\n    background: rgba(56, 189, 248, 0.1);\r\n    border-color: rgba(56, 189, 248, 0.4);\r\n    color: #38bdf8;\r\n    transform: translateY(-2px);\r\n  }\r\n  [data-theme=\"light\"] .op-family-card {\r\n    background: #f8fafc;\r\n    border-color: #e2e8f0;\r\n  }\r\n  [data-theme=\"light\"] .op-family-desc {\r\n    color: #475569;\r\n  }\r\n  [data-theme=\"light\"] .op-symbol-box {\r\n    background: #ffffff;\r\n    border-color: #cbd5e1;\r\n    color: #0f172a;\r\n  }\r\n  [data-theme=\"light\"] .op-symbol-box:hover {\r\n    background: #f0f9ff;\r\n    border-color: #38bdf8;\r\n    color: #0284c7;\r\n  }\r\n\r\n  /* Category pills */\r\n  .fam-chip {\r\n    display: inline-block;\r\n    padding: 2px 8px;\r\n    border-radius: 4px;\r\n    font-size: 0.72rem;\r\n    font-weight: 700;\r\n    font-family: 'Outfit', sans-serif;\r\n  }\r\n  .fam-chip--arith { background: rgba(56, 189, 248, 0.15); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.3); }\r\n  .fam-chip--assign { background: rgba(168, 85, 247, 0.15); color: #c084fc; border: 1px solid rgba(168, 85, 247, 0.3); }\r\n  .fam-chip--compare { background: rgba(52, 211, 153, 0.15); color: #34d399; border: 1px solid rgba(52, 211, 153, 0.3); }\r\n  .fam-chip--logic { background: rgba(251, 191, 36, 0.15); color: #fbbf24; border: 1px solid rgba(251, 191, 36, 0.3); }\r\n  .fam-chip--ident { background: rgba(244, 63, 94, 0.15); color: #fb7185; border: 1px solid rgba(244, 63, 94, 0.3); }\r\n  .fam-chip--member { background: rgba(14, 165, 233, 0.15); color: #38bdf8; border: 1px solid rgba(14, 165, 233, 0.3); }\r\n  .fam-chip--bitwise { background: rgba(234, 88, 12, 0.15); color: #fb923c; border: 1px solid rgba(234, 88, 12, 0.3); }\r\n  .fam-chip--cond { background: rgba(16, 185, 129, 0.15); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.3); }\r\n  .fam-chip--spotlight {\r\n    background: rgba(245, 158, 11, 0.18);\r\n    color: #fbbf24;\r\n    border: 1px solid rgba(245, 158, 11, 0.45);\r\n    letter-spacing: 0.03em;\r\n    font-size: 0.72rem;\r\n    font-weight: 700;\r\n    padding: 3px 9px;\r\n    border-radius: 6px;\r\n    vertical-align: middle;\r\n    display: inline-flex;\r\n    align-items: center;\r\n    gap: 4px;\r\n    box-shadow: 0 1px 4px rgba(245, 158, 11, 0.1);\r\n  }\r\n  [data-theme=\"light\"] .fam-chip--spotlight {\r\n    background: rgba(245, 158, 11, 0.14);\r\n    color: #b45309;\r\n    border-color: rgba(245, 158, 11, 0.35);\r\n  }\r\n\r\n  /* Subcards with divider */\r\n  .topic-subcard {\r\n    margin-top: 22px;\r\n    padding-top: 16px;\r\n    border-top: 1px dashed rgba(255, 255, 255, 0.1);\r\n  }\r\n\r\n  /* Table and Section Header Utilities (100% Class-Driven, 0 Inline Styles) */\r\n  .table-header-wrap {\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: space-between;\r\n    gap: 8px;\r\n    margin-bottom: 8px;\r\n    padding: 0 4px;\r\n  }\r\n  .table-header-title {\r\n    margin: 0;\r\n    font-size: 0.95rem;\r\n    font-weight: 800;\r\n    letter-spacing: -0.01em;\r\n    flex: 1;\r\n  }\r\n  .subcard-header-with-audio {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 8px;\r\n    margin-bottom: 8px;\r\n  }\r\n  .subcard-header-title {\r\n    margin: 0;\r\n    font-size: 0.95rem;\r\n    font-weight: 800;\r\n    flex: 1;\r\n  }\r\n  .pipeline-flow-box {\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: space-between;\r\n    padding: 12px 16px;\r\n    background: rgba(255, 255, 255, 0.02);\r\n    border: 1px solid rgba(255, 255, 255, 0.06);\r\n    border-radius: 8px;\r\n    font-family: 'JetBrains Mono', monospace;\r\n    font-size: 0.75rem;\r\n    margin-top: 6px;\r\n    overflow-x: auto;\r\n  }\r\n  .pipeline-flow-tip {\r\n    font-size: 0.75rem;\r\n    color: #94a3b8;\r\n    margin-top: 8px;\r\n    line-height: 1.5;\r\n  }\r\n  .tok-blue { color: #38bdf8; }\r\n  .tok-green { color: #34d399; }\r\n  .tok-amber { color: #fbbf24; }\r\n  .tok-purple { color: #a855f7; }\r\n  .tok-rose { color: #f43f5e; }\r\n  .tok-muted { color: #64748b; }\r\n\r\n  /* 3-Column Complexity Grid */\r\n  .complexity-grid {\r\n    display: grid;\r\n    grid-template-columns: repeat(3, 1fr);\r\n    gap: 10px;\r\n    margin-top: 6px;\r\n  }\r\n  @media (max-width: 640px) {\r\n    .complexity-grid { grid-template-columns: 1fr; }\r\n  }\r\n  .complexity-cell {\r\n    background: rgba(255, 255, 255, 0.03);\r\n    border: 1px solid rgba(255, 255, 255, 0.07);\r\n    border-radius: 8px;\r\n    padding: 12px;\r\n    text-align: center;\r\n  }\r\n  .complexity-expr {\r\n    font-family: 'JetBrains Mono', monospace;\r\n    font-size: 0.70rem;\r\n    color: #94a3b8;\r\n  }\r\n  .complexity-val {\r\n    font-family: 'JetBrains Mono', monospace;\r\n    font-size: 0.95rem;\r\n    font-weight: 800;\r\n    margin: 6px 0;\r\n  }\r\n  .complexity-desc {\r\n    font-size: 0.70rem;\r\n    color: #64748b;\r\n  }\r\n\r\n  /* Dual Short-Circuit Rule Grid */\r\n  .dual-rule-grid {\r\n    display: grid;\r\n    grid-template-columns: 1fr 1fr;\r\n    gap: 12px;\r\n    margin-top: 6px;\r\n  }\r\n  @media (max-width: 640px) {\r\n    .dual-rule-grid { grid-template-columns: 1fr; }\r\n  }\r\n  .dual-rule-box {\r\n    background: rgba(255, 255, 255, 0.03);\r\n    border: 1px solid rgba(255, 255, 255, 0.07);\r\n    border-radius: 8px;\r\n    padding: 12px;\r\n  }\r\n  .dual-rule-title {\r\n    font-family: 'JetBrains Mono', monospace;\r\n    font-size: 0.78rem;\r\n    font-weight: 700;\r\n    margin-bottom: 6px;\r\n  }\r\n  .dual-rule-text {\r\n    font-family: 'JetBrains Mono', monospace;\r\n    font-size: 0.75rem;\r\n    color: #cbd5e1;\r\n    line-height: 1.6;\r\n  }\r\n\r\n  /* Interview Q&A Layout */\r\n  .interview-header-title {\r\n    color: #38bdf8;\r\n    font-size: 1rem;\r\n    margin-bottom: 14px;\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 8px;\r\n  }\r\n  .interview-divider {\r\n    border: none;\r\n    border-top: 1px dashed rgba(255, 255, 255, 0.1);\r\n    margin: 12px 0;\r\n  }\r\n\n\n  /* ═════════════════════════════════════════════════════════════════════\n     DAY 05 SPECIFIC EXTENSIONS: TUPLE SYSTEM & 2D FROZEN TABLES\n     ═════════════════════════════════════════════════════════════════════ */\n  #day05FundamentalsSection {\n    margin-top: 4px !important;\n  }\n  #day05FundamentalsSection .heading-box-wrap {\n    margin-top: 0 !important;\n  }\n\n  /* Section 01 Taxonomy Matrix Cards & Descriptions */\n  #day05FundamentalsSection .op-family-card {\n    padding: 16px 18px !important;\n  }\n  #day05FundamentalsSection .op-family-header {\n    display: flex !important;\n    flex-direction: column !important;\n    align-items: flex-start !important;\n    gap: 8px !important;\n    margin-bottom: 12px !important;\n    width: 100% !important;\n  }\n  #day05FundamentalsSection .fam-chip {\n    display: inline-flex !important;\n    align-items: center !important;\n    align-self: flex-start !important;\n    flex-shrink: 0 !important;\n    margin: 0 !important;\n  }\n  #day05FundamentalsSection .op-family-desc {\n    display: block !important;\n    width: 100% !important;\n    box-sizing: border-box !important;\n    font-size: 0.83rem !important;\n    line-height: 1.6 !important;\n    color: #94a3b8 !important;\n    margin: 0 !important;\n    text-align: justify !important;\n    text-align-last: left !important;\n    text-justify: inter-word !important;\n  }\n  #day05FundamentalsSection .op-family-desc code {\n    font-family: 'JetBrains Mono', monospace !important;\n    font-size: 0.77rem !important;\n    padding: 1px 5px !important;\n    background: rgba(56, 189, 248, 0.1) !important;\n    border: 1px solid rgba(56, 189, 248, 0.25) !important;\n    border-radius: 4px !important;\n    color: #38bdf8 !important;\n    white-space: nowrap !important;\n  }\n  #day05FundamentalsSection .op-family-desc strong,\n  #day05FundamentalsSection .op-family-desc em {\n    color: #e2e8f0 !important;\n    font-weight: 600 !important;\n  }\n  [data-theme=\"light\"] #day05FundamentalsSection .op-family-desc {\n    color: #334155 !important;\n  }\n  [data-theme=\"light\"] #day05FundamentalsSection .op-family-desc code {\n    background: #e0f2fe !important;\n    border-color: #7dd3fc !important;\n    color: #0284c7 !important;\n  }\n  [data-theme=\"light\"] #day05FundamentalsSection .op-family-desc strong,\n  [data-theme=\"light\"] #day05FundamentalsSection .op-family-desc em {\n    color: #0f172a !important;\n  }\n\n  /* Key Notes Justified Text Alignment */\n  .py-keynotes-list li {\n    text-align: justify !important;\n    text-align-last: left !important;\n    text-justify: inter-word !important;\n  }\n\n  /* Table Header Actions (Search Input + Audio Play Button) */\n  .table-header-actions {\n    display: flex !important;\n    align-items: center !important;\n    gap: 10px !important;\n  }\n\n  /* ═════════════════════════════════════════════════════════════════════\n     1. UNIVERSAL 2D FROZEN TABLE SYSTEM (VERTICAL & HORIZONTAL FREEZE)\n     ═════════════════════════════════════════════════════════════════════ */\n  .db-mock-table-wrap {\n    position: relative !important;\n    overflow: auto !important;\n    overflow-x: auto !important;\n    overflow-y: auto !important;\n    max-height: 520px !important;\n    -webkit-overflow-scrolling: touch !important;\n    border-radius: 12px !important;\n    border: 1px solid rgba(56, 189, 248, 0.25) !important;\n    background: #090e1a !important;\n    box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.35) !important;\n    margin: 16px 0 !important;\n  }\n  .db-mock-table-wrap::-webkit-scrollbar {\n    width: 8px !important;\n    height: 8px !important;\n  }\n  .db-mock-table-wrap::-webkit-scrollbar-track {\n    background: #0d1527 !important;\n    border-radius: 4px !important;\n  }\n  .db-mock-table-wrap::-webkit-scrollbar-thumb {\n    background: rgba(56, 189, 248, 0.35) !important;\n    border-radius: 4px !important;\n  }\n  .db-mock-table-wrap::-webkit-scrollbar-thumb:hover {\n    background: rgba(56, 189, 248, 0.6) !important;\n  }\n\n  .db-table-mock {\n    border-collapse: separate !important;\n    border-spacing: 0 !important;\n    overflow: visible !important;\n    margin: 0 !important;\n    font-size: 0.85rem !important;\n    width: 100% !important;\n    table-layout: auto !important;\n  }\n\n  .db-table-mock th:nth-child(1),\n  .db-table-mock td:nth-child(1) {\n    max-width: none !important;\n  }\n\n  /* Universal Sticky Headers for Vertical Scrolling across ALL Tables */\n  .db-table-mock thead th {\n    position: -webkit-sticky !important;\n    position: sticky !important;\n    top: 0 !important;\n    z-index: 20 !important;\n    background-color: #131d35 !important;\n    color: #e2e8f0 !important;\n    font-weight: 700 !important;\n    font-size: 0.82rem !important;\n    letter-spacing: 0.02em !important;\n    text-transform: none !important;\n    padding: 13px 16px !important;\n    border-bottom: 2px solid rgba(56, 189, 248, 0.35) !important;\n    box-sizing: border-box !important;\n    vertical-align: middle !important;\n  }\n\n  /* Top-Left Corner Header (Intersection of Vertical Freeze & Horizontal Freeze) */\n  .db-table-mock thead th:nth-child(1) {\n    position: -webkit-sticky !important;\n    position: sticky !important;\n    top: 0 !important;\n    left: 0 !important;\n    z-index: 30 !important;\n    background-color: #111a30 !important;\n    border-right: 2px solid rgba(56, 189, 248, 0.38) !important;\n    border-bottom: 2px solid rgba(56, 189, 248, 0.38) !important;\n    box-shadow: 4px 4px 14px -2px rgba(0, 0, 0, 0.55) !important;\n    color: #f8fafc !important;\n  }\n\n  /* Body Frozen Column 1 (Horizontal Freeze ONLY - scrolls vertically with rows) */\n  .db-table-mock tbody td:nth-child(1) {\n    position: -webkit-sticky !important;\n    position: sticky !important;\n    left: 0 !important;\n    top: auto !important;\n    z-index: 10 !important;\n    box-sizing: border-box !important;\n    background-color: #0d1527 !important;\n    border-right: 2px solid rgba(56, 189, 248, 0.38) !important;\n    box-shadow: 4px 0 14px -2px rgba(0, 0, 0, 0.55) !important;\n    text-align: left !important;\n    padding: 12px 16px !important;\n    vertical-align: middle !important;\n    white-space: nowrap !important;\n  }\n\n  /* Universal Sticky Headers for Columns 2, 3, 4 (Frozen Vertically at top:0, fluid horizontally) */\n  .db-table-mock thead th:nth-child(2),\n  .db-table-mock thead th:nth-child(3),\n  .db-table-mock thead th:nth-child(4),\n  .db-table-mock thead th:nth-child(5) {\n    position: -webkit-sticky !important;\n    position: sticky !important;\n    top: 0 !important;\n    left: auto !important;\n    z-index: 20 !important;\n    box-shadow: none !important;\n    border-right: 1px solid rgba(255, 255, 255, 0.08) !important;\n    padding: 13px 16px !important;\n    vertical-align: middle !important;\n  }\n\n  /* Universal Un-frozen Body Columns 2, 3, 4, 5 (Scrolls fluidly in both dimensions) */\n  .db-table-mock tbody td:nth-child(2),\n  .db-table-mock tbody td:nth-child(3),\n  .db-table-mock tbody td:nth-child(4),\n  .db-table-mock tbody td:nth-child(5) {\n    position: static !important;\n    left: auto !important;\n    z-index: 1 !important;\n    box-shadow: none !important;\n    border-right: 1px solid rgba(255, 255, 255, 0.06) !important;\n    padding: 12px 16px !important;\n    vertical-align: middle !important;\n  }\n  .db-table-mock thead th:last-child,\n  .db-table-mock tbody td:last-child {\n    border-right: none !important;\n  }\n\n  /* Solid Hover Backgrounds (Prevent Any Underlying Data Leakage) */\n  .db-table-mock tbody tr:hover td {\n    background-color: #162038 !important;\n  }\n  .db-table-mock tbody tr:hover td:nth-child(1) {\n    background-color: #1a2744 !important;\n    box-shadow: 4px 0 14px -2px rgba(0, 0, 0, 0.75) !important;\n  }\n\n  /* Individual Table Layout Customizations */\n  .db-table-mock.mem-table {\n    min-width: 1200px !important;\n  }\n  .mem-table th:nth-child(1), .mem-table td:nth-child(1) {\n    width: 210px !important;\n    min-width: 210px !important;\n  }\n  .mem-table th:nth-child(2), .mem-table td:nth-child(2) {\n    min-width: 260px !important;\n  }\n  .mem-table th:nth-child(3), .mem-table td:nth-child(3) {\n    min-width: 320px !important;\n  }\n  .mem-table th:nth-child(4), .mem-table td:nth-child(4) {\n    min-width: 410px !important;\n  }\n\n  .db-table-mock.idx-table {\n    min-width: 1220px !important;\n  }\n  .idx-table th:nth-child(1), .idx-table td:nth-child(1) {\n    width: 220px !important;\n    min-width: 220px !important;\n  }\n  .idx-table th:nth-child(2), .idx-table td:nth-child(2) {\n    min-width: 360px !important;\n  }\n  .idx-table th:nth-child(3), .idx-table td:nth-child(3) {\n    min-width: 280px !important;\n  }\n  .idx-table th:nth-child(4), .idx-table td:nth-child(4) {\n    min-width: 360px !important;\n  }\n\n  .db-table-mock.slice-table {\n    min-width: 1260px !important;\n  }\n  .slice-table th:nth-child(1), .slice-table td:nth-child(1) {\n    width: 220px !important;\n    min-width: 220px !important;\n  }\n  .slice-table th:nth-child(2), .slice-table td:nth-child(2) {\n    min-width: 360px !important;\n  }\n  .slice-table th:nth-child(3), .slice-table td:nth-child(3) {\n    min-width: 300px !important;\n  }\n  .slice-table th:nth-child(4), .slice-table td:nth-child(4) {\n    min-width: 380px !important;\n  }\n\n  .db-table-mock.methods-table {\n    min-width: 1240px !important;\n  }\n  .methods-table th:nth-child(1), .methods-table td:nth-child(1) {\n    width: 230px !important;\n    min-width: 230px !important;\n  }\n  .methods-table th:nth-child(2), .methods-table td:nth-child(2) {\n    min-width: 320px !important;\n  }\n  .methods-table th:nth-child(3), .methods-table td:nth-child(3) {\n    min-width: 310px !important;\n  }\n  .methods-table th:nth-child(4), .methods-table td:nth-child(4) {\n    min-width: 380px !important;\n  }\n\n  .db-table-mock.unpack-table {\n    min-width: 1260px !important;\n  }\n  .unpack-table th:nth-child(1), .unpack-table td:nth-child(1) {\n    width: 220px !important;\n    min-width: 220px !important;\n  }\n  .unpack-table th:nth-child(2), .unpack-table td:nth-child(2) {\n    min-width: 320px !important;\n  }\n  .unpack-table th:nth-child(3), .unpack-table td:nth-child(3) {\n    min-width: 340px !important;\n  }\n  .unpack-table th:nth-child(4), .unpack-table td:nth-child(4) {\n    min-width: 380px !important;\n  }\n\n  .db-table-mock.matrix-table {\n    min-width: 1280px !important;\n  }\n  .matrix-table th:nth-child(1), .matrix-table td:nth-child(1) {\n    width: 220px !important;\n    min-width: 220px !important;\n  }\n  .matrix-table th:nth-child(2), .matrix-table td:nth-child(2) {\n    min-width: 280px !important;\n  }\n  .matrix-table th:nth-child(3), .matrix-table td:nth-child(3) {\n    min-width: 280px !important;\n  }\n  .matrix-table th:nth-child(4), .matrix-table td:nth-child(4) {\n    min-width: 500px !important;\n  }\n\n  /* Anti-Pattern Table */\n  .db-table-mock.anti-pattern-table {\n    min-width: 1400px !important;\n  }\n  .anti-pattern-table thead th:nth-child(1) {\n    position: -webkit-sticky !important;\n    position: sticky !important;\n    top: 0 !important;\n    left: 0 !important;\n    z-index: 25 !important;\n    background-color: #1a162b !important;\n    border-right: 2px solid rgba(244, 63, 94, 0.5) !important;\n    border-bottom: 2px solid rgba(244, 63, 94, 0.5) !important;\n    color: #fca5a5 !important;\n  }\n  .anti-pattern-table tbody td:nth-child(1) {\n    position: -webkit-sticky !important;\n    position: sticky !important;\n    left: 0 !important;\n    top: auto !important;\n    z-index: 10 !important;\n    background-color: #141024 !important;\n    border-right: 2px solid rgba(244, 63, 94, 0.5) !important;\n    box-shadow: 4px 0 14px -2px rgba(0, 0, 0, 0.65) !important;\n  }\n  .anti-pattern-table tbody tr:hover td:nth-child(1) {\n    background-color: #231835 !important;\n  }\n  .anti-pattern-table th:nth-child(1), .anti-pattern-table td:nth-child(1) {\n    width: 230px !important;\n    min-width: 230px !important;\n    white-space: normal !important;\n    word-break: break-word !important;\n  }\n  .anti-pattern-table td:nth-child(1) code,\n  .anti-pattern-table td:nth-child(1) code.ap-code-bad {\n    display: inline-block !important;\n    max-width: 100% !important;\n    white-space: pre-wrap !important;\n    word-break: break-word !important;\n    overflow-wrap: anywhere !important;\n    background: rgba(244, 63, 94, 0.12) !important;\n    border: 1px solid rgba(244, 63, 94, 0.35) !important;\n    color: #fda4af !important;\n    font-size: 0.82rem !important;\n    line-height: 1.45 !important;\n    padding: 4px 9px !important;\n    border-radius: 5px !important;\n  }\n  .anti-pattern-table th:nth-child(2), .anti-pattern-table td:nth-child(2) {\n    min-width: 290px !important;\n  }\n  .anti-pattern-table td:nth-child(2) .ap-result-bad {\n    color: #fb7185 !important;\n    font-weight: 700 !important;\n  }\n  .anti-pattern-table th:nth-child(3), .anti-pattern-table td:nth-child(3) {\n    min-width: 440px !important;\n  }\n  .anti-pattern-table th:nth-child(4), .anti-pattern-table td:nth-child(4) {\n    min-width: 440px !important;\n  }\n  .anti-pattern-table td:nth-child(4) code,\n  .anti-pattern-table td:nth-child(4) code.ap-code-fix {\n    display: inline-block !important;\n    max-width: 100% !important;\n    white-space: pre-wrap !important;\n    word-break: break-word !important;\n    overflow-wrap: anywhere !important;\n    background: rgba(16, 185, 129, 0.12) !important;\n    border: 1px solid rgba(16, 185, 129, 0.35) !important;\n    color: #6ee7b7 !important;\n    font-size: 0.81rem !important;\n    line-height: 1.45 !important;\n    padding: 4px 9px !important;\n    border-radius: 5px !important;\n  }\n\n  /* Light Theme Adaptation */\n  [data-theme=\"light\"] .db-mock-table-wrap {\n    border: 1px solid #cbd5e1 !important;\n    background: #ffffff !important;\n    box-shadow: 0 4px 16px -2px rgba(15, 23, 42, 0.05) !important;\n  }\n  [data-theme=\"light\"] .db-mock-table-wrap::-webkit-scrollbar-track {\n    background: #f1f5f9 !important;\n  }\n  [data-theme=\"light\"] .db-mock-table-wrap::-webkit-scrollbar-thumb {\n    background: #94a3b8 !important;\n  }\n  [data-theme=\"light\"] .db-table-mock thead th {\n    background-color: #f1f5f9 !important;\n    color: #0f172a !important;\n    border-bottom: 2px solid #cbd5e1 !important;\n  }\n  [data-theme=\"light\"] .db-table-mock td {\n    border-bottom: 1px solid #f1f5f9 !important;\n    color: #334155 !important;\n  }\n  [data-theme=\"light\"] .db-table-mock thead th:nth-child(1) {\n    background-color: #eef2f6 !important;\n    border-right: 2px solid #cbd5e1 !important;\n    border-bottom: 2px solid #cbd5e1 !important;\n    box-shadow: 4px 4px 10px -2px rgba(15, 23, 42, 0.08) !important;\n    color: #0f172a !important;\n  }\n  [data-theme=\"light\"] .db-table-mock tbody td:nth-child(1) {\n    background-color: #ffffff !important;\n    border-right: 2px solid #cbd5e1 !important;\n    box-shadow: 4px 0 10px -2px rgba(0, 0, 0, 0.08) !important;\n    color: #0f172a !important;\n  }\n  html[data-theme=\"light\"] .db-table-mock tbody tr:hover td:nth-child(1),\n  body[data-theme=\"light\"] .db-table-mock tbody tr:hover td:nth-child(1),\n  [data-theme=\"light\"] .db-table-mock tbody tr:hover td:nth-child(1) {\n    background-color: #f1f5f9 !important;\n    opacity: 1 !important;\n    z-index: 15 !important;\n    box-shadow: 4px 0 12px -2px rgba(0, 0, 0, 0.12) !important;\n  }\n  html[data-theme=\"light\"] .db-table-mock tbody tr:hover td:not(:nth-child(1)),\n  body[data-theme=\"light\"] .db-table-mock tbody tr:hover td:not(:nth-child(1)),\n  [data-theme=\"light\"] .db-table-mock tbody tr:hover td:not(:nth-child(1)) {\n    background-color: #f8fafc !important;\n  }\n\n  [data-theme=\"light\"] .anti-pattern-table thead th:nth-child(1) {\n    background-color: #fff1f2 !important;\n    border-right: 2px solid #fda4af !important;\n    border-bottom: 2px solid #fda4af !important;\n    color: #be123c !important;\n  }\n  [data-theme=\"light\"] .anti-pattern-table tbody td:nth-child(1) {\n    background-color: #ffffff !important;\n    border-right: 2px solid #fda4af !important;\n  }\n  [data-theme=\"light\"] .anti-pattern-table tbody tr:hover td:nth-child(1) {\n    background-color: #fff1f2 !important;\n  }\n  [data-theme=\"light\"] .anti-pattern-table td:nth-child(1) code,\n  [data-theme=\"light\"] .anti-pattern-table td:nth-child(1) code.ap-code-bad {\n    background: #ffe4e6 !important;\n    border-color: #fecdd3 !important;\n    color: #e11d48 !important;\n  }\n  [data-theme=\"light\"] .anti-pattern-table td:nth-child(4) code,\n  [data-theme=\"light\"] .anti-pattern-table td:nth-child(4) code.ap-code-fix {\n    background: #ecfdf5 !important;\n    border-color: #a7f3d0 !important;\n    color: #059669 !important;\n  }\n\n  /* Table search input & UI */\n  .table-search-box {\n    position: relative !important;\n    display: inline-flex !important;\n    align-items: center !important;\n  }\n  .table-search-icon {\n    position: absolute !important;\n    left: 9px !important;\n    color: #64748b !important;\n    pointer-events: none !important;\n  }\n  .table-search-input {\n    width: 140px !important;\n    padding: 5px 8px 5px 28px !important;\n    font-size: 0.76rem !important;\n    border-radius: 6px !important;\n    border: 1px solid rgba(255, 255, 255, 0.15) !important;\n    background: rgba(15, 23, 42, 0.6) !important;\n    color: #f1f5f9 !important;\n    outline: none !important;\n    transition: all 0.2s ease !important;\n  }\n  .table-search-input:focus {\n    width: 180px !important;\n    border-color: #38bdf8 !important;\n    background: rgba(15, 23, 42, 0.95) !important;\n    box-shadow: 0 0 10px rgba(56, 189, 248, 0.25) !important;\n  }\n  [data-theme=\"light\"] .table-search-input {\n    background: #ffffff !important;\n    border-color: #cbd5e1 !important;\n    color: #0f172a !important;\n  }\n\n  /* Return Pill Badges */\n  .tbl-ret-str {\n    display: inline-block !important;\n    padding: 1px 6px !important;\n    font-family: 'JetBrains Mono', monospace !important;\n    font-size: 0.80rem !important;\n    font-weight: 600 !important;\n    background: rgba(16, 185, 129, 0.12) !important;\n    border: 1px solid rgba(16, 185, 129, 0.3) !important;\n    border-radius: 4px !important;\n    color: #34d399 !important;\n    white-space: nowrap !important;\n  }\n  .tbl-ret-num {\n    display: inline-block !important;\n    padding: 1px 6px !important;\n    font-family: 'JetBrains Mono', monospace !important;\n    font-size: 0.80rem !important;\n    font-weight: 600 !important;\n    background: rgba(245, 158, 11, 0.12) !important;\n    border: 1px solid rgba(245, 158, 11, 0.3) !important;\n    border-radius: 4px !important;\n    color: #fbbf24 !important;\n    white-space: nowrap !important;\n  }\n  .tbl-ret-tuple {\n    display: inline-block !important;\n    padding: 1px 6px !important;\n    font-family: 'JetBrains Mono', monospace !important;\n    font-size: 0.80rem !important;\n    font-weight: 600 !important;\n    background: rgba(168, 85, 247, 0.12) !important;\n    border: 1px solid rgba(168, 85, 247, 0.3) !important;\n    border-radius: 4px !important;\n    color: #c084fc !important;\n    white-space: nowrap !important;\n  }\n  .tbl-ret-bool {\n    display: inline-block !important;\n    padding: 1px 7px !important;\n    font-family: 'JetBrains Mono', monospace !important;\n    font-size: 0.76rem !important;\n    font-weight: 700 !important;\n    border-radius: 4px !important;\n    white-space: nowrap !important;\n    letter-spacing: 0.02em !important;\n  }\n  .tbl-ret-bool.true {\n    background: rgba(16, 185, 129, 0.15) !important;\n    border: 1px solid rgba(16, 185, 129, 0.35) !important;\n    color: #34d399 !important;\n  }\n  .tbl-ret-bool.false {\n    background: rgba(244, 63, 94, 0.15) !important;\n    border: 1px solid rgba(244, 63, 94, 0.35) !important;\n    color: #fb7185 !important;\n  }\n\n  /* Mental Model Hero Cards (Train Ticket & Sealed Case) */\n  .mental-model-card {\n    display: flex !important;\n    flex-direction: column !important;\n    gap: 12px !important;\n    padding: 18px 20px !important;\n    margin: 16px 0 !important;\n    border-radius: 12px !important;\n    background: linear-gradient(145deg, rgba(15, 23, 42, 0.85) 0%, rgba(10, 16, 30, 0.95) 100%) !important;\n    border: 1px solid rgba(56, 189, 248, 0.25) !important;\n    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3) !important;\n  }\n  .mental-model-header {\n    display: flex !important;\n    align-items: center !important;\n    gap: 12px !important;\n  }\n  .mental-model-badge {\n    display: inline-flex !important;\n    align-items: center !important;\n    justify-content: center !important;\n    padding: 4px 10px !important;\n    border-radius: 6px !important;\n    font-size: 0.78rem !important;\n    font-weight: 700 !important;\n    text-transform: uppercase !important;\n    letter-spacing: 0.04em !important;\n    background: rgba(56, 189, 248, 0.15) !important;\n    border: 1px solid rgba(56, 189, 248, 0.35) !important;\n    color: #38bdf8 !important;\n  }\n  .mental-model-title {\n    font-family: 'Outfit', sans-serif !important;\n    font-size: 1.05rem !important;\n    font-weight: 700 !important;\n    color: #f8fafc !important;\n    margin: 0 !important;\n  }\n  .mental-model-grid {\n    display: grid !important;\n    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)) !important;\n    gap: 14px !important;\n    margin-top: 6px !important;\n  }\n  .model-pane {\n    padding: 14px 16px !important;\n    border-radius: 8px !important;\n    background: rgba(15, 23, 42, 0.5) !important;\n    border: 1px solid rgba(255, 255, 255, 0.08) !important;\n  }\n  .model-pane.pane-list {\n    border-left: 3px solid #f59e0b !important;\n  }\n  .model-pane.pane-tuple {\n    border-left: 3px solid #38bdf8 !important;\n  }\n  .model-pane-title {\n    font-family: 'Outfit', sans-serif !important;\n    font-size: 0.90rem !important;\n    font-weight: 700 !important;\n    margin: 0 0 6px 0 !important;\n  }\n  .model-pane.pane-list .model-pane-title { color: #fbbf24 !important; }\n  .model-pane.pane-tuple .model-pane-title { color: #7dd3fc !important; }\n  .model-pane-desc {\n    font-size: 0.82rem !important;\n    line-height: 1.55 !important;\n    color: #94a3b8 !important;\n    margin: 0 !important;\n    text-align: justify !important;\n    text-align-last: left !important;\n  }\n  [data-theme=\"light\"] .mental-model-card {\n    background: #ffffff !important;\n    border-color: #cbd5e1 !important;\n    box-shadow: 0 4px 16px rgba(15, 23, 42, 0.05) !important;\n  }\n  [data-theme=\"light\"] .mental-model-title {\n    color: #0f172a !important;\n  }\n  [data-theme=\"light\"] .model-pane {\n    background: #f8fafc !important;\n    border-color: #e2e8f0 !important;\n  }\n  [data-theme=\"light\"] .model-pane-desc {\n    color: #475569 !important;\n  }\n\n  /* Code Snippet Box (macos copy styling) */\n  .snippet-code-box {\n    position: relative !important;\n    background: #070d19 !important;\n    border: 1px solid rgba(56, 189, 248, 0.16) !important;\n    border-left: 3px solid #38bdf8 !important;\n    border-radius: 8px !important;\n    padding: 12px 46px 12px 14px !important;\n    margin-top: 10px !important;\n    transition: all 0.2s ease !important;\n    overflow-x: auto !important;\n  }\n  .snippet-code-box pre {\n    margin: 0 !important;\n    padding: 0 !important;\n    background: transparent !important;\n    border: none !important;\n    overflow-x: auto !important;\n  }\n  .snippet-code-box pre code {\n    font-family: 'JetBrains Mono', monospace !important;\n    font-size: 0.85rem !important;\n    line-height: 1.65 !important;\n    color: #e2e8f0 !important;\n    display: block !important;\n    white-space: pre !important;\n  }\n  .copy-snippet-btn {\n    position: absolute !important;\n    top: 8px !important;\n    right: 8px !important;\n    width: 28px !important;\n    height: 28px !important;\n    display: inline-flex !important;\n    align-items: center !important;\n    justify-content: center !important;\n    background: rgba(255, 255, 255, 0.06) !important;\n    border: 1px solid rgba(255, 255, 255, 0.12) !important;\n    border-radius: 6px !important;\n    color: #94a3b8 !important;\n    cursor: pointer !important;\n    transition: all 0.2s ease !important;\n    padding: 0 !important;\n  }\n  .copy-snippet-btn:hover {\n    background: rgba(56, 189, 248, 0.15) !important;\n    border-color: rgba(56, 189, 248, 0.4) !important;\n    color: #38bdf8 !important;\n  }\n  .copy-snippet-btn .check-icon { display: none !important; }\n  .copy-snippet-btn.copied .check-icon { display: block !important; }\n  .copy-snippet-btn.copied .copy-icon { display: none !important; }\n  [data-theme=\"light\"] .snippet-code-box {\n    background: #f8fafc !important;\n    border-color: #cbd5e1 !important;\n    border-left-color: #0284c7 !important;\n  }\n  [data-theme=\"light\"] .snippet-code-box pre code {\n    color: #0f172a !important;\n  }\n\n  /* ═════════════════════════════════════════════════════════════════════\n     HOW TO CREATE A TUPLE (DAY 04 PARITY)\n     ═════════════════════════════════════════════════════════════════════ */\n  .create-list-methods {\n    display: flex !important;\n    flex-direction: column !important;\n    gap: 16px !important;\n    margin-top: 14px !important;\n  }\n  .create-list-method {\n    background: #090e1a !important;\n    border: 1px solid rgba(56, 189, 248, 0.16) !important;\n    border-radius: 10px !important;\n    padding: 14px 16px !important;\n    transition: all 0.2s ease !important;\n  }\n  .create-list-method:hover {\n    border-color: rgba(56, 189, 248, 0.35) !important;\n    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25) !important;\n  }\n  .method-title-wrap {\n    display: flex !important;\n    align-items: center !important;\n    gap: 8px !important;\n    margin-bottom: 8px !important;\n  }\n  .method-bullet {\n    color: #38bdf8 !important;\n    font-size: 1.2rem !important;\n    line-height: 1 !important;\n  }\n  .method-title-text {\n    font-family: 'Outfit', sans-serif !important;\n    font-size: 0.95rem !important;\n    font-weight: 700 !important;\n    color: #f1f5f9 !important;\n  }\n  [data-theme=\"light\"] .create-list-method {\n    background: #ffffff !important;\n    border-color: #e2e8f0 !important;\n    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.03) !important;\n  }\n  [data-theme=\"light\"] .create-list-method:hover {\n    border-color: #38bdf8 !important;\n    box-shadow: 0 6px 18px rgba(56, 189, 248, 0.12) !important;\n  }\n  [data-theme=\"light\"] .method-bullet {\n    color: #0284c7 !important;\n  }\n  [data-theme=\"light\"] .method-title-text {\n    color: #0f172a !important;\n  }\n\n  /* ═════════════════════════════════════════════════════════════════════\n     TEXTBOOK DIAGRAM: DUAL-DIRECTIONAL TUPLE INDEXING (DAY 04 PARITY)\n     ═════════════════════════════════════════════════════════════════════ */\n  .py-diagram-subcard {\n    background: linear-gradient(145deg, rgba(13, 21, 39, 0.95) 0%, rgba(8, 14, 28, 0.98) 100%) !important;\n    border: 1px solid rgba(56, 189, 248, 0.22) !important;\n    border-radius: 14px !important;\n    padding: 22px 24px !important;\n    margin: 18px 0 !important;\n    box-shadow: 0 10px 32px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.08) !important;\n    transition: all 0.25s ease !important;\n  }\n  .py-diagram-subcard:hover {\n    border-color: rgba(56, 189, 248, 0.35) !important;\n    box-shadow: 0 14px 40px rgba(0, 0, 0, 0.55), 0 0 24px rgba(56, 189, 248, 0.08) !important;\n  }\n\n  .diagram-wrap {\n    display: flex !important;\n    flex-direction: column !important;\n    gap: 12px !important;\n    width: 100% !important;\n    max-width: 680px !important;\n    margin: 0 auto !important;\n  }\n\n  /* Directional Flow Banners */\n  .flow-banner-neg,\n  .flow-banner-pos {\n    display: flex !important;\n    align-items: center !important;\n    justify-content: space-between !important;\n    gap: 14px !important;\n    padding: 9px 16px !important;\n    border-radius: 8px !important;\n    transition: all 0.2s ease !important;\n  }\n  .flow-banner-neg {\n    background: rgba(244, 63, 94, 0.07) !important;\n    border: 1px dashed rgba(244, 63, 94, 0.32) !important;\n  }\n  .flow-banner-pos {\n    background: rgba(56, 189, 248, 0.07) !important;\n    border: 1px dashed rgba(56, 189, 248, 0.32) !important;\n  }\n\n  .banner-arrow-track {\n    display: flex !important;\n    align-items: center !important;\n    flex: 1 !important;\n    min-width: 100px !important;\n  }\n  .banner-line-neg {\n    flex: 1 !important;\n    height: 3px !important;\n    border-radius: 2px !important;\n    background: linear-gradient(90deg, #f43f5e 0%, rgba(244, 63, 94, 0.15) 100%) !important;\n  }\n  .banner-line-pos {\n    flex: 1 !important;\n    height: 3px !important;\n    border-radius: 2px !important;\n    background: linear-gradient(90deg, rgba(56, 189, 248, 0.15) 0%, #38bdf8 100%) !important;\n  }\n  .arrow-svg-left {\n    color: #f43f5e !important;\n    flex-shrink: 0 !important;\n    margin-right: -2px !important;\n  }\n  .arrow-svg-right {\n    color: #38bdf8 !important;\n    flex-shrink: 0 !important;\n    margin-left: -2px !important;\n  }\n\n  .banner-info-wrap {\n    display: flex !important;\n    align-items: baseline !important;\n    gap: 8px !important;\n    flex-shrink: 0 !important;\n  }\n  .banner-label-neg {\n    font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif !important;\n    font-size: 0.92rem !important;\n    font-weight: 800 !important;\n    color: #fda4af !important;\n    letter-spacing: -0.01em !important;\n  }\n  .banner-label-pos {\n    font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif !important;\n    font-size: 0.92rem !important;\n    font-weight: 800 !important;\n    color: #7dd3fc !important;\n    letter-spacing: -0.01em !important;\n  }\n  .banner-subtext {\n    font-size: 0.74rem !important;\n    color: #94a3b8 !important;\n  }\n\n  /* Matrix Stage */\n  .matrix-stage {\n    display: flex !important;\n    align-items: center !important;\n    justify-content: center !important;\n    gap: 6px !important;\n    padding: 12px 2px !important;\n    width: 100% !important;\n  }\n  .matrix-bracket {\n    font-family: 'JetBrains Mono', monospace !important;\n    font-size: 3.2rem !important;\n    font-weight: 300 !important;\n    color: #38bdf8 !important;\n    line-height: 1 !important;\n    user-select: none !important;\n    text-shadow: 0 0 16px rgba(56, 189, 248, 0.35) !important;\n    display: flex !important;\n    align-items: center !important;\n  }\n  .pillars-row {\n    display: grid !important;\n    grid-template-columns: repeat(4, 1fr) !important;\n    gap: 14px !important;\n    flex: 1 !important;\n    max-width: 580px !important;\n  }\n\n  /* Pillar & Components */\n  .index-pillar {\n    display: flex !important;\n    flex-direction: column !important;\n    align-items: center !important;\n    position: relative !important;\n    padding: 2px !important;\n    border-radius: 10px !important;\n    transition: all 0.22s cubic-bezier(0.4, 0, 0.2, 1) !important;\n    cursor: default !important;\n  }\n  .idx-badge {\n    display: flex !important;\n    align-items: center !important;\n    justify-content: center !important;\n    min-width: 48px !important;\n    height: 32px !important;\n    padding: 0 10px !important;\n    border-radius: 6px !important;\n    font-family: 'JetBrains Mono', monospace !important;\n    font-size: 0.9rem !important;\n    font-weight: 800 !important;\n    transition: all 0.2s ease !important;\n  }\n  .badge-neg {\n    background: rgba(244, 63, 94, 0.14) !important;\n    border: 1.5px solid rgba(244, 63, 94, 0.4) !important;\n    color: #fda4af !important;\n  }\n  .badge-pos {\n    background: rgba(56, 189, 248, 0.14) !important;\n    border: 1.5px solid rgba(56, 189, 248, 0.4) !important;\n    color: #7dd3fc !important;\n  }\n\n  .pillar-stem {\n    width: 2px !important;\n    height: 16px !important;\n    opacity: 0.75 !important;\n    transition: all 0.2s ease !important;\n  }\n  .stem-neg {\n    background: linear-gradient(180deg, #f43f5e 0%, rgba(244, 63, 94, 0.2) 100%) !important;\n  }\n  .stem-pos {\n    background: linear-gradient(180deg, rgba(56, 189, 248, 0.2) 0%, #38bdf8 100%) !important;\n  }\n\n  .element-cell-wrap {\n    display: flex !important;\n    align-items: center !important;\n    justify-content: center !important;\n    position: relative !important;\n    width: 100% !important;\n  }\n  .element-tile {\n    display: flex !important;\n    align-items: center !important;\n    justify-content: center !important;\n    width: 100% !important;\n    padding: 11px 8px !important;\n    background: linear-gradient(180deg, #0d172e 0%, #070e1e 100%) !important;\n    border: 1.5px solid rgba(255, 255, 255, 0.12) !important;\n    border-radius: 8px !important;\n    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.08) !important;\n    transition: all 0.22s ease !important;\n  }\n  .quote-mark {\n    font-family: 'JetBrains Mono', monospace !important;\n    font-size: 0.95rem !important;\n    font-weight: 700 !important;\n    color: #fbbf24 !important;\n  }\n  .elem-text {\n    font-family: 'JetBrains Mono', monospace !important;\n    font-size: 0.95rem !important;\n    font-weight: 800 !important;\n    color: #f8fafc !important;\n    letter-spacing: 0.01em !important;\n  }\n  .tile-comma {\n    font-family: 'JetBrains Mono', monospace !important;\n    font-size: 1.4rem !important;\n    font-weight: 700 !important;\n    color: #64748b !important;\n    position: absolute !important;\n    right: -10px !important;\n    top: 50% !important;\n    transform: translateY(-50%) !important;\n    user-select: none !important;\n  }\n\n  .index-pillar:hover .element-tile {\n    border-color: #38bdf8 !important;\n    box-shadow: 0 8px 22px rgba(56, 189, 248, 0.25), 0 0 16px rgba(56, 189, 248, 0.15) !important;\n    transform: translateY(-2px) !important;\n  }\n  .index-pillar:hover .badge-neg {\n    border-color: #f43f5e !important;\n    box-shadow: 0 0 12px rgba(244, 63, 94, 0.5) !important;\n  }\n  .index-pillar:hover .badge-pos {\n    border-color: #38bdf8 !important;\n    box-shadow: 0 0 12px rgba(56, 189, 248, 0.5) !important;\n  }\n  .index-pillar:hover .pillar-stem {\n    opacity: 1 !important;\n  }\n\n  /* Summary Bar */\n  .diagram-key-takeaways {\n    display: flex !important;\n    flex-wrap: wrap !important;\n    align-items: center !important;\n    justify-content: space-between !important;\n    gap: 12px !important;\n    padding-top: 14px !important;\n    margin-top: 12px !important;\n    border-top: 1px dashed rgba(255, 255, 255, 0.1) !important;\n  }\n  .takeaway-item {\n    display: inline-flex !important;\n    align-items: center !important;\n    gap: 6px !important;\n    font-size: 0.78rem !important;\n    color: #cbd5e1 !important;\n  }\n  .takeaway-tag {\n    font-size: 0.72rem !important;\n    font-weight: 700 !important;\n    text-transform: uppercase !important;\n    letter-spacing: 0.04em !important;\n  }\n  .tag-pos { color: #38bdf8 !important; }\n  .tag-neg { color: #f43f5e !important; }\n  .tag-formula { color: #fbbf24 !important; }\n  .takeaway-item code {\n    font-family: 'JetBrains Mono', monospace !important;\n    font-size: 0.78rem !important;\n    padding: 2px 6px !important;\n    background: rgba(0, 0, 0, 0.4) !important;\n    border: 1px solid rgba(255, 255, 255, 0.1) !important;\n    border-radius: 4px !important;\n    color: #f1f5f9 !important;\n  }\n  .takeaway-divider {\n    color: #64748b !important;\n  }\n\n  /* Light Theme Diagram Overrides */\n  [data-theme=\"light\"] .py-diagram-subcard {\n    background: #ffffff !important;\n    border-color: #e2e8f0 !important;\n    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.02) !important;\n  }\n  [data-theme=\"light\"] .py-diagram-subcard:hover {\n    border-color: #38bdf8 !important;\n    box-shadow: 0 12px 30px rgba(56, 189, 248, 0.1) !important;\n  }\n  [data-theme=\"light\"] .flow-banner-neg {\n    background: #fff1f2 !important;\n    border-color: #fecdd3 !important;\n  }\n  [data-theme=\"light\"] .flow-banner-pos {\n    background: #f0f9ff !important;\n    border-color: #bae6fd !important;\n  }\n  [data-theme=\"light\"] .banner-line-neg {\n    background: linear-gradient(90deg, #e11d48 0%, rgba(225, 29, 72, 0.15) 100%) !important;\n  }\n  [data-theme=\"light\"] .banner-line-pos {\n    background: linear-gradient(90deg, rgba(2, 132, 199, 0.15) 0%, #0284c7 100%) !important;\n  }\n  [data-theme=\"light\"] .arrow-svg-left { color: #e11d48 !important; }\n  [data-theme=\"light\"] .arrow-svg-right { color: #0284c7 !important; }\n  [data-theme=\"light\"] .banner-label-neg { color: #be123c !important; }\n  [data-theme=\"light\"] .banner-label-pos { color: #0369a1 !important; }\n  [data-theme=\"light\"] .banner-subtext { color: #64748b !important; }\n  [data-theme=\"light\"] .matrix-bracket {\n    color: #0284c7 !important;\n    text-shadow: none !important;\n  }\n  [data-theme=\"light\"] .badge-neg {\n    background: #ffe4e6 !important;\n    border-color: #fecdd3 !important;\n    color: #be123c !important;\n  }\n  [data-theme=\"light\"] .badge-pos {\n    background: #e0f2fe !important;\n    border-color: #bae6fd !important;\n    color: #0369a1 !important;\n  }\n  [data-theme=\"light\"] .stem-neg {\n    background: linear-gradient(180deg, #e11d48 0%, rgba(225, 29, 72, 0.2) 100%) !important;\n  }\n  [data-theme=\"light\"] .stem-pos {\n    background: linear-gradient(180deg, rgba(2, 132, 199, 0.2) 0%, #0284c7 100%) !important;\n  }\n  [data-theme=\"light\"] .element-tile {\n    background: #f8fafc !important;\n    border-color: #cbd5e1 !important;\n    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04) !important;\n  }\n  [data-theme=\"light\"] .index-pillar:hover .element-tile {\n    border-color: #0284c7 !important;\n    box-shadow: 0 6px 18px rgba(2, 132, 199, 0.15) !important;\n  }\n  [data-theme=\"light\"] .quote-mark { color: #d97706 !important; }\n  [data-theme=\"light\"] .elem-text { color: #0f172a !important; }\n  [data-theme=\"light\"] .tile-comma { color: #94a3b8 !important; }\n  [data-theme=\"light\"] .diagram-key-takeaways { border-top-color: #e2e8f0 !important; }\n\n\n</style>\n\n<!-- ═══ SECTION 01: Tuple Fundamentals & The Train Ticket Mental Model ═══ -->\n<div class=\"slide-section\" id=\"day05FundamentalsSection\">\n  <h2 class=\"slide-section-title heading-box-wrap heading-with-audio\" id=\"headingFundamentals\">\n    <span class=\"heading-num-box\">01</span>\n    <span class=\"heading-title-box\">\n      <span class=\"heading-title-text\">Tuple Fundamentals</span>\n      <button class=\"audio-play-btn\" onclick=\"playAudio('Day05/New_PyDay05Audio01.mp3', this)\" title=\"Play narration\">\n        <svg class=\"play-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M8 5v14l11-7z\"/></svg>\n      </button>\n    </span>\n  </h2>\n  <p class=\"section-intro-text\">A <strong>Tuple</strong> is an ordered, immutable collection of elements in Python. Once created, a tuple's contents and ordering cannot be changed, resized, or reassigned. In data analytics and systems engineering, tuples represent fixed records, coordinate points, database rows, and function multi-returns that demand structural integrity.</p>\n\n  <!-- The Train Ticket vs Shopping List Mental Model -->\n  <div class=\"mental-model-card\">\n    <div class=\"mental-model-header\">\n      <span class=\"mental-model-badge\">Core Mental Model</span>\n      <h4 class=\"mental-model-title\">The Train Ticket vs The Shopping List</h4>\n    </div>\n    <div class=\"mental-model-grid\">\n      <div class=\"model-pane pane-list\">\n        <h5 class=\"model-pane-title\">List: The Shopping List in Pencil ✏️</h5>\n        <p class=\"model-pane-desc\">A Python list is like a grocery shopping list written in pencil. You can add items at the bottom, erase an item you already picked up, or rearrange items by store aisle. Its length and contents change fluidly throughout execution.</p>\n      </div>\n      <div class=\"model-pane pane-tuple\">\n        <h5 class=\"model-pane-title\">Tuple: The Printed Train Ticket 🎫</h5>\n        <p class=\"model-pane-desc\">A Python tuple is like a printed train ticket. Once issued, your passenger name, coach number, seat assignment, and departure date are permanently stamped. You cannot erase or swap your seat without buying an entirely new ticket.</p>\n      </div>\n    </div>\n  </div>\n\n  <!-- Fundamentals How to Create a Tuple Subcard (Day 04 Parity) -->\n  <div class=\"topic-subcard\" id=\"day05FundamentalsCreateSection\">\n    <div class=\"subcard-header-with-audio\">\n      <h4 class=\"subcard-header-title\">How to Create a Tuple</h4>\n      <button class=\"audio-play-btn\" onclick=\"playAudio('Day05/New_PyDay05Audio02.mp3', this)\" title=\"Play narration\">\n        <svg class=\"play-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M8 5v14l11-7z\"/></svg>\n      </button>\n    </div>\n    <p class=\"section-intro-text\">In Python we can create tuples in three standard ways:</p>\n\n    <div class=\"create-list-methods\">\n      <!-- Method 1: Using tuple built-in function -->\n      <div class=\"create-list-method\">\n        <div class=\"method-title-wrap\">\n          <span class=\"method-bullet\">&bull;</span>\n          <span class=\"method-title-text\">Using tuple() built-in constructor</span>\n        </div>\n        <div class=\"snippet-code-box\">\n        <button class=\"copy-snippet-btn\" onclick=\"copySnippetCode(this)\" title=\"Copy code\" aria-label=\"Copy code\">\n          <svg class=\"copy-icon\" width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n            <rect x=\"9\" y=\"9\" width=\"13\" height=\"13\" rx=\"2\" ry=\"2\"></rect>\n            <path d=\"M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1\"></path>\n          </svg>\n          <svg class=\"check-icon\" width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n            <polyline points=\"20 6 9 17 4 12\"></polyline>\n          </svg>\n        </button>\n        <pre><code><span class=\"code-comment\"># syntax</span>\ntpl = <span class=\"code-fn\">tuple</span>()</code></pre>\n      </div>\n        <div class=\"snippet-code-box\">\n        <button class=\"copy-snippet-btn\" onclick=\"copySnippetCode(this)\" title=\"Copy code\" aria-label=\"Copy code\">\n          <svg class=\"copy-icon\" width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n            <rect x=\"9\" y=\"9\" width=\"13\" height=\"13\" rx=\"2\" ry=\"2\"></rect>\n            <path d=\"M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1\"></path>\n          </svg>\n          <svg class=\"check-icon\" width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n            <polyline points=\"20 6 9 17 4 12\"></polyline>\n          </svg>\n        </button>\n        <pre><code>empty_tuple = <span class=\"code-fn\">tuple</span>() <span class=\"code-comment\"># empty tuple, length 0</span>\n<span class=\"code-fn\">print</span>(<span class=\"code-fn\">len</span>(empty_tuple)) <span class=\"code-comment\"># Output: 0</span></code></pre>\n      </div>\n      </div>\n\n      <!-- Method 2: Using parentheses, () -->\n      <div class=\"create-list-method\">\n        <div class=\"method-title-wrap\">\n          <span class=\"method-bullet\">&bull;</span>\n          <span class=\"method-title-text\">Using literal parentheses, ()</span>\n        </div>\n        <div class=\"snippet-code-box\">\n        <button class=\"copy-snippet-btn\" onclick=\"copySnippetCode(this)\" title=\"Copy code\" aria-label=\"Copy code\">\n          <svg class=\"copy-icon\" width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n            <rect x=\"9\" y=\"9\" width=\"13\" height=\"13\" rx=\"2\" ry=\"2\"></rect>\n            <path d=\"M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1\"></path>\n          </svg>\n          <svg class=\"check-icon\" width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n            <polyline points=\"20 6 9 17 4 12\"></polyline>\n          </svg>\n        </button>\n        <pre><code><span class=\"code-comment\"># syntax</span>\ntpl = ()</code></pre>\n      </div>\n        <div class=\"snippet-code-box\">\n        <button class=\"copy-snippet-btn\" onclick=\"copySnippetCode(this)\" title=\"Copy code\" aria-label=\"Copy code\">\n          <svg class=\"copy-icon\" width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n            <rect x=\"9\" y=\"9\" width=\"13\" height=\"13\" rx=\"2\" ry=\"2\"></rect>\n            <path d=\"M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1\"></path>\n          </svg>\n          <svg class=\"check-icon\" width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n            <polyline points=\"20 6 9 17 4 12\"></polyline>\n          </svg>\n        </button>\n        <pre><code>fruits = (<span class=\"code-str\">'banana'</span>, <span class=\"code-str\">'orange'</span>, <span class=\"code-str\">'mango'</span>, <span class=\"code-str\">'lemon'</span>)\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">'Fruits:'</span>, fruits)\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">'Length:'</span>, <span class=\"code-fn\">len</span>(fruits)) <span class=\"code-comment\"># Output: 4</span></code></pre>\n      </div>\n      </div>\n\n      <!-- Method 3: The Single-Element Trap -->\n      <div class=\"create-list-method\">\n        <div class=\"method-title-wrap\">\n          <span class=\"method-bullet\">&bull;</span>\n          <span class=\"method-title-text\">Single-item tuple with trailing comma, (item,)</span>\n        </div>\n        <div class=\"snippet-code-box\">\n        <button class=\"copy-snippet-btn\" onclick=\"copySnippetCode(this)\" title=\"Copy code\" aria-label=\"Copy code\">\n          <svg class=\"copy-icon\" width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n            <rect x=\"9\" y=\"9\" width=\"13\" height=\"13\" rx=\"2\" ry=\"2\"></rect>\n            <path d=\"M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1\"></path>\n          </svg>\n          <svg class=\"check-icon\" width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n            <polyline points=\"20 6 9 17 4 12\"></polyline>\n          </svg>\n        </button>\n        <pre><code><span class=\"code-comment\"># CRITICAL: Trailing comma is mandatory for 1-item tuples!</span>\nsingle_tuple = (<span class=\"code-str\">'Python'</span>,)\nnot_a_tuple = (<span class=\"code-str\">'Python'</span>) <span class=\"code-comment\"># Evaluates to string 'Python'</span>\n<span class=\"code-fn\">print</span>(<span class=\"code-fn\">type</span>(single_tuple)) <span class=\"code-comment\"># Output: &lt;class 'tuple'&gt;</span></code></pre>\n      </div>\n      </div>\n    </div>\n  </div>\n\n    <!-- Code Container Subcard -->\n  <div class=\"topic-subcard\" id=\"day05FundamentalsCodeSection\">\n    <div class=\"subcard-header-with-audio\">\n      <h4 class=\"subcard-header-title\">Tuple Syntax, Commas &amp; The Single-Element Trap</h4>\n      <button class=\"audio-play-btn\" onclick=\"playAudio('Day05/New_PyDay05Audio02.mp3', this)\" title=\"Play narration\">\n        <svg class=\"play-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M8 5v14l11-7z\"/></svg>\n      </button>\n    </div>\n    <div class=\"code-block-container\">\n      <div class=\"code-subblock\">\n        <pre><code><span class=\"code-comment\"># 1. Creating Empty Tuples</span>\nempty_a = ()               <span class=\"code-comment\"># Literal syntax</span>\nempty_b = <span class=\"code-fn\">tuple</span>()          <span class=\"code-comment\"># Built-in constructor function</span>\n<span class=\"code-fn\">print</span>(empty_a, <span class=\"code-fn\">len</span>(empty_a))  <span class=\"code-comment\"># Output: () 0</span>\n\n<span class=\"code-comment\"># 2. Creating Multi-Element Tuples (Parentheses are Optional!)</span>\nfruits = (<span class=\"code-str\">'banana'</span>, <span class=\"code-str\">'orange'</span>, <span class=\"code-str\">'mango'</span>, <span class=\"code-str\">'lemon'</span>)\nrgb = 255, 128, 0          <span class=\"code-comment\"># Commas build the tuple!</span>\n<span class=\"code-fn\">print</span>(<span class=\"code-fn\">type</span>(rgb))           <span class=\"code-comment\"># Output: &lt;class 'tuple'&gt;</span>\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">\"fruits length:\"</span>, <span class=\"code-fn\">len</span>(fruits))  <span class=\"code-comment\"># Output: 4</span>\n\n<span class=\"code-comment\"># 3. Heterogeneous Items (Mixed Data Types)</span>\nperson = (<span class=\"code-str\">'Asha'</span>, 28, <span class=\"code-kw\">True</span>, [<span class=\"code-str\">'SQL'</span>, <span class=\"code-str\">'Python'</span>])\n<span class=\"code-fn\">print</span>(person[0], person[1]) <span class=\"code-comment\"># Output: Asha 28</span>\n\n<span class=\"code-comment\"># 4. ⚠️ CRITICAL TRAP: The Single-Element Comma Rule</span>\nnot_a_tuple = (42)         <span class=\"code-comment\"># Just an integer in brackets (like math (2 + 3))</span>\nvalid_tuple = (42,)        <span class=\"code-comment\"># The trailing comma tells Python this is a TUPLE!</span>\n<span class=\"code-fn\">print</span>(<span class=\"code-fn\">type</span>(not_a_tuple))   <span class=\"code-comment\"># Output: &lt;class 'int'&gt;</span>\n<span class=\"code-fn\">print</span>(<span class=\"code-fn\">type</span>(valid_tuple))   <span class=\"code-comment\"># Output: &lt;class 'tuple'&gt;</span></code></pre>\n      </div>\n    </div>\n  </div>\n\n    <!-- 💡 Key Notes -->\n  <div class=\"py-recall-hook py-keynotes-card\">\n    <div class=\"py-keynotes-icon-wrap\">💡</div>\n    <div class=\"py-recall-body py-keynotes-body\">\n      <div class=\"py-recall-header py-keynotes-header\">\n        <span class=\"py-recall-title py-keynotes-title\">Key Notes</span>\n        <span class=\"py-recall-tag py-keynotes-tag\">TUPLE SYNTAX &amp; INITIALIZATION RULES</span>\n      </div>\n      <ul class=\"py-keynotes-list\">\n        <li><strong>Commas Define the Tuple:</strong> In Python, it is the comma <code>,</code> that creates a tuple, not the parentheses. Parentheses are only required to disambiguate syntax (e.g. in function arguments or nested collections).</li>\n        <li><strong>The Single-Item Comma Rule:</strong> <code>(item,)</code> is required for single-element tuples. Writing <code>(item)</code> simply wraps the expression in parentheses and evaluates to the item itself.</li>\n        <li><strong>Length Inspection:</strong> <code>len(tpl)</code> computes the element count in $O(1)$ constant time by inspecting the internal CPython struct member <code>ob_size</code>.</li>\n        <li><strong>Heterogeneous Storage:</strong> Tuples can store integers, strings, floats, booleans, nested lists, and nested tuples simultaneously as object pointers in RAM.</li>\n      </ul>\n    </div>\n  </div>\n</div>\n<!-- ═══ SECTION 02: Memory Architecture & Immutability ═══ -->\n<div class=\"slide-section\" id=\"day05MemorySection\">\n  <h2 class=\"slide-section-title heading-box-wrap heading-with-audio\" id=\"headingMemory\">\n    <span class=\"heading-num-box\">02</span>\n    <span class=\"heading-title-box\">\n      <span class=\"heading-title-text\">Tuple Memory Architecture</span>\n      <button class=\"audio-play-btn\" onclick=\"playAudio('Day05/New_PyDay05Audio03.mp3', this)\" title=\"Play narration\">\n        <svg class=\"play-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M8 5v14l11-7z\"/></svg>\n      </button>\n    </span>\n  </h2>\n  <p class=\"section-intro-text\">Why does Python need tuples when lists already exist? The answer lies in <strong>CPython memory efficiency</strong> and <strong>data integrity guarantees</strong>. Under the hood, a tuple is a fixed-size, contiguous array of 64-bit object pointers (<code>PyTupleObject</code>) allocated with exact byte boundaries.</p>\n\n  <!-- The Sealed Display Case Mental Model -->\n  <div class=\"mental-model-card\">\n    <div class=\"mental-model-header\">\n      <span class=\"mental-model-badge\">Mutability Model</span>\n      <h4 class=\"mental-model-title\">The Sealed Museum Display Case 🏛️</h4>\n    </div>\n    <div class=\"mental-model-grid\">\n      <div class=\"model-pane pane-tuple\">\n        <h5 class=\"model-pane-title\">The Display Pedestals are Sealed Solid 🔒</h5>\n        <p class=\"model-pane-desc\">Think of a tuple as a locked museum glass case with fixed pedestals. You cannot add a pedestal, remove a pedestal, or swap one pedestal for another. Reassigning <code>t[0] = ...</code> raises <code>TypeError: 'tuple' object does not support item assignment</code>.</p>\n      </div>\n      <div class=\"model-pane pane-list\">\n        <h5 class=\"model-pane-title\">An Open Notebook on a Pedestal Can Still Be Written In! 📖</h5>\n        <p class=\"model-pane-desc\">If pedestal #2 holds an open notebook (a mutable object like a <strong>list</strong>), someone can still write inside the pages of that notebook (<code>t[1].append('new')</code>). The tuple still points to the exact same list in RAM, but the list's internal contents have mutated!</p>\n      </div>\n    </div>\n  </div>\n\n    <!-- 💡 Key Notes -->\n  <div class=\"py-recall-hook py-keynotes-card\">\n    <div class=\"py-keynotes-icon-wrap\">💡</div>\n    <div class=\"py-recall-body py-keynotes-body\">\n      <div class=\"py-recall-header py-keynotes-header\">\n        <span class=\"py-recall-title py-keynotes-title\">Key Notes</span>\n        <span class=\"py-recall-tag py-keynotes-tag\">HOW TO READ THIS ARCHITECTURE SECTION</span>\n      </div>\n      <ul class=\"py-keynotes-list\">\n        <li><strong>No C Knowledge Required:</strong> Do not worry about memorizing internal C struct names like <code>PyTupleObject</code> or <code>ob_refcnt</code>! Python handles all low-level memory allocation automatically.</li>\n        <li><strong>The 3 Takeaways for Data Analysts &amp; Engineers:</strong> (1) Tuples consume significantly less RAM than lists, (2) Tuples protect mission-critical data from accidental in-place mutations, and (3) Python creates and iterates them faster.</li>\n        <li><strong>Immutable Container vs Mutable Contents:</strong> The tuple's pointer slots are permanently frozen in RAM, but any mutable object inside a slot (like a list) can still mutate via in-place methods (<code>.append()</code>, <code>.extend()</code>).</li>\n        <li><strong>Why += Fails While .extend() Works:</strong> Augmented assignment <code>t[1] += [100]</code> executes an in-place list addition (modifying the list), followed by a bytecode reassignment to <code>t[1]</code> which raises <code>TypeError: 'tuple' object does not support item assignment</code>. Always use <code>t[1].extend([100])</code> which mutates the list without triggering a tuple assignment!</li>\n        <li><strong>Your Interview Edge:</strong> The CPython architecture table below gives you senior-level engineering intuition that directly impresses FAANG and high-growth startup interviewers.</li>\n      </ul>\n    </div>\n  </div>\n\n  <!-- Memory Architecture Comparison Table Subcard (Day 04 Parity) -->\n  <div class=\"topic-subcard\" id=\"day05MemoryTableSection\">\n    <div class=\"table-header-wrap\">\n      <h4 class=\"table-header-title\">CPython Memory Architecture: PyTupleObject vs PyListObject</h4>\n      <div class=\"table-header-actions\">\n        <div class=\"table-search-box\">\n        <svg class=\"table-search-icon\" width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\"><circle cx=\"11\" cy=\"11\" r=\"8\"/><path d=\"m21 21-4.3-4.3\"/></svg>\n        <input type=\"text\" class=\"table-search-input\" placeholder=\"Search memory...\" oninput=\"filterTableRows(this)\" />\n      </div>\n        <button class=\"audio-play-btn\" onclick=\"playAudio('Day05/New_PyDay05Audio04.mp3', this)\" title=\"Play narration\">\n        <svg class=\"play-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M8 5v14l11-7z\"/></svg>\n      </button>\n      </div>\n    </div>\n    <div class=\"db-mock-table-wrap\">\n      <table class=\"db-table-mock mem-table\">\n        <thead>\n          <tr>\n            <th>Architectural Attribute</th>\n            <th>Tuple (PyTupleObject)</th>\n            <th>List (PyListObject)</th>\n            <th>Engineering Impact &amp; FAANG Significance</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n            <td><code>Internal C Struct</code></td>\n            <td><code>PyObject* ob_item[1]</code> (fixed array)</td>\n            <td><code>PyObject** ob_item</code> (dynamic pointer)</td>\n            <td>Tuples have zero pointer indirection overhead; lists require separate heap allocation for dynamic buffer.</td>\n          </tr>\n          <tr>\n            <td><code>Buffer Allocation</code></td>\n            <td><strong>Exact</strong> (no over-allocation)</td>\n            <td><strong>Over-allocated</strong> (growth factor ~1.125)</td>\n            <td>Lists allocate extra unused slots to achieve amortized $O(1)$ appends; tuples waste 0 bytes of RAM.</td>\n          </tr>\n          <tr>\n            <td><code>Empty Container Size</code></td>\n            <td><span class=\"tbl-ret-num\">40 bytes</span> (64-bit CPython)</td>\n            <td><span class=\"tbl-ret-num\">56 bytes</span> (64-bit CPython)</td>\n            <td>Empty list consumes 40% more memory than an empty tuple due to dynamic resizing state fields.</td>\n          </tr>\n          <tr>\n            <td><code>CPython Free List</code></td>\n            <td><strong>Yes</strong> (cached sizes 1 to 20)</td>\n            <td>Limited free list (recycles list structs only)</td>\n            <td>Deallocated small tuples are recycled into CPython free lists, drastically reducing <code>malloc()</code> syscall overhead.</td>\n          </tr>\n          <tr>\n            <td><code>Hashability</code></td>\n            <td><span class=\"tbl-ret-bool true\">Hashable</span> (if all elements are hashable)</td>\n            <td><span class=\"tbl-ret-bool false\">Unhashable</span> (raises <code>TypeError</code>)</td>\n            <td>Tuples can serve as dictionary keys and set elements; lists strictly cannot.</td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n  </div>\n\n    <!-- Code Container Subcard -->\n  <div class=\"topic-subcard\" id=\"day05MemoryCodeSection\">\n    <div class=\"subcard-header-with-audio\">\n      <h4 class=\"subcard-header-title\">Memory Footprints &amp; The Mutable-Item-Inside-Tuple Trap</h4>\n      <button class=\"audio-play-btn\" onclick=\"playAudio('Day05/New_PyDay05Audio05.mp3', this)\" title=\"Play narration\">\n        <svg class=\"play-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M8 5v14l11-7z\"/></svg>\n      </button>\n    </div>\n    <div class=\"code-block-container\">\n      <div class=\"code-subblock\">\n        <pre><code>import sys\n\n<span class=\"code-comment\"># 1. Memory Footprint Comparison</span>\nempty_tuple = ()\nempty_list = []\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">\"Empty Tuple Bytes:\"</span>, sys.<span class=\"code-fn\">getsizeof</span>(empty_tuple))  <span class=\"code-comment\"># Output: 40 bytes</span>\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">\"Empty List Bytes: \"</span>, sys.<span class=\"code-fn\">getsizeof</span>(empty_list))   <span class=\"code-comment\"># Output: 56 bytes</span>\n\nsample_tuple = (1, 2, 3)\nsample_list = [1, 2, 3]\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">\"Tuple(3) Bytes:\"</span>, sys.<span class=\"code-fn\">getsizeof</span>(sample_tuple))    <span class=\"code-comment\"># Output: 64 bytes</span>\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">\"List(3) Bytes: \"</span>, sys.<span class=\"code-fn\">getsizeof</span>(sample_list))     <span class=\"code-comment\"># Output: 88 bytes</span>\n\n<span class=\"code-comment\"># 2. Immutability in Action</span>\ncoords = (10, 20)\n<span class=\"code-kw\">try</span>:\n    coords[0] = 99\n<span class=\"code-kw\">except</span> <span class=\"code-err\">TypeError</span> <span class=\"code-kw\">as</span> err:\n    <span class=\"code-fn\">print</span>(<span class=\"code-str\">\"Caught Expected Error:\"</span>, err)\n    <span class=\"code-comment\"># Output: 'tuple' object does not support item assignment</span>\n\n<span class=\"code-comment\"># 3. The Sealed Display Case: Mutable List Inside a Tuple</span>\nmixed = (10, [20, 30], 40)\nmixed[1].<span class=\"code-fn\">append</span>(99)  <span class=\"code-comment\"># Mutating the list in-place is 100% VALID!</span>\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">\"Mutated Inner List:\"</span>, mixed)  <span class=\"code-comment\"># (10, [20, 30, 99], 40)</span>\n\n<span class=\"code-comment\"># 4. ⚠️ THE PYTHON GOTCHA: Augmented Assignment (+=) on Nested List</span>\n<span class=\"code-kw\">try</span>:\n    mixed[1] += [100]  <span class=\"code-comment\"># Mutates list in-place AND THEN attempts tuple slot reassignment!</span>\n<span class=\"code-kw\">except</span> <span class=\"code-err\">TypeError</span> <span class=\"code-kw\">as</span> err:\n    <span class=\"code-fn\">print</span>(<span class=\"code-str\">\"+= Error Raised:\"</span>, err)  <span class=\"code-comment\"># 'tuple' object does not support item assignment</span>\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">\"Notice 100 was still added!:\"</span>, mixed)  <span class=\"code-comment\"># (10, [20, 30, 99, 100], 40)</span>\n\n<span class=\"code-comment\"># 5. Production Clean Fix: .extend() avoids the assignment trap!</span>\nmixed[1].<span class=\"code-fn\">extend</span>([200])  <span class=\"code-comment\"># Direct method call; NO STORE_SUBSCR bytecode emitted on tuple!</span>\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">\"Cleanly Extended Inner List:\"</span>, mixed)  <span class=\"code-comment\"># (10, [20, 30, 99, 100, 200], 40)</span></code></pre>\n      </div>\n    </div>\n  </div>\n\n    <!-- 💡 Key Notes -->\n  <div class=\"py-recall-hook py-keynotes-card\">\n    <div class=\"py-keynotes-icon-wrap\">💡</div>\n    <div class=\"py-recall-body py-keynotes-body\">\n      <div class=\"py-recall-header py-keynotes-header\">\n        <span class=\"py-recall-title py-keynotes-title\">Key Notes</span>\n        <span class=\"py-recall-tag py-keynotes-tag\">MEMORY &amp; IMMUTABILITY ARCHITECTURE</span>\n      </div>\n      <ul class=\"py-keynotes-list\">\n        <li><strong>Zero Slack Allocation:</strong> Tuples allocate exactly $N$ slots for $N$ pointers. Unlike lists, tuples never reserve extra capacity buffers for future appends.</li>\n        <li><strong>CPython Free Lists:</strong> CPython maintains internal cached arrays for small tuples up to length 20. When a small tuple is deleted, its memory block is reused immediately without contacting the system kernel allocator.</li>\n        <li><strong>Shallow Immutability:</strong> Immutability applies strictly to the tuple container itself (the memory addresses stored in its pointer array). If an element points to a mutable container (like a list), that container can be mutated in-place.</li>\n        <li><strong>The += Trap on Tuples:</strong> Never use <code>tuple[idx] += [item]</code> on a nested list. The bytecode mutates the list in-place via <code>__iadd__</code>, but then tries to re-assign the list reference to <code>tuple[idx]</code>, triggering a <code>TypeError</code> after mutation has already occurred.</li>\n      </ul>\n    </div>\n  </div>\n</div>\n<!-- ═══ SECTION 03: Indexing & Negative Index Shortcut ═══ -->\n<div class=\"slide-section\" id=\"day05IndexingSection\">\n  <h2 class=\"slide-section-title heading-box-wrap heading-with-audio\" id=\"headingIndexing\">\n    <span class=\"heading-num-box\">03</span>\n    <span class=\"heading-title-box\">\n      <span class=\"heading-title-text\">Indexing & Negative Indices</span>\n      <button class=\"audio-play-btn\" onclick=\"playAudio('Day05/New_PyDay05Audio06.mp3', this)\" title=\"Play narration\">\n        <svg class=\"play-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M8 5v14l11-7z\"/></svg>\n      </button>\n    </span>\n  </h2>\n  <p class=\"section-intro-text\">Like lists and strings, tuples are <strong>subscriptable sequences</strong>. Elements are assigned consecutive integer positions starting from <code>0</code> on the left, and negative integer positions starting from <code>-1</code> on the right. Accessing an element by index runs in instantaneous $O(1)$ constant time.</p>\n\n  <!-- Professional Textbook Diagram: Positive & Negative Tuple Indexing (Day 04 Parity) -->\n  <div class=\"topic-subcard py-diagram-subcard\" id=\"day05IndexingDiagramSection\">\n    <div class=\"diagram-wrap\">\n      <!-- Negative Indexing Flow Track (Top) -->\n      <div class=\"flow-banner-neg\">\n        <div class=\"banner-arrow-track track-neg\">\n          <svg class=\"arrow-svg-left\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n            <path d=\"M19 12H5\"></path><path d=\"m12 19-7-7 7-7\"></path>\n          </svg>\n          <div class=\"banner-line-neg\"></div>\n        </div>\n        <div class=\"banner-info-wrap\">\n          <span class=\"banner-label-neg\">Negative indexing</span>\n          <span class=\"banner-subtext\">(Traverses Right &rarr; Left &bull; Last item is &minus;1)</span>\n        </div>\n      </div>\n\n      <!-- Python Tuple Representation Stage (Center) -->\n      <div class=\"matrix-stage\">\n        <span class=\"matrix-bracket\" aria-hidden=\"true\">(</span>\n        <div class=\"pillars-row\">\n          <!-- Pillar 0: banana -->\n          <div class=\"index-pillar\" title=\"Negative: -4 | Positive: 0 | Value: 'banana'\">\n            <div class=\"idx-badge badge-neg\">\n              <span>&minus;4</span>\n            </div>\n            <div class=\"pillar-stem stem-neg\"></div>\n            <div class=\"element-cell-wrap\">\n              <div class=\"element-tile\">\n                <span class=\"quote-mark\">'</span><span class=\"elem-text\">banana</span><span class=\"quote-mark\">'</span>\n              </div>\n              <span class=\"tile-comma\">,</span>\n            </div>\n            <div class=\"pillar-stem stem-pos\"></div>\n            <div class=\"idx-badge badge-pos\">\n              <span>0</span>\n            </div>\n          </div>\n\n          <!-- Pillar 1: orange -->\n          <div class=\"index-pillar\" title=\"Negative: -3 | Positive: 1 | Value: 'orange'\">\n            <div class=\"idx-badge badge-neg\">\n              <span>&minus;3</span>\n            </div>\n            <div class=\"pillar-stem stem-neg\"></div>\n            <div class=\"element-cell-wrap\">\n              <div class=\"element-tile\">\n                <span class=\"quote-mark\">'</span><span class=\"elem-text\">orange</span><span class=\"quote-mark\">'</span>\n              </div>\n              <span class=\"tile-comma\">,</span>\n            </div>\n            <div class=\"pillar-stem stem-pos\"></div>\n            <div class=\"idx-badge badge-pos\">\n              <span>1</span>\n            </div>\n          </div>\n\n          <!-- Pillar 2: mango -->\n          <div class=\"index-pillar\" title=\"Negative: -2 | Positive: 2 | Value: 'mango'\">\n            <div class=\"idx-badge badge-neg\">\n              <span>&minus;2</span>\n            </div>\n            <div class=\"pillar-stem stem-neg\"></div>\n            <div class=\"element-cell-wrap\">\n              <div class=\"element-tile\">\n                <span class=\"quote-mark\">'</span><span class=\"elem-text\">mango</span><span class=\"quote-mark\">'</span>\n              </div>\n              <span class=\"tile-comma\">,</span>\n            </div>\n            <div class=\"pillar-stem stem-pos\"></div>\n            <div class=\"idx-badge badge-pos\">\n              <span>2</span>\n            </div>\n          </div>\n\n          <!-- Pillar 3: lemon -->\n          <div class=\"index-pillar\" title=\"Negative: -1 | Positive: 3 | Value: 'lemon'\">\n            <div class=\"idx-badge badge-neg\">\n              <span>&minus;1</span>\n            </div>\n            <div class=\"pillar-stem stem-neg\"></div>\n            <div class=\"element-cell-wrap\">\n              <div class=\"element-tile\">\n                <span class=\"quote-mark\">'</span><span class=\"elem-text\">lemon</span><span class=\"quote-mark\">'</span>\n              </div>\n            </div>\n            <div class=\"pillar-stem stem-pos\"></div>\n            <div class=\"idx-badge badge-pos\">\n              <span>3</span>\n            </div>\n          </div>\n        </div>\n        <span class=\"matrix-bracket\" aria-hidden=\"true\">)</span>\n      </div>\n\n      <!-- Positive Indexing Flow Track (Bottom) -->\n      <div class=\"flow-banner-pos\">\n        <div class=\"banner-info-wrap\">\n          <span class=\"banner-label-pos\">Positive indexing</span>\n          <span class=\"banner-subtext\">(Traverses Left &rarr; Right &bull; First item is 0)</span>\n        </div>\n        <div class=\"banner-arrow-track track-pos\">\n          <div class=\"banner-line-pos\"></div>\n          <svg class=\"arrow-svg-right\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n            <path d=\"M5 12h14\"></path><path d=\"m12 5 7 7-7 7\"></path>\n          </svg>\n        </div>\n      </div>\n\n      <!-- Takeaways & Formula Bar -->\n      <div class=\"diagram-key-takeaways\">\n        <div class=\"takeaway-item\">\n          <span class=\"takeaway-tag tag-pos\">Positive:</span>\n          <code>fruits[0] &rarr; 'banana'</code>\n          <span class=\"takeaway-divider\">&bull;</span>\n          <code>fruits[3] &rarr; 'lemon'</code>\n        </div>\n        <div class=\"takeaway-item\">\n          <span class=\"takeaway-tag tag-neg\">Negative:</span>\n          <code>fruits[-4] &rarr; 'banana'</code>\n          <span class=\"takeaway-divider\">&bull;</span>\n          <code>fruits[-1] &rarr; 'lemon'</code>\n        </div>\n        <div class=\"takeaway-item\">\n          <span class=\"takeaway-tag tag-formula\">Formula:</span>\n          <code>negative_index = positive_index - len(fruits)</code>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <!-- The Locker Row Mental Model -->\n  <div class=\"mental-model-card\">\n    <div class=\"mental-model-header\">\n      <span class=\"mental-model-badge\">Indexing Model</span>\n      <h4 class=\"mental-model-title\">The Locker Room Row 🏬</h4>\n    </div>\n    <div class=\"mental-model-grid\">\n      <div class=\"model-pane pane-tuple\">\n        <h5 class=\"model-pane-title\">Forward Indexing: 0 to N-1 (From Front Entrance)</h5>\n        <p class=\"model-pane-desc\">Start at the front door. The very first locker is Locker #0, the second is Locker #1, up to Locker #N-1. This matches memory address offsets from the beginning of the pointer array in RAM.</p>\n      </div>\n      <div class=\"model-pane pane-tuple\">\n        <h5 class=\"model-pane-title\">Negative Indexing: -1 to -N (From Emergency Exit)</h5>\n        <p class=\"model-pane-desc\">Start at the back exit. The last locker is Locker #-1, second-to-last is Locker #-2, all the way to Locker #-N. Mathematical formula: <code>negative_index = positive_index - len(tuple)</code>.</p>\n      </div>\n    </div>\n  </div>\n\n  <!-- Master Indexing Reference Table Subcard (Day 04 Parity) -->\n  <div class=\"topic-subcard\" id=\"day05IndexingTableSection\">\n    <div class=\"table-header-wrap\">\n      <h4 class=\"table-header-title\">Master Tuple Indexing Reference Table (Given: fruits = ('banana', 'orange', 'mango', 'lemon'))</h4>\n      <div class=\"table-header-actions\">\n        <div class=\"table-search-box\">\n        <svg class=\"table-search-icon\" width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\"><circle cx=\"11\" cy=\"11\" r=\"8\"/><path d=\"m21 21-4.3-4.3\"/></svg>\n        <input type=\"text\" class=\"table-search-input\" placeholder=\"Search indexing...\" oninput=\"filterTableRows(this)\" />\n      </div>\n        <button class=\"audio-play-btn\" onclick=\"playAudio('Day05/New_PyDay05Audio07.mp3', this)\" title=\"Play narration\">\n        <svg class=\"play-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M8 5v14l11-7z\"/></svg>\n      </button>\n      </div>\n    </div>\n    <div class=\"db-mock-table-wrap\">\n      <table class=\"db-table-mock idx-table\">\n        <thead>\n          <tr>\n            <th>Access Expression</th>\n            <th>Evaluation &amp; Target Element</th>\n            <th>Return Value</th>\n            <th>Technical Behavior &amp; Bounds Check</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n            <td><code>fruits[0]</code></td>\n            <td>First element from left</td>\n            <td><span class=\"tbl-ret-str\">'banana'</span></td>\n            <td>Direct $O(1)$ pointer dereference at offset 0.</td>\n          </tr>\n          <tr>\n            <td><code>fruits[1]</code></td>\n            <td>Second element from left</td>\n            <td><span class=\"tbl-ret-str\">'orange'</span></td>\n            <td>Dereference pointer at offset 1.</td>\n          </tr>\n          <tr>\n            <td><code>fruits[2]</code></td>\n            <td>Third element from left</td>\n            <td><span class=\"tbl-ret-str\">'mango'</span></td>\n            <td>Dereference pointer at offset 2.</td>\n          </tr>\n          <tr>\n            <td><code>fruits[3]</code></td>\n            <td>Fourth element (last item)</td>\n            <td><span class=\"tbl-ret-str\">'lemon'</span></td>\n            <td>Dereference pointer at offset <code>len - 1</code>.</td>\n          </tr>\n          <tr>\n            <td><code>fruits[-1]</code></td>\n            <td>Last element from right</td>\n            <td><span class=\"tbl-ret-str\">'lemon'</span></td>\n            <td>Evaluates to <code>fruits[len + (-1)] = fruits[3]</code>.</td>\n          </tr>\n          <tr>\n            <td><code>fruits[-2]</code></td>\n            <td>Second to last element</td>\n            <td><span class=\"tbl-ret-str\">'mango'</span></td>\n            <td>Evaluates to <code>fruits[len + (-2)] = fruits[2]</code>.</td>\n          </tr>\n          <tr>\n            <td><code>fruits[-4]</code></td>\n            <td>Fourth from last (first item)</td>\n            <td><span class=\"tbl-ret-str\">'banana'</span></td>\n            <td>Evaluates to <code>fruits[len + (-4)] = fruits[0]</code>.</td>\n          </tr>\n          <tr>\n            <td><code>fruits[4]</code></td>\n            <td>Out of bounds positive index</td>\n            <td><span class=\"tbl-ret-bool false\">IndexError</span></td>\n            <td>Raises <code>IndexError: tuple index out of range</code>.</td>\n          </tr>\n          <tr>\n            <td><code>fruits[-5]</code></td>\n            <td>Out of bounds negative index</td>\n            <td><span class=\"tbl-ret-bool false\">IndexError</span></td>\n            <td>Raises <code>IndexError: tuple index out of range</code>.</td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n  </div>\n\n    <!-- Code Container Subcard -->\n  <div class=\"topic-subcard\" id=\"day05IndexingCodeSection\">\n    <div class=\"subcard-header-with-audio\">\n      <h4 class=\"subcard-header-title\">Positive Indexing, Negative Shortcuts &amp; Safe Index Guard</h4>\n      <button class=\"audio-play-btn\" onclick=\"playAudio('Day05/New_PyDay05Audio08.mp3', this)\" title=\"Play narration\">\n        <svg class=\"play-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M8 5v14l11-7z\"/></svg>\n      </button>\n    </div>\n    <div class=\"code-block-container\">\n      <div class=\"code-subblock\">\n        <pre><code>fruits = (<span class=\"code-str\">'banana'</span>, <span class=\"code-str\">'orange'</span>, <span class=\"code-str\">'mango'</span>, <span class=\"code-str\">'lemon'</span>)\n\n<span class=\"code-comment\"># 1. Positive Access</span>\nfirst_item = fruits[0]\nsecond_item = fruits[1]\nlast_pos = fruits[<span class=\"code-fn\">len</span>(fruits) - 1]\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">\"First:\"</span>, first_item, <span class=\"code-str\">\"| Last:\"</span>, last_pos)  <span class=\"code-comment\"># banana | lemon</span>\n\n<span class=\"code-comment\"># 2. Negative Indexing Shortcut (Cleaner &amp; More Pythonic)</span>\nlast_item = fruits[-1]\nsecond_last = fruits[-2]\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">\"Last (-1):\"</span>, last_item, <span class=\"code-str\">\"| Second Last (-2):\"</span>, second_last)  <span class=\"code-comment\"># lemon | mango</span>\n\n<span class=\"code-comment\"># 3. Safe Indexing Guard Pattern (Preventing IndexError in Production)</span>\ndef safe_get_tuple(tpl, index, default=None):\n    <span class=\"code-comment\"># Check bounds for both positive and negative index ranges</span>\n    if -<span class=\"code-fn\">len</span>(tpl) &lt;= index &lt; <span class=\"code-fn\">len</span>(tpl):\n        return tpl[index]\n    return default\n\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">\"Index 2 safe:\"</span>, safe_get_tuple(fruits, 2))      <span class=\"code-comment\"># mango</span>\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">\"Index 10 safe:\"</span>, safe_get_tuple(fruits, 10, <span class=\"code-str\">'N/A'</span>))  <span class=\"code-comment\"># N/A</span></code></pre>\n      </div>\n    </div>\n  </div>\n\n    <!-- 💡 Key Notes -->\n  <div class=\"py-recall-hook py-keynotes-card\">\n    <div class=\"py-keynotes-icon-wrap\">💡</div>\n    <div class=\"py-recall-body py-keynotes-body\">\n      <div class=\"py-recall-header py-keynotes-header\">\n        <span class=\"py-recall-title py-keynotes-title\">Key Notes</span>\n        <span class=\"py-recall-tag py-keynotes-tag\">INDEXING PRINCIPLES &amp; BOUNDS SAFETY</span>\n      </div>\n      <ul class=\"py-keynotes-list\">\n        <li><strong>Zero-Based Arithmetic:</strong> In CPython, <code>tpl[i]</code> computes memory location <code>*(ob_item + i)</code> directly, requiring 0 calculations.</li>\n        <li><strong>Negative Conversion Formula:</strong> Python automatically translates negative index <code>-k</code> to positive index <code>len(tpl) + (-k)</code>.</li>\n        <li><strong>Strict Bounds Checking:</strong> Indexing strictly requires <code>-len(tpl) &lt;= index &lt; len(tpl)</code>. Exceeding these bounds immediately raises <code>IndexError</code>.</li>\n        <li><strong>Safe Access Pattern:</strong> In data pipelines where tuple lengths may vary (e.g. parsed CSV lines or database rows), always check <code>if 0 &lt;= idx &lt; len(tpl):</code> before indexing.</li>\n      </ul>\n    </div>\n  </div>\n</div>\n<!-- ═══ SECTION 04: Slicing & The Forgiving Stop-Sign Rule ═══ -->\n<div class=\"slide-section\" id=\"day05SlicingSection\">\n  <h2 class=\"slide-section-title heading-box-wrap heading-with-audio\" id=\"headingSlicing\">\n    <span class=\"heading-num-box\">04</span>\n    <span class=\"heading-title-box\">\n      <span class=\"heading-title-text\">Slicing & Striding Rules</span>\n      <button class=\"audio-play-btn\" onclick=\"playAudio('Day05/New_PyDay05Audio09.mp3', this)\" title=\"Play narration\">\n        <svg class=\"play-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M8 5v14l11-7z\"/></svg>\n      </button>\n    </span>\n  </h2>\n  <p class=\"section-intro-text\">Slicing extracts a sub-range from a tuple to construct a <strong>brand new tuple</strong>. The general syntax is <code>tpl[start:stop:step]</code>, where <code>start</code> is inclusive, <code>stop</code> is exclusive, and <code>step</code> dictates the stride direction and interval.</p>\n\n  <!-- The Forgiving Stop-Sign Mental Model -->\n  <div class=\"mental-model-card\">\n    <div class=\"mental-model-header\">\n      <span class=\"mental-model-badge\">Slicing Model</span>\n      <h4 class=\"mental-model-title\">The Forgiving Stop-Sign Rule 🛑</h4>\n    </div>\n    <div class=\"mental-model-grid\">\n      <div class=\"model-pane pane-tuple\">\n        <h5 class=\"model-pane-title\">Direct Indexing: Strict Speed Bump ⚠️</h5>\n        <p class=\"model-pane-desc\">Direct indexing <code>fruits[99]</code> is strict. If the index exceeds the length by even 1 position, Python crashes immediately with <code>IndexError: tuple index out of range</code>.</p>\n      </div>\n      <div class=\"model-pane pane-tuple\">\n        <h5 class=\"model-pane-title\">Slicing: Forgiving Stop-Sign 🚦</h5>\n        <p class=\"model-pane-desc\">Slicing <code>fruits[1:99]</code> is forgiving! Python safely stops at the actual boundary of the tuple without raising an error. If the start index is completely beyond the end, it gracefully returns an empty tuple <code>()</code>.</p>\n      </div>\n    </div>\n  </div>\n\n  <!-- Master Slicing Reference Table Subcard (Day 04 Parity) -->\n  <div class=\"topic-subcard\" id=\"day05SlicingTableSection\">\n    <div class=\"table-header-wrap\">\n      <h4 class=\"table-header-title\">Master Tuple Slicing Reference Table (Given: fruits = ('banana', 'orange', 'mango', 'lemon'))</h4>\n      <div class=\"table-header-actions\">\n        <div class=\"table-search-box\">\n        <svg class=\"table-search-icon\" width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\"><circle cx=\"11\" cy=\"11\" r=\"8\"/><path d=\"m21 21-4.3-4.3\"/></svg>\n        <input type=\"text\" class=\"table-search-input\" placeholder=\"Search slicing...\" oninput=\"filterTableRows(this)\" />\n      </div>\n        <button class=\"audio-play-btn\" onclick=\"playAudio('Day05/New_PyDay05Audio10.mp3', this)\" title=\"Play narration\">\n        <svg class=\"play-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M8 5v14l11-7z\"/></svg>\n      </button>\n      </div>\n    </div>\n    <div class=\"db-mock-table-wrap\">\n      <table class=\"db-table-mock slice-table\">\n        <thead>\n          <tr>\n            <th>Slice Syntax</th>\n            <th>Range &amp; Stride Description</th>\n            <th>Return Value</th>\n            <th>Engineering Note &amp; Complexity</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n            <td><code>fruits[0:2]</code></td>\n            <td>Indices 0 and 1 (excludes index 2)</td>\n            <td><span class=\"tbl-ret-tuple\">('banana', 'orange')</span></td>\n            <td>Extracts first 2 items ($O(K)$ where $K = 2$).</td>\n          </tr>\n          <tr>\n            <td><code>fruits[:2]</code></td>\n            <td>Omitted start defaults to 0</td>\n            <td><span class=\"tbl-ret-tuple\">('banana', 'orange')</span></td>\n            <td>Identical to <code>fruits[0:2]</code>.</td>\n          </tr>\n          <tr>\n            <td><code>fruits[1:3]</code></td>\n            <td>Middle items at index 1 and 2</td>\n            <td><span class=\"tbl-ret-tuple\">('orange', 'mango')</span></td>\n            <td>Inclusive start, exclusive stop.</td>\n          </tr>\n          <tr>\n            <td><code>fruits[2:]</code></td>\n            <td>Omitted stop extracts to end</td>\n            <td><span class=\"tbl-ret-tuple\">('mango', 'lemon')</span></td>\n            <td>From index 2 through final item.</td>\n          </tr>\n          <tr>\n            <td><code>fruits[-3:]</code></td>\n            <td>Last 3 items of the tuple</td>\n            <td><span class=\"tbl-ret-tuple\">('orange', 'mango', 'lemon')</span></td>\n            <td>Starts 3 from end, runs to termination.</td>\n          </tr>\n          <tr>\n            <td><code>fruits[-4:-1]</code></td>\n            <td>Negative index range</td>\n            <td><span class=\"tbl-ret-tuple\">('banana', 'orange', 'mango')</span></td>\n            <td>Index -4, -3, -2 (excludes -1).</td>\n          </tr>\n          <tr>\n            <td><code>fruits[::2]</code></td>\n            <td>Stride of 2 (alternating elements)</td>\n            <td><span class=\"tbl-ret-tuple\">('banana', 'mango')</span></td>\n            <td>Step size 2 selects index 0, then 2.</td>\n          </tr>\n          <tr>\n            <td><code>fruits[::-1]</code></td>\n            <td>Reverse stride shortcut</td>\n            <td><span class=\"tbl-ret-tuple\">('lemon', 'mango', 'orange', 'banana')</span></td>\n            <td>Produces a fresh tuple with items in reverse order.</td>\n          </tr>\n          <tr>\n            <td><code>fruits[2:100]</code></td>\n            <td>Out of range stop index</td>\n            <td><span class=\"tbl-ret-tuple\">('mango', 'lemon')</span></td>\n            <td>Forgiving stop-sign: clamps safely at length 4.</td>\n          </tr>\n          <tr>\n            <td><code>fruits[10:20]</code></td>\n            <td>Out of range start index</td>\n            <td><span class=\"tbl-ret-tuple\">()</span></td>\n            <td>Returns empty tuple with zero errors.</td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n  </div>\n\n    <!-- Code Container Subcard -->\n  <div class=\"topic-subcard\" id=\"day05SlicingCodeSection\">\n    <div class=\"subcard-header-with-audio\">\n      <h4 class=\"subcard-header-title\">Positive Slices, Negative Ranges &amp; Reversal Strides</h4>\n      <button class=\"audio-play-btn\" onclick=\"playAudio('Day05/New_PyDay05Audio11.mp3', this)\" title=\"Play narration\">\n        <svg class=\"play-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M8 5v14l11-7z\"/></svg>\n      </button>\n    </div>\n    <div class=\"code-block-container\">\n      <div class=\"code-subblock\">\n        <pre><code>fruits = (<span class=\"code-str\">'banana'</span>, <span class=\"code-str\">'orange'</span>, <span class=\"code-str\">'mango'</span>, <span class=\"code-str\">'lemon'</span>)\n\n<span class=\"code-comment\"># 1. Basic Slicing (Inclusive Start, Exclusive Stop)</span>\nfirst_two = fruits[0:2]\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">\"fruits[0:2]:\"</span>, first_two)       <span class=\"code-comment\"># ('banana', 'orange')</span>\nall_from_index_one = fruits[1:]\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">\"fruits[1:]:  \"</span>, all_from_index_one)  <span class=\"code-comment\"># ('orange', 'mango', 'lemon')</span>\n\n<span class=\"code-comment\"># 2. Slicing with Negative Indices</span>\nall_except_last = fruits[:-1]\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">\"fruits[:-1]: \"</span>, all_except_last)    <span class=\"code-comment\"># ('banana', 'orange', 'mango')</span>\nlast_three = fruits[-3:]\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">\"fruits[-3:]: \"</span>, last_three)         <span class=\"code-comment\"># ('orange', 'mango', 'lemon')</span>\nneg_range = fruits[-4:-2]\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">\"fruits[-4:-2]:\"</span>, neg_range)        <span class=\"code-comment\"># ('banana', 'orange')</span>\n\n<span class=\"code-comment\"># 3. Striding &amp; Reversal</span>\nevery_second = fruits[::2]\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">\"fruits[::2]: \"</span>, every_second)       <span class=\"code-comment\"># ('banana', 'mango')</span>\nreversed_fruits = fruits[::-1]\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">\"fruits[::-1]:\"</span>, reversed_fruits)    <span class=\"code-comment\"># ('lemon', 'mango', 'orange', 'banana')</span>\n\n<span class=\"code-comment\"># 4. Forgiving Stop-Sign Proof</span>\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">\"Out of range slice:\"</span>, fruits[1:999])  <span class=\"code-comment\"># ('orange', 'mango', 'lemon') - NO ERROR!</span></code></pre>\n      </div>\n    </div>\n  </div>\n\n    <!-- 💡 Key Notes -->\n  <div class=\"py-recall-hook py-keynotes-card\">\n    <div class=\"py-keynotes-icon-wrap\">💡</div>\n    <div class=\"py-recall-body py-keynotes-body\">\n      <div class=\"py-recall-header py-keynotes-header\">\n        <span class=\"py-recall-title py-keynotes-title\">Key Notes</span>\n        <span class=\"py-recall-tag py-keynotes-tag\">SLICING MECHANICS &amp; IMMUTABILITY</span>\n      </div>\n      <ul class=\"py-keynotes-list\">\n        <li><strong>New Tuple Allocation:</strong> Slicing an immutable tuple never modifies the original tuple. It allocates and returns a completely new tuple containing shallow references to the selected elements.</li>\n        <li><strong>The Half-Open Interval [start, stop):</strong> Python slicing always includes the <code>start</code> index and strictly excludes the <code>stop</code> index. The number of returned items is <code>stop - start</code> (for step 1).</li>\n        <li><strong>The Forgiving Stop-Sign:</strong> Indices that exceed container length in a slice are silently clamped to <code>0</code> or <code>len(tpl)</code> without throwing <code>IndexError</code>.</li>\n        <li><strong>Reverse Slicing Rule:</strong> When step is negative (<code>step &lt; 0</code>), <code>start</code> must be greater than <code>stop</code> (e.g. <code>fruits[3:1:-1]</code>). Slicing <code>fruits[1:3:-1]</code> yields an empty tuple <code>()</code>.</li>\n      </ul>\n    </div>\n  </div>\n</div>\n<!-- ═══ SECTION 05: Methods & Operations ═══ -->\n<div class=\"slide-section\" id=\"day05MethodsSection\">\n  <h2 class=\"slide-section-title heading-box-wrap heading-with-audio\" id=\"headingMethods\">\n    <span class=\"heading-num-box\">05</span>\n    <span class=\"heading-title-box\">\n      <span class=\"heading-title-text\">Tuple Methods (.count, .index)</span>\n      <button class=\"audio-play-btn\" onclick=\"playAudio('Day05/New_PyDay05Audio12.mp3', this)\" title=\"Play narration\">\n        <svg class=\"play-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M8 5v14l11-7z\"/></svg>\n      </button>\n    </span>\n  </h2>\n  <p class=\"section-intro-text\">Why does Python provide only <strong>two methods</strong> (<code>.count()</code> and <code>.index()</code>) on tuples? Because tuples are immutable! Mutating methods like <code>append()</code>, <code>insert()</code>, <code>pop()</code>, <code>remove()</code>, <code>sort()</code>, and <code>clear()</code> cannot logically exist on an immutable sequence.</p>\n\n  <!-- Master Methods Reference Table Subcard (Day 04 Parity) -->\n  <div class=\"topic-subcard\" id=\"day05MethodsTableSection\">\n    <div class=\"table-header-wrap\">\n      <h4 class=\"table-header-title\">Tuple Methods &amp; Sequence Operations Reference</h4>\n      <div class=\"table-header-actions\">\n        <div class=\"table-search-box\">\n        <svg class=\"table-search-icon\" width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\"><circle cx=\"11\" cy=\"11\" r=\"8\"/><path d=\"m21 21-4.3-4.3\"/></svg>\n        <input type=\"text\" class=\"table-search-input\" placeholder=\"Search methods...\" oninput=\"filterTableRows(this)\" />\n      </div>\n        <button class=\"audio-play-btn\" onclick=\"playAudio('Day05/New_PyDay05Audio13.mp3', this)\" title=\"Play narration\">\n        <svg class=\"play-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M8 5v14l11-7z\"/></svg>\n      </button>\n      </div>\n    </div>\n    <div class=\"db-mock-table-wrap\">\n      <table class=\"db-table-mock methods-table\">\n        <thead>\n          <tr>\n            <th>Method / Operation</th>\n            <th>Example Syntax</th>\n            <th>Return Value</th>\n            <th>Behavior, Gotchas &amp; Complexity</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n            <td><code>count(x)</code></td>\n            <td><code>tpl.count('banana')</code></td>\n            <td><span class=\"tbl-ret-num\">int</span> (occurrences)</td>\n            <td>Counts matches in $O(N)$ time. Returns 0 if item is absent. Never raises an error.</td>\n          </tr>\n          <tr>\n            <td><code>index(x)</code></td>\n            <td><code>tpl.index('orange')</code></td>\n            <td><span class=\"tbl-ret-num\">int</span> (first index)</td>\n            <td>Finds first occurrence in $O(N)$ time. ⚠️ <strong>Raises ValueError</strong> if item is missing!</td>\n          </tr>\n          <tr>\n            <td><code>index(x, start, stop)</code></td>\n            <td><code>tpl.index('orange', 1, 3)</code></td>\n            <td><span class=\"tbl-ret-num\">int</span> (first index)</td>\n            <td>Restricts search to sub-slice <code>[start:stop]</code>. Raises <code>ValueError</code> if not found.</td>\n          </tr>\n          <tr>\n            <td><code>x in tpl</code></td>\n            <td><code>'mango' in tpl</code></td>\n            <td><span class=\"tbl-ret-bool true\">True</span> / <span class=\"tbl-ret-bool false\">False</span></td>\n            <td>Membership test in $O(N)$ time. Always use this to guard <code>.index()</code> calls.</td>\n          </tr>\n          <tr>\n            <td><code>tpl1 + tpl2</code></td>\n            <td><code>fruits + vegetables</code></td>\n            <td><span class=\"tbl-ret-tuple\">tuple</span> (new merged)</td>\n            <td>Concatenation allocates a fresh tuple with combined items ($O(N + M)$ memory).</td>\n          </tr>\n          <tr>\n            <td><code>tpl * n</code></td>\n            <td><code>('A', 'B') * 3</code></td>\n            <td><span class=\"tbl-ret-tuple\">tuple</span> (repeated)</td>\n            <td>Produces repeated tuple: <code>('A', 'B', 'A', 'B', 'A', 'B')</code>.</td>\n          </tr>\n          <tr>\n            <td><code>del tpl</code></td>\n            <td><code>del fruits</code></td>\n            <td><code>None</code></td>\n            <td>Deletes the reference from namespace. <code>del tpl[0]</code> raises <code>TypeError</code>.</td>\n          </tr>\n          <tr>\n            <td><code>sorted(tpl)</code></td>\n            <td><code>sorted(tpl)</code></td>\n            <td><span class=\"tbl-ret-num\">list</span> (new sorted list)</td>\n            <td>⚠️ <strong>Returns a list!</strong> Tuples have no <code>.sort()</code> method. Wrap in <code>tuple(sorted(tpl))</code> if an immutable tuple is needed.</td>\n          </tr>\n          <tr>\n            <td><code>min(t), max(t), sum(t)</code></td>\n            <td><code>min(t), max(t), sum(t)</code></td>\n            <td><span class=\"tbl-ret-num\">int / float</span></td>\n            <td>Standard $O(N)$ numeric aggregations. Requires comparable and numeric elements.</td>\n          </tr>\n          <tr>\n            <td><code>Functional Slicing</code></td>\n            <td><code>t[:1] + ('X',) + t[2:]</code></td>\n            <td><span class=\"tbl-ret-tuple\">tuple</span> (new replaced)</td>\n            <td>Non-destructive slice-and-join: builds a new tuple with element replacement without list conversion.</td>\n          </tr>\n          <tr>\n            <td><code>list(tpl) &harr; tuple(lst)</code></td>\n            <td><code>lst = list(tpl); ... tuple(lst)</code></td>\n            <td><span class=\"tbl-ret-tuple\">tuple</span> (modified)</td>\n            <td>The Conversion Roundtrip Pattern: Convert to list, mutate, convert back to tuple.</td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n  </div>\n\n    <!-- Code Container Subcard -->\n  <div class=\"topic-subcard\" id=\"day05MethodsCodeSection\">\n    <div class=\"subcard-header-with-audio\">\n      <h4 class=\"subcard-header-title\">.count(), Safe .index() Guard &amp; The Conversion Roundtrip</h4>\n      <button class=\"audio-play-btn\" onclick=\"playAudio('Day05/New_PyDay05Audio14.mp3', this)\" title=\"Play narration\">\n        <svg class=\"play-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M8 5v14l11-7z\"/></svg>\n      </button>\n    </div>\n    <div class=\"code-block-container\">\n      <div class=\"code-subblock\">\n        <pre><code>fruits = (<span class=\"code-str\">'banana'</span>, <span class=\"code-str\">'orange'</span>, <span class=\"code-str\">'mango'</span>, <span class=\"code-str\">'lemon'</span>, <span class=\"code-str\">'orange'</span>)\n\n<span class=\"code-comment\"># 1. Counting Occurrences using count()</span>\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">\"Orange count:\"</span>, fruits.<span class=\"code-fn\">count</span>(<span class=\"code-str\">'orange'</span>))  <span class=\"code-comment\"># Output: 2</span>\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">\"Apple count: \"</span>, fruits.<span class=\"code-fn\">count</span>(<span class=\"code-str\">'apple'</span>))   <span class=\"code-comment\"># Output: 0 (Never crashes)</span>\n\n<span class=\"code-comment\"># 2. Finding Index using index()</span>\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">\"First orange index:\"</span>, fruits.<span class=\"code-fn\">index</span>(<span class=\"code-str\">'orange'</span>))  <span class=\"code-comment\"># Output: 1</span>\n\n<span class=\"code-comment\"># ⚠️ TRAP: Missing item raises ValueError</span>\n<span class=\"code-kw\">try</span>:\n    fruits.<span class=\"code-fn\">index</span>(<span class=\"code-str\">'apple'</span>)\n<span class=\"code-kw\">except</span> <span class=\"code-err\">ValueError</span> <span class=\"code-kw\">as</span> err:\n    <span class=\"code-fn\">print</span>(<span class=\"code-str\">\"Caught Expected Error:\"</span>, err)  <span class=\"code-comment\"># tuple.index(x): x not in tuple</span>\n\n<span class=\"code-comment\"># 3. The Safe Index Lookup Pattern (Production Standard)</span>\ntarget = <span class=\"code-str\">'apple'</span>\nif target in fruits:\n    idx = fruits.<span class=\"code-fn\">index</span>(target)\nelse:\n    idx = -1\n<span class=\"code-fn\">print</span>(f<span class=\"code-str\">\"Safe lookup for '{target}': {idx}\"</span>)  <span class=\"code-comment\"># -1</span>\n\n<span class=\"code-comment\"># 4. Joining &amp; Multiplying Tuples</span>\ntpl1 = (<span class=\"code-str\">'a'</span>, <span class=\"code-str\">'b'</span>)\ntpl2 = (<span class=\"code-str\">'c'</span>, <span class=\"code-str\">'d'</span>)\ncombined = tpl1 + tpl2\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">\"Concatenated:\"</span>, combined)   <span class=\"code-comment\"># ('a', 'b', 'c', 'd')</span>\nrepeated = tpl1 * 3\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">\"Repeated:    \"</span>, repeated)   <span class=\"code-comment\"># ('a', 'b', 'a', 'b', 'a', 'b')</span>\n\n<span class=\"code-comment\"># 5. The Conversion Roundtrip Pattern (How to 'Modify' a Tuple)</span>\nfruits_list = <span class=\"code-fn\">list</span>(fruits)          <span class=\"code-comment\"># Step 1: Convert to list</span>\nfruits_list[0] = <span class=\"code-str\">'kiwi'</span>             <span class=\"code-comment\"># Step 2: Modify in-place</span>\nfruits_list.<span class=\"code-fn\">append</span>(<span class=\"code-str\">'pineapple'</span>)      <span class=\"code-comment\"># Step 3: Append new element</span>\nmodified_fruits = <span class=\"code-fn\">tuple</span>(fruits_list) <span class=\"code-comment\"># Step 4: Convert back to tuple</span>\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">\"Modified Tuple:\"</span>, modified_fruits)\n\n<span class=\"code-comment\"># 6. Built-in Sequence Helpers: min(), max(), sum(), sorted()</span>\nnums = (30, 10, 50, 20)\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">\"Min:\"</span>, <span class=\"code-fn\">min</span>(nums), <span class=\"code-str\">\"| Max:\"</span>, <span class=\"code-fn\">max</span>(nums), <span class=\"code-str\">\"| Sum:\"</span>, <span class=\"code-fn\">sum</span>(nums))\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">\"sorted() returns a LIST:\"</span>, <span class=\"code-fn\">sorted</span>(nums))            <span class=\"code-comment\"># [10, 20, 30, 50] (List!)</span>\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">\"Sorted back to TUPLE:   \"</span>, <span class=\"code-fn\">tuple</span>(<span class=\"code-fn\">sorted</span>(nums)))     <span class=\"code-comment\"># (10, 20, 30, 50)</span>\n\n<span class=\"code-comment\"># 7. Slicing &amp; Joining: Functional Update Without List Conversion</span>\nletters = (<span class=\"code-str\">'a'</span>, <span class=\"code-str\">'b'</span>, <span class=\"code-str\">'c'</span>)\nupdated_letters = letters[:1] + (<span class=\"code-str\">'X'</span>,) + letters[2:]        <span class=\"code-comment\"># Replace 'b' with 'X'</span>\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">\"Replaced via Slicing:\"</span>, updated_letters)             <span class=\"code-comment\"># ('a', 'X', 'c')</span></code></pre>\n      </div>\n    </div>\n  </div>\n\n    <!-- 💡 Key Notes -->\n  <div class=\"py-recall-hook py-keynotes-card\">\n    <div class=\"py-keynotes-icon-wrap\">💡</div>\n    <div class=\"py-recall-body py-keynotes-body\">\n      <div class=\"py-recall-header py-keynotes-header\">\n        <span class=\"py-recall-title py-keynotes-title\">Key Notes</span>\n        <span class=\"py-recall-tag py-keynotes-tag\">TUPLE METHODS &amp; SEQUENCE OPERATORS</span>\n      </div>\n      <ul class=\"py-keynotes-list\">\n        <li><strong>The Two-Method Simplicity:</strong> Tuples define only <code>.count()</code> and <code>.index()</code> because any method that alters sequence length or contents violates immutability.</li>\n        <li><strong>Safe Indexing with <code>in</code>:</strong> Calling <code>.index(x)</code> raises <code>ValueError</code> if <code>x</code> is absent. Always check <code>if x in tpl:</code> before calling <code>.index()</code> in enterprise code.</li>\n        <li><strong>Concatenation Allocates New Memory:</strong> <code>tpl1 + tpl2</code> creates a completely new tuple object. It does not modify <code>tpl1</code> or <code>tpl2</code>.</li>\n        <li><strong>The Conversion Roundtrip:</strong> When tuple data must be modified, use the standard pattern <code>lst = list(t); lst.append(x); t = tuple(lst)</code>.</li>\n      </ul>\n    </div>\n  </div>\n</div>\n<!-- ═══ SECTION 06: Tuple Packing & Unpacking ═══ -->\n<div class=\"slide-section\" id=\"day05UnpackingSection\">\n  <h2 class=\"slide-section-title heading-box-wrap heading-with-audio\" id=\"headingUnpacking\">\n    <span class=\"heading-num-box\">06</span>\n    <span class=\"heading-title-box\">\n      <span class=\"heading-title-text\">Packing & Unpacking (*rest)</span>\n      <button class=\"audio-play-btn\" onclick=\"playAudio('Day05/New_PyDay05Audio15.mp3', this)\" title=\"Play narration\">\n        <svg class=\"play-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M8 5v14l11-7z\"/></svg>\n      </button>\n    </span>\n  </h2>\n  <p class=\"section-intro-text\">Tuple packing and unpacking are among Python's most expressive syntactic features. <strong>Packing</strong> bundles multiple comma-separated values into a single tuple. <strong>Unpacking</strong> extracts elements into individual variables. Extended unpacking with the asterisk <code>*</code> collects variable-length slices into a list.</p>\n\n  <!-- The Starred Unpacking Visual Blueprint Mental Model -->\n  <div class=\"mental-model-card\">\n    <div class=\"mental-model-header\">\n      <span class=\"mental-model-badge\">Visual Blueprint</span>\n      <h4 class=\"mental-model-title\">How Python Distributes Starred Unpacking (*)</h4>\n    </div>\n    <div class=\"mental-model-grid\">\n      <div class=\"model-pane pane-tuple\">\n        <h5 class=\"model-pane-title\">Head &amp; Tail Anchor Pedestals 📌</h5>\n        <p class=\"model-pane-desc\">Python first binds the non-starred scalar variables: <code>head</code> grabs the 1st element (<code>1</code>), and <code>tail</code> grabs the final element (<code>8</code>). They are stored as individual values.</p>\n      </div>\n      <div class=\"model-pane pane-list\">\n        <h5 class=\"model-pane-title\">The Starred Net Catches Everything In-Between 🧺</h5>\n        <p class=\"model-pane-desc\">The starred collector <code>*middle</code> expands like a net to scoop up all remaining elements <code>[2, 3, 4, 5, 6, 7]</code>. Python <strong>always</strong> packages the rest into a mutable <strong>list</strong>.</p>\n      </div>\n    </div>\n  </div>\n\n  <!-- Master Unpacking Reference Table Subcard (Day 04 Parity) -->\n  <div class=\"topic-subcard\" id=\"day05UnpackingTableSection\">\n    <div class=\"table-header-wrap\">\n      <h4 class=\"table-header-title\">Tuple Packing &amp; Extended Starred Unpacking Patterns</h4>\n      <div class=\"table-header-actions\">\n        <div class=\"table-search-box\">\n        <svg class=\"table-search-icon\" width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\"><circle cx=\"11\" cy=\"11\" r=\"8\"/><path d=\"m21 21-4.3-4.3\"/></svg>\n        <input type=\"text\" class=\"table-search-input\" placeholder=\"Search unpacking...\" oninput=\"filterTableRows(this)\" />\n      </div>\n        <button class=\"audio-play-btn\" onclick=\"playAudio('Day05/New_PyDay05Audio16.mp3', this)\" title=\"Play narration\">\n        <svg class=\"play-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M8 5v14l11-7z\"/></svg>\n      </button>\n      </div>\n    </div>\n    <div class=\"db-mock-table-wrap\">\n      <table class=\"db-table-mock unpack-table\">\n        <thead>\n          <tr>\n            <th>Unpacking Pattern</th>\n            <th>Code Example</th>\n            <th>Variable Bindings</th>\n            <th>Behavior &amp; Edge Cases</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n            <td><code>Exact Match</code></td>\n            <td><code>a, b, c = (1, 2, 3)</code></td>\n            <td><code>a=1, b=2, c=3</code></td>\n            <td>Number of target variables must exactly equal tuple length.</td>\n          </tr>\n          <tr>\n            <td><code>Variable Swap</code></td>\n            <td><code>a, b = b, a</code></td>\n            <td>Swaps <code>a</code> and <code>b</code></td>\n            <td>RHS packed into temporary tuple; LHS unpacked in single bytecode step.</td>\n          </tr>\n          <tr>\n            <td><code>Starred Middle (*rest)</code></td>\n            <td><code>first, *middle, last = (1, 2, 3, 4, 5)</code></td>\n            <td><code>first=1, middle=[2,3,4], last=5</code></td>\n            <td><code>middle</code> always evaluates to a <strong>list</strong> of intermediate items.</td>\n          </tr>\n          <tr>\n            <td><code>Starred Tail (*rest)</code></td>\n            <td><code>head, *tail = (1, 2, 3, 4)</code></td>\n            <td><code>head=1, tail=[2,3,4]</code></td>\n            <td>Extracts first item; collects remaining into list <code>tail</code>.</td>\n          </tr>\n          <tr>\n            <td><code>Starred Head (*rest)</code></td>\n            <td><code>*init, final = (1, 2, 3, 4)</code></td>\n            <td><code>init=[1,2,3], final=4</code></td>\n            <td>Collects all leading items; binds last element to <code>final</code>.</td>\n          </tr>\n          <tr>\n            <td><code>Exact Boundary (*rest)</code></td>\n            <td><code>first, *middle, last = (1, 2)</code></td>\n            <td><code>first=1, middle=[], last=2</code></td>\n            <td>When no leftover items exist, <code>*middle</code> safely evaluates to empty list <code>[]</code>.</td>\n          </tr>\n          <tr>\n            <td><code>Too Many Values Trap</code></td>\n            <td><code>a, b = (1, 2, 3)</code></td>\n            <td><span class=\"tbl-ret-bool false\">ValueError</span></td>\n            <td>Raises <code>ValueError: too many values to unpack (expected 2)</code>.</td>\n          </tr>\n          <tr>\n            <td><code>Not Enough Values Trap</code></td>\n            <td><code>a, b, c = (1, 2)</code></td>\n            <td><span class=\"tbl-ret-bool false\">ValueError</span></td>\n            <td>Raises <code>ValueError: not enough values to unpack (expected 3, got 2)</code>.</td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n  </div>\n\n    <!-- Code Container Subcard -->\n  <div class=\"topic-subcard\" id=\"day05UnpackingCodeSection\">\n    <div class=\"subcard-header-with-audio\">\n      <h4 class=\"subcard-header-title\">Tuple Packing, Variable Swapping &amp; Extended Star Unpacking</h4>\n      <button class=\"audio-play-btn\" onclick=\"playAudio('Day05/New_PyDay05Audio17.mp3', this)\" title=\"Play narration\">\n        <svg class=\"play-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M8 5v14l11-7z\"/></svg>\n      </button>\n    </div>\n    <div class=\"code-block-container\">\n      <div class=\"code-subblock\">\n        <pre><code><span class=\"code-comment\"># 1. Tuple Packing</span>\npoint = 10, 20, 30        <span class=\"code-comment\"># Packed into tuple (10, 20, 30)</span>\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">\"Packed point:\"</span>, point, <span class=\"code-fn\">type</span>(point))\n\n<span class=\"code-comment\"># 2. Exact Unpacking</span>\nx, y, z = point\n<span class=\"code-fn\">print</span>(f<span class=\"code-str\">\"x: {x}, y: {y}, z: {z}\"</span>)  <span class=\"code-comment\"># x: 10, y: 20, z: 30</span>\n\n<span class=\"code-comment\"># 3. Pythonic Variable Swapping (No Temporary Variable Needed!)</span>\na = <span class=\"code-str\">'first'</span>\nb = <span class=\"code-str\">'second'</span>\na, b = b, a\n<span class=\"code-fn\">print</span>(f<span class=\"code-str\">\"Swapped -> a: {a}, b: {b}\"</span>)  <span class=\"code-comment\"># a: second, b: first</span>\n\n<span class=\"code-comment\"># 4. Extended Unpacking with Asterisk (*)</span>\ncountries = (<span class=\"code-str\">'Finland'</span>, <span class=\"code-str\">'Sweden'</span>, <span class=\"code-str\">'Norway'</span>, <span class=\"code-str\">'Denmark'</span>, <span class=\"code-str\">'Iceland'</span>)\nfirst_country, second_country, *scandic_rest = countries\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">\"First:  \"</span>, first_country)    <span class=\"code-comment\"># Finland</span>\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">\"Second: \"</span>, second_country)   <span class=\"code-comment\"># Sweden</span>\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">\"Rest (*):\"</span>, scandic_rest)    <span class=\"code-comment\"># ['Norway', 'Denmark', 'Iceland'] (List!)</span>\n\n<span class=\"code-comment\"># 5. Extracting Head, Middle and Tail</span>\nnumbers = (1, 2, 3, 4, 5, 6, 7, 8)\nhead, *middle, tail = numbers\n<span class=\"code-fn\">print</span>(f<span class=\"code-str\">\"Head: {head} | Tail: {tail} | Middle: {middle}\"</span>)\n<span class=\"code-comment\"># Head: 1 | Tail: 8 | Middle: [2, 3, 4, 5, 6, 7]</span></code></pre>\n      </div>\n    </div>\n  </div>\n\n    <!-- 💡 Key Notes -->\n  <div class=\"py-recall-hook py-keynotes-card\">\n    <div class=\"py-keynotes-icon-wrap\">💡</div>\n    <div class=\"py-recall-body py-keynotes-body\">\n      <div class=\"py-recall-header py-keynotes-header\">\n        <span class=\"py-recall-title py-keynotes-title\">Key Notes</span>\n        <span class=\"py-recall-tag py-keynotes-tag\">UNPACKING &amp; REST COLLECTOR RULES</span>\n      </div>\n      <ul class=\"py-keynotes-list\">\n        <li><strong>Starred Variable Evaluates to List:</strong> Extended unpacking <code>*rest</code> always produces a Python <strong>list</strong>, even if the source sequence was an immutable tuple.</li>\n        <li><strong>Single Star Limitation:</strong> You can only use a single starred expression <code>*</code> in an assignment target list. Using two (e.g. <code>*a, *b = tpl</code>) raises <code>SyntaxError: multiple starred expressions in assignment</code>.</li>\n        <li><strong>Bytecode Optimization for Swap:</strong> <code>a, b = b, a</code> compiles to CPython bytecode <code>ROT_TWO</code> or stack packing, executing atomically in-memory with zero chance of variable overwrites.</li>\n        <li><strong>Zero Rest Evaluation:</strong> If there are no leftover elements to capture, the starred variable evaluates to an empty list <code>[]</code> rather than raising an error.</li>\n      </ul>\n    </div>\n  </div>\n</div>\n<!-- ═══ SECTION 07: Real-World Applications & NamedTuples ═══ -->\n<div class=\"slide-section\" id=\"day05ApplicationsSection\">\n  <h2 class=\"slide-section-title heading-box-wrap heading-with-audio\" id=\"headingApplications\">\n    <span class=\"heading-num-box\">07</span>\n    <span class=\"heading-title-box\">\n      <span class=\"heading-title-text\">NamedTuples & Composite Keys</span>\n      <button class=\"audio-play-btn\" onclick=\"playAudio('Day05/New_PyDay05Audio18.mp3', this)\" title=\"Play narration\">\n        <svg class=\"play-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M8 5v14l11-7z\"/></svg>\n      </button>\n    </span>\n  </h2>\n  <p class=\"section-intro-text\">In enterprise data engineering and data science, tuples serve three critical architectural functions: returning multiple values from functions, acting as <strong>composite dictionary keys</strong> for multi-column aggregations, and powering lightweight, memory-efficient records via <code>from typing import NamedTuple</code>.</p>\n\n  <!-- Real-World Applications Table Subcard (Day 04 Parity) -->\n  <div class=\"topic-subcard\" id=\"day05ApplicationsTableSection\">\n    <div class=\"table-header-wrap\">\n      <h4 class=\"table-header-title\">Real-World Data Analyst Applications of Tuples</h4>\n      <div class=\"table-header-actions\">\n        <div class=\"table-search-box\">\n        <svg class=\"table-search-icon\" width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\"><circle cx=\"11\" cy=\"11\" r=\"8\"/><path d=\"m21 21-4.3-4.3\"/></svg>\n        <input type=\"text\" class=\"table-search-input\" placeholder=\"Search applications...\" oninput=\"filterTableRows(this)\" />\n      </div>\n        <button class=\"audio-play-btn\" onclick=\"playAudio('Day05/New_PyDay05Audio19.mp3', this)\" title=\"Play narration\">\n        <svg class=\"play-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M8 5v14l11-7z\"/></svg>\n      </button>\n      </div>\n    </div>\n    <div class=\"db-mock-table-wrap\">\n      <table class=\"db-table-mock matrix-table\">\n        <thead>\n          <tr>\n            <th>Application Pattern</th>\n            <th>Enterprise Scenario</th>\n            <th>Why Tuples Excel</th>\n            <th>Technical Mechanics &amp; Hashability</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n            <td><code>Multi-Return Functions</code></td>\n            <td>Data transformation metrics</td>\n            <td>Cleaner syntax than dicts; callers unpack directly.</td>\n            <td><code>return min_v, max_v, avg_v</code> automatically packs values into a tuple.</td>\n          </tr>\n          <tr>\n            <td><code>Composite Dict Keys</code></td>\n            <td>Grouping metrics by (Store ID, Date)</td>\n            <td>Lists raise <code>TypeError</code>; tuples are hashable.</td>\n            <td><code>data_cache[(store_id, date)] = kpi</code> enables multi-column primary key lookup without delimiter collision.</td>\n          </tr>\n          <tr>\n            <td><code>Recursive deep_tuple</code></td>\n            <td>Caching nested config / JSON payloads</td>\n            <td>Converts nested mutable lists to nested immutable tuples.</td>\n            <td>Makes entire tree hashable so it can serve as a cache key or set member.</td>\n          </tr>\n          <tr>\n            <td><code>Geospatial Coordinates</code></td>\n            <td>GPS points <code>(lat, lon, alt)</code></td>\n            <td>Guarantees coordinate dimensions cannot be mutated.</td>\n            <td>Immutable fixed-length vector; prevents coordinate drifting bugs.</td>\n          </tr>\n          <tr>\n            <td><code>typing.NamedTuple</code></td>\n            <td>High-throughput ETL record streaming</td>\n            <td>Combines tuple memory footprint with type annotations &amp; dot access.</td>\n            <td>Subclass of <code>tuple</code>; access via <code>t.price</code> and <code>t[0]</code> with zero dict hashing overhead.</td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n  </div>\n\n    <!-- Code Container Subcard -->\n  <div class=\"topic-subcard\" id=\"day05ApplicationsCodeSection\">\n    <div class=\"subcard-header-with-audio\">\n      <h4 class=\"subcard-header-title\">Multi-Returns, Composite Dictionary Keys &amp; NamedTuples</h4>\n      <button class=\"audio-play-btn\" onclick=\"playAudio('Day05/New_PyDay05Audio20.mp3', this)\" title=\"Play narration\">\n        <svg class=\"play-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M8 5v14l11-7z\"/></svg>\n      </button>\n    </div>\n    <div class=\"code-block-container\">\n      <div class=\"code-subblock\">\n        <pre><code>from typing import NamedTuple\n\n<span class=\"code-comment\"># 1. Multiple Return Values from Functions</span>\ndef calculate_kpis(sales):\n    total = <span class=\"code-fn\">sum</span>(sales)\n    count = <span class=\"code-fn\">len</span>(sales)\n    avg = total / count if count > 0 else 0\n    return total, avg, <span class=\"code-fn\">max</span>(sales)  <span class=\"code-comment\"># Implicitly returns a 3-element tuple!</span>\n\ntotal_rev, avg_ticket, peak_sale = calculate_kpis([120, 450, 300, 890])\n<span class=\"code-fn\">print</span>(f<span class=\"code-str\">\"Total: {total_rev} | Avg: {avg_ticket} | Peak: {peak_sale}\"</span>)\n\n<span class=\"code-comment\"># 2. Composite Dictionary Keys &amp; Hashability Requirements</span>\n<span class=\"code-comment\"># Grouping daily metrics by (store_id, date) composite primary key</span>\nstore_metrics = {}\nkey = (<span class=\"code-str\">'STORE_NYC_01'</span>, <span class=\"code-str\">'2026-10-15'</span>)\nstore_metrics[key] = {<span class=\"code-str\">'sales'</span>: 42500, <span class=\"code-str\">'footfall'</span>: 1840}\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">\"Store KPI Lookup:\"</span>, store_metrics[key])\n\n<span class=\"code-comment\"># ⚠️ WHY NOT A LIST? Lists are mutable and unhashable!</span>\n<span class=\"code-kw\">try</span>:\n    bad_dict = {(1, [2]): <span class=\"code-str\">'fails'</span>}\n<span class=\"code-kw\">except</span> <span class=\"code-err\">TypeError</span> <span class=\"code-kw\">as</span> err:\n    <span class=\"code-fn\">print</span>(<span class=\"code-str\">\"Caught Hashability Error:\"</span>, err)  <span class=\"code-comment\"># unhashable type: 'list'</span>\n\n<span class=\"code-comment\"># Recursive deep conversion: converts nested lists to hashable nested tuples</span>\ndef deep_tuple(x):\n    return <span class=\"code-fn\">tuple</span>(deep_tuple(i) for i in x) if isinstance(x, <span class=\"code-fn\">list</span>) else x\n\nnested_config = [1, [2, 3], [4, [5]]]\nhashable_key = deep_tuple(nested_config)\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">\"Deep Hashable Tuple:\"</span>, hashable_key)  <span class=\"code-comment\"># (1, (2, 3), (4, (5,)))</span>\n\n<span class=\"code-comment\"># 3. typing.NamedTuple: Records with Typed Labels &amp; Default Values</span>\nclass Trade(NamedTuple):\n    ticker: str\n    price: float\n    volume: int = 0  <span class=\"code-comment\"># Default field value</span>\n\ntrade = Trade(<span class=\"code-str\">'AAPL'</span>, 235.50, 1500000)\n<span class=\"code-fn\">print</span>(f<span class=\"code-str\">\"Ticker: {trade.ticker} | Price: {trade.price} | Volume: {trade.volume}\"</span>)\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">\"Access by position:\"</span>, trade[0], <span class=\"code-str\">\"| Is tuple subclass:\"</span>, isinstance(trade, <span class=\"code-fn\">tuple</span>))\n\n<span class=\"code-comment\"># Non-destructive update with _replace() produces a NEW NamedTuple</span>\nupdated_trade = trade.<span class=\"code-fn\">_replace</span>(price=240.0)\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">\"Updated Trade:\"</span>, updated_trade)\n\n<span class=\"code-comment\"># Full unpacking supported</span>\nsym, p, vol = updated_trade\n<span class=\"code-fn\">print</span>(f<span class=\"code-str\">\"Unpacked: {sym} @ ${p} (vol={vol})\"</span>)</code></pre>\n      </div>\n    </div>\n  </div>\n\n    <!-- 💡 Key Notes -->\n  <div class=\"py-recall-hook py-keynotes-card\">\n    <div class=\"py-keynotes-icon-wrap\">💡</div>\n    <div class=\"py-recall-body py-keynotes-body\">\n      <div class=\"py-recall-header py-keynotes-header\">\n        <span class=\"py-recall-title py-keynotes-title\">Key Notes</span>\n        <span class=\"py-recall-tag py-keynotes-tag\">ENTERPRISE DATA PATTERNS</span>\n      </div>\n      <ul class=\"py-keynotes-list\">\n        <li><strong>Composite Primary Keys &amp; Hashability:</strong> In Python dictionaries, keys must implement <code>__hash__()</code> and <code>__eq__()</code>. A tuple is hashable <em>if and only if every item inside it is hashable</em>. Tuples eliminate delimiter collision bugs (e.g. <code>f\"{service}|{route}\"</code> collapsing when fields contain <code>|</code>) and avoid continuous string allocation churn.</li>\n        <li><strong>typing.NamedTuple vs dataclass:</strong> <code>from typing import NamedTuple</code> defines an immutable tuple subclass with typed fields, default values, and <code>_replace()</code>. It consumes the exact same minimal memory as a standard tuple and hashes in C, unlike a frozen dataclass which generates a temporary tuple per <code>__hash__</code> call.</li>\n        <li><strong>Immutable Multi-Returns:</strong> When a function returns multiple values separated by commas, Python packs them into a single tuple, ensuring callers receive an unalterable snapshot of the computed state.</li>\n      </ul>\n    </div>\n  </div>\n</div>\n<!-- ═══ SECTION 08: Architectural Decision Matrix ═══ -->\n<div class=\"slide-section\" id=\"day05DecisionSection\">\n  <h2 class=\"slide-section-title heading-box-wrap heading-with-audio\" id=\"headingDecision\">\n    <span class=\"heading-num-box\">08</span>\n    <span class=\"heading-title-box\">\n      <span class=\"heading-title-text\">Tuples vs Lists Matrix</span>\n      <button class=\"audio-play-btn\" onclick=\"playAudio('Day05/New_PyDay05Audio21.mp3', this)\" title=\"Play narration\">\n        <svg class=\"play-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M8 5v14l11-7z\"/></svg>\n      </button>\n    </span>\n  </h2>\n  <p class=\"section-intro-text\">Choosing between a tuple and a list is a core engineering decision. Use this <strong>6-factor architectural decision matrix</strong> to determine the optimal collection type for your data pipeline.</p>\n\n  <!-- Decision Matrix Table Subcard (Day 04 Parity) -->\n  <div class=\"topic-subcard\" id=\"day05DecisionTableSection\">\n    <div class=\"table-header-wrap\">\n      <h4 class=\"table-header-title\">Architectural Decision Matrix: When to Use Tuple vs List</h4>\n      <div class=\"table-header-actions\">\n        <div class=\"table-search-box\">\n        <svg class=\"table-search-icon\" width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\"><circle cx=\"11\" cy=\"11\" r=\"8\"/><path d=\"m21 21-4.3-4.3\"/></svg>\n        <input type=\"text\" class=\"table-search-input\" placeholder=\"Search matrix...\" oninput=\"filterTableRows(this)\" />\n      </div>\n        <button class=\"audio-play-btn\" onclick=\"playAudio('Day05/New_PyDay05Audio22.mp3', this)\" title=\"Play narration\">\n        <svg class=\"play-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M8 5v14l11-7z\"/></svg>\n      </button>\n      </div>\n    </div>\n    <div class=\"db-mock-table-wrap\">\n      <table class=\"db-table-mock matrix-table\">\n        <thead>\n          <tr>\n            <th>Decision Dimension</th>\n            <th>Use a Tuple (tuple)</th>\n            <th>Use a List (list)</th>\n            <th>Engineering Rationale</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n            <td><code>Data Mutability</code></td>\n            <td>Data is fixed and read-only.</td>\n            <td>Data grows, shrinks, or reorders in-place.</td>\n            <td>Tuples prevent accidental data corruption by downstream code.</td>\n          </tr>\n          <tr>\n            <td><code>Semantic Meaning</code></td>\n            <td><strong>Heterogeneous Record</strong> (e.g. name, age, city).</td>\n            <td><strong>Homogeneous Collection</strong> (e.g. temperatures).</td>\n            <td>Position has structural meaning in a tuple; lists represent uniform item queues.</td>\n          </tr>\n          <tr>\n            <td><code>Memory Footprint</code></td>\n            <td>Zero allocation buffer; 40 bytes empty.</td>\n            <td>Over-allocated dynamic buffer; 56 bytes empty.</td>\n            <td>Tuples consume significantly less RAM when caching millions of records.</td>\n          </tr>\n          <tr>\n            <td><code>Dictionary Keys</code></td>\n            <td><span class=\"tbl-ret-bool true\">Supported</span> (if items are hashable).</td>\n            <td><span class=\"tbl-ret-bool false\">Forbidden</span> (raises <code>TypeError</code>).</td>\n            <td>Tuples have <code>__hash__</code> defined; lists strictly do not.</td>\n          </tr>\n          <tr>\n            <td><code>Thread Safety</code></td>\n            <td>Inherently thread-safe for reading.</td>\n            <td>Requires locks or synchronization for writes.</td>\n            <td>Read-only immutable structures prevent data race conditions.</td>\n          </tr>\n          <tr>\n            <td><code>Creation Speed</code></td>\n            <td>Slightly faster ($1.5\\times$ to $2\\times$ faster).</td>\n            <td>Requires heap dynamic array allocation.</td>\n            <td>CPython AST optimizes constant tuples directly into bytecode constants.</td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n  </div>\n\n    <!-- 💡 Key Notes -->\n  <div class=\"py-recall-hook py-keynotes-card\">\n    <div class=\"py-keynotes-icon-wrap\">💡</div>\n    <div class=\"py-recall-body py-keynotes-body\">\n      <div class=\"py-recall-header py-keynotes-header\">\n        <span class=\"py-recall-title py-keynotes-title\">Key Notes</span>\n        <span class=\"py-recall-tag py-keynotes-tag\">ARCHITECTURAL DECISION HEURISTICS</span>\n      </div>\n      <ul class=\"py-keynotes-list\">\n        <li><strong>The Schema Rule:</strong> If positional order represents distinct fields of a schema (e.g. <code>(id, timestamp, status)</code>), use a <strong>tuple</strong>.</li>\n        <li><strong>The Collection Rule:</strong> If elements represent a variable collection of the same entity type (e.g. list of user transactions to append to), use a <strong>list</strong>.</li>\n        <li><strong>The API Contract Rule:</strong> When returning data from a library or microservice where callers should NOT alter the data, return a <strong>tuple</strong> to enforce immutability.</li>\n        <li><strong>The Composite Key Rule:</strong> Whenever you need a multi-part key in a <code>dict</code> or <code>set</code>, use a <strong>tuple</strong>.</li>\n      </ul>\n    </div>\n  </div>\n\n  <!-- Master Summary: The 3 Golden Rules of Tuples -->\n  <div class=\"mental-model-card\">\n    <div class=\"mental-model-header\">\n      <span class=\"mental-model-badge\">Master Engineering Heuristic</span>\n      <h4 class=\"mental-model-title\">The 3 Golden Rules: When to Reach for a Tuple</h4>\n    </div>\n    <div class=\"mental-model-grid\">\n      <div class=\"model-pane pane-tuple\">\n        <h5 class=\"model-pane-title\">Rule 1: Fixed Schemas &amp; Records 📋</h5>\n        <p class=\"model-pane-desc\">If positions have fixed identity (e.g. <code>(user_id, email, signup_date)</code> or <code>(x, y, z)</code>), use a <strong>tuple</strong> or <strong>namedtuple</strong>. A list implies a dynamic queue where any element can be removed or swapped.</p>\n      </div>\n      <div class=\"model-pane pane-list\">\n        <h5 class=\"model-pane-title\">Rule 2: Dictionary Keys &amp; Coordinates 🔑</h5>\n        <p class=\"model-pane-desc\">Whenever you need composite lookup coordinates (e.g. <code>geo_cache[(latitude, longitude)] = weather</code>), only an immutable, hashable <strong>tuple</strong> is permitted by Python.</p>\n      </div>\n    </div>\n  </div>\n</div>\n<!-- ═══ SECTION 09: Master Anti-Pattern Diagnostic Table ═══ -->\n<div class=\"slide-section\" id=\"day05MistakesSection\">\n  <h2 class=\"slide-section-title heading-box-wrap heading-with-audio\" id=\"headingMistakes\">\n    <span class=\"heading-num-box\">09</span>\n    <span class=\"heading-title-box\">\n      <span class=\"heading-title-text\">Common Anti-Patterns</span>\n      <button class=\"audio-play-btn\" onclick=\"playAudio('Day05/New_PyDay05Audio23.mp3', this)\" title=\"Play narration\">\n        <svg class=\"play-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M8 5v14l11-7z\"/></svg>\n      </button>\n    </span>\n  </h2>\n  <p class=\"section-intro-text\">Mastering tuples requires recognizing cognitive traps and subtle CPython runtime behaviors. Review this comprehensive diagnostic table detailing the 10 most common tuple bugs, error traces, and exact production fixes.</p>\n\n  <!-- Anti-Pattern Diagnostic Table Subcard (Day 04 Parity) -->\n  <div class=\"topic-subcard\" id=\"day05MistakesTableSection\">\n    <div class=\"table-header-wrap\">\n      <h4 class=\"table-header-title\">The Top 10 Tuple Anti-Patterns &amp; Production Auto-Fixes</h4>\n      <div class=\"table-header-actions\">\n        <div class=\"table-search-box\">\n        <svg class=\"table-search-icon\" width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\"><circle cx=\"11\" cy=\"11\" r=\"8\"/><path d=\"m21 21-4.3-4.3\"/></svg>\n        <input type=\"text\" class=\"table-search-input\" placeholder=\"Search traps...\" oninput=\"filterTableRows(this)\" />\n      </div>\n        <button class=\"audio-play-btn\" onclick=\"playAudio('Day05/New_PyDay05Audio24.mp3', this)\" title=\"Play narration\">\n        <svg class=\"play-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M8 5v14l11-7z\"/></svg>\n      </button>\n      </div>\n    </div>\n    <div class=\"db-mock-table-wrap\">\n      <table class=\"db-table-mock anti-pattern-table\">\n        <thead>\n          <tr>\n            <th>Anti-Pattern Code Trap</th>\n            <th>Runtime Result &amp; Exception</th>\n            <th>Root Cause Explanation</th>\n            <th>Production-Grade Auto-Fix</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n            <td><code class=\"ap-code-bad\">x = (42)</code></td>\n            <td><span class=\"ap-result-bad\">type(x) == int</span></td>\n            <td>Missing trailing comma. Parentheses evaluate as an arithmetic grouping operator, not a tuple.</td>\n            <td><code class=\"ap-code-fix\">x = (42,)  # Add trailing comma</code></td>\n          </tr>\n          <tr>\n            <td><code class=\"ap-code-bad\">t = (1, 2, 3)<br>t[0] = 99</code></td>\n            <td><span class=\"ap-result-bad\">TypeError: 'tuple' object does not support item assignment</span></td>\n            <td>Tuples are immutable; direct item assignment to existing pointer offsets is strictly forbidden.</td>\n            <td><code class=\"ap-code-fix\"># Conversion roundtrip:<br>lst = list(t); lst[0] = 99; t = tuple(lst)</code></td>\n          </tr>\n          <tr>\n            <td><code class=\"ap-code-bad\">t = (1, 2, 3)<br>t.append(4)</code></td>\n            <td><span class=\"ap-result-bad\">AttributeError: 'tuple' object has no attribute 'append'</span></td>\n            <td>Tuples do not possess list mutation methods (<code>append</code>, <code>pop</code>, <code>insert</code>).</td>\n            <td><code class=\"ap-code-fix\">t = t + (4,)  # Concatenate new tuple</code></td>\n          </tr>\n          <tr>\n            <td><code class=\"ap-code-bad\">t = (1, [2, 3])<br>t[1] += [4]</code></td>\n            <td><span class=\"ap-result-bad\">TypeError: 'tuple' object does not support item assignment</span></td>\n            <td>In-place addition mutates the list, but then attempts reassignment to <code>t[1]</code> which fails!</td>\n            <td><code class=\"ap-code-fix\">t[1].extend([4])  # Direct in-place method</code></td>\n          </tr>\n          <tr>\n            <td><code class=\"ap-code-bad\">t = ('a', 'b')<br>idx = t.index('z')</code></td>\n            <td><span class=\"ap-result-bad\">ValueError: tuple.index(x): x not in tuple</span></td>\n            <td>Unlike <code>.count()</code> which returns 0, <code>.index()</code> raises <code>ValueError</code> on missing values.</td>\n            <td><code class=\"ap-code-fix\">if 'z' in t:<br>&nbsp;&nbsp;idx = t.index('z')<br>else:<br>&nbsp;&nbsp;idx = -1</code></td>\n          </tr>\n          <tr>\n            <td><code class=\"ap-code-bad\">a, b = (1, 2, 3)</code></td>\n            <td><span class=\"ap-result-bad\">ValueError: too many values to unpack (expected 2)</span></td>\n            <td>Target variables (2) do not match the number of source tuple elements (3).</td>\n            <td><code class=\"ap-code-fix\">a, *b = (1, 2, 3)  # Use *rest collector</code></td>\n          </tr>\n          <tr>\n            <td><code class=\"ap-code-bad\">num = 10,</code></td>\n            <td><span class=\"ap-result-bad\">num == (10,)  # Accidental tuple!</span></td>\n            <td>Accidental trailing comma after a value turns the variable into a 1-element tuple.</td>\n            <td><code class=\"ap-code-fix\">num = 10  # Remove trailing comma</code></td>\n          </tr>\n          <tr>\n            <td><code class=\"ap-code-bad\">t = (1, 2, 3, 4)<br>rev = t[1:3:-1]</code></td>\n            <td><span class=\"ap-result-bad\">rev == ()  # Unexpected empty tuple</span></td>\n            <td>Negative step requires <code>start &gt; stop</code>. Slicing forward with negative step returns empty.</td>\n            <td><code class=\"ap-code-fix\">rev = t[3:1:-1]  # start > stop for neg step</code></td>\n          </tr>\n          <tr>\n            <td><code class=\"ap-code-bad\">d = {}<br>d[(1, [2, 3])] = True</code></td>\n            <td><span class=\"ap-result-bad\">TypeError: unhashable type: 'list'</span></td>\n            <td>A tuple is only hashable if <strong>every</strong> item inside it is also hashable.</td>\n            <td><code class=\"ap-code-fix\">d[(1, (2, 3))] = True  # Use nested tuple</code></td>\n          </tr>\n          <tr>\n            <td><code class=\"ap-code-bad\">del t[0]</code></td>\n            <td><span class=\"ap-result-bad\">TypeError: 'tuple' object doesn't support item deletion</span></td>\n            <td>Individual tuple elements cannot be deleted. Only the entire tuple variable can be deleted.</td>\n            <td><code class=\"ap-code-fix\"># Slicing omission:<br>t = t[:0] + t[1:]  # Or del t for whole var</code></td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n  </div>\n\n    <!-- 💡 Key Notes -->\n  <div class=\"py-recall-hook py-keynotes-card\">\n    <div class=\"py-keynotes-icon-wrap\">💡</div>\n    <div class=\"py-recall-body py-keynotes-body\">\n      <div class=\"py-recall-header py-keynotes-header\">\n        <span class=\"py-recall-title py-keynotes-title\">Key Notes</span>\n        <span class=\"py-recall-tag py-keynotes-tag\">DIAGNOSTIC &amp; DEBUGGING HEURISTICS</span>\n      </div>\n      <ul class=\"py-keynotes-list\">\n        <li><strong>The Comma Audit:</strong> Always check trailing commas. A trailing comma in <code>x = 100,</code> creates an unintended tuple; omitting it in <code>x = (100)</code> creates an unintended integer.</li>\n        <li><strong>Guard All .index() Calls:</strong> Never call <code>t.index(x)</code> without an <code>if x in t:</code> guard in production data pipelines.</li>\n        <li><strong>Nested Mutability Gotcha:</strong> Never use <code>+=</code> on mutable elements inside a tuple. Use explicit methods like <code>.append()</code> or <code>.extend()</code> instead.</li>\n        <li><strong>Hashability Chain:</strong> Container immutability does not guarantee hashability. A tuple containing even a single list or dictionary is strictly unhashable.</li>\n      </ul>\n    </div>\n  </div>\n</div>\n<!-- ═══ SECTION 10: Interview questions ═══ -->\n<div class=\"slide-section\" id=\"day05InterviewQuestions\">\n  <h2 class=\"slide-section-title heading-box-wrap heading-with-audio\" id=\"headingInterview\">\n    <span class=\"heading-num-box\">10</span>\n    <span class=\"heading-title-box\">\n      <span class=\"heading-title-text\">Review & Interview Questions</span>\n    </span>\n  </h2>\n  \n  <div class=\"interview-box\">\n    <h4 class=\"interview-header-title\">\n      <span>🎯</span> Python Tuples &amp; Immutability Core Concepts\n    </h4>\n\n    <div class=\"interview-item\" id=\"pyDay05IQ1\">\n      <p class=\"interview-question\"><strong>Q1: How are Python tuples implemented in CPython at the systems level?</strong></p>\n      <div class=\"interview-answer\"><p><em>A: In CPython, a tuple is implemented as a <code>PyTupleObject</code>, which wraps a fixed-size, contiguous array of 64-bit pointers (<code>PyObject* ob_item[1]</code>). Unlike <code>PyListObject</code>, it has no dynamic pointer buffer, no over-allocation slack, and cannot be resized after instantiation.</em></p></div>\n    </div>\n    <hr class=\"interview-divider\" />\n\n    <div class=\"interview-item\" id=\"pyDay05IQ2\">\n      <p class=\"interview-question\"><strong>Q2: Why are tuples more memory-efficient than lists in CPython?</strong></p>\n      <div class=\"interview-answer\"><p><em>A: Tuples allocate exact memory for $N$ pointers with zero buffer headroom. Lists allocate extra unused capacity slots (roughly $9/8$ growth) to support amortized $O(1)$ appends. Furthermore, empty tuples consume 40 bytes vs 56 bytes for lists on 64-bit systems.</em></p></div>\n    </div>\n    <hr class=\"interview-divider\" />\n\n    <div class=\"interview-item\" id=\"pyDay05IQ3\">\n      <p class=\"interview-question\"><strong>Q3: What is the CPython small tuple free list optimization?</strong></p>\n      <div class=\"interview-answer\"><p><em>A: CPython maintains an internal array of recycled tuple structures (<code>free_list</code>) for tuples of lengths 1 to 20. When a small tuple is deallocated, its memory block is placed on the free list and reused directly for future allocations, eliminating expensive kernel <code>malloc()</code> syscalls.</em></p></div>\n    </div>\n    <hr class=\"interview-divider\" />\n\n    <div class=\"interview-item\" id=\"pyDay05IQ4\">\n      <p class=\"interview-question\"><strong>Q4: Can a tuple always be used as a dictionary key or set element? Explain.</strong></p>\n      <div class=\"interview-answer\"><p><em>A: No. A tuple is only hashable if <strong>every element</strong> contained inside it is also hashable. In CPython, <code>tuple.__hash__</code> folds the hashes of every element with an xxHash-derived mixing step, taking $O(k)$ time per lookup. If any item is mutable (e.g. <code>(1, [2, 3])</code>), <code>hash()</code> fails on that item and Python raises <code>TypeError: unhashable type: 'list'</code>.</em></p></div>\n    </div>\n    <hr class=\"interview-divider\" />\n\n    <div class=\"interview-item\" id=\"pyDay05IQ5\">\n      <p class=\"interview-question\"><strong>Q5: Why does <code>t = (1, [2, 3]); t[1] += [4]</code> mutate the list AND raise a <code>TypeError</code>?</strong></p>\n      <div class=\"interview-answer\"><p><em>A: Augmented assignment (<code>+=</code>) compiles to two bytecode steps: <code>INPLACE_ADD</code> and <code>STORE_SUBSCR</code>. <code>INPLACE_ADD</code> mutates the list buffer in-place successfully. Then <code>STORE_SUBSCR</code> attempts to re-assign the list reference back into <code>t[1]</code>. Because <code>t</code> is an immutable tuple, the reassignment raises <code>TypeError: 'tuple' object does not support item assignment</code> after mutation has already occurred! Production fix: never use <code>+=</code> on a list inside a tuple; call <code>t[1].extend([4])</code> directly instead.</em></p></div>\n    </div>\n    <hr class=\"interview-divider\" />\n\n    <div class=\"interview-item\" id=\"pyDay05IQ6\">\n      <p class=\"interview-question\"><strong>Q6: What is the difference between <code>a = (42)</code> and <code>b = (42,)</code>?</strong></p>\n      <div class=\"interview-answer\"><p><em>A: In Python, parentheses are used for expression grouping as well as tuple definition. <code>(42)</code> evaluates as the integer <code>42</code> in grouping parentheses. <code>(42,)</code> has a trailing comma, which tells the parser to construct a 1-element tuple.</em></p></div>\n    </div>\n    <hr class=\"interview-divider\" />\n\n    <div class=\"interview-item\" id=\"pyDay05IQ7\">\n      <p class=\"interview-question\"><strong>Q7: Why do tuples have only two methods (<code>count</code> and <code>index</code>)?</strong></p>\n      <div class=\"interview-answer\"><p><em>A: Methods like <code>append</code>, <code>insert</code>, <code>extend</code>, <code>pop</code>, <code>remove</code>, <code>clear</code>, <code>sort</code>, and <code>reverse</code> all mutate sequence state in-place. Because tuples are strictly immutable, any mutating method would violate the core language invariant of the tuple type.</em></p></div>\n    </div>\n    <hr class=\"interview-divider\" />\n\n    <div class=\"interview-item\" id=\"pyDay05IQ8\">\n      <p class=\"interview-question\"><strong>Q8: How does variable swapping <code>a, b = b, a</code> work under the hood without a temporary variable?</strong></p>\n      <div class=\"interview-answer\"><p><em>A: In Python 3.11+, CPython optimizes 2-variable swaps directly: the compiler loads both names onto the value stack and emits a specialized <code>SWAP</code> bytecode instruction (replacing legacy <code>ROT_TWO</code>), followed by <code>STORE_NAME</code>. No temporary tuple object is allocated in heap memory, making the swap both idiomatic and lightning-fast.</em></p></div>\n    </div>\n    <hr class=\"interview-divider\" />\n\n    <div class=\"interview-item\" id=\"pyDay05IQ9\">\n      <p class=\"interview-question\"><strong>Q9: What is extended unpacking and what type does the starred variable evaluate to?</strong></p>\n      <div class=\"interview-answer\"><p><em>A: Extended unpacking allows using <code>*var</code> to capture variable-length slices: <code>first, *middle, last = tpl</code>. The starred variable <strong>always evaluates to a list</strong>, regardless of whether the source iterable was a tuple, string, or set.</em></p></div>\n    </div>\n    <hr class=\"interview-divider\" />\n\n    <div class=\"interview-item\" id=\"pyDay05IQ10\">\n      <p class=\"interview-question\"><strong>Q10: What happens during extended unpacking if there are no leftover elements for the starred variable?</strong></p>\n      <div class=\"interview-answer\"><p><em>A: If the source tuple has exactly enough elements to satisfy the non-starred target variables (e.g. <code>first, *middle, last = (10, 20)</code>), <code>*middle</code> evaluates to an empty list <code>[]</code> without throwing any error.</em></p></div>\n    </div>\n    <hr class=\"interview-divider\" />\n\n    <div class=\"interview-item\" id=\"pyDay05IQ11\">\n      <p class=\"interview-question\"><strong>Q11: How does slicing a tuple differ from slicing a list?</strong></p>\n      <div class=\"interview-answer\"><p><em>A: Slicing a tuple produces a brand new tuple, while slicing a list produces a new list. Both perform shallow copies of element pointers. However, empty tuple slicing or full slicing <code>t[:]</code> can be optimized by CPython to return the original tuple reference since immutability guarantees safety.</em></p></div>\n    </div>\n    <hr class=\"interview-divider\" />\n\n    <div class=\"interview-item\" id=\"pyDay05IQ12\">\n      <p class=\"interview-question\"><strong>Q12: What is the 'Forgiving Stop-Sign Rule' in tuple slicing?</strong></p>\n      <div class=\"interview-answer\"><p><em>A: Direct indexing <code>t[99]</code> strictly requires the index to be within bounds, raising <code>IndexError</code> if violated. In contrast, slicing <code>t[1:99]</code> clamps gracefully to the container boundaries (<code>len(t)</code>) without throwing any exception.</em></p></div>\n    </div>\n    <hr class=\"interview-divider\" />\n\n    <div class=\"interview-item\" id=\"pyDay05IQ13\">\n      <p class=\"interview-question\"><strong>Q13: What is <code>collections.namedtuple</code> and what advantages does it offer over regular tuples and dicts?</strong></p>\n      <div class=\"interview-answer\"><p><em>A: Both <code>collections.namedtuple</code> and modern <code>from typing import NamedTuple</code> define lightweight tuple subclasses with named fields. <code>typing.NamedTuple</code> adds type annotations and default values using class syntax. Both provide dot attribute access (<code>p.x</code>) and $O(1)$ index access (<code>p[0]</code>), consume the exact same minimal memory as regular tuples (zero <code>__dict__</code> overhead), hash in C, and support tuple unpacking.</em></p></div>\n    </div>\n    <hr class=\"interview-divider\" />\n\n    <div class=\"interview-item\" id=\"pyDay05IQ14\">\n      <p class=\"interview-question\"><strong>Q14: How can you modify a field in a <code>namedtuple</code>?</strong></p>\n      <div class=\"interview-answer\"><p><em>A: Because namedtuples are immutable, fields cannot be modified in-place. Use the built-in <code>_replace(**kwargs)</code> method, which returns a <strong>new</strong> namedtuple instance with the specified fields replaced.</em></p></div>\n    </div>\n    <hr class=\"interview-divider\" />\n\n    <div class=\"interview-item\" id=\"pyDay05IQ15\">\n      <p class=\"interview-question\"><strong>Q15: What is constant folding for tuples in CPython AST compilation?</strong></p>\n      <div class=\"interview-answer\"><p><em>A: During compilation, if a tuple contains only literal constants (e.g. <code>(1, 2, 'hello')</code>), CPython's peephole optimizer folds the expression into a single constant object stored directly in code object <code>co_consts</code>. At runtime, creation takes $O(1)$ with 0 construction overhead.</em></p></div>\n    </div>\n    <hr class=\"interview-divider\" />\n\n    <div class=\"interview-item\" id=\"pyDay05IQ16\">\n      <p class=\"interview-question\"><strong>Q16: Why is <code>tuple.index(x)</code> dangerous without an <code>in</code> check?</strong></p>\n      <div class=\"interview-answer\"><p><em>A: Unlike <code>.count(x)</code> which returns <code>0</code> when <code>x</code> is missing, <code>.index(x)</code> raises an unhandled <code>ValueError: tuple.index(x): x not in tuple</code>. In production pipelines, always guard with <code>if x in tpl: idx = tpl.index(x)</code>.</em></p></div>\n    </div>\n    <hr class=\"interview-divider\" />\n\n    <div class=\"interview-item\" id=\"pyDay05IQ17\">\n      <p class=\"interview-question\"><strong>Q17: How do you reverse a tuple efficiently?</strong></p>\n      <div class=\"interview-answer\"><p><em>A: Use the slice shortcut <code>tpl[::-1]</code> to allocate a new reversed tuple, or <code>reversed(tpl)</code> to obtain a lazy reverse iterator ($O(1)$ memory overhead) when traversing elements sequentially without storing the result.</em></p></div>\n    </div>\n    <hr class=\"interview-divider\" />\n\n    <div class=\"interview-item\" id=\"pyDay05IQ18\">\n      <p class=\"interview-question\"><strong>Q18: What is the Conversion Roundtrip Pattern for modifying tuples?</strong></p>\n      <div class=\"interview-answer\"><p><em>A: Convert the tuple to a list <code>lst = list(tpl)</code>, perform arbitrary mutations (e.g. <code>lst.append()</code>, <code>lst.sort()</code>, <code>lst[i] = v</code>), and convert back to an immutable tuple <code>tpl = tuple(lst)</code>.</em></p></div>\n    </div>\n    <hr class=\"interview-divider\" />\n\n    <div class=\"interview-item\" id=\"pyDay05IQ19\">\n      <p class=\"interview-question\"><strong>Q19: Why does <code>del tpl[0]</code> fail while <code>del tpl</code> succeeds?</strong></p>\n      <div class=\"interview-answer\"><p><em>A: <code>del tpl[0]</code> attempts to delete an element from the immutable tuple buffer, which raises <code>TypeError: 'tuple' object doesn't support item deletion</code>. <code>del tpl</code> unbinds the variable name from local namespace scope, allowing Python's garbage collector to reclaim the object.</em></p></div>\n    </div>\n    <hr class=\"interview-divider\" />\n\n    <div class=\"interview-item\" id=\"pyDay05IQ20\">\n      <p class=\"interview-question\"><strong>Q20: How does Python evaluate <code>tpl1 + tpl2</code> in memory?</strong></p>\n      <div class=\"interview-answer\"><p><em>A: It evaluates the lengths $N$ and $M$, allocates a fresh <code>PyTupleObject</code> of size $N + M$, copies all $N$ pointers from <code>tpl1</code>, copies all $M$ pointers from <code>tpl2</code>, and returns the new tuple ($O(N + M)$ time and memory).</em></p></div>\n    </div>\n    <hr class=\"interview-divider\" />\n\n    <div class=\"interview-item\" id=\"pyDay05IQ21\">\n      <p class=\"interview-question\"><strong>Q21: Can a tuple have self-referential or cyclic references?</strong></p>\n      <div class=\"interview-answer\"><p><em>A: Yes! Although tuples are immutable, a tuple containing a list can have that list append the tuple itself: <code>lst = []; t = (lst,); lst.append(t)</code>. This creates a reference cycle that CPython's cyclic garbage collector (gc) must resolve.</em></p></div>\n    </div>\n    <hr class=\"interview-divider\" />\n\n    <div class=\"interview-item\" id=\"pyDay05IQ22\">\n      <p class=\"interview-question\"><strong>Q22: Why are tuples preferred over lists as function parameters in concurrent/multi-threaded code?</strong></p>\n      <div class=\"interview-answer\"><p><em>A: Tuples are immutable and read-only. Multiple threads can read from the same tuple simultaneously without acquiring locks (mutexes), guaranteeing total thread safety and eliminating data race conditions.</em></p></div>\n    </div>\n    <hr class=\"interview-divider\" />\n\n    <div class=\"interview-item\" id=\"pyDay05IQ23\">\n      <p class=\"interview-question\"><strong>Q23: What is the time complexity of checking <code>x in my_tuple</code> versus <code>x in my_set</code>?</strong></p>\n      <div class=\"interview-answer\"><p><em>A: <code>x in my_tuple</code> is $O(N)$ linear time because it performs sequential pointer comparisons from head to tail. <code>x in my_set</code> is average $O(1)$ constant time because sets use a hash table lookup.</em></p></div>\n    </div>\n    <hr class=\"interview-divider\" />\n\n    <div class=\"interview-item\" id=\"pyDay05IQ24\">\n      <p class=\"interview-question\"><strong>Q24: How does <code>sys.intern()</code> or constant interning relate to tuples?</strong></p>\n      <div class=\"interview-answer\"><p><em>A: Empty tuples <code>()</code> are singletons in CPython: any empty tuple references the exact same memory address (<code>() is ()</code> evaluates to <code>True</code>). Furthermore, constant tuples defined in the same module are deduplicated in the code object constants table.</em></p></div>\n    </div>\n    <hr class=\"interview-divider\" />\n\n    <div class=\"interview-item\" id=\"pyDay05IQ25\">\n      <p class=\"interview-question\"><strong>Q25: How do you unpack a nested tuple like <code>person = ('Asha', (28, 'Data Analyst'))</code>?</strong></p>\n      <div class=\"interview-answer\"><p><em>A: Match the nested structure in the assignment target: <code>name, (age, role) = person</code>. Python recursively unpacks the outer tuple, then unpacks the inner tuple into <code>age</code> and <code>role</code> in a single statement.</em></p></div>\n    </div>\n    \n\n  </div>\n</div>\n"
    }
  ],
  "practiceQuestions": [
    {
      "id": 1,
      "difficulty": "Easy",
      "category": "creation",
      "title": "Empty Tuple Initialization",
      "given": "empty_paren = ()\nempty_func = tuple()",
      "outputs": [
        "empty_paren",
        "empty_func",
        "len_paren",
        "len_func"
      ],
      "starterCode": "",
      "desc": "Create an empty tuple using literal parentheses () and assign it to empty_paren. Create another empty tuple using the tuple() constructor and assign it to empty_func. Store their lengths in len_paren and len_func.",
      "prompt": "<strong>[Easy] Empty Tuple Initialization</strong><p>Create an empty tuple using literal parentheses <code>()</code> and assign it to <code>empty_paren</code>. Create another empty tuple using constructor <code>tuple()</code> and assign to <code>empty_func</code>. Store their lengths in <code>len_paren</code> and <code>len_func</code>.</p>",
      "ref": "empty_paren = ()\nempty_func = tuple()\nlen_paren = len(empty_paren)\nlen_func = len(empty_func)\nprint(f\"Paren: {empty_paren} (len: {len_paren}) | Func: {empty_func} (len: {len_func})\")\n",
      "solution": "empty_paren = ()\nempty_func = tuple()\nlen_paren = len(empty_paren)\nlen_func = len(empty_func)\nprint(f\"Paren: {empty_paren} (len: {len_paren}) | Func: {empty_func} (len: {len_func})\")\n",
      "target": "Paren: () (len: 0) | Func: () (len: 0)\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "empty_paren",
            "type": "tuple",
            "value": [],
            "exact": true
          },
          {
            "name": "empty_func",
            "type": "tuple",
            "value": [],
            "exact": true
          },
          {
            "name": "len_paren",
            "type": "int",
            "value": 0,
            "exact": true
          },
          {
            "name": "len_func",
            "type": "int",
            "value": 0,
            "exact": true
          }
        ]
      },
      "explanation": "Empty tuples can be defined using empty parentheses () or constructor tuple(). Both evaluate to an immutable tuple with length 0.",
      "hint": "Use () for empty_paren, tuple() for empty_func, and len() to find lengths."
    },
    {
      "id": 2,
      "difficulty": "Easy",
      "category": "creation",
      "title": "The Single-Element Comma Rule",
      "given": "item = 'Python'",
      "outputs": [
        "single_tuple",
        "tuple_len",
        "is_tuple"
      ],
      "starterCode": "",
      "desc": "Create a single-element tuple containing the string 'Python' and store it in single_tuple. Store its length in tuple_len, and verify its type is tuple by storing isinstance(single_tuple, tuple) in is_tuple.",
      "prompt": "<strong>[Easy] The Single-Element Comma Rule</strong><p>Create a single-element tuple containing <code>'Python'</code> and assign to <code>single_tuple</code> (remember the trailing comma!). Store its length in <code>tuple_len</code>, and store <code>isinstance(single_tuple, tuple)</code> in <code>is_tuple</code>.</p>",
      "ref": "single_tuple = ('Python',)\ntuple_len = len(single_tuple)\nis_tuple = isinstance(single_tuple, tuple)\nprint(f\"Tuple: {single_tuple} | Length: {tuple_len} | Is Tuple: {is_tuple}\")\n",
      "solution": "single_tuple = ('Python',)\ntuple_len = len(single_tuple)\nis_tuple = isinstance(single_tuple, tuple)\nprint(f\"Tuple: {single_tuple} | Length: {tuple_len} | Is Tuple: {is_tuple}\")\n",
      "target": "Tuple: ('Python',) | Length: 1 | Is Tuple: True\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "single_tuple",
            "type": "tuple",
            "value": [
              "Python"
            ],
            "exact": true
          },
          {
            "name": "tuple_len",
            "type": "int",
            "value": 1,
            "exact": true
          },
          {
            "name": "is_tuple",
            "type": "bool",
            "value": true,
            "exact": true
          }
        ]
      },
      "explanation": "A single item inside parentheses without a comma is treated as mathematical grouping. A trailing comma ('Python',) is required to construct a 1-element tuple.",
      "hint": "Remember to put a comma after 'Python': ('Python',)."
    },
    {
      "id": 3,
      "difficulty": "Easy",
      "category": "creation",
      "title": "Sibling Tuples & Length Inspection",
      "given": "brothers = ('John', 'Alex')\nsisters = ('Mary', 'Sarah', 'Emma')",
      "outputs": [
        "num_brothers",
        "num_sisters"
      ],
      "starterCode": "",
      "desc": "Define brothers = ('John', 'Alex') and sisters = ('Mary', 'Sarah', 'Emma'). Store the count of brothers in num_brothers and count of sisters in num_sisters.",
      "prompt": "<strong>[Easy] Sibling Tuples & Length Inspection</strong><p>Define <code>brothers = ('John', 'Alex')</code> and <code>sisters = ('Mary', 'Sarah', 'Emma')</code>. Calculate and store their lengths in <code>num_brothers</code> and <code>num_sisters</code>.</p>",
      "ref": "brothers = ('John', 'Alex')\nsisters = ('Mary', 'Sarah', 'Emma')\nnum_brothers = len(brothers)\nnum_sisters = len(sisters)\nprint(f\"Brothers: {num_brothers} | Sisters: {num_sisters}\")\n",
      "solution": "brothers = ('John', 'Alex')\nsisters = ('Mary', 'Sarah', 'Emma')\nnum_brothers = len(brothers)\nnum_sisters = len(sisters)\nprint(f\"Brothers: {num_brothers} | Sisters: {num_sisters}\")\n",
      "target": "Brothers: 2 | Sisters: 3\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "num_brothers",
            "type": "int",
            "value": 2,
            "exact": true
          },
          {
            "name": "num_sisters",
            "type": "int",
            "value": 3,
            "exact": true
          }
        ]
      },
      "explanation": "len() measures the number of top-level elements inside a tuple.",
      "hint": "Use len(brothers) and len(sisters)."
    },
    {
      "id": 4,
      "difficulty": "Easy",
      "category": "joining",
      "title": "Joining Tuples with the Concatenation Operator",
      "given": "brothers = ('John', 'Alex')\nsisters = ('Mary', 'Sarah', 'Emma')",
      "outputs": [
        "siblings",
        "total_siblings"
      ],
      "starterCode": "",
      "desc": "Join the brothers and sisters tuples using the + operator and store the result in siblings. Store the total sibling count in total_siblings.",
      "prompt": "<strong>[Easy] Joining Tuples with the Concatenation Operator</strong><p>Given <code>brothers = ('John', 'Alex')</code> and <code>sisters = ('Mary', 'Sarah', 'Emma')</code>, join them using <code>+</code> into <code>siblings</code>. Store the length in <code>total_siblings</code>.</p>",
      "ref": "brothers = ('John', 'Alex')\nsisters = ('Mary', 'Sarah', 'Emma')\nsiblings = brothers + sisters\ntotal_siblings = len(siblings)\nprint(f\"Siblings: {siblings} | Total: {total_siblings}\")\n",
      "solution": "brothers = ('John', 'Alex')\nsisters = ('Mary', 'Sarah', 'Emma')\nsiblings = brothers + sisters\ntotal_siblings = len(siblings)\nprint(f\"Siblings: {siblings} | Total: {total_siblings}\")\n",
      "target": "Siblings: ('John', 'Alex', 'Mary', 'Sarah', 'Emma') | Total: 5\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "siblings",
            "type": "tuple",
            "value": [
              "John",
              "Alex",
              "Mary",
              "Sarah",
              "Emma"
            ],
            "exact": true
          },
          {
            "name": "total_siblings",
            "type": "int",
            "value": 5,
            "exact": true
          }
        ]
      },
      "explanation": "The + operator concatenates two tuples into a brand-new tuple, preserving the original ordering of elements.",
      "hint": "Use siblings = brothers + sisters."
    },
    {
      "id": 5,
      "difficulty": "Easy",
      "category": "joining",
      "title": "Creating the Family Members Tree",
      "given": "parents = ('David', 'Grace')\nsiblings = ('John', 'Alex', 'Mary', 'Sarah', 'Emma')",
      "outputs": [
        "family_members",
        "family_count"
      ],
      "starterCode": "",
      "desc": "Combine parents and siblings to form a unified family_members tuple (parents first, followed by siblings). Store the total count in family_count.",
      "prompt": "<strong>[Easy] Creating the Family Members Tree</strong><p>Given <code>parents = ('David', 'Grace')</code> and <code>siblings = ('John', 'Alex', 'Mary', 'Sarah', 'Emma')</code>, concatenate them with parents first into <code>family_members</code>. Store the total count in <code>family_count</code>.</p>",
      "ref": "parents = ('David', 'Grace')\nsiblings = ('John', 'Alex', 'Mary', 'Sarah', 'Emma')\nfamily_members = parents + siblings\nfamily_count = len(family_members)\nprint(f\"Family: {family_members} | Count: {family_count}\")\n",
      "solution": "parents = ('David', 'Grace')\nsiblings = ('John', 'Alex', 'Mary', 'Sarah', 'Emma')\nfamily_members = parents + siblings\nfamily_count = len(family_members)\nprint(f\"Family: {family_members} | Count: {family_count}\")\n",
      "target": "Family: ('David', 'Grace', 'John', 'Alex', 'Mary', 'Sarah', 'Emma') | Count: 7\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "family_members",
            "type": "tuple",
            "value": [
              "David",
              "Grace",
              "John",
              "Alex",
              "Mary",
              "Sarah",
              "Emma"
            ],
            "exact": true
          },
          {
            "name": "family_count",
            "type": "int",
            "value": 7,
            "exact": true
          }
        ]
      },
      "explanation": "Concatenating tuples allocates a new tuple in RAM holding references to all combined elements in sequence.",
      "hint": "family_members = parents + siblings."
    },
    {
      "id": 6,
      "difficulty": "Easy",
      "category": "indexing",
      "title": "Accessing Extremes with Positive and Negative Indexing",
      "given": "fruits = ('banana', 'orange', 'mango', 'lemon')",
      "outputs": [
        "first_fruit",
        "second_fruit",
        "last_fruit",
        "second_last"
      ],
      "starterCode": "",
      "desc": "Given fruits = ('banana', 'orange', 'mango', 'lemon'), access the first fruit with index 0, the second fruit with index 1, the last fruit with index -1, and the second-last fruit with index -2.",
      "prompt": "<strong>[Easy] Accessing Extremes with Positive and Negative Indexing</strong><p>Given <code>fruits = ('banana', 'orange', 'mango', 'lemon')</code>:</p><p>Assign index 0 to <code>first_fruit</code>, index 1 to <code>second_fruit</code>, index -1 to <code>last_fruit</code>, and index -2 to <code>second_last</code>.</p>",
      "ref": "fruits = ('banana', 'orange', 'mango', 'lemon')\nfirst_fruit = fruits[0]\nsecond_fruit = fruits[1]\nlast_fruit = fruits[-1]\nsecond_last = fruits[-2]\nprint(f\"First: {first_fruit} | Second: {second_fruit} | Last: {last_fruit} | 2nd Last: {second_last}\")\n",
      "solution": "fruits = ('banana', 'orange', 'mango', 'lemon')\nfirst_fruit = fruits[0]\nsecond_fruit = fruits[1]\nlast_fruit = fruits[-1]\nsecond_last = fruits[-2]\nprint(f\"First: {first_fruit} | Second: {second_fruit} | Last: {last_fruit} | 2nd Last: {second_last}\")\n",
      "target": "First: banana | Second: orange | Last: lemon | 2nd Last: mango\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "first_fruit",
            "type": "string",
            "value": "banana",
            "exact": true
          },
          {
            "name": "second_fruit",
            "type": "string",
            "value": "orange",
            "exact": true
          },
          {
            "name": "last_fruit",
            "type": "string",
            "value": "lemon",
            "exact": true
          },
          {
            "name": "second_last",
            "type": "string",
            "value": "mango",
            "exact": true
          }
        ]
      },
      "explanation": "0-based indexing accesses items from the front (0, 1), while negative indexing accesses items from the rear (-1, -2).",
      "hint": "Use fruits[0], fruits[1], fruits[-1], and fruits[-2]."
    },
    {
      "id": 7,
      "difficulty": "Easy",
      "category": "slicing",
      "title": "Boundary Slicing: Head and Tail Extraction",
      "given": "food_stuff_tp = ('apple', 'banana', 'carrot', 'date', 'egg', 'fig', 'grape', 'honey')",
      "outputs": [
        "first_three",
        "last_three"
      ],
      "starterCode": "",
      "desc": "Given food_stuff_tp = ('apple', 'banana', 'carrot', 'date', 'egg', 'fig', 'grape', 'honey'), slice out the first three items into first_three, and the last three items into last_three.",
      "prompt": "<strong>[Easy] Boundary Slicing: Head and Tail Extraction</strong><p>Given <code>food_stuff_tp = ('apple', 'banana', 'carrot', 'date', 'egg', 'fig', 'grape', 'honey')</code>:</p><p>Slice the first 3 items into <code>first_three</code> (using <code>[:3]</code>), and the last 3 items into <code>last_three</code> (using <code>[-3:]</code>).</p>",
      "ref": "food_stuff_tp = ('apple', 'banana', 'carrot', 'date', 'egg', 'fig', 'grape', 'honey')\nfirst_three = food_stuff_tp[:3]\nlast_three = food_stuff_tp[-3:]\nprint(f\"First 3: {first_three} | Last 3: {last_three}\")\n",
      "solution": "food_stuff_tp = ('apple', 'banana', 'carrot', 'date', 'egg', 'fig', 'grape', 'honey')\nfirst_three = food_stuff_tp[:3]\nlast_three = food_stuff_tp[-3:]\nprint(f\"First 3: {first_three} | Last 3: {last_three}\")\n",
      "target": "First 3: ('apple', 'banana', 'carrot') | Last 3: ('fig', 'grape', 'honey')\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "first_three",
            "type": "tuple",
            "value": [
              "apple",
              "banana",
              "carrot"
            ],
            "exact": true
          },
          {
            "name": "last_three",
            "type": "tuple",
            "value": [
              "fig",
              "grape",
              "honey"
            ],
            "exact": true
          }
        ]
      },
      "explanation": "[:3] slices from the beginning up to index 3 (exclusive). [-3:] slices from 3 elements from the end to the very tail.",
      "hint": "Use food_stuff_tp[:3] and food_stuff_tp[-3:]."
    },
    {
      "id": 8,
      "difficulty": "Easy",
      "category": "membership",
      "title": "Nordic Countries Membership Verification",
      "given": "nordic_countries = ('Denmark', 'Finland', 'Iceland', 'Norway', 'Sweden')",
      "outputs": [
        "is_estonia_nordic",
        "is_iceland_nordic"
      ],
      "starterCode": "",
      "desc": "Given nordic_countries = ('Denmark', 'Finland', 'Iceland', 'Norway', 'Sweden'), check whether 'Estonia' is a nordic country and store the boolean in is_estonia_nordic. Check whether 'Iceland' is a nordic country and store in is_iceland_nordic.",
      "prompt": "<strong>[Easy] Nordic Countries Membership Verification</strong><p>Given <code>nordic_countries = ('Denmark', 'Finland', 'Iceland', 'Norway', 'Sweden')</code>:</p><p>Check if <code>'Estonia'</code> is in the tuple and assign to <code>is_estonia_nordic</code>. Check if <code>'Iceland'</code> is in the tuple and assign to <code>is_iceland_nordic</code>.</p>",
      "ref": "nordic_countries = ('Denmark', 'Finland', 'Iceland', 'Norway', 'Sweden')\nis_estonia_nordic = 'Estonia' in nordic_countries\nis_iceland_nordic = 'Iceland' in nordic_countries\nprint(f\"Estonia: {is_estonia_nordic} | Iceland: {is_iceland_nordic}\")\n",
      "solution": "nordic_countries = ('Denmark', 'Finland', 'Iceland', 'Norway', 'Sweden')\nis_estonia_nordic = 'Estonia' in nordic_countries\nis_iceland_nordic = 'Iceland' in nordic_countries\nprint(f\"Estonia: {is_estonia_nordic} | Iceland: {is_iceland_nordic}\")\n",
      "target": "Estonia: False | Iceland: True\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "is_estonia_nordic",
            "type": "bool",
            "value": false,
            "exact": true
          },
          {
            "name": "is_iceland_nordic",
            "type": "bool",
            "value": true,
            "exact": true
          }
        ]
      },
      "explanation": "The 'in' operator performs linear search across the tuple and returns True if found, False otherwise.",
      "hint": "Use 'Estonia' in nordic_countries and 'Iceland' in nordic_countries."
    },
    {
      "id": 9,
      "difficulty": "Medium",
      "category": "indexing",
      "title": "Extracting the Exact Middle Element",
      "given": "items = ('alpha', 'beta', 'gamma', 'delta', 'epsilon')",
      "outputs": [
        "mid_idx",
        "mid_item"
      ],
      "starterCode": "",
      "desc": "Given items = ('alpha', 'beta', 'gamma', 'delta', 'epsilon') (an odd-length tuple), calculate the integer middle index using floor division len(items) // 2 in mid_idx. Extract and store the middle element in mid_item.",
      "prompt": "<strong>[Medium] Extracting the Exact Middle Element</strong><p>Given <code>items = ('alpha', 'beta', 'gamma', 'delta', 'epsilon')</code>:</p><p>Compute the integer middle index with <code>len(items) // 2</code> and store in <code>mid_idx</code>. Extract the item at that index into <code>mid_item</code>.</p>",
      "ref": "items = ('alpha', 'beta', 'gamma', 'delta', 'epsilon')\nmid_idx = len(items) // 2\nmid_item = items[mid_idx]\nprint(f\"Mid Index: {mid_idx} | Item: {mid_item}\")\n",
      "solution": "items = ('alpha', 'beta', 'gamma', 'delta', 'epsilon')\nmid_idx = len(items) // 2\nmid_item = items[mid_idx]\nprint(f\"Mid Index: {mid_idx} | Item: {mid_item}\")\n",
      "target": "Mid Index: 2 | Item: gamma\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "mid_idx",
            "type": "int",
            "value": 2,
            "exact": true
          },
          {
            "name": "mid_item",
            "type": "string",
            "value": "gamma",
            "exact": true
          }
        ]
      },
      "explanation": "Floor division (//) divides length by 2 and rounds down, yielding the exact center index for an odd-length sequence.",
      "hint": "Use mid_idx = len(items) // 2 and mid_item = items[mid_idx]."
    },
    {
      "id": 10,
      "difficulty": "Medium",
      "category": "methods",
      "title": "Auditing Responses with .count()",
      "given": "survey = ('yes', 'no', 'yes', 'yes', 'maybe', 'no', 'yes')",
      "outputs": [
        "yes_count",
        "no_count",
        "missing_count"
      ],
      "starterCode": "",
      "desc": "Given survey = ('yes', 'no', 'yes', 'yes', 'maybe', 'no', 'yes'), count how many times 'yes' appears in yes_count, 'no' in no_count, and 'na' in missing_count.",
      "prompt": "<strong>[Medium] Auditing Responses with .count()</strong><p>Given <code>survey = ('yes', 'no', 'yes', 'yes', 'maybe', 'no', 'yes')</code>:</p><p>Use <code>.count()</code> to count occurrences of <code>'yes'</code> into <code>yes_count</code>, <code>'no'</code> into <code>no_count</code>, and <code>'na'</code> into <code>missing_count</code>.</p>",
      "ref": "survey = ('yes', 'no', 'yes', 'yes', 'maybe', 'no', 'yes')\nyes_count = survey.count('yes')\nno_count = survey.count('no')\nmissing_count = survey.count('na')\nprint(f\"Yes: {yes_count} | No: {no_count} | NA: {missing_count}\")\n",
      "solution": "survey = ('yes', 'no', 'yes', 'yes', 'maybe', 'no', 'yes')\nyes_count = survey.count('yes')\nno_count = survey.count('no')\nmissing_count = survey.count('na')\nprint(f\"Yes: {yes_count} | No: {no_count} | NA: {missing_count}\")\n",
      "target": "Yes: 4 | No: 2 | NA: 0\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "yes_count",
            "type": "int",
            "value": 4,
            "exact": true
          },
          {
            "name": "no_count",
            "type": "int",
            "value": 2,
            "exact": true
          },
          {
            "name": "missing_count",
            "type": "int",
            "value": 0,
            "exact": true
          }
        ]
      },
      "explanation": ".count() safely counts matches. If the target does not exist in the tuple, it returns 0 without raising an error.",
      "hint": "Call survey.count('yes'), survey.count('no'), and survey.count('na')."
    },
    {
      "id": 11,
      "difficulty": "Medium",
      "category": "methods",
      "title": "Safe Index Lookup with Membership Guard",
      "given": "devices = ('laptop', 'mouse', 'keyboard', 'monitor')",
      "outputs": [
        "mouse_idx",
        "speaker_idx"
      ],
      "starterCode": "",
      "desc": "Given devices = ('laptop', 'mouse', 'keyboard', 'monitor'), find the index of 'mouse' and store in mouse_idx. Safely check if 'speaker' is in devices: if present store its index, otherwise store -1 in speaker_idx.",
      "prompt": "<strong>[Medium] Safe Index Lookup with Membership Guard</strong><p>Given <code>devices = ('laptop', 'mouse', 'keyboard', 'monitor')</code>:</p><p>Find index of <code>'mouse'</code> using <code>.index()</code> into <code>mouse_idx</code>. Check if <code>'speaker'</code> is in devices: if yes store index, else store <code>-1</code> in <code>speaker_idx</code>.</p>",
      "ref": "devices = ('laptop', 'mouse', 'keyboard', 'monitor')\nmouse_idx = devices.index('mouse')\nif 'speaker' in devices:\n    speaker_idx = devices.index('speaker')\nelse:\n    speaker_idx = -1\nprint(f\"Mouse: {mouse_idx} | Speaker: {speaker_idx}\")\n",
      "solution": "devices = ('laptop', 'mouse', 'keyboard', 'monitor')\nmouse_idx = devices.index('mouse')\nif 'speaker' in devices:\n    speaker_idx = devices.index('speaker')\nelse:\n    speaker_idx = -1\nprint(f\"Mouse: {mouse_idx} | Speaker: {speaker_idx}\")\n",
      "target": "Mouse: 1 | Speaker: -1\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "mouse_idx",
            "type": "int",
            "value": 1,
            "exact": true
          },
          {
            "name": "speaker_idx",
            "type": "int",
            "value": -1,
            "exact": true
          }
        ]
      },
      "explanation": "Because .index() raises ValueError on missing items, testing with 'in' first guards against crashes.",
      "hint": "Use devices.index('mouse') and an if 'speaker' in devices check."
    },
    {
      "id": 12,
      "difficulty": "Medium",
      "category": "slicing",
      "title": "Reversing Sequences with Step Striding",
      "given": "metrics = (10, 20, 30, 40, 50)",
      "outputs": [
        "reversed_metrics",
        "every_other"
      ],
      "starterCode": "",
      "desc": "Given metrics = (10, 20, 30, 40, 50), reverse the entire tuple using step-slicing [::-1] into reversed_metrics. Extract every second element using [::2] into every_other.",
      "prompt": "<strong>[Medium] Reversing Sequences with Step Striding</strong><p>Given <code>metrics = (10, 20, 30, 40, 50)</code>:</p><p>Reverse it using <code>[::-1]</code> into <code>reversed_metrics</code>. Take every second element using <code>[::2]</code> into <code>every_other</code>.</p>",
      "ref": "metrics = (10, 20, 30, 40, 50)\nreversed_metrics = metrics[::-1]\nevery_other = metrics[::2]\nprint(f\"Reversed: {reversed_metrics} | Every other: {every_other}\")\n",
      "solution": "metrics = (10, 20, 30, 40, 50)\nreversed_metrics = metrics[::-1]\nevery_other = metrics[::2]\nprint(f\"Reversed: {reversed_metrics} | Every other: {every_other}\")\n",
      "target": "Reversed: (50, 40, 30, 20, 10) | Every other: (10, 30, 50)\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "reversed_metrics",
            "type": "tuple",
            "value": [
              50,
              40,
              30,
              20,
              10
            ],
            "exact": true
          },
          {
            "name": "every_other",
            "type": "tuple",
            "value": [
              10,
              30,
              50
            ],
            "exact": true
          }
        ]
      },
      "explanation": "A step of -1 traverses backwards from tail to head. A step of 2 strides across alternate elements.",
      "hint": "Use metrics[::-1] and metrics[::2]."
    },
    {
      "id": 13,
      "difficulty": "Medium",
      "category": "unpacking",
      "title": "Pythonic Variable Swap without Temporary Variables",
      "given": "latitude = 12.9716\nlongitude = 77.5946",
      "outputs": [
        "latitude",
        "longitude"
      ],
      "starterCode": "",
      "desc": "Given latitude = 12.9716 and longitude = 77.5946, swap their values in a single line using tuple parallel assignment (latitude, longitude = longitude, latitude).",
      "prompt": "<strong>[Medium] Pythonic Variable Swap without Temporary Variables</strong><p>Given <code>latitude = 12.9716</code> and <code>longitude = 77.5946</code>, swap them in one line using tuple parallel assignment.</p>",
      "ref": "latitude = 12.9716\nlongitude = 77.5946\nlatitude, longitude = longitude, latitude\nprint(f\"Lat: {latitude} | Lon: {longitude}\")\n",
      "solution": "latitude = 12.9716\nlongitude = 77.5946\nlatitude, longitude = longitude, latitude\nprint(f\"Lat: {latitude} | Lon: {longitude}\")\n",
      "target": "Lat: 77.5946 | Lon: 12.9716\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "latitude",
            "type": "float",
            "value": 77.5946,
            "exact": true
          },
          {
            "name": "longitude",
            "type": "float",
            "value": 12.9716,
            "exact": true
          }
        ]
      },
      "explanation": "Python evaluates the right side into a temporary tuple in memory first, then unpacks into the left targets simultaneously.",
      "hint": "Use latitude, longitude = longitude, latitude."
    },
    {
      "id": 14,
      "difficulty": "Medium",
      "category": "unpacking",
      "title": "Extended Star Unpacking for Sensor Telemetry",
      "given": "telemetry = ('SENSOR_01', 21.4, 21.9, 22.1, 21.8, 'ACTIVE')",
      "outputs": [
        "sensor_id",
        "readings",
        "status"
      ],
      "starterCode": "",
      "desc": "Given telemetry = ('SENSOR_01', 21.4, 21.9, 22.1, 21.8, 'ACTIVE'), unpack the first item into sensor_id, the middle items into readings using *readings, and the last item into status.",
      "prompt": "<strong>[Medium] Extended Star Unpacking for Sensor Telemetry</strong><p>Given <code>telemetry = ('SENSOR_01', 21.4, 21.9, 22.1, 21.8, 'ACTIVE')</code>:</p><p>Unpack using star syntax into <code>sensor_id</code>, <code>*readings</code>, and <code>status</code>.</p>",
      "ref": "telemetry = ('SENSOR_01', 21.4, 21.9, 22.1, 21.8, 'ACTIVE')\nsensor_id, *readings, status = telemetry\nprint(f\"Sensor: {sensor_id} | Readings: {readings} | Status: {status}\")\n",
      "solution": "telemetry = ('SENSOR_01', 21.4, 21.9, 22.1, 21.8, 'ACTIVE')\nsensor_id, *readings, status = telemetry\nprint(f\"Sensor: {sensor_id} | Readings: {readings} | Status: {status}\")\n",
      "target": "Sensor: SENSOR_01 | Readings: [21.4, 21.9, 22.1, 21.8] | Status: ACTIVE\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "sensor_id",
            "type": "string",
            "value": "SENSOR_01",
            "exact": true
          },
          {
            "name": "readings",
            "type": "array",
            "value": [
              21.4,
              21.9,
              22.1,
              21.8
            ],
            "exact": true
          },
          {
            "name": "status",
            "type": "string",
            "value": "ACTIVE",
            "exact": true
          }
        ]
      },
      "explanation": "The asterisk * captures all intermediate elements into a standard Python list, allowing flexible unpacking.",
      "hint": "Use sensor_id, *readings, status = telemetry."
    },
    {
      "id": 15,
      "difficulty": "Medium",
      "category": "unpacking",
      "title": "Ignoring Throwaway Values with Underscore",
      "given": "user_record = ('usr_902', 'Asha Sharma', 'asha@corp.in', 'Active', '2026-10-15')",
      "outputs": [
        "user_name",
        "user_status"
      ],
      "starterCode": "",
      "desc": "Given user_record = ('usr_902', 'Asha Sharma', 'asha@corp.in', 'Active', '2026-10-15'), extract only the name and status into user_name and user_status, ignoring the ID, email, and timestamp with _.",
      "prompt": "<strong>[Medium] Ignoring Throwaway Values with Underscore</strong><p>Given <code>user_record = ('usr_902', 'Asha Sharma', 'asha@corp.in', 'Active', '2026-10-15')</code>:</p><p>Unpack so that index 1 goes to <code>user_name</code> and index 3 goes to <code>user_status</code>, using <code>_</code> for the unwanted fields.</p>",
      "ref": "user_record = ('usr_902', 'Asha Sharma', 'asha@corp.in', 'Active', '2026-10-15')\n_, user_name, _, user_status, _ = user_record\nprint(f\"Name: {user_name} | Status: {user_status}\")\n",
      "solution": "user_record = ('usr_902', 'Asha Sharma', 'asha@corp.in', 'Active', '2026-10-15')\n_, user_name, _, user_status, _ = user_record\nprint(f\"Name: {user_name} | Status: {user_status}\")\n",
      "target": "Name: Asha Sharma | Status: Active\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "user_name",
            "type": "string",
            "value": "Asha Sharma",
            "exact": true
          },
          {
            "name": "user_status",
            "type": "string",
            "value": "Active",
            "exact": true
          }
        ]
      },
      "explanation": "By convention, underscore (_) is used for throwaway variables in tuple unpacking.",
      "hint": "Use _, user_name, _, user_status, _ = user_record."
    },
    {
      "id": 16,
      "difficulty": "Medium",
      "category": "conversion",
      "title": "The 3-Step Workaround Pattern",
      "given": "config = ('v1.0', 'production', 8080)",
      "outputs": [
        "updated_config"
      ],
      "starterCode": "",
      "desc": "Given config = ('v1.0', 'production', 8080), execute the 3-step modification pattern: cast to list, change port 8080 to 9090, and cast back to an immutable tuple in updated_config.",
      "prompt": "<strong>[Medium] The 3-Step Workaround Pattern</strong><p>Given <code>config = ('v1.0', 'production', 8080)</code>:</p><p>Convert to a list, change index 2 to <code>9090</code>, and convert back into tuple <code>updated_config</code>.</p>",
      "ref": "config = ('v1.0', 'production', 8080)\ntemp_list = list(config)\ntemp_list[2] = 9090\nupdated_config = tuple(temp_list)\nprint(f\"Original: {config} | Updated: {updated_config}\")\n",
      "solution": "config = ('v1.0', 'production', 8080)\ntemp_list = list(config)\ntemp_list[2] = 9090\nupdated_config = tuple(temp_list)\nprint(f\"Original: {config} | Updated: {updated_config}\")\n",
      "target": "Original: ('v1.0', 'production', 8080) | Updated: ('v1.0', 'production', 9090)\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "updated_config",
            "type": "tuple",
            "value": [
              "v1.0",
              "production",
              9090
            ],
            "exact": true
          }
        ]
      },
      "explanation": "Because tuples are immutable, updating requires converting to list, modifying, and re-casting to tuple.",
      "hint": "Use list(config), set temp[2] = 9090, then tuple(temp)."
    },
    {
      "id": 17,
      "difficulty": "Hard",
      "category": "functions",
      "title": "Multiple Function Return Values via Tuples",
      "given": "dataset = (14, 28, 5, 42, 19)",
      "outputs": [
        "min_val",
        "max_val",
        "sum_val"
      ],
      "starterCode": "",
      "desc": "Define a function analyze_metrics(nums) that returns min(nums), max(nums), sum(nums) as a tuple. Call it on dataset = (14, 28, 5, 42, 19) and unpack the returned tuple into min_val, max_val, sum_val.",
      "prompt": "<strong>[Hard] Multiple Function Return Values via Tuples</strong><p>Define a function <code>analyze_metrics(nums)</code> returning <code>min(nums), max(nums), sum(nums)</code>. Call it on <code>dataset = (14, 28, 5, 42, 19)</code> and unpack into <code>min_val</code>, <code>max_val</code>, and <code>sum_val</code>.</p>",
      "ref": "def analyze_metrics(nums):\n    return min(nums), max(nums), sum(nums)\n\ndataset = (14, 28, 5, 42, 19)\nmin_val, max_val, sum_val = analyze_metrics(dataset)\nprint(f\"Min: {min_val} | Max: {max_val} | Sum: {sum_val}\")\n",
      "solution": "def analyze_metrics(nums):\n    return min(nums), max(nums), sum(nums)\n\ndataset = (14, 28, 5, 42, 19)\nmin_val, max_val, sum_val = analyze_metrics(dataset)\nprint(f\"Min: {min_val} | Max: {max_val} | Sum: {sum_val}\")\n",
      "target": "Min: 5 | Max: 42 | Sum: 108\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "min_val",
            "type": "int",
            "value": 5,
            "exact": true
          },
          {
            "name": "max_val",
            "type": "int",
            "value": 42,
            "exact": true
          },
          {
            "name": "sum_val",
            "type": "int",
            "value": 108,
            "exact": true
          }
        ]
      },
      "explanation": "Comma-separated return values are packaged automatically into a tuple by Python, allowing clean caller unpacking.",
      "hint": "Define the function with return min(nums), max(nums), sum(nums)."
    },
    {
      "id": 18,
      "difficulty": "Hard",
      "category": "dictionary_keys",
      "title": "Composite Dictionary Keys for Geospatial Lookup",
      "given": "ny_coords = (40.7128, -74.0060)\nblr_coords = (12.9716, 77.5946)",
      "outputs": [
        "geo_cache",
        "blr_city"
      ],
      "starterCode": "",
      "desc": "Create a dictionary geo_cache where keys are coordinate tuples: (40.7128, -74.0060): 'New York' and (12.9716, 77.5946): 'Bengaluru'. Query and store the city for (12.9716, 77.5946) in blr_city.",
      "prompt": "<strong>[Hard] Composite Dictionary Keys for Geospatial Lookup</strong><p>Create a dictionary <code>geo_cache</code> with keys <code>(40.7128, -74.0060)</code> mapping to <code>'New York'</code> and <code>(12.9716, 77.5946)</code> mapping to <code>'Bengaluru'</code>. Access the value for <code>(12.9716, 77.5946)</code> into <code>blr_city</code>.</p>",
      "ref": "geo_cache = {\n    (40.7128, -74.0060): 'New York',\n    (12.9716, 77.5946): 'Bengaluru'\n}\nblr_city = geo_cache[(12.9716, 77.5946)]\nprint(f\"City: {blr_city}\")\n",
      "solution": "geo_cache = {\n    (40.7128, -74.0060): 'New York',\n    (12.9716, 77.5946): 'Bengaluru'\n}\nblr_city = geo_cache[(12.9716, 77.5946)]\nprint(f\"City: {blr_city}\")\n",
      "target": "City: Bengaluru\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "blr_city",
            "type": "string",
            "value": "Bengaluru",
            "exact": true
          }
        ]
      },
      "explanation": "Because tuples are immutable and hashable, they can serve as composite dictionary keys, which is impossible with lists.",
      "hint": "Use geo_cache = {(40.7128, -74.0060): 'New York', (12.9716, 77.5946): 'Bengaluru'}."
    },
    {
      "id": 19,
      "difficulty": "Hard",
      "category": "filtering",
      "title": "Filtering Mixed Data into Pure Numeric Tuples",
      "given": "raw_stream = (10, 'N/A', 25.5, None, 40, 'Error', 12)",
      "outputs": [
        "clean_numbers"
      ],
      "starterCode": "",
      "desc": "Given raw_stream = (10, 'N/A', 25.5, None, 40, 'Error', 12), filter and collect only int and float values into a list, and cast to an immutable tuple clean_numbers.",
      "prompt": "<strong>[Hard] Filtering Mixed Data into Pure Numeric Tuples</strong><p>Given <code>raw_stream = (10, 'N/A', 25.5, None, 40, 'Error', 12)</code>:</p><p>Iterate and collect only elements that are <code>int</code> or <code>float</code>, and store as a tuple in <code>clean_numbers</code>.</p>",
      "ref": "raw_stream = (10, 'N/A', 25.5, None, 40, 'Error', 12)\nnums = []\nfor item in raw_stream:\n    if isinstance(item, (int, float)):\n        nums.append(item)\nclean_numbers = tuple(nums)\nprint(f\"Clean numbers: {clean_numbers}\")\n",
      "solution": "raw_stream = (10, 'N/A', 25.5, None, 40, 'Error', 12)\nnums = []\nfor item in raw_stream:\n    if isinstance(item, (int, float)):\n        nums.append(item)\nclean_numbers = tuple(nums)\nprint(f\"Clean numbers: {clean_numbers}\")\n",
      "target": "Clean numbers: (10, 25.5, 40, 12)\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "clean_numbers",
            "type": "tuple",
            "value": [
              10,
              25.5,
              40,
              12
            ],
            "exact": true
          }
        ]
      },
      "explanation": "isinstance(item, (int, float)) checks for numeric types, allowing clean pipeline sanitation before tuple casting.",
      "hint": "Loop through raw_stream, append numeric items to a list, then wrap with tuple()."
    },
    {
      "id": 20,
      "difficulty": "Hard",
      "category": "namedtuple",
      "title": "Self-Documenting Records with collections.namedtuple",
      "given": "from collections import namedtuple",
      "outputs": [
        "emp_name",
        "emp_salary",
        "emp_dept"
      ],
      "starterCode": "",
      "desc": "Using namedtuple from collections, define an Employee structure with fields ['name', 'salary', 'dept']. Instantiate emp = Employee('Asha', 95000, 'Analytics'). Access name via attribute emp.name, salary via attribute emp.salary, and dept via index emp[2].",
      "prompt": "<strong>[Hard] Self-Documenting Records with collections.namedtuple</strong><p>From <code>collections</code> import <code>namedtuple</code>. Create <code>Employee = namedtuple('Employee', ['name', 'salary', 'dept'])</code>. Instantiate <code>emp = Employee('Asha', 95000, 'Analytics')</code>. Assign <code>emp.name</code> to <code>emp_name</code>, <code>emp.salary</code> to <code>emp_salary</code>, and <code>emp[2]</code> to <code>emp_dept</code>.</p>",
      "ref": "from collections import namedtuple\n\nEmployee = namedtuple('Employee', ['name', 'salary', 'dept'])\nemp = Employee('Asha', 95000, 'Analytics')\n\nemp_name = emp.name\nemp_salary = emp.salary\nemp_dept = emp[2]\nprint(f\"Name: {emp_name} | Salary: {emp_salary} | Dept: {emp_dept}\")\n",
      "solution": "from collections import namedtuple\n\nEmployee = namedtuple('Employee', ['name', 'salary', 'dept'])\nemp = Employee('Asha', 95000, 'Analytics')\n\nemp_name = emp.name\nemp_salary = emp.salary\nemp_dept = emp[2]\nprint(f\"Name: {emp_name} | Salary: {emp_salary} | Dept: {emp_dept}\")\n",
      "target": "Name: Asha | Salary: 95000 | Dept: Analytics\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "emp_name",
            "type": "string",
            "value": "Asha",
            "exact": true
          },
          {
            "name": "emp_salary",
            "type": "int",
            "value": 95000,
            "exact": true
          },
          {
            "name": "emp_dept",
            "type": "string",
            "value": "Analytics",
            "exact": true
          }
        ]
      },
      "explanation": "namedtuple combines the low memory overhead of tuples with readable, self-documenting attribute access.",
      "hint": "Use emp.name, emp.salary, and emp[2]."
    }
  ],
  "testQuestions": [
    {
      "id": 1,
      "title": "Singleton vs Grouping Parentheses",
      "category": "creation",
      "difficulty": "Easy",
      "desc": "Create integer x = (100) and singleton tuple y = (100,). Store type(x) == int in is_x_int, and type(y) == tuple in is_y_tuple.",
      "starterCode": "",
      "ref": "x = (100)\ny = (100,)\nis_x_int = (type(x) == int)\nis_y_tuple = (type(y) == tuple)\n",
      "checkVars": [
        {
          "name": "is_x_int",
          "type": "bool",
          "value": true
        },
        {
          "name": "is_y_tuple",
          "type": "bool",
          "value": true
        }
      ],
      "prompt": "<strong>[Easy] Singleton vs Grouping Parentheses</strong><p>Create integer x = (100) and singleton tuple y = (100,). Store type(x) == int in is_x_int, and type(y) == tuple in is_y_tuple.</p>",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "is_x_int",
            "type": "bool",
            "value": true
          },
          {
            "name": "is_y_tuple",
            "type": "bool",
            "value": true
          }
        ]
      }
    },
    {
      "id": 2,
      "title": "Accessing Rear Element",
      "category": "indexing",
      "difficulty": "Easy",
      "desc": "Given t = ('sql', 'python', 'pandas', 'numpy'), store the last element in last_tool using negative index -1.",
      "starterCode": "",
      "ref": "t = ('sql', 'python', 'pandas', 'numpy')\nlast_tool = t[-1]\n",
      "checkVars": [
        {
          "name": "last_tool",
          "type": "string",
          "value": "numpy"
        }
      ],
      "prompt": "<strong>[Easy] Accessing Rear Element</strong><p>Given t = ('sql', 'python', 'pandas', 'numpy'), store the last element in last_tool using negative index -1.</p>",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "last_tool",
            "type": "string",
            "value": "numpy"
          }
        ]
      }
    },
    {
      "id": 3,
      "title": "Length of Joined Tuple",
      "category": "joining",
      "difficulty": "Easy",
      "desc": "Given t1 = (1, 2) and t2 = (3, 4, 5), concatenate them into t3 and store len(t3) in total_len.",
      "starterCode": "",
      "ref": "t1 = (1, 2)\nt2 = (3, 4, 5)\nt3 = t1 + t2\ntotal_len = len(t3)\n",
      "checkVars": [
        {
          "name": "total_len",
          "type": "int",
          "value": 5
        }
      ],
      "prompt": "<strong>[Easy] Length of Joined Tuple</strong><p>Given t1 = (1, 2) and t2 = (3, 4, 5), concatenate them into t3 and store len(t3) in total_len.</p>",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "total_len",
            "type": "int",
            "value": 5
          }
        ]
      }
    },
    {
      "id": 4,
      "title": "Tuple Repetition",
      "category": "operators",
      "difficulty": "Easy",
      "desc": "Given pattern = (0, 1), repeat it 4 times using * 4 and store the resulting tuple in quad_pattern.",
      "starterCode": "",
      "ref": "pattern = (0, 1)\nquad_pattern = pattern * 4\n",
      "checkVars": [
        {
          "name": "quad_pattern",
          "type": "tuple",
          "value": [
            0,
            1,
            0,
            1,
            0,
            1,
            0,
            1
          ]
        }
      ],
      "prompt": "<strong>[Easy] Tuple Repetition</strong><p>Given pattern = (0, 1), repeat it 4 times using * 4 and store the resulting tuple in quad_pattern.</p>",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "quad_pattern",
            "type": "tuple",
            "value": [
              0,
              1,
              0,
              1,
              0,
              1,
              0,
              1
            ]
          }
        ]
      }
    },
    {
      "id": 5,
      "title": "Extracting Middle Slice",
      "category": "slicing",
      "difficulty": "Easy",
      "desc": "Given letters = ('a', 'b', 'c', 'd', 'e'), slice index 1 through 3 (inclusive of b, c, d) and store in sub_letters.",
      "starterCode": "",
      "ref": "letters = ('a', 'b', 'c', 'd', 'e')\nsub_letters = letters[1:4]\n",
      "checkVars": [
        {
          "name": "sub_letters",
          "type": "tuple",
          "value": [
            "b",
            "c",
            "d"
          ]
        }
      ],
      "prompt": "<strong>[Easy] Extracting Middle Slice</strong><p>Given letters = ('a', 'b', 'c', 'd', 'e'), slice index 1 through 3 (inclusive of b, c, d) and store in sub_letters.</p>",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "sub_letters",
            "type": "tuple",
            "value": [
              "b",
              "c",
              "d"
            ]
          }
        ]
      }
    },
    {
      "id": 6,
      "title": "Reversing a String Tuple",
      "category": "slicing",
      "difficulty": "Easy",
      "desc": "Given words = ('head', 'body', 'tail'), reverse the order using [::-1] and store in rev_words.",
      "starterCode": "",
      "ref": "words = ('head', 'body', 'tail')\nrev_words = words[::-1]\n",
      "checkVars": [
        {
          "name": "rev_words",
          "type": "tuple",
          "value": [
            "tail",
            "body",
            "head"
          ]
        }
      ],
      "prompt": "<strong>[Easy] Reversing a String Tuple</strong><p>Given words = ('head', 'body', 'tail'), reverse the order using [::-1] and store in rev_words.</p>",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "rev_words",
            "type": "tuple",
            "value": [
              "tail",
              "body",
              "head"
            ]
          }
        ]
      }
    },
    {
      "id": 7,
      "title": "Counting Occurrences",
      "category": "methods",
      "difficulty": "Easy",
      "desc": "Given marks = (90, 85, 90, 70, 90, 100), count occurrences of 90 into count_90.",
      "starterCode": "",
      "ref": "marks = (90, 85, 90, 70, 90, 100)\ncount_90 = marks.count(90)\n",
      "checkVars": [
        {
          "name": "count_90",
          "type": "int",
          "value": 3
        }
      ],
      "prompt": "<strong>[Easy] Counting Occurrences</strong><p>Given marks = (90, 85, 90, 70, 90, 100), count occurrences of 90 into count_90.</p>",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "count_90",
            "type": "int",
            "value": 3
          }
        ]
      }
    },
    {
      "id": 8,
      "title": "Finding First Index",
      "category": "methods",
      "difficulty": "Easy",
      "desc": "Given codes = ('E01', 'E02', 'E03', 'E02'), find the first index of 'E02' and store in idx_e02.",
      "starterCode": "",
      "ref": "codes = ('E01', 'E02', 'E03', 'E02')\nidx_e02 = codes.index('E02')\n",
      "checkVars": [
        {
          "name": "idx_e02",
          "type": "int",
          "value": 1
        }
      ],
      "prompt": "<strong>[Easy] Finding First Index</strong><p>Given codes = ('E01', 'E02', 'E03', 'E02'), find the first index of 'E02' and store in idx_e02.</p>",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "idx_e02",
            "type": "int",
            "value": 1
          }
        ]
      }
    },
    {
      "id": 9,
      "title": "Tuple Membership Guard",
      "category": "membership",
      "difficulty": "Easy",
      "desc": "Given allowed = ('GET', 'POST', 'PUT'), store ('DELETE' in allowed) in is_allowed.",
      "starterCode": "",
      "ref": "allowed = ('GET', 'POST', 'PUT')\nis_allowed = ('DELETE' in allowed)\n",
      "checkVars": [
        {
          "name": "is_allowed",
          "type": "bool",
          "value": false
        }
      ],
      "prompt": "<strong>[Easy] Tuple Membership Guard</strong><p>Given allowed = ('GET', 'POST', 'PUT'), store ('DELETE' in allowed) in is_allowed.</p>",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "is_allowed",
            "type": "bool",
            "value": false
          }
        ]
      }
    },
    {
      "id": 10,
      "title": "Tuple Math Calculations",
      "category": "helpers",
      "difficulty": "Easy",
      "desc": "Given sales = (150, 300, 450, 100), store min(sales) in min_sale, max(sales) in max_sale, and sum(sales) in total_sale.",
      "starterCode": "",
      "ref": "sales = (150, 300, 450, 100)\nmin_sale = min(sales)\nmax_sale = max(sales)\ntotal_sale = sum(sales)\n",
      "checkVars": [
        {
          "name": "min_sale",
          "type": "int",
          "value": 100
        },
        {
          "name": "max_sale",
          "type": "int",
          "value": 450
        },
        {
          "name": "total_sale",
          "type": "int",
          "value": 1000
        }
      ],
      "prompt": "<strong>[Easy] Tuple Math Calculations</strong><p>Given sales = (150, 300, 450, 100), store min(sales) in min_sale, max(sales) in max_sale, and sum(sales) in total_sale.</p>",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "min_sale",
            "type": "int",
            "value": 100
          },
          {
            "name": "max_sale",
            "type": "int",
            "value": 450
          },
          {
            "name": "total_sale",
            "type": "int",
            "value": 1000
          }
        ]
      }
    },
    {
      "id": 11,
      "title": "Sorting a Tuple into a Tuple",
      "category": "helpers",
      "difficulty": "Medium",
      "desc": "Given unordered = (5, 1, 9, 3), sort it ascending and store the resulting tuple in sorted_t.",
      "starterCode": "",
      "ref": "unordered = (5, 1, 9, 3)\nsorted_t = tuple(sorted(unordered))\n",
      "checkVars": [
        {
          "name": "sorted_t",
          "type": "tuple",
          "value": [
            1,
            3,
            5,
            9
          ]
        }
      ],
      "prompt": "<strong>[Medium] Sorting a Tuple into a Tuple</strong><p>Given unordered = (5, 1, 9, 3), sort it ascending and store the resulting tuple in sorted_t.</p>",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "sorted_t",
            "type": "tuple",
            "value": [
              1,
              3,
              5,
              9
            ]
          }
        ]
      }
    },
    {
      "id": 12,
      "title": "Basic 3-Variable Unpacking",
      "category": "unpacking",
      "difficulty": "Medium",
      "desc": "Given point3d = (10, 20, 30), unpack into x, y, z.",
      "starterCode": "",
      "ref": "point3d = (10, 20, 30)\nx, y, z = point3d\n",
      "checkVars": [
        {
          "name": "x",
          "type": "int",
          "value": 10
        },
        {
          "name": "y",
          "type": "int",
          "value": 20
        },
        {
          "name": "z",
          "type": "int",
          "value": 30
        }
      ],
      "prompt": "<strong>[Medium] Basic 3-Variable Unpacking</strong><p>Given point3d = (10, 20, 30), unpack into x, y, z.</p>",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "x",
            "type": "int",
            "value": 10
          },
          {
            "name": "y",
            "type": "int",
            "value": 20
          },
          {
            "name": "z",
            "type": "int",
            "value": 30
          }
        ]
      }
    },
    {
      "id": 13,
      "title": "In-Place Variable Swap",
      "category": "unpacking",
      "difficulty": "Medium",
      "desc": "Given a = 'First' and b = 'Second', swap them in one line using tuple parallel assignment.",
      "starterCode": "",
      "ref": "a = 'First'\nb = 'Second'\na, b = b, a\n",
      "checkVars": [
        {
          "name": "a",
          "type": "string",
          "value": "Second"
        },
        {
          "name": "b",
          "type": "string",
          "value": "First"
        }
      ],
      "prompt": "<strong>[Medium] In-Place Variable Swap</strong><p>Given a = 'First' and b = 'Second', swap them in one line using tuple parallel assignment.</p>",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "a",
            "type": "string",
            "value": "Second"
          },
          {
            "name": "b",
            "type": "string",
            "value": "First"
          }
        ]
      }
    },
    {
      "id": 14,
      "title": "Star Syntax Head and Tail Unpacking",
      "category": "unpacking",
      "difficulty": "Medium",
      "desc": "Given queue = ('cust_1', 'cust_2', 'cust_3', 'cust_4', 'cust_5'), unpack into head, *body, tail.",
      "starterCode": "",
      "ref": "queue = ('cust_1', 'cust_2', 'cust_3', 'cust_4', 'cust_5')\nhead, *body, tail = queue\n",
      "checkVars": [
        {
          "name": "head",
          "type": "string",
          "value": "cust_1"
        },
        {
          "name": "body",
          "type": "array",
          "value": [
            "cust_2",
            "cust_3",
            "cust_4"
          ]
        },
        {
          "name": "tail",
          "type": "string",
          "value": "cust_5"
        }
      ],
      "prompt": "<strong>[Medium] Star Syntax Head and Tail Unpacking</strong><p>Given queue = ('cust_1', 'cust_2', 'cust_3', 'cust_4', 'cust_5'), unpack into head, *body, tail.</p>",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "head",
            "type": "string",
            "value": "cust_1"
          },
          {
            "name": "body",
            "type": "array",
            "value": [
              "cust_2",
              "cust_3",
              "cust_4"
            ]
          },
          {
            "name": "tail",
            "type": "string",
            "value": "cust_5"
          }
        ]
      }
    },
    {
      "id": 15,
      "title": "Skipping Items with Underscore",
      "category": "unpacking",
      "difficulty": "Medium",
      "desc": "Given row = (101, 'Bangalore', 'Karnataka', 560001), extract only the city name into city_name and pin into pin_code using _ for the other two.",
      "starterCode": "",
      "ref": "row = (101, 'Bangalore', 'Karnataka', 560001)\n_, city_name, _, pin_code = row\n",
      "checkVars": [
        {
          "name": "city_name",
          "type": "string",
          "value": "Bangalore"
        },
        {
          "name": "pin_code",
          "type": "int",
          "value": 560001
        }
      ],
      "prompt": "<strong>[Medium] Skipping Items with Underscore</strong><p>Given row = (101, 'Bangalore', 'Karnataka', 560001), extract only the city name into city_name and pin into pin_code using _ for the other two.</p>",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "city_name",
            "type": "string",
            "value": "Bangalore"
          },
          {
            "name": "pin_code",
            "type": "int",
            "value": 560001
          }
        ]
      }
    },
    {
      "id": 16,
      "title": "3-Step Edit Workaround",
      "category": "conversion",
      "difficulty": "Medium",
      "desc": "Given status_t = ('INIT', 'PENDING', 'FAIL'), use list conversion to change 'FAIL' to 'SUCCESS' and assign the updated tuple to status_final.",
      "starterCode": "",
      "ref": "status_t = ('INIT', 'PENDING', 'FAIL')\ntmp = list(status_t)\ntmp[2] = 'SUCCESS'\nstatus_final = tuple(tmp)\n",
      "checkVars": [
        {
          "name": "status_final",
          "type": "tuple",
          "value": [
            "INIT",
            "PENDING",
            "SUCCESS"
          ]
        }
      ],
      "prompt": "<strong>[Medium] 3-Step Edit Workaround</strong><p>Given status_t = ('INIT', 'PENDING', 'FAIL'), use list conversion to change 'FAIL' to 'SUCCESS' and assign the updated tuple to status_final.</p>",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "status_final",
            "type": "tuple",
            "value": [
              "INIT",
              "PENDING",
              "SUCCESS"
            ]
          }
        ]
      }
    },
    {
      "id": 17,
      "title": "Appending via Concatenation",
      "category": "conversion",
      "difficulty": "Medium",
      "desc": "Given tags = ('python', 'data'), append 'sql' without list conversion by concatenating a single-element tuple into new_tags.",
      "starterCode": "",
      "ref": "tags = ('python', 'data')\nnew_tags = tags + ('sql',)\n",
      "checkVars": [
        {
          "name": "new_tags",
          "type": "tuple",
          "value": [
            "python",
            "data",
            "sql"
          ]
        }
      ],
      "prompt": "<strong>[Medium] Appending via Concatenation</strong><p>Given tags = ('python', 'data'), append 'sql' without list conversion by concatenating a single-element tuple into new_tags.</p>",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "new_tags",
            "type": "tuple",
            "value": [
              "python",
              "data",
              "sql"
            ]
          }
        ]
      }
    },
    {
      "id": 18,
      "title": "Tuple Slicing Beyond Bounds",
      "category": "slicing",
      "difficulty": "Medium",
      "desc": "Given data = (1, 2, 3), slice from index 1 to 100 into safe_slice. Verify safe_slice equals (2, 3).",
      "starterCode": "",
      "ref": "data = (1, 2, 3)\nsafe_slice = data[1:100]\n",
      "checkVars": [
        {
          "name": "safe_slice",
          "type": "tuple",
          "value": [
            2,
            3
          ]
        }
      ],
      "prompt": "<strong>[Medium] Tuple Slicing Beyond Bounds</strong><p>Given data = (1, 2, 3), slice from index 1 to 100 into safe_slice. Verify safe_slice equals (2, 3).</p>",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "safe_slice",
            "type": "tuple",
            "value": [
              2,
              3
            ]
          }
        ]
      }
    },
    {
      "id": 19,
      "title": "Function Multiple Returns",
      "category": "functions",
      "difficulty": "Medium",
      "desc": "Write a function min_max(vals) returning (min(vals), max(vals)). Call it on (18, 42, 9, 31) and unpack into lowest, highest.",
      "starterCode": "",
      "ref": "def min_max(vals):\n    return min(vals), max(vals)\n\nlowest, highest = min_max((18, 42, 9, 31))\n",
      "checkVars": [
        {
          "name": "lowest",
          "type": "int",
          "value": 9
        },
        {
          "name": "highest",
          "type": "int",
          "value": 42
        }
      ],
      "prompt": "<strong>[Medium] Function Multiple Returns</strong><p>Write a function min_max(vals) returning (min(vals), max(vals)). Call it on (18, 42, 9, 31) and unpack into lowest, highest.</p>",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "lowest",
            "type": "int",
            "value": 9
          },
          {
            "name": "highest",
            "type": "int",
            "value": 42
          }
        ]
      }
    },
    {
      "id": 20,
      "title": "Tuple Inside Tuple Access",
      "category": "nested",
      "difficulty": "Medium",
      "desc": "Given matrix = ((1, 2), (3, 4), (5, 6)), access the number 4 at row index 1, col index 1 into val_4.",
      "starterCode": "",
      "ref": "matrix = ((1, 2), (3, 4), (5, 6))\nval_4 = matrix[1][1]\n",
      "checkVars": [
        {
          "name": "val_4",
          "type": "int",
          "value": 4
        }
      ],
      "prompt": "<strong>[Medium] Tuple Inside Tuple Access</strong><p>Given matrix = ((1, 2), (3, 4), (5, 6)), access the number 4 at row index 1, col index 1 into val_4.</p>",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "val_4",
            "type": "int",
            "value": 4
          }
        ]
      }
    },
    {
      "id": 21,
      "title": "Composite Dictionary Keys",
      "category": "hashability",
      "difficulty": "Hard",
      "desc": "Create prices = {('AAPL', '2026-10'): 180.5, ('GOOG', '2026-10'): 140.2}. Store prices[('AAPL', '2026-10')] in aapl_price.",
      "starterCode": "",
      "ref": "prices = {('AAPL', '2026-10'): 180.5, ('GOOG', '2026-10'): 140.2}\naapl_price = prices[('AAPL', '2026-10')]\n",
      "checkVars": [
        {
          "name": "aapl_price",
          "type": "float",
          "value": 180.5
        }
      ],
      "prompt": "<strong>[Hard] Composite Dictionary Keys</strong><p>Create prices = {('AAPL', '2026-10'): 180.5, ('GOOG', '2026-10'): 140.2}. Store prices[('AAPL', '2026-10')] in aapl_price.</p>",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "aapl_price",
            "type": "float",
            "value": 180.5
          }
        ]
      }
    },
    {
      "id": 22,
      "title": "Mutable Object Inside Tuple",
      "category": "internals",
      "difficulty": "Hard",
      "desc": "Given container = (['A'], 'Active'), append 'B' to the inner list container[0]. Store len(container[0]) in inner_len.",
      "starterCode": "",
      "ref": "container = (['A'], 'Active')\ncontainer[0].append('B')\ninner_len = len(container[0])\n",
      "checkVars": [
        {
          "name": "inner_len",
          "type": "int",
          "value": 2
        }
      ],
      "prompt": "<strong>[Hard] Mutable Object Inside Tuple</strong><p>Given container = (['A'], 'Active'), append 'B' to the inner list container[0]. Store len(container[0]) in inner_len.</p>",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "inner_len",
            "type": "int",
            "value": 2
          }
        ]
      }
    },
    {
      "id": 23,
      "title": "Zip into Tuple List",
      "category": "helpers",
      "difficulty": "Hard",
      "desc": "Given keys = ('id', 'name') and vals = (101, 'Asha'), zip them together into a list of tuples and store in zipped_pairs.",
      "starterCode": "",
      "ref": "keys = ('id', 'name')\nvals = (101, 'Asha')\nzipped_pairs = list(zip(keys, vals))\n",
      "checkVars": [
        {
          "name": "zipped_pairs",
          "type": "array",
          "value": [
            [
              "id",
              101
            ],
            [
              "name",
              "Asha"
            ]
          ]
        }
      ],
      "prompt": "<strong>[Hard] Zip into Tuple List</strong><p>Given keys = ('id', 'name') and vals = (101, 'Asha'), zip them together into a list of tuples and store in zipped_pairs.</p>",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "zipped_pairs",
            "type": "array",
            "value": [
              [
                "id",
                101
              ],
              [
                "name",
                "Asha"
              ]
            ]
          }
        ]
      }
    },
    {
      "id": 24,
      "title": "NamedTuple Field and Index Access",
      "category": "namedtuple",
      "difficulty": "Hard",
      "desc": "From collections import namedtuple. Define Point = namedtuple('Point', ['x', 'y']). Create pt = Point(10, 20). Store pt.x in val_x and pt[1] in val_y.",
      "starterCode": "",
      "ref": "from collections import namedtuple\nPoint = namedtuple('Point', ['x', 'y'])\npt = Point(10, 20)\nval_x = pt.x\nval_y = pt[1]\n",
      "checkVars": [
        {
          "name": "val_x",
          "type": "int",
          "value": 10
        },
        {
          "name": "val_y",
          "type": "int",
          "value": 20
        }
      ],
      "prompt": "<strong>[Hard] NamedTuple Field and Index Access</strong><p>From collections import namedtuple. Define Point = namedtuple('Point', ['x', 'y']). Create pt = Point(10, 20). Store pt.x in val_x and pt[1] in val_y.</p>",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "val_x",
            "type": "int",
            "value": 10
          },
          {
            "name": "val_y",
            "type": "int",
            "value": 20
          }
        ]
      }
    },
    {
      "id": 25,
      "title": "Safe Deletion of Tuple Variable",
      "category": "deletion",
      "difficulty": "Hard",
      "desc": "Create temp_data = (1, 2, 3). Delete the variable name using del temp_data. Store ('temp_data' not in locals()) in is_deleted.",
      "starterCode": "",
      "ref": "temp_data = (1, 2, 3)\ndel temp_data\nis_deleted = ('temp_data' not in locals())\n",
      "checkVars": [
        {
          "name": "is_deleted",
          "type": "bool",
          "value": true
        }
      ],
      "prompt": "<strong>[Hard] Safe Deletion of Tuple Variable</strong><p>Create temp_data = (1, 2, 3). Delete the variable name using del temp_data. Store ('temp_data' not in locals()) in is_deleted.</p>",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "is_deleted",
            "type": "bool",
            "value": true
          }
        ]
      }
    }
  ],
  "conceptChecks": [
    {
      "id": 1,
      "type": "conceptual",
      "topic": "Syntax Fundamentals",
      "prompt": "What character fundamentally signals to Python that an expression is a tuple?",
      "options": [
        "Parentheses ()",
        "The comma (,)",
        "Square brackets []",
        "Curly braces {}"
      ],
      "answer": 1,
      "explanation": "In Python, commas create tuples. Parentheses are only required for grouping or syntax disambiguation."
    },
    {
      "id": 2,
      "type": "conceptual",
      "topic": "Single Element Rule",
      "prompt": "What is the data type of the expression `x = (42)`?",
      "options": [
        "tuple",
        "int",
        "list",
        "set"
      ],
      "answer": 1,
      "explanation": "(42) is simply the integer 42 in grouping parentheses. To create a 1-element tuple, you must write (42,)."
    },
    {
      "id": 3,
      "type": "conceptual",
      "topic": "Immutability",
      "prompt": "Which of the following operations will raise a TypeError on a tuple `t = (1, 2, 3)`?",
      "options": [
        "t[0]",
        "t + (4,)",
        "t[0] = 99",
        "len(t)"
      ],
      "answer": 2,
      "explanation": "Tuples are immutable; item assignment (t[0] = 99) raises TypeError: 'tuple' object does not support item assignment."
    },
    {
      "id": 4,
      "type": "conceptual",
      "topic": "Built-in Methods",
      "prompt": "Why do tuples have only two built-in methods (.count() and .index())?",
      "options": [
        "Because Python developers forgot the rest",
        "Because all other list methods modify data in-place",
        "Because tuples only store numbers",
        "Because tuples cannot be indexed"
      ],
      "answer": 1,
      "explanation": "Methods like append, extend, insert, pop, and sort modify sequences in-place, which directly violates tuple immutability."
    },
    {
      "id": 5,
      "type": "conceptual",
      "topic": "Sorting Behavior",
      "prompt": "What does `sorted((3, 1, 2))` return?",
      "options": [
        "(1, 2, 3)",
        "[1, 2, 3]",
        "{1, 2, 3}",
        "TypeError"
      ],
      "answer": 1,
      "explanation": "The built-in sorted() function always returns a new sorted list, regardless of whether the input is a tuple, string, or set."
    },
    {
      "id": 6,
      "type": "conceptual",
      "topic": "Slicing Forgiveness",
      "prompt": "What is the result of `('a', 'b', 'c')[1:100]`?",
      "options": [
        "IndexError: tuple index out of range",
        "('b', 'c')",
        "('b', 'c', None)",
        "()"
      ],
      "answer": 1,
      "explanation": "Slicing in Python is forgiving. If stop index exceeds length, Python automatically slices up to the end without crashing."
    },
    {
      "id": 7,
      "type": "conceptual",
      "topic": "Step Slicing",
      "prompt": "Which slice expression reverses a tuple `t` completely?",
      "options": [
        "t[::-1]",
        "t[-1:0]",
        "t.reverse()",
        "t[0:-1]"
      ],
      "answer": 0,
      "explanation": "t[::-1] uses a step of -1 to reverse the tuple into a new reversed tuple."
    },
    {
      "id": 8,
      "type": "conceptual",
      "topic": "Unpacking Rules",
      "prompt": "What happens if you execute `a, b = (1, 2, 3)`?",
      "options": [
        "a=1, b=2 (3 discarded)",
        "ValueError: too many values to unpack",
        "a=1, b=(2, 3)",
        "TypeError"
      ],
      "answer": 1,
      "explanation": "Standard unpacking requires variable count to match item count exactly. Mismatch raises ValueError."
    },
    {
      "id": 9,
      "type": "conceptual",
      "topic": "Star Unpacking",
      "prompt": "In `first, *rest, last = (10, 20, 30, 40, 50)`, what is the type and value of `rest`?",
      "options": [
        "(20, 30, 40) tuple",
        "[20, 30, 40] list",
        "20 int",
        "{20, 30, 40} set"
      ],
      "answer": 1,
      "explanation": "Starred variable *rest captures all middle elements into a standard Python list."
    },
    {
      "id": 10,
      "type": "conceptual",
      "topic": "Underscore Convention",
      "prompt": "Why do Python engineers use `_` in tuple unpacking, such as `name, _, age = record`?",
      "options": [
        "It deletes the value from memory",
        "It signals that the middle value is intentionally discarded/ignored",
        "It turns the value into None",
        "It is required by the Python interpreter"
      ],
      "answer": 1,
      "explanation": "By PEP 8 convention, underscore (_) is used for throwaway variables that are intentionally unread."
    },
    {
      "id": 11,
      "type": "conceptual",
      "topic": "Dictionary Keys",
      "prompt": "Can a tuple `t = (1, [2, 3])` be used as a dictionary key?",
      "options": [
        "Yes, because t is a tuple",
        "No, because it contains an unhashable mutable list",
        "Yes, if the list has only numbers",
        "Only in Python 3.12+"
      ],
      "answer": 1,
      "explanation": "A tuple is only hashable if every element inside it is also hashable. A list inside a tuple breaks hashability."
    },
    {
      "id": 12,
      "type": "conceptual",
      "topic": "Mutable Objects Inside Tuples",
      "prompt": "Given `t = ([10], 'active')`, what happens if you execute `t[0].append(20)`?",
      "options": [
        "TypeError: tuple is immutable",
        "t becomes ([10, 20], 'active')",
        "t[0] is replaced with [10, 20]",
        "AttributeError"
      ],
      "answer": 1,
      "explanation": "The tuple locks pointer references to its objects. Because the list at index 0 is mutable, modifying it in-place is valid."
    },
    {
      "id": 13,
      "type": "conceptual",
      "topic": "Tuple Concatenation",
      "prompt": "What is the result of `(1, 2) + (3,)`?",
      "options": [
        "(1, 2, 3)",
        "(1, 2, (3,))",
        "TypeError",
        "6"
      ],
      "answer": 0,
      "explanation": "+ concatenates two tuples into a single new tuple: (1, 2, 3)."
    },
    {
      "id": 14,
      "type": "conceptual",
      "topic": "Tuple Multiplication",
      "prompt": "What is the result of `(0,) * 3`?",
      "options": [
        "(0, 0, 0)",
        "(0, 3)",
        "0",
        "TypeError"
      ],
      "answer": 0,
      "explanation": "* repeats the tuple contents 3 times, producing (0, 0, 0)."
    },
    {
      "id": 15,
      "type": "conceptual",
      "topic": "Safe Indexing",
      "prompt": "What does `('a', 'b').index('z')` raise?",
      "options": [
        "-1",
        "None",
        "ValueError: tuple.index(x): x not in tuple",
        "IndexError"
      ],
      "answer": 2,
      "explanation": ".index() raises a ValueError when the target element is missing. Always check with 'in' first."
    },
    {
      "id": 16,
      "type": "conceptual",
      "topic": "Safe Counting",
      "prompt": "What does `('a', 'b').count('z')` return?",
      "options": [
        "0",
        "False",
        "None",
        "ValueError"
      ],
      "answer": 0,
      "explanation": ".count() safely returns 0 if the value is not found, never raising an error."
    },
    {
      "id": 17,
      "type": "conceptual",
      "topic": "3-Step Edit Pattern",
      "prompt": "How can you programmatically change an item in a tuple `t`?",
      "options": [
        "t.set(0, 'x')",
        "t[0] = 'x'",
        "Convert to list, mutate, convert back to tuple",
        "Use the update() method"
      ],
      "answer": 2,
      "explanation": "Because tuples are immutable, the canonical workaround is: temp = list(t); temp[i] = val; t = tuple(temp)."
    },
    {
      "id": 18,
      "type": "conceptual",
      "topic": "Variable Swapping",
      "prompt": "Why does `a, b = b, a` work in Python without overwriting values?",
      "options": [
        "The CPU has hardware registers for swaps",
        "Python secretly uses XOR math",
        "Python evaluates the right side into a temporary tuple before unpacking",
        "Variables in Python are pointers"
      ],
      "answer": 2,
      "explanation": "Python evaluates (b, a) as a temporary tuple in memory first, then unpacks into a and b."
    },
    {
      "id": 19,
      "type": "conceptual",
      "topic": "Memory Allocation",
      "prompt": "Why does `sys.getsizeof((1, 2, 3))` return fewer bytes than `sys.getsizeof([1, 2, 3])`?",
      "options": [
        "Tuples compress data using gzip",
        "Lists over-allocate memory buffers for future appends; tuples allocate exact slots",
        "Tuples store 32-bit ints",
        "Lists store strings"
      ],
      "answer": 1,
      "explanation": "Lists are dynamic arrays with growth headroom buffer slots. Tuples are fixed-size PyTupleObjects with zero unused capacity."
    },
    {
      "id": 20,
      "type": "conceptual",
      "topic": "Named Tuples",
      "prompt": "What advantage does `collections.namedtuple` provide over standard tuples?",
      "options": [
        "It makes the tuple mutable",
        "It allows accessing fields by attribute name (obj.field) as well as index (obj[0])",
        "It doubles execution speed",
        "It encrypts data in RAM"
      ],
      "answer": 1,
      "explanation": "namedtuple provides self-documenting code with attribute access while retaining the memory efficiency of tuples."
    },
    {
      "id": 21,
      "type": "conceptual",
      "topic": "Named Tuples Immutability",
      "prompt": "Are `collections.namedtuple` instances mutable?",
      "options": [
        "Yes, fields can be assigned to",
        "No, they inherit tuple immutability",
        "Only if declared with @mutable",
        "Only private fields"
      ],
      "answer": 1,
      "explanation": "namedtuple subclasses tuple, so its instances are strictly immutable."
    },
    {
      "id": 22,
      "type": "conceptual",
      "topic": "Tuple Deletion",
      "prompt": "What does `del t[0]` do on a tuple `t`?",
      "options": [
        "Removes index 0 and shifts elements left",
        "Sets index 0 to None",
        "Raises TypeError: 'tuple' object doesn't support item deletion",
        "Decrements length"
      ],
      "answer": 2,
      "explanation": "Individual tuple items cannot be deleted. You can only delete the entire variable name with `del t`."
    },
    {
      "id": 23,
      "type": "conceptual",
      "topic": "Function Multiple Returns",
      "prompt": "When a function has `return x, y`, what is the actual returned data type?",
      "options": [
        "A list [x, y]",
        "A tuple (x, y)",
        "Two separate values in CPU registers",
        "A dictionary"
      ],
      "answer": 1,
      "explanation": "Comma-separated return values are packed automatically into a single tuple object."
    },
    {
      "id": 24,
      "type": "conceptual",
      "topic": "Data Structure Selection",
      "prompt": "Which data structure is preferred for a database row of user profile attributes?",
      "options": [
        "List, because it is longer",
        "Tuple, because attributes are a fixed-structure record that shouldn't mutate",
        "Set, because it sorts data",
        "Queue"
      ],
      "answer": 1,
      "explanation": "Tuples represent heterogeneous records with positional semantics, making them the standard row format in SQL connectors."
    },
    {
      "id": 25,
      "type": "conceptual",
      "topic": "Negative Index Formula",
      "prompt": "For a tuple `t` with `len(t) == 6`, which negative index corresponds to positive index 4?",
      "options": [
        "-1",
        "-2",
        "-3",
        "-4"
      ],
      "answer": 1,
      "explanation": "Negative index equals positive index minus length: 4 - 6 = -2."
    }
  ],
  "interviewQuestions": [
    {
      "q": "How are Python tuples implemented in CPython at the systems level?",
      "a": "<p><em>A: In CPython, a tuple is implemented as a <code>PyTupleObject</code>, which wraps a fixed-size, contiguous array of 64-bit pointers (<code>PyObject* ob_item[1]</code>). Unlike <code>PyListObject</code>, it has no dynamic pointer buffer, no over-allocation slack, and cannot be resized after instantiation.</em></p>"
    },
    {
      "q": "Why are tuples more memory-efficient than lists in CPython?",
      "a": "<p><em>A: Tuples allocate exact memory for $N$ pointers with zero buffer headroom. Lists allocate extra unused capacity slots (roughly $9/8$ growth) to support amortized $O(1)$ appends. Furthermore, empty tuples consume 40 bytes vs 56 bytes for lists on 64-bit systems.</em></p>"
    },
    {
      "q": "What is the CPython small tuple free list optimization?",
      "a": "<p><em>A: CPython maintains an internal array of recycled tuple structures (<code>free_list</code>) for tuples of lengths 1 to 20. When a small tuple is deallocated, its memory block is placed on the free list and reused directly for future allocations, eliminating expensive kernel <code>malloc()</code> syscalls.</em></p>"
    },
    {
      "q": "Can a tuple always be used as a dictionary key or set element? Explain.",
      "a": "<p><em>A: No. A tuple is only hashable if <strong>every element</strong> contained inside it is also hashable. If a tuple contains a mutable object (such as a list: <code>(1, [2, 3])</code>), calling <code>hash()</code> fails and Python raises <code>TypeError: unhashable type: 'list'</code>.</em></p>"
    },
    {
      "q": "Why does <code>t = (1, [2, 3]); t[1] += [4]</code> mutate the list AND raise a <code>TypeError</code>?",
      "a": "<p><em>A: Augmented assignment (<code>+=</code>) compiles to two bytecode steps: <code>INPLACE_ADD</code> and <code>STORE_SUBSCR</code>. <code>INPLACE_ADD</code> mutates the list in-place successfully. Then <code>STORE_SUBSCR</code> attempts to re-assign the list reference back to <code>t[1]</code>. Because <code>t</code> is an immutable tuple, the reassignment raises <code>TypeError</code> after mutation has already occurred!</em></p>"
    },
    {
      "q": "What is the difference between <code>a = (42)</code> and <code>b = (42,)</code>?",
      "a": "<p><em>A: In Python, parentheses are used for expression grouping as well as tuple definition. <code>(42)</code> evaluates as the integer <code>42</code> in grouping parentheses. <code>(42,)</code> has a trailing comma, which tells the parser to construct a 1-element tuple.</em></p>"
    },
    {
      "q": "Why do tuples have only two methods (<code>count</code> and <code>index</code>)?",
      "a": "<p><em>A: Methods like <code>append</code>, <code>insert</code>, <code>extend</code>, <code>pop</code>, <code>remove</code>, <code>clear</code>, <code>sort</code>, and <code>reverse</code> all mutate sequence state in-place. Because tuples are strictly immutable, any mutating method would violate the core language invariant of the tuple type.</em></p>"
    },
    {
      "q": "How does variable swapping <code>a, b = b, a</code> work under the hood without a temporary variable?",
      "a": "<p><em>A: In CPython bytecode, the right-hand side evaluates <code>b</code> and <code>a</code> and pushes them onto the execution stack (or packs them into a temporary 2-element tuple). The <code>ROT_TWO</code> instruction swaps the two top stack items, and <code>STORE_NAME</code> pops them into <code>a</code> and <code>b</code> atomically.</em></p>"
    },
    {
      "q": "What is extended unpacking and what type does the starred variable evaluate to?",
      "a": "<p><em>A: Extended unpacking allows using <code>*var</code> to capture variable-length slices: <code>first, *middle, last = tpl</code>. The starred variable <strong>always evaluates to a list</strong>, regardless of whether the source iterable was a tuple, string, or set.</em></p>"
    },
    {
      "q": "What happens during extended unpacking if there are no leftover elements for the starred variable?",
      "a": "<p><em>A: If the source tuple has exactly enough elements to satisfy the non-starred target variables (e.g. <code>first, *middle, last = (10, 20)</code>), <code>*middle</code> evaluates to an empty list <code>[]</code> without throwing any error.</em></p>"
    },
    {
      "q": "How does slicing a tuple differ from slicing a list?",
      "a": "<p><em>A: Slicing a tuple produces a brand new tuple, while slicing a list produces a new list. Both perform shallow copies of element pointers. However, empty tuple slicing or full slicing <code>t[:]</code> can be optimized by CPython to return the original tuple reference since immutability guarantees safety.</em></p>"
    },
    {
      "q": "What is the 'Forgiving Stop-Sign Rule' in tuple slicing?",
      "a": "<p><em>A: Direct indexing <code>t[99]</code> strictly requires the index to be within bounds, raising <code>IndexError</code> if violated. In contrast, slicing <code>t[1:99]</code> clamps gracefully to the container boundaries (<code>len(t)</code>) without throwing any exception.</em></p>"
    },
    {
      "q": "What is <code>collections.namedtuple</code> and what advantages does it offer over regular tuples and dicts?",
      "a": "<p><em>A: <code>namedtuple</code> is a factory function that creates tuple subclasses with named fields. It offers attribute access (<code>p.x</code>) and index access (<code>p[0]</code>), consumes the exact same minimal memory as a standard tuple (no <code>__dict__</code> overhead), and is fully immutable and hashable.</em></p>"
    },
    {
      "q": "How can you modify a field in a <code>namedtuple</code>?",
      "a": "<p><em>A: Because namedtuples are immutable, fields cannot be modified in-place. Use the built-in <code>_replace(**kwargs)</code> method, which returns a <strong>new</strong> namedtuple instance with the specified fields replaced.</em></p>"
    },
    {
      "q": "What is constant folding for tuples in CPython AST compilation?",
      "a": "<p><em>A: During compilation, if a tuple contains only literal constants (e.g. <code>(1, 2, 'hello')</code>), CPython's peephole optimizer folds the expression into a single constant object stored directly in code object <code>co_consts</code>. At runtime, creation takes $O(1)$ with 0 construction overhead.</em></p>"
    },
    {
      "q": "Why is <code>tuple.index(x)</code> dangerous without an <code>in</code> check?",
      "a": "<p><em>A: Unlike <code>.count(x)</code> which returns <code>0</code> when <code>x</code> is missing, <code>.index(x)</code> raises an unhandled <code>ValueError: tuple.index(x): x not in tuple</code>. In production pipelines, always guard with <code>if x in tpl: idx = tpl.index(x)</code>.</em></p>"
    },
    {
      "q": "How do you reverse a tuple efficiently?",
      "a": "<p><em>A: Use the slice shortcut <code>tpl[::-1]</code> to allocate a new reversed tuple, or <code>reversed(tpl)</code> to obtain a lazy reverse iterator ($O(1)$ memory overhead) when traversing elements sequentially without storing the result.</em></p>"
    },
    {
      "q": "What is the Conversion Roundtrip Pattern for modifying tuples?",
      "a": "<p><em>A: Convert the tuple to a list <code>lst = list(tpl)</code>, perform arbitrary mutations (e.g. <code>lst.append()</code>, <code>lst.sort()</code>, <code>lst[i] = v</code>), and convert back to an immutable tuple <code>tpl = tuple(lst)</code>.</em></p>"
    },
    {
      "q": "Why does <code>del tpl[0]</code> fail while <code>del tpl</code> succeeds?",
      "a": "<p><em>A: <code>del tpl[0]</code> attempts to delete an element from the immutable tuple buffer, which raises <code>TypeError: 'tuple' object doesn't support item deletion</code>. <code>del tpl</code> unbinds the variable name from local namespace scope, allowing Python's garbage collector to reclaim the object.</em></p>"
    },
    {
      "q": "How does Python evaluate <code>tpl1 + tpl2</code> in memory?",
      "a": "<p><em>A: It evaluates the lengths $N$ and $M$, allocates a fresh <code>PyTupleObject</code> of size $N + M$, copies all $N$ pointers from <code>tpl1</code>, copies all $M$ pointers from <code>tpl2</code>, and returns the new tuple ($O(N + M)$ time and memory).</em></p>"
    },
    {
      "q": "Can a tuple have self-referential or cyclic references?",
      "a": "<p><em>A: Yes! Although tuples are immutable, a tuple containing a list can have that list append the tuple itself: <code>lst = []; t = (lst,); lst.append(t)</code>. This creates a reference cycle that CPython's cyclic garbage collector (gc) must resolve.</em></p>"
    },
    {
      "q": "Why are tuples preferred over lists as function parameters in concurrent/multi-threaded code?",
      "a": "<p><em>A: Tuples are immutable and read-only. Multiple threads can read from the same tuple simultaneously without acquiring locks (mutexes), guaranteeing total thread safety and eliminating data race conditions.</em></p>"
    },
    {
      "q": "What is the time complexity of checking <code>x in my_tuple</code> versus <code>x in my_set</code>?",
      "a": "<p><em>A: <code>x in my_tuple</code> is $O(N)$ linear time because it performs sequential pointer comparisons from head to tail. <code>x in my_set</code> is average $O(1)$ constant time because sets use a hash table lookup.</em></p>"
    },
    {
      "q": "How does <code>sys.intern()</code> or constant interning relate to tuples?",
      "a": "<p><em>A: Empty tuples <code>()</code> are singletons in CPython: any empty tuple references the exact same memory address (<code>() is ()</code> evaluates to <code>True</code>). Furthermore, constant tuples defined in the same module are deduplicated in the code object constants table.</em></p>"
    },
    {
      "q": "How do you unpack a nested tuple like <code>person = ('Asha', (28, 'Data Analyst'))</code>?",
      "a": "<p><em>A: Match the nested structure in the assignment target: <code>name, (age, role) = person</code>. Python recursively unpacks the outer tuple, then unpacks the inner tuple into <code>age</code> and <code>role</code> in a single statement.</em></p>"
    }
  ]
};
