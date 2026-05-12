// ═══════════════════════════════════════════════════════════════════════
// MANO HINT SYSTEM v4 — Question-Specific Hints
// Reads the ACTUAL question text and extracts specific guidance
// Injected from DOMContentLoaded — guaranteed timing
// ═══════════════════════════════════════════════════════════════════════

(function() {
  'use strict';

  var hintLevels = {};

  // ── Extract specific elements from question text ──
  function parseQuestion(qText) {
    var t = qText.trim();
    // Extract code snippets (backtick content)
    var codes = [];
    t.replace(/`([^`]+)`/g, function(_, c) { codes.push(c); });
    // Also extract from <code> tags already rendered
    var codeFromHtml = [];
    t.replace(/\b(print|type|len|range|sorted|enumerate|zip|map|filter|int|float|str|bool|list|tuple|set|dict|abs|round|sum|max|min|input|open|def |class |import |return |for |while |if |elif |else|try|except|lambda|append|sort|split|strip|join|replace|upper|lower|find|index|count|pop|insert|remove|reverse|keys|values|items|get|update|add|union|intersection|difference|issubset|isinstance|isclose)\b/gi,
      function(m) { codeFromHtml.push(m.trim()); });

    // Extract variable names/values: x = 10, a = 15, etc.
    var assignments = [];
    t.replace(/([a-z_]\w*)\s*=\s*([^\s,;.]+)/gi, function(_, name, val) {
      assignments.push(name + ' = ' + val);
    });

    // Extract expected output hints
    var expected = '';
    var expMatch = t.match(/(?:expected|output|result|yields?|gives?|returns?)[:\s]*[`"]?([^`"\n,.]+)/i);
    if (expMatch) expected = expMatch[1].trim();

    return { codes: codes, funcs: codeFromHtml, vars: assignments, expected: expected, text: t };
  }

  // ── Build 3 specific hints from parsed question ──
  function buildHints(parsed) {
    var h1, h2, h3;
    var q = parsed.text.toLowerCase();

    // Hint 1: What to start with
    if (parsed.vars.length > 0) {
      h1 = "Start by creating: " + parsed.vars.slice(0, 3).join(', ');
    } else if (q.includes('write a function') || q.includes('define a function') || q.includes('def ')) {
      h1 = "Start by defining a function with def.";
    } else if (q.includes('create a list') || q.includes('given')) {
      h1 = "Start by setting up the data mentioned in the question.";
    } else {
      h1 = "Read the question and set up the variables or data it mentions.";
    }

    // Hint 2: What operation to apply
    var keyFuncs = parsed.funcs.filter(function(f, i, a) { return a.indexOf(f) === i; });
    if (keyFuncs.length > 0) {
      var unique = keyFuncs.slice(0, 4).join(', ');
      h2 = "Use these: " + unique + ". Apply them to your variables.";
    } else if (q.includes('loop') || q.includes('iterate')) {
      h2 = "Use a for loop to process each element.";
    } else if (q.includes('check') || q.includes('verify') || q.includes('test')) {
      h2 = "Write the comparison or check described in the question.";
    } else {
      h2 = "Apply the operation the question describes and store the result.";
    }

    // Hint 3: How to finish
    if (parsed.expected) {
      h3 = "Your output should be: " + parsed.expected + ". Use print() to display it.";
    } else if (q.includes('print')) {
      h3 = "Make sure to print each result. Use print() or f-strings.";
    } else if (q.includes('explain') || q.includes('why')) {
      h3 = "Run the code and add a comment explaining what you observe.";
    } else {
      h3 = "Print your final result. Check that the output matches what the question asks for.";
    }

    return [h1, h2, h3];
  }

  // ── Get code from editor ──
  function getCode(cellId) {
    if (typeof editors !== 'undefined' && editors[cellId]) {
      return editors[cellId].getValue();
    }
    var ta = document.querySelector('#' + cellId + ' textarea');
    return ta ? (ta.value || '') : '';
  }

  // ── Get error-specific hint ──
  function getErrorHint(cellId) {
    var outEl = document.querySelector('#' + cellId + ' .cell-output');
    if (!outEl || !outEl.classList.contains('error')) return null;
    var txt = outEl.textContent || '';
    if (txt.includes('SyntaxError')) return "🐛 You have a SyntaxError. Check for missing colons, brackets, or unmatched quotes.";
    if (txt.includes('NameError')) return "🐛 NameError — a variable or function name is misspelled or not defined yet.";
    if (txt.includes('TypeError')) return "🐛 TypeError — you're mixing types that don't work together (like string + number).";
    if (txt.includes('IndentationError')) return "🐛 IndentationError — use exactly 4 spaces after if, for, def, class.";
    if (txt.includes('IndexError')) return "🐛 IndexError — you're accessing an index that doesn't exist. Check len().";
    if (txt.includes('KeyError')) return "🐛 KeyError — that key isn't in the dictionary. Check spelling or use .get().";
    if (txt.includes('ValueError')) return "🐛 ValueError — the value isn't valid for this operation. Check your input.";
    if (txt.includes('ZeroDivisionError')) return "🐛 Can't divide by zero! Add a check before dividing.";
    if (txt.includes('AttributeError')) return "🐛 AttributeError — that method doesn't exist on this type. Check the data type.";
    return "🐛 Fix the error shown in red first, then try again.";
  }

  // ── Show / update hint popup ──
  function showHint(cellId) {
    var cell = document.getElementById(cellId);
    if (!cell) return;

    // Initialize level
    if (!hintLevels[cellId]) hintLevels[cellId] = 0;
    hintLevels[cellId]++;
    var level = Math.min(hintLevels[cellId], 3);

    // Get question text
    var prev = cell.previousElementSibling;
    var qText = '';
    if (prev && (prev.classList.contains('question') || prev.classList.contains('interview'))) {
      qText = prev.textContent || '';
    }

    // Check for error first
    var errHint = getErrorHint(cellId);

    // Parse question and build hints
    var parsed = parseQuestion(qText);
    var hints = buildHints(parsed);

    // Determine what to show
    var hintText;
    if (errHint && level <= 1) {
      hintText = errHint;
    } else if (errHint) {
      hintText = errHint + '\n\n' + hints[Math.min(level, 3) - 1];
    } else {
      // Check code state
      var code = getCode(cellId).trim().toLowerCase();
      var isEmpty = code.length < 5 || code === '# write your answer here';
      if (isEmpty) {
        hintText = hints[Math.min(level, 3) - 1];
      } else {
        // User has code — give next-level hint
        hintText = hints[Math.min(level, 3) - 1];
      }
    }

    // Find or create popup
    var popupId = 'hint-' + cellId;
    var popup = document.getElementById(popupId);

    if (popup) {
      // Update existing popup content (don't move it)
      var body = popup.querySelector('.mano-hint-body');
      body.style.opacity = '0';
      setTimeout(function() {
        body.innerHTML = hintText.replace(/\n/g, '<br>');
        popup.querySelector('.mano-hint-title').textContent = '💡 Hint (' + level + '/3)';
        body.style.opacity = '1';
        // Update footer
        var footer = popup.querySelector('.mano-hint-footer');
        if (level < 3) {
          footer.innerHTML = '<button class="mano-hint-next" onclick="showHint(\'' + cellId + '\')">Next Hint →</button>';
        } else {
          footer.innerHTML = '<span class="mano-hint-final">No more hints — you can do this!</span>';
        }
      }, 120);
      return;
    }

    // Create new popup (as sibling after cell)
    popup = document.createElement('div');
    popup.id = popupId;
    popup.className = 'mano-hint-popup';

    popup.innerHTML =
      '<div class="mano-hint-header">' +
        '<span class="mano-hint-title">💡 Hint (' + level + '/3)</span>' +
        '<button class="mano-hint-close" onclick="closeHint(\'' + cellId + '\')">&times;</button>' +
      '</div>' +
      '<div class="mano-hint-body">' + hintText.replace(/\n/g, '<br>') + '</div>' +
      '<div class="mano-hint-footer">' +
        (level < 3
          ? '<button class="mano-hint-next" onclick="showHint(\'' + cellId + '\')">Next Hint →</button>'
          : '<span class="mano-hint-final">No more hints — you can do this!</span>') +
      '</div>';

    // Insert after the cell
    cell.parentNode.insertBefore(popup, cell.nextSibling);

    // Animate in
    requestAnimationFrame(function() {
      requestAnimationFrame(function() {
        popup.classList.add('mano-hint-visible');
      });
    });
  }

  function closeHint(cellId) {
    var popupId = 'hint-' + cellId;
    var popup = document.getElementById(popupId);
    if (popup) {
      popup.classList.remove('mano-hint-visible');
      hintLevels[cellId] = 0;
      setTimeout(function() { if (popup.parentNode) popup.remove(); }, 200);
    }
  }

  // ── Inject hint buttons into question cells ──
  function injectHintButtons() {
    var cells = document.querySelectorAll('.code-cell');
    var count = 0;
    for (var i = 0; i < cells.length; i++) {
      var cell = cells[i];
      var prev = cell.previousElementSibling;
      if (!prev) continue;
      if (!prev.classList.contains('question') && !prev.classList.contains('interview')) continue;

      var actions = cell.querySelector('.cell-actions');
      if (!actions) continue;
      if (actions.querySelector('.hint-btn')) continue;

      var btn = document.createElement('button');
      btn.className = 'hint-btn';
      btn.type = 'button';
      btn.innerHTML = '💡 Hint';
      btn.setAttribute('data-cell', cell.id);
      btn.setAttribute('onclick', "showHint('" + cell.id + "')");
      actions.insertBefore(btn, actions.firstChild);
      count++;
    }
    console.log('ManoHint: ' + count + ' hint buttons injected');
  }

  // Make functions globally accessible (for onclick handlers)
  window.showHint = showHint;
  window.closeHint = closeHint;

  // Run after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectHintButtons);
  } else {
    injectHintButtons();
  }
})();
