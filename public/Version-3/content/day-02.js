// Day 02 Content
if (!window.COURSE_CONTENT) window.COURSE_CONTENT = {};
window.COURSE_CONTENT['day02'] = {
  "day": 2,
  "title": "Filtering Data with WHERE",
  "db": "retail",
  "emoji": "\ud83d\udd0d",
  "slides": [
    {
      "title": "Topic 01: Filtering Data with WHERE",
      "duration": "0:00",
      "html": "\n            <h2>\ud83d\udd0d Topic 01: Filtering Data with WHERE</h2>\n            <div class=\"slide-section\">\n              <h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">The Role of WHERE</h3>\n<p style=\"color:#cbd5e1;line-height:1.75;margin:10px 0;\"><code style=\"background:#1e2d40;color:#7dd3fc;padding:2px 6px;border-radius:3px;font-family:JetBrains Mono,monospace;font-size:0.88em;\">WHERE</code> is the <strong style=\"color:#f1f5f9;\">row-level filter</strong> in SQL. It runs at <strong style=\"color:#f1f5f9;\">Step 3</strong> of the SQL Order of Execution (after <code style=\"background:#1e2d40;color:#7dd3fc;padding:2px 6px;border-radius:3px;font-family:JetBrains Mono,monospace;font-size:0.88em;\">FROM</code>/<code style=\"background:#1e2d40;color:#7dd3fc;padding:2px 6px;border-radius:3px;font-family:JetBrains Mono,monospace;font-size:0.88em;\">JOIN</code>, before <code style=\"background:#1e2d40;color:#7dd3fc;padding:2px 6px;border-radius:3px;font-family:JetBrains Mono,monospace;font-size:0.88em;\">GROUP BY</code>). It evaluates each row individually and keeps only rows where the condition evaluates to <code style=\"background:#1e2d40;color:#7dd3fc;padding:2px 6px;border-radius:3px;font-family:JetBrains Mono,monospace;font-size:0.88em;\">TRUE</code>.</p>\n<blockquote style=\"border-left:4px solid #f59e0b;background:#1c1a0e;padding:10px 16px;margin:12px 0;color:#fcd34d;border-radius:4px;\"><strong style=\"color:#f1f5f9;\">Key insight:</strong> A row is excluded if a condition evaluates to <code style=\"background:#1e2d40;color:#7dd3fc;padding:2px 6px;border-radius:3px;font-family:JetBrains Mono,monospace;font-size:0.88em;\">FALSE</code> <strong style=\"color:#f1f5f9;\">or to <code style=\"background:#1e2d40;color:#7dd3fc;padding:2px 6px;border-radius:3px;font-family:JetBrains Mono,monospace;font-size:0.88em;\">NULL</code></strong> (three-valued logic: TRUE, FALSE, UNKNOWN). This is why filtering on NULL requires special handling (covered in Day 3).</blockquote>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">Comparison Operators</h3>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">=        Equal to\n&lt;&gt;  !=   Not equal to  (both work in most databases)\n&gt;        Greater than\n&lt;        Less than\n&gt;=       Greater than or equal to\n&lt;=       Less than or equal to</code></pre>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">Logical Operators: AND, OR, NOT</h3>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">-- AND: both conditions must be TRUE\nSELECT * FROM employees\nWHERE salary &gt; 50000 AND department_id = 3;\n\n-- OR: at least one condition must be TRUE\nSELECT * FROM employees\nWHERE department_id = 3 OR department_id = 5;\n\n-- NOT: reverses the condition\nSELECT * FROM employees\nWHERE NOT department_id = 3;  -- same as department_id &lt;&gt; 3</code></pre>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">Operator Precedence \u2014 Critical for Complex Filters</h3>\n<p style=\"color:#cbd5e1;line-height:1.75;margin:10px 0;\">SQL evaluates <code style=\"background:#1e2d40;color:#7dd3fc;padding:2px 6px;border-radius:3px;font-family:JetBrains Mono,monospace;font-size:0.88em;\">NOT</code> first, then <code style=\"background:#1e2d40;color:#7dd3fc;padding:2px 6px;border-radius:3px;font-family:JetBrains Mono,monospace;font-size:0.88em;\">AND</code>, then <code style=\"background:#1e2d40;color:#7dd3fc;padding:2px 6px;border-radius:3px;font-family:JetBrains Mono,monospace;font-size:0.88em;\">OR</code>. This catches many beginners off guard.</p>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">-- WRONG INTENT \u2014 This is read as: department=3 AND (salary&gt;70000 OR department=5)\nSELECT * FROM employees\nWHERE department_id = 3 AND salary &gt; 70000 OR department_id = 5;\n\n-- CORRECT \u2014 Use parentheses to enforce your intended logic:\nSELECT * FROM employees\nWHERE (department_id = 3 OR department_id = 5) AND salary &gt; 70000;</code></pre>\n<blockquote style=\"border-left:4px solid #f59e0b;background:#1c1a0e;padding:10px 16px;margin:12px 0;color:#fcd34d;border-radius:4px;\"><strong style=\"color:#f1f5f9;\">Rule:</strong> Always use parentheses when combining <code style=\"background:#1e2d40;color:#7dd3fc;padding:2px 6px;border-radius:3px;font-family:JetBrains Mono,monospace;font-size:0.88em;\">AND</code> and <code style=\"background:#1e2d40;color:#7dd3fc;padding:2px 6px;border-radius:3px;font-family:JetBrains Mono,monospace;font-size:0.88em;\">OR</code>. Never rely on implicit precedence in complex conditions.</blockquote>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">BETWEEN ... AND</h3>\n<p style=\"color:#cbd5e1;line-height:1.75;margin:10px 0;\">Inclusive range filter \u2014 both endpoints are included.</p>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">-- salary &gt;= 40000 AND salary &lt;= 80000\nSELECT * FROM employees\nWHERE salary BETWEEN 40000 AND 80000;\n\n-- Works on dates too\nSELECT * FROM orders\nWHERE order_date BETWEEN '2024-01-01' AND '2024-12-31';</code></pre>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">IN Operator \u2014 Clean alternative to multiple OR conditions</h3>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">-- Instead of this (verbose and error-prone):\nWHERE department_id = 1 OR department_id = 3 OR department_id = 7\n\n-- Use this (clean and readable):\nWHERE department_id IN (1, 3, 7)\n\n-- NOT IN \u2014 exclude values\nWHERE job_title NOT IN ('Manager', 'Director', 'VP')</code></pre>\n<blockquote style=\"border-left:4px solid #f59e0b;background:#1c1a0e;padding:10px 16px;margin:12px 0;color:#fcd34d;border-radius:4px;\"><strong style=\"color:#f1f5f9;\">Caution:</strong> <code style=\"background:#1e2d40;color:#7dd3fc;padding:2px 6px;border-radius:3px;font-family:JetBrains Mono,monospace;font-size:0.88em;\">NOT IN</code> behaves unexpectedly if the list contains a <code style=\"background:#1e2d40;color:#7dd3fc;padding:2px 6px;border-radius:3px;font-family:JetBrains Mono,monospace;font-size:0.88em;\">NULL</code> value. The result can be an empty set. (Covered more in Day 3.)</blockquote>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">Filtering Text \u2014 Case Sensitivity</h3>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">-- Exact match (case-sensitive in PostgreSQL, case-insensitive in MySQL by default)\nSELECT * FROM employees WHERE first_name = 'Alice';\n\n-- Case-insensitive search (PostgreSQL)\nSELECT * FROM employees WHERE LOWER(first_name) = 'alice';</code></pre>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">Arithmetic in WHERE</h3>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">-- You can use arithmetic expressions in WHERE\nSELECT * FROM employees\nWHERE salary * 1.10 &gt; 90000;  -- employees who'd earn &gt;90k after a 10% raise</code></pre>\n<hr style=\"border:none;border-top:1px solid #1e293b;margin:24px 0;\">\n            </div>\n            "
    }
  ],
  "practiceQuestions": [
    {
      "id": 1,
      "prompt": "Find all products with a unit_price greater than 100.",
      "referenceSql": "SELECT * FROM products WHERE unit_price > 100;"
    },
    {
      "id": 2,
      "prompt": "Find all customers in the 'North' region who signed up after January 1, 2022.",
      "referenceSql": "SELECT * FROM customers WHERE region = 'North' AND signup_date > '2022-01-01';"
    },
    {
      "id": 3,
      "prompt": "Find all employees who work in department_id 10 or 20 and have a salary greater than 80000.",
      "referenceSql": "SELECT * FROM employees WHERE department_id IN (10, 20) AND salary > 80000;"
    },
    {
      "id": 4,
      "prompt": "<strong>Practice Task: High Stock Products</strong><br/>Identify products that need inventory control. Retrieve name and stock_qty for products with unit_price < 50 and stock_qty > 100.",
      "referenceSql": "-- Complete this query"
    },
    {
      "id": 5,
      "prompt": "<strong>Practice Task: Region Specific Customers</strong><br/>The marketing team needs contact info for clients. Retrieve email and region for customers in 'North' or 'East' regions.",
      "referenceSql": "SELECT email, region FROM customers WHERE region IN ('North', 'East');"
    },
    {
      "id": 6,
      "prompt": "<strong>Practice Task: Compensation Scan</strong><br/>Find employees with high salaries. Retrieve first_name, last_name, and salary for employees earning between 60000 and 100000.",
      "referenceSql": "-- Complete this query"
    }
  ],
  "testQuestions": [
    {
      "id": 1,
      "prompt": "Retrieve all columns and rows from the <code>employees</code> table where the salary is greater than 80000.",
      "ref": "SELECT * FROM employees WHERE salary > 80000;"
    },
    {
      "id": 2,
      "prompt": "Retrieve <code>first_name</code>, <code>last_name</code>, and <code>salary</code> from <code>employees</code> where the salary is less than or equal to 50000.",
      "ref": "SELECT first_name, last_name, salary FROM employees WHERE salary <= 50000;"
    },
    {
      "id": 3,
      "prompt": "Retrieve all products with <code>unit_price</code> between 1000 and 5000.",
      "ref": "SELECT * FROM products WHERE unit_price BETWEEN 1000 AND 5000;"
    },
    {
      "id": 4,
      "prompt": "Find all active employees (<code>is_active = 1</code>) who are not managers (<code>manager_id IS NULL</code> or <code>manager_id = 0</code>).",
      "ref": "SELECT * FROM employees WHERE is_active = 1 AND (manager_id IS NULL OR manager_id = 0);"
    },
    {
      "id": 5,
      "prompt": "Find all customers in the 'South' or 'East' region.",
      "ref": "SELECT * FROM customers WHERE region IN ('South', 'East');"
    },
    {
      "id": 6,
      "prompt": "Retrieve all orders with a <code>total_amount</code> greater than 50000 and status is 'Shipped'.",
      "ref": "SELECT * FROM orders WHERE total_amount > 50000 AND status = 'Shipped';"
    },
    {
      "id": 7,
      "prompt": "Retrieve products that belong to category_id 2 or 3 and have a stock quantity greater than 20.",
      "ref": "SELECT * FROM products WHERE category_id IN (2, 3) AND stock_qty > 20;"
    },
    {
      "id": 8,
      "prompt": "Retrieve all customers who signed up after January 1, 2023.",
      "ref": "SELECT * FROM customers WHERE signup_date > '2023-01-01';"
    },
    {
      "id": 9,
      "prompt": "Find all employees in the 'Engineering' department (department_id 10) who earn more than 70000.",
      "ref": "SELECT * FROM employees WHERE department_id = 10 AND salary > 70000;"
    },
    {
      "id": 10,
      "prompt": "Find all orders shipped before June 1, 2024.",
      "ref": "SELECT * FROM orders WHERE shipped_date < '2024-06-01';"
    },
    {
      "id": 11,
      "prompt": "Find all employees whose manager_id is 1 or 2.",
      "ref": "SELECT * FROM employees WHERE manager_id IN (1, 2);"
    },
    {
      "id": 12,
      "prompt": "Find products with category_id 5 and a cost_price less than 500.",
      "ref": "SELECT * FROM products WHERE category_id = 5 AND cost_price < 500;"
    },
    {
      "id": 13,
      "prompt": "Find customers whose customer_id is between 3 and 7.",
      "ref": "SELECT * FROM customers WHERE customer_id BETWEEN 3 AND 7;"
    },
    {
      "id": 14,
      "prompt": "Retrieve orders with total_amount less than 2000 or status is 'Processing'.",
      "ref": "SELECT * FROM orders WHERE total_amount < 2000 OR status = 'Processing';"
    },
    {
      "id": 15,
      "prompt": "Find active employees with department_id 20.",
      "ref": "SELECT * FROM employees WHERE is_active = 1 AND department_id = 20;"
    },
    {
      "id": 16,
      "prompt": "Find products with category_id 6 and unit_price greater than 1000.",
      "ref": "SELECT * FROM products WHERE category_id = 6 AND unit_price > 1000;"
    },
    {
      "id": 17,
      "prompt": "Find employees earning more than 90000 hired before 2022-01-01.",
      "ref": "SELECT * FROM employees WHERE salary > 90000 AND hire_date < '2022-01-01';"
    },
    {
      "id": 18,
      "prompt": "Find orders with status 'Processing' that have amount > 3000.",
      "ref": "SELECT * FROM orders WHERE status = 'Processing' AND total_amount > 3000;"
    },
    {
      "id": 19,
      "prompt": "Find customers in 'North' region signed up in 2022.",
      "ref": "SELECT * FROM customers WHERE region = 'North' AND signup_date BETWEEN '2022-01-01' AND '2022-12-31';"
    },
    {
      "id": 20,
      "prompt": "Find active employees who earn between 40000 and 70000.",
      "ref": "SELECT * FROM employees WHERE is_active = 1 AND salary BETWEEN 40000 AND 70000;"
    },
    {
      "id": 21,
      "prompt": "Find products with stock_qty less than 15 and category_id 6.",
      "ref": "SELECT * FROM products WHERE stock_qty < 15 AND category_id = 6;"
    },
    {
      "id": 22,
      "prompt": "Find employees with department_id 50 and manager_id 8.",
      "ref": "SELECT * FROM employees WHERE department_id = 50 AND manager_id = 8;"
    },
    {
      "id": 23,
      "prompt": "Find orders with total_amount between 10000 and 150000.",
      "ref": "SELECT * FROM orders WHERE total_amount BETWEEN 10000 AND 150000;"
    },
    {
      "id": 24,
      "prompt": "Find active software engineers (job_title = 'Software Engineer') who are active.",
      "ref": "SELECT * FROM employees WHERE job_title = 'Software Engineer' AND is_active = 1;"
    },
    {
      "id": 25,
      "prompt": "Find active employees with commission greater than 5000.",
      "ref": "SELECT * FROM employees WHERE is_active = 1 AND commission > 5000;"
    }
  ],
  "topics": [
    {
      "id": "topic-1",
      "label": "Topic 1: Filtering Data with WHERE",
      "recordingKey": null
    }
  ]
};
