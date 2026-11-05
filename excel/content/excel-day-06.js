// public/excel/content/excel-day-06.js
// Manodemy Excel Studio — Day 06 Curriculum Manifest & Challenges
// Domain: PrimeDistro Catalog (B2B Wholesale Distribution)
// Conforms to: MISSION SPECIFICATION v3.2 & STYLE_GUIDE.md

// ══════════════════════════════════════════════════════════════════════════════
// ENGINE EXTENSION HOOKS: XLOOKUP Wildcards, Approximate Tiers & Array Broadcasting
// ══════════════════════════════════════════════════════════════════════════════
(function registerEngineExtensions() {
  function applyHooks(EE) {
    if (!EE || !EE.FUNCTION_REGISTRY) return;

    // 1. Enhanced XLOOKUP with Wildcard (mode 2) and Approximate Match (modes -1, 1)
    const origXlookup = EE.FUNCTION_REGISTRY.XLOOKUP;
    EE.FUNCTION_REGISTRY.XLOOKUP = ([lookupVal, lookupArr, returnArr, ifNotFound, matchMode = 0, searchMode = 1]) => {
      const lookups = Array.isArray(lookupArr) ? lookupArr.flat(Infinity) : [lookupArr];
      const returns = Array.isArray(returnArr) ? returnArr.flat(Infinity) : [returnArr];
      const mode = Number(matchMode) || 0;
      const sLookup = String(lookupVal ?? '').trim();
      const nLookup = parseFloat(lookupVal);

      if (mode === 0) {
        return origXlookup([lookupVal, lookupArr, returnArr, ifNotFound, matchMode]);
      }

      // Mode -1: Exact match or next smaller item
      if (mode === -1) {
        let bestIdx = -1;
        let bestDiff = Infinity;
        for (let i = 0; i < lookups.length; i++) {
          const item = parseFloat(lookups[i]);
          if (!isNaN(nLookup) && !isNaN(item) && item <= nLookup) {
            const diff = nLookup - item;
            if (diff < bestDiff) {
              bestDiff = diff;
              bestIdx = i;
            }
          }
        }
        if (bestIdx !== -1) return returns[bestIdx] !== undefined ? returns[bestIdx] : null;
        return ifNotFound !== undefined ? ifNotFound : EE.ERRORS.NA;
      }

      // Mode 1: Exact match or next larger item
      if (mode === 1) {
        let bestIdx = -1;
        let bestDiff = Infinity;
        for (let i = 0; i < lookups.length; i++) {
          const item = parseFloat(lookups[i]);
          if (!isNaN(nLookup) && !isNaN(item) && item >= nLookup) {
            const diff = item - nLookup;
            if (diff < bestDiff) {
              bestDiff = diff;
              bestIdx = i;
            }
          }
        }
        if (bestIdx !== -1) return returns[bestIdx] !== undefined ? returns[bestIdx] : null;
        return ifNotFound !== undefined ? ifNotFound : EE.ERRORS.NA;
      }

      // Mode 2: Wildcard match (* and ?)
      if (mode === 2) {
        const pattern = '^' + sLookup.replace(/([.+^$[\]\\(){}|])/g, '\\$1')
                                     .replace(/\*/g, '.*')
                                     .replace(/\?/g, '.') + '$';
        const reg = new RegExp(pattern, 'i');
        for (let i = 0; i < lookups.length; i++) {
          if (reg.test(String(lookups[i] ?? ''))) {
            return returns[i] !== undefined ? returns[i] : null;
          }
        }
        return ifNotFound !== undefined ? ifNotFound : EE.ERRORS.NA;
      }

      return origXlookup([lookupVal, lookupArr, returnArr, ifNotFound, matchMode]);
    };

    // 2. Enhanced MATCH with Wildcard (* and ?) support in mode 0
    const origMatch = EE.FUNCTION_REGISTRY.MATCH;
    EE.FUNCTION_REGISTRY.MATCH = ([lookupVal, lookupRange, matchType = 1]) => {
      const items = Array.isArray(lookupRange) ? lookupRange.flat(Infinity) : [lookupRange];
      const sLookup = String(lookupVal ?? '').trim();
      const mType = Number(matchType);

      if (mType === 0 && (sLookup.includes('*') || sLookup.includes('?'))) {
        const pattern = '^' + sLookup.replace(/([.+^$[\]\\(){}|])/g, '\\$1')
                                     .replace(/\*/g, '.*')
                                     .replace(/\?/g, '.') + '$';
        const reg = new RegExp(pattern, 'i');
        for (let i = 0; i < items.length; i++) {
          if (reg.test(String(items[i] ?? ''))) return i + 1;
        }
        return EE.ERRORS.NA;
      }
      return origMatch([lookupVal, lookupRange, matchType]);
    };

    // 3. Array Broadcasting for Multi-Criteria Lookups (e.g., (A2:A9="VND-103")*(G2:G9="East"))
    if (EE.WorkbookStore && EE.WorkbookStore.prototype) {
      const origEvalAST = EE.WorkbookStore.prototype.evaluateAST;
      EE.WorkbookStore.prototype.evaluateAST = function(node, currentSheet, cellOriginKey) {
        if (node && node.type === 'BinaryOp') {
          const left = this.evaluateAST(node.left, currentSheet);
          const right = this.evaluateAST(node.right, currentSheet);

          const isLeftArr = Array.isArray(left);
          const isRightArr = Array.isArray(right);

          if (isLeftArr || isRightArr) {
            const flatL = isLeftArr ? left.flat(Infinity) : null;
            const flatR = isRightArr ? right.flat(Infinity) : null;
            const count = Math.max(flatL ? flatL.length : 1, flatR ? flatR.length : 1);
            const result = [];

            for (let i = 0; i < count; i++) {
              const itemL = flatL ? flatL[i] : left;
              const itemR = flatR ? flatR[i] : right;

              let res;
              if (['=', '<>', '<', '<=', '>', '>='].includes(node.op)) {
                res = EE.compareExcelValues(itemL, itemR, node.op) ? 1 : 0;
              } else if (node.op === '*') {
                res = (Number(itemL) || 0) * (Number(itemR) || 0);
              } else if (node.op === '+') {
                res = (Number(itemL) || 0) + (Number(itemR) || 0);
              } else {
                res = 0;
              }
              result.push(res);
            }
            return result;
          }
        }
        return origEvalAST.call(this, node, currentSheet, cellOriginKey);
      };
    }
  }

  // Browser hook
  if (typeof window !== 'undefined' && window.ExcelEngine) {
    applyHooks(window.ExcelEngine);
  }

  // Node hook
  if (typeof require !== 'undefined') {
    try {
      const engine = require('../excel-engine.js');
      applyHooks(engine);
    } catch (e) {}
  }
})();

if (!window.EXCEL_COURSE_CONTENT) window.EXCEL_COURSE_CONTENT = {};

window.EXCEL_COURSE_CONTENT['excelDay06'] = {
  day: 6,
  globalDay: 24,
  title: "Modern Lookup and Reference: XLOOKUP & INDEX/MATCH",
  description: "Master enterprise 2-way matrix retrieval, bidirectional lookups, wildcard searching, tiered volume discount matching, horizontal referencing, and multi-criteria array lookups in B2B wholesale distribution.",
  topics: [
    "01. Architecture of Modern Lookups: Moving Beyond VLOOKUP",
    "02. Core XLOOKUP Mechanics: Exact Match & Resilient Column Mapping",
    "03. Reverse & Leftward Lookups: Breaking Free from the Left-Column Trap",
    "04. Graceful Missing Data: Built-in [if_not_found] & IFNA Trapping",
    "05. Wildcard Lookups (* and ?) for Partial SKU & Vendor Search",
    "06. Approximate Range Lookups: Match Modes -1 and 1 for Tiered Volume Pricing",
    "07. Classic Power Duo: INDEX and MATCH Fundamentals",
    "08. Two-Way Matrix Lookups: Intersecting Dynamic Rows and Columns",
    "09. Horizontal Referencing: HLOOKUP & Modern Transposed Lookups",
    "10. Multi-Criteria Compound Lookups: Boolean Array Referencing"
  ],
  slides: [
    {
      title: "Modern Lookup & Reference Architecture",
      html: `
<section class="slide-section" id="sec01">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingLookupArch">
    <span class="heading-num-box">01</span>
    <span class="heading-title-box">
      <span class="heading-icon">🔍</span>
      <span class="heading-title-text">Architecture of Modern Lookups: Moving Beyond VLOOKUP</span>
      <button class="audio-play-btn" data-track-idx="0" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <div class="pro-tip-box" style="margin-bottom: 16px;">
      <h4>⚡ Big 4 Senior Analyst Speed Tip: Matrix Coordinates</h4>
      <p>When authoring 2D <kbd>INDEX</kbd> + <kbd>MATCH</kbd> models, press <kbd>F4</kbd> immediately after typing a range to cycle through locking modes: <code>$A$1</code> (full lock) &rarr; <code>A$1</code> (row lock) &rarr; <code>$A1</code> (column lock). Press <kbd>Ctrl</kbd> + <kbd>[</kbd> to instantly jump to the precedent source table.</p>
    </div>
    <p class="lead-text">For three decades, <code>VLOOKUP</code> was the workhorse of spreadsheet modeling. However, its rigid architectural limitations—requiring the lookup key to exist in the leftmost column, using brittle static integer column indices, and defaulting dangerously to approximate match—created countless production errors in corporate supply chains.</p>
    
    <div class="architecture-grid">
      <div class="arch-box">
        <h4>Decoupled Vector Architecture</h4>
        <p>Modern lookup functions decouple the lookup vector from the return vector. Inserting, deleting, or reordering columns never breaks an <code>XLOOKUP</code> or <code>INDEX/MATCH</code> formula.</p>
      </div>
      <div class="arch-box">
        <h4>Exact Match by Default</h4>
        <p>Unlike <code>VLOOKUP</code> which defaults to approximate matching (often returning silent false matches), <code>XLOOKUP</code> defaults to exact match (<code>match_mode = 0</code>).</p>
      </div>
      <div class="arch-box">
        <h4>Bidirectional Traversal</h4>
        <p>Modern lookups can scan leftward, rightward, upward, and downward, freeing financial and supply-chain models from artificial layout constraints.</p>
      </div>
    </div>

    <div class="table-responsive">
      <table class="reference-table">
        <thead>
          <tr>
            <th>Lookup Engine</th>
            <th>Canonical Syntax</th>
            <th>Leftward Lookup?</th>
            <th>Column Insertion Resilient?</th>
            <th>Default Match Type</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>=XLOOKUP()</code></td>
            <td><code>=XLOOKUP(val, lookup_arr, return_arr, [if_not_found], [match_mode], [search_mode])</code></td>
            <td><strong style="color: #34d399;">Yes (Native)</strong></td>
            <td><strong style="color: #34d399;">Yes (Vector-based)</strong></td>
            <td>Exact Match (0)</td>
          </tr>
          <tr>
            <td><code>=INDEX(MATCH())</code></td>
            <td><code>=INDEX(return_range, MATCH(val, lookup_range, 0))</code></td>
            <td><strong style="color: #34d399;">Yes (Native)</strong></td>
            <td><strong style="color: #34d399;">Yes (Coordinate-based)</strong></td>
            <td>Requires explicit 0</td>
          </tr>
          <tr>
            <td><code>=VLOOKUP()</code> (Legacy)</td>
            <td><code>=VLOOKUP(val, table_array, col_index, [range_lookup])</code></td>
            <td><span style="color: #f87171;">No (Left-column only)</span></td>
            <td><span style="color: #f87171;">No (Hardcoded index breaks)</span></td>
            <td>Approximate (TRUE)</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="keynote-box keynote-emerald">
      <strong>Senior Analyst Takeaway:</strong> In enterprise B2B catalogs like PrimeDistro, schemas change frequently. Hardcoded column offsets like <code>VLOOKUP(A2, Master!A:Z, 5, FALSE)</code> are ticking time-bombs. Whenever a column is inserted, offset 5 silently points to the wrong attribute. Always use decoupled vector lookups.
    </div>

    <div class="anti-pattern-card">
      <div class="anti-pattern-title">⚠️ Anti-Pattern vs. Gold Standard</div>
      <div class="anti-pattern-body">
        <p><strong>Brittle Legacy Pattern:</strong> <code>=VLOOKUP(B2, Vendor_Master!A:G, 2, FALSE)</code><br>
        <em>If an auditor inserts a "Vendor_Tax_ID" column between columns A and B, this formula silently returns the Tax ID instead of Vendor Name.</em></p>
        <p><strong>Resilient Gold Standard:</strong> <code>=XLOOKUP(Purchase_Orders!B2, Vendor_Master!A2:A9, Vendor_Master!B2:B9)</code><br>
        <em>Directly references the target columns as independent range vectors, remaining 100% immune to structural sheet alterations.</em></p>
      </div>
    </div>
  </div>
</section>

<section class="slide-section" id="sec02">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingCoreXlookup">
    <span class="heading-num-box">02</span>
    <span class="heading-title-box">
      <span class="heading-icon">🎯</span>
      <span class="heading-title-text">Core XLOOKUP Mechanics: Exact Match & Resilient Column Mapping</span>
      <button class="audio-play-btn" data-track-idx="1" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p class="lead-text">Introduced in Microsoft 365, <code>XLOOKUP</code> simplifies reference modeling into three core arguments: what to find (<code>lookup_value</code>), where to look (<code>lookup_array</code>), and what to return (<code>return_array</code>).</p>

    <div class="architecture-grid">
      <div class="arch-box">
        <h4>1. Lookup Value</h4>
        <p>The single value, cell reference, or evaluated expression to search for across the lookup array.</p>
      </div>
      <div class="arch-box">
        <h4>2. Lookup Array</h4>
        <p>A single 1D vector (row or column) containing candidate keys to match against.</p>
      </div>
      <div class="arch-box">
        <h4>3. Return Array</h4>
        <p>The 1D or 2D range containing the values to extract at the matched index position.</p>
      </div>
    </div>

    <div class="table-responsive">
      <table class="reference-table">
        <thead>
          <tr>
            <th>Argument</th>
            <th>Type</th>
            <th>Default Behavior</th>
            <th>Production Best Practice</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>lookup_value</code></td>
            <td>Required</td>
            <td>Value to locate</td>
            <td>Reference source transaction cell (e.g., <code>Purchase_Orders!B2</code>)</td>
          </tr>
          <tr>
            <td><code>lookup_array</code></td>
            <td>Required</td>
            <td>Range to inspect</td>
            <td>Bound to exact master key range (e.g., <code>Vendor_Master!A2:A9</code>)</td>
          </tr>
          <tr>
            <td><code>return_array</code></td>
            <td>Required</td>
            <td>Range to retrieve from</td>
            <td>Equal dimension to lookup array (e.g., <code>Vendor_Master!B2:B9</code>)</td>
          </tr>
          <tr>
            <td><code>[if_not_found]</code></td>
            <td>Optional</td>
            <td>Returns <code>#N/A</code></td>
            <td>Provide explicit fallback string or 0 to guard downstream formulas</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="keynote-box keynote-emerald">
      <strong>Performance Optimization:</strong> Avoid referencing entire million-row columns like <code>A:A</code> in high-volume production sheets. Restricting vectors to populated ranges (e.g., <code>A2:A10000</code>) reduces memory footprint by up to 85% during dependency graph recalculation.
    </div>
  </div>
</section>

<section class="slide-section" id="sec03">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingReverseLookup">
    <span class="heading-num-box">03</span>
    <span class="heading-title-box">
      <span class="heading-icon">🔄</span>
      <span class="heading-title-text">Reverse & Leftward Lookups: Breaking Free from the Left-Column Trap</span>
      <button class="audio-play-btn" data-track-idx="2" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p class="lead-text">One of the most frustrating limitations of legacy spreadsheets was the inability to look up a value based on a column to the right and return an attribute to its left. Analysts previously had to duplicate columns or write convoluted workarounds.</p>

    <div class="architecture-grid">
      <div class="arch-box">
        <h4>Native Leftward Extraction</h4>
        <p>Because <code>XLOOKUP</code> passes separate vectors, <code>return_array</code> can physically precede <code>lookup_array</code> in column order without penalties.</p>
      </div>
      <div class="arch-box">
        <h4>Classic INDEX/MATCH Parity</h4>
        <p>The classic <code>INDEX(ReturnCol, MATCH(Key, SearchCol, 0))</code> was the historical standard for reverse lookups and remains universally supported across all spreadsheet engines.</p>
      </div>
      <div class="arch-box">
        <h4>Zero Data Duplication</h4>
        <p>Master catalogs never need helper columns created solely to place primary keys on the far left of the sheet.</p>
      </div>
    </div>

    <div class="anti-pattern-card">
      <div class="anti-pattern-title">⚠️ Supply Chain Operational Example</div>
      <div class="anti-pattern-body">
        <p><strong>Requirement:</strong> A warehouse clerk knows the Vendor Name ("ThermalGrid HVAC") and must retrieve the Vendor ID ("VND-105") located to its left.</p>
        <p><strong>XLOOKUP Syntax:</strong> <code>=XLOOKUP("ThermalGrid HVAC", Vendor_Master!B2:B9, Vendor_Master!A2:A9)</code></p>
        <p><strong>INDEX/MATCH Syntax:</strong> <code>=INDEX(Vendor_Master!A2:A9, MATCH("Precision Tooling", Vendor_Master!B2:B9, 0))</code></p>
      </div>
    </div>
  </div>
</section>

<section class="slide-section" id="sec04">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingMissingData">
    <span class="heading-num-box">04</span>
    <span class="heading-title-box">
      <span class="heading-icon">🛡️</span>
      <span class="heading-title-text">Graceful Missing Data: Built-in [if_not_found] & IFNA Trapping</span>
      <button class="audio-play-btn" data-track-idx="3" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p class="lead-text">When a lookup key does not exist in the master table, Excel raises a <code>#N/A</code> ("Not Available") error. In enterprise financial and inventory models, raw errors stop executive aggregation models dead in their tracks.</p>

    <div class="table-responsive">
      <table class="reference-table">
        <thead>
          <tr>
            <th>Guard Strategy</th>
            <th>Syntax Example</th>
            <th>Error Types Caught</th>
            <th>Recommendation</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Native <code>XLOOKUP</code> 4th Arg</td>
            <td><code>=XLOOKUP("VND-999", Master!A2:A9, Master!F2:F9, "Vendor Not Onboarded")</code></td>
            <td>Missing Key Only (<code>#N/A</code>)</td>
            <td><strong style="color: #34d399;">Preferred: Cleanest & fastest</strong></td>
          </tr>
          <tr>
            <td>Surgical <code>IFNA()</code> Wrapper</td>
            <td><code>=IFNA(XLOOKUP("VND-888", Master!A2:A9, Master!F2:F9), "procurement@primedistro.com")</code></td>
            <td>Only <code>#N/A</code></td>
            <td><strong style="color: #34d399;">Excellent for legacy INDEX/MATCH</strong></td>
          </tr>
          <tr>
            <td>Universal <code>IFERROR()</code> Wrapper</td>
            <td><code>=IFERROR(INDEX(...), "Fallback")</code></td>
            <td>All errors (<code>#REF!</code>, <code>#VALUE!</code>, <code>#DIV/0!</code>, <code>#N/A</code>)</td>
            <td><span style="color: #fbbf24;">Use with caution (can mask syntax bugs)</span></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="keynote-box keynote-emerald">
      <strong>Architect Rule:</strong> Prefer <code>IFNA()</code> over <code>IFERROR()</code> when wrapping lookup operations. <code>IFERROR()</code> catches broken range references (<code>#REF!</code>) and typographical function errors (<code>#NAME?</code>), masking structural modeling bugs under innocent fallback values.
    </div>
  </div>
</section>

<section class="slide-section" id="sec05">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingWildcardLookups">
    <span class="heading-num-box">05</span>
    <span class="heading-title-box">
      <span class="heading-icon">🃏</span>
      <span class="heading-title-text">Wildcard Lookups (* and ?) for Partial SKU & Vendor Search</span>
      <button class="audio-play-btn" data-track-idx="4" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p class="lead-text">Real-world inventory clerks rarely memorize exact eight-digit SKU codes or legal corporate vendor entities. Excel provides wildcard matching characters to locate records using partial string fragments.</p>

    <div class="architecture-grid">
      <div class="arch-box">
        <h4>Asterisk (<code>*</code>)</h4>
        <p>Matches any sequence of zero or more characters. <code>"*Steel*"</code> matches "Titan Heavy Steel", "Steel Dynamics", or "Stainless Steel Co".</p>
      </div>
      <div class="arch-box">
        <h4>Question Mark (<code>?</code>)</h4>
        <p>Matches exactly one single character. <code>"PO-90??"</code> matches "PO-9001" and "PO-9022", but rejects "PO-90001".</p>
      </div>
      <div class="arch-box">
        <h4>Match Mode 2 in XLOOKUP</h4>
        <p>By default, <code>XLOOKUP</code> treats wildcards as literal characters. To enable wildcard pattern matching, you must explicitly set <code>match_mode = 2</code>.</p>
      </div>
    </div>

    <div class="table-responsive">
      <table class="reference-table">
        <thead>
          <tr>
            <th>Formula</th>
            <th>Search Pattern</th>
            <th>Match Mode</th>
            <th>Resolved Result</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>=XLOOKUP("*Steel*", Vendor_Master!B2:B9, Vendor_Master!A2:A9, "Not Found", 2)</code></td>
            <td>Contains "Steel"</td>
            <td>2 (Wildcard)</td>
            <td><code>"VND-102"</code></td>
          </tr>
          <tr>
            <td><code>=INDEX(Vendor_Master!C2:C9, MATCH("*Electric*", Vendor_Master!B2:B9, 0))</code></td>
            <td>Contains "Electric"</td>
            <td>0 (MATCH enables wildcards automatically)</td>
            <td><code>3</code></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</section>

<section class="slide-section" id="sec06">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingApproxLookups">
    <span class="heading-num-box">06</span>
    <span class="heading-title-box">
      <span class="heading-icon">📈</span>
      <span class="heading-title-text">Approximate Range Lookups: Match Modes -1 and 1 for Tiered Volume Pricing</span>
      <button class="audio-play-btn" data-track-idx="5" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p class="lead-text">Wholesale B2B distribution relies heavily on quantity discount tiers: ordering 450 units should qualify for the 100-unit tier (5% discount) without needing an exact entry for every single integer between 100 and 499.</p>

    <div class="architecture-grid">
      <div class="arch-box">
        <h4>Match Mode -1: Exact or Next Smaller</h4>
        <p>Searches for exact match; if not found, drops down to the next smaller value in the threshold scale. <strong>Standard for volume discounts, tax brackets, and SLA credit tiers.</strong></p>
      </div>
      <div class="arch-box">
        <h4>Match Mode 1: Exact or Next Larger</h4>
        <p>Searches for exact match; if not found, steps up to the next larger value. Standard for shipping crate capacity thresholds and minimum container loadings.</p>
      </div>
      <div class="arch-box">
        <h4>Sorting Independence</h4>
        <p>While legacy <code>VLOOKUP(..., TRUE)</code> crashed or returned wrong answers if the threshold table was not sorted ascending, <code>XLOOKUP</code> with mode <code>-1</code> handles search robustly.</p>
      </div>
    </div>

    <div class="table-responsive">
      <table class="reference-table">
        <thead>
          <tr>
            <th>Order Quantity</th>
            <th>Thresholds (Min Units)</th>
            <th>Match Mode</th>
            <th>Selected Tier</th>
            <th>Discount %</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>450 Units</td>
            <td>0, 100, 500, 1000, 2500</td>
            <td><code>-1</code></td>
            <td>100 Units</td>
            <td>5% (0.05)</td>
          </tr>
          <tr>
            <td>1200 Units</td>
            <td>0, 100, 500, 1000, 2500</td>
            <td><code>-1</code></td>
            <td>1000 Units</td>
            <td>15% (0.15)</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</section>

<section class="slide-section" id="sec07">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingIndexMatch">
    <span class="heading-num-box">07</span>
    <span class="heading-title-box">
      <span class="heading-icon">🧩</span>
      <span class="heading-title-text">Classic Power Duo: INDEX and MATCH Fundamentals</span>
      <button class="audio-play-btn" data-track-idx="6" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p class="lead-text">Even with <code>XLOOKUP</code> available, <code>INDEX</code> and <code>MATCH</code> remains the undisputed heavyweight champion in legacy enterprise workbooks, financial institutions, and complex multi-dimensional matrix models.</p>

    <div class="architecture-grid">
      <div class="arch-box">
        <h4><code>MATCH(lookup_val, lookup_range, 0)</code></h4>
        <p>Scans a 1D range and returns the relative 1-based numerical index position of the matched item. It does not return the data; it returns the coordinate.</p>
      </div>
      <div class="arch-box">
        <h4><code>INDEX(range, row_num, [col_num])</code></h4>
        <p>Accepts a range and retrieves the value sitting at the specified row and column coordinate intersection. Fast, lightweight, and mathematically pure.</p>
      </div>
      <div class="arch-box">
        <h4>The Modular Advantage</h4>
        <p>Because the coordinate finding is decoupled from value retrieval, you can inspect, debug, and reuse the <code>MATCH()</code> offset independently across multiple formulas.</p>
      </div>
    </div>
  </div>
</section>

<section class="slide-section" id="sec08">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingTwoWayLookup">
    <span class="heading-num-box">08</span>
    <span class="heading-title-box">
      <span class="heading-icon">📐</span>
      <span class="heading-title-text">Two-Way Matrix Lookups: Intersecting Dynamic Rows and Columns</span>
      <button class="audio-play-btn" data-track-idx="7" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p class="lead-text">In B2B logistics, rates are rarely 1D lists. Freight surcharges are structured as 2D matrices where rows represent product categories (Plumbing, Electrical, HVAC) and columns represent delivery regions (North, South, East, West, Central).</p>

    <div class="anti-pattern-card">
      <div class="anti-pattern-title">📐 The 2D Coordinate Intersection Formula</div>
      <div class="anti-pattern-body">
        <p><code>=INDEX(MatrixRange, MATCH(RowKey, RowHeaderRange, 0), MATCH(ColKey, ColHeaderRange, 0))</code></p>
        <p><strong>Step 1 (Row Offset):</strong> <code>MATCH("Plumbing", Vendor_Master!L2:L6, 0)</code> returns row offset <strong>1</strong>.</p>
        <p><strong>Step 2 (Column Offset):</strong> <code>MATCH("South", Vendor_Master!M1:Q1, 0)</code> returns column offset <strong>2</strong>.</p>
        <p><strong>Step 3 (Intersection):</strong> <code>INDEX(Vendor_Master!M2:Q6, 1, 2)</code> retrieves <strong>$60.00</strong>.</p>
      </div>
    </div>
  </div>
</section>

<section class="slide-section" id="sec09">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingHlookup">
    <span class="heading-num-box">09</span>
    <span class="heading-title-box">
      <span class="heading-icon">↔️</span>
      <span class="heading-title-text">Horizontal Referencing: HLOOKUP & Modern Transposed Lookups</span>
      <button class="audio-play-btn" data-track-idx="8" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p class="lead-text">While 90% of business datasets are organized vertically (records in rows), executive financial summaries, quarterly schedules, and attribute specifications frequently run horizontally across columns.</p>

    <div class="architecture-grid">
      <div class="arch-box">
        <h4><code>=HLOOKUP()</code> Mechanics</h4>
        <p>Scans the top row of a horizontal table for the lookup key, then moves downward to the specified 1-based row index to retrieve the value.</p>
      </div>
      <div class="arch-box">
        <h4>Modern XLOOKUP Horizontal Parity</h4>
        <p>Because <code>XLOOKUP</code> accepts any 1D vector, passing horizontal row vectors (e.g., <code>XLOOKUP(Key, T1:Z1, T2:Z2)</code>) completely replaces legacy <code>HLOOKUP</code> without row-index counting.</p>
      </div>
    </div>
  </div>
</section>

<section class="slide-section" id="sec10">
  <h2 class="slide-section-title heading-box-wrap heading-with-audio" id="headingMultiCriteria">
    <span class="heading-num-box">10</span>
    <span class="heading-title-box">
      <span class="heading-icon">⚡</span>
      <span class="heading-title-text">Multi-Criteria Compound Lookups: Boolean Array Referencing</span>
      <button class="audio-play-btn" data-track-idx="9" disabled title="Audio narration coming soon">▶</button>
    </span>
  </h2>
  <div class="theory-card">
    <p class="lead-text">In enterprise procurement, you often need to locate a record satisfying multiple simultaneous conditions—for example, finding the supplier who is both a <strong>Tier 1 Preferred Vendor</strong> AND based in the <strong>North Distribution Hub</strong>.</p>

    <div class="architecture-grid">
      <div class="arch-box">
        <h4>The Boolean Multiplication Technique</h4>
        <p>Multiplying two conditional arrays <code>(Vendor_Master!E2:E9="Tier 1") * (Vendor_Master!G2:G9="North")</code> produces a vector of 1s and 0s where 1 represents rows meeting both criteria.</p>
      </div>
      <div class="arch-box">
        <h4>Targeting 1 with XLOOKUP</h4>
        <p>Supplying <code>1</code> as the lookup value: <code>=XLOOKUP(1, (Crit1)*(Crit2), ReturnRange)</code> instantly isolates the exact row satisfying all constraints without creating helper columns.</p>
      </div>
    </div>

    <div class="keynote-box keynote-emerald">
      <strong>Enterprise Standard:</strong> In high-speed analytics, boolean array lookups eliminate the need for clumsy concatenated helper columns (e.g., <code>=E2&"-"&G2</code>), preserving pristine relational schemas while maintaining instant auditability.
    </div>
  </div>
</section>
`
    }
  ],
  initialWorkbook: {
    Purchase_Orders: [
      ["PO_Number", "Vendor_ID", "SKU", "Category", "Units_Ordered", "Unit_List_Price", "Total_Gross", "Delivery_Region", "Payment_Terms", "Order_Status"],
      ["PO-9001", "VND-101", "SKU-FA-101", "Fasteners", 500, 15.00, 7500.00, "North", "Net 30", "Completed"],
      ["PO-9002", "VND-102", "SKU-ST-204", "Structural", 120, 250.00, 30000.00, "Central", "Net 60", "In Transit"],
      ["PO-9003", "VND-103", "SKU-EL-305", "Electrical", 850, 35.00, 29750.00, "East", "2/10 Net 30", "Delivered"],
      ["PO-9004", "VND-104", "SKU-PL-408", "Plumbing", 200, 45.00, 9000.00, "South", "Net 30", "Pending"],
      ["PO-9005", "VND-105", "SKU-HV-502", "HVAC", 40, 650.00, 26000.00, "West", "Net 45", "Processing"],
      ["PO-9006", "VND-106", "SKU-OM-601", "Packaging", 1200, 8.50, 10200.00, "West", "2/10 Net 30", "Completed"],
      ["PO-9007", "VND-107", "SKU-PT-703", "Tooling", 65, 180.00, 11700.00, "North", "Net 60", "Delivered"],
      ["PO-9008", "VND-108", "SKU-GP-802", "Polymers", 350, 55.00, 19250.00, "South", "Net 30", "In Transit"],
      ["PO-9009", "VND-101", "SKU-FA-102", "Fasteners", 2800, 12.00, 33600.00, "East", "Net 30", "Completed"],
      ["PO-9010", "VND-103", "SKU-EL-308", "Electrical", 450, 75.00, 33750.00, "Central", "2/10 Net 30", "Pending"],
      ["PO-9011", "VND-104", "SKU-PL-412", "Plumbing", 600, 38.00, 22800.00, "North", "Net 30", "Processing"],
      ["PO-9012", "VND-105", "SKU-HV-509", "HVAC", 15, 1200.00, 18000.00, "East", "Net 45", "Completed"],
      ["PO-9013", "VND-102", "SKU-ST-210", "Structural", 80, 420.00, 33600.00, "South", "Net 60", "In Transit"],
      ["PO-9014", "VND-106", "SKU-OM-605", "Packaging", 2200, 6.00, 13200.00, "Central", "2/10 Net 30", "Delivered"],
      ["PO-9015", "VND-107", "SKU-PT-708", "Tooling", 90, 210.00, 18900.00, "West", "Net 60", "Processing"],
      ["PO-9016", "VND-108", "SKU-GP-806", "Polymers", 1100, 48.00, 52800.00, "North", "Net 30", "Completed"],
      ["PO-9017", "VND-101", "SKU-FA-109", "Fasteners", 1500, 18.50, 27750.00, "West", "Net 30", "Delivered"],
      ["PO-9018", "VND-103", "SKU-EL-315", "Electrical", 320, 95.00, 30400.00, "South", "2/10 Net 30", "In Transit"],
      ["PO-9019", "VND-104", "SKU-PL-420", "Plumbing", 750, 52.00, 39000.00, "East", "Net 30", "Completed"],
      ["PO-9020", "VND-105", "SKU-HV-515", "HVAC", 50, 890.00, 44500.00, "Central", "Net 45", "Processing"],
      ["PO-9021", "VND-102", "SKU-ST-225", "Structural", 210, 310.00, 65100.00, "North", "Net 60", "Delivered"],
      ["PO-9022", "VND-108", "SKU-GP-810", "Polymers", 400, 62.00, 24800.00, "West", "Net 30", "Pending"]
    ],
    Vendor_Master: [
      ["Vendor_ID", "Vendor_Name", "Lead_Time_Days", "Quality_Rating", "Preferred_Tier", "Support_Contact", "Primary_Hub", "", "Min_Units", "Discount_Pct", "", "Category", "North", "South", "East", "West", "Central", "", "Metric", "VND-101", "VND-102", "VND-103", "VND-104", "VND-105", "VND-106", "VND-107"],
      ["VND-101", "Apex Fasteners", 5, 0.98, "Tier 1", "contact@apexfasteners.com", "North", "", 0, 0.00, "", "Plumbing", 45, 60, 50, 75, 40, "", "Credit_Limit", 50000, 120000, 75000, 60000, 45000, 90000, 35000],
      ["VND-102", "Titan Heavy Steel", 12, 0.94, "Tier 2", "orders@titansteel.com", "Central", "", 100, 0.05, "", "Structural", 120, 140, 130, 180, 110, "", "Payment_Terms", "Net 30", "Net 60", "2/10 Net 30", "Net 30", "Net 45", "2/10 Net 30", "Net 60"],
      ["VND-103", "VoltCore Electric", 3, 0.99, "Tier 1", "sales@voltcore.com", "East", "", 500, 0.10, "", "Electrical", 35, 45, 30, 55, 40, "", "Safety_Stock_Weeks", 4, 8, 3, 6, 7, 4, 9],
      ["VND-104", "AquaFlow Pipe Co", 7, 0.95, "Tier 2", "service@aquaflow.com", "South", "", 1000, 0.15, "", "Fasteners", 25, 30, 25, 40, 20, "", "", "", "", "", "", "", "", ""],
      ["VND-105", "ThermalGrid HVAC", 10, 0.92, "Tier 3", "dispatch@thermalgrid.com", "Central", "", 2500, 0.20, "", "HVAC", 80, 95, 85, 115, 75, "", "", "", "", "", "", "", "", ""],
      ["VND-106", "OmniPack Industrial", 4, 0.97, "Tier 1", "support@omnipack.com", "West", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
      ["VND-107", "Precision Tooling", 14, 0.91, "Tier 3", "procure@precisiontooling.com", "North", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
      ["VND-108", "Global Polymer", 8, 0.96, "Tier 2", "orders@globalpolymer.com", "South", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]
    ],
    Lookup_Workspace: [
      ["Analysis_Challenge", "Calculated_Value"],
      ["C01: Vendor Name for PO-9001 (XLOOKUP Exact)", ""],
      ["C02: Lead Time for Vendor VND-104 (XLOOKUP)", ""],
      ["C03: Reverse Lookup - Vendor ID for 'ThermalGrid HVAC' (XLOOKUP Right-to-Left)", ""],
      ["C04: Reverse Lookup - Vendor ID for 'Precision Tooling' (INDEX/MATCH)", ""],
      ["C05: Vendor Support Email with Fallback (XLOOKUP [if_not_found])", ""],
      ["C06: Credit Limit via Horizontal Lookup (HLOOKUP)", ""],
      ["C07: Wildcard Match - Vendor ID for '*Steel*' (XLOOKUP Mode 2)", ""],
      ["C08: Wildcard Match - Lead Time for '*Electric*' (INDEX/MATCH Wildcard)", ""],
      ["C09: Volume Discount Tier for 450 Units (XLOOKUP Mode -1)", ""],
      ["C10: Volume Discount Tier for PO-9006 Units (XLOOKUP Mode -1)", ""],
      ["C11: Two-Way Matrix Freight - Plumbing in South Region (2D INDEX/MATCH)", ""],
      ["C12: Two-Way Matrix Freight - HVAC in West Region (2D INDEX/MATCH)", ""],
      ["C13: Two-Way Matrix Freight - Electrical in Central Region (2D INDEX/MATCH)", ""],
      ["C14: Multi-Criteria Lookup - Quality Rating for VND-103 in East Hub (Boolean Array)", ""],
      ["C15: Multi-Criteria Lookup - Vendor Name for Tier 1 in North Hub (Boolean Array)", ""],
      ["C16: Two-Way Dynamic Lookup - Quality Rating for VND-101 (INDEX / MATCH Row & Col)", ""],
      ["C17: Net Unit Cost After Volume Discount for PO-9001", ""],
      ["C18: Total Landed Freight Cost for PO-9001 (Gross + Units * Surcharge)", ""],
      ["C19: Resilient Vendor Contact Pull with IFNA Wrapper", ""],
      ["C20: Strategic Priority Order Qualification (AND + XLOOKUP + IF)", ""]
    ]
  },
  initialAuxiliary: {},
  challenges: [
    {
      id: "c01",
      number: 1,
      title: "Vendor Name Retrieval via Exact XLOOKUP",
      difficulty: "easy",
      bloom: "apply",
      prompt: "To resolve vendor operational trade names for incoming purchase order processing, in sheet <code>Lookup_Workspace</code> cell <strong>B2</strong>, write an exact vector lookup formula using <code>=XLOOKUP()</code> to match Purchase Order PO-9001 Vendor ID in <code>Purchase_Orders!B2</code> against master IDs in <code>Vendor_Master!A2:A9</code> and return the corresponding Vendor Name from <code>Vendor_Master!B2:B9</code>.",
      targetSheet: "Lookup_Workspace",
      targetCell: "B2",
      solution: '=XLOOKUP(Purchase_Orders!B2, Vendor_Master!A2:A9, Vendor_Master!B2:B9)',
      expectedFormulaPrefix: "=XLOOKUP",
      expectedValue: "Apex Fasteners",
      tolerance: 0,
      hint: "Apply =XLOOKUP(Purchase_Orders!B2, Vendor_Master!A2:A9, Vendor_Master!B2:B9) to extract the supplier name using exact vector matching.",
      commonMistakes: [
        { pattern: "VLOOKUP", message: "Use modern XLOOKUP for decoupled vector matching." }
      ],
      check: {
        expected: "Apex Fasteners",
        tolerance: 0,
        mustUseAnyOf: [["XLOOKUP"]],
        mustReference: ["Purchase_Orders!B2", "Vendor_Master!A2:A9", "Vendor_Master!B2:B9"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["B"],
        params: [],
        previewRows: 1,
        summary: "Extracts vendor name for PO-9001 using modern exact XLOOKUP."
      }
    },
    {
      id: "c02",
      number: 2,
      title: "Vendor Lead Time Lookup via XLOOKUP",
      difficulty: "easy",
      bloom: "apply",
      prompt: "To determine fulfillment turnaround lead time for inventory reorder planning, in sheet <code>Lookup_Workspace</code> cell <strong>B3</strong>, write a lookup formula using <code>=XLOOKUP()</code> to query Vendor ID \"VND-104\" in master column <code>Vendor_Master!A2:A9</code> and return contracted Lead Time in days from <code>Vendor_Master!C2:C9</code>.",
      targetSheet: "Lookup_Workspace",
      targetCell: "B3",
      solution: '=XLOOKUP("VND-104", Vendor_Master!A2:A9, Vendor_Master!C2:C9)',
      expectedFormulaPrefix: "=XLOOKUP",
      expectedValue: 7,
      tolerance: 0,
      hint: "Query =XLOOKUP(\"VND-104\", Vendor_Master!A2:A9, Vendor_Master!C2:C9) to find the vendor's fulfillment turnaround.",
      commonMistakes: [
        { pattern: "VLOOKUP", message: "Use XLOOKUP to directly reference target vectors." }
      ],
      check: {
        expected: 7,
        tolerance: 0,
        mustUseAnyOf: [["XLOOKUP"]],
        mustReference: ["Vendor_Master!A2:A9", "Vendor_Master!C2:C9"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["A", "C"],
        params: [],
        previewRows: 1,
        summary: "Pulls operational lead time in days for vendor VND-104."
      }
    },
    {
      id: "c03",
      number: 3,
      title: "Right-to-Left Reverse Lookup (XLOOKUP)",
      difficulty: "easy",
      bloom: "apply",
      prompt: "To perform a reverse leftward lookup resolving company trade names back to master primary key IDs without schema redesign, in sheet <code>Lookup_Workspace</code> cell <strong>B4</strong>, write a reverse lookup formula using <code>=XLOOKUP()</code> searching supplier name \"ThermalGrid HVAC\" in <code>Vendor_Master!B2:B9</code> and returning the Vendor ID from leftward column <code>Vendor_Master!A2:A9</code>.",
      targetSheet: "Lookup_Workspace",
      targetCell: "B4",
      solution: '=XLOOKUP("ThermalGrid HVAC", Vendor_Master!B2:B9, Vendor_Master!A2:A9)',
      expectedFormulaPrefix: "=XLOOKUP",
      expectedValue: "VND-105",
      tolerance: 0,
      hint: "Pass Vendor_Master!B2:B9 as the lookup array and Vendor_Master!A2:A9 as the return array in =XLOOKUP().",
      commonMistakes: [
        { pattern: "VLOOKUP", message: "VLOOKUP cannot look leftward without helper tables. Use XLOOKUP." }
      ],
      check: {
        expected: "VND-105",
        tolerance: 0,
        mustUseAnyOf: [["XLOOKUP"]],
        mustReference: ["Vendor_Master!B2:B9", "Vendor_Master!A2:A9"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["A", "B"],
        params: [],
        previewRows: 1,
        summary: "Executes leftward reverse lookup from vendor name to vendor code."
      }
    },
    {
      id: "c04",
      number: 4,
      title: "Right-to-Left Reverse Lookup (INDEX/MATCH)",
      difficulty: "easy",
      bloom: "apply",
      prompt: "To execute a reverse lookup using classic spreadsheet coordinate architecture for legacy model compatibility, in sheet <code>Lookup_Workspace</code> cell <strong>B5</strong>, write a reverse coordinate formula using <code>=INDEX()</code> and <code>=MATCH()</code> indexing Vendor ID column <code>Vendor_Master!A2:A9</code> and matching supplier name \"Precision Tooling\" with exact match type <code>0</code> in <code>Vendor_Master!B2:B9</code>.",
      targetSheet: "Lookup_Workspace",
      targetCell: "B5",
      solution: '=INDEX(Vendor_Master!A2:A9, MATCH("Precision Tooling", Vendor_Master!B2:B9, 0))',
      expectedFormulaPrefix: "=INDEX",
      expectedValue: "VND-107",
      tolerance: 0,
      hint: "Nest MATCH inside INDEX: =INDEX(Vendor_Master!A2:A9, MATCH(\"Precision Tooling\", Vendor_Master!B2:B9, 0)).",
      commonMistakes: [
        { pattern: "XLOOKUP", message: "This challenge specifically tests the classic INDEX/MATCH reverse lookup pattern." }
      ],
      check: {
        expected: "VND-107",
        tolerance: 0,
        mustUseAnyOf: [["INDEX"], ["MATCH"]],
        mustReference: ["Vendor_Master!A2:A9", "Vendor_Master!B2:B9"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["A", "B"],
        params: [],
        previewRows: 1,
        summary: "Implements classic universal INDEX/MATCH reverse lookup."
      }
    },
    {
      id: "c05",
      number: 5,
      title: "Missing Vendor Error Guard (XLOOKUP [if_not_found])",
      difficulty: "easy",
      bloom: "apply",
      prompt: "To look up vendor support contact channels while preventing #N/A error propagation across procurement dashboards, in sheet <code>Lookup_Workspace</code> cell <strong>B6</strong>, write an error-tolerant lookup formula using <code>=XLOOKUP()</code> searching unlisted Vendor ID \"VND-999\" in <code>Vendor_Master!A2:A9</code> returning email from <code>Vendor_Master!F2:F9</code>, and setting the 4th parameter <code>[if_not_found]</code> to fallback string \"Vendor Not Onboarded\".",
      targetSheet: "Lookup_Workspace",
      targetCell: "B6",
      solution: '=XLOOKUP("VND-999", Vendor_Master!A2:A9, Vendor_Master!F2:F9, "Vendor Not Onboarded")',
      expectedFormulaPrefix: "=XLOOKUP",
      expectedValue: "Vendor Not Onboarded",
      tolerance: 0,
      hint: "Set the 4th argument of =XLOOKUP(\"VND-999\", Vendor_Master!A2:A9, Vendor_Master!F2:F9, \"Vendor Not Onboarded\").",
      commonMistakes: [
        { pattern: "IFERROR", message: "Use XLOOKUP's built-in 4th argument [if_not_found] instead of an external IFERROR." }
      ],
      check: {
        expected: "Vendor Not Onboarded",
        tolerance: 0,
        mustUseAnyOf: [["XLOOKUP"]],
        mustReference: ["Vendor_Master!A2:A9", "Vendor_Master!F2:F9"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["A", "F"],
        params: [],
        previewRows: 1,
        summary: "Traps missing vendor key natively inside XLOOKUP argument 4."
      }
    },
    {
      id: "c06",
      number: 6,
      title: "Horizontal Catalog Lookup via HLOOKUP",
      difficulty: "easy",
      bloom: "apply",
      prompt: "To audit supplier credit terms stored across horizontally transposed accounting matrices, in sheet <code>Lookup_Workspace</code> cell <strong>B7</strong>, write a horizontal lookup formula using <code>=HLOOKUP()</code> to find Vendor ID \"VND-102\" across horizontal table range <code>Vendor_Master!T1:Z4</code>, returning row index <code>2</code> with exact match parameter <code>FALSE</code>.",
      targetSheet: "Lookup_Workspace",
      targetCell: "B7",
      solution: '=HLOOKUP("VND-102", Vendor_Master!T1:Z4, 2, FALSE)',
      expectedFormulaPrefix: "=HLOOKUP",
      expectedValue: 120000,
      tolerance: 0,
      hint: "Traverse horizontal columns with =HLOOKUP(\"VND-102\", Vendor_Master!T1:Z4, 2, FALSE).",
      commonMistakes: [
        { pattern: "VLOOKUP", message: "Data headers run horizontally across columns T through Z; use HLOOKUP." }
      ],
      check: {
        expected: 120000,
        tolerance: 0,
        mustUseAnyOf: [["HLOOKUP"]],
        mustReference: ["Vendor_Master!T1:Z4"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["T", "Z"],
        params: [],
        previewRows: 1,
        summary: "Retrieves credit limit attribute from horizontal matrix layout."
      }
    },
    {
      id: "c07",
      number: 7,
      title: "Wildcard Substring Search via XLOOKUP (Match Mode 2)",
      difficulty: "medium",
      bloom: "analyze",
      prompt: "To locate vendor identification codes when only a partial supplier trade name is known, in sheet <code>Lookup_Workspace</code> cell <strong>B8</strong>, write a wildcard pattern matching lookup using <code>=XLOOKUP()</code> searching wildcard substring \"*Steel*\" in <code>Vendor_Master!B2:B9</code>, returning Vendor ID from <code>Vendor_Master!A2:A9</code>, with fallback \"Not Found\" and match mode <code>2</code>.",
      targetSheet: "Lookup_Workspace",
      targetCell: "B8",
      solution: '=XLOOKUP("*Steel*", Vendor_Master!B2:B9, Vendor_Master!A2:A9, "Not Found", 2)',
      expectedFormulaPrefix: "=XLOOKUP",
      expectedValue: "VND-102",
      tolerance: 0,
      hint: "Supply match_mode 2 in argument 5: =XLOOKUP(\"*Steel*\", Vendor_Master!B2:B9, Vendor_Master!A2:A9, \"Not Found\", 2).",
      commonMistakes: [
        { pattern: ",\\s*0\\s*\\)", message: "Mode 0 is exact match; use mode 2 to activate wildcard pattern recognition." }
      ],
      check: {
        expected: "VND-102",
        tolerance: 0,
        mustUseAnyOf: [["XLOOKUP"]],
        mustReference: ["Vendor_Master!B2:B9", "Vendor_Master!A2:A9"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["A", "B"],
        params: [],
        previewRows: 1,
        summary: "Executes wildcard substring pattern match via XLOOKUP match_mode 2."
      }
    },
    {
      id: "c08",
      number: 8,
      title: "Wildcard Matching with INDEX/MATCH",
      difficulty: "medium",
      bloom: "analyze",
      prompt: "To retrieve contracted turnaround days using partial text matching on supplier trade names, in sheet <code>Lookup_Workspace</code> cell <strong>B9</strong>, write a wildcard search formula using <code>=INDEX()</code> and <code>=MATCH()</code> indexing Lead Time in <code>Vendor_Master!C2:C9</code> and matching wildcard pattern \"*Electric*\" with match type <code>0</code> in <code>Vendor_Master!B2:B9</code>.",
      targetSheet: "Lookup_Workspace",
      targetCell: "B9",
      solution: '=INDEX(Vendor_Master!C2:C9, MATCH("*Electric*", Vendor_Master!B2:B9, 0))',
      expectedFormulaPrefix: "=INDEX",
      expectedValue: 3,
      tolerance: 0,
      hint: "Execute =INDEX(Vendor_Master!C2:C9, MATCH(\"*Electric*\", Vendor_Master!B2:B9, 0)) to retrieve the turnaround days.",
      commonMistakes: [
        { pattern: "XLOOKUP", message: "Use INDEX/MATCH with wildcard pattern matching for this exercise." }
      ],
      check: {
        expected: 3,
        tolerance: 0,
        mustUseAnyOf: [["INDEX"], ["MATCH"]],
        mustReference: ["Vendor_Master!C2:C9", "Vendor_Master!B2:B9"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["B", "C"],
        params: [],
        previewRows: 1,
        summary: "Matches substring pattern using MATCH with wildcard operator."
      }
    },
    {
      id: "c09",
      number: 9,
      title: "Approximate Match Volume Tier (XLOOKUP Match Mode -1)",
      difficulty: "medium",
      bloom: "analyze",
      prompt: "To model tiered wholesale discounts based on volume order brackets, in sheet <code>Lookup_Workspace</code> cell <strong>B10</strong>, write an approximate match lookup formula using <code>=XLOOKUP()</code> to query order quantity <code>450</code> against tier threshold minimums in <code>Vendor_Master!I2:I6</code> and return the discount percentage from <code>Vendor_Master!J2:J6</code>, configuring fallback <code>0</code> and match mode <code>-1</code> (exact match or next smaller item).",
      targetSheet: "Lookup_Workspace",
      targetCell: "B10",
      solution: '=XLOOKUP(450, Vendor_Master!I2:I6, Vendor_Master!J2:J6, 0, -1)',
      expectedFormulaPrefix: "=XLOOKUP",
      expectedValue: 0.05,
      tolerance: 0.001,
      hint: "Supply 450 as lookup value and -1 as match_mode: =XLOOKUP(450, Vendor_Master!I2:I6, Vendor_Master!J2:J6, 0, -1).",
      commonMistakes: [
        { pattern: ",\\s*1\\s*\\)", message: "Mode 1 looks for next larger; use -1 to match the achieved threshold tier." }
      ],
      check: {
        expected: 0.05,
        tolerance: 0.001,
        mustUseAnyOf: [["XLOOKUP"]],
        mustReference: ["Vendor_Master!I2:I6", "Vendor_Master!J2:J6"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["I", "J"],
        params: [],
        previewRows: 1,
        summary: "Resolves tiered volume discount rate using match_mode -1."
      }
    },
    {
      id: "c10",
      number: 10,
      title: "Dynamic PO Volume Discount Tier (XLOOKUP Mode -1)",
      difficulty: "medium",
      bloom: "analyze",
      prompt: "To calculate dynamic volume discounts for active purchase order consignments, in sheet <code>Lookup_Workspace</code> cell <strong>B11</strong>, write an approximate bracket lookup formula using <code>=XLOOKUP()</code> matching Units Ordered for PO-9006 in <code>Purchase_Orders!E7</code> against volume thresholds in <code>Vendor_Master!I2:I6</code> and returning discount percentage from <code>Vendor_Master!J2:J6</code>, with fallback <code>0</code> and match mode <code>-1</code>.",
      targetSheet: "Lookup_Workspace",
      targetCell: "B11",
      solution: '=XLOOKUP(Purchase_Orders!E7, Vendor_Master!I2:I6, Vendor_Master!J2:J6, 0, -1)',
      expectedFormulaPrefix: "=XLOOKUP",
      expectedValue: 0.15,
      tolerance: 0.001,
      hint: "Reference Purchase_Orders!E7 dynamically: =XLOOKUP(Purchase_Orders!E7, Vendor_Master!I2:I6, Vendor_Master!J2:J6, 0, -1).",
      commonMistakes: [
        { pattern: "\\b1200\\b", message: "Reference Purchase_Orders!E7 rather than hardcoding 1200 units." }
      ],
      check: {
        expected: 0.15,
        tolerance: 0.001,
        mustUseAnyOf: [["XLOOKUP"]],
        mustReference: ["Purchase_Orders!E7", "Vendor_Master!I2:I6", "Vendor_Master!J2:J6"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["E", "I", "J"],
        params: [],
        previewRows: 1,
        summary: "Dynamically matches order quantities against volume discount tiers."
      }
    },
    {
      id: "c11",
      number: 11,
      title: "Two-Way Matrix Lookup: Plumbing in South (2D INDEX/MATCH)",
      difficulty: "medium",
      bloom: "analyze",
      prompt: "To extract regional delivery freight surcharges for plumbing supplies from a 2D rate table, in sheet <code>Lookup_Workspace</code> cell <strong>B12</strong>, write a 2-way coordinate formula using <code>=INDEX()</code> and two nested <code>=MATCH()</code> functions indexing surcharge matrix <code>Vendor_Master!M2:Q6</code>, matching category \"Plumbing\" in <code>Vendor_Master!L2:L6</code> (exact match 0), and matching region \"South\" in <code>Vendor_Master!M1:Q1</code> (exact match 0).",
      targetSheet: "Lookup_Workspace",
      targetCell: "B12",
      solution: '=INDEX(Vendor_Master!M2:Q6, MATCH("Plumbing", Vendor_Master!L2:L6, 0), MATCH("South", Vendor_Master!M1:Q1, 0))',
      expectedFormulaPrefix: "=INDEX",
      expectedValue: 60,
      tolerance: 0,
      hint: "Intersect coordinates: =INDEX(Vendor_Master!M2:Q6, MATCH(\"Plumbing\", Vendor_Master!L2:L6, 0), MATCH(\"South\", Vendor_Master!M1:Q1, 0)).",
      commonMistakes: [
        { pattern: "VLOOKUP", message: "Use 2D INDEX/MATCH with row and column MATCH coordinates." }
      ],
      check: {
        expected: 60,
        tolerance: 0,
        mustUseAnyOf: [["INDEX"], ["MATCH"]],
        mustReference: ["Vendor_Master!M2:Q6", "Vendor_Master!L2:L6", "Vendor_Master!M1:Q1"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["L", "M", "Q"],
        params: [],
        previewRows: 1,
        summary: "Extracts 2D coordinate value intersecting product category and destination region."
      }
    },
    {
      id: "c12",
      number: 12,
      title: "Two-Way Matrix Lookup: HVAC in West (2D INDEX/MATCH)",
      difficulty: "medium",
      bloom: "analyze",
      prompt: "To determine HVAC freight logistics surcharge rates across Western distribution territories, in sheet <code>Lookup_Workspace</code> cell <strong>B13</strong>, write a 2-way matrix intersection formula using <code>=INDEX()</code> and two <code>=MATCH()</code> functions indexing surcharge table <code>Vendor_Master!M2:Q6</code>, matching category \"HVAC\" in <code>Vendor_Master!L2:L6</code> (exact match 0), and matching region \"West\" in <code>Vendor_Master!M1:Q1</code> (exact match 0).",
      targetSheet: "Lookup_Workspace",
      targetCell: "B13",
      solution: '=INDEX(Vendor_Master!M2:Q6, MATCH("HVAC", Vendor_Master!L2:L6, 0), MATCH("West", Vendor_Master!M1:Q1, 0))',
      expectedFormulaPrefix: "=INDEX",
      expectedValue: 115,
      tolerance: 0,
      hint: "Intersect =INDEX(Vendor_Master!M2:Q6, MATCH(\"HVAC\", Vendor_Master!L2:L6, 0), MATCH(\"West\", Vendor_Master!M1:Q1, 0)) to locate the surcharge.",
      commonMistakes: [
        { pattern: "HLOOKUP", message: "Use 2D INDEX/MATCH to resolve both row and column headers dynamically." }
      ],
      check: {
        expected: 115,
        tolerance: 0,
        mustUseAnyOf: [["INDEX"], ["MATCH"]],
        mustReference: ["Vendor_Master!M2:Q6", "Vendor_Master!L2:L6", "Vendor_Master!M1:Q1"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["L", "M", "Q"],
        params: [],
        previewRows: 1,
        summary: "Retrieves 2D freight rate for HVAC in West territory."
      }
    },
    {
      id: "c13",
      number: 13,
      title: "Two-Way Matrix Lookup: Electrical in Central (2D INDEX/MATCH)",
      difficulty: "medium",
      bloom: "analyze",
      prompt: "To retrieve contracted freight surcharges for electrical cargo routed to Central distribution hubs, in sheet <code>Lookup_Workspace</code> cell <strong>B14</strong>, write a 2-way coordinate formula using <code>=INDEX()</code> and two <code>=MATCH()</code> functions indexing surcharge grid <code>Vendor_Master!M2:Q6</code>, matching category \"Electrical\" in <code>Vendor_Master!L2:L6</code> (exact match 0), and matching region \"Central\" in <code>Vendor_Master!M1:Q1</code> (exact match 0).",
      targetSheet: "Lookup_Workspace",
      targetCell: "B14",
      solution: '=INDEX(Vendor_Master!M2:Q6, MATCH("Electrical", Vendor_Master!L2:L6, 0), MATCH("Central", Vendor_Master!M1:Q1, 0))',
      expectedFormulaPrefix: "=INDEX",
      expectedValue: 40,
      tolerance: 0,
      hint: "Match Electrical against L2:L6 and Central against M1:Q1.",
      commonMistakes: [
        { pattern: "XLOOKUP", message: "Practice 2D INDEX with dual MATCH functions." }
      ],
      check: {
        expected: 40,
        tolerance: 0,
        mustUseAnyOf: [["INDEX"], ["MATCH"]],
        mustReference: ["Vendor_Master!M2:Q6", "Vendor_Master!L2:L6", "Vendor_Master!M1:Q1"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["L", "M", "Q"],
        params: [],
        previewRows: 1,
        summary: "Extracts electrical surcharge for central hub."
      }
    },
    {
      id: "c14",
      number: 14,
      title: "Multi-Criteria Boolean Array Lookup: Vendor Quality (XLOOKUP)",
      difficulty: "medium",
      bloom: "analyze",
      prompt: "To retrieve supplier quality rating metrics requiring simultaneous verification of vendor ID and regional hub, in sheet <code>Lookup_Workspace</code> cell <strong>B15</strong>, write a multi-criteria Boolean array lookup formula using <code>=XLOOKUP()</code> matching lookup value <code>1</code> against the product array <code>(Vendor_Master!A2:A9=\"VND-103\")*(Vendor_Master!G2:G9=\"East\")</code> and returning Quality Rating from <code>Vendor_Master!D2:D9</code>.",
      targetSheet: "Lookup_Workspace",
      targetCell: "B15",
      solution: '=XLOOKUP(1, (Vendor_Master!A2:A9="VND-103")*(Vendor_Master!G2:G9="East"), Vendor_Master!D2:D9)',
      expectedFormulaPrefix: "=XLOOKUP",
      expectedValue: 0.99,
      tolerance: 0.001,
      hint: "Multiply boolean equality vectors: =XLOOKUP(1, (Vendor_Master!A2:A9=\"VND-103\")*(Vendor_Master!G2:G9=\"East\"), Vendor_Master!D2:D9).",
      commonMistakes: [
        { pattern: "\\bAND\\s*\\(", message: "AND() collapses arrays into a single scalar. Use (Cond1)*(Cond2) boolean multiplication." }
      ],
      check: {
        expected: 0.99,
        tolerance: 0.001,
        mustUseAnyOf: [["XLOOKUP"]],
        mustReference: ["Vendor_Master!A2:A9", "Vendor_Master!G2:G9", "Vendor_Master!D2:D9"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["A", "D", "G"],
        params: [],
        previewRows: 1,
        summary: "Executes multi-criteria lookup via Boolean array multiplication."
      }
    },
    {
      id: "c15",
      number: 15,
      title: "Multi-Criteria Boolean Array Lookup: Preferred Tier 1 in North Hub",
      difficulty: "hard",
      bloom: "analyze",
      prompt: "To identify preferred Tier 1 suppliers operating within Northern logistics zones, in sheet <code>Lookup_Workspace</code> cell <strong>B16</strong>, write a multi-attribute lookup formula using <code>=XLOOKUP()</code> matching lookup value <code>1</code> against Boolean product array <code>(Vendor_Master!E2:E9=\"Tier 1\")*(Vendor_Master!G2:G9=\"North\")</code> and returning Vendor Name from <code>Vendor_Master!B2:B9</code>.",
      targetSheet: "Lookup_Workspace",
      targetCell: "B16",
      solution: '=XLOOKUP(1, (Vendor_Master!E2:E9="Tier 1")*(Vendor_Master!G2:G9="North"), Vendor_Master!B2:B9)',
      expectedFormulaPrefix: "=XLOOKUP",
      expectedValue: "Apex Fasteners",
      tolerance: 0,
      hint: "Search for 1 across the multiplied arrays: =XLOOKUP(1, (Vendor_Master!E2:E9=\"Tier 1\")*(Vendor_Master!G2:G9=\"North\"), Vendor_Master!B2:B9).",
      commonMistakes: [
        { pattern: "\\bAND\\s*\\(", message: "Use array multiplication * instead of AND() to preserve vector dimensionality." }
      ],
      check: {
        expected: "Apex Fasteners",
        tolerance: 0,
        mustUseAnyOf: [["XLOOKUP"]],
        mustReference: ["Vendor_Master!E2:E9", "Vendor_Master!G2:G9", "Vendor_Master!B2:B9"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["B", "E", "G"],
        params: [],
        previewRows: 1,
        summary: "Isolates supplier meeting dual relational categorical criteria."
      }
    },
    {
      id: "c16",
      number: 16,
      title: "Two-Way Dynamic Column Metric Pull (INDEX / MATCH Row & Col)",
      difficulty: "hard",
      bloom: "analyze",
      prompt: "To dynamically query metrics across both rows and column headers in an enterprise vendor master database, in sheet <code>Lookup_Workspace</code> cell <strong>B17</strong>, write a 2-way dynamic grid lookup formula using <code>=INDEX()</code> and two <code>=MATCH()</code> functions indexing full table <code>Vendor_Master!A2:G9</code>, matching Vendor ID \"VND-101\" in <code>Vendor_Master!A2:A9</code> (exact match 0), and matching column header \"Quality_Rating\" in <code>Vendor_Master!A1:G1</code> (exact match 0).",
      targetSheet: "Lookup_Workspace",
      targetCell: "B17",
      solution: '=INDEX(Vendor_Master!A2:G9, MATCH("VND-101", Vendor_Master!A2:A9, 0), MATCH("Quality_Rating", Vendor_Master!A1:G1, 0))',
      expectedFormulaPrefix: "=INDEX",
      expectedValue: 0.98,
      tolerance: 0.001,
      hint: "Supply the full table to INDEX: =INDEX(Vendor_Master!A2:G9, MATCH(\"VND-101\", Vendor_Master!A2:A9, 0), MATCH(\"Quality_Rating\", Vendor_Master!A1:G1, 0)).",
      commonMistakes: [
        { pattern: "\\b4\\b", message: "Dynamically match column header 'Quality_Rating' rather than hardcoding column index 4." }
      ],
      check: {
        expected: 0.98,
        tolerance: 0.001,
        mustUseAnyOf: [["INDEX"], ["MATCH"]],
        mustReference: ["Vendor_Master!A2:G9", "Vendor_Master!A2:A9", "Vendor_Master!A1:G1"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["A", "G"],
        params: [],
        previewRows: 1,
        summary: "Performs full 2D table coordinate extraction with dynamic header matching."
      }
    },
    {
      id: "c17",
      number: 17,
      title: "Net Unit Cost After Wholesale Volume Discount",
      difficulty: "hard",
      bloom: "evaluate",
      prompt: "To calculate net discounted unit procurement cost for purchase order PO-9001, in sheet <code>Lookup_Workspace</code> cell <strong>B18</strong>, write a pricing formula multiplying Unit List Price <code>Purchase_Orders!F2</code> by <code>(1 - XLOOKUP(Purchase_Orders!E2, Vendor_Master!I2:I6, Vendor_Master!J2:J6, 0, -1))</code> using <code>match_mode</code> <code>-1</code> on volume tiers.",
      targetSheet: "Lookup_Workspace",
      targetCell: "B18",
      solution: '=Purchase_Orders!F2*(1-XLOOKUP(Purchase_Orders!E2, Vendor_Master!I2:I6, Vendor_Master!J2:J6, 0, -1))',
      expectedFormulaPrefix: "=Purchase_Orders",
      expectedValue: 13.5,
      tolerance: 0.01,
      hint: "Multiply Unit Price by (1 - XLOOKUP(...)): =Purchase_Orders!F2*(1-XLOOKUP(Purchase_Orders!E2, Vendor_Master!I2:I6, Vendor_Master!J2:J6, 0, -1)).",
      commonMistakes: [
        { pattern: "15", message: "Reference Purchase_Orders!F2 dynamically instead of hardcoding 15." }
      ],
      check: {
        expected: 13.5,
        tolerance: 0.01,
        mustUseAnyOf: [["XLOOKUP"]],
        mustReference: ["Purchase_Orders!F2", "Purchase_Orders!E2", "Vendor_Master!I2:I6", "Vendor_Master!J2:J6"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["E", "F", "I", "J"],
        params: [],
        previewRows: 1,
        summary: "Computes effective unit cost following volume threshold reduction."
      }
    },
    {
      id: "c18",
      number: 18,
      title: "Total Landed Cost Modeling (Gross + Matrix Freight Surcharge)",
      difficulty: "hard",
      bloom: "evaluate",
      prompt: "To calculate total landed procurement cost by aggregating gross merchandise value and 2D matrix freight surcharges, in sheet <code>Lookup_Workspace</code> cell <strong>B19</strong>, write an integrated landed cost formula adding Total Gross <code>Purchase_Orders!G2</code> to freight surcharge (Units Ordered <code>Purchase_Orders!E2</code> multiplied by the 2D freight rate retrieved from <code>Vendor_Master!M2:Q6</code> matching Category <code>Purchase_Orders!D2</code> in <code>Vendor_Master!L2:L6</code> and Delivery Region <code>Purchase_Orders!H2</code> in <code>Vendor_Master!M1:Q1</code>).",
      targetSheet: "Lookup_Workspace",
      targetCell: "B19",
      solution: '=Purchase_Orders!G2+(Purchase_Orders!E2*INDEX(Vendor_Master!M2:Q6, MATCH(Purchase_Orders!D2, Vendor_Master!L2:L6, 0), MATCH(Purchase_Orders!H2, Vendor_Master!M1:Q1, 0)))',
      expectedFormulaPrefix: "=Purchase_Orders",
      expectedValue: 20000,
      tolerance: 0.01,
      hint: "Add gross order cost to units * 2D freight rate.",
      commonMistakes: [
        { pattern: "\\b7500\\b", message: "Reference Purchase_Orders!G2 dynamically." }
      ],
      check: {
        expected: 20000,
        tolerance: 0.01,
        mustUseAnyOf: [["INDEX"], ["MATCH"]],
        mustReference: ["Purchase_Orders!G2", "Purchase_Orders!E2", "Vendor_Master!M2:Q6"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["D", "E", "G", "H", "M", "Q"],
        params: [],
        previewRows: 1,
        summary: "Models comprehensive landed procurement cost with dynamic regional shipping."
      }
    },
    {
      id: "c19",
      number: 19,
      title: "Resilient Vendor Contact Retrieval (IFNA + XLOOKUP)",
      difficulty: "hard",
      bloom: "evaluate",
      prompt: "To retrieve vendor support contact emails while defending procurement logs against missing records, in sheet <code>Lookup_Workspace</code> cell <strong>B20</strong>, write an error-handling lookup formula using <code>=IFNA()</code> wrapping <code>=XLOOKUP()</code> to query Vendor ID \"VND-888\" in <code>Vendor_Master!A2:A9</code> returning email from <code>Vendor_Master!F2:F9</code>, and returning fallback string \"procurement@primedistro.com\" on unlisted vendors.",
      targetSheet: "Lookup_Workspace",
      targetCell: "B20",
      solution: '=IFNA(XLOOKUP("VND-888", Vendor_Master!A2:A9, Vendor_Master!F2:F9), "procurement@primedistro.com")',
      expectedFormulaPrefix: "=IFNA",
      expectedValue: "procurement@primedistro.com",
      tolerance: 0,
      hint: "Wrap XLOOKUP with IFNA: =IFNA(XLOOKUP(\"VND-888\", Vendor_Master!A2:A9, Vendor_Master!F2:F9), \"procurement@primedistro.com\").",
      commonMistakes: [
        { pattern: "IFERROR", message: "Use IFNA for surgical lookup error trapping without masking structural formula bugs." }
      ],
      check: {
        expected: "procurement@primedistro.com",
        tolerance: 0,
        mustUseAnyOf: [["IFNA"], ["XLOOKUP"]],
        mustReference: ["Vendor_Master!A2:A9", "Vendor_Master!F2:F9"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["A", "F"],
        params: [],
        previewRows: 1,
        summary: "Applies surgical IFNA error trapping on unlisted vendor queries."
      }
    },
    {
      id: "c20",
      number: 20,
      title: "Strategic Priority Order Qualification (IF + AND + XLOOKUP)",
      difficulty: "hard",
      bloom: "create",
      prompt: "To classify purchase orders into strategic priority tiers based on supplier partnership tier and order value, in sheet <code>Lookup_Workspace</code> cell <strong>B21</strong>, write a conditional classification formula combining <code>=IF()</code>, <code>=AND()</code>, and <code>=XLOOKUP()</code> to test if the vendor looked up from <code>Purchase_Orders!B2</code> into <code>Vendor_Master!A2:A9</code> returning Preferred Tier from <code>Vendor_Master!E2:E9</code> equals \"Tier 1\" AND Total Gross in <code>Purchase_Orders!G2</code> is greater than or equal to <code>5000</code>, returning \"Strategic Priority\" if satisfied, otherwise \"Standard Order\".",
      targetSheet: "Lookup_Workspace",
      targetCell: "B21",
      solution: '=IF(AND(XLOOKUP(Purchase_Orders!B2, Vendor_Master!A2:A9, Vendor_Master!E2:E9)="Tier 1", Purchase_Orders!G2>=5000), "Strategic Priority", "Standard Order")',
      expectedFormulaPrefix: "=IF",
      expectedValue: "Strategic Priority",
      tolerance: 0,
      hint: "Nest XLOOKUP inside AND inside IF: =IF(AND(XLOOKUP(Purchase_Orders!B2, Vendor_Master!A2:A9, Vendor_Master!E2:E9)=\"Tier 1\", Purchase_Orders!G2>=5000), \"Strategic Priority\", \"Standard Order\").",
      commonMistakes: [
        { pattern: "OR\\(", message: "Both conditions must be met simultaneously; use AND()." }
      ],
      check: {
        expected: "Strategic Priority",
        tolerance: 0,
        mustUseAnyOf: [["IF"], ["AND"], ["XLOOKUP"]],
        mustReference: ["Purchase_Orders!B2", "Vendor_Master!A2:A9", "Vendor_Master!E2:E9", "Purchase_Orders!G2"],
        mustNotBeLiteral: true
      },
      dataScope: {
        cols: ["B", "G", "E"],
        params: [],
        previewRows: 1,
        summary: "Constructs multi-variable business decision combining XLOOKUP with boolean gate."
      }
    }
  ]
};
