// Day 09 — CASE & Conditional Logic
if (!window.COURSE_CONTENT) window.COURSE_CONTENT = {};
window.COURSE_CONTENT['day09'] = {
  "day": 9,
  "title": "CASE & Conditional Logic",
  "db": "retail",
  "emoji": "🔀",
  "slides": [
    {
      "title": "CASE & Conditional Logic in SQL",
      "duration": "0:00",
      "html": `
        <h2>🔀 CASE & Conditional Logic</h2>

        <div class="slide-section">
          <h3>01. The CASE Expression</h3>
          <p>The <code>CASE</code> expression is SQL's conditional logic construct — equivalent to an if-else or switch statement. It returns a value based on which condition is true first. It can appear in <code>SELECT</code>, <code>WHERE</code>, <code>ORDER BY</code>, and <code>GROUP BY</code>.</p>

          <div class="vs-block">
            <div class="vs-card">
              <h4>Searched CASE (most common)</h4>
              <pre><code>CASE
  WHEN condition1 THEN result1
  WHEN condition2 THEN result2
  ...
  ELSE default_result
END</code></pre>
            </div>
            <div class="vs-card">
              <h4>Simple CASE</h4>
              <pre><code>CASE expression
  WHEN value1 THEN result1
  WHEN value2 THEN result2
  ...
  ELSE default_result
END</code></pre>
            </div>
          </div>
        </div>

        <div class="slide-section">
          <h3>02. Searched CASE — Multi-Condition Logic</h3>
          <pre><code>-- Categorise employees by salary band
SELECT first_name,
       salary,
       CASE
         WHEN salary >= 100000 THEN 'Executive'
         WHEN salary >= 75000  THEN 'Senior'
         WHEN salary >= 50000  THEN 'Mid-Level'
         ELSE                       'Junior'
       END AS salary_band
FROM   employees;

-- Categorise products by stock level
SELECT name,
       stock_qty,
       CASE
         WHEN stock_qty = 0      THEN 'Out of Stock'
         WHEN stock_qty < 10     THEN 'Critical'
         WHEN stock_qty < 30     THEN 'Low'
         ELSE                         'Adequate'
       END AS stock_status
FROM   products;</code></pre>

          <div class="info-box">
            ℹ️ <strong>Evaluation Order:</strong> CASE evaluates WHEN clauses top-to-bottom and returns the first match. Once matched, subsequent WHENs are not evaluated. Always put the most specific (or most restrictive) conditions first.
          </div>
        </div>

        <div class="slide-section">
          <h3>03. Simple CASE — Value Matching</h3>
          <pre><code>-- Map status codes to readable labels
SELECT order_id,
       CASE status
         WHEN 'Shipped'    THEN 'Dispatched ✓'
         WHEN 'Processing' THEN 'In Progress ⏳'
         WHEN 'Cancelled'  THEN 'Cancelled ✗'
         ELSE                   'Unknown'
       END AS status_label
FROM   orders;

-- Map department_id to department name
SELECT first_name,
       department_id,
       CASE department_id
         WHEN 10 THEN 'Engineering'
         WHEN 20 THEN 'Data Science'
         WHEN 30 THEN 'Marketing'
         ELSE 'Other'
       END AS department_name
FROM   employees;</code></pre>
        </div>

        <div class="slide-section">
          <h3>04. CASE in Aggregates — Conditional Counting</h3>
          <p>One of the most powerful uses of CASE is inside aggregate functions to create <strong>conditional counts or sums</strong> (pivot-like behaviour) — effectively <code>COUNT(IF ...)</code>.</p>

          <pre><code>-- Count active and inactive employees per department in one query
SELECT department_id,
       COUNT(*) AS total,
       SUM(CASE WHEN is_active = 1 THEN 1 ELSE 0 END) AS active_count,
       SUM(CASE WHEN is_active = 0 THEN 1 ELSE 0 END) AS inactive_count
FROM   employees
GROUP BY department_id;

-- Revenue by order status in a single row
SELECT
  SUM(CASE WHEN status = 'Shipped'    THEN total_amount ELSE 0 END) AS shipped_revenue,
  SUM(CASE WHEN status = 'Processing' THEN total_amount ELSE 0 END) AS processing_revenue,
  SUM(CASE WHEN status = 'Cancelled'  THEN total_amount ELSE 0 END) AS cancelled_revenue
FROM   orders;</code></pre>

          <div class="pro-tip-box">
            💡 <strong>Pro Tip — Conditional Counting Pattern:</strong> <code>SUM(CASE WHEN condition THEN 1 ELSE 0 END)</code> is equivalent to <code>COUNT(CASE WHEN condition THEN 1 END)</code> (since COUNT ignores NULLs). Both are widely used in data analytics for pivot-style aggregations.
          </div>
        </div>

        <div class="slide-section">
          <h3>05. CASE in ORDER BY — Custom Sort Orders</h3>
          <pre><code>-- Sort orders: Cancelled last, Processing first, Shipped second
SELECT order_id, status, total_amount
FROM   orders
ORDER BY
  CASE status
    WHEN 'Processing' THEN 1
    WHEN 'Shipped'    THEN 2
    WHEN 'Cancelled'  THEN 3
    ELSE 4
  END;

-- Sort employees: Executives first, then Seniors, then others
SELECT first_name, salary
FROM   employees
ORDER BY
  CASE
    WHEN salary >= 100000 THEN 1
    WHEN salary >= 75000  THEN 2
    ELSE 3
  END, salary DESC;</code></pre>
        </div>

        <div class="slide-section">
          <h3>06. COALESCE and NULLIF</h3>

          <div class="vs-block">
            <div class="vs-card">
              <h4>COALESCE — First Non-NULL</h4>
              <p>Returns the first non-NULL value in its argument list. Ideal for providing fallback defaults.</p>
              <pre><code>-- Use 0 if commission is NULL
SELECT first_name,
  COALESCE(commission, 0) AS commission
FROM employees;

-- Chain multiple fallbacks
SELECT COALESCE(phone, email, 'No contact') 
FROM customers;</code></pre>
            </div>
            <div class="vs-card">
              <h4>NULLIF — Return NULL on Match</h4>
              <p>Returns NULL if both arguments are equal; otherwise returns the first argument. Useful for preventing division by zero.</p>
              <pre><code>-- Avoid division by zero
SELECT order_id,
  total_amount / NULLIF(qty, 0) AS unit_price
FROM order_items;

-- Return NULL if salary equals min salary
SELECT NULLIF(salary, 45000)
FROM employees;</code></pre>
            </div>
          </div>

          <div class="interview-box">
            <h4>🎯 Interview Insight</h4>
            <div>
              <p><strong>Q: How would you count how many rows satisfy a condition without WHERE?</strong></p>
              <p><em>A: Use a conditional SUM or COUNT with CASE: SUM(CASE WHEN condition THEN 1 ELSE 0 END) or COUNT(CASE WHEN condition THEN 1 END). This technique enables computing multiple conditional counts in a single pass over the table — far more efficient than multiple subqueries.</em></p>
            </div>
          </div>
        </div>
      `
    }
  ],
  "practiceQuestions": [
    {
      "id": 1,
      "prompt": "<strong>Task: Salary Band</strong><br/>Categorise employees into 'Executive' (>=100000), 'Senior' (>=75000), 'Mid-Level' (>=50000), or 'Junior' using a CASE expression.",
      "referenceSql": "SELECT first_name, salary, CASE WHEN salary >= 100000 THEN 'Executive' WHEN salary >= 75000 THEN 'Senior' WHEN salary >= 50000 THEN 'Mid-Level' ELSE 'Junior' END AS salary_band FROM employees;"
    },
    {
      "id": 2,
      "prompt": "<strong>Task: Order Status Labels</strong><br/>Map <code>status</code> column values to friendlier labels: 'Shipped' → 'Dispatched', 'Processing' → 'In Progress', 'Cancelled' → 'Cancelled ✗'.",
      "referenceSql": "SELECT order_id, CASE status WHEN 'Shipped' THEN 'Dispatched' WHEN 'Processing' THEN 'In Progress' WHEN 'Cancelled' THEN 'Cancelled X' ELSE 'Unknown' END AS status_label FROM orders;"
    },
    {
      "id": 3,
      "prompt": "<strong>Task: Stock Status</strong><br/>Label each product's stock: 'Out of Stock' (qty=0), 'Critical' (<10), 'Low' (<30), or 'Adequate' (all others).",
      "referenceSql": "SELECT name, stock_qty, CASE WHEN stock_qty = 0 THEN 'Out of Stock' WHEN stock_qty < 10 THEN 'Critical' WHEN stock_qty < 30 THEN 'Low' ELSE 'Adequate' END AS stock_status FROM products;"
    },
    {
      "id": 4,
      "prompt": "<strong>Task: Conditional Count</strong><br/>Count active and inactive employees per department in a single query using CASE inside SUM.",
      "referenceSql": "SELECT department_id, SUM(CASE WHEN is_active = 1 THEN 1 ELSE 0 END) AS active_count, SUM(CASE WHEN is_active = 0 THEN 1 ELSE 0 END) AS inactive_count FROM employees GROUP BY department_id;"
    },
    {
      "id": 5,
      "prompt": "<strong>Task: Revenue Pivot</strong><br/>Show total revenue split by order status (Shipped, Processing, Cancelled) in a single row using CASE inside SUM.",
      "referenceSql": "SELECT SUM(CASE WHEN status = 'Shipped' THEN total_amount ELSE 0 END) AS shipped_revenue, SUM(CASE WHEN status = 'Processing' THEN total_amount ELSE 0 END) AS processing_revenue, SUM(CASE WHEN status = 'Cancelled' THEN total_amount ELSE 0 END) AS cancelled_revenue FROM orders;"
    },
    {
      "id": 6,
      "prompt": "<strong>Task: COALESCE Fallback</strong><br/>Retrieve <code>first_name</code> and <code>total_comp</code> where total_comp = salary + COALESCE(commission, 0). Sort by total_comp descending.",
      "referenceSql": "SELECT first_name, salary + COALESCE(commission, 0) AS total_comp FROM employees ORDER BY total_comp DESC;"
    }
  ],
  "testQuestions": [
    { "id": 1, "prompt": "Label employees as 'High' if salary > 80000, else 'Standard'.", "ref": "SELECT first_name, CASE WHEN salary > 80000 THEN 'High' ELSE 'Standard' END AS pay_grade FROM employees;" },
    { "id": 2, "prompt": "Map order status to numeric priority: Cancelled=1, Processing=2, Shipped=3.", "ref": "SELECT order_id, CASE status WHEN 'Cancelled' THEN 1 WHEN 'Processing' THEN 2 WHEN 'Shipped' THEN 3 END AS priority FROM orders;" },
    { "id": 3, "prompt": "Categorise products into 'Premium' (price>10000), 'Mid' (>3000), or 'Budget'.", "ref": "SELECT name, CASE WHEN unit_price > 10000 THEN 'Premium' WHEN unit_price > 3000 THEN 'Mid' ELSE 'Budget' END AS tier FROM products;" },
    { "id": 4, "prompt": "Count employees per salary band (Executive, Senior, Mid-Level, Junior) across the whole company.", "ref": "SELECT CASE WHEN salary >= 100000 THEN 'Executive' WHEN salary >= 75000 THEN 'Senior' WHEN salary >= 50000 THEN 'Mid-Level' ELSE 'Junior' END AS band, COUNT(*) AS cnt FROM employees GROUP BY band;" },
    { "id": 5, "prompt": "Use COALESCE to replace NULL commission with 0 for all employees.", "ref": "SELECT first_name, COALESCE(commission, 0) AS commission FROM employees;" },
    { "id": 6, "prompt": "Use NULLIF to return NULL when stock_qty equals 0 (to avoid zero division in a price-per-unit calc).", "ref": "SELECT name, unit_price / NULLIF(stock_qty, 0) AS price_per_unit FROM products;" },
    { "id": 7, "prompt": "Compute a 'loyalty_tier': Customers who signed up before 2022 = 'Gold', before 2024 = 'Silver', else 'Bronze'.", "ref": "SELECT first_name, CASE WHEN signup_date < '2022-01-01' THEN 'Gold' WHEN signup_date < '2024-01-01' THEN 'Silver' ELSE 'Bronze' END AS loyalty_tier FROM customers;" },
    { "id": 8, "prompt": "Count shipped and non-shipped orders using CASE inside SUM.", "ref": "SELECT SUM(CASE WHEN status = 'Shipped' THEN 1 ELSE 0 END) AS shipped, SUM(CASE WHEN status != 'Shipped' THEN 1 ELSE 0 END) AS not_shipped FROM orders;" },
    { "id": 9, "prompt": "Sort orders: Cancelled first, Processing second, Shipped last using CASE in ORDER BY.", "ref": "SELECT * FROM orders ORDER BY CASE status WHEN 'Cancelled' THEN 1 WHEN 'Processing' THEN 2 WHEN 'Shipped' THEN 3 END;" },
    { "id": 10, "prompt": "Label each employee as 'Manager' if job_title contains 'Manager', else 'Individual Contributor'.", "ref": "SELECT first_name, job_title, CASE WHEN job_title LIKE '%Manager%' THEN 'Manager' ELSE 'Individual Contributor' END AS role_type FROM employees;" },
    { "id": 11, "prompt": "Count products per stock status (Out of Stock, Critical, Low, Adequate).", "ref": "SELECT CASE WHEN stock_qty=0 THEN 'Out of Stock' WHEN stock_qty<10 THEN 'Critical' WHEN stock_qty<30 THEN 'Low' ELSE 'Adequate' END AS status, COUNT(*) AS cnt FROM products GROUP BY status;" },
    { "id": 12, "prompt": "Compute total commission paid, treating NULLs as 0.", "ref": "SELECT SUM(COALESCE(commission, 0)) AS total_commission FROM employees;" },
    { "id": 13, "prompt": "Show 'Active' or 'Inactive' for each employee based on is_active flag.", "ref": "SELECT first_name, CASE WHEN is_active = 1 THEN 'Active' ELSE 'Inactive' END AS status FROM employees;" },
    { "id": 14, "prompt": "Find revenue per order size category: 'Large' (>50000), 'Medium' (>10000), 'Small' (rest).", "ref": "SELECT CASE WHEN total_amount > 50000 THEN 'Large' WHEN total_amount > 10000 THEN 'Medium' ELSE 'Small' END AS order_size, SUM(total_amount) AS revenue FROM orders GROUP BY order_size;" },
    { "id": 15, "prompt": "Use CASE to show 'Has Commission' or 'No Commission' for each employee.", "ref": "SELECT first_name, CASE WHEN commission IS NOT NULL THEN 'Has Commission' ELSE 'No Commission' END AS commission_status FROM employees;" },
    { "id": 16, "prompt": "Compute average salary per salary band (Executive, Senior, Mid-Level, Junior).", "ref": "SELECT CASE WHEN salary>=100000 THEN 'Executive' WHEN salary>=75000 THEN 'Senior' WHEN salary>=50000 THEN 'Mid-Level' ELSE 'Junior' END AS band, AVG(salary) AS avg_sal FROM employees GROUP BY band;" },
    { "id": 17, "prompt": "Flag products where stock_value (stock_qty * unit_price) exceeds 500000 as 'High Value Inventory'.", "ref": "SELECT name, CASE WHEN stock_qty * unit_price > 500000 THEN 'High Value Inventory' ELSE 'Normal' END AS inventory_flag FROM products;" },
    { "id": 18, "prompt": "Return employee total_comp = salary + COALESCE(commission,0), flagged 'Above Target' if total_comp > 100000.", "ref": "SELECT first_name, salary + COALESCE(commission,0) AS total_comp, CASE WHEN salary + COALESCE(commission,0) > 100000 THEN 'Above Target' ELSE 'Below Target' END AS flag FROM employees;" },
    { "id": 19, "prompt": "Map region to a region code: 'North'='N', 'South'='S', 'East'='E', 'West'='W', else 'X'.", "ref": "SELECT first_name, CASE region WHEN 'North' THEN 'N' WHEN 'South' THEN 'S' WHEN 'East' THEN 'E' WHEN 'West' THEN 'W' ELSE 'X' END AS region_code FROM customers;" },
    { "id": 20, "prompt": "Show count of orders per year with a 'Good Year' flag (revenue > 100000) using CASE in HAVING context.", "ref": "SELECT strftime('%Y', order_date) AS year, SUM(total_amount) AS rev, CASE WHEN SUM(total_amount) > 100000 THEN 'Good Year' ELSE 'Moderate' END AS yr_flag FROM orders GROUP BY year;" },
    { "id": 21, "prompt": "Compute a discount: 20% if premium product (price > 10000), 10% if mid (>3000), 5% otherwise.", "ref": "SELECT name, unit_price, CASE WHEN unit_price>10000 THEN unit_price*0.8 WHEN unit_price>3000 THEN unit_price*0.9 ELSE unit_price*0.95 END AS discounted_price FROM products;" },
    { "id": 22, "prompt": "Count orders per customer: label customers as 'Frequent' (>=3 orders) or 'Occasional'.", "ref": "SELECT customer_id, COUNT(*) AS order_cnt, CASE WHEN COUNT(*) >= 3 THEN 'Frequent' ELSE 'Occasional' END AS customer_type FROM orders GROUP BY customer_id;" },
    { "id": 23, "prompt": "Show product name and 'In Season' / 'Clearance' based on stock_qty > 50.", "ref": "SELECT name, CASE WHEN stock_qty > 50 THEN 'In Season' ELSE 'Clearance' END AS season_flag FROM products;" },
    { "id": 24, "prompt": "Show employees with salary_after_raise: 10% raise for Executives, 5% for Seniors, 2% for rest.", "ref": "SELECT first_name, salary, CASE WHEN salary>=100000 THEN salary*1.1 WHEN salary>=75000 THEN salary*1.05 ELSE salary*1.02 END AS salary_after_raise FROM employees;" },
    { "id": 25, "prompt": "Produce a report showing number of 'On-Time' (fulfillment <= 3 days) and 'Delayed' (> 3 days) shipments.", "ref": "SELECT SUM(CASE WHEN CAST(julianday(shipped_date)-julianday(order_date) AS INTEGER) <= 3 THEN 1 ELSE 0 END) AS on_time, SUM(CASE WHEN CAST(julianday(shipped_date)-julianday(order_date) AS INTEGER) > 3 THEN 1 ELSE 0 END) AS delayed FROM orders WHERE shipped_date IS NOT NULL;" }
  ],
  "topics": [
    { "id": "topic-1", "label": "Topic 1: CASE, COALESCE & Conditional Logic", "recordingKey": null }
  ]
};
