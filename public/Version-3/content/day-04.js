// Day 04 Content
if (!window.COURSE_CONTENT) window.COURSE_CONTENT = {};
window.COURSE_CONTENT['day04'] = {
  "day": 4,
  "title": "Sorting & Limiting Results",
  "db": "retail",
  "emoji": "📈",
  "slides": [
    {
      "title": "Topic 01: ORDER BY - Sorting Query Results",
      "duration": "0:00",
      "html": `
        <h2>📈 01. Sorting Results with ORDER BY</h2>
        <div class="slide-section">
          <p>By default, SQL tables have no defined physical order. A query without sorting returns records in whatever order the database engines retrieve them. To order output rows, use the <code>ORDER BY</code> clause:</p>
          
          <div class="vs-block">
            <div class="vs-card vs-card--good">
              <h4>🎯 Sorting Syntax &amp; Aliases</h4>
              <p>Sort columns ascending (<code>ASC</code>, default) or descending (<code>DESC</code>). You can reference column aliases directly:</p>
              <pre>-- Basic sort (highest paid first)
SELECT first_name, salary 
FROM employees 
ORDER BY salary DESC;

-- Sort by column alias (permitted!)
SELECT first_name, salary * 1.10 AS new_salary
FROM employees
ORDER BY new_salary DESC;</pre>
            </div>
            <div class="vs-card vs-card--good">
              <h4>🔗 Multi-Column Sort &amp; Indexes</h4>
              <p>Sort by primary columns, then secondary columns. Avoid sorting by column numbers in production:</p>
              <pre>-- Sort by department, then highest salaries
SELECT first_name, department_id, salary
FROM employees
ORDER BY department_id ASC, salary DESC;

-- Fragile design (avoid in production!):
SELECT first_name, last_name, salary
FROM employees
ORDER BY 3 DESC; -- sorts by 3rd column</pre>
            </div>
          </div>
        </div>

        <div class="slide-section">
          <div class="pro-tip-box" id="orderByAliasPhases">
            <strong>💡 Execution Phase Note:</strong> Column aliases work in <code>ORDER BY</code> because sorting represents <strong>Step 8</strong> of SQL logical execution—running directly after the <code>SELECT</code> projection (Step 6). In contrast, filtering (Step 3: <code>WHERE</code>) runs before <code>SELECT</code>, which is why aliases cannot be used in a WHERE clause.
          </div>
        </div>

        <div class="slide-section">
          <div class="interview-box">
            <h4 style="margin: 0; margin-bottom: 12px;">🎓 Interview Q&amp;A</h4>
            <div>
              <p style="margin: 0; margin-bottom: 4px;"><strong>Q: Why can column aliases be referenced in an <code>ORDER BY</code> clause, but not in <code>WHERE</code> or <code>GROUP BY</code> clauses?</strong></p>
              <p><em>A: In the SQL logical execution pipeline, the SELECT statement (which defines column aliases) runs after the WHERE and GROUP BY phases are already complete. However, the ORDER BY phase is executed near the very end, after SELECT. Therefore, aliases are defined and fully available during sorting, but do not exist yet during filtering or grouping.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />
            <div>
              <p style="margin: 0; margin-bottom: 4px;"><strong>Q: When sorting by multiple columns (e.g. <code>ORDER BY country ASC, city DESC</code>), how does the engine process the sorting hierarchy?</strong></p>
              <p><em>A: The database engine first sorts all rows in ascending order based on the primary column (country). Then, for any subset of rows that share the exact same value in the country column, the engine performs a secondary sort in descending order based on the city column. The secondary sort does not affect the relative order of rows with different country values.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />
            <div>
              <p style="margin: 0; margin-bottom: 4px;"><strong>Q: What is the risk of using positional column sorting (e.g., <code>ORDER BY 3 DESC</code>) in database scripts?</strong></p>
              <p><em>A: Positional sorting makes code fragile. If a developer later updates the query by adding, removing, or reordering columns in the SELECT clause, the column at index 3 changes. The query will then silently sort by a completely different data column, leading to broken layout reports and incorrect business logic.</em></p>
            </div>
          </div>
        </div>
      `
    },
    {
      "title": "Topic 02: LIMIT & OFFSET - Pagination",
      "duration": "0:00",
      "html": `
        <h2>📋 02. LIMIT &amp; OFFSET - Pagination</h2>
        <div class="slide-section">
          <p>When query result sets contain thousands of rows, loading them all causes massive network lag. Databases support pagination using the <code>LIMIT</code> and <code>OFFSET</code> keywords:</p>
          
          <div class="vs-block">
            <div class="vs-card vs-card--good">
              <h4>🎯 LIMIT and OFFSET Syntax</h4>
              <p><code>LIMIT</code> restricts the total rows retrieved. <code>OFFSET</code> skips a specified count of rows before returning matches:</p>
              <pre>-- Top 5 highest paid employees
SELECT first_name, salary
FROM employees
ORDER BY salary DESC
LIMIT 5;

-- Pagination Page 2 (items 11 to 20)
-- Assuming a standard page size of 10
SELECT first_name, salary
FROM employees
ORDER BY employee_id
LIMIT 10 OFFSET 10;</pre>
            </div>
            <div class="vs-card vs-card--good">
              <h4>🛡️ SQL Standard: FETCH FIRST</h4>
              <p>While LIMIT/OFFSET is widely supported, the ANSI SQL Standard defines the <code>FETCH FIRST</code> syntax:</p>
              <pre>-- SQL Standard pagination syntax
SELECT first_name, salary
FROM employees
ORDER BY salary DESC
FETCH FIRST 5 ROWS ONLY;

-- With offset skipped rows
SELECT first_name, salary
FROM employees
ORDER BY employee_id
OFFSET 10 ROWS FETCH NEXT 10 ROWS ONLY;</pre>
            </div>
          </div>
        </div>

        <div class="slide-section">
          <div class="warn-box" id="nondeterministicLimit">
            <strong>⚠️ The Deterministic Order Warning:</strong> You must **always** pair <code>LIMIT</code> or <code>FETCH FIRST</code> with an explicit <code>ORDER BY</code> clause. Without sorting, rows are retrieved in arbitrary physical disk sequence. Subsequent paginated calls could omit records or show duplicate values across pages.
          </div>
        </div>

        <div class="slide-section">
          <div class="interview-box">
            <h4 style="margin: 0; margin-bottom: 12px;">🎓 Interview Q&amp;A</h4>
            <div>
              <p style="margin: 0; margin-bottom: 4px;"><strong>Q: How do you compute the correct OFFSET value for page P given a constant page size of S?</strong></p>
              <p><em>A: The offset calculation formula is <code>OFFSET = (P - 1) * S</code>. For example, if you want to display page 4 (P=4) with a page size of 25 (S=25), the offset is <code>(4 - 1) * 25 = 75</code>. The SQL query parameters will be <code>LIMIT 25 OFFSET 75</code>.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />
            <div>
              <p style="margin: 0; margin-bottom: 4px;"><strong>Q: What is the performance impact of using high OFFSET values (e.g., <code>LIMIT 10 OFFSET 100000</code>)?</strong></p>
              <p><em>A: Performance degrades severely at high offset values. The database engine cannot jump directly to row 100,000. It must read and process the first 100,000 rows, discard them, and then return the next 10 rows. For deep pagination, seek-based pagination (using keyset filters like <code>WHERE id > last_seen_id LIMIT 10</code>) is much more performant.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />
            <div>
              <p style="margin: 0; margin-bottom: 4px;"><strong>Q: Why is pagination without an explicit <code>ORDER BY</code> considered a design bug?</strong></p>
              <p><em>A: Relational tables have no default sequence. Without an <code>ORDER BY</code> clause, the query planner returns rows in a non-deterministic order that depends on disk page allocations or index scan paths. This means consecutive page requests (e.g. Page 1 then Page 2) might return overlapping duplicate rows or miss records entirely.</em></p>
            </div>
          </div>
        </div>
      `
    },
    {
      "title": "Topic 03: DISTINCT & Random Sampling",
      "duration": "0:00",
      "html": `
        <h2>✨ 03. DISTINCT &amp; Random Sampling</h2>
        <div class="slide-section">
          <p>Query results often contain duplicate data points. The <code>DISTINCT</code> operator deduplicates result tables, while sorting functions like <code>RANDOM()</code> assist in subset extraction:</p>
          
          <div class="vs-block">
            <div class="vs-card vs-card--good">
              <h4>🔄 DISTINCT Deduping</h4>
              <p>Deduplicate columns or unique pairs. You can also count unique category tags:</p>
              <pre>-- Unique department numbers
SELECT DISTINCT department_id 
FROM employees;

-- Unique job titles within departments
SELECT DISTINCT department_id, job_title 
FROM employees;

-- Count unique department groups
SELECT COUNT(DISTINCT department_id) 
FROM employees;</pre>
            </div>
            <div class="vs-card vs-card--good">
              <h4>🎲 Random Row Sampling</h4>
              <p>Extract a randomized slice of rows. Syntax depends on your target database engine:</p>
              <pre>-- Random sampling (PostgreSQL &amp; SQLite)
SELECT * FROM employees 
ORDER BY RANDOM() 
LIMIT 5;

-- Random sampling (MySQL syntax)
SELECT * FROM employees 
ORDER BY RAND() 
LIMIT 5;</pre>
            </div>
          </div>
        </div>

        <div class="slide-section">
          <div class="warn-box" id="distinctOverhead">
            <strong>⚠️ Performance Warning — DISTINCT Sorting Overhead:</strong> <code>DISTINCT</code> requires the database engine to sort the query results in memory to identify and drop duplicate values. Avoid using it blindly to mask incorrect duplicate rows caused by bad table joins—instead, fix the primary/foreign keys in the JOIN.
          </div>
        </div>

        <div class="slide-section">
          <div class="interview-box">
            <h4 style="margin: 0; margin-bottom: 12px;">🎓 Interview Q&amp;A</h4>
            <div>
              <p style="margin: 0; margin-bottom: 4px;"><strong>Q: How does <code>SELECT DISTINCT col1, col2</code> evaluate uniqueness compared to <code>SELECT DISTINCT col1</code>?</strong></p>
              <p><em>A: <code>DISTINCT</code> evaluates the uniqueness of the **entire row** combination. <code>SELECT DISTINCT col1, col2</code> returns unique pairs. If <code>col1</code> is "Sales" and <code>col2</code> is "Manager", and another row is "Sales" and "Associate", both rows are returned. <code>SELECT DISTINCT col1</code> would deduplicate on <code>col1</code> alone, returning only a single "Sales" record.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />
            <div>
              <p style="margin: 0; margin-bottom: 4px;"><strong>Q: Why is using <code>ORDER BY RANDOM() LIMIT 10</code> considered bad practice for large tables?</strong></p>
              <p><em>A: To assign a random order, the database engine must generate a random float value for *every single row* in the table, write those values to temporary disk structures, sort the entire dataset, and then discard everything except the top 10. For tables with millions of rows, this triggers severe disk I/O and CPU spikes.</em></p>
            </div>
            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />
            <div>
              <p style="margin: 0; margin-bottom: 4px;"><strong>Q: Does <code>COUNT(DISTINCT column_name)</code> count rows where the column value is NULL?</strong></p>
              <p><em>A: No. In ANSI SQL, aggregate functions ignore NULL values. Therefore, <code>COUNT(DISTINCT column_name)</code> only counts unique, non-NULL entries. If you want to count NULL as a distinct category, you must use <code>COALESCE</code> first: <code>COUNT(DISTINCT COALESCE(column_name, 'Unknown'))</code>.</em></p>
            </div>
          </div>
        </div>
      `
    }
  ],
  "practiceQuestions": [
    {
      "id": 1,
      "prompt": "Retrieve all products sorted by unit_price in descending order.",
      "referenceSql": "SELECT * FROM products ORDER BY unit_price DESC;"
    },
    {
      "id": 2,
      "prompt": "Retrieve all employees sorted by department_id ascending, and then by salary descending.",
      "referenceSql": "SELECT * FROM employees ORDER BY department_id ASC, salary DESC;"
    },
    {
      "id": 3,
      "prompt": "Retrieve the top 3 highest-earning employees.",
      "referenceSql": "SELECT * FROM employees ORDER BY salary DESC LIMIT 3;"
    },
    {
      "id": 4,
      "prompt": "<strong>Practice Task: Next Page Products</strong><br/>Implement pagination for products list. Sort products by product_id and retrieve products 6 to 10 (LIMIT 5, OFFSET 5).",
      "referenceSql": "SELECT * FROM products ORDER BY product_id LIMIT 5 OFFSET 5;"
    },
    {
      "id": 5,
      "prompt": "<strong>Practice Task: Recent High Orders</strong><br/>Retrieve the top 5 most expensive orders placed. Sort by total_amount descending.",
      "referenceSql": "SELECT * FROM orders ORDER BY total_amount DESC LIMIT 5;"
    },
    {
      "id": 6,
      "prompt": "<strong>Practice Task: Sorted Contact List</strong><br/>List all unique customer regions sorted alphabetically.",
      "referenceSql": "SELECT DISTINCT region FROM customers WHERE region IS NOT NULL ORDER BY region ASC;"
    }
  ],
  "testQuestions": [
    {
      "id": 1,
      "prompt": "Find all products sorted by unit_price from cheapest to most expensive.",
      "ref": "SELECT * FROM products ORDER BY unit_price ASC;"
    },
    {
      "id": 2,
      "prompt": "Find the top 5 most expensive products in descending order.",
      "ref": "SELECT * FROM products ORDER BY unit_price DESC LIMIT 5;"
    },
    {
      "id": 3,
      "prompt": "Retrieve a list of employees sorted by last_name alphabetically.",
      "ref": "SELECT * FROM employees ORDER BY last_name ASC;"
    },
    {
      "id": 4,
      "prompt": "Retrieve the 3 oldest employees based on hire_date (earliest first).",
      "ref": "SELECT * FROM employees ORDER BY hire_date ASC LIMIT 3;"
    },
    {
      "id": 5,
      "prompt": "List all unique category IDs from the products table.",
      "ref": "SELECT DISTINCT category_id FROM products;"
    },
    {
      "id": 6,
      "prompt": "Count the number of unique departments in the employees table.",
      "ref": "SELECT COUNT(DISTINCT department_id) FROM employees;"
    },
    {
      "id": 7,
      "prompt": "Retrieve employees sorted by department_id ascending, and then by hire_date descending.",
      "ref": "SELECT * FROM employees ORDER BY department_id ASC, hire_date DESC;"
    },
    {
      "id": 8,
      "prompt": "Retrieve employees 11 to 15 (Page 3 of 5-record size) sorted by employee_id.",
      "ref": "SELECT * FROM employees ORDER BY employee_id LIMIT 5 OFFSET 10;"
    },
    {
      "id": 9,
      "prompt": "Get 3 random records from the customers table.",
      "ref": "SELECT * FROM customers ORDER BY RANDOM() LIMIT 3;"
    },
    {
      "id": 10,
      "prompt": "List unique combinations of department_id and job_title from the employees table.",
      "ref": "SELECT DISTINCT department_id, job_title FROM employees;"
    },
    {
      "id": 11,
      "prompt": "Find the single employee with the highest salary.",
      "ref": "SELECT * FROM employees ORDER BY salary DESC LIMIT 1;"
    },
    {
      "id": 12,
      "prompt": "Find products sorted by stock_qty descending, then unit_price ascending.",
      "ref": "SELECT * FROM products ORDER BY stock_qty DESC, unit_price ASC;"
    },
    {
      "id": 13,
      "prompt": "Retrieve unique customer regions in alphabetical order.",
      "ref": "SELECT DISTINCT region FROM customers ORDER BY region ASC;"
    },
    {
      "id": 14,
      "prompt": "Select employee first_name, salary, and sorted by salary using position index 2 in descending order.",
      "ref": "SELECT first_name, salary FROM employees ORDER BY 2 DESC;"
    },
    {
      "id": 15,
      "prompt": "Find all products with non-NULL stock, sorted by category_id and then unit_price descending.",
      "ref": "SELECT * FROM products WHERE stock_qty IS NOT NULL ORDER BY category_id ASC, unit_price DESC;"
    },
    {
      "id": 16,
      "prompt": "Retrieve the 6th to 10th highest paid employees (Page 2 of 5-record size).",
      "ref": "SELECT * FROM employees ORDER BY salary DESC LIMIT 5 OFFSET 5;"
    },
    {
      "id": 17,
      "prompt": "List distinct job titles from active employees, sorted alphabetically.",
      "ref": "SELECT DISTINCT job_title FROM employees WHERE is_active = 1 ORDER BY job_title ASC;"
    },
    {
      "id": 18,
      "prompt": "Find the 5 cheapest products in category_id 2.",
      "ref": "SELECT * FROM products WHERE category_id = 2 ORDER BY unit_price ASC LIMIT 5;"
    },
    {
      "id": 19,
      "prompt": "Select names and annual salaries, sorted by salary * 12 alias annual_salary descending.",
      "ref": "SELECT first_name, salary * 12 AS annual_salary FROM employees ORDER BY annual_salary DESC;"
    },
    {
      "id": 20,
      "prompt": "Retrieve customers sorted by country, showing rows where region is NULL first.",
      "ref": "SELECT * FROM customers ORDER BY country ASC, region ASC NULLS FIRST;"
    },
    {
      "id": 21,
      "prompt": "Find active employees with non-NULL commissions, sorted by commission descending.",
      "ref": "SELECT * FROM employees WHERE is_active = 1 AND commission IS NOT NULL ORDER BY commission DESC;"
    },
    {
      "id": 22,
      "prompt": "Select distinct categories of products that have unit_price > 100.",
      "ref": "SELECT DISTINCT category_id FROM products WHERE unit_price > 100;"
    },
    {
      "id": 23,
      "prompt": "Find the 3 most recently hired employees in department 10.",
      "ref": "SELECT * FROM employees WHERE department_id = 10 ORDER BY hire_date DESC LIMIT 3;"
    },
    {
      "id": 24,
      "prompt": "Retrieve the first page (top 10 rows) of customers sorted by customer_id.",
      "ref": "SELECT * FROM customers ORDER BY customer_id LIMIT 10 OFFSET 0;"
    },
    {
      "id": 25,
      "prompt": "List employees sorted by manager_id ascending, and then by salary descending.",
      "ref": "SELECT * FROM employees ORDER BY manager_id ASC, salary DESC;"
    }
  ],
  "topics": [
    {
      "id": "topic-1",
      "label": "Topic 1: Sorting Results",
      "recordingKey": null
    },
    {
      "id": "topic-2",
      "label": "Topic 2: LIMIT & OFFSET",
      "recordingKey": null
    },
    {
      "id": "topic-3",
      "label": "Topic 3: DISTINCT & Sampling",
      "recordingKey": null
    }
  ]
};
