// Day 11 — Advanced Joins: LEFT, RIGHT, FULL OUTER, SELF, CROSS
if (!window.COURSE_CONTENT) window.COURSE_CONTENT = {};
window.COURSE_CONTENT['day11'] = {
  "day": 11,
  "title": "Advanced Joins",
  "db": "retail",
  "emoji": "🔄",
  "slides": [
    {
      "title": "Advanced Joins — Outer, Self & Cross Joins",
      "duration": "0:00",
      "html": `
        <h2>🔄 Advanced Joins</h2>

        <div class="slide-section">
          <h3>01. LEFT JOIN — Keep All Rows from the Left Table</h3>
          <p>A <code>LEFT JOIN</code> returns all rows from the <strong>left table</strong> and matching rows from the right table. Where there is no match in the right table, columns from the right table contain <code>NULL</code>. This is the most commonly used outer join.</p>

          <pre><code>-- All customers — including those with no orders
SELECT c.customer_id,
       c.first_name,
       c.last_name,
       o.order_id,
       o.total_amount
FROM   customers AS c
LEFT JOIN orders AS o
  ON c.customer_id = o.customer_id;

-- Find customers who have NEVER placed an order
SELECT c.customer_id, c.first_name
FROM   customers AS c
LEFT JOIN orders AS o
  ON c.customer_id = o.customer_id
WHERE  o.order_id IS NULL;</code></pre>

          <div class="info-box">
            ℹ️ <strong>Anti-Join Pattern:</strong> <code>LEFT JOIN ... WHERE right_table.id IS NULL</code> is a classic anti-join — it finds rows in the left table with NO match in the right. This is an interview staple.
          </div>
        </div>

        <div class="slide-section">
          <h3>02. RIGHT JOIN — Keep All Rows from the Right Table</h3>
          <p>A <code>RIGHT JOIN</code> returns all rows from the <strong>right table</strong> and matching rows from the left table. <code>RIGHT JOIN</code> is less commonly used — any right join can be rewritten as a left join by swapping table order.</p>

          <pre><code>-- All products — including those never ordered
SELECT p.name,
       SUM(oi.qty) AS total_sold
FROM   order_items AS oi
RIGHT JOIN products AS p
  ON oi.product_id = p.product_id
GROUP BY p.product_id, p.name;

-- Rewritten as LEFT JOIN (preferred):
SELECT p.name,
       SUM(oi.qty) AS total_sold
FROM   products AS p
LEFT JOIN order_items AS oi
  ON p.product_id = oi.product_id
GROUP BY p.product_id, p.name;</code></pre>
        </div>

        <div class="slide-section">
          <h3>03. FULL OUTER JOIN — All Rows from Both Tables</h3>
          <p>A <code>FULL OUTER JOIN</code> returns all rows from both tables. Where there is no match on either side, the missing columns are <code>NULL</code>. SQLite does not support FULL OUTER JOIN natively — simulate with <code>LEFT JOIN UNION ALL RIGHT JOIN</code>.</p>

          <pre><code>-- FULL OUTER JOIN in PostgreSQL / SQL Server:
SELECT c.customer_id,
       c.first_name,
       o.order_id
FROM   customers AS c
FULL OUTER JOIN orders AS o
  ON c.customer_id = o.customer_id;

-- Simulation in SQLite using UNION:
SELECT c.customer_id, c.first_name, o.order_id
FROM   customers c LEFT JOIN orders o ON c.customer_id = o.customer_id
UNION ALL
SELECT c.customer_id, c.first_name, o.order_id
FROM   customers c RIGHT JOIN orders o ON c.customer_id = o.customer_id
WHERE  c.customer_id IS NULL;</code></pre>
        </div>

        <div class="slide-section">
          <h3>04. SELF JOIN — Joining a Table to Itself</h3>
          <p>A self join joins a table to itself using aliases. Common use case: hierarchical data (employee → manager) where both the employee and their manager are in the same table.</p>

          <pre><code>-- Find each employee and their manager's name
SELECT e.first_name                       AS employee,
       m.first_name                       AS manager
FROM   employees AS e
LEFT JOIN employees AS m
  ON e.manager_id = m.employee_id;

-- Only show employees who HAVE a manager
SELECT e.first_name AS employee,
       m.first_name AS manager
FROM   employees AS e
INNER JOIN employees AS m
  ON e.manager_id = m.employee_id;</code></pre>

          <div class="pro-tip-box">
            💡 <strong>Self Join Key:</strong> Both the left and right table reference the same physical table, so you MUST alias them differently (<code>e</code> and <code>m</code> above). Without aliases, the query would be syntactically invalid.
          </div>
        </div>

        <div class="slide-section">
          <h3>05. CROSS JOIN — Cartesian Product</h3>
          <p>A <code>CROSS JOIN</code> produces every combination of rows from two tables — rows(A) × rows(B). It is the explicit way to generate Cartesian products. Useful for generating test data, combinations, or calendar grids.</p>

          <pre><code>-- All product-region combinations (for a sales matrix)
SELECT p.name AS product, c.region
FROM   products AS p
CROSS JOIN (SELECT DISTINCT region FROM customers) AS c
ORDER BY p.name, c.region;</code></pre>
        </div>

        <div class="slide-section">
          <h3>06. Join Type Summary</h3>
          <div class="db-mock-table-wrap">
            <table class="db-table-mock db-table-mock--compact">
              <thead><tr><th>Join Type</th><th>Returns</th><th>Unmatched left</th><th>Unmatched right</th></tr></thead>
              <tbody>
                <tr><td><code>INNER JOIN</code></td><td>Matching rows only</td><td>Excluded</td><td>Excluded</td></tr>
                <tr><td><code>LEFT JOIN</code></td><td>All left + matching right</td><td>Included (NULLs in right)</td><td>Excluded</td></tr>
                <tr><td><code>RIGHT JOIN</code></td><td>All right + matching left</td><td>Excluded</td><td>Included (NULLs in left)</td></tr>
                <tr><td><code>FULL OUTER JOIN</code></td><td>All rows from both</td><td>Included (NULLs in right)</td><td>Included (NULLs in left)</td></tr>
                <tr><td><code>CROSS JOIN</code></td><td>All combinations</td><td>N/A</td><td>N/A</td></tr>
                <tr><td><code>SELF JOIN</code></td><td>Same table joined to itself</td><td>Depends on INNER/LEFT</td><td>—</td></tr>
              </tbody>
            </table>
          </div>

          <div class="interview-box">
            <h4>🎯 Interview Insight</h4>
            <div>
              <p><strong>Q: When would you use a LEFT JOIN over an INNER JOIN?</strong></p>
              <p><em>A: Use LEFT JOIN when you need ALL rows from the left (primary) table regardless of whether they have matching data in the right table. Classic examples: customers who haven't ordered, products never purchased, employees without a manager. INNER JOIN loses these unmatched rows — which may be exactly the rows you need to find.</em></p>
            </div>
          </div>
        </div>
      `
    }
  ],
  "practiceQuestions": [
    {
      "id": 1,
      "prompt": "<strong>Task: Customers Without Orders</strong><br/>Using a LEFT JOIN, find all customers who have never placed an order. Show <code>customer_id</code> and <code>first_name</code>.",
      "referenceSql": "SELECT c.customer_id, c.first_name FROM customers AS c LEFT JOIN orders AS o ON c.customer_id = o.customer_id WHERE o.order_id IS NULL;"
    },
    {
      "id": 2,
      "prompt": "<strong>Task: Products Never Ordered</strong><br/>Find all products that have never appeared in any order. Show product <code>name</code>.",
      "referenceSql": "SELECT p.name FROM products AS p LEFT JOIN order_items AS oi ON p.product_id = oi.product_id WHERE oi.order_id IS NULL;"
    },
    {
      "id": 3,
      "prompt": "<strong>Task: Employee-Manager Hierarchy</strong><br/>Using a SELF JOIN, show each employee's name and their manager's name. Include employees with no manager (use LEFT JOIN).",
      "referenceSql": "SELECT e.first_name AS employee, m.first_name AS manager FROM employees AS e LEFT JOIN employees AS m ON e.manager_id = m.employee_id;"
    },
    {
      "id": 4,
      "prompt": "<strong>Task: All Products with Sales Summary</strong><br/>Using a LEFT JOIN, show all products with their total qty sold. Include products with no sales (qty = NULL or 0).",
      "referenceSql": "SELECT p.name, COALESCE(SUM(oi.qty), 0) AS total_sold FROM products AS p LEFT JOIN order_items AS oi ON p.product_id = oi.product_id GROUP BY p.product_id, p.name ORDER BY total_sold DESC;"
    },
    {
      "id": 5,
      "prompt": "<strong>Task: All Customers with Order Counts</strong><br/>Show all customers with their order count. Customers with no orders should show 0.",
      "referenceSql": "SELECT c.first_name, COUNT(o.order_id) AS order_count FROM customers AS c LEFT JOIN orders AS o ON c.customer_id = o.customer_id GROUP BY c.customer_id, c.first_name;"
    },
    {
      "id": 6,
      "prompt": "<strong>Task: Employees with their Department (allow no dept)</strong><br/>Using LEFT JOIN, show all employees and their department name. Employees with no department should still appear with NULL department.",
      "referenceSql": "SELECT e.first_name, e.last_name, d.name AS dept FROM employees AS e LEFT JOIN departments AS d ON e.department_id = d.department_id;"
    }
  ],
  "testQuestions": [
    { "id": 1, "prompt": "Find all customers and their orders using LEFT JOIN (include customers with no orders).", "ref": "SELECT c.first_name, o.order_id FROM customers c LEFT JOIN orders o ON c.customer_id = o.customer_id;" },
    { "id": 2, "prompt": "Find customers who have never placed an order (anti-join).", "ref": "SELECT c.first_name FROM customers c LEFT JOIN orders o ON c.customer_id = o.customer_id WHERE o.order_id IS NULL;" },
    { "id": 3, "prompt": "Find all products and total qty sold; include products with 0 sales.", "ref": "SELECT p.name, COALESCE(SUM(oi.qty), 0) AS qty FROM products p LEFT JOIN order_items oi ON p.product_id = oi.product_id GROUP BY p.product_id, p.name;" },
    { "id": 4, "prompt": "Self join employees to find each employee's manager name.", "ref": "SELECT e.first_name AS emp, m.first_name AS mgr FROM employees e LEFT JOIN employees m ON e.manager_id = m.employee_id;" },
    { "id": 5, "prompt": "Find products with no orders using LEFT JOIN and IS NULL filter.", "ref": "SELECT p.name FROM products p LEFT JOIN order_items oi ON p.product_id = oi.product_id WHERE oi.order_id IS NULL;" },
    { "id": 6, "prompt": "Find all customers with their order count (0 if none) using LEFT JOIN and COUNT.", "ref": "SELECT c.first_name, COUNT(o.order_id) AS order_count FROM customers c LEFT JOIN orders o ON c.customer_id = o.customer_id GROUP BY c.customer_id, c.first_name;" },
    { "id": 7, "prompt": "Find employees who have no manager (top-level) using LEFT JOIN self join WHERE IS NULL.", "ref": "SELECT e.first_name FROM employees e LEFT JOIN employees m ON e.manager_id = m.employee_id WHERE e.manager_id IS NULL;" },
    { "id": 8, "prompt": "Find all employees and their department names (LEFT JOIN — include employees with no dept).", "ref": "SELECT e.first_name, d.name AS dept FROM employees e LEFT JOIN departments d ON e.department_id = d.department_id;" },
    { "id": 9, "prompt": "Show all products and their category name using LEFT JOIN.", "ref": "SELECT p.name, cat.name AS category FROM products p LEFT JOIN categories cat ON p.category_id = cat.category_id;" },
    { "id": 10, "prompt": "Find departments with no employees (anti-join using LEFT JOIN on employees).", "ref": "SELECT d.name FROM departments d LEFT JOIN employees e ON d.department_id = e.department_id WHERE e.employee_id IS NULL;" },
    { "id": 11, "prompt": "Find all customers and their region, with total orders. Show customers with 0 orders too.", "ref": "SELECT c.first_name, c.region, COUNT(o.order_id) AS orders FROM customers c LEFT JOIN orders o ON c.customer_id = o.customer_id GROUP BY c.customer_id, c.first_name, c.region;" },
    { "id": 12, "prompt": "Using a self join, find all employees who report to the same manager as employee_id = 2.", "ref": "SELECT e.first_name FROM employees e WHERE e.manager_id = (SELECT manager_id FROM employees WHERE employee_id = 2) AND e.employee_id <> 2;" },
    { "id": 13, "prompt": "Find all products with their total revenue (qty * price from order_items). Include products with 0 revenue.", "ref": "SELECT p.name, COALESCE(SUM(oi.qty * oi.price), 0) AS revenue FROM products p LEFT JOIN order_items oi ON p.product_id = oi.product_id GROUP BY p.product_id, p.name;" },
    { "id": 14, "prompt": "Find employees who have never processed an order (LEFT JOIN orders on employee_id, IS NULL).", "ref": "SELECT e.first_name FROM employees e LEFT JOIN orders o ON e.employee_id = o.employee_id WHERE o.order_id IS NULL;" },
    { "id": 15, "prompt": "Using CROSS JOIN, generate a combination of all product names and all regions.", "ref": "SELECT p.name, r.region FROM products p CROSS JOIN (SELECT DISTINCT region FROM customers) r ORDER BY p.name, r.region;" },
    { "id": 16, "prompt": "Find all categories and the count of products in each (include categories with 0 products).", "ref": "SELECT cat.name, COUNT(p.product_id) AS product_count FROM categories cat LEFT JOIN products p ON cat.category_id = p.category_id GROUP BY cat.category_id, cat.name;" },
    { "id": 17, "prompt": "Using self join, find pairs of employees in the same department.", "ref": "SELECT a.first_name AS emp1, b.first_name AS emp2, a.department_id FROM employees a INNER JOIN employees b ON a.department_id = b.department_id AND a.employee_id < b.employee_id;" },
    { "id": 18, "prompt": "Find orders with customer first_name and the processing employee's first_name using two INNER JOINs.", "ref": "SELECT o.order_id, c.first_name AS customer, e.first_name AS employee FROM orders o INNER JOIN customers c ON o.customer_id = c.customer_id INNER JOIN employees e ON o.employee_id = e.employee_id;" },
    { "id": 19, "prompt": "Show all employees and their manager's name; top-level managers show NULL for manager.", "ref": "SELECT e.first_name AS employee, m.first_name AS manager FROM employees e LEFT JOIN employees m ON e.manager_id = m.employee_id ORDER BY manager;" },
    { "id": 20, "prompt": "Find customers in 'North' region who have no orders.", "ref": "SELECT c.first_name FROM customers c LEFT JOIN orders o ON c.customer_id = o.customer_id WHERE c.region = 'North' AND o.order_id IS NULL;" },
    { "id": 21, "prompt": "Retrieve all employees with their departments, showing 'Unassigned' for those without a department.", "ref": "SELECT e.first_name, COALESCE(d.name, 'Unassigned') AS dept FROM employees e LEFT JOIN departments d ON e.department_id = d.department_id;" },
    { "id": 22, "prompt": "Find products with no sales in 2024 (order_items joined with orders on year filter).", "ref": "SELECT p.name FROM products p LEFT JOIN order_items oi ON p.product_id = oi.product_id LEFT JOIN orders o ON oi.order_id = o.order_id AND strftime('%Y', o.order_date) = '2024' WHERE oi.order_id IS NULL;" },
    { "id": 23, "prompt": "Show each employee and the count of orders they've processed (include employees with 0 orders).", "ref": "SELECT e.first_name, COUNT(o.order_id) AS orders_processed FROM employees e LEFT JOIN orders o ON e.employee_id = o.employee_id GROUP BY e.employee_id, e.first_name;" },
    { "id": 24, "prompt": "Find customers who placed at least one order and at least one cancelled order (use INNER JOIN twice).", "ref": "SELECT DISTINCT c.first_name FROM customers c INNER JOIN orders o ON c.customer_id = o.customer_id WHERE o.status = 'Cancelled';" },
    { "id": 25, "prompt": "Using LEFT JOIN anti-join, find all categories with no products assigned.", "ref": "SELECT cat.name FROM categories cat LEFT JOIN products p ON cat.category_id = p.category_id WHERE p.product_id IS NULL;" }
  ],
  "topics": [
    { "id": "topic-1", "label": "Topic 1: LEFT, RIGHT, FULL OUTER, SELF & CROSS Joins", "recordingKey": null }
  ]
};
