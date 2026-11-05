// Day 18 — Query Optimization & SQL Capstone Project
if (!window.COURSE_CONTENT) window.COURSE_CONTENT = {};
window.COURSE_CONTENT['day18'] = {
  "day": 18,
  "title": "Query Optimization & Capstone",
  "db": "retail",
  "emoji": "🚀",
  "slides": [
    {
      "title": "Query Optimization, Indexing & SQL Capstone",
      "duration": "12:00",
      "html": `<h2>🚀 Query Optimization, Indexing &amp; SQL Capstone Project</h2>

        <!-- ── Section 01: Query Optimizer Internals ── -->
        <div class="slide-section" id="day18OptimizerInternals">
          <h3 class="heading-with-audio" id="queryOptimizerInternals">
            01. How Relational Query Optimizers Work (Logical vs Physical Plans)
          </h3>
          <p>Every declarative SQL statement must be compiled into a concrete physical execution plan before the database engine can touch a single page in memory or disk. The <strong>Cost-Based Optimizer (CBO)</strong> evaluates candidate plans and selects the one with the lowest estimated resource consumption (I/O, CPU, and memory).</p>

          <div class="db-mock-table-wrap" id="optimizerStagesTable">
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 6px; padding: 0 4px;">
              <h4 style="margin: 0; font-size: 1.0rem; font-weight: 800; letter-spacing: -0.015em; flex: 1;">Query Execution Pipeline Stages</h4>
            </div>
            <table class="db-table-mock db-table-mock--compact">
              <thead><tr><th>Stage</th><th>Mechanism</th><th>Input</th><th>Output</th><th>Core Optimization Rule</th></tr></thead>
              <tbody>
                <tr><td><strong>1. Parser &amp; Lexer</strong></td><td>Syntax &amp; semantic tree generation</td><td>Raw SQL String</td><td>Abstract Syntax Tree (AST)</td><td>Verifies table existence, column permissions, and syntax validity</td></tr>
                <tr><td><strong>2. Query Rewriter</strong></td><td>Heuristic algebraic transformation</td><td>AST</td><td>Logical Plan</td><td>Flattens redundant subqueries, pushes down WHERE predicates</td></tr>
                <tr><td><strong>3. Plan Generator</strong></td><td>Physical operator candidate search</td><td>Logical Plan</td><td>Candidate Physical Plans</td><td>Compares Nested Loop vs Hash Join vs Merge Join paths</td></tr>
                <tr><td><strong>4. Cost Estimator</strong></td><td>Statistics &amp; histogram lookup</td><td>Candidate Plans</td><td>Cost Matrix (I/O + CPU)</td><td>Calculates expected disk page fetches based on table cardinality</td></tr>
                <tr><td><strong>5. Execution Engine</strong></td><td>Volcano Iterator Model (next() loop)</td><td>Winning Plan</td><td>Result Set Rows</td><td>Streams tuples to client buffers with minimal memory footprint</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- ── Section 02: EXPLAIN & EXPLAIN QUERY PLAN ── -->
        <div class="slide-section" id="explainQueryPlanSection">
          <h3 class="heading-with-audio" id="explainQueryPlan">
            02. Demystifying EXPLAIN &amp; EXPLAIN QUERY PLAN (SCAN vs SEARCH)
          </h3>
          <p>The <code>EXPLAIN QUERY PLAN</code> prefix instructs SQLite to describe the chosen physical strategy rather than computing row results. Learning to read query plans distinguishes junior coders from senior data engineers.</p>

          <div class="code-block-container" id="explainPlanCode">
            <div class="code-subblock" id="explainPlanSubblock">
              <pre><code><span class="code-comment">-- 1. Full Table Scan (Slow on large tables: reads every row sequentially)</span>
<span class="kw">EXPLAIN QUERY PLAN</span>
<span class="kw">SELECT</span> * <span class="kw">FROM</span> orders <span class="kw">WHERE</span> customer_id = 5;
<span class="code-comment">-- Output: SCAN TABLE orders (~O(N) time complexity)</span>

<span class="code-comment">-- 2. Indexed Lookup (Fast: logarithmic search directly to index leaf)</span>
<span class="kw">CREATE INDEX IF NOT EXISTS</span> idx_orders_customer <span class="kw">ON</span> orders(customer_id);

<span class="kw">EXPLAIN QUERY PLAN</span>
<span class="kw">SELECT</span> * <span class="kw">FROM</span> orders <span class="kw">WHERE</span> customer_id = 5;
<span class="code-comment">-- Output: SEARCH TABLE orders USING INDEX idx_orders_customer (customer_id=?) (~O(log N))</span></code></pre>
            </div>
          </div>

          <div class="info-box">
            ℹ️ <strong>SCAN vs SEARCH Rule of Thumb:</strong> <code>SCAN TABLE</code> means every single page in the table must be fetched into RAM. <code>SEARCH TABLE USING INDEX</code> jumps directly to the matching B-Tree leaves in $O(\log N)$ time, bypassing 99% of disk I/O.
          </div>
        </div>

        <!-- ── Section 03: B-Tree Index Architecture ── -->
        <div class="slide-section" id="btreeIndexSection">
          <h3 class="heading-with-audio" id="btreeIndexArchitecture">
            03. B-Tree Index Architecture: Single-Column vs Composite Indexing
          </h3>
          <p>Relational databases structure indexes as balanced search trees (B-Trees). An index on column <code>(A, B)</code> sorts rows first by <code>A</code>, then by <code>B</code>. This introduces the fundamental <strong>Leftmost Prefix Rule</strong>.</p>

          <div class="db-mock-table-wrap" id="compositeIndexTable">
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 6px; padding: 0 4px;">
              <h4 style="margin: 0; font-size: 1.0rem; font-weight: 800; letter-spacing: -0.015em; flex: 1;">Composite Index Utility Matrix on INDEX (status, order_date)</h4>
            </div>
            <table class="db-table-mock db-table-mock--compact">
              <thead><tr><th>Query Filter (WHERE Clause)</th><th>Can Use Composite Index?</th><th>Why / Why Not?</th><th>Execution Strategy</th></tr></thead>
              <tbody>
                <tr><td><code>WHERE status = 'Delivered' AND order_date &gt; '2024-01-01'</code></td><td>✅ Yes (100% Optimal)</td><td>Matches both leading column and second column</td><td>Index Seek on status + range scan on order_date</td></tr>
                <tr><td><code>WHERE status = 'Shipped'</code></td><td>✅ Yes (Optimal)</td><td>Matches leftmost column of the index</td><td>Index Seek on status</td></tr>
                <tr><td><code>WHERE order_date &gt; '2024-01-01'</code></td><td>❌ No (Full Scan)</td><td>Omits leftmost column; second column is not sorted independently</td><td>Full Table Scan (SCAN TABLE)</td></tr>
                <tr><td><code>WHERE status = 'Pending' ORDER BY order_date</code></td><td>✅ Yes (Zero Sort Cost)</td><td>Index provides sorted order; avoids in-memory temp sort</td><td>Index Scan + Stream (no sorting buffer needed)</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- ── Section 04: Sargable vs Non-Sargable Conditions ── -->
        <div class="slide-section" id="sargableSection">
          <h3 class="heading-with-audio" id="sargability">
            04. Sargable vs Non-Sargable Query Expressions (Search ARGument ABLE)
          </h3>
          <p>A predicate is <strong>sargable</strong> when the database engine can evaluate it directly against an index without executing a function or calculation on every table row.</p>

          <div class="vs-block">
            <div class="vs-card">
              <h4>❌ Non-Sargable Anti-Patterns (Forces Full Scan)</h4>
              <ul>
                <li><code>WHERE strftime('%Y', order_date) = '2024'</code> (wraps column in function)</li>
                <li><code>WHERE salary + 5000 &gt; 80000</code> (arithmetic on column)</li>
                <li><code>WHERE customer_name LIKE '%Tech'</code> (leading wildcard defeats index)</li>
                <li><code>WHERE UPPER(city) = 'MUMBAI'</code> (function disables standard index)</li>
              </ul>
            </div>
            <div class="vs-card">
              <h4>✅ Sargable Refactored Equivalents (Index-Enabled)</h4>
              <ul>
                <li><code>WHERE order_date &gt;= '2024-01-01' AND order_date &lt; '2025-01-01'</code></li>
                <li><code>WHERE salary &gt; 75000</code> (computes constant once)</li>
                <li><code>WHERE customer_name LIKE 'Tech%'</code> (trailing wildcard uses index)</li>
                <li><code>WHERE city = 'Mumbai'</code> (store cleansed or use functional index)</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- ── Section 05: Join Engine Mechanics ── -->
        <div class="slide-section" id="joinOptimizationSection">
          <h3 class="heading-with-audio" id="joinMechanics">
            05. Join Engine Mechanics: Nested Loops, Hash Joins &amp; Merge Joins
          </h3>
          <p>When joining tables, the optimizer chooses an execution strategy based on table size, index availability, and memory buffers.</p>

          <div class="db-mock-table-wrap" id="joinTypesTable">
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 6px; padding: 0 4px;">
              <h4 style="margin: 0; font-size: 1.0rem; font-weight: 800; letter-spacing: -0.015em; flex: 1;">Relational Join Algorithms Compared</h4>
            </div>
            <table class="db-table-mock db-table-mock--compact">
              <thead><tr><th>Join Algorithm</th><th>Complexity</th><th>Memory Overhead</th><th>Ideal Production Scenario</th></tr></thead>
              <tbody>
                <tr><td><strong>Nested Loop Join</strong></td><td>$O(M \times N)$ unindexed / $O(M \log N)$ indexed</td><td>Minimal ($O(1)$)</td><td>Small driving table joining to an indexed primary key table</td></tr>
                <tr><td><strong>Hash Join</strong></td><td>$O(M + N)$</td><td>High (builds in-memory hash table for smaller table)</td><td>Large unindexed tables with equality join conditions (e.g. <code>A.id = B.id</code>)</td></tr>
                <tr><td><strong>Merge Join</strong></td><td>$O(M \log M + N \log N)$</td><td>Moderate</td><td>Both inputs are already sorted by the join key on disk</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- ── Section 06: Subqueries vs CTEs vs Temp Tables ── -->
        <div class="slide-section" id="ctePerformanceSection">
          <h3 class="heading-with-audio" id="ctePerformance">
            06. Subqueries vs CTEs vs Temporary Tables Performance Trade-offs
          </h3>
          <p>Common Table Expressions (CTEs) improve code modularity. Modern query optimizers inline non-recursive CTEs into the parent query, applying joint index optimizations.</p>

          <div class="code-block-container" id="cteRefactorCode">
            <div class="code-subblock" id="cteRefactorSubblock">
              <pre><code><span class="code-comment">-- Correlated Subquery: re-evaluated for EVERY customer row (Slow O(N*M))</span>
<span class="kw">SELECT</span> c.first_name,
       (<span class="kw">SELECT SUM</span>(total_amount) <span class="kw">FROM</span> orders o <span class="kw">WHERE</span> o.customer_id = c.customer_id) <span class="kw">AS</span> total_spent
<span class="kw">FROM</span> customers c;

<span class="code-comment">-- Optimized CTE with Hash Aggregate & Single Join (Fast O(N+M))</span>
<span class="kw">WITH</span> customer_spend <span class="kw">AS</span> (
  <span class="kw">SELECT</span> customer_id, <span class="kw">SUM</span>(total_amount) <span class="kw">AS</span> total_spent
  <span class="kw">FROM</span> orders
  <span class="kw">GROUP BY</span> customer_id
)
<span class="kw">SELECT</span> c.first_name, COALESCE(cs.total_spent, 0) <span class="kw">AS</span> total_spent
<span class="kw">FROM</span> customers c
<span class="kw">LEFT JOIN</span> customer_spend cs <span class="kw">ON</span> c.customer_id = cs.customer_id;</code></pre>
            </div>
          </div>
        </div>

        <!-- ── Section 07: Window Function Optimization ── -->
        <div class="slide-section" id="windowOptimizationSection">
          <h3 class="heading-with-audio" id="windowOptimization">
            07. Window Function Partitioning &amp; Framing Optimization
          </h3>
          <p>Window functions require sorting within partitions. Specifying explicit frame bounds (e.g., <code>ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW</code>) prevents expensive default <code>RANGE</code> calculations with duplicate peer inspections.</p>
        </div>

        <!-- ── Section 08: Transactions & Concurrency ── -->
        <div class="slide-section" id="transactionsSection">
          <h3 class="heading-with-audio" id="transactionsACID">
            08. Transactions, Lock Escalation &amp; Concurrency Control (ACID)
          </h3>
          <p>In high-throughput environments, transactions must guarantee consistency while avoiding table-level read/write lock contention.</p>
          <ul>
            <li><strong>Atomicity:</strong> All statements in a <code>BEGIN ... COMMIT</code> block succeed, or all are reverted via <code>ROLLBACK</code>.</li>
            <li><strong>Consistency:</strong> Invariants and foreign key constraints are enforced before changes persist.</li>
            <li><strong>Isolation:</strong> SQLite uses Write-Ahead Logging (WAL) allowing concurrent readers without blocking writers.</li>
            <li><strong>Durability:</strong> Once committed, transaction writes survive power failures and crashes.</li>
          </ul>
        </div>

        <!-- ── Section 09: Master SQL Anti-Patterns ── -->
        <div class="slide-section" id="sqlAntiPatternsSection">
          <h3 class="heading-with-audio" id="sqlAntiPatterns">
            09. Master Enterprise SQL Anti-Patterns Catalog
          </h3>

          <div class="db-mock-table-wrap" id="antiPatternsTable">
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 6px; padding: 0 4px;">
              <h4 style="margin: 0; font-size: 1.0rem; font-weight: 800; letter-spacing: -0.015em; flex: 1;">Production Anti-Patterns &amp; Architectural Auto-Fixes</h4>
            </div>
            <table class="db-table-mock db-table-mock--compact">
              <thead><tr><th>Anti-Pattern</th><th>Symptom / Performance Danger</th><th>Production Fix</th></tr></thead>
              <tbody>
                <tr><td><code>SELECT *</code></td><td>Excessive disk I/O, disables covering index optimization, breaks column schema contracts</td><td>Explicitly project only required columns (e.g. <code>SELECT id, name</code>)</td></tr>
                <tr><td>Unnecessary <code>DISTINCT</code></td><td>Forces an expensive in-memory sort or hash deduplication over the entire result set</td><td>Inspect join cardinalities; fix underlying duplicate rows in joins</td></tr>
                <tr><td><code>NOT IN (SELECT ...)</code> with NULLs</td><td>If subquery returns a single NULL, entire <code>NOT IN</code> evaluates to UNKNOWN/empty</td><td>Refactor to <code>NOT EXISTS (SELECT 1 ...)</code> or <code>LEFT JOIN ... WHERE key IS NULL</code></td></tr>
                <tr><td>Cartesian Product (Missing JOIN condition)</td><td>Explodes row count ($M \times N$), exhausts memory buffers, locks database</td><td>Always ensure exact <code>ON primary_key = foreign_key</code> predicates</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- ── Section 10: 25 FAANG Interview Checklist ── -->
        <div class="slide-section" id="faangInterviewSection">
          <h3 class="heading-with-audio" id="interviewQuestions">
            10. 25 Senior Data Analyst &amp; Analytics Engineer Interview Questions
          </h3>
          <div class="pro-tip-box">
            💡 <strong>Executive Interview Checklist:</strong>
            <ul>
              <li>✅ What is the logical query processing order? (FROM → WHERE → GROUP BY → HAVING → SELECT → DISTINCT → ORDER BY → LIMIT)</li>
              <li>✅ How does a B-Tree index work, and what is the leftmost prefix rule?</li>
              <li>✅ Why does wrapping a column in a function disable an index?</li>
              <li>✅ What is the difference between ROW_NUMBER(), RANK(), and DENSE_RANK()?</li>
              <li>✅ When would you use a CTE vs. a Temporary Table vs. a View?</li>
              <li>✅ How do you identify slow queries and interpret an EXPLAIN QUERY PLAN?</li>
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
    },
    {
      "id": 7,
      "prompt": "<strong>Capstone 7: Customer Lifetime Value (CLV)</strong><br/>Calculate total order count, total CLV spend, and average order value for each customer. Sort by total spend descending.",
      "referenceSql": "SELECT c.customer_id, c.first_name, c.last_name, COUNT(o.order_id) AS order_count, SUM(o.total_amount) AS total_clv, ROUND(AVG(o.total_amount), 2) AS avg_order_val FROM customers c INNER JOIN orders o ON c.customer_id = o.customer_id GROUP BY c.customer_id, c.first_name, c.last_name ORDER BY total_clv DESC;"
    },
    {
      "id": 8,
      "prompt": "<strong>Capstone 8: Inspecting Query Plans</strong><br/>Run EXPLAIN QUERY PLAN on orders joined with customers filtering on status = 'Delivered'.",
      "referenceSql": "EXPLAIN QUERY PLAN SELECT o.order_id, o.order_date, c.first_name FROM orders o INNER JOIN customers c ON o.customer_id = c.customer_id WHERE o.status = 'Delivered';"
    },
    {
      "id": 9,
      "prompt": "<strong>Capstone 9: Single-Column B-Tree Index</strong><br/>Create an index named <code>idx_orders_cust</code> on the <code>customer_id</code> column of the <code>orders</code> table.",
      "referenceSql": "CREATE INDEX IF NOT EXISTS idx_orders_cust ON orders(customer_id);"
    },
    {
      "id": 10,
      "prompt": "<strong>Capstone 10: Composite Covering Index</strong><br/>Create a composite index named <code>idx_orders_status_date</code> on <code>(status, order_date)</code> of the <code>orders</code> table.",
      "referenceSql": "CREATE INDEX IF NOT EXISTS idx_orders_status_date ON orders(status, order_date);"
    },
    {
      "id": 11,
      "prompt": "<strong>Capstone 11: Sargable Date Range Filtering</strong><br/>Retrieve order_id, order_date, and total_amount for all orders placed in the first half of 2024 (Jan 1 to June 30) using sargable range comparison.",
      "referenceSql": "SELECT order_id, order_date, total_amount FROM orders WHERE order_date >= '2024-01-01' AND order_date < '2024-07-01' ORDER BY order_date ASC;"
    },
    {
      "id": 12,
      "prompt": "<strong>Capstone 12: Refactoring Subqueries with CTE</strong><br/>Write a CTE named <code>high_spenders</code> that calculates customers with total spend exceeding 20000, then join with customers to return customer_id, first_name, city, and total_spend.",
      "referenceSql": "WITH high_spenders AS (SELECT customer_id, SUM(total_amount) AS total_spend FROM orders GROUP BY customer_id HAVING total_spend > 20000) SELECT c.customer_id, c.first_name, c.city, h.total_spend FROM customers c INNER JOIN high_spenders h ON c.customer_id = h.customer_id ORDER BY h.total_spend DESC;"
    },
    {
      "id": 13,
      "prompt": "<strong>Capstone 13: Customer Churn Detection</strong><br/>Identify customers whose last order date is prior to '2024-05-01' or who have never placed an order. Return customer_id, first_name, city, and last_order_date.",
      "referenceSql": "SELECT c.customer_id, c.first_name, c.city, MAX(o.order_date) AS last_order_date FROM customers c LEFT JOIN orders o ON c.customer_id = o.customer_id GROUP BY c.customer_id, c.first_name, c.city HAVING last_order_date < '2024-05-01' OR last_order_date IS NULL ORDER BY last_order_date ASC;"
    },
    {
      "id": 14,
      "prompt": "<strong>Capstone 14: Employee Sales Leaderboard</strong><br/>Calculate total revenue processed by each employee along with their department name. Rank employees using DENSE_RANK() by revenue descending.",
      "referenceSql": "WITH emp_sales AS (SELECT e.employee_id, e.first_name || ' ' || e.last_name AS employee_name, d.name AS department, SUM(o.total_amount) AS revenue FROM employees e INNER JOIN departments d ON e.department_id = d.department_id LEFT JOIN orders o ON e.employee_id = o.employee_id GROUP BY e.employee_id, employee_name, d.name) SELECT employee_name, department, revenue, DENSE_RANK() OVER (ORDER BY revenue DESC) AS rank_pos FROM emp_sales ORDER BY rank_pos ASC;"
    },
    {
      "id": 15,
      "prompt": "<strong>Capstone 15: Pareto 80/20 Revenue Analysis</strong><br/>Compute the cumulative revenue percentage for each product using a running total window function divided by grand total revenue.",
      "referenceSql": "WITH product_revenue AS (SELECT p.name, SUM(oi.qty * oi.price) AS rev FROM order_items oi INNER JOIN products p ON oi.product_id = p.product_id GROUP BY p.product_id, p.name), ranked AS (SELECT name, rev, SUM(rev) OVER (ORDER BY rev DESC ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_rev, (SELECT SUM(qty * price) FROM order_items) AS grand_total FROM product_revenue) SELECT name, rev, ROUND(running_rev * 100.0 / grand_total, 2) AS cumulative_pct FROM ranked ORDER BY rev DESC;"
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
