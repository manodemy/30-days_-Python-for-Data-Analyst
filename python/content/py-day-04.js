window.COURSE_CONTENT = window.COURSE_CONTENT || {};
window.COURSE_CONTENT.pyDay04 = {
  "day": 4,
  "title": "Lists & Sequence Operations",
  "emoji": "📋",
  "topics": [
    {
      "id": "day04FundamentalsSection",
      "label": "01. List Fundamentals & Memory",
      "duration": "2:30"
    },
    {
      "id": "day04IndexingSlicingSection",
      "label": "02. List Indexing & Slicing",
      "duration": "2:45"
    },
    {
      "id": "day04UnpackingSection",
      "label": "03. Sequence Unpacking",
      "duration": "2:15"
    },
    {
      "id": "day04ModifyingSection",
      "label": "04. List Mutability & In-Place Ops",
      "duration": "2:20"
    },
    {
      "id": "day04AddingSection",
      "label": "05. Adding & Appending Elements",
      "duration": "2:50"
    },
    {
      "id": "day04RemovingSection",
      "label": "06. Removing & Clearing Elements",
      "duration": "2:40"
    },
    {
      "id": "day04CopyingSection",
      "label": "07. Shallow & Deep Copying",
      "duration": "2:30"
    },
    {
      "id": "day04MistakesSection",
      "label": "08. Common Anti-Patterns",
      "duration": "2:00"
    },
    {
      "id": "day04SortingPerfSection",
      "label": "09. Sorting & Reversing",
      "duration": "2:40"
    },
    {
      "id": "day04InterviewQuestions",
      "label": "10. Review & Interview Questions",
      "duration": "3:30"
    }
  ],
  "slides": [
    {
      "id": "slide-1",
      "title": "Python Lists & Sequence Operations",
      "html": "<style>\n\n  /* ══════════════════════════════════════════════════════════\n     BASE & DARK THEME (DEFAULT)\n     ══════════════════════════════════════════════════════════ */\n\n  /* ── Flagship Dual-Box Heading Architecture (SQL Day 01 Parity) ── */\n  .heading-box-wrap,\n  .slide-section-title.heading-box-wrap {\n    display: flex !important;\n    align-items: stretch !important;\n    gap: 0 !important;\n    background: transparent !important;\n    border: none !important;\n    padding: 0 !important;\n    margin: 24px 0 14px 0 !important;\n    filter: drop-shadow(0 4px 14px rgba(0, 0, 0, 0.35)) !important;\n  }\n  .slide-section:first-child .heading-box-wrap,\n  #day01WhyPythonSection .heading-box-wrap {\n    margin-top: 4px !important;\n  }\n\n  /* Left Box: Monospace Number Badge (Exact SQL Day 01 Parity from 2nd Image) */\n  .heading-num-box {\n    display: inline-flex !important;\n    align-items: center !important;\n    justify-content: center !important;\n    background: linear-gradient(135deg, #6366f1, #8b5cf6) !important;\n    color: #ffffff !important;\n    font-family: 'JetBrains Mono', var(--mono, monospace) !important;\n    font-size: 0.88rem !important;\n    font-weight: 800 !important;\n    letter-spacing: 0.05em !important;\n    padding: 8px 14px !important;\n    border-radius: 8px 0 0 8px !important;\n    border: 1px solid rgba(139, 92, 246, 0.6) !important;\n    border-right: none !important;\n    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.25) !important;\n    flex-shrink: 0 !important;\n    min-width: 44px !important;\n    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3) !important;\n  }\n\n  /* Right Box: Matte Title Box (Always Deep Obsidian Dark — Exact 2nd Image Parity) */\n  .heading-title-box {\n    display: flex !important;\n    align-items: center !important;\n    justify-content: space-between !important;\n    flex: 1 !important;\n    background: #0f172a !important; /* Deep obsidian matte from SQL Day 01 */\n    border: 1px solid rgba(255, 255, 255, 0.08) !important;\n    border-left: 1px solid rgba(139, 92, 246, 0.4) !important;\n    border-radius: 0 8px 8px 0 !important;\n    padding: 8px 16px !important;\n    color: #f8fafc !important;\n    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05) !important;\n  }\n\n  .heading-title-text {\n    flex: 1 !important;\n    color: #f8fafc !important;\n    font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif !important;\n    font-size: 1.05rem !important;\n    font-weight: 800 !important;\n    letter-spacing: -0.015em !important;\n    line-height: 1.35 !important;\n    display: flex !important;\n    align-items: center !important;\n    gap: 10px !important;\n  }\n\n  .heading-icon {\n    font-size: 1.15rem !important;\n    display: inline-flex !important;\n    align-items: center !important;\n    line-height: 1 !important;\n  }\n\n  /* Audio Play Button in Heading */\n  .heading-title-box .audio-play-btn,\n  .heading-with-audio .audio-play-btn {\n    width: 26px !important;\n    height: 26px !important;\n    min-width: 26px !important;\n    min-height: 26px !important;\n    max-width: 26px !important;\n    max-height: 26px !important;\n    border-radius: 6px !important;\n    border: 1px solid rgba(255, 255, 255, 0.14) !important;\n    background: rgba(255, 255, 255, 0.08) !important;\n    color: #94a3b8 !important;\n    cursor: pointer !important;\n    display: inline-flex !important;\n    align-items: center !important;\n    justify-content: center !important;\n    padding: 0 !important;\n    margin: 0 !important;\n    flex-shrink: 0 !important;\n    transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease, transform 0.15s ease !important;\n  }\n\n  .heading-title-box .audio-play-btn:hover,\n  .heading-with-audio .audio-play-btn:hover {\n    background: #ef4444 !important;\n    border-color: #ef4444 !important;\n    color: #ffffff !important;\n    box-shadow: 0 0 10px rgba(239, 68, 68, 0.45) !important;\n    transform: scale(1.05) !important;\n  }\n\n  .heading-title-box .audio-play-btn.playing,\n  .heading-with-audio .audio-play-btn.playing {\n    background: #ef4444 !important;\n    border-color: #ef4444 !important;\n    color: #ffffff !important;\n    box-shadow: 0 0 12px rgba(239, 68, 68, 0.5) !important;\n  }\n\n  /* General Typography & Heading Hierarchy (Dark Mode) */\n  .slide-section h1,\n  .slide-section h2,\n  .slide-section h3,\n  .slide-section h4 {\n    font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif !important;\n    color: #f8fafc !important;\n    letter-spacing: -0.015em !important;\n  }\n\n  @media (max-width: 640px) {\n    .heading-num-box {\n      font-size: 0.80rem !important;\n      padding: 7px 10px !important;\n      min-width: 40px !important;\n    }\n    .heading-title-box {\n      padding: 7px 12px !important;\n    }\n    .heading-title-text {\n      font-size: 0.88rem !important;\n      gap: 6px !important;\n    }\n    .heading-icon {\n      font-size: 1rem !important;\n    }\n    .heading-title-box .audio-play-btn {\n      width: 24px !important;\n      height: 24px !important;\n      min-width: 24px !important;\n      min-height: 24px !important;\n    }\n  }\n\n  .py-infographic-card {\n    background: linear-gradient(135deg, rgba(15, 23, 42, 0.96) 0%, rgba(8, 14, 28, 0.98) 100%);\n    border: 1px solid rgba(255, 255, 255, 0.08);\n    border-radius: 12px;\n    padding: 16px 18px;\n    margin: 14px 0;\n    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.05);\n    transition: background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;\n  }\n  .py-info-header {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: 10px;\n    margin-bottom: 12px;\n    padding-bottom: 8px;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.06);\n  }\n  .py-info-title {\n    font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;\n    font-size: 0.82rem;\n    font-weight: 800;\n    text-transform: uppercase;\n    letter-spacing: 0.08em;\n    color: #38bdf8;\n    display: flex;\n    align-items: center;\n    gap: 8px;\n  }\n  .py-badge {\n    font-family: 'JetBrains Mono', monospace;\n    font-size: 0.68rem;\n    font-weight: 700;\n    padding: 2px 8px;\n    border-radius: 4px;\n    background: rgba(56, 189, 248, 0.12);\n    border: 1px solid rgba(56, 189, 248, 0.28);\n    color: #38bdf8;\n  }\n  .py-badge-gold {\n    background: rgba(245, 158, 11, 0.12);\n    border-color: rgba(245, 158, 11, 0.28);\n    color: #fbbf24;\n  }\n  .py-badge-green {\n    background: rgba(34, 197, 94, 0.12);\n    border-color: rgba(34, 197, 94, 0.28);\n    color: #4ade80;\n  }\n  .py-badge-purple {\n    background: rgba(168, 85, 247, 0.12);\n    border-color: rgba(168, 85, 247, 0.28);\n    color: #c084fc;\n  }\n  .py-badge-rose {\n    background: rgba(244, 63, 94, 0.12);\n    border-color: rgba(244, 63, 94, 0.28);\n    color: #fb7185;\n  }\n\n  /* CPython Object Header Grid */\n  .cpython-grid {\n    display: grid;\n    grid-template-columns: repeat(4, 1fr);\n    gap: 8px;\n    margin-top: 10px;\n  }\n  @media (max-width: 640px) {\n    .cpython-grid { grid-template-columns: 1fr 1fr; }\n  }\n  .cpython-cell {\n    background: rgba(255, 255, 255, 0.03);\n    border: 1px solid rgba(255, 255, 255, 0.07);\n    border-radius: 8px;\n    padding: 10px;\n    text-align: center;\n    transition: all 0.2s ease;\n  }\n  .cpython-cell:hover {\n    background: rgba(56, 189, 248, 0.06);\n    border-color: rgba(56, 189, 248, 0.3);\n  }\n  .cpython-cell-size {\n    font-family: 'JetBrains Mono', monospace;\n    font-size: 0.65rem;\n    font-weight: 700;\n    color: #94a3b8;\n    margin-bottom: 4px;\n  }\n  .cpython-cell-name {\n    font-family: 'JetBrains Mono', monospace;\n    font-size: 0.78rem;\n    font-weight: 800;\n    color: #f8fafc;\n  }\n  .cpython-cell-desc {\n    font-size: 0.70rem;\n    color: #64748b;\n    margin-top: 4px;\n    line-height: 1.3;\n  }\n\n  /* Mutability Cards Base */\n  .py-mut-card {\n    border-radius: 8px;\n    padding: 12px;\n    transition: all 0.2s ease;\n  }\n  .py-mut-card.mut-green {\n    background: rgba(16, 185, 129, 0.06);\n    border: 1px solid rgba(16, 185, 129, 0.25);\n  }\n  .py-mut-card.mut-rose {\n    background: rgba(244, 63, 94, 0.06);\n    border: 1px solid rgba(244, 63, 94, 0.25);\n  }\n  .py-mut-card p {\n    font-size: 0.75rem;\n    color: #cbd5e1;\n    margin: 0 0 8px;\n    line-height: 1.45;\n  }\n  .py-mut-card .mut-ex {\n    font-size: 0.70rem;\n    color: #94a3b8;\n    margin-bottom: 6px;\n  }\n\n  /* Memory Cards Base */\n  .py-mem-card {\n    background: rgba(255, 255, 255, 0.03);\n    border: 1px solid rgba(255, 255, 255, 0.07);\n    border-radius: 8px;\n    padding: 12px;\n    transition: all 0.2s ease;\n  }\n  .py-mem-card-title {\n    font-family: 'JetBrains Mono', monospace;\n    font-size: 0.80rem;\n    font-weight: 800;\n    margin-bottom: 4px;\n  }\n  .py-mem-blue { color: #38bdf8; }\n  .py-mem-green { color: #4ade80; }\n  .py-mem-amber { color: #fbbf24; }\n  .py-mem-purple { color: #c084fc; }\n  .py-mem-card .py-mem-desc {\n    font-size: 0.75rem;\n    color: #cbd5e1;\n    line-height: 1.5;\n  }\n\n  /* Code Block Box */\n  .py-code-box {\n    margin: 0;\n    padding: 8px 10px;\n    background: rgba(0, 0, 0, 0.45);\n    border: 1px solid rgba(255, 255, 255, 0.08);\n    border-radius: 6px;\n    font-size: 0.74rem;\n    color: #f8fafc;\n    font-family: 'JetBrains Mono', monospace;\n  }\n\n  /* ══════════════════════════════════════════════════════════\n     SUPERPOWERS FLAGSHIP SHOWCASE DESIGN (DARK THEME)\n     ══════════════════════════════════════════════════════════ */\n  .py-sp-showcase {\n    background: linear-gradient(145deg, rgba(15, 23, 42, 0.96) 0%, rgba(10, 16, 31, 0.98) 100%);\n    border: 1px solid rgba(255, 255, 255, 0.08);\n    border-radius: 14px;\n    padding: 20px 22px;\n    margin: 16px 0;\n    box-shadow: 0 16px 40px -10px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.06);\n    transition: background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;\n  }\n  .py-sp-header {\n    margin-bottom: 18px;\n    padding-bottom: 14px;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.08);\n  }\n  .py-sp-title-row {\n    display: flex;\n    align-items: center;\n    gap: 14px;\n    flex-wrap: wrap;\n  }\n  .py-sp-header-icon {\n    width: 42px;\n    height: 42px;\n    border-radius: 12px;\n    background: linear-gradient(135deg, rgba(56, 189, 248, 0.16) 0%, rgba(99, 102, 241, 0.22) 100%);\n    border: 1px solid rgba(56, 189, 248, 0.35);\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-size: 1.25rem;\n    flex-shrink: 0;\n    box-shadow: 0 4px 14px rgba(56, 189, 248, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.1);\n  }\n  .py-sp-header-text {\n    display: flex;\n    flex-direction: column;\n    gap: 2px;\n    flex: 1;\n  }\n  .py-sp-title {\n    margin: 0;\n    font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;\n    font-size: 1.12rem;\n    font-weight: 800;\n    letter-spacing: -0.015em;\n    color: #f8fafc !important;\n    line-height: 1.3;\n  }\n  .py-sp-subtitle {\n    margin: 3px 0 0 0;\n    font-size: 0.82rem;\n    color: #94a3b8 !important;\n    font-weight: 500;\n    letter-spacing: 0.01em;\n    line-height: 1.4;\n  }\n  .py-sp-grid {\n    display: grid;\n    grid-template-columns: repeat(2, 1fr);\n    gap: 12px;\n  }\n  @media (max-width: 680px) {\n    .py-sp-grid { grid-template-columns: 1fr; }\n  }\n  .py-sp-card {\n    background: rgba(255, 255, 255, 0.025);\n    border: 1px solid rgba(255, 255, 255, 0.07);\n    border-radius: 12px;\n    padding: 14px 16px;\n    display: flex;\n    flex-direction: column;\n    justify-content: space-between;\n    transition: all 0.22s cubic-bezier(0.4, 0, 0.2, 1);\n    position: relative;\n    overflow: hidden;\n  }\n  .py-sp-card:hover {\n    transform: translateY(-2px);\n    background: rgba(255, 255, 255, 0.04);\n    box-shadow: 0 10px 24px -6px rgba(0, 0, 0, 0.4);\n  }\n  .py-sp-card::before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    height: 2px;\n    opacity: 0.85;\n  }\n  .py-sp-card.sp-blue::before { background: linear-gradient(90deg, #38bdf8, transparent); }\n  .py-sp-card.sp-blue:hover { border-color: rgba(56, 189, 248, 0.4); }\n  .py-sp-card.sp-green::before { background: linear-gradient(90deg, #34d399, transparent); }\n  .py-sp-card.sp-green:hover { border-color: rgba(52, 211, 153, 0.4); }\n  .py-sp-card.sp-amber::before { background: linear-gradient(90deg, #fbbf24, transparent); }\n  .py-sp-card.sp-amber:hover { border-color: rgba(251, 191, 36, 0.4); }\n  .py-sp-card.sp-purple::before { background: linear-gradient(90deg, #c084fc, transparent); }\n  .py-sp-card.sp-purple:hover { border-color: rgba(192, 132, 252, 0.4); }\n\n  .py-sp-card-top {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    margin-bottom: 10px;\n  }\n  .py-sp-card-header {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n  }\n  .py-sp-icon {\n    width: 32px;\n    height: 32px;\n    border-radius: 8px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-size: 1rem;\n    flex-shrink: 0;\n  }\n  .sp-blue .py-sp-icon { background: rgba(56, 189, 248, 0.12); border: 1px solid rgba(56, 189, 248, 0.25); }\n  .sp-green .py-sp-icon { background: rgba(52, 211, 153, 0.12); border: 1px solid rgba(52, 211, 153, 0.25); }\n  .sp-amber .py-sp-icon { background: rgba(251, 191, 36, 0.12); border: 1px solid rgba(251, 191, 36, 0.25); }\n  .sp-purple .py-sp-icon { background: rgba(192, 132, 252, 0.12); border: 1px solid rgba(192, 132, 252, 0.25); }\n\n  .py-sp-card-title {\n    font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;\n    font-size: 0.88rem;\n    font-weight: 700;\n    color: #f8fafc !important;\n  }\n  .py-sp-num {\n    font-family: 'JetBrains Mono', monospace;\n    font-size: 0.68rem;\n    font-weight: 800;\n    padding: 2px 7px;\n    border-radius: 4px;\n  }\n  .sp-blue .py-sp-num { color: #38bdf8; background: rgba(56, 189, 248, 0.1); border: 1px solid rgba(56, 189, 248, 0.2); }\n  .sp-green .py-sp-num { color: #34d399; background: rgba(52, 211, 153, 0.1); border: 1px solid rgba(52, 211, 153, 0.2); }\n  .sp-amber .py-sp-num { color: #fbbf24; background: rgba(251, 191, 36, 0.1); border: 1px solid rgba(251, 191, 36, 0.2); }\n  .sp-purple .py-sp-num { color: #c084fc; background: rgba(192, 132, 252, 0.1); border: 1px solid rgba(192, 132, 252, 0.2); }\n\n  .py-sp-desc {\n    font-size: 0.77rem;\n    line-height: 1.55;\n    color: #cbd5e1 !important;\n    margin: 0 0 10px 0;\n  }\n  .py-sp-tag {\n    display: inline-flex;\n    align-items: center;\n    gap: 5px;\n    font-size: 0.70rem;\n    font-weight: 600;\n    padding: 3px 8px;\n    border-radius: 6px;\n    background: rgba(255, 255, 255, 0.04);\n    border: 1px solid rgba(255, 255, 255, 0.07);\n    color: #e2e8f0;\n    align-self: flex-start;\n  }\n\n  /* 05 AI Flagship Banner */\n  .py-sp-ai-banner {\n    margin-top: 12px;\n    background: linear-gradient(135deg, rgba(147, 51, 234, 0.15) 0%, rgba(79, 70, 229, 0.12) 50%, rgba(15, 23, 42, 0.85) 100%);\n    border: 1px solid rgba(168, 85, 247, 0.35);\n    border-radius: 12px;\n    padding: 16px 18px;\n    display: flex;\n    align-items: center;\n    gap: 16px;\n    box-shadow: 0 10px 28px -6px rgba(147, 51, 234, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.08);\n    transition: all 0.22s ease;\n  }\n  .py-sp-ai-banner:hover {\n    border-color: rgba(168, 85, 247, 0.55);\n    box-shadow: 0 12px 32px -4px rgba(147, 51, 234, 0.35);\n  }\n  .py-sp-ai-icon {\n    width: 42px;\n    height: 42px;\n    border-radius: 10px;\n    background: linear-gradient(135deg, #a855f7 0%, #ec4899 100%);\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-size: 1.25rem;\n    flex-shrink: 0;\n    box-shadow: 0 4px 14px rgba(168, 85, 247, 0.4);\n  }\n  .py-sp-ai-body { flex: 1; }\n  .py-sp-ai-title-row {\n    display: flex;\n    align-items: center;\n    gap: 8px;\n    margin-bottom: 4px;\n    flex-wrap: wrap;\n  }\n  .py-sp-ai-title {\n    font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;\n    font-size: 0.92rem;\n    font-weight: 800;\n    color: #fdf4ff !important;\n    letter-spacing: -0.01em;\n  }\n  .py-sp-ai-pill {\n    font-family: 'JetBrains Mono', monospace;\n    font-size: 0.65rem;\n    font-weight: 700;\n    padding: 2px 7px;\n    border-radius: 4px;\n    background: rgba(236, 72, 153, 0.16);\n    border: 1px solid rgba(236, 72, 153, 0.38);\n    color: #f472b6;\n  }\n  .py-sp-ai-text {\n    font-size: 0.78rem;\n    color: #e2e8f0 !important;\n    line-height: 1.55;\n    margin: 0;\n  }\n  .py-sp-code-pill {\n    display: inline-block;\n    background: rgba(168, 85, 247, 0.22) !important;\n    color: #f5d0fe !important;\n    border: 1px solid rgba(168, 85, 247, 0.45) !important;\n    padding: 1px 7px !important;\n    border-radius: 5px !important;\n    font-family: 'JetBrains Mono', monospace !important;\n    font-size: 0.73rem !important;\n    font-weight: 600 !important;\n    vertical-align: middle;\n  }\n\n  /* ══════════════════════════════════════════════════════════\n     LIGHT MODE THEME ADAPTATIONS ([data-theme=\"light\"])\n     ══════════════════════════════════════════════════════════ */\n\n  /* ── Keep Heading Box Dark in Light Mode (Exactly Like 2nd Image) ── */\n  [data-theme=\"light\"] .heading-box-wrap,\n  [data-theme=\"light\"] .slide-section-title.heading-box-wrap {\n    filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.16)) !important;\n  }\n  [data-theme=\"light\"] .heading-num-box {\n    background: linear-gradient(135deg, #6366f1, #8b5cf6) !important;\n    color: #ffffff !important;\n    border: 1px solid rgba(139, 92, 246, 0.6) !important;\n    border-right: none !important;\n    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.25) !important;\n    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3) !important;\n  }\n  [data-theme=\"light\"] .heading-title-box {\n    background: #0f172a !important; /* Retain deep obsidian matte in light mode */\n    border: 1px solid rgba(255, 255, 255, 0.08) !important;\n    border-left: 1px solid rgba(139, 92, 246, 0.4) !important;\n    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 3px 10px rgba(0, 0, 0, 0.12) !important;\n  }\n  [data-theme=\"light\"] .heading-title-text {\n    color: #f8fafc !important; /* Crisp white text inside dark box */\n  }\n  [data-theme=\"light\"] .heading-title-box .audio-play-btn {\n    background: rgba(255, 255, 255, 0.08) !important;\n    border: 1px solid rgba(255, 255, 255, 0.12) !important;\n    color: #94a3b8 !important;\n  }\n  [data-theme=\"light\"] .heading-title-box .audio-play-btn:hover {\n    background: #ef4444 !important;\n    border-color: #ef4444 !important;\n    color: #ffffff !important;\n    box-shadow: 0 0 10px rgba(239, 68, 68, 0.4) !important;\n  }\n  [data-theme=\"light\"] .heading-title-box .audio-play-btn.playing {\n    background: #ef4444 !important;\n    border-color: #ef4444 !important;\n    color: #ffffff !important;\n    box-shadow: 0 0 10px rgba(239, 68, 68, 0.4) !important;\n  }\n  [data-theme=\"light\"] .slide-section h1,\n  [data-theme=\"light\"] .slide-section h2,\n  [data-theme=\"light\"] .slide-section h3,\n  [data-theme=\"light\"] .slide-section h4 {\n    color: #0f172a !important;\n  }\n\n  [data-theme=\"light\"] .py-sp-showcase {\n    background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);\n    border: 1px solid #e2e8f0;\n    box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.05), inset 0 1px 0 #ffffff;\n  }\n  [data-theme=\"light\"] .py-sp-header {\n    border-bottom: 1.5px solid #e2e8f0;\n    padding-bottom: 14px;\n    margin-bottom: 18px;\n  }\n  [data-theme=\"light\"] .py-sp-header-icon {\n    background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);\n    border: 1.5px solid #38bdf8;\n    box-shadow: 0 4px 14px rgba(2, 132, 199, 0.15);\n    width: 44px;\n    height: 44px;\n    border-radius: 12px;\n  }\n  [data-theme=\"light\"] .py-sp-title {\n    color: #0f172a !important;\n    font-size: 1.25rem !important;\n    font-weight: 800 !important;\n    letter-spacing: -0.02em !important;\n  }\n  [data-theme=\"light\"] .py-sp-subtitle {\n    color: #334155 !important;\n    font-size: 0.88rem !important;\n    font-weight: 500 !important;\n  }\n\n  /* Light Mode 4 Cards */\n  [data-theme=\"light\"] .py-sp-card {\n    background: #ffffff;\n    border: 1px solid #e2e8f0;\n    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);\n  }\n  [data-theme=\"light\"] .py-sp-card:hover {\n    background: #ffffff;\n    transform: translateY(-2px);\n    box-shadow: 0 10px 25px -4px rgba(0, 0, 0, 0.08);\n  }\n  [data-theme=\"light\"] .py-sp-card.sp-blue:hover { border-color: #38bdf8; }\n  [data-theme=\"light\"] .py-sp-card.sp-green:hover { border-color: #34d399; }\n  [data-theme=\"light\"] .py-sp-card.sp-amber:hover { border-color: #fbbf24; }\n  [data-theme=\"light\"] .py-sp-card.sp-purple:hover { border-color: #c084fc; }\n\n  [data-theme=\"light\"] .py-sp-card-title {\n    color: #0f172a !important;\n  }\n  [data-theme=\"light\"] .py-sp-desc { color: #1e293b !important; font-weight: 500; }\n  [data-theme=\"light\"] .sp-blue .py-sp-icon {\n    background: #f0f9ff;\n    border: 1px solid #bae6fd;\n  }\n  [data-theme=\"light\"] .sp-green .py-sp-icon {\n    background: #f0fdf4;\n    border: 1px solid #bbf7d0;\n  }\n  [data-theme=\"light\"] .sp-amber .py-sp-icon {\n    background: #fffbeb;\n    border: 1px solid #fde68a;\n  }\n  [data-theme=\"light\"] .sp-purple .py-sp-icon {\n    background: #faf5ff;\n    border: 1px solid #ddd6fe;\n  }\n  [data-theme=\"light\"] .sp-blue .py-sp-num {\n    color: #0284c7;\n    background: #e0f2fe;\n    border: 1px solid #bae6fd;\n  }\n  [data-theme=\"light\"] .sp-green .py-sp-num {\n    color: #16a34a;\n    background: #dcfce7;\n    border: 1px solid #bbf7d0;\n  }\n  [data-theme=\"light\"] .sp-amber .py-sp-num {\n    color: #d97706;\n    background: #fef3c7;\n    border: 1px solid #fde68a;\n  }\n  [data-theme=\"light\"] .sp-purple .py-sp-num {\n    color: #7c3aed;\n    background: #f3e8ff;\n    border: 1px solid #ddd6fe;\n  }\n  [data-theme=\"light\"] .py-sp-tag {\n    background: #f8fafc;\n    border: 1px solid #e2e8f0;\n    color: #334155;\n    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);\n  }\n\n  /* Light Mode 05 AI Banner */\n  [data-theme=\"light\"] .py-sp-ai-banner {\n    background: linear-gradient(135deg, #faf5ff 0%, #f5f3ff 50%, #ffffff 100%);\n    border: 1px solid #d8b4fe;\n    box-shadow: 0 8px 24px -4px rgba(124, 58, 237, 0.08), inset 0 1px 0 #ffffff;\n  }\n  [data-theme=\"light\"] .py-sp-ai-banner:hover {\n    border-color: #c084fc;\n    box-shadow: 0 12px 28px -4px rgba(124, 58, 237, 0.14);\n  }\n  [data-theme=\"light\"] .py-sp-ai-icon {\n    background: linear-gradient(135deg, #9333ea 0%, #db2777 100%);\n    box-shadow: 0 4px 12px rgba(147, 51, 234, 0.25);\n    color: #ffffff;\n  }\n  [data-theme=\"light\"] .py-sp-ai-title {\n    color: #581c87 !important;\n  }\n  [data-theme=\"light\"] .py-sp-ai-pill {\n    background: #fdf2f8;\n    border: 1px solid #fbcfe8;\n    color: #be185d;\n  }\n  [data-theme=\"light\"] .py-sp-ai-text {\n    color: #334155 !important;\n  }\n  [data-theme=\"light\"] .py-sp-code-pill {\n    background: #ede9fe !important;\n    color: #6d28d9 !important;\n    border: 1px solid #c4b5fd !important;\n  }\n\n  /* Other Cards Light Mode Adaptations */\n  [data-theme=\"light\"] .py-infographic-card {\n    background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);\n    border: 1px solid #e2e8f0;\n    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.04), inset 0 1px 0 #ffffff;\n  }\n  [data-theme=\"light\"] .py-info-header {\n    border-bottom: 1px solid #e2e8f0;\n  }\n  [data-theme=\"light\"] .py-info-title {\n    color: #0284c7;\n  }\n  [data-theme=\"light\"] .py-badge-gold {\n    background: #fef3c7;\n    border-color: #fde68a;\n    color: #b45309;\n  }\n  [data-theme=\"light\"] .py-badge-green {\n    background: #dcfce7;\n    border-color: #bbf7d0;\n    color: #15803d;\n  }\n  [data-theme=\"light\"] .py-badge-purple {\n    background: #f3e8ff;\n    border-color: #ddd6fe;\n    color: #6d28d9;\n  }\n  [data-theme=\"light\"] .py-badge-rose {\n    background: #ffe4e6;\n    border-color: #fecdd3;\n    color: #e11d48;\n  }\n  [data-theme=\"light\"] .cpython-cell {\n    background: #ffffff;\n    border: 1px solid #e2e8f0;\n  }\n  [data-theme=\"light\"] .cpython-cell:hover {\n    background: #f0f9ff;\n    border-color: #38bdf8;\n  }\n  [data-theme=\"light\"] .cpython-cell-size { color: #0284c7; font-weight: 700; }\n  [data-theme=\"light\"] .cpython-cell-name {\n    color: #0f172a;\n  }\n  [data-theme=\"light\"] .cpython-cell-desc { color: #1e293b; font-weight: 500; }\n\n  /* Mutability & Memory Light Mode */\n  [data-theme=\"light\"] .py-mut-card.mut-green {\n    background: #f0fdf4;\n    border: 1px solid #86efac;\n  }\n  [data-theme=\"light\"] .py-mut-card.mut-rose {\n    background: #fff1f2;\n    border: 1px solid #fecdd3;\n  }\n  [data-theme=\"light\"] .py-mut-card p {\n    color: #334155 !important;\n  }\n  [data-theme=\"light\"] .py-mut-card .mut-ex { color: #1e293b !important; font-weight: 600; }\n  [data-theme=\"light\"] .py-mem-card {\n    background: #ffffff;\n    border: 1px solid #e2e8f0;\n    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02);\n  }\n  [data-theme=\"light\"] .py-mem-card .py-mem-desc { color: #1e293b !important; font-weight: 500; }\n  [data-theme=\"light\"] .py-code-box {\n    background: #f8fafc;\n    border: 1px solid #e2e8f0;\n    color: #0f172a;\n  }\n  [data-theme=\"light\"] .py-code-box .code-comment { color: #047857; font-weight: 600; font-style: italic; }\n\n  /* ══════════════════════════════════════════════════════════\n     MUTABILITY ARCHITECTURE SHOWCASE (LIGHT & DARK DUAL THEME)\n     ══════════════════════════════════════════════════════════ */\n  .py-mut-showcase {\n    background: linear-gradient(145deg, rgba(15, 23, 42, 0.96) 0%, rgba(10, 16, 31, 0.98) 100%);\n    border: 1px solid rgba(255, 255, 255, 0.08);\n    border-radius: 14px;\n    padding: 20px 22px;\n    margin: 16px 0;\n    box-shadow: 0 16px 40px -10px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.06);\n    transition: all 0.3s ease;\n  }\n  .py-mut-header {\n    margin-bottom: 18px;\n    padding-bottom: 14px;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.08);\n  }\n  .py-mut-title-row {\n    display: flex;\n    align-items: center;\n    gap: 14px;\n    flex-wrap: wrap;\n  }\n  .py-mut-header-icon {\n    width: 42px;\n    height: 42px;\n    border-radius: 12px;\n    background: linear-gradient(135deg, rgba(168, 85, 247, 0.18) 0%, rgba(99, 102, 241, 0.22) 100%);\n    border: 1px solid rgba(168, 85, 247, 0.35);\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-size: 1.25rem;\n    flex-shrink: 0;\n    box-shadow: 0 4px 14px rgba(168, 85, 247, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1);\n  }\n  .py-mut-title {\n    margin: 0;\n    font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;\n    font-size: 1.12rem;\n    font-weight: 800;\n    letter-spacing: -0.015em;\n    color: #f8fafc !important;\n    line-height: 1.3;\n  }\n  .py-mut-subtitle {\n    margin: 6px 0 0 56px;\n    font-size: 0.88rem;\n    color: #94a3b8 !important;\n    font-weight: 500;\n    letter-spacing: 0.01em;\n    line-height: 1.4;\n  }\n  @media (max-width: 640px) {\n    .py-mut-subtitle {\n      margin-left: 0;\n    }\n  }\n\n  /* Dual Comparison Columns Grid */\n  .py-mut-grid {\n    display: grid;\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n    gap: 14px;\n  }\n  @media (max-width: 768px) {\n    .py-mut-grid { grid-template-columns: 1fr; }\n  }\n\n  .py-mut-panel {\n    border-radius: 12px;\n    padding: 16px;\n    display: flex;\n    flex-direction: column;\n    justify-content: flex-start;\n    transition: all 0.25s ease;\n    position: relative;\n    overflow: hidden;\n  }\n  .py-mut-panel::before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    height: 3px;\n  }\n\n  /* Mutable (Green) */\n  .py-mut-panel.panel-mutable {\n    background: rgba(16, 185, 129, 0.04);\n    border: 1px solid rgba(16, 185, 129, 0.22);\n  }\n  .py-mut-panel.panel-mutable::before {\n    background: linear-gradient(90deg, #10b981 0%, #34d399 100%);\n  }\n  .py-mut-panel.panel-mutable:hover {\n    border-color: rgba(16, 185, 129, 0.45);\n    box-shadow: 0 10px 25px -5px rgba(16, 185, 129, 0.15);\n  }\n\n  /* Immutable (Rose) */\n  .py-mut-panel.panel-immutable {\n    background: rgba(244, 63, 94, 0.04);\n    border: 1px solid rgba(244, 63, 94, 0.22);\n  }\n  .py-mut-panel.panel-immutable::before {\n    background: linear-gradient(90deg, #f43f5e 0%, #fb7185 100%);\n  }\n  .py-mut-panel.panel-immutable:hover {\n    border-color: rgba(244, 63, 94, 0.45);\n    box-shadow: 0 10px 25px -5px rgba(244, 63, 94, 0.15);\n  }\n\n  /* Distinct Box for Headings */\n  .py-mut-header-box {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: 10px;\n    padding: 10px 14px;\n    border-radius: 10px;\n    margin-bottom: 12px;\n    min-height: 64px;\n    box-sizing: border-box;\n    transition: all 0.2s ease;\n  }\n  .mut-header-green {\n    background: rgba(16, 185, 129, 0.08);\n    border: 1px solid rgba(16, 185, 129, 0.28);\n    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);\n  }\n  .mut-header-rose {\n    background: rgba(244, 63, 94, 0.08);\n    border: 1px solid rgba(244, 63, 94, 0.28);\n    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);\n  }\n\n  [data-theme=\"light\"] .mut-header-green {\n    background: #f0fdf4;\n    border: 1px solid #86efac;\n    box-shadow: 0 1px 4px rgba(16, 185, 129, 0.08);\n  }\n  [data-theme=\"light\"] .mut-header-rose {\n    background: #fff1f2;\n    border: 1px solid #fecdd3;\n    box-shadow: 0 1px 4px rgba(244, 63, 94, 0.08);\n  }\n\n  .py-mut-panel-title-wrap {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n  }\n  .py-mut-panel-icon {\n    width: 36px;\n    height: 36px;\n    border-radius: 8px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    font-size: 1.15rem;\n    flex-shrink: 0;\n  }\n  .mut-header-green .py-mut-panel-icon {\n    background: rgba(16, 185, 129, 0.16);\n    border: 1px solid rgba(16, 185, 129, 0.32);\n  }\n  [data-theme=\"light\"] .mut-header-green .py-mut-panel-icon {\n    background: #ffffff;\n    border: 1px solid #86efac;\n    box-shadow: 0 1px 2px rgba(16, 185, 129, 0.1);\n  }\n  .mut-header-rose .py-mut-panel-icon {\n    background: rgba(244, 63, 94, 0.16);\n    border: 1px solid rgba(244, 63, 94, 0.32);\n  }\n  [data-theme=\"light\"] .mut-header-rose .py-mut-panel-icon {\n    background: #ffffff;\n    border: 1px solid #fecdd3;\n    box-shadow: 0 1px 2px rgba(244, 63, 94, 0.1);\n  }\n\n  .py-mut-panel-name {\n    margin: 0;\n    font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;\n    font-size: 0.98rem;\n    font-weight: 800;\n    letter-spacing: -0.01em;\n  }\n  .mut-header-green .py-mut-panel-name { color: #4ade80 !important; }\n  [data-theme=\"light\"] .mut-header-green .py-mut-panel-name { color: #15803d !important; }\n  .mut-header-rose .py-mut-panel-name { color: #fb7185 !important; }\n  [data-theme=\"light\"] .mut-header-rose .py-mut-panel-name { color: #be123c !important; }\n\n  .py-mut-panel-sub {\n    display: block;\n    font-size: 0.68rem;\n    font-weight: 500;\n    color: #94a3b8;\n    white-space: nowrap;\n  }\n  [data-theme=\"light\"] .py-mut-panel-sub { display: block; font-size: 0.68rem; font-weight: 700; color: #1e293b; white-space: nowrap; }\n\n  /* Vertical Stacked Pill: \"Cannot\" / \"Change\" */\n  .py-mut-status-pill {\n    display: inline-flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    text-align: center;\n    line-height: 1.15;\n    font-family: 'JetBrains Mono', monospace;\n    font-size: 0.62rem;\n    font-weight: 800;\n    padding: 4px 8px;\n    border-radius: 6px;\n    white-space: nowrap;\n    flex-shrink: 0;\n    letter-spacing: 0.03em;\n    text-transform: uppercase;\n  }\n  .py-mut-status-pill span {\n    display: block;\n    line-height: 1.15;\n  }\n  .pill-mutable {\n    background: rgba(16, 185, 129, 0.18);\n    border: 1px solid rgba(16, 185, 129, 0.38);\n    color: #34d399;\n  }\n  [data-theme=\"light\"] .pill-mutable {\n    background: #dcfce7;\n    border: 1px solid #86efac;\n    color: #15803d;\n    box-shadow: 0 1px 2px rgba(16, 185, 129, 0.1);\n  }\n  .pill-immutable {\n    background: rgba(244, 63, 94, 0.18);\n    border: 1px solid rgba(244, 63, 94, 0.38);\n    color: #fb7185;\n  }\n  [data-theme=\"light\"] .pill-immutable {\n    background: #ffe4e6;\n    border: 1px solid #fecdd3;\n    color: #be123c;\n    box-shadow: 0 1px 2px rgba(244, 63, 94, 0.1);\n  }\n\n  .py-mut-desc {\n    font-size: 0.78rem;\n    line-height: 1.55;\n    color: #cbd5e1 !important;\n    margin: 0 0 12px 0;\n    min-height: 72px;\n    box-sizing: border-box;\n  }\n\n  .py-mut-types-row {\n    display: flex;\n    align-items: center;\n    gap: 6px;\n    margin-bottom: 12px;\n    min-height: 30px;\n    box-sizing: border-box;\n    flex-wrap: wrap;\n  }\n  .py-mut-types-label {\n    font-size: 0.70rem;\n    color: #94a3b8;\n    font-weight: 600;\n    text-transform: uppercase;\n    letter-spacing: 0.04em;\n  }\n  .py-mut-type-tag {\n    font-family: 'JetBrains Mono', monospace;\n    font-size: 0.70rem;\n    font-weight: 700;\n    padding: 1px 7px;\n    border-radius: 4px;\n  }\n  .panel-mutable .py-mut-type-tag {\n    background: rgba(16, 185, 129, 0.15);\n    border: 1px solid rgba(16, 185, 129, 0.3);\n    color: #6ee7b7;\n  }\n  .panel-immutable .py-mut-type-tag {\n    background: rgba(244, 63, 94, 0.15);\n    border: 1px solid rgba(244, 63, 94, 0.3);\n    color: #fca5a5;\n  }\n\n  /* Sleek Visual Code Card Inside Panel */\n  .py-mut-code-wrap {\n    background: rgba(0, 0, 0, 0.45);\n    border: 1px solid rgba(255, 255, 255, 0.08);\n    border-radius: 8px;\n    overflow: hidden;\n    min-height: 122px;\n    box-sizing: border-box;\n    display: flex;\n    flex-direction: column;\n    justify-content: space-between;\n    margin-bottom: 10px;\n  }\n  .py-mut-code-topbar {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    padding: 6px 10px;\n    background: rgba(255, 255, 255, 0.03);\n    border-bottom: 1px solid rgba(255, 255, 255, 0.06);\n    font-family: 'JetBrains Mono', monospace;\n    font-size: 0.68rem;\n  }\n  .panel-mutable .py-mut-code-topbar { color: #34d399; }\n  .panel-immutable .py-mut-code-topbar { color: #fb7185; }\n\n  .py-mut-code-wrap pre {\n    margin: 0;\n    padding: 10px 12px;\n    font-family: 'JetBrains Mono', monospace;\n    font-size: 0.74rem;\n    color: #f8fafc;\n    line-height: 1.6;\n    overflow-x: auto;\n  }\n\n  .py-mut-takeaway {\n    margin-top: 0;\n    font-size: 0.72rem;\n    padding: 8px 12px;\n    border-radius: 6px;\n    line-height: 1.45;\n    min-height: 60px;\n    box-sizing: border-box;\n    display: flex;\n    align-items: center;\n  }\n  .panel-mutable .py-mut-takeaway {\n    margin-top: 0;\n    font-size: 0.72rem;\n    padding: 8px 12px;\n    border-radius: 6px;\n    line-height: 1.45;\n    min-height: 60px;\n    box-sizing: border-box;\n    display: flex;\n    align-items: center;\n  }\n  .panel-immutable .py-mut-takeaway {\n    margin-top: 0;\n    font-size: 0.72rem;\n    padding: 8px 12px;\n    border-radius: 6px;\n    line-height: 1.45;\n    min-height: 60px;\n    box-sizing: border-box;\n    display: flex;\n    align-items: center;\n  }\n\n  /* ══════════════════════════════════════════════════════════\n     LIGHT MODE OVERRIDES FOR MUTABILITY SHOWCASE\n     ══════════════════════════════════════════════════════════ */\n  [data-theme=\"light\"] .py-mut-showcase {\n    background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);\n    border: 1px solid #e2e8f0;\n    box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.05), inset 0 1px 0 #ffffff;\n  }\n  [data-theme=\"light\"] .py-mut-header {\n    border-bottom: 1.5px solid #e2e8f0;\n    padding-bottom: 14px;\n    margin-bottom: 18px;\n  }\n  [data-theme=\"light\"] .py-mut-header-icon {\n    background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%);\n    border: 1.5px solid #c084fc;\n    box-shadow: 0 4px 14px rgba(168, 85, 247, 0.15);\n    width: 44px;\n    height: 44px;\n    border-radius: 12px;\n  }\n  [data-theme=\"light\"] .py-mut-title {\n    color: #0f172a !important;\n    font-size: 1.25rem !important;\n    font-weight: 800 !important;\n    letter-spacing: -0.02em !important;\n  }\n  [data-theme=\"light\"] .py-mut-subtitle {\n    color: #334155 !important;\n    font-size: 0.88rem !important;\n    font-weight: 500 !important;\n  }\n\n  /* Light Mode Panels */\n  [data-theme=\"light\"] .py-mut-panel.panel-mutable {\n    background: #ffffff;\n    border: 1px solid #d1fae5;\n    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);\n  }\n  [data-theme=\"light\"] .py-mut-panel.panel-mutable:hover {\n    border-color: #86efac;\n    box-shadow: 0 8px 20px -4px rgba(16, 185, 129, 0.12);\n  }\n  [data-theme=\"light\"] .panel-mutable .py-mut-panel-title {\n    color: #15803d !important;\n  }\n  [data-theme=\"light\"] .panel-mutable .py-mut-meta-pill {\n    background: #dcfce7;\n    color: #166534;\n    border: 1px solid #86efac;\n  }\n  [data-theme=\"light\"] .panel-mutable .py-mut-type-tag {\n    background: #dcfce7;\n    border: 1px solid #86efac;\n    color: #15803d;\n  }\n  [data-theme=\"light\"] .panel-mutable .py-mut-takeaway {\n    margin-top: 0;\n    font-size: 0.72rem;\n    padding: 8px 12px;\n    border-radius: 6px;\n    line-height: 1.45;\n    min-height: 60px;\n    box-sizing: border-box;\n    display: flex;\n    align-items: center;\n  }\n\n  [data-theme=\"light\"] .py-mut-panel.panel-immutable {\n    background: #ffffff;\n    border: 1px solid #ffe4e6;\n    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);\n  }\n  [data-theme=\"light\"] .py-mut-panel.panel-immutable:hover {\n    border-color: #fda4af;\n    box-shadow: 0 8px 20px -4px rgba(244, 63, 94, 0.12);\n  }\n  [data-theme=\"light\"] .panel-immutable .py-mut-panel-title {\n    color: #be123c !important;\n  }\n  [data-theme=\"light\"] .panel-immutable .py-mut-meta-pill {\n    background: #ffe4e6;\n    color: #9f1239;\n    border: 1px solid #fecdd3;\n  }\n  [data-theme=\"light\"] .panel-immutable .py-mut-type-tag {\n    background: #ffe4e6;\n    border: 1px solid #fecdd3;\n    color: #be123c;\n  }\n  [data-theme=\"light\"] .panel-immutable .py-mut-takeaway {\n    margin-top: 0;\n    font-size: 0.72rem;\n    padding: 8px 12px;\n    border-radius: 6px;\n    line-height: 1.45;\n    min-height: 60px;\n    box-sizing: border-box;\n    display: flex;\n    align-items: center;\n  }\n\n  [data-theme=\"light\"] .py-mut-desc {\n    font-size: 0.78rem;\n    line-height: 1.55;\n    color: #1e293b !important;\n    margin: 0 0 12px 0;\n    min-height: 72px;\n    box-sizing: border-box;\n    font-weight: 500;\n  }\n  [data-theme=\"light\"] .py-mut-analogy-badge { color: #1e293b !important; font-weight: 700; }\n  [data-theme=\"light\"] .py-mut-types-label { color: #0f172a !important; font-weight: 800; }\n\n  [data-theme=\"light\"] .py-mut-code-wrap {\n    background: #f8fafc !important;\n    border: 1.5px solid #cbd5e1 !important;\n    border-radius: 8px;\n    overflow: hidden;\n    min-height: 122px;\n    box-sizing: border-box;\n    display: flex;\n    flex-direction: column;\n    justify-content: space-between;\n    margin-bottom: 10px;\n  }\n  [data-theme=\"light\"] .py-mut-code-topbar {\n    background: #f8fafc;\n    border-bottom: 1px solid #e2e8f0;\n  }\n  [data-theme=\"light\"] .panel-mutable .py-mut-code-topbar { color: #15803d; }\n  [data-theme=\"light\"] .panel-immutable .py-mut-code-topbar { color: #be123c; }\n  [data-theme=\"light\"] .py-mut-code-wrap pre {\n    color: #0f172a;\n  }\n  [data-theme=\"light\"] .py-mut-code-wrap pre .code-comment { color: #047857 !important; font-weight: 600 !important; font-style: italic !important; }\n\n\n  /* ══════════════════════════════════════════════════════════\n     ANTI-SQUEEZE & RESPONSIVE SPLIT-PANE STYLING\n     ══════════════════════════════════════════════════════════ */\n  /* Prevent table squeezing and word splitting */\n  .db-mock-table-wrap {\n    width: 100% !important;\n    overflow-x: auto !important;\n    -webkit-overflow-scrolling: touch;\n    margin: 14px 0;\n    border-radius: 10px;\n  }\n  .db-mock-table-wrap .db-table-mock {\n    min-width: 650px !important;\n    width: 100%;\n    border-collapse: collapse;\n  }\n  .db-mock-table-wrap .db-table-mock th,\n  .db-mock-table-wrap .db-table-mock td {\n    padding: 8px 12px !important;\n    vertical-align: middle;\n  }\n  /* Code & Syntax pills NEVER break into multiple lines when squeezed */\n  .db-mock-table-wrap code,\n  .db-mock-table-wrap .db-table-mock code {\n    white-space: nowrap !important;\n    display: inline-block !important;\n    word-break: normal !important;\n    overflow-wrap: normal !important;\n    hyphens: none !important;\n  }\n  /* Prevent Category, Type, Keyword, Syntax, and Mutability columns from line-breaking */\n  .db-mock-table-wrap .db-table-mock th:nth-child(1),\n  .db-mock-table-wrap .db-table-mock td:nth-child(1),\n  .db-mock-table-wrap .db-table-mock th:nth-child(2),\n  .db-mock-table-wrap .db-table-mock td:nth-child(2),\n  .db-mock-table-wrap .db-table-mock th:nth-child(3),\n  .db-mock-table-wrap .db-table-mock td:nth-child(3),\n  .db-mock-table-wrap .db-table-mock th:nth-child(4),\n  .db-mock-table-wrap .db-table-mock td:nth-child(4),\n  .db-mock-table-wrap .db-table-mock th:nth-child(6),\n  .db-mock-table-wrap .db-table-mock td:nth-child(6) {\n    white-space: nowrap !important;\n  }\n  /* Description column wraps naturally with legible line height */\n  .db-mock-table-wrap .db-table-mock td:nth-child(5) {\n    white-space: normal !important;\n    min-width: 180px;\n    line-height: 1.45;\n  }\n  .db-mock-table-wrap .py-badge {\n    white-space: nowrap !important;\n    display: inline-block;\n  }\n\n  /* ══════════════════════════════════════════════════════════\n     TOOL MATRIX: FLAGSHIP COMPARISON SHOWCASE\n     ══════════════════════════════════════════════════════════ */\n  .py-matrix-showcase {\n    background: linear-gradient(145deg, #0d1527 0%, #080d1a 100%);\n    border: 1px solid rgba(56, 189, 248, 0.22);\n    border-radius: 12px;\n    padding: 16px;\n    margin: 16px 0;\n    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);\n    position: relative;\n    overflow: hidden;\n  }\n  .py-matrix-header {\n    margin-bottom: 18px;\n    padding-bottom: 14px;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.08);\n  }\n  .py-matrix-title-row {\n    display: flex;\n    align-items: center;\n    gap: 14px;\n    flex-wrap: wrap;\n  }\n  .py-matrix-header-icon {\n    font-size: 1.25rem;\n    line-height: 1;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    width: 42px;\n    height: 42px;\n    border-radius: 12px;\n    background: linear-gradient(135deg, rgba(16, 185, 129, 0.16) 0%, rgba(56, 189, 248, 0.22) 100%);\n    border: 1px solid rgba(56, 189, 248, 0.35);\n    flex-shrink: 0;\n    box-shadow: 0 4px 14px rgba(56, 189, 248, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.1);\n  }\n  .py-matrix-header-text {\n    display: flex;\n    flex-direction: column;\n    gap: 2px;\n    flex: 1;\n  }\n  .py-matrix-title-row {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n    flex-wrap: wrap;\n  }\n  .py-matrix-title {\n    margin: 0;\n    font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;\n    font-size: 1.12rem;\n    font-weight: 800;\n    letter-spacing: -0.015em;\n    color: #f8fafc;\n    line-height: 1.3;\n  }\n  .py-matrix-subtitle {\n    margin: 3px 0 0 0;\n    font-size: 0.82rem;\n    color: #94a3b8;\n    font-weight: 500;\n    letter-spacing: 0.01em;\n    line-height: 1.4;\n  }\n\n  /* Matrix Table Container */\n  .py-matrix-table-wrap {\n    width: 100%;\n    overflow-x: auto;\n    -webkit-overflow-scrolling: touch;\n    border-radius: 8px;\n    border: 1px solid rgba(255, 255, 255, 0.08);\n    background: rgba(11, 17, 32, 0.6);\n  }\n  .py-matrix-table {\n    width: 100%;\n    border-collapse: separate;\n    border-spacing: 0;\n    min-width: 620px;\n    font-family: inherit;\n  }\n  .py-matrix-table th {\n    background: #0f172a;\n    color: #94a3b8;\n    font-size: 0.72rem;\n    font-weight: 700;\n    text-transform: uppercase;\n    letter-spacing: 0.06em;\n    padding: 10px 14px;\n    text-align: left;\n    border-bottom: 2px solid rgba(255, 255, 255, 0.1);\n    white-space: nowrap;\n  }\n  .py-matrix-table td {\n    padding: 12px 14px;\n    font-size: 0.82rem;\n    line-height: 1.45;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.06);\n    color: #e2e8f0;\n    vertical-align: middle;\n  }\n  .py-matrix-table tr:last-child td {\n    border-bottom: none;\n  }\n  .py-matrix-table tbody tr {\n    transition: background-color 0.2s ease;\n  }\n  .py-matrix-table tbody tr:hover {\n    background: rgba(255, 255, 255, 0.03);\n  }\n\n  /* Tool Identity Pills */\n  .py-tool-pill {\n    display: inline-flex;\n    align-items: center;\n    gap: 8px;\n    padding: 6px 12px;\n    border-radius: 8px;\n    font-weight: 700;\n    font-size: 0.84rem;\n    letter-spacing: -0.01em;\n    white-space: nowrap;\n  }\n  .py-tool-pill.tool-sql {\n    background: rgba(56, 189, 248, 0.12);\n    color: #38bdf8;\n    border: 1px solid rgba(56, 189, 248, 0.3);\n  }\n  .py-tool-pill.tool-excel {\n    background: rgba(34, 197, 94, 0.12);\n    color: #4ade80;\n    border: 1px solid rgba(34, 197, 94, 0.3);\n  }\n  .py-tool-pill.tool-python {\n    background: rgba(245, 158, 11, 0.15);\n    color: #fbbf24;\n    border: 1px solid rgba(245, 158, 11, 0.38);\n    box-shadow: 0 0 10px rgba(245, 158, 11, 0.12);\n  }\n  .py-tool-flag {\n    font-size: 0.65rem;\n    font-weight: 800;\n    padding: 1px 5px;\n    border-radius: 4px;\n    background: #fbbf24;\n    color: #0b1120;\n    text-transform: uppercase;\n    letter-spacing: 0.04em;\n    margin-left: 2px;\n  }\n  .py-matrix-highlight-row {\n    background: rgba(245, 158, 11, 0.04) !important;\n  }\n  .py-matrix-highlight-row:hover {\n    background: rgba(245, 158, 11, 0.08) !important;\n  }\n\n  /* Role & Advantage Content */\n  .py-matrix-role {\n    font-weight: 500;\n    color: #cbd5e1;\n  }\n  .py-matrix-adv {\n    color: #e2e8f0;\n  }\n\n  /* Capacity / Limits Badges */\n  .py-matrix-limit {\n    display: inline-flex;\n    align-items: center;\n    gap: 5px;\n    padding: 4px 10px;\n    border-radius: 6px;\n    font-size: 0.74rem;\n    font-weight: 600;\n    white-space: nowrap;\n  }\n  .py-matrix-limit.limit-massive {\n    background: rgba(56, 189, 248, 0.1);\n    color: #38bdf8;\n    border: 1px solid rgba(56, 189, 248, 0.25);\n  }\n  .py-matrix-limit.limit-small {\n    background: rgba(244, 63, 94, 0.1);\n    color: #fb7185;\n    border: 1px solid rgba(244, 63, 94, 0.25);\n  }\n  .py-matrix-limit.limit-large {\n    background: rgba(168, 85, 247, 0.12);\n    color: #c084fc;\n    border: 1px solid rgba(168, 85, 247, 0.28);\n  }\n\n  /* ══════ LIGHT MODE THEME ADAPTATION ══════ */\n  [data-theme=\"light\"] .py-matrix-showcase {\n    background: #ffffff;\n    border: 1px solid #e2e8f0;\n    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);\n  }\n  [data-theme=\"light\"] .py-matrix-header {\n    border-bottom: 1.5px solid #e2e8f0;\n    padding-bottom: 14px;\n    margin-bottom: 18px;\n  }\n  [data-theme=\"light\"] .py-matrix-header-icon {\n    background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);\n    border: 1.5px solid #34d399;\n    box-shadow: 0 4px 14px rgba(16, 185, 129, 0.15);\n    width: 44px;\n    height: 44px;\n    border-radius: 12px;\n  }\n  [data-theme=\"light\"] .py-matrix-title {\n    color: #0f172a !important;\n    font-size: 1.25rem !important;\n    font-weight: 800 !important;\n    letter-spacing: -0.02em !important;\n  }\n  [data-theme=\"light\"] .py-matrix-subtitle {\n    color: #334155 !important;\n    font-size: 0.88rem !important;\n    font-weight: 500 !important;\n  }\n  [data-theme=\"light\"] .py-matrix-table-wrap {\n    border-color: #e2e8f0;\n    background: #ffffff;\n  }\n  [data-theme=\"light\"] .py-matrix-table th { background: #f1f5f9; color: #0f172a; font-weight: 800; border-bottom: 2px solid #cbd5e1; }\n  [data-theme=\"light\"] .py-matrix-table td {\n    color: #334155;\n    border-bottom: 1px solid #f1f5f9;\n  }\n  [data-theme=\"light\"] .py-matrix-table tbody tr:hover {\n    background: #f8fafc;\n  }\n  [data-theme=\"light\"] .py-tool-pill.tool-sql {\n    background: #e0f2fe;\n    color: #0369a1;\n    border-color: #bae6fd;\n  }\n  [data-theme=\"light\"] .py-tool-pill.tool-excel {\n    background: #dcfce7;\n    color: #15803d;\n    border-color: #bbf7d0;\n  }\n  [data-theme=\"light\"] .py-tool-pill.tool-python {\n    background: #fef3c7;\n    color: #b45309;\n    border-color: #fde68a;\n    box-shadow: 0 0 10px rgba(245, 158, 11, 0.1);\n  }\n  [data-theme=\"light\"] .py-tool-flag {\n    background: #d97706;\n    color: #ffffff;\n  }\n  [data-theme=\"light\"] .py-matrix-highlight-row {\n    background: #fffbeb !important;\n  }\n  [data-theme=\"light\"] .py-matrix-highlight-row:hover {\n    background: #fef3c7 !important;\n  }\n  [data-theme=\"light\"] .py-matrix-role { color: #0f172a; font-weight: 700; }\n  [data-theme=\"light\"] .py-matrix-adv {\n    color: #1e293b;\n  }\n  [data-theme=\"light\"] .py-matrix-limit.limit-massive {\n    background: #e0f2fe;\n    color: #0369a1;\n    border-color: #bae6fd;\n  }\n  [data-theme=\"light\"] .py-matrix-limit.limit-small {\n    background: #ffe4e6;\n    color: #e11d48;\n    border-color: #fecdd3;\n  }\n  [data-theme=\"light\"] .py-matrix-limit.limit-large {\n    background: #f3e8ff;\n    color: #7e22ce;\n    border-color: #e9d5ff;\n  }\n\n  /* Flexible auto-fit for cards when theory pane is squeezed by split-resizer */\n  .py-sp-grid {\n    display: grid;\n    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)) !important;\n    gap: 12px;\n  }\n  .py-mut-grid {\n    display: grid;\n    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)) !important;\n    gap: 14px;\n  }\n\n  /* ══════════════════════════════════════════════════════════\n     FROZEN (STICKY) COLUMNS FOR MASTER REFERENCE TABLE\n     ══════════════════════════════════════════════════════════ */\n  .slide-card,\n  .slide-content,\n  #slideBodyText,\n  .slide-section {\n    overflow-x: clip !important;\n    max-width: 100% !important;\n    box-sizing: border-box !important;\n  }\n\n  .db-mock-table-wrap {\n    width: 100% !important;\n    max-width: 100% !important;\n    overflow-x: auto !important;\n    overflow-y: hidden !important;\n    overscroll-behavior-x: contain !important;\n    overscroll-behavior-y: auto !important;\n    -webkit-overflow-scrolling: touch !important;\n    position: relative !important;\n    display: block !important;\n    border-radius: 10px !important;\n    border: 1px solid rgba(255, 255, 255, 0.1) !important;\n    background: #0c0e14 !important;\n    box-sizing: border-box !important;\n  }\n\n  /* Fixed table layout for mathematical pixel alignment */\n  .db-mock-table-wrap .db-table-mock.py-master-ref-table {\n    table-layout: fixed !important;\n    overflow: visible !important;\n    border-radius: 0 !important;\n    border-collapse: separate !important;\n    border-spacing: 0 !important;\n    width: 780px !important;\n    min-width: 780px !important;\n    max-width: 780px !important;\n    background: #0c0e14 !important;\n    margin: 0 !important;\n  }\n\n  /* Explicit column widths for fixed table layout */\n  .py-master-ref-table th:nth-child(1),\n  .py-master-ref-table td:nth-child(1) {\n    width: 110px !important;\n    min-width: 110px !important;\n    max-width: 110px !important;\n    box-sizing: border-box !important;\n  }\n  .py-master-ref-table th:nth-child(2),\n  .py-master-ref-table td:nth-child(2) {\n    width: 110px !important;\n    min-width: 110px !important;\n    max-width: 110px !important;\n    box-sizing: border-box !important;\n  }\n  .py-master-ref-table th:nth-child(3),\n  .py-master-ref-table td:nth-child(3) {\n    width: 95px !important;\n    min-width: 95px !important;\n    max-width: 95px !important;\n    box-sizing: border-box !important;\n  }\n  .py-master-ref-table th:nth-child(4),\n  .py-master-ref-table td:nth-child(4) {\n    width: 155px !important;\n    min-width: 155px !important;\n    max-width: 155px !important;\n    box-sizing: border-box !important;\n  }\n  .py-master-ref-table th:nth-child(5),\n  .py-master-ref-table td:nth-child(5) {\n    width: 195px !important;\n    min-width: 195px !important;\n    max-width: 195px !important;\n    box-sizing: border-box !important;\n  }\n  .py-master-ref-table th:nth-child(6),\n  .py-master-ref-table td:nth-child(6) {\n    width: 115px !important;\n    min-width: 115px !important;\n    max-width: 115px !important;\n    box-sizing: border-box !important;\n  }\n\n  /* Prevent child elements in non-sticky cells from creating higher stacking contexts */\n  .py-master-ref-table code,\n  .py-master-ref-table .py-badge {\n    position: static !important;\n    z-index: 0 !important;\n  }\n\n  /* Non-sticky cells: solid background & lower z-index so they slide cleanly behind */\n  .py-master-ref-table th:nth-child(n+3),\n  .py-master-ref-table td:nth-child(n+3) {\n    position: relative !important;\n    z-index: 1 !important;\n    background: #0c0e14 !important;\n  }\n\n  /* Column 1: Category (Sticky at Left 0) */\n  .py-master-ref-table th:nth-child(1),\n  .py-master-ref-table td:nth-child(1) {\n    position: -webkit-sticky !important;\n    position: sticky !important;\n    left: 0 !important;\n    z-index: 20 !important;\n    white-space: nowrap !important;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;\n    background: #0f1422 !important;\n  }\n\n  /* Column 2: Data Type (Sticky at Left 110px) */\n  .py-master-ref-table th:nth-child(2),\n  .py-master-ref-table td:nth-child(2) {\n    position: -webkit-sticky !important;\n    position: sticky !important;\n    left: 110px !important;\n    z-index: 20 !important;\n    white-space: nowrap !important;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;\n    border-right: 2px solid rgba(56, 189, 248, 0.45) !important;\n    box-shadow: 6px 0 16px rgba(0, 0, 0, 0.65) !important;\n    background: #0f1422 !important;\n  }\n\n  /* Sticky headers (z-index: 25) */\n  .py-master-ref-table th:nth-child(1),\n  .py-master-ref-table th:nth-child(2) {\n    z-index: 25 !important;\n    background: #141b2d !important;\n    border-bottom: 2px solid rgba(255, 255, 255, 0.15) !important;\n  }\n\n  /* Row Hover Highlighting */\n  .py-master-ref-table tbody tr:hover td:nth-child(1),\n  .py-master-ref-table tbody tr:hover td:nth-child(2) {\n    background: #182238 !important;\n  }\n  .py-master-ref-table tbody tr:hover td:nth-child(n+3) {\n    background: #121622 !important;\n  }\n\n  /* ══════ LIGHT MODE THEME ADAPTATION ══════ */\n  [data-theme=\"light\"] .db-mock-table-wrap {\n    border: 1px solid #e2e8f0 !important;\n    background: #ffffff !important;\n  }\n  [data-theme=\"light\"] .db-mock-table-wrap .db-table-mock.py-master-ref-table {\n    background: #ffffff !important;\n  }\n  [data-theme=\"light\"] .py-master-ref-table th:nth-child(n+3),\n  [data-theme=\"light\"] .py-master-ref-table td:nth-child(n+3) {\n    background: #ffffff !important;\n  }\n  [data-theme=\"light\"] .py-master-ref-table th:nth-child(1),\n  [data-theme=\"light\"] .py-master-ref-table th:nth-child(2) {\n    background: #f1f5f9 !important;\n    color: #0f172a !important;\n    font-weight: 900 !important;\n    border-bottom: 2px solid #cbd5e1 !important;\n  }\n  [data-theme=\"light\"] .py-master-ref-table td:nth-child(1),\n  [data-theme=\"light\"] .py-master-ref-table td:nth-child(2) {\n    background: #ffffff !important;\n    color: #0f172a !important;\n    font-weight: 800 !important;\n    border-bottom: 1px solid #e2e8f0 !important;\n  }\n  [data-theme=\"light\"] .py-master-ref-table th:nth-child(2),\n  [data-theme=\"light\"] .py-master-ref-table td:nth-child(2) {\n    border-right: 2px solid #cbd5e1 !important;\n    box-shadow: 6px 0 14px rgba(0, 0, 0, 0.08) !important;\n  }\n  [data-theme=\"light\"] .py-master-ref-table tbody tr:hover td:nth-child(1),\n  [data-theme=\"light\"] .py-master-ref-table tbody tr:hover td:nth-child(2) {\n    background: #f8fafc !important;\n  }\n  [data-theme=\"light\"] .py-master-ref-table tbody tr:hover td:nth-child(n+3) {\n    background: #f1f5f9 !important;\n  }\n\n  /* ══════════════════════════════════════════════════════════\n     HOW PYTHON MANAGES MEMORY (UNDER THE HOOD) — VERTICAL FLOWCHART\n     ACADEMIC TEXTBOOK COLOR SCIENCE ARCHITECTURE (LIGHT & DARK THEMES)\n     ══════════════════════════════════════════════════════════ */\n  .py-vfc-canvas {\n    background: #090e1c;\n    background-image: radial-gradient(circle, rgba(99, 102, 241, 0.16) 1.2px, transparent 1.2px);\n    background-size: 20px 20px;\n    border: 1.5px solid rgba(99, 102, 241, 0.3);\n    border-radius: 18px;\n    padding: 28px 24px;\n    margin: 24px 0 16px 0;\n    box-shadow: 0 16px 44px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.05);\n    position: relative;\n    overflow: hidden;\n  }\n\n  /* Flowchart Header */\n  .py-vfc-header {\n    text-align: center;\n    margin-bottom: 24px;\n    padding-bottom: 20px;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.08);\n    position: relative;\n  }\n  .py-vfc-title-wrap {\n    display: inline-flex;\n    align-items: center;\n    gap: 12px;\n    margin-bottom: 6px;\n  }\n  .py-vfc-logo {\n    width: 36px;\n    height: 36px;\n    filter: drop-shadow(0 0 12px rgba(56, 189, 248, 0.45));\n  }\n  .py-vfc-main-title {\n    margin: 0;\n    font-size: 1.45rem;\n    font-weight: 900;\n    letter-spacing: -0.02em;\n    color: #f8fafc;\n    text-transform: uppercase;\n  }\n  .py-vfc-sub-title {\n    margin: 0 0 14px 0;\n    font-size: 0.88rem;\n    font-weight: 700;\n    color: #38bdf8;\n    letter-spacing: 0.06em;\n    text-transform: uppercase;\n  }\n\n  /* Header Meta: Breadcrumb + Sticky Note */\n  .py-vfc-header-meta {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: 16px;\n    flex-wrap: wrap;\n    margin-top: 12px;\n  }\n  .py-vfc-pipeline-stepper,\n  .py-vfc-breadcrumb {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    gap: 8px;\n    padding: 6px 12px;\n    background: rgba(15, 23, 42, 0.85);\n    border: 1px solid rgba(255, 255, 255, 0.08);\n    border-radius: 12px;\n    box-shadow: 0 8px 24px -4px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.05);\n    max-width: 100%;\n    overflow-x: auto;\n    scrollbar-width: none;\n    -webkit-overflow-scrolling: touch;\n  }\n  .py-vfc-pipeline-stepper::-webkit-scrollbar,\n  .py-vfc-breadcrumb::-webkit-scrollbar {\n    display: none;\n  }\n  .py-vfc-step {\n    display: inline-flex;\n    align-items: center;\n    gap: 8px;\n    padding: 6px 12px;\n    border-radius: 8px;\n    background: rgba(255, 255, 255, 0.03);\n    border: 1px solid rgba(255, 255, 255, 0.06);\n    font-size: 0.78rem;\n    font-weight: 700;\n    color: #cbd5e1;\n    white-space: nowrap;\n    transition: all 0.2s ease;\n  }\n  .py-vfc-step:hover {\n    background: rgba(255, 255, 255, 0.06);\n    border-color: rgba(255, 255, 255, 0.12);\n  }\n  .py-vfc-step-idx {\n    font-family: 'JetBrains Mono', monospace;\n    font-size: 0.68rem;\n    font-weight: 800;\n    padding: 1px 5px;\n    border-radius: 4px;\n    background: rgba(99, 102, 241, 0.18);\n    border: 1px solid rgba(99, 102, 241, 0.3);\n    color: #818cf8;\n    line-height: 1.2;\n  }\n  .py-vfc-step-arrow {\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    color: #6366f1;\n    opacity: 0.8;\n    flex-shrink: 0;\n  }\n  .py-vfc-step-arrow svg {\n    display: block;\n  }\n  .py-vfc-step.step-active {\n    background: linear-gradient(135deg, rgba(56, 189, 248, 0.16) 0%, rgba(99, 102, 241, 0.2) 100%);\n    border: 1px solid rgba(56, 189, 248, 0.45);\n    color: #38bdf8;\n    box-shadow: 0 2px 10px rgba(56, 189, 248, 0.15);\n  }\n  .py-vfc-step.step-active .py-vfc-step-idx {\n    background: rgba(56, 189, 248, 0.2);\n    border-color: rgba(56, 189, 248, 0.45);\n    color: #38bdf8;\n  }\n  .py-vfc-breadcrumb-sep {\n    color: #818cf8;\n    font-weight: 900;\n  }\n  .py-vfc-breadcrumb span.highlight {\n    color: #38bdf8;\n    font-weight: 800;\n  }\n  \n  \n\n  /* ══════ VERTICAL FLOWCHART PIPELINE & CONNECTORS ══════ */\n  .py-vfc-pipeline {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    max-width: 780px;\n    margin: 0 auto;\n    width: 100%;\n  }\n\n  /* Vertical Flow Connector with Stem and Arrow Badge */\n  .py-vfc-connector {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n    margin: -1px 0;\n    position: relative;\n    z-index: 1;\n  }\n  .py-vfc-stem {\n    width: 2px;\n    height: 14px;\n    background: linear-gradient(180deg, rgba(99, 102, 241, 0.7), rgba(56, 189, 248, 0.85));\n  }\n  .py-vfc-arrow-badge {\n    width: 32px;\n    height: 32px;\n    border-radius: 50%;\n    background: #0d1527;\n    border: 1.5px solid #38bdf8;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    box-shadow: 0 0 14px rgba(56, 189, 248, 0.35);\n    transition: transform 0.2s ease, box-shadow 0.2s ease;\n  }\n  .py-vfc-arrow-badge:hover {\n    transform: scale(1.1);\n    box-shadow: 0 0 20px rgba(56, 189, 248, 0.6);\n  }\n  .py-vfc-arrow-badge svg {\n    filter: drop-shadow(0 0 4px rgba(56, 189, 248, 0.6));\n  }\n\n  /* Base Vertical Flowchart Node */\n  .py-vfc-node {\n    width: 100%;\n    box-sizing: border-box;\n    background: #0d1527;\n    border: 1.5px solid rgba(255, 255, 255, 0.1);\n    border-radius: 14px;\n    padding: 16px 18px;\n    box-shadow: 0 6px 22px rgba(0, 0, 0, 0.38);\n    transition: border-color 0.2s ease, box-shadow 0.2s ease;\n    position: relative;\n    z-index: 2;\n  }\n  .py-vfc-node:hover {\n    box-shadow: 0 10px 28px rgba(99, 102, 241, 0.22);\n  }\n\n  /* Distinct Accent Borders per Node */\n  .vnode-code { border-color: rgba(99, 102, 241, 0.5); }\n  .vnode-objects { border-color: rgba(168, 85, 247, 0.5); }\n  .vnode-ram { border-color: rgba(34, 197, 94, 0.55); }\n  .vnode-pointers { border-color: rgba(56, 189, 248, 0.55); }\n  .vnode-reuse { border-color: rgba(56, 189, 248, 0.45); }\n  .vnode-mutable { border-color: rgba(34, 197, 94, 0.45); }\n  .vnode-immutable { border-color: rgba(244, 63, 94, 0.45); }\n  .vnode-mgmt { border-color: rgba(99, 102, 241, 0.45); }\n  .vnode-summary { border-color: rgba(250, 204, 21, 0.5); }\n\n  /* Node Header */\n  .py-vfc-node-header {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: 12px;\n    margin-bottom: 12px;\n    padding-bottom: 10px;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.06);\n  }\n  .py-vfc-node-title-group {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n  }\n  .py-vfc-step-num {\n    width: 26px;\n    height: 26px;\n    border-radius: 50%;\n    background: #6366f1;\n    color: #ffffff;\n    font-size: 0.78rem;\n    font-weight: 900;\n    display: inline-flex;\n    align-items: center;\n    justify-content: center;\n    flex-shrink: 0;\n    box-shadow: 0 2px 8px rgba(99, 102, 241, 0.4);\n  }\n  .py-vfc-node-title {\n    font-size: 0.95rem;\n    font-weight: 800;\n    color: #f1f5f9;\n    letter-spacing: -0.01em;\n  }\n  .py-vfc-stage-pill {\n    font-size: 0.68rem;\n    font-weight: 700;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n    padding: 3px 10px;\n    border-radius: 9999px;\n    background: rgba(255, 255, 255, 0.05);\n    border: 1px solid rgba(255, 255, 255, 0.1);\n    color: #94a3b8;\n  }\n\n  /* Node Inner Canvas Box (Dynamic Auto Height) */\n  .py-vfc-canvas-box {\n    background: #060a14;\n    border: 1px solid rgba(255, 255, 255, 0.06);\n    border-radius: 10px;\n    padding: 12px 14px;\n    margin-bottom: 10px;\n  }\n\n  /* Node 1: Code Window */\n  .py-vfc-code-block {\n    font-family: var(--font-mono, monospace);\n    font-size: 0.82rem;\n    color: #e2e8f0;\n    line-height: 1.6;\n    background: transparent;\n    margin: 0;\n  }\n  .py-vfc-code-line {\n    display: flex;\n    gap: 12px;\n  }\n  .py-vfc-line-num {\n    color: #475569;\n    user-select: none;\n    font-size: 0.74rem;\n    width: 16px;\n    text-align: right;\n  }\n  .code-kw { color: #f472b6; }\n  .code-str { color: #facc15; }\n  .code-num { color: #4ade80; }\n  .code-var { color: #38bdf8; }\n\n  /* Node 2: Object Stack (Grid) */\n  .py-vfc-obj-grid {\n    display: grid;\n    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n    gap: 10px;\n  }\n  .py-vfc-obj-item {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: 8px;\n    background: rgba(15, 23, 42, 0.75);\n    border: 1px solid rgba(255, 255, 255, 0.08);\n    border-radius: 8px;\n    padding: 8px 12px;\n  }\n  .py-vfc-val-pill {\n    font-family: var(--font-mono, monospace);\n    font-size: 0.78rem;\n    font-weight: 700;\n    padding: 3px 10px;\n    border-radius: 5px;\n    letter-spacing: 0.02em;\n  }\n  .pill-green {\n    background: rgba(34, 197, 94, 0.18);\n    border: 1px solid #22c55e;\n    color: #4ade80;\n  }\n  .pill-amber {\n    background: rgba(245, 158, 11, 0.18);\n    border: 1px solid #f59e0b;\n    color: #fbbf24;\n  }\n  .pill-purple {\n    background: rgba(168, 85, 247, 0.18);\n    border: 1px solid #a855f7;\n    color: #c084fc;\n  }\n  .py-vfc-obj-label {\n    font-size: 0.72rem;\n    color: #94a3b8;\n    font-weight: 600;\n  }\n\n  /* Node 3: System RAM Architecture */\n  .py-vfc-ram-wrap {\n    border: 1.5px solid #22c55e;\n    border-radius: 10px;\n    background: rgba(34, 197, 94, 0.03);\n    padding: 10px 12px;\n  }\n  .py-vfc-ram-tag {\n    font-size: 0.72rem;\n    font-weight: 800;\n    color: #22c55e;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n    margin-bottom: 8px;\n    display: flex;\n    align-items: center;\n    gap: 6px;\n  }\n  .py-vfc-ram-sections {\n    display: flex;\n    flex-direction: column;\n    gap: 8px;\n  }\n  .py-vfc-code-area {\n    background: rgba(15, 23, 42, 0.85);\n    border: 1px dashed rgba(255, 255, 255, 0.15);\n    border-radius: 6px;\n    padding: 6px 10px;\n    font-size: 0.72rem;\n    color: #94a3b8;\n  }\n  .py-vfc-heap-area {\n    background: rgba(15, 23, 42, 0.95);\n    border: 1px solid rgba(34, 197, 94, 0.35);\n    border-radius: 6px;\n    padding: 8px 10px;\n  }\n  .py-vfc-heap-title {\n    font-size: 0.72rem;\n    font-weight: 800;\n    color: #86efac;\n    margin-bottom: 6px;\n    display: flex;\n    justify-content: space-between;\n  }\n  .py-vfc-heap-table {\n    width: 100%;\n    border-collapse: collapse;\n    font-size: 0.72rem;\n  }\n  .py-vfc-heap-table th {\n    text-align: left;\n    color: #64748b;\n    font-weight: 700;\n    font-size: 0.65rem;\n    text-transform: uppercase;\n    padding: 3px 6px;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.08);\n  }\n  .py-vfc-heap-table td {\n    padding: 5px 6px;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.04);\n  }\n  .py-vfc-heap-table tr:last-child td {\n    border-bottom: none;\n  }\n  .py-vfc-hex {\n    font-family: var(--font-mono, monospace);\n    font-size: 0.72rem;\n    color: #38bdf8;\n    background: rgba(56, 189, 248, 0.1);\n    padding: 2px 6px;\n    border-radius: 4px;\n    display: inline-block;\n  }\n  .py-vfc-type-dim {\n    font-size: 0.68rem;\n    color: #64748b;\n  }\n\n  /* Node 4: Pointer List */\n  .py-vfc-pointer-list {\n    display: flex;\n    flex-direction: column;\n    gap: 7px;\n  }\n  .py-vfc-ptr-row {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: 8px;\n    background: rgba(15, 23, 42, 0.75);\n    border: 1px solid rgba(255, 255, 255, 0.06);\n    border-radius: 8px;\n    padding: 6px 12px;\n  }\n  .py-vfc-var-label {\n    font-family: var(--font-mono, monospace);\n    font-size: 0.78rem;\n    font-weight: 800;\n    color: #38bdf8;\n    background: rgba(56, 189, 248, 0.12);\n    border: 1px solid rgba(56, 189, 248, 0.3);\n    padding: 2px 8px;\n    border-radius: 4px;\n  }\n  .py-vfc-ptr-arrow {\n    color: #818cf8;\n    font-weight: 900;\n    font-size: 0.78rem;\n  }\n\n  /* Node Footer Text */\n  .py-vfc-node-footer {\n    font-size: 0.76rem;\n    color: #94a3b8;\n    line-height: 1.45;\n  }\n  .py-vfc-node-footer strong {\n    color: #e2e8f0;\n  }\n\n  /* ══════ FLOWCHART TRANSITION BRIDGE BANNER ══════ */\n  .py-vfc-bridge {\n    width: 100%;\n    box-sizing: border-box;\n    text-align: center;\n    margin: 0;\n    padding: 14px 18px;\n    background: #0f172a;\n    border: 1px solid rgba(99, 102, 241, 0.35);\n    border-radius: 14px;\n    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);\n    position: relative;\n    z-index: 2;\n  }\n  .py-vfc-bridge-title {\n    font-size: 0.82rem;\n    font-weight: 800;\n    color: #a5b4fc;\n    letter-spacing: 0.06em;\n    text-transform: uppercase;\n    margin-bottom: 8px;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    gap: 8px;\n  }\n  .py-vfc-bridge-pills {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    gap: 12px;\n    flex-wrap: wrap;\n    font-size: 0.76rem;\n    font-weight: 700;\n  }\n  .bridge-pill {\n    padding: 4px 12px;\n    border-radius: 9999px;\n    background: rgba(255, 255, 255, 0.05);\n    border: 1px solid rgba(255, 255, 255, 0.1);\n    color: #e2e8f0;\n  }\n  .bridge-sep {\n    color: #6366f1;\n    font-weight: 900;\n  }\n\n  /* Node 5: Fork Diagram */\n  .py-vfc-fork-diagram {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    gap: 12px;\n    width: 100%;\n    padding: 8px 0;\n  }\n  .py-vfc-fork-vars {\n    display: flex;\n    flex-direction: column;\n    gap: 8px;\n  }\n  .py-vfc-fork-arrows {\n    font-size: 1.3rem;\n    color: #818cf8;\n    font-weight: 900;\n    line-height: 1;\n  }\n\n  /* Node 8: Memory Management 3-Card Grid */\n  .py-vfc-cycle-grid {\n    display: grid;\n    grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));\n    gap: 10px;\n  }\n  .py-vfc-cycle-item {\n    display: flex;\n    align-items: flex-start;\n    gap: 10px;\n    background: rgba(15, 23, 42, 0.75);\n    border: 1px solid rgba(255, 255, 255, 0.06);\n    border-radius: 8px;\n    padding: 10px 12px;\n  }\n  .py-vfc-cycle-icon {\n    font-size: 1.15rem;\n    flex-shrink: 0;\n    margin-top: 1px;\n  }\n  .py-vfc-cycle-text {\n    font-size: 0.72rem;\n    line-height: 1.4;\n    color: #cbd5e1;\n  }\n  .py-vfc-cycle-text strong {\n    color: #f8fafc;\n    font-size: 0.76rem;\n  }\n\n  /* Node 9: Summary & Gold Card */\n  .py-vfc-legend-grid {\n    display: grid;\n    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));\n    gap: 8px;\n    margin-bottom: 12px;\n  }\n  .py-vfc-legend-item {\n    font-size: 0.74rem;\n    color: #cbd5e1;\n    display: flex;\n    align-items: center;\n    gap: 8px;\n    background: rgba(15, 23, 42, 0.75);\n    padding: 6px 10px;\n    border-radius: 6px;\n    border: 1px solid rgba(255, 255, 255, 0.06);\n  }\n  .py-vfc-gold-card {\n    background: linear-gradient(135deg, #fef08a 0%, #facc15 100%);\n    border: 1px solid #eab308;\n    border-radius: 10px;\n    padding: 12px 16px;\n    text-align: center;\n    color: #713f12;\n    font-size: 0.84rem;\n    font-weight: 800;\n    box-shadow: 0 4px 16px rgba(250, 204, 21, 0.25);\n  }\n  .py-vfc-footer-ribbon {\n    margin-top: 10px;\n    text-align: center;\n    font-size: 0.78rem;\n    font-weight: 700;\n    color: #94a3b8;\n    letter-spacing: 0.02em;\n  }\n\n  /* ══════════════════════════════════════════════════════════\n     LIGHT MODE THEME ADAPTATION — ACADEMIC TEXTBOOK COLOR SCIENCE\n     BRIGHT, HIGH-VISIBILITY, SATURATED JEWEL TONES (100% CLEAN CONTRAST)\n     ══════════════════════════════════════════════════════════ */\n  [data-theme=\"light\"] .py-vfc-canvas {\n    background: #ffffff !important;\n    background-image: radial-gradient(circle, rgba(37, 99, 235, 0.1) 1.2px, transparent 1.2px) !important;\n    border: 2px solid #cbd5e1 !important;\n    box-shadow: 0 10px 32px rgba(15, 23, 42, 0.06) !important;\n  }\n  [data-theme=\"light\"] .py-vfc-header {\n    border-bottom: 1.5px solid #e2e8f0 !important;\n  }\n  [data-theme=\"light\"] .py-vfc-main-title {\n    color: #0f172a !important;\n  }\n  [data-theme=\"light\"] .py-vfc-sub-title {\n    color: #1d4ed8 !important;\n    font-weight: 800 !important;\n  }\n  [data-theme=\"light\"] .py-vfc-pipeline-stepper,\n  [data-theme=\"light\"] .py-vfc-breadcrumb {\n    background: #ffffff !important;\n    border: 1px solid #e2e8f0 !important;\n    box-shadow: 0 4px 16px -2px rgba(0, 0, 0, 0.05) !important;\n  }\n  [data-theme=\"light\"] .py-vfc-step {\n    background: #f8fafc;\n    border: 1px solid #e2e8f0;\n    color: #334155;\n  }\n  [data-theme=\"light\"] .py-vfc-step:hover {\n    background: #f1f5f9;\n    border-color: #cbd5e1;\n  }\n  [data-theme=\"light\"] .py-vfc-step-idx {\n    background: #e0e7ff;\n    border-color: #c7d2fe;\n    color: #4338ca;\n  }\n  [data-theme=\"light\"] .py-vfc-step-arrow {\n    color: #3b82f6;\n    opacity: 0.9;\n  }\n  [data-theme=\"light\"] .py-vfc-step.step-active {\n    background: linear-gradient(135deg, #eff6ff 0%, #e0e7ff 100%);\n    border: 1px solid #93c5fd;\n    color: #1d4ed8;\n    box-shadow: 0 2px 8px rgba(37, 99, 235, 0.12);\n  }\n  [data-theme=\"light\"] .py-vfc-step.step-active .py-vfc-step-idx {\n    background: #dbeafe;\n    border-color: #93c5fd;\n    color: #1d4ed8;\n  }\n  [data-theme=\"light\"] .py-vfc-breadcrumb-sep {\n    color: #2563eb !important;\n    font-weight: 900 !important;\n  }\n  [data-theme=\"light\"] .py-vfc-breadcrumb span.highlight {\n    color: #1d4ed8 !important;\n    font-weight: 900 !important;\n  }\n  \n\n  /* Nodes in Light Mode */\n  [data-theme=\"light\"] .py-vfc-node {\n    background: #ffffff !important;\n    border: 1.5px solid #cbd5e1 !important;\n    box-shadow: 0 4px 16px rgba(15, 23, 42, 0.05) !important;\n    position: relative !important;\n    z-index: 2 !important;\n  }\n  [data-theme=\"light\"] .py-vfc-node:hover {\n    box-shadow: 0 10px 24px rgba(37, 99, 235, 0.12) !important;\n  }\n  [data-theme=\"light\"] .vnode-code { border-color: #3b82f6 !important; }\n  [data-theme=\"light\"] .vnode-objects { border-color: #a855f7 !important; }\n  [data-theme=\"light\"] .vnode-ram { border-color: #16a34a !important; }\n  [data-theme=\"light\"] .vnode-pointers { border-color: #0284c7 !important; }\n  [data-theme=\"light\"] .vnode-reuse { border-color: #0284c7 !important; }\n  [data-theme=\"light\"] .vnode-mutable { border-color: #16a34a !important; }\n  [data-theme=\"light\"] .vnode-immutable { border-color: #e11d48 !important; }\n  [data-theme=\"light\"] .vnode-mgmt { border-color: #6366f1 !important; }\n  [data-theme=\"light\"] .vnode-summary { border-color: #ca8a04 !important; }\n\n  [data-theme=\"light\"] .py-vfc-node-header {\n    border-bottom: 1.5px solid #f1f5f9 !important;\n  }\n  [data-theme=\"light\"] .py-vfc-node-title {\n    color: #0f172a !important;\n    font-weight: 900 !important;\n  }\n  [data-theme=\"light\"] .py-vfc-stage-pill {\n    background: #eff6ff !important;\n    border: 1.5px solid #bfdbfe !important;\n    color: #1d4ed8 !important;\n    font-weight: 800 !important;\n  }\n\n  /* Flowchart Arrow Connectors in Light Mode */\n  [data-theme=\"light\"] .py-vfc-stem {\n    background: linear-gradient(180deg, #60a5fa, #1d4ed8) !important;\n    width: 2px !important;\n  }\n  [data-theme=\"light\"] .py-vfc-arrow-badge {\n    background: #ffffff !important;\n    border: 2px solid #2563eb !important;\n    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25) !important;\n  }\n  [data-theme=\"light\"] .py-vfc-arrow-badge svg path {\n    stroke: #1d4ed8 !important;\n    stroke-width: 3 !important;\n  }\n\n  /* Inner Canvas Box in Light Mode */\n  [data-theme=\"light\"] .py-vfc-canvas-box {\n    background: #f8fafc !important;\n    border: 1.5px solid #e2e8f0 !important;\n  }\n\n  /* Syntax Highlighting in Light Mode — Bright & High Contrast */\n  [data-theme=\"light\"] .py-vfc-code-block {\n    color: #0f172a !important;\n    font-weight: 600 !important;\n  }\n  [data-theme=\"light\"] .py-vfc-code-block .code-var {\n    color: #0284c7 !important;\n    font-weight: 700 !important;\n  }\n  [data-theme=\"light\"] .py-vfc-code-block .code-num {\n    color: #15803d !important;\n    font-weight: 800 !important;\n  }\n  [data-theme=\"light\"] .py-vfc-code-block .code-str {\n    color: #c2410c !important;\n    font-weight: 700 !important;\n  }\n  [data-theme=\"light\"] .py-vfc-code-block .code-kw {\n    color: #be123c !important;\n    font-weight: 800 !important;\n  }\n  [data-theme=\"light\"] .py-vfc-line-num {\n    color: #64748b !important;\n    font-weight: 700 !important;\n  }\n\n  /* Object Pills in Light Mode — Saturated High Visibility */\n  [data-theme=\"light\"] .py-vfc-obj-item {\n    background: #ffffff !important;\n    border: 1.5px solid #cbd5e1 !important;\n    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03) !important;\n  }\n  [data-theme=\"light\"] .pill-green {\n    background: #f0fdf4 !important;\n    border: 1.5px solid #86efac !important;\n    color: #15803d !important;\n    font-weight: 800 !important;\n  }\n  [data-theme=\"light\"] .pill-amber {\n    background: #fefce8 !important;\n    border: 1.5px solid #fde047 !important;\n    color: #b45309 !important;\n    font-weight: 800 !important;\n  }\n  [data-theme=\"light\"] .pill-purple {\n    background: #faf5ff !important;\n    border: 1.5px solid #d8b4fe !important;\n    color: #7e22ce !important;\n    font-weight: 800 !important;\n  }\n  [data-theme=\"light\"] .py-vfc-obj-label {\n    color: #0f172a !important;\n    font-weight: 700 !important;\n  }\n\n  /* System RAM in Light Mode */\n  [data-theme=\"light\"] .py-vfc-ram-wrap {\n    background: #f0fdf4 !important;\n    border: 2px solid #22c55e !important;\n  }\n  [data-theme=\"light\"] .py-vfc-ram-tag {\n    color: #15803d !important;\n    font-weight: 900 !important;\n  }\n  [data-theme=\"light\"] .py-vfc-code-area {\n    background: #ffffff !important;\n    border: 1.5px dashed #cbd5e1 !important;\n    color: #0f172a !important;\n    font-weight: 600 !important;\n  }\n  [data-theme=\"light\"] .py-vfc-heap-area {\n    background: #ffffff !important;\n    border: 1.5px solid #86efac !important;\n  }\n  [data-theme=\"light\"] .py-vfc-heap-title {\n    color: #15803d !important;\n    font-weight: 900 !important;\n  }\n  [data-theme=\"light\"] .py-vfc-heap-table th {\n    color: #0f172a !important;\n    font-weight: 800 !important;\n    border-bottom: 2px solid #cbd5e1 !important;\n  }\n  [data-theme=\"light\"] .py-vfc-heap-table td {\n    color: #0f172a !important;\n    border-bottom: 1px solid #e2e8f0 !important;\n  }\n\n  /* Monospace Hex Address Pills in Light Mode — Bright Cobalt */\n  [data-theme=\"light\"] .py-vfc-hex {\n    background: #eff6ff !important;\n    border: 1.5px solid #93c5fd !important;\n    color: #1d4ed8 !important;\n    font-weight: 800 !important;\n  }\n  [data-theme=\"light\"] .py-vfc-type-dim {\n    color: #334155 !important;\n    font-weight: 700 !important;\n  }\n\n  /* Pointer Rows in Light Mode */\n  [data-theme=\"light\"] .py-vfc-ptr-row {\n    background: #ffffff !important;\n    border: 1.5px solid #cbd5e1 !important;\n    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03) !important;\n  }\n  [data-theme=\"light\"] .py-vfc-var-label {\n    background: #eff6ff !important;\n    border: 1.5px solid #93c5fd !important;\n    color: #1d4ed8 !important;\n    font-weight: 800 !important;\n  }\n  [data-theme=\"light\"] .py-vfc-ptr-arrow {\n    color: #2563eb !important;\n    font-weight: 900 !important;\n  }\n\n  /* Flowchart Milestone Bridge in Light Mode */\n  [data-theme=\"light\"] .py-vfc-bridge {\n    background: #f8fafc !important;\n    border: 2px solid #6366f1 !important;\n    box-shadow: 0 4px 16px rgba(99, 102, 241, 0.12) !important;\n    position: relative !important;\n    z-index: 2 !important;\n    margin: 0 !important;\n  }\n  [data-theme=\"light\"] .py-vfc-bridge-title {\n    color: #4338ca !important;\n    font-weight: 900 !important;\n  }\n  [data-theme=\"light\"] .bridge-pill {\n    background: #ffffff !important;\n    border: 1.5px solid #cbd5e1 !important;\n    color: #0f172a !important;\n    font-weight: 800 !important;\n  }\n  [data-theme=\"light\"] .bridge-sep {\n    color: #4f46e5 !important;\n    font-weight: 900 !important;\n  }\n\n  /* Fork Diagram in Light Mode */\n  [data-theme=\"light\"] .py-vfc-fork-arrows {\n    color: #2563eb !important;\n  }\n\n  /* Memory Management 3-Card Grid in Light Mode */\n  [data-theme=\"light\"] .py-vfc-cycle-item {\n    background: #ffffff !important;\n    border: 1.5px solid #cbd5e1 !important;\n    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03) !important;\n  }\n  [data-theme=\"light\"] .py-vfc-cycle-text {\n    color: #1e293b !important;\n    font-size: 0.74rem !important;\n    font-weight: 500 !important;\n  }\n  [data-theme=\"light\"] .py-vfc-cycle-text strong {\n    color: #0f172a !important;\n    font-weight: 900 !important;\n    font-size: 0.80rem !important;\n  }\n\n  /* Summary Legend in Light Mode */\n  [data-theme=\"light\"] .py-vfc-legend-item {\n    background: #ffffff !important;\n    border: 1.5px solid #cbd5e1 !important;\n    color: #0f172a !important;\n    font-weight: 700 !important;\n  }\n  [data-theme=\"light\"] .py-vfc-gold-card {\n    background: linear-gradient(135deg, #fef08a 0%, #facc15 100%) !important;\n    border: 2px solid #ca8a04 !important;\n    color: #713f12 !important;\n    font-weight: 900 !important;\n    font-size: 0.88rem !important;\n    box-shadow: 0 4px 16px rgba(202, 138, 4, 0.25) !important;\n  }\n  [data-theme=\"light\"] .py-vfc-footer-ribbon {\n    color: #1e293b !important;\n    font-weight: 800 !important;\n  }\n\n  /* Node Footers in Light Mode — Crisp High Legibility */\n  [data-theme=\"light\"] .py-vfc-node-footer {\n    color: #1e293b !important;\n    font-weight: 500 !important;\n    line-height: 1.55 !important;\n  }\n  [data-theme=\"light\"] .py-vfc-node-footer strong {\n    color: #0f172a !important;\n    font-weight: 900 !important;\n  }\n  [data-theme=\"light\"] .py-vfc-node-footer code {\n    background: #eff6ff !important;\n    color: #1d4ed8 !important;\n    border: 1px solid #bfdbfe !important;\n    padding: 1px 6px !important;\n    border-radius: 4px !important;\n    font-weight: 800 !important;\n  }\n\n\n\n\n  /* ══════════════════════════════════════════════════════════\n     PRODUCTION DATA TRAP CARD (SHARED MUTABLE REFERENCES)\n     ══════════════════════════════════════════════════════════ */\n  .py-analyst-trap-card {\n    background: linear-gradient(145deg, rgba(20, 27, 45, 0.95) 0%, rgba(13, 19, 33, 0.98) 100%);\n    border: 1.5px solid rgba(244, 63, 94, 0.4);\n    border-radius: 12px;\n    padding: 16px 18px;\n    margin-top: 14px;\n    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);\n    width: 100%;\n    box-sizing: border-box;\n  }\n  .py-trap-header {\n    display: flex;\n    align-items: center;\n    gap: 12px;\n    margin-bottom: 10px;\n    flex-wrap: wrap;\n  }\n  .py-trap-badge {\n    background: rgba(244, 63, 94, 0.2);\n    border: 1px solid #f43f5e;\n    color: #fb7185;\n    font-family: var(--font-mono, monospace);\n    font-size: 0.68rem;\n    font-weight: 800;\n    padding: 2px 8px;\n    border-radius: 4px;\n    letter-spacing: 0.05em;\n  }\n  .py-trap-title {\n    margin: 0;\n    font-size: 0.88rem;\n    font-weight: 800;\n    color: #f1f5f9;\n    letter-spacing: -0.01em;\n  }\n  .py-trap-text {\n    font-size: 0.76rem;\n    color: #cbd5e1;\n    line-height: 1.5;\n    margin: 0 0 12px 0;\n  }\n  .py-trap-text strong {\n    color: #f8fafc;\n  }\n  .py-trap-code-grid {\n    display: grid;\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n    gap: 14px;\n  }\n  @media (max-width: 640px) {\n    .py-trap-code-grid {\n      grid-template-columns: 1fr;\n    }\n  }\n  .py-trap-box {\n    border-radius: 8px;\n    padding: 10px 12px;\n  }\n  .trap-danger {\n    background: rgba(244, 63, 94, 0.08);\n    border: 1px solid rgba(244, 63, 94, 0.35);\n  }\n  .trap-solution {\n    background: rgba(34, 197, 94, 0.08);\n    border: 1px solid rgba(34, 197, 94, 0.35);\n  }\n  .py-trap-box-label {\n    font-size: 0.72rem;\n    font-weight: 800;\n    margin-bottom: 6px;\n  }\n  .trap-danger .py-trap-box-label { color: #fb7185; }\n  .trap-solution .py-trap-box-label { color: #4ade80; }\n  .py-trap-box pre {\n    margin: 0;\n    background: transparent;\n    font-family: var(--font-mono, monospace);\n    font-size: 0.76rem;\n    color: #e2e8f0;\n    line-height: 1.5;\n  }\n\n  /* Live Terminal Tip in Flowchart */\n  .py-fc-live-tip {\n    margin-top: 10px;\n    background: rgba(56, 189, 248, 0.08);\n    border: 1px dashed rgba(56, 189, 248, 0.4);\n    border-radius: 8px;\n    padding: 8px 12px;\n    display: flex;\n    align-items: flex-start;\n    gap: 8px;\n  }\n  .py-fc-tip-icon {\n    font-size: 1rem;\n    flex-shrink: 0;\n    margin-top: 1px;\n  }\n  .py-fc-tip-text {\n    font-size: 0.72rem;\n    line-height: 1.45;\n    color: #cbd5e1;\n  }\n  .py-fc-tip-text strong {\n    color: #38bdf8;\n  }\n  .py-fc-tip-text code {\n    font-family: var(--font-mono, monospace);\n    background: rgba(0, 0, 0, 0.4);\n    color: #4ade80;\n    padding: 1px 5px;\n    border-radius: 4px;\n    font-size: 0.70rem;\n  }\n\n  /* Mobile Swipe Pill for Master Reference Table */\n  .py-table-mobile-hint {\n    display: none;\n    align-items: center;\n    justify-content: flex-end;\n    gap: 6px;\n    font-size: 0.70rem;\n    font-weight: 700;\n    color: #38bdf8;\n    margin-bottom: 6px;\n  }\n  @media (max-width: 768px) {\n    .py-table-mobile-hint {\n      display: flex;\n    }\n  }\n\n  /* Interactive Hover Linkage for Pointer Rows */\n  .py-vfc-ptr-row {\n    transition: all 0.2s ease !important;\n    cursor: default;\n  }\n  .py-vfc-ptr-row:hover {\n    transform: translateX(4px);\n    border-color: rgba(56, 189, 248, 0.5) !important;\n    background: rgba(15, 23, 42, 0.95) !important;\n    box-shadow: 0 4px 14px rgba(56, 189, 248, 0.15) !important;\n  }\n  .py-vfc-ptr-row:hover .py-vfc-ptr-arrow {\n    transform: scale(1.15);\n    color: #38bdf8 !important;\n  }\n\n  /* ═══ LIGHT MODE THEME ADAPTATION FOR NEW ELEMENTS ═══ */\n  [data-theme=\"light\"] .py-analyst-trap-card {\n    background: #ffffff !important;\n    border: 1.5px solid #fecdd3 !important;\n    box-shadow: 0 4px 16px rgba(225, 29, 72, 0.06) !important;\n    width: 100% !important;\n    box-sizing: border-box !important;\n  }\n  [data-theme=\"light\"] .py-trap-badge {\n    background: #ffe4e6 !important;\n    border-color: #fda4af !important;\n    color: #be123c !important;\n  }\n  [data-theme=\"light\"] .py-trap-title {\n    color: #0f172a !important;\n  }\n  [data-theme=\"light\"] .py-trap-text {\n    color: #1e293b !important;\n  }\n  [data-theme=\"light\"] .py-trap-text strong {\n    color: #0f172a !important;\n  }\n  [data-theme=\"light\"] .trap-danger {\n    background: #fff1f2 !important;\n    border-color: #fecdd3 !important;\n  }\n  [data-theme=\"light\"] .trap-danger .py-trap-box-label {\n    color: #be123c !important;\n  }\n  [data-theme=\"light\"] .trap-solution {\n    background: #f0fdf4 !important;\n    border-color: #bbf7d0 !important;\n  }\n  [data-theme=\"light\"] .trap-solution .py-trap-box-label {\n    color: #15803d !important;\n  }\n  [data-theme=\"light\"] .py-trap-box pre {\n    color: #0f172a !important;\n  }\n  [data-theme=\"light\"] .py-trap-box pre .code-comment {\n    color: #047857 !important;\n  }\n  [data-theme=\"light\"] .py-fc-live-tip {\n    background: #f0f9ff !important;\n    border-color: #93c5fd !important;\n  }\n  [data-theme=\"light\"] .py-fc-tip-text {\n    color: #1e293b !important;\n  }\n  [data-theme=\"light\"] .py-fc-tip-text strong {\n    color: #0284c7 !important;\n  }\n  [data-theme=\"light\"] .py-fc-tip-text code {\n    background: #e0f2fe !important;\n    color: #0369a1 !important;\n    border: 1px solid #bae6fd !important;\n  }\n  [data-theme=\"light\"] .py-table-mobile-hint {\n    color: #0284c7;\n  }\n  [data-theme=\"light\"] .py-vfc-ptr-row:hover {\n    background: #f0f9ff !important;\n    border-color: #38bdf8 !important;\n    box-shadow: 0 4px 12px rgba(2, 132, 199, 0.12) !important;\n  }\n  [data-theme=\"light\"] .py-vfc-ptr-row:hover .py-vfc-ptr-arrow {\n    color: #0284c7 !important;\n  }\n\n  /* ═══════════════════════════════════════════════════════════════\n     THEORY NARRATION PLAYBACK ISOLATION & SPOTLIGHTS (SQL Day 02 Parity)\n     ═══════════════════════════════════════════════════════════════ */\n  .stunning-section-entry {\n    animation: stunningSectionPop 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards !important;\n    will-change: opacity, transform !important;\n  }\n  @keyframes stunningSectionPop {\n    0% {\n      opacity: 0;\n      transform: translateY(16px) scale(0.98);\n      filter: blur(3px);\n    }\n    60% {\n      opacity: 0.95;\n      transform: translateY(-2px) scale(1.005);\n      filter: blur(0px);\n    }\n    100% {\n      opacity: 1;\n      transform: translateY(0) scale(1);\n      filter: blur(0px);\n    }\n  }\n  .instant-display {\n    animation: none !important;\n    transition: none !important;\n    opacity: 1 !important;\n    transform: none !important;\n    filter: none !important;\n  }\n\n  /* Playback Active: Inactive sections are dimmed and non-distracting */\n  .playback-active .slide-section.section-hidden {\n    opacity: 0.18 !important;\n    filter: blur(0.4px) !important;\n    pointer-events: none !important;\n    transition: opacity 0.35s ease, filter 0.35s ease !important;\n  }\n\n  /* Card Spotlight Glow */\n  .py-sp-card.card-active-spotlight,\n  .py-sp-ai-banner.card-active-spotlight,\n  .py-mut-panel.card-active-spotlight,\n  .py-analyst-trap-card.card-active-spotlight,\n  .py-vfc-node.card-active-spotlight,\n  .card-active-spotlight {\n    transform: scale(1.025) translateY(-3px) !important;\n    border-color: #38bdf8 !important;\n    background: rgba(14, 165, 233, 0.12) !important;\n    box-shadow: 0 10px 28px -4px rgba(56, 189, 248, 0.35), 0 0 0 2px rgba(56, 189, 248, 0.7) !important;\n    z-index: 5 !important;\n    transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1) !important;\n  }\n\n  [data-theme=\"light\"] .py-sp-card.card-active-spotlight,\n  [data-theme=\"light\"] .py-sp-ai-banner.card-active-spotlight,\n  [data-theme=\"light\"] .py-mut-panel.card-active-spotlight,\n  [data-theme=\"light\"] .py-analyst-trap-card.card-active-spotlight,\n  [data-theme=\"light\"] .py-vfc-node.card-active-spotlight,\n  [data-theme=\"light\"] .card-active-spotlight {\n    border-color: #0284c7 !important;\n    background: #f0f9ff !important;\n    box-shadow: 0 10px 24px -4px rgba(2, 132, 199, 0.28), 0 0 0 2px #0284c7 !important;\n  }\n\n  /* Table Row Active Spotlight */\n  .py-matrix-table tr.row-active-spotlight,\n  .py-master-ref-table tr.row-active-spotlight,\n  table tr.row-active-spotlight {\n    background: rgba(59, 130, 246, 0.18) !important;\n    border-left: 4px solid #38bdf8 !important;\n    box-shadow: inset 0 0 12px rgba(56, 189, 248, 0.15) !important;\n    transition: background 0.25s ease, border-color 0.25s ease !important;\n  }\n  .py-matrix-table tr.row-active-spotlight td,\n  .py-master-ref-table tr.row-active-spotlight td,\n  table tr.row-active-spotlight td {\n    color: #f8fafc !important;\n    font-weight: 600 !important;\n  }\n\n  [data-theme=\"light\"] .py-matrix-table tr.row-active-spotlight,\n  [data-theme=\"light\"] .py-master-ref-table tr.row-active-spotlight,\n  [data-theme=\"light\"] table tr.row-active-spotlight {\n    background: rgba(2, 132, 199, 0.12) !important;\n    border-left: 4px solid #0284c7 !important;\n  }\n  [data-theme=\"light\"] .py-matrix-table tr.row-active-spotlight td,\n  [data-theme=\"light\"] .py-master-ref-table tr.row-active-spotlight td,\n  [data-theme=\"light\"] table tr.row-active-spotlight td {\n    color: #0f172a !important;\n  }\n\n  /* ══════════════════════════════════════════════════════════\n     WORLD-CLASS INTERACTIVE & VISUAL ENHANCEMENTS (10/10 UX)\n     ══════════════════════════════════════════════════════════ */\n\n  /* 1. Dynamic Table Row Spotlight & Hover FX */\n  .py-master-ref-table tbody tr,\n  .py-matrix-table tbody tr {\n    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1) !important;\n    cursor: pointer;\n  }\n  .py-master-ref-table tbody tr:hover,\n  .py-matrix-table tbody tr:hover {\n    background: rgba(56, 189, 248, 0.08) !important;\n    transform: translateX(4px);\n    box-shadow: inset 3px 0 0 #38bdf8 !important;\n  }\n  [data-theme=\"light\"] .py-master-ref-table tbody tr:hover,\n  [data-theme=\"light\"] .py-matrix-table tbody tr:hover {\n    background: #f0f9ff !important;\n    box-shadow: inset 3px 0 0 #0284c7 !important;\n  }\n\n  /* 2. Top Gradient Accent Lines & Hover Micro-Elevation */\n  .py-sp-card,\n  .py-mut-showcase,\n  .py-matrix-showcase,\n  .py-analyst-trap-card,\n  .py-vfc-canvas {\n    position: relative !important;\n    overflow: hidden !important;\n    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease !important;\n  }\n  .py-sp-card::before,\n  .py-mut-showcase::before,\n  .py-matrix-showcase::before,\n  .py-analyst-trap-card::before,\n  .py-vfc-canvas::before {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    height: 3px;\n    background: linear-gradient(90deg, #38bdf8 0%, #818cf8 50%, #34d399 100%);\n    opacity: 0.85;\n    z-index: 2;\n  }\n  .py-sp-card:hover {\n    transform: translateY(-3px) !important;\n    box-shadow: 0 12px 28px -6px rgba(0, 0, 0, 0.4), 0 0 16px rgba(56, 189, 248, 0.15) !important;\n    border-color: rgba(56, 189, 248, 0.4) !important;\n  }\n  [data-theme=\"light\"] .py-sp-card:hover {\n    transform: translateY(-3px) !important;\n    box-shadow: 0 12px 24px -4px rgba(0, 0, 0, 0.08), 0 0 12px rgba(2, 132, 199, 0.12) !important;\n    border-color: #0284c7 !important;\n  }\n\n  /* 3. Code Card Micro-Glow & Typography Polish */\n  .py-trap-box pre,\n  .py-code-box {\n    transition: border-color 0.3s ease, box-shadow 0.3s ease !important;\n  }\n  .py-trap-box pre:hover,\n  .py-code-box:hover {\n    border-color: rgba(56, 189, 248, 0.4) !important;\n    box-shadow: 0 4px 16px rgba(56, 189, 248, 0.12) !important;\n  }\n  [data-theme=\"light\"] .py-trap-box pre:hover,\n  [data-theme=\"light\"] .py-code-box:hover {\n    border-color: #0284c7 !important;\n    box-shadow: 0 4px 16px rgba(2, 132, 199, 0.12) !important;\n  }\n\n  /* Heading & Block Active Spotlight */\n  .heading-box-wrap.narration-spotlight-active,\n  .narration-spotlight-active {\n    border-color: #38bdf8 !important;\n    box-shadow: 0 0 16px rgba(56, 189, 248, 0.3) !important;\n    transition: all 0.3s ease !important;\n  }\n\n\n\r\n  /* ═════════════════════════════════════════════════════════════════════\r\n     UNIFORM VERTICAL RHYTHM & SPACING SYSTEM (100% Consistent Across Day 02)\r\n     ═════════════════════════════════════════════════════════════════════ */\r\n  .slide-section {\r\n    margin-top: 36px !important;\r\n    margin-bottom: 0 !important;\r\n  }\r\n  .slide-section:first-child {\r\n    margin-top: 8px !important;\r\n  }\r\n  .slide-section-title.heading-box-wrap {\r\n    margin: 0 0 14px 0 !important;\r\n  }\r\n  .section-intro-text {\r\n    margin: 0 0 14px 0 !important;\r\n    font-size: 0.92rem !important;\r\n    line-height: 1.6 !important;\r\n  }\r\n  .topic-subcard {\r\n    margin: 14px 0 0 0 !important;\r\n    position: relative !important;\r\n  }\r\n  .topic-subcard + .topic-subcard {\r\n    margin-top: 16px !important;\r\n  }\r\n  .subcard-header-with-audio {\r\n    display: flex !important;\r\n    align-items: center !important;\r\n    gap: 8px !important;\r\n    margin: 0 0 10px 0 !important;\r\n    padding: 0 !important;\r\n  }\r\n  .subcard-header-title {\r\n    margin: 0 !important;\r\n    font-size: 0.92rem !important;\r\n    font-weight: 700 !important;\r\n    color: #38bdf8 !important;\r\n    letter-spacing: -0.01em !important;\r\n  }\r\n  [data-theme=\"light\"] .subcard-header-title {\r\n    color: #0284c7 !important;\r\n  }\r\n  .code-block-container {\r\n    margin: 0 !important;\r\n    padding: 0 !important;\r\n    display: flex !important;\r\n    flex-direction: column !important;\r\n    gap: 12px !important;\r\n  }\r\n  .code-subblock {\r\n    margin: 0 !important;\r\n  }\r\n  .interview-box {\r\n    margin-top: 14px !important;\r\n    margin-bottom: 0 !important;\r\n  }\r\n\r\n  /* Table Card Header: Clean non-floating header that stays attached to its card */\r\n  .table-header-wrap {\r\n    position: relative !important;\r\n    top: auto !important;\r\n    left: auto !important;\r\n    z-index: 1 !important;\r\n    background-color: #0d1527 !important;\r\n    display: flex !important;\r\n    justify-content: space-between !important;\r\n    align-items: center !important;\r\n    padding: 10px 14px !important;\r\n    margin: 0 !important;\r\n    border-radius: 8px 8px 0 0 !important;\r\n    border: 1px solid rgba(255, 255, 255, 0.08) !important;\r\n    border-bottom: 1px solid rgba(255, 255, 255, 0.06) !important;\r\n  }\r\n  /* Explicitly prevent any vertical floating or sticking for headers during scroll */\r\n  .table-header-wrap,\r\n  .arith-sticky-table thead,\r\n  .arith-sticky-table th,\r\n  .precedence-table thead,\r\n  .precedence-table th,\r\n  .anti-pattern-table thead,\r\n  .anti-pattern-table th {\r\n    top: auto !important;\r\n  }\r\n  .table-header-title {\r\n    margin: 0 !important;\r\n    font-size: 0.92rem !important;\r\n    font-weight: 700 !important;\r\n    color: #f8fafc !important;\r\n    letter-spacing: -0.01em !important;\r\n  }\r\n  [data-theme=\"light\"] .table-header-wrap {\r\n    background-color: #ffffff !important;\r\n    border-color: #e2e8f0 !important;\r\n  }\r\n  [data-theme=\"light\"] .table-header-title {\r\n    color: #0f172a !important;\r\n  }\r\n  .table-header-left {\r\n    display: flex !important;\r\n    align-items: center !important;\r\n    gap: 8px !important;\r\n    flex: 1 !important;\r\n  }\r\n  .table-search-box {\r\n    position: relative !important;\r\n    display: flex !important;\r\n    align-items: center !important;\r\n    background: rgba(0, 0, 0, 0.4) !important;\r\n    border: 1px solid rgba(255, 255, 255, 0.12) !important;\r\n    border-radius: 6px !important;\r\n    padding: 3px 8px 3px 26px !important;\r\n    transition: all 0.2s ease !important;\r\n  }\r\n  .table-search-box:focus-within {\r\n    border-color: #38bdf8 !important;\r\n    box-shadow: 0 0 12px rgba(56, 189, 248, 0.28) !important;\r\n    background: rgba(0, 0, 0, 0.6) !important;\r\n  }\r\n  .table-search-icon {\r\n    position: absolute !important;\r\n    left: 8px !important;\r\n    color: #64748b !important;\r\n    pointer-events: none !important;\r\n  }\r\n  .table-search-input {\r\n    background: transparent !important;\r\n    border: none !important;\r\n    outline: none !important;\r\n    font-family: 'JetBrains Mono', monospace !important;\r\n    font-size: 0.72rem !important;\r\n    color: #f1f5f9 !important;\r\n    width: 130px !important;\r\n    transition: width 0.2s ease !important;\r\n  }\r\n  .table-search-input:focus {\r\n    width: 175px !important;\r\n  }\r\n  .table-search-input::placeholder {\r\n    color: #64748b !important;\r\n    font-size: 0.70rem !important;\r\n  }\r\n  .table-scroll-hint {\r\n    display: none !important;\r\n  }\r\n  .db-mock-table-wrap::-webkit-scrollbar {\r\n    height: 6px !important;\r\n  }\r\n  .db-mock-table-wrap::-webkit-scrollbar-track {\r\n    background: rgba(0, 0, 0, 0.25) !important;\r\n    border-radius: 4px !important;\r\n  }\r\n  .db-mock-table-wrap::-webkit-scrollbar-thumb {\r\n    background: rgba(56, 189, 248, 0.35) !important;\r\n    border-radius: 4px !important;\r\n  }\r\n  .db-mock-table-wrap::-webkit-scrollbar-thumb:hover {\r\n    background: #38bdf8 !important;\r\n  }\r\n  .db-table-mock td code,\r\n  .db-table-mock .prec-ops-wrap code {\r\n    cursor: pointer !important;\r\n    transition: all 0.15s ease !important;\r\n  }\r\n  .db-table-mock td code:hover,\r\n  .db-table-mock .prec-ops-wrap code:hover {\r\n    transform: translateY(-1px) !important;\r\n    border-color: #38bdf8 !important;\r\n    box-shadow: 0 2px 8px rgba(56, 189, 248, 0.3) !important;\r\n  }\r\n  .table-code-copied {\r\n    background: rgba(16, 185, 129, 0.3) !important;\r\n    border-color: #10b981 !important;\r\n    color: #34d399 !important;\r\n    box-shadow: 0 0 10px rgba(16, 185, 129, 0.45) !important;\r\n  }\r\n  .table-empty-row td {\r\n    text-align: center !important;\r\n    padding: 24px 16px !important;\r\n    color: #94a3b8 !important;\r\n    font-style: italic !important;\r\n    font-size: 0.82rem !important;\r\n    background: rgba(0, 0, 0, 0.2) !important;\r\n  }\r\n  .db-table-mock tbody tr:nth-child(even) td {\r\n    background-color: rgba(255, 255, 255, 0.015);\r\n  }\r\n  [data-theme=\"light\"] .table-search-box {\r\n    background: #f8fafc !important;\r\n    border-color: #cbd5e1 !important;\r\n  }\r\n  [data-theme=\"light\"] .table-search-box:focus-within {\r\n    border-color: #0284c7 !important;\r\n    background: #ffffff !important;\r\n    box-shadow: 0 0 10px rgba(2, 132, 199, 0.18) !important;\r\n  }\r\n  [data-theme=\"light\"] .table-search-input {\r\n    color: #0f172a !important;\r\n  }\r\n  [data-theme=\"light\"] .table-search-icon {\r\n    color: #94a3b8 !important;\r\n  }\r\n  [data-theme=\"light\"] .table-scroll-hint {\r\n    display: none !important;\r\n  }\r\n  [data-theme=\"light\"] .db-mock-table-wrap::-webkit-scrollbar-track {\r\n    background: #f1f5f9 !important;\r\n  }\r\n  [data-theme=\"light\"] .db-mock-table-wrap::-webkit-scrollbar-thumb {\r\n    background: rgba(2, 132, 199, 0.35) !important;\r\n  }\r\n  [data-theme=\"light\"] .table-empty-row td {\r\n    background: #f8fafc !important;\r\n    color: #64748b !important;\r\n  }\r\n  [data-theme=\"light\"] .db-table-mock tbody tr:nth-child(even) td {\r\n    background-color: #fafbfd !important;\r\n  }\r\n  .db-mock-table-wrap {\r\n    margin-top: 0 !important;\r\n    border-top-left-radius: 0 !important;\r\n    border-top-right-radius: 0 !important;\r\n    position: relative !important;\r\n    overflow-x: auto !important;\r\n    -webkit-overflow-scrolling: touch !important;\r\n  }\r\n  .db-table-mock.arith-sticky-table {\r\n    border-collapse: separate !important;\r\n    border-spacing: 0 !important;\r\n    min-width: 680px !important;\r\n    width: 100% !important;\r\n    overflow: visible !important;\r\n    margin: 0 !important;\r\n  }\r\n  .arith-sticky-table,\r\n  .arith-sticky-table th,\r\n  .arith-sticky-table td {\r\n    box-sizing: border-box !important;\r\n  }\r\n  /* Column 1: Operator - Frozen Horizontally ONLY (NO vertical float) */\r\n  .arith-sticky-table th:nth-child(1),\r\n  .arith-sticky-table td:nth-child(1) {\r\n    position: sticky !important;\r\n    left: 0 !important;\r\n    top: auto !important;\r\n    z-index: 10 !important;\r\n    width: 80px !important;\r\n    min-width: 80px !important;\r\n    max-width: 80px !important;\r\n    box-sizing: border-box !important;\r\n    background-color: #0d1527 !important;\r\n    border-right: 1px solid rgba(255, 255, 255, 0.08) !important;\r\n    text-align: center !important;\r\n    padding: 8px 6px !important;\r\n  }\r\n  .arith-sticky-table th:nth-child(1) {\r\n    background-color: #131d35 !important;\r\n    z-index: 11 !important;\r\n  }\r\n  .arith-sticky-table td:nth-child(1) code {\r\n    display: inline-flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    min-width: 36px;\r\n    height: 28px;\r\n    padding: 0 8px;\r\n    font-family: 'JetBrains Mono', monospace;\r\n    font-weight: 700;\r\n    font-size: 0.85rem;\r\n    background: rgba(56, 189, 248, 0.12);\r\n    border: 1px solid rgba(56, 189, 248, 0.3);\r\n    border-radius: 6px;\r\n    color: #38bdf8;\r\n  }\r\n  /* Column 2: Name - Frozen Horizontally ONLY (NO vertical float) */\r\n  .arith-sticky-table th:nth-child(2),\r\n  .arith-sticky-table td:nth-child(2) {\r\n    position: sticky !important;\r\n    left: 80px !important;\r\n    top: auto !important;\r\n    z-index: 10 !important;\r\n    width: 140px !important;\r\n    min-width: 140px !important;\r\n    max-width: 140px !important;\r\n    box-sizing: border-box !important;\r\n    background-color: #0d1527 !important;\r\n    border-right: 2px solid rgba(56, 189, 248, 0.35) !important;\r\n    box-shadow: 4px 0 10px -2px rgba(0, 0, 0, 0.45) !important;\r\n    font-weight: 600 !important;\r\n    padding: 8px 12px !important;\r\n  }\r\n  .arith-sticky-table th:nth-child(2) {\r\n    background-color: #131d35 !important;\r\n    z-index: 11 !important;\r\n  }\r\n  .arith-sticky-table tbody tr:hover td:nth-child(1),\r\n  .arith-sticky-table tbody tr:hover td:nth-child(2) {\r\n    background-color: #162038 !important;\r\n  }\r\n  /* Light mode for sticky table */\r\n  [data-theme=\"light\"] .arith-sticky-table th:nth-child(1),\r\n  [data-theme=\"light\"] .arith-sticky-table th:nth-child(2) {\r\n    background-color: #f1f5f9 !important;\r\n    border-right-color: #cbd5e1 !important;\r\n  }\r\n  [data-theme=\"light\"] .arith-sticky-table td:nth-child(1),\r\n  [data-theme=\"light\"] .arith-sticky-table td:nth-child(2) {\r\n    background-color: #ffffff !important;\r\n    border-right-color: #e2e8f0 !important;\r\n  }\r\n  [data-theme=\"light\"] .arith-sticky-table td:nth-child(1) code {\r\n    background: #e0f2fe;\r\n    border-color: #7dd3fc;\r\n    color: #0284c7;\r\n  }\r\n  [data-theme=\"light\"] .arith-sticky-table td:nth-child(2) {\r\n    border-right: 2px solid rgba(14, 165, 233, 0.4) !important;\r\n    box-shadow: 4px 0 10px -2px rgba(0, 0, 0, 0.08) !important;\r\n  }\r\n  [data-theme=\"light\"] .arith-sticky-table tbody tr:hover td:nth-child(1),\r\n  [data-theme=\"light\"] .arith-sticky-table tbody tr:hover td:nth-child(2) {\r\n    background-color: #f8fafc !important;\r\n  }\r\n\r\n  /* ═════════════════════════════════════════════════════════════════════\r\n     SECTION 08: OPERATOR PRECEDENCE HIERARCHY TABLE (Frozen Col 1 & 2 - Zero Overlap)\r\n     ═════════════════════════════════════════════════════════════════════ */\r\n  .db-table-mock.arith-sticky-table.precedence-table,\r\n  .db-mock-table-wrap .db-table-mock.precedence-table {\r\n    border-collapse: separate !important;\r\n    border-spacing: 0 !important;\r\n    min-width: 920px !important;\r\n    width: 100% !important;\r\n    overflow: visible !important;\r\n    margin: 0 !important;\r\n  }\r\n  .precedence-table,\r\n  .precedence-table th,\r\n  .precedence-table td {\r\n    box-sizing: border-box !important;\r\n  }\r\n  .precedence-table th,\r\n  .precedence-table td {\r\n    padding: 10px 14px !important;\r\n    vertical-align: middle !important;\r\n    border-bottom: 1px solid rgba(255, 255, 255, 0.06) !important;\r\n    font-size: 0.84rem !important;\r\n    line-height: 1.45 !important;\r\n    box-sizing: border-box !important;\r\n  }\r\n  .precedence-table th {\r\n    background-color: #131d35 !important;\r\n    color: #94a3b8 !important;\r\n    font-weight: 700 !important;\r\n    text-transform: uppercase !important;\r\n    letter-spacing: 0.04em !important;\r\n    font-size: 0.74rem !important;\r\n    border-bottom: 2px solid rgba(56, 189, 248, 0.35) !important;\r\n    white-space: nowrap !important;\r\n  }\r\n  /* Precedence Column 1: Precedence Level - Frozen horizontally at left 0 */\r\n  .precedence-table th:nth-child(1),\r\n  .precedence-table td:nth-child(1),\r\n  .arith-sticky-table.precedence-table th:nth-child(1),\r\n  .arith-sticky-table.precedence-table td:nth-child(1) {\r\n    position: -webkit-sticky !important;\r\n    position: sticky !important;\r\n    left: 0 !important;\r\n    top: auto !important;\r\n    z-index: 10 !important;\r\n    width: 160px !important;\r\n    min-width: 160px !important;\r\n    max-width: 160px !important;\r\n    box-sizing: border-box !important;\r\n    background-color: #0d1527 !important;\r\n    border-right: 1px solid rgba(255, 255, 255, 0.08) !important;\r\n    text-align: left !important;\r\n    padding: 10px 14px !important;\r\n  }\r\n  .precedence-table th:nth-child(1),\r\n  .arith-sticky-table.precedence-table th:nth-child(1) {\r\n    background-color: #131d35 !important;\r\n    z-index: 12 !important;\r\n  }\r\n  /* Precedence Column 2: Operators - Frozen horizontally at left 160px */\r\n  .precedence-table th:nth-child(2),\r\n  .precedence-table td:nth-child(2),\r\n  .arith-sticky-table.precedence-table th:nth-child(2),\r\n  .arith-sticky-table.precedence-table td:nth-child(2) {\r\n    position: -webkit-sticky !important;\r\n    position: sticky !important;\r\n    left: 160px !important;\r\n    top: auto !important;\r\n    z-index: 10 !important;\r\n    width: 200px !important;\r\n    min-width: 200px !important;\r\n    max-width: 200px !important;\r\n    box-sizing: border-box !important;\r\n    background-color: #0d1527 !important;\r\n    border-right: 2px solid rgba(56, 189, 248, 0.35) !important;\r\n    box-shadow: 4px 0 10px -2px rgba(0, 0, 0, 0.45) !important;\r\n    padding: 10px 14px !important;\r\n  }\r\n  .precedence-table th:nth-child(2),\r\n  .arith-sticky-table.precedence-table th:nth-child(2) {\r\n    background-color: #131d35 !important;\r\n    z-index: 12 !important;\r\n  }\r\n  .precedence-table th:nth-child(3),\r\n  .precedence-table td:nth-child(3),\r\n  .arith-sticky-table.precedence-table th:nth-child(3),\r\n  .arith-sticky-table.precedence-table td:nth-child(3) {\r\n    width: 150px !important;\r\n    min-width: 140px !important;\r\n    text-align: center !important;\r\n    position: relative !important;\r\n    z-index: 1 !important;\r\n  }\r\n  .precedence-table th:nth-child(4),\r\n  .precedence-table td:nth-child(4),\r\n  .arith-sticky-table.precedence-table th:nth-child(4),\r\n  .arith-sticky-table.precedence-table td:nth-child(4) {\r\n    min-width: 320px !important;\r\n    position: relative !important;\r\n    z-index: 1 !important;\r\n  }\r\n  .precedence-table tbody tr:hover td,\r\n  .arith-sticky-table.precedence-table tbody tr:hover td {\r\n    background-color: rgba(56, 189, 248, 0.05) !important;\r\n  }\r\n  .precedence-table tbody tr:hover td:nth-child(1),\r\n  .precedence-table tbody tr:hover td:nth-child(2),\r\n  .arith-sticky-table.precedence-table tbody tr:hover td:nth-child(1),\r\n  .arith-sticky-table.precedence-table tbody tr:hover td:nth-child(2) {\r\n    background-color: #162038 !important;\r\n  }\r\n  .prec-tier-badge {\r\n    display: inline-block;\r\n    padding: 3px 8px;\r\n    font-family: 'JetBrains Mono', monospace;\r\n    font-size: 0.75rem;\r\n    font-weight: 700;\r\n    border-radius: 5px;\r\n    background: rgba(255, 255, 255, 0.05);\r\n    border: 1px solid rgba(255, 255, 255, 0.1);\r\n    color: #f1f5f9;\r\n    white-space: nowrap;\r\n  }\r\n  .prec-tier-1 {\r\n    background: rgba(244, 63, 94, 0.15);\r\n    border-color: rgba(244, 63, 94, 0.35);\r\n    color: #fb7185;\r\n  }\r\n  .prec-tier-2 {\r\n    background: rgba(245, 158, 11, 0.18);\r\n    border-color: rgba(245, 158, 11, 0.4);\r\n    color: #fbbf24;\r\n  }\r\n  .prec-tier-15 {\r\n    background: rgba(148, 163, 184, 0.12);\r\n    border-color: rgba(148, 163, 184, 0.3);\r\n    color: #94a3b8;\r\n  }\r\n  .prec-ops-wrap {\r\n    display: flex;\r\n    flex-wrap: wrap;\r\n    gap: 4px;\r\n    align-items: center;\r\n  }\r\n  .prec-ops-wrap code {\r\n    display: inline-flex;\r\n    align-items: center;\r\n    padding: 2px 7px;\r\n    font-family: 'JetBrains Mono', monospace;\r\n    font-size: 0.8rem;\r\n    font-weight: 600;\r\n    border-radius: 4px;\r\n    background: rgba(56, 189, 248, 0.1);\r\n    border: 1px solid rgba(56, 189, 248, 0.25);\r\n    color: #38bdf8;\r\n  }\r\n  .prec-op-highlight {\r\n    background: rgba(245, 158, 11, 0.2) !important;\r\n    border-color: rgba(245, 158, 11, 0.45) !important;\r\n    color: #fcd34d !important;\r\n    font-weight: 800 !important;\r\n  }\r\n  .prec-assoc-tag {\r\n    display: inline-block;\r\n    padding: 3px 9px;\r\n    border-radius: 5px;\r\n    font-size: 0.72rem;\r\n    font-weight: 700;\r\n    white-space: nowrap;\r\n  }\r\n  .prec-assoc-ltr {\r\n    background: rgba(56, 189, 248, 0.1);\r\n    color: #7dd3fc;\r\n    border: 1px solid rgba(56, 189, 248, 0.25);\r\n  }\r\n  .prec-assoc-rtl {\r\n    background: rgba(245, 158, 11, 0.15);\r\n    color: #fbbf24;\r\n    border: 1px solid rgba(245, 158, 11, 0.35);\r\n  }\r\n\r\n  /* Light mode for Precedence Table */\r\n  [data-theme=\"light\"] .precedence-table th,\r\n  [data-theme=\"light\"] .arith-sticky-table.precedence-table th {\r\n    background-color: #f1f5f9 !important;\r\n    color: #475569 !important;\r\n    border-bottom-color: #cbd5e1 !important;\r\n  }\r\n  [data-theme=\"light\"] .precedence-table td,\r\n  [data-theme=\"light\"] .arith-sticky-table.precedence-table td {\r\n    border-bottom-color: #f1f5f9 !important;\r\n    color: #1e293b !important;\r\n  }\r\n  [data-theme=\"light\"] .precedence-table tbody tr:hover td,\r\n  [data-theme=\"light\"] .arith-sticky-table.precedence-table tbody tr:hover td {\r\n    background-color: #f8fafc !important;\r\n  }\r\n  [data-theme=\"light\"] .precedence-table th:nth-child(1),\r\n  [data-theme=\"light\"] .precedence-table th:nth-child(2),\r\n  [data-theme=\"light\"] .arith-sticky-table.precedence-table th:nth-child(1),\r\n  [data-theme=\"light\"] .arith-sticky-table.precedence-table th:nth-child(2) {\r\n    background-color: #f1f5f9 !important;\r\n    border-right-color: #cbd5e1 !important;\r\n  }\r\n  [data-theme=\"light\"] .precedence-table td:nth-child(1),\r\n  [data-theme=\"light\"] .precedence-table td:nth-child(2),\r\n  [data-theme=\"light\"] .arith-sticky-table.precedence-table td:nth-child(1),\r\n  [data-theme=\"light\"] .arith-sticky-table.precedence-table td:nth-child(2) {\r\n    background-color: #ffffff !important;\r\n    border-right-color: #e2e8f0 !important;\r\n  }\r\n  [data-theme=\"light\"] .precedence-table td:nth-child(2),\r\n  [data-theme=\"light\"] .arith-sticky-table.precedence-table td:nth-child(2) {\r\n    border-right: 2px solid rgba(14, 165, 233, 0.4) !important;\r\n    box-shadow: 4px 0 10px -2px rgba(0, 0, 0, 0.08) !important;\r\n  }\r\n  [data-theme=\"light\"] .precedence-table tbody tr:hover td:nth-child(1),\r\n  [data-theme=\"light\"] .precedence-table tbody tr:hover td:nth-child(2),\r\n  [data-theme=\"light\"] .arith-sticky-table.precedence-table tbody tr:hover td:nth-child(1),\r\n  [data-theme=\"light\"] .arith-sticky-table.precedence-table tbody tr:hover td:nth-child(2) {\r\n    background-color: #f8fafc !important;\r\n  }\r\n  [data-theme=\"light\"] .prec-tier-badge {\r\n    background: #f1f5f9;\r\n    border-color: #cbd5e1;\r\n    color: #0f172a;\r\n  }\r\n  [data-theme=\"light\"] .prec-tier-1 {\r\n    background: #ffe4e6;\r\n    border-color: #fecdd3;\r\n    color: #e11d48;\r\n  }\r\n  [data-theme=\"light\"] .prec-tier-2 {\r\n    background: #fef3c7;\r\n    border-color: #fde68a;\r\n    color: #d97706;\r\n  }\r\n  [data-theme=\"light\"] .prec-ops-wrap code {\r\n    background: #e0f2fe;\r\n    border-color: #bae6fd;\r\n    color: #0284c7;\r\n  }\r\n  [data-theme=\"light\"] .prec-assoc-ltr {\r\n    background: #f0fdf4;\r\n    color: #16a34a;\r\n    border-color: #bbf7d0;\r\n  }\r\n  [data-theme=\"light\"] .prec-assoc-rtl {\r\n    background: #fffbeb;\r\n    color: #b45309;\r\n    border-color: #fde68a;\r\n  }\r\n\r\n  /* ═════════════════════════════════════════════════════════════════════\r\n     SECTION 09: MASTER ANTI-PATTERN REVIEW TABLE (Frozen Col 1 & 2 - Zero Overlap)\r\n     ═════════════════════════════════════════════════════════════════════ */\r\n  .db-table-mock.arith-sticky-table.anti-pattern-table,\r\n  .db-mock-table-wrap .db-table-mock.anti-pattern-table {\r\n    border-collapse: separate !important;\r\n    border-spacing: 0 !important;\r\n    min-width: 960px !important;\r\n    width: 100% !important;\r\n    overflow: visible !important;\r\n    margin: 0 !important;\r\n  }\r\n  .anti-pattern-table,\r\n  .anti-pattern-table th,\r\n  .anti-pattern-table td {\r\n    box-sizing: border-box !important;\r\n  }\r\n  .anti-pattern-table th,\r\n  .anti-pattern-table td {\r\n    padding: 10px 14px !important;\r\n    vertical-align: middle !important;\r\n    border-bottom: 1px solid rgba(255, 255, 255, 0.06) !important;\r\n    font-size: 0.84rem !important;\r\n    line-height: 1.45 !important;\r\n    box-sizing: border-box !important;\r\n  }\r\n  .anti-pattern-table th {\r\n    background-color: #131d35 !important;\r\n    color: #94a3b8 !important;\r\n    font-weight: 700 !important;\r\n    text-transform: uppercase !important;\r\n    letter-spacing: 0.04em !important;\r\n    font-size: 0.74rem !important;\r\n    border-bottom: 2px solid rgba(244, 63, 94, 0.35) !important;\r\n    white-space: nowrap !important;\r\n  }\r\n  /* Anti-Pattern Column 1: Buggy Code Pattern - Only this column is frozen horizontally */\r\n  .anti-pattern-table th:nth-child(1),\r\n  .anti-pattern-table td:nth-child(1),\r\n  .arith-sticky-table.anti-pattern-table th:nth-child(1),\r\n  .arith-sticky-table.anti-pattern-table td:nth-child(1) {\r\n    position: -webkit-sticky !important;\r\n    position: sticky !important;\r\n    left: 0 !important;\r\n    top: auto !important;\r\n    z-index: 10 !important;\r\n    width: 220px !important;\r\n    min-width: 220px !important;\r\n    max-width: 220px !important;\r\n    box-sizing: border-box !important;\r\n    background-color: #0d1527 !important;\r\n    border-right: 2px solid rgba(244, 63, 94, 0.4) !important;\r\n    box-shadow: 4px 0 10px -2px rgba(0, 0, 0, 0.45) !important;\r\n    text-align: left !important;\r\n    padding: 10px 14px !important;\r\n  }\r\n  .anti-pattern-table th:nth-child(1),\r\n  .arith-sticky-table.anti-pattern-table th:nth-child(1) {\r\n    background-color: #131d35 !important;\r\n    z-index: 12 !important;\r\n  }\r\n  /* Override code block styling inside column 1 */\r\n  .anti-pattern-table td:nth-child(1) code,\r\n  .arith-sticky-table.anti-pattern-table td:nth-child(1) code {\r\n    display: inline-block !important;\r\n    min-width: 0 !important;\r\n    height: auto !important;\r\n    padding: 3px 8px !important;\r\n    background: rgba(244, 63, 94, 0.12) !important;\r\n    border: 1px solid rgba(244, 63, 94, 0.3) !important;\r\n    color: #fca5a5 !important;\r\n    white-space: normal !important;\r\n  }\r\n  /* Anti-Pattern Column 2: Runtime Result - Scrolls normally with content (NOT frozen) */\r\n  .anti-pattern-table th:nth-child(2),\r\n  .anti-pattern-table td:nth-child(2),\r\n  .arith-sticky-table.anti-pattern-table th:nth-child(2),\r\n  .arith-sticky-table.anti-pattern-table td:nth-child(2) {\r\n    position: relative !important;\r\n    left: auto !important;\r\n    top: auto !important;\r\n    z-index: 1 !important;\r\n    width: 200px !important;\r\n    min-width: 180px !important;\r\n    box-sizing: border-box !important;\r\n    border-right: 1px solid rgba(255, 255, 255, 0.06) !important;\r\n    padding: 10px 14px !important;\r\n  }\r\n  .anti-pattern-table th:nth-child(3),\r\n  .anti-pattern-table td:nth-child(3),\r\n  .arith-sticky-table.anti-pattern-table th:nth-child(3),\r\n  .arith-sticky-table.anti-pattern-table td:nth-child(3) {\r\n    min-width: 260px !important;\r\n    position: relative !important;\r\n    z-index: 1 !important;\r\n  }\r\n  .anti-pattern-table th:nth-child(4),\r\n  .anti-pattern-table td:nth-child(4),\r\n  .arith-sticky-table.anti-pattern-table th:nth-child(4),\r\n  .arith-sticky-table.anti-pattern-table td:nth-child(4) {\r\n    width: 230px !important;\r\n    min-width: 210px !important;\r\n    position: relative !important;\r\n    z-index: 1 !important;\r\n  }\r\n  .anti-pattern-table tbody tr:hover td,\r\n  .arith-sticky-table.anti-pattern-table tbody tr:hover td {\r\n    background-color: rgba(244, 63, 94, 0.04) !important;\r\n  }\r\n  .anti-pattern-table tbody tr:hover td:nth-child(1),\r\n  .arith-sticky-table.anti-pattern-table tbody tr:hover td:nth-child(1) {\r\n    background-color: #162038 !important;\r\n  }\r\n  .ap-code-bug {\r\n    display: inline-block;\r\n    padding: 3px 8px;\r\n    font-family: 'JetBrains Mono', monospace;\r\n    font-size: 0.8rem;\r\n    font-weight: 600;\r\n    border-radius: 5px;\r\n    background: rgba(244, 63, 94, 0.12);\r\n    border: 1px solid rgba(244, 63, 94, 0.3);\r\n    color: #fca5a5;\r\n    word-break: break-word;\r\n  }\r\n  .ap-result-bad {\r\n    color: #f87171;\r\n    font-weight: 600;\r\n  }\r\n  .ap-code-fix {\r\n    display: inline-block;\r\n    padding: 3px 8px;\r\n    font-family: 'JetBrains Mono', monospace;\r\n    font-size: 0.8rem;\r\n    font-weight: 600;\r\n    border-radius: 5px;\r\n    background: rgba(16, 185, 129, 0.12);\r\n    border: 1px solid rgba(16, 185, 129, 0.32);\r\n    color: #6ee7b7;\r\n    word-break: break-word;\r\n  }\r\n\r\n  /* Light mode for Anti-Pattern Table */\r\n  [data-theme=\"light\"] .anti-pattern-table th,\r\n  [data-theme=\"light\"] .arith-sticky-table.anti-pattern-table th {\r\n    background-color: #f1f5f9 !important;\r\n    color: #475569 !important;\r\n    border-bottom-color: #cbd5e1 !important;\r\n  }\r\n  [data-theme=\"light\"] .anti-pattern-table td,\r\n  [data-theme=\"light\"] .arith-sticky-table.anti-pattern-table td {\r\n    border-bottom-color: #f1f5f9 !important;\r\n    color: #1e293b !important;\r\n  }\r\n  [data-theme=\"light\"] .anti-pattern-table tbody tr:hover td,\r\n  [data-theme=\"light\"] .arith-sticky-table.anti-pattern-table tbody tr:hover td {\r\n    background-color: #fef2f2 !important;\r\n  }\r\n  [data-theme=\"light\"] .anti-pattern-table th:nth-child(1),\r\n  [data-theme=\"light\"] .arith-sticky-table.anti-pattern-table th:nth-child(1) {\r\n    background-color: #f1f5f9 !important;\r\n    border-right-color: #cbd5e1 !important;\r\n  }\r\n  [data-theme=\"light\"] .anti-pattern-table td:nth-child(1),\r\n  [data-theme=\"light\"] .arith-sticky-table.anti-pattern-table td:nth-child(1) {\r\n    background-color: #ffffff !important;\r\n    border-right: 2px solid rgba(244, 63, 94, 0.4) !important;\r\n    box-shadow: 4px 0 10px -2px rgba(0, 0, 0, 0.08) !important;\r\n  }\r\n  [data-theme=\"light\"] .anti-pattern-table th:nth-child(2),\r\n  [data-theme=\"light\"] .arith-sticky-table.anti-pattern-table th:nth-child(2) {\r\n    border-right: 1px solid #e2e8f0 !important;\r\n  }\r\n  [data-theme=\"light\"] .anti-pattern-table td:nth-child(2),\r\n  [data-theme=\"light\"] .arith-sticky-table.anti-pattern-table td:nth-child(2) {\r\n    border-right: 1px solid #e2e8f0 !important;\r\n    box-shadow: none !important;\r\n  }\r\n  [data-theme=\"light\"] .anti-pattern-table tbody tr:hover td:nth-child(1),\r\n  [data-theme=\"light\"] .arith-sticky-table.anti-pattern-table tbody tr:hover td:nth-child(1) {\r\n    background-color: #fef2f2 !important;\r\n  }\r\n  [data-theme=\"light\"] .anti-pattern-table td:nth-child(1) code,\r\n  [data-theme=\"light\"] .arith-sticky-table.anti-pattern-table td:nth-child(1) code {\r\n    background: #fee2e2 !important;\r\n    border-color: #fca5a5 !important;\r\n    color: #b91c1c !important;\r\n  }\r\n\r\n  /* ═════════════════════════════════════════════════════════════════════\r\n     STUNNING KEY NOTES CARD DESIGN SYSTEM (Inherited Body Font + Glassmorphism)\r\n     ═════════════════════════════════════════════════════════════════════ */\r\n  .py-keynotes-card {\r\n    background: linear-gradient(135deg, rgba(15, 23, 42, 0.85) 0%, rgba(30, 41, 59, 0.65) 100%) !important;\r\n    backdrop-filter: blur(12px);\r\n    -webkit-backdrop-filter: blur(12px);\r\n    border: 1px solid rgba(56, 189, 248, 0.28) !important;\r\n    border-left: 4px solid #38bdf8 !important;\r\n    border-radius: 12px !important;\r\n    padding: 16px 20px !important;\r\n    margin: 18px 0 10px 0 !important;\r\n    display: grid !important;\r\n    grid-template-columns: auto 1fr !important;\r\n    column-gap: 12px !important;\r\n    row-gap: 14px !important;\r\n    align-items: center !important;\r\n    box-shadow: 0 8px 24px -4px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.06) !important;\r\n    font-family: inherit !important;\r\n  }\r\n  .py-keynotes-icon-wrap {\r\n    grid-column: 1 !important;\r\n    grid-row: 1 !important;\r\n    width: 34px !important;\r\n    height: 34px !important;\r\n    border-radius: 9px !important;\r\n    background: rgba(56, 189, 248, 0.12) !important;\r\n    border: 1px solid rgba(56, 189, 248, 0.28) !important;\r\n    display: flex !important;\r\n    align-items: center !important;\r\n    justify-content: center !important;\r\n    font-size: 1.15rem !important;\r\n    flex-shrink: 0 !important;\r\n    box-shadow: 0 0 12px rgba(56, 189, 248, 0.2) !important;\r\n  }\r\n  .py-keynotes-body {\r\n    display: contents !important;\r\n  }\r\n  .py-keynotes-header {\r\n    grid-column: 2 !important;\r\n    grid-row: 1 !important;\r\n    display: flex !important;\r\n    align-items: center !important;\r\n    gap: 10px !important;\r\n    margin-bottom: 0 !important;\r\n  }\r\n  .py-keynotes-title {\r\n    font-size: 0.78rem !important;\r\n    font-weight: 800 !important;\r\n    text-transform: uppercase !important;\r\n    letter-spacing: 0.08em !important;\r\n    color: #38bdf8 !important;\r\n    font-family: inherit !important;\r\n  }\r\n  .py-keynotes-tag {\r\n    font-size: 0.68rem !important;\r\n    padding: 2px 10px !important;\r\n    border-radius: 12px !important;\r\n    background: rgba(56, 189, 248, 0.14) !important;\r\n    border: 1px solid rgba(56, 189, 248, 0.28) !important;\r\n    color: #7dd3fc !important;\r\n    font-weight: 700 !important;\r\n    font-family: inherit !important;\r\n  }\r\n  .py-keynotes-list {\r\n    grid-column: 1 / -1 !important;\r\n    grid-row: 2 !important;\r\n    margin: 0 !important;\r\n    padding: 0 !important;\r\n    list-style: none !important;\r\n    font-family: inherit !important;\r\n    width: 100% !important;\r\n  }\r\n  .py-keynotes-list li {\r\n    position: relative !important;\r\n    padding-left: 24px !important;\r\n    margin-bottom: 10px !important;\r\n    font-size: 0.85rem !important;\r\n    line-height: 1.65 !important;\r\n    color: #e2e8f0 !important;\r\n    font-family: inherit !important;\r\n    text-align: justify !important;\r\n    text-align-last: left !important;\r\n    text-justify: inter-word !important;\r\n  }\r\n  .py-keynotes-list li:last-child {\r\n    margin-bottom: 0 !important;\r\n  }\r\n  .py-keynotes-list li::before {\r\n    content: \"\" !important;\r\n    position: absolute !important;\r\n    left: 4px !important;\r\n    top: 9px !important;\r\n    width: 7px !important;\r\n    height: 7px !important;\r\n    border-radius: 50% !important;\r\n    background: #38bdf8 !important;\r\n    box-shadow: 0 0 8px rgba(56, 189, 248, 0.85) !important;\r\n  }\r\n  .py-keynotes-list li strong {\r\n    color: #f8fafc !important;\r\n    font-weight: 700 !important;\r\n  }\r\n  .py-keynotes-list li code {\r\n    font-family: 'JetBrains Mono', monospace !important;\r\n    background: rgba(56, 189, 248, 0.12) !important;\r\n    border: 1px solid rgba(56, 189, 248, 0.25) !important;\r\n    padding: 2px 6px !important;\r\n    border-radius: 5px !important;\r\n    color: #38bdf8 !important;\r\n    font-size: 0.8rem !important;\r\n    font-weight: 600 !important;\r\n  }\r\n  /* Light Theme for Keynotes */\r\n  [data-theme=\"light\"] .py-keynotes-card {\r\n    background: linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%) !important;\r\n    border: 1px solid rgba(14, 165, 233, 0.3) !important;\r\n    border-left: 4px solid #0284c7 !important;\r\n    box-shadow: 0 8px 24px -4px rgba(14, 165, 233, 0.12), inset 0 1px 0 #ffffff !important;\r\n  }\r\n  [data-theme=\"light\"] .py-keynotes-icon-wrap {\r\n    background: #e0f2fe !important;\r\n    border-color: #bae6fd !important;\r\n    box-shadow: 0 0 12px rgba(14, 165, 233, 0.18) !important;\r\n  }\r\n  [data-theme=\"light\"] .py-keynotes-title {\r\n    color: #0284c7 !important;\r\n  }\r\n  [data-theme=\"light\"] .py-keynotes-tag {\r\n    background: #e0f2fe !important;\r\n    border-color: #bae6fd !important;\r\n    color: #0369a1 !important;\r\n  }\r\n  [data-theme=\"light\"] .py-keynotes-list li {\r\n    color: #334155 !important;\r\n  }\r\n  [data-theme=\"light\"] .py-keynotes-list li::before {\r\n    background: #0284c7 !important;\r\n    box-shadow: 0 0 6px rgba(2, 132, 199, 0.5) !important;\r\n  }\r\n  [data-theme=\"light\"] .py-keynotes-list li strong {\r\n    color: #0f172a !important;\r\n  }\r\n  [data-theme=\"light\"] .py-keynotes-list li code {\r\n    background: #e0f2fe !important;\r\n    border-color: #7dd3fc !important;\r\n    color: #0369a1 !important;\r\n  }\r\n\r\n  /* ═════════════════════════════════════════════════════════════════════\r\n     COGNITIVE LEARNING & SCIENTIFIC VISUAL MODELS DESIGN SYSTEM\r\n     ═════════════════════════════════════════════════════════════════════ */\r\n\r\n  /* 🧠 10-Second Recall Hook (Mnemonic / Interview Anchor) */\r\n  .py-recall-hook {\r\n    background: linear-gradient(135deg, rgba(56, 189, 248, 0.08) 0%, rgba(168, 85, 247, 0.08) 100%);\r\n    border: 1px solid rgba(56, 189, 248, 0.25);\r\n    border-left: 4px solid #38bdf8;\r\n    border-radius: 10px;\r\n    padding: 14px 18px;\r\n    margin: 20px 0 10px 0;\r\n    display: flex;\r\n    gap: 14px;\r\n    align-items: flex-start;\r\n    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);\r\n  }\r\n  .py-recall-icon {\r\n    font-size: 1.4rem;\r\n    line-height: 1;\r\n    flex-shrink: 0;\r\n  }\r\n  .py-recall-body {\r\n    flex: 1;\r\n  }\r\n  .py-recall-header {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 8px;\r\n    margin-bottom: 4px;\r\n  }\r\n  .py-recall-title {\r\n    font-family: 'JetBrains Mono', monospace;\r\n    font-size: 0.72rem;\r\n    font-weight: 800;\r\n    text-transform: uppercase;\r\n    letter-spacing: 0.08em;\r\n    color: #38bdf8;\r\n  }\r\n  .py-recall-tag {\r\n    font-size: 0.65rem;\r\n    padding: 1px 6px;\r\n    border-radius: 4px;\r\n    background: rgba(56, 189, 248, 0.15);\r\n    color: #bae6fd;\r\n    font-weight: 600;\r\n  }\r\n  .py-recall-list {\r\n    margin: 0;\r\n    padding-left: 1.5rem;\r\n    list-style-type: disc;\r\n    font-family: 'JetBrains Mono', monospace;\r\n    font-size: 0.82rem;\r\n    color: #e2e8f0;\r\n    line-height: 1.6;\r\n  }\r\n  .py-recall-list li {\r\n    margin-bottom: 6px;\r\n  }\r\n  [data-theme=\"light\"] .py-recall-list { color: #334155; }\r\n  .py-recall-text {\r\n    font-size: 0.82rem;\r\n    line-height: 1.55;\r\n    color: #e2e8f0;\r\n    margin: 0;\r\n  }\r\n  .py-recall-text code {\r\n    font-family: 'JetBrains Mono', monospace;\r\n    background: rgba(0, 0, 0, 0.35);\r\n    padding: 2px 5px;\r\n    border-radius: 4px;\r\n    color: #38bdf8;\r\n    font-size: 0.78rem;\r\n  }\r\n\r\n  /* 💡 Visual Cognitive Model Container */\r\n  .cog-model-card {\r\n    background: rgba(15, 23, 42, 0.65);\r\n    border: 1px solid rgba(255, 255, 255, 0.08);\r\n    border-radius: 12px;\r\n    padding: 18px;\r\n    margin: 18px 0;\r\n    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);\r\n  }\r\n  .cog-model-header {\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: space-between;\r\n    margin-bottom: 14px;\r\n    padding-bottom: 10px;\r\n    border-bottom: 1px solid rgba(255, 255, 255, 0.08);\r\n  }\r\n  .cog-model-title-wrap {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 10px;\r\n  }\r\n  .cog-model-badge {\r\n    background: rgba(56, 189, 248, 0.15);\r\n    border: 1px solid rgba(56, 189, 248, 0.3);\r\n    color: #38bdf8;\r\n    font-family: 'JetBrains Mono', monospace;\r\n    font-size: 0.68rem;\r\n    font-weight: 800;\r\n    padding: 3px 8px;\r\n    border-radius: 5px;\r\n    text-transform: uppercase;\r\n  }\r\n  .cog-model-title {\r\n    font-size: 0.92rem;\r\n    font-weight: 800;\r\n    color: #f8fafc;\r\n    margin: 0;\r\n  }\r\n  .cog-model-subtitle {\r\n    font-size: 0.72rem;\r\n    color: #94a3b8;\r\n  }\r\n\r\n  /* Diagram 1: Number Line Euclidean Floor Division */\r\n  .numline-wrap {\r\n    position: relative;\r\n    padding: 30px 14px 16px 14px;\r\n    background: rgba(0, 0, 0, 0.25);\r\n    border-radius: 8px;\r\n    border: 1px solid rgba(255, 255, 255, 0.05);\r\n  }\r\n  .numline-axis {\r\n    display: flex;\r\n    justify-content: space-between;\r\n    align-items: center;\r\n    position: relative;\r\n    margin: 30px 10px 10px 10px;\r\n    height: 4px;\r\n    background: linear-gradient(90deg, #f43f5e 0%, #38bdf8 50%, #22c55e 100%);\r\n    border-radius: 2px;\r\n  }\r\n  .numline-tick {\r\n    position: relative;\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n  }\r\n  .numline-dot {\r\n    width: 12px;\r\n    height: 12px;\r\n    border-radius: 50%;\r\n    background: #0f172a;\r\n    border: 2px solid #94a3b8;\r\n    z-index: 2;\r\n  }\r\n  .numline-val {\r\n    font-family: 'JetBrains Mono', monospace;\r\n    font-size: 0.75rem;\r\n    font-weight: 700;\r\n    color: #94a3b8;\r\n    margin-top: 6px;\r\n  }\r\n  .numline-pointer-left {\r\n    position: absolute;\r\n    top: -46px;\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    transform: translateX(-50%);\r\n  }\r\n  .numline-pill {\r\n    padding: 3px 8px;\r\n    border-radius: 5px;\r\n    font-family: 'JetBrains Mono', monospace;\r\n    font-size: 0.70rem;\r\n    font-weight: 800;\r\n    white-space: nowrap;\r\n  }\r\n  .pill-danger {\r\n    background: rgba(244, 63, 94, 0.25);\r\n    border: 1px solid #f43f5e;\r\n    color: #fca5a5;\r\n  }\r\n  .pill-success {\r\n    background: rgba(34, 197, 94, 0.25);\r\n    border: 1px solid #22c55e;\r\n    color: #86efac;\r\n  }\r\n  .pill-info {\r\n    background: rgba(56, 189, 248, 0.25);\r\n    border: 1px solid #38bdf8;\r\n    color: #bae6fd;\r\n  }\r\n  .numline-arrow-down {\r\n    width: 0;\r\n    height: 0;\r\n    border-left: 5px solid transparent;\r\n    border-right: 5px solid transparent;\r\n    border-top: 6px solid #38bdf8;\r\n  }\r\n  .arrow-rose { border-top-color: #f43f5e; }\r\n  .arrow-green { border-top-color: #22c55e; }\r\n  .numline-legend {\r\n    display: flex;\r\n    flex-wrap: wrap;\r\n    gap: 16px;\r\n    margin-top: 14px;\r\n    padding-top: 12px;\r\n    border-top: 1px dashed rgba(255, 255, 255, 0.08);\r\n    font-size: 0.74rem;\r\n    color: #cbd5e1;\r\n  }\r\n  .numline-legend-item {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 6px;\r\n  }\r\n\r\n  /* Diagram 2: RAM Memory Pointer Architecture */\r\n  .ram-schematic-grid {\r\n    display: grid;\r\n    grid-template-columns: 1fr 1fr;\r\n    gap: 14px;\r\n  }\r\n  @media (max-width: 768px) {\r\n    .ram-schematic-grid { grid-template-columns: 1fr; }\r\n  }\r\n  .ram-schematic-box {\r\n    background: rgba(0, 0, 0, 0.25);\r\n    border: 1px solid rgba(255, 255, 255, 0.08);\r\n    border-radius: 8px;\r\n    padding: 14px;\r\n  }\r\n  .ram-schematic-head {\r\n    display: flex;\r\n    justify-content: space-between;\r\n    align-items: center;\r\n    margin-bottom: 10px;\r\n    padding-bottom: 8px;\r\n    border-bottom: 1px solid rgba(255, 255, 255, 0.06);\r\n  }\r\n  .ram-head-title {\r\n    font-family: 'JetBrains Mono', monospace;\r\n    font-size: 0.76rem;\r\n    font-weight: 800;\r\n  }\r\n  .ram-node-row {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 10px;\r\n    margin: 8px 0;\r\n    font-family: 'JetBrains Mono', monospace;\r\n    font-size: 0.75rem;\r\n  }\r\n  .ram-var-tag {\r\n    background: rgba(56, 189, 248, 0.15);\r\n    border: 1px solid rgba(56, 189, 248, 0.3);\r\n    color: #38bdf8;\r\n    padding: 4px 10px;\r\n    border-radius: 6px;\r\n    font-weight: 700;\r\n    width: 60px;\r\n    text-align: center;\r\n  }\r\n  .ram-arrow-connector {\r\n    color: #64748b;\r\n    font-weight: 700;\r\n  }\r\n  .ram-address-block {\r\n    flex: 1;\r\n    background: rgba(255, 255, 255, 0.03);\r\n    border: 1px solid rgba(255, 255, 255, 0.1);\r\n    border-radius: 6px;\r\n    padding: 6px 12px;\r\n    display: flex;\r\n    justify-content: space-between;\r\n    align-items: center;\r\n  }\r\n  .ram-addr-label {\r\n    font-size: 0.65rem;\r\n    color: #94a3b8;\r\n  }\r\n  .ram-addr-val {\r\n    color: #fbbf24;\r\n    font-weight: 700;\r\n  }\r\n  .ram-content-val {\r\n    color: #f8fafc;\r\n    font-weight: 700;\r\n  }\r\n\r\n  /* Diagram 3: Circuit Breaker Flowchart */\r\n  .circuit-grid {\r\n    display: grid;\r\n    grid-template-columns: 1fr 1fr;\r\n    gap: 14px;\r\n  }\r\n  @media (max-width: 768px) {\r\n    .circuit-grid { grid-template-columns: 1fr; }\r\n  }\r\n  .circuit-box {\r\n    background: rgba(0, 0, 0, 0.25);\r\n    border: 1px solid rgba(255, 255, 255, 0.08);\r\n    border-radius: 8px;\r\n    padding: 14px;\r\n  }\r\n  .circuit-step-list {\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 8px;\r\n    margin-top: 8px;\r\n  }\r\n  .circuit-step-node {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 10px;\r\n    padding: 8px 12px;\r\n    border-radius: 6px;\r\n    background: rgba(255, 255, 255, 0.03);\r\n    border: 1px solid rgba(255, 255, 255, 0.06);\r\n    font-family: 'JetBrains Mono', monospace;\r\n    font-size: 0.74rem;\r\n  }\r\n  .circuit-badge {\r\n    padding: 2px 7px;\r\n    border-radius: 4px;\r\n    font-size: 0.65rem;\r\n    font-weight: 800;\r\n    text-transform: uppercase;\r\n  }\r\n  .circuit-badge--halt {\r\n    background: rgba(244, 63, 94, 0.2);\r\n    color: #f43f5e;\r\n    border: 1px solid rgba(244, 63, 94, 0.4);\r\n  }\r\n  .circuit-badge--pass {\r\n    background: rgba(34, 197, 94, 0.2);\r\n    color: #22c55e;\r\n    border: 1px solid rgba(34, 197, 94, 0.4);\r\n  }\r\n\r\n  /* Diagram 4: Twin House Identity vs Equality */\r\n  .twin-house-grid {\r\n    display: grid;\r\n    grid-template-columns: 1fr 1fr;\r\n    gap: 14px;\r\n    margin-top: 10px;\r\n  }\r\n  @media (max-width: 640px) {\r\n    .twin-house-grid { grid-template-columns: 1fr; }\r\n  }\r\n  .twin-card {\r\n    background: rgba(0, 0, 0, 0.25);\r\n    border: 1px solid rgba(255, 255, 255, 0.08);\r\n    border-radius: 8px;\r\n    padding: 14px;\r\n    text-align: center;\r\n  }\r\n  .twin-house-icon {\r\n    font-size: 2rem;\r\n    margin-bottom: 4px;\r\n  }\r\n  .twin-house-title {\r\n    font-family: 'JetBrains Mono', monospace;\r\n    font-size: 0.84rem;\r\n    font-weight: 800;\r\n    color: #f8fafc;\r\n  }\r\n  .twin-house-addr {\r\n    font-family: 'JetBrains Mono', monospace;\r\n    font-size: 0.70rem;\r\n    color: #fbbf24;\r\n    margin-bottom: 8px;\r\n  }\r\n  .twin-furniture-box {\r\n    background: rgba(255, 255, 255, 0.04);\r\n    border: 1px dashed rgba(255, 255, 255, 0.15);\r\n    border-radius: 6px;\r\n    padding: 8px;\r\n    font-family: 'JetBrains Mono', monospace;\r\n    font-size: 0.76rem;\r\n    color: #38bdf8;\r\n    margin-bottom: 8px;\r\n  }\r\n  .twin-verdict-row {\r\n    display: flex;\r\n    justify-content: space-around;\r\n    padding-top: 8px;\r\n    border-top: 1px solid rgba(255, 255, 255, 0.08);\r\n    font-family: 'JetBrains Mono', monospace;\r\n    font-size: 0.74rem;\r\n  }\r\n\r\n  /* Diagram 5: 8-Bit Hardware Register & RBAC Switchboard */\r\n  .dip-register-grid {\r\n    display: grid;\r\n    grid-template-columns: repeat(8, 1fr);\r\n    gap: 6px;\r\n    margin: 12px 0;\r\n  }\r\n  @media (max-width: 640px) {\r\n    .dip-register-grid { grid-template-columns: repeat(4, 1fr); }\r\n  }\r\n  .dip-cell {\r\n    background: rgba(0, 0, 0, 0.35);\r\n    border: 1px solid rgba(255, 255, 255, 0.08);\r\n    border-radius: 6px;\r\n    padding: 8px 4px;\r\n    text-align: center;\r\n    font-family: 'JetBrains Mono', monospace;\r\n  }\r\n  .dip-bit-idx {\r\n    font-size: 0.62rem;\r\n    color: #64748b;\r\n    margin-bottom: 2px;\r\n  }\r\n  .dip-bit-power {\r\n    font-size: 0.72rem;\r\n    font-weight: 800;\r\n    color: #94a3b8;\r\n  }\r\n  .dip-bit-flag {\r\n    font-size: 0.62rem;\r\n    font-weight: 700;\r\n    margin: 4px 0;\r\n    height: 16px;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n  }\r\n  .dip-switch-indicator {\r\n    width: 14px;\r\n    height: 14px;\r\n    border-radius: 50%;\r\n    margin: 4px auto 0 auto;\r\n    border: 2px solid #64748b;\r\n  }\r\n  .switch-on {\r\n    background: #22c55e;\r\n    border-color: #4ade80;\r\n    box-shadow: 0 0 8px rgba(34, 197, 94, 0.6);\r\n  }\r\n  .switch-off {\r\n    background: #1e293b;\r\n    border-color: #475569;\r\n  }\r\n\r\n  /* Diagram 6: Walrus Stream Pipeline */\r\n  .walrus-flow-wrap {\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: space-between;\r\n    gap: 8px;\r\n    background: rgba(0, 0, 0, 0.25);\r\n    border: 1px solid rgba(255, 255, 255, 0.08);\r\n    border-radius: 8px;\r\n    padding: 14px;\r\n    margin-top: 10px;\r\n    overflow-x: auto;\r\n  }\r\n  .walrus-flow-step {\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    text-align: center;\r\n    min-width: 120px;\r\n  }\r\n  .walrus-step-badge {\r\n    background: rgba(168, 85, 247, 0.15);\r\n    border: 1px solid rgba(168, 85, 247, 0.3);\r\n    color: #c084fc;\r\n    font-family: 'JetBrains Mono', monospace;\r\n    font-size: 0.68rem;\r\n    font-weight: 800;\r\n    padding: 2px 8px;\r\n    border-radius: 4px;\r\n    margin-bottom: 6px;\r\n  }\r\n  .walrus-step-desc {\r\n    font-family: 'JetBrains Mono', monospace;\r\n    font-size: 0.72rem;\r\n    color: #cbd5e1;\r\n  }\r\n\r\n  /* Diagram 7: PEUMASCILA Mnemonic Ladder */\r\n  .ladder-container {\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 6px;\r\n    margin: 14px 0;\r\n  }\r\n  .ladder-rung {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 12px;\r\n    padding: 8px 14px;\r\n    border-radius: 8px;\r\n    background: rgba(255, 255, 255, 0.03);\r\n    border: 1px solid rgba(255, 255, 255, 0.07);\r\n    font-family: 'JetBrains Mono', monospace;\r\n    transition: transform 0.2s ease;\r\n  }\r\n  .ladder-rung:hover {\r\n    transform: translateX(4px);\r\n  }\r\n  .ladder-letter {\r\n    width: 24px;\r\n    height: 24px;\r\n    border-radius: 6px;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    font-size: 0.82rem;\r\n    font-weight: 900;\r\n  }\r\n  .rung-rose { background: rgba(244, 63, 94, 0.2); color: #fb7185; border: 1px solid rgba(244, 63, 94, 0.4); }\r\n  .rung-gold { background: rgba(245, 158, 11, 0.2); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.4); }\r\n  .rung-purple { background: rgba(168, 85, 247, 0.2); color: #c084fc; border: 1px solid rgba(168, 85, 247, 0.4); }\r\n  .rung-blue { background: rgba(56, 189, 248, 0.2); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.4); }\r\n  .rung-green { background: rgba(34, 197, 94, 0.2); color: #4ade80; border: 1px solid rgba(34, 197, 94, 0.4); }\r\n  .rung-muted { background: rgba(255, 255, 255, 0.05); color: #94a3b8; border: 1px solid rgba(255, 255, 255, 0.1); }\r\n  .ladder-title {\r\n    font-size: 0.80rem;\r\n    font-weight: 800;\r\n    color: #f8fafc;\r\n    width: 140px;\r\n  }\r\n  .ladder-ops {\r\n    flex: 1;\r\n    font-size: 0.74rem;\r\n    color: #94a3b8;\r\n  }\r\n  .ladder-priority {\r\n    font-size: 0.65rem;\r\n    padding: 2px 7px;\r\n    border-radius: 4px;\r\n    background: rgba(255, 255, 255, 0.05);\r\n    color: #cbd5e1;\r\n  }\r\n\r\n  /* Light mode adaptations for all cognitive learning components */\r\n  [data-theme=\"light\"] .py-recall-hook {\r\n    background: linear-gradient(135deg, rgba(2, 132, 199, 0.08) 0%, rgba(147, 51, 234, 0.08) 100%);\r\n    border-color: rgba(2, 132, 199, 0.3);\r\n    border-left-color: #0284c7;\r\n    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);\r\n  }\r\n  [data-theme=\"light\"] .py-recall-title { color: #0284c7; }\r\n  [data-theme=\"light\"] .py-recall-text { color: #1e293b; }\r\n  [data-theme=\"light\"] .py-recall-text code {\r\n    background: #f1f5f9;\r\n    color: #0369a1;\r\n    border: 1px solid #cbd5e1;\r\n  }\r\n  [data-theme=\"light\"] .cog-model-card {\r\n    background: #ffffff;\r\n    border-color: #e2e8f0;\r\n    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);\r\n  }\r\n\r\n  /* Bitmask RBAC Card */\r\n  .bitmask-grid {\r\n    display: grid;\r\n    grid-template-columns: repeat(4, 1fr);\r\n    gap: 10px;\r\n    margin-top: 12px;\r\n  }\r\n  @media (max-width: 768px) {\r\n    .bitmask-grid { grid-template-columns: repeat(2, 1fr); }\r\n  }\r\n  @media (max-width: 480px) {\r\n    .bitmask-grid { grid-template-columns: 1fr; }\r\n  }\r\n  .bitmask-cell {\r\n    background: rgba(255, 255, 255, 0.03);\r\n    border: 1px solid rgba(255, 255, 255, 0.07);\r\n    border-radius: 8px;\r\n    padding: 12px;\r\n    text-align: center;\r\n  }\r\n  .bitmask-cell-title {\r\n    font-family: 'JetBrains Mono', monospace;\r\n    font-size: 0.78rem;\r\n    font-weight: 800;\r\n  }\r\n  .bitmask-cell-title--blue { color: #38bdf8; }\r\n  .bitmask-cell-title--green { color: #34d399; }\r\n  .bitmask-cell-title--amber { color: #fbbf24; }\r\n  .bitmask-cell-title--purple { color: #c084fc; }\r\n\r\n  .bitmask-cell-sub {\r\n    font-size: 0.68rem;\r\n    color: #94a3b8;\r\n    margin-top: 4px;\r\n  }\r\n  .bitmask-actions {\r\n    display: flex;\r\n    justify-content: space-around;\r\n    margin-top: 10px;\r\n    font-family: 'JetBrains Mono', monospace;\r\n    font-size: 0.72rem;\r\n    color: #cbd5e1;\r\n  }\r\n\r\n  /* Arity Grid */\r\n  .arity-grid {\r\n    display: grid;\r\n    grid-template-columns: repeat(3, 1fr);\r\n    gap: 12px;\r\n    margin: 16px 0;\r\n  }\r\n  @media (max-width: 640px) {\r\n    .arity-grid { grid-template-columns: 1fr; }\r\n  }\r\n  .arity-card {\r\n    background: rgba(255, 255, 255, 0.03);\r\n    border: 1px solid rgba(255, 255, 255, 0.08);\r\n    border-radius: 10px;\r\n    padding: 14px;\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 8px;\r\n  }\r\n  .arity-head {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 8px;\r\n  }\r\n  .arity-badge {\r\n    background: rgba(56, 189, 248, 0.15);\r\n    border: 1px solid rgba(56, 189, 248, 0.3);\r\n    color: #38bdf8;\r\n    font-family: 'JetBrains Mono', monospace;\r\n    font-size: 0.72rem;\r\n    font-weight: 800;\r\n    width: 22px;\r\n    height: 22px;\r\n    border-radius: 6px;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n  }\r\n  .arity-name {\r\n    font-weight: 700;\r\n    font-size: 0.88rem;\r\n    color: #f8fafc;\r\n  }\r\n  .arity-desc {\r\n    font-size: 0.75rem;\r\n    color: #94a3b8;\r\n    margin: 0;\r\n    line-height: 1.4;\r\n  }\r\n  .arity-chips {\r\n    display: flex;\r\n    flex-wrap: wrap;\r\n    gap: 6px;\r\n    margin-top: 4px;\r\n  }\r\n  .arity-chip {\r\n    font-family: 'JetBrains Mono', monospace;\r\n    font-size: 0.72rem;\r\n    background: rgba(0, 0, 0, 0.3);\r\n    border: 1px solid rgba(255, 255, 255, 0.1);\r\n    border-radius: 4px;\r\n    padding: 2px 7px;\r\n    color: #e2e8f0;\r\n  }\r\n\r\n\r\n  /* Operator Classification Grid */\r\n  .op-matrix-list {\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 12px;\r\n    margin-top: 14px;\r\n  }\r\n  .op-family-card {\r\n    background: rgba(255, 255, 255, 0.02);\r\n    border: 1px solid rgba(255, 255, 255, 0.08);\r\n    border-radius: 8px;\r\n    padding: 14px;\r\n  }\r\n  .op-family-header {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 12px;\r\n    margin-bottom: 12px;\r\n  }\r\n  @media (max-width: 640px) {\r\n    .op-family-header { flex-direction: column; align-items: flex-start; gap: 6px; }\r\n  }\r\n  .op-family-desc {\r\n    font-size: 0.75rem;\r\n    color: #94a3b8;\r\n    line-height: 1.4;\r\n  }\r\n  .op-symbols-grid {\r\n    display: flex;\r\n    flex-wrap: wrap;\r\n    gap: 8px;\r\n  }\r\n  .op-symbol-box {\r\n    background: rgba(0, 0, 0, 0.3);\r\n    border: 1px solid rgba(255, 255, 255, 0.1);\r\n    border-radius: 6px;\r\n    padding: 6px 12px;\r\n    font-family: 'JetBrains Mono', monospace;\r\n    font-size: 0.85rem;\r\n    color: #f8fafc;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    min-width: 40px;\r\n    transition: all 0.2s ease;\r\n  }\r\n  .op-symbol-box:hover {\r\n    background: rgba(56, 189, 248, 0.1);\r\n    border-color: rgba(56, 189, 248, 0.4);\r\n    color: #38bdf8;\r\n    transform: translateY(-2px);\r\n  }\r\n  [data-theme=\"light\"] .op-family-card {\r\n    background: #f8fafc;\r\n    border-color: #e2e8f0;\r\n  }\r\n  [data-theme=\"light\"] .op-family-desc {\r\n    color: #475569;\r\n  }\r\n  [data-theme=\"light\"] .op-symbol-box {\r\n    background: #ffffff;\r\n    border-color: #cbd5e1;\r\n    color: #0f172a;\r\n  }\r\n  [data-theme=\"light\"] .op-symbol-box:hover {\r\n    background: #f0f9ff;\r\n    border-color: #38bdf8;\r\n    color: #0284c7;\r\n  }\r\n\r\n  /* Category pills */\r\n  .fam-chip {\r\n    display: inline-block;\r\n    padding: 2px 8px;\r\n    border-radius: 4px;\r\n    font-size: 0.72rem;\r\n    font-weight: 700;\r\n    font-family: 'Outfit', sans-serif;\r\n  }\r\n  .fam-chip--arith { background: rgba(56, 189, 248, 0.15); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.3); }\r\n  .fam-chip--assign { background: rgba(168, 85, 247, 0.15); color: #c084fc; border: 1px solid rgba(168, 85, 247, 0.3); }\r\n  .fam-chip--compare { background: rgba(52, 211, 153, 0.15); color: #34d399; border: 1px solid rgba(52, 211, 153, 0.3); }\r\n  .fam-chip--logic { background: rgba(251, 191, 36, 0.15); color: #fbbf24; border: 1px solid rgba(251, 191, 36, 0.3); }\r\n  .fam-chip--ident { background: rgba(244, 63, 94, 0.15); color: #fb7185; border: 1px solid rgba(244, 63, 94, 0.3); }\r\n  .fam-chip--member { background: rgba(14, 165, 233, 0.15); color: #38bdf8; border: 1px solid rgba(14, 165, 233, 0.3); }\r\n  .fam-chip--bitwise { background: rgba(234, 88, 12, 0.15); color: #fb923c; border: 1px solid rgba(234, 88, 12, 0.3); }\r\n  .fam-chip--cond { background: rgba(16, 185, 129, 0.15); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.3); }\r\n  .fam-chip--spotlight {\r\n    background: rgba(245, 158, 11, 0.18);\r\n    color: #fbbf24;\r\n    border: 1px solid rgba(245, 158, 11, 0.45);\r\n    letter-spacing: 0.03em;\r\n    font-size: 0.72rem;\r\n    font-weight: 700;\r\n    padding: 3px 9px;\r\n    border-radius: 6px;\r\n    vertical-align: middle;\r\n    display: inline-flex;\r\n    align-items: center;\r\n    gap: 4px;\r\n    box-shadow: 0 1px 4px rgba(245, 158, 11, 0.1);\r\n  }\r\n  [data-theme=\"light\"] .fam-chip--spotlight {\r\n    background: rgba(245, 158, 11, 0.14);\r\n    color: #b45309;\r\n    border-color: rgba(245, 158, 11, 0.35);\r\n  }\r\n\r\n  /* Subcards with divider */\r\n  .topic-subcard {\r\n    margin-top: 22px;\r\n    padding-top: 16px;\r\n    border-top: 1px dashed rgba(255, 255, 255, 0.1);\r\n  }\r\n\r\n  /* Table and Section Header Utilities (100% Class-Driven, 0 Inline Styles) */\r\n  .table-header-wrap {\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: space-between;\r\n    gap: 8px;\r\n    margin-bottom: 8px;\r\n    padding: 0 4px;\r\n  }\r\n  .table-header-title {\r\n    margin: 0;\r\n    font-size: 0.95rem;\r\n    font-weight: 800;\r\n    letter-spacing: -0.01em;\r\n    flex: 1;\r\n  }\r\n  .subcard-header-with-audio {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 8px;\r\n    margin-bottom: 8px;\r\n  }\r\n  .subcard-header-title {\r\n    margin: 0;\r\n    font-size: 0.95rem;\r\n    font-weight: 800;\r\n    flex: 1;\r\n  }\r\n  .pipeline-flow-box {\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: space-between;\r\n    padding: 12px 16px;\r\n    background: rgba(255, 255, 255, 0.02);\r\n    border: 1px solid rgba(255, 255, 255, 0.06);\r\n    border-radius: 8px;\r\n    font-family: 'JetBrains Mono', monospace;\r\n    font-size: 0.75rem;\r\n    margin-top: 6px;\r\n    overflow-x: auto;\r\n  }\r\n  .pipeline-flow-tip {\r\n    font-size: 0.75rem;\r\n    color: #94a3b8;\r\n    margin-top: 8px;\r\n    line-height: 1.5;\r\n  }\r\n  .tok-blue { color: #38bdf8; }\r\n  .tok-green { color: #34d399; }\r\n  .tok-amber { color: #fbbf24; }\r\n  .tok-purple { color: #a855f7; }\r\n  .tok-rose { color: #f43f5e; }\r\n  .tok-muted { color: #64748b; }\r\n\r\n  /* 3-Column Complexity Grid */\r\n  .complexity-grid {\r\n    display: grid;\r\n    grid-template-columns: repeat(3, 1fr);\r\n    gap: 10px;\r\n    margin-top: 6px;\r\n  }\r\n  @media (max-width: 640px) {\r\n    .complexity-grid { grid-template-columns: 1fr; }\r\n  }\r\n  .complexity-cell {\r\n    background: rgba(255, 255, 255, 0.03);\r\n    border: 1px solid rgba(255, 255, 255, 0.07);\r\n    border-radius: 8px;\r\n    padding: 12px;\r\n    text-align: center;\r\n  }\r\n  .complexity-expr {\r\n    font-family: 'JetBrains Mono', monospace;\r\n    font-size: 0.70rem;\r\n    color: #94a3b8;\r\n  }\r\n  .complexity-val {\r\n    font-family: 'JetBrains Mono', monospace;\r\n    font-size: 0.95rem;\r\n    font-weight: 800;\r\n    margin: 6px 0;\r\n  }\r\n  .complexity-desc {\r\n    font-size: 0.70rem;\r\n    color: #64748b;\r\n  }\r\n\r\n  /* Dual Short-Circuit Rule Grid */\r\n  .dual-rule-grid {\r\n    display: grid;\r\n    grid-template-columns: 1fr 1fr;\r\n    gap: 12px;\r\n    margin-top: 6px;\r\n  }\r\n  @media (max-width: 640px) {\r\n    .dual-rule-grid { grid-template-columns: 1fr; }\r\n  }\r\n  .dual-rule-box {\r\n    background: rgba(255, 255, 255, 0.03);\r\n    border: 1px solid rgba(255, 255, 255, 0.07);\r\n    border-radius: 8px;\r\n    padding: 12px;\r\n  }\r\n  .dual-rule-title {\r\n    font-family: 'JetBrains Mono', monospace;\r\n    font-size: 0.78rem;\r\n    font-weight: 700;\r\n    margin-bottom: 6px;\r\n  }\r\n  .dual-rule-text {\r\n    font-family: 'JetBrains Mono', monospace;\r\n    font-size: 0.75rem;\r\n    color: #cbd5e1;\r\n    line-height: 1.6;\r\n  }\r\n\r\n  /* Interview Q&A Layout */\r\n  .interview-header-title {\r\n    color: #38bdf8;\r\n    font-size: 1rem;\r\n    margin-bottom: 14px;\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 8px;\r\n  }\r\n  .interview-divider {\r\n    border: none;\r\n    border-top: 1px dashed rgba(255, 255, 255, 0.1);\r\n    margin: 12px 0;\r\n  }\r\n\n\n  /* ═════════════════════════════════════════════════════════════════════\n     DAY 04 SPECIFIC EXTENSIONS: FLAWLESS TABLE SYSTEM & SINGLE-COLUMN FREEZE\n     ═════════════════════════════════════════════════════════════════════ */\n  #day04FundamentalsSection {\n    margin-top: 4px !important;\n  }\n  #day04FundamentalsSection .heading-box-wrap {\n    margin-top: 0 !important;\n  }\n\n  /* Section 01 Taxonomy Matrix Cards & Descriptions */\n  #day04FundamentalsSection .op-family-card {\n    padding: 16px 18px !important;\n  }\n  #day04FundamentalsSection .op-family-header {\n    display: flex !important;\n    flex-direction: column !important;\n    align-items: flex-start !important;\n    gap: 8px !important;\n    margin-bottom: 12px !important;\n    width: 100% !important;\n  }\n  #day04FundamentalsSection .fam-chip {\n    display: inline-flex !important;\n    align-items: center !important;\n    align-self: flex-start !important;\n    flex-shrink: 0 !important;\n    margin: 0 !important;\n  }\n  #day04FundamentalsSection .op-family-desc {\n    display: block !important;\n    width: 100% !important;\n    box-sizing: border-box !important;\n    font-size: 0.83rem !important;\n    line-height: 1.6 !important;\n    color: #94a3b8 !important;\n    margin: 0 !important;\n    text-align: justify !important;\n    text-align-last: left !important;\n    text-justify: inter-word !important;\n  }\n  #day04FundamentalsSection .op-family-desc code {\n    font-family: 'JetBrains Mono', monospace !important;\n    font-size: 0.77rem !important;\n    padding: 1px 5px !important;\n    background: rgba(56, 189, 248, 0.1) !important;\n    border: 1px solid rgba(56, 189, 248, 0.25) !important;\n    border-radius: 4px !important;\n    color: #38bdf8 !important;\n    white-space: nowrap !important;\n  }\n  #day04FundamentalsSection .op-family-desc strong,\n  #day04FundamentalsSection .op-family-desc em {\n    color: #e2e8f0 !important;\n    font-weight: 600 !important;\n  }\n  [data-theme=\"light\"] #day04FundamentalsSection .op-family-desc {\n    color: #334155 !important;\n  }\n  [data-theme=\"light\"] #day04FundamentalsSection .op-family-desc code {\n    background: #e0f2fe !important;\n    border-color: #7dd3fc !important;\n    color: #0284c7 !important;\n  }\n  [data-theme=\"light\"] #day04FundamentalsSection .op-family-desc strong,\n  [data-theme=\"light\"] #day04FundamentalsSection .op-family-desc em {\n    color: #0f172a !important;\n  }\n\n  /* Key Notes Justified Text Alignment */\n  .py-keynotes-list li {\n    text-align: justify !important;\n    text-align-last: left !important;\n    text-justify: inter-word !important;\n  }\n\n  /* Table Header Actions (Search Input + Audio Play Button) */\n  .table-header-actions {\n    display: flex !important;\n    align-items: center !important;\n    gap: 10px !important;\n  }\n\n  /* ═════════════════════════════════════════════════════════════════════\n     1. UNIVERSAL 2D FROZEN TABLE SYSTEM (VERTICAL & HORIZONTAL FREEZE)\n     ═════════════════════════════════════════════════════════════════════ */\n  .db-mock-table-wrap {\n    position: relative !important;\n    overflow: auto !important;\n    overflow-x: auto !important;\n    overflow-y: auto !important;\n    max-height: 520px !important;\n    -webkit-overflow-scrolling: touch !important;\n    border-radius: 12px !important;\n    border: 1px solid rgba(56, 189, 248, 0.25) !important;\n    background: #090e1a !important;\n    box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.35) !important;\n    margin: 16px 0 !important;\n  }\n  .db-mock-table-wrap::-webkit-scrollbar {\n    width: 8px !important;\n    height: 8px !important;\n  }\n  .db-mock-table-wrap::-webkit-scrollbar-track {\n    background: #0d1527 !important;\n    border-radius: 4px !important;\n  }\n  .db-mock-table-wrap::-webkit-scrollbar-thumb {\n    background: rgba(56, 189, 248, 0.35) !important;\n    border-radius: 4px !important;\n  }\n  .db-mock-table-wrap::-webkit-scrollbar-thumb:hover {\n    background: rgba(56, 189, 248, 0.6) !important;\n  }\n\n  .db-table-mock {\n    border-collapse: separate !important;\n    border-spacing: 0 !important;\n    overflow: visible !important;\n    margin: 0 !important;\n    font-size: 0.85rem !important;\n    width: 100% !important;\n    table-layout: auto !important;\n  }\n\n  /* Override any residual 80px restrictions from day02 arith-sticky-table */\n  .db-table-mock th:nth-child(1),\n  .db-table-mock td:nth-child(1) {\n    max-width: none !important;\n  }\n\n  /* Universal Sticky Headers for Vertical Scrolling across ALL Day 04 Tables */\n  .db-table-mock thead th {\n    position: -webkit-sticky !important;\n    position: sticky !important;\n    top: 0 !important;\n    z-index: 20 !important;\n    background-color: #131d35 !important;\n    color: #e2e8f0 !important;\n    font-weight: 700 !important;\n    font-size: 0.82rem !important;\n    letter-spacing: 0.02em !important;\n    text-transform: none !important;\n    padding: 13px 16px !important;\n    border-bottom: 2px solid rgba(56, 189, 248, 0.35) !important;\n    box-sizing: border-box !important;\n    vertical-align: middle !important;\n  }\n\n  /* Top-Left Corner Header (Intersection of Vertical Freeze & Horizontal Freeze) */\n  .db-table-mock thead th:nth-child(1) {\n    position: -webkit-sticky !important;\n    position: sticky !important;\n    top: 0 !important;\n    left: 0 !important;\n    z-index: 30 !important;\n    background-color: #111a30 !important;\n    border-right: 2px solid rgba(56, 189, 248, 0.38) !important;\n    border-bottom: 2px solid rgba(56, 189, 248, 0.38) !important;\n    box-shadow: 4px 4px 14px -2px rgba(0, 0, 0, 0.55) !important;\n    color: #f8fafc !important;\n  }\n\n  /* Body Frozen Column 1 (Horizontal Freeze ONLY - scrolls vertically with rows) */\n  .db-table-mock tbody td:nth-child(1) {\n    position: -webkit-sticky !important;\n    position: sticky !important;\n    left: 0 !important;\n    top: auto !important;\n    z-index: 10 !important;\n    box-sizing: border-box !important;\n    background-color: #0d1527 !important;\n    border-right: 2px solid rgba(56, 189, 248, 0.38) !important;\n    box-shadow: 4px 0 14px -2px rgba(0, 0, 0, 0.55) !important;\n    text-align: left !important;\n    padding: 12px 16px !important;\n    vertical-align: middle !important;\n    white-space: nowrap !important;\n  }\n\n  /* Universal Sticky Headers for Columns 2, 3, 4 (Frozen Vertically at top:0, fluid horizontally) */\n  .db-table-mock thead th:nth-child(2),\n  .db-table-mock thead th:nth-child(3),\n  .db-table-mock thead th:nth-child(4) {\n    position: -webkit-sticky !important;\n    position: sticky !important;\n    top: 0 !important;\n    left: auto !important;\n    z-index: 20 !important;\n    box-shadow: none !important;\n    border-right: 1px solid rgba(255, 255, 255, 0.08) !important;\n    padding: 13px 16px !important;\n    vertical-align: middle !important;\n  }\n\n  /* Universal Un-frozen Body Columns 2, 3, 4 (Scrolls fluidly in both dimensions) */\n  .db-table-mock tbody td:nth-child(2),\n  .db-table-mock tbody td:nth-child(3),\n  .db-table-mock tbody td:nth-child(4) {\n    position: static !important;\n    left: auto !important;\n    z-index: 1 !important;\n    box-shadow: none !important;\n    border-right: 1px solid rgba(255, 255, 255, 0.06) !important;\n    padding: 12px 16px !important;\n    vertical-align: middle !important;\n  }\n  .db-table-mock thead th:last-child,\n  .db-table-mock tbody td:last-child {\n    border-right: none !important;\n  }\n\n  /* General TD Styling */\n  .db-table-mock td {\n    padding: 12px 16px !important;\n    box-sizing: border-box !important;\n    vertical-align: middle !important;\n    white-space: normal !important;\n    word-break: break-word !important;\n    overflow-wrap: anywhere !important;\n    border-bottom: 1px solid rgba(255, 255, 255, 0.06) !important;\n  }\n\n  /* ══ ZERO-OVERLAP FROZEN COLUMN 1 ROW HOVER (DARK MODE) - 100% OPAQUE SOLID ══ */\n  html[data-theme=\"dark\"] .db-table-mock tbody tr:hover td:nth-child(1),\n  :root:not([data-theme=\"light\"]) .db-table-mock tbody tr:hover td:nth-child(1),\n  [data-theme=\"dark\"] .db-table-mock tbody tr:hover td:nth-child(1),\n  .db-table-mock tbody tr:hover td:nth-child(1) {\n    background-color: #162038 !important;\n    background: #162038 !important;\n    opacity: 1 !important;\n    z-index: 15 !important;\n    border-right: 2px solid rgba(56, 189, 248, 0.5) !important;\n  }\n\n  /* Regular Data Columns (Col 2, 3, 4) Hover Tint - EXCLUDES Column 1 */\n  html[data-theme=\"dark\"] .db-table-mock tbody tr:hover td:not(:first-child),\n  :root:not([data-theme=\"light\"]) .db-table-mock tbody tr:hover td:not(:first-child),\n  [data-theme=\"dark\"] .db-table-mock tbody tr:hover td:not(:first-child),\n  .db-table-mock tbody tr:hover td:not(:first-child) {\n    background-color: rgba(56, 189, 248, 0.05) !important;\n  }\n\n  /* Code Chips inside Frozen Column 1 */\n  .db-table-mock td:nth-child(1) code {\n    display: inline-flex !important;\n    align-items: center !important;\n    max-width: 100% !important;\n    min-height: 28px !important;\n    padding: 4px 10px !important;\n    font-family: 'JetBrains Mono', 'Fira Code', monospace !important;\n    font-weight: 700 !important;\n    font-size: 0.82rem !important;\n    background: rgba(56, 189, 248, 0.12) !important;\n    border: 1px solid rgba(56, 189, 248, 0.35) !important;\n    border-radius: 6px !important;\n    color: #38bdf8 !important;\n    white-space: nowrap !important;\n    letter-spacing: -0.01em !important;\n    box-sizing: border-box !important;\n  }\n\n  /* Code tags in regular columns (Col 2, 3, 4) - Flawless Wrapping, No Cropping */\n  .db-table-mock td code,\n  .db-table-mock td:nth-child(2) code,\n  .db-table-mock td:nth-child(3) code,\n  .db-table-mock td:nth-child(4) code {\n    font-family: 'JetBrains Mono', 'Fira Code', monospace !important;\n    font-size: 0.81rem !important;\n    padding: 3px 8px !important;\n    border-radius: 5px !important;\n    background: rgba(15, 23, 42, 0.7) !important;\n    border: 1px solid rgba(255, 255, 255, 0.12) !important;\n    color: #f1f5f9 !important;\n    display: inline-block !important;\n    max-width: 100% !important;\n    white-space: pre-wrap !important;\n    word-break: break-word !important;\n    overflow-wrap: anywhere !important;\n    line-height: 1.45 !important;\n    box-sizing: border-box !important;\n  }\n\n  /* ── TABLE 1: SLICING TABLE (Section 02) ── */\n  .db-table-mock.slicing-table {\n    min-width: 1180px !important;\n  }\n  .slicing-table th:nth-child(1), .slicing-table td:nth-child(1) {\n    width: 180px !important;\n    min-width: 180px !important;\n  }\n  .slicing-table th:nth-child(2), .slicing-table td:nth-child(2) {\n    min-width: 200px !important;\n    white-space: nowrap !important;\n  }\n  .slicing-table th:nth-child(3), .slicing-table td:nth-child(3) {\n    min-width: 410px !important;\n  }\n  .slicing-table th:nth-child(4), .slicing-table td:nth-child(4) {\n    min-width: 390px !important;\n  }\n\n  /* ── TABLE 2: UNPACK TABLE (Section 03) ── */\n  .db-table-mock.unpack-table {\n    min-width: 1530px !important;\n  }\n  .unpack-table th:nth-child(1), .unpack-table td:nth-child(1) {\n    width: 210px !important;\n    min-width: 210px !important;\n  }\n  .unpack-table th:nth-child(2), .unpack-table td:nth-child(2) {\n    min-width: 420px !important;\n  }\n  .unpack-table th:nth-child(3), .unpack-table td:nth-child(3) {\n    min-width: 480px !important;\n  }\n  .unpack-table th:nth-child(4), .unpack-table td:nth-child(4) {\n    min-width: 420px !important;\n  }\n\n  /* ── TABLE 3: MODIFY TABLE (Section 04) ── */\n  .db-table-mock.modify-table {\n    min-width: 1240px !important;\n  }\n  .modify-table th:nth-child(1), .modify-table td:nth-child(1) {\n    width: 230px !important;\n    min-width: 230px !important;\n  }\n  .modify-table th:nth-child(2), .modify-table td:nth-child(2) {\n    min-width: 230px !important;\n  }\n  .modify-table th:nth-child(3), .modify-table td:nth-child(3) {\n    min-width: 430px !important;\n  }\n  .modify-table th:nth-child(4), .modify-table td:nth-child(4) {\n    min-width: 350px !important;\n  }\n\n  /* ── TABLE 4: ADD METHODS TABLE (Section 05) ── */\n  .db-table-mock.add-method-table {\n    min-width: 1260px !important;\n  }\n  .add-method-table th:nth-child(1), .add-method-table td:nth-child(1) {\n    width: 210px !important;\n    min-width: 210px !important;\n  }\n  .add-method-table th:nth-child(2), .add-method-table td:nth-child(2) {\n    min-width: 320px !important;\n  }\n  .add-method-table th:nth-child(3), .add-method-table td:nth-child(3) {\n    min-width: 390px !important;\n  }\n  .add-method-table th:nth-child(4), .add-method-table td:nth-child(4) {\n    min-width: 340px !important;\n  }\n\n  /* ── TABLE 5: REMOVE METHODS TABLE (Section 06) ── */\n  .db-table-mock.remove-table {\n    min-width: 1320px !important;\n  }\n  .remove-table th:nth-child(1), .remove-table td:nth-child(1) {\n    width: 210px !important;\n    min-width: 210px !important;\n  }\n  .remove-table th:nth-child(2), .remove-table td:nth-child(2) {\n    min-width: 220px !important;\n  }\n  .remove-table th:nth-child(3), .remove-table td:nth-child(3) {\n    min-width: 270px !important;\n  }\n  .remove-table th:nth-child(4), .remove-table td:nth-child(4) {\n    min-width: 620px !important;\n  }\n\n  /* ── TABLE 6: COPY TABLE (Section 07) ── */\n  .db-table-mock.copy-table {\n    min-width: 1280px !important;\n  }\n  .copy-table th:nth-child(1), .copy-table td:nth-child(1) {\n    width: 220px !important;\n    min-width: 220px !important;\n  }\n  .copy-table th:nth-child(2), .copy-table td:nth-child(2) {\n    min-width: 290px !important;\n  }\n  .copy-table th:nth-child(3), .copy-table td:nth-child(3) {\n    min-width: 270px !important;\n  }\n  .copy-table th:nth-child(4), .copy-table td:nth-child(4) {\n    min-width: 500px !important;\n  }\n\n  /* ── TABLE 7: ANTI-PATTERN TABLE (Section 08) ── */\n  .db-table-mock.anti-pattern-table {\n    min-width: 1400px !important;\n  }\n  .anti-pattern-table thead th:nth-child(1) {\n    position: -webkit-sticky !important;\n    position: sticky !important;\n    top: 0 !important;\n    left: 0 !important;\n    z-index: 25 !important;\n    background-color: #1a162b !important;\n    border-right: 2px solid rgba(244, 63, 94, 0.5) !important;\n    border-bottom: 2px solid rgba(244, 63, 94, 0.5) !important;\n    color: #fca5a5 !important;\n  }\n  .anti-pattern-table tbody td:nth-child(1) {\n    position: -webkit-sticky !important;\n    position: sticky !important;\n    left: 0 !important;\n    top: auto !important;\n    z-index: 10 !important;\n    width: 280px !important;\n    min-width: 280px !important;\n    box-sizing: border-box !important;\n    background-color: #0d1527 !important;\n    border-right: 2px solid rgba(244, 63, 94, 0.45) !important;\n    box-shadow: 4px 0 14px -2px rgba(0, 0, 0, 0.55) !important;\n    text-align: left !important;\n    padding: 12px 16px !important;\n    white-space: normal !important;\n    word-break: break-word !important;\n    vertical-align: middle !important;\n  }\n  html[data-theme=\"dark\"] .db-table-mock.anti-pattern-table tbody tr:hover td:nth-child(1),\n  :root:not([data-theme=\"light\"]) .db-table-mock.anti-pattern-table tbody tr:hover td:nth-child(1),\n  [data-theme=\"dark\"] .db-table-mock.anti-pattern-table tbody tr:hover td:nth-child(1),\n  .anti-pattern-table tbody tr:hover td:nth-child(1) {\n    background-color: #1a1e2e !important;\n    background: #1a1e2e !important;\n    opacity: 1 !important;\n    z-index: 15 !important;\n    border-right: 2px solid rgba(244, 63, 94, 0.55) !important;\n  }\n  .anti-pattern-table td:nth-child(1) code,\n  .anti-pattern-table td:nth-child(1) code.ap-code-bug {\n    display: inline-block !important;\n    max-width: 100% !important;\n    white-space: pre-wrap !important;\n    word-break: break-word !important;\n    overflow-wrap: anywhere !important;\n    background: rgba(244, 63, 94, 0.12) !important;\n    border: 1px solid rgba(244, 63, 94, 0.35) !important;\n    color: #fda4af !important;\n    font-size: 0.82rem !important;\n    line-height: 1.45 !important;\n    padding: 4px 9px !important;\n    border-radius: 5px !important;\n  }\n  .anti-pattern-table th:nth-child(2), .anti-pattern-table td:nth-child(2) {\n    min-width: 290px !important;\n  }\n  .anti-pattern-table td:nth-child(2) .ap-result-bad {\n    color: #fb7185 !important;\n    font-weight: 700 !important;\n  }\n  .anti-pattern-table th:nth-child(3), .anti-pattern-table td:nth-child(3) {\n    min-width: 430px !important;\n  }\n  .anti-pattern-table th:nth-child(4), .anti-pattern-table td:nth-child(4) {\n    min-width: 400px !important;\n  }\n  .anti-pattern-table td:nth-child(4) code,\n  .anti-pattern-table td:nth-child(4) code.ap-code-fix {\n    display: inline-block !important;\n    max-width: 100% !important;\n    white-space: pre-wrap !important;\n    word-break: break-word !important;\n    overflow-wrap: anywhere !important;\n    background: rgba(16, 185, 129, 0.12) !important;\n    border: 1px solid rgba(16, 185, 129, 0.35) !important;\n    color: #6ee7b7 !important;\n    font-size: 0.81rem !important;\n    line-height: 1.45 !important;\n    padding: 4px 9px !important;\n    border-radius: 5px !important;\n  }\n\n  /* ── TABLE 8: SORT & SEARCH TABLE (Section 09) ── */\n  .db-table-mock.sort-table {\n    min-width: 1240px !important;\n  }\n  .sort-table th:nth-child(1), .sort-table td:nth-child(1) {\n    width: 210px !important;\n    min-width: 210px !important;\n  }\n  .sort-table th:nth-child(2), .sort-table td:nth-child(2) {\n    min-width: 280px !important;\n  }\n  .sort-table th:nth-child(3), .sort-table td:nth-child(3) {\n    min-width: 310px !important;\n  }\n  .sort-table th:nth-child(4), .sort-table td:nth-child(4) {\n    min-width: 440px !important;\n  }\n\n  /* ══ LIGHT THEME ADAPTATION FOR ALL TABLES ══ */\n  [data-theme=\"light\"] .db-mock-table-wrap {\n    border: 1px solid #cbd5e1 !important;\n    background: #ffffff !important;\n    box-shadow: 0 4px 16px -2px rgba(15, 23, 42, 0.05) !important;\n  }\n  [data-theme=\"light\"] .db-mock-table-wrap::-webkit-scrollbar-track {\n    background: #f1f5f9 !important;\n  }\n  [data-theme=\"light\"] .db-mock-table-wrap::-webkit-scrollbar-thumb {\n    background: #94a3b8 !important;\n  }\n  [data-theme=\"light\"] .db-mock-table-wrap::-webkit-scrollbar-thumb:hover {\n    background: #64748b !important;\n  }\n\n  [data-theme=\"light\"] .db-table-mock thead th {\n    background-color: #f1f5f9 !important;\n    color: #0f172a !important;\n    border-bottom: 2px solid #cbd5e1 !important;\n  }\n  [data-theme=\"light\"] .db-table-mock td {\n    border-bottom: 1px solid #f1f5f9 !important;\n    color: #334155 !important;\n  }\n\n  /* Light Theme Top-Left Header Cell (Intersection) */\n  [data-theme=\"light\"] .db-table-mock thead th:nth-child(1) {\n    background-color: #eef2f6 !important;\n    border-right: 2px solid #cbd5e1 !important;\n    border-bottom: 2px solid #cbd5e1 !important;\n    box-shadow: 4px 4px 10px -2px rgba(15, 23, 42, 0.08) !important;\n    color: #0f172a !important;\n  }\n\n  /* Light Theme Sticky Body Cells (Column 1) - SOLID OPAQUE WHITE */\n  [data-theme=\"light\"] .db-table-mock tbody td:nth-child(1) {\n    background-color: #ffffff !important;\n    border-right: 2px solid #cbd5e1 !important;\n    box-shadow: 4px 0 10px -2px rgba(0, 0, 0, 0.08) !important;\n    color: #0f172a !important;\n  }\n\n  /* Light Theme Frozen Column 1 Hover - SOLID OPAQUE */\n  html[data-theme=\"light\"] .db-table-mock tbody tr:hover td:nth-child(1),\n  [data-theme=\"light\"] .db-table-mock tbody tr:hover td:nth-child(1) {\n    background-color: #f8fafc !important;\n    background: #f8fafc !important;\n    opacity: 1 !important;\n    z-index: 15 !important;\n    border-right: 2px solid #cbd5e1 !important;\n  }\n  html[data-theme=\"light\"] .db-table-mock tbody tr:hover td:not(:first-child),\n  [data-theme=\"light\"] .db-table-mock tbody tr:hover td:not(:first-child) {\n    background-color: #f8fafc !important;\n  }\n\n  /* Light Theme Code Chips in Column 1 */\n  [data-theme=\"light\"] .db-table-mock td:nth-child(1) code {\n    background: #e0f2fe !important;\n    border-color: #7dd3fc !important;\n    color: #0284c7 !important;\n  }\n\n  /* Light Theme Sticky Headers for Columns 2, 3, 4 (SOLID OPAQUE) */\n  [data-theme=\"light\"] .db-table-mock thead th:nth-child(2),\n  [data-theme=\"light\"] .db-table-mock thead th:nth-child(3),\n  [data-theme=\"light\"] .db-table-mock thead th:nth-child(4) {\n    background-color: #f1f5f9 !important;\n    border-right-color: #cbd5e1 !important;\n    color: #0f172a !important;\n  }\n\n  /* Light Theme Body Cells for Columns 2, 3, 4 */\n  [data-theme=\"light\"] .db-table-mock tbody td:nth-child(2),\n  [data-theme=\"light\"] .db-table-mock tbody td:nth-child(3),\n  [data-theme=\"light\"] .db-table-mock tbody td:nth-child(4) {\n    border-right-color: #e2e8f0 !important;\n    background-color: transparent !important;\n  }\n\n  [data-theme=\"light\"] .db-table-mock td code,\n  [data-theme=\"light\"] .db-table-mock td:nth-child(2) code,\n  [data-theme=\"light\"] .db-table-mock td:nth-child(3) code,\n  [data-theme=\"light\"] .db-table-mock td:nth-child(4) code {\n    background: #f1f5f9 !important;\n    border-color: #cbd5e1 !important;\n    color: #0f172a !important;\n  }\n\n  /* Light Theme Anti-Pattern Table */\n  [data-theme=\"light\"] .db-table-mock.anti-pattern-table thead th {\n    background-color: #fef2f2 !important;\n    border-bottom: 2px solid #fecdd3 !important;\n    color: #991b1b !important;\n  }\n  [data-theme=\"light\"] .db-table-mock.anti-pattern-table thead th:nth-child(1) {\n    background-color: #fee2e2 !important;\n    border-right: 2px solid #fecdd3 !important;\n    border-bottom: 2px solid #fecdd3 !important;\n    box-shadow: 4px 4px 10px -2px rgba(239, 68, 68, 0.1) !important;\n    color: #991b1b !important;\n  }\n  [data-theme=\"light\"] .db-table-mock.anti-pattern-table tbody td:nth-child(1) {\n    background-color: #ffffff !important;\n    border-right: 2px solid rgba(244, 63, 94, 0.35) !important;\n    box-shadow: 4px 0 10px -2px rgba(0, 0, 0, 0.08) !important;\n  }\n  [data-theme=\"light\"] .db-table-mock.anti-pattern-table td:nth-child(1) code.ap-code-bug {\n    background: #fff1f2 !important;\n    border-color: #fecdd3 !important;\n    color: #e11d48 !important;\n  }\n  html[data-theme=\"light\"] .db-table-mock.anti-pattern-table tbody tr:hover td:nth-child(1),\n  [data-theme=\"light\"] .db-table-mock.anti-pattern-table tbody tr:hover td:nth-child(1) {\n    background-color: #fff1f2 !important;\n    background: #fff1f2 !important;\n    opacity: 1 !important;\n    z-index: 15 !important;\n    border-right: 2px solid rgba(244, 63, 94, 0.35) !important;\n  }\n  [data-theme=\"light\"] .anti-pattern-table td:nth-child(2) .ap-result-bad {\n    color: #e11d48 !important;\n  }\n  [data-theme=\"light\"] .anti-pattern-table td:nth-child(4) code.ap-code-fix {\n    background: #ecfdf5 !important;\n    border-color: #a7f3d0 !important;\n    color: #059669 !important;\n  }\n\n  /* 3. SEMANTIC TOKENS & BADGES */\n  .tbl-arrow {\n    display: inline-block !important;\n    margin: 0 6px !important;\n    color: #38bdf8 !important;\n    font-weight: 700 !important;\n    user-select: none !important;\n  }\n  .tbl-ret-str {\n    display: inline-block !important;\n    padding: 1px 6px !important;\n    font-family: 'JetBrains Mono', monospace !important;\n    font-size: 0.80rem !important;\n    font-weight: 600 !important;\n    background: rgba(16, 185, 129, 0.12) !important;\n    border: 1px solid rgba(16, 185, 129, 0.3) !important;\n    border-radius: 4px !important;\n    color: #34d399 !important;\n    white-space: nowrap !important;\n  }\n  .tbl-ret-num {\n    display: inline-block !important;\n    padding: 1px 6px !important;\n    font-family: 'JetBrains Mono', monospace !important;\n    font-size: 0.80rem !important;\n    font-weight: 600 !important;\n    background: rgba(245, 158, 11, 0.12) !important;\n    border: 1px solid rgba(245, 158, 11, 0.3) !important;\n    border-radius: 4px !important;\n    color: #fbbf24 !important;\n    white-space: nowrap !important;\n  }\n  .tbl-ret-list,\n  .tbl-ret-tuple {\n    display: inline-block !important;\n    padding: 1px 6px !important;\n    font-family: 'JetBrains Mono', monospace !important;\n    font-size: 0.80rem !important;\n    font-weight: 600 !important;\n    background: rgba(168, 85, 247, 0.12) !important;\n    border: 1px solid rgba(168, 85, 247, 0.3) !important;\n    border-radius: 4px !important;\n    color: #c084fc !important;\n    white-space: nowrap !important;\n  }\n  .tbl-ret-bool {\n    display: inline-block !important;\n    padding: 1px 7px !important;\n    font-family: 'JetBrains Mono', monospace !important;\n    font-size: 0.76rem !important;\n    font-weight: 700 !important;\n    border-radius: 4px !important;\n    white-space: nowrap !important;\n    letter-spacing: 0.02em !important;\n  }\n  .tbl-ret-bool.true {\n    background: rgba(16, 185, 129, 0.15) !important;\n    border: 1px solid rgba(16, 185, 129, 0.35) !important;\n    color: #34d399 !important;\n  }\n  .tbl-ret-bool.false {\n    background: rgba(244, 63, 94, 0.15) !important;\n    border: 1px solid rgba(244, 63, 94, 0.35) !important;\n    color: #fb7185 !important;\n  }\n  [data-theme=\"light\"] .tbl-arrow { color: #0284c7 !important; }\n  [data-theme=\"light\"] .tbl-ret-str { background: #ecfdf5 !important; border-color: #a7f3d0 !important; color: #059669 !important; }\n  [data-theme=\"light\"] .tbl-ret-num { background: #fffbeb !important; border-color: #fde68a !important; color: #d97706 !important; }\n  [data-theme=\"light\"] .tbl-ret-list, [data-theme=\"light\"] .tbl-ret-tuple { background: #faf5ff !important; border-color: #e9d5ff !important; color: #7e22ce !important; }\n  [data-theme=\"light\"] .tbl-ret-bool.true { background: #ecfdf5 !important; border-color: #a7f3d0 !important; color: #059669 !important; }\n  [data-theme=\"light\"] .tbl-ret-bool.false { background: #fff1f2 !important; border-color: #fecdd3 !important; color: #e11d48 !important; }\n\n  @media (max-width: 640px) {\n    .table-header-actions {\n      flex-wrap: wrap !important;\n      justify-content: flex-end !important;\n    }\n    .table-search-input {\n      width: 100px !important;\n    }\n    .table-search-input:focus {\n      width: 130px !important;\n    }\n  }\n\n  /* ═════════════════════════════════════════════════════════════════════\n     HOW TO CREATE A LIST: CLEAN 2-METHOD PEDAGOGICAL BREAKDOWN (IMAGE 2)\n     ═════════════════════════════════════════════════════════════════════ */\n  .create-list-methods {\n    display: flex !important;\n    flex-direction: column !important;\n    gap: 16px !important;\n    margin-top: 14px !important;\n  }\n  .create-list-method {\n    background: linear-gradient(145deg, rgba(15, 23, 42, 0.7) 0%, rgba(10, 16, 30, 0.85) 100%) !important;\n    border: 1px solid rgba(255, 255, 255, 0.08) !important;\n    border-radius: 12px !important;\n    padding: 16px 18px !important;\n    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3) !important;\n    transition: all 0.25s ease !important;\n  }\n  .create-list-method:hover {\n    border-color: rgba(56, 189, 248, 0.3) !important;\n    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.45) !important;\n  }\n  .method-title-wrap {\n    display: flex !important;\n    align-items: center !important;\n    gap: 10px !important;\n    margin-bottom: 12px !important;\n  }\n  .method-bullet {\n    color: #38bdf8 !important;\n    font-size: 1.25rem !important;\n    line-height: 1 !important;\n    flex-shrink: 0 !important;\n  }\n  .method-title-text {\n    font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif !important;\n    font-size: 0.95rem !important;\n    font-weight: 700 !important;\n    color: #f1f5f9 !important;\n    letter-spacing: -0.01em !important;\n  }\n  .snippet-code-box {\n    position: relative !important;\n    background: #070d19 !important;\n    border: 1px solid rgba(56, 189, 248, 0.16) !important;\n    border-left: 3px solid #38bdf8 !important;\n    border-radius: 8px !important;\n    padding: 12px 46px 12px 14px !important;\n    margin-top: 10px !important;\n    transition: all 0.2s ease !important;\n    overflow-x: auto !important;\n  }\n  .snippet-code-box:hover {\n    border-color: rgba(56, 189, 248, 0.35) !important;\n    box-shadow: 0 4px 14px rgba(56, 189, 248, 0.08) !important;\n  }\n  .snippet-code-box pre {\n    margin: 0 !important;\n    padding: 0 !important;\n    background: transparent !important;\n    border: none !important;\n    box-shadow: none !important;\n    overflow-x: auto !important;\n  }\n  .snippet-code-box pre code {\n    font-family: 'JetBrains Mono', 'Fira Code', monospace !important;\n    font-size: 0.85rem !important;\n    line-height: 1.65 !important;\n    color: #e2e8f0 !important;\n    display: block !important;\n    white-space: pre !important;\n  }\n  .copy-snippet-btn {\n    position: absolute !important;\n    top: 8px !important;\n    right: 8px !important;\n    width: 28px !important;\n    height: 28px !important;\n    display: inline-flex !important;\n    align-items: center !important;\n    justify-content: center !important;\n    background: rgba(255, 255, 255, 0.06) !important;\n    border: 1px solid rgba(255, 255, 255, 0.12) !important;\n    border-radius: 6px !important;\n    color: #94a3b8 !important;\n    cursor: pointer !important;\n    transition: all 0.2s ease !important;\n    padding: 0 !important;\n  }\n  .copy-snippet-btn:hover {\n    background: rgba(56, 189, 248, 0.15) !important;\n    border-color: rgba(56, 189, 248, 0.4) !important;\n    color: #38bdf8 !important;\n    transform: translateY(-1px) !important;\n  }\n  .copy-snippet-btn .check-icon {\n    display: none !important;\n  }\n  .copy-snippet-btn.copied {\n    background: rgba(16, 185, 129, 0.2) !important;\n    border-color: rgba(16, 185, 129, 0.5) !important;\n    color: #34d399 !important;\n  }\n  .copy-snippet-btn.copied .copy-icon {\n    display: none !important;\n  }\n  .copy-snippet-btn.copied .check-icon {\n    display: block !important;\n  }\n\n  /* Light Theme Overrides */\n  [data-theme=\"light\"] .create-list-method {\n    background: #ffffff !important;\n    border-color: #e2e8f0 !important;\n    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.03) !important;\n  }\n  [data-theme=\"light\"] .create-list-method:hover {\n    border-color: #38bdf8 !important;\n    box-shadow: 0 6px 18px rgba(56, 189, 248, 0.12) !important;\n  }\n  [data-theme=\"light\"] .method-bullet {\n    color: #0284c7 !important;\n  }\n  [data-theme=\"light\"] .method-title-text {\n    color: #0f172a !important;\n  }\n  [data-theme=\"light\"] .snippet-code-box {\n    background: #f8fafc !important;\n    border-color: #e2e8f0 !important;\n    border-left-color: #0284c7 !important;\n  }\n  [data-theme=\"light\"] .snippet-code-box:hover {\n    border-color: #93c5fd !important;\n    box-shadow: 0 4px 14px rgba(2, 132, 199, 0.08) !important;\n  }\n  [data-theme=\"light\"] .snippet-code-box pre code {\n    color: #0f172a !important;\n  }\n  [data-theme=\"light\"] .copy-snippet-btn {\n    background: #f1f5f9 !important;\n    border-color: #cbd5e1 !important;\n    color: #475569 !important;\n  }\n  [data-theme=\"light\"] .copy-snippet-btn:hover {\n    background: #e0f2fe !important;\n    border-color: #38bdf8 !important;\n    color: #0284c7 !important;\n  }\n  [data-theme=\"light\"] .copy-snippet-btn.copied {\n    background: #dcfce7 !important;\n    border-color: #86efac !important;\n    color: #15803d !important;\n  }\n\n  /* ═════════════════════════════════════════════════════════════════════\n     TEXTBOOK DIAGRAM: DUAL-DIRECTIONAL LIST INDEXING (PARITY REDESIGN)\n     ═════════════════════════════════════════════════════════════════════ */\n  .py-diagram-subcard {\n    background: linear-gradient(145deg, rgba(13, 21, 39, 0.95) 0%, rgba(8, 14, 28, 0.98) 100%) !important;\n    border: 1px solid rgba(56, 189, 248, 0.22) !important;\n    border-radius: 14px !important;\n    padding: 22px 24px !important;\n    margin: 18px 0 !important;\n    box-shadow: 0 10px 32px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.08) !important;\n    transition: all 0.25s ease !important;\n  }\n  .py-diagram-subcard:hover {\n    border-color: rgba(56, 189, 248, 0.35) !important;\n    box-shadow: 0 14px 40px rgba(0, 0, 0, 0.55), 0 0 24px rgba(56, 189, 248, 0.08) !important;\n  }\n\n  .diagram-wrap {\n    display: flex !important;\n    flex-direction: column !important;\n    gap: 12px !important;\n    width: 100% !important;\n    max-width: 680px !important;\n    margin: 0 auto !important;\n  }\n\n  /* Directional Flow Banners */\n  .flow-banner-neg,\n  .flow-banner-pos {\n    display: flex !important;\n    align-items: center !important;\n    justify-content: space-between !important;\n    gap: 14px !important;\n    padding: 9px 16px !important;\n    border-radius: 8px !important;\n    transition: all 0.2s ease !important;\n  }\n  .flow-banner-neg {\n    background: rgba(244, 63, 94, 0.07) !important;\n    border: 1px dashed rgba(244, 63, 94, 0.32) !important;\n  }\n  .flow-banner-pos {\n    background: rgba(56, 189, 248, 0.07) !important;\n    border: 1px dashed rgba(56, 189, 248, 0.32) !important;\n  }\n\n  .banner-arrow-track {\n    display: flex !important;\n    align-items: center !important;\n    flex: 1 !important;\n    min-width: 100px !important;\n  }\n  .banner-line-neg {\n    flex: 1 !important;\n    height: 3px !important;\n    border-radius: 2px !important;\n    background: linear-gradient(90deg, #f43f5e 0%, rgba(244, 63, 94, 0.15) 100%) !important;\n  }\n  .banner-line-pos {\n    flex: 1 !important;\n    height: 3px !important;\n    border-radius: 2px !important;\n    background: linear-gradient(90deg, rgba(56, 189, 248, 0.15) 0%, #38bdf8 100%) !important;\n  }\n  .arrow-svg-left {\n    color: #f43f5e !important;\n    flex-shrink: 0 !important;\n    margin-right: -2px !important;\n  }\n  .arrow-svg-right {\n    color: #38bdf8 !important;\n    flex-shrink: 0 !important;\n    margin-left: -2px !important;\n  }\n\n  .banner-info-wrap {\n    display: flex !important;\n    align-items: baseline !important;\n    gap: 8px !important;\n    flex-shrink: 0 !important;\n  }\n  .banner-label-neg {\n    font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif !important;\n    font-size: 0.92rem !important;\n    font-weight: 800 !important;\n    color: #fda4af !important;\n    letter-spacing: -0.01em !important;\n  }\n  .banner-label-pos {\n    font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif !important;\n    font-size: 0.92rem !important;\n    font-weight: 800 !important;\n    color: #7dd3fc !important;\n    letter-spacing: -0.01em !important;\n  }\n  .banner-subtext {\n    font-size: 0.74rem !important;\n    color: #94a3b8 !important;\n  }\n\n  /* Matrix Stage */\n  .matrix-stage {\n    display: flex !important;\n    align-items: center !important;\n    justify-content: center !important;\n    gap: 6px !important;\n    padding: 12px 2px !important;\n    width: 100% !important;\n  }\n  .matrix-bracket {\n    font-family: 'JetBrains Mono', monospace !important;\n    font-size: 3.2rem !important;\n    font-weight: 300 !important;\n    color: #38bdf8 !important;\n    line-height: 1 !important;\n    user-select: none !important;\n    text-shadow: 0 0 16px rgba(56, 189, 248, 0.35) !important;\n    display: flex !important;\n    align-items: center !important;\n  }\n  .pillars-row {\n    display: grid !important;\n    grid-template-columns: repeat(4, 1fr) !important;\n    gap: 14px !important;\n    flex: 1 !important;\n    max-width: 580px !important;\n  }\n\n  /* Pillar & Components */\n  .index-pillar {\n    display: flex !important;\n    flex-direction: column !important;\n    align-items: center !important;\n    position: relative !important;\n    padding: 2px !important;\n    border-radius: 10px !important;\n    transition: all 0.22s cubic-bezier(0.4, 0, 0.2, 1) !important;\n    cursor: default !important;\n  }\n  .idx-badge {\n    display: flex !important;\n    align-items: center !important;\n    justify-content: center !important;\n    min-width: 48px !important;\n    height: 32px !important;\n    padding: 0 10px !important;\n    border-radius: 6px !important;\n    font-family: 'JetBrains Mono', monospace !important;\n    font-size: 0.9rem !important;\n    font-weight: 800 !important;\n    transition: all 0.2s ease !important;\n  }\n  .badge-neg {\n    background: rgba(244, 63, 94, 0.14) !important;\n    border: 1.5px solid rgba(244, 63, 94, 0.4) !important;\n    color: #fda4af !important;\n  }\n  .badge-pos {\n    background: rgba(56, 189, 248, 0.14) !important;\n    border: 1.5px solid rgba(56, 189, 248, 0.4) !important;\n    color: #7dd3fc !important;\n  }\n\n  .pillar-stem {\n    width: 2px !important;\n    height: 16px !important;\n    opacity: 0.75 !important;\n    transition: all 0.2s ease !important;\n  }\n  .stem-neg {\n    background: linear-gradient(180deg, #f43f5e 0%, rgba(244, 63, 94, 0.2) 100%) !important;\n  }\n  .stem-pos {\n    background: linear-gradient(180deg, rgba(56, 189, 248, 0.2) 0%, #38bdf8 100%) !important;\n  }\n\n  .element-cell-wrap {\n    display: flex !important;\n    align-items: center !important;\n    justify-content: center !important;\n    position: relative !important;\n    width: 100% !important;\n  }\n  .element-tile {\n    display: flex !important;\n    align-items: center !important;\n    justify-content: center !important;\n    width: 100% !important;\n    padding: 11px 8px !important;\n    background: linear-gradient(180deg, #0d172e 0%, #070e1e 100%) !important;\n    border: 1.5px solid rgba(255, 255, 255, 0.12) !important;\n    border-radius: 8px !important;\n    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.08) !important;\n    transition: all 0.22s ease !important;\n  }\n  .quote-mark {\n    font-family: 'JetBrains Mono', monospace !important;\n    font-size: 0.95rem !important;\n    font-weight: 700 !important;\n    color: #fbbf24 !important;\n  }\n  .elem-text {\n    font-family: 'JetBrains Mono', monospace !important;\n    font-size: 0.95rem !important;\n    font-weight: 800 !important;\n    color: #f8fafc !important;\n    letter-spacing: 0.01em !important;\n  }\n  .tile-comma {\n    font-family: 'JetBrains Mono', monospace !important;\n    font-size: 1.4rem !important;\n    font-weight: 700 !important;\n    color: #64748b !important;\n    position: absolute !important;\n    right: -10px !important;\n    top: 50% !important;\n    transform: translateY(-50%) !important;\n    user-select: none !important;\n  }\n\n  .index-pillar:hover .element-tile {\n    border-color: #38bdf8 !important;\n    box-shadow: 0 8px 22px rgba(56, 189, 248, 0.25), 0 0 16px rgba(56, 189, 248, 0.15) !important;\n    transform: translateY(-2px) !important;\n  }\n  .index-pillar:hover .badge-neg {\n    border-color: #f43f5e !important;\n    box-shadow: 0 0 12px rgba(244, 63, 94, 0.5) !important;\n  }\n  .index-pillar:hover .badge-pos {\n    border-color: #38bdf8 !important;\n    box-shadow: 0 0 12px rgba(56, 189, 248, 0.5) !important;\n  }\n  .index-pillar:hover .pillar-stem {\n    opacity: 1 !important;\n  }\n\n  /* Summary Bar */\n  .diagram-key-takeaways {\n    display: flex !important;\n    flex-wrap: wrap !important;\n    align-items: center !important;\n    justify-content: space-between !important;\n    gap: 12px !important;\n    padding-top: 14px !important;\n    margin-top: 12px !important;\n    border-top: 1px dashed rgba(255, 255, 255, 0.1) !important;\n  }\n  .takeaway-item {\n    display: inline-flex !important;\n    align-items: center !important;\n    gap: 6px !important;\n    font-size: 0.78rem !important;\n    color: #cbd5e1 !important;\n  }\n  .takeaway-tag {\n    font-size: 0.72rem !important;\n    font-weight: 700 !important;\n    text-transform: uppercase !important;\n    letter-spacing: 0.04em !important;\n  }\n  .tag-pos { color: #38bdf8 !important; }\n  .tag-neg { color: #f43f5e !important; }\n  .tag-formula { color: #fbbf24 !important; }\n  .takeaway-item code {\n    font-family: 'JetBrains Mono', monospace !important;\n    font-size: 0.78rem !important;\n    padding: 2px 6px !important;\n    background: rgba(0, 0, 0, 0.4) !important;\n    border: 1px solid rgba(255, 255, 255, 0.1) !important;\n    border-radius: 4px !important;\n    color: #f1f5f9 !important;\n  }\n  .takeaway-divider {\n    color: #64748b !important;\n  }\n\n  /* ══ LIGHT THEME ADAPTATION ══ */\n  [data-theme=\"light\"] .py-diagram-subcard {\n    background: #ffffff !important;\n    border-color: #e2e8f0 !important;\n    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.02) !important;\n  }\n  [data-theme=\"light\"] .py-diagram-subcard:hover {\n    border-color: #38bdf8 !important;\n    box-shadow: 0 12px 30px rgba(56, 189, 248, 0.1) !important;\n  }\n  [data-theme=\"light\"] .flow-banner-neg {\n    background: #fff1f2 !important;\n    border-color: #fecdd3 !important;\n  }\n  [data-theme=\"light\"] .flow-banner-pos {\n    background: #f0f9ff !important;\n    border-color: #bae6fd !important;\n  }\n  [data-theme=\"light\"] .banner-line-neg {\n    background: linear-gradient(90deg, #e11d48 0%, rgba(225, 29, 72, 0.15) 100%) !important;\n  }\n  [data-theme=\"light\"] .banner-line-pos {\n    background: linear-gradient(90deg, rgba(2, 132, 199, 0.15) 0%, #0284c7 100%) !important;\n  }\n  [data-theme=\"light\"] .arrow-svg-left {\n    color: #e11d48 !important;\n  }\n  [data-theme=\"light\"] .arrow-svg-right {\n    color: #0284c7 !important;\n  }\n  [data-theme=\"light\"] .banner-label-neg {\n    color: #be123c !important;\n  }\n  [data-theme=\"light\"] .banner-label-pos {\n    color: #0369a1 !important;\n  }\n  [data-theme=\"light\"] .banner-subtext {\n    color: #64748b !important;\n  }\n  [data-theme=\"light\"] .matrix-bracket {\n    color: #0284c7 !important;\n    text-shadow: none !important;\n  }\n  [data-theme=\"light\"] .badge-neg {\n    background: #ffe4e6 !important;\n    border-color: #fecdd3 !important;\n    color: #be123c !important;\n  }\n  [data-theme=\"light\"] .badge-pos {\n    background: #e0f2fe !important;\n    border-color: #bae6fd !important;\n    color: #0369a1 !important;\n  }\n  [data-theme=\"light\"] .stem-neg {\n    background: linear-gradient(180deg, #e11d48 0%, rgba(225, 29, 72, 0.2) 100%) !important;\n  }\n  [data-theme=\"light\"] .stem-pos {\n    background: linear-gradient(180deg, rgba(2, 132, 199, 0.2) 0%, #0284c7 100%) !important;\n  }\n  [data-theme=\"light\"] .element-tile {\n    background: #f8fafc !important;\n    border-color: #cbd5e1 !important;\n    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04) !important;\n  }\n  [data-theme=\"light\"] .index-pillar:hover .element-tile {\n    border-color: #0284c7 !important;\n    box-shadow: 0 6px 18px rgba(2, 132, 199, 0.15) !important;\n  }\n  [data-theme=\"light\"] .quote-mark {\n    color: #d97706 !important;\n  }\n  [data-theme=\"light\"] .elem-text {\n    color: #0f172a !important;\n  }\n  [data-theme=\"light\"] .tile-comma {\n    color: #94a3b8 !important;\n  }\n  [data-theme=\"light\"] .diagram-key-takeaways {\n    border-top-color: #e2e8f0 !important;\n  }\n  [data-theme=\"light\"] .takeaway-item {\n    color: #475569 !important;\n  }\n  [data-theme=\"light\"] .tag-pos { color: #0284c7 !important; }\n  [data-theme=\"light\"] .tag-neg { color: #e11d48 !important; }\n  [data-theme=\"light\"] .tag-formula { color: #d97706 !important; }\n  [data-theme=\"light\"] .takeaway-item code {\n    background: #f1f5f9 !important;\n    border-color: #e2e8f0 !important;\n    color: #0f172a !important;\n  }\n\n</style>\n\n<!-- ═══ SECTION 01: List Fundamentals & Collections ═══ -->\n<div class=\"slide-section\" id=\"day04FundamentalsSection\">\n  <h2 class=\"slide-section-title heading-box-wrap heading-with-audio\" id=\"headingFundamentals\">\n    <span class=\"heading-num-box\">01</span>\n    <span class=\"heading-title-box\">\n      <span class=\"heading-title-text\">List Fundamentals & Memory</span>\n      <button class=\"audio-play-btn\" onclick=\"playAudio('Day04/New_PyDay04Audio01.mp3', this)\" title=\"Play narration\">\n        <svg class=\"play-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M8 5v14l11-7z\"/></svg>\n      </button>\n    </span>\n  </h2>\n  <p class=\"section-intro-text\">Think of a Python <strong>List</strong> like a shopping cart or a music playlist: it holds an ordered sequence of items where you can add new items, modify them in-place, reorder them, or remove them at any time. Alongside lists, Python provides three other core collection types — <strong>Tuple</strong>, <strong>Set</strong>, and <strong>Dictionary</strong> — each built for specific real-world tasks.</p>\n\n  <!-- Master Classification Table (Exact Day 02/03 Parity) -->\n  <div class=\"db-mock-table-wrap\">\n    <div class=\"table-header-wrap\">\n      <h4 class=\"table-header-title\">The Four Python Collection Data Types &amp; List Initialization</h4>\n    </div>\n    <div class=\"op-matrix-list\">\n      \n      <div class=\"op-family-card\">\n        <div class=\"op-family-header\">\n          <span class=\"fam-chip fam-chip--arith\">List (list)</span>\n          <span class=\"op-family-desc\">An ordered, mutable (changeable) sequence of items. Supports duplicate members, allows mixed heterogeneous data types, and provides fast $O(1)$ amortized append and index lookups.</span>\n        </div>\n        <div class=\"op-symbols-grid\">\n          <div class=\"op-symbol-box\"><code>[]</code></div>\n          <div class=\"op-symbol-box\"><code>list()</code></div>\n          <div class=\"op-symbol-box\"><code>['banana', 250, True]</code></div>\n        </div>\n      </div>\n\n      <div class=\"op-family-card\">\n        <div class=\"op-family-header\">\n          <span class=\"fam-chip fam-chip--assign\">Tuple (tuple)</span>\n          <span class=\"op-family-desc\">An ordered, immutable (unchangeable) sequence of elements. Supports duplicate members, guarantees fixed memory allocation, and can be used safely as dictionary keys.</span>\n        </div>\n        <div class=\"op-symbols-grid\">\n          <div class=\"op-symbol-box\"><code>()</code></div>\n          <div class=\"op-symbol-box\"><code>tuple()</code></div>\n          <div class=\"op-symbol-box\"><code>('apple', 'banana')</code></div>\n        </div>\n      </div>\n\n      <div class=\"op-family-card\">\n        <div class=\"op-family-header\">\n          <span class=\"fam-chip fam-chip--compare\">Set (set)</span>\n          <span class=\"op-family-desc\">An unordered, un-indexed collection of unique items. Highly mutable (elements can be added or removed), but strictly forbids duplicate members and provides $O(1)$ average membership checks.</span>\n        </div>\n        <div class=\"op-symbols-grid\">\n          <div class=\"op-symbol-box\"><code>set()</code></div>\n          <div class=\"op-symbol-box\"><code>{'banana', 'orange'}</code></div>\n        </div>\n      </div>\n\n      <div class=\"op-family-card\">\n        <div class=\"op-family-header\">\n          <span class=\"fam-chip fam-chip--logic\">Dictionary (dict)</span>\n          <span class=\"op-family-desc\">An ordered (by insertion) collection of key-value pairs. Keys must be unique and hashable (immutable); values are changeable and access operates in $O(1)$ constant time.</span>\n        </div>\n        <div class=\"op-symbols-grid\">\n          <div class=\"op-symbol-box\"><code>{}</code></div>\n          <div class=\"op-symbol-box\"><code>dict()</code></div>\n          <div class=\"op-symbol-box\"><code>{'country': 'Finland'}</code></div>\n        </div>\n      </div>\n\n      <div class=\"op-family-card\">\n        <div class=\"op-family-header\">\n          <span class=\"fam-chip fam-chip--ident\">Heterogeneous Types</span>\n          <span class=\"op-family-desc\">Python lists can simultaneously hold items of any valid data types: text strings, integers, floats, booleans, nested lists, tuples, and dictionaries stored as internal object pointers.</span>\n        </div>\n        <div class=\"op-symbols-grid\">\n          <div class=\"op-symbol-box\"><code>['Asabeneh', 250, True, {'city':'Helsinki'}]</code></div>\n        </div>\n      </div>\n\n      <div class=\"op-family-card\">\n        <div class=\"op-family-header\">\n          <span class=\"fam-chip fam-chip--bitwise\">🧠 Senior Spotlight: CPython Array Pointers</span>\n          <span class=\"op-family-desc\">Under the hood, CPython implements lists as dynamic contiguous arrays of 64-bit object pointers (<code>PyListObject</code>). It over-allocates extra memory capacity so appending items at the tail with <code>.append()</code> runs in instant $O(1)$ amortized time.</span>\n        </div>\n        <div class=\"op-symbols-grid\">\n          <div class=\"op-symbol-box\"><code>Dynamic Array</code></div>\n          <div class=\"op-symbol-box\"><code>Object Pointers</code></div>\n          <div class=\"op-symbol-box\"><code>O(1) Append</code></div>\n        </div>\n      </div>\n\n    </div>\n  </div>\n\n  <!-- Fundamentals How to Create a List Subcard (Image 2 Parity) -->\n  <div class=\"topic-subcard\" id=\"day04FundamentalsTableSection\">\n    <div class=\"subcard-header-with-audio\">\n      <h4 class=\"subcard-header-title\">How to Create a List</h4>\n      <button class=\"audio-play-btn\" onclick=\"playAudio('Day04/New_PyDay04Audio02.mp3', this)\" title=\"Play narration\">\n        <svg class=\"play-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M8 5v14l11-7z\"/></svg>\n      </button>\n    </div>\n    <p class=\"section-intro-text\">In Python we can create lists in two ways:</p>\n\n    <div class=\"create-list-methods\">\n      <!-- Method 1: Using list built-in function -->\n      <div class=\"create-list-method\">\n        <div class=\"method-title-wrap\">\n          <span class=\"method-bullet\">&bull;</span>\n          <span class=\"method-title-text\">Using list built-in function</span>\n        </div>\n        <div class=\"snippet-code-box\">\n        <button class=\"copy-snippet-btn\" onclick=\"copySnippetCode(this)\" title=\"Copy code\" aria-label=\"Copy code\">\n          <svg class=\"copy-icon\" width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n            <rect x=\"9\" y=\"9\" width=\"13\" height=\"13\" rx=\"2\" ry=\"2\"></rect>\n            <path d=\"M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1\"></path>\n          </svg>\n          <svg class=\"check-icon\" width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n            <polyline points=\"20 6 9 17 4 12\"></polyline>\n          </svg>\n        </button>\n        <pre><code><span class=\"code-comment\"># syntax</span>\nlst = <span class=\"code-fn\">list</span>()</code></pre>\n      </div>\n        <div class=\"snippet-code-box\">\n        <button class=\"copy-snippet-btn\" onclick=\"copySnippetCode(this)\" title=\"Copy code\" aria-label=\"Copy code\">\n          <svg class=\"copy-icon\" width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n            <rect x=\"9\" y=\"9\" width=\"13\" height=\"13\" rx=\"2\" ry=\"2\"></rect>\n            <path d=\"M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1\"></path>\n          </svg>\n          <svg class=\"check-icon\" width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n            <polyline points=\"20 6 9 17 4 12\"></polyline>\n          </svg>\n        </button>\n        <pre><code>empty_list = <span class=\"code-fn\">list</span>() <span class=\"code-comment\"># this is an empty list, no item in the list</span>\n<span class=\"code-fn\">print</span>(<span class=\"code-fn\">len</span>(empty_list)) <span class=\"code-comment\"># Output: 0</span></code></pre>\n      </div>\n      </div>\n\n      <!-- Method 2: Using square brackets, [] -->\n      <div class=\"create-list-method\">\n        <div class=\"method-title-wrap\">\n          <span class=\"method-bullet\">&bull;</span>\n          <span class=\"method-title-text\">Using square brackets, []</span>\n        </div>\n        <div class=\"snippet-code-box\">\n        <button class=\"copy-snippet-btn\" onclick=\"copySnippetCode(this)\" title=\"Copy code\" aria-label=\"Copy code\">\n          <svg class=\"copy-icon\" width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n            <rect x=\"9\" y=\"9\" width=\"13\" height=\"13\" rx=\"2\" ry=\"2\"></rect>\n            <path d=\"M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1\"></path>\n          </svg>\n          <svg class=\"check-icon\" width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n            <polyline points=\"20 6 9 17 4 12\"></polyline>\n          </svg>\n        </button>\n        <pre><code><span class=\"code-comment\"># syntax</span>\nlst = []</code></pre>\n      </div>\n        <div class=\"snippet-code-box\">\n        <button class=\"copy-snippet-btn\" onclick=\"copySnippetCode(this)\" title=\"Copy code\" aria-label=\"Copy code\">\n          <svg class=\"copy-icon\" width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n            <rect x=\"9\" y=\"9\" width=\"13\" height=\"13\" rx=\"2\" ry=\"2\"></rect>\n            <path d=\"M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1\"></path>\n          </svg>\n          <svg class=\"check-icon\" width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n            <polyline points=\"20 6 9 17 4 12\"></polyline>\n          </svg>\n        </button>\n        <pre><code>empty_list = [] <span class=\"code-comment\"># this is an empty list, no item in the list</span>\n<span class=\"code-fn\">print</span>(<span class=\"code-fn\">len</span>(empty_list)) <span class=\"code-comment\"># Output: 0</span></code></pre>\n      </div>\n      </div>\n    </div>\n  </div>\n\n    <!-- Code Container Subcard -->\n  <div class=\"topic-subcard\" id=\"day04FundamentalsCodeSection\">\n    <div class=\"subcard-header-with-audio\">\n      <h4 class=\"subcard-header-title\">List Creation, Length &amp; Heterogeneous Storage in Python</h4>\n      <button class=\"audio-play-btn\" onclick=\"playAudio('Day04/New_PyDay04Audio03.mp3', this)\" title=\"Play narration\">\n        <svg class=\"play-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M8 5v14l11-7z\"/></svg>\n      </button>\n    </div>\n    <div class=\"code-block-container\">\n      <div class=\"code-subblock\">\n        <pre><code><span class=\"code-comment\"># 1. How to Create a List: Two Approaches</span>\n<span class=\"code-comment\"># Using list() built-in constructor</span>\nempty_list = <span class=\"code-fn\">list</span>()     <span class=\"code-comment\"># Empty list: no items</span>\n<span class=\"code-fn\">print</span>(<span class=\"code-fn\">len</span>(empty_list))  <span class=\"code-comment\"># Output: 0</span>\n\n<span class=\"code-comment\"># Using square brackets literal: [] (Fastest &amp; idiomatic)</span>\nempty_list = []         <span class=\"code-comment\"># Empty list: no items</span>\n<span class=\"code-fn\">print</span>(<span class=\"code-fn\">len</span>(empty_list))  <span class=\"code-comment\"># Output: 0</span>\n\n<span class=\"code-comment\"># 2. Lists with Initial Values &amp; Instant O(1) Sizing via len()</span>\nfruits = [<span class=\"code-str\">'banana'</span>, <span class=\"code-str\">'orange'</span>, <span class=\"code-str\">'mango'</span>, <span class=\"code-str\">'lemon'</span>]                            <span class=\"code-comment\"># List of fruits</span>\nvegetables = [<span class=\"code-str\">'Tomato'</span>, <span class=\"code-str\">'Potato'</span>, <span class=\"code-str\">'Cabbage'</span>, <span class=\"code-str\">'Onion'</span>, <span class=\"code-str\">'Carrot'</span>]            <span class=\"code-comment\"># List of vegetables</span>\nanimal_products = [<span class=\"code-str\">'milk'</span>, <span class=\"code-str\">'meat'</span>, <span class=\"code-str\">'butter'</span>, <span class=\"code-str\">'yoghurt'</span>]                   <span class=\"code-comment\"># List of animal products</span>\nweb_techs = [<span class=\"code-str\">'HTML'</span>, <span class=\"code-str\">'CSS'</span>, <span class=\"code-str\">'JS'</span>, <span class=\"code-str\">'React'</span>, <span class=\"code-str\">'Redux'</span>, <span class=\"code-str\">'Node'</span>, <span class=\"code-str\">'MongoDB'</span>]     <span class=\"code-comment\"># List of web technologies</span>\ncountries = [<span class=\"code-str\">'Finland'</span>, <span class=\"code-str\">'Estonia'</span>, <span class=\"code-str\">'Denmark'</span>, <span class=\"code-str\">'Sweden'</span>, <span class=\"code-str\">'Norway'</span>]         <span class=\"code-comment\"># List of countries</span>\n\n<span class=\"code-comment\"># Print the lists and their lengths</span>\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">'Fruits:'</span>, fruits)\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">'Number of fruits:'</span>, <span class=\"code-fn\">len</span>(fruits))                                <span class=\"code-comment\"># Output: 4</span>\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">'Vegetables:'</span>, vegetables)\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">'Number of vegetables:'</span>, <span class=\"code-fn\">len</span>(vegetables))                        <span class=\"code-comment\"># Output: 5</span>\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">'Animal products:'</span>, animal_products)\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">'Number of animal products:'</span>, <span class=\"code-fn\">len</span>(animal_products))                <span class=\"code-comment\"># Output: 4</span>\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">'Web technologies:'</span>, web_techs)\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">'Number of web technologies:'</span>, <span class=\"code-fn\">len</span>(web_techs))                    <span class=\"code-comment\"># Output: 7</span>\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">'Countries:'</span>, countries)\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">'Number of countries:'</span>, <span class=\"code-fn\">len</span>(countries))                            <span class=\"code-comment\"># Output: 5</span>\n\n<span class=\"code-comment\"># 3. Heterogeneous Storage: Mixed Data Types in a Single List</span>\nlst = [<span class=\"code-str\">'Asabeneh'</span>, <span class=\"code-num\">250</span>, <span class=\"code-kw\">True</span>, {<span class=\"code-str\">'country'</span>: <span class=\"code-str\">'Finland'</span>, <span class=\"code-str\">'city'</span>: <span class=\"code-str\">'Helsinki'</span>}]  <span class=\"code-comment\"># str, int, bool, dict</span>\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">'Mixed list:'</span>, lst)\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">'Length of mixed list:'</span>, <span class=\"code-fn\">len</span>(lst))                                <span class=\"code-comment\"># Output: 4</span></code></pre>\n      </div>\n    </div>\n  </div>\n\n    <!-- 💡 Key Notes -->\n  <div class=\"py-recall-hook py-keynotes-card\">\n    <div class=\"py-keynotes-icon-wrap\">💡</div>\n    <div class=\"py-recall-body py-keynotes-body\">\n      <div class=\"py-recall-header py-keynotes-header\">\n        <span class=\"py-recall-title py-keynotes-title\">Key Notes</span>\n        <span class=\"py-recall-tag py-keynotes-tag\">List Fundamentals</span>\n      </div>\n      <ul class=\"py-keynotes-list\">\n        <li><strong>Collection Characteristics</strong>: Lists are ordered and mutable; tuples are ordered and immutable; sets are unordered with unique items; dictionaries are key-value mappings.</li>\n        <li><strong>Literal Performance</strong>: Prefer <code>[]</code> over <code>list()</code>; square brackets invoke the <code>BUILD_LIST</code> opcode directly, avoiding global namespace lookups.</li>\n        <li><strong>Instant Sizing</strong>: <code>len(lst)</code> operates in $O(1)$ constant time because CPython records the exact item count in the internal <code>ob_size</code> struct.</li>\n      </ul>\n    </div>\n  </div>\n</div>\n<!-- ═══ SECTION 02: Indexing and Slicing ═══ -->\n<div class=\"slide-section\" id=\"day04IndexingSlicingSection\">\n  <h2 class=\"slide-section-title heading-box-wrap heading-with-audio\" id=\"headingIndexingSlicing\">\n    <span class=\"heading-num-box\">02</span>\n    <span class=\"heading-title-box\">\n      <span class=\"heading-title-text\">List Indexing & Slicing</span>\n      <button class=\"audio-play-btn\" onclick=\"playAudio('Day04/New_PyDay04Audio04.mp3', this)\" title=\"Play narration\">\n        <svg class=\"play-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M8 5v14l11-7z\"/></svg>\n      </button>\n    </span>\n  </h2>\n  <p class=\"section-intro-text\">We access each item in a list using its zero-based index. Negative indexing starts from the end: <code>-1</code> refers to the last element, and <code>-2</code> refers to the second last. Slicing extracts a specified range of items via <code>[start:stop:step]</code>, constructing a brand-new shallow list copy.</p>\n\n  <!-- Professional Textbook Diagram: Positive & Negative Indexing (Dual-Directional Parity) -->\n  <div class=\"topic-subcard py-diagram-subcard\" id=\"day04IndexingDiagramSection\">\n    <div class=\"diagram-wrap\">\n      <!-- Negative Indexing Flow Track (Top) -->\n      <div class=\"flow-banner-neg\">\n        <div class=\"banner-arrow-track track-neg\">\n          <svg class=\"arrow-svg-left\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n            <path d=\"M19 12H5\"></path><path d=\"m12 19-7-7 7-7\"></path>\n          </svg>\n          <div class=\"banner-line-neg\"></div>\n        </div>\n        <div class=\"banner-info-wrap\">\n          <span class=\"banner-label-neg\">Negative indexing</span>\n          <span class=\"banner-subtext\">(Traverses Right &rarr; Left &bull; Last item is &minus;1)</span>\n        </div>\n      </div>\n\n      <!-- Python List Representation Stage (Center) -->\n      <div class=\"matrix-stage\">\n        <span class=\"matrix-bracket\" aria-hidden=\"true\">[</span>\n        <div class=\"pillars-row\">\n          <!-- Pillar 0: Flipkart -->\n          <div class=\"index-pillar\" title=\"Negative: -4 | Positive: 0 | Value: 'Flipkart'\">\n            <div class=\"idx-badge badge-neg\">\n              <span>&minus;4</span>\n            </div>\n            <div class=\"pillar-stem stem-neg\"></div>\n            <div class=\"element-cell-wrap\">\n              <div class=\"element-tile\">\n                <span class=\"quote-mark\">'</span><span class=\"elem-text\">Flipkart</span><span class=\"quote-mark\">'</span>\n              </div>\n              <span class=\"tile-comma\">,</span>\n            </div>\n            <div class=\"pillar-stem stem-pos\"></div>\n            <div class=\"idx-badge badge-pos\">\n              <span>0</span>\n            </div>\n          </div>\n\n          <!-- Pillar 1: Amazon -->\n          <div class=\"index-pillar\" title=\"Negative: -3 | Positive: 1 | Value: 'Amazon'\">\n            <div class=\"idx-badge badge-neg\">\n              <span>&minus;3</span>\n            </div>\n            <div class=\"pillar-stem stem-neg\"></div>\n            <div class=\"element-cell-wrap\">\n              <div class=\"element-tile\">\n                <span class=\"quote-mark\">'</span><span class=\"elem-text\">Amazon</span><span class=\"quote-mark\">'</span>\n              </div>\n              <span class=\"tile-comma\">,</span>\n            </div>\n            <div class=\"pillar-stem stem-pos\"></div>\n            <div class=\"idx-badge badge-pos\">\n              <span>1</span>\n            </div>\n          </div>\n\n          <!-- Pillar 2: Myntra -->\n          <div class=\"index-pillar\" title=\"Negative: -2 | Positive: 2 | Value: 'Myntra'\">\n            <div class=\"idx-badge badge-neg\">\n              <span>&minus;2</span>\n            </div>\n            <div class=\"pillar-stem stem-neg\"></div>\n            <div class=\"element-cell-wrap\">\n              <div class=\"element-tile\">\n                <span class=\"quote-mark\">'</span><span class=\"elem-text\">Myntra</span><span class=\"quote-mark\">'</span>\n              </div>\n              <span class=\"tile-comma\">,</span>\n            </div>\n            <div class=\"pillar-stem stem-pos\"></div>\n            <div class=\"idx-badge badge-pos\">\n              <span>2</span>\n            </div>\n          </div>\n\n          <!-- Pillar 3: Walmart -->\n          <div class=\"index-pillar\" title=\"Negative: -1 | Positive: 3 | Value: 'Walmart'\">\n            <div class=\"idx-badge badge-neg\">\n              <span>&minus;1</span>\n            </div>\n            <div class=\"pillar-stem stem-neg\"></div>\n            <div class=\"element-cell-wrap\">\n              <div class=\"element-tile\">\n                <span class=\"quote-mark\">'</span><span class=\"elem-text\">Walmart</span><span class=\"quote-mark\">'</span>\n              </div>\n            </div>\n            <div class=\"pillar-stem stem-pos\"></div>\n            <div class=\"idx-badge badge-pos\">\n              <span>3</span>\n            </div>\n          </div>\n        </div>\n        <span class=\"matrix-bracket\" aria-hidden=\"true\">]</span>\n      </div>\n\n      <!-- Positive Indexing Flow Track (Bottom) -->\n      <div class=\"flow-banner-pos\">\n        <div class=\"banner-info-wrap\">\n          <span class=\"banner-label-pos\">Positive indexing</span>\n          <span class=\"banner-subtext\">(Traverses Left &rarr; Right &bull; First item is 0)</span>\n        </div>\n        <div class=\"banner-arrow-track track-pos\">\n          <div class=\"banner-line-pos\"></div>\n          <svg class=\"arrow-svg-right\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\">\n            <path d=\"M5 12h14\"></path><path d=\"m12 5 7 7-7 7\"></path>\n          </svg>\n        </div>\n      </div>\n    </div>\n\n    <!-- Diagram Key Takeaways -->\n    <div class=\"diagram-key-takeaways\">\n      <div class=\"takeaway-item\">\n        <span class=\"takeaway-tag tag-pos\">Positive:</span>\n        <code>companies[0] &rarr; 'Flipkart'</code>\n        <span class=\"takeaway-divider\">&bull;</span>\n        <code>companies[3] &rarr; 'Walmart'</code>\n      </div>\n      <div class=\"takeaway-item\">\n        <span class=\"takeaway-tag tag-neg\">Negative:</span>\n        <code>companies[-4] &rarr; 'Flipkart'</code>\n        <span class=\"takeaway-divider\">&bull;</span>\n        <code>companies[-1] &rarr; 'Walmart'</code>\n      </div>\n      <div class=\"takeaway-item\">\n        <span class=\"takeaway-tag tag-formula\">Formula:</span>\n        <code>negative_index = positive_index - len(companies)</code>\n      </div>\n    </div>\n  </div>\n\n  <!-- Slicing Table Subcard -->\n  <div class=\"topic-subcard\" id=\"day04IndexingSlicingTableSection\">\n    <div class=\"table-header-wrap\">\n      <h4 class=\"table-header-title\">List Indexing &amp; Slicing Syntax Reference</h4>\n      <div class=\"table-header-actions\">\n        <div class=\"table-search-box\">\n        <svg class=\"table-search-icon\" width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\"><circle cx=\"11\" cy=\"11\" r=\"8\"/><path d=\"m21 21-4.3-4.3\"/></svg>\n        <input type=\"text\" class=\"table-search-input\" placeholder=\"Search indexing/slicing...\" oninput=\"filterTableRows(this)\" />\n      </div>\n        <button class=\"audio-play-btn\" onclick=\"playAudio('Day04/New_PyDay04Audio05.mp3', this)\" title=\"Play narration\">\n        <svg class=\"play-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M8 5v14l11-7z\"/></svg>\n      </button>\n      </div>\n    </div>\n    <div class=\"db-mock-table-wrap\">\n      <table class=\"db-table-mock db-table-mock--compact slicing-table\">\n        <thead>\n          <tr>\n            <th>Syntax Pattern</th>\n            <th>Type Name</th>\n            <th>Example (<code>fruits = ['banana', 'orange', 'mango', 'lemon']</code>)</th>\n            <th>Returned Value / Behavior</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n            <td><code>fruits[0]</code></td>\n            <td>Positive Index</td>\n            <td><code>first_fruit = fruits[0]</code></td>\n            <td><code>'banana'</code> (First item at index 0)</td>\n          </tr>\n          <tr>\n            <td><code>fruits[1]</code></td>\n            <td>Positive Index</td>\n            <td><code>second_fruit = fruits[1]</code></td>\n            <td><code>'orange'</code> (Second item at index 1)</td>\n          </tr>\n          <tr>\n            <td><code>fruits[3]</code></td>\n            <td>Positive Index</td>\n            <td><code>last_fruit = fruits[3]</code></td>\n            <td><code>'lemon'</code> (Fourth item at index 3)</td>\n          </tr>\n          <tr>\n            <td><code>fruits[len-1]</code></td>\n            <td>Dynamic Last Index</td>\n            <td><code>last_index = len(fruits) - 1; fruits[last_index]</code></td>\n            <td><code>'lemon'</code> (Calculates last index dynamically)</td>\n          </tr>\n          <tr>\n            <td><code>fruits[-1]</code></td>\n            <td>Negative Index</td>\n            <td><code>last_fruit = fruits[-1]</code></td>\n            <td><code>'lemon'</code> (Last item starting from end)</td>\n          </tr>\n          <tr>\n            <td><code>fruits[-2]</code></td>\n            <td>Negative Index</td>\n            <td><code>second_last = fruits[-2]</code></td>\n            <td><code>'mango'</code> (Second last item from end)</td>\n          </tr>\n          <tr>\n            <td><code>fruits[-4]</code></td>\n            <td>Negative Index</td>\n            <td><code>first_fruit = fruits[-4]</code></td>\n            <td><code>'banana'</code> (Fourth from end / first item)</td>\n          </tr>\n          <tr>\n            <td><code>fruits[0:4]</code></td>\n            <td>Positive Slicing</td>\n            <td><code>all_fruits = fruits[0:4]</code></td>\n            <td><code>['banana', 'orange', 'mango', 'lemon']</code> (All items)</td>\n          </tr>\n          <tr>\n            <td><code>fruits[0:]</code></td>\n            <td>Omitted Stop</td>\n            <td><code>all_fruits = fruits[0:]</code></td>\n            <td><code>['banana', 'orange', 'mango', 'lemon']</code> (From 0 to end)</td>\n          </tr>\n          <tr>\n            <td><code>fruits[1:3]</code></td>\n            <td>Range Slice</td>\n            <td><code>orange_and_mango = fruits[1:3]</code></td>\n            <td><code>['orange', 'mango']</code> (Excludes index 3)</td>\n          </tr>\n          <tr>\n            <td><code>fruits[1:]</code></td>\n            <td>Slice to End</td>\n            <td><code>orange_mango_lemon = fruits[1:]</code></td>\n            <td><code>['orange', 'mango', 'lemon']</code> (Index 1 to end)</td>\n          </tr>\n          <tr>\n            <td><code>fruits[::2]</code></td>\n            <td>Striding with Step</td>\n            <td><code>orange_and_lemon = fruits[::2]</code></td>\n            <td><code>['banana', 'mango']</code> (Step = 2, takes every 2nd item)</td>\n          </tr>\n          <tr>\n            <td><code>fruits[-4:]</code></td>\n            <td>Negative Slicing</td>\n            <td><code>all_fruits = fruits[-4:]</code></td>\n            <td><code>['banana', 'orange', 'mango', 'lemon']</code></td>\n          </tr>\n          <tr>\n            <td><code>fruits[-3:-1]</code></td>\n            <td>Negative Range</td>\n            <td><code>orange_and_mango = fruits[-3:-1]</code></td>\n            <td><code>['orange', 'mango']</code> (Excludes index -1)</td>\n          </tr>\n          <tr>\n            <td><code>fruits[-3:]</code></td>\n            <td>Negative to End</td>\n            <td><code>orange_mango_lemon = fruits[-3:]</code></td>\n            <td><code>['orange', 'mango', 'lemon']</code> (Starts -3 to end)</td>\n          </tr>\n          <tr>\n            <td><code>fruits[::-1]</code></td>\n            <td>Negative Step Reverse</td>\n            <td><code>reverse_fruits = fruits[::-1]</code></td>\n            <td><code>['lemon', 'mango', 'orange', 'banana']</code> (Reversed order)</td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n  </div>\n\n    <!-- Code Container Subcard -->\n  <div class=\"topic-subcard\" id=\"day04IndexingSlicingCodeSection\">\n    <div class=\"subcard-header-with-audio\">\n      <h4 class=\"subcard-header-title\">Indexing, Slicing &amp; Striding in Action</h4>\n      <button class=\"audio-play-btn\" onclick=\"playAudio('Day04/New_PyDay04Audio06.mp3', this)\" title=\"Play narration\">\n        <svg class=\"play-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M8 5v14l11-7z\"/></svg>\n      </button>\n    </div>\n    <div class=\"code-block-container\">\n      <div class=\"code-subblock\">\n        <pre><code><span class=\"code-comment\"># Accessing List Items Using Positive Indexing (0-based)</span>\nfruits = [<span class=\"code-str\">'banana'</span>, <span class=\"code-str\">'orange'</span>, <span class=\"code-str\">'mango'</span>, <span class=\"code-str\">'lemon'</span>]\nfirst_fruit = fruits[<span class=\"code-num\">0</span>]                            <span class=\"code-comment\"># Accessing the first item</span>\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">'first_fruit:'</span>, first_fruit)                 <span class=\"code-comment\"># Output: banana</span>\nsecond_fruit = fruits[<span class=\"code-num\">1</span>]\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">'second_fruit:'</span>, second_fruit)               <span class=\"code-comment\"># Output: orange</span>\nlast_fruit = fruits[<span class=\"code-num\">3</span>]\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">'last_fruit:'</span>, last_fruit)                   <span class=\"code-comment\"># Output: lemon</span>\nlast_index = <span class=\"code-fn\">len</span>(fruits) - <span class=\"code-num\">1</span>                       <span class=\"code-comment\"># Last index formula: len - 1</span>\nlast_fruit = fruits[last_index]\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">'last_fruit (via last_index):'</span>, last_fruit)  <span class=\"code-comment\"># Output: lemon</span>\n\n<span class=\"code-comment\"># Accessing List Items Using Negative Indexing (-1 is last, -2 is second last)</span>\nfirst_fruit = fruits[-<span class=\"code-num\">4</span>]\nlast_fruit = fruits[-<span class=\"code-num\">1</span>]\nsecond_last = fruits[-<span class=\"code-num\">2</span>]\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">'fruits[-4]:'</span>, first_fruit)                  <span class=\"code-comment\"># Output: banana</span>\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">'fruits[-1]:'</span>, last_fruit)                   <span class=\"code-comment\"># Output: lemon</span>\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">'fruits[-2]:'</span>, second_last)                  <span class=\"code-comment\"># Output: mango</span>\n\n<span class=\"code-comment\"># Slicing Items from a List: Positive Indexing [start:stop:step]</span>\nall_fruits = fruits[<span class=\"code-num\">0</span>:<span class=\"code-num\">4</span>]                           <span class=\"code-comment\"># Returns all 4 items</span>\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">'fruits[0:4]:'</span>, all_fruits)                  <span class=\"code-comment\"># Output: ['banana', 'orange', 'mango', 'lemon']</span>\nall_fruits = fruits[<span class=\"code-num\">0</span>:]                            <span class=\"code-comment\"># Takes all items from 0 to end</span>\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">'fruits[0:]: '</span>, all_fruits)                  <span class=\"code-comment\"># Output: ['banana', 'orange', 'mango', 'lemon']</span>\norange_and_mango = fruits[<span class=\"code-num\">1</span>:<span class=\"code-num\">3</span>]                     <span class=\"code-comment\"># Half-open interval [1:3): excludes index 3</span>\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">'fruits[1:3]:'</span>, orange_and_mango)            <span class=\"code-comment\"># Output: ['orange', 'mango']</span>\norange_mango_lemon = fruits[<span class=\"code-num\">1</span>:]                    <span class=\"code-comment\"># From index 1 to the end</span>\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">'fruits[1:]: '</span>, orange_mango_lemon)          <span class=\"code-comment\"># Output: ['orange', 'mango', 'lemon']</span>\norange_and_lemon = fruits[::<span class=\"code-num\">2</span>]                     <span class=\"code-comment\"># Striding step = 2: every second item</span>\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">'fruits[::2]:'</span>, orange_and_lemon)            <span class=\"code-comment\"># Output: ['banana', 'mango']</span>\n\n<span class=\"code-comment\"># Slicing Items from a List: Negative Indexing &amp; Reversal</span>\nall_fruits = fruits[-<span class=\"code-num\">4</span>:]                           <span class=\"code-comment\"># From -4 to the end</span>\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">'fruits[-4:]:  '</span>, all_fruits)                <span class=\"code-comment\"># Output: ['banana', 'orange', 'mango', 'lemon']</span>\norange_and_mango = fruits[-<span class=\"code-num\">3</span>:-<span class=\"code-num\">1</span>]                   <span class=\"code-comment\"># Excludes index -1</span>\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">'fruits[-3:-1]:'</span>, orange_and_mango)          <span class=\"code-comment\"># Output: ['orange', 'mango']</span>\norange_mango_lemon = fruits[-<span class=\"code-num\">3</span>:]                   <span class=\"code-comment\"># From -3 to the end</span>\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">'fruits[-3:]:  '</span>, orange_mango_lemon)        <span class=\"code-comment\"># Output: ['orange', 'mango', 'lemon']</span>\nreverse_fruits = fruits[::<span class=\"code-op\">-</span><span class=\"code-num\">1</span>]                      <span class=\"code-comment\"># Negative step reversely copies list</span>\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">'fruits[::-1]: '</span>, reverse_fruits)            <span class=\"code-comment\"># Output: ['lemon', 'mango', 'orange', 'banana']</span></code></pre>\n      </div>\n    </div>\n  </div>\n\n    <!-- 💡 Key Notes -->\n  <div class=\"py-recall-hook py-keynotes-card\">\n    <div class=\"py-keynotes-icon-wrap\">💡</div>\n    <div class=\"py-recall-body py-keynotes-body\">\n      <div class=\"py-recall-header py-keynotes-header\">\n        <span class=\"py-recall-title py-keynotes-title\">Key Notes</span>\n        <span class=\"py-recall-tag py-keynotes-tag\">Indexing & Slicing</span>\n      </div>\n      <ul class=\"py-keynotes-list\">\n        <li><strong>Half-Open Slicing Interval</strong>: Slicing follows the interval $[start, end)$, meaning the <code>start</code> index is included, but the <code>end</code> index is strictly excluded.</li>\n        <li><strong>Reverse Striding with <code>[::-1]</code></strong>: Setting step to <code>-1</code> creates a brand-new reversed list in $O(N)$ time without modifying the original list.</li>\n        <li><strong>Slice Copy Independence</strong>: Modifying elements of a slice does not mutate the original list because slicing constructs a fresh shallow copy.</li>\n      </ul>\n    </div>\n  </div>\n</div>\n<!-- ═══ SECTION 03: Unpacking and Starred Assignment ═══ -->\n<div class=\"slide-section\" id=\"day04UnpackingSection\">\n  <h2 class=\"slide-section-title heading-box-wrap heading-with-audio\" id=\"headingUnpacking\">\n    <span class=\"heading-num-box\">03</span>\n    <span class=\"heading-title-box\">\n      <span class=\"heading-title-text\">Sequence Unpacking</span>\n      <button class=\"audio-play-btn\" onclick=\"playAudio('Day04/New_PyDay04Audio07.mp3', this)\" title=\"Play narration\">\n        <svg class=\"play-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M8 5v14l11-7z\"/></svg>\n      </button>\n    </span>\n  </h2>\n  <p class=\"section-intro-text\">Python allows unpacking list items directly into variables. By using the starred syntax (<code>*rest</code>), we can capture multiple remaining elements into a sublist, enabling elegant pattern destructuring and head-tail isolation.</p>\n\n  <!-- Unpacking Table Subcard -->\n  <div class=\"topic-subcard\" id=\"day04UnpackingTableSection\">\n    <div class=\"table-header-wrap\">\n      <h4 class=\"table-header-title\">Unpacking Patterns &amp; Starred Assignment Reference</h4>\n      <div class=\"table-header-actions\">\n        <div class=\"table-search-box\">\n        <svg class=\"table-search-icon\" width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\"><circle cx=\"11\" cy=\"11\" r=\"8\"/><path d=\"m21 21-4.3-4.3\"/></svg>\n        <input type=\"text\" class=\"table-search-input\" placeholder=\"Search unpacking...\" oninput=\"filterTableRows(this)\" />\n      </div>\n        <button class=\"audio-play-btn\" onclick=\"playAudio('Day04/New_PyDay04Audio08.mp3', this)\" title=\"Play narration\">\n        <svg class=\"play-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M8 5v14l11-7z\"/></svg>\n      </button>\n      </div>\n    </div>\n    <div class=\"db-mock-table-wrap\">\n      <table class=\"db-table-mock db-table-mock--compact unpack-table\">\n        <thead>\n          <tr>\n            <th>Unpacking Pattern</th>\n            <th>Example Expression</th>\n            <th>Individual Targets</th>\n            <th>Starred <code>*rest</code> Capture</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n            <td>Basic Syntax</td>\n            <td><code>first, second, third, *rest = lst</code></td>\n            <td><code>first='item1', second='item2', third='item3'</code></td>\n            <td><code>rest = ['item4', 'item5']</code></td>\n          </tr>\n          <tr>\n            <td>Fruits Destructuring</td>\n            <td><code>first_fruit, second_fruit, third_fruit, *rest = fruits</code></td>\n            <td><code>'banana', 'orange', 'mango'</code></td>\n            <td><code>rest = ['lemon', 'lime', 'apple']</code></td>\n          </tr>\n          <tr>\n            <td>Middle Unpacking</td>\n            <td><code>first, second, third, *rest, tenth = [1..10]</code></td>\n            <td><code>first=1, second=2, third=3, tenth=10</code></td>\n            <td><code>rest = [4, 5, 6, 7, 8, 9]</code></td>\n          </tr>\n          <tr>\n            <td>Countries Unpacking</td>\n            <td><code>gr, fr, bg, sw, *scandic, es = countries</code></td>\n            <td><code>gr='Germany', fr='France', bg='Belgium', sw='Sweden', es='Estonia'</code></td>\n            <td><code>scandic = ['Denmark', 'Finland', 'Norway', 'Iceland']</code></td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n  </div>\n\n    <!-- Code Container Subcard -->\n  <div class=\"topic-subcard\" id=\"day04UnpackingCodeSection\">\n    <div class=\"subcard-header-with-audio\">\n      <h4 class=\"subcard-header-title\">Unpacking Lists in Python</h4>\n      <button class=\"audio-play-btn\" onclick=\"playAudio('Day04/New_PyDay04Audio09.mp3', this)\" title=\"Play narration\">\n        <svg class=\"play-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M8 5v14l11-7z\"/></svg>\n      </button>\n    </div>\n    <div class=\"code-block-container\">\n      <div class=\"code-subblock\">\n        <pre><code><span class=\"code-comment\"># Basic List Unpacking with Head &amp; Tail Isolation</span>\nlst = [<span class=\"code-str\">'item1'</span>, <span class=\"code-str\">'item2'</span>, <span class=\"code-str\">'item3'</span>, <span class=\"code-str\">'item4'</span>, <span class=\"code-str\">'item5'</span>]\nfirst_item, second_item, third_item, <span class=\"code-op\">*</span>rest = lst\n<span class=\"code-fn\">print</span>(first_item)   <span class=\"code-comment\"># Output: 'item1'</span>\n<span class=\"code-fn\">print</span>(second_item)  <span class=\"code-comment\"># Output: 'item2'</span>\n<span class=\"code-fn\">print</span>(third_item)   <span class=\"code-comment\"># Output: 'item3'</span>\n<span class=\"code-fn\">print</span>(rest)         <span class=\"code-comment\"># Output: ['item4', 'item5'] (Captured as a list)</span>\n\n<span class=\"code-comment\"># First Example: Fruits Head Extraction &amp; Starred Remaining Elements</span>\nfruits = [<span class=\"code-str\">'banana'</span>, <span class=\"code-str\">'orange'</span>, <span class=\"code-str\">'mango'</span>, <span class=\"code-str\">'lemon'</span>, <span class=\"code-str\">'lime'</span>, <span class=\"code-str\">'apple'</span>]\nfirst_fruit, second_fruit, third_fruit, <span class=\"code-op\">*</span>rest = fruits\n<span class=\"code-fn\">print</span>(first_fruit)  <span class=\"code-comment\"># Output: 'banana'</span>\n<span class=\"code-fn\">print</span>(second_fruit) <span class=\"code-comment\"># Output: 'orange'</span>\n<span class=\"code-fn\">print</span>(third_fruit)  <span class=\"code-comment\"># Output: 'mango'</span>\n<span class=\"code-fn\">print</span>(rest)         <span class=\"code-comment\"># Output: ['lemon', 'lime', 'apple']</span>\n\n<span class=\"code-comment\"># Second Example: Middle Starred Sublist with Head &amp; Tail Anchors</span>\nfirst, second, third, <span class=\"code-op\">*</span>rest, tenth = [<span class=\"code-num\">1</span>, <span class=\"code-num\">2</span>, <span class=\"code-num\">3</span>, <span class=\"code-num\">4</span>, <span class=\"code-num\">5</span>, <span class=\"code-num\">6</span>, <span class=\"code-num\">7</span>, <span class=\"code-num\">8</span>, <span class=\"code-num\">9</span>, <span class=\"code-num\">10</span>]\n<span class=\"code-fn\">print</span>(first)        <span class=\"code-comment\"># Output: 1</span>\n<span class=\"code-fn\">print</span>(second)       <span class=\"code-comment\"># Output: 2</span>\n<span class=\"code-fn\">print</span>(third)        <span class=\"code-comment\"># Output: 3</span>\n<span class=\"code-fn\">print</span>(rest)         <span class=\"code-comment\"># Output: [4, 5, 6, 7, 8, 9]</span>\n<span class=\"code-fn\">print</span>(tenth)        <span class=\"code-comment\"># Output: 10</span>\n\n<span class=\"code-comment\"># Third Example: Geographic Boundary Destructuring</span>\ncountries = [<span class=\"code-str\">'Germany'</span>, <span class=\"code-str\">'France'</span>, <span class=\"code-str\">'Belgium'</span>, <span class=\"code-str\">'Sweden'</span>, <span class=\"code-str\">'Denmark'</span>, <span class=\"code-str\">'Finland'</span>, <span class=\"code-str\">'Norway'</span>, <span class=\"code-str\">'Iceland'</span>, <span class=\"code-str\">'Estonia'</span>]\ngr, fr, bg, sw, <span class=\"code-op\">*</span>scandic, es = countries\n<span class=\"code-fn\">print</span>(gr)           <span class=\"code-comment\"># Output: 'Germany'</span>\n<span class=\"code-fn\">print</span>(fr)           <span class=\"code-comment\"># Output: 'France'</span>\n<span class=\"code-fn\">print</span>(bg)           <span class=\"code-comment\"># Output: 'Belgium'</span>\n<span class=\"code-fn\">print</span>(sw)           <span class=\"code-comment\"># Output: 'Sweden'</span>\n<span class=\"code-fn\">print</span>(scandic)      <span class=\"code-comment\"># Output: ['Denmark', 'Finland', 'Norway', 'Iceland']</span>\n<span class=\"code-fn\">print</span>(es)           <span class=\"code-comment\"># Output: 'Estonia'</span></code></pre>\n      </div>\n    </div>\n  </div>\n\n    <!-- 💡 Key Notes -->\n  <div class=\"py-recall-hook py-keynotes-card\">\n    <div class=\"py-keynotes-icon-wrap\">💡</div>\n    <div class=\"py-recall-body py-keynotes-body\">\n      <div class=\"py-recall-header py-keynotes-header\">\n        <span class=\"py-recall-title py-keynotes-title\">Key Notes</span>\n        <span class=\"py-recall-tag py-keynotes-tag\">Sequence Unpacking</span>\n      </div>\n      <ul class=\"py-keynotes-list\">\n        <li><strong>Starred Sublist Guarantee</strong>: The variable prefixed with <code>*</code> always captures remaining items as a Python <code>list</code>, even if zero items match (yielding <code>[]</code>).</li>\n        <li><strong>Single Star Constraint</strong>: Python allows at most one starred target per assignment line (e.g. <code>*a, *b = lst</code> raises a <code>SyntaxError</code>).</li>\n        <li><strong>Target Count Matching</strong>: Without <code>*</code>, target variables must match the list length exactly, or Python raises <code>ValueError: too many/not enough values to unpack</code>.</li>\n      </ul>\n    </div>\n  </div>\n</div>\n<!-- ═══ SECTION 04: Modifying Lists & Checking Items ═══ -->\n<div class=\"slide-section\" id=\"day04ModifyingSection\">\n  <h2 class=\"slide-section-title heading-box-wrap heading-with-audio\" id=\"headingModifying\">\n    <span class=\"heading-num-box\">04</span>\n    <span class=\"heading-title-box\">\n      <span class=\"heading-title-text\">List Mutability & In-Place Ops</span>\n      <button class=\"audio-play-btn\" onclick=\"playAudio('Day04/New_PyDay04Audio10.mp3', this)\" title=\"Play narration\">\n        <svg class=\"play-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M8 5v14l11-7z\"/></svg>\n      </button>\n    </span>\n  </h2>\n  <p class=\"section-intro-text\">List is a mutable or modifiable ordered collection of items. Elements can be updated directly by index, and membership can be tested in $O(N)$ linear time using the <code>in</code> operator.</p>\n\n  <!-- Modifying Table Subcard -->\n  <div class=\"topic-subcard\" id=\"day04ModifyingTableSection\">\n    <div class=\"table-header-wrap\">\n      <h4 class=\"table-header-title\">Modifying Items &amp; Membership Testing Reference</h4>\n      <div class=\"table-header-actions\">\n        <div class=\"table-search-box\">\n        <svg class=\"table-search-icon\" width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\"><circle cx=\"11\" cy=\"11\" r=\"8\"/><path d=\"m21 21-4.3-4.3\"/></svg>\n        <input type=\"text\" class=\"table-search-input\" placeholder=\"Search operations...\" oninput=\"filterTableRows(this)\" />\n      </div>\n        <button class=\"audio-play-btn\" onclick=\"playAudio('Day04/New_PyDay04Audio11.mp3', this)\" title=\"Play narration\">\n        <svg class=\"play-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M8 5v14l11-7z\"/></svg>\n      </button>\n      </div>\n    </div>\n    <div class=\"db-mock-table-wrap\">\n      <table class=\"db-table-mock db-table-mock--compact modify-table\">\n        <thead>\n          <tr>\n            <th>Operation</th>\n            <th>Code Syntax</th>\n            <th>Code Example</th>\n            <th>Resulting List / Output</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n            <td>Modify Index 0</td>\n            <td><code>lst[0] = new_item</code></td>\n            <td><code>fruits[0] = 'avocado'</code></td>\n            <td><code>['avocado', 'orange', 'mango', 'lemon']</code></td>\n          </tr>\n          <tr>\n            <td>Modify Index 1</td>\n            <td><code>lst[1] = new_item</code></td>\n            <td><code>fruits[1] = 'apple'</code></td>\n            <td><code>['avocado', 'apple', 'mango', 'lemon']</code></td>\n          </tr>\n          <tr>\n            <td>Modify Last Item</td>\n            <td><code>lst[last_index] = item</code></td>\n            <td><code>last_index = len(fruits) - 1; fruits[last_index] = 'lime'</code></td>\n            <td><code>['avocado', 'apple', 'mango', 'lime']</code></td>\n          </tr>\n          <tr>\n            <td>Check Membership (Present)</td>\n            <td><code>item in lst</code></td>\n            <td><code>does_exist = 'banana' in fruits</code></td>\n            <td><code>True</code> (Evaluates to boolean True)</td>\n          </tr>\n          <tr>\n            <td>Check Membership (Missing)</td>\n            <td><code>item in lst</code></td>\n            <td><code>does_exist = 'lime' in fruits</code></td>\n            <td><code>False</code> (Evaluates to boolean False)</td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n  </div>\n\n    <!-- Code Container Subcard -->\n  <div class=\"topic-subcard\" id=\"day04ModifyingCodeSection\">\n    <div class=\"subcard-header-with-audio\">\n      <h4 class=\"subcard-header-title\">In-Place Mutation and Membership Testing in Python</h4>\n      <button class=\"audio-play-btn\" onclick=\"playAudio('Day04/New_PyDay04Audio12.mp3', this)\" title=\"Play narration\">\n        <svg class=\"play-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M8 5v14l11-7z\"/></svg>\n      </button>\n    </div>\n    <div class=\"code-block-container\">\n      <div class=\"code-subblock\">\n        <pre><code><span class=\"code-comment\"># Modifying Lists: In-Place Mutation of Elements via Index Assignment</span>\nfruits = [<span class=\"code-str\">'banana'</span>, <span class=\"code-str\">'orange'</span>, <span class=\"code-str\">'mango'</span>, <span class=\"code-str\">'lemon'</span>]\nfruits[<span class=\"code-num\">0</span>] = <span class=\"code-str\">'avocado'</span>\n<span class=\"code-fn\">print</span>(fruits)       <span class=\"code-comment\"># Output: ['avocado', 'orange', 'mango', 'lemon']</span>\n\nfruits[<span class=\"code-num\">1</span>] = <span class=\"code-str\">'apple'</span>\n<span class=\"code-fn\">print</span>(fruits)       <span class=\"code-comment\"># Output: ['avocado', 'apple', 'mango', 'lemon']</span>\n\nlast_index = <span class=\"code-fn\">len</span>(fruits) - <span class=\"code-num\">1</span>\nfruits[last_index] = <span class=\"code-str\">'lime'</span>\n<span class=\"code-fn\">print</span>(fruits)       <span class=\"code-comment\"># Output: ['avocado', 'apple', 'mango', 'lime']</span>\n\n<span class=\"code-comment\"># Checking Items in a List using the 'in' Membership Operator (O(N))</span>\nfruits = [<span class=\"code-str\">'banana'</span>, <span class=\"code-str\">'orange'</span>, <span class=\"code-str\">'mango'</span>, <span class=\"code-str\">'lemon'</span>]\ndoes_exist = <span class=\"code-str\">'banana'</span> <span class=\"code-kw\">in</span> fruits\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">\"'banana' in fruits:\"</span>, does_exist)   <span class=\"code-comment\"># Output: True</span>\n\ndoes_exist = <span class=\"code-str\">'lime'</span> <span class=\"code-kw\">in</span> fruits\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">\"'lime' in fruits:  \"</span>, does_exist)   <span class=\"code-comment\"># Output: False</span></code></pre>\n      </div>\n    </div>\n  </div>\n\n    <!-- 💡 Key Notes -->\n  <div class=\"py-recall-hook py-keynotes-card\">\n    <div class=\"py-keynotes-icon-wrap\">💡</div>\n    <div class=\"py-recall-body py-keynotes-body\">\n      <div class=\"py-recall-header py-keynotes-header\">\n        <span class=\"py-recall-title py-keynotes-title\">Key Notes</span>\n        <span class=\"py-recall-tag py-keynotes-tag\">Mutability & Membership</span>\n      </div>\n      <ul class=\"py-keynotes-list\">\n        <li><strong>In-Place Mutation</strong>: Modifying elements via index updates the object pointer at that slot without altering the list's memory address (<code>id(fruits)</code> remains identical).</li>\n        <li><strong>Membership Search Complexity</strong>: The <code>in</code> operator scans elements from left to right in $O(N)$ linear time. For millions of lookups, consider converting to a <code>set</code> ($O(1)$).</li>\n        <li><strong>Out of Bounds Guard</strong>: Assigning to an index that does not exist (e.g. <code>fruits[10] = 'pear'</code>) raises an <code>IndexError</code>; use <code>append()</code> or <code>insert()</code> to grow the list.</li>\n      </ul>\n    </div>\n  </div>\n</div>\n<!-- ═══ SECTION 05: Adding & Joining Lists ═══ -->\n<div class=\"slide-section\" id=\"day04AddingSection\">\n  <h2 class=\"slide-section-title heading-box-wrap heading-with-audio\" id=\"headingAdding\">\n    <span class=\"heading-num-box\">05</span>\n    <span class=\"heading-title-box\">\n      <span class=\"heading-title-text\">Adding & Appending Elements</span>\n      <button class=\"audio-play-btn\" onclick=\"playAudio('Day04/New_PyDay04Audio13.mp3', this)\" title=\"Play narration\">\n        <svg class=\"play-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M8 5v14l11-7z\"/></svg>\n      </button>\n    </span>\n  </h2>\n  <p class=\"section-intro-text\">To add items to an existing list, Python provides <code>append()</code> to place elements at the end, and <code>insert()</code> to place items at a specified index. Lists can be joined using the plus operator (<code>+</code>) or the <code>extend()</code> method.</p>\n\n  <!-- Adding Table Subcard -->\n  <div class=\"topic-subcard\" id=\"day04AddingTableSection\">\n    <div class=\"table-header-wrap\">\n      <h4 class=\"table-header-title\">Adding, Inserting &amp; Joining Lists Comparison</h4>\n      <div class=\"table-header-actions\">\n        <div class=\"table-search-box\">\n        <svg class=\"table-search-icon\" width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\"><circle cx=\"11\" cy=\"11\" r=\"8\"/><path d=\"m21 21-4.3-4.3\"/></svg>\n        <input type=\"text\" class=\"table-search-input\" placeholder=\"Search methods...\" oninput=\"filterTableRows(this)\" />\n      </div>\n        <button class=\"audio-play-btn\" onclick=\"playAudio('Day04/New_PyDay04Audio14.mp3', this)\" title=\"Play narration\">\n        <svg class=\"play-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M8 5v14l11-7z\"/></svg>\n      </button>\n      </div>\n    </div>\n    <div class=\"db-mock-table-wrap\">\n      <table class=\"db-table-mock db-table-mock--compact method-table add-method-table\">\n        <thead>\n          <tr>\n            <th>Method / Operator</th>\n            <th>Syntax Example</th>\n            <th>Action Performed</th>\n            <th>Mutates Original List?</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n            <td><code>append(item)</code></td>\n            <td><code>fruits.append('apple')</code></td>\n            <td>Appends a single item to the end of the list</td>\n            <td><strong>Yes</strong> &mdash; In-place mutation (returns <code>None</code>)</td>\n          </tr>\n          <tr>\n            <td><code>insert(index, item)</code></td>\n            <td><code>fruits.insert(2, 'apple')</code></td>\n            <td>Inserts item at index; shifts existing items right</td>\n            <td><strong>Yes</strong> &mdash; In-place mutation (returns <code>None</code>)</td>\n          </tr>\n          <tr>\n            <td>Plus Operator (<code>+</code>)</td>\n            <td><code>integers = negative + zero + positive</code></td>\n            <td>Concatenates two or more lists into a brand-new list</td>\n            <td><strong>No</strong> &mdash; Original lists remain completely unchanged</td>\n          </tr>\n          <tr>\n            <td><code>extend(iterable)</code></td>\n            <td><code>num1.extend(num2)</code></td>\n            <td>Appends all items from iterable into the calling list</td>\n            <td><strong>Yes</strong> &mdash; Mutates calling list in-place (returns <code>None</code>)</td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n  </div>\n\n    <!-- Code Container Subcard -->\n  <div class=\"topic-subcard\" id=\"day04AddingCodeSection\">\n    <div class=\"subcard-header-with-audio\">\n      <h4 class=\"subcard-header-title\">Adding, Inserting and Joining Lists in Python</h4>\n      <button class=\"audio-play-btn\" onclick=\"playAudio('Day04/New_PyDay04Audio15.mp3', this)\" title=\"Play narration\">\n        <svg class=\"play-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M8 5v14l11-7z\"/></svg>\n      </button>\n    </div>\n    <div class=\"code-block-container\">\n      <div class=\"code-subblock\">\n        <pre><code><span class=\"code-comment\"># 1. Adding Items to the End of a List using append() (Amortized O(1))</span>\n<span class=\"code-comment\"># syntax: lst.append(item)</span>\nfruits = [<span class=\"code-str\">'banana'</span>, <span class=\"code-str\">'orange'</span>, <span class=\"code-str\">'mango'</span>, <span class=\"code-str\">'lemon'</span>]\nfruits.<span class=\"code-fn\">append</span>(<span class=\"code-str\">'apple'</span>)\n<span class=\"code-fn\">print</span>(fruits)           <span class=\"code-comment\"># Output: ['banana', 'orange', 'mango', 'lemon', 'apple']</span>\nfruits.<span class=\"code-fn\">append</span>(<span class=\"code-str\">'lime'</span>)\n<span class=\"code-fn\">print</span>(fruits)           <span class=\"code-comment\"># Output: ['banana', 'orange', 'mango', 'lemon', 'apple', 'lime']</span>\n\n<span class=\"code-comment\"># 2. Inserting Items at a Given Index using insert() (O(N) Shift Cost)</span>\n<span class=\"code-comment\"># syntax: lst.insert(index, item) - shifts elements to the right</span>\nfruits = [<span class=\"code-str\">'banana'</span>, <span class=\"code-str\">'orange'</span>, <span class=\"code-str\">'mango'</span>, <span class=\"code-str\">'lemon'</span>]\nfruits.<span class=\"code-fn\">insert</span>(<span class=\"code-num\">2</span>, <span class=\"code-str\">'apple'</span>)   <span class=\"code-comment\"># Inserts 'apple' at index 2 (between orange and mango)</span>\n<span class=\"code-fn\">print</span>(fruits)           <span class=\"code-comment\"># Output: ['banana', 'orange', 'apple', 'mango', 'lemon']</span>\nfruits.<span class=\"code-fn\">insert</span>(<span class=\"code-num\">3</span>, <span class=\"code-str\">'lime'</span>)    <span class=\"code-comment\"># Inserts 'lime' at index 3</span>\n<span class=\"code-fn\">print</span>(fruits)           <span class=\"code-comment\"># Output: ['banana', 'orange', 'apple', 'lime', 'mango', 'lemon']</span>\n\n<span class=\"code-comment\"># 3. Concatenating Lists using the Plus Operator (+) (Constructs New List)</span>\n<span class=\"code-comment\"># syntax: list3 = list1 + list2</span>\npositive_numbers = [<span class=\"code-num\">1</span>, <span class=\"code-num\">2</span>, <span class=\"code-num\">3</span>, <span class=\"code-num\">4</span>, <span class=\"code-num\">5</span>]\nzero = [<span class=\"code-num\">0</span>]\nnegative_numbers = [-<span class=\"code-num\">5</span>, -<span class=\"code-num\">4</span>, -<span class=\"code-num\">3</span>, -<span class=\"code-num\">2</span>, -<span class=\"code-num\">1</span>]\nintegers = negative_numbers <span class=\"code-op\">+</span> zero <span class=\"code-op\">+</span> positive_numbers\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">'Combined integers:'</span>, integers)  <span class=\"code-comment\"># Output: [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5]</span>\n\nfruits = [<span class=\"code-str\">'banana'</span>, <span class=\"code-str\">'orange'</span>, <span class=\"code-str\">'mango'</span>, <span class=\"code-str\">'lemon'</span>]\nvegetables = [<span class=\"code-str\">'Tomato'</span>, <span class=\"code-str\">'Potato'</span>, <span class=\"code-str\">'Cabbage'</span>, <span class=\"code-str\">'Onion'</span>, <span class=\"code-str\">'Carrot'</span>]\nfruits_and_vegetables = fruits <span class=\"code-op\">+</span> vegetables\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">'Joined foods:'</span>, fruits_and_vegetables) <span class=\"code-comment\"># Output: ['banana', ..., 'Carrot']</span>\n\n<span class=\"code-comment\"># 4. In-Place Extension using extend() (Reuses Memory Buffer)</span>\n<span class=\"code-comment\"># syntax: list1.extend(list2)</span>\nnum1 = [<span class=\"code-num\">0</span>, <span class=\"code-num\">1</span>, <span class=\"code-num\">2</span>, <span class=\"code-num\">3</span>]\nnum2 = [<span class=\"code-num\">4</span>, <span class=\"code-num\">5</span>, <span class=\"code-num\">6</span>]\nnum1.<span class=\"code-fn\">extend</span>(num2)\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">'Numbers:'</span>, num1)                  <span class=\"code-comment\"># Output: Numbers: [0, 1, 2, 3, 4, 5, 6]</span>\n\nnegative_numbers = [-<span class=\"code-num\">5</span>, -<span class=\"code-num\">4</span>, -<span class=\"code-num\">3</span>, -<span class=\"code-num\">2</span>, -<span class=\"code-num\">1</span>]\npositive_numbers = [<span class=\"code-num\">1</span>, <span class=\"code-num\">2</span>, <span class=\"code-num\">3</span>, <span class=\"code-num\">4</span>, <span class=\"code-num\">5</span>]\nzero = [<span class=\"code-num\">0</span>]\nnegative_numbers.<span class=\"code-fn\">extend</span>(zero)\nnegative_numbers.<span class=\"code-fn\">extend</span>(positive_numbers)\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">'Integers:'</span>, negative_numbers)     <span class=\"code-comment\"># Output: Integers: [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5]</span>\n\nfruits = [<span class=\"code-str\">'banana'</span>, <span class=\"code-str\">'orange'</span>, <span class=\"code-str\">'mango'</span>, <span class=\"code-str\">'lemon'</span>]\nvegetables = [<span class=\"code-str\">'Tomato'</span>, <span class=\"code-str\">'Potato'</span>, <span class=\"code-str\">'Cabbage'</span>, <span class=\"code-str\">'Onion'</span>, <span class=\"code-str\">'Carrot'</span>]\nfruits.<span class=\"code-fn\">extend</span>(vegetables)\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">'Fruits and vegetables:'</span>, fruits)</code></pre>\n      </div>\n    </div>\n  </div>\n\n    <!-- 💡 Key Notes -->\n  <div class=\"py-recall-hook py-keynotes-card\">\n    <div class=\"py-keynotes-icon-wrap\">💡</div>\n    <div class=\"py-recall-body py-keynotes-body\">\n      <div class=\"py-recall-header py-keynotes-header\">\n        <span class=\"py-recall-title py-keynotes-title\">Key Notes</span>\n        <span class=\"py-recall-tag py-keynotes-tag\">Adding & Joining</span>\n      </div>\n      <ul class=\"py-keynotes-list\">\n        <li><strong>append() vs extend()</strong>: <code>lst.append([1, 2])</code> inserts the whole list as a single nested element <code>[..., [1, 2]]</code>. <code>lst.extend([1, 2])</code> unpacks each item into the parent list.</li>\n        <li><strong>Memory Efficiency</strong>: Prefer <code>extend()</code> over <code>+</code> when building large datasets; <code>+</code> allocates a new list each time ($O(N+M)$), while <code>extend()</code> reuses the allocated memory buffer.</li>\n        <li><strong>insert() Shifting Cost</strong>: <code>insert(0, item)</code> requires moving all existing $N$ elements one slot right ($O(N)$ time).</li>\n      </ul>\n    </div>\n  </div>\n</div>\n<!-- ═══ SECTION 06: Removing Items ═══ -->\n<div class=\"slide-section\" id=\"day04RemovingSection\">\n  <h2 class=\"slide-section-title heading-box-wrap heading-with-audio\" id=\"headingRemoving\">\n    <span class=\"heading-num-box\">06</span>\n    <span class=\"heading-title-box\">\n      <span class=\"heading-title-text\">Removing & Clearing Elements</span>\n      <button class=\"audio-play-btn\" onclick=\"playAudio('Day04/New_PyDay04Audio16.mp3', this)\" title=\"Play narration\">\n        <svg class=\"play-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M8 5v14l11-7z\"/></svg>\n      </button>\n    </span>\n  </h2>\n  <p class=\"section-intro-text\">Python offers four distinct ways to remove elements from a list: removing by value (<code>remove</code>), removing by index while retrieving the value (<code>pop</code>), deleting items, slices, or the entire list (<code>del</code>), and wiping all items to an empty state (<code>clear</code>).</p>\n\n  <!-- Removing Table Subcard -->\n  <div class=\"topic-subcard\" id=\"day04RemovingTableSection\">\n    <div class=\"table-header-wrap\">\n      <h4 class=\"table-header-title\">List Element Removal Methods &amp; Statements Comparison</h4>\n      <div class=\"table-header-actions\">\n        <div class=\"table-search-box\">\n        <svg class=\"table-search-icon\" width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\"><circle cx=\"11\" cy=\"11\" r=\"8\"/><path d=\"m21 21-4.3-4.3\"/></svg>\n        <input type=\"text\" class=\"table-search-input\" placeholder=\"Search removal...\" oninput=\"filterTableRows(this)\" />\n      </div>\n        <button class=\"audio-play-btn\" onclick=\"playAudio('Day04/New_PyDay04Audio17.mp3', this)\" title=\"Play narration\">\n        <svg class=\"play-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M8 5v14l11-7z\"/></svg>\n      </button>\n      </div>\n    </div>\n    <div class=\"db-mock-table-wrap\">\n      <table class=\"db-table-mock db-table-mock--compact method-table remove-table\">\n        <thead>\n          <tr>\n            <th>Method / Keyword</th>\n            <th>Syntax</th>\n            <th>Target Parameter</th>\n            <th>Return Value &amp; Failure Mode</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n            <td><code>remove()</code></td>\n            <td><code>lst.remove(item)</code></td>\n            <td>Value match</td>\n            <td><code>None</code> &mdash; Removes <strong>first occurrence</strong>; raises <code>ValueError</code> if item is missing</td>\n          </tr>\n          <tr>\n            <td><code>pop()</code></td>\n            <td><code>lst.pop()</code></td>\n            <td>Default tail (last item)</td>\n            <td>Removed item &mdash; $O(1)$ amortized; raises <code>IndexError</code> on empty list</td>\n          </tr>\n          <tr>\n            <td><code>pop(index)</code></td>\n            <td><code>lst.pop(index)</code></td>\n            <td>Explicit index</td>\n            <td>Removed item &mdash; $O(N)$ (shifts remaining items); raises <code>IndexError</code></td>\n          </tr>\n          <tr>\n            <td><code>del lst[index]</code></td>\n            <td><code>del lst[0]</code></td>\n            <td>Single index</td>\n            <td>None (statement) &mdash; Deletes single item in-place; raises <code>IndexError</code></td>\n          </tr>\n          <tr>\n            <td><code>del lst[start:stop]</code></td>\n            <td><code>del fruits[1:3]</code></td>\n            <td>Slice range</td>\n            <td>None (statement) &mdash; Deletes range $[1, 3)$; index 3 is not deleted!</td>\n          </tr>\n          <tr>\n            <td><code>del lst</code></td>\n            <td><code>del fruits</code></td>\n            <td>Entire variable</td>\n            <td>None (statement) &mdash; Deletes list completely; subsequent access raises <code>NameError</code></td>\n          </tr>\n          <tr>\n            <td><code>clear()</code></td>\n            <td><code>lst.clear()</code></td>\n            <td>None</td>\n            <td><code>None</code> &mdash; Empties all items to <code>[]</code>; preserves list variable in RAM</td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n  </div>\n\n    <!-- Code Container Subcard -->\n  <div class=\"topic-subcard\" id=\"day04RemovingCodeSection\">\n    <div class=\"subcard-header-with-audio\">\n      <h4 class=\"subcard-header-title\">Removing List Elements in Python</h4>\n      <button class=\"audio-play-btn\" onclick=\"playAudio('Day04/New_PyDay04Audio18.mp3', this)\" title=\"Play narration\">\n        <svg class=\"play-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M8 5v14l11-7z\"/></svg>\n      </button>\n    </div>\n    <div class=\"code-block-container\">\n      <div class=\"code-subblock\">\n        <pre><code><span class=\"code-comment\"># 1. Removing Items by Value using remove() (First occurrence only, O(N))</span>\n<span class=\"code-comment\"># syntax: lst.remove(item)</span>\nfruits = [<span class=\"code-str\">'banana'</span>, <span class=\"code-str\">'orange'</span>, <span class=\"code-str\">'mango'</span>, <span class=\"code-str\">'lemon'</span>, <span class=\"code-str\">'banana'</span>]\nfruits.<span class=\"code-fn\">remove</span>(<span class=\"code-str\">'banana'</span>)\n<span class=\"code-fn\">print</span>(fruits)       <span class=\"code-comment\"># Output: ['orange', 'mango', 'lemon', 'banana']</span>\nfruits.<span class=\"code-fn\">remove</span>(<span class=\"code-str\">'lemon'</span>)\n<span class=\"code-fn\">print</span>(fruits)       <span class=\"code-comment\"># Output: ['orange', 'mango', 'banana']</span>\n\n<span class=\"code-comment\"># 2. Removing &amp; Returning Items using pop() (pop() is O(1), pop(0) is O(N))</span>\n<span class=\"code-comment\"># syntax: lst.pop(), lst.pop(index)</span>\nfruits = [<span class=\"code-str\">'banana'</span>, <span class=\"code-str\">'orange'</span>, <span class=\"code-str\">'mango'</span>, <span class=\"code-str\">'lemon'</span>]\npopped_item = fruits.<span class=\"code-fn\">pop</span>()\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">'Popped item:'</span>, popped_item)   <span class=\"code-comment\"># Output: lemon</span>\n<span class=\"code-fn\">print</span>(fruits)                        <span class=\"code-comment\"># Output: ['banana', 'orange', 'mango']</span>\nfirst_popped = fruits.<span class=\"code-fn\">pop</span>(<span class=\"code-num\">0</span>)\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">'Popped at 0:'</span>, first_popped)  <span class=\"code-comment\"># Output: banana</span>\n<span class=\"code-fn\">print</span>(fruits)                        <span class=\"code-comment\"># Output: ['orange', 'mango']</span>\n\n<span class=\"code-comment\"># 3. Removing by Index or Slice using the 'del' Keyword Statement</span>\n<span class=\"code-comment\"># syntax: del lst[index], del lst[start:stop], del lst</span>\nfruits = [<span class=\"code-str\">'banana'</span>, <span class=\"code-str\">'orange'</span>, <span class=\"code-str\">'mango'</span>, <span class=\"code-str\">'lemon'</span>, <span class=\"code-str\">'kiwi'</span>, <span class=\"code-str\">'lime'</span>]\n<span class=\"code-kw\">del</span> fruits[<span class=\"code-num\">0</span>]\n<span class=\"code-fn\">print</span>(fruits)       <span class=\"code-comment\"># Output: ['orange', 'mango', 'lemon', 'kiwi', 'lime']</span>\n<span class=\"code-kw\">del</span> fruits[<span class=\"code-num\">1</span>]\n<span class=\"code-fn\">print</span>(fruits)       <span class=\"code-comment\"># Output: ['orange', 'lemon', 'kiwi', 'lime']</span>\n<span class=\"code-kw\">del</span> fruits[<span class=\"code-num\">1</span>:<span class=\"code-num\">3</span>]     <span class=\"code-comment\"># Deletes items at index 1 and 2 (excludes index 3)</span>\n<span class=\"code-fn\">print</span>(fruits)       <span class=\"code-comment\"># Output: ['orange', 'lime']</span>\n\n<span class=\"code-comment\"># del fruits        # Deletes the list binding completely from namespace</span>\n<span class=\"code-comment\"># print(fruits)     # Output: NameError: name 'fruits' is not defined</span>\n\n<span class=\"code-comment\"># 4. Clearing All Items using clear() (Empties List, Preserves Variable in RAM)</span>\n<span class=\"code-comment\"># syntax: lst.clear()</span>\nfruits = [<span class=\"code-str\">'banana'</span>, <span class=\"code-str\">'orange'</span>, <span class=\"code-str\">'mango'</span>, <span class=\"code-str\">'lemon'</span>]\nfruits.<span class=\"code-fn\">clear</span>()\n<span class=\"code-fn\">print</span>(fruits)       <span class=\"code-comment\"># Output: []</span></code></pre>\n      </div>\n    </div>\n  </div>\n\n    <!-- 💡 Key Notes -->\n  <div class=\"py-recall-hook py-keynotes-card\">\n    <div class=\"py-keynotes-icon-wrap\">💡</div>\n    <div class=\"py-recall-body py-keynotes-body\">\n      <div class=\"py-recall-header py-keynotes-header\">\n        <span class=\"py-recall-title py-keynotes-title\">Key Notes</span>\n        <span class=\"py-recall-tag py-keynotes-tag\">Deletion Mechanics</span>\n      </div>\n      <ul class=\"py-keynotes-list\">\n        <li><strong>First Occurrence Only</strong>: <code>lst.remove(x)</code> removes only the FIRST matching element. To remove all occurrences, use a list comprehension: <code>[i for i in lst if i != x]</code>.</li>\n        <li><strong>clear() vs del lst</strong>: <code>lst.clear()</code> keeps the list variable alive and empties its contents. <code>del lst</code> completely destroys the variable name, raising <code>NameError</code> on subsequent access.</li>\n        <li><strong>pop() Returns the Item</strong>: Use <code>pop()</code> when implementing stacks (LIFO with <code>pop()</code>) or queues (FIFO with <code>pop(0)</code>).</li>\n      </ul>\n    </div>\n  </div>\n</div>\n<!-- ═══ SECTION 07: References and Copying ═══ -->\n<div class=\"slide-section\" id=\"day04CopyingSection\">\n  <h2 class=\"slide-section-title heading-box-wrap heading-with-audio\" id=\"headingCopying\">\n    <span class=\"heading-num-box\">07</span>\n    <span class=\"heading-title-box\">\n      <span class=\"heading-title-text\">Shallow & Deep Copying</span>\n      <button class=\"audio-play-btn\" onclick=\"playAudio('Day04/New_PyDay04Audio19.mp3', this)\" title=\"Play narration\">\n        <svg class=\"play-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M8 5v14l11-7z\"/></svg>\n      </button>\n    </span>\n  </h2>\n  <p class=\"section-intro-text\">Reassigning a list (<code>list2 = list1</code>) creates an alias pointing to the same RAM address. Modifying <code>list2</code> alters <code>list1</code> simultaneously. To prevent unintended side effects, use <code>copy()</code> for shallow duplication or <code>copy.deepcopy()</code> for nested structures.</p>\n\n  <!-- Copying Table Subcard -->\n  <div class=\"topic-subcard\" id=\"day04CopyingTableSection\">\n    <div class=\"table-header-wrap\">\n      <h4 class=\"table-header-title\">Aliasing vs Shallow Copy vs Deep Copy Architecture</h4>\n      <div class=\"table-header-actions\">\n        <div class=\"table-search-box\">\n        <svg class=\"table-search-icon\" width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\"><circle cx=\"11\" cy=\"11\" r=\"8\"/><path d=\"m21 21-4.3-4.3\"/></svg>\n        <input type=\"text\" class=\"table-search-input\" placeholder=\"Search copying...\" oninput=\"filterTableRows(this)\" />\n      </div>\n        <button class=\"audio-play-btn\" onclick=\"playAudio('Day04/New_PyDay04Audio20.mp3', this)\" title=\"Play narration\">\n        <svg class=\"play-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M8 5v14l11-7z\"/></svg>\n      </button>\n      </div>\n    </div>\n    <div class=\"db-mock-table-wrap\">\n      <table class=\"db-table-mock db-table-mock--compact copy-table\">\n        <thead>\n          <tr>\n            <th>Technique</th>\n            <th>Syntax Example</th>\n            <th>Memory Identity (<code>a is b</code>)</th>\n            <th>Mutation Protection</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n            <td>Variable Reassignment</td>\n            <td><code>list2 = list1</code></td>\n            <td><code>True</code> (Same memory address)</td>\n            <td><strong>Zero protection</strong> &mdash; Modifying <code>list2</code> mutates <code>list1</code> immediately!</td>\n          </tr>\n          <tr>\n            <td>Shallow Copy</td>\n            <td><code>fruits_copy = fruits.copy()</code></td>\n            <td><code>False</code> (New memory ID)</td>\n            <td><strong>Protected</strong> &mdash; Modifying copy leaves original intact for 1D elements</td>\n          </tr>\n          <tr>\n            <td>Slice Copy</td>\n            <td><code>fruits_copy = fruits[:]</code></td>\n            <td><code>False</code> (New memory ID)</td>\n            <td><strong>Protected</strong> &mdash; Full slice produces independent 1D container</td>\n          </tr>\n          <tr>\n            <td>Constructor Copy</td>\n            <td><code>fruits_copy = list(fruits)</code></td>\n            <td><code>False</code> (New memory ID)</td>\n            <td><strong>Protected</strong> &mdash; Constructor duplicates top-level pointer array</td>\n          </tr>\n          <tr>\n            <td>Deep Copy</td>\n            <td><code>copy.deepcopy(nested_list)</code></td>\n            <td><code>False</code> (New memory ID)</td>\n            <td><strong>Complete isolation</strong> &mdash; Recursively duplicates all nested lists</td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n  </div>\n\n    <!-- Code Container Subcard -->\n  <div class=\"topic-subcard\" id=\"day04CopyingCodeSection\">\n    <div class=\"subcard-header-with-audio\">\n      <h4 class=\"subcard-header-title\">Copying and Memory Aliasing in Action</h4>\n      <button class=\"audio-play-btn\" onclick=\"playAudio('Day04/New_PyDay04Audio21.mp3', this)\" title=\"Play narration\">\n        <svg class=\"play-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M8 5v14l11-7z\"/></svg>\n      </button>\n    </div>\n    <div class=\"code-block-container\">\n      <div class=\"code-subblock\">\n        <pre><code><span class=\"code-comment\"># 1. Reassigning to a New Variable: The Pointer Aliasing Trap</span>\nfruits = [<span class=\"code-str\">'banana'</span>, <span class=\"code-str\">'orange'</span>, <span class=\"code-str\">'mango'</span>, <span class=\"code-str\">'lemon'</span>]\nalias_fruits = fruits                               <span class=\"code-comment\"># Both point to identical memory buffer</span>\nalias_fruits.<span class=\"code-fn\">append</span>(<span class=\"code-str\">'lime'</span>)\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">'fruits (mutated original):'</span>, fruits)         <span class=\"code-comment\"># Output: ['banana', 'orange', 'mango', 'lemon', 'lime']</span>\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">'Same memory reference:'</span>, fruits <span class=\"code-kw\">is</span> alias_fruits)   <span class=\"code-comment\"># Output: True</span>\n\n<span class=\"code-comment\"># 2. Safe Shallow Copying using copy()</span>\n<span class=\"code-comment\"># syntax: lst_copy = lst.copy()</span>\nfruits = [<span class=\"code-str\">'banana'</span>, <span class=\"code-str\">'orange'</span>, <span class=\"code-str\">'mango'</span>, <span class=\"code-str\">'lemon'</span>]\nfruits_copy = fruits.<span class=\"code-fn\">copy</span>()\nfruits_copy.<span class=\"code-fn\">append</span>(<span class=\"code-str\">'apple'</span>)\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">'fruits (original unchanged):'</span>, fruits)        <span class=\"code-comment\"># Output: ['banana', 'orange', 'mango', 'lemon']</span>\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">'fruits_copy (modified copy):'</span>, fruits_copy)   <span class=\"code-comment\"># Output: ['banana', 'orange', 'mango', 'lemon', 'apple']</span>\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">'Distinct memory objects:'</span>, fruits <span class=\"code-kw\">is</span> fruits_copy)   <span class=\"code-comment\"># Output: False</span>\n\n<span class=\"code-comment\"># 3. Deep Copying for Nested Multi-Dimensional Lists (copy.deepcopy)</span>\n<span class=\"code-kw\">import</span> copy\nmatrix = [[<span class=\"code-num\">1</span>, <span class=\"code-num\">2</span>], [<span class=\"code-num\">3</span>, <span class=\"code-num\">4</span>]]\nmatrix_deep = copy.<span class=\"code-fn\">deepcopy</span>(matrix)\nmatrix_deep[<span class=\"code-num\">0</span>][<span class=\"code-num\">0</span>] = <span class=\"code-num\">99</span>\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">'matrix_deep[0][0]:'</span>, matrix_deep[<span class=\"code-num\">0</span>][<span class=\"code-num\">0</span>])     <span class=\"code-comment\"># Output: 99</span>\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">'Original matrix[0][0] intact:'</span>, matrix[<span class=\"code-num\">0</span>][<span class=\"code-num\">0</span>]) <span class=\"code-comment\"># Output: 1 (Untouched!)</span></code></pre>\n      </div>\n    </div>\n  </div>\n\n    <!-- 💡 Key Notes -->\n  <div class=\"py-recall-hook py-keynotes-card\">\n    <div class=\"py-keynotes-icon-wrap\">💡</div>\n    <div class=\"py-recall-body py-keynotes-body\">\n      <div class=\"py-recall-header py-keynotes-header\">\n        <span class=\"py-recall-title py-keynotes-title\">Key Notes</span>\n        <span class=\"py-recall-tag py-keynotes-tag\">Copying & Aliasing</span>\n      </div>\n      <ul class=\"py-keynotes-list\">\n        <li><strong>The Reference Problem</strong>: <code>list2 = list1</code> creates an alias. To perform transformations safely on an isolated dataset, always write <code>list2 = list1.copy()</code>.</li>\n        <li><strong>Shallow Copy Limitations</strong>: <code>lst.copy()</code> duplicates the outer list container. If items inside are lists or dictionaries, changes to nested structures affect both copies.</li>\n        <li><strong>Multiplication Danger</strong>: <code>[[0]*3]*3</code> duplicates the same row pointer 3 times! Use <code>[[0]*3 for _ in range(3)]</code> to create distinct nested lists.</li>\n      </ul>\n    </div>\n  </div>\n</div>\n<!-- ═══ SECTION 08: Critical Anti-Patterns ═══ -->\n<div class=\"slide-section\" id=\"day04MistakesSection\">\n  <h2 class=\"slide-section-title heading-box-wrap heading-with-audio\" id=\"headingMistakes\">\n    <span class=\"heading-num-box\">08</span>\n    <span class=\"heading-title-box\">\n      <span class=\"heading-title-text\">Common Anti-Patterns</span>\n      <button class=\"audio-play-btn\" onclick=\"playAudio('Day04/New_PyDay04Audio22.mp3', this)\" title=\"Play narration\">\n        <svg class=\"play-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M8 5v14l11-7z\"/></svg>\n      </button>\n    </span>\n  </h2>\n  \n  <div class=\"topic-subcard\" id=\"day04MistakesTableSection\">\n    <div class=\"table-header-wrap\">\n      <h4 class=\"table-header-title\">Master Anti-Pattern Review Table</h4>\n      <div class=\"table-search-box\">\n        <svg class=\"table-search-icon\" width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\"><circle cx=\"11\" cy=\"11\" r=\"8\"/><path d=\"m21 21-4.3-4.3\"/></svg>\n        <input type=\"text\" class=\"table-search-input\" placeholder=\"Search 14 anti-patterns...\" oninput=\"filterTableRows(this)\" />\n      </div>\n    </div>\n    <div class=\"db-mock-table-wrap\">\n      <table class=\"db-table-mock db-table-mock--compact anti-pattern-table\">\n        <thead>\n          <tr>\n            <th>Buggy Code Pattern</th>\n            <th>Runtime Result</th>\n            <th>Root Cause / Python Mechanism</th>\n            <th>Recommended Production Fix</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n            <td><code class=\"ap-code-bug\">lst = lst.sort()</code></td>\n            <td><span class=\"ap-result-bad\">lst becomes None</span></td>\n            <td><code>sort()</code> mutates list in-place and returns <code>None</code></td>\n            <td><code class=\"ap-code-fix\">lst.sort()</code> or <code>lst = sorted(lst)</code></td>\n          </tr>\n          <tr>\n            <td><code class=\"ap-code-bug\">for x in lst: lst.remove(x)</code></td>\n            <td><span class=\"ap-result-bad\">Skips every 2nd element</span></td>\n            <td>Mutating list during iteration causes internal iterator index to skip elements</td>\n            <td><code class=\"ap-code-fix\">lst = [x for x in lst if keep(x)]</code></td>\n          </tr>\n          <tr>\n            <td><code class=\"ap-code-bug\">def add(x, lst=[]):</code></td>\n            <td><span class=\"ap-result-bad\">State leaks across calls</span></td>\n            <td>Default arguments are evaluated once at function definition time</td>\n            <td><code class=\"ap-code-fix\">def add(x, lst=None): if lst is None: lst = []</code></td>\n          </tr>\n          <tr>\n            <td><code class=\"ap-code-bug\">[[0] * 3] * 3</code></td>\n            <td><span class=\"ap-result-bad\">All rows mutate together</span></td>\n            <td>Outer multiplication duplicates the reference to the same single row list</td>\n            <td><code class=\"ap-code-fix\">[[0] * 3 for _ in range(3)]</code></td>\n          </tr>\n          <tr>\n            <td><code class=\"ap-code-bug\">lst.append([1, 2])</code></td>\n            <td><span class=\"ap-result-bad\">Nested list [..., [1, 2]]</span></td>\n            <td><code>append()</code> treats list argument as a single element</td>\n            <td><code class=\"ap-code-fix\">lst.extend([1, 2])</code></td>\n          </tr>\n          <tr>\n            <td><code class=\"ap-code-bug\">for x in data: lst.insert(0, x)</code></td>\n            <td><span class=\"ap-result-bad\">Catastrophic $O(N^2)$ slowdown</span></td>\n            <td>Inserting at index 0 shifts all existing pointers right on every iteration</td>\n            <td><code class=\"ap-code-fix\">collections.deque.appendleft()</code></td>\n          </tr>\n          <tr>\n            <td><code class=\"ap-code-bug\">lst.index(\"missing\")</code></td>\n            <td><span class=\"ap-result-bad\">ValueError: unhandled crash</span></td>\n            <td><code>index()</code> raises an exception if the element does not exist</td>\n            <td><code class=\"ap-code-fix\">if \"missing\" in lst: idx = lst.index(...)</code></td>\n          </tr>\n          <tr>\n            <td><code class=\"ap-code-bug\">b = a; b[0] = 99</code></td>\n            <td><span class=\"ap-result-bad\">Silently mutates original a</span></td>\n            <td>Simple assignment creates an alias pointing to the same RAM address</td>\n            <td><code class=\"ap-code-fix\">b = a.copy()</code> or <code>b = a[:]</code></td>\n          </tr>\n          <tr>\n            <td><code class=\"ap-code-bug\">lst[:3][0] = 99</code></td>\n            <td><span class=\"ap-result-bad\">Original lst unmodified</span></td>\n            <td>Slicing creates a temporary list copy; mutation is discarded on GC</td>\n            <td><code class=\"ap-code-fix\">lst[0] = 99</code></td>\n          </tr>\n          <tr>\n            <td><code class=\"ap-code-bug\">del lst[:] vs del lst</code></td>\n            <td><span class=\"ap-result-bad\">Unbound local / NameError</span></td>\n            <td><code>del lst</code> unbinds the name; other references still retain the data</td>\n            <td><code class=\"ap-code-fix\">lst.clear()</code></td>\n          </tr>\n          <tr>\n            <td><code class=\"ap-code-bug\">list = [1, 2, 3]</code></td>\n            <td><span class=\"ap-result-bad\">Shadows built-in list()</span></td>\n            <td>Overwrites Python's built-in constructor name</td>\n            <td><code class=\"ap-code-fix\">items = [1, 2, 3]</code></td>\n          </tr>\n          <tr>\n            <td><code class=\"ap-code-bug\">if x in large_list in loop</code></td>\n            <td><span class=\"ap-result-bad\">Slow $O(N \times M)$ scan</span></td>\n            <td>List membership requires linear scan of all items</td>\n            <td><code class=\"ap-code-fix\">lookup_set = set(large_list)</code> ($O(1)$)</td>\n          </tr>\n          <tr>\n            <td><code class=\"ap-code-bug\">a, b, c = [1, 2]</code></td>\n            <td><span class=\"ap-result-bad\">ValueError: not enough values</span></td>\n            <td>Variable target count does not match list length</td>\n            <td><code class=\"ap-code-fix\">a, b, *extra = [1, 2]</code></td>\n          </tr>\n          <tr>\n            <td><code class=\"ap-code-bug\">sorted(lst) (expecting in-place)</code></td>\n            <td><span class=\"ap-result-bad\">lst remains unsorted</span></td>\n            <td><code>sorted()</code> returns a new list; does not mutate the caller</td>\n            <td><code class=\"ap-code-fix\">lst.sort()</code> or <code>lst = sorted(lst)</code></td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n  </div>\n\n    <!-- 💡 Key Notes -->\n  <div class=\"py-recall-hook py-keynotes-card\">\n    <div class=\"py-keynotes-icon-wrap\">💡</div>\n    <div class=\"py-recall-body py-keynotes-body\">\n      <div class=\"py-recall-header py-keynotes-header\">\n        <span class=\"py-recall-title py-keynotes-title\">Key Notes</span>\n        <span class=\"py-recall-tag py-keynotes-tag\">Production Best Practices</span>\n      </div>\n      <ul class=\"py-keynotes-list\">\n        <li><strong>In-Place vs Return</strong>: Python mutating methods (<code>sort()</code>, <code>reverse()</code>, <code>append()</code>, <code>extend()</code>) return <code>None</code>. Never write <code>lst = lst.sort()</code>.</li>\n        <li><strong>Loop Filtering</strong>: Never add or remove items from a list while iterating over it with a <code>for</code> loop. Use list comprehensions or iterate over a copy: <code>for x in lst[:]:</code>.</li>\n        <li><strong>Default Arguments</strong>: Never use mutable objects (lists, dicts) as default parameter values. Always default to <code>None</code> and initialize inside the function body.</li>\n      </ul>\n    </div>\n  </div>\n</div>\n<!-- ═══ SECTION 09: Counting, Indexing, Reversing & Sorting ═══ -->\n<div class=\"slide-section\" id=\"day04SortingPerfSection\">\n  <h2 class=\"slide-section-title heading-box-wrap heading-with-audio\" id=\"headingSortingPerf\">\n    <span class=\"heading-num-box\">09</span>\n    <span class=\"heading-title-box\">\n      <span class=\"heading-title-text\">Sorting & Reversing</span>\n      <button class=\"audio-play-btn\" onclick=\"playAudio('Day04/New_PyDay04Audio23.mp3', this)\" title=\"Play narration\">\n        <svg class=\"play-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M8 5v14l11-7z\"/></svg>\n      </button>\n    </span>\n  </h2>\n  <p class=\"section-intro-text\">Python provides dedicated methods to inspect, reverse, and sort lists: <code>count()</code> returns the occurrences of an item, <code>index()</code> finds the position of an item, <code>reverse()</code> flips elements in place, while <code>sort()</code> and <code>sorted()</code> order elements in ascending or descending order.</p>\n\n  <!-- Sorting Table Subcard -->\n  <div class=\"topic-subcard\" id=\"day04SortingPerfTableSection\">\n    <div class=\"table-header-wrap\">\n      <h4 class=\"table-header-title\">Counting, Indexing, Reversing &amp; Sorting Methods Comparison</h4>\n      <div class=\"table-search-box\">\n        <svg class=\"table-search-icon\" width=\"13\" height=\"13\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\"><circle cx=\"11\" cy=\"11\" r=\"8\"/><path d=\"m21 21-4.3-4.3\"/></svg>\n        <input type=\"text\" class=\"table-search-input\" placeholder=\"Search sorting methods...\" oninput=\"filterTableRows(this)\" />\n      </div>\n    </div>\n    <div class=\"db-mock-table-wrap\">\n      <table class=\"db-table-mock db-table-mock--compact sort-table\">\n        <thead>\n          <tr>\n            <th>Method / Function</th>\n            <th>Code Syntax</th>\n            <th>Return Value</th>\n            <th>Mutates Original List?</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n            <td><code>count(item)</code></td>\n            <td><code>fruits.count('orange')</code></td>\n            <td>Number of times item appears</td>\n            <td><strong>No</strong> &mdash; Read-only inspection ($O(N)$)</td>\n          </tr>\n          <tr>\n            <td><code>index(item)</code></td>\n            <td><code>fruits.index('orange')</code></td>\n            <td>Index of first occurrence</td>\n            <td><strong>No</strong> &mdash; Read-only; raises <code>ValueError</code> if item is missing</td>\n          </tr>\n          <tr>\n            <td><code>reverse()</code></td>\n            <td><code>fruits.reverse()</code></td>\n            <td><code>None</code></td>\n            <td><strong>Yes</strong> &mdash; Reverses list order in-place ($O(N)$)</td>\n          </tr>\n          <tr>\n            <td><code>sort()</code></td>\n            <td><code>fruits.sort()</code></td>\n            <td><code>None</code></td>\n            <td><strong>Yes</strong> &mdash; In-place ascending sort ($O(N log N)$ Timsort)</td>\n          </tr>\n          <tr>\n            <td><code>sort(reverse=True)</code></td>\n            <td><code>fruits.sort(reverse=True)</code></td>\n            <td><code>None</code></td>\n            <td><strong>Yes</strong> &mdash; In-place descending sort ($O(N log N)$)</td>\n          </tr>\n          <tr>\n            <td><code>sorted()</code></td>\n            <td><code>sorted(fruits)</code></td>\n            <td>New sorted list</td>\n            <td><strong>No</strong> &mdash; Preserves original list; returns fresh copy</td>\n          </tr>\n          <tr>\n            <td><code>sorted(reverse=True)</code></td>\n            <td><code>sorted(fruits, reverse=True)</code></td>\n            <td>New descending list</td>\n            <td><strong>No</strong> &mdash; Preserves original list; returns fresh copy</td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n  </div>\n\n    <!-- Code Container Subcard -->\n  <div class=\"topic-subcard\" id=\"day04SortingPerfCodeSection\">\n    <div class=\"subcard-header-with-audio\">\n      <h4 class=\"subcard-header-title\">Counting, Indexing, Reversing &amp; Sorting in Action</h4>\n      <button class=\"audio-play-btn\" onclick=\"playAudio('Day04/New_PyDay04Audio24.mp3', this)\" title=\"Play narration\">\n        <svg class=\"play-icon\" width=\"12\" height=\"12\" viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M8 5v14l11-7z\"/></svg>\n      </button>\n    </div>\n    <div class=\"code-block-container\">\n      <div class=\"code-subblock\">\n        <pre><code><span class=\"code-comment\"># 1. Counting Items in a List using count() (O(N) Frequency Scan)</span>\n<span class=\"code-comment\"># syntax: lst.count(item)</span>\nfruits = [<span class=\"code-str\">'banana'</span>, <span class=\"code-str\">'orange'</span>, <span class=\"code-str\">'mango'</span>, <span class=\"code-str\">'lemon'</span>]\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">\"fruits.count('orange'):\"</span>, fruits.<span class=\"code-fn\">count</span>(<span class=\"code-str\">'orange'</span>))  <span class=\"code-comment\"># Output: 1</span>\nages = [<span class=\"code-num\">22</span>, <span class=\"code-num\">19</span>, <span class=\"code-num\">24</span>, <span class=\"code-num\">25</span>, <span class=\"code-num\">26</span>, <span class=\"code-num\">24</span>, <span class=\"code-num\">25</span>, <span class=\"code-num\">24</span>]\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">\"ages.count(24):        \"</span>, ages.<span class=\"code-fn\">count</span>(<span class=\"code-num\">24</span>))          <span class=\"code-comment\"># Output: 3</span>\n\n<span class=\"code-comment\"># 2. Finding First Index of an Item using index()</span>\n<span class=\"code-comment\"># syntax: lst.index(item)</span>\nfruits = [<span class=\"code-str\">'banana'</span>, <span class=\"code-str\">'orange'</span>, <span class=\"code-str\">'mango'</span>, <span class=\"code-str\">'lemon'</span>]\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">\"fruits.index('orange'):\"</span>, fruits.<span class=\"code-fn\">index</span>(<span class=\"code-str\">'orange'</span>))  <span class=\"code-comment\"># Output: 1</span>\nages = [<span class=\"code-num\">22</span>, <span class=\"code-num\">19</span>, <span class=\"code-num\">24</span>, <span class=\"code-num\">25</span>, <span class=\"code-num\">26</span>, <span class=\"code-num\">24</span>, <span class=\"code-num\">25</span>, <span class=\"code-num\">24</span>]\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">\"ages.index(24):        \"</span>, ages.<span class=\"code-fn\">index</span>(<span class=\"code-num\">24</span>))          <span class=\"code-comment\"># Output: 2 (First match)</span>\n\n<span class=\"code-comment\"># 3. In-Place List Reversal using reverse() (Zero Extra Allocation)</span>\n<span class=\"code-comment\"># syntax: lst.reverse()</span>\nfruits = [<span class=\"code-str\">'banana'</span>, <span class=\"code-str\">'orange'</span>, <span class=\"code-str\">'mango'</span>, <span class=\"code-str\">'lemon'</span>]\nfruits.<span class=\"code-fn\">reverse</span>()\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">\"fruits.reverse():\"</span>, fruits)                        <span class=\"code-comment\"># Output: ['lemon', 'mango', 'orange', 'banana']</span>\nages = [<span class=\"code-num\">22</span>, <span class=\"code-num\">19</span>, <span class=\"code-num\">24</span>, <span class=\"code-num\">25</span>, <span class=\"code-num\">26</span>, <span class=\"code-num\">24</span>, <span class=\"code-num\">25</span>, <span class=\"code-num\">24</span>]\nages.<span class=\"code-fn\">reverse</span>()\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">\"ages.reverse():  \"</span>, ages)                          <span class=\"code-comment\"># Output: [24, 25, 24, 26, 25, 24, 19, 22]</span>\n\n<span class=\"code-comment\"># 4. In-Place Mutation Sorting using sort() (Timsort Algorithm)</span>\n<span class=\"code-comment\"># syntax: lst.sort(), lst.sort(reverse=True)</span>\nfruits = [<span class=\"code-str\">'banana'</span>, <span class=\"code-str\">'orange'</span>, <span class=\"code-str\">'mango'</span>, <span class=\"code-str\">'lemon'</span>]\nfruits.<span class=\"code-fn\">sort</span>()\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">\"fruits.sort():            \"</span>, fruits)              <span class=\"code-comment\"># Output: ['banana', 'lemon', 'mango', 'orange']</span>\nfruits.<span class=\"code-fn\">sort</span>(reverse=<span class=\"code-kw\">True</span>)\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">\"fruits.sort(reverse=True):\"</span>, fruits)              <span class=\"code-comment\"># Output: ['orange', 'mango', 'lemon', 'banana']</span>\n\nages = [<span class=\"code-num\">22</span>, <span class=\"code-num\">19</span>, <span class=\"code-num\">24</span>, <span class=\"code-num\">25</span>, <span class=\"code-num\">26</span>, <span class=\"code-num\">24</span>, <span class=\"code-num\">25</span>, <span class=\"code-num\">24</span>]\nages.<span class=\"code-fn\">sort</span>()\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">\"ages.sort():              \"</span>, ages)                <span class=\"code-comment\"># Output: [19, 22, 24, 24, 24, 25, 25, 26]</span>\nages.<span class=\"code-fn\">sort</span>(reverse=<span class=\"code-kw\">True</span>)\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">\"ages.sort(reverse=True):  \"</span>, ages)                <span class=\"code-comment\"># Output: [26, 25, 25, 24, 24, 24, 22, 19]</span>\n\n<span class=\"code-comment\"># 5. Non-Destructive Sorting using sorted() (Returns Fresh Sorted List)</span>\nfruits = [<span class=\"code-str\">'banana'</span>, <span class=\"code-str\">'orange'</span>, <span class=\"code-str\">'mango'</span>, <span class=\"code-str\">'lemon'</span>]\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">\"sorted(fruits):              \"</span>, <span class=\"code-fn\">sorted</span>(fruits))   <span class=\"code-comment\"># Output: ['banana', 'lemon', 'mango', 'orange']</span>\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">\"Original fruits unmodified:  \"</span>, fruits)           <span class=\"code-comment\"># Output: ['banana', 'orange', 'mango', 'lemon']</span>\nfruits_desc = <span class=\"code-fn\">sorted</span>(fruits, reverse=<span class=\"code-kw\">True</span>)\n<span class=\"code-fn\">print</span>(<span class=\"code-str\">\"sorted(fruits, reverse=True):\"</span>, fruits_desc)      <span class=\"code-comment\"># Output: ['orange', 'mango', 'lemon', 'banana']</span></code></pre>\n      </div>\n    </div>\n  </div>\n\n    <!-- 💡 Key Notes -->\n  <div class=\"py-recall-hook py-keynotes-card\">\n    <div class=\"py-keynotes-icon-wrap\">💡</div>\n    <div class=\"py-recall-body py-keynotes-body\">\n      <div class=\"py-recall-header py-keynotes-header\">\n        <span class=\"py-recall-title py-keynotes-title\">Key Notes</span>\n        <span class=\"py-recall-tag py-keynotes-tag\">Sorting & Algorithms</span>\n      </div>\n      <ul class=\"py-keynotes-list\">\n        <li><strong>sort() vs sorted()</strong>: <code>lst.sort()</code> reorders the list in-place and returns <code>None</code>. <code>sorted(lst)</code> leaves the original list untouched and returns a new sorted list.</li>\n        <li><strong>Timsort Stability</strong>: Python's built-in sort is stable ($O(N \\log N)$ worst-case, $O(N)$ best-case for nearly sorted data). Elements with identical keys strictly retain their relative order.</li>\n        <li><strong>Reverse Iteration</strong>: <code>fruits.reverse()</code> modifies the list directly in $O(N)$ time with zero additional memory allocation.</li>\n      </ul>\n    </div>\n  </div>\n</div>\n<!-- ═══ SECTION 10: Interview questions ═══ -->\n<div class=\"slide-section\" id=\"day04InterviewQuestions\">\n  <h2 class=\"slide-section-title heading-box-wrap heading-with-audio\" id=\"headingInterview\">\n    <span class=\"heading-num-box\">10</span>\n    <span class=\"heading-title-box\">\n      <span class=\"heading-title-text\">Review & Interview Questions</span>\n    </span>\n  </h2>\n  \n  <div class=\"interview-box\">\n    <h4 class=\"interview-header-title\">\n      <span>🎯</span> Python Lists &amp; Sequence Operations Core Concepts\n    </h4>\n\n    <div class=\"interview-item\" id=\"pyDay04IQ1\">\n      <p class=\"interview-question\"><strong>Q1: How are Python lists implemented in CPython at the systems level?</strong></p>\n      <div class=\"interview-answer\"><p><em>A: In CPython, a list is implemented as a <code>PyListObject</code>, which wraps a dynamically resized, contiguous array of 64-bit pointers (<code>PyObject**</code>). It is NOT a linked list. This design provides $O(1)$ random indexing, $O(1)$ amortized append, and cache locality for pointer addresses.</em></p></div>\n    </div>\n    <hr class=\"interview-divider\" />\n\n    <div class=\"interview-item\" id=\"pyDay04IQ2\">\n      <p class=\"interview-question\"><strong>Q2: Why is <code>lst.append()</code> amortized $O(1)$ instead of worst-case $O(1)$?</strong></p>\n      <div class=\"interview-answer\"><p><em>A: When a list exhausts its allocated slots, CPython resizes the underlying array by a growth pattern (roughly $9/8$ plus a small constant: 0, 4, 8, 16, 25, 35, 46...). The reallocation and pointer copy take $O(N)$ time, but because resizes occur infrequently, the cost averaged across $N$ appends is strictly $O(1)$.</em></p></div>\n    </div>\n    <hr class=\"interview-divider\" />\n\n    <div class=\"interview-item\" id=\"pyDay04IQ3\">\n      <p class=\"interview-question\"><strong>Q3: Why does <code>lst.insert(0, x)</code> take $O(N)$ time?</strong></p>\n      <div class=\"interview-answer\"><p><em>A: Because lists are contiguous arrays, inserting at index 0 requires memmoving all existing $N$ pointers one slot to the right in RAM. To achieve $O(1)$ insertions at the head, use <code>collections.deque</code> (a doubly-linked list of blocks).</em></p></div>\n    </div>\n    <hr class=\"interview-divider\" />\n\n    <div class=\"interview-item\" id=\"pyDay04IQ4\">\n      <p class=\"interview-question\"><strong>Q4: What is the difference between <code>lst.sort()</code> and <code>sorted(lst)</code>?</strong></p>\n      <div class=\"interview-answer\"><p><em>A: <code>lst.sort()</code> reorders the list in-place using Timsort and returns <code>None</code> to prevent accidental chaining. <code>sorted(lst)</code> accepts any iterable, allocates a new list, sorts it, and returns the new list, leaving the original data untouched.</em></p></div>\n    </div>\n    <hr class=\"interview-divider\" />\n\n    <div class=\"interview-item\" id=\"pyDay04IQ5\">\n      <p class=\"interview-question\"><strong>Q5: Why does <code>[[0] * 3] * 3</code> cause unexpected bugs when mutating <code>grid[0][0] = 1</code>?</strong></p>\n      <div class=\"interview-answer\"><p><em>A: The <code>*</code> operator creates shallow copies of references. <code>[0] * 3</code> creates a single list of ints. But <code>[...] * 3</code> duplicates the reference to that same row list 3 times. Mutating <code>grid[0][0]</code> modifies the shared row, making all 3 rows display <code>1</code>. The fix is <code>[[0] * 3 for _ in range(3)]</code>.</em></p></div>\n    </div>\n    <hr class=\"interview-divider\" />\n\n    <div class=\"interview-item\" id=\"pyDay04IQ6\">\n      <p class=\"interview-question\"><strong>Q6: What is the difference between a shallow copy and a deep copy?</strong></p>\n      <div class=\"interview-answer\"><p><em>A: A shallow copy (<code>lst.copy()</code> or <code>lst[:]</code>) duplicates only the outer list container; any nested mutable objects inside remain shared references. A deep copy (<code>copy.deepcopy(lst)</code>) recursively copies all nested containers and objects, ensuring total memory isolation.</em></p></div>\n    </div>\n    <hr class=\"interview-divider\" />\n\n    <div class=\"interview-item\" id=\"pyDay04IQ7\">\n      <p class=\"interview-question\"><strong>Q7: Why should you never mutate a list while iterating over it with a <code>for</code> loop?</strong></p>\n      <div class=\"interview-answer\"><p><em>A: The internal iterator keeps track of index counters. If you delete an item at index $i$, all subsequent items shift left by one, causing the iterator to skip index $i+1$ on the next step. To filter safely, use list comprehensions <code>[x for x in lst if keep(x)]</code> or iterate over a slice copy <code>for x in lst[:]:</code>.</em></p></div>\n    </div>\n    <hr class=\"interview-divider\" />\n\n    <div class=\"interview-item\" id=\"pyDay04IQ8\">\n      <p class=\"interview-question\"><strong>Q8: Why is a default mutable argument like <code>def add(x, lst=[]):</code> considered an anti-pattern?</strong></p>\n      <div class=\"interview-answer\"><p><em>A: Default arguments are evaluated once when the function is defined, not when it is invoked. That default list instance is shared across all function calls, leading to silent state retention and memory leaks. Always use <code>lst=None</code> and instantiate inside the body.</em></p></div>\n    </div>\n    <hr class=\"interview-divider\" />\n\n    <div class=\"interview-item\" id=\"pyDay04IQ9\">\n      <p class=\"interview-question\"><strong>Q9: How does Python's Timsort algorithm work and what is its time complexity?</strong></p>\n      <div class=\"interview-answer\"><p><em>A: Timsort is an adaptive, stable hybrid of Merge Sort and Insertion Sort designed by Tim Peters. It identifies naturally occurring sorted sequences ('runs'), extends short runs using binary insertion sort, and merges them using balanced stack criteria. Worst-case is $O(N \\log N)$, best-case on sorted data is $O(N)$, and space complexity is $O(N)$.</em></p></div>\n    </div>\n    <hr class=\"interview-divider\" />\n\n    <div class=\"interview-item\" id=\"pyDay04IQ10\">\n      <p class=\"interview-question\"><strong>Q10: How can you remove duplicates from a list while preserving the original element order?</strong></p>\n      <div class=\"interview-answer\"><p><em>A: Use <code>list(dict.fromkeys(lst))</code>. Since Python 3.7+, dictionary keys strictly retain insertion order, achieving order-preserving deduplication in $O(N)$ linear time. In contrast, <code>list(set(lst))</code> does not preserve order.</em></p></div>\n    </div>\n    <hr class=\"interview-divider\" />\n\n    <div class=\"interview-item\" id=\"pyDay04IQ11\">\n      <p class=\"interview-question\"><strong>Q11: What is the difference between <code>lst.extend(iter)</code> and <code>lst += iter</code>?</strong></p>\n      <div class=\"interview-answer\"><p><em>A: For lists, both perform in-place extension and accept any iterable. However, <code>+=</code> invokes <code>__iadd__</code> and re-binds the variable name, whereas <code>extend()</code> is an explicit method. With immutable sequences like tuples, <code>+=</code> creates a new object, whereas with lists it mutates in-place.</em></p></div>\n    </div>\n    <hr class=\"interview-divider\" />\n\n    <div class=\"interview-item\" id=\"pyDay04IQ12\">\n      <p class=\"interview-question\"><strong>Q12: What is the difference in memory consumption between a list and a tuple of the same size?</strong></p>\n      <div class=\"interview-answer\"><p><em>A: Tuples are immutable and fixed-sized, so CPython allocates exactly enough slots for their elements without extra over-allocation. Lists allocate extra capacity buffers to support amortized $O(1)$ appends, making empty lists consume 56 bytes vs 40 bytes for empty tuples, plus ~12.5% to 50% extra buffer headroom.</em></p></div>\n    </div>\n    <hr class=\"interview-divider\" />\n\n    <div class=\"interview-item\" id=\"pyDay04IQ13\">\n      <p class=\"interview-question\"><strong>Q13: What does <code>del lst[:]</code> do compared to <code>del lst</code>?</strong></p>\n      <div class=\"interview-answer\"><p><em>A: <code>del lst[:]</code> clears all elements from the list in-place while keeping the list object alive in RAM (equivalent to <code>lst.clear()</code>). In contrast, <code>del lst</code> unbinds the variable name from local scope; any other references pointing to the list still retain their data.</em></p></div>\n    </div>\n    <hr class=\"interview-divider\" />\n\n    <div class=\"interview-item\" id=\"pyDay04IQ14\">\n      <p class=\"interview-question\"><strong>Q14: How does slice assignment <code>lst[1:3] = [10, 20, 30]</code> work under the hood?</strong></p>\n      <div class=\"interview-answer\"><p><em>A: CPython deletes the 2 existing pointer references from index 1 to 2, resizes the underlying array buffer by +1 to accommodate the 3 replacement elements, shifts subsequent pointers to the right, and copies the 3 new pointers in place.</em></p></div>\n    </div>\n    <hr class=\"interview-divider\" />\n\n    <div class=\"interview-item\" id=\"pyDay04IQ15\">\n      <p class=\"interview-question\"><strong>Q15: What is the time complexity of <code>x in lst</code> versus <code>x in my_set</code>?</strong></p>\n      <div class=\"interview-answer\"><p><em>A: <code>x in lst</code> takes $O(N)$ linear time because it performs a sequential search from the head of the array to the end. <code>x in my_set</code> takes average $O(1)$ constant time because it computes the hash of <code>x</code> and inspects the hash table bucket directly.</em></p></div>\n    </div>\n    <hr class=\"interview-divider\" />\n\n    <div class=\"interview-item\" id=\"pyDay04IQ16\">\n      <p class=\"interview-question\"><strong>Q16: What happens when you pass a list to a function and reassign it vs mutate it?</strong></p>\n      <div class=\"interview-answer\"><p><em>A: Python uses pass-by-object-reference. Mutating the list (e.g. <code>arg.append(1)</code> or <code>arg[0] = 9</code>) mutates the caller's object in outer scope. Reassigning the parameter (e.g. <code>arg = [1, 2, 3]</code>) merely binds the local name to a new object, leaving the caller's list unaffected.</em></p></div>\n    </div>\n    <hr class=\"interview-divider\" />\n\n    <div class=\"interview-item\" id=\"pyDay04IQ17\">\n      <p class=\"interview-question\"><strong>Q17: How do you flatten a 2D matrix <code>grid = [[1, 2], [3, 4]]</code> in a single line?</strong></p>\n      <div class=\"interview-answer\"><p><em>A: Use a nested list comprehension: <code>flat = [item for row in grid for item in row]</code>, or <code>list(itertools.chain.from_iterable(grid))</code> for highest iterator throughput.</em></p></div>\n    </div>\n    <hr class=\"interview-divider\" />\n\n    <div class=\"interview-item\" id=\"pyDay04IQ18\">\n      <p class=\"interview-question\"><strong>Q18: Why is <code>lst.pop()</code> faster than <code>lst.pop(0)</code>?</strong></p>\n      <div class=\"interview-answer\"><p><em>A: <code>lst.pop()</code> simply decrements the internal size counter <code>ob_size</code> and returns the last pointer, running in $O(1)$ time. <code>lst.pop(0)</code> removes the first pointer and requires <code>memmove</code> to shift all remaining $N-1$ pointers one position to the left, taking $O(N)$ time.</em></p></div>\n    </div>\n    <hr class=\"interview-divider\" />\n\n    <div class=\"interview-item\" id=\"pyDay04IQ19\">\n      <p class=\"interview-question\"><strong>Q19: Can a list be used as a key in a Python dictionary? Why or why not?</strong></p>\n      <div class=\"interview-answer\"><p><em>A: No. Dictionary keys must be hashable, meaning their hash value must never change over their lifetime. Because lists are mutable, their contents and logical equality can change, so Python does not define <code>__hash__</code> on lists, raising <code>TypeError: unhashable type: 'list'</code>. Use a <code>tuple</code> instead.</em></p></div>\n    </div>\n    <hr class=\"interview-divider\" />\n\n    <div class=\"interview-item\" id=\"pyDay04IQ20\">\n      <p class=\"interview-question\"><strong>Q20: How does extended unpacking <code>first, *middle, last = lst</code> handle short lists?</strong></p>\n      <div class=\"interview-answer\"><p><em>A: If the list contains fewer than 2 elements, Python raises <code>ValueError: not enough values to unpack</code>. If the list contains exactly 2 elements, <code>first</code> receives the first, <code>last</code> receives the second, and <code>middle</code> evaluates to an empty list <code>[]</code> without throwing any error.</em></p></div>\n    </div>\n    <hr class=\"interview-divider\" />\n\n    <div class=\"interview-item\" id=\"pyDay04IQ21\">\n      <p class=\"interview-question\"><strong>Q21: What is the difference between <code>[x for x in lst]</code> and <code>(x for x in lst)</code>?</strong></p>\n      <div class=\"interview-answer\"><p><em>A: <code>[...]</code> creates a list comprehension that eagerly evaluates and constructs the entire list in memory ($O(N)$ space). <code>(...)</code> creates a generator expression that lazily yields items on-demand via the iterator protocol ($O(1)$ memory).</em></p></div>\n    </div>\n    <hr class=\"interview-divider\" />\n\n    <div class=\"interview-item\" id=\"pyDay04IQ22\">\n      <p class=\"interview-question\"><strong>Q22: How does the <code>key=</code> parameter in <code>sort()</code> optimize performance compared to custom comparators?</strong></p>\n      <div class=\"interview-answer\"><p><em>A: The <code>key=</code> function computes a surrogate key value exactly once per element ($O(N)$ function calls) before sorting starts (known as the Schwartzian transform). Older comparison functions evaluated the comparator on every element pair, requiring $O(N \\log N)$ expensive function calls.</em></p></div>\n    </div>\n    <hr class=\"interview-divider\" />\n\n    <div class=\"interview-item\" id=\"pyDay04IQ23\">\n      <p class=\"interview-question\"><strong>Q23: What is the maximum number of elements a Python list can hold?</strong></p>\n      <div class=\"interview-answer\"><p><em>A: The theoretical maximum is <code>sys.maxsize</code> ($2^{63}-1$ on 64-bit systems, roughly 9.22 quintillion). Practically, it is bound by the machine's available physical RAM and swap space, since each element consumes an 8-byte pointer plus object struct overhead.</em></p></div>\n    </div>\n    <hr class=\"interview-divider\" />\n\n    <div class=\"interview-item\" id=\"pyDay04IQ24\">\n      <p class=\"interview-question\"><strong>Q24: Why does <code>reversed(lst)</code> return a reverse iterator instead of a list?</strong></p>\n      <div class=\"interview-answer\"><p><em>A: <code>reversed()</code> is a generator/iterator that traverses the sequence backwards using <code>__reversed__</code> or <code>len()</code> and indexing. It runs in $O(1)$ initialization time and $O(1)$ memory, avoiding allocating a duplicate list when you only need to iterate over items once.</em></p></div>\n    </div>\n    <hr class=\"interview-divider\" />\n\n    <div class=\"interview-item\" id=\"pyDay04IQ25\">\n      <p class=\"interview-question\"><strong>Q25: How do you find the second largest number in a list in $O(N)$ time?</strong></p>\n      <div class=\"interview-answer\"><p><em>A: Maintain two variables <code>first = second = float('-inf')</code>. Loop through the list once: if <code>x &gt; first</code>, set <code>second = first; first = x</code>; else if <code>x &gt; second and x != first</code>, set <code>second = x</code>. This avoids $O(N \\log N)$ sorting.</em></p></div>\n    </div>\n    \n\n  </div>\n</div>\n"
    }
  ],
  "practiceQuestions": [
    {
      "id": 1,
      "difficulty": "Easy",
      "category": "indexing",
      "title": "IT Tech Giants Directory Initialization",
      "given": "it_companies = ['Facebook', 'Google', 'Microsoft', 'Apple', 'IBM', 'Oracle', 'Amazon']",
      "outputs": [
        "count",
        "first_co",
        "middle_co",
        "last_co"
      ],
      "starterCode": "",
      "desc": "Given `it_companies = ['Facebook', 'Google', 'Microsoft', 'Apple', 'IBM', 'Oracle', 'Amazon']`, print the total count of companies, the first company, the middle company (using integer floor division), and the last company.",
      "prompt": "<strong>[Easy] IT Tech Giants Directory Initialization</strong><p>Given <code>it_companies = ['Facebook', 'Google', 'Microsoft', 'Apple', 'IBM', 'Oracle', 'Amazon']</code>:</p><p>Store the total count in <code>count</code>, first company in <code>first_co</code>, middle company (using <code>len // 2</code>) in <code>middle_co</code>, and last company in <code>last_co</code>.</p>",
      "ref": "it_companies = ['Facebook', 'Google', 'Microsoft', 'Apple', 'IBM', 'Oracle', 'Amazon']\ncount = len(it_companies)\nfirst_co = it_companies[0]\nmiddle_co = it_companies[len(it_companies) // 2]\nlast_co = it_companies[-1]\nprint(f\"Count: {count} | First: {first_co} | Middle: {middle_co} | Last: {last_co}\")\n",
      "solution": "it_companies = ['Facebook', 'Google', 'Microsoft', 'Apple', 'IBM', 'Oracle', 'Amazon']\ncount = len(it_companies)\nfirst_co = it_companies[0]\nmiddle_co = it_companies[len(it_companies) // 2]\nlast_co = it_companies[-1]\nprint(f\"Count: {count} | First: {first_co} | Middle: {middle_co} | Last: {last_co}\")\n",
      "target": "Count: 7 | First: Facebook | Middle: Apple | Last: Amazon\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "count",
            "type": "int",
            "value": 7,
            "exact": true
          },
          {
            "name": "first_co",
            "type": "string",
            "value": "Facebook",
            "exact": true
          },
          {
            "name": "middle_co",
            "type": "string",
            "value": "Apple",
            "exact": true
          },
          {
            "name": "last_co",
            "type": "string",
            "value": "Amazon",
            "exact": true
          }
        ]
      },
      "explanation": "len() returns the total element count. Index 0 accesses the head, -1 accesses the tail, and len // 2 accesses the integer middle element.",
      "hint": "Use len(lst) for count, 0 for first, len // 2 for middle, and -1 for last."
    },
    {
      "id": 2,
      "difficulty": "Easy",
      "category": "modifying",
      "title": "Modifying and Inserting Tech Leaders",
      "given": "it_companies = ['Facebook', 'Google', 'Microsoft', 'Apple', 'IBM', 'Oracle', 'Amazon']",
      "outputs": [
        "it_companies"
      ],
      "starterCode": "",
      "desc": "Modify `it_companies` in-place: append `'Tesla'` to the end, insert `'Nvidia'` at index 4 (middle of updated list), change `'Google'` to uppercase, and print the updated list.",
      "prompt": "<strong>[Easy] Modifying and Inserting Tech Leaders</strong><p>Given <code>it_companies = ['Facebook', 'Google', 'Microsoft', 'Apple', 'IBM', 'Oracle', 'Amazon']</code>:</p><p>Append <code>'Tesla'</code> to the tail, insert <code>'Nvidia'</code> at index 4, change index 1 (<code>'Google'</code>) to uppercase (<code>'GOOGLE'</code>), and print <code>it_companies</code>.</p>",
      "ref": "it_companies = ['Facebook', 'Google', 'Microsoft', 'Apple', 'IBM', 'Oracle', 'Amazon']\nit_companies.append('Tesla')\nit_companies.insert(4, 'Nvidia')\nit_companies[1] = it_companies[1].upper()\nprint(it_companies)\n",
      "solution": "it_companies = ['Facebook', 'Google', 'Microsoft', 'Apple', 'IBM', 'Oracle', 'Amazon']\nit_companies.append('Tesla')\nit_companies.insert(4, 'Nvidia')\nit_companies[1] = it_companies[1].upper()\nprint(it_companies)\n",
      "target": "['Facebook', 'GOOGLE', 'Microsoft', 'Apple', 'Nvidia', 'IBM', 'Oracle', 'Amazon', 'Tesla']\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "it_companies",
            "type": "list",
            "value": [
              "Facebook",
              "GOOGLE",
              "Microsoft",
              "Apple",
              "Nvidia",
              "IBM",
              "Oracle",
              "Amazon",
              "Tesla"
            ],
            "exact": true
          }
        ]
      },
      "explanation": "append() inserts an item at the tail, insert(i, x) shifts elements right to insert x at index i, and lst[1] = val mutates index 1 in-place.",
      "hint": "Use append('Tesla'), insert(4, 'Nvidia'), and it_companies[1] = it_companies[1].upper()."
    },
    {
      "id": 3,
      "difficulty": "Easy",
      "category": "slicing",
      "title": "Slicing Enterprise Portfolios",
      "given": "it_companies = ['Facebook', 'Google', 'Microsoft', 'Apple', 'IBM', 'Oracle', 'Amazon']",
      "outputs": [
        "first_three",
        "last_three",
        "middle_three"
      ],
      "starterCode": "",
      "desc": "From `it_companies`, slice and print: (1) the first 3 companies, (2) the last 3 companies, and (3) the middle 3 companies.",
      "prompt": "<strong>[Easy] Slicing Enterprise Portfolios</strong><p>From <code>it_companies</code>, extract the first 3 in <code>first_three</code>, last 3 in <code>last_three</code>, and 3 centered around the middle index in <code>middle_three</code>.</p>",
      "ref": "it_companies = ['Facebook', 'Google', 'Microsoft', 'Apple', 'IBM', 'Oracle', 'Amazon']\nmid = len(it_companies) // 2\nfirst_three = it_companies[:3]\nlast_three = it_companies[-3:]\nmiddle_three = it_companies[mid - 1:mid + 2]\nprint(f\"First 3: {first_three} | Last 3: {last_three} | Middle 3: {middle_three}\")\n",
      "solution": "it_companies = ['Facebook', 'Google', 'Microsoft', 'Apple', 'IBM', 'Oracle', 'Amazon']\nmid = len(it_companies) // 2\nfirst_three = it_companies[:3]\nlast_three = it_companies[-3:]\nmiddle_three = it_companies[mid - 1:mid + 2]\nprint(f\"First 3: {first_three} | Last 3: {last_three} | Middle 3: {middle_three}\")\n",
      "target": "First 3: ['Facebook', 'Google', 'Microsoft'] | Last 3: ['IBM', 'Oracle', 'Amazon'] | Middle 3: ['Microsoft', 'Apple', 'IBM']\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "first_three",
            "type": "list",
            "value": [
              "Facebook",
              "Google",
              "Microsoft"
            ],
            "exact": true
          },
          {
            "name": "last_three",
            "type": "list",
            "value": [
              "IBM",
              "Oracle",
              "Amazon"
            ],
            "exact": true
          },
          {
            "name": "middle_three",
            "type": "list",
            "value": [
              "Microsoft",
              "Apple",
              "IBM"
            ],
            "exact": true
          }
        ]
      },
      "explanation": "Slice syntax [start:end] extracts items up to end-1. [:3] grabs indices 0-2, [-3:] grabs the last 3 items, and [mid-1:mid+2] grabs 3 centered elements.",
      "hint": "Use [:3] for front, [-3:] for tail, and [mid-1:mid+2] for centered 3 items."
    },
    {
      "id": 4,
      "difficulty": "Easy",
      "category": "removing",
      "title": "Portfolio Trimming and Removal",
      "given": "it_companies = ['Facebook', 'Google', 'Microsoft', 'Apple', 'IBM', 'Oracle', 'Amazon']",
      "outputs": [
        "popped_first",
        "popped_last",
        "remaining"
      ],
      "starterCode": "",
      "desc": "Remove the first company using `pop(0)`, remove `'Apple'` using `remove()`, and pop the final company with `pop()`. Store and print the results.",
      "prompt": "<strong>[Easy] Portfolio Trimming and Removal</strong><p>Remove the first company using <code>pop(0)</code> into <code>popped_first</code>, remove <code>'Apple'</code> using <code>remove('Apple')</code>, and pop the last company using <code>pop()</code> into <code>popped_last</code>. Store the remaining list in <code>remaining</code>.</p>",
      "ref": "it_companies = ['Facebook', 'Google', 'Microsoft', 'Apple', 'IBM', 'Oracle', 'Amazon']\npopped_first = it_companies.pop(0)\nit_companies.remove('Apple')\npopped_last = it_companies.pop()\nremaining = it_companies\nprint(f\"Popped: {popped_first}, {popped_last} | Remaining: {remaining}\")\n",
      "solution": "it_companies = ['Facebook', 'Google', 'Microsoft', 'Apple', 'IBM', 'Oracle', 'Amazon']\npopped_first = it_companies.pop(0)\nit_companies.remove('Apple')\npopped_last = it_companies.pop()\nremaining = it_companies\nprint(f\"Popped: {popped_first}, {popped_last} | Remaining: {remaining}\")\n",
      "target": "Popped: Facebook, Amazon | Remaining: ['Google', 'Microsoft', 'IBM', 'Oracle']\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "popped_first",
            "type": "string",
            "value": "Facebook",
            "exact": true
          },
          {
            "name": "popped_last",
            "type": "string",
            "value": "Amazon",
            "exact": true
          },
          {
            "name": "remaining",
            "type": "list",
            "value": [
              "Google",
              "Microsoft",
              "IBM",
              "Oracle"
            ],
            "exact": true
          }
        ]
      },
      "explanation": "pop(0) removes and returns the head (O(N) time). remove(val) searches and deletes the first match by equality. pop() removes the tail in O(1) time.",
      "hint": "pop(0) removes head, remove('Apple') removes value match, pop() removes tail."
    },
    {
      "id": 5,
      "difficulty": "Easy",
      "category": "adding",
      "title": "Full Stack Technology Integration",
      "given": "front_end = ['HTML', 'CSS', 'JS', 'React', 'Redux']\nback_end = ['Node', 'Express', 'MongoDB']",
      "outputs": [
        "full_stack"
      ],
      "starterCode": "",
      "desc": "Given `front_end` and `back_end`, merge them using `+` into `full_stack`. Then insert `'Python'` and `'SQL'` immediately after `'Redux'` and print `full_stack`.",
      "prompt": "<strong>[Easy] Full Stack Technology Integration</strong><p>Concatenate <code>front_end</code> and <code>back_end</code> into <code>full_stack</code> using <code>+</code>. Find the index of <code>'Redux'</code>, then insert <code>'Python'</code> and <code>'SQL'</code> immediately after it.</p>",
      "ref": "front_end = ['HTML', 'CSS', 'JS', 'React', 'Redux']\nback_end = ['Node', 'Express', 'MongoDB']\nfull_stack = front_end + back_end\nidx = full_stack.index('Redux')\nfull_stack.insert(idx + 1, 'Python')\nfull_stack.insert(idx + 2, 'SQL')\nprint(full_stack)\n",
      "solution": "front_end = ['HTML', 'CSS', 'JS', 'React', 'Redux']\nback_end = ['Node', 'Express', 'MongoDB']\nfull_stack = front_end + back_end\nidx = full_stack.index('Redux')\nfull_stack.insert(idx + 1, 'Python')\nfull_stack.insert(idx + 2, 'SQL')\nprint(full_stack)\n",
      "target": "['HTML', 'CSS', 'JS', 'React', 'Redux', 'Python', 'SQL', 'Node', 'Express', 'MongoDB']\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "full_stack",
            "type": "list",
            "value": [
              "HTML",
              "CSS",
              "JS",
              "React",
              "Redux",
              "Python",
              "SQL",
              "Node",
              "Express",
              "MongoDB"
            ],
            "exact": true
          }
        ]
      },
      "explanation": "The + operator concatenates two lists into a new list. index('Redux') locates its position, allowing sequential insertions at idx+1 and idx+2.",
      "hint": "Merge with +, locate index of 'Redux', then insert sequentially at index + 1 and index + 2."
    },
    {
      "id": 6,
      "difficulty": "Easy",
      "category": "methods",
      "title": "Delimited Formatting and Existence Audit",
      "given": "it_companies = ['Facebook', 'Google', 'Microsoft', 'Apple', 'IBM', 'Oracle', 'Amazon']",
      "outputs": [
        "has_msft",
        "has_nflx",
        "joined_str"
      ],
      "starterCode": "",
      "desc": "Check if `'Microsoft'` and `'Netflix'` exist in `it_companies` using `in`. Then format and print the company names joined with delimiter `'#; '`.",
      "prompt": "<strong>[Easy] Delimited Formatting and Existence Audit</strong><p>Store whether <code>'Microsoft'</code> is in <code>it_companies</code> in <code>has_msft</code>, whether <code>'Netflix'</code> is in <code>it_companies</code> in <code>has_nflx</code>, and join all companies with delimiter <code>'#; '</code> into <code>joined_str</code>.</p>",
      "ref": "it_companies = ['Facebook', 'Google', 'Microsoft', 'Apple', 'IBM', 'Oracle', 'Amazon']\nhas_msft = 'Microsoft' in it_companies\nhas_nflx = 'Netflix' in it_companies\njoined_str = '#; '.join(it_companies)\nprint(f\"MSFT: {has_msft} | NFLX: {has_nflx} | Joined: {joined_str}\")\n",
      "solution": "it_companies = ['Facebook', 'Google', 'Microsoft', 'Apple', 'IBM', 'Oracle', 'Amazon']\nhas_msft = 'Microsoft' in it_companies\nhas_nflx = 'Netflix' in it_companies\njoined_str = '#; '.join(it_companies)\nprint(f\"MSFT: {has_msft} | NFLX: {has_nflx} | Joined: {joined_str}\")\n",
      "target": "MSFT: True | NFLX: False | Joined: Facebook#; Google#; Microsoft#; Apple#; IBM#; Oracle#; Amazon\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "has_msft",
            "type": "bool",
            "value": true,
            "exact": true
          },
          {
            "name": "has_nflx",
            "type": "bool",
            "value": false,
            "exact": true
          },
          {
            "name": "joined_str",
            "type": "string",
            "value": "Facebook#; Google#; Microsoft#; Apple#; IBM#; Oracle#; Amazon",
            "exact": true
          }
        ]
      },
      "explanation": "The in operator tests membership in linear time O(N). str.join(iterable) concatenates string elements using the given delimiter string.",
      "hint": "Use 'val' in it_companies for membership, and '#; '.join(...) for formatted output."
    },
    {
      "id": 7,
      "difficulty": "Easy",
      "category": "analytics",
      "title": "Student Age Metrics & Spread",
      "given": "ages = [19, 22, 19, 24, 20, 25, 26, 24, 25, 24]",
      "outputs": [
        "min_age",
        "max_age",
        "range_age",
        "avg_age",
        "median_age"
      ],
      "starterCode": "",
      "desc": "Sort `ages` in-place and calculate: `min_age`, `max_age`, `range_age` (`max - min`), `avg_age` (`sum / len`), and `median_age` (average of the 2 middle items).",
      "prompt": "<strong>[Easy] Student Age Metrics & Spread</strong><p>Sort <code>ages</code> in-place. Store minimum in <code>min_age</code>, maximum in <code>max_age</code>, range in <code>range_age</code>, average rounded to 2 decimals in <code>avg_age</code>, and median in <code>median_age</code>.</p>",
      "ref": "ages = [19, 22, 19, 24, 20, 25, 26, 24, 25, 24]\nages.sort()\nmin_age = ages[0]\nmax_age = ages[-1]\nrange_age = max_age - min_age\navg_age = round(sum(ages) / len(ages), 2)\nmid = len(ages) // 2\nmedian_age = float((ages[mid - 1] + ages[mid]) / 2)\nprint(f\"Min: {min_age} | Max: {max_age} | Range: {range_age} | Avg: {avg_age} | Median: {median_age}\")\n",
      "solution": "ages = [19, 22, 19, 24, 20, 25, 26, 24, 25, 24]\nages.sort()\nmin_age = ages[0]\nmax_age = ages[-1]\nrange_age = max_age - min_age\navg_age = round(sum(ages) / len(ages), 2)\nmid = len(ages) // 2\nmedian_age = float((ages[mid - 1] + ages[mid]) / 2)\nprint(f\"Min: {min_age} | Max: {max_age} | Range: {range_age} | Avg: {avg_age} | Median: {median_age}\")\n",
      "target": "Min: 19 | Max: 26 | Range: 7 | Avg: 22.8 | Median: 24.0\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "min_age",
            "type": "int",
            "value": 19,
            "exact": true
          },
          {
            "name": "max_age",
            "type": "int",
            "value": 26,
            "exact": true
          },
          {
            "name": "range_age",
            "type": "int",
            "value": 7,
            "exact": true
          },
          {
            "name": "avg_age",
            "type": "float",
            "value": 22.8,
            "tolerance": 0.01
          },
          {
            "name": "median_age",
            "type": "float",
            "value": 24,
            "tolerance": 0.01
          }
        ]
      },
      "explanation": "After sorting, index 0 is minimum and index -1 is maximum. Range is max - min. For an even length list of 10 items, the median is the mean of elements at indices 4 and 5.",
      "hint": "Sort the list, then compute min, max, range, average with sum/len, and median from mid-1 and mid."
    },
    {
      "id": 8,
      "difficulty": "Medium",
      "category": "analytics",
      "title": "Statistical Outlier Deltas",
      "given": "ages = [19, 22, 19, 24, 20, 25, 26, 24, 25, 24]",
      "outputs": [
        "min_delta",
        "max_delta"
      ],
      "starterCode": "",
      "desc": "Calculate `avg_age = sum(ages) / len(ages)`, then store `min_delta = round(abs(min(ages) - avg_age), 2)` and `max_delta = round(abs(max(ages) - avg_age), 2)`.",
      "prompt": "<strong>[Medium] Statistical Outlier Deltas</strong><p>Given <code>ages</code>, compute the average age. Calculate <code>abs(min(ages) - avg_age)</code> rounded to 2 decimals in <code>min_delta</code>, and <code>abs(max(ages) - avg_age)</code> in <code>max_delta</code>.</p>",
      "ref": "ages = [19, 22, 19, 24, 20, 25, 26, 24, 25, 24]\navg_age = sum(ages) / len(ages)\nmin_delta = round(abs(min(ages) - avg_age), 2)\nmax_delta = round(abs(max(ages) - avg_age), 2)\nprint(f\"Min Delta: {min_delta} | Max Delta: {max_delta}\")\n",
      "solution": "ages = [19, 22, 19, 24, 20, 25, 26, 24, 25, 24]\navg_age = sum(ages) / len(ages)\nmin_delta = round(abs(min(ages) - avg_age), 2)\nmax_delta = round(abs(max(ages) - avg_age), 2)\nprint(f\"Min Delta: {min_delta} | Max Delta: {max_delta}\")\n",
      "target": "Min Delta: 3.8 | Max Delta: 3.2\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "min_delta",
            "type": "float",
            "value": 3.8,
            "tolerance": 0.01
          },
          {
            "name": "max_delta",
            "type": "float",
            "value": 3.2,
            "tolerance": 0.01
          }
        ]
      },
      "explanation": "abs() calculates the non-negative absolute distance between each extremum and the distribution mean.",
      "hint": "Use min(), max(), abs(), and sum() / len()."
    },
    {
      "id": 9,
      "difficulty": "Medium",
      "category": "slicing",
      "title": "Geographic Regional Split",
      "given": "countries = ['China', 'Russia', 'USA', 'Finland', 'Sweden', 'Norway', 'Denmark', 'Iceland']",
      "outputs": [
        "first_half",
        "second_half"
      ],
      "starterCode": "",
      "desc": "Divide `countries = ['China', 'Russia', 'USA', 'Finland', 'Sweden', 'Norway', 'Denmark', 'Iceland']` into two equal halves: `first_half` and `second_half`.",
      "prompt": "<strong>[Medium] Geographic Regional Split</strong><p>Divide the 8 countries equally into <code>first_half</code> (first 4) and <code>second_half</code> (last 4) using slicing.</p>",
      "ref": "countries = ['China', 'Russia', 'USA', 'Finland', 'Sweden', 'Norway', 'Denmark', 'Iceland']\nmid = len(countries) // 2\nfirst_half = countries[:mid]\nsecond_half = countries[mid:]\nprint(f\"First: {first_half} | Second: {second_half}\")\n",
      "solution": "countries = ['China', 'Russia', 'USA', 'Finland', 'Sweden', 'Norway', 'Denmark', 'Iceland']\nmid = len(countries) // 2\nfirst_half = countries[:mid]\nsecond_half = countries[mid:]\nprint(f\"First: {first_half} | Second: {second_half}\")\n",
      "target": "First: ['China', 'Russia', 'USA', 'Finland'] | Second: ['Sweden', 'Norway', 'Denmark', 'Iceland']\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "first_half",
            "type": "list",
            "value": [
              "China",
              "Russia",
              "USA",
              "Finland"
            ],
            "exact": true
          },
          {
            "name": "second_half",
            "type": "list",
            "value": [
              "Sweden",
              "Norway",
              "Denmark",
              "Iceland"
            ],
            "exact": true
          }
        ]
      },
      "explanation": "mid = len // 2 partitions an even-length sequence symmetrically into [:mid] and [mid:].",
      "hint": "Compute mid = len // 2, then slice [:mid] and [mid:]."
    },
    {
      "id": 10,
      "difficulty": "Medium",
      "category": "unpacking",
      "title": "Nordic Geopolitics Unpacking",
      "given": "countries = ['China', 'Russia', 'USA', 'Finland', 'Sweden', 'Norway', 'Denmark']",
      "outputs": [
        "c1",
        "c2",
        "c3",
        "scandic"
      ],
      "starterCode": "",
      "desc": "Unpack `['China', 'Russia', 'USA', 'Finland', 'Sweden', 'Norway', 'Denmark']` into variables `c1`, `c2`, `c3`, and starred `*scandic`.",
      "prompt": "<strong>[Medium] Nordic Geopolitics Unpacking</strong><p>Use extended sequence unpacking to assign the first 3 countries to <code>c1</code>, <code>c2</code>, <code>c3</code>, and the remaining 4 countries to list <code>scandic</code> using <code>*scandic</code>.</p>",
      "ref": "countries = ['China', 'Russia', 'USA', 'Finland', 'Sweden', 'Norway', 'Denmark']\nc1, c2, c3, *scandic = countries\nprint(f\"C1: {c1}, C2: {c2}, C3: {c3} | Scandic: {scandic}\")\n",
      "solution": "countries = ['China', 'Russia', 'USA', 'Finland', 'Sweden', 'Norway', 'Denmark']\nc1, c2, c3, *scandic = countries\nprint(f\"C1: {c1}, C2: {c2}, C3: {c3} | Scandic: {scandic}\")\n",
      "target": "C1: China, C2: Russia, C3: USA | Scandic: ['Finland', 'Sweden', 'Norway', 'Denmark']\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "c1",
            "type": "string",
            "value": "China",
            "exact": true
          },
          {
            "name": "c2",
            "type": "string",
            "value": "Russia",
            "exact": true
          },
          {
            "name": "c3",
            "type": "string",
            "value": "USA",
            "exact": true
          },
          {
            "name": "scandic",
            "type": "list",
            "value": [
              "Finland",
              "Sweden",
              "Norway",
              "Denmark"
            ],
            "exact": true
          }
        ]
      },
      "explanation": "Extended starred unpacking (PEP 3132) allows a variable prefixed with * to capture arbitrary remaining items as a list.",
      "hint": "Use c1, c2, c3, *scandic = countries."
    },
    {
      "id": 11,
      "difficulty": "Medium",
      "category": "methods",
      "title": "Order-Preserving Deduplication",
      "given": "raw_logs = [101, 204, 101, 305, 204, 408, 501]",
      "outputs": [
        "unique_logs"
      ],
      "starterCode": "",
      "desc": "Given `raw_logs = [101, 204, 101, 305, 204, 408, 501]`, remove duplicates while preserving the exact order of first appearance using `dict.fromkeys()`.",
      "prompt": "<strong>[Medium] Order-Preserving Deduplication</strong><p>Deduplicate <code>raw_logs</code> while strictly maintaining first-seen order using <code>list(dict.fromkeys(raw_logs))</code>. Store in <code>unique_logs</code>.</p>",
      "ref": "raw_logs = [101, 204, 101, 305, 204, 408, 501]\nunique_logs = list(dict.fromkeys(raw_logs))\nprint(f\"Unique: {unique_logs}\")\n",
      "solution": "raw_logs = [101, 204, 101, 305, 204, 408, 501]\nunique_logs = list(dict.fromkeys(raw_logs))\nprint(f\"Unique: {unique_logs}\")\n",
      "target": "Unique: [101, 204, 305, 408, 501]\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "unique_logs",
            "type": "list",
            "value": [
              101,
              204,
              305,
              408,
              501
            ],
            "exact": true
          }
        ]
      },
      "explanation": "In Python 3.7+, dictionary keys preserve insertion order. dict.fromkeys() discards duplicates in O(N) time without shuffling order like set() does.",
      "hint": "Use list(dict.fromkeys(raw_logs))."
    },
    {
      "id": 12,
      "difficulty": "Medium",
      "category": "slicing",
      "title": "Batch Slice Replacement",
      "given": "catalog = ['SKU-10', 'PENDING', 'PENDING', 'PENDING', 'SKU-50']",
      "outputs": [
        "catalog",
        "catalog_len"
      ],
      "starterCode": "",
      "desc": "Given `catalog = ['SKU-10', 'PENDING', 'PENDING', 'PENDING', 'SKU-50']`, replace the three `'PENDING'` items at indices 1 through 3 with `['SKU-20', 'SKU-30', 'SKU-40']` in-place using slice assignment `catalog[1:4] = ...`. Store the updated list length in `catalog_len`.",
      "prompt": "<strong>[Medium] Batch Slice Replacement</strong><p>Given <code>catalog = ['SKU-10', 'PENDING', 'PENDING', 'PENDING', 'SKU-50']</code>:</p><p>Replace the three <code>'PENDING'</code> slots in-place using slice assignment <code>catalog[1:4] = ['SKU-20', 'SKU-30', 'SKU-40']</code>. Store the updated length in <code>catalog_len</code> and print <code>catalog</code>.</p>",
      "ref": "catalog = ['SKU-10', 'PENDING', 'PENDING', 'PENDING', 'SKU-50']\ncatalog[1:4] = ['SKU-20', 'SKU-30', 'SKU-40']\ncatalog_len = len(catalog)\nprint(f\"Catalog: {catalog} | Length: {catalog_len}\")\n",
      "solution": "catalog = ['SKU-10', 'PENDING', 'PENDING', 'PENDING', 'SKU-50']\ncatalog[1:4] = ['SKU-20', 'SKU-30', 'SKU-40']\ncatalog_len = len(catalog)\nprint(f\"Catalog: {catalog} | Length: {catalog_len}\")\n",
      "target": "Catalog: ['SKU-10', 'SKU-20', 'SKU-30', 'SKU-40', 'SKU-50'] | Length: 5\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "catalog",
            "type": "list",
            "value": [
              "SKU-10",
              "SKU-20",
              "SKU-30",
              "SKU-40",
              "SKU-50"
            ],
            "exact": true
          },
          {
            "name": "catalog_len",
            "type": "int",
            "value": 5,
            "exact": true
          }
        ]
      },
      "explanation": "Slice assignment lst[start:stop] = new_items replaces multiple elements in-place with the contents of an iterable, directly demonstrating list mutability.",
      "hint": "Assign ['SKU-20', 'SKU-30', 'SKU-40'] directly to catalog[1:4], then find len(catalog)."
    },
    {
      "id": 13,
      "difficulty": "Medium",
      "category": "sorting",
      "title": "Leaderboard Ranking with Reverse Sort",
      "given": "scores = [78, 92, 64, 88, 95, 81]",
      "outputs": [
        "top_score",
        "lowest_score",
        "top_three",
        "scores"
      ],
      "starterCode": "",
      "desc": "Given `scores = [78, 92, 64, 88, 95, 81]`, sort the scores in descending order (highest to lowest) in-place using `scores.sort(reverse=True)`. Store the highest score in `top_score`, the lowest score in `lowest_score`, and the top 3 scores in `top_three`.",
      "prompt": "<strong>[Medium] Leaderboard Ranking with Reverse Sort</strong><p>Given <code>scores = [78, 92, 64, 88, 95, 81]</code>:</p><p>Sort <code>scores</code> in-place from highest to lowest using <code>scores.sort(reverse=True)</code>. Store the highest score in <code>top_score</code>, the lowest in <code>lowest_score</code>, and slice the first 3 scores into <code>top_three</code>.</p>",
      "ref": "scores = [78, 92, 64, 88, 95, 81]\nscores.sort(reverse=True)\ntop_score = scores[0]\nlowest_score = scores[-1]\ntop_three = scores[:3]\nprint(f\"Top: {top_score} | Lowest: {lowest_score} | Top 3: {top_three}\")\n",
      "solution": "scores = [78, 92, 64, 88, 95, 81]\nscores.sort(reverse=True)\ntop_score = scores[0]\nlowest_score = scores[-1]\ntop_three = scores[:3]\nprint(f\"Top: {top_score} | Lowest: {lowest_score} | Top 3: {top_three}\")\n",
      "target": "Top: 95 | Lowest: 64 | Top 3: [95, 92, 88]\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "top_score",
            "type": "int",
            "value": 95,
            "exact": true
          },
          {
            "name": "lowest_score",
            "type": "int",
            "value": 64,
            "exact": true
          },
          {
            "name": "top_three",
            "type": "list",
            "value": [
              95,
              92,
              88
            ],
            "exact": true
          },
          {
            "name": "scores",
            "type": "list",
            "value": [
              95,
              92,
              88,
              81,
              78,
              64
            ],
            "exact": true
          }
        ]
      },
      "explanation": "Passing reverse=True to sort() sorts elements in-place in descending order. Index 0 is the maximum, index -1 is the minimum, and [:3] slices the podium positions.",
      "hint": "Use scores.sort(reverse=True), then extract scores[0], scores[-1], and scores[:3]."
    },
    {
      "id": 14,
      "difficulty": "Medium",
      "category": "methods",
      "title": "Transaction Status Frequency Audit",
      "given": "statuses = ['PAID', 'PENDING', 'PAID', 'FAILED', 'PAID', 'PENDING', 'REFUND']",
      "outputs": [
        "paid_count",
        "pending_count",
        "refund_count",
        "total_records"
      ],
      "starterCode": "",
      "desc": "Given `statuses = ['PAID', 'PENDING', 'PAID', 'FAILED', 'PAID', 'PENDING', 'REFUND']`, count the occurrences of `'PAID'`, `'PENDING'`, and `'REFUND'` using `.count()`. Store the results in `paid_count`, `pending_count`, and `refund_count`. Store the total count in `total_records`.",
      "prompt": "<strong>[Medium] Transaction Status Frequency Audit</strong><p>Given <code>statuses = ['PAID', 'PENDING', 'PAID', 'FAILED', 'PAID', 'PENDING', 'REFUND']</code>:</p><p>Count the occurrences of <code>'PAID'</code> in <code>paid_count</code>, <code>'PENDING'</code> in <code>pending_count</code>, and <code>'REFUND'</code> in <code>refund_count</code> using <code>.count()</code>. Store <code>len(statuses)</code> in <code>total_records</code>.</p>",
      "ref": "statuses = ['PAID', 'PENDING', 'PAID', 'FAILED', 'PAID', 'PENDING', 'REFUND']\npaid_count = statuses.count('PAID')\npending_count = statuses.count('PENDING')\nrefund_count = statuses.count('REFUND')\ntotal_records = len(statuses)\nprint(f\"Paid: {paid_count} | Pending: {pending_count} | Refund: {refund_count} | Total: {total_records}\")\n",
      "solution": "statuses = ['PAID', 'PENDING', 'PAID', 'FAILED', 'PAID', 'PENDING', 'REFUND']\npaid_count = statuses.count('PAID')\npending_count = statuses.count('PENDING')\nrefund_count = statuses.count('REFUND')\ntotal_records = len(statuses)\nprint(f\"Paid: {paid_count} | Pending: {pending_count} | Refund: {refund_count} | Total: {total_records}\")\n",
      "target": "Paid: 3 | Pending: 2 | Refund: 1 | Total: 7\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "paid_count",
            "type": "int",
            "value": 3,
            "exact": true
          },
          {
            "name": "pending_count",
            "type": "int",
            "value": 2,
            "exact": true
          },
          {
            "name": "refund_count",
            "type": "int",
            "value": 1,
            "exact": true
          },
          {
            "name": "total_records",
            "type": "int",
            "value": 7,
            "exact": true
          }
        ]
      },
      "explanation": "The list.count(x) method returns the number of times x appears in the list.",
      "hint": "Use statuses.count('PAID'), statuses.count('PENDING'), statuses.count('REFUND'), and len(statuses)."
    },
    {
      "id": 15,
      "difficulty": "Medium",
      "category": "indexing",
      "title": "2D Grid Matrix Coordinate Access",
      "given": "grid = [[10, 20, 30], [40, 50, 60], [70, 80, 90]]",
      "outputs": [
        "top_left",
        "center",
        "bottom_right",
        "diagonal_sum"
      ],
      "starterCode": "",
      "desc": "Given `grid = [[10, 20, 30], [40, 50, 60], [70, 80, 90]]`, access the top-left element in `top_left`, center element in `center`, and bottom-right element in `bottom_right` using nested indexing `grid[r][c]`. Calculate their sum in `diagonal_sum`.",
      "prompt": "<strong>[Medium] 2D Grid Matrix Coordinate Access</strong><p>Given 2D matrix <code>grid = [[10, 20, 30], [40, 50, 60], [70, 80, 90]]</code>:</p><p>Access <code>grid[0][0]</code> into <code>top_left</code>, the center element <code>grid[1][1]</code> into <code>center</code>, and bottom-right element <code>grid[2][2]</code> into <code>bottom_right</code>. Calculate <code>top_left + center + bottom_right</code> into <code>diagonal_sum</code>.</p>",
      "ref": "grid = [[10, 20, 30], [40, 50, 60], [70, 80, 90]]\ntop_left = grid[0][0]\ncenter = grid[1][1]\nbottom_right = grid[2][2]\ndiagonal_sum = top_left + center + bottom_right\nprint(f\"Top-Left: {top_left} | Center: {center} | Bottom-Right: {bottom_right} | Sum: {diagonal_sum}\")\n",
      "solution": "grid = [[10, 20, 30], [40, 50, 60], [70, 80, 90]]\ntop_left = grid[0][0]\ncenter = grid[1][1]\nbottom_right = grid[2][2]\ndiagonal_sum = top_left + center + bottom_right\nprint(f\"Top-Left: {top_left} | Center: {center} | Bottom-Right: {bottom_right} | Sum: {diagonal_sum}\")\n",
      "target": "Top-Left: 10 | Center: 50 | Bottom-Right: 90 | Sum: 150\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "top_left",
            "type": "int",
            "value": 10,
            "exact": true
          },
          {
            "name": "center",
            "type": "int",
            "value": 50,
            "exact": true
          },
          {
            "name": "bottom_right",
            "type": "int",
            "value": 90,
            "exact": true
          },
          {
            "name": "diagonal_sum",
            "type": "int",
            "value": 150,
            "exact": true
          }
        ]
      },
      "explanation": "In nested lists, the first index selects the sublist row, and the second index selects the item inside that row.",
      "hint": "Use grid[0][0], grid[1][1], grid[2][2], and add them up."
    },
    {
      "id": 16,
      "difficulty": "Hard",
      "category": "methods",
      "title": "List Extension vs Concatenation",
      "given": "core_modules = ['Auth', 'Database']\naddon_modules = ['Cache', 'Search']",
      "outputs": [
        "merged",
        "core_modules",
        "extended_len_ok"
      ],
      "starterCode": "",
      "desc": "Create `merged = core_modules + addon_modules`. Then extend `core_modules` in-place with `['Analytics']` using `.extend()`. Store whether `core_modules` has length 3 in `extended_len_ok`.",
      "prompt": "<strong>[Hard] List Extension vs Concatenation</strong><p>Given <code>core_modules = ['Auth', 'Database']</code> and <code>addon_modules = ['Cache', 'Search']</code>:</p><p>Combine them into <code>merged</code> using <code>+</code>. Extend <code>core_modules</code> in-place with <code>['Analytics']</code> using <code>.extend(['Analytics'])</code>. Store whether <code>len(core_modules) == 3</code> in <code>extended_len_ok</code>.</p>",
      "ref": "core_modules = ['Auth', 'Database']\naddon_modules = ['Cache', 'Search']\nmerged = core_modules + addon_modules\ncore_modules.extend(['Analytics'])\nextended_len_ok = len(core_modules) == 3\nprint(f\"Merged: {merged} | Core: {core_modules} | Ok: {extended_len_ok}\")\n",
      "solution": "core_modules = ['Auth', 'Database']\naddon_modules = ['Cache', 'Search']\nmerged = core_modules + addon_modules\ncore_modules.extend(['Analytics'])\nextended_len_ok = len(core_modules) == 3\nprint(f\"Merged: {merged} | Core: {core_modules} | Ok: {extended_len_ok}\")\n",
      "target": "Merged: ['Auth', 'Database', 'Cache', 'Search'] | Core: ['Auth', 'Database', 'Analytics'] | Ok: True\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "merged",
            "type": "list",
            "value": [
              "Auth",
              "Database",
              "Cache",
              "Search"
            ],
            "exact": true
          },
          {
            "name": "core_modules",
            "type": "list",
            "value": [
              "Auth",
              "Database",
              "Analytics"
            ],
            "exact": true
          },
          {
            "name": "extended_len_ok",
            "type": "bool",
            "value": true,
            "exact": true
          }
        ]
      },
      "explanation": "+ concatenation creates a new list leaving originals untouched, while .extend() mutates the list in-place.",
      "hint": "Use + for merged, .extend(['Analytics']) for in-place addition, and test len(core_modules) == 3."
    },
    {
      "id": 17,
      "difficulty": "Hard",
      "category": "copying",
      "title": "Deep Copy Isolation Guard",
      "given": "dept_tree = [['Eng', 'QA'], ['Product', 'Design']]",
      "outputs": [
        "orig_len",
        "clone_len"
      ],
      "starterCode": "",
      "desc": "Create `isolated_tree = copy.deepcopy(dept_tree)`. Append `'DevOps'` to `isolated_tree[0]`. Verify `len(dept_tree[0])` remains 2 while `len(isolated_tree[0])` becomes 3.",
      "prompt": "<strong>[Hard] Deep Copy Isolation Guard</strong><p>Import <code>copy</code>, create <code>isolated_tree = copy.deepcopy(dept_tree)</code>, and append <code>'DevOps'</code> to <code>isolated_tree[0]</code>. Store <code>len(dept_tree[0])</code> in <code>orig_len</code> and <code>len(isolated_tree[0])</code> in <code>clone_len</code>.</p>",
      "ref": "import copy\ndept_tree = [['Eng', 'QA'], ['Product', 'Design']]\nisolated_tree = copy.deepcopy(dept_tree)\nisolated_tree[0].append('DevOps')\norig_len = len(dept_tree[0])\nclone_len = len(isolated_tree[0])\nprint(f\"Orig: {orig_len} | Clone: {clone_len}\")\n",
      "solution": "import copy\ndept_tree = [['Eng', 'QA'], ['Product', 'Design']]\nisolated_tree = copy.deepcopy(dept_tree)\nisolated_tree[0].append('DevOps')\norig_len = len(dept_tree[0])\nclone_len = len(isolated_tree[0])\nprint(f\"Orig: {orig_len} | Clone: {clone_len}\")\n",
      "target": "Orig: 2 | Clone: 3\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "orig_len",
            "type": "int",
            "value": 2,
            "exact": true
          },
          {
            "name": "clone_len",
            "type": "int",
            "value": 3,
            "exact": true
          }
        ]
      },
      "explanation": "copy.deepcopy() recursively clones nested containers. Mutating isolated_tree[0] leaves the inner list of dept_tree unchanged.",
      "hint": "Use copy.deepcopy(dept_tree) and append to isolated_tree[0]."
    },
    {
      "id": 18,
      "difficulty": "Hard",
      "category": "modifying",
      "title": "In-Place Element Swapping & Queue Reordering",
      "given": "queue = ['Low-Priority', 'Standard', 'URGENT', 'Archive']",
      "outputs": [
        "lead_task",
        "queue"
      ],
      "starterCode": "",
      "desc": "Given `queue = ['Low-Priority', 'Standard', 'URGENT', 'Archive']`, swap index 0 and index 2 in-place using `queue[0], queue[2] = queue[2], queue[0]`. Store the new first element in `lead_task`.",
      "prompt": "<strong>[Hard] In-Place Element Swapping & Queue Reordering</strong><p>Given <code>queue = ['Low-Priority', 'Standard', 'URGENT', 'Archive']</code>:</p><p>Swap index 0 and index 2 in-place using <code>queue[0], queue[2] = queue[2], queue[0]</code>. Store the updated first item in <code>lead_task</code> and print <code>queue</code>.</p>",
      "ref": "queue = ['Low-Priority', 'Standard', 'URGENT', 'Archive']\nqueue[0], queue[2] = queue[2], queue[0]\nlead_task = queue[0]\nprint(f\"Lead: {lead_task} | Queue: {queue}\")\n",
      "solution": "queue = ['Low-Priority', 'Standard', 'URGENT', 'Archive']\nqueue[0], queue[2] = queue[2], queue[0]\nlead_task = queue[0]\nprint(f\"Lead: {lead_task} | Queue: {queue}\")\n",
      "target": "Lead: URGENT | Queue: ['URGENT', 'Standard', 'Low-Priority', 'Archive']\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "lead_task",
            "type": "string",
            "value": "URGENT",
            "exact": true
          },
          {
            "name": "queue",
            "type": "list",
            "value": [
              "URGENT",
              "Standard",
              "Low-Priority",
              "Archive"
            ],
            "exact": true
          }
        ]
      },
      "explanation": "Python evaluates the right side into a temporary tuple before unpacking to the left targets, safely swapping elements in-place.",
      "hint": "Swap elements using queue[0], queue[2] = queue[2], queue[0], then assign lead_task = queue[0]."
    },
    {
      "id": 19,
      "difficulty": "Hard",
      "category": "methods",
      "title": "Safe Index Searching",
      "given": "status_codes = [200, 201, 301, 404, 500]\ntarget1 = 404\ntarget2 = 403",
      "outputs": [
        "idx1",
        "idx2"
      ],
      "starterCode": "",
      "desc": "Safely search `target1` and `target2` in `status_codes`: if present store its `.index()`, else store `-1`. Store in `idx1` and `idx2`.",
      "prompt": "<strong>[Hard] Safe Index Searching</strong><p>Avoid ValueError on index lookup: store <code>status_codes.index(target1) if target1 in status_codes else -1</code> in <code>idx1</code>, and the same check for <code>target2</code> in <code>idx2</code>.</p>",
      "ref": "status_codes = [200, 201, 301, 404, 500]\ntarget1 = 404\ntarget2 = 403\nidx1 = status_codes.index(target1) if target1 in status_codes else -1\nidx2 = status_codes.index(target2) if target2 in status_codes else -1\nprint(f\"Idx1: {idx1} | Idx2: {idx2}\")\n",
      "solution": "status_codes = [200, 201, 301, 404, 500]\ntarget1 = 404\ntarget2 = 403\nidx1 = status_codes.index(target1) if target1 in status_codes else -1\nidx2 = status_codes.index(target2) if target2 in status_codes else -1\nprint(f\"Idx1: {idx1} | Idx2: {idx2}\")\n",
      "target": "Idx1: 3 | Idx2: -1\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "idx1",
            "type": "int",
            "value": 3,
            "exact": true
          },
          {
            "name": "idx2",
            "type": "int",
            "value": -1,
            "exact": true
          }
        ]
      },
      "explanation": "lst.index(x) raises a fatal ValueError if x is absent. Guarding with 'if x in lst else -1' prevents uncaught exceptions in production.",
      "hint": "Use lst.index(x) if x in lst else -1."
    },
    {
      "id": 20,
      "difficulty": "Hard",
      "category": "sorting",
      "title": "In-Place Reverse vs Slice Reverse",
      "given": "metrics = [10, 20, 30, 40, 50]",
      "outputs": [
        "slice_rev",
        "in_place_rev"
      ],
      "starterCode": "",
      "desc": "Create reversed copy `slice_rev = metrics[::-1]`. Then reverse `metrics` in-place using `.reverse()`. Store resulting `metrics` in `in_place_rev`.",
      "prompt": "<strong>[Hard] In-Place Reverse vs Slice Reverse</strong><p>Store a reversed copy of <code>metrics</code> in <code>slice_rev</code> using <code>metrics[::-1]</code>. Then execute <code>metrics.reverse()</code> and assign <code>metrics</code> to <code>in_place_rev</code>.</p>",
      "ref": "metrics = [10, 20, 30, 40, 50]\nslice_rev = metrics[::-1]\nmetrics.reverse()\nin_place_rev = metrics\nprint(f\"Slice: {slice_rev} | In-Place: {in_place_rev}\")\n",
      "solution": "metrics = [10, 20, 30, 40, 50]\nslice_rev = metrics[::-1]\nmetrics.reverse()\nin_place_rev = metrics\nprint(f\"Slice: {slice_rev} | In-Place: {in_place_rev}\")\n",
      "target": "Slice: [50, 40, 30, 20, 10] | In-Place: [50, 40, 30, 20, 10]\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "slice_rev",
            "type": "list",
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
            "name": "in_place_rev",
            "type": "list",
            "value": [
              50,
              40,
              30,
              20,
              10
            ],
            "exact": true
          }
        ]
      },
      "explanation": "metrics[::-1] allocates a fresh reversed list without mutating metrics. metrics.reverse() inverts pointers directly in-place and returns None.",
      "hint": "Use metrics[::-1] for slice copy, and metrics.reverse() for in-place mutation."
    }
  ],
  "testQuestions": [
    {
      "id": 1,
      "difficulty": "Easy",
      "category": "creation",
      "title": "Empty List and Multi-Append",
      "given": "",
      "outputs": [
        "items"
      ],
      "starterCode": "",
      "prompt": "<strong>[Easy] Empty List and Multi-Append</strong><p>Create an empty list <code>items</code>. Append integers <code>5</code>, <code>10</code>, and <code>15</code> sequentially using <code>append()</code>.</p>",
      "ref": "items = []\nitems.append(5)\nitems.append(10)\nitems.append(15)\nprint(items)\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "items",
            "type": "list",
            "value": [
              5,
              10,
              15
            ],
            "exact": true
          }
        ]
      },
      "explanation": "append() adds elements to the end of a list one at a time."
    },
    {
      "id": 2,
      "difficulty": "Easy",
      "category": "types",
      "title": "List Length and Type Audit",
      "given": "records = ['a', 'b', 'c', 'd', 'e']",
      "outputs": [
        "records_len",
        "records_type"
      ],
      "starterCode": "",
      "prompt": "<strong>[Easy] List Length and Type Audit</strong><p>Given <code>records = ['a', 'b', 'c', 'd', 'e']</code>, store its length in <code>records_len</code> and type name in <code>records_type</code>.</p>",
      "ref": "records = ['a', 'b', 'c', 'd', 'e']\nrecords_len = len(records)\nrecords_type = type(records).__name__\nprint(records_len, records_type)\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "records_len",
            "type": "int",
            "value": 5,
            "exact": true
          },
          {
            "name": "records_type",
            "type": "string",
            "value": "list",
            "exact": true
          }
        ]
      },
      "explanation": "len() measures sequence size, while type().__name__ reads the type identifier string."
    },
    {
      "id": 3,
      "difficulty": "Easy",
      "category": "indexing",
      "title": "Positive and Negative Head/Tail",
      "given": "nums = [10, 20, 30, 40]",
      "outputs": [
        "head",
        "tail"
      ],
      "starterCode": "",
      "prompt": "<strong>[Easy] Positive and Negative Head/Tail</strong><p>Given <code>nums = [10, 20, 30, 40]</code>, extract the first element in <code>head</code> using index 0, and last element in <code>tail</code> using index -1.</p>",
      "ref": "nums = [10, 20, 30, 40]\nhead = nums[0]\ntail = nums[-1]\nprint(head, tail)\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "head",
            "type": "int",
            "value": 10,
            "exact": true
          },
          {
            "name": "tail",
            "type": "int",
            "value": 40,
            "exact": true
          }
        ]
      },
      "explanation": "Index 0 addresses the start of the list; negative index -1 wraps around to address the final element."
    },
    {
      "id": 4,
      "difficulty": "Easy",
      "category": "indexing",
      "title": "Middle Element Retrieval",
      "given": "tokens = ['t1', 't2', 't3', 't4', 't5']",
      "outputs": [
        "mid_token"
      ],
      "starterCode": "",
      "prompt": "<strong>[Easy] Middle Element Retrieval</strong><p>Given <code>tokens = ['t1', 't2', 't3', 't4', 't5']</code>, extract the middle item into <code>mid_token</code> using integer floor division <code>tokens[len(tokens) // 2]</code>.</p>",
      "ref": "tokens = ['t1', 't2', 't3', 't4', 't5']\nmid_token = tokens[len(tokens) // 2]\nprint(mid_token)\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "mid_token",
            "type": "string",
            "value": "t3",
            "exact": true
          }
        ]
      },
      "explanation": "5 // 2 evaluates to integer 2, pointing directly to index 2 ('t3')."
    },
    {
      "id": 5,
      "difficulty": "Easy",
      "category": "modifying",
      "title": "In-Place Item Mutation",
      "given": "fruits = ['apple', 'banana', 'cherry']",
      "outputs": [
        "fruits"
      ],
      "starterCode": "",
      "prompt": "<strong>[Easy] In-Place Item Mutation</strong><p>Given <code>fruits = ['apple', 'banana', 'cherry']</code>, replace <code>'banana'</code> at index 1 with <code>'blueberry'</code> in-place.</p>",
      "ref": "fruits = ['apple', 'banana', 'cherry']\nfruits[1] = 'blueberry'\nprint(fruits)\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "fruits",
            "type": "list",
            "value": [
              "apple",
              "blueberry",
              "cherry"
            ],
            "exact": true
          }
        ]
      },
      "explanation": "Lists are mutable: reassigning an existing index changes the target pointer in-place."
    },
    {
      "id": 6,
      "difficulty": "Easy",
      "category": "slicing",
      "title": "Front Slicing",
      "given": "codes = [101, 102, 103, 104, 105, 106]",
      "outputs": [
        "head_codes"
      ],
      "starterCode": "",
      "prompt": "<strong>[Easy] Front Slicing</strong><p>Given <code>codes = [101, 102, 103, 104, 105, 106]</code>, slice the first 3 items into <code>head_codes</code>.</p>",
      "ref": "codes = [101, 102, 103, 104, 105, 106]\nhead_codes = codes[:3]\nprint(head_codes)\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "head_codes",
            "type": "list",
            "value": [
              101,
              102,
              103
            ],
            "exact": true
          }
        ]
      },
      "explanation": "[:3] extracts items at indices 0, 1, and 2 as a new list."
    },
    {
      "id": 7,
      "difficulty": "Easy",
      "category": "slicing",
      "title": "Tail Slicing with Negative Indices",
      "given": "codes = [101, 102, 103, 104, 105, 106]",
      "outputs": [
        "tail_codes"
      ],
      "starterCode": "",
      "prompt": "<strong>[Easy] Tail Slicing with Negative Indices</strong><p>Given <code>codes = [101, 102, 103, 104, 105, 106]</code>, slice the last 3 items into <code>tail_codes</code> using <code>codes[-3:]</code>.</p>",
      "ref": "codes = [101, 102, 103, 104, 105, 106]\ntail_codes = codes[-3:]\nprint(tail_codes)\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "tail_codes",
            "type": "list",
            "value": [
              104,
              105,
              106
            ],
            "exact": true
          }
        ]
      },
      "explanation": "[-3:] starts 3 items from the right and takes all remaining elements through the end."
    },
    {
      "id": 8,
      "difficulty": "Easy",
      "category": "slicing",
      "title": "Striding with Step",
      "given": "vals = [0, 1, 2, 3, 4, 5, 6, 7]",
      "outputs": [
        "evens"
      ],
      "starterCode": "",
      "prompt": "<strong>[Easy] Striding with Step</strong><p>Given <code>vals = [0, 1, 2, 3, 4, 5, 6, 7]</code>, extract every second element starting at index 0 into <code>evens</code> using step <code>2</code>.</p>",
      "ref": "vals = [0, 1, 2, 3, 4, 5, 6, 7]\nevens = vals[::2]\nprint(evens)\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "evens",
            "type": "list",
            "value": [
              0,
              2,
              4,
              6
            ],
            "exact": true
          }
        ]
      },
      "explanation": "[::2] steps across the sequence by 2, selecting indices 0, 2, 4, 6."
    },
    {
      "id": 9,
      "difficulty": "Easy",
      "category": "slicing",
      "title": "List Reversal via Slicing",
      "given": "items = ['x', 'y', 'z']",
      "outputs": [
        "rev_items"
      ],
      "starterCode": "",
      "prompt": "<strong>[Easy] List Reversal via Slicing</strong><p>Given <code>items = ['x', 'y', 'z']</code>, construct a reversed copy in <code>rev_items</code> using slice step <code>-1</code>.</p>",
      "ref": "items = ['x', 'y', 'z']\nrev_items = items[::-1]\nprint(rev_items)\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "rev_items",
            "type": "list",
            "value": [
              "z",
              "y",
              "x"
            ],
            "exact": true
          }
        ]
      },
      "explanation": "[::-1] strides through the list backwards, allocating a fresh reversed sequence."
    },
    {
      "id": 10,
      "difficulty": "Easy",
      "category": "validation",
      "title": "Membership Verification",
      "given": "users = ['alice', 'bob', 'charlie']",
      "outputs": [
        "has_alice",
        "has_dan"
      ],
      "starterCode": "",
      "prompt": "<strong>[Easy] Membership Verification</strong><p>Given <code>users = ['alice', 'bob', 'charlie']</code>, store whether <code>'alice' in users</code> in <code>has_alice</code>, and whether <code>'dan' in users</code> in <code>has_dan</code>.</p>",
      "ref": "users = ['alice', 'bob', 'charlie']\nhas_alice = 'alice' in users\nhas_dan = 'dan' in users\nprint(has_alice, has_dan)\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "has_alice",
            "type": "bool",
            "value": true,
            "exact": true
          },
          {
            "name": "has_dan",
            "type": "bool",
            "value": false,
            "exact": true
          }
        ]
      },
      "explanation": "The in operator performs a linear search over list elements, returning True on first match or False if exhausted."
    },
    {
      "id": 11,
      "difficulty": "Medium",
      "category": "methods",
      "title": "Count Occurrences",
      "given": "scores = [100, 95, 100, 80, 100, 70]",
      "outputs": [
        "count_100"
      ],
      "starterCode": "",
      "prompt": "<strong>[Medium] Count Occurrences</strong><p>Given <code>scores = [100, 95, 100, 80, 100, 70]</code>, use <code>count(100)</code> to store the frequency in <code>count_100</code>.</p>",
      "ref": "scores = [100, 95, 100, 80, 100, 70]\ncount_100 = scores.count(100)\nprint(count_100)\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "count_100",
            "type": "int",
            "value": 3,
            "exact": true
          }
        ]
      },
      "explanation": "count(x) scans the entire list and counts how many times value x appears."
    },
    {
      "id": 12,
      "difficulty": "Medium",
      "category": "methods",
      "title": "Index Lookup",
      "given": "colors = ['red', 'green', 'blue', 'yellow']",
      "outputs": [
        "green_idx"
      ],
      "starterCode": "",
      "prompt": "<strong>[Medium] Index Lookup</strong><p>Given <code>colors = ['red', 'green', 'blue', 'yellow']</code>, find the 0-based index of <code>'green'</code> using <code>index()</code> into <code>green_idx</code>.</p>",
      "ref": "colors = ['red', 'green', 'blue', 'yellow']\ngreen_idx = colors.index('green')\nprint(green_idx)\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "green_idx",
            "type": "int",
            "value": 1,
            "exact": true
          }
        ]
      },
      "explanation": "index('green') returns 1, the index of the first occurrence."
    },
    {
      "id": 13,
      "difficulty": "Medium",
      "category": "adding",
      "title": "List Concatenation",
      "given": "a = [1, 2]\nb = [3, 4]",
      "outputs": [
        "c"
      ],
      "starterCode": "",
      "prompt": "<strong>[Medium] List Concatenation</strong><p>Given <code>a = [1, 2]</code> and <code>b = [3, 4]</code>, concatenate them with <code>+</code> into <code>c</code>.</p>",
      "ref": "a = [1, 2]\nb = [3, 4]\nc = a + b\nprint(c)\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "c",
            "type": "list",
            "value": [
              1,
              2,
              3,
              4
            ],
            "exact": true
          }
        ]
      },
      "explanation": "The + operator concatenates two lists without mutating the operands."
    },
    {
      "id": 14,
      "difficulty": "Medium",
      "category": "adding",
      "title": "List In-Place Extension",
      "given": "q = ['a', 'b']",
      "outputs": [
        "q"
      ],
      "starterCode": "",
      "prompt": "<strong>[Medium] List In-Place Extension</strong><p>Given <code>q = ['a', 'b']</code>, extend it in-place using <code>extend(['c', 'd'])</code>.</p>",
      "ref": "q = ['a', 'b']\nq.extend(['c', 'd'])\nprint(q)\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "q",
            "type": "list",
            "value": [
              "a",
              "b",
              "c",
              "d"
            ],
            "exact": true
          }
        ]
      },
      "explanation": "extend() unpacks the given iterable into the caller list in-place."
    },
    {
      "id": 15,
      "difficulty": "Medium",
      "category": "adding",
      "title": "Inserting at Arbitrary Index",
      "given": "seq = [1, 2, 4]",
      "outputs": [
        "seq"
      ],
      "starterCode": "",
      "prompt": "<strong>[Medium] Inserting at Arbitrary Index</strong><p>Given <code>seq = [1, 2, 4]</code>, insert <code>3</code> at index <code>2</code> using <code>insert()</code>.</p>",
      "ref": "seq = [1, 2, 4]\nseq.insert(2, 3)\nprint(seq)\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "seq",
            "type": "list",
            "value": [
              1,
              2,
              3,
              4
            ],
            "exact": true
          }
        ]
      },
      "explanation": "insert(2, 3) shifts existing element 4 right and places 3 at index 2."
    },
    {
      "id": 16,
      "difficulty": "Medium",
      "category": "removing",
      "title": "Pop Tail Element",
      "given": "stack = [10, 20, 30]",
      "outputs": [
        "popped",
        "stack"
      ],
      "starterCode": "",
      "prompt": "<strong>[Medium] Pop Tail Element</strong><p>Given <code>stack = [10, 20, 30]</code>, pop the last element using <code>pop()</code> into <code>popped</code>.</p>",
      "ref": "stack = [10, 20, 30]\npopped = stack.pop()\nprint(popped, stack)\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "popped",
            "type": "int",
            "value": 30,
            "exact": true
          },
          {
            "name": "stack",
            "type": "list",
            "value": [
              10,
              20
            ],
            "exact": true
          }
        ]
      },
      "explanation": "pop() with no arguments removes and returns the last element in O(1) time."
    },
    {
      "id": 17,
      "difficulty": "Medium",
      "category": "removing",
      "title": "Pop Head Element",
      "given": "queue = [10, 20, 30]",
      "outputs": [
        "head",
        "queue"
      ],
      "starterCode": "",
      "prompt": "<strong>[Medium] Pop Head Element</strong><p>Given <code>queue = [10, 20, 30]</code>, pop the first element using <code>pop(0)</code> into <code>head</code>.</p>",
      "ref": "queue = [10, 20, 30]\nhead = queue.pop(0)\nprint(head, queue)\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "head",
            "type": "int",
            "value": 10,
            "exact": true
          },
          {
            "name": "queue",
            "type": "list",
            "value": [
              20,
              30
            ],
            "exact": true
          }
        ]
      },
      "explanation": "pop(0) extracts the item at index 0 and shifts remaining elements left."
    },
    {
      "id": 18,
      "difficulty": "Medium",
      "category": "removing",
      "title": "Value Removal with remove()",
      "given": "tags = ['v1', 'v2', 'v3', 'v2']",
      "outputs": [
        "tags"
      ],
      "starterCode": "",
      "prompt": "<strong>[Medium] Value Removal with remove()</strong><p>Given <code>tags = ['v1', 'v2', 'v3', 'v2']</code>, remove the first occurrence of <code>'v2'</code> using <code>remove('v2')</code>.</p>",
      "ref": "tags = ['v1', 'v2', 'v3', 'v2']\ntags.remove('v2')\nprint(tags)\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "tags",
            "type": "list",
            "value": [
              "v1",
              "v3",
              "v2"
            ],
            "exact": true
          }
        ]
      },
      "explanation": "remove('v2') searches left-to-right and deletes only the first matching element."
    },
    {
      "id": 19,
      "difficulty": "Medium",
      "category": "removing",
      "title": "Slice Deletion with del",
      "given": "nums = [0, 1, 2, 3, 4, 5]",
      "outputs": [
        "nums"
      ],
      "starterCode": "",
      "prompt": "<strong>[Medium] Slice Deletion with del</strong><p>Given <code>nums = [0, 1, 2, 3, 4, 5]</code>, delete elements at indices 2 and 3 using <code>del nums[2:4]</code>.</p>",
      "ref": "nums = [0, 1, 2, 3, 4, 5]\ndel nums[2:4]\nprint(nums)\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "nums",
            "type": "list",
            "value": [
              0,
              1,
              4,
              5
            ],
            "exact": true
          }
        ]
      },
      "explanation": "del nums[2:4] removes slice elements 2 and 3 in-place and compresses the array."
    },
    {
      "id": 20,
      "difficulty": "Medium",
      "category": "removing",
      "title": "Clearing List in Place",
      "given": "buf = [1, 2, 3]",
      "outputs": [
        "buf"
      ],
      "starterCode": "",
      "prompt": "<strong>[Medium] Clearing List in Place</strong><p>Given <code>buf = [1, 2, 3]</code>, remove all elements in-place using <code>clear()</code>.</p>",
      "ref": "buf = [1, 2, 3]\nbuf.clear()\nprint(buf)\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "buf",
            "type": "list",
            "value": [],
            "exact": true
          }
        ]
      },
      "explanation": "clear() removes all elements in-place while keeping the object reference alive."
    },
    {
      "id": 21,
      "difficulty": "Hard",
      "category": "sorting",
      "title": "In-Place Sort Ascending",
      "given": "nums = [5, 2, 9, 1, 7]",
      "outputs": [
        "nums"
      ],
      "starterCode": "",
      "prompt": "<strong>[Hard] In-Place Sort Ascending</strong><p>Given <code>nums = [5, 2, 9, 1, 7]</code>, sort in-place in ascending order using <code>sort()</code>.</p>",
      "ref": "nums = [5, 2, 9, 1, 7]\nnums.sort()\nprint(nums)\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "nums",
            "type": "list",
            "value": [
              1,
              2,
              5,
              7,
              9
            ],
            "exact": true
          }
        ]
      },
      "explanation": "nums.sort() applies Timsort in-place and returns None."
    },
    {
      "id": 22,
      "difficulty": "Hard",
      "category": "sorting",
      "title": "In-Place Sort Descending",
      "given": "nums = [5, 2, 9, 1, 7]",
      "outputs": [
        "nums"
      ],
      "starterCode": "",
      "prompt": "<strong>[Hard] In-Place Sort Descending</strong><p>Given <code>nums = [5, 2, 9, 1, 7]</code>, sort in-place descending using <code>sort(reverse=True)</code>.</p>",
      "ref": "nums = [5, 2, 9, 1, 7]\nnums.sort(reverse=True)\nprint(nums)\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "nums",
            "type": "list",
            "value": [
              9,
              7,
              5,
              2,
              1
            ],
            "exact": true
          }
        ]
      },
      "explanation": "Passing reverse=True reverses the sort ordering in-place."
    },
    {
      "id": 23,
      "difficulty": "Hard",
      "category": "unpacking",
      "title": "Starred Sequence Unpacking",
      "given": "data = [1, 2, 3, 4, 5]",
      "outputs": [
        "h",
        "m",
        "t"
      ],
      "starterCode": "",
      "prompt": "<strong>[Hard] Starred Sequence Unpacking</strong><p>Given <code>data = [1, 2, 3, 4, 5]</code>, unpack into <code>h</code> (first element), <code>m</code> (middle elements list using <code>*m</code>), and <code>t</code> (last element).</p>",
      "ref": "data = [1, 2, 3, 4, 5]\nh, *m, t = data\nprint(h, m, t)\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "h",
            "type": "int",
            "value": 1,
            "exact": true
          },
          {
            "name": "m",
            "type": "list",
            "value": [
              2,
              3,
              4
            ],
            "exact": true
          },
          {
            "name": "t",
            "type": "int",
            "value": 5,
            "exact": true
          }
        ]
      },
      "explanation": "Starred variable *m collects all intermediate elements into a list."
    },
    {
      "id": 24,
      "difficulty": "Hard",
      "category": "copying",
      "title": "Shallow Copy Isolation",
      "given": "orig = [1, 2, 3]",
      "outputs": [
        "orig",
        "clone"
      ],
      "starterCode": "",
      "prompt": "<strong>[Hard] Shallow Copy Isolation</strong><p>Given <code>orig = [1, 2, 3]</code>, create <code>clone = orig.copy()</code>. Append <code>4</code> to <code>clone</code>.</p>",
      "ref": "orig = [1, 2, 3]\nclone = orig.copy()\nclone.append(4)\nprint(orig, clone)\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "orig",
            "type": "list",
            "value": [
              1,
              2,
              3
            ],
            "exact": true
          },
          {
            "name": "clone",
            "type": "list",
            "value": [
              1,
              2,
              3,
              4
            ],
            "exact": true
          }
        ]
      },
      "explanation": "orig.copy() creates a new outer list. Appending to clone leaves orig unaffected."
    },
    {
      "id": 25,
      "difficulty": "Hard",
      "category": "modifying",
      "title": "2D Grid Matrix Cell Mutation",
      "given": "grid = [['A', 'B'], ['C', 'D']]",
      "outputs": [
        "original_d",
        "grid"
      ],
      "starterCode": "",
      "prompt": "<strong>[Hard] 2D Grid Matrix Cell Mutation</strong><p>Given <code>grid = [['A', 'B'], ['C', 'D']]</code>, save the bottom-right value at <code>grid[1][1]</code> in <code>original_d</code>, then update <code>grid[1][1]</code> in-place to <code>'Z'</code>.</p>",
      "ref": "grid = [['A', 'B'], ['C', 'D']]\noriginal_d = grid[1][1]\ngrid[1][1] = 'Z'\nprint(f\"Original: {original_d} | Grid: {grid}\")\n",
      "validation": {
        "mode": "variable_check",
        "freshResults": true,
        "checkVars": [
          {
            "name": "original_d",
            "type": "string",
            "value": "D",
            "exact": true
          },
          {
            "name": "grid",
            "type": "list",
            "value": [
              [
                "A",
                "B"
              ],
              [
                "C",
                "Z"
              ]
            ],
            "exact": true
          }
        ]
      },
      "explanation": "Accessing grid[1][1] selects row 1, col 1. Mutating grid[1][1] = 'Z' updates the nested list in-place."
    }
  ],
  "conceptChecks": [
    {
      "id": 1,
      "type": "conceptual",
      "topic": "Memory Architecture",
      "prompt": "How are Python lists implemented in CPython at the systems level?",
      "options": [
        "As doubly-linked lists with node pointers",
        "As contiguous dynamic arrays of 64-bit object pointers (PyListObject)",
        "As binary search trees sorted by element hash",
        "As fixed-size memory blocks managed by OS malloc"
      ],
      "answer": 1,
      "explanation": "CPython lists are contiguous arrays of PyObject* pointers, providing O(1) random indexing."
    },
    {
      "id": 2,
      "type": "conceptual",
      "topic": "Time Complexity",
      "prompt": "What is the amortized time complexity of appending an element to a list with `lst.append()`?",
      "options": [
        "O(N)",
        "O(log N)",
        "O(1)",
        "O(N^2)"
      ],
      "answer": 2,
      "explanation": "append() runs in amortized O(1) time because CPython over-allocates internal memory capacity."
    },
    {
      "id": 3,
      "type": "conceptual",
      "topic": "Time Complexity",
      "prompt": "What is the time complexity of `lst.insert(0, 'x')`?",
      "options": [
        "O(1)",
        "O(N)",
        "O(log N)",
        "O(N log N)"
      ],
      "answer": 1,
      "explanation": "Inserting at index 0 requires shifting all existing N pointers one position right, taking O(N) time."
    },
    {
      "id": 4,
      "type": "conceptual",
      "topic": "In-Place Methods",
      "prompt": "What is returned by `lst.sort()`?",
      "options": [
        "A newly sorted list",
        "The original list sorted",
        "None",
        "The boolean True"
      ],
      "answer": 2,
      "explanation": "lst.sort() mutates the list in-place and returns None to prevent accidental chaining."
    },
    {
      "id": 5,
      "type": "conceptual",
      "topic": "Memory & References",
      "prompt": "What happens when you execute `a = [1, 2]; b = a; b.append(3)`?",
      "options": [
        "Only b is modified; a remains [1, 2]",
        "Both a and b reference the same list, so both become [1, 2, 3]",
        "Python raises a ReferenceError",
        "A copy of a is created automatically"
      ],
      "answer": 1,
      "explanation": "b = a binds b to the exact same list object in memory (aliasing). Mutating b mutates a."
    },
    {
      "id": 6,
      "type": "conceptual",
      "topic": "Shallow Copy Traps",
      "prompt": "What is the result of `grid = [[0] * 3] * 3; grid[0][0] = 1`?",
      "options": [
        "[[1, 0, 0], [0, 0, 0], [0, 0, 0]]",
        "[[1, 0, 0], [1, 0, 0], [1, 0, 0]]",
        "[[1, 1, 1], [0, 0, 0], [0, 0, 0]]",
        "IndexError: grid dimensions immutable"
      ],
      "answer": 1,
      "explanation": "The * operator replicates outer references to the same row object. Mutating row 0 mutates all 3 rows."
    },
    {
      "id": 7,
      "type": "conceptual",
      "topic": "Copying",
      "prompt": "Which function guarantees a true, recursively isolated duplicate of nested lists?",
      "options": [
        "lst.copy()",
        "lst[:]",
        "copy.deepcopy(lst)",
        "list(lst)"
      ],
      "answer": 2,
      "explanation": "copy.deepcopy() recursively duplicates all nested containers and objects."
    },
    {
      "id": 8,
      "type": "conceptual",
      "topic": "Iteration Traps",
      "prompt": "Why should you never mutate a list with `remove()` or `pop()` while iterating directly with `for x in lst:`?",
      "options": [
        "It raises a ConcurrentModificationException",
        "The internal index counter skips elements because indices shift left",
        "It causes an infinite loop",
        "Python locks the list against mutations during loops"
      ],
      "answer": 1,
      "explanation": "The internal loop index increments sequentially while removing shifts elements left, skipping adjacent items."
    },
    {
      "id": 9,
      "type": "conceptual",
      "topic": "Function Defaults",
      "prompt": "Why is `def append_item(x, lst=[]):` an anti-pattern in Python?",
      "options": [
        "Default arguments must be numbers",
        "The default list is instantiated once at function definition time and shared across calls",
        "It causes a SyntaxError",
        "Python clears default arguments after every execution"
      ],
      "answer": 1,
      "explanation": "Default expressions evaluate once at def time. All calls sharing the default mutate the same list."
    },
    {
      "id": 10,
      "type": "conceptual",
      "topic": "Built-in Methods",
      "prompt": "What is the difference between `lst.extend([1, 2])` and `lst.append([1, 2])`?",
      "options": [
        "extend adds elements individually; append adds the entire list as a single nested sublist",
        "There is no difference",
        "extend returns a new list; append mutates in-place",
        "append accepts iterables; extend accepts only single values"
      ],
      "answer": 0,
      "explanation": "append() adds the argument as a single element; extend() iterates over the argument and adds each element."
    },
    {
      "id": 11,
      "type": "conceptual",
      "topic": "Sorting Algorithms",
      "prompt": "Which sorting algorithm is implemented by Python's `sort()` and `sorted()`?",
      "options": [
        "Quicksort",
        "Heapsort",
        "Timsort (hybrid Merge/Insertion sort)",
        "Bubble sort"
      ],
      "answer": 2,
      "explanation": "CPython uses Timsort, an adaptive, stable hybrid of Merge Sort and Insertion Sort with O(N log N) worst-case."
    },
    {
      "id": 12,
      "type": "conceptual",
      "topic": "Indexing",
      "prompt": "What does `lst[-1]` return for any non-empty list `lst`?",
      "options": [
        "The first element",
        "The last element",
        "A slice with all elements except the first",
        "IndexError"
      ],
      "answer": 1,
      "explanation": "Negative indexing wraps from the end: -1 is the last element."
    },
    {
      "id": 13,
      "type": "conceptual",
      "topic": "Slicing",
      "prompt": "What is the result of `lst[2:2]` for any list `lst`?",
      "options": [
        "The element at index 2",
        "An empty list `[]`",
        "IndexError",
        "None"
      ],
      "answer": 1,
      "explanation": "When start == stop, the slice range contains 0 elements, yielding []."
    },
    {
      "id": 14,
      "type": "conceptual",
      "topic": "Slicing",
      "prompt": "What does `lst[:] = [1, 2, 3]` do differently than `lst = [1, 2, 3]`?",
      "options": [
        "There is no difference",
        "lst[:] mutates the existing list object in-place; lst rebinds the variable name to a new object",
        "lst[:] creates a tuple",
        "lst[:] raises a TypeError"
      ],
      "answer": 1,
      "explanation": "Slice assignment lst[:] = ... replaces all contents of the existing object in-place without altering its ID."
    },
    {
      "id": 15,
      "type": "conceptual",
      "topic": "Sequence Unpacking",
      "prompt": "Given `first, *middle, last = [10, 20, 30, 40]`, what is the value and type of `middle`?",
      "options": [
        "(20, 30) tuple",
        "[20, 30] list",
        "20 int",
        "{20, 30} set"
      ],
      "answer": 1,
      "explanation": "Starred target *middle always captures unpacked items into a list."
    },
    {
      "id": 16,
      "type": "conceptual",
      "topic": "Sequence Unpacking",
      "prompt": "What is the value of `middle` in `first, *middle, last = [1, 2]`?",
      "options": [
        "None",
        "[]",
        "Raises ValueError",
        "0"
      ],
      "answer": 1,
      "explanation": "first takes 1, last takes 2, and *middle receives 0 remaining elements, becoming []."
    },
    {
      "id": 17,
      "type": "conceptual",
      "topic": "Search Complexity",
      "prompt": "Why is `'item' in set_obj` significantly faster than `'item' in list_obj` for 1,000,000 elements?",
      "options": [
        "Sets use binary search trees (O(log N))",
        "Sets use hash tables with average O(1) lookup vs O(N) linear scan in lists",
        "Lists require C-level memory allocations on search",
        "Sets store data sorted in CPU L1 cache"
      ],
      "answer": 1,
      "explanation": "Sets compute a hash bucket in O(1) time; lists check every pointer sequentially in O(N) time."
    },
    {
      "id": 18,
      "type": "conceptual",
      "topic": "Dictionary Keys",
      "prompt": "Can a Python `list` be used as a key in a dictionary?",
      "options": [
        "Yes, any object can be a key",
        "No, lists are unhashable because they are mutable",
        "Yes, if the list contains only immutable elements",
        "Only if wrapped in str()"
      ],
      "answer": 1,
      "explanation": "Dict keys must be hashable. Mutable types like lists cannot implement __hash__ safely."
    },
    {
      "id": 19,
      "type": "conceptual",
      "topic": "Built-in Methods",
      "prompt": "What does `lst.pop(0)` do compared to `lst.pop()`?",
      "options": [
        "Both run in O(1) time",
        "pop(0) removes head in O(N) time; pop() removes tail in O(1) time",
        "pop(0) removes nothing",
        "pop(0) is deprecated"
      ],
      "answer": 1,
      "explanation": "pop(0) shifts all remaining elements left (O(N)); pop() drops the last pointer (O(1))."
    },
    {
      "id": 20,
      "type": "conceptual",
      "topic": "Data Structure Selection",
      "prompt": "Which standard library data structure should you use when you need O(1) appends and pops from BOTH ends?",
      "options": [
        "list",
        "collections.deque",
        "heapq",
        "array.array"
      ],
      "answer": 1,
      "explanation": "collections.deque is a double-ended queue implemented as a doubly-linked list of blocks."
    },
    {
      "id": 21,
      "type": "conceptual",
      "topic": "List Initializations",
      "prompt": "How can you instantiate a list containing 100 zeros without loops?",
      "options": [
        "list(0 * 100)",
        "[0] * 100",
        "[0 ** 100]",
        "zeros(100)"
      ],
      "answer": 1,
      "explanation": "[0] * 100 repeats the integer literal 0 one hundred times into a fresh list in O(N) time."
    },
    {
      "id": 22,
      "type": "conceptual",
      "topic": "Memory & References",
      "prompt": "Why does `a = [1, 2]; b = a.copy(); b.append(3)` leave `a` unchanged?",
      "options": [
        "Integers cannot be updated",
        "b has a distinct outer memory container ID (a is not b)",
        "append() creates a new list",
        "Python freezes lists on copy"
      ],
      "answer": 1,
      "explanation": "a.copy() allocates a distinct outer pointer buffer at a new memory address."
    },
    {
      "id": 23,
      "type": "conceptual",
      "topic": "Methods",
      "prompt": "What does `lst.insert(100, 'X')` do if `len(lst) == 3`?",
      "options": [
        "Raises an IndexError",
        "Appends 'X' at the end of the list (index 3)",
        "Pads indices 3 through 99 with None",
        "Raises a ValueError"
      ],
      "answer": 1,
      "explanation": "insert() clips out-of-bounds index values; if idx >= len(lst), it simply appends at the tail."
    },
    {
      "id": 24,
      "type": "conceptual",
      "topic": "Methods",
      "prompt": "What is the return value of `lst.clear()`?",
      "options": [
        "[]",
        "True",
        "None",
        "0"
      ],
      "answer": 2,
      "explanation": "clear() modifies the list in-place and returns None."
    },
    {
      "id": 25,
      "type": "conceptual",
      "topic": "Deduplication",
      "prompt": "How can you remove duplicates from a list while strictly preserving the original element order?",
      "options": [
        "list(set(lst))",
        "list(dict.fromkeys(lst))",
        "lst.dedup()",
        "sorted(lst)"
      ],
      "answer": 1,
      "explanation": "dict.fromkeys(lst) leverages Python 3.7+ dict key insertion order preservation to deduplicate in O(N) time."
    }
  ],
  "interviewQuestions": [
    {
      "q": "How are Python lists implemented in CPython at the systems level?",
      "a": "<p><em>A: In CPython, a list is implemented as a <code>PyListObject</code>, which wraps a dynamically resized, contiguous array of 64-bit pointers (<code>PyObject**</code>). It is NOT a linked list. This design provides $O(1)$ random indexing, $O(1)$ amortized append, and cache locality for pointer addresses.</em></p>"
    },
    {
      "q": "Why is <code>lst.append()</code> amortized $O(1)$ instead of worst-case $O(1)$?",
      "a": "<p><em>A: When a list exhausts its allocated slots, CPython resizes the underlying array by a growth pattern (roughly $9/8$ plus a small constant: 0, 4, 8, 16, 25, 35, 46...). The reallocation and pointer copy take $O(N)$ time, but because resizes occur infrequently, the cost averaged across $N$ appends is strictly $O(1)$.</em></p>"
    },
    {
      "q": "Why does <code>lst.insert(0, x)</code> take $O(N)$ time?",
      "a": "<p><em>A: Because lists are contiguous arrays, inserting at index 0 requires memmoving all existing $N$ pointers one slot to the right in RAM. To achieve $O(1)$ insertions at the head, use <code>collections.deque</code> (a doubly-linked list of blocks).</em></p>"
    },
    {
      "q": "What is the difference between <code>lst.sort()</code> and <code>sorted(lst)</code>?",
      "a": "<p><em>A: <code>lst.sort()</code> reorders the list in-place using Timsort and returns <code>None</code> to prevent accidental chaining. <code>sorted(lst)</code> accepts any iterable, allocates a new list, sorts it, and returns the new list, leaving the original data untouched.</em></p>"
    },
    {
      "q": "Why does <code>[[0] * 3] * 3</code> cause unexpected bugs when mutating <code>grid[0][0] = 1</code>?",
      "a": "<p><em>A: The <code>*</code> operator creates shallow copies of references. <code>[0] * 3</code> creates a single list of ints. But <code>[...] * 3</code> duplicates the reference to that same row list 3 times. Mutating <code>grid[0][0]</code> modifies the shared row, making all 3 rows display <code>1</code>. The fix is <code>[[0] * 3 for _ in range(3)]</code>.</em></p>"
    },
    {
      "q": "What is the difference between a shallow copy and a deep copy?",
      "a": "<p><em>A: A shallow copy (<code>lst.copy()</code> or <code>lst[:]</code>) duplicates only the outer list container; any nested mutable objects inside remain shared references. A deep copy (<code>copy.deepcopy(lst)</code>) recursively copies all nested containers and objects, ensuring total memory isolation.</em></p>"
    },
    {
      "q": "Why should you never mutate a list while iterating over it with a <code>for</code> loop?",
      "a": "<p><em>A: The internal iterator keeps track of index counters. If you delete an item at index $i$, all subsequent items shift left by one, causing the iterator to skip index $i+1$ on the next step. To filter safely, use list comprehensions <code>[x for x in lst if keep(x)]</code> or iterate over a slice copy <code>for x in lst[:]:</code>.</em></p>"
    },
    {
      "q": "Why is a default mutable argument like <code>def add(x, lst=[]):</code> considered an anti-pattern?",
      "a": "<p><em>A: Default arguments are evaluated once when the function is defined, not when it is invoked. That default list instance is shared across all function calls, leading to silent state retention and memory leaks. Always use <code>lst=None</code> and instantiate inside the body.</em></p>"
    },
    {
      "q": "How does Python's Timsort algorithm work and what is its time complexity?",
      "a": "<p><em>A: Timsort is an adaptive, stable hybrid of Merge Sort and Insertion Sort designed by Tim Peters. It identifies naturally occurring sorted sequences ('runs'), extends short runs using binary insertion sort, and merges them using balanced stack criteria. Worst-case is $O(N \\log N)$, best-case on sorted data is $O(N)$, and space complexity is $O(N)$.</em></p>"
    },
    {
      "q": "How can you remove duplicates from a list while preserving the original element order?",
      "a": "<p><em>A: Use <code>list(dict.fromkeys(lst))</code>. Since Python 3.7+, dictionary keys strictly retain insertion order, achieving order-preserving deduplication in $O(N)$ linear time. In contrast, <code>list(set(lst))</code> does not preserve order.</em></p>"
    },
    {
      "q": "What is the difference between <code>lst.extend(iter)</code> and <code>lst += iter</code>?",
      "a": "<p><em>A: For lists, both perform in-place extension and accept any iterable. However, <code>+=</code> invokes <code>__iadd__</code> and re-binds the variable name, whereas <code>extend()</code> is an explicit method. With immutable sequences like tuples, <code>+=</code> creates a new object, whereas with lists it mutates in-place.</em></p>"
    },
    {
      "q": "What is the difference in memory consumption between a list and a tuple of the same size?",
      "a": "<p><em>A: Tuples are immutable and fixed-sized, so CPython allocates exactly enough slots for their elements without extra over-allocation. Lists allocate extra capacity buffers to support amortized $O(1)$ appends, making empty lists consume 56 bytes vs 40 bytes for empty tuples, plus ~12.5% to 50% extra buffer headroom.</em></p>"
    },
    {
      "q": "What does <code>del lst[:]</code> do compared to <code>del lst</code>?",
      "a": "<p><em>A: <code>del lst[:]</code> clears all elements from the list in-place while keeping the list object alive in RAM (equivalent to <code>lst.clear()</code>). In contrast, <code>del lst</code> unbinds the variable name from local scope; any other references pointing to the list still retain their data.</em></p>"
    },
    {
      "q": "How does slice assignment <code>lst[1:3] = [10, 20, 30]</code> work under the hood?",
      "a": "<p><em>A: CPython deletes the 2 existing pointer references from index 1 to 2, resizes the underlying array buffer by +1 to accommodate the 3 replacement elements, shifts subsequent pointers to the right, and copies the 3 new pointers in place.</em></p>"
    },
    {
      "q": "What is the time complexity of <code>x in lst</code> versus <code>x in my_set</code>?",
      "a": "<p><em>A: <code>x in lst</code> takes $O(N)$ linear time because it performs a sequential search from the head of the array to the end. <code>x in my_set</code> takes average $O(1)$ constant time because it computes the hash of <code>x</code> and inspects the hash table bucket directly.</em></p>"
    },
    {
      "q": "What happens when you pass a list to a function and reassign it vs mutate it?",
      "a": "<p><em>A: Python uses pass-by-object-reference. Mutating the list (e.g. <code>arg.append(1)</code> or <code>arg[0] = 9</code>) mutates the caller's object in outer scope. Reassigning the parameter (e.g. <code>arg = [1, 2, 3]</code>) merely binds the local name to a new object, leaving the caller's list unaffected.</em></p>"
    },
    {
      "q": "How do you flatten a 2D matrix <code>grid = [[1, 2], [3, 4]]</code> in a single line?",
      "a": "<p><em>A: Use a nested list comprehension: <code>flat = [item for row in grid for item in row]</code>, or <code>list(itertools.chain.from_iterable(grid))</code> for highest iterator throughput.</em></p>"
    },
    {
      "q": "Why is <code>lst.pop()</code> faster than <code>lst.pop(0)</code>?",
      "a": "<p><em>A: <code>lst.pop()</code> simply decrements the internal size counter <code>ob_size</code> and returns the last pointer, running in $O(1)$ time. <code>lst.pop(0)</code> removes the first pointer and requires <code>memmove</code> to shift all remaining $N-1$ pointers one position to the left, taking $O(N)$ time.</em></p>"
    },
    {
      "q": "Can a list be used as a key in a Python dictionary? Why or why not?",
      "a": "<p><em>A: No. Dictionary keys must be hashable, meaning their hash value must never change over their lifetime. Because lists are mutable, their contents and logical equality can change, so Python does not define <code>__hash__</code> on lists, raising <code>TypeError: unhashable type: 'list'</code>. Use a <code>tuple</code> instead.</em></p>"
    },
    {
      "q": "How does extended unpacking <code>first, *middle, last = lst</code> handle short lists?",
      "a": "<p><em>A: If the list contains fewer than 2 elements, Python raises <code>ValueError: not enough values to unpack</code>. If the list contains exactly 2 elements, <code>first</code> receives the first, <code>last</code> receives the second, and <code>middle</code> evaluates to an empty list <code>[]</code> without throwing any error.</em></p>"
    },
    {
      "q": "What is the difference between <code>[x for x in lst]</code> and <code>(x for x in lst)</code>?",
      "a": "<p><em>A: <code>[...]</code> creates a list comprehension that eagerly evaluates and constructs the entire list in memory ($O(N)$ space). <code>(...)</code> creates a generator expression that lazily yields items on-demand via the iterator protocol ($O(1)$ memory).</em></p>"
    },
    {
      "q": "How does the <code>key=</code> parameter in <code>sort()</code> optimize performance compared to custom comparators?",
      "a": "<p><em>A: The <code>key=</code> function computes a surrogate key value exactly once per element ($O(N)$ function calls) before sorting starts (known as the Schwartzian transform). Older comparison functions evaluated the comparator on every element pair, requiring $O(N \\log N)$ expensive function calls.</em></p>"
    },
    {
      "q": "What is the maximum number of elements a Python list can hold?",
      "a": "<p><em>A: The theoretical maximum is <code>sys.maxsize</code> ($2^{63}-1$ on 64-bit systems, roughly 9.22 quintillion). Practically, it is bound by the machine's available physical RAM and swap space, since each element consumes an 8-byte pointer plus object struct overhead.</em></p>"
    },
    {
      "q": "Why does <code>reversed(lst)</code> return a reverse iterator instead of a list?",
      "a": "<p><em>A: <code>reversed()</code> is a generator/iterator that traverses the sequence backwards using <code>__reversed__</code> or <code>len()</code> and indexing. It runs in $O(1)$ initialization time and $O(1)$ memory, avoiding allocating a duplicate list when you only need to iterate over items once.</em></p>"
    },
    {
      "q": "How do you find the second largest number in a list in $O(N)$ time?",
      "a": "<p><em>A: Maintain two variables <code>first = second = float('-inf')</code>. Loop through the list once: if <code>x &gt; first</code>, set <code>second = first; first = x</code>; else if <code>x &gt; second and x != first</code>, set <code>second = x</code>. This avoids $O(N \\log N)$ sorting.</em></p>"
    }
  ]
};
