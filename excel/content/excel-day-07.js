// public/excel/content/excel-day-07.js
// Manodemy Excel Studio — Day 07 Curriculum Manifest & Challenges
// Domain: Apex Talent Group (HR & Talent Analytics)
// Conforms to: MISSION SPECIFICATION v3.2 & STYLE_GUIDE.md

// ══════════════════════════════════════════════════════════════════════════════
// ENGINE EXTENSION HOOKS: FIND, SEARCH, TEXTBEFORE, TEXTAFTER & TEXT Engine Helpers
// ══════════════════════════════════════════════════════════════════════════════
(function registerTextExtensions() {
  function applyHooks(EE) {
    if (!EE || !EE.FUNCTION_REGISTRY) return;

    // 1. FIND (Case-sensitive 1-based character position)
    if (!EE.FUNCTION_REGISTRY.FIND) {
      EE.FUNCTION_REGISTRY.FIND = ([findText, withinText, startNum = 1]) => {
        const f = String(findText ?? '');
        const w = String(withinText ?? '');
        const s = Math.max(1, Math.floor(Number(startNum) || 1)) - 1;
        const idx = w.indexOf(f, s);
        return idx === -1 ? EE.ERRORS.VALUE : idx + 1;
      };
    }

    // 2. SEARCH (Case-insensitive 1-based character position)
    if (!EE.FUNCTION_REGISTRY.SEARCH) {
      EE.FUNCTION_REGISTRY.SEARCH = ([findText, withinText, startNum = 1]) => {
        const f = String(findText ?? '').toLowerCase();
        const w = String(withinText ?? '').toLowerCase();
        const s = Math.max(1, Math.floor(Number(startNum) || 1)) - 1;
        const idx = w.indexOf(f, s);
        return idx === -1 ? EE.ERRORS.VALUE : idx + 1;
      };
    }

    // 3. TEXTBEFORE
    if (!EE.FUNCTION_REGISTRY.TEXTBEFORE) {
      EE.FUNCTION_REGISTRY.TEXTBEFORE = ([text, delim, inst = 1]) => {
        const s = String(text ?? '');
        const d = String(delim ?? '');
        const parts = s.split(d);
        const i = Math.floor(Number(inst) || 1);
        if (i <= 0 || i >= parts.length) return EE.ERRORS.NA;
        return parts.slice(0, i).join(d);
      };
    }

    // 4. TEXTAFTER
    if (!EE.FUNCTION_REGISTRY.TEXTAFTER) {
      EE.FUNCTION_REGISTRY.TEXTAFTER = ([text, delim, inst = 1]) => {
        const s = String(text ?? '');
        const d = String(delim ?? '');
        const parts = s.split(d);
        const i = Math.floor(Number(inst) || 1);
        if (i <= 0 || i >= parts.length) return EE.ERRORS.NA;
        return parts.slice(i).join(d);
      };
    }

    // 5. Ensure TEXT formatting handles currency and commas
    const origText = EE.FUNCTION_REGISTRY.TEXT;
    EE.FUNCTION_REGISTRY.TEXT = ([val, formatStr]) => {
      const fmt = String(formatStr || '').trim();
      const n = parseFloat(String(val).replace(/,/g, ''));
      if (isNaN(n)) return String(val);
      if (fmt === '#,##0' || fmt === '#,##0.00' || fmt === '$#,##0') {
        const prefix = fmt.startsWith('$') ? '$' : '';
        const rounded = Math.round(n);
        return prefix + rounded.toLocaleString('en-US');
      }
      return origText([val, formatStr]);
    };
  }

  // Browser hook
  if (typeof window !== 'undefined' && window.ExcelEngine) {
    applyHooks(window.ExcelEngine);
  }

  // Node hook
  if (typeof require !== 'undefined') {
    try {
      const engine = require('../excel-engine.js');
      applyHooks(engine);
    } catch (e) {}
  }
})();

if (!window.EXCEL_COURSE_CONTENT) window.EXCEL_COURSE_CONTENT = {};

window.EXCEL_COURSE_CONTENT['excelDay07'] = {
  day: 7,
  globalDay: 25,
  title: "Text Functions & Dynamic Arrays",
  description: "Master enterprise employee string decomposition, surgical substring boundary extractions, case-sensitive FIND vs case-insensitive SEARCH, dynamic array text manipulation with TEXTSPLIT, and delimited record aggregation with TEXTJOIN.",
  topics: [
    "01. String Extraction Foundations: LEFT(), RIGHT(), and MID()",
    "02. Character Counting & Boundary Detection: LEN() & TRIM()",
    "03. Surgical Position Locators: FIND() (Case-Sensitive) vs. SEARCH() (Case-Insensitive)",
    "04. Dynamic Delimiter Extractions: Composing MID with FIND",
    "05. Modern Boundary Parsers: TEXTBEFORE() and TEXTAFTER()",
    "06. Modern Array Delimiting: TEXTSPLIT() Multi-Cell Distribution",
    "07. String Assembly & Concatenation: CONCAT() vs. The & Ampersand",
    "08. Enterprise Delimited Aggregations: TEXTJOIN() with Empty Cell Suppression",
    "09. String Cleansing & Normalization: CLEAN(), SUBSTITUTE(), and PROPER()",
    "10. Case Formatting & String Sanitization: UPPER(), LOWER(), and Multi-Pass Scrubbing"
  ],
  slides: [
    {
      title: "Text Parsing & Dynamic String Manipulation",
      html: `
<section class="slide-section" id="sec01">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingStringFoundations">
    <span class="heading-num-box">01</span>
    <span class="heading-title-box">
      <span class="heading-icon">✂️</span>
      <span class="heading-title-text">String Extraction Foundations: LEFT(), RIGHT(), and MID()</span>
      <button class="audio-play-btn" data-track-idx="0" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <div class="pro-tip-box" style="margin-bottom: 16px;">
      <h4>⚡ Silicon Valley HR Tech Hotkey: Flash Fill & Line Breaks</h4>
      <p>Press <kbd>Ctrl</kbd> + <kbd>E</kbd> for instant pattern-recognition Flash Fill. When formatting executive multiline reports or narrative badges, press <kbd>Alt</kbd> + <kbd>Enter</kbd> inside a cell or use <code>CHAR(10)</code> inside a <code>TEXTJOIN()</code> formula to insert dynamic line breaks.</p>
    </div>
    <p class="lead-text">In enterprise HR systems like Apex Talent Group, employee master files aggregate identifiers into structured composite codes—such as <code>ATG-8492-NY</code>. The foundational text parsing trilogy—<code>LEFT()</code>, <code>RIGHT()</code>, and <code>MID()</code>—allows analysts to extract categorical components into atomic fields.</p>
    
    <div class="architecture-grid">
      <div class="arch-box">
        <h4><code>=LEFT(text, [num_chars])</code></h4>
        <p>Extracts a specified number of characters starting from the very first character on the left. Defaults to 1 character if omitted.</p>
      </div>
      <div class="arch-box">
        <h4><code>=RIGHT(text, [num_chars])</code></h4>
        <p>Extracts a specified number of characters from the far right end of the text string.</p>
      </div>
      <div class="arch-box">
        <h4><code>=MID(text, start_num, num_chars)</code></h4>
        <p>Extracts a substring starting at <code>start_num</code> (1-based index) for a length of <code>num_chars</code>. Universal tool for fixed-width serial numbers.</p>
      </div>
    </div>

    <div class="table-responsive">
      <table class="reference-table">
        <thead>
          <tr>
            <th>Source Composite String</th>
            <th>Target Extraction</th>
            <th>Formula</th>
            <th>Output</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>"ATG-8492-NY"</code></td>
            <td>Company Prefix (First 3 chars)</td>
            <td><code>=LEFT(Employee_Roster!A2, 3)</code></td>
            <td><code>"ATG"</code></td>
          </tr>
          <tr>
            <td><code>"ATG-8492-NY"</code></td>
            <td>Region Suffix (Last 2 chars)</td>
            <td><code>=RIGHT(Employee_Roster!A2, 2)</code></td>
            <td><code>"NY"</code></td>
          </tr>
          <tr>
            <td><code>"ATG-8492-NY"</code></td>
            <td>4-Digit Employee ID (Chars 5-8)</td>
            <td><code>=MID(Employee_Roster!A2, 5, 4)</code></td>
            <td><code>"8492"</code></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="keynote-box keynote-emerald">
      <strong>Data Analyst Rule:</strong> Text functions always return values formatted as text strings. If <code>MID()</code> extracts numeric digits like <code>"8492"</code>, downstream numerical calculations will treat it as text unless explicitly coerced via <code>VALUE()</code> or double unary negation (<code>--MID(...)</code>).
    </div>
  </div>
</section>

<section class="slide-section" id="sec02">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingLenTrim">
    <span class="heading-num-box">02</span>
    <span class="heading-title-box">
      <span class="heading-icon">📏</span>
      <span class="heading-title-text">Character Counting & Boundary Detection: LEN() & TRIM()</span>
      <button class="audio-play-btn" data-track-idx="1" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p class="lead-text">Dirty data exported from HRIS platforms like Workday or BambooHR frequently contains invisible trailing spaces, irregular multi-space gaps, and inconsistent string lengths that ruin VLOOKUP and XLOOKUP matching.</p>

    <div class="architecture-grid">
      <div class="arch-box">
        <h4><code>=LEN(text)</code></h4>
        <p>Returns the total character count of a string, including spaces, punctuation, and control symbols. Crucial for dynamic boundary calculations.</p>
      </div>
      <div class="arch-box">
        <h4><code>=TRIM(text)</code></h4>
        <p>Removes all leading and trailing spaces from text, and collapses internal consecutive whitespace runs into a single clean space.</p>
      </div>
    </div>

    <div class="anti-pattern-card">
      <div class="anti-pattern-title">⚠️ The Invisible Whitespace Trap</div>
      <div class="anti-pattern-body">
        <p><strong>The Trap:</strong> <code>"Elena Rostova "</code> (with trailing space) does not equal <code>"Elena Rostova"</code>. An <code>XLOOKUP</code> querying the clean name will fail with <code>#N/A</code>.</p>
        <p><strong>The Defense:</strong> Wrap incoming lookup keys in <code>TRIM()</code> to guarantee pristine whitespace normalization: <code>=TRIM(Employee_Roster!B2)</code>.</p>
      </div>
    </div>
  </div>
</section>

<section class="slide-section" id="sec03">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingFindSearch">
    <span class="heading-num-box">03</span>
    <span class="heading-title-box">
      <span class="heading-icon">🔎</span>
      <span class="heading-title-text">Surgical Position Locators: FIND() (Case-Sensitive) vs. SEARCH() (Case-Insensitive)</span>
      <button class="audio-play-btn" data-track-idx="2" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p class="lead-text">Fixed character offsets like <code>LEFT(text, 5)</code> only work when data has constant width. When parsing names or emails where lengths vary, you must locate delimiters dynamically using <code>FIND()</code> or <code>SEARCH()</code>.</p>

    <div class="table-responsive">
      <table class="reference-table">
        <thead>
          <tr>
            <th>Function</th>
            <th>Syntax</th>
            <th>Case-Sensitive?</th>
            <th>Supports Wildcards?</th>
            <th>Primary Use Case</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>=FIND()</code></td>
            <td><code>=FIND(find_text, within_text, [start_num])</code></td>
            <td><strong style="color: #34d399;">Yes</strong></td>
            <td>No</td>
            <td>Case-sensitive code verification (e.g., locating "ENG" vs "eng")</td>
          </tr>
          <tr>
            <td><code>=SEARCH()</code></td>
            <td><code>=SEARCH(find_text, within_text, [start_num])</code></td>
            <td>No</td>
            <td><strong style="color: #34d399;">Yes (* and ?)</strong></td>
            <td>Human-entered text, spaces, and email delimiter matching</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="keynote-box keynote-emerald">
      <strong>Zero-Index Caution:</strong> Unlike Python or JavaScript which are 0-indexed, Excel formulas are strictly <strong>1-indexed</strong>. The first character of a string sits at index 1. If <code>FIND("@", "elena@apex.com")</code> returns 6, the username length is <code>6 - 1 = 5</code> characters.
    </div>
  </div>
</section>

<section class="slide-section" id="sec04">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingDynamicDelimiters">
    <span class="heading-num-box">04</span>
    <span class="heading-title-box">
      <span class="heading-icon">🧩</span>
      <span class="heading-title-text">Dynamic Delimiter Extractions: Composing MID with FIND</span>
      <button class="audio-play-btn" data-track-idx="3" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p class="lead-text">By combining <code>LEFT()</code>, <code>MID()</code>, and <code>RIGHT()</code> with <code>FIND()</code> or <code>SEARCH()</code>, analysts create dynamic string slicing engines that automatically adjust to names and emails of arbitrary lengths.</p>

    <div class="architecture-grid">
      <div class="arch-box">
        <h4>Username Extraction Before <code>@</code></h4>
        <p><code>=LEFT(Email, FIND("@", Email) - 1)</code><br>
        Finds the <code>@</code> symbol position, subtracts 1 to exclude it, and takes all characters to the left.</p>
      </div>
      <div class="arch-box">
        <h4>Domain Extraction After <code>@</code></h4>
        <p><code>=MID(Email, FIND("@", Email) + 1, 50)</code><br>
        Starts immediately after the <code>@</code> symbol (<code>pos + 1</code>) and captures the remaining domain text.</p>
      </div>
      <div class="arch-box">
        <h4>First Name / Last Name Splitting</h4>
        <p>First: <code>=LEFT(Name, SEARCH(" ", Name) - 1)</code><br>
        Last: <code>=MID(Name, SEARCH(" ", Name) + 1, 50)</code></p>
      </div>
    </div>
  </div>
</section>

<section class="slide-section" id="sec05">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingBoundaryParsers">
    <span class="heading-num-box">05</span>
    <span class="heading-title-box">
      <span class="heading-icon">⚡</span>
      <span class="heading-title-text">Modern Boundary Parsers: TEXTBEFORE() and TEXTAFTER()</span>
      <button class="audio-play-btn" data-track-idx="4" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p class="lead-text">In modern Microsoft 365, complex <code>MID(..., FIND(...))</code> mathematical nesting is superseded by specialized declarative boundary functions: <code>TEXTBEFORE()</code> and <code>TEXTAFTER()</code>.</p>

    <div class="table-responsive">
      <table class="reference-table">
        <thead>
          <tr>
            <th>Modern Function</th>
            <th>Equivalent Legacy Composition</th>
            <th>Advantage</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>=TEXTBEFORE(Email, "@")</code></td>
            <td><code>=LEFT(Email, FIND("@", Email) - 1)</code></td>
            <td>Eliminates index arithmetic; reads like spoken English</td>
          </tr>
          <tr>
            <td><code>=TEXTAFTER(Email, "@")</code></td>
            <td><code>=MID(Email, FIND("@", Email) + 1, LEN(Email))</code></td>
            <td>Zero length estimation required; handles missing delimiters gracefully</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</section>

<section class="slide-section" id="sec06">
    <div class="keynote-box keynote-indigo">
      <strong>💼 Microsoft 365 Dynamic Array Ecosystem Spotlight: Dynamic Arrays vs. Classic Tables</strong><br>
      In modern Microsoft 365, formulas don't just return single scalar values—they can spill entire dynamic matrices into neighboring cells!<br>
      <ul>
        <li><code>=UNIQUE(array)</code> &mdash; Dynamically extracts distinct items from a column without manual deduplication.</li>
        <li><code>=FILTER(array, include_criteria, [if_empty])</code> &mdash; Dynamically filters an entire table by condition without touching AutoFilter.</li>
        <li><code>=SORT(array, [sort_index], [sort_order])</code> &mdash; Dynamically returns a sorted matrix.</li>
        <li><strong>The Spill Operator (<code>#</code>):</strong> Referencing cell <code>A2#</code> automatically selects the entire spilled array output of formula in <code>A2</code>!</li>
        <li><strong>The <code>#SPILL!</code> Error:</strong> If any cell in the projected spill path contains text, numbers, or formatting, Excel immediately flags <code>#SPILL!</code>. Clear the blocking cells to allow the formula to expand.</li>
      </ul>
    </div>

  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingTextSplit">
    <span class="heading-num-box">06</span>
    <span class="heading-title-box">
      <span class="heading-icon">🌊</span>
      <span class="heading-title-text">Modern Array Delimiting: TEXTSPLIT() Multi-Cell Distribution</span>
      <button class="audio-play-btn" data-track-idx="5" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p class="lead-text">When text contains comma-separated tags—such as employee skill lists <code>"AWS, Python, Terraform"</code>—historical workflows required manual "Text to Columns" operations that broke automated spreadsheet updates. <code>TEXTSPLIT()</code> transforms a single cell into a live dynamic array.</p>

    <div class="architecture-grid">
      <div class="arch-box">
        <h4>Spill Range Mechanics</h4>
        <p><code>=TEXTSPLIT(text, col_delimiter, [row_delimiter])</code> splits text across adjacent columns or downward across rows, spilling automatically.</p>
      </div>
      <div class="arch-box">
        <h4>Isolating Specific Elements</h4>
        <p>Wrap <code>TEXTSPLIT</code> in <code>INDEX()</code> to isolate an individual item without spilling: <code>=INDEX(TEXTSPLIT(Skills, ", "), 1)</code> extracts the primary skill ("AWS").</p>
      </div>
    </div>
  </div>
</section>

<section class="slide-section" id="sec07">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingConcatenation">
    <span class="heading-num-box">07</span>
    <span class="heading-title-box">
      <span class="heading-icon">🔗</span>
      <span class="heading-title-text">String Assembly & Concatenation: CONCAT() vs. The & Ampersand</span>
      <button class="audio-play-btn" data-track-idx="6" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p class="lead-text">Merging disparate data points into standardized composite tokens is the inverse of parsing. Excel provides both the binary <code>&</code> ampersand operator and the modern <code>CONCAT()</code> function.</p>

    <div class="architecture-grid">
      <div class="arch-box">
        <h4>Ampersand Operator (<code>&</code>)</h4>
        <p>Simple and concise for joining 2 to 4 scalar tokens: <code>=A2 & " - " & B2</code>. Standard for simple label joining.</p>
      </div>
      <div class="arch-box">
        <h4><code>=CONCAT(text1, [text2], ...)</code></h4>
        <p>Modern replacement for legacy <code>CONCATENATE</code>. Accepts ranges as well as individual cells without manual commas.</p>
      </div>
    </div>
  </div>
</section>

<section class="slide-section" id="sec08">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingTextJoin">
    <span class="heading-num-box">08</span>
    <span class="heading-title-box">
      <span class="heading-icon">📋</span>
      <span class="heading-title-text">Enterprise Delimited Aggregations: TEXTJOIN() with Empty Cell Suppression</span>
      <button class="audio-play-btn" data-track-idx="7" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p class="lead-text">Generating semicolon-separated email distribution lists for Outlook or HR communication blasts used to require tedious manual concatenation. <code>TEXTJOIN()</code> aggregates entire vertical or horizontal ranges into a single formatted string.</p>

    <div class="architecture-grid">
      <div class="arch-box">
        <h4>Delimiter Definition</h4>
        <p>Argument 1 specifies the separator (e.g., <code>"; "</code> or <code>", "</code>) applied uniformly between all items.</p>
      </div>
      <div class="arch-box">
        <h4><code>ignore_empty = TRUE</code></h4>
        <p>Argument 2 automatically suppresses empty or null cells, preventing unsightly double delimiters like <code>"email1;;email3"</code>.</p>
      </div>
    </div>

    <div class="anti-pattern-card">
      <div class="anti-pattern-title">📋 Production HR Blast Example</div>
      <div class="anti-pattern-body">
        <p><code>=TEXTJOIN("; ", TRUE, Employee_Roster!C2:C6)</code></p>
        <p>Produces a clean distribution string ready for copy-pasting directly into enterprise mail clients.</p>
      </div>
    </div>
  </div>
</section>

<section class="slide-section" id="sec09">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingStringCleansing">
    <span class="heading-num-box">09</span>
    <span class="heading-title-box">
      <span class="heading-icon">🧼</span>
      <span class="heading-title-text">String Cleansing & Normalization: CLEAN(), SUBSTITUTE(), and PROPER()</span>
      <button class="audio-play-btn" data-track-idx="8" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p class="lead-text">Raw text feeds from databases frequently contain non-printable ASCII characters, inconsistent casing, and outdated corporate domains that must be scrubbed before analysis.</p>

    <div class="table-responsive">
      <table class="reference-table">
        <thead>
          <tr>
            <th>Cleansing Function</th>
            <th>Primary Capability</th>
            <th>Syntax Example</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>=SUBSTITUTE()</code></td>
            <td>Replaces exact target substrings with new text (case-sensitive)</td>
            <td><code>=SUBSTITUTE(C2, "apextalent.com", "partner.apex.org")</code></td>
          </tr>
          <tr>
            <td><code>=PROPER()</code></td>
            <td>Capitalizes the first letter of each word and lowers all others</td>
            <td><code>=PROPER(Employee_Roster!B2)</code></td>
          </tr>
          <tr>
            <td><code>=CLEAN()</code></td>
            <td>Strips all non-printable ASCII control characters (0 through 31)</td>
            <td><code>=CLEAN(DirtyFeedCell)</code></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</section>

<section class="slide-section" id="sec10">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingCaseFormatting">
    <span class="heading-num-box">10</span>
    <span class="heading-title-box">
      <span class="heading-icon">🔠</span>
      <span class="heading-title-text">Case Formatting & String Sanitization: UPPER(), LOWER(), and Multi-Pass Scrubbing</span>
      <button class="audio-play-btn" data-track-idx="9" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p class="lead-text">Standardizing categorical fields into uppercase ensures foolproof database joins and relational key integrity across cross-functional dashboards.</p>

    <div class="architecture-grid">
      <div class="arch-box">
        <h4><code>=UPPER(text)</code></h4>
        <p>Converts all alphabetical characters into uppercase. Essential for standardizing department codes: <code>=UPPER(TRIM(E2))</code>.</p>
      </div>
      <div class="arch-box">
        <h4><code>=LOWER(text)</code></h4>
        <p>Converts all alphabetical characters into lowercase. Universal best practice for normalizing user email addresses.</p>
      </div>
      <div class="arch-box">
        <h4>Composed Multi-Pass Cleansing</h4>
        <p>Senior analysts compose functions into clean pipelines: <code>=UPPER(TRIM(CLEAN(RawText)))</code> scrubs non-printables, eliminates excess spaces, and forces uppercase.</p>
      </div>
    </div>
  </div>
</section>
`
    }
  ],
  initialWorkbook: {
    Employee_Roster: [
      ["Emp_Code", "Full_Name", "Work_Email", "Job_Title", "Department", "Grade_Band", "Base_Salary", "Office_Location", "Skill_Tags", "Raw_Metadata"],
      ["ATG-8492-NY", "Elena Rostova", "elena.rostova@apextalent.com", "Lead Cloud Architect", "Engineering", "GR-04", 165000, "New York, USA", "AWS, Python, Terraform", "ID:8492;DEPT:ENG;STATUS:ACTIVE"],
      ["ATG-3104-SF", "Marcus Vance", "marcus.vance@apextalent.com", "Senior Growth Strategist", "Marketing", "GR-03", 125000, "San Francisco, USA", "SEO, SQL, Figma", "ID:3104;DEPT:MKT;STATUS:ACTIVE"],
      ["ATG-5521-LON", "Priya Sharma", "priya.sharma@apextalent.com", "Director of Talent Ops", "People Ops", "GR-05", 195000, "London, UK", "Workday, BambooHR, DEI", "ID:5521;DEPT:HR;STATUS:ACTIVE"],
      ["ATG-7219-CHI", "David K. Miller", "david.miller@apextalent.com", "Quantitative Analyst", "Finance", "GR-02", 92000, "Chicago, USA", "Excel, Bloomberg, R", "ID:7219;DEPT:FIN;STATUS:ACTIVE"],
      ["ATG-1940-TOR", "Chloe Dubois", "chloe.dubois@apextalent.com", "Principal AI Scientist", "Data Science", "GR-05", 210000, "Toronto, Canada", "PyTorch, CUDA, Python", "ID:1940;DEPT:DS;STATUS:ACTIVE"],
      ["ATG-6832-NY", "James Wilson", "james.wilson@apextalent.com", "Security Engineer", "Engineering", "GR-03", 138000, "New York, USA", "Linux, SIEM, Docker", "ID:6832;DEPT:ENG;STATUS:ACTIVE"],
      ["ATG-4291-SF", "Aaliyah Patel", "aaliyah.patel@apextalent.com", "Product Operations Lead", "Operations", "GR-03", 118000, "San Francisco, USA", "Jira, Agile, Tableau", "ID:4291;DEPT:OPS;STATUS:ACTIVE"],
      ["ATG-9055-LON", "Liam O'Connor", "liam.oconnor@apextalent.com", "Corporate Counsel", "Legal", "GR-04", 175000, "London, UK", "Contracts, GDPR, IP", "ID:9055;DEPT:LEG;STATUS:ACTIVE"],
      ["ATG-2384-BLR", "Sneha Nair", "sneha.nair@apextalent.com", "Senior ML Ops Specialist", "Data Science", "GR-03", 130000, "Bangalore, India", "Kubernetes, MLflow, Go", "ID:2384;DEPT:DS;STATUS:ACTIVE"],
      ["ATG-7163-CHI", "Ethan Brooks", "ethan.brooks@apextalent.com", "Financial Controller", "Finance", "GR-04", 160000, "Chicago, USA", "NetSuite, US-GAAP, SAP", "ID:7163;DEPT:FIN;STATUS:ACTIVE"],
      ["ATG-3829-TOR", "Yuki Tanaka", "yuki.tanaka@apextalent.com", "UX Design Principal", "Design", "GR-04", 155000, "Toronto, Canada", "Figma, UserTesting, CSS", "ID:3829;DEPT:DES;STATUS:ACTIVE"],
      ["ATG-5941-NY", "Carlos Mendez", "carlos.mendez@apextalent.com", "Site Reliability Specialist", "Engineering", "GR-02", 108000, "New York, USA", "Prometheus, Bash, AWS", "ID:5941;DEPT:ENG;STATUS:ACTIVE"],
      ["ATG-8270-SF", "Hannah Abbott", "hannah.abbott@apextalent.com", "Content Marketing Manager", "Marketing", "GR-02", 88000, "San Francisco, USA", "HubSpot, Copywriting, SEO", "ID:8270;DEPT:MKT;STATUS:ACTIVE"],
      ["ATG-1492-LON", "Mateo Rossi", "mateo.rossi@apextalent.com", "FP&A Associate", "Finance", "GR-01", 72000, "London, UK", "Excel, PowerBI, SQL", "ID:1492;DEPT:FIN;STATUS:ACTIVE"],
      ["ATG-6308-BLR", "Ananya Gupta", "ananya.gupta@apextalent.com", "Data Platform Lead", "Data Science", "GR-04", 170000, "Bangalore, India", "Spark, Snowflake, dbt", "ID:6308;DEPT:DS;STATUS:ACTIVE"],
      ["ATG-4751-CHI", "Lucas Meyer", "lucas.meyer@apextalent.com", "Senior HR Business Partner", "People Ops", "GR-03", 120000, "Chicago, USA", "CultureAmp, Coaching, DEI", "ID:4751;DEPT:HR;STATUS:ACTIVE"],
      ["ATG-9182-TOR", "Fatima Zahra", "fatima.zahra@apextalent.com", "Infrastructure Engineer", "Engineering", "GR-03", 132000, "Toronto, Canada", "Terraform, GCP, Ansible", "ID:9182;DEPT:ENG;STATUS:ACTIVE"],
      ["ATG-3645-NY", "Noah Kim", "noah.kim@apextalent.com", "Talent Acquisition Lead", "People Ops", "GR-02", 95000, "New York, USA", "Greenhouse, LinkedIn, Sourcing", "ID:3645;DEPT:HR;STATUS:ACTIVE"],
      ["ATG-8023-SF", "Sofia Reyes", "sofia.reyes@apextalent.com", "Product Marketing Director", "Marketing", "GR-05", 190000, "San Francisco, USA", "Positioning, Launch, BI", "ID:8023;DEPT:MKT;STATUS:ACTIVE"],
      ["ATG-5237-LON", "Benjamin Cole", "benjamin.cole@apextalent.com", "DevOps Engineer", "Engineering", "GR-02", 105000, "London, UK", "Jenkins, Docker, Python", "ID:5237;DEPT:ENG;STATUS:ACTIVE"],
      ["ATG-7490-BLR", "Devika Menon", "devika.menon@apextalent.com", "AI Ethics Researcher", "Data Science", "GR-03", 128000, "Bangalore, India", "Fairness, PyTorch, Policy", "ID:7490;DEPT:DS;STATUS:ACTIVE"],
      ["ATG-1864-CHI", "Olivia Taylor", "olivia.taylor@apextalent.com", "Tax & Compliance Lead", "Finance", "GR-03", 135000, "Chicago, USA", "Taxation, Audit, NetSuite", "ID:1864;DEPT:FIN;STATUS:ACTIVE"],
      ["ATG-6512-TOR", "Samuel Chen", "samuel.chen@apextalent.com", "Full Stack Engineer", "Engineering", "GR-02", 112000, "Toronto, Canada", "React, Node, PostgreSQL", "ID:6512;DEPT:ENG;STATUS:ACTIVE"],
      ["ATG-9341-NY", "Zara Larsson", "zara.larsson@apextalent.com", "Executive Assistant to CEO", "Operations", "GR-02", 98000, "New York, USA", "Scheduling, Travel, Notion", "ID:9341;DEPT:OPS;STATUS:ACTIVE"],
      ["ATG-2758-SF", "Alexander Wright", "alexander.wright@apextalent.com", "Chief Information Security Officer", "Engineering", "GR-05", 240000, "San Francisco, USA", "ISO27001, SOC2, ZeroTrust", "ID:2758;DEPT:ENG;STATUS:ACTIVE"]
    ],
    Job_Grades: [
      ["Grade_Code", "Grade_Title", "Salary_Min", "Salary_Max", "Target_Bonus_Pct"],
      ["GR-01", "Associate Specialist", 55000, 80000, 0.10],
      ["GR-02", "Senior Professional", 85000, 115000, 0.15],
      ["GR-03", "Lead Manager", 120000, 155000, 0.20],
      ["GR-04", "Principal / Director", 160000, 215000, 0.25],
      ["GR-05", "Executive Leader", 220000, 320000, 0.35]
    ],
    Text_Parsing_Lab: [
      ["Parsing_Challenge", "Parsed_Output"],
      ["C01: Company Prefix (LEFT 3 chars of Emp_Code)", ""],
      ["C02: Region Suffix (RIGHT 2 chars of Emp_Code)", ""],
      ["C03: 4-Digit Numeric ID (MID chars 5 to 8)", ""],
      ["C04: Full Name Character Count (LEN)", ""],
      ["C05: Standardized Full Name (TRIM)", ""],
      ["C06: Full Name in Proper Title Case (PROPER)", ""],
      ["C07: Username Extracted Before @ (LEFT + FIND)", ""],
      ["C08: Email Domain Extracted After @ (MID + FIND)", ""],
      ["C09: First Name Extraction (LEFT + SEARCH on space)", ""],
      ["C10: Last Name Extraction (MID + SEARCH on space)", ""],
      ["C11: Case-Sensitive Department Code Validation (FIND)", ""],
      ["C12: Compound Badge Code Creation (CONCAT)", ""],
      ["C13: Semicolon Delimited Email Distribution (TEXTJOIN)", ""],
      ["C14: Delimited Skill Tag Semicolon Formatting (SUBSTITUTE)", ""],
      ["C15: Delimited Skill Array Extraction (INDEX + TEXTSPLIT)", ""],
      ["C16: Sanitary Email Domain Masking (SUBSTITUTE)", ""],
      ["C17: Substring Extraction Between Boundaries (MID + FIND)", ""],
      ["C18: Dynamic Department Normalization (UPPER + TRIM)", ""],
      ["C19: Dynamic Grade Band Lookup via Substring Key (XLOOKUP)", ""],
      ["C20: Comprehensive Executive Bio Summary (CONCAT + TEXT)", ""]
    ]
  },
  initialAuxiliary: {},
  challenges: [
    {
      id: "c01",
      number: 1,
      title: "Company Prefix Extraction via LEFT",
      difficulty: "easy",
      bloom: "apply",
      prompt: "In sheet <code>Text_Parsing_Lab</code> cell <strong>B2</strong>, to isolate the corporate organization identifier for Elena Rostova, extract the 3-character company prefix from composite employee code <code>Employee_Roster!A2</code> using <code>=LEFT()</code>.",
      targetSheet: "Text_Parsing_Lab",
      targetCell: "B2",
      solution: '=LEFT(Employee_Roster!A2, 3)',
      expectedFormulaPrefix: "=LEFT",
      expectedValue: "ATG",
      tolerance: 0,
      hint: "Extract the left 3 characters with =LEFT(Employee_Roster!A2, 3).",
      commonMistakes: [
        { pattern: "MID", message: "Use LEFT() when extracting characters starting from the very first character." }
      ],
      check: {
        expected: "ATG",
        tolerance: 0,
        mustUseAnyOf: [["LEFT"]],
        mustReference: ["Employee_Roster!A2"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["A"],
        params: [],
        previewRows: 1,
        summary: "Extracts company identifier code from composite string."
      }
    },
    {
      id: "c02",
      number: 2,
      title: "Regional Suffix Extraction via RIGHT",
      difficulty: "easy",
      bloom: "apply",
      prompt: "In sheet <code>Text_Parsing_Lab</code> cell <strong>B3</strong>, to determine Elena Rostova's geographic regional office for facility allocation, extract the 2-character branch suffix from composite employee code <code>Employee_Roster!A2</code> using <code>=RIGHT()</code>.",
      targetSheet: "Text_Parsing_Lab",
      targetCell: "B3",
      solution: '=RIGHT(Employee_Roster!A2, 2)',
      expectedFormulaPrefix: "=RIGHT",
      expectedValue: "NY",
      tolerance: 0,
      hint: "Extract the final 2 characters using =RIGHT(Employee_Roster!A2, 2).",
      commonMistakes: [
        { pattern: "LEFT", message: "Use RIGHT() to pull characters from the end of the text." }
      ],
      check: {
        expected: "NY",
        tolerance: 0,
        mustUseAnyOf: [["RIGHT"]],
        mustReference: ["Employee_Roster!A2"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["A"],
        params: [],
        previewRows: 1,
        summary: "Pulls terminal regional identifier suffix."
      }
    },
    {
      id: "c03",
      number: 3,
      title: "Internal Numeric ID Extraction via MID",
      difficulty: "easy",
      bloom: "apply",
      prompt: "In sheet <code>Text_Parsing_Lab</code> cell <strong>B4</strong>, to isolate the core numeric employee ID for payroll ledger integration, extract the 4-digit identifier embedded within composite code <code>Employee_Roster!A2</code> starting at character position 5 for 4 characters using <code>=MID()</code>.",
      targetSheet: "Text_Parsing_Lab",
      targetCell: "B4",
      solution: '=MID(Employee_Roster!A2, 5, 4)',
      expectedFormulaPrefix: "=MID",
      expectedValue: "8492",
      tolerance: 0,
      hint: "Start at position 5 for length 4: =MID(Employee_Roster!A2, 5, 4).",
      commonMistakes: [
        { pattern: "LEFT", message: "Use MID() to extract characters from the middle of a string." }
      ],
      check: {
        expected: "8492",
        tolerance: 0,
        mustUseAnyOf: [["MID"]],
        mustReference: ["Employee_Roster!A2"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["A"],
        params: [],
        previewRows: 1,
        summary: "Extracts middle numeric sequence from composite identifier."
      }
    },
    {
      id: "c04",
      number: 4,
      title: "Full Name Character Length via LEN",
      difficulty: "easy",
      bloom: "apply",
      prompt: "In sheet <code>Text_Parsing_Lab</code> cell <strong>B5</strong>, to verify string length compliance against security badge character limits, calculate the total character count of Elena Rostova's full name in <code>Employee_Roster!B2</code> using <code>=LEN()</code>.",
      targetSheet: "Text_Parsing_Lab",
      targetCell: "B5",
      solution: '=LEN(Employee_Roster!B2)',
      expectedFormulaPrefix: "=LEN",
      expectedValue: 13,
      tolerance: 0,
      hint: "Count total characters with =LEN(Employee_Roster!B2).",
      commonMistakes: [
        { pattern: "COUNT", message: "COUNT counts numerical cells; use LEN() to count characters in a text string." }
      ],
      check: {
        expected: 13,
        tolerance: 0,
        mustUseAnyOf: [["LEN"]],
        mustReference: ["Employee_Roster!B2"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["B"],
        params: [],
        previewRows: 1,
        summary: "Calculates total string length including spaces."
      }
    },
    {
      id: "c05",
      number: 5,
      title: "Whitespace Normalization via TRIM",
      difficulty: "easy",
      bloom: "apply",
      prompt: "In sheet <code>Text_Parsing_Lab</code> cell <strong>B6</strong>, to sanitize raw HRIS input and prevent relational lookup mismatch errors, cleanse Elena Rostova's full name in <code>Employee_Roster!B2</code> by removing all leading, trailing, and duplicate spaces using <code>=TRIM()</code>.",
      targetSheet: "Text_Parsing_Lab",
      targetCell: "B6",
      solution: '=TRIM(Employee_Roster!B2)',
      expectedFormulaPrefix: "=TRIM",
      expectedValue: "Elena Rostova",
      tolerance: 0,
      hint: "Scrub excess whitespace with =TRIM(Employee_Roster!B2).",
      commonMistakes: [
        { pattern: "CLEAN", message: "CLEAN strips non-printable control characters; TRIM removes whitespace." }
      ],
      check: {
        expected: "Elena Rostova",
        tolerance: 0,
        mustUseAnyOf: [["TRIM"]],
        mustReference: ["Employee_Roster!B2"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["B"],
        params: [],
        previewRows: 1,
        summary: "Removes leading, trailing, and duplicate spaces."
      }
    },
    {
      id: "c06",
      number: 6,
      title: "Title Case Formatting via PROPER",
      difficulty: "easy",
      bloom: "apply",
      prompt: "In sheet <code>Text_Parsing_Lab</code> cell <strong>B7</strong>, to enforce corporate typography standards across the executive talent directory, standardize Elena Rostova's full name in <code>Employee_Roster!B2</code> into proper title capitalization using <code>=PROPER()</code>.",
      targetSheet: "Text_Parsing_Lab",
      targetCell: "B7",
      solution: '=PROPER(Employee_Roster!B2)',
      expectedFormulaPrefix: "=PROPER",
      expectedValue: "Elena Rostova",
      tolerance: 0,
      hint: "Capitalize words properly using =PROPER(Employee_Roster!B2).",
      commonMistakes: [
        { pattern: "UPPER", message: "UPPER forces all characters uppercase; PROPER capitalizes only the first letter of each word." }
      ],
      check: {
        expected: "Elena Rostova",
        tolerance: 0,
        mustUseAnyOf: [["PROPER"]],
        mustReference: ["Employee_Roster!B2"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["B"],
        params: [],
        previewRows: 1,
        summary: "Standardizes names to corporate Title Case."
      }
    },
    {
      id: "c07",
      number: 7,
      title: "Dynamic Username Extraction (LEFT + FIND)",
      difficulty: "medium",
      bloom: "apply",
      prompt: "In sheet <code>Text_Parsing_Lab</code> cell <strong>B8</strong>, to provision Single Sign-On (SSO) network credentials prior to system access, dynamically extract the email username preceding the <code>@</code> symbol from Elena Rostova's work email in <code>Employee_Roster!C2</code> by composing <code>=LEFT()</code> with <code>=FIND()</code>.",
      targetSheet: "Text_Parsing_Lab",
      targetCell: "B8",
      solution: '=LEFT(Employee_Roster!C2, FIND("@", Employee_Roster!C2)-1)',
      expectedFormulaPrefix: "=LEFT",
      expectedValue: "elena.rostova",
      tolerance: 0,
      hint: "Subtract 1 from the FIND position: =LEFT(Employee_Roster!C2, FIND(\"@\", Employee_Roster!C2)-1).",
      commonMistakes: [
        { pattern: "FIND\\(\"@\"[^)]+\\)\\)", message: "Remember to subtract 1 to exclude the '@' character from the username." }
      ],
      check: {
        expected: "elena.rostova",
        tolerance: 0,
        mustUseAnyOf: [["LEFT"], ["FIND"]],
        mustReference: ["Employee_Roster!C2"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["C"],
        params: [],
        previewRows: 1,
        summary: "Extracts username before @ symbol dynamically."
      }
    },
    {
      id: "c08",
      number: 8,
      title: "Dynamic Domain Extraction (MID + FIND)",
      difficulty: "medium",
      bloom: "apply",
      prompt: "In sheet <code>Text_Parsing_Lab</code> cell <strong>B9</strong>, to verify organizational email host domains for mail exchange server routing, dynamically extract the domain suffix following the <code>@</code> symbol from Elena Rostova's work email in <code>Employee_Roster!C2</code> by composing <code>=MID()</code> with <code>=FIND()</code>.",
      targetSheet: "Text_Parsing_Lab",
      targetCell: "B9",
      solution: '=MID(Employee_Roster!C2, FIND("@", Employee_Roster!C2)+1, 50)',
      expectedFormulaPrefix: "=MID",
      expectedValue: "apextalent.com",
      tolerance: 0,
      hint: "Start at FIND(\"@\", ...) + 1: =MID(Employee_Roster!C2, FIND(\"@\", Employee_Roster!C2)+1, 50).",
      commonMistakes: [
        { pattern: "-1", message: "Add 1 to start extraction immediately after the @ delimiter." }
      ],
      check: {
        expected: "apextalent.com",
        tolerance: 0,
        mustUseAnyOf: [["MID"], ["FIND"]],
        mustReference: ["Employee_Roster!C2"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["C"],
        params: [],
        previewRows: 1,
        summary: "Extracts domain following @ delimiter dynamically."
      }
    },
    {
      id: "c09",
      number: 9,
      title: "First Name Extraction via Space Delimiter (LEFT + SEARCH)",
      difficulty: "medium",
      bloom: "apply",
      prompt: "In sheet <code>Text_Parsing_Lab</code> cell <strong>B10</strong>, to populate automated onboarding greeting templates with employee given names, dynamically extract Elena Rostova's first name by finding the space delimiter in <code>Employee_Roster!B2</code> composing <code>=LEFT()</code> with <code>=SEARCH()</code>.",
      targetSheet: "Text_Parsing_Lab",
      targetCell: "B10",
      solution: '=LEFT(Employee_Roster!B2, SEARCH(" ", Employee_Roster!B2)-1)',
      expectedFormulaPrefix: "=LEFT",
      expectedValue: "Elena",
      tolerance: 0,
      hint: "Extract before space: =LEFT(Employee_Roster!B2, SEARCH(\" \", Employee_Roster!B2)-1).",
      commonMistakes: [
        { pattern: "\\b5\\b", message: "Do not hardcode character length 5; use SEARCH to support names of any length." }
      ],
      check: {
        expected: "Elena",
        tolerance: 0,
        mustUseAnyOf: [["LEFT"], ["SEARCH"]],
        mustReference: ["Employee_Roster!B2"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["B"],
        params: [],
        previewRows: 1,
        summary: "Dynamically extracts first name before space delimiter."
      }
    },
    {
      id: "c10",
      number: 10,
      title: "Last Name Extraction via Space Delimiter (MID + SEARCH)",
      difficulty: "medium",
      bloom: "apply",
      prompt: "In sheet <code>Text_Parsing_Lab</code> cell <strong>B11</strong>, to index personnel files alphabetically by surname, dynamically extract Elena Rostova's last name from <code>Employee_Roster!B2</code> starting immediately after the space delimiter by composing <code>=MID()</code> with <code>=SEARCH()</code>.",
      targetSheet: "Text_Parsing_Lab",
      targetCell: "B11",
      solution: '=MID(Employee_Roster!B2, SEARCH(" ", Employee_Roster!B2)+1, 50)',
      expectedFormulaPrefix: "=MID",
      expectedValue: "Rostova",
      tolerance: 0,
      hint: "Start at space + 1: =MID(Employee_Roster!B2, SEARCH(\" \", Employee_Roster!B2)+1, 50).",
      commonMistakes: [
        { pattern: "RIGHT", message: "MID starting at SEARCH(\" \", text) + 1 is more resilient than computing trailing character offsets with RIGHT." }
      ],
      check: {
        expected: "Rostova",
        tolerance: 0,
        mustUseAnyOf: [["MID"], ["SEARCH"]],
        mustReference: ["Employee_Roster!B2"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["B"],
        params: [],
        previewRows: 1,
        summary: "Dynamically extracts surname following space delimiter."
      }
    },
    {
      id: "c11",
      number: 11,
      title: "Case-Sensitive Department Tag Validation (FIND)",
      difficulty: "medium",
      bloom: "analyze",
      prompt: "In sheet <code>Text_Parsing_Lab</code> cell <strong>B12</strong>, to audit system metadata records for engineering department clearance, locate the 1-based starting position of the uppercase tag <code>\"ENG\"</code> within Elena Rostova's raw metadata string in <code>Employee_Roster!J2</code> using case-sensitive <code>=FIND()</code>.",
      targetSheet: "Text_Parsing_Lab",
      targetCell: "B12",
      solution: '=FIND("ENG", Employee_Roster!J2)',
      expectedFormulaPrefix: "=FIND",
      expectedValue: 14,
      tolerance: 0,
      hint: "Locate position with =FIND(\"ENG\", Employee_Roster!J2).",
      commonMistakes: [
        { pattern: "SEARCH", message: "Use FIND() for strict case-sensitive matching." }
      ],
      check: {
        expected: 14,
        tolerance: 0,
        mustUseAnyOf: [["FIND"]],
        mustReference: ["Employee_Roster!J2"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["J"],
        params: [],
        previewRows: 1,
        summary: "Performs strict case-sensitive position lookup inside metadata string."
      }
    },
    {
      id: "c12",
      number: 12,
      title: "Compound Badge Code Creation (CONCAT)",
      difficulty: "medium",
      bloom: "apply",
      prompt: "In sheet <code>Text_Parsing_Lab</code> cell <strong>B13</strong>, to generate standardized physical security badge labels, assemble a compound badge string combining Elena Rostova's full name (<code>Employee_Roster!B2</code>), literal delimiter <code>\" [\"</code>, employee code (<code>Employee_Roster!A2</code>), and closing <code>\"]\"</code> using <code>=CONCAT()</code>.",
      targetSheet: "Text_Parsing_Lab",
      targetCell: "B13",
      solution: '=CONCAT(Employee_Roster!B2, " [", Employee_Roster!A2, "]")',
      expectedFormulaPrefix: "=CONCAT",
      expectedValue: "Elena Rostova [ATG-8492-NY]",
      tolerance: 0,
      hint: "Join parts with =CONCAT(Employee_Roster!B2, \" [\", Employee_Roster!A2, \"]\").",
      commonMistakes: [
        { pattern: "&", message: "Use the modern CONCAT() function for structured string assembly." }
      ],
      check: {
        expected: "Elena Rostova [ATG-8492-NY]",
        tolerance: 0,
        mustUseAnyOf: [["CONCAT"]],
        mustReference: ["Employee_Roster!B2", "Employee_Roster!A2"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["A", "B"],
        params: [],
        previewRows: 1,
        summary: "Assembles composite corporate badge string using CONCAT."
      }
    },
    {
      id: "c13",
      number: 13,
      title: "Semicolon-Delimited Distribution List (TEXTJOIN)",
      difficulty: "medium",
      bloom: "apply",
      prompt: "In sheet <code>Text_Parsing_Lab</code> cell <strong>B14</strong>, to generate an executive email broadcast distribution list for the engineering cohort, aggregate the work emails across <code>Employee_Roster!C2:C6</code> into a semicolon-separated string using <code>=TEXTJOIN(\"; \", TRUE, Employee_Roster!C2:C6)</code>.",
      targetSheet: "Text_Parsing_Lab",
      targetCell: "B14",
      solution: '=TEXTJOIN("; ", TRUE, Employee_Roster!C2:C6)',
      expectedFormulaPrefix: "=TEXTJOIN",
      expectedValue: "elena.rostova@apextalent.com; marcus.vance@apextalent.com; priya.sharma@apextalent.com; david.miller@apextalent.com; chloe.dubois@apextalent.com",
      tolerance: 0,
      hint: "Aggregate range: =TEXTJOIN(\"; \", TRUE, Employee_Roster!C2:C6).",
      commonMistakes: [
        { pattern: "CONCAT", message: "Use TEXTJOIN to automatically inject delimiters between elements in a range." }
      ],
      check: {
        expected: "elena.rostova@apextalent.com; marcus.vance@apextalent.com; priya.sharma@apextalent.com; david.miller@apextalent.com; chloe.dubois@apextalent.com",
        tolerance: 0,
        mustUseAnyOf: [["TEXTJOIN"]],
        mustReference: ["Employee_Roster!C2:C6"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["C"],
        params: [],
        previewRows: 5,
        summary: "Creates email distribution blast string using TEXTJOIN."
      }
    },
    {
      id: "c14",
      number: 14,
      title: "Delimited Skill Tag Semicolon Formatting (SUBSTITUTE)",
      difficulty: "medium",
      bloom: "analyze",
      prompt: "In sheet <code>Text_Parsing_Lab</code> cell <strong>B15</strong>, to format competency data for enterprise ERP applicant tracking ingestion, reformat Elena Rostova's skill tags in <code>Employee_Roster!I2</code> by substituting all comma-space separators (<code>\", \"</code>) with semicolon-space separators (<code>\"; \"</code>) using <code>=SUBSTITUTE()</code>.",
      targetSheet: "Text_Parsing_Lab",
      targetCell: "B15",
      solution: '=SUBSTITUTE(Employee_Roster!I2, ", ", "; ")',
      expectedFormulaPrefix: "=SUBSTITUTE",
      expectedValue: "AWS; Python; Terraform",
      tolerance: 0,
      hint: "Replace delimiters with =SUBSTITUTE(Employee_Roster!I2, \", \", \"; \").",
      commonMistakes: [
        { pattern: "REPLACE", message: "Use SUBSTITUTE() to replace target substrings by text value rather than character index." }
      ],
      check: {
        expected: "AWS; Python; Terraform",
        tolerance: 0,
        mustUseAnyOf: [["SUBSTITUTE"]],
        mustReference: ["Employee_Roster!I2"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["I"],
        params: [],
        previewRows: 1,
        summary: "Replaces comma separators with standardized semicolons."
      }
    },
    {
      id: "c15",
      number: 15,
      title: "Delimited Skill Array Extraction (INDEX + TEXTSPLIT)",
      difficulty: "hard",
      bloom: "analyze",
      prompt: "In sheet <code>Text_Parsing_Lab</code> cell <strong>B16</strong>, to identify Elena Rostova's primary technical competency for staffing allocation, parse the comma-separated skill tags in <code>Employee_Roster!I2</code> and retrieve the first element by composing <code>=INDEX()</code> with <code>=TEXTSPLIT()</code>.",
      targetSheet: "Text_Parsing_Lab",
      targetCell: "B16",
      solution: '=INDEX(TEXTSPLIT(Employee_Roster!I2, ", "), 1)',
      expectedFormulaPrefix: "=INDEX",
      expectedValue: "AWS",
      tolerance: 0,
      hint: "Split and index item 1: =INDEX(TEXTSPLIT(Employee_Roster!I2, \", \"), 1).",
      commonMistakes: [
        { pattern: "LEFT", message: "Use dynamic TEXTSPLIT and INDEX for delimiter-based array extraction." }
      ],
      check: {
        expected: "AWS",
        tolerance: 0,
        mustUseAnyOf: [["INDEX"], ["TEXTSPLIT"]],
        mustReference: ["Employee_Roster!I2"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["I"],
        params: [],
        previewRows: 1,
        summary: "Splits delimited string into dynamic array and extracts 1st element."
      }
    },
    {
      id: "c16",
      number: 16,
      title: "Sanitary Email Domain Masking (SUBSTITUTE)",
      difficulty: "hard",
      bloom: "analyze",
      prompt: "In sheet <code>Text_Parsing_Lab</code> cell <strong>B17</strong>, to execute an automated corporate affiliate domain migration, replace the legacy domain <code>\"apextalent.com\"</code> with <code>\"partner.apex.org\"</code> in Elena Rostova's email from <code>Employee_Roster!C2</code> using <code>=SUBSTITUTE()</code>.",
      targetSheet: "Text_Parsing_Lab",
      targetCell: "B17",
      solution: '=SUBSTITUTE(Employee_Roster!C2, "apextalent.com", "partner.apex.org")',
      expectedFormulaPrefix: "=SUBSTITUTE",
      expectedValue: "elena.rostova@partner.apex.org",
      tolerance: 0,
      hint: "Substitute domain: =SUBSTITUTE(Employee_Roster!C2, \"apextalent.com\", \"partner.apex.org\").",
      commonMistakes: [
        { pattern: "CONCAT", message: "Use SUBSTITUTE() to perform surgical in-place domain swapping." }
      ],
      check: {
        expected: "elena.rostova@partner.apex.org",
        tolerance: 0,
        mustUseAnyOf: [["SUBSTITUTE"]],
        mustReference: ["Employee_Roster!C2"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["C"],
        params: [],
        previewRows: 1,
        summary: "Performs surgical corporate domain migration via string substitution."
      }
    },
    {
      id: "c17",
      number: 17,
      title: "Substring Extraction Between Boundaries (MID + FIND)",
      difficulty: "hard",
      bloom: "analyze",
      prompt: "In sheet <code>Text_Parsing_Lab</code> cell <strong>B18</strong>, to extract cost-center routing keys from unformatted system metadata, parse the 3-character department code following <code>\"DEPT:\"</code> in Elena Rostova's raw metadata string (<code>Employee_Roster!J2</code>) by composing <code>=MID()</code> with <code>=FIND()</code>.",
      targetSheet: "Text_Parsing_Lab",
      targetCell: "B18",
      solution: '=MID(Employee_Roster!J2, FIND("DEPT:", Employee_Roster!J2)+5, 3)',
      expectedFormulaPrefix: "=MID",
      expectedValue: "ENG",
      tolerance: 0,
      hint: "Start 5 characters past DEPT: =MID(Employee_Roster!J2, FIND(\"DEPT:\", Employee_Roster!J2)+5, 3).",
      commonMistakes: [
        { pattern: "\\bLEFT\\b", message: "Use MID() to extract tokens nested between interior boundaries." }
      ],
      check: {
        expected: "ENG",
        tolerance: 0,
        mustUseAnyOf: [["MID"], ["FIND"]],
        mustReference: ["Employee_Roster!J2"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["J"],
        params: [],
        previewRows: 1,
        summary: "Extracts interior metadata attribute delimited by key prefixes."
      }
    },
    {
      id: "c18",
      number: 18,
      title: "Department Normalization (UPPER + TRIM)",
      difficulty: "hard",
      bloom: "evaluate",
      prompt: "In sheet <code>Text_Parsing_Lab</code> cell <strong>B19</strong>, to standardize department classifications for executive headcount rollups, normalize Elena Rostova's department name in <code>Employee_Roster!E2</code> by eliminating whitespace and forcing uppercase letters composing <code>=UPPER()</code> with <code>=TRIM()</code>.",
      targetSheet: "Text_Parsing_Lab",
      targetCell: "B19",
      solution: '=UPPER(TRIM(Employee_Roster!E2))',
      expectedFormulaPrefix: "=UPPER",
      expectedValue: "ENGINEERING",
      tolerance: 0,
      hint: "Combine uppercase and trim: =UPPER(TRIM(Employee_Roster!E2)).",
      commonMistakes: [
        { pattern: "PROPER", message: "Use UPPER() to enforce complete uppercase standardization." }
      ],
      check: {
        expected: "ENGINEERING",
        tolerance: 0,
        mustUseAnyOf: [["UPPER"], ["TRIM"]],
        mustReference: ["Employee_Roster!E2"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["E"],
        params: [],
        previewRows: 1,
        summary: "Standardizes department categorization string via uppercase trimming."
      }
    },
    {
      id: "c19",
      number: 19,
      title: "Dynamic Grade Band Lookup via Substring Key (XLOOKUP)",
      difficulty: "hard",
      bloom: "evaluate",
      prompt: "In sheet <code>Text_Parsing_Lab</code> cell <strong>B20</strong>, to map compensation seniority bands to executive job titles, look up Elena Rostova's grade band code (<code>Employee_Roster!F2</code>) within <code>Job_Grades!A2:A6</code> and return the title from <code>Job_Grades!B2:B6</code> using <code>=XLOOKUP()</code>.",
      targetSheet: "Text_Parsing_Lab",
      targetCell: "B20",
      solution: '=XLOOKUP(Employee_Roster!F2, Job_Grades!A2:A6, Job_Grades!B2:B6)',
      expectedFormulaPrefix: "=XLOOKUP",
      expectedValue: "Principal / Director",
      tolerance: 0,
      hint: "Query job master: =XLOOKUP(Employee_Roster!F2, Job_Grades!A2:A6, Job_Grades!B2:B6).",
      commonMistakes: [
        { pattern: "VLOOKUP", message: "Use modern XLOOKUP for table reference matching." }
      ],
      check: {
        expected: "Principal / Director",
        tolerance: 0,
        mustUseAnyOf: [["XLOOKUP"]],
        mustReference: ["Employee_Roster!F2", "Job_Grades!A2:A6", "Job_Grades!B2:B6"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["F", "A", "B"],
        params: [],
        previewRows: 1,
        summary: "Joins employee record to master job grades using relational XLOOKUP."
      }
    },
    {
      id: "c20",
      number: 20,
      title: "Executive Composite Bio Formatting (CONCAT + TEXT)",
      difficulty: "hard",
      bloom: "create",
      prompt: "In sheet <code>Text_Parsing_Lab</code> cell <strong>B21</strong>, to build a publication-ready profile for the annual leadership briefing, assemble Elena Rostova's full name (<code>Employee_Roster!B2</code>), job title (<code>Employee_Roster!D2</code>), department (<code>Employee_Roster!E2</code>), and base salary (<code>Employee_Roster!G2</code> formatted with <code>TEXT(..., \"#,##0\")</code>) into <code>\"Elena Rostova - Lead Cloud Architect (Engineering) - $165,000\"</code> composing <code>=CONCAT()</code> with <code>=TEXT()</code>.",
      targetSheet: "Text_Parsing_Lab",
      targetCell: "B21",
      solution: '=CONCAT(Employee_Roster!B2, " - ", Employee_Roster!D2, " (", Employee_Roster!E2, ") - $", TEXT(Employee_Roster!G2, "#,##0"))',
      expectedFormulaPrefix: "=CONCAT",
      expectedValue: "Elena Rostova - Lead Cloud Architect (Engineering) - $165,000",
      tolerance: 0,
      hint: "Assemble with =CONCAT(Employee_Roster!B2, \" - \", Employee_Roster!D2, \" (\", Employee_Roster!E2, \") - $\", TEXT(Employee_Roster!G2, \"#,##0\")).",
      commonMistakes: [
        { pattern: "&", message: "Use CONCAT() function to combine text and formatted numeric elements." }
      ],
      check: {
        expected: "Elena Rostova - Lead Cloud Architect (Engineering) - $165,000",
        tolerance: 0,
        mustUseAnyOf: [["CONCAT"], ["TEXT"]],
        mustReference: ["Employee_Roster!B2", "Employee_Roster!D2", "Employee_Roster!E2", "Employee_Roster!G2"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["B", "D", "E", "G"],
        params: [],
        previewRows: 1,
        summary: "Generates executive profile narrative combining multiple text and formatted currency tokens."
      }
    }
  ]
};
