// public/excel/content/excel-day-02.js
// Manodemy Excel Studio — Day 02 Curriculum Manifest & Challenges
// Enterprise Domain: MedVantage Care (Healthcare & Medical Supplies)
// Conforms to: MISSION SPECIFICATION v3.2 & MASTER ORCHESTRATION v2.1 (Schema v2.1)

if (!window.EXCEL_COURSE_CONTENT) window.EXCEL_COURSE_CONTENT = {};

window.EXCEL_COURSE_CONTENT['excelDay02'] = {
  day: 2,
  globalDay: 20,
  title: "Formatting, Sorting, Filtering and Sheet Views",
  description: "Master professional number and date formatting, freeze panes, multi-level sorting, AutoFilter queries, dynamic SUBTOTAL calculations, conditional formatting, and formula-driven view layers.",
  topics: [
    "01. Custom Number Formatting ($#,##0.00;($#,##0.00);\"-\")",
    "02. Percentage Formatting with Decimal Precision",
    "03. Custom Date Display Formats (YYYY-MM-DD, DD-MMM-YYYY)",
    "04. Freeze Panes (Header Row & Top/Left Split)",
    "05. Multi-Level Sorting (Primary + Secondary Sort Keys)",
    "06. AutoFilter with Custom Text & Number Criteria",
    "07. Conditional Formatting Data Bars & Color Scales",
    "08. Formula-Based Conditional Formatting (=$Col=\"Value\")",
    "09. Dynamic Filtered Aggregations: SUBTOTAL(9, Range)",
    "10. Text Formatting in Calculations: TEXT(Value, Format)"
  ],
  slides: [
    {
      title: "Formatting, Sorting, Filtering and Sheet Views",
      html: `
<section class="slide-section" id="sec01">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingCustomNumFormat">
    <span class="heading-num-box">01</span>
    <span class="heading-title-box">
      <span class="heading-icon">🔢</span>
      <span class="heading-title-text">Custom Number Formatting ($#,##0.00;($#,##0.00);"-")</span>
      <button class="audio-play-btn" data-track-idx="0" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p class="lead-text">Custom number formatting controls how raw numerical data is presented on screen without mutating underlying floating-point precision or breaking mathematical downstream calculations.</p>
    
    <div class="architecture-grid">
      <div class="arch-box">
        <h4>Positive Values</h4>
        <p>1st quadrant defines display for numbers &gt; 0. E.g. <code>$#,##0.00</code> formats <code>12500.5</code> as <code>$12,500.50</code>.</p>
      </div>
      <div class="arch-box">
        <h4>Negative Values</h4>
        <p>2nd quadrant handles numbers &lt; 0. E.g. <code>($#,##0.00)</code> formats <code>-450.2</code> as accounting brackets <code>($450.20)</code>.</p>
      </div>
      <div class="arch-box">
        <h4>Zero &amp; Text</h4>
        <p>3rd and 4th quadrants handle zeros and text. E.g. <code>"-"</code> replaces <code>0</code> with clean dashes for executive clarity.</p>
      </div>
    </div>

    <div class="table-responsive">
      <table class="reference-table">
        <thead>
          <tr>
            <th>Format Code Token</th>
            <th>Meaning &amp; Behavior</th>
            <th>Raw Input Value</th>
            <th>Formatted Display Output</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>#</code></td>
            <td>Optional digit placeholder; suppresses non-significant leading/trailing zeros</td>
            <td><code>45.2</code></td>
            <td><code>45.2</code></td>
          </tr>
          <tr>
            <td><code>0</code></td>
            <td>Required digit placeholder; forces padding with zeros when omitted</td>
            <td><code>5.4</code></td>
            <td><code>05.40</code> (with <code>00.00</code>)</td>
          </tr>
          <tr>
            <td><code>,</code></td>
            <td>Thousands grouping separator when placed between digit placeholders</td>
            <td><code>137780</code></td>
            <td><code>137,780</code></td>
          </tr>
          <tr>
            <td><code>$#,##0.00;($#,##0.00);"-"</code></td>
            <td>Wall Street standard 4-section financial accounting number format</td>
            <td><code>-1200</code> / <code>0</code></td>
            <td><code>($1,200.00)</code> / <code>-</code></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="keynote-box keynote-emerald">
      <strong>Analyst Takeaway:</strong> Number formatting alters visual pixels only. Excel formulas always calculate against underlying unrounded numbers, preventing accumulated rounding errors.
    </div>

    <div class="anti-pattern-card" style="margin-top:16px; border:1px solid rgba(239,68,68,0.3); border-left:4px solid #ef4444; border-radius:8px; padding:14px 18px; background:rgba(239,68,68,0.08);">
      <h4 style="margin:0 0 8px 0; color:#f87171; font-size:13.5px; font-weight:700;">⚠️ Anti-Pattern vs. Gold Standard Solution</h4>
      <p style="margin:0; font-size:12.5px; line-height:1.5; color:#cbd5e1;">
        <strong>Common Mistake:</strong> Manually typing dollar signs into cells (e.g. typing <code>"$45.00"</code>). This converts the entry into plain text strings, causing downstream <code>=SUM()</code> formulas to return <code>0</code> or <code>#VALUE!</code>.<br>
        <strong>Gold Standard:</strong> Enter pure numeric constants (<code>45</code>) and apply <code>$#,##0.00</code> custom formatting via ribbon or shortcut <kbd>Ctrl + Shift + $</kbd>.
      </p>
    </div>
  </div>
</section>

<section class="slide-section" id="sec02">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingPercentageFormat">
    <span class="heading-num-box">02</span>
    <span class="heading-title-box">
      <span class="heading-icon">📊</span>
      <span class="heading-title-text">Percentage Formatting with Decimal Precision</span>
      <button class="audio-play-btn" data-track-idx="1" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p class="lead-text">In spreadsheet modeling, percentages are floating-point fractions between <code>0.0</code> and <code>1.0</code> multiplied by 100 solely upon visual rendering. A profit margin of 25% is stored as <code>0.25</code>.</p>
    
    <div class="architecture-grid">
      <div class="arch-box">
        <h4>Whole Percent (0%)</h4>
        <p>Formats <code>0.8</code> as <code>80%</code>. Best for high-level executive summary cards and coarse KPI gauges.</p>
      </div>
      <div class="arch-box">
        <h4>One Decimal (0.0%)</h4>
        <p>Formats <code>0.1875</code> as <code>18.8%</code>. Standard for retail markup, discount rates, and operational yields.</p>
      </div>
      <div class="arch-box">
        <h4>Two Decimals (0.00%)</h4>
        <p>Formats <code>0.0825</code> as <code>8.25%</code>. Essential for medical insurance co-pays, hospital sales tax, and interest rates.</p>
      </div>
    </div>

    <div class="keynote-box keynote-emerald">
      <strong>Analyst Takeaway:</strong> Never multiply by 100 inside formula bars if you intend to apply percentage formatting! Writing <code>=(E2-D2)/D2*100</code> followed by formatting with <kbd>%</kbd> yields <code>8000%</code> instead of <code>80%</code>.
    </div>

    <div class="anti-pattern-card" style="margin-top:16px; border:1px solid rgba(239,68,68,0.3); border-left:4px solid #ef4444; border-radius:8px; padding:14px 18px; background:rgba(239,68,68,0.08);">
      <h4 style="margin:0 0 8px 0; color:#f87171; font-size:13.5px; font-weight:700;">⚠️ Anti-Pattern vs. Gold Standard Solution</h4>
      <p style="margin:0; font-size:12.5px; line-height:1.5; color:#cbd5e1;">
        <strong>Common Mistake:</strong> Storing percentages as raw integer numbers like <code>80</code> instead of decimal fraction <code>0.8</code>. Calculating <code>=Price * 80</code> inflates totals by a factor of 100.<br>
        <strong>Gold Standard:</strong> Always compute raw mathematical decimal ratios: <code>=(UnitPrice - UnitCost) / UnitCost</code> and format cell as <kbd>Ctrl + Shift + %</kbd>.
      </p>
    </div>
  </div>
</section>

<section class="slide-section" id="sec03">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingCustomDateFormat">
    <span class="heading-num-box">03</span>
    <span class="heading-title-box">
      <span class="heading-icon">📅</span>
      <span class="heading-title-text">Custom Date Display Formats (YYYY-MM-DD, DD-MMM-YYYY)</span>
      <button class="audio-play-btn" data-track-idx="2" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p class="lead-text">Excel tracks dates as continuous sequential integers known as <strong>Serial Numbers</strong>, anchored to January 1, 1900 (serial number <code>1</code>). Serial number <code>46357</code> represents December 1, 2026.</p>
    
    <div class="table-responsive">
      <table class="reference-table">
        <thead>
          <tr>
            <th>Format Code</th>
            <th>Output Structure</th>
            <th>Target Audience / Best Practice</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>YYYY-MM-DD</code></td>
            <td><code>2026-12-01</code></td>
            <td>ISO 8601 international standard; unambiguous for database exports and SQL pipelines.</td>
          </tr>
          <tr>
            <td><code>DD-MMM-YYYY</code></td>
            <td><code>01-Dec-2026</code></td>
            <td>Clinical &amp; pharmaceutical supply chain standard; eliminates US (MM/DD) vs European (DD/MM) confusion.</td>
          </tr>
          <tr>
            <td><code>MMMM D, YYYY</code></td>
            <td><code>December 1, 2026</code></td>
            <td>Formal board presentations and executive health inspection audit reports.</td>
          </tr>
          <tr>
            <td><code>DDD, DD-MMM</code></td>
            <td><code>Tue, 01-Dec</code></td>
            <td>Operational shift scheduling, inventory delivery rosters, and clinic restocking cycles.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="keynote-box keynote-emerald">
      <strong>Analyst Takeaway:</strong> Because dates are stored as serial numbers, date subtraction yields elapsed calendar days. <code>=ExpiryDate - TODAY()</code> computes exact shelf life remaining without helper plugins.
    </div>

    <div class="anti-pattern-card" style="margin-top:16px; border:1px solid rgba(239,68,68,0.3); border-left:4px solid #ef4444; border-radius:8px; padding:14px 18px; background:rgba(239,68,68,0.08);">
      <h4 style="margin:0 0 8px 0; color:#f87171; font-size:13.5px; font-weight:700;">⚠️ Anti-Pattern vs. Gold Standard Solution</h4>
      <p style="margin:0; font-size:12.5px; line-height:1.5; color:#cbd5e1;">
        <strong>Common Mistake:</strong> Storing dates as unparseable descriptive strings like <code>"Dec 1st 2026"</code>. String dates cannot be sorted chronologically (they sort alphabetically: April before January).<br>
        <strong>Gold Standard:</strong> Enter genuine Excel date serials and apply custom number format <code>yyyy-mm-dd</code>.
      </p>
    </div>
  </div>
</section>

<section class="slide-section" id="sec04">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingFreezePanes">
    <span class="heading-num-box">04</span>
    <span class="heading-title-box">
      <span class="heading-icon">❄️</span>
      <span class="heading-title-text">Freeze Panes (Header Row &amp; Top/Left Split)</span>
      <button class="audio-play-btn" data-track-idx="3" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p class="lead-text">When scrolling through large hospital inventory tables, disappearing column headers leads to severe data misinterpretation. <strong>Freeze Panes</strong> locks key reference axes in fixed screen positions.</p>
    
    <div class="architecture-grid">
      <div class="arch-box">
        <h4>Freeze Top Row</h4>
        <p>Pins row 1 permanently to the top of the worksheet viewport. Column labels remain visible when scrolling down 1,000+ items.</p>
      </div>
      <div class="arch-box">
        <h4>Freeze First Column</h4>
        <p>Pins column A (e.g. <code>Item SKU</code>) to the left border. Identifiers remain anchored when scrolling right across 20+ columns.</p>
      </div>
      <div class="arch-box">
        <h4>Coordinate Split Panes</h4>
        <p>Selecting cell <code>B2</code> and clicking Freeze Panes freezes both Row 1 AND Column A simultaneously. Accessible via <kbd>Alt + W + F + F</kbd>.</p>
      </div>
    </div>

    <div class="keynote-box keynote-emerald">
      <strong>Analyst Takeaway:</strong> In coordinate Freeze Panes, Excel freezes everything <em>above</em> and <em>to the left</em> of the active cell cursor. To freeze Row 1 and Columns A–B, position the cursor on cell <strong>C2</strong> before activating the command.
    </div>

    <div class="anti-pattern-card" style="margin-top:16px; border:1px solid rgba(239,68,68,0.3); border-left:4px solid #ef4444; border-radius:8px; padding:14px 18px; background:rgba(239,68,68,0.08);">
      <h4 style="margin:0 0 8px 0; color:#f87171; font-size:13.5px; font-weight:700;">⚠️ Anti-Pattern vs. Gold Standard Solution</h4>
      <p style="margin:0; font-size:12.5px; line-height:1.5; color:#cbd5e1;">
        <strong>Common Mistake:</strong> Activating Freeze Panes while the active cursor is located in cell <code>A1</code> or scrolled half-way down the sheet, locking half the dataset out of view.<br>
        <strong>Gold Standard:</strong> Always press <kbd>Ctrl + Home</kbd> to return to the sheet origin, select <code>B2</code>, and toggle <kbd>Alt + W + F + F</kbd>.
      </p>
    </div>
  </div>
</section>

<section class="slide-section" id="sec05">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingMultiLevelSort">
    <span class="heading-num-box">05</span>
    <span class="heading-title-box">
      <span class="heading-icon">🔀</span>
      <span class="heading-title-text">Multi-Level Sorting (Primary + Secondary Sort Keys)</span>
      <button class="audio-play-btn" data-track-idx="4" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p class="lead-text">Single-column sorting collapses multidimensional relationships. Multi-level sorting applies a cascading hierarchy of sort keys to organize complex enterprise catalogs.</p>
    
    <div class="table-responsive">
      <table class="reference-table">
        <thead>
          <tr>
            <th>Sort Tier</th>
            <th>Target Field</th>
            <th>Ordering Direction</th>
            <th>Analytical Purpose</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Tier 1 (Primary Key)</strong></td>
            <td><code>Category</code></td>
            <td>A to Z (Ascending)</td>
            <td>Groups all inventory records by clinical department (Diagnostic, Monitoring, PPE, Surgical).</td>
          </tr>
          <tr>
            <td><strong>Tier 2 (Secondary Key)</strong></td>
            <td><code>Unit Price</code></td>
            <td>Z to A (Descending)</td>
            <td>Within each category, immediately surfaces high-value capital assets at the top of the group.</td>
          </tr>
          <tr>
            <td><strong>Tier 3 (Tie-Breaker)</strong></td>
            <td><code>Stock Qty</code></td>
            <td>Z to A (Descending)</td>
            <td>Ranks identical price tiers by warehouse volume to prioritize replenishment audits.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="keynote-box keynote-emerald">
      <strong>Analyst Takeaway:</strong> When sorting, ensure the entire contiguous table range is included. If you sort a single column without expanding the selection, you will permanently decouple SKUs from their prices!
    </div>

    <div class="anti-pattern-card" style="margin-top:16px; border:1px solid rgba(239,68,68,0.3); border-left:4px solid #ef4444; border-radius:8px; padding:14px 18px; background:rgba(239,68,68,0.08);">
      <h4 style="margin:0 0 8px 0; color:#f87171; font-size:13.5px; font-weight:700;">⚠️ Anti-Pattern vs. Gold Standard Solution</h4>
      <p style="margin:0; font-size:12.5px; line-height:1.5; color:#cbd5e1;">
        <strong>Common Mistake:</strong> Clicking "Continue with current selection" on Excel's Sort Warning dialog. This shuffles only the highlighted column while other columns stay frozen, corrupting the entire medical database.<br>
        <strong>Gold Standard:</strong> Always confirm "Expand the selection" or format data as an official Excel Table (<kbd>Ctrl + T</kbd>) before sorting.
      </p>
    </div>
  </div>
</section>

<section class="slide-section" id="sec06">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingAutoFilter">
    <span class="heading-num-box">06</span>
    <span class="heading-title-box">
      <span class="heading-icon">🔍</span>
      <span class="heading-title-text">AutoFilter with Custom Text &amp; Number Criteria</span>
      <button class="audio-play-btn" data-track-idx="5" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p class="lead-text">AutoFilter provides non-destructive slice-and-dice queries on raw datasets. Filtering temporarily hides non-matching rows from view while preserving underlying integrity.</p>
    
    <div class="architecture-grid">
      <div class="arch-box">
        <h4>Text Criteria</h4>
        <p>Supports wildcard queries (<code>*</code> for multiple characters, <code>?</code> for single character), <em>Begins With</em>, <em>Contains</em>, and <em>Does Not Equal</em>.</p>
      </div>
      <div class="arch-box">
        <h4>Number Criteria</h4>
        <p>Enables conditional ranges: <em>Between $50 and $200</em>, <em>Top 10 Items</em>, <em>Above Average</em>, and custom multi-clause boolean filters.</p>
      </div>
      <div class="arch-box">
        <h4>Date Range Filters</h4>
        <p>Dynamic temporal filters that automatically adapt to current date serials: <em>Expired</em>, <em>This Quarter</em>, <em>Next Year</em>.</p>
      </div>
    </div>

    <div class="keynote-box keynote-emerald">
      <strong>Analyst Takeaway:</strong> Shortcut <kbd>Ctrl + Shift + L</kbd> instantly toggles AutoFilter drop-down arrows across the header row of any active table range.
    </div>

    <div class="anti-pattern-card" style="margin-top:16px; border:1px solid rgba(239,68,68,0.3); border-left:4px solid #ef4444; border-radius:8px; padding:14px 18px; background:rgba(239,68,68,0.08);">
      <h4 style="margin:0 0 8px 0; color:#f87171; font-size:13.5px; font-weight:700;">⚠️ Anti-Pattern vs. Gold Standard Solution</h4>
      <p style="margin:0; font-size:12.5px; line-height:1.5; color:#cbd5e1;">
        <strong>Common Mistake:</strong> Manually deleting rows to analyze a specific medical category, then saving over the original master file.<br>
        <strong>Gold Standard:</strong> Use AutoFilter (<kbd>Ctrl + Shift + L</kbd>) to isolate the target category, or build dynamic summary sheets using <code>SUMIFS</code> and <code>SUBTOTAL</code>.
      </p>
    </div>
  </div>
</section>

<section class="slide-section" id="sec07">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingDataBarsColorScales">
    <span class="heading-num-box">07</span>
    <span class="heading-title-box">
      <span class="heading-icon">🎨</span>
      <span class="heading-title-text">Conditional Formatting Data Bars &amp; Color Scales</span>
      <button class="audio-play-btn" data-track-idx="6" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p class="lead-text">In-cell data visualizations turn dense tables into intuitive visual heatmaps. Conditional Formatting rules dynamically evaluate cell values and update cell styling in real time.</p>
    
    <div class="architecture-grid">
      <div class="arch-box">
        <h4>Data Bars</h4>
        <p>Draws proportional horizontal bars directly inside the cell. The longest bar matches the maximum value in the selected range (e.g. Stock Qty = 400).</p>
      </div>
      <div class="arch-box">
        <h4>Color Scales (Heatmaps)</h4>
        <p>Applies a 2-color or 3-color gradient across a spectrum. E.g. Green (highest profit margin) to Yellow (medium) to Red (lowest).</p>
      </div>
      <div class="arch-box">
        <h4>Icon Sets</h4>
        <p>Places visual status indicators (flags, stars, traffic lights) beside values based on percentile or numerical thresholds.</p>
      </div>
    </div>

    <div class="keynote-box keynote-emerald">
      <strong>Analyst Takeaway:</strong> For executive reporting, opt for subtle, soft pastel tones. High-saturation neon fills distract decision-makers and hinder table legibility.
    </div>

    <div class="anti-pattern-card" style="margin-top:16px; border:1px solid rgba(239,68,68,0.3); border-left:4px solid #ef4444; border-radius:8px; padding:14px 18px; background:rgba(239,68,68,0.08);">
      <h4 style="margin:0 0 8px 0; color:#f87171; font-size:13.5px; font-weight:700;">⚠️ Anti-Pattern vs. Gold Standard Solution</h4>
      <p style="margin:0; font-size:12.5px; line-height:1.5; color:#cbd5e1;">
        <strong>Common Mistake:</strong> Applying 6+ conflicting color rules across the same table, creating an unreadable visual rainbow.<br>
        <strong>Gold Standard:</strong> Stick to one visual accent per table: e.g. soft emerald Data Bars on Stock Quantity, and a clean Alert Rule on critical stockouts.
      </p>
    </div>
  </div>
</section>

<section class="slide-section" id="sec08">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingFormulaCF">
    <span class="heading-num-box">08</span>
    <span class="heading-title-box">
      <span class="heading-icon">⚡</span>
      <span class="heading-title-text">Formula-Based Conditional Formatting (=$Col="Value")</span>
      <button class="audio-play-btn" data-track-idx="7" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p class="lead-text">Standard conditional formatting rules evaluate only the individual cell being formatted. Formula-based conditional formatting unlocks the ability to highlight <strong>entire rows</strong> based on a test condition in a single column.</p>
    
    <div class="table-responsive">
      <table class="reference-table">
        <thead>
          <tr>
            <th>Formatting Objective</th>
            <th>Applies To Range</th>
            <th>Formula Rule Syntax</th>
            <th>The Critical Column Anchor ($)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Highlight entire row if Category is 'Diagnostic'</td>
            <td><code>=$A$2:$I$21</code></td>
            <td><code>=$B2="Diagnostic"</code></td>
            <td><code>$B</code> locks the evaluated column so columns A through I all check Column B.</td>
          </tr>
          <tr>
            <td>Highlight entire row if Stock Qty &lt; 50 (Critical Stockout Alert)</td>
            <td><code>=$A$2:$I$21</code></td>
            <td><code>=$F2&lt;50</code></td>
            <td><code>$F</code> is locked; row <code>2</code> is relative, shifting automatically for rows 2 through 21.</td>
          </tr>
          <tr>
            <td>Highlight row if Unit Price &gt; $500 (Capital Equipment)</td>
            <td><code>=$A$2:$I$21</code></td>
            <td><code>=$E2&gt;500</code></td>
            <td>Locks evaluation strictly to Column E Unit Price.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="keynote-box keynote-emerald">
      <strong>Analyst Takeaway:</strong> The Dollar Sign ($) Anchor is the universal key to full-row formatting. Omitting the <code>$</code> (writing <code>=B2="Diagnostic"</code>) causes each cell in the row to test itself, resulting in broken checkerboard coloring.
    </div>

    <div class="anti-pattern-card" style="margin-top:16px; border:1px solid rgba(239,68,68,0.3); border-left:4px solid #ef4444; border-radius:8px; padding:14px 18px; background:rgba(239,68,68,0.08);">
      <h4 style="margin:0 0 8px 0; color:#f87171; font-size:13.5px; font-weight:700;">⚠️ Anti-Pattern vs. Gold Standard Solution</h4>
      <p style="margin:0; font-size:12.5px; line-height:1.5; color:#cbd5e1;">
        <strong>Common Mistake:</strong> Applying formula rules to entire infinite columns like <code>=$A:$Z</code>, which forces Excel to calculate conditional formats over 1,048,576 rows and causes noticeable UI freeze and lag.<br>
        <strong>Gold Standard:</strong> Always restrict the "Applies To" range to the exact data bounds: <code>=$A$2:$I$21</code>.
      </p>
    </div>

    <div class="interview-insight-box" style="margin-top:16px; border:1px solid rgba(14,165,233,0.3); border-left:4px solid #0ea5e9; border-radius:8px; padding:14px 18px; background:rgba(14,165,233,0.08);">
      <h4 style="margin:0 0 8px 0; color:#38bdf8; font-size:13.5px; font-weight:700;">💼 Interview / Production Insight</h4>
      <p style="margin:0; font-size:12.5px; line-height:1.5; color:#cbd5e1;">
        <strong>Interview Question:</strong> <em>"How do you highlight an entire record in a 50,000-row healthcare table when an item has expired without crashing Excel?"</em><br>
        <strong>Staff Analyst Answer:</strong> Apply a single formula rule <code>=$G2&lt;TODAY()</code> anchored strictly to Column G, targeted exclusively to the populated table range (e.g. <code>=$A$2:$I$50000</code>). Avoid volatile formulas in conditional formatting rules across wide ranges, and never apply formatting across infinite whole columns.
      </p>
    </div>
  </div>
</section>

<section class="slide-section" id="sec09">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingSubtotalAggregation">
    <span class="heading-num-box">09</span>
    <span class="heading-title-box">
      <span class="heading-icon">🛡️</span>
      <span class="heading-title-text">Dynamic Filtered Aggregations: SUBTOTAL(9, Range)</span>
      <button class="audio-play-btn" data-track-idx="8" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p class="lead-text">The standard <code>=SUM()</code> function suffers from a critical analytical blindspot: it aggregates <strong>all</strong> cells in a range, including hidden and filtered-out rows! The <code>SUBTOTAL()</code> function dynamically recalculates based solely on visible rows.</p>
    
    <div class="table-responsive">
      <table class="reference-table">
        <thead>
          <tr>
            <th>Function Code</th>
            <th>Aggregation Method</th>
            <th>Filtered Row Handling</th>
            <th>Typical Analytical Scenario</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>9</code> (or <code>109</code>)</td>
            <td><code>SUM</code></td>
            <td>Ignores rows hidden by AutoFilter</td>
            <td>Dynamic inventory value when category is filtered to 'Surgical'.</td>
          </tr>
          <tr>
            <td><code>1</code> (or <code>101</code>)</td>
            <td><code>AVERAGE</code></td>
            <td>Calculates mean of visible rows only</td>
            <td>Average unit price of active filtered clinic items.</td>
          </tr>
          <tr>
            <td><code>4</code> (or <code>104</code>)</td>
            <td><code>MAX</code></td>
            <td>Returns maximum of visible rows</td>
            <td>Highest stock level among filtered items.</td>
          </tr>
          <tr>
            <td><code>5</code> (or <code>105</code>)</td>
            <td><code>MIN</code></td>
            <td>Returns minimum of visible rows</td>
            <td>Lowest cost among filtered supplies.</td>
          </tr>
          <tr>
            <td><code>2</code> (or <code>102</code>)</td>
            <td><code>COUNT</code></td>
            <td>Counts visible numeric rows</td>
            <td>Tally of visible items in current filtered view.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="keynote-box keynote-emerald">
      <strong>Analyst Takeaway:</strong> Whenever you build KPI cards above a table with AutoFilter enabled, always use <code>=SUBTOTAL(9, range)</code> instead of <code>=SUM(range)</code>. As clinicians filter categories, the KPI cards update dynamically!
    </div>

    <div class="anti-pattern-card" style="margin-top:16px; border:1px solid rgba(239,68,68,0.3); border-left:4px solid #ef4444; border-radius:8px; padding:14px 18px; background:rgba(239,68,68,0.08);">
      <h4 style="margin:0 0 8px 0; color:#f87171; font-size:13.5px; font-weight:700;">⚠️ Anti-Pattern vs. Gold Standard Solution</h4>
      <p style="margin:0; font-size:12.5px; line-height:1.5; color:#cbd5e1;">
        <strong>Common Mistake:</strong> Using <code>=SUM()</code> on a filtered table and reporting the resulting figure as "Surgical Category Revenue". The number will secretly include all unfiltered categories, misleading clinic executives.<br>
        <strong>Gold Standard:</strong> Use <code>=SUBTOTAL(9, Medical_Supplies!H2:H21)</code> to guarantee strict visibility filtering.
      </p>
    </div>

    <div class="interview-insight-box" style="margin-top:16px; border:1px solid rgba(14,165,233,0.3); border-left:4px solid #0ea5e9; border-radius:8px; padding:14px 18px; background:rgba(14,165,233,0.08);">
      <h4 style="margin:0 0 8px 0; color:#38bdf8; font-size:13.5px; font-weight:700;">💼 Interview / Production Insight</h4>
      <p style="margin:0; font-size:12.5px; line-height:1.5; color:#cbd5e1;">
        <strong>Interview Question:</strong> <em>"What is the operational difference between SUBTOTAL code 9 and code 109?"</em><br>
        <strong>Staff Analyst Answer:</strong> Code <code>9</code> excludes rows filtered out by AutoFilter, but still includes rows hidden manually (via Right Click -&gt; Hide Row). Code <code>109</code> excludes both AutoFiltered rows AND manually hidden rows. In modern analytics pipelines, code <code>9</code> is standard for AutoFilter dashboards.
      </p>
    </div>
  </div>
</section>

<section class="slide-section" id="sec10">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingTextFunction">
    <span class="heading-num-box">10</span>
    <span class="heading-title-box">
      <span class="heading-icon">💼</span>
      <span class="heading-title-text">Text Formatting in Calculations: TEXT(Value, Format)</span>
      <button class="audio-play-btn" data-track-idx="9" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p class="lead-text">When concatenating numbers or dates into descriptive strings (e.g. <code>="Total Inventory: " &amp; B2</code>), Excel strips cell formatting and exposes raw unformatted decimals. The <code>TEXT(value, format_text)</code> function restores visual elegance inside formulas.</p>
    
    <div class="architecture-grid">
      <div class="arch-box">
        <h4>Number Formatting</h4>
        <p><code>=TEXT(B2, "#,##0")</code><br>Converts <code>137780</code> into clean grouped string <code>"137,780"</code> with thousands separators.</p>
      </div>
      <div class="arch-box">
        <h4>Date Formatting</h4>
        <p><code>=TEXT(G2, "yyyy-mm-dd")</code><br>Converts serial <code>46357</code> into ISO standard date string <code>"2026-12-01"</code>.</p>
      </div>
      <div class="arch-box">
        <h4>Percentage Formatting</h4>
        <p><code>=TEXT(I2, "0%")</code><br>Converts decimal fraction <code>0.8</code> into executive whole percentage <code>"80%"</code>.</p>
      </div>
    </div>

    <div class="keynote-box keynote-emerald">
      <strong>Analyst Takeaway:</strong> The output of <code>=TEXT()</code> is always a text string (left-aligned). You cannot perform arithmetic calculations (like <code>SUM</code> or <code>AVERAGE</code>) directly on text outputs. Reserve <code>TEXT()</code> for executive summary headers, card callouts, and chart labels!
    </div>

    <div class="anti-pattern-card" style="margin-top:16px; border:1px solid rgba(239,68,68,0.3); border-left:4px solid #ef4444; border-radius:8px; padding:14px 18px; background:rgba(239,68,68,0.08);">
      <h4 style="margin:0 0 8px 0; color:#f87171; font-size:13.5px; font-weight:700;">⚠️ Anti-Pattern vs. Gold Standard Solution</h4>
      <p style="margin:0; font-size:12.5px; line-height:1.5; color:#cbd5e1;">
        <strong>Common Mistake:</strong> Writing <code>="Expiry Date: " &amp; G2</code> which renders as <code>"Expiry Date: 46358"</code>, confusing clinical managers.<br>
        <strong>Gold Standard:</strong> Format inside the string expression: <code>="Expiry Date: " &amp; TEXT(G2, "yyyy-mm-dd")</code>.
      </p>
    </div>

    <div class="interview-insight-box" style="margin-top:16px; border:1px solid rgba(14,165,233,0.3); border-left:4px solid #0ea5e9; border-radius:8px; padding:14px 18px; background:rgba(14,165,233,0.08);">
      <h4 style="margin:0 0 8px 0; color:#38bdf8; font-size:13.5px; font-weight:700;">💼 Interview / Production Insight</h4>
      <p style="margin:0; font-size:12.5px; line-height:1.5; color:#cbd5e1;">
        <strong>Interview Question:</strong> <em>"How do senior analytics engineers construct dynamic executive headline cards in Microsoft 365 dashboards?"</em><br>
        <strong>Staff Analyst Answer:</strong> By combining string concatenation with nested <code>TEXT()</code> functions: <code>="As of " &amp; TEXT(TODAY(), "dd-mmm-yyyy") &amp; ", total clinical inventory stands at " &amp; TEXT(SUBTOTAL(9, H2:H21), "$#,##0")</code>. This creates a self-updating narrative banner that reacts instantly to slicers and filters.
      </p>
    </div>
  </div>
</section>
`
    }
  ],

  // ═══════════════ CANONICAL SEED WORKBOOK: MEDVANTAGE CARE ═══════════════
  initialWorkbook: {
    "Medical_Supplies": [
      ["Item SKU", "Category", "Item Name", "Unit Cost", "Unit Price", "Stock Qty", "Expiry Date Serial", "Total Inventory Value", "Markup %"],
      ["MED-101", "Diagnostic",     "Digital Pulse Oximeter",          25,  45,   120, 46357, "=E2*F2", "=ROUND((E2-D2)/D2, 4)"],
      ["MED-102", "Surgical",        "Titanium Scalpel Set",            80,  160,  45,  46723, "=E3*F3", "=ROUND((E3-D3)/D3, 4)"],
      ["MED-103", "PPE",             "N95 Protective Respirator 50pk",  15,  30,   250, 46173, "=E4*F4", "=ROUND((E4-D4)/D4, 4)"],
      ["MED-104", "Diagnostic",     "Infrared Forehead Thermometer",   35,  70,   80,  46389, "=E5*F5", "=ROUND((E5-D5)/D5, 4)"],
      ["MED-105", "Monitoring",     "Multi-Parameter Patient Monitor", 450, 900,  15,  46904, "=E6*F6", "=ROUND((E6-D6)/D6, 4)"],
      ["MED-106", "PPE",             "Nitrile Examination Gloves 100pk",8,   16,   400, 46203, "=E7*F7", "=ROUND((E7-D7)/D7, 4)"],
      ["MED-107", "Surgical",        "Electrosurgical Cautery Pen",     120, 240,  30,  46540, "=E8*F8", "=ROUND((E8-D8)/D8, 4)"],
      ["MED-108", "Diagnostic",     "Automatic Blood Pressure Monitor",55,  110,  60,  46420, "=E9*F9", "=ROUND((E9-D9)/D9, 4)"],
      ["MED-109", "Pharmaceutical", "Sterile Saline Solution 500ml",   4,   10,   350, 46142, "=E10*F10", "=ROUND((E10-D10)/D10, 4)"],
      ["MED-110", "Monitoring",     "Portable ECG Monitor 12-Lead",    600, 1200, 10,  46815, "=E11*F11", "=ROUND((E11-D11)/D11, 4)"],
      ["MED-111", "PPE",             "Disposable Surgical Gowns 25pk",  22,  44,   180, 46234, "=E12*F12", "=ROUND((E12-D12)/D12, 4)"],
      ["MED-112", "Diagnostic",     "Ultrasound Conductivity Gel 5L",  18,  36,   95,  46329, "=E13*F13", "=ROUND((E13-D13)/D13, 4)"],
      ["MED-113", "Surgical",        "Orthopedic Bone Drill Kit",       350, 700,  8,   46632, "=E14*F14", "=ROUND((E14-D14)/D14, 4)"],
      ["MED-114", "Pharmaceutical", "Povidone Iodine Prep 1L",          12,  24,   140, 46112, "=E15*F15", "=ROUND((E15-D15)/D15, 4)"],
      ["MED-115", "Monitoring",     "Capnography Sensor Module",       210, 420,  25,  46754, "=E16*F16", "=ROUND((E16-D16)/D16, 4)"],
      ["MED-116", "PPE",             "Face Shield Splash Guards 50pk",  16,  32,   110, 46173, "=E17*F17", "=ROUND((E17-D17)/D17, 4)"],
      ["MED-117", "Diagnostic",     "Digital Otoscope Kit",            75,  150,  40,  46450, "=E18*F18", "=ROUND((E18-D18)/D18, 4)"],
      ["MED-118", "Surgical",        "Laparoscopic Trocar System",      180, 360,  20,  46601, "=E19*F19", "=ROUND((E19-D19)/D19, 4)"],
      ["MED-119", "Pharmaceutical", "Hydrogel Wound Dressing 10pk",     28,  56,   75,  46265, "=E20*F20", "=ROUND((E20-D20)/D20, 4)"],
      ["MED-120", "Monitoring",     "Vascular Doppler Detector",       310, 620,  18,  46845, "=E21*F21", "=ROUND((E21-D21)/D21, 4)"]
    ],
    "Clinics": [
      ["Clinic ID", "Clinic Name", "Region", "Monthly Allocation", "Active Doctors", "Emergency Tier"],
      ["CLN-01", "St. Jude Metro Clinic",       "North", 45000, 18, "Tier 1"],
      ["CLN-02", "Oakridge Health Pavilion",    "South", 32000, 12, "Tier 2"],
      ["CLN-03", "Mercy General Outpatient",    "East",  68000, 25, "Tier 1"],
      ["CLN-04", "Highland Family Health",      "West",  24000, 9,  "Tier 3"],
      ["CLN-05", "Valley Childrens Center",     "North", 51000, 20, "Tier 1"],
      ["CLN-06", "Harbor View Urgent Care",     "East",  39000, 15, "Tier 2"]
    ],
    "Format_Practice": [
      ["KPI Summary Metric", "Your Formula Answer", "Target Format / Requirement"],
      ["Total Inventory Value", "", "$#,##0.00"],
      ["Average Unit Cost", "", "$#,##0.00"],
      ["Highest Stock Quantity", "", "0"],
      ["Lowest Unit Cost", "", "$#,##0.00"],
      ["Total Item SKU Count", "", "0"],
      ["Dynamic Filtered Value (SUBTOTAL 9)", "", "$#,##0.00"],
      ["Dynamic Filtered Avg Price (SUBTOTAL 1)", "", "$#,##0.00"],
      ["Dynamic Filtered Max Stock (SUBTOTAL 4)", "", "0"],
      ["Total Diagnostic Supplies Value", "", "$#,##0.00"],
      ["Supplies with Stock >= 100", "", "0"],
      ["Average Price of Surgical Items", "", "$#,##0.00"],
      ["PPE Inventory with Stock >= 100", "", "$#,##0.00"],
      ["Surgical Items with Price >= 200", "", "0"],
      ["Formatted Total Inventory String", "", "TEXT Currency (#,##0)"],
      ["Formatted First Expiry Date String", "", "TEXT YYYY-MM-DD"],
      ["Formatted Row 2 Markup String", "", "TEXT 0%"],
      ["Monthly Allocation of CLN-03", "", "$#,##0"]
    ]
  },

  initialAuxiliary: {
    "Medical_Supplies": {
      "K1": "Low Stock Benchmark",  "L1": 50,
      "K2": "High Price Benchmark", "L2": 200
    }
  },

  // ═══════════════ 20 CHALLENGES (SCHEMA v2.1) ═══════════════
  challenges: [
    // ── 6 EASY CHALLENGES (c01 - c06) ─────────────────────────────────────────
    {
      id: "c01",
      number: 1,
      title: "Total Inventory Value (SUM)",
      prompt: "To calculate total inventory valuation across all hospital medical supplies, navigate to sheet <code>Format_Practice</code> cell <strong>B2</strong> and write a formula using <code>=SUM()</code> referencing the inventory value column in <code>Medical_Supplies!H2:H21</code>.",
      targetSheet: "Format_Practice",
      targetCell: "B2",
      solution: "=SUM(Medical_Supplies!H2:H21)",
      expectedFormulaPrefix: "=SUM",
      expectedValue: 137780,
      tolerance: 0.1,
      hint: "Use =SUM(Medical_Supplies!H2:H21)",
      difficulty: "easy",
      bloom: "apply",
      xp: 50,
      marks: 1.0,
      check: {
        expected: 137780,
        tolerance: 0.1,
        mustUseAnyOf: [["SUM"]],
        mustReference: ["Medical_Supplies!H2:H21"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=\\d+", message: "Do not hardcode static numbers. Reference the range Medical_Supplies!H2:H21." },
        { pattern: "=SUM\\(H2:H21\\)", message: "Remember to prefix the sheet name: Medical_Supplies!H2:H21." }
      ],
      dataScope: {
        cols: ["H"],
        params: [],
        previewRows: 20,
        summary: "Calculates the grand total retail value of inventory across all 20 catalog records."
      }
    },
    {
      id: "c02",
      number: 2,
      title: "Average Unit Cost (AVERAGE)",
      prompt: "To establish the baseline mean unit acquisition cost across hospital supplies for procurement budgeting, navigate to sheet <code>Format_Practice</code> cell <strong>B3</strong> and write a formula using <code>=AVERAGE()</code> referencing the unit cost column in <code>Medical_Supplies!D2:D21</code>.",
      targetSheet: "Format_Practice",
      targetCell: "B3",
      solution: "=AVERAGE(Medical_Supplies!D2:D21)",
      expectedFormulaPrefix: "=AVERAGE",
      expectedValue: 130.65,
      tolerance: 0.01,
      hint: "Use =AVERAGE(Medical_Supplies!D2:D21)",
      difficulty: "easy",
      bloom: "apply",
      xp: 50,
      marks: 1.0,
      check: {
        expected: 130.65,
        tolerance: 0.01,
        mustUseAnyOf: [["AVERAGE"]],
        mustReference: ["Medical_Supplies!D2:D21"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=\\d+", message: "Do not hardcode constants. Use =AVERAGE(Medical_Supplies!D2:D21)." }
      ],
      dataScope: {
        cols: ["D"],
        params: [],
        previewRows: 20,
        summary: "Computes the baseline mean unit acquisition cost across hospital supplies."
      }
    },
    {
      id: "c03",
      number: 3,
      title: "Highest Stock Quantity (MAX)",
      prompt: "To identify the peak inventory concentration among all catalog products for warehouse space allocation, navigate to sheet <code>Format_Practice</code> cell <strong>B4</strong> and write a formula using <code>=MAX()</code> referencing the stock quantity column in <code>Medical_Supplies!F2:F21</code>.",
      targetSheet: "Format_Practice",
      targetCell: "B4",
      solution: "=MAX(Medical_Supplies!F2:F21)",
      expectedFormulaPrefix: "=MAX",
      expectedValue: 400,
      tolerance: 0,
      hint: "Use =MAX(Medical_Supplies!F2:F21)",
      difficulty: "easy",
      bloom: "apply",
      xp: 50,
      marks: 1.0,
      check: {
        expected: 400,
        tolerance: 0,
        mustUseAnyOf: [["MAX"]],
        mustReference: ["Medical_Supplies!F2:F21"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=400$", message: "Do not enter 400 directly. Use =MAX(Medical_Supplies!F2:F21)." }
      ],
      dataScope: {
        cols: ["F"],
        params: [],
        previewRows: 20,
        summary: "Finds peak inventory concentration (Nitrile Examination Gloves: 400 units)."
      }
    },
    {
      id: "c04",
      number: 4,
      title: "Lowest Unit Cost (MIN)",
      prompt: "To locate the least expensive unit supply in the hospital catalog for baseline pricing reviews, navigate to sheet <code>Format_Practice</code> cell <strong>B5</strong> and write a formula using <code>=MIN()</code> referencing the unit cost column in <code>Medical_Supplies!D2:D21</code>.",
      targetSheet: "Format_Practice",
      targetCell: "B5",
      solution: "=MIN(Medical_Supplies!D2:D21)",
      expectedFormulaPrefix: "=MIN",
      expectedValue: 4,
      tolerance: 0,
      hint: "Use =MIN(Medical_Supplies!D2:D21)",
      difficulty: "easy",
      bloom: "apply",
      xp: 50,
      marks: 1.0,
      check: {
        expected: 4,
        tolerance: 0,
        mustUseAnyOf: [["MIN"]],
        mustReference: ["Medical_Supplies!D2:D21"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=4$", message: "Do not enter 4 as a constant. Write =MIN(Medical_Supplies!D2:D21)." }
      ],
      dataScope: {
        cols: ["D"],
        params: [],
        previewRows: 20,
        summary: "Identifies the least expensive unit supply (Sterile Saline Solution: $4.00)."
      }
    },
    {
      id: "c05",
      number: 5,
      title: "Total Item SKU Count (COUNT)",
      prompt: "To audit catalog completeness and confirm total active items carrying numeric inventory records, navigate to sheet <code>Format_Practice</code> cell <strong>B6</strong> and write a formula using <code>=COUNT()</code> referencing the stock quantity column in <code>Medical_Supplies!F2:F21</code>.",
      targetSheet: "Format_Practice",
      targetCell: "B6",
      solution: "=COUNT(Medical_Supplies!F2:F21)",
      expectedFormulaPrefix: "=COUNT",
      expectedValue: 20,
      tolerance: 0,
      hint: "Use =COUNT(Medical_Supplies!F2:F21)",
      difficulty: "easy",
      bloom: "apply",
      xp: 50,
      marks: 1.0,
      check: {
        expected: 20,
        tolerance: 0,
        mustUseAnyOf: [["COUNT"]],
        mustReference: ["Medical_Supplies!F2:F21"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=20$", message: "Do not enter 20 as a literal constant. Use =COUNT(Medical_Supplies!F2:F21)." }
      ],
      dataScope: {
        cols: ["F"],
        params: [],
        previewRows: 20,
        summary: "Tallies total active catalog lines with numeric stock quantities."
      }
    },
    {
      id: "c06",
      number: 6,
      title: "Row 2 Markup Percentage (Formula Precision)",
      prompt: "To compute the gross profit markup percentage on the Digital Pulse Oximeter with financial decimal precision, navigate to sheet <code>Medical_Supplies</code> cell <strong>I2</strong> and write a formula using <code>=ROUND()</code> calculating <code>(E2-D2)/D2</code> rounded to 4 decimal places via <code>=ROUND((E2-D2)/D2, 4)</code>.",
      targetSheet: "Medical_Supplies",
      targetCell: "I2",
      solution: "=ROUND((E2-D2)/D2, 4)",
      expectedFormulaPrefix: "=ROUND",
      expectedValue: 0.8,
      tolerance: 0.0001,
      hint: "Use =ROUND((E2-D2)/D2, 4)",
      difficulty: "easy",
      bloom: "apply",
      xp: 50,
      marks: 1.0,
      check: {
        expected: 0.8,
        tolerance: 0.0001,
        mustUseAnyOf: [["ROUND"]],
        mustReference: ["E2", "D2"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "E2-D2/D2", message: "Enclose (E2-D2) in parentheses to respect mathematical precedence!" },
        { pattern: "\\*100", message: "Do not multiply by 100! Excel percentage formatting handles multiplication automatically." }
      ],
      dataScope: {
        cols: ["D", "E", "I"],
        params: [],
        previewRows: 5,
        summary: "Calculates the markup ratio for the Digital Pulse Oximeter ($45-$25)/$25 = 0.8000."
      }
    },

    // ── 8 MEDIUM CHALLENGES (c07 - c14) ───────────────────────────────────────
    {
      id: "c07",
      number: 7,
      title: "Dynamic Filtered Aggregation: Subtotal Sum (SUBTOTAL 9)",
      prompt: "To calculate dynamic inventory valuation that automatically updates when sheet filters are applied, navigate to sheet <code>Format_Practice</code> cell <strong>B7</strong> and write a formula using <code>=SUBTOTAL()</code> with function code <code>9</code> referencing the inventory value column in <code>Medical_Supplies!H2:H21</code> via <code>=SUBTOTAL(9, Medical_Supplies!H2:H21)</code>.",
      targetSheet: "Format_Practice",
      targetCell: "B7",
      solution: "=SUBTOTAL(9, Medical_Supplies!H2:H21)",
      expectedFormulaPrefix: "=SUBTOTAL",
      expectedValue: 137780,
      tolerance: 0.1,
      hint: "Use =SUBTOTAL(9, Medical_Supplies!H2:H21)",
      difficulty: "medium",
      bloom: "apply",
      xp: 75,
      marks: 1.0,
      check: {
        expected: 137780,
        tolerance: 0.1,
        mustUseAnyOf: [["SUBTOTAL"]],
        mustReference: ["Medical_Supplies!H2:H21"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "=SUM\\(", message: "Use SUBTOTAL with code 9, not SUM, so the metric responds to table filters!" }
      ],
      dataScope: {
        cols: ["H"],
        params: ["Function code 9 (SUM)"],
        previewRows: 20,
        summary: "Calculates dynamic inventory sum that automatically adapts when filters are applied."
      }
    },
    {
      id: "c08",
      number: 8,
      title: "Dynamic Filtered Aggregation: Subtotal Average (SUBTOTAL 1)",
      prompt: "To compute dynamic average selling price across visible rows during filtered category analysis, navigate to sheet <code>Format_Practice</code> cell <strong>B8</strong> and write a formula using <code>=SUBTOTAL()</code> with function code <code>1</code> referencing the unit price column in <code>Medical_Supplies!E2:E21</code> via <code>=SUBTOTAL(1, Medical_Supplies!E2:E21)</code>.",
      targetSheet: "Format_Practice",
      targetCell: "B8",
      solution: "=SUBTOTAL(1, Medical_Supplies!E2:E21)",
      expectedFormulaPrefix: "=SUBTOTAL",
      expectedValue: 261.15,
      tolerance: 0.01,
      hint: "Use =SUBTOTAL(1, Medical_Supplies!E2:E21)",
      difficulty: "medium",
      bloom: "apply",
      xp: 75,
      marks: 1.0,
      check: {
        expected: 261.15,
        tolerance: 0.01,
        mustUseAnyOf: [["SUBTOTAL"]],
        mustReference: ["Medical_Supplies!E2:E21"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "=AVERAGE\\(", message: "Use SUBTOTAL(1, ...) instead of AVERAGE to support dynamic filtered states." }
      ],
      dataScope: {
        cols: ["E"],
        params: ["Function code 1 (AVERAGE)"],
        previewRows: 20,
        summary: "Calculates dynamic average unit price that recalibrates as categories are selected."
      }
    },
    {
      id: "c09",
      number: 9,
      title: "Dynamic Filtered Aggregation: Subtotal Max (SUBTOTAL 4)",
      prompt: "To identify the maximum on-hand stock quantity among filtered visible supplies during inventory audits, navigate to sheet <code>Format_Practice</code> cell <strong>B9</strong> and write a formula using <code>=SUBTOTAL()</code> with function code <code>4</code> referencing the stock quantity column in <code>Medical_Supplies!F2:F21</code> via <code>=SUBTOTAL(4, Medical_Supplies!F2:F21)</code>.",
      targetSheet: "Format_Practice",
      targetCell: "B9",
      solution: "=SUBTOTAL(4, Medical_Supplies!F2:F21)",
      expectedFormulaPrefix: "=SUBTOTAL",
      expectedValue: 400,
      tolerance: 0,
      hint: "Use =SUBTOTAL(4, Medical_Supplies!F2:F21)",
      difficulty: "medium",
      bloom: "apply",
      xp: 75,
      marks: 1.0,
      check: {
        expected: 400,
        tolerance: 0,
        mustUseAnyOf: [["SUBTOTAL"]],
        mustReference: ["Medical_Supplies!F2:F21"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "=MAX\\(", message: "Use SUBTOTAL(4, ...) instead of MAX so hidden rows are omitted." }
      ],
      dataScope: {
        cols: ["F"],
        params: ["Function code 4 (MAX)"],
        previewRows: 20,
        summary: "Extracts highest quantity among filtered supplies."
      }
    },
    {
      id: "c10",
      number: 10,
      title: "Total Diagnostic Inventory Value (SUMIF)",
      prompt: "To aggregate total inventory capital allocated strictly to the Diagnostic equipment category, navigate to sheet <code>Format_Practice</code> cell <strong>B10</strong> and write a formula using <code>=SUMIF()</code> evaluating category range <code>Medical_Supplies!B2:B21</code> for criterion <code>\"Diagnostic\"</code> and summing inventory value in <code>Medical_Supplies!H2:H21</code> via <code>=SUMIF(Medical_Supplies!B2:B21, \"Diagnostic\", Medical_Supplies!H2:H21)</code>.",
      targetSheet: "Format_Practice",
      targetCell: "B10",
      solution: '=SUMIF(Medical_Supplies!B2:B21, "Diagnostic", Medical_Supplies!H2:H21)',
      expectedFormulaPrefix: "=SUMIF",
      expectedValue: 27020,
      tolerance: 0.1,
      hint: 'Use =SUMIF(Medical_Supplies!B2:B21, "Diagnostic", Medical_Supplies!H2:H21)',
      difficulty: "medium",
      bloom: "analyze",
      xp: 75,
      marks: 1.0,
      check: {
        expected: 27020,
        tolerance: 0.1,
        mustUseAnyOf: [["SUMIF"], ["SUMIFS"]],
        mustReference: ["Medical_Supplies!B2:B21", "Medical_Supplies!H2:H21"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=\\d+", message: "Do not hardcode numbers. Write =SUMIF(Medical_Supplies!B2:B21, \"Diagnostic\", Medical_Supplies!H2:H21)." }
      ],
      dataScope: {
        cols: ["B", "H"],
        params: ['Criteria "Diagnostic"'],
        previewRows: 20,
        summary: "Sums Total Inventory Value across the 5 Diagnostic equipment items."
      }
    },
    {
      id: "c11",
      number: 11,
      title: "Count Items with Stock >= 100 (COUNTIF)",
      prompt: "To quantify high-volume well-stocked inventory lines for logistics planning, navigate to sheet <code>Format_Practice</code> cell <strong>B11</strong> and write a formula using <code>=COUNTIF()</code> evaluating stock quantities in <code>Medical_Supplies!F2:F21</code> for criteria <code>\">=100\"</code> via <code>=COUNTIF(Medical_Supplies!F2:F21, \">=100\")</code>.",
      targetSheet: "Format_Practice",
      targetCell: "B11",
      solution: '=COUNTIF(Medical_Supplies!F2:F21, ">=100")',
      expectedFormulaPrefix: "=COUNTIF",
      expectedValue: 7,
      tolerance: 0,
      hint: 'Use =COUNTIF(Medical_Supplies!F2:F21, ">=100")',
      difficulty: "medium",
      bloom: "analyze",
      xp: 75,
      marks: 1.0,
      check: {
        expected: 7,
        tolerance: 0,
        mustUseAnyOf: [["COUNTIF"], ["COUNTIFS"]],
        mustReference: ["Medical_Supplies!F2:F21"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: 'COUNTIF\\(.*, >=100\\)', message: 'Enclose the criterion in quotes: ">=100".' }
      ],
      dataScope: {
        cols: ["F"],
        params: ['Criteria ">=100"'],
        previewRows: 20,
        summary: "Counts well-stocked inventory lines with 100 or more units on hand."
      }
    },
    {
      id: "c12",
      number: 12,
      title: "Average Price of Surgical Items (AVERAGEIF)",
      prompt: "To determine the pricing benchmark and average unit selling price for the high-margin Surgical category, navigate to sheet <code>Format_Practice</code> cell <strong>B12</strong> and write a formula using <code>=AVERAGEIF()</code> evaluating category range <code>Medical_Supplies!B2:B21</code> for criterion <code>\"Surgical\"</code> and averaging unit price in <code>Medical_Supplies!E2:E21</code> via <code>=AVERAGEIF(Medical_Supplies!B2:B21, \"Surgical\", Medical_Supplies!E2:E21)</code>.",
      targetSheet: "Format_Practice",
      targetCell: "B12",
      solution: '=AVERAGEIF(Medical_Supplies!B2:B21, "Surgical", Medical_Supplies!E2:E21)',
      expectedFormulaPrefix: "=AVERAGEIF",
      expectedValue: 365,
      tolerance: 0.01,
      hint: 'Use =AVERAGEIF(Medical_Supplies!B2:B21, "Surgical", Medical_Supplies!E2:E21)',
      difficulty: "medium",
      bloom: "analyze",
      xp: 75,
      marks: 1.0,
      check: {
        expected: 365,
        tolerance: 0.01,
        mustUseAnyOf: [["AVERAGEIF"], ["AVERAGEIFS"]],
        mustReference: ["Medical_Supplies!B2:B21", "Medical_Supplies!E2:E21"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=\\d+", message: "Do not enter 365 directly. Use =AVERAGEIF(Medical_Supplies!B2:B21, \"Surgical\", Medical_Supplies!E2:E21)." }
      ],
      dataScope: {
        cols: ["B", "E"],
        params: ['Criteria "Surgical"'],
        previewRows: 20,
        summary: "Calculates the average selling price across the 4 Surgical equipment rows."
      }
    },
    {
      id: "c13",
      number: 13,
      title: "Multi-Criteria Sum: PPE with Stock >= 100 (SUMIFS)",
      prompt: "To calculate total inventory valuation for high-volume Personal Protective Equipment (PPE), navigate to sheet <code>Format_Practice</code> cell <strong>B13</strong> and write a multi-condition formula using <code>=SUMIFS()</code> summing inventory value in <code>Medical_Supplies!H2:H21</code> where category range <code>Medical_Supplies!B2:B21</code> equals <code>\"PPE\"</code> and stock range <code>Medical_Supplies!F2:F21</code> is <code>\">=100\"</code> via <code>=SUMIFS(Medical_Supplies!H2:H21, Medical_Supplies!B2:B21, \"PPE\", Medical_Supplies!F2:F21, \">=100\")</code>.",
      targetSheet: "Format_Practice",
      targetCell: "B13",
      solution: '=SUMIFS(Medical_Supplies!H2:H21, Medical_Supplies!B2:B21, "PPE", Medical_Supplies!F2:F21, ">=100")',
      expectedFormulaPrefix: "=SUMIFS",
      expectedValue: 25340,
      tolerance: 0.1,
      hint: 'Use =SUMIFS(Medical_Supplies!H2:H21, Medical_Supplies!B2:B21, "PPE", Medical_Supplies!F2:F21, ">=100")',
      difficulty: "medium",
      bloom: "evaluate",
      xp: 75,
      marks: 1.0,
      check: {
        expected: 25340,
        tolerance: 0.1,
        mustUseAnyOf: [["SUMIFS"]],
        mustReference: ["Medical_Supplies!H2:H21", "Medical_Supplies!B2:B21", "Medical_Supplies!F2:F21"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: '=SUMIF\\(', message: 'Multiple conditions require =SUMIFS() with sum_range as the FIRST parameter!' }
      ],
      dataScope: {
        cols: ["B", "F", "H"],
        params: ['Category="PPE"', 'Stock Qty=">=100"'],
        previewRows: 20,
        summary: "Aggregates inventory value for high-volume Personal Protective Equipment."
      }
    },
    {
      id: "c14",
      number: 14,
      title: "Multi-Criteria Count: Surgical Items with Price >= 200 (COUNTIFS)",
      prompt: "To determine the product variety of premium high-cost surgical instrumentation, navigate to sheet <code>Format_Practice</code> cell <strong>B14</strong> and write a multi-condition formula using <code>=COUNTIFS()</code> evaluating category range <code>Medical_Supplies!B2:B21</code> for <code>\"Surgical\"</code> and unit price range <code>Medical_Supplies!E2:E21</code> for <code>\">=200\"</code> via <code>=COUNTIFS(Medical_Supplies!B2:B21, \"Surgical\", Medical_Supplies!E2:E21, \">=200\")</code>.",
      targetSheet: "Format_Practice",
      targetCell: "B14",
      solution: '=COUNTIFS(Medical_Supplies!B2:B21, "Surgical", Medical_Supplies!E2:E21, ">=200")',
      expectedFormulaPrefix: "=COUNTIFS",
      expectedValue: 3,
      tolerance: 0,
      hint: 'Use =COUNTIFS(Medical_Supplies!B2:B21, "Surgical", Medical_Supplies!E2:E21, ">=200")',
      difficulty: "medium",
      bloom: "evaluate",
      xp: 75,
      marks: 1.0,
      check: {
        expected: 3,
        tolerance: 0,
        mustUseAnyOf: [["COUNTIFS"]],
        mustReference: ["Medical_Supplies!B2:B21", "Medical_Supplies!E2:E21"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: '^=3$', message: 'Do not type 3 as a constant. Write =COUNTIFS(Medical_Supplies!B2:B21, "Surgical", Medical_Supplies!E2:E21, ">=200").' }
      ],
      dataScope: {
        cols: ["B", "E"],
        params: ['Category="Surgical"', 'Unit Price=">=200"'],
        previewRows: 20,
        summary: "Filters and counts premium surgical items priced at $200 or more."
      }
    },

    // ── 6 HARD CHALLENGES (c15 - c20) ─────────────────────────────────────────
    {
      id: "c15",
      number: 15,
      title: "Format Number as Standard Currency String (TEXT)",
      prompt: "To present total inventory valuation in standardized executive comma-separated number formatting, navigate to sheet <code>Format_Practice</code> cell <strong>B15</strong> and write a formatting formula using <code>=TEXT()</code> referencing total valuation cell <code>B2</code> with pattern <code>\"#,##0\"</code> via <code>=TEXT(B2, \"#,##0\")</code>.",
      targetSheet: "Format_Practice",
      targetCell: "B15",
      solution: '=TEXT(B2, "#,##0")',
      expectedFormulaPrefix: "=TEXT",
      expectedValue: "137,780",
      tolerance: 0,
      hint: 'Use =TEXT(B2, "#,##0")',
      difficulty: "hard",
      bloom: "create",
      xp: 100,
      marks: 1.0,
      check: {
        expected: "137,780",
        tolerance: 0,
        mustUseAnyOf: [["TEXT"]],
        mustReference: ["B2"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=\"137,780\"$", message: "Do not hardcode the string literal. Use =TEXT(B2, \"#,##0\")." }
      ],
      dataScope: {
        cols: ["B"],
        params: ['Format pattern "#,##0"'],
        previewRows: 5,
        summary: "Converts numeric revenue figure 137780 into comma-separated text string '137,780'."
      }
    },
    {
      id: "c16",
      number: 16,
      title: "Format Date Serial to ISO Format (TEXT YYYY-MM-DD)",
      prompt: "To convert raw Excel date serial numbers into international ISO standard date strings for compliance reporting, navigate to sheet <code>Format_Practice</code> cell <strong>B16</strong> and write a formula using <code>=TEXT()</code> converting the expiry serial in <code>Medical_Supplies!G2</code> with pattern <code>\"yyyy-mm-dd\"</code> via <code>=TEXT(Medical_Supplies!G2, \"yyyy-mm-dd\")</code>.",
      targetSheet: "Format_Practice",
      targetCell: "B16",
      solution: '=TEXT(Medical_Supplies!G2, "yyyy-mm-dd")',
      expectedFormulaPrefix: "=TEXT",
      expectedValue: "2026-12-01",
      tolerance: 0,
      hint: 'Use =TEXT(Medical_Supplies!G2, "yyyy-mm-dd")',
      difficulty: "hard",
      bloom: "create",
      xp: 100,
      marks: 1.0,
      check: {
        expected: "2026-12-01",
        tolerance: 0,
        mustUseAnyOf: [["TEXT"]],
        mustReference: ["Medical_Supplies!G2"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=\"2026-12-01\"$", message: "Do not hardcode the date string. Use =TEXT(Medical_Supplies!G2, \"yyyy-mm-dd\")." }
      ],
      dataScope: {
        cols: ["G"],
        params: ['Pattern "yyyy-mm-dd"'],
        previewRows: 5,
        summary: "Transforms Excel integer serial 46357 into standard ISO date string '2026-12-01'."
      }
    },
    {
      id: "c17",
      number: 17,
      title: "Format Markup to Percentage String (TEXT 0%)",
      prompt: "To convert decimal markup ratios into executive-ready percentage strings for margin presentation, navigate to sheet <code>Format_Practice</code> cell <strong>B17</strong> and write a formula using <code>=TEXT()</code> converting markup cell <code>Medical_Supplies!I2</code> with format pattern <code>\"0%\"</code> via <code>=TEXT(Medical_Supplies!I2, \"0%\")</code>.",
      targetSheet: "Format_Practice",
      targetCell: "B17",
      solution: '=TEXT(Medical_Supplies!I2, "0%")',
      expectedFormulaPrefix: "=TEXT",
      expectedValue: "80%",
      tolerance: 0,
      hint: 'Use =TEXT(Medical_Supplies!I2, "0%")',
      difficulty: "hard",
      bloom: "create",
      xp: 100,
      marks: 1.0,
      check: {
        expected: "80%",
        tolerance: 0,
        mustUseAnyOf: [["TEXT"]],
        mustReference: ["Medical_Supplies!I2"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=\"80%\"$", message: "Do not hardcode '80%'. Write =TEXT(Medical_Supplies!I2, \"0%\")." }
      ],
      dataScope: {
        cols: ["I"],
        params: ['Pattern "0%"'],
        previewRows: 5,
        summary: "Formats floating point ratio 0.8 into percentage label '80%'."
      }
    },
    {
      id: "c18",
      number: 18,
      title: "Clinic Allocation Lookup (XLOOKUP)",
      prompt: "To retrieve the approved monthly supply budget allocation for Mercy General Outpatient (ID 'CLN-03'), navigate to sheet <code>Format_Practice</code> cell <strong>B18</strong> and write a formula using <code>=XLOOKUP()</code> searching for <code>\"CLN-03\"</code> in clinic ID range <code>Clinics!A2:A7</code> and returning the budget from allocation range <code>Clinics!D2:D7</code> via <code>=XLOOKUP(\"CLN-03\", Clinics!A2:A7, Clinics!D2:D7)</code>.",
      targetSheet: "Format_Practice",
      targetCell: "B18",
      solution: '=XLOOKUP("CLN-03", Clinics!A2:A7, Clinics!D2:D7)',
      expectedFormulaPrefix: "=XLOOKUP",
      expectedValue: 68000,
      tolerance: 0,
      hint: 'Use =XLOOKUP("CLN-03", Clinics!A2:A7, Clinics!D2:D7)',
      difficulty: "hard",
      bloom: "evaluate",
      xp: 100,
      marks: 1.0,
      check: {
        expected: 68000,
        tolerance: 0,
        mustUseAnyOf: [["XLOOKUP"]],
        mustReference: ["Clinics!A2:A7", "Clinics!D2:D7"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=68000$", message: "Do not hardcode 68000. Write =XLOOKUP(\"CLN-03\", Clinics!A2:A7, Clinics!D2:D7)." }
      ],
      dataScope: {
        cols: ["A", "D"],
        params: ['Lookup value "CLN-03"'],
        previewRows: 7,
        summary: "Performs exact lookup on Clinic ID (A) returning Monthly Allocation (D)."
      }
    },
    {
      id: "c19",
      number: 19,
      title: "Multi-Level Sort on Medical Supplies (Sort Tool)",
      prompt: "To organize medical inventory hierarchically for departmental purchasing reviews, navigate to sheet <code>Medical_Supplies</code> table range <strong>A2:I21</strong> and use the Ribbon Data Sort tool to sort by <strong>Category</strong> (Ascending, A to Z) as the primary key, and then by <strong>Unit Price</strong> (Descending, Z to A) as the secondary key.",
      targetSheet: "Medical_Supplies",
      targetCell: "B2",
      mode: "state",
      hint: "Select table range A2:I21, open Data -> Sort, and configure primary sort on Category (A to Z) and secondary sort on Unit Price (Z to A).",
      difficulty: "hard",
      bloom: "analyze",
      xp: 100,
      marks: 1.0,
      check: {
        state: {
          type: "sort",
          sheet: "Medical_Supplies",
          keys: [{ col: 1, order: "asc" }, { col: 4, order: "desc" }]
        }
      },
      dataScope: {
        cols: ["B", "E"],
        params: ["Category ASC", "Unit Price DESC"],
        previewRows: 20,
        summary: "Reorders clinical supplies hierarchically by Category and Price."
      }
    },
    {
      id: "c20",
      number: 20,
      title: "Conditional Formatting on Low Stock (CF Tool)",
      prompt: "To establish an automated visual stockout alert for clinical supply replenishment, navigate to sheet <code>Medical_Supplies</code> range <strong>F2:F21</strong> and apply a Conditional Formatting Highlight Cells Rule using the Ribbon tool for quantities <strong>Less Than 50</strong>.",
      targetSheet: "Medical_Supplies",
      targetCell: "F2:F21",
      mode: "state",
      hint: "Select F2:F21, choose Conditional Formatting -> Highlight Cells Rules -> Less Than 50.",
      difficulty: "hard",
      bloom: "create",
      xp: 100,
      marks: 1.0,
      check: {
        state: {
          type: "cf",
          sheet: "Medical_Supplies",
          targetRange: "F2:F21",
          operator: "lessThan",
          threshold: 50
        }
      },
      dataScope: {
        cols: ["F"],
        params: ["Threshold < 50"],
        previewRows: 20,
        summary: "Visual alert highlighting critical stockout risks (Titanium Scalpel, Patient Monitor, etc.)."
      }
    }
  ]
};
