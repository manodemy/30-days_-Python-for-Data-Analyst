// Day 01 content
if (!window.COURSE_CONTENT) window.COURSE_CONTENT = {};
window.COURSE_CONTENT['day01'] = {
  "day": 1,
  "title": "Introduction to SQL & Databases",
  "db": "day01_db",
  "emoji": "\ud83d\uddc4\ufe0f",
  "schema": {
    "tables": [
      {
        "name": "employees",
        "createSQL": "CREATE TABLE employees (\n  id INTEGER PRIMARY KEY,\n  name TEXT NOT NULL,\n  department TEXT NOT NULL,\n  salary INTEGER NOT NULL\n);",
        "seedSQL": "INSERT INTO employees VALUES\n  (1, 'Aarav Sharma', 'Engineering', 87500),\n  (2, 'Priya Desai', 'Marketing', 63200),\n  (3, 'Rohit Mehta', 'Data Science', 112800),\n  (4, 'Sneha Iyer', 'Finance', 74900),\n  (5, 'Vikram Nair', 'Engineering', 96300),\n  (6, 'Anjali Gupta', 'Design', 58700),\n  (7, 'Karthik Reddy', 'Marketing', 67400),\n  (8, 'Divya Patel', 'Data Science', 105600),\n  (9, 'Arjun Joshi', 'Finance', 71200),\n  (10, 'Meera Krishnan', 'Design', 62800);",
        "columns": [
          {
            "name": "id",
            "type": "INTEGER",
            "pk": true
          },
          {
            "name": "name",
            "type": "TEXT",
            "pk": false
          },
          {
            "name": "department",
            "type": "TEXT",
            "pk": false
          },
          {
            "name": "salary",
            "type": "INTEGER",
            "pk": false
          }
        ]
      }
    ]
  },
  "practiceQuestions": [
    {
      "id": 1,
      "prompt": "Write a query to retrieve all columns and all rows from the <code>employees</code> table.",
      "referenceSql": "SELECT * FROM employees;"
    },
    {
      "id": 2,
      "prompt": "Write a query to retrieve all columns and rows from the system table <code>sqlite_master</code> to inspect the database structure.",
      "referenceSql": "SELECT * FROM sqlite_master;"
    }
  ],
  "testQuestions": [
    {
      "id": 1,
      "prompt": "Retrieve all columns and rows from <code>employees</code>.",
      "ref": "SELECT * FROM employees;"
    },
    {
      "id": 2,
      "prompt": "Retrieve only <code>name</code> and <code>salary</code> from <code>employees</code>.",
      "ref": "SELECT name, salary FROM employees;"
    },
    {
      "id": 3,
      "prompt": "Retrieve <code>name</code> and <code>department</code>, aliasing <code>name</code> as <code>employee_name</code>.",
      "ref": "SELECT name AS employee_name, department FROM employees;"
    },
    {
      "id": 4,
      "prompt": "Retrieve <code>id</code> and <code>salary</code>, displaying <code>salary</code> under alias <code>annual_pay</code>.",
      "ref": "SELECT id, salary AS annual_pay FROM employees;"
    },
    {
      "id": 5,
      "prompt": "Project <code>department</code> and <code>name</code> in that order (reversed from schema order).",
      "ref": "SELECT department, name FROM employees;"
    },
    {
      "id": 6,
      "prompt": "Calculate a 10% bonus (<code>salary * 0.10</code>) for all employees, aliased as <code>bonus</code>.",
      "ref": "SELECT name, salary * 0.10 AS bonus FROM employees;"
    },
    {
      "id": 7,
      "prompt": "Display names and yearly salary (<code>salary * 12</code>) as <code>yearly_salary</code>.",
      "ref": "SELECT name, salary * 12 AS yearly_salary FROM employees;"
    },
    {
      "id": 8,
      "prompt": "Retrieve name and salary after a flat tax deduction of 5000, aliased as <code>net_salary</code>.",
      "ref": "SELECT name, salary - 5000 AS net_salary FROM employees;"
    },
    {
      "id": 9,
      "prompt": "Retrieve the SQLite engine version using <code>sqlite_version()</code>.",
      "ref": "SELECT sqlite_version();"
    },
    {
      "id": 10,
      "prompt": "Concatenate <code>name || ' - ' || department</code> as <code>employee_details</code>.",
      "ref": "SELECT name || ' - ' || department AS employee_details FROM employees;"
    },
    {
      "id": 11,
      "prompt": "Compute <code>salary / 12.0</code> as <code>monthly_pay</code>.",
      "ref": "SELECT name, salary / 12.0 AS monthly_pay FROM employees;"
    },
    {
      "id": 12,
      "prompt": "Alias <code>salary</code> as <code>monthly_pay</code> <strong>without</strong> using the <code>AS</code> keyword.",
      "ref": "SELECT name, salary monthly_pay FROM employees;"
    },
    {
      "id": 13,
      "prompt": "Return a static text column <code>'Consultant'</code> as <code>role</code> alongside <code>name</code>.",
      "ref": "SELECT name, 'Consultant' AS role FROM employees;"
    },
    {
      "id": 14,
      "prompt": "Query <code>sqlite_master</code> to retrieve table schema details.",
      "ref": "SELECT * FROM sqlite_master;"
    },
    {
      "id": 15,
      "prompt": "Compute <code>(salary * 12) + 3000</code> as <code>total_yearly_compensation</code>.",
      "ref": "SELECT name, (salary * 12) + 3000 AS total_yearly_compensation FROM employees;"
    },
    {
      "id": 16,
      "prompt": "Alias a column using bracket notation: <code>AS [Employee Salary]</code>.",
      "ref": "SELECT name, salary AS [Employee Salary] FROM employees;"
    },
    {
      "id": 17,
      "prompt": "Alias a column using double quotes: <code>AS \"Employee Department\"</code>.",
      "ref": "SELECT name, department AS \"Employee Department\" FROM employees;"
    },
    {
      "id": 18,
      "prompt": "Use table-prefixed column syntax: <code>employees.name</code>.",
      "ref": "SELECT employees.name FROM employees;"
    },
    {
      "id": 19,
      "prompt": "Evaluate <code>SELECT 100 * 5</code> aliased as <code>math_test</code>.",
      "ref": "SELECT 100 * 5 AS math_test;"
    },
    {
      "id": 20,
      "prompt": "Compute <code>salary * 1.15</code> as <code>new_salary</code>.",
      "ref": "SELECT name, salary * 1.15 AS new_salary FROM employees;"
    },
    {
      "id": 21,
      "prompt": "Compute <code>salary / 52.0</code> as <code>weekly_rate</code>.",
      "ref": "SELECT name, salary / 52.0 AS weekly_rate FROM employees;"
    },
    {
      "id": 22,
      "prompt": "Alias <code>id</code> as the reserved word <code>\"SELECT\"</code> (use double quotes).",
      "ref": "SELECT id AS \"SELECT\" FROM employees;"
    },
    {
      "id": 23,
      "prompt": "Compute <code>salary * 2</code> as <code>double_salary</code>.",
      "ref": "SELECT name, salary * 2 AS double_salary FROM employees;"
    },
    {
      "id": 24,
      "prompt": "Retrieve <code>name</code>, <code>department</code>, <code>salary</code> in that column order.",
      "ref": "SELECT name, department, salary FROM employees;"
    },
    {
      "id": 25,
      "prompt": "Compute <code>(salary * 12 * 1.12) - 2000</code> as <code>complex_evaluation</code>.",
      "ref": "SELECT name, (salary * 12 * 1.12) - 2000 AS complex_evaluation FROM employees;"
    }
  ],
  "topics": [
    {
      "id": "topic-1",
      "label": "Topic 1: Relational Databases",
      "recordingKey": null
    },
    {
      "id": "topic-2",
      "label": "Topic 2: Column Projection",
      "recordingKey": null
    },
    {
      "id": "topic-3",
      "label": "Topic 3: Column Aliasing",
      "recordingKey": null
    }
  ],
  "slides": [
    {
      "title": "01. Relational Databases & SQL",
      "duration": "0:00",
      "html": `
        <h2>📊 01. Relational Databases &amp; SQL</h2>
        <div class="slide-section" id="relationalIntro">
          <h3 class="heading-with-audio">
            Why Relational Databases?
            <button class="audio-play-btn" onclick="playAudio('New_Day1Part1audio01.mp3', this)" title="Play narration">
              <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </button>
          </h3>
          <p>A <strong>Relational Database Management System (RDBMS)</strong> organizes data into structured tables linked by logical relationships. Unlike flat files (like CSVs or spreadsheets), an RDBMS guarantees data integrity, concurrent access safety, and eliminates redundant storage.</p>
          
          <div class="rdbms-infographic">
            <div class="info-columns">
              <div class="info-card info-card--blue">
                <img src="/Version-3/data_integrity_icon.png" class="card-icon" alt="Data Integrity" />
                <div class="info-card-header">DATA INTEGRITY</div>
                <ul class="info-card-bullets">
                  <li><span class="bullet-dot"></span>ENFORCES STRICT RULES AT TABLE LEVEL</li>
                  <li><span class="bullet-dot"></span>PREVENTS INVALID DATA INSERTIONS</li>
                  <li><span class="bullet-dot"></span>GUARANTEES ACCURATE RELATIONSHIPS</li>
                </ul>
              </div>
              <div class="info-card info-card--green">
                <img src="/Version-3/data_redundancy_icon.png" class="card-icon" alt="Data Redundancy" />
                <div class="info-card-header">NO REDUNDANCY</div>
                <ul class="info-card-bullets">
                  <li><span class="bullet-dot"></span>STORES DATA IN ONE LOGICAL PLACE</li>
                  <li><span class="bullet-dot"></span>MINIMIZES DISK SPACE USAGE</li>
                  <li><span class="bullet-dot"></span>AVOIDS CONFLICTING RECORDS</li>
                </ul>
              </div>
              <div class="info-card info-card--orange">
                <img src="/Version-3/concurrent_access_icon.png" class="card-icon" alt="Concurrent Access" />
                <div class="info-card-header">CONCURRENT ACCESS</div>
                <ul class="info-card-bullets">
                  <li><span class="bullet-dot"></span>HANDLES MILLIONS OF READS & WRITES</li>
                  <li><span class="bullet-dot"></span>BLOCKS CONFLICTING EDITS WITH LOCKS</li>
                  <li><span class="bullet-dot"></span>SAVES TRANSACTIONS SAFELY</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      `
    },
    {
      "title": "02. Column Projection & Performance",
      "duration": "0:00",
      "html": `
        <h2>🎯 02. Column Projection &amp; Performance</h2>
        <div class="slide-section" id="projectionIntro">
          <h3 class="heading-with-audio">
            What is Column Projection?
            <button class="audio-play-btn" onclick="playAudio('Day01topic2/New_Day1Part2audio01.mp3', this)" title="Play narration">
              <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </button>
          </h3>
          <p><strong>Column Projection</strong> is the process of selecting a subset of columns from a table. In relational algebra, a <em>projection</em> (denoted by π) filters a relation vertically, returning only the attributes specified in the <code>SELECT</code> clause while ignoring the rest.</p>

          <h4 style="color:#a5b4fc;margin:20px 0 8px;font-size:0.95rem;font-weight:700;">Projection Visualization</h4>
          <div style="background:#0b0f19;border:1px solid #1e293b;border-radius:8px;padding:12px;margin:12px 0;">
            <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;">
              <div style="flex:1;min-width:140px;background:#131b2e;border:1px solid #38bdf8;border-radius:6px;padding:8px;">
                <div style="font-size:0.68rem;font-weight:800;color:#38bdf8;text-transform:uppercase;margin-bottom:6px;text-align:center;">Source: employees</div>
                <div style="display:flex;flex-direction:column;gap:4px;font-family:JetBrains Mono,monospace;font-size:0.62rem;">
                  <div style="padding:4px;background:#1e293b;color:#64748b;border-radius:3px;text-decoration:line-through;opacity:0.5;">id (INTEGER)</div>
                  <div style="padding:4px;background:#0369a1;color:#fff;border-radius:3px;font-weight:700;">name (TEXT) ➜</div>
                  <div style="padding:4px;background:#1e293b;color:#64748b;border-radius:3px;text-decoration:line-through;opacity:0.5;">department (TEXT)</div>
                  <div style="padding:4px;background:#0369a1;color:#fff;border-radius:3px;font-weight:700;">salary (INTEGER) ➜</div>
                </div>
              </div>
              <div style="display:flex;flex-direction:column;align-items:center;color:#38bdf8;font-size:1.2rem;font-weight:800;">
                <span style="font-size:0.65rem;color:#94a3b8;margin-bottom:2px;text-transform:uppercase;font-weight:700;">SELECT name, salary</span>
                <span>➔</span>
              </div>
              <div style="flex:1;min-width:140px;background:#131b2e;border:1px solid #22c55e;border-radius:6px;padding:8px;">
                <div style="font-size:0.68rem;font-weight:800;color:#22c55e;text-transform:uppercase;margin-bottom:6px;text-align:center;">Projected Output</div>
                <div style="display:flex;flex-direction:column;gap:4px;font-family:JetBrains Mono,monospace;font-size:0.62rem;">
                  <div style="padding:4px;background:#047857;color:#fff;border-radius:3px;font-weight:700;">name (TEXT)</div>
                  <div style="padding:4px;background:#047857;color:#fff;border-radius:3px;font-weight:700;">salary (INTEGER)</div>
                </div>
              </div>
            </div>
          </div>

          <h4 style="color:#a5b4fc;margin:24px 0 8px;font-size:0.95rem;font-weight:700;">SELECT * vs. Selective Projection</h4>
          <div class="rdbms-infographic" style="background:transparent;border:none;padding:0;box-shadow:none;margin:12px 0;">
            <div class="info-columns">
              <div class="info-card info-card--red" style="background:rgba(239, 68, 68, 0.02);border-color:rgba(239, 68, 68, 0.15) !important;">
                <div class="info-card-header" style="background:linear-gradient(135deg, #dc2626, #991b1b);">SELECT * (Anti-Pattern)</div>
                <ul class="info-card-bullets" style="background:rgba(15,23,42,0.25);">
                  <li style="color:#fca5a5 !important;min-height:auto;"><span class="bullet-dot" style="background:#ef4444;box-shadow:0 0 6px #ef4444;"></span>Forces Full Row Fetch from storage disk, causing memory footprint bloating.</li>
                  <li style="color:#fca5a5 !important;min-height:auto;"><span class="bullet-dot" style="background:#ef4444;box-shadow:0 0 6px #ef4444;"></span>Increases network transmission load by moving unused bytes across endpoints.</li>
                  <li style="color:#fca5a5 !important;min-height:auto;"><span class="bullet-dot" style="background:#ef4444;box-shadow:0 0 6px #ef4444;"></span>Bypasses index-only coverings, resulting in slower execution plans.</li>
                </ul>
              </div>
              <div class="info-card info-card--green" style="background:rgba(16, 185, 129, 0.02);border-color:rgba(16, 185, 129, 0.15) !important;">
                <div class="info-card-header" style="background:linear-gradient(135deg, #059669, #047857);">Selective Projection (Best Practice)</div>
                <ul class="info-card-bullets" style="background:rgba(15,23,42,0.25);">
                  <li style="color:#a7f3d0 !important;min-height:auto;"><span class="bullet-dot" style="background:#10b981;box-shadow:0 0 6px #10b981;"></span>Limits reads exclusively to selected columns, resulting in high I/O savings.</li>
                  <li style="color:#a7f3d0 !important;min-height:auto;"><span class="bullet-dot" style="background:#10b981;box-shadow:0 0 6px #10b981;"></span>Lowers RAM usage in database cache buffers and server processes.</li>
                  <li style="color:#a7f3d0 !important;min-height:auto;"><span class="bullet-dot" style="background:#10b981;box-shadow:0 0 6px #10b981;"></span>Enables Covering Indexes, allowing queries to run completely in memory.</li>
                </ul>
              </div>
            </div>
          </div>

          <h4 style="color:#a5b4fc;margin:24px 0 8px;font-size:0.95rem;font-weight:700;">SQL Order of Execution</h4>
          <p>Although <code>SELECT</code> is written first, it executes near the end of the logical execution sequence. Projection happens very late!</p>
          <div style="display:flex;align-items:center;gap:6px;overflow-x:auto;padding:8px 0;margin:8px 0;scrollbar-width:none;">
            <div class="exec-pill">1. FROM</div>
            <div class="exec-arrow">➜</div>
            <div class="exec-pill">2. JOIN</div>
            <div class="exec-arrow">➜</div>
            <div class="exec-pill">3. WHERE</div>
            <div class="exec-arrow">➜</div>
            <div class="exec-pill">4. GROUP BY</div>
            <div class="exec-arrow">➜</div>
            <div class="exec-pill">5. HAVING</div>
            <div class="exec-arrow">➜</div>
            <div class="exec-pill exec-pill--select">6. SELECT</div>
            <div class="exec-arrow">➜</div>
            <div class="exec-pill">7. ORDER BY</div>
            <div class="exec-arrow">➜</div>
            <div class="exec-pill">8. LIMIT</div>
          </div>
        </div>
      `
    },
    {
      "title": "03. Column Aliasing (AS Keyword)",
      "duration": "0:00",
      "html": `
        <h2>🏷️ 03. Column Aliasing &amp; the AS Keyword</h2>
        <div class="slide-section" id="columnAliasingIntro">
          <h3 class="heading-with-audio">
            What is Column Aliasing?
            <button class="audio-play-btn" onclick="playAudio('Day01topic3/New_Day1Part3audio01.mp3', this)" title="Play narration">
              <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </button>
          </h3>
          <p><strong>Column Aliasing</strong> temporarily renames columns or output calculation expressions in a query result set. Aliases are local structures; they <em>only exist during query execution</em> and do not modify the physical table schema in the database.</p>

          <h4 style="color:#a5b4fc;margin:20px 0 8px;font-size:0.95rem;font-weight:700;">Aliasing Syntax Blueprint</h4>
          <pre style="background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:12px;overflow-x:auto;margin:12px 0;"><code class="language-sql" style="color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.82rem;line-height:1.4;white-space:pre;">-- 1. Standard Alias (Recommended for clarity)
SELECT name AS employee_name FROM employees;

-- 2. Implicit Alias (Not recommended - easy to misread as a missing comma)
SELECT name employee_name FROM employees;

-- 3. Bracketed Alias (Common in SQL Server/SQLite for spaces/special characters)
SELECT salary * 12 AS [Yearly Compensation] FROM employees;

-- 4. Double Quote Alias (ANSI SQL Standard for special characters/case sensitivity)
SELECT salary * 0.10 AS "Yearly Bonus" FROM employees;</code></pre>

          <blockquote style="border-left:4px solid #f59e0b;background:#1c1a0e;padding:12px 16px;margin:16px 0;color:#fcd34d;border-radius:4px;font-size:0.8rem;line-height:1.5;">
            <strong style="color:#f1f5f9;display:block;margin-bottom:4px;">🚨 Critical Interview Gotcha: Why can't you filter by an Alias in the WHERE clause?</strong>
            Many beginners write queries like:
            <code style="background:#2d2412;color:#fcd34d;padding:2px 4px;border-radius:3px;font-family:monospace;">SELECT name, salary * 12 AS annual FROM employees WHERE annual > 100000;</code>
            This query fails because the <code>WHERE</code> clause (Step 3) is processed <strong>before</strong> the <code>SELECT</code> projection (Step 6). The alias <code>annual</code> does not exist yet when the engine filters rows!
          </blockquote>
        </div>
      `
    }
  ]
};
