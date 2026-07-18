// Day 17 — DDL, DML & Constraints
if (!window.COURSE_CONTENT) window.COURSE_CONTENT = {};
window.COURSE_CONTENT['day17'] = {
  "day": 17,
  "title": "DDL, DML & Constraints",
  "db": "retail",
  "emoji": "🛠️",
  "slides": [
    {
      "title": "DDL, DML & Constraints",
      "duration": "0:00",
      "html": `
        <h2>🛠️ DDL, DML & Constraints</h2>

        <div class="slide-section">
          <h3>01. SQL Command Categories</h3>

          <div class="db-mock-table-wrap">
            <table class="db-table-mock db-table-mock--compact">
              <thead><tr><th>Category</th><th>Full Name</th><th>Commands</th><th>Purpose</th></tr></thead>
              <tbody>
                <tr><td><strong>DDL</strong></td><td>Data Definition Language</td><td>CREATE, ALTER, DROP, TRUNCATE</td><td>Define schema structure</td></tr>
                <tr><td><strong>DML</strong></td><td>Data Manipulation Language</td><td>INSERT, UPDATE, DELETE, MERGE</td><td>Modify data in tables</td></tr>
                <tr><td><strong>DQL</strong></td><td>Data Query Language</td><td>SELECT</td><td>Query / read data</td></tr>
                <tr><td><strong>DCL</strong></td><td>Data Control Language</td><td>GRANT, REVOKE</td><td>Manage access permissions</td></tr>
                <tr><td><strong>TCL</strong></td><td>Transaction Control Language</td><td>COMMIT, ROLLBACK, SAVEPOINT</td><td>Manage transactions</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="slide-section">
          <h3>02. DDL — CREATE TABLE</h3>
          <p><code>CREATE TABLE</code> defines a new table with its column names, data types, and constraints. The structure defined here determines what data can be stored.</p>

          <pre><code>-- Create a product_reviews table
CREATE TABLE product_reviews (
  review_id    INTEGER     PRIMARY KEY AUTOINCREMENT,
  product_id   INTEGER     NOT NULL,
  customer_id  INTEGER     NOT NULL,
  rating       INTEGER     NOT NULL CHECK (rating BETWEEN 1 AND 5),
  review_text  TEXT,
  review_date  TEXT        NOT NULL DEFAULT (date('now')),
  FOREIGN KEY (product_id)  REFERENCES products(product_id),
  FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

-- Create a temporary analytics table
CREATE TABLE IF NOT EXISTS temp_analytics (
  metric_name  TEXT    PRIMARY KEY,
  metric_value REAL    NOT NULL,
  computed_at  TEXT    DEFAULT (datetime('now'))
);</code></pre>
        </div>

        <div class="slide-section">
          <h3>03. DDL — ALTER TABLE & DROP TABLE</h3>
          <pre><code>-- Add a new column
ALTER TABLE employees
ADD COLUMN bonus REAL DEFAULT 0;

-- Drop a table (irreversible!)
DROP TABLE IF EXISTS temp_analytics;

-- TRUNCATE (remove all rows, keep structure) -- not in SQLite
-- In SQLite, use:
DELETE FROM temp_analytics;  -- removes all rows</code></pre>

          <div class="warn-box">
            ⚠️ <strong>DROP vs TRUNCATE vs DELETE:</strong> DROP removes the entire table (structure + data). TRUNCATE removes all rows but keeps the structure (not in SQLite). DELETE without WHERE removes all rows but is logged row-by-row (slower but recoverable with ROLLBACK if inside a transaction).
          </div>
        </div>

        <div class="slide-section">
          <h3>04. DML — INSERT, UPDATE, DELETE</h3>
          <pre><code>-- INSERT: Add new rows
INSERT INTO product_reviews (product_id, customer_id, rating, review_text)
VALUES (1, 3, 5, 'Excellent quality!');

-- INSERT multiple rows
INSERT INTO product_reviews (product_id, customer_id, rating)
VALUES (2, 1, 4), (3, 2, 3), (4, 5, 5);

-- UPDATE: Modify existing rows (always use WHERE!)
UPDATE employees
SET    salary = salary * 1.05
WHERE  department_id = 10 AND is_active = 1;

-- DELETE: Remove rows (always use WHERE!)
DELETE FROM product_reviews
WHERE  rating < 2;</code></pre>

          <div class="warn-box">
            ⚠️ <strong>Always use WHERE with UPDATE and DELETE!</strong> Forgetting the WHERE clause updates or deletes every row in the table. Run a SELECT first with the same WHERE condition to verify which rows will be affected.
          </div>
        </div>

        <div class="slide-section">
          <h3>05. Constraints</h3>
          <p>Constraints enforce data integrity rules at the database level — they prevent invalid data from entering the table regardless of the application layer.</p>

          <div class="db-mock-table-wrap">
            <table class="db-table-mock db-table-mock--compact">
              <thead><tr><th>Constraint</th><th>Description</th><th>Example</th></tr></thead>
              <tbody>
                <tr><td><code>PRIMARY KEY</code></td><td>Unique + NOT NULL identifier for each row</td><td><code>id INTEGER PRIMARY KEY</code></td></tr>
                <tr><td><code>NOT NULL</code></td><td>Column cannot contain NULL</td><td><code>name TEXT NOT NULL</code></td></tr>
                <tr><td><code>UNIQUE</code></td><td>All values in column must be distinct</td><td><code>email TEXT UNIQUE</code></td></tr>
                <tr><td><code>CHECK</code></td><td>Value must pass a boolean condition</td><td><code>CHECK (rating BETWEEN 1 AND 5)</code></td></tr>
                <tr><td><code>DEFAULT</code></td><td>Value used when none provided</td><td><code>status TEXT DEFAULT 'Active'</code></td></tr>
                <tr><td><code>FOREIGN KEY</code></td><td>References a PK in another table</td><td><code>REFERENCES orders(order_id)</code></td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="slide-section">
          <h3>06. Transactions — COMMIT, ROLLBACK</h3>
          <p>A <strong>transaction</strong> groups multiple SQL statements into a single atomic unit — either all succeed (COMMIT) or all are undone (ROLLBACK). This ensures data consistency.</p>

          <pre><code>-- Transfer salary between departments (atomic operation)
BEGIN TRANSACTION;

UPDATE employees
SET salary = salary - 5000
WHERE department_id = 30;

UPDATE employees
SET salary = salary + 5000
WHERE department_id = 10;

-- If all OK:
COMMIT;

-- If anything went wrong:
-- ROLLBACK;</code></pre>

          <div class="interview-box">
            <h4>🎯 Interview Insight — ACID Properties</h4>
            <div>
              <p><strong>Q: What are ACID properties in databases?</strong></p>
              <p><em>A: ACID stands for Atomicity (all-or-nothing: a transaction fully succeeds or fully fails), Consistency (the database transitions from one valid state to another), Isolation (concurrent transactions don't interfere with each other), and Durability (committed transactions survive system crashes). These properties are enforced by the transaction engine and are foundational to reliable database systems.</em></p>
            </div>
          </div>
        </div>
      `
    }
  ],
  "practiceQuestions": [
    {
      "id": 1,
      "prompt": "<strong>Task: Create a Reviews Table</strong><br/>Create a table called <code>product_reviews</code> with columns: review_id (PK), product_id (NOT NULL), customer_id (NOT NULL), rating (CHECK 1-5), review_text (TEXT), review_date (DEFAULT today).",
      "referenceSql": "CREATE TABLE product_reviews (review_id INTEGER PRIMARY KEY AUTOINCREMENT, product_id INTEGER NOT NULL, customer_id INTEGER NOT NULL, rating INTEGER NOT NULL CHECK(rating BETWEEN 1 AND 5), review_text TEXT, review_date TEXT DEFAULT (date('now')));"
    },
    {
      "id": 2,
      "prompt": "<strong>Task: Insert Reviews</strong><br/>Insert 3 rows into <code>product_reviews</code>: (product_id=1, customer_id=2, rating=5), (product_id=2, customer_id=3, rating=4), (product_id=3, customer_id=1, rating=3).",
      "referenceSql": "INSERT INTO product_reviews (product_id, customer_id, rating) VALUES (1, 2, 5), (2, 3, 4), (3, 1, 3);"
    },
    {
      "id": 3,
      "prompt": "<strong>Task: Update Salary</strong><br/>Give all active employees in department 10 a 5% salary raise.",
      "referenceSql": "UPDATE employees SET salary = salary * 1.05 WHERE department_id = 10 AND is_active = 1;"
    },
    {
      "id": 4,
      "prompt": "<strong>Task: Delete Low Stock</strong><br/>Delete all products where <code>stock_qty = 0</code>.",
      "referenceSql": "DELETE FROM products WHERE stock_qty = 0;"
    },
    {
      "id": 5,
      "prompt": "<strong>Task: Add Column</strong><br/>Add a column <code>loyalty_points</code> (INTEGER, DEFAULT 0) to the <code>customers</code> table.",
      "referenceSql": "ALTER TABLE customers ADD COLUMN loyalty_points INTEGER DEFAULT 0;"
    },
    {
      "id": 6,
      "prompt": "<strong>Task: Safe Update with SELECT first</strong><br/>First SELECT to verify: find all orders with status 'Processing' older than 2024-01-01. Then UPDATE their status to 'Cancelled'.",
      "referenceSql": "SELECT * FROM orders WHERE status = 'Processing' AND order_date < '2024-01-01'; UPDATE orders SET status = 'Cancelled' WHERE status = 'Processing' AND order_date < '2024-01-01';"
    }
  ],
  "testQuestions": [
    { "id": 1, "prompt": "Create a table called <code>feedback</code> with id (PK), comment (TEXT, NOT NULL), rating (INT, CHECK 1-5).", "ref": "CREATE TABLE feedback (id INTEGER PRIMARY KEY AUTOINCREMENT, comment TEXT NOT NULL, rating INTEGER NOT NULL CHECK(rating BETWEEN 1 AND 5));" },
    { "id": 2, "prompt": "Insert a row into <code>employees</code>: first_name='John', last_name='Doe', salary=60000, department_id=10, is_active=1.", "ref": "INSERT INTO employees (first_name, last_name, salary, department_id, is_active) VALUES ('John', 'Doe', 60000, 10, 1);" },
    { "id": 3, "prompt": "Update salary by 10% for all employees in department 20.", "ref": "UPDATE employees SET salary = salary * 1.10 WHERE department_id = 20;" },
    { "id": 4, "prompt": "Delete orders older than 2023-01-01 with status 'Cancelled'.", "ref": "DELETE FROM orders WHERE order_date < '2023-01-01' AND status = 'Cancelled';" },
    { "id": 5, "prompt": "Add a column <code>tags</code> (TEXT, DEFAULT 'none') to the <code>products</code> table.", "ref": "ALTER TABLE products ADD COLUMN tags TEXT DEFAULT 'none';" },
    { "id": 6, "prompt": "Create a table <code>audit_log</code> with id (PK), action (TEXT NOT NULL), logged_at (TEXT DEFAULT datetime('now')).", "ref": "CREATE TABLE audit_log (id INTEGER PRIMARY KEY AUTOINCREMENT, action TEXT NOT NULL, logged_at TEXT DEFAULT (datetime('now')));" },
    { "id": 7, "prompt": "Insert 2 rows into <code>products</code>: ('Widget A', 5000, 3500, 1, 50) and ('Widget B', 7500, 5000, 2, 30) — (name, unit_price, cost_price, category_id, stock_qty).", "ref": "INSERT INTO products (name, unit_price, cost_price, category_id, stock_qty) VALUES ('Widget A', 5000, 3500, 1, 50), ('Widget B', 7500, 5000, 2, 30);" },
    { "id": 8, "prompt": "Set all products' stock_qty to 100 where stock_qty = 0.", "ref": "UPDATE products SET stock_qty = 100 WHERE stock_qty = 0;" },
    { "id": 9, "prompt": "DELETE all employees where is_active = 0.", "ref": "DELETE FROM employees WHERE is_active = 0;" },
    { "id": 10, "prompt": "Create an index on the orders table for faster lookups by customer_id.", "ref": "CREATE INDEX idx_orders_customer ON orders(customer_id);" },
    { "id": 11, "prompt": "Rename a column by adding a new column <code>full_name</code> to customers as a TEXT column.", "ref": "ALTER TABLE customers ADD COLUMN full_name TEXT;" },
    { "id": 12, "prompt": "Update a single employee's salary: set salary=90000 where employee_id=5.", "ref": "UPDATE employees SET salary = 90000 WHERE employee_id = 5;" },
    { "id": 13, "prompt": "Create a table <code>promo_codes</code> with code (TEXT UNIQUE NOT NULL, PRIMARY KEY), discount_pct (REAL CHECK 0-100), active (INTEGER DEFAULT 1).", "ref": "CREATE TABLE promo_codes (code TEXT PRIMARY KEY NOT NULL UNIQUE, discount_pct REAL CHECK(discount_pct BETWEEN 0 AND 100), active INTEGER DEFAULT 1);" },
    { "id": 14, "prompt": "Insert a new order: customer_id=1, employee_id=2, order_date='2026-01-15', total_amount=50000, status='Processing'.", "ref": "INSERT INTO orders (customer_id, employee_id, order_date, total_amount, status) VALUES (1, 2, '2026-01-15', 50000, 'Processing');" },
    { "id": 15, "prompt": "Delete all order_items for orders that have been Cancelled.", "ref": "DELETE FROM order_items WHERE order_id IN (SELECT order_id FROM orders WHERE status = 'Cancelled');" },
    { "id": 16, "prompt": "Use a transaction to: (1) deduct 10 from stock_qty of product_id=1, and (2) insert into order_items.", "ref": "BEGIN TRANSACTION; UPDATE products SET stock_qty = stock_qty - 10 WHERE product_id = 1; INSERT INTO order_items (order_id, product_id, qty, price) VALUES (99, 1, 10, 5000); COMMIT;" },
    { "id": 17, "prompt": "Create a UNIQUE constraint: add unique index on employees(email).", "ref": "CREATE UNIQUE INDEX idx_emp_email ON employees(email);" },
    { "id": 18, "prompt": "Drop the table <code>temp_analytics</code> if it exists.", "ref": "DROP TABLE IF EXISTS temp_analytics;" },
    { "id": 19, "prompt": "Update all orders from customer_id=3 that are Processing to Shipped.", "ref": "UPDATE orders SET status = 'Shipped' WHERE customer_id = 3 AND status = 'Processing';" },
    { "id": 20, "prompt": "Insert a new category: name='Accessories', description='Phone and computer accessories'.", "ref": "INSERT INTO categories (name, description) VALUES ('Accessories', 'Phone and computer accessories');" },
    { "id": 21, "prompt": "Show the definition of all tables in the SQLite database.", "ref": "SELECT name, sql FROM sqlite_master WHERE type = 'table';" },
    { "id": 22, "prompt": "Create a <code>notifications</code> table: id PK, message TEXT NOT NULL, seen INTEGER DEFAULT 0, created_at TEXT DEFAULT datetime('now').", "ref": "CREATE TABLE notifications (id INTEGER PRIMARY KEY AUTOINCREMENT, message TEXT NOT NULL, seen INTEGER DEFAULT 0, created_at TEXT DEFAULT (datetime('now')));" },
    { "id": 23, "prompt": "Use UPDATE to set commission=NULL for all employees in department 30.", "ref": "UPDATE employees SET commission = NULL WHERE department_id = 30;" },
    { "id": 24, "prompt": "Use ROLLBACK after a wrong DELETE to undo it (inside a transaction).", "ref": "BEGIN TRANSACTION; DELETE FROM employees WHERE department_id = 10; ROLLBACK;" },
    { "id": 25, "prompt": "Create table <code>shipping_rates</code>: region (TEXT PRIMARY KEY), rate_per_kg (REAL NOT NULL CHECK > 0), effective_date (TEXT NOT NULL).", "ref": "CREATE TABLE shipping_rates (region TEXT PRIMARY KEY, rate_per_kg REAL NOT NULL CHECK(rate_per_kg > 0), effective_date TEXT NOT NULL);" }
  ],
  "topics": [
    { "id": "topic-1", "label": "Topic 1: DDL, DML, Constraints & Transactions", "recordingKey": null }
  ]
};
