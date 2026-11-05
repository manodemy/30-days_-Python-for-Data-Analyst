// public/excel/content/excel-day-04.js
// Manodemy Excel Studio — Day 04 Curriculum Manifest & Challenges
// Enterprise Domain: TransGlobal Rail & Ocean (Global Supply Chain & Freight)
// Conforms to: MISSION SPECIFICATION v3.2 & MASTER ORCHESTRATION v2.1 (Schema v2.1)

if (!window.EXCEL_COURSE_CONTENT) window.EXCEL_COURSE_CONTENT = {};

window.EXCEL_COURSE_CONTENT['excelDay04'] = {
  day: 4,
  globalDay: 22,
  title: "Excel Tables & Structured References",
  description: "Master official Microsoft Excel Tables (Ctrl+T), structured referencing syntax ([@Column], Table[Column]), calculated columns, total row aggregations ([#Totals]), special item specifiers ([#Headers], [#Data]), dynamic range auto-expansion, interactive visual slicers, table-to-range conversion, and XLOOKUP integration.",
  topics: [
    "01. The Evolution from Flat Grid to Official Excel Tables (Ctrl+T)",
    "02. Anatomy of an Excel Table: Headers, Banding & AutoFilter",
    "03. Table Naming Conventions & Schema Registry (Name Manager)",
    "04. Structured Reference Syntax: Current Row Operator [@Column]",
    "05. Whole-Column Aggregations: Table[Column] Syntax",
    "06. Calculated Columns & Automatic Formula Propagation",
    "07. Total Row Mechanics & Item Specifiers ([#Totals], [#Data])",
    "08. Dynamic Range Auto-Expansion & Formula Resilience",
    "09. Interactive Dashboard Filtering with Visual Table Slicers",
    "10. Enterprise Lookups on Tables: XLOOKUP() & Range Conversion"
  ],
  slides: [
    {
      title: "Excel Tables and Structured References",
      html: `
<section class="slide-section" id="sec01">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingEvolutionTables">
    <span class="heading-num-box">01</span>
    <span class="heading-title-box">
      <span class="heading-icon">📋</span>
      <span class="heading-title-text">The Evolution from Flat Grid to Official Excel Tables (Ctrl + T)</span>
      <button class="audio-play-btn" data-track-idx="0" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p class="lead-text">In standard spreadsheet modeling, flat cell ranges (e.g. <code>A1:G100</code>) are dumb grids: adding a row requires manually updating formula bounds, copying formulas down, and re-applying formatting. Official Microsoft Excel Tables (<kbd>Ctrl + T</kbd>) transform passive cell coordinates into a database-grade relational entity.</p>
    
    <div class="architecture-grid">
      <div class="arch-box">
        <h4>Relational Encapsulation</h4>
        <p>A table acts as a named database recordset. Excel binds the columns together, enforcing uniform data integrity across all rows.</p>
      </div>
      <div class="arch-box">
        <h4>Automatic Propagation</h4>
        <p>Formulas entered into a single cell immediately populate the entire column without dragging or double-clicking the fill handle.</p>
      </div>
      <div class="arch-box">
        <h4>Zero Formula Drift</h4>
        <p>When new container shipments arrive at bottom of the table, all dependent formulas, PivotTables, and charts expand dynamically.</p>
      </div>
    </div>

    <div class="table-responsive">
      <table class="reference-table">
        <thead>
          <tr>
            <th>Architecture Dimension</th>
            <th>Flat Cell Range (A1:G23)</th>
            <th>Excel Table (Ctrl + T)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Formula References</td>
            <td>Cryptic coordinates (<code>=SUM(E2:E23)</code>)</td>
            <td>Semantic headers (<code>=SUM(Shipments[TEU_Containers])</code>)</td>
          </tr>
          <tr>
            <td>New Row Ingestion</td>
            <td>Manual formula range update required</td>
            <td>Automatic range auto-expansion &amp; formula fill</td>
          </tr>
          <tr>
            <td>Formatting Maintenance</td>
            <td>Zebra banding breaks upon deletion</td>
            <td>Persistent dynamic zebra striping</td>
          </tr>
          <tr>
            <td>Slicer Connectivity</td>
            <td>Unsupported (PivotTables only)</td>
            <td>Native 1-click visual slicer integration</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="keynote-box keynote-emerald">
      <strong>Analyst Takeaway:</strong> Professional quantitative models never reference raw coordinate grids for primary datasets. Pressing <kbd>Ctrl + T</kbd> is the very first action an analytics engineer takes upon loading transactional data.
    </div>

    <div class="anti-pattern-card" style="margin-top:16px; border:1px solid rgba(239,68,68,0.3); border-left:4px solid #ef4444; border-radius:8px; padding:14px 18px; background:rgba(239,68,68,0.08);">
      <h4 style="margin:0 0 8px 0; color:#f87171; font-size:13.5px; font-weight:700;">⚠️ Anti-Pattern vs. Gold Standard Solution</h4>
      <p style="margin:0; font-size:12.5px; line-height:1.5; color:#cbd5e1;">
        <strong>Common Mistake:</strong> Manually applying fill colors and borders to cells and calling it a "table". This provides zero structural encapsulation, causing formulas to miss newly appended rows.<br>
        <strong>Gold Standard:</strong> Select any cell within the data and press <kbd>Ctrl + T</kbd> (or <kbd>Cmd + T</kbd> on macOS) with "My table has headers" checked.
      </p>
    </div>
  </div>
</section>

<section class="slide-section" id="sec02">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingTableAnatomy">
    <span class="heading-num-box">02</span>
    <span class="heading-title-box">
      <span class="heading-icon">🏗️</span>
      <span class="heading-title-text">Anatomy of an Excel Table: Headers, Banding &amp; AutoFilter</span>
      <button class="audio-play-btn" data-track-idx="1" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p class="lead-text">Converting a range to a Table activates a suite of cohesive UI and calculation features designed to maximize readability and navigational velocity across enterprise logistics ledgers.</p>
    
    <div class="architecture-grid">
      <div class="arch-box">
        <h4>Sticky Header Row</h4>
        <p>When scrolling down past row 1, Excel promotes table header names directly into sheet column letters (A, B, C &rarr; Origin, Dest, TEU).</p>
      </div>
      <div class="arch-box">
        <h4>Integrated AutoFilter</h4>
        <p>Dropdown filter handles are automatically embedded in every header cell, enabling instant sorting and multi-criteria queries.</p>
      </div>
      <div class="arch-box">
        <h4>Dynamic Resize Handle</h4>
        <p>A small blue marker at the bottom-right corner visually confirms the exact boundary of the active table recordset.</p>
      </div>
    </div>

    <div class="keynote-box keynote-emerald">
      <strong>Analyst Takeaway:</strong> Sticky table headers eliminate the need for Freeze Panes in simple single-table sheets. As long as your active cursor is inside the table, your column titles never vanish.
    </div>
  </div>
</section>

<section class="slide-section" id="sec03">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingTableNaming">
    <span class="heading-num-box">03</span>
    <span class="heading-title-box">
      <span class="heading-icon">🏷️</span>
      <span class="heading-title-text">Table Naming Conventions &amp; Schema Registry (Name Manager)</span>
      <button class="audio-play-btn" data-track-idx="2" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p class="lead-text">When Excel initializes a table, it assigns generic labels like <code>Table1</code> or <code>Table2</code>. In enterprise financial engineering, generic names obscure formula intent and violate code auditing standards.</p>
    
    <div class="architecture-grid">
      <div class="arch-box">
        <h4>Renaming on Creation</h4>
        <p>Navigate to <strong>Table Design &rarr; Table Name</strong> (top left ribbon) immediately after <kbd>Ctrl + T</kbd> and assign a semantic title.</p>
      </div>
      <div class="arch-box">
        <h4>PascalCase Conventions</h4>
        <p>Adopt clear conventions: <code>Shipment_Table</code>, <code>Port_Directory</code>, <code>FreightLedger</code>. Avoid spaces and punctuation.</p>
      </div>
      <div class="arch-box">
        <h4>Name Manager Registry</h4>
        <p>Tables register globally in <strong>Name Manager</strong> (<kbd>Ctrl + F3</kbd>), accessible from any worksheet in the workbook.</p>
      </div>
    </div>

    <div class="table-responsive">
      <table class="reference-table">
        <thead>
          <tr>
            <th>Default Name</th>
            <th>Enterprise Clean Name</th>
            <th>Formula Readability Impact</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>Table1</code></td>
            <td><code>Shipment_Table</code></td>
            <td><code>=SUM(Shipment_Table[Freight_Cost])</code> explains exact business domain</td>
          </tr>
          <tr>
            <td><code>Table2</code></td>
            <td><code>Port_Directory</code></td>
            <td><code>=XLOOKUP(..., Port_Directory[Code], ...)</code> establishes foreign key link</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="keynote-box keynote-emerald">
      <strong>Analyst Takeaway:</strong> Clear table names eliminate the need to remember sheet names or cell bounds. You can write formulas anywhere in the workbook by typing the table name with IntelliSense autocompletion.
    </div>
  </div>
</section>

<section class="slide-section" id="sec04">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingStructuredCurrentRow">
    <span class="heading-num-box">04</span>
    <span class="heading-title-box">
      <span class="heading-icon">🎯</span>
      <span class="heading-title-text">Structured Reference Syntax: Current Row Operator [@Column]</span>
      <button class="audio-play-btn" data-track-idx="3" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p class="lead-text">The cornerstone of Excel Table calculations is the <strong>Structured Reference</strong>. Instead of hardcoding relative coordinates like <code>=E2*F2</code>, tables introduce the <code>[@Column]</code> operator, meaning <em>"the value in column [Column] on this exact same row"</em>.</p>
    
    <div class="architecture-grid">
      <div class="arch-box">
        <h4>The "At" (@) Symbol</h4>
        <p>Denotes implicit intersection for the current row. <code>[@TEU_Containers]</code> references row 2 when evaluated on row 2.</p>
      </div>
      <div class="arch-box">
        <h4>Readable Mathematics</h4>
        <p>Writing <code>=[@[TEU_Containers]] * [@[Rate_per_TEU]]</code> produces an self-documenting financial calculation.</p>
      </div>
      <div class="arch-box">
        <h4>Immune to Row Shuffling</h4>
        <p>Sorting, filtering, or inserting rows will never corrupt structured references or cause off-by-one index drift.</p>
      </div>
    </div>

    <div class="keynote-box keynote-emerald">
      <strong>Analyst Takeaway:</strong> In modern Excel (dynamic array engine), <code>@</code> represents single-value implicit intersection. In structured tables, it guarantees that calculations evaluate strictly within the row context.
    </div>

    <div class="interview-insight-box" style="margin-top:16px; border:1px solid rgba(14,165,233,0.3); border-left:4px solid #0ea5e9; border-radius:8px; padding:14px 18px; background:rgba(14,165,233,0.08);">
      <h4 style="margin:0 0 8px 0; color:#38bdf8; font-size:13.5px; font-weight:700;">💼 Interview / Production Insight</h4>
      <p style="margin:0; font-size:12.5px; line-height:1.5; color:#cbd5e1;">
        <strong>Interview Question:</strong> <em>"What happens if you omit the @ symbol in a table formula, writing =Shipment_Table[TEU_Containers]?"</em><br>
        <strong>Staff Analyst Answer:</strong> Omitting the <code>@</code> references the <em>entire column range</em> (all 22 rows). In legacy Excel, this triggered implicit intersection based on row position. In Microsoft 365, it spills a dynamic array of 22 values, often triggering a <code>#SPILL!</code> error inside a table cell. Always use <code>[@Column]</code> for single-row operations.
      </p>
    </div>
  </div>
</section>

<section class="slide-section" id="sec05">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingWholeColumnAgg">
    <span class="heading-num-box">05</span>
    <span class="heading-title-box">
      <span class="heading-icon">📊</span>
      <span class="heading-title-text">Whole-Column Aggregations: Table[Column] Syntax</span>
      <button class="audio-play-btn" data-track-idx="4" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p class="lead-text">When authoring summary KPI metrics outside the table (e.g. in an executive dashboard sheet), refer to entire table columns using <code>TableName[ColumnName]</code> without dollar signs or cell bounds.</p>
    
    <div class="architecture-grid">
      <div class="arch-box">
        <h4>Total Expenditure</h4>
        <p><code>=SUM(Shipment_Table[Total_Freight_Cost])</code><br>Sums the entire freight cost column without referencing <code>G2:G23</code>.</p>
      </div>
      <div class="arch-box">
        <h4>Container Volume</h4>
        <p><code>=SUM(Shipment_Table[TEU_Containers])</code><br>Computes total fleet container capacity dynamically.</p>
      </div>
      <div class="arch-box">
        <h4>Route Pricing Mean</h4>
        <p><code>=AVERAGE(Shipment_Table[Rate_per_TEU])</code><br>Evaluates mean rate across all active global logistics lanes.</p>
      </div>
    </div>

    <div class="table-responsive">
      <table class="reference-table">
        <thead>
          <tr>
            <th>KPI Metric</th>
            <th>Traditional Flat Range Syntax</th>
            <th>Structured Reference Syntax</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Total Freight Cost</td>
            <td><code>=SUM(Shipment_Table!G2:G23)</code></td>
            <td><code>=SUM(Shipment_Table[Total_Freight_Cost])</code></td>
          </tr>
          <tr>
            <td>Total TEU Volume</td>
            <td><code>=SUM(Shipment_Table!E2:E23)</code></td>
            <td><code>=SUM(Shipment_Table[TEU_Containers])</code></td>
          </tr>
          <tr>
            <td>Ocean Freight Total</td>
            <td><code>=SUMIF(Shipment_Table!B2:B23, "Ocean", Shipment_Table!G2:G23)</code></td>
            <td><code>=SUMIF(Shipment_Table[Transport_Mode], "Ocean", Shipment_Table[Total_Freight_Cost])</code></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="keynote-box keynote-emerald">
      <strong>Analyst Takeaway:</strong> Structured references are self-healing: if an analyst adds or removes columns, column positions shift, but formulas referencing <code>Shipment_Table[Total_Freight_Cost]</code> remain 100% intact.
    </div>
  </div>
</section>

<section class="slide-section" id="sec06">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingCalculatedColumns">
    <span class="heading-num-box">06</span>
    <span class="heading-title-box">
      <span class="heading-icon">⚡</span>
      <span class="heading-title-text">Calculated Columns &amp; Automatic Formula Propagation</span>
      <button class="audio-play-btn" data-track-idx="5" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p class="lead-text">In a flat range, entering a formula in cell <code>G2</code> requires double-clicking the fill handle to copy down. If a blank cell exists in an adjacent column, copying halts prematurely, leaving orphan rows without formulas. Excel Tables eliminate this through <strong>Calculated Columns</strong>.</p>
    
    <div class="architecture-grid">
      <div class="arch-box">
        <h4>Instant Fill</h4>
        <p>Typing a formula in any cell of an empty table column automatically propagates that formula down every row in the table instantly.</p>
      </div>
      <div class="arch-box">
        <h4>Formula Uniformity</h4>
        <p>Excel enforces strict consistency across the column, preventing rogue users from accidentally overriding individual formulas.</p>
      </div>
      <div class="arch-box">
        <h4>Auto-Correction</h4>
        <p>Modifying a formula in any single row automatically updates all other rows across the entire column simultaneously.</p>
      </div>
    </div>

    <div class="keynote-box keynote-emerald">
      <strong>Analyst Takeaway:</strong> Calculated Columns guarantee audit compliance. You will never have an uncalculated row hiding silently at the bottom of a 50,000-row shipping manifest.
    </div>
  </div>
</section>

<section class="slide-section" id="sec07">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingTotalRowSpecifiers">
    <span class="heading-num-box">07</span>
    <span class="heading-title-box">
      <span class="heading-icon">🔢</span>
      <span class="heading-title-text">Total Row Mechanics &amp; Item Specifiers ([#Totals], [#Data], [#Headers])</span>
      <button class="audio-play-btn" data-track-idx="6" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p class="lead-text">Excel Tables feature a built-in <strong>Total Row</strong> toggle (<kbd>Ctrl + Shift + T</kbd>). When activated, Excel appends an aggregated summary row that automatically utilizes <code>SUBTOTAL()</code> to react dynamically to filters.</p>
    
    <div class="architecture-grid">
      <div class="arch-box">
        <h4>[#Totals]</h4>
        <p>Refers to the summary row: <code>Shipment_Table[[#Totals],[Total_Freight_Cost]]</code> extracts the aggregated footer balance.</p>
      </div>
      <div class="arch-box">
        <h4>[#Headers]</h4>
        <p>Refers strictly to the header label row: <code>Shipment_Table[[#Headers],[Origin_Port]]</code> returns the text string <code>"Origin Port"</code>.</p>
      </div>
      <div class="arch-box">
        <h4>[#Data] / [#All]</h4>
        <p><code>[#Data]</code> selects the data body excluding headers and totals; <code>[#All]</code> selects the entire table entity inclusive of all rows.</p>
      </div>
    </div>

    <div class="table-responsive">
      <table class="reference-table">
        <thead>
          <tr>
            <th>Special Item Specifier</th>
            <th>Target Scope</th>
            <th>Practical Analytics Usage</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>Table[Column]</code></td>
            <td>Data body rows only</td>
            <td>Standard aggregations: <code>=SUM(Shipment_Table[Total_Freight_Cost])</code></td>
          </tr>
          <tr>
            <td><code>Table[[#Headers],[Column]]</code></td>
            <td>Header cell</td>
            <td>Dynamic card titles: <code>="Report for " &amp; Table[[#Headers],[Rate]]</code></td>
          </tr>
          <tr>
            <td><code>Table[[#Totals],[Column]]</code></td>
            <td>Total row footer</td>
            <td>Executive headline callout cards</td>
          </tr>
          <tr>
            <td><code>Table[#All]</code></td>
            <td>Headers + Data + Totals</td>
            <td>Exporting entire table to external databases or Power BI</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="keynote-box keynote-emerald">
      <strong>Analyst Takeaway:</strong> The Total Row uses <code>SUBTOTAL(109, ...)</code> under the hood, meaning when you filter by Transport Mode (e.g. Ocean only), the total immediately updates to reflect only the visible filtered shipments!
    </div>
  </div>
</section>

<section class="slide-section" id="sec08">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingAutoExpansion">
    <span class="heading-num-box">08</span>
    <span class="heading-title-box">
      <span class="heading-icon">📈</span>
      <span class="heading-title-text">Dynamic Range Auto-Expansion &amp; Formula Resilience</span>
      <button class="audio-play-btn" data-track-idx="7" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p class="lead-text">In flat spreadsheets, appending new records at the bottom creates formula blind spots. A formula written as <code>=SUM(G2:G23)</code> will remain locked to row 23 forever, silently omitting new rows 24, 25, and beyond. Excel Tables eradicate this vulnerability entirely.</p>
    
    <div class="architecture-grid">
      <div class="arch-box">
        <h4>Row Append Detection</h4>
        <p>Typing or pasting data immediately below the final row expands the table boundary automatically, adopting formatting and calculated columns.</p>
      </div>
      <div class="arch-box">
        <h4>Tab Key Ingestion</h4>
        <p>Pressing <kbd>Tab</kbd> in the bottom-right cell inserts a brand-new blank record ready for data entry, expanding the table schema seamlessly.</p>
      </div>
      <div class="arch-box">
        <h4>Column Auto-Expansion</h4>
        <p>Typing a new header in the adjacent column to the right expands the table width, integrating the new attribute into structured reference scope.</p>
      </div>
    </div>

    <div class="keynote-box keynote-emerald">
      <strong>Analyst Takeaway:</strong> Dynamic auto-expansion guarantees that charts, PivotTables, and summary formulas connected to <code>Shipment_Table</code> never miss newly ingested transactional data.
    </div>
  </div>
</section>

<section class="slide-section" id="sec09">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingTableSlicers">
    <span class="heading-num-box">09</span>
    <span class="heading-title-box">
      <span class="heading-icon">🎛️</span>
      <span class="heading-title-text">Interactive Dashboard Filtering with Visual Table Slicers</span>
      <button class="audio-play-btn" data-track-idx="8" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p class="lead-text">While AutoFilter dropdowns work well for individual column filtering, they conceal active criteria behind small funnel icons. <strong>Table Slicers</strong> provide interactive, touch-friendly graphical filter buttons that turn any raw Excel table into an executive dashboard.</p>
    
    <div class="architecture-grid">
      <div class="arch-box">
        <h4>1-Click Slicer Insert</h4>
        <p>Select table &rarr; <strong>Table Design &rarr; Insert Slicer</strong>. Choose categorical fields like <code>Transport_Mode</code> or <code>Customs_Status</code>.</p>
      </div>
      <div class="arch-box">
        <h4>Visual State Feedback</h4>
        <p>Buttons clearly highlight active selections (e.g. 'Ocean' highlighted, 'Rail' dimmed), making report filter states transparent to executives.</p>
      </div>
      <div class="arch-box">
        <h4>Multi-Select Flexibility</h4>
        <p>Hold <kbd>Ctrl</kbd> to select multiple discrete options, or click the multi-select icon to toggle compound cross-regional logistics views.</p>
      </div>
    </div>

    <div class="keynote-box keynote-emerald">
      <strong>Analyst Takeaway:</strong> Combine Table Slicers with a visible Total Row to build interactive mini-dashboards in under 60 seconds without writing a single line of VBA or macro code.
    </div>
  </div>
</section>

<section class="slide-section" id="sec10">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingXlookupTables">
    <span class="heading-num-box">10</span>
    <span class="heading-title-box">
      <span class="heading-icon">🔍</span>
      <span class="heading-title-text">Enterprise Lookups on Tables: XLOOKUP() &amp; Range Conversion</span>
      <button class="audio-play-btn" data-track-idx="9" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p class="lead-text">Combining official Excel Tables with modern lookup functions creates rock-solid relational architectures. By querying a master table like <code>Port_Directory</code> from <code>Shipment_Table</code> using structured columns, lookups become virtually impervious to column index errors.</p>
    
    <div class="architecture-grid">
      <div class="arch-box">
        <h4>Structured XLOOKUP</h4>
        <p><code>=XLOOKUP([@Origin_Port], Port_Directory[Port_Code], Port_Directory[Port_Name])</code><br>Eliminates fragile column index numbers entirely.</p>
      </div>
      <div class="arch-box">
        <h4>Dynamic Surcharge Calc</h4>
        <p><code>=[@[TEU_Containers]] * XLOOKUP([@[Origin_Port]], Port_Directory[Port_Code], Port_Directory[Surcharge])</code><br>Multiplies containers by rate.</p>
      </div>
      <div class="arch-box">
        <h4>Convert to Range</h4>
        <p>Need to strip table mechanics? <strong>Table Design &rarr; Convert to Range</strong> preserves data and formatting while reverting to standard grid.</p>
      </div>
    </div>

    <div class="table-responsive">
      <table class="reference-table">
        <thead>
          <tr>
            <th>Lookup Technique</th>
            <th>VLOOKUP (Legacy)</th>
            <th>Structured XLOOKUP (Modern)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Column Insertion Safety</td>
            <td>Breaks immediately when column index shifts</td>
            <td>100% resilient; binds directly to column name</td>
          </tr>
          <tr>
            <td>Directional Flexibility</td>
            <td>Left-to-right lookup only</td>
            <td>Bidirectional; looks left, right, up, or down</td>
          </tr>
          <tr>
            <td>Code Readability</td>
            <td><code>=VLOOKUP(C2, 'Ports'!A:F, 6, FALSE)</code></td>
            <td><code>=XLOOKUP([@Origin], Ports[Code], Ports[Surcharge])</code></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="keynote-box keynote-emerald">
      <strong>Analyst Takeaway:</strong> Pairing structured tables with <code>XLOOKUP()</code> represents the pinnacle of modern spreadsheet design. Models built this way run faster, break less, and can be handed over to any business stakeholder with zero onboarding friction.
    </div>
  </div>
</section>
`
    }
  ],

  // ═══════════════ CANONICAL SEED WORKBOOK: TRANSGLOBAL FREIGHT ═══════════════
  initialWorkbook: {
    "Shipment_Table": [
      ["Shipment ID", "Transport Mode", "Origin Port", "Destination Port", "TEU Containers", "Rate per TEU", "Total Freight Cost", "Transit Days", "Customs Status"],
      ["SHP-501", "Ocean", "SGSIN", "USLAX", 120, 1850, "=E2*F2", 24, "Cleared"],
      ["SHP-502", "Rail",  "DEHAM", "NLRTM", 45,  920,  "=E3*F3", 4,  "Cleared"],
      ["SHP-503", "Ocean", "CNSHA", "USLAX", 250, 2100, "=E4*F4", 18, "Cleared"],
      ["SHP-504", "Rail",  "USLAX", "USCHI", 80,  1450, "=E5*F5", 6,  "Pending"],
      ["SHP-505", "Ocean", "JPTYO", "DEHAM", 60,  2400, "=E6*F6", 32, "Cleared"],
      ["SHP-506", "Ocean", "SGSIN", "NLRTM", 300, 1950, "=E7*F7", 22, "Cleared"],
      ["SHP-507", "Rail",  "DEHAM", "PLWAW", 35,  880,  "=E8*F8", 3,  "Cleared"],
      ["SHP-508", "Ocean", "CNSHA", "DEHAM", 180, 2250, "=E9*F9", 26, "Under Review"],
      ["SHP-509", "Ocean", "NLRTM", "USNYC", 140, 1750, "=E10*F10", 14, "Cleared"],
      ["SHP-510", "Rail",  "CNSHA", "KZALA", 50,  1300, "=E11*F11", 8,  "Cleared"],
      ["SHP-511", "Ocean", "USLAX", "JPTYO", 95,  1600, "=E12*F12", 16, "Cleared"],
      ["SHP-512", "Ocean", "SGSIN", "DEHAM", 210, 2050, "=E13*F13", 25, "Cleared"],
      ["SHP-513", "Rail",  "USNYC", "USCHI", 70,  1150, "=E14*F14", 5,  "Pending"],
      ["SHP-514", "Ocean", "CNSHA", "SGSIN", 160, 1200, "=E15*F15", 9,  "Cleared"],
      ["SHP-515", "Ocean", "JPTYO", "USLAX", 110, 1900, "=E16*F16", 15, "Cleared"],
      ["SHP-516", "Rail",  "NLRTM", "ITMIL", 40,  980,  "=E17*F17", 4,  "Cleared"],
      ["SHP-517", "Ocean", "DEHAM", "SGSIN", 130, 2150, "=E18*F18", 27, "Cleared"],
      ["SHP-518", "Ocean", "USLAX", "CNSHA", 85,  1500, "=E19*F19", 19, "Under Review"],
      ["SHP-519", "Rail",  "KZALA", "DEHAM", 55,  1400, "=E20*F20", 11, "Cleared"],
      ["SHP-520", "Ocean", "SGSIN", "USNYC", 175, 2300, "=E21*F21", 28, "Cleared"],
      ["SHP-521", "Rail",  "USCHI", "USLAX", 65,  1250, "=E22*F22", 6,  "Cleared"],
      ["SHP-522", "Ocean", "CNSHA", "NLRTM", 220, 2100, "=E23*F23", 24, "Cleared"]
    ],
    "Port_Directory": [
      ["Port Code", "Port Name", "Country", "Region", "Handling Capacity TEU", "Wharfage Surcharge"],
      ["SGSIN", "Singapore Jurong",   "Singapore",   "APAC",     36000000, 120],
      ["USLAX", "Los Angeles Harbor", "USA",         "Americas", 10500000, 185],
      ["NLRTM", "Rotterdam Gateway",  "Netherlands", "EMEA",     14800000, 140],
      ["CNSHA", "Shanghai Port",      "China",       "APAC",     47000000, 95],
      ["DEHAM", "Hamburg Terminal",   "Germany",     "EMEA",     8500000,  160],
      ["JPTYO", "Tokyo Bay",          "Japan",       "APAC",     4500000,  150]
    ],
    "Table_Analytics": [
      ["Fleet Analytics Metric", "Calculated Value", "Structured Reference Syntax / Scope"],
      ["Total Freight Expenditure (SUM)", "", "Shipment_Table[Total_Freight_Cost]"],
      ["Total TEU Containers Transported (SUM)", "", "Shipment_Table[TEU_Containers]"],
      ["Average Freight Rate per TEU (AVERAGE)", "", "Shipment_Table[Rate_per_TEU]"],
      ["Maximum Route TEU Capacity (MAX)", "", "Shipment_Table[TEU_Containers]"],
      ["Minimum Freight Rate per TEU (MIN)", "", "Shipment_Table[Rate_per_TEU]"],
      ["Total Active Shipments Count (COUNT)", "", "Shipment_Table[TEU_Containers]"],
      ["Total Ocean Freight Expenditure (SUMIF)", "", "Filter: Transport_Mode = 'Ocean'"],
      ["Total Rail Freight Expenditure (SUMIF)", "", "Filter: Transport_Mode = 'Rail'"],
      ["Count of Ocean Shipments (COUNTIF)", "", "Filter: Transport_Mode = 'Ocean'"],
      ["Count of Rail Shipments (COUNTIF)", "", "Filter: Transport_Mode = 'Rail'"],
      ["Large Ocean Shipments Count (COUNTIFS)", "", "Mode = 'Ocean', TEU >= 150"],
      ["Cleared Customs Freight Value (SUMIF)", "", "Status = 'Cleared'"],
      ["Average Ocean Transit Days (AVERAGEIF)", "", "Mode = 'Ocean'"],
      ["Filtered Freight Expenditure (SUBTOTAL 9)", "", "Dynamic visible row total"],
      ["Origin Port Name for First Route (XLOOKUP)", "", "Lookup Origin Port in Port_Directory"],
      ["Origin Port Wharfage Surcharge (XLOOKUP)", "", "Lookup Surcharge in Port_Directory"],
      ["Row 2 Wharfage Surcharge Total", "", "Containers * Wharfage Surcharge"],
      ["High-Volume Ocean Freight Value (SUMIFS)", "", "Mode = 'Ocean', TEU >= 150"],
      ["Formatted Total Freight String (TEXT)", "", "Formatted as #,##0 string"],
      ["Port Surcharge Narrative Tag (TEXTJOIN)", "", "Structured string concatenation"]
    ]
  },

  initialAuxiliary: {
    "Shipment_Table": {
      "K1": "Fleet Priority Benchmark", "L1": 150,
      "K2": "Target Ocean SLA Days",    "L2": 25
    }
  },

  // ═══════════════ 20 CHALLENGES (SCHEMA v2.1) ═══════════════
  challenges: [
    // ── 6 EASY CHALLENGES (c01 - c06) ─────────────────────────────────────────
    {
      id: "c01",
      number: 1,
      title: "Total Freight Expenditure (SUM)",
      prompt: "To audit grand total freight expenditure across all global trade corridors, in sheet <code>Table_Analytics</code> cell <strong>B2</strong>, write a formula using <code>=SUM()</code> to calculate total freight expenditure from <code>Shipment_Table!G2:G23</code>.",
      targetSheet: "Table_Analytics",
      targetCell: "B2",
      solution: "=SUM(Shipment_Table!G2:G23)",
      expectedFormulaPrefix: "=SUM",
      expectedValue: 4912150,
      tolerance: 0.1,
      hint: "Use =SUM(Shipment_Table!G2:G23)",
      difficulty: "easy",
      bloom: "apply",
      xp: 75,
      marks: 1.0,
      check: {
        expected: 4912150,
        tolerance: 0.1,
        mustUseAnyOf: [["SUM"]],
        mustReference: ["Shipment_Table!G2:G23"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=4912150$", message: "Do not hardcode the total. Write =SUM(Shipment_Table!G2:G23)." }
      ],
      dataScope: {
        cols: ["G"],
        params: [],
        previewRows: 22,
        summary: "Calculates total freight spend across rail and ocean routes."
      }
    },
    {
      id: "c02",
      number: 2,
      title: "Total TEU Containers Transported (SUM)",
      prompt: "To assess fleet-wide cargo handling capacity across all active transit routes, in sheet <code>Table_Analytics</code> cell <strong>B3</strong>, write a formula using <code>=SUM()</code> to calculate total TEU container volume from <code>Shipment_Table!E2:E23</code>.",
      targetSheet: "Table_Analytics",
      targetCell: "B3",
      solution: "=SUM(Shipment_Table!E2:E23)",
      expectedFormulaPrefix: "=SUM",
      expectedValue: 2675,
      tolerance: 0.1,
      hint: "Use =SUM(Shipment_Table!E2:E23)",
      difficulty: "easy",
      bloom: "apply",
      xp: 75,
      marks: 1.0,
      check: {
        expected: 2675,
        tolerance: 0.1,
        mustUseAnyOf: [["SUM"]],
        mustReference: ["Shipment_Table!E2:E23"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=2675$", message: "Do not hardcode 2675. Write =SUM(Shipment_Table!E2:E23)." }
      ],
      dataScope: {
        cols: ["E"],
        params: [],
        previewRows: 22,
        summary: "Aggregates total container capacity across global routes."
      }
    },
    {
      id: "c03",
      number: 3,
      title: "Average Freight Rate per TEU (AVERAGE)",
      prompt: "To benchmark baseline shipping unit economics across all carrier routes, in sheet <code>Table_Analytics</code> cell <strong>B4</strong>, write a formula using <code>=AVERAGE()</code> to compute the arithmetic mean freight rate per TEU from <code>Shipment_Table!F2:F23</code>.",
      targetSheet: "Table_Analytics",
      targetCell: "B4",
      solution: "=AVERAGE(Shipment_Table!F2:F23)",
      expectedFormulaPrefix: "=AVERAGE",
      expectedValue: 1655.91,
      tolerance: 0.1,
      hint: "Use =AVERAGE(Shipment_Table!F2:F23)",
      difficulty: "easy",
      bloom: "apply",
      xp: 75,
      marks: 1.0,
      check: {
        expected: 1655.91,
        tolerance: 0.1,
        mustUseAnyOf: [["AVERAGE"]],
        mustReference: ["Shipment_Table!F2:F23"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=1655", message: "Do not hardcode the static average. Write =AVERAGE(Shipment_Table!F2:F23)." }
      ],
      dataScope: {
        cols: ["F"],
        params: [],
        previewRows: 22,
        summary: "Calculates average freight pricing per container."
      }
    },
    {
      id: "c04",
      number: 4,
      title: "Maximum Route TEU Capacity (MAX)",
      prompt: "To determine peak single-route container exposure for logistics capacity planning, in sheet <code>Table_Analytics</code> cell <strong>B5</strong>, write a formula using <code>=MAX()</code> to identify the highest route container capacity from <code>Shipment_Table!E2:E23</code>.",
      targetSheet: "Table_Analytics",
      targetCell: "B5",
      solution: "=MAX(Shipment_Table!E2:E23)",
      expectedFormulaPrefix: "=MAX",
      expectedValue: 300,
      tolerance: 0,
      hint: "Use =MAX(Shipment_Table!E2:E23)",
      difficulty: "easy",
      bloom: "apply",
      xp: 75,
      marks: 1.0,
      check: {
        expected: 300,
        tolerance: 0,
        mustUseAnyOf: [["MAX"]],
        mustReference: ["Shipment_Table!E2:E23"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=300$", message: "Do not hardcode 300. Use =MAX(Shipment_Table!E2:E23)." }
      ],
      dataScope: {
        cols: ["E"],
        params: [],
        previewRows: 22,
        summary: "Identifies largest container volume batch across all shipments."
      }
    },
    {
      id: "c05",
      number: 5,
      title: "Minimum Freight Rate per TEU (MIN)",
      prompt: "To identify the most cost-competitive contracted tariff in the carrier network, in sheet <code>Table_Analytics</code> cell <strong>B6</strong>, write a formula using <code>=MIN()</code> to determine the lowest freight rate per TEU from <code>Shipment_Table!F2:F23</code>.",
      targetSheet: "Table_Analytics",
      targetCell: "B6",
      solution: "=MIN(Shipment_Table!F2:F23)",
      expectedFormulaPrefix: "=MIN",
      expectedValue: 880,
      tolerance: 0,
      hint: "Use =MIN(Shipment_Table!F2:F23)",
      difficulty: "easy",
      bloom: "apply",
      xp: 75,
      marks: 1.0,
      check: {
        expected: 880,
        tolerance: 0,
        mustUseAnyOf: [["MIN"]],
        mustReference: ["Shipment_Table!F2:F23"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=880$", message: "Do not hardcode 880. Write =MIN(Shipment_Table!F2:F23)." }
      ],
      dataScope: {
        cols: ["F"],
        params: [],
        previewRows: 22,
        summary: "Finds lowest economy freight tariff."
      }
    },
    {
      id: "c06",
      number: 6,
      title: "Total Active Shipments Count (COUNT)",
      prompt: "To verify operational manifest completeness and log all active consignments, in sheet <code>Table_Analytics</code> cell <strong>B7</strong>, write a formula using <code>=COUNT()</code> to count active numerical shipment records from <code>Shipment_Table!E2:E23</code>.",
      targetSheet: "Table_Analytics",
      targetCell: "B7",
      solution: "=COUNT(Shipment_Table!E2:E23)",
      expectedFormulaPrefix: "=COUNT",
      expectedValue: 22,
      tolerance: 0,
      hint: "Use =COUNT(Shipment_Table!E2:E23)",
      difficulty: "easy",
      bloom: "apply",
      xp: 75,
      marks: 1.0,
      check: {
        expected: 22,
        tolerance: 0,
        mustUseAnyOf: [["COUNT"]],
        mustReference: ["Shipment_Table!E2:E23"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=22$", message: "Do not hardcode 22. Write =COUNT(Shipment_Table!E2:E23)." }
      ],
      dataScope: {
        cols: ["E"],
        params: [],
        previewRows: 22,
        summary: "Verifies total active shipment record count."
      }
    },

    // ── 8 MEDIUM CHALLENGES (c07 - c14) ─────────────────────────────────────────
    {
      id: "c07",
      number: 7,
      title: "Total Ocean Freight Expenditure (SUMIF)",
      prompt: "To isolate maritime freight financial exposure across ocean shipping lanes, in sheet <code>Table_Analytics</code> cell <strong>B8</strong>, write a formula using <code>=SUMIF()</code> to calculate total expenditure where Transport Mode in <code>Shipment_Table!B2:B23</code> equals \"Ocean\", summing freight costs from <code>Shipment_Table!G2:G23</code>.",
      targetSheet: "Table_Analytics",
      targetCell: "B8",
      solution: '=SUMIF(Shipment_Table!B2:B23, "Ocean", Shipment_Table!G2:G23)',
      expectedFormulaPrefix: "=SUMIF",
      expectedValue: 4381000,
      tolerance: 0.1,
      hint: 'Use =SUMIF(Shipment_Table!B2:B23, "Ocean", Shipment_Table!G2:G23)',
      difficulty: "medium",
      bloom: "apply",
      xp: 75,
      marks: 1.0,
      check: {
        expected: 4381000,
        tolerance: 0.1,
        mustUseAnyOf: [["SUMIF"]],
        mustReference: ["Shipment_Table!B2:B23", "Shipment_Table!G2:G23"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=4381000$", message: "Do not hardcode the total. Write =SUMIF(Shipment_Table!B2:B23, \"Ocean\", Shipment_Table!G2:G23)." }
      ],
      dataScope: {
        cols: ["B", "G"],
        params: ['Mode "Ocean"'],
        previewRows: 22,
        summary: "Isolates total spend for maritime ocean container routes."
      }
    },
    {
      id: "c08",
      number: 8,
      title: "Total Rail Freight Expenditure (SUMIF)",
      prompt: "To isolate intermodal land corridor logistics costs across rail networks, in sheet <code>Table_Analytics</code> cell <strong>B9</strong>, write a formula using <code>=SUMIF()</code> to calculate total freight spend where Transport Mode in <code>Shipment_Table!B2:B23</code> equals \"Rail\", summing freight costs from <code>Shipment_Table!G2:G23</code>.",
      targetSheet: "Table_Analytics",
      targetCell: "B9",
      solution: '=SUMIF(Shipment_Table!B2:B23, "Rail", Shipment_Table!G2:G23)',
      expectedFormulaPrefix: "=SUMIF",
      expectedValue: 531150,
      tolerance: 0.1,
      hint: 'Use =SUMIF(Shipment_Table!B2:B23, "Rail", Shipment_Table!G2:G23)',
      difficulty: "medium",
      bloom: "apply",
      xp: 75,
      marks: 1.0,
      check: {
        expected: 531150,
        tolerance: 0.1,
        mustUseAnyOf: [["SUMIF"]],
        mustReference: ["Shipment_Table!B2:B23", "Shipment_Table!G2:G23"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=531150$", message: "Do not hardcode 531150. Write =SUMIF(Shipment_Table!B2:B23, \"Rail\", Shipment_Table!G2:G23)." }
      ],
      dataScope: {
        cols: ["B", "G"],
        params: ['Mode "Rail"'],
        previewRows: 22,
        summary: "Isolates total spend for overland intermodal rail routes."
      }
    },
    {
      id: "c09",
      number: 9,
      title: "Count of Ocean Shipments (COUNTIF)",
      prompt: "To monitor vessel traffic allocation across maritime shipping routes, in sheet <code>Table_Analytics</code> cell <strong>B10</strong>, write a formula using <code>=COUNTIF()</code> to count shipments where Transport Mode in <code>Shipment_Table!B2:B23</code> equals \"Ocean\".",
      targetSheet: "Table_Analytics",
      targetCell: "B10",
      solution: '=COUNTIF(Shipment_Table!B2:B23, "Ocean")',
      expectedFormulaPrefix: "=COUNTIF",
      expectedValue: 14,
      tolerance: 0,
      hint: 'Use =COUNTIF(Shipment_Table!B2:B23, "Ocean")',
      difficulty: "medium",
      bloom: "apply",
      xp: 75,
      marks: 1.0,
      check: {
        expected: 14,
        tolerance: 0,
        mustUseAnyOf: [["COUNTIF"]],
        mustReference: ["Shipment_Table!B2:B23"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=14$", message: "Do not hardcode 14. Write =COUNTIF(Shipment_Table!B2:B23, \"Ocean\")." }
      ],
      dataScope: {
        cols: ["B"],
        params: ['Mode "Ocean"'],
        previewRows: 22,
        summary: "Quantifies ocean dispatch route volume."
      }
    },
    {
      id: "c10",
      number: 10,
      title: "Count of Rail Shipments (COUNTIF)",
      prompt: "To track cargo volume distribution across overland rail freight corridors, in sheet <code>Table_Analytics</code> cell <strong>B11</strong>, write a formula using <code>=COUNTIF()</code> to count shipments where Transport Mode in <code>Shipment_Table!B2:B23</code> equals \"Rail\".",
      targetSheet: "Table_Analytics",
      targetCell: "B11",
      solution: '=COUNTIF(Shipment_Table!B2:B23, "Rail")',
      expectedFormulaPrefix: "=COUNTIF",
      expectedValue: 8,
      tolerance: 0,
      hint: 'Use =COUNTIF(Shipment_Table!B2:B23, "Rail")',
      difficulty: "medium",
      bloom: "apply",
      xp: 75,
      marks: 1.0,
      check: {
        expected: 8,
        tolerance: 0,
        mustUseAnyOf: [["COUNTIF"]],
        mustReference: ["Shipment_Table!B2:B23"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=8$", message: "Do not hardcode 8. Write =COUNTIF(Shipment_Table!B2:B23, \"Rail\")." }
      ],
      dataScope: {
        cols: ["B"],
        params: ['Mode "Rail"'],
        previewRows: 22,
        summary: "Quantifies intermodal rail route volume."
      }
    },
    {
      id: "c11",
      number: 11,
      title: "Large Ocean Shipments Count (COUNTIFS)",
      prompt: "To identify high-capacity maritime voyages requiring priority container yard staging, in sheet <code>Table_Analytics</code> cell <strong>B12</strong>, write a multi-criteria formula using <code>=COUNTIFS()</code> to count shipments where Transport Mode in <code>Shipment_Table!B2:B23</code> equals \"Ocean\" AND Container Count in <code>Shipment_Table!E2:E23</code> is \">=150\".",
      targetSheet: "Table_Analytics",
      targetCell: "B12",
      solution: '=COUNTIFS(Shipment_Table!B2:B23, "Ocean", Shipment_Table!E2:E23, ">=150")',
      expectedFormulaPrefix: "=COUNTIFS",
      expectedValue: 7,
      tolerance: 0,
      hint: 'Use =COUNTIFS(Shipment_Table!B2:B23, "Ocean", Shipment_Table!E2:E23, ">=150")',
      difficulty: "medium",
      bloom: "evaluate",
      xp: 75,
      marks: 1.0,
      check: {
        expected: 7,
        tolerance: 0,
        mustUseAnyOf: [["COUNTIFS"]],
        mustReference: ["Shipment_Table!B2:B23", "Shipment_Table!E2:E23"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=7$", message: "Do not hardcode 7. Write =COUNTIFS(Shipment_Table!B2:B23, \"Ocean\", Shipment_Table!E2:E23, \">=150\")." }
      ],
      dataScope: {
        cols: ["B", "E"],
        params: ['Mode "Ocean"', 'TEU >= 150'],
        previewRows: 22,
        summary: "Filters high-capacity ocean bulk shipments."
      }
    },
    {
      id: "c12",
      number: 12,
      title: "Cleared Customs Freight Value (SUMIF)",
      prompt: "To reconcile freight liabilities eligible for immediate carrier disbursement upon customs clearance, in sheet <code>Table_Analytics</code> cell <strong>B13</strong>, write a formula using <code>=SUMIF()</code> to calculate total freight expenditure where Customs Status in <code>Shipment_Table!I2:I23</code> equals \"Cleared\", summing freight costs from <code>Shipment_Table!G2:G23</code>.",
      targetSheet: "Table_Analytics",
      targetCell: "B13",
      solution: '=SUMIF(Shipment_Table!I2:I23, "Cleared", Shipment_Table!G2:G23)',
      expectedFormulaPrefix: "=SUMIF",
      expectedValue: 4183150,
      tolerance: 0.1,
      hint: 'Use =SUMIF(Shipment_Table!I2:I23, "Cleared", Shipment_Table!G2:G23)',
      difficulty: "medium",
      bloom: "apply",
      xp: 75,
      marks: 1.0,
      check: {
        expected: 4183150,
        tolerance: 0.1,
        mustUseAnyOf: [["SUMIF"]],
        mustReference: ["Shipment_Table!I2:I23", "Shipment_Table!G2:G23"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=4183150$", message: "Do not hardcode. Write =SUMIF(Shipment_Table!I2:I23, \"Cleared\", Shipment_Table!G2:G23)." }
      ],
      dataScope: {
        cols: ["I", "G"],
        params: ['Status "Cleared"'],
        previewRows: 22,
        summary: "Calculates finalized freight spend for compliant cargo."
      }
    },
    {
      id: "c13",
      number: 13,
      title: "Average Ocean Transit Days (ROUND + AVERAGEIF)",
      prompt: "To benchmark maritime delivery turnaround against international logistics SLA targets, in sheet <code>Table_Analytics</code> cell <strong>B14</strong>, write a formula using <code>=ROUND()</code> and <code>=AVERAGEIF()</code> to calculate average transit days from <code>Shipment_Table!H2:H23</code> where Transport Mode in <code>Shipment_Table!B2:B23</code> equals \"Ocean\", rounded to <code>2</code> decimal places.",
      targetSheet: "Table_Analytics",
      targetCell: "B14",
      solution: '=ROUND(AVERAGEIF(Shipment_Table!B2:B23, "Ocean", Shipment_Table!H2:H23), 2)',
      expectedFormulaPrefix: "=ROUND",
      expectedValue: 21.36,
      tolerance: 0.05,
      hint: 'Use =ROUND(AVERAGEIF(Shipment_Table!B2:B23, "Ocean", Shipment_Table!H2:H23), 2)',
      difficulty: "medium",
      bloom: "evaluate",
      xp: 75,
      marks: 1.0,
      check: {
        expected: 21.36,
        tolerance: 0.05,
        mustUseAnyOf: [["ROUND"], ["AVERAGEIF"]],
        mustReference: ["Shipment_Table!B2:B23", "Shipment_Table!H2:H23"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=21\\.36$", message: "Do not hardcode 21.36. Use =ROUND(AVERAGEIF(Shipment_Table!B2:B23, \"Ocean\", Shipment_Table!H2:H23), 2)." }
      ],
      dataScope: {
        cols: ["B", "H"],
        params: ['Mode "Ocean"'],
        previewRows: 22,
        summary: "Computes mean maritime ocean turnaround duration."
      }
    },
    {
      id: "c14",
      number: 14,
      title: "Filtered Freight Expenditure (SUBTOTAL 9)",
      prompt: "To support interactive executive dashboard slicing without distorting visible totals, in sheet <code>Table_Analytics</code> cell <strong>B15</strong>, write a dynamic aggregation formula using <code>=SUBTOTAL()</code> with function number <code>9</code> to calculate visible freight expenditure across <code>Shipment_Table!G2:G23</code>.",
      targetSheet: "Table_Analytics",
      targetCell: "B15",
      solution: "=SUBTOTAL(9, Shipment_Table!G2:G23)",
      expectedFormulaPrefix: "=SUBTOTAL",
      expectedValue: 4912150,
      tolerance: 0.1,
      hint: "Use =SUBTOTAL(9, Shipment_Table!G2:G23)",
      difficulty: "medium",
      bloom: "evaluate",
      xp: 75,
      marks: 1.0,
      check: {
        expected: 4912150,
        tolerance: 0.1,
        mustUseAnyOf: [["SUBTOTAL"]],
        mustReference: ["Shipment_Table!G2:G23"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=SUM\\(", message: "Use SUBTOTAL with function code 9 rather than SUM to support dynamic filter aggregation." }
      ],
      dataScope: {
        cols: ["G"],
        params: ["Code 9 (SUM)"],
        previewRows: 22,
        summary: "Dynamic visible row aggregation reflecting table filter state."
      }
    },

    // ── 6 HARD CHALLENGES (c15 - c20) ───────────────────────────────────────────
    {
      id: "c15",
      number: 15,
      title: "Origin Port Name for First Route (XLOOKUP)",
      prompt: "To resolve origin port codes into primary terminal facility names on cargo manifests, in sheet <code>Table_Analytics</code> cell <strong>B16</strong>, write a lookup formula using <code>=XLOOKUP()</code> to match origin port code <code>Shipment_Table!C2</code> in master range <code>Port_Directory!A2:A7</code> and return the corresponding port name from <code>Port_Directory!B2:B7</code>.",
      targetSheet: "Table_Analytics",
      targetCell: "B16",
      solution: "=XLOOKUP(Shipment_Table!C2, Port_Directory!A2:A7, Port_Directory!B2:B7)",
      expectedFormulaPrefix: "=XLOOKUP",
      expectedValue: "Singapore Jurong",
      tolerance: 0,
      hint: "Use =XLOOKUP(Shipment_Table!C2, Port_Directory!A2:A7, Port_Directory!B2:B7)",
      difficulty: "hard",
      bloom: "evaluate",
      xp: 75,
      marks: 1.0,
      check: {
        expected: "Singapore Jurong",
        tolerance: 0,
        mustUseAnyOf: [["XLOOKUP"]],
        mustReference: ["Shipment_Table!C2", "Port_Directory!A2:A7", "Port_Directory!B2:B7"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=\"Singapore Jurong\"$", message: "Do not hardcode the port name. Use XLOOKUP against Port_Directory." }
      ],
      dataScope: {
        cols: ["C", "A", "B"],
        params: [],
        previewRows: 6,
        summary: "Performs exact lookup on master port directory."
      }
    },
    {
      id: "c16",
      number: 16,
      title: "Origin Port Wharfage Surcharge (XLOOKUP)",
      prompt: "To audit contractual terminal handling tariffs for origin port facilities, in sheet <code>Table_Analytics</code> cell <strong>B17</strong>, write a lookup formula using <code>=XLOOKUP()</code> to match origin port code <code>Shipment_Table!C2</code> against <code>Port_Directory!A2:A7</code> and return the wharfage surcharge per TEU from <code>Port_Directory!F2:F7</code>.",
      targetSheet: "Table_Analytics",
      targetCell: "B17",
      solution: "=XLOOKUP(Shipment_Table!C2, Port_Directory!A2:A7, Port_Directory!F2:F7)",
      expectedFormulaPrefix: "=XLOOKUP",
      expectedValue: 120,
      tolerance: 0,
      hint: "Use =XLOOKUP(Shipment_Table!C2, Port_Directory!A2:A7, Port_Directory!F2:F7)",
      difficulty: "hard",
      bloom: "evaluate",
      xp: 75,
      marks: 1.0,
      check: {
        expected: 120,
        tolerance: 0,
        mustUseAnyOf: [["XLOOKUP"]],
        mustReference: ["Shipment_Table!C2", "Port_Directory!A2:A7", "Port_Directory!F2:F7"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=120$", message: "Do not hardcode 120. Look up surcharge from Port_Directory using XLOOKUP." }
      ],
      dataScope: {
        cols: ["C", "A", "F"],
        params: [],
        previewRows: 6,
        summary: "Extracts port-specific handling tariff."
      }
    },
    {
      id: "c17",
      number: 17,
      title: "Row 2 Wharfage Surcharge Total",
      prompt: "To calculate origin terminal wharfage surcharges for shipment SHP-501 prior to departure, in sheet <code>Table_Analytics</code> cell <strong>B18</strong>, write a formula multiplying container volume <code>Shipment_Table!E2</code> by the per-TEU surcharge looked up via <code>=XLOOKUP()</code> matching origin code <code>Shipment_Table!C2</code> in <code>Port_Directory!A2:A7</code> and returning <code>Port_Directory!F2:F7</code>.",
      targetSheet: "Table_Analytics",
      targetCell: "B18",
      solution: "=Shipment_Table!E2*XLOOKUP(Shipment_Table!C2, Port_Directory!A2:A7, Port_Directory!F2:F7)",
      expectedFormulaPrefix: "=Shipment_Table!E2",
      expectedValue: 14400,
      tolerance: 0.1,
      hint: "Use =Shipment_Table!E2*XLOOKUP(Shipment_Table!C2, Port_Directory!A2:A7, Port_Directory!F2:F7)",
      difficulty: "hard",
      bloom: "create",
      xp: 75,
      marks: 1.0,
      check: {
        expected: 14400,
        tolerance: 0.1,
        mustUseAnyOf: [["XLOOKUP"]],
        mustReference: ["Shipment_Table!E2", "Shipment_Table!C2", "Port_Directory!A2:A7", "Port_Directory!F2:F7"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=14400$", message: "Do not hardcode 14400. Multiply Shipment_Table!E2 by XLOOKUP." }
      ],
      dataScope: {
        cols: ["E", "C", "A", "F"],
        params: [],
        previewRows: 1,
        summary: "Calculates port wharfage expenditure for route SHP-501."
      }
    },
    {
      id: "c18",
      number: 18,
      title: "High-Volume Ocean Freight Value (SUMIFS)",
      prompt: "To audit capital expenditure concentrated in high-capacity ocean trade lanes, in sheet <code>Table_Analytics</code> cell <strong>B19</strong>, write a multi-criteria aggregation formula using <code>=SUMIFS()</code> to sum freight costs from <code>Shipment_Table!G2:G23</code> where Transport Mode in <code>Shipment_Table!B2:B23</code> equals \"Ocean\" AND Container Count in <code>Shipment_Table!E2:E23</code> is \">=150\".",
      targetSheet: "Table_Analytics",
      targetCell: "B19",
      solution: '=SUMIFS(Shipment_Table!G2:G23, Shipment_Table!B2:B23, "Ocean", Shipment_Table!E2:E23, ">=150")',
      expectedFormulaPrefix: "=SUMIFS",
      expectedValue: 3002000,
      tolerance: 0.1,
      hint: 'Use =SUMIFS(Shipment_Table!G2:G23, Shipment_Table!B2:B23, "Ocean", Shipment_Table!E2:E23, ">=150")',
      difficulty: "hard",
      bloom: "create",
      xp: 75,
      marks: 1.0,
      check: {
        expected: 3002000,
        tolerance: 0.1,
        mustUseAnyOf: [["SUMIFS"]],
        mustReference: ["Shipment_Table!G2:G23", "Shipment_Table!B2:B23", "Shipment_Table!E2:E23"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=3002000$", message: "Do not hardcode the total. Write =SUMIFS(Shipment_Table!G2:G23, Shipment_Table!B2:B23, \"Ocean\", Shipment_Table!E2:E23, \">=150\")." }
      ],
      dataScope: {
        cols: ["G", "B", "E"],
        params: ['Mode "Ocean"', 'TEU >= 150'],
        previewRows: 22,
        summary: "Quantifies freight exposure on high-capacity ocean routes."
      }
    },
    {
      id: "c19",
      number: 19,
      title: "Formatted Total Freight String (TEXT)",
      prompt: "To prepare executive summary figures for financial board presentations, in sheet <code>Table_Analytics</code> cell <strong>B20</strong>, write a text formatting formula using <code>=TEXT()</code> to convert Grand Total Freight Expenditure in cell <code>B2</code> into a thousands-separated string formatted as \"#,##0\".",
      targetSheet: "Table_Analytics",
      targetCell: "B20",
      solution: '=TEXT(B2, "#,##0")',
      expectedFormulaPrefix: "=TEXT",
      expectedValue: "4,912,150",
      tolerance: 0,
      hint: 'Use =TEXT(B2, "#,##0")',
      difficulty: "hard",
      bloom: "create",
      xp: 75,
      marks: 1.0,
      check: {
        expected: "4,912,150",
        tolerance: 0,
        mustUseAnyOf: [["TEXT"]],
        mustReference: ["B2"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=\"4,912,150\"$", message: "Do not hardcode string. Reference cell B2 with =TEXT(B2, \"#,##0\")." }
      ],
      dataScope: {
        cols: ["B"],
        params: ['Format "#,##0"'],
        previewRows: 1,
        summary: "Formats numerical revenue balance into executive display string."
      }
    },
    {
      id: "c20",
      number: 20,
      title: "Port Surcharge Narrative Tag (TEXTJOIN)",
      prompt: "To synthesize a consolidated operational dispatch label for freight logistics manifests, in sheet <code>Table_Analytics</code> cell <strong>B21</strong>, write a composite formula using <code>=TEXTJOIN()</code> with delimiter \" - \" and ignore empty <code>TRUE</code>, combining the port name looked up via <code>=XLOOKUP(Shipment_Table!C2, Port_Directory!A2:A7, Port_Directory!B2:B7)</code> and the formatted surcharge string <code>TEXT(Shipment_Table!E2*XLOOKUP(Shipment_Table!C2, Port_Directory!A2:A7, Port_Directory!F2:F7), \"#,##0\")</code>.",
      targetSheet: "Table_Analytics",
      targetCell: "B21",
      solution: '=TEXTJOIN(" - ", TRUE, XLOOKUP(Shipment_Table!C2, Port_Directory!A2:A7, Port_Directory!B2:B7), TEXT(Shipment_Table!E2*XLOOKUP(Shipment_Table!C2, Port_Directory!A2:A7, Port_Directory!F2:F7), "#,##0"))',
      expectedFormulaPrefix: "=TEXTJOIN",
      expectedValue: "Singapore Jurong - 14,400",
      tolerance: 0,
      hint: 'Use =TEXTJOIN(" - ", TRUE, XLOOKUP(Shipment_Table!C2, Port_Directory!A2:A7, Port_Directory!B2:B7), TEXT(Shipment_Table!E2*XLOOKUP(Shipment_Table!C2, Port_Directory!A2:A7, Port_Directory!F2:F7), "#,##0"))',
      difficulty: "hard",
      bloom: "create",
      xp: 75,
      marks: 1.0,
      check: {
        expected: "Singapore Jurong - 14,400",
        tolerance: 0,
        mustUseAnyOf: [["TEXTJOIN"], ["XLOOKUP"], ["TEXT"]],
        mustReference: ["Shipment_Table!C2", "Shipment_Table!E2", "Port_Directory!A2:A7", "Port_Directory!B2:B7", "Port_Directory!F2:F7"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=\"Singapore Jurong - 14,400\"$", message: "Do not hardcode string. Combine TEXTJOIN, XLOOKUP, and TEXT." }
      ],
      dataScope: {
        cols: ["C", "E", "A", "B", "F"],
        params: ['Delimiter " - "'],
        previewRows: 1,
        summary: "Synthesizes multi-attribute route tariff narrative."
      }
    }
  ]
};

// Auto-mount Day 04 to active studio view when loaded
if (typeof window !== 'undefined') {
  if (window.COURSE_DAY === 4 || !window.EXCEL_COURSE_CONTENT['excelDay01']) {
    window.EXCEL_COURSE_CONTENT['excelDay01'] = window.EXCEL_COURSE_CONTENT['excelDay04'];
  }
}
