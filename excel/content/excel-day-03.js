// public/excel/content/excel-day-03.js
// Manodemy Excel Studio — Day 03 Curriculum Manifest & Challenges
// Enterprise Domain: NovaCart Global (E-Commerce CRM & Support)
// Conforms to: MISSION SPECIFICATION v3.2 & MASTER ORCHESTRATION v2.1 (Schema v2.1)

if (!window.EXCEL_COURSE_CONTENT) window.EXCEL_COURSE_CONTENT = {};

window.EXCEL_COURSE_CONTENT['excelDay03'] = {
  day: 3,
  globalDay: 21,
  title: "Data Cleaning & Validation",
  description: "Master enterprise data sanitization, stripping non-printable characters with CLEAN(), normalizing whitespace with TRIM(), surgical string replacement via SUBSTITUTE(), casting text numbers to numeric floats with VALUE(), string length audits using LEN(), duplicate remediation, Text-to-Columns, Flash Fill, and bulletproof Data Validation rules.",
  topics: [
    "01. Identifying Dirty Data & Data Cleaning Architecture",
    "02. Stripping Non-Printable ASCII Characters: CLEAN(text)",
    "03. Whitespace Normalization: TRIM(text)",
    "04. Surgical String Replacement: SUBSTITUTE()",
    "05. Converting Text Numbers to Floating Precision: VALUE()",
    "06. String Length Auditing & Integrity: LEN()",
    "07. Deduplication Strategy & Remove Duplicates (Alt+A+M)",
    "08. Delimited Parsing: Text-to-Columns (Alt+A+E)",
    "09. Pattern-Recognition Extraction: Flash Fill (Ctrl+E)",
    "10. Data Validation Rules, Dropdown Lists & Alert Dialogs"
  ],
  slides: [
    {
      title: "Data Cleaning, Deduplication and Data Validation",
      html: `
<section class="slide-section" id="sec01">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingDirtyDataArch">
    <span class="heading-num-box">01</span>
    <span class="heading-title-box">
      <span class="heading-icon">🧹</span>
      <span class="heading-title-text">Identifying Dirty Data &amp; Data Cleaning Architecture</span>
      <button class="audio-play-btn" data-track-idx="0" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p class="lead-text">In enterprise analytics, over 70% of an analyst's pipeline runtime is consumed by data cleaning. Raw data extracted from web forms, SQL dumps, ERP APIs, and legacy CSVs invariably suffers from silent defects: phantom spaces, non-printable control characters, inconsistent casing, and numbers masquerading as strings.</p>
    
    <div class="architecture-grid">
      <div class="arch-box">
        <h4>Whitespace Anomalies</h4>
        <p>Leading, trailing, and double internal spaces that invisibly corrupt <code>XLOOKUP</code>, <code>VLOOKUP</code>, and <code>COUNTIF</code> exact matches.</p>
      </div>
      <div class="arch-box">
        <h4>Non-Printable ASCII</h4>
        <p>Control characters (ASCII 0–31) injected during mainframe exports or web scrapes that break chart rendering and formula parsers.</p>
      </div>
      <div class="arch-box">
        <h4>Type Mismatches</h4>
        <p>Numerical currencies stored as strings (e.g. <code>"$1,250.00"</code>) that evaluate to <code>0</code> when fed into mathematical aggregations.</p>
      </div>
    </div>

    <div class="table-responsive">
      <table class="reference-table">
        <thead>
          <tr>
            <th>Dirty Data Defect</th>
            <th>Underlying Cause</th>
            <th>Downstream Failure</th>
            <th>Production Remediation</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Trailing spaces (<code>"US-EAST "</code>)</td>
            <td>User form submission padding</td>
            <td><code>=XLOOKUP()</code> returns <code>#N/A</code></td>
            <td><code>=TRIM(text)</code></td>
          </tr>
          <tr>
            <td>ASCII control byte (<code>\x07</code>, <code>\x1F</code>)</td>
            <td>Telnet/mainframe buffer export</td>
            <td>Silent pipeline crash / export failure</td>
            <td><code>=CLEAN(text)</code></td>
          </tr>
          <tr>
            <td>String currency (<code>"$1,250.00"</code>)</td>
            <td>Unformatted legacy report dump</td>
            <td><code>=SUM()</code> ignores row completely</td>
            <td><code>=VALUE(text)</code></td>
          </tr>
          <tr>
            <td>Inconsistent casing (<code>"sarah"</code> vs <code>"SARAH"</code>)</td>
            <td>Multiple CRM entry channels</td>
            <td>Fragmented PivotTable grouping</td>
            <td><code>=PROPER(text)</code></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="keynote-box keynote-emerald">
      <strong>Analyst Takeaway:</strong> Clean data is not cosmetic—it is the bedrock of quantitative integrity. Always establish a standardized sanitization layer before building calculations or dashboards.
    </div>

    <div class="anti-pattern-card" style="margin-top:16px; border:1px solid rgba(239,68,68,0.3); border-left:4px solid #ef4444; border-radius:8px; padding:14px 18px; background:rgba(239,68,68,0.08);">
      <h4 style="margin:0 0 8px 0; color:#f87171; font-size:13.5px; font-weight:700;">⚠️ Anti-Pattern vs. Gold Standard Solution</h4>
      <p style="margin:0; font-size:12.5px; line-height:1.5; color:#cbd5e1;">
        <strong>Common Mistake:</strong> Manually editing individual dirty cells by pressing Backspace or deleting spaces by hand across thousands of records.<br>
        <strong>Gold Standard:</strong> Build an automated transformation column utilizing nested sanitization functions (e.g. <code>=TRIM(CLEAN(cell))</code>) and copy formulas across the entire column.
      </p>
    </div>
  </div>
</section>

<section class="slide-section" id="sec02">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingCleanFunction">
    <span class="heading-num-box">02</span>
    <span class="heading-title-box">
      <span class="heading-icon">🧼</span>
      <span class="heading-title-text">Stripping Non-Printable ASCII Characters with CLEAN(text)</span>
      <button class="audio-play-btn" data-track-idx="1" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p class="lead-text">The <code>CLEAN(text)</code> function systematically removes all 32 7-bit ASCII non-printable control characters (character codes <code>0</code> through <code>31</code>) that originate from legacy operating systems, database bulk-loaders, or telecommunication feeds.</p>
    
    <div class="architecture-grid">
      <div class="arch-box">
        <h4>Function Syntax</h4>
        <p><code>=CLEAN(text)</code><br>Takes a single string argument and strips characters like Null (0), Bell (7), Line Feed (10), Carriage Return (13), and Unit Separator (31).</p>
      </div>
      <div class="arch-box">
        <h4>Preserved Characters</h4>
        <p>Standard alphanumeric characters, punctuation, mathematical symbols, and printable spaces (ASCII 32) remain completely intact.</p>
      </div>
      <div class="arch-box">
        <h4>Compound Sanitation</h4>
        <p>Frequently paired as the inner layer of <code>=TRIM(CLEAN(A2))</code> to purge invisible binary noise before normalizing typographical spacing.</p>
      </div>
    </div>

    <div class="keynote-box keynote-emerald">
      <strong>Analyst Takeaway:</strong> Non-printable bytes are invisible to the naked human eye in Excel cells, but they cause character length checks (<code>LEN</code>) to fail and downstream Python or SQL ingest engines to throw encoding errors.
    </div>

    <div class="interview-insight-box" style="margin-top:16px; border:1px solid rgba(14,165,233,0.3); border-left:4px solid #0ea5e9; border-radius:8px; padding:14px 18px; background:rgba(14,165,233,0.08);">
      <h4 style="margin:0 0 8px 0; color:#38bdf8; font-size:13.5px; font-weight:700;">💼 Interview / Production Insight</h4>
      <p style="margin:0; font-size:12.5px; line-height:1.5; color:#cbd5e1;">
        <strong>Interview Question:</strong> <em>"Does CLEAN() remove non-breaking spaces (ASCII 160) common in web scrapes?"</em><br>
        <strong>Staff Analyst Answer:</strong> No. <code>CLEAN()</code> targets ASCII 0–31 exclusively. The HTML non-breaking space (<code>&amp;nbsp;</code> / ASCII 160) must be stripped using <code>=SUBSTITUTE(A2, CHAR(160), " ")</code> followed by <code>=TRIM()</code>. Knowing this boundary separates junior analysts from senior data wranglers.
      </p>
    </div>
  </div>
</section>

<section class="slide-section" id="sec03">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingTrimFunction">
    <span class="heading-num-box">03</span>
    <span class="heading-title-box">
      <span class="heading-icon">✂️</span>
      <span class="heading-title-text">Universal Whitespace Normalization with TRIM(text)</span>
      <button class="audio-play-btn" data-track-idx="2" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p class="lead-text">The <code>TRIM(text)</code> function is the gold standard tool for whitespace sanitization. It removes all leading spaces before the first printable character, all trailing spaces after the final printable character, and compresses any consecutive clusters of internal spaces into a single space.</p>
    
    <div class="architecture-grid">
      <div class="arch-box">
        <h4>Leading Spaces</h4>
        <p>Removes blanks at string start: <code>"  NovaCart"</code> becomes <code>"NovaCart"</code>, fixing broken alphabetical sorting.</p>
      </div>
      <div class="arch-box">
        <h4>Trailing Spaces</h4>
        <p>Removes invisible blanks at end: <code>"ORD-1001 "</code> becomes <code>"ORD-1001"</code>, resolving <code>#N/A</code> lookup mismatches.</p>
      </div>
      <div class="arch-box">
        <h4>Internal Compression</h4>
        <p>Reduces multi-space runs: <code>"Sarah   Jenkins"</code> becomes clean single-spaced <code>"Sarah Jenkins"</code>.</p>
      </div>
    </div>

    <div class="table-responsive">
      <table class="reference-table">
        <thead>
          <tr>
            <th>Raw Input Value</th>
            <th>Raw LEN()</th>
            <th>Formula Applied</th>
            <th>Trimmed Result</th>
            <th>Trimmed LEN()</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>"  Sarah Jenkins  "</code></td>
            <td>17</td>
            <td><code>=TRIM(A2)</code></td>
            <td><code>"Sarah Jenkins"</code></td>
            <td>13</td>
          </tr>
          <tr>
            <td><code>"US-EAST "</code></td>
            <td>8</td>
            <td><code>=TRIM(A3)</code></td>
            <td><code>"US-EAST"</code></td>
            <td>7</td>
          </tr>
          <tr>
            <td><code>"   ORD-1001"</code></td>
            <td>11</td>
            <td><code>=TRIM(A4)</code></td>
            <td><code>"ORD-1001"</code></td>
            <td>8</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="keynote-box keynote-emerald">
      <strong>Analyst Takeaway:</strong> Never perform a lookup on human-entered text without wrapping the lookup vector or key in <code>TRIM()</code>. Trailing spaces account for the vast majority of silent reconciliation mismatches.
    </div>
  </div>
</section>

<section class="slide-section" id="sec04">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingSubstituteFunction">
    <span class="heading-num-box">04</span>
    <span class="heading-title-box">
      <span class="heading-icon">🔄</span>
      <span class="heading-title-text">Surgical String Replacement with SUBSTITUTE()</span>
      <button class="audio-play-btn" data-track-idx="3" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p class="lead-text">The <code>SUBSTITUTE(text, old_text, new_text, [instance_num])</code> function locates specific substrings within a cell and replaces them with new content. Unlike <code>REPLACE()</code> which relies on numerical character indices, <code>SUBSTITUTE()</code> matches content semantically.</p>
    
    <div class="architecture-grid">
      <div class="arch-box">
        <h4>Global Replacement</h4>
        <p>Omitting <code>instance_num</code> replaces every occurrence. E.g. <code>=SUBSTITUTE("800-555-0199", "-", "")</code> yields <code>"8005550199"</code>.</p>
      </div>
      <div class="arch-box">
        <h4>Targeted Instance</h4>
        <p>Specifying <code>instance_num</code> replaces only that occurrence. E.g. replacing only the 1st hyphen or 2nd delimiter in complex SKU codes.</p>
      </div>
      <div class="arch-box">
        <h4>Case Sensitivity</h4>
        <p><code>SUBSTITUTE()</code> is strictly case-sensitive. Replacing <code>"tck#"</code> will not match uppercase <code>"TCK#"</code>.</p>
      </div>
    </div>

    <div class="keynote-box keynote-emerald">
      <strong>Analyst Takeaway:</strong> To strip unwanted characters entirely (such as hash symbols or hyphens), supply an empty string literal <code>""</code> as the <code>new_text</code> argument.
    </div>

    <div class="anti-pattern-card" style="margin-top:16px; border:1px solid rgba(239,68,68,0.3); border-left:4px solid #ef4444; border-radius:8px; padding:14px 18px; background:rgba(239,68,68,0.08);">
      <h4 style="margin:0 0 8px 0; color:#f87171; font-size:13.5px; font-weight:700;">⚠️ Anti-Pattern vs. Gold Standard Solution</h4>
      <p style="margin:0; font-size:12.5px; line-height:1.5; color:#cbd5e1;">
        <strong>Common Mistake:</strong> Confusing <code>SUBSTITUTE()</code> with <code>REPLACE()</code>. <code>REPLACE(text, start, num_chars, new_text)</code> is positional; if ticket IDs vary in length, hardcoded position indices will mutilate ID payloads.<br>
        <strong>Gold Standard:</strong> Use <code>SUBSTITUTE(D2, "#", "-")</code> which searches by token identity regardless of position.
      </p>
    </div>
  </div>
</section>

<section class="slide-section" id="sec05">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingValueFunction">
    <span class="heading-num-box">05</span>
    <span class="heading-title-box">
      <span class="heading-icon">🔢</span>
      <span class="heading-title-text">Converting Text Numbers to Floating Precision with VALUE()</span>
      <button class="audio-play-btn" data-track-idx="4" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p class="lead-text">When transaction reports are exported with currency symbols, thousand commas, or leading apostrophes, Excel often treats them as text strings. Mathematical functions like <code>=SUM()</code> and <code>=AVERAGE()</code> silently ignore text cells, producing misleading zero balances.</p>
    
    <div class="architecture-grid">
      <div class="arch-box">
        <h4>Function Syntax</h4>
        <p><code>=VALUE(text)</code><br>Parses a text representation of a number and converts it into a true floating-point decimal constant.</p>
      </div>
      <div class="arch-box">
        <h4>Currency &amp; Commas</h4>
        <p>Handles common financial formatting tokens: <code>=VALUE("$1,250.00")</code> evaluates cleanly to numeric <code>1250</code>.</p>
      </div>
      <div class="arch-box">
        <h4>Mathematical Coercion</h4>
        <p>Alternative zero-overhead coercion methods include double-unary <code>--A2</code> or adding zero <code>A2+0</code> inside calculation pipelines.</p>
      </div>
    </div>

    <div class="keynote-box keynote-emerald">
      <strong>Analyst Takeaway:</strong> In Excel, pure numbers align to the right by default, while text strings align to the left. If a column of revenue figures is left-aligned, it is stored as text and requires <code>VALUE()</code> remediation!
    </div>
  </div>
</section>

<section class="slide-section" id="sec06">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingLenFunction">
    <span class="heading-num-box">06</span>
    <span class="heading-title-box">
      <span class="heading-icon">📏</span>
      <span class="heading-title-text">String Length Auditing &amp; Integrity Verification with LEN()</span>
      <button class="audio-play-btn" data-track-idx="5" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p class="lead-text">The <code>LEN(text)</code> function returns the exact character count of a text string, including all spaces, punctuation marks, digits, and non-printable bytes. It serves as the primary diagnostic probe for validating data schemas.</p>
    
    <div class="architecture-grid">
      <div class="arch-box">
        <h4>Postal Code Validation</h4>
        <p>Auditing US ZIP codes: <code>=IF(LEN(F2)=5, "Valid", "Invalid")</code> instantly catches missing leading zeros.</p>
      </div>
      <div class="arch-box">
        <h4>Whitespace Detection</h4>
        <p>Comparing raw vs trimmed: <code>=LEN(B2) - LEN(TRIM(B2))</code> calculates exactly how many phantom space characters corrupt cell B2.</p>
      </div>
      <div class="arch-box">
        <h4>Fixed-Width Schema</h4>
        <p>Verifying Order ID conformity: <code>=LEN(A2)=8</code> ensures all records match standard <code>ORD-XXXX</code> specifications.</p>
      </div>
    </div>

    <div class="keynote-box keynote-emerald">
      <strong>Analyst Takeaway:</strong> Combine <code>LEN()</code> with conditional formatting to automatically highlight truncated fields, malformed tax IDs, or corrupted postal codes across million-row enterprise databases.
    </div>
  </div>
</section>

<section class="slide-section" id="sec07">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingDeduplication">
    <span class="heading-num-box">07</span>
    <span class="heading-title-box">
      <span class="heading-icon">👥</span>
      <span class="heading-title-text">Deduplication Strategy: Identify, Flag and Remove Duplicates</span>
      <button class="audio-play-btn" data-track-idx="6" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p class="lead-text">Duplicate records inflate revenues, double-count customer churn, and trigger catastrophic double-dispatch in fulfillment centers. A professional deduplication workflow separates identification from irreversible destruction.</p>
    
    <div class="architecture-grid">
      <div class="arch-box">
        <h4>1. Flag via Formula</h4>
        <p><code>=COUNTIF($A$2:A2, A2) &gt; 1</code><br>Flags duplicate occurrences dynamically while preserving the first master record.</p>
      </div>
      <div class="arch-box">
        <h4>2. Audit Summary</h4>
        <p><code>=COUNTIF(Status, "Duplicate")</code><br>Quantifies error frequency for executive engineering retrospective reports.</p>
      </div>
      <div class="arch-box">
        <h4>3. Safe Purge</h4>
        <p>Use Ribbon <strong>Data &rarr; Remove Duplicates</strong> (<kbd>Alt + A + M</kbd>) on audited key columns after backup verification.</p>
      </div>
    </div>

    <div class="keynote-box keynote-emerald">
      <strong>Analyst Takeaway:</strong> Never click Remove Duplicates on a primary raw dataset without archiving an untampered version. In corporate audits, preserving raw provenance is mandatory.
    </div>
  </div>
</section>

<section class="slide-section" id="sec08">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingTextToColumns">
    <span class="heading-num-box">08</span>
    <span class="heading-title-box">
      <span class="heading-icon">📑</span>
      <span class="heading-title-text">Splitting Delimited Data with Text-to-Columns (Alt + A + E)</span>
      <button class="audio-play-btn" data-track-idx="7" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p class="lead-text">When transactional records bundle multiple attributes into a single string (e.g. <code>"Sarah Jenkins | US-EAST | TCK#8821"</code>), the <strong>Text-to-Columns</strong> wizard (<kbd>Alt + A + E</kbd>) splits content across adjacent columns using delimiters.</p>
    
    <div class="architecture-grid">
      <div class="arch-box">
        <h4>Delimited Mode</h4>
        <p>Splits data by character boundaries: commas, tabs, semicolons, hyphens, or custom symbols like pipes (<code>|</code>).</p>
      </div>
      <div class="arch-box">
        <h4>Fixed-Width Mode</h4>
        <p>Splits text by uniform character column positions, essential for fixed-width mainframe accounting exports.</p>
      </div>
      <div class="arch-box">
        <h4>Destination Safety</h4>
        <p>Always designate an empty target range or insert blank columns to avoid overwriting existing data columns!</p>
      </div>
    </div>

    <div class="keynote-box keynote-emerald">
      <strong>Analyst Takeaway:</strong> Text-to-Columns also features an advanced data type converter: selecting a column in Step 3 and choosing "Text" preserves leading zeros in postal codes and phone numbers!
    </div>
  </div>
</section>

<section class="slide-section" id="sec09">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingFlashFill">
    <span class="heading-num-box">09</span>
    <span class="heading-title-box">
      <span class="heading-icon">⚡</span>
      <span class="heading-title-text">Pattern-Recognition Extraction via Flash Fill (Ctrl + E)</span>
      <button class="audio-play-btn" data-track-idx="8" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p class="lead-text">Introduced into Excel's calculation engine via sophisticated machine learning pattern recognition, <strong>Flash Fill</strong> (<kbd>Ctrl + E</kbd>) senses the analyst's extraction intent after a single typed exemplar and extrapolates across the entire column.</p>
    
    <div class="architecture-grid">
      <div class="arch-box">
        <h4>Name Extraction</h4>
        <p>Type <code>"Sarah"</code> in adjacent column and press <kbd>Ctrl + E</kbd> to instantly extract first names from full names.</p>
      </div>
      <div class="arch-box">
        <h4>Domain Extraction</h4>
        <p>Extract domain components from emails: typing <code>"novacart.com"</code> auto-populates all subsequent rows.</p>
      </div>
      <div class="arch-box">
        <h4>Reformatting</h4>
        <p>Combine and reformat: typing <code>"Jenkins, S."</code> converts standard name orders into formal directory listings.</p>
      </div>
    </div>

    <div class="keynote-box keynote-emerald">
      <strong>Analyst Takeaway:</strong> Flash Fill generates static text constants, not dynamic formulas. If the underlying data changes, Flash Fill values will not auto-update. Use formulas for live models and Flash Fill for rapid ad-hoc prep.
    </div>
  </div>
</section>

<section class="slide-section" id="sec10">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingDataValidation">
    <span class="heading-num-box">10</span>
    <span class="heading-title-box">
      <span class="heading-icon">🛡️</span>
      <span class="heading-title-text">Data Validation Rules: In-Cell Dropdowns, Constraints &amp; Alerts</span>
      <button class="audio-play-btn" data-track-idx="9" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p class="lead-text">Prevention is infinitely cheaper than remediation. <strong>Data Validation</strong> (<kbd>Alt + A + V + V</kbd>) locks down input cells, restricting user entries to sanctioned lists, bounded numerical ranges, and strict date spans while intercepting illegal inputs with custom error dialogs.</p>
    
    <div class="architecture-grid">
      <div class="arch-box">
        <h4>Dropdown Lists</h4>
        <p>Restrict entries to a master list: <code>=Region_Codes!$A$2:$A$8</code> prevents typos like <code>"USEAST"</code> or <code>"US_EAST"</code>.</p>
      </div>
      <div class="arch-box">
        <h4>Whole Number Bounds</h4>
        <p>Enforce operational boundaries: e.g. minimum order quantity <code>1</code> and maximum batch size <code>100</code>.</p>
      </div>
      <div class="arch-box">
        <h4>Error Alert Styles</h4>
        <p><strong>Stop:</strong> Completely blocks entry.<br><strong>Warning:</strong> Flags entry with override option.<br><strong>Information:</strong> Notifies user only.</p>
      </div>
    </div>

    <div class="table-responsive">
      <table class="reference-table">
        <thead>
          <tr>
            <th>Validation Rule Type</th>
            <th>Configuration Criteria</th>
            <th>Input Protection Goal</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>List</td>
            <td><code>=Region_Codes!$A$2:$A$8</code></td>
            <td>Guarantees 100% referential integrity for downstream <code>XLOOKUP</code></td>
          </tr>
          <tr>
            <td>Whole Number</td>
            <td>Between <code>1</code> and <code>100</code></td>
            <td>Prevents negative quantities and accidental catastrophic fat-finger entries</td>
          </tr>
          <tr>
            <td>Text Length</td>
            <td>Equal to <code>5</code></td>
            <td>Ensures strict ZIP code formatting compliance</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="keynote-box keynote-emerald">
      <strong>Analyst Takeaway:</strong> In enterprise templates, always couple In-Cell Dropdown Lists with a "Stop" alert style. This guarantees that only clean, normalized data enters your transactional pipeline.
    </div>
  </div>
</section>
`
    }
  ],

  // ═══════════════ CANONICAL SEED WORKBOOK: NOVACART GLOBAL ═══════════════
  initialWorkbook: {
    "Customer_Orders_Raw": [
      ["Order ID", "Customer Name", "Email Address", "Support Ticket", "Order Amount Text", "Postal Code", "Region Code", "Order Status", "Item Qty", "Discount Code"],
      ["ORD-1001", "  Sarah Jenkins  ", "sarah.j@novacart.com", "TCK#8821", "$1,250.00", "94103", "US-EAST", "Completed", 3, "SAVE10"],
      ["ORD-1002", "David Miller\x07", "david.m@novacart.com", "TCK#9402", "$450.50", "07030", "US-WEST", "Completed", 1, ""],
      ["ORD-1003", "emily watson", "emily.w@novacart.com", "TCK#7120", "$820.00", "10001", "EU-NORTH", "Pending", 2, "VIP20"],
      ["ORD-1004", "Michael Chang", "mchang@novacart.com", "TCK#3310", "$2,100.00", "94103", "APAC-SO", "Duplicate", 4, ""],
      ["ORD-1005", "  Marcus Thorne\x1F  ", "m.thorne@novacart.com", "TCK#4491", "$150.00", "60601", "US-CENTRAL", "Completed", 1, "SAVE5"],
      ["ORD-1006", "sophia martinez", "sophia.m@novacart.com", "TCK#5512", "$3,400.00", "75001", "US-EAST", "Completed", 6, "PROMO15"],
      ["ORD-1007", "James O'Connor", "joconnor@novacart.com", "TCK#6623", "$675.25", "98101", "US-WEST", "Completed", 2, ""],
      ["ORD-1008", "Amina Al-Mansoor", "amina.m@novacart.com", "TCK#7734", "$1,890.00", "94103", "EU-WEST", "Pending", 3, "GLOBAL10"],
      ["ORD-1009", "  Liam Henderson  ", "l.henderson@novacart.com", "TCK#8845", "$95.00", "30301", "US-EAST", "Completed", 1, ""],
      ["ORD-1010", "Chloe Bennett", "c.bennett@novacart.com", "TCK#9956", "$1,420.00", "02108", "US-CENTRAL", "Completed", 2, "SAVE10"],
      ["ORD-1011", "Lucas Silva\x02", "lsilva@novacart.com", "TCK#1167", "$530.00", "90001", "APAC-NE", "Completed", 1, ""],
      ["ORD-1012", "Isabella Rossi", "i.rossi@novacart.com", "TCK#2278", "$760.00", "10002", "EU-NORTH", "Refunded", 2, ""],
      ["ORD-1013", "Alexander Wright", "a.wright@novacart.com", "TCK#3389", "$2,850.00", "94103", "US-WEST", "Completed", 5, "VIP20"],
      ["ORD-1014", "Mei-Ling Zhao", "mlzhao@novacart.com", "TCK#4401", "$1,120.00", "98102", "APAC-SO", "Completed", 2, "SAVE10"],
      ["ORD-1015", "Daniel Kim", "d.kim@novacart.com", "TCK#5513", "$340.00", "60602", "US-CENTRAL", "Pending", 1, ""],
      ["ORD-1016", "  Olivia Taylor  ", "olivia.t@novacart.com", "TCK#6624", "$980.00", "07031", "US-EAST", "Completed", 2, "SUMMER15"],
      ["ORD-1017", "Ethan Brooks", "e.brooks@novacart.com", "TCK#7735", "$610.00", "75002", "US-WEST", "Completed", 1, ""],
      ["ORD-1018", "Fatima Zahra", "f.zahra@novacart.com", "TCK#8846", "$4,150.00", "10003", "EU-WEST", "Completed", 8, "CORP25"],
      ["ORD-1019", "Noah Robinson", "n.robinson@novacart.com", "TCK#9957", "$220.00", "94103", "US-EAST", "Duplicate", 1, ""],
      ["ORD-1020", "Ava Patel", "ava.patel@novacart.com", "TCK#1068", "$1,640.00", "30302", "APAC-NE", "Completed", 3, "SAVE10"],
      ["ORD-1021", "Benjamin Walker", "b.walker@novacart.com", "TCK#2179", "$890.00", "02109", "US-CENTRAL", "Completed", 2, ""],
      ["ORD-1022", "Mia Tanaka", "m.tanaka@novacart.com", "TCK#3280", "$1,350.00", "90002", "APAC-SO", "Refunded", 2, ""],
      ["ORD-1023", "William Harris", "w.harris@novacart.com", "TCK#4391", "$510.00", "98103", "US-WEST", "Completed", 1, "WELCOME"],
      ["ORD-1024", "Charlotte King", "c.king@novacart.com", "TCK#5402", "$2,200.00", "60603", "EU-NORTH", "Completed", 4, "VIP20"],
      ["ORD-1025", "Henry Scott", "h.scott@novacart.com", "TCK#6513", "$375.00", "10004", "US-EAST", "Completed", 1, ""]
    ],
    "Region_Codes": [
      ["Region Code", "Region Name", "Regional Lead", "SLA Response Hours", "Active Status"],
      ["US-EAST", "North America East", "Marcus Thorne", 24, "Active"],
      ["US-WEST", "North America West", "Elena Rostova", 24, "Active"],
      ["US-CENTRAL", "North America Central", "Chloe Bennett", 48, "Active"],
      ["EU-NORTH", "Europe Northern", "Lukas Weber", 24, "Active"],
      ["EU-WEST", "Europe Western", "Amelie Dubois", 48, "Active"],
      ["APAC-SO", "Asia Pacific South", "Rajesh Kumar", 12, "Active"],
      ["APAC-NE", "Asia Pacific North", "Mei Ling", 12, "Active"]
    ],
    "Cleaning_Practice": [
      ["Audit KPI Metric", "Cleaned Value / Formula Answer", "Data Quality Standard"],
      ["Cleaned Customer Name 1 (TRIM)", "", "Strip leading/trailing whitespace"],
      ["Cleaned Customer Name 2 (CLEAN)", "", "Remove ASCII control characters"],
      ["Normalized Case Name 3 (PROPER)", "", "Apply title casing standard"],
      ["Order ID Character Length (LEN)", "", "Verify 8-character format"],
      ["Numeric Order Amount (VALUE)", "", "Convert currency string to numeric"],
      ["Clean Support Ticket ID (SUBSTITUTE)", "", "Replace '#' with '-' delimiter"],
      ["Fully Sanitized Name 5 (TRIM+CLEAN)", "", "Strip spaces and control characters"],
      ["Standardized Support Prefix (SUBSTITUTE)", "", "Replace 'TCK#' with 'SUPPORT-'"],
      ["Sanitized Name Character Length (LEN)", "", "Audited character count"],
      ["SF Warehouse Orders Count (COUNTIF)", "", "Postal code 94103 count"],
      ["Duplicate Orders Flagged (COUNTIF)", "", "Deduplication audit count"],
      ["Clean Completed Orders (COUNTIF)", "", "Verified completed orders"],
      ["Completed Orders Total Units (SUMIF)", "", "Total items shipped"],
      ["Regional Territory Name (XLOOKUP)", "", "Master region description"],
      ["Regional Support Director (XLOOKUP)", "", "Escalation contact lead"],
      ["SLA Response Target Hours (XLOOKUP)", "", "Guaranteed SLA turnaround"],
      ["Postal Code Format Audit (IF+LEN)", "", "Flag valid 5-digit zip code"],
      ["Region Authorization Audit (IF+COUNTIF)", "", "Verify against Region_Codes master"],
      ["Item Quantity Bounds Audit (IF+AND)", "", "Verify 1 to 100 whole number range"],
      ["Consolidated Dispatch Tag (TEXTJOIN)", "", "Structured audit pipeline string"]
    ]
  },

  initialAuxiliary: {
    "Customer_Orders_Raw": {
      "L1": "Deduplication Key", "L2": "Clean Pipeline V2"
    }
  },

  // ═══════════════ 20 CHALLENGES (SCHEMA v2.1) ═══════════════
  challenges: [
    // ── 6 EASY CHALLENGES (c01 - c06) ─────────────────────────────────────────
    {
      id: "c01",
      number: 1,
      title: "Cleaned Customer Name 1 (TRIM)",
      prompt: "To sanitize messy customer CRM entries by stripping extraneous leading and trailing whitespace, navigate to sheet <code>Cleaning_Practice</code> cell <strong>B2</strong> and write a formula using <code>=TRIM()</code> referencing dirty name cell <code>Customer_Orders_Raw!B2</code> via <code>=TRIM(Customer_Orders_Raw!B2)</code>.",
      targetSheet: "Cleaning_Practice",
      targetCell: "B2",
      solution: "=TRIM(Customer_Orders_Raw!B2)",
      expectedFormulaPrefix: "=TRIM",
      expectedValue: "Sarah Jenkins",
      tolerance: 0,
      hint: "Use =TRIM(Customer_Orders_Raw!B2)",
      difficulty: "easy",
      bloom: "apply",
      xp: 75,
      marks: 1.0,
      check: {
        expected: "Sarah Jenkins",
        tolerance: 0,
        mustUseAnyOf: [["TRIM"]],
        mustReference: ["Customer_Orders_Raw!B2"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=\"Sarah Jenkins\"$", message: "Do not hardcode the string. Reference cell Customer_Orders_Raw!B2 using TRIM()." }
      ],
      dataScope: {
        cols: ["B"],
        params: [],
        previewRows: 1,
        summary: "Purges phantom leading and trailing blanks from Sarah Jenkins."
      }
    },
    {
      id: "c02",
      number: 2,
      title: "Cleaned Customer Name 2 (CLEAN)",
      prompt: "To purge non-printable ASCII system control bytes from ingested web order records, navigate to sheet <code>Cleaning_Practice</code> cell <strong>B3</strong> and write a data cleaning formula using <code>=CLEAN()</code> referencing dirty name cell <code>Customer_Orders_Raw!B3</code> via <code>=CLEAN(Customer_Orders_Raw!B3)</code>.",
      targetSheet: "Cleaning_Practice",
      targetCell: "B3",
      solution: "=CLEAN(Customer_Orders_Raw!B3)",
      expectedFormulaPrefix: "=CLEAN",
      expectedValue: "David Miller",
      tolerance: 0,
      hint: "Use =CLEAN(Customer_Orders_Raw!B3)",
      difficulty: "easy",
      bloom: "apply",
      xp: 75,
      marks: 1.0,
      check: {
        expected: "David Miller",
        tolerance: 0,
        mustUseAnyOf: [["CLEAN"]],
        mustReference: ["Customer_Orders_Raw!B3"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=\"David Miller\"$", message: "Do not hardcode the string. Reference Customer_Orders_Raw!B3 using CLEAN()." }
      ],
      dataScope: {
        cols: ["B"],
        params: [],
        previewRows: 1,
        summary: "Strips hidden Bell control byte from David Miller."
      }
    },
    {
      id: "c03",
      number: 3,
      title: "Normalized Proper Case Name 3 (PROPER)",
      prompt: "To standardize inconsistent customer name casing into executive-ready Title Case format, navigate to sheet <code>Cleaning_Practice</code> cell <strong>B4</strong> and write a text formatting formula using <code>=PROPER()</code> referencing lowercase name cell <code>Customer_Orders_Raw!B4</code> via <code>=PROPER(Customer_Orders_Raw!B4)</code>.",
      targetSheet: "Cleaning_Practice",
      targetCell: "B4",
      solution: "=PROPER(Customer_Orders_Raw!B4)",
      expectedFormulaPrefix: "=PROPER",
      expectedValue: "Emily Watson",
      tolerance: 0,
      hint: "Use =PROPER(Customer_Orders_Raw!B4)",
      difficulty: "easy",
      bloom: "apply",
      xp: 75,
      marks: 1.0,
      check: {
        expected: "Emily Watson",
        tolerance: 0,
        mustUseAnyOf: [["PROPER"]],
        mustReference: ["Customer_Orders_Raw!B4"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=\"Emily Watson\"$", message: "Do not hardcode the name. Reference Customer_Orders_Raw!B4 using PROPER()." }
      ],
      dataScope: {
        cols: ["B"],
        params: [],
        previewRows: 1,
        summary: "Capitalizes the first letter of each name component."
      }
    },
    {
      id: "c04",
      number: 4,
      title: "Order ID Character Length (LEN)",
      prompt: "To audit transaction schema conformity and verify the 8-character string length requirement for Order IDs, navigate to sheet <code>Cleaning_Practice</code> cell <strong>B5</strong> and write an audit formula using <code>=LEN()</code> referencing Order ID cell <code>Customer_Orders_Raw!A2</code> via <code>=LEN(Customer_Orders_Raw!A2)</code>.",
      targetSheet: "Cleaning_Practice",
      targetCell: "B5",
      solution: "=LEN(Customer_Orders_Raw!A2)",
      expectedFormulaPrefix: "=LEN",
      expectedValue: 8,
      tolerance: 0,
      hint: "Use =LEN(Customer_Orders_Raw!A2)",
      difficulty: "easy",
      bloom: "apply",
      xp: 75,
      marks: 1.0,
      check: {
        expected: 8,
        tolerance: 0,
        mustUseAnyOf: [["LEN"]],
        mustReference: ["Customer_Orders_Raw!A2"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=8$", message: "Do not hardcode 8. Reference Customer_Orders_Raw!A2 using LEN()." }
      ],
      dataScope: {
        cols: ["A"],
        params: [],
        previewRows: 1,
        summary: "Verifies 8-character schema conformity for ORD-1001."
      }
    },
    {
      id: "c05",
      number: 5,
      title: "Numeric Order Amount (VALUE)",
      prompt: "To convert raw e-commerce currency text strings into true calculable numeric values for financial modeling, navigate to sheet <code>Cleaning_Practice</code> cell <strong>B6</strong> and write a type conversion formula using <code>=VALUE()</code> referencing formatted text cell <code>Customer_Orders_Raw!E2</code> via <code>=VALUE(Customer_Orders_Raw!E2)</code>.",
      targetSheet: "Cleaning_Practice",
      targetCell: "B6",
      solution: "=VALUE(Customer_Orders_Raw!E2)",
      expectedFormulaPrefix: "=VALUE",
      expectedValue: 1250,
      tolerance: 0.1,
      hint: "Use =VALUE(Customer_Orders_Raw!E2)",
      difficulty: "easy",
      bloom: "apply",
      xp: 75,
      marks: 1.0,
      check: {
        expected: 1250,
        tolerance: 0.1,
        mustUseAnyOf: [["VALUE"]],
        mustReference: ["Customer_Orders_Raw!E2"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=1250$", message: "Do not hardcode 1250. Parse cell Customer_Orders_Raw!E2 with VALUE()." }
      ],
      dataScope: {
        cols: ["E"],
        params: [],
        previewRows: 1,
        summary: "Transforms formatted string '$1,250.00' into calculable integer 1250."
      }
    },
    {
      id: "c06",
      number: 6,
      title: "Clean Support Ticket ID (SUBSTITUTE)",
      prompt: "To reformat legacy customer support ticket delimiters into standardized hyphenated tokens, navigate to sheet <code>Cleaning_Practice</code> cell <strong>B7</strong> and write a text replacement formula using <code>=SUBSTITUTE()</code> replacing <code>\"#\"</code> with <code>\"-\"</code> in support ticket cell <code>Customer_Orders_Raw!D2</code> via <code>=SUBSTITUTE(Customer_Orders_Raw!D2, \"#\", \"-\")</code>.",
      targetSheet: "Cleaning_Practice",
      targetCell: "B7",
      solution: '=SUBSTITUTE(Customer_Orders_Raw!D2, "#", "-")',
      expectedFormulaPrefix: "=SUBSTITUTE",
      expectedValue: "TCK-8821",
      tolerance: 0,
      hint: 'Use =SUBSTITUTE(Customer_Orders_Raw!D2, "#", "-")',
      difficulty: "easy",
      bloom: "apply",
      xp: 75,
      marks: 1.0,
      check: {
        expected: "TCK-8821",
        tolerance: 0,
        mustUseAnyOf: [["SUBSTITUTE"]],
        mustReference: ["Customer_Orders_Raw!D2"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=\"TCK-8821\"$", message: "Do not hardcode the string. Use SUBSTITUTE on Customer_Orders_Raw!D2." }
      ],
      dataScope: {
        cols: ["D"],
        params: ['"#" -> "-"'],
        previewRows: 1,
        summary: "Normalizes support ticket prefix from TCK#8821 to TCK-8821."
      }
    },

    // ── 8 MEDIUM CHALLENGES (c07 - c14) ─────────────────────────────────────────
    {
      id: "c07",
      number: 7,
      title: "Fully Sanitized Name 5 (TRIM + CLEAN)",
      prompt: "To execute a two-stage data sanitization pipeline stripping both hidden ASCII control bytes and phantom whitespace, navigate to sheet <code>Cleaning_Practice</code> cell <strong>B8</strong> and write a nested formula combining <code>=TRIM()</code> and <code>=CLEAN()</code> referencing dirty cell <code>Customer_Orders_Raw!B6</code> via <code>=TRIM(CLEAN(Customer_Orders_Raw!B6))</code>.",
      targetSheet: "Cleaning_Practice",
      targetCell: "B8",
      solution: "=TRIM(CLEAN(Customer_Orders_Raw!B6))",
      expectedFormulaPrefix: "=TRIM",
      expectedValue: "Marcus Thorne",
      tolerance: 0,
      hint: "Use =TRIM(CLEAN(Customer_Orders_Raw!B6))",
      difficulty: "medium",
      bloom: "apply",
      xp: 75,
      marks: 1.0,
      check: {
        expected: "Marcus Thorne",
        tolerance: 0,
        mustUseAnyOf: [["TRIM"], ["CLEAN"]],
        mustReference: ["Customer_Orders_Raw!B6"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=\"Marcus Thorne\"$", message: "Do not hardcode. Use nested =TRIM(CLEAN(Customer_Orders_Raw!B6))." }
      ],
      dataScope: {
        cols: ["B"],
        params: [],
        previewRows: 1,
        summary: "Compound sanitization stripping ASCII 31 control bytes and surrounding blanks."
      }
    },
    {
      id: "c08",
      number: 8,
      title: "Standardized Support Prefix (SUBSTITUTE)",
      prompt: "To migrate legacy ticket codes to enterprise CRM taxonomy by replacing prefix <code>\"TCK#\"</code> with <code>\"SUPPORT-\"</code>, navigate to sheet <code>Cleaning_Practice</code> cell <strong>B9</strong> and write a replacement formula using <code>=SUBSTITUTE()</code> referencing ticket cell <code>Customer_Orders_Raw!D3</code> via <code>=SUBSTITUTE(Customer_Orders_Raw!D3, \"TCK#\", \"SUPPORT-\")</code>.",
      targetSheet: "Cleaning_Practice",
      targetCell: "B9",
      solution: '=SUBSTITUTE(Customer_Orders_Raw!D3, "TCK#", "SUPPORT-")',
      expectedFormulaPrefix: "=SUBSTITUTE",
      expectedValue: "SUPPORT-9402",
      tolerance: 0,
      hint: 'Use =SUBSTITUTE(Customer_Orders_Raw!D3, "TCK#", "SUPPORT-")',
      difficulty: "medium",
      bloom: "apply",
      xp: 75,
      marks: 1.0,
      check: {
        expected: "SUPPORT-9402",
        tolerance: 0,
        mustUseAnyOf: [["SUBSTITUTE"]],
        mustReference: ["Customer_Orders_Raw!D3"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=\"SUPPORT-9402\"$", message: "Do not hardcode. Use SUBSTITUTE on Customer_Orders_Raw!D3." }
      ],
      dataScope: {
        cols: ["D"],
        params: ['"TCK#" -> "SUPPORT-"'],
        previewRows: 1,
        summary: "Replaces legacy shorthand prefix with enterprise CRM standard."
      }
    },
    {
      id: "c09",
      number: 9,
      title: "Sanitized Name Character Length (LEN of TRIM)",
      prompt: "To measure true sanitized customer name character length excluding phantom spaces for database schema sizing, navigate to sheet <code>Cleaning_Practice</code> cell <strong>B10</strong> and write a nested audit formula using <code>=LEN()</code> and <code>=TRIM()</code> referencing customer name cell <code>Customer_Orders_Raw!B2</code> via <code>=LEN(TRIM(Customer_Orders_Raw!B2))</code>.",
      targetSheet: "Cleaning_Practice",
      targetCell: "B10",
      solution: "=LEN(TRIM(Customer_Orders_Raw!B2))",
      expectedFormulaPrefix: "=LEN",
      expectedValue: 13,
      tolerance: 0,
      hint: "Use =LEN(TRIM(Customer_Orders_Raw!B2))",
      difficulty: "medium",
      bloom: "analyze",
      xp: 75,
      marks: 1.0,
      check: {
        expected: 13,
        tolerance: 0,
        mustUseAnyOf: [["LEN"], ["TRIM"]],
        mustReference: ["Customer_Orders_Raw!B2"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=13$", message: "Do not hardcode 13. Write =LEN(TRIM(Customer_Orders_Raw!B2))." }
      ],
      dataScope: {
        cols: ["B"],
        params: [],
        previewRows: 1,
        summary: "Measures cleaned name length, excluding phantom space characters."
      }
    },
    {
      id: "c10",
      number: 10,
      title: "SF Warehouse Orders Count (COUNTIF)",
      prompt: "To audit regional dispatch volume destined for the San Francisco fulfillment hub, navigate to sheet <code>Cleaning_Practice</code> cell <strong>B11</strong> and write a formula using <code>=COUNTIF()</code> evaluating postal code range <code>Customer_Orders_Raw!F2:F26</code> for criterion <code>\"94103\"</code> via <code>=COUNTIF(Customer_Orders_Raw!F2:F26, \"94103\")</code>.",
      targetSheet: "Cleaning_Practice",
      targetCell: "B11",
      solution: '=COUNTIF(Customer_Orders_Raw!F2:F26, "94103")',
      expectedFormulaPrefix: "=COUNTIF",
      expectedValue: 5,
      tolerance: 0,
      hint: 'Use =COUNTIF(Customer_Orders_Raw!F2:F26, "94103")',
      difficulty: "medium",
      bloom: "apply",
      xp: 75,
      marks: 1.0,
      check: {
        expected: 5,
        tolerance: 0,
        mustUseAnyOf: [["COUNTIF"]],
        mustReference: ["Customer_Orders_Raw!F2:F26"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=5$", message: "Do not hardcode 5. Write =COUNTIF(Customer_Orders_Raw!F2:F26, \"94103\")." }
      ],
      dataScope: {
        cols: ["F"],
        params: ['Zip "94103"'],
        previewRows: 25,
        summary: "Audits dispatch frequency for Bay Area warehouse queue."
      }
    },
    {
      id: "c11",
      number: 11,
      title: "Duplicate Orders Flagged (COUNTIF)",
      prompt: "To quantify duplicate order submissions requiring automated cancellation and queue purging, navigate to sheet <code>Cleaning_Practice</code> cell <strong>B12</strong> and write a formula using <code>=COUNTIF()</code> evaluating order status range <code>Customer_Orders_Raw!H2:H26</code> for criterion <code>\"Duplicate\"</code> via <code>=COUNTIF(Customer_Orders_Raw!H2:H26, \"Duplicate\")</code>.",
      targetSheet: "Cleaning_Practice",
      targetCell: "B12",
      solution: '=COUNTIF(Customer_Orders_Raw!H2:H26, "Duplicate")',
      expectedFormulaPrefix: "=COUNTIF",
      expectedValue: 2,
      tolerance: 0,
      hint: 'Use =COUNTIF(Customer_Orders_Raw!H2:H26, "Duplicate")',
      difficulty: "medium",
      bloom: "analyze",
      xp: 75,
      marks: 1.0,
      check: {
        expected: 2,
        tolerance: 0,
        mustUseAnyOf: [["COUNTIF"]],
        mustReference: ["Customer_Orders_Raw!H2:H26"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=2$", message: "Do not hardcode 2. Write =COUNTIF(Customer_Orders_Raw!H2:H26, \"Duplicate\")." }
      ],
      dataScope: {
        cols: ["H"],
        params: ['Status "Duplicate"'],
        previewRows: 25,
        summary: "Quantifies duplicate transaction volume requiring purge."
      }
    },
    {
      id: "c12",
      number: 12,
      title: "Clean Completed Orders (COUNTIF)",
      prompt: "To tally clean non-duplicate fulfilled shipments for operational throughput reporting, navigate to sheet <code>Cleaning_Practice</code> cell <strong>B13</strong> and write a formula using <code>=COUNTIF()</code> evaluating status range <code>Customer_Orders_Raw!H2:H26</code> for criterion <code>\"Completed\"</code> via <code>=COUNTIF(Customer_Orders_Raw!H2:H26, \"Completed\")</code>.",
      targetSheet: "Cleaning_Practice",
      targetCell: "B13",
      solution: '=COUNTIF(Customer_Orders_Raw!H2:H26, "Completed")',
      expectedFormulaPrefix: "=COUNTIF",
      expectedValue: 18,
      tolerance: 0,
      hint: 'Use =COUNTIF(Customer_Orders_Raw!H2:H26, "Completed")',
      difficulty: "medium",
      bloom: "apply",
      xp: 75,
      marks: 1.0,
      check: {
        expected: 18,
        tolerance: 0,
        mustUseAnyOf: [["COUNTIF"]],
        mustReference: ["Customer_Orders_Raw!H2:H26"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=18$", message: "Do not hardcode 18. Write =COUNTIF(Customer_Orders_Raw!H2:H26, \"Completed\")." }
      ],
      dataScope: {
        cols: ["H"],
        params: ['Status "Completed"'],
        previewRows: 25,
        summary: "Filters verified non-duplicate active orders."
      }
    },
    {
      id: "c13",
      number: 13,
      title: "Completed Orders Total Units (SUMIF)",
      prompt: "To aggregate total merchandise units shipped across all verified and completed customer transactions, navigate to sheet <code>Cleaning_Practice</code> cell <strong>B14</strong> and write a formula using <code>=SUMIF()</code> evaluating status range <code>Customer_Orders_Raw!H2:H26</code> for criterion <code>\"Completed\"</code> and summing item quantities in <code>Customer_Orders_Raw!I2:I26</code> via <code>=SUMIF(Customer_Orders_Raw!H2:H26, \"Completed\", Customer_Orders_Raw!I2:I26)</code>.",
      targetSheet: "Cleaning_Practice",
      targetCell: "B14",
      solution: '=SUMIF(Customer_Orders_Raw!H2:H26, "Completed", Customer_Orders_Raw!I2:I26)',
      expectedFormulaPrefix: "=SUMIF",
      expectedValue: 46,
      tolerance: 0.1,
      hint: 'Use =SUMIF(Customer_Orders_Raw!H2:H26, "Completed", Customer_Orders_Raw!I2:I26)',
      difficulty: "medium",
      bloom: "evaluate",
      xp: 75,
      marks: 1.0,
      check: {
        expected: 46,
        tolerance: 0.1,
        mustUseAnyOf: [["SUMIF"]],
        mustReference: ["Customer_Orders_Raw!H2:H26", "Customer_Orders_Raw!I2:I26"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=46$", message: "Do not hardcode 46. Write =SUMIF(Customer_Orders_Raw!H2:H26, \"Completed\", Customer_Orders_Raw!I2:I26)." }
      ],
      dataScope: {
        cols: ["H", "I"],
        params: ['Status "Completed"'],
        previewRows: 25,
        summary: "Aggregates shipped volume for clean records only."
      }
    },
    {
      id: "c14",
      number: 14,
      title: "Regional Territory Name (XLOOKUP)",
      prompt: "To resolve abbreviated regional shipping codes into full geographical territory names, navigate to sheet <code>Cleaning_Practice</code> cell <strong>B15</strong> and write a lookup formula using <code>=XLOOKUP()</code> matching order region code in <code>Customer_Orders_Raw!G2</code> against master codes in <code>Region_Codes!A2:A8</code> and returning the territory name from <code>Region_Codes!B2:B8</code> via <code>=XLOOKUP(Customer_Orders_Raw!G2, Region_Codes!A2:A8, Region_Codes!B2:B8)</code>.",
      targetSheet: "Cleaning_Practice",
      targetCell: "B15",
      solution: "=XLOOKUP(Customer_Orders_Raw!G2, Region_Codes!A2:A8, Region_Codes!B2:B8)",
      expectedFormulaPrefix: "=XLOOKUP",
      expectedValue: "North America East",
      tolerance: 0,
      hint: "Use =XLOOKUP(Customer_Orders_Raw!G2, Region_Codes!A2:A8, Region_Codes!B2:B8)",
      difficulty: "medium",
      bloom: "evaluate",
      xp: 75,
      marks: 1.0,
      check: {
        expected: "North America East",
        tolerance: 0,
        mustUseAnyOf: [["XLOOKUP"]],
        mustReference: ["Customer_Orders_Raw!G2", "Region_Codes!A2:A8", "Region_Codes!B2:B8"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=\"North America East\"$", message: "Do not hardcode the string. Use XLOOKUP against Region_Codes." }
      ],
      dataScope: {
        cols: ["G", "A", "B"],
        params: [],
        previewRows: 7,
        summary: "Performs exact lookup on master region directory."
      }
    },

    // ── 6 HARD CHALLENGES (c15 - c20) ───────────────────────────────────────────
    {
      id: "c15",
      number: 15,
      title: "Regional Support Director (XLOOKUP)",
      prompt: "To identify the regional operations director responsible for escalations in the customer's territory, navigate to sheet <code>Cleaning_Practice</code> cell <strong>B16</strong> and write a lookup formula using <code>=XLOOKUP()</code> matching region code <code>Customer_Orders_Raw!G2</code> in <code>Region_Codes!A2:A8</code> and returning the regional lead from <code>Region_Codes!C2:C8</code> via <code>=XLOOKUP(Customer_Orders_Raw!G2, Region_Codes!A2:A8, Region_Codes!C2:C8)</code>.",
      targetSheet: "Cleaning_Practice",
      targetCell: "B16",
      solution: "=XLOOKUP(Customer_Orders_Raw!G2, Region_Codes!A2:A8, Region_Codes!C2:C8)",
      expectedFormulaPrefix: "=XLOOKUP",
      expectedValue: "Marcus Thorne",
      tolerance: 0,
      hint: "Use =XLOOKUP(Customer_Orders_Raw!G2, Region_Codes!A2:A8, Region_Codes!C2:C8)",
      difficulty: "hard",
      bloom: "evaluate",
      xp: 75,
      marks: 1.0,
      check: {
        expected: "Marcus Thorne",
        tolerance: 0,
        mustUseAnyOf: [["XLOOKUP"]],
        mustReference: ["Customer_Orders_Raw!G2", "Region_Codes!A2:A8", "Region_Codes!C2:C8"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=\"Marcus Thorne\"$", message: "Do not hardcode the name. Use XLOOKUP against Region_Codes." }
      ],
      dataScope: {
        cols: ["G", "A", "C"],
        params: [],
        previewRows: 7,
        summary: "Retrieves executive escalation contact for order region."
      }
    },
    {
      id: "c16",
      number: 16,
      title: "SLA Response Target Hours (XLOOKUP)",
      prompt: "To extract contractual support turnaround windows for logistics fulfillment monitoring, navigate to sheet <code>Cleaning_Practice</code> cell <strong>B17</strong> and write a lookup formula using <code>=XLOOKUP()</code> matching region code <code>Customer_Orders_Raw!G2</code> in <code>Region_Codes!A2:A8</code> and returning SLA hours from <code>Region_Codes!D2:D8</code> via <code>=XLOOKUP(Customer_Orders_Raw!G2, Region_Codes!A2:A8, Region_Codes!D2:D8)</code>.",
      targetSheet: "Cleaning_Practice",
      targetCell: "B17",
      solution: "=XLOOKUP(Customer_Orders_Raw!G2, Region_Codes!A2:A8, Region_Codes!D2:D8)",
      expectedFormulaPrefix: "=XLOOKUP",
      expectedValue: 24,
      tolerance: 0,
      hint: "Use =XLOOKUP(Customer_Orders_Raw!G2, Region_Codes!A2:A8, Region_Codes!D2:D8)",
      difficulty: "hard",
      bloom: "evaluate",
      xp: 75,
      marks: 1.0,
      check: {
        expected: 24,
        tolerance: 0,
        mustUseAnyOf: [["XLOOKUP"]],
        mustReference: ["Customer_Orders_Raw!G2", "Region_Codes!A2:A8", "Region_Codes!D2:D8"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=24$", message: "Do not hardcode 24. Look up SLA hours using XLOOKUP." }
      ],
      dataScope: {
        cols: ["G", "A", "D"],
        params: [],
        previewRows: 7,
        summary: "Extracts guaranteed turnaround window from master SLA matrix."
      }
    },
    {
      id: "c17",
      number: 17,
      title: "Postal Code Format Audit (IF + LEN)",
      prompt: "To enforce automated data validation auditing US postal code length conformity, navigate to sheet <code>Cleaning_Practice</code> cell <strong>B18</strong> and write a conditional rule using <code>=IF()</code> and <code>=LEN()</code>: if the length of postal code in <code>Customer_Orders_Raw!F2</code> equals 5 return <code>\"Valid Zip\"</code>, else return <code>\"Invalid Zip\"</code> via <code>=IF(LEN(Customer_Orders_Raw!F2)=5, \"Valid Zip\", \"Invalid Zip\")</code>.",
      targetSheet: "Cleaning_Practice",
      targetCell: "B18",
      solution: '=IF(LEN(Customer_Orders_Raw!F2)=5, "Valid Zip", "Invalid Zip")',
      expectedFormulaPrefix: "=IF",
      expectedValue: "Valid Zip",
      tolerance: 0,
      hint: 'Use =IF(LEN(Customer_Orders_Raw!F2)=5, "Valid Zip", "Invalid Zip")',
      difficulty: "hard",
      bloom: "create",
      xp: 75,
      marks: 1.0,
      check: {
        expected: "Valid Zip",
        tolerance: 0,
        mustUseAnyOf: [["IF"], ["LEN"]],
        mustReference: ["Customer_Orders_Raw!F2"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=\"Valid Zip\"$", message: "Do not hardcode. Write =IF(LEN(Customer_Orders_Raw!F2)=5, \"Valid Zip\", \"Invalid Zip\")." }
      ],
      dataScope: {
        cols: ["F"],
        params: ["Length = 5"],
        previewRows: 1,
        summary: "Validates 5-digit postal code conformity."
      }
    },
    {
      id: "c18",
      number: 18,
      title: "Region Authorization Audit (IF + COUNTIF)",
      prompt: "To perform referential integrity auditing against the master territory registry, navigate to sheet <code>Cleaning_Practice</code> cell <strong>B19</strong> and write a validation formula using <code>=IF()</code> and <code>=COUNTIF()</code>: if count of region code <code>Customer_Orders_Raw!G2</code> in master range <code>Region_Codes!A2:A8</code> is greater than 0 return <code>\"Authorized Region\"</code>, else return <code>\"Unauthorized\"</code> via <code>=IF(COUNTIF(Region_Codes!A2:A8, Customer_Orders_Raw!G2)>0, \"Authorized Region\", \"Unauthorized\")</code>.",
      targetSheet: "Cleaning_Practice",
      targetCell: "B19",
      solution: '=IF(COUNTIF(Region_Codes!A2:A8, Customer_Orders_Raw!G2)>0, "Authorized Region", "Unauthorized")',
      expectedFormulaPrefix: "=IF",
      expectedValue: "Authorized Region",
      tolerance: 0,
      hint: 'Use =IF(COUNTIF(Region_Codes!A2:A8, Customer_Orders_Raw!G2)>0, "Authorized Region", "Unauthorized")',
      difficulty: "hard",
      bloom: "create",
      xp: 75,
      marks: 1.0,
      check: {
        expected: "Authorized Region",
        tolerance: 0,
        mustUseAnyOf: [["IF"], ["COUNTIF"]],
        mustReference: ["Region_Codes!A2:A8", "Customer_Orders_Raw!G2"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=\"Authorized Region\"$", message: "Do not hardcode. Use =IF(COUNTIF(Region_Codes!A2:A8, Customer_Orders_Raw!G2)>0, \"Authorized Region\", \"Unauthorized\")." }
      ],
      dataScope: {
        cols: ["G", "A"],
        params: [],
        previewRows: 7,
        summary: "Performs referential list validation against master territory registry."
      }
    },
    {
      id: "c19",
      number: 19,
      title: "Item Quantity Bounds Audit (IF + AND)",
      prompt: "To enforce e-commerce wholesale batch limit policies on order item quantities, navigate to sheet <code>Cleaning_Practice</code> cell <strong>B20</strong> and write a boundary validation formula using <code>=IF()</code> and <code>=AND()</code>: if item quantity in <code>Customer_Orders_Raw!I2</code> is greater than or equal to 1 AND less than or equal to 100 return <code>\"Within Bounds\"</code>, else return <code>\"Out of Bounds\"</code> via <code>=IF(AND(Customer_Orders_Raw!I2>=1, Customer_Orders_Raw!I2<=100), \"Within Bounds\", \"Out of Bounds\")</code>.",
      targetSheet: "Cleaning_Practice",
      targetCell: "B20",
      solution: '=IF(AND(Customer_Orders_Raw!I2>=1, Customer_Orders_Raw!I2<=100), "Within Bounds", "Out of Bounds")',
      expectedFormulaPrefix: "=IF",
      expectedValue: "Within Bounds",
      tolerance: 0,
      hint: 'Use =IF(AND(Customer_Orders_Raw!I2>=1, Customer_Orders_Raw!I2<=100), "Within Bounds", "Out of Bounds")',
      difficulty: "hard",
      bloom: "create",
      xp: 75,
      marks: 1.0,
      check: {
        expected: "Within Bounds",
        tolerance: 0,
        mustUseAnyOf: [["IF"], ["AND"]],
        mustReference: ["Customer_Orders_Raw!I2"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=\"Within Bounds\"$", message: "Do not hardcode. Use =IF(AND(Customer_Orders_Raw!I2>=1, Customer_Orders_Raw!I2<=100), \"Within Bounds\", \"Out of Bounds\")." }
      ],
      dataScope: {
        cols: ["I"],
        params: ["1 <= Item Qty <= 100"],
        previewRows: 1,
        summary: "Enforces quantitative batch bounds logic."
      }
    },
    {
      id: "c20",
      number: 20,
      title: "Consolidated Dispatch Tag (TEXTJOIN)",
      prompt: "To synthesize an executive shipping dispatch tag consolidating customer, territory, and SLA turnaround metrics, navigate to sheet <code>Cleaning_Practice</code> cell <strong>B21</strong> and write a formula using <code>=TEXTJOIN()</code> with delimiter <code>\" | \"</code> and ignore_empty <code>TRUE</code>, combining <code>TRIM(Customer_Orders_Raw!B2)</code>, region code <code>Customer_Orders_Raw!G2</code>, and concatenated SLA turnaround <code>\"SLA: \" & XLOOKUP(Customer_Orders_Raw!G2, Region_Codes!A2:A8, Region_Codes!D2:D8) & \"h\"</code> via <code>=TEXTJOIN(\" | \", TRUE, TRIM(Customer_Orders_Raw!B2), Customer_Orders_Raw!G2, \"SLA: \" & XLOOKUP(Customer_Orders_Raw!G2, Region_Codes!A2:A8, Region_Codes!D2:D8) & \"h\")</code>.",
      targetSheet: "Cleaning_Practice",
      targetCell: "B21",
      solution: '=TEXTJOIN(" | ", TRUE, TRIM(Customer_Orders_Raw!B2), Customer_Orders_Raw!G2, "SLA: " & XLOOKUP(Customer_Orders_Raw!G2, Region_Codes!A2:A8, Region_Codes!D2:D8) & "h")',
      expectedFormulaPrefix: "=TEXTJOIN",
      expectedValue: "Sarah Jenkins | US-EAST | SLA: 24h",
      tolerance: 0,
      hint: 'Use =TEXTJOIN(" | ", TRUE, TRIM(Customer_Orders_Raw!B2), Customer_Orders_Raw!G2, "SLA: " & XLOOKUP(Customer_Orders_Raw!G2, Region_Codes!A2:A8, Region_Codes!D2:D8) & "h")',
      difficulty: "hard",
      bloom: "create",
      xp: 75,
      marks: 1.0,
      check: {
        expected: "Sarah Jenkins | US-EAST | SLA: 24h",
        tolerance: 0,
        mustUseAnyOf: [["TEXTJOIN"], ["TRIM"], ["XLOOKUP"]],
        mustReference: ["Customer_Orders_Raw!B2", "Customer_Orders_Raw!G2", "Region_Codes!A2:A8", "Region_Codes!D2:D8"],
        mustNotBeLiteral: true
      },
      commonMistakes: [
        { pattern: "^=\"Sarah Jenkins \\| US-EAST \\| SLA: 24h\"$", message: "Do not hardcode string. Combine TRIM, XLOOKUP, and TEXTJOIN." }
      ],
      dataScope: {
        cols: ["B", "G", "A", "D"],
        params: ['Delimiter " | "'],
        previewRows: 1,
        summary: "Synthesizes multi-attribute sanitization dispatch tag."
      }
    }
  ]
};

// Auto-mount Day 03 to active studio view when loaded
if (typeof window !== 'undefined') {
  if (window.COURSE_DAY === 3 || !window.EXCEL_COURSE_CONTENT['excelDay01']) {
    window.EXCEL_COURSE_CONTENT['excelDay01'] = window.EXCEL_COURSE_CONTENT['excelDay03'];
  }
}
