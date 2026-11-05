# Script to append the 10/10 Home & Curriculum UI/UX upgrades to landing_v2/styles.css and public/landing_v2/styles.css

UPGRADE_CSS = '''

/* ══════════════════════════════════════════════════════════════════════════
   WORLD-CLASS 10/10 HOME & CURRICULUM DESIGN SYSTEM
   Refined Typography, Apple-Grade Squircles, Dynamic Milestones & Visual Hierarchy
   ══════════════════════════════════════════════════════════════════════════ */

.curriculum-grid {
  display: grid !important;
  grid-template-columns: repeat(6, 1fr) !important;
  gap: 14px !important;
}

@media (max-width: 1200px) {
  .curriculum-grid {
    grid-template-columns: repeat(4, 1fr) !important;
    gap: 12px !important;
  }
}

@media (max-width: 860px) {
  .curriculum-grid {
    grid-template-columns: repeat(3, 1fr) !important;
    gap: 10px !important;
  }
}

@media (max-width: 580px) {
  .curriculum-grid {
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 10px !important;
  }
}

/* ── World-Class Day Card Container ── */
.day-card {
  background: #ffffff !important;
  border: 1px solid rgba(226, 232, 240, 0.85) !important;
  border-radius: 16px !important;
  padding: 14px 12px 14px 12px !important;
  display: flex !important;
  flex-direction: column !important;
  position: relative !important;
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.04), 0 4px 12px rgba(15, 23, 42, 0.02) !important;
  transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1) !important;
  cursor: pointer !important;
  text-decoration: none !important;
  box-sizing: border-box !important;
  min-height: 126px !important;
  justify-content: space-between !important;
}

.day-card:hover {
  transform: translateY(-3px) !important;
  border-color: rgba(5, 150, 105, 0.38) !important;
  background: #ffffff !important;
  box-shadow: 0 10px 24px rgba(5, 150, 105, 0.08), 0 2px 6px rgba(15, 23, 42, 0.04) !important;
}

.day-card:active {
  transform: scale(0.98) !important;
}

/* ── Day Number Pill ── */
.day-num {
  font-family: var(--font-display, 'Plus Jakarta Sans', sans-serif) !important;
  font-size: 11px !important;
  font-weight: 850 !important;
  letter-spacing: 0.05em !important;
  text-transform: uppercase !important;
  line-height: 1 !important;
  margin-bottom: 8px !important;
  display: block !important;
}

/* ── Squircle Icon Enclosure ── */
.day-emoji {
  width: 36px !important;
  height: 36px !important;
  border-radius: 10px !important;
  background: #f8fafc !important;
  border: 1px solid rgba(226, 232, 240, 0.75) !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  font-size: 19px !important;
  line-height: 1 !important;
  margin-bottom: 8px !important;
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.03) !important;
  transition: transform 0.2s ease !important;
  flex-shrink: 0 !important;
}

.day-card:hover .day-emoji {
  transform: scale(1.08) !important;
  background: #f0fdf4 !important;
  border-color: rgba(5, 150, 105, 0.2) !important;
}

.day-emoji .tech-logo {
  width: 22px !important;
  height: 22px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

/* ── Day Title Typography ── */
.day-title {
  font-family: var(--font-display, 'Plus Jakarta Sans', sans-serif) !important;
  font-weight: 750 !important;
  font-size: 12.5px !important;
  color: #0f172a !important;
  line-height: 1.35 !important;
  letter-spacing: -0.015em !important;
  display: -webkit-box !important;
  -webkit-line-clamp: 2 !important;
  -webkit-box-orient: vertical !important;
  overflow: hidden !important;
  flex-grow: 1 !important;
  margin-top: 2px !important;
}

/* ── Capsule Badges ── */
.day-badge {
  position: absolute !important;
  top: 10px !important;
  right: 10px !important;
  font-family: var(--font-display, 'Plus Jakarta Sans', sans-serif) !important;
  font-size: 9px !important;
  font-weight: 850 !important;
  letter-spacing: 0.05em !important;
  padding: 2.5px 7px !important;
  border-radius: 9999px !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  line-height: 1 !important;
  text-transform: uppercase !important;
  box-sizing: border-box !important;
}

.day-badge.badge-free {
  background: #ecfdf5 !important;
  color: #059669 !important;
  border: 1px solid rgba(16, 185, 129, 0.28) !important;
}

/* Milestone badges */
.day-card[data-day="18"] .day-badge,
.day-card[data-day="12"] .day-badge,
.day-card[data-day="30"] .day-badge {
  background: #fffbeb !important;
  color: #d97706 !important;
  border: 1px solid rgba(217, 119, 6, 0.28) !important;
}

/* ── Mobile Polish ── */
@media (max-width: 580px) {
  .day-card {
    min-height: 118px !important;
    padding: 12px 10px !important;
    border-radius: 14px !important;
  }

  .day-emoji {
    width: 32px !important;
    height: 32px !important;
    font-size: 17px !important;
    border-radius: 8px !important;
    margin-bottom: 6px !important;
  }

  .day-title {
    font-size: 12px !important;
    line-height: 1.3 !important;
  }

  .day-num {
    font-size: 10.5px !important;
    margin-bottom: 6px !important;
  }

  .day-badge {
    top: 8px !important;
    right: 8px !important;
    font-size: 8.5px !important;
    padding: 2px 6px !important;
  }
}
'''

for css_file in ['landing_v2/styles.css', 'public/landing_v2/styles.css']:
    with open(css_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Append the upgrade
    content = content + UPGRADE_CSS
    with open(css_file, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Appended 10/10 upgrade CSS to {css_file}")
