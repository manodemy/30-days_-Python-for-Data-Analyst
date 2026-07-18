// Day 18 — Query Optimization & Capstone Project
if (!window.COURSE_CONTENT) window.COURSE_CONTENT = {};
window.COURSE_CONTENT['day18'] = {
  "day": 18,
  "title": "Query Optimization & Capstone Project",
  "db": "retail",
  "emoji": "🚀",
  "slides": [
    {
      "title": "Query Optimization & Capstone Project",
      "duration": "0:00",
      "html": `
        <h2>🚀 Query Optimization & Capstone Project</h2>

        <div class="slide-section">
          <h3>01. How the Query Optimizer Works</h3>
          <p>Every SQL query passes through the database engine's <strong>query optimizer</strong> before execution. The optimizer:</p>
          <ul>
            <li>Parses the SQL into an internal logical plan</li>
            <li>Explores multiple physical execution plans (e.g., hash join vs. nested loop)</li>
            <li>Uses statistics (row counts, cardinality, histograms) to estimate cost</li>
            <li>Selects the plan with the lowest estimated I/O and CPU cost</li>
          </ul>

          <div class="info-box">
            ℹ️ <strong>SQLite EXPLAIN QUERY PLAN:</strong> Use <code>EXPLAIN QUERY PLAN SELECT ...</code> to inspect how SQLite will execute your query. Look for "SCAN TABLE" (full scan) vs "SEARCH TABLE USING INDEX" (efficient indexed lookup).
          </div>
        </div>

        <div class="slide-section">
          <h3>02. Indexes — The Key to Performance</h3>
          <p>An <strong>index</strong> is a separate data structure that allows the database to locate rows without scanning every row in the table. Think of it as the book index — instead of reading every page, you jump directly to the right page number.</p>

          <pre><code>-- Check the query plan BEFORE creating an index
EXPLAIN QUERY PLAN
SELECT * FROM orders WHERE customer_id = 5;
-- Likely: SCAN TABLE orders → reads every row!

-- Create an index on customer_id
CREATE INDEX idx_orders_customer ON orders(customer_id);

-- Check again AFTER creating the index
EXPLAIN QUERY PLAN
SELECT * FROM orders WHERE customer_id = 5;
-- Now: SEARCH TABLE orders USING INDEX idx_orders_customer

-- Composite index for multi-column filters
CREATE INDEX idx_orders_status_date ON orders(status, order_date);

-- List all indexes on a table
SELECT name, sql FROM sqlite_master
WHERE type = 'index' AND tbl_name = 'orders';</code></pre>
        </div>

        <div class="slide-section">
          <h3>03. Writing Efficient Queries — Best Practices</h3>

          <div class="vs-block">
            <div class="vs-card">
              <h4>✅ Efficient Patterns</h4>
              <ul>
                <li>Filter early with WHERE (reduces rows before joins)</li>
                <li>Use INNER JOIN when unmatched rows should be excluded</li>
                <li>Use indexed columns in WHERE and JOIN conditions</li>
                <li>Select only needed columns (avoid SELECT *)</li>
                <li>Use LIMIT for exploratory queries</li>
                <li>Prefer EXISTS over IN for large subqueries</li>
                <li>Use CTEs to separate logic (aids optimizer)</li>
              </ul>
            </div>
            <div class="vs-card">
              <h4>❌ Anti-Patterns</h4>
              <ul>
                <li>Functions on indexed columns in WHERE (non-sargable)</li>
                <li>DISTINCT when duplicates can be eliminated earlier</li>
                <li>Cartesian products (missing JOIN conditions)</li>
                <li>Correlated subqueries on large tables (runs N times)</li>
                <li>Nested subqueries that could be CTEs or joins</li>
                <li>LIKE '%word' with a leading wildcard (cannot use index)</li>
                <li>NOT IN with a subquery that can return NULLs</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="slide-section">
          <h3>04. Sargable vs Non-Sargable Conditions</h3>
          <p>A <strong>sargable</strong> (Search ARGument ABLE) condition can use an index. Non-sargable conditions force a full table scan.</p>

          <div class="db-mock-table-wrap">
            <table class="db-table-mock db-table-mock--compact">
              <thead><tr><th>Non-Sargable ❌ (cannot use index)</th><th>Sargable ✅ (can use index)</th></tr></thead>
              <tbody>
                <tr><td><code>WHERE YEAR(hire_date) = 2022</code></td><td><code>WHERE hire_date BETWEEN '2022-01-01' AND '2022-12-31'</code></td></tr>
                <tr><td><code>WHERE UPPER(name) = 'PRIYA'</code></td><td><code>WHERE name = 'Priya'</code> (store normalised)</td></tr>
                <tr><td><code>WHERE salary + 1000 > 80000</code></td><td><code>WHERE salary > 79000</code></td></tr>
                <tr><td><code>WHERE name LIKE '%Chair'</code></td><td><code>WHERE name LIKE 'Chair%'</code></td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="slide-section">
          <h3>05. Capstone Project — Retail Analytics Dashboard</h3>
          <p>Apply everything you have learned across Days 01–17 to answer real business questions using the Retail database. These are the types of questions asked in data analyst take-home tests and interviews.</p>

          <div class="info-box">
            ℹ️ <strong>Business Context:</strong> You are a Data Analyst at Manodemy Retail. The VP of Sales has asked for a comprehensive performance report. Use the retail schema (customers, orders, order_items, products, categories, employees, departments) to answer all questions below.
          </div>

          <pre><code>-- 1. Revenue Trend: Monthly revenue for the last 12 months
SELECT strftime('%Y-%m', order_date) AS month,
       COUNT(*)                       AS order_count,
       SUM(total_amount)              AS revenue,
       SUM(total_amount) - LAG(SUM(total_amount))
         OVER (ORDER BY strftime('%Y-%m', order_date)) AS mom_change
FROM   orders
GROUP BY month
ORDER BY month;

-- 2. Customer Segmentation: RFM-lite (Recency + Frequency + Monetary)
WITH rfm AS (
  SELECT customer_id,
         MAX(order_date)                           AS last_order,
         COUNT(*)                                  AS frequency,
         SUM(total_amount)                         AS monetary,
         CAST(julianday('now') - julianday(MAX(order_date)) AS INTEGER) AS recency_days
  FROM   orders
  GROUP BY customer_id
)
SELECT customer_id, recency_days, frequency, monetary,
       CASE
         WHEN recency_days <= 30  AND frequency >= 3 THEN 'Champions'
         WHEN recency_days <= 90  AND frequency >= 2 THEN 'Loyal'
         WHEN recency_days <= 180                     THEN 'At Risk'
         ELSE 'Lapsed'
       END AS segment
FROM   rfm;

-- 3. Product Performance: Top 5 products by revenue with category
SELECT p.name,
       cat.name                    AS category,
       SUM(oi.qty * oi.price)      AS revenue,
       RANK() OVER (ORDER BY SUM(oi.qty * oi.price) DESC) AS revenue_rank
FROM   order_items AS oi
INNER JOIN products    AS p   ON oi.product_id  = p.product_id
INNER JOIN categories  AS cat ON p.category_id  = cat.category_id
GROUP BY p.product_id, p.name, cat.name
ORDER BY revenue DESC
LIMIT 5;</code></pre>
        </div>

        <div class="slide-section">
          <h3>06. The SQL Interview Checklist</h3>
          <div class="pro-tip-box">
            💡 <strong>Before Every Interview:</strong>
            <ul>
              <li>✅ Know logical execution order (FROM → WHERE → GROUP BY → HAVING → SELECT → DISTINCT → ORDER BY → LIMIT)</li>
              <li>✅ Know all JOIN types and when to use each</li>
              <li>✅ Understand NULL behavior in comparisons, aggregates, and JOINs</li>
              <li>✅ Know ROW_NUMBER vs RANK vs DENSE_RANK differences</li>
              <li>✅ Can write a running total and a LAG/LEAD analysis</li>
              <li>✅ Understand EXISTS vs IN — especially with NULLs</li>
              <li>✅ Can write a CTE and explain why to use one</li>
              <li>✅ Know PRIMARY KEY, FOREIGN KEY, UNIQUE, NOT NULL, CHECK</li>
              <li>✅ Can explain ACID properties</li>
              <li>✅ Understand what an index is and when to create one</li>
            </ul>
          </div>
        </div>
      `
    }
  ],
  "practiceQuestions": [
    {
      "id": 1,
      "prompt": "<strong>Capstone 1: Revenue by Month</strong><br/>Compute monthly revenue (SUM of total_amount) for all months in the data. Add a month-over-month change column using LAG.",
      "referenceSql": "SELECT strftime('%Y-%m', order_date) AS month, SUM(total_amount) AS revenue, SUM(total_amount) - LAG(SUM(total_amount)) OVER (ORDER BY strftime('%Y-%m', order_date)) AS mom_delta FROM orders GROUP BY month ORDER BY month;"
    },
    {
      "id": 2,
      "prompt": "<strong>Capstone 2: Customer Segments</strong><br/>Classify customers as 'Champions' (recency<=30 days, frequency>=3), 'Loyal' (recency<=90, frequency>=2), 'At Risk' (recency<=180), or 'Lapsed' using a CTE.",
      "referenceSql": "WITH rfm AS (SELECT customer_id, CAST(julianday('now') - julianday(MAX(order_date)) AS INTEGER) AS recency_days, COUNT(*) AS frequency, SUM(total_amount) AS monetary FROM orders GROUP BY customer_id) SELECT customer_id, recency_days, frequency, monetary, CASE WHEN recency_days<=30 AND frequency>=3 THEN 'Champions' WHEN recency_days<=90 AND frequency>=2 THEN 'Loyal' WHEN recency_days<=180 THEN 'At Risk' ELSE 'Lapsed' END AS segment FROM rfm;"
    },
    {
      "id": 3,
      "prompt": "<strong>Capstone 3: Top Products</strong><br/>Find the top 5 products by total revenue (qty × price from order_items), joined with product name and category name.",
      "referenceSql": "SELECT p.name, cat.name AS category, SUM(oi.qty * oi.price) AS revenue FROM order_items oi INNER JOIN products p ON oi.product_id = p.product_id INNER JOIN categories cat ON p.category_id = cat.category_id GROUP BY p.product_id, p.name, cat.name ORDER BY revenue DESC LIMIT 5;"
    },
    {
      "id": 4,
      "prompt": "<strong>Capstone 4: Department Performance</strong><br/>Show total revenue handled by each department (via employee → order), their headcount, and average salary. Sort by revenue desc.",
      "referenceSql": "SELECT d.name AS dept, COUNT(DISTINCT e.employee_id) AS headcount, AVG(e.salary) AS avg_salary, SUM(o.total_amount) AS revenue FROM employees e INNER JOIN departments d ON e.department_id = d.department_id LEFT JOIN orders o ON e.employee_id = o.employee_id GROUP BY d.department_id, d.name ORDER BY revenue DESC;"
    },
    {
      "id": 5,
      "prompt": "<strong>Capstone 5: Low Stock Alert</strong><br/>Create a report showing all products with stock_qty < 20, their category, current unit_price, and cost_price. Flag products with 0 stock as 'Critical'.",
      "referenceSql": "SELECT p.name, cat.name AS category, p.stock_qty, p.unit_price, p.cost_price, CASE WHEN p.stock_qty = 0 THEN 'Critical' ELSE 'Low' END AS alert FROM products p INNER JOIN categories cat ON p.category_id = cat.category_id WHERE p.stock_qty < 20 ORDER BY p.stock_qty ASC;"
    },
    {
      "id": 6,
      "prompt": "<strong>Capstone 6: Quarterly Revenue Pivot</strong><br/>Show total revenue per quarter using CASE expressions inside SUM (Q1=Jan-Mar, Q2=Apr-Jun, Q3=Jul-Sep, Q4=Oct-Dec) for 2024.",
      "referenceSql": "SELECT SUM(CASE WHEN strftime('%m',order_date) BETWEEN '01' AND '03' THEN total_amount ELSE 0 END) AS Q1, SUM(CASE WHEN strftime('%m',order_date) BETWEEN '04' AND '06' THEN total_amount ELSE 0 END) AS Q2, SUM(CASE WHEN strftime('%m',order_date) BETWEEN '07' AND '09' THEN total_amount ELSE 0 END) AS Q3, SUM(CASE WHEN strftime('%m',order_date) BETWEEN '10' AND '12' THEN total_amount ELSE 0 END) AS Q4 FROM orders WHERE strftime('%Y',order_date)='2024';"
    }
  ],
  "testQuestions": [
    { "id": 1, "prompt": "What is a sargable condition? Write a sargable version of WHERE UPPER(name) = 'ALICE'.", "ref": "-- A sargable condition can use an index. Sargable: WHERE name = 'Alice' (assumes data is stored as 'Alice')." },
    { "id": 2, "prompt": "Write EXPLAIN QUERY PLAN for a SELECT on orders filtered by customer_id.", "ref": "EXPLAIN QUERY PLAN SELECT * FROM orders WHERE customer_id = 5;" },
    { "id": 3, "prompt": "Create an index on orders(customer_id) and one on orders(status, order_date).", "ref": "CREATE INDEX idx_cust ON orders(customer_id); CREATE INDEX idx_status_date ON orders(status, order_date);" },
    { "id": 4, "prompt": "Monthly revenue for all months in the dataset.", "ref": "SELECT strftime('%Y-%m', order_date) AS month, SUM(total_amount) AS revenue FROM orders GROUP BY month ORDER BY month;" },
    { "id": 5, "prompt": "Top 5 customers by total spend, with their name and segment (Gold>=50k, Silver>=10k, Bronze).", "ref": "WITH spend AS (SELECT customer_id, SUM(total_amount) AS total FROM orders GROUP BY customer_id) SELECT c.first_name, s.total, CASE WHEN s.total>=50000 THEN 'Gold' WHEN s.total>=10000 THEN 'Silver' ELSE 'Bronze' END AS segment FROM spend s INNER JOIN customers c ON s.customer_id=c.customer_id ORDER BY s.total DESC LIMIT 5;" },
    { "id": 6, "prompt": "Find the best-selling product category by total revenue.", "ref": "SELECT cat.name, SUM(oi.qty*oi.price) AS revenue FROM order_items oi INNER JOIN products p ON oi.product_id=p.product_id INNER JOIN categories cat ON p.category_id=cat.category_id GROUP BY cat.category_id, cat.name ORDER BY revenue DESC LIMIT 1;" },
    { "id": 7, "prompt": "Using a CTE and window function, rank products by revenue and show top 3 per category.", "ref": "WITH rev AS (SELECT p.category_id, p.product_id, p.name, SUM(oi.qty*oi.price) AS revenue FROM order_items oi INNER JOIN products p ON oi.product_id=p.product_id GROUP BY p.product_id, p.name, p.category_id), ranked AS (SELECT *, ROW_NUMBER() OVER (PARTITION BY category_id ORDER BY revenue DESC) AS rn FROM rev) SELECT * FROM ranked WHERE rn <= 3;" },
    { "id": 8, "prompt": "Year-over-year revenue growth using LAG on annual totals.", "ref": "WITH yr AS (SELECT strftime('%Y',order_date) AS yr, SUM(total_amount) AS rev FROM orders GROUP BY yr) SELECT yr, rev, LAG(rev) OVER (ORDER BY yr) AS prev, ROUND((rev-LAG(rev) OVER(ORDER BY yr))*100.0/LAG(rev) OVER(ORDER BY yr),2) AS yoy_pct FROM yr;" },
    { "id": 9, "prompt": "Find customers who have NOT ordered in the last 90 days (churned customers).", "ref": "SELECT c.first_name, MAX(o.order_date) AS last_order FROM customers c LEFT JOIN orders o ON c.customer_id=o.customer_id GROUP BY c.customer_id, c.first_name HAVING last_order < date('now','-90 days') OR last_order IS NULL;" },
    { "id": 10, "prompt": "Compute average fulfillment time in days and identify departments with above-average fulfillment time.", "ref": "WITH ful AS (SELECT o.employee_id, AVG(julianday(o.shipped_date)-julianday(o.order_date)) AS avg_days FROM orders o WHERE o.shipped_date IS NOT NULL GROUP BY o.employee_id) SELECT d.name, ROUND(AVG(f.avg_days),2) AS dept_avg_days FROM ful f INNER JOIN employees e ON f.employee_id=e.employee_id INNER JOIN departments d ON e.department_id=d.department_id GROUP BY d.department_id, d.name HAVING dept_avg_days > (SELECT AVG(julianday(shipped_date)-julianday(order_date)) FROM orders WHERE shipped_date IS NOT NULL);" },
    { "id": 11, "prompt": "Quarterly revenue pivot for 2024 using CASE inside SUM.", "ref": "SELECT SUM(CASE WHEN strftime('%m',order_date) BETWEEN '01' AND '03' THEN total_amount ELSE 0 END) AS Q1, SUM(CASE WHEN strftime('%m',order_date) BETWEEN '04' AND '06' THEN total_amount ELSE 0 END) AS Q2, SUM(CASE WHEN strftime('%m',order_date) BETWEEN '07' AND '09' THEN total_amount ELSE 0 END) AS Q3, SUM(CASE WHEN strftime('%m',order_date) BETWEEN '10' AND '12' THEN total_amount ELSE 0 END) AS Q4 FROM orders WHERE strftime('%Y',order_date)='2024';" },
    { "id": 12, "prompt": "Compute running total of orders per customer and flag when it exceeds 100000.", "ref": "SELECT customer_id, order_id, order_date, total_amount, SUM(total_amount) OVER (PARTITION BY customer_id ORDER BY order_date) AS running_total, CASE WHEN SUM(total_amount) OVER (PARTITION BY customer_id ORDER BY order_date) > 100000 THEN 'VIP Threshold Crossed' ELSE '' END AS flag FROM orders;" },
    { "id": 13, "prompt": "Find the product with the highest profit margin in each category.", "ref": "WITH margins AS (SELECT p.product_id, p.name, p.category_id, (p.unit_price-p.cost_price)*100.0/p.unit_price AS margin, ROW_NUMBER() OVER (PARTITION BY p.category_id ORDER BY (p.unit_price-p.cost_price)*100.0/p.unit_price DESC) AS rn FROM products p) SELECT name, category_id, ROUND(margin,2) AS margin_pct FROM margins WHERE rn=1;" },
    { "id": 14, "prompt": "Show each employee's salary vs. their department average and company average.", "ref": "SELECT first_name, department_id, salary, AVG(salary) OVER (PARTITION BY department_id) AS dept_avg, AVG(salary) OVER () AS company_avg, salary - AVG(salary) OVER (PARTITION BY department_id) AS vs_dept FROM employees;" },
    { "id": 15, "prompt": "Find all customers in the top 20% by spend (top quintile using NTILE(5)).", "ref": "WITH spend AS (SELECT customer_id, SUM(total_amount) AS total FROM orders GROUP BY customer_id), tiles AS (SELECT customer_id, total, NTILE(5) OVER (ORDER BY total DESC) AS quintile FROM spend) SELECT * FROM tiles WHERE quintile = 1;" },
    { "id": 16, "prompt": "Identify products whose sales have been declining (each month lower than previous) in 2024 using LAG.", "ref": "WITH monthly AS (SELECT product_id, strftime('%Y-%m',o.order_date) AS month, SUM(oi.qty) AS qty FROM order_items oi INNER JOIN orders o ON oi.order_id=o.order_id WHERE strftime('%Y',o.order_date)='2024' GROUP BY product_id, month), trend AS (SELECT *, LAG(qty) OVER (PARTITION BY product_id ORDER BY month) AS prev_qty FROM monthly) SELECT DISTINCT product_id FROM trend WHERE qty < prev_qty;" },
    { "id": 17, "prompt": "Create a comprehensive inventory report: product name, category, stock_qty, unit_price, stock_value, profit margin, stock_status.", "ref": "SELECT p.name, cat.name AS category, p.stock_qty, p.unit_price, p.stock_qty*p.unit_price AS stock_value, ROUND((p.unit_price-p.cost_price)*100.0/p.unit_price,1) AS margin_pct, CASE WHEN p.stock_qty=0 THEN 'Out of Stock' WHEN p.stock_qty<10 THEN 'Critical' WHEN p.stock_qty<30 THEN 'Low' ELSE 'Adequate' END AS stock_status FROM products p INNER JOIN categories cat ON p.category_id=cat.category_id ORDER BY stock_value DESC;" },
    { "id": 18, "prompt": "Find the employee who has generated the most revenue through orders they processed.", "ref": "SELECT e.first_name, e.last_name, SUM(o.total_amount) AS revenue FROM orders o INNER JOIN employees e ON o.employee_id=e.employee_id GROUP BY e.employee_id, e.first_name, e.last_name ORDER BY revenue DESC LIMIT 1;" },
    { "id": 19, "prompt": "What are the ACID properties? Write a transaction demonstrating atomicity.", "ref": "-- Atomicity: BEGIN TRANSACTION; UPDATE products SET stock_qty=stock_qty-1 WHERE product_id=1; INSERT INTO order_items(order_id,product_id,qty,price) VALUES(100,1,1,5000); COMMIT;" },
    { "id": 20, "prompt": "Explain when you would use an index. Create a composite index that would speed up: WHERE status='Shipped' AND order_date > '2024-01-01'.", "ref": "-- Use an index when a column appears in WHERE/JOIN and the table is large. Composite: CREATE INDEX idx_status_date ON orders(status, order_date);" },
    { "id": 21, "prompt": "Write a full customer lifetime value (CLV) report: total spent, avg order, first/last order date, days active.", "ref": "SELECT c.first_name, c.last_name, COUNT(o.order_id) AS num_orders, SUM(o.total_amount) AS total_spent, ROUND(AVG(o.total_amount),2) AS avg_order, MIN(o.order_date) AS first_order, MAX(o.order_date) AS last_order, CAST(julianday(MAX(o.order_date))-julianday(MIN(o.order_date)) AS INTEGER) AS days_active FROM customers c LEFT JOIN orders o ON c.customer_id=o.customer_id GROUP BY c.customer_id, c.first_name, c.last_name ORDER BY total_spent DESC;" },
    { "id": 22, "prompt": "Find the percentage of revenue contributed by the top 20% of products (Pareto analysis).", "ref": "WITH rev AS (SELECT product_id, SUM(qty*price) AS product_rev FROM order_items GROUP BY product_id), total AS (SELECT SUM(product_rev) AS grand FROM rev), ranked AS (SELECT *, NTILE(5) OVER (ORDER BY product_rev DESC) AS quintile FROM rev) SELECT SUM(product_rev)*100.0/(SELECT grand FROM total) AS top20_pct FROM ranked WHERE quintile=1;" },
    { "id": 23, "prompt": "Write a query to detect duplicate orders: same customer, same date, same amount.", "ref": "SELECT customer_id, order_date, total_amount, COUNT(*) AS duplicate_count FROM orders GROUP BY customer_id, order_date, total_amount HAVING COUNT(*) > 1;" },
    { "id": 24, "prompt": "Compare SQL EXPLAIN QUERY PLAN output before and after creating an index on orders(customer_id).", "ref": "EXPLAIN QUERY PLAN SELECT * FROM orders WHERE customer_id=1; CREATE INDEX idx_cust ON orders(customer_id); EXPLAIN QUERY PLAN SELECT * FROM orders WHERE customer_id=1;" },
    { "id": 25, "prompt": "Create a complete Sales Performance Report: per employee show name, department, orders processed, total revenue, avg order value, their revenue rank within department.", "ref": "WITH emp_stats AS (SELECT e.employee_id, e.first_name, e.last_name, d.name AS dept, COUNT(o.order_id) AS orders, SUM(o.total_amount) AS revenue, ROUND(AVG(o.total_amount),2) AS avg_order FROM employees e INNER JOIN departments d ON e.department_id=d.department_id LEFT JOIN orders o ON e.employee_id=o.employee_id GROUP BY e.employee_id, e.first_name, e.last_name, d.name) SELECT *, RANK() OVER (PARTITION BY dept ORDER BY revenue DESC) AS dept_revenue_rank FROM emp_stats ORDER BY dept, dept_revenue_rank;" }
  ],
  "topics": [
    { "id": "topic-1", "label": "Topic 1: Query Optimization, Indexes & Capstone Project", "recordingKey": null }
  ]
};
