/* Real-browser design and assessment checks. Pass --playwright <module path> if not on NODE_PATH. */
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const moduleAt = process.argv.indexOf('--playwright');
const { chromium } = require(moduleAt === -1 ? 'playwright' : process.argv[moduleAt + 1]);
const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, '.cache', 'course-design-v1', 'day03');
const urlAt = process.argv.indexOf('--url');
const base = urlAt === -1 ? (process.env.COURSE_QA_URL || 'http://localhost:8080') : process.argv[urlAt + 1];
const report = { viewportMatrix: [], checks: [], errors: [], networkFailures: [] };
function check(name, passed, detail) {
  report.checks.push({ name, passed: !!passed, detail });
  console.log((passed ? 'PASS ' : 'FAIL ') + name + (passed || !detail ? '' : ': ' + JSON.stringify(detail)));
}
async function shot(page, name) {
  await page.screenshot({ path: path.join(OUT, name + '.png'), fullPage: true });
}
async function section(page, id, name) {
  await page.locator('#' + id).scrollIntoViewIfNeeded();
  await shot(page, name);
}
async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  try {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
    const page = await context.newPage();
    page.on('pageerror', error => report.errors.push(error.message));
    page.on('requestfailed', request => report.networkFailures.push({ url: request.url(), error: request.failure()?.errorText }));
    await page.goto(base + '/python/day03.html', { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.locator('.course-design-v1').first().waitFor();
    check('Day03 bundle and version loaded', await page.evaluate(() => window.COURSE_CONTENT.pyDay03.designVersion === '1.0'));
    check('Blank initial practice editor', await page.evaluate(() => window.mainEditor.getValue() === ''));
    check('Study-only media controls disabled', await page.evaluate(() => [...document.querySelectorAll('.audio-play-btn, #navPlayBtn')].every(el => el.disabled)));
    check('Unavailable playback bar is hidden', !await page.locator('#playbackBar').isVisible());
    await page.locator('#chapterPillBtn').click();
    check('Study chapter menu includes assessments', await page.locator('#chapterList button').count() === 11);
    await page.locator('#chapterList button').first().click();
    check('No invented lesson duration', !(await page.locator('#topicSelect').innerText()).includes('48:00'));

    for (const [label, width, height] of [['desktop', 1440, 900], ['mobile', 390, 844]]) {
      await page.setViewportSize({ width, height });
      if (label === 'mobile') await page.locator('#tabBtnTheory').click();
      for (const theme of ['dark', 'light']) {
        await page.evaluate(theme => {
          if (document.documentElement.dataset.theme !== theme) window.toggleTheme();
          document.querySelector('#slideBodyText').scrollTop = 0;
          for (const el of document.querySelectorAll('.slide-body, .slide-content')) el.scrollTop = 0;
        }, theme);
        await page.locator('.course-design-v1').first().scrollIntoViewIfNeeded();
        await shot(page, label + '-' + theme + '-intro');
        await section(page, 'day03SlicingSection', label + '-' + theme + '-slicing');
        await section(page, 'day03FormattingCodeSection', label + '-' + theme + '-code');
        const optional = page.locator('.cd-advanced').first();
        await optional.locator('summary').focus();
        await page.keyboard.press('Enter');
        check(label + ' ' + theme + ' optional depth opens by keyboard', await optional.getAttribute('open') !== null);
        await shot(page, label + '-' + theme + '-optional');
        await optional.locator('summary').click();
        const overflow = await page.evaluate(() => {
          const root = document.documentElement;
          const diagrams = [...document.querySelectorAll('.course-design-v1')];
          return { page: root.scrollWidth - root.clientWidth, lesson: diagrams.map(el => el.scrollWidth - el.clientWidth) };
        });
        check(label + ' ' + theme + ' has no page or lesson overflow', overflow.page <= 1 && overflow.lesson.every(n => n <= 1), overflow);
        report.viewportMatrix.push({ label, width, height, theme, state: 'study', images: ['intro', 'slicing', 'code', 'optional'].map(state => label + '-' + theme + '-' + state + '.png') });
      }
    }

    await page.setViewportSize({ width: 1440, height: 900 });
    const item = page.locator('#day03Check1');
    await item.locator('summary').click();
    const answer = await page.evaluate(() => window.COURSE_CONTENT.pyDay03.conceptChecks[0].answer);
    await item.locator('input[value="' + ((answer + 1) % 4) + '"]').check();
    await item.locator('button[type="submit"]').click();
    check('Knowledge check rejects wrong answer with explanation', await item.locator('.course-feedback').getAttribute('data-result') === 'incorrect');
    await item.locator('input[value="' + answer + '"]').check();
    check('Changing answer clears stale verdict', await item.locator('.course-feedback').innerText() === '');
    await item.locator('button[type="submit"]').click();
    check('Knowledge check accepts correct answer', await item.locator('.course-feedback').getAttribute('data-result') === 'correct');
    await shot(page, 'desktop-check-feedback');
    const interview = page.locator('#day03Interview1');
    await interview.locator('summary').focus();
    await page.keyboard.press('Enter');
    check('Interview disclosure works by keyboard', await interview.getAttribute('open') !== null);
    await shot(page, 'desktop-interview-open');

    await page.locator('#qPickerTrigger').click();
    check('All 20 practice questions selectable', await page.locator('.q-picker-item').count() === 20);
    await page.locator('.q-picker-item').last().click();
    check('Last practice question loads and editor stays blank', (await page.locator('#qCounter').innerText()).includes('20') && await page.evaluate(() => window.mainEditor.getValue() === ''));
    await page.getByRole('button', { name: 'Solution', exact: false }).filter({ hasText: 'Solution' }).first().click();
    check('Readable practice solution matches current question', await page.evaluate(() => window.mainEditor.getValue() === window.COURSE_CONTENT.pyDay03.practiceQuestions[19].ref));
    await shot(page, 'desktop-practice-solution');

    let runtimeReady = true;
    try { await page.waitForFunction(() => !document.querySelector('#runBtn').disabled, null, { timeout: 60000 }); }
    catch { runtimeReady = false; }
    check('Real Pyodide runtime available', runtimeReady, report.networkFailures);
    if (runtimeReady) {
      const results = await page.evaluate(async () => {
        const day = window.COURSE_CONTENT.pyDay03;
        const rows = [];
        for (const [kind, questions] of [['practice', day.practiceQuestions], ['test', day.testQuestions]]) {
          for (const q of questions) {
            const out = await executePython(q.ref, q);
            const grade = await window.pyGradeSubmission(q.ref, q, pyodide, out);
            const staleOut = await executePython('pass', q);
            const staleGrade = await window.pyGradeSubmission('pass', q, pyodide, staleOut);
            const wrong = q.validation.checkVars.map(v => v.name + ' = None').join('\n');
            const badOut = await executePython(wrong, q);
            const badGrade = await window.pyGradeSubmission(wrong, q, pyodide, badOut);
            rows.push({ kind, id: q.id, correct: grade.passed, staleRejected: !staleGrade.passed, wrongRejected: !badGrade.passed, message: grade.message });
          }
        }
        return rows;
      });
      check('All 45 reference solutions accepted in browser', results.length === 45 && results.every(row => row.correct), results.filter(row => !row.correct));
      check('All 45 wrong submissions rejected in browser', results.every(row => row.wrongRejected), results.filter(row => !row.wrongRejected));
      check('All 45 stale-result submissions rejected', results.every(row => row.staleRejected), results.filter(row => !row.staleRejected));
      report.grading = results;
      await page.locator('#runBtn').click();
      await page.waitForFunction(() => document.querySelector('#mainOutput').innerText.includes('All checks passed'));
      check('Practice Run updates solved state', await page.evaluate(() => JSON.parse(localStorage.getItem('manodemy_python_progress')).days.pyDay03.solved.includes(20)));
    }

    await page.locator('#takeTestBtn').click();
    check('Timed test exposes all 25 coding questions', await page.locator('#testSidebar .test-q-btn').count() === 25);
    check('Test editor initially blank', await page.evaluate(() => window.testEditor.getValue() === ''));
    await page.locator('#testSidebar .test-q-btn').last().click();
    check('Test question 25 loads meaningful prompt', (await page.locator('#testQCounter').innerText()).includes('25') && (await page.locator('#testQuestionPrompt').innerText()).length > 60);
    await shot(page, 'desktop-test');
    if (runtimeReady) {
      await page.evaluate(() => window.testEditor.setValue(window.COURSE_CONTENT.pyDay03.testQuestions[24].ref));
      await page.locator('#testRunBtn').click();
      await page.waitForFunction(() => document.querySelector('#testSidebar .test-q-btn:last-child').classList.contains('answered-correct'));
      check('Timed test Run marks correct submission', true);
    }
    await page.evaluate(() => closeTestPortal());
    await page.setViewportSize({ width: 390, height: 844 });
    await page.locator('#tabBtnPractice').click();
    check('Mobile practice panel visible', await page.locator('#panelLeft').isVisible());
    for (const width of [390, 320]) {
      await page.setViewportSize({ width, height: 844 });
      const bounds = await page.locator('.editor-toolbar .tb-btn').evaluateAll(buttons => buttons.map(button => {
        const rect = button.getBoundingClientRect();
        return { text: button.textContent.trim(), left: rect.left, right: rect.right, width: rect.width, scrollWidth: button.scrollWidth, clientWidth: button.clientWidth };
      }));
      check('Practice actions fit at ' + width + 'px', bounds.every(b => b.left >= 0 && b.right <= width && b.width > 0 && b.scrollWidth <= b.clientWidth + 1), bounds);
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await shot(page, 'mobile-practice');
    await page.locator('#takeTestBtn').click();
    await shot(page, 'mobile-test');
    check('Reopened test keeps active question in view', await page.locator('#testSidebar .active').evaluate(el => {
      const item = el.getBoundingClientRect();
      const sidebar = el.parentElement.getBoundingClientRect();
      return item.top >= sidebar.top && item.bottom <= sidebar.bottom;
    }));
    check('Assessment identifies Day03', (await page.locator('.test-title').innerText()).includes('Day 03'));
    const testOverflow = await page.locator('#testOverlay').evaluate(el => el.scrollWidth - el.clientWidth);
    check('Mobile test does not overflow', testOverflow <= 1, testOverflow);
    for (const [label, width, height] of [['desktop', 1440, 900], ['mobile', 390, 844]]) {
      await page.setViewportSize({ width, height });
      for (const theme of ['light', 'dark']) {
        await page.evaluate(theme => { if (document.documentElement.dataset.theme !== theme) window.toggleTheme(); }, theme);
        await shot(page, label + '-' + theme + '-assessment');
        report.viewportMatrix.push({ label, width, height, theme, state: 'assessment', images: [label + '-' + theme + '-assessment.png'] });
      }
    }
    await page.evaluate(() => closeTestPortal());
    check('No JavaScript page errors', report.errors.length === 0, report.errors);
    check('No missing local lesson assets', !report.networkFailures.some(r => r.url.startsWith(base)), report.networkFailures);
    await context.close();
  } finally {
    await browser.close();
    report.sources = ['public/python/content/py-day-03.js', 'public/python/course-design.css', 'public/python/python-engine.js'].map(file => ({ file, sha256: crypto.createHash('sha256').update(fs.readFileSync(path.join(ROOT, file))).digest('hex') }));
    report.recordedAt = new Date().toISOString();
    fs.writeFileSync(path.join(OUT, 'report.json'), JSON.stringify(report, null, 2));
  }
  if (report.checks.some(row => !row.passed)) process.exitCode = 1;
  console.log('Evidence: ' + OUT);
}
main().catch(error => { console.error(error); process.exitCode = 1; });
