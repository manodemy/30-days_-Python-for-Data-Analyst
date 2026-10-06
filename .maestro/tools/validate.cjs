'use strict';

const fs = require('node:fs');
const path = require('node:path');

const ROLES = ['maestro', 'explorer', 'architect', 'frontend', 'backend',
  'data', 'qa', 'security', 'devops', 'scribe'];
const BRAIN = ['PROJECT', 'ARCHITECTURE', 'CONVENTIONS', 'COMMANDS',
  'DECISIONS', 'STATE', 'KNOWN_ISSUES'];
const SECTIONS = ['Mission', 'Owns', 'Does NOT do', 'Inputs', 'Outputs',
  'Tools/permissions', 'Memory file path', 'Definition of Done', 'Escalation rules'];

function validate(root) {
  const issues = [];
  let checks = 0;
  const check = (condition, message) => {
    checks++;
    if (!condition) issues.push(message);
  };
  const read = (relative) => {
    const target = path.join(root, relative);
    if (!fs.existsSync(target) || !fs.statSync(target).isFile()) {
      check(false, 'Missing file: ' + relative);
      return '';
    }
    return fs.readFileSync(target, 'utf8');
  };
  const markdownNames = (relative) => {
    const target = path.join(root, relative);
    if (!fs.existsSync(target)) return [];
    return fs.readdirSync(target).filter(name => name.endsWith('.md')).sort();
  };
  const hasSection = (text, section) => text.split(/\r?\n/).includes('## ' + section);
  const lines = (text) => text.trimEnd().split(/\r?\n/).length;
  const entry = read('AGENTS.md');
  check(lines(entry) < 60, 'AGENTS.md must be under 60 lines');
  for (const heading of ['BOOT', 'WORK', 'SHUTDOWN AND RECOVERY', 'BOUNDARIES']) {
    check(hasSection(entry, heading), 'AGENTS.md missing ' + heading);
  }
  for (const adapter of ['CLAUDE.md', 'GEMINI.md']) {
    check(read(adapter).trim() === 'Read and follow AGENTS.md', adapter + ' must be pointer-only');
  }
  const expected = ROLES.map(name => name + '.md').sort();
  for (const directory of ['.maestro/agents', '.maestro/memory', '.claude/agents']) {
    check(JSON.stringify(markdownNames(directory)) === JSON.stringify(expected),
      directory + ' must contain exactly the ten named role files');
  }
  for (const role of ROLES) {
    const definition = read('.maestro/agents/' + role + '.md');
    for (const heading of SECTIONS) {
      check(hasSection(definition, heading), role + ' missing section: ' + heading);
    }
    check(definition.includes('../memory/' + role + '.md'), role + ' missing its memory link');
    const memory = read('.maestro/memory/' + role + '.md');
    check(lines(memory) < 200, role + ' memory must stay under 200 lines');
    check(/\b\d{4}-\d{2}-\d{2}\b/.test(memory), role + ' memory needs a dated entry');
    check(hasSection(memory, 'Archive'), role + ' memory needs an Archive section');
    const wrapper = read('.claude/agents/' + role + '.md');
    check(wrapper.startsWith('---\n') || wrapper.startsWith('---\r\n'), role + ' wrapper needs frontmatter');
    check(wrapper.split(/\r?\n/).includes('name: ' + role), role + ' wrapper name mismatch');
    check(/^description: .+/m.test(wrapper), role + ' wrapper needs a description');
    check(wrapper.includes('../../.maestro/agents/' + role + '.md'), role + ' wrapper must load its canonical role');
    check(wrapper.includes('../../AGENTS.md'), role + ' wrapper must load AGENTS.md');
    check(lines(wrapper) <= 10, role + ' wrapper must remain thin');
  }
  for (const name of BRAIN) {
    check(read('.maestro/brain/' + name + '.md').trim().length > 100, name + ' brain is empty');
  }
  read('.maestro/README.md');
  const taskSections = ['Brief', 'Ownership', 'Plan', 'Acceptance',
    'Constraints and Approvals', 'Specialist Report', 'Checkpoints and Recovery', 'Closure'];
  const tasks = markdownNames('.maestro/tasks');
  check(tasks.includes('TEMPLATE.md'), 'Task template is missing');
  check(tasks.length > 1, 'At least one concrete task brief is required');
  for (const name of tasks) {
    const task = read('.maestro/tasks/' + name);
    for (const section of taskSections) {
      check(hasSection(task, section), name + ' missing ' + section);
    }
  }
  const sessions = markdownNames('.maestro/memory/sessions');
  check(sessions.length > 0, 'At least one session handoff is required');
  for (const name of sessions) {
    check(/^\d{4}-\d{2}-\d{2}-\d{4}-.+\.md$/.test(name), 'Invalid handoff filename: ' + name);
    const session = read('.maestro/memory/sessions/' + name);
    for (const heading of ['Goal', 'Work', 'Files Changed', 'Decisions', 'Evidence', 'Open Questions', 'Next Steps']) {
      check(hasSection(session, heading), name + ' missing ' + heading);
    }
  }
  // Check real local Markdown links, not inline code paths or example placeholders.
  const walk = (directory) => {
    if (!fs.existsSync(directory)) return [];
    return fs.readdirSync(directory, { withFileTypes: true }).flatMap(item => {
      const target = path.join(directory, item.name);
      return item.isDirectory() ? walk(target) : (item.name.endsWith('.md') ? [target] : []);
    });
  };
  const documents = ['AGENTS.md', 'CLAUDE.md', 'GEMINI.md'].map(file => path.join(root, file))
    .concat(walk(path.join(root, '.maestro')), walk(path.join(root, '.claude/agents')));
  for (const file of documents) {
    if (!fs.existsSync(file)) continue;
    const text = fs.readFileSync(file, 'utf8');
    for (const match of text.matchAll(/\[[^\]\n]+\]\(([^)\n]+)\)/g)) {
      const href = match[1].replace(/^<|>$/g, '');
      if (/^(https?:|mailto:|#)/.test(href)) continue;
      const target = path.resolve(path.dirname(file), href.split('#')[0]);
      check(fs.existsSync(target), 'Broken link in ' + path.relative(root, file) + ': ' + href);
    }
  }
  return { checks, issues };
}

if (require.main === module) {
  const root = path.resolve(__dirname, '../..');
  const result = validate(root);
  if (result.issues.length) {
    result.issues.forEach(issue => console.error('FAIL: ' + issue));
    console.error(result.issues.length + ' failures across ' + result.checks + ' checks');
    process.exitCode = 1;
  } else {
    console.log('PASS: ' + result.checks + ' Maestro integrity checks; 10 roles, 9 specialists.');
  }
}

module.exports = { validate };
