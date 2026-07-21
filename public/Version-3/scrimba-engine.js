/* ═══════════════════════════════════════════════════════════════
   Version-3: Scrimba SQL Sandbox — Complete Engine
   ═══════════════════════════════════════════════════════════════
   Modules:
   1. COURSE_CONFIG — all day-specific content (swap for new days)
   2. SQL Engine — sql.js init, seed, query execution
   3. CodeMirror + Autocomplete
   4. Smart Hint Engine
   5. Presentation Mode + Slides
   6. Laser Pointer + Drawing Canvas
   7. Table Peek Popover
   8. Recording Engine (IndexedDB + mic + action-array)
   9. Test Portal + Grading
   ═══════════════════════════════════════════════════════════════ */

// ═══════════════════════════════════════════════════════════════
// MODULE 1: COURSE_CONFIG
// ═══════════════════════════════════════════════════════════════

let COURSE_CONFIG = {
  dayId: 'day01',
  title: 'Introduction to SQL & Databases',
  schema: { tables: [] },
  practiceQuestions: [],
  testQuestions: [],
  topics: []
};

// ═══════════════════════════════════════════════════════════════
// MODULE 2: SQL ENGINE
// ═══════════════════════════════════════════════════════════════

let db = null;
let SQL_INSTANCE = null;  // Cached SQL.js constructor
const dbCache = new Map(); // Cache<seedKey, SQL.Database>
let activeSeedKey = null;

function getSeedDefinition(seedKey) {
  if (window.DB_SEEDS && window.DB_SEEDS[seedKey]) {
    return window.DB_SEEDS[seedKey];
  }
  if (seedKey === 'day01_db' && window.COURSE_CONTENT && window.COURSE_CONTENT['day01'] && window.COURSE_CONTENT['day01'].schema) {
    return window.COURSE_CONTENT['day01'].schema;
  }
  if (COURSE_CONFIG && COURSE_CONFIG.schema && COURSE_CONFIG.schema.tables && COURSE_CONFIG.schema.tables.length > 0) {
    return COURSE_CONFIG.schema;
  }
  return null;
}

function loadDatabaseSeed(seedKey) {
  if (!SQL_INSTANCE) return;

  // Verify if existing cached DB is valid and non-empty
  if (dbCache.has(seedKey)) {
    const cachedDb = dbCache.get(seedKey);
    try {
      const checkRes = cachedDb.exec("SELECT count(*) FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';");
      if (checkRes.length > 0 && checkRes[0].values && checkRes[0].values[0] && checkRes[0].values[0][0] > 0) {
        db = cachedDb;
        activeSeedKey = seedKey;
        const seedDef = getSeedDefinition(seedKey);
        if (seedDef) COURSE_CONFIG.schema = seedDef;
        return;
      }
    } catch (e) {
      // Corrupt or invalid cached DB, clear and rebuild
    }
    dbCache.delete(seedKey);
  }

  const seedDef = getSeedDefinition(seedKey);
  const newDb = new SQL_INSTANCE.Database();
  if (seedDef && seedDef.tables) {
    seedDef.tables.forEach(t => {
      if (t.createSQL) { try { newDb.run(t.createSQL); } catch (e) { console.error('Create SQL error:', e); } }
      if (t.seedSQL) { try { newDb.run(t.seedSQL); } catch (e) { console.error('Seed SQL error:', e); } }
    });
    COURSE_CONFIG.schema = seedDef;
  }
  dbCache.set(seedKey, newDb);
  db = newDb;
  activeSeedKey = seedKey;
}

function initDatabase() {
  return initSqlJs({
    locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${file}`
  }).then(SQL => {
    SQL_INSTANCE = SQL;
    const targetSeed = (window.COURSE_CONTENT && window.COURSE_CONTENT[currentDay] && window.COURSE_CONTENT[currentDay].db) || 'day01_db';
    loadDatabaseSeed(targetSeed);
    console.log('SQL.js initialized with database:', targetSeed);
    return db;
  });
}

// Reset the active database to original seeded state
function confirmResetDatabase() {
  if (!confirm('Reset the database to its original state? Any data changes you made in this session will be lost.')) return;
  if (!SQL_INSTANCE || !activeSeedKey) return;

  dbCache.delete(activeSeedKey);
  loadDatabaseSeed(activeSeedKey);

  // Clear output
  const outputEl = document.getElementById('mainOutput');
  if (outputEl) {
    outputEl.innerHTML = '<div class="output-label">Terminal Output</div><span class="output-success">✅ Database reset to original state.</span>';
  }
  showToast('✅ Database reset to original state');
}

function showToast(msg, duration = 3000) {
  let toast = document.getElementById('globalToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'globalToast';
    toast.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:#1e293b;border:1px solid #2a2e45;color:#e2e8f0;padding:10px 18px;border-radius:8px;font-family:Inter,sans-serif;font-size:0.82rem;font-weight:600;z-index:9999;opacity:0;transition:opacity 0.25s ease;pointer-events:none;';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.opacity = '1';
  setTimeout(() => { toast.style.opacity = '0'; }, duration);
}

function runSQL(query) {
  if (!db) throw new Error('Database not initialized.');
  const trimmed = query.trim();
  if (!trimmed) throw new Error('SQL query cannot be empty.');
  const results = db.exec(trimmed);
  if (results.length === 0) return { columns: [], values: [], message: 'Query executed successfully. No rows returned.' };
  return { columns: results[0].columns, values: results[0].values };
}

function getSchemaInfo() {
  const info = {};
  if (COURSE_CONFIG && COURSE_CONFIG.schema && COURSE_CONFIG.schema.tables) {
    COURSE_CONFIG.schema.tables.forEach(t => {
      if (t && t.name && t.columns) {
        info[t.name] = t.columns.map(c => c.name);
      }
    });
  }
  return info;
}

function renderResultTable(result, targetId) {
  const el = document.getElementById(targetId);
  if (!el) return;

  if (result.message && result.values.length === 0) {
    el.innerHTML = `<div class="output-label">Terminal Output</div><span class="output-success">${result.message}</span>`;
    return;
  }

  let html = '<div class="output-label">Query Result</div><table class="result-table"><thead><tr>';
  result.columns.forEach(col => { html += `<th>${escHtml(String(col))}</th>`; });
  html += '</tr></thead><tbody>';
  result.values.forEach(row => {
    html += '<tr>';
    row.forEach(val => { html += `<td>${val !== null ? escHtml(String(val)) : 'NULL'}</td>`; });
    html += '</tr>';
  });
  html += '</tbody></table>';
  el.innerHTML = html;
}

function renderError(msg, hint, targetId) {
  const el = document.getElementById(targetId);
  if (!el) return;
  let html = '<div class="output-label">Terminal Output</div>';
  if (hint) html += `<div class="output-hint">💡 Hint: ${escHtml(hint)}</div>`;
  html += `<div class="output-error">Error: ${escHtml(msg)}</div>`;
  el.innerHTML = html;
}

function escHtml(s) {
  const d = document.createElement('div');
  d.textContent = s;
  return d.innerHTML;
}

// ═══════════════════════════════════════════════════════════════
// MODULE 3: CODEMIRROR + AUTOCOMPLETE
// ═══════════════════════════════════════════════════════════════

let mainEditor = null;
let testEditor = null;

function initMainEditor() {
  const schema = getSchemaInfo();
  const hintTables = {};
  Object.keys(schema).forEach(t => { hintTables[t] = schema[t]; });

  mainEditor = CodeMirror(document.getElementById('mainEditorWrap'), {
    value: '-- Write your SQL query here\n',
    mode: 'text/x-sql',
    theme: 'dracula',
    lineNumbers: true,
    autoCloseBrackets: true,
    matchBrackets: true,
    extraKeys: {
      'Ctrl-Space': 'autocomplete',
      'Ctrl-Enter': () => runCurrentQuery()
    },
    hintOptions: {
      tables: hintTables,
      completeSingle: false
    }
  });

  // Auto-trigger autocomplete on typing
  mainEditor.on('inputRead', (cm, change) => {
    if (change.origin !== '+input') return;
    // Don't autocomplete inside strings
    const token = cm.getTokenAt(cm.getCursor());
    if (token.type && token.type.indexOf('string') !== -1) return;
    const text = change.text[0];
    if (/[a-zA-Z_.]/.test(text)) {
      cm.showHint({ completeSingle: false });
    }
  });

  mainEditor.on('focus', () => {
    pauseCombinedPlayback();
  });
  document.getElementById('mainEditorWrap')?.addEventListener('click', () => {
    pauseCombinedPlayback();
  });
}

function initTestEditor() {
  const schema = getSchemaInfo();
  const hintTables = {};
  Object.keys(schema).forEach(t => { hintTables[t] = schema[t]; });

  testEditor = CodeMirror(document.getElementById('testEditorWrap'), {
    value: '-- Write your answer here\n',
    mode: 'text/x-sql',
    theme: 'dracula',
    lineNumbers: true,
    autoCloseBrackets: true,
    matchBrackets: true,
    extraKeys: {
      'Ctrl-Space': 'autocomplete',
      'Ctrl-Enter': () => runTestQuery()
    },
    hintOptions: {
      tables: hintTables,
      completeSingle: false
    }
  });

  testEditor.on('inputRead', (cm, change) => {
    if (change.origin !== '+input') return;
    const token = cm.getTokenAt(cm.getCursor());
    if (token.type && token.type.indexOf('string') !== -1) return;
    if (/[a-zA-Z_.]/.test(change.text[0])) {
      cm.showHint({ completeSingle: false });
    }
  });

  testEditor.on('focus', () => {
    pauseCombinedPlayback();
  });
  document.getElementById('testEditorWrap')?.addEventListener('click', () => {
    pauseCombinedPlayback();
  });
}

// ═══════════════════════════════════════════════════════════════
// MODULE 4: SMART HINT ENGINE
// ═══════════════════════════════════════════════════════════════

function analyzeQueryError(query, rawError) {
  const msg = rawError.message || String(rawError);
  const allColumns = [];
  COURSE_CONFIG.schema.tables.forEach(t => t.columns.forEach(c => allColumns.push(c.name)));
  const allTables = COURSE_CONFIG.schema.tables.map(t => t.name);

  // Check for missing quotes around string in WHERE
  const whereMatch = query.match(/WHERE\s+\w+\s*=\s*([a-zA-Z_]\w*)/i);
  if (whereMatch && !allColumns.includes(whereMatch[1]) && !allTables.includes(whereMatch[1])) {
    return `It looks like you're comparing to a text value without quotes. Try wrapping '${whereMatch[1]}' in single quotes.`;
  }

  // Check for column name typo (Levenshtein ≤ 2)
  const noSuchCol = msg.match(/no such column:\s*(\w+)/i);
  if (noSuchCol) {
    const typo = noSuchCol[1];
    let bestMatch = null, bestDist = 3;
    allColumns.forEach(col => {
      const d = levenshtein(typo.toLowerCase(), col.toLowerCase());
      if (d < bestDist) { bestDist = d; bestMatch = col; }
    });
    if (bestMatch) {
      return `Column '${typo}' doesn't exist. Did you mean '${bestMatch}'?`;
    }
  }

  // Check for no such table
  const noSuchTable = msg.match(/no such table:\s*(\w+)/i);
  if (noSuchTable) {
    const typo = noSuchTable[1];
    let bestMatch = null, bestDist = 3;
    allTables.forEach(tbl => {
      const d = levenshtein(typo.toLowerCase(), tbl.toLowerCase());
      if (d < bestDist) { bestDist = d; bestMatch = tbl; }
    });
    if (bestMatch) {
      return `Table '${typo}' doesn't exist. Did you mean '${bestMatch}'?`;
    }
  }

  // Check for missing FROM
  if (/SELECT/i.test(query) && !/FROM/i.test(query) && /no such column/i.test(msg)) {
    return 'Your query is missing a FROM clause. Specify which table to query.';
  }

  // Clean up raw message
  return null;
}

function levenshtein(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = a[i - 1] === b[j - 1] ? dp[i - 1][j - 1] : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
  return dp[m][n];
}

function autoHighlightSql(container) {
  if (!container) return;
  const pres = container.querySelectorAll('pre');
  pres.forEach(pre => {
    if (pre.getAttribute('data-sql-highlighted') === 'true') return;
    let text = pre.textContent || pre.innerText;
    if (!text || !text.trim()) return;

    let raw = text
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>');

    function esc(s) {
      return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    const SQL_KEYWORDS = [
      'SELECT', 'FROM', 'WHERE', 'AS', 'JOIN', 'LEFT', 'RIGHT', 'INNER', 'OUTER', 'CROSS',
      'ON', 'GROUP BY', 'ORDER BY', 'HAVING', 'LIMIT', 'OFFSET', 'DISTINCT', 'UNION', 'ALL',
      'INTERSECT', 'EXCEPT', 'INSERT', 'INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE', 'CREATE',
      'TABLE', 'DATABASE', 'PRIMARY', 'KEY', 'FOREIGN', 'REFERENCES', 'CONSTRAINT', 'DROP',
      'ALTER', 'ADD', 'COLUMN', 'DEFAULT', 'CHECK', 'INDEX', 'VIEW', 'AND', 'OR', 'NOT', 'IN',
      'IS', 'NULL', 'LIKE', 'ILIKE', 'BETWEEN', 'CASE', 'WHEN', 'THEN', 'ELSE', 'END', 'ASC',
      'DESC', 'OVER', 'PARTITION BY', 'ROWS', 'RANGE', 'UNBOUNDED', 'PRECEDING', 'FOLLOWING',
      'CURRENT ROW', 'WITH', 'RECURSIVE', 'IF', 'EXISTS', 'UNIQUE', 'RESTRICT', 'CASCADE'
    ];

    const SQL_TYPES = [
      'UUID', 'TEXT', 'VARCHAR', 'CHAR', 'INT', 'INTEGER', 'BIGINT', 'SMALLINT',
      'NUMERIC', 'DECIMAL', 'FLOAT', 'REAL', 'DOUBLE', 'PRECISION', 'BOOLEAN',
      'DATE', 'TIME', 'TIMESTAMP', 'TIMESTAMPTZ', 'INTERVAL', 'JSON', 'JSONB', 'SERIAL', 'BIGSERIAL'
    ];

    const SQL_FUNCTIONS = [
      'GEN_RANDOM_UUID', 'NOW', 'CURRENT_DATE', 'CURRENT_TIME', 'CURRENT_TIMESTAMP',
      'COUNT', 'SUM', 'AVG', 'MIN', 'MAX', 'CAST', 'COALESCE', 'EXTRACT', 'DATE_TRUNC',
      'DATE_PART', 'LAG', 'LEAD', 'RANK', 'DENSE_RANK', 'ROW_NUMBER', 'NTILE', 'UPPER',
      'LOWER', 'INITCAP', 'LENGTH', 'CHAR_LENGTH', 'TRIM', 'LTRIM', 'RTRIM', 'LPAD',
      'RPAD', 'CONCAT', 'CONCAT_WS', 'SUBSTRING', 'LEFT', 'RIGHT', 'POSITION', 'STRPOS',
      'REPLACE', 'REGEXP_REPLACE', 'SPLIT_PART', 'ROUND', 'CEIL', 'FLOOR', 'ABS'
    ];

    const SQL_BOOLEANS = ['TRUE', 'FALSE'];

    const masterRegex = /(--[^\n]*)|("[^"\n]*"|'[^'\n]*')|\b([a-zA-Z_][a-zA-Z0-9_]*)\s*(?=\()|\b([a-zA-Z_][a-zA-Z0-9_]*|\d+(?:\.\d+)?)\b/g;

    let resultHtml = raw.replace(masterRegex, (match, comment, str, func, word) => {
      if (comment) {
        const isError = comment.toLowerCase().includes('error');
        const isSuccess = comment.includes('✅') || comment.toLowerCase().includes('valid') || comment.toLowerCase().includes('works');
        const style = isError ? 'color: #f87171 !important;' : (isSuccess ? 'color: #34d399 !important;' : '');
        return `<span class="sql-comment" style="${style}">${esc(comment)}</span>`;
      }
      if (str) {
        return `<span class="sql-string">${esc(str)}</span>`;
      }
      if (func) {
        const upperFunc = func.toUpperCase();
        if (SQL_FUNCTIONS.includes(upperFunc)) {
          return `<span class="sql-function">${esc(func)}</span>`;
        }
        if (SQL_KEYWORDS.includes(upperFunc)) {
          return `<span class="sql-keyword">${esc(func)}</span>`;
        }
        if (SQL_TYPES.includes(upperFunc)) {
          return `<span class="sql-type">${esc(func)}</span>`;
        }
        return `<span class="sql-identifier">${esc(func)}</span>`;
      }
      if (word) {
        const upperWord = word.toUpperCase();
        if (/^\d+(?:\.\d+)?$/.test(word)) {
          return `<span class="sql-number">${esc(word)}</span>`;
        }
        if (SQL_BOOLEANS.includes(upperWord)) {
          return `<span class="sql-boolean">${esc(word)}</span>`;
        }
        if (SQL_TYPES.includes(upperWord)) {
          return `<span class="sql-type">${esc(word)}</span>`;
        }
        if (SQL_KEYWORDS.includes(upperWord)) {
          return `<span class="sql-keyword">${esc(word)}</span>`;
        }
        return `<span class="sql-identifier">${esc(word)}</span>`;
      }
      return esc(match);
    });

    const codeEl = pre.querySelector('code');
    if (codeEl) {
      codeEl.innerHTML = resultHtml;
    } else {
      pre.innerHTML = `<code class="sql">${resultHtml}</code>`;
    }
    pre.setAttribute('data-sql-highlighted', 'true');
  });
}

// ═══════════════════════════════════════════════════════════════
// MODULE 5: PRESENTATION MODE + SLIDES
// ═══════════════════════════════════════════════════════════════

let currentSlide = 0;
let presentOpen = false;

function openPresentMode() {
  currentSlide = 0;
  presentOpen = true;
  document.getElementById('presentOverlay').classList.add('open');
  renderPresentSlide();
  resizeDrawCanvas();
  document.addEventListener('keydown', presentKeyHandler);
}

function closePresentMode() {
  presentOpen = false;
  document.getElementById('presentOverlay').classList.remove('open');
  document.removeEventListener('keydown', presentKeyHandler);
  deactivateLaser();
  deactivatePen();
  clearDrawCanvas();
}

function nextSlide() {
  if (currentSlide < COURSE_CONFIG.slides.length - 1) {
    currentSlide++;
    renderCurrentSlide();
    clearDrawCanvas();
  }
}

function prevSlide() {
  if (currentSlide > 0) {
    currentSlide--;
    renderCurrentSlide();
    clearDrawCanvas();
  }
}

function renderCurrentSlide() {
  renderPresentSlide();
  renderSideSlide();
}

function formatHeadingBoxes(container) {
  if (!container) return;
  const headings = container.querySelectorAll('h3:not(.heading-box-formatted)');
  let sectionIndex = 1;
  headings.forEach(h3 => {
    if (h3.classList.contains('heading-box-formatted')) return;
    h3.classList.add('heading-box-formatted');

    const audioBtn = h3.querySelector('.audio-play-btn');
    const audioHtml = audioBtn ? audioBtn.outerHTML : '';
    if (audioBtn) audioBtn.remove();

    let rawText = h3.textContent.trim();

    let emoji = '';
    const emojiMatch = rawText.match(/^([\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F000}-\u{1F02F}\u{1F0A0}-\u{1F0F5}\u{1F1E0}-\u{1F1FF}]+)\s*/u);
    if (emojiMatch) {
      emoji = emojiMatch[1] + ' ';
      rawText = rawText.slice(emojiMatch[0].length).trim();
    }

    const numMatch = rawText.match(/^(\d+\.?)\s*(.*)$/);

    let numStr = '';
    let textStr = '';

    if (numMatch) {
      numStr = numMatch[1].replace(/\.$/, '');
      if (numStr.length === 1) numStr = '0' + numStr;
      textStr = emoji + numMatch[2];
    } else {
      numStr = String(sectionIndex).padStart(2, '0');
      textStr = emoji + rawText;
    }
    sectionIndex++;

    h3.classList.add('heading-box-wrap');
    h3.innerHTML = `
      <span class="heading-num-box">${numStr}</span>
      <span class="heading-title-box">
        <span class="heading-title-text">${textStr}</span>
        ${audioHtml}
      </span>
    `;
  });
}

function renderPresentSlide() {
  const slide = COURSE_CONFIG.slides[currentSlide];
  const container = document.getElementById('presentSlideContent');
  if (container) {
    container.innerHTML = slide.html;
    formatHeadingBoxes(container);
    autoHighlightSql(container);
    container.scrollTop = 0;
  }
  const cleanedTitle = slide.title.replace(/^(Topic\s+\d+:\s*|\d+\.\s*)/i, '');
  const hasManySlides = COURSE_CONFIG.slides && COURSE_CONFIG.slides.length > 1;
  document.getElementById('presentCounter').textContent = hasManySlides ? `Topic 0${currentSlide + 1} — ${cleanedTitle}` : cleanedTitle;
  const topicSelect = document.getElementById('topicSelect');
  if (topicSelect) topicSelect.value = currentSlide;

  if (typeof isCombinedPlaying !== 'undefined' && isCombinedPlaying) {
    const activeTrack = combinedTracks[combinedTrackIndex];
    if (activeTrack && activeTrack.target) {
      updateSlidePlaybackVisibility(activeTrack.target);
    }
  } else if (typeof clearSlidePlaybackVisibility === 'function') {
    clearSlidePlaybackVisibility();
  }
}

function renderSideSlide() {
  if (typeof currentGeneration !== 'undefined') {
    currentGeneration++;
  }
  if (activeAudioInstance) {
    activeAudioInstance.pause();
    activeAudioInstance.src = "";
    activeAudioInstance.load();
    activeAudioInstance = null;
  }
  if (currentPlayingAudio) {
    currentPlayingAudio.pause();
    currentPlayingAudio.src = "";
    currentPlayingAudio.load();
    currentPlayingAudio = null;
  }
  if (currentPlayingBtn) {
    currentPlayingBtn.innerHTML = `<svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`;
    currentPlayingBtn.classList.remove('playing');
    currentPlayingBtn = null;
  }
  isCombinedPlaying = false;

  // Save progress of the last active slide before rendering the new one
  if (typeof lastActiveSlideIndex !== 'undefined' && typeof lastActiveDay !== 'undefined') {
    if (lastActiveSlideIndex !== currentSlide || lastActiveDay !== currentDay) {
      const oldKey = `${lastActiveDay}_${lastActiveSlideIndex}`;
      slideProgressHistory[oldKey] = {
        trackIndex: combinedTrackIndex || 0,
        audioTime: activeAudioInstance ? activeAudioInstance.currentTime : 0,
        combinedTime: currentCombinedTime || 0
      };
    }
  }
  // Update tracking variables to current values
  lastActiveSlideIndex = currentSlide;
  lastActiveDay = currentDay;

  const slide = COURSE_CONFIG.slides[currentSlide];

  // Parse the slide HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = slide.html;

  // Extract h2
  const h2 = tempDiv.querySelector('h2');
  const headerHtml = h2 ? h2.outerHTML : '';
  if (h2) h2.remove();
  const bodyHtml = tempDiv.innerHTML;

  // Populate elements
  const slideHeader = document.getElementById('slideHeader');
  if (slideHeader) slideHeader.innerHTML = headerHtml;

  const slideBodyText = document.getElementById('slideBodyText');
  if (slideBodyText) {
    slideBodyText.innerHTML = bodyHtml;
    // P1 #10: ensure skeleton is hidden once real content is rendered
    const skel = document.getElementById('slideSkeleton');
    if (skel) { skel.style.display = 'none'; skel.setAttribute('aria-hidden', 'true'); }
    formatHeadingBoxes(slideBodyText);
    autoHighlightSql(slideBodyText);
    // Re-execute any <script> tags injected via innerHTML (browser security blocks them)
    slideBodyText.querySelectorAll('script').forEach(function (oldScript) {
      const newScript = document.createElement('script');
      Array.from(oldScript.attributes).forEach(function (attr) {
        newScript.setAttribute(attr.name, attr.value);
      });
      newScript.textContent = oldScript.textContent;
      oldScript.parentNode.replaceChild(newScript, oldScript);
    });
  }

  // P2 #19: Dynamic document.title per-slide
  try {
    const dayNum = String(parseInt((currentDay || 'day01').replace('day', ''), 10)).padStart(2, '0');
    const slideTitle = slide.title ? slide.title.replace(/^(Topic\s+\d+:\s*|\d+\.\s*)/i, '').trim() : '';
    document.title = slideTitle
      ? `Manodemy — Day ${dayNum}: ${slideTitle}`
      : `Manodemy — Day ${dayNum}`;
  } catch (e) { /* ignore */ }


  const slideContent = document.getElementById('slideContent');
  if (slideContent) {
    slideContent.scrollTop = 0;
  }

  // Update canvas size to match the new scroll size of slideContent
  resizeWsCanvas();

  const cleanedTitle = slide.title.replace(/^(Topic\s+\d+:\s*|\d+\.\s*)/i, '');
  const hasManySlides = COURSE_CONFIG.slides && COURSE_CONFIG.slides.length > 1;
  const slideCounter = document.getElementById('slideCounter');
  if (slideCounter) {
    slideCounter.textContent = hasManySlides ? `Topic 0${currentSlide + 1} — ${cleanedTitle}` : cleanedTitle;
  }
  const topicSelect = document.getElementById('topicSelect');
  if (topicSelect) topicSelect.value = currentSlide;

  if (typeof isCombinedPlaying !== 'undefined' && isCombinedPlaying) {
    const activeTrack = combinedTracks[combinedTrackIndex];
    if (activeTrack && activeTrack.target) {
      updateSlidePlaybackVisibility(activeTrack.target);
    }
  } else if (typeof clearSlidePlaybackVisibility === 'function') {
    clearSlidePlaybackVisibility();
  }

  // Log slide change if recording
  if (recState !== 'idle') {
    const target = isStudioStrokeRecording ? studioStrokeActions : recActions;
    target.push({
      t: getRecElapsedMs(),
      type: 'slide',
      slideIdx: currentSlide
    });
    updateTimelineView();
  }

  // Show narration autoplay widget if the slide has tracks defined
  const dayConfig = (typeof slideTrackMap !== 'undefined') ? slideTrackMap[currentDay] : null;
  const config = dayConfig ? dayConfig[currentSlide] : null;
  if (config) {
    // Swapping track list dynamically
    combinedTracks = config.tracks;
    combinedTrackDurations = config.durations;

    // Stop currently playing combined narration cleanly if active
    if (activeAudioInstance) {
      activeAudioInstance.pause();
      activeAudioInstance.src = "";
      activeAudioInstance.load();
      activeAudioInstance = null;
    }
    isCombinedPlaying = false;
    combinedAudios = [];

    // Restore progress if it exists in history
    const newKey = `${currentDay}_${currentSlide}`;
    const saved = slideProgressHistory[newKey];
    if (saved) {
      combinedTrackIndex = saved.trackIndex;
      currentCombinedTime = saved.combinedTime;
      pendingAudioStartTime = saved.audioTime;
    } else {
      currentCombinedTime = 0;
      combinedTrackIndex = 0;
      pendingAudioStartTime = 0;
    }

    // Update UI button states
    updatePlayButtonStates(false);

    // Re-calculate total duration
    recomputeTotalDuration();

    const navBtn = document.getElementById('navPlayBtn');
    if (navBtn) navBtn.style.display = 'inline-flex';
    document.getElementById('playbackBar')?.classList.add('visible');
    initSlideNarration();
    updateProgressUI();
  } else {
    const navBtn = document.getElementById('navPlayBtn');
    if (navBtn) navBtn.style.display = 'none';
    document.getElementById('playbackBar')?.classList.remove('visible');
    pauseCombinedPlayback();
  }
}

function presentKeyHandler(e) {
  // Don't intercept if user is typing in an input/textarea
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
  // Don't intercept if a CodeMirror editor is focused
  if (e.target.closest('.CodeMirror')) return;

  if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); nextSlide(); }
  else if (e.key === 'ArrowLeft') { e.preventDefault(); prevSlide(); }
  else if (e.key === 'Escape') { e.preventDefault(); closePresentMode(); }
}

// ═══════════════════════════════════════════════════════════════
// MODULE 6: LASER POINTER + DRAWING CANVAS
// ═══════════════════════════════════════════════════════════════

let drawMode = 'none'; // 'none' | 'laser' | 'pen'
let isDrawing = false;
let laserPoints = [];
let laserAnimId = null;

function getCanvas() { return document.getElementById('drawCanvas'); }
function getCtx() { return getCanvas().getContext('2d'); }

function resizeDrawCanvas() {
  const canvas = getCanvas();
  const parent = canvas.parentElement;
  canvas.width = parent.clientWidth;
  canvas.height = parent.clientHeight;
}

function toggleLaser() {
  if (drawMode === 'laser') { deactivateLaser(); return; }
  deactivatePen();
  drawMode = 'laser';
  const canvas = getCanvas();
  canvas.classList.add('active', 'laser');
  document.getElementById('laserBtn').classList.add('active');
  canvas.addEventListener('pointermove', laserMove);
  laserAnimId = requestAnimationFrame(laserLoop);
}

function deactivateLaser() {
  drawMode = drawMode === 'laser' ? 'none' : drawMode;
  const canvas = getCanvas();
  canvas.classList.remove('active', 'laser');
  document.getElementById('laserBtn').classList.remove('active');
  canvas.removeEventListener('pointermove', laserMove);
  if (laserAnimId) { cancelAnimationFrame(laserAnimId); laserAnimId = null; }
  laserPoints = [];
  clearDrawCanvas();
}

function laserMove(e) {
  const rect = getCanvas().getBoundingClientRect();
  laserPoints.push({ x: e.clientX - rect.left, y: e.clientY - rect.top, opacity: 1.0 });
}

function laserLoop() {
  const ctx = getCtx();
  const canvas = getCanvas();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = laserPoints.length - 1; i >= 0; i--) {
    laserPoints[i].opacity -= 0.025;
    if (laserPoints[i].opacity <= 0) { laserPoints.splice(i, 1); continue; }
    const p = laserPoints[i];
    ctx.beginPath();
    ctx.arc(p.x, p.y, 6, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0, 230, 246, ${p.opacity})`;
    ctx.shadowBlur = 18;
    ctx.shadowColor = `rgba(0, 230, 246, ${p.opacity * 0.6})`;
    ctx.fill();
    ctx.shadowBlur = 0;
  }
  if (drawMode === 'laser') laserAnimId = requestAnimationFrame(laserLoop);
}

function togglePen() {
  if (drawMode === 'pen') { deactivatePen(); return; }
  deactivateLaser();
  drawMode = 'pen';
  const canvas = getCanvas();
  canvas.classList.add('active');
  canvas.classList.remove('laser');
  document.getElementById('penBtn').classList.add('active');
  canvas.addEventListener('pointerdown', penDown);
  canvas.addEventListener('pointermove', penMove);
  canvas.addEventListener('pointerup', penUp);
}

function deactivatePen() {
  drawMode = drawMode === 'pen' ? 'none' : drawMode;
  const canvas = getCanvas();
  canvas.classList.remove('active');
  document.getElementById('penBtn').classList.remove('active');
  canvas.removeEventListener('pointerdown', penDown);
  canvas.removeEventListener('pointermove', penMove);
  canvas.removeEventListener('pointerup', penUp);
  isDrawing = false;
}

function penDown(e) {
  isDrawing = true;
  const ctx = getCtx();
  const rect = getCanvas().getBoundingClientRect();
  ctx.beginPath();
  ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
}

function penMove(e) {
  if (!isDrawing) return;
  const ctx = getCtx();
  const rect = getCanvas().getBoundingClientRect();
  ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
  ctx.stroke();
}

function penUp() { isDrawing = false; }

function clearDrawCanvas() {
  const canvas = getCanvas();
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  laserPoints = [];
}

// ─── Workspace Drawing Canvas Setup ───
let wsDrawMode = 'none'; // 'none' | 'rect'
let wsIsDrawing = false;
let wsStartX = 0;
let wsStartY = 0;
let wsDrawnRects = []; // persistent array of {x1%, y1%, x2%, y2%} for resize-safe repainting

function getWsCanvas() { return document.getElementById('workspaceDrawCanvas'); }
function getWsCtx() { const c = getWsCanvas(); return c ? c.getContext('2d') : null; }

function resizeWsCanvas() {
  const canvas = getWsCanvas();
  if (!canvas) return;

  // Collapse canvas temporarily to prevent layout stretching feedback loop
  canvas.style.width = '0px';
  canvas.style.height = '0px';
  canvas.width = 0;
  canvas.height = 0;

  const parent = canvas.parentElement;
  const scrollWidth = parent.scrollWidth || parent.clientWidth;
  const scrollHeight = parent.scrollHeight || parent.clientHeight;

  const dpr = window.devicePixelRatio || 1;

  // Backing store buffer (scaled by DPR)
  canvas.width = scrollWidth * dpr;
  canvas.height = scrollHeight * dpr;

  // CSS layout size (logical pixels)
  canvas.style.width = `${scrollWidth}px`;
  canvas.style.height = `${scrollHeight}px`;

  const ctx = getWsCtx();
  if (ctx) {
    ctx.scale(dpr, dpr);
  }

  // Repaint all stored rects after resize (setting .width clears canvas)
  repaintWsRects();

  // Refresh timeline layout positions
  if (typeof updateTimelineView === 'function') {
    updateTimelineView();
  }
}

function repaintWsRects() {
  const canvas = getWsCanvas();
  const ctx = getWsCtx();
  if (!canvas || !ctx) return;

  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.restore();

  const parent = canvas.parentElement;
  if (!parent) return;
  const logicalWidth = parent.scrollWidth || parent.clientWidth;
  const logicalHeight = parent.scrollHeight || parent.clientHeight;

  wsDrawnRects.forEach(r => {
    const x = r.x1Pct * logicalWidth;
    const y = r.y1Pct * logicalHeight;
    const w = (r.x2Pct - r.x1Pct) * logicalWidth;
    const h = (r.y2Pct - r.y1Pct) * logicalHeight;

    ctx.fillStyle = 'rgba(245, 158, 11, 0.15)';
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 1.5;
    ctx.fillRect(x, y, w, h);
    ctx.strokeRect(x, y, w, h);
  });
}

function clearWsCanvas() {
  const canvas = getWsCanvas();
  const ctx = getWsCtx();
  if (!canvas || !ctx) return;
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.restore();
}

function setWsDrawMode(mode) {
  wsDrawMode = mode;
  const canvas = getWsCanvas();
  if (!canvas) return;

  const btn = document.getElementById('wsRectBtn');
  if (btn) btn.classList.remove('active');
  canvas.classList.remove('active');

  canvas.removeEventListener('pointerdown', wsPointerDown);
  canvas.removeEventListener('pointermove', wsPointerMove);
  canvas.removeEventListener('pointerup', wsPointerUp);

  if (mode === 'rect') {
    canvas.classList.add('active');
    if (btn) btn.classList.add('active');
    canvas.addEventListener('pointerdown', wsPointerDown);
    canvas.addEventListener('pointermove', wsPointerMove);
    canvas.addEventListener('pointerup', wsPointerUp);
  }
}

function wsPointerDown(e) {
  if (wsDrawMode !== 'rect') return;
  wsIsDrawing = true;
  const canvas = getWsCanvas();
  if (!canvas) return;
  const rect = canvas.getBoundingClientRect();
  wsStartX = e.clientX - rect.left;
  wsStartY = e.clientY - rect.top;
}

function wsPointerMove(e) {
  if (!wsIsDrawing || wsDrawMode !== 'rect') return;
  const canvas = getWsCanvas();
  const ctx = getWsCtx();
  if (!canvas || !ctx) return;
  const rect = canvas.getBoundingClientRect();
  const currentX = e.clientX - rect.left;
  const currentY = e.clientY - rect.top;

  repaintWsRects();

  ctx.fillStyle = 'rgba(245, 158, 11, 0.15)';
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 1.5;
  const width = currentX - wsStartX;
  const height = currentY - wsStartY;
  ctx.fillRect(wsStartX, wsStartY, width, height);
  ctx.strokeRect(wsStartX, wsStartY, width, height);
}

function wsPointerUp(e) {
  if (!wsIsDrawing || wsDrawMode !== 'rect') return;
  wsIsDrawing = false;
  const canvas = getWsCanvas();
  if (!canvas) return;
  const rect = canvas.getBoundingClientRect();
  const currentX = e.clientX - rect.left;
  const currentY = e.clientY - rect.top;

  const parent = canvas.parentElement;
  if (!parent) return;
  const logicalWidth = parent.scrollWidth || parent.clientWidth;
  const logicalHeight = parent.scrollHeight || parent.clientHeight;

  const rectPct = {
    x1Pct: wsStartX / logicalWidth,
    y1Pct: wsStartY / logicalHeight,
    x2Pct: currentX / logicalWidth,
    y2Pct: currentY / logicalHeight
  };
  wsDrawnRects.push(rectPct);

  repaintWsRects();

  if (recState !== 'idle') {
    const target = isStudioStrokeRecording ? studioStrokeActions : recActions;
    target.push({
      t: getRecElapsedMs(),
      type: 'drawRect',
      x1Pct: rectPct.x1Pct,
      y1Pct: rectPct.y1Pct,
      x2Pct: rectPct.x2Pct,
      y2Pct: rectPct.y2Pct
    });
    updateTimelineView();
  }

  if (typeof checkStudioHighlightRelease === 'function') {
    checkStudioHighlightRelease(rectPct);
  }
}

function undoLastHighlight() {
  if (wsDrawnRects.length === 0) return;
  wsDrawnRects.pop();
  repaintWsRects();
  // Also remove the last drawRect from recActions if recording
  if (recState !== 'idle') {
    const target = isStudioStrokeRecording ? studioStrokeActions : recActions;
    for (let i = target.length - 1; i >= 0; i--) {
      if (target[i].type === 'drawRect') {
        target.splice(i, 1);
        break;
      }
    }
    updateTimelineView();
  }
}

function clearWsDrawings() {
  wsDrawnRects = [];
  clearWsCanvas();
  if (recState !== 'idle') {
    const target = isStudioStrokeRecording ? studioStrokeActions : recActions;
    target.push({
      t: getRecElapsedMs(),
      type: 'clearDraw'
    });
    updateTimelineView();
  }
}

// ═══════════════════════════════════════════════════════════════
// MODULE 7: TABLE PEEK POPOVER
// ═══════════════════════════════════════════════════════════════

function renderSchemaCards() {
  const container = document.getElementById('schemaCards');
  if (!container) return;
  let html = '';
  COURSE_CONFIG.schema.tables.forEach(t => {
    html += `<div class="schema-card">
      <div class="schema-card-title">
        <span>📊 ${t.name}</span>
        <button class="peek-btn" onclick="openPeekPopover(event, '${t.name}')">👀 Peek Data</button>
      </div>
      <div class="schema-cols">`;
    t.columns.forEach(c => {
      html += `<span class="schema-col ${c.pk ? 'schema-col--pk' : ''}">${c.name} <span style="opacity:0.5">${c.type}</span></span>`;
    });
    html += `</div></div>`;
  });
  container.innerHTML = html;
}

function openPeekPopover(e, tableName) {
  e.stopPropagation();
  try {
    const result = runSQL(`SELECT * FROM ${tableName} LIMIT 3;`);
    let html = '<table class="result-table">';
    html += '<thead><tr>';
    result.columns.forEach(c => { html += `<th>${escHtml(c)}</th>`; });
    html += '</tr></thead><tbody>';
    result.values.forEach(row => {
      html += '<tr>';
      row.forEach(v => { html += `<td>${v !== null ? escHtml(String(v)) : 'NULL'}</td>`; });
      html += '</tr>';
    });
    html += '</tbody></table>';
    document.getElementById('peekContent').innerHTML = html;
    document.getElementById('peekTableName').textContent = tableName;
  } catch (err) {
    document.getElementById('peekContent').innerHTML = `<span class="output-error">${escHtml(err.message)}</span>`;
  }

  const pop = document.getElementById('peekPopover');
  // Position near click
  pop.style.top = Math.min(e.clientY, window.innerHeight - 260) + 'px';
  pop.style.left = Math.min(e.clientX, window.innerWidth - 360) + 'px';
  pop.classList.add('open');
}

function togglePeekPopover(e) {
  const pop = document.getElementById('peekPopover');
  if (pop.classList.contains('open')) { closePeekPopover(); return; }
  openPeekPopover(e, COURSE_CONFIG.schema.tables[0].name);
}

function closePeekPopover() {
  document.getElementById('peekPopover').classList.remove('open');
}

// Close popover on outside click
document.addEventListener('click', function (e) {
  const pop = document.getElementById('peekPopover');
  if (pop.classList.contains('open') && !pop.contains(e.target) && !e.target.closest('.peek-btn') && !e.target.closest('.tb-btn--tables')) {
    closePeekPopover();
  }
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closePeekPopover();
});

// ═══════════════════════════════════════════════════════════════
// MODULE 8: RECORDING ENGINE (IndexedDB)
// ═══════════════════════════════════════════════════════════════

const IDB_NAME = 'ManodemyScrimbaDB';
const IDB_STORE = 'recordings';
let idb = null;

function openIDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(IDB_NAME, 1);
    req.onupgradeneeded = () => {
      const idbInst = req.result;
      if (!idbInst.objectStoreNames.contains(IDB_STORE)) {
        idbInst.createObjectStore(IDB_STORE, { keyPath: 'id', autoIncrement: true });
      }
    };
    req.onsuccess = () => { idb = req.result; resolve(idb); };
    req.onerror = () => reject(req.error);
  });
}

function idbPut(record) {
  return new Promise((resolve, reject) => {
    const tx = idb.transaction(IDB_STORE, 'readwrite');
    const store = tx.objectStore(IDB_STORE);
    const req = store.put(record);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function idbGetAll() {
  return new Promise((resolve, reject) => {
    const tx = idb.transaction(IDB_STORE, 'readonly');
    const store = tx.objectStore(IDB_STORE);
    const req = store.getAll();
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function idbGet(id) {
  return new Promise((resolve, reject) => {
    const tx = idb.transaction(IDB_STORE, 'readonly');
    const store = tx.objectStore(IDB_STORE);
    const req = store.get(id);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

// ─── Recorder State Machine ───
// States: 'idle' → 'recording' → 'paused' → 'recording' → 'idle'
let recState = 'idle';
let mediaRecorder = null;
let audioChunks = [];
let recStartTime = 0;
let recActions = [];
let recLastSnapshot = '';
let recSnapshotInterval = null;
let recTimerInterval = null;

let loadedRecAudioFile = null;
let recAudioPlayback = null;

// ─── Audio Player Event Handlers (bound/unbound per session) ───
function onRecAudioPause() {
  if (recState !== 'recording') return;
  pauseRecording();
}

function onRecAudioResume() {
  if (recState !== 'paused') return;
  resumeRecording();
}

function onRecAudioSeeked() {
  if (recState !== 'paused') return;
  const player = document.getElementById('recAudioPlayer');
  if (!player) return;
  const targetMs = Math.floor(player.currentTime * 1000);
  const lastActionTime = recActions.length > 0 ? recActions[recActions.length - 1].t : 0;
  // If user seeked backward, punch-in (truncate future actions)
  if (targetMs < lastActionTime) {
    punchIn(targetMs);
  }
}

function handleRecAudioUpload(e) {
  const file = e.target.files[0];
  if (!file) return;
  loadedRecAudioFile = file;

  const player = document.getElementById('recAudioPlayer');
  if (player) {
    // Revoke previous ObjectURL to prevent memory leak
    if (player.src && player.src.startsWith('blob:')) {
      URL.revokeObjectURL(player.src);
    }
    player.src = URL.createObjectURL(file);
    player.classList.remove('hidden');
    player.load();
  }
}

function getRecElapsedMs() {
  if (isStudioStrokeRecording) {
    if (recAudioPlayback) {
      return Math.floor(recAudioPlayback.currentTime * 1000);
    }
    return Math.floor(studioStrokeStartMs + (Date.now() - studioStrokeRecStartTime) * studioSpeed);
  }
  if (recAudioPlayback) {
    return Math.floor(recAudioPlayback.currentTime * 1000);
  }
  return Date.now() - recStartTime;
}

function toggleRecording() {
  if (recState === 'idle') startRecording();
  else stopRecording(); // Stop from either 'recording' or 'paused' state
}

function startRecording() {
  recState = 'recording';
  audioChunks = [];
  recActions = [];
  wsDrawnRects = [];
  recStartTime = Date.now();
  recLastSnapshot = mainEditor.getValue();

  // Save initial editor and slide state
  recActions.push({ t: 0, type: 'snapshot', content: recLastSnapshot, cursor: mainEditor.getCursor() });
  recActions.push({ t: 0, type: 'slide', slideIdx: currentSlide });

  // Clear visual highlights
  clearWsCanvas();

  // Show drawing toolbar while recording
  const drawToolbar = document.getElementById('wsDrawToolbar');
  if (drawToolbar) drawToolbar.style.display = 'flex';

  // Hide paused badge
  const pausedBadge = document.getElementById('recPausedBadge');
  if (pausedBadge) pausedBadge.classList.remove('visible');

  // Open timeline drawer
  toggleTimelineDrawer(true);

  const startIntervalsAndUI = () => {
    recSnapshotInterval = setInterval(() => {
      // Don't capture snapshots while paused — avoids duplicates at same timestamp
      if (recState !== 'recording') return;
      const val = mainEditor.getValue();
      if (val !== recLastSnapshot) {
        recLastSnapshot = val;
        recActions.push({
          t: getRecElapsedMs(),
          type: 'snapshot',
          content: val,
          cursor: mainEditor.getCursor()
        });
        updateTimelineView();
      }
    }, 200);

    const btn = document.getElementById('recordBtn');
    btn.textContent = '⏹ Stop';
    btn.classList.add('recording');
    document.getElementById('recTimer').classList.remove('hidden');
  };

  if (loadedRecAudioFile) {
    const player = document.getElementById('recAudioPlayer');
    recAudioPlayback = player;

    // Bind audio player events for pause/resume/seek sync
    player.addEventListener('pause', onRecAudioPause);
    player.addEventListener('play', onRecAudioResume);
    player.addEventListener('seeked', onRecAudioSeeked);

    // Start playback — user can also manually play/pause/seek
    player.play().then(() => {
      startIntervalsAndUI();
      recTimerInterval = setInterval(() => {
        const elapsed = Math.floor(player.currentTime);
        const m = String(Math.floor(elapsed / 60)).padStart(2, '0');
        const s = String(elapsed % 60).padStart(2, '0');
        document.getElementById('recTimer').textContent = `${m}:${s}`;
        updateTimelinePlayhead();
      }, 500);
    }).catch(err => {
      console.warn("Audio autoplay blocked, starting manually:", err);
      startIntervalsAndUI();
      recTimerInterval = setInterval(() => {
        const elapsed = Math.floor(player.currentTime);
        const m = String(Math.floor(elapsed / 60)).padStart(2, '0');
        const s = String(elapsed % 60).padStart(2, '0');
        document.getElementById('recTimer').textContent = `${m}:${s}`;
        updateTimelinePlayhead();
      }, 500);
    });
  } else {
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.ondataavailable = e => audioChunks.push(e.data);
      mediaRecorder.start();

      startIntervalsAndUI();
      recTimerInterval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - recStartTime) / 1000);
        const m = String(Math.floor(elapsed / 60)).padStart(2, '0');
        const s = String(elapsed % 60).padStart(2, '0');
        document.getElementById('recTimer').textContent = `${m}:${s}`;
        updateTimelinePlayhead();
      }, 500);
    }).catch(err => {
      console.error('Mic access denied:', err);
      alert('Microphone access is required to record. Or, load an audio file first using the folder button.');
      recState = 'idle';
    });
  }
  updateTimelineView();
}

function pauseRecording() {
  if (recState !== 'recording') return;
  recState = 'paused';

  // Capture one final snapshot at the pause point
  const val = mainEditor.getValue();
  if (val !== recLastSnapshot) {
    recLastSnapshot = val;
    recActions.push({
      t: getRecElapsedMs(),
      type: 'snapshot',
      content: val,
      cursor: mainEditor.getCursor()
    });
  }

  // Show paused badge
  const pausedBadge = document.getElementById('recPausedBadge');
  if (pausedBadge) pausedBadge.classList.add('visible');

  const btn = document.getElementById('recordBtn');
  btn.textContent = '⏸ Paused';

  updateTimelineView();
}

function resumeRecording() {
  if (recState !== 'paused') return;
  recState = 'recording';

  // Capture the final prep state as a single snapshot at resume time
  const val = mainEditor.getValue();
  if (val !== recLastSnapshot) {
    recLastSnapshot = val;
    recActions.push({
      t: getRecElapsedMs(),
      type: 'snapshot',
      content: val,
      cursor: mainEditor.getCursor()
    });
  }

  // Hide paused badge
  const pausedBadge = document.getElementById('recPausedBadge');
  if (pausedBadge) pausedBadge.classList.remove('visible');

  const btn = document.getElementById('recordBtn');
  btn.textContent = '⏹ Stop';

  updateTimelineView();
}

function punchIn(targetMs) {
  // Truncate all actions recorded after targetMs
  recActions = recActions.filter(a => a.t <= targetMs);

  // Rebuild visual state from remaining actions
  rebuildRecordingState(targetMs);

  console.log(`Punch-in at ${targetMs}ms — ${recActions.length} actions remaining`);
  updateTimelineView();
}

function rebuildRecordingState(targetMs) {
  // Find and restore the latest snapshot at or before targetMs
  let lastSnapshot = null;
  let lastSlideIdx = 0;
  let lastRun = null;
  let activeCaption = null;
  wsDrawnRects = [];

  for (let i = 0; i < recActions.length; i++) {
    const a = recActions[i];
    if (a.t > targetMs) break;
    if (a.type === 'snapshot') lastSnapshot = a;
    if (a.type === 'slide') lastSlideIdx = a.slideIdx;
    if (a.type === 'drawRect') {
      wsDrawnRects.push({
        x1Pct: a.x1Pct, y1Pct: a.y1Pct,
        x2Pct: a.x2Pct, y2Pct: a.y2Pct
      });
    }
    if (a.type === 'clearDraw') wsDrawnRects = [];
    if (a.type === 'run') lastRun = a;
    if (a.type === 'caption') activeCaption = a;
  }

  // Restore editor snapshot content
  if (lastSnapshot) {
    if (mainEditor && mainEditor.getValue() !== lastSnapshot.content) {
      mainEditor.setValue(lastSnapshot.content);
    }
    if (mainEditor && lastSnapshot.cursor) {
      mainEditor.setCursor(lastSnapshot.cursor);
    }
    recLastSnapshot = lastSnapshot.content;
  }

  // Restore slide index
  currentSlide = lastSlideIdx;
  renderSideSlide();

  // Restore drawings (highlights) on live workspace canvas
  repaintWsRects();

  // Restore query runs on live workspace output terminal
  if (lastRun && lastRun.result) {
    renderResultTable(lastRun.result, 'mainOutput');
  } else {
    const outputEl = document.getElementById('mainOutput');
    if (outputEl) outputEl.innerHTML = '<div class="output-label">Terminal Output</div><span class="output-success">⚡ Write your SQL query above and click \'Run\' to execute it!</span>';
  }

  // Handle caption display
  const captionEl = document.getElementById('workspaceVpCaption');
  if (captionEl) {
    if (timelineOpen) {
      captionEl.style.display = 'block';
      captionEl.textContent = activeCaption ? activeCaption.text : `📢 Timeline Preview Mode (${formatTime(targetMs / 1000)} / ${formatTime(getTimelineDurationMs() / 1000)})`;
    } else {
      captionEl.style.display = 'none';
    }
  }
}

function stopRecording() {
  if (recState === 'idle') return;

  const wasUsingAudioPlayer = recAudioPlayback != null;
  recState = 'idle';
  clearInterval(recSnapshotInterval);
  clearInterval(recTimerInterval);

  // Final snapshot
  recActions.push({
    t: getRecElapsedMs(),
    type: 'snapshot',
    content: mainEditor.getValue(),
    cursor: mainEditor.getCursor()
  });

  // Unbind audio player events
  if (wasUsingAudioPlayer) {
    const player = document.getElementById('recAudioPlayer');
    if (player) {
      player.removeEventListener('pause', onRecAudioPause);
      player.removeEventListener('play', onRecAudioResume);
      player.removeEventListener('seeked', onRecAudioSeeked);
      player.pause();
    }
  }

  const saveRecordingData = async (audioBlob) => {
    const topicIdx = document.getElementById('topicSelect').value;
    const defaultLabel = COURSE_CONFIG.topics[topicIdx]?.label || `Recording ${Date.now()}`;
    let label = defaultLabel;
    try {
      label = prompt('Name this recording:', defaultLabel) || defaultLabel;
    } catch (e) {
      console.warn('prompt() blocked inside frame, using default label:', defaultLabel);
    }

    const record = {
      topicLabel: label,
      topicIndex: parseInt(topicIdx),
      audioBlob: audioBlob,
      actions: recActions,
      createdAt: new Date().toISOString()
    };

    try {
      const id = await idbPut(record);
      console.log('Recording saved to IndexedDB, id:', id);
      await loadBookmarks();
    } catch (err) {
      console.error('Failed to save recording:', err);
      alert('Failed to save recording: ' + err.message);
    }

    const btn = document.getElementById('recordBtn');
    btn.textContent = '🔴 Record';
    btn.classList.remove('recording');
    document.getElementById('recTimer').classList.add('hidden');
    document.getElementById('recTimer').textContent = '00:00';

    // Hide paused badge and drawing toolbar
    const pausedBadge = document.getElementById('recPausedBadge');
    if (pausedBadge) pausedBadge.classList.remove('visible');
    const drawToolbar = document.getElementById('wsDrawToolbar');
    if (drawToolbar) drawToolbar.style.display = 'none';

    toggleTimelineDrawer(false);

    setWsDrawMode('none');
    wsDrawnRects = [];
    clearWsCanvas();
  };

  if (wasUsingAudioPlayer) {
    saveRecordingData(loadedRecAudioFile);
    recAudioPlayback = null;
  } else if (mediaRecorder) {
    mediaRecorder.stop();
    mediaRecorder.stream.getTracks().forEach(track => track.stop());
    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
      saveRecordingData(audioBlob);
      mediaRecorder = null;
    };
  }
}

// Log query executions during recording
function logRecQueryExec(query, result) {
  if (recState === 'idle' || !result) return;
  const target = isStudioStrokeRecording ? studioStrokeActions : recActions;
  target.push({
    t: getRecElapsedMs(),
    type: 'run',
    query: query,
    result: { columns: result.columns, values: result.values }
  });
  updateTimelineView();
}

// ─── Playback State ───
let playbackAudio = null;
let playbackActions = [];
let playbackAnimId = null;
let playbackPlaying = false;
let playbackCurrentIdx = 0;
let playbackTakenOver = false;

async function loadBookmarks() {
  const recordings = await idbGetAll();
  const container = document.getElementById('bookmarksList');
  if (!container) return;

  if (recordings.length === 0) {
    container.innerHTML = '<div class="bookmark-empty">No recordings yet — click Record to create one.</div>';
    return;
  }

  let html = '';
  recordings.forEach(rec => {
    html += `<div class="bookmark-chip" data-rec-id="${rec.id}" onclick="loadPlayback(${rec.id})">
      <span class="bk-icon">🎬</span>
      <span>${escHtml(rec.topicLabel)}</span>
    </div>`;
  });
  container.innerHTML = html;
}

async function loadPlayback(recId) {
  const rec = await idbGet(recId);
  if (!rec) { alert('Recording not found.'); return; }

  // Highlight active bookmark
  document.querySelectorAll('.bookmark-chip').forEach(c => c.classList.remove('active'));
  document.querySelector(`.bookmark-chip[data-rec-id="${recId}"]`)?.classList.add('active');

  // Load audio
  if (playbackAudio) { playbackAudio.pause(); URL.revokeObjectURL(playbackAudio.src); }
  playbackAudioBlob = rec.audioBlob;
  const audioUrl = URL.createObjectURL(rec.audioBlob);
  playbackAudio = new Audio(audioUrl);
  if (typeof currentPlaybackSpeed !== 'undefined') {
    playbackAudio.playbackRate = currentPlaybackSpeed;
  }
  if (typeof currentPlaybackVolume !== 'undefined') {
    playbackAudio.volume = currentPlaybackVolume;
  }
  playbackActions = rec.actions;
  playbackCurrentIdx = 0;
  playbackPlaying = false;
  playbackTakenOver = false;

  // Show playback bar
  document.getElementById('playbackBar').classList.add('visible');
  document.getElementById('takeoverBadge').classList.remove('visible');
  document.getElementById('playPauseBtn').textContent = '▶';

  // Set initial state
  if (playbackActions.length > 0 && playbackActions[0].type === 'snapshot') {
    mainEditor.setValue(playbackActions[0].content);
    if (playbackActions[0].cursor) mainEditor.setCursor(playbackActions[0].cursor);
  }

  // Audio metadata
  playbackAudio.addEventListener('loadedmetadata', () => {
    document.getElementById('seekBar').max = playbackAudio.duration;
    updatePlaybackTime();
    toggleTimelineDrawer(true);
    updateTimelineView();
  });

  playbackAudio.addEventListener('ended', () => {
    playbackPlaying = false;
    document.getElementById('playPauseBtn').textContent = '▶';
    if (playbackAnimId) { cancelAnimationFrame(playbackAnimId); playbackAnimId = null; }
    updateTimelinePlayhead();
  });
}

function togglePlayback() {
  if (!playbackAudio) return;

  if (playbackTakenOver) {
    // Resume from takeover — re-sync to current audio time
    playbackTakenOver = false;
    document.getElementById('takeoverBadge').classList.remove('visible');
    mainEditor.setOption('readOnly', false);
    syncEditorToTime(playbackAudio.currentTime * 1000);
  }

  if (playbackPlaying) {
    playbackAudio.pause();
    playbackPlaying = false;
    document.getElementById('playPauseBtn').textContent = '▶';
    if (playbackAnimId) { cancelAnimationFrame(playbackAnimId); playbackAnimId = null; }
  } else {
    playbackAudio.play();
    playbackPlaying = true;
    document.getElementById('playPauseBtn').textContent = '⏸';
    playbackAnimId = requestAnimationFrame(playbackLoop);
  }
}

function playbackLoop() {
  if (!playbackPlaying || !playbackAudio) return;

  const currentMs = playbackAudio.currentTime * 1000;
  const canvas = getWsCanvas();
  const canvasWidth = canvas ? canvas.width : 543;
  const canvasHeight = canvas ? canvas.height : 300;

  // Apply actions up to current time
  let changedDraw = false;
  while (playbackCurrentIdx < playbackActions.length && playbackActions[playbackCurrentIdx].t <= currentMs) {
    const action = playbackActions[playbackCurrentIdx];
    if (action.type === 'snapshot') {
      mainEditor.setValue(action.content);
      if (action.cursor) mainEditor.setCursor(action.cursor);
    } else if (action.type === 'run' && action.result) {
      renderResultTable(action.result, 'mainOutput');
    } else if (action.type === 'slide') {
      currentSlide = action.slideIdx;
      renderSideSlide();
    } else if (action.type === 'drawRect') {
      wsDrawnRects.push({
        x1Pct: action.x1Pct != null ? action.x1Pct : action.x1 / canvasWidth,
        y1Pct: action.y1Pct != null ? action.y1Pct : action.y1 / canvasHeight,
        x2Pct: action.x2Pct != null ? action.x2Pct : action.x2 / canvasWidth,
        y2Pct: action.y2Pct != null ? action.y2Pct : action.y2 / canvasHeight
      });
      changedDraw = true;
    } else if (action.type === 'clearDraw') {
      wsDrawnRects = [];
      changedDraw = true;
    }
    playbackCurrentIdx++;
  }

  if (changedDraw) {
    repaintWsRects();
  }

  // Update seek bar & time
  document.getElementById('seekBar').value = playbackAudio.currentTime;
  updatePlaybackTime();
  updateTimelinePlayhead();

  playbackAnimId = requestAnimationFrame(playbackLoop);
}

function syncEditorToTime(targetMs) {
  // Clear drawings on seek first
  wsDrawnRects = [];
  clearWsCanvas();

  const canvas = getWsCanvas();
  const canvasWidth = canvas ? canvas.width : 543;
  const canvasHeight = canvas ? canvas.height : 300;

  // Find the latest snapshot at or before targetMs
  let lastSnapshotIdx = -1;
  for (let i = 0; i < playbackActions.length; i++) {
    if (playbackActions[i].t > targetMs) break;
    if (playbackActions[i].type === 'snapshot') lastSnapshotIdx = i;
  }
  if (lastSnapshotIdx >= 0) {
    mainEditor.setValue(playbackActions[lastSnapshotIdx].content);
    if (playbackActions[lastSnapshotIdx].cursor) mainEditor.setCursor(playbackActions[lastSnapshotIdx].cursor);
  }

  // Find and set the latest slide at or before targetMs
  let lastSlideIdx = -1;
  for (let i = 0; i < playbackActions.length; i++) {
    if (playbackActions[i].t > targetMs) break;
    if (playbackActions[i].type === 'slide') lastSlideIdx = playbackActions[i].slideIdx;
  }
  if (lastSlideIdx >= 0) {
    currentSlide = lastSlideIdx;
    renderSideSlide();
  }

  // Redraw all drawings prior to targetMs
  for (let i = 0; i < playbackActions.length; i++) {
    if (playbackActions[i].t > targetMs) break;
    const action = playbackActions[i];
    if (action.type === 'drawRect') {
      wsDrawnRects.push({
        x1Pct: action.x1Pct != null ? action.x1Pct : action.x1 / canvasWidth,
        y1Pct: action.y1Pct != null ? action.y1Pct : action.y1 / canvasHeight,
        x2Pct: action.x2Pct != null ? action.x2Pct : action.x2 / canvasWidth,
        y2Pct: action.y2Pct != null ? action.y2Pct : action.y2 / canvasHeight
      });
    } else if (action.type === 'clearDraw') {
      wsDrawnRects = [];
    }
  }

  repaintWsRects();

  // Set playbackCurrentIdx to the next action after targetMs
  playbackCurrentIdx = 0;
  for (let i = 0; i < playbackActions.length; i++) {
    if (playbackActions[i].t > targetMs) { playbackCurrentIdx = i; return; }
  }
  playbackCurrentIdx = playbackActions.length;
}

function seekPlayback(value) {
  if (!playbackAudio) return;
  playbackAudio.currentTime = parseFloat(value);
  syncEditorToTime(playbackAudio.currentTime * 1000);
  updatePlaybackTime();
}

let currentPlaybackSpeed = 1.0;
let currentPlaybackVolume = 1.0;

function setPlaybackSpeed(speed, btn) {
  currentPlaybackSpeed = parseFloat(speed);
  if (activeAudioInstance) activeAudioInstance.playbackRate = currentPlaybackSpeed;
  if (playbackAudio) playbackAudio.playbackRate = currentPlaybackSpeed;
  if (currentPlayingAudio) currentPlayingAudio.playbackRate = currentPlaybackSpeed;
}

function toggleVolumePopover(event) {
  event.stopPropagation();
  const volBtn = document.getElementById('volumeBtn');
  const popover = document.getElementById('volumePopover');
  const speedPopover = document.getElementById('speedPopover');
  const speedBtn = document.getElementById('speedControlBtn');

  if (speedPopover) {
    speedPopover.classList.remove('open');
    speedBtn?.classList.remove('active');
  }

  popover.classList.toggle('open');
  volBtn.classList.toggle('active');
}

function toggleSpeedPopover(event) {
  event.stopPropagation();
  const speedBtn = document.getElementById('speedControlBtn');
  const popover = document.getElementById('speedPopover');
  const volPopover = document.getElementById('volumePopover');
  const volBtn = document.getElementById('volumeBtn');

  if (volPopover) {
    volPopover.classList.remove('open');
    volBtn?.classList.remove('active');
  }

  popover.classList.toggle('open');
  speedBtn.classList.toggle('active');
}

function setPlaybackVolume(value) {
  const vol = parseFloat(value) / 100;
  currentPlaybackVolume = vol;

  if (activeAudioInstance) activeAudioInstance.volume = vol;
  if (playbackAudio) playbackAudio.volume = vol;
  if (currentPlayingAudio) currentPlayingAudio.volume = vol;

  const valLabel = document.getElementById('volumeValue');
  if (valLabel) valLabel.textContent = `${value}%`;

  const volBtn = document.getElementById('volumeBtn');
  if (volBtn) {
    if (value == 0) {
      volBtn.innerHTML = `
        <svg class="volume-icon" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.21.05-.42.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
        </svg>
      `;
    } else if (value < 50) {
      volBtn.innerHTML = `
        <svg class="volume-icon" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z"/>
        </svg>
      `;
    } else {
      volBtn.innerHTML = `
        <svg class="volume-icon" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
        </svg>
      `;
    }
  }

  // P1 #9: persist volume preference
  if (typeof ProgressManager !== 'undefined') ProgressManager.savePreference('volume', parseFloat(value));
}

function selectSpeedOption(speed, labelText) {
  const btn = document.getElementById('speedControlBtn');
  setPlaybackSpeed(speed, btn);

  const valLabel = document.getElementById('speedValueLabel');
  if (valLabel) valLabel.textContent = labelText;

  document.querySelectorAll('.speed-option').forEach(opt => {
    const optSpeed = parseFloat(opt.textContent);
    if (optSpeed === speed) {
      opt.classList.add('active');
    } else {
      opt.classList.remove('active');
    }
  });

  document.getElementById('speedPopover')?.classList.remove('open');
  btn?.classList.remove('active');

  // P1 #9: persist speed preference
  if (typeof ProgressManager !== 'undefined') ProgressManager.savePreference('speed', speed);
}

// Global click handler to close popovers when clicking outside
document.addEventListener('click', (e) => {
  const volPopover = document.getElementById('volumePopover');
  const volBtn = document.getElementById('volumeBtn');
  const speedPopover = document.getElementById('speedPopover');
  const speedBtn = document.getElementById('speedControlBtn');

  if (volPopover && !volPopover.contains(e.target) && !volBtn.contains(e.target)) {
    volPopover.classList.remove('open');
    volBtn?.classList.remove('active');
  }
  if (speedPopover && !speedPopover.contains(e.target) && !speedBtn.contains(e.target)) {
    speedPopover.classList.remove('open');
    speedBtn?.classList.remove('active');
  }
});

function updatePlaybackTime() {
  if (!playbackAudio) return;
  const cur = formatTime(playbackAudio.currentTime);
  const dur = formatTime(playbackAudio.duration || 0);
  document.getElementById('playbackTime').textContent = `${cur} / ${dur}`;
}

function formatTime(seconds) {
  if (isNaN(seconds)) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

// Student takeover: when user clicks in editor during playback
function setupStudentTakeover() {
  // We detect user interaction by listening for focus/click on the editor
  document.getElementById('mainEditorWrap').addEventListener('mousedown', () => {
    if (playbackPlaying) {
      playbackPlaying = false;
      playbackTakenOver = true;
      playbackAudio.pause();
      document.getElementById('playPauseBtn').textContent = '▶';
      document.getElementById('takeoverBadge').classList.add('visible');
      if (playbackAnimId) { cancelAnimationFrame(playbackAnimId); playbackAnimId = null; }
    }
  });
}

// ═══════════════════════════════════════════════════════════════
// MODULE 9: TEST PORTAL + GRADING
// ═══════════════════════════════════════════════════════════════

let testOpen = false;
let testTimerInterval = null;
let testAutosaveIntervalId = null; // 15-second autosave
let testSecondsRemaining = 7200; // 120 minutes
let testStartTime = null;
let testCurrentQ = 0;
let testAnswers = []; // array of { answer: string, attempted: bool }
let testSubmitted = false;

function openTestPortal() {
  if (window.ProgressManager) {
    const dp = ProgressManager.getDayProgress(currentDay);
    if (dp && dp.testAttempt && !dp.testAttempt.submitted) {
      const attempt = dp.testAttempt;
      const timeSpent = Math.floor((Date.now() - attempt.startedAt) / 1000);
      const timeRemaining = attempt.timeRemaining - timeSpent;
      if (timeRemaining > 0) {
        resumeTestAttempt(currentDay, attempt, timeRemaining);
        return;
      } else {
        // Expired
        dp.testAttempt = null;
        ProgressManager.save();
      }
    }
  }

  testOpen = true;
  testSubmitted = false;
  testSecondsRemaining = 7200;
  testStartTime = Date.now();
  testCurrentQ = 0;
  testAnswers = COURSE_CONFIG.testQuestions.map(() => ({ answer: '', attempted: false }));

  document.getElementById('testOverlay').classList.add('open');

  // Pause lesson narration if playing
  if (typeof pauseCombinedPlayback === 'function') {
    pauseCombinedPlayback();
  }
  // Pause any individual speaker audio
  if (typeof currentPlayingAudio !== 'undefined' && currentPlayingAudio) {
    try {
      currentPlayingAudio.pause();
      if (typeof currentPlayingBtn !== 'undefined' && currentPlayingBtn) {
        currentPlayingBtn.innerHTML = `<svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`;
      }
    } catch (e) { }
  }

  // Hide the timeline playback bar
  const playbackBar = document.getElementById('playbackBar');
  if (playbackBar) {
    playbackBar.classList.add('hidden-in-test');
  }

  // Load and display personal best test score from ProgressManager
  const bestScore = window.ProgressManager ? (ProgressManager.getDayProgress(currentDay).bestScore || 0) : 0;
  const bestEl = document.getElementById('testBestScoreCount');
  if (bestEl) bestEl.textContent = bestScore;
  updateTestProgress();

  // Save initial attempt state
  if (window.ProgressManager) {
    ProgressManager.saveTestAttempt(currentDay, {
      startedAt: testStartTime,
      timeRemaining: testSecondsRemaining,
      answers: testAnswers,
      submitted: false,
      score: 0
    });
  }

  const submitBtn = document.getElementById('submitTestBtn');
  if (submitBtn) submitBtn.disabled = false;

  // Render sidebar buttons with Q prefix wrapped in span
  const sidebar = document.getElementById('testSidebar');
  let html = '';
  for (let i = 0; i < 25; i++) {
    html += `<button class="test-q-btn ${i === 0 ? 'current' : ''}" id="tqBtn${i}" onclick="switchTestQuestion(${i})"><span class="q-prefix">Q</span>${i + 1}</button>`;
  }
  sidebar.innerHTML = html;

  // Init test editor if not done
  if (!testEditor) initTestEditor();
  else testEditor.setValue('-- Write your answer here\n');

  renderTestQuestion(0);
  startTestTimer();
}

function closeTestPortal() {
  testOpen = false;
  clearInterval(testTimerInterval);
  clearInterval(testAutosaveIntervalId);
  testAutosaveIntervalId = null;
  document.getElementById('testOverlay').classList.remove('open');

  // Show the timeline playback bar again
  const playbackBar = document.getElementById('playbackBar');
  if (playbackBar) {
    playbackBar.classList.remove('hidden-in-test');
  }
}

function startTestTimer() {
  clearInterval(testTimerInterval);
  clearInterval(testAutosaveIntervalId);
  updateTestTimerDisplay();

  testTimerInterval = setInterval(() => {
    testSecondsRemaining--;
    updateTestTimerDisplay();
    if (testSecondsRemaining <= 0) {
      clearInterval(testTimerInterval);
      clearInterval(testAutosaveIntervalId);
      submitTest();
    }
  }, 1000);

  // Autosave every 15 seconds
  testAutosaveIntervalId = setInterval(() => {
    autosaveTestProgress();
  }, 15000);
}

function updateTestTimerDisplay() {
  const m = Math.floor(testSecondsRemaining / 60);
  const s = testSecondsRemaining % 60;
  const display = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  const el = document.getElementById('testTimer');
  el.textContent = display;
  if (testSecondsRemaining <= 300) el.classList.add('warning');
  else el.classList.remove('warning');
}

function switchTestQuestion(idx) {
  // Save current answer
  saveCurrentTestAnswer();

  testCurrentQ = idx;
  renderTestQuestion(idx);

  // Update sidebar
  document.querySelectorAll('.test-q-btn').forEach((btn, i) => {
    btn.classList.remove('current');
    if (i === idx) btn.classList.add('current');
  });
}

function saveCurrentTestAnswer() {
  if (!testEditor) return;
  const val = testEditor.getValue().trim();
  testAnswers[testCurrentQ].answer = val;
  if (val && val !== '-- Write your answer here') {
    testAnswers[testCurrentQ].attempted = true;
    document.getElementById(`tqBtn${testCurrentQ}`).classList.add('attempted');
  }
  updateTestProgress();
}

function renderTestQuestion(idx) {
  const q = COURSE_CONFIG.testQuestions[idx];
  document.getElementById('testQuestionPrompt').innerHTML = `<strong>Q${q.id}.</strong> ${q.prompt}`;
  document.getElementById('testQCounter').textContent = `Q${idx + 1} / 25`;

  // Load saved answer or default
  const saved = testAnswers[idx].answer;
  testEditor.setValue(saved || '-- Write your answer here\n');
  testEditor.focus();

  // Clear output
  document.getElementById('testOutput').innerHTML = '<div class="output-label">Terminal Output</div><span class="output-success">⚡ Write your query and click \'Run\' to verify your answer!</span>';
}

function runTestQuery() {
  if (!testEditor) return;
  const query = testEditor.getValue().trim();
  saveCurrentTestAnswer();
  try {
    const result = runSQL(query);
    renderResultTable(result, 'testOutput');
  } catch (err) {
    const hint = analyzeQueryError(query, err);
    renderError(err.message, hint, 'testOutput');
  }
}

function clearTestEditor() {
  if (testEditor) testEditor.setValue('');
}

function updateTestProgress() {
  const attempted = testAnswers.filter(a => a.attempted).length;
  const attemptedCountEl = document.getElementById('testAttemptedCount');
  if (attemptedCountEl) attemptedCountEl.textContent = attempted;

  const pct = (attempted / 25) * 100;
  const fillEl = document.getElementById('testProgressFill');
  if (fillEl) fillEl.style.width = `${pct}%`;

  const testProgressEl = document.getElementById('testProgress');
  if (testProgressEl) testProgressEl.textContent = `Attempted: ${attempted} / 25`;
}

function submitTest() {
  saveCurrentTestAnswer();
  clearInterval(testTimerInterval);
  clearInterval(testAutosaveIntervalId);
  testAutosaveIntervalId = null;
  testSubmitted = true;

  // Disable further editing
  document.getElementById('submitTestBtn').disabled = true;

  // Grade each question
  let totalCorrect = 0;
  const results = [];

  COURSE_CONFIG.testQuestions.forEach((q, i) => {
    const studentQuery = testAnswers[i].answer;
    let correct = false;
    let gradingResult = null;

    if (studentQuery && studentQuery.trim() !== '' && studentQuery !== '-- Write your answer here') {
      try {
        gradingResult = window.gradeSubmission(studentQuery, q, db);
        correct = gradingResult.passed;
      } catch (e) {
        correct = false;
      }
    }

    if (correct) totalCorrect++;
    results.push({
      qId: q.id,
      correct,
      studentQuery,
      attempted: testAnswers[i].attempted,
      referenceSql: q.ref || q.referenceSql,
      prompt: q.prompt,
      angle: getInterviewersAngle(currentDay, q.id, q.prompt)
    });

    // Update sidebar button
    const btn = document.getElementById(`tqBtn${i}`);
    if (btn) {
      btn.classList.remove('current', 'attempted');
      btn.classList.add(correct ? 'correct' : (testAnswers[i].attempted ? 'incorrect' : ''));
    }
  });

  // Render scorecard
  const elapsed = Math.floor((Date.now() - testStartTime) / 1000);
  const elapsedStr = `${Math.floor(elapsed / 60)}m ${elapsed % 60}s`;

  document.getElementById('scoreBig').textContent = `${totalCorrect} / 25`;
  document.getElementById('scoreBig').className = `score-big ${totalCorrect >= 13 ? 'pass' : 'fail'}`;
  document.getElementById('scoreMeta').textContent = `Time spent: ${elapsedStr} • ${totalCorrect >= 13 ? '✅ PASSED' : '❌ NEEDS REVIEW'}`;

  // Build review cards HTML
  let reviewCardsHtml = '';
  results.forEach(r => {
    const statusText = r.correct ? 'Correct' : (r.attempted ? 'Incorrect' : 'Skipped');
    const badgeColor = r.correct ? 'var(--green)' : (r.attempted ? 'var(--red)' : 'var(--text-muted)');
    const cardClass = r.correct ? 'review-card--correct' : 'review-card--incorrect';

    reviewCardsHtml += `
      <div class="review-card ${cardClass}">
        <div class="review-header">
          <span style="font-weight: 800; color: #a5b4fc;">Question ${String(r.qId).padStart(2, '0')}</span>
          <span class="status-badge" style="color: ${badgeColor}; font-weight: 800; text-transform: uppercase; font-size: 0.72rem; letter-spacing: 0.05em; background: rgba(255,255,255,0.03); padding: 2px 8px; border-radius: 4px;">${statusText}</span>
        </div>
        <div class="review-prompt" style="margin-top: 6px; color: #e2e8f0; font-size: 0.8rem; line-height: 1.45;">${r.prompt}</div>
        <div class="review-queries" style="margin-top: 10px; display: grid; grid-template-columns: 1fr; gap: 8px;">
          <div>
            <div style="font-size: 0.65rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase; letter-spacing: 0.03em;">YOUR ANSWER:</div>
            <pre style="margin: 4px 0 0 0; padding: 10px; background: #04060c; border: 1px solid rgba(255,255,255,0.05); border-radius: 6px; font-family: var(--mono); font-size: 0.72rem; color: #cbd5e1; white-space: pre-wrap; word-break: break-all;"><code>${escHtml(r.studentQuery || '—')}</code></pre>
          </div>
          <div>
            <div style="font-size: 0.65rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase; letter-spacing: 0.03em; margin-top: 6px;">REFERENCE SOLUTION:</div>
            <pre style="margin: 4px 0 0 0; padding: 10px; background: #04060c; border: 1px solid rgba(255,255,255,0.05); border-radius: 6px; font-family: var(--mono); font-size: 0.72rem; color: var(--green); white-space: pre-wrap; word-break: break-all;"><code>${escHtml(r.referenceSql || '—')}</code></pre>
          </div>
        </div>
        <div class="review-angle" style="margin-top: 10px; padding: 8px 12px; background: rgba(124, 58, 237, 0.06); border: 1px solid rgba(124, 58, 237, 0.15); border-radius: 6px; font-size: 0.76rem; line-height: 1.45; color: #c084fc;">
          💡 <strong>Interviewer's Angle:</strong> ${r.angle}
        </div>
      </div>
    `;
  });

  // Replaces the table inside scorecard-body with our review cards container
  const scorecardBody = document.getElementById('scorecardBody');
  if (scorecardBody) {
    const table = document.getElementById('scorecardTable');
    if (table) {
      table.style.display = 'none'; // Hide the raw table
    }

    let cardContainer = document.getElementById('scorecardCards');
    if (!cardContainer) {
      cardContainer = document.createElement('div');
      cardContainer.id = 'scorecardCards';
      cardContainer.style.maxHeight = '420px';
      cardContainer.style.overflowY = 'auto';
      cardContainer.style.paddingRight = '4px';
      scorecardBody.parentElement.appendChild(cardContainer);
    }
    cardContainer.innerHTML = reviewCardsHtml;
  }

  // Save the result to ProgressManager
  const attempt = {
    startedAt: testStartTime,
    timeRemaining: 0,
    answers: testAnswers,
    submitted: true,
    score: totalCorrect
  };
  if (window.ProgressManager) {
    ProgressManager.saveTestAttempt(currentDay, attempt);
  }

  // Stop the urgent Take Test blink — user has now completed the test
  deactivateTakeTestBlink();

  // Update best score bestEl
  const best = ProgressManager.getDayProgress(currentDay).bestScore || totalCorrect;
  const bestEl = document.getElementById('testBestScoreCount');
  if (bestEl) bestEl.textContent = best;

  // Make progress bar show 100% completed green
  const fillEl = document.getElementById('testProgressFill');
  if (fillEl) {
    fillEl.style.width = '100%';
    fillEl.style.background = 'var(--green)';
  }

  document.getElementById('scorecardOverlay').classList.add('open');
}

function closeScorecard() {
  document.getElementById('scorecardOverlay').classList.remove('open');
}

function autosaveTestProgress() {
  if (testSubmitted) return;
  saveCurrentTestAnswer();
  const attempt = {
    startedAt: testStartTime,
    timeRemaining: testSecondsRemaining,
    answers: testAnswers,
    submitted: false,
    score: 0
  };
  if (window.ProgressManager) {
    ProgressManager.saveTestAttempt(currentDay, attempt);
  }
  console.log('Autosaved test progress.');
}

function checkAndResumeTest(dayId) {
  // Disabled auto-resuming on page load/refresh.
}

function resumeTestAttempt(dayId, attempt, timeRemaining) {
  testOpen = true;
  testSubmitted = false;
  testSecondsRemaining = timeRemaining;
  testStartTime = attempt.startedAt; // Keep original start time
  testCurrentQ = 0;
  testAnswers = attempt.answers;

  document.getElementById('testOverlay').classList.add('open');

  if (typeof pauseCombinedPlayback === 'function') {
    pauseCombinedPlayback();
  }

  // Hide playback bar
  const playbackBar = document.getElementById('playbackBar');
  if (playbackBar) playbackBar.classList.add('hidden-in-test');

  // Load stats
  const best = ProgressManager.getDayProgress(dayId).bestScore || '0';
  const bestEl = document.getElementById('testBestScoreCount');
  if (bestEl) bestEl.textContent = best;
  updateTestProgress();

  const submitBtn = document.getElementById('submitTestBtn');
  if (submitBtn) submitBtn.disabled = false;

  // Render sidebar buttons
  const sidebar = document.getElementById('testSidebar');
  let html = '';
  for (let i = 0; i < 25; i++) {
    const isAttempted = testAnswers[i] && testAnswers[i].attempted;
    html += `<button class="test-q-btn ${i === 0 ? 'current' : ''} ${isAttempted ? 'attempted' : ''}" id="tqBtn${i}" onclick="switchTestQuestion(${i})"><span class="q-prefix">Q</span>${i + 1}</button>`;
  }
  sidebar.innerHTML = html;

  if (!testEditor) initTestEditor();
  renderTestQuestion(0);
  startTestTimer();
}

function renderScorecardFromAttempt(attempt) {
  if (!attempt) return;

  document.getElementById('scoreBig').textContent = `${attempt.score} / 25`;
  document.getElementById('scoreBig').className = `score-big ${attempt.score >= 13 ? 'pass' : 'fail'}`;
  document.getElementById('scoreMeta').textContent = `${attempt.score >= 13 ? '✅ PASSED' : '❌ NEEDS REVIEW'}`;

  // Build review cards HTML
  let reviewCardsHtml = '';
  COURSE_CONFIG.testQuestions.forEach((q, i) => {
    const ansObj = attempt.answers[i] || { answer: '', attempted: false };

    // Evaluate correctness dynamically
    let correct = false;
    if (ansObj.answer && ansObj.answer.trim() !== '' && ansObj.answer !== '-- Write your answer here') {
      try {
        const gradingResult = window.gradeSubmission(ansObj.answer, q, db);
        correct = gradingResult.passed;
      } catch (e) {
        correct = false;
      }
    }

    const statusText = correct ? 'Correct' : (ansObj.attempted ? 'Incorrect' : 'Skipped');
    const badgeColor = correct ? 'var(--green)' : (ansObj.attempted ? 'var(--red)' : 'var(--text-muted)');
    const cardClass = correct ? 'review-card--correct' : 'review-card--incorrect';

    reviewCardsHtml += `
      <div class="review-card ${cardClass}">
        <div class="review-header">
          <span style="font-weight: 800; color: #a5b4fc;">Question ${String(q.id).padStart(2, '0')}</span>
          <span class="status-badge" style="color: ${badgeColor}; font-weight: 800; text-transform: uppercase; font-size: 0.72rem; letter-spacing: 0.05em; background: rgba(255,255,255,0.03); padding: 2px 8px; border-radius: 4px;">${statusText}</span>
        </div>
        <div class="review-prompt" style="margin-top: 6px; color: #e2e8f0; font-size: 0.8rem; line-height: 1.45;">${q.prompt}</div>
        <div class="review-queries" style="margin-top: 10px; display: grid; grid-template-columns: 1fr; gap: 8px;">
          <div>
            <div style="font-size: 0.65rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase; letter-spacing: 0.03em;">YOUR ANSWER:</div>
            <pre style="margin: 4px 0 0 0; padding: 10px; background: #04060c; border: 1px solid rgba(255,255,255,0.05); border-radius: 6px; font-family: var(--mono); font-size: 0.72rem; color: #cbd5e1; white-space: pre-wrap; word-break: break-all;"><code>${escHtml(ansObj.answer || '—')}</code></pre>
          </div>
          <div>
            <div style="font-size: 0.65rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase; letter-spacing: 0.03em; margin-top: 6px;">REFERENCE SOLUTION:</div>
            <pre style="margin: 4px 0 0 0; padding: 10px; background: #04060c; border: 1px solid rgba(255,255,255,0.05); border-radius: 6px; font-family: var(--mono); font-size: 0.72rem; color: var(--green); white-space: pre-wrap; word-break: break-all;"><code>${escHtml(q.ref || q.referenceSql || '—')}</code></pre>
          </div>
        </div>
        <div class="review-angle" style="margin-top: 10px; padding: 8px 12px; background: rgba(124, 58, 237, 0.06); border: 1px solid rgba(124, 58, 237, 0.15); border-radius: 6px; font-size: 0.76rem; line-height: 1.45; color: #c084fc;">
          💡 <strong>Interviewer's Angle:</strong> ${getInterviewersAngle(currentDay, q.id, q.prompt)}
        </div>
      </div>
    `;
  });

  const scorecardBody = document.getElementById('scorecardBody');
  if (scorecardBody) {
    const table = document.getElementById('scorecardTable');
    if (table) {
      table.style.display = 'none'; // Hide raw table
    }

    let cardContainer = document.getElementById('scorecardCards');
    if (!cardContainer) {
      cardContainer = document.createElement('div');
      cardContainer.id = 'scorecardCards';
      cardContainer.style.maxHeight = '420px';
      cardContainer.style.overflowY = 'auto';
      cardContainer.style.paddingRight = '4px';
      scorecardBody.parentElement.appendChild(cardContainer);
    }
    cardContainer.innerHTML = reviewCardsHtml;
  }
}

function getInterviewersAngle(dayId, qId, prompt) {
  const dayNum = parseInt(dayId.replace('day', ''), 10);

  const angles = {
    1: [
      "Tests basic column selection. Strong candidates project specific columns instead of using SELECT * to avoid memory overhead.",
      "Checks understanding of selective projection. Senior analysts know SELECT * forces full-table scans which degrade query performance.",
      "Evaluates column aliasing. Using clean, snake_case aliases is standard practice for downstream BI tool ingestion.",
      "Tests calculated expressions and aliasing. Essential for demonstrating basic data transformations at the database level.",
      "Tests column order variation. Demonstrates understanding that physical table storage order does not dictate analytical presentation.",
      "Tests simple arithmetic and aliases. Shows ability to compute calculated metrics dynamically without modifying raw tables.",
      "Tests scaling computations. Interviewers look for proper mathematical formulas and clean column labeling in reports.",
      "Tests flat deductions on columns. Verifies candidate is comfortable performing arithmetic operations directly in SELECT projections.",
      "Tests system meta-functions. Demonstrates familiarization with the target engine's built-in utility functions.",
      "Tests string concatenation syntax. Essential for formatting reporting columns like full name or address parts directly in SQL."
    ],
    2: [
      "Tests basic numeric filtering. Candidates must show they can correctly isolate rows based on mathematical boundaries.",
      "Tests double conditional filters. Focuses on combining multiple constraints accurately using the logical AND operator.",
      "Tests range boundary conditions. Candidates should know BETWEEN is inclusive of both the start and end values.",
      "Tests NULL safety in filters. Excludes NULLs correctly; weak candidates forget that NULL comparison requires IS NULL instead of = 0.",
      "Tests list-based matching. Using IN is cleaner and performs better than chaining multiple OR operators.",
      "Tests mixing string filters and numeric boundaries. Demonstrates ability to translate business criteria into SQL syntax.",
      "Tests multi-condition category matches. Separates candidates who understand set-membership filtering from those using long OR chains.",
      "Tests date filtering format. Standard YYYY-MM-DD text comparisons must be formatted exactly for index usage.",
      "Tests department filter precision. Separates candidates on their ability to strictly match specific integer identifiers.",
      "Tests date bounds comparisons. Hitting index-only scans requires exact comparison bounds in the WHERE clause.",
      "Tests list filter matching on IDs. Essential for demonstrating set operations and target matching.",
      "Tests composite logical constraints. Evaluates logical grouping fluency under specific constraints.",
      "Tests discrete ID range filters. Shows capability to fetch a precise subset of data using numeric boundaries.",
      "Tests composite OR filters. Evaluates if candidate can combine different table fields in a logical branch.",
      "Tests simple boolean checks. Verifies candidate is comfortable filtering on active flag columns.",
      "Tests precise price list filtering. Tests combining category limits with numeric thresholds.",
      "Tests date and salary combinations. Verifies candidate can constrain queries on historical and numeric columns simultaneously.",
      "Tests string flag combined with numeric threshold. Checks candidate's ability to filter on state and values.",
      "Tests date year range bounds. Using BETWEEN on dates is standard for isolating specific years.",
      "Tests bounded salary ranges. Candidates must verify their ranges correctly handle the inclusive endpoints.",
      "Tests inventory alerts. Verifies capability to identify stock status via conditional logic.",
      "Tests dual foreign key conditions. Verifies candidate can filter hierarchical structures correctly.",
      "Tests large numeric range filters. Shows fluency with large numeric limits.",
      "Tests exact string matching on active indicators. Tests basic catalog selection logic.",
      "Tests numeric filters combined with active indicator check. Checks precision on active commissions."
    ]
  };

  if (angles[dayNum] && angles[dayNum][qId - 1]) {
    return angles[dayNum][qId - 1];
  }

  const p = prompt.toLowerCase();
  if (p.includes("join")) {
    return "Tests join syntax. Top candidates always use explicit JOIN syntax rather than comma joins, and specify index columns.";
  }
  if (p.includes("group by")) {
    return "Evaluates aggregation logic. Crucial to show that any non-aggregate columns in SELECT are also in GROUP BY.";
  }
  if (p.includes("having")) {
    return "Checks HAVING vs WHERE understanding. HAVING filters aggregated data post-grouping; WHERE filters raw rows pre-grouping.";
  }
  if (p.includes("subquery") || p.includes("select from (")) {
    return "Tests subquery resolution. Strong candidates know when to write a subquery vs when a JOIN is more performant.";
  }
  if (p.includes("cte") || p.includes("with ")) {
    return "Evaluates query readability. Senior analysts use CTEs to organize complex queries instead of writing deep nested subqueries.";
  }
  if (p.includes("window") || p.includes("over (") || p.includes("row_number") || p.includes("lag") || p.includes("lead")) {
    return "Checks window function mastery. Essential for advanced analytical roles to compute running totals, ranks, or offsets.";
  }
  if (p.includes("case when") || p.includes("then")) {
    return "Tests conditional labeling. Evaluates ability to bucket rows or execute complex conditional logic inside the engine.";
  }
  if (p.includes("union") || p.includes("intersect") || p.includes("except")) {
    return "Tests set operators. Candidates must ensure identical column signatures and data types across unified tables.";
  }
  if (p.includes("like") || p.includes("%") || p.includes("_")) {
    return "Tests pattern matching. Candidates should know LIKE is case-insensitive in SQLite/MySQL, but case-sensitive in PostgreSQL (use ILIKE).";
  }
  if (p.includes("null") || p.includes("coalesce")) {
    return "Tests NULL handling. Top analysts always handle NULLs gracefully (e.g. COALESCE) to prevent breaking calculations.";
  }
  if (p.includes("count") || p.includes("avg") || p.includes("sum")) {
    return "Tests aggregate functions. Interviewers check if candidates understand that aggregates ignore NULL values by default.";
  }
  if (p.includes("date") || p.includes("strftime") || p.includes("year")) {
    return "Tests date manipulation. Crucial for cohort analyses and time-series reports.";
  }
  if (p.includes("cast") || p.includes("type")) {
    return "Tests type casting. Critical for clean data join paths and avoiding data truncation errors.";
  }
  if (p.includes("sort") || p.includes("order by")) {
    return "Tests sorting logic. Evaluates efficiency since sorting can trigger heavy disk writing for large datasets.";
  }
  if (p.includes("limit")) {
    return "Tests result truncation. LIMIT is key in debugging to minimize impact on server resources.";
  }

  const fallbacks = {
    3: "Tests wildcards and NULL checks. Demonstrates capability to process incomplete or semi-structured data fields.",
    4: "Tests ordering and paging. Separates analysts who query all data from those who limit queries for production safety.",
    5: "Tests aggregate functions. Crucial for basic summary calculations in reporting.",
    6: "Tests multi-level aggregations. Evaluates grouping accuracy and filtering logic using HAVING.",
    7: "Tests data validation. Essential for cleaning up columns with mixed data types before running joins.",
    8: "Tests segment analysis. Crucial for converting numeric columns into descriptive business tiers.",
    9: "Tests relational schema linkage. Standard relational join logic to combine entity tables.",
    10: "Tests optional relationship handling. LEFT JOIN preserves unmatched records; vital for identifying missing records.",
    11: "Tests hierarchical reporting. Critical for manager-employee or parent-category relationship analysis.",
    12: "Tests nested queries. Demonstrates advanced query flow control and data routing.",
    13: "Tests CTE modularity. Vital for clean, self-documenting code in enterprise database projects.",
    14: "Tests rank calculations. Window functions are highly optimized and prevent slow self-joins.",
    15: "Tests time-series analysis. Essential for calculating period-over-period differences directly in SQL.",
    16: "Tests text cleaning. Crucial for standardizing string inputs before joining or presenting records.",
    17: "Tests temporal segmentation. Critical for date partition matching and historical data joins.",
    18: "Tests horizontal table concatenation. Shows understanding of mathematical sets."
  };

  return fallbacks[dayNum] || "Tests analytical precision, syntax execution, and logical layout.";
}

// ═══════════════════════════════════════════════════════════════
// WORKSPACE QUESTION NAVIGATION
// ═══════════════════════════════════════════════════════════════

let currentPracticeQ = 0;
let currentDay = 'day01';

function loadQuestionsForDay(day) {
  currentDay = day;
  const questions = COURSE_CONFIG.allPracticeQuestions[day] || COURSE_CONFIG.allPracticeQuestions.day01;
  COURSE_CONFIG.practiceQuestions = questions;
  currentPracticeQ = 0;
  renderPracticeQuestion();
  updatePracticeStats();
}

// Mapping of question id → audio file (for Day 01)
const questionAudioMap = {
  'day01': {
    1: 'New_Day1Part1Question01.mp3',
    2: 'New_Day1Part1Question03.mp3'
  },
  'day02': {
    1: 'Day02/New_Day2Question01.mp3',
    2: 'Day02/New_Day2Question02.mp3',
    3: 'Day02/New_Day2Question03.mp3',
    4: 'Day02/New_Day2Question04.mp3',
    5: 'Day02/New_Day2Question05.mp3',
    6: 'Day02/New_Day2Question06.mp3'
  },
  'day03': {
    1: 'Day03/New_Day3Question01.mp3',
    2: 'Day03/New_Day3Question02.mp3',
    3: 'Day03/New_Day3Question03.mp3',
    4: 'Day03/New_Day3Question04.mp3',
    5: 'Day03/New_Day3Question05.mp3',
    6: 'Day03/New_Day3Question06.mp3'
  }
};

// Map per day → question id → { src, code, startAt (seconds), charInterval (ms) }
const questionSolutionMap = {
  'day01': {
    1: { src: 'New_Day1Part1Question02.mp3', code: 'SELECT * FROM employees;', startAt: 1.5, charInterval: 110 }
  },
  'day02': {
    1: {
      src: 'Day02/New_Day2Question01sol.mp3',
      code: 'SELECT name, unit_price, stock_qty\nFROM   products\nORDER BY unit_price DESC;',
      // Segments aligned to exact Whisper word timestamps from narration:
      // 3.14s "select" → 3.42s "name," → 4.48s "unit [_price]" → 6.06s "stock [_qty]"
      // 11.18s "from products" → 15.16s "order" → 15.60s "unit [_price DESC]"
      segments: [
        { text: "SELECT ", startAt: 3.14, charInterval: 80 },
        { text: "name, ", startAt: 3.42, charInterval: 60 },
        { text: "unit_price, ", startAt: 4.48, charInterval: 50 },
        { text: "stock_qty\n", startAt: 6.06, charInterval: 55 },
        { text: "FROM   products\n", startAt: 11.18, charInterval: 55 },
        { text: "ORDER BY ", startAt: 15.16, charInterval: 50 },
        { text: "unit_price DESC;", startAt: 15.60, charInterval: 45 }
      ],
      scrollAt: 17.0
    },
    2: {
      src: 'Day02/New_Day2Question02sol.mp3',
      code: 'SELECT first_name, last_name, salary\nFROM   employees\nORDER BY salary DESC\nLIMIT 5;',
      segments: [
        { text: "SELECT ", startAt: 2.64, charInterval: 80 },
        { text: "first_name, ", startAt: 3.06, charInterval: 50 },
        { text: "last_name, ", startAt: 4.02, charInterval: 50 },
        { text: "salary\n", startAt: 4.88, charInterval: 55 },
        { text: "FROM   employees\n", startAt: 5.22, charInterval: 55 },
        { text: "ORDER BY ", startAt: 11.48, charInterval: 50 },
        { text: "salary DESC\n", startAt: 12.04, charInterval: 50 },
        { text: "LIMIT 5;", startAt: 16.70, charInterval: 50 }
      ],
      scrollAt: 17.3
    },
    3: {
      src: 'Day02/New_Day2Question03sol.mp3',
      code: 'SELECT DISTINCT region\nFROM   customers;',
      segments: [
        // "SELECT DISTINCT " — merged to avoid RAF overlap (4.62→5.08s = 28ms/char)
        { text: "SELECT DISTINCT ", startAt: 4.62, charInterval: 28 },
        { text: "region\n", startAt: 5.08, charInterval: 55 },
        { text: "FROM   ", startAt: 9.20, charInterval: 30 },
        { text: "customers;", startAt: 9.42, charInterval: 45 }
      ],
      scrollAt: 13.5
    },
    4: {
      src: 'Day02/New_Day2Question04sol.mp3',
      code: 'SELECT first_name, salary AS annual_salary\nFROM   employees\nORDER BY first_name ASC;',
      segments: [
        { text: "SELECT ", startAt: 2.74, charInterval: 60 },
        { text: "first_name, ", startAt: 3.30, charInterval: 45 },
        { text: "salary AS ", startAt: 5.50, charInterval: 45 },
        { text: "annual_salary\n", startAt: 6.68, charInterval: 50 },
        { text: "FROM   employees\n", startAt: 13.50, charInterval: 50 },
        { text: "ORDER BY ", startAt: 18.62, charInterval: 45 },
        { text: "first_name ASC;", startAt: 19.36, charInterval: 45 }
      ],
      scrollAt: 24.0
    },
    5: {
      src: 'Day02/New_Day2Question05sol.mp3',
      code: 'SELECT *\nFROM   customers\nLIMIT 5;',
      segments: [
        { text: "SELECT *\n", startAt: 2.36, charInterval: 60 },
        { text: "FROM   customers\n", startAt: 6.88, charInterval: 50 },
        { text: "LIMIT 5;", startAt: 8.94, charInterval: 50 }
      ],
      scrollAt: 9.8
    },
    6: {
      src: 'Day02/New_Day2Question06sol.mp3',
      code: 'SELECT name,\n       unit_price,\n       cost_price,\n       unit_price - cost_price AS profit\nFROM   products\nORDER BY profit DESC;',
      // Whisper word timestamps from New_Day2Question06sol.mp3 (24.1s)
      // Formatted in structured multi-line order matching reference image:
      segments: [
        { text: "SELECT name,\n", startAt: 3.40, charInterval: 45 },
        { text: "       unit_price,\n", startAt: 4.44, charInterval: 45 },
        { text: "       cost_price,\n", startAt: 5.32, charInterval: 45 },
        { text: "       unit_price - cost_price ", startAt: 10.78, charInterval: 40 },
        { text: "AS profit\n", startAt: 14.36, charInterval: 45 },
        { text: "FROM   products\n", startAt: 17.58, charInterval: 45 },
        { text: "ORDER BY profit DESC;", startAt: 22.56, charInterval: 40 }
      ],
      scrollAt: 23.9
    }
  },
  'day03': {
    1: {
      src: 'Day03/New_Day3Question01sol.mp3',
      code: 'SELECT name,\n       unit_price\nFROM   products\nWHERE  unit_price > 10000\nORDER BY unit_price DESC;',
      startAt: 1.5,
      charInterval: 70
    },
    2: {
      src: 'Day03/New_Day3Question02sol.mp3',
      code: 'SELECT first_name,\n       last_name,\n       region\nFROM   customers\nWHERE  region IN (\'North\', \'East\');',
      startAt: 1.5,
      charInterval: 70
    },
    3: {
      src: 'Day03/New_Day3Question03sol.mp3',
      code: 'SELECT first_name,\n       last_name,\n       salary\nFROM   employees\nWHERE  salary BETWEEN 60000 AND 100000;',
      startAt: 1.5,
      charInterval: 70
    },
    4: {
      src: 'Day03/New_Day3Question04sol.mp3',
      code: 'SELECT first_name,\n       last_name,\n       salary\nFROM   employees\nWHERE  first_name LIKE \'S%\';',
      startAt: 1.5,
      charInterval: 70
    },
    5: {
      src: 'Day03/New_Day3Question05sol.mp3',
      code: 'SELECT first_name,\n       department_id,\n       salary\nFROM   employees\nWHERE  is_active = 1\n  AND  department_id = 20;',
      startAt: 1.5,
      charInterval: 70
    },
    6: {
      src: 'Day03/New_Day3Question06sol.mp3',
      code: 'SELECT first_name,\n       last_name,\n       commission\nFROM   employees\nWHERE  commission IS NULL;',
      startAt: 1.5,
      charInterval: 70
    }
  }
};

let typewriterTimers = []; // pending typewriter timeouts for cancellation
let typewriterRafId = null; // requestAnimationFrame id for audio-synced typewriter
let currentTableScrollInterval = null;

function cancelTypewriter() {
  typewriterTimers.forEach(t => clearTimeout(t));
  typewriterTimers = [];
  if (typewriterRafId !== null) {
    cancelAnimationFrame(typewriterRafId);
    typewriterRafId = null;
  }
  if (currentTableScrollInterval) {
    clearInterval(currentTableScrollInterval);
    currentTableScrollInterval = null;
  }
}

// ─── Unified Audio-Synced Typewriter Engine (Supports scrubbing/seeking/resuming) ───
function startAudioSyncedTypewriter(audioObj, solEntry) {
  cancelTypewriter();
  if (!audioObj || !solEntry) return;

  const speed = typeof currentPlaybackSpeed !== 'undefined' ? currentPlaybackSpeed : 1.0;
  let syncEvents = [];

  if (solEntry.segments && Array.isArray(solEntry.segments)) {
    let currentCode = '';
    solEntry.segments.forEach(seg => {
      const chars = seg.text.split('');
      const intervalSec = ((seg.charInterval || 70) / 1000) / speed;
      chars.forEach((ch, idx) => {
        currentCode += ch;
        syncEvents.push({ atSec: seg.startAt / speed + idx * intervalSec, text: currentCode });
      });
    });
  } else {
    const chars = (solEntry.code || '').split('');
    let currentCode = '';
    const startAtSec = (solEntry.startAt || 1.5) / speed;
    const intervalSec = ((solEntry.charInterval || 70) / 1000) / speed;
    chars.forEach((ch, idx) => {
      currentCode += ch;
      syncEvents.push({ atSec: startAtSec + idx * intervalSec, text: currentCode });
    });
  }

  syncEvents.sort((a, b) => a.atSec - b.atSec);

  const scrollAtSec = (solEntry.scrollAt || 13.5) / speed;
  const initialTime = audioObj.currentTime || 0;

  // Fast-forward editor state to initialTime if seeked into middle of track
  let nextEvtIdx = 0;
  let currentText = '';
  while (nextEvtIdx < syncEvents.length && initialTime >= syncEvents[nextEvtIdx].atSec) {
    currentText = syncEvents[nextEvtIdx].text;
    nextEvtIdx++;
  }

  if (mainEditor) {
    mainEditor.setValue(currentText);
    if (currentText) {
      const lastLine = mainEditor.lastLine();
      mainEditor.setCursor({ line: lastLine, ch: mainEditor.getLine(lastLine).length });
    }
  }

  let qFired = nextEvtIdx >= syncEvents.length && syncEvents.length > 0;
  if (qFired && initialTime < scrollAtSec) {
    runCurrentQuery();
  }

  let sFired = initialTime >= scrollAtSec;
  if (sFired) {
    runCurrentQuery();
    const outputEl = document.getElementById('mainOutput');
    if (outputEl) outputEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function rafLoop() {
    if (!audioObj || audioObj.paused || audioObj.ended) {
      typewriterRafId = null;
      return;
    }
    const ct = audioObj.currentTime;

    // Handle backward seek/scrubbing seamlessly
    if (nextEvtIdx > 0 && ct < syncEvents[nextEvtIdx - 1].atSec) {
      nextEvtIdx = 0;
      let text = '';
      while (nextEvtIdx < syncEvents.length && ct >= syncEvents[nextEvtIdx].atSec) {
        text = syncEvents[nextEvtIdx].text;
        nextEvtIdx++;
      }
      if (mainEditor) {
        mainEditor.setValue(text);
        if (text) {
          const lastLine = mainEditor.lastLine();
          mainEditor.setCursor({ line: lastLine, ch: mainEditor.getLine(lastLine).length });
        }
      }
    }

    while (nextEvtIdx < syncEvents.length && ct >= syncEvents[nextEvtIdx].atSec) {
      const ev = syncEvents[nextEvtIdx];
      if (mainEditor) {
        mainEditor.setValue(ev.text);
        const lastLine = mainEditor.lastLine();
        mainEditor.setCursor({ line: lastLine, ch: mainEditor.getLine(lastLine).length });
      }
      nextEvtIdx++;
    }

    if (!qFired && nextEvtIdx >= syncEvents.length && syncEvents.length > 0) {
      qFired = true;
      runCurrentQuery();
      setTimeout(() => {
        const outputEl = document.getElementById('mainOutput');
        if (outputEl) outputEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 350 / speed);
    }

    if (!sFired && ct >= scrollAtSec) {
      sFired = true;
      const outputEl = document.getElementById('mainOutput');
      if (outputEl) {
        currentTableScrollInterval = setInterval(() => {
          if (outputEl.scrollTop + outputEl.clientHeight >= outputEl.scrollHeight - 2) {
            clearInterval(currentTableScrollInterval);
            currentTableScrollInterval = null;
          } else {
            outputEl.scrollTop += 1;
          }
        }, 40);
      }
    }

    typewriterRafId = requestAnimationFrame(rafLoop);
  }

  typewriterRafId = requestAnimationFrame(rafLoop);

  audioObj.addEventListener('ended', () => {
    if (currentTableScrollInterval) {
      clearInterval(currentTableScrollInterval);
      currentTableScrollInterval = null;
    }
    cancelTypewriter();
  }, { once: true });
}

function renderPracticeQuestion() {
  const q = COURSE_CONFIG.practiceQuestions[currentPracticeQ];
  if (q) {
    document.getElementById('questionPrompt').innerHTML = `Q${q.id}. ${q.prompt}`;
    document.getElementById('qCounter').textContent = `Question-${String(q.id).padStart(2, '0')}`;

    // Update question audio button based on the question id
    const btn = document.getElementById('questionAudioBtn');
    const audioMap = questionAudioMap[currentDay] || questionAudioMap['day01'];
    const audioSrc = audioMap ? audioMap[q.id] : null;
    if (btn) {
      if (audioSrc) {
        btn.style.display = 'inline-flex';
        btn.onclick = () => playQuestionAudio(btn, audioSrc);
      } else {
        btn.style.display = 'none';
      }
    }

    // Show/hide solution audio button based on whether this question has a solution audio
    const solBtn = document.getElementById('solutionAudioBtn');
    if (solBtn) {
      const solMap = questionSolutionMap[currentDay] || questionSolutionMap['day01'];
      const hasSolution = solMap && solMap[q.id];
      solBtn.style.display = hasSolution ? 'inline-flex' : 'none';
      // Reset icon on question change
      solBtn.innerHTML = `<svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`;
      solBtn.classList.remove('playing');
    }

    // Remove highlight when question changes
    const bar = document.getElementById('questionBar');
    if (bar) bar.classList.remove('question-playing');
  }
}

// P2 #14: syncCombinedToTrack() was removed (dead code — use seekCombinedPlayback() instead)



function playQuestionAudio(btn, audioSrc) {
  const src = audioSrc || 'New_Day1Part1Question01.mp3';
  const bar = document.getElementById('questionBar');

  // Stop any OTHER standalone audio playing
  if (currentPlayingAudio && !combinedAudios.includes(currentPlayingAudio)) {
    currentPlayingAudio.pause();
    if (currentPlayingBtn && currentPlayingBtn !== btn) {
      currentPlayingBtn.innerHTML = `<svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`;
      currentPlayingBtn.classList.remove('playing');
    }
  }

  // Check if this track is already the active combined track
  const trackIdx = combinedTracks.findIndex(t => t.src === src);
  const combinedAudio = trackIdx !== -1 ? combinedAudios[trackIdx] : null;

  // Toggle pause/resume if already playing this track
  if (combinedAudio && combinedTrackIndex === trackIdx && currentPlayingBtn === btn) {
    if (combinedAudio.paused) {
      combinedAudio.play();
      isCombinedPlaying = true;
      btn.innerHTML = `<svg class="pause-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`;
      btn.classList.add('playing');
      if (bar) bar.classList.add('question-playing');
      updatePlayButtonStates(true);
      startProgressLoop();
    } else {
      combinedAudio.pause();
      isCombinedPlaying = false;
      btn.innerHTML = `<svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`;
      btn.classList.remove('playing');
      if (bar) bar.classList.remove('question-playing');
      updatePlayButtonStates(false);
      if (playProgressInterval) clearInterval(playProgressInterval);
    }
    return;
  }

  // Scroll theory panel to top
  const slideContent = document.getElementById('slideContent');
  if (slideContent) slideContent.scrollTo({ top: 0, behavior: 'smooth' });

  // Highlight question bar
  if (bar) bar.classList.add('question-playing');

  // Jump combined system to this track
  const audio = combinedAudio ? syncCombinedToTrack(src) : new Audio(`/Version-3/${src}`);
  if (typeof currentPlaybackSpeed !== 'undefined') {
    audio.playbackRate = currentPlaybackSpeed;
  }
  if (typeof currentPlaybackVolume !== 'undefined') {
    audio.volume = currentPlaybackVolume;
  }

  currentPlayingAudio = audio;
  currentPlayingBtn = btn;
  audio.play().catch(e => console.log('Question audio play error:', e));

  btn.innerHTML = `<svg class="pause-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`;
  btn.classList.add('playing');

  // onended: restore btn, remove bar highlight, chain to solution
  const handleEnded = () => {
    btn.innerHTML = `<svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`;
    btn.classList.remove('playing');
    if (bar) bar.classList.remove('question-playing');
    currentPlayingAudio = null;
    currentPlayingBtn = null;

    // Auto-chain: play the solution audio after question narration ends
    const solMap = questionSolutionMap[currentDay] || questionSolutionMap['day01'];
    const q = COURSE_CONFIG.practiceQuestions[currentPracticeQ];
    const solEntry = q && solMap ? solMap[q.id] : null;
    if (solEntry) {
      setTimeout(() => playSolutionAudio(solEntry), 400);
    }
  };

  // Use once listener to avoid duplicates from combined system re-registering
  audio.removeEventListener('ended', audio._qEndedHandler);
  audio._qEndedHandler = handleEnded;
  audio.addEventListener('ended', handleEnded, { once: true });
}

// ─── Solution audio + code typewriter ───────────────────────────────────────

function playSolutionAudio(solutionEntry, triggerBtn) {
  if (!solutionEntry) return;
  const { src, code, startAt, charInterval } = solutionEntry;
  const fullSrc = `/Version-3/${src}`;
  const btn = triggerBtn || document.getElementById('solutionAudioBtn');

  // Stop any currently playing audio cleanly
  if (currentPlayingAudio && !combinedAudios.includes(currentPlayingAudio)) {
    currentPlayingAudio.pause();
    if (currentPlayingBtn && currentPlayingBtn !== btn) {
      currentPlayingBtn.innerHTML = `<svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`;
      currentPlayingBtn.classList.remove('playing');
    }
  }
  cancelTypewriter();

  // Clear editor ready for typewriter
  if (mainEditor) {
    mainEditor.setValue('');
    mainEditor.focus();
  }

  // Use combined audio system if this track is registered there
  const audio = syncCombinedToTrack(src) || new Audio(fullSrc);
  if (typeof currentPlaybackSpeed !== 'undefined') {
    audio.playbackRate = currentPlaybackSpeed;
  }
  if (typeof currentPlaybackVolume !== 'undefined') {
    audio.volume = currentPlaybackVolume;
  }
  currentPlayingAudio = audio;
  currentPlayingBtn = btn;

  if (btn) {
    btn.innerHTML = `<svg class="pause-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`;
    btn.classList.add('playing');
  }

  audio.play().catch(e => console.log('Solution audio play error:', e));

  // ─── Audio-currentTime-driven typewriter (frame-perfect sync) ───────────────
  // Build flat sorted event list: { atSec, text } where text is cumulative code
  let syncEvents = [];

  if (solutionEntry.segments && Array.isArray(solutionEntry.segments)) {
    let currentCode = '';
    solutionEntry.segments.forEach(seg => {
      const chars = seg.text.split('');
      chars.forEach((ch, idx) => {
        currentCode += ch;
        syncEvents.push({ atSec: seg.startAt + idx * (seg.charInterval || 70) / 1000, text: currentCode });
      });
    });
  } else {
    const chars = (code || '').split('');
    let currentCode = '';
    chars.forEach((ch, idx) => {
      currentCode += ch;
      syncEvents.push({ atSec: (startAt || 1.5) + idx * (charInterval || 70) / 1000, text: currentCode });
    });
  }

  syncEvents.sort((a, b) => a.atSec - b.atSec);
  let nextEventIdx = 0;
  let queryFired = false;
  let scrollFired = false;
  const scrollAtSec = solutionEntry.scrollAt || 13.5;
  let tableScrollInterval = null;

  function rafTypewriterLoop() {
    if (!audio || audio.paused || audio.ended) {
      typewriterRafId = null;
      return;
    }
    const t = audio.currentTime;

    // Type all pending characters whose timestamp has passed
    while (nextEventIdx < syncEvents.length && t >= syncEvents[nextEventIdx].atSec) {
      const evt = syncEvents[nextEventIdx];
      if (mainEditor) {
        mainEditor.setValue(evt.text);
        const lastLine = mainEditor.lastLine();
        mainEditor.setCursor({ line: lastLine, ch: mainEditor.getLine(lastLine).length });
      }
      nextEventIdx++;
    }

    // Run query once all typing is done
    if (!queryFired && nextEventIdx >= syncEvents.length && syncEvents.length > 0) {
      queryFired = true;
      runCurrentQuery();
      setTimeout(() => {
        const outputEl = document.getElementById('mainOutput');
        if (outputEl) outputEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 350);
    }

    // Start table scroll at scrollAt timestamp
    if (!scrollFired && t >= scrollAtSec) {
      scrollFired = true;
      const outputEl = document.getElementById('mainOutput');
      if (outputEl) {
        tableScrollInterval = setInterval(() => {
          if (outputEl.scrollTop + outputEl.clientHeight >= outputEl.scrollHeight - 2) {
            clearInterval(tableScrollInterval);
          } else {
            outputEl.scrollTop += 1;
          }
        }, 40);
      }
    }

    typewriterRafId = requestAnimationFrame(rafTypewriterLoop);
  }

  typewriterRafId = requestAnimationFrame(rafTypewriterLoop);

  audio.onended = () => {
    if (tableScrollInterval) clearInterval(tableScrollInterval);
    cancelTypewriter(); // also cancels RAF loop
    if (btn) {
      btn.innerHTML = `<svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`;
      btn.classList.remove('playing');
    }
    currentPlayingAudio = null;
    currentPlayingBtn = null;

    // ── Auto-chain: advance to next practice question after solution ends ──
    const qs = COURSE_CONFIG.practiceQuestions;
    if (qs && currentPracticeQ < qs.length - 1) {
      setTimeout(() => {
        currentPracticeQ++;
        renderPracticeQuestion();
        updatePracticeStats();
        // Scroll practice panel to top
        const slideContent = document.getElementById('slideContent');
        if (slideContent) slideContent.scrollTo({ top: 0, behavior: 'smooth' });
        // Play next question audio automatically
        const nextQ = qs[currentPracticeQ];
        const qMap = questionAudioMap[currentDay] || questionAudioMap['day01'];
        const nextSrc = qMap ? qMap[nextQ.id] : null;
        if (nextSrc) {
          const nextBtn = document.querySelector(`[data-qaudio-id="${nextQ.id}"]`);
          setTimeout(() => playQuestionAudio(nextSrc, nextBtn), 300);
        }
      }, 600);
    } else {
      // ── Last question solution ended! Auto-chain to final completion narration ──
      const completionIdx = combinedTracks.findIndex(t => t.type === 'completion');
      if (completionIdx !== -1) {
        setTimeout(() => {
          loadAndPlayTrack(completionIdx);
        }, 600);
      }
    }
  };
}

function playSolutionAudioFromBtn(btn) {
  const solMap = questionSolutionMap[currentDay] || questionSolutionMap['day01'];
  const q = COURSE_CONFIG.practiceQuestions[currentPracticeQ];
  const solEntry = q && solMap ? solMap[q.id] : null;
  if (!solEntry) return;

  // Toggle pause/resume if same audio is already playing
  if (currentPlayingAudio && currentPlayingBtn === btn) {
    if (currentPlayingAudio.paused) {
      currentPlayingAudio.play();
      btn.innerHTML = `<svg class="pause-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`;
      btn.classList.add('playing');
    } else {
      currentPlayingAudio.pause();
      btn.innerHTML = `<svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`;
      btn.classList.remove('playing');
    }
    return;
  }

  playSolutionAudio(solEntry, btn);
}

function clearOutputSection() {
  // Stop any playing audio and typewriter on question change
  if (currentPlayingAudio) {
    currentPlayingAudio.pause();
    currentPlayingAudio = null;
  }
  cancelTypewriter();
  if (currentPlayingBtn) {
    currentPlayingBtn.innerHTML = `<svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`;
    currentPlayingBtn.classList.remove('playing');
    currentPlayingBtn = null;
  }
  // Reset output to default state
  const outputEl = document.getElementById('mainOutput');
  if (outputEl) {
    outputEl.innerHTML = `<div class="output-label">Terminal Output</div><span class="output-success">⚡ Write your SQL query above and click 'Run' to execute it!</span>`;
    outputEl.scrollTop = 0;
  }
  // Reset editor
  if (mainEditor) mainEditor.setValue('');
}

function saveCurrentPracticeAnswer() {
  if (!mainEditor || !COURSE_CONFIG.practiceQuestions) return;
  const q = COURSE_CONFIG.practiceQuestions[currentPracticeQ];
  if (!q) return;
  const val = mainEditor.getValue().trim();
  const solvedKey = `${currentDay}-${q.id}`;
  const isSolved = solvedQuestions.has(solvedKey);

  if (window.ProgressManager) {
    ProgressManager.savePracticeAnswer(currentDay, q.id, val, isSolved);
  }
}

function loadSavedPracticeAnswer() {
  if (!mainEditor || !COURSE_CONFIG.practiceQuestions) return;
  const q = COURSE_CONFIG.practiceQuestions[currentPracticeQ];
  if (!q) return;

  if (window.ProgressManager) {
    const dp = ProgressManager.getDayProgress(currentDay);
    const saved = dp.practiceAnswers[q.id];
    if (saved) {
      mainEditor.setValue(saved);
      return;
    }
  }
  mainEditor.setValue('-- Write your SQL query here\n');
}

function formatGradingDiff(diff) {
  if (!diff) return '';
  let html = `<div class="grading-diff-alert" style="margin-top: 10px; padding: 12px; background: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.25); border-radius: 6px; font-size: 0.78rem; line-height: 1.45;">`;
  html += `<div style="font-weight: 700; color: var(--red); margin-bottom: 6px; display: flex; align-items: center; gap: 4px;">❌ Grading Check Failed</div>`;

  if (diff.type === 'column_count_mismatch') {
    html += `<div><strong>Column Count Mismatch:</strong> Expected <strong>${diff.expected}</strong> columns, but your query returned <strong>${diff.actual}</strong> columns.</div>`;
  } else if (diff.type === 'column_name_mismatch') {
    html += `<div><strong>Column Name Mismatch:</strong> The column at index <strong>${diff.index + 1}</strong> is expected to be named <code>${escHtml(diff.expected)}</code>, but got <code>${escHtml(diff.actual)}</code>. (Column names are strict for alias grading)</div>`;
  } else if (diff.type === 'row_count_mismatch') {
    html += `<div><strong>Row Count Mismatch:</strong> Expected <strong>${diff.expected}</strong> rows in the result set, but your query returned <strong>${diff.actual}</strong> rows.</div>`;
  } else if (diff.type === 'value_mismatch') {
    html += `<div><strong>Result Value Mismatch:</strong> The values returned by your query do not match the expected solution. Check your filters (WHERE clauses), calculations, or JOIN conditions.</div>`;
  }
  html += `</div>`;
  return html;
}

function nextQuestion() {
  if (currentPracticeQ < COURSE_CONFIG.practiceQuestions.length - 1) {
    saveCurrentPracticeAnswer();
    clearOutputSection();
    currentPracticeQ++;
    renderPracticeQuestion();
    loadSavedPracticeAnswer();
  }
}

function prevQuestion() {
  if (currentPracticeQ > 0) {
    saveCurrentPracticeAnswer();
    clearOutputSection();
    currentPracticeQ--;
    renderPracticeQuestion();
    loadSavedPracticeAnswer();
  }
}

// Persist solved questions across page refreshes
let solvedQuestions = new Set(JSON.parse(localStorage.getItem('manodemy_solved_v3') || '[]'));

function persistSolvedQuestions() {
  localStorage.setItem('manodemy_solved_v3', JSON.stringify([...solvedQuestions]));
}

function updatePracticeStats() {
  let solved = 0;
  solvedQuestions.forEach(key => {
    if (key.startsWith(currentDay + '-')) {
      solved++;
    }
  });
  const total = COURSE_CONFIG.practiceQuestions.length;

  const solvedEl = document.getElementById('solvedCount');
  const marksEl = document.getElementById('marksCount');
  if (solvedEl) solvedEl.textContent = solved;
  if (marksEl) marksEl.textContent = solved + '.0';

  const totalQEl = document.getElementById('totalQuestions');
  const totalMEl = document.getElementById('totalMarks');
  if (totalQEl) totalQEl.textContent = total;
  if (totalMEl) totalMEl.textContent = total + '.0';

  const pct = total > 0 ? (solved / total) * 100 : 0;
  const fill = document.getElementById('statsProgressFill');
  if (fill) fill.style.width = `${pct}%`;
}

function runCurrentQuery() {
  const query = mainEditor.getValue().trim();
  try {
    const result = runSQL(query);
    renderResultTable(result, 'mainOutput');
    logRecQueryExec(query, result);

    // Auto-grade current practice question
    const q = COURSE_CONFIG.practiceQuestions[currentPracticeQ];
    let correct = false;
    if (q) {
      const gradingResult = window.gradeSubmission(query, q, db);
      correct = gradingResult.passed;

      if (correct) {
        const solvedKey = `${currentDay}-${q.id}`;
        if (!solvedQuestions.has(solvedKey)) {
          solvedQuestions.add(solvedKey);
          persistSolvedQuestions();
          if (window.ProgressManager) {
            ProgressManager.savePracticeAnswer(currentDay, q.id, query, true);
          }
          updatePracticeStats();
        }
        // Update label to show correct indicator badge with encouraging compliments
        const label = document.querySelector('#mainOutput .output-label');
        if (label) {
          const compliments = [
            "Spot on!",
            "You nailed it!",
            "Brilliant work!",
            "Awesome job!",
            "Perfect query!",
            "Keep crushing it!"
          ];
          const compliment = compliments[Math.floor(Math.random() * compliments.length)];
          label.innerHTML = `Query Result <span class="correct-badge" style="background: var(--green-glow); color: var(--green); padding: 2px 8px; border-radius: var(--radius-sm); font-size: 0.7rem; margin-left: 8px; font-weight: 700; border: 1px solid rgba(16, 185, 129, 0.3); display: inline-flex; align-items: center; gap: 4px;">✓ Correct! ${compliment}</span>`;
        }
        // Append correct answer banner
        const successBanner = document.createElement('div');
        successBanner.className = 'output-success';
        successBanner.style.marginTop = '8px';
        successBanner.innerHTML = '🎉 Correct Answer! Good job.';
        document.getElementById('mainOutput').appendChild(successBanner);
      } else {
        // Show grading differences
        const label = document.querySelector('#mainOutput .output-label');
        if (label) {
          label.innerHTML = `Query Result <span class="incorrect-badge" style="background: var(--red-glow); color: var(--red); padding: 2px 8px; border-radius: var(--radius-sm); font-size: 0.7rem; margin-left: 8px; font-weight: 700; border: 1px solid rgba(239, 68, 68, 0.3); display: inline-flex; align-items: center; gap: 4px;">❌ Incorrect</span>`;
        }
        const diffHtml = formatGradingDiff(gradingResult.diff);
        const diffDiv = document.createElement('div');
        diffDiv.innerHTML = diffHtml;
        document.getElementById('mainOutput').appendChild(diffDiv);

        // Save practice answer even if incorrect
        if (window.ProgressManager) {
          ProgressManager.savePracticeAnswer(currentDay, q.id, query, false);
        }
      }
    }
  } catch (err) {
    const hint = analyzeQueryError(query, err);
    renderError(err.message, hint, 'mainOutput');
  }
}

function clearEditor() {
  mainEditor.setValue('');
  mainEditor.focus();
}

// ═══════════════════════════════════════════════════════════════
// PANEL COLLAPSE / DIVIDER DRAG
// ═══════════════════════════════════════════════════════════════

let leftCollapsed = false;
let rightCollapsed = false;
let savedLeftWidth = '55%';

function updateDividerArrows() {
  const btnL = document.querySelector('.div-toggle-btn--left');
  const btnR = document.querySelector('.div-toggle-btn--right');
  if (!btnL || !btnR) return;

  const isMobile = window.innerWidth <= 768;

  if (isMobile) {
    btnL.textContent = '▲';
    btnL.title = leftCollapsed ? 'Restore code cell' : 'Collapse code cell';
    btnR.textContent = '▼';
    btnR.title = rightCollapsed ? 'Restore notes panel' : 'Collapse notes panel';
  } else {
    btnL.textContent = '◀';
    btnL.title = leftCollapsed ? 'Restore code cell' : 'Toggle code cell';
    btnR.textContent = '▶';
    btnR.title = rightCollapsed ? 'Restore notes panel' : 'Toggle notes panel';
  }
}

function toggleLeftPanel(e) {
  if (e) e.stopPropagation();
  const panelL = document.getElementById('panelLeft');
  const panelR = document.getElementById('panelRight');

  leftCollapsed = !leftCollapsed;
  if (leftCollapsed) {
    // Collapse Left (Notes takes full width)
    panelL.classList.add('collapsed');

    if (rightCollapsed) {
      rightCollapsed = false;
      panelR.classList.remove('collapsed');
    }
  } else {
    // Restore Left (split view)
    panelL.classList.remove('collapsed');
  }

  updateDividerArrows();

  // Smooth layout resize loop for CodeMirror editor as the screen slides
  const start = Date.now();
  const interval = setInterval(() => {
    if (mainEditor) mainEditor.refresh();
    resizeWsCanvas();
    if (Date.now() - start > 450) clearInterval(interval);
  }, 30);
}

function toggleRightPanel(e) {
  if (e) e.stopPropagation();
  const panelL = document.getElementById('panelLeft');
  const panelR = document.getElementById('panelRight');

  rightCollapsed = !rightCollapsed;
  if (rightCollapsed) {
    // Collapse Right (Code takes full width)
    panelR.classList.add('collapsed');

    if (leftCollapsed) {
      leftCollapsed = false;
      panelL.classList.remove('collapsed');
    }
  } else {
    // Restore Right (split view)
    panelR.classList.remove('collapsed');
  }

  updateDividerArrows();

  // Smooth layout resize loop for CodeMirror editor as the screen slides
  const start = Date.now();
  const interval = setInterval(() => {
    if (mainEditor) mainEditor.refresh();
    resizeWsCanvas();
    if (Date.now() - start > 450) clearInterval(interval);
  }, 30);
}

function resetSplitScreen(e) {
  if (e) e.stopPropagation();

  const panelL = document.getElementById('panelLeft');
  const panelR = document.getElementById('panelRight');

  leftCollapsed = false;
  rightCollapsed = false;

  panelL.classList.remove('collapsed');
  panelR.classList.remove('collapsed');

  // Clear layout variables and restore default 55/45 split ratios
  savedLeftWidth = '55%';
  panelL.style.flexBasis = '55%';
  panelL.style.minWidth = '';
  panelL.style.borderRightWidth = '';
  panelR.style.flexBasis = '';

  updateDividerArrows();

  // Smooth layout resize loop for CodeMirror editor as the screen slides
  const start = Date.now();
  const interval = setInterval(() => {
    if (mainEditor) mainEditor.refresh();
    resizeWsCanvas();
    if (Date.now() - start > 450) clearInterval(interval);
  }, 30);
}

// Draggable divider
(function initDivider() {
  const divider = document.getElementById('divider');
  const left = document.getElementById('panelLeft');
  let dragging = false;

  divider.addEventListener('mousedown', (e) => {
    if (e.target.closest('.div-toggle-btn')) return;

    // Auto-restore collapsed panels on drag initiation
    if (leftCollapsed) toggleLeftPanel();
    if (rightCollapsed) toggleRightPanel();

    dragging = true;
    divider.classList.add('dragging');
    e.preventDefault();
  });

  document.addEventListener('mousemove', (e) => {
    if (!dragging) return;
    const workspace = document.querySelector('.workspace');
    const rect = workspace.getBoundingClientRect();

    if (window.innerWidth > 768) {
      // Horizontal split (desktop)
      const pct = ((e.clientX - rect.left) / rect.width) * 100;
      const clamped = Math.max(30, Math.min(75, pct));
      savedLeftWidth = clamped + '%';
      left.style.flexBasis = savedLeftWidth;
    } else {
      // Vertical split (mobile)
      // Notes is at the top (order: 1), and left panel (code) is at the bottom (order: 3)
      const heightPx = rect.bottom - e.clientY;
      const pct = (heightPx / rect.height) * 100;
      const clamped = Math.max(25, Math.min(70, pct));
      savedLeftWidth = clamped + '%';
      left.style.flexBasis = savedLeftWidth;
    }
    mainEditor.refresh();
    resizeWsCanvas();
  });

  document.addEventListener('mouseup', () => {
    if (dragging) {
      dragging = false;
      divider.classList.remove('dragging');
      resizeWsCanvas();
    }
  });
})();

let resizeWsCanvasRAF = null;
function initSlideContentObserver() {
  const container = document.getElementById('slideContent');
  if (!container) return;

  const observer = new ResizeObserver(() => {
    if (resizeWsCanvasRAF) {
      cancelAnimationFrame(resizeWsCanvasRAF);
    }
    resizeWsCanvasRAF = requestAnimationFrame(() => {
      resizeWsCanvas();
      resizeWsCanvasRAF = null;
    });
  });
  observer.observe(container);
}

// ═══════════════════════════════════════════════════════════════
// INITIALIZATION
// ═══════════════════════════════════════════════════════════════

// ─── Day Content Loading System ─────────────────────────────────────────────

function populateDaySelector() {
  const sel = document.getElementById('daySelect');
  if (!sel) return;
  const manifest = window.COURSE_MANIFEST || [];
  if (manifest.length === 0) {
    // Fallback: just Day 01
    sel.innerHTML = '<option value="day01" selected>Day 01: Introduction to SQL &amp; Databases</option>';
    return;
  }
  sel.innerHTML = manifest.map((d, i) => {
    const dayStr = String(d.day).padStart(2, '0');
    const emoji = d.emoji || '';
    const selected = i === 0 ? ' selected' : '';
    return `<option value="${d.id}"${selected}>${emoji} Day ${dayStr}: ${d.title}</option>`;
  }).join('');
}

function loadDayContent(dayId) {
  const manifest = window.COURSE_MANIFEST || [];
  const dayMeta = manifest.find(d => d.id === dayId);
  const dayContent = window.COURSE_CONTENT && window.COURSE_CONTENT[dayId];

  if (!dayContent) {
    // P1 #10: Show loading skeleton
    const skel = document.getElementById('slideSkeleton');
    const slideContent = document.getElementById('slideBodyText');
    if (skel) { skel.style.display = ''; skel.removeAttribute('aria-hidden'); }
    if (slideContent) {
      // Remove any previous placeholder content that is NOT the skeleton
      Array.from(slideContent.children).forEach(child => {
        if (child.id !== 'slideSkeleton') child.remove();
      });
    }

    // Lazy-load the content script
    const dayNum = parseInt(dayId.replace('day', ''), 10);
    const script = document.createElement('script');
    script.src = `/Version-3/content/day-${String(dayNum).padStart(2, '0')}.js?v=14.37`;
    script.onload = () => {
      // Re-run now that module is loaded
      loadDayContent(dayId);
    };
    script.onerror = () => {
      const slideContent = document.getElementById('slideBodyText');
      if (slideContent) {
        slideContent.innerHTML = `<div style="padding:32px;text-align:center;color:#ef4444;"><p>Failed to load Day ${dayNum} content.</p></div>`;
      }
      // Guarantee transition clean up on script load failure
      const ws = document.getElementById('workspaceContainer');
      if (ws) {
        ws.style.opacity = '1';
        ws.style.filter = 'none';
        ws.style.transform = 'none';
      }
    };
    document.head.appendChild(script);
    return;
  }

  try {

    // ── Apply content to COURSE_CONFIG ──
    COURSE_CONFIG.dayId = dayId;
    COURSE_CONFIG.title = dayContent.title || COURSE_CONFIG.title;
    document.title = `Manodemy — Day ${String(parseInt(dayId.replace('day', ''), 10)).padStart(2, '0')}: ${COURSE_CONFIG.title}`;

    if (dayContent.slides && dayContent.slides.length > 0) {
      COURSE_CONFIG.slides = dayContent.slides;
    }
    if (dayContent.practiceQuestions) {
      COURSE_CONFIG.practiceQuestions = dayContent.practiceQuestions;
      // Also update allPracticeQuestions map
      if (!COURSE_CONFIG.allPracticeQuestions) COURSE_CONFIG.allPracticeQuestions = {};
      COURSE_CONFIG.allPracticeQuestions[dayId] = dayContent.practiceQuestions;
    }
    if (dayContent.testQuestions) {
      COURSE_CONFIG.testQuestions = dayContent.testQuestions;
    }
    if (dayContent.topics) {
      COURSE_CONFIG.topics = dayContent.topics;
    }
    if (dayContent.schema) {
      COURSE_CONFIG.schema = dayContent.schema;
    }

    // ── Switch database ──
    const dbKey = dayContent.db || 'retail';
    if (dbKey === 'day01_db') {
      // Day 01 uses simple employees db already in COURSE_CONFIG.schema
      loadDatabaseSeed('day01_db');
    } else {
      loadDatabaseSeed(dbKey);
      // Update schema cards based on retail DB
      if (window.DB_SEEDS && window.DB_SEEDS[dbKey]) {
        COURSE_CONFIG.schema = window.DB_SEEDS[dbKey];
      }
    }

    // ── Re-render UI ──
    currentSlide = 0;
    currentDay = dayId;
    currentPracticeQ = 0;
    renderSideSlide();
    clearDrawCanvas();
    renderPracticeQuestion();
    renderSchemaCards();
    updatePracticeStats();

    // Rebuild topicSelect
    const topicSel = document.getElementById('topicSelect');
    if (topicSel && COURSE_CONFIG.slides) {
      const multiTopic = COURSE_CONFIG.slides.length > 1;
      topicSel.innerHTML = COURSE_CONFIG.slides.map((s, i) => {
        const cleaned = s.title.replace(/^(Topic\s+\d+:\s*|\d+\.\s*)/i, '');
        return `<option value="${i}">${multiTopic ? `Topic ${String(i + 1).padStart(2, '0')}: ` : ''}${cleaned}</option>`;
      }).join('');
      topicSel.value = 0;
      initCustomDropdowns();
    }

    // Update test title dynamically
    const testTitleEl = document.querySelector('.test-title');
    if (testTitleEl) {
      const dayStr = String(parseInt(dayId.replace('day', ''), 10)).padStart(2, '0');
      testTitleEl.textContent = `📝 Day ${dayStr} — SQL Interview Test`;
    }

    // Clear editor and terminal
    clearOutputSection();
    loadSavedPracticeAnswer();

    // Re-init autocomplete with new schema columns
    if (mainEditor) {
      const schema = getSchemaInfo();
      const hintTables = {};
      Object.keys(schema).forEach(t => { hintTables[t] = schema[t]; });
      mainEditor.setOption('hintOptions', { tables: hintTables });
    }
  } catch (err) {
    console.error('Error loading day content modules:', err);
  } finally {
    // ALWAYS clear transition styles and blur, even on execution errors!
    const ws = document.getElementById('workspaceContainer');
    if (ws) {
      ws.classList.add('day-transition');
      ws.style.opacity = '1';
      ws.style.filter = 'none';
      ws.style.transform = 'none';
    }
  }

  console.log(`Day ${dayId} loaded successfully.`);
  setTimeout(() => {
    checkAndResumeTest(dayId);
  }, 350);
}

// ─── Keyboard Shortcuts ───────────────────────────────────────────────────────
function initKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    // Ctrl+Enter → Run query
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      if (document.getElementById('testOverlay')?.classList.contains('open')) {
        runTestQuery();
      } else {
        runCurrentQuery();
      }
    }
    // Ctrl+L → Clear editor
    if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
      e.preventDefault();
      if (document.getElementById('testOverlay')?.classList.contains('open')) {
        clearTestEditor();
      } else {
        clearEditor();
      }
    }
    // Ctrl+→ → Next question
    if ((e.ctrlKey || e.metaKey) && e.key === 'ArrowRight') {
      e.preventDefault();
      nextQuestion();
    }
    // Ctrl+← → Previous question
    if ((e.ctrlKey || e.metaKey) && e.key === 'ArrowLeft') {
      e.preventDefault();
      prevQuestion();
    }
    // Esc → Close any open overlay
    if (e.key === 'Escape') {
      const testOverlay = document.getElementById('testOverlay');
      const scorecardOverlay = document.getElementById('scorecardOverlay');
      const peekPopover = document.getElementById('peekPopover');
      if (scorecardOverlay?.classList.contains('open')) { closeScorecard(); return; }
      if (peekPopover?.classList.contains('open')) { closePeekPopover(); return; }
      if (testOverlay?.classList.contains('open')) { closeTestPortal(); return; }
    }
  });
}

window.addEventListener('DOMContentLoaded', async () => {
  try {
    // Initialize progress manager
    if (window.ProgressManager) {
      window.ProgressManager.load();
    }

    // P1 #9: Restore speed/volume preferences
    restorePlayerPreferences();

    await initDatabase();
    initMainEditor();

    // Eagerly load the manifest so accurate durations are available immediately
    loadManifest().catch(() => { }); // Non-blocking — fallback durations already set

    // Populate Day Selector from COURSE_MANIFEST
    populateDaySelector();

    // Detect default day dynamically from page pathname (e.g. day02.html -> day02)
    let defaultDay = 'day01';
    const pathMatch = window.location.pathname.match(/day(\d+)\.html/i);
    if (pathMatch) {
      defaultDay = `day${pathMatch[1]}`;
    }

    // Load initial day content (lazy-loads matching module script if needed)
    loadDayContent(defaultDay);

    // Sync selector UI to show the default day active
    const daySelectEl = document.getElementById('daySelect');
    if (daySelectEl) {
      daySelectEl.value = defaultDay;
      const textSpan = document.querySelector('.day-picker-pill .selected-text');
      if (textSpan) {
        textSpan.textContent = `Day ${defaultDay.replace('day', '')}`;
      }
    }

    initSlideContentObserver();
    resizeWsCanvas();
    setupStudentTakeover();
    setupTimelineDragging();

    // Restore Take Test blink if user saw completion audio but hasn't taken the test
    restoreTakeTestBlinkIfNeeded();

    // Init IndexedDB and load bookmarks
    await openIDB();
    await loadBookmarks();

    // Set initial arrows based on layout size
    updateDividerArrows();

    // Keyboard shortcuts
    initKeyboardShortcuts();

    // Handle daySelect change
    document.getElementById('daySelect')?.addEventListener('change', function () {
      const selectedDay = this.value;
      // Animate transition
      const ws = document.getElementById('workspaceContainer');
      if (ws) {
        ws.classList.add('day-transition');
        ws.style.opacity = '0.3';
        ws.style.filter = 'blur(4px)';
        ws.style.transform = 'translateY(8px)';
      }
      setTimeout(() => {
        loadDayContent(selectedDay);
      }, 250);

      // Sync indicator badge text
      const badge = document.querySelector('.day-pill-badge');
      if (badge) {
        const dayNum = selectedDay.replace('day', '').toUpperCase();
        badge.textContent = `DAY ${dayNum}`;
      }

      // Update URL in address bar if pathname ends with a dayXX.html format
      const path = window.location.pathname;
      const pathMatch = path.match(/day\d+\.html/i);
      if (pathMatch) {
        const newPath = path.replace(/day\d+\.html/i, `${selectedDay}.html`);
        history.pushState(null, '', newPath);
      }

      // Sync active slide and topicSelect to match the day
      currentSlide = 0;
      renderCurrentSlide();
      clearDrawCanvas();

      const topicSelect = document.getElementById('topicSelect');
      if (topicSelect) {
        topicSelect.value = 0;
      }

      // Load day-specific practice questions
      loadQuestionsForDay(selectedDay);
    });

    // Populate topicSelect dropdown
    const topicSelect = document.getElementById('topicSelect');
    if (topicSelect) {
      const multiTopic2 = COURSE_CONFIG.slides.length > 1;
      topicSelect.innerHTML = COURSE_CONFIG.slides.map((slide, idx) => {
        const cleanedTitle = slide.title.replace(/^(Topic\s+\d+:\s*|\d+\.\s*)/i, '');
        const duration = getSlideDurationString(idx);
        return `<option value="${idx}">${multiTopic2 ? `Topic 0${idx + 1}: ` : ''}${cleanedTitle} (${duration})</option>`;
      }).join('');
      topicSelect.value = currentSlide;
    }

    // Initialize custom dropdown overlays
    initCustomDropdowns();


    console.log('Version-3 Scrimba SQL Sandbox initialized successfully.');
  } catch (err) {
    console.error('Initialization error:', err);
    document.getElementById('mainOutput').innerHTML = `<div class="output-label">Terminal Output</div><span class="output-success">⚡ Write your SQL query above and click 'Run' to execute it!</span>`;
  }
});


// Handle window resize for canvas
window.addEventListener('resize', () => {
  if (presentOpen) resizeDrawCanvas();
  resizeWsCanvas();
  updateDividerArrows();
});

// ═══════════════════════════════════════════════════════════════
// NEW NAVIGATION & SCORE CARD UTILITIES
// ═══════════════════════════════════════════════════════════════

function prevDay() {
  const sel = document.getElementById('daySelect');
  if (!sel) return;
  const idx = sel.selectedIndex;
  if (idx > 0) {
    sel.selectedIndex = idx - 1;
    sel.dispatchEvent(new Event('change'));
  } else {
    showToast('You are at the start of the course (Day 01)');
  }
}

function nextDay() {
  const sel = document.getElementById('daySelect');
  if (!sel) return;
  const idx = sel.selectedIndex;
  if (idx < sel.options.length - 1) {
    sel.selectedIndex = idx + 1;
    sel.dispatchEvent(new Event('change'));
  } else {
    showToast('You have completed all 18 days! 🎉');
  }
}

function onTopicSelectChange(val) {
  currentSlide = parseInt(val, 10);
  renderCurrentSlide();
  clearDrawCanvas();
  // Load topic-specific questions
  loadQuestionsForDay(currentDay || 'day01');
}

function openScoreCard() {
  if (window.ProgressManager) {
    const dp = ProgressManager.getDayProgress(currentDay);
    if (dp && dp.testAttempt && dp.testAttempt.submitted) {
      renderScorecardFromAttempt(dp.testAttempt);
      document.getElementById('scorecardOverlay').classList.add('open');
      return;
    }
  }
  const solved = getDaySolvedCount();
  const total = COURSE_CONFIG.practiceQuestions ? COURSE_CONFIG.practiceQuestions.length : 0;
  alert(`Practice Score Card:\n\nQuestions Solved: ${solved} / ${total}\nMarks Gained: ${solved}.0 / ${total}.0\n\nSubmit the test using "Take Test" to grade your formal score.`);
}

function openTestScoreCard() {
  if (window.ProgressManager) {
    const dp = ProgressManager.getDayProgress(currentDay);
    if (dp && dp.testAttempt && dp.testAttempt.submitted) {
      renderScorecardFromAttempt(dp.testAttempt);
      document.getElementById('scorecardOverlay').classList.add('open');
      return;
    }
  }
  alert('Please submit your test using the "Submit Test" button in the sidebar first to view your graded scorecard.');
}

function getDaySolvedCount() {
  let solved = 0;
  solvedQuestions.forEach(key => {
    if (key.startsWith(currentDay + '-')) {
      solved++;
    }
  });
  return solved;
}

// ═══════════════════════════════════════════════════════════════
// MODULE 11: VISUAL TIMELINE DRAWER (Removed)
// ═══════════════════════════════════════════════════════════════

let timelineOpen = false;
let timelineSelectedEvent = null;
let playbackAudioBlob = null;

function toggleTimelineDrawer(force) {
  // Stub: visual timeline features removed
}

function updateTimelineView() {
  // Stub: visual timeline features removed
}

function updateTimelinePlayhead() {
  // Stub: visual timeline features removed
}

function getSlideDurationString(idx) {
  const dayConfig = (typeof slideTrackMap !== 'undefined') ? slideTrackMap[currentDay] : null;
  const mapEntry = dayConfig ? dayConfig[idx] : null;
  if (!mapEntry || !mapEntry.durations) {
    return COURSE_CONFIG.slides[idx]?.duration || '0:00';
  }
  const totalSeconds = mapEntry.durations.reduce((sum, d) => sum + d, 0);
  return formatTime(totalSeconds);
}

// Custom dropdown initializer to replace native select inputs with a premium dropdown menu
function initCustomDropdowns() {
  const selects = document.querySelectorAll('.day-picker-pill select');
  selects.forEach(select => {
    const wrapper = select.parentElement;
    select.style.display = 'none';

    let trigger = wrapper.querySelector('.custom-select-trigger');
    let optionsMenu = wrapper.querySelector('.custom-select-options');

    if (!trigger) {
      wrapper.querySelector('.day-picker-chevron')?.remove();
      trigger = document.createElement('div');
      trigger.className = 'custom-select-trigger';
      wrapper.appendChild(trigger);
    }

    if (!optionsMenu) {
      optionsMenu = document.createElement('div');
      optionsMenu.className = 'custom-select-options';
      wrapper.appendChild(optionsMenu);
    }

    function updateTriggerText() {
      const textSpan = trigger.querySelector('.selected-text');
      if (textSpan) {
        const option = select.options[select.selectedIndex];
        if (select.id === 'topicSelect' && option) {
          const slideIdx = parseInt(option.value, 10);
          const duration = getSlideDurationString(slideIdx);
          const slide = COURSE_CONFIG.slides ? COURSE_CONFIG.slides[slideIdx] : null;
          const cleanedTitle = slide ? slide.title.replace(/^(Topic\s+\d+:\s*|\d+\.\s*)/i, '') : option.text;
          const multiTopic3 = COURSE_CONFIG.slides && COURSE_CONFIG.slides.length > 1;
          textSpan.innerHTML = `
            <span class="trigger-title">${multiTopic3 ? `Topic 0${slideIdx + 1}: ` : ''}${cleanedTitle}</span>
            <span class="trigger-duration-badge">${duration}</span>
          `;
        } else if (option) {
          if (select.id === 'daySelect') {
            const dayNum = option.value.replace('day', '');
            textSpan.textContent = `Day ${dayNum}`;
          } else {
            textSpan.textContent = option.text;
          }
        } else {
          textSpan.textContent = '';
        }
      }
    }

    function populateOptions() {
      optionsMenu.innerHTML = '';
      Array.from(select.options).forEach((opt) => {
        const optionItem = document.createElement('div');
        optionItem.className = `custom-select-option${opt.selected ? ' selected' : ''}`;

        if (select.id === 'topicSelect') {
          const slideIdx = parseInt(opt.value, 10);
          const duration = getSlideDurationString(slideIdx);
          const slide = COURSE_CONFIG.slides ? COURSE_CONFIG.slides[slideIdx] : null;
          const cleanedTitle = slide ? slide.title.replace(/^(Topic\s+\d+:\s*|\d+\.\s*)/i, '') : opt.text;
          const multiTopic4 = COURSE_CONFIG.slides && COURSE_CONFIG.slides.length > 1;
          optionItem.innerHTML = `
            <span class="option-title">${multiTopic4 ? `Topic 0${slideIdx + 1}: ` : ''}${cleanedTitle}</span>
            <span class="option-duration">${duration}</span>
          `;
        } else if (select.id === 'daySelect') {
          const match = opt.text.match(/^(\S+)\s+(Day\s+\d+):\s*(.*)$/);
          if (match) {
            optionItem.innerHTML = `
              <span class="option-day-tag">
                <span class="option-emoji">${match[1]}</span>
                <span style="display:flex;flex-direction:column;gap:1px;overflow:hidden;">
                  <strong>${match[2]}</strong>
                  <span class="option-day-title">${match[3]}</span>
                </span>
              </span>
            `;
          } else {
            optionItem.textContent = opt.text;
          }
        } else {
          optionItem.textContent = opt.text;
        }

        optionItem.dataset.value = opt.value;
        optionItem.addEventListener('click', (e) => {
          e.stopPropagation();
          select.value = opt.value;
          select.dispatchEvent(new Event('change'));
          optionsMenu.classList.remove('open');
          wrapper.classList.remove('open');
          trigger.classList.remove('open');
        });
        optionsMenu.appendChild(optionItem);
      });

      const isSingleTopic = (select.id === 'topicSelect' && (!COURSE_CONFIG.slides || COURSE_CONFIG.slides.length <= 1));

      if (isSingleTopic) {
        wrapper.classList.add('no-dropdown');
        trigger.innerHTML = `<span class="selected-text"></span>`;
        wrapper.onclick = null;
      } else {
        wrapper.classList.remove('no-dropdown');
        if (!trigger.querySelector('.day-picker-chevron')) {
          trigger.innerHTML = `
            <span class="selected-text"></span>
            <span class="day-picker-chevron">
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1.5L5 5L9 1.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </span>
          `;
        }
        wrapper.onclick = (e) => {
          e.stopPropagation();
          const isOpen = optionsMenu.classList.contains('open');
          document.querySelectorAll('.custom-select-options').forEach(menu => {
            menu.classList.remove('open');
            menu.parentElement.classList.remove('open');
            menu.previousElementSibling.classList.remove('open');
          });
          if (!isOpen) {
            optionsMenu.classList.add('open');
            wrapper.classList.add('open');
            trigger.classList.add('open');
          }
        };
      }

      updateTriggerText();
    }

    populateOptions();

    // Listen to changes on the native select
    select.addEventListener('change', () => {
      updateTriggerText();
      optionsMenu.querySelectorAll('.custom-select-option').forEach(el => {
        if (el.dataset.value === select.value) {
          el.classList.add('selected');
        } else {
          el.classList.remove('selected');
        }
      });
    });

    // Watch for dynamic updates to child options (e.g. innerHTML changes)
    const observer = new MutationObserver(() => {
      populateOptions();
    });
    observer.observe(select, { childList: true });

    // Intercept programmatic select.value updates
    const descriptor = Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, 'value');
    Object.defineProperty(select, 'value', {
      get() {
        return descriptor.get.call(this);
      },
      set(val) {
        descriptor.set.call(this, val);
        updateTriggerText();
        optionsMenu.querySelectorAll('.custom-select-option').forEach(el => {
          if (el.dataset.value === String(val)) {
            el.classList.add('selected');
          } else {
            el.classList.remove('selected');
          }
        });
      }
    });
  });

  // Close menu on click outside
  document.addEventListener('click', () => {
    document.querySelectorAll('.custom-select-options').forEach(menu => {
      menu.classList.remove('open');
      menu.parentElement.classList.remove('open');
      menu.previousElementSibling.classList.remove('open');
    });
  });
}

function setupTimelineDragging() {
  // Stub: visual timeline features removed
}

let currentPlayingAudio = null;
let currentPlayingBtn = null;

let isCombinedPlaying = false;
let isNarrationActive = false;
let currentCombinedTime = 0;
let totalCombinedDuration = 0; // Will be set immediately after combinedTrackDurations is defined
let combinedTrackIndex = 0;
let combinedAudios = [];
let playProgressInterval = null;
let isScrubbing = false;

// P2 #13: Single authoritative duration recomputation — replaces all inline .reduce() calls
function recomputeTotalDuration() {
  totalCombinedDuration = combinedTrackDurations.reduce((a, b) => a + b, 0);
  return totalCombinedDuration;
}


const topic01Durations = [23.4, 14.1, 20.4, 11.1, 8.4, 9.5, 12.1, 9.2, 17.9, 22.2, 21.8, 24.7, 13.2, 3.8, 9.5, 5.4, 7.8, 11.4, 12.3, 13.3, 11.3, 25.7, 26.1, 31.8, 20.5, 9.3, 16.6, 21.8];
const topic01Tracks = [
  { src: 'New_Day1Part1audio01.mp3', target: '#rdbmsIntro', title: 'What is RDBMS?' },
  { src: 'New_Day1Part1audio02.mp3', target: '#whyRdbms', title: 'Why Relational Databases?' },
  { src: 'New_Day1Part1audio03.mp3', target: '#rdbmsProblems', title: 'Three Problems RDBMS Solves' },
  { src: 'New_Day1Part1audio04.mp3', target: '#coreEntities', title: 'Core Structural Entities' },
  { src: 'New_Day1Part1audio07.mp3', target: '#entityDatabase', title: 'Database Entity' },
  { src: 'New_Day1Part1audio06.mp3', target: '#entityTable', title: 'Table Entity' },
  { src: 'New_Day1Part1audio05.mp3', target: '#entityColumn', title: 'Column Entity' },
  { src: 'New_Day1Part1audio08.mp3', target: '#entityRow', title: 'Row Entity' },
  { src: 'New_Day1Part1audio09.mp3', target: '#pkFkKeys', title: 'Primary Key vs. Foreign Key' },
  { src: 'New_Day1Part1audio10.mp3', target: '#pkDetail', title: 'Primary Key' },
  { src: 'New_Day1Part1audio11.mp3', target: '#fkDetail', title: 'Foreign Key' },
  { src: 'New_Day1Part1audio12.mp3', target: '#parentTableDept', title: 'Parent & Child Tables' },
  { src: 'New_Day1Part1audio13.mp3', target: '#sqlDeclarative', title: 'SQL is Declarative' },
  { src: 'New_Day1Part1audio14.mp3', target: '#sqlImperativeVs', title: 'Imperative Code' },
  { src: 'New_Day1Part1audio15.mp3', target: '#sqlDeclarativeVs', title: 'Declarative Code' },
  { src: 'New_Day1Part1audio16.mp3', target: '#sqlSubLanguages', title: 'The Five SQL Sub-Languages' },
  { src: 'New_Day1Part1audio17.mp3', target: '#subLangDql', title: 'DQL — Data Query Language' },
  { src: 'New_Day1Part1audio18.mp3', target: '#subLangDml', title: 'DML — Data Manipulation Language' },
  { src: 'New_Day1Part1audio19.mp3', target: '#subLangDdl', title: 'DDL — Data Definition Language' },
  { src: 'New_Day1Part1audio20.mp3', target: '#subLangTcl', title: 'TCL — Transaction Control Language' },
  { src: 'New_Day1Part1audio21.mp3', target: '#subLangDcl', title: 'DCL — Data Control Language' },
  { src: 'New_Day1Part1audio22.mp3', target: '#proTipRdbms', title: 'Pro Tip: Which RDBMS?' },
  { src: 'New_Day1Part1audio23.mp3', target: '#iqReferentialIntegrity', title: 'Interview Q1: Referential Integrity' },
  { src: 'New_Day1Part1audio24.mp3', target: '#iqSqlVsNosql', title: 'Interview Q2: SQL vs NoSQL' },
  { src: 'New_Day1Part1audio25.mp3', target: '#iqCompositePk', title: 'Interview Q3: Primary Key' },
  // ── Practice Questions & Solutions ──
  { src: 'New_Day1Part1Question01.mp3', target: '#questionBar', title: 'Q1: Retrieve all employees', type: 'question', qId: 1 },
  { src: 'New_Day1Part1Question02.mp3', target: '#questionBar', title: 'Q1 Solution: SELECT *', type: 'solution', qId: 1 },
  { src: 'New_Day1Part1Question03.mp3', target: '#questionBar', title: 'Q2: Inspect sqlite_master', type: 'question', qId: 2 }
];

const topic02Durations = [27.5, 27.4, 20.7, 16.6, 12.3, 9.9, 10.4, 10.9, 10.3, 6.7, 9.5, 9.8, 12.7, 12.2, 19.9, 15.4, 17.6, 14.1, 14.0, 16.2, 14.9, 35.7, 31.1, 28.6, 35.6, 27.0, 26.4];
const topic02Tracks = [
  { src: 'Day01topic2/New_Day1Part2audio01.mp3', target: '#columnProjectionIntro', title: 'What is Column Projection?' },
  { src: 'Day01topic2/New_Day1Part2audio02.mp3', target: '#cardPagesBlocks', title: 'PAGES / BLOCKS Card' },
  { src: 'Day01topic2/New_Day1Part2audio03.mp3', target: '#cardRowOriented', title: 'ROW-ORIENTED Card' },
  { src: 'Day01topic2/New_Day1Part2audio03(new).mp3', target: '#cardFullPageLoad', title: 'FULL PAGE LOAD Card' },
  { src: 'Day01topic2/New_Day1Part2audio04.mp3', target: '#projectionDiagram', title: 'How Column Projection Works (Diagram)' },
  { src: 'Day01topic2/New_Day1Part2audio05.mp3', target: '#projectionLoads', title: 'Loads Link' },
  { src: 'Day01topic2/New_Day1Part2audio06.mp3', target: '#projectionFilter', title: 'SELECT name, salary Node' },
  { src: 'Day01topic2/New_Day1Part2audio07.mp3', target: '#projectionResultSet', title: 'Result Set Node' },
  { src: 'Day01topic2/New_Day1Part2audio08.mp3', target: '#performanceCosts', title: 'The Four Performance Costs of SELECT *' },
  { src: 'Day01topic2/New_Day1Part2audio09.mp3', target: '#costExcessDiskIO', title: '1. Excess Disk I/O' },
  { src: 'Day01topic2/New_Day1Part2audio10.mp3', target: '#costBufferPool', title: '2. Buffer Pool Pollution' },
  { src: 'Day01topic2/New_Day1Part2audio11(new).mp3', target: '#costNetworkOverhead', title: '3. Network Overhead' },
  { src: 'Day01topic2/New_Day1Part2audio11.mp3', target: '#costDefeatedIndex', title: '4. Defeated Index-Only Scans' },
  { src: 'Day01topic2/New_Day1Part2audio12.mp3', target: '#projectionMockTable', title: 'Mock Table (Projection)' },
  { src: 'Day01topic2/New_Day1Part2audio13.mp3', target: '#indexOnlyScans', title: 'Index-Only Scans — The Ultimate Optimization' },
  { src: 'Day01topic2/New_Day1Part2audio14.mp3', target: '#heapLookupRequired', title: 'SELECT * — Heap Lookup Required' },
  { src: 'Day01topic2/New_Day1Part2audio15.mp3', target: '#indexOnlyScanGood', title: 'Specific Projection — Index-Only Scan' },
  { src: 'Day01topic2/New_Day1Part2audio16.mp3', target: '#columnOrientedDbs', title: 'Column-Oriented Databases — A Step Further' },
  { src: 'Day01topic2/New_Day1Part2audio17.mp3', target: '#cardZeroOverhead', title: 'ZERO OVERHEAD Card' },
  { src: 'Day01topic2/New_Day1Part2audio18(new).mp3', target: '#cardBilledPerByte', title: 'BILLED PER BYTE Card' },
  { src: 'Day01topic2/New_Day1Part2audio18.mp3', target: '#cardCompression', title: 'COMPRESSION Card' },
  { src: 'Day01topic2/New_Day1Part2audio19.mp3', target: '#projectionProTip', title: '💡 Pro Tip: Real-World Outage Scenario' },
  { src: 'Day01topic2/New_Day1Part2audio20.mp3', target: '#iqIndexOnlyScan', title: 'Q1. What is an Index-Only Scan?' },
  { src: 'Day01topic2/New_Day1Part2audio21.mp3', target: '#iqSelectStarCosts', title: 'Q2. Why can SELECT * lead to buffer pool pollution?' },
  { src: 'Day01topic2/New_Day1Part2audio22.mp3', target: '#iqHeapScanVsIndexScan', title: 'Q3. Compare Column-Oriented vs Row-Oriented databases' },
  { src: 'Day01topic2/New_Day1Part2Question01.mp3', target: '#questionBar', title: 'Q1: Retrieve name & department', type: 'question', qId: 1 },
  { src: 'Day01topic2/New_Day1Part2Question02.mp3', target: '#questionBar', title: 'Q2: Project id, name, salary', type: 'question', qId: 2 }
];

const topic03Durations = [25.0, 28.0, 32.0, 22.0, 24.0, 30.0, 35.0, 28.0, 22.0, 30.0, 25.0, 28.0, 20.0, 22.0, 20.0, 24.0];
const topic03Tracks = [
  { src: 'Day01topic3/New_Day1Part3audio01.mp3', target: '#columnAliasingIntro', title: 'What is Column Aliasing?' },
  { src: 'Day01topic3/New_Day1Part3audio02.mp3', target: '#aliasingBenefits', title: 'Why Alias?' },
  { src: 'Day01topic3/New_Day1Part3audio03.mp3', target: '#aliasingSyntax', title: 'Syntax — Three Valid Forms' },
  { src: 'Day01topic3/New_Day1Part3audio04.mp3', target: '#aliasingWorksDiagram', title: 'How Aliasing Works' },
  { src: 'Day01topic3/New_Day1Part3audio05.mp3', target: '#aliasingMockTable', title: 'Result Set Headers' },
  { src: 'Day01topic3/New_Day1Part3audio06.mp3', target: '#aliasingQuoting', title: 'Quoting Rules' },
  { src: 'Day01topic3/New_Day1Part3audio07.mp3', target: '#aliasingLogicalOrder', title: 'Logical Execution Order' },
  { src: 'Day01topic3/New_Day1Part3audio08.mp3', target: '#aliasingWhereVS', title: 'Alias in WHERE Clause' },
  { src: 'Day01topic3/New_Day1Part3audio09.mp3', target: '#aliasingOrderByTip', title: 'Pro Tip: Aliasing in ORDER BY' },
  { src: 'Day01topic3/New_Day1Part3audio10.mp3', target: '#iqReferenceAlias', title: 'Interview Q1: Alias in WHERE' },
  { src: 'Day01topic3/New_Day1Part3audio11.mp3', target: '#iqColumnVsTable', title: 'Interview Q2: Column vs Table' },
  { src: 'Day01topic3/New_Day1Part3audio12.mp3', target: '#iqLogicalOrderExplanation', title: 'Interview Q3: Execution Order' },
  // ── Practice Questions & Solutions ──
  { src: 'Day01topic3/New_Day1Part3Question01.mp3', target: '#questionBar', title: 'Q1: Column Aliasing', type: 'question', qId: 1 },
  { src: 'Day01topic3/New_Day1Part3Question01_sol.mp3', target: '#questionBar', title: 'Q1 Solution: AS', type: 'solution', qId: 1 },
  { src: 'Day01topic3/New_Day1Part3Question02.mp3', target: '#questionBar', title: 'Q2: Computed Alias', type: 'question', qId: 2 },
  { src: 'Day01topic3/New_Day1Part3Question02_sol.mp3', target: '#questionBar', title: 'Q2 Solution: raise', type: 'solution', qId: 2 }
];

const day02Durations = [31.1, 25.9, 22.7, 22.4, 25.9, 22.9, 19.0, 18.8, 21.9, 24.1, 24.2, 30.7, 19.5, 22.8, 25.6, 18.2, 18.3, 37.5, 29.1, 28.7, 24.2, 17.3, 19.2, 14.3, 17.6, 10.4, 17.2, 14.4, 27.5, 16.5, 11.9, 19.5, 24.1, 23.0];
const day02Tracks = [
  { src: 'Day02/New_Day2Part1audio01.mp3', target: '#day02Anatomy', title: 'Anatomy of a SELECT Statement' },
  { src: 'Day02/New_Day2Part1audio02.mp3', target: '#day02AnatomyCode', title: 'SELECT * Example' },
  { src: 'Day02/New_Day2Part1audio03.mp3', target: '#day02AnatomyInfo', title: 'SELECT * vs Named Columns' },
  { src: 'Day02/New_Day2Part1audio04.mp3', target: '#day02Aliases', title: 'Column Aliases' },
  { src: 'Day02/New_Day2Part1audio05.mp3', target: '#day02AliasesCode', title: 'Aliases Example' },
  { src: 'Day02/New_Day2Part1audio06.mp3', target: '#day02AliasesValid', title: 'Valid vs Invalid Aliases' },
  { src: 'Day02/New_Day2Part1audio07.mp3', target: '#day02AliasesScope', title: 'Alias Scope Rules' },
  { src: 'Day02/New_Day2Part1audio08.mp3', target: '#day02Distinct', title: 'DISTINCT Clause' },
  { src: 'Day02/New_Day2Part1audio09.mp3', target: '#day02DistinctCode', title: 'DISTINCT Example' },
  { src: 'Day02/New_Day2Part1audio10.mp3', target: '#day02DistinctWarn', title: 'DISTINCT Performance' },
  { src: 'Day02/New_Day2Part1audio11.mp3', target: '#day02OrderBy', title: 'ORDER BY Clause' },
  { src: 'Day02/New_Day2Part1audio12.mp3', target: '#day02OrderByCode', title: 'ORDER BY Examples' },
  { src: 'Day02/New_Day2Part1audio13.mp3', target: '#day02OrderByTip', title: 'ORDER BY Pro Tip' },
  { src: 'Day02/New_Day2Part1audio14.mp3', target: '#day02Limit', title: 'LIMIT Clause' },
  { src: 'Day02/New_Day2Part1audio15.mp3', target: '#day02LimitCode', title: 'LIMIT Example' },
  { src: 'Day02/New_Day2Part1audio16.mp3', target: '#day02Logical', title: 'Logical Execution Order' },
  { src: 'Day02/New_Day2Part1audio17.mp3', target: '#day02LogicalWrite', title: 'Writing Order Syntax' },
  { src: 'Day02/New_Day2Part1audio18.mp3', target: '#day02LogicalExec', title: 'Execution Order Logical' },
  { src: 'Day02/New_Day2Part1audio19.mp3', target: '#day02QALimit', title: 'LIMIT vs TOP Q&A' },
  { src: 'Day02/New_Day2Part1audio20.mp3', target: '#day02QAAlias', title: 'Alias in WHERE Q&A' },
  { src: 'Day02/New_Day2Part1audio21.mp3', target: '#day02QAStar', title: 'SELECT * Performance Q&A' },
  { src: 'Day02/New_Day2Question01.mp3', target: '#questionBar', title: 'Q1: Product Catalog', type: 'question', qId: 1 },
  { src: 'Day02/New_Day2Question01sol.mp3', target: '#questionBar', title: 'Q1 Solution: Product Catalog', type: 'solution', qId: 1 },
  { src: 'Day02/New_Day2Question02.mp3', target: '#questionBar', title: 'Q2: Top 5 Earners', type: 'question', qId: 2 },
  { src: 'Day02/New_Day2Question02sol.mp3', target: '#questionBar', title: 'Q2 Solution: Top 5 Earners', type: 'solution', qId: 2 },
  { src: 'Day02/New_Day2Question03.mp3', target: '#questionBar', title: 'Q3: Distinct Regions', type: 'question', qId: 3 },
  { src: 'Day02/New_Day2Question03sol.mp3', target: '#questionBar', title: 'Q3 Solution: Distinct Regions', type: 'solution', qId: 3 },
  { src: 'Day02/New_Day2Question04.mp3', target: '#questionBar', title: 'Q4: Salary with Alias', type: 'question', qId: 4 },
  { src: 'Day02/New_Day2Question04sol.mp3', target: '#questionBar', title: 'Q4 Solution: Salary with Alias', type: 'solution', qId: 4 },
  { src: 'Day02/New_Day2Question05.mp3', target: '#questionBar', title: 'Q5: Customer Snapshot', type: 'question', qId: 5 },
  { src: 'Day02/New_Day2Question05sol.mp3', target: '#questionBar', title: 'Q5 Solution: Customer Snapshot', type: 'solution', qId: 5 },
  { src: 'Day02/New_Day2Question06.mp3', target: '#questionBar', title: 'Q6: Profit Margin Column', type: 'question', qId: 6 },
  { src: 'Day02/New_Day2Question06sol.mp3', target: '#questionBar', title: 'Q6 Solution: Profit Margin Column', type: 'solution', qId: 6 },
  { src: 'Day02/Final_Audio.mp3', target: '#day02Completion', title: 'Day 2 Complete! 🎉', type: 'completion' }
];

const day03Durations = [
  44.0, 39.0, 19.5, 19.5, 55.4, 30.0, 5.5, 4.5, 4.0, 4.0, 11.0
];

const day03Tracks = [
  { src: 'Day03/New_Day3Part1audio01.mp3', target: '#day03Where', title: 'The WHERE Clause' },
  { src: 'Day03/New_Day3Part1audio02.mp3', target: '#day03WhereCode', title: 'WHERE Clause Syntax & Examples' },
  { src: 'Day03/New_Day3Part1audio03.mp3', target: '#day03WhereInfo', title: 'Execution Order' },
  { src: 'Day03/New_Day3Part1audio04.mp3', target: '#day03CompOps', title: 'Comparison Operators' },
  { src: 'Day03/New_Day3Part1audio05.mp3', target: '#day03OpsTable', title: 'Comparison Operator Reference' },
  { src: 'Day03/New_Day3Part1audio06.mp3', target: '#day03CompCode', title: 'Comparison Operator Examples' },
  { src: 'Day03/New_Day3Part1audio07.mp3', target: '#day03LogicOps', title: 'Logical Operators Intro' },
  { src: 'Day03/New_Day3Part1audio08.mp3', target: '.prec-card--not', title: 'Logical Operator — NOT' },
  { src: 'Day03/New_Day3Part1audio09.mp3', target: '.prec-card--and', title: 'Logical Operator — AND' },
  { src: 'Day03/New_Day3Part1audio10.mp3', target: '.prec-card--or', title: 'Logical Operator — OR' },
  { src: 'Day03/New_Day3Part1audio11.mp3', target: '#day03PrecedenceNote', title: 'Operator Precedence Rules' }
];

const slideTrackMap = {
  'day01': {
    0: { tracks: topic01Tracks, durations: topic01Durations },
    1: { tracks: topic02Tracks, durations: topic02Durations },
    2: { tracks: topic03Tracks, durations: topic03Durations }
  },
  'day02': {
    0: { tracks: day02Tracks, durations: day02Durations }
  },
  'day03': {
    0: { tracks: day03Tracks, durations: day03Durations }
  }
};

let combinedTrackDurations = slideTrackMap['day01'][0].durations;
let combinedTracks = slideTrackMap['day01'][0].tracks;

const AUDIO_CDN_BASE = "/Version-3";
let manifest = {};

// Slide Progress History state variables
let slideProgressHistory = {};
let lastActiveSlideIndex = 0;
let lastActiveDay = 'day01';
let pendingAudioStartTime = 0;

// Compute totalCombinedDuration immediately from hardcoded fallbacks so the
// progress bar shows a real duration even before the manifest has loaded.
recomputeTotalDuration();
let activeAudioInstance = null;
let currentGeneration = 0;
let nextTrackPrefetch = null;
let prefetchedForIndex = null;
let prefetchFailed = false;
let hasCompletedFirstGestureBoundPlay = false;

async function loadManifest() {
  try {
    if (Object.keys(manifest).length === 0) {
      const res = await fetch('/Version-3/manifest.json?v=14.34');
      manifest = await res.json();
    }
    // Re-calculate durations from manifest metadata for all slides
    Object.keys(slideTrackMap).forEach(dayKey => {
      const dayConfig = slideTrackMap[dayKey];
      Object.keys(dayConfig).forEach(slideKey => {
        const config = dayConfig[slideKey];
        config.tracks.forEach((t, index) => {
          const filename = t.src.split('/').pop().replace('.mp3', '');
          const trackId = `${dayKey}_${filename}`;
          const entry = manifest[trackId];
          if (entry && entry.durationMs) {
            config.durations[index] = entry.durationMs / 1000;
          }
        });
      });
    });
    recomputeTotalDuration();
    updateProgressUI();
    initCustomDropdowns();
  } catch (err) {
    console.log('Using default durations fallback:', err);
    recomputeTotalDuration();
    updateProgressUI();
    initCustomDropdowns();
  }
}

async function loadTrackEvents(trackId) {
  const entry = manifest[trackId];
  if (!entry || !entry.eventsPath) return null;
  try {
    const res = await fetch(getAudioUrl(entry).replace('.mp3', '.events.json'));
    return await res.json();
  } catch (err) {
    return null;
  }
}

function getAudioUrl(entry) {
  if (!entry || !entry.audioPath) return '';
  if (entry.audioPath.startsWith('http') || entry.audioPath.startsWith('/')) {
    return entry.audioPath;
  }
  return `${AUDIO_CDN_BASE}/${entry.audioPath}`;
}

// ═══════════════════════════════════════════════════════════════════════════════
// ║  COMPLETION ANIMATION ENGINE — Day 2 Final_Audio.mp3                       ║
// ║  Three.js narration companion: 7 3D objects synced to audio.currentTime    ║
// ═══════════════════════════════════════════════════════════════════════════════

// ── CDN Loader ────────────────────────────────────────────────────────────────
function ensureThreeLoaded(callback) {
  if (window.THREE) {
    loadPostProcessingIfPossible(callback);
    return;
  }
  const s = document.createElement('script');
  s.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
  s.onload = () => loadPostProcessingIfPossible(callback);
  s.onerror = () => {
    const f = document.createElement('script');
    f.src = 'https://cdn.jsdelivr.net/npm/three@0.147.0/build/three.min.js';
    f.onload = () => loadPostProcessingIfPossible(callback);
    f.onerror = () => console.warn('[Completion] Three.js CDN failed to load.');
    document.head.appendChild(f);
  };
  document.head.appendChild(s);
}

function loadPostProcessingIfPossible(callback) {
  const isMobile = window.innerWidth < 768;
  if (isMobile) {
    callback();
    return;
  }

  const scripts = [
    'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/postprocessing/EffectComposer.js',
    'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/postprocessing/ShaderPass.js',
    'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/postprocessing/RenderPass.js',
    'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/postprocessing/UnrealBloomPass.js',
    'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/shaders/LuminosityHighPassShader.js',
    'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/shaders/CopyShader.js',
    'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/shaders/VignetteShader.js'
  ];

  let loaded = 0;
  function next() {
    if (loaded === scripts.length) {
      callback();
      return;
    }
    const s = document.createElement('script');
    s.src = scripts[loaded];
    s.onload = () => {
      loaded++;
      next();
    };
    s.onerror = (e) => {
      console.warn('[Completion] Postprocessing script failed to load. Falling back.', scripts[loaded], e);
      callback(); // Fallback gracefully
    };
    document.head.appendChild(s);
  }
  next();
}

// ── State ─────────────────────────────────────────────────────────────────────
let completionRafId = null;
let completionOverlayDiv = null;
let completionCanvas = null;
let completionCaption = null;
let completionLegend = null;
let completionFadeState = null;  // { dir: 'in'|'out', progress: 0..1, mesh }
let completionRenderer = null;
let completionComposer = null;
let completionScene = null;
let completionCamera = null;
let completionClock = null;
let completionActiveObj = null;
let completionOutroObj = null;
let completionActiveMomentId = null;
const completionDisposables = [];    // all geometries/materials to dispose on teardown

// ── MOMENTS ARRAY ─────────────────────────────────────────────────────────────
// Exact word-level ASR timestamps extracted directly from Final_Audio.mp3 (23.0s total duration)
const COMPLETION_MOMENTS = [
  { id: 'complete', startAt: 0.00, endAt: 1.90, label: '✅ Day 2 Complete!', builder: 'buildCheckmark', accent: 0x00ffcc },
  { id: 'greatWork', startAt: 1.90, endAt: 5.80, label: '🌟 Great Work!', builder: 'buildGreatWork', accent: 0x10b981 },
  { id: 'distinct', startAt: 5.80, endAt: 7.20, label: '💎 DISTINCT', builder: 'buildGem', accent: 0xa78bfa },
  { id: 'orderLimit', startAt: 7.20, endAt: 9.60, label: '📊 ORDER BY & LIMIT', builder: 'buildSortedBars', accent: 0x38bdf8 },
  { id: 'logicOrder', startAt: 9.60, endAt: 14.60, label: '⚙️ Logical Execution Order', builder: 'buildPipeline', accent: 0xfbbf24 },
  { id: 'questions', startAt: 14.60, endAt: 17.50, label: '❓ 25 Interview Questions', builder: 'buildQuestionCluster', accent: 0xf472b6 },
  { id: 'cert', startAt: 17.50, endAt: 21.40, label: '🏆 25 Marks • Certification', builder: 'buildTrophy', accent: 0xfbbf24 },
  { id: 'nextLevel', startAt: 21.40, endAt: 26.50, label: '🚀 Ready for the Next Level', builder: 'buildRocket', accent: 0xf97316 },
];

// ── Helper: track disposable ──────────────────────────────────────────────────
function cd(resource) { completionDisposables.push(resource); return resource; }

// ── Helper: Canvas Texture Sprite Generator (Dynamic Auto-Sizing to Prevent Text Cropping) ──
function drawRoundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

function createCanvasTexture(THREE, text, options = {}) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const fontSize = options.fontSize || 56;

  ctx.font = `800 ${fontSize}px system-ui, -apple-system, sans-serif`;
  const metrics = ctx.measureText(text);
  const textWidth = Math.ceil(metrics.width);
  const padX = options.padX !== undefined ? options.padX : 64;
  const padY = options.padY !== undefined ? options.padY : 40;

  canvas.width = options.width || Math.max(128, textWidth + padX * 2);
  canvas.height = options.height || Math.max(96, fontSize + padY * 2);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (options.drawBgTag) {
    ctx.save();
    ctx.shadowBlur = 0; // Disable text shadow for background drawing

    // Draw background card fill
    ctx.fillStyle = options.bgTagColor || 'rgba(15, 23, 42, 0.85)';
    drawRoundRect(ctx, 4, 4, canvas.width - 8, canvas.height - 8, 16);
    ctx.fill();

    // Draw glowing border
    ctx.strokeStyle = options.borderColor || 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = options.borderWidth || 3.0;
    ctx.stroke();

    ctx.restore();
  }

  if (options.glowColor) {
    ctx.shadowColor = options.glowColor;
    ctx.shadowBlur = options.shadowBlur || 22;
  }
  ctx.font = `800 ${fontSize}px system-ui, -apple-system, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = options.color || '#ffffff';
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  texture.aspect = canvas.width / canvas.height;
  return texture;
}

function createGearMesh(THREE, radius, colorHex, teethCount = 12) {
  const gearGroup = new THREE.Group();

  const gearMat = cd(new THREE.MeshPhysicalMaterial({
    color: colorHex,
    emissive: colorHex,
    emissiveIntensity: 0.35,
    metalness: 0.92,
    roughness: 0.12,
    clearcoat: 0.6,
    clearcoatRoughness: 0.1,
    envMapIntensity: 1.5
  }));

  const darkMat = cd(new THREE.MeshPhysicalMaterial({
    color: 0x0f172a,
    metalness: 0.8,
    roughness: 0.3
  }));

  // Outer Gear Ring
  const outerRing = new THREE.Mesh(cd(new THREE.CylinderGeometry(radius, radius, 0.14, 36)), gearMat);
  gearGroup.add(outerRing);

  // Bezel Rims for rich 3D depth
  const rimFront = new THREE.Mesh(cd(new THREE.TorusGeometry(radius, 0.035, 16, 48)), gearMat);
  rimFront.position.z = 0.07;
  const rimBack = new THREE.Mesh(cd(new THREE.TorusGeometry(radius, 0.035, 16, 48)), gearMat);
  rimBack.position.z = -0.07;
  gearGroup.add(rimFront, rimBack);

  // Inner Hollow Cutout & Center Hub
  const hole = new THREE.Mesh(cd(new THREE.CylinderGeometry(radius * 0.45, radius * 0.45, 0.16, 32)), darkMat);
  gearGroup.add(hole);

  const hub = new THREE.Mesh(cd(new THREE.CylinderGeometry(radius * 0.25, radius * 0.25, 0.18, 24)), gearMat);
  gearGroup.add(hub);

  const axleHole = new THREE.Mesh(cd(new THREE.CylinderGeometry(radius * 0.1, radius * 0.1, 0.20, 16)), darkMat);
  gearGroup.add(axleHole);

  // 4 Internal Spokes
  for (let s = 0; s < 4; s++) {
    const spokeAngle = (s / 4) * Math.PI * 2;
    const spoke = new THREE.Mesh(cd(new THREE.BoxGeometry(radius * 0.7, 0.06, 0.1)), gearMat);
    spoke.rotation.z = spokeAngle;
    gearGroup.add(spoke);
  }

  // Precision Gear Teeth
  for (let i = 0; i < teethCount; i++) {
    const angle = (i / teethCount) * Math.PI * 2;
    const tooth = new THREE.Mesh(cd(new THREE.BoxGeometry(0.12, 0.18, 0.14)), gearMat);
    tooth.position.set(Math.cos(angle) * (radius + 0.08), Math.sin(angle) * (radius + 0.08), 0);
    tooth.rotation.z = angle;
    gearGroup.add(tooth);
  }

  // Face front towards camera
  gearGroup.rotation.x = 0;
  return gearGroup;
}

// ── v2 Realism Helpers ────────────────────────────────────────────────────────

// Helper: Circular gradient billboard texture for neon stardust particles
function createGlowDotTexture(THREE, colorHex) {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, colorHex);
  grad.addColorStop(0.3, colorHex);
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 64, 64);
  const tex = new THREE.CanvasTexture(canvas);
  return tex;
}

// Helper: Procedural 3D Block Extruded Numeral Badge
function create3DBlockNumber(THREE, numStr, colorHex) {
  const numGroup = new THREE.Group();
  const mat = cd(new THREE.MeshPhysicalMaterial({
    color: colorHex,
    emissive: colorHex,
    emissiveIntensity: 0.4,
    metalness: 0.85,
    roughness: 0.15,
    clearcoat: 0.4,
    envMapIntensity: 1.3
  }));

  const segmentDepth = 0.25;

  function addSegment(gx, gy, w, h) {
    const mesh = new THREE.Mesh(cd(new THREE.BoxGeometry(w, h, segmentDepth)), mat);
    mesh.position.set(gx, gy, 0);
    numGroup.add(mesh);
  }

  let xOffset = numStr.length === 2 ? -0.45 : 0;

  for (let char of numStr) {
    if (char === '2') {
      addSegment(xOffset + 0, 0.6, 0.6, 0.15);
      addSegment(xOffset + 0.225, 0.3, 0.15, 0.45);
      addSegment(xOffset + 0, 0, 0.6, 0.15);
      addSegment(xOffset - 0.225, -0.3, 0.15, 0.45);
      addSegment(xOffset + 0, -0.6, 0.6, 0.15);
    } else if (char === '5') {
      addSegment(xOffset + 0, 0.6, 0.6, 0.15);
      addSegment(xOffset - 0.225, 0.3, 0.15, 0.45);
      addSegment(xOffset + 0, 0, 0.6, 0.15);
      addSegment(xOffset + 0.225, -0.3, 0.15, 0.45);
      addSegment(xOffset + 0, -0.6, 0.6, 0.15);
    }
    xOffset += 0.9;
  }

  return numGroup;
}

// Helper: Procedural Extruded 3D Star
function create3DStar(THREE, radius, depth, colorHex) {
  const shape = new THREE.Shape();
  const spikes = 5;
  const outerRadius = radius;
  const innerRadius = radius * 0.4;

  for (let i = 0; i < spikes * 2; i++) {
    const angle = (i * Math.PI) / spikes - Math.PI / 2; // Point upwards
    const r = i % 2 === 0 ? outerRadius : innerRadius;
    const x = Math.cos(angle) * r;
    const y = Math.sin(angle) * r;
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  shape.closePath();

  const extrudeOpts = { depth: depth, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.02, bevelSegments: 3 };
  const starColor = colorHex !== undefined ? colorHex : 0xfbbf24;
  const mat = cd(new THREE.MeshPhysicalMaterial({
    color: starColor,
    emissive: starColor,
    emissiveIntensity: 0.45, // Reduce to 0.45 to prevent blowouts and keep material contrast rich
    metalness: 0.3,
    roughness: 0.08,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    envMapIntensity: 1.8
  }));
  const mesh = new THREE.Mesh(cd(new THREE.ExtrudeGeometry(shape, extrudeOpts)), mat);
  mesh.geometry.center();
  return mesh;
}

// Helper: Procedural high-contrast white-grey marble texture
function createMarbleTexture(THREE) {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#f8fafc';
  ctx.fillRect(0, 0, 256, 256);

  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 2.5;
  for (let i = 0; i < 6; i++) {
    ctx.beginPath();
    let x = Math.random() * 256;
    let y = 0;
    ctx.moveTo(x, y);
    while (y < 256) {
      y += 10 + Math.random() * 20;
      x += (Math.random() - 0.5) * 25;
      ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
  const tex = cd(new THREE.CanvasTexture(canvas));
  return tex;
}

// Helper: Soft contact shadow plane to ground subject in space
function createContactShadowPlane(THREE) {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  grad.addColorStop(0, 'rgba(10, 14, 26, 0.45)');
  grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 128, 128);

  const tex = cd(new THREE.CanvasTexture(canvas));
  const mat = cd(new THREE.MeshBasicMaterial({
    map: tex,
    transparent: true,
    depthWrite: false
  }));
  const geom = cd(new THREE.PlaneGeometry(3.5, 3.5));
  const mesh = new THREE.Mesh(geom, mat);
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.y = -2.0;
  return mesh;
}

// Safe-zone viewport boundary radius calculator
function getSafeOrbitalRadius(camera, r, objectRadius = 0.3) {
  const d = camera ? camera.position.z : 6.8;
  const fov = camera ? camera.fov : 45;
  const aspect = camera ? camera.aspect : (window.innerWidth / window.innerHeight);
  const h = 2 * d * Math.tan((fov * Math.PI) / 360);
  const w = h * aspect;
  const marginFraction = 0.4; // 10% margins => center bound max width/height fraction
  const maxR = marginFraction * Math.min(w, h) - objectRadius;
  return Math.min(r, maxR);
}

// ── Screen-space overlap resolution system ───────────────────────────────────
function nudgeAlongCameraPlane(obj, camera, pxX, pxY) {
  const THREE = window.THREE;
  const d = camera.position.distanceTo(obj.position);
  const vHeight = 2 * d * Math.tan((camera.fov * Math.PI) / 360);
  const vWidth = vHeight * camera.aspect;
  const worldPushX = (pxX / window.innerWidth) * vWidth;
  const worldPushY = (-pxY / window.innerHeight) * vHeight;

  const right = new THREE.Vector3();
  const up = new THREE.Vector3();
  camera.matrixWorld.extractBasis(right, up, new THREE.Vector3());

  obj.position.addScaledVector(right, worldPushX);
  obj.position.addScaledVector(up, worldPushY);
}

function resolveOverlaps(group, camera, renderer) {
  if (!group || !camera || !renderer) return;
  const objects = [];
  group.traverse(child => {
    if (child !== group && child.userData && child.userData.screenRadius) {
      objects.push(child);
    }
  });

  if (objects.length < 2) return;

  const width = renderer.domElement.width;
  const height = renderer.domElement.height;

  // Reset all objects with basePos to their non-nudged coordinates first
  objects.forEach(obj => {
    if (obj.userData && obj.userData.basePos) {
      obj.position.copy(obj.userData.basePos);
    }
  });

  const projected = objects.map(obj => {
    const v = obj.position.clone().project(camera);
    return {
      obj,
      x: (v.x * 0.5 + 0.5) * width,
      y: (-v.y * 0.5 + 0.5) * height,
      radius: obj.userData.screenRadius
    };
  });

  for (let i = 0; i < projected.length; i++) {
    for (let j = i + 1; j < projected.length; j++) {
      const a = projected[i];
      const b = projected[j];
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const dist = Math.hypot(dx, dy);
      const minDist = a.radius + b.radius + 12; // 12px breathing room
      if (dist < minDist && dist > 0.001) {
        const push = (minDist - dist) / 2;
        const nx = dx / dist;
        const ny = dy / dist;
        nudgeAlongCameraPlane(a.obj, camera, -nx * push, -ny * push);
        nudgeAlongCameraPlane(b.obj, camera, nx * push, ny * push);
      }
    }
  }
}

// Act 1: "Day 2 Complete" — Grand Glowing Checkmark Shield Medallion
function buildCheckmark(THREE) {
  const group = new THREE.Group();
  const outerMat = cd(new THREE.MeshPhysicalMaterial({
    color: 0xfbbf24,
    emissive: 0xd97706,
    emissiveIntensity: 0.5,
    metalness: 0.95,
    roughness: 0.12,
    clearcoat: 0.4,
    envMapIntensity: 1.4
  }));
  const outerRing = new THREE.Mesh(cd(new THREE.TorusGeometry(1.45, 0.12, 24, 96)), outerMat);

  const innerMat = cd(new THREE.MeshPhysicalMaterial({
    color: 0x00ffcc,
    emissive: 0x00ffcc,
    emissiveIntensity: 1.4,
    metalness: 0.1,
    roughness: 0.1
  }));
  const innerRing = new THREE.Mesh(cd(new THREE.TorusGeometry(1.2, 0.06, 16, 80)), innerMat);
  group.add(outerRing, innerRing);

  const discMat = cd(new THREE.MeshPhysicalMaterial({
    color: 0x0a192f,
    transparent: true,
    opacity: 0.75,
    roughness: 0.4,
    metalness: 0.3
  }));
  const disc = new THREE.Mesh(cd(new THREE.CircleGeometry(1.15, 48)), discMat);
  disc.position.z = -0.05;
  group.add(disc);

  const shape = new THREE.Shape();
  shape.moveTo(-0.45, -0.05);
  shape.lineTo(-0.15, -0.38);
  shape.lineTo(0.55, 0.38);
  shape.lineTo(0.42, 0.52);
  shape.lineTo(-0.15, -0.20);
  shape.lineTo(-0.35, 0.05);
  shape.closePath();

  const extrudeOpts = { depth: 0.22, bevelEnabled: true, bevelThickness: 0.06, bevelSize: 0.04, bevelSegments: 4 };
  const checkGeom = cd(new THREE.ExtrudeGeometry(shape, extrudeOpts));
  checkGeom.center();

  const checkMesh = new THREE.Mesh(
    checkGeom,
    cd(new THREE.MeshPhysicalMaterial({
      color: 0x00ffcc,
      emissive: 0x00ffcc,
      emissiveIntensity: 1.6,
      metalness: 0.3,
      roughness: 0.15,
      clearcoat: 0.8
    }))
  );
  checkMesh.position.z = 0.1;
  checkMesh.userData = { billboard: true };
  group.add(checkMesh);

  // Glowing Camera-Facing "✓ COMPLETE!" Sprite Badge (Uncropped Auto-Aspect)
  const tex = cd(createCanvasTexture(THREE, "✓ COMPLETE!", { color: '#00ffcc', glowColor: '#00ffcc', fontSize: 64 }));
  const spriteMat = cd(new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false, depthWrite: false }));
  const sprite = new THREE.Sprite(spriteMat);
  const h = 0.75;
  sprite.scale.set(h * tex.aspect, h, 1);
  sprite.position.set(0, 1.75, 0.25);
  sprite.renderOrder = 3;
  group.add(sprite);

  // Soft circular gradient particles
  const particleTex = cd(createGlowDotTexture(THREE, '#60efff'));
  const pMat = cd(new THREE.PointsMaterial({
    size: 0.14,
    map: particleTex,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  }));
  const pGeom = new THREE.BufferGeometry();
  const positions = [];
  for (let i = 0; i < 36; i++) {
    const a = (i / 36) * Math.PI * 2;
    const r = 1.85 + (i % 3) * 0.15;
    positions.push(Math.cos(a) * r, Math.sin(a) * r, (Math.random() - 0.5) * 0.4);
  }
  pGeom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  const points = new THREE.Points(pGeom, pMat);
  points.name = 'particles';
  group.add(points);

  return group;
}

// Act 2: "Great Work!" — 3D Clapping Emoji (👏) Shield & Celebration Confetti
function buildGreatWork(THREE) {
  const group = new THREE.Group();

  // Outer Emerald Laurel Torus Ring
  const ringMat = cd(new THREE.MeshPhysicalMaterial({
    color: 0x10b981,
    emissive: 0x059669,
    emissiveIntensity: 0.6,
    metalness: 0.9,
    roughness: 0.15,
    clearcoat: 0.5,
    envMapIntensity: 1.4
  }));
  const ring = new THREE.Mesh(cd(new THREE.TorusGeometry(1.5, 0.1, 24, 96)), ringMat);
  group.add(ring);

  // Inner Emerald Shield Disc
  const discMat = cd(new THREE.MeshPhysicalMaterial({
    color: 0x064e3b,
    transparent: true,
    opacity: 0.65,
    roughness: 0.3,
    metalness: 0.4
  }));
  const disc = new THREE.Mesh(cd(new THREE.CircleGeometry(1.3, 48)), discMat);
  disc.position.z = -0.05;
  group.add(disc);

  // 3D Star Shield Medallion Base in Center (Royal Indigo for maximum complementary contrast with yellow hands)
  const star = create3DStar(THREE, 0.75, 0.2, 0x6366f1);
  star.position.set(0, 0, 0.05);
  star.userData = { billboard: true };
  group.add(star);

  // 3D Clapping Emoji 👏 Badge Group (Pulsing Rhythm)
  const clapGroup = new THREE.Group();
  clapGroup.name = 'clapEmojiGroup';

  const clapTex = cd(createCanvasTexture(THREE, "👏", { fontSize: 110, padX: 40, padY: 40 }));
  const clapMat = cd(new THREE.SpriteMaterial({ map: clapTex, transparent: true, depthTest: false, depthWrite: false }));
  const clapSprite = new THREE.Sprite(clapMat);
  const hClap = 1.35;
  clapSprite.scale.set(hClap * clapTex.aspect, hClap, 1);
  clapSprite.position.set(0, 0.05, 0.2);
  clapSprite.renderOrder = 3;
  clapGroup.add(clapSprite);

  clapGroup.userData = { billboard: true };
  group.add(clapGroup);

  // High-Contrast Billboard Text Badge "GREAT WORK!" (Positioned at Top of 3D Object)
  const tex = cd(createCanvasTexture(THREE, "GREAT WORK!", { color: '#ffffff', glowColor: '#10b981', fontSize: 64 }));
  const spriteMat = cd(new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false, depthWrite: false }));
  const sprite = new THREE.Sprite(spriteMat);
  const hText = 0.75;
  sprite.scale.set(hText * tex.aspect, hText, 1);
  sprite.position.set(0, 1.75, 0.25);
  sprite.renderOrder = 3;
  group.add(sprite);

  // Celebration Confetti/Particles
  const pTex = cd(createGlowDotTexture(THREE, '#34d399'));
  const pMat = cd(new THREE.PointsMaterial({
    size: 0.15,
    map: pTex,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  }));
  const pGeom = new THREE.BufferGeometry();
  const positions = [];
  for (let i = 0; i < 45; i++) {
    const a = (i / 45) * Math.PI * 2;
    const r = 1.65 + (i % 4) * 0.15;
    positions.push(Math.cos(a) * r, Math.sin(a) * r, (Math.random() - 0.5) * 0.5);
  }
  pGeom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  const confetti = new THREE.Points(pGeom, pMat);
  confetti.name = 'particles';
  group.add(confetti);

  return group;
}

// Act 2: "DISTINCT" — Faceted Diamond Gem & Orbiting Crystal Shards
function buildGem(THREE) {
  const group = new THREE.Group();
  const gemMat = cd(new THREE.MeshPhysicalMaterial({
    color: 0xa78bfa,
    emissive: 0x7c3aed,
    emissiveIntensity: 0.5,
    metalness: 0.1,
    roughness: 0.02,
    transmission: 0.95,
    thickness: 0.8,
    transparent: true,
    opacity: 0.85,
    depthWrite: false,
    ior: 2.4,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
    envMapIntensity: 1.4
  }));
  const gem = new THREE.Mesh(cd(new THREE.OctahedronGeometry(1.35, 0)), gemMat);
  gem.name = 'diamondGem';
  gem.renderOrder = 0;
  group.add(gem);

  const coreMat = cd(new THREE.MeshBasicMaterial({ color: 0xe879f9 }));
  const core = new THREE.Mesh(cd(new THREE.SphereGeometry(0.45, 16, 16)), coreMat);
  core.name = 'gemCore';
  core.renderOrder = 1;
  group.add(core);

  // Floating Camera-Facing "DISTINCT" Text Badge inside/front of gem core (Uncropped Auto-Aspect)
  const tex = cd(createCanvasTexture(THREE, "DISTINCT", { color: '#ffffff', glowColor: '#a78bfa', fontSize: 64 }));
  const spriteMat = cd(new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false, depthWrite: false }));
  const sprite = new THREE.Sprite(spriteMat);
  const h = 0.65;
  sprite.scale.set(h * tex.aspect, h, 1);
  sprite.position.set(0, 0, 0);
  sprite.renderOrder = 3;
  group.add(sprite);

  const shardGroup = new THREE.Group();
  shardGroup.name = 'shards';

  const r = getSafeOrbitalRadius(completionCamera, 1.95, 0.2);

  const shardMat = cd(new THREE.MeshStandardMaterial({
    color: 0x22d3ee,
    emissive: 0x06b6d4,
    emissiveIntensity: 0.6,
    metalness: 0.9,
    roughness: 0.1
  }));

  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2;
    const shard = new THREE.Mesh(cd(new THREE.TetrahedronGeometry(0.2, 0)), shardMat);
    shard.position.set(Math.cos(angle) * r, (i % 2 === 0 ? 0.35 : -0.35), Math.sin(angle) * r);
    shard.userData = { screenRadius: 20, basePos: shard.position.clone() };
    shardGroup.add(shard);
  }
  group.add(shardGroup);

  return group;
}

// Act 3: "ORDER BY & LIMIT" — Sequential Live Animated Bars + TOP 1 Crown
function buildSortedBars(THREE) {
  const group = new THREE.Group();
  const barHeights = [0.6, 1.1, 1.6, 2.1, 2.7];

  // Color Science Progression: Violet ➔ Cobalt ➔ Aqua ➔ Emerald ➔ Imperial Gold
  const barColors = [0x8b5cf6, 0x3b82f6, 0x06b6d4, 0x10b981, 0xfbbf24];
  const emissiveCols = [0x6d28d9, 0x1d4ed8, 0x0e7490, 0x047857, 0xd97706];
  const labelGlows = ['#f11aa9ff', '#1f78e5ff', '#5ae9ffff', '#34d399', '#fef08a'];
  const bars = [];

  const colSpacing = 0.60; // Slightly widened spacing for perfect, guaranteed non-overlapping layouts

  // 1. Premium Brushed Titanium Lower Plinth Base
  const lowerBaseMat = cd(new THREE.MeshPhysicalMaterial({ color: 0x0f172a, metalness: 0.9, roughness: 0.1, clearcoat: 0.8, envMapIntensity: 1.5 }));
  const lowerBase = new THREE.Mesh(cd(new THREE.BoxGeometry(3.2, 0.08, 0.52)), lowerBaseMat);
  lowerBase.position.set(0, -0.56, 0);
  group.add(lowerBase);

  // 2. Cyber-Cyan Glowing Glass Upper Deck
  const upperDeckMat = cd(new THREE.MeshPhysicalMaterial({
    color: 0x06b6d4,
    emissive: 0x0891b2,
    emissiveIntensity: 0.7,
    transmission: 0.85,
    thickness: 0.2,
    roughness: 0.05,
    envMapIntensity: 1.3
  }));
  const upperDeck = new THREE.Mesh(cd(new THREE.BoxGeometry(3.0, 0.03, 0.44)), upperDeckMat);
  upperDeck.position.set(0, -0.51, 0);
  group.add(upperDeck);

  for (let i = 0; i < 5; i++) {
    const colX = (i - 2) * colSpacing;

    // 3. Metallic Foot Bracket for each column
    const bracketMat = cd(new THREE.MeshPhysicalMaterial({ color: 0x1e293b, metalness: 0.8, roughness: 0.2 }));
    const bracket = new THREE.Mesh(cd(new THREE.BoxGeometry(0.44, 0.02, 0.44)), bracketMat);
    bracket.position.set(colX, -0.49, 0);
    group.add(bracket);

    const barMat = cd(new THREE.MeshPhysicalMaterial({
      color: barColors[i],
      emissive: emissiveCols[i],
      emissiveIntensity: i === 4 ? 0.55 : 0.42,
      metalness: 0.3,
      roughness: 0.08,
      transmission: 0.80,
      thickness: 0.5,
      clearcoat: 0.8,
      clearcoatRoughness: 0.1,
      envMapIntensity: 1.2
    }));
    const barMesh = new THREE.Mesh(cd(new THREE.BoxGeometry(0.36, 1, 0.36)), barMat);
    barMesh.position.x = colX;
    barMesh.position.y = 0;
    barMesh.scale.y = 0.01;
    barMesh.userData = { targetHeight: barHeights[i], sortIndex: i };
    group.add(barMesh);
    bars.push(barMesh);

    // 4. Premium Glowing Acrylic Capsule Nameplate Badges with Fixed Aspect Ratio (Prevents Overlap)
    const labelText = i === 4 ? "TOP 1" : `#${5 - i}`;
    const tex = cd(createCanvasTexture(THREE, labelText, {
      color: '#ffffff',
      glowColor: labelGlows[i],
      fontSize: 52, // Perfectly scaled text footprint
      width: 220,   // Fixed width
      height: 110,  // Fixed height (aspect ratio is exactly 2.0)
      padX: 10,
      padY: 10,
      drawBgTag: true,
      bgTagColor: 'rgba(11, 17, 33, 0.95)',
      borderColor: labelGlows[i] + 'dd', // High-intensity color-matched glow border
      borderWidth: 4.0
    }));
    const spriteMat = cd(new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false, depthWrite: false }));
    const sprite = new THREE.Sprite(spriteMat);
    const h = 0.25; // Compact 3D height scale (yields 0.25 * 2.0 = 0.50 width, leaving a guaranteed 0.10 unit gap between badges!)
    sprite.scale.set(h * tex.aspect, h, 1);
    sprite.position.set(colX, -0.66, 0.15);
    sprite.renderOrder = 3;
    group.add(sprite);
  }

  // ── Royal Imperial 3D Gold Crown ───────────────────────────────────
  const crownGroup = new THREE.Group();
  crownGroup.name = 'crownGroup';

  const goldMat = cd(new THREE.MeshPhysicalMaterial({
    color: 0xfbbf24,
    emissive: 0xd97706,
    emissiveIntensity: 0.35,
    metalness: 0.95,
    roughness: 0.1,
    clearcoat: 0.8,
    clearcoatRoughness: 0.1,
    envMapIntensity: 1.5
  }));

  const darkGoldMat = cd(new THREE.MeshPhysicalMaterial({
    color: 0xd97706,
    metalness: 0.9,
    roughness: 0.2
  }));

  const rubyMat = cd(new THREE.MeshPhysicalMaterial({
    color: 0xef4444,
    emissive: 0xd97706,
    emissiveIntensity: 0.6,
    metalness: 0.2,
    roughness: 0.05,
    transmission: 0.85,
    thickness: 0.3,
    ior: 1.77
  }));

  const diamondMat = cd(new THREE.MeshPhysicalMaterial({
    color: 0x38bdf8,
    emissive: 0x0284c7,
    emissiveIntensity: 0.5,
    metalness: 0.1,
    roughness: 0.02,
    transmission: 0.9,
    thickness: 0.3,
    ior: 2.4
  }));

  // 1. Royal Crown Base Ring & Torus Bezel Rim
  const crownBase = new THREE.Mesh(cd(new THREE.CylinderGeometry(0.32, 0.30, 0.12, 32, 1, true)), goldMat);
  crownGroup.add(crownBase);

  const baseRimTop = new THREE.Mesh(cd(new THREE.TorusGeometry(0.32, 0.025, 16, 48)), goldMat);
  baseRimTop.rotation.x = Math.PI / 2;
  baseRimTop.position.y = 0.06;
  const baseRimBot = new THREE.Mesh(cd(new THREE.TorusGeometry(0.30, 0.025, 16, 48)), darkGoldMat);
  baseRimBot.rotation.x = Math.PI / 2;
  baseRimBot.position.y = -0.06;
  crownGroup.add(baseRimTop, baseRimBot);

  // 2. Crimson Velvet Inner Cushion Cap
  const velvetMat = cd(new THREE.MeshPhysicalMaterial({ color: 0x881337, roughness: 0.8, metalness: 0.1 }));
  const velvetCap = new THREE.Mesh(cd(new THREE.SphereGeometry(0.29, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.45)), velvetMat);
  velvetCap.position.y = -0.04;
  crownGroup.add(velvetCap);

  // 3. 8 Arched Imperial Peaks with Set Rubies & Diamonds
  const peakCount = 8;
  for (let c = 0; c < peakCount; c++) {
    const angle = (c / peakCount) * Math.PI * 2;
    const isMajor = c % 2 === 0;
    const peakH = isMajor ? 0.32 : 0.22;
    const peakR = isMajor ? 0.065 : 0.045;

    const spike = new THREE.Mesh(cd(new THREE.ConeGeometry(peakR, peakH, 16)), goldMat);
    const radPos = 0.30;
    spike.position.set(Math.cos(angle) * radPos, 0.06 + peakH / 2, Math.sin(angle) * radPos);
    crownGroup.add(spike);

    // Gem on tip of peak
    const gemMat = isMajor ? rubyMat : diamondMat;
    const gem = new THREE.Mesh(cd(new THREE.SphereGeometry(isMajor ? 0.045 : 0.035, 12, 12)), gemMat);
    gem.position.set(Math.cos(angle) * radPos, 0.06 + peakH + 0.03, Math.sin(angle) * radPos);
    crownGroup.add(gem);

    // Jewel studs around base ring
    const stud = new THREE.Mesh(cd(new THREE.SphereGeometry(0.025, 8, 8)), gemMat);
    stud.position.set(Math.cos(angle) * 0.32, 0, Math.sin(angle) * 0.32);
    crownGroup.add(stud);
  }

  // 4. Center Gold Cross / Star Orb Apex
  const apexOrb = new THREE.Mesh(cd(new THREE.SphereGeometry(0.06, 16, 16)), goldMat);
  apexOrb.position.y = 0.44;
  const apexCrossVert = new THREE.Mesh(cd(new THREE.BoxGeometry(0.025, 0.12, 0.025)), goldMat);
  apexCrossVert.position.y = 0.52;
  const apexCrossHoriz = new THREE.Mesh(cd(new THREE.BoxGeometry(0.09, 0.025, 0.025)), goldMat);
  apexCrossHoriz.position.y = 0.53;
  crownGroup.add(apexOrb, apexCrossVert, apexCrossHoriz);

  // Position crown neatly at the TOP of the TOP 1 bar (x = 1.20, y = 2.3)
  crownGroup.position.set(1.20, 2.3, 0);
  crownGroup.scale.setScalar(0.01);
  group.add(crownGroup);

  group.userData = { bars, crownGroup };
  return group;
}

// Act 4: "Logical Execution Order" — Holographic 4-Node Pipeline + Sprites & Mechanical 3D Gears
function buildPipeline(THREE) {
  const group = new THREE.Group();
  const nodeLabels = ['FROM', 'WHERE', 'GROUP BY', 'SELECT'];
  const nodePositions = [-2.1, -0.7, 0.7, 2.1]; // Widened for zero text badge overlap
  const nodes = [];

  // Holographic Metallic Base Pipeline Connector Rail
  const pipelineRail = new THREE.Mesh(
    cd(new THREE.BoxGeometry(4.6, 0.04, 0.12)),
    cd(new THREE.MeshPhysicalMaterial({ color: 0x38bdf8, emissive: 0x0284c7, emissiveIntensity: 0.5, metalness: 0.8, roughness: 0.2 }))
  );
  pipelineRail.position.set(0, 0.28, 0);
  group.add(pipelineRail);

  for (let i = 0; i < 4; i++) {
    const node = new THREE.Mesh(
      cd(new THREE.SphereGeometry(0.35, 32, 32)),
      cd(new THREE.MeshPhysicalMaterial({
        color: 0xfbbf24,
        emissive: 0xd97706,
        emissiveIntensity: 0.45,
        metalness: 0.85,
        roughness: 0.1,
        clearcoat: 0.6,
        envMapIntensity: 1.4
      }))
    );
    node.position.set(nodePositions[i], 0.7, 0);
    group.add(node);
    nodes.push(node);

    // Dynamic uncropped text sprite badge with generous padding to prevent text overlap
    const tex = cd(createCanvasTexture(THREE, nodeLabels[i], { color: '#ffffff', glowColor: '#fbbf24', fontSize: 52, padX: 48, padY: 32 }));
    const spriteMat = cd(new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false, depthWrite: false }));
    const sprite = new THREE.Sprite(spriteMat);
    const h = 0.46;
    sprite.scale.set(h * tex.aspect, h, 1);
    sprite.position.set(nodePositions[i], 1.35, 0);
    sprite.renderOrder = 3;
    group.add(sprite);

    if (i < 3) {
      const beamGeom = cd(new THREE.CylinderGeometry(0.06, 0.06, 1.4, 16));
      const beamMat = cd(new THREE.MeshPhysicalMaterial({
        color: 0x38bdf8,
        emissive: 0x0284c7,
        emissiveIntensity: 0.7,
        metalness: 0.3,
        roughness: 0.1,
        transmission: 0.8,
        thickness: 0.2
      }));
      const beam = new THREE.Mesh(beamGeom, beamMat);
      beam.rotation.z = Math.PI / 2;
      beam.position.set((nodePositions[i] + nodePositions[i + 1]) / 2, 0.7, 0);
      beam.name = `plasmaBeam${i}`;
      group.add(beam);
    }
  }

  // 3D Interlocking Mechanical Gear Cluster (Front-facing to camera)
  const gear1 = createGearMesh(THREE, 0.65, 0x38bdf8, 14); // Silver-Cyan Chrome Gear
  gear1.name = 'gear1';
  gear1.position.set(-0.75, -0.65, 0);

  const gear2 = createGearMesh(THREE, 0.52, 0xfbbf24, 12); // Gold Gear (Interlocking)
  gear2.name = 'gear2';
  gear2.position.set(0.35, -0.65, 0);

  const gear3 = createGearMesh(THREE, 0.38, 0xf472b6, 10); // Magenta-Ruby Gear (3rd Interlocking)
  gear3.name = 'gear3';
  gear3.position.set(1.18, -0.65, 0);

  group.add(gear1, gear2, gear3);

  group.userData = { nodes };
  return group;
}

// Act 5: "25 Questions" — 3D Holographic Question Shield + Glass Orbs & Header Badge
function buildQuestionCluster(THREE) {
  const group = new THREE.Group();

  // 1. Outer Magenta/Violet Metallic Torus Bezel Ring
  const ringMat = cd(new THREE.MeshPhysicalMaterial({
    color: 0xec4899,
    emissive: 0xdb2777,
    emissiveIntensity: 0.65,
    metalness: 0.92,
    roughness: 0.12,
    clearcoat: 0.8,
    envMapIntensity: 1.5
  }));
  const outerRing = new THREE.Mesh(cd(new THREE.TorusGeometry(1.45, 0.08, 24, 96)), ringMat);
  const innerRing = new THREE.Mesh(cd(new THREE.TorusGeometry(1.15, 0.04, 16, 80)), ringMat);
  group.add(outerRing, innerRing);

  // 2. Frosted Violet Glass Shield Disc
  const discMat = cd(new THREE.MeshPhysicalMaterial({
    color: 0x5b21b6,
    emissive: 0x4c1d95,
    emissiveIntensity: 0.5,
    transparent: true,
    opacity: 0.75,
    roughness: 0.25,
    metalness: 0.35,
    transmission: 0.6,
    thickness: 0.3
  }));
  const disc = new THREE.Mesh(cd(new THREE.CircleGeometry(1.1, 48)), discMat);
  disc.position.z = -0.06;
  group.add(disc);

  // 3. Central 3D Glowing "25" Hero Badge
  const numTex = cd(createCanvasTexture(THREE, "25", { color: '#ffffff', glowColor: '#ec4899', fontSize: 130, padX: 40, padY: 40 }));
  const numMat = cd(new THREE.SpriteMaterial({ map: numTex, transparent: true, depthTest: false, depthWrite: false }));
  const numSprite = new THREE.Sprite(numMat);
  const hNum = 1.25;
  numSprite.scale.set(hNum * numTex.aspect, hNum, 1);
  numSprite.position.set(0, 0, 0.1);
  numSprite.renderOrder = 3;
  numSprite.userData = { billboard: true };
  group.add(numSprite);

  // 4. Orbiting Glass Orbs with Embedded Neon Question Marks
  const orbGroup = new THREE.Group();
  orbGroup.name = 'questionOrbs';

  const orbRadius = 1.6;
  const qTex = cd(createCanvasTexture(THREE, "?", { color: '#ffffff', glowColor: '#f472b6', fontSize: 72, padX: 24, padY: 24 }));

  const glassOrbMat = cd(new THREE.MeshPhysicalMaterial({
    color: 0xf472b6,
    emissive: 0xdb2777,
    emissiveIntensity: 0.5,
    metalness: 0.2,
    roughness: 0.1,
    transmission: 0.85,
    thickness: 0.4,
    clearcoat: 0.9,
    envMapIntensity: 1.4
  }));

  for (let i = 0; i < 10; i++) {
    const angle = (i / 10) * Math.PI * 2;
    const yOffset = Math.sin(angle * 3) * 0.45;
    const orbX = Math.cos(angle) * orbRadius;
    const orbZ = Math.sin(angle) * orbRadius;

    // Glowing Glass Sphere
    const orb = new THREE.Mesh(cd(new THREE.SphereGeometry(0.20, 20, 20)), glassOrbMat);
    orb.position.set(orbX, yOffset, orbZ);
    orbGroup.add(orb);

    // Embedded Camera-Facing Question Mark Sprite Inside Sphere
    const qSpriteMat = cd(new THREE.SpriteMaterial({ map: qTex, transparent: true, depthTest: false, depthWrite: false }));
    const qSprite = new THREE.Sprite(qSpriteMat);
    const hQ = 0.32;
    qSprite.scale.set(hQ * qTex.aspect, hQ, 1);
    qSprite.position.set(orbX, yOffset, orbZ + 0.05);
    qSprite.renderOrder = 3;
    orbGroup.add(qSprite);
  }
  group.add(orbGroup);

  // 5. High-Contrast Billboard Header Badge "❓ 25 QUESTIONS" at Top (y = 1.75)
  const headerTex = cd(createCanvasTexture(THREE, "❓ 25 QUESTIONS", { color: '#ffffff', glowColor: '#ec4899', fontSize: 60, padX: 48, padY: 32 }));
  const headerSpriteMat = cd(new THREE.SpriteMaterial({ map: headerTex, transparent: true, depthTest: false, depthWrite: false }));
  const headerSprite = new THREE.Sprite(headerSpriteMat);
  const hText = 0.65;
  headerSprite.scale.set(hText * headerTex.aspect, hText, 1);
  headerSprite.position.set(0, 1.75, 0.25);
  headerSprite.renderOrder = 4;
  group.add(headerSprite);

  // 6. Celebration Magenta Stardust Particles
  const pTex = cd(createGlowDotTexture(THREE, '#f472b6'));
  const pMat = cd(new THREE.PointsMaterial({
    size: 0.14,
    map: pTex,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  }));
  const pGeom = new THREE.BufferGeometry();
  const positions = [];
  for (let i = 0; i < 32; i++) {
    const a = (i / 32) * Math.PI * 2;
    const r = 1.75 + (i % 3) * 0.15;
    positions.push(Math.cos(a) * r, Math.sin(a * 2) * 0.4, Math.sin(a) * r);
  }
  pGeom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  const points = new THREE.Points(pGeom, pMat);
  points.name = 'stardust';
  group.add(points);

  return group;
}

// Act 6: "Certification" — Sculpted 3D Gold Championship Chalice Trophy + Floating Star Apex
function buildTrophy(THREE) {
  const group = new THREE.Group();

  // 1. Polished Italian Dark Marble Pedestal with Gold Bevel Rim
  const marbleMap = createMarbleTexture(THREE);
  const marbleMat = cd(new THREE.MeshPhysicalMaterial({
    map: marbleMap,
    color: 0x1e293b,
    roughness: 0.1,
    metalness: 0.3,
    clearcoat: 0.8,
    envMapIntensity: 1.2
  }));

  const baseBottom = new THREE.Mesh(cd(new THREE.CylinderGeometry(0.95, 1.10, 0.35, 36)), marbleMat);
  baseBottom.position.y = -1.15;

  const baseTop = new THREE.Mesh(cd(new THREE.CylinderGeometry(0.78, 0.88, 0.35, 36)), marbleMat);
  baseTop.position.y = -0.80;

  group.add(baseBottom, baseTop);

  // 2. 24K Polished Gold Physical Material
  const goldMat = cd(new THREE.MeshPhysicalMaterial({
    color: 0xfbbf24,
    emissive: 0xd97706,
    emissiveIntensity: 0.45,
    metalness: 0.96,
    roughness: 0.08,
    clearcoat: 0.9,
    clearcoatRoughness: 0.05,
    envMapIntensity: 1.6
  }));

  const darkGoldMat = cd(new THREE.MeshPhysicalMaterial({
    color: 0xd97706,
    metalness: 0.9,
    roughness: 0.2
  }));

  // Gold Base Ring Trim
  const baseTrim = new THREE.Mesh(cd(new THREE.TorusGeometry(0.72, 0.04, 16, 48)), goldMat);
  baseTrim.rotation.x = Math.PI / 2;
  baseTrim.position.y = -0.61;
  group.add(baseTrim);

  // Fluted Hourglass Stem & Knurled Rings
  const stemPillar = new THREE.Mesh(cd(new THREE.CylinderGeometry(0.22, 0.32, 0.45, 24)), goldMat);
  stemPillar.position.y = -0.38;

  const stemKnurl = new THREE.Mesh(cd(new THREE.TorusGeometry(0.26, 0.035, 16, 36)), darkGoldMat);
  stemKnurl.rotation.x = Math.PI / 2;
  stemKnurl.position.y = -0.38;

  const stemTopCap = new THREE.Mesh(cd(new THREE.CylinderGeometry(0.40, 0.24, 0.12, 28)), goldMat);
  stemTopCap.position.y = -0.10;
  group.add(stemPillar, stemKnurl, stemTopCap);

  // 3. Photorealistic Sculpted Chalice Cup (Lathe Profile Geometry)
  const cupPoints = [];
  cupPoints.push(new THREE.Vector2(0.36, -0.04));
  cupPoints.push(new THREE.Vector2(0.48, 0.12));
  cupPoints.push(new THREE.Vector2(0.65, 0.45));
  cupPoints.push(new THREE.Vector2(0.78, 0.82));
  cupPoints.push(new THREE.Vector2(0.82, 0.86)); // Outer flared rim lip
  cupPoints.push(new THREE.Vector2(0.76, 0.84)); // Inner lip
  cupPoints.push(new THREE.Vector2(0.60, 0.50)); // Inner hollow cup
  cupPoints.push(new THREE.Vector2(0.40, 0.20));
  cupPoints.push(new THREE.Vector2(0.0, 0.16));  // Inner bowl center bottom

  const chaliceGeom = cd(new THREE.LatheGeometry(cupPoints, 48));
  const chaliceMesh = new THREE.Mesh(chaliceGeom, goldMat);
  chaliceMesh.position.y = -0.04;
  group.add(chaliceMesh);

  // Embossed Front Gold Star Medallion on Cup Surface
  const cupStar = create3DStar(THREE, 0.18, 0.04, 0xfbbf24);
  cupStar.position.set(0, 0.42, 0.68);
  group.add(cupStar);

  // 4. Seamless Royal Double-Curved Handles
  for (let s = -1; s <= 1; s += 2) {
    const handleGroup = new THREE.Group();
    const handleArc = cd(new THREE.TorusGeometry(0.44, 0.065, 16, 48, Math.PI * 0.95));
    const handleMesh = new THREE.Mesh(handleArc, goldMat);
    handleMesh.rotation.z = s * (Math.PI * 0.52);
    handleMesh.position.set(s * 0.60, 0.42, 0);
    handleGroup.add(handleMesh);
    group.add(handleGroup);
  }

  // 5. Radiant Floating 3D Gold Star Apex (Elevated above chalice mouth with glowing aura disc)
  const starGroup = new THREE.Group();
  starGroup.name = 'starMedallion';

  const star = create3DStar(THREE, 0.52, 0.15, 0xfbbf24);
  star.position.set(0, 0, 0);
  starGroup.add(star);

  // Glowing backdrop disc behind floating star for 100% silhouette clarity
  const starGlowDisc = new THREE.Mesh(
    cd(new THREE.CircleGeometry(0.65, 32)),
    cd(new THREE.MeshBasicMaterial({
      color: 0xfbbf24,
      transparent: true,
      opacity: 0.4,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    }))
  );
  starGlowDisc.position.set(0, 0, -0.08);
  starGroup.add(starGlowDisc);

  starGroup.position.set(0, 1.25, 0);
  group.add(starGroup);

  // 6. Glowing Uncropped Header Badge "★ 25 MARKS • CERTIFIED"
  const tex = cd(createCanvasTexture(THREE, "★ 25 MARKS • CERTIFIED", { color: '#ffffff', glowColor: '#fbbf24', fontSize: 56, padX: 48, padY: 32 }));
  const spriteMat = cd(new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false, depthWrite: false }));
  const markSprite = new THREE.Sprite(spriteMat);
  const h = 0.52;
  markSprite.scale.set(h * tex.aspect, h, 1);
  markSprite.position.set(0, 2.15, 0.1);
  markSprite.renderOrder = 3;
  group.add(markSprite);

  // 7. Victory Golden Stardust Halo
  const particleTex = cd(createGlowDotTexture(THREE, '#fbbf24'));
  const haloMat = cd(new THREE.PointsMaterial({
    size: 0.12,
    map: particleTex,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  }));

  const haloGeom = new THREE.BufferGeometry();
  const positions = [];
  const r = getSafeOrbitalRadius(completionCamera, 1.35, 0.15);

  for (let i = 0; i < 32; i++) {
    const a = (i / 32) * Math.PI * 2;
    positions.push(Math.cos(a) * r, 0.8 + Math.sin(i) * 0.15, Math.sin(a) * r);
  }
  haloGeom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  const haloPoints = new THREE.Points(haloGeom, haloMat);
  haloPoints.name = 'stardust';
  group.add(haloPoints);

  return group;
}

// Act 7: "Next Level" — Sci-Fi Rocket + Launch Pad Base Rings & Zig-Zag Ascent
function buildRocket(THREE) {
  const group = new THREE.Group();

  // 1. Stationary Launch Pad Base Rings & Ground Warp Portals (Stay on ground at y = -1.6)
  const portalMat = cd(new THREE.MeshBasicMaterial({ color: 0x06b6d4, wireframe: true, transparent: true, opacity: 0.55 }));
  const portal = new THREE.Mesh(cd(new THREE.TorusGeometry(1.5, 0.08, 12, 48)), portalMat);
  portal.rotation.x = Math.PI / 2;
  portal.position.y = -1.6;
  portal.name = 'warpPortal1';
  group.add(portal);

  const portalMat2 = cd(new THREE.MeshBasicMaterial({ color: 0x0891b2, wireframe: true, transparent: true, opacity: 0.3 }));
  const portal2 = new THREE.Mesh(cd(new THREE.TorusGeometry(1.85, 0.04, 8, 36)), portalMat2);
  portal2.rotation.x = Math.PI / 2;
  portal2.position.y = -1.75;
  portal2.name = 'warpPortal2';
  group.add(portal2);

  // Ground Launch Ring Glow Pad
  const launchPadDisc = new THREE.Mesh(
    cd(new THREE.CircleGeometry(1.4, 32)),
    cd(new THREE.MeshBasicMaterial({ color: 0x0284c7, transparent: true, opacity: 0.35, side: THREE.DoubleSide }))
  );
  launchPadDisc.rotation.x = Math.PI / 2;
  launchPadDisc.position.y = -1.62;
  group.add(launchPadDisc);

  // Ground Liftoff Shockwave Smoke Expansion Ring
  const smokeRingMat = cd(new THREE.MeshBasicMaterial({ color: 0xf97316, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, side: THREE.DoubleSide }));
  const smokeRing = new THREE.Mesh(cd(new THREE.RingGeometry(0.4, 0.95, 36)), smokeRingMat);
  smokeRing.rotation.x = Math.PI / 2;
  smokeRing.position.y = -1.61;
  smokeRing.name = 'rocketLaunchSmokeRing';
  group.add(smokeRing);

  // 2. Launchable Rocket Body Group (Moves & Zig-Zags Upward)
  const rocketBodyGroup = new THREE.Group();
  rocketBodyGroup.name = 'rocketBodyGroup';

  const bodyMat = cd(new THREE.MeshPhysicalMaterial({ color: 0xf8fafc, roughness: 0.15, metalness: 0.85, envMapIntensity: 1.3 }));
  const noseMat = cd(new THREE.MeshPhysicalMaterial({ color: 0xf97316, roughness: 0.2, metalness: 0.7, envMapIntensity: 1.2 }));
  const finMat = cd(new THREE.MeshPhysicalMaterial({ color: 0x38bdf8, roughness: 0.2, metalness: 0.8, envMapIntensity: 1.1 }));
  const visorMat = cd(new THREE.MeshPhysicalMaterial({
    color: 0x06b6d4,
    emissive: 0x0284c7,
    emissiveIntensity: 0.8,
    metalness: 0.1,
    roughness: 0.05,
    transmission: 0.9,
    thickness: 0.2,
    ior: 1.5
  }));

  const body = new THREE.Mesh(cd(new THREE.CylinderGeometry(0.4, 0.45, 1.3, 32)), bodyMat);
  body.position.y = -0.25;
  rocketBodyGroup.add(body);

  const nose = new THREE.Mesh(cd(new THREE.ConeGeometry(0.4, 0.85, 32)), noseMat);
  nose.position.y = 0.8;
  rocketBodyGroup.add(nose);

  const visor = new THREE.Mesh(cd(new THREE.SphereGeometry(0.2, 24, 16)), visorMat);
  visor.position.set(0, 0.2, 0.35);
  rocketBodyGroup.add(visor);

  for (let i = 0; i < 3; i++) {
    const a = (i / 3) * Math.PI * 2;
    const fin = new THREE.Mesh(cd(new THREE.BoxGeometry(0.08, 0.65, 0.45)), finMat);
    fin.position.set(Math.sin(a) * 0.45, -0.55, Math.cos(a) * 0.45);
    fin.rotation.y = a;
    rocketBodyGroup.add(fin);
  }

  const fMatInner = cd(new THREE.MeshBasicMaterial({ color: 0xfef08a, transparent: true, opacity: 0.95 }));
  const fMatOuter = cd(new THREE.MeshBasicMaterial({ color: 0xef4444, transparent: true, opacity: 0.75 }));
  const flameIn = new THREE.Mesh(cd(new THREE.ConeGeometry(0.18, 0.7, 16)), fMatInner);
  const flameOut = new THREE.Mesh(cd(new THREE.ConeGeometry(0.32, 1.1, 16)), fMatOuter);
  flameIn.rotation.x = Math.PI; flameIn.position.y = -1.1;
  flameOut.rotation.x = Math.PI; flameOut.position.y = -1.25;
  rocketBodyGroup.add(flameIn, flameOut);

  const smokeMat = cd(new THREE.MeshBasicMaterial({ color: 0xffa500, transparent: true, opacity: 0.25, blending: THREE.AdditiveBlending }));
  const flameSmoke = new THREE.Mesh(cd(new THREE.ConeGeometry(0.42, 1.4, 16)), smokeMat);
  flameSmoke.rotation.x = Math.PI;
  flameSmoke.position.y = -1.35;
  rocketBodyGroup.add(flameSmoke);

  // Floating Stationary Header Badge "🚀 READY NEXT LEVEL" (Stays at y = 1.75)
  const tex = cd(createCanvasTexture(THREE, "NEXT LEVEL", { color: '#ffffff', glowColor: '#f97316', fontSize: 56, padX: 48, padY: 32 }));
  const spriteMat = cd(new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false, depthWrite: false }));
  const markSprite = new THREE.Sprite(spriteMat);
  const h = 0.52;
  markSprite.scale.set(h * tex.aspect, h, 1);
  markSprite.position.set(0, 1.75, 0.1);
  markSprite.renderOrder = 3;
  group.add(markSprite);

  group.add(rocketBodyGroup);
  return group;
}

const COMPLETION_BUILDERS = {
  buildCheckmark, buildGreatWork, buildGem, buildSortedBars, buildPipeline,
  buildQuestionCluster, buildTrophy, buildRocket
};

const NARRATION_CARDS = [
  { pill: 'ACT 1 • LESSON COMPLETE', title: 'Day 2 SQL Mastery Unlocked', sub: 'Officially finished Day 2 lessons', accent: '#00ffcc', bgPill: 'rgba(0, 255, 204, 0.2)' },
  { pill: 'ACT 2 • PRAISE & PROGRESS', title: 'Great Work! Milestone Achieved', sub: 'Outstanding effort mastering core SQL', accent: '#10b981', bgPill: 'rgba(16, 185, 129, 0.2)' },
  { pill: 'ACT 3 • DATA REFINEMENT', title: 'Filtering Unique Records', sub: 'Eliminating duplicate rows with DISTINCT', accent: '#a78bfa', bgPill: 'rgba(167, 139, 250, 0.2)' },
  { pill: 'ACT 4 • RESULT SET STRUCTURE', title: 'Sorting & Quantity Control', sub: 'ORDER BY ASC/DESC & LIMIT Top Rows', accent: '#38bdf8', bgPill: 'rgba(56, 189, 248, 0.2)' },
  { pill: 'ACT 5 • ENGINE INTERNALS', title: 'Logical Execution Order', sub: 'FROM ➔ WHERE ➔ GROUP BY ➔ SELECT', accent: '#fbbf24', bgPill: 'rgba(251, 191, 36, 0.2)' },
  { pill: 'ACT 6 • ASSESSMENT READY', title: '25 Curated Interview Questions', sub: 'Real-world technical SQL evaluation', accent: '#f472b6', bgPill: 'rgba(244, 114, 182, 0.2)' },
  { pill: 'ACT 7 • CERTIFICATION MARKS', title: '25 Marks Earned Toward Badge', sub: 'Verified proficiency score tracking', accent: '#fbbf24', bgPill: 'rgba(251, 191, 36, 0.2)' },
  { pill: 'ACT 8 • NEXT LEVEL UNLOCKED', title: 'Ready for Advanced Filtering', sub: 'Proceeding to Day 3 Complex Queries', accent: '#f97316', bgPill: 'rgba(249, 115, 22, 0.2)' }
];

// ── DOM: Inject 3D Animation Overlay Bounded Below Header (Covers Bottom Completely) ──
function createCompletionOverlay() {
  const container = document.body;
  const isMobile = window.innerWidth < 768;

  const headerEl = document.querySelector('.header');
  const headerHeight = headerEl ? headerEl.getBoundingClientRect().height : 60;

  const dividerEl = document.getElementById('divider');
  if (dividerEl) dividerEl.style.display = 'none';

  const slideHeaderEl = document.getElementById('slideHeader');
  if (slideHeaderEl) slideHeaderEl.style.display = 'none';

  completionOverlayDiv = document.createElement('div');
  completionOverlayDiv.id = 'completionOverlayDiv';
  Object.assign(completionOverlayDiv.style, {
    position: 'fixed',
    top: `${headerHeight}px`,
    left: '0',
    width: '100vw',
    height: `calc(100dvh - ${headerHeight}px)`,
    background: 'radial-gradient(circle at 50% 45%, rgba(15, 23, 42, 0.68) 20%, rgba(8, 12, 22, 0.92) 100%)',
    backdropFilter: 'blur(16px)', webkitBackdropFilter: 'blur(16px)',
    pointerEvents: 'none', opacity: '1', transition: 'opacity 0.5s ease',
    zIndex: '9999'
  });

  completionCanvas = document.createElement('canvas');
  completionCanvas.id = 'completionCanvas';
  Object.assign(completionCanvas.style, {
    position: 'absolute', top: '0', left: '0',
    width: '100%', height: '100%',
    pointerEvents: 'none'
  });
  completionOverlayDiv.appendChild(completionCanvas);

  // Modern Glassmorphic Narration Card (Dynamic & Responsive Legend Container)
  completionCaption = document.createElement('div');
  completionCaption.id = 'completionCaption';
  Object.assign(completionCaption.style, {
    position: 'absolute',
    bottom: isMobile ? 'calc(16px + env(safe-area-inset-bottom, 0px))' : '32px',
    left: '50%',
    transform: 'translateX(-50%) translateY(12px)',
    width: '450px',
    maxWidth: '92vw',
    background: 'rgba(15, 23, 42, 0.82)',
    backdropFilter: 'blur(20px)',
    webkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '16px',
    padding: isMobile ? '12px 16px' : '16px 24px',
    boxShadow: '0 20px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)',
    zIndex: '100000',
    pointerEvents: 'auto',
    opacity: '0',
    transition: 'opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: isMobile ? '6px' : '8px',
    textAlign: 'center'
  });

  // Card Main Title
  const titleEl = document.createElement('div');
  titleEl.id = 'cardTitle';
  Object.assign(titleEl.style, {
    fontSize: isMobile ? '0.96rem' : '1.18rem',
    fontWeight: '800',
    color: '#ffffff',
    lineHeight: '1.25',
    transition: 'all 0.3s ease'
  });
  completionCaption.appendChild(titleEl);

  // Card Description Subtitle
  const subEl = document.createElement('div');
  subEl.id = 'cardSub';
  Object.assign(subEl.style, {
    fontSize: isMobile ? '0.76rem' : '0.86rem',
    fontWeight: '500',
    color: '#94a3b8',
    lineHeight: '1.4',
    transition: 'all 0.3s ease'
  });
  completionCaption.appendChild(subEl);

  completionOverlayDiv.appendChild(completionCaption);
  container.appendChild(completionOverlayDiv);
}

function updateCompletionLegend(momentIdx) {
  const title = document.getElementById('cardTitle');
  const sub = document.getElementById('cardSub');
  const cData = NARRATION_CARDS[momentIdx];

  if (title && sub && cData) {
    title.textContent = cData.title;
    sub.textContent = cData.sub;
  }
}

// ── Take Test Blink Helpers ───────────────────────────────────────────────────
function activateTakeTestBlink() {
  const dp = window.ProgressManager?.getDayProgress(currentDay);
  if (dp?.testAttempt?.submitted) return;
  const btn = document.getElementById('takeTestBtn');
  if (btn) btn.classList.add('take-test--urgent');
  try { sessionStorage.setItem(`${currentDay}_testUrgent`, '1'); } catch (e) { }
}

function deactivateTakeTestBlink() {
  const btn = document.getElementById('takeTestBtn');
  if (btn) btn.classList.remove('take-test--urgent');
  try { sessionStorage.removeItem(`${currentDay}_testUrgent`); } catch (e) { }
}

function restoreTakeTestBlinkIfNeeded() {
  try {
    if (sessionStorage.getItem(`${currentDay}_testUrgent`) === '1') {
      const dp = window.ProgressManager?.getDayProgress(currentDay);
      if (!dp?.testAttempt?.submitted) activateTakeTestBlink();
      else deactivateTakeTestBlink();
    }
  } catch (e) { }
}

// Procedural dynamic lighting environment map
function createProceduralEnvironment(THREE, renderer) {
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  const envScene = new THREE.Scene();

  const sphereGeom = new THREE.SphereGeometry(1.5, 16, 16);

  const light1 = new THREE.Mesh(sphereGeom, new THREE.MeshBasicMaterial({ color: 0x00ffcc }));
  light1.position.set(4, 5, 4);
  const light2 = new THREE.Mesh(sphereGeom, new THREE.MeshBasicMaterial({ color: 0xf472b6 }));
  light2.position.set(-4, 3, -4);
  const light3 = new THREE.Mesh(sphereGeom, new THREE.MeshBasicMaterial({ color: 0x38bdf8 }));
  light3.position.set(0, -5, 3);
  const light4 = new THREE.Mesh(sphereGeom, new THREE.MeshBasicMaterial({ color: 0xfbbf24 }));
  light4.position.set(2, -3, -2);

  envScene.add(light1, light2, light3, light4);

  const renderTarget = pmremGenerator.fromScene(envScene, 0.04);
  if (pmremGenerator && typeof pmremGenerator.dispose === 'function') {
    pmremGenerator.dispose();
  }
  return renderTarget.texture;
}

// ── Camera Rig v2 Specification: Hollywood Continuous Orbit Perspective ──
const CAMERA_SHOTS = {
  // Act 1: Checkmark Medallion — Hero reveal looking down at gold shield ring
  complete: { yawStart: 0.0, yawEnd: 8.0, pitchStart: 8.5, pitchEnd: 8.5, dollyStart: 7.2, dollyEnd: 7.0 },

  // Act 2: Clapping Emoji 👏 — High-angle celebration framing
  greatWork: { yawStart: 8.0, yawEnd: 18.0, pitchStart: 8.5, pitchEnd: 8.5, dollyStart: 7.0, dollyEnd: 7.0 },

  // Act 3: DISTINCT Diamond Gem 💎 — Facet reveal looking down at pavilion facets
  distinct: { yawStart: 18.0, yawEnd: 32.0, pitchStart: 8.5, pitchEnd: 8.5, dollyStart: 7.0, dollyEnd: 6.8 },

  // Act 4: ORDER BY & LIMIT 📊 — Generous 7.8 dolly framing providing full headroom for #1 bar & gold crown
  orderLimit: { yawStart: 32.0, yawEnd: 0.0, pitchStart: 11.0, pitchEnd: 8.0, dollyStart: 8.0, dollyEnd: 7.8 },

  // Act 5: Execution Pipeline ⚙️ — High-angle (+18° to +14°) sweeping 3D orbit showcasing mechanical gears
  logicOrder: { yawStart: 0.0, yawEnd: -16.0, pitchStart: 18.0, pitchEnd: 14.0, dollyStart: 7.4, dollyEnd: 7.0 },

  // Act 6: 25 Questions ❓ — Sizing-up-the-challenge 3D orbit
  questions: { yawStart: 20.0, yawEnd: 8.0, pitchStart: 8.5, pitchEnd: 9.0, dollyStart: 7.2, dollyEnd: 7.0 },

  // Act 7: 25 Marks Trophy 🏆 — Generous 7.6 dolly framing ensuring zero clipping of top certified badge & star apex
  cert: { yawStart: 8.0, yawEnd: -8.0, pitchStart: 9.0, pitchEnd: 9.5, dollyStart: 7.6, dollyEnd: 7.6 },

  // Act 8: Next Level Rocket 🚀 — Generous 8.0 dolly framing accommodating ground launch pad & vertical ascent
  nextLevel: { yawStart: -8.0, yawEnd: -24.0, pitchStart: 9.5, pitchEnd: -10.0, dollyStart: 7.6, dollyEnd: 8.2 }
};

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// ── Three.js Scene Setup (Centered Camera View, Responsive FOV & Rich Lighting) ──
function initCompletionScene() {
  const THREE = window.THREE;
  const w = window.innerWidth;
  const h = window.innerHeight;
  const isMobile = w < 768;

  completionRenderer = new THREE.WebGLRenderer({ canvas: completionCanvas, alpha: true, antialias: true });
  completionRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  completionRenderer.setSize(w, h, false);
  completionRenderer.setClearColor(0x000000, 0);

  if (THREE.ACESFilmicToneMapping) {
    completionRenderer.toneMapping = THREE.ACESFilmicToneMapping;
    completionRenderer.toneMappingExposure = 1.15;
  }
  if (THREE.SRGBColorSpace) {
    completionRenderer.outputColorSpace = THREE.SRGBColorSpace;
  } else if (THREE.sRGBEncoding) {
    completionRenderer.outputEncoding = THREE.sRGBEncoding;
  }

  completionRenderer.physicallyCorrectLights = true;
  completionRenderer.shadowMap.enabled = true;
  completionRenderer.shadowMap.type = THREE.PCFSoftShadowMap;

  completionScene = new THREE.Scene();

  // Environment map for photorealistic materials
  try {
    const envTexture = createProceduralEnvironment(THREE, completionRenderer);
    completionScene.environment = envTexture;
  } catch (err) {
    console.warn('Could not generate environment map:', err);
  }

  const fov = isMobile ? 55 : 50;
  completionCamera = new THREE.PerspectiveCamera(fov, w / h, 0.1, 100);
  completionCamera.position.set(0, 0, isMobile ? 7.6 : 6.8);

  // 15% Ambient + Environment Map
  const amb = new THREE.AmbientLight(0xffffff, 0.15);
  completionScene.add(amb);

  // Reusable 3-point studio lighting rig
  const keyLight = new THREE.SpotLight(0xffffff, 4.5);
  keyLight.name = 'keyLight';
  keyLight.position.set(5, 8, 5);
  keyLight.angle = 0.38;
  keyLight.penumbra = 0.5;
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.width = 1024;
  keyLight.shadow.mapSize.height = 1024;
  keyLight.shadow.bias = -0.001;
  completionScene.add(keyLight);

  const fillLight = new THREE.PointLight(0x38bdf8, 1.6, 18);
  fillLight.name = 'fillLight';
  fillLight.position.set(-5, 3, 4);
  completionScene.add(fillLight);

  const rimLight = new THREE.SpotLight(0xffffff, 4.5);
  rimLight.name = 'rimLight';
  rimLight.position.set(0, 4, -5);
  rimLight.angle = 0.6;
  rimLight.penumbra = 0.4;
  completionScene.add(rimLight);

  // Post-processing EffectComposer setup
  if (THREE.EffectComposer && !isMobile) {
    try {
      const size = completionRenderer.getDrawingBufferSize(new THREE.Vector2());
      const renderTarget = new THREE.WebGLMultisampleRenderTarget(size.width, size.height, {
        format: THREE.RGBAFormat,
        type: THREE.UnsignedByteType,
        encoding: THREE.sRGBEncoding
      });
      renderTarget.samples = 4; // Anti-aliasing pass built-in

      completionComposer = new THREE.EffectComposer(completionRenderer, renderTarget);

      const renderPass = new THREE.RenderPass(completionScene, completionCamera);
      completionComposer.addPass(renderPass);

      // UnrealBloomPass: strength 0.55, radius 0.4, threshold 0.82
      const bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(size.width, size.height), 0.55, 0.4, 0.82);
      completionComposer.addPass(bloomPass);

      if (THREE.VignetteShader) {
        const vignettePass = new THREE.ShaderPass(THREE.VignetteShader);
        vignettePass.uniforms["darkness"].value = 1.0;
        vignettePass.uniforms["offset"].value = 1.0;
        completionComposer.addPass(vignettePass);
      }
    } catch (e) {
      console.warn('Error setting up post-processing. Falling back to normal renderer.', e);
      completionComposer = null;
    }
  } else {
    completionComposer = null;
  }

  completionClock = new THREE.Clock();
}

// ── Helper: Explosive 3D Blast Appearance Effect (Dual Shockwaves + Radial Spark Burst) ──
function createAppearanceBlast(THREE, accentHex = 0x00ffcc, skipRings = false) {
  const blastGroup = new THREE.Group();
  blastGroup.name = 'appearanceBlast';

  const hexStr = accentHex ? '#' + accentHex.toString(16).padStart(6, '0') : '#00ffcc';

  let ring1 = null;
  let ringMat1 = null;
  if (!skipRings) {
    // 1. Primary Shockwave Ring
    const ringGeom1 = cd(new THREE.RingGeometry(0.08, 0.22, 64));
    ringMat1 = cd(new THREE.MeshBasicMaterial({
      color: accentHex,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 1.0,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    }));
    ring1 = new THREE.Mesh(ringGeom1, ringMat1);
    ring1.name = 'shockwave1';
    ring1.userData = { billboard: true };
    blastGroup.add(ring1);
  }

  let ring2 = null;
  let ringMat2 = null;
  if (!skipRings) {
    // 2. Secondary Gold Flare Shockwave Ring
    const ringGeom2 = cd(new THREE.RingGeometry(0.05, 0.16, 64));
    ringMat2 = cd(new THREE.MeshBasicMaterial({
      color: 0xfbbf24,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    }));
    ring2 = new THREE.Mesh(ringGeom2, ringMat2);
    ring2.name = 'shockwave2';
    ring2.userData = { billboard: true };
    blastGroup.add(ring2);
  }

  // 3. Central Energy Flash Glow Disc
  const flashGeom = cd(new THREE.CircleGeometry(0.4, 32));
  const flashMat = cd(new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 1.0,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  }));
  const flashDisc = new THREE.Mesh(flashGeom, flashMat);
  flashDisc.name = 'flashDisc';
  flashDisc.userData = { billboard: true };
  blastGroup.add(flashDisc);

  // 4. Radial Spark Particles Burst
  const particleCount = 75;
  const positions = new Float32Array(particleCount * 3);
  const velocities = [];

  const dotTex = cd(createGlowDotTexture(THREE, hexStr));
  const pMat = cd(new THREE.PointsMaterial({
    size: 0.24,
    map: dotTex,
    transparent: true,
    opacity: 1.0,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  }));

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = 0;
    positions[i * 3 + 1] = 0;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 0.3;

    const angle = Math.random() * Math.PI * 2;
    const speed = 3.0 + Math.random() * 5.0;
    velocities.push(new THREE.Vector3(
      Math.cos(angle) * speed,
      Math.sin(angle) * speed,
      (Math.random() - 0.5) * 2.5
    ));
  }

  const pGeom = new THREE.BufferGeometry();
  pGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const burstPoints = new THREE.Points(pGeom, pMat);
  burstPoints.name = 'blastSparks';
  blastGroup.add(burstPoints);

  blastGroup.userData = {
    startTime: performance.now(),
    duration: 850,
    velocities: velocities,
    pMat: pMat,
    ringMat1: ringMat1,
    ringMat2: ringMat2,
    flashMat: flashMat,
    ring1: ring1,
    ring2: ring2,
    flashDisc: flashDisc,
    burstPoints: burstPoints
  };

  return blastGroup;
}

// ── Spawn Active 3D Object Centered with Cross-Fade Outro ────────────────────
function spawnMomentObject(momentId, accent) {
  const THREE = window.THREE;
  const m = COMPLETION_MOMENTS.find(x => x.id === momentId);
  if (!m) return;

  // Seamless 3D Object Cross-Fade: Transfer outgoing object to completionOutroObj instead of instant deletion
  if (completionActiveObj) {
    if (completionOutroObj) {
      completionScene.remove(completionOutroObj);
    }
    completionOutroObj = completionActiveObj;
    completionOutroObj.__isOutro = true;
    completionOutroObj.__outroStart = performance.now();
    completionActiveObj = null;
  }

  const builderFn = COMPLETION_BUILDERS[m.builder];
  const obj = builderFn(THREE);
  obj.position.set(0, 0, 0); // Position dead-center
  obj.rotation.set(0, 0, 0); // Stationary orientation (Camera orbits around object)
  obj.scale.setScalar(0.01);
  obj.__fadeIn = true;
  obj.__fadeStart = performance.now();

  // Add explosive appearance blast effect (skip shockwave rings for Act 1 & 2 to avoid flat depth-clipping visual bugs)
  try {
    const skipRings = (momentId === 'complete' || momentId === 'greatWork');
    const blast = createAppearanceBlast(THREE, accent, skipRings);
    obj.add(blast);
  } catch (e) {
    console.warn('Could not spawn blast effect:', e);
  }

  // Trigger studio key light smooth specular flare
  if (completionScene) {
    const keyLight = completionScene.getObjectByName('keyLight');
    if (keyLight) keyLight.__flashStart = performance.now();
  }

  // Add soft contact shadow to ground floating object
  try {
    const shadow = createContactShadowPlane(THREE);
    obj.add(shadow);
  } catch (e) { }

  // Add backstage studio halo glow disc behind 3D object for 100% silhouette separation
  try {
    const auraCanvas = document.createElement('canvas');
    auraCanvas.width = 256; auraCanvas.height = 256;
    const auraCtx = auraCanvas.getContext('2d');
    const rad = auraCtx.createRadialGradient(128, 128, 0, 128, 128, 128);
    const hexColor = accent ? '#' + accent.toString(16).padStart(6, '0') : '#38bdf8';
    rad.addColorStop(0, hexColor);
    rad.addColorStop(0.4, hexColor + '66');
    rad.addColorStop(1, 'rgba(0,0,0,0)');
    auraCtx.fillStyle = rad;
    auraCtx.fillRect(0, 0, 256, 256);

    const auraTex = cd(new THREE.CanvasTexture(auraCanvas));
    const auraMat = cd(new THREE.MeshBasicMaterial({
      map: auraTex,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    }));
    const auraMesh = new THREE.Mesh(cd(new THREE.PlaneGeometry(5.2, 5.2)), auraMat);
    auraMesh.position.set(0, 0, -1.2);
    auraMesh.name = 'backstageAura';
    obj.add(auraMesh);
  } catch (e) { }

  completionScene.add(obj);
  completionActiveObj = obj;
}

// ── Main Animation Loop ───────────────────────────────────────────────────────
function startCompletionAnimation(audioObj, targetTime = 0) {
  if (!window.THREE || !completionRenderer) return;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Fade in full-screen overlay + controls
  if (completionOverlayDiv) completionOverlayDiv.style.opacity = '1';
  if (completionCaption) {
    completionCaption.style.opacity = '1';
    completionCaption.style.transform = 'translateX(-50%) translateY(0)';
  }

  const FADE_IN_MS = 400;

  function rafLoop() {
    completionRafId = requestAnimationFrame(rafLoop);
    const ct = (audioObj && !isNaN(audioObj.currentTime) && audioObj.currentTime > 0) ? audioObj.currentTime : targetTime;
    const t = ct;
    const dt = completionClock.getDelta();
    const now = performance.now();
    const isMobile = window.innerWidth < 768;
    const baseScale = (completionActiveMomentId === 'nextLevel') ? (isMobile ? 0.68 : 0.82) : (isMobile ? 0.78 : 0.96);

    // ── Camera Rig v2: Continuous Damped Orbit Motion ──
    const m = COMPLETION_MOMENTS.find(x => x.id === completionActiveMomentId);
    if (m && completionCamera) {
      const shot = CAMERA_SHOTS[m.id] || CAMERA_SHOTS.complete;
      const duration = m.endAt - m.startAt;
      const elapsed = Math.max(0, Math.min(t - m.startAt, duration));

      const moveDuration = Math.max(0.1, duration - 0.3);
      const pAct = Math.min(1.0, elapsed / moveDuration);
      const easedP = easeInOutCubic(pAct);

      let yawDeg = shot.yawStart + (shot.yawEnd - shot.yawStart) * easedP;
      let pitchDeg = shot.pitchStart + (shot.pitchEnd - shot.pitchStart) * easedP;
      let dollyVal = shot.dollyStart + (shot.dollyEnd - shot.dollyStart) * easedP;

      const yawRad = (yawDeg * Math.PI) / 180;
      const pitchRad = (pitchDeg * Math.PI) / 180;
      const dollyDist = dollyVal * (isMobile ? 1.08 : 1.0);

      const targetCamX = dollyDist * Math.cos(pitchRad) * Math.sin(yawRad);
      const targetCamY = dollyDist * Math.sin(pitchRad);
      const targetCamZ = dollyDist * Math.cos(pitchRad) * Math.cos(yawRad);

      const targetCamPos = new THREE.Vector3(targetCamX, targetCamY, targetCamZ);
      if (!completionCamera.__dampedPos) {
        completionCamera.__dampedPos = targetCamPos.clone();
      }
      const damp = 1 - Math.exp(-12 * dt);
      completionCamera.__dampedPos.lerp(targetCamPos, damp);
      completionCamera.position.copy(completionCamera.__dampedPos);
      completionCamera.lookAt(0, 0, 0);

      // Keep key light positioned relative to camera for consistent PBR highlights
      const keyLight = completionScene.getObjectByName('keyLight');
      if (keyLight) {
        keyLight.position.set(completionCamera.position.x + 3.5, completionCamera.position.y + 5.5, completionCamera.position.z + 3.5);
      }
    }

    // ── Check Moment Transition ───────────────────────────────────────────
    const mIdx = COMPLETION_MOMENTS.findIndex(moment => t >= moment.startAt && t < moment.endAt);
    const currentMoment = mIdx !== -1 ? COMPLETION_MOMENTS[mIdx] : COMPLETION_MOMENTS[0];
    const newId = currentMoment ? currentMoment.id : null;

    if (newId !== completionActiveMomentId) {
      completionActiveMomentId = newId;
      if (newId) {
        spawnMomentObject(newId, currentMoment.accent);
        updateCompletionLegend(mIdx);
      } else {
        if (completionActiveObj) {
          if (completionOutroObj) completionScene.remove(completionOutroObj);
          completionOutroObj = completionActiveObj;
          completionOutroObj.__outroStart = performance.now();
          completionActiveObj = null;
        }
      }
    }

    // ── Animate Outgoing Object Cross-Fade Dissolve ────────────────────────
    if (completionOutroObj) {
      const outroElapsed = now - (completionOutroObj.__outroStart || now);
      const outroP = Math.min(outroElapsed / 320, 1.0);
      const fadeScale = (1 - Math.pow(outroP, 1.8)) * baseScale;
      completionOutroObj.scale.setScalar(Math.max(0.0001, fadeScale));

      completionOutroObj.traverse(child => {
        if (child.material) {
          child.material.transparent = true;
          if (child.material.__origOpacity === undefined) {
            child.material.__origOpacity = child.material.opacity !== undefined ? child.material.opacity : 1.0;
          }
          child.material.opacity = child.material.__origOpacity * (1 - outroP);
        }
      });

      if (outroP >= 1.0) {
        completionScene.remove(completionOutroObj);
        completionOutroObj = null;
      }
    }

    // ── Animate Incoming 3D Object & Lock Content Screen Orientation ──────
    if (completionActiveObj) {
      const obj = completionActiveObj;
      const elapsed = now - (obj.__fadeStart || now);

      // Keep internal text, badges, and sprites fixed to screen orientation
      obj.traverse(child => {
        if (child.isSprite || (child.userData && child.userData.billboard)) {
          child.quaternion.copy(completionCamera.quaternion);
        }
      });

      // Key light smooth specular flare decay
      const keyLight = completionScene ? completionScene.getObjectByName('keyLight') : null;
      if (keyLight && keyLight.__flashStart) {
        const flashElapsed = (now - keyLight.__flashStart) / 400;
        if (flashElapsed <= 1.0) {
          keyLight.intensity = 4.5 + (1.0 - Math.pow(flashElapsed, 0.7)) * 2.3;
        } else {
          keyLight.intensity = 4.5;
          keyLight.__flashStart = null;
        }
      }

      // Animate appearance blast effect if active
      const blast = obj.getObjectByName('appearanceBlast');
      if (blast && blast.userData) {
        const bData = blast.userData;
        const bElapsed = Math.min((now - bData.startTime) / bData.duration, 1.0);
        if (bElapsed < 1.0) {
          if (bData.ring1 && bData.ringMat1) {
            const scale1 = 0.1 + Math.pow(bElapsed, 0.5) * 5.2;
            bData.ring1.scale.setScalar(scale1);
            bData.ringMat1.opacity = Math.max(0, 1.0 - Math.pow(bElapsed, 0.7));
          }

          if (bData.ring2 && bData.ringMat2) {
            const bElapsed2 = Math.max(0, (now - bData.startTime - 50) / (bData.duration - 50));
            const scale2 = 0.1 + Math.pow(bElapsed2, 0.45) * 4.2;
            bData.ring2.scale.setScalar(scale2);
            bData.ringMat2.opacity = Math.max(0, 0.95 - Math.pow(bElapsed2, 0.8));
          }

          const flashP = Math.min((now - bData.startTime) / 250, 1.0);
          bData.flashDisc.scale.setScalar(1.0 + flashP * 2.5);
          bData.flashMat.opacity = Math.max(0, 1.0 - flashP);

          const positions = bData.burstPoints.geometry.attributes.position.array;
          for (let i = 0; i < bData.velocities.length; i++) {
            const vel = bData.velocities[i];
            positions[i * 3] += vel.x * dt;
            positions[i * 3 + 1] += vel.y * dt;
            positions[i * 3 + 2] += vel.z * dt;
            vel.multiplyScalar(0.93);
          }
          bData.burstPoints.geometry.attributes.position.needsUpdate = true;
          bData.pMat.opacity = Math.max(0, 1.0 - Math.pow(bElapsed, 0.8));
        } else {
          obj.remove(blast);
        }
      }

      // Signature Distinct 3D Object Entrance Styles per Act
      if (obj.__fadeIn) {
        const p = Math.min(elapsed / FADE_IN_MS, 1);

        if (completionActiveMomentId === 'complete') {
          // Act 1: Elastic Drop from Above + Spring Pulse
          const eased = (1 + 0.35 * Math.sin(p * Math.PI * 1.2)) * Math.pow(p, 0.7);
          obj.scale.setScalar(Math.max(0.001, eased * baseScale));
          obj.position.y = (1 - Math.pow(p, 0.8)) * 1.4;
        } else if (completionActiveMomentId === 'greatWork') {
          // Act 2: Pop Entrance with Elastic Double Bounce
          const bounce = 1 + 0.45 * Math.sin(p * Math.PI * 2.5) * Math.exp(-p * 3.5);
          obj.scale.setScalar(Math.max(0.001, bounce * baseScale));
          obj.position.y = 0;
        } else if (completionActiveMomentId === 'distinct') {
          // Act 3: Precessional Y-Axis Spin & Prismatic Crystallization
          const eased = Math.pow(p, 1.8);
          obj.scale.setScalar(Math.max(0.001, eased * baseScale));
          obj.rotation.y = (1 - p) * Math.PI * 1.8;
          obj.position.y = 0;
        } else if (completionActiveMomentId === 'orderLimit') {
          // Act 4: Solid Base with Sequential Bar Column Rise & Crown Descent
          obj.scale.setScalar(baseScale);
          obj.position.set(0, 0, 0);
        } else if (completionActiveMomentId === 'logicOrder') {
          // Act 5: Smooth Horizontal Slide-In along X-Axis
          obj.scale.setScalar(baseScale);
          obj.position.x = (-1 + Math.pow(p, 0.6)) * 1.2;
          obj.position.y = 0;
        } else if (completionActiveMomentId === 'questions') {
          // Act 6: Vortex Swirl & Shield Unfold
          const eased = 1 - Math.pow(1 - p, 3);
          obj.scale.setScalar(Math.max(0.001, eased * baseScale));
          obj.rotation.z = (1 - p) * Math.PI * 0.5;
          obj.position.set(0, 0, 0);
        } else if (completionActiveMomentId === 'cert') {
          // Act 7: Majestic Award Presentation Ascent from Below
          const eased = Math.pow(p, 1.6);
          obj.scale.setScalar(Math.max(0.001, eased * baseScale));
          obj.position.y = (-1 + Math.pow(p, 0.7)) * 0.8;
        } else if (completionActiveMomentId === 'nextLevel') {
          // Act 8: Stationary Base Pads + Thruster Ignition
          obj.scale.setScalar(baseScale);
          obj.position.set(0, 0, 0);
        } else {
          const eased = p < 1 ? (1 + 0.35 * Math.sin(p * Math.PI * 1.2)) * Math.pow(p, 0.7) : 1;
          obj.scale.setScalar(Math.max(0.001, eased * baseScale));
        }

        if (p >= 1) {
          obj.__fadeIn = false;
          obj.scale.setScalar(baseScale);
          obj.position.set(0, 0, 0);
          obj.rotation.set(0, 0, 0);
        }
      } else {
        obj.scale.setScalar(baseScale);
      }

      // Sequential Bar Column Sorting Animation for Act 3 ("ORDER BY & LIMIT")
      if (completionActiveMomentId === 'orderLimit' && obj.userData && obj.userData.bars) {
        const momentElapsed = (m && m.startAt !== undefined) ? Math.max(0, t - m.startAt) : 0;
        obj.userData.bars.forEach((bar, idx) => {
          const delay = idx * 0.15;
          const barP = Math.min(Math.max((momentElapsed - delay) / 0.35, 0), 1);
          const barScaleY = barP < 1 ? (1 - Math.pow(1 - barP, 3)) * bar.userData.targetHeight : bar.userData.targetHeight;
          bar.scale.y = Math.max(0.01, barScaleY);
          bar.position.y = (barScaleY * 1.0) / 2 - 0.5;
        });

        if (obj.userData.crownGroup) {
          const crownP = Math.min(Math.max((momentElapsed - 0.8) / 0.4, 0), 1);
          const crownScale = crownP < 1 ? (1 + 0.35 * Math.sin(crownP * Math.PI)) * crownP : 1;
          obj.userData.crownGroup.scale.setScalar(crownScale * 0.85);

          // Position neatly right ON TOP of the highest bar (top surface y = 2.2)
          const hoverOffset = Math.sin((t || 0) * 3) * 0.03;
          obj.userData.crownGroup.position.y = (crownP < 1 ? 3.4 - crownP * 1.1 : 2.3) + hoverOffset;
          obj.userData.crownGroup.rotation.y = (t || 0) * 0.6;
        }
      }

      // Traveling Plasma Energy Pulse along Pipeline for Act 5 ("logicOrder")
      if (completionActiveMomentId === 'logicOrder') {
        const mElapsed = (m && m.startAt !== undefined) ? Math.max(0, t - m.startAt) : 0;
        const cycle = (mElapsed * 1.2) % 3;
        const stage = Math.floor(cycle);
        const stageP = cycle - stage;

        obj.userData.nodes?.forEach((node, idx) => {
          if (node.material) {
            if (idx === stage || idx === stage + 1) {
              node.material.emissiveIntensity = 0.4 + Math.sin(stageP * Math.PI) * 0.8;
            } else {
              node.material.emissiveIntensity = 0.3;
            }
          }
        });

        for (let b = 0; b < 3; b++) {
          const beam = obj.getObjectByName(`plasmaBeam${b}`);
          if (beam && beam.material) {
            if (b === stage) {
              beam.material.emissiveIntensity = 0.5 + Math.sin(stageP * Math.PI) * 1.2;
            } else {
              beam.material.emissiveIntensity = 0.3;
            }
          }
        }
      }

      // Vertical Motion & Audio-Synced Rotations
      if (!reducedMotion) {
        const animTime = t;

        // Act 8 ("nextLevel"): Fast High-Energy Straight Rocket Launch + Expanding Liftoff Smoke Ring
        if (completionActiveMomentId === 'nextLevel') {
          const mElapsed = (m && m.startAt !== undefined) ? Math.max(0, t - m.startAt) : 0;
          const rocketBody = obj.getObjectByName('rocketBodyGroup');
          const smokeRing = obj.getObjectByName('rocketLaunchSmokeRing');

          if (rocketBody) {
            if (mElapsed < 0.2) {
              // Quick high-frequency thruster rumble prior to liftoff
              rocketBody.position.y = Math.sin(animTime * 50) * 0.025;
              rocketBody.position.x = 0;
              rocketBody.position.z = 0;
              rocketBody.rotation.z = 0;
              if (smokeRing) smokeRing.material.opacity = 0;
            } else {
              // Fast, high-energy straight vertical rocket launch into space!
              const launchP = Math.min(1.0, (mElapsed - 0.2) / 1.3);
              const ascendY = Math.pow(launchP, 2.5) * 14.0;

              rocketBody.position.y = ascendY;
              rocketBody.position.x = 0;
              rocketBody.position.z = 0;
              rocketBody.rotation.z = 0;

              // Animate expanding ground shockwave smoke ring
              if (smokeRing) {
                const ringScale = 1.0 + launchP * 4.5;
                smokeRing.scale.setScalar(ringScale);
                smokeRing.material.opacity = Math.max(0, 0.85 * (1.0 - Math.pow(launchP, 0.7)));
              }
            }
          }
          // Main group (stationary header badge & ground launch pad rings) remain fixed at y = 0
          obj.position.y = 0;
        } else {
          obj.position.y = Math.sin(animTime * 1.4) * (isMobile ? 0.05 : 0.08);
        }

        // Act 2: Clapping Emoji 👏 Pulsing Sub-animation
        const clapEmojiGroup = obj.getObjectByName('clapEmojiGroup');
        if (clapEmojiGroup) {
          const pulse = 1 + Math.abs(Math.sin(animTime * 8)) * 0.18;
          clapEmojiGroup.scale.setScalar(pulse);
        }

        // Act 3: Faceted Diamond Gem Precessional 3D Tilt & Nucleus Pulse
        const diamondGem = obj.getObjectByName('diamondGem');
        if (diamondGem) {
          diamondGem.rotation.y = animTime * 0.6;
          diamondGem.rotation.x = Math.sin(animTime * 1.8) * 0.18;
        }
        const gemCore = obj.getObjectByName('gemCore');
        if (gemCore) {
          const corePulse = 1 + Math.sin(animTime * 6) * 0.15;
          gemCore.scale.setScalar(corePulse);
        }

        const particles = obj.getObjectByName('particles');
        if (particles) particles.rotation.z = animTime * 0.2;

        const shards = obj.getObjectByName('shards');
        if (shards) shards.rotation.y = animTime * 0.3;

        const gear1 = obj.getObjectByName('gear1');
        const gear2 = obj.getObjectByName('gear2');
        const gear3 = obj.getObjectByName('gear3');
        if (gear1) gear1.rotation.z = animTime * 0.9;
        if (gear2) gear2.rotation.z = -animTime * 1.12;
        if (gear3) gear3.rotation.z = animTime * 1.5;

        // Act 6: Embedded Glass Question Orbs Independent Levitation Float
        const qOrbs = obj.getObjectByName('questionOrbs');
        if (qOrbs) {
          qOrbs.rotation.y = animTime * 0.4;
          qOrbs.position.y = Math.sin(animTime * 2.5) * 0.04;
        }

        // Act 7: Victory Golden Stardust Confetti Swirl
        const dust = obj.getObjectByName('stardust');
        if (dust) {
          dust.rotation.y = -animTime * 0.35;
          dust.position.y = Math.sin(animTime * 2.2) * 0.05;
        }

        const starMedallion = obj.getObjectByName('starMedallion');
        if (starMedallion) starMedallion.rotation.z = Math.sin(animTime * 2.5) * 0.12;

        const warpPortal1 = obj.getObjectByName('warpPortal1');
        const warpPortal2 = obj.getObjectByName('warpPortal2');
        if (warpPortal1) warpPortal1.rotation.z = animTime * 1.2;
        if (warpPortal2) warpPortal2.rotation.z = -animTime * 1.5;
      }
    }

    // ── Fullscreen Window Resizing & Mobile FOV adjustment ──────────────
    const cw = window.innerWidth;
    const ch = window.innerHeight;
    if (completionRenderer.domElement.width !== cw || completionRenderer.domElement.height !== ch) {
      completionRenderer.setSize(cw, ch, false);
      if (completionCamera) {
        completionCamera.aspect = cw / ch;
        completionCamera.fov = cw < 768 ? 55 : 45;
        completionCamera.updateProjectionMatrix();
      }
    }

    completionRenderer.render(completionScene, completionCamera);
  }

  rafLoop();
}

// ── Teardown Fullscreen Overlay ───────────────────────────────────────────────
function teardownCompletionAnimation() {
  if (typeof completionRafId !== 'undefined' && completionRafId) {
    cancelAnimationFrame(completionRafId);
    completionRafId = null;
  }

  if (typeof completionDisposables !== 'undefined' && Array.isArray(completionDisposables)) {
    completionDisposables.forEach(r => { try { r.dispose(); } catch (e) { } });
    completionDisposables.length = 0;
  }

  if (typeof completionRenderer !== 'undefined' && completionRenderer) {
    try {
      completionRenderer.dispose();
      completionRenderer.forceContextLoss?.();
    } catch (e) { }
    completionRenderer = null;
  }

  completionScene = null;
  completionCamera = null;
  completionClock = null;
  completionActiveObj = null;
  completionOutroObj = null;
  completionActiveMomentId = null;

  if (typeof completionOverlayDiv !== 'undefined' && completionOverlayDiv && completionOverlayDiv.parentNode) {
    try { completionOverlayDiv.parentNode.removeChild(completionOverlayDiv); } catch (e) { }
  }
  completionOverlayDiv = null;
  completionCanvas = null;
  completionCaption = null;
  completionLegend = null;

  // Restore split-pane divider line + control pill and slide header card
  const dividerEl = document.getElementById('divider');
  if (dividerEl) dividerEl.style.display = '';

  const slideHeaderEl = document.getElementById('slideHeader');
  if (slideHeaderEl) slideHeaderEl.style.display = '';
}

// ── Entry Point (called from loadAndPlayTrack for completion tracks) ───────────
function launchCompletionAnimation(audioObj, targetTime = 0) {
  teardownCompletionAnimation(); // clean any previous
  if (audioObj) {
    if (audioObj.ended || audioObj.currentTime >= (audioObj.duration || 26) - 0.5) {
      try { audioObj.currentTime = 0; } catch (e) { }
    }
  }
  createCompletionOverlay();
  ensureThreeLoaded(() => {
    initCompletionScene();
    startCompletionAnimation(audioObj, targetTime);
  });
}

function updateTableHighlights(currentTime, isPlaying) {
  const rows = document.querySelectorAll('#day03OpsTable tbody tr');
  if (!rows.length) return;

  if (!isPlaying) {
    rows.forEach(row => row.classList.remove('narration-highlight'));
    return;
  }

  let activeIndex = -1;
  if (currentTime >= 9.16 && currentTime < 15.68) {
    activeIndex = 0;
  } else if (currentTime >= 15.68 && currentTime < 21.34) {
    activeIndex = 1;
  } else if (currentTime >= 21.34 && currentTime < 26.86) {
    activeIndex = 2;
  } else if (currentTime >= 26.86 && currentTime < 35.80) {
    activeIndex = 3;
  } else if (currentTime >= 35.80 && currentTime < 42.62) {
    activeIndex = 4;
  } else if (currentTime >= 42.62 && currentTime < 51.26) {
    activeIndex = 5;
  }

  rows.forEach((row, idx) => {
    if (idx === activeIndex) {
      row.classList.add('narration-highlight');
    } else {
      row.classList.remove('narration-highlight');
    }
  });
}

function updateLogicalPrecedenceHighlights(currentTime, isPlaying) {
  const wrap = document.getElementById('day03PrecWrap');
  const intro = document.getElementById('day03LogicIntro');
  const cards = {
    not: document.querySelector('#day03PrecWrap .prec-card--not'),
    and: document.querySelector('#day03PrecWrap .prec-card--and'),
    or: document.querySelector('#day03PrecWrap .prec-card--or')
  };
  const note = document.getElementById('day03PrecedenceNote');

  if (!wrap || !cards.not) return;

  // If not playing, restore normal visibility
  if (!isPlaying) {
    wrap.classList.remove('narration-active');
    cards.not.classList.remove('narration-highlight', 'revealed');
    cards.and.classList.remove('narration-highlight', 'revealed');
    cards.or.classList.remove('narration-highlight', 'revealed');
    if (note) note.classList.remove('narration-highlight', 'revealed');
    if (intro) intro.classList.remove('narration-highlight');
    return;
  }

  // Active playing state
  wrap.classList.add('narration-active');

  // Determine which cards/notes are revealed
  let revealed = { not: false, and: false, or: false, note: false };
  if (currentTime >= 5.68) revealed.not = true;
  if (currentTime >= 11.66) revealed.and = true;
  if (currentTime >= 16.20) revealed.or = true;
  if (currentTime >= 20.76) revealed.note = true;

  // Determine active highlight item
  let activeItem = null;
  if (currentTime >= 0.00 && currentTime < 5.68) {
    activeItem = 'intro';
  } else if (currentTime >= 5.68 && currentTime < 11.66) {
    activeItem = 'not';
  } else if (currentTime >= 11.66 && currentTime < 16.20) {
    activeItem = 'and';
  } else if (currentTime >= 16.20 && currentTime < 20.76) {
    activeItem = 'or';
  } else if (currentTime >= 20.76 && currentTime < 25.90) {
    activeItem = 'note';
  } else if (currentTime >= 25.90 && currentTime < 27.46) {
    activeItem = 'not';
  } else if (currentTime >= 27.46 && currentTime < 28.92) {
    activeItem = 'and';
  } else if (currentTime >= 28.92 && currentTime < 29.70) {
    activeItem = 'or';
  } else if (currentTime >= 29.70) {
    activeItem = 'note';
  }

  // Highlight intro paragraph
  if (intro) {
    if (activeItem === 'intro') intro.classList.add('narration-highlight');
    else intro.classList.remove('narration-highlight');
  }

  // Apply classes to cards
  Object.keys(cards).forEach(key => {
    const card = cards[key];
    if (revealed[key]) {
      card.classList.add('revealed');
    } else {
      card.classList.remove('revealed');
    }

    if (activeItem === key) {
      card.classList.add('narration-highlight');
    } else {
      card.classList.remove('narration-highlight');
    }
  });

  // Apply class to precedence note
  if (note) {
    if (revealed.note) {
      note.classList.add('revealed');
    } else {
      note.classList.remove('revealed');
    }

    if (activeItem === 'note') {
      note.classList.add('narration-highlight');
    } else {
      note.classList.remove('narration-highlight');
    }
  }
}

function updateIntroHighlight(currentTime, isPlaying) {
  const intro = document.getElementById('day03LogicIntro');
  if (intro) intro.classList.toggle('narration-highlight', isPlaying);
}

function updateNotCardHighlight(currentTime, isPlaying) {
  const card = document.querySelector('#day03PrecWrap .prec-card--not');
  if (card) card.classList.toggle('narration-highlight', isPlaying);
}

function updateAndCardHighlight(currentTime, isPlaying) {
  const card = document.querySelector('#day03PrecWrap .prec-card--and');
  if (card) card.classList.toggle('narration-highlight', isPlaying);
}

function updateOrCardHighlight(currentTime, isPlaying) {
  const card = document.querySelector('#day03PrecWrap .prec-card--or');
  if (card) card.classList.toggle('narration-highlight', isPlaying);
}

function updatePrecedenceNoteHighlight(currentTime, isPlaying) {
  const note = document.getElementById('day03PrecedenceNote');
  const cards = {
    not: document.querySelector('#day03PrecWrap .prec-card--not'),
    and: document.querySelector('#day03PrecWrap .prec-card--and'),
    or: document.querySelector('#day03PrecWrap .prec-card--or')
  };
  if (note) note.classList.toggle('narration-highlight', isPlaying);

  if (!isPlaying) {
    if (cards.not) cards.not.classList.remove('narration-highlight');
    if (cards.and) cards.and.classList.remove('narration-highlight');
    if (cards.or) cards.or.classList.remove('narration-highlight');
    return;
  }

  // Multi-pass highlight during audio11:
  // 4.8s - 6.1s: NOT card
  // 6.5s - 7.5s: AND card
  // 7.9s - 8.6s: OR card
  if (cards.not) cards.not.classList.toggle('narration-highlight', currentTime >= 4.8 && currentTime < 6.1);
  if (cards.and) cards.and.classList.toggle('narration-highlight', currentTime >= 6.5 && currentTime < 7.5);
  if (cards.or) cards.or.classList.toggle('narration-highlight', currentTime >= 7.9 && currentTime < 8.6);
}

// ════════════════════════════════════════════════════════════════════════════════

async function loadAndPlayTrack(index, targetTime = 0) {
  const myGeneration = ++currentGeneration;

  if (activeAudioInstance) {
    activeAudioInstance.pause();
    activeAudioInstance.src = "";
    activeAudioInstance.load();
    activeAudioInstance = null;
  }

  loadManifest().catch(() => { });

  combinedTrackIndex = index;
  let elapsedBefore = 0;
  for (let i = 0; i < index; i++) {
    elapsedBefore += combinedTrackDurations[i] || 0;
  }
  currentCombinedTime = elapsedBefore + targetTime;
  updateProgressUI();
  const track = combinedTracks[index];
  if (!track) return;
  const filename = track.src.split('/').pop().replace('.mp3', '');
  const trackId = `${currentDay}_${filename}`;
  const entry = manifest[trackId] || { audioPath: track.src };
  const url = getAudioUrl(entry);

  let audio;
  if (nextTrackPrefetch && prefetchedForIndex === index && !prefetchFailed) {
    audio = nextTrackPrefetch;
  } else {
    audio = new Audio(url);
    audio.preload = "auto";
  }
  nextTrackPrefetch = null;
  prefetchedForIndex = null;
  prefetchFailed = false;
  activeAudioInstance = audio;
  audio.addEventListener('waiting', () => {
    if (myGeneration === currentGeneration) toggleBufferingState(true);
  });
  audio.addEventListener('stalled', () => {
    if (myGeneration === currentGeneration) toggleBufferingState(true);
  });
  audio.addEventListener('playing', () => {
    if (myGeneration === currentGeneration) toggleBufferingState(false);
  });
  audio.addEventListener('canplay', () => {
    if (myGeneration === currentGeneration) toggleBufferingState(false);
  });
  if (typeof currentPlaybackSpeed !== 'undefined') {
    activeAudioInstance.playbackRate = currentPlaybackSpeed;
  }
  if (typeof currentPlaybackVolume !== 'undefined') {
    activeAudioInstance.volume = currentPlaybackVolume;
  }

  if (targetTime > 0) {
    const applyTargetTime = () => {
      try {
        if (Math.abs(audio.currentTime - targetTime) > 0.1) {
          audio.currentTime = targetTime;
        }
      } catch (e) { }
    };
    if (audio.readyState >= 1) {
      applyTargetTime();
    } else {
      audio.addEventListener('loadedmetadata', applyTargetTime, { once: true });
      audio.addEventListener('canplay', applyTargetTime, { once: true });
    }
  }

  // Load events lazily
  const events = await loadTrackEvents(trackId);

  audio.addEventListener('ended', () => {
    if (myGeneration !== currentGeneration) return;
    if (track.src.includes('New_Day3Part1audio05.mp3')) {
      updateTableHighlights(0, false);
    }
    if (track.src.includes('New_Day3Part1audio07.mp3')) {
      updateIntroHighlight(0, false);
    }
    if (track.src.includes('New_Day3Part1audio08.mp3')) {
      updateNotCardHighlight(0, false);
    }
    if (track.src.includes('New_Day3Part1audio09.mp3')) {
      updateAndCardHighlight(0, false);
    }
    if (track.src.includes('New_Day3Part1audio10.mp3')) {
      updateOrCardHighlight(0, false);
    }
    if (track.src.includes('New_Day3Part1audio11.mp3')) {
      updatePrecedenceNoteHighlight(0, false);
    }
    onNarrationSegmentEnded(index, events);
  });

  audio.addEventListener('pause', () => {
    if (myGeneration !== currentGeneration) return;
    if (track.src.includes('New_Day3Part1audio05.mp3')) {
      updateTableHighlights(0, false);
    }
    if (track.src.includes('New_Day3Part1audio07.mp3')) {
      updateIntroHighlight(0, false);
    }
    if (track.src.includes('New_Day3Part1audio08.mp3')) {
      updateNotCardHighlight(0, false);
    }
    if (track.src.includes('New_Day3Part1audio09.mp3')) {
      updateAndCardHighlight(0, false);
    }
    if (track.src.includes('New_Day3Part1audio10.mp3')) {
      updateOrCardHighlight(0, false);
    }
    if (track.src.includes('New_Day3Part1audio11.mp3')) {
      updatePrecedenceNoteHighlight(0, false);
    }
  });

  audio.addEventListener('timeupdate', () => {
    if (myGeneration !== currentGeneration) return;

    if (track.src.includes('New_Day3Part1audio05.mp3')) {
      updateTableHighlights(audio.currentTime, !audio.paused);
    }
    if (track.src.includes('New_Day3Part1audio07.mp3')) {
      updateIntroHighlight(audio.currentTime, !audio.paused);
    }
    if (track.src.includes('New_Day3Part1audio08.mp3')) {
      updateNotCardHighlight(audio.currentTime, !audio.paused);
    }
    if (track.src.includes('New_Day3Part1audio09.mp3')) {
      updateAndCardHighlight(audio.currentTime, !audio.paused);
    }
    if (track.src.includes('New_Day3Part1audio10.mp3')) {
      updateOrCardHighlight(audio.currentTime, !audio.paused);
    }
    if (track.src.includes('New_Day3Part1audio11.mp3')) {
      updatePrecedenceNoteHighlight(audio.currentTime, !audio.paused);
    }

    // Calculate cumulative current time
    let elapsed = 0;
    for (let i = 0; i < combinedTrackIndex; i++) {
      elapsed += combinedTrackDurations[i] || 0;
    }
    elapsed += audio.currentTime;

    currentCombinedTime = elapsed;
    updateProgressUI();
    maybePrefetchNext(audio, index);
  });

  audio.addEventListener('error', () => {
    if (myGeneration !== currentGeneration) return;
    retryOrShowError(index, myGeneration, 'network');
  });

  // Slide navigation, typewriter, and output table scrolls trigger JIT at playback start
  cancelTypewriter();

  if (track.type === 'question') {
    isNarrationActive = false;
    if (typeof clearSlidePlaybackVisibility === 'function') clearSlidePlaybackVisibility();
    const targetQIdx = COURSE_CONFIG.practiceQuestions.findIndex(q => q.id === track.qId);
    if (targetQIdx !== -1) {
      if (targetQIdx !== currentPracticeQ) clearOutputSection();
      currentPracticeQ = targetQIdx;
      renderPracticeQuestion();
      updatePracticeStats();
    }
    const bar = document.getElementById('questionBar');
    if (bar) bar.classList.add('question-playing');
    const slideContent = document.getElementById('slideContent');
    if (slideContent) slideContent.scrollTo({ top: 0, behavior: 'smooth' });

    // Auto switch to SQL Sandbox tab on mobile
    setMobileTab('practice');

  } else if (track.type === 'solution') {
    isNarrationActive = false;
    if (typeof clearSlidePlaybackVisibility === 'function') clearSlidePlaybackVisibility();
    const targetQIdx = COURSE_CONFIG.practiceQuestions.findIndex(q => q.id === track.qId);
    if (targetQIdx !== -1) {
      currentPracticeQ = targetQIdx;
      renderPracticeQuestion();
      updatePracticeStats();
    }
    const bar = document.getElementById('questionBar');
    if (bar) bar.classList.add('question-playing');

    const solMap = questionSolutionMap[currentDay] || questionSolutionMap['day01'];
    const solEntry = solMap ? solMap[track.qId] : null;
    if (solEntry) {
      startAudioSyncedTypewriter(audio, solEntry);
    }

    // Auto switch to SQL Sandbox tab on mobile
    setMobileTab('practice');

  } else if (track.type === 'completion') {
    // ── Day completion: Three.js narration companion ──────────────────────
    isNarrationActive = false;
    if (typeof clearSlidePlaybackVisibility === 'function') clearSlidePlaybackVisibility();
    const bar = document.getElementById('questionBar');
    if (bar) bar.classList.remove('question-playing');
    // Switch to theory tab so the lesson area canvas is visible
    setMobileTab('theory');
    // Launch Three.js scene synced to this audio element
    launchCompletionAnimation(audio, targetTime);

  } else {
    isNarrationActive = true;
    const bar = document.getElementById('questionBar');
    if (bar) bar.classList.remove('question-playing');
    scrollToTarget(track.target);

    // Auto switch to Lesson Theory tab on mobile
    setMobileTab('theory');
  }

  // Setup Media Session API
  if ('mediaSession' in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: track.title || 'Manodemy Slide Narration',
      artist: 'Manodemy Narrator',
      album: 'Day 01 Relational Databases'
    });
    navigator.mediaSession.setActionHandler('play', () => {
      if (activeAudioInstance) {
        activeAudioInstance.play();
        updatePlayButtonStates(true);
      }
    });
    navigator.mediaSession.setActionHandler('pause', () => {
      if (activeAudioInstance) {
        activeAudioInstance.pause();
        updatePlayButtonStates(false);
      }
    });
    navigator.mediaSession.setActionHandler('previoustrack', () => {
      if (combinedTrackIndex > 0) {
        loadAndPlayTrack(combinedTrackIndex - 1);
      }
    });
    navigator.mediaSession.setActionHandler('nexttrack', () => {
      if (combinedTrackIndex < combinedTracks.length - 1) {
        loadAndPlayTrack(combinedTrackIndex + 1);
      }
    });
  }

  audio.play()
    .then(() => {
      hasCompletedFirstGestureBoundPlay = true;
      isCombinedPlaying = true;
      updatePlayButtonStates(true);
      if (track.type !== 'question' && track.type !== 'solution') {
        isNarrationActive = true;
        if (track.target) {
          updateSlidePlaybackVisibility(track.target);
        }
      }
    })
    .catch((err) => {
      console.log('Play rejected:', err);
      if (audio.error) {
        retryOrShowError(index, myGeneration, 'network');
      } else {
        showTapToPlayFallback(index);
      }
    });
}

function maybePrefetchNext(audio, currentIndex) {
  const remaining = audio.duration - audio.currentTime;
  const hasNext = currentIndex < combinedTracks.length - 1;
  if (hasNext && remaining < 5 && prefetchedForIndex !== currentIndex + 1) {
    const nextTrack = combinedTracks[currentIndex + 1];
    const filename = nextTrack.src.split('/').pop().replace('.mp3', '');
    const trackId = `${currentDay}_${filename}`;
    const nextEntry = manifest[trackId] || { audioPath: nextTrack.src };
    const url = getAudioUrl(nextEntry);

    const prefetch = new Audio(url);
    prefetch.preload = "auto";

    prefetch.addEventListener('error', () => {
      if (prefetchedForIndex === currentIndex + 1) {
        prefetchFailed = true;
      }
    });

    nextTrackPrefetch = prefetch;
    prefetchedForIndex = currentIndex + 1;
    prefetchFailed = false;

    // Prefetch events
    loadTrackEvents(trackId);
  }
}

// P0 #4: Error toast utility
function showToast(message, type = 'error', durationMs = 4000) {
  const existing = document.getElementById('audioErrorToast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'audioErrorToast';
  toast.className = 'audio-error-toast';
  toast.setAttribute('role', 'alert');
  toast.setAttribute('aria-live', 'assertive');
  const icon = type === 'error' ? '⚠️' : 'ℹ️';
  toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('fade-out');
    setTimeout(() => toast.remove(), 450);
  }, durationMs);
}

function retryOrShowError(index, generation, reason = 'network', attempt = 1) {
  const MAX_ATTEMPTS = 3;
  if (reason !== 'network' && !hasCompletedFirstGestureBoundPlay) {
    showTapToPlayFallback(index);
    return;
  }
  if (attempt > MAX_ATTEMPTS) {
    const track = combinedTracks[index];
    const name = track ? track.src.split('/').pop() : `track ${index}`;
    showToast(`Audio failed to load: ${name}. Check your connection.`, 'error');
    console.warn(`Audio loading failed after ${MAX_ATTEMPTS} retries for track ${index}.`);
    return;
  }

  setTimeout(() => {
    if (generation !== currentGeneration) return;
    loadAndPlayTrack(index);
  }, attempt * 800);
}

function showTapToPlayFallback(index) {
  let overlay = document.getElementById('gestureFallbackOverlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'gestureFallbackOverlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.background = 'rgba(6, 9, 19, 0.9)';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.zIndex = '9999';
    overlay.innerHTML = `
      <div style="background: #111424; border: 1px solid #2a2e45; border-radius: 12px; padding: 24px; text-align: center; max-width: 320px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
        <div style="font-size: 32px; margin-bottom: 12px;">🔊</div>
        <h3 style="color: #fff; font-family: Inter, sans-serif; margin: 0 0 8px 0; font-size: 18px;">Narrator Audio Ready</h3>
        <p style="color: #8c92ac; font-family: Inter, sans-serif; font-size: 13px; line-height: 1.5; margin: 0 0 20px 0;">Tap below to enable narration playback on this device.</p>
        <button id="gestureFallbackBtn" style="background: #00e6f6; color: #060913; border: none; border-radius: 6px; padding: 10px 20px; font-family: Inter, sans-serif; font-weight: 600; font-size: 14px; cursor: pointer; width: 100%; transition: opacity 0.2s;">Enable Audio</button>
      </div>
    `;
    document.body.appendChild(overlay);
  }
  document.getElementById('gestureFallbackBtn').onclick = () => {
    overlay.remove();
    loadAndPlayTrack(index);
  };
}

function toggleCombinedPlayback() {
  if (isCombinedPlaying) {
    pauseCombinedPlayback();
  } else {
    playCombinedPlayback();
  }
}

function updateProgressUI() {
  const seekBar = document.getElementById('seekBar');
  const playbackTime = document.getElementById('playbackTime');
  const isDragging = typeof isScrubbing !== 'undefined' && isScrubbing;
  if (seekBar) {
    seekBar.max = totalCombinedDuration || 100;
    if (!isDragging) {
      seekBar.value = currentCombinedTime;
    }
  }
  if (playbackTime && !isDragging) {
    playbackTime.textContent = `${formatTime(currentCombinedTime)} / ${formatTime(totalCombinedDuration)}`;
  }
}

function formatTime(secs) {
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}

function onNarrationSegmentEnded(index, events) {
  if (index !== combinedTrackIndex) return;

  const endedTrack = combinedTracks[index];

  if (combinedTrackIndex < combinedTracks.length - 1) {
    combinedTrackIndex++;
    loadAndPlayTrack(combinedTrackIndex);
  } else {
    // All tracks complete — reset
    isCombinedPlaying = false;
    isNarrationActive = false;
    combinedTrackIndex = 0;
    currentCombinedTime = 0;
    updatePlayButtonStates(false);
    updateProgressUI();
    cancelTypewriter();
    if (typeof clearSlidePlaybackVisibility === 'function') clearSlidePlaybackVisibility();
    // Remove question bar highlight
    const bar = document.getElementById('questionBar');
    if (bar) bar.classList.remove('question-playing');

    // If the last track was the completion track, hold final frame for 1s before teardown + blink Take Test
    if (endedTrack && endedTrack.type === 'completion') {
      setTimeout(() => {
        teardownCompletionAnimation();
        activateTakeTestBlink();
      }, 1000);
    }
  }
}

async function seekCombinedPlayback(val) {
  const targetTime = parseFloat(val);
  await loadManifest();

  // Find which track this targetTime belongs to
  let elapsed = 0;
  let trackIdx = 0;
  let localOffset = targetTime;

  for (let i = 0; i < combinedTrackDurations.length; i++) {
    const dur = combinedTrackDurations[i];
    if (targetTime < elapsed + dur) {
      trackIdx = i;
      localOffset = targetTime - elapsed;
      break;
    }
    elapsed += dur;
    if (i === combinedTrackDurations.length - 1) {
      trackIdx = i;
      localOffset = dur - 0.1;
    }
  }

  // Load or seek the track
  if (combinedTrackIndex !== trackIdx) {
    await loadAndPlayTrack(trackIdx, localOffset);
  } else if (activeAudioInstance) {
    activeAudioInstance.currentTime = localOffset;
    cancelTypewriter();

    const track = combinedTracks[trackIdx];
    if (track) {
      if (track.type === 'question' || track.type === 'solution') {
        teardownCompletionAnimation();
        const targetQIdx = COURSE_CONFIG.practiceQuestions.findIndex(q => q.id === track.qId);
        if (targetQIdx !== -1) {
          currentPracticeQ = targetQIdx;
          renderPracticeQuestion();
          updatePracticeStats();
        }
        const bar = document.getElementById('questionBar');
        if (bar) bar.classList.add('question-playing');
        setMobileTab('practice');

        if (track.type === 'solution') {
          const solMap = questionSolutionMap[currentDay] || questionSolutionMap['day01'];
          const solEntry = solMap ? solMap[track.qId] : null;
          if (solEntry) {
            startAudioSyncedTypewriter(activeAudioInstance, solEntry);
          }
        }
      } else if (track.type === 'completion') {
        if (!completionOverlayDiv || !completionScene) {
          launchCompletionAnimation(activeAudioInstance);
        }
      } else {
        teardownCompletionAnimation();
        const bar = document.getElementById('questionBar');
        if (bar) bar.classList.remove('question-playing');
        scrollToTarget(track.target);
        setMobileTab('theory');
      }
    }
  }

  currentCombinedTime = targetTime;
  updateProgressUI();
}

function scrollToTarget(selector) {
  if (typeof isCombinedPlaying !== 'undefined' && isCombinedPlaying) {
    if (typeof updateSlidePlaybackVisibility === 'function') updateSlidePlaybackVisibility(selector);
  } else {
    if (typeof clearSlidePlaybackVisibility === 'function') clearSlidePlaybackVisibility();
  }

  const container = document.getElementById('slideContent');
  const targetEl = container ? container.querySelector(selector) : null;
  if (targetEl && container) {
    const blockToScroll = typeof getVisibilityBlock === 'function' ? getVisibilityBlock(targetEl, container) : targetEl;
    const containerRect = container.getBoundingClientRect();
    const targetRect = blockToScroll.getBoundingClientRect();
    const relativeTop = targetRect.top - containerRect.top + container.scrollTop;
    container.scrollTo({
      top: relativeTop - 15,
      behavior: 'smooth'
    });
  }
}

function playAudio(src, btn) {
  // Find track index
  const idx = combinedTracks.findIndex(t => t.src === src);
  if (idx === -1) {
    const audioSrc = src.startsWith('http') || src.startsWith('/') ? src : `/Version-3/${src}`;
    if (currentPlayingAudio && currentPlayingAudio.src.endsWith(src)) {
      if (currentPlayingAudio.paused) {
        currentPlayingAudio.play();
        btn.innerHTML = `<svg class="pause-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`;
        btn.classList.add('playing');
      } else {
        currentPlayingAudio.pause();
        btn.innerHTML = `<svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`;
        btn.classList.remove('playing');
      }
    } else {
      if (currentPlayingAudio) {
        currentPlayingAudio.pause();
        if (currentPlayingBtn) {
          currentPlayingBtn.innerHTML = `<svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`;
          currentPlayingBtn.classList.remove('playing');
        }
      }
      currentPlayingAudio = new Audio(audioSrc);
      if (typeof currentPlaybackSpeed !== 'undefined') {
        currentPlayingAudio.playbackRate = currentPlaybackSpeed;
      }
      if (typeof currentPlaybackVolume !== 'undefined') {
        currentPlayingAudio.volume = currentPlaybackVolume;
      }
      currentPlayingBtn = btn;
      currentPlayingAudio.play();
      btn.innerHTML = `<svg class="pause-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`;
      btn.classList.add('playing');
      currentPlayingAudio.onended = () => {
        btn.innerHTML = `<svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`;
        btn.classList.remove('playing');
        currentPlayingAudio = null;
        currentPlayingBtn = null;
      };
    }
    return;
  }

  if (combinedTrackIndex === idx) {
    toggleCombinedPlayback();
  } else {
    loadAndPlayTrack(idx);
  }
}

async function syncCombinedToTrack(srcFilename) {
  const idx = combinedTracks.findIndex(t => t.src === srcFilename);
  if (idx === -1) return null;
  await loadAndPlayTrack(idx);
  return activeAudioInstance;
}

// Dynamic mobile tab toggle
function setMobileTab(tab) {
  const container = document.getElementById('workspaceContainer');
  const btnTheory = document.getElementById('tabBtnTheory');
  const btnPractice = document.getElementById('tabBtnPractice');

  if (!container) return;

  if (tab === 'theory') {
    container.classList.remove('mobile-show-practice');
    container.classList.add('mobile-show-theory');
    if (btnTheory) { btnTheory.classList.add('active'); btnTheory.setAttribute('aria-selected', 'true'); }
    if (btnPractice) { btnPractice.classList.remove('active'); btnPractice.setAttribute('aria-selected', 'false'); }
  } else if (tab === 'practice') {
    container.classList.remove('mobile-show-theory');
    container.classList.add('mobile-show-practice');
    if (btnPractice) { btnPractice.classList.add('active'); btnPractice.setAttribute('aria-selected', 'true'); }
    if (btnTheory) { btnTheory.classList.remove('active'); btnTheory.setAttribute('aria-selected', 'false'); }

    // Refresh CodeMirror when visual display toggles
    setTimeout(() => {
      if (typeof mainEditor !== 'undefined' && mainEditor) {
        mainEditor.refresh();
      }
    }, 50);
  }
}

// Missing audio orchestration functions
function initSlideNarration() {
  // Kick off a manifest load so loadAndPlayTrack() gets accurate paths/durations.
  loadManifest().catch(() => { });

  // Eagerly preload Three.js in background so 3D completion narration visuals load instantly
  ensureThreeLoaded(() => { });

  if (combinedTrackDurations && combinedTrackDurations.length > 0) {
    recomputeTotalDuration();
  }

  combinedAudios = combinedTracks.map(track => {
    const filename = track.src.split('/').pop().replace('.mp3', '');
    const trackId = `${currentDay}_${filename}`;
    const entry = manifest[trackId] || { audioPath: track.src };
    const url = getAudioUrl(entry);
    const audio = new Audio(url);
    audio.preload = "none"; // lazy — don't pre-download all files on page load
    return audio;
  });

  const seekBar = document.getElementById('seekBar');
  if (seekBar) {
    seekBar.max = totalCombinedDuration || 100;
    if (!seekBar.dataset.scrubbingBound) {
      seekBar.dataset.scrubbingBound = 'true';
      seekBar.removeAttribute('oninput');
      seekBar.addEventListener('mousedown', () => { isScrubbing = true; });
      seekBar.addEventListener('touchstart', () => { isScrubbing = true; });
      seekBar.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value);
        const playbackTime = document.getElementById('playbackTime');
        if (playbackTime) {
          playbackTime.textContent = `${formatTime(val)} / ${formatTime(totalCombinedDuration)}`;
        }
      });
      seekBar.addEventListener('change', async (e) => {
        isScrubbing = false;
        await seekCombinedPlayback(e.target.value);
      });
      seekBar.addEventListener('touchend', async (e) => {
        isScrubbing = false;
        await seekCombinedPlayback(e.target.value);
      });
    }
  }

  updateProgressUI();
}

// ─── P1 #6: Skip ±N seconds ──────────────────────────────────────────────────
function skipCombined(deltaSecs) {
  if (!isCombinedPlaying && currentCombinedTime === 0) return;
  const target = Math.max(0, Math.min(totalCombinedDuration, currentCombinedTime + deltaSecs));
  seekCombinedPlayback(target);
}

// ─── P1 #7: Chapter list ─────────────────────────────────────────────────────
function buildChapterList() {
  const listEl = document.getElementById('chapterList');
  if (!listEl) return;
  const typeIcons = { narration: '📖', question: '❓', solution: '✅', completion: '🏆' };
  let elapsed = 0;
  listEl.innerHTML = '';
  combinedTracks.forEach((track, idx) => {
    const dur = combinedTrackDurations[idx] || 0;
    const item = document.createElement('div');
    item.className = 'chapter-item';
    item.dataset.idx = idx;
    item.setAttribute('role', 'option');
    item.innerHTML = `
      <span class="chapter-item__icon">${typeIcons[track.type] || '▶'}</span>
      <span class="chapter-item__time">${formatTime(elapsed)}</span>
      <span>${track.title || track.src.split('/').pop().replace('.mp3', '')}</span>`;
    item.addEventListener('click', () => {
      seekCombinedPlayback(elapsed);
      if (!isCombinedPlaying) playCombinedPlayback();
    });
    listEl.appendChild(item);
    elapsed += dur;
  });
}

function updateChapterListActive() {
  const listEl = document.getElementById('chapterList');
  if (!listEl) return;
  listEl.querySelectorAll('.chapter-item').forEach(item => {
    item.classList.toggle('active', parseInt(item.dataset.idx, 10) === combinedTrackIndex);
  });
}

function toggleChapterList() {
  const listEl = document.getElementById('chapterList');
  const btn = document.getElementById('chaptersBtn');
  if (!listEl) return;
  const isOpen = listEl.style.display !== 'none';
  if (isOpen) {
    listEl.style.display = 'none';
    if (btn) { btn.classList.remove('active'); btn.setAttribute('aria-expanded', 'false'); }
  } else {
    listEl.style.display = 'block';
    buildChapterList();
    updateChapterListActive();
    if (btn) { btn.classList.add('active'); btn.setAttribute('aria-expanded', 'true'); }
  }
}

// ─── P1 #8: Captions toggle ──────────────────────────────────────────────────
let captionsEnabled = false;

function toggleCaptions() {
  captionsEnabled = !captionsEnabled;
  const btn = document.getElementById('captionsBtn');
  const captionEl = document.getElementById('workspaceVpCaption');
  if (btn) {
    btn.classList.toggle('active', captionsEnabled);
    btn.setAttribute('aria-pressed', captionsEnabled ? 'true' : 'false');
  }
  if (captionEl) captionEl.style.display = captionsEnabled ? '' : 'none';
}

// ─── P1 #9: Restore player preferences on load ───────────────────────────────
function restorePlayerPreferences() {
  if (typeof ProgressManager === 'undefined') return;
  ProgressManager.load();
  const prefs = ProgressManager.getPreferences();
  if (prefs.speed && prefs.speed !== 1) {
    const labelMap = { 1: '1.0x', 1.25: '1.25x', 1.5: '1.5x', 1.75: '1.75x', 2: '2.0x' };
    selectSpeedOption(prefs.speed, labelMap[prefs.speed] || `${prefs.speed}x`);
  }
  if (typeof prefs.volume === 'number') {
    const slider = document.getElementById('volumeSlider');
    if (slider) slider.value = prefs.volume;
    setPlaybackVolume(prefs.volume);
  }
}

// ─── P2 #16: Pause audio when tab becomes hidden ─────────────────────────────
document.addEventListener('visibilitychange', () => {
  if (document.hidden && isCombinedPlaying) {
    pauseCombinedPlayback();
  }
});

// ─── P2 #17: getSlideTracks bridge ───────────────────────────────────────────
function getSlideTracks() {
  return combinedTracks;
}

function startProgressLoop() {
  if (playProgressInterval) clearInterval(playProgressInterval);
  playProgressInterval = setInterval(() => {
    updateProgressUI();
  }, 250);
}

function toggleBufferingState(isBuffering) {
  const navBtn = document.getElementById('navPlayBtn');
  const playPauseBtn = document.getElementById('playPauseBtn');
  if (isBuffering) {
    if (navBtn) {
      navBtn.innerHTML = `<span class="btn-icon loading-spinner">⏳</span> <span class="btn-text">Buffering...</span>`;
      navBtn.classList.add('buffering');
    }
    if (playPauseBtn) {
      playPauseBtn.innerHTML = `<span class="loading-spinner" style="display:inline-block;animation:spin 1s linear infinite;">⏳</span>`;
      playPauseBtn.classList.add('buffering');
    }
  } else {
    if (navBtn) {
      navBtn.classList.remove('buffering');
    }
    if (playPauseBtn) {
      playPauseBtn.classList.remove('buffering');
    }
    updatePlayButtonStates(isCombinedPlaying);
  }
}

function updatePlayButtonStates(isPlaying) {
  const navBtn = document.getElementById('navPlayBtn');
  if (navBtn) {
    if (isPlaying) {
      navBtn.innerHTML = `<span class="btn-icon" aria-hidden="true">⏸</span> <span class="btn-text">Pause Lesson</span>`;
      navBtn.classList.add('playing');
      navBtn.setAttribute('aria-label', 'Pause Lesson');
      navBtn.setAttribute('aria-pressed', 'true');
    } else {
      navBtn.innerHTML = `<span class="btn-icon" aria-hidden="true">▶</span> <span class="btn-text">Play Lesson</span>`;
      navBtn.classList.remove('playing');
      navBtn.setAttribute('aria-label', 'Play Lesson');
      navBtn.setAttribute('aria-pressed', 'false');
    }
  }

  const playPauseBtn = document.getElementById('playPauseBtn');
  if (playPauseBtn) {
    if (isPlaying) {
      playPauseBtn.innerHTML = `<span class="btn-icon" aria-hidden="true">⏸</span> <span class="btn-text">Pause Lesson</span>`;
      playPauseBtn.classList.add('playing');
      playPauseBtn.setAttribute('aria-label', 'Pause Lesson');
      playPauseBtn.setAttribute('aria-pressed', 'true');
    } else {
      playPauseBtn.innerHTML = `<span class="btn-icon" aria-hidden="true">▶</span> <span class="btn-text">Play Lesson</span>`;
      playPauseBtn.classList.remove('playing');
      playPauseBtn.setAttribute('aria-label', 'Play Lesson');
      playPauseBtn.setAttribute('aria-pressed', 'false');
    }
  }

  const activeTrack = combinedTracks[combinedTrackIndex];
  const activeSrc = activeTrack ? activeTrack.src : '';

  document.querySelectorAll('.audio-play-btn').forEach(btn => {
    const onclickStr = btn.getAttribute('onclick') || '';

    // For playAudio('filename.mp3', this)
    if (onclickStr.includes('playAudio')) {
      const match = onclickStr.match(/playAudio\(['"]([^'"]+)['"]/);
      if (match) {
        const btnSrc = match[1];
        if (activeSrc && activeSrc === btnSrc && isPlaying) {
          btn.innerHTML = `<svg class="pause-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`;
          btn.classList.add('playing');
        } else {
          btn.innerHTML = `<svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`;
          btn.classList.remove('playing');
        }
      }
    }

    // For playQuestionAudio(this)
    if (onclickStr.includes('playQuestionAudio')) {
      if (activeTrack && activeTrack.type === 'question' && isPlaying) {
        btn.innerHTML = `<svg class="pause-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`;
        btn.classList.add('playing');
      } else {
        btn.innerHTML = `<svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`;
        btn.classList.remove('playing');
      }
    }

    // For playSolutionAudioFromBtn(this)
    if (onclickStr.includes('playSolutionAudioFromBtn')) {
      if (activeTrack && activeTrack.type === 'solution' && isPlaying) {
        btn.innerHTML = `<svg class="pause-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`;
        btn.classList.add('playing');
      } else {
        btn.innerHTML = `<svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`;
        btn.classList.remove('playing');
      }
    }
  });
}

function playCombinedPlayback() {
  isCombinedPlaying = true;
  if (activeAudioInstance && activeAudioInstance.src && activeAudioInstance.src !== window.location.href) {
    if (activeAudioInstance.ended || activeAudioInstance.currentTime >= (activeAudioInstance.duration || 26) - 0.5) {
      try { activeAudioInstance.currentTime = 0; } catch (e) { }
    }
    activeAudioInstance.play()
      .then(() => {
        updatePlayButtonStates(true);
        const activeTrack = combinedTracks[combinedTrackIndex];
        if (activeTrack) {
          if (activeTrack.type === 'question' || activeTrack.type === 'solution') {
            teardownCompletionAnimation();
            const targetQIdx = COURSE_CONFIG.practiceQuestions ? COURSE_CONFIG.practiceQuestions.findIndex(q => q.id === activeTrack.qId) : -1;
            if (targetQIdx !== -1) {
              currentPracticeQ = targetQIdx;
              renderPracticeQuestion();
              updatePracticeStats();
            }
            const bar = document.getElementById('questionBar');
            if (bar) bar.classList.add('question-playing');

            if (activeTrack.type === 'solution') {
              const solMap = questionSolutionMap[currentDay] || questionSolutionMap['day01'];
              const solEntry = solMap ? solMap[activeTrack.qId] : null;
              if (solEntry) {
                startAudioSyncedTypewriter(activeAudioInstance, solEntry);
              }
            }
          } else if (activeTrack.type === 'completion') {
            if (!completionOverlayDiv || !completionScene) {
              launchCompletionAnimation(activeAudioInstance);
            }
          } else {
            teardownCompletionAnimation();
            if (isNarrationActive && activeTrack.target) {
              scrollToTarget(activeTrack.target);
            }
          }
        }
      })
      .catch(err => {
        console.log('Combined play error, re-creating track:', err);
        activeAudioInstance = null;
        loadAndPlayTrack(combinedTrackIndex, pendingAudioStartTime);
        pendingAudioStartTime = 0;
      });
  } else {
    activeAudioInstance = null;
    loadAndPlayTrack(combinedTrackIndex, pendingAudioStartTime);
    pendingAudioStartTime = 0;
  }
}

function pauseCombinedPlayback() {
  isCombinedPlaying = false;
  cancelTypewriter();
  if (activeAudioInstance) {
    activeAudioInstance.pause();
  }
  updatePlayButtonStates(false);

  const activeTrack = combinedTracks[combinedTrackIndex];
  if (activeTrack && activeTrack.type !== 'completion') {
    teardownCompletionAnimation();
  }
  // Show all content when paused so user can read freely
  if (typeof clearSlidePlaybackVisibility === 'function') clearSlidePlaybackVisibility();

  // Scroll back to the active block instantly so the viewport doesn't jump to the top of the slide
  if (typeof combinedTrackIndex !== 'undefined' && typeof combinedTracks !== 'undefined' && combinedTracks[combinedTrackIndex]) {
    const activeTrack = combinedTracks[combinedTrackIndex];
    if (activeTrack && activeTrack.target) {
      const container = document.getElementById('slideContent');
      const targetEl = container ? container.querySelector(activeTrack.target) : null;
      if (targetEl && container) {
        const blockToScroll = typeof getVisibilityBlock === 'function' ? getVisibilityBlock(targetEl, container) : targetEl;
        const containerRect = container.getBoundingClientRect();
        const targetRect = blockToScroll.getBoundingClientRect();
        const relativeTop = targetRect.top - containerRect.top + container.scrollTop;
        container.scrollTo({
          top: relativeTop - 15,
          behavior: 'auto'
        });
      }
    }
  }
}

// P2 #15: Class-based clearSlidePlaybackVisibility
function clearSlidePlaybackVisibility() {
  const containers = [
    document.getElementById('slideBodyText'),
    document.getElementById('presentSlideContent')
  ].filter(Boolean);

  containers.forEach(container => {
    container.classList.remove('playback-active');
    container.querySelectorAll('.section-hidden, .vis-target-hidden, .vis-target-dimmed').forEach(el => {
      el.classList.remove('section-hidden', 'vis-target-hidden', 'vis-target-dimmed');
      // Also clear any legacy inline styles from previous runs
      el.style.display = '';
      el.style.opacity = '';
    });
    // Sweep remaining inline styles left by older runs
    container.querySelectorAll('[style]').forEach(el => {
      el.style.display = '';
      el.style.opacity = '';
    });
  });
}

/**
 * Given a target element (the element with the track's ID), walk UP the DOM
 * to find the logical visual block that should be shown/hidden as a unit.
 * e.g. a <div id="entityDatabase"> inside a <td> should hide the entire <tr>.
 */
function getVisibilityBlock(targetElement, sectionBoundary) {
  // If the target is inside a table row, hide the whole row
  const tr = targetElement.closest('tr');
  if (tr && sectionBoundary.contains(tr)) return tr;

  // If the target is inside a comparison card (.vs-card), hide the whole card
  const vsCard = targetElement.closest('.vs-card');
  if (vsCard && sectionBoundary.contains(vsCard)) return vsCard;

  // For standalone blocks, return the element itself
  return targetElement;
}

// P2 #15: Class-based updateSlidePlaybackVisibility
function updateSlidePlaybackVisibility(targetSelector) {
  const containers = [
    document.getElementById('slideBodyText'),
    document.getElementById('presentSlideContent')
  ].filter(Boolean);

  containers.forEach(container => {
    if (typeof isCombinedPlaying === 'undefined' || !isCombinedPlaying) {
      clearSlidePlaybackVisibility();
      return;
    }

    container.classList.add('playback-active');

    // Find the target element inside this container
    const targetEl = container.querySelector(targetSelector);
    if (!targetEl) return;

    // Reset visibility classes on all elements
    container.querySelectorAll('.section-hidden, .vis-target-hidden').forEach(el => {
      el.classList.remove('section-hidden', 'vis-target-hidden');
      el.style.display = '';
    });

    // Find the active section wrapper (.slide-section) that contains targetEl
    const activeSection = targetEl.closest('.slide-section');
    if (!activeSection) {
      container.querySelectorAll('.slide-section').forEach(s => s.classList.remove('section-hidden'));
      return;
    }

    // Hide all other .slide-section wrappers using class, show only the active one
    container.querySelectorAll('.slide-section').forEach(section => {
      if (section !== activeSection) {
        section.classList.add('section-hidden');
      } else {
        section.classList.remove('section-hidden');
      }
    });

    // Keep the main heading (H2) at the top of the slide always visible
    const h2 = container.querySelector('h2');
    if (h2) h2.classList.remove('section-hidden', 'vis-target-hidden');

    // ── Chronological sub-target filtering ──
    const processedTargets = new Set();
    combinedTracks.forEach((track, idx) => {
      if (!track.target || (!track.target.startsWith('#') && !track.target.startsWith('.'))) return;
      if (processedTargets.has(track.target)) return;
      processedTargets.add(track.target);

      const el = activeSection.querySelector(track.target);
      if (!el) return;

      if (idx > combinedTrackIndex) {
        // Walk up to find the logical block
        const blockToHide = getVisibilityBlock(el, activeSection);
        blockToHide.classList.add('vis-target-hidden');

        // Also hide preceding <hr> dividers
        const prev = blockToHide.previousElementSibling;
        if (prev && prev.tagName === 'HR') {
          prev.classList.add('vis-target-hidden');
        }
      }
    });

    // ── Clean up empty parent containers ──
    activeSection.querySelectorAll('.vs-block').forEach(block => {
      const hasVisible = Array.from(block.children).some(c => !c.classList.contains('vis-target-hidden') && c.style.display !== 'none');
      if (!hasVisible) block.classList.add('vis-target-hidden');
    });

    activeSection.querySelectorAll('.db-mock-table-wrap').forEach(wrap => {
      const tbody = wrap.querySelector('tbody');
      if (!tbody) return;
      const hasVisibleRow = Array.from(tbody.querySelectorAll('tr')).some(r => !r.classList.contains('vis-target-hidden') && r.style.display !== 'none');
      if (!hasVisibleRow) wrap.classList.add('vis-target-hidden');
    });
  });
}


// P2 #20: Scoped keyboard shortcuts — Space only fires from player region
document.addEventListener('keydown', (e) => {
  if (!e.target) return;
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.closest('.CodeMirror')) return;

  const inPlayer = e.target.closest('#playbackBar') ||
                   e.target.closest('#navPlayBtn') ||
                   e.target.id === 'seekBar' ||
                   e.target.id === 'playPauseBtn' ||
                   e.target.id === 'skipBackBtn' ||
                   e.target.id === 'skipFwdBtn';

  if (e.key === 'k' || (e.key === ' ' && inPlayer)) {
    e.preventDefault();
    toggleCombinedPlayback();
  } else if (e.key === 'ArrowLeft' || e.key === 'j') {
    if (e.target.closest('#playbackBar') || e.target.id === 'seekBar') {
      e.preventDefault();
      const target = Math.max(0, currentCombinedTime - 5);
      seekCombinedPlayback(target);
      const sb = document.getElementById('seekBar');
      if (sb) sb.setAttribute('aria-valuenow', Math.round(target));
    }
  } else if (e.key === 'ArrowRight' || e.key === 'l') {
    if (e.target.closest('#playbackBar') || e.target.id === 'seekBar') {
      e.preventDefault();
      const target = Math.min(totalCombinedDuration, currentCombinedTime + 5);
      seekCombinedPlayback(target);
      const sb = document.getElementById('seekBar');
      if (sb) sb.setAttribute('aria-valuenow', Math.round(target));
    }
  } else if (e.key === '[') {
    // P1 #6: skip back 10s
    e.preventDefault();
    skipCombined(-10);
  } else if (e.key === ']') {
    // P1 #6: skip forward 10s
    e.preventDefault();
    skipCombined(10);
  } else if (e.key === 'c' || e.key === 'C') {
    // P1 #8: toggle captions
    e.preventDefault();
    toggleCaptions();
  }
});

