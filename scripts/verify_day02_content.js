/**
 * Day 02 content verification.
 *
 * Proves every authored `validation` block accepts its own reference solution by
 * running the real python-grading-engine.js check logic against the values the
 * reference solution actually produces. A validation that rejects the reference
 * answer is worse than having no validation at all.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
global.window = {};
require(path.join(ROOT, 'public', 'python', 'content', 'py-day-02.js'));
const qs = global.window.COURSE_CONTENT.pyDay02.practiceQuestions;

// Pull the grader's own comparison helper out of the engine so we exercise the
// real semantics rather than a re-implementation. Brace-match the declaration
// so no trailing module code is captured.
const engineSrc = fs.readFileSync(path.join(ROOT, 'public', 'python', 'python-grading-engine.js'), 'utf8');
const fnStart = engineSrc.indexOf('function checkVariable');
if (fnStart === -1) throw new Error('checkVariable not found in python-grading-engine.js');
let depth = 0, fnEnd = -1, started = false;
for (let i = engineSrc.indexOf('{', fnStart); i < engineSrc.length; i++) {
  const ch = engineSrc[i];
  if (ch === '{') { depth++; started = true; }
  else if (ch === '}') {
    depth--;
    if (started && depth === 0) { fnEnd = i + 1; break; }
  }
}
const fnSrc = engineSrc.slice(fnStart, fnEnd);
const checkVariable = vm.runInNewContext('(' + fnSrc + ')', {});

const SUPPORTED = new Set(['none', 'int', 'float', 'bool', 'string', 'list', 'array',
  'tuple', 'dict', 'set', 'truthy', 'falsy', 'any']);

let fails = 0, checks = 0;
function ok(label, cond, detail) {
  checks++;
  if (cond) console.log('  PASS  ' + label);
  else { fails++; console.log(`  FAIL  ${label}${detail ? ' — ' + detail : ''}`); }
}

console.log('Day 02 content verification\n');
console.log('[1] Structure');
ok('20 practice questions', qs.length === 20, String(qs.length));
ok('25 test questions', (global.window.COURSE_CONTENT.pyDay02.testQuestions || []).length === 25);
ok('single continuous slide', global.window.COURSE_CONTENT.pyDay02.slides.length === 1);

console.log('\n[2] Every question has a validation with supported types');
qs.forEach(q => {
  const v = q.validation;
  ok(`Q${q.id} has validation`, !!(v && v.mode), JSON.stringify(v || null));
  if (!v || !v.checkVars) return;
  v.checkVars.forEach(cv => {
    ok(`Q${q.id} checkVar "${cv.name}" type "${cv.type}" is supported`,
      SUPPORTED.has(cv.type));
  });
});

console.log('\n[3] checkVars resolve against the reference solution');
const { execFileSync } = require('child_process');

// Ask Python to emit real JSON (sets -> arrays, tuples -> arrays), which is what
// Pyodide's toJs() hands the grader. Parsing a Python repr here would
// misrepresent tuples and sets and produce false failures.
const probe = `
import json, sys, io, contextlib, types
src = json.loads(sys.stdin.read())
g = {}
# The reference solutions print; swallow that so stdout carries only our JSON.
with contextlib.redirect_stdout(io.StringIO()):
    exec(src, g)

def norm(v):
    if isinstance(v, types.ModuleType):
        return None
    if isinstance(v, (set, frozenset)):
        return sorted(x for x in v if isinstance(x, (int, float, str)))
    if isinstance(v, tuple):
        return [norm(x) for x in v]
    if isinstance(v, list):
        return [norm(x) for x in v]
    if isinstance(v, dict):
        return {str(k): norm(x) for k, x in v.items()}
    return v

out = {k: norm(v) for k, v in g.items()
       if not k.startswith('__') and not callable(v) and not isinstance(v, types.ModuleType)}
sys.stdout.write(json.dumps(out, default=str))
`;

qs.forEach(q => {
  const v = q.validation;
  if (!v || !v.checkVars) return;

  let vals;
  try {
    const r = execFileSync('python', ['-c', probe],
      { input: JSON.stringify(q.ref), encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] });
    vals = JSON.parse(r);
  } catch (e) {
    const msg = (e.stderr || e.message || String(e)).toString();
    ok(`Q${q.id} reference solution executes`, false, msg.slice(-100));
    return;
  }

  v.checkVars.forEach(cv => {
    const has = Object.prototype.hasOwnProperty.call(vals, cv.name);
    ok(`Q${q.id} "${cv.name}" exists after running the reference`, has,
      `defined: ${Object.keys(vals).slice(0, 8).join(', ')}`);
    if (!has) return;
    // Mirror the grader's pre-checks before calling checkVariable.
    if (['tuple', 'set', 'dict'].includes(cv.type)) {
      const expect = cv.type === 'dict' ? 'object' : 'array';
      const isObj = typeof vals[cv.name] === 'object' && vals[cv.name] !== null;
      const okKind = cv.type === 'dict' ? isObj && !Array.isArray(vals[cv.name]) : Array.isArray(vals[cv.name]);
      ok(`Q${q.id} "${cv.name}" arrives at the grader as a ${expect}`, okKind,
        `got ${typeof vals[cv.name]}`);
      if (!okKind) return;
    }
    if (vals[cv.name] === undefined || vals[cv.name] === null) {
      ok(`Q${q.id} "${cv.name}" is readable`, false, 'undefined or None');
      return;
    }
    const res = checkVariable(cv, vals[cv.name]);
    ok(`Q${q.id} "${cv.name}" accepts the reference value`, res.ok, res.reason);
  });
});

console.log('\n[3b] test questions checkVars resolve against reference solutions');
const tqs = global.window.COURSE_CONTENT.pyDay02.testQuestions || [];
tqs.forEach(q => {
  const v = q.validation;
  if (!v || !v.checkVars || !q.ref) return;

  let vals;
  try {
    const r = execFileSync('python', ['-c', probe],
      { input: JSON.stringify(q.ref), encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] });
    vals = JSON.parse(r);
  } catch (e) {
    const msg = (e.stderr || e.message || String(e)).toString();
    ok(`Test Q${q.id} reference solution executes`, false, msg.slice(-100));
    return;
  }

  v.checkVars.forEach(cv => {
    const has = Object.prototype.hasOwnProperty.call(vals, cv.name);
    ok(`Test Q${q.id} "${cv.name}" exists after running reference`, has);
    if (!has) return;
    const res = checkVariable(cv, vals[cv.name]);
    ok(`Test Q${q.id} "${cv.name}" accepts the reference value`, res.ok, res.reason);
  });
});

console.log('\n[4] Visual Design System & Narration Sync Parity');
const EXPECTED = { headings: 10, audioButtons: 18, interviewQuestions: 25 };

const html = global.window.COURSE_CONTENT.pyDay02.slides[0].html;
const mark = html.replace(/<style>[\s\S]*?<\/style>/g, '');
const headings = [...mark.matchAll(/id="(heading\w+)"/g)].map(m => m[1]);
ok(`${EXPECTED.headings} major section headings present`, headings.length === EXPECTED.headings,
  String(headings.length));
ok('Fundamentals section and master classification present',
  mark.includes('id="headingFundamentals"') && mark.includes('Complete Python Operator Classification Matrix'));
ok('Precedence hierarchy table present (day02PrecedenceTableSection)',
  mark.includes('id="day02PrecedenceTableSection"') && mark.includes('Operator Precedence Hierarchy Table'));
ok('Master reference tables in db-mock-table-wrap',
  (mark.match(/class="db-mock-table-wrap"/g) || []).length >= 6);
ok(`All ${EXPECTED.interviewQuestions} FAANG interview questions present`,
  [...Array(EXPECTED.interviewQuestions).keys()].every(i => mark.includes(`id="pyDay02IQ${i + 1}"`)));
ok(`exactly ${EXPECTED.audioButtons} audio buttons (no duplicates)`,
  (mark.match(/class="audio-play-btn"/g) || []).length === EXPECTED.audioButtons);
ok('no inline styles remain (class-driven like Day 01)',
  (mark.match(/style="/g) || []).length === 0,
  `found ${(mark.match(/style="/g) || []).length} inline style tags`);
const numBox = (mark.match(/heading-num-box/g) || []).length;
const titleBox = (mark.match(/heading-title-box/g) || []).length;
ok('Day 01 dual-box heading architecture adopted',
  numBox === EXPECTED.headings && titleBox === EXPECTED.headings,
  `numBox=${numBox} titleBox=${titleBox}`);

const engineJs = fs.readFileSync(path.join(ROOT, 'public', 'python', 'python-engine.js'), 'utf8');
const targets = [...engineJs.matchAll(/"target":\s*"(#day02\w+)"/g)].map(m => m[1]);
const missing = targets.filter(t => !html.includes(`id="${t.slice(1)}"`));
ok('every Day 02 engine track target exists in the content',
  missing.length === 0, missing.join(', '));
ok('all 18 track targets unique', new Set(targets).size === targets.length);

console.log(`\n${fails === 0 ? 'ALL PASS' : 'FAILURES'} — ${checks - fails}/${checks} checks passed`);
process.exit(fails === 0 ? 0 : 1);