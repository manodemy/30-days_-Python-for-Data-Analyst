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
            ℹ️ <code>COUNT(*)</code> vs <code>COUNT(col)</code>: Use <code>COUNT(*)</code> to count rows. Use <code>COUNT(col)</code> when you need to know how many rows have a value in that specific column.
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
            ⚠️ <strong>AVG and NULL — A Common Interview Trap:</strong> If 10 employees have a commission column and 4 are NULL, <code>AVG(commission)</code> divides by 6 (not 10). <code>AVG(COALESCE(commission, 0))</code> divides by 10. The correct choice depends on business context.
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

          <pre><code>-- Demonstration: 15 employees, 4 have NULL commission
SELECT COUNT(*)               AS total_rows,       -- 15
       COUNT(commission)       AS non_null_count,   -- 11
       SUM(commission)         AS sum_commissions,  -- sums 11 values
       AVG(commission)         AS avg_of_non_null,  -- sum/11
       AVG(COALESCE(commission,0)) AS avg_all,     -- sum/15
       MIN(commission)         AS min_commission,  -- ignores NULLs
       MAX(commission)         AS max_commission   -- ignores NULLs
FROM   employees;</code></pre>

          <div class="pro-tip-box">
            💡 <strong>Pro Tip — Validating Data Completeness:</strong> Use <code>COUNT(*) - COUNT(column)</code> to find the number of NULL values in any column: <code>SELECT COUNT(*) - COUNT(commission) AS null_commission_count FROM employees;</code>
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
      "prompt": "<strong>Task: Commission Coverage</strong><br/>How many employees have a commission assigned? How many do NOT? Use COUNT(*) and COUNT(commission).",
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
