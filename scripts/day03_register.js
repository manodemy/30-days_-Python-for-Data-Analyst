/**
 * Register Day 03 with the engine, manifest and narration bundle.
 *
 * Adds:
 *   PYTHON_DAY_TRACKS['pyDay03']   21 lecture + 30 question/solution tracks
 *   manifest.js                    day 3 entry
 *   py-narrations.js               the 30 practice/solution scripts
 *
 * Idempotent: safe to re-run.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const P = (...a) => path.join(ROOT, ...a);
const ENGINE = P('public', 'python', 'python-engine.js');
const MANIFEST = P('public', 'python', 'content', 'manifest.js');
const NARR = P('public', 'python', 'content', 'py-narrations.js');

const theory = require('./day03_theory.js');
const { PRACTICE } = require('./day03_questions.js');
const narrations = require('./day03_narrations.js');

const pad = n => String(n).padStart(2, '0');
const NL = '\r\n';

// ── 1. engine tracks ────────────────────────────────────────────────────────
const tracks = [];

const q = s => '"' + s.replace(/"/g, '\\"') + '"';
theory.TRACK_MAP.forEach(t => {
  tracks.push(`  { "src": ${q('Day03/' + t.audio[0])}, "target": ${q('#' + t.section)}, "title": ${q(t.title)}, "type": "narration" },`);
  tracks.push(`  { "src": ${q('Day03/' + t.audio[1])}, "target": ${q('#' + t.table)}, "title": ${q(t.title + ' — Reference')}, "type": "narration" },`);
  tracks.push(`  { "src": ${q('Day03/' + t.audio[2])}, "target": ${q('#' + t.code)}, "title": ${q(t.title + ' — Examples')}, "type": "narration" },`);
});

PRACTICE.forEach(q2 => {
  const n = pad(q2.id);
  tracks.push(`  { "src": ${q('Day03/New_PyDay03Question' + n + '.mp3')}, "target": "#questionBar", "title": ${q('Question ' + q2.id)}, "type": "question", "qId": ${q2.id} },`);
  tracks.push(`  { "src": ${q('Day03/New_PyDay03Question' + n + 'sol.mp3')}, "target": "#questionBar", "title": ${q('Q' + q2.id + ' Solution Walkthrough')}, "type": "solution", "qId": ${q2.id} },`);
});

const block = [
  "'pyDay03': {",
  '  tracks: [',
  tracks.map(t => '  ' + t).join(NL),
  '  ],',
  '  durations: []',
  '},'
].join(NL);

let engine = fs.readFileSync(ENGINE, 'utf8');

if (engine.includes("'pyDay03': {")) {
  // Brace-match the existing block. A previous version replaced up to the next
  // line-starting "}", which spanned the whole pyDay02 block and deleted its 48
  // tracks — the day silently stopped existing.
  const start = engine.indexOf("'pyDay03': {");
  const braceStart = engine.indexOf('{', start);
  let depth = 0, end = -1;
  for (let i = braceStart; i < engine.length; i++) {
    if (engine[i] === '{') depth++;
    else if (engine[i] === '}') { depth--; if (depth === 0) { end = i + 1; break; } }
  }
  if (end === -1) { console.error('! could not brace-match the existing pyDay03 block'); process.exit(1); }
  engine = engine.slice(0, start) + block + engine.slice(end);
  console.log('replaced the existing pyDay03 block (brace-matched)');
} else {
  // Insert before pyDay02 so days read in ascending order.
  const at = engine.indexOf("'pyDay02': {");
  if (at === -1) { console.error('! pyDay02 block not found'); process.exit(1); }
  engine = engine.slice(0, at) + block + NL + engine.slice(at);
  console.log('inserted pyDay03 into PYTHON_DAY_TRACKS');
}

fs.writeFileSync(ENGINE, engine, 'utf8');
console.log('  tracks registered:', tracks.length);

// ── 2. manifest ─────────────────────────────────────────────────────────────
let manifest = fs.readFileSync(MANIFEST, 'utf8');
if (manifest.includes('"pyDay03"')) {
  console.log('manifest already lists pyDay03');
} else {
  // The existing array's last element has no trailing comma; add one before
  // appending so the new object does not need a leading comma.
  const tail = manifest.replace(/\}\s*\]\;\s*$/, '},' + NL + '];' + NL);
  const entry = [
    '  {',
    '    "day": 3,',
    '    "id": "pyDay03",',
    '    "title": "Strings & Text Processing",',
    '    "emoji": "\u{1F524}",',
    '    "status": "live",',
    '    "prepared": true',
    '  }',
    '];'
  ].join(NL);
  manifest = tail.replace(/\];\s*$/, entry + NL);
  fs.writeFileSync(MANIFEST, manifest, 'utf8');
  console.log('manifest: added day 3');
}

// ── 3. practice/solution narration bundle ───────────────────────────────────
// The bundle uses DOUBLE-quoted keys inside `Object.assign(window.PYTHON_NARRATIONS, {`
// and closes with "});" — matching single quotes or a "};" terminator silently adds
// nothing while still reporting success.
let bundle = fs.readFileSync(NARR, 'utf8');
let added = 0;
const missing = [];
PRACTICE.forEach(q => {
  ['New_PyDay03Question' + pad(q.id), 'New_PyDay03Question' + pad(q.id) + 'sol'].forEach(k => {
    const key = k + '.mp3';
    if (bundle.includes('"' + key + '"')) return;
    const script = narrations[key];
    if (!script) { missing.push(key); return; }
    bundle = bundle.replace(/\n\}\);\s*$/,
      NL + '  "' + key + '": ' + JSON.stringify(script) + NL + '});' + NL);
    added++;
  });
});
fs.writeFileSync(NARR, bundle, 'utf8');
console.log('py-narrations.js: added', added, 'scripts');
if (missing.length) { console.error('  ! no script for:', missing.join(', ')); process.exitCode = 1; }

// ── 4. structural report ────────────────────────────────────────────────────
delete require.cache[require.resolve(ENGINE)];
global.window = {};
require(ENGINE);
const reg = window.PYTHON_DAY_TRACKS['pyDay03'];
console.log('\nverify: engine parses');
console.log('  pyDay03 tracks  =', reg.tracks.length);
console.log('  narration       =', reg.tracks.filter(t => t.type === 'narration').length, '(expect 21)');
console.log('  question        =', reg.tracks.filter(t => t.type === 'question').length, '(expect 15)');
console.log('  solution        =', reg.tracks.filter(t => t.type === 'solution').length, '(expect 15)');
const ids = new Set(reg.tracks.map(t => t.target.replace('#', '')));
console.log('  distinct targets=', ids.size);

// Every target must exist in the content bundle.
global.window.COURSE_CONTENT = {};
require(P('public', 'python', 'content', 'py-day-03.js'));
const html = window.COURSE_CONTENT.pyDay03.slides[0].html;
console.log('  targets in content =', ids.size - missing.length + '/' + ids.size,
  missing.length ? 'MISSING ' + missing.join(',') : '');
if (missing.length) process.exitCode = 1;

// Narration scripts must exist for every question/solution track.
const missingAudio = reg.tracks
  .filter(t => t.type !== 'narration')
  .filter(t => !fs.readFileSync(NARR, 'utf8').includes('"' + t.src.split('/')[1] + '"'));
console.log('  practice scripts  =',
  reg.tracks.filter(t => t.type !== 'narration').length - missingAudio.length + '/' +
  reg.tracks.filter(t => t.type !== 'narration').length);
if (missingAudio.length) { console.log('   missing:', missingAudio.map(t => t.src).join(', ')); process.exitCode = 1; }
