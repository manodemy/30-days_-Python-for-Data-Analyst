import os

css_block = """/* ==========================================================================
   WORLD-CLASS 10/10 HEADER & NAVIGATION DESIGN SYSTEM
   Linear & Apple Human Interface Standard - Parity across all 60 pages
   ========================================================================== */

/* ── 1. Desktop & Global Header Architecture ───────────────────────────── */
.header {
  height: 50px !important;
  min-height: 50px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  padding: 0 16px !important;
  background: rgba(10, 15, 29, 0.88) !important;
  backdrop-filter: blur(20px) saturate(180%) !important;
  -webkit-backdrop-filter: blur(20px) saturate(180%) !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25) !important;
  position: relative !important;
  z-index: 50000 !important;
  box-sizing: border-box !important;
  transition: background 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease !important;
}

[data-theme="light"] .header {
  background: rgba(255, 255, 255, 0.94) !important;
  backdrop-filter: blur(20px) saturate(180%) !important;
  -webkit-backdrop-filter: blur(20px) saturate(180%) !important;
  border-bottom: 1px solid #e2e8f0 !important;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04) !important;
}

/* ── 2. Header Left Suite: Back, Profile, Graded Stats ──────────────────── */
.header-left {
  display: flex !important;
  align-items: center !important;
  gap: 8px !important;
  flex-shrink: 0 !important;
}

.header-left .back-to-home-btn {
  width: 32px !important;
  height: 32px !important;
  border-radius: 8px !important;
  background: rgba(255, 255, 255, 0.05) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  color: #94a3b8 !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  transition: all 0.15s ease !important;
  text-decoration: none !important;
  cursor: pointer !important;
}

.header-left .back-to-home-btn:hover {
  background: rgba(255, 255, 255, 0.1) !important;
  color: #f8fafc !important;
  transform: translateY(-1px) !important;
}

[data-theme="light"] .header-left .back-to-home-btn {
  background: #ffffff !important;
  border: 1px solid #cbd5e1 !important;
  color: #475569 !important;
}

[data-theme="light"] .header-left .back-to-home-btn:hover {
  background: #f1f5f9 !important;
  color: #0f172a !important;
}

.header-left .user-profile {
  position: relative !important;
  width: 30px !important;
  height: 30px !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  flex-shrink: 0 !important;
}

.header-left .user-profile .avatar-img {
  width: 30px !important;
  height: 30px !important;
  border-radius: 50% !important;
  object-fit: cover !important;
  border: 1.5px solid rgba(255, 255, 255, 0.15) !important;
  background-color: rgba(255, 255, 255, 0.06) !important;
}

[data-theme="light"] .header-left .user-profile .avatar-img {
  border-color: #cbd5e1 !important;
  background-color: #f1f5f9 !important;
}

.header-left .user-profile .active-dot {
  position: absolute !important;
  bottom: 0 !important;
  right: 0 !important;
  width: 8px !important;
  height: 8px !important;
  border-radius: 50% !important;
  background: #10b981 !important;
  border: 1.5px solid #0a0f1d !important;
  box-shadow: 0 0 6px rgba(16, 185, 129, 0.6) !important;
}

[data-theme="light"] .header-left .user-profile .active-dot {
  border-color: #ffffff !important;
}

/* Graded Stats Badges (Zero Light Mode Contrast Collision) */
.stats-card {
  background: transparent !important;
  border: none !important;
  padding: 0 !important;
  display: inline-flex !important;
  align-items: center !important;
  height: 28px !important;
  box-shadow: none !important;
  flex-shrink: 0 !important;
}

.stats-row {
  display: inline-flex !important;
  align-items: center !important;
  gap: 6px !important;
}

.stats-item {
  display: inline-flex !important;
  flex-direction: row !important;
  align-items: stretch !important;
  gap: 0 !important;
  height: 26px !important;
  border-radius: 6px !important;
  overflow: hidden !important;
  filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.15)) !important;
}

.stats-label {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  padding: 0 7px !important;
  font-size: 8.5px !important;
  font-weight: 800 !important;
  letter-spacing: 0.05em !important;
  text-transform: uppercase !important;
  line-height: 1 !important;
  margin: 0 !important;
  border-radius: 6px 0 0 6px !important;
  background: #1e293b !important;
  border: 1px solid rgba(255, 255, 255, 0.12) !important;
  border-right: none !important;
  color: #94a3b8 !important;
}

[data-theme="light"] .stats-label {
  background: #f1f5f9 !important;
  border: 1px solid #cbd5e1 !important;
  border-right: none !important;
  color: #475569 !important;
}

.stats-value--fraction {
  display: inline-flex !important;
  flex-direction: row !important;
  align-items: center !important;
  justify-content: center !important;
  padding: 0 7px !important;
  gap: 1px !important;
  line-height: 1 !important;
  border-radius: 0 6px 6px 0 !important;
  font-family: var(--font-mono, monospace) !important;
}

/* Solved fraction color */
.stats-item:first-child .stats-value--fraction {
  background: rgba(14, 165, 233, 0.15) !important;
  border: 1px solid rgba(14, 165, 233, 0.3) !important;
  border-left: none !important;
}

.stats-item:first-child .stats-value--fraction .stats-num {
  font-size: 11px !important;
  font-weight: 800 !important;
  color: #38bdf8 !important;
}

.stats-item:first-child .stats-value--fraction .stats-den {
  font-size: 9px !important;
  font-weight: 600 !important;
  color: #94a3b8 !important;
}

[data-theme="light"] .stats-item:first-child .stats-value--fraction {
  background: #e0f2fe !important;
  border: 1px solid #bae6fd !important;
  border-left: none !important;
}

[data-theme="light"] .stats-item:first-child .stats-value--fraction .stats-num {
  color: #0284c7 !important;
}

[data-theme="light"] .stats-item:first-child .stats-value--fraction .stats-den {
  color: #64748b !important;
}

/* Marks fraction color */
.stats-item:last-child .stats-value--fraction,
.stats-item:nth-child(3) .stats-value--fraction {
  background: rgba(168, 85, 247, 0.15) !important;
  border: 1px solid rgba(168, 85, 247, 0.3) !important;
  border-left: none !important;
}

.stats-item:last-child .stats-value--fraction .stats-num,
.stats-item:nth-child(3) .stats-value--fraction .stats-num {
  font-size: 11px !important;
  font-weight: 800 !important;
  color: #c084fc !important;
}

.stats-item:last-child .stats-value--fraction .stats-den,
.stats-item:nth-child(3) .stats-value--fraction .stats-den {
  font-size: 9px !important;
  font-weight: 600 !important;
  color: #94a3b8 !important;
}

[data-theme="light"] .stats-item:last-child .stats-value--fraction,
[data-theme="light"] .stats-item:nth-child(3) .stats-value--fraction {
  background: #ede9fe !important;
  border: 1px solid #ddd6fe !important;
  border-left: none !important;
}

[data-theme="light"] .stats-item:last-child .stats-value--fraction .stats-num,
[data-theme="light"] .stats-item:nth-child(3) .stats-value--fraction .stats-num {
  color: #7c3aed !important;
}

[data-theme="light"] .stats-item:last-child .stats-value--fraction .stats-den,
[data-theme="light"] .stats-item:nth-child(3) .stats-value--fraction .stats-den {
  color: #64748b !important;
}

.stats-divider {
  display: none !important;
}

.stats-progress-bar {
  display: none !important;
}

/* ── 3. Header Center: Unified Day Stepper Capsule & Topic Breadcrumb ──── */
.header-center {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  overflow: visible !important;
}

.day-navigation {
  display: inline-flex !important;
  align-items: center !important;
  gap: 0 !important;
  overflow: visible !important;
  position: relative !important;
}

/* Fused Stepper Arrow: Prev */
.day-nav-arrow-btn--prev {
  order: 1 !important;
  height: 32px !important;
  width: 28px !important;
  min-width: 28px !important;
  border-radius: 8px 0 0 8px !important;
  border-right: none !important;
  background: rgba(255, 255, 255, 0.05) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  color: #94a3b8 !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  cursor: pointer !important;
  transition: all 0.15s ease !important;
  margin: 0 !important;
}

/* Fused Stepper Day Selector Pill */
.day-picker-pill:not(.topic-picker-pill) {
  order: 2 !important;
  height: 32px !important;
  border-radius: 0 !important;
  border-left: 1px solid rgba(255, 255, 255, 0.08) !important;
  border-right: 1px solid rgba(255, 255, 255, 0.08) !important;
  border-top: 1px solid rgba(255, 255, 255, 0.1) !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
  background: rgba(255, 255, 255, 0.05) !important;
  padding: 0 10px !important;
  display: inline-flex !important;
  align-items: center !important;
  gap: 6px !important;
  cursor: pointer !important;
  transition: all 0.15s ease !important;
  margin: 0 !important;
  font-weight: 700 !important;
  font-size: 12px !important;
  color: #f1f5f9 !important;
}

/* Fused Stepper Arrow: Next */
.day-nav-arrow-btn--next {
  order: 3 !important;
  height: 32px !important;
  width: 28px !important;
  min-width: 28px !important;
  border-radius: 0 8px 8px 0 !important;
  border-left: none !important;
  background: rgba(255, 255, 255, 0.05) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  color: #94a3b8 !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  cursor: pointer !important;
  transition: all 0.15s ease !important;
  margin: 0 8px 0 0 !important; /* Space between stepper capsule and topic breadcrumb */
}

/* Stepper Hover States (Dark Mode Default) */
.day-nav-arrow-btn--prev:hover,
.day-nav-arrow-btn--next:hover,
.day-picker-pill:not(.topic-picker-pill):hover {
  background: rgba(255, 255, 255, 0.1) !important;
  color: #ffffff !important;
}

/* Light Mode Overrides for Stepper */
[data-theme="light"] .day-nav-arrow-btn--prev {
  background: #ffffff !important;
  border: 1px solid #cbd5e1 !important;
  border-right: none !important;
  color: #475569 !important;
}

[data-theme="light"] .day-picker-pill:not(.topic-picker-pill) {
  background: #ffffff !important;
  border-top: 1px solid #cbd5e1 !important;
  border-bottom: 1px solid #cbd5e1 !important;
  border-left: 1px solid #e2e8f0 !important;
  border-right: 1px solid #e2e8f0 !important;
  color: #0f172a !important;
}

[data-theme="light"] .day-nav-arrow-btn--next {
  background: #ffffff !important;
  border: 1px solid #cbd5e1 !important;
  border-left: none !important;
  color: #475569 !important;
}

[data-theme="light"] .day-nav-arrow-btn--prev:hover,
[data-theme="light"] .day-nav-arrow-btn--next:hover,
[data-theme="light"] .day-picker-pill:not(.topic-picker-pill):hover {
  background: #f1f5f9 !important;
  color: #0f172a !important;
}

/* Topic Breadcrumb Pill */
.day-picker-pill.topic-picker-pill {
  order: 4 !important;
  height: 32px !important;
  border-radius: 8px !important;
  background: rgba(255, 255, 255, 0.04) !important;
  border: 1px solid rgba(255, 255, 255, 0.08) !important;
  padding: 0 12px !important;
  display: inline-flex !important;
  align-items: center !important;
  gap: 8px !important;
  max-width: 380px !important;
  overflow: hidden !important;
  margin: 0 !important;
}

[data-theme="light"] .day-picker-pill.topic-picker-pill {
  background: #ffffff !important;
  border: 1px solid #cbd5e1 !important;
}

.topic-picker-pill .trigger-title {
  white-space: nowrap !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  font-size: 12px !important;
  font-weight: 600 !important;
  color: #e2e8f0 !important;
}

[data-theme="light"] .topic-picker-pill .trigger-title {
  color: #0f172a !important;
}

.topic-duration-badge {
  background: rgba(56, 189, 248, 0.15) !important;
  color: #38bdf8 !important;
  border: 1px solid rgba(56, 189, 248, 0.3) !important;
  border-radius: 4px !important;
  padding: 1px 6px !important;
  font-size: 10px !important;
  font-weight: 700 !important;
  font-family: var(--font-mono, monospace) !important;
  flex-shrink: 0 !important;
}

[data-theme="light"] .topic-duration-badge {
  background: #e0f2fe !important;
  color: #0284c7 !important;
  border: 1px solid #bae6fd !important;
}

/* ── 4. Header Right Suite: Actions & Achievement ──────────────────────── */
.header-right {
  display: flex !important;
  align-items: center !important;
  justify-content: flex-end !important;
  gap: 8px !important;
  flex-shrink: 0 !important;
}

/* Theme Toggle Button */
.theme-toggle-btn {
  height: 28px !important;
  width: 50px !important;
  padding: 0 !important;
  border-radius: 9999px !important;
  background: rgba(255, 255, 255, 0.08) !important;
  border: 1px solid rgba(255, 255, 255, 0.15) !important;
  display: inline-flex !important;
  align-items: center !important;
  position: relative !important;
  cursor: pointer !important;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

[data-theme="light"] .theme-toggle-btn {
  background: #e2e8f0 !important;
  border-color: #cbd5e1 !important;
}

.theme-switch-thumb {
  width: 22px !important;
  height: 22px !important;
  border-radius: 50% !important;
  position: absolute !important;
  top: 2px !important;
  left: 2px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

[data-theme="light"] .theme-switch-thumb {
  transform: translateX(22px) !important;
}

/* Take Test CTA Button */
.hdr-btn--test {
  height: 32px !important;
  padding: 0 14px !important;
  border-radius: 8px !important;
  font-size: 12px !important;
  font-weight: 700 !important;
  letter-spacing: 0.01em !important;
  background: linear-gradient(135deg, #2563eb, #1d4ed8) !important;
  color: #ffffff !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2) !important;
  transition: all 0.18s cubic-bezier(0.16, 1, 0.3, 1) !important;
  display: inline-flex !important;
  align-items: center !important;
  gap: 5px !important;
  cursor: pointer !important;
  text-decoration: none !important;
}

.hdr-btn--test:hover {
  transform: translateY(-1px) !important;
  box-shadow: 0 4px 14px rgba(37, 99, 235, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.3) !important;
}

.hdr-btn--test:active {
  transform: translateY(0) scale(0.98) !important;
}

/* Score Card Button */
.hdr-btn--score {
  height: 32px !important;
  padding: 0 12px !important;
  border-radius: 8px !important;
  font-size: 12px !important;
  font-weight: 600 !important;
  background: rgba(255, 255, 255, 0.05) !important;
  color: #cbd5e1 !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  display: inline-flex !important;
  align-items: center !important;
  gap: 6px !important;
  transition: all 0.18s ease !important;
  cursor: pointer !important;
  text-decoration: none !important;
}

[data-theme="light"] .hdr-btn--score {
  background: #ffffff !important;
  border-color: #cbd5e1 !important;
  color: #334155 !important;
}

.hdr-btn--score:hover {
  background: rgba(255, 255, 255, 0.1) !important;
  color: #ffffff !important;
}

[data-theme="light"] .hdr-btn--score:hover {
  background: #e2e8f0 !important;
  color: #0f172a !important;
}

/* Header Trophy Overall Score */
.header-overall-score {
  height: 32px !important;
  padding: 0 10px !important;
  border-radius: 9999px !important;
  background: rgba(245, 158, 11, 0.1) !important;
  border: 1px solid rgba(245, 158, 11, 0.28) !important;
  color: #fbbf24 !important;
  font-size: 11.5px !important;
  font-weight: 700 !important;
  display: inline-flex !important;
  align-items: center !important;
  gap: 6px !important;
  cursor: pointer !important;
  transition: all 0.18s ease !important;
}

[data-theme="light"] .header-overall-score {
  background: rgba(245, 158, 11, 0.12) !important;
  border-color: rgba(245, 158, 11, 0.35) !important;
  color: #b45309 !important;
}

/* ── 5. Responsive Mobile Suite (≤ 768px) ────────────────────────────────── */
@media (max-width: 768px) {
  .header {
    display: grid !important;
    grid-template-areas: 
      "left right"
      "center center" !important;
    grid-template-columns: 1fr auto !important;
    gap: 6px 8px !important;
    padding: 6px 10px !important;
    height: auto !important;
    min-height: auto !important;
    overflow: visible !important;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
  }

  [data-theme="light"] .header {
    border-bottom: 1px solid #e2e8f0 !important;
  }

  /* Row 1 Left: Home, Avatar, Compact Solved Badge */
  .header-left {
    grid-area: left !important;
    display: flex !important;
    align-items: center !important;
    gap: 6px !important;
    min-width: 0 !important;
    overflow: hidden !important;
  }
  .header-left .back-to-home-btn {
    width: 26px !important;
    height: 26px !important;
    border-radius: 6px !important;
    flex-shrink: 0 !important;
  }
  .header-left .back-to-home-btn svg {
    width: 14px !important;
    height: 14px !important;
  }
  .header-left .user-profile {
    width: 24px !important;
    height: 24px !important;
    flex-shrink: 0 !important;
  }
  .header-left .user-profile .avatar-img {
    width: 24px !important;
    height: 24px !important;
  }
  .header-left .user-profile .active-dot {
    width: 6px !important;
    height: 6px !important;
  }

  .stats-card {
    height: 24px !important;
    padding: 0 !important;
    gap: 0 !important;
    flex-shrink: 0 !important;
  }
  .stats-row {
    gap: 4px !important;
  }
  .stats-item {
    height: 22px !important;
  }
  .stats-label {
    padding: 0 5px !important;
    font-size: 7.5px !important;
  }
  .stats-value--fraction {
    padding: 0 5px !important;
  }
  .stats-num {
    font-size: 9.5px !important;
  }
  .stats-den {
    font-size: 8px !important;
  }

  /* Row 1 Right: Theme Toggle, Take Test, Score Card */
  .header-right {
    grid-area: right !important;
    display: flex !important;
    align-items: center !important;
    justify-content: flex-end !important;
    gap: 5px !important;
    flex-shrink: 0 !important;
  }
  .theme-toggle-btn {
    width: 36px !important;
    height: 22px !important;
    padding: 0 !important;
    flex-shrink: 0 !important;
    margin: 0 !important;
  }
  .theme-switch-thumb {
    width: 16px !important;
    height: 16px !important;
    top: 2px !important;
    left: 2px !important;
  }
  [data-theme="light"] .theme-switch-thumb {
    transform: translateX(14px) !important;
  }

  .hdr-btn--test {
    height: 24px !important;
    padding: 0 8px !important;
    font-size: 11px !important;
    border-radius: 6px !important;
  }
  .hdr-btn--score {
    height: 24px !important;
    padding: 0 7px !important;
    font-size: 11px !important;
    border-radius: 6px !important;
  }
  .hdr-btn--score svg {
    width: 11px !important;
    height: 11px !important;
    margin-right: 2px !important;
  }
  .header-overall-score {
    display: none !important;
  }

  /* Row 2: Unified Day Capsule (< | Day XX | >) + Fluid Topic Breadcrumb */
  .header-center {
    grid-area: center !important;
    width: 100% !important;
    display: flex !important;
    overflow: visible !important;
  }
  .day-navigation {
    width: 100% !important;
    display: flex !important;
    align-items: center !important;
    gap: 0 !important;
    overflow: visible !important;
  }

  .day-nav-arrow-btn--prev {
    height: 28px !important;
    width: 24px !important;
    min-width: 24px !important;
    border-radius: 6px 0 0 6px !important;
    margin: 0 !important;
  }
  .day-picker-pill:not(.topic-picker-pill) {
    height: 28px !important;
    padding: 0 6px !important;
    font-size: 11px !important;
    margin: 0 !important;
  }
  .day-picker-pill:not(.topic-picker-pill) .selected-text svg,
  .day-picker-pill:not(.topic-picker-pill) .track-icon-wrap svg {
    width: 14px !important;
    height: 14px !important;
  }
  .day-nav-arrow-btn--next {
    height: 28px !important;
    width: 24px !important;
    min-width: 24px !important;
    border-radius: 0 6px 6px 0 !important;
    margin: 0 6px 0 0 !important;
  }

  .day-picker-pill.topic-picker-pill {
    flex: 1 1 0% !important;
    min-width: 0 !important;
    max-width: none !important;
    height: 28px !important;
    padding: 0 8px !important;
    border-radius: 6px !important;
    display: flex !important;
    align-items: center !important;
    margin: 0 !important;
  }
  .topic-picker-pill .trigger-title {
    font-size: 11px !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
  }
  .topic-duration-badge {
    display: none !important;
  }
}

/* Narrow mobile screens (≤ 480px): Hide MARKS fraction so SOLVED fits smoothly */
@media (max-width: 480px) {
  .stats-card .stats-item:last-child,
  .stats-card .stats-item:nth-child(3),
  .stats-card .stats-divider {
    display: none !important;
  }
}
"""

targets = [
    'excel/styles.css',
    'public/excel/styles.css',
    'python/styles.css',
    'public/python/styles.css',
    'public/Version-3/styles.css'
]

marker = '/* ==========================================================================\n   WORLD-CLASS 10/10 HEADER & NAVIGATION DESIGN SYSTEM'

for path in targets:
    if not os.path.exists(path):
        print(f"File not found: {path}")
        continue
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    idx = content.find(marker)
    if idx == -1:
        print(f"Marker not found in {path}")
        continue
    new_content = content[:idx] + css_block.strip() + '\n'
    with open(path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"Updated {path} successfully ({len(new_content)} bytes)")
