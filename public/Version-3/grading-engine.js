// ═══════════════════════════════════════════════════════════════
// MANODEMY INTELLIGENT SQL VALIDATION & PEDAGOGICAL DIAGNOSTIC ENGINE (v4.0)
// Self-Contained Client-Side / Edge Production Bundle
// 4-Layer Architecture: AST + Dual Sandbox + Cognitive Traps + Pedagogical Diffs
// ═══════════════════════════════════════════════════════════════

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    const exports = factory();
    root.gradeSubmission = exports.gradeSubmission;
    root.GradingEngineV4 = exports;
  }
})(typeof self !== 'undefined' ? self : this, function() {
  'use strict';

  const SQL_KEYWORDS = new Set([
    'SELECT', 'FROM', 'WHERE', 'GROUP', 'BY', 'HAVING', 'ORDER', 'LIMIT', 'OFFSET',
    'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'CROSS', 'NATURAL', 'OUTER', 'ON', 'AS',
    'DISTINCT', 'WITH', 'RECURSIVE', 'UNION', 'ALL', 'INTERSECT', 'EXCEPT',
    'AND', 'OR', 'NOT', 'IN', 'IS', 'NULL', 'BETWEEN', 'LIKE', 'EXISTS',
    'CASE', 'WHEN', 'THEN', 'ELSE', 'END', 'OVER', 'PARTITION', 'ROWS', 'RANGE',
    'PRECEDING', 'FOLLOWING', 'UNBOUNDED', 'CURRENT', 'ROW', 'ASC', 'DESC',
    'CAST', 'COALESCE', 'NULLIF', 'ROUND', 'COUNT', 'SUM', 'AVG', 'MIN', 'MAX',
    'RANK', 'DENSE_RANK', 'ROW_NUMBER', 'NTILE', 'LAG', 'LEAD', 'FIRST_VALUE', 'LAST_VALUE', 'TOP'
  ]);

  const DEFAULT_FLOAT_EPSILON = 0.0001;

  // ─────────────────────────────────────────────────────────────
  // 1. TOKENIZER & AST STATIC ANALYZER
  // ─────────────────────────────────────────────────────────────

  function tokenizeSql(sql) {
    const tokens = [];
    let index = 0, line = 1, column = 1;
    const len = sql.length;

    function advance(count) {
      count = count || 1;
      for (let i = 0; i < count; i++) {
        if (sql[index + i] === '\n') {
          line++;
          column = 1;
        } else {
          column++;
        }
      }
      index += count;
    }

    while (index < len) {
      const start = index, startLine = line, startCol = column;
      const char = sql[index];

      if (/\s/.test(char)) {
        let val = '';
        while (index < len && /\s/.test(sql[index])) { val += sql[index]; advance(1); }
        tokens.push({ type: 'WHITESPACE', value: val, line: startLine, column: startCol, start, end: index });
        continue;
      }

      if (char === '-' && index + 1 < len && sql[index + 1] === '-') {
        let val = '';
        while (index < len && sql[index] !== '\n') { val += sql[index]; advance(1); }
        tokens.push({ type: 'COMMENT', value: val, line: startLine, column: startCol, start, end: index });
        continue;
      }

      if (char === '/' && index + 1 < len && sql[index + 1] === '*') {
        let val = '/*';
        advance(2);
        while (index < len && !(sql[index] === '*' && index + 1 < len && sql[index + 1] === '/')) {
          val += sql[index]; advance(1);
        }
        if (index < len) { val += '*/'; advance(2); }
        tokens.push({ type: 'COMMENT', value: val, line: startLine, column: startCol, start, end: index });
        continue;
      }

      if (char === "'") {
        let val = "'";
        advance(1);
        while (index < len) {
          if (sql[index] === "'") {
            if (index + 1 < len && sql[index + 1] === "'") {
              val += "''"; advance(2);
            } else {
              val += "'"; advance(1); break;
            }
          } else {
            val += sql[index]; advance(1);
          }
        }
        tokens.push({ type: 'STRING', value: val, line: startLine, column: startCol, start, end: index });
        continue;
      }

      if (char === '`' || char === '"' || char === '[') {
        const closeChar = char === '[' ? ']' : char;
        let val = char; advance(1);
        while (index < len && sql[index] !== closeChar) { val += sql[index]; advance(1); }
        if (index < len) { val += closeChar; advance(1); }
        tokens.push({ type: 'IDENTIFIER', value: val, line: startLine, column: startCol, start, end: index });
        continue;
      }

      if (/[0-9]/.test(char) || (char === '.' && index + 1 < len && /[0-9]/.test(sql[index + 1]))) {
        let val = '';
        let hasDot = false;
        while (index < len && (/[0-9]/.test(sql[index]) || (sql[index] === '.' && !hasDot))) {
          if (sql[index] === '.') hasDot = true;
          val += sql[index]; advance(1);
        }
        tokens.push({ type: 'NUMBER', value: val, line: startLine, column: startCol, start, end: index });
        continue;
      }

      const twoChar = sql.substring(index, index + 2);
      if (twoChar === '!=' || twoChar === '<>' || twoChar === '<=' || twoChar === '>=' || twoChar === ':=' || twoChar === '||') {
        advance(2);
        tokens.push({ type: 'OPERATOR', value: twoChar, line: startLine, column: startCol, start, end: index });
        continue;
      }

      if (['=', '<', '>', '+', '-', '*', '/', '%'].includes(char)) {
        advance(1);
        tokens.push({ type: 'OPERATOR', value: char, line: startLine, column: startCol, start, end: index });
        continue;
      }

      if ([',', ';', '(', ')', '.'].includes(char)) {
        advance(1);
        tokens.push({ type: 'PUNCTUATION', value: char, line: startLine, column: startCol, start, end: index });
        continue;
      }

      if (/[a-zA-Z_]/.test(char)) {
        let val = '';
        while (index < len && /[a-zA-Z0-9_]/.test(sql[index])) { val += sql[index]; advance(1); }
        const upper = val.toUpperCase();
        tokens.push({
          type: SQL_KEYWORDS.has(upper) ? 'KEYWORD' : 'IDENTIFIER',
          value: val, line: startLine, column: startCol, start, end: index
        });
        continue;
      }

      advance(1);
      tokens.push({ type: 'PUNCTUATION', value: char, line: startLine, column: startCol, start, end: index });
    }

    return tokens;
  }

  function formatVisualPointer(sql, line, column, msg) {
    const lines = sql.split('\n');
    const targetIdx = Math.max(0, Math.min(lines.length - 1, line - 1));
    const targetLine = lines[targetIdx] || '';
    const caret = ' '.repeat(Math.max(0, column - 1)) + '^';
    return `Line ${line}, Column ${column}:\n  ${targetLine}\n  ${caret}\n  ${msg}`;
  }

  function parseSqlAst(sql) {
    if (!sql || !sql.trim()) {
      return {
        valid: false,
        syntaxError: { message: 'Submission is empty.', visualPointer: 'Line 1, Column 1:\n  (empty)\n  ^\n  Query is empty.' }
      };
    }

    const rawTokens = tokenizeSql(sql);
    const tokens = rawTokens.filter(t => t.type !== 'WHITESPACE' && t.type !== 'COMMENT');

    if (tokens.length === 0) {
      return {
        valid: false,
        syntaxError: { message: 'Submission contains no SQL statements.', visualPointer: 'Query is empty.' }
      };
    }

    // Fast syntax checks
    for (let i = 0; i < tokens.length; i++) {
      const upper = tokens[i].value.toUpperCase();
      if (upper === 'FORM' && i > 0 && tokens[i - 1].value.toUpperCase() !== 'SELECT') {
        return {
          valid: false,
          syntaxError: {
            message: "Keyword Typo: 'FORM' ➔ 'FROM'",
            line: tokens[i].line,
            column: tokens[i].column,
            visualPointer: formatVisualPointer(sql, tokens[i].line, tokens[i].column, "Unexpected keyword 'FORM'. Did you mean 'FROM'?")
          }
        };
      }
      if (['SELEC', 'SELEST', 'SELCT'].includes(upper)) {
        return {
          valid: false,
          syntaxError: {
            message: `Keyword Typo: '${tokens[i].value}' ➔ 'SELECT'`,
            line: tokens[i].line,
            column: tokens[i].column,
            visualPointer: formatVisualPointer(sql, tokens[i].line, tokens[i].column, `Unexpected keyword '${tokens[i].value}'. Did you mean 'SELECT'?`)
          }
        };
      }
    }

    // Parentheses check
    let balance = 0, lastOpen = null;
    for (let t of tokens) {
      if (t.value === '(') { balance++; lastOpen = t; }
      else if (t.value === ')') {
        balance--;
        if (balance < 0) {
          return {
            valid: false,
            syntaxError: {
              message: "Unmatched closing parenthesis ')'",
              line: t.line, column: t.column,
              visualPointer: formatVisualPointer(sql, t.line, t.column, "Unexpected closing parenthesis ')' with no matching '('.")
            }
          };
        }
      }
    }
    if (balance > 0 && lastOpen) {
      return {
        valid: false,
        syntaxError: {
          message: "Unclosed parenthesis '('",
          line: lastOpen.line, column: lastOpen.column,
          visualPointer: formatVisualPointer(sql, lastOpen.line, lastOpen.column, "Unclosed opening parenthesis '('.")
        }
      };
    }

    const ast = {
      rawSql: sql,
      hasWithCte: false,
      isDistinct: false,
      projections: [],
      joins: [],
      groupByColumns: [],
      windowFunctions: [],
      orderByColumns: [],
      whereClause: null,
      havingClause: null,
      limit: null,
      rawTokens
    };

    let idx = 0;
    if (tokens[idx]?.value.toUpperCase() === 'WITH') {
      ast.hasWithCte = true;
    }

    const rawUpper = sql.toUpperCase();
    ast.isDistinct = /\bSELECT\s+DISTINCT\b/i.test(sql);
    ast.hasWithCte = /\bWITH\b[\s\S]+?\bAS\s*\(/i.test(sql);

    // Group By scan
    const groupMatch = sql.match(/GROUP\s+BY\s+([\s\S]+?)(?:\s+(?:HAVING|ORDER\s+BY|LIMIT)|;|$)/i);
    if (groupMatch) {
      ast.groupByColumns = groupMatch[1].split(',').map(s => s.trim()).filter(Boolean);
    }

    // Window Functions scan
    const winMatches = sql.match(/\b(RANK|DENSE_RANK|ROW_NUMBER|NTILE|LAG|LEAD|SUM|AVG|COUNT|MIN|MAX)\s*\([^)]*\)\s+OVER\s*\([^)]*\)/gi);
    if (winMatches) {
      winMatches.forEach(m => {
        const fnName = (m.match(/\b(RANK|DENSE_RANK|ROW_NUMBER|NTILE|LAG|LEAD|SUM|AVG|COUNT|MIN|MAX)/i) || [])[1];
        ast.windowFunctions.push({ raw: m, funcName: fnName ? fnName.toUpperCase() : '' });
      });
    }

    return { valid: true, ast };
  }

  function validateStructuralConstraints(ast, rules) {
    rules = rules || {};
    const violations = [];

    if (rules.requiresCte && !ast.hasWithCte) {
      violations.push({
        expected: 'WITH clause (CTE)',
        actual: 'Plain SELECT',
        message: 'This question requires formulating your solution with a Common Table Expression (WITH ... AS (...)).'
      });
    }

    if (rules.requiresWindowFunction && rules.requiresWindowFunction.length > 0) {
      const present = ast.windowFunctions.map(w => w.funcName);
      const ok = rules.requiresWindowFunction.some(wf => present.includes(wf.toUpperCase()));
      if (!ok) {
        violations.push({
          expected: `Window function (${rules.requiresWindowFunction.join(' or ')})`,
          actual: present.length > 0 ? present.join(', ') : 'None',
          message: `This challenge requires using a window function (${rules.requiresWindowFunction.join(' or ')}) with OVER (...).`
        });
      }
    }

    if (rules.requiresDistinct && !ast.isDistinct) {
      violations.push({
        expected: 'DISTINCT',
        actual: 'Non-distinct SELECT',
        message: 'This question requires using SELECT DISTINCT to remove duplicates.'
      });
    }

    if (rules.requiresGroupBy && ast.groupByColumns.length === 0) {
      violations.push({
        expected: 'GROUP BY',
        actual: 'No GROUP BY',
        message: 'This challenge requires grouping rows with a GROUP BY clause.'
      });
    }

    if (rules.disallowedKeywords && rules.disallowedKeywords.length > 0) {
      const sqlUpper = ast.rawSql.toUpperCase();
      for (let dis of rules.disallowedKeywords) {
        if (new RegExp(`\\b${dis.toUpperCase()}\\b`, 'i').test(sqlUpper)) {
          violations.push({
            expected: `Avoid '${dis}'`,
            actual: `Used '${dis}'`,
            message: `The keyword '${dis}' is disallowed for this specific problem.`
          });
        }
      }
    }

    return { passed: violations.length === 0, violations };
  }

  // ─────────────────────────────────────────────────────────────
  // 2. DUAL SANDBOX EXECUTION & INVARIANT COMPARATOR
  // ─────────────────────────────────────────────────────────────

  function normalizeResult(res) {
    if (!res) return { columns: [], rows: [], rowCount: 0, columnCount: 0 };
    if (Array.isArray(res)) {
      if (res.length === 0) return { columns: [], rows: [], rowCount: 0, columnCount: 0 };
      const first = res[0];
      if (first && Array.isArray(first.columns) && Array.isArray(first.values)) {
        return {
          columns: first.columns.map(String),
          rows: first.values.map(r => (Array.isArray(r) ? r : [r])),
          rowCount: first.values.length,
          columnCount: first.columns.length
        };
      }
      if (typeof first === 'object' && first !== null) {
        const columns = Object.keys(first);
        const rows = res.map(row => columns.map(c => row[c] ?? null));
        return { columns, rows, rowCount: rows.length, columnCount: columns.length };
      }
    }
    if (res.columns && res.rows) {
      return { columns: res.columns, rows: res.rows, rowCount: res.rows.length, columnCount: res.columns.length };
    }
    return { columns: [], rows: [], rowCount: 0, columnCount: 0 };
  }

  function compareCells(expected, actual, epsilon) {
    epsilon = epsilon || DEFAULT_FLOAT_EPSILON;
    const isExpNull = expected === null || expected === undefined;
    const isActNull = actual === null || actual === undefined;

    if (isExpNull && isActNull) return { match: true };
    if (isExpNull !== isActNull) return { match: false, reason: 'NULL_DISCREPANCY' };
    if (expected === actual) return { match: true };

    const numExp = typeof expected === 'number' ? expected : parseFloat(String(expected));
    const numAct = typeof actual === 'number' ? actual : parseFloat(String(actual));

    if (!isNaN(numExp) && !isNaN(numAct)) {
      if (Math.abs(numExp - numAct) <= epsilon) return { match: true };
      return { match: false, reason: 'PRECISION_ERROR' };
    }

    if (String(expected).trim() === String(actual).trim()) return { match: true };
    return { match: false, reason: 'VALUE_DIFF' };
  }

  function serializeRow(row) {
    return JSON.stringify(row.map(v => {
      if (v === null || v === undefined) return null;
      if (typeof v === 'number') return Math.round(v * 10000) / 10000;
      return String(v).trim();
    }));
  }

  function compareResultSets(expected, actual, rules) {
    rules = rules || {};
    const epsilon = rules.floatEpsilon || DEFAULT_FLOAT_EPSILON;

    if (expected.columnCount !== actual.columnCount) {
      return {
        passed: false,
        diff: {
          type: 'COLUMN_COUNT_MISMATCH',
          summary: `Column count mismatch: Expected ${expected.columnCount} columns (${expected.columns.join(', ')}), got ${actual.columnCount} (${actual.columns.join(', ')}).`,
          expectedColumns: expected.columns,
          actualColumns: actual.columns,
          expectedRowCount: expected.rowCount,
          actualRowCount: actual.rowCount
        }
      };
    }

    if (rules.columnNameSensitive || rules.strictAliasing) {
      for (let i = 0; i < expected.columns.length; i++) {
        if (expected.columns[i].toLowerCase() !== actual.columns[i].toLowerCase()) {
          return {
            passed: false,
            diff: {
              type: 'COLUMN_NAME_MISMATCH',
              summary: `Column alias mismatch: Expected '${expected.columns[i]}', got '${actual.columns[i]}'.`,
              expectedColumns: expected.columns,
              actualColumns: actual.columns,
              expectedRowCount: expected.rowCount,
              actualRowCount: actual.rowCount
            }
          };
        }
      }
    }

    if (expected.rowCount !== actual.rowCount) {
      return {
        passed: false,
        diff: {
          type: 'ROW_COUNT_MISMATCH',
          summary: `Row count mismatch: Expected ${expected.rowCount} rows, but got ${actual.rowCount} rows.`,
          expectedColumns: expected.columns,
          actualColumns: actual.columns,
          expectedRowCount: expected.rowCount,
          actualRowCount: actual.rowCount
        }
      };
    }

    if (expected.rowCount === 0 && actual.rowCount === 0) {
      return { passed: true, diff: null };
    }

    if (rules.orderSensitive) {
      const mismatches = [];
      for (let r = 0; r < expected.rowCount; r++) {
        for (let c = 0; c < expected.columnCount; c++) {
          const res = compareCells(expected.rows[r][c], actual.rows[r][c], epsilon);
          if (!res.match) {
            mismatches.push({
              row: r + 1, col: c + 1,
              expected: expected.rows[r][c], actual: actual.rows[r][c],
              reason: res.reason
            });
          }
        }
      }
      if (mismatches.length > 0) {
        return {
          passed: false,
          diff: {
            type: 'VALUE_MISMATCH',
            summary: `Value mismatch found in ${mismatches.length} cell(s) under ordered comparison.`,
            expectedColumns: expected.columns,
            actualColumns: actual.columns,
            expectedRowCount: expected.rowCount,
            actualRowCount: actual.rowCount,
            mismatches
          }
        };
      }
      return { passed: true, diff: null };
    }

    // Order-invariant Multiset matching
    const expMap = new Map(), actMap = new Map();
    expected.rows.forEach(r => {
      const k = serializeRow(r);
      expMap.set(k, (expMap.get(k) || 0) + 1);
    });
    actual.rows.forEach(r => {
      const k = serializeRow(r);
      actMap.set(k, (actMap.get(k) || 0) + 1);
    });

    for (let [k, expCount] of expMap.entries()) {
      if (actMap.get(k) !== expCount) {
        return {
          passed: false,
          diff: {
            type: 'VALUE_MISMATCH',
            summary: 'Result sets do not contain identical rows (multiset difference detected).',
            expectedColumns: expected.columns,
            actualColumns: actual.columns,
            expectedRowCount: expected.rowCount,
            actualRowCount: actual.rowCount
          }
        };
      }
    }

    return { passed: true, diff: null };
  }

  // ─────────────────────────────────────────────────────────────
  // 3. COGNITIVE ANTI-PATTERN DETECTORS
  // ─────────────────────────────────────────────────────────────

  function splitSqlTopLevelList(str) {
    const parts = [];
    let current = '';
    let parenDepth = 0;
    let inString = false;
    let stringChar = '';
    for (let i = 0; i < str.length; i++) {
      const ch = str[i];
      if (inString) {
        current += ch;
        if (ch === stringChar) {
          if (str[i + 1] === stringChar) { current += str[i + 1]; i++; }
          else inString = false;
        }
      } else if (ch === "'" || ch === '"' || ch === '`') {
        inString = true;
        stringChar = ch;
        current += ch;
      } else if (ch === '(') {
        parenDepth++;
        current += ch;
      } else if (ch === ')') {
        if (parenDepth > 0) parenDepth--;
        current += ch;
      } else if (ch === ',' && parenDepth === 0) {
        parts.push(current.trim());
        current = '';
      } else {
        current += ch;
      }
    }
    if (current.trim()) parts.push(current.trim());
    return parts;
  }

  function runDiagnostics(studentSql, refSql, studentResult, refResult, errorMsg) {
    const diags = [];

    // 1. NOT IN with NULL Subquery Trap
    if (/\bNOT\s+IN\s*\(\s*SELECT\b/i.test(studentSql) && studentResult?.rowCount === 0 && (refResult?.rowCount || 0) > 0) {
      diags.push({
        trapId: 'NOT_IN_SUBQUERY_NULL',
        badge: '💀 SQL Trap: NULL in Subquery',
        header: 'NOT IN with NULL Subquery Trap',
        explanation: 'In SQL 3-valued logic, <code>NOT IN</code> evaluates to <strong>UNKNOWN</strong> when the subquery returns any NULL value. This causes <code>WHERE</code> to discard 100% of rows (0 rows returned)!',
        actionableHint: "Add <code>WHERE ... IS NOT NULL</code> inside your subquery, or rewrite using <code>NOT EXISTS</code>.",
        remediation: { actionLabel: "Add 'WHERE ... IS NOT NULL' to subquery" },
        severity: 'HIGH'
      });
    }

    // 2. LEFT JOIN Nullification Trap
    const leftJoinMatch = /\bLEFT\s+(OUTER\s+)?JOIN\s+([a-zA-Z0-9_]+)(\s+AS\s+([a-zA-Z0-9_]+)|\s+([a-zA-Z0-9_]+))?\b/i.exec(studentSql);
    if (leftJoinMatch) {
      const rightTbl = leftJoinMatch[4] || leftJoinMatch[5] || leftJoinMatch[2];
      const isAntiJoin = new RegExp(`\\b${rightTbl}\\.[a-zA-Z0-9_]+\\s+IS\\s+NULL\\b`, 'i').test(studentSql);
      if (!isAntiJoin) {
        const whereFilter = new RegExp(`WHERE[\\s\\S]*?\\b${rightTbl}\\.`, 'i');
        if (whereFilter.test(studentSql)) {
          diags.push({
            trapId: 'LEFT_JOIN_NULLIFICATION',
            badge: '⚠️ Cognitive Bug: LEFT JOIN Nullified',
            header: 'LEFT JOIN Filter in WHERE Clause',
            explanation: `Filtering right-table columns (<code>${rightTbl}</code>) inside <code>WHERE</code> evaluates to <code>NULL = 'value'</code> on unmatched rows. This unintentionally converts your <code>LEFT JOIN</code> into an <strong>INNER JOIN</strong>!`,
            actionableHint: `Move the right-table condition into the <code>ON</code> clause of your <code>LEFT JOIN</code>.`,
            remediation: { actionLabel: 'Move filter to ON clause' },
            severity: 'HIGH'
          });
        }
      }
    }

    // 3. COUNT(*) vs COUNT(col)
    const countColMatch = studentSql.match(/COUNT\s*\(\s*([a-zA-Z0-9_]+)\s*\)/i);
    if (countColMatch && /COUNT\s*\(\s*\*\s*\)/i.test(refSql || '')) {
      const col = countColMatch[1];
      const refUsesCol = new RegExp(`COUNT\\s*\\(\\s*${col}\\s*\\)`, 'i').test(refSql || '');
      if (col.toUpperCase() !== 'DISTINCT' && !refUsesCol) {
        diags.push({
          trapId: 'COUNT_STAR_VS_COL',
          badge: '💡 Concept Clarity: COUNT(*) vs COUNT(column)',
          header: 'COUNT(*) vs COUNT(column) NULL Mismatch',
          explanation: `<code>COUNT(*)</code> counts all rows, whereas <code>COUNT(${col})</code> only counts rows where <code>${col}</code> is <strong>NOT NULL</strong>.`,
          actionableHint: "Use <code>COUNT(*)</code> to include all rows.",
          remediation: { actionLabel: "Change to 'COUNT(*)'", actionReplace: { from: new RegExp(`COUNT\\s*\\(\\s*${col}\\s*\\)`, 'i'), to: 'COUNT(*)' } },
          severity: 'MEDIUM'
        });
      }
    }

    // 3.5 GROUP BY Non-Aggregated Projection Trap
    // Only evaluate for simple single-level queries to avoid false positives on CTEs/subqueries
    const hasCteOrSubquery = /\bWITH\b/i.test(studentSql) || /\(\s*SELECT\b/i.test(studentSql);
    const groupMatch = !hasCteOrSubquery ? studentSql.match(/GROUP\s+BY\s+([\s\S]+?)(?:\s+(?:HAVING|ORDER\s+BY|LIMIT)|;|$)/i) : null;
    if (groupMatch) {
      const groupColsRaw = splitSqlTopLevelList(groupMatch[1]).map(s => s.toLowerCase());
      const groupColsClean = groupColsRaw.map(s => s.split('.').pop().trim());
      const selectPart = (studentSql.match(/SELECT\s+([\s\S]+?)\s+FROM/i) || [])[1] || '';
      const projections = splitSqlTopLevelList(selectPart);
      const unagg = [];
      projections.forEach(p => {
        if (!/\b(COUNT|SUM|AVG|MIN|MAX|GROUP_CONCAT)\s*\(/i.test(p) && !/\bOVER\s*\(/i.test(p) && p !== '*') {
          const aliasM = p.match(/\s+AS\s+([a-zA-Z0-9_]+)/i);
          const alias = aliasM ? aliasM[1].toLowerCase() : '';
          const expr = p.replace(/\s+AS\s+[a-zA-Z0-9_]+/i, '').trim().toLowerCase();
          const colName = expr.split('.').pop().trim();
          const isGrouped = groupColsClean.includes(alias) ||
                            groupColsRaw.includes(alias) ||
                            groupColsClean.includes(colName) ||
                            groupColsRaw.includes(expr) ||
                            groupColsClean.includes(expr) ||
                            colName === '1' || colName === '2';
          if (!isGrouped && colName) {
            unagg.push(p);
          }
        }
      });
      if (unagg.length > 0) {
        diags.push({
          trapId: 'GROUP_BY_NON_AGGREGATED_PROJECTION',
          badge: '⚠️ Anti-Pattern: Non-Aggregated Column',
          header: 'Missing Column in GROUP BY',
          explanation: `You projected column(s) <code>${unagg.join(', ')}</code> in the <code>SELECT</code> clause, but they are neither enclosed in an aggregate function (like <code>SUM</code>, <code>AVG</code>, <code>MAX</code>) nor included in the <code>GROUP BY</code> clause.`,
          actionableHint: `Either add <code>${unagg.join(', ')}</code> to your <code>GROUP BY</code> list or wrap them in an aggregate function.`,
          remediation: { actionLabel: `Add '${unagg[0]}' to GROUP BY` },
          severity: 'HIGH'
        });
      }
    }

    // 4. Window Frame Drift
    if (/\bOVER\s*\(\s*[^)]*ORDER\s+BY[^)]*\)/i.test(studentSql) && /\b(SUM|AVG|COUNT)\s*\([^)]*\)\s+OVER/i.test(studentSql) && !/\b(ROWS|RANGE)\b/i.test(studentSql)) {
      diags.push({
        trapId: 'WINDOW_DEFAULT_FRAME_DRIFT',
        badge: '🎯 Window Frame Drift: RANGE vs ROWS',
        header: 'Default Window Frame on Tie Values',
        explanation: 'When <code>ORDER BY</code> is used in window aggregates without a frame clause, SQL defaults to <code>RANGE</code>, which lumps duplicate ties together instead of accumulating row by row.',
        actionableHint: "Append <code>ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW</code> inside your <code>OVER (...)</code>.",
        remediation: { actionLabel: "Add 'ROWS UNBOUNDED PRECEDING'", suggestedFix: 'ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW' },
        severity: 'MEDIUM'
      });
    }

    // 5. RANK vs DENSE_RANK
    if (/\bRANK\s*\(\s*\)\s+OVER/i.test(studentSql) && !/\bRANK\s*\(\s*\)\s+OVER/i.test(refSql || '') && /\bDENSE_RANK\s*\(\s*\)\s+OVER/i.test(refSql || '')) {
      diags.push({
        trapId: 'RANK_VS_DENSE_RANK_TIE_SKIPPING',
        badge: '🏅 Ranking Function Mismatch',
        header: 'Rank Gap Skipping on Ties',
        explanation: '<code>RANK()</code> skips rank numbers after ties (1, 2, 2, 4), while <code>DENSE_RANK()</code> produces consecutive ranks (1, 2, 2, 3).',
        actionableHint: "Replace <code>RANK()</code> with <code>DENSE_RANK()</code>.",
        remediation: { actionLabel: "Change 'RANK()' ➔ 'DENSE_RANK()'", actionReplace: { from: /\bRANK\s*\(\s*\)/gi, to: 'DENSE_RANK()' } },
        severity: 'HIGH'
      });
    }

    // 6. Aggregate in WHERE
    let hasAggInWhere = false;
    if (/misuse of aggregate/i.test(errorMsg || '')) {
      hasAggInWhere = true;
    } else {
      const wm = studentSql.match(/\bWHERE\b([\s\S]+?)(?:\b(?:GROUP\s+BY|HAVING|ORDER\s+BY|LIMIT|UNION|EXCEPT|INTERSECT)\b|;|$)/i);
      if (wm) {
        const wt = wm[1].replace(/\(\s*SELECT\b[\s\S]*?\)/gi, '');
        if (/\b(COUNT|SUM|AVG|MIN|MAX)\s*\(/i.test(wt)) {
          hasAggInWhere = true;
        }
      }
    }
    if (hasAggInWhere) {
      diags.push({
        trapId: 'AGGREGATE_IN_WHERE',
        badge: '❌ Execution Order Error: Aggregate in WHERE',
        header: 'Aggregate in WHERE Clause',
        explanation: 'Aggregates filter groups *after* grouping, not individual rows before aggregation. Use <strong>HAVING</strong> to filter aggregate calculations!',
        actionableHint: "Replace <code>WHERE</code> with <code>HAVING</code>.",
        remediation: { actionLabel: "Change 'WHERE' ➔ 'HAVING'" },
        severity: 'HIGH'
      });
    }

    // 7. NULL equality (in WHERE/HAVING/ON clauses, not in UPDATE SET clauses)
    const whereHavingClause = (studentSql.match(/\b(?:WHERE|HAVING|ON)\b([\s\S]+?)(?:\b(?:GROUP\s+BY|ORDER\s+BY|LIMIT|RETURNING|UNION)\b|;|$)/i) || [])[1] || '';
    if (/=\s*NULL\b/i.test(whereHavingClause)) {
      diags.push({
        trapId: 'NULL_EQUALITY_TRAP',
        badge: '💀 NULL Comparison Trap',
        header: 'Incorrect = NULL Comparison',
        explanation: 'In SQL, <code>= NULL</code> always returns <strong>UNKNOWN</strong>. Use <strong>IS NULL</strong>.',
        actionableHint: "Change <code>= NULL</code> to <code>IS NULL</code>.",
        remediation: { actionLabel: "Change '= NULL' ➔ 'IS NULL'", actionReplace: { from: /=\s*NULL\b/gi, to: 'IS NULL' } },
        severity: 'HIGH'
      });
    }
    if (/(!=|<>)\s*NULL\b/i.test(studentSql)) {
      diags.push({
        trapId: 'NULL_EQUALITY_TRAP',
        badge: '💀 NOT NULL Comparison Trap',
        header: 'Incorrect != NULL Comparison',
        explanation: 'Comparing <code>!= NULL</code> always evaluates to <strong>UNKNOWN</strong>. Use <strong>IS NOT NULL</strong>.',
        actionableHint: "Change <code>!= NULL</code> to <code>IS NOT NULL</code>.",
        remediation: { actionLabel: "Change '!= NULL' ➔ 'IS NOT NULL'", actionReplace: { from: /(!=|<>)\s*NULL\b/gi, to: 'IS NOT NULL' } },
        severity: 'HIGH'
      });
    }

    // 8. Chained comparisons
    if (/WHERE\s+[0-9'a-zA-Z_]+\s*[><=]+\s*[a-zA-Z0-9_]+\s*[><=]+\s*[0-9'a-zA-Z_]+/i.test(studentSql)) {
      diags.push({
        trapId: 'CHAINED_COMPARISONS',
        badge: '⚠️ Chained Comparison Trap',
        header: 'Chained Comparison Trap',
        explanation: 'SQL does not support mathematical chained comparisons like <code>min < x < max</code>. Use <code>BETWEEN</code> or join with <code>AND</code>.',
        actionableHint: "Use <code>BETWEEN min AND max</code>.",
        remediation: { actionLabel: "Use 'BETWEEN' or 'AND'" },
        severity: 'HIGH'
      });
    }

    // 9. BETWEEN OR
    if (/BETWEEN\s+[0-9'a-zA-Z_]+\s+OR\s+/i.test(studentSql)) {
      diags.push({
        trapId: 'BETWEEN_OR',
        badge: '⚡ Syntax Error: BETWEEN with OR',
        header: 'BETWEEN Operator Syntax',
        explanation: 'The <code>BETWEEN</code> operator connects its boundary values with <strong>AND</strong>, not <code>OR</code>.',
        actionableHint: "Change <code>OR</code> to <code>AND</code> in BETWEEN.",
        remediation: { actionLabel: "Change 'OR' ➔ 'AND'", actionReplace: { from: /\bBETWEEN\s+([0-9'a-zA-Z_]+)\s+OR\s+/i, to: 'BETWEEN $1 AND ' } },
        severity: 'MEDIUM'
      });
    }

    // 10. LIKE with *
    if (/LIKE\s+'[^']*\*[^']*'/i.test(studentSql)) {
      diags.push({
        trapId: 'LIKE_WILDCARD_MISMATCH',
        badge: '🔍 Pattern Wildcard Mismatch',
        header: 'LIKE Wildcard Mismatch',
        explanation: 'In SQL <code>LIKE</code> clauses, use <code>%</code> for multi-character matching (not <code>*</code>).',
        actionableHint: "Change <code>*</code> to <code>%</code> in your LIKE string.",
        remediation: { actionLabel: "Change '*' ➔ '%'", actionReplace: { from: '*', to: '%' } },
        severity: 'MEDIUM'
      });
    }

    // 11. TOP vs LIMIT
    const topMatch = studentSql.match(/SELECT\s+TOP\s+([0-9]+)\s+/i);
    if (topMatch) {
      diags.push({
        trapId: 'SQL_SERVER_TOP_LIMIT',
        badge: '⚡ SQL Dialect Notice',
        header: 'TOP vs LIMIT Dialect Syntax',
        explanation: `<code>TOP</code> is SQL Server dialect. In SQLite and PostgreSQL, use <strong>LIMIT ${topMatch[1]}</strong> at the end of the query.`,
        actionableHint: `Convert <code>TOP ${topMatch[1]}</code> to <code>LIMIT ${topMatch[1]}</code>.`,
        remediation: {
          actionLabel: `Convert TOP ${topMatch[1]} ➔ LIMIT ${topMatch[1]}`,
          actionReplace: { from: new RegExp(`SELECT\\s+TOP\\s+${topMatch[1]}\\s+`, 'i'), to: 'SELECT ' },
          suggestedFix: `LIMIT ${topMatch[1]};`
        },
        severity: 'MEDIUM'
      });
    }

    // 12. Column Alias in HAVING Trap
    const havingMatch = studentSql.match(/HAVING\s+([\s\S]+?)(?:\s+(?:ORDER\s+BY|LIMIT)|;|$)/i);
    if (havingMatch) {
      const havingClause = havingMatch[1];
      const selectPart = (studentSql.match(/SELECT\s+([\s\S]+?)\s+FROM/i) || [])[1] || '';
      const aliasMatches = [...selectPart.matchAll(/\bAS\s+([a-zA-Z0-9_]+)\b/gi)];
      for (const m of aliasMatches) {
        const alias = m[1];
        const aliasRegex = new RegExp(`\\b${alias}\\b`, 'i');
        if (aliasRegex.test(havingClause)) {
          diags.push({
            trapId: 'ALIAS_IN_HAVING_CLAUSE',
            badge: '❌ Execution Order Trap: Alias in HAVING',
            header: 'Column Alias Used in HAVING Clause',
            explanation: `You used the column alias <code>${alias}</code> in your <code>HAVING</code> clause. Because <code>HAVING</code> evaluates at Step 4 before <code>SELECT</code> creates aliases at Step 5, aliases do not exist yet in standard SQL!`,
            actionableHint: `Replace <code>${alias}</code> in your <code>HAVING</code> clause with the full aggregate expression (e.g. <code>COUNT(*)</code> or <code>AVG(...)</code>).`,
            remediation: { actionLabel: `Repeat aggregate expression in HAVING` },
            severity: 'HIGH'
          });
          break;
        }
      }
    }

    return diags;
  }

  // ─────────────────────────────────────────────────────────────
  // 4. VISUAL DIFF FORMATTER
  // ─────────────────────────────────────────────────────────────

  function formatHtmlDiff(expected, actual) {
    const maxRows = 8;
    let html = '<div class="sql-visual-diff-wrap" style="font-family:Inter,monospace;font-size:12px;margin-top:10px;overflow-x:auto;">';
    html += '<table style="width:100%;border-collapse:collapse;text-align:left;background:#0d1117;border:1px solid rgba(255,255,255,0.1);border-radius:8px;overflow:hidden;">';
    html += '<thead><tr style="background:#161b22;border-bottom:1px solid #30363d;color:#8b949e;">';
    html += '<th style="padding:6px 10px;width:35px;">#</th>';
    html += '<th style="padding:6px 10px;width:45px;">Status</th>';

    const cols = expected.columns.length > 0 ? expected.columns : actual.columns;
    cols.forEach(c => { html += `<th style="padding:6px 10px;color:#c9d1d9;">${escHtml(c)}</th>`; });
    html += '</tr></thead><tbody>';

    const limit = Math.min(Math.max(expected.rowCount, actual.rowCount), maxRows);
    for (let r = 0; r < limit; r++) {
      const expRow = expected.rows[r];
      const actRow = actual.rows[r];

      if (expRow && actRow) {
        const isMatch = expRow.every((v, idx) => String(v).trim() === String(actRow[idx]).trim());
        html += `<tr style="border-bottom:1px solid #21262d;background:${isMatch ? 'transparent' : 'rgba(239,68,68,0.08)'};">`;
        html += `<td style="padding:6px 10px;color:#6e7681;">${r + 1}</td>`;
        html += `<td style="padding:6px 10px;">${isMatch ? '✅' : '⚠️'}</td>`;

        for (let c = 0; c < cols.length; c++) {
          const ev = expRow[c], av = actRow[c];
          if (String(ev).trim() === String(av).trim()) {
            html += `<td style="padding:6px 10px;color:#e6edf3;">${escHtml(fmtCell(av))}</td>`;
          } else {
            html += `<td style="padding:6px 10px;color:#f87171;background:rgba(239,68,68,0.15);border-radius:4px;">
              <span style="font-size:10px;color:#94a3b8;text-decoration:line-through;">${escHtml(fmtCell(av))}</span>
              <strong style="color:#34d399;margin-left:4px;">${escHtml(fmtCell(ev))}</strong>
            </td>`;
          }
        }
        html += '</tr>';
      } else if (expRow && !actRow) {
        html += '<tr style="border-bottom:1px solid #21262d;background:rgba(16,185,129,0.08);">';
        html += `<td style="padding:6px 10px;color:#6e7681;">${r + 1}</td>`;
        html += '<td style="padding:6px 10px;color:#34d399;">+ Missing</td>';
        expRow.forEach(v => { html += `<td style="padding:6px 10px;color:#34d399;font-weight:600;">+ ${escHtml(fmtCell(v))}</td>`; });
        html += '</tr>';
      } else if (!expRow && actRow) {
        html += '<tr style="border-bottom:1px solid #21262d;background:rgba(239,68,68,0.08);">';
        html += `<td style="padding:6px 10px;color:#6e7681;">${r + 1}</td>`;
        html += '<td style="padding:6px 10px;color:#f87171;">- Extra</td>';
        actRow.forEach(v => { html += `<td style="padding:6px 10px;color:#f87171;text-decoration:line-through;">- ${escHtml(fmtCell(v))}</td>`; });
        html += '</tr>';
      }
    }
    html += '</tbody></table></div>';
    return html;
  }

  function fmtCell(v) {
    if (v === null || v === undefined) return 'NULL';
    if (typeof v === 'number') return Number.isInteger(v) ? String(v) : v.toFixed(2);
    return String(v);
  }

  function escHtml(s) {
    if (s === null || s === undefined) return '';
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function formatMarkdownDiff(expected, actual, diff) {
    const maxRows = 10;
    const lines = [];
    lines.push('### 📊 Visual Result Set Comparison');
    lines.push('');

    const headers = ['#', 'Status', ...expected.columns];
    lines.push(`| ${headers.join(' | ')} |`);
    lines.push(`| ${headers.map(() => ':---').join(' | ')} |`);

    const limit = Math.min(Math.max(expected.rowCount, actual.rowCount), maxRows);
    for (let r = 0; r < limit; r++) {
      const expRow = expected.rows[r];
      const actRow = actual.rows[r];
      if (expRow && actRow) {
        const isMatch = expRow.every((v, idx) => String(v).trim() === String(actRow[idx]).trim());
        const statusIcon = isMatch ? '✅' : '⚠️';
        const formattedCells = expRow.map((v, idx) => {
          const actV = actRow[idx];
          if (String(v).trim() === String(actV).trim()) return fmtCell(actV);
          return `~~${fmtCell(actV)}~~ **${fmtCell(v)}**`;
        });
        lines.push(`| ${r + 1} | ${statusIcon} | ${formattedCells.join(' | ')} |`);
      } else if (expRow && !actRow) {
        lines.push(`| ${r + 1} | ❌ *(Missing)* | ${expRow.map(v => `**+ ${fmtCell(v)}**`).join(' | ')} |`);
      } else if (!expRow && actRow) {
        lines.push(`| ${r + 1} | ❌ *(Extra)* | ${actRow.map(v => `* - ${fmtCell(v)}*`).join(' | ')} |`);
      }
    }
    return lines.join('\n');
  }

  function formatAnsiDiff(expected, actual, diff) {
    const green = '\x1b[32m', red = '\x1b[31m', yellow = '\x1b[33m', cyan = '\x1b[36m', reset = '\x1b[0m', bold = '\x1b[1m';
    const lines = [`${cyan}${bold}=== RESULT SET DIFF ===${reset}`];
    const limit = Math.min(Math.max(expected.rowCount, actual.rowCount), 8);
    for (let r = 0; r < limit; r++) {
      const expRow = expected.rows[r], actRow = actual.rows[r];
      if (expRow && actRow) {
        const isMatch = expRow.every((v, idx) => String(v).trim() === String(actRow[idx]).trim());
        if (isMatch) lines.push(`[${r + 1}] OK: ${expRow.map(fmtCell).join(' | ')}`);
        else {
          lines.push(`${yellow}[${r + 1}] Mismatch:${reset}`);
          lines.push(`  ${green}+ Expected: ${expRow.map(fmtCell).join(' | ')}${reset}`);
          lines.push(`  ${red}- Actual:   ${actRow.map(fmtCell).join(' | ')}${reset}`);
        }
      } else if (expRow && !actRow) lines.push(`${green}[${r + 1}] + Expected: ${expRow.map(fmtCell).join(' | ')}${reset}`);
      else if (!expRow && actRow) lines.push(`${red}[${r + 1}] - Unexpected: ${actRow.map(fmtCell).join(' | ')}${reset}`);
    }
    return lines.join('\n');
  }

  function gradeSubmission(studentSql, question, db, edgeDb) {
    const refSql = question.ref || question.referenceSql || question.answer || '';
    const gradingRules = Object.assign({}, question.grading || {});
    if (gradingRules.orderSensitive === undefined) {
      gradingRules.orderSensitive = /\bORDER\s+BY\b/i.test(refSql);
    }

    const trimmed = (studentSql || '').trim();
    if (!trimmed || trimmed.startsWith('-- Write your answer') || trimmed.startsWith('-- Write your query')) {
      return {
        passed: false,
        status: 'SYNTAX_ERROR',
        score: 0,
        badge: '📝 Empty Submission',
        summary: 'Submission query is empty.',
        explanation: 'Please write your SQL solution query before submitting.',
        actionable_hint: 'Start with a SELECT statement.',
        error: 'Submission query is empty.'
      };
    }

    // Safety guard — allow DDL/DML when expected by question or on Day 17
    const isAllowedDml = question.allowDml || 
      (question.grading && question.grading.allowDml) || 
      /\b(DROP|ALTER|DELETE|UPDATE|TRUNCATE|CREATE|INSERT|TRANSACTION|SAVEPOINT|ROLLBACK)\b/i.test(refSql) ||
      (typeof COURSE_CONFIG !== 'undefined' && COURSE_CONFIG.dayId === 'day17');

    if (!isAllowedDml && /\b(DROP|ALTER|DELETE|UPDATE|TRUNCATE|ATTACH|PRAGMA)\b/i.test(trimmed)) {
      return {
        passed: false,
        status: 'EXECUTION_ERROR',
        score: 0,
        badge: '🛡️ Safety Guardrail Triggered',
        summary: 'Destructive SQL operation detected.',
        explanation: 'Only read-only SELECT and CTE queries are permitted in this sandbox.',
        actionable_hint: 'Write a SELECT query.',
        error: 'Unsafe statement detected.'
      };
    }

    // Layer 1: AST Analysis
    const astRes = parseSqlAst(studentSql);
    if (!astRes.valid && astRes.syntaxError) {
      return {
        passed: false,
        status: 'SYNTAX_ERROR',
        score: 0,
        badge: '⚡ Syntax Error',
        summary: astRes.syntaxError.message,
        explanation: astRes.syntaxError.visualPointer,
        actionable_hint: 'Check syntax near the caret pointer.',
        error: astRes.syntaxError.message
      };
    }

    const structCheck = validateStructuralConstraints(astRes.ast, gradingRules);
    if (!structCheck.passed) {
      const v = structCheck.violations[0];
      return {
        passed: false,
        status: 'STRUCTURAL_MISMATCH',
        score: 0,
        badge: '⚠️ Structural Requirement Missing',
        summary: v.message,
        explanation: `Expected construct: <strong>${v.expected}</strong> (Found: ${v.actual}).`,
        actionable_hint: v.message,
        error: v.message
      };
    }

    // Layer 2: Sandbox Execution
    if (db && !/CREATE\s+TABLE/i.test(refSql) && !/CREATE\s+TABLE/i.test(studentSql) && (/product_reviews/i.test(refSql) || /product_reviews/i.test(studentSql))) {
      try {
        db.exec("CREATE TABLE IF NOT EXISTS product_reviews (review_id INTEGER PRIMARY KEY AUTOINCREMENT, product_id INTEGER NOT NULL, customer_id INTEGER NOT NULL, rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5), review_text TEXT, review_date TEXT DEFAULT (date('now')));");
      } catch (e) {}
    }
    let refRaw, stuRaw;
    if (db) { try { db.exec('ROLLBACK;'); } catch (e) {} }
    const hasExplicitTx = /\bBEGIN\s+(?:TRANSACTION|DEFERRED|IMMEDIATE|EXCLUSIVE)\b/i.test(refSql) || /\bBEGIN\s+(?:TRANSACTION|DEFERRED|IMMEDIATE|EXCLUSIVE)\b/i.test(studentSql);
    const needsIsolation = !hasExplicitTx && (isAllowedDml || /\b(DROP|ALTER|DELETE|UPDATE|CREATE|INSERT|TRANSACTION)\b/i.test(refSql) || /\b(DROP|ALTER|DELETE|UPDATE|CREATE|INSERT|TRANSACTION)\b/i.test(studentSql));

    if (needsIsolation && db) {
      try { db.exec('SAVEPOINT manodemy_ref;'); } catch (e) {}
    }
    try {
      refRaw = db.exec(refSql);
    } catch (e) {
      if (needsIsolation && db) {
        try { db.exec('ROLLBACK TO manodemy_ref; RELEASE manodemy_ref;'); } catch (rbErr) {}
      }
      return {
        passed: false,
        status: 'EXECUTION_ERROR',
        score: 0,
        badge: '🔧 Reference Query Error',
        summary: 'Reference query failed.',
        explanation: e.message,
        error: e.message
      };
    }
    if (needsIsolation && db) {
      try { db.exec('ROLLBACK TO manodemy_ref;'); } catch (e) {}
      try { db.exec('RELEASE manodemy_ref;'); } catch (e) {}
    }

    if (needsIsolation && db) {
      try { db.exec('SAVEPOINT manodemy_stu;'); } catch (e) {}
    }
    try {
      stuRaw = db.exec(studentSql);
    } catch (e) {
      if (needsIsolation && db) {
        try { db.exec('ROLLBACK TO manodemy_stu; RELEASE manodemy_stu;'); } catch (rbErr) {}
      }
      const diags = runDiagnostics(studentSql, refSql, null, null, e.message);
      const top = diags[0];
      return {
        passed: false,
        status: top ? 'TRAP_CAUGHT' : 'EXECUTION_ERROR',
        score: 0,
        badge: top ? top.badge : '❌ Runtime Error',
        summary: top ? top.header : e.message,
        explanation: top ? top.explanation : e.message,
        actionable_hint: top ? top.actionableHint : 'Check your query syntax.',
        remediation: top?.remediation || null,
        error: e.message
      };
    }
    if (needsIsolation && db) {
      try { db.exec('ROLLBACK TO manodemy_stu;'); } catch (e) {}
      try { db.exec('RELEASE manodemy_stu;'); } catch (e) {}
    }

    const ref = normalizeResult(refRaw);
    const stu = normalizeResult(stuRaw);

    const baseComp = compareResultSets(ref, stu, gradingRules);

    let edgeComp = { passed: true, diff: null };
    if (edgeDb) {
      try {
        const refEdge = normalizeResult(edgeDb.exec(refSql));
        const stuEdge = normalizeResult(edgeDb.exec(studentSql));
        edgeComp = compareResultSets(refEdge, stuEdge, gradingRules);
      } catch (err) {}
    }

    const isPassed = baseComp.passed && edgeComp.passed;
    const diags = runDiagnostics(studentSql, refSql, stu, ref, null);
    const activeTrap = isPassed 
      ? diags.find(d => d.severity === 'HIGH') 
      : (diags.find(d => d.severity === 'HIGH') || diags[0]);

    const htmlDiff = formatHtmlDiff(ref, stu);
    const mdDiff = formatMarkdownDiff(ref, stu, baseComp.diff || edgeComp.diff);
    const ansiDiff = formatAnsiDiff(ref, stu, baseComp.diff || edgeComp.diff);

    if (!isPassed || (activeTrap && activeTrap.severity === 'HIGH')) {
      const diff = baseComp.diff || edgeComp.diff;

      let badge = '⚠️ Result Mismatch';
      let summary = diff?.summary || 'Output diverged from expected dataset.';
      let explanation = 'Your query ran successfully but returned different results than expected.';
      let hint = 'Review your WHERE filter bounds or JOIN conditions.';

      if (activeTrap) {
        badge = activeTrap.badge;
        summary = activeTrap.header;
        explanation = activeTrap.explanation;
        hint = activeTrap.actionableHint;
      }

      return {
        passed: false,
        status: activeTrap ? 'TRAP_CAUGHT' : 'SEMANTIC_MISMATCH',
        score: 0,
        badge,
        summary,
        explanation,
        actionable_hint: hint,
        diagnostics: diags,
        diff,
        visual_diff_html: htmlDiff,
        visual_diff_markdown: mdDiff,
        visual_diff_ansi: ansiDiff,
        remediation: activeTrap?.remediation || null,
        error: summary
      };
    }

    // SUCCESS
    return {
      passed: true,
      status: 'PASSED',
      score: 1.0,
      badge: '✨ Solution Verified: 100% Accurate',
      summary: `Query passed all invariant checks across ${stu.rowCount} rows.`,
      explanation: 'Great job! Your SQL solution satisfies all structural invariants and result checks.',
      actionable_hint: 'Ready for the next challenge!',
      diff: null,
      visual_diff_html: htmlDiff,
      visual_diff_markdown: mdDiff,
      visual_diff_ansi: ansiDiff,
      remediation: null
    };
  }

  return {
    gradeSubmission,
    tokenizeSql,
    parseSqlAst,
    validateStructuralConstraints,
    compareResultSets,
    runDiagnostics
  };
});
