# Session: 2026-11-05 20:55 - Fix Mobile Sticky Bottom CTA Overlap

## Goal
Improve the design of the mobile sticky bottom CTA bar on `landing_v2` to meet elite market standards (Coursera, Apple, Blinkit). Eliminate text collision, messy element wrapping, and overlap across all mobile viewports (320px, 360px, 375px, 390px, 412px, 430px).

## Root Cause Analysis
1. `.btn-mobile-cta-secondary` contained inline styles (`padding: 10px 14px`, `font-size: 12px`, with raw line breaks inside the tag) and `.btn-mobile-cta-primary` had `height: 44px`, `padding: 0 20px`, consuming over 220px on small screens.
2. The pricing column `.mobile-cta-info` attempted to display the live sale price (`₹1,999`), old strikethrough price (`₹9,999` or `₹4,999`), and discount pill (`80% OFF` or `60% OFF`) horizontally simultaneously in less than 96px on 360px screens, causing elements to smash and overlap into `Try Free`.
3. `<meta charset="utf-8"/>` was placed at byte 1094 (past the 1024-byte HTML5 limit) due to analytics tags, causing character encoding glitches on currency and rocket symbols in some engines.

## Solution & Architectural Changes
1. **HTML Architecture (`landing_v2/index.html` & `public/landing_v2/index.html`):**
   - Moved `<meta charset="utf-8"/>` directly below `<head>` (byte 73).
   - Replaced fragile inline button styles with `.mobile-cta-btns-wrap` and clean class `.btn-mobile-cta-secondary`.
   - Preserved all IDs (`mPriceNow`, `mPriceOld`, `mDiscountPill`, `stickyEnrollBtn`, `stickyMobileCta`).
2. **CSS Precision Engineering (`landing_v2/styles.css` & `public/landing_v2/styles.css`):**
   - Frosted edge-to-edge luxury glass backdrop (`rgba(255, 255, 255, 0.96)`, blur 20px, subtle slate border, ambient bottom shadow).
   - Modern market-standard pricing presentation: on mobile bottom sticky bar, old crossed-out price is hidden (`.m-price-old { display: none !important; }`), prominently featuring the sale price (`₹1,999`) and emerald discount badge (`80% OFF`) with generous breathing space.
   - Refined capsule CTA buttons:
     - `Try Free`: 38px height (36px on ≤375px), 12px padding, subtle emerald tint `#f0fdf4`, emerald border.
     - `Enroll Now 🚀`: 38px height (36px on ≤375px), emerald-to-teal gradient, 12.5px font-weight 850, soft glow shadow.
   - Desktop suppression: `@media (min-width: 769px) { .sticky-mobile-cta { display: none !important; } }`.
3. **Verification:**
   - Playwright automated testing across 5 viewports:
     - 360px Galaxy: Gap = 6.0px, Overlap = False.
     - 375px iPhone SE: Gap = 6.0px, Overlap = False.
     - 390px iPhone 14: Gap = 8.0px, Overlap = False.
     - 412px Pixel 7: Gap = 8.0px, Overlap = False.
     - 430px iPhone 14 Pro Max: Gap = 8.0px, Overlap = False.
   - 100% SHA-256 byte parity between `landing_v2/` and `public/landing_v2/`.
