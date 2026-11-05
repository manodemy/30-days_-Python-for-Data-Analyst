// public/excel/content/excel-day-09.js
// Manodemy Excel Studio — Day 09 Curriculum Manifest & Challenges
// Topic: Multi-Condition Aggregations & Statistical Metrics (Global Day 27)
// Domain: AdVenture Omnichannel (Digital Marketing & Ad Spend)
// Conforms to: Master Orchestration v2.1 (Gate 2) & STYLE_GUIDE.md

if (!window.EXCEL_COURSE_CONTENT) window.EXCEL_COURSE_CONTENT = {};

window.EXCEL_COURSE_CONTENT['excelDay09'] = {
  day: 9,
  globalDay: 27,
  title: "Conditional Aggregations: SUMIFS",
  description: "Master multi-criteria boundary logic with MAXIFS and MINIFS, date range temporal intervals, exclusionary logic (<>), wildcard pattern matching (* and ?), and production statistical metrics including MEDIAN, MODE.SNGL, STDEV.S, PERCENTILE.INC, and Pearson's CORREL in digital marketing attribution models.",
  topics: [
    "01. Multi-Condition Maximums: MAXIFS(max_range, criteria_range1, criteria1, ...)",
    "02. Multi-Condition Minimums: MINIFS(min_range, criteria_range1, criteria1, ...)",
    "03. Two-Sided Date Range Criteria: Temporal Boundaries (>= Start, <= End)",
    "04. Exclusionary Logic & The Not-Equal Operator: <> and Criteria Concatenation",
    "05. Wildcard Aggregations: Asterisk (*), Question Mark (?), and Text Matching",
    "06. Robust Central Tendency: MEDIAN vs AVERAGE in Skewed Distributions",
    "07. Frequency Distribution & Discrete Centrality: MODE and MODE.SNGL",
    "08. Dispersion & Risk Volatility: STDEV.S (Sample Standard Deviation)",
    "09. Percentiles & Quantile Benchmarks: PERCENTILE.INC",
    "10. Statistical Association & Bivariate Modeling: Pearson's CORREL"
  ],
  slides: [
    {
      title: "Multi-Condition Aggregations & Statistical Metrics",
      html: `
<section class="slide-section" id="sec01">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="heading01">
    <span class="heading-num-box">01</span>
    <span class="heading-title-box">
      <span class="heading-icon">📈</span>
      <span class="heading-title-text">Multi-Condition Maximums: MAXIFS(max_range, criteria_range1, criteria1, ...)</span>
      <button class="audio-play-btn" data-track-idx="0" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <div class="pro-tip-box" style="margin-bottom: 16px;">
      <h4>⚡ Performance Marketing Analytics Hotkeys</h4>
      <p>Press <kbd>Alt</kbd> + <kbd>=</kbd> to AutoSum any numerical vector instantly. Format currency KPI returns with <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>$</kbd> (<kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>4</kbd>) and format CTR/CVR rates with <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>%</kbd> (<kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>5</kbd>).</p>
    </div>
    <p class="lead-text">In high-velocity omnichannel marketing, performance analysts frequently need to identify the single highest-performing campaign under specific channel, regional, or budget constraints (e.g. <em>"What was our peak revenue for Paid Search campaigns in North America?"</em>). Microsoft 365 and modern spreadsheet engines provide <code>=MAXIFS()</code> to evaluate multiple criteria natively without volatile helper columns or legacy array keystrokes.</p>
    <div class="architecture-grid">
      <div class="arch-box">
        <h4>Target Range First</h4>
        <p>The first argument is always the numeric return vector: <code>max_range</code>. This is the range from which the maximum value will be extracted once all conditions pass.</p>
      </div>
      <div class="arch-box">
        <h4>Paired Range-Criteria Logic</h4>
        <p>Subsequent arguments arrive in mandatory pairs: <code>criteria_range1, criteria1, [criteria_range2, criteria2], ...</code> up to 126 pairs, evaluated via strict boolean <strong>AND</strong> logic.</p>
      </div>
      <div class="arch-box">
        <h4>Zero-Match Return Policy</h4>
        <p>If no rows satisfy every supplied condition, <code>MAXIFS()</code> returns <code>0</code>. It automatically ignores blank cells within the target values range.</p>
      </div>
    </div>
    <div class="table-responsive">
      <table class="reference-table">
        <thead>
          <tr>
            <th>Argument</th>
            <th>Type</th>
            <th>Dimension Requirement</th>
            <th>Description &amp; Behavior</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>max_range</code></td>
            <td>Range</td>
            <td>1D Column or 2D Array</td>
            <td>The numeric values evaluated to find the peak (e.g. <code>Campaign_Performance!J2:J26</code>).</td>
          </tr>
          <tr>
            <td><code>criteria_range1</code></td>
            <td>Range</td>
            <td>Must match <code>max_range</code> size</td>
            <td>The first column filtered against criteria (e.g. <code>Campaign_Performance!C2:C26</code>).</td>
          </tr>
          <tr>
            <td><code>criteria1</code></td>
            <td>Value / String</td>
            <td>Scalar expression</td>
            <td>Condition defining membership: literal text <code>"Paid Search"</code>, number, or comparison expression.</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="keynote-box keynote-emerald">
      💡 <strong>Senior Analyst Takeaway:</strong> Notice the structural symmetry: in <code>MAXIFS()</code>, the aggregation range comes <em>first</em>. This mirrors modern functions like <code>SUMIFS()</code> and <code>AVERAGEIFS()</code>, completely breaking away from deprecated single-condition functions like <code>SUMIF()</code> where the sum range was tacked onto the end.
    </div>
    <div class="interview-insight-box" style="margin-top:16px; border:1px solid rgba(14,165,233,0.3); border-left:4px solid #0ea5e9; border-radius:8px; padding:14px 18px; background:rgba(14,165,233,0.08);">
      <h4 style="margin:0 0 8px 0; color:#38bdf8; font-size:13.5px; font-weight:700;">💼 Interview &amp; Production Insight</h4>
      <p style="margin:0; font-size:12.5px; line-height:1.5; color:#cbd5e1;">
        <strong>Interview Question:</strong> <em>"How do you query the maximum conversion volume in a 200,000-row tracking table for non-branded campaigns without crashing client memory?"</em><br>
        <strong>Staff Analyst Answer:</strong> Use <code>=MAXIFS(ConversionsRange, ChannelRange, "Paid Search", BrandTypeRange, "NonBrand")</code>. Because <code>MAXIFS()</code> operates inside Excel's native multi-threaded calculation kernel, it executes in sub-millisecond time and avoids the memory bloat of unanchored dynamic array spills.
      </p>
    </div>
    <div class="anti-pattern-card">
      <div class="anti-pattern-header">⚠️ Common Mistake vs. Gold Standard Solution</div>
      <div class="anti-pattern-body">
        <div class="anti-mistake">
          <strong>Anti-Pattern:</strong> Novice analysts write legacy array formulas like <code>{=MAX(IF(C2:C26="Paid Search", J2:J26))}</code>. This requires legacy Ctrl+Shift+Enter keystrokes, breaks when non-technical stakeholders edit the cell, and runs significantly slower.
        </div>
        <div class="anti-solution">
          <strong>Gold Standard:</strong> Write clean, self-documenting native multi-criteria aggregations: <code>=MAXIFS(Campaign_Performance!J2:J26, Campaign_Performance!C2:C26, "Paid Search")</code>.
        </div>
      </div>
    </div>
  </div>
</section>

<section class="slide-section" id="sec02">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="heading02">
    <span class="heading-num-box">02</span>
    <span class="heading-title-box">
      <span class="heading-icon">📉</span>
      <span class="heading-title-text">Multi-Condition Minimums: MINIFS(min_range, criteria_range1, criteria1, ...)</span>
      <button class="audio-play-btn" data-track-idx="1" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p class="lead-text">Identifying cost efficiencies, customer acquisition cost (CAC) floors, and minimum viable ad spend per cohort requires <code>=MINIFS()</code>. Like its sibling <code>MAXIFS()</code>, <code>MINIFS()</code> evaluates multiple ranges simultaneously and returns the minimum value among rows that meet all criteria.</p>
    <div class="architecture-grid">
      <div class="arch-box">
        <h4>Strict Conjunction (AND)</h4>
        <p>Every criterion must simultaneously evaluate to <code>TRUE</code> for a row to qualify. If a row satisfies 3 of 4 conditions, it is immediately discarded.</p>
      </div>
      <div class="arch-box">
        <h4>Range Dimension Parity</h4>
        <p><code>min_range</code> and all <code>criteria_range</code> parameters must be exactly identical in row count and column orientation. A mismatch immediately throws <code>#VALUE!</code>.</p>
      </div>
      <div class="arch-box">
        <h4>Zero vs No-Match Trap</h4>
        <p>If no rows meet criteria, <code>MINIFS()</code> returns <code>0</code>. In financial modeling, analysts must audit whether <code>0</code> represents an authentic zero cost or a complete lack of matching records.</p>
      </div>
    </div>
    <div class="table-responsive">
      <table class="reference-table">
        <thead>
          <tr>
            <th>Scenario</th>
            <th>Formula Pattern</th>
            <th>Evaluation Logic</th>
            <th>Output</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Channel Minimum</td>
            <td><code>=MINIFS(F2:F26, C2:C26, "Paid Social")</code></td>
            <td>Scans Column C for "Paid Social", returns smallest value in Column F.</td>
            <td>Lowest single campaign spend in Paid Social.</td>
          </tr>
          <tr>
            <td>Volume-Gated Minimum</td>
            <td><code>=MINIFS(F2:F26, C2:C26, "Paid Social", I2:I26, "&gt;=500")</code></td>
            <td>Filters Paid Social where conversions are at least 500, finds lowest spend.</td>
            <td>Most cost-efficient high-volume social ad.</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="keynote-box keynote-emerald">
      💡 <strong>Senior Analyst Takeaway:</strong> When writing comparison expressions inside <code>MINIFS()</code>, always enclose the operator and threshold in quotes (e.g. <code>"&gt;=500"</code>) or concatenate dynamically using <code>"&gt;=" &amp; TargetCell</code>.
    </div>
    <div class="interview-insight-box" style="margin-top:16px; border:1px solid rgba(14,165,233,0.3); border-left:4px solid #0ea5e9; border-radius:8px; padding:14px 18px; background:rgba(14,165,233,0.08);">
      <h4 style="margin:0 0 8px 0; color:#38bdf8; font-size:13.5px; font-weight:700;">💼 Interview &amp; Production Insight</h4>
      <p style="margin:0; font-size:12.5px; line-height:1.5; color:#cbd5e1;">
        <strong>Interview Question:</strong> <em>"Why does MINIFS return #VALUE! when criteria_range1 is C2:C26 but min_range is F2:F30?"</em><br>
        <strong>Staff Analyst Answer:</strong> <code>MINIFS()</code> requires 100% geometric congruency across all range arguments. Because C2:C26 spans 25 rows and F2:F30 spans 29 rows, Excel's vectorized index mapping cannot pair row items, immediately triggering a shape mismatch error.
      </p>
    </div>
    <div class="anti-pattern-card">
      <div class="anti-pattern-header">⚠️ Common Mistake vs. Gold Standard Solution</div>
      <div class="anti-pattern-body">
        <div class="anti-mistake">
          <strong>Anti-Pattern:</strong> Novice analysts filter the table manually in the UI, sort by Spend ascending, and copy the first value into an executive reporting cell. As new campaign data streams in, the hardcoded value becomes obsolete.
        </div>
        <div class="anti-solution">
          <strong>Gold Standard:</strong> Anchor dynamic business metrics to live formula cells using <code>=MINIFS(Campaign_Performance!F2:F26, Campaign_Performance!C2:C26, "Paid Social")</code>.
        </div>
      </div>
    </div>
  </div>
</section>

<section class="slide-section" id="sec03">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="heading03">
    <span class="heading-num-box">03</span>
    <span class="heading-title-box">
      <span class="heading-icon">📅</span>
      <span class="heading-title-text">Two-Sided Date Range Criteria: Temporal Boundaries (&gt;= Start, &lt;= End)</span>
      <button class="audio-play-btn" data-track-idx="2" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p class="lead-text">Marketing campaigns are strictly budgeted across financial fiscal periods: Q1, Q2, promotional sprints, or holiday windows. In spreadsheet engines, a two-sided date window is constructed by passing the date column <strong>twice</strong> — once for the lower threshold and once for the upper threshold.</p>
    <div class="architecture-grid">
      <div class="arch-box">
        <h4>Date Serial Translation</h4>
        <p>Because Excel stores dates as serial numbers (e.g. <code>46023</code> is Jan 1, 2026; <code>46112</code> is Mar 31, 2026), boundary conditions evaluate numeric inequalities cleanly.</p>
      </div>
      <div class="arch-box">
        <h4>Closed Interval Pairs</h4>
        <p>To capture every campaign in Q1 2026, specify: <code>E2:E26, "&gt;=46023", E2:E26, "&lt;=46112"</code>. The simultaneous conjunction forms a closed temporal interval.</p>
      </div>
      <div class="arch-box">
        <h4>Dynamic DATE() Binding</h4>
        <p>Concatenating <code>"&gt;=" &amp; DATE(2026, 1, 1)</code> guarantees complete immunity against regional Windows date format misinterpretations (MDY vs DMY).</p>
      </div>
    </div>
    <div class="table-responsive">
      <table class="reference-table">
        <thead>
          <tr>
            <th>Target Period</th>
            <th>Calendar Start / End</th>
            <th>1900 Date Serials</th>
            <th>Production Formula Criteria Syntax</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Q1 2026</td>
            <td>01-Jan-2026 to 31-Mar-2026</td>
            <td><code>46023</code> to <code>46112</code></td>
            <td><code>E2:E26, "&gt;=46023", E2:E26, "&lt;=46112"</code></td>
          </tr>
          <tr>
            <td>Q2 2026</td>
            <td>01-Apr-2026 to 30-Jun-2026</td>
            <td><code>46113</code> to <code>46203</code></td>
            <td><code>E2:E26, "&gt;=46113", E2:E26, "&lt;=46203"</code></td>
          </tr>
          <tr>
            <td>Q3 2026</td>
            <td>01-Jul-2026 to 30-Sep-2026</td>
            <td><code>46204</code> to <code>46295</code></td>
            <td><code>E2:E26, "&gt;=46204", E2:E26, "&lt;=46295"</code></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="keynote-box keynote-emerald">
      💡 <strong>Senior Analyst Takeaway:</strong> Never attempt to write a single criteria argument like <code>"&gt;=46023 AND &lt;=46112"</code>. Multi-criteria aggregation engines evaluate each condition independently; you must repeat the criteria range parameter for each bound!
    </div>
    <div class="interview-insight-box" style="margin-top:16px; border:1px solid rgba(14,165,233,0.3); border-left:4px solid #0ea5e9; border-radius:8px; padding:14px 18px; background:rgba(14,165,233,0.08);">
      <h4 style="margin:0 0 8px 0; color:#38bdf8; font-size:13.5px; font-weight:700;">💼 Interview &amp; Production Insight</h4>
      <p style="margin:0; font-size:12.5px; line-height:1.5; color:#cbd5e1;">
        <strong>Interview Question:</strong> <em>"How do you make a Q1 SUMIFS calculation fully dynamic so that updating an As-Of date cell automatically rolls the reporting window?"</em><br>
        <strong>Staff Analyst Answer:</strong> Anchor boundary dates to master setup cells (e.g. <code>$H$1</code> and <code>$H$2</code>) and concatenate using strings: <code>=SUMIFS(F2:F26, E2:E26, "&gt;=" &amp; $H$1, E2:E26, "&lt;=" &amp; $H$2)</code>. This eliminates all hardcoding and allows financial controllers to scrub fiscal calendars dynamically.
      </p>
    </div>
    <div class="anti-pattern-card">
      <div class="anti-pattern-header">⚠️ Common Mistake vs. Gold Standard Solution</div>
      <div class="anti-pattern-body">
        <div class="anti-mistake">
          <strong>Anti-Pattern:</strong> Writing <code>=SUMIFS(F2:F26, E2:E26, "&gt;=2026-01-01", E2:E26, "&lt;=2026-03-31")</code>. Depending on machine locale settings, <code>"2026-01-01"</code> is often parsed as text or year subtraction (2026 minus 1 minus 1 = 2024), completely breaking inequality checks!
        </div>
        <div class="anti-solution">
          <strong>Gold Standard:</strong> Use raw serial numbers or wrap with explicit date constructors: <code>=SUMIFS(F2:F26, E2:E26, "&gt;=" &amp; DATE(2026, 1, 1), E2:E26, "&lt;=" &amp; DATE(2026, 3, 31))</code>.
        </div>
      </div>
    </div>
  </div>
</section>

<section class="slide-section" id="sec04">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="heading04">
    <span class="heading-num-box">04</span>
    <span class="heading-title-box">
      <span class="heading-icon">🚫</span>
      <span class="heading-title-text">Exclusionary Logic &amp; The Not-Equal Operator: &lt;&gt;</span>
      <button class="audio-play-btn" data-track-idx="3" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p class="lead-text">Enterprise marketing attribution often demands exclusionary segmentation: summing budget across all non-Display channels, isolating organic vs paid traffic, or filtering out internal QA test transactions. In Excel criteria expressions, the <strong>Not-Equal operator</strong> is represented by <code>&lt;&gt;</code>.</p>
    <div class="architecture-grid">
      <div class="arch-box">
        <h4>Syntax Encapsulation</h4>
        <p>The operator is placed directly inside criteria quotes: <code>"&lt;&gt;Display"</code>. Excel reads this as <em>"Include any row where Channel does not equal Display"</em>.</p>
      </div>
      <div class="arch-box">
        <h4>Cell Reference Dynamic Concat</h4>
        <p>To exclude a category referenced from a control cell (e.g. <code>A2</code>), use the ampersand concatenation operator: <code>"&lt;&gt;" &amp; A2</code>.</p>
      </div>
      <div class="arch-box">
        <h4>Case-Insensitive Match</h4>
        <p>Excel formula criteria comparisons are strictly case-insensitive. <code>"&lt;&gt;display"</code>, <code>"&lt;&gt;Display"</code>, and <code>"&lt;&gt;DISPLAY"</code> produce identical behavior.</p>
      </div>
    </div>
    <div class="table-responsive">
      <table class="reference-table">
        <thead>
          <tr>
            <th>Analytical Requirement</th>
            <th>Formula Signature</th>
            <th>Included Cohorts</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Spend Excluding Display</td>
            <td><code>=SUMIFS(F2:F26, C2:C26, "&lt;&gt;Display")</code></td>
            <td>Paid Search, Paid Social, Video (excludes Display).</td>
          </tr>
          <tr>
            <td>Peak Non-Display Revenue</td>
            <td><code>=MAXIFS(J2:J26, C2:C26, "&lt;&gt;Display")</code></td>
            <td>Finds maximum revenue generated outside the Display channel.</td>
          </tr>
          <tr>
            <td>Count Excluding Inactive</td>
            <td><code>=COUNTIFS(C2:C26, "&lt;&gt;Paused")</code></td>
            <td>Counts all live, active, or pending campaign records.</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="keynote-box keynote-emerald">
      💡 <strong>Senior Analyst Takeaway:</strong> Exclusionary logic with <code>&lt;&gt;</code> is drastically faster and cleaner than writing individual <code>SUMIFS()</code> for every other channel and adding them together with <code>+</code>.
    </div>
    <div class="interview-insight-box" style="margin-top:16px; border:1px solid rgba(14,165,233,0.3); border-left:4px solid #0ea5e9; border-radius:8px; padding:14px 18px; background:rgba(14,165,233,0.08);">
      <h4 style="margin:0 0 8px 0; color:#38bdf8; font-size:13.5px; font-weight:700;">💼 Interview &amp; Production Insight</h4>
      <p style="margin:0; font-size:12.5px; line-height:1.5; color:#cbd5e1;">
        <strong>Interview Question:</strong> <em>"What happens if a cell in Channel is completely blank when evaluating '&lt;&gt;Display'?"</em><br>
        <strong>Staff Analyst Answer:</strong> In Excel, a blank cell is NOT equal to <code>"Display"</code>, so <code>"&lt;&gt;Display"</code> evaluates to <code>TRUE</code> for empty cells! To exclude both Display AND blank rows, chain two criteria pairs: <code>C2:C26, "&lt;&gt;Display", C2:C26, "&lt;&gt;"</code>.
      </p>
    </div>
    <div class="anti-pattern-card">
      <div class="anti-pattern-header">⚠️ Common Mistake vs. Gold Standard Solution</div>
      <div class="anti-pattern-body">
        <div class="anti-mistake">
          <strong>Anti-Pattern:</strong> Writing SQL-style <code>!=</code> operators like <code>"!=Display"</code>. Excel does not recognize <code>!=</code> in criteria strings and will treat it as searching for the literal characters <code>"!=Display"</code>!
        </div>
        <div class="anti-solution">
          <strong>Gold Standard:</strong> Always use the standard Excel inequality token: <code>"&lt;&gt;Display"</code>.
        </div>
      </div>
    </div>
  </div>
</section>

<section class="slide-section" id="sec05">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="heading05">
    <span class="heading-num-box">05</span>
    <span class="heading-title-box">
      <span class="heading-icon">🔍</span>
      <span class="heading-title-text">Wildcard Aggregations: Asterisk (*), Question Mark (?), and Text Matching</span>
      <button class="audio-play-btn" data-track-idx="4" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p class="lead-text">Enterprise marketing taxonomies follow strict naming protocols: e.g. <code>Google Search - Brand Core</code>, <code>Google Search - NonBrand High</code>, or <code>Meta Feed - Retargeting Pro</code>. Rather than creating fragile lookup tables for every campaign variant, senior analysts utilize <strong>wildcards</strong> in <code>COUNTIFS()</code>, <code>SUMIFS()</code>, and <code>MAXIFS()</code>.</p>
    <div class="architecture-grid">
      <div class="arch-box">
        <h4>The Asterisk (*) Wildcard</h4>
        <p>Represents <strong>zero, one, or multiple</strong> arbitrary characters. <code>"*Search*"</code> matches any string containing "Search" anywhere within the text.</p>
      </div>
      <div class="arch-box">
        <h4>The Question Mark (?) Wildcard</h4>
        <p>Represents <strong>exactly one</strong> single character. <code>"CMP-1??"</code> matches codes from <code>CMP-100</code> to <code>CMP-199</code>, but excludes <code>CMP-10</code> or <code>CMP-1000</code>.</p>
      </div>
      <div class="arch-box">
        <h4>The Tilde (~) Escape Operator</h4>
        <p>To match an authentic literal asterisk or question mark inside a string, prepend a tilde: <code>"~*"</code> searches for the literal character <code>"*"</code>.</p>
      </div>
    </div>
    <div class="table-responsive">
      <table class="reference-table">
        <thead>
          <tr>
            <th>Wildcard Pattern</th>
            <th>Matching Examples</th>
            <th>Non-Matching Examples</th>
            <th>Typical Marketing Use Case</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>"*Search*"</code></td>
            <td>"Google Search Brand", "Search NonBrand"</td>
            <td>"Meta Feed", "TikTok Video"</td>
            <td>Aggregating all Search campaigns regardless of engine or tier.</td>
          </tr>
          <tr>
            <td><code>"Google*"</code></td>
            <td>"Google Search", "Google Display"</td>
            <td>"Yahoo Search", "Bing Search"</td>
            <td>Isolating vendor ecosystem spend starting with Google.</td>
          </tr>
          <tr>
            <td><code>"*Pro"</code></td>
            <td>"Retargeting Pro", "Growth Pro"</td>
            <td>"Pro Plan", "Professional"</td>
            <td>Targeting campaigns ending with high-tier suffix "Pro".</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="keynote-box keynote-emerald">
      💡 <strong>Senior Analyst Takeaway:</strong> Wildcards operate strictly on <em>text</em> data. If you pass wildcards against a column of pure numbers or serial dates, the criteria will fail to match. Always verify that your target lookup column is text-formatted.
    </div>
    <div class="interview-insight-box" style="margin-top:16px; border:1px solid rgba(14,165,233,0.3); border-left:4px solid #0ea5e9; border-radius:8px; padding:14px 18px; background:rgba(14,165,233,0.08);">
      <h4 style="margin:0 0 8px 0; color:#38bdf8; font-size:13.5px; font-weight:700;">💼 Interview &amp; Production Insight</h4>
      <p style="margin:0; font-size:12.5px; line-height:1.5; color:#cbd5e1;">
        <strong>Interview Question:</strong> <em>"How do you count how many ad headlines contain a promotional question mark like 'Ready to Scale?' without treating the question mark as a wildcard?"</em><br>
        <strong>Staff Analyst Answer:</strong> Prepend the escape character tilde: <code>=COUNTIFS(AdHeadlinesRange, "*~?*")</code>. The tilde instructs Excel's regex parser to neutralize the wildcard quantifier and evaluate the question mark as a literal glyph.
      </p>
    </div>
    <div class="anti-pattern-card">
      <div class="anti-pattern-header">⚠️ Common Mistake vs. Gold Standard Solution</div>
      <div class="anti-pattern-body">
        <div class="anti-mistake">
          <strong>Anti-Pattern:</strong> Writing <code>=SUMIFS(J2:J26, B2:B26, "Search")</code> when looking for campaigns named "Google Search - Brand Core". Without enclosing asterisks, Excel looks for an exact string match and returns 0!
        </div>
        <div class="anti-solution">
          <strong>Gold Standard:</strong> Enclose the search term with asterisk wildcards: <code>=SUMIFS(Campaign_Performance!J2:J26, Campaign_Performance!B2:B26, "*Search*")</code>.
        </div>
      </div>
    </div>
  </div>
</section>

<section class="slide-section" id="sec06">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="heading06">
    <span class="heading-num-box">06</span>
    <span class="heading-title-box">
      <span class="heading-icon">⚖️</span>
      <span class="heading-title-text">Robust Central Tendency: MEDIAN vs AVERAGE in Skewed Distributions</span>
      <button class="audio-play-btn" data-track-idx="5" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p class="lead-text">In digital marketing spend and revenue distributions, data is almost never normally distributed; it is heavily <strong>right-skewed</strong>. A small handful of high-budget enterprise campaigns or viral video flights spend \$35,000+ while the vast majority of tactical campaigns spend \$8,000 to \$15,000. In such distributions, the arithmetic mean (<code>AVERAGE</code>) is severely distorted by outliers, whereas the <strong>Median</strong> provides the authentic central measure.</p>
    <div class="architecture-grid">
      <div class="arch-box">
        <h4>The Arithmetic Mean (AVERAGE)</h4>
        <p>Calculates \(\frac{1}{n}\sum x_i\). Every massive outlier pulls the mean upwards, misrepresenting what a "typical" campaign actually costs.</p>
      </div>
      <div class="arch-box">
        <h4>The Median (MEDIAN)</h4>
        <p>Sorts all observations ascending and selects the exact 50th percentile midpoint. Outliers have zero impact on the median value.</p>
      </div>
      <div class="arch-box">
        <h4>Even vs Odd Sample Rule</h4>
        <p>For an odd sample count \(n\), it returns the middle element. For an even count \(n\), it computes the average of the two central numbers.</p>
      </div>
    </div>
    <div class="table-responsive">
      <table class="reference-table">
        <thead>
          <tr>
            <th>Metric</th>
            <th>Sensitivity to Outliers</th>
            <th>Formula Signature</th>
            <th>Recommended Analytical Application</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>MEDIAN()</code></td>
            <td>Immune (Robust Statistic)</td>
            <td><code>=MEDIAN(F2:F26)</code></td>
            <td>Budget benchmarks, customer lifetime value, conversion baselines.</td>
          </tr>
          <tr>
            <td><code>AVERAGE()</code></td>
            <td>High (Parametric Statistic)</td>
            <td><code>=AVERAGE(F2:F26)</code></td>
            <td>Total financial reconciliation, cost absorption models.</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="keynote-box keynote-emerald">
      💡 <strong>Senior Analyst Takeaway:</strong> If an executive asks: <em>"What does our typical marketing campaign spend?"</em>, answer with the <strong>Median</strong>. If the Mean is significantly higher than the Median (e.g. Mean \$21k vs Median \$18.5k), state clearly that high-spend flagship campaigns are pulling the average up.
    </div>
    <div class="interview-insight-box" style="margin-top:16px; border:1px solid rgba(14,165,233,0.3); border-left:4px solid #0ea5e9; border-radius:8px; padding:14px 18px; background:rgba(14,165,233,0.08);">
      <h4 style="margin:0 0 8px 0; color:#38bdf8; font-size:13.5px; font-weight:700;">💼 Interview &amp; Production Insight</h4>
      <p style="margin:0; font-size:12.5px; line-height:1.5; color:#cbd5e1;">
        <strong>Interview Question:</strong> <em>"In an A/B test analysis where one influencer post drove 50,000 conversions while 99 other posts drove 200 conversions each, would you report Mean or Median?"</em><br>
        <strong>Staff Analyst Answer:</strong> Report both, but lead with the <strong>Median</strong> for baseline repeatability. The mean is artificially inflated to 700 conversions by a single 50k outlier. Relying on the mean for future media planning would lead to catastrophic budget misallocation.
      </p>
    </div>
    <div class="anti-pattern-card">
      <div class="anti-pattern-header">⚠️ Common Mistake vs. Gold Standard Solution</div>
      <div class="anti-pattern-body">
        <div class="anti-mistake">
          <strong>Anti-Pattern:</strong> Manually sorting columns and picking the middle cell (e.g. <code>=F14</code>). If new campaigns are inserted or rows re-sorted, the cell reference points to the wrong campaign!
        </div>
        <div class="anti-solution">
          <strong>Gold Standard:</strong> Always use the dynamic function: <code>=MEDIAN(Campaign_Performance!F2:F26)</code>.
        </div>
      </div>
    </div>
  </div>
</section>

<section class="slide-section" id="sec07">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="heading07">
    <span class="heading-num-box">07</span>
    <span class="heading-title-box">
      <span class="heading-icon">📊</span>
      <span class="heading-title-text">Frequency Distribution &amp; Discrete Centrality: MODE and MODE.SNGL</span>
      <button class="audio-play-btn" data-track-idx="6" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p class="lead-text">While the mean and median measure quantitative centers, marketing analysts frequently need to identify the most common discrete score, customer rating, or lead quality score. The <strong>Mode</strong> represents the value that appears with the highest frequency in a data set. In Microsoft 365, the gold standard function is <code>=MODE.SNGL()</code>.</p>
    <div class="architecture-grid">
      <div class="arch-box">
        <h4>MODE.SNGL vs Legacy MODE</h4>
        <p><code>MODE.SNGL()</code> is the modern replacement for legacy <code>MODE()</code>, introduced to clarify that it returns the single most frequent value in unimodal distributions.</p>
      </div>
      <div class="arch-box">
        <h4>Ties &amp; Multi-Modal Tie-Breaking</h4>
        <p>If two numbers share the same highest frequency, <code>MODE.SNGL()</code> returns the one that occurs first in the data range.</p>
      </div>
      <div class="arch-box">
        <h4>The #N/A No-Duplicates Error</h4>
        <p>If all numbers in the range appear exactly once, <code>MODE.SNGL()</code> returns <code>#N/A</code>. The mode only exists when at least one value repeats.</p>
      </div>
    </div>
    <div class="table-responsive">
      <table class="reference-table">
        <thead>
          <tr>
            <th>Function</th>
            <th>Excel Version Support</th>
            <th>Multi-Modal Behavior</th>
            <th>Target Metric Types</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>MODE.SNGL()</code></td>
            <td>Excel 2010 to Microsoft 365</td>
            <td>Returns single earliest mode</td>
            <td>Discrete integer scores (Quality Score 1-10, NPS 0-10).</td>
          </tr>
          <tr>
            <td><code>MODE.MULT()</code></td>
            <td>Excel 2010 to Microsoft 365</td>
            <td>Spills dynamic vertical array of all modes</td>
            <td>Bimodal or multimodal customer demographic clustering.</td>
          </tr>
          <tr>
            <td><code>MODE()</code></td>
            <td>Legacy Excel 2003+</td>
            <td>Deprecated backward compatibility</td>
            <td>Maintained for older .xls spreadsheet compatibility.</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="keynote-box keynote-emerald">
      💡 <strong>Senior Analyst Takeaway:</strong> Never apply <code>MODE.SNGL()</code> to continuous floating-point metrics like Cost-Per-Click (\$1.3418) or Conversion Rate (2.3481%). Continuous numbers almost never repeat identically; use binning or rounding first.
    </div>
    <div class="interview-insight-box" style="margin-top:16px; border:1px solid rgba(14,165,233,0.3); border-left:4px solid #0ea5e9; border-radius:8px; padding:14px 18px; background:rgba(14,165,233,0.08);">
      <h4 style="margin:0 0 8px 0; color:#38bdf8; font-size:13.5px; font-weight:700;">💼 Interview &amp; Production Insight</h4>
      <p style="margin:0; font-size:12.5px; line-height:1.5; color:#cbd5e1;">
        <strong>Interview Question:</strong> <em>"What is the difference between MODE.SNGL and MODE.MULT in modern Microsoft 365?"</em><br>
        <strong>Staff Analyst Answer:</strong> <code>MODE.SNGL()</code> returns a single scalar value. In a dataset with two modes (e.g. scores 7 and 9 both appearing 6 times), <code>MODE.SNGL()</code> returns only the first one encountered. <code>MODE.MULT()</code> spills a dynamic array containing both <code>7</code> and <code>9</code>, allowing full multi-modal analysis.
      </p>
    </div>
    <div class="anti-pattern-card">
      <div class="anti-pattern-header">⚠️ Common Mistake vs. Gold Standard Solution</div>
      <div class="anti-pattern-body">
        <div class="anti-mistake">
          <strong>Anti-Pattern:</strong> Writing a manual helper count column with <code>=COUNTIF($K$2:$K$26, K2)</code> and sorting to find the most common score.
        </div>
        <div class="anti-solution">
          <strong>Gold Standard:</strong> Directly evaluate the discrete mode using <code>=MODE.SNGL(Campaign_Performance!K2:K26)</code>.
        </div>
      </div>
    </div>
  </div>
</section>

<section class="slide-section" id="sec08">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="heading08">
    <span class="heading-num-box">08</span>
    <span class="heading-title-box">
      <span class="heading-icon">📐</span>
      <span class="heading-title-text">Dispersion &amp; Risk Volatility: STDEV.S (Sample Standard Deviation)</span>
      <button class="audio-play-btn" data-track-idx="7" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p class="lead-text">Two digital marketing channels might both report an average revenue of \$60,000. However, Channel A generates steady revenues between \$55,000 and \$65,000, while Channel B wildly fluctuates between \$15,000 and \$125,000. To quantify unpredictability, budget risk, and campaign volatility, analysts compute <strong>Sample Standard Deviation</strong> using <code>=STDEV.S()</code>.</p>
    <div class="architecture-grid">
      <div class="arch-box">
        <h4>Sample vs Population (STDEV.S vs STDEV.P)</h4>
        <p><code>STDEV.S</code> divides by \(n - 1\) (Bessel's correction) to prevent underestimating variance when working with a sample of data. <code>STDEV.P</code> divides by \(N\) and is used only when analyzing 100% of all data across all time.</p>
      </div>
      <div class="arch-box">
        <h4>Variance Square Root</h4>
        <p>Standard deviation is the square root of variance: \(\sigma = \sqrt{\frac{\sum (x_i - \bar{x})^2}{n - 1}}\). It converts variance back into the original units of measurement (e.g. Dollars \$).</p>
      </div>
      <div class="arch-box">
        <h4>Empirical Rule (68-95-99.7)</h4>
        <p>In approximately normal distributions, ~68% of campaigns fall within \(\pm 1\) standard deviation of the mean, and ~95% fall within \(\pm 2\) standard deviations.</p>
      </div>
    </div>
    <div class="table-responsive">
      <table class="reference-table">
        <thead>
          <tr>
            <th>Formula Signature</th>
            <th>Mathematical Denominator</th>
            <th>Business Context</th>
            <th>Statistical Implication</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>=STDEV.S(F2:F26)</code></td>
            <td>\(n - 1\) (Bessel's Correction)</td>
            <td>Sample of 25 campaigns out of a multi-year ad history.</td>
            <td>Unbiased sample variance estimator; industry gold standard.</td>
          </tr>
          <tr>
            <td><code>=STDEV.P(F2:F26)</code></td>
            <td>\(N\) (Total Population)</td>
            <td>Universal population of all campaigns that will ever exist.</td>
            <td>Underestimates real-world risk if applied to sample data.</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="keynote-box keynote-emerald">
      💡 <strong>Senior Analyst Takeaway:</strong> In commercial analytics, virtually every spreadsheet represents a sample of time, users, or transactions. Always default to <code>STDEV.S()</code>. The legacy alias <code>STDEV()</code> in Excel evaluates to <code>STDEV.S()</code> under the hood.
    </div>
    <div class="interview-insight-box" style="margin-top:16px; border:1px solid rgba(14,165,233,0.3); border-left:4px solid #0ea5e9; border-radius:8px; padding:14px 18px; background:rgba(14,165,233,0.08);">
      <h4 style="margin:0 0 8px 0; color:#38bdf8; font-size:13.5px; font-weight:700;">💼 Interview &amp; Production Insight</h4>
      <p style="margin:0; font-size:12.5px; line-height:1.5; color:#cbd5e1;">
        <strong>Interview Question:</strong> <em>"Why does STDEV.S divide by (n - 1) instead of n, and what happens if you evaluate STDEV.S on a single cell?"</em><br>
        <strong>Staff Analyst Answer:</strong> Dividing by \(n - 1\) compensates for the fact that sample data clusters closer to the sample mean than to the true universal population mean (Bessel's correction). If evaluated on a single cell (\(n = 1\)), the denominator becomes \(1 - 1 = 0\), causing <code>STDEV.S()</code> to correctly throw a <code>#DIV/0!</code> error.
      </p>
    </div>
    <div class="anti-pattern-card">
      <div class="anti-pattern-header">⚠️ Common Mistake vs. Gold Standard Solution</div>
      <div class="anti-pattern-body">
        <div class="anti-mistake">
          <strong>Anti-Pattern:</strong> Novice analysts calculate variance manually, take the square root, and forget Bessel's correction, producing an artificially deflated volatility metric.
        </div>
        <div class="anti-solution">
          <strong>Gold Standard:</strong> Use the dedicated vectorized native engine: <code>=STDEV.S(Campaign_Performance!F2:F26)</code>.
        </div>
      </div>
    </div>
  </div>
</section>

<section class="slide-section" id="sec09">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="heading09">
    <span class="heading-num-box">09</span>
    <span class="heading-title-box">
      <span class="heading-icon">🎯</span>
      <span class="heading-title-text">Percentiles &amp; Quantile Benchmarks: PERCENTILE.INC</span>
      <button class="audio-play-btn" data-track-idx="8" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p class="lead-text">Top-tier growth marketing teams do not evaluate performance solely on averages. They benchmark against percentiles: the <strong>75th Percentile (Top Quartile)</strong> establishes the threshold for high-performing campaigns, while the <strong>90th Percentile</strong> isolates breakout viral winners. Microsoft 365 provides <code>=PERCENTILE.INC()</code> to calculate continuous inclusive quantiles.</p>
    <div class="architecture-grid">
      <div class="arch-box">
        <h4>Inclusive Range [0, 1]</h4>
        <p>The \(k\) parameter represents the quantile fraction between <code>0.0</code> and <code>1.0</code> inclusive. <code>0.75</code> represents the 75th percentile, and <code>0.9</code> represents the 90th percentile.</p>
      </div>
      <div class="arch-box">
        <h4>Linear Interpolation</h4>
        <p>When the rank index does not land cleanly on an exact integer row, <code>PERCENTILE.INC()</code> performs linear interpolation between adjacent ranks.</p>
      </div>
      <div class="arch-box">
        <h4>Quartile Equivalence</h4>
        <p><code>=PERCENTILE.INC(array, 0.25)</code> is identical to <code>QUARTILE.INC(array, 1)</code>; <code>0.50</code> is the Median; <code>0.75</code> is the 3rd Quartile.</p>
      </div>
    </div>
    <div class="table-responsive">
      <table class="reference-table">
        <thead>
          <tr>
            <th>Percentile Threshold</th>
            <th>k Parameter</th>
            <th>Equivalent Function</th>
            <th>Executive Interpretation</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>25th Percentile (Q1)</td>
            <td><code>0.25</code></td>
            <td><code>=QUARTILE.INC(J2:J26, 1)</code></td>
            <td>Underperforming threshold; candidates for ad fatigue or budget cut.</td>
          </tr>
          <tr>
            <td>50th Percentile (Median)</td>
            <td><code>0.50</code></td>
            <td><code>=MEDIAN(J2:J26)</code></td>
            <td>Typical mid-point campaign revenue.</td>
          </tr>
          <tr>
            <td>75th Percentile (Q3)</td>
            <td><code>0.75</code></td>
            <td><code>=QUARTILE.INC(J2:J26, 3)</code></td>
            <td>Top quartile benchmark; scale budget with confidence.</td>
          </tr>
          <tr>
            <td>90th Percentile (P90)</td>
            <td><code>0.90</code></td>
            <td><code>=PERCENTILE.INC(J2:J26, 0.9)</code></td>
            <td>Breakout tier; top 10% high-conversion creative assets.</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="keynote-box keynote-emerald">
      💡 <strong>Senior Analyst Takeaway:</strong> Always pass \(k\) as a decimal between <code>0.0</code> and <code>1.0</code>. Passing <code>75</code> instead of <code>0.75</code> triggers a <code>#NUM!</code> error because percentiles greater than 1.0 are mathematically impossible!
    </div>
    <div class="interview-insight-box" style="margin-top:16px; border:1px solid rgba(14,165,233,0.3); border-left:4px solid #0ea5e9; border-radius:8px; padding:14px 18px; background:rgba(14,165,233,0.08);">
      <h4 style="margin:0 0 8px 0; color:#38bdf8; font-size:13.5px; font-weight:700;">💼 Interview &amp; Production Insight</h4>
      <p style="margin:0; font-size:12.5px; line-height:1.5; color:#cbd5e1;">
        <strong>Interview Question:</strong> <em>"What is the difference between PERCENTILE.INC and PERCENTILE.EXC in Excel?"</em><br>
        <strong>Staff Analyst Answer:</strong> <code>PERCENTILE.INC</code> includes the boundaries \(0\) and \(1\), meaning \(k\) can range from \(0.0\) (the minimum) to \(1.0\) (the maximum). <code>PERCENTILE.EXC</code> strictly excludes the boundaries (\(k \in (\frac{1}{n+1}, \frac{n}{n+1})\)). In business intelligence and corporate compensation grading, <code>PERCENTILE.INC</code> is the mandatory universal standard.
      </p>
    </div>
    <div class="anti-pattern-card">
      <div class="anti-pattern-header">⚠️ Common Mistake vs. Gold Standard Solution</div>
      <div class="anti-pattern-body">
        <div class="anti-mistake">
          <strong>Anti-Pattern:</strong> Supplying whole numbers for percentiles: <code>=PERCENTILE.INC(J2:J26, 75)</code>, which immediately returns <code>#NUM!</code>.
        </div>
        <div class="anti-solution">
          <strong>Gold Standard:</strong> Pass valid decimal fractions: <code>=PERCENTILE.INC(Campaign_Performance!J2:J26, 0.75)</code>.
        </div>
      </div>
    </div>
  </div>
</section>

<section class="slide-section" id="sec10">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="heading010">
    <span class="heading-num-box">10</span>
    <span class="heading-title-box">
      <span class="heading-icon">🔗</span>
      <span class="heading-title-text">Statistical Association &amp; Bivariate Modeling: Pearson's CORREL</span>
      <button class="audio-play-btn" data-track-idx="9" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p class="lead-text">The ultimate strategic question in performance advertising is: <em>"Does increasing ad spend directly drive proportional increases in gross revenue, or are we encountering diminishing returns?"</em> Pearson's Correlation Coefficient, computed via <code>=CORREL(array1, array2)</code>, measures the strength and linear direction of association between two quantitative series.</p>
    <div class="architecture-grid">
      <div class="arch-box">
        <h4>Bounded Correlation Scale</h4>
        <p>The correlation coefficient \(r\) always lies strictly between <code>-1.0</code> and <code>+1.0</code>.</p>
      </div>
      <div class="arch-box">
        <h4>Positive Association (+1.0)</h4>
        <p>\(r &gt; 0.7\) indicates strong positive linear association: higher ad spend systematically yields higher revenue.</p>
      </div>
      <div class="arch-box">
        <h4>Dimension Symmetry</h4>
        <p><code>array1</code> and <code>array2</code> must contain the exact same number of data points. Any dimension mismatch throws <code>#N/A</code>.</p>
      </div>
    </div>
    <div class="table-responsive">
      <table class="reference-table">
        <thead>
          <tr>
            <th>Correlation Value (r)</th>
            <th>Statistical Classification</th>
            <th>Marketing Implication</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>+0.80 to +1.00</code></td>
            <td>Very Strong Positive</td>
            <td>Ad spend reliably predicts revenue growth; high capital efficiency.</td>
          </tr>
          <tr>
            <td><code>+0.50 to +0.79</code></td>
            <td>Moderate to Strong Positive</td>
            <td>Positive trend exists, but creative fatigue or seasonal noise causes variance.</td>
          </tr>
          <tr>
            <td><code>-0.20 to +0.20</code></td>
            <td>Negligible / No Linear Link</td>
            <td>Spend increases do not translate to revenue; ad fatigue or broken targeting.</td>
          </tr>
          <tr>
            <td><code>-1.00 to -0.50</code></td>
            <td>Strong Negative Association</td>
            <td>Inverse relationship (e.g. Higher Ad Spend correlates with Lower ROAS).</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="keynote-box keynote-emerald">
      💡 <strong>Senior Analyst Takeaway:</strong> <em>"Correlation is NOT Causation."</em> A correlation of \(r = 0.97\) between Spend and Revenue proves strong co-movement, but external factors like brand awareness, discounts, or macro seasonal surges may co-influence both variables.
    </div>
    <div class="interview-insight-box" style="margin-top:16px; border:1px solid rgba(14,165,233,0.3); border-left:4px solid #0ea5e9; border-radius:8px; padding:14px 18px; background:rgba(14,165,233,0.08);">
      <h4 style="margin:0 0 8px 0; color:#38bdf8; font-size:13.5px; font-weight:700;">💼 Interview &amp; Production Insight</h4>
      <p style="margin:0; font-size:12.5px; line-height:1.5; color:#cbd5e1;">
        <strong>Interview Question:</strong> <em>"How does CORREL handle empty cells or text strings in the data ranges?"</em><br>
        <strong>Staff Analyst Answer:</strong> <code>CORREL()</code> automatically ignores text strings and blank cells. However, if one array has valid numbers where the other array has text or blanks, Excel pairwise-excludes those unaligned observations. If fewer than 2 valid paired numbers remain, <code>CORREL()</code> throws <code>#DIV/0!</code>.
      </p>
    </div>
    <div class="anti-pattern-card">
      <div class="anti-pattern-header">⚠️ Common Mistake vs. Gold Standard Solution</div>
      <div class="anti-pattern-body">
        <div class="anti-mistake">
          <strong>Anti-Pattern:</strong> Attempting to correlate non-numeric data or passing single columns: <code>=CORREL(F2:F26)</code>, which throws a formula syntax or argument count error.
        </div>
        <div class="anti-solution">
          <strong>Gold Standard:</strong> Supply two distinct paired numerical vectors: <code>=CORREL(Campaign_Performance!F2:F26, Campaign_Performance!J2:J26)</code>.
        </div>
      </div>
    </div>
  </div>
</section>
`
    }
  ],

  // ═══════════════ INITIAL WORKBOOK DATA (25 CAMPAIGNS + BENCHMARKS + TARGETS) ════
  initialWorkbook: {
    "Campaign_Performance": [
      ["Campaign ID", "Campaign Name", "Channel", "Region", "Launch Date Serial", "Ad Spend", "Impressions", "Clicks", "Conversions", "Revenue", "Quality Score"],
      ["CMP-101", "Google Search - Brand Core", "Paid Search", "North America", 46028, 12000, 420000, 18500, 620, 48000, 9],
      ["CMP-102", "Meta Feed - Retargeting Pro", "Paid Social", "North America", 46035, 18500, 650000, 22000, 710, 59200, 8],
      ["CMP-103", "Google Search - NonBrand High", "Paid Search", "EMEA", 46042, 28000, 890000, 29000, 840, 78400, 7],
      ["CMP-104", "YouTube - TrueView InStream", "Video", "North America", 46049, 15000, 1100000, 16500, 390, 37500, 8],
      ["CMP-105", "Display - GDN Prospecting", "Display", "APAC", 46056, 9500, 920000, 11000, 210, 18050, 6],
      ["CMP-106", "LinkedIn - Enterprise B2B", "Paid Social", "North America", 46063, 32000, 410000, 14200, 520, 89600, 9],
      ["CMP-107", "Google Search - Competitor", "Paid Search", "North America", 46070, 22500, 680000, 24000, 680, 67500, 8],
      ["CMP-108", "Meta Story - Lookalike 1%", "Paid Social", "EMEA", 46077, 16000, 720000, 21000, 630, 49600, 8],
      ["CMP-109", "TikTok - Spark Ads Viral", "Paid Social", "APAC", 46084, 14000, 1350000, 34000, 420, 39200, 7],
      ["CMP-110", "Google Search - Local Store", "Paid Search", "North America", 46091, 11500, 390000, 15800, 490, 40250, 8],
      ["CMP-111", "Display - Programmatic Banner", "Display", "North America", 46098, 8000, 850000, 9800, 180, 14400, 6],
      ["CMP-112", "YouTube - Discovery Shorts", "Video", "EMEA", 46105, 13500, 980000, 19200, 360, 33750, 8],
      ["CMP-113", "Google Search - Spring Promo", "Paid Search", "APAC", 46110, 24000, 760000, 26500, 750, 74400, 8],
      ["CMP-114", "Meta Feed - Dynamic Catalog", "Paid Social", "North America", 46120, 21000, 810000, 25000, 720, 65100, 9],
      ["CMP-115", "Google Search - Category Expansion", "Paid Search", "EMEA", 46132, 26000, 840000, 27000, 790, 75400, 8],
      ["CMP-116", "Display - Remarketing Segment", "Display", "EMEA", 46145, 10500, 780000, 10500, 240, 22050, 7],
      ["CMP-117", "YouTube - Brand Awareness", "Video", "North America", 46160, 19000, 1400000, 22500, 450, 47500, 8],
      ["CMP-118", "LinkedIn - Tech Decision Makers", "Paid Social", "EMEA", 46175, 29000, 380000, 13500, 480, 81200, 8],
      ["CMP-119", "Google Search - Flash Sale", "Paid Search", "North America", 46190, 35000, 950000, 35000, 1100, 112000, 9],
      ["CMP-120", "TikTok - Creator Collab", "Paid Social", "North America", 46205, 36000, 1200000, 31000, 950, 133200, 8],
      ["CMP-121", "Display - Contextual Tech", "Display", "APAC", 46220, 7500, 690000, 8900, 160, 13500, 6],
      ["CMP-122", "YouTube - Action Conversions", "Video", "APAC", 46235, 16500, 1050000, 18000, 420, 42900, 7],
      ["CMP-123", "Meta Reels - Summer Engagement", "Paid Social", "APAC", 46250, 15500, 890000, 23500, 610, 44950, 8],
      ["CMP-124", "Google Search - Q3 Acceleration", "Paid Search", "North America", 46268, 38000, 1020000, 37000, 1250, 125400, 9],
      ["CMP-125", "LinkedIn - Growth Series", "Paid Social", "North America", 46285, 27000, 360000, 12800, 460, 72900, 8]
    ],
    "Channel_Benchmarks": [
      ["Channel", "Target ROAS", "Benchmark CVR %", "Benchmark CPC ($)", "Lead Quality Tier"],
      ["Paid Search", 3.20, 0.035, 1.25, "Tier 1"],
      ["Paid Social", 2.80, 0.028, 0.85, "Tier 1"],
      ["Video",       2.50, 0.020, 0.95, "Tier 2"],
      ["Display",     1.80, 0.015, 0.65, "Tier 3"],
      ["Email",       4.50, 0.050, 0.40, "Tier 1"]
    ],
    "KPI_Analytics": [
      ["Digital Marketing Performance Metric / KPI", "Formula Result"],
      ["Median Campaign Ad Spend Across All Channels", ""],
      ["Median Conversions Generated Across All Campaigns", ""],
      ["Most Common (Modal) Lead Quality Score", ""],
      ["Highest Conversion Count for Paid Search Campaigns", ""],
      ["Lowest Ad Spend for Paid Social Campaigns", ""],
      ["Maximum Revenue Generated in North America Region", ""],
      ["Highest Revenue for North American Paid Search", ""],
      ["Minimum Paid Social Ad Spend with 500+ Conversions", ""],
      ["Total Portfolio Ad Spend Excluding Display Channel", ""],
      ["Highest Revenue from Non-Display Campaigns", ""],
      ["Total Number of Search Campaigns (Wildcard *Search*)", ""],
      ["Total Revenue Generated by Search Campaigns (Wildcard)", ""],
      ["Total Ad Spend Invested in Q1 2026 Launches", ""],
      ["Highest Revenue Generated by a Q1 2026 Launch", ""],
      ["Sample Standard Deviation of Campaign Ad Spend", ""],
      ["Sample Standard Deviation of Campaign Revenue", ""],
      ["75th Percentile (Top Quartile) Campaign Revenue", ""],
      ["90th Percentile Campaign Conversion Threshold", ""],
      ["Pearson Correlation Between Ad Spend and Revenue", ""],
      ["Capstone: Max Revenue for Non-Display Q1 Campaigns with Spend <= $20k", ""]
    ]
  },

  initialAuxiliary: {
    "Channel_Benchmarks": {
      "G1": "Q1 Start Serial",
      "H1": 46023,
      "G2": "Q1 End Serial",
      "H2": 46112
    },
    "KPI_Analytics": {
      "C1": "Target Benchmarks"
    }
  },

  // ═══════════════ 20 CHALLENGES (6 EASY, 8 MEDIUM, 6 HARD) ═══════════════
  challenges: [
    {
      id: "c01",
      number: 1,
      title: "Median Campaign Ad Spend (MEDIAN)",
      prompt: "In sheet <code>KPI_Analytics</code> cell <strong>B2</strong>, to establish an outlier-resistant baseline for marketing capital allocation, calculate the median advertising expenditure across all 25 campaigns in <code>Campaign_Performance!F2:F26</code> using <code>=MEDIAN()</code>.",
      targetSheet: "KPI_Analytics",
      targetCell: "B2",
      expectedFormulaPrefix: "=MEDIAN",
      solution: "=MEDIAN(Campaign_Performance!F2:F26)",
      expectedValue: 18500,
      tolerance: 0.01,
      bloom: "apply",
      difficulty: "easy",
      xp: 75,
      marks: 1.0,
      hint: "Use =MEDIAN(Campaign_Performance!F2:F26)",
      check: {
        expected: 18500,
        tolerance: 0.01,
        mustUseAnyOf: [["MEDIAN"]],
        mustReference: ["Campaign_Performance!F2:F26"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["F"],
        params: ["Range: Campaign_Performance!F2:F26"],
        previewRows: 25,
        summary: "Calculates the 50th percentile midpoint spend of $18,500, providing an outlier-resistant central baseline."
      },
      commonMistakes: [
        { mistake: '=AVERAGE(Campaign_Performance!F2:F26)', why: "Computes the arithmetic mean rather than the median.", fix: "Use =MEDIAN(Campaign_Performance!F2:F26)." }
      ]
    },
    {
      id: "c02",
      number: 2,
      title: "Median Campaign Conversions (MEDIAN)",
      prompt: "In sheet <code>KPI_Analytics</code> cell <strong>B3</strong>, to benchmark expected campaign conversion volume free from skewing extreme outliers, compute the median customer conversions across <code>Campaign_Performance!I2:I26</code> using <code>=MEDIAN()</code>.",
      targetSheet: "KPI_Analytics",
      targetCell: "B3",
      expectedFormulaPrefix: "=MEDIAN",
      solution: "=MEDIAN(Campaign_Performance!I2:I26)",
      expectedValue: 520,
      tolerance: 0.01,
      bloom: "apply",
      difficulty: "easy",
      xp: 75,
      marks: 1.0,
      hint: "Use =MEDIAN(Campaign_Performance!I2:I26)",
      check: {
        expected: 520,
        tolerance: 0.01,
        mustUseAnyOf: [["MEDIAN"]],
        mustReference: ["Campaign_Performance!I2:I26"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["I"],
        params: ["Range: Campaign_Performance!I2:I26"],
        previewRows: 25,
        summary: "Calculates the median conversion volume across the portfolio (520 conversions)."
      },
      commonMistakes: [
        { mistake: '=AVERAGE(Campaign_Performance!I2:I26)', why: "Returns the mean instead of the median.", fix: "Use =MEDIAN(Campaign_Performance!I2:I26)." }
      ]
    },
    {
      id: "c03",
      number: 3,
      title: "Most Common Lead Quality Score (MODE.SNGL)",
      prompt: "In sheet <code>KPI_Analytics</code> cell <strong>B4</strong>, to determine the most common lead quality tier delivered to sales pipeline reps, calculate the statistical mode of quality scores in <code>Campaign_Performance!K2:K26</code> using <code>=MODE.SNGL()</code>.",
      targetSheet: "KPI_Analytics",
      targetCell: "B4",
      expectedFormulaPrefix: "=MODE.SNGL",
      solution: "=MODE.SNGL(Campaign_Performance!K2:K26)",
      expectedValue: 8,
      tolerance: 0,
      bloom: "apply",
      difficulty: "easy",
      xp: 75,
      marks: 1.0,
      hint: "Use =MODE.SNGL(Campaign_Performance!K2:K26)",
      check: {
        expected: 8,
        tolerance: 0,
        mustUseAnyOf: [["MODE.SNGL", "MODE"]],
        mustReference: ["Campaign_Performance!K2:K26"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["K"],
        params: ["Range: Campaign_Performance!K2:K26"],
        previewRows: 25,
        summary: "Identifies the unimodal discrete score (Score 8) with the highest frequency."
      },
      commonMistakes: [
        { mistake: '=MEDIAN(Campaign_Performance!K2:K26)', why: "Calculates the median rather than the statistical mode.", fix: "Use =MODE.SNGL(Campaign_Performance!K2:K26)." }
      ]
    },
    {
      id: "c04",
      number: 4,
      title: "Maximum Paid Search Conversions (MAXIFS)",
      prompt: "In sheet <code>KPI_Analytics</code> cell <strong>B5</strong>, to identify ceiling customer acquisition capacity in direct intent channels, find the maximum conversion count in <code>Campaign_Performance!I2:I26</code> where channel in <code>Campaign_Performance!C2:C26</code> equals <code>\"Paid Search\"</code> using <code>=MAXIFS()</code>.",
      targetSheet: "KPI_Analytics",
      targetCell: "B5",
      expectedFormulaPrefix: "=MAXIFS",
      solution: '=MAXIFS(Campaign_Performance!I2:I26, Campaign_Performance!C2:C26, "Paid Search")',
      expectedValue: 1250,
      tolerance: 0,
      bloom: "apply",
      difficulty: "easy",
      xp: 75,
      marks: 1.0,
      hint: 'Use =MAXIFS(Campaign_Performance!I2:I26, Campaign_Performance!C2:C26, "Paid Search")',
      check: {
        expected: 1250,
        tolerance: 0,
        mustUseAnyOf: [["MAXIFS"]],
        mustReference: ["Campaign_Performance!I2:I26", "Campaign_Performance!C2:C26"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["C", "I"],
        params: ["Channel: Paid Search"],
        previewRows: 25,
        summary: "Extracts 1,250 conversions (CMP-124 Q3 Acceleration), the peak search performance."
      },
      commonMistakes: [
        { mistake: '=MAX(Campaign_Performance!I2:I26)', why: "Computes overall maximum without filtering for Paid Search.", fix: 'Use =MAXIFS(Campaign_Performance!I2:I26, Campaign_Performance!C2:C26, "Paid Search").' }
      ]
    },
    {
      id: "c05",
      number: 5,
      title: "Minimum Paid Social Ad Spend (MINIFS)",
      prompt: "In sheet <code>KPI_Analytics</code> cell <strong>B6</strong>, to evaluate the minimum viable testing budget for social ad campaigns, determine the lowest ad spend in <code>Campaign_Performance!F2:F26</code> where channel in <code>Campaign_Performance!C2:C26</code> equals <code>\"Paid Social\"</code> using <code>=MINIFS()</code>.",
      targetSheet: "KPI_Analytics",
      targetCell: "B6",
      expectedFormulaPrefix: "=MINIFS",
      solution: '=MINIFS(Campaign_Performance!F2:F26, Campaign_Performance!C2:C26, "Paid Social")',
      expectedValue: 14000,
      tolerance: 0,
      bloom: "apply",
      difficulty: "easy",
      xp: 75,
      marks: 1.0,
      hint: 'Use =MINIFS(Campaign_Performance!F2:F26, Campaign_Performance!C2:C26, "Paid Social")',
      check: {
        expected: 14000,
        tolerance: 0,
        mustUseAnyOf: [["MINIFS"]],
        mustReference: ["Campaign_Performance!F2:F26", "Campaign_Performance!C2:C26"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["C", "F"],
        params: ["Channel: Paid Social"],
        previewRows: 25,
        summary: "Finds the lowest entry spend ($14,000 for CMP-109 TikTok Spark Ads)."
      },
      commonMistakes: [
        { mistake: '=MIN(Campaign_Performance!F2:F26)', why: "Evaluates overall minimum across all channels ($7,500 Display) instead of Paid Social.", fix: 'Use =MINIFS(Campaign_Performance!F2:F26, Campaign_Performance!C2:C26, "Paid Social").' }
      ]
    },
    {
      id: "c06",
      number: 6,
      title: "Peak North American Campaign Revenue (MAXIFS)",
      prompt: "In sheet <code>KPI_Analytics</code> cell <strong>B7</strong>, to pinpoint peak revenue production across domestic territory campaigns, identify the maximum revenue in <code>Campaign_Performance!J2:J26</code> where region in <code>Campaign_Performance!D2:D26</code> equals <code>\"North America\"</code> using <code>=MAXIFS()</code>.",
      targetSheet: "KPI_Analytics",
      targetCell: "B7",
      expectedFormulaPrefix: "=MAXIFS",
      solution: '=MAXIFS(Campaign_Performance!J2:J26, Campaign_Performance!D2:D26, "North America")',
      expectedValue: 133200,
      tolerance: 0,
      bloom: "apply",
      difficulty: "easy",
      xp: 75,
      marks: 1.0,
      hint: 'Use =MAXIFS(Campaign_Performance!J2:J26, Campaign_Performance!D2:D26, "North America")',
      check: {
        expected: 133200,
        tolerance: 0,
        mustUseAnyOf: [["MAXIFS"]],
        mustReference: ["Campaign_Performance!J2:J26", "Campaign_Performance!D2:D26"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["D", "J"],
        params: ["Region: North America"],
        previewRows: 25,
        summary: "Extracts $133,200 revenue (CMP-120 Creator Collab), the top North American return."
      },
      commonMistakes: [
        { mistake: '=MAX(Campaign_Performance!J2:J26)', why: "Computes global maximum without filtering by region.", fix: 'Use =MAXIFS(Campaign_Performance!J2:J26, Campaign_Performance!D2:D26, "North America").' }
      ]
    },
    {
      id: "c07",
      number: 7,
      title: "Dual-Condition Search Revenue in North America (MAXIFS)",
      prompt: "In sheet <code>KPI_Analytics</code> cell <strong>B8</strong>, to evaluate top commercial performance in high-intent domestic channels, calculate the maximum revenue in <code>Campaign_Performance!J2:J26</code> where channel in <code>Campaign_Performance!C2:C26</code> is <code>\"Paid Search\"</code> AND region in <code>Campaign_Performance!D2:D26</code> is <code>\"North America\"</code> using <code>=MAXIFS()</code>.",
      targetSheet: "KPI_Analytics",
      targetCell: "B8",
      expectedFormulaPrefix: "=MAXIFS",
      solution: '=MAXIFS(Campaign_Performance!J2:J26, Campaign_Performance!C2:C26, "Paid Search", Campaign_Performance!D2:D26, "North America")',
      expectedValue: 125400,
      tolerance: 0,
      bloom: "analyze",
      difficulty: "medium",
      xp: 75,
      marks: 1.0,
      hint: 'Use =MAXIFS(Campaign_Performance!J2:J26, Campaign_Performance!C2:C26, "Paid Search", Campaign_Performance!D2:D26, "North America")',
      check: {
        expected: 125400,
        tolerance: 0,
        mustUseAnyOf: [["MAXIFS"]],
        mustReference: ["Campaign_Performance!J2:J26", "Campaign_Performance!C2:C26", "Campaign_Performance!D2:D26"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["C", "D", "J"],
        params: ["Channel: Paid Search", "Region: North America"],
        previewRows: 25,
        summary: "Evaluates multi-condition conjunction, returning $125,400 (CMP-124 Q3 Acceleration)."
      },
      commonMistakes: [
        { mistake: '=MAXIFS(Campaign_Performance!J2:J26, Campaign_Performance!C2:C26, "Paid Search")', why: "Omits the second criteria for Region North America.", fix: 'Add Campaign_Performance!D2:D26, "North America" as the second criteria pair.' }
      ]
    },
    {
      id: "c08",
      number: 8,
      title: "Minimum Paid Social Spend with 500+ Conversions (MINIFS)",
      prompt: "In sheet <code>KPI_Analytics</code> cell <strong>B9</strong>, to establish capital efficiency benchmarks for high-volume social initiatives, find the minimum ad spend in <code>Campaign_Performance!F2:F26</code> where channel in <code>Campaign_Performance!C2:C26</code> equals <code>\"Paid Social\"</code> AND conversions in <code>Campaign_Performance!I2:I26</code> are <code>\">=500\"</code> using <code>=MINIFS()</code>.",
      targetSheet: "KPI_Analytics",
      targetCell: "B9",
      expectedFormulaPrefix: "=MINIFS",
      solution: '=MINIFS(Campaign_Performance!F2:F26, Campaign_Performance!C2:C26, "Paid Social", Campaign_Performance!I2:I26, ">=500")',
      expectedValue: 15500,
      tolerance: 0,
      bloom: "analyze",
      difficulty: "medium",
      xp: 75,
      marks: 1.0,
      hint: 'Use =MINIFS(Campaign_Performance!F2:F26, Campaign_Performance!C2:C26, "Paid Social", Campaign_Performance!I2:I26, ">=500")',
      check: {
        expected: 15500,
        tolerance: 0,
        mustUseAnyOf: [["MINIFS"]],
        mustReference: ["Campaign_Performance!F2:F26", "Campaign_Performance!C2:C26", "Campaign_Performance!I2:I26"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["C", "F", "I"],
        params: ["Channel: Paid Social", "Conversions: >=500"],
        previewRows: 25,
        summary: "Filters out low-volume campaigns to find the $15,500 minimum spend (CMP-123)."
      },
      commonMistakes: [
        { mistake: '=MINIFS(Campaign_Performance!F2:F26, Campaign_Performance!C2:C26, "Paid Social")', why: "Forgets the conversion threshold (>=500), returning $14,000.", fix: 'Add criteria pair Campaign_Performance!I2:I26, ">=500".' }
      ]
    },
    {
      id: "c09",
      number: 9,
      title: "Total Ad Spend Excluding Display Channel (SUMIFS with <>)",
      prompt: "In sheet <code>KPI_Analytics</code> cell <strong>B10</strong>, to measure total capital deployed into active direct-response marketing channels, sum ad spend in <code>Campaign_Performance!F2:F26</code> where channel in <code>Campaign_Performance!C2:C26</code> does not equal Display using <code>=SUMIFS()</code> with criteria <code>\"<>Display\"</code>.",
      targetSheet: "KPI_Analytics",
      targetCell: "B10",
      expectedFormulaPrefix: "=SUMIFS",
      solution: '=SUMIFS(Campaign_Performance!F2:F26, Campaign_Performance!C2:C26, "<>Display")',
      expectedValue: 470000,
      tolerance: 0,
      bloom: "analyze",
      difficulty: "medium",
      xp: 75,
      marks: 1.0,
      hint: 'Use =SUMIFS(Campaign_Performance!F2:F26, Campaign_Performance!C2:C26, "<>Display")',
      check: {
        expected: 470000,
        tolerance: 0,
        mustUseAnyOf: [["SUMIFS"]],
        mustReference: ["Campaign_Performance!F2:F26", "Campaign_Performance!C2:C26"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["C", "F"],
        params: ["Channel: <>Display"],
        previewRows: 25,
        summary: "Sums non-Display spend across Paid Search, Paid Social, and Video ($470,000)."
      },
      commonMistakes: [
        { mistake: '=SUMIFS(Campaign_Performance!F2:F26, Campaign_Performance!C2:C26, "!=Display")', why: "Uses SQL operator != instead of Excel <>.", fix: 'Use "<>Display" inside SUMIFS.' }
      ]
    },
    {
      id: "c10",
      number: 10,
      title: "Maximum Revenue Excluding Display (MAXIFS with <>)",
      prompt: "In sheet <code>KPI_Analytics</code> cell <strong>B11</strong>, to discover peak revenue generation across active direct-engagement media, find the maximum revenue in <code>Campaign_Performance!J2:J26</code> where channel in <code>Campaign_Performance!C2:C26</code> is not Display using <code>=MAXIFS()</code> with criteria <code>\"<>Display\"</code>.",
      targetSheet: "KPI_Analytics",
      targetCell: "B11",
      expectedFormulaPrefix: "=MAXIFS",
      solution: '=MAXIFS(Campaign_Performance!J2:J26, Campaign_Performance!C2:C26, "<>Display")',
      expectedValue: 133200,
      tolerance: 0,
      bloom: "analyze",
      difficulty: "medium",
      xp: 75,
      marks: 1.0,
      hint: 'Use =MAXIFS(Campaign_Performance!J2:J26, Campaign_Performance!C2:C26, "<>Display")',
      check: {
        expected: 133200,
        tolerance: 0,
        mustUseAnyOf: [["MAXIFS"]],
        mustReference: ["Campaign_Performance!J2:J26", "Campaign_Performance!C2:C26"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["C", "J"],
        params: ["Channel: <>Display"],
        previewRows: 25,
        summary: "Extracts the peak revenue of $133,200 from non-Display marketing assets."
      },
      commonMistakes: [
        { mistake: '=MAX(Campaign_Performance!J2:J26)', why: "Does not exclude Display channel.", fix: 'Use =MAXIFS(Campaign_Performance!J2:J26, Campaign_Performance!C2:C26, "<>Display").' }
      ]
    },
    {
      id: "c11",
      number: 11,
      title: "Search Campaign Count via Wildcard (COUNTIFS)",
      prompt: "In sheet <code>KPI_Analytics</code> cell <strong>B12</strong>, to audit portfolio inventory of intent-driven search initiatives, count the number of campaigns in <code>Campaign_Performance!B2:B26</code> containing the keyword substring <code>\"*Search*\"</code> using <code>=COUNTIFS()</code>.",
      targetSheet: "KPI_Analytics",
      targetCell: "B12",
      expectedFormulaPrefix: "=COUNTIFS",
      solution: '=COUNTIFS(Campaign_Performance!B2:B26, "*Search*")',
      expectedValue: 8,
      tolerance: 0,
      bloom: "analyze",
      difficulty: "medium",
      xp: 75,
      marks: 1.0,
      hint: 'Use =COUNTIFS(Campaign_Performance!B2:B26, "*Search*")',
      check: {
        expected: 8,
        tolerance: 0,
        mustUseAnyOf: [["COUNTIFS"]],
        mustReference: ["Campaign_Performance!B2:B26"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["B"],
        params: ["Name Pattern: *Search*"],
        previewRows: 25,
        summary: "Identifies exactly 8 campaigns containing Search in their campaign taxonomy."
      },
      commonMistakes: [
        { mistake: '=COUNTIFS(Campaign_Performance!B2:B26, "Search")', why: "Omits asterisks, looking for exact text match 'Search' which yields 0.", fix: 'Wrap Search in asterisks: "*Search*".' }
      ]
    },
    {
      id: "c12",
      number: 12,
      title: "Search Campaign Total Revenue (SUMIFS Wildcard)",
      prompt: "In sheet <code>KPI_Analytics</code> cell <strong>B13</strong>, to calculate aggregate revenue attribution for search marketing initiatives across brands, sum gross revenue in <code>Campaign_Performance!J2:J26</code> where campaign name in <code>Campaign_Performance!B2:B26</code> matches wildcard pattern <code>\"*Search*\"</code> using <code>=SUMIFS()</code>.",
      targetSheet: "KPI_Analytics",
      targetCell: "B13",
      expectedFormulaPrefix: "=SUMIFS",
      solution: '=SUMIFS(Campaign_Performance!J2:J26, Campaign_Performance!B2:B26, "*Search*")',
      expectedValue: 621350,
      tolerance: 0,
      bloom: "analyze",
      difficulty: "medium",
      xp: 75,
      marks: 1.0,
      hint: 'Use =SUMIFS(Campaign_Performance!J2:J26, Campaign_Performance!B2:B26, "*Search*")',
      check: {
        expected: 621350,
        tolerance: 0,
        mustUseAnyOf: [["SUMIFS"]],
        mustReference: ["Campaign_Performance!J2:J26", "Campaign_Performance!B2:B26"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["B", "J"],
        params: ["Name Pattern: *Search*"],
        previewRows: 25,
        summary: "Aggregates $621,350 total gross revenue across all 8 search campaigns."
      },
      commonMistakes: [
        { mistake: '=SUMIFS(Campaign_Performance!J2:J26, Campaign_Performance!B2:B26, "Search")', why: "Missing wildcards returns $0 because no campaign name is solely 'Search'.", fix: 'Use "*Search*" as criteria.' }
      ]
    },
    {
      id: "c13",
      number: 13,
      title: "Q1 2026 Total Ad Spend (Two-Sided Date SUMIFS)",
      prompt: "In sheet <code>KPI_Analytics</code> cell <strong>B14</strong>, to audit first-quarter marketing budget burn across the portfolio, sum ad spend in <code>Campaign_Performance!F2:F26</code> where launch date serials in <code>Campaign_Performance!E2:E26</code> fall within Q1 2026 bounds (<code>\">=46023\"</code> and <code>\"<=46112\"</code>) using <code>=SUMIFS()</code>.",
      targetSheet: "KPI_Analytics",
      targetCell: "B14",
      expectedFormulaPrefix: "=SUMIFS",
      solution: '=SUMIFS(Campaign_Performance!F2:F26, Campaign_Performance!E2:E26, ">=46023", Campaign_Performance!E2:E26, "<=46112")',
      expectedValue: 224500,
      tolerance: 0,
      bloom: "analyze",
      difficulty: "medium",
      xp: 75,
      marks: 1.0,
      hint: 'Use =SUMIFS(Campaign_Performance!F2:F26, Campaign_Performance!E2:E26, ">=46023", Campaign_Performance!E2:E26, "<=46112")',
      check: {
        expected: 224500,
        tolerance: 0,
        mustUseAnyOf: [["SUMIFS"]],
        mustReference: ["Campaign_Performance!F2:F26", "Campaign_Performance!E2:E26"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["E", "F"],
        params: ["Date >= 46023", "Date <= 46112"],
        previewRows: 25,
        summary: "Sums $224,500 total Q1 marketing capital invested between Jan 1 and Mar 31, 2026."
      },
      commonMistakes: [
        { mistake: '=SUMIFS(Campaign_Performance!F2:F26, Campaign_Performance!E2:E26, ">=46023")', why: "Only specifies lower bound, summing all subsequent quarters as well.", fix: 'Add upper bound Campaign_Performance!E2:E26, "<=46112".' }
      ]
    },
    {
      id: "c14",
      number: 14,
      title: "Q1 2026 Peak Campaign Revenue (Date-Bounded MAXIFS)",
      prompt: "In sheet <code>KPI_Analytics</code> cell <strong>B15</strong>, to discover peak campaign revenue generated by initiatives launched during the Q1 cycle, find the maximum revenue in <code>Campaign_Performance!J2:J26</code> where launch dates in <code>Campaign_Performance!E2:E26</code> are between <code>\">=46023\"</code> and <code>\"<=46112\"</code> using <code>=MAXIFS()</code>.",
      targetSheet: "KPI_Analytics",
      targetCell: "B15",
      expectedFormulaPrefix: "=MAXIFS",
      solution: '=MAXIFS(Campaign_Performance!J2:J26, Campaign_Performance!E2:E26, ">=46023", Campaign_Performance!E2:E26, "<=46112")',
      expectedValue: 89600,
      tolerance: 0,
      bloom: "analyze",
      difficulty: "medium",
      xp: 75,
      marks: 1.0,
      hint: 'Use =MAXIFS(Campaign_Performance!J2:J26, Campaign_Performance!E2:E26, ">=46023", Campaign_Performance!E2:E26, "<=46112")',
      check: {
        expected: 89600,
        tolerance: 0,
        mustUseAnyOf: [["MAXIFS"]],
        mustReference: ["Campaign_Performance!J2:J26", "Campaign_Performance!E2:E26"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["E", "J"],
        params: ["Date >= 46023", "Date <= 46112"],
        previewRows: 25,
        summary: "Extracts $89,600 (CMP-106 LinkedIn B2B), the peak revenue launch in Q1."
      },
      commonMistakes: [
        { mistake: '=MAX(Campaign_Performance!J2:J26)', why: "Pulls overall peak revenue ($133,200 in Q3) instead of Q1.", fix: 'Use =MAXIFS with date criteria ">=46023" and "<=46112".' }
      ]
    },
    {
      id: "c15",
      number: 15,
      title: "Sample Standard Deviation of Ad Spend (STDEV.S)",
      prompt: "In sheet <code>KPI_Analytics</code> cell <strong>B16</strong>, to quantify capital allocation volatility and budget dispersion across portfolio initiatives, calculate the sample standard deviation of ad spend in <code>Campaign_Performance!F2:F26</code> using <code>=STDEV.S()</code>.",
      targetSheet: "KPI_Analytics",
      targetCell: "B16",
      expectedFormulaPrefix: "=STDEV.S",
      solution: "=STDEV.S(Campaign_Performance!F2:F26)",
      expectedValue: 9112.81,
      tolerance: 0.1,
      bloom: "evaluate",
      difficulty: "hard",
      xp: 75,
      marks: 1.0,
      hint: "Use =STDEV.S(Campaign_Performance!F2:F26)",
      check: {
        expected: 9112.81,
        tolerance: 0.1,
        mustUseAnyOf: [["STDEV.S", "STDEV"]],
        mustReference: ["Campaign_Performance!F2:F26"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["F"],
        params: ["Range: Campaign_Performance!F2:F26"],
        previewRows: 25,
        summary: "Quantifies spend volatility with Bessel's correction ($9,112.81 sample dispersion)."
      },
      commonMistakes: [
        { mistake: '=STDEV.P(Campaign_Performance!F2:F26)', why: "Uses population standard deviation (divides by N instead of N-1).", fix: "Use =STDEV.S(Campaign_Performance!F2:F26)." }
      ]
    },
    {
      id: "c16",
      number: 16,
      title: "Sample Standard Deviation of Campaign Revenue (STDEV.S)",
      prompt: "In sheet <code>KPI_Analytics</code> cell <strong>B17</strong>, to measure top-line revenue variability and return unpredictability across marketing campaigns, compute the sample standard deviation of gross revenue in <code>Campaign_Performance!J2:J26</code> using <code>=STDEV.S()</code>.",
      targetSheet: "KPI_Analytics",
      targetCell: "B17",
      expectedFormulaPrefix: "=STDEV.S",
      solution: "=STDEV.S(Campaign_Performance!J2:J26)",
      expectedValue: 32324.17,
      tolerance: 0.1,
      bloom: "evaluate",
      difficulty: "hard",
      xp: 75,
      marks: 1.0,
      hint: "Use =STDEV.S(Campaign_Performance!J2:J26)",
      check: {
        expected: 32324.17,
        tolerance: 0.1,
        mustUseAnyOf: [["STDEV.S", "STDEV"]],
        mustReference: ["Campaign_Performance!J2:J26"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["J"],
        params: ["Range: Campaign_Performance!J2:J26"],
        previewRows: 25,
        summary: "Measures gross revenue volatility ($32,324.17 sample standard deviation)."
      },
      commonMistakes: [
        { mistake: '=STDEV.P(Campaign_Performance!J2:J26)', why: "Uses population variance rather than sample variance.", fix: "Use =STDEV.S(Campaign_Performance!J2:J26)." }
      ]
    },
    {
      id: "c17",
      number: 17,
      title: "75th Percentile Revenue Benchmark (PERCENTILE.INC)",
      prompt: "In sheet <code>KPI_Analytics</code> cell <strong>B18</strong>, to establish an empirical top-quartile revenue benchmark for elite campaign classification, compute the 75th percentile of gross revenue in <code>Campaign_Performance!J2:J26</code> using <code>=PERCENTILE.INC(Campaign_Performance!J2:J26, 0.75)</code>.",
      targetSheet: "KPI_Analytics",
      targetCell: "B18",
      expectedFormulaPrefix: "=PERCENTILE.INC",
      solution: "=PERCENTILE.INC(Campaign_Performance!J2:J26, 0.75)",
      expectedValue: 75400,
      tolerance: 0.01,
      bloom: "evaluate",
      difficulty: "hard",
      xp: 75,
      marks: 1.0,
      hint: "Use =PERCENTILE.INC(Campaign_Performance!J2:J26, 0.75)",
      check: {
        expected: 75400,
        tolerance: 0.01,
        mustUseAnyOf: [["PERCENTILE.INC", "PERCENTILE"]],
        mustReference: ["Campaign_Performance!J2:J26"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["J"],
        params: ["k: 0.75"],
        previewRows: 25,
        summary: "Determines the $75,400 top-quartile revenue threshold for high-performing campaigns."
      },
      commonMistakes: [
        { mistake: '=PERCENTILE.INC(Campaign_Performance!J2:J26, 75)', why: "Passes 75 instead of decimal 0.75, triggering #NUM!.", fix: "Use 0.75 for the k argument." }
      ]
    },
    {
      id: "c18",
      number: 18,
      title: "90th Percentile Conversion Threshold (PERCENTILE.INC)",
      prompt: "In sheet <code>KPI_Analytics</code> cell <strong>B19</strong>, to establish the top-decile performance threshold for conversion scale, determine the 90th percentile of conversion counts in <code>Campaign_Performance!I2:I26</code> using <code>=PERCENTILE.INC(Campaign_Performance!I2:I26, 0.9)</code>.",
      targetSheet: "KPI_Analytics",
      targetCell: "B19",
      expectedFormulaPrefix: "=PERCENTILE.INC",
      solution: "=PERCENTILE.INC(Campaign_Performance!I2:I26, 0.9)",
      expectedValue: 906,
      tolerance: 0.01,
      bloom: "evaluate",
      difficulty: "hard",
      xp: 75,
      marks: 1.0,
      hint: "Use =PERCENTILE.INC(Campaign_Performance!I2:I26, 0.9)",
      check: {
        expected: 906,
        tolerance: 0.01,
        mustUseAnyOf: [["PERCENTILE.INC", "PERCENTILE"]],
        mustReference: ["Campaign_Performance!I2:I26"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["I"],
        params: ["k: 0.90"],
        previewRows: 25,
        summary: "Calculates the 90th percentile conversion threshold (906 conversions) via linear interpolation."
      },
      commonMistakes: [
        { mistake: '=PERCENTILE.INC(Campaign_Performance!I2:I26, 90)', why: "Passes whole number 90 which causes #NUM! error.", fix: "Supply 0.9 as the percentile fraction." }
      ]
    },
    {
      id: "c19",
      number: 19,
      title: "Correlation Between Ad Spend and Revenue (CORREL)",
      prompt: "In sheet <code>KPI_Analytics</code> cell <strong>B20</strong>, to evaluate overall capital allocation efficiency and validate that higher ad spend drives proportional returns, compute Pearson's correlation coefficient between ad spend (<code>Campaign_Performance!F2:F26</code>) and revenue (<code>Campaign_Performance!J2:J26</code>) using <code>=CORREL()</code>.",
      targetSheet: "KPI_Analytics",
      targetCell: "B20",
      expectedFormulaPrefix: "=CORREL",
      solution: "=CORREL(Campaign_Performance!F2:F26, Campaign_Performance!J2:J26)",
      expectedValue: 0.97,
      tolerance: 0.01,
      bloom: "evaluate",
      difficulty: "hard",
      xp: 75,
      marks: 1.0,
      hint: "Use =CORREL(Campaign_Performance!F2:F26, Campaign_Performance!J2:J26)",
      check: {
        expected: 0.97,
        tolerance: 0.01,
        mustUseAnyOf: [["CORREL"]],
        mustReference: ["Campaign_Performance!F2:F26", "Campaign_Performance!J2:J26"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["F", "J"],
        params: ["Array1: Spend", "Array2: Revenue"],
        previewRows: 25,
        summary: "Computes Pearson's r (0.97), indicating near-perfect positive linear capital efficiency."
      },
      commonMistakes: [
        { mistake: '=CORREL(Campaign_Performance!F2:F26)', why: "Missing the second array argument.", fix: "Provide both spend and revenue vectors: =CORREL(Campaign_Performance!F2:F26, Campaign_Performance!J2:J26)." }
      ]
    },
    {
      id: "c20",
      number: 20,
      title: "Multi-Criteria Capstone: Controlled-Spend Q1 Peak Revenue (MAXIFS)",
      prompt: "In sheet <code>KPI_Analytics</code> cell <strong>B21</strong>, to discover peak revenue generated under constrained testing budgets for direct response channels, find the maximum revenue in <code>Campaign_Performance!J2:J26</code> where channel in <code>Campaign_Performance!C2:C26</code> is not Display (<code>\"<>Display\"</code>), launch dates in <code>Campaign_Performance!E2:E26</code> fall in Q1 (<code>\">=46023\"</code> and <code>\"<=46112\"</code>), and ad spend in <code>Campaign_Performance!F2:F26</code> is capped at <code>\"<=20000\"</code> using <code>=MAXIFS()</code>.",
      targetSheet: "KPI_Analytics",
      targetCell: "B21",
      expectedFormulaPrefix: "=MAXIFS",
      solution: '=MAXIFS(Campaign_Performance!J2:J26, Campaign_Performance!C2:C26, "<>Display", Campaign_Performance!E2:E26, ">=46023", Campaign_Performance!E2:E26, "<=46112", Campaign_Performance!F2:F26, "<=20000")',
      expectedValue: 59200,
      tolerance: 0,
      bloom: "create",
      difficulty: "hard",
      xp: 75,
      marks: 1.0,
      hint: 'Use =MAXIFS(Campaign_Performance!J2:J26, Campaign_Performance!C2:C26, "<>Display", Campaign_Performance!E2:E26, ">=46023", Campaign_Performance!E2:E26, "<=46112", Campaign_Performance!F2:F26, "<=20000")',
      check: {
        expected: 59200,
        tolerance: 0,
        mustUseAnyOf: [["MAXIFS"]],
        mustReference: ["Campaign_Performance!J2:J26", "Campaign_Performance!C2:C26", "Campaign_Performance!E2:E26", "Campaign_Performance!F2:F26"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["C", "E", "F", "J"],
        params: ["Channel <> Display", "Q1 2026", "Spend <= 20000"],
        previewRows: 25,
        summary: "Capstone multi-criteria query combining exclusion, date boundaries, and budget ceiling ($59,200 for CMP-102)."
      },
      commonMistakes: [
        { mistake: '=MAXIFS(Campaign_Performance!J2:J26, Campaign_Performance!C2:C26, "Display")', why: "Includes Display instead of excluding it with '<>Display'.", fix: 'Use "<>Display" to exclude Display.' }
      ]
    }
  ]
};
