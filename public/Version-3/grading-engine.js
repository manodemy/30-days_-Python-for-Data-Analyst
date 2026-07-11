// ═══════════════════════════════════════════════════════════════
// MANODEMY GRADED TEST ENGINE (RESULT-SET COMPARISON)
// ═══════════════════════════════════════════════════════════════

(function() {
  'use strict';

  // Core grading function
  function gradeSubmission(studentSQL, question, db) {
    const result = { passed: false, score: 0, diff: null, error: null };

    if (!studentSQL || studentSQL.trim() === '' || studentSQL.trim() === '-- Write your answer here' || studentSQL.trim() === '-- Write your query here\n') {
      result.error = 'Submission query is empty.';
      return result;
    }

    // 1. SAFETY CHECK
    const dangerous = /\b(DROP|ALTER|DELETE|UPDATE|TRUNCATE|ATTACH|PRAGMA)\b/i;
    if (dangerous.test(studentSQL)) {
      result.error = 'Unsafe statement detected. Only SELECT queries are allowed in this sandbox.';
      return result;
    }

    let refResult = null;
    let studentResult = null;

    // 2. EXECUTE REFERENCE
    try {
      refResult = db.exec(question.ref || question.referenceSql);
    } catch (e) {
      result.error = `Internal Error: Reference query failed. ${e.message}`;
      return result;
    }

    // 3. EXECUTE STUDENT
    try {
      studentResult = db.exec(studentSQL);
    } catch (e) {
      result.error = e.message;
      return result;
    }

    // 4. NORMALIZE RESULT SETS
    const ref = normalizeResult(refResult);
    const stu = normalizeResult(studentResult);

    // 5. EVALUATE DIFFERENCES
    const grading = question.grading || {};

    // 5a. Column counts must match
    if (ref.columns.length !== stu.columns.length) {
      result.diff = {
        type: 'column_count_mismatch',
        expected: ref.columns.length,
        actual: stu.columns.length
      };
      return result;
    }

    // 5b. Column names check (if sensitive)
    if (grading.columnNameSensitive) {
      for (let i = 0; i < ref.columns.length; i++) {
        if (ref.columns[i].toLowerCase() !== stu.columns[i].toLowerCase()) {
          result.diff = {
            type: 'column_name_mismatch',
            index: i,
            expected: ref.columns[i],
            actual: stu.columns[i]
          };
          return result;
        }
      }
    }

    // 5c. Row counts must match
    if (ref.rows.length !== stu.rows.length) {
      result.diff = {
        type: 'row_count_mismatch',
        expected: ref.rows.length,
        actual: stu.rows.length
      };
      return result;
    }

    // 5d. Compare rows
    // Sort rows for order-insensitive questions
    const sortFn = (a, b) => a.join('|').localeCompare(b.join('|'));
    const refRows = grading.orderSensitive ? ref.rows : [...ref.rows].sort(sortFn);
    const stuRows = grading.orderSensitive ? stu.rows : [...stu.rows].sort(sortFn);

    const mismatches = [];
    for (let r = 0; r < refRows.length; r++) {
      for (let c = 0; c < refRows[r].length; c++) {
        const ev = refRows[r][c];
        const av = stuRows[r][c];
        if (!cellsMatch(ev, av)) {
          mismatches.push({
            row: r,
            col: c,
            expectedName: ref.columns[c],
            expected: ev,
            actual: av
          });
        }
      }
    }

    if (mismatches.length > 0) {
      result.diff = {
        type: 'value_mismatch',
        mismatches: mismatches
      };
      return result;
    }

    result.passed = true;
    result.score = 1.0;
    return result;
  }

  // Compare single cell values with numeric float tolerance and NULL-safe logic
  function cellsMatch(a, b) {
    if (a === null && b === null) return true;
    if (a === null || b === null) return false;

    const sa = String(a).trim();
    const sb = String(b).trim();

    if (sa === sb) return true;

    // Numeric comparison with epsilon (0.01) tolerance
    const na = parseFloat(sa);
    const nb = parseFloat(sb);
    if (!isNaN(na) && !isNaN(nb)) {
      return Math.abs(na - nb) < 0.01;
    }

    return false;
  }

  // Convert sql.js output format to simple columns & rows arrays
  function normalizeResult(res) {
    if (!res || res.length === 0) {
      return { columns: [], rows: [] };
    }
    return {
      columns: res[0].columns || [],
      rows: res[0].values || []
    };
  }

  // Attach to window global namespace
  window.gradeSubmission = gradeSubmission;

})();
