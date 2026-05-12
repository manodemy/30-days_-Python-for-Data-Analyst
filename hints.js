// ═══════════════════════════════════════════════════════════════════════
// MANO HINT SYSTEM v3 — Fixed position below cell, smooth transitions
// ═══════════════════════════════════════════════════════════════════════

const ManoHint = (() => {
  'use strict';

  const hintLevel = {}; // cellId → current level

  // ── CONCEPT DATABASE ──
  const DB = [
    { kw: ['type(', 'data type', 'type of'], l1: "This is about checking data types. Use the type() function.", l2: "Wrap your variable in type() and print the result.", l3: "Try: print(type(your_variable))" },
    { kw: ['print', 'display', 'output'], l1: "Use print() to display your answer.", l2: "Wrap your expression inside print().", l3: "Example: print(your_value)" },
    { kw: ['variable', 'assign', 'create', 'store'], l1: "Create a variable using = to assign a value.", l2: "Syntax: variable_name = value", l3: "Example: x = 10" },
    { kw: ['for loop', 'for each', 'iterate', 'loop through'], l1: "Use a for loop to go through each item.", l2: "Start with: for item in collection:", l3: "Structure: for x in list: then indent the body" },
    { kw: ['while', 'repeat until'], l1: "Use a while loop with a condition.", l2: "Set a counter, then: while counter < limit:", l3: "Structure: while condition: then indent the action" },
    { kw: ['list', 'square bracket', '[]', 'append'], l1: "Create a list using square brackets [].", l2: "Example: my_list = [1, 2, 3]", l3: "Use .append() to add, [index] to access." },
    { kw: ['dictionary', 'dict', 'key', 'value', 'mapping'], l1: "Create a dict using {key: value}.", l2: "Each entry needs a key-value pair.", l3: "Example: my_dict = {'name': 'Alice'}" },
    { kw: ['function', 'def ', 'define', 'parameter'], l1: "Define a function using def name():", l2: "Add parameters, indent the body.", l3: "Structure: def name(param): return result" },
    { kw: ['if ', 'condition', 'check if', 'elif', 'else'], l1: "Use if to check a condition.", l2: "Write: if condition: then indent the action.", l3: "Structure: if x > 5: print('yes')" },
    { kw: ['string', 'text', 'str(', '.upper', '.lower', '.strip', '.split', '.replace'], l1: "Work with strings using string methods.", l2: "Common: .upper(), .lower(), .strip(), .split()", l3: "Example: 'hello'.upper() gives 'HELLO'" },
    { kw: ['len(', 'length', 'count', 'how many'], l1: "Use len() to count elements.", l2: "Pass your list or string to len().", l3: "Example: print(len(my_list))" },
    { kw: ['.sort(', 'sort', 'order', 'arrange'], l1: "Use .sort() to sort a list.", l2: "Call: my_list.sort()", l3: "Note: .sort() returns None, changes the list!" },
    { kw: ['range(', 'sequence of numbers'], l1: "Use range() for a number sequence.", l2: "Syntax: range(start, stop)", l3: "Example: for i in range(5): print(i)" },
    { kw: ['class ', 'object', 'oop', '__init__', 'self'], l1: "Define a class: class ClassName:", l2: "Add __init__ with self parameter.", l3: "Structure: class Dog: def __init__(self, name):" },
    { kw: ['try', 'except', 'error handling', 'catch'], l1: "Wrap risky code in try/except.", l2: "Catch specific: except ValueError:", l3: "Structure: try: code except Error: handle" },
    { kw: ['import ', 'module', 'library', 'math'], l1: "Use import to load a module.", l2: "Syntax: import module_name", l3: "Example: import math; math.sqrt(16)" },
    { kw: ['return'], l1: "Use return to send back a value from a function.", l2: "Place return at the end of the function body.", l3: "Remember: print() shows output, return sends it back." },
    { kw: ['lambda', 'anonymous'], l1: "Use lambda for inline functions.", l2: "Syntax: lambda x: expression", l3: "Example: square = lambda x: x**2" },
    { kw: ['comprehension', 'one line', 'compact'], l1: "Use [expr for item in list].", l2: "With condition: [x for x in list if x > 0]", l3: "Example: [x**2 for x in range(5)]" },
    { kw: ['set(', 'unique', 'deduplicate', 'intersection', 'union'], l1: "Use set() for unique values.", l2: "Convert: unique = set(my_list)", l3: "Operations: .union(), .intersection()" },
    { kw: ['tuple', 'immutable', 'unpack'], l1: "Use parentheses () for tuples.", l2: "Tuples can't change after creation.", l3: "Unpacking: x, y = (10, 20)" },
    { kw: ['slice', 'substring', '[:', '[:'], l1: "Use [start:stop] to get a portion.", l2: "[0:3] gets first 3 items. [::-1] reverses.", l3: "Example: my_list[1:4] or string[:5]" },
    { kw: ['enumerate'], l1: "Use enumerate() for index + value.", l2: "for i, val in enumerate(list):", l3: "Example: for i, item in enumerate(my_list):" },
    { kw: ['zip(', 'pair', 'combine'], l1: "Use zip() to pair elements.", l2: "for a, b in zip(list1, list2):", l3: "Example: list(zip(names, scores))" },
    { kw: ['round(', 'decimal', 'precision'], l1: "Use round() for decimal precision.", l2: "Syntax: round(value, places)", l3: "Example: round(3.14159, 2) gives 3.14" },
    { kw: ['isinstance', 'type check'], l1: "Use isinstance() to check types.", l2: "isinstance(value, type)", l3: "Example: isinstance(5, int) gives True" },
    { kw: ['abs(', 'absolute', 'magnitude'], l1: "Use abs() for absolute value.", l2: "Works on int, float, complex.", l3: "Example: abs(-5) gives 5" },
    { kw: ['.real', '.imag', 'complex', 'j'], l1: "Access .real and .imag attributes.", l2: "Use abs() for magnitude.", l3: "Example: z = 3+4j; abs(z) gives 5.0" },
    { kw: ['bool(', 'truthy', 'falsy', 'boolean'], l1: "Use bool() to check truthiness.", l2: "Falsy: 0, '', [], {}, None.", l3: "Example: bool(0) is False, bool(1) is True" },
    { kw: ['is None', 'none', 'null', 'missing'], l1: "None represents absence of value.", l2: "Always check with 'is None', not '=='.", l3: "Example: if val is None: print('missing')" },
  ];

  function matchQ(qText) {
    const q = qText.toLowerCase();
    for (const c of DB) { for (const kw of c.kw) { if (q.includes(kw)) return c; } }
    return null;
  }

  function scanCode(code) {
    const c = code.trim().toLowerCase();
    return {
      empty: c.length < 5 || c === '# write your answer here',
      hasPrint: c.includes('print('),
      hasVar: /\w+\s*=/.test(c),
    };
  }

  // ── Generate hint text for a given level ──
  function getHint(cellId, level) {
    try {
      const cell = document.getElementById(cellId);
      if (!cell) return null;

      const prev = cell.previousElementSibling;
      const qText = (prev && (prev.classList.contains('question') || prev.classList.contains('interview')))
        ? prev.textContent : '';

      let code = '';
      if (typeof editors !== 'undefined' && editors[cellId]) code = editors[cellId].getValue();
      else { const ta = cell.querySelector('textarea'); if (ta) code = ta.value || ''; }

      const outEl = cell.querySelector('.cell-output');
      const hasErr = outEl && outEl.classList.contains('error');
      const errText = hasErr ? (outEl.textContent || '') : '';
      const p = scanCode(code);
      const concept = matchQ(qText);

      // Error state
      if (hasErr && errText) {
        let h = "Your code has an error. Fix it first.";
        if (errText.includes('SyntaxError')) h = "Fix the syntax error — check for missing colons, brackets, or quotes.";
        else if (errText.includes('NameError')) h = "NameError — check variable names for typos.";
        else if (errText.includes('TypeError')) h = "TypeError — you're mixing incompatible data types.";
        else if (errText.includes('IndentationError')) h = "Fix indentation — use 4 spaces after if, for, def.";
        else if (errText.includes('IndexError')) h = "Index out of range — check the length first.";
        else if (errText.includes('KeyError')) h = "Key doesn't exist — check for typos or use .get().";
        if (level >= 2 && concept) h += "\n\nAfter fixing: " + concept.l2;
        return { text: h, type: 'error' };
      }

      // Empty cell
      if (p.empty) {
        if (concept) {
          const l = Math.min(level, 3);
          return { text: concept['l' + l], type: 'guide' };
        }
        return { text: "Read the question carefully and start writing your solution.", type: 'guide' };
      }

      // Has code
      if (concept) {
        let pre = "";
        if (p.hasVar && !p.hasPrint) pre = "Good, you've created a variable! ";
        const l = Math.min(level, 3);
        return { text: pre + concept['l' + l], type: 'guide' };
      }

      const g = [
        "Read the question and identify the key Python concept.",
        "Create the variables mentioned, then apply the operation.",
        "Make sure you're printing the final result."
      ];
      return { text: g[Math.min(level, 3) - 1], type: 'guide' };
    } catch (e) {
      return { text: "Try reading the question again and start with the basics.", type: 'guide' };
    }
  }

  function esc(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>');
  }

  // ── Update popup content in place (no position change) ──
  function updateContent(cellId) {
    const lvl = hintLevel[cellId] || 1;
    const maxLvl = 3;
    const data = getHint(cellId, lvl);
    if (!data) return;

    const popup = document.getElementById('manoHintPopup');
    if (!popup) return;

    const icon = data.type === 'error' ? '🐛' : '💡';
    popup.querySelector('.mano-hint-title').textContent = icon + ' Hint (' + lvl + '/' + maxLvl + ')';

    const body = popup.querySelector('.mano-hint-body');
    body.style.opacity = '0';
    setTimeout(() => {
      body.innerHTML = esc(data.text);
      body.style.opacity = '1';
    }, 150);

    const footer = popup.querySelector('.mano-hint-footer');
    if (lvl < maxLvl) {
      footer.innerHTML = '<button class="mano-hint-next">Next Hint →</button>';
      footer.querySelector('.mano-hint-next').onclick = function() { nextHint(cellId); };
    } else {
      footer.innerHTML = '<span class="mano-hint-final">No more hints — give it your best shot!</span>';
    }
  }

  // ── Show popup (inserted after the cell, stays in place) ──
  function show(cellId) {
    close();
    hintLevel[cellId] = 1;
    const data = getHint(cellId, 1);
    if (!data) return;

    const cell = document.getElementById(cellId);
    if (!cell) return;

    const icon = data.type === 'error' ? '🐛' : '💡';
    const popup = document.createElement('div');
    popup.id = 'manoHintPopup';
    popup.className = 'mano-hint-popup';
    popup.setAttribute('data-cell', cellId);

    popup.innerHTML =
      '<div class="mano-hint-header">' +
        '<span class="mano-hint-title">' + icon + ' Hint (1/3)</span>' +
        '<button class="mano-hint-close" aria-label="Close">&times;</button>' +
      '</div>' +
      '<div class="mano-hint-body">' + esc(data.text) + '</div>' +
      '<div class="mano-hint-footer">' +
        '<button class="mano-hint-next">Next Hint →</button>' +
      '</div>';

    // Insert AFTER the cell (as a sibling, not a child — avoids overflow clipping)
    cell.parentNode.insertBefore(popup, cell.nextSibling);

    // Events
    popup.querySelector('.mano-hint-close').onclick = close;
    popup.querySelector('.mano-hint-next').onclick = function() { nextHint(cellId); };

    // Animate in
    requestAnimationFrame(() => {
      requestAnimationFrame(() => popup.classList.add('mano-hint-visible'));
    });
  }

  function nextHint(cellId) {
    hintLevel[cellId] = Math.min((hintLevel[cellId] || 1) + 1, 3);
    updateContent(cellId);
  }

  function close() {
    const p = document.getElementById('manoHintPopup');
    if (p) {
      p.classList.remove('mano-hint-visible');
      setTimeout(() => { if (p.parentNode) p.remove(); }, 200);
    }
  }

  function onClick(cellId) {
    const existing = document.getElementById('manoHintPopup');
    if (existing && existing.getAttribute('data-cell') === cellId) {
      close(); return;
    }
    show(cellId);
  }

  // ── Inject buttons ──
  function inject() {
    document.querySelectorAll('.code-cell').forEach(cell => {
      const prev = cell.previousElementSibling;
      if (!prev || (!prev.classList.contains('question') && !prev.classList.contains('interview'))) return;
      const actions = cell.querySelector('.cell-actions');
      if (!actions || actions.querySelector('.hint-btn')) return;

      const btn = document.createElement('button');
      btn.className = 'hint-btn';
      btn.textContent = '💡 Hint';
      const id = cell.id;
      btn.addEventListener('click', function(e) { e.stopPropagation(); onClick(id); });
      actions.insertBefore(btn, actions.firstChild);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject, { once: true });
  } else { inject(); }

  return { click: onClick, close: close };
})();
