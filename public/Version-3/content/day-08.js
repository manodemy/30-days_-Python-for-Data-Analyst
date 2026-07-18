// Day 08 — Date & Time Functions
if (!window.COURSE_CONTENT) window.COURSE_CONTENT = {};
window.COURSE_CONTENT['day08'] = {
  "day": 8,
  "title": "Date & Time Functions",
  "db": "retail",
  "emoji": "📅",
  "slides": [
    {
      "title": "Date & Time Functions in SQL",
      "duration": "0:00",
      "html": `
        <h2>📅 Date & Time Functions</h2>

        <div class="slide-section">
          <h3>01. Date Storage in SQL</h3>
          <p>SQL stores dates as a standardised format: <code>YYYY-MM-DD</code> for dates and <code>YYYY-MM-DD HH:MM:SS</code> for datetimes. In SQLite, dates are stored as TEXT strings in ISO format and manipulated using date functions. Understanding this is critical for correct comparisons and arithmetic.</p>

          <div class="info-box">
            ℹ️ <strong>Date formats by engine:</strong> MySQL uses <code>DATE</code> / <code>DATETIME</code> types. PostgreSQL uses <code>DATE</code> / <code>TIMESTAMP</code>. SQLite stores dates as TEXT, REAL, or INTEGER and uses <code>strftime()</code> for all date operations. The retail database stores dates as TEXT in ISO format.
          </div>
        </div>

        <div class="slide-section">
          <h3>02. Getting the Current Date & Time</h3>
          <pre><code>-- SQLite equivalents (ISO standard functions)
SELECT date('now')              AS today,          -- 2026-07-18
       time('now')              AS current_time,   -- 07:35:00
       datetime('now')          AS current_datetime;

-- MySQL / PostgreSQL equivalents (for reference)
-- SELECT NOW(), CURDATE(), CURRENT_DATE, CURRENT_TIMESTAMP;

-- Days since order was placed
SELECT order_id,
       order_date,
       julianday('now') - julianday(order_date) AS days_since_order
FROM   orders;</code></pre>
        </div>

        <div class="slide-section">
          <h3>03. DATEDIFF — Days Between Two Dates</h3>
          <p>In SQLite, use <code>julianday()</code> difference. In MySQL, use <code>DATEDIFF(end, start)</code>. In PostgreSQL, subtract dates directly.</p>

          <pre><code>-- Days between order_date and shipped_date (SQLite)
SELECT order_id,
       order_date,
       shipped_date,
       CAST(julianday(shipped_date) - julianday(order_date) AS INTEGER) AS fulfillment_days
FROM   orders
WHERE  shipped_date IS NOT NULL;

-- Employee tenure in days
SELECT first_name,
       hire_date,
       CAST(julianday('now') - julianday(hire_date) AS INTEGER) AS tenure_days
FROM   employees;</code></pre>
        </div>

        <div class="slide-section">
          <h3>04. DATE_ADD / DATE_SUB — Date Arithmetic</h3>
          <p>In SQLite, use the <code>date(base, modifier)</code> function to add or subtract intervals. MySQL uses <code>DATE_ADD(date, INTERVAL n unit)</code>.</p>

          <pre><code>-- SQLite: Add 30 days to order_date
SELECT order_id,
       order_date,
       date(order_date, '+30 days')  AS delivery_deadline
FROM   orders;

-- SQLite: Subtract 90 days from today (last 90 days filter)
SELECT * FROM orders
WHERE  order_date >= date('now', '-90 days');

-- MySQL reference syntax (for interviews):
-- SELECT DATE_ADD(order_date, INTERVAL 30 DAY) FROM orders;
-- SELECT DATE_SUB(NOW(), INTERVAL 3 MONTH);</code></pre>
        </div>

        <div class="slide-section">
          <h3>05. EXTRACT / strftime — Getting Date Parts</h3>
          <p>Use <code>strftime(format, date)</code> in SQLite or <code>EXTRACT(part FROM date)</code> in PostgreSQL/MySQL to extract year, month, day, etc.</p>

          <pre><code>-- SQLite: Extract year, month, day
SELECT order_id,
       order_date,
       strftime('%Y', order_date)    AS order_year,
       strftime('%m', order_date)    AS order_month,
       strftime('%d', order_date)    AS order_day
FROM   orders;

-- Group orders by year
SELECT strftime('%Y', order_date) AS year,
       COUNT(*)                   AS order_count,
       SUM(total_amount)          AS revenue
FROM   orders
GROUP BY year
ORDER BY year;</code></pre>

          <div class="pro-tip-box">
            💡 <strong>SQLite strftime format codes:</strong> <code>%Y</code> = 4-digit year, <code>%m</code> = 2-digit month (01-12), <code>%d</code> = 2-digit day (01-31), <code>%H</code> = hour (00-23), <code>%M</code> = minute, <code>%w</code> = day of week (0=Sunday).
          </div>
        </div>

        <div class="slide-section">
          <h3>06. DATE_FORMAT — Formatting Dates for Display</h3>
          <pre><code>-- Format hire_date as 'Month DD, YYYY' style
-- SQLite uses strftime for formatting
SELECT first_name,
       strftime('%d-%m-%Y', hire_date) AS formatted_hire_date
FROM   employees;

-- Find employees hired in 2022
SELECT first_name, hire_date
FROM   employees
WHERE  strftime('%Y', hire_date) = '2022';

-- Find orders placed on a specific month
SELECT * FROM orders
WHERE  strftime('%m', order_date) = '12';  -- December orders</code></pre>

          <div class="interview-box">
            <h4>🎯 Interview Insight — Date Functions Across Databases</h4>
            <div>
              <p><strong>Q: How do you calculate the number of days between two dates in MySQL vs PostgreSQL vs SQLite?</strong></p>
              <p><em>A: MySQL: DATEDIFF(end_date, start_date) returns an integer. PostgreSQL: Simply subtract dates: end_date - start_date returns an INTERVAL; use EXTRACT(DAY FROM ...) for a number. SQLite: Use julianday(end) - julianday(start) which returns a floating-point day count. All three are commonly asked in interviews — knowing all three shows database breadth.</em></p>
            </div>
          </div>
        </div>
      `
    }
  ],
  "practiceQuestions": [
    {
      "id": 1,
      "prompt": "<strong>Task: Fulfillment Days</strong><br/>For each shipped order, compute the number of days between <code>order_date</code> and <code>shipped_date</code> as <code>fulfillment_days</code>.",
      "referenceSql": "SELECT order_id, order_date, shipped_date, CAST(julianday(shipped_date) - julianday(order_date) AS INTEGER) AS fulfillment_days FROM orders WHERE shipped_date IS NOT NULL;"
    },
    {
      "id": 2,
      "prompt": "<strong>Task: Employee Tenure</strong><br/>Compute how many days each employee has been employed (from <code>hire_date</code> to today). Show <code>first_name</code>, <code>hire_date</code>, and <code>tenure_days</code>.",
      "referenceSql": "SELECT first_name, hire_date, CAST(julianday('now') - julianday(hire_date) AS INTEGER) AS tenure_days FROM employees;"
    },
    {
      "id": 3,
      "prompt": "<strong>Task: Orders by Year</strong><br/>Group orders by year (extract year from <code>order_date</code>) and count orders and total revenue per year.",
      "referenceSql": "SELECT strftime('%Y', order_date) AS year, COUNT(*) AS order_count, SUM(total_amount) AS revenue FROM orders GROUP BY year ORDER BY year;"
    },
    {
      "id": 4,
      "prompt": "<strong>Task: Delivery Deadline</strong><br/>For each order, compute a <code>delivery_deadline</code> as <code>order_date</code> + 7 days.",
      "referenceSql": "SELECT order_id, order_date, date(order_date, '+7 days') AS delivery_deadline FROM orders;"
    },
    {
      "id": 5,
      "prompt": "<strong>Task: Recent Orders</strong><br/>Find all orders placed in the last 365 days from today.",
      "referenceSql": "SELECT * FROM orders WHERE order_date >= date('now', '-365 days');"
    },
    {
      "id": 6,
      "prompt": "<strong>Task: Monthly Order Report</strong><br/>Group orders by year and month, count orders, and sum revenue. Sort by year and month.",
      "referenceSql": "SELECT strftime('%Y', order_date) AS year, strftime('%m', order_date) AS month, COUNT(*) AS orders, SUM(total_amount) AS revenue FROM orders GROUP BY year, month ORDER BY year, month;"
    }
  ],
  "testQuestions": [
    { "id": 1, "prompt": "Get the current date in SQLite using <code>date('now')</code>.", "ref": "SELECT date('now') AS today;" },
    { "id": 2, "prompt": "Find how many days have passed since each order was placed.", "ref": "SELECT order_id, CAST(julianday('now') - julianday(order_date) AS INTEGER) AS days_ago FROM orders;" },
    { "id": 3, "prompt": "Compute fulfillment days (shipped_date - order_date) for all shipped orders.", "ref": "SELECT order_id, CAST(julianday(shipped_date) - julianday(order_date) AS INTEGER) AS fulfillment_days FROM orders WHERE shipped_date IS NOT NULL;" },
    { "id": 4, "prompt": "Extract the year from each employee's hire_date.", "ref": "SELECT first_name, strftime('%Y', hire_date) AS hire_year FROM employees;" },
    { "id": 5, "prompt": "Extract the month from each order's order_date.", "ref": "SELECT order_id, strftime('%m', order_date) AS month FROM orders;" },
    { "id": 6, "prompt": "Find all employees hired in 2021.", "ref": "SELECT * FROM employees WHERE strftime('%Y', hire_date) = '2021';" },
    { "id": 7, "prompt": "Add 30 days to each order's order_date as a delivery_deadline.", "ref": "SELECT order_id, order_date, date(order_date, '+30 days') AS delivery_deadline FROM orders;" },
    { "id": 8, "prompt": "Find orders placed in the last 180 days.", "ref": "SELECT * FROM orders WHERE order_date >= date('now', '-180 days');" },
    { "id": 9, "prompt": "Find orders placed in December (month = '12').", "ref": "SELECT * FROM orders WHERE strftime('%m', order_date) = '12';" },
    { "id": 10, "prompt": "Calculate employee tenure in years (approximate: days / 365).", "ref": "SELECT first_name, ROUND((julianday('now') - julianday(hire_date)) / 365.0, 1) AS tenure_years FROM employees;" },
    { "id": 11, "prompt": "Count orders placed per month.", "ref": "SELECT strftime('%m', order_date) AS month, COUNT(*) AS order_count FROM orders GROUP BY month;" },
    { "id": 12, "prompt": "Find orders placed before 2024-06-01 and shipped after 2024-06-10.", "ref": "SELECT * FROM orders WHERE order_date < '2024-06-01' AND shipped_date > '2024-06-10';" },
    { "id": 13, "prompt": "Format hire_date as DD-MM-YYYY for all employees.", "ref": "SELECT first_name, strftime('%d-%m-%Y', hire_date) AS formatted_date FROM employees;" },
    { "id": 14, "prompt": "Find employees hired in the first half of the year (months 01-06).", "ref": "SELECT * FROM employees WHERE strftime('%m', hire_date) <= '06';" },
    { "id": 15, "prompt": "Compute a contract expiry date as hire_date + 3 years for all employees.", "ref": "SELECT first_name, hire_date, date(hire_date, '+3 years') AS contract_expiry FROM employees;" },
    { "id": 16, "prompt": "Find orders with fulfillment time more than 5 days.", "ref": "SELECT * FROM orders WHERE shipped_date IS NOT NULL AND CAST(julianday(shipped_date) - julianday(order_date) AS INTEGER) > 5;" },
    { "id": 17, "prompt": "Find total revenue per year from orders.", "ref": "SELECT strftime('%Y', order_date) AS year, SUM(total_amount) AS revenue FROM orders GROUP BY year;" },
    { "id": 18, "prompt": "Find employees who have been employed for more than 3 years.", "ref": "SELECT * FROM employees WHERE julianday('now') - julianday(hire_date) > 3 * 365;" },
    { "id": 19, "prompt": "Count customers who signed up per year.", "ref": "SELECT strftime('%Y', signup_date) AS year, COUNT(*) AS signups FROM customers GROUP BY year;" },
    { "id": 20, "prompt": "Find orders placed on weekends (day of week 0=Sunday, 6=Saturday).", "ref": "SELECT * FROM orders WHERE strftime('%w', order_date) IN ('0', '6');" },
    { "id": 21, "prompt": "Compute the number of days between customer signup_date and today.", "ref": "SELECT first_name, CAST(julianday('now') - julianday(signup_date) AS INTEGER) AS days_since_signup FROM customers;" },
    { "id": 22, "prompt": "Find the month with the highest total revenue from orders.", "ref": "SELECT strftime('%m', order_date) AS month, SUM(total_amount) AS revenue FROM orders GROUP BY month ORDER BY revenue DESC LIMIT 1;" },
    { "id": 23, "prompt": "Find orders placed between 2024-10-01 and 2024-12-31.", "ref": "SELECT * FROM orders WHERE order_date BETWEEN '2024-10-01' AND '2024-12-31';" },
    { "id": 24, "prompt": "Find employees hired in Q1 (Jan, Feb, Mar) of any year.", "ref": "SELECT * FROM employees WHERE strftime('%m', hire_date) IN ('01', '02', '03');" },
    { "id": 25, "prompt": "Compute average fulfillment days across all shipped orders.", "ref": "SELECT ROUND(AVG(julianday(shipped_date) - julianday(order_date)), 1) AS avg_fulfillment_days FROM orders WHERE shipped_date IS NOT NULL;" }
  ],
  "topics": [
    { "id": "topic-1", "label": "Topic 1: Date & Time Functions", "recordingKey": null }
  ]
};
