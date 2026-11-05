import sys

css_rules = """
/* ==========================================================================
   MULTI-TRACK DAY SELECTOR DROPDOWN (100% EXCEL & SQL ARCHITECTURE PARITY)
   Python first, then SQL, then Excel — Dark Obsidian Glassmorphism
   ========================================================================== */
@keyframes dropdownMenuFadeIn {
  from {
    opacity: 0;
    transform: translateY(-6px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.day-picker-pill .custom-select-options,
.custom-select-options.day-select-options-menu {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  min-width: 340px;
  max-width: min(420px, calc(100vw - 24px));
  max-height: 420px;
  overflow-y: auto;
  background: rgba(8, 14, 28, 0.98) !important;
  backdrop-filter: blur(24px) saturate(200%) !important;
  -webkit-backdrop-filter: blur(24px) saturate(200%) !important;
  border: 1px solid rgba(255, 255, 255, 0.12) !important;
  border-radius: 16px !important;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.75), 0 0 0 1px rgba(255, 255, 255, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.08) !important;
  padding: 8px 6px !important;
  z-index: 100000 !important;
  box-sizing: border-box !important;
}

.day-picker-pill .custom-select-options.open,
.custom-select-options.day-select-options-menu.open {
  display: flex !important;
  animation: dropdownMenuFadeIn 0.18s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.day-picker-pill .custom-select-options::-webkit-scrollbar,
.custom-select-options.day-select-options-menu::-webkit-scrollbar {
  width: 5px;
}
.day-picker-pill .custom-select-options::-webkit-scrollbar-track,
.custom-select-options.day-select-options-menu::-webkit-scrollbar-track {
  background: transparent;
}
.day-picker-pill .custom-select-options::-webkit-scrollbar-thumb,
.custom-select-options.day-select-options-menu::-webkit-scrollbar-thumb {
  background: rgba(56, 189, 248, 0.4);
  border-radius: 4px;
}
.day-picker-pill .custom-select-options::-webkit-scrollbar-thumb:hover,
.custom-select-options.day-select-options-menu::-webkit-scrollbar-thumb:hover {
  background: #38bdf8;
}

.day-picker-pill .dropdown-section-header,
.custom-select-options.day-select-options-menu .dropdown-section-header {
  padding: 8px 12px 5px 12px !important;
  font-size: 0.68rem !important;
  font-weight: 800 !important;
  color: #94a3b8 !important;
  letter-spacing: 0.05em !important;
  text-transform: uppercase !important;
  background: transparent !important;
  border-top: 1px solid rgba(255, 255, 255, 0.08) !important;
  border-bottom: none !important;
  margin-top: 6px !important;
  margin-bottom: 2px !important;
  pointer-events: none !important;
  user-select: none !important;
}

.day-picker-pill .dropdown-section-header:first-child,
.custom-select-options.day-select-options-menu .dropdown-section-header:first-child {
  border-top: none !important;
  margin-top: 0 !important;
}

.day-picker-pill .custom-select-option,
.custom-select-options.day-select-options-menu .custom-select-option {
  padding: 8px 12px !important;
  font-size: 0.8rem !important;
  font-weight: 500 !important;
  color: #cbd5e1 !important;
  border-radius: 10px !important;
  margin: 2px 0 !important;
  cursor: pointer !important;
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  transition: all 0.15s ease !important;
  white-space: nowrap !important;
  border: 1px solid transparent !important;
  text-align: left !important;
  box-sizing: border-box !important;
}

.day-picker-pill .custom-select-option:hover,
.custom-select-options.day-select-options-menu .custom-select-option:hover {
  background: rgba(255, 255, 255, 0.06) !important;
  color: #ffffff !important;
}

.day-picker-pill .custom-select-option.selected,
.custom-select-options.day-select-options-menu .custom-select-option.selected {
  background: rgba(56, 189, 248, 0.12) !important;
  border-color: rgba(56, 189, 248, 0.25) !important;
  color: #ffffff !important;
  font-weight: 600 !important;
}

.day-picker-pill .custom-select-option.selected::before,
.custom-select-options.day-select-options-menu .custom-select-option.selected::before {
  display: none !important;
}

.day-picker-pill .option-day-tag,
.custom-select-options.day-select-options-menu .option-day-tag {
  display: inline-flex !important;
  align-items: center !important;
  gap: 8px !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  flex: 1 !important;
}

.day-picker-pill .option-day-tag strong,
.custom-select-options.day-select-options-menu .option-day-tag strong {
  color: #f8fafc !important;
  font-weight: 700 !important;
  font-size: 0.8rem !important;
}

.day-picker-pill .custom-select-option.selected .option-day-tag strong,
.custom-select-options.day-select-options-menu .custom-select-option.selected .option-day-tag strong {
  color: #38bdf8 !important;
}

.day-picker-pill .option-day-tag .option-day-title,
.custom-select-options.day-select-options-menu .option-day-tag .option-day-title {
  color: #94a3b8 !important;
  font-size: 0.72rem !important;
  font-weight: 400 !important;
  overflow: hidden !important;
  text-overflow: ellipsis !important;
  white-space: nowrap !important;
}

.day-picker-pill .custom-select-option:hover .option-day-title,
.day-picker-pill .custom-select-option.selected .option-day-title,
.custom-select-options.day-select-options-menu .custom-select-option:hover .option-day-title,
.custom-select-options.day-select-options-menu .custom-select-option.selected .option-day-title {
  color: #e2e8f0 !important;
}

.day-picker-pill .day-free-badge,
.custom-select-options.day-select-options-menu .day-free-badge {
  background: rgba(16, 185, 129, 0.15) !important;
  color: #34d399 !important;
  border: 1px solid rgba(16, 185, 129, 0.35) !important;
  font-size: 0.65rem !important;
  font-weight: 800 !important;
  border-radius: 4px !important;
  padding: 1px 6px !important;
  letter-spacing: 0.5px !important;
  flex-shrink: 0 !important;
}

.day-picker-pill .day-coming-soon-badge,
.custom-select-options.day-select-options-menu .day-coming-soon-badge {
  background: rgba(56, 189, 248, 0.12) !important;
  color: #38bdf8 !important;
  border: 1px solid rgba(56, 189, 248, 0.3) !important;
  font-size: 0.65rem !important;
  font-weight: 700 !important;
  border-radius: 4px !important;
  padding: 1px 6px !important;
  letter-spacing: 0.5px !important;
  flex-shrink: 0 !important;
}

.day-picker-pill .day-lock-badge,
.custom-select-options.day-select-options-menu .day-lock-badge {
  background: rgba(245, 158, 11, 0.12) !important;
  color: #f59e0b !important;
  border: 1px solid rgba(245, 158, 11, 0.28) !important;
  font-size: 0.65rem !important;
  font-weight: 700 !important;
  border-radius: 4px !important;
  padding: 1px 6px !important;
  flex-shrink: 0 !important;
}
"""

for p in ['python/styles.css', 'public/python/styles.css']:
    with open(p, 'r', encoding='utf-8') as f:
        existing = f.read()
    if 'MULTI-TRACK DAY SELECTOR DROPDOWN' not in existing:
        with open(p, 'a', encoding='utf-8') as f:
            f.write(css_rules)

print("CSS appended to both python and public/python styles.css.")
