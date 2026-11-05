# Session: 2026-11-05 20:28 - Fix Mobile Landing Page Track Tabs & Days Overlap

## Goal
Resolve mobile view issue on landing page (`https://www.manodemy.com`) where the floating course title pill (`60 Days Data Analytics Course`) inside the fixed 2-row navigation bar overlapped the track tabs, partially hiding the days labels (`18 Days` SQL, `12 Days` Excel, `30 Days` Python). Ensure all labels are fully visible while maintaining a clean, minimal gap.

## Work Completed
1. **Root Cause Analysis**:
   - On mobile viewports (`max-width: 860px`), the `.nav` element is fixed with a 2-row layout (Row 1: Brand & Menu, Row 2: `#navCenterAudioHook`), taking a total height of ~84px–88px.
   - The top-placed curriculum section had `padding-top: 14px !important;` on mobile, causing `.curr-tabs` to start at `y = 60px`.
   - As a result, the bottom edge of `#navCenterAudioHook` at `y = 84px` overlapped the top 24px of `.curr-tabs`, directly covering `<span class="curr-tab-days">18 Days</span>` / `12 Days` / `30 Days`.
2. **Precision Calibrated Spacing**:
   - Adjusted mobile (`@media (max-width: 860px)`) padding in `landing_v2/styles.css` and `public/landing_v2/styles.css` to `padding-top: 50px !important;`.
   - Result: `.curr-tabs` starts cleanly at `y = 96.0px`, yielding an exact minimal gap of **12.0px** below the 84.0px navbar hook (`96.0px - 84.0px = 12.0px`).
   - The days labels sit at `y = 110.0px` with a generous **26.0px** clearance below the pill, 100% unobstructed.
3. **Parity & Verification**:
   - Confirmed 100% SHA-256 byte parity between `landing_v2/styles.css` and `public/landing_v2/styles.css`.
   - Verified across mobile viewports via Playwright: `Gap = 12.0px`, `DaysClearance = 26.0px`.
   - Pushed commit `e81f9328` to `origin main`.
   - Deployed live to Vercel production (`dpl_FVky8URpqwe8PjbhYYqqhoccGg7o`), aliased to `https://www.manodemy.com`, and verified live.

## Evidence
- Local Playwright: `HookBottom = 84.0px`, `TabsTop = 96.0px (Gap = 12.0px)`, `18DaysTop = 110.0px (Clearance = 26.0px)` [VERIFIED]
- Live Production Playwright: `https://www.manodemy.com/` returns exact same coordinates (`HookBottom=84.0px, TabsTop=96.0px, 18DaysTop=110.0px`) with 0 console errors [VERIFIED]
- Screenshot: `crop_live_production_mobile_landing_fixed.png` shows completely clear, visible days text [VERIFIED]

## Next Steps
- None required for this task. System is stable in production.
