// public/excel/content/excel-day-01.js
// Manodemy Excel Studio — Day 01 Curriculum Manifest & Challenges
// Conforms to: MISSION SPECIFICATION v3.2 (Authoritative Source of Truth)

if (!window.EXCEL_COURSE_CONTENT) window.EXCEL_COURSE_CONTENT = {};

window.EXCEL_COURSE_CONTENT['excelDay01'] = {
  day: 1,
  globalDay: 19,
  title: "Spreadsheet Basics & Formulas",
  description: "Master modern spreadsheet architecture, cell addressing models, mathematical precedence, core statistical aggregations, criteria sums, and lookups.",
  topics: [
    "01. Excel Interface & Grid Anatomy",
    "02. Cell Referencing & Addressing ($A$1)",
    "03. Arithmetic Operators & Precedence",
    "04. Basic Statistical Aggregations (SUM, AVERAGE)",
    "05. Counting Functions (COUNT, COUNTA, COUNTBLANK)",
    "06. Min, Max & Boundary Values (MIN, MAX, LARGE)",
    "07. AutoFill, Flash Fill & Coordinate Shifting",
    "08. Criteria Analysis (SUMIF, COUNTIF, AVERAGEIF)",
    "09. Multi-Condition Aggregations (SUMIFS, COUNTIFS)",
    "10. Lookups & String Cleaning (XLOOKUP, INDEX/MATCH, TRIM)"
  ],
  slides: [
    {
      title: "Excel Orientation & Essential Formulas",
      html: `
<section class="slide-section" id="sec01">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingInterfaceAnatomy">
    <span class="heading-num-box">01</span>
    <span class="heading-title-box">
      <span class="heading-icon">📊</span>
      <span class="heading-title-text">Excel Interface & Grid Anatomy</span>
      <button class="audio-play-btn" data-track-idx="0" title="Play Narration">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p class="lead-text">Microsoft Excel organizes enterprise business data into an infinite two-dimensional matrix of addresses known as the <strong>Worksheet Grid</strong>. Understanding the physical layout of the grid is the foundational requirement for building auditable corporate models.</p>
    
    <div class="keynote-box keynote-emerald">
      <strong>⚡ Wall Street Modeling Hotkeys: Mouse-Free Grid Navigation</strong><br>
      Top investment banking analysts navigate grids entirely by keyboard: press <kbd>Ctrl + Arrow</kbd> to jump instantly to the furthest continuous data boundary, press <kbd>Ctrl + Shift + Arrow</kbd> to extend selections across entire data blocks in one keystroke, and press <kbd>Ctrl + Home</kbd> to reset cursor positioning to cell <code>A1</code>.
    </div>

    <div class="architecture-grid">
      <div class="arch-box">
        <h4>Columns (A &rarr; XFD)</h4>
        <p>16,384 vertical channels identified by alphabetical letters. In data engineering, columns represent <strong>fields</strong>, <strong>variables</strong>, or <strong>attributes</strong>.</p>
      </div>
      <div class="arch-box">
        <h4>Rows (1 &rarr; 1,048,576)</h4>
        <p>1,048,576 horizontal lines identified by numeric integers. In data analytics, rows represent unique <strong>transactions</strong>, <strong>records</strong>, or <strong>tuples</strong>.</p>
      </div>
      <div class="arch-box">
        <h4>Cell Coordinate</h4>
        <p>The exact intersection of a Column and Row. E.g., column <code>G</code> and row <code>16</code> intersect at unique coordinate address <code>G16</code>.</p>
      </div>
    </div>

    <div class="keynote-box keynote-amber">
      <strong>⚠️ Critical Anti-Pattern: Visual Cell Value vs. Underlying Formula Bar</strong><br>
      A common junior pitfall is assuming the value displayed in the grid is the true value. Excel's grid applies display rounding: a cell formatted as currency may display <code>$12.50</code> while containing <code>12.4981</code>. Downstream financial reconciliations will fail if analysts rely on rounded visual displays rather than the true underlying value in the Formula Bar.
    </div>

    <div class="keynote-box keynote-indigo">
      <strong>💼 Big 4 Audit & Technical Interview Insight:</strong><br>
      In corporate modeling assessments, candidates are evaluated on workbook hygiene. Never leave blank rows or columns inside a continuous data table—doing so breaks <kbd>Ctrl + Arrow</kbd> keyboard navigation and causes automated range detection algorithms to terminate prematurely.
    </div>
  </div>
</section>

<section class="slide-section" id="sec02">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingCellReferencing">
    <span class="heading-num-box">02</span>
    <span class="heading-title-box">
      <span class="heading-icon">🎯</span>
      <span class="heading-title-text">Cell Referencing & Addressing ($A$1)</span>
      <button class="audio-play-btn" data-track-idx="1" title="Play Narration">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p>Understanding how Excel shifts cell coordinates when formulas are copied or dragged across rows and columns is the single most critical foundation for building reliable, dynamic financial models.</p>

    <div class="keynote-box keynote-emerald">
      <strong>⚡ Speed Tip: The Universal F4 Anchor Cycle</strong><br>
      Highlight any coordinate in the formula bar and press <kbd>F4</kbd> (or <kbd>Fn + F4</kbd>) to cycle through all 4 reference states automatically: <code>A1</code> &rarr; <code>$A$1</code> &rarr; <code>A$1</code> &rarr; <code>$A1</code>.
    </div>

    <div class="table-responsive">
      <table class="reference-table">
        <thead>
          <tr>
            <th>Reference Type</th>
            <th>Syntax</th>
            <th>Horizontal Shift (Across Columns)</th>
            <th>Vertical Shift (Down Rows)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Relative Reference</strong></td>
            <td><code>A1</code></td>
            <td>Column increments (<code>B1</code>, <code>C1</code>)</td>
            <td>Row increments (<code>A2</code>, <code>A3</code>)</td>
          </tr>
          <tr>
            <td><strong>Absolute Reference</strong></td>
            <td><code>$A$1</code></td>
            <td>Locked (remains <code>$A$1</code>)</td>
            <td>Locked (remains <code>$A$1</code>)</td>
          </tr>
          <tr>
            <td><strong>Mixed (Row Locked)</strong></td>
            <td><code>A$1</code></td>
            <td>Column shifts (<code>B$1</code>, <code>C$1</code>)</td>
            <td>Row locked (remains row <code>1</code>)</td>
          </tr>
          <tr>
            <td><strong>Mixed (Column Locked)</strong></td>
            <td><code>$A1</code></td>
            <td>Column locked (remains column <code>A</code>)</td>
            <td>Row shifts (<code>$A2</code>, <code>$A3</code>)</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="keynote-box keynote-amber">
      <strong>⚠️ Critical Anti-Pattern: Unanchored Assumptions Table Reference</strong><br>
      When multiplying transaction rows by a single tax rate located in cell <code>$O$1</code>, junior analysts frequently write <code>=G2*O1</code>. When dragged down to row 3, the formula shifts to <code>=G3*O2</code>, multiplying revenue by an empty cell and producing zeroes or catastrophic tax under-reporting! Always lock scalar parameter inputs as <code>$O$1</code>.
    </div>

    <div class="keynote-box keynote-indigo">
      <strong>💼 Wall Street Modeling Interview Insight: Two-Way Matrix Multipliers</strong><br>
      In institutional sensitivity tables (e.g. Price &times; Volume matrices), modelers use mixed references simultaneously: <code>=$A2*B$1</code>. The column anchor <code>$A2</code> locks input drivers on the left axis while allowing vertical movement, and the row anchor <code>B$1</code> locks header drivers on the top axis while allowing horizontal propagation.
    </div>
  </div>
</section>

<section class="slide-section" id="sec03">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingArithmeticPrecedence">
    <span class="heading-num-box">03</span>
    <span class="heading-title-box">
      <span class="heading-icon">⚙️</span>
      <span class="heading-title-text">Arithmetic Operators & Precedence (BODMAS / PEMDAS)</span>
      <button class="audio-play-btn" data-track-idx="2" title="Play Narration">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p>Excel evaluates mathematical calculations strictly adhering to the universal mathematical hierarchy of operations (<strong>BODMAS / PEMDAS</strong>: Brackets, Orders/Exponents, Division/Multiplication, Addition/Subtraction). Neglecting precedence order is a leading cause of accounting errors in corporate spreadsheets.</p>

    <div class="keynote-box keynote-emerald">
      <strong>⚡ Big 4 Senior Auditor Tool: Formula Auditing Mode</strong><br>
      To audit all formula logic across a sheet without clicking cell-by-cell, press <kbd>Ctrl + ~</kbd> (grave accent). This instantly expands the entire worksheet into raw formula view, allowing instant inspection of calculations and misplaced parentheses.
    </div>

    <div class="architecture-grid">
      <div class="arch-box">
        <h4>1. Parentheses <code>()</code></h4>
        <p>Highest priority. Expressions inside brackets are evaluated first: <code>=(Revenue - Cost) / Revenue</code>.</p>
      </div>
      <div class="arch-box">
        <h4>2. Exponents <code>^</code></h4>
        <p>Calculates compound interest and powers: <code>=Principal * (1 + Rate)^Years</code>.</p>
      </div>
      <div class="arch-box">
        <h4>3. Mult & Div <code>*</code>, <code>/</code></h4>
        <p>Evaluated left-to-right with equal priority before addition and subtraction.</p>
      </div>
      <div class="arch-box">
        <h4>4. Add & Sub <code>+</code>, <code>-</code></h4>
        <p>Final arithmetic phase, executed sequentially from left to right.</p>
      </div>
    </div>

    <div class="keynote-box keynote-amber">
      <strong>⚠️ Critical Anti-Pattern: Gross Margin Calculation Error</strong><br>
      Writing <code>=Revenue - Cost / Revenue</code> instead of <code>=(Revenue - Cost) / Revenue</code>. Because division has higher precedence than subtraction, Excel divides Cost by Revenue first, then subtracts that decimal from total Revenue, completely corrupting corporate gross profit margin metrics!
    </div>

    <div class="keynote-box keynote-indigo">
      <strong>💼 Private Equity Associate Interview Test:</strong><br>
      Interviewers frequently ask candidates to evaluate complex formulas without a computer: <code>=10 + 20 * 2 ^ 2 - 50 / 2</code>. Correct derivation: Exponent first (2^2 = 4), then multiplications &amp; divisions (20 &times; 4 = 80, 50 / 2 = 25), resulting in 10 + 80 - 25 = 65.
    </div>
  </div>
</section>

<section class="slide-section" id="sec04">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingBasicAggregations">
    <span class="heading-num-box">04</span>
    <span class="heading-title-box">
      <span class="heading-icon">📈</span>
      <span class="heading-title-text">Basic Statistical Aggregations (SUM, AVERAGE, MEDIAN)</span>
      <button class="audio-play-btn" data-track-idx="3" title="Play Narration">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p>Statistical aggregations reduce high-volume transactional arrays into clear, executive summary metrics. Excel's native aggregation engine is engineered to handle numeric arrays while automatically ignoring non-numeric text headers.</p>

    <div class="keynote-box keynote-emerald">
      <strong>⚡ Speed Tip: The Lightning AutoSum Hotkey</strong><br>
      Select the cell directly beneath or to the right of any numeric column and press <kbd>Alt + =</kbd>. Excel automatically detects the contiguous numeric range and types <code>=SUM(...)</code> instantly. Press <kbd>Enter</kbd> to confirm.
    </div>

    <div class="table-responsive">
      <table class="reference-table">
        <thead>
          <tr>
            <th>Function</th>
            <th>Formula Signature</th>
            <th>Null & Text Handling</th>
            <th>Executive Business Application</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>SUM</code></td>
            <td><code>=SUM(number1, [number2], ...)</code></td>
            <td>Ignores text strings and blank cells; sums valid numbers.</td>
            <td>Grand total sales volume, portfolio asset value, corporate gross revenue.</td>
          </tr>
          <tr>
            <td><code>AVERAGE</code></td>
            <td><code>=AVERAGE(range)</code></td>
            <td>Ignores blanks; includes literal zeroes in divisor.</td>
            <td>Mean order value, average customer billings, mean transaction size.</td>
          </tr>
          <tr>
            <td><code>MEDIAN</code></td>
            <td><code>=MEDIAN(range)</code></td>
            <td>Sorts array internally and returns middle 50th percentile.</td>
            <td>Outlier-resistant compensation analysis, typical real estate selling prices.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="keynote-box keynote-amber">
      <strong>⚠️ Critical Anti-Pattern: Hardcoded Constants inside Aggregations</strong><br>
      Never write formulas like <code>=SUM(G2:G16) + 5000</code> or <code>=A1 + A2 + A3 + A4 + A5</code>. Hardcoding scalar offsets obscures audit trails and fails Big 4 audit reviews. Furthermore, manual plus chains fail to update when new transaction rows are inserted into the middle of the table, whereas <code>=SUM(A1:A5)</code> auto-expands dynamically.
    </div>

    <div class="keynote-box keynote-indigo">
      <strong>💼 FP&A Director Insight: When to Report MEDIAN over AVERAGE</strong><br>
      In executive compensation and customer lifetime value (LTV) reporting, a single enterprise contract (e.g. $10,000,000) artificially inflates the arithmetic mean (<code>AVERAGE</code>). Top analysts always present both <code>AVERAGE</code> and <code>MEDIAN</code> side-by-side to highlight distribution skewness to the CFO.
    </div>
  </div>
</section>

<section class="slide-section" id="sec05">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingCountingFunctions">
    <span class="heading-num-box">05</span>
    <span class="heading-title-box">
      <span class="heading-icon">🔢</span>
      <span class="heading-title-text">Counting Functions (COUNT, COUNTA, COUNTBLANK)</span>
      <button class="audio-play-btn" data-track-idx="4" title="Play Narration">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p>Data analysts must choose the correct counting function based on data types, nullability constraints, and data quality requirements. Selecting the wrong counter leads to completely false population tallies.</p>

    <div class="architecture-grid">
      <div class="arch-box">
        <h4>COUNT(range)</h4>
        <p>Counts cells containing strictly <strong>numbers</strong>, dates, or financial serials. Text strings, error tokens, and empty cells are completely ignored.</p>
      </div>
      <div class="arch-box">
        <h4>COUNTA(range)</h4>
        <p>Counts all <strong>non-empty</strong> cells regardless of data type (Numbers, Text, Booleans, Error tokens). Ideal for counting active registered records.</p>
      </div>
      <div class="arch-box">
        <h4>COUNTBLANK(range)</h4>
        <p>Counts strictly empty cells. Vital for data completeness audits, missing information detection, and data cleansing reconciliation.</p>
      </div>
    </div>

    <div class="keynote-box keynote-amber">
      <strong>⚠️ Critical Anti-Pattern: Using COUNT on Alphanumeric Customer IDs</strong><br>
      Running <code>=COUNT(A2:A100)</code> on Order IDs formatted as text (e.g. <code>"ORD-1001"</code>) returns exactly <code>0</code>! Because <code>COUNT</code> evaluates only pure numbers, text codes are silently ignored. Use <code>=COUNTA(A2:A100)</code> for text records. Conversely, beware that <code>COUNTA</code> counts formula cells returning empty strings <code>""</code> as non-blank!
    </div>

    <div class="keynote-box keynote-emerald">
      <strong>⚡ Speed Tip: The Status Bar Multi-Metric Scanner</strong><br>
      Highlight any column or range of cells and glance at the bottom-right Excel Status Bar. Right-click the status bar to toggle live instant displays of Average, Count, Numerical Count, Min, Max, and Sum without authoring a single formula.
    </div>

    <div class="keynote-box keynote-indigo">
      <strong>💼 Data Governance & Audit Insight: Data Completeness KPI</strong><br>
      Enterprise compliance scorecards calculate missing field rates via formula: <code>=COUNTBLANK(C2:C1000) / (COUNTA(C2:C1000) + COUNTBLANK(C2:C1000))</code>. If the missing rate exceeds 2%, automated pipeline alerts flag the batch for manual vendor review.
    </div>
  </div>
</section>

<section class="slide-section" id="sec06">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingMinMaxRank">
    <span class="heading-num-box">06</span>
    <span class="heading-title-box">
      <span class="heading-icon">🏆</span>
      <span class="heading-title-text">Min, Max & Boundary Values (MIN, MAX, LARGE, SMALL)</span>
      <button class="audio-play-btn" data-track-idx="5" title="Play Narration">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p>Boundary analysis establishes performance ceilings, risk floors, and tiered percentile ranks. Modern FP&A analysts use boundary functions for dynamic scorecard benchmarking and outlier detection.</p>

    <div class="table-responsive">
      <table class="reference-table">
        <thead>
          <tr>
            <th>Function</th>
            <th>Formula Syntax</th>
            <th>Behavior & Computational Logic</th>
            <th>Typical Enterprise Use Case</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>MAX</code></td>
            <td><code>=MAX(range)</code></td>
            <td>Returns the absolute highest numerical value in the range.</td>
            <td>Peak transaction revenue, record sales rep quota, highest price paid.</td>
          </tr>
          <tr>
            <td><code>MIN</code></td>
            <td><code>=MIN(range)</code></td>
            <td>Returns the absolute lowest numerical value in the range.</td>
            <td>Lowest supplier cost, minimum acceptable yield, floor price.</td>
          </tr>
          <tr>
            <td><code>LARGE</code></td>
            <td><code>=LARGE(array, k)</code></td>
            <td>Returns the <em>k-th</em> largest value (e.g. <code>k=2</code> returns runner-up).</td>
            <td>Top 3 bonus tiers, 2nd highest bidder in sealed auction modeling.</td>
          </tr>
          <tr>
            <td><code>SMALL</code></td>
            <td><code>=SMALL(array, k)</code></td>
            <td>Returns the <em>k-th</em> smallest value from the array.</td>
            <td>Second-lowest vendor freight quote, lowest delinquency rate.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="keynote-box keynote-amber">
      <strong>⚠️ Critical Anti-Pattern: Destructive Sorting for Ranking</strong><br>
      Junior analysts often physically sort a production dataset just to locate the 2nd and 3rd highest values. Physical sorting destroys the original chronological or transaction order of the workbook and breaks external lookup links! Always use <code>=LARGE(range, 2)</code> and <code>=LARGE(range, 3)</code> to perform non-destructive rank extraction.
    </div>

    <div class="keynote-box keynote-indigo">
      <strong>💼 Senior Financial Analyst Interview Insight:</strong><br>
      Candidates are often asked: <em>"How do you sum the top 3 transactions without adding helper columns?"</em>. Elite answer: <code>=SUM(LARGE(Sales_Data!G2:G16, {1, 2, 3}))</code>. The inline array constant <code>{1, 2, 3}</code> extracts the top three values, and <code>SUM</code> aggregates them in a single cell formula!
    </div>
  </div>
</section>

<section class="slide-section" id="sec07">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingAutoFillSeries">
    <span class="heading-num-box">07</span>
    <span class="heading-title-box">
      <span class="heading-icon">⚡</span>
      <span class="heading-title-text">AutoFill, Flash Fill & Coordinate Shifting</span>
      <button class="audio-play-btn" data-track-idx="6" title="Play Narration">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p>Excel provides high-speed vector tools to propagate calculations across thousands of rows in seconds. Understanding the distinction between mathematical AutoFill and pattern-recognition Flash Fill prevents critical calculation errors.</p>

    <div class="table-responsive">
      <table class="reference-table">
        <thead>
          <tr>
            <th>Feature / Shortcut</th>
            <th>Trigger Mechanism</th>
            <th>Engine Behavior</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Double-Click Fill Handle</strong></td>
            <td>Hover bottom-right cell corner until cursor turns to black cross (<code>+</code>), double-click.</td>
            <td>Scans the adjacent column to the left and copies formula down to the exact last contiguous data row.</td>
          </tr>
          <tr>
            <td><strong>Fill Down (<kbd>Ctrl + D</kbd>)</strong></td>
            <td>Select target cell and row below, press <kbd>Ctrl + D</kbd>.</td>
            <td>Instantly copies the formula and formatting of the upper cell into all selected cells below.</td>
          </tr>
          <tr>
            <td><strong>Fill Right (<kbd>Ctrl + R</kbd>)</strong></td>
            <td>Select target cell and column to the right, press <kbd>Ctrl + R</kbd>.</td>
            <td>Instantly copies the leftmost cell formula horizontally across all selected columns.</td>
          </tr>
          <tr>
            <td><strong>Flash Fill (<kbd>Ctrl + E</kbd>)</strong></td>
            <td>Type 1 or 2 desired output patterns in adjacent column and press <kbd>Ctrl + E</kbd>.</td>
            <td>Uses machine-learning pattern recognition to extract, combine, or split string data automatically.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="keynote-box keynote-amber">
      <strong>⚠️ Critical Anti-Pattern: Merged Cells Breaking AutoFill</strong><br>
      Never merge cells in raw data tables! Merging cells (e.g. <code>B2:C2</code>) corrupts coordinate addressing, prevents the Fill Handle from double-clicking downwards, and causes copy-paste errors across Excel. For visual centering without merging, use <strong>Format Cells &rarr; Alignment &rarr; Horizontal &rarr; Center Across Selection</strong>.
    </div>

    <div class="keynote-box keynote-indigo">
      <strong>💼 Silicon Valley Tech Screen Insight: AutoFill vs. Flash Fill</strong><br>
      Interviewers test candidates on when to use Flash Fill vs formulas. Flash Fill generates static text constants—it does not update if source data changes. In production financial pipelines, always use dynamic formulas (e.g. <code>=LEFT()</code>, <code>=TRIM()</code>, <code>=TEXTSPLIT()</code>) so that incoming transactions recalculate automatically.
    </div>
  </div>
</section>

<section class="slide-section" id="sec08">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingCriteriaAnalysis">
    <span class="heading-num-box">08</span>
    <span class="heading-title-box">
      <span class="heading-icon">🎯</span>
      <span class="heading-title-text">Criteria Analysis (SUMIF, COUNTIF, AVERAGEIF)</span>
      <button class="audio-play-btn" data-track-idx="7" title="Play Narration">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p>Conditional functions allow financial analysts to calculate targeted summary metrics for specific business segments without altering or filtering raw transactional tables. Mastering condition syntax is essential for automated reporting.</p>

    <div class="keynote-box keynote-emerald">
      <strong>⚡ Syntax Architecture: Single-Condition Family</strong><br>
      Notice the argument order for single-condition functions: the evaluation range comes first, followed by the criterion, and the optional summation range comes last:<br>
      <code>=SUMIF(evaluation_range, criterion, [sum_range])</code><br>
      <code>=COUNTIF(evaluation_range, criterion)</code><br>
      <code>=AVERAGEIF(evaluation_range, criterion, [average_range])</code>
    </div>

    <div class="table-responsive">
      <table class="reference-table">
        <thead>
          <tr>
            <th>Condition Type</th>
            <th>Formula Example</th>
            <th>Internal Parsing Mechanism</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Exact Text Match</strong></td>
            <td><code>=SUMIF(B2:B16, "North", G2:G16)</code></td>
            <td>Evaluates column B; if text exactly matches "North", sums corresponding cell in column G.</td>
          </tr>
          <tr>
            <td><strong>Numeric Comparison</strong></td>
            <td><code>=COUNTIF(E2:E16, "&gt;=40")</code></td>
            <td>Operator must be enclosed in double quotes; counts units greater than or equal to 40.</td>
          </tr>
          <tr>
            <td><strong>Dynamic Cell Reference</strong></td>
            <td><code>=SUMIF(B2:B16, "&gt;=" &amp; O2, G2:G16)</code></td>
            <td>Concatenates operator string with parameter cell coordinate <code>O2</code> using ampersand (<code>&amp;</code>).</td>
          </tr>
          <tr>
            <td><strong>Wildcard Matching</strong></td>
            <td><code>=COUNTIF(D2:D16, "*Office*")</code></td>
            <td>Asterisk (<code>*</code>) matches any sequence of characters containing the word "Office".</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="keynote-box keynote-amber">
      <strong>⚠️ Critical Anti-Pattern: Quoting Cell References Inside Criteria Strings</strong><br>
      Writing <code>=COUNTIF(E2:E16, "&gt;=O2")</code> checks whether cells contain the literal string <code>"O2"</code> rather than comparing against the numeric value stored in cell <code>O2</code>! The correct syntax is <code>=COUNTIF(E2:E16, "&gt;=" &amp; O2)</code>. The comparison operator is quoted, but the cell coordinate is dynamically appended outside quotes.
    </div>

    <div class="keynote-box keynote-indigo">
      <strong>💼 Management Consulting Case Study Insight:</strong><br>
      When building automated management decks for executives, analysts reference parameter cells on an assumptions tab rather than hardcoding criteria strings: <code>=SUMIF(Sales_Data!B2:B16, Assumptions!$A$2, Sales_Data!G2:G16)</code>. This allows the executive to change region selections from a dropdown without breaking formula logic.
    </div>
  </div>
</section>

<section class="slide-section" id="sec09">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingMultiCriteria">
    <span class="heading-num-box">09</span>
    <span class="heading-title-box">
      <span class="heading-icon">🛡️</span>
      <span class="heading-title-text">Multi-Condition Aggregations (SUMIFS, COUNTIFS, AVERAGEIFS)</span>
      <button class="audio-play-btn" data-track-idx="8" title="Play Narration">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p>Real-world commercial analytics rarely hinges on a single condition. Evaluating regional segment revenue requires satisfying multiple dimensions simultaneously (e.g. Region = "North" AND Category = "Electronics" AND Units &ge; 20). The multi-condition <code>IFS</code> family provides scalable multidimensional aggregation.</p>

    <div class="keynote-box keynote-emerald">
      <strong>⚡ Critical Syntax Reversal: SUMIF vs. SUMIFS Argument Order</strong><br>
      In legacy <code>SUMIF</code>, the sum range is the <em>LAST</em> argument. In modern <code>SUMIFS</code>, the <strong>sum_range is strictly the FIRST argument</strong>, followed by pairs of <code>(criteria_range1, criteria1, criteria_range2, criteria2, ...)</code>:<br>
      <code>=SUMIFS(sum_range, criteria_range1, criteria1, criteria_range2, criteria2, ...)</code>
    </div>

    <div class="architecture-grid">
      <div class="arch-box">
        <h4>Logical AND Conjunction</h4>
        <p>All condition pairs in <code>SUMIFS</code> must evaluate to <code>TRUE</code> for a row to be included in the sum. If a row satisfies 3 out of 4 conditions, it is completely excluded.</p>
      </div>
      <div class="arch-box">
        <h4>Equal Dimension Requirement</h4>
        <p>All criteria ranges must possess the exact same row count and column dimension as the sum range (e.g. <code>G2:G16</code> with <code>B2:B16</code>). Mismatched heights trigger immediate <code>#VALUE!</code> errors.</p>
      </div>
      <div class="arch-box">
        <h4>Scalable Pairs (Up to 127)</h4>
        <p>Modern Excel supports up to 127 condition pairs, enabling granular multi-condition filtering across product line, fiscal quarter, sales rep, and currency code.</p>
      </div>
    </div>

    <div class="keynote-box keynote-amber">
      <strong>⚠️ Critical Anti-Pattern: Dimension Mismatches</strong><br>
      A frequent source of broken models is mismatched range boundaries: writing <code>=SUMIFS(G2:G16, B2:B15, "North")</code> (where row 16 is missing from the criteria range). Excel immediately returns a <code>#VALUE!</code> error. Always verify that start and end row indices match across all arguments!
    </div>

    <div class="keynote-box keynote-indigo">
      <strong>💼 Wall Street Modeling Standard: Why Professionals Standardize on SUMIFS</strong><br>
      Top financial modelers never use single-condition <code>SUMIF</code>, even when testing only one criterion! They write <code>=SUMIFS(G2:G16, B2:B16, "North")</code> for every condition. Standardizing on <code>SUMIFS</code> eliminates argument-order confusion and allows instant addition of secondary criteria without restructuring the formula.
    </div>
  </div>
</section>

<section class="slide-section" id="sec10">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingLookupsAndStrings">
    <span class="heading-num-box">10</span>
    <span class="heading-title-box">
      <span class="heading-icon">💼</span>
      <span class="heading-title-text">Modern Lookups & Data Hygiene (XLOOKUP, INDEX/MATCH, TRIM)</span>
      <button class="audio-play-btn" data-track-idx="9" title="Play Narration">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p>Modern enterprise data pipelines require joining disparate relational tables and sanitizing messy ERP inputs. Combining modern lookup engines with data cleaning functions ensures flawless model integrity.</p>

    <div class="table-responsive">
      <table class="reference-table">
        <thead>
          <tr>
            <th>Technology</th>
            <th>Formula Signature</th>
            <th>Architectural Advantage over Legacy VLOOKUP</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>XLOOKUP (Gold Standard)</strong></td>
            <td><code>=XLOOKUP(val, lookup_arr, return_arr, [if_not_found])</code></td>
            <td>Defaults to exact match; looks left or right; immune to column insertions; has built-in error trapping.</td>
          </tr>
          <tr>
            <td><strong>INDEX + MATCH (Universal Power Duo)</strong></td>
            <td><code>=INDEX(return_col, MATCH(val, lookup_col, 0))</code></td>
            <td>Decoupled two-dimensional coordinate lookup; backward-compatible with every spreadsheet version in existence.</td>
          </tr>
          <tr>
            <td><strong>String Sanitization (TRIM + PROPER)</strong></td>
            <td><code>=PROPER(TRIM(text_cell))</code></td>
            <td>Strips invisible leading/trailing whitespace and normalizes irregular capitalization into professional Title Case.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="keynote-box keynote-amber">
      <strong>⚠️ Critical Anti-Pattern: Invisible Trailing Whitespace Breaking Lookups</strong><br>
      When records are exported from enterprise ERPs (SAP, Oracle, Salesforce), customer names frequently contain invisible trailing spaces (e.g. <code>"Sarah Davis "</code>). An exact lookup searching for <code>"Sarah Davis"</code> will fail with a <code>#N/A</code> error! Wrapping text in <code>=TRIM(text)</code> strips all extraneous whitespace and guarantees exact matching.
    </div>

    <div class="keynote-box keynote-indigo">
      <strong>💼 Senior Architect Takeaway: The Modern Spreadsheet Stack</strong><br>
      In modern financial analytics, the combination of <strong>XLOOKUP</strong> for table joins, <strong>SUMIFS</strong> for multi-condition aggregation, and <strong>structured cell references</strong> forms the indestructible architectural core of corporate modeling. Master these fundamentals in Day 01, and you will build institutional-grade analytics throughout the remaining 11 days.
    </div>
  </div>
</section>
`
    }
  ],

  // ═══════════════ CANONICAL SEED WORKBOOK (SECTION 5) ═══════════════
  initialWorkbook: {
    "Sales_Data": [
      ["Order ID", "Region", "Representative", "Product Category", "Units", "Unit Price", "Total Revenue", "Net Revenue", "Commission", "Performance Tier", "Tax Amount", "Status"],
      ["ORD-1001", "North", "Sarah Davis",   "Electronics",     25, 450,  "=E2*F2", "", "", "", "", "Completed"],
      ["ORD-1002", "South", "Michael Chen",  "Office Supplies", 85, 45,   "=E3*F3", "", "", "", "", "Shipped"],
      ["ORD-1003", "East",  "Priya Nair",    "Furniture",       12, 320,  "=E4*F4", "", "", "", "", "Pending"],
      ["ORD-1004", "West",  "Carlos Mendez", "Electronics",     18, 380,  "=E5*F5", "", "", "", "", "Completed"],
      ["ORD-1005", "North", "Emily Brooks",  "Furniture",       40, 210,  "=E6*F6", "", "", "", "", "Shipped"],
      ["ORD-1006", "South", "Michael Chen",  "Electronics",     30, 420,  "=E7*F7", "", "", "", "", "Completed"],
      ["ORD-1007", "East",  "David Kim",     "Office Supplies", 70, 55,   "=E8*F8", "", "", "", "", "Pending"],
      ["ORD-1008", "West",  "Carlos Mendez", "Furniture",       10, 450,  "=E9*F9", "", "", "", "", "Shipped"],
      ["ORD-1009", "North", "Sarah Davis",   "Office Supplies", 60, 48,   "=E10*F10", "", "", "", "", "Completed"],
      ["ORD-1010", "East",  "Priya Nair",    "Electronics",     22, 399,  "=E11*F11", "", "", "", "", "Completed"],
      ["ORD-1011", "South", "Michael Chen",  "Furniture",       15, 275,  "=E12*F12", "", "", "", "", "Pending"],
      ["ORD-1012", "West",  "Carlos Mendez", "Office Supplies", 85, 60,   "=E13*F13", "", "", "", "", "Shipped"],
      ["ORD-1013", "North", "Emily Brooks",  "Electronics",     14, 350,  "=E14*F14", "", "", "", "", "Completed"],
      ["ORD-1014", "East",  "David Kim",     "Furniture",       33, 300,  "=E15*F15", "", "", "", "", "Shipped"],
      ["ORD-1015", "North", "Emily Brooks",  "Office Supplies", 50, 52,   "=E16*F16", "", "", "", "", "Pending"]
    ],
    "Employees": [
      ["Rep Name", "Rep ID", "Region", "Department", "Base Salary", "Bonus Rating"],
      ["Sarah Davis",   "E-101", "North", "Enterprise Sales", 85000, 4.8],
      ["Michael Chen",  "E-102", "South", "Commercial Sales", 72000, 4.2],
      ["Priya Nair",    "E-103", "East",  "Enterprise Sales", 89000, 4.9],
      ["Carlos Mendez", "E-104", "West",  "Mid-Market Sales", 68000, 3.9],
      ["Emily Brooks",  "E-105", "North", "Commercial Sales", 71000, 4.1],
      ["David Kim",     "E-106", "East",  "Mid-Market Sales", 66000, 4.0]
    ],
    "Summary_Practice": [
      ["KPI Summary Metric", "Your Formula Answer"],
      ["Total Gross Revenue", ""],
      ["Average Order Value", ""],
      ["Highest Single Order", ""],
      ["Lowest Single Order", ""],
      ["Total Order Count", ""],
      ["North Region Revenue", ""],
      ["Orders with Units >= 40", ""],
      ["Average Electronics Order", ""],
      ["North + Electronics Revenue", ""],
      ["East Orders with Units >= 30", ""],
      ["Representative for ORD-1005", ""],
      ["Salary of Sarah Davis", ""],
      ["Clean Name from Q1", ""],
      ["Year of First Date", ""]
    ],
    "Sort_Practice": [
      ["Order ID", "Region", "Representative", "Product Category", "Units", "Unit Price", "Total Revenue", "Net Revenue", "Commission", "Performance Tier", "Tax Amount", "Status"],
      ["ORD-1001", "North", "Sarah Davis",   "Electronics",     25, 450,  11250, 9225, 1125, "High",   2025, "Completed"],
      ["ORD-1002", "South", "Michael Chen",  "Office Supplies", 85, 45,   3825,  3136.5, 191.25, "Low", 688.5, "Shipped"],
      ["ORD-1003", "East",  "Priya Nair",    "Furniture",       12, 320,  3840,  3148.8, 192, "Low",    691.2, "Pending"],
      ["ORD-1004", "West",  "Carlos Mendez", "Electronics",     18, 380,  6840,  5608.8, 684, "Medium", 1231.2, "Completed"],
      ["ORD-1005", "North", "Emily Brooks",  "Furniture",       40, 210,  8400,  6888, 840, "Medium",   1512, "Shipped"],
      ["ORD-1006", "South", "Michael Chen",  "Electronics",     30, 420,  12600, 10332, 1260, "High",  2268, "Completed"],
      ["ORD-1007", "East",  "David Kim",     "Office Supplies", 70, 55,   3850,  3157, 192.5, "Low",    693, "Pending"],
      ["ORD-1008", "West",  "Carlos Mendez", "Furniture",       10, 450,  4500,  3690, 225, "Low",     810, "Shipped"],
      ["ORD-1009", "North", "Sarah Davis",   "Office Supplies", 60, 48,   2880,  2361.6, 144, "Low",    518.4, "Completed"],
      ["ORD-1010", "East",  "Priya Nair",    "Electronics",     22, 399,  8778,  7197.96, 877.8, "Medium", 1580.04, "Completed"],
      ["ORD-1011", "South", "Michael Chen",  "Furniture",       15, 275,  4125,  3382.5, 206.25, "Low", 742.5, "Pending"],
      ["ORD-1012", "West",  "Carlos Mendez", "Office Supplies", 85, 60,   5100,  4182, 510, "Medium",   918, "Shipped"],
      ["ORD-1013", "North", "Emily Brooks",  "Electronics",     14, 350,  4900,  4018, 245, "Low",     882, "Completed"],
      ["ORD-1014", "East",  "David Kim",     "Furniture",       33, 300,  9900,  8118, 990, "Medium",   1782, "Shipped"],
      ["ORD-1015", "North", "Emily Brooks",  "Office Supplies", 50, 52,   2600,  2132, 130, "Low",     468, "Pending"]
    ]
  },

  // Parameters, text helpers, and date serials populated into Sales_Data
  initialAuxiliary: {
    "Sales_Data": {
      "N1": "Tax Rate",        "O1": 0.18,
      "N2": "Comm Threshold",  "O2": 5000,
      "N3": "High Comm Rate",  "O3": 0.10,
      "N4": "Low Comm Rate",   "O4": 0.05,
      "Q1": "  sarah DAVIS ",
      "Q2": "MICHAEL CHEN",
      "Q3": "priya nair",
      "Q4": "ORD-9901-ELECTRONICS-NORTH",
      "Q5": "data_analyst_senior",
      "R1": 46037, // 2026-01-15
      "R2": 46203, // 2026-06-30
      "R3": 46329  // 2026-11-03
    }
  },

  // ═══════════════ 20 CHALLENGES (SECTION 8.2 & QUESTION SPOTLIGHT) ═══════════════
  challenges: [
  {
    "id": "c01",
    "number": 1,
    "title": "Total Gross Revenue (SUM)",
    "prompt": "To determine total gross revenue across all hardware orders, navigate to sheet <code>Summary_Practice</code> cell <strong>B2</strong> and write a formula using <code>=SUM()</code> referencing the revenue column in <code>Sales_Data!G2:G16</code>.",
    "targetSheet": "Summary_Practice",
    "targetCell": "B2",
    "solution": "=SUM(Sales_Data!G2:G16)",
    "expectedFormulaPrefix": "=SUM",
    "expectedValue": 93388,
    "tolerance": 0.1,
    "difficulty": "easy",
    "bloom": "apply",
    "xp": 75,
    "marks": 1,
    "hint": "Use =SUM(Sales_Data!G2:G16)",
    "hints": [
      "Click into cell Summary_Practice!B2.",
      "Start with the equal sign: =SUM(",
      "Reference the full revenue vector: Sales_Data!G2:G16 and close parentheses."
    ],
    "check": {
      "expected": 93388,
      "tolerance": 0.1,
      "mustUseAnyOf": [
        [
          "SUM"
        ]
      ],
      "mustReference": [
        "Sales_Data!G2:G16"
      ],
      "mustNotBeLiteral": true
    },
    "commonMistakes": [
      {
        "pattern": "^=93388$",
        "message": "Do not enter the hardcoded total 93388 directly. Write a dynamic formula: =SUM(Sales_Data!G2:G16)."
      },
      {
        "pattern": "^=SUM\\(G2:G16\\)$",
        "message": "You are working on the Summary_Practice sheet. Include the sheet prefix: Sales_Data!G2:G16."
      }
    ],
    "dataScope": {
      "cols": [
        "G"
      ],
      "params": [],
      "previewRows": 15,
      "summary": "Sums the Total Revenue column across all 15 transaction rows."
    }
  },
  {
    "id": "c02",
    "number": 2,
    "title": "Average Order Value (AVERAGE)",
    "prompt": "To establish the baseline average order value across hardware sales, navigate to sheet <code>Summary_Practice</code> cell <strong>B3</strong> and write a formula using <code>=AVERAGE()</code> referencing the revenue column in <code>Sales_Data!G2:G16</code>.",
    "targetSheet": "Summary_Practice",
    "targetCell": "B3",
    "solution": "=AVERAGE(Sales_Data!G2:G16)",
    "expectedFormulaPrefix": "=AVERAGE",
    "expectedValue": 6225.866666666667,
    "tolerance": 0.1,
    "difficulty": "easy",
    "bloom": "apply",
    "xp": 75,
    "marks": 1,
    "hint": "Use =AVERAGE(Sales_Data!G2:G16)",
    "hints": [
      "Select cell B3 on the Summary_Practice sheet.",
      "Write =AVERAGE(Sales_Data!G2:G16) to find the arithmetic mean."
    ],
    "check": {
      "expected": 6225.866666666667,
      "tolerance": 0.1,
      "mustUseAnyOf": [
        [
          "AVERAGE"
        ]
      ],
      "mustReference": [
        "Sales_Data!G2:G16"
      ],
      "mustNotBeLiteral": true
    },
    "commonMistakes": [
      {
        "pattern": "^=\\d+",
        "message": "Never hardcode constant values in financial models. Use =AVERAGE(Sales_Data!G2:G16)."
      }
    ],
    "dataScope": {
      "cols": [
        "G"
      ],
      "params": [],
      "previewRows": 15,
      "summary": "Calculates the baseline Mean Order Value across hardware transactions."
    }
  },
  {
    "id": "c03",
    "number": 3,
    "title": "Highest Single Transaction (MAX)",
    "prompt": "To identify the peak single enterprise deal size across all transactions, navigate to sheet <code>Summary_Practice</code> cell <strong>B4</strong> and write a formula using <code>=MAX()</code> referencing the revenue column in <code>Sales_Data!G2:G16</code>.",
    "targetSheet": "Summary_Practice",
    "targetCell": "B4",
    "solution": "=MAX(Sales_Data!G2:G16)",
    "expectedFormulaPrefix": "=MAX",
    "expectedValue": 12600,
    "tolerance": 0.1,
    "difficulty": "easy",
    "bloom": "apply",
    "xp": 75,
    "marks": 1,
    "hint": "Use =MAX(Sales_Data!G2:G16)",
    "hints": [
      "Find the maximum value in column G using =MAX(Sales_Data!G2:G16)."
    ],
    "check": {
      "expected": 12600,
      "tolerance": 0.1,
      "mustUseAnyOf": [
        [
          "MAX"
        ]
      ],
      "mustReference": [
        "Sales_Data!G2:G16"
      ],
      "mustNotBeLiteral": true
    },
    "commonMistakes": [
      {
        "pattern": "^=12600$",
        "message": "Hardcoding literal values is prohibited. Write a dynamic =MAX() formula."
      }
    ],
    "dataScope": {
      "cols": [
        "G"
      ],
      "params": [],
      "previewRows": 15,
      "summary": "Extracts the peak enterprise deal size from the order log."
    }
  },
  {
    "id": "c04",
    "number": 4,
    "title": "Lowest Single Transaction (MIN)",
    "prompt": "To detect the minimum floor transaction value recorded in the sales log, navigate to sheet <code>Summary_Practice</code> cell <strong>B5</strong> and write a formula using <code>=MIN()</code> referencing the revenue column in <code>Sales_Data!G2:G16</code>.",
    "targetSheet": "Summary_Practice",
    "targetCell": "B5",
    "solution": "=MIN(Sales_Data!G2:G16)",
    "expectedFormulaPrefix": "=MIN",
    "expectedValue": 2600,
    "tolerance": 0.1,
    "difficulty": "easy",
    "bloom": "apply",
    "xp": 75,
    "marks": 1,
    "hint": "Use =MIN(Sales_Data!G2:G16)",
    "hints": [
      "Find the minimum value in column G using =MIN(Sales_Data!G2:G16)."
    ],
    "check": {
      "expected": 2600,
      "tolerance": 0.1,
      "mustUseAnyOf": [
        [
          "MIN"
        ]
      ],
      "mustReference": [
        "Sales_Data!G2:G16"
      ],
      "mustNotBeLiteral": true
    },
    "commonMistakes": [
      {
        "pattern": "^=2600$",
        "message": "Use =MIN(Sales_Data!G2:G16) rather than typing 2600."
      }
    ],
    "dataScope": {
      "cols": [
        "G"
      ],
      "params": [],
      "previewRows": 15,
      "summary": "Extracts the floor transaction value from the order log."
    }
  },
  {
    "id": "c05",
    "number": 5,
    "title": "Total Numerical Transactions (COUNT)",
    "prompt": "To audit total numeric transaction volume and verify data completeness, navigate to sheet <code>Summary_Practice</code> cell <strong>B6</strong> and write a formula using <code>=COUNT()</code> referencing the order units column in <code>Sales_Data!E2:E16</code>.",
    "targetSheet": "Summary_Practice",
    "targetCell": "B6",
    "solution": "=COUNT(Sales_Data!E2:E16)",
    "expectedFormulaPrefix": "=COUNT",
    "expectedValue": 15,
    "tolerance": 0.1,
    "difficulty": "easy",
    "bloom": "apply",
    "xp": 75,
    "marks": 1,
    "hint": "Use =COUNT(Sales_Data!E2:E16)",
    "hints": [
      "Use COUNT (which tallies numeric cells) on Sales_Data!E2:E16."
    ],
    "check": {
      "expected": 15,
      "tolerance": 0.1,
      "mustUseAnyOf": [
        [
          "COUNT"
        ]
      ],
      "mustReference": [
        "Sales_Data!E2:E16"
      ],
      "mustNotBeLiteral": true
    },
    "commonMistakes": [
      {
        "pattern": "^=COUNTA",
        "message": "Use COUNT for numerical entries. Write =COUNT(Sales_Data!E2:E16)."
      }
    ],
    "dataScope": {
      "cols": [
        "E"
      ],
      "params": [],
      "previewRows": 15,
      "summary": "Validates transaction record count by enumerating numerical Unit quantities."
    }
  },
  {
    "id": "c06",
    "number": 6,
    "title": "Commission Calculation with Fixed Tax (ROUND & Absolute Ref)",
    "prompt": "To compute the statutory tax fee on row 2 revenue with standard currency precision, navigate to sheet <code>Sales_Data</code> cell <strong>K2</strong> and write a formula using <code>=ROUND()</code> multiplying gross revenue in cell <code>G2</code> by the absolute tax parameter in <code>$O$1</code> to 2 decimal places: <code>=ROUND(G2*$O$1, 2)</code>.",
    "targetSheet": "Sales_Data",
    "targetCell": "K2",
    "solution": "=ROUND(G2*$O$1, 2)",
    "expectedFormulaPrefix": "=ROUND",
    "expectedValue": 2025,
    "tolerance": 0.1,
    "difficulty": "easy",
    "bloom": "apply",
    "xp": 75,
    "marks": 1,
    "hint": "Use =ROUND(G2*$O$1, 2)",
    "hints": [
      "Multiply G2 by absolute cell $O$1 and wrap in ROUND(..., 2)."
    ],
    "check": {
      "expected": 2025,
      "tolerance": 0.1,
      "mustUseAnyOf": [
        [
          "ROUND"
        ]
      ],
      "mustReference": [
        "G2",
        "$O$1"
      ],
      "mustNotBeLiteral": true
    },
    "commonMistakes": [
      {
        "pattern": "O1",
        "message": "Remember to lock cell O1 with dollar signs: $O$1."
      }
    ],
    "dataScope": {
      "cols": [
        "G",
        "O"
      ],
      "params": [
        "$O$1"
      ],
      "previewRows": 15,
      "summary": "Computes financial fee applying absolute cell reference parameter lock."
    }
  },
  {
    "id": "c07",
    "number": 7,
    "title": "Net Revenue After Tax Parameter (Arithmetic Precedence)",
    "prompt": "To calculate net revenue after statutory tax deductions enforcing arithmetic precedence, navigate to sheet <code>Sales_Data</code> cell <strong>H2</strong> and write a formula multiplying gross revenue in <code>G2</code> by the complement of absolute tax parameter <code>$O$1</code> using <code>=G2*(1-$O$1)</code>.",
    "targetSheet": "Sales_Data",
    "targetCell": "H2",
    "solution": "=G2*(1-$O$1)",
    "expectedFormulaPrefix": "=G2*",
    "expectedValue": 9225,
    "tolerance": 0.1,
    "difficulty": "medium",
    "bloom": "apply",
    "xp": 75,
    "marks": 1,
    "hint": "Use =G2*(1-$O$1)",
    "hints": [
      "Use parentheses around 1-$O$1 to enforce correct mathematical order of operations."
    ],
    "check": {
      "expected": 9225,
      "tolerance": 0.1,
      "mustReference": [
        "G2",
        "$O$1"
      ],
      "mustNotBeLiteral": true
    },
    "commonMistakes": [
      {
        "pattern": "G2-G2\\*O1",
        "message": "Use the clean factoring =G2*(1-$O$1) with absolute lock $O$1."
      }
    ],
    "dataScope": {
      "cols": [
        "G",
        "O"
      ],
      "params": [
        "$O$1"
      ],
      "previewRows": 15,
      "summary": "Applies parenthetical operator precedence to compute net after-tax margin."
    }
  },
  {
    "id": "c08",
    "number": 8,
    "title": "Tiered Commission Threshold (IF)",
    "prompt": "To evaluate sales representative incentive compensation based on revenue tiering, navigate to sheet <code>Sales_Data</code> cell <strong>I2</strong> and write a conditional formula using <code>=IF()</code>: if revenue in <code>G2</code> exceeds threshold <code>$O$2</code>, compute <code>G2*$O$3</code>, else compute <code>G2*$O$4</code> via <code>=IF(G2>$O$2, G2*$O$3, G2*$O$4)</code>.",
    "targetSheet": "Sales_Data",
    "targetCell": "I2",
    "solution": "=IF(G2>$O$2, G2*$O$3, G2*$O$4)",
    "expectedFormulaPrefix": "=IF",
    "expectedValue": 1125,
    "tolerance": 0.1,
    "difficulty": "medium",
    "bloom": "analyze",
    "xp": 75,
    "marks": 1,
    "hint": "Use =IF(G2>$O$2, G2*$O$3, G2*$O$4)",
    "hints": [
      "Compare G2 to $O$2. If true multiply by $O$3, else by $O$4."
    ],
    "check": {
      "expected": 1125,
      "tolerance": 0.1,
      "mustUseAnyOf": [
        [
          "IF"
        ]
      ],
      "mustReference": [
        "G2",
        "$O$2",
        "$O$3",
        "$O$4"
      ],
      "mustNotBeLiteral": true
    },
    "commonMistakes": [
      {
        "pattern": "O2",
        "message": "Lock all threshold parameters using absolute references: $O$2, $O$3, $O$4."
      }
    ],
    "dataScope": {
      "cols": [
        "G",
        "O"
      ],
      "params": [
        "$O$2",
        "$O$3",
        "$O$4"
      ],
      "previewRows": 15,
      "summary": "Implements binary conditional compensation threshold logic."
    }
  },
  {
    "id": "c09",
    "number": 9,
    "title": "Multi-Bracket Deal Classification (IFS)",
    "prompt": "To segment commercial orders into executive strategic tiers, navigate to sheet <code>Sales_Data</code> cell <strong>J2</strong> and write a multi-branch formula using <code>=IFS()</code> evaluating revenue in <code>G2</code>: if <code>G2>=10000</code> return <code>\"High\"</code>, if <code>G2>=5000</code> return <code>\"Medium\"</code>, otherwise with <code>TRUE</code> return <code>\"Low\"</code> via <code>=IFS(G2>=10000, \"High\", G2>=5000, \"Medium\", TRUE, \"Low\")</code>.",
    "targetSheet": "Sales_Data",
    "targetCell": "J2",
    "solution": "=IFS(G2>=10000, \"High\", G2>=5000, \"Medium\", TRUE, \"Low\")",
    "expectedFormulaPrefix": "=IFS",
    "expectedValue": "High",
    "tolerance": 0,
    "difficulty": "medium",
    "bloom": "analyze",
    "xp": 75,
    "marks": 1,
    "hint": "Use =IFS(G2>=10000, \"High\", G2>=5000, \"Medium\", TRUE, \"Low\")",
    "hints": [
      "Use IFS with descending order: 10000 -> 'High', 5000 -> 'Medium', TRUE -> 'Low'."
    ],
    "check": {
      "expected": "High",
      "tolerance": 0,
      "mustUseAnyOf": [
        [
          "IFS"
        ]
      ],
      "mustReference": [
        "G2"
      ],
      "mustNotBeLiteral": true
    },
    "commonMistakes": [
      {
        "pattern": "G2>=5000.*G2>=10000",
        "message": "Order matters in IFS! Always evaluate the highest boundary (>=10000) first."
      }
    ],
    "dataScope": {
      "cols": [
        "G"
      ],
      "params": [],
      "previewRows": 15,
      "summary": "Multi-tier segmentation of commercial deals based on revenue magnitude."
    }
  },
  {
    "id": "c10",
    "number": 10,
    "title": "Regional Sales Aggregation (SUMIF)",
    "prompt": "To isolate total hardware revenue generated exclusively by the North operating territory, navigate to sheet <code>Summary_Practice</code> cell <strong>B7</strong> and write a formula using <code>=SUMIF()</code> filtering region range <code>Sales_Data!B2:B16</code> for criterion <code>\"North\"</code> and summing revenue in <code>Sales_Data!G2:G16</code> via <code>=SUMIF(Sales_Data!B2:B16, \"North\", Sales_Data!G2:G16)</code>.",
    "targetSheet": "Summary_Practice",
    "targetCell": "B7",
    "solution": "=SUMIF(Sales_Data!B2:B16, \"North\", Sales_Data!G2:G16)",
    "expectedFormulaPrefix": "=SUMIF",
    "expectedValue": 30030,
    "tolerance": 0.1,
    "difficulty": "medium",
    "bloom": "apply",
    "xp": 75,
    "marks": 1,
    "hint": "Use =SUMIF(Sales_Data!B2:B16, \"North\", Sales_Data!G2:G16)",
    "hints": [
      "SUMIF syntax is (range, criteria, [sum_range]): =SUMIF(Sales_Data!B2:B16, \"North\", Sales_Data!G2:G16)."
    ],
    "check": {
      "expected": 30030,
      "tolerance": 0.1,
      "mustUseAnyOf": [
        [
          "SUMIF"
        ]
      ],
      "mustReference": [
        "Sales_Data!B2:B16",
        "Sales_Data!G2:G16"
      ],
      "mustNotBeLiteral": true
    },
    "commonMistakes": [
      {
        "pattern": "^=SUMIFS",
        "message": "Use single-condition SUMIF for this challenge: =SUMIF(range, criteria, sum_range)."
      }
    ],
    "dataScope": {
      "cols": [
        "B",
        "G"
      ],
      "params": [
        "North"
      ],
      "previewRows": 15,
      "summary": "Aggregates revenue filtered strictly to the North operating territory."
    }
  },
  {
    "id": "c11",
    "number": 11,
    "title": "Volume Threshold Counting (COUNTIF)",
    "prompt": "To quantify high-volume wholesale transactions for inventory planning, navigate to sheet <code>Summary_Practice</code> cell <strong>B8</strong> and write a formula using <code>=COUNTIF()</code> evaluating units in <code>Sales_Data!E2:E16</code> for criteria <code>\">=40\"</code> via <code>=COUNTIF(Sales_Data!E2:E16, \">=40\")</code>.",
    "targetSheet": "Summary_Practice",
    "targetCell": "B8",
    "solution": "=COUNTIF(Sales_Data!E2:E16, \">=40\")",
    "expectedFormulaPrefix": "=COUNTIF",
    "expectedValue": 6,
    "tolerance": 0.1,
    "difficulty": "medium",
    "bloom": "apply",
    "xp": 75,
    "marks": 1,
    "hint": "Use =COUNTIF(Sales_Data!E2:E16, \">=40\")",
    "hints": [
      "In COUNTIF, comparison operators must be enclosed in double quotes: \">=40\"."
    ],
    "check": {
      "expected": 6,
      "tolerance": 0.1,
      "mustUseAnyOf": [
        [
          "COUNTIF"
        ]
      ],
      "mustReference": [
        "Sales_Data!E2:E16"
      ],
      "mustNotBeLiteral": true
    },
    "commonMistakes": [
      {
        "pattern": ">=40[^\"']",
        "message": "Remember to wrap your comparison criteria in double quotes: \">=40\"."
      }
    ],
    "dataScope": {
      "cols": [
        "E"
      ],
      "params": [
        ">=40"
      ],
      "previewRows": 15,
      "summary": "Filters order distribution to detect large wholesale volume events."
    }
  },
  {
    "id": "c12",
    "number": 12,
    "title": "Category Mean Performance (AVERAGEIF)",
    "prompt": "To determine the benchmark average transaction deal size for the Electronics category, navigate to sheet <code>Summary_Practice</code> cell <strong>B9</strong> and write a formula using <code>=AVERAGEIF()</code> filtering category range <code>Sales_Data!D2:D16</code> for criterion <code>\"Electronics\"</code> and averaging revenue in <code>Sales_Data!G2:G16</code> via <code>=AVERAGEIF(Sales_Data!D2:D16, \"Electronics\", Sales_Data!G2:G16)</code>.",
    "targetSheet": "Summary_Practice",
    "targetCell": "B9",
    "solution": "=AVERAGEIF(Sales_Data!D2:D16, \"Electronics\", Sales_Data!G2:G16)",
    "expectedFormulaPrefix": "=AVERAGEIF",
    "expectedValue": 8873.6,
    "tolerance": 0.1,
    "difficulty": "medium",
    "bloom": "apply",
    "xp": 75,
    "marks": 1,
    "hint": "Use =AVERAGEIF(Sales_Data!D2:D16, \"Electronics\", Sales_Data!G2:G16)",
    "hints": [
      "Syntax: =AVERAGEIF(range, criteria, average_range)."
    ],
    "check": {
      "expected": 8873.6,
      "tolerance": 0.1,
      "mustUseAnyOf": [
        [
          "AVERAGEIF"
        ]
      ],
      "mustReference": [
        "Sales_Data!D2:D16",
        "Sales_Data!G2:G16"
      ],
      "mustNotBeLiteral": true
    },
    "commonMistakes": [
      {
        "pattern": "AVERAGEIFS",
        "message": "Use single-condition AVERAGEIF: =AVERAGEIF(Sales_Data!D2:D16, \"Electronics\", Sales_Data!G2:G16)."
      }
    ],
    "dataScope": {
      "cols": [
        "D",
        "G"
      ],
      "params": [
        "Electronics"
      ],
      "previewRows": 15,
      "summary": "Computes category-specific deal size benchmarks."
    }
  },
  {
    "id": "c13",
    "number": 13,
    "title": "Multi-Condition Segment Revenue (SUMIFS)",
    "prompt": "To analyze focused market performance for executive reporting, navigate to sheet <code>Summary_Practice</code> cell <strong>B10</strong> and write a formula using <code>=SUMIFS()</code> to sum revenue in <code>Sales_Data!G2:G16</code> where region range <code>Sales_Data!B2:B16</code> equals <code>\"North\"</code> and category range <code>Sales_Data!D2:D16</code> equals <code>\"Electronics\"</code> via <code>=SUMIFS(Sales_Data!G2:G16, Sales_Data!B2:B16, \"North\", Sales_Data!D2:D16, \"Electronics\")</code>.",
    "targetSheet": "Summary_Practice",
    "targetCell": "B10",
    "solution": "=SUMIFS(Sales_Data!G2:G16, Sales_Data!B2:B16, \"North\", Sales_Data!D2:D16, \"Electronics\")",
    "expectedFormulaPrefix": "=SUMIFS",
    "expectedValue": 16150,
    "tolerance": 0.1,
    "difficulty": "medium",
    "bloom": "analyze",
    "xp": 75,
    "marks": 1,
    "hint": "Use =SUMIFS(Sales_Data!G2:G16, Sales_Data!B2:B16, \"North\", Sales_Data!D2:D16, \"Electronics\")",
    "hints": [
      "In SUMIFS, the sum_range comes FIRST: Sales_Data!G2:G16, followed by range1, crit1, range2, crit2."
    ],
    "check": {
      "expected": 16150,
      "tolerance": 0.1,
      "mustUseAnyOf": [
        [
          "SUMIFS"
        ]
      ],
      "mustReference": [
        "Sales_Data!G2:G16",
        "Sales_Data!B2:B16",
        "Sales_Data!D2:D16"
      ],
      "mustNotBeLiteral": true
    },
    "commonMistakes": [
      {
        "pattern": "^=SUMIFS\\(Sales_Data!B",
        "message": "In SUMIFS, sum_range (Column G) is always the FIRST argument, unlike SUMIF!"
      }
    ],
    "dataScope": {
      "cols": [
        "B",
        "D",
        "G"
      ],
      "params": [
        "North",
        "Electronics"
      ],
      "previewRows": 15,
      "summary": "Cross-sectional multi-condition aggregation across territory and product category."
    }
  },
  {
    "id": "c14",
    "number": 14,
    "title": "Multi-Condition Frequency Analysis (COUNTIFS)",
    "prompt": "To determine order frequency for bulk shipments in key territories, navigate to sheet <code>Summary_Practice</code> cell <strong>B11</strong> and write a formula using <code>=COUNTIFS()</code> filtering region range <code>Sales_Data!B2:B16</code> for <code>\"East\"</code> and units range <code>Sales_Data!E2:E16</code> for criteria <code>\">=30\"</code> via <code>=COUNTIFS(Sales_Data!B2:B16, \"East\", Sales_Data!E2:E16, \">=30\")</code>.",
    "targetSheet": "Summary_Practice",
    "targetCell": "B11",
    "solution": "=COUNTIFS(Sales_Data!B2:B16, \"East\", Sales_Data!E2:E16, \">=30\")",
    "expectedFormulaPrefix": "=COUNTIFS",
    "expectedValue": 2,
    "tolerance": 0.1,
    "difficulty": "medium",
    "bloom": "analyze",
    "xp": 75,
    "marks": 1,
    "hint": "Use =COUNTIFS(Sales_Data!B2:B16, \"East\", Sales_Data!E2:E16, \">=30\")",
    "hints": [
      "Syntax: =COUNTIFS(criteria_range1, criteria1, criteria_range2, criteria2)."
    ],
    "check": {
      "expected": 2,
      "tolerance": 0.1,
      "mustUseAnyOf": [
        [
          "COUNTIFS"
        ]
      ],
      "mustReference": [
        "Sales_Data!B2:B16",
        "Sales_Data!E2:E16"
      ],
      "mustNotBeLiteral": true
    },
    "commonMistakes": [
      {
        "pattern": ">=30[^\"']",
        "message": "Remember to put \">=30\" inside double quotes."
      }
    ],
    "dataScope": {
      "cols": [
        "B",
        "E"
      ],
      "params": [
        "East",
        ">=30"
      ],
      "previewRows": 15,
      "summary": "Filters order counts matching multiple simultaneous business constraints."
    }
  },
  {
    "id": "c15",
    "number": 15,
    "title": "Exact Transaction Match via Modern Lookup (XLOOKUP)",
    "prompt": "To verify sales representative accountability for an audited transaction, navigate to sheet <code>Summary_Practice</code> cell <strong>B12</strong> and write a formula using <code>=XLOOKUP()</code> searching for Order ID <code>\"ORD-1005\"</code> in lookup array <code>Sales_Data!A2:A16</code> and returning the representative name from return array <code>Sales_Data!C2:C16</code> via <code>=XLOOKUP(\"ORD-1005\", Sales_Data!A2:A16, Sales_Data!C2:C16)</code>.",
    "targetSheet": "Summary_Practice",
    "targetCell": "B12",
    "solution": "=XLOOKUP(\"ORD-1005\", Sales_Data!A2:A16, Sales_Data!C2:C16)",
    "expectedFormulaPrefix": "=XLOOKUP",
    "expectedValue": "Emily Brooks",
    "tolerance": 0,
    "difficulty": "hard",
    "bloom": "apply",
    "xp": 75,
    "marks": 1,
    "hint": "Use =XLOOKUP(\"ORD-1005\", Sales_Data!A2:A16, Sales_Data!C2:C16)",
    "hints": [
      "XLOOKUP takes (lookup_value, lookup_array, return_array): =XLOOKUP(\"ORD-1005\", Sales_Data!A2:A16, Sales_Data!C2:C16)."
    ],
    "check": {
      "expected": "Emily Brooks",
      "tolerance": 0,
      "mustUseAnyOf": [
        [
          "XLOOKUP"
        ]
      ],
      "mustReference": [
        "Sales_Data!A2:A16",
        "Sales_Data!C2:C16"
      ],
      "mustNotBeLiteral": true
    },
    "commonMistakes": [
      {
        "pattern": "VLOOKUP",
        "message": "Use modern XLOOKUP for resilient lookup without index column counting."
      }
    ],
    "dataScope": {
      "cols": [
        "A",
        "C"
      ],
      "params": [
        "ORD-1005"
      ],
      "previewRows": 15,
      "summary": "Retrieves associated rep name by unique order identifier using exact matching."
    }
  },
  {
    "id": "c16",
    "number": 16,
    "title": "Relational Coordinate Lookup (INDEX / MATCH)",
    "prompt": "To extract executive compensation records across relational tables, navigate to sheet <code>Summary_Practice</code> cell <strong>B13</strong> and write a coordinate lookup formula using <code>=INDEX()</code> and <code>=MATCH()</code> to retrieve salary from <code>Employees!E2:E7</code> matching employee <code>\"Sarah Davis\"</code> in <code>Employees!A2:A7</code> with exact match <code>0</code> via <code>=INDEX(Employees!E2:E7, MATCH(\"Sarah Davis\", Employees!A2:A7, 0))</code>.",
    "targetSheet": "Summary_Practice",
    "targetCell": "B13",
    "solution": "=INDEX(Employees!E2:E7, MATCH(\"Sarah Davis\", Employees!A2:A7, 0))",
    "expectedFormulaPrefix": "=INDEX",
    "expectedValue": 85000,
    "tolerance": 0.1,
    "difficulty": "hard",
    "bloom": "apply",
    "xp": 75,
    "marks": 1,
    "hint": "Use =INDEX(Employees!E2:E7, MATCH(\"Sarah Davis\", Employees!A2:A7, 0))",
    "hints": [
      "Wrap MATCH in INDEX: MATCH finds the row number in Employees!A2:A7, and INDEX extracts from Employees!E2:E7."
    ],
    "check": {
      "expected": 85000,
      "tolerance": 0.1,
      "mustUseAnyOf": [
        [
          "INDEX"
        ],
        [
          "MATCH"
        ]
      ],
      "mustReference": [
        "Employees!E2:E7",
        "Employees!A2:A7"
      ],
      "mustNotBeLiteral": true
    },
    "commonMistakes": [
      {
        "pattern": ",0\\)\\)",
        "message": "Be sure to specify 0 in MATCH for exact matching: MATCH(\"Sarah Davis\", Employees!A2:A7, 0)."
      }
    ],
    "dataScope": {
      "cols": [
        "A",
        "E"
      ],
      "params": [
        "Sarah Davis"
      ],
      "previewRows": 6,
      "summary": "Relational join across two tables using classic coordinate mapping."
    }
  },
  {
    "id": "c17",
    "number": 17,
    "title": "Nested String Sanitization (PROPER & TRIM)",
    "prompt": "To sanitize raw CRM representative text and enforce standard corporate title casing, navigate to sheet <code>Summary_Practice</code> cell <strong>B14</strong> and write a nested string formula using <code>=PROPER()</code> and <code>=TRIM()</code> referencing dirty cell <code>Sales_Data!Q1</code> via <code>=PROPER(TRIM(Sales_Data!Q1))</code>.",
    "targetSheet": "Summary_Practice",
    "targetCell": "B14",
    "solution": "=PROPER(TRIM(Sales_Data!Q1))",
    "expectedFormulaPrefix": "=PROPER",
    "expectedValue": "Sarah Davis",
    "tolerance": 0,
    "difficulty": "hard",
    "bloom": "apply",
    "xp": 75,
    "marks": 1,
    "hint": "Use =PROPER(TRIM(Sales_Data!Q1))",
    "hints": [
      "Compose functions inside out: TRIM cleans the spaces, and PROPER capitalizes each word."
    ],
    "check": {
      "expected": "Sarah Davis",
      "tolerance": 0,
      "mustUseAnyOf": [
        [
          "PROPER"
        ],
        [
          "TRIM"
        ]
      ],
      "mustReference": [
        "Sales_Data!Q1"
      ],
      "mustNotBeLiteral": true
    },
    "commonMistakes": [
      {
        "pattern": "^=TRIM\\(PROPER",
        "message": "Write =PROPER(TRIM(Sales_Data!Q1)) to clean whitespace before capitalizing."
      }
    ],
    "dataScope": {
      "cols": [
        "Q"
      ],
      "params": [],
      "previewRows": 1,
      "summary": "Multi-stage text scrubbing pipeline converting raw string to canonical casing."
    }
  },
  {
    "id": "c18",
    "number": 18,
    "title": "Temporal Year Extraction (YEAR)",
    "prompt": "To decompose transaction timestamp serials for annual fiscal reporting, navigate to sheet <code>Summary_Practice</code> cell <strong>B15</strong> and write a date extraction formula using <code>=YEAR()</code> referencing the date serial cell in <code>Sales_Data!R1</code> via <code>=YEAR(Sales_Data!R1)</code>.",
    "targetSheet": "Summary_Practice",
    "targetCell": "B15",
    "solution": "=YEAR(Sales_Data!R1)",
    "expectedFormulaPrefix": "=YEAR",
    "expectedValue": 2026,
    "tolerance": 0.1,
    "difficulty": "hard",
    "bloom": "apply",
    "xp": 75,
    "marks": 1,
    "hint": "Use =YEAR(Sales_Data!R1)",
    "hints": [
      "Extract the year component from the date cell using =YEAR(Sales_Data!R1)."
    ],
    "check": {
      "expected": 2026,
      "tolerance": 0.1,
      "mustUseAnyOf": [
        [
          "YEAR"
        ]
      ],
      "mustReference": [
        "Sales_Data!R1"
      ],
      "mustNotBeLiteral": true
    },
    "commonMistakes": [
      {
        "pattern": "^=2026$",
        "message": "Do not hardcode 2026. Use =YEAR(Sales_Data!R1)."
      }
    ],
    "dataScope": {
      "cols": [
        "R"
      ],
      "params": [],
      "previewRows": 1,
      "summary": "Decomposes temporal date serial into its 4-digit Gregorian year integer."
    }
  },
  {
    "id": "c19",
    "number": 19,
    "title": "Multi-Level Data Sorting (Sort Tool)",
    "prompt": "To prioritize high-value commercial accounts in operational reviews, navigate to sheet <code>Sales_Data</code>, select table cell <strong>G2</strong>, and use the Ribbon Data Sort tool to sort the table records by <strong>Total Revenue (Column G)</strong> in <strong>Descending</strong> order.",
    "targetSheet": "Sales_Data",
    "targetCell": "G2",
    "mode": "state",
    "difficulty": "hard",
    "bloom": "apply",
    "xp": 75,
    "marks": 1,
    "hint": "Click the Sort button in the Ribbon and choose Sort Descending on Total Revenue.",
    "hints": [
      "Select any cell in Column G and click Sort Descending (Z to A)."
    ],
    "check": {
      "type": "sort",
      "sheet": "Sales_Data",
      "column": "G",
      "order": "desc"
    },
    "dataScope": {
      "cols": [
        "G"
      ],
      "params": [
        "desc"
      ],
      "previewRows": 15,
      "summary": "Executes worksheet sort organizing records by revenue magnitude."
    }
  },
  {
    "id": "c20",
    "number": 20,
    "title": "Conditional Formatting Rule (CF Tool)",
    "prompt": "To visually flag marquee enterprise transactions exceeding key financial thresholds, navigate to sheet <code>Sales_Data</code> range <strong>G2:G16</strong> and apply a Conditional Formatting Highlight Cells Rule using the Ribbon tool for values <strong>Greater Than 10,000</strong>.",
    "targetSheet": "Sales_Data",
    "targetCell": "G2:G16",
    "mode": "state",
    "difficulty": "hard",
    "bloom": "evaluate",
    "xp": 75,
    "marks": 1,
    "hint": "Use Conditional Formatting -> Highlight Cells Rules -> Greater Than -> 10000.",
    "hints": [
      "Select G2:G16, click Conditional Formatting, choose Greater Than, enter 10000, and apply."
    ],
    "check": {
      "type": "cf",
      "sheet": "Sales_Data",
      "range": "G2:G16",
      "operator": "gt",
      "threshold": 10000
    },
    "dataScope": {
      "cols": [
        "G"
      ],
      "params": [
        ">10000"
      ],
      "previewRows": 15,
      "summary": "Applies visual conditional alert threshold for strategic high-value accounts."
    }
  }
]
};
