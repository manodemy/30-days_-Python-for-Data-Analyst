// Day 05 — Aggregate Functions: Turning Rows into Insights
if (!window.COURSE_CONTENT) window.COURSE_CONTENT = {};
window.COURSE_CONTENT['day05'] = {
  "day": 5,
  "title": "Aggregate Functions: COUNT & SUM",
  "db": "retail",
  "emoji": "\ud83d\udcca",
  "slides": [
    {
      "title": "Aggregate Functions \u2014 Turning Rows into Insights",
      "duration": "7:30",
      "html": "<h2>\ud83d\udcca Aggregate Functions \u2014 Turning Rows into Insights</h2>\n\n        <!-- \u2500\u2500 Section 01: Why Aggregation Matters \u2500\u2500 -->\n        <div class=\"slide-section\" id=\"day05WhyAggSection\">\n          <h3 class=\"heading-with-audio\" id=\"day05WhyAgg\">\n            01. Why Aggregation Matters \u2014 From Rows to KPIs\n          </h3>\n          <p>Database tables store individual transactional rows. Business stakeholders and executive dashboards need <strong>high-level summary metrics</strong>. Aggregate functions take <strong>N input rows</strong> and collapse them into <strong>1 output metric</strong>.</p>\n        </div>\n\n        <div class=\"slide-section\" id=\"day05AggRefTableSection\">\n          <div class=\"db-mock-table-wrap\" id=\"day05AggRefTable\">\n            <div style=\"display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 6px; padding: 0 4px;\">\n              <h4 style=\"margin: 0; font-size: 1.0rem; font-weight: 800; letter-spacing: -0.015em; flex: 1;\">The Big 5 Aggregate Functions Reference</h4>\n            </div>\n            <table class=\"db-table-mock db-table-mock--compact\">\n              <thead><tr><th>Function</th><th>Purpose</th><th>NULL Handling</th><th>Analyst Use Case</th></tr></thead>\n              <tbody>\n                <tr id=\"day05AggRow1\"><td><code>COUNT(*)</code></td><td>Total row count</td><td>Counts ALL rows (including NULLs)</td><td>Total orders / signups</td></tr>\n                <tr id=\"day05AggRow2\"><td><code>COUNT(col)</code></td><td>Count populated rows</td><td><strong>Ignores NULLs</strong></td><td>Verified emails / commissions</td></tr>\n                <tr id=\"day05AggRow3\"><td><code>SUM(col)</code></td><td>Total sum of column</td><td><strong>Ignores NULLs</strong></td><td>Gross revenue / total payroll</td></tr>\n                <tr id=\"day05AggRow4\"><td><code>AVG(col)</code></td><td>Arithmetic mean</td><td><strong>Ignores NULLs</strong> in divisor</td><td>Average Order Value (AOV)</td></tr>\n                <tr id=\"day05AggRow5\"><td><code>MIN(col)</code> / <code>MAX(col)</code></td><td>Smallest / Largest value</td><td><strong>Ignores NULLs</strong></td><td>Earliest order / Top salary</td></tr>\n              </tbody>\n            </table>\n          </div>\n        </div>\n\n        <div class=\"slide-section\" id=\"day05FiveAggsSection\">\n          <div class=\"info-box\" id=\"day05FiveAggs\">\n            <div style=\"display: flex; align-items: center; gap: 8px; margin-bottom: 4px; width: 100%;\">\n              <strong style=\"color:var(--ink-teal); flex: 1;\">\ud83d\udca1 Core Rule of Thumb:</strong>\n            </div>\n            <p style=\"margin: 0;\"><strong>Every aggregate function ignores NULL values</strong> \u2014 except <code>COUNT(*)</code>, which always counts the physical rows.</p>\n          </div>\n        </div>\n\n        <!-- \u2500\u2500 Section 02: COUNT Variations \u2500\u2500 -->\n        <div class=\"slide-section\" id=\"day05CountSection\">\n          <h3 class=\"heading-with-audio\" id=\"day05Count\">\n            02. COUNT \u2014 Counting Rows vs Counting Values\n          </h3>\n          <p>Always choose your <code>COUNT</code> variant based on what you are measuring:</p>\n          <div class=\"vs-block\" style=\"margin-top: 8px;\">\n            <div class=\"vs-card\" id=\"day05CountCard1\" style=\"flex: 1;\">\n              <h4 style=\"margin: 0 0 4px; font-size: 0.88rem; color:var(--ink-info);\"><code>COUNT(*)</code></h4>\n              <p style=\"margin: 0; font-size: 0.82rem; line-height: 1.4;\"><strong>Volume:</strong> \"How many total records exist?\"</p>\n            </div>\n            <div class=\"vs-card\" id=\"day05CountCard2\" style=\"flex: 1;\">\n              <h4 style=\"margin: 0 0 4px; font-size: 0.88rem; color:var(--ink-info);\"><code>COUNT(col)</code></h4>\n              <p style=\"margin: 0; font-size: 0.82rem; line-height: 1.4;\"><strong>Completeness:</strong> \"How many rows have a value in this column?\"</p>\n            </div>\n            <div class=\"vs-card\" id=\"day05CountCard3\" style=\"flex: 1;\">\n              <h4 style=\"margin: 0 0 4px; font-size: 0.88rem; color:var(--ink-info);\"><code>COUNT(DISTINCT col)</code></h4>\n              <p style=\"margin: 0; font-size: 0.82rem; line-height: 1.4;\"><strong>Unique Entities:</strong> \"How many unique customers/departments?\"</p>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"slide-section\" id=\"day05CountExamplesSection\">\n          <div class=\"heading-with-audio\" style=\"display: flex; align-items: center; gap: 8px; margin-bottom: 6px; margin-top: 4px;\">\n            <h4 style=\"margin: 0; font-size: 1.0rem; font-weight: 800; letter-spacing: -0.015em; flex: 1;\">COUNT Variations in Practice</h4>\n          </div>\n          <div class=\"code-block-container\" id=\"day05CountExamples\">\n            <div class=\"code-subblock\" id=\"day05CountQuery1\">\n              <pre><code><span class=\"code-comment\">-- 1. Total headcount (counts all 15 rows)</span>\n<span class=\"kw\">SELECT</span> COUNT(*) <span class=\"kw\">AS</span> total_employees\n<span class=\"kw\">FROM</span>   employees;</code></pre>\n            </div>\n            <div class=\"code-subblock\" id=\"day05CountQuery2\">\n              <pre><code><span class=\"code-comment\">-- 2. Count staff with commissions (skips NULLs -> returns 6)</span>\n<span class=\"kw\">SELECT</span> COUNT(commission) <span class=\"kw\">AS</span> commission_earners\n<span class=\"kw\">FROM</span>   employees;</code></pre>\n            </div>\n            <div class=\"code-subblock\" id=\"day05CountQuery3\">\n              <pre><code><span class=\"code-comment\">-- 3. Count unique departments with active staff</span>\n<span class=\"kw\">SELECT</span> COUNT(DISTINCT department_id) <span class=\"kw\">AS</span> active_depts\n<span class=\"kw\">FROM</span>   employees;</code></pre>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"slide-section\" id=\"day05CountInfoSection\">\n          <div class=\"pro-tip-box\" id=\"day05CountInfo\">\n            <div style=\"display: flex; align-items: center; gap: 8px; margin-bottom: 4px; width: 100%;\">\n              <strong style=\"color:var(--ink-warn); flex: 1;\">\ud83d\udcca Data Quality Audit Formula:</strong>\n            </div>\n            <p style=\"margin: 0;\">Find missing/NULL values instantly: <code>COUNT(*) - COUNT(col) = Missing Rows</code>.</p>\n          </div>\n        </div>\n\n        <!-- \u2500\u2500 Section 03: SUM & AVG \u2500\u2500 -->\n        <div class=\"slide-section\" id=\"day05SumAvgSection\">\n          <h3 class=\"heading-with-audio\" id=\"day05SumAvg\">\n            03. SUM & AVG \u2014 The Dangerous NULL Denominator Trap\n          </h3>\n          <p><code>AVG(col)</code> calculates <code>SUM(col) / COUNT(col)</code>. It does <strong>not</strong> divide by <code>COUNT(*)</code>. If 4 out of 15 employees have NULL commissions, <code>AVG(commission)</code> divides by <strong>11</strong>, not 15.</p>\n        </div>\n\n        <div class=\"slide-section\" id=\"day05SumAvgCodeSection\">\n          <div class=\"heading-with-audio\" style=\"display: flex; align-items: center; gap: 8px; margin-bottom: 6px; margin-top: 4px;\">\n            <h4 style=\"margin: 0; font-size: 1.0rem; font-weight: 800; letter-spacing: -0.015em; flex: 1;\">Comparing Averages With &amp; Without NULLs</h4>\n          </div>\n          <div class=\"code-block-container\" id=\"day05SumAvgCode\">\n            <div class=\"code-subblock\" id=\"day05SumAvgQuery1\">\n              <pre><code><span class=\"code-comment\">-- 1. Summary stats across all employees</span>\n<span class=\"kw\">SELECT</span> SUM(salary) <span class=\"kw\">AS</span> payroll,\n       AVG(salary) <span class=\"kw\">AS</span> avg_sal,\n       MIN(salary) <span class=\"kw\">AS</span> min_sal,\n       MAX(salary) <span class=\"kw\">AS</span> max_sal\n<span class=\"kw\">FROM</span>   employees;</code></pre>\n            </div>\n            <div class=\"code-subblock\" id=\"day05SumAvgQuery2\">\n              <pre><code><span class=\"code-comment\">-- 2. Average among commission earners ONLY (divisor = 6)</span>\n<span class=\"kw\">SELECT</span> AVG(commission) <span class=\"kw\">AS</span> avg_earned_commission\n<span class=\"kw\">FROM</span>   employees;</code></pre>\n            </div>\n            <div class=\"code-subblock\" id=\"day05SumAvgQuery3\">\n              <pre><code><span class=\"code-comment\">-- 3. Average across ALL employees (treat NULL as 0 -> divisor = 15)</span>\n<span class=\"kw\">SELECT</span> AVG(COALESCE(commission, 0)) <span class=\"kw\">AS</span> avg_companywide_commission\n<span class=\"kw\">FROM</span>   employees;</code></pre>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"slide-section\" id=\"day05AvgNullWarnSection\">\n          <div class=\"warn-box\" id=\"day05AvgNullWarn\">\n            <div style=\"display: flex; align-items: center; gap: 8px; margin-bottom: 4px; width: 100%;\">\n              <strong style=\"color:var(--ink-neg); flex: 1;\">\u26a0\ufe0f Interview Gotcha:</strong>\n            </div>\n            <p style=\"margin: 0;\">When asked for <em>\"average bonus across the entire company\"</em>, always use <code>AVG(COALESCE(bonus, 0))</code> so employees with zero bonus are included in the denominator.</p>\n          </div>\n        </div>\n\n        <!-- \u2500\u2500 Section 04: COALESCE Safety Net \u2500\u2500 -->\n        <div class=\"slide-section\" id=\"day05CoalesceSection\">\n          <h3 class=\"heading-with-audio\" id=\"day05Coalesce\">\n            04. The COALESCE Safety Net \u2014 Inside vs Outside\n          </h3>\n          <p>Placing <code>COALESCE</code> <strong>inside</strong> vs <strong>outside</strong> an aggregate solves two completely different business problems:</p>\n        </div>\n\n        <div class=\"slide-section\" id=\"day05CoalesceCodeSection\">\n          <div class=\"heading-with-audio\" style=\"display: flex; align-items: center; gap: 8px; margin-bottom: 6px; margin-top: 4px;\">\n            <h4 style=\"margin: 0; font-size: 1.0rem; font-weight: 800; letter-spacing: -0.015em; flex: 1;\">Inside vs Outside COALESCE</h4>\n          </div>\n          <div class=\"code-block-container\" id=\"day05CoalesceCode\">\n            <div class=\"code-subblock\" id=\"day05CoalesceQuery1\">\n              <pre><code><span class=\"code-comment\">-- PATTERN A (Inside): Convert NULLs to 0 before calculating the mean</span>\n<span class=\"kw\">SELECT</span> AVG(COALESCE(commission, 0)) <span class=\"kw\">AS</span> avg_all_staff\n<span class=\"kw\">FROM</span>   employees;</code></pre>\n            </div>\n            <div class=\"code-subblock\" id=\"day05CoalesceQuery2\">\n              <pre><code><span class=\"code-comment\">-- PATTERN B (Outside): Prevent NULL output when query matches 0 rows</span>\n<span class=\"kw\">SELECT</span> COALESCE(AVG(salary), 0) <span class=\"kw\">AS</span> avg_sal_dept99\n<span class=\"kw\">FROM</span>   employees\n<span class=\"kw\">WHERE</span>  department_id = 99;   <span class=\"code-comment\">-- empty set -> returns 0 instead of NULL</span></code></pre>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"slide-section\" id=\"day05CoalesceTipSection\">\n          <div class=\"info-box\" id=\"day05CoalesceTip\">\n            <div style=\"display: flex; align-items: center; gap: 8px; margin-bottom: 4px; width: 100%;\">\n              <strong style=\"color:var(--ink-teal); flex: 1;\">\ud83d\udca1 Summary: Inside vs Outside:</strong>\n            </div>\n            <p style=\"margin: 0;\"><strong>Inside:</strong> <code>AVG(COALESCE(x, 0))</code> adjusts the average by counting zeroes.<br/>\n            <strong>Outside:</strong> <code>COALESCE(SUM(x), 0)</code> ensures dashboard KPI cards show <code>0</code> instead of a blank <code>NULL</code> when filtered to empty results.</p>\n          </div>\n        </div>\n\n        <!-- \u2500\u2500 Section 05: MIN & MAX Beyond Numbers \u2500\u2500 -->\n        <div class=\"slide-section\" id=\"day05MinMaxSection\">\n          <h3 class=\"heading-with-audio\" id=\"day05MinMax\">\n            05. MIN & MAX \u2014 Beyond Numbers (Dates & Text)\n          </h3>\n          <p><code>MIN</code> and <code>MAX</code> find boundary values across all SQL data types using natural ordering:</p>\n          <div class=\"vs-block\" style=\"margin-top: 8px;\">\n            <div class=\"vs-card\" id=\"day05MinMaxCard1\" style=\"flex: 1;\">\n              <h4 style=\"margin: 0 0 4px; font-size: 0.88rem; color:var(--ink-info);\">Numeric</h4>\n              <p style=\"margin: 0; font-size: 0.82rem; line-height: 1.4;\">Smallest and largest amounts ($/\u20b9).</p>\n            </div>\n            <div class=\"vs-card\" id=\"day05MinMaxCard2\" style=\"flex: 1;\">\n              <h4 style=\"margin: 0 0 4px; font-size: 0.88rem; color:var(--ink-info);\">Dates</h4>\n              <p style=\"margin: 0; font-size: 0.82rem; line-height: 1.4;\"><code>MIN</code> = Earliest date; <code>MAX</code> = Most recent date.</p>\n            </div>\n            <div class=\"vs-card\" id=\"day05MinMaxCard3\" style=\"flex: 1;\">\n              <h4 style=\"margin: 0 0 4px; font-size: 0.88rem; color:var(--ink-info);\">Strings</h4>\n              <p style=\"margin: 0; font-size: 0.82rem; line-height: 1.4;\">Alphabetical first ('A...') and last ('Z...').</p>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"slide-section\" id=\"day05MinMaxCodeSection\">\n          <div class=\"heading-with-audio\" style=\"display: flex; align-items: center; gap: 8px; margin-bottom: 6px; margin-top: 4px;\">\n            <h4 style=\"margin: 0; font-size: 1.0rem; font-weight: 800; letter-spacing: -0.015em; flex: 1;\">MIN/MAX Across Types</h4>\n          </div>\n          <div class=\"code-block-container\" id=\"day05MinMaxCode\">\n            <div class=\"code-subblock\" id=\"day05MinMaxQuery1\">\n              <pre><code><span class=\"code-comment\">-- 1. Numbers: Price boundaries</span>\n<span class=\"kw\">SELECT</span> MIN(unit_price) <span class=\"kw\">AS</span> cheapest, MAX(unit_price) <span class=\"kw\">AS</span> priciest\n<span class=\"kw\">FROM</span>   products;</code></pre>\n            </div>\n            <div class=\"code-subblock\" id=\"day05MinMaxQuery2\">\n              <pre><code><span class=\"code-comment\">-- 2. Dates: Tenure range (earliest & latest hires)</span>\n<span class=\"kw\">SELECT</span> MIN(hire_date) <span class=\"kw\">AS</span> oldest_hire, MAX(hire_date) <span class=\"kw\">AS</span> newest_hire\n<span class=\"kw\">FROM</span>   employees;</code></pre>\n            </div>\n            <div class=\"code-subblock\" id=\"day05MinMaxQuery3\">\n              <pre><code><span class=\"code-comment\">-- 3. Strings: Alphabetical boundaries</span>\n<span class=\"kw\">SELECT</span> MIN(first_name) <span class=\"kw\">AS</span> first_name_a, MAX(first_name) <span class=\"kw\">AS</span> last_name_z\n<span class=\"kw\">FROM</span>   customers;</code></pre>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"slide-section\" id=\"day05MinMaxTipSection\">\n          <div class=\"pro-tip-box\" id=\"day05MinMaxTip\">\n            <div style=\"display: flex; align-items: center; gap: 8px; margin-bottom: 4px; width: 100%;\">\n              <strong style=\"color:var(--ink-warn); flex: 1;\">\ud83d\udca1 ISO-8601 Date Standard:</strong>\n            </div>\n            <p style=\"margin: 0;\">Because dates are stored in <code>YYYY-MM-DD</code> format, alphabetical sorting matches chronological order perfectly.</p>\n          </div>\n        </div>\n\n        <!-- \u2500\u2500 Section 06: Multi-Aggregate Dashboards \u2500\u2500 -->\n        <div class=\"slide-section\" id=\"day05StackingSection\">\n          <h3 class=\"heading-with-audio\" id=\"day05Stacking\">\n            06. Stacking Aggregates & Expressions in One SELECT\n          </h3>\n          <p>Stack multiple aggregates in a single <code>SELECT</code> to generate a complete executive dashboard in a <strong>single table scan</strong>. You can also place mathematical expressions inside aggregate functions.</p>\n        </div>\n\n        <div class=\"slide-section\" id=\"day05StackCodeSection\">\n          <div class=\"heading-with-audio\" style=\"display: flex; align-items: center; gap: 8px; margin-bottom: 6px; margin-top: 4px;\">\n            <h4 style=\"margin: 0; font-size: 1.0rem; font-weight: 800; letter-spacing: -0.015em; flex: 1;\">One-Row Executive KPI Dashboard</h4>\n          </div>\n          <div class=\"code-block-container\" id=\"day05StackCode\">\n            <div class=\"code-subblock\" id=\"day05StackQuery1\">\n              <pre><code><span class=\"code-comment\">-- Executive Overview Dashboard</span>\n<span class=\"kw\">SELECT</span> COUNT(*)                    <span class=\"kw\">AS</span> total_headcount,\n       SUM(salary)                 <span class=\"kw\">AS</span> total_payroll,\n       ROUND(AVG(salary), 2)       <span class=\"kw\">AS</span> avg_salary,\n       MIN(hire_date)              <span class=\"kw\">AS</span> company_founded,\n       SUM(stock_qty * unit_price) <span class=\"kw\">AS</span> total_inventory_value\n<span class=\"kw\">FROM</span>   employees, products;</code></pre>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"slide-section\" id=\"day05StackInfoSection\">\n          <div class=\"info-box\" id=\"day05StackInfo\">\n            <div style=\"display: flex; align-items: center; gap: 8px; margin-bottom: 4px; width: 100%;\">\n              <strong style=\"color:var(--ink-teal); flex: 1;\">\ud83d\udca1 Row-Level Expression Evaluation:</strong>\n            </div>\n            <p style=\"margin: 0;\">In <code>SUM(stock_qty * unit_price)</code>, SQL multiplies the quantity and price for each row first, then sums the calculated results.</p>\n          </div>\n        </div>\n\n        <!-- \u2500\u2500 Section 07: NULL Behavior & Auditing \u2500\u2500 -->\n        <div class=\"slide-section\" id=\"day05NullDeepSection\">\n          <h3 class=\"heading-with-audio\" id=\"day05NullDeep\">\n            07. NULL Deep Dive \u2014 Aggregation Edge Cases Cheat Sheet\n          </h3>\n          <p>Master these 6 edge cases to ace technical interviews and prevent reporting bugs:</p>\n        </div>\n\n        <div class=\"slide-section\" id=\"day05NullBehavTableSection\">\n          <div class=\"db-mock-table-wrap\" id=\"day05NullBehavTable\">\n            <div style=\"display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 6px; padding: 0 4px;\">\n              <h4 style=\"margin: 0; font-size: 1.0rem; font-weight: 800; letter-spacing: -0.015em; flex: 1;\">Aggregation &amp; NULL Truth Matrix</h4>\n            </div>\n            <table class=\"db-table-mock db-table-mock--compact\">\n              <thead><tr><th>Scenario</th><th>Function</th><th>Result</th><th>Explanation</th></tr></thead>\n              <tbody>\n                <tr id=\"day05NullRow1\"><td>Table has 15 rows (4 NULLs)</td><td><code>COUNT(*)</code></td><td><strong>15</strong></td><td>Counts rows regardless of content</td></tr>\n                <tr id=\"day05NullRow2\"><td>Table has 15 rows (4 NULLs)</td><td><code>COUNT(commission)</code></td><td><strong>11</strong></td><td>Skips 4 NULL entries</td></tr>\n                <tr id=\"day05NullRow3\"><td>Table has 15 rows (4 NULLs)</td><td><code>AVG(commission)</code></td><td><strong>SUM / 11</strong></td><td>Divides only by populated entries</td></tr>\n                <tr id=\"day05NullRow4\"><td>Column is 100% NULL</td><td><code>SUM(col)</code> / <code>AVG(col)</code></td><td><strong>NULL</strong></td><td>No valid numeric data to aggregate</td></tr>\n                <tr id=\"day05NullRow5\"><td>Empty result set (0 rows matched)</td><td><code>COUNT(*)</code></td><td><strong>0</strong></td><td>Zero rows counted</td></tr>\n                <tr id=\"day05NullRow6\"><td>Empty result set (0 rows matched)</td><td><code>SUM(col)</code> / <code>AVG(col)</code></td><td><strong>NULL</strong></td><td>Nothing exists to sum or average</td></tr>\n              </tbody>\n            </table>\n          </div>\n        </div>\n\n        <div class=\"slide-section\" id=\"day05NullDemoCodeSection\">\n          <div class=\"heading-with-audio\" style=\"display: flex; align-items: center; gap: 8px; margin-bottom: 6px; margin-top: 4px;\">\n            <h4 style=\"margin: 0; font-size: 1.0rem; font-weight: 800; letter-spacing: -0.015em; flex: 1;\">Live Demonstration Query</h4>\n          </div>\n          <div class=\"code-block-container\" id=\"day05NullDemoCode\">\n            <div class=\"code-subblock\" id=\"day05NullDemoQuery1\">\n              <pre><code><span class=\"code-comment\">-- Side-by-side comparison of NULL handling</span>\n<span class=\"kw\">SELECT</span> COUNT(*)                    <span class=\"kw\">AS</span> total_rows,\n       COUNT(commission)           <span class=\"kw\">AS</span> count_populated,\n       AVG(commission)             <span class=\"kw\">AS</span> avg_earners_only,\n       AVG(COALESCE(commission,0)) <span class=\"kw\">AS</span> avg_all_employees,\n       COALESCE(SUM(commission),0) <span class=\"kw\">AS</span> safe_total_payout\n<span class=\"kw\">FROM</span>   employees;</code></pre>\n            </div>\n          </div>\n        </div>\n\n        <div class=\"slide-section\" id=\"day05NullTipSection\">\n          <div class=\"pro-tip-box\" id=\"day05NullTip\">\n            <div style=\"display: flex; align-items: center; gap: 8px; margin-bottom: 4px; width: 100%;\">\n              <strong style=\"color:var(--ink-warn); flex: 1;\">\ud83d\udca1 Pro-Tip: Missing Value Audit:</strong>\n            </div>\n            <p style=\"margin: 0;\">Always run <code>COUNT(*) - COUNT(col)</code> during initial EDA (Exploratory Data Analysis) to measure dataset cleanliness.</p>\n          </div>\n        </div>\n\n        <div class=\"slide-section\" id=\"day05DistinctWarnSection\">\n          <div class=\"warn-box\" id=\"day05DistinctWarn\">\n            <div style=\"display: flex; align-items: center; gap: 8px; margin-bottom: 4px; width: 100%;\">\n              <strong style=\"color:var(--ink-neg); flex: 1;\">\u26a0\ufe0f Caution with SUM(DISTINCT col):</strong>\n            </div>\n            <p style=\"margin: 0;\"><code>COUNT(DISTINCT col)</code> is essential for counting unique users. But <code>SUM(DISTINCT salary)</code> will discard legitimate identical salaries (e.g. two engineers making \u20b980k), corrupting financial totals.</p>\n          </div>\n        </div>\n\n        <!-- \u2500\u2500 Section 08: Interview Q&A \u2500\u2500 -->\n        <div class=\"slide-section\" id=\"day05QASection\">\n          <div class=\"interview-box\">\n            <h4 id=\"day05QAHeading\" style=\"margin: 0 0 12px 0; font-size: 1rem; color: #38bdf8; display: flex; align-items: center; gap: 6px;\">\n              <span>\ud83c\udfaf</span> Top 25 SQL Interview Q&amp;A \u2014 Aggregate Functions\n            </h4>\n\n            <div id=\"day05QA1\">\n              <p><strong>Q1: What is the difference between <code>COUNT(*)</code> and <code>COUNT(column)</code>?</strong></p>\n              <p><em>A: <code>COUNT(*)</code> counts every physical row including rows with NULLs. <code>COUNT(column)</code> counts only rows where that specific column is non-NULL. They differ only when the column contains NULL values.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day05QA2\">\n              <p><strong>Q2: What does <code>COUNT(DISTINCT col)</code> do, and when is it used?</strong></p>\n              <p><em>A: It counts the number of unique, non-NULL values in a column. Common use cases include counting unique active customers, distinct product categories, or unique login dates.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day05QA3\">\n              <p><strong>Q3: How does <code>AVG(col)</code> handle NULL values?</strong></p>\n              <p><em>A: <code>AVG</code> ignores NULLs in both the numerator and denominator: <code>AVG(col) = SUM(col) / COUNT(col)</code>. To include NULLs as zeros in the average, use <code>AVG(COALESCE(col, 0))</code>.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day05QA4\">\n              <p><strong>Q4: Why can't you use an aggregate function inside a WHERE clause?</strong></p>\n              <p><em>A: Due to SQL logical execution order: <code>WHERE</code> (Step 3) filters rows before aggregation (Step 4) happens. To filter aggregated results, use <code>HAVING</code> (Step 5) or wrap the aggregate in a subquery.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day05QA5\">\n              <p><strong>Q5: What does <code>SUM()</code> return if all values in the column are NULL?</strong></p>\n              <p><em>A: It returns <code>NULL</code>, not <code>0</code>. To safely return zero for dashboards, wrap the result with <code>COALESCE(SUM(col), 0)</code>.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day05QA6\">\n              <p><strong>Q6: How do <code>MIN()</code> and <code>MAX()</code> work on TEXT and DATE columns?</strong></p>\n              <p><em>A: They use natural sorting order. For TEXT, they return alphabetical first and last ('A' to 'Z'). For ISO-8601 dates (<code>YYYY-MM-DD</code>), they return the earliest and latest dates.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day05QA7\">\n              <p><strong>Q7: Can you place mathematical expressions inside aggregate functions?</strong></p>\n              <p><em>A: Yes. Aggregates evaluate the inner expression row-by-row first, then aggregate. For example, <code>SUM(qty * unit_price)</code> computes line totals before calculating gross inventory value.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day05QA8\">\n              <p><strong>Q8: What is the risk of using <code>SUM(DISTINCT salary)</code>?</strong></p>\n              <p><em>A: It deduplicates values before summing. If multiple employees earn the exact same salary, duplicate amounts are dropped, leading to severely underreported financial figures.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day05QA9\">\n              <p><strong>Q9: Why does <code>SELECT department_id, COUNT(*) FROM employees;</code> fail without GROUP BY?</strong></p>\n              <p><em>A: Standard SQL disallows mixing non-aggregated columns with aggregate functions unless all non-aggregated columns appear in a <code>GROUP BY</code> clause.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day05QA10\">\n              <p><strong>Q10: What is the performance cost of <code>COUNT(*)</code> on large tables?</strong></p>\n              <p><em>A: In transactional engines with MVCC (like PostgreSQL or MySQL InnoDB), <code>COUNT(*)</code> performs a full index or table scan. For large tables, maintain pre-computed summary tables or use table metadata.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day05QA11\">\n              <p><strong>Q11: How do you calculate a weighted average in SQL?</strong></p>\n              <p><em>A: Use <code>SUM(value * weight) * 1.0 / NULLIF(SUM(weight), 0)</code>. Always guard the denominator with <code>NULLIF</code> to prevent divide-by-zero crashes on empty sets.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day05QA12\">\n              <p><strong>Q12: What do <code>GROUP_CONCAT</code> (SQLite/MySQL) and <code>STRING_AGG</code> (PostgreSQL) do?</strong></p>\n              <p><em>A: They concatenate text values across rows into a single delimited string (e.g., combining employee names into a comma-separated list per department).</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day05QA13\">\n              <p><strong>Q13: Can you nest aggregate functions like <code>MAX(COUNT(*))</code>?</strong></p>\n              <p><em>A: No, SQL does not allow direct nesting of aggregates. You must compute the inner aggregate inside a subquery or CTE first, then aggregate over that result.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day05QA14\">\n              <p><strong>Q14: What is the result of <code>COUNT(*)</code> versus <code>AVG()</code> over an empty table?</strong></p>\n              <p><em>A: <code>COUNT(*)</code> returns <code>0</code> because counting zero rows is well-defined. <code>AVG()</code>, <code>SUM()</code>, <code>MIN()</code>, and <code>MAX()</code> all return <code>NULL</code>.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day05QA15\">\n              <p><strong>Q15: How does conditional aggregation work with <code>CASE WHEN</code>?</strong></p>\n              <p><em>A: You place a <code>CASE</code> expression inside an aggregate: <code>SUM(CASE WHEN status = 'Shipped' THEN amount ELSE 0 END)</code>. This pivots multiple row categories into column metrics in a single query.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day05QA16\">\n              <p><strong>Q16: What is the difference between an aggregate function and a window function?</strong></p>\n              <p><em>A: Aggregate functions collapse multiple rows into one summary row. Window functions compute summary metrics while preserving each original row using the <code>OVER()</code> clause.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day05QA17\">\n              <p><strong>Q17: How do you find the second highest salary using aggregates?</strong></p>\n              <p><em>A: Use a subquery: <code>SELECT MAX(salary) FROM employees WHERE salary &lt; (SELECT MAX(salary) FROM employees);</code>. Alternatively, use <code>DENSE_RANK()</code> window functions.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day05QA18\">\n              <p><strong>Q18: Does <code>COUNT(col)</code> count empty string values (<code>''</code>)?</strong></p>\n              <p><em>A: Yes. An empty string is a valid text value, not a <code>NULL</code>. <code>COUNT(col)</code> only skips genuine <code>NULL</code> entries.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day05QA19\">\n              <p><strong>Q19: What is the fastest way to check if a table has any rows?</strong></p>\n              <p><em>A: Use <code>SELECT 1 FROM table LIMIT 1</code> or <code>WHERE EXISTS (...)</code>. Avoid <code>COUNT(*) &gt; 0</code> because it forces a full table scan.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day05QA20\">\n              <p><strong>Q20: How do <code>MIN()</code> and <code>MAX()</code> treat NULL values?</strong></p>\n              <p><em>A: They completely ignore <code>NULL</code> values and evaluate only non-NULL entries. If all rows are NULL, both functions return <code>NULL</code>.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day05QA21\">\n              <p><strong>Q21: Why does <code>AVG(col)</code> equal <code>SUM(col) / COUNT(col)</code>, but not <code>SUM(col) / COUNT(*)</code>?</strong></p>\n              <p><em>A: Because both <code>AVG</code> and <code>COUNT(col)</code> ignore NULLs. <code>COUNT(*)</code> counts all rows including NULLs, which would artificially lower the calculated average.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day05QA22\">\n              <p><strong>Q22: How is the median calculated in standard SQL?</strong></p>\n              <p><em>A: SQLite has no native <code>MEDIAN()</code> aggregate. Standard SQL uses <code>PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY col)</code>, or window ranking functions like <code>ROW_NUMBER()</code>.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day05QA23\">\n              <p><strong>Q23: Can aggregate functions run without a GROUP BY clause?</strong></p>\n              <p><em>A: Yes. Without <code>GROUP BY</code>, the entire table is treated as a single group, returning exactly one summary row (e.g. <code>SELECT COUNT(*), AVG(salary) FROM employees;</code>).</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day05QA24\">\n              <p><strong>Q24: Can you use multiple columns inside <code>COUNT(DISTINCT a, b)</code>?</strong></p>\n              <p><em>A: Most standard SQL engines reject multiple arguments in <code>COUNT(DISTINCT)</code>. Instead, concatenate the columns: <code>COUNT(DISTINCT col1 || '-' || col2)</code> or use a subquery.</em></p>\n            </div>\n            <hr style=\"border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;\" />\n\n            <div id=\"day05QA25\">\n              <p><strong>Q25: How do you compute a percentage of the total in SQL?</strong></p>\n              <p><em>A: Divide the group sum by the grand total: <code>SUM(salary) * 100.0 / (SELECT SUM(salary) FROM employees)</code> or using window functions: <code>SUM(salary) * 100.0 / SUM(SUM(salary)) OVER ()</code>.</em></p>\n            </div>\n          </div>\n        </div>"
    }
  ],
  "practiceQuestions": [
    {
      "id": 1,
      "prompt": "<strong>[Easy] Company Payroll Overview</strong><br/>HR leadership is conducting an annual budget review. Write a query from <code>employees</code> to calculate the total payroll spend (<code>total_payroll</code>), average salary (<code>avg_salary</code>), lowest salary (<code>min_salary</code>), and highest salary (<code>max_salary</code>).",
      "referenceSql": "SELECT SUM(salary) AS total_payroll,\n       AVG(salary) AS avg_salary,\n       MIN(salary) AS min_salary,\n       MAX(salary) AS max_salary\nFROM   employees;",
      "questionAudio": "Day05/New_Day5Question01.mp3",
      "solutionAudio": "Day05/New_Day5Question01sol.mp3",
      "solutionEvents": {
        "src": "Day05/New_Day5Question01sol.mp3",
        "code": "SELECT SUM(salary) AS total_payroll,\n       AVG(salary) AS avg_salary,\n       MIN(salary) AS min_salary,\n       MAX(salary) AS max_salary\nFROM   employees;",
        "segments": [
          {
            "text": "SELECT SUM(salary) AS total_payroll,\n",
            "startAt": 2.44,
            "charInterval": 65
          },
          {
            "text": "       AVG(salary) AS avg_salary,\n",
            "startAt": 5.31,
            "charInterval": 71
          },
          {
            "text": "       MIN(salary) AS min_salary,\n",
            "startAt": 8.18,
            "charInterval": 71
          },
          {
            "text": "       MAX(salary) AS max_salary\n",
            "startAt": 11.06,
            "charInterval": 73
          },
          {
            "text": "FROM   employees;",
            "startAt": 13.93,
            "charInterval": 85
          }
        ],
        "scrollAt": 15.96
      }
    },
    {
      "id": 2,
      "prompt": "<strong>[Easy] Active Workforce Headcount</strong><br/>To audit organizational capacity, determine how many employees are currently active (<code>is_active = 1</code>). Return the count aliased as <code>active_employees</code>.",
      "referenceSql": "SELECT COUNT(*) AS active_employees\nFROM   employees\nWHERE  is_active = 1;",
      "questionAudio": "Day05/New_Day5Question02.mp3",
      "solutionAudio": "Day05/New_Day5Question02sol.mp3",
      "solutionEvents": {
        "src": "Day05/New_Day5Question02sol.mp3",
        "code": "SELECT COUNT(*) AS active_employees\nFROM   employees\nWHERE  is_active = 1;",
        "segments": [
          {
            "text": "SELECT COUNT(*) AS active_employees\n",
            "startAt": 2.06,
            "charInterval": 53
          },
          {
            "text": "FROM   employees\n",
            "startAt": 4.32,
            "charInterval": 85
          },
          {
            "text": "WHERE  is_active = 1;",
            "startAt": 6.58,
            "charInterval": 85
          }
        ],
        "scrollAt": 8.4
      }
    },
    {
      "id": 3,
      "prompt": "<strong>[Easy] Catalog Price Extremes</strong><br/>The merchandising team needs to identify the price boundaries of the catalog. From <code>products</code>, return the lowest unit price as <code>cheapest</code> and the highest unit price as <code>most_expensive</code>.",
      "referenceSql": "SELECT MIN(unit_price) AS cheapest,\n       MAX(unit_price) AS most_expensive\nFROM   products;",
      "questionAudio": "Day05/New_Day5Question03.mp3",
      "solutionAudio": "Day05/New_Day5Question03sol.mp3",
      "solutionEvents": {
        "src": "Day05/New_Day5Question03sol.mp3",
        "code": "SELECT MIN(unit_price) AS cheapest,\n       MAX(unit_price) AS most_expensive\nFROM   products;",
        "segments": [
          {
            "text": "SELECT MIN(unit_price) AS cheapest,\n",
            "startAt": 2.02,
            "charInterval": 67
          },
          {
            "text": "       MAX(unit_price) AS most_expensive\n",
            "startAt": 4.87,
            "charInterval": 59
          },
          {
            "text": "FROM   products;",
            "startAt": 7.73,
            "charInterval": 85
          }
        ],
        "scrollAt": 10.05
      }
    },
    {
      "id": 4,
      "prompt": "<strong>[Medium] Commission Data Quality Audit</strong><br/>Perform a data completeness check on employee compensation. In a single query from <code>employees</code>, return <code>total</code> (all employees), <code>has_commission</code> (employees with non-NULL commissions), and <code>no_commission</code> (employees missing commission data).",
      "referenceSql": "SELECT COUNT(*) AS total,\n       COUNT(commission) AS has_commission,\n       COUNT(*) - COUNT(commission) AS no_commission\nFROM   employees;",
      "questionAudio": "Day05/New_Day5Question04.mp3",
      "solutionAudio": "Day05/New_Day5Question04sol.mp3",
      "solutionEvents": {
        "src": "Day05/New_Day5Question04sol.mp3",
        "code": "SELECT COUNT(*) AS total,\n       COUNT(commission) AS has_commission,\n       COUNT(*) - COUNT(commission) AS no_commission\nFROM   employees;",
        "segments": [
          {
            "text": "SELECT COUNT(*) AS total,\n",
            "startAt": 2.18,
            "charInterval": 75
          },
          {
            "text": "       COUNT(commission) AS has_commission,\n",
            "startAt": 4.5,
            "charInterval": 44
          },
          {
            "text": "       COUNT(*) - COUNT(commission) AS no_commission\n",
            "startAt": 6.81,
            "charInterval": 37
          },
          {
            "text": "FROM   employees;",
            "startAt": 9.12,
            "charInterval": 85
          }
        ],
        "scrollAt": 10.87
      }
    },
    {
      "id": 5,
      "prompt": "<strong>[Easy] Shipped Revenue Total</strong><br/>Finance wants to reconcile realized revenue. Calculate the total sum of <code>total_amount</code> from <code>orders</code> for all completed shipments (<code>status = 'Shipped'</code>), aliased as <code>shipped_revenue</code>.",
      "referenceSql": "SELECT SUM(total_amount) AS shipped_revenue\nFROM   orders\nWHERE  status = 'Shipped';",
      "questionAudio": "Day05/New_Day5Question05.mp3",
      "solutionAudio": "Day05/New_Day5Question05sol.mp3",
      "solutionEvents": {
        "src": "Day05/New_Day5Question05sol.mp3",
        "code": "SELECT SUM(total_amount) AS shipped_revenue\nFROM   orders\nWHERE  status = 'Shipped';",
        "segments": [
          {
            "text": "SELECT SUM(total_amount) AS shipped_revenue\n",
            "startAt": 2.24,
            "charInterval": 41
          },
          {
            "text": "FROM   orders\n",
            "startAt": 4.4,
            "charInterval": 85
          },
          {
            "text": "WHERE  status = 'Shipped';",
            "startAt": 6.56,
            "charInterval": 70
          }
        ],
        "scrollAt": 8.28
      }
    },
    {
      "id": 6,
      "prompt": "<strong>[Easy] Department Diversity Audit</strong><br/>Count how many distinct departments have active staff assigned. From <code>employees</code>, return the count of unique non-NULL <code>department_id</code> values as <code>num_departments</code>.",
      "referenceSql": "SELECT COUNT(DISTINCT department_id) AS num_departments\nFROM   employees;",
      "questionAudio": "Day05/New_Day5Question06.mp3",
      "solutionAudio": "Day05/New_Day5Question06sol.mp3",
      "solutionEvents": {
        "src": "Day05/New_Day5Question06sol.mp3",
        "code": "SELECT COUNT(DISTINCT department_id) AS num_departments\nFROM   employees;",
        "segments": [
          {
            "text": "SELECT COUNT(DISTINCT department_id) AS num_departments\n",
            "startAt": 2.42,
            "charInterval": 45
          },
          {
            "text": "FROM   employees;",
            "startAt": 5.39,
            "charInterval": 85
          }
        ],
        "scrollAt": 7.94
      }
    },
    {
      "id": 7,
      "prompt": "<strong>[Medium] Gross Inventory Valuation</strong><br/>Calculate the total capital tied up in inventory. From <code>products</code>, compute the sum of <code>stock_qty * unit_price</code> across all items, aliased as <code>inventory_value</code>.",
      "referenceSql": "SELECT SUM(stock_qty * unit_price) AS inventory_value\nFROM   products;",
      "questionAudio": "Day05/New_Day5Question07.mp3",
      "solutionAudio": "Day05/New_Day5Question07sol.mp3",
      "solutionEvents": {
        "src": "Day05/New_Day5Question07sol.mp3",
        "code": "SELECT SUM(stock_qty * unit_price) AS inventory_value\nFROM   products;",
        "segments": [
          {
            "text": "SELECT SUM(stock_qty * unit_price) AS inventory_value\n",
            "startAt": 2.58,
            "charInterval": 51
          },
          {
            "text": "FROM   products;",
            "startAt": 5.82,
            "charInterval": 85
          }
        ],
        "scrollAt": 8.61
      }
    },
    {
      "id": 8,
      "prompt": "<strong>[Medium] Dual Commission Averages</strong><br/>Demonstrate the NULL averaging trap: From <code>employees</code>, calculate the average commission among earners only as <code>avg_non_null</code>, and the companywide average treating NULL as 0 as <code>avg_all</code>.",
      "referenceSql": "SELECT AVG(commission) AS avg_non_null,\n       AVG(COALESCE(commission, 0)) AS avg_all\nFROM   employees;",
      "questionAudio": "Day05/New_Day5Question08.mp3",
      "solutionAudio": "Day05/New_Day5Question08sol.mp3",
      "solutionEvents": {
        "src": "Day05/New_Day5Question08sol.mp3",
        "code": "SELECT AVG(commission) AS avg_non_null,\n       AVG(COALESCE(commission, 0)) AS avg_all\nFROM   employees;",
        "segments": [
          {
            "text": "SELECT AVG(commission) AS avg_non_null,\n",
            "startAt": 2.12,
            "charInterval": 70
          },
          {
            "text": "       AVG(COALESCE(commission, 0)) AS avg_all\n",
            "startAt": 5.42,
            "charInterval": 59
          },
          {
            "text": "FROM   employees;",
            "startAt": 8.72,
            "charInterval": 85
          }
        ],
        "scrollAt": 11.42
      }
    },
    {
      "id": 9,
      "prompt": "<strong>[Easy] Premium Product Count</strong><br/>Identify luxury tier catalog depth. Count the number of items in <code>products</code> that have a <code>unit_price &gt; 5000</code>. Return the count aliased as <code>premium_count</code>.",
      "referenceSql": "SELECT COUNT(*) AS premium_count\nFROM   products\nWHERE  unit_price > 5000;",
      "questionAudio": "Day05/New_Day5Question09.mp3",
      "solutionAudio": "Day05/New_Day5Question09sol.mp3",
      "solutionEvents": {
        "src": "Day05/New_Day5Question09sol.mp3",
        "code": "SELECT COUNT(*) AS premium_count\nFROM   products\nWHERE  unit_price > 5000;",
        "segments": [
          {
            "text": "SELECT COUNT(*) AS premium_count\n",
            "startAt": 2.12,
            "charInterval": 60
          },
          {
            "text": "FROM   products\n",
            "startAt": 4.48,
            "charInterval": 85
          },
          {
            "text": "WHERE  unit_price > 5000;",
            "startAt": 6.84,
            "charInterval": 80
          }
        ],
        "scrollAt": 8.74
      }
    },
    {
      "id": 10,
      "prompt": "<strong>[Hard] Fault-Tolerant Average on Empty Filter</strong><br/>Write a query to calculate average salary for <code>department_id = 99</code>. Ensure that if no rows match, the query safely returns <code>0</code> instead of a blank <code>NULL</code>. Alias as <code>avg_salary</code>.",
      "referenceSql": "SELECT COALESCE(AVG(salary), 0) AS avg_salary\nFROM   employees\nWHERE  department_id = 99;",
      "questionAudio": "Day05/New_Day5Question10.mp3",
      "solutionAudio": "Day05/New_Day5Question10sol.mp3",
      "solutionEvents": {
        "src": "Day05/New_Day5Question10sol.mp3",
        "code": "SELECT COALESCE(AVG(salary), 0) AS avg_salary\nFROM   employees\nWHERE  department_id = 99;",
        "segments": [
          {
            "text": "SELECT COALESCE(AVG(salary), 0) AS avg_salary\n",
            "startAt": 2.6,
            "charInterval": 57
          },
          {
            "text": "FROM   employees\n",
            "startAt": 5.73,
            "charInterval": 85
          },
          {
            "text": "WHERE  department_id = 99;",
            "startAt": 8.85,
            "charInterval": 85
          }
        ],
        "scrollAt": 11.38
      }
    },
    {
      "id": 11,
      "prompt": "<strong>[Easy] Peak Transaction Value</strong><br/>Identify the single highest value transaction in company history. From <code>orders</code>, find the maximum <code>total_amount</code> aliased as <code>largest_order</code>.",
      "referenceSql": "SELECT MAX(total_amount) AS largest_order\nFROM   orders;",
      "questionAudio": "Day05/New_Day5Question11.mp3",
      "solutionAudio": "Day05/New_Day5Question11sol.mp3",
      "solutionEvents": {
        "src": "Day05/New_Day5Question11sol.mp3",
        "code": "SELECT MAX(total_amount) AS largest_order\nFROM   orders;",
        "segments": [
          {
            "text": "SELECT MAX(total_amount) AS largest_order\n",
            "startAt": 2.0,
            "charInterval": 54
          },
          {
            "text": "FROM   orders;",
            "startAt": 4.69,
            "charInterval": 85
          }
        ],
        "scrollAt": 7.01
      }
    },
    {
      "id": 12,
      "prompt": "<strong>[Easy] Customer Geographic Coverage</strong><br/>Measure market reach by counting the number of unique geographic regions where customers reside. From <code>customers</code>, return the unique region count as <code>num_regions</code>.",
      "referenceSql": "SELECT COUNT(DISTINCT region) AS num_regions\nFROM   customers;",
      "questionAudio": "Day05/New_Day5Question12.mp3",
      "solutionAudio": "Day05/New_Day5Question12sol.mp3",
      "solutionEvents": {
        "src": "Day05/New_Day5Question12sol.mp3",
        "code": "SELECT COUNT(DISTINCT region) AS num_regions\nFROM   customers;",
        "segments": [
          {
            "text": "SELECT COUNT(DISTINCT region) AS num_regions\n",
            "startAt": 2.3,
            "charInterval": 42
          },
          {
            "text": "FROM   customers;",
            "startAt": 4.53,
            "charInterval": 85
          }
        ],
        "scrollAt": 6.42
      }
    },
    {
      "id": 13,
      "prompt": "<strong>[Hard] Single-Pass Revenue Segmentation</strong><br/>In a single scan of <code>orders</code>, compute total revenue for 'Shipped' orders as <code>shipped_rev</code>, and total revenue for 'Processing' orders as <code>processing_rev</code> using conditional aggregation.",
      "referenceSql": "SELECT SUM(CASE WHEN status = 'Shipped' THEN total_amount ELSE 0 END) AS shipped_rev,\n       SUM(CASE WHEN status = 'Processing' THEN total_amount ELSE 0 END) AS processing_rev\nFROM   orders;",
      "questionAudio": "Day05/New_Day5Question13.mp3",
      "solutionAudio": "Day05/New_Day5Question13sol.mp3",
      "solutionEvents": {
        "src": "Day05/New_Day5Question13sol.mp3",
        "code": "SELECT SUM(CASE WHEN status = 'Shipped' THEN total_amount ELSE 0 END) AS shipped_rev,\n       SUM(CASE WHEN status = 'Processing' THEN total_amount ELSE 0 END) AS processing_rev\nFROM   orders;",
        "segments": [
          {
            "text": "SELECT SUM(CASE WHEN status = 'Shipped' THEN total_amount ELSE 0 END) AS shipped_rev,\n",
            "startAt": 2.98,
            "charInterval": 51
          },
          {
            "text": "       SUM(CASE WHEN status = 'Processing' THEN total_amount ELSE 0 END) AS processing_rev\n",
            "startAt": 8.15,
            "charInterval": 48
          },
          {
            "text": "FROM   orders;",
            "startAt": 13.33,
            "charInterval": 85
          }
        ],
        "scrollAt": 17.58
      }
    },
    {
      "id": 14,
      "prompt": "<strong>[Hard] Volume-Weighted Average Price</strong><br/>From <code>order_items</code>, calculate the volume-weighted average item price using <code>SUM(unit_price * qty) / SUM(qty)</code>. Guard against divide-by-zero with NULLIF, multiply by 1.0 for decimal precision, and ROUND to 2 decimals as <code>weighted_avg_price</code>.",
      "referenceSql": "SELECT ROUND(SUM(unit_price * qty) * 1.0 / NULLIF(SUM(qty), 0), 2) AS weighted_avg_price\nFROM   order_items;",
      "questionAudio": "Day05/New_Day5Question14.mp3",
      "solutionAudio": "Day05/New_Day5Question14sol.mp3",
      "solutionEvents": {
        "src": "Day05/New_Day5Question14sol.mp3",
        "code": "SELECT ROUND(SUM(unit_price * qty) * 1.0 / NULLIF(SUM(qty), 0), 2) AS weighted_avg_price\nFROM   order_items;",
        "segments": [
          {
            "text": "SELECT ROUND(SUM(unit_price * qty) * 1.0 / NULLIF(SUM(qty), 0), 2) AS weighted_avg_price\n",
            "startAt": 2.56,
            "charInterval": 63
          },
          {
            "text": "FROM   order_items;",
            "startAt": 9.16,
            "charInterval": 85
          }
        ],
        "scrollAt": 14.97
      }
    },
    {
      "id": 15,
      "prompt": "<strong>[Medium] Department Roster String Concatenation</strong><br/>HR needs a roster string of all employee names in Engineering (<code>department_id = 10</code>). Write a query using <code>GROUP_CONCAT</code> to return a single comma-separated list aliased as <code>engineering_team</code>.",
      "referenceSql": "SELECT GROUP_CONCAT(name, ', ') AS engineering_team\nFROM   employees\nWHERE  department_id = 10;",
      "questionAudio": "Day05/New_Day5Question15.mp3",
      "solutionAudio": "Day05/New_Day5Question15sol.mp3",
      "solutionEvents": {
        "src": "Day05/New_Day5Question15sol.mp3",
        "code": "SELECT GROUP_CONCAT(name, ', ') AS engineering_team\nFROM   employees\nWHERE  department_id = 10;",
        "segments": [
          {
            "text": "SELECT GROUP_CONCAT(name, ', ') AS engineering_team\n",
            "startAt": 2.1,
            "charInterval": 50
          },
          {
            "text": "FROM   employees\n",
            "startAt": 5.19,
            "charInterval": 85
          },
          {
            "text": "WHERE  department_id = 10;",
            "startAt": 8.29,
            "charInterval": 85
          }
        ],
        "scrollAt": 10.81
      }
    }
  ],
  "testQuestions": [
    {
      "id": 1,
      "prompt": "Calculate the total payroll across all employees from the employees table. Alias as total_payroll.",
      "referenceSql": "SELECT SUM(salary) AS total_payroll FROM employees;"
    },
    {
      "id": 2,
      "prompt": "Count the total number of orders in the orders table. Alias as total_orders.",
      "referenceSql": "SELECT COUNT(*) AS total_orders FROM orders;"
    },
    {
      "id": 3,
      "prompt": "Find the lowest unit_price in the products table. Alias as lowest_price.",
      "referenceSql": "SELECT MIN(unit_price) AS lowest_price FROM products;"
    },
    {
      "id": 4,
      "prompt": "Find the highest salary among employees in department_id = 20. Alias as max_salary.",
      "referenceSql": "SELECT MAX(salary) AS max_salary FROM employees WHERE department_id = 20;"
    },
    {
      "id": 5,
      "prompt": "Calculate the average unit_price of all products, rounded to 2 decimal places. Alias as avg_price.",
      "referenceSql": "SELECT ROUND(AVG(unit_price), 2) AS avg_price FROM products;"
    },
    {
      "id": 6,
      "prompt": "Count how many unique regions exist in the customers table. Alias as unique_regions.",
      "referenceSql": "SELECT COUNT(DISTINCT region) AS unique_regions FROM customers;"
    },
    {
      "id": 7,
      "prompt": "Count how many employees have a recorded (non-NULL) commission. Alias as count_commission.",
      "referenceSql": "SELECT COUNT(commission) AS count_commission FROM employees;"
    },
    {
      "id": 8,
      "prompt": "Calculate average commission treating missing commissions as 0 across all employees. Alias as avg_comm.",
      "referenceSql": "SELECT AVG(COALESCE(commission, 0)) AS avg_comm FROM employees;"
    },
    {
      "id": 9,
      "prompt": "Calculate total revenue for orders with status 'Shipped'. Alias as shipped_revenue.",
      "referenceSql": "SELECT SUM(total_amount) AS shipped_revenue FROM orders WHERE status = 'Shipped';"
    },
    {
      "id": 10,
      "prompt": "Find the earliest hire_date in the employees table. Alias as first_hired.",
      "referenceSql": "SELECT MIN(hire_date) AS first_hired FROM employees;"
    },
    {
      "id": 11,
      "prompt": "Find the most recent order_date from the orders table. Alias as latest_order.",
      "referenceSql": "SELECT MAX(order_date) AS latest_order FROM orders;"
    },
    {
      "id": 12,
      "prompt": "Calculate the total inventory valuation by summing stock_qty * cost_price. Alias as total_inventory_cost.",
      "referenceSql": "SELECT SUM(stock_qty * cost_price) AS total_inventory_cost FROM products;"
    },
    {
      "id": 13,
      "prompt": "Find the total quantity of items sold across all records in order_items. Alias as total_items_sold.",
      "referenceSql": "SELECT SUM(qty) AS total_items_sold FROM order_items;"
    },
    {
      "id": 14,
      "prompt": "Calculate average salary in department 10. If empty, return 0 using COALESCE. Alias as dept10_avg.",
      "referenceSql": "SELECT COALESCE(AVG(salary), 0) AS dept10_avg FROM employees WHERE department_id = 10;"
    },
    {
      "id": 15,
      "prompt": "Count how many products have unit_price > 10000. Alias as luxury_count.",
      "referenceSql": "SELECT COUNT(*) AS luxury_count FROM products WHERE unit_price > 10000;"
    },
    {
      "id": 16,
      "prompt": "Find the alphabetically first customer name from the customers table. Alias as first_customer.",
      "referenceSql": "SELECT MIN(name) AS first_customer FROM customers;"
    },
    {
      "id": 17,
      "prompt": "Find the alphabetically last product name from the products table. Alias as last_product.",
      "referenceSql": "SELECT MAX(name) AS last_product FROM products;"
    },
    {
      "id": 18,
      "prompt": "Count how many employees are missing commission data (NULL). Alias as missing_commissions.",
      "referenceSql": "SELECT COUNT(*) - COUNT(commission) AS missing_commissions FROM employees;"
    },
    {
      "id": 19,
      "prompt": "Calculate the difference between the highest and lowest employee salary. Alias as salary_spread.",
      "referenceSql": "SELECT MAX(salary) - MIN(salary) AS salary_spread FROM employees;"
    },
    {
      "id": 20,
      "prompt": "Count how many distinct customers have placed at least one order. Alias as active_buyers.",
      "referenceSql": "SELECT COUNT(DISTINCT customer_id) AS active_buyers FROM orders;"
    },
    {
      "id": 21,
      "prompt": "Calculate total amount of all orders where customer_id = 1. Alias as customer1_spend.",
      "referenceSql": "SELECT SUM(total_amount) AS customer1_spend FROM orders WHERE customer_id = 1;"
    },
    {
      "id": 22,
      "prompt": "Find the average salary of active employees (is_active = 1), rounded to 2 decimals. Alias as avg_active_salary.",
      "referenceSql": "SELECT ROUND(AVG(salary), 2) AS avg_active_salary FROM employees WHERE is_active = 1;"
    },
    {
      "id": 23,
      "prompt": "Count how many order_items have qty >= 5. Alias as bulk_orders.",
      "referenceSql": "SELECT COUNT(*) AS bulk_orders FROM order_items WHERE qty >= 5;"
    },
    {
      "id": 24,
      "prompt": "Calculate total revenue of products with category_id = 1 by summing stock_qty * unit_price. Alias as cat1_value.",
      "referenceSql": "SELECT SUM(stock_qty * unit_price) AS cat1_value FROM products WHERE category_id = 1;"
    },
    {
      "id": 25,
      "prompt": "Concatenate all distinct customer regions into a single string separated by ', '. Alias as all_regions.",
      "referenceSql": "SELECT GROUP_CONCAT(DISTINCT region) AS all_regions FROM customers;"
    }
  ]
};
