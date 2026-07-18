// Day 14 — Common Table Expressions (CTEs)
if (!window.COURSE_CONTENT) window.COURSE_CONTENT = {};
window.COURSE_CONTENT['day14'] = {
  "day": 14,
  "title": "Common Table Expressions (CTEs)",
  "db": "retail",
  "emoji": "🏗️",
  "slides": [
    {
      "title": "CTEs — Named Temporary Result Sets",
      "duration": "0:00",
      "html": `
        <h2>🏗️ Common Table Expressions (CTEs)</h2>

        <div class="slide-section">
          <h3>01. What Is a CTE?</h3>
          <p>A <strong>Common Table Expression (CTE)</strong> is a named, temporary result set defined using <code>WITH ... AS (...)</code> and referenced in the main query. CTEs are:</p>
          <ul>
            <li><strong>Readable</strong> — break complex queries into named logical steps</li>
            <li><strong>Reusable</strong> — a CTE can be referenced multiple times in the same query</li>
            <li><strong>Modular</strong> — build queries like functions: each CTE is one step</li>
            <li><strong>Temporary</strong> — only exist for the duration of the query (unlike views)</li>
          </ul>
        </div>

        <div class="slide-section">
          <h3>02. Basic CTE Syntax</h3>
          <pre><code>-- Syntax
WITH cte_name AS (
  SELECT ...  -- this is the CTE definition
)
SELECT ...
FROM   cte_name;

-- Example: Employees earning above average
WITH avg_salary AS (
  SELECT AVG(salary) AS avg_sal
  FROM   employees
)
SELECT e.first_name, e.salary
FROM   employees AS e
CROSS JOIN avg_salary AS a
WHERE  e.salary > a.avg_sal;</code></pre>

          <div class="info-box">
            ℹ️ The <code>WITH</code> clause comes before the main <code>SELECT</code>. The CTE name is used exactly like a table name in the main query. Most databases execute CTEs as inline views — they are not materialised by default unless specified.
          </div>
        </div>

        <div class="slide-section">
          <h3>03. Multiple CTEs</h3>
          <p>Chain multiple CTEs with commas. Each subsequent CTE can reference earlier ones. This is the most powerful feature of CTEs — building a readable pipeline of transformations.</p>

          <pre><code>WITH
-- Step 1: Revenue per customer
customer_revenue AS (
  SELECT customer_id,
         SUM(total_amount) AS total_spent
  FROM   orders
  GROUP BY customer_id
),
-- Step 2: Classify customers
customer_tier AS (
  SELECT customer_id,
         total_spent,
         CASE
           WHEN total_spent >= 100000 THEN 'Platinum'
           WHEN total_spent >= 50000  THEN 'Gold'
           WHEN total_spent >= 10000  THEN 'Silver'
           ELSE 'Bronze'
         END AS tier
  FROM   customer_revenue
)
-- Main query: Show tier distribution
SELECT tier, COUNT(*) AS customer_count, SUM(total_spent) AS tier_revenue
FROM   customer_tier
GROUP BY tier
ORDER BY tier_revenue DESC;</code></pre>
        </div>

        <div class="slide-section">
          <h3>04. CTEs vs Subqueries — When to Use Which</h3>

          <div class="vs-block">
            <div class="vs-card">
              <h4>CTE — Use When:</h4>
              <ul>
                <li>Logic needs to be reused multiple times</li>
                <li>Query has multiple transformation steps</li>
                <li>You want readable, self-documenting code</li>
                <li>Building recursive queries (hierarchies)</li>
              </ul>
            </div>
            <div class="vs-card">
              <h4>Subquery — Use When:</h4>
              <ul>
                <li>Simple, one-off scalar filter value</li>
                <li>Used only in a single location</li>
                <li>You need the value inside an expression</li>
                <li>Brevity is preferred over readability</li>
              </ul>
            </div>
          </div>

          <div class="pro-tip-box">
            💡 <strong>Pro Tip — CTEs in Production:</strong> CTEs make peer code reviews significantly easier. Most data teams enforce the use of CTEs for any query with more than one level of aggregation or more than two joins. Well-named CTEs serve as self-documenting SQL.
          </div>
        </div>

        <div class="slide-section">
          <h3>05. Recursive CTE — Hierarchical Data</h3>
          <p>A <strong>recursive CTE</strong> references itself. It consists of: (1) an <strong>anchor</strong> (base case), and (2) a <strong>recursive member</strong> (each step). Used for traversing trees, org charts, or generating sequences.</p>

          <pre><code>-- Generate numbers 1 through 10 (recursive sequence)
WITH RECURSIVE nums AS (
  SELECT 1 AS n          -- anchor
  UNION ALL
  SELECT n + 1           -- recursive: adds 1 each time
  FROM   nums
  WHERE  n < 10          -- termination condition
)
SELECT * FROM nums;

-- Traverse employee hierarchy from top to bottom
WITH RECURSIVE org_chart AS (
  -- Anchor: top-level employees (no manager)
  SELECT employee_id, first_name, manager_id, 0 AS level
  FROM   employees
  WHERE  manager_id IS NULL
  UNION ALL
  -- Recursive: employees who report to previous level
  SELECT e.employee_id, e.first_name, e.manager_id, oc.level + 1
  FROM   employees AS e
  INNER JOIN org_chart AS oc ON e.manager_id = oc.employee_id
)
SELECT first_name, level
FROM   org_chart
ORDER BY level, first_name;</code></pre>

          <div class="interview-box">
            <h4>🎯 Interview Insight</h4>
            <div>
              <p><strong>Q: What is the difference between a CTE and a temporary table?</strong></p>
              <p><em>A: A CTE is an inline, session-scoped named result set that exists only for the duration of a single query. It cannot be indexed or stored. A temporary table (CREATE TEMP TABLE) is a real table written to the database's temporary storage; it can be indexed, updated, and persisted across multiple queries within a session. Use CTEs for readable multi-step logic in a single query; use temp tables when you need to reuse a dataset across multiple queries or need an index for performance.</em></p>
            </div>
          </div>
        </div>
      `
    }
  ],
  "practiceQuestions": [
    {
      "id": 1,
      "prompt": "<strong>Task: Above Average Salary (CTE)</strong><br/>Using a CTE, find all employees earning above the company average salary.",
      "referenceSql": "WITH avg_sal AS (SELECT AVG(salary) AS avg FROM employees) SELECT first_name, salary FROM employees, avg_sal WHERE salary > avg_sal.avg;"
    },
    {
      "id": 2,
      "prompt": "<strong>Task: Customer Tier (Multi-CTE)</strong><br/>Write a two-step CTE: first compute total revenue per customer, then classify them as 'Gold' (>=50000), 'Silver' (>=10000), or 'Bronze'. Show tier and count.",
      "referenceSql": "WITH cust_rev AS (SELECT customer_id, SUM(total_amount) AS spent FROM orders GROUP BY customer_id), tiers AS (SELECT customer_id, CASE WHEN spent>=50000 THEN 'Gold' WHEN spent>=10000 THEN 'Silver' ELSE 'Bronze' END AS tier FROM cust_rev) SELECT tier, COUNT(*) AS cnt FROM tiers GROUP BY tier;"
    },
    {
      "id": 3,
      "prompt": "<strong>Task: Top Products per Category</strong><br/>Using a CTE, find the product with the highest unit_price in each category.",
      "referenceSql": "WITH max_price AS (SELECT category_id, MAX(unit_price) AS max_p FROM products GROUP BY category_id) SELECT p.name, p.category_id, p.unit_price FROM products p INNER JOIN max_price mp ON p.category_id = mp.category_id AND p.unit_price = mp.max_p;"
    },
    {
      "id": 4,
      "prompt": "<strong>Task: Department Payroll Summary</strong><br/>Use a CTE to compute total payroll per department, then find departments with payroll above the median.",
      "referenceSql": "WITH dept_pay AS (SELECT department_id, SUM(salary) AS payroll FROM employees GROUP BY department_id) SELECT * FROM dept_pay WHERE payroll > (SELECT AVG(payroll) FROM dept_pay);"
    },
    {
      "id": 5,
      "prompt": "<strong>Task: Order Revenue Ranking</strong><br/>Using a CTE, compute total revenue per customer and rank by revenue.",
      "referenceSql": "WITH cust_rev AS (SELECT customer_id, SUM(total_amount) AS revenue FROM orders GROUP BY customer_id) SELECT customer_id, revenue FROM cust_rev ORDER BY revenue DESC;"
    },
    {
      "id": 6,
      "prompt": "<strong>Task: Recursive Number Series</strong><br/>Write a recursive CTE to generate numbers from 1 to 15.",
      "referenceSql": "WITH RECURSIVE nums AS (SELECT 1 AS n UNION ALL SELECT n + 1 FROM nums WHERE n < 15) SELECT * FROM nums;"
    }
  ],
  "testQuestions": [
    { "id": 1, "prompt": "Use a CTE to find employees earning above average.", "ref": "WITH avg_s AS (SELECT AVG(salary) AS avg FROM employees) SELECT * FROM employees WHERE salary > (SELECT avg FROM avg_s);" },
    { "id": 2, "prompt": "CTE: Compute total revenue per customer, then select customers who spent > 50000.", "ref": "WITH cr AS (SELECT customer_id, SUM(total_amount) AS rev FROM orders GROUP BY customer_id) SELECT * FROM cr WHERE rev > 50000;" },
    { "id": 3, "prompt": "CTE: Find average order value per customer, then find those above company-wide average.", "ref": "WITH avg_ord AS (SELECT customer_id, AVG(total_amount) AS avg_o FROM orders GROUP BY customer_id) SELECT * FROM avg_ord WHERE avg_o > (SELECT AVG(total_amount) FROM orders);" },
    { "id": 4, "prompt": "CTE: Find top 3 customers by total spend.", "ref": "WITH spend AS (SELECT customer_id, SUM(total_amount) AS total FROM orders GROUP BY customer_id) SELECT * FROM spend ORDER BY total DESC LIMIT 3;" },
    { "id": 5, "prompt": "CTE: Compute products' profit margin; then find products with margin > 40%.", "ref": "WITH margins AS (SELECT name, (unit_price-cost_price)*100.0/unit_price AS margin FROM products) SELECT * FROM margins WHERE margin > 40;" },
    { "id": 6, "prompt": "Multi-CTE: Step 1 = revenue per department via employee orders, Step 2 = rank by revenue.", "ref": "WITH emp_orders AS (SELECT e.department_id, SUM(o.total_amount) AS rev FROM orders o INNER JOIN employees e ON o.employee_id = e.employee_id GROUP BY e.department_id) SELECT * FROM emp_orders ORDER BY rev DESC;" },
    { "id": 7, "prompt": "CTE: For each product, compute total qty sold, then find products with qty_sold > 5.", "ref": "WITH sold AS (SELECT product_id, SUM(qty) AS qty_sold FROM order_items GROUP BY product_id) SELECT * FROM sold WHERE qty_sold > 5;" },
    { "id": 8, "prompt": "Recursive CTE: Generate months 1 through 12.", "ref": "WITH RECURSIVE months AS (SELECT 1 AS m UNION ALL SELECT m+1 FROM months WHERE m < 12) SELECT * FROM months;" },
    { "id": 9, "prompt": "CTE: Find the best-selling product (most qty sold) in each category.", "ref": "WITH sold AS (SELECT product_id, SUM(qty) AS qty FROM order_items GROUP BY product_id), best AS (SELECT p.category_id, p.product_id, p.name, s.qty FROM products p INNER JOIN sold s ON p.product_id = s.product_id) SELECT * FROM best WHERE qty = (SELECT MAX(qty) FROM best b2 WHERE b2.category_id = best.category_id);" },
    { "id": 10, "prompt": "CTE: Classify orders as 'Large' (>50000), 'Medium' (>10000), or 'Small', then count per class.", "ref": "WITH classified AS (SELECT CASE WHEN total_amount>50000 THEN 'Large' WHEN total_amount>10000 THEN 'Medium' ELSE 'Small' END AS cls FROM orders) SELECT cls, COUNT(*) FROM classified GROUP BY cls;" },
    { "id": 11, "prompt": "CTE: Find employees hired in 2022 and their department names.", "ref": "WITH new_hires AS (SELECT * FROM employees WHERE strftime('%Y', hire_date)='2022') SELECT h.first_name, d.name FROM new_hires h INNER JOIN departments d ON h.department_id = d.department_id;" },
    { "id": 12, "prompt": "CTE: Compute fulfillment days for each shipped order, then find orders taking > 5 days.", "ref": "WITH ful AS (SELECT order_id, CAST(julianday(shipped_date)-julianday(order_date) AS INTEGER) AS days FROM orders WHERE shipped_date IS NOT NULL) SELECT * FROM ful WHERE days > 5;" },
    { "id": 13, "prompt": "CTE: Find customers who placed orders in both 2023 and 2024.", "ref": "WITH y23 AS (SELECT DISTINCT customer_id FROM orders WHERE strftime('%Y',order_date)='2023'), y24 AS (SELECT DISTINCT customer_id FROM orders WHERE strftime('%Y',order_date)='2024') SELECT * FROM y23 INNER JOIN y24 USING(customer_id);" },
    { "id": 14, "prompt": "CTE: Compute per-department avg salary; flag departments with avg > 75000.", "ref": "WITH da AS (SELECT department_id, AVG(salary) AS avg_sal FROM employees GROUP BY department_id) SELECT *, CASE WHEN avg_sal>75000 THEN 'High' ELSE 'Normal' END AS flag FROM da;" },
    { "id": 15, "prompt": "Multi-CTE: Step1=revenue per order, Step2=avg revenue, Step3=orders above avg.", "ref": "WITH rev AS (SELECT order_id, total_amount FROM orders), avg_rev AS (SELECT AVG(total_amount) AS avg_r FROM rev) SELECT * FROM rev WHERE total_amount > (SELECT avg_r FROM avg_rev);" },
    { "id": 16, "prompt": "CTE: Find the second-highest salary using a CTE.", "ref": "WITH ranked AS (SELECT salary FROM employees ORDER BY salary DESC LIMIT 2) SELECT MIN(salary) FROM ranked;" },
    { "id": 17, "prompt": "CTE: Count unique customers per region, then find regions with more than 2 customers.", "ref": "WITH rg AS (SELECT region, COUNT(*) AS cnt FROM customers GROUP BY region) SELECT * FROM rg WHERE cnt > 2;" },
    { "id": 18, "prompt": "CTE: Products with profit margin > 30% and stock_qty > 20.", "ref": "WITH pm AS (SELECT name, (unit_price-cost_price)*100.0/unit_price AS margin, stock_qty FROM products) SELECT * FROM pm WHERE margin > 30 AND stock_qty > 20;" },
    { "id": 19, "prompt": "CTE: Total orders per month in 2024, then find months with total_amount > 100000.", "ref": "WITH monthly AS (SELECT strftime('%m',order_date) AS m, SUM(total_amount) AS rev FROM orders WHERE strftime('%Y',order_date)='2024' GROUP BY m) SELECT * FROM monthly WHERE rev > 100000;" },
    { "id": 20, "prompt": "Recursive CTE: Walk the employee hierarchy starting from employee_id = 1 (their direct reports, and their reports' reports).", "ref": "WITH RECURSIVE hier AS (SELECT employee_id, first_name, manager_id, 0 AS lvl FROM employees WHERE employee_id=1 UNION ALL SELECT e.employee_id, e.first_name, e.manager_id, h.lvl+1 FROM employees e INNER JOIN hier h ON e.manager_id=h.employee_id) SELECT * FROM hier;" },
    { "id": 21, "prompt": "CTE: Find the employee with the highest salary in each department.", "ref": "WITH dept_max AS (SELECT department_id, MAX(salary) AS max_sal FROM employees GROUP BY department_id) SELECT e.first_name, e.department_id, e.salary FROM employees e INNER JOIN dept_max dm ON e.department_id=dm.department_id AND e.salary=dm.max_sal;" },
    { "id": 22, "prompt": "CTE: Compute each customer's average order value, join to customers, show those above 20000.", "ref": "WITH avg_ord AS (SELECT customer_id, AVG(total_amount) AS avg_o FROM orders GROUP BY customer_id) SELECT c.first_name, a.avg_o FROM customers c INNER JOIN avg_ord a ON c.customer_id=a.customer_id WHERE a.avg_o > 20000;" },
    { "id": 23, "prompt": "CTE: Compute total stock_value per category, then rank by stock_value.", "ref": "WITH sv AS (SELECT category_id, SUM(stock_qty*unit_price) AS stock_val FROM products GROUP BY category_id) SELECT * FROM sv ORDER BY stock_val DESC;" },
    { "id": 24, "prompt": "CTE: Find orders where total_amount is above the 90th percentile (top 10%).", "ref": "WITH sorted AS (SELECT total_amount FROM orders ORDER BY total_amount DESC), cutoff AS (SELECT total_amount AS p90 FROM sorted LIMIT 1 OFFSET (SELECT CAST(COUNT(*)*0.1 AS INTEGER) FROM orders)) SELECT * FROM orders WHERE total_amount >= (SELECT p90 FROM cutoff);" },
    { "id": 25, "prompt": "CTE: Find which employee processed the most orders and the total revenue they handled.", "ref": "WITH emp_rev AS (SELECT employee_id, COUNT(*) AS orders, SUM(total_amount) AS revenue FROM orders GROUP BY employee_id) SELECT e.first_name, r.orders, r.revenue FROM emp_rev r INNER JOIN employees e ON r.employee_id=e.employee_id ORDER BY r.orders DESC LIMIT 1;" }
  ],
  "topics": [
    { "id": "topic-1", "label": "Topic 1: CTEs, Multi-CTEs & Recursive CTEs", "recordingKey": null }
  ]
};
