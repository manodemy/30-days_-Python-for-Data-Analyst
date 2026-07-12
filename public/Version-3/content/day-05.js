// Day 05 Content
if (!window.COURSE_CONTENT) window.COURSE_CONTENT = {};
window.COURSE_CONTENT['day05'] = {
  "day": 5,
  "title": "Aggregate Functions",
  "db": "retail",
  "emoji": "📊",
  "slides": [
    {
      "title": "Topic 01: Core Aggregate Functions",
      "duration": "0:00",
      "html": `
        <h2>📊 01. What are Aggregate Functions?</h2>
        <div class="slide-section">
          <p>Aggregate functions take <strong>multiple values</strong> from a column across a group of rows and calculate a <strong>single summary result</strong>:</p>
          
          <div class="rdbms-intro-section" id="coreAggregatesConcepts">
            <h3 style="margin-top: 0;">Standard SQL Aggregate Functions</h3>
            <table style="width: 100%; border-collapse: collapse; margin-top: 8px;">
              <thead>
                <tr style="border-bottom: 2px solid #e2e8f0; text-align: left;">
                  <th style="padding: 6px 8px; font-size: 0.8rem; font-weight: 700;">Function</th>
                  <th style="padding: 6px 8px; font-size: 0.8rem; font-weight: 700;">Description</th>
                  <th style="padding: 6px 8px; font-size: 0.8rem; font-weight: 700;">Data Type compatibility</th>
                </tr>
              </thead>
              <tbody>
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 6px 8px;"><code>SUM(col)</code></td>
                  <td style="padding: 6px 8px;">Calculates the arithmetic total.</td>
                  <td style="padding: 6px 8px;">Numeric only.</td>
                </tr>
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 6px 8px;"><code>AVG(col)</code></td>
                  <td style="padding: 6px 8px;">Calculates the arithmetic mean.</td>
                  <td style="padding: 6px 8px;">Numeric only.</td>
                </tr>
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 6px 8px;"><code>MIN(col)</code> / <code>MAX(col)</code></td>
                  <td style="padding: 6px 8px;">Finds smallest and largest values.</td>
                  <td style="padding: 6px 8px;">Numeric, Date, and Text.</td>
                </tr>
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="padding: 6px 8px;"><code>COUNT(col)</code></td>
                  <td style="padding: 6px 8px;">Counts matching rows.</td>
                  <td style="padding: 6px 8px;">Any data type.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="slide-section">
          <div class="vs-block">
            <div class="vs-card vs-card--good">
              <h4>🎯 Global Aggregates</h4>
              <p>Calculate metrics across the entire table. Output collapses to a single row:</p>
              <pre>SELECT
  COUNT(*) AS total_employees,
  SUM(salary) AS total_payroll,
  MIN(salary) AS lowest_salary,
  MAX(salary) AS highest_salary
FROM employees;</pre>
            </div>
            <div class="vs-card vs-card--good">
              <h4>📅 Non-Numeric Aggregations</h4>
              <p>MIN and MAX are fully supported on date/time and text columns:</p>
              <pre>-- Earliest and latest hire dates
SELECT 
  MIN(hire_date) AS earliest_hire,
  MAX(hire_date) AS most_recent_hire
FROM employees;

-- Alphabetical first and last names
SELECT MIN(last_name), MAX(last_name)
FROM employees;</pre>
            </div>
          </div>
        </div>

        <div class="slide-section">
          <div class="pro-tip-box" id="aggregatesPhaseExplanation">
            <strong>💡 Execution Sequence Check:</strong> Aggregates operate on Step 6 (<code>SELECT</code>). Because the <code>WHERE</code> filter (Step 3) executes first, the aggregate function only processes rows that satisfy the filter. You cannot use aggregates inside a WHERE clause (e.g., <code>WHERE salary > AVG(salary)</code> yields an error).
          </div>
        </div>

        <div class="slide-section">
          <div class="interview-box">
            <h4 style="margin: 0; margin-bottom: 12px;">🎓 Interview Q&amp;A</h4>
            <div>
              <p style="margin: 0; margin-bottom: 4px;"><strong>Q: What is the logical difference between aggregate functions and scalar functions?</strong></p>
              <p><em>A: Scalar functions (like <code>ROUND()</code>, <code>LOWER()</code>, or <code>UPPER()</code>) operate on values from a single row and return a separate calculated result for every row. Aggregate functions (like <code>SUM()</code> or <code>AVG()</code>) operate on values across multiple rows and collapse them to return a single, summarized value.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />
            <div>
              <p style="margin: 0; margin-bottom: 4px;"><strong>Q: Why does the query <code>SELECT name, MAX(salary) FROM employees;</code> throw a compilation error in standard SQL?</strong></p>
              <p><em>A: Because <code>MAX(salary)</code> collapses the entire dataset into a single row, whereas <code>name</code> represents individual values for all 500 rows. A query cannot display both single collapsed metrics and multiple uncollapsed rows simultaneously. To resolve this, you must either group by name using <code>GROUP BY name</code> or use Window functions.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />
            <div>
              <p style="margin: 0; margin-bottom: 4px;"><strong>Q: How do aggregate functions handle NULL values in standard SQL?</strong></p>
              <p><em>A: All standard aggregate functions (SUM, AVG, MIN, MAX, and COUNT of a specific column) ignore NULL values entirely when performing their calculations. The only exception is <code>COUNT(*)</code>, which counts rows regardless of column values (including rows where columns are NULL).</em></p>
            </div>
          </div>
        </div>
      `
    },
    {
      "title": "Topic 02: COUNT & AVG Nuances",
      "duration": "0:00",
      "html": `
        <h2>📊 02. COUNT &amp; AVG Nuances</h2>
        <div class="slide-section">
          <p>NULL values require careful handling during counts and averages. Standard aggregates exclude NULL values by default, which can lead to calculation errors:</p>
          
          <div class="vs-block">
            <div class="vs-card vs-card--bad">
              <h4>❌ The AVG Denominator Trap</h4>
              <p>AVG ignores NULLs. If 2 out of 10 sales commissions are NULL, the average divides by 8 rows instead of 10:</p>
              <pre>-- Excludes NULL rows from count
-- (Divides only by non-NULL rows)
SELECT AVG(commission) 
FROM employees;

-- COUNT(col) also ignores NULL values:
SELECT COUNT(commission) 
FROM employees; -- Returns 8</pre>
            </div>
            <div class="vs-card vs-card--good">
              <h4>✅ Correct NULL-Safe Averages</h4>
              <p>To include all rows (treating NULL commission as zero), use the <code>COALESCE</code> function to pre-clean the values:</p>
              <pre>-- Safe average (divides by total rows = 10)
SELECT AVG(COALESCE(commission, 0)) 
FROM employees;

-- COUNT(*) includes NULL rows:
SELECT COUNT(*) 
FROM employees; -- Returns 10</pre>
            </div>
          </div>
        </div>

        <div class="slide-section">
          <div class="info-box" id="countStarVsCountOne">
            <strong>🧠 COUNT(*) vs COUNT(1) Performance:</strong> There is zero performance difference between <code>COUNT(*)</code> and <code>COUNT(1)</code> in modern database systems (PostgreSQL, MySQL, SQL Server). Query compilers recognize both patterns and generate the exact same optimized internal execution plans. Use <code>COUNT(*)</code> for clean, standard-compliant code.
          </div>
        </div>

        <div class="slide-section">
          <div class="interview-box">
            <h4 style="margin: 0; margin-bottom: 12px;">🎓 Interview Q&amp;A</h4>
            <div>
              <p style="margin: 0; margin-bottom: 4px;"><strong>Q: If a table has 100 rows, and 10 of those rows have a NULL commission, what will <code>COUNT(*)</code> and <code>COUNT(commission)</code> return?</strong></p>
              <p><em>A: <code>COUNT(*)</code> counts every row in the table, so it will return 100. <code>COUNT(commission)</code> evaluates only the values in the commission column and ignores NULLs, so it will return 90.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />
            <div>
              <p style="margin: 0; margin-bottom: 4px;"><strong>Q: How does the presence of NULL values affect the output of the <code>AVG()</code> function, and how do you calculate a zero-padded average?</strong></p>
              <p><em>A: The <code>AVG()</code> function ignores NULL values, calculating the average as <code>SUM(column) / COUNT(column)</code>. This ignores NULL rows, skewing the result higher. To calculate a zero-padded average (dividing by the total row count), you wrap the column in <code>COALESCE</code>: <code>AVG(COALESCE(column, 0))</code>.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />
            <div>
              <p style="margin: 0; margin-bottom: 4px;"><strong>Q: Why does <code>COUNT(DISTINCT column_name)</code> return a count of unique values that excludes NULL?</strong></p>
              <p><em>A: By SQL standards, all aggregate functions ignore NULL values before processing. Therefore, <code>COUNT(DISTINCT column_name)</code> first discards any NULLs, then dedupes the remaining non-NULL values, returning only the count of unique values.</em></p>
            </div>
          </div>
        </div>
      `
    },
    {
      "title": "Topic 03: Filtering & Formatting Aggregates",
      "duration": "0:00",
      "html": `
        <h2>⚙️ 03. Filtering &amp; Formatting Aggregates</h2>
        <div class="slide-section">
          <p>Aggregates can be filtered using the <code>WHERE</code> clause (which processes *before* values are aggregated) and formatted using SQL scalar rounding functions:</p>
          
          <div class="vs-block">
            <div class="vs-card vs-card--good">
              <h4>🎯 Aggregates with WHERE</h4>
              <p>Filter rows first, then perform aggregate calculations on the subset of data:</p>
              <pre>-- Aggregates only for department 3
SELECT
  COUNT(*) AS dept3_headcount,
  AVG(salary) AS dept3_avg_salary
FROM employees
WHERE department_id = 3;</pre>
            </div>
            <div class="vs-card vs-card--good">
              <h4>🛠️ Formatting &amp; Concatenation</h4>
              <p>Round floating averages to decimal points, and aggregate text fields into string arrays:</p>
              <pre>-- Round average to 2 decimal places
SELECT ROUND(AVG(salary), 2) AS avg_sal
FROM employees;

-- PostgreSQL: merge names into a string list
SELECT STRING_AGG(first_name, ', ' ORDER BY first_name)
FROM employees
WHERE department_id = 3;</pre>
            </div>
          </div>
        </div>

        <div class="slide-section">
          <div class="warn-box" id="nestedAggregatesTrap">
            <strong>⚠️ The Nested Aggregation Trap:</strong> You cannot nest aggregate functions directly in a single SELECT pass (e.g. <code>AVG(SUM(salary))</code> is invalid). If you need to calculate the average of department totals, you must write a subquery or a Common Table Expression (CTE) first.
          </div>
        </div>

        <div class="slide-section">
          <div class="interview-box">
            <h4 style="margin: 0; margin-bottom: 12px;">🎓 Interview Q&amp;A</h4>
            <div>
              <p style="margin: 0; margin-bottom: 4px;"><strong>Q: Can you write a query like <code>SELECT * FROM employees WHERE salary > AVG(salary);</code>? Explain why or why not.</strong></p>
              <p><em>A: No, this throws an error. The WHERE clause executes *before* the SELECT phase where aggregates are calculated. At the time the WHERE clause filters rows, the overall average salary is not yet computed. To filter by aggregate values, you must use a subquery: <code>WHERE salary > (SELECT AVG(salary) FROM employees)</code>.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />
            <div>
              <p style="margin: 0; margin-bottom: 4px;"><strong>Q: What is string aggregation and how does its implementation vary between PostgreSQL and MySQL?</strong></p>
              <p><em>A: String aggregation collapses multiple text rows into a single string separated by a delimiter. In PostgreSQL, you use <code>STRING_AGG(column, delimiter [ORDER BY])</code>. In MySQL, the equivalent is the <code>GROUP_CONCAT(column [ORDER BY] SEPARATOR delimiter)</code> function.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />
            <div>
              <p style="margin: 0; margin-bottom: 4px;"><strong>Q: Why is nesting aggregate functions (e.g., <code>AVG(SUM(revenue))</code>) prohibited in a single query level?</strong></p>
              <p><em>A: An aggregate function summarizes a column across a group of rows. Nesting them is logically ambiguous at a single query level because SQL aggregates are calculated once per row group. To calculate the average of a sum, you must structure the sum in a CTE or subquery first, then compute the average in the outer query.</em></p>
            </div>
          </div>
        </div>
      `
    }
  ],
  "practiceQuestions": [
    {
      "id": 1,
      "prompt": "Find the total number of employees in the company.",
      "referenceSql": "SELECT COUNT(*) FROM employees;"
    },
    {
      "id": 2,
      "prompt": "Find the average salary and total salary of all active employees.",
      "referenceSql": "SELECT AVG(salary), SUM(salary) FROM employees WHERE is_active = 1;"
    },
    {
      "id": 3,
      "prompt": "Find the minimum and maximum unit_price of products in category_id 1.",
      "referenceSql": "SELECT MIN(unit_price), MAX(unit_price) FROM products WHERE category_id = 1;"
    },
    {
      "id": 4,
      "prompt": "<strong>Practice Task: Total Active Users</strong><br/>Find the total number of customers signed up in region 'North'.",
      "referenceSql": "SELECT COUNT(*) FROM customers WHERE region = 'North';"
    },
    {
      "id": 5,
      "prompt": "<strong>Practice Task: Category Inventory Valuation</strong><br/>Calculate the total inventory value (stock_qty * unit_price) for all products.",
      "referenceSql": "SELECT SUM(stock_qty * unit_price) AS total_inventory_value FROM products;"
    },
    {
      "id": 6,
      "prompt": "<strong>Practice Task: Salary Distribution metrics</strong><br/>Retrieve average salary, min salary, and max salary for Data Analysts.",
      "referenceSql": "SELECT AVG(salary) AS avg_sal, MIN(salary) AS min_sal, MAX(salary) AS max_sal FROM employees WHERE job_title = 'Data Analyst';"
    }
  ],
  "testQuestions": [
    {
      "id": 1,
      "prompt": "Retrieve the total count of employees and their average salary.",
      "ref": "SELECT COUNT(*) AS total_count, AVG(salary) AS avg_sal FROM employees;"
    },
    {
      "id": 2,
      "prompt": "Find the total payroll (SUM of salary) of active employees (is_active = 1).",
      "ref": "SELECT SUM(salary) AS total_payroll FROM employees WHERE is_active = 1;"
    },
    {
      "id": 3,
      "prompt": "Find the minimum and maximum salary values from the employees table.",
      "ref": "SELECT MIN(salary) AS min_sal, MAX(salary) AS max_sal FROM employees;"
    },
    {
      "id": 4,
      "prompt": "Find the total number of products in category_id 3.",
      "ref": "SELECT COUNT(*) FROM products WHERE category_id = 3;"
    },
    {
      "id": 5,
      "prompt": "Calculate the average unit_price of products rounded to 2 decimal places.",
      "ref": "SELECT ROUND(AVG(unit_price), 2) AS avg_price FROM products;"
    },
    {
      "id": 6,
      "prompt": "Count the number of active employees who receive a commission (commission is NOT NULL).",
      "ref": "SELECT COUNT(commission) FROM employees WHERE is_active = 1;"
    },
    {
      "id": 7,
      "prompt": "Find the earliest hire_date and the most recent hire_date from employees.",
      "ref": "SELECT MIN(hire_date) AS earliest, MAX(hire_date) AS latest FROM employees;"
    },
    {
      "id": 8,
      "prompt": "Count the unique category IDs in the products table.",
      "ref": "SELECT COUNT(DISTINCT category_id) FROM products;"
    },
    {
      "id": 9,
      "prompt": "Find the average salary of employees in department_id 5.",
      "ref": "SELECT AVG(salary) AS avg_sal FROM employees WHERE department_id = 5;"
    },
    {
      "id": 10,
      "prompt": "Calculate the sum of all orders total_amount placed in 2024.",
      "ref": "SELECT SUM(total_amount) AS total_sales FROM orders WHERE order_date >= '2024-01-01' AND order_date < '2025-01-01';"
    },
    {
      "id": 11,
      "prompt": "Find the maximum unit_price of products whose stock_qty > 50.",
      "ref": "SELECT MAX(unit_price) FROM products WHERE stock_qty > 50;"
    },
    {
      "id": 12,
      "prompt": "Find the total number of customers in the region 'East'.",
      "ref": "SELECT COUNT(*) FROM customers WHERE region = 'East';"
    },
    {
      "id": 13,
      "prompt": "Calculate the average commission of all employees, treating NULL commission as 0.",
      "ref": "SELECT AVG(COALESCE(commission, 0)) AS avg_comm FROM employees;"
    },
    {
      "id": 14,
      "prompt": "Retrieve the count of distinct job titles among active employees.",
      "ref": "SELECT COUNT(DISTINCT job_title) FROM employees WHERE is_active = 1;"
    },
    {
      "id": 15,
      "prompt": "Find the total stock quantity of all products in the database.",
      "ref": "SELECT SUM(stock_qty) AS total_stock FROM products;"
    },
    {
      "id": 16,
      "prompt": "Find the minimum unit_price in category_id 2.",
      "ref": "SELECT MIN(unit_price) FROM products WHERE category_id = 2;"
    },
    {
      "id": 17,
      "prompt": "Find the total count of customers who have a non-NULL region.",
      "ref": "SELECT COUNT(region) FROM customers;"
    },
    {
      "id": 18,
      "prompt": "Find the total sum of commission paid to employees in department_id 3.",
      "ref": "SELECT SUM(commission) FROM employees WHERE department_id = 3;"
    },
    {
      "id": 19,
      "prompt": "Find the maximum salary among employees hired in 2023.",
      "ref": "SELECT MAX(salary) AS max_sal FROM employees WHERE hire_date >= '2023-01-01' AND hire_date < '2024-01-01';"
    },
    {
      "id": 20,
      "prompt": "Calculate the average salary of employees whose manager_id is NULL.",
      "ref": "SELECT AVG(salary) AS avg_sal FROM employees WHERE manager_id IS NULL;"
    },
    {
      "id": 21,
      "prompt": "Find the total headcount of employees who are not active (is_active = 0).",
      "ref": "SELECT COUNT(*) FROM employees WHERE is_active = 0;"
    },
    {
      "id": 22,
      "prompt": "Find the total value of stock in category_id 1 (SUM of stock_qty * unit_price).",
      "ref": "SELECT SUM(stock_qty * unit_price) AS total_val FROM products WHERE category_id = 1;"
    },
    {
      "id": 23,
      "prompt": "Count the number of customers whose last_name starts with the letter 'M'.",
      "ref": "SELECT COUNT(*) FROM customers WHERE last_name LIKE 'M%';"
    },
    {
      "id": 24,
      "prompt": "Find the average salary of active employees who receive a commission.",
      "ref": "SELECT AVG(salary) AS avg_sal FROM employees WHERE is_active = 1 AND commission IS NOT NULL;"
    },
    {
      "id": 25,
      "prompt": "Retrieve the total count of employees whose manager_id is NOT NULL.",
      "ref": "SELECT COUNT(manager_id) FROM employees;"
    }
  ],
  "topics": [
    {
      "id": "topic-1",
      "label": "Topic 1: Core Aggregate Functions",
      "recordingKey": null
    },
    {
      "id": "topic-2",
      "label": "Topic 2: COUNT & AVG Nuances",
      "recordingKey": null
    },
    {
      "id": "topic-3",
      "label": "Topic 3: Filtering & Formatting",
      "recordingKey": null
    }
  ]
};
