// Day 04 Content
if (!window.COURSE_CONTENT) window.COURSE_CONTENT = {};
window.COURSE_CONTENT['day04'] = {
  "day": 4,
  "title": "Sorting, Limiting & Deduplication",
  "db": "retail",
  "emoji": "📈",
  "slides": [
    {
      "title": "Topic 01: Sorting, Limiting & Deduplication",
      "duration": "0:00",
      "html": `
        <h2>📈 01. Sorting, Limiting &amp; Deduplication</h2>

        <!-- Unboxed Intro Paragraph -->
        <p>Every production SQL query that returns data to an application needs three fundamental controls: <strong>ORDER BY</strong> to guarantee a consistent sequence, <strong>LIMIT / OFFSET</strong> to restrict and paginate result sets, and <strong>DISTINCT</strong> to eliminate redundant duplicate rows. Without these, queries return unpredictable data in an arbitrary order — a serious reliability bug in any real-world product.</p>

        <!-- PART 1: ORDER BY -->
        <div class="slide-section">
          <h3>Sorting with ORDER BY</h3>
          <p>SQL tables have <strong>no guaranteed physical storage order</strong>. The <code>ORDER BY</code> clause is the only reliable way to control the sequence of returned rows. It supports single column, multi-column, expression, and alias-based sorting.</p>

          <div class="db-mock-table-wrap">
            <table class="db-table-mock db-table-mock--compact">
              <thead>
                <tr>
                  <th style="width: 30%;">Syntax Form</th>
                  <th style="width: 70%;">Explanation</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>ORDER BY col ASC</code></td>
                  <td>Ascending order (A→Z, lowest→highest). <strong>ASC is the default</strong> and can be omitted.</td>
                </tr>
                <tr>
                  <td><code>ORDER BY col DESC</code></td>
                  <td>Descending order (Z→A, highest→lowest).</td>
                </tr>
                <tr>
                  <td><code>ORDER BY col1 ASC, col2 DESC</code></td>
                  <td>Multi-column sort: primary column first, secondary sort applies only within ties of the primary.</td>
                </tr>
                <tr>
                  <td><code>ORDER BY alias</code></td>
                  <td>Sort by a computed column alias defined in SELECT (valid because ORDER BY runs <em>after</em> SELECT).</td>
                </tr>
                <tr>
                  <td><code>ORDER BY col ASC NULLS LAST</code></td>
                  <td>Explicitly place NULL values at the bottom of sorted results.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="slide-section">
          <div class="vs-block">
            <div class="vs-card vs-card--good">
              <h4>🎯 Single &amp; Multi-Column Sort</h4>
              <p>Sort employees by salary descending, then by department and hire date:</p>
              <pre>-- Sort by salary (highest first)
SELECT first_name, last_name, salary
FROM employees
ORDER BY salary DESC;

-- Primary: department ascending
-- Secondary: salary descending (within same dept)
SELECT first_name, department_id, salary
FROM employees
ORDER BY department_id ASC, salary DESC;</pre>
            </div>
            <div class="vs-card vs-card--good">
              <h4>✅ Sort by Alias &amp; NULL Placement</h4>
              <p>Sort by a computed column alias; explicitly push NULLs to the end:</p>
              <pre>-- Sort by an alias computed in SELECT
SELECT first_name,
       salary * 12 AS annual_salary
FROM employees
ORDER BY annual_salary DESC;

-- Push NULL commission values to the bottom
SELECT first_name, commission
FROM employees
ORDER BY commission ASC NULLS LAST;</pre>
            </div>
          </div>
        </div>

        <div class="slide-section">
          <div class="pro-tip-box" id="day04-alias-tip">
            <strong>💡 Why aliases work in ORDER BY but NOT in WHERE:</strong> SQL logical execution runs in this order: FROM (1) → WHERE (3) → GROUP BY (4) → HAVING (5) → SELECT (6) → ORDER BY (8). <code>WHERE</code> runs at Step 3, before column aliases are created at Step 6. <code>ORDER BY</code> runs at Step 8 — after SELECT — making aliases fully available. This is one of the most tested SQL interview concepts.
          </div>
        </div>

        <div class="slide-section">
          <div class="warn-box" id="day04-positional-warn">
            <strong>⚠️ Avoid Positional Sorting:</strong> <code>ORDER BY 2 DESC</code> sorts by the 2nd column in the SELECT list by position. This is fragile — if a developer adds or reorders columns, the sort silently targets a different column, producing wrong output. Always reference columns by name.
          </div>
        </div>

        <!-- PART 2: LIMIT & OFFSET -->
        <div class="slide-section">
          <h3>Controlling Row Count: LIMIT &amp; OFFSET</h3>
          <p>Returning all rows from a large table to an application is wasteful and slow. <code>LIMIT</code> caps how many rows the engine returns. <code>OFFSET</code> skips a specified count of rows first — enabling the classic <strong>page-by-page pagination</strong> pattern.</p>

          <div class="vs-block">
            <div class="vs-card vs-card--good">
              <h4>🎯 LIMIT &amp; OFFSET Syntax</h4>
              <pre>-- Top 5 most expensive products
SELECT name, unit_price
FROM products
ORDER BY unit_price DESC
LIMIT 5;

-- Page 2 (items 6–10), page size = 5
-- Formula: OFFSET = (PageNo - 1) × PageSize
SELECT name, unit_price
FROM products
ORDER BY product_id ASC
LIMIT 5 OFFSET 5;

-- Page 3 (items 11–15)
SELECT name, unit_price
FROM products
ORDER BY product_id ASC
LIMIT 5 OFFSET 10;</pre>
            </div>
            <div class="vs-card vs-card--good">
              <h4>🛡️ SQL Standard: FETCH FIRST</h4>
              <p>The ANSI SQL standard defines <code>FETCH FIRST</code>, supported by Oracle, PostgreSQL, and SQL Server:</p>
              <pre>-- ANSI standard top 5
SELECT first_name, salary
FROM employees
ORDER BY salary DESC
FETCH FIRST 5 ROWS ONLY;

-- ANSI standard page 3 (skip 10, take 5)
SELECT first_name, salary
FROM employees
ORDER BY employee_id ASC
OFFSET 10 ROWS FETCH NEXT 5 ROWS ONLY;</pre>
            </div>
          </div>
        </div>

        <div class="slide-section">
          <div class="db-mock-table-wrap">
            <table class="db-table-mock db-table-mock--compact">
              <thead>
                <tr>
                  <th>Page</th>
                  <th>LIMIT</th>
                  <th>OFFSET (formula: (P−1)×S)</th>
                  <th>Rows returned</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Page 1</td><td>10</td><td>OFFSET 0</td><td>Rows 1–10</td></tr>
                <tr><td>Page 2</td><td>10</td><td>OFFSET 10</td><td>Rows 11–20</td></tr>
                <tr><td>Page 3</td><td>10</td><td>OFFSET 20</td><td>Rows 21–30</td></tr>
                <tr><td>Page N</td><td>10</td><td>OFFSET (N−1)×10</td><td>Rows (10N−9) to 10N</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="slide-section">
          <div class="warn-box" id="day04-offset-warn">
            <strong>⚠️ Always pair LIMIT with ORDER BY:</strong> Without ORDER BY, the database engine returns rows in a non-deterministic order. Consecutive paginated page requests can then return overlapping rows or skip records — making pagination logically broken and producing unreliable results.
          </div>
        </div>

        <div class="slide-section">
          <div class="pro-tip-box" id="day04-keyset-tip">
            <strong>💡 High-Offset Performance Problem &amp; Keyset Pagination:</strong> <code>LIMIT 10 OFFSET 100000</code> forces the database to scan and discard 100,000 rows before collecting just 10. For deep pagination on large tables, use <strong>keyset (seek) pagination</strong>: <code>WHERE order_id &gt; :last_seen_id ORDER BY order_id LIMIT 10</code>. This jumps directly to the target row via the index and is dramatically faster.
          </div>
        </div>

        <!-- PART 3: DISTINCT -->
        <div class="slide-section">
          <h3>Removing Duplicates with DISTINCT</h3>
          <p>The <code>DISTINCT</code> keyword eliminates duplicate rows from query results. Uniqueness is evaluated across the <strong>entire selected row</strong> — all listed columns together form the deduplication key.</p>

          <div class="vs-block">
            <div class="vs-card vs-card--good">
              <h4>🔄 DISTINCT Deduplication</h4>
              <pre>-- Unique department IDs used across employees
SELECT DISTINCT department_id
FROM employees;

-- Unique (department, job_title) pairs
-- Both columns define the uniqueness key
SELECT DISTINCT department_id, job_title
FROM employees
ORDER BY department_id ASC;

-- Count distinct non-NULL departments
SELECT COUNT(DISTINCT department_id) AS dept_count
FROM employees;</pre>
            </div>
            <div class="vs-card vs-card--good">
              <h4>🎲 Random Sampling</h4>
              <p>Combine ORDER BY RANDOM() with LIMIT for statistical sampling or A/B test data extraction:</p>
              <pre>-- 5 random employees (SQLite / PostgreSQL)
SELECT * FROM employees
ORDER BY RANDOM()
LIMIT 5;

-- Random 3 customers (MySQL)
SELECT * FROM customers
ORDER BY RAND()
LIMIT 3;

-- Unique non-NULL regions alphabetically
SELECT DISTINCT region
FROM customers
WHERE region IS NOT NULL
ORDER BY region ASC;</pre>
            </div>
          </div>
        </div>

        <div class="slide-section">
          <div class="db-mock-table-wrap">
            <table class="db-table-mock db-table-mock--compact">
              <thead>
                <tr>
                  <th style="width: 40%;">Query</th>
                  <th style="width: 60%;">Behavior</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>SELECT DISTINCT dept_id</code></td>
                  <td>Returns unique values of dept_id alone. All duplicate dept_id values are removed.</td>
                </tr>
                <tr>
                  <td><code>SELECT DISTINCT dept_id, job_title</code></td>
                  <td>Returns unique <em>combinations</em>. "Sales/Manager" and "Sales/Analyst" are both returned since the pair differs.</td>
                </tr>
                <tr>
                  <td><code>COUNT(DISTINCT col)</code></td>
                  <td>Counts unique non-NULL values. <strong>NULLs are ignored</strong> by all aggregate functions.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="slide-section">
          <div class="warn-box" id="day04-distinct-warn">
            <strong>⚠️ DISTINCT Has a Performance Cost:</strong> Internally, DISTINCT forces the engine to sort the entire result set to identify and remove duplicates — a costly operation. Never use DISTINCT to mask duplicate rows caused by bad JOIN logic. The correct fix is to repair the JOIN condition or foreign key constraint.
          </div>
        </div>

        <!-- Interview Q&A -->
        <div class="slide-section">
          <div class="interview-box">
            <h4 style="margin: 0; margin-bottom: 12px;">🎓 Interview Q&amp;A — Sorting, Limiting &amp; DISTINCT</h4>

            <div>
              <p style="margin: 0; margin-bottom: 4px;"><strong>Q: Why can a column alias be used in ORDER BY but not in a WHERE clause?</strong></p>
              <p><em>A: SQL has a strict logical execution order. WHERE executes at Step 3, before SELECT (Step 6) projects and names columns — so the alias does not exist yet. ORDER BY executes at Step 8, after SELECT, so the alias is fully defined and usable for sorting.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div>
              <p style="margin: 0; margin-bottom: 4px;"><strong>Q: What is the pagination OFFSET formula for page P with page size S?</strong></p>
              <p><em>A: The formula is <code>OFFSET = (P − 1) × S</code>. For page 4 with page size 25: OFFSET = (4−1) × 25 = 75. The query reads: <code>LIMIT 25 OFFSET 75</code>, returning rows 76 to 100.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div>
              <p style="margin: 0; margin-bottom: 4px;"><strong>Q: Why does <code>LIMIT 10 OFFSET 1000000</code> cause serious performance problems?</strong></p>
              <p><em>A: The database cannot jump directly to row 1,000,001. It must sequentially scan and discard 1,000,000 rows before returning the next 10. The preferred solution is keyset pagination: <code>WHERE id &gt; :last_seen_id ORDER BY id LIMIT 10</code>, which uses an index and jumps directly to the target position.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div>
              <p style="margin: 0; margin-bottom: 4px;"><strong>Q: Why is LIMIT/OFFSET without ORDER BY considered a design bug?</strong></p>
              <p><em>A: Relational tables have no guaranteed physical row order. Without ORDER BY, the optimizer picks any access path, returning rows non-deterministically. Consecutive page requests can then return overlapping records or skip rows entirely — pagination becomes logically broken.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div>
              <p style="margin: 0; margin-bottom: 4px;"><strong>Q: How does <code>SELECT DISTINCT col1, col2</code> differ from <code>SELECT DISTINCT col1</code>?</strong></p>
              <p><em>A: DISTINCT evaluates uniqueness across all selected columns together. <code>DISTINCT col1</code> returns unique values of col1 alone. <code>DISTINCT col1, col2</code> returns unique (col1, col2) pairs — "Sales/Manager" and "Sales/Analyst" are both returned even though col1 is "Sales" in both.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div>
              <p style="margin: 0; margin-bottom: 4px;"><strong>Q: Does <code>COUNT(DISTINCT column)</code> count NULL values?</strong></p>
              <p><em>A: No. All SQL aggregate functions ignore NULLs. To include NULL as a distinct category: <code>COUNT(DISTINCT COALESCE(column, 'Unknown'))</code>.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div>
              <p style="margin: 0; margin-bottom: 4px;"><strong>Q: In a multi-column sort, when does the secondary sort key take effect?</strong></p>
              <p><em>A: The secondary sort key only applies within groups of rows that share the <strong>identical primary key value</strong>. Rows with different primary values are fully ordered by the primary key and are never rearranged by the secondary key. This is called a stable hierarchical sort.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div>
              <p style="margin: 0; margin-bottom: 4px;"><strong>Q: Is it valid to ORDER BY a column that is NOT in the SELECT list?</strong></p>
              <p><em>A: Yes — with one exception. You can ORDER BY any column in the source table even if it is not in the SELECT output. The exception is when using DISTINCT: when DISTINCT is present, you can only ORDER BY columns that appear in the SELECT list, because the engine cannot access hidden columns after deduplication.</em></p>
            </div>
          </div>
        </div>
      `
    }
  ],
  "practiceQuestions": [
    {
      "id": 1,
      "prompt": "Retrieve all products sorted by unit_price from most expensive to cheapest.",
      "referenceSql": "SELECT * FROM products ORDER BY unit_price DESC;"
    },
    {
      "id": 2,
      "prompt": "List all employees sorted by department_id ascending, then by salary descending within each department.",
      "referenceSql": "SELECT * FROM employees ORDER BY department_id ASC, salary DESC;"
    },
    {
      "id": 3,
      "prompt": "Find the top 5 highest-paid employees.",
      "referenceSql": "SELECT * FROM employees ORDER BY salary DESC LIMIT 5;"
    },
    {
      "id": 4,
      "prompt": "Implement pagination for products: retrieve products 6 to 10 sorted by product_id (page size = 5, page 2).",
      "referenceSql": "SELECT * FROM products ORDER BY product_id LIMIT 5 OFFSET 5;"
    },
    {
      "id": 5,
      "prompt": "Retrieve the top 3 most recent orders (by order_date, newest first).",
      "referenceSql": "SELECT * FROM orders ORDER BY order_date DESC LIMIT 3;"
    },
    {
      "id": 6,
      "prompt": "List all unique non-NULL customer regions in alphabetical order.",
      "referenceSql": "SELECT DISTINCT region FROM customers WHERE region IS NOT NULL ORDER BY region ASC;"
    },
    {
      "id": 7,
      "prompt": "Count the number of distinct job titles across all employees. Label the column 'total_job_titles'.",
      "referenceSql": "SELECT COUNT(DISTINCT job_title) AS total_job_titles FROM employees;"
    },
    {
      "id": 8,
      "prompt": "Select each employee's first_name and their annual salary (salary * 12 AS annual_salary), sorted by annual_salary descending.",
      "referenceSql": "SELECT first_name, salary * 12 AS annual_salary FROM employees ORDER BY annual_salary DESC;"
    },
    {
      "id": 9,
      "prompt": "Retrieve 3 random customers from the customers table.",
      "referenceSql": "SELECT * FROM customers ORDER BY RANDOM() LIMIT 3;"
    },
    {
      "id": 10,
      "prompt": "List all employees who have a non-NULL commission, sorted by commission descending.",
      "referenceSql": "SELECT * FROM employees WHERE commission IS NOT NULL ORDER BY commission DESC;"
    },
    {
      "id": 11,
      "prompt": "Find all unique (department_id, job_title) combinations from the employees table, ordered by department_id.",
      "referenceSql": "SELECT DISTINCT department_id, job_title FROM employees ORDER BY department_id ASC;"
    },
    {
      "id": 12,
      "prompt": "Retrieve the 5 cheapest products in category_id 3, sorted by unit_price ascending.",
      "referenceSql": "SELECT * FROM products WHERE category_id = 3 ORDER BY unit_price ASC LIMIT 5;"
    }
  ],
  "testQuestions": [
    {
      "id": 1,
      "prompt": "Retrieve all products sorted by unit_price from cheapest to most expensive.",
      "ref": "SELECT * FROM products ORDER BY unit_price ASC;"
    },
    {
      "id": 2,
      "prompt": "Find the top 5 most expensive products.",
      "ref": "SELECT * FROM products ORDER BY unit_price DESC LIMIT 5;"
    },
    {
      "id": 3,
      "prompt": "List all employees sorted alphabetically by last_name.",
      "ref": "SELECT * FROM employees ORDER BY last_name ASC;"
    },
    {
      "id": 4,
      "prompt": "Find the 3 employees hired earliest (smallest hire_date first).",
      "ref": "SELECT * FROM employees ORDER BY hire_date ASC LIMIT 3;"
    },
    {
      "id": 5,
      "prompt": "List all unique category_id values from the products table.",
      "ref": "SELECT DISTINCT category_id FROM products;"
    },
    {
      "id": 6,
      "prompt": "Count the number of distinct department_id values in the employees table.",
      "ref": "SELECT COUNT(DISTINCT department_id) FROM employees;"
    },
    {
      "id": 7,
      "prompt": "Retrieve all employees sorted by department_id ascending, then hire_date descending within each department.",
      "ref": "SELECT * FROM employees ORDER BY department_id ASC, hire_date DESC;"
    },
    {
      "id": 8,
      "prompt": "Retrieve employees 11 to 15 sorted by employee_id (page size = 5, page 3). Use LIMIT and OFFSET.",
      "ref": "SELECT * FROM employees ORDER BY employee_id LIMIT 5 OFFSET 10;"
    },
    {
      "id": 9,
      "prompt": "Get 3 random records from the customers table.",
      "ref": "SELECT * FROM customers ORDER BY RANDOM() LIMIT 3;"
    },
    {
      "id": 10,
      "prompt": "List all unique (department_id, job_title) combinations from employees.",
      "ref": "SELECT DISTINCT department_id, job_title FROM employees;"
    },
    {
      "id": 11,
      "prompt": "Find the single employee with the highest salary.",
      "ref": "SELECT * FROM employees ORDER BY salary DESC LIMIT 1;"
    },
    {
      "id": 12,
      "prompt": "Find products sorted by stock_qty descending, then unit_price ascending for ties.",
      "ref": "SELECT * FROM products ORDER BY stock_qty DESC, unit_price ASC;"
    },
    {
      "id": 13,
      "prompt": "Retrieve all unique customer regions sorted in alphabetical order.",
      "ref": "SELECT DISTINCT region FROM customers ORDER BY region ASC;"
    },
    {
      "id": 14,
      "prompt": "Select each employee's first_name and annual_salary (salary * 12), sorted by annual_salary descending.",
      "ref": "SELECT first_name, salary * 12 AS annual_salary FROM employees ORDER BY annual_salary DESC;"
    },
    {
      "id": 15,
      "prompt": "Find all products with a non-NULL category_id, sorted by category_id ascending then unit_price descending.",
      "ref": "SELECT * FROM products WHERE category_id IS NOT NULL ORDER BY category_id ASC, unit_price DESC;"
    },
    {
      "id": 16,
      "prompt": "Retrieve the 6th to 10th highest-paid employees (page 2 of page size 5).",
      "ref": "SELECT * FROM employees ORDER BY salary DESC LIMIT 5 OFFSET 5;"
    },
    {
      "id": 17,
      "prompt": "List distinct job titles from active employees (is_active = 1), sorted alphabetically.",
      "ref": "SELECT DISTINCT job_title FROM employees WHERE is_active = 1 ORDER BY job_title ASC;"
    },
    {
      "id": 18,
      "prompt": "Find the 5 cheapest products in category_id 2.",
      "ref": "SELECT * FROM products WHERE category_id = 2 ORDER BY unit_price ASC LIMIT 5;"
    },
    {
      "id": 19,
      "prompt": "Retrieve the first page (rows 1–10) of customers sorted by customer_id.",
      "ref": "SELECT * FROM customers ORDER BY customer_id LIMIT 10 OFFSET 0;"
    },
    {
      "id": 20,
      "prompt": "List employees sorted by manager_id ascending, then salary descending within the same manager group.",
      "ref": "SELECT * FROM employees ORDER BY manager_id ASC, salary DESC;"
    },
    {
      "id": 21,
      "prompt": "Find active employees (is_active = 1) with a non-NULL commission, sorted by commission descending.",
      "ref": "SELECT * FROM employees WHERE is_active = 1 AND commission IS NOT NULL ORDER BY commission DESC;"
    },
    {
      "id": 22,
      "prompt": "List all distinct category_id values from products whose unit_price is greater than 500.",
      "ref": "SELECT DISTINCT category_id FROM products WHERE unit_price > 500;"
    },
    {
      "id": 23,
      "prompt": "Find the 3 most recently hired employees in department_id 10.",
      "ref": "SELECT * FROM employees WHERE department_id = 10 ORDER BY hire_date DESC LIMIT 3;"
    },
    {
      "id": 24,
      "prompt": "Retrieve the top 5 orders with the highest total_amount.",
      "ref": "SELECT * FROM orders ORDER BY total_amount DESC LIMIT 5;"
    },
    {
      "id": 25,
      "prompt": "Retrieve employees 21–25 sorted by employee_id (page 5 of page size 5). Use LIMIT and OFFSET.",
      "ref": "SELECT * FROM employees ORDER BY employee_id LIMIT 5 OFFSET 20;"
    }
  ],
  "topics": [
    {
      "id": "topic-1",
      "label": "Topic 1: Sorting, Limiting & Deduplication",
      "recordingKey": null
    }
  ]
};

