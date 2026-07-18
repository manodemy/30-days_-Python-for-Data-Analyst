// Day 15 — Window Functions I: Ranking (ROW_NUMBER, RANK, DENSE_RANK, NTILE)
if (!window.COURSE_CONTENT) window.COURSE_CONTENT = {};
window.COURSE_CONTENT['day15'] = {
  "day": 15,
  "title": "Window Functions I — Ranking",
  "db": "retail",
  "emoji": "🔢",
  "slides": [
    {
      "title": "Window Functions I — Ranking Functions",
      "duration": "0:00",
      "html": `
        <h2>🔢 Window Functions I — Ranking</h2>

        <div class="slide-section">
          <h3>01. What Are Window Functions?</h3>
          <p>Window functions perform calculations <strong>across a set of rows related to the current row</strong> — without collapsing them into a single output row (unlike aggregate functions). They use the <code>OVER()</code> clause to define the "window" of rows to consider.</p>

          <div class="vs-block">
            <div class="vs-card">
              <h4>Aggregate Function</h4>
              <p>Collapses many rows into ONE result per group.</p>
              <pre><code>-- Returns 1 row per department
SELECT department_id, AVG(salary)
FROM employees
GROUP BY department_id;</code></pre>
            </div>
            <div class="vs-card">
              <h4>Window Function</h4>
              <p>Computes a result PER ROW while still seeing related rows.</p>
              <pre><code>-- Returns EVERY row with department avg
SELECT first_name, salary,
  AVG(salary) OVER (PARTITION BY department_id)
  AS dept_avg
FROM employees;</code></pre>
            </div>
          </div>
        </div>

        <div class="slide-section">
          <h3>02. OVER() Clause Anatomy</h3>
          <pre><code>function_name()  OVER (
  PARTITION BY column(s)   -- defines the window groups
  ORDER BY     column(s)   -- ordering within each partition
  ROWS/RANGE   frame_spec  -- frame boundary (optional)
)</code></pre>

          <div class="info-box">
            ℹ️ <code>PARTITION BY</code> is like <code>GROUP BY</code> for the window — it divides rows into groups. <code>ORDER BY</code> within the OVER clause orders rows <em>within each partition</em> for ranking / running totals. Neither collapses the result.
          </div>
        </div>

        <div class="slide-section">
          <h3>03. ROW_NUMBER — Unique Sequential Number</h3>
          <p><code>ROW_NUMBER()</code> assigns a unique sequential integer (1, 2, 3, …) to each row within the partition. Ties receive different numbers — no two rows get the same number.</p>

          <pre><code>-- Rank employees by salary within each department (unique)
SELECT first_name,
       department_id,
       salary,
       ROW_NUMBER() OVER (
         PARTITION BY department_id
         ORDER BY salary DESC
       ) AS row_num
FROM   employees;

-- Find the #1 earner in each department (using CTE)
WITH ranked AS (
  SELECT first_name, department_id, salary,
         ROW_NUMBER() OVER (
           PARTITION BY department_id ORDER BY salary DESC
         ) AS rn
  FROM employees
)
SELECT * FROM ranked WHERE rn = 1;</code></pre>
        </div>

        <div class="slide-section">
          <h3>04. RANK vs DENSE_RANK — Handling Ties</h3>

          <div class="vs-block">
            <div class="vs-card">
              <h4>RANK()</h4>
              <p>Tied rows get the same rank. The next rank <em>skips</em> numbers (1, 2, 2, <strong>4</strong>, 5).</p>
              <pre><code>SELECT first_name, salary,
  RANK() OVER (ORDER BY salary DESC) AS rnk
FROM employees;</code></pre>
            </div>
            <div class="vs-card">
              <h4>DENSE_RANK()</h4>
              <p>Tied rows get the same rank. The next rank does <em>not</em> skip (1, 2, 2, <strong>3</strong>, 4).</p>
              <pre><code>SELECT first_name, salary,
  DENSE_RANK() OVER (ORDER BY salary DESC) AS drnk
FROM employees;</code></pre>
            </div>
          </div>

          <pre><code>-- Side-by-side comparison
SELECT first_name,
       salary,
       RANK()       OVER (ORDER BY salary DESC) AS rank_val,
       DENSE_RANK() OVER (ORDER BY salary DESC) AS dense_rank_val,
       ROW_NUMBER() OVER (ORDER BY salary DESC) AS row_num
FROM   employees
ORDER BY salary DESC;</code></pre>

          <div class="warn-box">
            ⚠️ <strong>Common Mistake:</strong> Using <code>WHERE rank_val = 2</code> to get the second highest when there are ties may return zero rows if two employees are tied for first (both get rank 1, and rank 2 is skipped). Use <code>DENSE_RANK() = 2</code> to reliably get the "second highest salary group".
          </div>
        </div>

        <div class="slide-section">
          <h3>05. NTILE — Distributing Rows into Buckets</h3>
          <p><code>NTILE(n)</code> divides rows into <strong>n equal buckets</strong> and assigns a bucket number. Useful for quartiles, percentiles, and A/B testing assignments.</p>

          <pre><code>-- Divide employees into 4 salary quartiles
SELECT first_name,
       salary,
       NTILE(4) OVER (ORDER BY salary DESC) AS quartile
FROM   employees;

-- Quartile 1 = top 25%, Quartile 4 = bottom 25%

-- Percentile groups (deciles = 10 buckets)
SELECT first_name,
       salary,
       NTILE(10) OVER (ORDER BY salary DESC) AS decile
FROM   employees;</code></pre>
        </div>

        <div class="slide-section">
          <h3>06. Window Functions Cannot Appear in WHERE</h3>
          <p>Window functions are computed in Step 6 (SELECT) — after WHERE and HAVING. You cannot filter on them directly. Use a CTE or subquery to wrap and then filter.</p>

          <pre><code>-- ❌ Wrong — window functions cannot be in WHERE
SELECT first_name,
       ROW_NUMBER() OVER (ORDER BY salary DESC) AS rn
FROM   employees
WHERE  ROW_NUMBER() OVER (ORDER BY salary DESC) = 1;  -- ERROR!

-- ✅ Correct — wrap in CTE, then filter
WITH ranked AS (
  SELECT first_name, salary,
         ROW_NUMBER() OVER (ORDER BY salary DESC) AS rn
  FROM   employees
)
SELECT * FROM ranked WHERE rn <= 3;</code></pre>

          <div class="interview-box">
            <h4>🎯 Interview Insight — N-th Highest Salary</h4>
            <div>
              <p><strong>Q: Find the 3rd highest salary in the company.</strong></p>
              <p><em>A: WITH ranked AS (SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) AS dr FROM employees) SELECT DISTINCT salary FROM ranked WHERE dr = 3; — Using DENSE_RANK ensures we get the actual 3rd distinct salary level even if multiple employees share the top salary.</em></p>
            </div>
          </div>
        </div>
      `
    }
  ],
  "practiceQuestions": [
    {
      "id": 1,
      "prompt": "<strong>Task: Department Salary Rank</strong><br/>Rank employees by salary within each department using <code>RANK()</code>.",
      "referenceSql": "SELECT first_name, department_id, salary, RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) AS dept_rank FROM employees;"
    },
    {
      "id": 2,
      "prompt": "<strong>Task: Top Earner per Dept</strong><br/>Using ROW_NUMBER and a CTE, find the highest-paid employee in each department.",
      "referenceSql": "WITH ranked AS (SELECT first_name, department_id, salary, ROW_NUMBER() OVER (PARTITION BY department_id ORDER BY salary DESC) AS rn FROM employees) SELECT * FROM ranked WHERE rn = 1;"
    },
    {
      "id": 3,
      "prompt": "<strong>Task: Salary Quartiles</strong><br/>Assign each employee to one of 4 salary quartiles company-wide using NTILE.",
      "referenceSql": "SELECT first_name, salary, NTILE(4) OVER (ORDER BY salary DESC) AS quartile FROM employees ORDER BY salary DESC;"
    },
    {
      "id": 4,
      "prompt": "<strong>Task: RANK vs DENSE_RANK</strong><br/>Show <code>first_name</code>, <code>salary</code>, <code>RANK()</code>, and <code>DENSE_RANK()</code> ordered by salary descending company-wide.",
      "referenceSql": "SELECT first_name, salary, RANK() OVER (ORDER BY salary DESC) AS rnk, DENSE_RANK() OVER (ORDER BY salary DESC) AS dense_rnk FROM employees ORDER BY salary DESC;"
    },
    {
      "id": 5,
      "prompt": "<strong>Task: 3rd Highest Salary</strong><br/>Find the 3rd highest distinct salary using DENSE_RANK and a CTE.",
      "referenceSql": "WITH ranked AS (SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) AS dr FROM employees) SELECT DISTINCT salary FROM ranked WHERE dr = 3;"
    },
    {
      "id": 6,
      "prompt": "<strong>Task: Top 3 Customers by Revenue</strong><br/>Using ROW_NUMBER and a CTE, rank customers by total_amount spent and return the top 3.",
      "referenceSql": "WITH cust_rev AS (SELECT customer_id, SUM(total_amount) AS total, ROW_NUMBER() OVER (ORDER BY SUM(total_amount) DESC) AS rn FROM orders GROUP BY customer_id) SELECT * FROM cust_rev WHERE rn <= 3;"
    }
  ],
  "testQuestions": [
    { "id": 1, "prompt": "Rank all employees by salary using ROW_NUMBER() (global, no partition).", "ref": "SELECT first_name, salary, ROW_NUMBER() OVER (ORDER BY salary DESC) AS rn FROM employees;" },
    { "id": 2, "prompt": "Rank employees by salary within each department using RANK().", "ref": "SELECT first_name, department_id, salary, RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) AS rnk FROM employees;" },
    { "id": 3, "prompt": "Show RANK and DENSE_RANK side by side for employees sorted by salary.", "ref": "SELECT first_name, salary, RANK() OVER (ORDER BY salary DESC) AS r, DENSE_RANK() OVER (ORDER BY salary DESC) AS dr FROM employees;" },
    { "id": 4, "prompt": "Assign salary deciles (10 buckets) to employees using NTILE(10).", "ref": "SELECT first_name, salary, NTILE(10) OVER (ORDER BY salary DESC) AS decile FROM employees;" },
    { "id": 5, "prompt": "Find the top earner in each department using ROW_NUMBER and CTE.", "ref": "WITH r AS (SELECT *, ROW_NUMBER() OVER (PARTITION BY department_id ORDER BY salary DESC) AS rn FROM employees) SELECT * FROM r WHERE rn = 1;" },
    { "id": 6, "prompt": "Find the 2nd highest salary (DENSE_RANK approach).", "ref": "WITH r AS (SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) AS dr FROM employees) SELECT DISTINCT salary FROM r WHERE dr = 2;" },
    { "id": 7, "prompt": "Find the bottom 3 earners company-wide using ROW_NUMBER sorted ASC.", "ref": "WITH r AS (SELECT *, ROW_NUMBER() OVER (ORDER BY salary ASC) AS rn FROM employees) SELECT * FROM r WHERE rn <= 3;" },
    { "id": 8, "prompt": "Divide products by unit_price into 3 price tiers using NTILE(3).", "ref": "SELECT name, unit_price, NTILE(3) OVER (ORDER BY unit_price DESC) AS price_tier FROM products;" },
    { "id": 9, "prompt": "Rank products by total qty sold (from order_items) using RANK().", "ref": "SELECT product_id, SUM(qty) AS total_sold, RANK() OVER (ORDER BY SUM(qty) DESC) AS rnk FROM order_items GROUP BY product_id;" },
    { "id": 10, "prompt": "Find employees whose DENSE_RANK salary is 1 or 2 (top 2 salary levels).", "ref": "WITH r AS (SELECT *, DENSE_RANK() OVER (ORDER BY salary DESC) AS dr FROM employees) SELECT * FROM r WHERE dr <= 2;" },
    { "id": 11, "prompt": "Using ROW_NUMBER, get the 3 most recent orders per customer.", "ref": "WITH r AS (SELECT *, ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date DESC) AS rn FROM orders) SELECT * FROM r WHERE rn <= 3;" },
    { "id": 12, "prompt": "Assign order rank per customer (by total_amount descending) using DENSE_RANK.", "ref": "SELECT customer_id, order_id, total_amount, DENSE_RANK() OVER (PARTITION BY customer_id ORDER BY total_amount DESC) AS order_rank FROM orders;" },
    { "id": 13, "prompt": "Find the cheapest product in each category using ROW_NUMBER (sort ASC).", "ref": "WITH r AS (SELECT *, ROW_NUMBER() OVER (PARTITION BY category_id ORDER BY unit_price ASC) AS rn FROM products) SELECT * FROM r WHERE rn = 1;" },
    { "id": 14, "prompt": "Divide customers into 4 groups by their total_spent using NTILE.", "ref": "WITH cs AS (SELECT customer_id, SUM(total_amount) AS spent FROM orders GROUP BY customer_id) SELECT customer_id, spent, NTILE(4) OVER (ORDER BY spent DESC) AS quartile FROM cs;" },
    { "id": 15, "prompt": "Using RANK(), find all employees tied for the highest salary in each department.", "ref": "WITH r AS (SELECT *, RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) AS rnk FROM employees) SELECT * FROM r WHERE rnk = 1;" },
    { "id": 16, "prompt": "Show the ROW_NUMBER for each order per customer ordered by order_date.", "ref": "SELECT customer_id, order_id, order_date, ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date) AS order_seq FROM orders;" },
    { "id": 17, "prompt": "Find which NTILE quartile each product falls into by profit margin.", "ref": "SELECT name, (unit_price-cost_price)*100.0/unit_price AS margin, NTILE(4) OVER (ORDER BY (unit_price-cost_price)*100.0/unit_price DESC) AS quartile FROM products;" },
    { "id": 18, "prompt": "Rank employees by hire_date within each department (earliest = rank 1).", "ref": "SELECT first_name, department_id, hire_date, RANK() OVER (PARTITION BY department_id ORDER BY hire_date ASC) AS hire_rank FROM employees;" },
    { "id": 19, "prompt": "Find the 5th highest order total in the orders table.", "ref": "WITH r AS (SELECT total_amount, DENSE_RANK() OVER (ORDER BY total_amount DESC) AS dr FROM orders) SELECT DISTINCT total_amount FROM r WHERE dr = 5;" },
    { "id": 20, "prompt": "Rank products by total revenue generated, using DENSE_RANK.", "ref": "SELECT product_id, SUM(qty*price) AS rev, DENSE_RANK() OVER (ORDER BY SUM(qty*price) DESC) AS dr FROM order_items GROUP BY product_id;" },
    { "id": 21, "prompt": "Find the first order date per customer using ROW_NUMBER and CTE.", "ref": "WITH r AS (SELECT *, ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date ASC) AS rn FROM orders) SELECT customer_id, order_id, order_date FROM r WHERE rn = 1;" },
    { "id": 22, "prompt": "Assign salary NTILE(5) (quintile) per department.", "ref": "SELECT first_name, department_id, salary, NTILE(5) OVER (PARTITION BY department_id ORDER BY salary DESC) AS quintile FROM employees;" },
    { "id": 23, "prompt": "Find the 2 most expensive products in each category using ROW_NUMBER.", "ref": "WITH r AS (SELECT *, ROW_NUMBER() OVER (PARTITION BY category_id ORDER BY unit_price DESC) AS rn FROM products) SELECT * FROM r WHERE rn <= 2;" },
    { "id": 24, "prompt": "Rank orders by total_amount within each status group using RANK().", "ref": "SELECT order_id, status, total_amount, RANK() OVER (PARTITION BY status ORDER BY total_amount DESC) AS rnk FROM orders;" },
    { "id": 25, "prompt": "Find the top 2 products by qty sold in each category using ROW_NUMBER.", "ref": "WITH sold AS (SELECT oi.product_id, p.category_id, SUM(oi.qty) AS qty FROM order_items oi INNER JOIN products p ON oi.product_id=p.product_id GROUP BY oi.product_id, p.category_id), ranked AS (SELECT *, ROW_NUMBER() OVER (PARTITION BY category_id ORDER BY qty DESC) AS rn FROM sold) SELECT * FROM ranked WHERE rn <= 2;" }
  ],
  "topics": [
    { "id": "topic-1", "label": "Topic 1: ROW_NUMBER, RANK, DENSE_RANK, NTILE", "recordingKey": null }
  ]
};
