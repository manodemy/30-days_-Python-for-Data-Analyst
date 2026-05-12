// ═══════════════════════════════════════════════════════════════════════
// MANO HINT SYSTEM — Context-Aware Progressive Hints
// Reads question text + user code + run state → generates smart hints
// Zero API cost, <2ms per click, zero performance impact
// ═══════════════════════════════════════════════════════════════════════

const ManoHint = (() => {
  'use strict';

  const hintState = {}; // cellId → { level: 0, maxLevel: 3 }

  // ═══════════════════════════════════════════════════════════════════
  // CONCEPT DATABASE — keyword → hint templates at 3 progressive levels
  // ═══════════════════════════════════════════════════════════════════
  const CONCEPTS = [
    { kw: ['type(', 'data type', 'type of'], l1: "This is about checking data types. Use the type() function.", l2: "Wrap your variable in type() and print the result.", l3: "Try: print(type(your_variable))" },
    { kw: ['print', 'display', 'output'], l1: "Use print() to display your answer.", l2: "Wrap your expression inside print().", l3: "Example: print(your_value)" },
    { kw: ['variable', 'assign', 'create', 'store'], l1: "Create a variable using = to assign a value.", l2: "Syntax: variable_name = value", l3: "Example: x = 10" },
    { kw: ['for loop', 'for each', 'iterate', 'loop through'], l1: "Use a for loop to go through each item.", l2: "Start with: for item in collection:", l3: "Structure:\nfor x in list:\n    print(x)" },
    { kw: ['while', 'repeat until', 'keep going'], l1: "Use a while loop with a condition.", l2: "Set a counter, then: while counter < limit:", l3: "Structure:\nwhile condition:\n    action" },
    { kw: ['list', 'square bracket', '[]', 'append', 'collection'], l1: "Create a list using square brackets [].", l2: "Add elements: my_list = [1, 2, 3]", l3: "Use .append() to add, [index] to access." },
    { kw: ['dictionary', 'dict', 'key', 'value', '{', 'mapping'], l1: "Create a dict using {key: value}.", l2: "Each entry needs a key and value pair.", l3: "Example: my_dict = {'name': 'value'}" },
    { kw: ['function', 'def ', 'define', 'parameter'], l1: "Define a function using def function_name():", l2: "Add parameters in parentheses, indent the body.", l3: "Structure:\ndef name(param):\n    return result" },
    { kw: ['if ', 'condition', 'check if', 'elif', 'else'], l1: "Use if to check a condition.", l2: "Write: if condition: then indent the action.", l3: "Structure:\nif x > 5:\n    print('yes')" },
    { kw: ['string', 'text', 'str(', 'quote', '.upper', '.lower', '.strip', '.split', '.replace'], l1: "Work with strings using quotes and string methods.", l2: "Common methods: .upper(), .lower(), .strip(), .split()", l3: "Example: 'hello'.upper() → 'HELLO'" },
    { kw: ['len(', 'length', 'count', 'how many'], l1: "Use len() to count elements.", l2: "Pass your list or string to len().", l3: "Example: print(len(my_list))" },
    { kw: ['.append(', 'add to list', 'add item'], l1: "Use .append() to add an item to a list.", l2: "Call it: my_list.append(value)", l3: "Note: .append() changes the list in place." },
    { kw: ['.sort(', 'sort', 'order', 'arrange'], l1: "Use .sort() to sort a list in place.", l2: "Call: my_list.sort()", l3: "Note: .sort() returns None, changes the list!" },
    { kw: ['range(', 'range', 'sequence of numbers'], l1: "Use range() for a number sequence.", l2: "Syntax: range(start, stop) or range(stop)", l3: "Example: for i in range(5): print(i)" },
    { kw: ['class ', 'object', 'oop', '__init__', 'self'], l1: "Define a class with: class ClassName:", l2: "Add __init__ method with self parameter.", l3: "Structure:\nclass Dog:\n    def __init__(self, name):\n        self.name = name" },
    { kw: ['try', 'except', 'error handling', 'catch'], l1: "Wrap risky code in try: and handle with except:", l2: "Catch specific errors: except ValueError:", l3: "Structure:\ntry:\n    code\nexcept Error:\n    handle" },
    { kw: ['import ', 'module', 'library', 'math', 'random'], l1: "Use import to load a module.", l2: "Syntax: import module or from module import function", l3: "Example: import math; math.sqrt(16)" },
    { kw: ['return', 'give back', 'send back'], l1: "Use return inside a function to send back a value.", l2: "Place return at the end of your function body.", l3: "Remember: print() shows output, return sends it back." },
    { kw: ['lambda', 'anonymous', 'inline function'], l1: "Use lambda for short inline functions.", l2: "Syntax: lambda x: expression", l3: "Example: square = lambda x: x**2" },
    { kw: ['comprehension', 'one line', 'compact list'], l1: "Use [expr for item in list] for compact lists.", l2: "Add conditions: [x for x in list if x > 0]", l3: "Example: [x**2 for x in range(5)]" },
    { kw: ['set(', 'unique', 'deduplicate', 'intersection', 'union'], l1: "Use set() for unique values.", l2: "Convert: unique = set(my_list)", l3: "Operations: .union(), .intersection(), .difference()" },
    { kw: ['tuple', 'immutable', 'parentheses', 'unpack'], l1: "Use parentheses () to create a tuple.", l2: "Tuples are immutable — can't change after creation.", l3: "Unpacking: x, y = (10, 20)" },
    { kw: ['slice', 'substring', '[:', 'portion'], l1: "Use [start:stop] to get a portion.", l2: "Indexes: [0:3] gets first 3 items. [::-1] reverses.", l3: "Example: my_list[1:4] or string[:5]" },
    { kw: ['enumerate', 'index and value'], l1: "Use enumerate() to get index + value.", l2: "Syntax: for i, val in enumerate(list):", l3: "Example: for i, item in enumerate(my_list): print(i, item)" },
    { kw: ['zip(', 'pair', 'combine lists'], l1: "Use zip() to pair elements from two lists.", l2: "Syntax: for a, b in zip(list1, list2):", l3: "Example: list(zip(names, scores))" },
    { kw: ['round(', 'decimal', 'precision'], l1: "Use round() to control decimal precision.", l2: "Syntax: round(value, decimal_places)", l3: "Example: round(3.14159, 2) → 3.14" },
    { kw: ['isinstance', 'type check', 'is instance'], l1: "Use isinstance() to check types.", l2: "Syntax: isinstance(value, type)", l3: "Example: isinstance(5, int) → True" },
    { kw: ['abs(', 'absolute', 'magnitude'], l1: "Use abs() for absolute value.", l2: "Works on int, float, and complex numbers.", l3: "Example: abs(-5) → 5, abs(3+4j) → 5.0" },
    { kw: ['.real', '.imag', 'complex', '+', 'j'], l1: "Access parts with .real and .imag attributes.", l2: "Use abs() for magnitude of complex numbers.", l3: "Example: z = 3+4j; print(z.real, z.imag, abs(z))" },
    { kw: ['bool(', 'truthy', 'falsy', 'boolean'], l1: "Use bool() to check truthiness.", l2: "Falsy: 0, '', [], {}, None. Everything else is Truthy.", l3: "Example: bool(0) → False, bool(1) → True" },
  ];

  // ═══════════════════════════════════════════════════════════════════
  // CODE PROGRESS SCANNER
  // ═══════════════════════════════════════════════════════════════════
  function scanCode(code) {
    const c = code.trim().toLowerCase();
    return {
      empty: c.length < 5 || c === '# write your answer here',
      hasPrint: c.includes('print(') || c.includes('print ('),
      hasVariable: /\w+\s*=/.test(c),
      hasFunction: c.includes('def '),
      hasLoop: c.includes('for ') || c.includes('while '),
      hasIf: c.includes('if '),
      hasReturn: c.includes('return '),
      hasImport: c.includes('import '),
      hasType: c.includes('type('),
      hasLen: c.includes('len('),
      lines: c.split('\n').length,
    };
  }

  // ═══════════════════════════════════════════════════════════════════
  // CONCEPT MATCHER — find matching concepts from question text
  // ═══════════════════════════════════════════════════════════════════
  function matchConcepts(qText) {
    const q = qText.toLowerCase();
    const matched = [];
    for (const c of CONCEPTS) {
      for (const kw of c.kw) {
        if (q.includes(kw)) { matched.push(c); break; }
      }
    }
    return matched;
  }

  // ═══════════════════════════════════════════════════════════════════
  // HINT GENERATOR — combines question + code + state + level
  // ═══════════════════════════════════════════════════════════════════
  function generateHint(cellId) {
    const cell = document.getElementById(cellId);
    if (!cell) return null;

    // Get question text from previous sibling
    const qEl = cell.previousElementSibling;
    const qText = (qEl && (qEl.classList.contains('question') || qEl.classList.contains('interview')))
      ? qEl.textContent : '';

    // Get current code from CodeMirror
    const code = (typeof editors !== 'undefined' && editors[cellId])
      ? editors[cellId].getValue() : '';

    // Get cell output state
    const outputEl = cell.querySelector('.cell-output');
    const hasError = outputEl && outputEl.classList.contains('error');
    const hasOutput = outputEl && !outputEl.classList.contains('hidden');

    // Initialize hint state for this cell
    if (!hintState[cellId]) hintState[cellId] = { level: 0 };
    const state = hintState[cellId];
    state.level = Math.min(state.level + 1, 4);
    const level = state.level;

    const progress = scanCode(code);
    const concepts = matchConcepts(qText);

    // ── If cell has an error, address error first ──
    if (hasError && outputEl) {
      const errText = outputEl.textContent || '';
      const errType = (errText.match(/(\w*Error\w*)/m) || [''])[0];
      if (errType) {
        let errorHint = "Your code has an error: " + errType + ". Fix the error first, then your approach should work.";
        if (errText.includes('SyntaxError'))
          errorHint = "Fix the syntax error first. Check for missing colons, brackets, or quotes.";
        else if (errText.includes('NameError'))
          errorHint = "You have a NameError. Check your variable and function names for typos.";
        else if (errText.includes('TypeError'))
          errorHint = "You have a TypeError. Check that you're using compatible data types.";
        else if (errText.includes('IndentationError'))
          errorHint = "Fix your indentation. Use 4 spaces after if, for, def, and class statements.";

        if (level >= 2 && concepts.length > 0) {
          errorHint += " After fixing the error: " + concepts[0]['l' + Math.min(level - 1, 3)];
        }
        return { text: errorHint, level: level, max: 4, type: 'error' };
      }
    }

    // ── If cell is empty ──
    if (progress.empty) {
      if (concepts.length > 0) {
        const c = concepts[0];
        const l = Math.min(level, 3);
        return { text: c['l' + l], level: level, max: 3, type: 'guide' };
      }
      return { text: "Read the question carefully and start writing your solution. Try assigning variables first.", level: 1, max: 3, type: 'guide' };
    }

    // ── Cell has code — analyze what's missing ──
    if (concepts.length > 0) {
      // Check what the question asks for vs what user has
      const c = concepts[0];
      const q = qText.toLowerCase();

      // Missing print (question asks to print but user hasn't)
      if ((q.includes('print') || q.includes('display') || q.includes('output') || q.includes('show'))
          && !progress.hasPrint && level <= 2) {
        return { text: "Your code looks good so far! Don't forget to print your result so it shows in the output.", level: level, max: 3, type: 'nudge' };
      }

      // Has some code → give next-level hint
      const l = Math.min(level, 3);
      const hintText = c['l' + l];

      // Add context about what they've already done
      let prefix = "";
      if (progress.hasVariable && !progress.hasPrint)
        prefix = "Good, you've created a variable! Now ";
      else if (progress.hasLoop && !progress.hasPrint)
        prefix = "Your loop looks good! Now make sure to ";
      else if (progress.hasFunction && !progress.hasReturn && q.includes('return'))
        prefix = "Your function is started! Don't forget to add a return statement. ";
      else if (progress.hasPrint && hasOutput && !hasError)
        prefix = "Your code runs, but the output doesn't match. ";

      return { text: prefix + hintText, level: level, max: 3, type: 'guide' };
    }

    // ── Fallback: generic progressive hints ──
    const generic = [
      "Read the question carefully. Identify the key Python concept being asked about.",
      "Start by creating the variables mentioned in the question. Then apply the operation.",
      "Check your logic and make sure you're printing the final result."
    ];
    const l = Math.min(level, 3) - 1;
    return { text: generic[l], level: level, max: 3, type: 'guide' };
  }

  // ═══════════════════════════════════════════════════════════════════
  // POPUP UI
  // ═══════════════════════════════════════════════════════════════════
  function showPopup(cellId, hintData) {
    closePopup(); // remove any existing
    const cell = document.getElementById(cellId);
    if (!cell || !hintData) return;

    const popup = document.createElement('div');
    popup.className = 'mano-hint-popup';
    popup.id = 'manoHintPopup';

    const typeIcon = hintData.type === 'error' ? '🐛' : hintData.type === 'nudge' ? '💬' : '💡';
    const levelText = hintData.level + '/' + hintData.max;

    popup.innerHTML =
      '<div class="mano-hint-header">' +
        '<span class="mano-hint-title">' + typeIcon + ' Hint (' + levelText + ')</span>' +
        '<button class="mano-hint-close" onclick="ManoHint.close()" aria-label="Close hint">&times;</button>' +
      '</div>' +
      '<div class="mano-hint-body">' + escapeHtml(hintData.text) + '</div>' +
      (hintData.level < hintData.max
        ? '<button class="mano-hint-next" onclick="ManoHint.next(\'' + cellId + '\')">Next Hint →</button>'
        : '<div class="mano-hint-final">No more hints. Try your best!</div>');

    cell.style.position = 'relative';
    cell.appendChild(popup);
    requestAnimationFrame(() => popup.classList.add('mano-hint-visible'));
  }

  function closePopup() {
    const p = document.getElementById('manoHintPopup');
    if (p) {
      p.classList.remove('mano-hint-visible');
      setTimeout(() => { if (p.parentNode) p.remove(); }, 200);
    }
  }

  function escapeHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
            .replace(/\n/g, '<br>');
  }

  // ═══════════════════════════════════════════════════════════════════
  // PUBLIC API
  // ═══════════════════════════════════════════════════════════════════
  function onHintClick(cellId) {
    const existing = document.getElementById('manoHintPopup');
    if (existing && existing.parentElement && existing.parentElement.id === cellId) {
      closePopup();
      return;
    }
    const hintData = generateHint(cellId);
    showPopup(cellId, hintData);
  }

  function nextHint(cellId) {
    const hintData = generateHint(cellId);
    showPopup(cellId, hintData);
  }

  // ═══════════════════════════════════════════════════════════════════
  // INJECT HINT BUTTONS (runs once after DOM ready)
  // Only adds to scored question/task cells
  // ═══════════════════════════════════════════════════════════════════
  function injectButtons() {
    document.querySelectorAll('.code-cell').forEach(cell => {
      // Only add to scored cells (preceded by a question)
      const prev = cell.previousElementSibling;
      if (!prev || (!prev.classList.contains('question') && !prev.classList.contains('interview'))) return;

      const actions = cell.querySelector('.cell-actions');
      if (!actions || actions.querySelector('.hint-btn')) return;

      const btn = document.createElement('button');
      btn.className = 'hint-btn';
      btn.textContent = '💡 Hint';
      btn.onclick = () => onHintClick(cell.id);
      actions.insertBefore(btn, actions.firstChild);
    });
  }

  // Auto-init
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectButtons, { once: true });
  } else {
    injectButtons();
  }

  return { click: onHintClick, next: nextHint, close: closePopup };
})();
