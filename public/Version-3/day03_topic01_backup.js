// Day 03: Topic 01 (Pattern Matching & NULL Handling) Slides & Configurations Backup
// Created: 2026-07-11

const DAY03_TOPIC01_BACKUP = {
  title: '03. Pattern Matching & NULL Handling',
  
  // Extended SQLite Database Schema
  schema: {
    createSQL: `CREATE TABLE employees (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      department TEXT NOT NULL,
      salary INTEGER NOT NULL,
      email TEXT,
      commission INTEGER,
      manager_id INTEGER
    );`,
    seedSQL: `INSERT INTO employees VALUES
      (1, 'Aarav Sharma', 'Engineering', 87500, 'aarav.sharma@manodemy.com', 5000, 3),
      (2, 'Priya Desai', 'Marketing', 63200, 'priya.desai@manodemy.com', 3000, 7),
      (3, 'Rohit Mehta', 'Data Science', 112800, 'rohit.mehta@manodemy.com', NULL, NULL),
      (4, 'Sneha Iyer', 'Finance', 74900, 'sneha.iyer@manodemy.com', NULL, 9),
      (5, 'Vikram Nair', 'Engineering', 96300, 'vikram.nair@manodemy.com', 4000, 3),
      (6, 'Anjali Gupta', 'Design', 58700, 'anjali.gupta@manodemy.com', NULL, 10),
      (7, 'Karthik Reddy', 'Marketing', 67400, 'karthik.reddy@manodemy.com', 2500, NULL),
      (8, 'Divya Patel', 'Data Science', 105600, 'divya.patel@manodemy.com', NULL, 3),
      (9, 'Arjun Joshi', 'Finance', 71200, 'arjun.joshi@manodemy.com', 1500, NULL),
      (10, 'Meera Krishnan', 'Design', 62800, 'meera.krishnan@manodemy.com', NULL, NULL);`,
    columns: [
      { name: 'id', type: 'INTEGER', pk: true },
      { name: 'name', type: 'TEXT', pk: false },
      { name: 'department', type: 'TEXT', pk: false },
      { name: 'salary', type: 'INTEGER', pk: false },
      { name: 'email', type: 'TEXT', pk: false },
      { name: 'commission', type: 'INTEGER', pk: false },
      { name: 'manager_id', type: 'INTEGER', pk: false }
    ]
  },

  // Practice Questions
  practiceQuestions: [
    {
      id: 1,
      prompt: 'Write a query to retrieve all columns for employees whose <code>name</code> starts with the letter \'A\'.',
      referenceSql: "SELECT * FROM employees WHERE name LIKE 'A%';"
    },
    {
      id: 2,
      prompt: 'Write a query to retrieve the <code>name</code> of all employees who do not receive any commission (<code>commission IS NULL</code>).',
      referenceSql: 'SELECT name FROM employees WHERE commission IS NULL;'
    }
  ],

  // Solution Audio & Typewriter configurations
  questionAudioMap: {
    1: 'Day01topic3/New_Day1Part3Question01.mp3',
    2: 'Day01topic3/New_Day1Part3Question02.mp3'
  },
  questionSolutionMap: {
    1: { src: 'Day01topic3/New_Day1Part3Question01_sol.mp3', code: "SELECT * FROM employees WHERE name LIKE 'A%';", startAt: 1.5, charInterval: 110 },
    2: { src: 'Day01topic3/New_Day1Part3Question02_sol.mp3', code: 'SELECT name FROM employees WHERE commission IS NULL;', startAt: 1.5, charInterval: 110 }
  },

  // Audio Playback & Tracks Configuration
  audioDurations: [20.0, 22.0, 18.0, 25.0, 19.0, 21.0, 24.0, 26.0, 23.0, 20.0, 18.0, 22.0, 30.0, 32.0, 28.0, 25.0, 22.0, 24.0],
  audioTracks: [
    { src: 'Day01topic3/New_Day1Part3audio01.mp3', target: '#patternMatchingIntro', title: 'What is Pattern Matching?' },
    { src: 'Day01topic3/New_Day1Part3audio02.mp3', target: '#likeWildcards', title: 'LIKE Operator & Wildcards' },
    { src: 'Day01topic3/New_Day1Part3audio03.mp3', target: '#escapeSection', title: 'Escaping Wildcards' },
    { src: 'Day01topic3/New_Day1Part3audio04.mp3', target: '#caseSensitivity', title: 'Case Sensitivity: ILIKE vs LOWER' },
    { src: 'Day01topic3/New_Day1Part3audio05.mp3', target: '#nullDefinition', title: 'What is NULL?' },
    { src: 'Day01topic3/New_Day1Part3audio06.mp3', target: '#nullComparisons', title: 'NULL in Comparisons' },
    { src: 'Day01topic3/New_Day1Part3audio07.mp3', target: '#isNullFilters', title: 'Filtering with IS NULL' },
    { src: 'Day01topic3/New_Day1Part3audio08.mp3', target: '#coalesceHandling', title: 'Handling NULLs with COALESCE' },
    { src: 'Day01topic3/New_Day1Part3audio09.mp3', target: '#nullifHandling', title: 'Preventing Division by Zero with NULLIF' },
    { src: 'Day01topic3/New_Day1Part3audio10.mp3', target: '#nullAggregates', title: 'NULLs in Aggregate Functions' },
    { src: 'Day01topic3/New_Day1Part3audio11.mp3', target: '#nullSorting', title: 'Sorting NULL values' },
    { src: 'Day01topic3/New_Day1Part3audio12.mp3', target: '#performanceWildcards', title: 'Performance: Leading Wildcards' },
    { src: 'Day01topic3/New_Day1Part3audio13.mp3', target: '#iqPatternMatching', title: 'Interview Q1: Wildcards' },
    { src: 'Day01topic3/New_Day1Part3audio14.mp3', target: '#iqNullHandling', title: 'Interview Q2: IS NULL vs = NULL' },
    { src: 'Day01topic3/New_Day1Part3audio15.mp3', target: '#iqCoalesceNullif', title: 'Interview Q3: COALESCE vs NULLIF' },
    // ── Practice Questions & Solutions ──
    { src: 'Day01topic3/New_Day1Part3Question01.mp3', target: '#questionBar', title: 'Q1: Name starts with A', type: 'question', qId: 1 },
    { src: 'Day01topic3/New_Day1Part3Question01_sol.mp3', target: '#questionBar', title: 'Q1 Solution: LIKE', type: 'solution', qId: 1 },
    { src: 'Day01topic3/New_Day1Part3Question02.mp3', target: '#questionBar', title: 'Q2: Commission is NULL', type: 'question', qId: 2 }
  ],

  // Scrimba lesson track actions
  lessonTrack: {
    id: 'day03-track',
    title: 'Day 03: Pattern Matching & NULL Handling',
    duration: 100000,
    chapters: [
      { t: 0,     label: '🔍 LIKE Operator & Wildcards', slideIdx: 2 },
      { t: 30000, label: '💻 Interactive Demo',         slideIdx: 2 },
      { t: 60000, label: '❓ NULL Handling & COALESCE',  slideIdx: 2 },
    ],
    actions: [
      { t: 0,     type: 'slide',    slideIdx: 2 },
      { t: 0,     type: 'snapshot', content: '-- Write your SQL query here\\n' },
      { t: 0,     type: 'caption',  text: '🔍 Welcome to Day 03! Today we cover Pattern Matching and the mystery of NULL values.' },
      { t: 8000,  type: 'caption',  text: 'LIKE matches text: % for zero/more characters, _ for exactly one character.' },
      { t: 18000, type: 'caption',  text: 'LOWER() + LIKE allows case-insensitive searches in standard ANSI SQL.' },
      { t: 30000, type: 'snapshot', content: '' },
      { t: 30000, type: 'caption',  text: '💻 Let\\\'s query employees with names starting with A.' },
      { t: 31000, type: 'type',     content: 'SELECT * FROM employees\\nWHERE name LIKE \\\'A%\\\';', speed: 65 },
      { t: 48000, type: 'run',      query: 'SELECT * FROM employees WHERE name LIKE \\\'A%\\\';' },
      { t: 48000, type: 'caption',  text: '✅ Found employees whose name starts with A!' },
      { t: 60000, type: 'caption',  text: '❓ NULL represents the absence of a value — it is unknown, not zero or empty string.' },
      { t: 70000, type: 'snapshot', content: 'SELECT * FROM employees WHERE commission IS NULL;' },
      { t: 71000, type: 'run',      query: 'SELECT * FROM employees WHERE commission IS NULL;' },
      { t: 71000, type: 'caption',  text: '✅ Filtered employees using IS NULL constraint. Never use = NULL!' },
      { t: 85000, type: 'snapshot', content: 'SELECT name, COALESCE(commission, 0) AS clean_commission FROM employees;' },
      { t: 86000, type: 'run',      query: 'SELECT name, COALESCE(commission, 0) AS clean_commission FROM employees;' },
      { t: 86000, type: 'caption',  text: '🎉 COALESCE replaces NULL with 0, making computations safe and clean!' }
    ]
  },

  // Developed HTML presentation slide
  html: `
        <h2>🔍 03. Pattern Matching &amp; NULL Handling</h2>

        <div class="slide-section" id="patternMatchingIntro">
          <h3 class="heading-with-audio">
            What is Pattern Matching?
            <button class="audio-play-btn" onclick="playAudio('Day01topic3/New_Day1Part3audio01.mp3', this)" title="Play narration">
              <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </button>
          </h3>
          <p><strong>Pattern Matching</strong> allows you to search for rows when you do not know the exact text value. In SQL, this is performed using the <code>LIKE</code> operator alongside <strong>wildcard characters</strong>. It is essential for searching user names, emails, descriptions, and unstructured text fields.</p>

          <div class="rdbms-infographic" id="likeWildcards">
            <div class="heading-with-audio" style="display: flex; align-items: center; gap: 8px; margin-bottom: 10px;">
              <small style="flex: 1; color: #64748b; font-size: 0.75rem;">The two primary wildcard characters in standard SQL:</small>
              <button class="audio-play-btn" onclick="playAudio('Day01topic3/New_Day1Part3audio02.mp3', this)" title="Play narration" style="flex-shrink: 0;">
                <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              </button>
            </div>
            <div class="info-columns">
              <div class="info-card info-card--blue">
                <div class="info-card-header">% WILDCARD</div>
                <ul class="info-card-bullets">
                  <li><span class="bullet-dot"></span>MATCHES ZERO OR MORE CHARACTERS</li>
                  <li><span class="bullet-dot"></span><code>'A%'</code>: STARTS WITH "A"</li>
                  <li><span class="bullet-dot"></span><code>'%com'</code>: ENDS WITH ".com"</li>
                  <li><span class="bullet-dot"></span><code>'%data%'</code>: CONTAINS "data" ANYWHERE</li>
                </ul>
              </div>
              <div class="info-card info-card--purple">
                <div class="info-card-header">_ WILDCARD</div>
                <ul class="info-card-bullets">
                  <li><span class="bullet-dot"></span>MATCHES EXACTLY ONE CHARACTER</li>
                  <li><span class="bullet-dot"></span><code>'A_'</code>: EXACTLY 2 CHARACTERS STARTING WITH "A"</li>
                  <li><span class="bullet-dot"></span><code>'___'</code>: EXACTLY 3 CHARACTERS LONG</li>
                  <li><span class="bullet-dot"></span><code>'_a%'</code>: "a" IS THE SECOND CHARACTER</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="slide-section" id="escapeSection">
          <div class="heading-with-audio" style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
            <h3 style="margin: 0; flex: 1;">🛡️ Escaping Wildcard Characters</h3>
            <button class="audio-play-btn" onclick="playAudio('Day01topic3/New_Day1Part3audio03.mp3', this)" title="Play narration" style="flex-shrink: 0;">
              <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </button>
          </div>
          <p>If you need to search for a literal percentage sign (<code>%</code>) or underscore (<code>_</code>) in your text, you must define an escape character using the <code>ESCAPE</code> keyword:</p>
          <pre>-- Find discount codes starting with "10%"
SELECT * FROM products
WHERE discount_code LIKE '10\\\\%' ESCAPE '\\\\';</pre>
        </div>

        <div class="slide-section" id="caseSensitivity">
          <div class="heading-with-audio" style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
            <h3 style="margin: 0; flex: 1;">🔤 Case Sensitivity: ILIKE vs. LOWER</h3>
            <button class="audio-play-btn" onclick="playAudio('Day01topic3/New_Day1Part3audio04.mp3', this)" title="Play narration" style="flex-shrink: 0;">
              <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </button>
          </div>
          <div class="vs-block">
            <div class="vs-card vs-card--good">
              <h4 style="color: #047857;">🟢 Case-Insensitive (PostgreSQL)</h4>
              <pre style="margin: 8px 0 0 0; font-size: 0.74rem;">WHERE email ILIKE '%@gmail.com'</pre>
              <small style="color: #64748b; font-size: 0.72rem; display: block; margin-top: 4px;">PostgreSQL-specific operator.</small>
            </div>
            <div class="vs-card vs-card--good">
              <h4 style="color: #1d4ed8;">🔵 Standard SQL (Cross-DB)</h4>
              <pre style="margin: 8px 0 0 0; font-size: 0.74rem;">WHERE LOWER(email) LIKE '%@gmail.com'</pre>
              <small style="color: #64748b; font-size: 0.72rem; display: block; margin-top: 4px;">Converts string to lowercase first. Recommended.</small>
            </div>
          </div>
        </div>

        <div class="slide-section" id="nullDefinition">
          <h3 class="heading-with-audio">
            What is NULL?
            <button class="audio-play-btn" onclick="playAudio('Day01topic3/New_Day1Part3audio05.mp3', this)" title="Play narration">
              <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </button>
          </h3>
          <p>In relational databases, <strong>NULL</strong> represents the <strong>complete absence of data</strong>. It is a placeholder indicating that a value is <em>missing, unknown, or not applicable</em>. It is not equivalent to zero (<code>0</code>), an empty string (<code>''</code>), or a boolean <code>FALSE</code>.</p>

          <div class="relation-infographic" style="padding: 16px 20px;" id="nullComparisons">
            <div class="heading-with-audio" style="display: flex; align-items: center; gap: 8px; margin-bottom: 10px;">
              <div class="explanation-title" style="margin: 0; flex: 1;">Three-Valued Logic in SQL Comparisons</div>
              <button class="audio-play-btn" onclick="playAudio('Day01topic3/New_Day1Part3audio06.mp3', this)" title="Play narration" style="flex-shrink: 0;">
                <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              </button>
            </div>
            <div class="relation-visual" style="justify-content: center; gap: 12px; flex-wrap: wrap;">
              <div class="relation-node" style="border-left: 4px solid #ef4444; flex: none; width: 140px;">
                <span class="node-icon">❌</span>
                <div class="node-title">NULL = 5</div>
                <div class="node-subtitle">Evaluates to UNKNOWN</div>
              </div>
              <div class="relation-node" style="border-left: 4px solid #ef4444; flex: none; width: 140px;">
                <span class="node-icon">❌</span>
                <div class="node-title">NULL = NULL</div>
                <div class="node-subtitle">Evaluates to UNKNOWN</div>
              </div>
              <div class="relation-node" style="border-left: 4px solid #10b981; flex: none; width: 140px;">
                <span class="node-icon">✅</span>
                <div class="node-title">val IS NULL</div>
                <div class="node-subtitle">Evaluates to TRUE/FALSE</div>
              </div>
            </div>
            <p style="font-size: 0.76rem; color: #64748b; margin-top: 10px; text-align: center;">Because comparisons with NULL yield <em>UNKNOWN</em>, rows with NULL values are automatically filtered out of standard <code>WHERE</code> clauses!</p>
          </div>
        </div>

        <div class="slide-section" id="isNullFilters">
          <div class="heading-with-audio" style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
            <h3 style="margin: 0; flex: 1;">🔍 Filtering NULL Values</h3>
            <button class="audio-play-btn" onclick="playAudio('Day01topic3/New_Day1Part3audio07.mp3', this)" title="Play narration" style="flex-shrink: 0;">
              <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </button>
          </div>
          <div class="vs-block">
            <div class="vs-card vs-card--bad">
              <h4>❌ Incorrect Comparison</h4>
              <pre style="margin: 0; font-size: 0.75rem;">SELECT * FROM employees\\nWHERE manager_id = NULL;\\n-- Evaluates to UNKNOWN.\\n-- Returns ZERO rows!</pre>
            </div>
            <div class="vs-card vs-card--good">
              <h4>✅ Correct Filtering</h4>
              <pre style="margin: 0; font-size: 0.75rem;">SELECT * FROM employees\\nWHERE manager_id IS NULL;\\n-- Finds top-level employees.\\n-- Returns correct rows!</pre>
            </div>
          </div>
        </div>

        <div class="slide-section" id="coalesceHandling">
          <div class="heading-with-audio" style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
            <h3 style="margin: 0; flex: 1;">🔄 COALESCE — Null Substitution</h3>
            <button class="audio-play-btn" onclick="playAudio('Day01topic3/New_Day1Part3audio08.mp3', this)" title="Play narration" style="flex-shrink: 0;">
              <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </button>
          </div>
          <p>The <code>COALESCE</code> function accepts multiple arguments and returns the <strong>first non-NULL value</strong>. It is commonly used to clean reports by replacing missing values with a default.</p>
          <pre>-- Replace NULL commission with 0
SELECT name, salary + COALESCE(commission, 0) AS total_pay
FROM employees;</pre>
        </div>

        <div class="slide-section" id="nullifHandling">
          <div class="heading-with-audio" style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
            <h3 style="margin: 0; flex: 1;">⚡ NULLIF — Safe Division</h3>
            <button class="audio-play-btn" onclick="playAudio('Day01topic3/New_Day1Part3audio09.mp3', this)" title="Play narration" style="flex-shrink: 0;">
              <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </button>
          </div>
          <p><code>NULLIF(val1, val2)</code> returns <strong>NULL if val1 = val2</strong>, otherwise returns val1. This is the classic trick to prevent runtime division-by-zero crashes:</p>
          <pre>-- Returns NULL instead of crashing if units_sold is 0
SELECT product_id, revenue / NULLIF(units_sold, 0) AS avg_unit_price
FROM sales;</pre>
        </div>

        <div class="slide-section" id="nullAggregates">
          <div class="heading-with-audio" style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
            <h3 style="margin: 0; flex: 1;">📈 NULL in Aggregates and Sorting</h3>
            <button class="audio-play-btn" onclick="playAudio('Day01topic3/New_Day1Part3audio10.mp3', this)" title="Play narration" style="flex-shrink: 0;">
              <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </button>
          </div>
          <div class="vs-block">
            <div class="vs-card" id="nullSorting" style="border-left: 4px solid #3b82f6;">
              <h4 style="color: #1d4ed8;">📊 Sorting (ORDER BY)</h4>
              <p>In standard SQL, NULLs are treated as the largest values (sort last in ASC, first in DESC). You can control this position explicitly:</p>
              <pre style="margin: 8px 0 0 0; font-size: 0.74rem;">ORDER BY commission ASC NULLS LAST</pre>
            </div>
            <div class="vs-card" style="border-left: 4px solid #10b981;">
              <h4 style="color: #047857;">🧮 Aggregate Functions</h4>
              <p>Aggregate functions like <code>SUM</code>, <code>AVG</code>, and <code>COUNT(column)</code> ignore NULL values. However, <code>COUNT(*)</code> counts all rows, even if they contain only NULLs.</p>
            </div>
          </div>
        </div>

        <div class="slide-section" id="performanceWildcards">
          <div class="pro-tip-box" style="display: flex; align-items: flex-start; gap: 10px;">
            <div style="flex: 1;">
              <strong>💡 Pro Tip — Leading Wildcard Performance Warning:</strong> A query filter like <code>LIKE 'Sales%'</code> can use a standard B-Tree index scan because the starting characters are fixed. However, <code>LIKE '%Sales%'</code> or <code>LIKE '%Sales'</code> (with leading wildcards) forces a complete full table scan (sequential scan) because the database has to scan every row to look for the substring. Avoid leading wildcards on high-volume production tables!
            </div>
            <button class="audio-play-btn" onclick="playAudio('Day01topic3/New_Day1Part3audio12.mp3', this)" title="Play narration" style="flex-shrink: 0; margin-top: 2px;">
              <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </button>
          </div>
        </div>

        <div class="slide-section">
          <div class="interview-box">
            <h4 style="margin: 0; margin-bottom: 12px;">🎓 Interview Q&amp;A</h4>
            <div id="iqPatternMatching">
              <div class="heading-with-audio" style="display: flex; align-items: flex-start; gap: 8px; margin-bottom: 4px;">
                <p style="margin: 0; flex: 1;"><strong>Q: What is the difference between % and _ in a LIKE query? How can you search for a literal %?</strong></p>
                <button class="audio-play-btn" onclick="playAudio('Day01topic3/New_Day1Part3audio13.mp3', this)" title="Play narration" style="flex-shrink: 0; margin-top: 2px;">
                  <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                </button>
              </div>
              <p><em>A: The % wildcard matches any string of zero or more characters. The _ wildcard matches exactly one character. To search for a literal % or _, you must define an escape character using the ESCAPE keyword and prefix the wildcard with it in the search pattern, e.g., <code>LIKE '%\%%' ESCAPE '\'</code>.</em></p>
            </div>

            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="iqNullHandling">
              <div class="heading-with-audio" style="display: flex; align-items: flex-start; gap: 8px; margin-bottom: 4px;">
                <p style="margin: 0; flex: 1;"><strong>Q: Why does WHERE manager_id = NULL not return any records? How should you write it instead?</strong></p>
                <button class="audio-play-btn" onclick="playAudio('Day01topic3/New_Day1Part3audio14.mp3', this)" title="Play narration" style="flex-shrink: 0; margin-top: 2px;">
                  <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                </button>
              </div>
              <p><em>A: In SQL, NULL represents an unknown value. Any direct comparison with NULL using operators like = or &lt;&gt; evaluates to UNKNOWN (Three-Valued Logic), not TRUE or FALSE. Since WHERE clauses only pass rows that evaluate to TRUE, no rows will match. To check for NULL values, you must use the <code>IS NULL</code> or <code>IS NOT NULL</code> operators.</em></p>
            </div>

            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="iqCoalesceNullif">
              <div class="heading-with-audio" style="display: flex; align-items: flex-start; gap: 8px; margin-bottom: 4px;">
                <p style="margin: 0; flex: 1;"><strong>Q: Explain COALESCE and NULLIF. Give a practical use case for each.</strong></p>
                <button class="audio-play-btn" onclick="playAudio('Day01topic3/New_Day1Part3audio15.mp3', this)" title="Play narration" style="flex-shrink: 0; margin-top: 2px;">
                  <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                </button>
              </div>
              <p><em>A: COALESCE takes a list of values and returns the first non-NULL item (useful for replacing NULLs with default values, e.g., <code>COALESCE(commission, 0)</code>). NULLIF takes two arguments and returns NULL if they are equal, otherwise it returns the first argument (commonly used to prevent division-by-zero errors by turning 0 into NULL, e.g., <code>salary / NULLIF(days_worked, 0)</code>).</em></p>
            </div>
          </div>
        </div>
      `
};
