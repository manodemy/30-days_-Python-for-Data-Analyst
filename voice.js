// ═══════════════════════════════════════════════════════════════════════
// MANO VOICE ASSISTANT v3.0 — Natural Voice Teaching Experience
// Optimized for human-like delivery using premium browser voices
// Microsoft Edge Natural voices | Google Chrome Premium voices
// ═══════════════════════════════════════════════════════════════════════

const ManoVoice = (() => {
  'use strict';

  // ── STATE ──
  let muted = false;
  let streak = 0;
  let correctCount = 0;
  let lastMilestone = 0;
  let voice = null;
  let voicesReady = false;
  let toastTimer = null;
  let muteBtn = null;

  // ── VOICE TUNING ──
  // These values are calibrated for the most natural conversational tone.
  // Rate 0.92 = slightly slower than default, feels thoughtful not robotic.
  // Pitch 1.0 = natural female range. Higher pitch sounds artificial.
  const RATE_NORMAL = 1.0;      // Natural conversational speed
  const RATE_CELEBRATE = 1.05;  // Celebrations — upbeat energy
  const RATE_ERROR = 0.95;      // Error hints — slightly slower for clarity
  const PITCH = 1.0;            // Keep natural — don't go above 1.05
  const TOAST_MS = 5000;

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 1: NATURAL RESPONSE POOLS
  // Written in conversational English with contractions and pauses.
  // Commas = micro-pauses. Periods = natural breath breaks.
  // Short sentences sound more human than long ones.
  // ═══════════════════════════════════════════════════════════════════
  const R = {
    ok: [
      "That's right. Nice work!",
      "Perfect! You got it.",
      "Yes! That's exactly right.",
      "Well done! Keep it up.",
      "Great job! That's correct.",
      "Spot on. Moving on!",
      "Brilliant! You nailed it.",
      "Correct! You're doing great."
    ],
    noOut: [
      "Hmm, your code ran fine, but I don't see any output. Did you forget to add a print statement?",
      "No errors, that's good! But nothing was printed. Try wrapping your answer in print.",
      "Your code works, but the output is empty. Make sure you're printing the result.",
      "Almost there! Just add a print statement so I can see your answer."
    ],
    close: [
      "You're close, but not quite. Take another look at the question.",
      "Good thinking! But the output doesn't match. Check your logic again.",
      "Almost! Double check your values and give it another try.",
      "You're on the right track. Re-read the question carefully.",
      "Not bad! But something's a little off. Try again."
    ],
    wrong: [
      "Hmm, that doesn't seem to match the question. Read it again and try a different approach.",
      "Your code works, but it's not solving the right problem. Take another look.",
      "That's not quite what's being asked. Check the question one more time.",
      "Try re-reading the question. Your code is doing something different from what's expected."
    ],
    s3: "Three in a row! You're on a roll!",
    s5: "Five in a row! You're absolutely crushing it!",
    s10: "Ten in a row! You're unstoppable!",
    brk: "Streak broken. No worries, that was a good run.",
    first: "First one down! Great start. Keep this going.",
    half: "You're halfway there! Keep pushing, you're doing amazing.",
    done: "You've completed every question on this page. Incredible work! You're ready for the next day."
  };

  const pick = a => a[(Math.random() * a.length) | 0];

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 2: ERROR HINT ENGINE
  // Written like a patient, friendly teacher explaining to a student.
  // Uses contractions (you're, don't, it's) for warmth.
  // Short sentences with natural pauses.
  // ═══════════════════════════════════════════════════════════════════
  function hint(msg) {
    const lo = msg.toLowerCase();

    // SyntaxError
    if (lo.includes('syntaxerror')) {
      if (lo.includes('eol while scanning') || lo.includes('unterminated string'))
        return "Looks like you have an unclosed string. Make sure every quote has a matching closing quote.";
      if (lo.includes('unexpected eof') || lo.includes('was never closed'))
        return "You've got an unclosed bracket or parenthesis. Try counting your opening and closing brackets.";
      if (lo.includes('unmatched'))
        return "There's a mismatched bracket in your code. Check that each opening bracket has the right closing one.";
      if (lo.includes('invalid character') || lo.includes('unexpected character'))
        return "There's a character Python doesn't recognize. Check for smart quotes or any hidden characters.";
      if (lo.includes('missing parentheses') && lo.includes('print'))
        return "In Python 3, print needs parentheses. Try print, open parenthesis, your value, close parenthesis.";
      if (lo.includes('f-string'))
        return "There's an issue with your f-string. Make sure the curly braces are balanced and contain valid expressions.";
      if (lo.includes("expected ':'") || lo.includes('expected colon'))
        return "You're missing a colon. Remember, if statements, loops, and functions need a colon at the end of the line.";
      if (lo.includes('cannot assign') || lo.includes('cannot use assignment'))
        return "Did you mean to compare? Use double equals for comparison, not single equals.";
      return "There's a syntax error. Check for missing colons, unmatched brackets, or typos.";
    }

    // IndentationError
    if (lo.includes('indentationerror')) {
      if (lo.includes('unexpected indent'))
        return "Python found an unexpected indent. Try removing the extra spaces at the start of that line.";
      if (lo.includes('expected an indented block'))
        return "Python expects indented code here. After an if, for, or def statement, indent the next line by four spaces.";
      if (lo.includes('unindent does not match'))
        return "Your indentation doesn't line up. Make sure each block uses the same number of spaces.";
      return "There's an indentation issue. Stick to four spaces per level, and don't mix tabs with spaces.";
    }

    // TabError
    if (lo.includes('taberror'))
      return "You're mixing tabs and spaces, and Python doesn't allow that. Use only spaces. Four per level.";

    // NameError
    if (lo.includes('nameerror')) {
      if (lo.includes('pritn') || lo.includes('pirnt') || lo.includes('prit'))
        return "Looks like a small typo. Did you mean print?";
      if (lo.includes('retrun') || lo.includes('reutrn') || lo.includes('retrn'))
        return "Tiny typo! Did you mean return?";
      if (lo.includes('ture') || lo.includes('treu'))
        return "Watch the spelling. It's True, capital T.";
      if (lo.includes('flase') || lo.includes('fasle'))
        return "Check the spelling. It's False, capital F.";
      if (lo.includes('lenght') || lo.includes('legth'))
        return "Small typo! The function is len, not length.";
      if (lo.includes('defien') || lo.includes('dfe'))
        return "Typo! The keyword for functions is def.";
      if (lo.includes('inpt'))
        return "Small typo! Did you mean input?";
      return "You're using a name that hasn't been defined yet. Check for typos, or make sure you defined it first.";
    }

    // TypeError
    if (lo.includes('typeerror')) {
      if (lo.includes('can only concatenate str') || (lo.includes('unsupported operand') && lo.includes('str')))
        return "You're trying to combine a string with a number. Convert the number using str first, or use an f-string.";
      if (lo.includes('is not callable'))
        return "You're calling something that isn't a function. Maybe you accidentally put parentheses on a variable?";
      if (lo.includes('positional argument') || (lo.includes('missing') && lo.includes('required')))
        return "The number of arguments doesn't match. Check the function definition and count the parameters.";
      if (lo.includes('is not subscriptable'))
        return "You're using square brackets on something that doesn't support indexing. Check the data type.";
      if (lo.includes('is not iterable'))
        return "You're trying to loop over something that isn't iterable. Make sure it's a list, tuple, or string.";
      if (lo.includes('cannot unpack'))
        return "The unpacking doesn't match. The number of variables needs to match the number of values.";
      if (lo.includes('nonetype'))
        return "You're getting a NoneType error. Methods like sort and append change the list in place and return None. Don't assign their result.";
      if (lo.includes("'int' object is not iterable"))
        return "You're trying to loop over a single number. Use range if you want a sequence.";
      return "There's a type mismatch. You're mixing incompatible data types. Check what type each variable is.";
    }

    // ValueError
    if (lo.includes('valueerror')) {
      if (lo.includes('invalid literal'))
        return "You're trying to convert a string to a number, but the string isn't a valid number.";
      if (lo.includes('too many values to unpack'))
        return "Too many values on the right side. Add more variables on the left, or use a star expression.";
      if (lo.includes('not enough values to unpack'))
        return "Not enough values to unpack. Check the length of what you're unpacking.";
      if (lo.includes('math domain'))
        return "Math domain error. You might be taking the square root of a negative number, or the log of zero.";
      if (lo.includes('empty'))
        return "You're calling a function on an empty sequence. Make sure your list has at least one element.";
      return "The value isn't valid for this operation. Double check your input data.";
    }

    // IndexError
    if (lo.includes('indexerror')) {
      if (lo.includes('list'))
        return "List index out of range. Remember, indexing starts at zero. A list with five items has indices zero through four.";
      if (lo.includes('tuple'))
        return "Tuple index out of range. Check the length before accessing it.";
      if (lo.includes('string'))
        return "String index out of range. The string is shorter than the index you're using.";
      return "Index out of range. Use len to check the length before accessing by index.";
    }

    // KeyError
    if (lo.includes('keyerror'))
      return "That key doesn't exist in your dictionary. Check for typos, or use the get method instead.";

    // AttributeError
    if (lo.includes('attributeerror')) {
      if (lo.includes("'nonetype'"))
        return "You're calling a method on None. That usually means a previous step returned None when you expected a value.";
      if (lo.includes("'str'") && lo.includes('append'))
        return "Strings don't have an append method. They're immutable. Use concatenation or an f-string instead.";
      if (lo.includes("'list'"))
        return "That method doesn't exist on lists. Check that you're using the right method for the right type.";
      return "This object doesn't have that method or property. Check the data type and its available methods.";
    }

    // ZeroDivisionError
    if (lo.includes('zerodivisionerror'))
      return "You're dividing by zero, and Python doesn't allow that. Add a check to make sure the divisor isn't zero.";

    // ImportError / ModuleNotFoundError
    if (lo.includes('importerror') || lo.includes('modulenotfounderror') || lo.includes('no module named'))
      return "That module isn't available in the browser environment. Some external libraries aren't installed here.";

    // UnboundLocalError
    if (lo.includes('unboundlocalerror'))
      return "You're using a variable inside a function before assigning it. Use the global keyword if you need the outer variable.";

    // RecursionError
    if (lo.includes('recursionerror') || lo.includes('maximum recursion'))
      return "Your function is calling itself forever. Make sure you have a base case that stops the recursion.";

    // StopIteration
    if (lo.includes('stopiteration'))
      return "The iterator has run out of items. There are no more values to give.";

    // OverflowError
    if (lo.includes('overflowerror'))
      return "That number is too large for this operation. Try using a smaller value.";

    // AssertionError
    if (lo.includes('assertionerror'))
      return "An assertion failed. The condition you're testing is False. Review your logic.";

    // RuntimeError
    if (lo.includes('runtimeerror'))
      return "A runtime error occurred. Take a close look at your code logic.";

    // NotImplementedError
    if (lo.includes('notimplementederror'))
      return "This method hasn't been implemented yet. Override it in your class.";

    // FileNotFoundError
    if (lo.includes('filenotfounderror') || lo.includes('no such file'))
      return "File not found. This runs in your browser, so local files aren't accessible. Use sample data in your code instead.";

    // EOFError
    if (lo.includes('eoferror'))
      return "The input function doesn't work in the browser. Assign your value directly to a variable instead.";

    // UnicodeError
    if (lo.includes('unicodeerror') || lo.includes('unicodedecodeerror') || lo.includes('unicodeencodeerror'))
      return "There's an encoding issue. Try using UTF-8, and check for special characters in your strings.";

    // MemoryError
    if (lo.includes('memoryerror'))
      return "Your code ran out of memory. You might have an infinite loop, or you're creating very large data.";

    // Fallback
    return "Something went wrong. Read the last line of the error message carefully. It usually tells you exactly what happened.";
  }

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 3: PREMIUM VOICE SELECTION ENGINE
  // Priority: Microsoft Natural > Google Premium > Standard
  //
  // Microsoft Edge has "Natural" voices (Jenny, Aria, Guy) that are
  // neural TTS and sound nearly indistinguishable from a real person.
  // Chrome has "Google UK English Female" which is also very clean.
  // ═══════════════════════════════════════════════════════════════════
  function loadVoices() {
    if (voicesReady || !window.speechSynthesis) return;
    const all = speechSynthesis.getVoices();
    if (!all.length) return;
    voicesReady = true;

    // Tiered priority — best natural voices first
    const tiers = [
      // Tier 1: Microsoft Natural voices (Edge) — near-human quality
      v => /natural/i.test(v.name) && /jenny|aria|ana|sonia/i.test(v.name) && v.lang.startsWith('en'),
      v => /natural/i.test(v.name) && v.lang.startsWith('en'),
      // Tier 2: Microsoft Online voices (Edge) — high quality
      v => /online/i.test(v.name) && /zira|hazel|susan/i.test(v.name) && v.lang.startsWith('en'),
      v => /online/i.test(v.name) && v.lang.startsWith('en'),
      // Tier 3: Google Premium voices (Chrome)
      v => /google/i.test(v.name) && /uk english female/i.test(v.name),
      v => /google/i.test(v.name) && /us english/i.test(v.name),
      v => /google/i.test(v.name) && v.lang.startsWith('en'),
      // Tier 4: Apple voices (Safari)
      v => /samantha|karen|moira|fiona|victoria/i.test(v.name) && v.lang.startsWith('en'),
      // Tier 5: Any female-sounding English voice
      v => /female/i.test(v.name) && v.lang.startsWith('en'),
      // Tier 6: Indian English (for Indian users)
      v => v.lang.startsWith('en-IN'),
      // Tier 7: Any English
      v => v.lang.startsWith('en-US'),
      v => v.lang.startsWith('en-GB'),
      v => v.lang.startsWith('en'),
    ];

    for (const test of tiers) {
      const found = all.find(test);
      if (found) {
        voice = found;
        console.log('Mano Voice: Selected "' + found.name + '" (' + found.lang + ')');
        return;
      }
    }
    voice = all[0];
    console.log('Mano Voice: Fallback to "' + voice.name + '"');
  }

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 4: NATURAL SPEECH DELIVERY
  // Rate varies by context: celebrations are punchier, errors are slower.
  // Pitch stays at 1.0 to avoid the "robot" effect.
  // ═══════════════════════════════════════════════════════════════════
  function say(text, rate) {
    if (muted || !window.speechSynthesis) return;
    speechSynthesis.cancel();

    const u = new SpeechSynthesisUtterance(text);
    u.rate = rate || RATE_NORMAL;
    u.pitch = PITCH;
    u.volume = 1;
    if (voice) u.voice = voice;

    u.onstart = () => { if (muteBtn) muteBtn.classList.add('mano-speaking'); };
    u.onend = () => { if (muteBtn) muteBtn.classList.remove('mano-speaking'); };
    u.onerror = () => { if (muteBtn) muteBtn.classList.remove('mano-speaking'); };

    speechSynthesis.speak(u);
  }

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 5: VISUAL FEEDBACK
  // ═══════════════════════════════════════════════════════════════════
  function toast(cellId, msg, icon, cls) {
    const old = document.querySelector('.mano-toast');
    if (old) old.remove();
    clearTimeout(toastTimer);

    const cell = document.getElementById(cellId);
    if (!cell) return;

    const el = document.createElement('div');
    el.className = 'mano-toast ' + cls;
    el.innerHTML = '<span class="mano-toast-icon">' + icon + '</span><span class="mano-toast-text">' + msg + '</span>';
    cell.style.position = 'relative';
    cell.appendChild(el);

    requestAnimationFrame(() => el.classList.add('mano-toast-visible'));

    toastTimer = setTimeout(() => {
      el.classList.remove('mano-toast-visible');
      setTimeout(() => { if (el.parentNode) el.remove(); }, 300);
    }, TOAST_MS);
  }

  function glow(cellId, cls) {
    const cell = document.getElementById(cellId);
    if (!cell) return;
    cell.classList.remove('mano-glow-correct', 'mano-glow-partial', 'mano-glow-error', 'mano-glow-streak');
    cell.classList.add(cls);
    setTimeout(() => cell.classList.remove(cls), 2000);
  }

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 6: MUTE BUTTON
  // ═══════════════════════════════════════════════════════════════════
  function injectUI() {
    if (document.getElementById('manoMuteBtn')) return;
    const btn = document.createElement('button');
    btn.id = 'manoMuteBtn';
    btn.className = 'mano-mute-btn' + (muted ? ' mano-muted' : '');
    btn.setAttribute('aria-label', 'Toggle Mano voice assistant');
    btn.title = 'Mano Voice Assistant';
    btn.textContent = muted ? '🔇' : '🔊';
    btn.addEventListener('click', toggleMute, { passive: true });
    document.body.appendChild(btn);
    muteBtn = btn;
  }

  function toggleMute() {
    muted = !muted;
    try { localStorage.setItem('mano_voice_muted', muted ? '1' : '0'); } catch(e) {}
    if (muteBtn) {
      muteBtn.textContent = muted ? '🔇' : '🔊';
      muteBtn.classList.toggle('mano-muted', muted);
    }
    if (muted && window.speechSynthesis) speechSynthesis.cancel();
  }

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 7: PUBLIC API
  // ═══════════════════════════════════════════════════════════════════

  function onCorrect(cellId) {
    streak++;
    correctCount++;
    let line, icon, msg, rate = RATE_CELEBRATE;

    if (streak === 3) {
      line = R.s3; icon = '🔥'; msg = '3 in a row!';
      glow(cellId, 'mano-glow-streak');
      toast(cellId, msg, icon, 'mano-toast-streak');
    } else if (streak === 5) {
      line = R.s5; icon = '🔥'; msg = '5 in a row!';
      glow(cellId, 'mano-glow-streak');
      toast(cellId, msg, icon, 'mano-toast-streak');
    } else if (streak === 10) {
      line = R.s10; icon = '🔥'; msg = '10 in a row!';
      glow(cellId, 'mano-glow-streak');
      toast(cellId, msg, icon, 'mano-toast-streak');
    } else if (correctCount === 1) {
      line = R.first; icon = '✅'; msg = 'First one solved!';
      glow(cellId, 'mano-glow-correct');
      toast(cellId, msg, icon, 'mano-toast-correct');
    } else {
      line = pick(R.ok); icon = '✅'; msg = 'Correct!';
      glow(cellId, 'mano-glow-correct');
      toast(cellId, msg, icon, 'mano-toast-correct');
    }
    say(line, rate);
  }

  function onPartial(cellId, type) {
    const hadStreak = streak >= 3;
    streak = 0;
    let line, icon, msg;

    if (type === 'no_output') {
      line = pick(R.noOut); icon = '💡'; msg = 'No output — try print()';
      glow(cellId, 'mano-glow-partial');
      toast(cellId, msg, icon, 'mano-toast-partial');
    } else {
      line = pick(R.close); icon = '🤔'; msg = 'Almost there!';
      glow(cellId, 'mano-glow-partial');
      toast(cellId, msg, icon, 'mano-toast-partial');
    }
    say(hadStreak ? R.brk + '. ' + line : line, RATE_NORMAL);
  }

  function onWrong(cellId) {
    const hadStreak = streak >= 3;
    streak = 0;
    const line = pick(R.wrong);
    glow(cellId, 'mano-glow-error');
    toast(cellId, 'Re-read the question', '❌', 'mano-toast-error');
    say(hadStreak ? R.brk + '. ' + line : line, RATE_NORMAL);
  }

  function onError(cellId, errorMsg) {
    const hadStreak = streak >= 3;
    streak = 0;
    const h = hint(errorMsg);
    const errType = (errorMsg.match(/^(\w*Error)/m) || ['Error'])[0];
    glow(cellId, 'mano-glow-error');
    toast(cellId, errType + ' — listen for hint', '🐛', 'mano-toast-error');
    // Error hints spoken slower — patient teacher pace
    say(hadStreak ? R.brk + '. ' + h : h, RATE_ERROR);
  }

  function checkMilestone(solved, total) {
    if (total <= 0) return;
    const half = Math.ceil(total / 2);
    if (solved === half && lastMilestone < half) {
      lastMilestone = half;
      say(R.half, RATE_CELEBRATE);
    }
    if (solved === total && lastMilestone < total) {
      lastMilestone = total;
      say(R.done, RATE_CELEBRATE);
      const nb = document.querySelector('.notebook');
      if (nb) { nb.classList.add('mano-glow-celebrate'); setTimeout(() => nb.classList.remove('mano-glow-celebrate'), 3000); }
    }
  }

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 8: INIT
  // ═══════════════════════════════════════════════════════════════════
  function init() {
    if (!window.speechSynthesis) return;
    try { muted = localStorage.getItem('mano_voice_muted') === '1'; } catch(e) {}

    loadVoices();
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = loadVoices;
    }
    injectUI();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }

  return { onCorrect, onPartial, onWrong, onError, checkMilestone };
})();
