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
   * @param {object} [execOut]   - The pre-computed execution result { stdout, stderr, error }
   * @returns {Promise<{passed:boolean, score:number, message:string, stdout:string}>}
   */
  async function gradeSubmission(studentCode, question, pyodide, execOut) {
    const result = { passed: false, score: 0, message: '', stdout: '' };

    if (!studentCode || studentCode.trim() === '' || studentCode.trim() === '# Write your answer here') {
      result.message = 'Submission is empty. Write your Python code and try again.';
      return result;
    }

    // ── Run or consume student execution output ──
    let stdout = '';
    let runError = null;

    if (execOut) {
      stdout = execOut.stdout || '';
      if (execOut.error && execOut.stderr) {
        const lastErrLine = execOut.stderr.split('\n').filter(l => l.trim()).pop() || execOut.stderr;
        runError = new Error(lastErrLine);
      }
    } else {
      try {
        if (question.validation?.freshResults) {
          for (const { name } of question.validation.checkVars || []) {
            if (pyodide.globals.has(name)) pyodide.globals.delete(name);
          }
        }
        pyodide.globals.set('__student_code__', studentCode);
        await pyodide.runPythonAsync(`
import sys, io as _io, ast as _ast
_buf = _io.StringIO()
_old = sys.stdout
sys.stdout = _buf
try:
    _p = _ast.parse(__student_code__)
    if _p.body and isinstance(_p.body[-1], _ast.Expr):
        if len(_p.body) > 1:
            exec(compile(_ast.Module(body=_p.body[:-1], type_ignores=[]), '<sub_code>', 'exec'), globals())
        _v = eval(compile(_ast.Expression(_p.body[-1].value), '<sub_code>', 'eval'), globals())
        if _v is not None:
            print(_v)
    else:
        exec(compile(_p, '<sub_code>', 'exec'), globals())
finally:
    sys.stdout = _old
`);
        stdout = String(await pyodide.runPythonAsync(`_buf.getvalue()`));
      } catch (err) {
        runError = err;
      }
    }

    result.stdout = stdout;

    if (runError) {
      result.message = `⚠️ Runtime Error: ${runError.message || String(runError)}`;
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
      
      // 1. Exact substring match
      if (actual.includes(expected)) {
        result.passed = true;
        result.score = 1.0;
        result.message = `✅ Output matches expected result!`;
        return result;
      }

      // 2. Resilient punctuation match (e.g. omitting or adding trailing '!' or '.')
      const expectedNorm = expected.replace(/[!.,;:]+$/, '').trim();
      const actualNorm = actual.replace(/[!.,;:]+$/, '').trim();
      if (expectedNorm && actualNorm.includes(expectedNorm)) {
        result.passed = true;
        result.score = 1.0;
        result.message = `✅ Output matches expected result!`;
        return result;
      }

      result.message = `❌ Expected output to contain: "${v.stdoutContains}"\nGot: "${stdout.trim()}"`;
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
        let existsInPython = false;
        try {
          existsInPython = Boolean(pyodide.runPython(`'${cv.name}' in globals()`));
        } catch (e) {
          existsInPython = false;
        }

        if (!existsInPython) {
          failures.push(`Variable <code>${cv.name}</code> not found — did you create and assign it?`);
          continue;
        }

        if (cv.exact) {
          const expectedType = {
            string: 'str',
            bool: 'bool',
            int: 'int',
            list: 'list',
            tuple: 'tuple',
            float: 'float',
            dict: 'dict',
            set: 'set',
            array: 'list'
          }[cv.type];
          const actualType = String(pyodide.runPython('type(' + cv.name + ').__name__'));
          if (expectedType && expectedType !== actualType) {
            failures.push('Incorrect Python type for <code>' + cv.name + '</code>.');
            continue;
          }
        }

        if (cv.type === 'none') {
          let isNone = false;
          try {
            isNone = Boolean(pyodide.runPython(`${cv.name} is None`));
          } catch (e) {
            isNone = false;
          }
          if (isNone) {
            continue; // Correctly assigned None!
          } else {
            failures.push(`<code>${cv.name}</code>: Expected None, but got a different value.`);
            continue;
          }
        }

        let actualVal;
        try {
          const raw = pyodide.globals.get(cv.name);
          // Convert Pyodide proxy to JS value
          if (raw && typeof raw.toJs === 'function') {
            try {
              actualVal = raw.toJs({ dict_converter: Object.fromEntries });
            } catch (_) {
              try {
                actualVal = raw.toJs();
              } catch (__) {
                actualVal = raw;
              }
            }
          } else {
            actualVal = raw;
          }
        } catch (e) {
          failures.push(`Variable <code>${cv.name}</code> could not be read.`);
          continue;
        }

        if ((actualVal === undefined || actualVal === null) && cv.type !== 'falsy' && cv.type !== 'none') {
          failures.push(`Variable <code>${cv.name}</code> is undefined or None.`);
          continue;
        }

        if (cv.type === 'tuple') {
          let isTuple = false;
          try {
            const pyType = String(pyodide.runPython(`type(${cv.name}).__name__`));
            isTuple = (pyType === 'tuple');
          } catch (e) {
            isTuple = Array.isArray(actualVal);
          }
          if (!isTuple) {
            failures.push(`<code>${cv.name}</code>: Expected a tuple (), got ${typeof actualVal}`);
            continue;
          }
        }

        if (cv.type === 'set') {
          let isSet = false;
          try {
            const pyType = String(pyodide.runPython(`type(${cv.name}).__name__`));
            isSet = (pyType === 'set');
          } catch (e) {
            isSet = actualVal instanceof Set || Array.isArray(actualVal);
          }
          if (!isSet) {
            failures.push(`<code>${cv.name}</code>: Expected a set {}, got ${typeof actualVal}`);
            continue;
          }
        }

        if (cv.type === 'dict') {
          let isDict = false;
          try {
            const pyType = String(pyodide.runPython(`type(${cv.name}).__name__`));
            isDict = (pyType === 'dict' || pyType === 'defaultdict' || pyType.toLowerCase().includes('dict'));
          } catch (e) {
            isDict = (typeof actualVal === 'object' || actualVal instanceof Map) && !Array.isArray(actualVal);
          }
          if (!isDict) {
            failures.push(`<code>${cv.name}</code>: Expected a dict {}, got ${typeof actualVal}`);
            continue;
          }
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
          const actual = stdout.trim().toLowerCase();
          const expectedNorm = expected.replace(/[!.,;:]+$/, '').trim();
          const actualNorm = actual.replace(/[!.,;:]+$/, '').trim();
          if (!actual.includes(expected) && (!expectedNorm || !actualNorm.includes(expectedNorm))) {
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
    // Lessons about exact text opt in; earlier rubrics retain their tolerance.
    if (cv.exact === true) {
      const rightType = type === 'string' ? typeof actual === 'string'
        : type === 'bool' ? typeof actual === 'boolean'
        : type === 'int' ? typeof actual === 'number' && Number.isInteger(actual)
        : type === 'float' ? typeof actual === 'number'
        : (type === 'list' || type === 'tuple' || type === 'array') ? Array.isArray(actual)
        : type === 'dict' ? typeof actual === 'object' && actual !== null && !Array.isArray(actual)
        : type === 'set' ? (actual instanceof Set || Array.isArray(actual))
        : false;
      if (!rightType || (cv.value !== undefined && JSON.stringify(actual) !== JSON.stringify(cv.value))) {
        return { ok: false, reason: 'The value must match exactly, including type, case and spacing.' };
      }
      return { ok: true };
    }

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
      if (typeof actual !== 'boolean') {
        return { ok: false, reason: `Expected a boolean (True or False), got ${typeof actual}` };
      }
      if (cv.value !== undefined) {
        const expectedBool = (cv.value === true || cv.value === 'true' || cv.value === 1);
        if (actual !== expectedBool) {
          return { ok: false, reason: `Expected ${expectedBool ? 'True' : 'False'}, got ${actual ? 'True' : 'False'}` };
        }
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

    if (type === 'list' || type === 'array' || type === 'tuple') {
      if (!Array.isArray(actual)) {
        return { ok: false, reason: `Expected a ${type}, got ${typeof actual}` };
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
      if ((typeof actual !== 'object' && !(actual instanceof Map)) || Array.isArray(actual)) {
        return { ok: false, reason: `Expected a dict, got ${typeof actual}` };
      }
      if (cv.keys != null) {
        for (const k of cv.keys) {
          const hasKey = (actual instanceof Map) ? actual.has(k) : (k in actual);
          if (!hasKey) {
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
