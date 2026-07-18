// Day 02 — Basic Retrieval: SELECT, FROM, DISTINCT, Aliases, LIMIT, ORDER BY
if (!window.COURSE_CONTENT) window.COURSE_CONTENT = {};
window.COURSE_CONTENT['day02'] = {
  "day": 2,
  "title": "Basic Retrieval",
  "db": "retail",
  "emoji": "💾",
  "slides": [
    {
      "title": "SELECT & FROM — Reading Data from a Table",
      "duration": "0:00",
      "html": `
        <h2>💾 Basic Retrieval: SELECT & FROM</h2>

        <div class="slide-section">
          <h3>01. The Anatomy of a SELECT Statement</h3>
          <p>Every SQL query begins with <code>SELECT</code> — the command that tells the database engine <em>what data to return</em>. The <code>FROM</code> clause specifies <em>which table</em> to read from. Together they form the minimum viable SQL query.</p>

          <pre><code>-- Retrieve every column from the employees table
SELECT *
FROM   employees;

-- Retrieve specific columns only (preferred in production)
SELECT first_name, last_name, salary
FROM   employees;</code></pre>

          <div class="info-box">
            ℹ️ <strong>SELECT * vs. Named Columns:</strong> <code>SELECT *</code> is convenient for exploration but costly in production — it forces the engine to read every column from disk, blocking index-only scans and increasing network payload. Always prefer named columns in application queries.
          </div>
        </div>

        <div class="slide-section">
          <h3>02. Column Aliases — Renaming Output Headers</h3>
          <p>The <code>AS</code> keyword assigns a temporary label to a column or expression in the result set. Aliases appear in the output header and can be used in <code>ORDER BY</code>, but <strong>not</strong> in <code>WHERE</code> (evaluated before SELECT).</p>

          <pre><code>SELECT first_name                   AS "First Name",
       last_name                    AS "Last Name",
       salary * 1.1                 AS revised_salary,
       salary - 50000               AS salary_above_base
FROM   employees;</code></pre>

          <div class="vs-block">
            <div class="vs-card">
              <h4>✅ Valid Alias Forms</h4>
              <ul>
                <li><code>column AS alias</code> — Standard (preferred)</li>
                <li><code>column alias</code> — Omitting AS (works in most engines)</li>
                <li><code>column AS "alias with spaces"</code> — Double-quotes for spaces</li>
              </ul>
            </div>
            <div class="vs-card">
              <h4>⚠️ Alias Scope Rules</h4>
              <ul>
                <li>Alias is available in <code>ORDER BY</code> ✅</li>
                <li>Alias is <strong>NOT</strong> available in <code>WHERE</code> ❌</li>
                <li>Alias is <strong>NOT</strong> available in <code>HAVING</code> ❌</li>
                <li>Alias is <strong>NOT</strong> available in <code>GROUP BY</code> ❌ (most engines)</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="slide-section">
          <h3>03. DISTINCT — Removing Duplicate Rows</h3>
          <p><code>DISTINCT</code> applies <em>after</em> the result set is constructed and eliminates duplicate rows based on the selected columns. It operates on the combination of all selected columns — not just one.</p>

          <pre><code>-- All unique regions (deduplicates region column)
SELECT DISTINCT region
FROM   customers;

-- Unique (region, job_title) combinations
SELECT DISTINCT department_id, job_title
FROM   employees
ORDER BY department_id;</code></pre>

          <div class="warn-box">
            ⚠️ <strong>Performance Warning:</strong> <code>DISTINCT</code> requires a sort or hash operation to compare all rows. On large tables this is expensive. Before using <code>DISTINCT</code> ask yourself: "Why do I have duplicates?" — the root cause (e.g. a missing join condition) is often a better fix.
          </div>
        </div>

        <div class="slide-section">
          <h3>04. ORDER BY — Sorting Results</h3>
          <p><code>ORDER BY</code> is evaluated <em>last</em> in SQL's logical execution order (just before <code>LIMIT</code>). You can sort by column names, column positions, or aliases. Multiple columns create a hierarchical sort.</p>

          <pre><code>-- Single column sort (ascending is default)
SELECT first_name, salary
FROM   employees
ORDER BY salary DESC;

-- Multi-column sort: primary on dept, secondary on salary
SELECT first_name, department_id, salary
FROM   employees
ORDER BY department_id ASC, salary DESC;

-- Sort by alias
SELECT first_name, salary * 1.1 AS new_salary
FROM   employees
ORDER BY new_salary DESC;</code></pre>

          <div class="pro-tip-box">
            💡 <strong>Pro Tip — NULL in ORDER BY:</strong> In most databases, <code>NULL</code> values sort as either the lowest or highest value depending on the engine. SQLite treats <code>NULL</code> as less than any other value, so <code>ORDER BY col ASC</code> puts NULLs first. Use <code>ORDER BY col DESC NULLS LAST</code> in PostgreSQL to control this explicitly.
          </div>
        </div>
          <h3>05. LIMIT — Restricting Row Count</h3>
          <p><code>LIMIT</code> (SQLite/MySQL/PostgreSQL) or <code>TOP</code> (SQL Server) restricts how many rows are returned. It is applied <em>after</em> filtering, grouping, and sorting — meaning it returns the first N rows <em>of the sorted result</em>.</p>

          <pre><code>-- Top 5 highest-paid employees
SELECT first_name, last_name, salary
FROM   employees
ORDER BY salary DESC
LIMIT  5;

-- Skip first 5 rows, return next 5 (pagination)
SELECT first_name, last_name, salary
FROM   employees
ORDER BY salary DESC
LIMIT  5 OFFSET 5;</code></pre>
        </div>

        <div class="slide-section">
          <h3>06. The Logical SQL Execution Order</h3>
          <p>Understanding <em>why</em> aliases work in some clauses but not others requires understanding the order in which SQL engines logically process a query. This is one of the most-tested SQL interview topics:</p>

          <div class="sof-wrap" id="day02LogicalOrder">
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
              
              .sof-node{
                width:fit-content;
                max-width:92%;
                margin:0 auto;
                background:rgba(20,29,51,0.95);
                border:1px solid rgba(255,255,255,0.07);
                border-left:3.5px solid #64748b;
                border-radius:6px;
                padding:6px 16px;
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
              
              .sof-conn{position:relative;height:20px;width:100%;display:flex;justify-content:center;align-items:flex-start;overflow:visible;animation:sofFadeIn 0.3s ease var(--d,0.5s) both}
              .sof-conn svg{width:20px;height:20px;overflow:visible}
              .sof-stem{stroke:rgba(100,116,139,0.55);stroke-width:1.4;stroke-linecap:round;animation:sofStemColorW 0.4s ease 4.5s forwards}
              .sof-ring{fill:rgba(9,15,28,0.98);stroke:rgba(100,116,139,0.55);stroke-width:1.3;animation:sofRingColorW 0.4s ease 4.5s forwards}
              .sof-chev{stroke:#64748b;stroke-width:1.3;stroke-linecap:round;stroke-linejoin:round;fill:none;animation:sofChevColorW 0.4s ease 4.5s forwards}
              
              .sof-col--exec .sof-stem{animation-name:sofStemColorE}
              .sof-col--exec .sof-ring{animation-name:sofRingColorE}
              .sof-col--exec .sof-chev{animation-name:sofChevColorE}
              
              .sof-dot{transform:translateY(0);transform-box:fill-box;transform-origin:center top;animation:sofDotTravel 1.35s cubic-bezier(0.4,0,0.6,1) var(--dd,4.5s) infinite}
              .sof-col--write .sof-dot{fill:#38bdf8;filter:drop-shadow(0 0 2.5px rgba(56,189,248,0.9))}
              .sof-col--exec .sof-dot{fill:#34d399;filter:drop-shadow(0 0 2.5px rgba(52,211,153,0.9))}
              
              .sof-conn[data-di="0"] .sof-dot{--dd:4.50s}
              .sof-conn[data-di="1"] .sof-dot{--dd:4.68s}
              .sof-conn[data-di="2"] .sof-dot{--dd:4.86s}
              .sof-conn[data-di="3"] .sof-dot{--dd:5.04s}
              .sof-conn[data-di="4"] .sof-dot{--dd:5.22s}
              .sof-conn[data-di="5"] .sof-dot{--dd:5.40s}
              .sof-conn[data-di="6"] .sof-dot{--dd:5.58s}
              
              @media(max-width:500px){.sof-grid{grid-template-columns:1fr;gap:12px}.sof-node{font-size:0.6rem;padding:6px 8px}.sof-hdr-title{font-size:0.6rem}}
              
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
        </div>

        <!-- ── Interview Q&A Consolidated Section ── -->
        <div class="slide-section">
          <div class="interview-box">
            <h4>🎯 Interview Insights &amp; Q&amp;A</h4>
            
            <div style="margin-bottom: 14px;">
              <p><strong>Q: What is the difference between LIMIT and TOP?</strong></p>
              <p><em>A: Both restrict row count. <code>LIMIT</code> is the ANSI-preferred syntax used by MySQL, PostgreSQL, and SQLite; it goes at the end of the query and supports <code>OFFSET</code> for pagination. <code>TOP n</code> is SQL Server / MS Access syntax; it goes immediately after <code>SELECT</code> and uses <code>FETCH NEXT n ROWS ONLY</code> for pagination in modern T-SQL.</em></p>
            </div>

            <div style="margin-bottom: 14px;">
              <p><strong>Q: Why can't column aliases defined in SELECT be referenced in the WHERE clause?</strong></p>
              <p><em>A: Because of SQL's logical execution order — <code>WHERE</code> (step 2) is evaluated BEFORE <code>SELECT</code> (step 5). When <code>WHERE</code> filters rows, column aliases do not exist yet. However, <code>ORDER BY</code> (step 7) evaluates AFTER <code>SELECT</code>, so aliases ARE valid in <code>ORDER BY</code>.</em></p>
            </div>

            <div>
              <p><strong>Q: What is the performance impact of SELECT * vs selecting named columns?</strong></p>
              <p><em>A: <code>SELECT *</code> forces the database engine to read every column from disk, blocking index-only scans, polluting the buffer pool cache, and increasing network payload. Explicitly specifying named columns allows query optimizers to leverage covering indexes and read minimal data.</em></p>
            </div>
          </div>
        </div>
      `
    }
  ],
  "practiceQuestions": [
    {
      "id": 1,
      "prompt": "<strong>Task: Product Catalog</strong><br/>Retrieve the <code>name</code>, <code>unit_price</code>, and <code>stock_qty</code> of all products, sorted by <code>unit_price</code> descending.",
      "referenceSql": "SELECT name, unit_price, stock_qty FROM products ORDER BY unit_price DESC;"
    },
    {
      "id": 2,
      "prompt": "<strong>Task: Top 5 Earners</strong><br/>Retrieve the <code>first_name</code>, <code>last_name</code>, and <code>salary</code> of the top 5 highest-paid employees.",
      "referenceSql": "SELECT first_name, last_name, salary FROM employees ORDER BY salary DESC LIMIT 5;"
    },
    {
      "id": 3,
      "prompt": "<strong>Task: Distinct Regions</strong><br/>Retrieve a unique list of <code>region</code> values from the <code>customers</code> table.",
      "referenceSql": "SELECT DISTINCT region FROM customers;"
    },
    {
      "id": 4,
      "prompt": "<strong>Task: Salary with Alias</strong><br/>Retrieve <code>first_name</code> and <code>salary</code> from <code>employees</code>. Add an alias <code>annual_salary</code> for the salary column. Sort alphabetically by first_name.",
      "referenceSql": "SELECT first_name, salary AS annual_salary FROM employees ORDER BY first_name ASC;"
    },
    {
      "id": 5,
      "prompt": "<strong>Task: Customer Snapshot</strong><br/>Retrieve all columns from the <code>customers</code> table, showing only the first 5 rows.",
      "referenceSql": "SELECT * FROM customers LIMIT 5;"
    },
    {
      "id": 6,
      "prompt": "<strong>Task: Profit Margin Column</strong><br/>Retrieve <code>name</code>, <code>unit_price</code>, <code>cost_price</code>, and a computed column called <code>profit</code> (unit_price minus cost_price) from <code>products</code>. Sort by profit descending.",
      "referenceSql": "SELECT name, unit_price, cost_price, unit_price - cost_price AS profit FROM products ORDER BY profit DESC;"
    }
  ],
  "testQuestions": [
    { "id": 1, "prompt": "Retrieve all columns from the <code>employees</code> table.", "ref": "SELECT * FROM employees;" },
    { "id": 2, "prompt": "Retrieve only <code>first_name</code> and <code>salary</code> from <code>employees</code>.", "ref": "SELECT first_name, salary FROM employees;" },
    { "id": 3, "prompt": "Retrieve all unique <code>job_title</code> values from <code>employees</code>.", "ref": "SELECT DISTINCT job_title FROM employees;" },
    { "id": 4, "prompt": "Retrieve <code>first_name</code>, <code>last_name</code>, and <code>salary</code> from <code>employees</code>, sorted by <code>salary</code> ascending.", "ref": "SELECT first_name, last_name, salary FROM employees ORDER BY salary ASC;" },
    { "id": 5, "prompt": "Retrieve the top 3 highest-paid employees (first_name, salary).", "ref": "SELECT first_name, salary FROM employees ORDER BY salary DESC LIMIT 3;" },
    { "id": 6, "prompt": "Retrieve <code>name</code> and <code>unit_price</code> from <code>products</code>, aliasing <code>unit_price</code> as <code>price</code>.", "ref": "SELECT name, unit_price AS price FROM products;" },
    { "id": 7, "prompt": "Retrieve all columns from <code>orders</code>, showing only 5 rows.", "ref": "SELECT * FROM orders LIMIT 5;" },
    { "id": 8, "prompt": "Retrieve unique <code>region</code> values from <code>customers</code>, sorted alphabetically.", "ref": "SELECT DISTINCT region FROM customers ORDER BY region ASC;" },
    { "id": 9, "prompt": "Retrieve <code>first_name</code>, <code>last_name</code>, and <code>department_id</code> from <code>employees</code>, sorted by <code>department_id</code> ASC then <code>last_name</code> ASC.", "ref": "SELECT first_name, last_name, department_id FROM employees ORDER BY department_id ASC, last_name ASC;" },
    { "id": 10, "prompt": "Retrieve <code>product_id</code>, <code>name</code>, and a computed column <code>profit</code> (unit_price minus cost_price) from <code>products</code>.", "ref": "SELECT product_id, name, unit_price - cost_price AS profit FROM products;" },
    { "id": 11, "prompt": "Retrieve all columns from <code>products</code>, ordered by <code>stock_qty</code> descending.", "ref": "SELECT * FROM products ORDER BY stock_qty DESC;" },
    { "id": 12, "prompt": "Retrieve <code>first_name</code> and <code>salary</code> from <code>employees</code>. Alias salary as <code>monthly_pay</code> and order by <code>monthly_pay</code> descending.", "ref": "SELECT first_name, salary AS monthly_pay FROM employees ORDER BY monthly_pay DESC;" },
    { "id": 13, "prompt": "Retrieve unique <code>department_id</code> values from <code>employees</code>.", "ref": "SELECT DISTINCT department_id FROM employees;" },
    { "id": 14, "prompt": "Retrieve all columns from <code>customers</code> ordered by <code>signup_date</code> ascending.", "ref": "SELECT * FROM customers ORDER BY signup_date ASC;" },
    { "id": 15, "prompt": "Retrieve <code>order_id</code>, <code>total_amount</code>, and <code>status</code> from <code>orders</code>, showing the 5 most recent orders by <code>order_date</code>.", "ref": "SELECT order_id, total_amount, status FROM orders ORDER BY order_date DESC LIMIT 5;" },
    { "id": 16, "prompt": "Retrieve <code>first_name</code>, <code>last_name</code>, and <code>email</code> from <code>employees</code>, sorted alphabetically by <code>last_name</code>.", "ref": "SELECT first_name, last_name, email FROM employees ORDER BY last_name ASC;" },
    { "id": 17, "prompt": "Retrieve unique combinations of <code>department_id</code> and <code>is_active</code> from <code>employees</code>.", "ref": "SELECT DISTINCT department_id, is_active FROM employees;" },
    { "id": 18, "prompt": "Retrieve <code>name</code>, <code>unit_price</code>, and <code>cost_price</code> from <code>products</code>. Add a column <code>margin_pct</code> computing <code>(unit_price - cost_price) * 100 / unit_price</code>.", "ref": "SELECT name, unit_price, cost_price, (unit_price - cost_price) * 100 / unit_price AS margin_pct FROM products;" },
    { "id": 19, "prompt": "Retrieve rows 6 through 10 from <code>employees</code> when sorted by <code>employee_id</code> (use LIMIT and OFFSET).", "ref": "SELECT * FROM employees ORDER BY employee_id LIMIT 5 OFFSET 5;" },
    { "id": 20, "prompt": "Retrieve <code>customer_id</code>, <code>first_name</code>, and <code>region</code> from <code>customers</code> sorted by <code>region</code> ASC then <code>first_name</code> ASC.", "ref": "SELECT customer_id, first_name, region FROM customers ORDER BY region ASC, first_name ASC;" },
    { "id": 21, "prompt": "Retrieve all columns from <code>order_items</code>, limited to 5 rows.", "ref": "SELECT * FROM order_items LIMIT 5;" },
    { "id": 22, "prompt": "Retrieve <code>first_name</code>, <code>salary</code>, and a column <code>tax</code> equal to <code>salary * 0.2</code> from <code>employees</code>.", "ref": "SELECT first_name, salary, salary * 0.2 AS tax FROM employees;" },
    { "id": 23, "prompt": "Retrieve unique <code>status</code> values from <code>orders</code>.", "ref": "SELECT DISTINCT status FROM orders;" },
    { "id": 24, "prompt": "Retrieve <code>product_id</code>, <code>name</code>, and <code>unit_price</code> from <code>products</code>, sorted by <code>unit_price</code> ASC, showing only the 3 cheapest.", "ref": "SELECT product_id, name, unit_price FROM products ORDER BY unit_price ASC LIMIT 3;" },
    { "id": 25, "prompt": "Retrieve <code>employee_id</code>, <code>first_name</code>, <code>last_name</code>, and <code>hire_date</code> from <code>employees</code>, sorted by <code>hire_date</code> descending (most recently hired first).", "ref": "SELECT employee_id, first_name, last_name, hire_date FROM employees ORDER BY hire_date DESC;" }
  ],
  "topics": [
    { "id": "topic-1", "label": "Topic 1: SELECT, FROM & Basic Retrieval", "recordingKey": null }
  ]
};
