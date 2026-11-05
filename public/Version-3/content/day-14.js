if (!window.COURSE_CONTENT) window.COURSE_CONTENT = {};
window.COURSE_CONTENT['day14'] = {
  "day": 14,
  "title": "Common Table Expressions (CTEs)",
  "db": "retail",
  "emoji": "🏗️",
  "slides": [
    {
      "title": "CTEs — Named Temporary Result Sets",
      "duration": "07:45",
      "html": "<h2>🏗️ Common Table Expressions (CTEs)</h2>\n\n        <!-- ── Section 01: What Is a CTE? ── -->\n        <div class=\"slide-section\" id=\"day14WhatSection\">\n          <h3 class=\"heading-with-audio\" id=\"day14What\">\n            01. What Is a Common Table Expression?\n          </h3>\n          <p>A <strong>Common Table Expression (CTE)</strong> is a temporary, named result set defined within the scope of a single SQL statement using the <code>WITH</code> keyword. CTEs act like temporary virtual views, breaking complex analytical problems into clean, sequential, self-documenting steps.</p>\n        </div>\n\n        <div class=\"slide-section\" id=\"day14RefTableSection\">\n          <div class=\"db-mock-table-wrap\" id=\"day14RefTable\">\n            <div style=\"display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 6px; padding: 0 4px;\">\n              <h4 style=\"margin: 0; font-size: 1.0rem; font-weight: 800; letter-spacing: -0.015em; flex: 1;\">Architectural Comparison Matrix</h4>\n            </div>\n            <table class=\"db-table-mock db-table-mock--compact\">\n              <thead><tr><th>Construct</th><th>Scope</th><th>Storage Location</th><th>Reusable</th><th>Can Be Indexed?</th></tr></thead>\n              <tbody>\n                <tr id=\"day14Row1\"><td><strong>CTE (WITH)</strong></td><td>Single query statement</td><td>In-memory / Query pipeline</td><td>Yes (within query)</td><td>No</td></tr>\n                <tr id=\"day14Row2\"><td><strong>Subquery</strong></td><td>Enclosing clause only</td><td>In-memory inline evaluation</td><td>No (must repeat code)</td><td>No</td></tr>\n                <tr id=\"day14Row3\"><td><strong>Temp Table</strong></td><td>Database session / connection</td><td>Temp storage on disk/RAM</td><td>Yes (across session queries)</td><td>Yes</td></tr>\n                <tr id=\"day14Row4\"><td><strong>View</strong></td><td>Permanent database catalog</td><td>Virtual stored query metadata</td><td>Yes (system-wide)</td><td>Yes (Indexed Views)</td></tr>\n              </tbody>\n            </table>\n          </div>\n        </div>\n\n        <!-- ── Section 02: Basic CTE Syntax ── -->\n        <div class=\"slide-section\" id=\"day14BasicSection\">\n          <h3 class=\"heading-with-audio\" id=\"day14Basic\">\n            02. Basic CTE Syntax &amp; Readability\n          </h3>\n          <p>The <code>WITH</code> clause precedes your main query. You assign your CTE a descriptive name, enclose the definition query in parentheses, and immediately reference it as if it were a physical database table.</p>\n        </div>\n\n        <div class=\"slide-section\" id=\"day14BasicCodeSection\">\n          <div class=\"heading-with-audio\" style=\"display: flex; align-items: center; gap: 8px; margin-bottom: 6px; margin-top: 4px;\">\n            <h4 style=\"margin: 0; font-size: 1.0rem; font-weight: 800; letter-spacing: -0.015em; flex: 1;\">Query 1 — Company Benchmark via CTE</h4>\n          </div>\n          <div class=\"code-block-container\" id=\"day14BasicCode\">\n            <div class=\"code-subblock\" id=\"day14BasicQuery1\">\n              <pre><code><span class=\"kw\">WITH</span> avg_salary <span class=\"kw\">AS</span> (\n  <span class=\"kw\">SELECT</span> AVG(salary) <span class=\"kw\">AS</span> avg_sal\n  <span class=\"kw\">FROM</span>   employees\n)\n<span class=\"kw\">SELECT</span> e.first_name,\n       e.salary\n<span class=\"kw\">FROM</span>   employees <span class=\"kw\">AS</span> e,\n       avg_salary <span class=\"kw\">AS</span> a\n<span class=\"kw\">WHERE</span>  e.salary > a.avg_sal;</code></pre>\n            </div>\n          </div>\n        </div>\n\n        <!-- ── Section 03: Chained Multi-Step CTEs ── -->\n        <div class=\"slide-section\" id=\"day14MultiSection\">\n          <h3 class=\"heading-with-audio\" id=\"day14Multi\">\n            03. Multi-Step Chained Pipelines\n          </h3>\n          <p>You can chain multiple CTEs together separated by commas. Each subsequent CTE can query any CTE defined prior to it, forming a readable, unidirectional data transformation pipeline.</p>\n        </div>\n\n        <div class=\"slide-section\" id=\"day14MultiCodeSection\">\n          <div class=\"heading-with-audio\" style=\"display: flex; align-items: center; gap: 8px; margin-bottom: 6px; margin-top: 4px;\">\n            <h4 style=\"margin: 0; font-size: 1.0rem; font-weight: 800; letter-spacing: -0.015em; flex: 1;\">Query 2 — Multi-Stage Customer Segmentation</h4>\n          </div>\n          <div class=\"code-block-container\" id=\"day14MultiCode\">\n            <div class=\"code-subblock\" id=\"day14MultiQuery1\">\n              <pre><code><span class=\"kw\">WITH</span>\n<span class=\"code-comment\">-- Step 1: Aggregate spending per customer</span>\ncustomer_revenue <span class=\"kw\">AS</span> (\n  <span class=\"kw\">SELECT</span>   customer_id,\n           SUM(total_amount) <span class=\"kw\">AS</span> total_spent\n  <span class=\"kw\">FROM</span>     orders\n  <span class=\"kw\">GROUP BY</span> customer_id\n),\n<span class=\"code-comment\">-- Step 2: Segment into business loyalty tiers</span>\ncustomer_tier <span class=\"kw\">AS</span> (\n  <span class=\"kw\">SELECT</span> customer_id,\n         total_spent,\n         <span class=\"kw\">CASE</span>\n           <span class=\"kw\">WHEN</span> total_spent >= 50000 <span class=\"kw\">THEN</span> 'Gold'\n           <span class=\"kw\">WHEN</span> total_spent >= 10000 <span class=\"kw\">THEN</span> 'Silver'\n           <span class=\"kw\">ELSE</span>                            'Bronze'\n         <span class=\"kw\">END AS</span> tier\n  <span class=\"kw\">FROM</span>   customer_revenue\n)\n<span class=\"code-comment\">-- Main Query: Summarize metrics by tier</span>\n<span class=\"kw\">SELECT</span>   tier,\n         COUNT(*) <span class=\"kw\">AS</span> customer_count,\n         SUM(total_spent) <span class=\"kw\">AS</span> tier_revenue\n<span class=\"kw\">FROM</span>     customer_tier\n<span class=\"kw\">GROUP BY</span> tier\n<span class=\"kw\">ORDER BY</span> tier_revenue <span class=\"kw\">DESC</span>;</code></pre>\n            </div>\n          </div>\n        </div>\n\n        <!-- ── Section 04: Recursive CTEs ── -->\n        <div class=\"slide-section\" id=\"day14RecursiveSection\">\n          <h3 class=\"heading-with-audio\" id=\"day14Recursive\">\n            04. Recursive CTEs — Tree &amp; Hierarchy Traversal\n          </h3>\n          <p>A <strong>Recursive CTE</strong> references itself. In standard SQL, you declare it using <code>WITH RECURSIVE</code>. It executes in two phases: the <strong>Anchor Member</strong> (base case rows), and the <strong>Recursive Member</strong> connected via <code>UNION ALL</code> which generates subsequent hierarchy depths.</p>\n        </div>\n\n        <div class=\"slide-section\" id=\"day14RecursiveCodeSection\">\n          <div class=\"heading-with-audio\" style=\"display: flex; align-items: center; gap: 8px; margin-bottom: 6px; margin-top: 4px;\">\n            <h4 style=\"margin: 0; font-size: 1.0rem; font-weight: 800; letter-spacing: -0.015em; flex: 1;\">Queries 3 &amp; 4 — Numbers &amp; Org Charts</h4>\n          </div>\n          <div class=\"code-block-container\" id=\"day14RecursiveCode\">\n            <div class=\"code-subblock\" id=\"day14RecursiveQuery1\">\n              <pre><code><span class=\"code-comment\">-- 1. Generate sequence 1 through 10</span>\n<span class=\"kw\">WITH RECURSIVE</span> nums <span class=\"kw\">AS</span> (\n  <span class=\"kw\">SELECT</span> 1 <span class=\"kw\">AS</span> num                     <span class=\"code-comment\">-- Anchor</span>\n  <span class=\"kw\">UNION ALL</span>\n  <span class=\"kw\">SELECT</span> num + 1 <span class=\"kw\">FROM</span> nums <span class=\"kw\">WHERE</span> num &lt; 10  <span class=\"code-comment\">-- Recursive step</span>\n)\n<span class=\"kw\">SELECT</span> num <span class=\"kw\">FROM</span> nums;</code></pre>\n            </div>\n            <div class=\"code-subblock\" id=\"day14RecursiveQuery2\">\n              <pre><code><span class=\"code-comment\">-- 2. Traverse Organizational Reporting Hierarchy</span>\n<span class=\"kw\">WITH RECURSIVE</span> org_chart <span class=\"kw\">AS</span> (\n  <span class=\"kw\">SELECT</span> employee_id, first_name, manager_id, 0 <span class=\"kw\">AS</span> level\n  <span class=\"kw\">FROM</span>   employees\n  <span class=\"kw\">WHERE</span>  manager_id <span class=\"kw\">IS NULL</span>          <span class=\"code-comment\">-- Anchor: Top Director</span>\n  <span class=\"kw\">UNION ALL</span>\n  <span class=\"kw\">SELECT</span> e.employee_id, e.first_name, e.manager_id, oc.level + 1\n  <span class=\"kw\">FROM</span>   employees e\n  <span class=\"kw\">JOIN</span>   org_chart oc <span class=\"kw\">ON</span> e.manager_id = oc.employee_id\n)\n<span class=\"kw\">SELECT</span> first_name, manager_id, level\n<span class=\"kw\">FROM</span>   org_chart\n<span class=\"kw\">ORDER BY</span> level, first_name;</code></pre>\n            </div>\n          </div>\n        </div>\n\n        <!-- ── Section 05: Optimization & Materialization ── -->\n        <div class=\"slide-section\" id=\"day14OptSection\">\n          <div class=\"info-box\" id=\"day14Opt\">\n            <div style=\"display: flex; align-items: center; gap: 8px; margin-bottom: 4px; width: 100%;\">\n              <strong style=\"color:var(--ink-teal); flex: 1;\">⚡ Materialized vs Inlined CTEs:</strong>\n            </div>\n            <p style=\"margin: 0;\">In PostgreSQL 12+, SQLite 3.35+, and modern engines, the query optimizer automatically inlines simple CTEs into the main query plan to push down predicates. If you reference an expensive CTE multiple times, you can explicitly force materialization in PostgreSQL with <code>WITH cte AS MATERIALIZED (...)</code>.</p>\n          </div>\n        </div>\n\n        <!-- ── Section 06: Top 25 Interview Q&A ── -->\n        <div class=\"slide-section\" id=\"day14QASection\">\n          <div class=\"interview-box\">\n            <h4 id=\"day14QAHeading\" style=\"margin: 0 0 12px 0; font-size: 1rem; color: #38bdf8; display: flex; align-items: center; gap: 6px;\">\n              <span>🎯</span> Top 25 SQL Interview Q&amp;A — Common Table Expressions (CTEs)\n            </h4>\n\n            <div id=\"day14QA1\">\n              <p><strong>Q1: What is a Common Table Expression (CTE) in SQL?</strong></p>\n              <p><em>A: A CTE is a temporary named result set defined with the <code>WITH</code> clause that exists strictly for the execution scope of a single SELECT, INSERT, UPDATE, or DELETE statement.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day14QA2\">\n              <p><strong>Q2: What are the primary advantages of CTEs over nested subqueries?</strong></p>\n              <p><em>A: 1) Superior readability: logic flows top-to-bottom rather than nested inside-out. 2) Reusability: a single CTE can be referenced multiple times within the same query. 3) Modularity: easy debugging and isolation of complex transformation steps. 4) Recursion: ability to traverse hierarchical structures.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day14QA3\">\n              <p><strong>Q3: How do you define multiple CTEs in a single query?</strong></p>\n              <p><em>A: Use the <code>WITH</code> keyword once, separate each CTE definition with a comma, and reference them in the main query: <code>WITH cte1 AS (...), cte2 AS (...) SELECT ...</code>.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day14QA4\">\n              <p><strong>Q4: Can a CTE reference another CTE defined in the same query?</strong></p>\n              <p><em>A: Yes, as long as the referenced CTE is defined earlier (above) in the <code>WITH</code> list. Forward references to subsequent CTEs are not allowed in standard SQL.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day14QA5\">\n              <p><strong>Q5: What is a Recursive CTE?</strong></p>\n              <p><em>A: A recursive CTE is a CTE that references its own name. It is defined with <code>WITH RECURSIVE</code> and consists of an Anchor query and a Recursive member combined with <code>UNION ALL</code> to traverse trees, graphs, or generate series.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day14QA6\">\n              <p><strong>Q6: What is the Anchor member in a Recursive CTE?</strong></p>\n              <p><em>A: The Anchor is the non-recursive initial query that returns the starting base row(s) (e.g. root employees where <code>manager_id IS NULL</code> or sequence start <code>SELECT 1</code>).</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day14QA7\">\n              <p><strong>Q7: How do you prevent infinite loops in a Recursive CTE?</strong></p>\n              <p><em>A: Ensure the recursive member has a strict, monotonic termination condition in its <code>WHERE</code> clause (e.g. <code>WHERE num &lt; 100</code> or <code>WHERE level &lt; 10</code>) and guard against circular reference cycles.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day14QA8\">\n              <p><strong>Q8: What is the difference between a CTE and a Temporary Table?</strong></p>\n              <p><em>A: A CTE is virtual, held in memory, and exists only for one single SQL statement. A temporary table (<code>CREATE TEMP TABLE</code>) is written to tempdb/storage, can be indexed, and persists across multiple queries across the session.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day14QA9\">\n              <p><strong>Q9: What is the difference between a CTE and a Database View?</strong></p>\n              <p><em>A: A View is a permanent database catalog object stored as metadata that anyone with permissions can query anytime. A CTE is temporary code written inline for a single statement.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day14QA10\">\n              <p><strong>Q10: Are CTEs materialized in memory or re-executed each time they are referenced?</strong></p>\n              <p><em>A: In PostgreSQL 11 and earlier, CTEs acted as optimization fences (always materialized). In PostgreSQL 12+, SQLite 3.35+, and SQL Server, the optimizer inlines CTEs by default unless forced with <code>AS MATERIALIZED</code>.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day14QA11\">\n              <p><strong>Q11: Can you use a CTE inside an INSERT, UPDATE, or DELETE statement?</strong></p>\n              <p><em>A: Yes! You can write <code>WITH cte AS (...) INSERT INTO target SELECT * FROM cte;</code> or update rows filtered by a CTE. Some engines (like Postgres) also allow data-modifying CTEs (INSERT/UPDATE/DELETE inside the WITH clause).</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day14QA12\">\n              <p><strong>Q12: Can you rename columns in a CTE declaration header?</strong></p>\n              <p><em>A: Yes: <code>WITH dept_stats(dept, headcount, avg_sal) AS (SELECT department_id, COUNT(*), AVG(salary) FROM employees GROUP BY department_id)</code>.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day14QA13\">\n              <p><strong>Q13: Why is UNION ALL preferred over UNION in Recursive CTEs?</strong></p>\n              <p><em>A: ANSI SQL specifies that the recursive step must combine successive generation iterations using <code>UNION ALL</code> because distinct sorting on each recursion step would be computationally prohibitive.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day14QA14\">\n              <p><strong>Q14: What is the default recursion limit in SQL Server and how do you change it?</strong></p>\n              <p><em>A: SQL Server defaults to 100 recursion levels. You can modify it up to 32767 or unlimited using <code>OPTION (MAXRECURSION 500)</code> or <code>OPTION (MAXRECURSION 0)</code>.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day14QA15\">\n              <p><strong>Q15: Can a CTE be self-joined in the main query?</strong></p>\n              <p><em>A: Yes, you can reference the same CTE multiple times with different aliases in the main query (e.g. <code>FROM dept_avg d1 JOIN dept_avg d2 ON ...</code>), avoiding code duplication.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day14QA16\">\n              <p><strong>Q16: Can a CTE contain an ORDER BY clause?</strong></p>\n              <p><em>A: In standard SQL, <code>ORDER BY</code> is prohibited inside a CTE unless paired with a <code>LIMIT</code> or <code>TOP</code> clause because intermediate sets are unordered. The final <code>ORDER BY</code> belongs on the outer query.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day14QA17\">\n              <p><strong>Q17: How do you traverse a parent-child category tree to construct a breadcrumb path?</strong></p>\n              <p><em>A: In a recursive CTE, concatenate names: <code>SELECT id, name AS path FROM categories WHERE parent_id IS NULL UNION ALL SELECT c.id, ch.path || ' &gt; ' || c.name FROM categories c JOIN ch ON c.parent_id = ch.id</code>.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day14QA18\">\n              <p><strong>Q18: What is the performance impact of referencing an unmaterialized CTE multiple times?</strong></p>\n              <p><em>A: If the database optimizer inlines the CTE, it may evaluate the CTE sub-query multiple times, multiplying execution cost. In such cases, a temporary table or <code>MATERIALIZED</code> hint is preferred.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day14QA19\">\n              <p><strong>Q19: Can you nest a WITH clause inside a subquery?</strong></p>\n              <p><em>A: Yes, in modern dialects (PostgreSQL, SQLite), a subquery can contain its own private <code>WITH</code> clause scoped exclusively to that subquery.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day14QA20\">\n              <p><strong>Q20: When is a Temporary Table strictly better than a CTE?</strong></p>\n              <p><em>A: When working with massive intermediate datasets (&gt; millions of rows) that need to be filtered or joined across 3 or more separate downstream queries, requiring custom indexes and statistics.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day14QA21\">\n              <p><strong>Q21: How do you write a simple benchmark CTE in SQL?</strong></p>\n              <p><em>A: <code>WITH avg_sal AS (SELECT AVG(salary) AS avg FROM employees) SELECT first_name, salary FROM employees, avg_sal WHERE salary &gt; avg_sal.avg;</code></em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day14QA22\">\n              <p><strong>Q22: How do you write a two-step chained CTE pipeline?</strong></p>\n              <p><em>A: <code>WITH step1 AS (SELECT ...), step2 AS (SELECT ... FROM step1) SELECT ... FROM step2;</code></em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day14QA23\">\n              <p><strong>Q23: How do you generate numbers 1 to 5 using a recursive CTE?</strong></p>\n              <p><em>A: <code>WITH RECURSIVE nums AS (SELECT 1 AS n UNION ALL SELECT n + 1 FROM nums WHERE n &lt; 5) SELECT n FROM nums;</code></em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day14QA24\">\n              <p><strong>Q24: How do you join a CTE with a physical table?</strong></p>\n              <p><em>A: <code>WITH cust_totals AS (SELECT customer_id, SUM(total_amount) AS spent FROM orders GROUP BY customer_id) SELECT c.first_name, ct.spent FROM customers c JOIN cust_totals ct ON c.customer_id = ct.customer_id;</code></em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day14QA25\">\n              <p><strong>Q25: How do you calculate percentage of total using a CTE without window functions?</strong></p>\n              <p><em>A: <code>WITH total AS (SELECT SUM(salary) AS grand_total FROM employees) SELECT first_name, ROUND(salary * 100.0 / total.grand_total, 2) AS pct FROM employees, total;</code></em></p>\n            </div>\n          </div>\n        </div>"
    }
  ],
  "practiceQuestions": [
    {
      "id": 1,
      "title": "Basic Benchmark CTE",
      "prompt": "Using a CTE named <code>avg_sal</code> that computes the company average salary as <code>avg</code>, return <code>first_name</code> and <code>salary</code> for employees earning above average, ordered by <code>salary</code> descending.",
      "starterSql": "WITH avg_sal AS (\n  SELECT AVG(salary) AS avg\n  FROM   employees\n)\nSELECT first_name,\n       salary\nFROM   employees, avg_sal\nWHERE  salary > avg_sal.avg;",
      "referenceSql": "WITH avg_sal AS (\n  SELECT AVG(salary) AS avg\n  FROM   employees\n)\nSELECT first_name,\n       salary\nFROM   employees, avg_sal\nWHERE  salary > avg_sal.avg\nORDER BY salary DESC;",
      "solutionAudio": "Day14/New_Day14Question01sol.mp3"
    },
    {
      "id": 2,
      "title": "Department Payroll Summary CTE",
      "prompt": "Define a CTE <code>dept_summary</code> computing <code>department_id</code>, <code>headcount</code> (COUNT(*)), and <code>total_payroll</code> (SUM(salary)). Query it to return departments where <code>total_payroll &gt; 100000</code>, ordered by <code>total_payroll</code> descending.",
      "starterSql": "WITH dept_summary AS (\n  SELECT department_id\n  FROM   employees\n)\nSELECT * FROM dept_summary;",
      "referenceSql": "WITH dept_summary AS (\n  SELECT   department_id,\n           COUNT(*) AS headcount,\n           SUM(salary) AS total_payroll\n  FROM     employees\n  GROUP BY department_id\n)\nSELECT department_id,\n       headcount,\n       total_payroll\nFROM   dept_summary\nWHERE  total_payroll > 100000\nORDER BY total_payroll DESC;",
      "solutionAudio": "Day14/New_Day14Question02sol.mp3"
    },
    {
      "id": 3,
      "title": "Two-Step Customer Tier Pipeline",
      "prompt": "Chain two CTEs: <code>cust_rev</code> (calculating <code>customer_id</code> and <code>spent</code>), then <code>tiers</code> (classifying customers as 'Gold' for spent &gt;= 50000, 'Silver' for &gt;= 10000, and 'Bronze' otherwise). Return <code>tier</code> and <code>customer_count</code>, ordered by count descending.",
      "starterSql": "WITH cust_rev AS (\n  SELECT customer_id,\n         SUM(total_amount) AS spent\n  FROM   orders\n  GROUP BY customer_id\n),\ntiers AS (\n  SELECT customer_id,\n         spent\n  FROM   cust_rev\n)\nSELECT * FROM tiers;",
      "referenceSql": "WITH cust_rev AS (\n  SELECT   customer_id,\n           SUM(total_amount) AS spent\n  FROM     orders\n  GROUP BY customer_id\n),\ntiers AS (\n  SELECT customer_id,\n         CASE\n           WHEN spent >= 50000 THEN 'Gold'\n           WHEN spent >= 10000 THEN 'Silver'\n           ELSE                     'Bronze'\n         END AS tier\n  FROM   cust_rev\n)\nSELECT   tier,\n         COUNT(*) AS customer_count\nFROM     tiers\nGROUP BY tier\nORDER BY customer_count DESC;",
      "solutionAudio": "Day14/New_Day14Question03sol.mp3"
    },
    {
      "id": 4,
      "title": "Customer Order Volume Ranking",
      "prompt": "Define a CTE <code>customer_orders</code> computing <code>customer_id</code>, <code>order_count</code> (COUNT(order_id)), and <code>total_spend</code> (SUM(total_amount)). Join with <code>customers</code> to return <code>first_name</code>, <code>order_count</code>, and <code>total_spend</code>, ordered by <code>total_spend</code> descending.",
      "starterSql": "WITH customer_orders AS (\n  SELECT customer_id,\n         COUNT(order_id) AS order_count,\n         SUM(total_amount) AS total_spend\n  FROM   orders\n  GROUP BY customer_id\n)\nSELECT c.first_name\nFROM   customers c;",
      "referenceSql": "WITH customer_orders AS (\n  SELECT   customer_id,\n           COUNT(order_id) AS order_count,\n           SUM(total_amount) AS total_spend\n  FROM     orders\n  GROUP BY customer_id\n)\nSELECT   c.first_name,\n         co.order_count,\n         co.total_spend\nFROM     customers c\nJOIN     customer_orders co ON c.customer_id = co.customer_id\nORDER BY co.total_spend DESC;",
      "solutionAudio": "Day14/New_Day14Question04sol.mp3"
    },
    {
      "id": 5,
      "title": "Recursive Number Sequence (1 to 10)",
      "prompt": "Use a recursive CTE named <code>nums</code> to generate a sequence of integers from 1 through 10 as <code>num</code>.",
      "starterSql": "WITH RECURSIVE nums AS (\n  SELECT 1 AS num\n)\nSELECT num FROM nums;",
      "referenceSql": "WITH RECURSIVE nums AS (\n  SELECT 1 AS num\n  UNION ALL\n  SELECT num + 1\n  FROM   nums\n  WHERE  num < 10\n)\nSELECT num\nFROM   nums;",
      "solutionAudio": "Day14/New_Day14Question05sol.mp3"
    },
    {
      "id": 6,
      "title": "Organizational Hierarchy Traversal",
      "prompt": "Using a recursive CTE <code>org_chart</code>, traverse employees from top executives (<code>manager_id IS NULL</code> with level 0) down through all direct reports (level + 1). Return <code>first_name</code>, <code>manager_id</code>, and <code>level</code>, ordered by <code>level</code>, then <code>first_name</code>.",
      "starterSql": "WITH RECURSIVE org_chart AS (\n  SELECT employee_id,\n         first_name,\n         manager_id,\n         0 AS level\n  FROM   employees\n  WHERE  manager_id IS NULL\n)\nSELECT * FROM org_chart;",
      "referenceSql": "WITH RECURSIVE org_chart AS (\n  SELECT employee_id,\n         first_name,\n         manager_id,\n         0 AS level\n  FROM   employees\n  WHERE  manager_id IS NULL\n  UNION ALL\n  SELECT e.employee_id,\n         e.first_name,\n         e.manager_id,\n         oc.level + 1\n  FROM   employees e\n  JOIN   org_chart oc ON e.manager_id = oc.employee_id\n)\nSELECT   first_name,\n         manager_id,\n         level\nFROM     org_chart\nORDER BY level, first_name;",
      "solutionAudio": "Day14/New_Day14Question06sol.mp3"
    },
    {
      "id": 7,
      "title": "Category Parent-Child Tree Traversal",
      "prompt": "Using a recursive CTE <code>cat_hierarchy</code>, traverse categories from root categories (<code>parent_id IS NULL</code>, level 0) to subcategories (level + 1). Return <code>id</code>, <code>name</code>, and <code>level</code>, ordered by <code>level</code>, then <code>name</code>.",
      "starterSql": "WITH RECURSIVE cat_hierarchy AS (\n  SELECT id, name, parent_id, 0 AS level\n  FROM   categories\n  WHERE  parent_id IS NULL\n)\nSELECT * FROM cat_hierarchy;",
      "referenceSql": "WITH RECURSIVE cat_hierarchy AS (\n  SELECT id, name, parent_id, 0 AS level\n  FROM   categories\n  WHERE  parent_id IS NULL\n  UNION ALL\n  SELECT c.id, c.name, c.parent_id, ch.level + 1\n  FROM   categories c\n  JOIN   cat_hierarchy ch ON c.parent_id = ch.id\n)\nSELECT   id,\n         name,\n         level\nFROM     cat_hierarchy\nORDER BY level, name;",
      "solutionAudio": "Day14/New_Day14Question07sol.mp3"
    },
    {
      "id": 8,
      "title": "High-Value Order Customer Details",
      "prompt": "Using a CTE named <code>big_orders</code> containing orders with <code>total_amount &gt;= 50000</code>, return <code>order_id</code>, <code>total_amount</code>, and customer <code>email</code> by joining with <code>customers</code>, ordered by <code>total_amount</code> descending.",
      "starterSql": "WITH big_orders AS (\n  SELECT order_id, customer_id, total_amount\n  FROM   orders\n  WHERE  total_amount >= 50000\n)\nSELECT * FROM big_orders;",
      "referenceSql": "WITH big_orders AS (\n  SELECT order_id, customer_id, total_amount\n  FROM   orders\n  WHERE  total_amount >= 50000\n)\nSELECT   bo.order_id,\n         bo.total_amount,\n         c.email\nFROM     big_orders bo\nJOIN     customers c ON bo.customer_id = c.customer_id\nORDER BY bo.total_amount DESC;",
      "solutionAudio": "Day14/New_Day14Question08sol.mp3"
    },
    {
      "id": 9,
      "title": "Self-Join a Reusable CTE",
      "prompt": "Define a CTE <code>dept_avg</code> computing <code>department_id</code> and <code>avg_sal</code> (AVG(salary)). Join it twice with itself to find pairs of departments where <code>d1.avg_sal &gt; d2.avg_sal</code> and <code>d1.department_id &lt; d2.department_id</code>, returning <code>dept1</code>, <code>sal1</code>, <code>dept2</code>, and <code>sal2</code>.",
      "starterSql": "WITH dept_avg AS (\n  SELECT department_id, AVG(salary) AS avg_sal\n  FROM   employees\n  GROUP BY department_id\n)\nSELECT * FROM dept_avg;",
      "referenceSql": "WITH dept_avg AS (\n  SELECT   department_id,\n           AVG(salary) AS avg_sal\n  FROM     employees\n  GROUP BY department_id\n)\nSELECT d1.department_id AS dept1,\n       d1.avg_sal AS sal1,\n       d2.department_id AS dept2,\n       d2.avg_sal AS sal2\nFROM   dept_avg d1\nJOIN   dept_avg d2 ON d1.avg_sal > d2.avg_sal\n                  AND d1.department_id < d2.department_id;",
      "solutionAudio": "Day14/New_Day14Question09sol.mp3"
    },
    {
      "id": 10,
      "title": "Customer Spend Variance from Group Mean",
      "prompt": "Define a CTE <code>cust_totals</code> calculating <code>customer_id</code> and <code>total_spend</code> (SUM(total_amount)). In the main query, return <code>customer_id</code>, <code>total_spend</code>, and <code>diff_from_avg</code>: <code>ROUND(total_spend - (SELECT AVG(total_spend) FROM cust_totals), 2)</code>, ordered by variance descending.",
      "starterSql": "WITH cust_totals AS (\n  SELECT customer_id, SUM(total_amount) AS total_spend\n  FROM   orders\n  GROUP BY customer_id\n)\nSELECT * FROM cust_totals;",
      "referenceSql": "WITH cust_totals AS (\n  SELECT   customer_id,\n           SUM(total_amount) AS total_spend\n  FROM     orders\n  GROUP BY customer_id\n)\nSELECT   customer_id,\n         total_spend,\n         ROUND(total_spend - (SELECT AVG(total_spend) FROM cust_totals), 2) AS diff_from_avg\nFROM     cust_totals\nORDER BY diff_from_avg DESC;",
      "solutionAudio": "Day14/New_Day14Question10sol.mp3"
    },
    {
      "id": 11,
      "title": "Department Headcount and Budget Utilization",
      "prompt": "Define a CTE <code>dept_metrics</code> computing <code>department_id</code>, <code>headcount</code> (COUNT(*)), and <code>total_payroll</code> (SUM(salary)). Join with <code>departments</code> to return <code>department_name</code>, <code>budget</code>, <code>total_payroll</code>, and <code>budget_remaining</code> (budget - total_payroll), ordered by budget remaining descending.",
      "starterSql": "WITH dept_metrics AS (\n  SELECT department_id, COUNT(*) AS headcount, SUM(salary) AS total_payroll\n  FROM   employees\n  GROUP BY department_id\n)\nSELECT * FROM dept_metrics;",
      "referenceSql": "WITH dept_metrics AS (\n  SELECT   department_id,\n           COUNT(*) AS headcount,\n           SUM(salary) AS total_payroll\n  FROM     employees\n  GROUP BY department_id\n)\nSELECT   d.department_name,\n         d.budget,\n         dm.total_payroll,\n         d.budget - dm.total_payroll AS budget_remaining\nFROM     departments d\nJOIN     dept_metrics dm ON d.department_id = dm.department_id\nORDER BY budget_remaining DESC;",
      "solutionAudio": "Day14/New_Day14Question11sol.mp3"
    },
    {
      "id": 12,
      "title": "Multi-Metric Category Revenue Performance",
      "prompt": "Define a CTE <code>item_sales</code> summing revenue per product: <code>SUM(qty * unit_price) AS prod_revenue</code>. Join with <code>products</code> and <code>categories</code> to return <code>category_name</code> (c.name) and <code>category_revenue</code> (SUM(isales.prod_revenue)), ordered by revenue descending.",
      "starterSql": "WITH item_sales AS (\n  SELECT product_id, SUM(qty * unit_price) AS prod_revenue\n  FROM   order_items\n  GROUP BY product_id\n)\nSELECT * FROM item_sales;",
      "referenceSql": "WITH item_sales AS (\n  SELECT   product_id,\n           SUM(qty * unit_price) AS prod_revenue\n  FROM     order_items\n  GROUP BY product_id\n)\nSELECT   c.name AS category_name,\n         SUM(isales.prod_revenue) AS category_revenue\nFROM     item_sales isales\nJOIN     products p ON isales.product_id = p.product_id\nJOIN     categories c ON p.category_id = c.id\nGROUP BY c.name\nORDER BY category_revenue DESC;",
      "solutionAudio": "Day14/New_Day14Question12sol.mp3"
    },
    {
      "id": 13,
      "title": "Recursive Date Calendar Generator",
      "prompt": "Using a recursive CTE <code>days</code>, generate a sequence of calendar dates starting from '2024-01-01' through '2024-01-05' as <code>day_date</code> using SQLite's <code>date(day_date, '+1 day')</code>.",
      "starterSql": "WITH RECURSIVE days AS (\n  SELECT '2024-01-01' AS day_date\n)\nSELECT day_date FROM days;",
      "referenceSql": "WITH RECURSIVE days AS (\n  SELECT '2024-01-01' AS day_date\n  UNION ALL\n  SELECT date(day_date, '+1 day')\n  FROM   days\n  WHERE  day_date < '2024-01-05'\n)\nSELECT day_date\nFROM   days;",
      "solutionAudio": "Day14/New_Day14Question13sol.mp3"
    },
    {
      "id": 14,
      "title": "Executive vs Staff Payroll Rollup",
      "prompt": "Define a CTE <code>role_groups</code> classifying job titles as 'Leadership' if job_title contains 'Director' or 'Manager', and 'Staff' otherwise. Return <code>role_category</code>, <code>employee_count</code> (COUNT(*)), and <code>total_payroll</code> (SUM(salary)).",
      "starterSql": "WITH role_groups AS (\n  SELECT first_name, salary, job_title\n  FROM   employees\n)\nSELECT * FROM role_groups;",
      "referenceSql": "WITH role_groups AS (\n  SELECT first_name,\n         salary,\n         CASE\n           WHEN job_title LIKE '%Director%' OR job_title LIKE '%Manager%' THEN 'Leadership'\n           ELSE 'Staff'\n         END AS role_category\n  FROM   employees\n)\nSELECT   role_category,\n         COUNT(*) AS employee_count,\n         SUM(salary) AS total_payroll\nFROM     role_groups\nGROUP BY role_category;",
      "solutionAudio": "Day14/New_Day14Question14sol.mp3"
    },
    {
      "id": 15,
      "title": "Regional Revenue Rollup via CTE",
      "prompt": "Define a CTE <code>regional_sales</code> joining <code>customers</code> and <code>orders</code> to aggregate <code>region</code> and <code>regional_revenue</code> (SUM(total_amount)). Return <code>region</code> and <code>regional_revenue</code>, ordered by revenue descending.",
      "starterSql": "WITH regional_sales AS (\n  SELECT c.region, SUM(o.total_amount) AS regional_revenue\n  FROM   customers c\n  JOIN   orders o ON c.customer_id = o.customer_id\n  GROUP BY c.region\n)\nSELECT * FROM regional_sales;",
      "referenceSql": "WITH regional_sales AS (\n  SELECT   c.region,\n           SUM(o.total_amount) AS regional_revenue\n  FROM     customers c\n  JOIN     orders o ON c.customer_id = o.customer_id\n  GROUP BY c.region\n)\nSELECT   region,\n         regional_revenue\nFROM     regional_sales\nORDER BY regional_revenue DESC;",
      "solutionAudio": "Day14/New_Day14Question15sol.mp3"
    }
  ],
  "testQuestions": [
    {
      "id": 1,
      "type": "mcq",
      "question": "What keyword initiates a Common Table Expression (CTE) in SQL?",
      "options": [
        "WITH",
        "CREATE CTE",
        "DECLARE",
        "SUBQUERY"
      ],
      "answer": "WITH",
      "explanation": "CTEs are defined using the standard ANSI SQL WITH keyword.",
      "prompt": "What keyword initiates a Common Table Expression (CTE) in SQL?"
    },
    {
      "id": 2,
      "type": "mcq",
      "question": "What is the lifespan of a Common Table Expression?",
      "options": [
        "Strictly for the duration of the single query statement in which it is defined",
        "Throughout the user's database session",
        "Until the database restarts",
        "Permanently stored in catalog metadata"
      ],
      "answer": "Strictly for the duration of the single query statement in which it is defined",
      "explanation": "A CTE is session-less and transient, existing solely for the evaluation of the single query statement.",
      "prompt": "What is the lifespan of a Common Table Expression?"
    },
    {
      "id": 3,
      "type": "mcq",
      "question": "How do you separate multiple CTE definitions in a single WITH statement?",
      "options": [
        "With a comma (,)",
        "With the AND keyword",
        "With a semicolon (;)",
        "By repeating the WITH keyword"
      ],
      "answer": "With a comma (,)",
      "explanation": "Multiple CTEs are chained using a single comma without repeating the WITH keyword.",
      "prompt": "How do you separate multiple CTE definitions in a single WITH statement?"
    },
    {
      "id": 4,
      "type": "mcq",
      "question": "Can a CTE reference another CTE defined in the same query?",
      "options": [
        "Yes, provided the referenced CTE appears earlier in the statement",
        "No, CTEs are strictly isolated",
        "Only if declared as RECURSIVE",
        "Only in MySQL"
      ],
      "answer": "Yes, provided the referenced CTE appears earlier in the statement",
      "explanation": "Subsequent CTEs can reference any previously defined CTE in the same statement.",
      "prompt": "Can a CTE reference another CTE defined in the same query?"
    },
    {
      "id": 5,
      "type": "mcq",
      "question": "Which SQL keyword is required to enable self-referencing in a recursive CTE in PostgreSQL, SQLite, and MySQL?",
      "options": [
        "RECURSIVE (WITH RECURSIVE)",
        "LOOP",
        "ITERATE",
        "REPEAT"
      ],
      "answer": "RECURSIVE (WITH RECURSIVE)",
      "explanation": "Standard SQL requires WITH RECURSIVE to signal self-referencing query evaluation.",
      "prompt": "Which SQL keyword is required to enable self-referencing in a recursive CTE in PostgreSQL, SQLite, and MySQL?"
    },
    {
      "id": 6,
      "type": "mcq",
      "question": "What are the two mandatory members of a Recursive CTE?",
      "options": [
        "Anchor Member and Recursive Member",
        "Primary Query and Foreign Query",
        "Loop Header and Exit Predicate",
        "Root Node and Leaf Node"
      ],
      "answer": "Anchor Member and Recursive Member",
      "explanation": "A recursive CTE requires an Anchor member (base case) and a Recursive member combined by UNION ALL.",
      "prompt": "What are the two mandatory members of a Recursive CTE?"
    },
    {
      "id": 7,
      "type": "mcq",
      "question": "Which set operator is required to join the Anchor member and Recursive member in a recursive CTE?",
      "options": [
        "UNION ALL",
        "INTERSECT",
        "EXCEPT",
        "CROSS JOIN"
      ],
      "answer": "UNION ALL",
      "explanation": "Standard SQL mandates UNION ALL between the anchor and recursive query branches.",
      "prompt": "Which set operator is required to join the Anchor member and Recursive member in a recursive CTE?"
    },
    {
      "id": 8,
      "type": "mcq",
      "question": "What is the key difference between a CTE and a Temporary Table?",
      "options": [
        "A CTE exists only for one query and cannot be indexed; a temporary table persists across the session and can be indexed",
        "CTEs can only hold 100 rows",
        "Temporary tables cannot use WHERE clauses",
        "There is no difference"
      ],
      "answer": "A CTE exists only for one query and cannot be indexed; a temporary table persists across the session and can be indexed",
      "explanation": "Temporary tables are physical session-scoped storage structures with index capabilities; CTEs are inline query constructs.",
      "prompt": "What is the key difference between a CTE and a Temporary Table?"
    },
    {
      "id": 9,
      "type": "mcq",
      "question": "What happens if a recursive CTE lacks a proper termination condition in its WHERE clause?",
      "options": [
        "The query loops until the engine hits its maximum recursion limit or crashes with out-of-memory",
        "SQL automatically detects the loop and stops after 10 rows",
        "The query returns NULL",
        "SQL converts it to an INNER JOIN"
      ],
      "answer": "The query loops until the engine hits its maximum recursion limit or crashes with out-of-memory",
      "explanation": "Without a termination filter, the recursive step evaluates indefinitely until a safety threshold aborts execution.",
      "prompt": "What happens if a recursive CTE lacks a proper termination condition in its WHERE clause?"
    },
    {
      "id": 10,
      "type": "mcq",
      "question": "Can you reference the same CTE more than once in the main query?",
      "options": [
        "Yes, you can join or union the same CTE multiple times",
        "No, a CTE can only be consumed once",
        "Only in Oracle",
        "Only if it is recursive"
      ],
      "answer": "Yes, you can join or union the same CTE multiple times",
      "explanation": "Reusability is a key advantage of CTEs: one named calculation can be joined to itself or other tables repeatedly.",
      "prompt": "Can you reference the same CTE more than once in the main query?"
    },
    {
      "id": 11,
      "type": "mcq",
      "question": "What does WITH cte AS MATERIALIZED (...) do in PostgreSQL 12+?",
      "options": [
        "Forces PostgreSQL to execute the CTE once and store the result in memory as a temporary buffer",
        "Writes the CTE permanently to disk",
        "Encrypts the CTE",
        "Makes the CTE global across all users"
      ],
      "answer": "Forces PostgreSQL to execute the CTE once and store the result in memory as a temporary buffer",
      "explanation": "The MATERIALIZED keyword instructs the planner to materialize the CTE once rather than inlining it.",
      "prompt": "What does WITH cte AS MATERIALIZED (...) do in PostgreSQL 12+?"
    },
    {
      "id": 12,
      "type": "mcq",
      "question": "Can you use a CTE with an INSERT statement?",
      "options": [
        "Yes: WITH cte AS (...) INSERT INTO target SELECT * FROM cte;",
        "No, CTEs only support SELECT",
        "Only in SQL Server",
        "Only if target is empty"
      ],
      "answer": "Yes: WITH cte AS (...) INSERT INTO target SELECT * FROM cte;",
      "explanation": "CTEs can precede INSERT, UPDATE, or DELETE statements to supply dynamic candidate rows.",
      "prompt": "Can you use a CTE with an INSERT statement?"
    },
    {
      "id": 13,
      "type": "mcq",
      "question": "In what order does a database optimizer typically evaluate chained CTEs?",
      "options": [
        "The optimizer determines the most cost-effective execution plan, which may inline or reorder CTE evaluation",
        "Always strictly from top to bottom in lockstep",
        "Always from bottom to top",
        "Random order"
      ],
      "answer": "The optimizer determines the most cost-effective execution plan, which may inline or reorder CTE evaluation",
      "explanation": "Modern cost-based optimizers treat unmaterialized CTEs as relational views, optimizing across the entire query tree.",
      "prompt": "In what order does a database optimizer typically evaluate chained CTEs?"
    },
    {
      "id": 14,
      "type": "mcq",
      "question": "Why is ORDER BY generally forbidden inside a non-recursive CTE without a LIMIT clause?",
      "options": [
        "Because relational algebra defines intermediate datasets as unordered sets",
        "Because ORDER BY breaks indexes",
        "Because CTEs only store text",
        "Because SQL parsers reject keywords with more than 5 letters"
      ],
      "answer": "Because relational algebra defines intermediate datasets as unordered sets",
      "explanation": "Unless an explicit row slice (LIMIT) requires ordering, sorting intermediate results is computationally wasteful and ignored.",
      "prompt": "Why is ORDER BY generally forbidden inside a non-recursive CTE without a LIMIT clause?"
    },
    {
      "id": 15,
      "type": "mcq",
      "question": "How do you specify explicit column aliases in the CTE header?",
      "options": [
        "WITH cte_name (col1, col2) AS (SELECT ...)",
        "WITH cte_name ALIAS (col1, col2) AS (SELECT ...)",
        "WITH cte_name AS (col1, col2 := SELECT ...)",
        "WITH (col1, col2) cte_name AS (...)"
      ],
      "answer": "WITH cte_name (col1, col2) AS (SELECT ...)",
      "explanation": "Enclosing column names in parentheses directly following the CTE identifier defines explicit output column names.",
      "prompt": "How do you specify explicit column aliases in the CTE header?"
    },
    {
      "id": 16,
      "type": "mcq",
      "question": "Can a CTE be defined inside a subquery in modern PostgreSQL or SQLite?",
      "options": [
        "Yes, CTEs can be locally scoped within subqueries",
        "No, WITH can only appear as the absolute first word of a file",
        "Only in stored procedures",
        "Only with views"
      ],
      "answer": "Yes, CTEs can be locally scoped within subqueries",
      "explanation": "Modern SQL engines support nested WITH clauses scoped to individual subquery expressions.",
      "prompt": "Can a CTE be defined inside a subquery in modern PostgreSQL or SQLite?"
    },
    {
      "id": 17,
      "type": "mcq",
      "question": "What is the primary use case of a recursive CTE in data analytics?",
      "options": [
        "Traversing hierarchies such as org charts, product category trees, and bill-of-materials",
        "Speeding up simple SELECT queries",
        "Replacing primary keys",
        "Creating database backups"
      ],
      "answer": "Traversing hierarchies such as org charts, product category trees, and bill-of-materials",
      "explanation": "Recursive CTEs provide the relational mechanism to traverse variable-depth parent-child trees.",
      "prompt": "What is the primary use case of a recursive CTE in data analytics?"
    },
    {
      "id": 18,
      "type": "mcq",
      "question": "How do you generate a series of dates using a recursive CTE in SQLite?",
      "options": [
        "Start with an anchor date and recursively apply date(day, '+1 day') with a WHERE cutoff",
        "Using the GENERATE_SERIES function only",
        "Using a CROSS JOIN on customers",
        "Dates cannot be generated recursively"
      ],
      "answer": "Start with an anchor date and recursively apply date(day, '+1 day') with a WHERE cutoff",
      "explanation": "SQLite's date modifier functions combined with recursive increments cleanly generate date calendars.",
      "prompt": "How do you generate a series of dates using a recursive CTE in SQLite?"
    },
    {
      "id": 19,
      "type": "mcq",
      "question": "What is an optimization fence in the context of CTEs?",
      "options": [
        "When the query optimizer cannot push predicates into the CTE, forcing it to materialize independently",
        "A firewall protecting database security",
        "An index constraint",
        "A memory quota"
      ],
      "answer": "When the query optimizer cannot push predicates into the CTE, forcing it to materialize independently",
      "explanation": "An optimization fence prevents the planner from optimizing across the CTE boundary, which can be good or bad depending on the query.",
      "prompt": "What is an optimization fence in the context of CTEs?"
    },
    {
      "id": 20,
      "type": "mcq",
      "question": "Why do enterprise engineering teams often mandate CTEs over nested subqueries in SQL style guides?",
      "options": [
        "CTEs make complex SQL dramatically easier to read, review, test, and maintain in team environments",
        "CTEs consume 50% less RAM",
        "CTEs bypass database permissions",
        "CTEs compile to C code"
      ],
      "answer": "CTEs make complex SQL dramatically easier to read, review, test, and maintain in team environments",
      "explanation": "Maintainability and self-documenting linear code flow make CTEs the gold standard in production SQL engineering.",
      "prompt": "Why do enterprise engineering teams often mandate CTEs over nested subqueries in SQL style guides?"
    },
    {
      "id": 21,
      "type": "code",
      "question": "Write a query using a CTE named `avg_sal` returning `first_name` and `salary` for employees earning above company average.",
      "answer": "WITH avg_sal AS (SELECT AVG(salary) AS avg FROM employees) SELECT first_name, salary FROM employees, avg_sal WHERE salary > avg_sal.avg;",
      "prompt": "Write a query using a CTE named `avg_sal` returning `first_name` and `salary` for employees earning above company average.",
      "ref": "WITH avg_sal AS (SELECT AVG(salary) AS avg FROM employees) SELECT first_name, salary FROM employees, avg_sal WHERE salary > avg_sal.avg;"
    },
    {
      "id": 22,
      "type": "code",
      "question": "Write a query using a CTE named `dept_summary` computing `department_id` and total payroll as `dept_payroll`.",
      "answer": "WITH dept_summary AS (SELECT department_id, SUM(salary) AS dept_payroll FROM employees GROUP BY department_id) SELECT department_id, dept_payroll FROM dept_summary;",
      "prompt": "Write a query using a CTE named `dept_summary` computing `department_id` and total payroll as `dept_payroll`.",
      "ref": "WITH dept_summary AS (SELECT department_id, SUM(salary) AS dept_payroll FROM employees GROUP BY department_id) SELECT department_id, dept_payroll FROM dept_summary;"
    },
    {
      "id": 23,
      "type": "code",
      "question": "Write a recursive CTE named `nums` generating numbers from 1 to 5 as `num`.",
      "answer": "WITH RECURSIVE nums AS (SELECT 1 AS num UNION ALL SELECT num + 1 FROM nums WHERE num < 5) SELECT num FROM nums;",
      "prompt": "Write a recursive CTE named `nums` generating numbers from 1 to 5 as `num`.",
      "ref": "WITH RECURSIVE nums AS (SELECT 1 AS num UNION ALL SELECT num + 1 FROM nums WHERE num < 5) SELECT num FROM nums;"
    },
    {
      "id": 24,
      "type": "code",
      "question": "Write a query using a CTE `big_orders` filtering orders where `total_amount >= 50000`, returning `order_id` and `total_amount`.",
      "answer": "WITH big_orders AS (SELECT order_id, total_amount FROM orders WHERE total_amount >= 50000) SELECT order_id, total_amount FROM big_orders;",
      "prompt": "Write a query using a CTE `big_orders` filtering orders where `total_amount >= 50000`, returning `order_id` and `total_amount`.",
      "ref": "WITH big_orders AS (SELECT order_id, total_amount FROM orders WHERE total_amount >= 50000) SELECT order_id, total_amount FROM big_orders;"
    },
    {
      "id": 25,
      "type": "code",
      "question": "Write a query chaining two CTEs: `step1` selecting `customer_id`, and `step2` selecting `customer_id` from `step1`.",
      "answer": "WITH step1 AS (SELECT customer_id FROM customers), step2 AS (SELECT customer_id FROM step1) SELECT customer_id FROM step2;",
      "prompt": "Write a query chaining two CTEs: `step1` selecting `customer_id`, and `step2` selecting `customer_id` from `step1`.",
      "ref": "WITH step1 AS (SELECT customer_id FROM customers), step2 AS (SELECT customer_id FROM step1) SELECT customer_id FROM step2;"
    }
  ]
};
