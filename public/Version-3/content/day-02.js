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

        <div class="slide-section">
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

          <div class="interview-box">
            <h4>🎯 Interview Insight — LIMIT vs TOP</h4>
            <div>
              <p><strong>Q: What is the difference between LIMIT and TOP?</strong></p>
              <p><em>A: Both restrict row count. <code>LIMIT</code> is the ANSI-preferred syntax used by MySQL, PostgreSQL, and SQLite; it goes at the end of the query and supports <code>OFFSET</code> for pagination. <code>TOP n</code> is SQL Server / MS Access syntax; it goes immediately after <code>SELECT</code> and uses <code>FETCH NEXT n ROWS ONLY</code> for pagination in modern T-SQL.</em></p>
            </div>
          </div>
        </div>

        <div class="slide-section">
          <h3>06. SQL Logical Execution Order</h3>
          <p>Understanding <em>when</em> each clause is evaluated is critical for writing correct queries and debugging alias errors:</p>

          <div class="db-mock-table-wrap">
            <table class="db-table-mock db-table-mock--compact">
              <thead>
                <tr><th>#</th><th>Clause</th><th>What It Does</th></tr>
              </thead>
              <tbody>
                <tr><td>1</td><td><code>FROM</code></td><td>Identify the source table(s)</td></tr>
                <tr><td>2</td><td><code>JOIN</code></td><td>Combine tables on a condition</td></tr>
                <tr><td>3</td><td><code>WHERE</code></td><td>Filter individual rows</td></tr>
                <tr><td>4</td><td><code>GROUP BY</code></td><td>Aggregate rows into groups</td></tr>
                <tr><td>5</td><td><code>HAVING</code></td><td>Filter groups after aggregation</td></tr>
                <tr><td>6</td><td><code>SELECT</code></td><td>Choose columns and compute expressions</td></tr>
                <tr><td>7</td><td><code>DISTINCT</code></td><td>Remove duplicate rows</td></tr>
                <tr><td>8</td><td><code>ORDER BY</code></td><td>Sort the result set</td></tr>
                <tr><td>9</td><td><code>LIMIT / OFFSET</code></td><td>Trim the result set</td></tr>
              </tbody>
            </table>
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
