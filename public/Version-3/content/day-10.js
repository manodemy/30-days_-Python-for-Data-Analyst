// Day 10 — Joins Fundamentals: INNER JOIN, relationships
if (!window.COURSE_CONTENT) window.COURSE_CONTENT = {};
window.COURSE_CONTENT['day10'] = {
  "day": 10,
  "title": "Joins Fundamentals",
  "db": "retail",
  "emoji": "🔗",
  "slides": [
    {
      "title": "Joins Fundamentals — Combining Tables",
      "duration": "0:00",
      "html": `
        <h2>🔗 Joins Fundamentals</h2>

        <div class="slide-section">
          <h3>01. Why Joins? — Relational Data Design</h3>
          <p>In a relational database, data is split across multiple tables to eliminate redundancy (normalisation). Joins <strong>recombine</strong> these tables at query time using a matching key — typically a <strong>primary key</strong> (unique identifier) to <strong>foreign key</strong> (reference in another table) relationship.</p>

          <div class="info-box">
            ℹ️ <strong>Retail Database Relationships:</strong>
            <ul>
              <li><code>orders.customer_id</code> → <code>customers.customer_id</code></li>
              <li><code>orders.employee_id</code> → <code>employees.employee_id</code></li>
              <li><code>order_items.order_id</code> → <code>orders.order_id</code></li>
              <li><code>order_items.product_id</code> → <code>products.product_id</code></li>
              <li><code>products.category_id</code> → <code>categories.category_id</code></li>
              <li><code>employees.department_id</code> → <code>departments.department_id</code></li>
            </ul>
          </div>
        </div>

        <div class="slide-section">
          <h3>02. INNER JOIN — Matching Rows Only</h3>
          <p><code>INNER JOIN</code> returns only rows where the join condition matches in <strong>both tables</strong>. Rows in either table that do not have a match in the other are excluded.</p>

          <pre><code>-- Get orders with customer names (INNER JOIN)
SELECT o.order_id,
       c.first_name,
       c.last_name,
       o.total_amount,
       o.status
FROM   orders AS o
INNER JOIN customers AS c
  ON o.customer_id = c.customer_id;

-- Three-table join: order items with product names
SELECT oi.order_id,
       p.name    AS product_name,
       oi.qty,
       oi.price  AS unit_price
FROM   order_items AS oi
INNER JOIN products AS p
  ON oi.product_id = p.product_id;</code></pre>

          <div class="pro-tip-box">
            💡 <strong>Best Practice — Table Aliases:</strong> Always alias tables in multi-table queries (e.g. <code>orders AS o</code>). Use short, meaningful aliases and qualify all column references with the table alias (e.g. <code>o.order_id</code>) to prevent ambiguity and make queries readable.
          </div>
        </div>

        <div class="slide-section">
          <h3>03. JOIN with WHERE, ORDER BY, and GROUP BY</h3>
          <p>After joining, you can apply the full power of SQL — filtering, aggregating, and sorting. The join creates a "virtual" combined table; all other clauses apply to this virtual table.</p>

          <pre><code>-- Orders placed by customers in the 'North' region
SELECT o.order_id, c.first_name, o.total_amount
FROM   orders AS o
INNER JOIN customers AS c
  ON o.customer_id = c.customer_id
WHERE  c.region = 'North';

-- Total revenue per customer (with their names)
SELECT c.first_name,
       c.last_name,
       COUNT(o.order_id)    AS order_count,
       SUM(o.total_amount)  AS total_spent
FROM   orders AS o
INNER JOIN customers AS c
  ON o.customer_id = c.customer_id
GROUP BY c.customer_id, c.first_name, c.last_name
ORDER BY total_spent DESC;</code></pre>
        </div>

        <div class="slide-section">
          <h3>04. Multi-Table Joins (Chaining JOINs)</h3>
          <p>You can chain multiple joins to combine three or more tables. Each join builds on the result of the previous one.</p>

          <pre><code>-- Order details with customer name and product name
SELECT c.first_name || ' ' || c.last_name AS customer,
       p.name                              AS product,
       oi.qty,
       oi.price                            AS unit_price,
       oi.qty * oi.price                   AS line_total
FROM   order_items AS oi
INNER JOIN orders    AS o ON oi.order_id    = o.order_id
INNER JOIN customers AS c ON o.customer_id  = c.customer_id
INNER JOIN products  AS p ON oi.product_id  = p.product_id
ORDER BY line_total DESC
LIMIT 10;</code></pre>
        </div>

        <div class="slide-section">
          <h3>05. JOIN vs. Cartesian Product</h3>
          <p>Without a join condition, SQL produces a <strong>Cartesian product</strong> (every row from table A paired with every row from table B). This is almost always a mistake and can generate millions of rows.</p>

          <pre><code>-- ✅ CORRECT: Explicit INNER JOIN with ON condition
SELECT o.order_id, c.first_name
FROM   orders AS o
INNER JOIN customers AS c
  ON o.customer_id = c.customer_id;

-- ❌ DANGEROUS: Missing ON clause → Cartesian product
-- If orders has 1000 rows and customers has 200 rows
-- this returns 200,000 rows!
SELECT o.order_id, c.first_name
FROM   orders AS o, customers AS c;</code></pre>

          <div class="interview-box">
            <h4>🎯 Interview Insight</h4>
            <div>
              <p><strong>Q: What is the difference between a JOIN and a Cartesian product?</strong></p>
              <p><em>A: A JOIN with an ON condition filters the Cartesian product to keep only matching rows. A Cartesian product (CROSS JOIN) produces all possible row combinations — rows(A) × rows(B). INNER JOIN is the Cartesian product filtered by the join predicate. Always use an ON or USING clause to prevent accidental Cartesian products.</em></p>
            </div>
          </div>
        </div>
      `
    }
  ],
  "practiceQuestions": [
    {
      "id": 1,
      "prompt": "<strong>Task: Orders with Customer Names</strong><br/>Join <code>orders</code> and <code>customers</code> to show <code>order_id</code>, <code>first_name</code>, <code>last_name</code>, and <code>total_amount</code>.",
      "referenceSql": "SELECT o.order_id, c.first_name, c.last_name, o.total_amount FROM orders AS o INNER JOIN customers AS c ON o.customer_id = c.customer_id;"
    },
    {
      "id": 2,
      "prompt": "<strong>Task: Products in Orders</strong><br/>Join <code>order_items</code> and <code>products</code> to show <code>order_id</code>, product <code>name</code>, <code>qty</code>, and <code>price</code>.",
      "referenceSql": "SELECT oi.order_id, p.name, oi.qty, oi.price FROM order_items AS oi INNER JOIN products AS p ON oi.product_id = p.product_id;"
    },
    {
      "id": 3,
      "prompt": "<strong>Task: North Region Orders</strong><br/>Find all orders placed by customers in the 'North' region. Show <code>order_id</code>, <code>first_name</code>, and <code>total_amount</code>.",
      "referenceSql": "SELECT o.order_id, c.first_name, o.total_amount FROM orders AS o INNER JOIN customers AS c ON o.customer_id = c.customer_id WHERE c.region = 'North';"
    },
    {
      "id": 4,
      "prompt": "<strong>Task: Customer Revenue</strong><br/>Join <code>orders</code> and <code>customers</code> to calculate total revenue and order count per customer. Sort by total revenue descending.",
      "referenceSql": "SELECT c.first_name, c.last_name, COUNT(o.order_id) AS order_count, SUM(o.total_amount) AS total_spent FROM orders AS o INNER JOIN customers AS c ON o.customer_id = c.customer_id GROUP BY c.customer_id, c.first_name, c.last_name ORDER BY total_spent DESC;"
    },
    {
      "id": 5,
      "prompt": "<strong>Task: Employee Department</strong><br/>Join <code>employees</code> and <code>departments</code> to show <code>first_name</code>, <code>last_name</code>, and the department <code>name</code>.",
      "referenceSql": "SELECT e.first_name, e.last_name, d.name AS department_name FROM employees AS e INNER JOIN departments AS d ON e.department_id = d.department_id;"
    },
    {
      "id": 6,
      "prompt": "<strong>Task: Order Detail Full</strong><br/>Join <code>order_items</code>, <code>orders</code>, <code>customers</code>, and <code>products</code> to show customer full name, product name, qty, and line total. Limit to top 5 by line total.",
      "referenceSql": "SELECT c.first_name || ' ' || c.last_name AS customer, p.name AS product, oi.qty, oi.qty * oi.price AS line_total FROM order_items AS oi INNER JOIN orders AS o ON oi.order_id = o.order_id INNER JOIN customers AS c ON o.customer_id = c.customer_id INNER JOIN products AS p ON oi.product_id = p.product_id ORDER BY line_total DESC LIMIT 5;"
    }
  ],
  "testQuestions": [
    { "id": 1, "prompt": "Join orders and customers to show order_id and customer first_name.", "ref": "SELECT o.order_id, c.first_name FROM orders o INNER JOIN customers c ON o.customer_id = c.customer_id;" },
    { "id": 2, "prompt": "Join order_items and products to show order_id, product name, and qty.", "ref": "SELECT oi.order_id, p.name, oi.qty FROM order_items oi INNER JOIN products p ON oi.product_id = p.product_id;" },
    { "id": 3, "prompt": "Join employees and departments to show employee name and department name.", "ref": "SELECT e.first_name, e.last_name, d.name AS dept FROM employees e INNER JOIN departments d ON e.department_id = d.department_id;" },
    { "id": 4, "prompt": "Find orders by customers in the 'South' region.", "ref": "SELECT o.order_id, c.first_name, o.total_amount FROM orders o INNER JOIN customers c ON o.customer_id = c.customer_id WHERE c.region = 'South';" },
    { "id": 5, "prompt": "Count total orders per customer, sorted descending.", "ref": "SELECT c.first_name, COUNT(o.order_id) AS order_count FROM orders o INNER JOIN customers c ON o.customer_id = c.customer_id GROUP BY c.customer_id, c.first_name ORDER BY order_count DESC;" },
    { "id": 6, "prompt": "Join products and categories to show product name and category name.", "ref": "SELECT p.name AS product, cat.name AS category FROM products p INNER JOIN categories cat ON p.category_id = cat.category_id;" },
    { "id": 7, "prompt": "Find total revenue per region by joining orders and customers.", "ref": "SELECT c.region, SUM(o.total_amount) AS revenue FROM orders o INNER JOIN customers c ON o.customer_id = c.customer_id GROUP BY c.region;" },
    { "id": 8, "prompt": "Get the employee who processed each order (join orders and employees on employee_id).", "ref": "SELECT o.order_id, e.first_name AS employee FROM orders o INNER JOIN employees e ON o.employee_id = e.employee_id;" },
    { "id": 9, "prompt": "Find all products and their categories, sorted by category name.", "ref": "SELECT p.name, cat.name AS category FROM products p INNER JOIN categories cat ON p.category_id = cat.category_id ORDER BY category;" },
    { "id": 10, "prompt": "Find total qty sold per product by joining order_items and products.", "ref": "SELECT p.name, SUM(oi.qty) AS total_sold FROM order_items oi INNER JOIN products p ON oi.product_id = p.product_id GROUP BY p.product_id, p.name ORDER BY total_sold DESC;" },
    { "id": 11, "prompt": "Find Shipped orders with customer names and amounts.", "ref": "SELECT c.first_name, o.order_id, o.total_amount FROM orders o INNER JOIN customers c ON o.customer_id = c.customer_id WHERE o.status = 'Shipped';" },
    { "id": 12, "prompt": "Join order_items, orders, and customers — find orders with line total > 5000.", "ref": "SELECT c.first_name, oi.order_id, oi.qty * oi.price AS line_total FROM order_items oi INNER JOIN orders o ON oi.order_id = o.order_id INNER JOIN customers c ON o.customer_id = c.customer_id WHERE oi.qty * oi.price > 5000;" },
    { "id": 13, "prompt": "Count orders per department (via employees who processed orders).", "ref": "SELECT d.name AS dept, COUNT(o.order_id) AS order_count FROM orders o INNER JOIN employees e ON o.employee_id = e.employee_id INNER JOIN departments d ON e.department_id = d.department_id GROUP BY d.department_id, d.name;" },
    { "id": 14, "prompt": "Find the average order value per customer region.", "ref": "SELECT c.region, AVG(o.total_amount) AS avg_order FROM orders o INNER JOIN customers c ON o.customer_id = c.customer_id GROUP BY c.region;" },
    { "id": 15, "prompt": "Find the most purchased product (highest total qty in order_items).", "ref": "SELECT p.name, SUM(oi.qty) AS total_qty FROM order_items oi INNER JOIN products p ON oi.product_id = p.product_id GROUP BY p.product_id, p.name ORDER BY total_qty DESC LIMIT 1;" },
    { "id": 16, "prompt": "Find all order_items with unit_price (oi.price) above the product's listed cost_price.", "ref": "SELECT oi.order_id, p.name, oi.price, p.cost_price FROM order_items oi INNER JOIN products p ON oi.product_id = p.product_id WHERE oi.price > p.cost_price;" },
    { "id": 17, "prompt": "Find revenue per product category.", "ref": "SELECT cat.name AS category, SUM(oi.qty * oi.price) AS revenue FROM order_items oi INNER JOIN products p ON oi.product_id = p.product_id INNER JOIN categories cat ON p.category_id = cat.category_id GROUP BY cat.category_id, cat.name;" },
    { "id": 18, "prompt": "Find employees who processed Cancelled orders.", "ref": "SELECT DISTINCT e.first_name, e.last_name FROM orders o INNER JOIN employees e ON o.employee_id = e.employee_id WHERE o.status = 'Cancelled';" },
    { "id": 19, "prompt": "Show all orders with the customer's signup_date.", "ref": "SELECT o.order_id, o.order_date, c.signup_date FROM orders o INNER JOIN customers c ON o.customer_id = c.customer_id;" },
    { "id": 20, "prompt": "Count distinct products sold per customer.", "ref": "SELECT c.first_name, COUNT(DISTINCT oi.product_id) AS unique_products FROM orders o INNER JOIN customers c ON o.customer_id = c.customer_id INNER JOIN order_items oi ON o.order_id = oi.order_id GROUP BY c.customer_id, c.first_name;" },
    { "id": 21, "prompt": "Find total sales revenue generated by each employee.", "ref": "SELECT e.first_name, SUM(o.total_amount) AS revenue FROM orders o INNER JOIN employees e ON o.employee_id = e.employee_id GROUP BY e.employee_id, e.first_name ORDER BY revenue DESC;" },
    { "id": 22, "prompt": "Find product name and category for products with stock_qty < 10.", "ref": "SELECT p.name, cat.name AS category FROM products p INNER JOIN categories cat ON p.category_id = cat.category_id WHERE p.stock_qty < 10;" },
    { "id": 23, "prompt": "Join orders and customers to show the full name of customer and order_date for 2024 orders.", "ref": "SELECT c.first_name || ' ' || c.last_name AS full_name, o.order_date FROM orders o INNER JOIN customers c ON o.customer_id = c.customer_id WHERE o.order_date BETWEEN '2024-01-01' AND '2024-12-31';" },
    { "id": 24, "prompt": "Find the top 3 customers by number of orders.", "ref": "SELECT c.first_name, COUNT(o.order_id) AS orders FROM orders o INNER JOIN customers c ON o.customer_id = c.customer_id GROUP BY c.customer_id, c.first_name ORDER BY orders DESC LIMIT 3;" },
    { "id": 25, "prompt": "Find total line revenue per order (sum of qty * price for all items) joined with customer name.", "ref": "SELECT o.order_id, c.first_name, SUM(oi.qty * oi.price) AS line_revenue FROM order_items oi INNER JOIN orders o ON oi.order_id = o.order_id INNER JOIN customers c ON o.customer_id = c.customer_id GROUP BY o.order_id, c.first_name ORDER BY line_revenue DESC;" }
  ],
  "topics": [
    { "id": "topic-1", "label": "Topic 1: INNER JOIN & Relationships", "recordingKey": null }
  ]
};
