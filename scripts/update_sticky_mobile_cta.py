import os
import re

# 1. Update HTML in landing_v2/index.html & public/landing_v2/index.html
html_pattern = re.compile(
    r'<!-- Sticky Mobile CTA Bar -->\s*<div class="sticky-mobile-cta" id="stickyMobileCta">.*?</div>\s*</div>\s*</div>\s*</div>',
    re.DOTALL
)

new_html = '''<!-- Sticky Mobile CTA Bar -->
<div class="sticky-mobile-cta" id="stickyMobileCta">
<div class="mobile-cta-inner">
<div class="mobile-cta-info">
<span class="mobile-cta-badge">⚡ FULL 60-DAY COURSE</span>
<div class="mobile-cta-price-row">
<span class="m-price" id="mPriceNow">₹1,999</span>
<span class="m-price-old" id="mPriceOld">₹4,999</span>
<span class="m-discount-pill dynamic-discount" id="mDiscountPill">60% OFF</span>
</div>
</div>
<div class="mobile-cta-action">
<div class="mobile-cta-btns-wrap">
<a class="btn-mobile-cta-secondary" href="/sql/day01.html">Try Free</a>
<a class="btn-mobile-cta-primary" data-cta="buy" data-tier="selfpaced" href="#pricing" id="stickyEnrollBtn">Enroll Now 🚀</a>
</div>
</div>
</div>
</div>'''

for html_path in ['landing_v2/index.html', 'public/landing_v2/index.html']:
    if os.path.exists(html_path):
        with open(html_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        match = html_pattern.search(content)
        if match:
            content = content[:match.start()] + new_html + content[match.end():]
            with open(html_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Updated HTML in {html_path}")
        else:
            print(f"Could not find exact regex match in {html_path}")

# 2. Update CSS in landing_v2/styles.css & public/landing_v2/styles.css
css_block_pattern = re.compile(
    r'/\* ══════════════ FIXED EDGE-TO-EDGE MOBILE STICKY BOTTOM BAR ══════════════ \*/.*?/\* ══════════════ UI/UX NAV PLAY BUTTON & AUDIO MODAL ══════════════ \*/',
    re.DOTALL
)

new_css = '''/* ══════════════ FIXED EDGE-TO-EDGE MOBILE STICKY BOTTOM BAR ══════════════ */
@media (min-width: 769px) {
  .sticky-mobile-cta {
    display: none !important;
  }
}

@media (max-width: 768px) {
  .sticky-mobile-cta {
    display: block !important;
    position: fixed !important;
    bottom: 0 !important;
    left: 0 !important;
    right: 0 !important;
    width: 100% !important;
    max-width: 100% !important;
    margin: 0 !important;
    z-index: 1000 !important;
    background: rgba(255, 255, 255, 0.96) !important;
    backdrop-filter: blur(20px) saturate(180%) !important;
    -webkit-backdrop-filter: blur(20px) saturate(180%) !important;
    border-top: 1px solid rgba(226, 232, 240, 0.85) !important;
    box-shadow: 0 -4px 20px rgba(15, 23, 42, 0.08), 0 -1px 3px rgba(15, 23, 42, 0.04) !important;
    padding: 8px 14px !important;
    padding-bottom: max(8px, env(safe-area-inset-bottom)) !important;
    box-sizing: border-box !important;
    border-radius: 0 !important;
  }

  .mobile-cta-inner {
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
    max-width: 540px !important;
    margin: 0 auto !important;
    gap: 8px !important;
    box-sizing: border-box !important;
  }

  .mobile-cta-info {
    display: flex !important;
    flex-direction: column !important;
    justify-content: center !important;
    gap: 2px !important;
    min-width: 0 !important;
    flex: 1 1 auto !important;
  }

  .mobile-cta-badge {
    display: inline-flex !important;
    align-items: center !important;
    gap: 3px !important;
    font-size: 9.5px !important;
    font-weight: 800 !important;
    color: #059669 !important;
    letter-spacing: 0.05em !important;
    font-family: var(--font-display, 'Plus Jakarta Sans', sans-serif) !important;
    line-height: 1 !important;
    text-transform: uppercase !important;
    white-space: nowrap !important;
  }

  .mobile-cta-price-row {
    display: flex !important;
    align-items: baseline !important;
    gap: 6px !important;
    flex-wrap: nowrap !important;
    line-height: 1 !important;
    white-space: nowrap !important;
  }

  .mobile-cta-price-row .m-price {
    font-family: var(--font-display, 'Plus Jakarta Sans', sans-serif) !important;
    font-weight: 950 !important;
    font-size: 20px !important;
    color: #0f172a !important;
    letter-spacing: -0.02em !important;
    line-height: 1 !important;
    white-space: nowrap !important;
  }

  /* Keep mobile sticky bottom clean and uncluttered: hide strikethrough old price on all mobile viewports */
  .mobile-cta-price-row .m-price-old {
    display: none !important;
  }

  .mobile-cta-price-row .m-discount-pill {
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    font-size: 9.5px !important;
    font-weight: 800 !important;
    background: #ecfdf5 !important;
    color: #059669 !important;
    border: 1px solid rgba(16, 185, 129, 0.3) !important;
    padding: 2.5px 7px !important;
    border-radius: 9999px !important;
    line-height: 1 !important;
    white-space: nowrap !important;
  }

  .mobile-cta-action {
    flex-shrink: 0 !important;
    display: flex !important;
    align-items: center !important;
  }

  .mobile-cta-btns-wrap {
    display: flex !important;
    gap: 6px !important;
    align-items: center !important;
  }

  .btn-mobile-cta-secondary {
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    height: 38px !important;
    padding: 0 12px !important;
    font-size: 12px !important;
    font-weight: 700 !important;
    color: #059669 !important;
    background: #f0fdf4 !important;
    border: 1.5px solid rgba(5, 150, 105, 0.28) !important;
    border-radius: 9999px !important;
    white-space: nowrap !important;
    text-decoration: none !important;
    box-sizing: border-box !important;
    flex-shrink: 0 !important;
    transition: all 0.15s ease !important;
  }

  .btn-mobile-cta-secondary:active {
    background: #dcfce7 !important;
    transform: scale(0.97) !important;
  }

  .btn-mobile-cta-primary {
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    height: 38px !important;
    padding: 0 16px !important;
    border-radius: 9999px !important;
    background: linear-gradient(135deg, #059669 0%, #0d9488 100%) !important;
    color: #ffffff !important;
    font-family: var(--font-display, 'Plus Jakarta Sans', sans-serif) !important;
    font-weight: 850 !important;
    font-size: 12.5px !important;
    text-decoration: none !important;
    box-shadow: 0 3px 12px rgba(5, 150, 105, 0.32) !important;
    white-space: nowrap !important;
    border: none !important;
    box-sizing: border-box !important;
    flex-shrink: 0 !important;
    transition: all 0.15s ease !important;
  }

  .btn-mobile-cta-primary:active {
    transform: scale(0.97) !important;
    box-shadow: 0 1px 6px rgba(5, 150, 105, 0.25) !important;
  }
}

/* ════ Compact Breakpoint (≤375px, e.g. Samsung Galaxy 360px, iPhone SE) ════ */
@media (max-width: 375px) {
  .sticky-mobile-cta {
    padding: 7px 10px !important;
    padding-bottom: max(7px, env(safe-area-inset-bottom)) !important;
  }

  .mobile-cta-inner {
    gap: 6px !important;
  }

  .mobile-cta-badge {
    font-size: 9px !important;
  }

  .mobile-cta-price-row .m-price {
    font-size: 18.5px !important;
  }

  .mobile-cta-price-row .m-discount-pill {
    font-size: 9px !important;
    padding: 2px 5.5px !important;
  }

  .mobile-cta-btns-wrap {
    gap: 5px !important;
  }

  .btn-mobile-cta-secondary {
    height: 36px !important;
    padding: 0 10px !important;
    font-size: 11.5px !important;
  }

  .btn-mobile-cta-primary {
    height: 36px !important;
    padding: 0 13px !important;
    font-size: 12px !important;
  }
}

/* ════ Extreme Narrow Breakpoint (≤330px, e.g. iPhone 5/SE 1st gen 320px) ════ */
@media (max-width: 330px) {
  .sticky-mobile-cta {
    padding: 6px 8px !important;
  }

  .mobile-cta-badge {
    font-size: 8.5px !important;
  }

  .mobile-cta-price-row .m-price {
    font-size: 16px !important;
  }

  .btn-mobile-cta-secondary {
    height: 33px !important;
    padding: 0 7px !important;
    font-size: 11px !important;
  }

  .btn-mobile-cta-primary {
    height: 33px !important;
    padding: 0 10px !important;
    font-size: 11px !important;
  }
}

/* ══════════════ UI/UX NAV PLAY BUTTON & AUDIO MODAL ══════════════ */'''

for css_path in ['landing_v2/styles.css', 'public/landing_v2/styles.css']:
    if os.path.exists(css_path):
        with open(css_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        match = css_block_pattern.search(content)
        if match:
            content = content[:match.start()] + new_css + content[match.end():]
            with open(css_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Updated CSS in {css_path}")
        else:
            print(f"Could not find exact CSS regex match in {css_path}")
