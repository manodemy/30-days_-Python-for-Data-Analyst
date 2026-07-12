if (!window.COURSE_CONTENT) window.COURSE_CONTENT = {};
window.COURSE_CONTENT['day02'] = {
  "day": 2,
  "title": "Filtering Data with WHERE",
  "db": "retail",
  "emoji": "🔍",
  "slides": [
    {
      "title": "01. Row Filtering & The WHERE Clause",
      "duration": "0:00",
      "html": `
        <h2>🔍 01. Row Filtering &amp; The WHERE Clause</h2>
        <div class="slide-section">
          <div class="rdbms-intro-section" id="rowFilteringIntro">
            <h3 class="heading-with-audio">
              The Row Filter Gate
              <button class="audio-play-btn" onclick="playAudio('New_Day2Part1audio01.mp3', this)" title="Play narration">
                <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              </button>
            </h3>
            <p>The <code>WHERE</code> clause acts as a <strong>horizontal filter</strong>. While SELECT projects fields vertically (reducing columns), WHERE checks each row against a boolean expression, keeping only the records that evaluate to <code>TRUE</code>.</p>
            
            <div class="relation-infographic" style="padding: 16px 20px;" id="whereFilterDiagram">
              <div class="explanation-title">How Row Filtering Works</div>
              <div class="relation-visual" style="justify-content: center; gap: 6px;">
                <div class="relation-node" style="border-left: 4px solid #64748b; flex: none;">
                  <span class="node-icon">📋</span>
                  <div class="node-title">Raw Table</div>
                  <div class="node-subtitle">10 Employees</div>
                </div>
                <div class="relation-link">
                  <div class="link-label">Filter</div>
                  <div class="link-arrow"><div class="link-line"></div><svg class="arrow-head" width="8" height="12" viewBox="0 0 8 12" fill="none"><path d="M2 2L6 6L2 10" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg></div>
                </div>
                <div class="relation-node" style="border-left: 4px solid #f97316; flex: none;">
                  <span class="node-icon">⚡</span>
                  <div class="node-title">WHERE salary &gt;= 80000</div>
                  <div class="node-subtitle">Step 3 Execution Gate</div>
                </div>
                <div class="relation-link">
                  <div class="link-label">Output</div>
                  <div class="link-arrow"><div class="link-line"></div><svg class="arrow-head" width="8" height="12" viewBox="0 0 8 12" fill="none"><path d="M2 2L6 6L2 10" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg></div>
                </div>
                <div class="relation-node relation-node--child" style="flex: none;">
                  <span class="node-icon">✅</span>
                  <div class="node-title">Filtered Rows</div>
                  <div class="node-subtitle">3 Matching Records</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="slide-section">
          <h3 class="heading-with-audio" id="whyWhereEarly">
            The Performance Benefit of Filtering Early
            <button class="audio-play-btn" onclick="playAudio('New_Day2Part1audio02.mp3', this)" title="Play narration">
              <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </button>
          </h3>
          <p>By placing filters in the <code>WHERE</code> clause, you reduce database overhead immediately after fetching rows from storage, which saves RAM and network bandwidth:</p>

          <div class="rdbms-infographic">
            <div class="info-columns">
              <div class="info-card info-card--blue">
                <div class="info-card-header">STEP 3 OF EXECUTION</div>
                <ul class="info-card-bullets">
                  <li><span class="bullet-dot"></span>FROM ➔ JOIN ➔ WHERE (Evaluated 3rd)</li>
                  <li><span class="bullet-dot"></span>Filters raw rows before grouping (GROUP BY)</li>
                  <li><span class="bullet-dot"></span>Prevents sorting/aggregate computations on drop-candidate rows</li>
                </ul>
              </div>
              <div class="info-card info-card--green">
                <div class="info-card-header">SARGABLE CONDITIONS</div>
                <ul class="info-card-bullets">
                  <li>
                    <span class="bullet-dot"></span>
                    <div style="display: flex; flex-direction: column; align-items: flex-start; width: 100%;">
                      <span>Uses B-Tree indexes directly:</span>
                      <div style="display: flex; justify-content: center; width: 100%; margin-top: 6px; box-sizing: border-box;">
                        <code style="color: #065f46 !important; background: #e6f4ea !important; border: 1px solid #a3cfbb !important; padding: 3px 8px !important; border-radius: 4px; font-size: 0.72rem !important; font-family: JetBrains Mono, monospace; white-space: nowrap;">WHERE id = 5</code>
                      </div>
                    </div>
                  </li>
                  <li><span class="bullet-dot"></span>Avoids full table scans (reading every page)</li>
                  <li><span class="bullet-dot"></span>Dramatically speeds up analytical queries</li>
                </ul>
              </div>
              <div class="info-card info-card--orange">
                <div class="info-card-header">BANDWIDTH REDUCTION</div>
                <ul class="info-card-bullets">
                  <li><span class="bullet-dot"></span>Limits memory allocated for query workspace</li>
                  <li><span class="bullet-dot"></span>Minimizes payload serialized to the app client</li>
                  <li><span class="bullet-dot"></span>Reduces query timeouts and database locks</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="slide-section">
          <h4 style="color:#1e293b;margin:24px 0 8px;font-size:0.95rem;font-weight:700;">SQL Comparison Operators</h4>
          <p>To compare values, SQL supports standard mathematical operators. Note that SQL defines a unique standard for inequality:</p>
          <div class="db-mock-table-wrap">
            <table class="db-table-mock db-table-mock--compact">
              <thead>
                <tr>
                  <th style="width: 15%;">Operator</th>
                  <th style="width: 30%;">Meaning</th>
                  <th style="width: 38%;">Example</th>
                  <th style="width: 17%;">ANSI Compliance</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>=</code></td>
                  <td>Equal To</td>
                  <td><code>WHERE department_id = 10</code></td>
                  <td>✅ Yes</td>
                </tr>
                <tr>
                  <td><code>&lt;&gt;</code></td>
                  <td>Not Equal To (Standard)</td>
                  <td><code>WHERE region &lt;&gt; 'North'</code></td>
                  <td>✅ Yes (Standard)</td>
                </tr>
                <tr>
                  <td><code>!=</code></td>
                  <td>Not Equal To (Alias)</td>
                  <td><code>WHERE region != 'North'</code></td>
                  <td>⚠️ Non-Standard</td>
                </tr>
                <tr>
                  <td><code>&gt;</code>, <code>&gt;=</code></td>
                  <td>Greater Than (or Equal)</td>
                  <td><code>WHERE salary &gt;= 80000</code></td>
                  <td>✅ Yes</td>
                </tr>
                <tr>
                  <td><code>&lt;</code>, <code>&lt;=</code></td>
                  <td>Less Than (or Equal)</td>
                  <td><code>WHERE stock_qty &lt; 15</code></td>
                  <td>✅ Yes</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p style="font-size: 0.72rem; color: #64748b; margin-top: -6px; line-height: 1.45;">
            <strong>💡 Notes:</strong> Although <code>!=</code> is technically non-standard, it is universally supported by almost all modern RDBMS engines (MySQL, PostgreSQL, SQL Server, SQLite, Oracle). The distinction mostly matters for strict compliance questions or working with legacy environments.
          </p>
        </div>

        <div class="slide-section">
          <h3 class="heading-with-audio" id="whereMockTableSection">
            Interactive Processing Example
            <button class="audio-play-btn" onclick="playAudio('New_Day2Part1audio03.mp3', this)" title="Play narration">
              <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </button>
          </h3>
          <p>Let's visualize how the database evaluates <code>WHERE salary &gt;= 80000</code> row-by-row on the <code>employees</code> table:</p>
          
          <div class="db-mock-table-wrap">
            <table class="db-table-mock db-table-mock--compact">
              <thead>
                <tr>
                  <th>id</th>
                  <th>name</th>
                  <th>department</th>
                  <th>salary</th>
                  <th>Evaluation</th>
                </tr>
              </thead>
              <tbody>
                <tr style="background: rgba(16, 185, 129, 0.08); border-left: 4px solid #10b981;">
                  <td>1</td>
                  <td>Aarav Sharma</td>
                  <td>Engineering</td>
                  <td><strong>87,500</strong></td>
                  <td style="color: #10b981; font-weight: 600;">✅ TRUE (Keep)</td>
                </tr>
                <tr style="opacity: 0.4; text-decoration: line-through;">
                  <td>2</td>
                  <td>Priya Desai</td>
                  <td>Marketing</td>
                  <td>63,200</td>
                  <td style="color: #ef4444;">❌ FALSE (Drop)</td>
                </tr>
                <tr style="background: rgba(16, 185, 129, 0.08); border-left: 4px solid #10b981;">
                  <td>3</td>
                  <td>Rohit Mehta</td>
                  <td>Data Science</td>
                  <td><strong>112,800</strong></td>
                  <td style="color: #10b981; font-weight: 600;">✅ TRUE (Keep)</td>
                </tr>
                <tr style="opacity: 0.4; text-decoration: line-through;">
                  <td>4</td>
                  <td>Sneha Iyer</td>
                  <td>Finance</td>
                  <td>74,900</td>
                  <td style="color: #ef4444;">❌ FALSE (Drop)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="slide-section">
          <div class="pro-tip-box" id="whereProTip">
            <strong>💡 Pro Tip — Sargability:</strong> Avoid using functions on columns in the <code>WHERE</code> clause (e.g., <code>WHERE UPPER(name) = 'ALICE'</code>). This makes the query <strong>non-sargable</strong>, meaning the database engine cannot use B-Tree indexes and must perform a full table scan. Instead, keep columns bare: <code>WHERE name = 'Alice'</code>.
          </div>
        </div>

        <div class="slide-section">
          <div class="interview-box">
            <h4 style="margin: 0; margin-bottom: 12px;">🎓 Interview Q&amp;A</h4>
            <div>
              <p style="margin: 0; margin-bottom: 4px;"><strong>Q: What does "Sargable" mean in SQL?</strong></p>
              <p><em>A: SARGable stands for "Search Argument Able". A condition is sargable if the query optimizer can use an index to speed up the query execution instead of performing a full table scan. Conditions that wrap columns in functions (like <code>YEAR(order_date) = 2024</code>) are non-sargable because the index was built on the raw column values, not the computed output. Keep columns bare for optimal B-Tree index traversal.</em></p>
            </div>

            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div>
              <p style="margin: 0; margin-bottom: 4px;"><strong>Q: How does <code>WHERE</code> filter rows compared to <code>HAVING</code> in terms of query execution?</strong></p>
              <p><em>A: The <code>WHERE</code> clause filters individual rows before grouping or aggregation takes place. The <code>HAVING</code> clause filters aggregated groups after the <code>GROUP BY</code> clause has been processed. Using <code>WHERE</code> to drop non-qualifying rows early is highly optimized because it reduces the volume of data that needs to be sorted and aggregated in memory.</em></p>
            </div>

            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div>
              <p style="margin: 0; margin-bottom: 4px;"><strong>Q: Give an example of a non-sargable query using standard date operations, and show how you would rewrite it to be sargable.</strong></p>
              <p><em>A: A query like <code>SELECT * FROM orders WHERE YEAR(order_date) = 2024</code> is non-sargable because the optimizer cannot traverse the B-Tree index built on <code>order_date</code>. To make it sargable, we keep the column bare and use a range query: <code>WHERE order_date &gt;= '2024-01-01' AND order_date &lt; '2025-01-01'</code>.</em></p>
            </div>
          </div>
        </div>
      `
    },
    {
      "title": "02. Comparison & Logical Precedence",
      "duration": "0:00",
      "html": `
        <h2>⚡ 02. Comparison &amp; Logical Precedence</h2>
        <div class="slide-section">
          <div class="rdbms-intro-section" id="precedenceIntro">
            <h3 class="heading-with-audio">
              Operators &amp; Precedence Precaution
              <button class="audio-play-btn" onclick="playAudio('New_Day2Part2audio01.mp3', this)" title="Play narration">
                <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              </button>
            </h3>
            <p>When filtering data with multiple criteria, logical operators evaluate in a strict hierarchical order of operations: <strong>NOT</strong> evaluates first, followed by <strong>AND</strong>, and finally <strong>OR</strong>.</p>
            
            <div class="rdbms-infographic" style="margin-top: 15px;">
              <div class="info-title">LOGICAL OPERATOR PRECEDENCE</div>
              <div class="info-columns">
                <div class="info-card info-card--red">
                  <div class="info-card-header">1. NOT (Negation)</div>
                  <ul class="info-card-bullets">
                    <li><span class="bullet-dot"></span>Highest precedence level</li>
                    <li><span class="bullet-dot"></span>Evaluated first in boolean chain</li>
                    <li><span class="bullet-dot"></span>Reverses the logic of its operand</li>
                  </ul>
                </div>
                <div class="info-card info-card--orange">
                  <div class="info-card-header">2. AND (Conjunction)</div>
                  <ul class="info-card-bullets">
                    <li><span class="bullet-dot"></span>Medium precedence level</li>
                    <li><span class="bullet-dot"></span>Acts as logical multiplication</li>
                    <li><span class="bullet-dot"></span>Requires both inputs to be TRUE</li>
                  </ul>
                </div>
                <div class="info-card info-card--green">
                  <div class="info-card-header">3. OR (Disjunction)</div>
                  <ul class="info-card-bullets">
                    <li><span class="bullet-dot"></span>Lowest precedence level</li>
                    <li><span class="bullet-dot"></span>Acts as logical addition</li>
                    <li><span class="bullet-dot"></span>Requires at least one input to be TRUE</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="slide-section">
          <h3 class="heading-with-audio" id="precedenceComparison">
            Implicit vs. Explicit Parentheses
            <button class="audio-play-btn" onclick="playAudio('New_Day2Part2audio02.mp3', this)" title="Play narration">
              <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </button>
          </h3>
          <p>Relying on implicit precedence can lead to severe data integrity bugs. Use parentheses explicitly to override the default ordering and secure correct query outcomes:</p>

          <div class="vs-block">
            <div class="vs-card vs-card--bad">
              <h4>❌ Implicit Precedence (Bug Risk)</h4>
              <pre style="margin: 0; font-size: 0.75rem;">SELECT * FROM employees
WHERE department_id = 10
  AND salary > 80000
   OR department_id = 20;</pre>
              <small style="color: #991b1b; font-size: 0.72rem; display: block; margin-top: 6px; font-weight: 600;">
                ⚠️ Evaluates as: <code>(dept = 10 AND salary &gt; 80k) OR dept = 20</code>. Returns ANY employee in department 20, regardless of salary!
              </small>
            </div>
            <div class="vs-card vs-card--good">
              <h4>✅ Explicit Parentheses (Secure Design)</h4>
              <pre style="margin: 0; font-size: 0.75rem;">SELECT * FROM employees
WHERE (department_id = 10
   OR department_id = 20)
  AND salary > 80000;</pre>
              <small style="color: #065f46; font-size: 0.72rem; display: block; margin-top: 6px; font-weight: 600;">
                🛡️ Correctly groups the departments first, then applies the salary threshold to both. Reliable and readable.
              </small>
            </div>
          </div>
        </div>

        <div class="slide-section">
          <div class="warn-box" id="shortCircuitWarning">
            <strong>⚠️ Instructor Gotcha: Logical Short-Circuiting &amp; Optimizer Freedom</strong>
            <p>In imperative languages (Python/JS), logical expressions are guaranteed to short-circuit from left to right. In SQL, because it is <strong>declarative</strong>, the query optimizer has complete freedom to evaluate terms in whatever order it deems most efficient!</p>
            <p>For example, writing:
            <code>WHERE x != 0 AND y / x &gt; 2</code>
            can still crash your query with a <strong>division-by-zero error</strong> because the database engine might choose to evaluate the division on the right before checking the inequality on the left!</p>
          </div>
        </div>

        <div class="slide-section">
          <div class="pro-tip-box" id="precedenceProTip">
            <strong>💡 Pro Tip — Code Readability:</strong> Even when implicit precedence evaluates correctly, always use explicit parentheses to document your intent. This prevents future maintainers from misinterpreting the filter conditions and keeps query behavior deterministic.
          </div>
        </div>

        <div class="slide-section">
          <div class="interview-box">
            <h4 style="margin: 0; margin-bottom: 12px;">🎓 Interview Q&amp;A</h4>
            <div>
              <p style="margin: 0; margin-bottom: 4px;"><strong>Q: What is the logical execution order of NOT, AND, and OR?</strong></p>
              <p><em>A: SQL resolves negation (NOT) first, followed by conjunction (AND), and lastly disjunction (OR). Because AND has higher precedence than OR, a query like <code>A OR B AND C</code> will run as <code>A OR (B AND C)</code>. To change this ordering, wrap conditions in parentheses <code>(A OR B) AND C</code>.</em></p>
            </div>

            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div>
              <p style="margin: 0; margin-bottom: 4px;"><strong>Q: Explain how SQL optimizers handle "short-circuiting" compared to traditional programming languages.</strong></p>
              <p><em>A: In standard programming languages, logical expressions are guaranteed to short-circuit from left to right. In declarative SQL, the query optimizer decides the order of evaluation based on statistics and cost models. A condition on the right could run first, meaning you cannot rely on left-to-right evaluation to prevent runtime exceptions like division-by-zero.</em></p>
            </div>

            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div>
              <p style="margin: 0; margin-bottom: 4px;"><strong>Q: How does the presence of <code>NULL</code> values affect logical operations using <code>AND</code> and <code>OR</code>?</strong></p>
              <p><em>A: SQL uses three-valued logic (TRUE, FALSE, UNKNOWN). A comparison involving <code>NULL</code> yields <code>UNKNOWN</code>. Therefore, <code>TRUE AND UNKNOWN</code> yields <code>UNKNOWN</code>, but <code>FALSE AND UNKNOWN</code> yields <code>FALSE</code> (since one false term invalidates the whole conjunction). For disjunctions, <code>TRUE OR UNKNOWN</code> yields <code>TRUE</code>, while <code>FALSE OR UNKNOWN</code> yields <code>UNKNOWN</code>.</em></p>
            </div>
          </div>
        </div>
      `
    },
    {
      "title": "03. Range, Membership & NULL Filters",
      "duration": "0:00",
      "html": `
        <h2>📋 03. Range, Membership &amp; NULL Filters</h2>
        <div class="slide-section">
          <div class="rdbms-intro-section" id="rangeListIntro">
            <h3 class="heading-with-audio">
              Using BETWEEN &amp; IN Cleanly
              <button class="audio-play-btn" onclick="playAudio('New_Day2Part3audio01.mp3', this)" title="Play narration">
                <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              </button>
            </h3>
            <p>For cleaner and more performant query structures, SQL supports shorthand operators to verify bounds (<code>BETWEEN ... AND</code>) and lists of matches (<code>IN</code>):</p>
            
            <div class="vs-block">
              <div class="vs-card vs-card--pk">
                <h4>Inclusive Bounds: BETWEEN</h4>
                <p style="font-size: 0.74rem;">Checks if a value falls within a range (bounds are <strong>inclusive</strong>).</p>
                <pre style="margin: 6px 0 0 0; font-size: 0.74rem;">SELECT * FROM employees
WHERE salary BETWEEN 60000 AND 90000;
-- Equivalent to:
-- salary >= 60000 AND salary <= 90000</pre>
              </div>
              <div class="vs-card vs-card--fk">
                <h4>Discrete Lists: IN</h4>
                <p style="font-size: 0.74rem;">Checks if a value matches any element in a predefined list.</p>
                <pre style="margin: 6px 0 0 0; font-size: 0.74rem;">SELECT * FROM customers
WHERE region IN ('North', 'East');
-- Equivalent to:
-- region = 'North' OR region = 'East'</pre>
              </div>
            </div>
          </div>
        </div>

        <div class="slide-section" id="dateBetweenTrapSection">
          <h3 class="heading-with-audio" id="dateBetweenTrap">
            ⚠️ The Date-Range BETWEEN Trap
            <button class="audio-play-btn" onclick="playAudio('New_Day2Part3audio02.mp3', this)" title="Play narration">
              <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </button>
          </h3>
          <p>Using <code>BETWEEN</code> on date/timestamp fields is a common source of bugs in financial reports. Because dates without time components default to midnight, you can lose data:</p>

          <div class="pro-tip-box" id="dateBetweenTrapBox">
            <strong>⚠️ The Problem:</strong>
            <p>Evaluating <code>WHERE order_date BETWEEN '2023-01-01' AND '2023-01-02'</code> translates logically to:
            <code>order_date &gt;= '2023-01-01 00:00:00' AND order_date &lt;= '2023-01-02 00:00:00'</code></p>
            <p>Notice the upper bound: it matches exactly midnight on Jan 2nd. <strong>An order placed at 2:30 PM on Jan 2nd will be silently excluded from your report!</strong></p>
            <strong>The Best Practice Fix:</strong> Use explicit inequalities:
            <code>WHERE order_date &gt;= '2023-01-01' AND order_date &lt; '2023-01-03'</code>
          </div>
        </div>

        <div class="slide-section">
          <h3 class="heading-with-audio" id="nullTrapSection">
            ⚠️ The NOT IN &amp; NULL Nightmare
            <button class="audio-play-btn" onclick="playAudio('New_Day2Part3audio03.mp3', this)" title="Play narration">
              <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </button>
          </h3>
          <p>Three-Valued Logic causes major gotchas. If a list contains a <code>NULL</code>, using <code>NOT IN</code> collapses the entire filter logic:</p>
          
          <div class="warn-box" id="nullTrapBox">
            <strong>How SQL processes <code>NOT IN (1, 2, NULL)</code>:</strong>
            <p>Translates to: <code>val != 1 AND val != 2 AND val != NULL</code></p>
            <p>In database logic, comparison with NULL (<code>val != NULL</code>) evaluates to <strong>UNKNOWN</strong>. 
            Because <code>AND</code> requires all terms to be TRUE, the entire statement resolves to UNKNOWN. 
            <strong>As a result, the query will return exactly zero rows!</strong></p>
          </div>
        </div>

        <div class="slide-section">
          <div class="pro-tip-box" style="background:#fffbeb; border:1px solid #fef3c7; border-left:4px solid #f59e0b; color:#78350f;">
            <strong>💡 Pro Tip — Defending against NULL:</strong> Always filter out NULLs when using subqueries inside <code>NOT IN</code> (e.g. <code>WHERE id NOT IN (SELECT id FROM t WHERE id IS NOT NULL)</code>), or rewrite the query using <code>NOT EXISTS</code>.
          </div>
        </div>

        <div class="slide-section">
          <div class="interview-box">
            <h4 style="margin: 0; margin-bottom: 12px;">🎓 Interview Q&amp;A</h4>
            <div>
              <p style="margin: 0; margin-bottom: 4px;"><strong>Q: Why does NOT IN return 0 rows when the list has a NULL?</strong></p>
              <p><em>A: In ANSI SQL, NULL represents an unknown value. The expression <code>x NOT IN (1, 2, NULL)</code> is logically equivalent to <code>x != 1 AND x != 2 AND x != NULL</code>. Since any comparison against NULL evaluates to UNKNOWN, the entire conjunct chain evaluates to UNKNOWN, causing the row filter to reject all records. Always use IS NOT NULL filters or EXISTS/NOT EXISTS clauses.</em></p>
            </div>

            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div>
              <p style="margin: 0; margin-bottom: 4px;"><strong>Q: What is the difference between <code>BETWEEN</code> and explicit <code>&gt;=</code> / <code>&lt;=</code> operators, especially when filtering dates?</strong></p>
              <p><em>A: The <code>BETWEEN</code> operator is inclusive (e.g., <code>x BETWEEN 1 AND 5</code> includes 1 and 5). When filtering timestamped columns like <code>2024-12-31 15:30:00</code> with <code>BETWEEN '2024-01-01' AND '2024-12-31'</code>, it implicitly casts to <code>2024-12-31 00:00:00</code>. Thus, any records late on the final day are excluded. Using explicit ranges like <code>&gt;= '2024-01-01' AND &lt; '2025-01-01'</code> is much safer.</em></p>
            </div>

            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div>
              <p style="margin: 0; margin-bottom: 4px;"><strong>Q: Why can't we use standard operators like <code>= NULL</code> or <code>!= NULL</code> to filter NULL values in SQL?</strong></p>
              <p><em>A: In SQL, <code>NULL</code> represents a missing or unknown value, not a zero or empty string. Since we cannot know if two unknown values are equal, any comparison like <code>x = NULL</code> results in <code>UNKNOWN</code> rather than <code>TRUE</code>. To check for the absence or presence of a value, we must use the special unary predicates <code>IS NULL</code> or <code>IS NOT NULL</code>.</em></p>
            </div>
          </div>
        </div>
      `
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
      "referenceSql": "SELECT name, stock_qty FROM products WHERE unit_price < 50 AND stock_qty > 100;"
    },
    {
      "id": 5,
      "prompt": "<strong>Practice Task: Region Specific Customers</strong><br/>The marketing team needs contact info for clients. Retrieve email and region for customers in 'North' or 'East' regions.",
      "referenceSql": "SELECT email, region FROM customers WHERE region IN ('North', 'East');"
    },
    {
      "id": 6,
      "prompt": "<strong>Practice Task: Compensation Scan</strong><br/>Find employees with high salaries. Retrieve first_name, last_name, and salary for employees earning between 60000 and 100000.",
      "referenceSql": "SELECT first_name, last_name, salary FROM employees WHERE salary BETWEEN 60000 AND 100000;"
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
      "label": "Topic 1: Row Filtering & WHERE",
      "recordingKey": null
    },
    {
      "id": "topic-2",
      "label": "Topic 2: Logical Precedence",
      "recordingKey": null
    },
    {
      "id": "topic-3",
      "label": "Topic 3: Range & List Filters",
      "recordingKey": null
    }
  ]
};
