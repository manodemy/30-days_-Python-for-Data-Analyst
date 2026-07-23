// Day 05 — Aggregate Functions: COUNT, SUM, AVG, MIN, MAX, NULL behavior
if (!window.COURSE_CONTENT) window.COURSE_CONTENT = {};
window.COURSE_CONTENT['day05'] = {
  "day": 5,
  "title": "Aggregate Functions",
  "db": "retail",
  "emoji": "📊",
  "slides": [
    {
      "title": "Aggregate Functions — Summarizing Data",
      "duration": "0:00",
      "html": `
        <h2>📊 Aggregate Functions</h2>

        <div class="slide-section">
          <h3>01. What Are Aggregate Functions?</h3>
          <p>Aggregate functions collapse <strong>multiple rows</strong> into a <strong>single summary value</strong>. They are evaluated at Step 4 (after WHERE filters rows) and are typically used with <code>GROUP BY</code> to produce per-group summaries.</p>

          <div class="db-mock-table-wrap">
            <table class="db-table-mock db-table-mock--compact">
              <thead><tr><th>Function</th><th>Returns</th><th>NULL Behavior</th><th>Example</th></tr></thead>
              <tbody>
                <tr><td><code>COUNT(*)</code></td><td>Total row count</td><td>Counts ALL rows including NULLs</td><td><code>COUNT(*)</code></td></tr>
                <tr><td><code>COUNT(col)</code></td><td>Non-NULL count</td><td>Ignores NULLs</td><td><code>COUNT(commission)</code></td></tr>
                <tr><td><code>SUM(col)</code></td><td>Total sum</td><td>Ignores NULLs</td><td><code>SUM(salary)</code></td></tr>
                <tr><td><code>AVG(col)</code></td><td>Arithmetic mean</td><td>Ignores NULLs (denominator = non-NULL count)</td><td><code>AVG(salary)</code></td></tr>
                <tr><td><code>MIN(col)</code></td><td>Smallest value</td><td>Ignores NULLs</td><td><code>MIN(unit_price)</code></td></tr>
                <tr><td><code>MAX(col)</code></td><td>Largest value</td><td>Ignores NULLs</td><td><code>MAX(salary)</code></td></tr>
              </tbody>
            </table>
          </div>

          <div class="info-box">
            ℹ️ <strong>The five aggregates you must know:</strong> <code>COUNT</code>, <code>SUM</code>, <code>AVG</code>, <code>MIN</code>, <code>MAX</code>. Some engines add <code>STDDEV</code>, <code>VARIANCE</code>, <code>MEDIAN</code>, <code>GROUP_CONCAT</code> — but the first five are universal.
          </div>
        </div>

        <div class="slide-section">
          <h3>02. COUNT — Counting Rows</h3>
          <p><code>COUNT(*)</code> counts every row including those with NULLs. <code>COUNT(column)</code> counts only rows where that column is not NULL. <code>COUNT(DISTINCT column)</code> counts unique non-NULL values.</p>

          <pre><code>-- Total number of employees
SELECT COUNT(*) AS total_employees
FROM   employees;

-- Count employees with a commission (non-NULL only)
SELECT COUNT(commission) AS employees_with_commission
FROM   employees;

-- Count distinct departments represented
SELECT COUNT(DISTINCT department_id) AS num_departments
FROM   employees;</code></pre>

          <div class="info-box">
            ℹ️ <strong>COUNT(*) vs COUNT(col):</strong> Use <code>COUNT(*)</code> to count rows. Use <code>COUNT(col)</code> when you need to know how many rows have a value in that specific column. They differ only when <code>col</code> contains NULLs.
          </div>
        </div>

        <div class="slide-section">
          <h3>03. SUM and AVG</h3>
          <p><code>SUM</code> adds all non-NULL values. <code>AVG</code> computes the mean — it divides by the count of non-NULL values, not the total row count. This distinction matters when a column has NULLs.</p>

          <pre><code>-- Total salary payroll and average salary
SELECT SUM(salary)     AS total_payroll,
       AVG(salary)     AS avg_salary,
       MIN(salary)     AS min_salary,
       MAX(salary)     AS max_salary
FROM   employees;

-- Average commission (only among employees who HAVE one)
SELECT AVG(commission) AS avg_commission_earned
FROM   employees
WHERE  commission IS NOT NULL;

-- Average including all employees (treat NULL as 0)
SELECT AVG(COALESCE(commission, 0)) AS avg_commission_all
FROM   employees;</code></pre>

          <div class="warn-box">
            ⚠️ <strong>AVG and NULL — A Common Interview Trap:</strong> If 15 employees exist and 4 have a NULL commission, <code>AVG(commission)</code> divides by 11 (not 15). <code>AVG(COALESCE(commission, 0))</code> divides by 15. The correct choice depends on the business question being asked.
          </div>
        </div>

        <div class="slide-section">
          <h3>04. MIN and MAX</h3>
          <p><code>MIN</code> and <code>MAX</code> work on numbers, strings (lexicographic), and dates. They are extremely useful for finding boundaries in datasets.</p>

          <pre><code>-- Price range across all products
SELECT MIN(unit_price) AS cheapest,
       MAX(unit_price) AS most_expensive
FROM   products;

-- Earliest and latest hire dates
SELECT MIN(hire_date) AS first_hire,
       MAX(hire_date) AS latest_hire
FROM   employees;

-- First and last order dates for a customer
SELECT MIN(order_date) AS first_order,
       MAX(order_date) AS last_order
FROM   orders
WHERE  customer_id = 1;</code></pre>

          <div class="pro-tip-box">
            💡 <strong>MIN/MAX on strings:</strong> For TEXT columns, MIN/MAX compare lexicographically (dictionary order), so <code>MAX(name)</code> returns the last name alphabetically. For dates stored as ISO-8601 TEXT (<code>YYYY-MM-DD</code>), lexicographic order equals chronological order — which is why ISO format is so important.
          </div>
        </div>

        <div class="slide-section">
          <h3>05. Aggregates with WHERE</h3>
          <p>Combining aggregates with <code>WHERE</code> filters rows <em>before</em> the aggregate is computed. This is how you get conditional summaries without <code>GROUP BY</code>.</p>

          <pre><code>-- Average salary of active employees only
SELECT AVG(salary) AS avg_active_salary
FROM   employees
WHERE  is_active = 1;

-- Total revenue from Shipped orders
SELECT SUM(total_amount) AS shipped_revenue
FROM   orders
WHERE  status = 'Shipped';

-- Number of products priced above 5000
SELECT COUNT(*) AS premium_product_count
FROM   products
WHERE  unit_price > 5000;</code></pre>

          <div class="interview-box">
            <h4>🎯 Interview Insight — Aggregate with WHERE vs HAVING</h4>
            <div>
              <p><strong>Q: What is the difference between WHERE and HAVING with aggregates?</strong></p>
              <p><em>A: WHERE filters individual rows BEFORE aggregation (Step 3). HAVING filters aggregated groups AFTER aggregation (Step 5). You cannot use aggregate functions in a WHERE clause — use HAVING for post-aggregation filters. WHERE is more performant because it reduces the dataset before the expensive aggregate operation.</em></p>
            </div>
          </div>
        </div>

        <div class="slide-section">
          <h3>06. NULL Behavior in Aggregates — Summary</h3>
          <p>Understanding how each function handles NULLs prevents incorrect business calculations:</p>

          <pre><code>-- Demonstration: 15 employees, several have NULL commission
SELECT COUNT(*)                  AS total_rows,        -- 15
       COUNT(commission)          AS non_null_count,    -- count with value
       SUM(commission)            AS sum_commissions,   -- sums non-NULL only
       AVG(commission)            AS avg_of_non_null,   -- sum / non-null count
       AVG(COALESCE(commission,0)) AS avg_all,          -- sum / 15
       MIN(commission)            AS min_commission,    -- ignores NULLs
       MAX(commission)            AS max_commission     -- ignores NULLs
FROM   employees;</code></pre>

          <div class="pro-tip-box">
            💡 <strong>Pro Tip — Validating Data Completeness:</strong> Use <code>COUNT(*) - COUNT(column)</code> to find the number of NULL values in any column: <code>SELECT COUNT(*) - COUNT(commission) AS null_commission_count FROM employees;</code>. This is the standard way to audit data quality in SQL.
          </div>
        </div>

        <div class="slide-section">
          <h3>07. Aggregates with Expressions & DISTINCT</h3>
          <p>Aggregate functions accept any expression, not just a column. You can also combine <code>DISTINCT</code> with <code>SUM</code>, <code>AVG</code>, <code>MIN</code>, <code>MAX</code>, <code>COUNT</code> to remove duplicates before aggregating.</p>

          <pre><code>-- Total inventory value (expression inside SUM)
SELECT SUM(stock_qty * unit_price) AS inventory_value
FROM   products;

-- Average discount applied on line items
SELECT AVG(unit_price * 0.1) AS avg_discount
FROM   order_items;

-- Sum of DISTINCT salaries (removes duplicates first)
SELECT SUM(DISTINCT department_id) AS sum_distinct_depts
FROM   employees;</code></pre>

          <div class="warn-box">
            ⚠️ <strong>DISTINCT inside aggregates:</strong> <code>COUNT(DISTINCT col)</code> is supported everywhere, but <code>SUM(DISTINCT col)</code> / <code>AVG(DISTINCT col)</code> are rarely useful in practice (they can hide data). Use them only when you genuinely need to deduplicate before summing.
          </div>
        </div>

        <div class="slide-section">
          <div class="interview-box">
            <h4 style="margin: 0; margin-bottom: 12px;">🎯 Interview Q&amp;A — Aggregate Functions</h4>

            <p><strong>Q1: What is the difference between <code>COUNT(*)</code> and <code>COUNT(column)</code>?</strong></p>
            <p><em>A: <code>COUNT(*)</code> counts every row in the group, including rows where every column is NULL. <code>COUNT(column)</code> counts only rows where <code>column</code> is not NULL — it skips NULLs in that specific column. Use <code>COUNT(*)</code> for total rows; use <code>COUNT(col)</code> to measure completeness of a column.</em></p>

            <p><strong>Q2: What does <code>COUNT(DISTINCT col)</code> do, and when would you use it?</strong></p>
            <p><em>A: It counts the number of unique non-NULL values in <code>col</code>. Common use cases: counting distinct customers who placed orders, distinct departments with employees, or distinct product categories. It's typically slower than <code>COUNT(*)</code> because the engine must sort/hash to deduplicate.</em></p>

            <p><strong>Q3: How does <code>AVG</code> handle NULL values?</strong></p>
            <p><em>A: <code>AVG(col)</code> ignores NULLs entirely — it sums the non-NULL values and divides by the count of non-NULL values. So if 10 of 15 rows are non-NULL, the divisor is 10, not 15. To average over all rows treating NULL as 0, use <code>AVG(COALESCE(col, 0))</code>.</em></p>

            <p><strong>Q4: Why can't you use an aggregate function in a WHERE clause?</strong></p>
            <p><em>A: Because of logical execution order. WHERE (Step 3) runs BEFORE aggregation (Step 4). The aggregate doesn't exist yet when WHERE is evaluated. To filter on aggregated results, use HAVING (Step 5), which runs after GROUP BY. Alternatively, use a subquery to compute the aggregate first.</em></p>

            <p><strong>Q5: What does <code>SUM</code> return if all values are NULL?</strong></p>
            <p><em>A: It returns NULL, not 0. This surprises many people. If you need 0 instead, wrap with <code>COALESCE(SUM(col), 0)</code>. The same applies to <code>AVG</code>, <code>MIN</code>, <code>MAX</code> when the input set is empty or all-NULL.</em></p>

            <p><strong>Q6: How do <code>MIN</code>/<code>MAX</code> behave on TEXT and DATE columns?</strong></p>
            <p><em>A: They use the column's natural sort order. For TEXT, that's lexicographic (dictionary) order — <code>MAX(name)</code> is the last alphabetically. For dates stored as ISO-8601 strings (<code>YYYY-MM-DD</code>), lexicographic order equals chronological order, so MIN/MAX give the earliest/latest dates. This is a key reason to use ISO date formats.</em></p>

            <p><strong>Q7: Can you use an expression inside an aggregate, like <code>SUM(qty * price)</code>?</strong></p>
            <p><em>A: Yes. Aggregates accept any expression that evaluates to a scalar per row. <code>SUM(qty * unit_price)</code> computes the total line-item value. <code>COUNT(CASE WHEN x THEN 1 END)</code> counts rows matching a condition. The expression is evaluated per row first, then aggregated.</em></p>

            <p><strong>Q8: What is the difference between <code>SUM(col)</code> and <code>SUM(DISTINCT col)</code>?</strong></p>
            <p><em>A: <code>SUM(col)</code> adds every value (including duplicates). <code>SUM(DISTINCT col)</code> deduplicates first, then sums. <code>SUM(DISTINCT col)</code> is rarely the intent and can silently produce wrong totals — it's mostly a trap. The common DISTINCT aggregate is <code>COUNT(DISTINCT col)</code>.</em></p>

            <p><strong>Q9: Why does <code>SELECT COUNT(*), first_name FROM employees</code> fail?</strong></p>
            <p><em>A: Because mixing an aggregate (<code>COUNT(*)</code> — one row of output) with a non-aggregated column (<code>first_name</code> — 15 rows) is ambiguous: which first_name should appear? The SQL standard requires every non-aggregated column to appear in GROUP BY. SQLite is permissive and picks an arbitrary row, but MySQL/PostgreSQL throw an error.</em></p>

            <p><strong>Q10: What is the performance implication of <code>COUNT(*)</code> on a large table?</strong></p>
            <p><em>A: InnoDB/MySQL's <code>COUNT(*)</code> without WHERE does a full table or index scan (MVCC means the engine can't keep a cheap counter). PostgreSQL is similar. To speed it up, add a WHERE clause on an indexed column, maintain a summary table, or use approximate counts (<code>pg_class.reltuples</code> in PostgreSQL).</em></p>

            <p><strong>Q11: How do you compute a weighted average in SQL?</strong></p>
            <p><em>A: Use <code>SUM(value * weight) / SUM(weight)</code>. For example, average price per unit sold: <code>SUM(unit_price * qty) * 1.0 / SUM(qty)</code>. Always guard the denominator with <code>NULLIF(SUM(weight), 0)</code> to avoid divide-by-zero when the set is empty.</em></p>

            <p><strong>Q12: What does <code>GROUP_CONCAT</code> (SQLite/MySQL) / <code>STRING_AGG</code> (PostgreSQL) do?</strong></p>
            <p><em>A: It concatenates values from multiple rows into a single string, with an optional separator. E.g. <code>SELECT department_id, GROUP_CONCAT(first_name) FROM employees GROUP BY department_id</code> returns "Rajesh,Amit,..." per department. Useful for reports and avoiding N+1 queries in applications.</em></p>

            <p><strong>Q13: Can aggregates be nested, e.g. <code>MAX(COUNT(*))</code>?</strong></p>
            <p><em>A: No. You cannot nest aggregate functions directly. To get the maximum group size, use a subquery: <code>SELECT MAX(c) FROM (SELECT COUNT(*) AS c FROM employees GROUP BY department_id) x</code>. The inner query computes per-group counts; the outer query aggregates those counts.</em></p>

            <p><strong>Q14: What is the result of <code>AVG</code> over an empty set (no rows)?</strong></p>
            <p><em>A: It returns NULL, not 0 or an error. This is because there's nothing to average. <code>MIN</code>, <code>MAX</code>, <code>SUM</code> also return NULL over an empty set. <code>COUNT(*)</code> returns 0 (counting is well-defined). Use COALESCE if you need a numeric default.</em></p>

            <p><strong>Q15: Explain conditional aggregation with a practical example.</strong></p>
            <p><em>A: Combine <code>SUM</code> with <code>CASE</code> to compute multiple metrics in one pass: <code>SUM(CASE WHEN status='Shipped' THEN total_amount ELSE 0 END) AS shipped_rev</code>. This pivots rows into columns without multiple subqueries — far more efficient than running the query three times for three statuses.</em></p>

            <p><strong>Q16: What is the difference between an aggregate function and a window function?</strong></p>
            <p><em>A: An aggregate collapses N rows into 1 (when used with GROUP BY, N rows per group). A window function computes the same aggregate but keeps every input row, attaching the result as an extra column via <code>OVER()</code>. Use aggregates for summaries, window functions for per-row comparisons (running totals, rankings).</em></p>

            <p><strong>Q17: How do you find the second-highest value using aggregates?</strong></p>
            <p><em>A: Two common patterns: (1) <code>SELECT MAX(salary) FROM employees WHERE salary &lt; (SELECT MAX(salary) FROM employees)</code> — subquery excludes the top, then MAX gives #2. (2) Use a window function: <code>DENSE_RANK() OVER (ORDER BY salary DESC)</code> and filter WHERE rank = 2. The window approach handles ties correctly.</em></p>

            <p><strong>Q18: Does <code>COUNT(col)</code> count rows where col is an empty string?</strong></p>
            <p><em>A: Yes. An empty string <code>''</code> is NOT NULL — it's a valid (zero-length) string. <code>COUNT(col)</code> counts it. Only actual NULLs are excluded. This matters when auditing "missing" data: an empty string is present-but-blank, NULL is absent. They're different.</em></p>

            <p><strong>Q19: What's the fastest way to check if a table has any rows?</strong></p>
            <p><em>A: <code>SELECT 1 FROM table LIMIT 1</code> — the engine stops after the first row. <code>COUNT(*)</code> would scan the entire table. In application code, check if the result set is non-empty. For existence checks, prefer <code>EXISTS (SELECT 1 FROM ...)</code> over <code>COUNT(*) &gt; 0</code>.</em></p>

            <p><strong>Q20: How does <code>MIN</code>/<code>MAX</code> behave with mixed NULLs?</strong></p>
            <p><em>A: They ignore NULLs entirely. <code>MIN(col)</code> over {5, NULL, 3} returns 3. If every value is NULL, both return NULL. To treat NULL as the minimum, use <code>MIN(COALESCE(col, -infinity))</code>, but this is rarely the intent — usually you want NULLs excluded.</em></p>

            <p><strong>Q21: What is the difference between <code>AVG</code> and <code>SUM/COUNT</code> computed manually?</strong></p>
            <p><em>A: Nothing — <code>AVG(col) = SUM(col) / COUNT(col)</code> when there are no NULLs. With NULLs, <code>AVG(col)</code> uses <code>COUNT(col)</code> (non-NULL) as the divisor, so <code>AVG(col) = SUM(col) / COUNT(col)</code> still holds (both skip NULLs). The trap is people expect <code>SUM/COUNT(*)</code>, which divides by total rows.</em></p>

            <p><strong>Q22: How would you compute the median in SQL?</strong></p>
            <p><em>A: There's no portable <code>MEDIAN()</code> aggregate (only Oracle and some PostgreSQL extensions have it). Standard workaround: <code>PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY col)</code> (PostgreSQL/Oracle/SQL Server) or a window-function approach with <code>ROW_NUMBER</code> and counting. SQLite has no built-in median — compute it in application code or use a CTE with offset.</em></p>

            <p><strong>Q23: Can aggregate functions be used in the SELECT list without GROUP BY?</strong></p>
            <p><em>A: Yes — this produces a single summary row over the whole table (an "implicit group" of all rows). <code>SELECT COUNT(*), AVG(salary) FROM employees</code> returns one row with the grand totals. You cannot mix this with non-aggregated columns (except constants) without GROUP BY.</em></p>

            <p><strong>Q24: What happens when you combine <code>DISTINCT</code> with multiple columns in COUNT?</strong></p>
            <p><em>A: <code>COUNT(DISTINCT col1, col2)</code> is NOT standard — most engines reject it. To count distinct pairs, concatenate: <code>COUNT(DISTINCT col1 || '|' || col2)</code>, or use a subquery <code>SELECT COUNT(*) FROM (SELECT DISTINCT col1, col2 FROM t) x</code>. PostgreSQL supports <code>COUNT(DISTINCT (col1, col2))</code> with a row constructor.</em></p>

            <p><strong>Q25: How do you compute a percentage of total in SQL?</strong></p>
            <p><em>A: Two patterns. (1) Without window functions: use a cross-joined subquery for the total — <code>SELECT dept, SUM(salary) / (SELECT SUM(salary) FROM employees) * 100 AS pct FROM employees GROUP BY dept</code>. (2) With window functions: <code>SELECT dept, SUM(salary) * 100.0 / SUM(SUM(salary)) OVER () AS pct FROM employees GROUP BY dept</code> — cleaner and scans once.</em></p>
          </div>
        </div>
      `
    }
  ],
  "practiceQuestions": [
    {
      "id": 1,
      "prompt": "<strong>Task: Payroll Summary</strong><br/>Find the total payroll (<code>SUM</code>), average salary (<code>AVG</code>), minimum, and maximum salary from the <code>employees</code> table.",
      "referenceSql": "SELECT SUM(salary) AS total_payroll, AVG(salary) AS avg_salary, MIN(salary) AS min_salary, MAX(salary) AS max_salary FROM employees;"
    },
    {
      "id": 2,
      "prompt": "<strong>Task: Active Employee Count</strong><br/>Count how many employees are currently active (<code>is_active = 1</code>).",
      "referenceSql": "SELECT COUNT(*) AS active_employees FROM employees WHERE is_active = 1;"
    },
    {
      "id": 3,
      "prompt": "<strong>Task: Product Price Range</strong><br/>Find the cheapest (<code>MIN</code>) and most expensive (<code>MAX</code>) <code>unit_price</code> from the <code>products</code> table.",
      "referenceSql": "SELECT MIN(unit_price) AS cheapest, MAX(unit_price) AS most_expensive FROM products;"
    },
    {
      "id": 4,
      "prompt": "<strong>Task: Commission Coverage</strong><br/>How many employees have a commission assigned? How many do NOT? Use <code>COUNT(*)</code> and <code>COUNT(commission)</code> in one query.",
      "referenceSql": "SELECT COUNT(*) AS total, COUNT(commission) AS has_commission, COUNT(*) - COUNT(commission) AS no_commission FROM employees;"
    },
    {
      "id": 5,
      "prompt": "<strong>Task: Shipped Revenue</strong><br/>Calculate the total <code>total_amount</code> from orders where status = 'Shipped'.",
      "referenceSql": "SELECT SUM(total_amount) AS shipped_revenue FROM orders WHERE status = 'Shipped';"
    },
    {
      "id": 6,
      "prompt": "<strong>Task: Distinct Department Count</strong><br/>Count how many distinct <code>department_id</code> values appear in the <code>employees</code> table.",
      "referenceSql": "SELECT COUNT(DISTINCT department_id) AS num_departments FROM employees;"
    },
    {
      "id": 7,
      "prompt": "<strong>Task: Inventory Value</strong><br/>Compute the total inventory value as <code>SUM(stock_qty * unit_price)</code> across all products.",
      "referenceSql": "SELECT SUM(stock_qty * unit_price) AS inventory_value FROM products;"
    },
    {
      "id": 8,
      "prompt": "<strong>Task: Average commission two ways</strong><br/>Show both <code>AVG(commission)</code> (over non-NULL only) and <code>AVG(COALESCE(commission, 0))</code> (treating NULL as 0) side by side.",
      "referenceSql": "SELECT AVG(commission) AS avg_non_null, AVG(COALESCE(commission, 0)) AS avg_all FROM employees;"
    },
    {
      "id": 9,
      "prompt": "<strong>Task: Premium product count</strong><br/>Count how many products have <code>unit_price &gt; 5000</code>.",
      "referenceSql": "SELECT COUNT(*) AS premium_count FROM products WHERE unit_price > 5000;"
    },
    {
      "id": 10,
      "prompt": "<strong>Task: Safe average over empty set</strong><br/>Compute <code>AVG(salary)</code> for employees in <code>department_id = 99</code> (which is empty), wrapping the result with COALESCE to show 0 instead of NULL.",
      "referenceSql": "SELECT COALESCE(AVG(salary), 0) AS avg_salary FROM employees WHERE department_id = 99;"
    },
    {
      "id": 11,
      "prompt": "<strong>Task: Highest order total</strong><br/>Find the maximum <code>total_amount</code> across all orders.",
      "referenceSql": "SELECT MAX(total_amount) AS largest_order FROM orders;"
    },
    {
      "id": 12,
      "prompt": "<strong>Task: Distinct regions</strong><br/>Count how many distinct <code>region</code> values exist in the <code>customers</code> table.",
      "referenceSql": "SELECT COUNT(DISTINCT region) AS num_regions FROM customers;"
    }
  ],
  "testQuestions": [
    { "id": 1, "prompt": "Count the total number of rows in the <code>employees</code> table.", "ref": "SELECT COUNT(*) FROM employees;" },
    { "id": 2, "prompt": "Find the average salary from <code>employees</code>.", "ref": "SELECT AVG(salary) FROM employees;" },
    { "id": 3, "prompt": "Find the total <code>total_amount</code> from all orders.", "ref": "SELECT SUM(total_amount) FROM orders;" },
    { "id": 4, "prompt": "Find the minimum and maximum <code>unit_price</code> from <code>products</code>.", "ref": "SELECT MIN(unit_price) AS min_price, MAX(unit_price) AS max_price FROM products;" },
    { "id": 5, "prompt": "Count the number of employees WITH a commission (non-NULL).", "ref": "SELECT COUNT(commission) AS has_commission FROM employees;" },
    { "id": 6, "prompt": "Count the number of employees WITHOUT a commission (NULL commission).", "ref": "SELECT COUNT(*) - COUNT(commission) AS no_commission FROM employees;" },
    { "id": 7, "prompt": "Find the average salary of active employees (<code>is_active = 1</code>).", "ref": "SELECT AVG(salary) FROM employees WHERE is_active = 1;" },
    { "id": 8, "prompt": "Find the total stock value (SUM of stock_qty * unit_price) across all products.", "ref": "SELECT SUM(stock_qty * unit_price) AS total_stock_value FROM products;" },
    { "id": 9, "prompt": "Find the earliest <code>order_date</code> and the latest <code>order_date</code> from <code>orders</code>.", "ref": "SELECT MIN(order_date) AS earliest, MAX(order_date) AS latest FROM orders;" },
    { "id": 10, "prompt": "Find the average commission, treating NULLs as 0.", "ref": "SELECT AVG(COALESCE(commission, 0)) AS avg_commission FROM employees;" },
    { "id": 11, "prompt": "Count the number of distinct <code>region</code> values in <code>customers</code>.", "ref": "SELECT COUNT(DISTINCT region) FROM customers;" },
    { "id": 12, "prompt": "Count how many orders have a <code>shipped_date</code> recorded (not NULL).", "ref": "SELECT COUNT(shipped_date) AS shipped_count FROM orders;" },
    { "id": 13, "prompt": "Find the maximum <code>total_amount</code> from orders with status 'Shipped'.", "ref": "SELECT MAX(total_amount) FROM orders WHERE status = 'Shipped';" },
    { "id": 14, "prompt": "Find the minimum salary in the Engineering department (department_id = 10).", "ref": "SELECT MIN(salary) FROM employees WHERE department_id = 10;" },
    { "id": 15, "prompt": "Find the total sum of all <code>commission</code> values (ignoring NULLs).", "ref": "SELECT SUM(commission) FROM employees;" },
    { "id": 16, "prompt": "Find the average unit_price of products in category_id = 5.", "ref": "SELECT AVG(unit_price) FROM products WHERE category_id = 5;" },
    { "id": 17, "prompt": "Count the number of products with <code>stock_qty</code> greater than 50.", "ref": "SELECT COUNT(*) FROM products WHERE stock_qty > 50;" },
    { "id": 18, "prompt": "Find the total salary payroll for employees hired after 2021-01-01.", "ref": "SELECT SUM(salary) FROM employees WHERE hire_date > '2021-01-01';" },
    { "id": 19, "prompt": "Find the max and min <code>total_amount</code> among orders placed in 2024.", "ref": "SELECT MAX(total_amount), MIN(total_amount) FROM orders WHERE order_date BETWEEN '2024-01-01' AND '2024-12-31';" },
    { "id": 20, "prompt": "Find the average number of order items (qty) per product from <code>order_items</code>.", "ref": "SELECT AVG(qty) AS avg_qty FROM order_items;" },
    { "id": 21, "prompt": "Count the number of distinct <code>job_title</code> values in <code>employees</code>.", "ref": "SELECT COUNT(DISTINCT job_title) FROM employees;" },
    { "id": 22, "prompt": "Find the total revenue from orders placed by customer_id = 1.", "ref": "SELECT SUM(total_amount) FROM orders WHERE customer_id = 1;" },
    { "id": 23, "prompt": "Find the average cost_price of products in category_id = 6.", "ref": "SELECT AVG(cost_price) FROM products WHERE category_id = 6;" },
    { "id": 24, "prompt": "Find the maximum salary among employees with a commission greater than 5000.", "ref": "SELECT MAX(salary) FROM employees WHERE commission > 5000;" },
    { "id": 25, "prompt": "Count all orders and all orders with a shipped_date, and compare (null shipments).", "ref": "SELECT COUNT(*) AS total_orders, COUNT(shipped_date) AS shipped_orders FROM orders;" }
  ],
  "topics": [
    { "id": "topic-1", "label": "Topic 1: COUNT, SUM, AVG, MIN, MAX", "recordingKey": null }
  ]
};
