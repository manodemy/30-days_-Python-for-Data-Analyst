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
    slides: [
    {
      title: '01. Relational Databases & SQL',
      duration: '7:14',
      html: `
        <h2>📊 01. Relational Databases &amp; SQL</h2>

        <div class="slide-section">
          <h3 class="heading-with-audio">
            What is RDBMS?
            <button class="audio-play-btn" onclick="playAudio('New_Day1Part1audio01.mp3', this)" title="Play narration">
              <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </button>
          </h3>
          <p>A <strong>Relational Database Management System (RDBMS)</strong> is the software used to store, manage, query, and retrieve data stored in a relational database. It formats data into structured <strong>tables</strong> (also called <strong>relations</strong>) which are connected to one another through defined relationships.</p>
          
          <div class="rdbms-diagram-container">
            <div class="rdbms-table-title">📁 Table: Employees</div>
            <table class="db-table-mock rdbms-interactive-mock">
              <thead>
                <tr>
                  <th>🔑 ID (PK) <span class="type-tag">INT</span></th>
                  <th>Name <span class="type-tag">VARCHAR</span></th>
                  <th>Role <span class="type-tag">VARCHAR</span></th>
                  <th>Salary <span class="type-tag">DECIMAL</span></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Alice Johnson</td>
                  <td>Data Analyst</td>
                  <td>$85,000</td>
                </tr>
                <tr class="highlighted-row">
                  <td>2</td>
                  <td>Bob Smith</td>
                  <td>SQL Developer</td>
                  <td>$92,000</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Charlie Brown</td>
                  <td>DBA</td>
                  <td>$105,000</td>
                </tr>
              </tbody>
            </table>
            <div class="rdbms-legend">
              <span class="legend-item"><span class="legend-color legend-color--column"></span> Column (Field / Attribute)</span>
              <span class="legend-item"><span class="legend-color legend-color--row"></span> Row (Record / Tuple)</span>
              <span class="legend-item">🔑 Primary Key (PK)</span>
            </div>
          </div>
        </div>

        <div class="slide-section">
          <h3 class="heading-with-audio" id="whyRdbms">
            Why Relational Databases?
            <button class="audio-play-btn" onclick="playAudio('New_Day1Part1audio02.mp3', this)" title="Play narration">
              <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </button>
          </h3>
          <p>Before relational databases, data was stored in flat files or hierarchical systems — duplicated across many places with no mechanism to enforce consistency. <strong>Relational Database Management Systems (RDBMS)</strong> were invented to solve three fundamental problems:</p>

          <div class="rdbms-infographic" id="rdbmsProblems">
            <div class="info-title heading-with-audio">
              <svg class="db-icon" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 4.02 2 6.5v11c0 2.48 4.48 4.5 10 4.5s10-2.02 10-4.5v-11C22 4.02 17.52 2 12 2zm0 18c-4.41 0-8-1.57-8-3.5v-2.28c1.9.89 4.77 1.48 8 1.48s6.1-.59 8-1.48v2.28c0 1.93-3.59 3.5-8 3.5zm0-5c-4.41 0-8-1.57-8-3.5V9.72c1.9.89 4.77 1.48 8 1.48s6.1-.59 8-1.48V11.5c0 1.93-3.59 3.5-8 3.5zm0-5c-4.41 0-8-1.57-8-3.5s3.59-3.5 8-3.5 8 1.57 8 3.5-3.59 3.5-8 3.5z"/></svg>
              <span>THE THREE PROBLEMS RDBMS SOLVES</span>
              <button class="audio-play-btn" onclick="playAudio('New_Day1Part1audio03.mp3', this)" title="Play narration">
                <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              </button>
            </div>
            <div class="info-columns">
              <div class="info-card info-card--green">
                <div class="info-card-header">DATA REDUNDANCY</div>
                <div class="info-card-illustration">
                  <img src="/Version-3/data_redundancy_icon.png" alt="Data Redundancy" />
                </div>
                <ul class="info-card-bullets">
                  <li><span class="bullet-dot"></span>BREAKS DATA INTO RELATED TABLES</li>
                  <li><span class="bullet-dot"></span>STORES EACH FACT EXACTLY ONCE</li>
                  <li><span class="bullet-dot"></span>UPDATES OCCUR IN ONE ROW, NOT HUNDREDS</li>
                </ul>
              </div>
              <div class="info-card info-card--blue">
                <div class="info-card-header">DATA INTEGRITY</div>
                <div class="info-card-illustration">
                  <img src="/Version-3/data_integrity_icon.png" alt="Data Integrity" />
                </div>
                <ul class="info-card-bullets">
                  <li><span class="bullet-dot"></span>CONSTRAINTS (NOT NULL, UNIQUE, CHECK, FK)</li>
                  <li><span class="bullet-dot"></span>GUARANTEES VALID DATA ENTRY</li>
                  <li><span class="bullet-dot"></span>PREVENTS ORPHANED RECORDS &amp; INVALID STATES</li>
                </ul>
              </div>
              <div class="info-card info-card--orange">
                <div class="info-card-header">CONCURRENT ACCESS</div>
                <div class="info-card-illustration">
                  <img src="/Version-3/concurrent_access_icon.png" alt="Concurrent Access" />
                </div>
                <ul class="info-card-bullets">
                  <li><span class="bullet-dot"></span>MULTIPLE USERS READ/WRITE SIMULTANEOUSLY</li>
                  <li><span class="bullet-dot"></span>HANDLES LOCKING &amp; ISOLATION</li>
                  <li><span class="bullet-dot"></span>TRANSACTIONS NEVER CORRUPT EACH OTHER</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="slide-section">
          <h3 class="heading-with-audio" id="coreEntities">
            Core Structural Entities
            <button class="audio-play-btn" onclick="playAudio('New_Day1Part1audio04.mp3', this)" title="Play narration">
              <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </button>
          </h3>
          <p>An RDBMS organizes all data into a strict hierarchy of concepts — every piece of data has a clearly defined place:</p>

          <div class="db-mock-table-wrap">
            <table class="db-table-mock">
              <thead>
                <tr>
                  <th>Term</th>
                  <th>Also Called</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div class="heading-with-audio" id="entityDatabase">
                      <strong>Database</strong>
                      <button class="audio-play-btn" onclick="playAudio('New_Day1Part1audio07.mp3', this)" title="Play narration">
                        <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                      </button>
                    </div>
                  </td>
                  <td>Schema / Catalog</td>
                  <td>A named container holding related tables, indexes, and views.</td>
                </tr>
                <tr>
                  <td>
                    <div class="heading-with-audio" id="entityTable">
                      <strong>Table</strong>
                      <button class="audio-play-btn" onclick="playAudio('New_Day1Part1audio06.mp3', this)" title="Play narration">
                        <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                      </button>
                    </div>
                  </td>
                  <td>Relation / Entity</td>
                  <td>A 2D grid of rows and columns representing one entity type (e.g., <code>employees</code>).</td>
                </tr>
                <tr>
                  <td>
                    <div class="heading-with-audio" id="entityColumn">
                      <strong>Column</strong>
                      <button class="audio-play-btn" onclick="playAudio('New_Day1Part1audio05.mp3', this)" title="Play narration">
                        <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                      </button>
                    </div>
                  </td>
                  <td>Attribute / Field</td>
                  <td>A named, typed property of the entity. Each column enforces a data type (e.g., <code>salary INTEGER</code>).</td>
                </tr>
                <tr>
                  <td>
                    <div class="heading-with-audio" id="entityRow">
                      <strong>Row</strong>
                      <button class="audio-play-btn" onclick="playAudio('New_Day1Part1audio08.mp3', this)" title="Play narration">
                        <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                      </button>
                    </div>
                  </td>
                  <td>Record / Tuple</td>
                  <td>A single instance of the entity — one complete set of values across all columns.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="slide-section">
          <h3 class="heading-with-audio" id="pkFkKeys">
            Primary Key vs. Foreign Key — Referential Integrity
            <button class="audio-play-btn" onclick="playAudio('New_Day1Part1audio09.mp3', this)" title="Play narration">
              <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </button>
          </h3>
          <p>The word <em>"Relational"</em> in RDBMS refers to the mathematical concept of a <strong>relation</strong> (a table), but the power comes from linking tables together using keys:</p>

          <div class="vs-block">
            <div class="vs-card vs-card--pk">
              <h4 class="heading-with-audio" id="pkDetail">
                🔑 Primary Key (PK)
                <button class="audio-play-btn" onclick="playAudio('New_Day1Part1audio10.mp3', this)" title="Play narration">
                  <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                </button>
              </h4>
              <ul style="margin: 4px 0; padding-left: 16px; font-size: 0.78rem;">
                <li>Uniquely identifies each row in a table</li>
                <li>Cannot be NULL — always has a value</li>
                <li>Cannot contain duplicates</li>
                <li>Usually a single column, but can be composite</li>
              </ul>
              <pre style="margin: 6px 0 0 0;">-- Defining a PK
CREATE TABLE employees (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL
);</pre>
            </div>
            <div class="vs-card vs-card--fk">
              <h4 class="heading-with-audio" id="fkDetail">
                🔗 Foreign Key (FK)
                <button class="audio-play-btn" onclick="playAudio('New_Day1Part1audio11.mp3', this)" title="Play narration">
                  <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                </button>
              </h4>
              <ul style="margin: 4px 0; padding-left: 16px; font-size: 0.78rem;">
                <li>References the PK of another (parent) table</li>
                <li>Enforces Referential Integrity</li>
                <li>Can be NULL (optional relationship)</li>
                <li>A child row cannot reference a non-existent parent</li>
              </ul>
              <pre style="margin: 6px 0 0 0;">-- Defining a FK
CREATE TABLE employees (
  id    INTEGER PRIMARY KEY,
  dept_id INTEGER
    REFERENCES departments(id)
    ON DELETE RESTRICT
);</pre>
            </div>
          </div>

          <div id="parentTableDept">
            <div class="heading-with-audio" style="margin: 12px 0 4px; font-weight: 600; font-size: 0.8rem; color: #1e293b; display: flex; align-items: center; gap: 8px;">
              Parent Table: departments
              <button class="audio-play-btn" onclick="playAudio('New_Day1Part1audio12.mp3', this)" title="Play narration">
                <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              </button>
            </div>
            <div class="db-mock-table-wrap">
              <table class="db-table-mock">
                <thead>
                  <tr>
                    <th>🔑 id <span class="type-tag">INTEGER (PK)</span></th>
                    <th>dept_name <span class="type-tag">TEXT</span></th>
                    <th>budget <span class="type-tag">INTEGER</span></th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>10</td><td>Engineering</td><td>5000000</td></tr>
                  <tr><td>20</td><td>Marketing</td><td>2500000</td></tr>
                </tbody>
              </table>
            </div>

            <div style="margin: 12px 0 4px; font-weight: 600; font-size: 0.8rem; color: #1e293b;">Child Table: employees</div>
            <div class="db-mock-table-wrap">
              <table class="db-table-mock">
                <thead>
                  <tr>
                    <th>🔑 id <span class="type-tag">INTEGER (PK)</span></th>
                    <th>name <span class="type-tag">TEXT</span></th>
                    <th>🔗 dept_id <span class="type-tag">INTEGER (FK)</span></th>
                    <th>salary <span class="type-tag">INTEGER</span></th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>1</td><td>Aarav Sharma</td><td>10 <span style="opacity:0.5; font-size:0.7rem;">→ Engineering</span></td><td>87500</td></tr>
                  <tr><td>2</td><td>Priya Desai</td><td>20 <span style="opacity:0.5; font-size:0.7rem;">→ Marketing</span></td><td>63200</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="slide-section">
          <h3 class="heading-with-audio" id="sqlDeclarative">
            SQL is Declarative — Not Imperative
            <button class="audio-play-btn" onclick="playAudio('New_Day1Part1audio13.mp3', this)" title="Play narration">
              <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </button>
          </h3>
          <p>This is one of the most important concepts in SQL: you describe <em>what you want</em>, not <em>how to get it</em>. The query optimizer figures out the execution plan.</p>

          <div class="vs-block">
            <div class="vs-card vs-card--bad">
              <h4 class="heading-with-audio" id="sqlImperativeVs" style="display: flex; align-items: center; gap: 8px;">
                ❌ Imperative (Python loop)
                <button class="audio-play-btn" onclick="playAudio('New_Day1Part1audio14.mp3', this)" title="Play narration">
                  <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                </button>
              </h4>
              <pre style="margin: 0; font-size: 0.72rem;">results = []
for row in employees:
  if row['dept'] == 'Engineering':
    results.append(row['name'])</pre>
              <small style="color: #64748b; font-size: 0.72rem; display: block; margin-top: 4px;">You write the algorithm — loop, check, collect.</small>
            </div>
            <div class="vs-card vs-card--good">
              <h4 class="heading-with-audio" id="sqlDeclarativeVs" style="display: flex; align-items: center; gap: 8px;">
                ✅ Declarative (SQL)
                <button class="audio-play-btn" onclick="playAudio('New_Day1Part1audio15.mp3', this)" title="Play narration">
                  <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                </button>
              </h4>
              <pre style="margin: 0; font-size: 0.72rem;">SELECT name
FROM employees
WHERE department = 'Engineering';</pre>
              <small style="color: #64748b; font-size: 0.72rem; display: block; margin-top: 4px;">You describe the goal — the engine decides how to retrieve it optimally.</small>
            </div>
          </div>
        </div>

        <div class="slide-section">
          <h3 class="heading-with-audio" id="sqlSubLanguages">
            The Five SQL Sub-Languages
            <button class="audio-play-btn" onclick="playAudio('New_Day1Part1audio16.mp3', this)" title="Play narration">
              <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </button>
          </h3>
          <div class="db-mock-table-wrap" style="margin-top: 10px;">
            <table class="db-table-mock sub-languages-table" id="sqlSubLanguagesTable">
              <thead>
                <tr>
                  <th style="width: 25%">Category</th>
                  <th style="width: 35%">Purpose</th>
                  <th style="width: 40%">Example</th>
                </tr>
              </thead>
              <tbody>
                <tr id="subLangDql">
                  <td>
                    <div class="heading-with-audio" style="font-weight: 700; display: flex; align-items: center; justify-content: space-between; width: 100%;">
                      <span>DQL</span>
                      <button class="audio-play-btn" onclick="playAudio('New_Day1Part1audio17.mp3', this)" title="Play narration">
                        <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                      </button>
                    </div>
                    <div style="font-size: 0.65rem; color: #64748b; margin-top: 2px;">Data Query Language</div>
                  </td>
                  <td>Retrieve data from the database.</td>
                  <td><code>SELECT name, salary FROM employees;</code></td>
                </tr>
                <tr id="subLangDml">
                  <td>
                    <div class="heading-with-audio" style="font-weight: 700; display: flex; align-items: center; justify-content: space-between; width: 100%;">
                      <span>DML</span>
                      <button class="audio-play-btn" onclick="playAudio('New_Day1Part1audio18.mp3', this)" title="Play narration">
                        <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                      </button>
                    </div>
                    <div style="font-size: 0.65rem; color: #64748b; margin-top: 2px;">Data Manipulation Language</div>
                  </td>
                  <td>Insert, update, or delete records.</td>
                  <td><code>INSERT INTO employees VALUES (11, 'Neha', 'Finance', 68000);</code></td>
                </tr>
                <tr id="subLangDdl">
                  <td>
                    <div class="heading-with-audio" style="font-weight: 700; display: flex; align-items: center; justify-content: space-between; width: 100%;">
                      <span>DDL</span>
                      <button class="audio-play-btn" onclick="playAudio('New_Day1Part1audio19.mp3', this)" title="Play narration">
                        <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                      </button>
                    </div>
                    <div style="font-size: 0.65rem; color: #64748b; margin-top: 2px;">Data Definition Language</div>
                  </td>
                  <td>Create or modify tables/schema.</td>
                  <td><code>ALTER TABLE employees ADD COLUMN phone TEXT;</code></td>
                </tr>
                <tr id="subLangTcl">
                  <td>
                    <div class="heading-with-audio" style="font-weight: 700; display: flex; align-items: center; justify-content: space-between; width: 100%;">
                      <span>TCL</span>
                      <button class="audio-play-btn" onclick="playAudio('New_Day1Part1audio20.mp3', this)" title="Play narration">
                        <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                      </button>
                    </div>
                    <div style="font-size: 0.65rem; color: #64748b; margin-top: 2px;">Transaction Control Language</div>
                  </td>
                  <td>Manage transaction blocks.</td>
                  <td><code>BEGIN; ... COMMIT;</code></td>
                </tr>
                <tr id="subLangDcl">
                  <td>
                    <div class="heading-with-audio" style="font-weight: 700; display: flex; align-items: center; justify-content: space-between; width: 100%;">
                      <span>DCL</span>
                      <button class="audio-play-btn" onclick="playAudio('New_Day1Part1audio21.mp3', this)" title="Play narration">
                        <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                      </button>
                    </div>
                    <div style="font-size: 0.65rem; color: #64748b; margin-top: 2px;">Data Control Language</div>
                  </td>
                  <td>Manage database access control.</td>
                  <td><code>GRANT SELECT ON employees TO analyst_role;</code></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="slide-section">
          <div class="pro-tip-box" id="proTipRdbms" style="display: flex; align-items: flex-start; gap: 10px;">
            <div style="flex: 1;">
              <strong>💡 Pro Tip — Which RDBMS to Choose?</strong> SQLite (used here) is a lightweight, file-based database embedded directly inside the application — perfect for learning, mobile apps, and local tools. PostgreSQL is the modern production standard for most systems. MySQL and MariaDB are widely used in web stacks, while SQL Server dominates corporate Windows environments.
            </div>
            <button class="audio-play-btn" onclick="playAudio('New_Day1Part1audio22.mp3', this)" title="Play narration" style="flex-shrink: 0; margin-top: 2px;">
              <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </button>
          </div>
        </div>

        <div class="slide-section">
          <div class="interview-box">
            <h4 style="margin: 0; margin-bottom: 12px;">🎓 Interview Q&amp;A</h4>
            <div id="iqReferentialIntegrity">
              <div class="heading-with-audio" style="display: flex; align-items: flex-start; gap: 8px; margin-bottom: 4px;">
                <p style="margin: 0; flex: 1;"><strong>Q: What is Referential Integrity and how does a Foreign Key enforce it?</strong></p>
                <button class="audio-play-btn" onclick="playAudio('New_Day1Part1audio23.mp3', this)" title="Play narration" style="flex-shrink: 0; margin-top: 2px;">
                  <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                </button>
              </div>
              <p><em>A: Referential Integrity means every FK value in a child table must match an existing PK value in the parent table. A FK constraint prevents inserting a child row with a non-existent parent reference, and prevents deleting a parent row that still has child references (with ON DELETE RESTRICT), maintaining consistent relationships.</em></p>
            </div>

            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="iqSqlVsNosql">
              <div class="heading-with-audio" style="display: flex; align-items: flex-start; gap: 8px; margin-bottom: 4px;">
                <p style="margin: 0; flex: 1;"><strong>Q: What is the difference between SQL and NoSQL databases? When would you choose each?</strong></p>
                <button class="audio-play-btn" onclick="playAudio('New_Day1Part1audio24.mp3', this)" title="Play narration" style="flex-shrink: 0; margin-top: 2px;">
                  <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                </button>
              </div>
              <p><em>A: SQL databases use a fixed schema, tables with relationships, and ACID transactions — ideal for financial systems, ERP, and anything requiring strong consistency. NoSQL databases (MongoDB, DynamoDB, Cassandra) use flexible schemas, are optimized for horizontal scaling and high write throughput, and follow the BASE model (Basically Available, Soft state, Eventually consistent) — ideal for real-time analytics, content platforms, and IoT data ingestion.</em></p>
            </div>

            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="iqCompositePk">
              <div class="heading-with-audio" style="display: flex; align-items: flex-start; gap: 8px; margin-bottom: 4px;">
                <p style="margin: 0; flex: 1;"><strong>Q: Can a table have more than one Primary Key?</strong></p>
                <button class="audio-play-btn" onclick="playAudio('New_Day1Part1audio25.mp3', this)" title="Play narration" style="flex-shrink: 0; margin-top: 2px;">
                  <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                </button>
              </div>
              <p><em>A: No. A table can have only one Primary Key constraint. However, that PK can be a Composite Key — spanning two or more columns together (e.g., PRIMARY KEY (student_id, course_id) in an enrollment table). Each column in the composite key is called a Prime Attribute.</em></p>
            </div>
          </div>
        </div>
      `
    },
    {
      title: '02. Column Projection & Performance',
      duration: '8:09',
      html: `
        <h2>⚡ 02. Column Projection &amp; Performance</h2>

        <div class="slide-section" id="columnProjectionIntro">
          <h3 class="heading-with-audio">
            What is Column Projection?
            <button class="audio-play-btn" onclick="playAudio('Day01topic2/New_Day1Part2audio01.mp3', this)" title="Play narration">
              <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </button>
          </h3>
          <p><strong>Column Projection</strong> is the act of selecting only the specific columns you need from a query result. In the relational algebra that underpins SQL, a <em>projection</em> operation reduces a relation's attributes from N columns to a smaller subset. It is the fundamental mechanism behind the column list in your <code>SELECT</code> clause.</p>

          <div class="rdbms-infographic" id="cardPagesBlocks">
            <div class="heading-with-audio" style="display: flex; align-items: center; gap: 8px; margin-bottom: 10px;">
              <small style="flex: 1; color: #64748b; font-size: 0.75rem;">Under the hood: how relational databases physically store and read data.</small>
              <button class="audio-play-btn" onclick="playAudio('Day01topic2/New_Day1Part2audio02.mp3', this)" title="Play narration" style="flex-shrink: 0;">
                <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              </button>
            </div>
            <div class="info-columns">
              <div class="info-card info-card--blue">
                <div class="info-card-header">PAGES / BLOCKS</div>
                <ul class="info-card-bullets">
                  <li><span class="bullet-dot"></span>FIXED-SIZE PAGES (8 KB POSTGRESQL, 16 KB MYSQL)</li>
                  <li><span class="bullet-dot"></span>EVERY DISK READ FETCHES AN ENTIRE PAGE</li>
                  <li><span class="bullet-dot"></span>I/O OPERATIONS ARE DONE AT PAGE LEVEL</li>
                </ul>
              </div>
              <div class="info-card info-card--purple" id="cardRowOriented">
                <div class="info-card-header">ROW-ORIENTED</div>
                <ul class="info-card-bullets">
                  <li><span class="bullet-dot"></span>ALL COLUMNS OF A ROW STORED TOGETHER</li>
                  <li><span class="bullet-dot"></span>READING ONE COLUMN LOADS THE WHOLE ROW</li>
                  <li><span class="bullet-dot"></span>IDEAL FOR TRANSACTIONAL (OLTP) WORKLOADS</li>
                </ul>
              </div>
              <div class="info-card info-card--red" id="cardFullPageLoad">
                <div class="info-card-header">FULL PAGE LOAD</div>
                <ul class="info-card-bullets">
                  <li><span class="bullet-dot"></span>SELECT * LOADS EVERY UNUSED COLUMN</li>
                  <li><span class="bullet-dot"></span>POLLUTES AND CLOGS BUFFER POOL CACHE</li>
                  <li><span class="bullet-dot"></span>WASTES MASSIVE DISK &amp; NETWORK BANDWIDTH</li>
                </ul>
              </div>
            </div>
          </div>

          <div class="relation-infographic" style="padding: 16px 20px;" id="projectionDiagram">
            <div class="heading-with-audio" style="display: flex; align-items: center; gap: 8px; margin-bottom: 10px;">
              <div class="explanation-title" style="margin: 0; flex: 1;">How Column Projection Works</div>
              <button class="audio-play-btn" onclick="playAudio('Day01topic2/New_Day1Part2audio04.mp3', this)" title="Play narration" style="flex-shrink: 0;">
                <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              </button>
            </div>
            <div class="relation-visual" style="align-items: center;">
              <div class="relation-node" id="projectionDiskPage" style="flex: none;">
                <div class="node-icon-badge">💽</div>
                <div class="node-title">Disk Page</div>
                <div class="node-subtitle">id · name · dept · salary</div>
              </div>
              <div class="relation-link" id="projectionLoads">
                <div class="link-label">Loads</div>
                <div class="link-arrow"><div class="link-line"></div><svg class="arrow-head" width="8" height="12" viewBox="0 0 8 12" fill="none"><path d="M2 2L6 6L2 10" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg></div>
              </div>
              <div class="relation-node" id="projectionFilter" style="flex: none;">
                <div class="node-icon-badge">🔍</div>
                <div class="node-title">SELECT name, salary</div>
                <div class="node-subtitle">Projection Filter</div>
              </div>
              <div id="projectionResultSet" style="display: flex; flex-direction: column; align-items: center; width: 100%;">
                <div class="relation-link">
                  <div class="link-label">Returns</div>
                  <div class="link-arrow"><div class="link-line"></div><svg class="arrow-head" width="8" height="12" viewBox="0 0 8 12" fill="none"><path d="M2 2L6 6L2 10" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg></div>
                </div>
                <div class="relation-node relation-node--child" style="flex: none;">
                  <div class="node-icon-badge">✅</div>
                  <div class="node-title">Result Set</div>
                  <div class="node-subtitle">name · salary only</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="slide-section" id="performanceCosts">
          <h3 class="heading-with-audio">
            The Four Performance Costs of SELECT *
            <button class="audio-play-btn" onclick="playAudio('Day01topic2/New_Day1Part2audio08.mp3', this)" title="Play narration">
              <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </button>
          </h3>
          <div class="vs-block">
            <div class="vs-card vs-card--bad" id="costExcessDiskIO">
              <div class="heading-with-audio" style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
                <h4 style="margin: 0; flex: 1;">💾 1. Excess Disk I/O</h4>
                <button class="audio-play-btn" onclick="playAudio('Day01topic2/New_Day1Part2audio09.mp3', this)" title="Play narration" style="flex-shrink: 0;">
                  <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                </button>
              </div>
              <p>More columns → more pages loaded from disk → higher latency, especially on large tables with millions of rows.</p>
            </div>
            <div class="vs-card vs-card--bad" id="costBufferPool">
              <div class="heading-with-audio" style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
                <h4 style="margin: 0; flex: 1;">🧠 2. Buffer Pool Pollution</h4>
                <button class="audio-play-btn" onclick="playAudio('Day01topic2/New_Day1Part2audio10.mp3', this)" title="Play narration" style="flex-shrink: 0;">
                  <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                </button>
              </div>
              <p>Unused columns occupy RAM in the database buffer cache, evicting frequently-needed pages and causing cache misses.</p>
            </div>
            <div class="vs-card vs-card--bad" id="costNetworkOverhead">
              <div class="heading-with-audio" style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
                <h4 style="margin: 0; flex: 1;">🌐 3. Network Overhead</h4>
                <button class="audio-play-btn" onclick="playAudio('Day01topic2/New_Day1Part2audio11(new).mp3', this)" title="Play narration" style="flex-shrink: 0;">
                  <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                </button>
              </div>
              <p>Every byte travels over the network from the DB server to your app. Wide rows with BLOB columns cause noticeable latency under heavy traffic.</p>
            </div>
            <div class="vs-card vs-card--bad" id="costDefeatedIndex">
              <div class="heading-with-audio" style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
                <h4 style="margin: 0; flex: 1;">🚫 4. Defeated Index-Only Scans</h4>
                <button class="audio-play-btn" onclick="playAudio('Day01topic2/New_Day1Part2audio11.mp3', this)" title="Play narration" style="flex-shrink: 0;">
                  <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                </button>
              </div>
              <p>Even when a covering index exists, <code>SELECT *</code> forces a heap lookup — visiting actual table pages — because not all columns are in the index.</p>
            </div>
          </div>

          <div class="db-mock-table-wrap" id="projectionMockTable">
            <div class="heading-with-audio" style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
              <small style="flex: 1; color: #64748b; font-size: 0.75rem;">Only projected columns are loaded and returned — unused columns are discarded at query time.</small>
              <button class="audio-play-btn" onclick="playAudio('Day01topic2/New_Day1Part2audio12.mp3', this)" title="Play narration" style="flex-shrink: 0;">
                <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              </button>
            </div>
            <table class="db-table-mock">
              <thead>
                <tr>
                  <th style="opacity: 0.3; text-decoration: line-through;">id</th>
                  <th class="column-projected-header">name ✓</th>
                  <th style="opacity: 0.3; text-decoration: line-through;">department</th>
                  <th class="column-projected-header">salary ✓</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="opacity: 0.3;">1</td>
                  <td class="column-projected-cell">Aarav Sharma</td>
                  <td style="opacity: 0.3;">Engineering</td>
                  <td class="column-projected-cell">87,500</td>
                </tr>
                <tr>
                  <td style="opacity: 0.3;">2</td>
                  <td class="column-projected-cell">Priya Desai</td>
                  <td style="opacity: 0.3;">Marketing</td>
                  <td class="column-projected-cell">63,200</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="slide-section" id="indexOnlyScans">
          <h3 class="heading-with-audio">
            Index-Only Scans — The Ultimate Optimization
            <button class="audio-play-btn" onclick="playAudio('Day01topic2/New_Day1Part2audio13.mp3', this)" title="Play narration">
              <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </button>
          </h3>
          <p>When you project only columns that are part of a database index, the query optimizer can execute an <strong>Index-Only Scan</strong> (also called a <em>Covering Index Scan</em>): it reads data directly from the index B-tree without ever touching the physical table pages (heap).</p>

          <div class="vs-block">
            <div class="vs-card vs-card--bad" id="heapLookupRequired">
              <div class="heading-with-audio" style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
                <h4 style="margin: 0; flex: 1;">❌ SELECT * — Heap Lookup Required</h4>
                <button class="audio-play-btn" onclick="playAudio('Day01topic2/New_Day1Part2audio14.mp3', this)" title="Play narration" style="flex-shrink: 0;">
                  <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                </button>
              </div>
              <pre style="margin: 0; font-size: 0.75rem;">SELECT * FROM employees
WHERE department = 'Engineering';
-- Even with an index on 'department',
-- the engine must visit heap pages
-- to fetch id, name, salary columns.</pre>
              <small style="color: #64748b; font-size: 0.72rem; display: block; margin-top: 4px;">Index → Heap lookup → High I/O cost on large tables.</small>
            </div>
            <div class="vs-card vs-card--good" id="indexOnlyScanGood">
              <div class="heading-with-audio" style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
                <h4 style="margin: 0; flex: 1;">✅ Specific Projection — Index-Only Scan</h4>
                <button class="audio-play-btn" onclick="playAudio('Day01topic2/New_Day1Part2audio15.mp3', this)" title="Play narration" style="flex-shrink: 0;">
                  <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                </button>
              </div>
              <pre style="margin: 0; font-size: 0.75rem;">SELECT name, department FROM employees
WHERE department = 'Engineering';
-- With index on (department, name),
-- engine reads ONLY the index tree.
-- Zero heap page access needed.</pre>
              <small style="color: #64748b; font-size: 0.72rem; display: block; margin-top: 4px;">All data served from the index → dramatically lower I/O.</small>
            </div>
          </div>
        </div>

        <div class="slide-section" id="columnOrientedDbs">
          <h3 class="heading-with-audio">
            Column-Oriented Databases — A Step Further
            <button class="audio-play-btn" onclick="playAudio('Day01topic2/New_Day1Part2audio16.mp3', this)" title="Play narration">
              <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </button>
          </h3>
          <p>Analytical databases like <strong>Google BigQuery</strong>, <strong>Snowflake</strong>, and <strong>Amazon Redshift</strong> store data by column on disk rather than by row. This means:</p>
          <div class="rdbms-infographic">
            <div class="info-columns">
              <div class="info-card info-card--green" id="cardZeroOverhead">
                <div class="info-card-header" style="position: relative; display: flex; align-items: center; justify-content: center; width: 100%;">
                  <span style="flex: 1; text-align: center; padding-left: 24px;">ZERO OVERHEAD</span>
                  <button class="audio-play-btn info-card-play-btn" onclick="playAudio('Day01topic2/New_Day1Part2audio17.mp3', this)" title="Play narration">
                    <svg class="play-icon" width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                  </button>
                </div>
                <ul class="info-card-bullets">
                  <li><span class="bullet-dot"></span>READS ONLY THE REQUESTED COLUMNS FROM DISK</li>
                  <li><span class="bullet-dot"></span>ZERO I/O WASTED ON UNUSED ATTRIBUTES</li>
                  <li><span class="bullet-dot"></span>IDEAL FOR ANALYTICAL (OLAP) WORKLOADS</li>
                </ul>
              </div>
              <div class="info-card info-card--amber" id="cardBilledPerByte">
                <div class="info-card-header" style="position: relative; display: flex; align-items: center; justify-content: center; width: 100%;">
                  <span style="flex: 1; text-align: center; padding-left: 24px;">BILLED PER BYTE</span>
                  <button class="audio-play-btn info-card-play-btn" onclick="playAudio('Day01topic2/New_Day1Part2audio18(new).mp3', this)" title="Play narration">
                    <svg class="play-icon" width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                  </button>
                </div>
                <ul class="info-card-bullets">
                  <li><span class="bullet-dot"></span>CLOUD ENGINES BILL PER QUANTITY OF SCANNED DATA</li>
                  <li><span class="bullet-dot"></span>PROJECTING 2 COLS INSTEAD OF 10 CUTS COST BY 80%</li>
                  <li><span class="bullet-dot"></span>EFFICIENT QUERY DESIGN DIRECTLY SAVES BUDGET</li>
                </ul>
              </div>
              <div class="info-card info-card--cyan" id="cardCompression">
                <div class="info-card-header" style="position: relative; display: flex; align-items: center; justify-content: center; width: 100%;">
                  <span style="flex: 1; text-align: center; padding-left: 24px;">COMPRESSION</span>
                  <button class="audio-play-btn info-card-play-btn" onclick="playAudio('Day01topic2/New_Day1Part2audio18.mp3', this)" title="Play narration">
                    <svg class="play-icon" width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                  </button>
                </div>
                <ul class="info-card-bullets">
                  <li><span class="bullet-dot"></span>SIMILAR DATA TYPES CLUSTERED ON DISK</li>
                  <li><span class="bullet-dot"></span>COMPRESSES SIGNIFICANTELY BETTER THAN ROWS</li>
                  <li><span class="bullet-dot"></span>INDEX-ONLY SCAN BENEFITS AT STORAGE LAYER</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="slide-section" id="projectionProTip">
          <div class="pro-tip-box" style="display: flex; align-items: flex-start; gap: 10px;">
            <div style="flex: 1;">
              <strong>⚠️ Real-World Outage Scenario:</strong> A backend team deployed <code>SELECT *</code> on a users table. Six months later, a feature team added a <code>profile_picture BYTEA</code> column (storing binary image data up to 2 MB per user). Overnight, every query that previously returned 200 bytes per row now returned 2 MB per row — causing database memory exhaustion and a P0 outage. The fix: explicit column projection in every query. <strong>Lesson: never use SELECT * in application code, unless you are just manually exploring the table columns in your database console.</strong>
            </div>
            <button class="audio-play-btn" onclick="playAudio('Day01topic2/New_Day1Part2audio19.mp3', this)" title="Play narration" style="flex-shrink: 0; margin-top: 2px;">
              <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </button>
          </div>
        </div>

        <div class="slide-section">
          <div class="interview-box">
            <h4>🎓 Interview Q&amp;A</h4>
            <div id="iqIndexOnlyScan">
              <div class="heading-with-audio" style="display: flex; align-items: flex-start; gap: 8px; margin-bottom: 4px;">
                <p style="margin: 0; flex: 1;"><strong>Q: What is an index-only scan and when does the optimizer use it?</strong></p>
                <button class="audio-play-btn" onclick="playAudio('Day01topic2/New_Day1Part2audio20.mp3', this)" title="Play narration" style="flex-shrink: 0; margin-top: 2px;">
                  <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                </button>
              </div>
              <p><em>A: An index-only scan (covering index scan) occurs when every column requested in the SELECT list and WHERE clause is present within a single index. The optimizer can resolve the entire query from the index B-tree without reading the physical table (heap) pages, drastically reducing disk I/O. To enable this, design covering indexes that include all frequently projected columns alongside filter columns.</em></p>
            </div>

            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="iqSelectStarCosts">
              <div class="heading-with-audio" style="display: flex; align-items: flex-start; gap: 8px; margin-bottom: 4px;">
                <p style="margin: 0; flex: 1;"><strong>Q: Why does SELECT * hurt performance even when all columns are small?</strong></p>
                <button class="audio-play-btn" onclick="playAudio('Day01topic2/New_Day1Part2audio21.mp3', this)" title="Play narration" style="flex-shrink: 0; margin-top: 2px;">
                  <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                </button>
              </div>
              <p><em>A: Even with small columns, SELECT * prevents the optimizer from using index-only scans, increases network payload per row, fills more buffer pool pages (reducing cache hit ratio for other queries), and makes your code fragile — if new columns are added to the table, all queries silently start fetching extra data. Explicit projection makes performance deterministic and code future-proof.</em></p>
            </div>

            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="iqHeapScanVsIndexScan">
              <div class="heading-with-audio" style="display: flex; align-items: flex-start; gap: 8px; margin-bottom: 4px;">
                <p style="margin: 0; flex: 1;"><strong>Q: What is the difference between a heap scan and an index scan?</strong></p>
                <button class="audio-play-btn" onclick="playAudio('Day01topic2/New_Day1Part2audio22.mp3', this)" title="Play narration" style="flex-shrink: 0; margin-top: 2px;">
                  <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                </button>
              </div>
              <p><em>A: A heap scan (sequential/full table scan) reads every page of the physical table in order — O(n) cost regardless of filters. An index scan traverses the B-tree index structure to locate matching row pointers (O(log n)), then optionally fetches the actual row from the heap (heap lookup). An index-only scan skips the heap lookup entirely when all needed data is in the index itself.</em></p>
            </div>
          </div>
        </div>
      `
    },
    {
      title: '03. Column Aliasing (AS Keyword)',
      duration: '0:00',
      html: `
        <h2>🏷️ 03. Column Aliasing &amp; the AS Keyword</h2>

        <h3 id="columnAliasingIntro">What is Column Aliasing?</h3>
        <p><strong>Column Aliasing</strong> temporarily renames a column or expression in the query's output result set using the <code>AS</code> keyword. The alias exists <em>only for the duration of that query</em> — it never modifies the underlying table schema. It is one of the most frequently used SQL features in data analysis, reporting, and API development.</p>

        <div class="rdbms-infographic" id="aliasingBenefits">
          <div class="info-columns">
            <div class="info-card info-card--blue">
              <div class="info-card-header">READABLE HEADERS</div>
              <ul class="info-card-bullets">
                <li><span class="bullet-dot"></span>RENAMES RAW DB NAMES TO USER-FRIENDLY LABELS</li>
                <li><span class="bullet-dot"></span>CRITICAL FOR DASHBOARDS AND REPORT EXPORTS</li>
                <li><span class="bullet-dot"></span>HIDES COMPLEXITY FROM END APPLICATION</li>
              </ul>
            </div>
            <div class="info-card info-card--purple">
              <div class="info-card-header">COMPUTED COLUMNS</div>
              <ul class="info-card-bullets">
                <li><span class="bullet-dot"></span>GIVES NAMES TO RAW MATH EXPRESSIONS</li>
                <li><span class="bullet-dot"></span>PREVENTS UNTITLED OR SYSTEM-NAMED FIELDS</li>
                <li><span class="bullet-dot"></span>MAKES QUERY RESULTS IMMEDIATELY USABLE</li>
              </ul>
            </div>
            <div class="info-card info-card--orange">
              <div class="info-card-header">JOIN DISAMBIGUATION</div>
              <ul class="info-card-bullets">
                <li><span class="bullet-dot"></span>DISTINGUISHES IDENTICALLY NAMED FIELDS</li>
                <li><span class="bullet-dot"></span>RESOLVES CONFLICTS ON SHARED NAMES LIKE ID</li>
                <li><span class="bullet-dot"></span>KEEPS OUTPUT CLEAR AND SCHEMA DETERMINISTIC</li>
              </ul>
            </div>
          </div>
        </div>

        <h3 id="aliasingSyntax">Syntax — Three Valid Forms</h3>
        <div class="syntax-cards-container">
          <!-- Form 1 -->
          <div class="syntax-card syntax-card--recommended">
            <div class="syntax-card-header">
              <span class="syntax-card-title">Form 1: Explicit AS Keyword</span>
              <span class="syntax-badge syntax-badge--recommended">Recommended</span>
              <span class="syntax-badge syntax-badge--ansi">ANSI Standard</span>
            </div>
            <div class="syntax-card-body">
              <pre><code class="sql"><span class="sql-keyword">SELECT</span>
  name            <span class="sql-keyword">AS</span> employee_name,
  salary          <span class="sql-keyword">AS</span> annual_pay,
  salary / <span class="sql-number">12.0</span>   <span class="sql-keyword">AS</span> monthly_rate,
  salary * <span class="sql-number">0.10</span>   <span class="sql-keyword">AS</span> bonus
<span class="sql-keyword">FROM</span> employees;</code></pre>
            </div>
            <div class="syntax-card-footer">
              Uses the explicit <code>AS</code> keyword. This is the cleanest, most readable, and standard practice.
            </div>
          </div>

          <!-- Form 2 -->
          <div class="syntax-card syntax-card--warning">
            <div class="syntax-card-header">
              <span class="syntax-card-title">Form 2: Omit AS Keyword</span>
              <span class="syntax-badge syntax-badge--warning">Valid (Less Readable)</span>
            </div>
            <div class="syntax-card-body">
              <pre><code class="sql"><span class="sql-keyword">SELECT</span> name employee_name, salary annual_pay
<span class="sql-keyword">FROM</span> employees;</code></pre>
            </div>
            <div class="syntax-card-footer">
              Omits the <code>AS</code> keyword entirely. While syntactically valid in SQL, it makes queries harder to read and debug.
            </div>
          </div>

          <!-- Form 3 -->
          <div class="syntax-card syntax-card--info">
            <div class="syntax-card-header">
              <span class="syntax-card-title">Form 3: Multi-Word Alias</span>
              <span class="syntax-badge syntax-badge--info">Double Quotes</span>
              <span class="syntax-badge syntax-badge--ansi">ANSI Standard</span>
            </div>
            <div class="syntax-card-body">
              <pre><code class="sql"><span class="sql-keyword">SELECT</span>
  name          <span class="sql-keyword">AS</span> <span class="sql-string">"Employee Full Name"</span>,
  department    <span class="sql-keyword">AS</span> <span class="sql-string">"Department Name"</span>
<span class="sql-keyword">FROM</span> employees;</code></pre>
            </div>
            <div class="syntax-card-footer">
              Requires <strong>double quotes</strong> when the alias name contains spaces or special characters.
            </div>
          </div>
        </div>

        <div class="relation-infographic" id="aliasingWorksDiagram" style="padding: 16px 20px;">
          <div class="explanation-title">How Aliasing Works</div>
          <div class="relation-visual" style="align-items: center;">
            <div class="relation-node" id="aliasRawExpr" style="flex: none;">
              <div class="node-icon-badge">⚙️</div>
              <div class="node-title">salary / 12.0</div>
              <div class="node-subtitle">Raw Expression</div>
            </div>
            <div class="relation-link">
              <div class="link-label">AS</div>
              <div class="link-arrow"><div class="link-line"></div><svg class="arrow-head" width="8" height="12" viewBox="0 0 8 12" fill="none"><path d="M2 2L6 6L2 10" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg></div>
            </div>
            <div class="relation-node relation-node--child" id="aliasOutputCol" style="flex: none;">
              <div class="node-icon-badge">🏷️</div>
              <div class="node-title">monthly_rate</div>
              <div class="node-subtitle">Named Output Column</div>
            </div>
          </div>
        </div>

        <div class="db-mock-table-wrap" id="aliasingMockTable">
          <table class="db-table-mock">
            <thead>
              <tr>
                <th><span class="sql-col-name">employee_name</span><span class="table-th-subtitle table-th-subtitle--blue">→ alias of name</span></th>
                <th><span class="sql-col-name">annual_pay</span><span class="table-th-subtitle table-th-subtitle--blue">→ alias of salary</span></th>
                <th><span class="sql-col-name">monthly_rate</span><span class="table-th-subtitle table-th-subtitle--slate">→ salary / 12.0</span></th>
                <th><span class="sql-col-name">bonus</span><span class="table-th-subtitle table-th-subtitle--slate">→ salary * 0.10</span></th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Aarav Sharma</td><td>87,500</td><td>7,291.67</td><td>8,750.00</td></tr>
              <tr><td>Priya Desai</td><td>63,200</td><td>5,266.67</td><td>6,320.00</td></tr>
            </tbody>
          </table>
        </div>

        <h3 id="aliasingQuoting">⚠️ Quoting Rules — Single vs. Double Quotes</h3>
        <div class="vs-block">
          <div class="vs-card" style="border-left: 4px solid #10b981;">
            <h4 style="color: #047857;">🟢 Single Quotes <code style="font-size: 0.75rem;">' '</code></h4>
            <p>For <strong>string literals</strong> (text values).</p>
            <div class="syntax-card-body" style="border-radius: 8px; overflow: hidden; margin-top: 8px;">
              <pre><code class="sql"><span class="sql-keyword">WHERE</span> department = <span class="sql-string">'Engineering'</span></code></pre>
            </div>
          </div>
          <div class="vs-card" style="border-left: 4px solid #3b82f6;">
            <h4 style="color: #1d4ed8;">🔵 Double Quotes <code style="font-size: 0.75rem;">" "</code></h4>
            <p>For <strong>identifiers</strong> (column names, alias names, table names).</p>
            <div class="syntax-card-body" style="border-radius: 8px; overflow: hidden; margin-top: 8px;">
              <pre><code class="sql"><span class="sql-keyword">SELECT</span> name <span class="sql-keyword">AS</span> <span class="sql-string">"Employee Name"</span></code></pre>
            </div>
          </div>
        </div>
        <div class="warn-box" style="margin: 12px 0;">⚠️ Using single quotes for an alias (<code>SELECT name AS 'Employee Name'</code>) is an error in standard SQL. Some databases accept it but it has undefined behavior — avoid it entirely.</div>

        <h3>The Logical SQL Execution Order</h3>
        <p>Understanding <em>why</em> aliases work in some clauses but not others requires understanding the order in which SQL engines logically process a query. This is one of the most-tested SQL interview topics:</p>

        <!-- ── Animated SQL Order Flow Diagram (Premium Clean Version) ── -->
        <!-- ── Animated SQL Order Flow Diagram (Compact Dark Version) ── -->
        <div class="sof-wrap" id="aliasingLogicalOrder">
          <style>
            .sof-wrap{width:100%;margin:4px 0 12px}
            .sof-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;align-items:stretch}
            .sof-col{display:flex;flex-direction:column;height:100%;background:rgba(9,15,28,0.85);border:1px solid rgba(255,255,255,0.06);border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.35)}
            .sof-hdr{padding:10px 12px;display:flex;align-items:center;gap:8px;animation:sofFadeDown 0.45s ease 0.1s both}
            .sof-hdr--blue{background:linear-gradient(135deg,rgba(23,37,84,0.95),rgba(29,78,216,0.95))}
            .sof-hdr--teal{background:linear-gradient(135deg,rgba(19,78,74,0.95),rgba(15,118,110,0.95))}
            .sof-hdr-icon{font-size:0.95rem;flex-shrink:0}
            .sof-hdr-text{display:flex;flex-direction:column;gap:1px}
            .sof-hdr-title{font-family:'JetBrains Mono',monospace;font-size:0.63rem;font-weight:700;color:#fff;letter-spacing:0.06em;text-transform:uppercase}
            .sof-hdr-sub{font-size:0.53rem;color:rgba(255,255,255,0.65);font-weight:600;letter-spacing:0.04em;text-transform:uppercase}
            .sof-body{flex-grow:1;padding:10px 10px;display:flex;flex-direction:column;align-items:center}
            
            /* Premium Compact Dark Node styling */
            .sof-node{
              width:100%;
              background:rgba(20,29,51,0.95);
              border:1px solid rgba(255,255,255,0.07);
              border-left:3px solid #64748b;
              border-radius:6px;
              padding:7px 10px;
              font-family:'JetBrains Mono',monospace;
              font-size:0.63rem;
              font-weight:600;
              color:#f1f5f9;
              text-align:center;
              letter-spacing:0.02em;
              box-shadow:0 2px 6px rgba(0,0,0,0.2);
              transition:all 0.25s ease;
              animation:sofReveal 0.45s ease var(--d,0.3s) both;
            }
            .sof-node--dash{border-style:dashed;border-color:rgba(255,255,255,0.12)}
            
            .sof-col--write .sof-node { border-left-color: #3b82f6; }
            .sof-col--exec .sof-node { border-left-color: #0d9488; }
            
            .sof-node--blue{
              border-color:#3b82f6;
              border-left-width:3.5px;
              color:#93c5fd;
              background:rgba(59,130,246,0.14);
              animation:sofReveal 0.45s ease var(--d,0.3s) both,sofGlowBlue 2.6s ease-in-out var(--gd,4.5s) infinite;
            }
            .sof-node--green{
              border-color:#10b981;
              border-left-width:3.5px;
              color:#6ee7b7;
              background:rgba(16,185,129,0.14);
              animation:sofReveal 0.45s ease var(--d,0.3s) both,sofGlowGreen 2.6s ease-in-out var(--gd,4.5s) infinite;
            }
            
            /* Extremely Compact Connector */
            .sof-conn{position:relative;height:20px;width:100%;display:flex;justify-content:center;align-items:flex-start;overflow:visible;animation:sofFadeIn 0.3s ease var(--d,0.5s) both}
            .sof-conn svg{width:20px;height:20px;overflow:visible}
            .sof-stem{stroke:rgba(100,116,139,0.55);stroke-width:1.4;stroke-linecap:round;animation:sofStemColorW 0.4s ease 4.5s forwards}
            .sof-ring{fill:rgba(9,15,28,0.98);stroke:rgba(100,116,139,0.55);stroke-width:1.3;animation:sofRingColorW 0.4s ease 4.5s forwards}
            .sof-chev{stroke:#64748b;stroke-width:1.3;stroke-linecap:round;stroke-linejoin:round;fill:none;animation:sofChevColorW 0.4s ease 4.5s forwards}
            
            .sof-col--exec .sof-stem{animation-name:sofStemColorE}
            .sof-col--exec .sof-ring{animation-name:sofRingColorE}
            .sof-col--exec .sof-chev{animation-name:sofChevColorE}
            
            /* Flowing dots */
            .sof-dot{transform:translateY(0);transform-box:fill-box;transform-origin:center top;animation:sofDotTravel 1.35s cubic-bezier(0.4,0,0.6,1) var(--dd,4.5s) infinite}
            .sof-col--write .sof-dot{fill:#38bdf8;filter:drop-shadow(0 0 2.5px rgba(56,189,248,0.9))}
            .sof-col--exec .sof-dot{fill:#34d399;filter:drop-shadow(0 0 2.5px rgba(52,211,153,0.9))}
            
            /* Stagger startup delays */
            .sof-conn[data-di="0"] .sof-dot{--dd:4.50s}
            .sof-conn[data-di="1"] .sof-dot{--dd:4.68s}
            .sof-conn[data-di="2"] .sof-dot{--dd:4.86s}
            .sof-conn[data-di="3"] .sof-dot{--dd:5.04s}
            .sof-conn[data-di="4"] .sof-dot{--dd:5.22s}
            .sof-conn[data-di="5"] .sof-dot{--dd:5.40s}
            .sof-conn[data-di="6"] .sof-dot{--dd:5.58s}
            
            @media(max-width:500px){.sof-grid{grid-template-columns:1fr;gap:12px}.sof-node{font-size:0.6rem;padding:6px 8px}.sof-hdr-title{font-size:0.6rem}}
            
            /* Keyframes */
            @keyframes sofReveal{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:none}}
            @keyframes sofFadeDown{from{opacity:0;transform:translateY(-3px)}to{opacity:1;transform:none}}
            @keyframes sofFadeIn{from{opacity:0}to{opacity:1}}
            @keyframes sofDotTravel{0%{transform:translateY(0);opacity:0}8%{opacity:1}84%{opacity:1}100%{transform:translateY(12px);opacity:0}}
            @keyframes sofGlowBlue{0%,100%{box-shadow:0 0 5px rgba(59,130,246,0.22);border-color:#3b82f6}50%{box-shadow:0 0 14px rgba(59,130,246,0.5),0 0 24px rgba(59,130,246,0.1);border-color:#60a5fa}}
            @keyframes sofGlowGreen{0%,100%{box-shadow:0 0 5px rgba(16,185,129,0.22);border-color:#10b981}50%{box-shadow:0 0 14px rgba(16,185,129,0.5),0 0 24px rgba(16,185,129,0.1);border-color:#34d399}}
            @keyframes sofRingColorW{to{stroke:rgba(56,189,248,0.45)}}
            @keyframes sofChevColorW{to{stroke:#38bdf8}}
            @keyframes sofStemColorW{to{stroke:rgba(56,189,248,0.35)}}
            @keyframes sofRingColorE{to{stroke:rgba(52,211,153,0.45)}}
            @keyframes sofChevColorE{to{stroke:#34d399}}
            @keyframes sofStemColorE{to{stroke:rgba(52,211,153,0.35)}}
          </style>

          <div class="sof-grid">
            <!-- ── LEFT: Writing Order ── -->
            <div class="sof-col sof-col--write">
              <div class="sof-hdr sof-hdr--blue">
                <span class="sof-hdr-icon">📄</span>
                <div class="sof-hdr-text"><span class="sof-hdr-title">Writing Order</span><span class="sof-hdr-sub">Syntax</span></div>
              </div>
              <div class="sof-body">
                <div class="sof-node sof-node--dash" style="--d:0.25s">SELECT</div>
                <div class="sof-conn" data-di="0" style="--d:0.50s"><svg viewBox="0 0 22 20" xmlns="http://www.w3.org/2000/svg"><line x1="11" y1="0" x2="11" y2="8" class="sof-stem"/><circle cx="11" cy="14" r="5" class="sof-ring"/><polyline points="9.5,12.5 11,15 12.5,12.5" class="sof-chev"/><circle cx="11" cy="1.5" r="2" class="sof-dot"/></svg></div>
                <div class="sof-node" style="--d:0.65s">FROM</div>
                <div class="sof-conn" data-di="1" style="--d:0.90s"><svg viewBox="0 0 22 20" xmlns="http://www.w3.org/2000/svg"><line x1="11" y1="0" x2="11" y2="8" class="sof-stem"/><circle cx="11" cy="14" r="5" class="sof-ring"/><polyline points="9.5,12.5 11,15 12.5,12.5" class="sof-chev"/><circle cx="11" cy="1.5" r="2" class="sof-dot"/></svg></div>
                <div class="sof-node" style="--d:1.05s">WHERE</div>
                <div class="sof-conn" data-di="2" style="--d:1.30s"><svg viewBox="0 0 22 20" xmlns="http://www.w3.org/2000/svg"><line x1="11" y1="0" x2="11" y2="8" class="sof-stem"/><circle cx="11" cy="14" r="5" class="sof-ring"/><polyline points="9.5,12.5 11,15 12.5,12.5" class="sof-chev"/><circle cx="11" cy="1.5" r="2" class="sof-dot"/></svg></div>
                <div class="sof-node" style="--d:1.45s">GROUP BY</div>
                <div class="sof-conn" data-di="3" style="--d:1.70s"><svg viewBox="0 0 22 20" xmlns="http://www.w3.org/2000/svg"><line x1="11" y1="0" x2="11" y2="8" class="sof-stem"/><circle cx="11" cy="14" r="5" class="sof-ring"/><polyline points="9.5,12.5 11,15 12.5,12.5" class="sof-chev"/><circle cx="11" cy="1.5" r="2" class="sof-dot"/></svg></div>
                <div class="sof-node" style="--d:1.85s">HAVING</div>
                <div class="sof-conn" data-di="4" style="--d:2.10s"><svg viewBox="0 0 22 20" xmlns="http://www.w3.org/2000/svg"><line x1="11" y1="0" x2="11" y2="8" class="sof-stem"/><circle cx="11" cy="14" r="5" class="sof-ring"/><polyline points="9.5,12.5 11,15 12.5,12.5" class="sof-chev"/><circle cx="11" cy="1.5" r="2" class="sof-dot"/></svg></div>
                <div class="sof-node" style="--d:2.25s">ORDER BY</div>
                <div class="sof-conn" data-di="5" style="--d:2.50s"><svg viewBox="0 0 22 20" xmlns="http://www.w3.org/2000/svg"><line x1="11" y1="0" x2="11" y2="8" class="sof-stem"/><circle cx="11" cy="14" r="5" class="sof-ring"/><polyline points="9.5,12.5 11,15 12.5,12.5" class="sof-chev"/><circle cx="11" cy="2" r="2.5" class="sof-dot"/></svg></div>
                <div class="sof-node" style="--d:2.65s">LIMIT</div>
              </div>
            </div>

            <!-- ── RIGHT: Execution Order ── -->
            <div class="sof-col sof-col--exec">
              <div class="sof-hdr sof-hdr--teal">
                <span class="sof-hdr-icon">⚙️</span>
                <div class="sof-hdr-text"><span class="sof-hdr-title">Execution Order</span><span class="sof-hdr-sub">Logical</span></div>
              </div>
              <div class="sof-body">
                <div class="sof-node" style="--d:0.45s">1. FROM / JOIN</div>
                <div class="sof-conn" data-di="0" style="--d:0.70s"><svg viewBox="0 0 22 20" xmlns="http://www.w3.org/2000/svg"><line x1="11" y1="0" x2="11" y2="8" class="sof-stem"/><circle cx="11" cy="14" r="5" class="sof-ring"/><polyline points="9.5,12.5 11,15 12.5,12.5" class="sof-chev"/><circle cx="11" cy="1.5" r="2" class="sof-dot"/></svg></div>
                <div class="sof-node" style="--d:0.85s">2. WHERE</div>
                <div class="sof-conn" data-di="1" style="--d:1.10s"><svg viewBox="0 0 22 20" xmlns="http://www.w3.org/2000/svg"><line x1="11" y1="0" x2="11" y2="8" class="sof-stem"/><circle cx="11" cy="14" r="5" class="sof-ring"/><polyline points="9.5,12.5 11,15 12.5,12.5" class="sof-chev"/><circle cx="11" cy="1.5" r="2" class="sof-dot"/></svg></div>
                <div class="sof-node" style="--d:1.25s">3. GROUP BY</div>
                <div class="sof-conn" data-di="2" style="--d:1.50s"><svg viewBox="0 0 22 20" xmlns="http://www.w3.org/2000/svg"><line x1="11" y1="0" x2="11" y2="8" class="sof-stem"/><circle cx="11" cy="14" r="5" class="sof-ring"/><polyline points="9.5,12.5 11,15 12.5,12.5" class="sof-chev"/><circle cx="11" cy="1.5" r="2" class="sof-dot"/></svg></div>
                <div class="sof-node" style="--d:1.65s">4. HAVING</div>
                <div class="sof-conn" data-di="3" style="--d:1.90s"><svg viewBox="0 0 22 20" xmlns="http://www.w3.org/2000/svg"><line x1="11" y1="0" x2="11" y2="8" class="sof-stem"/><circle cx="11" cy="14" r="5" class="sof-ring"/><polyline points="9.5,12.5 11,15 12.5,12.5" class="sof-chev"/><circle cx="11" cy="1.5" r="2" class="sof-dot"/></svg></div>
                <div class="sof-node sof-node--blue" style="--d:2.05s;--gd:4.5s">5. SELECT <small style="font-size:0.54em;opacity:0.8">(alias defined)</small></div>
                <div class="sof-conn" data-di="4" style="--d:2.30s"><svg viewBox="0 0 22 20" xmlns="http://www.w3.org/2000/svg"><line x1="11" y1="0" x2="11" y2="8" class="sof-stem"/><circle cx="11" cy="14" r="5" class="sof-ring"/><polyline points="9.5,12.5 11,15 12.5,12.5" class="sof-chev"/><circle cx="11" cy="1.5" r="2" class="sof-dot"/></svg></div>
                <div class="sof-node" style="--d:2.45s">6. DISTINCT</div>
                <div class="sof-conn" data-di="5" style="--d:2.70s"><svg viewBox="0 0 22 20" xmlns="http://www.w3.org/2000/svg"><line x1="11" y1="0" x2="11" y2="8" class="sof-stem"/><circle cx="11" cy="14" r="5" class="sof-ring"/><polyline points="9.5,12.5 11,15 12.5,12.5" class="sof-chev"/><circle cx="11" cy="1.5" r="2" class="sof-dot"/></svg></div>
                <div class="sof-node sof-node--green" style="--d:2.85s;--gd:4.5s">7. ORDER BY <small style="font-size:0.54em;opacity:0.8">(alias ok)</small></div>
                <div class="sof-conn" data-di="6" style="--d:3.10s"><svg viewBox="0 0 22 20" xmlns="http://www.w3.org/2000/svg"><line x1="11" y1="0" x2="11" y2="8" class="sof-stem"/><circle cx="11" cy="14" r="5" class="sof-ring"/><polyline points="9.5,12.5 11,15 12.5,12.5" class="sof-chev"/><circle cx="11" cy="1.5" r="2" class="sof-dot"/></svg></div>
                <div class="sof-node" style="--d:3.25s">8. LIMIT</div>
              </div>
            </div>
          </div>
        </div>
        <p style="font-size:0.78rem;color:#64748b;margin:0 0 16px 0;line-height:1.6;text-align:left;">
          💡 Notice <strong style="color:#e2e8f0;">SELECT</strong> is written 1st but executed 5th! This is why aliases defined in <code>SELECT</code> are <em>not visible</em> during <code>WHERE</code> (step 2) — but are available in <code>ORDER BY</code> (step 7).
        </p>
        <div class="vs-block" id="aliasingWhereVS">
          <div class="vs-card vs-card--bad">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
              <h4 style="margin: 0;">❌ Cannot Use Alias in WHERE</h4>
              <span class="syntax-badge" style="background: rgba(239, 68, 68, 0.1); color: #f87171; border: 1px solid rgba(239, 68, 68, 0.2); font-size: 0.65rem; padding: 2px 6px; border-radius: 4px; font-weight: 600;">Syntax Error</span>
            </div>
            <div class="syntax-card-body" style="border-radius: 8px; overflow: hidden;">
              <pre><code class="sql"><span class="sql-keyword">SELECT</span> salary / <span class="sql-number">12.0</span> <span class="sql-keyword">AS</span> monthly_rate
<span class="sql-keyword">FROM</span> employees
<span class="sql-keyword">WHERE</span> monthly_rate > <span class="sql-number">6000</span>;
<span class="sql-comment" style="color: #f87171 !important;">-- ERROR: column "monthly_rate"
-- does not exist at this step</span></code></pre>
            </div>
            <small style="color: #64748b; font-size: 0.72rem; display: block; margin-top: 8px;">WHERE runs before SELECT — alias is not yet defined.</small>
          </div>
          <div class="vs-card vs-card--good">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
              <h4 style="margin: 0;">✅ Workarounds: Subquery or CTE</h4>
              <span class="syntax-badge syntax-badge--recommended">Recommended</span>
            </div>
            <div class="syntax-card-body" style="border-radius: 8px; overflow: hidden;">
              <pre><code class="sql"><span class="sql-comment">-- Option 1: Subquery</span>
<span class="sql-keyword">SELECT</span> * <span class="sql-keyword">FROM</span> (
  <span class="sql-keyword">SELECT</span> name, salary / <span class="sql-number">12.0</span> <span class="sql-keyword">AS</span> monthly_rate
  <span class="sql-keyword">FROM</span> employees
) sub
<span class="sql-keyword">WHERE</span> monthly_rate > <span class="sql-number">6000</span>;

<span class="sql-comment">-- Option 2: Repeat the expression</span>
<span class="sql-keyword">SELECT</span> name, salary / <span class="sql-number">12.0</span> <span class="sql-keyword">AS</span> monthly_rate
<span class="sql-keyword">FROM</span> employees
<span class="sql-keyword">WHERE</span> salary / <span class="sql-number">12.0</span> > <span class="sql-number">6000</span>;</code></pre>
            </div>
            <small style="color: #64748b; font-size: 0.72rem; display: block; margin-top: 8px;">Both patterns are production-standard approaches.</small>
          </div>
        </div>

        <div class="pro-tip-box" id="aliasingOrderByTip">
          <strong>💡 Pro Tip — Aliases in ORDER BY:</strong> Most databases (SQLite, PostgreSQL, MySQL) allow aliases in the <code>ORDER BY</code> clause as a convenience extension — even though logically ORDER BY executes before SELECT. This is an intentional database-engine exception, not standard SQL. Always confirm behavior in your specific RDBMS.
          <div class="syntax-card-body" style="border-radius: 8px; overflow: hidden; margin-top: 10px;">
            <pre><code class="sql"><span class="sql-keyword">SELECT</span> name, salary * <span class="sql-number">12</span> <span class="sql-keyword">AS</span> yearly_salary
<span class="sql-keyword">FROM</span> employees
<span class="sql-keyword">ORDER BY</span> yearly_salary <span class="sql-keyword">DESC</span>; <span class="sql-comment" style="color: #34d399 !important;">-- ✅ Works in most databases</span></code></pre>
          </div>
        </div>

        <div class="slide-section">
          <div class="interview-box">
            <h4 style="margin: 0; margin-bottom: 12px;">🎓 Interview Q&amp;A</h4>
            <div id="iqReferenceAlias">
              <div class="heading-with-audio" style="display: flex; align-items: flex-start; gap: 8px; margin-bottom: 4px;">
                <p style="margin: 0; flex: 1;"><strong>Q: Can you reference an alias in the WHERE clause? What about ORDER BY?</strong></p>
              </div>
              <p><em>A: No to WHERE — the logical query execution order processes WHERE (step 2) before SELECT (step 5), so aliases defined in SELECT do not exist yet when WHERE runs. However, most databases allow aliases in ORDER BY as a practical extension since ORDER BY runs after SELECT. For WHERE filtering on computed values, use a subquery or CTE that wraps the original query, or repeat the expression directly in the WHERE clause.</em></p>
            </div>

            <div id="iqColumnVsTableAlias">
              <div class="heading-with-audio" style="display: flex; align-items: flex-start; gap: 8px; margin-bottom: 4px;">
                <p style="margin: 0; flex: 1;"><strong>Q: What is the difference between a column alias and a table alias?</strong></p>
              </div>
              <p><em>A: A column alias (e.g., <code>salary AS monthly_pay</code>) renames a column in the output result set. A table alias (e.g., <code>FROM employees AS e</code>) renames a table within the query, letting you use shorthand references like <code>e.name</code> instead of <code>employees.name</code>. Table aliases are essential in self-joins where the same table is referenced twice and must be distinguished.</em></p>
            </div>

            <div id="iqLogicalOrderExplanation">
              <div class="heading-with-audio" style="display: flex; align-items: flex-start; gap: 8px; margin-bottom: 4px;">
                <p style="margin: 0; flex: 1;"><strong>Q: What is the logical SQL execution order and why does it matter?</strong></p>
              </div>
              <p><em>A: The logical order is: FROM → JOIN → WHERE → GROUP BY → HAVING → SELECT → DISTINCT → ORDER BY → LIMIT/OFFSET. Understanding this order explains many "gotchas": why you can't filter on a SELECT alias in WHERE, why aggregate functions aren't allowed in WHERE (use HAVING instead), and why window functions compute after GROUP BY. Interviewers test this to assess whether candidates understand SQL deeply or are just copying queries.</em></p>
            </div>
          </div>
        </div>
      `
    }
  ]
};