// public/excel/content/excel-day-12.js
// Manodemy Excel Studio — Day 12 Curriculum Manifest & Challenges
// Topic: What-If Analysis and Corporate Capstone (Global Day 30)
// Conforms to: Style Guide, Schema v2.1, and Dataset Registry (Zenith Solar & Wind - Capstone)

if (!window.EXCEL_COURSE_CONTENT) window.EXCEL_COURSE_CONTENT = {};

window.EXCEL_COURSE_CONTENT['excelDay12'] = {
  day: 12,
  globalDay: 30,
  title: "What-If Analysis & Corporate Capstone",
  description: "Master corporate What-If analysis, debt amortization modeling via PMT(), Goal Seek mechanics, sensitivity tables, Scenario Manager, and construct an institutional-grade renewable energy capstone model integrating formulas, dynamic lookups, multi-condition aggregations, nested decision logic, date calendars, and zero-variance balance integrity.",
  topics: [
    "01. What-If Analysis Foundations: Forward vs. Backward Financial Modeling",
    "02. Goal Seek Mechanics: Back-Solving for Target Financial Milestones",
    "03. One-Variable Data Tables: Sensitivity Across Single Input Drivers",
    "04. Two-Variable Data Tables: Bivariate Sensitivity Matrices",
    "05. Scenario Manager: Multi-Variable Executive Case Analysis",
    "06. Financial Modeling Mechanics: Debt Amortization & PMT()",
    "07. Corporate Financial Model Architecture: Modular Design Discipline",
    "08. Lookup & Decision Logic in Financial Models: XLOOKUP, INDEX/MATCH & Nested Logic",
    "09. Date Modeling & Temporal Calendars in Long-Term Project Finance",
    "10. The Capstone Executive Deliverable: Valuation, Sensitivity & Balance Integrity"
  ],
  slides: [
    {
      title: "What-If Analysis & Corporate Capstone Financial Modeling",
      html: `
<section class="slide-section" id="sec01">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingWhatIfFoundations">
    <span class="heading-num-box">01</span>
    <span class="heading-title-box">
      <span class="heading-icon">🔄</span>
      <span class="heading-title-text">What-If Analysis Foundations: Forward vs. Backward Financial Modeling</span>
      <button class="audio-play-btn" data-track-idx="0" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <div class="pro-tip-box" style="margin-bottom: 16px;">
      <h4>⚡ Project Finance FP&A Hotkeys: What-If Diagnostics</h4>
      <p>Launch What-If tool suites at executive speed: press <kbd>Alt</kbd> + <kbd>A</kbd> + <kbd>W</kbd> + <kbd>G</kbd> for Goal Seek, or <kbd>Alt</kbd> + <kbd>A</kbd> + <kbd>W</kbd> + <kbd>T</kbd> for Bivariate Data Tables. Press <kbd>F9</kbd> to force full recursive dependency recalculation on complex debt waterfalls.</p>
    </div>
    <p class="lead-text">Standard financial modeling is <strong>forward-looking</strong>: you input capital expenditures, power generation, and electricity tariffs to compute projected revenue and net operating income. However, senior leadership and investment committees make decisions by asking <strong>backward-solving questions</strong>: <em>"What electricity tariff is required to guarantee our target 12% equity return?"</em></p>
    <div class="architecture-grid">
      <div class="arch-box">
        <h4>1. Forward Financial Modeling</h4>
        <p>Precedent Inputs (CapEx, Debt Rate, PPA Price) → Formulas → Final Project Free Cash Flow &amp; Return.</p>
      </div>
      <div class="arch-box">
        <h4>2. Backward Root-Solving (Goal Seek)</h4>
        <p>Target Hurdle (e.g. 1.25x DSCR) → Iterative Root Solver → Required Input Driver (e.g. Minimum Tariff).</p>
      </div>
      <div class="arch-box">
        <h4>3. Multi-Dimensional Sensitivity</h4>
        <p>Stress-testing simultaneous macro shifts (interest rate hikes, inflation, degradation) via Data Tables &amp; Scenarios.</p>
      </div>
    </div>
    <div class="keynote-box keynote-emerald">
      <strong>Corporate FP&A Standard:</strong> In high-stakes renewable energy finance, assumptions are never static. A model that only presents a single base case is considered uninvestable by infrastructure funds and syndicate lenders.
    </div>
    <div class="anti-pattern-card">
      <div class="anti-pattern-header">⚠️ Anti-Pattern: Manual Trial-and-Error Tuning</div>
      <p><strong>The Mistake:</strong> Manually typing in numbers into an assumption cell over and over until the target IRR looks close enough.</p>
      <p><strong>The Professional Solution:</strong> Use automated What-If tools (Goal Seek, Data Tables, Scenario Manager) for exact, repeatable financial engineering.</p>
    </div>
  </div>
</section>

<section class="slide-section" id="sec02">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingGoalSeek">
    <span class="heading-num-box">02</span>
    <span class="heading-title-box">
      <span class="heading-icon">🎯</span>
      <span class="heading-title-text">Goal Seek Mechanics: Back-Solving for Target Financial Milestones</span>
      <button class="audio-play-btn" data-track-idx="1" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p>Excel's <strong>Goal Seek</strong> tool (under <em>Data → What-If Analysis → Goal Seek</em>) uses a numerical Newton-Raphson approximation engine to find the exact precedent input that forces a dependent formula to yield a targeted output value.</p>
    <div class="table-responsive">
      <table class="reference-table">
        <thead>
          <tr>
            <th>Parameter</th>
            <th>Excel Requirement</th>
            <th>Financial Modeling Context</th>
            <th>Zenith Renewable Energy Example</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Set cell</strong></td>
            <td>Must contain a dynamic formula.</td>
            <td>Target KPI or debt coverage metric.</td>
            <td><code>Executive_Model!G19</code> (Solar DSCR Ratio).</td>
          </tr>
          <tr>
            <td><strong>To value</strong></td>
            <td>Must be a hardcoded target number.</td>
            <td>Bank covenant threshold or hurdle.</td>
            <td><code>1.25</code> (Minimum Bank DSCR).</td>
          </tr>
          <tr>
            <td><strong>By changing cell</strong></td>
            <td>Must be a static precedent input cell.</td>
            <td>Operational driver or contract pricing.</td>
            <td><code>CapEx_Financial_Model!H2</code> (PPA Tariff $/MWh).</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="keynote-box keynote-emerald">
      <strong>Modeler Warning:</strong> Goal Seek directly overwrites the changing cell's contents without an undo buffer. Always save a scenario or backup copy of your baseline parameters before executing Goal Seek.
    </div>
    <div class="anti-pattern-card">
      <div class="anti-pattern-header">⚠️ Anti-Pattern: Pointing "Set Cell" to a Static Number</div>
      <p><strong>The Mistake:</strong> Selecting a cell with a hardcoded number as the "Set Cell", causing Excel to display: <em>"Cell must contain a formula"</em>.</p>
      <p><strong>The Rule:</strong> "Set Cell" must contain an active formula linked via precedent chains to the "By changing cell".</p>
    </div>
  </div>
</section>

<section class="slide-section" id="sec03">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingOneVarDataTables">
    <span class="heading-num-box">03</span>
    <span class="heading-title-box">
      <span class="heading-icon">📋</span>
      <span class="heading-title-text">One-Variable Data Tables: Sensitivity Across Single Input Drivers</span>
      <button class="audio-play-btn" data-track-idx="2" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p>When presenting financial proposals to syndicated lenders, modelers must display how debt service obligations shift across a spectrum of interest rates (e.g. 5.0% to 7.5% in 0.5% increments). Rather than duplicating the model 6 times, a <strong>One-Variable Data Table</strong> evaluates all iterations in a unified grid.</p>
    <div class="architecture-grid">
      <div class="arch-box">
        <h4>1. Input Sequence</h4>
        <p>List input values in a vertical column (e.g. 5.0%, 5.5%, 6.0%, 6.5%, 7.0%).</p>
      </div>
      <div class="arch-box">
        <h4>2. Header Formula Link</h4>
        <p>In the cell one row above and one column to the right, link to the output formula: <code>=B7</code> (Annual PMT).</p>
      </div>
      <div class="arch-box">
        <h4>3. Background Evaluation</h4>
        <p>Select table range → <em>Data Table</em> → set <strong>Column input cell</strong> to model's interest rate cell. Formula: <code>{=TABLE(, input)}</code>.</p>
      </div>
    </div>
    <div class="keynote-box keynote-emerald">
      <strong>Calculation Efficiency:</strong> Data Tables calculate dynamically inside Excel's memory loop. If you alter the loan principal amount, all sensitivity rows update simultaneously.
    </div>
    <div class="anti-pattern-card">
      <div class="anti-pattern-header">⚠️ Anti-Pattern: Typing Formulas in Table Cells</div>
      <p><strong>The Mistake:</strong> Manually typing <code>=-PMT(...)</code> inside each row of the sensitivity grid instead of letting Excel's table array engine populate it.</p>
      <p><strong>The Gold Standard:</strong> Link the top header once and let Excel populate the array.</p>
    </div>
  </div>
</section>

<section class="slide-section" id="sec04">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingTwoVarDataTables">
    <span class="heading-num-box">04</span>
    <span class="heading-title-box">
      <span class="heading-icon">📊</span>
      <span class="heading-title-text">Two-Variable Data Tables: Bivariate Sensitivity Matrices</span>
      <button class="audio-play-btn" data-track-idx="3" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p>In institutional capital allocation, risks rarely occur in isolation. Interest rates and loan amortization terms fluctuate together. A <strong>Two-Variable Data Table</strong> builds a bivariate matrix showing the complete operational envelope.</p>
    <div class="architecture-grid">
      <div class="arch-box">
        <h4>Corner Cell Formula</h4>
        <p>The top-left intersection cell MUST contain a direct formula link to your core KPI: <code>=B7</code> (Annual PMT).</p>
      </div>
      <div class="arch-box">
        <h4>Row Input Variables</h4>
        <p>Horizontal values across the top header row (e.g., Loan Term: 15, 18, 20, 25 Years).</p>
      </div>
      <div class="arch-box">
        <h4>Column Input Variables</h4>
        <p>Vertical values down the left column (e.g., Debt Interest Rate: 5.0%, 5.5%, 6.0%, 6.5%, 7.0%).</p>
      </div>
    </div>
    <div class="keynote-box keynote-emerald">
      <strong>Boardroom Requirement:</strong> Two-variable sensitivity matrices are mandatory appendices in investment memos, proving that the debt structure remains viable even under simultaneous rate spikes and term compression.
    </div>
    <div class="anti-pattern-card">
      <div class="anti-pattern-header">⚠️ Anti-Pattern: Swapping Row and Column Coordinates</div>
      <p><strong>The Mistake:</strong> Entering the Interest Rate as the Row Input and Loan Term as the Column Input in the dialog box.</p>
      <p><strong>The Rule:</strong> Remember the mnemonic: <em>Row input cell matches the horizontal header row; Column input cell matches the vertical column</em>.</p>
    </div>
  </div>
</section>

<section class="slide-section" id="sec05">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingScenarioManager">
    <span class="heading-num-box">05</span>
    <span class="heading-title-box">
      <span class="heading-icon">🗂️</span>
      <span class="heading-title-text">Scenario Manager: Multi-Variable Executive Case Analysis</span>
      <button class="audio-play-btn" data-track-idx="4" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p>While Data Tables test one or two variables across a range, <strong>Scenario Manager</strong> allows you to bundle an entire set of macro-economic assumptions into named states of the world: <strong>Base Case</strong>, <strong>Bull Case</strong>, and <strong>Downside Stress Case</strong>.</p>
    <div class="table-responsive">
      <table class="reference-table">
        <thead>
          <tr>
            <th>Scenario Case</th>
            <th>PPA Tariff ($/MWh)</th>
            <th>Capacity Factor</th>
            <th>Debt Interest Rate</th>
            <th>Annual O&M Inflation</th>
            <th>Expected Portfolio EBITDA</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Bull Case</strong></td>
            <td>$55.00</td>
            <td>105% (Favorable wind/solar)</td>
            <td>5.0% (Rate cuts)</td>
            <td>1.5% (Low inflation)</td>
            <td>$510,000,000</td>
          </tr>
          <tr>
            <td><strong>Base Case</strong></td>
            <td>$48.00</td>
            <td>100% (P50 benchmark)</td>
            <td>6.0% (Current market)</td>
            <td>2.5% (Baseline)</td>
            <td>$445,010,000</td>
          </tr>
          <tr>
            <td><strong>Downside Case</strong></td>
            <td>$40.00</td>
            <td>90% (Low generation)</td>
            <td>7.5% (Rate hike)</td>
            <td>4.0% (High inflation)</td>
            <td>$372,000,000</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="keynote-box keynote-emerald">
      <strong>Pro Tip — Name Your Changing Cells:</strong> Before opening Scenario Manager, select each changing cell and assign it a clean name in the Name Box (e.g. <code>PPA_Price</code>, <code>Debt_Rate</code>). Your Scenario Summary report will then display readable business titles instead of cryptic cell coordinates like <code>$B$5</code>.
    </div>
    <div class="anti-pattern-card">
      <div class="anti-pattern-header">⚠️ Anti-Pattern: Unnamed Scenario Cells</div>
      <p><strong>The Mistake:</strong> Generating a Scenario Summary where rows are labeled <code>$C$12</code>, <code>$D$15</code>, <code>$F$20</code>, making the report indecipherable to senior management.</p>
    </div>
  </div>
</section>

<section class="slide-section" id="sec06">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingDebtPMT">
    <span class="heading-num-box">06</span>
    <span class="heading-title-box">
      <span class="heading-icon">💳</span>
      <span class="heading-title-text">Financial Modeling Mechanics: Debt Amortization & PMT()</span>
      <button class="audio-play-btn" data-track-idx="5" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p>Renewable energy projects require substantial upfront capital investment (CapEx) funded through long-term project debt. The core equation governing debt service is Microsoft Excel's <code>=PMT()</code> function.</p>
    <div class="architecture-grid">
      <div class="arch-box">
        <h4>1. Rate (Periodic Interest)</h4>
        <p>The interest rate per payment period. For annual payments, use <code>Annual_Rate</code>. For monthly, use <code>Annual_Rate / 12</code>.</p>
      </div>
      <div class="arch-box">
        <h4>2. Nper (Total Periods)</h4>
        <p>Total number of payment periods. For a 20-year annual loan, <code>nper = 20</code>. For monthly, <code>nper = 20 * 12 = 240</code>.</p>
      </div>
      <div class="arch-box">
        <h4>3. Pv (Present Value / Principal)</h4>
        <p>The total principal amount borrowed (e.g. <code>$100,000,000</code>). PMT returns a negative cash outflow.</p>
      </div>
    </div>
    <div class="keynote-box keynote-emerald">
      <strong>Sign Convention in Cash Flow Models:</strong> Because PMT returns a negative value representing cash leaving the company, corporate modelers write <code>=-PMT(Rate, Nper, Pv)</code> or <code>=PMT(Rate, Nper, -Pv)</code> to present debt service as a positive deduction in project cash flow waterfalls.
    </div>
    <div class="anti-pattern-card">
      <div class="anti-pattern-header">⚠️ Anti-Pattern: Frequency Mismatch</div>
      <p><strong>The Mistake:</strong> Using an annual interest rate with monthly payment periods: <code>=PMT(0.06, 240, 100000000)</code>. This applies a massive 6% interest fee every month instead of 0.5%!</p>
      <p><strong>The Fix:</strong> Always ensure rate and nper share the same temporal frequency: <code>=PMT(0.06/12, 20*12, 100000000)</code>.</p>
    </div>
  </div>
</section>

<section class="slide-section" id="sec07">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingModelArchitecture">
    <span class="heading-num-box">07</span>
    <span class="heading-title-box">
      <span class="heading-icon">🏗️</span>
      <span class="heading-title-text">Corporate Financial Model Architecture: Modular Design Discipline</span>
      <button class="audio-play-btn" data-track-idx="6" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p>Professional financial models follow the <strong>FAST Modeling Standard</strong> (Flexible, Appropriate, Structured, Transparent). An institutional-grade corporate workbook separates inputs, calculations, and executive outputs into dedicated modular schedules.</p>
    <div class="table-responsive">
      <table class="reference-table">
        <thead>
          <tr>
            <th>Module Section</th>
            <th>Primary Content & Role</th>
            <th>Color / Styling Code</th>
            <th>Integrity Gate</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>1. Macro Assumptions</strong></td>
            <td>Benchmark interest rates, inflation, tax rates, PPA terms.</td>
            <td>Blue text / shaded cell background.</td>
            <td>Zero hardcoded formulas.</td>
          </tr>
          <tr>
            <td><strong>2. CapEx & Generation Ledger</strong></td>
            <td>Asset-level MW capacity, megawatt-hour production, CapEx.</td>
            <td>Emerald table headers.</td>
            <td>SUM audit checks.</td>
          </tr>
          <tr>
            <td><strong>3. Financing & Debt Sizing</strong></td>
            <td>Debt sizing (LTC ratio), PMT amortization schedules.</td>
            <td>Classic currency formats.</td>
            <td>Debt + Equity = CapEx.</td>
          </tr>
          <tr>
            <td><strong>4. Performance & Covenants</strong></td>
            <td>EBITDA, Debt Service Coverage Ratio (DSCR), covenant checks.</td>
            <td>Bold KPI callouts.</td>
            <td>DSCR &gt;= 1.15x threshold.</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="keynote-box keynote-emerald">
      <strong>Modeling Golden Rule:</strong> Never hardcode a raw number inside a calculation formula (e.g., <code>=B11*0.70</code> is acceptable only if documented, but referencing parameterized assumption cells like <code>=B11*Assumptions!D2</code> is institutional grade).
    </div>
    <div class="anti-pattern-card">
      <div class="anti-pattern-header">⚠️ Anti-Pattern: Spaghetti Reference Chains</div>
      <p><strong>The Mistake:</strong> Formulas that criss-cross between 8 different worksheets randomly, creating circular reference loops and making audit impossible.</p>
    </div>
  </div>
</section>

<section class="slide-section" id="sec08">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingDynamicLookupsLogic">
    <span class="heading-num-box">08</span>
    <span class="heading-title-box">
      <span class="heading-icon">🔀</span>
      <span class="heading-title-text">Lookup & Decision Logic in Financial Models: XLOOKUP & Nested Logic</span>
      <button class="audio-play-btn" data-track-idx="7" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p>A static model only works for one asset. An enterprise model adapts dynamically using modern lookup engines and decision gates. When an analyst selects "Utility Solar", the model must automatically pull the correct financing interest spread and evaluate debt covenants.</p>
    <div class="architecture-grid">
      <div class="arch-box">
        <h4>1. Dynamic Parameter Lookup</h4>
        <p><code>=XLOOKUP(A19, Financing_Assumptions!A2:A5, Financing_Assumptions!B2:B5)</code> retrieves the 5.5% debt rate seamlessly.</p>
      </div>
      <div class="arch-box">
        <h4>2. Coverage Ratio Calculation</h4>
        <p><code>DSCR = EBITDA / Debt Service</code> (e.g. <code>=ROUND(F19/E19, 2)</code> yielding <code>1.18x</code>).</p>
      </div>
      <div class="arch-box">
        <h4>3. Covenant Compliance Gate</h4>
        <p><code>=IF(G19>=1.15, "Compliant", "Covenant Breach")</code> triggers an instant automated governance check.</p>
      </div>
    </div>
    <div class="keynote-box keynote-emerald">
      <strong>Senior Modeler Standard:</strong> Integrating automated logic gates into executive scorecards guarantees that covenant breaches or financing shortfalls are flagged automatically before board presentations.
    </div>
    <div class="anti-pattern-card">
      <div class="anti-pattern-header">⚠️ Anti-Pattern: Manual Compliance Inspection</div>
      <p><strong>The Mistake:</strong> Manually scanning rows to check whether DSCR ratios meet bank covenants.</p>
      <p><strong>The Solution:</strong> Use automated <code>IF</code> and <code>IFS</code> formulas with conditional formatting to spotlight default risks instantly.</p>
    </div>
  </div>
</section>

<section class="slide-section" id="sec09">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingDateCalendars">
    <span class="heading-num-box">09</span>
    <span class="heading-title-box">
      <span class="heading-icon">📅</span>
      <span class="heading-title-text">Date Modeling & Temporal Calendars in Long-Term Project Finance</span>
      <button class="audio-play-btn" data-track-idx="8" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p>Clean energy assets operate across 25 to 35-year lifecycles. Modeling commercial milestones by adding 365 days introduces compounding drift due to leap years. Professional project finance requires true Excel calendar functions.</p>
    <div class="table-responsive">
      <table class="reference-table">
        <thead>
          <tr>
            <th>Function</th>
            <th>Grammar</th>
            <th>Project Finance Application</th>
            <th>Output Behavior</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>EDATE</strong></td>
            <td><code>=EDATE(start_date, months)</code></td>
            <td>Lender post-COD operational review milestones.</td>
            <td>Adds exact calendar months without day drift.</td>
          </tr>
          <tr>
            <td><strong>EOMONTH</strong></td>
            <td><code>=EOMONTH(start_date, months)</code></td>
            <td>Debt service repayment dates &amp; fiscal closes.</td>
            <td>Returns exact last day of target month.</td>
          </tr>
          <tr>
            <td><strong>YEARFRAC</strong></td>
            <td><code>=YEARFRAC(start, end, basis)</code></td>
            <td>Pro-rata revenue recognition in partial commissioning years.</td>
            <td>Computes exact decimal fraction of a year.</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="keynote-box keynote-emerald">
      <strong>Date Precision Rule:</strong> <code>=EDATE(CapEx_Financial_Model!K2, 12)</code> advances Commercial Operation Date (45670) by exactly one calendar year to 46035, maintaining strict temporal alignment with institutional audit standards.
    </div>
    <div class="anti-pattern-card">
      <div class="anti-pattern-header">⚠️ Anti-Pattern: Assuming All Months Have 30 Days</div>
      <p><strong>The Mistake:</strong> Using <code>Date + 30</code> or <code>Date + 360</code>, leading to interest miscalculations on multi-million dollar loan balances.</p>
    </div>
  </div>
</section>

<section class="slide-section" id="sec10">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingBalanceIntegrity">
    <span class="heading-num-box">10</span>
    <span class="heading-title-box">
      <span class="heading-icon">🏆</span>
      <span class="heading-title-text">The Capstone Executive Deliverable: Valuation, Sensitivity & Balance Integrity</span>
      <button class="audio-play-btn" data-track-idx="9" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p>You have completed the comprehensive 30-day curriculum: foundational arithmetic, data hygiene, structured references, nested logic, modern XLOOKUP engines, dynamic arrays, advanced PivotTables, and full-scale What-If financial engineering. We culminate with the ultimate test of financial modeling mastery: the <strong>Balance Integrity Reconciliation Gate</strong>.</p>
    <div class="table-responsive">
      <table class="reference-table">
        <thead>
          <tr>
            <th>Reconciliation Metric</th>
            <th>Formula / Reference</th>
            <th>Value ($)</th>
            <th>Audit Role</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Total Portfolio CapEx</strong></td>
            <td><code>Executive_Model!B11</code></td>
            <td>$5,523,000,000</td>
            <td>Total asset investment required.</td>
          </tr>
          <tr>
            <td><strong>Funded Capital (Debt + Equity)</strong></td>
            <td><code>=(B11 * 0.70) + (B11 * 0.30)</code></td>
            <td>$5,523,000,000</td>
            <td>70% syndicated debt + 30% sponsor equity.</td>
          </tr>
          <tr>
            <td><strong>Balance Integrity Variance</strong></td>
            <td><code>=ROUND(B11 - (B11*0.7 + B11*0.3), 2)</code></td>
            <td>$0.00</td>
            <td>Mathematical proof that the capital structure balances.</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="keynote-box keynote-emerald">
      <strong>Senior Analyst Capstone Milestone:</strong> Delivering a model where the Balance Integrity cell strictly displays <code>0.00</code> proves you possess the technical rigor, mathematical precision, and architectural discipline expected of senior corporate analytics engineers.
    </div>
    <div class="anti-pattern-card">
      <div class="anti-pattern-header">💼 Masterclass Conclusion</div>
      <p><strong>The Final Takeaway:</strong> Excellence in Excel is not about knowing obscure buttons. It is about constructing clean, automated, verifiable models that leaders trust to allocate billions in capital. Congratulations on completing the Manodemy Excel for Data Analysts masterclass!</p>
    </div>
  </div>
</section>
`
    }
  ],

  // ═══════════════ CANONICAL SEED WORKBOOK: ZENITH SOLAR & WIND ═══════════════
  initialWorkbook: {
    "CapEx_Financial_Model": [
      ["Project ID", "Project Name", "Technology", "State", "Capacity MW", "Total CapEx", "Annual Generation MWh", "PPA Rate", "Annual Revenue", "Annual O&M", "COD Serial"],
      ["PRJ-901", "Helios Solar I",        "Utility Solar",   "CA", 150, 180000000, 330000, 48, 15840000, 3200000, 45670],
      ["PRJ-902", "Mojave Sun Central",    "Utility Solar",   "CA", 200, 240000000, 450000, 46, 20700000, 4100000, 45685],
      ["PRJ-903", "Alta Wind Energy I",    "Onshore Wind",    "CA", 120, 168000000, 360000, 52, 18720000, 3800000, 45700],
      ["PRJ-904", "Pacific Coast Offshore","Offshore Wind",   "CA", 250, 550000000, 850000, 65, 55250000, 9500000, 45720],
      ["PRJ-905", "Sierra Energy Storage", "Battery Storage", "CA", 100, 120000000, 180000, 58, 10440000, 2100000, 45740],
      ["PRJ-906", "Permian Solar Array",   "Utility Solar",   "TX", 250, 275000000, 520000, 44, 22880000, 4500000, 45675],
      ["PRJ-907", "Gulf Breeze Wind",      "Onshore Wind",    "TX", 300, 390000000, 900000, 48, 43200000, 6800000, 45690],
      ["PRJ-908", "Brazos Valley Wind",    "Onshore Wind",    "TX", 180, 234000000, 540000, 50, 27000000, 4200000, 45710],
      ["PRJ-909", "Galveston Offshore I",  "Offshore Wind",   "TX", 200, 440000000, 700000, 66, 46200000, 8200000, 45735],
      ["PRJ-910", "Lone Star Storage Hub", "Battery Storage", "TX", 80,  96000000,  140000, 60, 8400000,  1800000, 45755],
      ["PRJ-911", "Sonoran Desert Solar",  "Utility Solar",   "AZ", 180, 216000000, 410000, 45, 18450000, 3600000, 45680],
      ["PRJ-912", "Phoenix Sun Valley",    "Utility Solar",   "AZ", 120, 144000000, 270000, 47, 12690000, 2600000, 45705],
      ["PRJ-913", "Apache Ridge Wind",     "Onshore Wind",    "AZ", 100, 135000000, 290000, 53, 15370000, 2700000, 45725],
      ["PRJ-914", "Tucson Grid Battery",   "Battery Storage", "AZ", 60,  72000000,  110000, 62, 6820000,  1400000, 45760],
      ["PRJ-915", "Nevada Sun Peaks",      "Utility Solar",   "NV", 220, 253000000, 490000, 45, 22050000, 4100000, 45695],
      ["PRJ-916", "Silver State Solar",    "Utility Solar",   "NV", 160, 184000000, 360000, 47, 16920000, 3100000, 45715],
      ["PRJ-917", "Battle Mountain Wind",  "Onshore Wind",    "NV", 150, 195000000, 420000, 51, 21420000, 3900000, 45730],
      ["PRJ-918", "Vegas Gateway Storage", "Battery Storage", "NV", 100, 120000000, 180000, 59, 10620000, 2200000, 45770],
      ["PRJ-919", "Columbia Gorge Wind",   "Onshore Wind",    "OR", 200, 270000000, 620000, 49, 30380000, 5100000, 45688],
      ["PRJ-920", "Cascade Crest Wind",    "Onshore Wind",    "OR", 140, 189000000, 410000, 52, 21320000, 3500000, 45722],
      ["PRJ-921", "Oregon Coastal Wind",   "Offshore Wind",   "OR", 180, 414000000, 600000, 67, 40200000, 7900000, 45750],
      ["PRJ-922", "Willamette Solar Park", "Utility Solar",   "OR", 80,  96000000,  150000, 50, 7500000,  1800000, 45765],
      ["PRJ-923", "Front Range Wind",      "Onshore Wind",    "CO", 220, 297000000, 660000, 48, 31680000, 5300000, 45702],
      ["PRJ-924", "Platte River Solar",    "Utility Solar",   "CO", 140, 161000000, 290000, 46, 13340000, 2700000, 45745],
      ["PRJ-925", "Rockies Battery Power", "Battery Storage", "CO", 70,  84000000,  120000, 61, 7320000,  1600000, 45780]
    ],
    "Financing_Assumptions": [
      ["Technology", "Benchmark Debt Interest Rate", "Max Loan Term Years", "Target Debt / Equity Ratio", "Minimum DSCR Threshold"],
      ["Utility Solar",   0.055, 20, 0.70, 1.25],
      ["Onshore Wind",    0.060, 18, 0.65, 1.30],
      ["Offshore Wind",   0.068, 15, 0.60, 1.35],
      ["Battery Storage", 0.062, 12, 0.75, 1.20]
    ],
    "Executive_Model": [
      ["Zenith Solar & Wind — Executive Financial & Capstone Model", "", "", "", "", "", "", ""],
      ["1. What-If Analysis & Debt Financing Sensitivity Engine", "", "", "", "", "", "", ""],
      ["Financing Parameter", "Base Case Value", "", "Scenario Rate 6.5%", "Scenario Rate 7.0%", "25-Yr Amortization", "", ""],
      ["Facility Principal Borrowed", 100000000, "", "", "", "", "", ""],
      ["Benchmark Annual Interest Rate", 0.060, "", 0.065, 0.070, 0.060, "", ""],
      ["Loan Term (Years)", 20, "", 20, 20, 25, "", ""],
      ["Annual Debt Service Payment (PMT)", "", "", "", "", "", "", ""],
      ["Total Lifetime Debt Interest Paid", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["2. Corporate Capstone: Portfolio Valuation & Capital Structure", "", "", "", "", "", "", ""],
      ["Total Portfolio CapEx ($)", "", "", "", "", "", "", ""],
      ["Total Portfolio Capacity (MW)", "", "", "", "", "", "", ""],
      ["Total Portfolio Annual Revenue ($)", "", "", "", "", "", "", ""],
      ["Total Portfolio Annual O&M Expenses ($)", "", "", "", "", "", "", ""],
      ["Portfolio EBITDA ($)", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["3. Segment Financing & Covenant Compliance Engine", "", "", "", "", "", "", ""],
      ["Technology", "Segment CapEx ($)", "Debt Interest Rate", "Debt Principal ($)", "Annual Debt Service", "Segment EBITDA ($)", "DSCR Ratio", "Covenant Status"],
      ["Utility Solar", "", "", "", "", "", "", ""],
      ["Total Wind Portfolio", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["4. Long-Term Milestone Pacing & Commercial Date Analytics", "", "", "", "", "", "", ""],
      ["Operational Milestone", "Serial Date Value", "Formatted Date Note", "", "", "", "", ""],
      ["Helios Solar I 12-Month Review Date", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["5. Capital Structure Balance Integrity Check", "", "", "", "", "", "", ""],
      ["Balance Integrity Variance (Must Be 0)", "", "", "", "", "", "", ""]
    ]
  },

  // Auxiliary benchmark parameters
  initialAuxiliary: {
    "Financing_Assumptions": {
      "G1": "Corporate Tax Rate", "H1": 0.21,
      "G2": "Discount Hurdle Rate", "H2": 0.08,
      "G3": "Inflation Index", "H3": 0.025
    }
  },

  // ═══════════════ EXACTLY 20 CHALLENGES (6 EASY, 8 MEDIUM, 6 HARD) ═══════════════
  challenges: [
    {
      id: "c01",
      number: 1,
      title: "Base Case Annual Debt Service Payment (PMT)",
      prompt: "To model utility-scale clean energy debt service obligations under Zenith's baseline credit facility, in sheet <code>Executive_Model</code> cell <strong>B7</strong>, calculate the annual loan debt service rounded to 2 decimal places using <code>=ROUND(-PMT(B5, B6, B4), 2)</code>, referencing Benchmark Annual Interest Rate in <code>Executive_Model!B5</code>, Loan Term in <code>Executive_Model!B6</code>, and Principal Borrowed in <code>Executive_Model!B4</code>.",
      targetSheet: "Executive_Model",
      targetCell: "B7",
      solution: "=ROUND(-PMT(B5, B6, B4), 2)",
      expectedFormulaPrefix: "=ROUND",
      expectedValue: 8718455.70,
      tolerance: 0.1,
      difficulty: "easy",
      bloom: "apply",
      xp: 75,
      marks: 1.0,
      isolatedSetup: {
        sheet: "Executive_Model",
        cells: {
          "B4": 100000000,
          "B5": 0.060,
          "B6": 20
        }
      },
      hint: "Use =ROUND(-PMT(B5, B6, B4), 2)",
      hints: [
        "In PMT, argument 1 is Rate (B5), argument 2 is Nper (B6), argument 3 is Pv (B4).",
        "Negate PMT with a minus sign so cash outflow displays as a positive deduction.",
        "Round to 2 decimal places using =ROUND(-PMT(...), 2)."
      ],
      check: {
        expected: 8718455.70,
        tolerance: 0.1,
        mustUseAnyOf: [["PMT"]],
        mustReference: ["B5", "B6", "B4"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=[0-9.]+$", message: "Do not hardcode numbers. Write the dynamic formula =ROUND(-PMT(B5, B6, B4), 2)." }
      ],
      dataScope: {
        cols: ["B"],
        params: [],
        previewRows: 4,
        summary: "Calculates annual debt payment on a $100M loan at 6% over 20 years ($8,718,455.70/year)."
      }
    },
    {
      id: "c02",
      number: 2,
      title: "Total Lifetime Debt Interest Paid",
      prompt: "To evaluate the cumulative borrowing cost of the 20-year term debt facility for capital planning, in sheet <code>Executive_Model</code> cell <strong>B8</strong>, calculate total lifetime interest paid rounded to 2 decimal places using <code>=ROUND(B7*B6-B4, 2)</code>, multiplying Annual Payment in <code>Executive_Model!B7</code> by Term in <code>Executive_Model!B6</code> and subtracting Principal Borrowed in <code>Executive_Model!B4</code>.",
      targetSheet: "Executive_Model",
      targetCell: "B8",
      solution: "=ROUND(B7*B6-B4, 2)",
      expectedFormulaPrefix: "=ROUND",
      expectedValue: 74369114,
      tolerance: 1.0,
      difficulty: "easy",
      bloom: "apply",
      xp: 75,
      marks: 1.0,
      isolatedSetup: {
        sheet: "Executive_Model",
        cells: {
          "B4": 100000000,
          "B5": 0.060,
          "B6": 20,
          "B7": 8718455.70
        }
      },
      hint: "Use =ROUND(B7*B6-B4, 2)",
      hints: [
        "Total payments made = Annual Payment (B7) * Loan Term (B6).",
        "Subtract original Principal (B4) to find pure interest paid.",
        "Wrap with =ROUND(..., 2)."
      ],
      check: {
        expected: 74369114,
        tolerance: 1.0,
        mustReference: ["B7", "B6", "B4"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=[0-9.]+$", message: "Use dynamic formula =ROUND(B7*B6-B4, 2)." }
      ],
      dataScope: {
        cols: ["B"],
        params: [],
        previewRows: 5,
        summary: "Calculates total cumulative interest paid over 20 years ($74,369,114)."
      }
    },
    {
      id: "c03",
      number: 3,
      title: "What-If Rate Sensitivity: 6.5% Annual PMT",
      prompt: "To stress-test debt service under a 50 bps monetary tightening scenario (6.5% rate), in sheet <code>Executive_Model</code> cell <strong>D7</strong>, calculate the scenario annual loan payment rounded to 2 decimal places using <code>=ROUND(-PMT(D5, B6, B4), 2)</code>, referencing Scenario Rate in <code>Executive_Model!D5</code>, Base Loan Term in <code>Executive_Model!B6</code>, and Principal Borrowed in <code>Executive_Model!B4</code>.",
      targetSheet: "Executive_Model",
      targetCell: "D7",
      solution: "=ROUND(-PMT(D5, B6, B4), 2)",
      expectedFormulaPrefix: "=ROUND",
      expectedValue: 9075639.54,
      tolerance: 0.1,
      difficulty: "easy",
      bloom: "analyze",
      xp: 75,
      marks: 1.0,
      isolatedSetup: {
        sheet: "Executive_Model",
        cells: {
          "B4": 100000000,
          "B6": 20,
          "D5": 0.065
        }
      },
      hint: "Use =ROUND(-PMT(D5, B6, B4), 2)",
      hints: [
        "In cell D7, rate is D5 (0.065), nper is B6 (20), pv is B4 (100000000).",
        "Formula: =ROUND(-PMT(D5, B6, B4), 2)."
      ],
      check: {
        expected: 9075639.54,
        tolerance: 0.1,
        mustUseAnyOf: [["PMT"]],
        mustReference: ["D5", "B6", "B4"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=[0-9.]+$", message: "Write dynamic PMT formula." }
      ],
      dataScope: {
        cols: ["B", "D"],
        params: [],
        previewRows: 4,
        summary: "Evaluates annual debt payment at 6.50% interest ($9,075,639.54)."
      }
    },
    {
      id: "c04",
      number: 4,
      title: "What-If Rate Sensitivity: 7.0% Annual PMT",
      prompt: "To evaluate downside debt affordability under an aggressive 100 bps interest rate shock (7.0% rate), in sheet <code>Executive_Model</code> cell <strong>E7</strong>, calculate the stressed annual loan payment rounded to 2 decimal places using <code>=ROUND(-PMT(E5, B6, B4), 2)</code>, referencing Scenario Rate in <code>Executive_Model!E5</code>, Base Loan Term in <code>Executive_Model!B6</code>, and Principal Borrowed in <code>Executive_Model!B4</code>.",
      targetSheet: "Executive_Model",
      targetCell: "E7",
      solution: "=ROUND(-PMT(E5, B6, B4), 2)",
      expectedFormulaPrefix: "=ROUND",
      expectedValue: 9439292.57,
      tolerance: 0.1,
      difficulty: "easy",
      bloom: "analyze",
      xp: 75,
      marks: 1.0,
      isolatedSetup: {
        sheet: "Executive_Model",
        cells: {
          "B4": 100000000,
          "B6": 20,
          "E5": 0.070
        }
      },
      hint: "Use =ROUND(-PMT(E5, B6, B4), 2)",
      hints: [
        "In cell E7, rate is E5 (0.070), nper is B6 (20), pv is B4 (100000000).",
        "Formula: =ROUND(-PMT(E5, B6, B4), 2)."
      ],
      check: {
        expected: 9439292.57,
        tolerance: 0.1,
        mustUseAnyOf: [["PMT"]],
        mustReference: ["E5", "B6", "B4"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=[0-9.]+$", message: "Do not hardcode values." }
      ],
      dataScope: {
        cols: ["B", "E"],
        params: [],
        previewRows: 4,
        summary: "Evaluates annual debt payment under a 100 bps rate shock at 7.00% ($9,439,292.57)."
      }
    },
    {
      id: "c05",
      number: 5,
      title: "What-If Amortization Sensitivity: 25-Year Term Annual PMT",
      prompt: "To analyze annual liquidity relief achievable by extending loan amortization from 20 to 25 years, in sheet <code>Executive_Model</code> cell <strong>F7</strong>, calculate the extended-term annual payment rounded to 2 decimal places using <code>=ROUND(-PMT(B5, F6, B4), 2)</code>, referencing Base Interest Rate in <code>Executive_Model!B5</code>, Extended Term in <code>Executive_Model!F6</code>, and Principal Borrowed in <code>Executive_Model!B4</code>.",
      targetSheet: "Executive_Model",
      targetCell: "F7",
      solution: "=ROUND(-PMT(B5, F6, B4), 2)",
      expectedFormulaPrefix: "=ROUND",
      expectedValue: 7822671.82,
      tolerance: 0.1,
      difficulty: "easy",
      bloom: "analyze",
      xp: 75,
      marks: 1.0,
      isolatedSetup: {
        sheet: "Executive_Model",
        cells: {
          "B4": 100000000,
          "B5": 0.060,
          "F6": 25
        }
      },
      hint: "Use =ROUND(-PMT(B5, F6, B4), 2)",
      hints: [
        "In cell F7, rate is B5 (0.060), nper is F6 (25), pv is B4 (100000000).",
        "Formula: =ROUND(-PMT(B5, F6, B4), 2)."
      ],
      check: {
        expected: 7822671.82,
        tolerance: 0.1,
        mustUseAnyOf: [["PMT"]],
        mustReference: ["B5", "F6", "B4"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=[0-9.]+$", message: "Use dynamic PMT." }
      ],
      dataScope: {
        cols: ["B", "F"],
        params: [],
        previewRows: 4,
        summary: "Evaluates annual debt payment with extended 25-year amortization ($7,822,671.82)."
      }
    },
    {
      id: "c06",
      number: 6,
      title: "Total Portfolio CapEx (Corporate Capstone)",
      prompt: "To quantify total capital invested across Zenith's 25 utility-scale solar and wind generating assets, in sheet <code>Executive_Model</code> cell <strong>B11</strong>, calculate Total Portfolio CapEx using <code>=SUM(CapEx_Financial_Model!F2:F26)</code>, summing Total CapEx from <code>CapEx_Financial_Model!F2:F26</code>.",
      targetSheet: "Executive_Model",
      targetCell: "B11",
      solution: "=SUM(CapEx_Financial_Model!F2:F26)",
      expectedFormulaPrefix: "=SUM",
      expectedValue: 5523000000,
      tolerance: 0.1,
      difficulty: "easy",
      bloom: "apply",
      xp: 75,
      marks: 1.0,
      hint: "Use =SUM(CapEx_Financial_Model!F2:F26)",
      hints: [
        "Sum the Total CapEx range in CapEx_Financial_Model!F2:F26."
      ],
      check: {
        expected: 5523000000,
        tolerance: 0.1,
        mustUseAnyOf: [["SUM"]],
        mustReference: ["CapEx_Financial_Model", "F2:F26"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=[0-9.]+$", message: "Do not hardcode numbers. Write =SUM(CapEx_Financial_Model!F2:F26)." }
      ],
      dataScope: {
        cols: ["F"],
        params: [],
        previewRows: 25,
        summary: "Calculates total portfolio CapEx across all 25 renewable energy assets ($5,523,000,000)."
      }
    },
    {
      id: "c07",
      number: 7,
      title: "Total Portfolio Capacity (MW)",
      prompt: "To determine aggregate clean energy generating capacity across the diversified project fleet, in sheet <code>Executive_Model</code> cell <strong>B12</strong>, calculate total portfolio capacity in Megawatts using <code>=SUM(CapEx_Financial_Model!E2:E26)</code>, summing Capacity MW from <code>CapEx_Financial_Model!E2:E26</code>.",
      targetSheet: "Executive_Model",
      targetCell: "B12",
      solution: "=SUM(CapEx_Financial_Model!E2:E26)",
      expectedFormulaPrefix: "=SUM",
      expectedValue: 3950,
      tolerance: 0.1,
      difficulty: "medium",
      bloom: "apply",
      xp: 75,
      marks: 1.0,
      hint: "Use =SUM(CapEx_Financial_Model!E2:E26)",
      hints: [
        "Sum the Capacity MW range in CapEx_Financial_Model!E2:E26."
      ],
      check: {
        expected: 3950,
        tolerance: 0.1,
        mustUseAnyOf: [["SUM"]],
        mustReference: ["CapEx_Financial_Model", "E2:E26"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=[0-9.]+$", message: "Use =SUM(CapEx_Financial_Model!E2:E26)." }
      ],
      dataScope: {
        cols: ["E"],
        params: [],
        previewRows: 25,
        summary: "Sums total installed capacity (3,950 MW)."
      }
    },
    {
      id: "c08",
      number: 8,
      title: "Total Portfolio Annual Revenue",
      prompt: "To project contracted top-line energy sales across power purchase agreements (PPAs), in sheet <code>Executive_Model</code> cell <strong>B13</strong>, calculate Total Portfolio Annual Revenue using <code>=SUM(CapEx_Financial_Model!I2:I26)</code>, summing Annual Revenue from <code>CapEx_Financial_Model!I2:I26</code>.",
      targetSheet: "Executive_Model",
      targetCell: "B13",
      solution: "=SUM(CapEx_Financial_Model!I2:I26)",
      expectedFormulaPrefix: "=SUM",
      expectedValue: 544710000,
      tolerance: 0.1,
      difficulty: "medium",
      bloom: "apply",
      xp: 75,
      marks: 1.0,
      hint: "Use =SUM(CapEx_Financial_Model!I2:I26)",
      hints: [
        "Sum the Annual Revenue column in CapEx_Financial_Model!I2:I26."
      ],
      check: {
        expected: 544710000,
        tolerance: 0.1,
        mustUseAnyOf: [["SUM"]],
        mustReference: ["CapEx_Financial_Model", "I2:I26"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=[0-9.]+$", message: "Do not hardcode numbers." }
      ],
      dataScope: {
        cols: ["I"],
        params: [],
        previewRows: 25,
        summary: "Calculates total annual revenue across the portfolio ($544,710,000)."
      }
    },
    {
      id: "c09",
      number: 9,
      title: "Total Portfolio Annual O&M Expenses",
      prompt: "To model annual fleet operating expenses including turbine servicing and solar field maintenance, in sheet <code>Executive_Model</code> cell <strong>B14</strong>, calculate Total Portfolio Annual O&M Expenses using <code>=SUM(CapEx_Financial_Model!J2:J26)</code>, summing Annual O&M from <code>CapEx_Financial_Model!J2:J26</code>.",
      targetSheet: "Executive_Model",
      targetCell: "B14",
      solution: "=SUM(CapEx_Financial_Model!J2:J26)",
      expectedFormulaPrefix: "=SUM",
      expectedValue: 99700000,
      tolerance: 0.1,
      difficulty: "medium",
      bloom: "apply",
      xp: 75,
      marks: 1.0,
      hint: "Use =SUM(CapEx_Financial_Model!J2:J26)",
      hints: [
        "Sum the Annual O&M column in CapEx_Financial_Model!J2:J26."
      ],
      check: {
        expected: 99700000,
        tolerance: 0.1,
        mustUseAnyOf: [["SUM"]],
        mustReference: ["CapEx_Financial_Model", "J2:J26"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=[0-9.]+$", message: "Write a dynamic SUM formula." }
      ],
      dataScope: {
        cols: ["J"],
        params: [],
        previewRows: 25,
        summary: "Sums total annual O&M expenses across all facilities ($99,700,000)."
      }
    },
    {
      id: "c10",
      number: 10,
      title: "Portfolio EBITDA (Revenue - O&M)",
      prompt: "To determine net operating earnings available for debt service and dividend distributions, in sheet <code>Executive_Model</code> cell <strong>B15</strong>, calculate Total Portfolio EBITDA using <code>=B13-B14</code>, subtracting Total Annual O&M in <code>Executive_Model!B14</code> from Total Annual Revenue in <code>Executive_Model!B13</code>.",
      targetSheet: "Executive_Model",
      targetCell: "B15",
      solution: "=B13-B14",
      expectedFormulaPrefix: "=",
      expectedValue: 445010000,
      tolerance: 0.1,
      difficulty: "medium",
      bloom: "analyze",
      xp: 75,
      marks: 1.0,
      isolatedSetup: {
        sheet: "Executive_Model",
        cells: {
          "B13": 544710000,
          "B14": 99700000
        }
      },
      hint: "Use =B13-B14",
      hints: [
        "EBITDA = Annual Revenue (B13) - Annual O&M Expenses (B14)."
      ],
      check: {
        expected: 445010000,
        tolerance: 0.1,
        mustReference: ["B13", "B14"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=[0-9.]+$", message: "Use dynamic formula =B13-B14." }
      ],
      dataScope: {
        cols: ["B"],
        params: [],
        previewRows: 3,
        summary: "Computes total portfolio EBITDA ($544,710,000 - $99,700,000 = $445,010,000)."
      }
    },
    {
      id: "c11",
      number: 11,
      title: "Total Utility Solar CapEx (SUMIF)",
      prompt: "To aggregate project development costs dedicated specifically to photovoltaic assets, in sheet <code>Executive_Model</code> cell <strong>B19</strong>, calculate Total Utility Solar CapEx using <code>=SUMIF(CapEx_Financial_Model!C2:C26, \"Utility Solar\", CapEx_Financial_Model!F2:F26)</code>, filtering Technology in <code>CapEx_Financial_Model!C2:C26</code> and summing Total CapEx in <code>CapEx_Financial_Model!F2:F26</code>.",
      targetSheet: "Executive_Model",
      targetCell: "B19",
      solution: "=SUMIF(CapEx_Financial_Model!C2:C26, \"Utility Solar\", CapEx_Financial_Model!F2:F26)",
      expectedFormulaPrefix: "=SUMIF",
      expectedValue: 1749000000,
      tolerance: 0.1,
      difficulty: "medium",
      bloom: "apply",
      xp: 75,
      marks: 1.0,
      hint: "Use =SUMIF(CapEx_Financial_Model!C2:C26, \"Utility Solar\", CapEx_Financial_Model!F2:F26)",
      hints: [
        "Range is Technology: CapEx_Financial_Model!C2:C26.",
        "Criteria is 'Utility Solar'.",
        "Sum range is CapEx: CapEx_Financial_Model!F2:F26."
      ],
      check: {
        expected: 1749000000,
        tolerance: 0.1,
        mustUseAnyOf: [["SUMIF", "SUMIFS"]],
        mustReference: ["CapEx_Financial_Model", "C2:C26", "F2:F26"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=[0-9.]+$", message: "Use =SUMIF()." }
      ],
      dataScope: {
        cols: ["C", "F"],
        params: [],
        previewRows: 25,
        summary: "Calculates total Utility Solar CapEx across 9 solar sites ($1,749,000,000)."
      }
    },
    {
      id: "c12",
      number: 12,
      title: "Total Wind Portfolio CapEx (Onshore + Offshore)",
      prompt: "To quantify total capital deployment across both onshore and offshore wind generation platforms, in sheet <code>Executive_Model</code> cell <strong>B20</strong>, calculate Total Wind Portfolio CapEx using <code>=SUMIF(CapEx_Financial_Model!C2:C26, \"Onshore Wind\", CapEx_Financial_Model!F2:F26)+SUMIF(CapEx_Financial_Model!C2:C26, \"Offshore Wind\", CapEx_Financial_Model!F2:F26)</code>, filtering Technology in <code>CapEx_Financial_Model!C2:C26</code> and summing Total CapEx in <code>CapEx_Financial_Model!F2:F26</code> for both wind asset classes.",
      targetSheet: "Executive_Model",
      targetCell: "B20",
      solution: "=SUMIF(CapEx_Financial_Model!C2:C26, \"Onshore Wind\", CapEx_Financial_Model!F2:F26)+SUMIF(CapEx_Financial_Model!C2:C26, \"Offshore Wind\", CapEx_Financial_Model!F2:F26)",
      expectedFormulaPrefix: "=SUMIF",
      expectedValue: 3282000000,
      tolerance: 0.1,
      difficulty: "medium",
      bloom: "analyze",
      xp: 75,
      marks: 1.0,
      hint: "Use =SUMIF(CapEx_Financial_Model!C2:C26, \"Onshore Wind\", CapEx_Financial_Model!F2:F26)+SUMIF(CapEx_Financial_Model!C2:C26, \"Offshore Wind\", CapEx_Financial_Model!F2:F26)",
      hints: [
        "First SUMIF for 'Onshore Wind' on CapEx_Financial_Model!F2:F26.",
        "Add (+) second SUMIF for 'Offshore Wind' on CapEx_Financial_Model!F2:F26."
      ],
      check: {
        expected: 3282000000,
        tolerance: 0.1,
        mustUseAnyOf: [["SUMIF", "SUMIFS"]],
        mustReference: ["CapEx_Financial_Model", "C2:C26", "F2:F26"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=[0-9.]+$", message: "Do not hardcode numbers." }
      ],
      dataScope: {
        cols: ["C", "F"],
        params: [],
        previewRows: 25,
        summary: "Calculates combined Wind portfolio CapEx ($1,878M Onshore + $1,404M Offshore = $3,282,000,000)."
      }
    },
    {
      id: "c13",
      number: 13,
      title: "Solar Benchmark Interest Rate (XLOOKUP)",
      prompt: "To dynamically link technology-specific borrowing rates from the institutional financing assumptions table, in sheet <code>Executive_Model</code> cell <strong>C19</strong>, retrieve the benchmark interest rate using <code>=XLOOKUP(A19, Financing_Assumptions!A2:A5, Financing_Assumptions!B2:B5)</code>, matching Technology in <code>Executive_Model!A19</code> against <code>Financing_Assumptions!A2:A5</code> and returning Benchmark Debt Interest Rate from <code>Financing_Assumptions!B2:B5</code>.",
      targetSheet: "Executive_Model",
      targetCell: "C19",
      solution: "=XLOOKUP(A19, Financing_Assumptions!A2:A5, Financing_Assumptions!B2:B5)",
      expectedFormulaPrefix: "=XLOOKUP",
      expectedValue: 0.055,
      tolerance: 0.005,
      difficulty: "medium",
      bloom: "apply",
      xp: 75,
      marks: 1.0,
      hint: "Use =XLOOKUP(A19, Financing_Assumptions!A2:A5, Financing_Assumptions!B2:B5)",
      hints: [
        "Lookup value is A19 ('Utility Solar').",
        "Lookup array is Financing_Assumptions!A2:A5.",
        "Return array is Benchmark Debt Interest Rate in Financing_Assumptions!B2:B5."
      ],
      check: {
        expected: 0.055,
        tolerance: 0.005,
        mustUseAnyOf: [["XLOOKUP"]],
        mustReference: ["A19", "Financing_Assumptions"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=[0-9.]+$", message: "Use XLOOKUP to dynamically pull interest rates." }
      ],
      dataScope: {
        cols: ["A", "B"],
        params: [],
        previewRows: 4,
        summary: "Retrieves Utility Solar benchmark borrowing rate (0.055 = 5.50%)."
      }
    },
    {
      id: "c14",
      number: 14,
      title: "Solar Debt Principal Sizing (70% Debt Ratio)",
      prompt: "To determine project debt sizing under Zenith's board-approved 70% loan-to-cost leverage policy, in sheet <code>Executive_Model</code> cell <strong>D19</strong>, calculate the Utility Solar debt principal using <code>=B19*0.7</code>, multiplying Segment CapEx in <code>Executive_Model!B19</code> by 0.7.",
      targetSheet: "Executive_Model",
      targetCell: "D19",
      solution: "=B19*0.7",
      expectedFormulaPrefix: "=",
      expectedValue: 1224300000,
      tolerance: 0.1,
      difficulty: "medium",
      bloom: "create",
      xp: 75,
      marks: 1.0,
      isolatedSetup: {
        sheet: "Executive_Model",
        cells: {
          "B19": 1749000000
        }
      },
      hint: "Use =B19*0.7",
      hints: [
        "Multiply Utility Solar CapEx (B19) by 0.7 (70% debt financing)."
      ],
      check: {
        expected: 1224300000,
        tolerance: 0.1,
        mustReference: ["B19"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=[0-9.]+$", message: "Write dynamic formula =B19*0.7." }
      ],
      dataScope: {
        cols: ["B"],
        params: [],
        previewRows: 1,
        summary: "Sizes solar debt financing at 70% Loan-to-Cost ($1,749,000,000 * 0.7 = $1,224,300,000)."
      }
    },
    {
      id: "c15",
      number: 15,
      title: "Solar Annual Debt Service Payment (PMT)",
      prompt: "To model utility-scale solar debt service obligations under a 70% leverage structure, in sheet <code>Executive_Model</code> cell <strong>E19</strong>, calculate annual loan payments rounded to 2 decimal places using <code>=ROUND(-PMT(C19, 20, D19), 2)</code>, referencing Borrowing Rate in <code>Executive_Model!C19</code>, a 20-year amortization term, and Financed Debt Principal in <code>Executive_Model!D19</code>.",
      targetSheet: "Executive_Model",
      targetCell: "E19",
      solution: "=ROUND(-PMT(C19, 20, D19), 2)",
      expectedFormulaPrefix: "=ROUND",
      expectedValue: 102448603.76,
      tolerance: 0.1,
      difficulty: "hard",
      bloom: "create",
      xp: 75,
      marks: 1.0,
      isolatedSetup: {
        sheet: "Executive_Model",
        cells: {
          "C19": 0.055,
          "D19": 1224300000
        }
      },
      hint: "Use =ROUND(-PMT(C19, 20, D19), 2)",
      hints: [
        "PMT arguments: rate is C19, nper is 20, pv is D19.",
        "Negate PMT with a minus sign.",
        "Round to 2 decimal places with =ROUND(-PMT(C19, 20, D19), 2)."
      ],
      check: {
        expected: 102448603.76,
        tolerance: 0.1,
        mustUseAnyOf: [["PMT"]],
        mustReference: ["C19", "D19"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=[0-9.]+$", message: "Use dynamic =ROUND(-PMT(C19, 20, D19), 2)." }
      ],
      dataScope: {
        cols: ["C", "D"],
        params: [],
        previewRows: 1,
        summary: "Calculates annual debt service obligation for Utility Solar portfolio ($102,448,603.76/year)."
      }
    },
    {
      id: "c16",
      number: 16,
      title: "Solar Segment Annual EBITDA",
      prompt: "To determine standalone operating cash flow generated exclusively by utility solar facilities, in sheet <code>Executive_Model</code> cell <strong>F19</strong>, calculate Utility Solar Annual EBITDA using <code>=SUMIFS(CapEx_Financial_Model!I2:I26, CapEx_Financial_Model!C2:C26, \"Utility Solar\")-SUMIFS(CapEx_Financial_Model!J2:J26, CapEx_Financial_Model!C2:C26, \"Utility Solar\")</code>, subtracting solar O&M expenses in <code>CapEx_Financial_Model!J2:J26</code> from solar revenues in <code>CapEx_Financial_Model!I2:I26</code> filtered by Technology in <code>CapEx_Financial_Model!C2:C26</code>.",
      targetSheet: "Executive_Model",
      targetCell: "F19",
      solution: "=SUMIFS(CapEx_Financial_Model!I2:I26, CapEx_Financial_Model!C2:C26, \"Utility Solar\")-SUMIFS(CapEx_Financial_Model!J2:J26, CapEx_Financial_Model!C2:C26, \"Utility Solar\")",
      expectedFormulaPrefix: "=SUMIFS",
      expectedValue: 120670000,
      tolerance: 0.1,
      difficulty: "hard",
      bloom: "analyze",
      xp: 75,
      marks: 1.0,
      hint: "Use =SUMIFS(CapEx_Financial_Model!I2:I26, CapEx_Financial_Model!C2:C26, \"Utility Solar\")-SUMIFS(CapEx_Financial_Model!J2:J26, CapEx_Financial_Model!C2:C26, \"Utility Solar\")",
      hints: [
        "First SUMIFS sums Revenue (I2:I26) for 'Utility Solar' in C2:C26.",
        "Subtract second SUMIFS summing O&M (J2:J26) for 'Utility Solar' in C2:C26."
      ],
      check: {
        expected: 120670000,
        tolerance: 0.1,
        mustUseAnyOf: [["SUMIFS", "SUMIF"]],
        mustReference: ["CapEx_Financial_Model", "I2:I26", "J2:J26", "C2:C26"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=[0-9.]+$", message: "Do not hardcode numbers." }
      ],
      dataScope: {
        cols: ["C", "I", "J"],
        params: [],
        previewRows: 25,
        summary: "Calculates net annual EBITDA for Utility Solar segment ($150,370,000 revenue - $29,700,000 O&M = $120,670,000)."
      }
    },
    {
      id: "c17",
      number: 17,
      title: "Solar Debt Service Coverage Ratio (DSCR)",
      prompt: "To measure lender cash flow protection and project creditworthiness via the Debt Service Coverage Ratio (DSCR), in sheet <code>Executive_Model</code> cell <strong>G19</strong>, calculate the coverage multiple rounded to 2 decimal places using <code>=ROUND(F19/E19, 2)</code>, dividing Utility Solar EBITDA in <code>Executive_Model!F19</code> by Annual Debt Service in <code>Executive_Model!E19</code>.",
      targetSheet: "Executive_Model",
      targetCell: "G19",
      solution: "=ROUND(F19/E19, 2)",
      expectedFormulaPrefix: "=ROUND",
      expectedValue: 1.18,
      tolerance: 0.01,
      difficulty: "hard",
      bloom: "evaluate",
      xp: 75,
      marks: 1.0,
      isolatedSetup: {
        sheet: "Executive_Model",
        cells: {
          "F19": 120670000,
          "E19": 102448603.76
        }
      },
      hint: "Use =ROUND(F19/E19, 2)",
      hints: [
        "DSCR = Solar EBITDA (F19) / Annual Debt Service (E19).",
        "Wrap with =ROUND(..., 2)."
      ],
      check: {
        expected: 1.18,
        tolerance: 0.01,
        mustUseAnyOf: [["ROUND"]],
        mustReference: ["F19", "E19"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=[0-9.]+$", message: "Write dynamic formula =ROUND(F19/E19, 2)." }
      ],
      dataScope: {
        cols: ["E", "F"],
        params: [],
        previewRows: 1,
        summary: "Computes Solar portfolio DSCR coverage ratio ($120,670,000 / $102,448,603.76 = 1.18x)."
      }
    },
    {
      id: "c18",
      number: 18,
      title: "Debt Covenant Compliance Verification (IF)",
      prompt: "To monitor project financing credit agreement compliance against the bank syndicate's minimum 1.15x DSCR threshold, in sheet <code>Executive_Model</code> cell <strong>H19</strong>, verify loan covenant status using <code>=IF(G19>=1.15, \"Compliant\", \"Covenant Breach\")</code>, testing the calculated DSCR ratio in <code>Executive_Model!G19</code>.",
      targetSheet: "Executive_Model",
      targetCell: "H19",
      solution: "=IF(G19>=1.15, \"Compliant\", \"Covenant Breach\")",
      expectedFormulaPrefix: "=IF",
      expectedValue: "Compliant",
      tolerance: 0,
      difficulty: "hard",
      bloom: "evaluate",
      xp: 75,
      marks: 1.0,
      isolatedSetup: {
        sheet: "Executive_Model",
        cells: {
          "G19": 1.18
        }
      },
      hint: "Use =IF(G19>=1.15, \"Compliant\", \"Covenant Breach\")",
      hints: [
        "Test if DSCR in G19 is greater than or equal to 1.15.",
        "Return 'Compliant' if true, and 'Covenant Breach' if false."
      ],
      check: {
        expected: "Compliant",
        mustUseAnyOf: [["IF"]],
        mustReference: ["G19"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^Compliant$", message: "Do not type the string literal. Write the =IF() formula." }
      ],
      dataScope: {
        cols: ["G"],
        params: [],
        previewRows: 1,
        summary: "Evaluates bank debt covenant compliance (1.18x >= 1.15x -> 'Compliant')."
      }
    },
    {
      id: "c19",
      number: 19,
      title: "Long-Term Milestone Pacing (EDATE)",
      prompt: "To establish the contractual warranty expiration and first-year performance audit milestone date for Helios Solar I, in sheet <code>Executive_Model</code> cell <strong>B24</strong>, calculate the 12-month post-COD review date serial using <code>=EDATE(CapEx_Financial_Model!K2, 12)</code>, advancing Commercial Operation Date in <code>CapEx_Financial_Model!K2</code> by 12 calendar months.",
      targetSheet: "Executive_Model",
      targetCell: "B24",
      solution: "=EDATE(CapEx_Financial_Model!K2, 12)",
      expectedFormulaPrefix: "=EDATE",
      expectedValue: 46035,
      tolerance: 1,
      difficulty: "hard",
      bloom: "evaluate",
      xp: 75,
      marks: 1.0,
      hint: "Use =EDATE(CapEx_Financial_Model!K2, 12)",
      hints: [
        "In EDATE, argument 1 is the start date serial: CapEx_Financial_Model!K2.",
        "Argument 2 is the number of calendar months: 12."
      ],
      check: {
        expected: 46035,
        tolerance: 1,
        mustUseAnyOf: [["EDATE"]],
        mustReference: ["CapEx_Financial_Model", "K2"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=[0-9.]+$", message: "Use the =EDATE() calendar function." }
      ],
      dataScope: {
        cols: ["K"],
        params: [],
        previewRows: 1,
        summary: "Advances Commercial Operation Date (45670) by 12 months to 46035."
      }
    },
    {
      id: "c20",
      number: 20,
      title: "Capital Structure Balance Integrity Check",
      prompt: "To confirm financial model integrity and prove exact balance sheet funding parity between invested capital and source financing, in sheet <code>Executive_Model</code> cell <strong>B27</strong>, calculate capital structure variance rounded to 2 decimal places using <code>=ROUND(B11-(B11*0.7+B11*0.3), 2)</code>, subtracting total funded debt (70%) and equity (30%) from Total Portfolio CapEx in <code>Executive_Model!B11</code>.",
      targetSheet: "Executive_Model",
      targetCell: "B27",
      solution: "=ROUND(B11-(B11*0.7+B11*0.3), 2)",
      expectedFormulaPrefix: "=ROUND",
      expectedValue: 0,
      tolerance: 0.01,
      difficulty: "hard",
      bloom: "create",
      xp: 75,
      marks: 1.0,
      isolatedSetup: {
        sheet: "Executive_Model",
        cells: {
          "B11": 5523000000
        }
      },
      hint: "Use =ROUND(B11-(B11*0.7+B11*0.3), 2)",
      hints: [
        "Subtract funded capital: (B11 * 0.7 + B11 * 0.3) from Total CapEx in B11.",
        "Wrap with =ROUND(..., 2). The audited variance must strictly equal 0."
      ],
      check: {
        expected: 0,
        tolerance: 0.01,
        mustUseAnyOf: [["ROUND"]],
        mustReference: ["B11"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^0$", message: "Do not hardcode 0. Write the balance audit formula =ROUND(B11-(B11*0.7+B11*0.3), 2)." }
      ],
      dataScope: {
        cols: ["B"],
        params: [],
        previewRows: 1,
        summary: "Proves capital structure integrity with zero variance ($5,523,000,000 - $5,523,000,000 = $0.00)."
      }
    }
  ]
};
