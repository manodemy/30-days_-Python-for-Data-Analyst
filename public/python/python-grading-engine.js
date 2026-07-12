// ═══════════════════════════════════════════════════════════════
// MANODEMY — PYTHON GRADING ENGINE
// Validates student Pyodide submissions against a validation schema.
//
// Validation schema (per test question):
//   validation: {
//     mode: "variable_check" | "stdout_contains" | "both",
//     checkVars: [
//       { name: "result", type: "float", tolerance: 0.001 },
//       { name: "is_leap", type: "bool" },
//       { name: "result", type: "string", value: "some expected string" },
//       { name: "result", type: "list", value: [1,2,3] },
//       { name: "result", type: "int", value: 42 },
//     ],
//     stdoutContains: "expected substring"  // only for stdout_contains mode
//   }
// ═══════════════════════════════════════════════════════════════

(function () {
  'use strict';

  /**
   * Grade a Python submission.
   * @param {string} studentCode - Code typed by the student
   * @param {object} question    - The question object (must have .validation and .ref)
   * @param {object} pyodide     - The live Pyodide instance
   * @returns {Promise<{passed:boolean, score:number, message:string, stdout:string}>}
   */
  async function gradeSubmission(studentCode, question, pyodide) {
    const result = { passed: false, score: 0, message: '', stdout: '' };

    if (!studentCode || studentCode.trim() === '' || studentCode.trim() === '# Write your answer here') {
      result.message = 'Submission is empty. Write your Python code and try again.';
      return result;
    }

    // ── Run the student's code, capturing stdout ──
    let stdout = '';
    let runError = null;
    try {
      // Redirect stdout/stderr
      await pyodide.runPythonAsync(`
import sys, io as _io
sys.stdout = _io.StringIO()
sys.stderr = sys.stdout
`);
      await pyodide.runPythonAsync(studentCode);
      stdout = String(await pyodide.runPythonAsync(`sys.stdout.getvalue()`));
    } catch (err) {
      runError = err;
    }

    result.stdout = stdout;

    if (runError) {
      result.message = `⚠️ Runtime Error: ${runError.message}`;
      return result;
    }

    // ── Apply validation schema ──
    const v = question.validation;

    if (!v) {
      // No schema → pass if no error (open sandbox mode)
      result.passed = true;
      result.score = 1.0;
      result.message = '✅ Code ran without errors.';
      return result;
    }

    const mode = v.mode || 'variable_check';

    // ── Mode: stdout_contains ──
    if (mode === 'stdout_contains') {
      const expected = (v.stdoutContains || '').trim().toLowerCase();
      const actual = stdout.trim().toLowerCase();
      if (actual.includes(expected)) {
        result.passed = true;
        result.score = 1.0;
        result.message = `✅ Output contains expected content.`;
      } else {
        result.message = `❌ Expected output to contain: "${v.stdoutContains}"\nGot: "${stdout.trim()}"`;
      }
      return result;
    }

    // ── Mode: variable_check (default) ──
    if (mode === 'variable_check' || mode === 'both') {
      if (!v.checkVars || v.checkVars.length === 0) {
        result.passed = true;
        result.score = 1.0;
        result.message = '✅ Code ran without errors.';
        return result;
      }

      const failures = [];

      for (const cv of v.checkVars) {
        let actualVal;
        try {
          const raw = pyodide.globals.get(cv.name);
          // Convert Pyodide proxy to JS value
          if (raw && typeof raw.toJs === 'function') {
            actualVal = raw.toJs({ dict_converter: Object.fromEntries });
          } else {
            actualVal = raw;
          }
        } catch (e) {
          failures.push(`Variable <code>${cv.name}</code> not found — did you assign the result?`);
          continue;
        }

        if (actualVal === undefined || actualVal === null) {
          failures.push(`Variable <code>${cv.name}</code> is undefined or None.`);
          continue;
        }

        const check = checkVariable(cv, actualVal);
        if (!check.ok) {
          failures.push(`<code>${cv.name}</code>: ${check.reason}`);
        }
      }

      if (failures.length === 0) {
        // Also check stdout if mode is 'both'
        if (mode === 'both' && v.stdoutContains) {
          const expected = v.stdoutContains.trim().toLowerCase();
          if (!stdout.trim().toLowerCase().includes(expected)) {
            result.message = `❌ Variable check passed but output check failed.\nExpected output to contain: "${v.stdoutContains}"`;
            return result;
          }
        }
        result.passed = true;
        result.score = 1.0;
        result.message = `✅ All checks passed!`;
      } else {
        result.message = `❌ ${failures.join('<br>')}`;
      }

      return result;
    }

    // ── Fallback: pass on no errors ──
    result.passed = true;
    result.score = 1.0;
    result.message = '✅ Code ran without errors.';
    return result;
  }

  /**
   * Check a single variable against its expected value/type.
   */
  function checkVariable(cv, actual) {
    const type = cv.type;

    if (type === 'float') {
      const a = parseFloat(actual);
      if (isNaN(a)) return { ok: false, reason: `Expected a float, got ${JSON.stringify(actual)}` };
      const tol = cv.tolerance != null ? cv.tolerance : 0.001;
      if (cv.value != null) {
        if (Math.abs(a - cv.value) > tol) {
          return { ok: false, reason: `Expected ≈${cv.value} (±${tol}), got ${a}` };
        }
      }
      return { ok: true };
    }

    if (type === 'int') {
      const a = parseInt(actual, 10);
      if (isNaN(a)) return { ok: false, reason: `Expected an int, got ${JSON.stringify(actual)}` };
      if (cv.value != null && a !== cv.value) {
        return { ok: false, reason: `Expected ${cv.value}, got ${a}` };
      }
      return { ok: true };
    }

    if (type === 'bool') {
      // Pyodide returns Python booleans as JS booleans
      const a = actual === true || actual === 1 || actual === 'True';
      const e = cv.value !== undefined ? (cv.value === true || cv.value === 1 || cv.value === 'True') : null;
      if (e !== null && a !== e) {
        return { ok: false, reason: `Expected ${e ? 'True' : 'False'}, got ${a ? 'True' : 'False'}` };
      }
      return { ok: true };
    }

    if (type === 'string') {
      const a = String(actual).trim();
      if (cv.value != null) {
        const e = String(cv.value).trim();
        // Substring match for flexibility
        if (!a.includes(e) && a.toLowerCase() !== e.toLowerCase()) {
          return { ok: false, reason: `Expected "${e}", got "${a}"` };
        }
      }
      return { ok: true };
    }

    if (type === 'list' || type === 'array') {
      if (!Array.isArray(actual)) {
        return { ok: false, reason: `Expected a list, got ${typeof actual}` };
      }
      if (cv.value != null) {
        const expected = JSON.stringify(cv.value);
        const got = JSON.stringify(actual);
        if (expected !== got) {
          return { ok: false, reason: `Expected ${expected}, got ${got}` };
        }
      }
      if (cv.length != null && actual.length !== cv.length) {
        return { ok: false, reason: `Expected list of length ${cv.length}, got ${actual.length}` };
      }
      return { ok: true };
    }

    if (type === 'dict') {
      if (typeof actual !== 'object' || Array.isArray(actual)) {
        return { ok: false, reason: `Expected a dict, got ${typeof actual}` };
      }
      if (cv.keys != null) {
        for (const k of cv.keys) {
          if (!(k in actual)) {
            return { ok: false, reason: `Dict missing key: "${k}"` };
          }
        }
      }
      return { ok: true };
    }

    if (type === 'set') {
      // Pyodide sets come as JS Set objects or arrays
      const asArr = Array.isArray(actual) ? actual : (actual instanceof Set ? Array.from(actual) : null);
      if (!asArr) return { ok: false, reason: `Expected a set, got ${typeof actual}` };
      if (cv.value != null) {
        const expected = [...cv.value].sort().toString();
        const got = [...asArr].sort().toString();
        if (expected !== got) {
          return { ok: false, reason: `Expected {${expected}}, got {${got}}` };
        }
      }
      return { ok: true };
    }

    if (type === 'truthy') {
      if (!actual) return { ok: false, reason: `Expected a truthy value, got ${JSON.stringify(actual)}` };
      return { ok: true };
    }

    if (type === 'falsy') {
      if (actual) return { ok: false, reason: `Expected a falsy value, got ${JSON.stringify(actual)}` };
      return { ok: true };
    }

    if (type === 'any') {
      // Just check variable exists and is not None/undefined
      return { ok: true };
    }

    // Unknown type — pass
    return { ok: true };
  }

  // Attach to window
  window.pyGradeSubmission = gradeSubmission;

})();
