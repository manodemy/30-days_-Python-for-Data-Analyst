// public/excel/content/excel-day-10.js
// Manodemy Excel Studio — Day 10 Curriculum Manifest & Challenges
// Topic: PivotTables: Core Mechanics, Grouping and Slicers (Global Day 28)
// Conforms to: Style Guide, Schema v2.1, and Dataset Registry (MetroMart Superstores)

if (!window.EXCEL_COURSE_CONTENT) window.EXCEL_COURSE_CONTENT = {};

window.EXCEL_COURSE_CONTENT['excelDay10'] = {
  day: 10,
  globalDay: 28,
  title: "PivotTables: Core Mechanics, Grouping and Slicers",
  description: "Master multi-dimensional aggregation without formulas, clean source table range anchoring, field quadrant mapping, date grouping hierarchies, visual slicers, and cross-checking reconciliation against SUMIFS.",
  topics: [
    "01. PivotTable Architecture & The In-Memory Pivot Cache",
    "02. Clean Source Range Discipline & Table Anchoring (EXC-PVT-SOURCE)",
    "03. The Four Field Quadrants: Rows, Columns, Values, Filters (EXC-PVT-QUAD)",
    "04. Value Field Aggregation Mechanics: Sum vs. Count vs. Average (EXC-PVT-AGG)",
    "05. Value Field Number Formatting & Pivot Cache Hygiene (EXC-PVT-FMT)",
    "06. Date Grouping & Hierarchies: Years, Quarters, Months (EXC-PVT-GROUP-DATE)",
    "07. Show Values As % Calculations (% of Grand Total, % of Column) (EXC-PVT-SHOWAS-PCT)",
    "08. Visual Filtering with Interactive Slicers & Timelines (EXC-PVT-SLICER-CONNECT)",
    "09. Audit & Cross-Checking Pivot Totals against SUMIFS (EXC-PVT-RECONCILE)",
    "10. Enterprise Reporting Workflows & GETPIVOTDATA Mechanics"
  ],
  slides: [
    {
      title: "PivotTables: Core Mechanics, Grouping & Slicers",
      html: `
<section class="slide-section" id="sec01">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingPivotArchitecture">
    <span class="heading-num-box">01</span>
    <span class="heading-title-box">
      <span class="heading-icon">🗂️</span>
      <span class="heading-title-text">PivotTable Architecture & The Pivot Cache</span>
      <button class="audio-play-btn" data-track-idx="0" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p class="lead-text">A PivotTable does not operate directly on the raw worksheet cells. Instead, Microsoft Excel takes a snapshot of your underlying transaction rows and compresses them into a high-speed, multidimensional in-memory data structure known as the <strong>Pivot Cache</strong>.</p>
    <div class="architecture-grid">
      <div class="arch-box">
        <h4>1. Raw Source Range</h4>
        <p>Flat tabular records (e.g. <code>Store_Transactions</code>) containing raw transactional attributes, timestamps, and metric values.</p>
      </div>
      <div class="arch-box">
        <h4>2. In-Memory Pivot Cache</h4>
        <p>A highly optimized, indexed memory buffer holding deduplicated dimension members and aggregated metric indexes.</p>
      </div>
      <div class="arch-box">
        <h4>3. Interactive Pivot Table</h4>
        <p>The visual reporting canvas displaying dynamic cross-tabulations, hierarchical sub-totals, and calculated ratios.</p>
      </div>
    </div>
    <div class="keynote-box keynote-emerald">
      <strong>Senior Analyst Keynote:</strong> Because the PivotTable queries the Pivot Cache rather than live cells, changes made to raw transaction rows will <em>not</em> reflect in your summary report until you refresh the cache (<kbd>Alt + F5</kbd> or <kbd>Ctrl + Alt + F5</kbd> for all workbooks).
    </div>
    <div class="anti-pattern-card">
      <div class="anti-pattern-header">⚠️ Anti-Pattern: Pivoting Dirty Raw Ranges</div>
      <p><strong>The Mistake:</strong> Highlighting source ranges that include blank column headers, merged cells, or pre-existing subtotal rows.</p>
      <p><strong>The Gold Standard:</strong> Maintain an unbroken tabular schema where row 1 contains unique, single-row headers, followed by atomic data records with zero embedded summary rows.</p>
    </div>
  </div>
</section>

<section class="slide-section" id="sec02">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingCleanSourceRange">
    <span class="heading-num-box">02</span>
    <span class="heading-title-box">
      <span class="heading-icon">🛡️</span>
      <span class="heading-title-text">Clean Source Range Discipline & Table Anchoring (EXC-PVT-SOURCE)</span>
      <button class="audio-play-btn" data-track-idx="1" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p>The number one reason production PivotTables break in enterprise data workflows is an unstable source range. If you base a PivotTable on a static coordinate range like <code>Store_Transactions!$A$1:$H$26</code>, new transactions appended next week will be silently excluded from executive KPI dashboards.</p>
    <div class="table-responsive">
      <table class="reference-table">
        <thead>
          <tr>
            <th>Source Definition</th>
            <th>Syntax / Method</th>
            <th>Append Behavior</th>
            <th>Enterprise Grade</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Static Grid Range</strong></td>
            <td><code>Store_Transactions!$A$1:$H$26</code></td>
            <td>New rows beyond row 26 are omitted unless manually re-ranged.</td>
            <td>❌ Fragile / Anti-Pattern</td>
          </tr>
          <tr>
            <td><strong>Full Column Anchors</strong></td>
            <td><code>Store_Transactions!A:H</code></td>
            <td>Pulls entire column, but inflates cache size with thousands of blank rows.</td>
            <td>⚠️ Sub-Optimal</td>
          </tr>
          <tr>
            <td><strong>Official Excel Table</strong></td>
            <td><code>Table_StoreTransactions</code> (<kbd>Ctrl + T</kbd>)</td>
            <td>Source boundaries expand automatically as new records are typed or pasted.</td>
            <td>✅ Gold Standard</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="keynote-box keynote-emerald">
      <strong>Analyst Takeaway:</strong> Always convert raw tabular data into an official Excel Table (<kbd>Ctrl + T</kbd>) before inserting a PivotTable. Name the table descriptively (e.g., <code>Table_StoreTxns</code>). When new daily registers arrive, your PivotTable picks them up instantly upon refresh.
    </div>
    <div class="anti-pattern-card">
      <div class="anti-pattern-header">⚠️ Anti-Pattern: Truncated Executive Reports</div>
      <p><strong>The Mistake:</strong> Refreshing a PivotTable with <kbd>Alt + F5</kbd> and assuming newly appended records are included, without realizing the source range coordinate was hardcoded to last month's final row.</p>
      <p><strong>The Solution:</strong> Anchor to an Excel Table or verify <strong>Change Data Source</strong> points to the dynamic table identifier.</p>
    </div>
  </div>
</section>

<section class="slide-section" id="sec03">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingFourQuadrants">
    <span class="heading-num-box">03</span>
    <span class="heading-title-box">
      <span class="heading-icon">🧭</span>
      <span class="heading-title-text">The Four Field Quadrants: Rows, Columns, Values, Filters (EXC-PVT-QUAD)</span>
      <button class="audio-play-btn" data-track-idx="2" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p>The PivotTable Field List gives you four operational quadrants that shape your multi-dimensional analytical matrix:</p>
    <div class="architecture-grid">
      <div class="arch-box">
        <h4>1. Rows Area (Vertical)</h4>
        <p>Places unique values of the selected field into vertical row labels (e.g., <code>Department</code>: Grocery, Electronics, Apparel, Home).</p>
      </div>
      <div class="arch-box">
        <h4>2. Columns Area (Horizontal)</h4>
        <p>Places unique values across horizontal column headers (e.g., <code>Store City</code>: New York, Chicago, Dallas, Seattle).</p>
      </div>
      <div class="arch-box">
        <h4>3. Values Area (Calculation)</h4>
        <p>Aggregates numerical fields at each row/column intersection (e.g., Sum of <code>Basket Value</code> or Average of <code>Units</code>).</p>
      </div>
    </div>
    <div class="keynote-box keynote-emerald">
      <strong>Quadrant Golden Rule:</strong> Keep the <strong>Columns</strong> quadrant reserved for low-cardinality categorical dimensions (2 to 5 distinct values like City, Quarter, or Tender Type). Placing high-cardinality fields (like Transaction ID or Customer Name) into Columns creates an unreadable spreadsheet that scrolls horizontally for miles.
    </div>
    <div class="anti-pattern-card">
      <div class="anti-pattern-header">⚠️ Anti-Pattern: The High-Cardinality Column Trap</div>
      <p><strong>The Mistake:</strong> Dragging <code>Txn ID</code> into the Columns quadrant, causing Excel to render 25 distinct columns across the screen.</p>
      <p><strong>The Solution:</strong> Keep granular identifier fields in Rows or Filters, and place summary dimensions in Columns.</p>
    </div>
  </div>
</section>

<section class="slide-section" id="sec04">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingValueAggregations">
    <span class="heading-num-box">04</span>
    <span class="heading-title-box">
      <span class="heading-icon">🧮</span>
      <span class="heading-title-text">Value Field Aggregation Mechanics: Sum vs. Count vs. Average (EXC-PVT-AGG)</span>
      <button class="audio-play-btn" data-track-idx="3" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p>When you drag a field into the <strong>Values</strong> quadrant, Excel evaluates the data types of that column to decide whether to calculate a <code>SUM</code> or a <code>COUNT</code>:</p>
    <div class="table-responsive">
      <table class="reference-table">
        <thead>
          <tr>
            <th>Aggregation Type</th>
            <th>Default Trigger Condition</th>
            <th>Business Analytic Purpose</th>
            <th>Formula Equivalent</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Sum</strong></td>
            <td>100% of cells in the source column contain numeric values.</td>
            <td>Total financial volume, aggregate units sold, total cost.</td>
            <td><code>=SUM()</code> / <code>=SUMIFS()</code></td>
          </tr>
          <tr>
            <td><strong>Count</strong></td>
            <td>Column contains text, dates, or even a single blank cell.</td>
            <td>Transaction frequency, headcount, order volume.</td>
            <td><code>=COUNT()</code> / <code>=COUNTA()</code></td>
          </tr>
          <tr>
            <td><strong>Average</strong></td>
            <td>Selected manually via Value Field Settings.</td>
            <td>Average basket size, mean customer spend, SLA duration.</td>
            <td><code>=AVERAGE()</code> / <code>=AVERAGEIFS()</code></td>
          </tr>
          <tr>
            <td><strong>Min / Max</strong></td>
            <td>Selected manually via Value Field Settings.</td>
            <td>Outlier boundaries, peak ticket size, minimum transaction.</td>
            <td><code>=MIN()</code> / <code>=MAX()</code></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="keynote-box keynote-emerald">
      <strong>The "Accidental Count" Trap:</strong> If a numeric currency column has even a single blank cell or a space character in row 20, Excel will automatically default the aggregation to <code>Count of Basket Value</code> instead of <code>Sum of Basket Value</code>! Always check your PivotTable headers to ensure your monetary metrics are summed, not counted.
    </div>
    <div class="anti-pattern-card">
      <div class="anti-pattern-header">⚠️ Anti-Pattern: Presenting Count as Revenue</div>
      <p><strong>The Mistake:</strong> Reporting "$25" in revenue because Excel counted the 25 transaction rows instead of summing the $4,718.75 in actual sales.</p>
      <p><strong>The Solution:</strong> Right-click the value cell -> <strong>Value Field Settings</strong> -> select <strong>Sum</strong>.</p>
    </div>
  </div>
</section>

<section class="slide-section" id="sec05">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingFieldFormatting">
    <span class="heading-num-box">05</span>
    <span class="heading-title-box">
      <span class="heading-icon">💲</span>
      <span class="heading-title-text">Value Field Number Formatting & Pivot Cache Hygiene (EXC-PVT-FMT)</span>
      <button class="audio-play-btn" data-track-idx="4" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p>Formatting numbers in a PivotTable requires a specific workflow to avoid fragile, ephemeral formatting that gets erased whenever the table is refreshed or restructured:</p>
    <div class="architecture-grid">
      <div class="arch-box">
        <h4>Grid Cell Formatting (Fragile)</h4>
        <p>Selecting cells on the sheet and pressing Currency (<kbd>$</kbd>) on the Home ribbon. When fields are pivoted or sliced, formatting is wiped clean.</p>
      </div>
      <div class="arch-box">
        <h4>Value Field Formatting (Durable)</h4>
        <p>Right-click any value cell -> <strong>Value Field Settings</strong> -> click the <strong>Number Format</strong> button in the lower left.</p>
      </div>
      <div class="arch-box">
        <h4>Cache-Persistent Display</h4>
        <p>Applies formatting to the underlying Pivot Cache representation. Automatically stays intact regardless of filtering, sorting, or restructuring.</p>
      </div>
    </div>
    <div class="keynote-box keynote-emerald">
      <strong>Pro Tip:</strong> Never highlight PivotTable cells and use the Home tab's formatting buttons. Always right-click the metric, choose <strong>Value Field Settings → Number Format</strong>, and set Currency or Accounting. This binds the format directly into the Pivot Cache metadata.
    </div>
    <div class="anti-pattern-card">
      <div class="anti-pattern-header">⚠️ Anti-Pattern: Formatting Cells via Home Tab</div>
      <p><strong>The Mistake:</strong> Manually styling cell coordinates <code>B4:F8</code>, only to watch currency signs vanish when a user clicks an executive slicer button.</p>
      <p><strong>The Solution:</strong> Value Field Settings -> Number Format ensures permanent currency typography.</p>
    </div>
  </div>
</section>

<section class="slide-section" id="sec06">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingDateGrouping">
    <span class="heading-num-box">06</span>
    <span class="heading-title-box">
      <span class="heading-icon">📅</span>
      <span class="heading-title-text">Date Grouping & Hierarchies: Years, Quarters, Months (EXC-PVT-GROUP-DATE)</span>
      <button class="audio-play-btn" data-track-idx="5" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p>Raw store transactions occur at specific timestamps and date serials. PivotTables offer an automated grouping engine that rolls individual dates into fiscal and calendar hierarchies without requiring helper columns:</p>
    <div class="table-responsive">
      <table class="reference-table">
        <thead>
          <tr>
            <th>Grouping Level</th>
            <th>Generated Pivot Hierarchy</th>
            <th>MetroMart Analytics Scenario</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Years</strong></td>
            <td>Virtual field: <code>Years</code> (e.g. 2026)</td>
            <td>Multi-year YoY enterprise growth comparison.</td>
          </tr>
          <tr>
            <td><strong>Quarters</strong></td>
            <td>Virtual field: <code>Quarters</code> (Qtr1, Qtr2, Qtr3, Qtr4)</td>
            <td>Quarterly board report targets and seasonal trends.</td>
          </tr>
          <tr>
            <td><strong>Months</strong></td>
            <td>Virtual field: <code>Txn Date Serial (Months)</code> (Jan, Feb, Mar...)</td>
            <td>Monthly departmental revenue variance.</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="keynote-box keynote-emerald">
      <strong>The Grouping Lockout Trap:</strong> If even a single cell in your date column contains text (such as "TBD", "Pending", or an empty space), Excel will disable the <strong>Group</strong> option completely and throw the error <em>"Cannot group that selection"</em>. Data cleaning and serial verification are mandatory prerequisites for date hierarchies.
    </div>
    <div class="anti-pattern-card">
      <div class="anti-pattern-header">⚠️ Anti-Pattern: Unnecessary Helper Columns</div>
      <p><strong>The Mistake:</strong> Writing formulas like <code>=YEAR(D2)</code> and <code>=TEXT(D2, "mmm")</code> across 50,000 raw transaction rows.</p>
      <p><strong>The Solution:</strong> Right-click any date in the PivotTable row labels -> <strong>Group</strong> -> multi-select <strong>Years, Quarters, Months</strong>.</p>
    </div>
  </div>
</section>

<section class="slide-section" id="sec07">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingShowValuesAs">
    <span class="heading-num-box">07</span>
    <span class="heading-title-box">
      <span class="heading-icon">📈</span>
      <span class="heading-title-text">Show Values As % Calculations (% of Grand Total, % of Column) (EXC-PVT-SHOWAS-PCT)</span>
      <button class="audio-play-btn" data-track-idx="6" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p>In executive presentations, business stakeholders frequently care more about market share and percentage contribution than raw monetary totals. The <strong>Show Values As</strong> tab in Value Field Settings calculates proportional shares dynamically:</p>
    <div class="architecture-grid">
      <div class="arch-box">
        <h4>% of Grand Total</h4>
        <p>Divides each cell by the total enterprise revenue: <code>Cell Value / $F$8</code>. Highlights overall store contribution.</p>
      </div>
      <div class="arch-box">
        <h4>% of Column Total</h4>
        <p>Divides each cell by its column summary: <code>Cell Value / Column Total</code>. Reveals category mix within a specific city.</p>
      </div>
      <div class="arch-box">
        <h4>% of Row Total</h4>
        <p>Divides each cell by its row summary: <code>Cell Value / Row Total</code>. Reveals geographic distribution of a department's sales.</p>
      </div>
    </div>
    <div class="keynote-box keynote-emerald">
      <strong>Dual-Metric Analysis:</strong> Drag the same field (e.g. <code>Basket Value</code>) into the Values quadrant twice. Configure the first as <strong>Sum of Basket Value</strong> and the second as <strong>Show Values As: % of Grand Total</strong>. This provides both monetary volume and relative share side by side!
    </div>
    <div class="anti-pattern-card">
      <div class="anti-pattern-header">⚠️ Anti-Pattern: Typing Manual Division Formulas Beside the Pivot</div>
      <p><strong>The Mistake:</strong> Typing <code>=C13/$F$8</code> in empty cells outside the PivotTable. The moment someone expands or collapses categories, row coordinates shift and manual formulas point to wrong totals.</p>
      <p><strong>The Solution:</strong> Use native <strong>Show Values As</strong> calculations inside the PivotTable.</p>
    </div>
  </div>
</section>

<section class="slide-section" id="sec08">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingSlicersTimelines">
    <span class="heading-num-box">08</span>
    <span class="heading-title-box">
      <span class="heading-icon">🎛️</span>
      <span class="heading-title-text">Visual Filtering with Interactive Slicers & Timelines (EXC-PVT-SLICER-CONNECT)</span>
      <button class="audio-play-btn" data-track-idx="7" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p>Slicers and Timelines transform static reports into interactive executive dashboards. Instead of clunky dropdown filter menus, Slicers provide tactile buttons that visually communicate which dimensions are actively filtered:</p>
    <div class="architecture-grid">
      <div class="arch-box">
        <h4>Visual State Indication</h4>
        <p>Active items highlight in accent color; filtered-out items dim, giving instant visual clarity on active dashboard scope.</p>
      </div>
      <div class="arch-box">
        <h4>Multi-Select Interaction</h4>
        <p>Clicking selects one dimension; holding <kbd>Ctrl</kbd> selects multiple members (e.g. New York + Chicago).</p>
      </div>
      <div class="arch-box">
        <h4>Report Connections (Cross-Pivot)</h4>
        <p>A single Slicer connects to multiple PivotTables on different sheets as long as they share the same Pivot Cache.</p>
      </div>
    </div>
    <div class="keynote-box keynote-emerald">
      <strong>Enterprise Dashboards & Report Connections:</strong> When building a multi-table KPI dashboard, right-click the Slicer and select <strong>Report Connections</strong>. Check all PivotTables in the workbook. Now, clicking "New York" simultaneously updates the Department matrix, Tender breakdown, and KPI summary!
    </div>
    <div class="anti-pattern-card">
      <div class="anti-pattern-header">💼 Interview & Production Insight: Slicer Cache Decoupling</div>
      <p><strong>Interview Question:</strong> "Why is my Slicer only filtering one of the three PivotTables on my dashboard?"</p>
      <p><strong>Candidate Answer:</strong> "The PivotTables were created from different data selections or different source names, creating separate Pivot Caches. To link them, all PivotTables must share the exact same Pivot Cache (e.g. from <code>Table_StoreTxns</code>) and be checked under <strong>Slicer → Report Connections</strong>."</p>
    </div>
  </div>
</section>

<section class="slide-section" id="sec09">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingAuditReconciliation">
    <span class="heading-num-box">09</span>
    <span class="heading-title-box">
      <span class="heading-icon">⚖️</span>
      <span class="heading-title-text">Audit & Cross-Checking Pivot Totals against SUMIFS (EXC-PVT-RECONCILE)</span>
      <button class="audio-play-btn" data-track-idx="8" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p>In high-stakes corporate finance and business analytics, blindly trusting an automated visual tool without mathematical reconciliation is a dangerous career risk. A senior analyst always cross-checks PivotTable grand totals against independent formula ledgers:</p>
    <div class="table-responsive">
      <table class="reference-table">
        <thead>
          <tr>
            <th>Reconciliation Component</th>
            <th>Source Location</th>
            <th>Formula / Value</th>
            <th>Audit Purpose</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Pivot Table Output</strong></td>
            <td><code>Pivot_Studio!F8</code></td>
            <td>Grand Total ($4,718.75)</td>
            <td>Aggregated result presented to executives.</td>
          </tr>
          <tr>
            <td><strong>Independent Formula Audit</strong></td>
            <td><code>Pivot_Studio!B19</code></td>
            <td><code>=SUM(Store_Transactions!F2:F26)</code></td>
            <td>Direct summation of raw transaction ledger ($4,718.75).</td>
          </tr>
          <tr>
            <td><strong>Zero-Variance Verification</strong></td>
            <td><code>Pivot_Studio!D19</code></td>
            <td><code>=ROUND(B19 - F8, 2)</code></td>
            <td>Mathematical proof that variance is strictly $0.00.</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="keynote-box keynote-emerald">
      <strong>The Reconciliation Rule:</strong> In commercial audits, if a hidden filter or ghost record skews the Pivot Cache, the Variance cell <code>=B19-F8</code> will trigger a red warning. Building automated variance checks beside every PivotTable proves your rigor as an analytics engineer.
    </div>
    <div class="anti-pattern-card">
      <div class="anti-pattern-header">💼 Production Insight: The "Ghost Cache" Danger</div>
      <p><strong>The Threat:</strong> If a discontinued department or corrupt transaction is deleted from your raw dataset, that item can still persist in your PivotTable dropdowns and slicer buttons indefinitely.</p>
      <p><strong>The Fix:</strong> Right-click PivotTable -> <strong>PivotTable Options</strong> -> <strong>Data</strong> tab -> set <em>Number of items to retain per field</em> to <strong>None</strong>, then refresh.</p>
    </div>
  </div>
</section>

<section class="slide-section" id="sec10">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingGetPivotData">
    <span class="heading-num-box">10</span>
    <span class="heading-title-box">
      <span class="heading-icon">🏢</span>
      <span class="heading-title-text">Enterprise Reporting Workflows & GETPIVOTDATA Mechanics</span>
      <button class="audio-play-btn" data-track-idx="9" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p>When designing custom executive financial scorecards, analysts often need to extract individual numbers from a PivotTable into a pixel-perfect C-suite report. Referencing PivotTable cells directly (<code>=B4</code>) is notoriously fragile:</p>
    <div class="architecture-grid">
      <div class="arch-box">
        <h4>Direct Cell Reference (=B4)</h4>
        <p>Points strictly to coordinate <code>B4</code>. If a user sorts by revenue, adds a department, or expands details, <code>B4</code> no longer holds Electronics!</p>
      </div>
      <div class="arch-box">
        <h4>GETPIVOTDATA Function</h4>
        <p>Extracts numbers by semantic coordinate: <code>=GETPIVOTDATA("Basket Value", Pivot_Studio!$A$3, "Department", "Electronics", "Store City", "New York")</code>.</p>
      </div>
      <div class="arch-box">
        <h4>Immunity to Structural Shifts</h4>
        <p>Always returns New York Electronics revenue ($860.00), regardless of how the PivotTable is sorted, grouped, or reorganized.</p>
      </div>
    </div>
    <div class="keynote-box keynote-emerald">
      <strong>Senior Analyst Interview Golden Standard:</strong> When asked in interviews: <em>"Do you turn off GETPIVOTDATA?"</em>, novice analysts answer "Yes, because it's annoying." Elite analysts answer: "No, in production financial models, GETPIVOTDATA guarantees that executive scorecard formulas pull the correct semantic metric regardless of sorting, grouping, or row insertion."
    </div>
    <div class="anti-pattern-card">
      <div class="anti-pattern-header">💼 Senior Analyst Takeaway</div>
      <p><strong>Production Reality:</strong> Leverage PivotTables for high-speed multi-dimensional data exploration, and utilize robust formula reconciliation (<code>SUMIFS</code>, <code>GETPIVOTDATA</code>) to power auditable enterprise dashboards.</p>
    </div>
  </div>
</section>
`
    }
  ],

  // ═══════════════ CANONICAL SEED WORKBOOK: METROMART SUPERSTORES ═══════════════
  initialWorkbook: {
    "Store_Transactions": [
      ["Txn ID", "Store City", "Department", "Txn Date Serial", "Tender Type", "Basket Value", "Units", "Loyalty Member"],
      ["TXN-7001", "New York", "Grocery",     46037, "Credit Card", 85.50,  6, "Yes"],
      ["TXN-7002", "Chicago",  "Electronics", 46044, "Credit Card", 420.00, 2, "No"],
      ["TXN-7003", "Dallas",   "Apparel",     46051, "Cash",        65.00,  3, "Yes"],
      ["TXN-7004", "Seattle",  "Home",        46061, "Mobile Pay",  110.00, 4, "Yes"],
      ["TXN-7005", "New York", "Electronics", 46068, "Credit Card", 650.00, 3, "Yes"],
      ["TXN-7006", "Chicago",  "Grocery",     46078, "Cash",        42.25,  5, "No"],
      ["TXN-7007", "Dallas",   "Home",        46087, "Mobile Pay",  95.00,  2, "Yes"],
      ["TXN-7008", "Seattle",  "Apparel",     46098, "Credit Card", 145.00, 4, "No"],
      ["TXN-7009", "New York", "Apparel",     46107, "Cash",        120.00, 3, "Yes"],
      ["TXN-7010", "Chicago",  "Home",        46122, "Credit Card", 180.00, 5, "Yes"],
      ["TXN-7011", "Dallas",   "Electronics", 46132, "Credit Card", 310.00, 1, "No"],
      ["TXN-7012", "Seattle",  "Grocery",     46150, "Cash",        55.50,  7, "Yes"],
      ["TXN-7013", "New York", "Home",        46164, "Mobile Pay",  135.00, 3, "No"],
      ["TXN-7014", "Chicago",  "Apparel",     46175, "Credit Card", 90.00,  2, "Yes"],
      ["TXN-7015", "Dallas",   "Grocery",     46191, "Cash",        48.00,  4, "Yes"],
      ["TXN-7016", "Seattle",  "Electronics", 46210, "Credit Card", 520.00, 2, "Yes"],
      ["TXN-7017", "New York", "Grocery",     46227, "Mobile Pay",  62.50,  5, "Yes"],
      ["TXN-7018", "Chicago",  "Electronics", 46245, "Credit Card", 280.00, 1, "Yes"],
      ["TXN-7019", "Dallas",   "Apparel",     46261, "Mobile Pay",  115.00, 3, "No"],
      ["TXN-7020", "Seattle",  "Home",        46279, "Credit Card", 160.00, 4, "Yes"],
      ["TXN-7021", "New York", "Electronics", 46293, "Cash",        210.00, 1, "No"],
      ["TXN-7022", "Chicago",  "Grocery",     46307, "Mobile Pay",  75.00,  6, "Yes"],
      ["TXN-7023", "Dallas",   "Electronics", 46321, "Credit Card", 490.00, 2, "Yes"],
      ["TXN-7024", "Seattle",  "Apparel",     46337, "Cash",        80.00,  2, "No"],
      ["TXN-7025", "New York", "Apparel",     46350, "Credit Card", 175.00, 4, "Yes"]
    ],
    "Department_Heads": [
      ["Department", "Manager Name", "Target Monthly Sales", "Floor Space SqFt", "Bonus Tier"],
      ["Grocery",     "Marcus Vance",  45000, 12000, "Tier 1"],
      ["Electronics", "Elena Rostova", 65000, 8500,  "Tier 1"],
      ["Apparel",     "Derrick Hayes", 35000, 9200,  "Tier 2"],
      ["Home",        "Sophia Lin",    30000, 7800,  "Tier 2"]
    ],
    "Pivot_Studio": [
      ["MetroMart Superstores — Pivot Studio & Cross-Tabulation Workspace", "", "", "", "", ""],
      ["1. Department by Store City Pivot Matrix (Revenue)", "", "", "", "", ""],
      ["Department", "New York", "Chicago", "Dallas", "Seattle", "Grand Total"],
      ["Grocery",     "", 117.25, 48.00, 55.50, 368.75],
      ["Electronics", "", "",     "",    "",    ""],
      ["Apparel",     "", 90.00,  180.00, 225.00, ""],
      ["Home",        135.00, 180.00, 95.00, 270.00, 680.00],
      ["Grand Total", "", 1087.25, "", 1070.50, ""],
      ["", "", "", "", "", ""],
      ["2. Tender & Loyalty Cross-Tabulation Summary", "", "", "", "", ""],
      ["Tender Type", "Txn Count", "Total Revenue", "Avg Basket", "Loyalty Revenue", "% of Grand Total"],
      ["Cash",        "", 620.75, 88.68, 288.50, 0.13],
      ["Credit Card", "", "",     "",    "",     ""],
      ["Mobile Pay",  6,  592.50, 98.75, 342.50, 0.13],
      ["Grand Total", 25, 4718.75, 188.75, 3261.50, 1.00],
      ["", "", "", "", "", ""],
      ["3. Audit & Cross-Checking Pivot Reconciliation", "", "", ""],
      ["Audit Metric", "Reconciliation Formula", "Pivot Cache Total", "Variance (Must Be 0)"],
      ["Total Enterprise Revenue", "", "=F8", ""],
      ["Total Units Sold", 84, 84, 0],
      ["Dallas Total Revenue", 1123, "=D8", 0],
      ["Total Loyalty Member Revenue", "", 3261.50, 0],
      ["Q1 Cumulative Revenue (Jan-Mar)", 1887.25, 1887.25, 0],
      ["Average Basket Value Overall", 188.75, 188.75, 0]
    ]
  },

  // Parameters & benchmark thresholds in Store_Transactions
  initialAuxiliary: {
    "Store_Transactions": {
      "J1": "High Basket Threshold", "K1": 150,
      "J2": "Loyalty Discount Rate", "K2": 0.05,
      "J3": "Q1 Target Revenue",     "K3": 1200,
      "J4": "Enterprise Target",     "K4": 3500
    }
  },

  // ═══════════════ EXACTLY 20 CHALLENGES (6 EASY, 8 MEDIUM, 6 HARD) ═══════════════
  challenges: [
    {
      id: "c01",
      number: 1,
      title: "New York Grocery Revenue (SUMIFS)",
      prompt: "To benchmark regional department performance for MetroMart's flagship New York store, in sheet <code>Pivot_Studio</code> cell <strong>B4</strong>, calculate total revenue for the <strong>Grocery</strong> department in <strong>New York</strong> using <code>=SUMIFS(Store_Transactions!F2:F26, Store_Transactions!C2:C26, \"Grocery\", Store_Transactions!B2:B26, \"New York\")</code>, referencing Basket Value in <code>Store_Transactions!F2:F26</code>, Department in <code>Store_Transactions!C2:C26</code>, and Store City in <code>Store_Transactions!B2:B26</code>.",
      targetSheet: "Pivot_Studio",
      targetCell: "B4",
      solution: "=SUMIFS(Store_Transactions!F2:F26, Store_Transactions!C2:C26, \"Grocery\", Store_Transactions!B2:B26, \"New York\")",
      expectedFormulaPrefix: "=SUMIFS",
      expectedValue: 148,
      tolerance: 0.1,
      difficulty: "easy",
      bloom: "apply",
      hint: "Use =SUMIFS(Store_Transactions!F2:F26, Store_Transactions!C2:C26, \"Grocery\", Store_Transactions!B2:B26, \"New York\")",
      hints: [
        "In SUMIFS, the sum_range is the first argument: Store_Transactions!F2:F26.",
        "Add criteria range 1 (Department: C2:C26) matching 'Grocery'.",
        "Add criteria range 2 (Store City: B2:B26) matching 'New York'."
      ],
      check: {
        expected: 148,
        tolerance: 0.1,
        mustUseAnyOf: [["SUMIFS"]],
        mustReference: ["Store_Transactions", "F2:F26", "C2:C26", "B2:B26"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=SUMIF\\(", message: "Use SUMIFS (with an S) for multi-condition filtering with both Department and City." },
        { pattern: "^=[0-9.]+$", message: "Hardcoding literal values is prohibited. Write a dynamic =SUMIFS() formula." }
      ],
      dataScope: {
        cols: ["B", "C", "F"],
        params: [],
        previewRows: 25,
        summary: "Calculates New York Grocery revenue across rows TXN-7001 ($85.50) and TXN-7017 ($62.50)."
      }
    },
    {
      id: "c02",
      number: 2,
      title: "New York Electronics Revenue (SUMIFS)",
      prompt: "To quantify high-margin consumer electronics sales in the primary New York market, in sheet <code>Pivot_Studio</code> cell <strong>B5</strong>, calculate total revenue for the <strong>Electronics</strong> department in <strong>New York</strong> using <code>=SUMIFS(Store_Transactions!F2:F26, Store_Transactions!C2:C26, \"Electronics\", Store_Transactions!B2:B26, \"New York\")</code>, referencing Basket Value in <code>Store_Transactions!F2:F26</code>, Department in <code>Store_Transactions!C2:C26</code>, and Store City in <code>Store_Transactions!B2:B26</code>.",
      targetSheet: "Pivot_Studio",
      targetCell: "B5",
      solution: "=SUMIFS(Store_Transactions!F2:F26, Store_Transactions!C2:C26, \"Electronics\", Store_Transactions!B2:B26, \"New York\")",
      expectedFormulaPrefix: "=SUMIFS",
      expectedValue: 860,
      tolerance: 0.1,
      difficulty: "easy",
      bloom: "apply",
      hint: "Use =SUMIFS(Store_Transactions!F2:F26, Store_Transactions!C2:C26, \"Electronics\", Store_Transactions!B2:B26, \"New York\")",
      hints: [
        "Sum range is Store_Transactions!F2:F26.",
        "Criteria 1: Store_Transactions!C2:C26 = 'Electronics'.",
        "Criteria 2: Store_Transactions!B2:B26 = 'New York'."
      ],
      check: {
        expected: 860,
        tolerance: 0.1,
        mustUseAnyOf: [["SUMIFS"]],
        mustReference: ["Store_Transactions", "F2:F26"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=[0-9.]+$", message: "Do not hardcode numbers. Use =SUMIFS()." }
      ],
      dataScope: {
        cols: ["B", "C", "F"],
        params: [],
        previewRows: 25,
        summary: "Sums New York Electronics transactions (TXN-7005: $650, TXN-7021: $210)."
      }
    },
    {
      id: "c03",
      number: 3,
      title: "Chicago Electronics Revenue (SUMIFS)",
      prompt: "To measure midwestern consumer electronics demand across the Chicago store footprint, in sheet <code>Pivot_Studio</code> cell <strong>C5</strong>, calculate total revenue for the <strong>Electronics</strong> department in <strong>Chicago</strong> using <code>=SUMIFS(Store_Transactions!F2:F26, Store_Transactions!C2:C26, \"Electronics\", Store_Transactions!B2:B26, \"Chicago\")</code>, referencing Basket Value in <code>Store_Transactions!F2:F26</code>, Department in <code>Store_Transactions!C2:C26</code>, and Store City in <code>Store_Transactions!B2:B26</code>.",
      targetSheet: "Pivot_Studio",
      targetCell: "C5",
      solution: "=SUMIFS(Store_Transactions!F2:F26, Store_Transactions!C2:C26, \"Electronics\", Store_Transactions!B2:B26, \"Chicago\")",
      expectedFormulaPrefix: "=SUMIFS",
      expectedValue: 700,
      tolerance: 0.1,
      difficulty: "easy",
      bloom: "apply",
      hint: "Use =SUMIFS(Store_Transactions!F2:F26, Store_Transactions!C2:C26, \"Electronics\", Store_Transactions!B2:B26, \"Chicago\")",
      hints: [
        "Filter Department by 'Electronics' and Store City by 'Chicago'.",
        "Reference Store_Transactions!F2:F26 as the sum range."
      ],
      check: {
        expected: 700,
        tolerance: 0.1,
        mustUseAnyOf: [["SUMIFS"]],
        mustReference: ["Store_Transactions", "F2:F26"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=[0-9.]+$", message: "Do not enter static constants." }
      ],
      dataScope: {
        cols: ["B", "C", "F"],
        params: [],
        previewRows: 25,
        summary: "Sums Chicago Electronics transactions (TXN-7002: $420, TXN-7018: $280)."
      }
    },
    {
      id: "c04",
      number: 4,
      title: "Dallas Electronics Revenue (SUMIFS)",
      prompt: "To analyze southern regional electronics sales volume for the Dallas retail hub, in sheet <code>Pivot_Studio</code> cell <strong>D5</strong>, calculate total revenue for the <strong>Electronics</strong> department in <strong>Dallas</strong> using <code>=SUMIFS(Store_Transactions!F2:F26, Store_Transactions!C2:C26, \"Electronics\", Store_Transactions!B2:B26, \"Dallas\")</code>, referencing Basket Value in <code>Store_Transactions!F2:F26</code>, Department in <code>Store_Transactions!C2:C26</code>, and Store City in <code>Store_Transactions!B2:B26</code>.",
      targetSheet: "Pivot_Studio",
      targetCell: "D5",
      solution: "=SUMIFS(Store_Transactions!F2:F26, Store_Transactions!C2:C26, \"Electronics\", Store_Transactions!B2:B26, \"Dallas\")",
      expectedFormulaPrefix: "=SUMIFS",
      expectedValue: 800,
      tolerance: 0.1,
      difficulty: "easy",
      bloom: "apply",
      hint: "Use =SUMIFS(Store_Transactions!F2:F26, Store_Transactions!C2:C26, \"Electronics\", Store_Transactions!B2:B26, \"Dallas\")",
      hints: [
        "Sum range is Basket Value (F2:F26).",
        "Match Department = 'Electronics' and Store City = 'Dallas'."
      ],
      check: {
        expected: 800,
        tolerance: 0.1,
        mustUseAnyOf: [["SUMIFS"]],
        mustReference: ["Store_Transactions", "F2:F26"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=[0-9.]+$", message: "Write a dynamic formula with =SUMIFS()." }
      ],
      dataScope: {
        cols: ["B", "C", "F"],
        params: [],
        previewRows: 25,
        summary: "Sums Dallas Electronics transactions (TXN-7011: $310, TXN-7023: $490)."
      }
    },
    {
      id: "c05",
      number: 5,
      title: "Seattle Electronics Revenue (SUMIFS)",
      prompt: "To complete the cross-city electronics comparison for the Pacific Northwest store, in sheet <code>Pivot_Studio</code> cell <strong>E5</strong>, calculate total revenue for the <strong>Electronics</strong> department in <strong>Seattle</strong> using <code>=SUMIFS(Store_Transactions!F2:F26, Store_Transactions!C2:C26, \"Electronics\", Store_Transactions!B2:B26, \"Seattle\")</code>, referencing Basket Value in <code>Store_Transactions!F2:F26</code>, Department in <code>Store_Transactions!C2:C26</code>, and Store City in <code>Store_Transactions!B2:B26</code>.",
      targetSheet: "Pivot_Studio",
      targetCell: "E5",
      solution: "=SUMIFS(Store_Transactions!F2:F26, Store_Transactions!C2:C26, \"Electronics\", Store_Transactions!B2:B26, \"Seattle\")",
      expectedFormulaPrefix: "=SUMIFS",
      expectedValue: 520,
      tolerance: 0.1,
      difficulty: "easy",
      bloom: "apply",
      hint: "Use =SUMIFS(Store_Transactions!F2:F26, Store_Transactions!C2:C26, \"Electronics\", Store_Transactions!B2:B26, \"Seattle\")",
      hints: [
        "Sum range: Store_Transactions!F2:F26.",
        "Criteria 1: Department = 'Electronics'.",
        "Criteria 2: Store City = 'Seattle'."
      ],
      check: {
        expected: 520,
        tolerance: 0.1,
        mustUseAnyOf: [["SUMIFS"]],
        mustReference: ["Store_Transactions", "F2:F26"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=[0-9.]+$", message: "Do not enter literal numbers." }
      ],
      dataScope: {
        cols: ["B", "C", "F"],
        params: [],
        previewRows: 25,
        summary: "Sums Seattle Electronics transaction TXN-7016 ($520.00)."
      }
    },
    {
      id: "c06",
      number: 6,
      title: "Electronics Grand Total across Cities (SUM)",
      prompt: "To consolidate enterprise-wide electronics revenue across all regional store locations, in sheet <code>Pivot_Studio</code> cell <strong>F5</strong>, calculate the total Electronics row sum using <code>=SUM(B5:E5)</code>, aggregating city totals from <code>Pivot_Studio!B5:E5</code>.",
      targetSheet: "Pivot_Studio",
      targetCell: "F5",
      solution: "=SUM(B5:E5)",
      expectedFormulaPrefix: "=SUM",
      expectedValue: 2880,
      tolerance: 0.1,
      difficulty: "easy",
      bloom: "apply",
      hint: "Use =SUM(B5:E5)",
      hints: [
        "Use =SUM() across the horizontal city cells B5 through E5.",
        "Ensure all four cities (New York, Chicago, Dallas, Seattle) are included in the range."
      ],
      isolatedSetup: {
        sheet: "Pivot_Studio",
        cells: { "B5": 860, "C5": 700, "D5": 800, "E5": 520 }
      },
      check: {
        expected: 2880,
        tolerance: 0.1,
        mustUseAnyOf: [["SUM", "SUMIFS"]],
        mustReference: ["B5:E5"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=[0-9.]+$", message: "Do not type 2880 manually. Use =SUM(B5:E5)." }
      ],
      dataScope: {
        cols: ["B", "C", "D", "E"],
        params: [],
        previewRows: 5,
        summary: "Calculates row total for Electronics: 860 + 700 + 800 + 520 = 2,880.00."
      }
    },
    {
      id: "c07",
      number: 7,
      title: "New York Apparel Revenue (SUMIFS)",
      prompt: "To evaluate seasonal clothing turnover for the New York flagship location, in sheet <code>Pivot_Studio</code> cell <strong>B6</strong>, calculate total revenue for the <strong>Apparel</strong> department in <strong>New York</strong> using <code>=SUMIFS(Store_Transactions!F2:F26, Store_Transactions!C2:C26, \"Apparel\", Store_Transactions!B2:B26, \"New York\")</code>, referencing Basket Value in <code>Store_Transactions!F2:F26</code>, Department in <code>Store_Transactions!C2:C26</code>, and Store City in <code>Store_Transactions!B2:B26</code>.",
      targetSheet: "Pivot_Studio",
      targetCell: "B6",
      solution: "=SUMIFS(Store_Transactions!F2:F26, Store_Transactions!C2:C26, \"Apparel\", Store_Transactions!B2:B26, \"New York\")",
      expectedFormulaPrefix: "=SUMIFS",
      expectedValue: 295,
      tolerance: 0.1,
      difficulty: "medium",
      bloom: "analyze",
      hint: "Use =SUMIFS(Store_Transactions!F2:F26, Store_Transactions!C2:C26, \"Apparel\", Store_Transactions!B2:B26, \"New York\")",
      hints: [
        "Sum range: Store_Transactions!F2:F26.",
        "Criteria 1: Department = 'Apparel'.",
        "Criteria 2: Store City = 'New York'."
      ],
      check: {
        expected: 295,
        tolerance: 0.1,
        mustUseAnyOf: [["SUMIFS"]],
        mustReference: ["Store_Transactions", "F2:F26"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=[0-9.]+$", message: "Write a formula using =SUMIFS()." }
      ],
      dataScope: {
        cols: ["B", "C", "F"],
        params: [],
        previewRows: 25,
        summary: "Sums New York Apparel transactions (TXN-7009: $120, TXN-7025: $175)."
      }
    },
    {
      id: "c08",
      number: 8,
      title: "Apparel Grand Total across Enterprise (SUMIFS)",
      prompt: "To audit enterprise apparel sales across all retail locations directly from the transaction log, in sheet <code>Pivot_Studio</code> cell <strong>F6</strong>, calculate total enterprise revenue for the <strong>Apparel</strong> department using <code>=SUMIFS(Store_Transactions!F2:F26, Store_Transactions!C2:C26, \"Apparel\")</code>, referencing Basket Value in <code>Store_Transactions!F2:F26</code> and Department in <code>Store_Transactions!C2:C26</code>.",
      targetSheet: "Pivot_Studio",
      targetCell: "F6",
      solution: "=SUMIFS(Store_Transactions!F2:F26, Store_Transactions!C2:C26, \"Apparel\")",
      expectedFormulaPrefix: "=SUMIFS",
      expectedValue: 790,
      tolerance: 0.1,
      difficulty: "medium",
      bloom: "analyze",
      hint: "Use =SUMIFS(Store_Transactions!F2:F26, Store_Transactions!C2:C26, \"Apparel\")",
      hints: [
        "You can sum all rows where Department equals 'Apparel'.",
        "Sum range is Store_Transactions!F2:F26 and criteria range is Store_Transactions!C2:C26."
      ],
      check: {
        expected: 790,
        tolerance: 0.1,
        mustUseAnyOf: [["SUMIFS", "SUMIF", "SUM"]],
        mustReference: ["Store_Transactions"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=[0-9.]+$", message: "Do not enter static constants." }
      ],
      dataScope: {
        cols: ["C", "F"],
        params: [],
        previewRows: 25,
        summary: "Sums all 6 Apparel transactions across all 4 store cities: $790.00."
      }
    },
    {
      id: "c09",
      number: 9,
      title: "Home Grand Total across Enterprise (SUMIFS)",
      prompt: "To establish the overall corporate sales benchmark for home goods merchandise, in sheet <code>Pivot_Studio</code> cell <strong>F7</strong>, calculate total enterprise revenue for the <strong>Home</strong> department using <code>=SUMIFS(Store_Transactions!F2:F26, Store_Transactions!C2:C26, \"Home\")</code>, referencing Basket Value in <code>Store_Transactions!F2:F26</code> and Department in <code>Store_Transactions!C2:C26</code>.",
      targetSheet: "Pivot_Studio",
      targetCell: "F7",
      solution: "=SUMIFS(Store_Transactions!F2:F26, Store_Transactions!C2:C26, \"Home\")",
      expectedFormulaPrefix: "=SUMIFS",
      expectedValue: 680,
      tolerance: 0.1,
      difficulty: "medium",
      bloom: "analyze",
      hint: "Use =SUMIFS(Store_Transactions!F2:F26, Store_Transactions!C2:C26, \"Home\")",
      hints: [
        "Use =SUMIFS() filtering Store_Transactions!C2:C26 for 'Home'.",
        "Sum range is Store_Transactions!F2:F26."
      ],
      check: {
        expected: 680,
        tolerance: 0.1,
        mustUseAnyOf: [["SUMIFS", "SUMIF", "SUM"]],
        mustReference: ["Store_Transactions"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=[0-9.]+$", message: "Do not type literal values." }
      ],
      dataScope: {
        cols: ["C", "F"],
        params: [],
        previewRows: 25,
        summary: "Sums all 5 Home department transactions across all cities: $680.00."
      }
    },
    {
      id: "c10",
      number: 10,
      title: "New York Store Grand Total (SUM)",
      prompt: "To calculate aggregate store turnover for the New York location across all four merchandise categories, in sheet <code>Pivot_Studio</code> cell <strong>B8</strong>, compute total store revenue using <code>=SUM(B4:B7)</code>, summing department totals from <code>Pivot_Studio!B4:B7</code>.",
      targetSheet: "Pivot_Studio",
      targetCell: "B8",
      solution: "=SUM(B4:B7)",
      expectedFormulaPrefix: "=SUM",
      expectedValue: 1438,
      tolerance: 0.1,
      difficulty: "medium",
      bloom: "analyze",
      hint: "Use =SUM(B4:B7)",
      hints: [
        "Sum the vertical column cells for New York from B4 through B7.",
        "This totals Grocery (148), Electronics (860), Apparel (295), and Home (135)."
      ],
      isolatedSetup: {
        sheet: "Pivot_Studio",
        cells: { "B4": 148, "B5": 860, "B6": 295, "B7": 135 }
      },
      check: {
        expected: 1438,
        tolerance: 0.1,
        mustUseAnyOf: [["SUM", "SUMIFS"]],
        mustReference: ["B4:B7"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=[0-9.]+$", message: "Use =SUM(B4:B7) to calculate the vertical column total." }
      ],
      dataScope: {
        cols: ["B"],
        params: [],
        previewRows: 5,
        summary: "Calculates total New York store revenue: $1,438.00."
      }
    },
    {
      id: "c11",
      number: 11,
      title: "Dallas Store Grand Total (SUM)",
      prompt: "To determine the total retail volume generated by the Dallas store across all active departments, in sheet <code>Pivot_Studio</code> cell <strong>D8</strong>, compute total store revenue using <code>=SUM(D4:D7)</code>, summing department totals from <code>Pivot_Studio!D4:D7</code>.",
      targetSheet: "Pivot_Studio",
      targetCell: "D8",
      solution: "=SUM(D4:D7)",
      expectedFormulaPrefix: "=SUM",
      expectedValue: 1123,
      tolerance: 0.1,
      difficulty: "medium",
      bloom: "apply",
      hint: "Use =SUM(D4:D7)",
      hints: [
        "Sum the vertical column cells for Dallas from D4 through D7.",
        "Totals Grocery (48), Electronics (800), Apparel (180), and Home (95)."
      ],
      isolatedSetup: {
        sheet: "Pivot_Studio",
        cells: { "D4": 48, "D5": 800, "D6": 180, "D7": 95 }
      },
      check: {
        expected: 1123,
        tolerance: 0.1,
        mustUseAnyOf: [["SUM", "SUMIFS"]],
        mustReference: ["D4:D7"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=[0-9.]+$", message: "Use =SUM(D4:D7)." }
      ],
      dataScope: {
        cols: ["D"],
        params: [],
        previewRows: 5,
        summary: "Calculates total Dallas store revenue: $1,123.00."
      }
    },
    {
      id: "c12",
      number: 12,
      title: "Enterprise Grand Total Revenue (SUM)",
      prompt: "To reconcile overall enterprise top-line revenue across all retail departments for executive reporting, in sheet <code>Pivot_Studio</code> cell <strong>F8</strong>, calculate total enterprise revenue using <code>=SUM(F4:F7)</code>, summing department grand totals from <code>Pivot_Studio!F4:F7</code>.",
      targetSheet: "Pivot_Studio",
      targetCell: "F8",
      solution: "=SUM(F4:F7)",
      expectedFormulaPrefix: "=SUM",
      expectedValue: 4718.75,
      tolerance: 0.1,
      difficulty: "medium",
      bloom: "analyze",
      hint: "Use =SUM(F4:F7)",
      hints: [
        "Sum the vertical Grand Total cells in column F from F4 to F7.",
        "Sums Grocery (368.75), Electronics (2880), Apparel (790), and Home (680)."
      ],
      isolatedSetup: {
        sheet: "Pivot_Studio",
        cells: { "F4": 368.75, "F5": 2880, "F6": 790, "F7": 680 }
      },
      check: {
        expected: 4718.75,
        tolerance: 0.1,
        mustUseAnyOf: [["SUM", "SUMIFS"]],
        mustReference: ["F4:F7"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=[0-9.]+$", message: "Use =SUM(F4:F7) for the grand total cell." }
      ],
      dataScope: {
        cols: ["F"],
        params: [],
        previewRows: 5,
        summary: "Calculates overall enterprise revenue: $4,718.75."
      }
    },
    {
      id: "c13",
      number: 13,
      title: "Cash Transaction Count (COUNTIF)",
      prompt: "To assess cash register transaction volume and physical tender handling requirements, in sheet <code>Pivot_Studio</code> cell <strong>B12</strong>, count total cash transactions using <code>=COUNTIF(Store_Transactions!E2:E26, \"Cash\")</code>, evaluating Tender Type in <code>Store_Transactions!E2:E26</code>.",
      targetSheet: "Pivot_Studio",
      targetCell: "B12",
      solution: "=COUNTIF(Store_Transactions!E2:E26, \"Cash\")",
      expectedFormulaPrefix: "=COUNTIF",
      expectedValue: 7,
      tolerance: 0,
      difficulty: "medium",
      bloom: "apply",
      hint: "Use =COUNTIF(Store_Transactions!E2:E26, \"Cash\")",
      hints: [
        "Use =COUNTIF() on Tender Type (Store_Transactions!E2:E26).",
        "Criterion is 'Cash'."
      ],
      check: {
        expected: 7,
        tolerance: 0,
        mustUseAnyOf: [["COUNTIF", "COUNTIFS"]],
        mustReference: ["Store_Transactions", "E2:E26"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=[0-9.]+$", message: "Do not hardcode 7. Write =COUNTIF(Store_Transactions!E2:E26, \"Cash\")." }
      ],
      dataScope: {
        cols: ["E"],
        params: [],
        previewRows: 25,
        summary: "Counts 7 transactions paid in Cash."
      }
    },
    {
      id: "c14",
      number: 14,
      title: "Credit Card Total Revenue (SUMIF)",
      prompt: "To quantify total card payment merchant settlement volume for MetroMart's treasury operations, in sheet <code>Pivot_Studio</code> cell <strong>C13</strong>, calculate total credit card revenue using <code>=SUMIF(Store_Transactions!E2:E26, \"Credit Card\", Store_Transactions!F2:F26)</code>, filtering Tender Type in <code>Store_Transactions!E2:E26</code> and summing Basket Value in <code>Store_Transactions!F2:F26</code>.",
      targetSheet: "Pivot_Studio",
      targetCell: "C13",
      solution: "=SUMIF(Store_Transactions!E2:E26, \"Credit Card\", Store_Transactions!F2:F26)",
      expectedFormulaPrefix: "=SUMIF",
      expectedValue: 3505.5,
      tolerance: 0.1,
      difficulty: "medium",
      bloom: "analyze",
      hint: "Use =SUMIF(Store_Transactions!E2:E26, \"Credit Card\", Store_Transactions!F2:F26)",
      hints: [
        "Range is Tender Type: Store_Transactions!E2:E26.",
        "Criteria is 'Credit Card'.",
        "Sum range is Basket Value: Store_Transactions!F2:F26."
      ],
      check: {
        expected: 3505.5,
        tolerance: 0.1,
        mustUseAnyOf: [["SUMIF", "SUMIFS"]],
        mustReference: ["Store_Transactions", "E2:E26", "F2:F26"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=[0-9.]+$", message: "Use =SUMIF() to aggregate Credit Card transactions." }
      ],
      dataScope: {
        cols: ["E", "F"],
        params: [],
        previewRows: 25,
        summary: "Sums 12 Credit Card transactions totaling $3,505.50."
      }
    },
    {
      id: "c15",
      number: 15,
      title: "Credit Card Average Basket Value (ROUND with AVERAGEIF)",
      prompt: "To benchmark consumer purchasing power and ticket sizing for digital card transactions, in sheet <code>Pivot_Studio</code> cell <strong>D13</strong>, calculate the average credit card basket size rounded to 2 decimal places using <code>=ROUND(AVERAGEIF(Store_Transactions!E2:E26, \"Credit Card\", Store_Transactions!F2:F26), 2)</code>, evaluating Tender Type in <code>Store_Transactions!E2:E26</code> and Basket Value in <code>Store_Transactions!F2:F26</code>.",
      targetSheet: "Pivot_Studio",
      targetCell: "D13",
      solution: "=ROUND(AVERAGEIF(Store_Transactions!E2:E26, \"Credit Card\", Store_Transactions!F2:F26), 2)",
      expectedFormulaPrefix: "=ROUND",
      expectedValue: 292.13,
      tolerance: 0.05,
      difficulty: "hard",
      bloom: "evaluate",
      hint: "Use =ROUND(AVERAGEIF(Store_Transactions!E2:E26, \"Credit Card\", Store_Transactions!F2:F26), 2)",
      hints: [
        "Nest =AVERAGEIF() inside =ROUND(..., 2).",
        "Range is Store_Transactions!E2:E26, criteria is 'Credit Card', and average_range is Store_Transactions!F2:F26."
      ],
      check: {
        expected: 292.13,
        tolerance: 0.05,
        mustUseAnyOf: [["ROUND"], ["AVERAGEIF", "AVERAGEIFS"]],
        mustReference: ["Store_Transactions", "E2:E26", "F2:F26"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=AVERAGEIF\\(", message: "Wrap your AVERAGEIF with =ROUND(..., 2) to format to 2 decimal places." },
        { pattern: "^=[0-9.]+$", message: "Do not hardcode numbers." }
      ],
      dataScope: {
        cols: ["E", "F"],
        params: [],
        previewRows: 25,
        summary: "Computes mean Credit Card basket value: $3,505.50 / 12 = $292.13."
      }
    },
    {
      id: "c16",
      number: 16,
      title: "Credit Card Loyalty Member Revenue (SUMIFS)",
      prompt: "To evaluate premium revenue retention from active loyalty cardholders paying via credit card, in sheet <code>Pivot_Studio</code> cell <strong>E13</strong>, calculate total credit card loyalty revenue using <code>=SUMIFS(Store_Transactions!F2:F26, Store_Transactions!E2:E26, \"Credit Card\", Store_Transactions!H2:H26, \"Yes\")</code>, summing Basket Value in <code>Store_Transactions!F2:F26</code> with Tender Type in <code>Store_Transactions!E2:E26</code> and Loyalty Member in <code>Store_Transactions!H2:H26</code>.",
      targetSheet: "Pivot_Studio",
      targetCell: "E13",
      solution: "=SUMIFS(Store_Transactions!F2:F26, Store_Transactions!E2:E26, \"Credit Card\", Store_Transactions!H2:H26, \"Yes\")",
      expectedFormulaPrefix: "=SUMIFS",
      expectedValue: 2630.5,
      tolerance: 0.1,
      difficulty: "hard",
      bloom: "analyze",
      hint: "Use =SUMIFS(Store_Transactions!F2:F26, Store_Transactions!E2:E26, \"Credit Card\", Store_Transactions!H2:H26, \"Yes\")",
      hints: [
        "Sum range is Store_Transactions!F2:F26.",
        "Criteria 1: Store_Transactions!E2:E26 = 'Credit Card'.",
        "Criteria 2: Store_Transactions!H2:H26 = 'Yes'."
      ],
      check: {
        expected: 2630.5,
        tolerance: 0.1,
        mustUseAnyOf: [["SUMIFS"]],
        mustReference: ["Store_Transactions", "F2:F26", "E2:E26", "H2:H26"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=SUMIF\\(", message: "Use SUMIFS for multi-criteria filtering on Tender Type and Loyalty Member." }
      ],
      dataScope: {
        cols: ["E", "F", "H"],
        params: [],
        previewRows: 25,
        summary: "Sums 9 Credit Card transactions made by active Loyalty Members: $2,630.50."
      }
    },
    {
      id: "c17",
      number: 17,
      title: "Credit Card % Share of Grand Total (ROUND Division)",
      prompt: "To measure tender portfolio concentration and credit card revenue contribution to total enterprise sales, in sheet <code>Pivot_Studio</code> cell <strong>F13</strong>, calculate the credit card revenue share rounded to 2 decimal places using <code>=ROUND(C13/$F$8, 2)</code>, dividing Credit Card Revenue in <code>Pivot_Studio!C13</code> by Enterprise Grand Total in absolute cell <code>Pivot_Studio!$F$8</code>.",
      targetSheet: "Pivot_Studio",
      targetCell: "F13",
      solution: "=ROUND(C13/$F$8, 2)",
      expectedFormulaPrefix: "=ROUND",
      expectedValue: 0.74,
      tolerance: 0.02,
      difficulty: "hard",
      bloom: "create",
      hint: "Use =ROUND(C13/$F$8, 2)",
      hints: [
        "Divide C13 by absolute reference $F$8.",
        "Wrap in =ROUND(..., 2) to match standard 2-decimal percentage notation."
      ],
      isolatedSetup: {
        sheet: "Pivot_Studio",
        cells: { "C13": 3505.5, "F8": 4718.75 }
      },
      check: {
        expected: 0.74,
        tolerance: 0.02,
        mustUseAnyOf: [["ROUND"]],
        mustReference: ["C13", "F8"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=[0-9.]+$", message: "Do not enter 0.74 as a static number. Use =ROUND(C13/$F$8, 2)." }
      ],
      dataScope: {
        cols: ["C", "F"],
        params: [],
        previewRows: 5,
        summary: "Calculates Credit Card revenue share: 3,505.50 / 4,718.75 = 74.29% (0.74)."
      }
    },
    {
      id: "c18",
      number: 18,
      title: "Audited Total Enterprise Revenue via Raw Ledger (SUM)",
      prompt: "To establish an authoritative financial control total for the independent ledger audit, in sheet <code>Pivot_Studio</code> cell <strong>B19</strong>, calculate overall enterprise transaction volume using <code>=SUM(Store_Transactions!F2:F26)</code>, summing the entire Basket Value range in <code>Store_Transactions!F2:F26</code> to verify Pivot Cache data completeness.",
      targetSheet: "Pivot_Studio",
      targetCell: "B19",
      solution: "=SUM(Store_Transactions!F2:F26)",
      expectedFormulaPrefix: "=SUM",
      expectedValue: 4718.75,
      tolerance: 0.1,
      difficulty: "hard",
      bloom: "evaluate",
      hint: "Use =SUM(Store_Transactions!F2:F26)",
      hints: [
        "Sum all 25 transaction rows directly from Store_Transactions!F2:F26.",
        "This serves as your financial control total to verify Pivot cache integrity."
      ],
      check: {
        expected: 4718.75,
        tolerance: 0.1,
        mustUseAnyOf: [["SUM"]],
        mustReference: ["Store_Transactions", "F2:F26"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=[0-9.]+$", message: "Do not hardcode numbers. Write =SUM(Store_Transactions!F2:F26)." }
      ],
      dataScope: {
        cols: ["F"],
        params: [],
        previewRows: 25,
        summary: "Audits entire transaction ledger sum ($4,718.75)."
      }
    },
    {
      id: "c19",
      number: 19,
      title: "Audited Total Loyalty Member Revenue (SUMIF)",
      prompt: "To quantify total customer rewards engagement across all store markets and payment channels, in sheet <code>Pivot_Studio</code> cell <strong>B22</strong>, calculate total loyalty program revenue using <code>=SUMIF(Store_Transactions!H2:H26, \"Yes\", Store_Transactions!F2:F26)</code>, filtering Loyalty Member status in <code>Store_Transactions!H2:H26</code> and summing Basket Value in <code>Store_Transactions!F2:F26</code>.",
      targetSheet: "Pivot_Studio",
      targetCell: "B22",
      solution: "=SUMIF(Store_Transactions!H2:H26, \"Yes\", Store_Transactions!F2:F26)",
      expectedFormulaPrefix: "=SUMIF",
      expectedValue: 3261.5,
      tolerance: 0.1,
      difficulty: "hard",
      bloom: "evaluate",
      hint: "Use =SUMIF(Store_Transactions!H2:H26, \"Yes\", Store_Transactions!F2:F26)",
      hints: [
        "Range: Store_Transactions!H2:H26 (Loyalty Member).",
        "Criteria: 'Yes'.",
        "Sum range: Store_Transactions!F2:F26 (Basket Value)."
      ],
      check: {
        expected: 3261.5,
        tolerance: 0.1,
        mustUseAnyOf: [["SUMIF", "SUMIFS"]],
        mustReference: ["Store_Transactions", "H2:H26", "F2:F26"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=[0-9.]+$", message: "Write a formula using =SUMIF()." }
      ],
      dataScope: {
        cols: ["F", "H"],
        params: [],
        previewRows: 25,
        summary: "Sums all 17 loyalty member transactions: $3,261.50."
      }
    },
    {
      id: "c20",
      number: 20,
      title: "Audit Zero-Variance Check (Zero Variance Formula)",
      prompt: "To confirm Sarbanes-Oxley audit compliance and certify zero variance between transaction records and pivot summaries, in sheet <code>Pivot_Studio</code> cell <strong>D19</strong>, calculate the financial audit variance rounded to 2 decimal places using <code>=ROUND(B19-F8, 2)</code>, subtracting Pivot Grand Total in <code>Pivot_Studio!F8</code> from Audited Ledger Total in <code>Pivot_Studio!B19</code>.",
      targetSheet: "Pivot_Studio",
      targetCell: "D19",
      solution: "=ROUND(B19-F8, 2)",
      expectedFormulaPrefix: "=ROUND",
      expectedValue: 0,
      tolerance: 0.01,
      difficulty: "hard",
      bloom: "create",
      hint: "Use =ROUND(B19-F8, 2)",
      hints: [
        "Subtract Pivot Grand Total (F8) from Raw Ledger Revenue (B19).",
        "Wrap in =ROUND(..., 2). A result of 0 confirms zero discrepancy."
      ],
      isolatedSetup: {
        sheet: "Pivot_Studio",
        cells: { "B19": 4718.75, "F8": 4718.75 }
      },
      check: {
        expected: 0,
        tolerance: 0.01,
        mustUseAnyOf: [["ROUND"]],
        mustReference: ["B19", "F8"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=0$", message: "Do not enter literal =0. Calculate the difference: =ROUND(B19-F8, 2)." }
      ],
      dataScope: {
        cols: ["B", "D", "F"],
        params: [],
        previewRows: 5,
        summary: "Zero-variance audit check: 4,718.75 - 4,718.75 = 0.00."
      }
    }
  ]
};
