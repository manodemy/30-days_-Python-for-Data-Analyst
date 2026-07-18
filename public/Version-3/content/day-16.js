// Day 16 — Window Functions II: Analytic (LAG, LEAD, SUM OVER, AVG OVER, FIRST/LAST VALUE)
if (!window.COURSE_CONTENT) window.COURSE_CONTENT = {};
window.COURSE_CONTENT['day16'] = {
  "day": 16,
  "title": "Window Functions II — Analytic",
  "db": "retail",
  "emoji": "📈",
  "slides": [
    {
      "title": "Window Functions II — Analytic Functions",
      "duration": "0:00",
      "html": `
        <h2>📈 Window Functions II — Analytic</h2>

        <div class="slide-section">
          <h3>01. Running Totals with SUM OVER</h3>
          <p>Using <code>SUM()</code> with an <code>OVER</code> clause and an ORDER BY creates a <strong>running total</strong> — each row shows the cumulative sum up to and including that row. This is the most commonly asked window function in data analyst interviews.</p>

          <pre><code>-- Running total of order amounts over time
SELECT order_id,
       order_date,
       total_amount,
       SUM(total_amount) OVER (
         ORDER BY order_date
       ) AS running_total;
FROM   orders;

-- Running total WITHIN each customer
SELECT customer_id,
       order_id,
       order_date,
       total_amount,
       SUM(total_amount) OVER (
         PARTITION BY customer_id
         ORDER BY order_date
       ) AS customer_running_total
FROM   orders;</code></pre>
        </div>

        <div class="slide-section">
          <h3>02. Moving Averages with ROWS BETWEEN</h3>
          <p>The <strong>window frame</strong> (ROWS/RANGE BETWEEN) specifies which rows to include in the aggregate. This enables rolling/moving averages.</p>

          <pre><code>-- 3-row moving average of order amounts
SELECT order_id,
       order_date,
       total_amount,
       AVG(total_amount) OVER (
         ORDER BY order_date
         ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
       ) AS moving_avg_3
FROM   orders;

-- Frame specification reference:
-- UNBOUNDED PRECEDING = start of partition
-- N PRECEDING         = N rows before current
-- CURRENT ROW         = current row
-- N FOLLOWING         = N rows after current
-- UNBOUNDED FOLLOWING = end of partition</code></pre>

          <div class="info-box">
            ℹ️ Default frame when ORDER BY is present: <code>RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW</code>. This means cumulative sum/avg is the default behaviour when ORDER BY is in OVER.
          </div>
        </div>

        <div class="slide-section">
          <h3>03. LAG and LEAD — Accessing Previous/Next Row</h3>
          <p><code>LAG(col, n)</code> returns the value from <strong>n rows behind</strong> the current row. <code>LEAD(col, n)</code> returns the value from <strong>n rows ahead</strong>. Both return <code>NULL</code> when there is no preceding/following row.</p>

          <pre><code>-- Compare each order to the previous order (month-over-month)
SELECT order_id,
       order_date,
       total_amount,
       LAG(total_amount, 1, 0) OVER (ORDER BY order_date) AS prev_amount,
       total_amount - LAG(total_amount, 1, 0) OVER (ORDER BY order_date) AS delta
FROM   orders;

-- Per-customer: how much did they spend vs. their previous order?
SELECT customer_id,
       order_id,
       total_amount,
       LAG(total_amount) OVER (PARTITION BY customer_id ORDER BY order_date) AS prev_order
FROM   orders;</code></pre>

          <pre><code>-- LEAD: Show the next order date for each customer
SELECT customer_id,
       order_date,
       LEAD(order_date) OVER (
         PARTITION BY customer_id ORDER BY order_date
       ) AS next_order_date
FROM   orders;</code></pre>
        </div>

        <div class="slide-section">
          <h3>04. FIRST_VALUE and LAST_VALUE</h3>
          <p><code>FIRST_VALUE(col)</code> returns the value from the <strong>first row</strong> in the window frame. <code>LAST_VALUE(col)</code> returns the value from the <strong>last row</strong> (requires explicit <code>ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING</code> to see all rows).</p>

          <pre><code>-- First and last salary in each department (by hire_date)
SELECT first_name,
       department_id,
       hire_date,
       salary,
       FIRST_VALUE(salary) OVER (
         PARTITION BY department_id
         ORDER BY hire_date
       ) AS first_hire_salary,
       LAST_VALUE(salary) OVER (
         PARTITION BY department_id
         ORDER BY hire_date
         ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
       ) AS last_hire_salary
FROM   employees;</code></pre>

          <div class="warn-box">
            ⚠️ <code>LAST_VALUE</code> gotcha: Without <code>ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING</code>, the default frame only extends to the current row, so LAST_VALUE returns the current row's value — not the true last. Always specify the full frame for LAST_VALUE.
          </div>
        </div>

        <div class="slide-section">
          <h3>05. Percentage of Total with Window SUM</h3>
          <p>Combine a window SUM (total) with individual row values to compute each row's <strong>share of the total</strong> — without a subquery or self-join.</p>

          <pre><code>-- Each order's percentage of total revenue
SELECT order_id,
       total_amount,
       SUM(total_amount) OVER ()                            AS grand_total,
       ROUND(total_amount * 100.0 /
             SUM(total_amount) OVER (), 2)                  AS pct_of_total
FROM   orders;

-- Each department's payroll as % of company payroll
SELECT department_id,
       salary,
       SUM(salary) OVER () AS company_payroll,
       ROUND(salary * 100.0 / SUM(salary) OVER (), 2) AS pct_of_payroll
FROM   employees;</code></pre>

          <div class="interview-box">
            <h4>🎯 Interview Insight</h4>
            <div>
              <p><strong>Q: Explain the difference between LAG and LEAD with an example.</strong></p>
              <p><em>A: LAG(col, 1) returns the value from the previous row in the ordered partition — useful for computing period-over-period change (e.g., this month's sales vs. last month). LEAD(col, 1) looks forward — useful for computing time-to-next-event (e.g., days until the customer's next purchase). Both default to NULL when there is no preceding/following row; a third argument provides a default: LAG(salary, 1, 0) returns 0 instead of NULL for the first row.</em></p>
            </div>
          </div>
        </div>
      `
    }
  ],
  "practiceQuestions": [
    {
      "id": 1,
      "prompt": "<strong>Task: Running Total</strong><br/>Compute a running total of <code>total_amount</code> over time from the <code>orders</code> table, ordered by <code>order_date</code>.",
      "referenceSql": "SELECT order_id, order_date, total_amount, SUM(total_amount) OVER (ORDER BY order_date) AS running_total FROM orders;"
    },
    {
      "id": 2,
      "prompt": "<strong>Task: Customer Running Total</strong><br/>Compute a running total of <code>total_amount</code> per customer (PARTITION BY customer_id), ordered by order_date.",
      "referenceSql": "SELECT customer_id, order_id, order_date, total_amount, SUM(total_amount) OVER (PARTITION BY customer_id ORDER BY order_date) AS customer_running_total FROM orders;"
    },
    {
      "id": 3,
      "prompt": "<strong>Task: Month-over-Month Delta</strong><br/>Using LAG, compute each order's <code>total_amount</code> and the delta from the previous order (by order_date).",
      "referenceSql": "SELECT order_id, order_date, total_amount, LAG(total_amount) OVER (ORDER BY order_date) AS prev_amount, total_amount - LAG(total_amount, 1, 0) OVER (ORDER BY order_date) AS delta FROM orders;"
    },
    {
      "id": 4,
      "prompt": "<strong>Task: Next Order Date</strong><br/>Using LEAD, show each order's <code>order_date</code> and the customer's next order date.",
      "referenceSql": "SELECT customer_id, order_id, order_date, LEAD(order_date) OVER (PARTITION BY customer_id ORDER BY order_date) AS next_order_date FROM orders;"
    },
    {
      "id": 5,
      "prompt": "<strong>Task: Percentage of Total Revenue</strong><br/>For each order, compute its percentage of total revenue using SUM OVER () without PARTITION.",
      "referenceSql": "SELECT order_id, total_amount, ROUND(total_amount * 100.0 / SUM(total_amount) OVER (), 2) AS pct_of_total FROM orders;"
    },
    {
      "id": 6,
      "prompt": "<strong>Task: 3-Row Moving Average</strong><br/>Compute a 3-row moving average of <code>total_amount</code> using ROWS BETWEEN 2 PRECEDING AND CURRENT ROW.",
      "referenceSql": "SELECT order_id, order_date, total_amount, ROUND(AVG(total_amount) OVER (ORDER BY order_date ROWS BETWEEN 2 PRECEDING AND CURRENT ROW), 2) AS moving_avg FROM orders;"
    }
  ],
  "testQuestions": [
    { "id": 1, "prompt": "Compute a running total of total_amount from orders ordered by order_date.", "ref": "SELECT order_id, total_amount, SUM(total_amount) OVER (ORDER BY order_date) AS running_total FROM orders;" },
    { "id": 2, "prompt": "Compute a running total of salary within each department ordered by hire_date.", "ref": "SELECT first_name, department_id, salary, SUM(salary) OVER (PARTITION BY department_id ORDER BY hire_date) AS running_payroll FROM employees;" },
    { "id": 3, "prompt": "Show each employee's salary and the previous employee's salary (by hire_date) using LAG.", "ref": "SELECT first_name, hire_date, salary, LAG(salary) OVER (ORDER BY hire_date) AS prev_salary FROM employees;" },
    { "id": 4, "prompt": "Show each employee's salary and the next employee's salary (by hire_date) using LEAD.", "ref": "SELECT first_name, hire_date, salary, LEAD(salary) OVER (ORDER BY hire_date) AS next_salary FROM employees;" },
    { "id": 5, "prompt": "Compute % of total company payroll for each employee's salary.", "ref": "SELECT first_name, salary, ROUND(salary * 100.0 / SUM(salary) OVER (), 2) AS pct FROM employees;" },
    { "id": 6, "prompt": "Compute % of department payroll for each employee within their department.", "ref": "SELECT first_name, department_id, salary, ROUND(salary * 100.0 / SUM(salary) OVER (PARTITION BY department_id), 2) AS dept_pct FROM employees;" },
    { "id": 7, "prompt": "Compute a 3-order moving average of total_amount per customer.", "ref": "SELECT customer_id, order_id, total_amount, AVG(total_amount) OVER (PARTITION BY customer_id ORDER BY order_date ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) AS moving_avg FROM orders;" },
    { "id": 8, "prompt": "Show first salary hired in each department using FIRST_VALUE.", "ref": "SELECT first_name, department_id, hire_date, salary, FIRST_VALUE(salary) OVER (PARTITION BY department_id ORDER BY hire_date) AS first_salary FROM employees;" },
    { "id": 9, "prompt": "Compute LAG to find each customer's order amount change from previous order.", "ref": "SELECT customer_id, order_id, total_amount, LAG(total_amount) OVER (PARTITION BY customer_id ORDER BY order_date) AS prev, total_amount - LAG(total_amount, 1, 0) OVER (PARTITION BY customer_id ORDER BY order_date) AS delta FROM orders;" },
    { "id": 10, "prompt": "Show running average of unit_price across products ordered by unit_price.", "ref": "SELECT name, unit_price, AVG(unit_price) OVER (ORDER BY unit_price ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_avg FROM products;" },
    { "id": 11, "prompt": "Using LEAD, show each employee's hire_date and the next hire_date in their department.", "ref": "SELECT first_name, department_id, hire_date, LEAD(hire_date) OVER (PARTITION BY department_id ORDER BY hire_date) AS next_hire FROM employees;" },
    { "id": 12, "prompt": "Compute running count of orders over time.", "ref": "SELECT order_id, order_date, COUNT(*) OVER (ORDER BY order_date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_count FROM orders;" },
    { "id": 13, "prompt": "Compute each department's salary as % of total company payroll.", "ref": "SELECT department_id, SUM(salary) AS dept_pay, ROUND(SUM(salary)*100.0 / SUM(SUM(salary)) OVER (), 2) AS pct FROM employees GROUP BY department_id;" },
    { "id": 14, "prompt": "Show the LAST_VALUE of salary (most recent hire's salary) in each department.", "ref": "SELECT first_name, department_id, salary, LAST_VALUE(salary) OVER (PARTITION BY department_id ORDER BY hire_date ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING) AS last_hired_salary FROM employees;" },
    { "id": 15, "prompt": "Using LAG(2), compare each order to 2 orders ago.", "ref": "SELECT order_id, total_amount, LAG(total_amount, 2) OVER (ORDER BY order_date) AS two_orders_ago FROM orders;" },
    { "id": 16, "prompt": "Compute a cumulative sum of qty sold per product over time from order_items (joined with orders).", "ref": "SELECT oi.product_id, o.order_date, oi.qty, SUM(oi.qty) OVER (PARTITION BY oi.product_id ORDER BY o.order_date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS cumulative_qty FROM order_items oi INNER JOIN orders o ON oi.order_id = o.order_id;" },
    { "id": 17, "prompt": "Compute % of total orders (count) per status.", "ref": "SELECT status, COUNT(*) AS cnt, ROUND(COUNT(*)*100.0 / SUM(COUNT(*)) OVER (), 2) AS pct FROM orders GROUP BY status;" },
    { "id": 18, "prompt": "Show each order's total_amount and the difference from the order before it per customer.", "ref": "SELECT customer_id, order_id, total_amount, total_amount - LAG(total_amount, 1, 0) OVER (PARTITION BY customer_id ORDER BY order_date) AS diff_from_prev FROM orders;" },
    { "id": 19, "prompt": "Compute 5-row moving average of total_amount globally.", "ref": "SELECT order_id, order_date, total_amount, AVG(total_amount) OVER (ORDER BY order_date ROWS BETWEEN 4 PRECEDING AND CURRENT ROW) AS moving_avg_5 FROM orders;" },
    { "id": 20, "prompt": "Find each customer's order that had the biggest jump from the previous order.", "ref": "WITH deltas AS (SELECT customer_id, order_id, total_amount, total_amount - LAG(total_amount, 1, 0) OVER (PARTITION BY customer_id ORDER BY order_date) AS jump FROM orders), ranked AS (SELECT *, ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY jump DESC) AS rn FROM deltas) SELECT * FROM ranked WHERE rn = 1;" },
    { "id": 21, "prompt": "Compute running minimum salary within each department.", "ref": "SELECT first_name, department_id, salary, MIN(salary) OVER (PARTITION BY department_id ORDER BY hire_date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_min FROM employees;" },
    { "id": 22, "prompt": "Show each order and how many days until the NEXT order for that customer (LEAD on order_date).", "ref": "SELECT customer_id, order_id, order_date, CAST(julianday(LEAD(order_date) OVER (PARTITION BY customer_id ORDER BY order_date)) - julianday(order_date) AS INTEGER) AS days_to_next FROM orders;" },
    { "id": 23, "prompt": "Compute each employee's salary as a running % of their department total (ordered by hire_date).", "ref": "SELECT first_name, department_id, salary, ROUND(SUM(salary) OVER (PARTITION BY department_id ORDER BY hire_date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) * 100.0 / SUM(salary) OVER (PARTITION BY department_id), 2) AS cumulative_pct FROM employees;" },
    { "id": 24, "prompt": "Show each product's unit_price and the price of the next-cheaper product using LEAD sorted ASC.", "ref": "SELECT name, unit_price, LEAD(unit_price) OVER (ORDER BY unit_price ASC) AS next_cheaper FROM products;" },
    { "id": 25, "prompt": "Compute the year-over-year revenue growth using LAG on annual totals.", "ref": "WITH yearly AS (SELECT strftime('%Y', order_date) AS yr, SUM(total_amount) AS rev FROM orders GROUP BY yr) SELECT yr, rev, LAG(rev) OVER (ORDER BY yr) AS prev_rev, ROUND((rev - LAG(rev) OVER (ORDER BY yr)) * 100.0 / LAG(rev) OVER (ORDER BY yr), 2) AS yoy_growth_pct FROM yearly;" }
  ],
  "topics": [
    { "id": "topic-1", "label": "Topic 1: LAG, LEAD, SUM/AVG OVER, Moving Averages, FIRST/LAST VALUE", "recordingKey": null }
  ]
};
