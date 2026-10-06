/** Structural/integration checks. Rendered quality is checked separately by qa_day03_browser.cjs. */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const ROOT = path.resolve(__dirname, '..');
const read = p => fs.readFileSync(path.join(ROOT, p), 'utf8');
const context = { window: {} };
vm.runInNewContext(read('public/python/content/py-day-03.js'), context);
vm.runInNewContext(read('public/python/content/manifest.js'), context);
const day = context.window.COURSE_CONTENT.pyDay03;
let checks = 0, failures = 0;
function check(name, passed) {
  checks++;
  if (!passed) { failures++; console.error('FAIL ' + name); }
}
check('correct day and candidate design version', day.day === 3 && day.designVersion === '1.0');
check('prerequisites recorded', JSON.stringify(day.prerequisites) === JSON.stringify(['pyDay01', 'pyDay02']));
check('study release declares unavailable narration', day.media.mode === 'study' && !!day.media.reason);
check('day manifest entry present', context.window.COURSE_MANIFEST.some(d => d.id === 'pyDay03'));
check('20 practice and 25 coding tests', day.practiceQuestions.length === 20 && day.testQuestions.length === 25);
check('25 interview answers', day.interviewQuestions.length === 25);
check('coding questions fit actual portal', [...day.practiceQuestions, ...day.testQuestions].every(q => q.prompt && q.ref && q.validation.checkVars.length && q.starterCode === ''));
check('grading opts into exact values and fresh results', [...day.practiceQuestions, ...day.testQuestions].every(q => q.validation.freshResults && q.validation.checkVars.every(v => v.exact)));
const html = day.slides[0].html;
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
check('all lesson IDs unique', new Set(ids).size === ids.length);
const { TRACK_MAP } = require('./day03_theory.js');
for (const track of TRACK_MAP) {
  for (const id of [track.section, track.table, track.code]) check('stable future narration target ' + id, ids.includes(id));
}
check('CSS is shared rather than copied from another day', !html.includes('<style'));
check('no inline styles in authored content', !/\bstyle=/.test(html));
check('no fabricated lecture duration', !('duration' in day.slides[0]));
check('solutions and all assessment sections reachable', ['day03KnowledgeChecks', 'day03InterviewQuestions', 'day03TestReferences'].every(id => ids.includes(id)));
const shell = read('public/python/day03.html');
check('study interactions and stylesheet loaded', shell.includes('/python/course-study.js') && shell.includes('/python/course-design.css'));
check('unused draft narration bundle not loaded', !shell.includes('py-narrations.js'));
for (const relative of ['content/py-day-03.js', 'day03.html', 'course-design.css', 'course-study.js', 'python-engine.js', 'python-grading-engine.js']) {
  check('root/public parity ' + relative, read('public/python/' + relative) === read('python/' + relative));
}
for (const url of [...shell.matchAll(/(?:src|href)="(\/[^"]+)"/g)].map(m => m[1].split('?')[0])) {
  if (/\.(js|css)$/.test(url)) check('local asset ' + url, fs.existsSync(path.join(ROOT, 'public', url)));
}
check('shared CSS names both themes and reduced motion', ['--cd-info', '--cd-success', '--cd-caution', '--cd-error', '[data-theme="light"]', 'prefers-reduced-motion'].every(token => read('public/python/course-design.css').includes(token)));
console.log(JSON.stringify({ passed: checks - failures, total: checks, failures }));
if (failures) process.exitCode = 1;
