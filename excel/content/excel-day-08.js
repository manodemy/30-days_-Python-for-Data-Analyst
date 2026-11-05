// public/excel/content/excel-day-08.js
// Manodemy Excel Studio — Day 08 Curriculum Manifest & Challenges
// Topic: Dates, Calendars and Time Analytics (Global Day 26)
// Domain: CapitalTrust Finance — Commercial Lending & Debt Aging
// Conforms to: Master Orchestration v2.1 (Gate 2) & STYLE_GUIDE.md

if (!window.EXCEL_COURSE_CONTENT) window.EXCEL_COURSE_CONTENT = {};

window.EXCEL_COURSE_CONTENT['excelDay08'] = {
  day: 8,
  globalDay: 26,
  title: "Date & Time Analytics",
  description: "Master modern date serial mathematics, date construction with DATE(), temporal extraction with YEAR(), MONTH(), DAY(), forward/backward offsets with EDATE() and EOMONTH(), business milestone modeling with WORKDAY(), working duration calculations with NETWORKDAYS.INTL(), financial pro-rata tenure with YEARFRAC(), and commercial debt aging bucket models.",
  topics: [
    "01. The 1900 Date System & Serial Number Epoch",
    "02. Explicit Date Construction: DATE(year, month, day)",
    "03. Temporal Component Extraction: YEAR, MONTH, DAY",
    "04. Month Offsets & Renewal Cycles: EDATE(start_date, months)",
    "05. Month-End Expirations & Billing Cycles: EOMONTH(date, months)",
    "06. Business Days & Milestones: WORKDAY(start, days, [holidays])",
    "07. Working Day Durations: NETWORKDAYS & NETWORKDAYS.INTL",
    "08. Financial Tenure & Pro-Rata Fractions: YEARFRAC(start, end, basis)",
    "09. Commercial Debt Aging & Bucketing Models (<30, 31-60, 61-90, >90)",
    "10. Date Audit Traps, Leap Year Anomaly & Production Best Practices"
  ],
  slides: [
    {
      title: "Dates, Calendars & Time Analytics",
      html: `
<section class="slide-section" id="sec01">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="heading01">
    <span class="heading-num-box">01</span>
    <span class="heading-title-box">
      <span class="heading-icon">📅</span>
      <span class="heading-title-text">The 1900 Date System &amp; Serial Number Epoch</span>
      <button class="audio-play-btn" data-track-idx="0" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <div class="pro-tip-box" style="margin-bottom: 16px;">
      <h4>⚡ Debt Capital Markets Hotkeys: Date Formats</h4>
      <p>Quickly stamp dynamic models: press <kbd>Ctrl</kbd> + <kbd>;</kbd> to insert today's date serial. Press <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>#</kbd> (<kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>3</kbd>) to apply the standard banking date format (<code>d-mmm-yy</code>) without opening formatting dialogs.</p>
    </div>
    <p class="lead-text">In Microsoft Excel and modern spreadsheet engines, dates are not stored as human-readable text strings like <code>"2026-11-03"</code>. Instead, every date is stored internally as a pure <strong>sequential integer</strong> known as a <strong>Date Serial Number</strong>.</p>
    <div class="architecture-grid">
      <div class="arch-box">
        <h4>The 1900 Epoch Base</h4>
        <p>Day <code>1</code> represents <strong>January 1, 1900</strong>. Each passing calendar day increments the serial number by exactly <code>+1</code>. For instance, November 3, 2026 is stored as integer <code>46329</code>.</p>
      </div>
      <div class="arch-box">
        <h4>Integer Calendar Arithmetic</h4>
        <p>Because dates are simple numbers, finding elapsed calendar days between two dates requires nothing more than direct subtraction: <code>=EndDate - StartDate</code>.</p>
      </div>
      <div class="arch-box">
        <h4>Fractional Time Representation</h4>
        <p>Fractions of a day represent clock time. <code>0.25</code> is 6:00 AM (quarter day), <code>0.50</code> is 12:00 PM noon, and <code>0.75</code> is 6:00 PM evening.</p>
      </div>
    </div>
    <div class="keynote-box keynote-emerald">
      💡 <strong>Senior Analyst Takeaway:</strong> What you see on screen is merely a display formatting mask. If a formula returns a bizarre number like <code>46329</code>, the calculation is 100% correct — simply change the cell format from <em>General</em> to <em>Short Date</em> (<kbd>Ctrl + Shift + #</kbd>).
    </div>
    <div class="anti-pattern-card">
      <div class="anti-pattern-header">⚠️ Common Mistake vs. Gold Standard Solution</div>
      <div class="anti-pattern-body">
        <div class="anti-mistake">
          <strong>Anti-Pattern:</strong> Subtracting date text strings: <code>="2026-11-03" - "2026-05-15"</code>. This throws a runtime <code>#VALUE!</code> error because text characters cannot be subtracted.
        </div>
        <div class="anti-solution">
          <strong>Gold Standard:</strong> Reference actual date serial cells: <code>=Aging_Portfolio!$B$2 - Invoices_Receivable!C2</code>, or coerce with <code>=DATEVALUE("2026-11-03")</code>.
        </div>
      </div>
    </div>
  </div>
</section>

<section class="slide-section" id="sec02">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="heading02">
    <span class="heading-num-box">02</span>
    <span class="heading-title-box">
      <span class="heading-icon">🏗️</span>
      <span class="heading-title-text">Explicit Date Construction: DATE(year, month, day)</span>
      <button class="audio-play-btn" data-track-idx="1" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p class="lead-text">Hardcoding date strings like <code>"05/06/2026"</code> is one of the most perilous practices in financial analytics. In the United States, that string represents May 6; in Europe and Asia, it represents June 5. To eliminate regional ambiguity and guarantee cross-platform consistency, senior analysts construct dates explicitly with <code>=DATE()</code>.</p>
    <div class="table-responsive">
      <table class="reference-table">
        <thead>
          <tr>
            <th>Argument</th>
            <th>Type</th>
            <th>Valid Range</th>
            <th>Behavior &amp; Rollover Mechanics</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>year</code></td>
            <td>Integer</td>
            <td>1900 to 9999</td>
            <td>Always supply all 4 digits (e.g. <code>2026</code>) to prevent two-digit century misinterpretation.</td>
          </tr>
          <tr>
            <td><code>month</code></td>
            <td>Integer</td>
            <td>1 to 12 (or offset)</td>
            <td>Values exceeding 12 roll forward into subsequent years: <code>DATE(2026, 13, 1)</code> evaluates to January 1, 2027.</td>
          </tr>
          <tr>
            <td><code>day</code></td>
            <td>Integer</td>
            <td>1 to 31 (or offset)</td>
            <td>Values exceeding month length automatically overflow into the next month: <code>DATE(2026, 4, 31)</code> becomes May 1, 2026.</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="keynote-box keynote-emerald">
      💡 <strong>Senior Analyst Takeaway:</strong> Use <code>=DATE(2026, 11, 3)</code> whenever you need to hardcode a fixed benchmark date, cutoff threshold, or fiscal calendar baseline into an analytical formula.
    </div>
    <div class="anti-pattern-card">
      <div class="anti-pattern-header">⚠️ Common Mistake vs. Gold Standard Solution</div>
      <div class="anti-pattern-body">
        <div class="anti-mistake">
          <strong>Anti-Pattern:</strong> Typing literal dates into criteria ranges: <code>=SUMIFS(F2:F25, C2:C25, "&gt;=11/03/2026")</code>. Excel might evaluate this as 11 divided by 3 divided by 2026 (0.0018), or misinterpret month and day.
        </div>
        <div class="anti-solution">
          <strong>Gold Standard:</strong> Construct serials explicitly: <code>=SUMIFS(F2:F25, C2:C25, "&gt;="&amp;DATE(2026, 11, 3))</code> or reference parameter cell <code>"&gt;="&amp;$B$2</code>.
        </div>
      </div>
    </div>
  </div>
</section>

<section class="slide-section" id="sec03">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="heading03">
    <span class="heading-num-box">03</span>
    <span class="heading-title-box">
      <span class="heading-icon">🔍</span>
      <span class="heading-title-text">Temporal Component Extraction: YEAR, MONTH, DAY</span>
      <button class="audio-play-btn" data-track-idx="2" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p class="lead-text">Financial datasets often arrive with timestamps that must be sliced into seasonal cohorts, monthly billing runs, or fiscal quarters. Excel provides three dedicated extraction functions to disassemble serial numbers into their Gregorian components.</p>
    <div class="architecture-grid">
      <div class="arch-box">
        <h4>=YEAR(serial_number)</h4>
        <p>Extracts the 4-digit calendar year (e.g. <code>=YEAR(46157)</code> returns <code>2026</code>). Essential for annual trend comparisons and cohort segmentation.</p>
      </div>
      <div class="arch-box">
        <h4>=MONTH(serial_number)</h4>
        <p>Returns an integer from <code>1</code> (January) to <code>12</code> (December). Used to group transaction volumes by seasonality or fiscal quarter.</p>
      </div>
      <div class="arch-box">
        <h4>=DAY(serial_number)</h4>
        <p>Returns an integer from <code>1</code> to <code>31</code> representing the day of the month. Critical for recurring monthly invoice billing schedules.</p>
      </div>
    </div>
    <div class="keynote-box keynote-emerald">
      💡 <strong>Senior Analyst Takeaway:</strong> To compute a client's Fiscal Quarter dynamically from any date serial in cell <strong>C2</strong>, combine <code>MONTH()</code> with <code>ROUNDUP()</code>: <code>="Q" &amp; ROUNDUP(MONTH(C2) / 3, 0)</code>.
    </div>
    <div class="anti-pattern-card">
      <div class="anti-pattern-header">⚠️ Common Mistake vs. Gold Standard Solution</div>
      <div class="anti-pattern-body">
        <div class="anti-mistake">
          <strong>Anti-Pattern:</strong> Using text slicing <code>=LEFT(C2, 4)</code> to extract the year. On a cell containing serial <code>46157</code>, <code>LEFT()</code> extracts <code>"4615"</code> — completely corrupting your reporting!
        </div>
        <div class="anti-solution">
          <strong>Gold Standard:</strong> Always use native temporal functions: <code>=YEAR(C2)</code>, <code>=MONTH(C2)</code>, and <code>=DAY(C2)</code>.
        </div>
      </div>
    </div>
  </div>
</section>

<section class="slide-section" id="sec04">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="heading04">
    <span class="heading-num-box">04</span>
    <span class="heading-title-box">
      <span class="heading-icon">⏩</span>
      <span class="heading-title-text">Month Offsets &amp; Renewal Cycles: EDATE(start_date, months)</span>
      <button class="audio-play-btn" data-track-idx="3" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p class="lead-text">Commercial lending contracts, subscription agreements, and credit facilities frequently specify renewal terms in whole calendar months (e.g. "Net 3 Months" or "Annual Review +12 Months"). Adding a naive <code>30 * months</code> introduces drift because calendar months have 28, 29, 30, or 31 days.</p>
    <div class="table-responsive">
      <table class="reference-table">
        <thead>
          <tr>
            <th>Formula Signature</th>
            <th>Months Argument</th>
            <th>Direction</th>
            <th>Example (Start Date: 2026-05-15)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>=EDATE(start, 3)</code></td>
            <td>Positive integer (<code>3</code>)</td>
            <td>Forward into future</td>
            <td>Returns <code>46249</code> (August 15, 2026) — exact 3-month credit extension.</td>
          </tr>
          <tr>
            <td><code>=EDATE(start, 12)</code></td>
            <td>Positive integer (<code>12</code>)</td>
            <td>1 Year forward</td>
            <td>Returns <code>46522</code> (May 15, 2027) — annual facility renewal date.</td>
          </tr>
          <tr>
            <td><code>=EDATE(start, -1)</code></td>
            <td>Negative integer (<code>-1</code>)</td>
            <td>Backward into past</td>
            <td>Returns <code>46127</code> (April 15, 2026) — prior billing cycle anchor.</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="keynote-box keynote-emerald">
      💡 <strong>Senior Analyst Takeaway:</strong> <code>EDATE()</code> automatically handles month-end clamping. If the starting date is August 31, <code>=EDATE("2026-08-31", 1)</code> safely clamps to September 30 because September only has 30 days.
    </div>
    <div class="anti-pattern-card">
      <div class="anti-pattern-header">⚠️ Common Mistake vs. Gold Standard Solution</div>
      <div class="anti-pattern-body">
        <div class="anti-mistake">
          <strong>Anti-Pattern:</strong> Adding 90 days to simulate 3 months: <code>=C2 + 90</code>. Depending on the season, this lands 1 to 2 days before or after the contractual due date.
        </div>
        <div class="anti-solution">
          <strong>Gold Standard:</strong> Calculate contractual monthly offsets using <code>=EDATE(C2, 3)</code>.
        </div>
      </div>
    </div>
  </div>
</section>

<section class="slide-section" id="sec05">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="heading05">
    <span class="heading-num-box">05</span>
    <span class="heading-title-box">
      <span class="heading-icon">🏁</span>
      <span class="heading-title-text">Month-End Expirations &amp; Billing Cycles: EOMONTH(date, months)</span>
      <button class="audio-play-btn" data-track-idx="4" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p class="lead-text">Corporate billing runs, interest accruals, and financial statements almost universally close on the <strong>last calendar day of the month</strong>. The <code>EOMONTH()</code> function returns the exact serial number of the final day of any relative month.</p>
    <div class="architecture-grid">
      <div class="arch-box">
        <h4>=EOMONTH(date, 0)</h4>
        <p>Returns the last day of the <strong>current</strong> month. For any date in May 2026 (e.g. May 15), it returns <code>46173</code> (May 31, 2026).</p>
      </div>
      <div class="arch-box">
        <h4>=EOMONTH(date, 1)</h4>
        <p>Returns the last day of the <strong>following</strong> month. Used for "Net EOM + 30" credit terms where payment is due on the subsequent month-end.</p>
      </div>
      <div class="arch-box">
        <h4>First Day of Month Idiom</h4>
        <p>To find the first day of the current month dynamically: <code>=EOMONTH(date, -1) + 1</code>. Takes the prior month-end and adds 1 day!</p>
      </div>
    </div>
    <div class="keynote-box keynote-emerald">
      💡 <strong>Senior Analyst Takeaway:</strong> <code>EOMONTH()</code> is completely immune to leap year bugs. When evaluated for February 2028, <code>=EOMONTH("2028-02-10", 0)</code> automatically returns February 29 without any manual logic.
    </div>
    <div class="anti-pattern-card">
      <div class="anti-pattern-header">⚠️ Common Mistake vs. Gold Standard Solution</div>
      <div class="anti-pattern-body">
        <div class="anti-mistake">
          <strong>Anti-Pattern:</strong> Hardcoding <code>"2026-05-31"</code> or using a nested <code>IFS()</code> table checking for months with 30 vs 31 days.
        </div>
        <div class="anti-solution">
          <strong>Gold Standard:</strong> Use <code>=EOMONTH(C2, 0)</code> for bulletproof, automatic month-end termination.
        </div>
      </div>
    </div>
  </div>
</section>

<section class="slide-section" id="sec06">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="heading06">
    <span class="heading-num-box">06</span>
    <span class="heading-title-box">
      <span class="heading-icon">💼</span>
      <span class="heading-title-text">Business Days &amp; Milestones: WORKDAY(start, days, [holidays])</span>
      <button class="audio-play-btn" data-track-idx="5" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p class="lead-text">Commercial lending covenants, credit underwriting SLAs, and regulatory filings do not elapse on calendar days — they elapse exclusively on <strong>official working business days</strong>. The <code>WORKDAY()</code> function projects future or past milestone dates while skipping weekends and federal holidays.</p>
    <div class="table-responsive">
      <table class="reference-table">
        <thead>
          <tr>
            <th>Argument</th>
            <th>Requirement</th>
            <th>Role in Calculation</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>start_date</code></td>
            <td>Required</td>
            <td>The starting serial date from which business days will be counted.</td>
          </tr>
          <tr>
            <td><code>days</code></td>
            <td>Required</td>
            <td>Number of non-weekend, non-holiday working days to project forward (positive) or backward (negative).</td>
          </tr>
          <tr>
            <td><code>[holidays]</code></td>
            <td>Optional</td>
            <td>Cell range or array containing serial dates of official bank/company holidays (e.g. <code>Holiday_Calendar!B2:B11</code>).</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="keynote-box keynote-emerald">
      💡 <strong>Senior Analyst Takeaway:</strong> If you omit the <code>[holidays]</code> parameter, Excel only skips Saturdays and Sundays. If a public bank holiday falls on a Monday (such as Memorial Day or Labor Day), your compliance audit deadline will be 1 day too early!
    </div>
    <div class="anti-pattern-card">
      <div class="anti-pattern-header">⚠️ Common Mistake vs. Gold Standard Solution</div>
      <div class="anti-pattern-body">
        <div class="anti-mistake">
          <strong>Anti-Pattern:</strong> Adding calendar days: <code>=C2 + 15</code> for a "15-business-day" underwriting turnaround SLA.
        </div>
        <div class="anti-solution">
          <strong>Gold Standard:</strong> Use <code>=WORKDAY(C2, 15, Holiday_Calendar!B2:B11)</code> to ensure weekends and federal bank holidays are strictly excluded.
        </div>
      </div>
    </div>
  </div>
</section>

<section class="slide-section" id="sec07">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="heading07">
    <span class="heading-num-box">07</span>
    <span class="heading-title-box">
      <span class="heading-icon">⏱️</span>
      <span class="heading-title-text">Working Day Durations: NETWORKDAYS &amp; NETWORKDAYS.INTL</span>
      <button class="audio-play-btn" data-track-idx="6" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p class="lead-text">While <code>WORKDAY()</code> returns a future date serial, <code>NETWORKDAYS()</code> returns the <strong>total number of working days</strong> between two dates. This is the cornerstone metric for Days Sales Outstanding (DSO), loan origination turnaround time, and operational SLA benchmarking.</p>
    <div class="architecture-grid">
      <div class="arch-box">
        <h4>Standard Workweek</h4>
        <p><code>=NETWORKDAYS(start, end, [holidays])</code> treats Saturday and Sunday as weekends and counts all working days between start and end (both inclusive).</p>
      </div>
      <div class="arch-box">
        <h4>Custom Weekend Codes</h4>
        <p><code>=NETWORKDAYS.INTL(start, end, weekend, [holidays])</code> allows custom weekend structures. Code <code>11</code> designates Sunday as the sole weekend day.</p>
      </div>
      <div class="arch-box">
        <h4>Binary Weekend Mask</h4>
        <p>A 7-character string of 1s and 0s starting on Monday. <code>"0000011"</code> = Sat/Sun off; <code>"0000110"</code> = Fri/Sat off (Middle East standard).</p>
      </div>
    </div>
    <div class="keynote-box keynote-emerald">
      💡 <strong>Senior Analyst Takeaway:</strong> <code>NETWORKDAYS()</code> is <em>inclusive</em> of both start and end dates. If an invoice is issued on a Monday and paid that same Monday, <code>NETWORKDAYS()</code> returns <code>1</code>.
    </div>
    <div class="anti-pattern-card">
      <div class="anti-pattern-header">⚠️ Common Mistake vs. Gold Standard Solution</div>
      <div class="anti-pattern-body">
        <div class="anti-mistake">
          <strong>Anti-Pattern:</strong> Estimating business days by multiplying calendar days by 5/7: <code>=(PaymentDate - IssueDate) * (5/7)</code>. This yields inaccurate decimal numbers that fail financial audits.
        </div>
        <div class="anti-solution">
          <strong>Gold Standard:</strong> Use <code>=NETWORKDAYS.INTL(IssueDate, PaymentDate, 1, Holiday_Calendar!B2:B11)</code> for exact, calendar-aware duration counts.
        </div>
      </div>
    </div>
  </div>
</section>

<section class="slide-section" id="sec08">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="heading08">
    <span class="heading-num-box">08</span>
    <span class="heading-title-box">
      <span class="heading-icon">📈</span>
      <span class="heading-title-text">Financial Tenure &amp; Pro-Rata Fractions: YEARFRAC(start, end, basis)</span>
      <button class="audio-play-btn" data-track-idx="7" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p class="lead-text">Commercial debt instruments, interest accruals, and depreciation models require calculating the <strong>fraction of a year</strong> represented by the number of whole days between two dates. The <code>YEARFRAC()</code> function computes this fraction according to institutional financial day-count conventions.</p>
    <div class="table-responsive">
      <table class="reference-table">
        <thead>
          <tr>
            <th>Basis Code</th>
            <th>Financial Convention</th>
            <th>Day Count / Year Base</th>
            <th>Primary Institutional Application</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>0</code> (or omitted)</td>
            <td>US (NASD) 30/360</td>
            <td>30 days/month, 360 days/year</td>
            <td>US Corporate Bonds, Commercial Lending, Term Loans.</td>
          </tr>
          <tr>
            <td><code>1</code></td>
            <td>Actual/Actual</td>
            <td>Actual days / Actual days (365/366)</td>
            <td>US Treasury Bonds, Government Securities, Strict Accrual.</td>
          </tr>
          <tr>
            <td><code>2</code></td>
            <td>Actual/360</td>
            <td>Actual days / 360 days</td>
            <td>US Commercial Paper, Money Markets, Eurocurrency Loans.</td>
          </tr>
          <tr>
            <td><code>3</code></td>
            <td>Actual/365</td>
            <td>Actual days / 365 days</td>
            <td>UK Gilts, British Sterling Commercial Lending.</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="keynote-box keynote-emerald">
      💼 <strong>Interview &amp; Production Insight:</strong> In commercial credit syndication interviews, candidates are often asked: <em>"Why does basis 0 return a different value than basis 1 for the exact same loan dates?"</em> The answer: Basis 0 normalizes every calendar month to 30 days and divides by 360, whereas Basis 1 divides exact elapsed days by 365. On a $100M loan facility, this basis distinction represents tens of thousands of dollars in interest!
    </div>
    <div class="anti-pattern-card">
      <div class="anti-pattern-header">⚠️ Common Mistake vs. Gold Standard Solution</div>
      <div class="anti-pattern-body">
        <div class="anti-mistake">
          <strong>Anti-Pattern:</strong> Hardcoding <code>=(EndDate - StartDate) / 365</code>. This ignores leap years and violates credit indenture agreements that mandate 30/360 commercial conventions.
        </div>
        <div class="anti-solution">
          <strong>Gold Standard:</strong> Use <code>=YEARFRAC(StartDate, EndDate, 0)</code> for 30/360 corporate debt or <code>=YEARFRAC(StartDate, EndDate, 1)</code> for Actual/Actual treasuries.
        </div>
      </div>
    </div>
  </div>
</section>

<section class="slide-section" id="sec09">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="heading09">
    <span class="heading-num-box">09</span>
    <span class="heading-title-box">
      <span class="heading-icon">🛡️</span>
      <span class="heading-title-text">Commercial Debt Aging &amp; Bucketing Models (&lt;30, 31-60, 61-90, &gt;90)</span>
      <button class="audio-play-btn" data-track-idx="8" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p class="lead-text">Every commercial lender and accounts receivable department runs a weekly <strong>Debt Aging Schedule</strong>. Receivables are classified into delinquent aging brackets to estimate Expected Credit Losses (CECL) and determine provisioning reserves.</p>
    <div class="table-responsive">
      <table class="reference-table">
        <thead>
          <tr>
            <th>Aging Bracket</th>
            <th>Overdue Range</th>
            <th>Financial Risk Profile</th>
            <th>Actionable Escalation Workflow</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Current / Performing</strong></td>
            <td><code>Overdue &lt;= 0</code></td>
            <td>Normal Credit Health</td>
            <td>Standard billing cycle; no collection intervention required.</td>
          </tr>
          <tr>
            <td><strong>1–30 Days</strong></td>
            <td><code>1 to 30 Days</code></td>
            <td>Early Delinquency</td>
            <td>Automated email reminders, friendly phone call follow-up.</td>
          </tr>
          <tr>
            <td><strong>31–60 Days</strong></td>
            <td><code>31 to 60 Days</code></td>
            <td>Moderate Delinquency</td>
            <td>Credit line frozen; formal demand letter issued to CFO.</td>
          </tr>
          <tr>
            <td><strong>61–90 Days</strong></td>
            <td><code>61 to 90 Days</code></td>
            <td>Severe Impairment</td>
            <td>Referred to specialized debt workout team; 25% bad debt reserve.</td>
          </tr>
          <tr>
            <td><strong>&gt;90 Days</strong></td>
            <td><code>Exceeds 90 Days</code></td>
            <td>Default / Write-off Risk</td>
            <td>50%–100% loss provision; referred to legal collection agency.</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="keynote-box keynote-emerald">
      💼 <strong>Senior Analyst Takeaway:</strong> To bucket overdue days cleanly with <code>IFS()</code>, always test from the <strong>highest boundary downward</strong>: <code>=IFS(B18&gt;90, "&gt;90 Days", B18&gt;60, "61-90 Days", B18&gt;30, "31-60 Days", TRUE, "1-30 Days")</code>. Because <code>IFS()</code> stops at the first true condition, descending hierarchy prevents a 100-day overdue loan from mistakenly stopping at <code>&gt;30</code>!
    </div>
    <div class="anti-pattern-card">
      <div class="anti-pattern-header">⚠️ Common Mistake vs. Gold Standard Solution</div>
      <div class="anti-pattern-body">
        <div class="anti-mistake">
          <strong>Anti-Pattern:</strong> Evaluating smallest condition first: <code>=IFS(B18&gt;30, "31-60", B18&gt;60, "61-90", B18&gt;90, "&gt;90")</code>. A 120-day overdue loan evaluates <code>120&gt;30</code> as true and gets incorrectly labeled "31-60 Days"!
        </div>
        <div class="anti-solution">
          <strong>Gold Standard:</strong> Always structure multi-tier threshold logic in descending numerical order.
        </div>
      </div>
    </div>
  </div>
</section>

<section class="slide-section" id="sec10">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="heading10">
    <span class="heading-num-box">10</span>
    <span class="heading-title-box">
      <span class="heading-icon">⚠️</span>
      <span class="heading-title-text">Date Audit Traps, Leap Year Anomaly &amp; Production Best Practices</span>
      <button class="audio-play-btn" data-track-idx="9" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p class="lead-text">Even experienced analysts stumble over subtle date traps that corrupt financial models. Understanding these production pitfalls separates entry-level spreadsheet users from elite financial analytics engineers.</p>
    <div class="architecture-grid">
      <div class="arch-box">
        <h4>The 1900 Leap Year Anomaly</h4>
        <p>In 1983, Lotus 1-2-3 incorrectly coded 1900 as a leap year (treating Feb 29, 1900 as valid). Microsoft Excel intentionally duplicated this bug for backward compatibility. All dates after Feb 28, 1900 are offset by 1 day in legacy comparisons!</p>
      </div>
      <div class="arch-box">
        <h4>Volatile TODAY() Hazards</h4>
        <p><code>=TODAY()</code> recalculates every single time any cell in the workbook is modified. Using <code>TODAY()</code> in transactional aging rows makes reports non-reproducible across different days. Always anchor to a parameter cell (e.g. <code>$B$1</code>).</p>
      </div>
      <div class="arch-box">
        <h4>UTC &amp; Timezone Drift</h4>
        <p>When dates are imported from SQL databases via CSV, midnight timestamps (<code>2026-11-03 00:00:00 UTC</code>) can convert to the previous evening in Western timezones (<code>46328.8</code>). Truncate time with <code>INT()</code> before running date math.</p>
      </div>
    </div>
    <div class="keynote-box keynote-emerald">
      💼 <strong>Senior Analyst Takeaway:</strong> In institutional finance, models must be <strong>immutable and auditable</strong>. Store the evaluation benchmark date in an explicit parameter cell (e.g. <code>Param_AsOfDate</code> = <code>46329</code>). Any auditor can then reconstruct the exact debt aging ledger as of November 3, 2026 with 100% mathematical fidelity.
    </div>
    <div class="anti-pattern-card">
      <div class="anti-pattern-header">⚠️ Common Mistake vs. Gold Standard Solution</div>
      <div class="anti-pattern-body">
        <div class="anti-mistake">
          <strong>Anti-Pattern:</strong> Writing <code>=TODAY() - DueDate</code> in 25,000 transaction rows. This forces volatile workbook recalculation on every keystroke and destroys audit reproducibility.
        </div>
        <div class="anti-solution">
          <strong>Gold Standard:</strong> Lock the valuation date into parameter cell <code>$B$1</code> (e.g. <code>=$B$1 - DueDate</code>), creating a fast, deterministic model.
        </div>
      </div>
    </div>
  </div>
</section>
`
    }
  ],

  // ═══════════════ CANONICAL SEED WORKBOOK (CAPITALTRUST FINANCE) ═══════════════
  initialWorkbook: {
    "Invoices_Receivable": [
      ["Invoice ID", "Client Company", "Issue Date Serial", "Due Date Serial", "Payment Date Serial", "Invoice Amount", "Credit Term Days", "Status"],
      ["INV-2001", "Apex Industrial Tech",    46157, 46187, 46188,  75000, 30, "Paid"],
      ["INV-2002", "Starlight Logistics",     46158, 46203, 46198,  42000, 45, "Paid"],
      ["INV-2003", "BioHealth Pharma",        46174, 46234, 46230, 115000, 60, "Paid"],
      ["INV-2004", "Nexus Robotics",          46188, 46218, "",     68000, 30, "Overdue"],
      ["INV-2005", "Vanguard Manufacturing",  46204, 46264, "",     94000, 60, "Overdue"],
      ["INV-2006", "Crestview Energy",        46218, 46263, 46260, 130000, 45, "Paid"],
      ["INV-2007", "Horizon Retail Group",    46235, 46265, "",     51000, 30, "Overdue"],
      ["INV-2008", "AeroSpace Dynamics",      46249, 46339, "",    165000, 90, "Current"],
      ["INV-2009", "OmniCloud Systems",       46266, 46296, "",     88000, 30, "Overdue"],
      ["INV-2010", "Pacific Coast Foods",     46275, 46320, "",     37500, 45, "Overdue"],
      ["INV-2011", "Titan Heavy Equipment",   46280, 46340, "",    142000, 60, "Current"],
      ["INV-2012", "Solstice Clean Energy",   46285, 46315, 46312,  59000, 30, "Paid"],
      ["INV-2013", "Quantum BioSystems",      46296, 46326, "",     71000, 30, "Overdue"],
      ["INV-2014", "Pinnacle Auto Parts",     46300, 46345, "",     48000, 45, "Current"],
      ["INV-2015", "Sterling Materials",      46305, 46335, "",     63000, 30, "Current"],
      ["INV-2016", "Beacon Maritime",         46143, 46233, "",    125000, 90, "Overdue"],
      ["INV-2017", "Global Freightways",      46174, 46219, 46215,  84000, 45, "Paid"],
      ["INV-2018", "Summit Health Labs",      46204, 46234, 46232,  53000, 30, "Paid"],
      ["INV-2019", "Frontier Telecom",        46220, 46280, "",    110000, 60, "Overdue"],
      ["INV-2020", "Harbor Cold Storage",     46250, 46295, 46292,  39000, 45, "Paid"],
      ["INV-2021", "Valiant Defense Tech",    46265, 46355, "",    175000, 90, "Current"],
      ["INV-2022", "Orion Semis",             46270, 46300, "",     92000, 30, "Overdue"],
      ["INV-2023", "Meridian Infrastructure", 46290, 46350, "",    135000, 60, "Current"],
      ["INV-2024", "Zephyr Wind Power",       46310, 46340, "",     62000, 30, "Current"]
    ],
    "Holiday_Calendar": [
      ["Holiday Name", "Date Serial"],
      ["New Year's Day", 46023],
      ["Martin Luther King Jr. Day", 46041],
      ["Presidents' Day", 46069],
      ["Memorial Day", 46167],
      ["Juneteenth National Independence Day", 46192],
      ["Independence Day (Observed)", 46206],
      ["Labor Day", 46272],
      ["Columbus / Indigenous Peoples' Day", 46307],
      ["Veterans Day", 46337],
      ["Thanksgiving Day", 46352]
    ],
    "Aging_Portfolio": [
      ["Portfolio Valuation Parameter / Metric", "Formula Answer"],
      ["Portfolio Valuation Date (As Of)", ""],
      ["First Loan Issue Year", ""],
      ["First Loan Issue Month", ""],
      ["First Loan Issue Day", ""],
      ["First Loan Elapsed Calendar Days", ""],
      ["First Loan Maturity Date Serial", ""],
      ["First Loan 3-Month Extension Date", ""],
      ["First Loan Month-End Cutoff", ""],
      ["First Loan Next Month-End Cutoff", ""],
      ["15-Business-Day Underwriting Deadline", ""],
      ["30-Working-Day Audit Deadline (Excl. Holidays)", ""],
      ["First Loan Turnaround Business Days", ""],
      ["First Loan Turnaround Excl. Holidays", ""],
      ["First Loan Middle East Branch Days (Sun Weekend)", ""],
      ["First Loan Annualized Tenure (Actual/Actual)", ""],
      ["First Loan Commercial Paper Fraction (30/360)", ""],
      ["Delinquent Loan INV-2004 Days Overdue", ""],
      ["Delinquent Loan Aging Bracket", ""],
      ["Total Overdue Portfolio Debt Exposure", ""],
      ["Total Q3 2026 Credit Issued", ""]
    ]
  },

  initialAuxiliary: {
    "Aging_Portfolio": {
      "B1": 46329
    },
    "Invoices_Receivable": {
      "J1": "As Of Date",
      "K1": 46329
    }
  },

  // ═══════════════ 20 CHALLENGES (6 EASY, 8 MEDIUM, 6 HARD) ═══════════════
  challenges: [
    {
      id: "c01",
      number: 1,
      title: "Portfolio Valuation Date Construction (DATE)",
      prompt: "In sheet <code>Aging_Portfolio</code> cell <strong>B2</strong>, to establish an authentic baseline valuation date serial for portfolio risk analytics, construct the anchor date for November 3, 2026 using <code>=DATE(2026, 11, 3)</code>.",
      targetSheet: "Aging_Portfolio",
      targetCell: "B2",
      expectedFormulaPrefix: "=DATE",
      solution: "=DATE(2026, 11, 3)",
      expectedValue: 46329,
      tolerance: 0,
      bloom: "apply",
      difficulty: "easy",
      hint: "Construct date with =DATE(year, month, day) using 2026, 11, and 3.",
      check: {
        expected: 46329,
        tolerance: 0,
        mustUseAnyOf: ["DATE"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["B"],
        params: ["Year: 2026", "Month: 11", "Day: 3"],
        previewRows: 2,
        summary: "Constructs the anchor date serial (46329) for all debt aging calculations."
      },
      commonMistakes: [
        { mistake: '="2026-11-03"', why: "Enters a text string rather than an authentic Excel date serial number.", fix: "Use =DATE(2026, 11, 3)." }
      ]
    },
    {
      id: "c02",
      number: 2,
      title: "First Loan Issue Year (YEAR)",
      prompt: "In sheet <code>Aging_Portfolio</code> cell <strong>B3</strong>, to isolate loan origination vintages for annual debt cohort tracking, extract the 4-digit calendar year from the first loan's issue date in <code>Invoices_Receivable!C2</code> using <code>=YEAR()</code>.",
      targetSheet: "Aging_Portfolio",
      targetCell: "B3",
      expectedFormulaPrefix: "=YEAR",
      solution: "=YEAR(Invoices_Receivable!C2)",
      expectedValue: 2026,
      tolerance: 0,
      bloom: "apply",
      difficulty: "easy",
      hint: "Extract the 4-digit Gregorian year using =YEAR(Invoices_Receivable!C2).",
      check: {
        expected: 2026,
        tolerance: 0,
        mustUseAnyOf: ["YEAR"],
        mustReference: ["Invoices_Receivable!C2"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["C"],
        params: [],
        previewRows: 2,
        summary: "Deconstructs Row 2's issue date serial (46157) to extract calendar year 2026."
      },
      commonMistakes: [
        { mistake: '=LEFT(Invoices_Receivable!C2, 4)', why: "Text functions on serial numbers return digits of the integer (4615) instead of the year.", fix: "Use =YEAR(Invoices_Receivable!C2)." }
      ]
    },
    {
      id: "c03",
      number: 3,
      title: "First Loan Issue Month (MONTH)",
      prompt: "In sheet <code>Aging_Portfolio</code> cell <strong>B4</strong>, to assess seasonal borrowing cyclicality in commercial credit, extract the calendar month integer (1–12) from the loan issue date in <code>Invoices_Receivable!C2</code> using <code>=MONTH()</code>.",
      targetSheet: "Aging_Portfolio",
      targetCell: "B4",
      expectedFormulaPrefix: "=MONTH",
      solution: "=MONTH(Invoices_Receivable!C2)",
      expectedValue: 5,
      tolerance: 0,
      bloom: "apply",
      difficulty: "easy",
      hint: "Extract the month integer using =MONTH(Invoices_Receivable!C2).",
      check: {
        expected: 5,
        tolerance: 0,
        mustUseAnyOf: ["MONTH"],
        mustReference: ["Invoices_Receivable!C2"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["C"],
        params: [],
        previewRows: 2,
        summary: "Extracts calendar month 5 (May) from serial 46157."
      },
      commonMistakes: [
        { mistake: '=MID(Invoices_Receivable!C2, 6, 2)', why: "MID slices the serial integer instead of calendar date components.", fix: "Use =MONTH(Invoices_Receivable!C2)." }
      ]
    },
    {
      id: "c04",
      number: 4,
      title: "First Loan Issue Day (DAY)",
      prompt: "In sheet <code>Aging_Portfolio</code> cell <strong>B5</strong>, to align institutional disbursement billing cycles with month-day billing schedules, extract the calendar day (1–31) from the loan issue date in <code>Invoices_Receivable!C2</code> using <code>=DAY()</code>.",
      targetSheet: "Aging_Portfolio",
      targetCell: "B5",
      expectedFormulaPrefix: "=DAY",
      solution: "=DAY(Invoices_Receivable!C2)",
      expectedValue: 15,
      tolerance: 0,
      bloom: "apply",
      difficulty: "easy",
      hint: "Extract the day integer using =DAY(Invoices_Receivable!C2).",
      check: {
        expected: 15,
        tolerance: 0,
        mustUseAnyOf: ["DAY"],
        mustReference: ["Invoices_Receivable!C2"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["C"],
        params: [],
        previewRows: 2,
        summary: "Extracts day 15 from serial 46157."
      },
      commonMistakes: [
        { mistake: '=RIGHT(Invoices_Receivable!C2, 2)', why: "RIGHT parses integer serial digits instead of date day.", fix: "Use =DAY(Invoices_Receivable!C2)." }
      ]
    },
    {
      id: "c05",
      number: 5,
      title: "First Loan Elapsed Calendar Days (Serial Subtraction)",
      prompt: "In sheet <code>Aging_Portfolio</code> cell <strong>B6</strong>, to quantify total calendar days of interest accrual, compute elapsed days between valuation date (<code>Aging_Portfolio!$B$2</code>) and the first loan's issue date (<code>Invoices_Receivable!C2</code>) by subtracting the date serials.",
      targetSheet: "Aging_Portfolio",
      targetCell: "B6",
      expectedFormulaPrefix: "=",
      solution: "=Aging_Portfolio!$B$2-Invoices_Receivable!C2",
      expectedValue: 172,
      tolerance: 0,
      bloom: "apply",
      difficulty: "easy",
      hint: "Subtract the issue date from the valuation date: =$B$2 - Invoices_Receivable!C2.",
      check: {
        expected: 172,
        tolerance: 0,
        mustReference: ["Invoices_Receivable!C2", "$B$2"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["C"],
        params: ["Valuation Date in $B$2 (46329)"],
        previewRows: 2,
        summary: "Performs direct date serial subtraction: 46329 - 46157 = 172 days."
      },
      commonMistakes: [
        { mistake: '=Invoices_Receivable!C2-$B$2', why: "Subtracting valuation date from issue date yields a negative number (-172).", fix: "Subtract earlier date from later date: =$B$2 - Invoices_Receivable!C2." }
      ]
    },
    {
      id: "c06",
      number: 6,
      title: "First Loan Contractual Maturity Date (Integer Addition)",
      prompt: "In sheet <code>Aging_Portfolio</code> cell <strong>B7</strong>, to project the legally binding repayment deadline for loan Row 2, calculate the maturity date serial by adding credit term days (<code>Invoices_Receivable!G2</code>) to the issue date (<code>Invoices_Receivable!C2</code>).",
      targetSheet: "Aging_Portfolio",
      targetCell: "B7",
      expectedFormulaPrefix: "=",
      solution: "=Invoices_Receivable!C2+Invoices_Receivable!G2",
      expectedValue: 46187,
      tolerance: 0,
      bloom: "apply",
      difficulty: "easy",
      hint: "Add credit term days directly to the issue date: =Invoices_Receivable!C2 + Invoices_Receivable!G2.",
      check: {
        expected: 46187,
        tolerance: 0,
        mustReference: ["Invoices_Receivable!C2", "Invoices_Receivable!G2"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["C", "G"],
        params: [],
        previewRows: 2,
        summary: "Adds 30 credit days to serial 46157, yielding maturity date 46187 (2026-06-14)."
      },
      commonMistakes: [
        { mistake: '=C2+(G2*24)', why: "Hours are fractions of a day, not whole integers.", fix: "Add days directly: =Invoices_Receivable!C2 + Invoices_Receivable!G2." }
      ]
    },
    {
      id: "c07",
      number: 7,
      title: "Credit Facility 3-Month Extension (EDATE)",
      prompt: "In sheet <code>Aging_Portfolio</code> cell <strong>B8</strong>, to model borrower loan restructuring under a 3-month grace extension, calculate the revised tenor date for Row 2 by advancing the issue date (<code>Invoices_Receivable!C2</code>) by 3 calendar months using <code>=EDATE()</code>.",
      targetSheet: "Aging_Portfolio",
      targetCell: "B8",
      expectedFormulaPrefix: "=EDATE",
      solution: "=EDATE(Invoices_Receivable!C2, 3)",
      expectedValue: 46249,
      tolerance: 0,
      bloom: "apply",
      difficulty: "medium",
      hint: "Advance exactly 3 calendar months using =EDATE(Invoices_Receivable!C2, 3).",
      check: {
        expected: 46249,
        tolerance: 0,
        mustUseAnyOf: ["EDATE"],
        mustReference: ["Invoices_Receivable!C2"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["C"],
        params: ["Months Offset: 3"],
        previewRows: 2,
        summary: "Shifts May 15, 2026 forward by 3 calendar months to August 15, 2026 (46249)."
      },
      commonMistakes: [
        { mistake: '=Invoices_Receivable!C2 + 90', why: "Adding 90 calendar days drifts by 2 days due to July and August having 31 days.", fix: "Use =EDATE(Invoices_Receivable!C2, 3)." }
      ]
    },
    {
      id: "c08",
      number: 8,
      title: "Current Month-End Billing Cutoff (EOMONTH)",
      prompt: "In sheet <code>Aging_Portfolio</code> cell <strong>B9</strong>, to establish the monthly accounting close cutoff date for the origination period, determine the final calendar day of the issue month for Row 2 from <code>Invoices_Receivable!C2</code> using <code>=EOMONTH(..., 0)</code>.",
      targetSheet: "Aging_Portfolio",
      targetCell: "B9",
      expectedFormulaPrefix: "=EOMONTH",
      solution: "=EOMONTH(Invoices_Receivable!C2, 0)",
      expectedValue: 46173,
      tolerance: 0,
      bloom: "apply",
      difficulty: "medium",
      hint: "Get the last day of the current month with =EOMONTH(Invoices_Receivable!C2, 0).",
      check: {
        expected: 46173,
        tolerance: 0,
        mustUseAnyOf: ["EOMONTH"],
        mustReference: ["Invoices_Receivable!C2"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["C"],
        params: ["Months Offset: 0"],
        previewRows: 2,
        summary: "Finds the month-end cutoff for May 2026: May 31, 2026 (46173)."
      },
      commonMistakes: [
        { mistake: '=DATE(2026, 5, 31)', why: "Hardcodes the date rather than dynamically calculating from the transaction date.", fix: "Use =EOMONTH(Invoices_Receivable!C2, 0)." }
      ]
    },
    {
      id: "c09",
      number: 9,
      title: "Following Month-End Cutoff (EOMONTH)",
      prompt: "In sheet <code>Aging_Portfolio</code> cell <strong>B10</strong>, to schedule the subsequent quarter-opening reconciliation audit cutoff, compute the final calendar day of the month following Row 2's issue date (<code>Invoices_Receivable!C2</code>) using <code>=EOMONTH(..., 1)</code>.",
      targetSheet: "Aging_Portfolio",
      targetCell: "B10",
      expectedFormulaPrefix: "=EOMONTH",
      solution: "=EOMONTH(Invoices_Receivable!C2, 1)",
      expectedValue: 46203,
      tolerance: 0,
      bloom: "apply",
      difficulty: "medium",
      hint: "Advance to the end of next month using =EOMONTH(Invoices_Receivable!C2, 1).",
      check: {
        expected: 46203,
        tolerance: 0,
        mustUseAnyOf: ["EOMONTH"],
        mustReference: ["Invoices_Receivable!C2"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["C"],
        params: ["Months Offset: 1"],
        previewRows: 2,
        summary: "Finds the cutoff for June 2026: June 30, 2026 (46203)."
      },
      commonMistakes: [
        { mistake: '=EOMONTH(Invoices_Receivable!C2, 0) + 30', why: "Adding 30 days to May 31 lands on June 30 by coincidence, but fails in other months.", fix: "Use =EOMONTH(Invoices_Receivable!C2, 1)." }
      ]
    },
    {
      id: "c10",
      number: 10,
      title: "15-Business-Day Underwriting SLA (WORKDAY)",
      prompt: "In sheet <code>Aging_Portfolio</code> cell <strong>B11</strong>, to enforce credit committee underwriting turnaround SLAs, calculate the 15-business-day review deadline advancing from Row 2's issue date (<code>Invoices_Receivable!C2</code>) excluding standard weekends using <code>=WORKDAY()</code>.",
      targetSheet: "Aging_Portfolio",
      targetCell: "B11",
      expectedFormulaPrefix: "=WORKDAY",
      solution: "=WORKDAY(Invoices_Receivable!C2, 15)",
      expectedValue: 46178,
      tolerance: 0,
      bloom: "apply",
      difficulty: "medium",
      hint: "Calculate 15 business days ahead using =WORKDAY(Invoices_Receivable!C2, 15).",
      check: {
        expected: 46178,
        tolerance: 0,
        mustUseAnyOf: ["WORKDAY"],
        mustReference: ["Invoices_Receivable!C2"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["C"],
        params: ["Business Days: 15"],
        previewRows: 2,
        summary: "Steps over 3 weekends to project 15 working days forward from May 15, landing on June 5, 2026 (46178)."
      },
      commonMistakes: [
        { mistake: '=Invoices_Receivable!C2 + 15', why: "Direct addition counts weekend days as business days.", fix: "Use =WORKDAY(Invoices_Receivable!C2, 15)." }
      ]
    },
    {
      id: "c11",
      number: 11,
      title: "30-Working-Day Compliance Deadline with Bank Holidays (WORKDAY)",
      prompt: "In sheet <code>Aging_Portfolio</code> cell <strong>B12</strong>, to establish regulatory compliance filing deadlines factoring in observed market closures, project 30 working days from Row 2's issue date (<code>Invoices_Receivable!C2</code>) excluding bank holidays in <code>Holiday_Calendar!B2:B11</code> using <code>=WORKDAY()</code>.",
      targetSheet: "Aging_Portfolio",
      targetCell: "B12",
      expectedFormulaPrefix: "=WORKDAY",
      solution: "=WORKDAY(Invoices_Receivable!C2, 30, Holiday_Calendar!B2:B11)",
      expectedValue: 46203,
      tolerance: 0,
      bloom: "analyze",
      difficulty: "medium",
      hint: "Include the holiday range: =WORKDAY(Invoices_Receivable!C2, 30, Holiday_Calendar!B2:B11).",
      check: {
        expected: 46203,
        tolerance: 0,
        mustUseAnyOf: ["WORKDAY"],
        mustReference: ["Invoices_Receivable!C2", "Holiday_Calendar!B2:B11"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["C"],
        params: ["Holidays: Holiday_Calendar!B2:B11"],
        previewRows: 10,
        summary: "Accounts for Memorial Day (2026-05-25), pushing the 30-working-day deadline to June 30, 2026 (46203)."
      },
      commonMistakes: [
        { mistake: '=WORKDAY(Invoices_Receivable!C2, 30)', why: "Omits the holiday calendar, resulting in a deadline 1 day too early.", fix: "Pass Holiday_Calendar!B2:B11 as the 3rd parameter." }
      ]
    },
    {
      id: "c12",
      number: 12,
      title: "Loan Settlement Turnaround Days (NETWORKDAYS)",
      prompt: "In sheet <code>Aging_Portfolio</code> cell <strong>B13</strong>, to evaluate treasury operations settlement efficiency, calculate net business days elapsed between Row 2's issue date (<code>Invoices_Receivable!C2</code>) and settlement payment date (<code>Invoices_Receivable!E2</code>) using <code>=NETWORKDAYS()</code>.",
      targetSheet: "Aging_Portfolio",
      targetCell: "B13",
      expectedFormulaPrefix: "=NETWORKDAYS",
      solution: "=NETWORKDAYS(Invoices_Receivable!C2, Invoices_Receivable!E2)",
      expectedValue: 22,
      tolerance: 0,
      bloom: "analyze",
      difficulty: "medium",
      hint: "Count working days between issue and payment with =NETWORKDAYS(Invoices_Receivable!C2, Invoices_Receivable!E2).",
      check: {
        expected: 22,
        tolerance: 0,
        mustUseAnyOf: ["NETWORKDAYS"],
        mustReference: ["Invoices_Receivable!C2", "Invoices_Receivable!E2"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["C", "E"],
        params: [],
        previewRows: 2,
        summary: "Tallies Monday-Friday business days between May 15 and June 15, 2026 (22 working days)."
      },
      commonMistakes: [
        { mistake: '=Invoices_Receivable!E2-Invoices_Receivable!C2', why: "Subtracting serials counts calendar days (31) instead of business days.", fix: "Use =NETWORKDAYS(Invoices_Receivable!C2, Invoices_Receivable!E2)." }
      ]
    },
    {
      id: "c13",
      number: 13,
      title: "Turnaround Business Days with Bank Holidays (NETWORKDAYS)",
      prompt: "In sheet <code>Aging_Portfolio</code> cell <strong>B14</strong>, to audit exact treasury turnaround days adjusted for federal reserve closures, calculate net business days between Row 2's issue (<code>Invoices_Receivable!C2</code>) and payment (<code>Invoices_Receivable!E2</code>) excluding holidays in <code>Holiday_Calendar!B2:B11</code> using <code>=NETWORKDAYS()</code>.",
      targetSheet: "Aging_Portfolio",
      targetCell: "B14",
      expectedFormulaPrefix: "=NETWORKDAYS",
      solution: "=NETWORKDAYS(Invoices_Receivable!C2, Invoices_Receivable!E2, Holiday_Calendar!B2:B11)",
      expectedValue: 21,
      tolerance: 0,
      bloom: "analyze",
      difficulty: "medium",
      hint: "Exclude bank holidays: =NETWORKDAYS(Invoices_Receivable!C2, Invoices_Receivable!E2, Holiday_Calendar!B2:B11).",
      check: {
        expected: 21,
        tolerance: 0,
        mustUseAnyOf: ["NETWORKDAYS"],
        mustReference: ["Invoices_Receivable!C2", "Invoices_Receivable!E2", "Holiday_Calendar!B2:B11"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["C", "E"],
        params: ["Holidays: Holiday_Calendar!B2:B11"],
        previewRows: 10,
        summary: "Subtracts Memorial Day (May 25) from working days, returning exactly 21 net working days."
      },
      commonMistakes: [
        { mistake: '=NETWORKDAYS(C2, E2) - 1', why: "Hardcoding -1 fails if no holiday actually occurred during that period.", fix: "Reference the official holiday calendar range." }
      ]
    },
    {
      id: "c14",
      number: 14,
      title: "Middle East Branch Turnaround Days (NETWORKDAYS.INTL)",
      prompt: "In sheet <code>Aging_Portfolio</code> cell <strong>B15</strong>, to evaluate cross-border branch operations under non-standard regional workweeks, calculate working days between Row 2's issue (<code>Invoices_Receivable!C2</code>) and payment (<code>Invoices_Receivable!E2</code>) using Sunday-only weekend code <code>11</code> and holidays in <code>Holiday_Calendar!B2:B11</code> via <code>=NETWORKDAYS.INTL()</code>.",
      targetSheet: "Aging_Portfolio",
      targetCell: "B15",
      expectedFormulaPrefix: "=NETWORKDAYS.INTL",
      solution: "=NETWORKDAYS.INTL(Invoices_Receivable!C2, Invoices_Receivable!E2, 11, Holiday_Calendar!B2:B11)",
      expectedValue: 26,
      tolerance: 0,
      bloom: "analyze",
      difficulty: "medium",
      hint: "Use weekend code 11: =NETWORKDAYS.INTL(Invoices_Receivable!C2, Invoices_Receivable!E2, 11, Holiday_Calendar!B2:B11).",
      check: {
        expected: 26,
        tolerance: 0,
        mustUseAnyOf: ["NETWORKDAYS.INTL"],
        mustReference: ["Invoices_Receivable!C2", "Invoices_Receivable!E2", "Holiday_Calendar!B2:B11"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["C", "E"],
        params: ["Weekend Code: 11 (Sunday only)", "Holidays: Holiday_Calendar!B2:B11"],
        previewRows: 10,
        summary: "Calculates working days for a 6-day workweek (Mon-Sat), yielding 26 working days."
      },
      commonMistakes: [
        { mistake: '=NETWORKDAYS(C2, E2, 11)', why: "Standard NETWORKDAYS does not support custom weekend codes.", fix: "Use =NETWORKDAYS.INTL(C2, E2, 11, Holiday_Calendar!B2:B11)." }
      ]
    },
    {
      id: "c15",
      number: 15,
      title: "Loan Financial Tenure Fraction — Actual/Actual (YEARFRAC)",
      prompt: "In sheet <code>Aging_Portfolio</code> cell <strong>B16</strong>, to calculate accrued coupon interest under institutional Actual/Actual day-count standards, compute the annualized fraction between Row 2's issue date (<code>Invoices_Receivable!C2</code>) and valuation date (<code>Aging_Portfolio!$B$2</code>) using <code>=YEARFRAC(..., 1)</code>.",
      targetSheet: "Aging_Portfolio",
      targetCell: "B16",
      expectedFormulaPrefix: "=YEARFRAC",
      solution: "=YEARFRAC(Invoices_Receivable!C2, Aging_Portfolio!$B$2, 1)",
      expectedValue: 0.47,
      tolerance: 0.01,
      bloom: "evaluate",
      difficulty: "hard",
      hint: "Apply Actual/Actual basis: =YEARFRAC(Invoices_Receivable!C2, Aging_Portfolio!$B$2, 1).",
      check: {
        expected: 0.47,
        tolerance: 0.01,
        mustUseAnyOf: ["YEARFRAC"],
        mustReference: ["Invoices_Receivable!C2", "$B$2"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["C"],
        params: ["Valuation Date in $B$2", "Basis: 1 (Actual/Actual)"],
        previewRows: 2,
        summary: "Divides 172 elapsed days by 365, yielding 0.4712 (rounded to 0.47)."
      },
      commonMistakes: [
        { mistake: '=YEARFRAC(C2, $B$2)', why: "Omitting the 3rd argument defaults to basis 0 (30/360) rather than Actual/Actual.", fix: "Specify basis 1: =YEARFRAC(Invoices_Receivable!C2, Aging_Portfolio!$B$2, 1)." }
      ]
    },
    {
      id: "c16",
      number: 16,
      title: "Commercial Paper Fraction — 30/360 US Corporate (YEARFRAC)",
      prompt: "In sheet <code>Aging_Portfolio</code> cell <strong>B17</strong>, to calculate discount commercial paper yields under US Corporate 30/360 bond market convention, compute the annualized tenure between Row 2's issue (<code>Invoices_Receivable!C2</code>) and valuation (<code>Aging_Portfolio!$B$2</code>) using <code>=YEARFRAC(..., 0)</code>.",
      targetSheet: "Aging_Portfolio",
      targetCell: "B17",
      expectedFormulaPrefix: "=YEARFRAC",
      solution: "=YEARFRAC(Invoices_Receivable!C2, Aging_Portfolio!$B$2, 0)",
      expectedValue: 0.48,
      tolerance: 0.01,
      bloom: "evaluate",
      difficulty: "hard",
      hint: "Apply 30/360 US Corporate basis: =YEARFRAC(Invoices_Receivable!C2, Aging_Portfolio!$B$2, 0).",
      check: {
        expected: 0.48,
        tolerance: 0.01,
        mustUseAnyOf: ["YEARFRAC"],
        mustReference: ["Invoices_Receivable!C2", "$B$2"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["C"],
        params: ["Valuation Date in $B$2", "Basis: 0 (30/360 US Corporate)"],
        previewRows: 2,
        summary: "Divides 172 elapsed days by 360, yielding 0.4778 (rounded to 0.48)."
      },
      commonMistakes: [
        { mistake: '=($B$2-C2)/360', why: "Direct division bypasses institutional 30-day month adjustments.", fix: "Use =YEARFRAC(Invoices_Receivable!C2, Aging_Portfolio!$B$2, 0)." }
      ]
    },
    {
      id: "c17",
      number: 17,
      title: "Delinquent Loan Overdue Days (MAX & Serial Arithmetic)",
      prompt: "In sheet <code>Aging_Portfolio</code> cell <strong>B18</strong>, to track delinquency duration for non-performing credit line INV-2004, calculate days past due between valuation date (<code>Aging_Portfolio!$B$2</code>) and due date (<code>Invoices_Receivable!D5</code>), floored at zero using <code>=MAX(0, Aging_Portfolio!$B$2-Invoices_Receivable!D5)</code>.",
      targetSheet: "Aging_Portfolio",
      targetCell: "B18",
      expectedFormulaPrefix: "=MAX",
      solution: "=MAX(0, Aging_Portfolio!$B$2-Invoices_Receivable!D5)",
      expectedValue: 111,
      tolerance: 0,
      bloom: "evaluate",
      difficulty: "hard",
      hint: "Compute non-negative overdue days: =MAX(0, Aging_Portfolio!$B$2 - Invoices_Receivable!D5).",
      check: {
        expected: 111,
        tolerance: 0,
        mustUseAnyOf: ["MAX"],
        mustReference: ["Invoices_Receivable!D5", "$B$2"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["D"],
        params: ["Valuation Date in $B$2 (46329)"],
        previewRows: 5,
        summary: "Calculates 46329 - 46218 = 111 days overdue for delinquent loan INV-2004."
      },
      commonMistakes: [
        { mistake: '=Aging_Portfolio!$B$2-Invoices_Receivable!D5', why: "Without MAX(0, ...), performing loans not yet due would display negative overdue days.", fix: "Wrap in MAX(0, ...)." }
      ]
    },
    {
      id: "c18",
      number: 18,
      title: "Tiered Debt Aging Bracket Classification (IFS)",
      prompt: "In sheet <code>Aging_Portfolio</code> cell <strong>B19</strong>, to categorize default exposure for statutory loan loss provisioning, classify the overdue days in <strong>B18</strong> into aging tiers using <code>=IFS()</code>: if <code>B18>90</code> return <code>\">90 Days\"</code>, if <code>B18>60</code> return <code>\"61-90 Days\"</code>, if <code>B18>30</code> return <code>\"31-60 Days\"</code>, with default condition <code>TRUE</code> returning <code>\"1-30 Days\"</code>.",
      targetSheet: "Aging_Portfolio",
      targetCell: "B19",
      expectedFormulaPrefix: "=IFS",
      solution: '=IFS(B18>90, ">90 Days", B18>60, "61-90 Days", B18>30, "31-60 Days", TRUE, "1-30 Days")',
      expectedValue: ">90 Days",
      tolerance: 0,
      bloom: "create",
      difficulty: "hard",
      hint: 'Evaluate highest threshold first: =IFS(B18>90, ">90 Days", B18>60, "61-90 Days", B18>30, "31-60 Days", TRUE, "1-30 Days").',
      check: {
        expected: ">90 Days",
        tolerance: 0,
        mustUseAnyOf: ["IFS"],
        mustReference: ["B18"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["B"],
        params: ["Tiers: >90, 61-90, 31-60, 1-30"],
        previewRows: 19,
        summary: "Classifies 111 overdue days into the '>90 Days' default risk bucket."
      },
      commonMistakes: [
        { mistake: '=IFS(B18>30, "31-60 Days", B18>60, "61-90 Days", ...)', why: "Ascending conditions catch 111 at >30 first, misclassifying severe debt.", fix: "Order conditions descending: >90, then >60, then >30." }
      ]
    },
    {
      id: "c19",
      number: 19,
      title: "Total Overdue Portfolio Exposure (SUMIFS)",
      prompt: "In sheet <code>Aging_Portfolio</code> cell <strong>B20</strong>, to quantify total credit exposure across non-performing loans for executive risk reporting, sum the invoice amounts in <code>Invoices_Receivable!F2:F25</code> where status in <code>Invoices_Receivable!H2:H25</code> equals <code>\"Overdue\"</code> using <code>=SUMIFS()</code>.",
      targetSheet: "Aging_Portfolio",
      targetCell: "B20",
      expectedFormulaPrefix: "=SUMIFS",
      solution: '=SUMIFS(Invoices_Receivable!F2:F25, Invoices_Receivable!H2:H25, "Overdue")',
      expectedValue: 736500,
      tolerance: 0.1,
      bloom: "create",
      difficulty: "hard",
      hint: 'Sum F where H is "Overdue": =SUMIFS(Invoices_Receivable!F2:F25, Invoices_Receivable!H2:H25, "Overdue").',
      check: {
        expected: 736500,
        tolerance: 0.1,
        mustUseAnyOf: ["SUMIFS"],
        mustReference: ["Invoices_Receivable!F2:F25", "Invoices_Receivable!H2:H25"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["F", "H"],
        params: ["Criteria: 'Overdue'"],
        previewRows: 24,
        summary: "Sums the 9 overdue loans across the 24-row portfolio, totaling $736,500."
      },
      commonMistakes: [
        { mistake: '=SUMIFS(Invoices_Receivable!H2:H25, "Overdue", Invoices_Receivable!F2:F25)', why: "In SUMIFS, the sum_range is the first argument, not the last.", fix: "Place sum_range first: =SUMIFS(F2:F25, H2:H25, \"Overdue\")." }
      ]
    },
    {
      id: "c20",
      number: 20,
      title: "Total Q3 2026 Credit Issued (Two-Sided SUMIFS)",
      prompt: "In sheet <code>Aging_Portfolio</code> cell <strong>B21</strong>, to audit total capital deployed during third-quarter commercial lending operations, sum invoice amounts in <code>Invoices_Receivable!F2:F25</code> where issue date serials in <code>Invoices_Receivable!C2:C25</code> fall between <code>>=46204</code> (2026-07-01) and <code><=46295</code> (2026-09-30) using <code>=SUMIFS()</code>.",
      targetSheet: "Aging_Portfolio",
      targetCell: "B21",
      expectedFormulaPrefix: "=SUMIFS",
      solution: '=SUMIFS(Invoices_Receivable!F2:F25, Invoices_Receivable!C2:C25, ">=46204", Invoices_Receivable!C2:C25, "<=46295")',
      expectedValue: 1370500,
      tolerance: 0.1,
      bloom: "create",
      difficulty: "hard",
      hint: 'Sum F with two-sided date window: =SUMIFS(Invoices_Receivable!F2:F25, Invoices_Receivable!C2:C25, ">=46204", Invoices_Receivable!C2:C25, "<=46295").',
      check: {
        expected: 1370500,
        tolerance: 0.1,
        mustUseAnyOf: ["SUMIFS"],
        mustReference: ["Invoices_Receivable!F2:F25", "Invoices_Receivable!C2:C25"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["C", "F"],
        params: ["Q3 Start: 46204 (2026-07-01)", "Q3 End: 46295 (2026-09-30)"],
        previewRows: 24,
        summary: "Calculates total Q3 debt commitments ($1,370,500) using dual date bounds."
      },
      commonMistakes: [
        { mistake: '=SUMIFS(Invoices_Receivable!F2:F25, Invoices_Receivable!C2:C25, ">=2026-07-01", ...)', why: "Text strings like '2026-07-01' will fail date comparisons against numeric serials.", fix: "Use numeric serials '>=46204' and '<=46295', or construct with DATE()." }
      ]
    }
  ]
};

if (typeof window !== 'undefined' && window.COURSE_DAY === 8) {
  window.EXCEL_COURSE_CONTENT['excelDay01'] = window.EXCEL_COURSE_CONTENT['excelDay08'];
}

