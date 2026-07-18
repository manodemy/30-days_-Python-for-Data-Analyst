// Day 06 — GROUP BY & HAVING
if (!window.COURSE_CONTENT) window.COURSE_CONTENT = {};
window.COURSE_CONTENT['day06'] = {
  "day": 6,
  "title": "GROUP BY & HAVING",
  "db": "retail",
  "emoji": "🗃️",
  "slides": [
    {
      "title": "GROUP BY & HAVING — Aggregating by Groups",
      "duration": "0:00",
      "html": `
        <h2>🗃️ GROUP BY & HAVING</h2>

        <div class="slide-section">
          <h3>01. GROUP BY — Bucketing Rows into Groups</h3>
          <p><code>GROUP BY</code> divides the result set into groups based on one or more columns. After grouping, aggregate functions compute a summary value <em>per group</em>. Every column in the SELECT list must either be in GROUP BY or wrapped in an aggregate function.</p>

          <pre><code>-- Count employees per department
SELECT department_id,
       COUNT(*) AS headcount
FROM   employees
GROUP BY department_id;

-- Average salary per department
SELECT department_id,
       AVG(salary) AS avg_salary,
       SUM(salary) AS dept_payroll
FROM   employees
GROUP BY department_id
ORDER BY avg_salary DESC;</code></pre>

          <div class="warn-box">
            ⚠️ <strong>The GROUP BY Rule:</strong> Any column in SELECT that is NOT an aggregate must appear in GROUP BY. Violating this produces an error (or, in MySQL with only_full_group_by disabled, returns non-deterministic results).
          </div>
        </div>

        <div class="slide-section">
          <h3>02. GROUP BY Multiple Columns</h3>
          <p>Grouping by multiple columns creates one group per <em>unique combination</em> of all specified columns. This allows hierarchical aggregation.</p>

          <pre><code>-- Count active and inactive employees per department
SELECT department_id,
       is_active,
       COUNT(*) AS count
FROM   employees
GROUP BY department_id, is_active
ORDER BY department_id, is_active;

-- Average order amount per customer per status
SELECT customer_id,
       status,
       COUNT(*)            AS num_orders,
       AVG(total_amount)   AS avg_order
FROM   orders
GROUP BY customer_id, status;</code></pre>
        </div>

        <div class="slide-section">
          <h3>03. HAVING — Filtering Groups After Aggregation</h3>
          <p><code>HAVING</code> filters <em>groups</em> — it is evaluated after <code>GROUP BY</code> and after aggregate functions are computed. Think of it as a <code>WHERE</code> clause for groups.</p>

          <pre><code>-- Only departments with more than 2 employees
SELECT department_id,
       COUNT(*) AS headcount
FROM   employees
GROUP BY department_id
HAVING COUNT(*) > 2;

-- Departments with average salary above 70000
SELECT department_id,
       AVG(salary) AS avg_salary
FROM   employees
GROUP BY department_id
HAVING AVG(salary) > 70000
ORDER BY avg_salary DESC;</code></pre>
        </div>

        <div class="slide-section">
          <h3>04. WHERE vs HAVING — Critical Distinction</h3>

          <div class="vs-block">
            <div class="vs-card">
              <h4>WHERE — Filters Rows (Pre-Aggregation)</h4>
              <ul>
                <li>Evaluated at Step 3 — before GROUP BY</li>
                <li>Filters individual rows from the base table</li>
                <li>Cannot use aggregate functions</li>
                <li>More performant (reduces dataset early)</li>
              </ul>
              <pre><code>SELECT department_id, AVG(salary)
FROM employees
WHERE is_active = 1  -- filters rows
GROUP BY department_id;</code></pre>
            </div>
            <div class="vs-card">
              <h4>HAVING — Filters Groups (Post-Aggregation)</h4>
              <ul>
                <li>Evaluated at Step 5 — after GROUP BY</li>
                <li>Filters entire groups from the aggregated result</li>
                <li>Can use aggregate functions</li>
                <li>Less performant (aggregates first, then filters)</li>
              </ul>
              <pre><code>SELECT department_id, AVG(salary)
FROM employees
GROUP BY department_id
HAVING AVG(salary) > 70000; -- filters groups</code></pre>
            </div>
          </div>

          <div class="pro-tip-box">
            💡 <strong>Best Practice:</strong> Apply filters to raw rows in <code>WHERE</code> whenever possible. Only use <code>HAVING</code> when you need to filter on an aggregate result. Combining both maximises performance: <code>WHERE</code> shrinks the dataset, <code>HAVING</code> then filters the aggregated groups.
          </div>
        </div>

        <div class="slide-section">
          <h3>05. Combining WHERE, GROUP BY, and HAVING</h3>
          <pre><code>-- Business Question: Which active departments
--   have more than 2 employees earning above 50000?
SELECT department_id,
       COUNT(*)          AS qualifying_employees,
       AVG(salary)       AS avg_salary
FROM   employees
WHERE  is_active = 1          -- Step 3: filter rows first
  AND  salary > 50000
GROUP BY department_id         -- Step 4: group filtered rows
HAVING COUNT(*) > 2            -- Step 5: filter groups
ORDER BY avg_salary DESC;      -- Step 8: sort final result</code></pre>

          <div class="interview-box">
            <h4>🎯 Interview Insight</h4>
            <div>
              <p><strong>Q: Can you use a column alias defined in SELECT inside HAVING?</strong></p>
              <p><em>A: No — in most databases. HAVING is evaluated before SELECT (Steps 4→5→6 in logical order), so aliases from SELECT are not yet defined. You must repeat the aggregate expression: HAVING COUNT(*) > 2, not HAVING headcount > 2. MySQL is a notable exception that allows SELECT aliases in HAVING, but this is non-standard.</em></p>
            </div>
          </div>
        </div>
      `
    }
  ],
  "practiceQuestions": [
    {
      "id": 1,
      "prompt": "<strong>Task: Department Headcount</strong><br/>Count the number of employees in each department. Show <code>department_id</code> and <code>headcount</code>.",
      "referenceSql": "SELECT department_id, COUNT(*) AS headcount FROM employees GROUP BY department_id;"
    },
    {
      "id": 2,
      "prompt": "<strong>Task: Payroll by Department</strong><br/>Find the total salary payroll and average salary for each department. Sort by total payroll descending.",
      "referenceSql": "SELECT department_id, SUM(salary) AS total_payroll, AVG(salary) AS avg_salary FROM employees GROUP BY department_id ORDER BY total_payroll DESC;"
    },
    {
      "id": 3,
      "prompt": "<strong>Task: High-Average Departments</strong><br/>Find departments where the average salary exceeds 70000.",
      "referenceSql": "SELECT department_id, AVG(salary) AS avg_salary FROM employees GROUP BY department_id HAVING AVG(salary) > 70000;"
    },
    {
      "id": 4,
      "prompt": "<strong>Task: Orders by Status</strong><br/>Count the number of orders and the total amount for each <code>status</code> in the <code>orders</code> table.",
      "referenceSql": "SELECT status, COUNT(*) AS order_count, SUM(total_amount) AS total_revenue FROM orders GROUP BY status;"
    },
    {
      "id": 5,
      "prompt": "<strong>Task: Active Department Summary</strong><br/>For active employees only, show each department's headcount and average salary. Only include departments with 2 or more active employees.",
      "referenceSql": "SELECT department_id, COUNT(*) AS headcount, AVG(salary) AS avg_salary FROM employees WHERE is_active = 1 GROUP BY department_id HAVING COUNT(*) >= 2;"
    },
    {
      "id": 6,
      "prompt": "<strong>Task: Multi-Column Grouping</strong><br/>Group employees by <code>department_id</code> and <code>is_active</code> and show the count per combination.",
      "referenceSql": "SELECT department_id, is_active, COUNT(*) AS count FROM employees GROUP BY department_id, is_active ORDER BY department_id, is_active;"
    }
  ],
  "testQuestions": [
    { "id": 1, "prompt": "Count the number of employees in each department.", "ref": "SELECT department_id, COUNT(*) AS headcount FROM employees GROUP BY department_id;" },
    { "id": 2, "prompt": "Find the average salary per department.", "ref": "SELECT department_id, AVG(salary) AS avg_salary FROM employees GROUP BY department_id;" },
    { "id": 3, "prompt": "Find the total <code>total_amount</code> per order status.", "ref": "SELECT status, SUM(total_amount) AS total FROM orders GROUP BY status;" },
    { "id": 4, "prompt": "Find departments with more than 2 employees.", "ref": "SELECT department_id, COUNT(*) AS cnt FROM employees GROUP BY department_id HAVING COUNT(*) > 2;" },
    { "id": 5, "prompt": "Find the average salary per department, only for departments with average salary above 60000.", "ref": "SELECT department_id, AVG(salary) AS avg_sal FROM employees GROUP BY department_id HAVING AVG(salary) > 60000;" },
    { "id": 6, "prompt": "Count active vs inactive employees per department.", "ref": "SELECT department_id, is_active, COUNT(*) AS cnt FROM employees GROUP BY department_id, is_active;" },
    { "id": 7, "prompt": "Find the total <code>qty</code> sold per <code>product_id</code> from <code>order_items</code>.", "ref": "SELECT product_id, SUM(qty) AS total_sold FROM order_items GROUP BY product_id;" },
    { "id": 8, "prompt": "Find customers who have placed more than 1 order.", "ref": "SELECT customer_id, COUNT(*) AS order_count FROM orders GROUP BY customer_id HAVING COUNT(*) > 1;" },
    { "id": 9, "prompt": "Find the maximum <code>total_amount</code> per customer.", "ref": "SELECT customer_id, MAX(total_amount) AS max_order FROM orders GROUP BY customer_id;" },
    { "id": 10, "prompt": "Count the number of products per <code>category_id</code>.", "ref": "SELECT category_id, COUNT(*) AS product_count FROM products GROUP BY category_id;" },
    { "id": 11, "prompt": "Find the total payroll for active employees per department.", "ref": "SELECT department_id, SUM(salary) AS payroll FROM employees WHERE is_active = 1 GROUP BY department_id;" },
    { "id": 12, "prompt": "Find the number of orders per customer, only for customers with 2 or more orders.", "ref": "SELECT customer_id, COUNT(*) AS cnt FROM orders GROUP BY customer_id HAVING COUNT(*) >= 2;" },
    { "id": 13, "prompt": "Find the minimum and maximum salary per department.", "ref": "SELECT department_id, MIN(salary) AS min_sal, MAX(salary) AS max_sal FROM employees GROUP BY department_id;" },
    { "id": 14, "prompt": "Find average unit_price per category_id from products.", "ref": "SELECT category_id, AVG(unit_price) AS avg_price FROM products GROUP BY category_id;" },
    { "id": 15, "prompt": "Find total revenue per year from orders (extract year from order_date using strftime).", "ref": "SELECT strftime('%Y', order_date) AS year, SUM(total_amount) AS revenue FROM orders GROUP BY year;" },
    { "id": 16, "prompt": "Find departments where total payroll exceeds 200000.", "ref": "SELECT department_id, SUM(salary) AS payroll FROM employees GROUP BY department_id HAVING SUM(salary) > 200000;" },
    { "id": 17, "prompt": "Find the total qty sold per product from order_items, only for products with total qty > 2.", "ref": "SELECT product_id, SUM(qty) AS total_qty FROM order_items GROUP BY product_id HAVING SUM(qty) > 2;" },
    { "id": 18, "prompt": "Find average commission per department (ignoring NULLs).", "ref": "SELECT department_id, AVG(commission) AS avg_commission FROM employees GROUP BY department_id;" },
    { "id": 19, "prompt": "Count customers per region.", "ref": "SELECT region, COUNT(*) AS customer_count FROM customers GROUP BY region;" },
    { "id": 20, "prompt": "Find region with the most customers.", "ref": "SELECT region, COUNT(*) AS cnt FROM customers GROUP BY region ORDER BY cnt DESC LIMIT 1;" },
    { "id": 21, "prompt": "Find product categories where average unit_price exceeds 5000.", "ref": "SELECT category_id, AVG(unit_price) AS avg_price FROM products GROUP BY category_id HAVING AVG(unit_price) > 5000;" },
    { "id": 22, "prompt": "Group orders by status and find the average total_amount per status.", "ref": "SELECT status, AVG(total_amount) AS avg_amount FROM orders GROUP BY status;" },
    { "id": 23, "prompt": "Find which department has the highest average salary.", "ref": "SELECT department_id, AVG(salary) AS avg_sal FROM employees GROUP BY department_id ORDER BY avg_sal DESC LIMIT 1;" },
    { "id": 24, "prompt": "Count orders grouped by customer_id and status.", "ref": "SELECT customer_id, status, COUNT(*) AS cnt FROM orders GROUP BY customer_id, status;" },
    { "id": 25, "prompt": "Find the total stock quantity per category_id from products, only for categories with total stock above 100.", "ref": "SELECT category_id, SUM(stock_qty) AS total_stock FROM products GROUP BY category_id HAVING SUM(stock_qty) > 100;" }
  ],
  "topics": [
    { "id": "topic-1", "label": "Topic 1: GROUP BY & HAVING", "recordingKey": null }
  ]
};
