// Day 12 Content
if (!window.COURSE_CONTENT) window.COURSE_CONTENT = {};
window.COURSE_CONTENT['day12'] = {
  "day": 12,
  "title": "Subqueries",
  "db": "retail",
  "emoji": "\ud83e\udde0",
  "slides": [
    {
      "title": "Topic 01: Subqueries",
      "duration": "0:00",
      "html": "\n            <h2>\ud83e\udde0 Topic 01: Subqueries</h2>\n            <div class=\"slide-section\">\n              <h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">What is a Subquery?</h3>\n<p style=\"color:#cbd5e1;line-height:1.75;margin:10px 0;\">A subquery (also called an inner query or nested query) is a SQL query nested inside another query. The inner query runs first and passes its result to the outer query.</p>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">Types of Subqueries by Location</h3>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">-- 1. Subquery in WHERE\nSELECT * FROM employees\nWHERE salary &gt; (SELECT AVG(salary) FROM employees);\n\n-- 2. Subquery in FROM (Derived Table / Inline View)\nSELECT dept_avg.department_id, dept_avg.avg_sal\nFROM (\n    SELECT department_id, AVG(salary) AS avg_sal\n    FROM employees\n    GROUP BY department_id\n) AS dept_avg\nWHERE dept_avg.avg_sal &gt; 60000;\n\n-- 3. Subquery in SELECT (Scalar Subquery)\nSELECT\n    employee_id,\n    first_name,\n    salary,\n    (SELECT AVG(salary) FROM employees) AS company_avg,  -- same value for all rows\n    salary - (SELECT AVG(salary) FROM employees) AS diff_from_avg\nFROM employees;\n\n-- 4. Subquery in HAVING\nSELECT department_id, AVG(salary) AS dept_avg\nFROM employees\nGROUP BY department_id\nHAVING AVG(salary) &gt; (SELECT AVG(salary) FROM employees);</code></pre>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">Correlated vs. Non-Correlated Subqueries</h3>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">-- NON-CORRELATED: inner query runs ONCE, independently of outer query\nSELECT * FROM employees\nWHERE salary &gt; (SELECT AVG(salary) FROM employees);\n-- AVG(salary) is computed once and reused for all rows\n\n-- CORRELATED: inner query runs ONCE PER ROW of the outer query\nSELECT e.first_name, e.salary, e.department_id\nFROM employees e\nWHERE e.salary &gt; (\n    SELECT AVG(salary)\n    FROM employees\n    WHERE department_id = e.department_id  -- References outer query's e.department_id\n);\n-- For each employee row, the subquery computes average for THAT employee's department\n-- This is expensive on large tables but very powerful</code></pre>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">IN and EXISTS with Subqueries</h3>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">-- IN with subquery (returns list of values)\nSELECT first_name FROM employees\nWHERE department_id IN (\n    SELECT department_id FROM departments\n    WHERE location = 'Mumbai'\n);\n\n-- EXISTS with subquery (returns TRUE/FALSE per row \u2014 often faster)\nSELECT d.department_name\nFROM departments d\nWHERE EXISTS (\n    SELECT 1 FROM employees e\n    WHERE e.department_id = d.department_id\n    AND e.salary &gt; 100000\n);\n\n-- NOT EXISTS (find departments with NO high earners)\nSELECT d.department_name\nFROM departments d\nWHERE NOT EXISTS (\n    SELECT 1 FROM employees e\n    WHERE e.department_id = d.department_id\n    AND e.salary &gt; 100000\n);</code></pre>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">EXISTS vs. IN Performance</h3>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">-- EXISTS is generally faster when:\n-- - The outer result set is large\n-- - The inner result may have duplicates (EXISTS short-circuits at first match)\n\n-- IN is simpler and fine for small subquery result sets\n-- IN with NULL in the list behaves unpredictably (avoid NOT IN with nullable columns)</code></pre>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">Derived Tables (Subquery in FROM)</h3>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">-- Calculate per-department stats, then filter and rank\nSELECT *\nFROM (\n    SELECT\n        department_id,\n        COUNT(*) AS headcount,\n        AVG(salary) AS avg_salary,\n        RANK() OVER (ORDER BY AVG(salary) DESC) AS salary_rank  -- preview window functions\n    FROM employees\n    GROUP BY department_id\n) AS dept_stats\nWHERE headcount &gt;= 5\nORDER BY salary_rank;</code></pre>\n<hr style=\"border:none;border-top:1px solid #1e293b;margin:24px 0;\">\n            </div>\n            "
    }
  ],
  "practiceQuestions": [
    {
      "id": 1,
      "prompt": "Write a query to find all products with a unit_price higher than the average product price. (Scalar subquery).",
      "referenceSql": "SELECT * FROM products WHERE unit_price > (SELECT AVG(unit_price) FROM products);"
    },
    {
      "id": 2,
      "prompt": "Write a query to find customers who have placed at least one order. (IN subquery).",
      "referenceSql": "SELECT * FROM customers WHERE customer_id IN (SELECT DISTINCT customer_id FROM orders);"
    },
    {
      "id": 3,
      "prompt": "Write a query to find customers who have spent more than the average spent per order. (Subquery in FROM).",
      "referenceSql": "SELECT customer_id, total_spent FROM (SELECT customer_id, SUM(total_amount) AS total_spent FROM orders GROUP BY customer_id) WHERE total_spent > (SELECT AVG(total_amount) FROM orders);"
    },
    {
      "id": 4,
      "prompt": "<strong>Practice Task: Elite Customers List</strong><br/>Identify high-value customers. Retrieve customers whose customer_id is in orders table with total_amount > 500.",
      "referenceSql": "-- Complete this query"
    },
    {
      "id": 5,
      "prompt": "<strong>Practice Task: Above Cost Products</strong><br/>Identify products with markups above average. Retrieve products where unit_price - cost_price > (SELECT AVG(unit_price - cost_price) FROM products).",
      "referenceSql": "-- Complete this query"
    },
    {
      "id": 6,
      "prompt": "<strong>Practice Task: Recent Buyers Contact</strong><br/>Retrieve email and region for customers who placed orders in 2024 using a subquery.",
      "referenceSql": "SELECT email, region FROM customers WHERE region IN ('North', 'East');"
    }
  ],
  "testQuestions": [
    {
      "id": 1,
      "prompt": "Find all employees who earn more than the overall average salary using a subquery.",
      "ref": "SELECT * FROM employees WHERE salary > (SELECT AVG(salary) FROM employees);"
    },
    {
      "id": 2,
      "prompt": "Find all employees who earn more than the overall average salary using a subquery.",
      "ref": "SELECT * FROM employees WHERE salary > (SELECT AVG(salary) FROM employees);"
    },
    {
      "id": 3,
      "prompt": "Find all employees who earn more than the overall average salary using a subquery.",
      "ref": "SELECT * FROM employees WHERE salary > (SELECT AVG(salary) FROM employees);"
    },
    {
      "id": 4,
      "prompt": "Find all employees who earn more than the overall average salary using a subquery.",
      "ref": "SELECT * FROM employees WHERE salary > (SELECT AVG(salary) FROM employees);"
    },
    {
      "id": 5,
      "prompt": "Find all employees who earn more than the overall average salary using a subquery.",
      "ref": "SELECT * FROM employees WHERE salary > (SELECT AVG(salary) FROM employees);"
    },
    {
      "id": 6,
      "prompt": "Find all employees who earn more than the overall average salary using a subquery.",
      "ref": "SELECT * FROM employees WHERE salary > (SELECT AVG(salary) FROM employees);"
    },
    {
      "id": 7,
      "prompt": "Find all employees who earn more than the overall average salary using a subquery.",
      "ref": "SELECT * FROM employees WHERE salary > (SELECT AVG(salary) FROM employees);"
    },
    {
      "id": 8,
      "prompt": "Find all employees who earn more than the overall average salary using a subquery.",
      "ref": "SELECT * FROM employees WHERE salary > (SELECT AVG(salary) FROM employees);"
    },
    {
      "id": 9,
      "prompt": "Find all employees who earn more than the overall average salary using a subquery.",
      "ref": "SELECT * FROM employees WHERE salary > (SELECT AVG(salary) FROM employees);"
    },
    {
      "id": 10,
      "prompt": "Find all employees who earn more than the overall average salary using a subquery.",
      "ref": "SELECT * FROM employees WHERE salary > (SELECT AVG(salary) FROM employees);"
    },
    {
      "id": 11,
      "prompt": "Find all employees who earn more than the overall average salary using a subquery.",
      "ref": "SELECT * FROM employees WHERE salary > (SELECT AVG(salary) FROM employees);"
    },
    {
      "id": 12,
      "prompt": "Find all employees who earn more than the overall average salary using a subquery.",
      "ref": "SELECT * FROM employees WHERE salary > (SELECT AVG(salary) FROM employees);"
    },
    {
      "id": 13,
      "prompt": "Find all employees who earn more than the overall average salary using a subquery.",
      "ref": "SELECT * FROM employees WHERE salary > (SELECT AVG(salary) FROM employees);"
    },
    {
      "id": 14,
      "prompt": "Find all employees who earn more than the overall average salary using a subquery.",
      "ref": "SELECT * FROM employees WHERE salary > (SELECT AVG(salary) FROM employees);"
    },
    {
      "id": 15,
      "prompt": "Find all employees who earn more than the overall average salary using a subquery.",
      "ref": "SELECT * FROM employees WHERE salary > (SELECT AVG(salary) FROM employees);"
    },
    {
      "id": 16,
      "prompt": "Find all employees who earn more than the overall average salary using a subquery.",
      "ref": "SELECT * FROM employees WHERE salary > (SELECT AVG(salary) FROM employees);"
    },
    {
      "id": 17,
      "prompt": "Find all employees who earn more than the overall average salary using a subquery.",
      "ref": "SELECT * FROM employees WHERE salary > (SELECT AVG(salary) FROM employees);"
    },
    {
      "id": 18,
      "prompt": "Find all employees who earn more than the overall average salary using a subquery.",
      "ref": "SELECT * FROM employees WHERE salary > (SELECT AVG(salary) FROM employees);"
    },
    {
      "id": 19,
      "prompt": "Find all employees who earn more than the overall average salary using a subquery.",
      "ref": "SELECT * FROM employees WHERE salary > (SELECT AVG(salary) FROM employees);"
    },
    {
      "id": 20,
      "prompt": "Find all employees who earn more than the overall average salary using a subquery.",
      "ref": "SELECT * FROM employees WHERE salary > (SELECT AVG(salary) FROM employees);"
    },
    {
      "id": 21,
      "prompt": "Find all employees who earn more than the overall average salary using a subquery.",
      "ref": "SELECT * FROM employees WHERE salary > (SELECT AVG(salary) FROM employees);"
    },
    {
      "id": 22,
      "prompt": "Find all employees who earn more than the overall average salary using a subquery.",
      "ref": "SELECT * FROM employees WHERE salary > (SELECT AVG(salary) FROM employees);"
    },
    {
      "id": 23,
      "prompt": "Find all employees who earn more than the overall average salary using a subquery.",
      "ref": "SELECT * FROM employees WHERE salary > (SELECT AVG(salary) FROM employees);"
    },
    {
      "id": 24,
      "prompt": "Find all employees who earn more than the overall average salary using a subquery.",
      "ref": "SELECT * FROM employees WHERE salary > (SELECT AVG(salary) FROM employees);"
    },
    {
      "id": 25,
      "prompt": "Find all employees who earn more than the overall average salary using a subquery.",
      "ref": "SELECT * FROM employees WHERE salary > (SELECT AVG(salary) FROM employees);"
    }
  ],
  "topics": [
    {
      "id": "topic-1",
      "label": "Topic 1: Subqueries",
      "recordingKey": null
    }
  ]
};
