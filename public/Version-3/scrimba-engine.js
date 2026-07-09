/* ═══════════════════════════════════════════════════════════════
   Version-3: Scrimba SQL Sandbox — Complete Engine
   ═══════════════════════════════════════════════════════════════
   Modules:
   1. COURSE_CONFIG — all day-specific content (swap for new days)
   2. SQL Engine — sql.js init, seed, query execution
   3. CodeMirror + Autocomplete
   4. Smart Hint Engine
   5. Presentation Mode + Slides
   6. Laser Pointer + Drawing Canvas
   7. Table Peek Popover
   8. Recording Engine (IndexedDB + mic + action-array)
   9. Test Portal + Grading
   ═══════════════════════════════════════════════════════════════ */

// ═══════════════════════════════════════════════════════════════
// MODULE 1: COURSE_CONFIG
// ═══════════════════════════════════════════════════════════════

const COURSE_CONFIG = {
  dayId: 'day01',
  title: 'Introduction to SQL & Databases',

  // ─── Database Schema & Seed Data ───
  schema: {
    tables: [
      {
        name: 'employees',
        createSQL: `CREATE TABLE employees (
          id INTEGER PRIMARY KEY,
          name TEXT NOT NULL,
          department TEXT NOT NULL,
          salary INTEGER NOT NULL
        );`,
        seedSQL: `INSERT INTO employees VALUES
          (1, 'Aarav Sharma', 'Engineering', 87500),
          (2, 'Priya Desai', 'Marketing', 63200),
          (3, 'Rohit Mehta', 'Data Science', 112800),
          (4, 'Sneha Iyer', 'Finance', 74900),
          (5, 'Vikram Nair', 'Engineering', 96300),
          (6, 'Anjali Gupta', 'Design', 58700),
          (7, 'Karthik Reddy', 'Marketing', 67400),
          (8, 'Divya Patel', 'Data Science', 105600),
          (9, 'Arjun Joshi', 'Finance', 71200),
          (10, 'Meera Krishnan', 'Design', 62800);`,
        columns: [
          { name: 'id', type: 'INTEGER', pk: true },
          { name: 'name', type: 'TEXT', pk: false },
          { name: 'department', type: 'TEXT', pk: false },
          { name: 'salary', type: 'INTEGER', pk: false }
        ]
      }
    ]
  },

  // ─── Presentation Slides (3 slides) ───
  slides: [
    {
      title: '01. Relational Databases & SQL',
      html: `
        <h2>📊 01. Relational Databases &amp; SQL</h2>

        <div class="rdbms-intro-section" id="rdbmsIntro">
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

        <div class="heading-with-audio" id="parentTableDept" style="margin: 12px 0 4px; font-weight: 600; font-size: 0.8rem; color: #1e293b; display: flex; align-items: center; gap: 8px;">
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


        <div class="pro-tip-box" id="proTipRdbms" style="display: flex; align-items: flex-start; gap: 10px;">
          <div style="flex: 1;">
            <strong>💡 Pro Tip — Which RDBMS to Choose?</strong> SQLite (used here) is a lightweight, file-based database embedded directly inside the application — perfect for learning, mobile apps, and local tools. PostgreSQL is the modern production standard for most systems. MySQL and MariaDB are widely used in web stacks, while SQL Server dominates corporate Windows environments.
          </div>
          <button class="audio-play-btn" onclick="playAudio('New_Day1Part1audio22.mp3', this)" title="Play narration" style="flex-shrink: 0; margin-top: 2px;">
            <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
          </button>
        </div>

        <div class="interview-box">
          <h4>🎓 Interview Q&amp;A</h4>
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
      `
    },
    {
      title: '02. Column Projection & Performance',
      html: `
        <h2>⚡ 02. Column Projection &amp; Performance</h2>

        <h3>What is Column Projection?</h3>
        <p><strong>Column Projection</strong> is the act of selecting only the specific columns you need from a query result. In the relational algebra that underpins SQL, a <em>projection</em> operation reduces a relation's attributes from N columns to a smaller subset. It is the fundamental mechanism behind the column list in your <code>SELECT</code> clause.</p>

        <div class="rdbms-infographic">
          <div class="info-columns">
            <div class="info-card info-card--blue">
              <div class="info-card-header">PAGES / BLOCKS</div>
              <ul class="info-card-bullets">
                <li><span class="bullet-dot"></span>FIXED-SIZE PAGES (8 KB POSTGRESQL, 16 KB MYSQL)</li>
                <li><span class="bullet-dot"></span>EVERY DISK READ FETCHES AN ENTIRE PAGE</li>
                <li><span class="bullet-dot"></span>I/O OPERATIONS ARE DONE AT PAGE LEVEL</li>
              </ul>
            </div>
            <div class="info-card info-card--purple">
              <div class="info-card-header">ROW-ORIENTED</div>
              <ul class="info-card-bullets">
                <li><span class="bullet-dot"></span>ALL COLUMNS OF A ROW STORED TOGETHER</li>
                <li><span class="bullet-dot"></span>READING ONE COLUMN LOADS THE WHOLE ROW</li>
                <li><span class="bullet-dot"></span>IDEAL FOR TRANSACTIONAL (OLTP) WORKLOADS</li>
              </ul>
            </div>
            <div class="info-card info-card--red">
              <div class="info-card-header">FULL PAGE LOAD</div>
              <ul class="info-card-bullets">
                <li><span class="bullet-dot"></span>SELECT * LOADS EVERY UNUSED COLUMN</li>
                <li><span class="bullet-dot"></span>POLLUTES AND CLOGS BUFFER POOL CACHE</li>
                <li><span class="bullet-dot"></span>WASTES MASSIVE DISK &amp; NETWORK BANDWIDTH</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="relation-infographic" style="padding: 16px 20px;">
          <div class="explanation-title">How Column Projection Works</div>
          <div class="relation-visual" style="justify-content: center; gap: 6px;">
            <div class="relation-node" style="border-left: 4px solid #64748b; flex: none;">
              <span class="node-icon">💽</span>
              <div class="node-title">Disk Page</div>
              <div class="node-subtitle">id · name · dept · salary</div>
            </div>
            <div class="relation-link">
              <div class="link-label">Loads</div>
              <div class="link-arrow"><div class="link-line"></div><svg class="arrow-head" width="8" height="12" viewBox="0 0 8 12" fill="none"><path d="M2 2L6 6L2 10" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg></div>
            </div>
            <div class="relation-node" style="border-left: 4px solid #3b82f6; flex: none;">
              <span class="node-icon">🔍</span>
              <div class="node-title">SELECT name, salary</div>
              <div class="node-subtitle">Projection Filter</div>
            </div>
            <div class="relation-link">
              <div class="link-label">Returns</div>
              <div class="link-arrow"><div class="link-line"></div><svg class="arrow-head" width="8" height="12" viewBox="0 0 8 12" fill="none"><path d="M2 2L6 6L2 10" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg></div>
            </div>
            <div class="relation-node relation-node--child" style="flex: none;">
              <span class="node-icon">✅</span>
              <div class="node-title">Result Set</div>
              <div class="node-subtitle">name · salary only</div>
            </div>
          </div>
        </div>

        <h3>The Four Performance Costs of SELECT *</h3>
        <div class="vs-block">
          <div class="vs-card vs-card--bad">
            <h4>💾 1. Excess Disk I/O</h4>
            <p>More columns → more pages loaded from disk → higher latency, especially on large tables with millions of rows.</p>
          </div>
          <div class="vs-card vs-card--bad">
            <h4>🧠 2. Buffer Pool Pollution</h4>
            <p>Unused columns occupy RAM in the database buffer cache, evicting frequently-needed pages and causing cache misses.</p>
          </div>
          <div class="vs-card vs-card--bad">
            <h4>🌐 3. Network Overhead</h4>
            <p>Every byte travels over the network from the DB server to your app. Wide rows with BLOB columns cause noticeable latency under heavy traffic.</p>
          </div>
          <div class="vs-card vs-card--bad">
            <h4>🚫 4. Defeated Index-Only Scans</h4>
            <p>Even when a covering index exists, <code>SELECT *</code> forces a heap lookup — visiting actual table pages — because not all columns are in the index.</p>
          </div>
        </div>

        <div class="db-mock-table-wrap">
          <table class="db-table-mock">
            <thead>
              <tr>
                <th style="opacity: 0.3; text-decoration: line-through;">id</th>
                <th style="border-left: 2px solid #2563eb; border-right: 2px solid #2563eb; background: #eff6ff; color: #1d4ed8 !important;">name ✓</th>
                <th style="opacity: 0.3; text-decoration: line-through;">department</th>
                <th style="border-left: 2px solid #2563eb; border-right: 2px solid #2563eb; background: #eff6ff; color: #1d4ed8 !important;">salary ✓</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="opacity: 0.3;">1</td>
                <td style="font-weight: 600;">Aarav Sharma</td>
                <td style="opacity: 0.3;">Engineering</td>
                <td style="font-weight: 600;">87,500</td>
              </tr>
              <tr>
                <td style="opacity: 0.3;">2</td>
                <td style="font-weight: 600;">Priya Desai</td>
                <td style="opacity: 0.3;">Marketing</td>
                <td style="font-weight: 600;">63,200</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>Index-Only Scans — The Ultimate Optimization</h3>
        <p>When you project only columns that are part of a database index, the query optimizer can execute an <strong>Index-Only Scan</strong> (also called a <em>Covering Index Scan</em>): it reads data directly from the index B-tree without ever touching the physical table pages (heap).</p>

        <div class="vs-block">
          <div class="vs-card vs-card--bad">
            <h4>❌ SELECT * — Heap Lookup Required</h4>
            <pre style="margin: 0; font-size: 0.75rem;">SELECT * FROM employees
WHERE department = 'Engineering';
-- Even with an index on 'department',
-- the engine must visit heap pages
-- to fetch id, name, salary columns.</pre>
            <small style="color: #64748b; font-size: 0.72rem; display: block; margin-top: 4px;">Index → Heap lookup → High I/O cost on large tables.</small>
          </div>
          <div class="vs-card vs-card--good">
            <h4>✅ Specific Projection — Index-Only Scan</h4>
            <pre style="margin: 0; font-size: 0.75rem;">SELECT name, department FROM employees
WHERE department = 'Engineering';
-- With index on (department, name),
-- engine reads ONLY the index tree.
-- Zero heap page access needed.</pre>
            <small style="color: #64748b; font-size: 0.72rem; display: block; margin-top: 4px;">All data served from the index → dramatically lower I/O.</small>
          </div>
        </div>

        <h3>Column-Oriented Databases — A Step Further</h3>
        <p>Analytical databases like <strong>Google BigQuery</strong>, <strong>Snowflake</strong>, and <strong>Amazon Redshift</strong> store data by column on disk rather than by row. This means:</p>
        <div class="rdbms-infographic">
          <div class="info-columns">
            <div class="info-card info-card--green">
              <div class="info-card-header">ZERO OVERHEAD</div>
              <ul class="info-card-bullets">
                <li><span class="bullet-dot"></span>READS ONLY THE REQUESTED COLUMNS FROM DISK</li>
                <li><span class="bullet-dot"></span>ZERO I/O WASTED ON UNUSED ATTRIBUTES</li>
                <li><span class="bullet-dot"></span>IDEAL FOR ANALYTICAL (OLAP) WORKLOADS</li>
              </ul>
            </div>
            <div class="info-card info-card--amber">
              <div class="info-card-header">BILLED PER BYTE</div>
              <ul class="info-card-bullets">
                <li><span class="bullet-dot"></span>CLOUD ENGINES BILL PER QUANTITY OF SCANNED DATA</li>
                <li><span class="bullet-dot"></span>PROJECTING 2 COLS INSTEAD OF 10 CUTS COST BY 80%</li>
                <li><span class="bullet-dot"></span>EFFICIENT QUERY DESIGN DIRECTLY SAVES BUDGET</li>
              </ul>
            </div>
            <div class="info-card info-card--cyan">
              <div class="info-card-header">COMPRESSION</div>
              <ul class="info-card-bullets">
                <li><span class="bullet-dot"></span>SIMILAR DATA TYPES CLUSTERED ON DISK</li>
                <li><span class="bullet-dot"></span>COMPRESSES SIGNIFICANTLY BETTER THAN ROWS</li>
                <li><span class="bullet-dot"></span>INDEX-ONLY SCAN BENEFITS AT STORAGE LAYER</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="pro-tip-box">
          <strong>⚠️ Real-World Outage Scenario:</strong> A backend team deployed <code>SELECT *</code> on a users table. Six months later, a feature team added a <code>profile_picture BYTEA</code> column (storing binary image data up to 2 MB per user). Overnight, every query that previously returned 200 bytes per row now returned 2 MB per row — causing database memory exhaustion and a P0 outage. The fix: explicit column projection in every query. <strong>Lesson: never use SELECT * in application code.</strong>
        </div>

        <div class="interview-box">
          <h4>🎓 Interview Q&amp;A</h4>
          <p><strong>Q: What is an index-only scan and when does the optimizer use it?</strong></p>
          <p><em>A: An index-only scan (covering index scan) occurs when every column requested in the SELECT list and WHERE clause is present within a single index. The optimizer can resolve the entire query from the index B-tree without reading the physical table (heap) pages, drastically reducing disk I/O. To enable this, design covering indexes that include all frequently projected columns alongside filter columns.</em></p>

          <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

          <p><strong>Q: Why does SELECT * hurt performance even when all columns are small?</strong></p>
          <p><em>A: Even with small columns, SELECT * prevents the optimizer from using index-only scans, increases network payload per row, fills more buffer pool pages (reducing cache hit ratio for other queries), and makes your code fragile — if new columns are added to the table, all queries silently start fetching extra data. Explicit projection makes performance deterministic and code future-proof.</em></p>

          <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

          <p><strong>Q: What is the difference between a heap scan and an index scan?</strong></p>
          <p><em>A: A heap scan (sequential/full table scan) reads every page of the physical table in order — O(n) cost regardless of filters. An index scan traverses the B-tree index structure to locate matching row pointers (O(log n)), then optionally fetches the actual row from the heap (heap lookup). An index-only scan skips the heap lookup entirely when all needed data is in the index itself.</em></p>
        </div>
      `
    },
    {
      title: '03. Column Aliasing (AS Keyword)',
      html: `
        <h2>🏷️ 03. Column Aliasing &amp; the AS Keyword</h2>

        <h3>What is Column Aliasing?</h3>
        <p><strong>Column Aliasing</strong> temporarily renames a column or expression in the query's output result set using the <code>AS</code> keyword. The alias exists <em>only for the duration of that query</em> — it never modifies the underlying table schema. It is one of the most frequently used SQL features in data analysis, reporting, and API development.</p>

        <div class="rdbms-infographic">
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

        <h3>Syntax — Three Valid Forms</h3>
        <pre>-- Form 1: Explicit AS keyword (recommended, ANSI standard)
SELECT
  name            AS employee_name,
  salary          AS annual_pay,
  salary / 12.0   AS monthly_rate,
  salary * 0.10   AS bonus
FROM employees;

-- Form 2: Omit AS keyword (still valid, less readable)
SELECT name employee_name, salary annual_pay
FROM employees;

-- Form 3: Multi-word alias with double quotes (ANSI standard)
SELECT
  name          AS "Employee Full Name",
  department    AS "Department Name"
FROM employees;</pre>

        <div class="relation-infographic" style="padding: 16px 20px;">
          <div class="explanation-title">How Aliasing Works</div>
          <div class="relation-visual" style="justify-content: center; gap: 6px;">
            <div class="relation-node" style="border-left: 4px solid #64748b; flex: none;">
              <span class="node-icon">⚙️</span>
              <div class="node-title">salary / 12.0</div>
              <div class="node-subtitle">Raw Expression</div>
            </div>
            <div class="relation-link">
              <div class="link-label">AS</div>
              <div class="link-arrow"><div class="link-line"></div><svg class="arrow-head" width="8" height="12" viewBox="0 0 8 12" fill="none"><path d="M2 2L6 6L2 10" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg></div>
            </div>
            <div class="relation-node relation-node--child" style="flex: none;">
              <span class="node-icon">🏷️</span>
              <div class="node-title">monthly_rate</div>
              <div class="node-subtitle">Named Output Column</div>
            </div>
          </div>
        </div>

        <div class="db-mock-table-wrap">
          <table class="db-table-mock">
            <thead>
              <tr>
                <th style="color: #0284c7;">employee_name <span style="display:block; font-size:0.62rem; opacity:0.6; font-weight:400;">→ alias of name</span></th>
                <th style="color: #0284c7;">annual_pay <span style="display:block; font-size:0.62rem; opacity:0.6; font-weight:400;">→ alias of salary</span></th>
                <th style="color: #0284c7;">monthly_rate <span style="display:block; font-size:0.62rem; opacity:0.6; font-weight:400;">→ salary / 12.0</span></th>
                <th style="color: #0284c7;">bonus <span style="display:block; font-size:0.62rem; opacity:0.6; font-weight:400;">→ salary * 0.10</span></th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Aarav Sharma</td><td>87,500</td><td>7,291.67</td><td>8,750.00</td></tr>
              <tr><td>Priya Desai</td><td>63,200</td><td>5,266.67</td><td>6,320.00</td></tr>
            </tbody>
          </table>
        </div>

        <h3>⚠️ Quoting Rules — Single vs. Double Quotes</h3>
        <div class="vs-block">
          <div class="vs-card" style="border-left: 4px solid #10b981;">
            <h4 style="color: #047857;">🟢 Single Quotes <code style="font-size: 0.75rem;">' '</code></h4>
            <p>For <strong>string literals</strong> (text values).</p>
            <pre style="margin: 8px 0 0 0; font-size: 0.74rem;">WHERE department = 'Engineering'</pre>
          </div>
          <div class="vs-card" style="border-left: 4px solid #3b82f6;">
            <h4 style="color: #1d4ed8;">🔵 Double Quotes <code style="font-size: 0.75rem;">" "</code></h4>
            <p>For <strong>identifiers</strong> (column names, alias names, table names).</p>
            <pre style="margin: 8px 0 0 0; font-size: 0.74rem;">SELECT name AS "Employee Name"</pre>
          </div>
        </div>
        <p style="font-size: 0.8rem; color: #7c2d12; background: #fff7ed; border: 1px solid #fed7aa; border-left: 4px solid #f97316; border-radius: 6px; padding: 10px 14px; margin: 12px 0;">⚠️ Using single quotes for an alias (<code>SELECT name AS 'Employee Name'</code>) is an error in standard SQL. Some databases accept it but it has undefined behavior — avoid it entirely.</p>

        <h3>The Logical SQL Execution Order</h3>
        <p>Understanding <em>why</em> aliases work in some clauses but not others requires understanding the order in which SQL engines logically process a query. This is one of the most-tested SQL interview topics:</p>

        <div class="rdbms-infographic" style="padding: 16px 20px;">
          <div class="info-title" style="font-size: 0.9rem; margin-bottom: 16px;">
            📝 SQL WRITING VS. LOGICAL EXECUTION ORDER
          </div>
          
          <div style="display: flex; gap: 12px; flex-wrap: wrap; justify-content: center;">
            
            <div class="info-card info-card--blue" style="flex: 1 1 200px; max-width: 280px;">
              <div class="info-card-header" style="min-height: 52px; font-size: 0.74rem; line-height: 1.25;">📝 WRITING ORDER<br/>(SYNTAX)</div>
              <div style="display: flex; flex-direction: column; align-items: center; gap: 3px; padding: 12px 10px;">
                <div class="exec-pill" style="border-style: dashed; background: #f8fafc; border-color: #94a3b8; color: #475569; width: 140px; text-align: center; font-size: 0.68rem; padding: 4px 6px;">SELECT</div>
                <div class="exec-arrow" style="transform: rotate(90deg); margin: 1px 0; font-size: 0.65rem;">→</div>
                <div class="exec-pill" style="width: 140px; text-align: center; font-size: 0.68rem; padding: 4px 6px;">FROM</div>
                <div class="exec-arrow" style="transform: rotate(90deg); margin: 1px 0; font-size: 0.65rem;">→</div>
                <div class="exec-pill" style="width: 140px; text-align: center; font-size: 0.68rem; padding: 4px 6px;">WHERE</div>
                <div class="exec-arrow" style="transform: rotate(90deg); margin: 1px 0; font-size: 0.65rem;">→</div>
                <div class="exec-pill" style="width: 140px; text-align: center; font-size: 0.68rem; padding: 4px 6px;">GROUP BY</div>
                <div class="exec-arrow" style="transform: rotate(90deg); margin: 1px 0; font-size: 0.65rem;">→</div>
                <div class="exec-pill" style="width: 140px; text-align: center; font-size: 0.68rem; padding: 4px 6px;">HAVING</div>
                <div class="exec-arrow" style="transform: rotate(90deg); margin: 1px 0; font-size: 0.65rem;">→</div>
                <div class="exec-pill" style="width: 140px; text-align: center; font-size: 0.68rem; padding: 4px 6px;">ORDER BY</div>
                <div class="exec-arrow" style="transform: rotate(90deg); margin: 1px 0; font-size: 0.65rem;">→</div>
                <div class="exec-pill" style="width: 140px; text-align: center; font-size: 0.68rem; padding: 4px 6px;">LIMIT</div>
              </div>
            </div>

            <div class="info-card info-card--green" style="flex: 1 1 200px; max-width: 280px;">
              <div class="info-card-header" style="min-height: 52px; font-size: 0.74rem; line-height: 1.25;">⚙️ EXECUTION ORDER<br/>(LOGICAL)</div>
              <div style="display: flex; flex-direction: column; align-items: center; gap: 3px; padding: 12px 10px;">
                <div class="exec-pill" style="width: 168px; text-align: center; font-size: 0.68rem; padding: 4px 6px;">1. FROM / JOIN</div>
                <div class="exec-arrow" style="transform: rotate(90deg); margin: 1px 0; font-size: 0.65rem;">→</div>
                <div class="exec-pill" style="width: 168px; text-align: center; font-size: 0.68rem; padding: 4px 6px;">2. WHERE</div>
                <div class="exec-arrow" style="transform: rotate(90deg); margin: 1px 0; font-size: 0.65rem;">→</div>
                <div class="exec-pill" style="width: 168px; text-align: center; font-size: 0.68rem; padding: 4px 6px;">3. GROUP BY</div>
                <div class="exec-arrow" style="transform: rotate(90deg); margin: 1px 0; font-size: 0.65rem;">→</div>
                <div class="exec-pill" style="width: 168px; text-align: center; font-size: 0.68rem; padding: 4px 6px;">4. HAVING</div>
                <div class="exec-arrow" style="transform: rotate(90deg); margin: 1px 0; font-size: 0.65rem;">→</div>
                <div class="exec-pill exec-pill--select" style="width: 168px; text-align: center; font-size: 0.68rem; padding: 4px 6px; font-weight: 800;">5. SELECT (alias defined)</div>
                <div class="exec-arrow" style="transform: rotate(90deg); margin: 1px 0; font-size: 0.65rem;">→</div>
                <div class="exec-pill" style="width: 168px; text-align: center; font-size: 0.68rem; padding: 4px 6px;">6. DISTINCT</div>
                <div class="exec-arrow" style="transform: rotate(90deg); margin: 1px 0; font-size: 0.65rem;">→</div>
                <div class="exec-pill exec-pill--order" style="width: 168px; text-align: center; font-size: 0.68rem; padding: 4px 6px; font-weight: 800;">7. ORDER BY (alias ok)</div>
                <div class="exec-arrow" style="transform: rotate(90deg); margin: 1px 0; font-size: 0.65rem;">→</div>
                <div class="exec-pill" style="width: 168px; text-align: center; font-size: 0.68rem; padding: 4px 6px;">8. LIMIT</div>
              </div>
            </div>

          </div>
          
          <p style="font-size: 0.78rem; color: #475569; margin: 16px 0 0 0; line-height: 1.5; text-align: left;">
            💡 Notice that <strong>SELECT</strong> is written 1st but executed 5th! This explains why aliases defined in SELECT are <em>not visible</em> during filtering steps like <code>WHERE</code> (executed 2nd).
          </p>
        </div>

        <div class="vs-block">
          <div class="vs-card vs-card--bad">
            <h4>❌ Cannot Use Alias in WHERE</h4>
            <pre style="margin: 0; font-size: 0.75rem;">SELECT salary / 12.0 AS monthly_rate
FROM employees
WHERE monthly_rate > 6000;
-- ERROR: column "monthly_rate"
-- does not exist at this step</pre>
            <small style="color: #64748b; font-size: 0.72rem; display: block; margin-top: 4px;">WHERE runs before SELECT — alias is not yet defined.</small>
          </div>
          <div class="vs-card vs-card--good">
            <h4>✅ Workarounds: Subquery or CTE</h4>
            <pre style="margin: 0; font-size: 0.75rem;">-- Option 1: Subquery
SELECT * FROM (
  SELECT name, salary / 12.0 AS monthly_rate
  FROM employees
) sub
WHERE monthly_rate > 6000;

-- Option 2: Repeat the expression
SELECT name, salary / 12.0 AS monthly_rate
FROM employees
WHERE salary / 12.0 > 6000;</pre>
            <small style="color: #64748b; font-size: 0.72rem; display: block; margin-top: 4px;">Both patterns are production-standard approaches.</small>
          </div>
        </div>

        <div class="pro-tip-box">
          <strong>💡 Pro Tip — Aliases in ORDER BY:</strong> Most databases (SQLite, PostgreSQL, MySQL) allow aliases in the <code>ORDER BY</code> clause as a convenience extension — even though logically ORDER BY executes before SELECT. This is an intentional database-engine exception, not standard SQL. Always confirm behavior in your specific RDBMS.
          <pre style="margin: 6px 0 0 0; font-size: 0.75rem;">SELECT name, salary * 12 AS yearly_salary
FROM employees
ORDER BY yearly_salary DESC; -- ✅ Works in most databases</pre>
        </div>

        <div class="interview-box">
          <h4>🎓 Interview Q&amp;A</h4>
          <p><strong>Q: Can you reference an alias in the WHERE clause? What about ORDER BY?</strong></p>
          <p><em>A: No to WHERE — the logical query execution order processes WHERE (step 2) before SELECT (step 5), so aliases defined in SELECT do not exist yet when WHERE runs. However, most databases allow aliases in ORDER BY as a practical extension since ORDER BY runs after SELECT. For WHERE filtering on computed values, use a subquery or CTE that wraps the original query, or repeat the expression directly in the WHERE clause.</em></p>

          <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

          <p><strong>Q: What is the difference between a column alias and a table alias?</strong></p>
          <p><em>A: A column alias (e.g., <code>salary AS monthly_pay</code>) renames a column in the output result set. A table alias (e.g., <code>FROM employees AS e</code>) renames a table within the query, letting you use shorthand references like <code>e.name</code> instead of <code>employees.name</code>. Table aliases are essential in self-joins where the same table is referenced twice and must be distinguished.</em></p>

          <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

          <p><strong>Q: What is the logical SQL execution order and why does it matter?</strong></p>
          <p><em>A: The logical order is: FROM → JOIN → WHERE → GROUP BY → HAVING → SELECT → DISTINCT → ORDER BY → LIMIT/OFFSET. Understanding this order explains many "gotchas": why you can't filter on a SELECT alias in WHERE, why aggregate functions aren't allowed in WHERE (use HAVING instead), and why window functions compute after GROUP BY. Interviewers test this to assess whether candidates understand SQL deeply or are just copying queries.</em></p>
        </div>
      `
    }
  ],

  // ─── Workspace Questions (Practice questions mapped per day) ───
  practiceQuestions: [
    {
      id: 1,
      prompt: 'Write a query to retrieve all columns and all rows from the <code>employees</code> table.',
      referenceSql: 'SELECT * FROM employees;'
    },
    {
      id: 2,
      prompt: 'Write a query to retrieve all columns and rows from the system table <code>sqlite_master</code> to inspect the database structure.',
      referenceSql: 'SELECT * FROM sqlite_master;'
    }
  ],
  allPracticeQuestions: {
    day01: [
      {
        id: 1,
        prompt: 'Write a query to retrieve all columns and all rows from the <code>employees</code> table.',
        referenceSql: 'SELECT * FROM employees;'
      },
      {
        id: 2,
        prompt: 'Write a query to retrieve all columns and rows from the system table <code>sqlite_master</code> to inspect the database structure.',
        referenceSql: 'SELECT * FROM sqlite_master;'
      }
    ],
    day02: [
      {
        id: 1,
        prompt: 'Write a query to retrieve only the <code>name</code> and <code>department</code> columns from the <code>employees</code> table.',
        referenceSql: 'SELECT name, department FROM employees;'
      },
      {
        id: 2,
        prompt: 'Write a query to project the columns <code>id</code>, <code>name</code>, and <code>salary</code> (in that specific order) from the <code>employees</code> table.',
        referenceSql: 'SELECT id, name, salary FROM employees;'
      }
    ],
    day03: [
      {
        id: 1,
        prompt: 'Write a query to retrieve the <code>name</code> and <code>salary</code> columns, aliasing <code>name</code> as <code>Employee_Name</code> and <code>salary</code> as <code>Monthly_Salary</code>.',
        referenceSql: 'SELECT name AS Employee_Name, salary AS Monthly_Salary FROM employees;'
      },
      {
        id: 2,
        prompt: 'Write a query to retrieve each employee\'s <code>name</code> along with their calculated 15% salary increase (<code>salary * 1.15</code>), aliased as <code>new_salary</code>.',
        referenceSql: 'SELECT name, salary * 1.15 AS new_salary FROM employees;'
      }
    ]
  },


  // ─── 25 Test Questions with Reference Solutions ───
  testQuestions: [
    { id:1,  prompt:'Retrieve all columns and rows from <code>employees</code>.', ref:'SELECT * FROM employees;' },
    { id:2,  prompt:'Retrieve only <code>name</code> and <code>salary</code> from <code>employees</code>.', ref:'SELECT name, salary FROM employees;' },
    { id:3,  prompt:'Retrieve <code>name</code> and <code>department</code>, aliasing <code>name</code> as <code>employee_name</code>.', ref:'SELECT name AS employee_name, department FROM employees;' },
    { id:4,  prompt:'Retrieve <code>id</code> and <code>salary</code>, displaying <code>salary</code> under alias <code>annual_pay</code>.', ref:'SELECT id, salary AS annual_pay FROM employees;' },
    { id:5,  prompt:'Project <code>department</code> and <code>name</code> in that order (reversed from schema order).', ref:'SELECT department, name FROM employees;' },
    { id:6,  prompt:'Calculate a 10% bonus (<code>salary * 0.10</code>) for all employees, aliased as <code>bonus</code>.', ref:'SELECT name, salary * 0.10 AS bonus FROM employees;' },
    { id:7,  prompt:'Display names and yearly salary (<code>salary * 12</code>) as <code>yearly_salary</code>.', ref:'SELECT name, salary * 12 AS yearly_salary FROM employees;' },
    { id:8,  prompt:'Retrieve name and salary after a flat tax deduction of 5000, aliased as <code>net_salary</code>.', ref:'SELECT name, salary - 5000 AS net_salary FROM employees;' },
    { id:9,  prompt:'Retrieve the SQLite engine version using <code>sqlite_version()</code>.', ref:'SELECT sqlite_version();' },
    { id:10, prompt:'Concatenate <code>name || \' - \' || department</code> as <code>employee_details</code>.', ref:"SELECT name || ' - ' || department AS employee_details FROM employees;" },
    { id:11, prompt:'Compute <code>salary / 12.0</code> as <code>monthly_pay</code>.', ref:'SELECT name, salary / 12.0 AS monthly_pay FROM employees;' },
    { id:12, prompt:'Alias <code>salary</code> as <code>monthly_pay</code> <strong>without</strong> using the <code>AS</code> keyword.', ref:'SELECT name, salary monthly_pay FROM employees;' },
    { id:13, prompt:'Return a static text column <code>\'Consultant\'</code> as <code>role</code> alongside <code>name</code>.', ref:"SELECT name, 'Consultant' AS role FROM employees;" },
    { id:14, prompt:'Query <code>sqlite_master</code> to retrieve table schema details.', ref:'SELECT * FROM sqlite_master;' },
    { id:15, prompt:'Compute <code>(salary * 12) + 3000</code> as <code>total_yearly_compensation</code>.', ref:'SELECT name, (salary * 12) + 3000 AS total_yearly_compensation FROM employees;' },
    { id:16, prompt:'Alias a column using bracket notation: <code>AS [Employee Salary]</code>.', ref:'SELECT name, salary AS [Employee Salary] FROM employees;' },
    { id:17, prompt:'Alias a column using double quotes: <code>AS "Employee Department"</code>.', ref:'SELECT name, department AS "Employee Department" FROM employees;' },
    { id:18, prompt:'Use table-prefixed column syntax: <code>employees.name</code>.', ref:'SELECT employees.name FROM employees;' },
    { id:19, prompt:'Evaluate <code>SELECT 100 * 5</code> aliased as <code>math_test</code>.', ref:'SELECT 100 * 5 AS math_test;' },
    { id:20, prompt:'Compute <code>salary * 1.15</code> as <code>new_salary</code>.', ref:'SELECT name, salary * 1.15 AS new_salary FROM employees;' },
    { id:21, prompt:'Compute <code>salary / 52.0</code> as <code>weekly_rate</code>.', ref:'SELECT name, salary / 52.0 AS weekly_rate FROM employees;' },
    { id:22, prompt:'Alias <code>id</code> as the reserved word <code>"SELECT"</code> (use double quotes).', ref:'SELECT id AS "SELECT" FROM employees;' },
    { id:23, prompt:'Compute <code>salary * 2</code> as <code>double_salary</code>.', ref:'SELECT name, salary * 2 AS double_salary FROM employees;' },
    { id:24, prompt:'Retrieve <code>name</code>, <code>department</code>, <code>salary</code> in that column order.', ref:'SELECT name, department, salary FROM employees;' },
    { id:25, prompt:'Compute <code>(salary * 12 * 1.12) - 2000</code> as <code>complex_evaluation</code>.', ref:'SELECT name, (salary * 12 * 1.12) - 2000 AS complex_evaluation FROM employees;' }
  ],

  // ─── Topic Bookmarks (linked to recordings) ───
  topics: [
    { id: 'topic-1', label: 'Topic 1: Relational Databases', recordingKey: null },
    { id: 'topic-2', label: 'Topic 2: Column Projection', recordingKey: null },
    { id: 'topic-3', label: 'Topic 3: Column Aliasing', recordingKey: null }
  ],

  // ─── Pre-authored Lesson Tracks (Scrimba-style) ───
  lessonTracks: {
    day01: {
      id: 'day01-track',
      title: 'Day 01: Introduction to SQL & Databases',
      audioUrl: 'day01_topic01.mp3',
      duration: 95000,
      chapters: [
        { t: 0,     label: '📊 Why RDBMS?',              slideIdx: 0 },
        { t: 28000, label: '🔑 Keys & Relationships',    slideIdx: 0 },
        { t: 52000, label: '💡 Declarative Thinking',    slideIdx: 1 },
        { t: 72000, label: '💻 Live Coding Demo',        slideIdx: 2 },
      ],
      actions: [
        // ── ACT 1: Intro & RDBMS foundations (0-27s) ──
        { t: 0,     type: 'slide',    slideIdx: 0 },
        { t: 0,     type: 'snapshot', content: '-- Write your SQL query here\n' },
        { t: 0,     type: 'caption',  text: '👋 Welcome to Day 01 — let\'s understand WHY relational databases were invented.' },
        { t: 7000,  type: 'caption',  text: '📁 Before RDBMS, data lived in flat files — duplicated, inconsistent, and impossible to scale.' },
        { t: 15000, type: 'scroll',   selector: '.rdbms-infographic' },
        { t: 15000, type: 'caption',  text: '✅ RDBMS solves 3 core problems: Data Integrity, Data Redundancy, and Concurrent Access.' },
        { t: 15200, type: 'pulse',    selector: '.info-card--blue', duration: 2200 },
        { t: 17500, type: 'pulse',    selector: '.info-card--green', duration: 2200 },
        { t: 20000, type: 'pulse',    selector: '.info-card--orange', duration: 2200 },
        { t: 22000, type: 'caption',  text: '🛡️ Constraints like NOT NULL, UNIQUE, and FOREIGN KEY enforce data integrity automatically.' },

        // ── ACT 2: Primary Key / Foreign Key (28-51s) ──
        { t: 28000, type: 'scroll',   selector: '.vs-block' },
        { t: 28000, type: 'caption',  text: '🔑 A PRIMARY KEY uniquely identifies every row — it can never be NULL or duplicate.' },
        { t: 28200, type: 'pulse',    selector: '.vs-card--pk', duration: 3000 },
        { t: 36000, type: 'caption',  text: '🔗 A FOREIGN KEY in one table points to the Primary Key of another — this creates the "relation".' },
        { t: 36200, type: 'pulse',    selector: '.vs-card--fk', duration: 3000 },
        { t: 44000, type: 'scroll',   selector: '.relation-infographic' },
        { t: 44000, type: 'caption',  text: '📋 Vocabulary check: Table = Relation | Row = Tuple | Column = Attribute.' },
        { t: 44200, type: 'pulse',    selector: '.relation-infographic', duration: 3000 },

        // ── ACT 3: Declarative vs. Imperative (52-71s) ──
        { t: 52000, type: 'slide',    slideIdx: 1 },
        { t: 52000, type: 'caption',  text: '🧠 SQL is DECLARATIVE — you describe WHAT you want, not HOW to get it.' },
        { t: 52200, type: 'pulse',    selector: '.vs-card--good', duration: 3000 },
        { t: 58000, type: 'snapshot', content: '-- Python (Imperative): loop through every row manually\n-- SQL (Declarative): just describe the result\n' },
        { t: 58200, type: 'pulse',    selector: '.vs-card--bad', duration: 3000 },
        { t: 63000, type: 'scroll',   selector: '.info-box' },
        { t: 63000, type: 'caption',  text: '⚙️ The SQL Query Optimizer figures out the fastest execution plan for you — behind the scenes.' },
        { t: 63200, type: 'pulse',    selector: '.info-box', duration: 3000 },
        { t: 68000, type: 'scroll',   selector: '.pro-tip-box' },
        { t: 68000, type: 'caption',  text: '📌 The logical order: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT' },
        { t: 68200, type: 'pulse',    selector: '.pro-tip-box', duration: 3000 },

        // ── ACT 4: Live Coding Demo (72-95s) ──
        { t: 72000, type: 'slide',    slideIdx: 2 },
        { t: 72000, type: 'snapshot', content: '' },
        { t: 74000, type: 'caption',  text: '💻 Let\'s write our first query! SELECT * retrieves ALL columns from a table.' },
        { t: 74500, type: 'type',     content: 'SELECT * FROM employees;', speed: 65 },
        { t: 86000, type: 'run',      query: 'SELECT * FROM employees;' },
        { t: 86000, type: 'caption',  text: '✅ 10 rows returned — all employees with id, name, department, and salary!' },
        { t: 90000, type: 'snapshot', content: 'SELECT * FROM sqlite_master;' },
        { t: 91000, type: 'run',      query: 'SELECT * FROM sqlite_master;' },
        { t: 91000, type: 'caption',  text: '🔍 sqlite_master shows us the database schema — very useful when exploring a new database!' },
      ]
    },
    day02: {
      id: 'day02-track',
      title: 'Day 02: Column Projection',
      duration: 75000,
      chapters: [
        { t: 0,     label: '📌 Column Projection',    slideIdx: 0 },
        { t: 30000, label: '💻 SELECT Specific Cols', slideIdx: 0 },
        { t: 55000, label: '⚡ Performance Impact',   slideIdx: 1 },
      ],
      actions: [
        { t: 0,     type: 'slide',    slideIdx: 0 },
        { t: 0,     type: 'snapshot', content: '-- Write your SQL query here\n' },
        { t: 0,     type: 'caption',  text: '📌 Day 02: Column Projection — select only the columns you need, nothing more.' },
        { t: 8000,  type: 'caption',  text: '❌ SELECT * fetches every column — wasteful when you only need 1 or 2!' },
        { t: 18000, type: 'caption',  text: '✅ By naming specific columns, you reduce network load and memory usage.' },
        { t: 30000, type: 'snapshot', content: '' },
        { t: 30000, type: 'caption',  text: '💻 Let\'s project just name and department from employees.' },
        { t: 31000, type: 'type',     content: 'SELECT name, department FROM employees;', speed: 65 },
        { t: 46000, type: 'run',      query: 'SELECT name, department FROM employees;' },
        { t: 46000, type: 'caption',  text: '✅ Only 2 columns returned — clean and efficient!' },
        { t: 55000, type: 'slide',    slideIdx: 1 },
        { t: 55000, type: 'caption',  text: '⚡ In cloud databases (BigQuery, Redshift), you pay per byte scanned — always project!' },
        { t: 65000, type: 'snapshot', content: 'SELECT id, name, salary FROM employees;' },
        { t: 66000, type: 'run',      query: 'SELECT id, name, salary FROM employees;' },
        { t: 66000, type: 'caption',  text: '✅ id, name, salary projected in the exact order we specified — column order matters!' },
      ]
    },
    day03: {
      id: 'day03-track',
      title: 'Day 03: Column Aliasing (AS)',
      duration: 80000,
      chapters: [
        { t: 0,     label: '🏷️ Why Alias?',          slideIdx: 0 },
        { t: 28000, label: '💻 AS Keyword Demo',      slideIdx: 1 },
        { t: 58000, label: '🔢 Computed Columns',     slideIdx: 2 },
      ],
      actions: [
        { t: 0,     type: 'slide',    slideIdx: 0 },
        { t: 0,     type: 'snapshot', content: '-- Write your SQL query here\n' },
        { t: 0,     type: 'caption',  text: '🏷️ Day 03: Aliasing — rename columns in your output without touching the table!' },
        { t: 9000,  type: 'caption',  text: '📋 Column aliases make reports readable: "salary" becomes "Monthly_Salary".' },
        { t: 18000, type: 'caption',  text: '✨ Use the AS keyword: SELECT name AS employee_name FROM employees;' },
        { t: 28000, type: 'slide',    slideIdx: 1 },
        { t: 28000, type: 'snapshot', content: '' },
        { t: 28000, type: 'caption',  text: '💻 Let\'s alias both name and salary for a clean output.' },
        { t: 29000, type: 'type',     content: 'SELECT name AS Employee_Name,\n       salary AS Monthly_Salary\nFROM employees;', speed: 55 },
        { t: 50000, type: 'run',      query: 'SELECT name AS Employee_Name, salary AS Monthly_Salary FROM employees;' },
        { t: 50000, type: 'caption',  text: '✅ Column headers now show Employee_Name and Monthly_Salary — alias only changes output!' },
        { t: 58000, type: 'slide',    slideIdx: 2 },
        { t: 58000, type: 'caption',  text: '🔢 Aliases also work on computed columns — calculate a 15% raise:' },
        { t: 60000, type: 'snapshot', content: 'SELECT name, salary * 1.15 AS new_salary FROM employees;' },
        { t: 61000, type: 'run',      query: 'SELECT name, salary * 1.15 AS new_salary FROM employees;' },
        { t: 61000, type: 'caption',  text: '🎉 new_salary shows the calculated raise for each employee. Arithmetic + alias = power!' },
      ]
    }
  }
};

// ═══════════════════════════════════════════════════════════════
// MODULE 2: SQL ENGINE
// ═══════════════════════════════════════════════════════════════

let db = null;

function initDatabase() {
  return initSqlJs({
    locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${file}`
  }).then(SQL => {
    db = new SQL.Database();
    COURSE_CONFIG.schema.tables.forEach(t => {
      db.run(t.createSQL);
      db.run(t.seedSQL);
    });
    console.log('SQL.js initialized, tables seeded.');
    return db;
  });
}

function runSQL(query) {
  if (!db) throw new Error('Database not initialized.');
  const trimmed = query.trim();
  if (!trimmed) throw new Error('SQL query cannot be empty.');
  const results = db.exec(trimmed);
  if (results.length === 0) return { columns: [], values: [], message: 'Query executed successfully. No rows returned.' };
  return { columns: results[0].columns, values: results[0].values };
}

function getSchemaInfo() {
  const info = {};
  COURSE_CONFIG.schema.tables.forEach(t => {
    info[t.name] = t.columns.map(c => c.name);
  });
  return info;
}

function renderResultTable(result, targetId) {
  const el = document.getElementById(targetId);
  if (!el) return;

  if (result.message && result.values.length === 0) {
    el.innerHTML = `<div class="output-label">Terminal Output</div><span class="output-success">${result.message}</span>`;
    return;
  }

  let html = '<div class="output-label">Query Result</div><table class="result-table"><thead><tr>';
  result.columns.forEach(col => { html += `<th>${escHtml(String(col))}</th>`; });
  html += '</tr></thead><tbody>';
  result.values.forEach(row => {
    html += '<tr>';
    row.forEach(val => { html += `<td>${val !== null ? escHtml(String(val)) : 'NULL'}</td>`; });
    html += '</tr>';
  });
  html += '</tbody></table>';
  el.innerHTML = html;
}

function renderError(msg, hint, targetId) {
  const el = document.getElementById(targetId);
  if (!el) return;
  let html = '<div class="output-label">Terminal Output</div>';
  if (hint) html += `<div class="output-hint">💡 Hint: ${escHtml(hint)}</div>`;
  html += `<div class="output-error">Error: ${escHtml(msg)}</div>`;
  el.innerHTML = html;
}

function escHtml(s) {
  const d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}

// ═══════════════════════════════════════════════════════════════
// MODULE 3: CODEMIRROR + AUTOCOMPLETE
// ═══════════════════════════════════════════════════════════════

let mainEditor = null;
let testEditor = null;

function initMainEditor() {
  const schema = getSchemaInfo();
  const hintTables = {};
  Object.keys(schema).forEach(t => { hintTables[t] = schema[t]; });

  mainEditor = CodeMirror(document.getElementById('mainEditorWrap'), {
    value: '-- Write your SQL query here\n',
    mode: 'text/x-sql',
    theme: 'dracula',
    lineNumbers: true,
    autoCloseBrackets: true,
    matchBrackets: true,
    extraKeys: {
      'Ctrl-Space': 'autocomplete',
      'Ctrl-Enter': () => runCurrentQuery()
    },
    hintOptions: {
      tables: hintTables,
      completeSingle: false
    }
  });

  // Auto-trigger autocomplete on typing
  mainEditor.on('inputRead', (cm, change) => {
    if (change.origin !== '+input') return;
    // Don't autocomplete inside strings
    const token = cm.getTokenAt(cm.getCursor());
    if (token.type && token.type.indexOf('string') !== -1) return;
    const text = change.text[0];
    if (/[a-zA-Z_.]/.test(text)) {
      cm.showHint({ completeSingle: false });
    }
  });

  mainEditor.on('focus', () => {
    pauseCombinedPlayback();
  });
  document.getElementById('mainEditorWrap')?.addEventListener('click', () => {
    pauseCombinedPlayback();
  });
}

function initTestEditor() {
  const schema = getSchemaInfo();
  const hintTables = {};
  Object.keys(schema).forEach(t => { hintTables[t] = schema[t]; });

  testEditor = CodeMirror(document.getElementById('testEditorWrap'), {
    value: '-- Write your answer here\n',
    mode: 'text/x-sql',
    theme: 'dracula',
    lineNumbers: true,
    autoCloseBrackets: true,
    matchBrackets: true,
    extraKeys: {
      'Ctrl-Space': 'autocomplete',
      'Ctrl-Enter': () => runTestQuery()
    },
    hintOptions: {
      tables: hintTables,
      completeSingle: false
    }
  });

  testEditor.on('inputRead', (cm, change) => {
    if (change.origin !== '+input') return;
    const token = cm.getTokenAt(cm.getCursor());
    if (token.type && token.type.indexOf('string') !== -1) return;
    if (/[a-zA-Z_.]/.test(change.text[0])) {
      cm.showHint({ completeSingle: false });
    }
  });

  testEditor.on('focus', () => {
    pauseCombinedPlayback();
  });
  document.getElementById('testEditorWrap')?.addEventListener('click', () => {
    pauseCombinedPlayback();
  });
}

// ═══════════════════════════════════════════════════════════════
// MODULE 4: SMART HINT ENGINE
// ═══════════════════════════════════════════════════════════════

function analyzeQueryError(query, rawError) {
  const msg = rawError.message || String(rawError);
  const allColumns = [];
  COURSE_CONFIG.schema.tables.forEach(t => t.columns.forEach(c => allColumns.push(c.name)));
  const allTables = COURSE_CONFIG.schema.tables.map(t => t.name);

  // Check for missing quotes around string in WHERE
  const whereMatch = query.match(/WHERE\s+\w+\s*=\s*([a-zA-Z_]\w*)/i);
  if (whereMatch && !allColumns.includes(whereMatch[1]) && !allTables.includes(whereMatch[1])) {
    return `It looks like you're comparing to a text value without quotes. Try wrapping '${whereMatch[1]}' in single quotes.`;
  }

  // Check for column name typo (Levenshtein ≤ 2)
  const noSuchCol = msg.match(/no such column:\s*(\w+)/i);
  if (noSuchCol) {
    const typo = noSuchCol[1];
    let bestMatch = null, bestDist = 3;
    allColumns.forEach(col => {
      const d = levenshtein(typo.toLowerCase(), col.toLowerCase());
      if (d < bestDist) { bestDist = d; bestMatch = col; }
    });
    if (bestMatch) {
      return `Column '${typo}' doesn't exist. Did you mean '${bestMatch}'?`;
    }
  }

  // Check for no such table
  const noSuchTable = msg.match(/no such table:\s*(\w+)/i);
  if (noSuchTable) {
    const typo = noSuchTable[1];
    let bestMatch = null, bestDist = 3;
    allTables.forEach(tbl => {
      const d = levenshtein(typo.toLowerCase(), tbl.toLowerCase());
      if (d < bestDist) { bestDist = d; bestMatch = tbl; }
    });
    if (bestMatch) {
      return `Table '${typo}' doesn't exist. Did you mean '${bestMatch}'?`;
    }
  }

  // Check for missing FROM
  if (/SELECT/i.test(query) && !/FROM/i.test(query) && /no such column/i.test(msg)) {
    return 'Your query is missing a FROM clause. Specify which table to query.';
  }

  // Clean up raw message
  return null;
}

function levenshtein(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = a[i-1] === b[j-1] ? dp[i-1][j-1] : 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
  return dp[m][n];
}

// ═══════════════════════════════════════════════════════════════
// MODULE 5: PRESENTATION MODE + SLIDES
// ═══════════════════════════════════════════════════════════════

let currentSlide = 0;
let presentOpen = false;

function openPresentMode() {
  currentSlide = 0;
  presentOpen = true;
  document.getElementById('presentOverlay').classList.add('open');
  renderPresentSlide();
  resizeDrawCanvas();
  document.addEventListener('keydown', presentKeyHandler);
}

function closePresentMode() {
  presentOpen = false;
  document.getElementById('presentOverlay').classList.remove('open');
  document.removeEventListener('keydown', presentKeyHandler);
  deactivateLaser();
  deactivatePen();
  clearDrawCanvas();
}

function nextSlide() {
  if (currentSlide < COURSE_CONFIG.slides.length - 1) {
    currentSlide++;
    renderCurrentSlide();
    clearDrawCanvas();
  }
}

function prevSlide() {
  if (currentSlide > 0) {
    currentSlide--;
    renderCurrentSlide();
    clearDrawCanvas();
  }
}

function renderCurrentSlide() {
  renderPresentSlide();
  renderSideSlide();
}

function renderPresentSlide() {
  const slide = COURSE_CONFIG.slides[currentSlide];
  document.getElementById('presentSlideContent').innerHTML = slide.html;
  const cleanedTitle = slide.title.replace(/^\d+\.\s*/, '');
  document.getElementById('presentCounter').textContent = `Topic 0${currentSlide + 1} — ${cleanedTitle}`;
  const topicSelect = document.getElementById('topicSelect');
  if (topicSelect) topicSelect.value = currentSlide;
}

function renderSideSlide() {
  const slide = COURSE_CONFIG.slides[currentSlide];
  
  // Parse the slide HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = slide.html;
  
  // Extract h2
  const h2 = tempDiv.querySelector('h2');
  const headerHtml = h2 ? h2.outerHTML : '';
  if (h2) h2.remove();
  const bodyHtml = tempDiv.innerHTML;
  
  // Populate elements
  const slideHeader = document.getElementById('slideHeader');
  if (slideHeader) slideHeader.innerHTML = headerHtml;
  
  const slideBodyText = document.getElementById('slideBodyText');
  if (slideBodyText) slideBodyText.innerHTML = bodyHtml;
  
  // Update canvas size to match the new scroll size of slideContent
  resizeWsCanvas();

  const cleanedTitle = slide.title.replace(/^\d+\.\s*/, '');
  const slideCounter = document.getElementById('slideCounter');
  if (slideCounter) {
    slideCounter.textContent = `Topic 0${currentSlide + 1} — ${cleanedTitle}`;
  }
  const topicSelect = document.getElementById('topicSelect');
  if (topicSelect) topicSelect.value = currentSlide;

  // Log slide change if recording
  if (recState !== 'idle') {
    const target = isStudioStrokeRecording ? studioStrokeActions : recActions;
    target.push({
      t: getRecElapsedMs(),
      type: 'slide',
      slideIdx: currentSlide
    });
    updateTimelineView();
  }

  // Show narration autoplay widget only on the first slide
  setTimeout(() => {
    if (currentSlide === 0) {
      const navBtn = document.getElementById('navPlayBtn');
      if (navBtn) navBtn.style.display = 'inline-flex';
      document.getElementById('playbackBar')?.classList.add('visible');
      initSlideNarration();
    } else {
      const navBtn = document.getElementById('navPlayBtn');
      if (navBtn) navBtn.style.display = 'none';
      document.getElementById('playbackBar')?.classList.remove('visible');
      pauseCombinedPlayback();
    }
  }, 100);
}

function presentKeyHandler(e) {
  // Don't intercept if user is typing in an input/textarea
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
  // Don't intercept if a CodeMirror editor is focused
  if (e.target.closest('.CodeMirror')) return;

  if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); nextSlide(); }
  else if (e.key === 'ArrowLeft') { e.preventDefault(); prevSlide(); }
  else if (e.key === 'Escape') { e.preventDefault(); closePresentMode(); }
}

// ═══════════════════════════════════════════════════════════════
// MODULE 6: LASER POINTER + DRAWING CANVAS
// ═══════════════════════════════════════════════════════════════

let drawMode = 'none'; // 'none' | 'laser' | 'pen'
let isDrawing = false;
let laserPoints = [];
let laserAnimId = null;

function getCanvas() { return document.getElementById('drawCanvas'); }
function getCtx() { return getCanvas().getContext('2d'); }

function resizeDrawCanvas() {
  const canvas = getCanvas();
  const parent = canvas.parentElement;
  canvas.width = parent.clientWidth;
  canvas.height = parent.clientHeight;
}

function toggleLaser() {
  if (drawMode === 'laser') { deactivateLaser(); return; }
  deactivatePen();
  drawMode = 'laser';
  const canvas = getCanvas();
  canvas.classList.add('active', 'laser');
  document.getElementById('laserBtn').classList.add('active');
  canvas.addEventListener('pointermove', laserMove);
  laserAnimId = requestAnimationFrame(laserLoop);
}

function deactivateLaser() {
  drawMode = drawMode === 'laser' ? 'none' : drawMode;
  const canvas = getCanvas();
  canvas.classList.remove('active', 'laser');
  document.getElementById('laserBtn').classList.remove('active');
  canvas.removeEventListener('pointermove', laserMove);
  if (laserAnimId) { cancelAnimationFrame(laserAnimId); laserAnimId = null; }
  laserPoints = [];
  clearDrawCanvas();
}

function laserMove(e) {
  const rect = getCanvas().getBoundingClientRect();
  laserPoints.push({ x: e.clientX - rect.left, y: e.clientY - rect.top, opacity: 1.0 });
}

function laserLoop() {
  const ctx = getCtx();
  const canvas = getCanvas();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = laserPoints.length - 1; i >= 0; i--) {
    laserPoints[i].opacity -= 0.025;
    if (laserPoints[i].opacity <= 0) { laserPoints.splice(i, 1); continue; }
    const p = laserPoints[i];
    ctx.beginPath();
    ctx.arc(p.x, p.y, 6, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0, 230, 246, ${p.opacity})`;
    ctx.shadowBlur = 18;
    ctx.shadowColor = `rgba(0, 230, 246, ${p.opacity * 0.6})`;
    ctx.fill();
    ctx.shadowBlur = 0;
  }
  if (drawMode === 'laser') laserAnimId = requestAnimationFrame(laserLoop);
}

function togglePen() {
  if (drawMode === 'pen') { deactivatePen(); return; }
  deactivateLaser();
  drawMode = 'pen';
  const canvas = getCanvas();
  canvas.classList.add('active');
  canvas.classList.remove('laser');
  document.getElementById('penBtn').classList.add('active');
  canvas.addEventListener('pointerdown', penDown);
  canvas.addEventListener('pointermove', penMove);
  canvas.addEventListener('pointerup', penUp);
}

function deactivatePen() {
  drawMode = drawMode === 'pen' ? 'none' : drawMode;
  const canvas = getCanvas();
  canvas.classList.remove('active');
  document.getElementById('penBtn').classList.remove('active');
  canvas.removeEventListener('pointerdown', penDown);
  canvas.removeEventListener('pointermove', penMove);
  canvas.removeEventListener('pointerup', penUp);
  isDrawing = false;
}

function penDown(e) {
  isDrawing = true;
  const ctx = getCtx();
  const rect = getCanvas().getBoundingClientRect();
  ctx.beginPath();
  ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
}

function penMove(e) {
  if (!isDrawing) return;
  const ctx = getCtx();
  const rect = getCanvas().getBoundingClientRect();
  ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
  ctx.stroke();
}

function penUp() { isDrawing = false; }

function clearDrawCanvas() {
  const canvas = getCanvas();
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  laserPoints = [];
}

// ─── Workspace Drawing Canvas Setup ───
let wsDrawMode = 'none'; // 'none' | 'rect'
let wsIsDrawing = false;
let wsStartX = 0;
let wsStartY = 0;
let wsDrawnRects = []; // persistent array of {x1%, y1%, x2%, y2%} for resize-safe repainting

function getWsCanvas() { return document.getElementById('workspaceDrawCanvas'); }
function getWsCtx() { const c = getWsCanvas(); return c ? c.getContext('2d') : null; }

function resizeWsCanvas() {
  const canvas = getWsCanvas();
  if (!canvas) return;
  const parent = canvas.parentElement;
  const scrollWidth = parent.scrollWidth || parent.clientWidth;
  const scrollHeight = parent.scrollHeight || parent.clientHeight;
  
  const dpr = window.devicePixelRatio || 1;
  
  // Backing store buffer (scaled by DPR)
  canvas.width = scrollWidth * dpr;
  canvas.height = scrollHeight * dpr;
  
  // CSS layout size (logical pixels)
  canvas.style.width = `${scrollWidth}px`;
  canvas.style.height = `${scrollHeight}px`;
  
  const ctx = getWsCtx();
  if (ctx) {
    ctx.scale(dpr, dpr);
  }
  
  // Repaint all stored rects after resize (setting .width clears canvas)
  repaintWsRects();
  
  // Refresh timeline layout positions
  if (typeof updateTimelineView === 'function') {
    updateTimelineView();
  }
}

function repaintWsRects() {
  const canvas = getWsCanvas();
  const ctx = getWsCtx();
  if (!canvas || !ctx) return;
  
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.restore();
  
  const parent = canvas.parentElement;
  if (!parent) return;
  const logicalWidth = parent.scrollWidth || parent.clientWidth;
  const logicalHeight = parent.scrollHeight || parent.clientHeight;
  
  wsDrawnRects.forEach(r => {
    const x = r.x1Pct * logicalWidth;
    const y = r.y1Pct * logicalHeight;
    const w = (r.x2Pct - r.x1Pct) * logicalWidth;
    const h = (r.y2Pct - r.y1Pct) * logicalHeight;
    
    ctx.fillStyle = 'rgba(245, 158, 11, 0.15)';
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 1.5;
    ctx.fillRect(x, y, w, h);
    ctx.strokeRect(x, y, w, h);
  });
}

function clearWsCanvas() {
  const canvas = getWsCanvas();
  const ctx = getWsCtx();
  if (!canvas || !ctx) return;
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.restore();
}

function setWsDrawMode(mode) {
  wsDrawMode = mode;
  const canvas = getWsCanvas();
  if (!canvas) return;

  const btn = document.getElementById('wsRectBtn');
  if (btn) btn.classList.remove('active');
  canvas.classList.remove('active');

  canvas.removeEventListener('pointerdown', wsPointerDown);
  canvas.removeEventListener('pointermove', wsPointerMove);
  canvas.removeEventListener('pointerup', wsPointerUp);

  if (mode === 'rect') {
    canvas.classList.add('active');
    if (btn) btn.classList.add('active');
    canvas.addEventListener('pointerdown', wsPointerDown);
    canvas.addEventListener('pointermove', wsPointerMove);
    canvas.addEventListener('pointerup', wsPointerUp);
  }
}

function wsPointerDown(e) {
  if (wsDrawMode !== 'rect') return;
  wsIsDrawing = true;
  const canvas = getWsCanvas();
  if (!canvas) return;
  const rect = canvas.getBoundingClientRect();
  wsStartX = e.clientX - rect.left;
  wsStartY = e.clientY - rect.top;
}

function wsPointerMove(e) {
  if (!wsIsDrawing || wsDrawMode !== 'rect') return;
  const canvas = getWsCanvas();
  const ctx = getWsCtx();
  if (!canvas || !ctx) return;
  const rect = canvas.getBoundingClientRect();
  const currentX = e.clientX - rect.left;
  const currentY = e.clientY - rect.top;

  repaintWsRects();

  ctx.fillStyle = 'rgba(245, 158, 11, 0.15)';
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 1.5;
  const width = currentX - wsStartX;
  const height = currentY - wsStartY;
  ctx.fillRect(wsStartX, wsStartY, width, height);
  ctx.strokeRect(wsStartX, wsStartY, width, height);
}

function wsPointerUp(e) {
  if (!wsIsDrawing || wsDrawMode !== 'rect') return;
  wsIsDrawing = false;
  const canvas = getWsCanvas();
  if (!canvas) return;
  const rect = canvas.getBoundingClientRect();
  const currentX = e.clientX - rect.left;
  const currentY = e.clientY - rect.top;

  const parent = canvas.parentElement;
  if (!parent) return;
  const logicalWidth = parent.scrollWidth || parent.clientWidth;
  const logicalHeight = parent.scrollHeight || parent.clientHeight;

  const rectPct = {
    x1Pct: wsStartX / logicalWidth,
    y1Pct: wsStartY / logicalHeight,
    x2Pct: currentX / logicalWidth,
    y2Pct: currentY / logicalHeight
  };
  wsDrawnRects.push(rectPct);

  repaintWsRects();

  if (recState !== 'idle') {
    const target = isStudioStrokeRecording ? studioStrokeActions : recActions;
    target.push({
      t: getRecElapsedMs(),
      type: 'drawRect',
      x1Pct: rectPct.x1Pct,
      y1Pct: rectPct.y1Pct,
      x2Pct: rectPct.x2Pct,
      y2Pct: rectPct.y2Pct
    });
    updateTimelineView();
  }

  if (typeof checkStudioHighlightRelease === 'function') {
    checkStudioHighlightRelease(rectPct);
  }
}

function undoLastHighlight() {
  if (wsDrawnRects.length === 0) return;
  wsDrawnRects.pop();
  repaintWsRects();
  // Also remove the last drawRect from recActions if recording
  if (recState !== 'idle') {
    const target = isStudioStrokeRecording ? studioStrokeActions : recActions;
    for (let i = target.length - 1; i >= 0; i--) {
      if (target[i].type === 'drawRect') {
        target.splice(i, 1);
        break;
      }
    }
    updateTimelineView();
  }
}

function clearWsDrawings() {
  wsDrawnRects = [];
  clearWsCanvas();
  if (recState !== 'idle') {
    const target = isStudioStrokeRecording ? studioStrokeActions : recActions;
    target.push({
      t: getRecElapsedMs(),
      type: 'clearDraw'
    });
    updateTimelineView();
  }
}

// ═══════════════════════════════════════════════════════════════
// MODULE 7: TABLE PEEK POPOVER
// ═══════════════════════════════════════════════════════════════

function renderSchemaCards() {
  const container = document.getElementById('schemaCards');
  if (!container) return;
  let html = '';
  COURSE_CONFIG.schema.tables.forEach(t => {
    html += `<div class="schema-card">
      <div class="schema-card-title">
        <span>📊 ${t.name}</span>
        <button class="peek-btn" onclick="openPeekPopover(event, '${t.name}')">👀 Peek Data</button>
      </div>
      <div class="schema-cols">`;
    t.columns.forEach(c => {
      html += `<span class="schema-col ${c.pk ? 'schema-col--pk' : ''}">${c.name} <span style="opacity:0.5">${c.type}</span></span>`;
    });
    html += `</div></div>`;
  });
  container.innerHTML = html;
}

function openPeekPopover(e, tableName) {
  e.stopPropagation();
  try {
    const result = runSQL(`SELECT * FROM ${tableName} LIMIT 3;`);
    let html = '<table class="result-table">';
    html += '<thead><tr>';
    result.columns.forEach(c => { html += `<th>${escHtml(c)}</th>`; });
    html += '</tr></thead><tbody>';
    result.values.forEach(row => {
      html += '<tr>';
      row.forEach(v => { html += `<td>${v !== null ? escHtml(String(v)) : 'NULL'}</td>`; });
      html += '</tr>';
    });
    html += '</tbody></table>';
    document.getElementById('peekContent').innerHTML = html;
    document.getElementById('peekTableName').textContent = tableName;
  } catch (err) {
    document.getElementById('peekContent').innerHTML = `<span class="output-error">${escHtml(err.message)}</span>`;
  }

  const pop = document.getElementById('peekPopover');
  // Position near click
  pop.style.top = Math.min(e.clientY, window.innerHeight - 260) + 'px';
  pop.style.left = Math.min(e.clientX, window.innerWidth - 360) + 'px';
  pop.classList.add('open');
}

function togglePeekPopover(e) {
  const pop = document.getElementById('peekPopover');
  if (pop.classList.contains('open')) { closePeekPopover(); return; }
  openPeekPopover(e, COURSE_CONFIG.schema.tables[0].name);
}

function closePeekPopover() {
  document.getElementById('peekPopover').classList.remove('open');
}

// Close popover on outside click
document.addEventListener('click', function(e) {
  const pop = document.getElementById('peekPopover');
  if (pop.classList.contains('open') && !pop.contains(e.target) && !e.target.closest('.peek-btn') && !e.target.closest('.tb-btn--tables')) {
    closePeekPopover();
  }
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closePeekPopover();
});

// ═══════════════════════════════════════════════════════════════
// MODULE 8: RECORDING ENGINE (IndexedDB)
// ═══════════════════════════════════════════════════════════════

const IDB_NAME = 'ManodemyScrimbaDB';
const IDB_STORE = 'recordings';
let idb = null;

function openIDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(IDB_NAME, 1);
    req.onupgradeneeded = () => {
      const idbInst = req.result;
      if (!idbInst.objectStoreNames.contains(IDB_STORE)) {
        idbInst.createObjectStore(IDB_STORE, { keyPath: 'id', autoIncrement: true });
      }
    };
    req.onsuccess = () => { idb = req.result; resolve(idb); };
    req.onerror = () => reject(req.error);
  });
}

function idbPut(record) {
  return new Promise((resolve, reject) => {
    const tx = idb.transaction(IDB_STORE, 'readwrite');
    const store = tx.objectStore(IDB_STORE);
    const req = store.put(record);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function idbGetAll() {
  return new Promise((resolve, reject) => {
    const tx = idb.transaction(IDB_STORE, 'readonly');
    const store = tx.objectStore(IDB_STORE);
    const req = store.getAll();
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function idbGet(id) {
  return new Promise((resolve, reject) => {
    const tx = idb.transaction(IDB_STORE, 'readonly');
    const store = tx.objectStore(IDB_STORE);
    const req = store.get(id);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

// ─── Recorder State Machine ───
// States: 'idle' → 'recording' → 'paused' → 'recording' → 'idle'
let recState = 'idle';
let mediaRecorder = null;
let audioChunks = [];
let recStartTime = 0;
let recActions = [];
let recLastSnapshot = '';
let recSnapshotInterval = null;
let recTimerInterval = null;

let loadedRecAudioFile = null;
let recAudioPlayback = null;

// ─── Audio Player Event Handlers (bound/unbound per session) ───
function onRecAudioPause() {
  if (recState !== 'recording') return;
  pauseRecording();
}

function onRecAudioResume() {
  if (recState !== 'paused') return;
  resumeRecording();
}

function onRecAudioSeeked() {
  if (recState !== 'paused') return;
  const player = document.getElementById('recAudioPlayer');
  if (!player) return;
  const targetMs = Math.floor(player.currentTime * 1000);
  const lastActionTime = recActions.length > 0 ? recActions[recActions.length - 1].t : 0;
  // If user seeked backward, punch-in (truncate future actions)
  if (targetMs < lastActionTime) {
    punchIn(targetMs);
  }
}

function handleRecAudioUpload(e) {
  const file = e.target.files[0];
  if (!file) return;
  loadedRecAudioFile = file;

  const player = document.getElementById('recAudioPlayer');
  if (player) {
    // Revoke previous ObjectURL to prevent memory leak
    if (player.src && player.src.startsWith('blob:')) {
      URL.revokeObjectURL(player.src);
    }
    player.src = URL.createObjectURL(file);
    player.classList.remove('hidden');
    player.load();
  }
}

function getRecElapsedMs() {
  if (isStudioStrokeRecording) {
    if (recAudioPlayback) {
      return Math.floor(recAudioPlayback.currentTime * 1000);
    }
    return Math.floor(studioStrokeStartMs + (Date.now() - studioStrokeRecStartTime) * studioSpeed);
  }
  if (recAudioPlayback) {
    return Math.floor(recAudioPlayback.currentTime * 1000);
  }
  return Date.now() - recStartTime;
}

function toggleRecording() {
  if (recState === 'idle') startRecording();
  else stopRecording(); // Stop from either 'recording' or 'paused' state
}

function startRecording() {
  recState = 'recording';
  audioChunks = [];
  recActions = [];
  wsDrawnRects = [];
  recStartTime = Date.now();
  recLastSnapshot = mainEditor.getValue();

  // Save initial editor and slide state
  recActions.push({ t: 0, type: 'snapshot', content: recLastSnapshot, cursor: mainEditor.getCursor() });
  recActions.push({ t: 0, type: 'slide', slideIdx: currentSlide });

  // Clear visual highlights
  clearWsCanvas();

  // Show drawing toolbar while recording
  const drawToolbar = document.getElementById('wsDrawToolbar');
  if (drawToolbar) drawToolbar.style.display = 'flex';

  // Hide paused badge
  const pausedBadge = document.getElementById('recPausedBadge');
  if (pausedBadge) pausedBadge.classList.remove('visible');

  // Open timeline drawer
  toggleTimelineDrawer(true);

  const startIntervalsAndUI = () => {
    recSnapshotInterval = setInterval(() => {
      // Don't capture snapshots while paused — avoids duplicates at same timestamp
      if (recState !== 'recording') return;
      const val = mainEditor.getValue();
      if (val !== recLastSnapshot) {
        recLastSnapshot = val;
        recActions.push({
          t: getRecElapsedMs(),
          type: 'snapshot',
          content: val,
          cursor: mainEditor.getCursor()
        });
        updateTimelineView();
      }
    }, 200);

    const btn = document.getElementById('recordBtn');
    btn.textContent = '⏹ Stop';
    btn.classList.add('recording');
    document.getElementById('recTimer').classList.remove('hidden');
  };

  if (loadedRecAudioFile) {
    const player = document.getElementById('recAudioPlayer');
    recAudioPlayback = player;

    // Bind audio player events for pause/resume/seek sync
    player.addEventListener('pause', onRecAudioPause);
    player.addEventListener('play', onRecAudioResume);
    player.addEventListener('seeked', onRecAudioSeeked);

    // Start playback — user can also manually play/pause/seek
    player.play().then(() => {
      startIntervalsAndUI();
      recTimerInterval = setInterval(() => {
        const elapsed = Math.floor(player.currentTime);
        const m = String(Math.floor(elapsed / 60)).padStart(2, '0');
        const s = String(elapsed % 60).padStart(2, '0');
        document.getElementById('recTimer').textContent = `${m}:${s}`;
        updateTimelinePlayhead();
      }, 500);
    }).catch(err => {
      console.warn("Audio autoplay blocked, starting manually:", err);
      startIntervalsAndUI();
      recTimerInterval = setInterval(() => {
        const elapsed = Math.floor(player.currentTime);
        const m = String(Math.floor(elapsed / 60)).padStart(2, '0');
        const s = String(elapsed % 60).padStart(2, '0');
        document.getElementById('recTimer').textContent = `${m}:${s}`;
        updateTimelinePlayhead();
      }, 500);
    });
  } else {
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.ondataavailable = e => audioChunks.push(e.data);
      mediaRecorder.start();

      startIntervalsAndUI();
      recTimerInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - recStartTime) / 1000);
        const m = String(Math.floor(elapsed / 60)).padStart(2, '0');
        const s = String(elapsed % 60).padStart(2, '0');
        document.getElementById('recTimer').textContent = `${m}:${s}`;
        updateTimelinePlayhead();
      }, 500);
    }).catch(err => {
      console.error('Mic access denied:', err);
      alert('Microphone access is required to record. Or, load an audio file first using the folder button.');
      recState = 'idle';
    });
  }
  updateTimelineView();
}

function pauseRecording() {
  if (recState !== 'recording') return;
  recState = 'paused';

  // Capture one final snapshot at the pause point
  const val = mainEditor.getValue();
  if (val !== recLastSnapshot) {
    recLastSnapshot = val;
    recActions.push({
      t: getRecElapsedMs(),
      type: 'snapshot',
      content: val,
      cursor: mainEditor.getCursor()
    });
  }

  // Show paused badge
  const pausedBadge = document.getElementById('recPausedBadge');
  if (pausedBadge) pausedBadge.classList.add('visible');

  const btn = document.getElementById('recordBtn');
  btn.textContent = '⏸ Paused';

  updateTimelineView();
}

function resumeRecording() {
  if (recState !== 'paused') return;
  recState = 'recording';

  // Capture the final prep state as a single snapshot at resume time
  const val = mainEditor.getValue();
  if (val !== recLastSnapshot) {
    recLastSnapshot = val;
    recActions.push({
      t: getRecElapsedMs(),
      type: 'snapshot',
      content: val,
      cursor: mainEditor.getCursor()
    });
  }

  // Hide paused badge
  const pausedBadge = document.getElementById('recPausedBadge');
  if (pausedBadge) pausedBadge.classList.remove('visible');

  const btn = document.getElementById('recordBtn');
  btn.textContent = '⏹ Stop';

  updateTimelineView();
}

function punchIn(targetMs) {
  // Truncate all actions recorded after targetMs
  recActions = recActions.filter(a => a.t <= targetMs);

  // Rebuild visual state from remaining actions
  rebuildRecordingState(targetMs);

  console.log(`Punch-in at ${targetMs}ms — ${recActions.length} actions remaining`);
  updateTimelineView();
}

function rebuildRecordingState(targetMs) {
  // Find and restore the latest snapshot at or before targetMs
  let lastSnapshot = null;
  let lastSlideIdx = 0;
  let lastRun = null;
  let activeCaption = null;
  wsDrawnRects = [];

  for (let i = 0; i < recActions.length; i++) {
    const a = recActions[i];
    if (a.t > targetMs) break;
    if (a.type === 'snapshot') lastSnapshot = a;
    if (a.type === 'slide') lastSlideIdx = a.slideIdx;
    if (a.type === 'drawRect') {
      wsDrawnRects.push({
        x1Pct: a.x1Pct, y1Pct: a.y1Pct,
        x2Pct: a.x2Pct, y2Pct: a.y2Pct
      });
    }
    if (a.type === 'clearDraw') wsDrawnRects = [];
    if (a.type === 'run') lastRun = a;
    if (a.type === 'caption') activeCaption = a;
  }

  // Restore editor snapshot content
  if (lastSnapshot) {
    if (mainEditor && mainEditor.getValue() !== lastSnapshot.content) {
      mainEditor.setValue(lastSnapshot.content);
    }
    if (mainEditor && lastSnapshot.cursor) {
      mainEditor.setCursor(lastSnapshot.cursor);
    }
    recLastSnapshot = lastSnapshot.content;
  }

  // Restore slide index
  currentSlide = lastSlideIdx;
  renderSideSlide();

  // Restore drawings (highlights) on live workspace canvas
  repaintWsRects();

  // Restore query runs on live workspace output terminal
  if (lastRun && lastRun.result) {
    renderResultTable(lastRun.result, 'mainOutput');
  } else {
    const outputEl = document.getElementById('mainOutput');
    if (outputEl) outputEl.innerHTML = '<span class="output-success">Ready...</span>';
  }

  // Handle caption display
  const captionEl = document.getElementById('workspaceVpCaption');
  if (captionEl) {
    if (timelineOpen) {
      captionEl.style.display = 'block';
      captionEl.textContent = activeCaption ? activeCaption.text : `📢 Timeline Preview Mode (${formatTime(targetMs/1000)} / ${formatTime(getTimelineDurationMs()/1000)})`;
    } else {
      captionEl.style.display = 'none';
    }
  }
}

function stopRecording() {
  if (recState === 'idle') return;

  const wasUsingAudioPlayer = recAudioPlayback != null;
  recState = 'idle';
  clearInterval(recSnapshotInterval);
  clearInterval(recTimerInterval);

  // Final snapshot
  recActions.push({
    t: getRecElapsedMs(),
    type: 'snapshot',
    content: mainEditor.getValue(),
    cursor: mainEditor.getCursor()
  });

  // Unbind audio player events
  if (wasUsingAudioPlayer) {
    const player = document.getElementById('recAudioPlayer');
    if (player) {
      player.removeEventListener('pause', onRecAudioPause);
      player.removeEventListener('play', onRecAudioResume);
      player.removeEventListener('seeked', onRecAudioSeeked);
      player.pause();
    }
  }

  const saveRecordingData = async (audioBlob) => {
    const topicIdx = document.getElementById('topicSelect').value;
    const defaultLabel = COURSE_CONFIG.topics[topicIdx]?.label || `Recording ${Date.now()}`;
    let label = defaultLabel;
    try {
      label = prompt('Name this recording:', defaultLabel) || defaultLabel;
    } catch (e) {
      console.warn('prompt() blocked inside frame, using default label:', defaultLabel);
    }

    const record = {
      topicLabel: label,
      topicIndex: parseInt(topicIdx),
      audioBlob: audioBlob,
      actions: recActions,
      createdAt: new Date().toISOString()
    };

    try {
      const id = await idbPut(record);
      console.log('Recording saved to IndexedDB, id:', id);
      await loadBookmarks();
    } catch (err) {
      console.error('Failed to save recording:', err);
      alert('Failed to save recording: ' + err.message);
    }

    const btn = document.getElementById('recordBtn');
    btn.textContent = '🔴 Record';
    btn.classList.remove('recording');
    document.getElementById('recTimer').classList.add('hidden');
    document.getElementById('recTimer').textContent = '00:00';

    // Hide paused badge and drawing toolbar
    const pausedBadge = document.getElementById('recPausedBadge');
    if (pausedBadge) pausedBadge.classList.remove('visible');
    const drawToolbar = document.getElementById('wsDrawToolbar');
    if (drawToolbar) drawToolbar.style.display = 'none';

    toggleTimelineDrawer(false);

    setWsDrawMode('none');
    wsDrawnRects = [];
    clearWsCanvas();
  };

  if (wasUsingAudioPlayer) {
    saveRecordingData(loadedRecAudioFile);
    recAudioPlayback = null;
  } else if (mediaRecorder) {
    mediaRecorder.stop();
    mediaRecorder.stream.getTracks().forEach(track => track.stop());
    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
      saveRecordingData(audioBlob);
      mediaRecorder = null;
    };
  }
}

// Log query executions during recording
function logRecQueryExec(query, result) {
  if (recState === 'idle' || !result) return;
  const target = isStudioStrokeRecording ? studioStrokeActions : recActions;
  target.push({
    t: getRecElapsedMs(),
    type: 'run',
    query: query,
    result: { columns: result.columns, values: result.values }
  });
  updateTimelineView();
}

// ─── Playback State ───
let playbackAudio = null;
let playbackActions = [];
let playbackAnimId = null;
let playbackPlaying = false;
let playbackCurrentIdx = 0;
let playbackTakenOver = false;

async function loadBookmarks() {
  const recordings = await idbGetAll();
  const container = document.getElementById('bookmarksList');
  if (!container) return;

  if (recordings.length === 0) {
    container.innerHTML = '<div class="bookmark-empty">No recordings yet — click Record to create one.</div>';
    return;
  }

  let html = '';
  recordings.forEach(rec => {
    html += `<div class="bookmark-chip" data-rec-id="${rec.id}" onclick="loadPlayback(${rec.id})">
      <span class="bk-icon">🎬</span>
      <span>${escHtml(rec.topicLabel)}</span>
    </div>`;
  });
  container.innerHTML = html;
}

async function loadPlayback(recId) {
  const rec = await idbGet(recId);
  if (!rec) { alert('Recording not found.'); return; }

  // Highlight active bookmark
  document.querySelectorAll('.bookmark-chip').forEach(c => c.classList.remove('active'));
  document.querySelector(`.bookmark-chip[data-rec-id="${recId}"]`)?.classList.add('active');

  // Load audio
  if (playbackAudio) { playbackAudio.pause(); URL.revokeObjectURL(playbackAudio.src); }
  playbackAudioBlob = rec.audioBlob;
  const audioUrl = URL.createObjectURL(rec.audioBlob);
  playbackAudio = new Audio(audioUrl);
  playbackActions = rec.actions;
  playbackCurrentIdx = 0;
  playbackPlaying = false;
  playbackTakenOver = false;

  // Show playback bar
  document.getElementById('playbackBar').classList.add('visible');
  document.getElementById('takeoverBadge').classList.remove('visible');
  document.getElementById('playPauseBtn').textContent = '▶';

  // Set initial state
  if (playbackActions.length > 0 && playbackActions[0].type === 'snapshot') {
    mainEditor.setValue(playbackActions[0].content);
    if (playbackActions[0].cursor) mainEditor.setCursor(playbackActions[0].cursor);
  }

  // Audio metadata
  playbackAudio.addEventListener('loadedmetadata', () => {
    document.getElementById('seekBar').max = playbackAudio.duration;
    updatePlaybackTime();
    toggleTimelineDrawer(true);
    updateTimelineView();
  });

  playbackAudio.addEventListener('ended', () => {
    playbackPlaying = false;
    document.getElementById('playPauseBtn').textContent = '▶';
    if (playbackAnimId) { cancelAnimationFrame(playbackAnimId); playbackAnimId = null; }
    updateTimelinePlayhead();
  });
}

function togglePlayback() {
  if (!playbackAudio) return;

  if (playbackTakenOver) {
    // Resume from takeover — re-sync to current audio time
    playbackTakenOver = false;
    document.getElementById('takeoverBadge').classList.remove('visible');
    mainEditor.setOption('readOnly', false);
    syncEditorToTime(playbackAudio.currentTime * 1000);
  }

  if (playbackPlaying) {
    playbackAudio.pause();
    playbackPlaying = false;
    document.getElementById('playPauseBtn').textContent = '▶';
    if (playbackAnimId) { cancelAnimationFrame(playbackAnimId); playbackAnimId = null; }
  } else {
    playbackAudio.play();
    playbackPlaying = true;
    document.getElementById('playPauseBtn').textContent = '⏸';
    playbackAnimId = requestAnimationFrame(playbackLoop);
  }
}

function playbackLoop() {
  if (!playbackPlaying || !playbackAudio) return;

  const currentMs = playbackAudio.currentTime * 1000;
  const canvas = getWsCanvas();
  const canvasWidth = canvas ? canvas.width : 543;
  const canvasHeight = canvas ? canvas.height : 300;

  // Apply actions up to current time
  let changedDraw = false;
  while (playbackCurrentIdx < playbackActions.length && playbackActions[playbackCurrentIdx].t <= currentMs) {
    const action = playbackActions[playbackCurrentIdx];
    if (action.type === 'snapshot') {
      mainEditor.setValue(action.content);
      if (action.cursor) mainEditor.setCursor(action.cursor);
    } else if (action.type === 'run' && action.result) {
      renderResultTable(action.result, 'mainOutput');
    } else if (action.type === 'slide') {
      currentSlide = action.slideIdx;
      renderSideSlide();
    } else if (action.type === 'drawRect') {
      wsDrawnRects.push({
        x1Pct: action.x1Pct != null ? action.x1Pct : action.x1 / canvasWidth,
        y1Pct: action.y1Pct != null ? action.y1Pct : action.y1 / canvasHeight,
        x2Pct: action.x2Pct != null ? action.x2Pct : action.x2 / canvasWidth,
        y2Pct: action.y2Pct != null ? action.y2Pct : action.y2 / canvasHeight
      });
      changedDraw = true;
    } else if (action.type === 'clearDraw') {
      wsDrawnRects = [];
      changedDraw = true;
    }
    playbackCurrentIdx++;
  }

  if (changedDraw) {
    repaintWsRects();
  }

  // Update seek bar & time
  document.getElementById('seekBar').value = playbackAudio.currentTime;
  updatePlaybackTime();
  updateTimelinePlayhead();

  playbackAnimId = requestAnimationFrame(playbackLoop);
}

function syncEditorToTime(targetMs) {
  // Clear drawings on seek first
  wsDrawnRects = [];
  clearWsCanvas();

  const canvas = getWsCanvas();
  const canvasWidth = canvas ? canvas.width : 543;
  const canvasHeight = canvas ? canvas.height : 300;

  // Find the latest snapshot at or before targetMs
  let lastSnapshotIdx = -1;
  for (let i = 0; i < playbackActions.length; i++) {
    if (playbackActions[i].t > targetMs) break;
    if (playbackActions[i].type === 'snapshot') lastSnapshotIdx = i;
  }
  if (lastSnapshotIdx >= 0) {
    mainEditor.setValue(playbackActions[lastSnapshotIdx].content);
    if (playbackActions[lastSnapshotIdx].cursor) mainEditor.setCursor(playbackActions[lastSnapshotIdx].cursor);
  }

  // Find and set the latest slide at or before targetMs
  let lastSlideIdx = -1;
  for (let i = 0; i < playbackActions.length; i++) {
    if (playbackActions[i].t > targetMs) break;
    if (playbackActions[i].type === 'slide') lastSlideIdx = playbackActions[i].slideIdx;
  }
  if (lastSlideIdx >= 0) {
    currentSlide = lastSlideIdx;
    renderSideSlide();
  }

  // Redraw all drawings prior to targetMs
  for (let i = 0; i < playbackActions.length; i++) {
    if (playbackActions[i].t > targetMs) break;
    const action = playbackActions[i];
    if (action.type === 'drawRect') {
      wsDrawnRects.push({
        x1Pct: action.x1Pct != null ? action.x1Pct : action.x1 / canvasWidth,
        y1Pct: action.y1Pct != null ? action.y1Pct : action.y1 / canvasHeight,
        x2Pct: action.x2Pct != null ? action.x2Pct : action.x2 / canvasWidth,
        y2Pct: action.y2Pct != null ? action.y2Pct : action.y2 / canvasHeight
      });
    } else if (action.type === 'clearDraw') {
      wsDrawnRects = [];
    }
  }

  repaintWsRects();

  // Set playbackCurrentIdx to the next action after targetMs
  playbackCurrentIdx = 0;
  for (let i = 0; i < playbackActions.length; i++) {
    if (playbackActions[i].t > targetMs) { playbackCurrentIdx = i; return; }
  }
  playbackCurrentIdx = playbackActions.length;
}

function seekPlayback(value) {
  if (!playbackAudio) return;
  playbackAudio.currentTime = parseFloat(value);
  syncEditorToTime(playbackAudio.currentTime * 1000);
  updatePlaybackTime();
}

function setPlaybackSpeed(speed, btn) {
  if (!playbackAudio) return;
  playbackAudio.playbackRate = speed;
  document.querySelectorAll('.speed-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function updatePlaybackTime() {
  if (!playbackAudio) return;
  const cur = formatTime(playbackAudio.currentTime);
  const dur = formatTime(playbackAudio.duration || 0);
  document.getElementById('playbackTime').textContent = `${cur} / ${dur}`;
}

function formatTime(seconds) {
  if (isNaN(seconds)) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

// Student takeover: when user clicks in editor during playback
function setupStudentTakeover() {
  // We detect user interaction by listening for focus/click on the editor
  document.getElementById('mainEditorWrap').addEventListener('mousedown', () => {
    if (playbackPlaying) {
      playbackPlaying = false;
      playbackTakenOver = true;
      playbackAudio.pause();
      document.getElementById('playPauseBtn').textContent = '▶';
      document.getElementById('takeoverBadge').classList.add('visible');
      if (playbackAnimId) { cancelAnimationFrame(playbackAnimId); playbackAnimId = null; }
    }
  });
}

// ═══════════════════════════════════════════════════════════════
// MODULE 9: TEST PORTAL + GRADING
// ═══════════════════════════════════════════════════════════════

let testOpen = false;
let testTimerInterval = null;
let testSecondsRemaining = 7200; // 120 minutes
let testStartTime = null;
let testCurrentQ = 0;
let testAnswers = []; // array of { answer: string, attempted: bool }
let testSubmitted = false;

function openTestPortal() {
  testOpen = true;
  testSubmitted = false;
  testSecondsRemaining = 7200;
  testStartTime = Date.now();
  testCurrentQ = 0;
  testAnswers = COURSE_CONFIG.testQuestions.map(() => ({ answer: '', attempted: false }));

  document.getElementById('testOverlay').classList.add('open');
  
  // Load and display personal best test score
  const best = localStorage.getItem('test_best_score') || '0';
  const bestEl = document.getElementById('testBestScoreCount');
  if (bestEl) bestEl.textContent = best;
  updateTestProgress();

  const submitBtn = document.getElementById('submitTestBtn');
  if (submitBtn) submitBtn.disabled = false;

  // Render sidebar buttons
  const sidebar = document.getElementById('testSidebar');
  let html = '';
  for (let i = 0; i < 25; i++) {
    html += `<button class="test-q-btn ${i === 0 ? 'current' : ''}" id="tqBtn${i}" onclick="switchTestQuestion(${i})">Q${i+1}</button>`;
  }
  sidebar.innerHTML = html;

  // Init test editor if not done
  if (!testEditor) initTestEditor();
  else testEditor.setValue('-- Write your answer here\n');

  renderTestQuestion(0);
  startTestTimer();
}

function closeTestPortal() {
  testOpen = false;
  clearInterval(testTimerInterval);
  document.getElementById('testOverlay').classList.remove('open');
}

function startTestTimer() {
  clearInterval(testTimerInterval);
  updateTestTimerDisplay();

  testTimerInterval = setInterval(() => {
    testSecondsRemaining--;
    updateTestTimerDisplay();
    if (testSecondsRemaining <= 0) {
      clearInterval(testTimerInterval);
      submitTest();
    }
  }, 1000);
}

function updateTestTimerDisplay() {
  const m = Math.floor(testSecondsRemaining / 60);
  const s = testSecondsRemaining % 60;
  const display = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  const el = document.getElementById('testTimer');
  el.textContent = display;
  if (testSecondsRemaining <= 300) el.classList.add('warning');
  else el.classList.remove('warning');
}

function switchTestQuestion(idx) {
  // Save current answer
  saveCurrentTestAnswer();

  testCurrentQ = idx;
  renderTestQuestion(idx);

  // Update sidebar
  document.querySelectorAll('.test-q-btn').forEach((btn, i) => {
    btn.classList.remove('current');
    if (i === idx) btn.classList.add('current');
  });
}

function saveCurrentTestAnswer() {
  if (!testEditor) return;
  const val = testEditor.getValue().trim();
  testAnswers[testCurrentQ].answer = val;
  if (val && val !== '-- Write your answer here') {
    testAnswers[testCurrentQ].attempted = true;
    document.getElementById(`tqBtn${testCurrentQ}`).classList.add('attempted');
  }
  updateTestProgress();
}

function renderTestQuestion(idx) {
  const q = COURSE_CONFIG.testQuestions[idx];
  document.getElementById('testQuestionPrompt').innerHTML = `<strong>Q${q.id}.</strong> ${q.prompt}`;
  document.getElementById('testQCounter').textContent = `Q${idx + 1} / 25`;

  // Load saved answer or default
  const saved = testAnswers[idx].answer;
  testEditor.setValue(saved || '-- Write your answer here\n');
  testEditor.focus();

  // Clear output
  document.getElementById('testOutput').innerHTML = '<div class="output-label">Terminal Output</div><span class="output-success">Ready...</span>';
}

function runTestQuery() {
  if (!testEditor) return;
  const query = testEditor.getValue().trim();
  saveCurrentTestAnswer();
  try {
    const result = runSQL(query);
    renderResultTable(result, 'testOutput');
  } catch (err) {
    const hint = analyzeQueryError(query, err);
    renderError(err.message, hint, 'testOutput');
  }
}

function clearTestEditor() {
  if (testEditor) testEditor.setValue('');
}

function updateTestProgress() {
  const attempted = testAnswers.filter(a => a.attempted).length;
  const attemptedCountEl = document.getElementById('testAttemptedCount');
  if (attemptedCountEl) attemptedCountEl.textContent = attempted;
  
  const pct = (attempted / 25) * 100;
  const fillEl = document.getElementById('testProgressFill');
  if (fillEl) fillEl.style.width = `${pct}%`;
  
  const testProgressEl = document.getElementById('testProgress');
  if (testProgressEl) testProgressEl.textContent = `Attempted: ${attempted} / 25`;
}

function submitTest() {
  saveCurrentTestAnswer();
  clearInterval(testTimerInterval);
  testSubmitted = true;

  // Disable further editing
  document.getElementById('submitTestBtn').disabled = true;

  // Grade each question
  let totalCorrect = 0;
  const results = [];

  COURSE_CONFIG.testQuestions.forEach((q, i) => {
    const studentQuery = testAnswers[i].answer;
    let correct = false;
    let studentResult = null;
    let refResult = null;

    try { refResult = runSQL(q.ref); } catch(e) { /* reference should never fail */ }

    if (studentQuery && studentQuery !== '-- Write your answer here') {
      try {
        studentResult = runSQL(studentQuery);
        // Compare value sets (order-insensitive)
        correct = compareResults(refResult, studentResult);
      } catch (e) {
        correct = false;
      }
    }

    if (correct) totalCorrect++;
    results.push({ qId: q.id, correct, studentQuery, attempted: testAnswers[i].attempted });

    // Update sidebar button
    const btn = document.getElementById(`tqBtn${i}`);
    btn.classList.remove('current', 'attempted');
    btn.classList.add(correct ? 'correct' : (testAnswers[i].attempted ? 'incorrect' : ''));
  });

  // Render scorecard
  const elapsed = Math.floor((Date.now() - testStartTime) / 1000);
  const elapsedStr = `${Math.floor(elapsed / 60)}m ${elapsed % 60}s`;

  document.getElementById('scoreBig').textContent = `${totalCorrect} / 25`;
  document.getElementById('scoreBig').className = `score-big ${totalCorrect >= 13 ? 'pass' : 'fail'}`;
  document.getElementById('scoreMeta').textContent = `Time spent: ${elapsedStr} • ${totalCorrect >= 13 ? '✅ PASSED' : '❌ NEEDS REVIEW'}`;

  let bodyHtml = '';
  results.forEach(r => {
    bodyHtml += `<tr>
      <td>Q${r.qId}</td>
      <td>${r.correct ? '✅' : (r.attempted ? '❌' : '⬜')}</td>
      <td><code style="font-size:0.72rem; word-break:break-all;">${r.studentQuery ? escHtml(r.studentQuery.substring(0, 80)) : '—'}</code></td>
    </tr>`;
  });
  document.getElementById('scorecardBody').innerHTML = bodyHtml;

  // Update best score in localStorage and UI
  const previousBest = parseInt(localStorage.getItem('test_best_score') || '0', 10);
  const newBest = Math.max(previousBest, totalCorrect);
  localStorage.setItem('test_best_score', newBest);
  
  const bestEl = document.getElementById('testBestScoreCount');
  if (bestEl) bestEl.textContent = newBest;
  
  // Make progress bar show 100% completed green
  const fillEl = document.getElementById('testProgressFill');
  if (fillEl) {
    fillEl.style.width = '100%';
    fillEl.style.background = 'var(--green)';
  }

  document.getElementById('scorecardOverlay').classList.add('open');
}

function compareResults(expected, actual) {
  if (!expected || !actual) return false;
  if (expected.values.length !== actual.values.length) return false;
  if (expected.columns.length !== actual.columns.length) return false;

  // Sort both value arrays for order-insensitive comparison
  const sortRows = (rows) => rows.map(r => r.map(v => String(v))).sort((a, b) => a.join('|').localeCompare(b.join('|')));
  const expSorted = sortRows(expected.values);
  const actSorted = sortRows(actual.values);

  for (let i = 0; i < expSorted.length; i++) {
    for (let j = 0; j < expSorted[i].length; j++) {
      // Compare as strings, handle floating point precision
      const ev = expSorted[i][j];
      const av = actSorted[i][j];
      if (ev !== av) {
        // Try numeric comparison with tolerance
        const en = parseFloat(ev);
        const an = parseFloat(av);
        if (isNaN(en) || isNaN(an) || Math.abs(en - an) > 0.01) return false;
      }
    }
  }
  return true;
}

function closeScorecard() {
  document.getElementById('scorecardOverlay').classList.remove('open');
}

// ═══════════════════════════════════════════════════════════════
// WORKSPACE QUESTION NAVIGATION
// ═══════════════════════════════════════════════════════════════

let currentPracticeQ = 0;
let currentDay = 'day01';

function loadQuestionsForDay(day) {
  currentDay = day;
  const questions = COURSE_CONFIG.allPracticeQuestions[day] || COURSE_CONFIG.allPracticeQuestions.day01;
  COURSE_CONFIG.practiceQuestions = questions;
  currentPracticeQ = 0;
  renderPracticeQuestion();
  updatePracticeStats();
}

// Mapping of question id → audio file (for Day 01)
const questionAudioMap = {
  'day01': {
    1: 'New_Day1Part1Question01.mp3',
    2: 'New_Day1Part1Question03.mp3'
  }
};

// Map per day → question id → { src, code, startAt (seconds), charInterval (ms) }
const questionSolutionMap = {
  'day01': {
    1: { src: 'New_Day1Part1Question02.mp3', code: 'SELECT * FROM employees;', startAt: 1.5, charInterval: 110 }
  }
};

let typewriterTimers = []; // pending typewriter timeouts for cancellation

function cancelTypewriter() {
  typewriterTimers.forEach(t => clearTimeout(t));
  typewriterTimers = [];
}

function renderPracticeQuestion() {
  const q = COURSE_CONFIG.practiceQuestions[currentPracticeQ];
  if (q) {
    document.getElementById('questionPrompt').innerHTML = `Q${q.id}. ${q.prompt}`;
    document.getElementById('qCounter').textContent = `Question-${String(q.id).padStart(2, '0')}`;

    // Update question audio button based on the question id
    const btn = document.getElementById('questionAudioBtn');
    const audioMap = questionAudioMap[currentDay] || questionAudioMap['day01'];
    const audioSrc = audioMap ? audioMap[q.id] : null;
    if (btn) {
      if (audioSrc) {
        btn.style.display = 'inline-flex';
        btn.onclick = () => playQuestionAudio(btn, audioSrc);
      } else {
        btn.style.display = 'none';
      }
    }

    // Show/hide solution audio button based on whether this question has a solution audio
    const solBtn = document.getElementById('solutionAudioBtn');
    if (solBtn) {
      const solMap = questionSolutionMap[currentDay] || questionSolutionMap['day01'];
      const hasSolution = solMap && solMap[q.id];
      solBtn.style.display = hasSolution ? 'inline-flex' : 'none';
      // Reset icon on question change
      solBtn.innerHTML = `<svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`;
      solBtn.classList.remove('playing');
    }

    // Remove highlight when question changes
    const bar = document.getElementById('questionBar');
    if (bar) bar.classList.remove('question-playing');
  }
}

// Helper: jump the combined system to a specific track by src filename, returns audio or null
function syncCombinedToTrack(srcFilename) {
  initSlideNarration(); // ensure combinedAudios is initialised
  const idx = combinedTracks.findIndex(t => t.src === srcFilename);
  if (idx === -1) return null;

  // Pause currently playing combined track
  if (isCombinedPlaying) {
    combinedAudios[combinedTrackIndex].pause();
    isCombinedPlaying = false;
  }
  if (playProgressInterval) clearInterval(playProgressInterval);

  // Rewind old track
  combinedAudios[combinedTrackIndex].currentTime = 0;

  // Switch to the target track
  combinedTrackIndex = idx;
  combinedAudios[idx].currentTime = 0;
  isCombinedPlaying = true;
  updatePlayButtonStates(true);
  startProgressLoop();
  return combinedAudios[idx];
}

function playQuestionAudio(btn, audioSrc) {
  const src = audioSrc || 'New_Day1Part1Question01.mp3';
  const bar = document.getElementById('questionBar');

  // Stop any OTHER standalone audio playing
  if (currentPlayingAudio && !combinedAudios.includes(currentPlayingAudio)) {
    currentPlayingAudio.pause();
    if (currentPlayingBtn && currentPlayingBtn !== btn) {
      currentPlayingBtn.innerHTML = `<svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`;
      currentPlayingBtn.classList.remove('playing');
    }
  }

  // Check if this track is already the active combined track
  const trackIdx = combinedTracks.findIndex(t => t.src === src);
  const combinedAudio = trackIdx !== -1 ? combinedAudios[trackIdx] : null;

  // Toggle pause/resume if already playing this track
  if (combinedAudio && combinedTrackIndex === trackIdx && currentPlayingBtn === btn) {
    if (combinedAudio.paused) {
      combinedAudio.play();
      isCombinedPlaying = true;
      btn.innerHTML = `<svg class="pause-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`;
      btn.classList.add('playing');
      if (bar) bar.classList.add('question-playing');
      updatePlayButtonStates(true);
      startProgressLoop();
    } else {
      combinedAudio.pause();
      isCombinedPlaying = false;
      btn.innerHTML = `<svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`;
      btn.classList.remove('playing');
      if (bar) bar.classList.remove('question-playing');
      updatePlayButtonStates(false);
      if (playProgressInterval) clearInterval(playProgressInterval);
    }
    return;
  }

  // Scroll theory panel to top
  const slideContent = document.getElementById('slideContent');
  if (slideContent) slideContent.scrollTo({ top: 0, behavior: 'smooth' });

  // Highlight question bar
  if (bar) bar.classList.add('question-playing');

  // Jump combined system to this track
  const audio = combinedAudio ? syncCombinedToTrack(src) : new Audio(`/Version-3/${src}`);

  currentPlayingAudio = audio;
  currentPlayingBtn = btn;
  audio.play().catch(e => console.log('Question audio play error:', e));

  btn.innerHTML = `<svg class="pause-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`;
  btn.classList.add('playing');

  // onended: restore btn, remove bar highlight, chain to solution
  const handleEnded = () => {
    btn.innerHTML = `<svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`;
    btn.classList.remove('playing');
    if (bar) bar.classList.remove('question-playing');
    currentPlayingAudio = null;
    currentPlayingBtn = null;

    // Auto-chain: play the solution audio after question narration ends
    const solMap = questionSolutionMap[currentDay] || questionSolutionMap['day01'];
    const q = COURSE_CONFIG.practiceQuestions[currentPracticeQ];
    const solEntry = q && solMap ? solMap[q.id] : null;
    if (solEntry) {
      setTimeout(() => playSolutionAudio(solEntry), 400);
    }
  };

  // Use once listener to avoid duplicates from combined system re-registering
  audio.removeEventListener('ended', audio._qEndedHandler);
  audio._qEndedHandler = handleEnded;
  audio.addEventListener('ended', handleEnded, { once: true });
}

// ─── Solution audio + code typewriter ───────────────────────────────────────

function playSolutionAudio(solutionEntry, triggerBtn) {
  if (!solutionEntry) return;
  const { src, code, startAt, charInterval } = solutionEntry;
  const fullSrc = `/Version-3/${src}`;
  const btn = triggerBtn || document.getElementById('solutionAudioBtn');

  // Stop any currently playing audio cleanly
  if (currentPlayingAudio && !combinedAudios.includes(currentPlayingAudio)) {
    currentPlayingAudio.pause();
    if (currentPlayingBtn && currentPlayingBtn !== btn) {
      currentPlayingBtn.innerHTML = `<svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`;
      currentPlayingBtn.classList.remove('playing');
    }
  }
  cancelTypewriter();

  // Clear editor ready for typewriter
  if (mainEditor) {
    mainEditor.setValue('');
    mainEditor.focus();
  }

  // Use combined audio system if this track is registered there
  const audio = syncCombinedToTrack(src) || new Audio(fullSrc);
  currentPlayingAudio = audio;
  currentPlayingBtn = btn;

  if (btn) {
    btn.innerHTML = `<svg class="pause-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`;
    btn.classList.add('playing');
  }

  audio.play().catch(e => console.log('Solution audio play error:', e));


  // Schedule typewriter: one char every charInterval ms starting at startAt seconds
  const startDelay = startAt * 1000;
  const chars = code.split('');
  let typed = '';

  chars.forEach((char, i) => {
    const t = setTimeout(() => {
      typed += char;
      if (mainEditor) {
        mainEditor.setValue(typed);
        const lastLine = mainEditor.lastLine();
        mainEditor.setCursor({ line: lastLine, ch: mainEditor.getLine(lastLine).length });
      }

      // After the last character is typed — run query + scroll result into view
      if (i === chars.length - 1) {
        setTimeout(() => {
          runCurrentQuery();
          setTimeout(() => {
            const outputEl = document.getElementById('mainOutput');
            if (outputEl) {
              outputEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
          }, 350);
        }, 400);
      }
    }, startDelay + i * charInterval);
    typewriterTimers.push(t);
  });

  // ── Table cinematic scroll: start at 13.5s, scroll slowly until audio ends ──
  let tableScrollInterval = null;
  const tableScrollStartDelay = 13500; // ms from audio start

  const tableScrollTimer = setTimeout(() => {
    const outputEl = document.getElementById('mainOutput');
    if (!outputEl) return;

    // Scroll the table slowly downward (1px every 40ms ≈ 25px/s)
    tableScrollInterval = setInterval(() => {
      const atBottom = outputEl.scrollTop + outputEl.clientHeight >= outputEl.scrollHeight - 2;
      if (atBottom) {
        clearInterval(tableScrollInterval);
      } else {
        outputEl.scrollTop += 1;
      }
    }, 40);
  }, tableScrollStartDelay);
  typewriterTimers.push(tableScrollTimer); // tracked so cancelTypewriter() stops it too

  audio.onended = () => {
    if (tableScrollInterval) clearInterval(tableScrollInterval);
    if (btn) {
      btn.innerHTML = `<svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`;
      btn.classList.remove('playing');
    }
    cancelTypewriter();
    currentPlayingAudio = null;
    currentPlayingBtn = null;
  };
}

function playSolutionAudioFromBtn(btn) {
  const solMap = questionSolutionMap[currentDay] || questionSolutionMap['day01'];
  const q = COURSE_CONFIG.practiceQuestions[currentPracticeQ];
  const solEntry = q && solMap ? solMap[q.id] : null;
  if (!solEntry) return;

  // Toggle pause/resume if same audio is already playing
  if (currentPlayingAudio && currentPlayingBtn === btn) {
    if (currentPlayingAudio.paused) {
      currentPlayingAudio.play();
      btn.innerHTML = `<svg class="pause-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`;
      btn.classList.add('playing');
    } else {
      currentPlayingAudio.pause();
      btn.innerHTML = `<svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`;
      btn.classList.remove('playing');
    }
    return;
  }

  playSolutionAudio(solEntry, btn);
}

function clearOutputSection() {
  // Stop any playing audio and typewriter on question change
  if (currentPlayingAudio) {
    currentPlayingAudio.pause();
    currentPlayingAudio = null;
  }
  cancelTypewriter();
  if (currentPlayingBtn) {
    currentPlayingBtn.innerHTML = `<svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`;
    currentPlayingBtn.classList.remove('playing');
    currentPlayingBtn = null;
  }
  // Reset output to default state
  const outputEl = document.getElementById('mainOutput');
  if (outputEl) {
    outputEl.innerHTML = `<div class="output-label">Terminal Output</div><span class="output-success">System: SQLite database ready. Table 'employees' loaded.</span>`;
    outputEl.scrollTop = 0;
  }
  // Reset editor
  if (mainEditor) mainEditor.setValue('');
}

function nextQuestion() {
  if (currentPracticeQ < COURSE_CONFIG.practiceQuestions.length - 1) {
    clearOutputSection();
    currentPracticeQ++;
    renderPracticeQuestion();
  }
}

function prevQuestion() {
  if (currentPracticeQ > 0) {
    clearOutputSection();
    currentPracticeQ--;
    renderPracticeQuestion();
  }
}

let solvedQuestions = new Set();

function updatePracticeStats() {
  let solved = 0;
  solvedQuestions.forEach(key => {
    if (key.startsWith(currentDay + '-')) {
      solved++;
    }
  });
  const total = COURSE_CONFIG.practiceQuestions.length;
  
  const solvedEl = document.getElementById('solvedCount');
  const marksEl = document.getElementById('marksCount');
  if (solvedEl) solvedEl.textContent = solved;
  if (marksEl) marksEl.textContent = solved + '.0';
  
  const totalQEl = document.getElementById('totalQuestions');
  const totalMEl = document.getElementById('totalMarks');
  if (totalQEl) totalQEl.textContent = total;
  if (totalMEl) totalMEl.textContent = total + '.0';
  
  const pct = total > 0 ? (solved / total) * 100 : 0;
  const fill = document.getElementById('statsProgressFill');
  if (fill) fill.style.width = `${pct}%`;
}

function runCurrentQuery() {
  const query = mainEditor.getValue().trim();
  try {
    const result = runSQL(query);
    renderResultTable(result, 'mainOutput');
    logRecQueryExec(query, result);

    // Auto-grade current practice question
    const q = COURSE_CONFIG.practiceQuestions[currentPracticeQ];
    let correct = false;
    if (q) {
      try {
        const refResult = runSQL(q.referenceSql);
        correct = compareResults(refResult, result);
      } catch (e) {
        correct = false;
      }

      if (correct) {
        const solvedKey = `${currentDay}-${q.id}`;
        if (!solvedQuestions.has(solvedKey)) {
          solvedQuestions.add(solvedKey);
          updatePracticeStats();
        }
        // Update label to show correct indicator badge with encouraging compliments
        const label = document.querySelector('#mainOutput .output-label');
        if (label) {
          const compliments = [
            "Spot on!",
            "You nailed it!",
            "Brilliant work!",
            "Awesome job!",
            "Perfect query!",
            "Keep crushing it!"
          ];
          const compliment = compliments[Math.floor(Math.random() * compliments.length)];
          label.innerHTML = `Query Result <span class="correct-badge" style="background: var(--green-glow); color: var(--green); padding: 2px 8px; border-radius: var(--radius-sm); font-size: 0.7rem; margin-left: 8px; font-weight: 700; border: 1px solid rgba(16, 185, 129, 0.3); display: inline-flex; align-items: center; gap: 4px;">✓ Correct! ${compliment}</span>`;
        }
        // Append correct answer banner
        const successBanner = document.createElement('div');
        successBanner.className = 'output-success';
        successBanner.style.marginTop = '8px';
        successBanner.innerHTML = '🎉 Correct Answer! Good job.';
        document.getElementById('mainOutput').appendChild(successBanner);
      }
    }
  } catch (err) {
    const hint = analyzeQueryError(query, err);
    renderError(err.message, hint, 'mainOutput');
  }
}

function clearEditor() {
  mainEditor.setValue('');
  mainEditor.focus();
}

// ═══════════════════════════════════════════════════════════════
// PANEL COLLAPSE / DIVIDER DRAG
// ═══════════════════════════════════════════════════════════════

let leftCollapsed = false;
let rightCollapsed = false;
let savedLeftWidth = '55%';

function updateDividerArrows() {
  const btnL = document.querySelector('.div-toggle-btn--left');
  const btnR = document.querySelector('.div-toggle-btn--right');
  if (!btnL || !btnR) return;

  const isMobile = window.innerWidth <= 768;

  if (isMobile) {
    btnL.textContent = '▲';
    btnL.title = leftCollapsed ? 'Restore code cell' : 'Collapse code cell';
    btnR.textContent = '▼';
    btnR.title = rightCollapsed ? 'Restore notes panel' : 'Collapse notes panel';
  } else {
    btnL.textContent = '◀';
    btnL.title = leftCollapsed ? 'Restore code cell' : 'Toggle code cell';
    btnR.textContent = '▶';
    btnR.title = rightCollapsed ? 'Restore notes panel' : 'Toggle notes panel';
  }
}

function toggleLeftPanel(e) {
  if (e) e.stopPropagation();
  const panelL = document.getElementById('panelLeft');
  const panelR = document.getElementById('panelRight');
  
  leftCollapsed = !leftCollapsed;
  if (leftCollapsed) {
    // Collapse Left (Notes takes full width)
    panelL.classList.add('collapsed');
    
    if (rightCollapsed) {
      rightCollapsed = false;
      panelR.classList.remove('collapsed');
    }
  } else {
    // Restore Left (split view)
    panelL.classList.remove('collapsed');
  }
  
  updateDividerArrows();

  // Smooth layout resize loop for CodeMirror editor as the screen slides
  const start = Date.now();
  const interval = setInterval(() => {
    if (mainEditor) mainEditor.refresh();
    resizeWsCanvas();
    if (Date.now() - start > 450) clearInterval(interval);
  }, 30);
}

function toggleRightPanel(e) {
  if (e) e.stopPropagation();
  const panelL = document.getElementById('panelLeft');
  const panelR = document.getElementById('panelRight');
  
  rightCollapsed = !rightCollapsed;
  if (rightCollapsed) {
    // Collapse Right (Code takes full width)
    panelR.classList.add('collapsed');
    
    if (leftCollapsed) {
      leftCollapsed = false;
      panelL.classList.remove('collapsed');
    }
  } else {
    // Restore Right (split view)
    panelR.classList.remove('collapsed');
  }
  
  updateDividerArrows();

  // Smooth layout resize loop for CodeMirror editor as the screen slides
  const start = Date.now();
  const interval = setInterval(() => {
    if (mainEditor) mainEditor.refresh();
    resizeWsCanvas();
    if (Date.now() - start > 450) clearInterval(interval);
  }, 30);
}

function resetSplitScreen(e) {
  if (e) e.stopPropagation();
  
  const panelL = document.getElementById('panelLeft');
  const panelR = document.getElementById('panelRight');
  
  leftCollapsed = false;
  rightCollapsed = false;
  
  panelL.classList.remove('collapsed');
  panelR.classList.remove('collapsed');
  
  // Clear layout variables and restore default 55/45 split ratios
  savedLeftWidth = '55%';
  panelL.style.flexBasis = '55%';
  panelL.style.minWidth = '';
  panelL.style.borderRightWidth = '';
  panelR.style.flexBasis = '';
  
  updateDividerArrows();

  // Smooth layout resize loop for CodeMirror editor as the screen slides
  const start = Date.now();
  const interval = setInterval(() => {
    if (mainEditor) mainEditor.refresh();
    resizeWsCanvas();
    if (Date.now() - start > 450) clearInterval(interval);
  }, 30);
}

// Draggable divider
(function initDivider() {
  const divider = document.getElementById('divider');
  const left = document.getElementById('panelLeft');
  let dragging = false;

  divider.addEventListener('mousedown', (e) => {
    if (e.target.closest('.div-toggle-btn')) return;
    
    // Auto-restore collapsed panels on drag initiation
    if (leftCollapsed) toggleLeftPanel();
    if (rightCollapsed) toggleRightPanel();
    
    dragging = true;
    divider.classList.add('dragging');
    e.preventDefault();
  });

  document.addEventListener('mousemove', (e) => {
    if (!dragging) return;
    const workspace = document.querySelector('.workspace');
    const rect = workspace.getBoundingClientRect();
    
    if (window.innerWidth > 768) {
      // Horizontal split (desktop)
      const pct = ((e.clientX - rect.left) / rect.width) * 100;
      const clamped = Math.max(30, Math.min(75, pct));
      savedLeftWidth = clamped + '%';
      left.style.flexBasis = savedLeftWidth;
    } else {
      // Vertical split (mobile)
      // Notes is at the top (order: 1), and left panel (code) is at the bottom (order: 3)
      const heightPx = rect.bottom - e.clientY;
      const pct = (heightPx / rect.height) * 100;
      const clamped = Math.max(25, Math.min(70, pct));
      savedLeftWidth = clamped + '%';
      left.style.flexBasis = savedLeftWidth;
    }
    mainEditor.refresh();
    resizeWsCanvas();
  });

  document.addEventListener('mouseup', () => {
    if (dragging) {
      dragging = false;
      divider.classList.remove('dragging');
      resizeWsCanvas();
    }
  });
})();

let resizeWsCanvasRAF = null;
function initSlideContentObserver() {
  const container = document.getElementById('slideContent');
  if (!container) return;
  
  const observer = new ResizeObserver(() => {
    if (resizeWsCanvasRAF) {
      cancelAnimationFrame(resizeWsCanvasRAF);
    }
    resizeWsCanvasRAF = requestAnimationFrame(() => {
      resizeWsCanvas();
      resizeWsCanvasRAF = null;
    });
  });
  observer.observe(container);
}

// ═══════════════════════════════════════════════════════════════
// INITIALIZATION
// ═══════════════════════════════════════════════════════════════

window.addEventListener('DOMContentLoaded', async () => {
  try {
    await initDatabase();
    initMainEditor();
    renderSideSlide();
    initSlideContentObserver();
    resizeWsCanvas();
    renderPracticeQuestion();
    renderSchemaCards();
    setupStudentTakeover();
    setupTimelineDragging();

    // Update stats
    updatePracticeStats();

    // Init IndexedDB and load bookmarks
    await openIDB();
    await loadBookmarks();
    
    // Set initial arrows based on layout size
    updateDividerArrows();

    // Handle daySelect change and load day-specific slide & questions
    document.getElementById('daySelect')?.addEventListener('change', function() {
      if (this.value === 'day04') {
        alert('Day 04 is currently under development.');
        this.value = 'day01';
      }
      
      // Sync indicator badge text
      const badge = document.querySelector('.day-pill-badge');
      if (badge) {
        const dayNum = this.value.replace('day', '');
        badge.textContent = `DAY ${dayNum}`;
      }

      // Sync active slide and topicSelect to match the day
      let targetIdx = 0;
      if (this.value === 'day02') targetIdx = 1;
      if (this.value === 'day03') targetIdx = 2;
      
      currentSlide = targetIdx;
      renderCurrentSlide();
      clearDrawCanvas();
      
      const topicSelect = document.getElementById('topicSelect');
      if (topicSelect) {
        topicSelect.value = targetIdx;
      }
      
      // Load day-specific practice questions
      loadQuestionsForDay(this.value);
    });

    // Populate topicSelect dropdown
    const topicSelect = document.getElementById('topicSelect');
    if (topicSelect) {
      topicSelect.innerHTML = COURSE_CONFIG.slides.map((slide, idx) => {
        const cleanedTitle = slide.title.replace(/^\d+\.\s*/, '');
        return `<option value="${idx}">Topic 0${idx + 1}: ${cleanedTitle}</option>`;
      }).join('');
      topicSelect.value = currentSlide;
    }

    // Initialize custom dropdown overlays
    initCustomDropdowns();


    console.log('Version-3 Scrimba SQL Sandbox initialized successfully.');
  } catch (err) {
    console.error('Initialization error:', err);
    document.getElementById('mainOutput').innerHTML = `<div class="output-label">System Error</div><span class="output-error">Failed to initialize: ${escHtml(err.message)}</span>`;
  }
});

// Handle window resize for canvas
window.addEventListener('resize', () => {
  if (presentOpen) resizeDrawCanvas();
  resizeWsCanvas();
  updateDividerArrows();
});

// ═══════════════════════════════════════════════════════════════
// NEW NAVIGATION & SCORE CARD UTILITIES
// ═══════════════════════════════════════════════════════════════

function prevDay() {
  alert('You are at Day 01, which is the start of the course.');
}

function nextDay() {
  alert('Day 02 and subsequent days are under development. Only Day 01 is active in this version.');
}

function onTopicSelectChange(val) {
  currentSlide = parseInt(val, 10);
  renderCurrentSlide();
  clearDrawCanvas();
  
  // Sync daySelect dropdown value
  const daySelect = document.getElementById('daySelect');
  if (daySelect) {
    let dayVal = 'day01';
    if (currentSlide === 1) dayVal = 'day02';
    if (currentSlide === 2) dayVal = 'day03';
    if (daySelect.value !== dayVal) {
      daySelect.value = dayVal;
      daySelect.dispatchEvent(new Event('change'));
    }
  }
}

function openScoreCard() {
  // If the test has already been completed, open the student takeover review portal
  const hasSub = localStorage.getItem('test_submitted') || testSubmitted;
  if (hasSub) {
    setupStudentTakeover();
    const modal = document.getElementById('testPortalModal');
    if (modal) modal.classList.add('open');
  } else {
    alert(`Practice Score Card:\n\nQuestions Solved: ${solvedQuestions.size} / ${COURSE_CONFIG.practiceQuestions.length}\nMarks Gained: ${solvedQuestions.size}.0 / ${COURSE_CONFIG.practiceQuestions.length}.0\n\nSubmit the test using "Take Test" to grade your formal score.`);
  }
}

function openTestScoreCard() {
  if (testSubmitted) {
    document.getElementById('scorecardOverlay').classList.add('open');
  } else {
    alert('Please submit your test using the "Submit Test" button in the sidebar first to view your graded scorecard.');
  }
}

// ═══════════════════════════════════════════════════════════════
// MODULE 11: VISUAL TIMELINE DRAWER (Removed)
// ═══════════════════════════════════════════════════════════════

let timelineOpen = false;
let timelineSelectedEvent = null;
let playbackAudioBlob = null;

function toggleTimelineDrawer(force) {
  // Stub: visual timeline features removed
}

function updateTimelineView() {
  // Stub: visual timeline features removed
}

function updateTimelinePlayhead() {
  // Stub: visual timeline features removed
}

// Custom dropdown initializer to replace native select inputs with a premium dropdown menu
function initCustomDropdowns() {
  const selects = document.querySelectorAll('.day-picker-pill select');
  selects.forEach(select => {
    select.style.display = 'none';
    const wrapper = select.parentElement;
    
    // Remove old chevron
    wrapper.querySelector('.day-picker-chevron')?.remove();
    
    // Create custom elements if they don't already exist
    let trigger = wrapper.querySelector('.custom-select-trigger');
    if (!trigger) {
      trigger = document.createElement('div');
      trigger.className = 'custom-select-trigger';
      wrapper.appendChild(trigger);
    }
    
    let optionsMenu = wrapper.querySelector('.custom-select-options');
    if (!optionsMenu) {
      optionsMenu = document.createElement('div');
      optionsMenu.className = 'custom-select-options';
      wrapper.appendChild(optionsMenu);
    }
    
    function updateTriggerText() {
      const textSpan = trigger.querySelector('.selected-text');
      if (textSpan) {
        textSpan.textContent = select.options[select.selectedIndex]?.text || '';
      }
    }

    function populateOptions() {
      optionsMenu.innerHTML = '';
      Array.from(select.options).forEach((opt) => {
        const optionItem = document.createElement('div');
        optionItem.className = `custom-select-option${opt.selected ? ' selected' : ''}`;
        optionItem.textContent = opt.text;
        optionItem.dataset.value = opt.value;
        optionItem.addEventListener('click', (e) => {
          e.stopPropagation();
          select.value = opt.value;
          select.dispatchEvent(new Event('change'));
          optionsMenu.classList.remove('open');
          trigger.classList.remove('open');
        });
        optionsMenu.appendChild(optionItem);
      });
      updateTriggerText();
    }
    
    trigger.innerHTML = `
      <span class="selected-text"></span>
      <span class="day-picker-chevron">
        <svg width="8" height="5" viewBox="0 0 8 5" fill="none"><path d="M1 1L4 4L7 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </span>
    `;
    
    populateOptions();
    
    // Click toggle open
    trigger.onclick = (e) => {
      e.stopPropagation();
      const isOpen = optionsMenu.classList.contains('open');
      document.querySelectorAll('.custom-select-options').forEach(menu => {
        menu.classList.remove('open');
        menu.previousElementSibling.classList.remove('open');
      });
      if (!isOpen) {
        optionsMenu.classList.add('open');
        trigger.classList.add('open');
      }
    };
    
    // Listen to changes on the native select
    select.addEventListener('change', () => {
      updateTriggerText();
      optionsMenu.querySelectorAll('.custom-select-option').forEach(el => {
        if (el.dataset.value === select.value) {
          el.classList.add('selected');
        } else {
          el.classList.remove('selected');
        }
      });
    });
    
    // Watch for dynamic updates to child options (e.g. innerHTML changes)
    const observer = new MutationObserver(() => {
      populateOptions();
    });
    observer.observe(select, { childList: true });
    
    // Intercept programmatic select.value updates
    const descriptor = Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, 'value');
    Object.defineProperty(select, 'value', {
      get() {
        return descriptor.get.call(this);
      },
      set(val) {
        descriptor.set.call(this, val);
        updateTriggerText();
        optionsMenu.querySelectorAll('.custom-select-option').forEach(el => {
          if (el.dataset.value === String(val)) {
            el.classList.add('selected');
          } else {
            el.classList.remove('selected');
          }
        });
      }
    });
  });
  
  // Close menu on click outside
  document.addEventListener('click', () => {
    document.querySelectorAll('.custom-select-options').forEach(menu => {
      menu.classList.remove('open');
      menu.previousElementSibling.classList.remove('open');
    });
  });
}

function setupTimelineDragging() {
  // Stub: visual timeline features removed
}

let currentPlayingAudio = null;
let currentPlayingBtn = null;

let isCombinedPlaying = false;
let currentCombinedTime = 0;
let totalCombinedDuration = 0;
let combinedTrackIndex = 0;
let combinedAudios = [];
let combinedTrackDurations = [15.6, 8.8, 20.3, 22.0, 12.0, 12.0, 12.0, 12.0, 18.0, 22.0, 18.0, 18.0, 18.0, 10.0, 12.0, 18.0, 10.0, 10.0, 10.0, 10.0, 10.0, 28.0, 30.0, 35.0, 25.0]; // Hardcoded default fallback
let combinedTracks = [
  { src: 'New_Day1Part1audio01.mp3', target: '#rdbmsIntro', title: 'What is RDBMS?' },
  { src: 'New_Day1Part1audio02.mp3', target: '#whyRdbms', title: 'Why Relational Databases?' },
  { src: 'New_Day1Part1audio03.mp3', target: '#rdbmsProblems', title: 'Three Problems RDBMS Solves' },
  { src: 'New_Day1Part1audio04.mp3', target: '#coreEntities', title: 'Core Structural Entities' },
  { src: 'New_Day1Part1audio07.mp3', target: '#entityDatabase', title: 'Database Entity' },
  { src: 'New_Day1Part1audio06.mp3', target: '#entityTable', title: 'Table Entity' },
  { src: 'New_Day1Part1audio05.mp3', target: '#entityColumn', title: 'Column Entity' },
  { src: 'New_Day1Part1audio08.mp3', target: '#entityRow', title: 'Row Entity' },
  { src: 'New_Day1Part1audio09.mp3', target: '#pkFkKeys', title: 'Primary Key vs. Foreign Key' },
  { src: 'New_Day1Part1audio10.mp3', target: '#pkDetail', title: 'Primary Key' },
  { src: 'New_Day1Part1audio11.mp3', target: '#fkDetail', title: 'Foreign Key' },
  { src: 'New_Day1Part1audio12.mp3', target: '#parentTableDept', title: 'Parent & Child Tables' },
  { src: 'New_Day1Part1audio13.mp3', target: '#sqlDeclarative', title: 'SQL is Declarative' },
  { src: 'New_Day1Part1audio14.mp3', target: '#sqlImperativeVs', title: 'Imperative Code' },
  { src: 'New_Day1Part1audio15.mp3', target: '#sqlDeclarativeVs', title: 'Declarative Code' },
  { src: 'New_Day1Part1audio16.mp3', target: '#sqlSubLanguages', title: 'The Five SQL Sub-Languages' },
  { src: 'New_Day1Part1audio17.mp3', target: '#sqlSubLanguages', title: 'DQL — Data Query Language' },
  { src: 'New_Day1Part1audio18.mp3', target: '#sqlSubLanguages', title: 'DML — Data Manipulation Language' },
  { src: 'New_Day1Part1audio19.mp3', target: '#sqlSubLanguages', title: 'DDL — Data Definition Language' },
  { src: 'New_Day1Part1audio20.mp3', target: '#sqlSubLanguages', title: 'TCL — Transaction Control Language' },
  { src: 'New_Day1Part1audio21.mp3', target: '#sqlSubLanguages', title: 'DCL — Data Control Language' },
  { src: 'New_Day1Part1audio22.mp3', target: '#proTipRdbms', title: 'Pro Tip: Which RDBMS?' },
  { src: 'New_Day1Part1audio23.mp3', target: '#iqReferentialIntegrity', title: 'Interview Q1: Referential Integrity' },
  { src: 'New_Day1Part1audio24.mp3', target: '#iqSqlVsNosql', title: 'Interview Q2: SQL vs NoSQL' },
  { src: 'New_Day1Part1audio25.mp3', target: '#iqCompositePk', title: 'Interview Q3: Primary Key' },
  // ── Practice Questions & Solutions ──
  { src: 'New_Day1Part1Question01.mp3', target: '#questionBar', title: 'Q1: Retrieve all employees', type: 'question', qId: 1 },
  { src: 'New_Day1Part1Question02.mp3', target: '#questionBar', title: 'Q1 Solution: SELECT *', type: 'solution', qId: 1 },
  { src: 'New_Day1Part1Question03.mp3', target: '#questionBar', title: 'Q2: Inspect sqlite_master', type: 'question', qId: 2 }
];

const AUDIO_CDN_BASE = "/Version-3";
let manifest = {};
let activeAudioInstance = null;
let currentGeneration = 0;
let nextTrackPrefetch = null;
let prefetchedForIndex = null;
let prefetchFailed = false;
let hasCompletedFirstGestureBoundPlay = false;

async function loadManifest() {
  if (Object.keys(manifest).length > 0) return;
  try {
    const res = await fetch('/Version-3/manifest.json');
    manifest = await res.json();
    // Re-calculate durations from manifest metadata
    combinedTracks.forEach((t, index) => {
      const trackId = `day01_${t.src.replace('.mp3', '')}`;
      const entry = manifest[trackId];
      if (entry && entry.durationMs) {
        combinedTrackDurations[index] = entry.durationMs / 1000;
      }
    });
    totalCombinedDuration = combinedTrackDurations.reduce((a, b) => a + b, 0);
    updateProgressUI();
  } catch (err) {
    console.log('Using default durations fallback:', err);
    totalCombinedDuration = combinedTrackDurations.reduce((a, b) => a + b, 0);
    updateProgressUI();
  }
}

async function loadTrackEvents(trackId) {
  const entry = manifest[trackId];
  if (!entry || !entry.eventsPath) return null;
  try {
    const res = await fetch(getAudioUrl(entry).replace('.mp3', '.events.json'));
    return await res.json();
  } catch (err) {
    return null;
  }
}

function getAudioUrl(entry) {
  if (!entry || !entry.audioPath) return '';
  if (entry.audioPath.startsWith('http') || entry.audioPath.startsWith('/')) {
    return entry.audioPath;
  }
  return `${AUDIO_CDN_BASE}/${entry.audioPath}`;
}

async function loadAndPlayTrack(index, targetTime = 0) {
  const myGeneration = ++currentGeneration;

  if (activeAudioInstance) {
    activeAudioInstance.pause();
    activeAudioInstance.src = "";
    activeAudioInstance.load();
    activeAudioInstance = null;
  }

  await loadManifest();

  combinedTrackIndex = index;
  const track = combinedTracks[index];
  const trackId = `day01_${track.src.replace('.mp3', '')}`;
  const entry = manifest[trackId] || { audioPath: track.src };
  const url = getAudioUrl(entry);

  let audio;
  if (nextTrackPrefetch && prefetchedForIndex === index && !prefetchFailed) {
    audio = nextTrackPrefetch;
  } else {
    audio = new Audio(url);
    audio.preload = "auto";
  }
  nextTrackPrefetch = null;
  prefetchedForIndex = null;
  prefetchFailed = false;
  activeAudioInstance = audio;

  if (targetTime > 0) {
    audio.currentTime = targetTime;
  }

  // Load events lazily
  const events = await loadTrackEvents(trackId);

  audio.addEventListener('ended', () => {
    if (myGeneration !== currentGeneration) return;
    onNarrationSegmentEnded(index, events);
  });

  audio.addEventListener('timeupdate', () => {
    if (myGeneration !== currentGeneration) return;
    
    // Calculate cumulative current time
    let elapsed = 0;
    for (let i = 0; i < combinedTrackIndex; i++) {
      elapsed += combinedTrackDurations[i] || 0;
    }
    elapsed += audio.currentTime;
    
    currentCombinedTime = elapsed;
    updateProgressUI();
    maybePrefetchNext(audio, index);
  });

  audio.addEventListener('error', () => {
    if (myGeneration !== currentGeneration) return;
    retryOrShowError(index, myGeneration, 'network');
  });

  // Slide navigation, typewriter, and output table scrolls trigger JIT at playback start
  if (track.type === 'question') {
    const targetQIdx = COURSE_CONFIG.practiceQuestions.findIndex(q => q.id === track.qId);
    if (targetQIdx !== -1 && targetQIdx !== currentPracticeQ) {
      clearOutputSection();
      currentPracticeQ = targetQIdx;
      renderPracticeQuestion();
    }
    const bar = document.getElementById('questionBar');
    if (bar) bar.classList.add('question-playing');
    const slideContent = document.getElementById('slideContent');
    if (slideContent) slideContent.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Auto switch to SQL Sandbox tab on mobile
    setMobileTab('practice');

  } else if (track.type === 'solution') {
    const targetQIdx = COURSE_CONFIG.practiceQuestions.findIndex(q => q.id === track.qId);
    if (targetQIdx !== -1) {
      currentPracticeQ = targetQIdx;
      renderPracticeQuestion();
    }
    const solMap = questionSolutionMap[currentDay] || questionSolutionMap['day01'];
    const solEntry = solMap ? solMap[track.qId] : null;
    if (solEntry) {
      if (mainEditor) { mainEditor.setValue(''); mainEditor.focus(); }
      cancelTypewriter();
      const startDelay = (solEntry.startAt || 1.5) * 1000;
      const charInterval = solEntry.charInterval || 70;
      const chars = solEntry.code.split('');
      let typed = '';
      chars.forEach((char, i) => {
        const t = setTimeout(() => {
          typed += char;
          if (mainEditor) {
            mainEditor.setValue(typed);
            const lastLine = mainEditor.lastLine();
            mainEditor.setCursor({ line: lastLine, ch: mainEditor.getLine(lastLine).length });
          }
          if (i === chars.length - 1) {
            setTimeout(() => {
              runCurrentQuery();
              setTimeout(() => {
                const outputEl = document.getElementById('mainOutput');
                if (outputEl) outputEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
              }, 350);
            }, 400);
          }
        }, startDelay + i * charInterval);
        typewriterTimers.push(t);
      });
      // Table scroll at 13.5s
      let tableScrollInterval = null;
      const tst = setTimeout(() => {
        const outputEl = document.getElementById('mainOutput');
        if (!outputEl) return;
        tableScrollInterval = setInterval(() => {
          if (outputEl.scrollTop + outputEl.clientHeight >= outputEl.scrollHeight - 2) {
            clearInterval(tableScrollInterval);
          } else { outputEl.scrollTop += 1; }
        }, 40);
      }, 13500);
      typewriterTimers.push(tst);
      
      // Clean up table scroll when active track ends
      audio.addEventListener('ended', () => { if (tableScrollInterval) clearInterval(tableScrollInterval); }, { once: true });
    }

    // Auto switch to SQL Sandbox tab on mobile
    setMobileTab('practice');
    
  } else {
    const bar = document.getElementById('questionBar');
    if (bar) bar.classList.remove('question-playing');
    scrollToTarget(track.target);

    // Auto switch to Lesson Theory tab on mobile
    setMobileTab('theory');
  }

  // Setup Media Session API
  if ('mediaSession' in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: track.title || 'Manodemy Slide Narration',
      artist: 'Manodemy Narrator',
      album: 'Day 01 Relational Databases'
    });
    navigator.mediaSession.setActionHandler('play', () => {
      if (activeAudioInstance) {
        activeAudioInstance.play();
        updatePlayButtonStates(true);
      }
    });
    navigator.mediaSession.setActionHandler('pause', () => {
      if (activeAudioInstance) {
        activeAudioInstance.pause();
        updatePlayButtonStates(false);
      }
    });
    navigator.mediaSession.setActionHandler('previoustrack', () => {
      if (combinedTrackIndex > 0) {
        loadAndPlayTrack(combinedTrackIndex - 1);
      }
    });
    navigator.mediaSession.setActionHandler('nexttrack', () => {
      if (combinedTrackIndex < combinedTracks.length - 1) {
        loadAndPlayTrack(combinedTrackIndex + 1);
      }
    });
  }

  audio.play()
    .then(() => {
      hasCompletedFirstGestureBoundPlay = true;
      updatePlayButtonStates(true);
    })
    .catch((err) => {
      console.log('Play rejected:', err);
      if (audio.error) {
        retryOrShowError(index, myGeneration, 'network');
      } else {
        showTapToPlayFallback(index);
      }
    });
}

function maybePrefetchNext(audio, currentIndex) {
  const remaining = audio.duration - audio.currentTime;
  const hasNext = currentIndex < combinedTracks.length - 1;
  if (hasNext && remaining < 5 && prefetchedForIndex !== currentIndex + 1) {
    const nextTrack = combinedTracks[currentIndex + 1];
    const trackId = `day01_${nextTrack.src.replace('.mp3', '')}`;
    const nextEntry = manifest[trackId] || { audioPath: nextTrack.src };
    const url = getAudioUrl(nextEntry);

    const prefetch = new Audio(url);
    prefetch.preload = "auto";

    prefetch.addEventListener('error', () => {
      if (prefetchedForIndex === currentIndex + 1) {
        prefetchFailed = true;
      }
    });

    nextTrackPrefetch = prefetch;
    prefetchedForIndex = currentIndex + 1;
    prefetchFailed = false;

    // Prefetch events
    loadTrackEvents(trackId);
  }
}

function retryOrShowError(index, generation, reason = 'network', attempt = 1) {
  const MAX_ATTEMPTS = 3;
  if (reason !== 'network' && !hasCompletedFirstGestureBoundPlay) {
    showTapToPlayFallback(index);
    return;
  }
  if (attempt > MAX_ATTEMPTS) {
    console.log("Audio loading failed after retries.");
    return;
  }
  setTimeout(() => {
    if (generation !== currentGeneration) return;
    loadAndPlayTrack(index);
  }, attempt * 800);
}

function showTapToPlayFallback(index) {
  let overlay = document.getElementById('gestureFallbackOverlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'gestureFallbackOverlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.background = 'rgba(6, 9, 19, 0.9)';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.zIndex = '9999';
    overlay.innerHTML = `
      <div style="background: #111424; border: 1px solid #2a2e45; border-radius: 12px; padding: 24px; text-align: center; max-width: 320px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
        <div style="font-size: 32px; margin-bottom: 12px;">🔊</div>
        <h3 style="color: #fff; font-family: Inter, sans-serif; margin: 0 0 8px 0; font-size: 18px;">Narrator Audio Ready</h3>
        <p style="color: #8c92ac; font-family: Inter, sans-serif; font-size: 13px; line-height: 1.5; margin: 0 0 20px 0;">Tap below to enable narration playback on this device.</p>
        <button id="gestureFallbackBtn" style="background: #00e6f6; color: #060913; border: none; border-radius: 6px; padding: 10px 20px; font-family: Inter, sans-serif; font-weight: 600; font-size: 14px; cursor: pointer; width: 100%; transition: opacity 0.2s;">Enable Audio</button>
      </div>
    `;
    document.body.appendChild(overlay);
  }
  document.getElementById('gestureFallbackBtn').onclick = () => {
    overlay.remove();
    loadAndPlayTrack(index);
  };
}

function toggleCombinedPlayback() {
  if (isCombinedPlaying) {
    pauseCombinedPlayback();
  } else {
    playCombinedPlayback();
  }
}

function updateProgressUI() {
  const seekBar = document.getElementById('seekBar');
  const playbackTime = document.getElementById('playbackTime');
  if (seekBar) {
    seekBar.max = totalCombinedDuration || 100;
    seekBar.value = currentCombinedTime;
  }
  if (playbackTime) {
    playbackTime.textContent = `${formatTime(currentCombinedTime)} / ${formatTime(totalCombinedDuration)}`;
  }
}

function formatTime(secs) {
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}

function onNarrationSegmentEnded(index, events) {
  if (index !== combinedTrackIndex) return;

  if (combinedTrackIndex < combinedTracks.length - 1) {
    combinedTrackIndex++;
    loadAndPlayTrack(combinedTrackIndex);
  } else {
    // All tracks complete — reset
    isCombinedPlaying = false;
    combinedTrackIndex = 0;
    currentCombinedTime = 0;
    updatePlayButtonStates(false);
    updateProgressUI();
    cancelTypewriter();
    // Remove question bar highlight
    const bar = document.getElementById('questionBar');
    if (bar) bar.classList.remove('question-playing');
  }
}

async function seekCombinedPlayback(val) {
  const targetTime = parseFloat(val);
  await loadManifest();

  // Find which track this targetTime belongs to
  let elapsed = 0;
  let trackIdx = 0;
  let localOffset = targetTime;
  
  for (let i = 0; i < combinedTrackDurations.length; i++) {
    const dur = combinedTrackDurations[i];
    if (targetTime < elapsed + dur) {
      trackIdx = i;
      localOffset = targetTime - elapsed;
      break;
    }
    elapsed += dur;
    if (i === combinedTrackDurations.length - 1) {
      trackIdx = i;
      localOffset = dur - 0.1;
    }
  }

  // Load or seek the track
  if (combinedTrackIndex !== trackIdx) {
    await loadAndPlayTrack(trackIdx, localOffset);
  } else if (activeAudioInstance) {
    activeAudioInstance.currentTime = localOffset;
  }
  
  currentCombinedTime = targetTime;
  updateProgressUI();
}

function scrollToTarget(selector) {
  const container = document.getElementById('slideContent');
  const targetEl = container ? container.querySelector(selector) : null;
  if (targetEl && container) {
    const containerRect = container.getBoundingClientRect();
    const targetRect = targetEl.getBoundingClientRect();
    const relativeTop = targetRect.top - containerRect.top + container.scrollTop;
    container.scrollTo({
      top: relativeTop - 15,
      behavior: 'smooth'
    });
  }
}

function playAudio(src, btn) {
  // Find track index
  const idx = combinedTracks.findIndex(t => t.src === src);
  if (idx === -1) {
    const audioSrc = src.startsWith('http') || src.startsWith('/') ? src : `/Version-3/${src}`;
    if (currentPlayingAudio && currentPlayingAudio.src.endsWith(src)) {
      if (currentPlayingAudio.paused) {
        currentPlayingAudio.play();
        btn.innerHTML = `<svg class="pause-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`;
        btn.classList.add('playing');
      } else {
        currentPlayingAudio.pause();
        btn.innerHTML = `<svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`;
        btn.classList.remove('playing');
      }
    } else {
      if (currentPlayingAudio) {
        currentPlayingAudio.pause();
        if (currentPlayingBtn) {
          currentPlayingBtn.innerHTML = `<svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`;
          currentPlayingBtn.classList.remove('playing');
        }
      }
      currentPlayingAudio = new Audio(audioSrc);
      currentPlayingBtn = btn;
      currentPlayingAudio.play();
      btn.innerHTML = `<svg class="pause-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`;
      btn.classList.add('playing');
      currentPlayingAudio.onended = () => {
        btn.innerHTML = `<svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`;
        btn.classList.remove('playing');
        currentPlayingAudio = null;
        currentPlayingBtn = null;
      };
    }
    return;
  }
  
  if (combinedTrackIndex === idx) {
    toggleCombinedPlayback();
  } else {
    loadAndPlayTrack(idx);
  }
}

async function syncCombinedToTrack(srcFilename) {
  const idx = combinedTracks.findIndex(t => t.src === srcFilename);
  if (idx === -1) return null;
  await loadAndPlayTrack(idx);
  return activeAudioInstance;
}

// Dynamic mobile tab toggle
function setMobileTab(tab) {
  const container = document.getElementById('workspaceContainer');
  const btnTheory = document.getElementById('tabBtnTheory');
  const btnPractice = document.getElementById('tabBtnPractice');
  
  if (!container) return;
  
  if (tab === 'theory') {
    container.classList.remove('mobile-show-practice');
    container.classList.add('mobile-show-theory');
    if (btnTheory) btnTheory.classList.add('active');
    if (btnPractice) btnPractice.classList.remove('active');
  } else if (tab === 'practice') {
    container.classList.remove('mobile-show-theory');
    container.classList.add('mobile-show-practice');
    if (btnPractice) btnPractice.classList.add('active');
    if (btnTheory) btnTheory.classList.remove('active');
    
    // Refresh CodeMirror when visual display toggles
    setTimeout(() => {
      if (typeof mainEditor !== 'undefined' && mainEditor) {
        mainEditor.refresh();
      }
    }, 50);
  }
}
