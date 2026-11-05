if (!window.COURSE_CONTENT) window.COURSE_CONTENT = {};
window.COURSE_CONTENT['day13'] = {
  "day": 13,
  "title": "Subqueries & Correlated Queries",
  "db": "retail",
  "emoji": "🧠",
  "slides": [
    {
      "title": "Subqueries — Queries Within Queries",
      "duration": "07:35",
      "html": "<h2>🧠 Subqueries — Queries Within Queries</h2>\n\n        <!-- ── Section 01: What Is a Subquery? ── -->\n        <div class=\"slide-section\" id=\"day13WhatSection\">\n          <h3 class=\"heading-with-audio\" id=\"day13What\">\n            01. What Is a Subquery?\n          </h3>\n          <p>A <strong>subquery</strong> (also called an <em>inner query</em> or <em>nested query</em>) is a complete <code>SELECT</code> statement embedded within an outer SQL statement. The outer query consumes the inner query's output as an input value, list, or virtual table.</p>\n        </div>\n\n        <div class=\"slide-section\" id=\"day13RefTableSection\">\n          <div class=\"db-mock-table-wrap\" id=\"day13RefTable\">\n            <div style=\"display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 6px; padding: 0 4px;\">\n              <h4 style=\"margin: 0; font-size: 1.0rem; font-weight: 800; letter-spacing: -0.015em; flex: 1;\">The 4 Primary Types of Subqueries</h4>\n            </div>\n            <table class=\"db-table-mock db-table-mock--compact\">\n              <thead><tr><th>Subquery Type</th><th>Returns</th><th>Common Location</th><th>Key Operators</th></tr></thead>\n              <tbody>\n                <tr id=\"day13Row1\"><td><strong>Scalar</strong></td><td>Single value (1 row, 1 col)</td><td><code>SELECT</code>, <code>WHERE</code>, <code>HAVING</code></td><td><code>=</code>, <code>&gt;</code>, <code>&lt;</code>, <code>!=</code></td></tr>\n                <tr id=\"day13Row2\"><td><strong>Multi-Row</strong></td><td>Single column, multiple rows</td><td><code>WHERE</code>, <code>HAVING</code></td><td><code>IN</code>, <code>NOT IN</code>, <code>ANY</code>, <code>ALL</code></td></tr>\n                <tr id=\"day13Row3\"><td><strong>Derived Table</strong></td><td>Multiple rows &amp; columns</td><td><code>FROM</code>, <code>JOIN</code></td><td>Must be aliased with <code>AS</code></td></tr>\n                <tr id=\"day13Row4\"><td><strong>Correlated</strong></td><td>Depends on outer query row</td><td><code>WHERE</code>, <code>SELECT</code></td><td><code>EXISTS</code>, <code>NOT EXISTS</code>, <code>&gt;</code></td></tr>\n              </tbody>\n            </table>\n          </div>\n        </div>\n\n        <!-- ── Section 02: Scalar Subqueries ── -->\n        <div class=\"slide-section\" id=\"day13ScalarSection\">\n          <h3 class=\"heading-with-audio\" id=\"day13Scalar\">\n            02. Scalar Subqueries in WHERE &amp; SELECT\n          </h3>\n          <p>A <strong>Scalar Subquery</strong> evaluates to exactly one solitary scalar value (one row, one column). You can place it anywhere a numeric, date, or text literal is valid.</p>\n        </div>\n\n        <div class=\"slide-section\" id=\"day13ScalarCodeSection\">\n          <div class=\"heading-with-audio\" style=\"display: flex; align-items: center; gap: 8px; margin-bottom: 6px; margin-top: 4px;\">\n            <h4 style=\"margin: 0; font-size: 1.0rem; font-weight: 800; letter-spacing: -0.015em; flex: 1;\">Query 1 — Benchmarking with Scalar Subqueries</h4>\n          </div>\n          <div class=\"code-block-container\" id=\"day13ScalarCode\">\n            <div class=\"code-subblock\" id=\"day13ScalarQuery1\">\n              <pre><code><span class=\"code-comment\">-- 1. Employees earning above the company-wide average salary</span>\n<span class=\"kw\">SELECT</span> first_name,\n       salary\n<span class=\"kw\">FROM</span>   employees\n<span class=\"kw\">WHERE</span>  salary > (<span class=\"kw\">SELECT</span> AVG(salary) <span class=\"kw\">FROM</span> employees);</code></pre>\n            </div>\n            <div class=\"code-subblock\" id=\"day13ScalarQuery2\">\n              <pre><code><span class=\"code-comment\">-- 2. Calculating salary variance from benchmark in SELECT</span>\n<span class=\"kw\">SELECT</span> first_name,\n       salary,\n       ROUND(salary - (<span class=\"kw\">SELECT</span> AVG(salary) <span class=\"kw\">FROM</span> employees), 2) <span class=\"kw\">AS</span> variance\n<span class=\"kw\">FROM</span>   employees\n<span class=\"kw\">ORDER BY</span> variance <span class=\"kw\">DESC</span>;</code></pre>\n            </div>\n          </div>\n        </div>\n\n        <!-- ── Section 03: Multi-Row Subqueries ── -->\n        <div class=\"slide-section\" id=\"day13MultiRowSection\">\n          <h3 class=\"heading-with-audio\" id=\"day13MultiRow\">\n            03. Multi-Row Subqueries with IN &amp; NOT IN\n          </h3>\n          <p>When the inner query returns a list of values across multiple rows, standard equality (<code>=</code>) will throw an error. Use the <code>IN</code> or <code>NOT IN</code> operators to test set membership.</p>\n        </div>\n\n        <div class=\"slide-section\" id=\"day13MultiRowCodeSection\">\n          <div class=\"heading-with-audio\" style=\"display: flex; align-items: center; gap: 8px; margin-bottom: 6px; margin-top: 4px;\">\n            <h4 style=\"margin: 0; font-size: 1.0rem; font-weight: 800; letter-spacing: -0.015em; flex: 1;\">Query 2 — Multi-Row Set Membership</h4>\n          </div>\n          <div class=\"code-block-container\" id=\"day13MultiRowCode\">\n            <div class=\"code-subblock\" id=\"day13MultiRowQuery1\">\n              <pre><code><span class=\"code-comment\">-- Customers who have placed at least one order</span>\n<span class=\"kw\">SELECT</span> customer_id,\n       first_name,\n       email\n<span class=\"kw\">FROM</span>   customers\n<span class=\"kw\">WHERE</span>  customer_id <span class=\"kw\">IN</span> (\n         <span class=\"kw\">SELECT DISTINCT</span> customer_id\n         <span class=\"kw\">FROM</span>   orders\n       );</code></pre>\n            </div>\n          </div>\n        </div>\n\n        <!-- ── Section 04: Derived Tables (Subquery in FROM) ── -->\n        <div class=\"slide-section\" id=\"day13DerivedSection\">\n          <h3 class=\"heading-with-audio\" id=\"day13Derived\">\n            04. Subqueries in the FROM Clause (Derived Tables)\n          </h3>\n          <p>A subquery in the <code>FROM</code> clause creates an in-memory virtual dataset known as a <strong>Derived Table</strong> or <em>Inline View</em>. In standard ANSI SQL, every derived table <strong>must be assigned an alias</strong>.</p>\n        </div>\n\n        <div class=\"slide-section\" id=\"day13DerivedCodeSection\">\n          <div class=\"heading-with-audio\" style=\"display: flex; align-items: center; gap: 8px; margin-bottom: 6px; margin-top: 4px;\">\n            <h4 style=\"margin: 0; font-size: 1.0rem; font-weight: 800; letter-spacing: -0.015em; flex: 1;\">Query 3 — Two-Tier Department Aggregation</h4>\n          </div>\n          <div class=\"code-block-container\" id=\"day13DerivedCode\">\n            <div class=\"code-subblock\" id=\"day13DerivedQuery1\">\n              <pre><code><span class=\"code-comment\">-- Compute average of department total payrolls</span>\n<span class=\"kw\">SELECT</span> ROUND(AVG(dept_payroll), 2) <span class=\"kw\">AS</span> avg_dept_payroll\n<span class=\"kw\">FROM</span>   (\n         <span class=\"kw\">SELECT</span>   department_id,\n                  SUM(salary) <span class=\"kw\">AS</span> dept_payroll\n         <span class=\"kw\">FROM</span>     employees\n         <span class=\"kw\">GROUP BY</span> department_id\n       ) <span class=\"kw\">AS</span> summaries;</code></pre>\n            </div>\n          </div>\n        </div>\n\n        <!-- ── Section 05: Correlated Subqueries ── -->\n        <div class=\"slide-section\" id=\"day13CorrelatedSection\">\n          <h3 class=\"heading-with-audio\" id=\"day13Correlated\">\n            05. Correlated Subqueries — Row-by-Row Execution\n          </h3>\n          <p>A <strong>Correlated Subquery</strong> references columns from the enclosing outer query. Unlike non-correlated subqueries that execute just once, a correlated subquery is evaluated dynamically <em>once per candidate row</em> of the outer query.</p>\n        </div>\n\n        <div class=\"slide-section\" id=\"day13CorrelatedCodeSection\">\n          <div class=\"heading-with-audio\" style=\"display: flex; align-items: center; gap: 8px; margin-bottom: 6px; margin-top: 4px;\">\n            <h4 style=\"margin: 0; font-size: 1.0rem; font-weight: 800; letter-spacing: -0.015em; flex: 1;\">Query 4 — Above-Department-Average Earners</h4>\n          </div>\n          <div class=\"code-block-container\" id=\"day13CorrelatedCode\">\n            <div class=\"code-subblock\" id=\"day13CorrelatedQuery1\">\n              <pre><code><span class=\"code-comment\">-- Employees earning more than THEIR OWN department's average</span>\n<span class=\"kw\">SELECT</span> first_name,\n       salary,\n       department_id\n<span class=\"kw\">FROM</span>   employees <span class=\"kw\">AS</span> e1\n<span class=\"kw\">WHERE</span>  salary > (\n         <span class=\"kw\">SELECT</span> AVG(salary)\n         <span class=\"kw\">FROM</span>   employees <span class=\"kw\">AS</span> e2\n         <span class=\"kw\">WHERE</span>  e2.department_id = e1.department_id\n       );</code></pre>\n            </div>\n          </div>\n        </div>\n\n        <!-- ── Section 06: EXISTS & NOT EXISTS ── -->\n        <div class=\"slide-section\" id=\"day13ExistsSection\">\n          <h3 class=\"heading-with-audio\" id=\"day13Exists\">\n            06. The EXISTS &amp; NOT EXISTS Predicates\n          </h3>\n          <p>The <code>EXISTS</code> operator evaluates whether an inner correlated query returns <strong>at least one row</strong>. It short-circuits on the first found match, returning <code>TRUE</code> immediately without reading additional records.</p>\n        </div>\n\n        <div class=\"slide-section\" id=\"day13ExistsCodeSection\">\n          <div class=\"heading-with-audio\" style=\"display: flex; align-items: center; gap: 8px; margin-bottom: 6px; margin-top: 4px;\">\n            <h4 style=\"margin: 0; font-size: 1.0rem; font-weight: 800; letter-spacing: -0.015em; flex: 1;\">Query 5 — Customer Audit with NOT EXISTS</h4>\n          </div>\n          <div class=\"code-block-container\" id=\"day13ExistsCode\">\n            <div class=\"code-subblock\" id=\"day13ExistsQuery1\">\n              <pre><code><span class=\"code-comment\">-- Customers who have NEVER placed an order</span>\n<span class=\"kw\">SELECT</span> c.customer_id,\n       c.first_name\n<span class=\"kw\">FROM</span>   customers <span class=\"kw\">AS</span> c\n<span class=\"kw\">WHERE  NOT EXISTS</span> (\n         <span class=\"kw\">SELECT</span> 1\n         <span class=\"kw\">FROM</span>   orders <span class=\"kw\">AS</span> o\n         <span class=\"kw\">WHERE</span>  o.customer_id = c.customer_id\n       );</code></pre>\n            </div>\n          </div>\n        </div>\n\n        <!-- ── Section 07: The NOT IN NULL Trap ── -->\n        <div class=\"slide-section\" id=\"day13NullTrapSection\">\n          <div class=\"warn-box\" id=\"day13NullTrap\">\n            <div style=\"display: flex; align-items: center; gap: 8px; margin-bottom: 4px; width: 100%;\">\n              <strong style=\"color:var(--ink-amber); flex: 1;\">⚠️ The Fatal NOT IN with NULL Trap:</strong>\n            </div>\n            <p style=\"margin: 0;\">In SQL three-valued logic, if the subquery for <code>NOT IN</code> returns even a <strong>single NULL value</strong>, the comparison expression evaluates to <code>UNKNOWN</code> for every candidate row. The query will silently return <strong>0 rows</strong>! Always use <code>NOT EXISTS</code> or explicitly add <code>WHERE col IS NOT NULL</code> to the inner query.</p>\n          </div>\n        </div>\n\n        <!-- ── Section 08: Top 25 Interview Q&A ── -->\n        <div class=\"slide-section\" id=\"day13QASection\">\n          <div class=\"interview-box\">\n            <h4 id=\"day13QAHeading\" style=\"margin: 0 0 12px 0; font-size: 1rem; color: #38bdf8; display: flex; align-items: center; gap: 6px;\">\n              <span>🎯</span> Top 25 SQL Interview Q&amp;A — Subqueries\n            </h4>\n\n            <div id=\"day13QA1\">\n              <p><strong>Q1: What is a Subquery in SQL?</strong></p>\n              <p><em>A: A subquery (inner query) is a complete SELECT statement nested within another SQL statement (SELECT, INSERT, UPDATE, or DELETE). The outer query consumes its results.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day13QA2\">\n              <p><strong>Q2: What is the difference between a Correlated and Non-Correlated Subquery?</strong></p>\n              <p><em>A: A non-correlated subquery is completely independent of the outer query; it executes once and passes its fixed result set to the outer query. A correlated subquery references columns from the outer table and re-executes once per candidate row of the outer query.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day13QA3\">\n              <p><strong>Q3: What does a Scalar Subquery return?</strong></p>\n              <p><em>A: Exactly one row and one column (a single atomic value). It can be used anywhere a literal expression or column name is valid.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day13QA4\">\n              <p><strong>Q4: Why does NOT IN return zero rows when the inner subquery contains a NULL?</strong></p>\n              <p><em>A: Because <code>x NOT IN (1, 2, NULL)</code> expands to <code>x != 1 AND x != 2 AND x != NULL</code>. In SQL three-valued logic, <code>x != NULL</code> evaluates to UNKNOWN. Since AND with UNKNOWN cannot be TRUE, the predicate fails for every row.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day13QA5\">\n              <p><strong>Q5: What is the advantage of EXISTS over IN for large subqueries?</strong></p>\n              <p><em>A: <code>EXISTS</code> short-circuits: it stops reading the inner table as soon as the first matching record is found. <code>IN</code> typically materializes the complete distinct result set before evaluating. Additionally, <code>NOT EXISTS</code> handles NULLs safely.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day13QA6\">\n              <p><strong>Q6: Why must a subquery in the FROM clause have an alias?</strong></p>\n              <p><em>A: In standard ANSI SQL, a subquery in the FROM clause creates a Derived Table (virtual inline view). The SQL engine requires a table alias to resolve column references unambiguously.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day13QA7\">\n              <p><strong>Q7: What happens if a Scalar Subquery returns more than one row?</strong></p>\n              <p><em>A: The database halts execution with a runtime error: \"Subquery returns more than 1 row\" (or \"scalar subquery produced more than one element\").</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day13QA8\">\n              <p><strong>Q8: Can a subquery be used inside an UPDATE statement?</strong></p>\n              <p><em>A: Yes. You can set column values equal to a scalar subquery or use multi-row subqueries in the WHERE clause to selectively filter records being modified.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day13QA9\">\n              <p><strong>Q9: What is the difference between IN and = ANY?</strong></p>\n              <p><em>A: In SQL, <code>IN</code> and <code>= ANY</code> are syntactically and semantically identical. However, <code>ANY</code> can also be combined with inequalities (such as <code>&gt; ANY</code> or <code>&lt; ANY</code>).</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day13QA10\">\n              <p><strong>Q10: What does the ALL operator do with a subquery?</strong></p>\n              <p><em>A: <code>WHERE salary &gt; ALL (SELECT salary FROM ...)</code> requires the condition to be true against every single value returned by the inner query (effectively equivalent to <code>salary &gt; MAX(salary)</code>).</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day13QA11\">\n              <p><strong>Q11: Can a subquery appear in the HAVING clause?</strong></p>\n              <p><em>A: Yes. For example, <code>HAVING AVG(salary) &gt; (SELECT AVG(salary) FROM employees)</code> compares each group's aggregate metric against a company-wide benchmark.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day13QA12\">\n              <p><strong>Q12: How do query optimizers optimize correlated subqueries?</strong></p>\n              <p><em>A: Modern query planners often \"decorrelate\" the query, transforming the correlated subquery into an equivalent <code>INNER JOIN</code> or <code>LEFT JOIN</code> with group-by aggregation to avoid O(N²) nested loops.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day13QA13\">\n              <p><strong>Q13: What does SELECT 1 inside an EXISTS subquery do?</strong></p>\n              <p><em>A: <code>EXISTS</code> only checks for the existence of rows, ignoring projected column values entirely. <code>SELECT 1</code> is a developer convention indicating that the returned columns are irrelevant.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day13QA14\">\n              <p><strong>Q14: How can you find the N-th highest salary using a subquery?</strong></p>\n              <p><em>A: Using a correlated subquery: <code>SELECT salary FROM employees e1 WHERE (N-1) = (SELECT COUNT(DISTINCT salary) FROM employees e2 WHERE e2.salary &gt; e1.salary);</code></em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day13QA15\">\n              <p><strong>Q15: What is a multi-column subquery?</strong></p>\n              <p><em>A: A subquery that returns tuples of multiple columns: <code>WHERE (dept_id, role) IN (SELECT dept_id, role FROM ...)</code>. Supported in PostgreSQL, MySQL, and SQLite.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day13QA16\">\n              <p><strong>Q16: Can a subquery contain an ORDER BY clause?</strong></p>\n              <p><em>A: Generally yes, but it is meaningless unless paired with <code>LIMIT</code> or <code>TOP</code>. Without a limit, standard relational algebra treats intermediate subquery results as unordered sets.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day13QA17\">\n              <p><strong>Q17: What is the maximum nesting depth for subqueries in SQL?</strong></p>\n              <p><em>A: SQL Server allows up to 32 levels; Oracle and PostgreSQL allow hundreds depending on available memory. However, nesting beyond 3 levels makes queries unmaintainable; use CTEs instead.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day13QA18\">\n              <p><strong>Q18: What is an Anti-Join and how can it be written using subqueries?</strong></p>\n              <p><em>A: An Anti-Join returns rows from Table A that have no matching rows in Table B. It can be written as <code>WHERE NOT EXISTS (SELECT 1 FROM B WHERE B.id = A.id)</code>.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day13QA19\">\n              <p><strong>Q19: How do subqueries differ from Common Table Expressions (CTEs)?</strong></p>\n              <p><em>A: Subqueries are embedded inline inside the query. CTEs are defined at the top using <code>WITH</code>, can be referenced multiple times, and support recursive execution.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day13QA20\">\n              <p><strong>Q20: Why can a subquery in SELECT be dangerous for query performance?</strong></p>\n              <p><em>A: If correlated, the scalar subquery in the SELECT list executes once for every single row in the outer query, creating an O(N) execution penalty on large tables.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day13QA21\">\n              <p><strong>Q21: How do you find employees earning more than the company average?</strong></p>\n              <p><em>A: <code>SELECT first_name, salary FROM employees WHERE salary &gt; (SELECT AVG(salary) FROM employees);</code></em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day13QA22\">\n              <p><strong>Q22: How do you find customers who have placed at least one order using IN?</strong></p>\n              <p><em>A: <code>SELECT customer_id, first_name FROM customers WHERE customer_id IN (SELECT DISTINCT customer_id FROM orders);</code></em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day13QA23\">\n              <p><strong>Q23: How do you verify customer activity using EXISTS?</strong></p>\n              <p><em>A: <code>SELECT customer_id, first_name FROM customers c WHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.customer_id);</code></em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day13QA24\">\n              <p><strong>Q24: How do you find the single highest paid employee across a company?</strong></p>\n              <p><em>A: <code>SELECT first_name, job_title, salary FROM employees WHERE salary = (SELECT MAX(salary) FROM employees);</code></em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day13QA25\">\n              <p><strong>Q25: How do you find employees earning more than their own department average?</strong></p>\n              <p><em>A: <code>SELECT first_name, salary FROM employees e1 WHERE salary &gt; (SELECT AVG(salary) FROM employees e2 WHERE e2.department_id = e1.department_id);</code></em></p>\n            </div>\n          </div>\n        </div>"
    }
  ],
  "practiceQuestions": [
    {
      "id": 1,
      "title": "Above Average Earners",
      "prompt": "Find all employees who earn more than the company-wide average salary. Return <code>first_name</code>, <code>last_name</code>, and <code>salary</code>, ordered by <code>salary</code> descending.",
      "starterSql": "SELECT first_name,\n       last_name,\n       salary\nFROM   employees;",
      "referenceSql": "SELECT first_name,\n       last_name,\n       salary\nFROM   employees\nWHERE  salary > (SELECT AVG(salary) FROM employees)\nORDER BY salary DESC;",
      "solutionAudio": "Day13/New_Day13Question01sol.mp3"
    },
    {
      "id": 2,
      "title": "Salary Variance from Company Benchmark",
      "prompt": "For each employee, calculate their salary difference from the company average: <code>ROUND(salary - (SELECT AVG(salary) FROM employees), 2) AS variance</code>. Return <code>first_name</code>, <code>salary</code>, and <code>variance</code>, ordered by variance descending.",
      "starterSql": "SELECT first_name,\n       salary\nFROM   employees;",
      "referenceSql": "SELECT first_name,\n       salary,\n       ROUND(salary - (SELECT AVG(salary) FROM employees), 2) AS variance\nFROM   employees\nORDER BY variance DESC;",
      "solutionAudio": "Day13/New_Day13Question02sol.mp3"
    },
    {
      "id": 3,
      "title": "Purchasing Customers via IN",
      "prompt": "Return <code>customer_id</code>, <code>first_name</code>, and <code>email</code> for customers who appear in the <code>orders</code> table using a multi-row <code>IN</code> subquery, ordered by <code>customer_id</code>.",
      "starterSql": "SELECT customer_id,\n       first_name,\n       email\nFROM   customers;",
      "referenceSql": "SELECT customer_id,\n       first_name,\n       email\nFROM   customers\nWHERE  customer_id IN (SELECT DISTINCT customer_id FROM orders)\nORDER BY customer_id;",
      "solutionAudio": "Day13/New_Day13Question03sol.mp3"
    },
    {
      "id": 4,
      "title": "Products in Shipped Orders",
      "prompt": "Return <code>name</code> and <code>unit_price</code> for products whose <code>product_id</code> is found in <code>order_items</code> where the parent order's status is 'Shipped'.",
      "starterSql": "SELECT name,\n       unit_price\nFROM   products;",
      "referenceSql": "SELECT name,\n       unit_price\nFROM   products\nWHERE  product_id IN (\n         SELECT oi.product_id\n         FROM   order_items oi\n         JOIN   orders o ON oi.order_id = o.order_id\n         WHERE  o.status = 'Shipped'\n       );",
      "solutionAudio": "Day13/New_Day13Question04sol.mp3"
    },
    {
      "id": 5,
      "title": "Inactive Customers via NOT IN",
      "prompt": "Return <code>customer_id</code> and <code>first_name</code> for customers who have never placed an order using <code>NOT IN</code>. Guard against NULL values by adding <code>WHERE customer_id IS NOT NULL</code> to the subquery.",
      "starterSql": "SELECT customer_id,\n       first_name\nFROM   customers;",
      "referenceSql": "SELECT customer_id,\n       first_name\nFROM   customers\nWHERE  customer_id NOT IN (\n         SELECT customer_id\n         FROM   orders\n         WHERE  customer_id IS NOT NULL\n       );",
      "solutionAudio": "Day13/New_Day13Question05sol.mp3"
    },
    {
      "id": 6,
      "title": "Department Max Salary via Correlated SELECT",
      "prompt": "Return <code>first_name</code>, <code>salary</code>, <code>department_id</code>, and the maximum salary in that employee's department as <code>dept_max_salary</code> using a correlated subquery in the <code>SELECT</code> list.",
      "starterSql": "SELECT e1.first_name,\n       e1.salary,\n       e1.department_id\nFROM   employees e1;",
      "referenceSql": "SELECT e1.first_name,\n       e1.salary,\n       e1.department_id,\n       (SELECT MAX(e2.salary)\n        FROM   employees e2\n        WHERE  e2.department_id = e1.department_id) AS dept_max_salary\nFROM   employees e1;",
      "solutionAudio": "Day13/New_Day13Question06sol.mp3"
    },
    {
      "id": 7,
      "title": "Above Departmental Average Earners",
      "prompt": "Return <code>first_name</code>, <code>salary</code>, and <code>department_id</code> for employees who earn more than the average salary of their own department using a correlated subquery in the <code>WHERE</code> clause.",
      "starterSql": "SELECT first_name,\n       salary,\n       department_id\nFROM   employees e1;",
      "referenceSql": "SELECT first_name,\n       salary,\n       department_id\nFROM   employees e1\nWHERE  salary > (\n         SELECT AVG(salary)\n         FROM   employees e2\n         WHERE  e2.department_id = e1.department_id\n       );",
      "solutionAudio": "Day13/New_Day13Question07sol.mp3"
    },
    {
      "id": 8,
      "title": "Average of Department Payrolls (Derived Table)",
      "prompt": "Calculate the average of total department payrolls as <code>avg_dept_payroll</code> rounded to 2 decimal places using a derived table in the <code>FROM</code> clause.",
      "starterSql": "SELECT ROUND(AVG(dept_payroll), 2) AS avg_dept_payroll\nFROM   (SELECT 1);",
      "referenceSql": "SELECT ROUND(AVG(dept_payroll), 2) AS avg_dept_payroll\nFROM   (\n         SELECT   department_id,\n                  SUM(salary) AS dept_payroll\n         FROM     employees\n         GROUP BY department_id\n       ) AS summaries;",
      "solutionAudio": "Day13/New_Day13Question08sol.mp3"
    },
    {
      "id": 9,
      "title": "Highest Paid Company Employee",
      "prompt": "Return <code>first_name</code>, <code>job_title</code>, and <code>salary</code> for the employee who earns the absolute maximum salary in the company using a scalar subquery.",
      "starterSql": "SELECT first_name,\n       job_title,\n       salary\nFROM   employees;",
      "referenceSql": "SELECT first_name,\n       job_title,\n       salary\nFROM   employees\nWHERE  salary = (SELECT MAX(salary) FROM employees);",
      "solutionAudio": "Day13/New_Day13Question09sol.mp3"
    },
    {
      "id": 10,
      "title": "Verify Active Buyers with EXISTS",
      "prompt": "Return <code>customer_id</code> and <code>first_name</code> for customers where at least one order exists in the <code>orders</code> table using the correlated <code>EXISTS</code> operator.",
      "starterSql": "SELECT customer_id,\n       first_name\nFROM   customers c;",
      "referenceSql": "SELECT customer_id,\n       first_name\nFROM   customers c\nWHERE  EXISTS (\n         SELECT 1\n         FROM   orders o\n         WHERE  o.customer_id = c.customer_id\n       );",
      "solutionAudio": "Day13/New_Day13Question10sol.mp3"
    },
    {
      "id": 11,
      "title": "Audit Inactive Accounts with NOT EXISTS",
      "prompt": "Return <code>customer_id</code> and <code>first_name</code> for customers who have never placed an order using the correlated <code>NOT EXISTS</code> predicate.",
      "starterSql": "SELECT customer_id,\n       first_name\nFROM   customers c;",
      "referenceSql": "SELECT customer_id,\n       first_name\nFROM   customers c\nWHERE  NOT EXISTS (\n         SELECT 1\n         FROM   orders o\n         WHERE  o.customer_id = c.customer_id\n       );",
      "solutionAudio": "Day13/New_Day13Question11sol.mp3"
    },
    {
      "id": 12,
      "title": "Products Priced Above Category Average",
      "prompt": "Return <code>name</code>, <code>category_id</code>, and <code>unit_price</code> for products whose price is greater than the average unit price of their respective category using a correlated subquery.",
      "starterSql": "SELECT name,\n       category_id,\n       unit_price\nFROM   products p1;",
      "referenceSql": "SELECT name,\n       category_id,\n       unit_price\nFROM   products p1\nWHERE  unit_price > (\n         SELECT AVG(unit_price)\n         FROM   products p2\n         WHERE  p2.category_id = p1.category_id\n       );",
      "solutionAudio": "Day13/New_Day13Question12sol.mp3"
    },
    {
      "id": 13,
      "title": "Large Departments via IN with HAVING",
      "prompt": "Return <code>department_name</code> from <code>departments</code> where the department ID is in the set of departments with more than 2 employees.",
      "starterSql": "SELECT department_name\nFROM   departments;",
      "referenceSql": "SELECT department_name\nFROM   departments\nWHERE  department_id IN (\n         SELECT   department_id\n         FROM     employees\n         GROUP BY department_id\n         HAVING   COUNT(*) > 2\n       );",
      "solutionAudio": "Day13/New_Day13Question13sol.mp3"
    },
    {
      "id": 14,
      "title": "High-Volume Spenders via Derived Table",
      "prompt": "Using a derived table summarizing customer order totals, return <code>customer_id</code> and <code>total_spent</code> for customers whose combined order spending is 50000 or greater.",
      "starterSql": "SELECT customer_id,\n       total_spent\nFROM   (SELECT 1);",
      "referenceSql": "SELECT customer_id,\n       total_spent\nFROM   (\n         SELECT   customer_id,\n                  SUM(total_amount) AS total_spent\n         FROM     orders\n         GROUP BY customer_id\n       ) AS spenders\nWHERE  total_spent >= 50000;",
      "solutionAudio": "Day13/New_Day13Question14sol.mp3"
    },
    {
      "id": 15,
      "title": "Orders with Above-Average Item Quantities",
      "prompt": "Return distinct <code>order_id</code> from <code>order_items</code> for items where <code>qty</code> is strictly greater than the overall average item quantity across all order items.",
      "starterSql": "SELECT DISTINCT order_id\nFROM   order_items;",
      "referenceSql": "SELECT DISTINCT order_id\nFROM   order_items\nWHERE  qty > (SELECT AVG(qty) FROM order_items);",
      "solutionAudio": "Day13/New_Day13Question15sol.mp3"
    }
  ],
  "testQuestions": [
    {
      "id": 1,
      "type": "mcq",
      "question": "What is a Scalar Subquery?",
      "options": [
        "A subquery that returns a single value (1 row, 1 column)",
        "A subquery that runs in parallel across multiple CPUs",
        "A subquery that scales linearly with table size",
        "A subquery that returns multiple columns"
      ],
      "answer": "A subquery that returns a single value (1 row, 1 column)",
      "explanation": "A scalar subquery evaluates to a single cell value, allowing it to be used in expressions, SELECT columns, and WHERE comparisons.",
      "prompt": "What is a Scalar Subquery?"
    },
    {
      "id": 2,
      "type": "mcq",
      "question": "How does a Correlated Subquery differ from a Non-Correlated Subquery?",
      "options": [
        "A correlated subquery references columns from the outer query and executes once per outer row; non-correlated executes once",
        "A correlated subquery runs in memory while non-correlated writes to disk",
        "A correlated subquery cannot use aggregate functions",
        "Non-correlated subqueries only work in WHERE"
      ],
      "answer": "A correlated subquery references columns from the outer query and executes once per outer row; non-correlated executes once",
      "explanation": "Correlated subqueries depend on outer row attributes, making them row-by-row evaluations unless decorrelated by the database engine.",
      "prompt": "How does a Correlated Subquery differ from a Non-Correlated Subquery?"
    },
    {
      "id": 3,
      "type": "mcq",
      "question": "What happens if a Scalar Subquery produces 2 or more rows at runtime?",
      "options": [
        "SQL takes the first row and ignores the rest",
        "SQL raises a runtime error (Subquery returns more than 1 row)",
        "SQL automatically converts the rows to an array",
        "The comparison evaluates to NULL"
      ],
      "answer": "SQL raises a runtime error (Subquery returns more than 1 row)",
      "explanation": "Scalar subqueries must return at most 1 row and 1 column; returning multiple rows throws an immediate execution exception.",
      "prompt": "What happens if a Scalar Subquery produces 2 or more rows at runtime?"
    },
    {
      "id": 4,
      "type": "mcq",
      "question": "Why does WHERE col NOT IN (subquery) return zero rows if the subquery returns even a single NULL?",
      "options": [
        "Because NULL is converted to zero",
        "Because in SQL three-valued logic, col != NULL evaluates to UNKNOWN, making the entire AND condition fail",
        "Because NOT IN requires integer types",
        "Because the database halts on syntax error"
      ],
      "answer": "Because in SQL three-valued logic, col != NULL evaluates to UNKNOWN, making the entire AND condition fail",
      "explanation": "NOT IN tests equality against all elements. If any element is NULL, the result is UNKNOWN, and WHERE clauses discard UNKNOWN results.",
      "prompt": "Why does WHERE col NOT IN (subquery) return zero rows if the subquery returns even a single NULL?"
    },
    {
      "id": 5,
      "type": "mcq",
      "question": "Why is EXISTS generally faster than IN for large subqueries?",
      "options": [
        "EXISTS short-circuits as soon as the first matching record is found",
        "EXISTS uses hardware acceleration",
        "EXISTS runs without transactions",
        "IN creates temporary tables on disk"
      ],
      "answer": "EXISTS short-circuits as soon as the first matching record is found",
      "explanation": "EXISTS checks for boolean existence and stops scanning immediately upon finding the first match.",
      "prompt": "Why is EXISTS generally faster than IN for large subqueries?"
    },
    {
      "id": 6,
      "type": "mcq",
      "question": "What is required when writing a subquery in the FROM clause (Derived Table)?",
      "options": [
        "An explicit table alias",
        "A GROUP BY clause",
        "A temporary table name prefix",
        "A primary key"
      ],
      "answer": "An explicit table alias",
      "explanation": "ANSI SQL requires every derived table in the FROM clause to have a unique table alias.",
      "prompt": "What is required when writing a subquery in the FROM clause (Derived Table)?"
    },
    {
      "id": 7,
      "type": "mcq",
      "question": "What does the query SELECT 1 FROM table WHERE EXISTS (...) return if no rows match?",
      "options": [
        "An empty result set (0 rows)",
        "A single row with 0",
        "NULL",
        "An error"
      ],
      "answer": "An empty result set (0 rows)",
      "explanation": "If the WHERE EXISTS condition fails, zero rows pass the filter, resulting in an empty set.",
      "prompt": "What does the query SELECT 1 FROM table WHERE EXISTS (...) return if no rows match?"
    },
    {
      "id": 8,
      "type": "mcq",
      "question": "What operator is equivalent to = ANY (subquery)?",
      "options": [
        "IN",
        "ALL",
        "LIKE",
        "EXISTS"
      ],
      "answer": "IN",
      "explanation": "In SQL standard syntax, = ANY is logically identical to the IN operator.",
      "prompt": "What operator is equivalent to = ANY (subquery)?"
    },
    {
      "id": 9,
      "type": "mcq",
      "question": "What is the result of WHERE salary > ALL (SELECT salary FROM employees WHERE department_id = 10)?",
      "options": [
        "Finds employees whose salary is strictly greater than the maximum salary in department 10",
        "Finds employees whose salary is greater than the average salary",
        "Finds employees whose salary is greater than at least one employee in department 10",
        "Returns an error"
      ],
      "answer": "Finds employees whose salary is strictly greater than the maximum salary in department 10",
      "explanation": "> ALL requires the condition to hold true against every element in the subquery, which is equivalent to being greater than the maximum.",
      "prompt": "What is the result of WHERE salary > ALL (SELECT salary FROM employees WHERE department_id = 10)?"
    },
    {
      "id": 10,
      "type": "mcq",
      "question": "Can a subquery be placed inside a HAVING clause?",
      "options": [
        "Yes, to filter aggregated groups against a dynamic scalar benchmark",
        "No, HAVING only accepts aggregate function calls",
        "Only in MySQL",
        "Only if aliased in SELECT"
      ],
      "answer": "Yes, to filter aggregated groups against a dynamic scalar benchmark",
      "explanation": "HAVING AVG(col) > (SELECT AVG(col) FROM ...) is standard SQL for filtering grouped results against an aggregate benchmark.",
      "prompt": "Can a subquery be placed inside a HAVING clause?"
    },
    {
      "id": 11,
      "type": "mcq",
      "question": "In SELECT c.name, (SELECT COUNT(*) FROM orders o WHERE o.customer_id = c.id) AS cnt FROM customers c, how many times does the subquery execute?",
      "options": [
        "Once for each row in the customers table",
        "Exactly once for the entire query",
        "Zero times",
        "Twice"
      ],
      "answer": "Once for each row in the customers table",
      "explanation": "Because the subquery in the SELECT list correlates on c.id, it runs once per customer row.",
      "prompt": "In SELECT c.name, (SELECT COUNT(*) FROM orders o WHERE o.customer_id = c.id) AS cnt FROM customers c, how many times does the subquery execute?"
    },
    {
      "id": 12,
      "type": "mcq",
      "question": "What is the recommended alternative to NOT IN when handling nullable foreign keys?",
      "options": [
        "NOT EXISTS or LEFT JOIN ... WHERE right_table.key IS NULL",
        "UNION ALL",
        "INNER JOIN with HAVING",
        "CROSS JOIN"
      ],
      "answer": "NOT EXISTS or LEFT JOIN ... WHERE right_table.key IS NULL",
      "explanation": "Both NOT EXISTS and LEFT JOIN anti-joins handle NULL values predictably without the three-valued logic trap of NOT IN.",
      "prompt": "What is the recommended alternative to NOT IN when handling nullable foreign keys?"
    },
    {
      "id": 13,
      "type": "mcq",
      "question": "What does a subquery return if it matches 0 rows when used in a Scalar context (e.g. SELECT (SELECT max(salary) FROM employees WHERE 1=0))?",
      "options": [
        "NULL",
        "0",
        "An error",
        "False"
      ],
      "answer": "NULL",
      "explanation": "A scalar subquery that returns no rows evaluates cleanly to NULL.",
      "prompt": "What does a subquery return if it matches 0 rows when used in a Scalar context (e.g. SELECT (SELECT max(salary) FROM employees WHERE 1=0))?"
    },
    {
      "id": 14,
      "type": "mcq",
      "question": "Can you update a table using a subquery in SQL?",
      "options": [
        "Yes, subqueries can be used in UPDATE SET clauses and WHERE filters",
        "No, subqueries are strictly read-only SELECT tools",
        "Only in SQLite",
        "Only with stored procedures"
      ],
      "answer": "Yes, subqueries can be used in UPDATE SET clauses and WHERE filters",
      "explanation": "Subqueries can dynamically set new column values or identify candidate rows to update.",
      "prompt": "Can you update a table using a subquery in SQL?"
    },
    {
      "id": 15,
      "type": "mcq",
      "question": "What is a multi-column subquery?",
      "options": [
        "A subquery that returns multiple columns evaluated as row tuples (e.g. WHERE (a, b) IN (...))",
        "A subquery with multiple SELECT statements",
        "A query with two FROM clauses",
        "A query using UNION"
      ],
      "answer": "A subquery that returns multiple columns evaluated as row tuples (e.g. WHERE (a, b) IN (...))",
      "explanation": "Row constructor comparisons evaluate tuples of columns together against multi-column subquery results.",
      "prompt": "What is a multi-column subquery?"
    },
    {
      "id": 16,
      "type": "mcq",
      "question": "Why is SELECT 1 conventionally used inside an EXISTS subquery instead of column names?",
      "options": [
        "Because EXISTS only checks for row presence, making column projection irrelevant",
        "Because SELECT 1 bypasses index scans",
        "Because column names cause syntax errors in EXISTS",
        "Because 1 represents boolean TRUE"
      ],
      "answer": "Because EXISTS only checks for row presence, making column projection irrelevant",
      "explanation": "EXISTS ignores the SELECT expression list entirely; SELECT 1 clarifies that no column data is being transferred.",
      "prompt": "Why is SELECT 1 conventionally used inside an EXISTS subquery instead of column names?"
    },
    {
      "id": 17,
      "type": "mcq",
      "question": "Can a subquery reference columns from multiple levels of outer queries?",
      "options": [
        "Yes, inner queries can access outer column scopes within their enclosing hierarchy",
        "No, only the immediate parent query is accessible",
        "Only in PostgreSQL",
        "Only with CTEs"
      ],
      "answer": "Yes, inner queries can access outer column scopes within their enclosing hierarchy",
      "explanation": "SQL lexical scoping allows deeply nested subqueries to reference attributes from any enclosing parent level.",
      "prompt": "Can a subquery reference columns from multiple levels of outer queries?"
    },
    {
      "id": 18,
      "type": "mcq",
      "question": "What is decorrelation in database query optimization?",
      "options": [
        "When the query optimizer rewrites a correlated subquery into a JOIN to improve performance",
        "When subqueries are converted into temporary tables",
        "When subqueries are stripped of indexes",
        "When subqueries fail execution"
      ],
      "answer": "When the query optimizer rewrites a correlated subquery into a JOIN to improve performance",
      "explanation": "Optimizers decorrelate queries into relational joins to replace O(N²) nested loops with fast hash or merge joins.",
      "prompt": "What is decorrelation in database query optimization?"
    },
    {
      "id": 19,
      "type": "mcq",
      "question": "What happens if you use an ORDER BY clause inside a subquery without a LIMIT clause?",
      "options": [
        "In standard SQL, it is ignored because intermediate relations are unordered mathematical sets",
        "It causes a syntax error in all database engines",
        "It sorts the entire final query",
        "It speeds up subquery execution"
      ],
      "answer": "In standard SQL, it is ignored because intermediate relations are unordered mathematical sets",
      "explanation": "Relational algebra treats tables and subqueries as unordered sets unless explicitly limited or ranked.",
      "prompt": "What happens if you use an ORDER BY clause inside a subquery without a LIMIT clause?"
    },
    {
      "id": 20,
      "type": "mcq",
      "question": "What is a common symptom of an unindexed correlated subquery on a 1-million row table?",
      "options": [
        "Query execution time scales catastrophically as 1 million full table scans occur",
        "Memory overflow error immediately",
        "Automatic conversion to CROSS JOIN",
        "Data corruption in outer table"
      ],
      "answer": "Query execution time scales catastrophically as 1 million full table scans occur",
      "explanation": "Without indexes or decorrelation, evaluating the inner query for each outer row forces N full table scans.",
      "prompt": "What is a common symptom of an unindexed correlated subquery on a 1-million row table?"
    },
    {
      "id": 21,
      "type": "code",
      "question": "Write a query returning `first_name` and `salary` from `employees` where salary is greater than the company average salary.",
      "answer": "SELECT first_name, salary FROM employees WHERE salary > (SELECT AVG(salary) FROM employees);",
      "prompt": "Write a query returning `first_name` and `salary` from `employees` where salary is greater than the company average salary.",
      "ref": "SELECT first_name, salary FROM employees WHERE salary > (SELECT AVG(salary) FROM employees);"
    },
    {
      "id": 22,
      "type": "code",
      "question": "Write a query returning `customer_id` from `customers` who have placed at least one order using an `IN` subquery.",
      "answer": "SELECT customer_id FROM customers WHERE customer_id IN (SELECT DISTINCT customer_id FROM orders);",
      "prompt": "Write a query returning `customer_id` from `customers` who have placed at least one order using an `IN` subquery.",
      "ref": "SELECT customer_id FROM customers WHERE customer_id IN (SELECT DISTINCT customer_id FROM orders);"
    },
    {
      "id": 23,
      "type": "code",
      "question": "Write a query returning `customer_id` and `first_name` from `customers` who have orders using the `EXISTS` operator.",
      "answer": "SELECT customer_id, first_name FROM customers c WHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.customer_id);",
      "prompt": "Write a query returning `customer_id` and `first_name` from `customers` who have orders using the `EXISTS` operator.",
      "ref": "SELECT customer_id, first_name FROM customers c WHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.customer_id);"
    },
    {
      "id": 24,
      "type": "code",
      "question": "Write a query returning `name` and `unit_price` of the single most expensive product in `products` using a scalar subquery.",
      "answer": "SELECT name, unit_price FROM products WHERE unit_price = (SELECT MAX(unit_price) FROM products);",
      "prompt": "Write a query returning `name` and `unit_price` of the single most expensive product in `products` using a scalar subquery.",
      "ref": "SELECT name, unit_price FROM products WHERE unit_price = (SELECT MAX(unit_price) FROM products);"
    },
    {
      "id": 25,
      "type": "code",
      "question": "Write a query returning `first_name` and `salary` from `employees` for employees earning more than their own department average using a correlated subquery.",
      "answer": "SELECT first_name, salary FROM employees e1 WHERE salary > (SELECT AVG(salary) FROM employees e2 WHERE e2.department_id = e1.department_id);",
      "prompt": "Write a query returning `first_name` and `salary` from `employees` for employees earning more than their own department average using a correlated subquery.",
      "ref": "SELECT first_name, salary FROM employees e1 WHERE salary > (SELECT AVG(salary) FROM employees e2 WHERE e2.department_id = e1.department_id);"
    }
  ]
};
