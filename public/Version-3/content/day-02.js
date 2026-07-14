// Day 02 content — Filtering Data with WHERE
if (!window.COURSE_CONTENT) window.COURSE_CONTENT = {};
window.COURSE_CONTENT['day02'] = {
  "day": 2,
  "title": "Filtering Data with WHERE",
  "db": "retail",
  "emoji": "🔍",
  "slides": [
    {
      "title": "Row Filtering & The WHERE Clause",
      "duration": "0:00",
      "html": `
        <h2>🔍 Filtering Data with the WHERE Clause</h2>

        <!-- ═══════════════════════════════════════════════════════════════════ -->
        <!-- PART 01 — THE WHERE CLAUSE & ROW FILTERING                        -->
        <!-- ═══════════════════════════════════════════════════════════════════ -->
        <div class="slide-section">
          <h3 class="heading-with-audio">
            01. The WHERE Clause — A Horizontal Filter
            <button class="audio-play-btn" onclick="playAudio('New_Day2Part1audio01.mp3', this)" title="Play narration">
              <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </button>
          </h3>
          <p>The <code>WHERE</code> clause acts as a <strong>horizontal filter</strong>. While <code>SELECT</code> projects fields <em>vertically</em> (reducing columns), <code>WHERE</code> evaluates each row against a boolean expression and keeps only the records that resolve to <code>TRUE</code>.</p>

          <div class="relation-infographic" style="padding: 16px 20px;" id="whereFilterDiagram">
            <div class="explanation-title">How Row Filtering Works</div>
            <div class="relation-visual" style="align-items: center;">
              <div class="relation-node" id="filterRawTable" style="flex: none;">
                <div class="node-icon-badge">📋</div>
                <div class="node-title">Raw Table</div>
                <div class="node-subtitle">All 10 Rows</div>
              </div>
              <div class="relation-link" id="filterGateLoads">
                <div class="link-label">Evaluated</div>
                <div class="link-arrow"><div class="link-line"></div><svg class="arrow-head" width="8" height="12" viewBox="0 0 8 12" fill="none"><path d="M2 2L6 6L2 10" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg></div>
              </div>
              <div class="relation-node" id="filterGateExecute" style="flex: none;">
                <div class="node-icon-badge">⚡</div>
                <div class="node-title">WHERE salary &gt;= 80000</div>
                <div class="node-subtitle">Step 3 — Execution Gate</div>
              </div>
              <div class="relation-link" id="filterGateOutput">
                <div class="link-label">Passes</div>
                <div class="link-arrow"><div class="link-line"></div><svg class="arrow-head" width="8" height="12" viewBox="0 0 8 12" fill="none"><path d="M2 2L6 6L2 10" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/></svg></div>
              </div>
              <div class="relation-node relation-node--child" id="filterGateResult" style="flex: none;">
                <div class="node-icon-badge">✅</div>
                <div class="node-title">Filtered Result</div>
                <div class="node-subtitle">3 Matching Rows</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Execution Order & Performance -->
        <div class="slide-section">
          <h3 class="heading-with-audio" id="whyWhereEarly">
            Why Filtering Early Improves Performance
            <button class="audio-play-btn" onclick="playAudio('New_Day2Part1audio02.mp3', this)" title="Play narration">
              <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </button>
          </h3>
          <p>The <code>WHERE</code> clause is evaluated at <strong>Step 3</strong> of SQL's logical execution order — after <code>FROM</code> and <code>JOIN</code>, but before <code>GROUP BY</code>, <code>HAVING</code>, and <code>SELECT</code>. This means qualifying rows are removed early, before expensive aggregations and sorts run:</p>

          <div class="rdbms-infographic">
            <div class="info-columns">
              <div class="info-card info-card--blue">
                <div class="info-card-header">STEP 3 OF EXECUTION</div>
                <ul class="info-card-bullets">
                  <li><span class="bullet-dot"></span>FROM ➔ JOIN ➔ <strong>WHERE</strong> (3rd)</li>
                  <li><span class="bullet-dot"></span>Filters raw rows before GROUP BY</li>
                  <li><span class="bullet-dot"></span>Prevents wasted aggregation work</li>
                </ul>
              </div>
              <div class="info-card info-card--green">
                <div class="info-card-header">SARGABLE CONDITIONS</div>
                <ul class="info-card-bullets">
                  <li><span class="bullet-dot"></span>Bare columns allow B-Tree index use</li>
                  <li><span class="bullet-dot"></span>Avoids full table scans on large tables</li>
                  <li><span class="bullet-dot"></span>Example: <code style="font-size:0.68rem;background:#e6f4ea;padding:1px 4px;border-radius:3px;color:#065f46;">WHERE id = 5</code></li>
                </ul>
              </div>
              <div class="info-card info-card--orange">
                <div class="info-card-header">BANDWIDTH REDUCTION</div>
                <ul class="info-card-bullets">
                  <li><span class="bullet-dot"></span>Less memory for query workspace</li>
                  <li><span class="bullet-dot"></span>Smaller payloads sent to app client</li>
                  <li><span class="bullet-dot"></span>Fewer database locks and timeouts</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Comparison Operators Reference Table -->
        <div class="slide-section">
          <h3 class="heading-with-audio" id="comparisonOperatorsSection">
            SQL Comparison Operators
            <button class="audio-play-btn" onclick="playAudio('New_Day2Part1audio03.mp3', this)" title="Play narration">
              <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </button>
          </h3>
          <p>SQL supports all standard mathematical comparison operators. The standard inequality operator is <code>&lt;&gt;</code>, though most engines also accept <code>!=</code>:</p>

          <div class="db-mock-table-wrap">
            <table class="db-table-mock db-table-mock--compact">
              <thead>
                <tr>
                  <th style="width: 15%;">Operator</th>
                  <th style="width: 30%;">Meaning</th>
                  <th style="width: 38%;">Example</th>
                  <th style="width: 17%;">ANSI Standard</th>
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
                  <td>Not Equal (Standard)</td>
                  <td><code>WHERE region &lt;&gt; 'North'</code></td>
                  <td>✅ Yes</td>
                </tr>
                <tr>
                  <td><code>!=</code></td>
                  <td>Not Equal (Alias)</td>
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
          <p style="font-size: 0.72rem; color: #64748b; margin-top: 6px; line-height: 1.5;">
            <strong>💡 Note:</strong> Although <code>!=</code> is non-standard, it is supported by MySQL, PostgreSQL, SQL Server, SQLite, and Oracle. The <code>&lt;&gt;</code> form is preferred for strict ANSI compliance and portability.
          </p>
        </div>

        <!-- Row-by-Row Evaluation Visual Table -->
        <div class="slide-section">
          <h3 class="heading-with-audio" id="whereMockTableSection">
            Row-by-Row Evaluation Visualized
            <button class="audio-play-btn" onclick="playAudio('New_Day2Part1audio03.mp3', this)" title="Play narration">
              <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </button>
          </h3>
          <p>The database engine checks every row against <code>WHERE salary &gt;= 80000</code>. Rows that evaluate to <code>FALSE</code> are immediately discarded — they never reach <code>SELECT</code> projection:</p>

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
                <tr style="background: rgba(16, 185, 129, 0.08); border-left: 3px solid #10b981;">
                  <td>1</td><td>Aarav Sharma</td><td>Engineering</td>
                  <td><strong>87,500</strong></td>
                  <td style="color: #10b981; font-weight: 600;">✅ TRUE — Keep</td>
                </tr>
                <tr style="opacity: 0.38; text-decoration: line-through;">
                  <td>2</td><td>Priya Desai</td><td>Marketing</td>
                  <td>63,200</td>
                  <td style="color: #ef4444; text-decoration: none; opacity: 1;">❌ FALSE — Drop</td>
                </tr>
                <tr style="background: rgba(16, 185, 129, 0.08); border-left: 3px solid #10b981;">
                  <td>3</td><td>Rohit Mehta</td><td>Data Science</td>
                  <td><strong>112,800</strong></td>
                  <td style="color: #10b981; font-weight: 600;">✅ TRUE — Keep</td>
                </tr>
                <tr style="opacity: 0.38; text-decoration: line-through;">
                  <td>4</td><td>Sneha Iyer</td><td>Finance</td>
                  <td>74,900</td>
                  <td style="color: #ef4444; text-decoration: none; opacity: 1;">❌ FALSE — Drop</td>
                </tr>
                <tr style="background: rgba(16, 185, 129, 0.08); border-left: 3px solid #10b981;">
                  <td>5</td><td>Vikram Nair</td><td>Engineering</td>
                  <td><strong>96,300</strong></td>
                  <td style="color: #10b981; font-weight: 600;">✅ TRUE — Keep</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Sargability Pro Tip -->
        <div class="slide-section">
          <div class="pro-tip-box" id="whereProTip" style="display: flex; align-items: flex-start; gap: 10px;">
            <div style="flex: 1;">
              <strong>💡 Pro Tip — Sargability (Search Argument Able):</strong> Avoid wrapping columns inside functions in a <code>WHERE</code> clause (e.g. <code>WHERE UPPER(name) = 'ALICE'</code>). This makes the condition <strong>non-sargable</strong> — the engine cannot use a B-Tree index and is forced to perform a full table scan. Keep columns bare: <code>WHERE name = 'Alice'</code>.
            </div>
          </div>
        </div>

        <!-- ═══════════════════════════════════════════════════════════════════ -->
        <!-- PART 02 — LOGICAL OPERATORS & PRECEDENCE                          -->
        <!-- ═══════════════════════════════════════════════════════════════════ -->
        <div class="slide-section" style="margin-top: 32px;">
          <h3>02. Logical Operators &amp; Precedence</h3>

          <div class="rdbms-intro-section" id="precedenceIntro">
            <h3 class="heading-with-audio">
              NOT → AND → OR: The Strict Hierarchy
              <button class="audio-play-btn" onclick="playAudio('New_Day2Part2audio01.mp3', this)" title="Play narration">
                <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              </button>
            </h3>
            <p>When multiple logical operators appear in a <code>WHERE</code> clause, SQL evaluates them in a strict, fixed order — <strong>NOT</strong> first, then <strong>AND</strong>, then <strong>OR</strong>. Misunderstanding this order is one of the most common sources of subtle data integrity bugs.</p>

            <div class="rdbms-infographic" style="margin-top: 15px;">
              <div class="info-title">LOGICAL OPERATOR PRECEDENCE (Highest → Lowest)</div>
              <div class="info-columns">
                <div class="info-card info-card--red">
                  <div class="info-card-header">1st — NOT</div>
                  <ul class="info-card-bullets">
                    <li><span class="bullet-dot"></span>Highest precedence</li>
                    <li><span class="bullet-dot"></span>Inverts a single condition</li>
                    <li><span class="bullet-dot"></span><code style="font-size:0.68rem;background:#fee2e2;padding:1px 4px;border-radius:3px;color:#991b1b;">NOT active = TRUE</code></li>
                  </ul>
                </div>
                <div class="info-card info-card--orange">
                  <div class="info-card-header">2nd — AND</div>
                  <ul class="info-card-bullets">
                    <li><span class="bullet-dot"></span>Medium precedence</li>
                    <li><span class="bullet-dot"></span>Both conditions must be TRUE</li>
                    <li><span class="bullet-dot"></span>Acts like logical multiplication</li>
                  </ul>
                </div>
                <div class="info-card info-card--green">
                  <div class="info-card-header">3rd — OR</div>
                  <ul class="info-card-bullets">
                    <li><span class="bullet-dot"></span>Lowest precedence</li>
                    <li><span class="bullet-dot"></span>At least one must be TRUE</li>
                    <li><span class="bullet-dot"></span>Acts like logical addition</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Implicit vs Explicit Parentheses -->
        <div class="slide-section">
          <h3 class="heading-with-audio" id="precedenceComparison">
            Implicit vs. Explicit Parentheses
            <button class="audio-play-btn" onclick="playAudio('New_Day2Part2audio02.mp3', this)" title="Play narration">
              <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </button>
          </h3>
          <p>Because <code>AND</code> binds tighter than <code>OR</code>, mixing them without parentheses produces silent logic bugs. The query below looks correct but returns wrong data:</p>

          <div class="vs-block">
            <div class="vs-card vs-card--bad">
              <h4>❌ Implicit Precedence — Data Bug</h4>
              <pre style="margin: 0; font-size: 0.74rem;">SELECT * FROM employees
WHERE department_id = 10
  AND salary > 80000
   OR department_id = 20;</pre>
              <small style="color: #991b1b; font-size: 0.72rem; display: block; margin-top: 8px; font-weight: 600; line-height: 1.5;">
                ⚠️ SQL reads this as <code>(dept = 10 AND salary &gt; 80k) OR dept = 20</code>.<br/>
                Every employee in dept 20 is returned — regardless of salary!
              </small>
            </div>
            <div class="vs-card vs-card--good">
              <h4>✅ Explicit Parentheses — Correct Intent</h4>
              <pre style="margin: 0; font-size: 0.74rem;">SELECT * FROM employees
WHERE (department_id = 10
    OR department_id = 20)
  AND salary > 80000;</pre>
              <small style="color: #065f46; font-size: 0.72rem; display: block; margin-top: 8px; font-weight: 600; line-height: 1.5;">
                🛡️ Groups departments first, then applies the salary threshold to both.<br/>
                Reliable, readable, and unambiguous.
              </small>
            </div>
          </div>
        </div>

        <!-- Short-Circuit Warning -->
        <div class="slide-section">
          <div class="warn-box" id="shortCircuitWarning">
            <strong>⚠️ Instructor Gotcha — Optimizer Freedom &amp; Short-Circuiting:</strong>
            <p>In imperative languages like Python or JavaScript, logical expressions are <em>guaranteed</em> to short-circuit left-to-right. In SQL, the query optimizer is free to evaluate conditions in any order it deems most efficient.</p>
            <p>This means writing <code>WHERE x != 0 AND y / x &gt; 2</code> can still raise a <strong>division-by-zero error</strong> — the engine may evaluate the right side first. Always use <code>CASE WHEN</code> or <code>NULLIF</code> to guard against unsafe arithmetic.</p>
          </div>
        </div>

        <div class="slide-section">
          <div class="pro-tip-box" id="precedenceProTip" style="display: flex; align-items: flex-start; gap: 10px;">
            <div style="flex: 1;">
              <strong>💡 Pro Tip — Document Intent with Parentheses:</strong> Even when implicit precedence produces the correct result, always use explicit parentheses to communicate your logic to future maintainers. Parentheses cost nothing at runtime but eliminate entire classes of misinterpretation.
            </div>
          </div>
        </div>

        <!-- ═══════════════════════════════════════════════════════════════════ -->
        <!-- PART 03 — BETWEEN, IN & NULL HANDLING                             -->
        <!-- ═══════════════════════════════════════════════════════════════════ -->
        <div class="slide-section" style="margin-top: 32px;">
          <h3>03. Range, Membership &amp; NULL Filters</h3>

          <div class="rdbms-intro-section" id="rangeListIntro">
            <h3 class="heading-with-audio">
              BETWEEN and IN — Shorthand Filters
              <button class="audio-play-btn" onclick="playAudio('New_Day2Part3audio01.mp3', this)" title="Play narration">
                <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
              </button>
            </h3>
            <p>SQL provides two powerful shorthand operators that replace verbose chains of <code>AND</code> / <code>OR</code> conditions while keeping queries readable:</p>

            <div class="vs-block">
              <div class="vs-card vs-card--pk">
                <h4>📏 BETWEEN — Inclusive Range</h4>
                <p style="font-size: 0.74rem; margin: 4px 0 8px;">Checks if a value falls within bounds. <strong>Both endpoints are inclusive.</strong></p>
                <pre style="margin: 0; font-size: 0.74rem;">SELECT * FROM employees
WHERE salary BETWEEN 60000 AND 90000;
-- Equivalent to:
-- salary >= 60000 AND salary <= 90000</pre>
              </div>
              <div class="vs-card vs-card--fk">
                <h4>📝 IN — Discrete List Match</h4>
                <p style="font-size: 0.74rem; margin: 4px 0 8px;">Checks if a value matches any member of a list. Cleaner than multiple <code>OR</code> conditions.</p>
                <pre style="margin: 0; font-size: 0.74rem;">SELECT * FROM customers
WHERE region IN ('North', 'East');
-- Equivalent to:
-- region = 'North' OR region = 'East'</pre>
              </div>
            </div>
          </div>
        </div>

        <!-- Date-Range BETWEEN Trap -->
        <div class="slide-section" id="dateBetweenTrapSection">
          <h3 class="heading-with-audio" id="dateBetweenTrap">
            ⚠️ The Date-Range BETWEEN Trap
            <button class="audio-play-btn" onclick="playAudio('New_Day2Part3audio02.mp3', this)" title="Play narration">
              <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </button>
          </h3>
          <p>When <code>BETWEEN</code> is used on <code>DATE</code> or <code>TIMESTAMP</code> columns, a common bug silently excludes records from financial reports:</p>

          <div class="vs-block">
            <div class="vs-card vs-card--bad">
              <h4>❌ The Bug — Midnight Truncation</h4>
              <pre style="margin: 0; font-size: 0.74rem;">WHERE order_date
  BETWEEN '2023-01-01'
      AND '2023-01-02'</pre>
              <small style="color: #991b1b; font-size: 0.71rem; display: block; margin-top: 8px; font-weight: 600; line-height: 1.5;">
                ⚠️ Upper bound becomes <code>2023-01-02 00:00:00</code>.<br/>
                Orders placed at 2:30 PM on Jan 2nd are silently excluded!
              </small>
            </div>
            <div class="vs-card vs-card--good">
              <h4>✅ The Fix — Explicit Half-Open Range</h4>
              <pre style="margin: 0; font-size: 0.74rem;">WHERE order_date >= '2023-01-01'
  AND order_date <  '2023-01-03'</pre>
              <small style="color: #065f46; font-size: 0.71rem; display: block; margin-top: 8px; font-weight: 600; line-height: 1.5;">
                🛡️ Uses a half-open interval. Captures every record for Jan 1 and Jan 2<br/>
                — including those with a time component.
              </small>
            </div>
          </div>
        </div>

        <!-- NOT IN & NULL Nightmare -->
        <div class="slide-section">
          <h3 class="heading-with-audio" id="nullTrapSection">
            ⚠️ The NOT IN &amp; NULL Nightmare
            <button class="audio-play-btn" onclick="playAudio('New_Day2Part3audio03.mp3', this)" title="Play narration">
              <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </button>
          </h3>
          <p>SQL's <strong>three-valued logic</strong> (TRUE / FALSE / UNKNOWN) creates a dangerous edge case: if a <code>NOT IN</code> list contains even a single <code>NULL</code>, the entire query returns <strong>zero rows</strong>.</p>

          <div class="warn-box" id="nullTrapBox">
            <strong>How SQL evaluates <code>val NOT IN (1, 2, NULL)</code>:</strong>
            <p>Expands to: <code>val != 1 AND val != 2 AND val != NULL</code></p>
            <p>Any comparison with <code>NULL</code> yields <code>UNKNOWN</code>. Because <code>AND</code> requires all operands to be <code>TRUE</code>, the chain collapses to <code>UNKNOWN</code> — and rows with <code>UNKNOWN</code> are filtered out. <strong>Result: 0 rows returned.</strong></p>
          </div>
        </div>

        <!-- IS NULL / IS NOT NULL -->
        <div class="slide-section">
          <h3 style="font-size: 0.9rem; color: #1e293b; font-weight: 700; margin-bottom: 8px;">Filtering NULL Values Correctly</h3>
          <p>Because <code>= NULL</code> always evaluates to <code>UNKNOWN</code>, SQL provides dedicated predicates to test for missing values:</p>

          <div class="db-mock-table-wrap">
            <table class="db-table-mock db-table-mock--compact">
              <thead>
                <tr>
                  <th style="width: 30%;">Predicate</th>
                  <th style="width: 35%;">Meaning</th>
                  <th style="width: 35%;">Example</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>IS NULL</code></td>
                  <td>Matches rows with no value in column</td>
                  <td><code>WHERE manager_id IS NULL</code></td>
                </tr>
                <tr>
                  <td><code>IS NOT NULL</code></td>
                  <td>Matches rows that have a value</td>
                  <td><code>WHERE email IS NOT NULL</code></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="pro-tip-box" style="margin-top: 14px; background:#fffbeb; border:1px solid #fef3c7; border-left:4px solid #f59e0b; color:#78350f;">
            <strong>💡 Pro Tip — Defending Against NULL in NOT IN:</strong> Always guard subqueries inside <code>NOT IN</code> with an explicit <code>IS NOT NULL</code> filter — or switch to <code>NOT EXISTS</code>, which handles NULLs correctly without any extra filtering.
            <div style="margin-top: 8px; display: flex; gap: 12px; flex-wrap: wrap;">
              <div style="background: rgba(245,158,11,0.12); padding: 6px 10px; border-radius: 6px; font-family: monospace; font-size: 0.71rem; line-height: 1.6;">
                -- Safer NOT IN:<br/>
                WHERE id NOT IN (<br/>
                &nbsp;&nbsp;SELECT id FROM orders<br/>
                &nbsp;&nbsp;WHERE id IS NOT NULL<br/>
                )
              </div>
              <div style="background: rgba(16,185,129,0.08); padding: 6px 10px; border-radius: 6px; font-family: monospace; font-size: 0.71rem; line-height: 1.6; border-left: 3px solid #10b981;">
                -- Best Practice (NOT EXISTS):<br/>
                WHERE NOT EXISTS (<br/>
                &nbsp;&nbsp;SELECT 1 FROM orders o<br/>
                &nbsp;&nbsp;WHERE o.id = e.id<br/>
                )
              </div>
            </div>
          </div>
        </div>

        <!-- ═══════════════════════════════════════════════════════════════════ -->
        <!-- UNIFIED INTERVIEW Q&A — ALL 9 QUESTIONS TOGETHER                  -->
        <!-- ═══════════════════════════════════════════════════════════════════ -->
        <div class="slide-section" style="margin-top: 32px;">
          <div class="interview-box">
            <h4 style="margin: 0 0 6px;">🎓 Interview Q&amp;A — All Topics</h4>
            <p style="font-size: 0.72rem; color: #64748b; margin: 0 0 14px; font-style: italic;">Covers WHERE Clause, Logical Precedence, BETWEEN, IN, and NULL handling</p>

            <!-- Q1 -->
            <div id="iq-sargable">
              <div class="heading-with-audio" style="display: flex; align-items: flex-start; gap: 8px; margin-bottom: 4px;">
                <p style="margin: 0; flex: 1;"><strong>Q1: What does "SARGable" mean and why does it matter for WHERE clauses?</strong></p>
                <button class="audio-play-btn" onclick="playAudio('New_Day2Part1audio03.mp3', this)" title="Play narration" style="flex-shrink: 0; margin-top: 2px;">
                  <svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                </button>
              </div>
              <p><em>A: SARGable stands for "Search Argument Able." A condition is sargable when the query optimizer can leverage a B-Tree index to satisfy it — dramatically reducing the rows examined. Conditions that wrap a column inside a function (e.g. <code>WHERE YEAR(order_date) = 2024</code>) are non-sargable because the index was built on the raw column value, not the computed result. Keep columns bare (<code>WHERE order_date &gt;= '2024-01-01'</code>) to preserve index usability.</em></p>
            </div>

            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <!-- Q2 -->
            <div id="iq-where-vs-having">
              <div class="heading-with-audio" style="display: flex; align-items: flex-start; gap: 8px; margin-bottom: 4px;">
                <p style="margin: 0; flex: 1;"><strong>Q2: How does <code>WHERE</code> differ from <code>HAVING</code> in query execution?</strong></p>
              </div>
              <p><em>A: <code>WHERE</code> filters individual rows before any grouping or aggregation occurs. <code>HAVING</code> filters aggregated groups after <code>GROUP BY</code> has been applied. Using <code>WHERE</code> to eliminate non-qualifying rows early is always preferred — it reduces the number of rows that must be sorted and aggregated, which directly lowers memory and CPU usage.</em></p>
            </div>

            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <!-- Q3 -->
            <div id="iq-sargable-rewrite">
              <div class="heading-with-audio" style="display: flex; align-items: flex-start; gap: 8px; margin-bottom: 4px;">
                <p style="margin: 0; flex: 1;"><strong>Q3: Rewrite a non-sargable date filter as a sargable one.</strong></p>
              </div>
              <p><em>A: Non-sargable: <code>WHERE YEAR(order_date) = 2024</code>. The function call prevents the optimizer from traversing the index on <code>order_date</code>. Sargable rewrite: <code>WHERE order_date &gt;= '2024-01-01' AND order_date &lt; '2025-01-01'</code>. The column is kept bare — the B-Tree index can serve this range scan directly, avoiding a full table scan.</em></p>
            </div>

            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <!-- Q4 -->
            <div id="iq-not-and-or-order">
              <div class="heading-with-audio" style="display: flex; align-items: flex-start; gap: 8px; margin-bottom: 4px;">
                <p style="margin: 0; flex: 1;"><strong>Q4: What is the logical execution order of NOT, AND, and OR?</strong></p>
              </div>
              <p><em>A: SQL resolves operators in the order NOT → AND → OR. Because AND binds more tightly than OR, an expression like <code>A OR B AND C</code> is evaluated as <code>A OR (B AND C)</code>. To override this and express <code>(A OR B) AND C</code>, parentheses must be used explicitly. Relying on implicit precedence without parentheses is a leading cause of logic bugs in production queries.</em></p>
            </div>

            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <!-- Q5 -->
            <div id="iq-short-circuit">
              <div class="heading-with-audio" style="display: flex; align-items: flex-start; gap: 8px; margin-bottom: 4px;">
                <p style="margin: 0; flex: 1;"><strong>Q5: Does SQL short-circuit logical expressions the same way Python or JavaScript does?</strong></p>
              </div>
              <p><em>A: No. Imperative languages guarantee left-to-right short-circuit evaluation. SQL is declarative — the query optimizer can evaluate conditions in any order it determines to be most efficient. Writing <code>WHERE x != 0 AND y / x &gt; 2</code> can still raise a division-by-zero error because the optimizer might evaluate the division before the guard condition. Use <code>CASE WHEN</code> or <code>NULLIF(x, 0)</code> to safely protect against unsafe arithmetic in filters.</em></p>
            </div>

            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <!-- Q6 -->
            <div id="iq-null-three-valued">
              <div class="heading-with-audio" style="display: flex; align-items: flex-start; gap: 8px; margin-bottom: 4px;">
                <p style="margin: 0; flex: 1;"><strong>Q6: How does NULL interact with AND and OR in SQL's three-valued logic?</strong></p>
              </div>
              <p><em>A: SQL uses three-valued logic: TRUE, FALSE, and UNKNOWN. Any comparison involving NULL yields UNKNOWN. With AND: <code>TRUE AND UNKNOWN = UNKNOWN</code>, but <code>FALSE AND UNKNOWN = FALSE</code>. With OR: <code>TRUE OR UNKNOWN = TRUE</code>, but <code>FALSE OR UNKNOWN = UNKNOWN</code>. Rows that evaluate to UNKNOWN in the WHERE clause are filtered out just like FALSE — they do not appear in the result set.</em></p>
            </div>

            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <!-- Q7 -->
            <div id="iq-not-in-null">
              <div class="heading-with-audio" style="display: flex; align-items: flex-start; gap: 8px; margin-bottom: 4px;">
                <p style="margin: 0; flex: 1;"><strong>Q7: Why does NOT IN return 0 rows when the subquery or list contains a NULL?</strong></p>
              </div>
              <p><em>A: <code>x NOT IN (1, 2, NULL)</code> expands to <code>x != 1 AND x != 2 AND x != NULL</code>. Because <code>x != NULL</code> always evaluates to UNKNOWN, the entire AND chain resolves to UNKNOWN regardless of x's actual value. Since UNKNOWN rows are discarded by WHERE, no rows pass the filter — zero rows are returned. Fix: add <code>WHERE id IS NOT NULL</code> inside the subquery, or switch to <code>NOT EXISTS</code>.</em></p>
            </div>

            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <!-- Q8 -->
            <div id="iq-between-dates">
              <div class="heading-with-audio" style="display: flex; align-items: flex-start; gap: 8px; margin-bottom: 4px;">
                <p style="margin: 0; flex: 1;"><strong>Q8: When is BETWEEN unsafe and what is the correct alternative for date ranges?</strong></p>
              </div>
              <p><em>A: <code>BETWEEN</code> is inclusive on both ends. When used on TIMESTAMP columns, the upper bound is implicitly cast to midnight of that date (e.g. <code>'2024-12-31 00:00:00'</code>). Any record timestamped later on that day is silently excluded. The safe alternative is a half-open interval: <code>WHERE order_date &gt;= '2024-01-01' AND order_date &lt; '2025-01-01'</code>. This captures every moment in the range without truncation.</em></p>
            </div>

            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <!-- Q9 -->
            <div id="iq-is-null-equality">
              <div class="heading-with-audio" style="display: flex; align-items: flex-start; gap: 8px; margin-bottom: 4px;">
                <p style="margin: 0; flex: 1;"><strong>Q9: Why can't we use <code>= NULL</code> or <code>!= NULL</code> to filter NULL values?</strong></p>
              </div>
              <p><em>A: NULL represents a missing or unknown value. Comparing any value to NULL using standard equality operators (<code>= NULL</code>, <code>!= NULL</code>) always produces UNKNOWN — never TRUE or FALSE. This means <code>WHERE manager_id = NULL</code> returns 0 rows even when NULL manager_ids exist. SQL provides special predicates for this: <code>IS NULL</code> to match missing values and <code>IS NOT NULL</code> to match rows that have a value.</em></p>
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
      "prompt": "<strong>Practice Task: High Stock Products</strong><br/>Identify products that need inventory control. Retrieve name and stock_qty for products with unit_price &lt; 50 and stock_qty &gt; 100.",
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
    }
  ]
};
