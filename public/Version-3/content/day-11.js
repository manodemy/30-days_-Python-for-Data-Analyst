if (!window.COURSE_CONTENT) window.COURSE_CONTENT = {};
window.COURSE_CONTENT['day11'] = {
  "day": 11,
  "title": "Advanced Joins & Self-Joins",
  "db": "retail",
  "emoji": "🔄",
  "slides": [
    {
      "title": "Advanced Joins — Self-Joins, Cross Joins & Non-Equi Joins",
      "duration": "9:30",
      "html": "<h2>🔄 Advanced Joins — Self-Joins, Cross Joins &amp; Non-Equi Joins</h2>\n\n        <!-- ── Section 01: Self-Joins ── -->\n        <div class=\"slide-section\" id=\"day11SelfJoinSection\">\n          <h3 class=\"heading-with-audio\" id=\"day11SelfJoin\">\n            01. What Are Self-Joins?\n          </h3>\n          <p>A <strong>Self-Join</strong> is simply a regular join in which a table is joined to <strong>itself</strong>. It is commonly used when rows within the same table have hierarchical, parent-child, or peer relationships with other rows in that table.</p>\n        </div>\n\n        <div class=\"slide-section\" id=\"day11RecursiveSection\">\n          <div class=\"info-box\" id=\"day11Recursive\">\n            <div style=\"display: flex; align-items: center; gap: 8px; margin-bottom: 4px; width: 100%;\">\n              <strong style=\"color:var(--ink-teal); flex: 1;\">👑 Hierarchical Relationships:</strong>\n            </div>\n            <ul style=\"margin: 4px 0 0 16px; padding: 0; font-size: 0.88rem; line-height: 1.6;\">\n              <li><strong>Employees &amp; Managers:</strong> <code>employees.manager_id</code> ➔ <code>employees.employee_id</code></li>\n              <li><strong>Category Taxonomies:</strong> <code>categories.parent_id</code> ➔ <code>categories.id</code></li>\n              <li><strong>Peer Matching:</strong> Comparing products or colleagues in the same group.</li>\n            </ul>\n          </div>\n        </div>\n\n        <div class=\"slide-section\" id=\"day11AliasesSection\">\n          <div class=\"info-box\" id=\"day11Aliases\">\n            <div style=\"display: flex; align-items: center; gap: 8px; margin-bottom: 4px; width: 100%;\">\n              <strong style=\"color:var(--ink-teal); flex: 1;\">🏷️ Mandatory Aliases:</strong>\n            </div>\n            <p style=\"margin: 0;\">Because you are querying the same table twice, you <strong>must</strong> give each instance a unique alias (e.g., <code>emp</code> and <code>mgr</code>) so the SQL compiler knows which copy of the table each column belongs to.</p>\n          </div>\n        </div>\n\n        <div class=\"slide-section\" id=\"day11HierarchyExamplesSection\">\n          <div class=\"terminal-card\" id=\"day11HierarchyExamples\">\n            <div class=\"terminal-header\">\n              <span class=\"terminal-title\">Query 1 — Employee to Manager Hierarchy (Self-Join)</span>\n            </div>\n            <div class=\"terminal-body\">\n              <pre><code>SELECT emp.first_name AS employee_name,\n       emp.job_title,\n       COALESCE(mgr.first_name || ' ' || mgr.last_name, 'Top Executive') AS manager_name\nFROM   employees emp\nLEFT JOIN employees mgr\n   ON  emp.manager_id = mgr.employee_id;</code></pre>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"slide-section\" id=\"day11LeftWarnSection\">\n          <div class=\"warn-box\" id=\"day11LeftWarn\">\n            <div style=\"display: flex; align-items: center; gap: 8px; margin-bottom: 4px; width: 100%;\">\n              <strong style=\"color:var(--ink-amber); flex: 1;\">⚠️ Why LEFT JOIN is Critical for Hierarchies:</strong>\n            </div>\n            <p style=\"margin: 0;\">Top-level leaders (like Directors or CEOs) have <code>manager_id IS NULL</code>. If you use an <code>INNER JOIN</code>, the root executives of the company will be completely dropped from your reporting roster! Always use <code>LEFT JOIN</code> for organizational trees.</p>\n          </div>\n        </div>\n\n        <div class=\"slide-section\" id=\"day11SpanExamplesSection\">\n          <div class=\"terminal-card\" id=\"day11SpanExamples\">\n            <div class=\"terminal-header\">\n              <span class=\"terminal-title\">Query 2 — Management Span of Control (Direct Reports)</span>\n            </div>\n            <div class=\"terminal-body\">\n              <pre><code>SELECT mgr.first_name AS manager_name,\n       COUNT(emp.employee_id) AS direct_reports\nFROM   employees mgr\nINNER JOIN employees emp\n   ON  mgr.employee_id = emp.manager_id\nGROUP BY mgr.employee_id, mgr.first_name\nORDER BY direct_reports DESC;</code></pre>\n            </div>\n          </div>\n        </div>\n\n        <!-- ── Section 02: Peer Comparisons ── -->\n        <div class=\"slide-section\" id=\"day11PeersSection\">\n          <h3 class=\"heading-with-audio\" id=\"day11Peers\">\n            02. Peer Comparisons &amp; Colleague Pairing\n          </h3>\n          <p>Self-joins allow you to compare rows against other rows in the same table. To match colleagues in the same department without generating mirror duplicates (Alice-Bob and Bob-Alice) or self-pairs (Alice-Alice), use an inequality predicate like <code>e1.employee_id &lt; e2.employee_id</code>.</p>\n        </div>\n\n        <div class=\"slide-section\" id=\"day11PeerExamplesSection\">\n          <div class=\"terminal-card\" id=\"day11PeerExamples\">\n            <div class=\"terminal-header\">\n              <span class=\"terminal-title\">Query 3 — Same-Department Colleague Pairs</span>\n            </div>\n            <div class=\"terminal-body\">\n              <pre><code>SELECT e1.first_name AS emp1_name,\n       e2.first_name AS emp2_name,\n       e1.department_id\nFROM   employees e1\nINNER JOIN employees e2\n   ON  e1.department_id = e2.department_id\n  AND  e1.employee_id &lt; e2.employee_id\nORDER BY e1.department_id, e1.first_name;</code></pre>\n            </div>\n          </div>\n        </div>\n\n        <!-- ── Section 03: CROSS JOIN ── -->\n        <div class=\"slide-section\" id=\"day11CrossJoinSection\">\n          <h3 class=\"heading-with-audio\" id=\"day11CrossJoin\">\n            03. CROSS JOIN — The Cartesian Product\n          </h3>\n          <p>A <code>CROSS JOIN</code> returns every possible combination of rows between two tables (Cartesian product). If Table A has <i>M</i> rows and Table B has <i>N</i> rows, the result contains <i>M × N</i> rows.</p>\n        </div>\n\n        <div class=\"slide-section\" id=\"day11CartesianCalcSection\">\n          <div class=\"info-box\" id=\"day11CartesianCalc\">\n            <div style=\"display: flex; align-items: center; gap: 8px; margin-bottom: 4px; width: 100%;\">\n              <strong style=\"color:var(--ink-teal); flex: 1;\">📊 Matrix Applications:</strong>\n            </div>\n            <p style=\"margin: 0;\">Cross-joins are used to generate calendar grids, product variant matrices, and regional market coverage baselines where every department must be evaluated against every geographic territory.</p>\n          </div>\n        </div>\n\n        <div class=\"slide-section\" id=\"day11MatrixExamplesSection\">\n          <div class=\"terminal-card\" id=\"day11MatrixExamples\">\n            <div class=\"terminal-header\">\n              <span class=\"terminal-title\">Query 4 — Department &amp; Region Coverage Matrix</span>\n            </div>\n            <div class=\"terminal-body\">\n              <pre><code>SELECT d.department_name,\n       r.region\nFROM   departments d\nCROSS JOIN (SELECT DISTINCT region FROM customers) r\nORDER BY d.department_name, r.region;</code></pre>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"slide-section\" id=\"day11ShareExamplesSection\">\n          <div class=\"terminal-card\" id=\"day11ShareExamples\">\n            <div class=\"terminal-header\">\n              <span class=\"terminal-title\">Cross-Join for Ratio Computation</span>\n            </div>\n            <div class=\"terminal-body\">\n              <pre><code>SELECT p.product_id,\n       p.name,\n       p.stock_qty,\n       ROUND(p.stock_qty * 100.0 / total.sum_stock, 2) AS stock_pct\nFROM   products p\nCROSS JOIN (SELECT SUM(stock_qty) AS sum_stock FROM products) total\nORDER BY stock_pct DESC;</code></pre>\n            </div>\n          </div>\n        </div>\n\n        <!-- ── Section 04: Non-Equi Joins ── -->\n        <div class=\"slide-section\" id=\"day11NonEquiSection\">\n          <h3 class=\"heading-with-audio\" id=\"day11NonEqui\">\n            04. Non-Equi Joins (Inequality Joins)\n          </h3>\n          <p>A <strong>Non-Equi Join</strong> uses comparison operators other than <code>=</code> (such as <code>&gt;</code>, <code>&lt;</code>, <code>&gt;=</code>, <code>&lt;=</code>, or <code>BETWEEN</code>) in its <code>ON</code> clause. This is valuable for fee schedules, tax brackets, and ranking peers.</p>\n        </div>\n\n        <div class=\"slide-section\" id=\"day11NonEquiExamplesSection\">\n          <div class=\"terminal-card\" id=\"day11NonEquiExamples\">\n            <div class=\"terminal-header\">\n              <span class=\"terminal-title\">Query 5 — Finding Higher-Priced Category Peers</span>\n            </div>\n            <div class=\"terminal-body\">\n              <pre><code>SELECT p1.name AS product_name,\n       p1.unit_price,\n       p2.name AS higher_priced_product,\n       p2.unit_price AS higher_price\nFROM   products p1\nINNER JOIN products p2\n   ON  p1.category_id = p2.category_id\n  AND  p2.unit_price > p1.unit_price\nWHERE  p1.product_id = 101;</code></pre>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"slide-section\" id=\"day11PerfSection\">\n          <div class=\"info-box\" id=\"day11Perf\">\n            <div style=\"display: flex; align-items: center; gap: 8px; margin-bottom: 4px; width: 100%;\">\n              <strong style=\"color:var(--ink-teal); flex: 1;\">⚡ Performance Tip:</strong>\n            </div>\n            <p style=\"margin: 0;\">In large tables, self-joins can perform expensive table scans unless indexed. Ensure columns involved in join predicates (e.g., <code>manager_id</code>, <code>department_id</code>) have dedicated indexes.</p>\n          </div>\n        </div>\n\n        <!-- ── Section 05: Top 25 Interview Q&A ── -->\n        <div class=\"slide-section\" id=\"day11QASection\">\n          <div class=\"interview-box\">\n            <h4 id=\"day11QAHeading\" style=\"margin: 0 0 12px 0; font-size: 1rem; color: #38bdf8; display: flex; align-items: center; gap: 6px;\">\n              <span>🎯</span> Top 25 SQL Interview Q&amp;A — Advanced Joins, Self-Joins &amp; CROSS JOINs\n            </h4>\n\n            <div id=\"day11QA1\">\n              <p><strong>Q1: What is a Self-Join in SQL?</strong></p>\n              <p><em>A: A Self-Join connects a table to itself by querying the table twice using two distinct table aliases (e.g. <code>employees emp</code> and <code>employees mgr</code>).</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day11QA2\">\n              <p><strong>Q2: Why are table aliases strictly necessary when performing a Self-Join?</strong></p>\n              <p><em>A: Without distinct aliases, every column reference is identical and ambiguous to the query compiler, resulting in an \"ambiguous column name\" syntax error.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day11QA3\">\n              <p><strong>Q3: Why should a Self-Join on an employee-manager hierarchy use a LEFT JOIN instead of an INNER JOIN?</strong></p>\n              <p><em>A: The top executive or CEO has no supervisor (<code>manager_id IS NULL</code>). An <code>INNER JOIN</code> drops rows with NULL foreign keys, inadvertently deleting the top leadership from the results.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day11QA4\">\n              <p><strong>Q4: If Table A has 8 rows and Table B has 6 rows, how many rows will be returned by: SELECT * FROM A CROSS JOIN B?</strong></p>\n              <p><em>A: 48 rows. A <code>CROSS JOIN</code> produces the Cartesian product of both tables: 8 × 6 = 48 rows.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day11QA5\">\n              <p><strong>Q5: In a Self-Join pairing peers in the same department, what does the condition e1.id &lt; e2.id accomplish?</strong></p>\n              <p><em>A: It prevents self-matching (an employee paired with themselves, where <code>e1.id = e2.id</code>) and eliminates reverse mirror duplicates (generating both Alice-Bob and Bob-Alice).</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day11QA6\">\n              <p><strong>Q6: What is a Non-Equi Join?</strong></p>\n              <p><em>A: A join that uses comparison operators other than equality (<code>=</code>), such as <code>&gt;</code>, <code>&lt;</code>, <code>&gt;=</code>, <code>&lt;=</code>, or <code>BETWEEN</code> in its <code>ON</code> clause.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day11QA7\">\n              <p><strong>Q7: Which legacy SQL statement is equivalent to: SELECT * FROM A CROSS JOIN B?</strong></p>\n              <p><em>A: <code>SELECT * FROM A, B;</code> Comma-separated table lists without a WHERE clause produce an unconditional Cartesian product.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day11QA8\">\n              <p><strong>Q8: What happens if a Cartesian product is accidentally run on two tables with 100,000 rows each?</strong></p>\n              <p><em>A: It attempts to generate 10 billion rows (100,000 × 100,000 = 10,000,000,000), which can saturate server memory, fill temporary disk storage, and crash database processes.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day11QA9\">\n              <p><strong>Q9: Can a table be joined to itself more than once in a single query?</strong></p>\n              <p><em>A: Yes, as long as every table reference has a distinct alias (e.g. <code>FROM employees emp LEFT JOIN employees mgr ON emp.manager_id = mgr.employee_id LEFT JOIN employees director ON mgr.manager_id = director.employee_id</code>).</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day11QA10\">\n              <p><strong>Q10: In a category table where subcategories reference parent categories with parent_id, what condition finds root categories?</strong></p>\n              <p><em>A: <code>WHERE parent_id IS NULL;</code> Root-level categories have no parent, which is represented by a NULL value.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day11QA11\">\n              <p><strong>Q11: When computing a percentage of total metric, how is CROSS JOIN used effectively?</strong></p>\n              <p><em>A: By cross-joining base table rows with a 1-row summary subquery containing the grand total: <code>CROSS JOIN (SELECT SUM(qty) AS grand_total FROM orders)</code>. This appends the grand total to every row for division.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day11QA12\">\n              <p><strong>Q12: What is the primary risk of an accidental CROSS JOIN in a production analytics pipeline?</strong></p>\n              <p><em>A: Exponential row multiplication leading to severe query timeouts, out-of-memory (OOM) exceptions, and astronomical cloud warehouse compute costs.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day11QA13\">\n              <p><strong>Q13: In SQLite, does CROSS JOIN disable query optimizer reordering?</strong></p>\n              <p><em>A: Yes. In SQLite, writing <code>CROSS JOIN</code> acts as an optimizer directive forcing the query planner to evaluate the left table before the right table.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day11QA14\">\n              <p><strong>Q14: How do you count how many employees report to each manager?</strong></p>\n              <p><em>A: Group by the manager's identifier and count the employee rows: <code>SELECT manager_id, COUNT(*) AS report_count FROM employees WHERE manager_id IS NOT NULL GROUP BY manager_id;</code></em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day11QA15\">\n              <p><strong>Q15: Which join predicate is an example of a Non-Equi Join?</strong></p>\n              <p><em>A: <code>ON a.event_date BETWEEN b.start_date AND b.end_date</code> or <code>ON e.salary &gt;= b.min_salary AND e.salary &lt;= b.max_salary</code>.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day11QA16\">\n              <p><strong>Q16: What is the result of joining on e1.department_id = e2.department_id without any other condition?</strong></p>\n              <p><em>A: Every employee is paired with every colleague in their department, including pairing with themselves and duplicating pairs in reverse order.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day11QA17\">\n              <p><strong>Q17: Can a CROSS JOIN have an ON clause in standard ANSI SQL?</strong></p>\n              <p><em>A: No. A <code>CROSS JOIN</code> does not accept an <code>ON</code> clause. Adding a predicate transforms it into an <code>INNER JOIN</code>.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day11QA18\">\n              <p><strong>Q18: What is the typical database execution strategy for a Non-Equi Join when no indexes exist?</strong></p>\n              <p><em>A: A Nested Loop Join, where the engine iterates through every row of Table A and tests each row of Table B against the range predicate.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day11QA19\">\n              <p><strong>Q19: If you want to generate all combinations of 12 calendar months and 5 product lines, what join should you use?</strong></p>\n              <p><em>A: <code>CROSS JOIN</code>. It generates all 12 × 5 = 60 grid combinations, providing a base matrix for reporting even when sales are zero.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day11QA20\">\n              <p><strong>Q20: In a Self-Join: emp JOIN mgr ON emp.manager_id = mgr.employee_id, which table represents the supervisor?</strong></p>\n              <p><em>A: The <code>mgr</code> table instance represents the supervisor because its <code>employee_id</code> matches the worker's <code>manager_id</code> foreign key.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day11QA21\">\n              <p><strong>Q21: How do you write a self-join returning employee name and manager name?</strong></p>\n              <p><em>A: <code>SELECT emp.first_name, mgr.first_name AS manager_name FROM employees emp INNER JOIN employees mgr ON emp.manager_id = mgr.employee_id;</code></em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day11QA22\">\n              <p><strong>Q22: How do you write a CROSS JOIN between categories and distinct order statuses?</strong></p>\n              <p><em>A: <code>SELECT c.name, s.status FROM categories c CROSS JOIN (SELECT DISTINCT status FROM orders) s;</code></em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day11QA23\">\n              <p><strong>Q23: How do you find root employees who have no supervisor?</strong></p>\n              <p><em>A: <code>SELECT first_name, job_title FROM employees WHERE manager_id IS NULL;</code></em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day11QA24\">\n              <p><strong>Q24: How do you pair distinct colleagues in the same department without duplicates?</strong></p>\n              <p><em>A: <code>SELECT e1.first_name, e2.first_name FROM employees e1 INNER JOIN employees e2 ON e1.department_id = e2.department_id AND e1.employee_id &lt; e2.employee_id;</code></em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day11QA25\">\n              <p><strong>Q25: How do you join subcategories to their parent category name?</strong></p>\n              <p><em>A: <code>SELECT sub.name, parent.name AS parent_name FROM categories sub INNER JOIN categories parent ON sub.parent_id = parent.id;</code></em></p>\n            </div>\n          </div>\n        </div>"
    }
  ],
  "practiceQuestions": [
    {
      "id": 1,
      "title": "Employee-to-Manager Hierarchy",
      "prompt": "Perform a <code>LEFT JOIN</code> on <code>employees</code> to itself on <code>manager_id</code>. Return <code>employee_id</code>, <code>employee_name</code> (emp.first_name), <code>job_title</code>, and <code>manager_name</code> using <code>COALESCE(mgr.first_name || ' ' || mgr.last_name, 'Top Executive')</code>.",
      "starterSql": "SELECT emp.employee_id,\n       emp.first_name AS employee_name,\n       emp.job_title\nFROM   employees emp;",
      "referenceSql": "SELECT emp.employee_id,\n       emp.first_name AS employee_name,\n       emp.job_title,\n       COALESCE(mgr.first_name || ' ' || mgr.last_name, 'Top Executive') AS manager_name\nFROM   employees emp\nLEFT JOIN employees mgr\n   ON  emp.manager_id = mgr.employee_id;",
      "solutionAudio": "Day11/New_Day11Question01sol.mp3"
    },
    {
      "id": 2,
      "title": "Management Span of Control",
      "prompt": "Self-join managers to employees on <code>mgr.employee_id = emp.manager_id</code>. Group by manager to return <code>manager_first_name</code>, <code>manager_last_name</code>, and <code>direct_reports</code> (COUNT of emp.employee_id), ordered by reports descending.",
      "starterSql": "SELECT mgr.first_name AS manager_first_name,\n       mgr.last_name AS manager_last_name\nFROM   employees mgr;",
      "referenceSql": "SELECT mgr.first_name AS manager_first_name,\n       mgr.last_name AS manager_last_name,\n       COUNT(emp.employee_id) AS direct_reports\nFROM   employees mgr\nINNER JOIN employees emp\n   ON  mgr.employee_id = emp.manager_id\nGROUP BY mgr.employee_id, mgr.first_name, mgr.last_name\nORDER BY direct_reports DESC;",
      "solutionAudio": "Day11/New_Day11Question02sol.mp3"
    },
    {
      "id": 3,
      "title": "High-Earning Subordinates",
      "prompt": "Self-join employees to find staff earning at least 70% of their manager's salary (<code>emp.salary &gt;= mgr.salary * 0.70</code>). Return <code>employee_name</code> (emp.first_name), <code>employee_salary</code>, <code>manager_name</code> (mgr.first_name), and <code>manager_salary</code>, ordered by employee salary descending.",
      "starterSql": "SELECT emp.first_name AS employee_name,\n       emp.salary AS employee_salary\nFROM   employees emp;",
      "referenceSql": "SELECT emp.first_name AS employee_name,\n       emp.salary AS employee_salary,\n       mgr.first_name AS manager_name,\n       mgr.salary AS manager_salary\nFROM   employees emp\nINNER JOIN employees mgr\n   ON  emp.manager_id = mgr.employee_id\nWHERE  emp.salary >= mgr.salary * 0.70\nORDER BY emp.salary DESC;",
      "solutionAudio": "Day11/New_Day11Question03sol.mp3"
    },
    {
      "id": 4,
      "title": "Same-Department Peer Pairs",
      "prompt": "Self-join <code>employees</code> on <code>department_id</code> to find colleague pairs, using <code>e1.employee_id &lt; e2.employee_id</code> to avoid duplicate pairings. Return <code>emp1_name</code> (e1.first_name), <code>emp2_name</code> (e2.first_name), and <code>department_id</code>, ordered by department_id, then emp1_name.",
      "starterSql": "SELECT e1.first_name AS emp1_name,\n       e1.department_id\nFROM   employees e1;",
      "referenceSql": "SELECT e1.first_name AS emp1_name,\n       e2.first_name AS emp2_name,\n       e1.department_id\nFROM   employees e1\nINNER JOIN employees e2\n   ON  e1.department_id = e2.department_id\n  AND  e1.employee_id < e2.employee_id\nORDER BY e1.department_id, e1.first_name;",
      "solutionAudio": "Day11/New_Day11Question04sol.mp3"
    },
    {
      "id": 5,
      "title": "Category Hierarchy Self-Join",
      "prompt": "Perform a self-join on <code>categories</code> where <code>sub.parent_id = parent.id</code>. Return <code>subcategory_name</code> (sub.name) and <code>parent_category_name</code> (parent.name).",
      "starterSql": "SELECT sub.name AS subcategory_name\nFROM   categories sub;",
      "referenceSql": "SELECT sub.name AS subcategory_name,\n       parent.name AS parent_category_name\nFROM   categories sub\nINNER JOIN categories parent\n   ON  sub.parent_id = parent.id;",
      "solutionAudio": "Day11/New_Day11Question05sol.mp3"
    },
    {
      "id": 6,
      "title": "Root Categories Audit",
      "prompt": "From <code>categories</code>, return <code>category_id</code> (id) and <code>category_name</code> (name) for all top-level categories that have no parent (<code>parent_id IS NULL</code>).",
      "starterSql": "SELECT id AS category_id,\n       name AS category_name\nFROM   categories;",
      "referenceSql": "SELECT id AS category_id,\n       name AS category_name\nFROM   categories\nWHERE  parent_id IS NULL;",
      "solutionAudio": "Day11/New_Day11Question06sol.mp3"
    },
    {
      "id": 7,
      "title": "Department-Region Coverage Matrix",
      "prompt": "Perform a <code>CROSS JOIN</code> between <code>departments</code> and distinct customer regions (<code>SELECT DISTINCT region FROM customers</code>). Return <code>department_name</code> and <code>region</code>, ordered by department_name, then region.",
      "starterSql": "SELECT d.department_name\nFROM   departments d;",
      "referenceSql": "SELECT d.department_name,\n       r.region\nFROM   departments d\nCROSS JOIN (SELECT DISTINCT region FROM customers) r\nORDER BY d.department_name, r.region;",
      "solutionAudio": "Day11/New_Day11Question07sol.mp3"
    },
    {
      "id": 8,
      "title": "Product Fulfillment Scenarios",
      "prompt": "CROSS JOIN the first 3 products (<code>SELECT name FROM products LIMIT 3</code>) with distinct order statuses (<code>SELECT DISTINCT status FROM orders</code>). Return <code>product_name</code> and <code>status</code>, ordered by product_name, then status.",
      "starterSql": "SELECT p.name AS product_name\nFROM   (SELECT name FROM products LIMIT 3) p;",
      "referenceSql": "SELECT p.name AS product_name,\n       s.status\nFROM   (SELECT name FROM products LIMIT 3) p\nCROSS JOIN (SELECT DISTINCT status FROM orders) s\nORDER BY p.name, s.status;",
      "solutionAudio": "Day11/New_Day11Question08sol.mp3"
    },
    {
      "id": 9,
      "title": "Higher-Priced Category Peers",
      "prompt": "For product ID 101, perform a non-equi self-join on <code>products</code> in the same category where <code>p2.unit_price &gt; p1.unit_price</code>. Return <code>product_name</code> (p1.name), <code>unit_price</code> (p1.unit_price), <code>higher_priced_product</code> (p2.name), and <code>higher_price</code> (p2.unit_price).",
      "starterSql": "SELECT p1.name AS product_name,\n       p1.unit_price\nFROM   products p1\nWHERE  p1.product_id = 101;",
      "referenceSql": "SELECT p1.name AS product_name,\n       p1.unit_price,\n       p2.name AS higher_priced_product,\n       p2.unit_price AS higher_price\nFROM   products p1\nINNER JOIN products p2\n   ON  p1.category_id = p2.category_id\n  AND  p2.unit_price > p1.unit_price\nWHERE  p1.product_id = 101;",
      "solutionAudio": "Day11/New_Day11Question09sol.mp3"
    },
    {
      "id": 10,
      "title": "Co-Located Customer Pairs",
      "prompt": "Self-join <code>customers</code> on <code>region</code> to find customer pairs in the same region where <code>c1.customer_id &lt; c2.customer_id</code>. Return <code>customer1</code> (c1.first_name), <code>customer2</code> (c2.first_name), and <code>region</code>, ordered by region, then customer1.",
      "starterSql": "SELECT c1.first_name AS customer1,\n       c1.region\nFROM   customers c1;",
      "referenceSql": "SELECT c1.first_name AS customer1,\n       c2.first_name AS customer2,\n       c1.region\nFROM   customers c1\nINNER JOIN customers c2\n   ON  c1.region = c2.region\n  AND  c1.customer_id < c2.customer_id\nORDER BY c1.region, c1.first_name;",
      "solutionAudio": "Day11/New_Day11Question10sol.mp3"
    },
    {
      "id": 11,
      "title": "Hierarchy & Department Rollup",
      "prompt": "Join <code>employees</code> to their manager via <code>LEFT JOIN</code> on <code>manager_id</code>, and to <code>departments</code> on <code>department_id</code>. Return <code>employee_name</code> (emp.first_name), <code>job_title</code>, <code>manager_name</code> (COALESCE of mgr.first_name, 'None'), and <code>department_name</code>.",
      "starterSql": "SELECT emp.first_name AS employee_name,\n       emp.job_title\nFROM   employees emp;",
      "referenceSql": "SELECT emp.first_name AS employee_name,\n       emp.job_title,\n       COALESCE(mgr.first_name, 'None') AS manager_name,\n       d.department_name\nFROM   employees emp\nLEFT JOIN employees mgr\n   ON  emp.manager_id = mgr.employee_id\nINNER JOIN departments d\n   ON  emp.department_id = d.department_id;",
      "solutionAudio": "Day11/New_Day11Question11sol.mp3"
    },
    {
      "id": 12,
      "title": "Detect Top-Level Executives",
      "prompt": "From <code>employees</code>, return <code>employee_id</code>, <code>first_name</code>, <code>last_name</code>, <code>job_title</code>, and <code>salary</code> for employees who have no manager assigned (<code>manager_id IS NULL</code>).",
      "starterSql": "SELECT employee_id,\n       first_name,\n       last_name,\n       job_title,\n       salary\nFROM   employees;",
      "referenceSql": "SELECT employee_id,\n       first_name,\n       last_name,\n       job_title,\n       salary\nFROM   employees\nWHERE  manager_id IS NULL;",
      "solutionAudio": "Day11/New_Day11Question12sol.mp3"
    },
    {
      "id": 13,
      "title": "Multi-Condition Joined Order Filter",
      "prompt": "Join <code>orders</code> with <code>customers</code> on <code>customer_id</code> where <code>c.region = 'North'</code> and <code>o.total_amount &gt;= 10000</code>. Return <code>order_id</code>, <code>order_date</code>, <code>total_amount</code>, <code>customer_name</code> (c.first_name), and <code>region</code>.",
      "starterSql": "SELECT o.order_id,\n       o.order_date,\n       o.total_amount\nFROM   orders o;",
      "referenceSql": "SELECT o.order_id,\n       o.order_date,\n       o.total_amount,\n       c.first_name AS customer_name,\n       c.region\nFROM   orders o\nINNER JOIN customers c\n   ON  o.customer_id = c.customer_id\n  AND  c.region = 'North'\n  AND  o.total_amount >= 10000;",
      "solutionAudio": "Day11/New_Day11Question13sol.mp3"
    },
    {
      "id": 14,
      "title": "Product Stock Share Percentage",
      "prompt": "CROSS JOIN <code>products</code> with a subquery of total inventory stock (<code>SELECT SUM(stock_qty) AS sum_stock FROM products</code>). Return <code>product_id</code>, <code>name</code>, <code>stock_qty</code>, and <code>stock_pct</code> (ROUND(p.stock_qty * 100.0 / total.sum_stock, 2)), ordered by stock_pct descending.",
      "starterSql": "SELECT p.product_id,\n       p.name,\n       p.stock_qty\nFROM   products p;",
      "referenceSql": "SELECT p.product_id,\n       p.name,\n       p.stock_qty,\n       ROUND(p.stock_qty * 100.0 / total.sum_stock, 2) AS stock_pct\nFROM   products p\nCROSS JOIN (SELECT SUM(stock_qty) AS sum_stock FROM products) total\nORDER BY stock_pct DESC;",
      "solutionAudio": "Day11/New_Day11Question14sol.mp3"
    },
    {
      "id": 15,
      "title": "Executive Hierarchy Reporting View",
      "prompt": "Join <code>employees</code> to their manager with <code>LEFT JOIN</code> on <code>manager_id</code> and to <code>departments</code> on <code>department_id</code>. Return <code>employee_name</code> (emp.first_name), <code>salary</code>, <code>manager_name</code> (mgr.first_name), and <code>department_name</code>, ordered by salary descending.",
      "starterSql": "SELECT emp.first_name AS employee_name,\n       emp.salary\nFROM   employees emp;",
      "referenceSql": "SELECT emp.first_name AS employee_name,\n       emp.salary,\n       mgr.first_name AS manager_name,\n       d.department_name\nFROM   employees emp\nLEFT JOIN employees mgr\n   ON  emp.manager_id = mgr.employee_id\nLEFT JOIN departments d\n   ON  emp.department_id = d.department_id\nORDER BY emp.salary DESC;",
      "solutionAudio": "Day11/New_Day11Question15sol.mp3"
    }
  ],
  "testQuestions": [
    {
      "id": 1,
      "type": "mcq",
      "question": "What is a Self-Join in SQL?",
      "options": [
        "A join that connects a table to itself using table aliases",
        "A join executed without any ON predicate",
        "An automatic join on matching primary keys",
        "A join that runs in a single transaction"
      ],
      "answer": "A join that connects a table to itself using table aliases",
      "explanation": "A self-join queries the same table twice by giving each reference a distinct alias.",
      "prompt": "What is a Self-Join in SQL?"
    },
    {
      "id": 2,
      "type": "mcq",
      "question": "Why are table aliases strictly necessary when performing a Self-Join?",
      "options": [
        "Without aliases, column references would be completely ambiguous to the SQL engine",
        "Aliases are required for index creation",
        "They prevent locking issues",
        "They convert Cartesian products to inner joins"
      ],
      "answer": "Without aliases, column references would be completely ambiguous to the SQL engine",
      "explanation": "Since both copies have identical column names, aliases (e.g. emp vs mgr) are required to specify which instance is being referenced.",
      "prompt": "Why are table aliases strictly necessary when performing a Self-Join?"
    },
    {
      "id": 3,
      "type": "mcq",
      "question": "Why should a Self-Join on an employee-manager hierarchy use a LEFT JOIN instead of an INNER JOIN?",
      "options": [
        "LEFT JOIN runs faster than INNER JOIN",
        "To keep top-level executives who have NULL for manager_id from being excluded",
        "INNER JOIN cannot compare integer columns",
        "To prevent circular reference loops"
      ],
      "answer": "To keep top-level executives who have NULL for manager_id from being excluded",
      "explanation": "Top-level executives have no manager (manager_id IS NULL); an INNER JOIN would discard them entirely.",
      "prompt": "Why should a Self-Join on an employee-manager hierarchy use a LEFT JOIN instead of an INNER JOIN?"
    },
    {
      "id": 4,
      "type": "mcq",
      "question": "If Table A has 8 rows and Table B has 6 rows, how many rows will be returned by: SELECT * FROM A CROSS JOIN B?",
      "options": [
        "14 rows",
        "48 rows",
        "8 rows",
        "2 rows"
      ],
      "answer": "48 rows",
      "explanation": "CROSS JOIN produces the Cartesian product: 8 × 6 = 48 rows.",
      "prompt": "If Table A has 8 rows and Table B has 6 rows, how many rows will be returned by: SELECT * FROM A CROSS JOIN B?"
    },
    {
      "id": 5,
      "type": "mcq",
      "question": "In a Self-Join pairing peers in the same department, what does the condition e1.id < e2.id accomplish?",
      "options": [
        "It sorts the result set in ascending order",
        "It prevents employees from pairing with themselves and eliminates reverse mirror duplicates (e.g. Bob-Alice when Alice-Bob exists)",
        "It drops junior employees",
        "It limits the query to 2 rows"
      ],
      "answer": "It prevents employees from pairing with themselves and eliminates reverse mirror duplicates (e.g. Bob-Alice when Alice-Bob exists)",
      "explanation": "e1.id < e2.id ensures each pair is generated only once and eliminates self-matching (e1.id = e2.id).",
      "prompt": "In a Self-Join pairing peers in the same department, what does the condition e1.id < e2.id accomplish?"
    },
    {
      "id": 6,
      "type": "mcq",
      "question": "What is a Non-Equi Join?",
      "options": [
        "A join that uses comparison operators other than equality (=), such as >, <, or BETWEEN in the ON clause",
        "A join with incompatible data types",
        "A join without an ON clause",
        "A join between tables in different database schemas"
      ],
      "answer": "A join that uses comparison operators other than equality (=), such as >, <, or BETWEEN in the ON clause",
      "explanation": "Non-equi joins evaluate ranges or inequalities (e.g., ON salary BETWEEN min_sal AND max_sal).",
      "prompt": "What is a Non-Equi Join?"
    },
    {
      "id": 7,
      "type": "mcq",
      "question": "Which SQL statement is equivalent to: SELECT * FROM A CROSS JOIN B?",
      "options": [
        "SELECT * FROM A, B",
        "SELECT * FROM A INNER JOIN B",
        "SELECT * FROM A NATURAL JOIN B",
        "SELECT * FROM A FULL JOIN B"
      ],
      "answer": "SELECT * FROM A, B",
      "explanation": "Comma-separated table syntax without a WHERE condition is the legacy syntax for a Cartesian product.",
      "prompt": "Which SQL statement is equivalent to: SELECT * FROM A CROSS JOIN B?"
    },
    {
      "id": 8,
      "type": "mcq",
      "question": "What happens if a Cartesian product is accidentally run on two tables with 100,000 rows each?",
      "options": [
        "The query finishes instantly with 200,000 rows",
        "It attempts to generate 10 billion rows, which can freeze or crash the server",
        "SQL aborts with a TooManyRowsError",
        "Only the first 1,000 rows are generated"
      ],
      "answer": "It attempts to generate 10 billion rows, which can freeze or crash the server",
      "explanation": "100,000 × 100,000 = 10,000,000,000 rows, consuming massive memory and temp space.",
      "prompt": "What happens if a Cartesian product is accidentally run on two tables with 100,000 rows each?"
    },
    {
      "id": 9,
      "type": "mcq",
      "question": "Can a table be joined to itself more than once in a single query?",
      "options": [
        "No, at most 2 instances of a table are allowed",
        "Yes, as long as every instance has a unique alias",
        "Only in stored procedures",
        "Only with recursive CTEs"
      ],
      "answer": "Yes, as long as every instance has a unique alias",
      "explanation": "You can join a table to itself multiple times (e.g., employee, manager, and skip-level manager: emp, mgr, and skip_mgr).",
      "prompt": "Can a table be joined to itself more than once in a single query?"
    },
    {
      "id": 10,
      "type": "mcq",
      "question": "In a category table where subcategories reference parent categories with parent_id, what condition finds root categories?",
      "options": [
        "parent_id = 0",
        "parent_id IS NULL",
        "id = parent_id",
        "parent_id = 'ROOT'"
      ],
      "answer": "parent_id IS NULL",
      "explanation": "Root categories have no parent, which is represented by a NULL parent_id.",
      "prompt": "In a category table where subcategories reference parent categories with parent_id, what condition finds root categories?"
    },
    {
      "id": 11,
      "type": "mcq",
      "question": "When computing a percentage of total metric, how is CROSS JOIN used effectively?",
      "options": [
        "By cross-joining base table rows with a 1-row summary subquery containing the grand total",
        "By cross-joining all rows with all other rows",
        "By doubling the total",
        "CROSS JOIN cannot compute percentages"
      ],
      "answer": "By cross-joining base table rows with a 1-row summary subquery containing the grand total",
      "explanation": "Cross-joining with a 1-row subquery appends the grand total to every row without repeating expensive window functions.",
      "prompt": "When computing a percentage of total metric, how is CROSS JOIN used effectively?"
    },
    {
      "id": 12,
      "type": "mcq",
      "question": "What is the primary risk of an accidental CROSS JOIN in a production analytics pipeline?",
      "options": [
        "Data corruption in source tables",
        "Exponential row blowup leading to out-of-memory errors and query timeouts",
        "Silent NULL replacement",
        "Constraint violation errors"
      ],
      "answer": "Exponential row blowup leading to out-of-memory errors and query timeouts",
      "explanation": "Unintended Cartesian products multiply row counts and can overwhelm system RAM and network bandwidth.",
      "prompt": "What is the primary risk of an accidental CROSS JOIN in a production analytics pipeline?"
    },
    {
      "id": 13,
      "type": "mcq",
      "question": "In SQLite, does CROSS JOIN disable query optimizer reordering?",
      "options": [
        "Yes, SQLite's query planner treats CROSS JOIN as a directive to join the left table before the right table",
        "No, it is treated identically to INNER JOIN",
        "SQLite does not have an optimizer",
        "Only when indexed"
      ],
      "answer": "Yes, SQLite's query planner treats CROSS JOIN as a directive to join the left table before the right table",
      "explanation": "In SQLite, using the CROSS JOIN syntax disables the table reordering heuristic, enforcing a specific join sequence.",
      "prompt": "In SQLite, does CROSS JOIN disable query optimizer reordering?"
    },
    {
      "id": 14,
      "type": "mcq",
      "question": "How do you count how many employees report to each manager?",
      "options": [
        "GROUP BY manager_id with COUNT(*)",
        "CROSS JOIN with departments",
        "ORDER BY manager_id",
        "HAVING manager_id > 1"
      ],
      "answer": "GROUP BY manager_id with COUNT(*)",
      "explanation": "Grouping by the manager foreign key and counting rows returns the direct report count per manager.",
      "prompt": "How do you count how many employees report to each manager?"
    },
    {
      "id": 15,
      "type": "mcq",
      "question": "Which join predicate is an example of a Non-Equi Join?",
      "options": [
        "ON a.id = b.id",
        "ON a.date >= b.start_date AND a.date <= b.end_date",
        "ON a.category = b.category",
        "ON a.code = b.code"
      ],
      "answer": "ON a.date >= b.start_date AND a.date <= b.end_date",
      "explanation": "Inequalities and BETWEEN ranges are non-equi join predicates.",
      "prompt": "Which join predicate is an example of a Non-Equi Join?"
    },
    {
      "id": 16,
      "type": "mcq",
      "question": "What is the result of joining on e1.department_id = e2.department_id without any other condition?",
      "options": [
        "Only matching pairs",
        "Every employee paired with every other employee in their department, including self-pairs (Alice with Alice)",
        "An error",
        "Only the first pair per department"
      ],
      "answer": "Every employee paired with every other employee in their department, including self-pairs (Alice with Alice)",
      "explanation": "Without id inequalities, each row pairs with itself and with every colleague both forward and backward.",
      "prompt": "What is the result of joining on e1.department_id = e2.department_id without any other condition?"
    },
    {
      "id": 17,
      "type": "mcq",
      "question": "Can a CROSS JOIN have an ON clause in standard ANSI SQL?",
      "options": [
        "No, CROSS JOIN does not take an ON clause",
        "Yes, an ON clause is mandatory",
        "Only in PostgreSQL",
        "Only with subqueries"
      ],
      "answer": "No, CROSS JOIN does not take an ON clause",
      "explanation": "A CROSS JOIN has no join predicate; introducing an ON clause transforms it into an INNER JOIN.",
      "prompt": "Can a CROSS JOIN have an ON clause in standard ANSI SQL?"
    },
    {
      "id": 18,
      "type": "mcq",
      "question": "What is the typical database execution strategy for a Non-Equi Join when no indexes exist?",
      "options": [
        "Hash Join",
        "Nested Loop Join",
        "B-Tree Seek",
        "Merge Join"
      ],
      "answer": "Nested Loop Join",
      "explanation": "Without equality hash keys or range indexes, the query engine defaults to a nested loop scan.",
      "prompt": "What is the typical database execution strategy for a Non-Equi Join when no indexes exist?"
    },
    {
      "id": 19,
      "type": "mcq",
      "question": "If you want to generate all combinations of 12 months and 5 products, what join should you use?",
      "options": [
        "INNER JOIN",
        "CROSS JOIN",
        "SELF JOIN",
        "LEFT JOIN"
      ],
      "answer": "CROSS JOIN",
      "explanation": "A CROSS JOIN produces all 12 × 5 = 60 combinations.",
      "prompt": "If you want to generate all combinations of 12 months and 5 products, what join should you use?"
    },
    {
      "id": 20,
      "type": "mcq",
      "question": "In a Self-Join: emp JOIN mgr ON emp.manager_id = mgr.employee_id, which table represents the supervisor?",
      "options": [
        "emp",
        "mgr",
        "Both represent the supervisor",
        "Neither"
      ],
      "answer": "mgr",
      "explanation": "The mgr table instance matches on employee_id, which represents the manager's personal record.",
      "prompt": "In a Self-Join: emp JOIN mgr ON emp.manager_id = mgr.employee_id, which table represents the supervisor?"
    },
    {
      "id": 21,
      "type": "code",
      "question": "Write a self-join on `employees` returning employee `first_name` and their manager's `first_name` as manager_name.",
      "answer": "SELECT emp.first_name, mgr.first_name AS manager_name FROM employees emp INNER JOIN employees mgr ON emp.manager_id = mgr.employee_id;",
      "prompt": "Write a self-join on `employees` returning employee `first_name` and their manager's `first_name` as manager_name.",
      "ref": "SELECT emp.first_name, mgr.first_name AS manager_name FROM employees emp INNER JOIN employees mgr ON emp.manager_id = mgr.employee_id;"
    },
    {
      "id": 22,
      "type": "code",
      "question": "Write a CROSS JOIN between `categories` and a subquery of distinct `status` from `orders`.",
      "answer": "SELECT c.name, s.status FROM categories c CROSS JOIN (SELECT DISTINCT status FROM orders) s;",
      "prompt": "Write a CROSS JOIN between `categories` and a subquery of distinct `status` from `orders`.",
      "ref": "SELECT c.name, s.status FROM categories c CROSS JOIN (SELECT DISTINCT status FROM orders) s;"
    },
    {
      "id": 23,
      "type": "code",
      "question": "Write a query finding employees who have no supervisor (`manager_id IS NULL`) returning `first_name` and `job_title`.",
      "answer": "SELECT first_name, job_title FROM employees WHERE manager_id IS NULL;",
      "prompt": "Write a query finding employees who have no supervisor (`manager_id IS NULL`) returning `first_name` and `job_title`.",
      "ref": "SELECT first_name, job_title FROM employees WHERE manager_id IS NULL;"
    },
    {
      "id": 24,
      "type": "code",
      "question": "Write a self-join pairing colleagues in `employees` with the same `department_id` where `e1.employee_id < e2.employee_id`.",
      "answer": "SELECT e1.first_name, e2.first_name FROM employees e1 INNER JOIN employees e2 ON e1.department_id = e2.department_id AND e1.employee_id < e2.employee_id;",
      "prompt": "Write a self-join pairing colleagues in `employees` with the same `department_id` where `e1.employee_id < e2.employee_id`.",
      "ref": "SELECT e1.first_name, e2.first_name FROM employees e1 INNER JOIN employees e2 ON e1.department_id = e2.department_id AND e1.employee_id < e2.employee_id;"
    },
    {
      "id": 25,
      "type": "code",
      "question": "Write a self-join on `categories` returning subcategory `name` and parent category `name` AS parent_name.",
      "answer": "SELECT sub.name, parent.name AS parent_name FROM categories sub INNER JOIN categories parent ON sub.parent_id = parent.id;",
      "prompt": "Write a self-join on `categories` returning subcategory `name` and parent category `name` AS parent_name.",
      "ref": "SELECT sub.name, parent.name AS parent_name FROM categories sub INNER JOIN categories parent ON sub.parent_id = parent.id;"
    }
  ]
};
