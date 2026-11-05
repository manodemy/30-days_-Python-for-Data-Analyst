// public/excel/content/excel-day-05.js
// Manodemy Excel Studio — Day 05 Curriculum Manifest & Challenges
// Domain: CloudScale AI — SaaS Subscription Intelligence
// Conforms to: MISSION SPECIFICATION v3.2 & STYLE_GUIDE.md

if (!window.EXCEL_COURSE_CONTENT) window.EXCEL_COURSE_CONTENT = {};

window.EXCEL_COURSE_CONTENT['excelDay05'] = {
  day: 5,
  globalDay: 23,
  title: "Logical Decision Trees, Nested Formulas and Error Handling",
  description: "Master advanced boolean logic, nested branching trees, high-speed boolean arithmetic, and enterprise error handling with IFERROR and IFNA in SaaS subscription analytics.",
  topics: [
    "01. Boolean Decision Mechanics & Logical Flow (IF & IFS)",
    "02. Multi-Criteria Conjunction: The AND() Operator",
    "03. Multi-Criteria Disjunction: The OR() Operator",
    "04. Logical Inversion & Exclusions: The NOT() Operator",
    "05. Deep Nested IF Hierarchies: Tiered Evaluation",
    "06. Direct Value Matching: The SWITCH() Function",
    "07. High-Performance Boolean Arithmetic: Binary Logic",
    "08. Universal Error Trapping: IFERROR() Architecture",
    "09. Surgical Error Trapping: IFNA() Precision",
    "10. Matrix Decision Tables & Multi-Dimensional Rules"
  ],
  slides: [
    {
      title: "Logical Decision Trees & Error Handling",
      html: `
<section class="slide-section" id="sec01">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingBooleanFlow">
    <span class="heading-num-box">01</span>
    <span class="heading-title-box">
      <span class="heading-icon">⚖️</span>
      <span class="heading-title-text">Boolean Decision Mechanics & Logical Flow</span>
      <button class="audio-play-btn" data-track-idx="0" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <div class="pro-tip-box" style="margin-bottom: 16px;">
      <h4>⚡ Wall Street Modeling Hotkeys: Formula Debugging</h4>
      <p>Master financial modelers rarely click: highlight any sub-expression in the formula bar and press <kbd>F9</kbd> to evaluate it to its live boolean or numerical result (press <kbd>Esc</kbd> immediately to avoid hardcoding!). Press <kbd>Ctrl</kbd> + <kbd>&#96;</kbd> (<kbd>Ctrl</kbd> + <kbd>~</kbd>) to instantly toggle all formula audit text across the entire grid.</p>
    </div>
    <p class="lead-text">In enterprise financial and operational models, conditional logic directs calculations along divergent paths based on business criteria. Modern analytical spreadsheets evaluate expressions to boolean states: <code>TRUE</code> or <code>FALSE</code>.</p>
    
    <div class="architecture-grid">
      <div class="arch-box">
        <h4>Binary IF Branching</h4>
        <p>Evaluates a condition: if true, returns the first argument; if false, branches to the second. Foundation of all algorithmic calculations.</p>
      </div>
      <div class="arch-box">
        <h4>Multi-Condition IFS</h4>
        <p>Evaluates up to 127 condition-value pairs sequentially. Halts and returns immediately upon the first condition evaluating to <code>TRUE</code>.</p>
      </div>
      <div class="arch-box">
        <h4>Default Catch-All</h4>
        <p>In <code>IFS()</code>, appending a final condition of <code>TRUE</code> creates a reliable default fallback, preventing unhandled <code>#N/A</code> errors.</p>
      </div>
    </div>

    <div class="table-responsive">
      <table class="reference-table">
        <thead>
          <tr>
            <th>Function / Operator</th>
            <th>Canonical Syntax</th>
            <th>Evaluation Rule</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>=IF()</code></td>
            <td><code>=IF(logical_test, value_if_true, [value_if_false])</code></td>
            <td>Branches to <code>value_if_true</code> if test evaluates to <code>TRUE</code>; otherwise branches to <code>value_if_false</code>.</td>
          </tr>
          <tr>
            <td><code>=IFS()</code></td>
            <td><code>=IFS(cond1, val1, cond2, val2, [TRUE, default_val])</code></td>
            <td>Tests condition pairs left-to-right; returns value for first <code>TRUE</code> condition. Throws <code>#N/A</code> if none match.</td>
          </tr>
          <tr>
            <td>Comparison Operators</td>
            <td><code>=, &lt;&gt;, &gt;, &gt;=, &lt;, &lt;=</code></td>
            <td>Compares numbers, strings, or dates. Returns boolean <code>TRUE</code> or <code>FALSE</code>.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="keynote-box keynote-emerald">
      <strong>Senior Analyst Takeaway:</strong> Never leave the <code>value_if_false</code> parameter empty in production models. An omitted false argument defaults to the literal boolean <code>FALSE</code>, cluttering executive dashboards and breaking downstream numerical aggregations.
    </div>

    <div class="anti-pattern-card">
      <div class="anti-pattern-title">⚠️ Anti-Pattern vs. Gold Standard</div>
      <div class="anti-pattern-body">
        <p><strong>Common Mistake:</strong> <code>=IF(Subscriptions!E2>=50000, "High ARR")</code><br>
        <em>Omitting the false argument causes Excel to display raw FALSE when ARR &lt; 50,000, breaking downstream text lookups.</em></p>
        <p><strong>Gold Standard:</strong> <code>=IF(Subscriptions!E2>=50000, "High ARR", "Standard ARR")</code><br>
        <em>Explicitly provides a fallback label ensuring consistent data types across all rows.</em></p>
      </div>
    </div>
  </div>
</section>

<section class="slide-section" id="sec02">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingAndConjunction">
    <span class="heading-num-box">02</span>
    <span class="heading-title-box">
      <span class="heading-icon">🔗</span>
      <span class="heading-title-text">Multi-Criteria Conjunction: The AND() Operator</span>
      <button class="audio-play-btn" data-track-idx="1" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p>Real-world business rules rarely hinge on a single variable. Qualifying a SaaS customer for an executive account review requires meeting multiple thresholds simultaneously (e.g. ARR &ge; $100,000 <em>and</em> SLA Compliance &ge; 99%).</p>
    
    <div class="architecture-grid">
      <div class="arch-box">
        <h4>Strict Conjunction</h4>
        <p>Returns <code>TRUE</code> if and only if <em>every</em> argument evaluates to <code>TRUE</code>. If even a single condition fails, returns <code>FALSE</code>.</p>
      </div>
      <div class="arch-box">
        <h4>Up to 255 Arguments</h4>
        <p>Accepts comma-delimited conditions: <code>AND(cond1, cond2, cond3, ...)</code>. Each condition is tested as an independent boolean expression.</p>
      </div>
      <div class="arch-box">
        <h4>Predicate Nesting</h4>
        <p>Commonly nested inside <code>IF()</code> to drive complex branch routing: <code>=IF(AND(E2>=100000, H2>=0.99), "VIP", "Standard")</code>.</p>
      </div>
    </div>

    <div class="table-responsive">
      <table class="reference-table">
        <thead>
          <tr>
            <th>Condition A (ARR &ge; 100k)</th>
            <th>Condition B (SLA &ge; 99%)</th>
            <th>AND(A, B) Result</th>
            <th>Business Outcome</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>TRUE</code> ($120,000)</td>
            <td><code>TRUE</code> (99.5%)</td>
            <td><strong style="color: #34d399;">TRUE</strong></td>
            <td>Qualifies for Tier 1 Elite Support SLA</td>
          </tr>
          <tr>
            <td><code>TRUE</code> ($105,000)</td>
            <td><code>FALSE</code> (97.0%)</td>
            <td><strong style="color: #f87171;">FALSE</strong></td>
            <td>Disqualified due to SLA shortfall</td>
          </tr>
          <tr>
            <td><code>FALSE</code> ($48,000)</td>
            <td><code>TRUE</code> (99.8%)</td>
            <td><strong style="color: #f87171;">FALSE</strong></td>
            <td>Disqualified due to ARR threshold</td>
          </tr>
          <tr>
            <td><code>FALSE</code> ($14,000)</td>
            <td><code>FALSE</code> (92.0%)</td>
            <td><strong style="color: #f87171;">FALSE</strong></td>
            <td>Standard baseline support</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="keynote-box keynote-emerald">
      <strong>Senior Analyst Takeaway:</strong> Excel does NOT support mathematical double-inequality chaining like <code>50000 &lt;= E2 &lt;= 100000</code>. Excel evaluates <code>50000 &lt;= E2</code> to <code>TRUE</code>, and then coerces <code>TRUE &lt;= 100000</code> to <code>1 &lt;= 100000</code>, returning <code>TRUE</code> regardless of cell value! Always use <code>AND(E2&gt;=50000, E2&lt;=100000)</code>.
    </div>

    <div class="anti-pattern-card">
      <div class="anti-pattern-title">⚠️ Anti-Pattern vs. Gold Standard</div>
      <div class="anti-pattern-body">
        <p><strong>Common Mistake:</strong> <code>=IF(50000 &lt;= Subscriptions!E2 &lt;= 100000, "Mid", "Other")</code><br>
        <em>Mathematical chaining silently evaluates to TRUE for ANY positive number, creating massive reporting errors.</em></p>
        <p><strong>Gold Standard:</strong> <code>=IF(AND(Subscriptions!E2&gt;=50000, Subscriptions!E2&lt;=100000), "Mid", "Other")</code><br>
        <em>Uses explicit boolean conjunction to test both boundaries independently.</em></p>
      </div>
    </div>
  </div>
</section>

<section class="slide-section" id="sec03">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingOrDisjunction">
    <span class="heading-num-box">03</span>
    <span class="heading-title-box">
      <span class="heading-icon">🔀</span>
      <span class="heading-title-text">Multi-Criteria Disjunction: The OR() Operator</span>
      <button class="audio-play-btn" data-track-idx="2" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p>Where <code>AND()</code> acts as a restrictive gatekeeper, <code>OR()</code> serves as an inclusive net. In customer retention modeling, an immediate intervention alarm must fire if <em>either</em> the customer's churn risk exceeds 70% <em>or</em> their account renewal status is already flagged as "At Risk".</p>
    
    <div class="architecture-grid">
      <div class="arch-box">
        <h4>Inclusive Disjunction</h4>
        <p>Returns <code>TRUE</code> if at least one argument evaluates to <code>TRUE</code>. Only returns <code>FALSE</code> if every argument is false.</p>
      </div>
      <div class="arch-box">
        <h4>Risk Alarm Triggers</h4>
        <p>Ideal for anomaly flags, compliance breach warnings, and early churn detection where any violation warrants executive escalation.</p>
      </div>
      <div class="arch-box">
        <h4>Nested Synergy</h4>
        <p>Combines with <code>AND()</code> and <code>IF()</code> to construct nuanced decision matrices: <code>=IF(OR(Churn>0.7, Status="At Risk"), "Alarm", "OK")</code>.</p>
      </div>
    </div>

    <div class="table-responsive">
      <table class="reference-table">
        <thead>
          <tr>
            <th>Condition A (Churn &gt; 0.70)</th>
            <th>Condition B (Status = "At Risk")</th>
            <th>OR(A, B) Result</th>
            <th>Retention Action Triggered</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>TRUE</code> (0.72)</td>
            <td><code>TRUE</code> ("At Risk")</td>
            <td><strong style="color: #34d399;">TRUE</strong></td>
            <td>Immediate Executive Sponsor Meeting</td>
          </tr>
          <tr>
            <td><code>TRUE</code> (0.85)</td>
            <td><code>FALSE</code> ("Pending")</td>
            <td><strong style="color: #34d399;">TRUE</strong></td>
            <td>Predictive Churn Automated Rescue Workflow</td>
          </tr>
          <tr>
            <td><code>FALSE</code> (0.25)</td>
            <td><code>TRUE</code> ("At Risk")</td>
            <td><strong style="color: #34d399;">TRUE</strong></td>
            <td>Contract Term & Pricing Adjustment Call</td>
          </tr>
          <tr>
            <td><code>FALSE</code> (0.12)</td>
            <td><code>FALSE</code> ("Renewed")</td>
            <td><strong style="color: #f87171;">FALSE</strong></td>
            <td>Standard Renewal Routine (No Alert)</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="keynote-box keynote-emerald">
      <strong>Senior Analyst Takeaway:</strong> Do not confuse SQL/Python syntax with Excel formula syntax. Writing <code>=IF(A2="Enterprise" OR B2>50, ...)</code> triggers a <code>#NAME?</code> syntax error. Excel requires functional prefix notation: <code>=IF(OR(A2="Enterprise", B2>50), ...)</code>.
    </div>

    <div class="anti-pattern-card">
      <div class="anti-pattern-title">⚠️ Anti-Pattern vs. Gold Standard</div>
      <div class="anti-pattern-body">
        <p><strong>Common Mistake:</strong> <code>=IF(Subscriptions!D4="Enterprise" OR Subscriptions!G4&gt;0.6, "Alert", "OK")</code><br>
        <em>Treating OR as an infix operator causes Excel to look for a non-existent name 'OR', resulting in #NAME?.</em></p>
        <p><strong>Gold Standard:</strong> <code>=IF(OR(Subscriptions!D4="Enterprise", Subscriptions!G4&gt;0.6), "Alert", "OK")</code><br>
        <em>Uses Excel's prefix function notation with comma-separated arguments.</em></p>
      </div>
    </div>
  </div>
</section>

<section class="slide-section" id="sec04">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingNotLogic">
    <span class="heading-num-box">04</span>
    <span class="heading-title-box">
      <span class="heading-icon">🔄</span>
      <span class="heading-title-text">Logical Inversion & Exclusions: The NOT() Operator</span>
      <button class="audio-play-btn" data-track-idx="3" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p>The <code>NOT()</code> function reverses the truth value of its argument: <code>NOT(TRUE)</code> evaluates to <code>FALSE</code>, and <code>NOT(FALSE)</code> evaluates to <code>TRUE</code>. It is invaluable for filtering out exclusions, validating mandatory fields, and auditing non-compliance.</p>
    
    <div class="architecture-grid">
      <div class="arch-box">
        <h4>Unary Truth Inversion</h4>
        <p>Takes exactly one boolean condition. Inverts <code>1</code> to <code>FALSE</code> and <code>0</code> to <code>TRUE</code>.</p>
      </div>
      <div class="arch-box">
        <h4>Exclusion Audits</h4>
        <p>Detects unfulfilled obligations: <code>NOT(RenewalStatus="Renewed")</code> isolates all pending, at-risk, and churned accounts.</p>
      </div>
      <div class="arch-box">
        <h4>De Morgan's Laws</h4>
        <p><code>NOT(AND(A, B))</code> equals <code>OR(NOT(A), NOT(B))</code>. Simplifies convoluted negative logic in data engineering pipelines.</p>
      </div>
    </div>

    <div class="table-responsive">
      <table class="reference-table">
        <thead>
          <tr>
            <th>Raw Condition Argument</th>
            <th>Raw Value</th>
            <th>NOT(Argument) Output</th>
            <th>Practical Application</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>Subscriptions!I9 = "Renewed"</code></td>
            <td><code>FALSE</code> ("Churned")</td>
            <td><strong style="color: #34d399;">TRUE</strong></td>
            <td>Flags un-renewed account for revenue write-off</td>
          </tr>
          <tr>
            <td><code>Subscriptions!E2 &gt;= 50000</code></td>
            <td><code>TRUE</code> ($120,000)</td>
            <td><strong style="color: #f87171;">FALSE</strong></td>
            <td>Confirms account is NOT in SMB tier</td>
          </tr>
          <tr>
            <td><code>ISBLANK(Subscriptions!A2)</code></td>
            <td><code>FALSE</code> ("ACC-101")</td>
            <td><strong style="color: #34d399;">TRUE</strong></td>
            <td>Data validation: ensures Account ID is populated</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="keynote-box keynote-emerald">
      <strong>Senior Analyst Takeaway:</strong> Avoid double negatives like <code>=IF(NOT(Status&lt;&gt;"Renewed"), ...)</code>. Double negations increase cognitive load and invite audit defects. Use simple affirmative logic: <code>=IF(Status="Renewed", ...)</code>. Reserve <code>NOT()</code> for complex boolean conjunctions: <code>=NOT(AND(Compliance&gt;=0.99, Churn&lt;=0.20))</code>.
    </div>

    <div class="anti-pattern-card">
      <div class="anti-pattern-title">⚠️ Anti-Pattern vs. Gold Standard</div>
      <div class="anti-pattern-body">
        <p><strong>Common Mistake:</strong> <code>=IF(NOT(Subscriptions!I2&lt;&gt;"Renewed"), "Active", "Lost")</code><br>
        <em>Double negation (NOT combined with &lt;&gt;) obscures business intent and confuses model reviewers.</em></p>
        <p><strong>Gold Standard:</strong> <code>=IF(Subscriptions!I2="Renewed", "Active", "Lost")</code><br>
        <em>Direct, unambiguous affirmative assertion matching industry readability standards.</em></p>
      </div>
    </div>
  </div>
</section>

<section class="slide-section" id="sec05">
    <div class="keynote-box keynote-indigo">
      <strong>⚡ Performance Engineering Spotlight: Variable Caching with =LET() in Microsoft 365</strong><br>
      In legacy Excel, complex nested formulas like <code>=IF(VLOOKUP(...)&gt;100, VLOOKUP(...)*0.1, VLOOKUP(...)*0.05)</code> force Excel to execute the identical expensive lookup three times in a single cell!<br>
      Modern Microsoft 365 introduces <code>=LET()</code> to declare local variables inside a formula:<br>
      <code>=LET(val, XLOOKUP(A2, Master!A:A, Master!B:B), IF(val&gt;100, val*0.1, val*0.05))</code><br>
      By computing <code>val</code> exactly once, <code>LET()</code> drastically accelerates workbook calculation speed and eliminates repetitive formula authoring.
    </div>

  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingNestedHierarchies">
    <span class="heading-num-box">05</span>
    <span class="heading-title-box">
      <span class="heading-icon">🌲</span>
      <span class="heading-title-text">Deep Nested IF Hierarchies: Tiered Evaluation</span>
      <button class="audio-play-btn" data-track-idx="4" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p>Before modern functions like <code>IFS()</code> and <code>SWITCH()</code> were introduced in Excel 2019/365, complex multi-tier decision trees were constructed by nesting <code>IF()</code> statements inside the <code>value_if_false</code> argument of parent <code>IF()</code> functions. This remains ubiquitous in legacy corporate models.</p>
    
    <div class="architecture-grid">
      <div class="arch-box">
        <h4>Ordered Precedence</h4>
        <p>Conditions MUST be evaluated in strict monotonic order (highest to lowest or lowest to highest) to prevent premature branch exits.</p>
      </div>
      <div class="arch-box">
        <h4>Parenthesis Depth</h4>
        <p>Each opened <code>IF(</code> must be balanced by a closing parenthesis at the end: <code>=IF(A, 1, IF(B, 2, IF(C, 3, 4)))</code>.</p>
      </div>
      <div class="arch-box">
        <h4>Hierarchical Splitting</h4>
        <p>Enables multi-variable sub-branching: checking ARR at the root, then checking Churn Risk within enterprise accounts.</p>
      </div>
    </div>

    <div class="table-responsive">
      <table class="reference-table">
        <thead>
          <tr>
            <th>Tier Level</th>
            <th>ARR Threshold Criteria</th>
            <th>Assigned Category</th>
            <th>Nested IF Evaluation Order</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Tier 1</strong></td>
            <td>ARR &ge; $100,000</td>
            <td><code>"Tier 1 Platinum"</code></td>
            <td>First check: <code>IF(E5>=100000, "Tier 1 Platinum", ...)</code></td>
          </tr>
          <tr>
            <td><strong>Tier 2</strong></td>
            <td>ARR &ge; $50,000</td>
            <td><code>"Tier 2 Gold"</code></td>
            <td>Second check: <code>IF(E5>=50000, "Tier 2 Gold", ...)</code></td>
          </tr>
          <tr>
            <td><strong>Tier 3</strong></td>
            <td>ARR &lt; $50,000</td>
            <td><code>"Tier 3 Silver"</code></td>
            <td>Final fallback: <code>"Tier 3 Silver"</code></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="keynote-box keynote-emerald">
      <strong>Senior Analyst Takeaway:</strong> The Cardinal Rule of Nested IFs is <strong>Monotonic Ordering</strong>. If you check <code>E5 &gt;= 10000</code> before checking <code>E5 &gt;= 100000</code>, an enterprise customer with $120,000 ARR will trigger the $10,000 condition first and be misclassified as Bronze! Always sort thresholds descending (&ge;) or ascending (&le;).
    </div>

    <div class="anti-pattern-card">
      <div class="anti-pattern-title">⚠️ Anti-Pattern vs. Gold Standard</div>
      <div class="anti-pattern-body">
        <p><strong>Common Mistake:</strong> <code>=IF(E5&gt;=10000, "Silver", IF(E5&gt;=50000, "Gold", "Platinum"))</code><br>
        <em>Testing the low threshold first causes all higher tiers to be swallowed by the first branch.</em></p>
        <p><strong>Gold Standard:</strong> <code>=IF(E5&gt;=100000, "Tier 1 Platinum", IF(E5&gt;=50000, "Tier 2 Gold", "Tier 3 Silver"))</code><br>
        <em>Strict descending order evaluates the most restrictive condition first.</em></p>
      </div>
    </div>
  </div>
</section>

<section class="slide-section" id="sec06">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingSwitchFunction">
    <span class="heading-num-box">06</span>
    <span class="heading-title-box">
      <span class="heading-icon">🎛️</span>
      <span class="heading-title-text">Direct Value Matching: The SWITCH() Function</span>
      <button class="audio-play-btn" data-track-idx="5" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p>When you need to test a single cell expression against multiple exact text strings or category codes, nested <code>IF()</code> statements require repeating the cell coordinate over and over. The <code>SWITCH()</code> function evaluates the target expression once and matches it against a clean list of value/result pairs.</p>
    
    <div class="architecture-grid">
      <div class="arch-box">
        <h4>Single Expression</h4>
        <p><code>SWITCH(expression, val1, res1, [val2, res2, ...], [default])</code>. The expression is evaluated exactly once, optimizing calculation speed.</p>
      </div>
      <div class="arch-box">
        <h4>Zero Coordinate Repetition</h4>
        <p>Eliminates repetitive cell references (e.g. <code>D2="Enterprise", D2="Growth"</code>), drastically reducing formula size and typo risks.</p>
      </div>
      <div class="arch-box">
        <h4>Clean Default Fallback</h4>
        <p>An unpaired final argument acts as the default result if no values match, preventing <code>#N/A</code> errors cleanly.</p>
      </div>
    </div>

    <div class="table-responsive">
      <table class="reference-table">
        <thead>
          <tr>
            <th>Plan Tier (Expression)</th>
            <th>Target Value Match</th>
            <th>Mapped Result</th>
            <th>Formula Code Fragment</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>Subscriptions!D3</code></td>
            <td><code>"Enterprise"</code></td>
            <td><code>"Dedicated Slack &amp; Phone"</code></td>
            <td><code>"Enterprise", "Dedicated Slack & Phone"</code></td>
          </tr>
          <tr>
            <td><code>Subscriptions!D3</code></td>
            <td><code>"Growth"</code></td>
            <td><code>"Priority Email &amp; Chat"</code></td>
            <td><code>"Growth", "Priority Email & Chat"</code></td>
          </tr>
          <tr>
            <td><code>Subscriptions!D3</code></td>
            <td><code>"Starter"</code></td>
            <td><code>"Community Portal"</code></td>
            <td><code>"Starter", "Community Portal"</code></td>
          </tr>
          <tr>
            <td><code>Any Unmatched</code></td>
            <td><code>(Default Fallback)</code></td>
            <td><code>"Standard Support"</code></td>
            <td><code>"Standard Support"</code></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="keynote-box keynote-emerald">
      <strong>Senior Analyst Takeaway:</strong> <code>SWITCH()</code> is dramatically cleaner and more readable than nested <code>IF()</code> when mapping discrete category codes (e.g. ISO Country Codes, Currency Codes, or SaaS Subscription Tiers). Use <code>SWITCH()</code> for exact discrete matching, and use <code>IFS()</code> or nested <code>IF()</code> for range inequalities (&gt;, &lt;).
    </div>

    <div class="anti-pattern-card">
      <div class="anti-pattern-title">⚠️ Anti-Pattern vs. Gold Standard</div>
      <div class="anti-pattern-body">
        <p><strong>Common Mistake:</strong> <code>=SWITCH(D3, D3="Enterprise", "Slack", D3="Growth", "Email")</code><br>
        <em>Passing comparison expressions like D3="Enterprise" into SWITCH causes it to compare the string "Growth" with boolean TRUE, failing all matches.</em></p>
        <p><strong>Gold Standard:</strong> <code>=SWITCH(D3, "Enterprise", "Slack", "Growth", "Email", "Portal")</code><br>
        <em>Passes clean target literals directly for automatic equality matching.</em></p>
      </div>
    </div>
  </div>
</section>

<section class="slide-section" id="sec07">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingBooleanArithmetic">
    <span class="heading-num-box">07</span>
    <span class="heading-title-box">
      <span class="heading-icon">⚡</span>
      <span class="heading-title-text">High-Performance Boolean Arithmetic: Binary Logic</span>
      <button class="audio-play-btn" data-track-idx="6" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p>In high-speed quantitative finance and big-data modeling, nested <code>IF()</code> statements introduce CPU branch-misprediction overhead. Elite analysts leverage <strong>Boolean Arithmetic</strong>: coercing <code>TRUE</code> into <code>1</code> and <code>FALSE</code> into <code>0</code> using mathematical operators.</p>
    
    <div class="architecture-grid">
      <div class="arch-box">
        <h4>Multiplication as AND (*)</h4>
        <p><code>(A &gt; 100) * (B = "Active")</code>. Returns <code>1</code> only if both are true (1 &times; 1 = 1). If either is false, multiplying by 0 yields <code>0</code>.</p>
      </div>
      <div class="arch-box">
        <h4>Addition as OR (+)</h4>
        <p><code>(A &gt; 100) + (B = "Active")</code>. Yields &ge; 1 if either condition is true. Testing <code>((Cond1)+(Cond2)) &gt; 0</code> provides branchless disjunction.</p>
      </div>
      <div class="arch-box">
        <h4>Zeroing Amounts Directly</h4>
        <p><code>=ARR * (Status = "Renewed")</code>. If renewed, returns full ARR; if churned, multiplies by 0 to instantly zero out revenue without an IF statement.</p>
      </div>
    </div>

    <div class="table-responsive">
      <table class="reference-table">
        <thead>
          <tr>
            <th>Boolean Expression</th>
            <th>Internal Boolean Evaluation</th>
            <th>Coerced Math Operation</th>
            <th>Computed Numeric Result</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>(120000 &gt; 50000) * (750 &gt; 500)</code></td>
            <td><code>TRUE * TRUE</code></td>
            <td><code>1 * 1</code></td>
            <td><strong>1</strong> (High Activity Flag)</td>
          </tr>
          <tr>
            <td><code>(48000 &gt; 50000) * (320 &gt; 500)</code></td>
            <td><code>FALSE * FALSE</code></td>
            <td><code>0 * 0</code></td>
            <td><strong>0</strong> (Inactive Flag)</td>
          </tr>
          <tr>
            <td><code>$12,000 * ("Churned" = "Renewed")</code></td>
            <td><code>12000 * FALSE</code></td>
            <td><code>12000 * 0</code></td>
            <td><strong>$0.00</strong> (Secured ARR)</td>
          </tr>
          <tr>
            <td><code>$120,000 * ("Renewed" = "Renewed")</code></td>
            <td><code>120000 * TRUE</code></td>
            <td><code>120000 * 1</code></td>
            <td><strong>$120,000.00</strong> (Secured ARR)</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="keynote-box keynote-emerald">
      <strong>Senior Analyst Takeaway:</strong> In models containing 100,000+ subscriber rows, replacing multi-level <code>IF()</code> trees with Boolean arithmetic <code>(Cond1)*(Cond2)</code> can accelerate model recalculation times by up to 500%. Arithmetic operations vectorize across CPU SIMD lanes without branching penalties.
    </div>

    <div class="anti-pattern-card">
      <div class="anti-pattern-title">⚠️ Anti-Pattern vs. Gold Standard</div>
      <div class="anti-pattern-body">
        <p><strong>Common Mistake:</strong> <code>=Subscriptions!E2&gt;50000 * Subscriptions!F2&gt;500</code><br>
        <em>Omitting parentheses violates operator precedence: multiplication executes before comparison, producing calculation errors.</em></p>
        <p><strong>Gold Standard:</strong> <code>=(Subscriptions!E2&gt;50000)*(Subscriptions!F2&gt;500)</code><br>
        <em>Strictly wraps each logical condition in parentheses before performing arithmetic multiplication.</em></p>
      </div>
    </div>
  </div>
</section>

<section class="slide-section" id="sec08">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingIferrorArchitecture">
    <span class="heading-num-box">08</span>
    <span class="heading-title-box">
      <span class="heading-icon">🛡️</span>
      <span class="heading-title-text">Universal Error Trapping: IFERROR() Architecture</span>
      <button class="audio-play-btn" data-track-idx="7" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p>Division by zero, missing lookup keys, and data-type mismatches produce disruptive error tokens like <code>#DIV/0!</code>, <code>#VALUE!</code>, and <code>#REF!</code>. The <code>IFERROR()</code> function intercepts every standard Excel error, replacing it with a designated graceful fallback value.</p>
    
    <div class="architecture-grid">
      <div class="arch-box">
        <h4>Catch-All Shield</h4>
        <p>Traps <code>#N/A</code>, <code>#VALUE!</code>, <code>#REF!</code>, <code>#DIV/0!</code>, <code>#NUM!</code>, <code>#NAME?</code>, and <code>#NULL!</code> without discrimination.</p>
      </div>
      <div class="arch-box">
        <h4>Division Safety</h4>
        <p><code>=IFERROR(ARR / UsageHours, 0)</code>. Guarantees that accounts with zero usage hours return <code>0</code> rather than exploding into <code>#DIV/0!</code>.</p>
      </div>
      <div class="arch-box">
        <h4>Executive Presentation</h4>
        <p>Replaces jarring error codes with clean business fallbacks: <code>"Pending Allocation"</code> or numeric <code>0</code> for seamless roll-ups.</p>
      </div>
    </div>

    <div class="table-responsive">
      <table class="reference-table">
        <thead>
          <tr>
            <th>Raw Excel Error Code</th>
            <th>Underlying Root Cause</th>
            <th>IFERROR(Formula, 0) Behavior</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>#DIV/0!</code></td>
            <td>Denominator cell contains 0 or is empty (e.g. <code>$12,000 / 0</code>)</td>
            <td>Intercepted &rarr; returns <code>0</code> cleanly</td>
          </tr>
          <tr>
            <td><code>#VALUE!</code></td>
            <td>Mathematical operation performed on text (e.g. <code>"ABC" * 5</code>)</td>
            <td>Intercepted &rarr; returns <code>0</code> cleanly</td>
          </tr>
          <tr>
            <td><code>#REF!</code></td>
            <td>Referenced worksheet, column, or row was deleted</td>
            <td>Intercepted &rarr; returns <code>0</code> (Danger: masks broken model)</td>
          </tr>
          <tr>
            <td><code>#NAME?</code></td>
            <td>Typo in formula name (e.g. <code>VLOOOKUP</code> instead of <code>VLOOKUP</code>)</td>
            <td>Intercepted &rarr; returns <code>0</code> (Danger: masks syntax bug)</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="keynote-box keynote-emerald">
      <strong>Senior Analyst Takeaway & Interview Insight:</strong> The "Silent Error Masking" Trap. Wall Street and top tech firms frequently grill candidates on why wrapping entire workbooks in <code>IFERROR()</code> is dangerous. Because <code>IFERROR()</code> traps <code>#REF!</code> and <code>#NAME?</code>, it silently swallows broken formula formulas, deleted columns, and typos, presenting false numbers to executives!
    </div>

    <div class="anti-pattern-card">
      <div class="anti-pattern-title">⚠️ Anti-Pattern vs. Gold Standard</div>
      <div class="anti-pattern-body">
        <p><strong>Common Mistake:</strong> <code>=IFERROR(VLOOOKUP(A2, Subscriptions!A2:E25, 5, FALSE), "Not Found")</code><br>
        <em>The typo in VLOOOKUP produces #NAME?, which IFERROR silently catches and masks as "Not Found" instead of throwing a syntax error.</em></p>
        <p><strong>Gold Standard:</strong> <code>=IFERROR(Subscriptions!E9/Subscriptions!F9, 0)</code><br>
        <em>Applies IFERROR specifically to arithmetic calculations where division by zero is a known business possibility.</em></p>
      </div>
    </div>
  </div>
</section>

<section class="slide-section" id="sec09">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingIfnaPrecision">
    <span class="heading-num-box">09</span>
    <span class="heading-title-box">
      <span class="heading-icon">🎯</span>
      <span class="heading-title-text">Surgical Error Trapping: IFNA() Precision</span>
      <button class="audio-play-btn" data-track-idx="8" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p>To eliminate the silent error-masking dangers of <code>IFERROR()</code>, modern Excel provides <code>IFNA()</code>. This function acts with surgical precision: it intercepts <strong>only</strong> the <code>#N/A</code> error ("Value Not Available"), allowing critical formula bugs like <code>#REF!</code>, <code>#VALUE!</code>, and <code>#DIV/0!</code> to surface immediately.</p>
    
    <div class="architecture-grid">
      <div class="arch-box">
        <h4>Surgical Isolation</h4>
        <p>Traps ONLY <code>#N/A</code> errors from failed lookups (<code>XLOOKUP</code>, <code>VLOOKUP</code>, <code>MATCH</code>). All other errors pass through unhindered.</p>
      </div>
      <div class="arch-box">
        <h4>Pipeline Debuggability</h4>
        <p>If a source column is deleted, throwing <code>#REF!</code>, <code>IFNA()</code> does NOT mask it. Automated tests immediately catch the pipeline regression.</p>
      </div>
      <div class="arch-box">
        <h4>Auditing Compliance</h4>
        <p>Mandated in SOX-compliant corporate financial models where intentional error hiding violates regulatory accounting guidelines.</p>
      </div>
    </div>

    <div class="table-responsive">
      <table class="reference-table">
        <thead>
          <tr>
            <th>Error Condition</th>
            <th>Error Token</th>
            <th>Behavior under IFERROR()</th>
            <th>Behavior under IFNA()</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Unmatched Lookup Key</td>
            <td><code>#N/A</code></td>
            <td>Returns Fallback</td>
            <td><strong style="color: #34d399;">Returns Fallback (Intended)</strong></td>
          </tr>
          <tr>
            <td>Deleted Source Column</td>
            <td><code>#REF!</code></td>
            <td>Returns Fallback (Dangerous)</td>
            <td><strong style="color: #f87171;">Throws #REF! Alert (Safe)</strong></td>
          </tr>
          <tr>
            <td>Formula Name Typo</td>
            <td><code>#NAME?</code></td>
            <td>Returns Fallback (Dangerous)</td>
            <td><strong style="color: #f87171;">Throws #NAME? Alert (Safe)</strong></td>
          </tr>
          <tr>
            <td>Math on Text String</td>
            <td><code>#VALUE!</code></td>
            <td>Returns Fallback (Dangerous)</td>
            <td><strong style="color: #f87171;">Throws #VALUE! Alert (Safe)</strong></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="keynote-box keynote-emerald">
      <strong>Production Architecture Insight:</strong> Elite Analytics Engineering teams enforce <code>IFNA()</code> over <code>IFERROR()</code> across all lookup and reference workflows. Distinguishing between <em>missing master records</em> (normal business state) and <em>corrupted data structures</em> (critical outage) is the hallmark of senior model architecture.
    </div>

    <div class="anti-pattern-card">
      <div class="anti-pattern-title">⚠️ Anti-Pattern vs. Gold Standard</div>
      <div class="anti-pattern-body">
        <p><strong>Common Mistake:</strong> <code>=IFERROR(XLOOKUP("GovCloud", Plan_Tiers!A2:A4, Plan_Tiers!B2:B4), "Unregistered")</code><br>
        <em>If Plan_Tiers sheet is renamed or deleted, IFERROR falsely reports "Unregistered" instead of alerting the data team to a broken dependency.</em></p>
        <p><strong>Gold Standard:</strong> <code>=IFNA(XLOOKUP("GovCloud", Plan_Tiers!A2:A4, Plan_Tiers!B2:B4), "Unregistered Tier")</code><br>
        <em>Surgically traps only missing tier names while allowing critical structural schema breaks to trigger error alerts.</em></p>
      </div>
    </div>
  </div>
</section>

<section class="slide-section" id="sec10">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingMatrixDecisions">
    <span class="heading-num-box">10</span>
    <span class="heading-title-box">
      <span class="heading-icon">📐</span>
      <span class="heading-title-text">Matrix Decision Tables & Multi-Dimensional Rules</span>
      <button class="audio-play-btn" data-track-idx="9" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p>Complex business operations require evaluating multiple orthogonal dimensions simultaneously: Plan Tier &times; Churn Risk &times; ARR Volume &times; SLA Performance. Rather than writing unmaintainable 50-line nested IF formulas, enterprise spreadsheets decouple policy into <strong>Matrix Decision Tables</strong>.</p>
    
    <div class="architecture-grid">
      <div class="arch-box">
        <h4>Policy Decoupling</h4>
        <p>Thresholds, discount tiers, and SLA commitments are externalized into reference sheets (<code>Plan_Tiers</code>) rather than hardcoded in formulas.</p>
      </div>
      <div class="arch-box">
        <h4>Two-Dimensional Querying</h4>
        <p>Combining <code>INDEX(MATCH())</code> or <code>XLOOKUP()</code> with boolean conditionals enables dynamic threshold evaluation against master tables.</p>
      </div>
      <div class="arch-box">
        <h4>Zero-Code Policy Updates</h4>
        <p>When leadership updates SLA commitments, editing 1 cell on <code>Plan_Tiers</code> propagates dynamically to all 50,000 subscriptions without code edits.</p>
      </div>
    </div>

    <div class="table-responsive">
      <table class="reference-table">
        <thead>
          <tr>
            <th>Plan Tier Dimension</th>
            <th>Churn Risk Dimension</th>
            <th>Required Intervention Policy</th>
            <th>Architectural Implementation</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Enterprise</td>
            <td>Churn Risk &gt; 0.40</td>
            <td><code>"Exec Sponsor Meeting"</code></td>
            <td>Compound Conjunction: <code>AND(D7="Enterprise", G7>0.4)</code></td>
          </tr>
          <tr>
            <td>Growth</td>
            <td>Churn Risk &gt; 0.50</td>
            <td><code>"CSM Rescue Plan"</code></td>
            <td>Compound Conjunction: <code>AND(D7="Growth", G7>0.5)</code></td>
          </tr>
          <tr>
            <td>Any Tier</td>
            <td>Churn Risk &gt; 0.60</td>
            <td><code>"Automated Survey"</code></td>
            <td>Secondary Threshold: <code>G7 > 0.6</code></td>
          </tr>
          <tr>
            <td>Baseline</td>
            <td>Nominal Risk (&le; 0.40)</td>
            <td><code>"Healthy Account"</code></td>
            <td>Default Catch-All: <code>TRUE, "Healthy Account"</code></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="keynote-box keynote-emerald">
      <strong>Enterprise Financial Modeling Insight:</strong> Decouple Business Policy from Formula Code. Hardcoding constants like <code>0.20</code> discount or <code>0.99</code> SLA directly into cell formulas is a severe maintainability violation. Storing decision matrices in dedicated master sheets (<code>Plan_Tiers</code>) allows non-technical business managers to adjust commercial terms safely with zero regression risk.
    </div>

    <div class="anti-pattern-card">
      <div class="anti-pattern-title">⚠️ Anti-Pattern vs. Gold Standard</div>
      <div class="anti-pattern-body">
        <p><strong>Common Mistake:</strong> <code>=IF(D2="Enterprise", IF(H2&gt;=0.99, "SLA Met", "Breach"), IF(D2="Growth", IF(H2&gt;=0.95, ...)))</code><br>
        <em>Hardcoding 20 conditional branches directly in formula strings creates an unmaintainable auditing nightmare.</em></p>
        <p><strong>Gold Standard:</strong> <code>=IF(AND(E2&gt;=100000, H2&gt;=INDEX(Plan_Tiers!C2:C4, MATCH(D2, Plan_Tiers!A2:A4, 0))), "SLA Met", "SLA Breach")</code><br>
        <em>Dynamically looks up SLA commitment from the master decision matrix, separating policy from computation.</em></p>
      </div>
    </div>
  </div>
</section>
`
    }
  ],

  // ═══════════════ INITIAL WORKBOOK DATA (24 ROWS x 9 COLS) ═══════════════
  initialWorkbook: {
    "Subscriptions": [
      ["Account ID", "Company Name", "Industry", "Plan Tier", "ARR", "Monthly Usage Hours", "Churn Risk Score", "SLA Compliance %", "Renewal Status"],
      ["ACC-101", "Apex Global", "FinTech", "Enterprise", 120000, 750, 0.12, 0.995, "Renewed"],
      ["ACC-102", "Zenith Analytics", "Healthcare", "Growth", 48000, 320, 0.25, 0.960, "Pending"],
      ["ACC-103", "BlueWave Media", "Media", "Starter", 14000, 110, 0.65, 0.920, "At Risk"],
      ["ACC-104", "Horizon FinTech", "FinTech", "Enterprise", 95000, 580, 0.18, 0.991, "Renewed"],
      ["ACC-105", "CyberPulse Sec", "CyberSecurity", "Enterprise", 110000, 690, 0.08, 0.998, "Renewed"],
      ["ACC-106", "NexaCorp Retail", "Retail", "Growth", 52000, 340, 0.72, 0.940, "At Risk"],
      ["ACC-107", "OmniCloud Labs", "Logistics", "Growth", 45000, 290, 0.30, 0.955, "Pending"],
      ["ACC-108", "Vortex Dynamics", "Healthcare", "Starter", 12000, 0, 0.85, 0.910, "Churned"],
      ["ACC-109", "Starlight Systems", "EdTech", "Growth", 38000, 210, 0.40, 0.965, "Renewed"],
      ["ACC-110", "Quantum AI Soft", "CyberSecurity", "Enterprise", 135000, 820, 0.05, 0.999, "Renewed"],
      ["ACC-111", "Beacon Financial", "FinTech", "Growth", 62000, 410, 0.22, 0.970, "Pending"],
      ["ACC-112", "TerraFirm Logistics", "Logistics", "Starter", 18000, 140, 0.55, 0.930, "Pending"],
      ["ACC-113", "AeroVision Space", "CyberSecurity", "Enterprise", 88000, 510, 0.15, 0.985, "Renewed"],
      ["ACC-114", "PulseBio Health", "Healthcare", "Growth", 42000, 260, 0.78, 0.945, "At Risk"],
      ["ACC-115", "SilverLine Media", "Media", "Starter", 16000, 95, 0.45, 0.915, "Pending"],
      ["ACC-116", "Krypton Retail", "Retail", "Growth", 58000, 390, 0.20, 0.980, "Renewed"],
      ["ACC-117", "Elevate EdTech", "EdTech", "Starter", 15000, 120, 0.60, 0.925, "At Risk"],
      ["ACC-118", "Summit Capital", "FinTech", "Enterprise", 105000, 640, 0.10, 0.992, "Renewed"],
      ["ACC-119", "AlphaShield Info", "CyberSecurity", "Growth", 54000, 360, 0.35, 0.960, "Pending"],
      ["ACC-120", "CarePoint Clinic", "Healthcare", "Starter", 22000, 160, 0.38, 0.935, "Renewed"],
      ["ACC-121", "OmniRoute Freight", "Logistics", "Growth", 49000, 310, 0.42, 0.950, "Pending"],
      ["ACC-122", "ByteWave Digital", "Media", "Enterprise", 92000, 570, 0.16, 0.988, "Renewed"],
      ["ACC-123", "Pinnacle Merchant", "Retail", "Starter", 19000, 130, 0.70, 0.920, "At Risk"],
      ["ACC-124", "Synapse Dataworks", "FinTech", "Enterprise", 140000, 880, 0.06, 0.997, "Renewed"]
    ],
    "Plan_Tiers": [
      ["Tier Name", "Base Discount %", "SLA Commitment", "Support Channel"],
      ["Enterprise", 0.20, 0.99, "Dedicated Slack & Phone"],
      ["Growth", 0.10, 0.95, "Priority Email & Chat"],
      ["Starter", 0.05, 0.90, "Community Portal"]
    ],
    "Decision_Modeling": [
      ["Decision Metric / Target Model", "Computed Output", "Evaluation Benchmark"],
      ["c01: Account ACC-101 ARR Classification (IF)", "", "High ARR (>= $50k)"],
      ["c02: Account ACC-101 Tier Discount Rate (IFS)", "", "20% Base Discount"],
      ["c03: Account ACC-102 Support Channel (SWITCH)", "", "Priority Email & Chat"],
      ["c04: Account ACC-101 Elite SLA Qualifier (AND)", "", "TRUE (ARR >= 100k & SLA >= 99%)"],
      ["c05: Account ACC-103 Retention Alert (OR)", "", "TRUE (Enterprise or Churn > 0.60)"],
      ["c06: Account ACC-108 Unrenewed Status (NOT)", "", "TRUE (Status != 'Renewed')"],
      ["c07: Account ACC-102 Retention Strategy (AND + IF)", "", "Priority Retain"],
      ["c08: Account ACC-106 Churn Alarm (OR + IF)", "", "Urgent Intervention"],
      ["c09: Account ACC-104 Tier Hierarchy (Nested IF)", "", "Tier 2 Gold ($50k-$100k)"],
      ["c10: Account ACC-101 High Activity Flag (Bool Math)", "", "1 (ARR > 50k & Usage > 500h)"],
      ["c11: Account ACC-108 Secured Revenue (Bool Math)", "", "$0 (Non-Renewed Zeroed)"],
      ["c12: Account ACC-108 ARR per Usage Hour (IFERROR)", "", "0 (Protected #DIV/0!)"],
      ["c13: Unregistered Plan Discount Lookup (IFNA)", "", "Unregistered Tier"],
      ["c14: Account ACC-106 Compliance Audit (NOT + AND)", "", "Flagged for Review"],
      ["c15: Account ACC-110 Strategic Tree (Nested IF)", "", "Strategic Pillar"],
      ["c16: Account ACC-101 Industry Penalty (SWITCH)", "", "0.05 (FinTech Rate)"],
      ["c17: Account ACC-101 SLA Commitment Check (Matrix)", "", "SLA Met"],
      ["c18: Account ACC-106 CS Escalation Rule (Matrix IFS)", "", "CSM Rescue Plan"],
      ["c19: Account ACC-104 Resilient Support Lookup (SWITCH + IFERROR)", "", "Dedicated Slack & Phone"],
      ["c20: Account ACC-101 Retained Net ARR (Decision Vector)", "", "$96,000.00 Net"]
    ]
  },

  // Auxiliary parameters populated into Plan_Tiers reference block
  initialAuxiliary: {
    "Plan_Tiers": {
      "F1": "High ARR Threshold",   "G1": 50000,
      "F2": "Churn Alert Cutoff",   "G2": 0.70,
      "F3": "Elite ARR Threshold",  "G3": 100000,
      "F4": "Test Unregistered",    "G4": "GovCloud"
    }
  },

  // ═══════════════ 20 CHALLENGES (EXACTLY 6 EASY, 8 MEDIUM, 6 HARD) ═══════════════
  challenges: [
    {
      id: "c01",
      number: 1,
      title: "Binary ARR Classification (IF)",
      difficulty: "easy",
      bloom: "apply",
      prompt: "To segment annual recurring revenue into key customer account tiers for quota planning, in sheet <code>Decision_Modeling</code> cell <strong>B2</strong>, write a logical decision formula using <code>=IF()</code> to evaluate Account ACC-101 ARR in <code>Subscriptions!E2</code>: if ARR is greater than or equal to <code>50000</code>, return \"High ARR\", otherwise return \"Standard ARR\".",
      targetSheet: "Decision_Modeling",
      targetCell: "B2",
      solution: '=IF(Subscriptions!E2>=50000, "High ARR", "Standard ARR")',
      expectedFormulaPrefix: "=IF",
      expectedValue: "High ARR",
      tolerance: 0,
      hint: "Inspect Account ACC-101's ARR in Subscriptions!E2 and compare it against 50000 inside an IF conditional.",
      commonMistakes: [
        { pattern: "50000\\s*,\\s*\"Standard", message: "Ensure 'High ARR' is the true branch and 'Standard ARR' is the false branch." }
      ],
      check: {
        expected: "High ARR",
        tolerance: 0,
        mustUseAnyOf: [["IF"]],
        mustReference: ["Subscriptions!E2"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["E"],
        params: [],
        previewRows: 1,
        summary: "Performs binary threshold classification on ARR."
      }
    },
    {
      id: "c02",
      number: 2,
      title: "Plan Tier Base Discount Mapping (IFS)",
      difficulty: "easy",
      bloom: "apply",
      prompt: "To determine contractual baseline discount rates based on subscription tier entitlements, in sheet <code>Decision_Modeling</code> cell <strong>B3</strong>, write a multi-branch logical formula using <code>=IFS()</code> to evaluate Account ACC-101 Plan Tier in <code>Subscriptions!D2</code>: if tier equals \"Enterprise\" return <code>0.20</code>, if \"Growth\" return <code>0.10</code>, if \"Starter\" return <code>0.05</code>, with default condition <code>TRUE</code> returning <code>0.00</code>.",
      targetSheet: "Decision_Modeling",
      targetCell: "B3",
      solution: '=IFS(Subscriptions!D2="Enterprise", 0.2, Subscriptions!D2="Growth", 0.1, Subscriptions!D2="Starter", 0.05, TRUE, 0)',
      expectedFormulaPrefix: "=IFS",
      expectedValue: 0.20,
      tolerance: 0.001,
      hint: "Provide condition and value pairs to IFS, concluding with TRUE and 0 as the universal fallback.",
      commonMistakes: [
        { pattern: "SWITCH", message: "Use the =IFS() function for this challenge as requested." }
      ],
      check: {
        expected: 0.20,
        tolerance: 0.001,
        mustUseAnyOf: [["IFS"]],
        mustReference: ["Subscriptions!D2"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["D"],
        params: [],
        previewRows: 1,
        summary: "Maps plan tier to base discount rate using sequential IFS evaluation."
      }
    },
    {
      id: "c03",
      number: 3,
      title: "Direct Support Channel Matching (SWITCH)",
      difficulty: "easy",
      bloom: "apply",
      prompt: "To route technical support inquiries to designated service channels by contract tier, in sheet <code>Decision_Modeling</code> cell <strong>B4</strong>, write an exact expression matching formula using <code>=SWITCH()</code> to evaluate Account ACC-102 Plan Tier in <code>Subscriptions!D3</code>, mapping \"Enterprise\" to \"Dedicated Slack & Phone\", \"Growth\" to \"Priority Email & Chat\", \"Starter\" to \"Community Portal\", and default fallback to \"Standard Support\".",
      targetSheet: "Decision_Modeling",
      targetCell: "B4",
      solution: '=SWITCH(Subscriptions!D3, "Enterprise", "Dedicated Slack & Phone", "Growth", "Priority Email & Chat", "Starter", "Community Portal", "Standard Support")',
      expectedFormulaPrefix: "=SWITCH",
      expectedValue: "Priority Email & Chat",
      tolerance: 0,
      hint: "SWITCH takes the target expression as the first parameter, followed by literal string and result pairs, ending with the default fallback.",
      commonMistakes: [
        { pattern: "Subscriptions!D3\\s*=", message: "Do not repeat the cell comparison inside SWITCH; provide only the target string literals." }
      ],
      check: {
        expected: "Priority Email & Chat",
        tolerance: 0,
        mustUseAnyOf: [["SWITCH"]],
        mustReference: ["Subscriptions!D3"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["D"],
        params: [],
        previewRows: 1,
        summary: "Directly matches plan tier string to support channel name."
      }
    },
    {
      id: "c04",
      number: 4,
      title: "Elite SLA Qualification (AND)",
      difficulty: "easy",
      bloom: "apply",
      prompt: "To qualify premier enterprise accounts for elite white-glove onboarding, in sheet <code>Decision_Modeling</code> cell <strong>B5</strong>, write a joint logical condition formula using <code>=AND()</code> to test whether Account ACC-101 ARR in <code>Subscriptions!E2</code> is at least <code>100000</code> AND SLA Compliance % in <code>Subscriptions!H2</code> is at least <code>0.99</code>.",
      targetSheet: "Decision_Modeling",
      targetCell: "B5",
      solution: '=AND(Subscriptions!E2>=100000, Subscriptions!H2>=0.99)',
      expectedFormulaPrefix: "=AND",
      expectedValue: true,
      tolerance: 0,
      hint: "Pass both inequality conditions separated by a comma into =AND().",
      commonMistakes: [
        { pattern: "&&", message: "Excel formulas use AND(cond1, cond2), not JavaScript && operators." }
      ],
      check: {
        expected: true,
        tolerance: 0,
        mustUseAnyOf: [["AND"]],
        mustReference: ["Subscriptions!E2", "Subscriptions!H2"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["E", "H"],
        params: [],
        previewRows: 1,
        summary: "Evaluates multi-criteria conjunction for elite customer qualification."
      }
    },
    {
      id: "c05",
      number: 5,
      title: "Retention Attention Trigger (OR)",
      difficulty: "easy",
      bloom: "apply",
      prompt: "To trigger immediate executive retention protocols for high-stakes or deteriorating client accounts, in sheet <code>Decision_Modeling</code> cell <strong>B6</strong>, write an inclusive disjunction formula using <code>=OR()</code> to verify whether Account ACC-103 Plan Tier in <code>Subscriptions!D4</code> equals \"Enterprise\" OR Churn Risk Score in <code>Subscriptions!G4</code> is strictly greater than <code>0.60</code>.",
      targetSheet: "Decision_Modeling",
      targetCell: "B6",
      solution: '=OR(Subscriptions!D4="Enterprise", Subscriptions!G4>0.6)',
      expectedFormulaPrefix: "=OR",
      expectedValue: true,
      tolerance: 0,
      hint: "Combine the tier equality check and the churn risk inequality test inside =OR().",
      commonMistakes: [
        { pattern: "\\|\\|", message: "Excel formulas use OR(cond1, cond2), not programming || operators." }
      ],
      check: {
        expected: true,
        tolerance: 0,
        mustUseAnyOf: [["OR"]],
        mustReference: ["Subscriptions!D4", "Subscriptions!G4"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["D", "G"],
        params: [],
        previewRows: 1,
        summary: "Applies inclusive disjunction to trigger retention alerts."
      }
    },
    {
      id: "c06",
      number: 6,
      title: "Logical Inversion of Renewal State (NOT)",
      difficulty: "easy",
      bloom: "apply",
      prompt: "To flag accounts with pending or unrenewed contracts for proactive sales outreach, in sheet <code>Decision_Modeling</code> cell <strong>B7</strong>, write a logical inversion formula using <code>=NOT()</code> to verify whether Account ACC-108 Renewal Status in <code>Subscriptions!I9</code> is NOT equal to \"Renewed\" using <code>=NOT(Subscriptions!I9=\"Renewed\")</code>.",
      targetSheet: "Decision_Modeling",
      targetCell: "B7",
      solution: '=NOT(Subscriptions!I9="Renewed")',
      expectedFormulaPrefix: "=NOT",
      expectedValue: true,
      tolerance: 0,
      hint: "Wrap the equality comparison Subscriptions!I9=\"Renewed\" inside the =NOT() function.",
      commonMistakes: [
        { pattern: "!=|=(?:IF\\()?\\s*!", message: "Excel uses the NOT() function rather than an exclamation prefix." }
      ],
      check: {
        expected: true,
        tolerance: 0,
        mustUseAnyOf: [["NOT"]],
        mustReference: ["Subscriptions!I9"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["I"],
        params: [],
        previewRows: 1,
        summary: "Inverts boolean equality to isolate un-renewed accounts."
      }
    },
    {
      id: "c07",
      number: 7,
      title: "Retention Strategy Classification (AND + IF)",
      difficulty: "medium",
      bloom: "analyze",
      prompt: "To prioritize customer success resources on high-value accounts exhibiting strong retention signals, in sheet <code>Decision_Modeling</code> cell <strong>B8</strong>, write a compound decision formula using <code>=IF()</code> and <code>=AND()</code> to evaluate Account ACC-102: if ARR in <code>Subscriptions!E3</code> >= <code>45000</code> AND Churn Risk in <code>Subscriptions!G3</code> <= <code>0.30</code>, return \"Priority Retain\", otherwise return \"Standard Review\".",
      targetSheet: "Decision_Modeling",
      targetCell: "B8",
      solution: '=IF(AND(Subscriptions!E3>=45000, Subscriptions!G3<=0.3), "Priority Retain", "Standard Review")',
      expectedFormulaPrefix: "=IF",
      expectedValue: "Priority Retain",
      tolerance: 0,
      hint: "Place the =AND(...) statement into the logical test argument of =IF().",
      commonMistakes: [
        { pattern: "\\bAND\\s*\\(.*\\bAND\\s*\\(", message: "Only one AND() function is required to combine the conditions." }
      ],
      check: {
        expected: "Priority Retain",
        tolerance: 0,
        mustUseAnyOf: [["IF"], ["AND"]],
        mustReference: ["Subscriptions!E3", "Subscriptions!G3"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["E", "G"],
        params: [],
        previewRows: 1,
        summary: "Classifies account retention priority using multi-variable conjunction."
      }
    },
    {
      id: "c08",
      number: 8,
      title: "Churn Crisis Alarm Trigger (OR + IF)",
      difficulty: "medium",
      bloom: "analyze",
      prompt: "To trigger urgent customer success interventions when churn indicators flash warning signs, in sheet <code>Decision_Modeling</code> cell <strong>B9</strong>, write an emergency trigger formula using <code>=IF()</code> and <code>=OR()</code> to evaluate Account ACC-106: if Churn Risk Score in <code>Subscriptions!G7</code> > <code>0.70</code> OR Renewal Status in <code>Subscriptions!I7</code> equals \"At Risk\", return \"Urgent Intervention\", otherwise return \"Normal Monitoring\".",
      targetSheet: "Decision_Modeling",
      targetCell: "B9",
      solution: '=IF(OR(Subscriptions!G7>0.7, Subscriptions!I7="At Risk"), "Urgent Intervention", "Normal Monitoring")',
      expectedFormulaPrefix: "=IF",
      expectedValue: "Urgent Intervention",
      tolerance: 0,
      hint: "Embed =OR(...) inside the logical test of =IF() to trigger 'Urgent Intervention' whenever either threshold is breached.",
      commonMistakes: [
        { pattern: "\\bAND\\s*\\(", message: "Use OR() to trigger the alarm if either condition is satisfied." }
      ],
      check: {
        expected: "Urgent Intervention",
        tolerance: 0,
        mustUseAnyOf: [["IF"], ["OR"]],
        mustReference: ["Subscriptions!G7", "Subscriptions!I7"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["G", "I"],
        params: [],
        previewRows: 1,
        summary: "Triggers urgent intervention via multi-criteria disjunction."
      }
    },
    {
      id: "c09",
      number: 9,
      title: "3-Tier ARR Hierarchy (Nested IF)",
      difficulty: "medium",
      bloom: "analyze",
      prompt: "To establish a 3-tier executive sponsorship hierarchy across enterprise accounts, in sheet <code>Decision_Modeling</code> cell <strong>B10</strong>, write a multi-level classification formula using nested <code>=IF()</code> statements to categorize Account ACC-104 ARR in <code>Subscriptions!E5</code>: if ARR >= <code>100000</code> return \"Tier 1 Platinum\", else if ARR >= <code>50000</code> return \"Tier 2 Gold\", else return \"Tier 3 Silver\".",
      targetSheet: "Decision_Modeling",
      targetCell: "B10",
      solution: '=IF(Subscriptions!E5>=100000, "Tier 1 Platinum", IF(Subscriptions!E5>=50000, "Tier 2 Gold", "Tier 3 Silver"))',
      expectedFormulaPrefix: "=IF",
      expectedValue: "Tier 2 Gold",
      tolerance: 0,
      hint: "Place the second IF() in the value_if_false argument of the top-level IF().",
      commonMistakes: [
        { pattern: "IFS", message: "This challenge specifically tests classic nested IF() hierarchies." }
      ],
      check: {
        expected: "Tier 2 Gold",
        tolerance: 0,
        mustUseAnyOf: [["IF"]],
        mustReference: ["Subscriptions!E5"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["E"],
        params: [],
        previewRows: 1,
        summary: "Constructs a 3-tier hierarchical categorization tree."
      }
    },
    {
      id: "c10",
      number: 10,
      title: "High-Activity Flag via Boolean Math",
      difficulty: "medium",
      bloom: "analyze",
      prompt: "To generate a high-speed binary qualification flag (1 or 0) identifying high-revenue power-user accounts, in sheet <code>Decision_Modeling</code> cell <strong>B11</strong>, write an arithmetic Boolean logic formula using multiplication <code>*</code> multiplying the test for ARR in <code>Subscriptions!E2</code> > <code>50000</code> by Monthly Usage Hours in <code>Subscriptions!F2</code> > <code>500</code>.",
      targetSheet: "Decision_Modeling",
      targetCell: "B11",
      solution: '=(Subscriptions!E2>50000)*(Subscriptions!F2>500)',
      expectedFormulaPrefix: "=(",
      expectedValue: 1,
      tolerance: 0,
      hint: "Wrap each comparison in parentheses and multiply them: (Cond1)*(Cond2).",
      commonMistakes: [
        { pattern: "IF\\(", message: "Use pure Boolean arithmetic multiplication with * rather than the IF function." }
      ],
      check: {
        expected: 1,
        tolerance: 0,
        mustReference: ["Subscriptions!E2", "Subscriptions!F2"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["E", "F"],
        params: [],
        previewRows: 1,
        summary: "Generates high-speed binary indicator without branching instructions."
      }
    },
    {
      id: "c11",
      number: 11,
      title: "Revenue Zeroing via Boolean Multiplication",
      difficulty: "medium",
      bloom: "analyze",
      prompt: "To calculate locked annual contract value by zeroing out unrenewed accounts without branching overhead, in sheet <code>Decision_Modeling</code> cell <strong>B12</strong>, write a branchless Boolean revenue formula multiplying Account ACC-108 ARR in <code>Subscriptions!E9</code> by the Boolean renewal check <code>(Subscriptions!I9=\"Renewed\")</code>.",
      targetSheet: "Decision_Modeling",
      targetCell: "B12",
      solution: '=Subscriptions!E9*(Subscriptions!I9="Renewed")',
      expectedFormulaPrefix: "=Subscriptions",
      expectedValue: 0,
      tolerance: 0,
      hint: "Multiply the ARR cell directly by the parenthesized equality condition.",
      commonMistakes: [
        { pattern: "IF\\(", message: "Calculate renewal revenue directly via Boolean multiplication without IF()." }
      ],
      check: {
        expected: 0,
        tolerance: 0,
        mustReference: ["Subscriptions!E9", "Subscriptions!I9"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["E", "I"],
        params: [],
        previewRows: 1,
        summary: "Zeros churned account revenue using direct boolean coercion."
      }
    },
    {
      id: "c12",
      number: 12,
      title: "Zero-Usage Division Safety (IFERROR)",
      difficulty: "medium",
      bloom: "evaluate",
      prompt: "To calculate ARR generated per usage hour while safeguarding against divide-by-zero errors on inactive accounts, in sheet <code>Decision_Modeling</code> cell <strong>B13</strong>, write a defensive error-handling formula using <code>=IFERROR()</code> to compute Account ACC-108 ARR in <code>Subscriptions!E9</code> divided by Monthly Usage Hours in <code>Subscriptions!F9</code>, returning fallback <code>0</code> on error.",
      targetSheet: "Decision_Modeling",
      targetCell: "B13",
      solution: '=IFERROR(Subscriptions!E9/Subscriptions!F9, 0)',
      expectedFormulaPrefix: "=IFERROR",
      expectedValue: 0,
      tolerance: 0,
      hint: "Supply the division expression as the first argument to IFERROR, with 0 as the second argument.",
      commonMistakes: [
        { pattern: "IFNA", message: "Use IFERROR() to trap division by zero #DIV/0! errors." }
      ],
      check: {
        expected: 0,
        tolerance: 0,
        mustUseAnyOf: [["IFERROR"]],
        mustReference: ["Subscriptions!E9", "Subscriptions!F9"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["E", "F"],
        params: [],
        previewRows: 1,
        summary: "Traps #DIV/0! calculation errors on inactive accounts."
      }
    },
    {
      id: "c13",
      number: 13,
      title: "Surgical Missing Tier Trapping (IFNA)",
      difficulty: "medium",
      bloom: "evaluate",
      prompt: "To look up plan tier discount structures while preventing lookup failure crashes in financial models, in sheet <code>Decision_Modeling</code> cell <strong>B14</strong>, write a resilient lookup formula using <code>=IFNA()</code> wrapping <code>=XLOOKUP()</code> to query unregistered tier \"GovCloud\" in <code>Plan_Tiers!A2:A4</code> returning discount from <code>Plan_Tiers!B2:B4</code>, with fallback string \"Unregistered Tier\".",
      targetSheet: "Decision_Modeling",
      targetCell: "B14",
      solution: '=IFNA(XLOOKUP("GovCloud", Plan_Tiers!A2:A4, Plan_Tiers!B2:B4), "Unregistered Tier")',
      expectedFormulaPrefix: "=IFNA",
      expectedValue: "Unregistered Tier",
      tolerance: 0,
      hint: "Nest XLOOKUP inside IFNA, specifying 'Unregistered Tier' as the second argument.",
      commonMistakes: [
        { pattern: "IFERROR", message: "Use IFNA() for surgical lookup trapping as requested." }
      ],
      check: {
        expected: "Unregistered Tier",
        tolerance: 0,
        mustUseAnyOf: [["IFNA"]],
        mustReference: ["Plan_Tiers!A2:A4", "Plan_Tiers!B2:B4"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["A", "B"],
        params: [],
        previewRows: 3,
        summary: "Surgically traps lookup #N/A errors while preserving calculation integrity."
      }
    },
    {
      id: "c14",
      number: 14,
      title: "De Morgan Compliance Audit (NOT + AND)",
      difficulty: "medium",
      bloom: "analyze",
      prompt: "To audit enterprise subscription compliance against strict churn risk and uptime thresholds, in sheet <code>Decision_Modeling</code> cell <strong>B15</strong>, write an audit formula combining <code>=IF()</code>, <code>=NOT()</code>, and <code>=AND()</code> to evaluate Account ACC-106 Churn Risk in <code>Subscriptions!G7</code> and SLA Compliance in <code>Subscriptions!H7</code>: if <code>NOT(AND(Subscriptions!G7<=0.20, Subscriptions!H7>=0.99))</code> return \"Flagged for Review\", otherwise return \"Compliant\".",
      targetSheet: "Decision_Modeling",
      targetCell: "B15",
      solution: '=IF(NOT(AND(Subscriptions!G7<=0.2, Subscriptions!H7>=0.99)), "Flagged for Review", "Compliant")',
      expectedFormulaPrefix: "=IF",
      expectedValue: "Flagged for Review",
      tolerance: 0,
      hint: "Nest AND() inside NOT(), and wrap that within the condition parameter of IF().",
      commonMistakes: [
        { pattern: "\\bOR\\s*\\(", message: "Combine NOT() with AND() as requested in the audit specification." }
      ],
      check: {
        expected: "Flagged for Review",
        tolerance: 0,
        mustUseAnyOf: [["IF"], ["NOT"], ["AND"]],
        mustReference: ["Subscriptions!G7", "Subscriptions!H7"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["G", "H"],
        params: [],
        previewRows: 1,
        summary: "Audits compliance status using De Morgan logical conjunction inversion."
      }
    },
    {
      id: "c15",
      number: 15,
      title: "4-Tier Strategic SLA & Churn Tree (Nested IF)",
      difficulty: "hard",
      bloom: "evaluate",
      prompt: "To construct an executive 4-tier strategic client segmentation model based on ARR and churn risk, in sheet <code>Decision_Modeling</code> cell <strong>B16</strong>, write a hierarchical decision tree using nested <code>=IF()</code> statements for Account ACC-110: if ARR in <code>Subscriptions!E11</code> >= <code>120000</code>, check if Churn Risk in <code>Subscriptions!G11</code> <= <code>0.10</code>: return \"Strategic Pillar\" if true, else \"Enterprise High Risk\"; otherwise if ARR >= <code>50000</code>, return \"Growth Core\", else return \"Emerging\".",
      targetSheet: "Decision_Modeling",
      targetCell: "B16",
      solution: '=IF(Subscriptions!E11>=120000, IF(Subscriptions!G11<=0.1, "Strategic Pillar", "Enterprise High Risk"), IF(Subscriptions!E11>=50000, "Growth Core", "Emerging"))',
      expectedFormulaPrefix: "=IF",
      expectedValue: "Strategic Pillar",
      tolerance: 0,
      hint: "Split at 120000 ARR in the outer IF, nesting an IF in both the true and false branch arguments.",
      commonMistakes: [
        { pattern: "IFS", message: "Construct this multi-level branching tree using nested IF() statements." }
      ],
      check: {
        expected: "Strategic Pillar",
        tolerance: 0,
        mustUseAnyOf: [["IF"]],
        mustReference: ["Subscriptions!E11", "Subscriptions!G11"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["E", "G"],
        params: [],
        previewRows: 1,
        summary: "Constructs a 4-branch multi-attribute hierarchical decision tree."
      }
    },
    {
      id: "c16",
      number: 16,
      title: "Multi-Branch Industry Penalty Scale (SWITCH)",
      difficulty: "hard",
      bloom: "create",
      prompt: "To model industry-specific regulatory compliance penalty reserves in underwriting models, in sheet <code>Decision_Modeling</code> cell <strong>B17</strong>, write an exact expression matching formula using <code>=SWITCH()</code> to evaluate Account ACC-101 Industry in <code>Subscriptions!C2</code>: mapping \"FinTech\" to <code>0.05</code>, \"CyberSecurity\" to <code>0.04</code>, \"Healthcare\" to <code>0.03</code>, \"Logistics\" to <code>0.02</code>, \"Retail\" to <code>0.01</code>, and default to <code>0.00</code>.",
      targetSheet: "Decision_Modeling",
      targetCell: "B17",
      solution: '=SWITCH(Subscriptions!C2, "FinTech", 0.05, "CyberSecurity", 0.04, "Healthcare", 0.03, "Logistics", 0.02, "Retail", 0.01, 0)',
      expectedFormulaPrefix: "=SWITCH",
      expectedValue: 0.05,
      tolerance: 0.001,
      hint: "Supply Subscriptions!C2 as the expression argument, followed by alternating industry strings and rates, finishing with 0.",
      commonMistakes: [
        { pattern: "IFS", message: "Use SWITCH() rather than IFS() to match the single Industry expression." }
      ],
      check: {
        expected: 0.05,
        tolerance: 0.001,
        mustUseAnyOf: [["SWITCH"]],
        mustReference: ["Subscriptions!C2"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["C"],
        params: [],
        previewRows: 1,
        summary: "Evaluates multi-branch discrete industry penalty rate schedule."
      }
    },
    {
      id: "c17",
      number: 17,
      title: "Dynamic SLA Commitment Matrix (INDEX/MATCH + AND)",
      difficulty: "hard",
      bloom: "evaluate",
      prompt: "To audit contractual SLA compliance dynamically against tier commitments in the master plan matrix, in sheet <code>Decision_Modeling</code> cell <strong>B18</strong>, write a dynamic verification formula using <code>=IF()</code>, <code>=AND()</code>, and <code>=INDEX(MATCH())</code> to check if Account ACC-101 ARR in <code>Subscriptions!E2</code> >= <code>100000</code> AND SLA Compliance in <code>Subscriptions!H2</code> >= the commitment looked up from <code>Plan_Tiers!C2:C4</code> matching Plan Tier <code>Subscriptions!D2</code> in <code>Plan_Tiers!A2:A4</code> (exact match 0), returning \"SLA Met\" if satisfied, else \"SLA Breach\".",
      targetSheet: "Decision_Modeling",
      targetCell: "B18",
      solution: '=IF(AND(Subscriptions!E2>=100000, Subscriptions!H2>=INDEX(Plan_Tiers!C2:C4, MATCH(Subscriptions!D2, Plan_Tiers!A2:A4, 0))), "SLA Met", "SLA Breach")',
      expectedFormulaPrefix: "=IF",
      expectedValue: "SLA Met",
      tolerance: 0,
      hint: "Use INDEX(Plan_Tiers!C2:C4, MATCH(Subscriptions!D2, Plan_Tiers!A2:A4, 0)) to retrieve the required SLA threshold dynamically.",
      commonMistakes: [
        { pattern: "0\\.99", message: "Do not hardcode 0.99; look it up dynamically from Plan_Tiers using INDEX/MATCH." }
      ],
      check: {
        expected: "SLA Met",
        tolerance: 0,
        mustUseAnyOf: [["IF"], ["AND"], ["INDEX"]],
        mustReference: ["Subscriptions!E2", "Subscriptions!H2", "Plan_Tiers!C2:C4"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["E", "H", "D"],
        params: [],
        previewRows: 1,
        summary: "Evaluates dynamic multi-dimensional SLA compliance against master policy table."
      }
    },
    {
      id: "c18",
      number: 18,
      title: "Customer Success 2D Escalation Matrix (IFS + AND)",
      difficulty: "hard",
      bloom: "create",
      prompt: "To execute an automated Customer Success matrix escalation protocol based on tier and churn risk, in sheet <code>Decision_Modeling</code> cell <strong>B19</strong>, write a multi-condition matrix rule formula using <code>=IFS()</code> and <code>=AND()</code> for Account ACC-106: if Plan Tier in <code>Subscriptions!D7</code> = \"Enterprise\" AND Churn Risk in <code>Subscriptions!G7</code> > <code>0.40</code>, return \"Exec Sponsor Meeting\"; if Plan Tier = \"Growth\" AND Churn Risk > <code>0.50</code>, return \"CSM Rescue Plan\"; if Churn Risk > <code>0.60</code>, return \"Automated Survey\"; default <code>TRUE</code> return \"Healthy Account\".",
      targetSheet: "Decision_Modeling",
      targetCell: "B19",
      solution: '=IFS(AND(Subscriptions!D7="Enterprise", Subscriptions!G7>0.4), "Exec Sponsor Meeting", AND(Subscriptions!D7="Growth", Subscriptions!G7>0.5), "CSM Rescue Plan", Subscriptions!G7>0.6, "Automated Survey", TRUE, "Healthy Account")',
      expectedFormulaPrefix: "=IFS",
      expectedValue: "CSM Rescue Plan",
      tolerance: 0,
      hint: "Evaluate compound conditions in IFS() using AND(tier, churn_risk) pairs, ending with TRUE for healthy accounts.",
      commonMistakes: [
        { pattern: "\\bOR\\s*\\(", message: "Use AND() to require both the plan tier and the churn risk threshold." }
      ],
      check: {
        expected: "CSM Rescue Plan",
        tolerance: 0,
        mustUseAnyOf: [["IFS"], ["AND"]],
        mustReference: ["Subscriptions!D7", "Subscriptions!G7"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["D", "G"],
        params: [],
        previewRows: 1,
        summary: "Implements 2D customer success intervention matrix rule."
      }
    },
    {
      id: "c19",
      number: 19,
      title: "Resilient Support Lookup (SWITCH + IFERROR)",
      difficulty: "hard",
      bloom: "evaluate",
      prompt: "To create an uncrashable tier-based support channel router defended against unrecognized tiers, in sheet <code>Decision_Modeling</code> cell <strong>B20</strong>, write a defensive lookup formula wrapping <code>=SWITCH()</code> inside <code>=IFERROR()</code>: match Account ACC-104 Plan Tier in <code>Subscriptions!D5</code> with \"Enterprise\" -> \"Dedicated Slack & Phone\", \"Growth\" -> \"Priority Email & Chat\", returning fallback string \"Standard Portal\" on unmapped errors.",
      targetSheet: "Decision_Modeling",
      targetCell: "B20",
      solution: '=IFERROR(SWITCH(Subscriptions!D5, "Enterprise", "Dedicated Slack & Phone", "Growth", "Priority Email & Chat"), "Standard Portal")',
      expectedFormulaPrefix: "=IFERROR",
      expectedValue: "Dedicated Slack & Phone",
      tolerance: 0,
      hint: "Wrap the SWITCH() call inside IFERROR() to safeguard against unmapped tiers.",
      commonMistakes: [
        { pattern: "IFNA", message: "Wrap the SWITCH statement with IFERROR() as requested." }
      ],
      check: {
        expected: "Dedicated Slack & Phone",
        tolerance: 0,
        mustUseAnyOf: [["IFERROR"], ["SWITCH"]],
        mustReference: ["Subscriptions!D5"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["D"],
        params: [],
        previewRows: 1,
        summary: "Guards category switch logic with defensive error interception."
      }
    },
    {
      id: "c20",
      number: 20,
      title: "Retained Net ARR Vector Model (XLOOKUP + Bool Math)",
      difficulty: "hard",
      bloom: "create",
      prompt: "To model net recognized annual recurring revenue factoring in tier discounts and confirmed renewals, in sheet <code>Decision_Modeling</code> cell <strong>B21</strong>, write an integrated financial formula multiplying Account ACC-101 ARR in <code>Subscriptions!E2</code> by <code>(1 - XLOOKUP(Subscriptions!D2, Plan_Tiers!A2:A4, Plan_Tiers!B2:B4))</code> multiplied by the Boolean renewal confirmation check <code>(Subscriptions!I2=\"Renewed\")</code>.",
      targetSheet: "Decision_Modeling",
      targetCell: "B21",
      solution: '=Subscriptions!E2*(1-XLOOKUP(Subscriptions!D2, Plan_Tiers!A2:A4, Plan_Tiers!B2:B4))*(Subscriptions!I2="Renewed")',
      expectedFormulaPrefix: "=Subscriptions",
      expectedValue: 96000,
      tolerance: 0.1,
      hint: "Multiply ARR by (1 - discount looked up via XLOOKUP) and by the parenthesized renewal condition.",
      commonMistakes: [
        { pattern: "IF\\(", message: "Compute the retained ARR directly with Boolean arithmetic rather than an IF statement." }
      ],
      check: {
        expected: 96000,
        tolerance: 0.1,
        mustUseAnyOf: [["XLOOKUP"]],
        mustReference: ["Subscriptions!E2", "Subscriptions!D2", "Subscriptions!I2", "Plan_Tiers!A2:A4", "Plan_Tiers!B2:B4"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["E", "D", "I"],
        params: [],
        previewRows: 1,
        summary: "Calculates net retained ARR via branchless boolean multiplication and dynamic lookup."
      }
    }
  ]
};
