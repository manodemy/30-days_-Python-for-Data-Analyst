'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { execFileSync } = require('child_process');
const { PRACTICE, TEST } = require('./day03_questions.js');
const { CONCEPT_CHECKS, OPTIONAL_CONCEPT_CHECKS, INTERVIEW, VERIFICATION } = require('./day03_question_checks.js');
const { HTML } = require('./day03_theory.js');
const ROOT = path.resolve(__dirname, '..');
let total = 0, failures = 0;
function check(name, passed, detail = '') {
  total++;
  if (!passed) { failures++; console.error('FAIL ' + name + ': ' + detail); }
}
const probe = String.raw`
import sys, json, io, contextlib
from html.parser import HTMLParser
data = json.load(sys.stdin)
def run(code, expression=None):
    env = {}
    out = io.StringIO()
    try:
        with contextlib.redirect_stdout(out):
            exec(code, env)
            value = eval(expression, env) if expression is not None else None
        return {"env": {k:v for k,v in env.items() if not k.startswith('__')}, "output": out.getvalue(), "value": value}
    except Exception as e:
        return {"error": type(e).__name__, "message": str(e), "output": out.getvalue()}
class Examples(HTMLParser):
    def __init__(self):
        super().__init__(); self.items=[]; self.item=None; self.pre=False; self.index=0
    def handle_starttag(self, tag, attrs):
        attrs=dict(attrs)
        if tag=='figure' and 'data-example' in attrs:
            self.item={"code":"", "output":"", "error":attrs.get('data-error')}; self.index=0
        if tag=='pre' and self.item is not None:
            self.pre=True; self.index+=1
    def handle_data(self, text):
        if self.item is not None and self.pre:
            self.item['code' if self.index==1 else 'output']+=text
    def handle_endtag(self, tag):
        if tag=='pre': self.pre=False
        if tag=='figure' and self.item is not None:
            self.items.append(self.item); self.item=None
parser=Examples(); parser.feed(data['html'])
result={"questions": [run(q['ref']) for q in data['questions']], "concepts": {}, "interviews": {}, "examples": []}
for key, item in data['verification']['concepts'].items():
    result['concepts'][key]=run(item.get('code',''), item.get('expression'))
for key, item in data['verification']['interviews'].items():
    result['interviews'][key]=run(item['code'])
for item in parser.items:
    result['examples'].append({"source": item, "result":run(item['code'])})
print(json.dumps(result, default=str))
`;
const questions = [...PRACTICE, ...TEST];
const evidence = JSON.parse(execFileSync('python', ['-c', probe], {
  input: JSON.stringify({ html: HTML, questions, verification: VERIFICATION }), encoding: 'utf8', maxBuffer: 8 * 1024 * 1024
}));
const sandbox = { window: {} };
const grader = fs.readFileSync(path.join(ROOT, 'public/python/python-grading-engine.js'), 'utf8')
  .replace('window.pyGradeSubmission = gradeSubmission;', 'window.checkVariable = checkVariable; window.pyGradeSubmission = gradeSubmission;');
vm.runInNewContext(grader, sandbox);
const grade = sandbox.window.checkVariable;
check('20 practice and 25 coding tests', PRACTICE.length === 20 && TEST.length === 25);
questions.forEach((q, i) => {
  const label = (i < PRACTICE.length ? 'practice' : 'test') + ' ' + q.id;
  check(label + ' starts blank', q.starterCode === '');
  check(label + ' executes', !evidence.questions[i].error, JSON.stringify(evidence.questions[i]));
  const values = evidence.questions[i].env || {};
  for (const cv of q.validation.checkVars) {
    check(label + ' exact result ' + cv.name, grade(cv, values[cv.name]).ok, JSON.stringify({ expected: cv.value, actual: values[cv.name] }));
    const wrong = typeof cv.value === 'string' ? cv.value + 'wrong' : typeof cv.value === 'boolean' ? !cv.value : typeof cv.value === 'number' ? cv.value + 1 : [];
    check(label + ' rejects wrong ' + cv.name, !grade(cv, wrong).ok);
    if (cv.type === 'string') {
      check(label + ' rejects added whitespace ' + cv.name, !grade(cv, ' ' + cv.value + ' ').ok);
      if (cv.value.toUpperCase() !== cv.value) check(label + ' rejects wrong case ' + cv.name, !grade(cv, cv.value.toUpperCase()).ok);
    }
    check(label + ' prompt names ' + cv.name, q.prompt.includes(cv.name));
  }
  check(label + ' given input is preserved', q.ref.startsWith(q.given));
  check(label + ' avoids later control-flow prerequisites', !/^(for |while |def |import |from |if |class )/m.test(q.ref));
});
check('25 essential knowledge checks', CONCEPT_CHECKS.length === 25);
check('25 interview answers', INTERVIEW.length === 25);
for (const type of ['conceptual', 'output-prediction', 'debugging', 'fill-expression']) check('Question type ' + type, CONCEPT_CHECKS.some(q => q.type === type));
for (const q of [...CONCEPT_CHECKS, ...OPTIONAL_CONCEPT_CHECKS]) {
  const expected = VERIFICATION.concepts[q.id], actual = evidence.concepts[q.id];
  check('check ' + q.id + ' answer schema', q.options.length === 4 && q.answer >= 0 && q.answer < 4 && !!q.explanation);
  check('check ' + q.id + ' executable evidence', expected.error ? actual.error === expected.error : !actual.error && JSON.stringify(actual.value) === JSON.stringify(expected.expected), JSON.stringify(actual));
}
for (const q of INTERVIEW) {
  const expected = VERIFICATION.interviews[q.id], actual = evidence.interviews[q.id];
  check('interview ' + q.id + ' output', expected.error ? actual.error === expected.error : !actual.error && actual.output === expected.output, JSON.stringify(actual));
}
evidence.examples.forEach(({ source, result }, i) => {
  check('theory example ' + (i + 1), source.error ? source.error === result.error : !result.error && result.output.trimEnd() === source.output.trimEnd(), JSON.stringify({ source, result }));
});
check('Substantial executable theory coverage', evidence.examples.length >= 25, evidence.examples.length);
console.log(JSON.stringify({ passed: total - failures, total, failures, theoryExamples: evidence.examples.length, practice: PRACTICE.length, codingTests: TEST.length, concepts: CONCEPT_CHECKS.length, optionalConcepts: OPTIONAL_CONCEPT_CHECKS.length, interviews: INTERVIEW.length }));
if (failures) process.exitCode = 1;
