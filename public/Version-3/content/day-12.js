// Day 12 — Set Operations: UNION, UNION ALL, INTERSECT, EXCEPT
if (!window.COURSE_CONTENT) window.COURSE_CONTENT = {};
window.COURSE_CONTENT['day12'] = {
  "day": 12,
  "title": "Set Operations",
  "db": "retail",
  "emoji": "⛔",
  "slides": [
    {
      "title": "Set Operations — UNION, INTERSECT, EXCEPT",
      "duration": "0:00",
      "html": `
        <h2>⛔ Set Operations</h2>

        <div class="slide-section">
          <h3>01. What Are Set Operations?</h3>
          <p>Set operations combine the <strong>results of two SELECT queries</strong> into a single result set, treating each query's output as a mathematical set. The two queries must have the <strong>same number of columns</strong> and <strong>compatible data types</strong> in corresponding positions.</p>

          <div class="db-mock-table-wrap">
            <table class="db-table-mock db-table-mock--compact">
              <thead><tr><th>Operation</th><th>Result</th><th>Duplicates</th></tr></thead>
              <tbody>
                <tr><td><code>UNION</code></td><td>All rows from both queries combined</td><td>Removes duplicates</td></tr>
                <tr><td><code>UNION ALL</code></td><td>All rows from both queries combined</td><td>Keeps duplicates</td></tr>
                <tr><td><code>INTERSECT</code></td><td>Rows present in BOTH queries</td><td>Removes duplicates</td></tr>
                <tr><td><code>EXCEPT</code> / <code>MINUS</code></td><td>Rows in first query but NOT in second</td><td>Removes duplicates</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="slide-section">
          <h3>02. UNION — Combine Without Duplicates</h3>
          <pre><code>-- Combine first_name from employees and customers into one list
SELECT first_name, 'Employee' AS source
FROM   employees
UNION
SELECT first_name, 'Customer' AS source
FROM   customers;

-- All email addresses from both employees and customers
SELECT email FROM employees
UNION
SELECT email FROM customers
ORDER BY email;</code></pre>

          <div class="info-box">
            ℹ️ <code>ORDER BY</code> in a UNION query must come at the very end (after the last SELECT) and applies to the combined result. Column names in ORDER BY come from the first SELECT.
          </div>
        </div>

        <div class="slide-section">
          <h3>03. UNION ALL — Combine Keeping Duplicates</h3>
          <p>Use <code>UNION ALL</code> when you know there are no duplicates, or when you want to keep them (e.g., appending log tables). It is significantly faster than <code>UNION</code> because it skips the deduplication step (no sort/hash).</p>

          <pre><code>-- Combine two period datasets (duplicates are OK)
SELECT order_id, total_amount, 'Q1' AS quarter
FROM   orders
WHERE  order_date BETWEEN '2024-01-01' AND '2024-03-31'
UNION ALL
SELECT order_id, total_amount, 'Q2' AS quarter
FROM   orders
WHERE  order_date BETWEEN '2024-04-01' AND '2024-06-30';</code></pre>

          <div class="pro-tip-box">
            💡 <strong>Performance:</strong> Always prefer <code>UNION ALL</code> over <code>UNION</code> when duplicates are either not possible or acceptable. <code>UNION</code> performs an implicit <code>DISTINCT</code> which requires sorting or hashing the entire result set.
          </div>
        </div>

        <div class="slide-section">
          <h3>04. INTERSECT — Rows in Common</h3>
          <p><code>INTERSECT</code> returns only rows that appear in BOTH query results. Useful for finding overlap between two datasets.</p>

          <pre><code>-- Products ordered in both Jan 2024 AND Feb 2024
SELECT product_id
FROM   order_items
WHERE  order_id IN (SELECT order_id FROM orders
                    WHERE order_date BETWEEN '2024-01-01' AND '2024-01-31')
INTERSECT
SELECT product_id
FROM   order_items
WHERE  order_id IN (SELECT order_id FROM orders
                    WHERE order_date BETWEEN '2024-02-01' AND '2024-02-28');

-- Find names common to both employees and customers
SELECT first_name FROM employees
INTERSECT
SELECT first_name FROM customers;</code></pre>
        </div>

        <div class="slide-section">
          <h3>05. EXCEPT / MINUS — Rows in First but Not Second</h3>
          <p><code>EXCEPT</code> (SQL standard; MySQL uses <code>EXCEPT</code> since v8.0, Oracle uses <code>MINUS</code>) returns rows from the first query that are absent from the second.</p>

          <pre><code>-- Products never ordered (product_id not in order_items)
SELECT product_id FROM products
EXCEPT
SELECT DISTINCT product_id FROM order_items;

-- Customers who never placed an order
SELECT customer_id FROM customers
EXCEPT
SELECT DISTINCT customer_id FROM orders;

-- Employees who have no commission record
SELECT employee_id FROM employees
EXCEPT
SELECT employee_id FROM employees WHERE commission IS NOT NULL;</code></pre>

          <div class="interview-box">
            <h4>🎯 Interview Insight</h4>
            <div>
              <p><strong>Q: What is the difference between EXCEPT and NOT IN / LEFT JOIN anti-join?</strong></p>
              <p><em>A: All three can solve the same problem. EXCEPT is the cleanest SQL set-theoretic approach but requires queries with matching column counts. NOT IN is simple but fails silently when the subquery returns NULLs. LEFT JOIN with IS NULL is the most versatile — it works across databases, handles NULLs correctly, and allows you to return columns from both tables. In interviews, knowing all three approaches demonstrates depth.</em></p>
            </div>
          </div>
        </div>
      `
    }
  ],
  "practiceQuestions": [
    {
      "id": 1,
      "prompt": "<strong>Task: All Email Addresses</strong><br/>Combine all email addresses from <code>employees</code> and <code>customers</code> into a single deduplicated list using UNION.",
      "referenceSql": "SELECT email FROM employees UNION SELECT email FROM customers ORDER BY email;"
    },
    {
      "id": 2,
      "prompt": "<strong>Task: Combined Name List</strong><br/>Using UNION, get a combined list of first names from employees and customers, labelling the source as 'Employee' or 'Customer'.",
      "referenceSql": "SELECT first_name, 'Employee' AS source FROM employees UNION SELECT first_name, 'Customer' AS source FROM customers ORDER BY first_name;"
    },
    {
      "id": 3,
      "prompt": "<strong>Task: Q1 + Q2 Orders (UNION ALL)</strong><br/>Stack Q1 (Jan-Mar 2024) and Q2 (Apr-Jun 2024) orders into one dataset using UNION ALL. Add a <code>quarter</code> label.",
      "referenceSql": "SELECT order_id, total_amount, 'Q1' AS quarter FROM orders WHERE order_date BETWEEN '2024-01-01' AND '2024-03-31' UNION ALL SELECT order_id, total_amount, 'Q2' FROM orders WHERE order_date BETWEEN '2024-04-01' AND '2024-06-30';"
    },
    {
      "id": 4,
      "prompt": "<strong>Task: Products Never Ordered</strong><br/>Using EXCEPT, find all <code>product_id</code> values from <code>products</code> that never appear in <code>order_items</code>.",
      "referenceSql": "SELECT product_id FROM products EXCEPT SELECT DISTINCT product_id FROM order_items;"
    },
    {
      "id": 5,
      "prompt": "<strong>Task: Customers Who Never Ordered</strong><br/>Using EXCEPT, find all <code>customer_id</code> values from <code>customers</code> that never appear in <code>orders</code>.",
      "referenceSql": "SELECT customer_id FROM customers EXCEPT SELECT DISTINCT customer_id FROM orders;"
    },
    {
      "id": 6,
      "prompt": "<strong>Task: Common First Names</strong><br/>Using INTERSECT, find first names that appear in BOTH the <code>employees</code> and <code>customers</code> tables.",
      "referenceSql": "SELECT first_name FROM employees INTERSECT SELECT first_name FROM customers;"
    }
  ],
  "testQuestions": [
    { "id": 1, "prompt": "Combine all first_name values from employees and customers without duplicates.", "ref": "SELECT first_name FROM employees UNION SELECT first_name FROM customers;" },
    { "id": 2, "prompt": "Combine all first_name values from employees and customers WITH duplicates.", "ref": "SELECT first_name FROM employees UNION ALL SELECT first_name FROM customers;" },
    { "id": 3, "prompt": "Find product_ids that appear in BOTH Q1 and Q2 order_items.", "ref": "SELECT product_id FROM order_items WHERE order_id IN (SELECT order_id FROM orders WHERE order_date BETWEEN '2024-01-01' AND '2024-03-31') INTERSECT SELECT product_id FROM order_items WHERE order_id IN (SELECT order_id FROM orders WHERE order_date BETWEEN '2024-04-01' AND '2024-06-30');" },
    { "id": 4, "prompt": "Find customer_ids in customers but NOT in orders (never ordered).", "ref": "SELECT customer_id FROM customers EXCEPT SELECT DISTINCT customer_id FROM orders;" },
    { "id": 5, "prompt": "Find product_ids in products but NOT in order_items (never sold).", "ref": "SELECT product_id FROM products EXCEPT SELECT DISTINCT product_id FROM order_items;" },
    { "id": 6, "prompt": "Get all email addresses from employees UNION ALL emails from customers.", "ref": "SELECT email FROM employees UNION ALL SELECT email FROM customers;" },
    { "id": 7, "prompt": "Find first names common to both employees and customers.", "ref": "SELECT first_name FROM employees INTERSECT SELECT first_name FROM customers;" },
    { "id": 8, "prompt": "Combine first_name + 'E' label and first_name + 'C' label from employees and customers.", "ref": "SELECT first_name, 'E' AS src FROM employees UNION SELECT first_name, 'C' FROM customers;" },
    { "id": 9, "prompt": "Stack 2023 and 2024 orders using UNION ALL with a year label.", "ref": "SELECT order_id, total_amount, '2023' AS yr FROM orders WHERE order_date BETWEEN '2023-01-01' AND '2023-12-31' UNION ALL SELECT order_id, total_amount, '2024' FROM orders WHERE order_date BETWEEN '2024-01-01' AND '2024-12-31';" },
    { "id": 10, "prompt": "Find employee_ids in employees who have NO commission (EXCEPT approach).", "ref": "SELECT employee_id FROM employees EXCEPT SELECT employee_id FROM employees WHERE commission IS NOT NULL;" },
    { "id": 11, "prompt": "Count total records from UNION ALL of employees and customers first_name.", "ref": "SELECT COUNT(*) FROM (SELECT first_name FROM employees UNION ALL SELECT first_name FROM customers);" },
    { "id": 12, "prompt": "Find regions that appear in both employees (via dept) and customers tables.", "ref": "SELECT region FROM customers INTERSECT SELECT region FROM customers WHERE customer_id IN (SELECT customer_id FROM orders);" },
    { "id": 13, "prompt": "Find order_ids in orders that are NOT in order_items (orphan orders).", "ref": "SELECT order_id FROM orders EXCEPT SELECT DISTINCT order_id FROM order_items;" },
    { "id": 14, "prompt": "Stack Processing and Cancelled orders using UNION ALL with a status label preserved.", "ref": "SELECT order_id, total_amount, status FROM orders WHERE status = 'Processing' UNION ALL SELECT order_id, total_amount, status FROM orders WHERE status = 'Cancelled';" },
    { "id": 15, "prompt": "Find categories that appear in products AND have at least one order_item (via product).", "ref": "SELECT DISTINCT category_id FROM products WHERE product_id IN (SELECT product_id FROM order_items) INTERSECT SELECT DISTINCT category_id FROM products;" },
    { "id": 16, "prompt": "Find employee_ids who are also listed as manager_id somewhere (self-referential).", "ref": "SELECT employee_id FROM employees INTERSECT SELECT DISTINCT manager_id FROM employees WHERE manager_id IS NOT NULL;" },
    { "id": 17, "prompt": "Using EXCEPT find departments that have no active employees.", "ref": "SELECT department_id FROM departments EXCEPT SELECT DISTINCT department_id FROM employees WHERE is_active = 1;" },
    { "id": 18, "prompt": "UNION the top 3 employees by salary with top 3 customers by signup_date (just first_name, source).", "ref": "SELECT first_name, 'Top Employee' AS src FROM employees ORDER BY salary DESC LIMIT 3 UNION ALL SELECT first_name, 'Early Customer' FROM customers ORDER BY signup_date ASC LIMIT 3;" },
    { "id": 19, "prompt": "Find all unique job_titles across employees who are active UNION those who are inactive.", "ref": "SELECT DISTINCT job_title FROM employees WHERE is_active = 1 UNION SELECT DISTINCT job_title FROM employees WHERE is_active = 0;" },
    { "id": 20, "prompt": "Find products in category_id 5 that were never ordered.", "ref": "SELECT product_id FROM products WHERE category_id = 5 EXCEPT SELECT DISTINCT product_id FROM order_items;" },
    { "id": 21, "prompt": "Using UNION ALL, create a combined ledger of all order amounts from 2023 and 2024.", "ref": "SELECT order_id, total_amount, order_date FROM orders WHERE strftime('%Y', order_date) = '2023' UNION ALL SELECT order_id, total_amount, order_date FROM orders WHERE strftime('%Y', order_date) = '2024' ORDER BY order_date;" },
    { "id": 22, "prompt": "Find product names that appear in both order_items from Jan 2024 AND Dec 2024.", "ref": "SELECT product_id FROM order_items WHERE order_id IN (SELECT order_id FROM orders WHERE strftime('%m', order_date) = '01' AND strftime('%Y', order_date) = '2024') INTERSECT SELECT product_id FROM order_items WHERE order_id IN (SELECT order_id FROM orders WHERE strftime('%m', order_date) = '12' AND strftime('%Y', order_date) = '2024');" },
    { "id": 23, "prompt": "UNION employee and customer tables: just first_name, last_name, email columns.", "ref": "SELECT first_name, last_name, email FROM employees UNION SELECT first_name, last_name, email FROM customers ORDER BY last_name;" },
    { "id": 24, "prompt": "Find employees who were never assigned as manager_id of any employee.", "ref": "SELECT employee_id FROM employees EXCEPT SELECT DISTINCT manager_id FROM employees WHERE manager_id IS NOT NULL;" },
    { "id": 25, "prompt": "Use EXCEPT to find order_ids that appear in orders but whose items total doesn't match (orphan detection concept — just show orders not in order_items).", "ref": "SELECT order_id FROM orders EXCEPT SELECT DISTINCT order_id FROM order_items;" }
  ],
  "topics": [
    { "id": "topic-1", "label": "Topic 1: UNION, UNION ALL, INTERSECT, EXCEPT", "recordingKey": null }
  ]
};
