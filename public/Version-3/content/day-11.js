// Day 11 Content
if (!window.COURSE_CONTENT) window.COURSE_CONTENT = {};
window.COURSE_CONTENT['day11'] = {
  "day": 11,
  "title": "SELF JOIN & Multi-Table Queries",
  "db": "retail",
  "emoji": "\ud83d\udc65",
  "slides": [
    {
      "title": "Topic 01: SELF JOIN & Multi-Table Queries",
      "duration": "0:00",
      "html": "\n            <h2>\ud83d\udc65 Topic 01: SELF JOIN & Multi-Table Queries</h2>\n            <div class=\"slide-section\">\n              <h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">What is a SELF JOIN?</h3>\n<p style=\"color:#cbd5e1;line-height:1.75;margin:10px 0;\">A SELF JOIN is when a table is joined to <strong style=\"color:#f1f5f9;\">itself</strong>. This is necessary when a table has a <strong style=\"color:#f1f5f9;\">hierarchical or recursive relationship</strong> \u2014 the most common being an employees table where each employee has a <code style=\"background:#1e2d40;color:#7dd3fc;padding:2px 6px;border-radius:3px;font-family:JetBrains Mono,monospace;font-size:0.88em;\">manager_id</code> that references another <code style=\"background:#1e2d40;color:#7dd3fc;padding:2px 6px;border-radius:3px;font-family:JetBrains Mono,monospace;font-size:0.88em;\">employee_id</code> in the same table.</p>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">-- Employee table has: employee_id, first_name, manager_id\n-- manager_id references employee_id of the manager (who is also an employee)\n\n-- Self JOIN to show employee + their manager's name\nSELECT\n    e.employee_id,\n    e.first_name    AS employee_name,\n    e.salary        AS employee_salary,\n    m.first_name    AS manager_name\nFROM employees e            -- e = the employee\nINNER JOIN employees m      -- m = the same table, representing the manager\n    ON e.manager_id = m.employee_id;\n\n-- Use LEFT JOIN to include top-level employees (who have no manager):\nSELECT\n    e.first_name   AS employee_name,\n    COALESCE(m.first_name, 'Top-Level') AS manager_name\nFROM employees e\nLEFT JOIN employees m\n    ON e.manager_id = m.employee_id;</code></pre>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">Finding Peers (employees in the same department)</h3>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">-- Find all pairs of employees in the same department\nSELECT\n    a.first_name AS employee1,\n    b.first_name AS employee2,\n    a.department_id\nFROM employees a\nINNER JOIN employees b\n    ON a.department_id = b.department_id\n   AND a.employee_id &lt; b.employee_id;  -- Prevent duplicates and self-pairing\n-- a.employee_id &lt; b.employee_id ensures (Alice, Bob) appears but not (Bob, Alice) or (Alice, Alice)</code></pre>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">Multi-Table Queries \u2014 Best Practices</h3>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">-- Joining 4+ tables: define relationships clearly\nSELECT\n    o.order_id,\n    c.customer_name,\n    p.product_name,\n    oi.quantity,\n    oi.unit_price,\n    oi.quantity * oi.unit_price AS line_total,\n    e.first_name AS sales_rep\nFROM orders o\nINNER JOIN customers c     ON o.customer_id = c.customer_id\nINNER JOIN order_items oi  ON o.order_id = oi.order_id\nINNER JOIN products p      ON oi.product_id = p.product_id\nLEFT JOIN employees e      ON o.sales_rep_id = e.employee_id;  -- LEFT: some orders may have no rep</code></pre>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">CROSS JOIN \u2014 All Combinations</h3>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">-- Generates every combination of rows from two tables\nSELECT a.size, b.color\nFROM sizes a\nCROSS JOIN colors b;\n-- 5 sizes \u00d7 4 colors = 20 combination rows\n\n-- Real use case: generate a date range or all possible category combinations\nSELECT d.date, p.product_id\nFROM date_dimension d\nCROSS JOIN products p\nWHERE d.date BETWEEN '2024-01-01' AND '2024-12-31';</code></pre>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">LATERAL JOIN (PostgreSQL) / APPLY (SQL Server)</h3>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">-- LATERAL allows the right side to reference columns from the left table\nSELECT e.first_name, e.salary, latest_order.order_date\nFROM employees e\nCROSS JOIN LATERAL (\n    SELECT order_date\n    FROM orders o\n    WHERE o.sales_rep_id = e.employee_id\n    ORDER BY order_date DESC\n    LIMIT 1\n) latest_order;</code></pre>\n<hr style=\"border:none;border-top:1px solid #1e293b;margin:24px 0;\">\n            </div>\n            "
    }
  ],
  "practiceQuestions": [
    {
      "id": 1,
      "prompt": "Write a self join query to display employee names and their manager's name from the employees table.",
      "referenceSql": "SELECT e.first_name AS employee, m.first_name AS manager FROM employees e LEFT JOIN employees m ON e.manager_id = m.employee_id;"
    },
    {
      "id": 2,
      "prompt": "Write a self join query to find employees who earn more than their manager.",
      "referenceSql": "SELECT e.first_name, e.salary, m.first_name, m.salary FROM employees e INNER JOIN employees m ON e.manager_id = m.employee_id WHERE e.salary > m.salary;"
    },
    {
      "id": 3,
      "prompt": "Write a self join to find pairs of employees working in the same department (exclude self-pairings).",
      "referenceSql": "SELECT e1.first_name, e2.first_name, e1.department_id FROM employees e1 INNER JOIN employees e2 ON e1.department_id = e2.department_id WHERE e1.employee_id < e2.employee_id;"
    },
    {
      "id": 4,
      "prompt": "<strong>Practice Task: Manager Hierarchies</strong><br/>The HR team wants employee roster with managers. Return first_name and manager_name. Display 'CEO' if manager_id is NULL.",
      "referenceSql": "-- Complete this query"
    },
    {
      "id": 5,
      "prompt": "<strong>Practice Task: Department Cohorts</strong><br/>Find pairs of employees hired in the same year. Retrieve employee_id, name, and hire_date.",
      "referenceSql": "-- Complete this query"
    },
    {
      "id": 6,
      "prompt": "<strong>Practice Task: Salary Peer Audit</strong><br/>Join employees to find pairs in the same department who have identical salaries.",
      "referenceSql": "-- Complete this query"
    }
  ],
  "testQuestions": [
    {
      "id": 1,
      "prompt": "Retrieve employee first_name and their manager's first_name via a self-join.",
      "ref": "SELECT e.first_name AS emp, m.first_name AS mgr FROM employees e LEFT JOIN employees m ON e.manager_id = m.employee_id;"
    },
    {
      "id": 2,
      "prompt": "Retrieve employee first_name and their manager's first_name via a self-join.",
      "ref": "SELECT e.first_name AS emp, m.first_name AS mgr FROM employees e LEFT JOIN employees m ON e.manager_id = m.employee_id;"
    },
    {
      "id": 3,
      "prompt": "Retrieve employee first_name and their manager's first_name via a self-join.",
      "ref": "SELECT e.first_name AS emp, m.first_name AS mgr FROM employees e LEFT JOIN employees m ON e.manager_id = m.employee_id;"
    },
    {
      "id": 4,
      "prompt": "Retrieve employee first_name and their manager's first_name via a self-join.",
      "ref": "SELECT e.first_name AS emp, m.first_name AS mgr FROM employees e LEFT JOIN employees m ON e.manager_id = m.employee_id;"
    },
    {
      "id": 5,
      "prompt": "Retrieve employee first_name and their manager's first_name via a self-join.",
      "ref": "SELECT e.first_name AS emp, m.first_name AS mgr FROM employees e LEFT JOIN employees m ON e.manager_id = m.employee_id;"
    },
    {
      "id": 6,
      "prompt": "Retrieve employee first_name and their manager's first_name via a self-join.",
      "ref": "SELECT e.first_name AS emp, m.first_name AS mgr FROM employees e LEFT JOIN employees m ON e.manager_id = m.employee_id;"
    },
    {
      "id": 7,
      "prompt": "Retrieve employee first_name and their manager's first_name via a self-join.",
      "ref": "SELECT e.first_name AS emp, m.first_name AS mgr FROM employees e LEFT JOIN employees m ON e.manager_id = m.employee_id;"
    },
    {
      "id": 8,
      "prompt": "Retrieve employee first_name and their manager's first_name via a self-join.",
      "ref": "SELECT e.first_name AS emp, m.first_name AS mgr FROM employees e LEFT JOIN employees m ON e.manager_id = m.employee_id;"
    },
    {
      "id": 9,
      "prompt": "Retrieve employee first_name and their manager's first_name via a self-join.",
      "ref": "SELECT e.first_name AS emp, m.first_name AS mgr FROM employees e LEFT JOIN employees m ON e.manager_id = m.employee_id;"
    },
    {
      "id": 10,
      "prompt": "Retrieve employee first_name and their manager's first_name via a self-join.",
      "ref": "SELECT e.first_name AS emp, m.first_name AS mgr FROM employees e LEFT JOIN employees m ON e.manager_id = m.employee_id;"
    },
    {
      "id": 11,
      "prompt": "Retrieve employee first_name and their manager's first_name via a self-join.",
      "ref": "SELECT e.first_name AS emp, m.first_name AS mgr FROM employees e LEFT JOIN employees m ON e.manager_id = m.employee_id;"
    },
    {
      "id": 12,
      "prompt": "Retrieve employee first_name and their manager's first_name via a self-join.",
      "ref": "SELECT e.first_name AS emp, m.first_name AS mgr FROM employees e LEFT JOIN employees m ON e.manager_id = m.employee_id;"
    },
    {
      "id": 13,
      "prompt": "Retrieve employee first_name and their manager's first_name via a self-join.",
      "ref": "SELECT e.first_name AS emp, m.first_name AS mgr FROM employees e LEFT JOIN employees m ON e.manager_id = m.employee_id;"
    },
    {
      "id": 14,
      "prompt": "Retrieve employee first_name and their manager's first_name via a self-join.",
      "ref": "SELECT e.first_name AS emp, m.first_name AS mgr FROM employees e LEFT JOIN employees m ON e.manager_id = m.employee_id;"
    },
    {
      "id": 15,
      "prompt": "Retrieve employee first_name and their manager's first_name via a self-join.",
      "ref": "SELECT e.first_name AS emp, m.first_name AS mgr FROM employees e LEFT JOIN employees m ON e.manager_id = m.employee_id;"
    },
    {
      "id": 16,
      "prompt": "Retrieve employee first_name and their manager's first_name via a self-join.",
      "ref": "SELECT e.first_name AS emp, m.first_name AS mgr FROM employees e LEFT JOIN employees m ON e.manager_id = m.employee_id;"
    },
    {
      "id": 17,
      "prompt": "Retrieve employee first_name and their manager's first_name via a self-join.",
      "ref": "SELECT e.first_name AS emp, m.first_name AS mgr FROM employees e LEFT JOIN employees m ON e.manager_id = m.employee_id;"
    },
    {
      "id": 18,
      "prompt": "Retrieve employee first_name and their manager's first_name via a self-join.",
      "ref": "SELECT e.first_name AS emp, m.first_name AS mgr FROM employees e LEFT JOIN employees m ON e.manager_id = m.employee_id;"
    },
    {
      "id": 19,
      "prompt": "Retrieve employee first_name and their manager's first_name via a self-join.",
      "ref": "SELECT e.first_name AS emp, m.first_name AS mgr FROM employees e LEFT JOIN employees m ON e.manager_id = m.employee_id;"
    },
    {
      "id": 20,
      "prompt": "Retrieve employee first_name and their manager's first_name via a self-join.",
      "ref": "SELECT e.first_name AS emp, m.first_name AS mgr FROM employees e LEFT JOIN employees m ON e.manager_id = m.employee_id;"
    },
    {
      "id": 21,
      "prompt": "Retrieve employee first_name and their manager's first_name via a self-join.",
      "ref": "SELECT e.first_name AS emp, m.first_name AS mgr FROM employees e LEFT JOIN employees m ON e.manager_id = m.employee_id;"
    },
    {
      "id": 22,
      "prompt": "Retrieve employee first_name and their manager's first_name via a self-join.",
      "ref": "SELECT e.first_name AS emp, m.first_name AS mgr FROM employees e LEFT JOIN employees m ON e.manager_id = m.employee_id;"
    },
    {
      "id": 23,
      "prompt": "Retrieve employee first_name and their manager's first_name via a self-join.",
      "ref": "SELECT e.first_name AS emp, m.first_name AS mgr FROM employees e LEFT JOIN employees m ON e.manager_id = m.employee_id;"
    },
    {
      "id": 24,
      "prompt": "Retrieve employee first_name and their manager's first_name via a self-join.",
      "ref": "SELECT e.first_name AS emp, m.first_name AS mgr FROM employees e LEFT JOIN employees m ON e.manager_id = m.employee_id;"
    },
    {
      "id": 25,
      "prompt": "Retrieve employee first_name and their manager's first_name via a self-join.",
      "ref": "SELECT e.first_name AS emp, m.first_name AS mgr FROM employees e LEFT JOIN employees m ON e.manager_id = m.employee_id;"
    }
  ],
  "topics": [
    {
      "id": "topic-1",
      "label": "Topic 1: SELF JOIN & Multi-Table Queries",
      "recordingKey": null
    }
  ]
};
