// public/excel/content/excel-day-11.js
// Manodemy Excel Studio — Day 11 Curriculum Manifest & Challenges
// Topic: Advanced PivotTables, Calculated Fields and Pivot Charts (Global Day 29)
// Conforms to: Style Guide, Schema v2.1, and Dataset Registry (Beacon Property Group - REIT)

if (!window.EXCEL_COURSE_CONTENT) window.EXCEL_COURSE_CONTENT = {};

window.EXCEL_COURSE_CONTENT['excelDay11'] = {
  day: 11,
  globalDay: 29,
  title: "Advanced PivotTables & Pivot Charts",
  description: "Master advanced PivotTable engineering: Calculated Fields, 'Show Values As' dynamic ratios (% of Column, % of Row, Difference From), running totals, timeline slicers, dual-axis column & line PivotCharts, GETPIVOTDATA formula architecture, Power Pivot / Data Model relational concepts, and interactive multi-slicer executive dashboards.",
  topics: [
    "01. Calculated Fields vs. Calculated Items in the Pivot Engine",
    "02. 'Show Values As' Mechanics: % of Column, % of Row & % of Parent",
    "03. Difference From & % Difference From: Benchmark & Variance Analysis",
    "04. Running Totals & Cumulative Trajectory in PivotTables",
    "05. Timeline Slicers vs. Standard Dimension Slicers",
    "06. Pivot Charts: Dual-Axis Column + Line Visualizations",
    "07. GETPIVOTDATA: Syntax, Grammar & Dynamic Extraction",
    "08. The Excel Data Model & Power Pivot Relational Architecture",
    "09. Interactive Multi-Slicer Executive Dashboards (Report Connections)",
    "10. Production Audit & Cross-Checking Advanced Pivot Metrics"
  ],
  slides: [
    {
      title: "Advanced PivotTables, Calculated Fields & Pivot Charts",
      html: `
<section class="slide-section" id="sec01">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingCalculatedFields">
    <span class="heading-num-box">01</span>
    <span class="heading-title-box">
      <span class="heading-icon">⚡</span>
      <span class="heading-title-text">Calculated Fields vs. Calculated Items in the Pivot Engine</span>
      <button class="audio-play-btn" data-track-idx="0" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <div class="pro-tip-box" style="margin-bottom: 16px;">
      <h4>⚡ Real Estate Private Equity Hotkeys: Pivot Refresh</h4>
      <p>Never rely on automatic updates for in-memory Pivot Caches: press <kbd>Alt</kbd> + <kbd>F5</kbd> to refresh the active PivotTable, or press <kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>F5</kbd> to refresh all PivotTables, Data Models, and external connections across the entire workbook.</p>
    </div>
    <p class="lead-text">In enterprise financial reporting and institutional portfolio analysis, raw transactions rarely provide final executive metrics. Analysts need derived ratios—such as <strong>Effective Gross Rent per SqFt</strong> or <strong>Escalation Adjustments</strong>—without inflating the source database with dozens of redundant helper columns.</p>
    <div class="architecture-grid">
      <div class="arch-box">
        <h4>1. Raw Source Field</h4>
        <p>A physical column stored in the worksheet table (e.g., <code>Annual Base Rent</code>, <code>CAM Fees</code>, <code>Leased SqFt</code>).</p>
      </div>
      <div class="arch-box">
        <h4>2. Calculated Field (Virtual Column)</h4>
        <p>A formula-driven measure operating on the <strong>SUM</strong> of underlying fields across the dataset: <code>='Annual Base Rent' + 'CAM Fees'</code>.</p>
      </div>
      <div class="arch-box">
        <h4>3. Calculated Item (Virtual Row/Member)</h4>
        <p>A custom dimension member within an existing field (e.g., creating a synthetic <code>Commercial Total = Office + Retail</code>).</p>
      </div>
    </div>
    <div class="keynote-box keynote-emerald">
      <strong>Crucial Aggregation Rule:</strong> Calculated Fields always evaluate formulas on the <em>sum of the fields</em>, not row-by-row. When computing <code>='Gross Revenue' / 'Leased SqFt'</code>, Excel computes <code>SUM(Gross Revenue) / SUM(Leased SqFt)</code>. This accurately calculates the mathematically sound portfolio-weighted average rather than a distorted average-of-averages.
    </div>
    <div class="anti-pattern-card">
      <div class="anti-pattern-header">⚠️ Anti-Pattern: Non-Additive Functions in Calculated Fields</div>
      <p><strong>The Mistake:</strong> Attempting to use non-additive formulas like <code>=MEDIAN(Annual Base Rent)</code> or <code>=COUNTIF(...)</code> inside a Calculated Field dialog.</p>
      <p><strong>The Fix:</strong> Calculated Fields only support basic arithmetic operators (+, -, *, /) and additive aggregation. For advanced statistical or context-sensitive measures, load tables into the Power Pivot Data Model and author DAX measures.</p>
    </div>
  </div>
</section>

<section class="slide-section" id="sec02">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingShowValuesAs">
    <span class="heading-num-box">02</span>
    <span class="heading-title-box">
      <span class="heading-icon">📊</span>
      <span class="heading-title-text">'Show Values As' Mechanics: % of Column, % of Row & % of Parent</span>
      <button class="audio-play-btn" data-track-idx="1" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p>Executives rarely evaluate absolute dollar figures in isolation. A $7,000,000 lease revenue number only gains strategic context when expressed as a percentage of fund capital. Excel's <strong>Show Values As</strong> engine provides instant ratio transformations without modifying source data.</p>
    <div class="table-responsive">
      <table class="reference-table">
        <thead>
          <tr>
            <th>Calculation Option</th>
            <th>Formula Equivalent</th>
            <th>Analytical Purpose</th>
            <th>Institutional Real Estate Use Case</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>% of Column Total</strong></td>
            <td><code>=Cell / Column Grand Total</code></td>
            <td>Measures share of total vertical category.</td>
            <td>Asset class contribution to total fund gross revenue.</td>
          </tr>
          <tr>
            <td><strong>% of Row Total</strong></td>
            <td><code>=Cell / Row Grand Total</code></td>
            <td>Measures geographical or horizontal dispersion.</td>
            <td>Regional distribution of an individual asset class.</td>
          </tr>
          <tr>
            <td><strong>% of Parent Total</strong></td>
            <td><code>=Cell / Subtotal of Hierarchy</code></td>
            <td>Evaluates subgroup share within parent level.</td>
            <td>Submarket office revenue as % of metropolitan total.</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="keynote-box keynote-emerald">
      <strong>Analyst Golden Standard:</strong> Display percentage distributions by duplicating the metric field in the <strong>Values</strong> quadrant: leave the first instance as <em>Sum of Gross Revenue</em> (Currency format) and set the second instance to <em>Show Values As → % of Column Total</em> (Percentage format).
    </div>
    <div class="anti-pattern-card">
      <div class="anti-pattern-header">⚠️ Anti-Pattern: Manual Ratio Formulas Beside the Pivot</div>
      <p><strong>The Mistake:</strong> Writing formulas like <code>=D13/$D$17</code> in adjacent cells outside the PivotTable boundary, which break or misalign the second the table is filtered or refreshed.</p>
      <p><strong>The Gold Standard:</strong> Embed the calculation directly within the Pivot Cache via Show Values As.</p>
    </div>
  </div>
</section>

<section class="slide-section" id="sec03">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingDifferenceFrom">
    <span class="heading-num-box">03</span>
    <span class="heading-title-box">
      <span class="heading-icon">⚖️</span>
      <span class="heading-title-text">Difference From & % Difference From: Benchmark & Variance Analysis</span>
      <button class="audio-play-btn" data-track-idx="2" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p>In asset management, variance analysis answers two core executive questions: <em>"How are we performing compared to our benchmark?"</em> and <em>"How has performance changed period-over-period?"</em></p>
    <div class="architecture-grid">
      <div class="arch-box">
        <h4>1. Base Field</h4>
        <p>The dimension against which deltas are computed (e.g., <code>Asset Class</code> or <code>Lease Start Quarter</code>).</p>
      </div>
      <div class="arch-box">
        <h4>2. Base Item</h4>
        <p>The specific benchmark member (e.g., <code>Office</code> as core benchmark, or <code>(previous)</code> for sequential deltas).</p>
      </div>
      <div class="arch-box">
        <h4>3. Output Representation</h4>
        <p><strong>Difference From:</strong> Dollar delta ($).<br><strong>% Difference From:</strong> Relative percentage spread (%).</p>
      </div>
    </div>
    <div class="keynote-box keynote-emerald">
      <strong>Variance Rule:</strong> When selecting <code>(previous)</code> as your Base Item for quarter-over-quarter tracking, ensure your row field is sorted chronologically. If categories are sorted alphabetically, your variance math will compare February to April erratically.
    </div>
    <div class="anti-pattern-card">
      <div class="anti-pattern-header">💼 Senior Analyst Insight: Benchmarking Against Core Assets</div>
      <p><strong>Production Context:</strong> Setting <code>Base Item = Office</code> instantly reveals how much more or less revenue Retail, Industrial, and Multi-Family assets generate compared to the company's flagship office portfolio.</p>
    </div>
  </div>
</section>

<section class="slide-section" id="sec04">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingRunningTotals">
    <span class="heading-num-box">04</span>
    <span class="heading-title-box">
      <span class="heading-icon">📈</span>
      <span class="heading-title-text">Running Totals & Cumulative Trajectory in PivotTables</span>
      <button class="audio-play-btn" data-track-idx="3" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p>Tracking year-to-date capital absorption, cumulative lease commitments, or fund portfolio scaling requires cumulative trajectory reporting. PivotTables calculate this dynamically through <strong>Running Total In...</strong>.</p>
    <div class="table-responsive">
      <table class="reference-table">
        <thead>
          <tr>
            <th>Setting</th>
            <th>Formula Logic</th>
            <th>Best Applied To</th>
            <th>Key Benefit</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Running Total In...</strong></td>
            <td><code>=Cumulative Sum(1..N)</code></td>
            <td>Chronological periods or ordered tiers.</td>
            <td>Unbreakable pacing curves that adapt to slicer filters.</td>
          </tr>
          <tr>
            <td><strong>% Running Total In...</strong></td>
            <td><code>=Cumulative Sum / Total</code></td>
            <td>Target milestone tracking.</td>
            <td>Shows % completion toward 100% annual leasing quota.</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="keynote-box keynote-emerald">
      <strong>Chronological Requirement:</strong> Running totals require an ordered dimension in Row Labels. Applying a running total across an unordered categorical field (e.g. random tenant names) produces mathematically nonsensical reporting.
    </div>
    <div class="anti-pattern-card">
      <div class="anti-pattern-header">⚠️ Anti-Pattern: Fragile Cumulative Helper Formulas</div>
      <p><strong>The Mistake:</strong> Adding manual formulas like <code>=C22+B23</code> outside the table, which fail when slicers dynamically filter out row categories.</p>
      <p><strong>The Solution:</strong> Use PivotTable native Running Total In, which recalculates the cumulative trajectory dynamically for visible filtered items.</p>
    </div>
  </div>
</section>

<section class="slide-section" id="sec05">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingTimelineSlicers">
    <span class="heading-num-box">05</span>
    <span class="heading-title-box">
      <span class="heading-icon">⏱️</span>
      <span class="heading-title-text">Timeline Slicers vs. Standard Dimension Slicers</span>
      <button class="audio-play-btn" data-track-idx="4" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p>Standard Slicers provide buttons for discrete dimensions like City, Asset Class, or Tenant. However, when filtering continuous temporal data, standard slicers clutter the dashboard with hundreds of individual date buttons.</p>
    <div class="architecture-grid">
      <div class="arch-box">
        <h4>1. Standard Slicer</h4>
        <p>Best for discrete categorical dimensions (e.g., <code>City</code>, <code>Asset Class</code>, <code>Risk Tier</code>). Click or Ctrl-click to filter.</p>
      </div>
      <div class="arch-box">
        <h4>2. Timeline Slicer</h4>
        <p>Dedicated visual time slider. Lets users switch between Years, Quarters, Months, and Days with interactive range handles.</p>
      </div>
      <div class="arch-box">
        <h4>3. Combined Filtering</h4>
        <p>Stack a Timeline Slicer with a City Slicer to view: <em>"Industrial leases commenced in Q2 2025 across Boston and Dallas."</em></p>
      </div>
    </div>
    <div class="keynote-box keynote-emerald">
      <strong>Data Hygiene Gate:</strong> Timeline Slicers strictly require real Excel date serials (e.g. 45670 for Jan 2025). If even one cell in your date column contains text, blanks, or errors, Excel disables the Timeline Slicer button completely.
    </div>
    <div class="anti-pattern-card">
      <div class="anti-pattern-header">⚠️ Anti-Pattern: The Text Date Trap</div>
      <p><strong>The Mistake:</strong> Storing dates as strings like <code>"2025-Q1"</code> or <code>"Jan 2025"</code>, preventing Excel from recognizing calendar hierarchies.</p>
      <p><strong>The Solution:</strong> Store true date serials and format as <code>yyyy-mm-dd</code> or <code>mmm-yy</code>.</p>
    </div>
  </div>
</section>

<section class="slide-section" id="sec06">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingPivotCharts">
    <span class="heading-num-box">06</span>
    <span class="heading-title-box">
      <span class="heading-icon">📉</span>
      <span class="heading-title-text">Pivot Charts: Dual-Axis Column + Line Visualizations</span>
      <button class="audio-play-btn" data-track-idx="5" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p>When presenting real estate metrics to investment committees, analysts must communicate scale (volume) alongside intensity (rate). Plotting 400,000 square feet alongside a $45/sqft rental rate on a single axis renders the rental rate completely invisible.</p>
    <div class="architecture-grid">
      <div class="arch-box">
        <h4>Primary Axis (Columns)</h4>
        <p>Represents large volumetric scale: Total Leased Square Footage (0 to 500,000 SqFt) formatted as Clustered Column bars.</p>
      </div>
      <div class="arch-box">
        <h4>Secondary Axis (Line)</h4>
        <p>Represents intensity/pricing: Average Gross Rent per SqFt ($0 to $80/SqFt) plotted as an overlay Line with Markers.</p>
      </div>
      <div class="arch-box">
        <h4>Pivot Cache Synchronization</h4>
        <p>The chart responds instantly to all dashboard slicers with zero latency, providing an interactive executive presentation tool.</p>
      </div>
    </div>
    <div class="keynote-box keynote-emerald">
      <strong>PivotChart Rule:</strong> Never disconnect a PivotChart from its source PivotTable. Formatting changes made to the PivotTable (number formatting, field names) reflect automatically in chart tooltips and axis labels.
    </div>
    <div class="anti-pattern-card">
      <div class="anti-pattern-header">⚠️ Anti-Pattern: Axis Distortion</div>
      <p><strong>The Mistake:</strong> Leaving both metrics on the primary axis, making $54.42 look like a flat zero next to 171,000 square feet.</p>
      <p><strong>The Fix:</strong> Right-click chart → <strong>Change Chart Type → Combo</strong> → check <strong>Secondary Axis</strong> for the rate metric.</p>
    </div>
  </div>
</section>

<section class="slide-section" id="sec07">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingGetPivotData">
    <span class="heading-num-box">07</span>
    <span class="heading-title-box">
      <span class="heading-icon">🎯</span>
      <span class="heading-title-text">GETPIVOTDATA: Syntax, Grammar & Dynamic Extraction</span>
      <button class="audio-play-btn" data-track-idx="6" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p>When building custom corporate financial statements or executive scorecards, direct coordinate references (like <code>=B4</code>) fail as soon as rows are sorted or expanded. The <code>=GETPIVOTDATA()</code> function solves this by querying data semantically.</p>
    <div class="architecture-grid">
      <div class="arch-box">
        <h4>1. Target Measure</h4>
        <p><code>"Annual Base Rent"</code> — The exact name of the value field being queried.</p>
      </div>
      <div class="arch-box">
        <h4>2. Pivot Table Anchor</h4>
        <p><code>$A$3</code> — Any cell coordinate located inside the target PivotTable.</p>
      </div>
      <div class="arch-box">
        <h4>3. Field & Item Pairs</h4>
        <p><code>"Asset Class", "Office", "City", "Boston"</code> — Dimensional coordinates specifying exact intersection.</p>
      </div>
    </div>
    <div class="keynote-box keynote-emerald">
      <strong>Dynamic Extraction Trick:</strong> Replace literal strings with worksheet cell references: <code>=GETPIVOTDATA("Annual Base Rent", $A$3, "Asset Class", A22, "City", B22)</code>. This allows you to drag formulas across custom KPI cards while retaining total immunity to PivotTable restructuring!
    </div>
    <div class="anti-pattern-card">
      <div class="anti-pattern-header">💼 Interview Insight: "Why Not Disable GETPIVOTDATA?"</div>
      <p><strong>The Misconception:</strong> Many beginner analysts disable GETPIVOTDATA because it auto-generates long formulas when clicking cells.</p>
      <p><strong>The Senior Analyst Answer:</strong> "Disabling it creates fragile coordinate dependencies. In production financial models, GETPIVOTDATA ensures executive KPI scorecards never display wrong figures after table refreshing or sorting."</p>
    </div>
  </div>
</section>

<section class="slide-section" id="sec08">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingPowerPivotDataModel">
    <span class="heading-num-box">08</span>
    <span class="heading-title-box">
      <span class="heading-icon">🗄️</span>
      <span class="heading-title-text">The Excel Data Model & Power Pivot Relational Architecture</span>
      <button class="audio-play-btn" data-track-idx="7" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p>Traditional PivotTables require all data to exist in a single flat table. In enterprise data warehousing, datasets are normalized across fact tables (e.g., <code>Property_Leases</code>) and dimension tables (e.g., <code>Asset_Classes</code>). Merging them with <code>VLOOKUP</code> inflates workbook size and degrades performance.</p>
    <div class="architecture-grid">
      <div class="arch-box">
        <h4>1. The Data Model (xVelocity)</h4>
        <p>An in-memory columnar database embedded in Excel capable of handling tens of millions of rows with high compression.</p>
      </div>
      <div class="arch-box">
        <h4>2. Relational Schema (1-to-Many)</h4>
        <p>Links <code>Property_Leases[Asset Class]</code> (Foreign Key) to <code>Asset_Classes[Asset Class]</code> (Primary Key) without lookup formulas.</p>
      </div>
      <div class="arch-box">
        <h4>3. Distinct Count & DAX</h4>
        <p>Unlocks true <strong>Distinct Count</strong> aggregation and Data Analysis Expressions (DAX) for complex time-intelligence.</p>
      </div>
    </div>
    <div class="keynote-box keynote-emerald">
      <strong>Enterprise Architecture:</strong> By checking <em>"Add this data to the Data Model"</em> when inserting a PivotTable, you transition from basic spreadsheet mechanics to enterprise Business Intelligence engineering.
    </div>
    <div class="anti-pattern-card">
      <div class="anti-pattern-header">⚠️ Anti-Pattern: VLOOKUP-Bloated Flat Files</div>
      <p><strong>The Mistake:</strong> Adding 15 VLOOKUP columns across 200,000 rows to pull master data attributes, slowing workbook recalculation to a crawl.</p>
      <p><strong>The Fix:</strong> Load both tables into the Data Model and establish a 1-to-Many relationship in Power Pivot Diagram View.</p>
    </div>
  </div>
</section>

<section class="slide-section" id="sec09">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingReportConnections">
    <span class="heading-num-box">09</span>
    <span class="heading-title-box">
      <span class="heading-icon">🎛️</span>
      <span class="heading-title-text">Interactive Multi-Slicer Executive Dashboards (Report Connections)</span>
      <button class="audio-play-btn" data-track-idx="8" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p>Executive dashboards combine multiple analytical views on a single screen: a Geographic Revenue Matrix, a Calculated Rent-per-Square-Foot Scorecard, and a Cumulative Pacing Table. Having separate filter controls for each table creates a fragmented user experience.</p>
    <div class="architecture-grid">
      <div class="arch-box">
        <h4>1. Report Connections Setup</h4>
        <p>Right-click any Slicer or Timeline → select <strong>Report Connections</strong> → check all PivotTables on the dashboard.</p>
      </div>
      <div class="arch-box">
        <h4>2. Shared Pivot Cache Prerequisite</h4>
        <p>All connected PivotTables must be created from the identical source table or Data Model to allow unified filtering.</p>
      </div>
      <div class="arch-box">
        <h4>3. Synchronized Executive Response</h4>
        <p>Clicking "Dallas" updates the geographic matrix, recalculates total effective rent, and re-plots the combo chart simultaneously.</p>
      </div>
    </div>
    <div class="keynote-box keynote-emerald">
      <strong>Dashboard Design Principle:</strong> Group your interactive slicers together in a top header ribbon or a left-hand navigation rail. Maintain consistent color coding matching corporate brand standards.
    </div>
    <div class="anti-pattern-card">
      <div class="anti-pattern-header">⚠️ Anti-Pattern: Slicer Cache Fragmentation</div>
      <p><strong>The Mistake:</strong> Creating three PivotTables from three different cell coordinate selections, creating three separate Pivot Caches that cannot share Slicers.</p>
      <p><strong>The Solution:</strong> Build every PivotTable from the same named Excel Table (<code>Table_Leases</code>) or Data Model.</p>
    </div>
  </div>
</section>

<section class="slide-section" id="sec10">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingProductionAudit">
    <span class="heading-num-box">10</span>
    <span class="heading-title-box">
      <span class="heading-icon">🛡️</span>
      <span class="heading-title-text">Production Audit & Cross-Checking Advanced Pivot Metrics</span>
      <button class="audio-play-btn" data-track-idx="9" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p>In institutional capital markets and REIT fund administration, publishing an unverified dashboard is an unacceptable operational risk. A corrupted filter or accidental item exclusion can hide millions in liabilities. Analysts must enforce mathematical reconciliation gates.</p>
    <div class="table-responsive">
      <table class="reference-table">
        <thead>
          <tr>
            <th>Audit Gate Element</th>
            <th>Worksheet Location</th>
            <th>Formula / Value</th>
            <th>Audit Validation Role</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Pivot Grand Total</strong></td>
            <td><code>BI_Executive_Dashboard!H8</code></td>
            <td>Grand Total ($31,118,000)</td>
            <td>The aggregated figure presented to investment leadership.</td>
          </tr>
          <tr>
            <td><strong>Independent Ledger Sum</strong></td>
            <td><code>BI_Executive_Dashboard!B29</code></td>
            <td><code>=SUM(Property_Leases!G2:G25)</code></td>
            <td>Direct summation of raw transaction ledger ($31,118,000).</td>
          </tr>
          <tr>
            <td><strong>Zero-Variance Verification</strong></td>
            <td><code>BI_Executive_Dashboard!D29</code></td>
            <td><code>=ROUND(B29 - H8, 2)</code></td>
            <td>Mathematical proof that variance is strictly $0.00.</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="keynote-box keynote-emerald">
      <strong>Zero-Variance Rule:</strong> If an inadvertent filter excludes a lease or ghost records distort the cache, the formula <code>=ROUND(B29-H8, 2)</code> immediately shows a non-zero variance. Professional analytics engineers never hand off a workbook without an active zero-variance gate.
    </div>
    <div class="anti-pattern-card">
      <div class="anti-pattern-header">💼 Executive Takeaway</div>
      <p><strong>The Mark of an Elite Analyst:</strong> Anyone can drag fields into a PivotTable. Elite analytics professionals master Calculated Fields, design responsive multi-slicer dashboards, and construct ironclad audit reconciliation gates to deliver flawless enterprise intelligence.</p>
    </div>
  </div>
</section>
`
    }
  ],

  // ═══════════════ CANONICAL SEED WORKBOOK: BEACON PROPERTY GROUP ═══════════════
  initialWorkbook: {
    "Property_Leases": [
      ["Lease ID", "Property Name", "Asset Class", "City", "Tenant Name", "Leased SqFt", "Annual Base Rent", "CAM Fees", "Lease Start Serial", "Term Years", "Escalation Rate"],
      ["LSE-801", "Beacon Harbor Tower",      "Office",       "Boston",        "Vertex Biopharma",    25000, 1250000, 125000, 45670, 5,  0.030],
      ["LSE-802", "Copley Galleria",          "Retail",       "Boston",        "Nordstrom Local",     18000, 900000,  90000,  45700, 7,  0.035],
      ["LSE-803", "Logan Logistics Hub",      "Industrial",   "Boston",        "Wayfair Fulfillment", 60000, 1200000, 100000, 45720, 10, 0.025],
      ["LSE-804", "Back Bay Residences",      "Multi-Family", "Boston",        "Beacon Living LLC",   40000, 1400000, 80000,  45750, 3,  0.030],
      ["LSE-805", "Midtown Plaza",            "Office",       "New York",      "Gotham Capital",      30000, 2100000, 210000, 45680, 5,  0.030],
      ["LSE-806", "SoHo Promenade",           "Retail",       "New York",      "Zara Flagship",       15000, 1350000, 135000, 45710, 10, 0.035],
      ["LSE-807", "JFK Distribution Park",    "Industrial",   "New York",      "FedEx Express",       75000, 1875000, 150000, 45730, 7,  0.025],
      ["LSE-808", "Chelsea Highline Lofts",   "Multi-Family", "New York",      "Manhattan Leases",    35000, 1750000, 105000, 45760, 3,  0.030],
      ["LSE-809", "Wacker Drive Tower",       "Office",       "Chicago",       "CME Analytics",       28000, 1120000, 112000, 45690, 5,  0.030],
      ["LSE-810", "Michigan Ave Shops",       "Retail",       "Chicago",       "Apple Retail",        16000, 960000,  96000,  45715, 7,  0.035],
      ["LSE-811", "O'Hare Airfreight Ctr",   "Industrial",   "Chicago",       "DHL Global",          70000, 1400000, 120000, 45740, 10, 0.025],
      ["LSE-812", "Lincoln Park Commons",     "Multi-Family", "Chicago",       "Windy City Prop",     32000, 1120000, 70000,  45770, 3,  0.030],
      ["LSE-813", "Legacy Central Tower",     "Office",       "Dallas",        "Apex Energy",         32000, 1120000, 112000, 45695, 5,  0.030],
      ["LSE-814", "Galleria North",           "Retail",       "Dallas",        "Sephora Retail",      14000, 700000,  70000,  45725, 5,  0.035],
      ["LSE-815", "DFW Logistics Gateway",    "Industrial",   "Dallas",        "Amazon Logistics",    80000, 1440000, 120000, 45745, 10, 0.025],
      ["LSE-816", "Uptown Residences",        "Multi-Family", "Dallas",        "Lone Star Living",    38000, 1140000, 76000,  45775, 3,  0.030],
      ["LSE-817", "Mission Bay Tech Hub",     "Office",       "San Francisco", "CloudScale Systems",  26000, 1820000, 182000, 45685, 5,  0.030],
      ["LSE-818", "Union Square Pavilion",    "Retail",       "San Francisco", "Tiffany & Co",        12000, 1080000, 108000, 45705, 10, 0.035],
      ["LSE-819", "Bay Area Freight Depot",   "Industrial",   "San Francisco", "Prologis Trans",      65000, 1625000, 130000, 45735, 7,  0.025],
      ["LSE-820", "SOMA Grand Lofts",         "Multi-Family", "San Francisco", "Pacific Living",     30000, 1500000, 90000,  45765, 3,  0.030],
      ["LSE-821", "Peachtree Center",         "Office",       "Atlanta",       "Delta Financial",     30000, 1050000, 105000, 45698, 5,  0.030],
      ["LSE-822", "Buckhead Village",         "Retail",       "Atlanta",       "Lululemon Athletica", 14000, 770000,  77000,  45718, 7,  0.035],
      ["LSE-823", "ATL Airport Intermodal",   "Industrial",   "Atlanta",       "UPS Supply Chain",    72000, 1296000, 110000, 45748, 10, 0.025],
      ["LSE-824", "Midtown Skyline Apts",     "Multi-Family", "Atlanta",       "Peachtree Living",    36000, 1152000, 72000,  45778, 3,  0.030]
    ],
    "Asset_Classes": [
      ["Asset Class", "Target Yield", "Cap Rate Benchmark", "Portfolio Target Weight", "Risk Tier"],
      ["Office",       0.065, 0.058, 0.30, "Core"],
      ["Retail",       0.072, 0.065, 0.20, "Core-Plus"],
      ["Industrial",   0.058, 0.050, 0.35, "Prime"],
      ["Multi-Family", 0.052, 0.046, 0.15, "Core"]
    ],
    "BI_Executive_Dashboard": [
      ["Beacon Property Group — Executive BI & Advanced Pivot Dashboard", "", "", "", "", "", "", ""],
      ["1. Asset Class by City Base Rent Cross-Tabulation ($)", "", "", "", "", "", "", ""],
      ["Asset Class", "Boston", "New York", "Chicago", "Dallas", "San Francisco", "Atlanta", "Grand Total"],
      ["Office",       "",      "",         "",        "",       "",              1050000,   ""],
      ["Retail",       900000,  1350000,    960000,    700000,   1080000,         770000,    ""],
      ["Industrial",   1200000, 1875000,    1400000,   1440000,  1625000,         1296000,   ""],
      ["Multi-Family", 1400000, 1750000,    1120000,   1140000,  1500000,         1152000,   ""],
      ["Grand Total",  "",      "",         4600000,   4400000,  6025000,         4268000,   ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["2. Calculated Field & Show Values As Performance Engine", "", "", "", "", "", "", ""],
      ["Asset Class", "Total Base Rent", "Total CAM Fees", "Gross Total Revenue", "Total Leased SqFt", "Gross Rent / SqFt", "% Share of Portfolio", ""],
      ["Office",       8460000,           846000,           "",                    171000,              "",                   "",                       ""],
      ["Retail",       5760000,           576000,           6336000,               89000,               71.19,                0.1877,                   ""],
      ["Industrial",   8836000,           730000,           9566000,               422000,              22.67,                0.2833,                   ""],
      ["Multi-Family", 8062000,           493000,           8555000,               211000,              40.55,                0.2534,                   ""],
      ["Grand Total",  31118000,          2645000,          33763000,              893000,              37.81,                1.0000,                   ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["3. Cumulative Running Total & Benchmark Reconciliation", "", "", "", "", "", "", ""],
      ["Asset Class", "Portfolio Gross Revenue", "Running Cumulative Revenue", "Target Yield (XLOOKUP)", "Benchmark Weight", "", "", ""],
      ["Office",       9306000,                   "",                           "",                       0.30,               "", "", ""],
      ["Retail",       6336000,                   "",                           0.072,                    0.20,               "", "", ""],
      ["Industrial",   9566000,                   25208000,                     0.058,                    0.35,               "", "", ""],
      ["Multi-Family", 8555000,                   33763000,                     0.052,                    0.15,               "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["4. Production Audit & Zero-Variance Verification", "", "", "", "", "", "", ""],
      ["Metric Description", "Formula Audit Ledger", "Pivot Cache Total", "Variance (Must Be 0)", "Portfolio Status", "", "", ""],
      ["Total Enterprise Base Rent", "", "=H8", "", "Verified Audited", "", "", ""]
    ]
  },

  // Auxiliary benchmark rates and parameters
  initialAuxiliary: {
    "Asset_Classes": {
      "G1": "Cap Rate Cap", "H1": 0.08,
      "G2": "Min Lease Term", "H2": 3,
      "G3": "Portfolio Hurdle Rate", "H3": 0.065
    }
  },

  // ═══════════════ EXACTLY 20 CHALLENGES (6 EASY, 8 MEDIUM, 6 HARD) ═══════════════
  challenges: [
    {
      id: "c01",
      number: 1,
      title: "Boston Office Base Rent (SUMIFS)",
      prompt: "To analyze core commercial office leasing cash flows in Beacon's Boston portfolio, in sheet <code>BI_Executive_Dashboard</code> cell <strong>B4</strong>, calculate total Annual Base Rent using <code>=SUMIFS(Property_Leases!G2:G25, Property_Leases!C2:C25, \"Office\", Property_Leases!D2:D25, \"Boston\")</code>, referencing Base Rent in <code>Property_Leases!G2:G25</code>, Asset Class in <code>Property_Leases!C2:C25</code>, and Market City in <code>Property_Leases!D2:D25</code>.",
      targetSheet: "BI_Executive_Dashboard",
      targetCell: "B4",
      solution: "=SUMIFS(Property_Leases!G2:G25, Property_Leases!C2:C25, \"Office\", Property_Leases!D2:D25, \"Boston\")",
      expectedFormulaPrefix: "=SUMIFS",
      expectedValue: 1250000,
      tolerance: 0.1,
      difficulty: "easy",
      bloom: "apply",
      xp: 75,
      marks: 1.0,
      hint: "Use =SUMIFS(Property_Leases!G2:G25, Property_Leases!C2:C25, \"Office\", Property_Leases!D2:D25, \"Boston\")",
      hints: [
        "In SUMIFS, the first argument is the sum range: Property_Leases!G2:G25.",
        "Criteria range 1 is Asset Class (C2:C25) matching 'Office'.",
        "Criteria range 2 is City (D2:D25) matching 'Boston'."
      ],
      check: {
        expected: 1250000,
        tolerance: 0.1,
        mustUseAnyOf: [["SUMIFS"]],
        mustReference: ["Property_Leases", "G2:G25", "C2:C25", "D2:D25"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=SUMIF\\(", message: "Use SUMIFS (with an S) for multi-condition filtering with both Asset Class and City." },
        { pattern: "^=[0-9.]+$", message: "Hardcoding numbers is prohibited. Write a dynamic =SUMIFS() formula." }
      ],
      dataScope: {
        cols: ["C", "D", "G"],
        params: [],
        previewRows: 24,
        summary: "Calculates Boston Office Base Rent for Beacon Harbor Tower ($1,250,000)."
      }
    },
    {
      id: "c02",
      number: 2,
      title: "New York Office Base Rent (SUMIFS)",
      prompt: "To quantify premier metropolitan office rental revenue across New York holdings, in sheet <code>BI_Executive_Dashboard</code> cell <strong>C4</strong>, calculate total Annual Base Rent using <code>=SUMIFS(Property_Leases!G2:G25, Property_Leases!C2:C25, \"Office\", Property_Leases!D2:D25, \"New York\")</code>, referencing Base Rent in <code>Property_Leases!G2:G25</code>, Asset Class in <code>Property_Leases!C2:C25</code>, and Market City in <code>Property_Leases!D2:D25</code>.",
      targetSheet: "BI_Executive_Dashboard",
      targetCell: "C4",
      solution: "=SUMIFS(Property_Leases!G2:G25, Property_Leases!C2:C25, \"Office\", Property_Leases!D2:D25, \"New York\")",
      expectedFormulaPrefix: "=SUMIFS",
      expectedValue: 2100000,
      tolerance: 0.1,
      difficulty: "easy",
      bloom: "apply",
      xp: 75,
      marks: 1.0,
      hint: "Use =SUMIFS(Property_Leases!G2:G25, Property_Leases!C2:C25, \"Office\", Property_Leases!D2:D25, \"New York\")",
      hints: [
        "Sum range is Property_Leases!G2:G25.",
        "Criteria 1: Property_Leases!C2:C25 matching 'Office'.",
        "Criteria 2: Property_Leases!D2:D25 matching 'New York'."
      ],
      check: {
        expected: 2100000,
        tolerance: 0.1,
        mustUseAnyOf: [["SUMIFS"]],
        mustReference: ["Property_Leases", "G2:G25"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=[0-9.]+$", message: "Do not hardcode numbers. Use =SUMIFS()." }
      ],
      dataScope: {
        cols: ["C", "D", "G"],
        params: [],
        previewRows: 24,
        summary: "Calculates New York Office Base Rent for Midtown Plaza ($2,100,000)."
      }
    },
    {
      id: "c03",
      number: 3,
      title: "Chicago Office Base Rent (SUMIFS)",
      prompt: "To track midwestern urban commercial revenue for the Chicago downtown business district, in sheet <code>BI_Executive_Dashboard</code> cell <strong>D4</strong>, calculate total Annual Base Rent using <code>=SUMIFS(Property_Leases!G2:G25, Property_Leases!C2:C25, \"Office\", Property_Leases!D2:D25, \"Chicago\")</code>, referencing Base Rent in <code>Property_Leases!G2:G25</code>, Asset Class in <code>Property_Leases!C2:C25</code>, and Market City in <code>Property_Leases!D2:D25</code>.",
      targetSheet: "BI_Executive_Dashboard",
      targetCell: "D4",
      solution: "=SUMIFS(Property_Leases!G2:G25, Property_Leases!C2:C25, \"Office\", Property_Leases!D2:D25, \"Chicago\")",
      expectedFormulaPrefix: "=SUMIFS",
      expectedValue: 1120000,
      tolerance: 0.1,
      difficulty: "easy",
      bloom: "apply",
      xp: 75,
      marks: 1.0,
      hint: "Use =SUMIFS(Property_Leases!G2:G25, Property_Leases!C2:C25, \"Office\", Property_Leases!D2:D25, \"Chicago\")",
      hints: [
        "Sum range is Property_Leases!G2:G25.",
        "Filter Asset Class = 'Office' and City = 'Chicago'."
      ],
      check: {
        expected: 1120000,
        tolerance: 0.1,
        mustUseAnyOf: [["SUMIFS"]],
        mustReference: ["Property_Leases", "G2:G25"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=[0-9.]+$", message: "Do not hardcode values." }
      ],
      dataScope: {
        cols: ["C", "D", "G"],
        params: [],
        previewRows: 24,
        summary: "Calculates Chicago Office Base Rent for Wacker Drive Tower ($1,120,000)."
      }
    },
    {
      id: "c04",
      number: 4,
      title: "Dallas Office Base Rent (SUMIFS)",
      prompt: "To evaluate fast-growing Sunbelt office asset performance within the Dallas metroplex, in sheet <code>BI_Executive_Dashboard</code> cell <strong>E4</strong>, calculate total Annual Base Rent using <code>=SUMIFS(Property_Leases!G2:G25, Property_Leases!C2:C25, \"Office\", Property_Leases!D2:D25, \"Dallas\")</code>, referencing Base Rent in <code>Property_Leases!G2:G25</code>, Asset Class in <code>Property_Leases!C2:C25</code>, and Market City in <code>Property_Leases!D2:D25</code>.",
      targetSheet: "BI_Executive_Dashboard",
      targetCell: "E4",
      solution: "=SUMIFS(Property_Leases!G2:G25, Property_Leases!C2:C25, \"Office\", Property_Leases!D2:D25, \"Dallas\")",
      expectedFormulaPrefix: "=SUMIFS",
      expectedValue: 1120000,
      tolerance: 0.1,
      difficulty: "easy",
      bloom: "apply",
      xp: 75,
      marks: 1.0,
      hint: "Use =SUMIFS(Property_Leases!G2:G25, Property_Leases!C2:C25, \"Office\", Property_Leases!D2:D25, \"Dallas\")",
      hints: [
        "Sum range: Property_Leases!G2:G25.",
        "Criteria 1: 'Office' in C2:C25.",
        "Criteria 2: 'Dallas' in D2:D25."
      ],
      check: {
        expected: 1120000,
        tolerance: 0.1,
        mustUseAnyOf: [["SUMIFS"]],
        mustReference: ["Property_Leases", "G2:G25"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=[0-9.]+$", message: "Write a dynamic formula." }
      ],
      dataScope: {
        cols: ["C", "D", "G"],
        params: [],
        previewRows: 24,
        summary: "Calculates Dallas Office Base Rent for Legacy Central Tower ($1,120,000)."
      }
    },
    {
      id: "c05",
      number: 5,
      title: "San Francisco Office Base Rent (SUMIFS)",
      prompt: "To monitor west coast tech-corridor office yield in the San Francisco market, in sheet <code>BI_Executive_Dashboard</code> cell <strong>F4</strong>, calculate total Annual Base Rent using <code>=SUMIFS(Property_Leases!G2:G25, Property_Leases!C2:C25, \"Office\", Property_Leases!D2:D25, \"San Francisco\")</code>, referencing Base Rent in <code>Property_Leases!G2:G25</code>, Asset Class in <code>Property_Leases!C2:C25</code>, and Market City in <code>Property_Leases!D2:D25</code>.",
      targetSheet: "BI_Executive_Dashboard",
      targetCell: "F4",
      solution: "=SUMIFS(Property_Leases!G2:G25, Property_Leases!C2:C25, \"Office\", Property_Leases!D2:D25, \"San Francisco\")",
      expectedFormulaPrefix: "=SUMIFS",
      expectedValue: 1820000,
      tolerance: 0.1,
      difficulty: "easy",
      bloom: "apply",
      xp: 75,
      marks: 1.0,
      hint: "Use =SUMIFS(Property_Leases!G2:G25, Property_Leases!C2:C25, \"Office\", Property_Leases!D2:D25, \"San Francisco\")",
      hints: [
        "Sum range is Property_Leases!G2:G25.",
        "Criteria 1 is 'Office' in C2:C25.",
        "Criteria 2 is 'San Francisco' in D2:D25."
      ],
      check: {
        expected: 1820000,
        tolerance: 0.1,
        mustUseAnyOf: [["SUMIFS"]],
        mustReference: ["Property_Leases", "G2:G25"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=[0-9.]+$", message: "Use dynamic SUMIFS." }
      ],
      dataScope: {
        cols: ["C", "D", "G"],
        params: [],
        previewRows: 24,
        summary: "Calculates San Francisco Office Base Rent for Mission Bay Tech Hub ($1,820,000)."
      }
    },
    {
      id: "c06",
      number: 6,
      title: "Office Portfolio Grand Total (SUM Across Cities)",
      prompt: "To aggregate nationwide office sector revenue across all six metropolitan markets for executive asset allocation, in sheet <code>BI_Executive_Dashboard</code> cell <strong>H4</strong>, calculate total Office Base Rent using <code>=SUM(B4:G4)</code>, summing city totals from <code>BI_Executive_Dashboard!B4:G4</code>.",
      targetSheet: "BI_Executive_Dashboard",
      targetCell: "H4",
      solution: "=SUM(B4:G4)",
      expectedFormulaPrefix: "=SUM",
      expectedValue: 8460000,
      tolerance: 0.1,
      difficulty: "easy",
      bloom: "apply",
      xp: 75,
      marks: 1.0,
      isolatedSetup: {
        sheet: "BI_Executive_Dashboard",
        cells: { "B4": 1250000, "C4": 2100000, "D4": 1120000, "E4": 1120000, "F4": 1820000, "G4": 1050000 }
      },
      hint: "Use =SUM(B4:G4)",
      hints: [
        "Use =SUM() across the horizontal city cells in row 4: B4 through G4."
      ],
      check: {
        expected: 8460000,
        tolerance: 0.1,
        mustUseAnyOf: [["SUM"]],
        mustReference: ["B4", "G4"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=[0-9.]+$", message: "Use =SUM(B4:G4)." }
      ],
      dataScope: {
        cols: ["B", "C", "D", "E", "F", "G"],
        params: [],
        previewRows: 1,
        summary: "Computes total Office portfolio base rent across all 6 metropolitan markets ($8,460,000)."
      }
    },
    {
      id: "c07",
      number: 7,
      title: "Retail Portfolio Grand Total (SUMIFS)",
      prompt: "To benchmark national shopping center and retail footprint cash generation across all leased properties, in sheet <code>BI_Executive_Dashboard</code> cell <strong>H5</strong>, calculate total Annual Base Rent for Retail using <code>=SUMIFS(Property_Leases!G2:G25, Property_Leases!C2:C25, \"Retail\")</code>, referencing Base Rent in <code>Property_Leases!G2:G25</code> and Asset Class in <code>Property_Leases!C2:C25</code>.",
      targetSheet: "BI_Executive_Dashboard",
      targetCell: "H5",
      solution: "=SUMIFS(Property_Leases!G2:G25, Property_Leases!C2:C25, \"Retail\")",
      expectedFormulaPrefix: "=SUMIFS",
      expectedValue: 5760000,
      tolerance: 0.1,
      difficulty: "medium",
      bloom: "analyze",
      xp: 75,
      marks: 1.0,
      hint: "Use =SUMIFS(Property_Leases!G2:G25, Property_Leases!C2:C25, \"Retail\")",
      hints: [
        "Sum range is Property_Leases!G2:G25.",
        "Criteria range is Property_Leases!C2:C25 matching 'Retail'."
      ],
      check: {
        expected: 5760000,
        tolerance: 0.1,
        mustUseAnyOf: [["SUMIFS", "SUMIF"]],
        mustReference: ["Property_Leases", "G2:G25", "C2:C25"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=[0-9.]+$", message: "Do not hardcode numbers." }
      ],
      dataScope: {
        cols: ["C", "G"],
        params: [],
        previewRows: 24,
        summary: "Calculates total Retail portfolio rent across all 6 cities ($5,760,000)."
      }
    },
    {
      id: "c08",
      number: 8,
      title: "Industrial Portfolio Grand Total (SUMIFS)",
      prompt: "To evaluate high-occupancy logistics and industrial warehouse leasing revenue across regional supply chain hubs, in sheet <code>BI_Executive_Dashboard</code> cell <strong>H6</strong>, calculate total Annual Base Rent for Industrial using <code>=SUMIFS(Property_Leases!G2:G25, Property_Leases!C2:C25, \"Industrial\")</code>, referencing Base Rent in <code>Property_Leases!G2:G25</code> and Asset Class in <code>Property_Leases!C2:C25</code>.",
      targetSheet: "BI_Executive_Dashboard",
      targetCell: "H6",
      solution: "=SUMIFS(Property_Leases!G2:G25, Property_Leases!C2:C25, \"Industrial\")",
      expectedFormulaPrefix: "=SUMIFS",
      expectedValue: 8836000,
      tolerance: 0.1,
      difficulty: "medium",
      bloom: "analyze",
      xp: 75,
      marks: 1.0,
      hint: "Use =SUMIFS(Property_Leases!G2:G25, Property_Leases!C2:C25, \"Industrial\")",
      hints: [
        "Sum range is Property_Leases!G2:G25.",
        "Criteria range is Property_Leases!C2:C25 matching 'Industrial'."
      ],
      check: {
        expected: 8836000,
        tolerance: 0.1,
        mustUseAnyOf: [["SUMIFS", "SUMIF"]],
        mustReference: ["Property_Leases", "G2:G25", "C2:C25"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=[0-9.]+$", message: "Do not hardcode values." }
      ],
      dataScope: {
        cols: ["C", "G"],
        params: [],
        previewRows: 24,
        summary: "Calculates total Industrial portfolio rent across all 6 logistics hubs ($8,836,000)."
      }
    },
    {
      id: "c09",
      number: 9,
      title: "Multi-Family Portfolio Grand Total (SUMIFS)",
      prompt: "To quantify defensive residential multifamily rental income across suburban and urban communities, in sheet <code>BI_Executive_Dashboard</code> cell <strong>H7</strong>, calculate total Annual Base Rent for Multi-Family using <code>=SUMIFS(Property_Leases!G2:G25, Property_Leases!C2:C25, \"Multi-Family\")</code>, referencing Base Rent in <code>Property_Leases!G2:G25</code> and Asset Class in <code>Property_Leases!C2:C25</code>.",
      targetSheet: "BI_Executive_Dashboard",
      targetCell: "H7",
      solution: "=SUMIFS(Property_Leases!G2:G25, Property_Leases!C2:C25, \"Multi-Family\")",
      expectedFormulaPrefix: "=SUMIFS",
      expectedValue: 8062000,
      tolerance: 0.1,
      difficulty: "medium",
      bloom: "analyze",
      xp: 75,
      marks: 1.0,
      hint: "Use =SUMIFS(Property_Leases!G2:G25, Property_Leases!C2:C25, \"Multi-Family\")",
      hints: [
        "Sum range is Property_Leases!G2:G25.",
        "Criteria range is Property_Leases!C2:C25 matching 'Multi-Family'."
      ],
      check: {
        expected: 8062000,
        tolerance: 0.1,
        mustUseAnyOf: [["SUMIFS", "SUMIF"]],
        mustReference: ["Property_Leases", "G2:G25", "C2:C25"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=[0-9.]+$", message: "Write a dynamic formula." }
      ],
      dataScope: {
        cols: ["C", "G"],
        params: [],
        previewRows: 24,
        summary: "Calculates total Multi-Family portfolio rent across all 6 residential properties ($8,062,000)."
      }
    },
    {
      id: "c10",
      number: 10,
      title: "Boston Market Grand Total (SUM Column)",
      prompt: "To compute consolidated regional real estate revenue for Beacon's founding Boston metropolitan cluster, in sheet <code>BI_Executive_Dashboard</code> cell <strong>B8</strong>, calculate total market Base Rent using <code>=SUM(B4:B7)</code>, summing asset class totals from <code>BI_Executive_Dashboard!B4:B7</code>.",
      targetSheet: "BI_Executive_Dashboard",
      targetCell: "B8",
      solution: "=SUM(B4:B7)",
      expectedFormulaPrefix: "=SUM",
      expectedValue: 4750000,
      tolerance: 0.1,
      difficulty: "medium",
      bloom: "apply",
      xp: 75,
      marks: 1.0,
      isolatedSetup: {
        sheet: "BI_Executive_Dashboard",
        cells: { "B4": 1250000, "B5": 900000, "B6": 1200000, "B7": 1400000 }
      },
      hint: "Use =SUM(B4:B7)",
      hints: [
        "Sum cells B4 through B7 in column B."
      ],
      check: {
        expected: 4750000,
        tolerance: 0.1,
        mustUseAnyOf: [["SUM"]],
        mustReference: ["B4", "B7"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=[0-9.]+$", message: "Use =SUM(B4:B7)." }
      ],
      dataScope: {
        cols: ["B"],
        params: [],
        previewRows: 4,
        summary: "Calculates Boston market total base rent ($4,750,000)."
      }
    },
    {
      id: "c11",
      number: 11,
      title: "New York Market Grand Total (SUM Column)",
      prompt: "To measure gross capital deployment and rental yields across the New York tri-state metropolitan portfolio, in sheet <code>BI_Executive_Dashboard</code> cell <strong>C8</strong>, calculate total market Base Rent using <code>=SUM(C4:C7)</code>, summing asset class totals from <code>BI_Executive_Dashboard!C4:C7</code>.",
      targetSheet: "BI_Executive_Dashboard",
      targetCell: "C8",
      solution: "=SUM(C4:C7)",
      expectedFormulaPrefix: "=SUM",
      expectedValue: 7075000,
      tolerance: 0.1,
      difficulty: "medium",
      bloom: "apply",
      xp: 75,
      marks: 1.0,
      isolatedSetup: {
        sheet: "BI_Executive_Dashboard",
        cells: { "C4": 2100000, "C5": 1350000, "C6": 1875000, "C7": 1750000 }
      },
      hint: "Use =SUM(C4:C7)",
      hints: [
        "Sum cells C4 through C7 in column C."
      ],
      check: {
        expected: 7075000,
        tolerance: 0.1,
        mustUseAnyOf: [["SUM"]],
        mustReference: ["C4", "C7"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=[0-9.]+$", message: "Use =SUM(C4:C7)." }
      ],
      dataScope: {
        cols: ["C"],
        params: [],
        previewRows: 4,
        summary: "Calculates New York market total base rent ($7,075,000)."
      }
    },
    {
      id: "c12",
      number: 12,
      title: "Enterprise Portfolio Grand Total (SUM Column Totals)",
      prompt: "To establish the definitive corporate top-line rental benchmark across all property categories and metropolitan regions, in sheet <code>BI_Executive_Dashboard</code> cell <strong>H8</strong>, calculate Enterprise Grand Total Base Rent using <code>=SUM(H4:H7)</code>, summing asset class grand totals from <code>BI_Executive_Dashboard!H4:H7</code>.",
      targetSheet: "BI_Executive_Dashboard",
      targetCell: "H8",
      solution: "=SUM(H4:H7)",
      expectedFormulaPrefix: "=SUM",
      expectedValue: 31118000,
      tolerance: 0.1,
      difficulty: "medium",
      bloom: "analyze",
      xp: 75,
      marks: 1.0,
      isolatedSetup: {
        sheet: "BI_Executive_Dashboard",
        cells: { "H4": 8460000, "H5": 5760000, "H6": 8836000, "H7": 8062000 }
      },
      hint: "Use =SUM(H4:H7)",
      hints: [
        "Sum cells H4 through H7 in column H."
      ],
      check: {
        expected: 31118000,
        tolerance: 0.1,
        mustUseAnyOf: [["SUM"]],
        mustReference: ["H4", "H7"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=[0-9.]+$", message: "Use =SUM(H4:H7)." }
      ],
      dataScope: {
        cols: ["H"],
        params: [],
        previewRows: 4,
        summary: "Calculates total Enterprise portfolio base rent across all 24 properties ($31,118,000)."
      }
    },
    {
      id: "c13",
      number: 13,
      title: "Office Gross Total Revenue (Calculated Field Simulation)",
      prompt: "To model full commercial tenant billings via a simulated PivotTable Calculated Field (Gross Revenue = Base Rent + CAM), in sheet <code>BI_Executive_Dashboard</code> cell <strong>D13</strong>, calculate Office Gross Total Revenue using <code>=B13+C13</code>, adding Total Base Rent in <code>BI_Executive_Dashboard!B13</code> and Total CAM Fees in <code>BI_Executive_Dashboard!C13</code>.",
      targetSheet: "BI_Executive_Dashboard",
      targetCell: "D13",
      solution: "=B13+C13",
      expectedFormulaPrefix: "=",
      expectedValue: 9306000,
      tolerance: 0.1,
      difficulty: "medium",
      bloom: "apply",
      xp: 75,
      marks: 1.0,
      isolatedSetup: {
        sheet: "BI_Executive_Dashboard",
        cells: { "B13": 8460000, "C13": 846000 }
      },
      hint: "Use =B13+C13",
      hints: [
        "Add Total Base Rent in B13 to Total CAM Fees in C13."
      ],
      check: {
        expected: 9306000,
        tolerance: 0.1,
        mustUseAnyOf: [["+"], ["SUM"]],
        mustReference: ["B13", "C13"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=[0-9.]+$", message: "Write a formula adding =B13+C13." }
      ],
      dataScope: {
        cols: ["B", "C"],
        params: [],
        previewRows: 1,
        summary: "Calculates Office Gross Revenue ($8,460,000 base + $846,000 CAM = $9,306,000)."
      }
    },
    {
      id: "c14",
      number: 14,
      title: "Office Gross Rent / SqFt (Calculated Field Simulation)",
      prompt: "To assess commercial space unit profitability and pricing efficiency per square foot, in sheet <code>BI_Executive_Dashboard</code> cell <strong>F13</strong>, calculate Office Effective Gross Rent per SqFt rounded to 2 decimal places using <code>=ROUND(D13/E13, 2)</code>, dividing Gross Total Revenue in <code>BI_Executive_Dashboard!D13</code> by Total Leased SqFt in <code>BI_Executive_Dashboard!E13</code>.",
      targetSheet: "BI_Executive_Dashboard",
      targetCell: "F13",
      solution: "=ROUND(D13/E13, 2)",
      expectedFormulaPrefix: "=ROUND",
      expectedValue: 54.42,
      tolerance: 0.01,
      difficulty: "medium",
      bloom: "evaluate",
      xp: 75,
      marks: 1.0,
      isolatedSetup: {
        sheet: "BI_Executive_Dashboard",
        cells: { "D13": 9306000, "E13": 171000 }
      },
      hint: "Use =ROUND(D13/E13, 2)",
      hints: [
        "Divide Gross Total Revenue (D13) by Total Leased SqFt (E13).",
        "Wrap the division inside =ROUND(..., 2)."
      ],
      check: {
        expected: 54.42,
        tolerance: 0.01,
        mustUseAnyOf: [["ROUND"]],
        mustReference: ["D13", "E13"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=[0-9.]+$", message: "Do not hardcode 54.42. Use =ROUND(D13/E13, 2)." }
      ],
      dataScope: {
        cols: ["D", "E"],
        params: [],
        previewRows: 1,
        summary: "Calculates weighted average Gross Rent per SqFt for Office properties ($9,306,000 / 171,000 = $54.42/sqft)."
      }
    },
    {
      id: "c15",
      number: 15,
      title: "Office % Share of Portfolio (Show Values As % of Column Total)",
      prompt: "To determine asset class portfolio weighting via simulated PivotTable '% of Column Total', in sheet <code>BI_Executive_Dashboard</code> cell <strong>G13</strong>, calculate Office revenue share rounded to 4 decimal places using <code>=ROUND(D13/$D$17, 4)</code>, dividing Office Gross Revenue in <code>BI_Executive_Dashboard!D13</code> by Enterprise Grand Total Gross Revenue in absolute cell <code>BI_Executive_Dashboard!$D$17</code>.",
      targetSheet: "BI_Executive_Dashboard",
      targetCell: "G13",
      solution: "=ROUND(D13/$D$17, 4)",
      expectedFormulaPrefix: "=ROUND",
      expectedValue: 0.2756,
      tolerance: 0.01,
      difficulty: "hard",
      bloom: "create",
      xp: 75,
      marks: 1.0,
      isolatedSetup: {
        sheet: "BI_Executive_Dashboard",
        cells: { "D13": 9306000, "D17": 33763000 }
      },
      hint: "Use =ROUND(D13/$D$17, 4)",
      hints: [
        "Divide Office Gross Revenue in D13 by Grand Total Gross Revenue in $D$17.",
        "Use absolute reference $D$17 so the denominator stays locked.",
        "Round to 4 decimal places with =ROUND(D13/$D$17, 4)."
      ],
      check: {
        expected: 0.2756,
        tolerance: 0.01,
        mustUseAnyOf: [["ROUND"]],
        mustReference: ["D13", "D17"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=[0-9.]+$", message: "Do not hardcode numbers. Write =ROUND(D13/$D$17, 4)." }
      ],
      dataScope: {
        cols: ["D"],
        params: [],
        previewRows: 2,
        summary: "Calculates Office portfolio gross revenue share ($9,306,000 / $33,763,000 = 27.56%)."
      }
    },
    {
      id: "c16",
      number: 16,
      title: "Office Target Yield Benchmark (XLOOKUP Master Link)",
      prompt: "To link institutional return hurdles from corporate investment underwriting standards into the portfolio model, in sheet <code>BI_Executive_Dashboard</code> cell <strong>D22</strong>, retrieve the target cap rate yield using <code>=XLOOKUP(A22, Asset_Classes!A2:A5, Asset_Classes!B2:B5)</code>, matching Asset Class in <code>BI_Executive_Dashboard!A22</code> against <code>Asset_Classes!A2:A5</code> and returning Target Yield from <code>Asset_Classes!B2:B5</code>.",
      targetSheet: "BI_Executive_Dashboard",
      targetCell: "D22",
      solution: "=XLOOKUP(A22, Asset_Classes!A2:A5, Asset_Classes!B2:B5)",
      expectedFormulaPrefix: "=XLOOKUP",
      expectedValue: 0.065,
      tolerance: 0.005,
      difficulty: "hard",
      bloom: "analyze",
      xp: 75,
      marks: 1.0,
      hint: "Use =XLOOKUP(A22, Asset_Classes!A2:A5, Asset_Classes!B2:B5)",
      hints: [
        "Lookup value is cell A22 ('Office').",
        "Lookup array is Asset_Classes!A2:A5.",
        "Return array is Target Yield in Asset_Classes!B2:B5."
      ],
      check: {
        expected: 0.065,
        tolerance: 0.005,
        mustUseAnyOf: [["XLOOKUP"]],
        mustReference: ["A22", "Asset_Classes"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=[0-9.]+$", message: "Use XLOOKUP to dynamically link master data." }
      ],
      dataScope: {
        cols: ["A", "B"],
        params: [],
        previewRows: 4,
        summary: "Retrieves Office Target Yield benchmark from Asset_Classes master table (0.065 = 6.50%)."
      }
    },
    {
      id: "c17",
      number: 17,
      title: "Cumulative Running Total: Office Tier",
      prompt: "To establish the starting baseline for multi-asset cumulative waterfall revenue analysis, in sheet <code>BI_Executive_Dashboard</code> cell <strong>C22</strong>, initialize the running cumulative total using <code>=B22</code>, directly referencing Office Portfolio Gross Revenue from <code>BI_Executive_Dashboard!B22</code>.",
      targetSheet: "BI_Executive_Dashboard",
      targetCell: "C22",
      solution: "=B22",
      expectedFormulaPrefix: "=",
      expectedValue: 9306000,
      tolerance: 0.1,
      difficulty: "hard",
      bloom: "apply",
      xp: 75,
      marks: 1.0,
      isolatedSetup: {
        sheet: "BI_Executive_Dashboard",
        cells: { "B22": 9306000 }
      },
      hint: "Use =B22",
      hints: [
        "In cell C22, simply reference =B22 to establish the starting cumulative total."
      ],
      check: {
        expected: 9306000,
        tolerance: 0.1,
        mustReference: ["B22"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=[0-9.]+$", message: "Reference cell =B22." }
      ],
      dataScope: {
        cols: ["B"],
        params: [],
        previewRows: 1,
        summary: "Establishes baseline cumulative running total for Office ($9,306,000)."
      }
    },
    {
      id: "c18",
      number: 18,
      title: "Cumulative Running Total: Retail Tier",
      prompt: "To track cumulative institutional capital absorption across diversified commercial sectors, in sheet <code>BI_Executive_Dashboard</code> cell <strong>C23</strong>, calculate cumulative running total revenue through the Retail tier using <code>=C22+B23</code>, adding prior cumulative total in <code>BI_Executive_Dashboard!C22</code> to Retail Gross Revenue in <code>BI_Executive_Dashboard!B23</code>.",
      targetSheet: "BI_Executive_Dashboard",
      targetCell: "C23",
      solution: "=C22+B23",
      expectedFormulaPrefix: "=",
      expectedValue: 15642000,
      tolerance: 0.1,
      difficulty: "hard",
      bloom: "create",
      xp: 75,
      marks: 1.0,
      isolatedSetup: {
        sheet: "BI_Executive_Dashboard",
        cells: { "C22": 9306000, "B23": 6336000 }
      },
      hint: "Use =C22+B23",
      hints: [
        "Add prior cumulative total in C22 to Retail revenue in B23: =C22+B23."
      ],
      check: {
        expected: 15642000,
        tolerance: 0.1,
        mustUseAnyOf: [["+"], ["SUM"]],
        mustReference: ["C22", "B23"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=[0-9.]+$", message: "Use dynamic cumulative addition =C22+B23." }
      ],
      dataScope: {
        cols: ["B", "C"],
        params: [],
        previewRows: 2,
        summary: "Computes cumulative portfolio revenue through Retail ($9,306,000 + $6,336,000 = $15,642,000)."
      }
    },
    {
      id: "c19",
      number: 19,
      title: "Independent Formula Audit of Base Rent Ledger",
      prompt: "To perform an independent internal audit cross-check verifying ledger integrity prior to board reporting, in sheet <code>BI_Executive_Dashboard</code> cell <strong>B29</strong>, calculate total enterprise base rent using <code>=SUM(Property_Leases!G2:G25)</code>, summing the complete Annual Base Rent ledger range in <code>Property_Leases!G2:G25</code>.",
      targetSheet: "BI_Executive_Dashboard",
      targetCell: "B29",
      solution: "=SUM(Property_Leases!G2:G25)",
      expectedFormulaPrefix: "=SUM",
      expectedValue: 31118000,
      tolerance: 0.1,
      difficulty: "hard",
      bloom: "evaluate",
      xp: 75,
      marks: 1.0,
      hint: "Use =SUM(Property_Leases!G2:G25)",
      hints: [
        "Sum the entire Annual Base Rent column in Property_Leases!G2:G25."
      ],
      check: {
        expected: 31118000,
        tolerance: 0.1,
        mustUseAnyOf: [["SUM"]],
        mustReference: ["Property_Leases", "G2:G25"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=[0-9.]+$", message: "Do not hardcode values. Write =SUM(Property_Leases!G2:G25)." }
      ],
      dataScope: {
        cols: ["G"],
        params: [],
        previewRows: 24,
        summary: "Audits entire raw ledger base rent across all 24 leases ($31,118,000)."
      }
    },
    {
      id: "c20",
      number: 20,
      title: "Zero-Variance Audit Reconciliation Gate",
      prompt: "To certify GAAP and internal audit zero-variance compliance between the raw lease ledger and executive pivot tables, in sheet <code>BI_Executive_Dashboard</code> cell <strong>D29</strong>, calculate the reconciliation variance rounded to 2 decimal places using <code>=ROUND(B29-H8, 2)</code>, subtracting Pivot Grand Total in <code>BI_Executive_Dashboard!H8</code> from Audited Ledger Total in <code>BI_Executive_Dashboard!B29</code>.",
      targetSheet: "BI_Executive_Dashboard",
      targetCell: "D29",
      solution: "=ROUND(B29-H8, 2)",
      expectedFormulaPrefix: "=ROUND",
      expectedValue: 0,
      tolerance: 0.01,
      difficulty: "hard",
      bloom: "evaluate",
      xp: 75,
      marks: 1.0,
      isolatedSetup: {
        sheet: "BI_Executive_Dashboard",
        cells: { "B29": 31118000, "H8": 31118000 }
      },
      hint: "Use =ROUND(B29-H8, 2)",
      hints: [
        "Subtract Pivot Grand Total in H8 from Independent Ledger Audit in B29.",
        "Wrap with =ROUND(..., 2). Result must be strictly 0."
      ],
      check: {
        expected: 0,
        tolerance: 0.01,
        mustUseAnyOf: [["ROUND"]],
        mustReference: ["B29", "H8"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^0$", message: "Do not hardcode 0. Write the audit formula =ROUND(B29-H8, 2)." }
      ],
      dataScope: {
        cols: ["B", "H"],
        params: [],
        previewRows: 1,
        summary: "Proves mathematical reconciliation with zero variance ($31,118,000 - $31,118,000 = $0.00)."
      }
    }
  ]
};
