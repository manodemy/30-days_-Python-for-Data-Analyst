// Day 18 Content
if (!window.COURSE_CONTENT) window.COURSE_CONTENT = {};
window.COURSE_CONTENT['day18'] = {
  "day": 18,
  "title": "UNION, INTERSECT & EXCEPT (SET Operations)",
  "db": "retail",
  "emoji": "\ud83e\udd5e",
  "slides": [
    {
      "title": "Topic 01: UNION, INTERSECT & EXCEPT (SET Operations)",
      "duration": "0:00",
      "html": "\n            <h2>\ud83e\udd5e Topic 01: UNION, INTERSECT & EXCEPT (SET Operations)</h2>\n            <div class=\"slide-section\">\n              <h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">What are Set Operations?</h3>\n<p style=\"color:#cbd5e1;line-height:1.75;margin:10px 0;\">Set operations combine the result sets of two or more SELECT queries into a single result. They operate on the <strong style=\"color:#f1f5f9;\">entire result sets</strong> (unlike JOINs which operate row-by-row).</p>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">Rules for All Set Operations</h3>\n<p style=\"color:#cbd5e1;line-height:1.75;margin:10px 0;\">1. <strong style=\"color:#f1f5f9;\">Same number of columns</strong> in all SELECT statements</p>\n<p style=\"color:#cbd5e1;line-height:1.75;margin:10px 0;\">2. <strong style=\"color:#f1f5f9;\">Compatible data types</strong> in corresponding columns</p>\n<p style=\"color:#cbd5e1;line-height:1.75;margin:10px 0;\">3. <strong style=\"color:#f1f5f9;\">Column names</strong> are taken from the first SELECT statement</p>\n<p style=\"color:#cbd5e1;line-height:1.75;margin:10px 0;\">4. <code style=\"background:#1e2d40;color:#7dd3fc;padding:2px 6px;border-radius:3px;font-family:JetBrains Mono,monospace;font-size:0.88em;\">ORDER BY</code> can only appear <strong style=\"color:#f1f5f9;\">once, at the very end</strong> of the final combined query</p>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">UNION \u2014 Combine and Remove Duplicates</h3>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">-- Returns all distinct rows from either query\nSELECT employee_id, first_name, 'Active' AS source\nFROM active_employees\nUNION\nSELECT employee_id, first_name, 'Archived' AS source\nFROM archived_employees;\n-- Duplicates are REMOVED (expensive \u2014 sorts the result)</code></pre>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">UNION ALL \u2014 Combine Without Removing Duplicates</h3>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">-- Returns ALL rows including duplicates (much faster than UNION)\nSELECT customer_id FROM orders_2023\nUNION ALL\nSELECT customer_id FROM orders_2024;\n-- Use UNION ALL when you know there are no duplicates (or when duplicates are desired)\n-- ALWAYS prefer UNION ALL for performance unless deduplication is required</code></pre>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">INTERSECT \u2014 Common Rows in Both Queries</h3>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">-- Returns only rows that appear in BOTH result sets\nSELECT customer_id FROM orders_2023\nINTERSECT\nSELECT customer_id FROM orders_2024;\n-- Customers who ordered in BOTH 2023 AND 2024 (returning customers)</code></pre>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">EXCEPT (MINUS in Oracle) \u2014 Rows in First but Not Second</h3>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">-- Returns rows from the first query that do NOT appear in the second\nSELECT customer_id FROM customers\nEXCEPT\nSELECT customer_id FROM orders;\n-- Customers who have NEVER placed an order\n-- Equivalent to LEFT JOIN anti-join pattern</code></pre>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">Real-World Use Cases</h3>\n<h4 style=\"color:#7dd3fc;margin:20px 0 8px;font-size:1em;font-weight:600;\">UNION for Report Consolidation</h4>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">-- Combine sales data from multiple regions into one report\nSELECT region, product_id, SUM(sales) AS total_sales\nFROM north_region_sales\nGROUP BY region, product_id\nUNION ALL\nSELECT region, product_id, SUM(sales) AS total_sales\nFROM south_region_sales\nGROUP BY region, product_id\nORDER BY region, total_sales DESC;</code></pre>\n<h4 style=\"color:#7dd3fc;margin:20px 0 8px;font-size:1em;font-weight:600;\">UNION ALL for Time-Based Comparisons</h4>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">-- Year-over-year comparison in one result set\nSELECT 2023 AS year, COUNT(*) AS signups FROM signups_2023\nUNION ALL\nSELECT 2024 AS year, COUNT(*) AS signups FROM signups_2024;</code></pre>\n<h4 style=\"color:#7dd3fc;margin:20px 0 8px;font-size:1em;font-weight:600;\">EXCEPT for Data Quality / Delta Detection</h4>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">-- Find records in source that are missing from target (data migration validation)\nSELECT employee_id FROM source_database.employees\nEXCEPT\nSELECT employee_id FROM target_database.employees;</code></pre>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">UNION vs. JOIN \u2014 Critical Difference</h3>\n<div style=\"overflow-x:auto;margin:16px 0;\"><table style=\"border-collapse:collapse;width:100%;font-size:0.9em;color:#e2e8f0;background:#0b1120;\">\n<tr><td style=\"border:1px solid #1e293b;padding:8px 12px;background:#0b1120;color:#e2e8f0;\"><strong style=\"color:#f1f5f9;\">Direction</strong></td><td style=\"border:1px solid #1e293b;padding:8px 12px;background:#0b1120;color:#e2e8f0;\">Vertical (stacks rows)</td><td style=\"border:1px solid #1e293b;padding:8px 12px;background:#0b1120;color:#e2e8f0;\">Horizontal (adds columns)</td></tr>\n<tr><td style=\"border:1px solid #1e293b;padding:8px 12px;background:#0b1120;color:#e2e8f0;\"><strong style=\"color:#f1f5f9;\">Requirement</strong></td><td style=\"border:1px solid #1e293b;padding:8px 12px;background:#0b1120;color:#e2e8f0;\">Same column count/types</td><td style=\"border:1px solid #1e293b;padding:8px 12px;background:#0b1120;color:#e2e8f0;\">Related key columns</td></tr>\n<tr><td style=\"border:1px solid #1e293b;padding:8px 12px;background:#0b1120;color:#e2e8f0;\"><strong style=\"color:#f1f5f9;\">Use case</strong></td><td style=\"border:1px solid #1e293b;padding:8px 12px;background:#0b1120;color:#e2e8f0;\">Combine same-structured data</td><td style=\"border:1px solid #1e293b;padding:8px 12px;background:#0b1120;color:#e2e8f0;\">Enrich data from related tables</td></tr>\n</table></div>\n<h3 style=\"color:#a5b4fc;margin:28px 0 10px;font-size:1.05em;font-weight:700;border-bottom:1px solid #1e293b;padding-bottom:6px;\">ORDER BY with Set Operations</h3>\n<pre style=\"background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:16px;overflow-x:auto;margin:16px 0;\"><code class=\"language-sql\" style=\"color:#e6edf3;font-family:JetBrains Mono,monospace;font-size:0.88em;white-space:pre;\">-- ORDER BY goes LAST, after all UNIONs, and references column names from first SELECT\nSELECT employee_id, first_name FROM active_employees\nUNION ALL\nSELECT employee_id, first_name FROM archived_employees\nORDER BY first_name ASC;  -- \u2705 Valid \u2014 references column from first SELECT\n\n-- OR use positional reference\nORDER BY 2 ASC;  -- Sort by 2nd column (first_name)</code></pre>\n<hr style=\"border:none;border-top:1px solid #1e293b;margin:24px 0;\">\n            </div>\n            "
    }
  ],
  "practiceQuestions": [
    {
      "id": 1,
      "prompt": "Write a query to combine first_name from active_employees and archived_employees using UNION.",
      "referenceSql": "SELECT first_name FROM active_employees UNION SELECT first_name FROM archived_employees;"
    },
    {
      "id": 2,
      "prompt": "Write a query to find employee first_names that exist in both active_employees and archived_employees using INTERSECT.",
      "referenceSql": "SELECT first_name FROM active_employees INTERSECT SELECT first_name FROM archived_employees;"
    },
    {
      "id": 3,
      "prompt": "Write a query to find employee first_names in active_employees that do NOT exist in archived_employees using EXCEPT.",
      "referenceSql": "SELECT first_name FROM active_employees EXCEPT SELECT first_name FROM archived_employees;"
    },
    {
      "id": 4,
      "prompt": "<strong>Practice Task: Total Staff Pool</strong><br/>Combine active_employees and archived_employees first_name, keeping duplicates using UNION ALL.",
      "referenceSql": "-- Complete this query"
    },
    {
      "id": 5,
      "prompt": "<strong>Practice Task: Overlap Audit</strong><br/>Find duplicate first_names appearing in both active and archived lists using INTERSECT.",
      "referenceSql": "-- Complete this query"
    },
    {
      "id": 6,
      "prompt": "<strong>Practice Task: Exclusively Active Staff</strong><br/>List employee_id of employees in active_employees who are not in archived_employees.",
      "referenceSql": "-- Complete this query"
    }
  ],
  "testQuestions": [
    {
      "id": 1,
      "prompt": "Perform a UNION of first_name columns between the active_employees and archived_employees tables.",
      "ref": "SELECT first_name FROM active_employees UNION SELECT first_name FROM archived_employees;"
    },
    {
      "id": 2,
      "prompt": "Perform a UNION of first_name columns between the active_employees and archived_employees tables.",
      "ref": "SELECT first_name FROM active_employees UNION SELECT first_name FROM archived_employees;"
    },
    {
      "id": 3,
      "prompt": "Perform a UNION of first_name columns between the active_employees and archived_employees tables.",
      "ref": "SELECT first_name FROM active_employees UNION SELECT first_name FROM archived_employees;"
    },
    {
      "id": 4,
      "prompt": "Perform a UNION of first_name columns between the active_employees and archived_employees tables.",
      "ref": "SELECT first_name FROM active_employees UNION SELECT first_name FROM archived_employees;"
    },
    {
      "id": 5,
      "prompt": "Perform a UNION of first_name columns between the active_employees and archived_employees tables.",
      "ref": "SELECT first_name FROM active_employees UNION SELECT first_name FROM archived_employees;"
    },
    {
      "id": 6,
      "prompt": "Perform a UNION of first_name columns between the active_employees and archived_employees tables.",
      "ref": "SELECT first_name FROM active_employees UNION SELECT first_name FROM archived_employees;"
    },
    {
      "id": 7,
      "prompt": "Perform a UNION of first_name columns between the active_employees and archived_employees tables.",
      "ref": "SELECT first_name FROM active_employees UNION SELECT first_name FROM archived_employees;"
    },
    {
      "id": 8,
      "prompt": "Perform a UNION of first_name columns between the active_employees and archived_employees tables.",
      "ref": "SELECT first_name FROM active_employees UNION SELECT first_name FROM archived_employees;"
    },
    {
      "id": 9,
      "prompt": "Perform a UNION of first_name columns between the active_employees and archived_employees tables.",
      "ref": "SELECT first_name FROM active_employees UNION SELECT first_name FROM archived_employees;"
    },
    {
      "id": 10,
      "prompt": "Perform a UNION of first_name columns between the active_employees and archived_employees tables.",
      "ref": "SELECT first_name FROM active_employees UNION SELECT first_name FROM archived_employees;"
    },
    {
      "id": 11,
      "prompt": "Perform a UNION of first_name columns between the active_employees and archived_employees tables.",
      "ref": "SELECT first_name FROM active_employees UNION SELECT first_name FROM archived_employees;"
    },
    {
      "id": 12,
      "prompt": "Perform a UNION of first_name columns between the active_employees and archived_employees tables.",
      "ref": "SELECT first_name FROM active_employees UNION SELECT first_name FROM archived_employees;"
    },
    {
      "id": 13,
      "prompt": "Perform a UNION of first_name columns between the active_employees and archived_employees tables.",
      "ref": "SELECT first_name FROM active_employees UNION SELECT first_name FROM archived_employees;"
    },
    {
      "id": 14,
      "prompt": "Perform a UNION of first_name columns between the active_employees and archived_employees tables.",
      "ref": "SELECT first_name FROM active_employees UNION SELECT first_name FROM archived_employees;"
    },
    {
      "id": 15,
      "prompt": "Perform a UNION of first_name columns between the active_employees and archived_employees tables.",
      "ref": "SELECT first_name FROM active_employees UNION SELECT first_name FROM archived_employees;"
    },
    {
      "id": 16,
      "prompt": "Perform a UNION of first_name columns between the active_employees and archived_employees tables.",
      "ref": "SELECT first_name FROM active_employees UNION SELECT first_name FROM archived_employees;"
    },
    {
      "id": 17,
      "prompt": "Perform a UNION of first_name columns between the active_employees and archived_employees tables.",
      "ref": "SELECT first_name FROM active_employees UNION SELECT first_name FROM archived_employees;"
    },
    {
      "id": 18,
      "prompt": "Perform a UNION of first_name columns between the active_employees and archived_employees tables.",
      "ref": "SELECT first_name FROM active_employees UNION SELECT first_name FROM archived_employees;"
    },
    {
      "id": 19,
      "prompt": "Perform a UNION of first_name columns between the active_employees and archived_employees tables.",
      "ref": "SELECT first_name FROM active_employees UNION SELECT first_name FROM archived_employees;"
    },
    {
      "id": 20,
      "prompt": "Perform a UNION of first_name columns between the active_employees and archived_employees tables.",
      "ref": "SELECT first_name FROM active_employees UNION SELECT first_name FROM archived_employees;"
    },
    {
      "id": 21,
      "prompt": "Perform a UNION of first_name columns between the active_employees and archived_employees tables.",
      "ref": "SELECT first_name FROM active_employees UNION SELECT first_name FROM archived_employees;"
    },
    {
      "id": 22,
      "prompt": "Perform a UNION of first_name columns between the active_employees and archived_employees tables.",
      "ref": "SELECT first_name FROM active_employees UNION SELECT first_name FROM archived_employees;"
    },
    {
      "id": 23,
      "prompt": "Perform a UNION of first_name columns between the active_employees and archived_employees tables.",
      "ref": "SELECT first_name FROM active_employees UNION SELECT first_name FROM archived_employees;"
    },
    {
      "id": 24,
      "prompt": "Perform a UNION of first_name columns between the active_employees and archived_employees tables.",
      "ref": "SELECT first_name FROM active_employees UNION SELECT first_name FROM archived_employees;"
    },
    {
      "id": 25,
      "prompt": "Perform a UNION of first_name columns between the active_employees and archived_employees tables.",
      "ref": "SELECT first_name FROM active_employees UNION SELECT first_name FROM archived_employees;"
    }
  ],
  "topics": [
    {
      "id": "topic-1",
      "label": "Topic 1: UNION, INTERSECT & EXCEPT (SET Operations)",
      "recordingKey": null
    }
  ]
};
