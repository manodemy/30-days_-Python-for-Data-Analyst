// Day 13 — Subqueries: scalar, multi-row, correlated, EXISTS
if (!window.COURSE_CONTENT) window.COURSE_CONTENT = {};
window.COURSE_CONTENT['day13'] = {
  "day": 13,
  "title": "Subqueries",
  "db": "retail",
  "emoji": "🧠",
  "slides": [
    {
      "title": "Subqueries — Queries Within Queries",
      "duration": "0:00",
      "html": `
        <h2>🧠 Subqueries</h2>

        <div class="slide-section">
          <h3>01. What Is a Subquery?</h3>
          <p>A <strong>subquery</strong> (nested query / inner query) is a complete SQL query embedded inside another query. The outer query uses the subquery's result. Subqueries can appear in <code>SELECT</code>, <code>FROM</code>, <code>WHERE</code>, and <code>HAVING</code> clauses.</p>

          <div class="db-mock-table-wrap">
            <table class="db-table-mock db-table-mock--compact">
              <thead><tr><th>Type</th><th>Returns</th><th>Used In</th></tr></thead>
              <tbody>
                <tr><td>Scalar</td><td>Single value (1 row, 1 col)</td><td>SELECT, WHERE, HAVING</td></tr>
                <tr><td>Multi-row</td><td>Multiple rows (1 col)</td><td>WHERE IN/ANY/ALL</td></tr>
                <tr><td>Multi-column</td><td>Multiple rows & columns</td><td>FROM (derived table)</td></tr>
                <tr><td>Correlated</td><td>Depends on outer row</td><td>WHERE, SELECT</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="slide-section">
          <h3>02. Scalar Subquery</h3>
          <p>A scalar subquery returns exactly one value (one row, one column). It can appear anywhere a single value is expected — including in SELECT expressions.</p>

          <pre><code>-- Employees earning above the company average
SELECT first_name, salary
FROM   employees
WHERE  salary > (SELECT AVG(salary) FROM employees);

-- Show each employee's salary vs. company average
SELECT first_name,
       salary,
       (SELECT AVG(salary) FROM employees) AS company_avg,
       salary - (SELECT AVG(salary) FROM employees) AS diff_from_avg
FROM   employees
ORDER BY diff_from_avg DESC;</code></pre>
        </div>

        <div class="slide-section">
          <h3>03. Multi-Row Subquery with IN</h3>
          <p>When a subquery returns multiple rows, use <code>IN</code>, <code>ANY</code>, or <code>ALL</code> to compare against the list.</p>

          <pre><code>-- Customers who have placed at least one order
SELECT first_name, last_name
FROM   customers
WHERE  customer_id IN (SELECT DISTINCT customer_id FROM orders);

-- Products that appear in Shipped orders
SELECT name
FROM   products
WHERE  product_id IN (
  SELECT oi.product_id
  FROM   order_items AS oi
  INNER JOIN orders AS o ON oi.order_id = o.order_id
  WHERE  o.status = 'Shipped'
);</code></pre>
        </div>

        <div class="slide-section">
          <h3>04. Subquery in FROM (Derived Table)</h3>
          <p>A subquery in the <code>FROM</code> clause creates a <strong>derived table</strong> (inline view). You must alias it and can then query it like any table. Useful for multi-step aggregations.</p>

          <pre><code>-- Average of per-department averages (requires two levels of aggregation)
SELECT AVG(dept_avg_salary) AS avg_dept_avg
FROM (
  SELECT department_id,
         AVG(salary) AS dept_avg_salary
  FROM   employees
  GROUP BY department_id
) AS dept_summary;

-- Find departments that are above the company avg salary
SELECT department_id, dept_avg_salary
FROM (
  SELECT department_id, AVG(salary) AS dept_avg_salary
  FROM   employees
  GROUP BY department_id
) AS dept_summary
WHERE dept_avg_salary > (SELECT AVG(salary) FROM employees);</code></pre>
        </div>

        <div class="slide-section">
          <h3>05. Correlated Subquery</h3>
          <p>A <strong>correlated subquery</strong> references columns from the outer query — it is re-executed once for each row of the outer query. While powerful, they can be slow on large datasets.</p>

          <pre><code>-- For each employee, find the highest-earning colleague in their department
SELECT e1.first_name,
       e1.salary,
       e1.department_id,
       (SELECT MAX(e2.salary)
        FROM   employees AS e2
        WHERE  e2.department_id = e1.department_id) AS dept_max
FROM   employees AS e1;

-- Employees who earn MORE than the average of their own department
SELECT first_name, salary, department_id
FROM   employees AS e1
WHERE  salary > (
  SELECT AVG(salary)
  FROM   employees AS e2
  WHERE  e2.department_id = e1.department_id
);</code></pre>

          <div class="pro-tip-box">
            💡 <strong>Correlated vs. Non-Correlated:</strong> Non-correlated subqueries run once. Correlated subqueries run N times (once per outer row). For performance at scale, consider rewriting correlated subqueries as JOINs or CTEs (covered in Day 14).
          </div>
        </div>

        <div class="slide-section">
          <h3>06. EXISTS and NOT EXISTS</h3>
          <p><code>EXISTS</code> returns TRUE if the subquery returns at least one row. It is more efficient than <code>IN</code> for large datasets because it short-circuits on the first match.</p>

          <pre><code>-- Customers who have placed at least one order
SELECT c.first_name
FROM   customers AS c
WHERE  EXISTS (
  SELECT 1
  FROM   orders AS o
  WHERE  o.customer_id = c.customer_id
);

-- Customers who have NEVER placed an order
SELECT c.first_name
FROM   customers AS c
WHERE  NOT EXISTS (
  SELECT 1
  FROM   orders AS o
  WHERE  o.customer_id = c.customer_id
);</code></pre>

          <div class="interview-box">
            <h4>🎯 Interview Insight</h4>
            <div>
              <p><strong>Q: EXISTS vs IN — which is faster and why?</strong></p>
              <p><em>A: EXISTS short-circuits — it stops as soon as the first match is found. IN materialises the entire result set into a list before comparison. For large subqueries, EXISTS is generally faster. However, NOT IN with NULLs in the subquery produces incorrect results (returns no rows), whereas NOT EXISTS handles NULLs correctly. In modern query optimisers the difference is often negligible, but the NULL safety of NOT EXISTS is always the safer choice.</em></p>
            </div>
          </div>
        </div>
      `
    }
  ],
  "practiceQuestions": [
    {
      "id": 1,
      "prompt": "<strong>Task: Above Average Earners</strong><br/>Find all employees earning more than the company-wide average salary.",
      "referenceSql": "SELECT first_name, salary FROM employees WHERE salary > (SELECT AVG(salary) FROM employees);"
    },
    {
      "id": 2,
      "prompt": "<strong>Task: Customer Orders</strong><br/>Using a subquery with IN, find customers who have placed at least one order.",
      "referenceSql": "SELECT first_name, last_name FROM customers WHERE customer_id IN (SELECT DISTINCT customer_id FROM orders);"
    },
    {
      "id": 3,
      "prompt": "<strong>Task: Products in Shipped Orders</strong><br/>Find product names that appear in at least one Shipped order (use a subquery).",
      "referenceSql": "SELECT name FROM products WHERE product_id IN (SELECT oi.product_id FROM order_items oi INNER JOIN orders o ON oi.order_id = o.order_id WHERE o.status = 'Shipped');"
    },
    {
      "id": 4,
      "prompt": "<strong>Task: Dept Salary vs Company</strong><br/>Find departments whose average salary exceeds the company-wide average (use a derived table).",
      "referenceSql": "SELECT department_id, dept_avg FROM (SELECT department_id, AVG(salary) AS dept_avg FROM employees GROUP BY department_id) AS ds WHERE dept_avg > (SELECT AVG(salary) FROM employees);"
    },
    {
      "id": 5,
      "prompt": "<strong>Task: EXISTS — Customers with Orders</strong><br/>Using EXISTS, find all customers who have placed at least one order.",
      "referenceSql": "SELECT first_name FROM customers c WHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.customer_id);"
    },
    {
      "id": 6,
      "prompt": "<strong>Task: Employees Above Department Average</strong><br/>Using a correlated subquery, find employees who earn more than the average salary of their own department.",
      "referenceSql": "SELECT first_name, salary, department_id FROM employees e1 WHERE salary > (SELECT AVG(salary) FROM employees e2 WHERE e2.department_id = e1.department_id);"
    }
  ],
  "testQuestions": [
    { "id": 1, "prompt": "Find employees earning above the company average salary.", "ref": "SELECT * FROM employees WHERE salary > (SELECT AVG(salary) FROM employees);" },
    { "id": 2, "prompt": "Find the employee with the maximum salary using a scalar subquery.", "ref": "SELECT * FROM employees WHERE salary = (SELECT MAX(salary) FROM employees);" },
    { "id": 3, "prompt": "Find customers who have placed at least one order (subquery with IN).", "ref": "SELECT * FROM customers WHERE customer_id IN (SELECT DISTINCT customer_id FROM orders);" },
    { "id": 4, "prompt": "Find customers who have NEVER placed an order (NOT IN).", "ref": "SELECT * FROM customers WHERE customer_id NOT IN (SELECT DISTINCT customer_id FROM orders);" },
    { "id": 5, "prompt": "Find products never ordered (NOT IN from order_items).", "ref": "SELECT * FROM products WHERE product_id NOT IN (SELECT DISTINCT product_id FROM order_items);" },
    { "id": 6, "prompt": "Find products whose unit_price is above the average unit_price.", "ref": "SELECT * FROM products WHERE unit_price > (SELECT AVG(unit_price) FROM products);" },
    { "id": 7, "prompt": "Using a derived table, find the average of department averages.", "ref": "SELECT AVG(dept_avg) FROM (SELECT AVG(salary) AS dept_avg FROM employees GROUP BY department_id) ds;" },
    { "id": 8, "prompt": "Find all orders from customers in the 'North' region using a subquery.", "ref": "SELECT * FROM orders WHERE customer_id IN (SELECT customer_id FROM customers WHERE region = 'North');" },
    { "id": 9, "prompt": "Using EXISTS, find customers who have placed at least one order.", "ref": "SELECT * FROM customers c WHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.customer_id);" },
    { "id": 10, "prompt": "Using NOT EXISTS, find customers who have never placed an order.", "ref": "SELECT * FROM customers c WHERE NOT EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.customer_id);" },
    { "id": 11, "prompt": "Find employees earning more than the max salary in department 50.", "ref": "SELECT * FROM employees WHERE salary > (SELECT MAX(salary) FROM employees WHERE department_id = 50);" },
    { "id": 12, "prompt": "Find employees above average salary in their own department (correlated subquery).", "ref": "SELECT first_name, salary FROM employees e1 WHERE salary > (SELECT AVG(salary) FROM employees e2 WHERE e2.department_id = e1.department_id);" },
    { "id": 13, "prompt": "Find orders with total_amount above the average order amount.", "ref": "SELECT * FROM orders WHERE total_amount > (SELECT AVG(total_amount) FROM orders);" },
    { "id": 14, "prompt": "Find top 3 departments by average salary (derived table).", "ref": "SELECT department_id, avg_sal FROM (SELECT department_id, AVG(salary) AS avg_sal FROM employees GROUP BY department_id) ds ORDER BY avg_sal DESC LIMIT 3;" },
    { "id": 15, "prompt": "Find products in category 5 that have never been ordered.", "ref": "SELECT * FROM products WHERE category_id = 5 AND product_id NOT IN (SELECT DISTINCT product_id FROM order_items);" },
    { "id": 16, "prompt": "Find each employee and how many orders their department has processed (correlated scalar subquery).", "ref": "SELECT e.first_name, (SELECT COUNT(*) FROM orders o WHERE o.employee_id = e.employee_id) AS orders_handled FROM employees e;" },
    { "id": 17, "prompt": "Find customers who have spent more than the average customer spend (derived table approach).", "ref": "SELECT customer_id FROM (SELECT customer_id, SUM(total_amount) AS total_spend FROM orders GROUP BY customer_id) t WHERE total_spend > (SELECT AVG(total_amount) FROM orders);" },
    { "id": 18, "prompt": "Find the product with the highest unit_price using a scalar subquery.", "ref": "SELECT * FROM products WHERE unit_price = (SELECT MAX(unit_price) FROM products);" },
    { "id": 19, "prompt": "Find orders that include the most expensive product (scalar subquery in WHERE IN).", "ref": "SELECT * FROM orders WHERE order_id IN (SELECT order_id FROM order_items WHERE product_id = (SELECT product_id FROM products ORDER BY unit_price DESC LIMIT 1));" },
    { "id": 20, "prompt": "Find employees whose salary equals the minimum salary in any department.", "ref": "SELECT * FROM employees WHERE salary IN (SELECT MIN(salary) FROM employees GROUP BY department_id);" },
    { "id": 21, "prompt": "Show each product and whether it has been ordered (use a correlated EXISTS).", "ref": "SELECT name, CASE WHEN EXISTS (SELECT 1 FROM order_items oi WHERE oi.product_id = p.product_id) THEN 'Yes' ELSE 'No' END AS has_orders FROM products p;" },
    { "id": 22, "prompt": "Find departments with payroll above the median payroll (use a derived table and comparison).", "ref": "SELECT department_id, SUM(salary) AS payroll FROM employees GROUP BY department_id HAVING SUM(salary) > (SELECT AVG(dept_pay) FROM (SELECT SUM(salary) AS dept_pay FROM employees GROUP BY department_id) t);" },
    { "id": 23, "prompt": "Find the second highest salary (scalar subquery approach).", "ref": "SELECT MAX(salary) FROM employees WHERE salary < (SELECT MAX(salary) FROM employees);" },
    { "id": 24, "prompt": "Find all employees who share the same department as employee_id = 1 (subquery).", "ref": "SELECT * FROM employees WHERE department_id = (SELECT department_id FROM employees WHERE employee_id = 1) AND employee_id <> 1;" },
    { "id": 25, "prompt": "Find the customer who spent the most total (scalar subquery to get max spend, then match).", "ref": "SELECT * FROM customers WHERE customer_id = (SELECT customer_id FROM orders GROUP BY customer_id ORDER BY SUM(total_amount) DESC LIMIT 1);" }
  ],
  "topics": [
    { "id": "topic-1", "label": "Topic 1: Scalar, Multi-Row, Correlated Subqueries & EXISTS", "recordingKey": null }
  ]
};
