// Day 04 — Operators & Expressions: Arithmetic, Logical Precedence, ALL/ANY, ESCAPE, NULL handling
if (!window.COURSE_CONTENT) window.COURSE_CONTENT = {};
window.COURSE_CONTENT['day04'] = {
  "day": 4,
  "title": "Operators, Expressions & Math",
  "db": "retail",
  "emoji": "⚙️",
  "slides": [
    {
      "title": "Operators & Expressions in SQL",
      "duration": "9:08",
      "html": `        <h2>⚙️ Operators &amp; Expressions</h2>

        <!-- ── Section 1: Arithmetic Operators ── -->
        <div class="slide-section" id="day04ArithmeticSection">
          <h3 class="heading-with-audio" id="day04Arithmetic">
            01. Arithmetic Operators
          </h3>
          <p>SQL supports standard arithmetic operators that can be used in <code>SELECT</code> expressions, <code>WHERE</code> conditions, and <code>ORDER BY</code> clauses. They operate on numeric data types.</p>
        </div>

        <div class="slide-section" id="day04ArithmeticTableSection">
          <div class="db-mock-table-wrap" id="day04ArithmeticTable">
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 6px; padding: 0 4px;">
              <h4 style="margin: 0; font-size: 1.0rem; font-weight: 800; letter-spacing: -0.015em; flex: 1;">Arithmetic Operator Reference</h4>
            </div>
            <table class="db-table-mock db-table-mock--compact">
              <thead><tr><th>Operator</th><th>Meaning</th><th>Example</th><th>Result (salary=80000)</th></tr></thead>
              <tbody>
                <tr id="arithOpAdd"><td><code>+</code></td><td>Addition</td><td><code>salary + 10000</code></td><td>90000</td></tr>
                <tr id="arithOpSub"><td><code>-</code></td><td>Subtraction</td><td><code>salary - 5000</code></td><td>75000</td></tr>
                <tr id="arithOpMul"><td><code>*</code></td><td>Multiplication</td><td><code>salary * 1.1</code></td><td>88000</td></tr>
                <tr id="arithOpDiv"><td><code>/</code></td><td>Division</td><td><code>salary / 12</code></td><td>6666.67</td></tr>
                <tr id="arithOpMod"><td><code>%</code></td><td>Modulo (remainder)</td><td><code>salary % 7</code></td><td>varies</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="slide-section" id="day04ArithmeticExamplesSection">
          <div class="heading-with-audio" style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px; margin-top: 4px;">
            <h4 style="margin: 0; font-size: 1.0rem; font-weight: 800; letter-spacing: -0.015em; flex: 1;">Arithmetic Operator Examples</h4>
          </div>
          <div class="code-block-container" id="day04ArithmeticExamples">
            <div class="code-subblock" id="arithCodeQuery1">
              <pre><code><span class="code-comment">-- 1. Monthly pay &amp; 10% bonus calculation</span>
<span class="kw">SELECT</span> first_name,
       salary,
       salary / 12.0            <span class="kw">AS</span> monthly_salary,
       salary * 0.10            <span class="kw">AS</span> annual_bonus
<span class="kw">FROM</span>   employees;</code></pre>
            </div>

            <div class="code-subblock" id="arithCodeQuery2">
              <pre><code><span class="code-comment">-- 2. On-the-fly gross profit computation</span>
<span class="kw">SELECT</span> name,
       unit_price,
       cost_price,
       unit_price - cost_price  <span class="kw">AS</span> gross_profit
<span class="kw">FROM</span>   products;</code></pre>
            </div>
          </div>
        </div>

        <div class="slide-section" id="day04IntDivWarnSection">
          <div class="warn-box" id="day04IntDivWarn">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px; width: 100%;">
              <strong style="color:var(--ink-neg); flex: 1;">⚠️ Integer Division:</strong>
            </div>
            <p>In some SQL dialects, dividing two integers returns an integer (e.g. <code>7 / 2 = 3</code>, not <code>3.5</code>). Cast one operand to REAL or multiply by <code>1.0</code>: <code>salary * 1.0 / 12</code>. In SQLite, <code>/</code> between integers truncates — always include a decimal point like <code>12.0</code> when you need precision.</p>
          </div>
        </div>

        <!-- ── Section 2: Operator Precedence ── -->
        <div class="slide-section" id="day04PrecedenceSection">
          <h3 class="heading-with-audio" id="day04Precedence">
            02. Operator Precedence — Evaluation Order
          </h3>
          <p>SQL evaluates expressions following strict precedence rules. Higher-precedence operators bind tighter. When in doubt, use parentheses — they are always evaluated first and make intent explicit.</p>
        </div>

        <div class="slide-section" id="day04PrecedenceTableSection">
          <div class="db-mock-table-wrap" id="day04PrecedenceTable">
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 6px; padding: 0 4px;">
              <h4 style="margin: 0; font-size: 1.0rem; font-weight: 800; letter-spacing: -0.015em; flex: 1;">Operator Precedence Table</h4>
            </div>
            <table class="db-table-mock db-table-mock--compact">
              <thead><tr><th>Precedence</th><th>Operators</th><th>Description</th></tr></thead>
              <tbody>
                <tr id="precRow1"><td>1 (highest)</td><td><code>( )</code></td><td>Parentheses — explicitly group</td></tr>
                <tr id="precRow2"><td>2</td><td><code>* / %</code></td><td>Multiplication, Division, Modulo</td></tr>
                <tr id="precRow3"><td>3</td><td><code>+ -</code></td><td>Addition, Subtraction</td></tr>
                <tr id="precRow4"><td>4</td><td><code>= &lt;&gt; &lt; &gt; &lt;= &gt;=</code></td><td>Comparison operators</td></tr>
                <tr id="precRow5"><td>5</td><td><code>NOT</code></td><td>Logical NOT</td></tr>
                <tr id="precRow6"><td>6</td><td><code>AND</code></td><td>Logical AND</td></tr>
                <tr id="precRow7"><td>7 (lowest)</td><td><code>OR</code></td><td>Logical OR</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="slide-section" id="day04PrecedenceExamplesSection">
          <div class="heading-with-audio" style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px; margin-top: 4px;">
            <h4 style="margin: 0; font-size: 1.0rem; font-weight: 800; letter-spacing: -0.015em; flex: 1;">AND / OR Precedence Examples</h4>
          </div>
          <div class="code-block-container" id="day04PrecedenceExamples">
            <div class="code-subblock" id="precCodeQuery1">
              <pre><code><span class="code-comment">-- 1. Without parentheses: AND binds tighter than OR</span>
<span class="code-comment">-- Reads as: dept=10 OR (dept=20 AND salary>60000)</span>
<span class="kw">SELECT</span> * <span class="kw">FROM</span> employees
<span class="kw">WHERE</span> department_id = 10 <span class="kw">OR</span> department_id = 20 <span class="kw">AND</span> salary > 60000;</code></pre>
            </div>

            <div class="code-subblock" id="precCodeQuery2">
              <pre><code><span class="code-comment">-- 2. With parentheses: explicit intent (both depts, salary>60000)</span>
<span class="kw">SELECT</span> * <span class="kw">FROM</span> employees
<span class="kw">WHERE</span> (department_id = 10 <span class="kw">OR</span> department_id = 20) <span class="kw">AND</span> salary > 60000;</code></pre>
            </div>
          </div>
        </div>

        <div class="slide-section" id="day04PrecedenceInfoSection">
          <div class="info-box" id="day04PrecedenceInfo">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px; width: 100%;">
              <strong style="color:var(--ink-teal); flex: 1;">ℹ️ Always parenthesise mixed <code>AND</code>/<code>OR</code>.</strong>
            </div>
            <p>Relying on implicit precedence is a common source of production bugs. Parentheses are free, they document intent, and they override precedence when you need it.</p>
          </div>
        </div>

        <!-- ── Section 3: ALL and ANY ── -->
        <div class="slide-section" id="day04AllAnySection">
          <h3 class="heading-with-audio" id="day04AllAny">
            03. ALL and ANY — Subquery Comparison Modifiers
          </h3>
          <p><code>ALL</code> and <code>ANY</code> (also written <code>SOME</code>) compare a value against every / any row returned by a subquery. They are part of the SQL standard and appear frequently in interviews.</p>
        </div>

        <div class="slide-section" id="day04AllAnyCardsSection">
          <div class="vs-block" id="day04AllAnyCards">
            <div class="vs-card" id="day04AnyCard">
              <h4 style="margin: 0 0 6px; display: flex; align-items: center; gap: 8px;">
                <span style="flex: 1;">&gt; ANY (…)</span>
              </h4>
              <p>TRUE if the value is greater than <em>at least one</em> value in the list — i.e. greater than the <strong>minimum</strong>.</p>
              <pre><code><span class="code-comment">-- Earn more than at least one Marketing employee</span>
<span class="kw">SELECT</span> first_name, salary
<span class="kw">FROM</span>   employees
<span class="kw">WHERE</span>  salary > <span class="kw">ANY</span> (
  <span class="kw">SELECT</span> salary <span class="kw">FROM</span> employees
  <span class="kw">WHERE</span>  department_id = 30
);
<span class="code-comment">-- Equivalent: > (SELECT MIN(salary) ...)</span></code></pre>
            </div>
            <div class="vs-card" id="day04AllCard">
              <h4 style="margin: 0 0 6px; display: flex; align-items: center; gap: 8px;">
                <span style="flex: 1;">&gt; ALL (…)</span>
              </h4>
              <p>TRUE if the value is greater than <em>every</em> value in the list — i.e. greater than the <strong>maximum</strong>.</p>
              <pre><code><span class="code-comment">-- Earn more than every Sales employee</span>
<span class="kw">SELECT</span> first_name, salary
<span class="kw">FROM</span>   employees
<span class="kw">WHERE</span>  salary > <span class="kw">ALL</span> (
  <span class="kw">SELECT</span> salary <span class="kw">FROM</span> employees
  <span class="kw">WHERE</span>  department_id = 40
);
<span class="code-comment">-- Equivalent: > (SELECT MAX(salary) ...)</span></code></pre>
            </div>
          </div>
        </div>

        <div class="slide-section" id="day04AllAnyWarnSection">
          <div class="warn-box" id="day04AllAnyWarn">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px; width: 100%;">
              <strong style="color:var(--ink-neg); flex: 1;">⚠️ Engine support:</strong>
            </div>
            <p><code>ALL</code>/<code>ANY</code> are standard SQL but <strong>not implemented in SQLite</strong> (the engine used in this playground). For runnable queries here, rewrite using <code>&gt; (SELECT MIN(...))</code> for <code>ANY</code> and <code>&gt; (SELECT MAX(...))</code> for <code>ALL</code>. MySQL and PostgreSQL support them natively.</p>
          </div>
        </div>

        <div class="slide-section" id="day04AllAnyTipSection">
          <div class="pro-tip-box" id="day04AllAnyTip">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px; width: 100%;">
              <strong style="color:var(--ink-warn); flex: 1;">💡 Equivalences to memorise:</strong>
            </div>
            <p><code>= ANY (...)</code> ≡ <code>IN (...)</code>; <code>&lt;&gt; ALL (...)</code> ≡ <code>NOT IN (...)</code>; <code>&gt; ALL (...)</code> ≡ <code>&gt; (SELECT MAX(...))</code>; <code>&gt; ANY (...)</code> ≡ <code>&gt; (SELECT MIN(...))</code>.</p>
          </div>
        </div>

        <!-- ── Section 4: ESCAPE in LIKE ── -->
        <div class="slide-section" id="day04EscapeSection">
          <h3 class="heading-with-audio" id="day04Escape">
            04. ESCAPE in LIKE — Searching for Literal Wildcards
          </h3>
          <p>If your data contains the literal characters <code>%</code> or <code>_</code>, you must <strong>escape</strong> them in a <code>LIKE</code> pattern. The <code>ESCAPE</code> clause declares which character to treat as the escape character.</p>
        </div>

        <div class="slide-section" id="day04EscapeCodeSection">
          <div class="heading-with-audio" style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px; margin-top: 4px;">
            <h4 style="margin: 0; font-size: 1.0rem; font-weight: 800; letter-spacing: -0.015em; flex: 1;">ESCAPE Examples — Literal Wildcards in Patterns</h4>
          </div>
          <div class="code-block-container" id="day04EscapeCode">
            <div class="code-subblock" id="escapeCodeQuery1">
              <pre><code><span class="code-comment">-- 1. Find products whose name contains a literal '%' character</span>
<span class="kw">SELECT</span> name <span class="kw">FROM</span> products
<span class="kw">WHERE</span>  name <span class="kw">LIKE</span> '%50!%%' <span class="kw">ESCAPE</span> '!';</code></pre>
            </div>

            <div class="code-subblock" id="escapeCodeQuery2">
              <pre><code><span class="code-comment">-- 2. Find emails containing a literal '_' underscore</span>
<span class="kw">SELECT</span> first_name, email <span class="kw">FROM</span> employees
<span class="kw">WHERE</span>  email <span class="kw">LIKE</span> '%!_%' <span class="kw">ESCAPE</span> '!';</code></pre>
            </div>

            <div class="code-subblock" id="escapeCodeQuery3">
              <pre><code><span class="code-comment">-- 3. Find rows where name starts with a space</span>
<span class="kw">SELECT</span> name <span class="kw">FROM</span> customers
<span class="kw">WHERE</span>  name <span class="kw">LIKE</span> ' %';</code></pre>
            </div>
          </div>
        </div>

        <div class="slide-section" id="day04EscapeInfoSection">
          <div class="info-box" id="day04EscapeInfo">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px; width: 100%;">
              <strong style="color:var(--ink-teal); flex: 1;">ℹ️ Which escape char?</strong>
            </div>
            <p>There is no fixed default in standard SQL — always specify <code>ESCAPE '!'</code> (or another chosen char) explicitly. Common choices are <code>\</code>, <code>!</code>, or <code>#</code>. Once declared, that character escapes itself: <code>!!</code> matches a literal <code>!</code>.</p>
          </div>
        </div>

        <!-- ── Section 5: Handling NULLs ── -->
        <div class="slide-section" id="day04NullHandlingSection">
          <h3 class="heading-with-audio" id="day04NullHandling">
            05. Handling NULLs in Expressions and Conditions
          </h3>
          <p>NULL propagates through arithmetic and produces UNKNOWN in comparisons. Any arithmetic with NULL yields NULL; any comparison with NULL yields UNKNOWN, which <code>WHERE</code> treats the same as FALSE (the row is filtered out). Use <code>COALESCE</code> to substitute a default.</p>
        </div>

        <div class="slide-section" id="day04NullCodeSection">
          <div class="heading-with-audio" style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px; margin-top: 4px;">
            <h4 style="margin: 0; font-size: 1.0rem; font-weight: 800; letter-spacing: -0.015em; flex: 1;">NULL Propagation — Safe vs Unsafe Patterns</h4>
          </div>
          <div class="code-block-container" id="day04NullCode">
            <div class="code-subblock" id="nullCodeQuery1">
              <pre><code><span class="code-comment">-- 1. NULL propagation in arithmetic (COALESCE safeguard)</span>
<span class="kw">SELECT</span> first_name,
       commission,
       salary + commission              <span class="kw">AS</span> total_comp,   <span class="code-comment">-- NULL when commission is NULL</span>
       salary + <span class="kw">COALESCE</span>(commission, 0) <span class="kw">AS</span> safe_comp     <span class="code-comment">-- 0 replaces NULL</span>
<span class="kw">FROM</span>   employees;</code></pre>
            </div>

            <div class="code-subblock" id="nullCodeQuery2">
              <pre><code><span class="code-comment">-- 2. Filtering with explicit NULL retention</span>
<span class="kw">SELECT</span> * <span class="kw">FROM</span> employees
<span class="kw">WHERE</span>  commission > 5000
   <span class="kw">OR</span>  commission <span class="kw">IS NULL</span>;       <span class="code-comment">-- Explicitly include NULLs</span></code></pre>
            </div>
          </div>
        </div>

        <div class="slide-section" id="day04NullInfoSection">
          <div class="info-box" id="day04NullInfo">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px; width: 100%;">
              <strong style="color:var(--ink-teal); flex: 1;">ℹ️ NULL ≠ 0.</strong>
            </div>
            <p>NULL means "unknown", not "zero". <code>salary + NULL</code> is NULL (not salary). <code>NULL = NULL</code> is UNKNOWN (not TRUE) — use <code>IS NULL</code> / <code>IS NOT NULL</code> to test for NULL.</p>
          </div>
        </div>

        <!-- ── Section 6: Three-Valued Logic ── -->
        <div class="slide-section" id="day04ThreeValSection">
          <h3 class="heading-with-audio" id="day04ThreeVal">
            06. Three-Valued Logic (TRUE / FALSE / UNKNOWN)
          </h3>
          <p>SQL uses three-valued logic. Every condition evaluates to TRUE, FALSE, or UNKNOWN. <code>WHERE</code> keeps rows only when the predicate is TRUE; both FALSE and UNKNOWN rows are discarded. This is why <code>NOT IN</code> with a NULL in the list returns no rows.</p>
        </div>

        <div class="slide-section" id="day04ThreeValTableSection">
          <div class="db-mock-table-wrap" id="day04ThreeValTable">
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 6px; padding: 0 4px;">
              <h4 style="margin: 0; font-size: 1.0rem; font-weight: 800; letter-spacing: -0.015em; flex: 1;">Three-Valued Logic Truth Table</h4>
            </div>
            <table class="db-table-mock db-table-mock--compact">
              <thead><tr><th>Expression</th><th>Result</th><th>Why</th></tr></thead>
              <tbody>
                <tr id="threeValRow1"><td><code>5 = 5</code></td><td>TRUE</td><td>Equal values</td></tr>
                <tr id="threeValRow2"><td><code>5 = NULL</code></td><td>UNKNOWN</td><td>Comparison with NULL</td></tr>
                <tr id="threeValRow3"><td><code>NULL = NULL</code></td><td>UNKNOWN</td><td>Two unknowns</td></tr>
                <tr id="threeValRow4"><td><code>NOT UNKNOWN</code></td><td>UNKNOWN</td><td>NOT of unknown stays unknown</td></tr>
                <tr id="threeValRow5"><td><code>TRUE AND UNKNOWN</code></td><td>UNKNOWN</td><td>Unknown dominates</td></tr>
                <tr id="threeValRow6"><td><code>FALSE OR UNKNOWN</code></td><td>UNKNOWN</td><td>Not definitely true</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="slide-section" id="day04NotInTrapCodeSection">
          <div class="heading-with-audio" style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px; margin-top: 4px;">
            <h4 style="margin: 0; font-size: 1.0rem; font-weight: 800; letter-spacing: -0.015em; flex: 1;">The NOT IN + NULL Trap</h4>
          </div>
          <div class="code-block-container" id="day04NotInTrapCode">
            <div class="code-subblock" id="notInTrapQuery1">
              <pre><code><span class="code-comment">-- 1. Vulnerable to subquery NULLs (returns 0 rows if any NULL is present)</span>
<span class="kw">SELECT</span> first_name <span class="kw">FROM</span> employees
<span class="kw">WHERE</span>  salary <span class="kw">NOT IN</span> (<span class="kw">SELECT</span> commission <span class="kw">FROM</span> employees);</code></pre>
            </div>

            <div class="code-subblock" id="notInTrapQuery2">
              <pre><code><span class="code-comment">-- 2. NULL-safe alternative using NOT EXISTS</span>
<span class="kw">SELECT</span> e.first_name <span class="kw">FROM</span> employees e
<span class="kw">WHERE</span>  <span class="kw">NOT EXISTS</span> (
  <span class="kw">SELECT</span> 1 <span class="kw">FROM</span> employees c
  <span class="kw">WHERE</span>  c.commission = e.salary
);</code></pre>
            </div>
          </div>
        </div>

        <div class="slide-section" id="day04NotInTrapWarnSection">
          <div class="warn-box" id="day04NotInTrapWarn">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px; width: 100%;">
              <strong style="color:var(--ink-neg); flex: 1;">⚠️ The <code>NOT IN</code> NULL trap:</strong>
            </div>
            <p>If the right-hand list contains a NULL, <code>x NOT IN (...)</code> evaluates to UNKNOWN for every row, returning <strong>zero rows</strong>. Always filter NULLs out of the subquery, or use <code>NOT EXISTS</code> instead.</p>
          </div>
        </div>

        <!-- ── Interview Q&A Consolidated Section ── -->
        <div class="slide-section" id="day04QASection">
          <div class="interview-box">
            <h4 id="day04QAHeading">🎓 Interview Insights &amp; Q&amp;A</h4>

            <div id="day04IQ1">
              <p><strong>Q1: Explain SQL's operator precedence. Which binds tighter, AND or OR?</strong></p>
              <p><em>A: Parentheses bind tightest, then arithmetic (<code>* / %</code> before <code>+ -</code>), then comparisons (<code>= &lt; &gt;</code>), then <code>NOT</code>, then <code>AND</code>, and finally <code>OR</code> binds loosest. So <code>a OR b AND c</code> is parsed as <code>a OR (b AND c)</code>. Best practice: always parenthesise mixed AND/OR to make intent explicit.</em></p>
            </div>

            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day04IQ2">
              <p><strong>Q2: What is three-valued logic in SQL?</strong></p>
              <p><em>A: SQL predicates evaluate to TRUE, FALSE, or UNKNOWN. UNKNOWN arises from any comparison or arithmetic involving NULL. The WHERE clause keeps only rows where the predicate is TRUE; UNKNOWN rows are discarded just like FALSE rows. This third value is the root of most NULL-related surprises.</em></p>
            </div>

            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day04IQ3">
              <p><strong>Q3: Why does <code>NULL = NULL</code> return UNKNOWN (effectively FALSE) instead of TRUE?</strong></p>
              <p><em>A: Because NULL means "unknown value", not "a specific value". Two unknowns cannot be compared for equality — they might or might not be the same. SQL therefore returns UNKNOWN, and WHERE discards the row. Use <code>IS NULL</code> to test for the absence of a value.</em></p>
            </div>

            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day04IQ4">
              <p><strong>Q4: What is NULL propagation in arithmetic, and how do you prevent it?</strong></p>
              <p><em>A: Any arithmetic operation involving NULL yields NULL — e.g. <code>salary + NULL</code> is NULL. To prevent it, wrap nullable columns in <code>COALESCE(col, default)</code> before the arithmetic: <code>salary + COALESCE(commission, 0)</code>. The same applies to string concatenation with <code>||</code> in SQLite.</em></p>
            </div>

            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day04IQ5">
              <p><strong>Q5: Explain the <code>NOT IN</code> NULL trap.</strong></p>
              <p><em>A: If the right-hand list of <code>NOT IN</code> contains a NULL, the expression becomes <code>x != NULL</code> for every value, which is UNKNOWN, so the query returns zero rows. Fix by removing NULLs (<code>WHERE col IS NOT NULL</code>) inside the subquery, or prefer <code>NOT EXISTS</code> which is NULL-safe.</em></p>
            </div>

            <hr style="border: none; border-top: 1px dashed #cbd5e1; margin: 10px 0;" />

            <div id="day04IQ6">
              <p><strong>Q6: What do <code>ALL</code> and <code>ANY</code> do, and how do you emulate them with aggregates?</strong></p>
              <p><em>A: <code>x &gt; ALL (subquery)</code> is TRUE when x exceeds every returned value — equivalent to <code>x &gt; (SELECT MAX(...) ...)</code>. <code>x &gt; ANY (subquery)</code> is TRUE when x exceeds at least one value — equivalent to <code>x &gt; (SELECT MIN(...) ...)</code>. <code>= ANY</code> equals <code>IN</code>; <code>&lt;&gt; ALL</code> equals <code>NOT IN</code>.</em></p>
            </div>
          </div>
        </div>
`
    }
  ],
  "practiceQuestions": [
    {
      "id": 1,
      "prompt": "<strong>Task: Monthly Pay</strong><br/>Retrieve <code>first_name</code>, <code>salary</code>, and a computed <code>monthly_salary</code> column (salary divided by 12) for all employees.",
      "referenceSql": "SELECT first_name, salary, salary / 12.0 AS monthly_salary FROM employees;",
      "questionAudio": "Day04/New_Day4Question01.mp3",
      "solutionAudio": "Day04/New_Day4Question01sol.mp3"
    },
    {
      "id": 2,
      "prompt": "<strong>Task: Gross Profit</strong><br/>Retrieve <code>name</code>, <code>unit_price</code>, <code>cost_price</code>, and the gross profit (<code>unit_price - cost_price</code>) from <code>products</code>. Sort by gross profit descending.",
      "referenceSql": "SELECT name, unit_price, cost_price, unit_price - cost_price AS gross_profit FROM products ORDER BY gross_profit DESC;",
      "questionAudio": "Day04/New_Day4Question02.mp3",
      "solutionAudio": "Day04/New_Day4Question02sol.mp3"
    },
    {
      "id": 3,
      "prompt": "<strong>Task: Total Compensation with COALESCE</strong><br/>Retrieve <code>first_name</code>, <code>salary</code>, <code>commission</code>, and a <code>total_comp</code> column that adds salary and commission, treating NULL commission as 0.",
      "referenceSql": "SELECT first_name, salary, commission, salary + COALESCE(commission, 0) AS total_comp FROM employees;",
      "questionAudio": "Day04/New_Day4Question03.mp3",
      "solutionAudio": "Day04/New_Day4Question03sol.mp3"
    },
    {
      "id": 4,
      "prompt": "<strong>Task: High Earners (explicit parentheses)</strong><br/>Using explicit parentheses, find employees in department 10 or 20 who earn more than 70000. Return all columns.",
      "referenceSql": "SELECT * FROM employees WHERE (department_id = 10 OR department_id = 20) AND salary > 70000;",
      "questionAudio": "Day04/New_Day4Question04.mp3",
      "solutionAudio": "Day04/New_Day4Question04sol.mp3"
    },
    {
      "id": 5,
      "prompt": "<strong>Task: Earn more than every Sales employee</strong><br/>Using a <code>MAX</code> subquery, find employees whose <code>salary</code> is greater than every salary in the Sales department (<code>department_id = 40</code>). Return <code>first_name</code> and <code>salary</code>.",
      "referenceSql": "SELECT first_name, salary FROM employees WHERE salary > (SELECT MAX(salary) FROM employees WHERE department_id = 40);",
      "questionAudio": "Day04/New_Day4Question05.mp3",
      "solutionAudio": "Day04/New_Day4Question05sol.mp3"
    },
    {
      "id": 6,
      "prompt": "<strong>Task: Price Markup</strong><br/>Retrieve <code>name</code> and a <code>markup_price</code> column representing <code>unit_price * 1.18</code> (price after 18% markup) from <code>products</code>.",
      "referenceSql": "SELECT name, unit_price * 1.18 AS markup_price FROM products;",
      "questionAudio": "Day04/New_Day4Question06.mp3",
      "solutionAudio": "Day04/New_Day4Question06sol.mp3"
    },
    {
      "id": 7,
      "prompt": "<strong>Task: Include NULLs</strong><br/>Find all employees whose <code>commission</code> is greater than 5000 OR whose commission is NULL. Return <code>first_name</code> and <code>commission</code>.",
      "referenceSql": "SELECT first_name, commission FROM employees WHERE commission > 5000 OR commission IS NULL;",
      "questionAudio": "Day04/New_Day4Question07.mp3",
      "solutionAudio": "Day04/New_Day4Question07sol.mp3"
    },
    {
      "id": 8,
      "prompt": "<strong>Task: Safe ratio with NULLIF</strong><br/>For each product, compute the profit margin as <code>(unit_price - cost_price) * 1.0 / NULLIF(unit_price, 0)</code> aliased <code>margin</code>. Return <code>name</code> and <code>margin</code>.",
      "referenceSql": "SELECT name, (unit_price - cost_price) * 1.0 / NULLIF(unit_price, 0) AS margin FROM products;",
      "questionAudio": "Day04/New_Day4Question08.mp3",
      "solutionAudio": "Day04/New_Day4Question08sol.mp3"
    },
    {
      "id": 9,
      "prompt": "<strong>Task: Profit percentage</strong><br/>For each product compute <code>profit_pct = (unit_price - cost_price) * 100.0 / unit_price</code>. Return <code>name</code> and <code>profit_pct</code> rounded to 2 decimals.",
      "referenceSql": "SELECT name, ROUND((unit_price - cost_price) * 100.0 / unit_price, 2) AS profit_pct FROM products;",
      "questionAudio": "Day04/New_Day4Question09.mp3",
      "solutionAudio": "Day04/New_Day4Question09sol.mp3"
    },
    {
      "id": 10,
      "prompt": "<strong>Task: Earn more than at least one Marketing employee</strong><br/>Using a <code>MIN</code> subquery (the SQLite-friendly equivalent of <code>&gt; ANY</code>), find employees whose <code>salary</code> is greater than at least one salary in Marketing (<code>department_id = 30</code>). Return <code>first_name</code> and <code>salary</code>.",
      "referenceSql": "SELECT first_name, salary FROM employees WHERE salary > (SELECT MIN(salary) FROM employees WHERE department_id = 30);",
      "questionAudio": "Day04/New_Day4Question10.mp3",
      "solutionAudio": "Day04/New_Day4Question10sol.mp3"
    },
    {
      "id": 11,
      "prompt": "<strong>Task: Parity check with modulo</strong><br/>Find all products whose <code>product_id</code> is even (use modulo). Return <code>product_id</code> and <code>name</code>.",
      "referenceSql": "SELECT product_id, name FROM products WHERE product_id % 2 = 0;",
      "questionAudio": "Day04/New_Day4Question11.mp3",
      "solutionAudio": "Day04/New_Day4Question11sol.mp3"
    },
    {
      "id": 12,
      "prompt": "<strong>Task: Stock value</strong><br/>For each product compute <code>stock_value = stock_qty * cost_price</code>. Return <code>name</code> and <code>stock_value</code> for products whose stock value exceeds 100000.",
      "referenceSql": "SELECT name, stock_qty * cost_price AS stock_value FROM products WHERE stock_qty * cost_price > 100000;",
      "questionAudio": "Day04/New_Day4Question12.mp3",
      "solutionAudio": "Day04/New_Day4Question12sol.mp3"
    }
  ],
  "testQuestions": [
    { "id": 1, "prompt": "Payroll runs monthly. From <code>employees</code>, return <code>first_name</code> and each employee's <code>monthly_salary</code> computed as <code>salary / 12.0</code>.", "ref": "SELECT first_name, salary / 12.0 AS monthly_salary FROM employees;" },
    { "id": 2, "prompt": "Bonus eligibility threshold is ₹8000. From <code>employees</code>, find all staff whose calculated bonus (<code>salary * 0.1</code>) exceeds that figure.", "ref": "SELECT * FROM employees WHERE salary * 0.1 > 8000;" },
    { "id": 3, "prompt": "A pricing board wants a product profitability ranking. From <code>products</code>, return <code>name</code> and <code>gross_profit</code> (<code>unit_price - cost_price</code>), most profitable first.", "ref": "SELECT name, unit_price - cost_price AS gross_profit FROM products ORDER BY gross_profit DESC;" },
    { "id": 4, "prompt": "An analyst needs high earners from two specific departments. From <code>employees</code>, retrieve those in <code>department_id</code> 10 or 20 who earn over 80000 — use parentheses to ensure correct operator precedence.", "ref": "SELECT * FROM employees WHERE (department_id = 10 OR department_id = 20) AND salary > 80000;" },
    { "id": 5, "prompt": "Total compensation includes both salary and any commission. From <code>employees</code>, return <code>first_name</code> and <code>total_comp</code> as <code>salary + COALESCE(commission, 0)</code> for all staff.", "ref": "SELECT first_name, salary + COALESCE(commission, 0) AS total_comp FROM employees;" },
    { "id": 6, "prompt": "Who outearns the highest-paid person in dept 50? From <code>employees</code>, find all rows where <code>salary</code> exceeds the MAX salary in <code>department_id = 50</code> — use a subquery. Return <code>first_name</code> and <code>salary</code>.", "ref": "SELECT first_name, salary FROM employees WHERE salary > (SELECT MAX(salary) FROM employees WHERE department_id = 50);" },
    { "id": 7, "prompt": "The finance system works with round-thousand price points. From <code>products</code>, find all rows where <code>unit_price</code> modulo 1000 equals 0.", "ref": "SELECT * FROM products WHERE unit_price % 1000 = 0;" },
    { "id": 8, "prompt": "A seasonal sale gives a 10% discount. From <code>products</code>, return <code>name</code> and the sale price as <code>discounted_price</code> (<code>unit_price * 0.9</code>).", "ref": "SELECT name, unit_price * 0.9 AS discounted_price FROM products;" },
    { "id": 9, "prompt": "Who earns more than the lowest-paid person in dept 40? From <code>employees</code>, use a subquery to find all rows where <code>salary</code> exceeds the MIN salary in <code>department_id = 40</code>. Return <code>first_name</code> and <code>salary</code>.", "ref": "SELECT first_name, salary FROM employees WHERE salary > (SELECT MIN(salary) FROM employees WHERE department_id = 40);" },
    { "id": 10, "prompt": "Tax at 30% must be shown on each payslip. From <code>employees</code>, return <code>first_name</code>, <code>salary</code>, and a <code>tax</code> column (<code>salary * 0.3</code>).", "ref": "SELECT first_name, salary, salary * 0.3 AS tax FROM employees;" },
    { "id": 11, "prompt": "A markup threshold of 1.5x is required for premium classification. From <code>products</code>, find all items where <code>unit_price / cost_price</code> is greater than 1.5.", "ref": "SELECT * FROM products WHERE unit_price / cost_price > 1.5;" },
    { "id": 12, "prompt": "The commission report should flag both non-earners and high-commission staff. From <code>employees</code>, retrieve those where <code>commission &gt; 5000</code> OR <code>commission IS NULL</code>.", "ref": "SELECT * FROM employees WHERE commission > 5000 OR commission IS NULL;" },
    { "id": 13, "prompt": "A discount voucher adds ₹500 to every order value for comparison. From <code>orders</code>, find rows where <code>total_amount + 500</code> still falls below 5000.", "ref": "SELECT * FROM orders WHERE total_amount + 500 < 5000;" },
    { "id": 14, "prompt": "A compensation review covers two departments. From <code>employees</code>, retrieve all those in <code>department_id</code> 10 or 20, ordered by <code>salary</code> highest to lowest.", "ref": "SELECT * FROM employees WHERE (department_id = 10 OR department_id = 20) ORDER BY salary DESC;" },
    { "id": 15, "prompt": "The board wants a clean margin percentage for each product. From <code>products</code>, compute <code>profit_pct</code> as <code>ROUND((unit_price - cost_price) * 100.0 / unit_price, 2)</code>. Show <code>name</code> alongside.", "ref": "SELECT name, ROUND((unit_price - cost_price) * 100.0 / unit_price, 2) AS profit_pct FROM products;" },
    { "id": 16, "prompt": "Who are the crore-plus annual earners? From <code>employees</code>, find all records where <code>salary * 12</code> (annual total) exceeds 1,000,000.", "ref": "SELECT * FROM employees WHERE salary * 12 > 1000000;" },
    { "id": 17, "prompt": "A warehouse valuation report is needed. From <code>products</code>, return <code>name</code> and <code>stock_value</code> computed as <code>stock_qty * unit_price</code>.", "ref": "SELECT name, stock_qty * unit_price AS stock_value FROM products;" },
    { "id": 18, "prompt": "Who in the company outearns the top salary in dept 30? From <code>employees</code>, use a subquery to find rows where <code>salary</code> exceeds the MAX in <code>department_id = 30</code>.", "ref": "SELECT * FROM employees WHERE salary > (SELECT MAX(salary) FROM employees WHERE department_id = 30);" },
    { "id": 19, "prompt": "After a 5% appraisal, what would active employees earn? From <code>employees</code>, return <code>first_name</code> and <code>salary_after_raise</code> (<code>salary * 1.05</code>) where <code>is_active = 1</code>.", "ref": "SELECT first_name, salary * 1.05 AS salary_after_raise FROM employees WHERE is_active = 1;" },
    { "id": 20, "prompt": "A threshold filter applies after discounting ₹1000 from each order. From <code>orders</code>, find all rows where <code>total_amount - 1000</code> still exceeds 100,000.", "ref": "SELECT * FROM orders WHERE total_amount - 1000 > 100000;" },
    { "id": 21, "prompt": "Eligible for premium benefits: total comp above ₹90,000. From <code>employees</code>, return <code>first_name</code> and <code>total_comp</code> (<code>salary + COALESCE(commission, 0)</code>) where total comp exceeds 90000.", "ref": "SELECT first_name, salary + COALESCE(commission, 0) AS total_comp FROM employees WHERE salary + COALESCE(commission, 0) > 90000;" },
    { "id": 22, "prompt": "High-value stock items need priority tracking. From <code>products</code>, find all rows where <code>stock_qty * cost_price</code> exceeds 100,000.", "ref": "SELECT * FROM products WHERE stock_qty * cost_price > 100000;" },
    { "id": 23, "prompt": "Three departments are included in the compensation review. From <code>employees</code>, retrieve all those in <code>department_id</code> 10, 20, or 50, sorted by <code>salary</code> lowest to highest.", "ref": "SELECT * FROM employees WHERE department_id IN (10, 20, 50) ORDER BY salary ASC;" },
    { "id": 24, "prompt": "GST at 18% must appear on every order invoice. From <code>orders</code>, return <code>order_id</code>, <code>total_amount</code>, and a <code>vat</code> column (<code>total_amount * 0.18</code>).", "ref": "SELECT order_id, total_amount, total_amount * 0.18 AS vat FROM orders;" },
    { "id": 25, "prompt": "A gross-margin filter requires at least ₹5000 difference. From <code>products</code>, find all rows where <code>(unit_price - cost_price)</code> exceeds 5000.", "ref": "SELECT * FROM products WHERE unit_price - cost_price > 5000;" }
  ],
  "topics": [
    { "id": "topic-1", "label": "Topic 1: Arithmetic, Precedence & Expressions", "recordingKey": null }
  ]
};
