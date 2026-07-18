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
      if (t.createSQL) { try { newDb.run(t.createSQL); } catch(e) { console.error('Create SQL error:', e); } }
      if (t.seedSQL)   { try { newDb.run(t.seedSQL); } catch(e) { console.error('Seed SQL error:', e); } }
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
  COURSE_CONFIG.schema.tables.forEach(t => {
    info[t.name] = t.columns.map(c => c.name);
  });
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
      dp[i][j] = a[i-1] === b[j-1] ? dp[i-1][j-1] : 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
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

function renderPresentSlide() {
  const slide = COURSE_CONFIG.slides[currentSlide];
  const container = document.getElementById('presentSlideContent');
  if (container) {
    container.innerHTML = slide.html;
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
    autoHighlightSql(slideBodyText);
    // Re-execute any <script> tags injected via innerHTML (browser security blocks them)
    slideBodyText.querySelectorAll('script').forEach(function(oldScript) {
      const newScript = document.createElement('script');
      Array.from(oldScript.attributes).forEach(function(attr) {
        newScript.setAttribute(attr.name, attr.value);
      });
      newScript.textContent = oldScript.textContent;
      oldScript.parentNode.replaceChild(newScript, oldScript);
    });
  }
  
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
  setTimeout(() => {
    const config = (typeof slideTrackMap !== 'undefined' && currentDay === 'day01') ? slideTrackMap[currentSlide] : null;
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
      totalCombinedDuration = combinedTrackDurations.reduce((a, b) => a + b, 0);

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
  }, 100);
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
document.addEventListener('click', function(e) {
  const pop = document.getElementById('peekPopover');
  if (pop.classList.contains('open') && !pop.contains(e.target) && !e.target.closest('.peek-btn') && !e.target.closest('.tb-btn--tables')) {
    closePeekPopover();
  }
});

document.addEventListener('keydown', function(e) {
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
    if (outputEl) outputEl.innerHTML = '<span class="output-success">Ready...</span>';
  }

  // Handle caption display
  const captionEl = document.getElementById('workspaceVpCaption');
  if (captionEl) {
    if (timelineOpen) {
      captionEl.style.display = 'block';
      captionEl.textContent = activeCaption ? activeCaption.text : `📢 Timeline Preview Mode (${formatTime(targetMs/1000)} / ${formatTime(getTimelineDurationMs()/1000)})`;
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
    } catch (e) {}
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
    html += `<button class="test-q-btn ${i === 0 ? 'current' : ''}" id="tqBtn${i}" onclick="switchTestQuestion(${i})"><span class="q-prefix">Q</span>${i+1}</button>`;
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
  document.getElementById('testOutput').innerHTML = '<div class="output-label">Terminal Output</div><span class="output-success">Ready...</span>';
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
  if (!window.ProgressManager) return;
  const dp = ProgressManager.getDayProgress(dayId);
  if (dp && dp.testAttempt && !dp.testAttempt.submitted) {
    const attempt = dp.testAttempt;
    const timeSpent = Math.floor((Date.now() - attempt.startedAt) / 1000);
    const timeRemaining = attempt.timeRemaining - timeSpent;
    
    if (timeRemaining > 0) {
      const resume = confirm(`Resume your in-progress test for ${dayId.replace('day', 'Day ')}? You have ${Math.floor(timeRemaining / 60)} minutes remaining.`);
      if (resume) {
        resumeTestAttempt(dayId, attempt, timeRemaining);
        return;
      }
    }
    // If expired or user cancelled, clear the attempt
    dp.testAttempt = null;
    ProgressManager.save();
  }
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
    html += `<button class="test-q-btn ${i === 0 ? 'current' : ''} ${isAttempted ? 'attempted' : ''}" id="tqBtn${i}" onclick="switchTestQuestion(${i})"><span class="q-prefix">Q</span>${i+1}</button>`;
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
    1: 'Day01topic2/New_Day1Part2audio21.mp3',
    2: 'Day01topic2/New_Day1Part2audio22.mp3'
  },
  'day03': {
    1: 'Day01topic3/New_Day1Part3Question01.mp3',
    2: 'Day01topic3/New_Day1Part3Question02.mp3'
  }
};

// Map per day → question id → { src, code, startAt (seconds), charInterval (ms) }
const questionSolutionMap = {
  'day01': {
    1: { src: 'New_Day1Part1Question02.mp3', code: 'SELECT * FROM employees;', startAt: 1.5, charInterval: 110 }
  },
  'day02': {
    1: { src: 'Day01topic2/New_Day1Part2Question01.mp3', code: 'SELECT name, department FROM employees;', startAt: 1.5, charInterval: 110 },
    2: { src: 'Day01topic2/New_Day1Part2Question02.mp3', code: '', startAt: 0, charInterval: 0 }
  },
  'day03': {
    1: { src: 'Day01topic3/New_Day1Part3Question01_sol.mp3', code: 'SELECT name AS Employee_Name, salary AS Monthly_Salary FROM employees;', startAt: 1.5, charInterval: 110 },
    2: { src: 'Day01topic3/New_Day1Part3Question02_sol.mp3', code: 'SELECT name, salary * 1.15 AS new_salary FROM employees;', startAt: 1.5, charInterval: 110 }
  }
};

let typewriterTimers = []; // pending typewriter timeouts for cancellation

function cancelTypewriter() {
  typewriterTimers.forEach(t => clearTimeout(t));
  typewriterTimers = [];
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

// Helper: jump the combined system to a specific track by src filename, returns audio or null
function syncCombinedToTrack(srcFilename) {
  initSlideNarration(); // ensure combinedAudios is initialised
  const idx = combinedTracks.findIndex(t => t.src === srcFilename);
  if (idx === -1) return null;

  // Pause currently playing combined track
  if (isCombinedPlaying) {
    combinedAudios[combinedTrackIndex].pause();
    isCombinedPlaying = false;
  }
  if (playProgressInterval) clearInterval(playProgressInterval);

  // Rewind old track
  combinedAudios[combinedTrackIndex].currentTime = 0;

  // Switch to the target track
  combinedTrackIndex = idx;
  combinedAudios[idx].currentTime = 0;
  isCombinedPlaying = true;
  updatePlayButtonStates(true);
  startProgressLoop();
  return combinedAudios[idx];
}

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


  // Schedule typewriter: one char every charInterval ms starting at startAt seconds
  const startDelay = startAt * 1000;
  const chars = code.split('');
  let typed = '';

  chars.forEach((char, i) => {
    const t = setTimeout(() => {
      typed += char;
      if (mainEditor) {
        mainEditor.setValue(typed);
        const lastLine = mainEditor.lastLine();
        mainEditor.setCursor({ line: lastLine, ch: mainEditor.getLine(lastLine).length });
      }

      // After the last character is typed — run query + scroll result into view
      if (i === chars.length - 1) {
        setTimeout(() => {
          runCurrentQuery();
          setTimeout(() => {
            const outputEl = document.getElementById('mainOutput');
            if (outputEl) {
              outputEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
          }, 350);
        }, 400);
      }
    }, startDelay + i * charInterval);
    typewriterTimers.push(t);
  });

  // ── Table cinematic scroll: start at 13.5s, scroll slowly until audio ends ──
  let tableScrollInterval = null;
  const tableScrollStartDelay = 13500; // ms from audio start

  const tableScrollTimer = setTimeout(() => {
    const outputEl = document.getElementById('mainOutput');
    if (!outputEl) return;

    // Scroll the table slowly downward (1px every 40ms ≈ 25px/s)
    tableScrollInterval = setInterval(() => {
      const atBottom = outputEl.scrollTop + outputEl.clientHeight >= outputEl.scrollHeight - 2;
      if (atBottom) {
        clearInterval(tableScrollInterval);
      } else {
        outputEl.scrollTop += 1;
      }
    }, 40);
  }, tableScrollStartDelay);
  typewriterTimers.push(tableScrollTimer); // tracked so cancelTypewriter() stops it too

  audio.onended = () => {
    if (tableScrollInterval) clearInterval(tableScrollInterval);
    if (btn) {
      btn.innerHTML = `<svg class="play-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`;
      btn.classList.remove('playing');
    }
    cancelTypewriter();
    currentPlayingAudio = null;
    currentPlayingBtn = null;
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
    outputEl.innerHTML = `<div class="output-label">Terminal Output</div><span class="output-success">System: SQLite database ready. Table 'employees' loaded.</span>`;
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
    // Show loading placeholder
    const slideContent = document.getElementById('slideBodyText');
    if (slideContent) {
      const dayNum = dayId.replace('day', 'Day ');
      slideContent.innerHTML = `
        <div style="padding:32px;text-align:center;color:#8c92ac;">
          <div style="font-size:48px;margin-bottom:16px;">🚧</div>
          <h3 style="color:#e2e8f0;margin:0 0 8px 0;">${dayNum} Loading…</h3>
          <p style="margin:0;font-size:0.85rem;">Loading day content module. Please wait or refresh.</p>
        </div>`;
    }
    // Lazy-load the content script
    const dayNum = parseInt(dayId.replace('day', ''), 10);
    const script = document.createElement('script');
    script.src = `/Version-3/content/day-${String(dayNum).padStart(2, '0')}.js?v=13.8`;
    script.onload = () => {
      // Re-run now that module is loaded
      loadDayContent(dayId);
    };
    script.onerror = () => {
      const slideContent = document.getElementById('slideBodyText');
      if (slideContent) {
        slideContent.innerHTML = `<div style="padding:32px;text-align:center;color:#ef4444;"><p>Failed to load Day ${dayNum} content.</p></div>`;
      }
    };
    document.head.appendChild(script);
    return;
  }

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
      return `<option value="${i}">${multiTopic ? `Topic ${String(i+1).padStart(2,'0')}: ` : ''}${cleaned}</option>`;
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

  // Transition animation
  const ws = document.getElementById('workspaceContainer');
  if (ws) {
    ws.classList.add('day-transition');
    ws.style.opacity = '1';
    ws.style.filter = 'none';
    ws.style.transform = 'none';
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

    await initDatabase();
    initMainEditor();

    // Eagerly load the manifest so accurate durations are available immediately
    loadManifest().catch(() => {}); // Non-blocking — fallback durations already set

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

    // Init IndexedDB and load bookmarks
    await openIDB();
    await loadBookmarks();

    // Set initial arrows based on layout size
    updateDividerArrows();

    // Keyboard shortcuts
    initKeyboardShortcuts();

    // Handle daySelect change
    document.getElementById('daySelect')?.addEventListener('change', function() {
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
    document.getElementById('mainOutput').innerHTML = `<div class="output-label">System Error</div><span class="output-error">Failed to initialize: ${escHtml(err.message)}</span>`;
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
  const mapEntry = slideTrackMap[idx];
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

const slideTrackMap = {
  0: { tracks: topic01Tracks, durations: topic01Durations },
  1: { tracks: topic02Tracks, durations: topic02Durations },
  2: { tracks: topic03Tracks, durations: topic03Durations }
};

let combinedTrackDurations = slideTrackMap[0].durations;
let combinedTracks = slideTrackMap[0].tracks;

const AUDIO_CDN_BASE = "/Version-3";
let manifest = {};

// Slide Progress History state variables
let slideProgressHistory = {};
let lastActiveSlideIndex = 0;
let lastActiveDay = 'day01';
let pendingAudioStartTime = 0;

// Compute totalCombinedDuration immediately from hardcoded fallbacks so the
// progress bar shows a real duration even before the manifest has loaded.
totalCombinedDuration = combinedTrackDurations.reduce((a, b) => a + b, 0);
let activeAudioInstance = null;
let currentGeneration = 0;
let nextTrackPrefetch = null;
let prefetchedForIndex = null;
let prefetchFailed = false;
let hasCompletedFirstGestureBoundPlay = false;

async function loadManifest() {
  if (Object.keys(manifest).length > 0) return;
  try {
    const res = await fetch('/Version-3/manifest.json');
    manifest = await res.json();
    // Re-calculate durations from manifest metadata for all slides
    Object.keys(slideTrackMap).forEach(key => {
      const config = slideTrackMap[key];
      config.tracks.forEach((t, index) => {
        const filename = t.src.split('/').pop().replace('.mp3', '');
        const trackId = `day01_${filename}`;
        const entry = manifest[trackId];
        if (entry && entry.durationMs) {
          config.durations[index] = entry.durationMs / 1000;
        }
      });
    });
    totalCombinedDuration = combinedTrackDurations.reduce((a, b) => a + b, 0);
    updateProgressUI();
    initCustomDropdowns();
  } catch (err) {
    console.log('Using default durations fallback:', err);
    totalCombinedDuration = combinedTrackDurations.reduce((a, b) => a + b, 0);
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

async function loadAndPlayTrack(index, targetTime = 0) {
  const myGeneration = ++currentGeneration;

  if (activeAudioInstance) {
    activeAudioInstance.pause();
    activeAudioInstance.src = "";
    activeAudioInstance.load();
    activeAudioInstance = null;
  }

  await loadManifest();

  combinedTrackIndex = index;
  let elapsedBefore = 0;
  for (let i = 0; i < index; i++) {
    elapsedBefore += combinedTrackDurations[i] || 0;
  }
  currentCombinedTime = elapsedBefore + targetTime;
  updateProgressUI();
  const track = combinedTracks[index];
  const filename = track.src.split('/').pop().replace('.mp3', '');
  const trackId = `day01_${filename}`;
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
    audio.currentTime = targetTime;
  }

  // Load events lazily
  const events = await loadTrackEvents(trackId);

  audio.addEventListener('ended', () => {
    if (myGeneration !== currentGeneration) return;
    onNarrationSegmentEnded(index, events);
  });

  audio.addEventListener('timeupdate', () => {
    if (myGeneration !== currentGeneration) return;
    
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
  if (track.type === 'question') {
    isNarrationActive = false;
    if (typeof clearSlidePlaybackVisibility === 'function') clearSlidePlaybackVisibility();
    const targetQIdx = COURSE_CONFIG.practiceQuestions.findIndex(q => q.id === track.qId);
    if (targetQIdx !== -1 && targetQIdx !== currentPracticeQ) {
      clearOutputSection();
      currentPracticeQ = targetQIdx;
      renderPracticeQuestion();
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
    }
    const solMap = questionSolutionMap[currentDay] || questionSolutionMap['day01'];
    const solEntry = solMap ? solMap[track.qId] : null;
    if (solEntry) {
      if (mainEditor) { mainEditor.setValue(''); mainEditor.focus(); }
      cancelTypewriter();
      const speed = typeof currentPlaybackSpeed !== 'undefined' ? currentPlaybackSpeed : 1.0;
      const startDelay = ((solEntry.startAt || 1.5) * 1000) / speed;
      const charInterval = (solEntry.charInterval || 70) / speed;
      const chars = solEntry.code.split('');
      let typed = '';
      chars.forEach((char, i) => {
        const t = setTimeout(() => {
          typed += char;
          if (mainEditor) {
            mainEditor.setValue(typed);
            const lastLine = mainEditor.lastLine();
            mainEditor.setCursor({ line: lastLine, ch: mainEditor.getLine(lastLine).length });
          }
          if (i === chars.length - 1) {
            setTimeout(() => {
              runCurrentQuery();
              setTimeout(() => {
                const outputEl = document.getElementById('mainOutput');
                if (outputEl) outputEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
              }, 350 / speed);
            }, 400 / speed);
          }
        }, startDelay + i * charInterval);
        typewriterTimers.push(t);
      });
      // Table scroll at 13.5s
      let tableScrollInterval = null;
      const tst = setTimeout(() => {
        const outputEl = document.getElementById('mainOutput');
        if (!outputEl) return;
        tableScrollInterval = setInterval(() => {
          if (outputEl.scrollTop + outputEl.clientHeight >= outputEl.scrollHeight - 2) {
            clearInterval(tableScrollInterval);
          } else { outputEl.scrollTop += 1; }
        }, 40);
      }, 13500 / speed);
      typewriterTimers.push(tst);
      
      // Clean up table scroll when active track ends
      audio.addEventListener('ended', () => { if (tableScrollInterval) clearInterval(tableScrollInterval); }, { once: true });
    }

    // Auto switch to SQL Sandbox tab on mobile
    setMobileTab('practice');
    
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
    const trackId = `day01_${nextTrack.src.replace('.mp3', '')}`;
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

function retryOrShowError(index, generation, reason = 'network', attempt = 1) {
  const MAX_ATTEMPTS = 3;
  if (reason !== 'network' && !hasCompletedFirstGestureBoundPlay) {
    showTapToPlayFallback(index);
    return;
  }
  if (attempt > MAX_ATTEMPTS) {
    console.log("Audio loading failed after retries.");
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
    if (btnTheory) btnTheory.classList.add('active');
    if (btnPractice) btnPractice.classList.remove('active');
  } else if (tab === 'practice') {
    container.classList.remove('mobile-show-theory');
    container.classList.add('mobile-show-practice');
    if (btnPractice) btnPractice.classList.add('active');
    if (btnTheory) btnTheory.classList.remove('active');
    
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
  loadManifest().catch(() => {});

  // Populate combinedAudios[] — required by syncCombinedToTrack(), playQuestionAudio()
  // and playSolutionAudio() which address individual tracks by index.
  // We check if combinedAudios matches current combinedTracks length to see if we need to rebuild
  if (combinedAudios && combinedAudios.length === combinedTracks.length) return;

  combinedAudios = combinedTracks.map(track => {
    const filename = track.src.split('/').pop().replace('.mp3', '');
    const trackId = `day01_${filename}`;
    const entry = manifest[trackId] || { audioPath: track.src };
    const url = getAudioUrl(entry);
    const audio = new Audio(url);
    audio.preload = "none"; // lazy — don't pre-download all files on page load
    return audio;
  });

  const seekBar = document.getElementById('seekBar');
  if (seekBar && !seekBar.dataset.scrubbingBound) {
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
      navBtn.innerHTML = `<span class="btn-icon">⏸</span> <span class="btn-text">Pause Lesson</span>`;
      navBtn.classList.add('playing');
    } else {
      navBtn.innerHTML = `<span class="btn-icon">▶</span> <span class="btn-text">Play Lesson</span>`;
      navBtn.classList.remove('playing');
    }
  }

  const playPauseBtn = document.getElementById('playPauseBtn');
  if (playPauseBtn) {
    playPauseBtn.textContent = isPlaying ? '⏸' : '▶';
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
  if (activeAudioInstance) {
    activeAudioInstance.play()
      .then(() => {
        updatePlayButtonStates(true);
        // Re-apply focus filter AND scroll back on resume
        if (isNarrationActive) {
          const activeTrack = combinedTracks[combinedTrackIndex];
          if (activeTrack && activeTrack.target) {
            scrollToTarget(activeTrack.target);
          }
        }
      })
      .catch(err => console.log('Combined play error:', err));
  } else {
    loadAndPlayTrack(combinedTrackIndex, pendingAudioStartTime);
    pendingAudioStartTime = 0;
  }
}

function pauseCombinedPlayback() {
  isCombinedPlaying = false;
  if (activeAudioInstance) {
    activeAudioInstance.pause();
  }
  updatePlayButtonStates(false);
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

function clearSlidePlaybackVisibility() {
  const containers = [
    document.getElementById('slideBodyText'),
    document.getElementById('presentSlideContent')
  ].filter(Boolean);

  containers.forEach(container => {
    container.classList.remove('playback-active');
    const allElements = container.querySelectorAll('*');
    allElements.forEach(el => {
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

function updateSlidePlaybackVisibility(targetSelector) {
  const containers = [
    document.getElementById('slideBodyText'),
    document.getElementById('presentSlideContent')
  ].filter(Boolean);

  containers.forEach(container => {
    if (typeof isCombinedPlaying === 'undefined' || !isCombinedPlaying) {
      container.classList.remove('playback-active');
      container.querySelectorAll('*').forEach(el => {
        el.style.display = '';
        el.style.opacity = '';
      });
      return;
    }

    container.classList.add('playback-active');

    // Find the target element inside this container
    const targetEl = container.querySelector(targetSelector);
    if (!targetEl) return;

    // Reset all elements in this container first
    container.querySelectorAll('*').forEach(el => {
      el.style.display = '';
      el.style.opacity = '';
    });

    // Find the active section wrapper (.slide-section) that contains targetEl
    const activeSection = targetEl.closest('.slide-section');
    if (!activeSection) {
      container.querySelectorAll('.slide-section').forEach(s => s.style.display = '');
      return;
    }

    // Hide all other .slide-section wrappers, show only the active one
    container.querySelectorAll('.slide-section').forEach(section => {
      section.style.display = (section === activeSection) ? '' : 'none';
    });

    // Keep the main heading (H2) at the top of the slide always visible
    const h2 = container.querySelector('h2');
    if (h2) h2.style.display = '';

    // ── Chronological sub-target filtering ──
    // For each unique track target inside this section, if its first
    // track index is AFTER the current track, hide its visual block.
    const processedTargets = new Set();
    combinedTracks.forEach((track, idx) => {
      if (!track.target || !track.target.startsWith('#')) return;
      if (processedTargets.has(track.target)) return;
      processedTargets.add(track.target);

      const el = activeSection.querySelector(track.target);
      if (!el) return;

      if (idx > combinedTrackIndex) {
        // Walk up to find the logical block (tr, .vs-card, or element itself)
        const blockToHide = getVisibilityBlock(el, activeSection);
        blockToHide.style.display = 'none';

        // Also hide preceding <hr> dividers
        const prev = blockToHide.previousElementSibling;
        if (prev && prev.tagName === 'HR') {
          prev.style.display = 'none';
        }
      }
    });

    // ── Clean up empty parent containers ──
    // If all children of a .vs-block are hidden, hide the .vs-block itself
    activeSection.querySelectorAll('.vs-block').forEach(block => {
      const hasVisible = Array.from(block.children).some(c => c.style.display !== 'none');
      if (!hasVisible) block.style.display = 'none';
    });

    // If all <tbody> rows of a table are hidden, hide the table wrapper
    activeSection.querySelectorAll('.db-mock-table-wrap').forEach(wrap => {
      const tbody = wrap.querySelector('tbody');
      if (!tbody) return;
      const hasVisibleRow = Array.from(tbody.querySelectorAll('tr')).some(r => r.style.display !== 'none');
      if (!hasVisibleRow) wrap.style.display = 'none';
    });
  });
}

// Global Keyboard Shortcuts for Playback control
document.addEventListener('keydown', (e) => {
  if (!e.target) return;
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.closest('.CodeMirror')) return;

  if (e.key === ' ' || e.key === 'k') {
    e.preventDefault();
    toggleCombinedPlayback();
  } else if (e.key === 'ArrowLeft' || e.key === 'j') {
    e.preventDefault();
    seekCombinedPlayback(Math.max(0, currentCombinedTime - 5));
  } else if (e.key === 'ArrowRight' || e.key === 'l') {
    e.preventDefault();
    seekCombinedPlayback(Math.min(totalCombinedDuration, currentCombinedTime + 5));
  }
});

