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
// ═══════════════════════════════════════════════════════════════
// MANODEMY ACCESS CONTROL, GUEST SANDBOX & AD TELEMETRY
// ═══════════════════════════════════════════════════════════════

function isAdminUser() {
  if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) return true;
  try {
    const cachedEmail = (localStorage.getItem('manodemy_user_email') || '').toLowerCase();
    if (cachedEmail === 'manodamy25@gmail.com' || cachedEmail.includes('manodemy') || cachedEmail.includes('manodamy')) return true;
    const supaData = localStorage.getItem('sb-erqoyvbuhmkyvcqgwcbz-auth-token');
    if (supaData) {
      const parsed = JSON.parse(supaData);
      const email = (parsed?.user?.email || '').toLowerCase();
      if (email === 'manodamy25@gmail.com' || email.includes('manodemy') || email.includes('manodamy')) return true;
      if (parsed?.user?.user_metadata?.role === 'admin' || parsed?.user?.user_metadata?.plan === 'admin') return true;
    }
  } catch (e) {}
  return false;
}

function isPaidUser() {
  if (isAdminUser()) return true;
  if (localStorage.getItem('manodemy_enrolled') === 'true') return true;
  try {
    const supaData = localStorage.getItem('sb-erqoyvbuhmkyvcqgwcbz-auth-token');
    if (supaData) {
      const parsed = JSON.parse(supaData);
      if (parsed?.user?.user_metadata?.plan === 'pro') return true;
    }
  } catch (e) {}
  return false;
}

// Guest Reel Pass Parameters
const URL_PARAMS = new URLSearchParams(window.location.search);
const REEL_QUESTION_PARAM = URL_PARAMS.get('q') || URL_PARAMS.get('question');
const REEL_DAY_PARAM = parseInt(URL_PARAMS.get('day') || '1', 10);
const IS_GUEST_REEL = Boolean((REEL_QUESTION_PARAM || URL_PARAMS.get('challenge') || URL_PARAMS.get('reel') || URL_PARAMS.get('utm_campaign')) && !URL_PARAMS.has('admin_override'));
const ALLOWED_GUEST_QUESTION_NUM = IS_GUEST_REEL ? parseInt(REEL_QUESTION_PARAM || '1', 10) : null;

function showGuestPaywallModal(featureTitle = 'this feature') {
  let modal = document.getElementById('manodemyPaywallModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'manodemyPaywallModal';
    modal.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(6,9,19,0.85);backdrop-filter:blur(14px);z-index:999999;display:flex;align-items:center;justify-content:center;padding:1.5rem;animation:fadeIn 0.25s ease;';
    modal.innerHTML = `
      <div style="background:linear-gradient(145deg, #0d1226, #161c38);border:1px solid rgba(0,230,246,0.45);border-radius:24px;max-width:480px;width:100%;padding:2.5rem 2rem;text-align:center;box-shadow:0 30px 80px rgba(0,0,0,0.85), 0 0 40px rgba(0,230,246,0.25);position:relative;color:#fff;font-family:Inter,sans-serif;">
        <button onclick="document.getElementById('manodemyPaywallModal').remove()" style="position:absolute;top:16px;right:16px;background:rgba(255,255,255,0.08);border:none;color:#94a3b8;width:32px;height:32px;border-radius:50%;cursor:pointer;font-size:16px;display:flex;align-items:center;justify-content:center;">✕</button>
        <div style="font-size:3.5rem;margin-bottom:1rem;">🔒</div>
        <h2 style="font-size:1.65rem;font-weight:900;margin-bottom:0.6rem;background:linear-gradient(135deg, #00e6f6, #a855f7);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">Unlock All 60 Days</h2>
        <p style="color:#94a3b8;font-size:0.92rem;line-height:1.6;margin-bottom:2rem;">
          You're previewing a free challenge question. Enroll in the <strong>Complete Data Analytics Masterclass</strong> to unlock all 60 days of SQL, Excel & Python, audio narration, interactive slides & verified certificate!
        </p>
        <a href="/landing_v2/index.html#pricing" style="display:inline-flex;align-items:center;justify-content:center;gap:0.5rem;width:100%;padding:14px 24px;background:linear-gradient(135deg, #00e6f6, #a855f7);color:#060913;font-weight:800;font-size:1.05rem;border-radius:14px;text-decoration:none;box-shadow:0 8px 30px rgba(0,230,246,0.4);transition:transform 0.2s;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='none'">
          🚀 Enroll Now & Unlock Everything →
        </a>
        <p style="margin-top:1.2rem;font-size:0.78rem;color:#64748b;">Instant Lifetime Access • 750+ Real Interview Questions • Verified Certificate</p>
      </div>
    `;
    document.body.appendChild(modal);
  }
}

// ─── Real-Time Ad Intelligence & Attribution Engine ───
// Attribution Precedence: First-touch for signup, Last-touch for session & checkout revenue
(function initAdCampaignAttribution() {
  // CRITICAL: If running inside an iframe (e.g. landing page live preview), NEVER fire external campaign click!
  if (window.self !== window.top) return;

  const urlParams = new URLSearchParams(window.location.search);
  const utmCamp = urlParams.get('utm_campaign') || urlParams.get('campaign') || urlParams.get('ref') || urlParams.get('c');
  if (!utmCamp) return; // Only track when an explicit campaign is in the URL

  const utmSource = urlParams.get('utm_source') || (document.referrer.includes('instagram.com') ? 'instagram' : 'direct');
  const utmMedium = urlParams.get('utm_medium') || 'reels';

  const campaignName = utmCamp.toLowerCase().trim();

  // Persistent visitor_id with cookie + localStorage backing
  let visitorId = localStorage.getItem('manodemy_visitor_id');
  if (!visitorId) {
    const cookieMatch = document.cookie.match(/(?:^|; )manodemy_visitor_id=([^;]*)/);
    if (cookieMatch) visitorId = decodeURIComponent(cookieMatch[1]);
  }
  if (!visitorId) {
    visitorId = 'vis_' + Math.random().toString(36).substring(2, 11) + Date.now().toString(36);
    localStorage.setItem('manodemy_visitor_id', visitorId);
  }
  document.cookie = `manodemy_visitor_id=${visitorId}; path=/; max-age=2592000; SameSite=Lax`;

  // First-Touch vs Last-Touch persistence
  const existingFirst = localStorage.getItem('manodemy_first_campaign');
  if (!existingFirst && campaignName !== 'organic_untracked') {
    localStorage.setItem('manodemy_first_campaign', campaignName);
    document.cookie = `manodemy_first_campaign=${campaignName}; path=/; max-age=2592000; SameSite=Lax`;
  }
  if (campaignName !== 'organic_untracked') {
    localStorage.setItem('manodemy_last_campaign', campaignName);
    document.cookie = `manodemy_last_campaign=${campaignName}; path=/; max-age=2592000; SameSite=Lax`;
  }

  // Direct REST RPC Call with 30-Minute Rolling Session Debounce
  const SUPA_URL = 'https://erqoyvbuhmkyvcqgwcbz.supabase.co';
  const SUPA_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVycW95dmJ1aG1reXZjcWd3Y2J6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkzODk1MTIsImV4cCI6MjA5NDk2NTUxMn0.9UnIfq8xMrKANPPTtoOADKH-NJ_it9HDp7xrJL4FXtw';

  if (campaignName && campaignName !== 'organic_untracked') {
    const debounceKey = `manodemy_last_click_${campaignName}`;
    const lastTrackTime = parseInt(sessionStorage.getItem(debounceKey) || '0', 10);
    const now = Date.now();
    const isDebounced = (now - lastTrackTime < 20000);
    const isEdgeTracked = document.cookie.includes('manodemy_edge_tracked=1');

    if (isEdgeTracked) {
      sessionStorage.setItem(debounceKey, now.toString());
      document.cookie = 'manodemy_edge_tracked=; path=/; max-age=0; SameSite=Lax';
    } else if (!isDebounced) {
      sessionStorage.setItem(debounceKey, now.toString());

      try {
        fetch(`${SUPA_URL}/rest/v1/campaign_clicks`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': SUPA_KEY,
            'Authorization': `Bearer ${SUPA_KEY}`,
            'Prefer': 'return=minimal'
          },
          body: JSON.stringify({
            campaign_name: campaignName,
            source: utmSource,
            visitor_id: visitorId
          })
        }).then(r => {
          if (r.ok) {
            console.log('[Attribution] ✅ Click logged to campaign_clicks:', campaignName);
          }
        }).catch(err => {
          console.warn('[Attribution] REST call notice:', err);
        });
      } catch (err) {
        console.warn('[Attribution] Direct fetch notice:', err);
      }
    }
  }
})();

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
  if (!db) {
    if (typeof SQL_INSTANCE !== 'undefined' && SQL_INSTANCE) {
      loadDatabaseSeed('retail');
    } else {
      throw new Error('Database is still initializing. Please wait a moment.');
    }
  }
  const trimmed = query.trim();
  if (!trimmed) throw new Error('SQL query cannot be empty.');

  try {
    const results = db.exec(trimmed);
    if (results.length === 0) return { columns: [], values: [], message: 'Query executed successfully. No rows returned.' };
    return { columns: results[0].columns, values: results[0].values };
  } catch (err) {
    // 🛡️ Autonomous Self-Healing Interceptor: Check for missing tables (e.g. "no such table: coupons")
    const noTableMatch = err && err.message && err.message.match(/no such table:\s*([a-zA-Z0-9_]+)/i);
    if (noTableMatch && window.DB_SEEDS) {
      const missingTable = noTableMatch[1].toLowerCase();
      let provisioned = false;
      for (const key of Object.keys(window.DB_SEEDS)) {
        const sDef = window.DB_SEEDS[key];
        if (sDef && sDef.tables) {
          const tDef = sDef.tables.find(t => t.name.toLowerCase() === missingTable);
          if (tDef) {
            try {
              if (tDef.createSQL) db.run(tDef.createSQL);
              if (tDef.seedSQL) db.run(tDef.seedSQL);
              provisioned = true;
              console.log(`[Auto-Provision Shield] 🛡️ Auto-provisioned missing table '${missingTable}' on the fly.`);
            } catch (e) {
              console.warn('[Auto-Provision Shield] Table provision warning:', e);
            }
          }
        }
      }
      if (provisioned) {
        // Re-execute after auto-provisioning
        const retriedResults = db.exec(trimmed);
        if (retriedResults.length === 0) return { columns: [], values: [], message: 'Query executed successfully. No rows returned.' };
        return { columns: retriedResults[0].columns, values: retriedResults[0].values };
      }
    }
    throw err;
  }
}

function getSchemaInfo() {
  const info = {};
  
  // 1. From COURSE_CONFIG schema definitions
  if (COURSE_CONFIG && COURSE_CONFIG.schema && COURSE_CONFIG.schema.tables) {
    COURSE_CONFIG.schema.tables.forEach(t => {
      if (t && t.name && t.columns) {
        info[t.name] = t.columns.map(c => c.name);
      }
    });
  }

  // 2. Always register SQLite system master schema
  info['sqlite_master'] = ['type', 'name', 'tbl_name', 'rootpage', 'sql'];
  info['sqlite_schema'] = ['type', 'name', 'tbl_name', 'rootpage', 'sql'];

  // 3. Introspect live SQLite database if initialized
  if (typeof db !== 'undefined' && db) {
    try {
      const res = db.exec("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'");
      if (res && res[0] && res[0].values) {
        res[0].values.forEach(row => {
          const tName = row[0];
          if (!info[tName]) {
            try {
              const colRes = db.exec(`PRAGMA table_info(${tName})`);
              if (colRes && colRes[0] && colRes[0].values) {
                info[tName] = colRes[0].values.map(cRow => cRow[1]);
              }
            } catch (e) {}
          }
        });
      }
    } catch (e) {}
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

let currentActiveCoachFix = null;

function renderError(msg, hintObj, targetId) {
  const el = document.getElementById(targetId);
  if (!el) return;

  let hintHtml = '';
  if (hintObj) {
    const hintText = typeof hintObj === 'string' ? hintObj : hintObj.hint;
    const headerText = (typeof hintObj === 'object' && hintObj.header) ? `💡 SQL Coach: ${escHtml(hintObj.header)}` : '💡 SQL Coach Hint';
    
    let actionBtnHtml = '';
    if (typeof hintObj === 'object' && hintObj.actionLabel && (hintObj.suggestedFix || hintObj.actionReplace)) {
      currentActiveCoachFix = {
        targetId: targetId,
        suggestedFix: hintObj.suggestedFix,
        actionReplace: hintObj.actionReplace,
        actionLabel: hintObj.actionLabel
      };
      actionBtnHtml = `
        <div style="margin-top: 8px;">
          <button type="button" class="diag-fix-btn" onclick="applyCoachFix('${targetId}')" title="Click to auto-apply this fix to your SQL query">
            ⚡ ${escHtml(hintObj.actionLabel)}
          </button>
        </div>
      `;
    }

    hintHtml = `
      <div class="sql-diagnostic-card">
        <div class="diag-header">${headerText}</div>
        <div class="diag-body">${hintText}</div>
        ${actionBtnHtml}
      </div>
    `;
  }

  el.innerHTML = `
    <div class="output-label">Terminal Output</div>
    <div class="output-error" style="margin-top: 6px;">❌ SQLite Error: ${escHtml(msg)}</div>
    ${hintHtml}
  `;
}

function applyCoachFix(targetId) {
  if (!currentActiveCoachFix) return;
  const editor = (targetId === 'testOutput') ? testEditor : mainEditor;
  if (!editor) return;

  const currentCode = editor.getValue();
  let newCode = currentCode;

  if (currentActiveCoachFix.actionReplace) {
    const fromStr = currentActiveCoachFix.actionReplace.from;
    const toStr = currentActiveCoachFix.actionReplace.to;
    if (typeof fromStr === 'string') {
      newCode = currentCode.replace(fromStr, toStr);
    } else if (fromStr instanceof RegExp) {
      newCode = currentCode.replace(fromStr, toStr);
    }
  } else if (currentActiveCoachFix.suggestedFix) {
    if (newCode.trim().length === 0) {
      newCode = currentActiveCoachFix.suggestedFix;
    } else {
      newCode = newCode.trimEnd() + ' ' + currentActiveCoachFix.suggestedFix;
    }
  }

  editor.setValue(newCode);
  editor.focus();
  
  // Set cursor to end of code
  const lastLine = editor.lineCount() - 1;
  const lastCh = editor.getLine(lastLine).length;
  editor.setCursor({ line: lastLine, ch: lastCh });

  // Visual confirmation toast
  showCoachToast(`Applied fix: ${currentActiveCoachFix.actionLabel}`);
  
  // Automatically re-run the query with the fix applied
  setTimeout(() => {
    if (targetId === 'testOutput') {
      if (typeof runTestQuery === 'function') runTestQuery();
    } else {
      if (typeof runCurrentQuery === 'function') runCurrentQuery();
    }
  }, 120);
}

function showCoachToast(msg) {
  let toast = document.getElementById('coachToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'coachToast';
    toast.className = 'coach-toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `💡 ${escHtml(msg)}`;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2400);
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
let isProgrammaticTyping = false;

function initMainEditor() {
  const schema = getSchemaInfo();
  const hintTables = {};
  Object.keys(schema).forEach(t => { hintTables[t] = schema[t]; });

  mainEditor = CodeMirror(document.getElementById('mainEditorWrap'), {
    value: '',
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
    if (!isProgrammaticTyping) {
      pauseCombinedPlayback();
    }
  });
  mainEditor.on('change', (cm, change) => {
    if (!isProgrammaticTyping && isCombinedPlaying && change.origin && change.origin !== 'setValue') {
      pauseCombinedPlayback();
    }
  });
  document.getElementById('mainEditorWrap')?.addEventListener('click', () => {
    if (!isProgrammaticTyping) {
      pauseCombinedPlayback();
    }
  });
}

function initTestEditor() {
  const schema = getSchemaInfo();
  const hintTables = {};
  Object.keys(schema).forEach(t => { hintTables[t] = schema[t]; });

  testEditor = CodeMirror(document.getElementById('testEditorWrap'), {
    value: '',
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
  const msg = (rawError.message || String(rawError)).trim();
  const qTrim = query.trim();
  const allColumns = [];
  const allTables = [];
  
  const schema = getSchemaInfo();
  Object.keys(schema).forEach(tName => {
    allTables.push(tName);
    if (schema[tName]) {
      schema[tName].forEach(col => allColumns.push({ table: tName, name: col }));
    }
  });

  // Dynamically resolve target table from the active practice or test question
  let preferredTable = allTables.length > 0 ? allTables[0] : 'employees';
  if (COURSE_CONFIG && COURSE_CONFIG.practiceQuestions && COURSE_CONFIG.practiceQuestions[currentPracticeQ]) {
    const currentQ = COURSE_CONFIG.practiceQuestions[currentPracticeQ];
    const targetRef = currentQ.referenceSql || currentQ.ref || currentQ.prompt || '';
    const fromMatch = targetRef.match(/FROM\s+([a-zA-Z0-9_]+)/i) || targetRef.match(/<code>([a-zA-Z0-9_]+)<\/code>/i);
    if (fromMatch && allTables.includes(fromMatch[1])) {
      preferredTable = fromMatch[1];
    }
  }

  // ───────────────────────────────────────────────────────────────────────────
  // SECTION 1: TOPIC-SPECIFIC SEMANTIC TRAPS & AGGREGATE MISUSE (DAY 03, 04, 05)
  // ───────────────────────────────────────────────────────────────────────────

  // 1.1 Aggregates in WHERE Clause (Day 05)
  if (/misuse of aggregate/i.test(msg) || /WHERE\s+[a-zA-Z0-9_]*\s*(COUNT|SUM|AVG|MIN|MAX)\s*\(/i.test(query)) {
    const aggMatch = query.match(/WHERE\s+([\s\S]*?\b(COUNT|SUM|AVG|MIN|MAX)\s*\([\s\S]*?\)\s*([><=]+|IS|BETWEEN|IN)\s*[^;\n]+)/i);
    const aggCond = aggMatch ? aggMatch[1] : 'COUNT(*) > 1';
    return {
      type: 'aggregate_in_where',
      header: 'Aggregate in WHERE Clause',
      hint: `Aggregate functions (<code>COUNT</code>, <code>SUM</code>, <code>AVG</code>) cannot appear in a <code>WHERE</code> clause because <code>WHERE</code> filters individual rows <em>before</em> aggregation happens. Use <strong>HAVING</strong> to filter aggregate results instead!`,
      actionReplace: { from: new RegExp(`WHERE\\s+${escapeRegExp(aggCond)}`, 'i'), to: `HAVING ${aggCond}` },
      actionLabel: `Change 'WHERE' ➔ 'HAVING'`
    };
  }

  // 1.2 Nested Aggregate Functions (Day 05) - e.g. MAX(AVG(salary))
  if (/(MAX|MIN|AVG|SUM|COUNT)\s*\(\s*(MAX|MIN|AVG|SUM|COUNT)\s*\(/i.test(query)) {
    return {
      type: 'nested_aggregates',
      header: 'Nested Aggregate Function',
      hint: `SQL does not allow nesting aggregate functions directly (e.g. <code>MAX(AVG(...))</code>). To find the maximum of an average, compute the average in a subquery or Common Table Expression (CTE) first!`,
      actionLabel: `Separate into subquery`
    };
  }

  // 1.3 COUNT with multiple arguments (Day 05) - e.g. COUNT(id, name)
  if (/COUNT\s*\(\s*[a-zA-Z0-9_]+\s*,\s*[a-zA-Z0-9_]+\s*\)/i.test(query) || (msg.includes('wrong number of arguments') && /COUNT/i.test(query))) {
    return {
      type: 'count_multi_arg',
      header: 'Invalid Arguments for COUNT()',
      hint: `The <code>COUNT()</code> function only accepts a single column name or <code>*</code> (e.g. <code>COUNT(*)</code> or <code>COUNT(id)</code>).`,
      actionReplace: { from: /COUNT\s*\([^)]+\)/i, to: 'COUNT(*)' },
      actionLabel: `Change to 'COUNT(*)'`
    };
  }

  // 1.4 GROUP_CONCAT SEPARATOR (MySQL syntax in SQLite) (Day 05)
  if (/GROUP_CONCAT\s*\([\s\S]+?\bSEPARATOR\b/i.test(query)) {
    return {
      type: 'group_concat_separator',
      header: 'GROUP_CONCAT Syntax Mismatch',
      hint: `In SQLite, specify the delimiter as a second argument without the <code>SEPARATOR</code> keyword: <code>GROUP_CONCAT(col, ', ')</code>.`,
      actionReplace: { from: /\s+SEPARATOR\s+/i, to: ', ' },
      actionLabel: `Remove 'SEPARATOR' keyword`
    };
  }

  // 1.5 Equality with NULL (Day 03, 04) - e.g. WHERE salary = NULL
  if (/=\s*NULL\b/i.test(query)) {
    return {
      type: 'null_equality',
      header: 'Incorrect NULL Comparison',
      hint: `In SQL, <code>= NULL</code> always evaluates to UNKNOWN/FALSE because NULL represents missing data. Use <strong>IS NULL</strong> or <strong>IS NOT NULL</strong> instead.`,
      actionReplace: { from: '= NULL', to: 'IS NULL' },
      actionLabel: `Change '= NULL' ➔ 'IS NULL'`
    };
  }
  if (/(!=|<>)\s*NULL\b/i.test(query)) {
    return {
      type: 'null_inequality',
      header: 'Incorrect NOT NULL Comparison',
      hint: `In SQL, <code>!= NULL</code> or <code>&lt;&gt; NULL</code> fails to match. Use <strong>IS NOT NULL</strong> instead.`,
      actionReplace: { from: /(!=|<>)\s*NULL/i, to: 'IS NOT NULL' },
      actionLabel: `Change to 'IS NOT NULL'`
    };
  }

  // 1.6 String Concatenation with + instead of || (Day 04)
  if (/SELECT[\s\S]+?'\s*\+\s*'/i.test(query) || /SELECT[\s\S]+?[a-zA-Z0-9_]+\s*\+\s*'[\s\S]+?'/i.test(query)) {
    return {
      type: 'string_concat_plus',
      header: 'String Concatenation Syntax',
      hint: `In standard SQL and SQLite, concatenate strings using the pipe operator <code>||</code> (e.g. <code>first_name || ' ' || last_name</code>), not <code>+</code>.`,
      actionReplace: { from: '+', to: '||' },
      actionLabel: `Change '+' ➔ '||'`
    };
  }

  // 1.7 Python-style Chained Comparison (Day 03) - e.g. WHERE 50000 < salary < 100000
  if (/WHERE\s+[0-9'a-zA-Z_]+\s*[><=]+\s*[a-zA-Z0-9_]+\s*[><=]+\s*[0-9'a-zA-Z_]+/i.test(query)) {
    return {
      type: 'chained_comparison',
      header: 'Chained Comparison Trap',
      hint: `SQL does not support chained comparisons like <code>50 < salary < 100</code>. Connect two distinct comparisons with <strong>AND</strong>: <code>salary > 50 AND salary < 100</code> (or use <code>BETWEEN 50 AND 100</code>).`,
      actionLabel: `Use 'BETWEEN' or 'AND'`
    };
  }

  // 1.8 BETWEEN with OR (Day 03) - e.g. BETWEEN 10 OR 20
  if (/BETWEEN\s+[0-9'a-zA-Z_]+\s+OR\s+/i.test(query)) {
    return {
      type: 'between_or_syntax',
      header: 'BETWEEN Operator Syntax',
      hint: `The <code>BETWEEN</code> operator connects its boundary values with <strong>AND</strong>, not <code>OR</code> (e.g. <code>BETWEEN 1000 AND 5000</code>).`,
      actionReplace: { from: /\bBETWEEN\s+([0-9'a-zA-Z_]+)\s+OR\s+/i, to: 'BETWEEN $1 AND ' },
      actionLabel: `Change 'OR' ➔ 'AND'`
    };
  }

  // 1.9 LIKE with Regex Wildcards * or ? (Day 03)
  if (/LIKE\s+'[^']*\*[^']*'/i.test(query)) {
    return {
      type: 'like_asterisk_wildcard',
      header: 'LIKE Wildcard Mismatch',
      hint: `In SQL <code>LIKE</code> clauses, use <code>%</code> for multi-character matching (not <code>*</code>) and <code>_</code> for single characters (not <code>?</code>).`,
      actionReplace: { from: '*', to: '%' },
      actionLabel: `Change '*' ➔ '%'`
    };
  }

  // 1.10 Spelled out ASCENDING / DESCENDING (Day 02)
  if (/\bDESCENDING\b/i.test(query)) {
    return {
      type: 'spelled_out_descending',
      header: 'Sorting Keyword Abbreviation',
      hint: `In SQL, sort direction is abbreviated as <strong>DESC</strong> (not <code>DESCENDING</code>).`,
      actionReplace: { from: /\bDESCENDING\b/i, to: 'DESC' },
      actionLabel: `Fix 'DESCENDING' ➔ 'DESC'`
    };
  }
  if (/\bASCENDING\b/i.test(query)) {
    return {
      type: 'spelled_out_ascending',
      header: 'Sorting Keyword Abbreviation',
      hint: `In SQL, sort direction is abbreviated as <strong>ASC</strong> (not <code>ASCENDING</code>).`,
      actionReplace: { from: /\bASCENDING\b/i, to: 'ASC' },
      actionLabel: `Fix 'ASCENDING' ➔ 'ASC'`
    };
  }

  // 1.11 SQL Server TOP instead of LIMIT (Day 02)
  if (/SELECT\s+TOP\s+([0-9]+)\s+/i.test(query)) {
    const topMatch = query.match(/SELECT\s+TOP\s+([0-9]+)\s+([\s\S]+)/i);
    const topNum = topMatch ? topMatch[1] : '5';
    return {
      type: 'sql_server_top',
      header: 'TOP vs LIMIT Dialect Syntax',
      hint: `<code>TOP</code> is specific to SQL Server. In SQLite and PostgreSQL, slice the first N rows using <strong>LIMIT ${topNum}</strong> at the end of the query.`,
      actionReplace: { from: new RegExp(`SELECT\\s+TOP\\s+${topNum}\\s+`, 'i'), to: 'SELECT ' },
      suggestedFix: `LIMIT ${topNum};`,
      actionLabel: `Convert TOP ${topNum} ➔ LIMIT ${topNum}`
    };
  }

  // 1.12 Order of Execution: ORDER BY before WHERE (Day 02, 03)
  if (/ORDER\s+BY[\s\S]+?WHERE/i.test(query)) {
    return {
      type: 'order_before_where',
      header: 'Clause Execution Order Violation',
      hint: `In SQL execution order, row filtering (<code>WHERE</code>) must always be written <strong>before</strong> sorting (<code>ORDER BY</code>).`,
      actionLabel: `Reorder: WHERE before ORDER BY`
    };
  }

  // 1.13 Order of Execution: LIMIT before ORDER BY (Day 02)
  if (/LIMIT[\s\S]+?ORDER\s+BY/i.test(query)) {
    return {
      type: 'limit_before_order',
      header: 'Clause Execution Order Violation',
      hint: `Sorting (<code>ORDER BY</code>) must come <strong>before</strong> row slicing (<code>LIMIT</code>) so SQL knows which top rows to return.`,
      actionLabel: `Reorder: ORDER BY before LIMIT`
    };
  }

  // 1.14 Assignment Operator := (Day 01, 03)
  if (/:=/i.test(query)) {
    return {
      type: 'assignment_operator',
      header: 'Invalid Assignment Operator',
      hint: `In SQL, filtering and comparisons use single equals <code>=</code>, not <code>:=</code>.`,
      actionReplace: { from: ':=', to: '=' },
      actionLabel: `Change ':=' ➔ '='`
    };
  }

  // ───────────────────────────────────────────────────────────────────────────
  // SECTION 2: RUNTIME SQLITE ERRORS (TABLE & COLUMN TYPOS)
  // ───────────────────────────────────────────────────────────────────────────

  // 2.1 Table Typo / Prefix / Substring Match (e.g. "no such table: em")
  const noSuchTable = msg.match(/no such table:\s*([a-zA-Z0-9_]+)/i);
  if (noSuchTable) {
    const typo = noSuchTable[1];
    let bestMatch = null;
    let bestDist = 999;
    
    // Exact prefix match (e.g. "em" -> "employees", "prod" -> "products")
    const prefixMatch = allTables.find(t => t.toLowerCase().startsWith(typo.toLowerCase()) || typo.toLowerCase().startsWith(t.toLowerCase()));
    if (prefixMatch) {
      bestMatch = prefixMatch;
    } else {
      // Fuzzy Levenshtein match
      allTables.forEach(tbl => {
        const d = levenshtein(typo.toLowerCase(), tbl.toLowerCase());
        if (d < bestDist) {
          bestDist = d;
          bestMatch = tbl;
        }
      });
      if (bestDist > Math.max(3, Math.floor(typo.length * 0.7)) && !bestMatch) {
        bestMatch = preferredTable;
      }
    }

    const resolvedTable = bestMatch || preferredTable;
    return {
      type: 'table_typo',
      header: 'Table Name Typo',
      hint: `Table <code>${escHtml(typo)}</code> does not exist in the database. Did you mean <strong><code>${escHtml(resolvedTable)}</code></strong>?`,
      suggestedFix: resolvedTable,
      actionReplace: { from: typo, to: resolvedTable },
      actionLabel: `Fix '${typo}' ➔ '${resolvedTable}'`
    };
  }

  // 2.2 Column Typo / Prefix / Unquoted String in WHERE (e.g. "no such column: sal")
  const noSuchCol = msg.match(/no such column:\s*([a-zA-Z0-9_]+)/i);
  if (noSuchCol) {
    const typo = noSuchCol[1];

    // Check if user forgot single quotes around a string literal in WHERE (e.g. WHERE department = Sales or status = Shipped)
    const unquotedWherePattern = new RegExp(`WHERE\\s+([a-zA-Z0-9_]+)\\s*=\\s*${typo}\\b`, 'i');
    const isUnquotedVal = unquotedWherePattern.test(query);
    if (isUnquotedVal && !allTables.includes(typo)) {
      return {
        type: 'missing_quotes',
        header: 'Unquoted Text Literal in WHERE',
        hint: `Text values in SQL must be enclosed in single quotes. Without quotes, SQLite looks for a column named <code>${escHtml(typo)}</code>. Try wrapping it in single quotes: <code>'${escHtml(typo)}'</code>.`,
        actionReplace: { from: `= ${typo}`, to: `= '${typo}'` },
        actionLabel: `Wrap '${typo}' in quotes`
      };
    }

    let bestMatch = null;
    let bestDist = 999;

    // Prefix match on columns
    const prefixCol = allColumns.find(c => c.name.toLowerCase().startsWith(typo.toLowerCase()) || typo.toLowerCase().startsWith(c.name.toLowerCase()));
    if (prefixCol) {
      bestMatch = prefixCol;
    } else {
      // Fuzzy match
      allColumns.forEach(c => {
        const d = levenshtein(typo.toLowerCase(), c.name.toLowerCase());
        if (d < bestDist) {
          bestDist = d;
          bestMatch = c;
        }
      });
    }

    if (bestMatch) {
      return {
        type: 'column_typo',
        header: 'Column Name Typo',
        hint: `Column <code>${escHtml(typo)}</code> does not exist in the database. Did you mean <strong><code>${escHtml(bestMatch.name)}</code></strong> (in table <em>${escHtml(bestMatch.table)}</em>)?`,
        suggestedFix: bestMatch.name,
        actionReplace: { from: typo, to: bestMatch.name },
        actionLabel: `Fix '${typo}' ➔ '${bestMatch.name}'`
      };
    }
  }

  // ───────────────────────────────────────────────────────────────────────────
  // SECTION 3: KEYWORD TYPOS (FORM -> FROM, SELEC -> SELECT, etc.)
  // ───────────────────────────────────────────────────────────────────────────
  const keywordTypos = [
    { typo: /\bFORM\b/i, wrong: 'FORM', correct: 'FROM' },
    { typo: /\bSELEC\b|\bSELEST\b|\bSELCT\b|\bSLCT\b/i, wrong: 'SELEST', correct: 'SELECT' },
    { typo: /\bWHER\b|\bWHRE\b|\bWHR\b/i, wrong: 'WHER', correct: 'WHERE' },
    { typo: /\bGRUP\s+BY\b|\bGROUPBY\b|\bGROP\s+BY\b/i, wrong: 'GRUP BY', correct: 'GROUP BY' },
    { typo: /\bORDERBY\b|\bODER\s+BY\b/i, wrong: 'ORDERBY', correct: 'ORDER BY' },
    { typo: /\bHAVNG\b|\bHAVIN\b/i, wrong: 'HAVNG', correct: 'HAVING' },
    { typo: /\bDISTINCTT\b|\bDISTINT\b|\bDISTICNT\b/i, wrong: 'DISTINT', correct: 'DISTINCT' },
    { typo: /\bINER\s+JOIN\b|\bINNERJOIN\b/i, wrong: 'INER JOIN', correct: 'INNER JOIN' },
    { typo: /\bLEFTJOIN\b/i, wrong: 'LEFTJOIN', correct: 'LEFT JOIN' },
    { typo: /\bLIMITT\b|\bLIMT\b/i, wrong: 'LIMITT', correct: 'LIMIT' },
    { typo: /\bCONUNT\b|\bCUONT\b|\bCOUTN\b/i, wrong: 'COUNT', correct: 'COUNT' },
    { typo: /\bAVERG\b|\bAVRG\b/i, wrong: 'AVG', correct: 'AVG' }
  ];

  for (const kt of keywordTypos) {
    if (kt.typo.test(query)) {
      const matchWord = query.match(kt.typo)[0];
      return {
        type: 'keyword_typo',
        header: 'Keyword Typo Detected',
        hint: `Looks like a typo in your SQL keyword: <code>${escHtml(matchWord)}</code>. Did you mean <strong>${kt.correct}</strong>?`,
        suggestedFix: kt.correct,
        actionReplace: { from: matchWord, to: kt.correct },
        actionLabel: `Fix '${matchWord}' ➔ '${kt.correct}'`
      };
    }
  }

  // ───────────────────────────────────────────────────────────────────────────
  // SECTION 4: INCOMPLETE INPUT & MISSING CLAUSES
  // ───────────────────────────────────────────────────────────────────────────
  if (msg.includes('incomplete input') || msg.includes('syntax error') || msg.includes('near')) {
    // 4.1 Query ends with FROM
    if (/FROM\s*$/i.test(qTrim)) {
      return {
        type: 'missing_table',
        header: 'Incomplete FROM Clause',
        hint: `You opened a <code>FROM</code> clause but haven't specified which table to query. What table do you want to select from?`,
        suggestedFix: preferredTable + ';',
        actionLabel: `Add '${preferredTable};'`
      };
    }

    // 4.2 Just SELECT or query ends with SELECT
    if (/SELECT\s*$/i.test(qTrim) || qTrim === 'SELECT') {
      return {
        type: 'missing_columns',
        header: 'Incomplete SELECT Statement',
        hint: `Specify what columns you want to retrieve. Use <code>*</code> for all columns, or list specific columns like <code>id, name</code>, followed by <code>FROM ${preferredTable};</code>`,
        suggestedFix: `* FROM ${preferredTable};`,
        actionLabel: `Add '* FROM ${preferredTable};'`
      };
    }

    // 4.3 Ends with WHERE
    if (/WHERE\s*$/i.test(qTrim)) {
      return {
        type: 'incomplete_where',
        header: 'Incomplete WHERE Filter',
        hint: `You added a <code>WHERE</code> clause but haven't provided a filter condition yet (e.g. <code>WHERE is_active = 1;</code>).`,
        suggestedFix: `is_active = 1;`,
        actionLabel: `Add sample condition`
      };
    }

    // 4.4 Ends with ORDER BY
    if (/ORDER\s+BY\s*$/i.test(qTrim)) {
      return {
        type: 'incomplete_order_by',
        header: 'Incomplete ORDER BY Clause',
        hint: `Specify which column you want to sort by (e.g. <code>ORDER BY salary DESC;</code> or <code>ORDER BY first_name ASC;</code>).`,
        suggestedFix: `salary DESC;`,
        actionLabel: `Add 'salary DESC;'`
      };
    }

    // 4.5 Ends with GROUP BY
    if (/GROUP\s+BY\s*$/i.test(qTrim)) {
      return {
        type: 'incomplete_group_by',
        header: 'Incomplete GROUP BY Clause',
        hint: `Specify which column you want to group rows by (e.g. <code>GROUP BY department_id;</code>).`,
        suggestedFix: `department_id;`,
        actionLabel: `Add 'department_id;'`
      };
    }

    // 4.6 Ends with HAVING
    if (/HAVING\s*$/i.test(qTrim)) {
      return {
        type: 'incomplete_having',
        header: 'Incomplete HAVING Clause',
        hint: `Specify the aggregate condition for your group (e.g. <code>HAVING COUNT(*) > 1;</code>).`,
        suggestedFix: `COUNT(*) > 1;`,
        actionLabel: `Add 'COUNT(*) > 1;'`
      };
    }

    // 4.7 Ends with LIMIT
    if (/LIMIT\s*$/i.test(qTrim)) {
      return {
        type: 'incomplete_limit',
        header: 'Incomplete LIMIT Clause',
        hint: `Specify how many rows to restrict the result set to (e.g. <code>LIMIT 5;</code>).`,
        suggestedFix: `5;`,
        actionLabel: `Add '5;'`
      };
    }

    // 4.8 Trailing comma before FROM (e.g. SELECT id, name, FROM employees;)
    const trailingCommaMatch = query.match(/,\s+FROM/i);
    if (trailingCommaMatch) {
      return {
        type: 'trailing_comma',
        header: 'Trailing Comma in SELECT',
        hint: `Syntax Error: You have an extra comma <code>,</code> before the <code>FROM</code> keyword. Remove the comma after your last column.`,
        actionReplace: { from: ', FROM', to: ' FROM' },
        actionLabel: `Remove extra comma`
      };
    }

    // 4.9 Unclosed single quote
    const singleQuotes = (query.match(/'/g) || []).length;
    if (singleQuotes % 2 !== 0) {
      return {
        type: 'unclosed_quote',
        header: 'Unclosed String Literal',
        hint: `You opened a text string with a single quote ( <code>'</code> ) but forgot to close it. Every text literal in SQL must start and end with single quotes.`,
        suggestedFix: `';`,
        actionLabel: `Add closing quote & semicolon`
      };
    }

    // 4.10 Unclosed parenthesis
    const openParens = (query.match(/\(/g) || []).length;
    const closeParens = (query.match(/\)/g) || []).length;
    if (openParens > closeParens) {
      return {
        type: 'unclosed_paren',
        header: 'Mismatched Parentheses',
        hint: `You opened a parenthesis <code>(</code> but haven't closed it. Make sure every opening parenthesis has a matching <code>)</code>.`,
        suggestedFix: `);`,
        actionLabel: `Add closing ')'`
      };
    }

    // 4.11 Premature semicolon before FROM
    if (/;\s*SELECT|;\s*FROM/i.test(query)) {
      return {
        type: 'premature_semicolon',
        header: 'Premature Semicolon',
        hint: `A semicolon <code>;</code> ends the entire SQL statement. Remove the semicolon from the middle of your query.`,
        actionReplace: { from: ';', to: '' },
        actionLabel: `Remove premature semicolon`
      };
    }
  }

  // ───────────────────────────────────────────────────────────────────────────
  // SECTION 5: MISSING FROM CLAUSE
  // ───────────────────────────────────────────────────────────────────────────
  if (/SELECT/i.test(query) && !/FROM/i.test(query) && /no such column/i.test(msg)) {
    return {
      type: 'missing_from',
      header: 'Missing FROM Clause',
      hint: `Your query is missing a <strong>FROM</strong> clause. Specify which table you want to query (e.g. <code>FROM ${preferredTable};</code>).`,
      suggestedFix: ` FROM ${preferredTable};`,
      actionLabel: `Add 'FROM ${preferredTable};'`
    };
  }

  // ───────────────────────────────────────────────────────────────────────────
  // SECTION 6: MISSING SEMICOLON (ONLY WHEN NO OTHER ERRORS EXIST)
  // ───────────────────────────────────────────────────────────────────────────
  if (!query.trim().endsWith(';') && /SELECT.+FROM/i.test(query) && !msg.toLowerCase().includes('no such')) {
    return {
      type: 'missing_semicolon',
      header: 'Missing Semicolon ( ; )',
      hint: `Pro-Tip: SQL queries should cleanly end with a semicolon ( <strong>;</strong> ).`,
      suggestedFix: ';',
      actionLabel: `Add ';'`
    };
  }

  return null;
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
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
  loadQuestionsForDay(currentDay || 'day01');
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

function autoHighlightSql(container) {
  if (!container) return;
  if (typeof Prism !== 'undefined' && Prism.highlightAllUnder) {
    Prism.highlightAllUnder(container);
  } else if (typeof hljs !== 'undefined' && hljs.highlightElement) {
    container.querySelectorAll('pre code, .sql-code').forEach(el => hljs.highlightElement(el));
  }
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
  if (slideHeader) {
    const activeTitle = (typeof combinedTracks !== 'undefined' && combinedTracks && combinedTracks[combinedTrackIndex]) ? (combinedTracks[combinedTrackIndex].title || 'In this lesson') : 'In this lesson';
    slideHeader.innerHTML = `
      <div class="slide-header-content">
        ${headerHtml}
        <button class="chapter-pill-btn" id="chapterPillBtn" onclick="toggleChapterList()" title="Jump to Chapter">
          <span id="activeChapterTitle">${activeTitle}</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>
      </div>
    `;
  }

  const slideBodyText = document.getElementById('slideBodyText');
  if (slideBodyText) {
    slideBodyText.innerHTML = bodyHtml;
    // P1 #10: ensure skeleton is hidden once real content is rendered
    const skel = document.getElementById('slideSkeleton');
    if (skel) { skel.style.display = 'none'; skel.setAttribute('aria-hidden', 'true'); }
    formatHeadingBoxes(slideBodyText);
    autoHighlightSql(slideBodyText);
    setTimeout(() => { if (typeof initSchemaCodePeeking === 'function') initSchemaCodePeeking(); }, 50);
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
    if (typeof combinedTracks !== 'undefined' && combinedTracks && combinedTracks[combinedTrackIndex]) {
      const activeTrack = combinedTracks[combinedTrackIndex];
      if (activeTrack && activeTrack.target) {
        updateSlidePlaybackVisibility(activeTrack.target, true);
      }
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

// ─── Core tables to show for the retail DB (Days 02-04) ─────────────────────
const PEEK_PRIORITY_TABLES = ['employees','departments','products','orders','customers','order_items'];

function buildPeekTabs(tables) {
  // For retail DB, filter to priority tables; for day01_db, show all
  const isPriority = tables.some(t => PEEK_PRIORITY_TABLES.includes(t.name));
  const display = isPriority
    ? tables.filter(t => PEEK_PRIORITY_TABLES.includes(t.name))
    : tables;
  return display;
}

function openPeekPopover(e, tableName) {
  if (e && e.stopPropagation) e.stopPropagation();
  const tables = COURSE_CONFIG.schema.tables;
  const displayTables = buildPeekTabs(tables);
  const firstTable = tableName || displayTables[0].name;

  const pop = document.getElementById('peekPopover');

  // Build tabs HTML
  let tabsHtml = '<div class="peek-tabs" id="peekTabs">';
  displayTables.forEach(t => {
    tabsHtml += `<button class="peek-tab${t.name === firstTable ? ' active' : ''}" onclick="switchPeekTab(event, '${t.name}')">${t.name}</button>`;
  });
  tabsHtml += '</div>';

  // Build schema + sample for first table
  const content = buildPeekContent(firstTable);

  document.getElementById('peekContent').innerHTML = tabsHtml + content;
  document.getElementById('peekTableName').textContent = firstTable;

  // Position near click / button
  if (e && e.clientX !== undefined) {
    const top = Math.min(e.clientY + 8, window.innerHeight - 400);
    const left = Math.min(e.clientX, window.innerWidth - 520);
    pop.style.top = Math.max(8, top) + 'px';
    pop.style.left = Math.max(8, left) + 'px';
    pop.style.bottom = '';
    pop.style.width = '';
  }

  pop.classList.add('open');
}

function buildPeekContent(tableName) {
  const tables = COURSE_CONFIG.schema.tables;
  const tableSchema = tables.find(t => t.name === tableName);

  // Column schema section
  let schemaHtml = '<div class="peek-schema-section">';
  schemaHtml += '<div class="peek-section-label">📋 Column Schema</div>';
  schemaHtml += '<div class="peek-schema-list">';
  if (tableSchema && tableSchema.columns) {
    tableSchema.columns.forEach(c => {
      const typeClass = `peek-type-${(c.type || 'TEXT').toUpperCase().replace(/[^A-Z]/g,'').substring(0,7)}`;
      schemaHtml += `<div class="peek-schema-row">
        <span class="peek-col-name">${c.pk ? '🔑 ' : ''}${escHtml(c.name)}</span>
        <span class="peek-type-badge ${typeClass}">${escHtml(c.type || 'TEXT')}</span>
        ${c.pk ? '<span class="peek-pk-badge">PK</span>' : ''}
      </div>`;
    });
  } else {
    schemaHtml += '<span style="opacity:0.5;font-size:0.75rem;">No schema info available.</span>';
  }
  schemaHtml += '</div></div>';

  // Sample data section
  let sampleHtml = '<div class="peek-sample-section">';
  sampleHtml += '<div class="peek-section-label">👀 Sample Data (5 rows)</div>';
  try {
    const result = runSQL(`SELECT * FROM ${tableName} LIMIT 5;`);
    sampleHtml += '<div class="peek-sample-scroll"><table class="result-table">';
    sampleHtml += '<thead><tr>';
    result.columns.forEach(c => { sampleHtml += `<th>${escHtml(c)}</th>`; });
    sampleHtml += '</tr></thead><tbody>';
    result.values.forEach(row => {
      sampleHtml += '<tr>';
      row.forEach(v => { sampleHtml += `<td>${v !== null ? escHtml(String(v)) : '<span style="opacity:0.4">NULL</span>'}</td>`; });
      sampleHtml += '</tr>';
    });
    sampleHtml += '</tbody></table></div>';
  } catch (err) {
    sampleHtml += `<span class="output-error">${escHtml(err.message)}</span>`;
  }
  sampleHtml += '</div>';

  return schemaHtml + sampleHtml;
}

function switchPeekTab(e, tableName) {
  e.stopPropagation();
  // Update active tab
  document.querySelectorAll('.peek-tab').forEach(btn => {
    btn.classList.toggle('active', btn.textContent === tableName);
  });
  document.getElementById('peekTableName').textContent = tableName;

  // Rebuild only the content below the tabs
  const tabsEl = document.getElementById('peekTabs');
  const container = document.getElementById('peekContent');
  const newContent = buildPeekContent(tableName);
  // Remove old content nodes (everything after tabs div)
  while (container.lastChild && container.lastChild !== tabsEl) {
    container.removeChild(container.lastChild);
  }
  const wrapper = document.createElement('div');
  wrapper.innerHTML = newContent;
  while (wrapper.firstChild) container.appendChild(wrapper.firstChild);
}

function togglePeekPopover(e) {
  const pop = document.getElementById('peekPopover');
  if (pop.classList.contains('open')) { closePeekPopover(); return; }
  openPeekPopover(e);
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
  if (IS_GUEST_REEL || (!isPaidUser() && !isAdminUser() && currentDay !== 'day01' && currentDay !== 'day02')) {
    showGuestPaywallModal('the 25-question interview test');
    return;
  }

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
      window._testAutoSubmit = true;
      submitTest();
    }
  }, 1000);

  // Autosave every 15 seconds
  testAutosaveIntervalId = setInterval(() => {
    autosaveTestProgress();
  }, 15000);
}

function submitTest() {
  const day = (typeof currentDay !== 'undefined' && currentDay) ? currentDay : 'day01';
  const submitBtn = document.getElementById('submitTestBtn');

  // 1. Unattempted Questions Warning (Bypassed if timer auto-submitted)
  const unattempted = (testAnswers || []).filter(a => !a || !a.attempted).length;
  if (unattempted > 0 && !window._testAutoSubmit) {
    const msg = `You have ${unattempted} unanswered question${unattempted > 1 ? 's' : ''} remaining out of 25.\n\nAre you sure you want to submit your test now?`;
    if (!confirm(msg)) return;
  }
  window._testAutoSubmit = false;

  // 2. Immediate Visual Loading Feedback & Disable Double Submit
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = '⏳ Grading 25 Questions...';
  }

  // 3. Asynchronous Yield for UI Repaint before heavy WASM grading
  setTimeout(() => {
    try {
      saveCurrentTestAnswer();
      if (typeof testTimerInterval !== 'undefined') clearInterval(testTimerInterval);
      if (typeof testAutosaveIntervalId !== 'undefined' && testAutosaveIntervalId) {
        clearInterval(testAutosaveIntervalId);
        testAutosaveIntervalId = null;
      }
      testSubmitted = true;

      // 4. Engine Health Check
      if (typeof db === 'undefined' || !db) {
        throw new Error('Database engine is initializing. Please wait a few seconds and retry.');
      }

      let totalCorrect = 0;
      const results = [];
      const questions = (COURSE_CONFIG && COURSE_CONFIG.testQuestions) ? COURSE_CONFIG.testQuestions : [];

      // 5. Batch Grade with Try/Catch per question
      questions.forEach((q, i) => {
        const ansObj = (testAnswers && testAnswers[i]) ? testAnswers[i] : { answer: '', attempted: false };
        const studentQuery = (ansObj.answer || '').trim();
        let correct = false;
        let gradingResult = null;

        if (studentQuery !== '' && studentQuery !== '-- Write your answer here' && studentQuery !== '-- Write your query here\n') {
          try {
            if (window.gradeSubmission) {
              gradingResult = window.gradeSubmission(studentQuery, q, db);
              correct = !!(gradingResult && gradingResult.passed);
            }
          } catch (qErr) {
            console.warn(`[Manodemy] Question ${i + 1} grading error:`, qErr);
            correct = false;
          }
        }

        if (correct) totalCorrect++;
        results.push({
          qId: q.id || (i + 1),
          correct,
          studentQuery,
          attempted: !!ansObj.attempted,
          referenceSql: q.ref || q.referenceSql || '',
          prompt: q.prompt || '',
          angle: (typeof getInterviewersAngle === 'function') ? getInterviewersAngle(day, q.id || (i + 1), q.prompt || '') : 'Evaluates core analytical syntax.'
        });

        // Update test sidebar indicator
        const btn = document.getElementById(`tqBtn${i}`);
        if (btn) {
          btn.classList.remove('current', 'attempted');
          btn.classList.add(correct ? 'correct' : (ansObj.attempted ? 'incorrect' : ''));
        }
      });

      // 6. Build Scorecard Metrics & Review Cards
      const elapsed = Math.floor((Date.now() - (testStartTime || Date.now())) / 1000);
      const elapsedStr = `${Math.floor(elapsed / 60)}m ${elapsed % 60}s`;

      const scoreBig = document.getElementById('scoreBig');
      if (scoreBig) {
        scoreBig.textContent = `${totalCorrect} / 25`;
        scoreBig.className = `score-big ${totalCorrect >= 13 ? 'pass' : 'fail'}`;
      }
      const scoreMeta = document.getElementById('scoreMeta');
      if (scoreMeta) {
        scoreMeta.textContent = `Time spent: ${elapsedStr} • ${totalCorrect >= 13 ? '✅ PASSED' : '❌ NEEDS REVIEW'}`;
      }

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

      const scorecardBody = document.getElementById('scorecardBody');
      if (scorecardBody) {
        const table = document.getElementById('scorecardTable');
        if (table) table.style.display = 'none';

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
        cardContainer.scrollTop = 0;
      }

      // 7. Persist to Unified ProgressManager
      if (window.ProgressManager) {
        ProgressManager.saveTestAttempt(day, {
          startedAt: testStartTime,
          timeRemaining: 0,
          answers: testAnswers,
          results: results,
          submitted: true,
          score: totalCorrect
        });

        const dayProgress = ProgressManager.getDayProgress(day);
        const best = (dayProgress && dayProgress.bestScore !== undefined) ? dayProgress.bestScore : totalCorrect;
        const bestEl = document.getElementById('testBestScoreCount');
        if (bestEl) bestEl.textContent = best;

        if (typeof updatePracticeStats === 'function') updatePracticeStats();
      }

      if (typeof deactivateTakeTestBlink === 'function') deactivateTakeTestBlink();

      const fillEl = document.getElementById('testProgressFill');
      if (fillEl) {
        fillEl.style.width = '100%';
        fillEl.style.background = 'var(--green)';
      }

      // 8. Open Scorecard Modal
      const overlay = document.getElementById('scorecardOverlay');
      if (overlay) overlay.classList.add('open');

    } catch (err) {
      console.error('[Manodemy] Fatal submitTest error:', err);
      alert(`⚠️ An error occurred while submitting your test: ${err.message}\n\nPlease try again.`);
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Test';
      }
    }
  }, 30);
}

function closeScorecard() {
  const scorecardOverlay = document.getElementById('scorecardOverlay');
  if (scorecardOverlay) scorecardOverlay.classList.remove('open');

  if (typeof closeTestPortal === 'function') {
    closeTestPortal();
  }

  if (typeof updatePracticeStats === 'function') {
    updatePracticeStats();
  }
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

function renderTestQuestion(index) {
  testCurrentQ = index;
  const questions = (COURSE_CONFIG && COURSE_CONFIG.testQuestions) ? COURSE_CONFIG.testQuestions : [];
  const q = questions[index];

  const qPromptEl = document.getElementById('testQuestionPrompt');
  if (qPromptEl) {
    if (q) {
      qPromptEl.innerHTML = `<div style="text-align: justify; text-justify: inter-word;"><strong style="color:#0284c7;">Question ${index + 1}:</strong> ${q.prompt}</div>`;
    } else {
      qPromptEl.innerHTML = `<div style="text-align: justify; text-justify: inter-word;">Question ${index + 1} not available.</div>`;
    }
  }

  const counterEl = document.getElementById('testQCounter');
  if (counterEl) {
    counterEl.textContent = `Q${index + 1} / 25`;
  }

  // Load saved student answer or default boilerplate
  if (testEditor) {
    const saved = (testAnswers && testAnswers[index]) ? testAnswers[index].answer : '';
    testEditor.setValue(saved || '-- Write your answer here\n');
    setTimeout(() => {
      testEditor.refresh();
      testEditor.focus();
    }, 50);
  }

  // Reset output terminal for current question
  const outEl = document.getElementById('testOutput');
  if (outEl) {
    outEl.innerHTML = `<div class="output-label">Terminal Output</div><span class="output-success">⚡ Write your SQL query above and click 'Run' to execute it!</span>`;
  }

  // Update sidebar active button
  document.querySelectorAll('.test-q-btn').forEach((btn, i) => {
    btn.classList.toggle('current', i === index);
  });
}

function switchTestQuestion(index) {
  saveCurrentTestAnswer();
  renderTestQuestion(index);
}

function saveCurrentTestAnswer() {
  if (!testEditor || typeof testCurrentQ === 'undefined') return;
  const val = testEditor.getValue();
  if (!testAnswers) testAnswers = [];
  if (!testAnswers[testCurrentQ]) {
    testAnswers[testCurrentQ] = { answer: '', attempted: false };
  }
  testAnswers[testCurrentQ].answer = val;
  const isAttempted = (val.trim() !== '' && val.trim() !== '-- Write your answer here' && val.trim() !== '-- Write your SQL query here\n' && val.trim() !== '-- Write your query here\n');
  testAnswers[testCurrentQ].attempted = isAttempted;

  const btn = document.getElementById(`tqBtn${testCurrentQ}`);
  if (btn) {
    btn.classList.toggle('attempted', isAttempted);
  }
  updateTestProgress();
}

function clearTestEditor() {
  if (testEditor) {
    testEditor.setValue('');
    testEditor.focus();
  }
}

function updateTestTimerDisplay() {
  const timerEl = document.getElementById('testTimer');
  if (!timerEl) return;
  const m = Math.floor(Math.max(0, testSecondsRemaining) / 60);
  const s = Math.max(0, testSecondsRemaining) % 60;
  timerEl.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  if (testSecondsRemaining <= 300) {
    timerEl.classList.add('warning');
  } else {
    timerEl.classList.remove('warning');
  }
}

function updateTestProgress() {
  const attemptedCount = (testAnswers || []).filter(a => a && a.attempted).length;
  const attEl = document.getElementById('testAttemptedCount');
  if (attEl) attEl.textContent = attemptedCount;

  const progEl = document.getElementById('testProgress');
  if (progEl) progEl.textContent = `Attempted: ${attemptedCount} / 25`;

  const fillEl = document.getElementById('testProgressFill');
  if (fillEl) {
    const pct = Math.round((attemptedCount / 25) * 100);
    fillEl.style.width = `${pct}%`;
  }
}

function runTestQuery() {
  if (!testEditor) return;
  saveCurrentTestAnswer();
  const sql = testEditor.getValue().trim();
  const outEl = document.getElementById('testOutput');
  if (!outEl) return;

  if (!sql || sql === '-- Write your answer here' || sql === '-- Write your query here\n') {
    outEl.innerHTML = `<div class="output-label">Terminal Output</div><span style="color:#ef4444;">⚠️ Please write a query before running.</span>`;
    return;
  }

  if (typeof db === 'undefined' || !db) {
    outEl.innerHTML = `<div class="output-label">Terminal Output</div><span style="color:#ef4444;">Database initializing... please wait.</span>`;
    return;
  }

  try {
    const result = db.exec(sql);
    const questions = (COURSE_CONFIG && COURSE_CONFIG.testQuestions) ? COURSE_CONFIG.testQuestions : [];
    const currentQ = questions[testCurrentQ];

    let grading = null;
    if (window.gradeSubmission && currentQ) {
      grading = window.gradeSubmission(sql, currentQ, db);
    }

    let statusBanner = '';
    if (grading) {
      if (grading.passed) {
        statusBanner = `<div style="background:rgba(16,185,129,0.15);border:1px solid #10b981;border-radius:6px;padding:6px 12px;margin-bottom:8px;color:#34d399;font-weight:700;font-size:0.8rem;">✅ Result matches expected solution!</div>`;
      } else {
        const diffMsg = grading.error || (grading.diff ? `Mismatch: ${grading.diff.type}` : 'Result does not match expected output.');
        statusBanner = `<div style="background:rgba(239,68,68,0.12);border:1px solid #ef4444;border-radius:6px;padding:6px 12px;margin-bottom:8px;color:#f87171;font-weight:600;font-size:0.8rem;">⚠️ ${diffMsg}</div>`;
      }
    }

    if (!result || result.length === 0) {
      outEl.innerHTML = `
        <div class="output-label">Terminal Output</div>
        ${statusBanner}
        <span class="output-success">Query executed successfully. (0 rows returned)</span>
      `;
      return;
    }

    const columns = result[0].columns;
    const values = result[0].values;

    let tableHtml = `<div class="db-mock-table-wrap" style="max-height: 140px; overflow: auto; margin-top: 4px;"><table class="db-table-mock db-table-mock--compact"><thead><tr>`;
    columns.forEach(col => {
      tableHtml += `<th>${escHtml(col)}</th>`;
    });
    tableHtml += `</tr></thead><tbody>`;

    values.slice(0, 50).forEach(row => {
      tableHtml += `<tr>`;
      row.forEach(val => {
        const cellVal = val === null ? '<span style="color:#ef4444;font-style:italic;">NULL</span>' : escHtml(String(val));
        tableHtml += `<td>${cellVal}</td>`;
      });
      tableHtml += `</tr>`;
    });
    tableHtml += `</tbody></table></div>`;

    if (values.length > 50) {
      tableHtml += `<div style="font-size:0.7rem;color:#64748b;margin-top:4px;">Showing first 50 of ${values.length} rows</div>`;
    }

    outEl.innerHTML = `
      <div class="output-label">Terminal Output</div>
      ${statusBanner}
      ${tableHtml}
    `;
  } catch (err) {
    const errorHint = (typeof analyzeQueryError === 'function') ? analyzeQueryError(sql, err) : '';
    outEl.innerHTML = `
      <div class="output-label">Terminal Output</div>
      <div style="color:#ef4444;font-weight:700;margin-bottom:4px;">❌ Error: ${escHtml(err.message)}</div>
      ${errorHint ? `<div style="color:#cbd5e1;font-size:0.78rem;background:rgba(255,255,255,0.05);padding:6px 10px;border-radius:4px;border-left:3px solid #f59e0b;">💡 ${escHtml(errorHint)}</div>` : ''}
    `;
  }
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
    4: "Tests ordering and paging. Separates analysts who query all data from those who structure efficiently."
  };
  return fallbacks[qIdx] || "Validates foundational SQL logic and syntax accuracy for relational database querying.";
}

const REEL_CHALLENGES = {
  'SQL-01-R1': {
    day: 'day04',
    slideIndex: 0,
    title: 'HIGH PERFORMERS 🚀',
    task: 'Row Filtering: Target Top Tier Active Performers by Salary',
    prompt: `HR needs all active high earners making above ₹75,000. Run Option A vs Option B to see why Option A accidentally includes inactive employees.<br/>
      <div style="margin-top:10px; display:flex; gap:8px; flex-wrap:wrap;">
        <button type="button" class="btn-sec" style="font-size:0.75rem; padding:5px 12px; border-radius:6px; background:rgba(239,68,68,0.2); border:1px solid #ef4444; color:#fca5a5; font-weight:700; cursor:pointer;" onclick="loadReelCode('SQL-01-R1', 'A')">⚡ Load Option A (Trap)</button>
        <button type="button" class="btn-sec" style="font-size:0.75rem; padding:5px 12px; border-radius:6px; background:rgba(16,185,129,0.2); border:1px solid #10b981; color:#6ee7b7; font-weight:700; cursor:pointer;" onclick="loadReelCode('SQL-01-R1', 'B')">⚡ Load Option B (Fix)</button>
      </div>`,
    trapExplanation: 'Option A misses the active status filter (<code>is_active = 1</code>). Option B correctly filters only currently active high earners.',
    codeA: "SELECT first_name, salary\nFROM employees\nWHERE salary > 75000;",
    codeB: "SELECT first_name, salary\nFROM employees\nWHERE is_active = 1\n  AND salary > 75000;"
  },
  'SQL-01-R2': {
    day: 'day04',
    slideIndex: 0,
    title: 'SALARY ANALYTICS 💼',
    task: 'Calculated Columns: Handling NULLs in Compensation Arithmetic',
    prompt: `Calculate total compensation (monthly salary * 12 + commission). Run Option A vs Option B to see why NULL commission wipes out the entire annual calculation.<br/>
      <div style="margin-top:10px; display:flex; gap:8px; flex-wrap:wrap;">
        <button type="button" class="btn-sec" style="font-size:0.75rem; padding:5px 12px; border-radius:6px; background:rgba(239,68,68,0.2); border:1px solid #ef4444; color:#fca5a5; font-weight:700; cursor:pointer;" onclick="loadReelCode('SQL-01-R2', 'A')">⚡ Load Option A (Trap)</button>
        <button type="button" class="btn-sec" style="font-size:0.75rem; padding:5px 12px; border-radius:6px; background:rgba(16,185,129,0.2); border:1px solid #10b981; color:#6ee7b7; font-weight:700; cursor:pointer;" onclick="loadReelCode('SQL-01-R2', 'B')">⚡ Load Option B (Fix)</button>
      </div>`,
    trapExplanation: 'In SQL, <code>number + NULL = NULL</code>! Option A turns annual compensation into NULL for employees without commission. Option B uses <code>COALESCE</code> to safely treat NULL as 0.',
    codeA: "SELECT first_name, (salary * 12) + commission AS annual_comp\nFROM employees;",
    codeB: "SELECT first_name, (salary * 12) + COALESCE(commission, 0) AS annual_comp\nFROM employees;"
  },
  'SQL-02-R1': {
    day: 'day05',
    slideIndex: 0,
    title: 'TOP 3 EARNERS TRAP 🏆',
    task: 'Ranking Challenge: Avoid Skipping Ranks on Ties',
    prompt: `Two employees have the same salary! Run Option A (RANK) vs Option B (DENSE_RANK) to see why RANK() skips rank 2 and misses true earners.<br/>
      <div style="margin-top:10px; display:flex; gap:8px; flex-wrap:wrap;">
        <button type="button" class="btn-sec" style="font-size:0.75rem; padding:5px 12px; border-radius:6px; background:rgba(239,68,68,0.2); border:1px solid #ef4444; color:#fca5a5; font-weight:700; cursor:pointer;" onclick="loadReelCode('SQL-02-R1', 'A')">⚡ Load Option A (RANK)</button>
        <button type="button" class="btn-sec" style="font-size:0.75rem; padding:5px 12px; border-radius:6px; background:rgba(16,185,129,0.2); border:1px solid #10b981; color:#6ee7b7; font-weight:700; cursor:pointer;" onclick="loadReelCode('SQL-02-R1', 'B')">⚡ Load Option B (DENSE_RANK)</button>
      </div>`,
    trapExplanation: 'Notice that <strong>Rank 2 was skipped</strong>! <code>RANK()</code> leaves gaps when ties occur (1, 1, 3), missing valid leaderboard earners.',
    codeA: "SELECT first_name AS emp_name, salary, rk\nFROM (\n  SELECT first_name, salary,\n         RANK() OVER (ORDER BY salary DESC) AS rk\n  FROM employees\n) t\nWHERE rk <= 3;",
    codeB: "SELECT first_name AS emp_name, salary, rk\nFROM (\n  SELECT first_name, salary,\n         DENSE_RANK() OVER (ORDER BY salary DESC) AS rk\n  FROM employees\n) t\nWHERE rk <= 3;"
  },
  'SQL-02-R2': {
    day: 'day05',
    slideIndex: 0,
    title: 'RUNNING TOTAL DISASTER 💸',
    task: 'Cumulative Sum: True Row-by-Row Accumulation',
    prompt: `Same-day orders exist in the table! Run Option A (ROWS UNBOUNDED PRECEDING) vs Option B (default) to see why default RANGE causes sudden sum jumps on duplicate dates.<br/>
      <div style="margin-top:10px; display:flex; gap:8px; flex-wrap:wrap;">
        <button type="button" class="btn-sec" style="font-size:0.75rem; padding:5px 12px; border-radius:6px; background:rgba(16,185,129,0.2); border:1px solid #10b981; color:#6ee7b7; font-weight:700; cursor:pointer;" onclick="loadReelCode('SQL-02-R2', 'A')">⚡ Load Option A (ROWS - Fix)</button>
        <button type="button" class="btn-sec" style="font-size:0.75rem; padding:5px 12px; border-radius:6px; background:rgba(239,68,68,0.2); border:1px solid #ef4444; color:#fca5a5; font-weight:700; cursor:pointer;" onclick="loadReelCode('SQL-02-R2', 'B')">⚡ Load Option B (Default - Trap)</button>
      </div>`,
    trapExplanation: 'Notice the running total <strong>jumps suddenly</strong> on duplicate dates! Default <code>RANGE BETWEEN</code> sums same-day rows all at once instead of row-by-row.',
    codeA: "SELECT order_date, total_amount AS amount,\n       SUM(total_amount) OVER (\n         ORDER BY order_date\n         ROWS UNBOUNDED PRECEDING\n       ) AS running_total\nFROM orders;",
    codeB: "SELECT order_date, total_amount AS amount,\n       SUM(total_amount) OVER (\n         ORDER BY order_date\n       ) AS running_total\nFROM orders;"
  },
  'SQL-03-R1': {
    day: 'day04',
    slideIndex: 4,
    title: 'COUNT(*) VS COUNT(COL) 🔢',
    task: 'Aggregation Trap: Counting Rows vs Non-NULL Values',
    prompt: `Department 20 has 4 employees, but Devendra has NULL commission! Run Option A (COUNT(commission)) vs Option B (COUNT(*)) to see why COUNT(column) silently drops NULL rows.<br/>
      <div style="margin-top:10px; display:flex; gap:8px; flex-wrap:wrap;">
        <button type="button" class="btn-sec" style="font-size:0.75rem; padding:5px 12px; border-radius:6px; background:rgba(239,68,68,0.2); border:1px solid #ef4444; color:#fca5a5; font-weight:700; cursor:pointer;" onclick="loadReelCode('SQL-03-R1', 'A')">⚡ Load Option A (Trap)</button>
        <button type="button" class="btn-sec" style="font-size:0.75rem; padding:5px 12px; border-radius:6px; background:rgba(16,185,129,0.2); border:1px solid #10b981; color:#6ee7b7; font-weight:700; cursor:pointer;" onclick="loadReelCode('SQL-03-R1', 'B')">⚡ Load Option B (Fix)</button>
      </div>`,
    trapExplanation: 'Notice total_emps returned <strong>3</strong> instead of <strong>4</strong>! Because Devendra has a NULL commission, <code>COUNT(commission)</code> silently excluded him from the count.',
    codeA: "SELECT department_id,\n       COUNT(commission) AS total_emps\nFROM employees\nWHERE department_id = 20;",
    codeB: "SELECT department_id,\n       COUNT(*) AS total_emps\nFROM employees\nWHERE department_id = 20;"
  },
  'SQL-03-R2': {
    day: 'day04',
    slideIndex: 1,
    title: 'PRECEDENCE BUG 🐛',
    task: 'Boolean Precedence: Enforcing Parentheses in Compound Filters',
    prompt: `HR needs all active employees in Dept 20 or 10! Siddharth is INACTIVE in Dept 10. Run Option A (no parens) vs Option B (with parens) to see why AND evaluates before OR.<br/>
      <div style="margin-top:10px; display:flex; gap:8px; flex-wrap:wrap;">
        <button type="button" class="btn-sec" style="font-size:0.75rem; padding:5px 12px; border-radius:6px; background:rgba(239,68,68,0.2); border:1px solid #ef4444; color:#fca5a5; font-weight:700; cursor:pointer;" onclick="loadReelCode('SQL-03-R2', 'A')">⚡ Load Option A (Trap)</button>
        <button type="button" class="btn-sec" style="font-size:0.75rem; padding:5px 12px; border-radius:6px; background:rgba(16,185,129,0.2); border:1px solid #10b981; color:#6ee7b7; font-weight:700; cursor:pointer;" onclick="loadReelCode('SQL-03-R2', 'B')">⚡ Load Option B (Fix)</button>
      </div>`,
    trapExplanation: 'Notice that inactive employees in Dept 10 (like Siddharth, is_active = 0) are returned! In SQL, <code>AND</code> evaluates before <code>OR</code>, so <code>is_active = 1</code> was only applied to Dept 20.',
    codeA: "SELECT first_name, department_id, is_active\nFROM employees\nWHERE is_active = 1\n  AND department_id = 20\n   OR department_id = 10;",
    codeB: "SELECT first_name, department_id, is_active\nFROM employees\nWHERE is_active = 1\n  AND (department_id = 20 OR department_id = 10);"
  },
  'SQL-04-R1': {
    day: 'day05',
    slideIndex: 0,
    title: 'WHERE VS HAVING TRAP ⚗️',
    task: 'Aggregation Filter: Why AVG() Crashes Inside the WHERE Clause',
    prompt: `Finance needs all departments averaging above ₹60,000 salary! Run Option A (WHERE with AVG) vs Option B (HAVING) to see why aggregate functions crash inside WHERE.<br/>
      <div style="margin-top:10px; display:flex; gap:8px; flex-wrap:wrap;">
        <button type="button" class="btn-sec" style="font-size:0.75rem; padding:5px 12px; border-radius:6px; background:rgba(239,68,68,0.2); border:1px solid #ef4444; color:#fca5a5; font-weight:700; cursor:pointer;" onclick="loadReelCode('SQL-04-R1', 'A')">⚡ Load Option A (Trap)</button>
        <button type="button" class="btn-sec" style="font-size:0.75rem; padding:5px 12px; border-radius:6px; background:rgba(16,185,129,0.2); border:1px solid #10b981; color:#6ee7b7; font-weight:700; cursor:pointer;" onclick="loadReelCode('SQL-04-R1', 'B')">⚡ Load Option B (Fix)</button>
      </div>`,
    trapExplanation: 'Option A throws <strong>an error</strong>! In SQL, <code>WHERE</code> filters rows <em>before</em> GROUP BY runs — so <code>AVG()</code> doesn\'t exist yet at that stage. Aggregate functions can only live in <code>HAVING</code>, which filters <em>after</em> grouping.',
    codeA: "SELECT department_id,\n       AVG(salary) AS avg_sal\nFROM employees\nWHERE AVG(salary) > 60000\nGROUP BY department_id;",
    codeB: "SELECT department_id,\n       AVG(salary) AS avg_sal\nFROM employees\nGROUP BY department_id\nHAVING AVG(salary) > 60000;"
  },
  'SQL-04-R2': {
    day: 'day04',
    slideIndex: 0,
    title: 'DATE RANGE TRAP 📅',
    task: 'Datetime Filtering: Why BETWEEN 23:59:59 Drops Transactions',
    prompt: `Finance needs all 2024 orders! Run Option A (BETWEEN ... 23:59:59) vs Option B (&gt;= Jan 1 AND &lt; Jan 1 2025) to see why Option A drops end-of-day orders with fractional seconds.<br/>
      <div style="margin-top:10px; display:flex; gap:8px; flex-wrap:wrap;">
        <button type="button" class="btn-sec" style="font-size:0.75rem; padding:5px 12px; border-radius:6px; background:rgba(239,68,68,0.2); border:1px solid #ef4444; color:#fca5a5; font-weight:700; cursor:pointer;" onclick="loadReelCode('SQL-04-R2', 'A')">⚡ Load Option A (Trap)</button>
        <button type="button" class="btn-sec" style="font-size:0.75rem; padding:5px 12px; border-radius:6px; background:rgba(16,185,129,0.2); border:1px solid #10b981; color:#6ee7b7; font-weight:700; cursor:pointer;" onclick="loadReelCode('SQL-04-R2', 'B')">⚡ Load Option B (Fix)</button>
      </div>`,
    trapExplanation: 'Option A misses orders placed in the final second of the year (e.g. <code>23:59:59.850</code>)! In production databases, always use the half-open interval <code>&gt;= \'2024-01-01\' AND &lt; \'2025-01-01\'</code>.',
    codeA: "SELECT order_id, total_amount\nFROM orders\nWHERE order_date\n  BETWEEN '2024-01-01 00:00:00'\n      AND '2024-12-31 23:59:59';",
    codeB: "SELECT order_id, total_amount\nFROM orders\nWHERE order_date >= '2024-01-01'\n  AND order_date <  '2025-01-01';"
  },
  'SQL-05-R1': {
    day: 'day05',
    slideIndex: 0,
    title: 'LEFT JOIN TRAP 💥',
    task: 'LEFT JOIN Filtering: WHERE vs AND (The Accidental INNER JOIN)',
    prompt: `Analytics needs a list of all customers, including those with zero shipped orders. Run Option A (Filter in WHERE) vs Option B (Filter in ON) to see why Option A silently throws away zero-order customers.<br/>
      <div style="margin-top:10px; display:flex; gap:8px; flex-wrap:wrap;">
        <button type="button" class="btn-sec" style="font-size:0.75rem; padding:5px 12px; border-radius:6px; background:rgba(239,68,68,0.2); border:1px solid #ef4444; color:#fca5a5; font-weight:700; cursor:pointer;" onclick="loadReelCode('SQL-05-R1', 'A')">⚡ Load Option A (Trap)</button>
        <button type="button" class="btn-sec" style="font-size:0.75rem; padding:5px 12px; border-radius:6px; background:rgba(16,185,129,0.2); border:1px solid #10b981; color:#6ee7b7; font-weight:700; cursor:pointer;" onclick="loadReelCode('SQL-05-R1', 'B')">⚡ Load Option B (Fix)</button>
      </div>`,
    trapExplanation: 'Option A filters the right table in the <code>WHERE</code> clause, which runs <em>after</em> the join. Customers with no shipped orders have <code>NULL</code> status, and <code>NULL = \'Shipped\'</code> is UNKNOWN, discarding them like an INNER JOIN! Option B filters in the <code>ON</code> clause, keeping all customers.',
    codeA: "SELECT c.first_name, o.total_amount\nFROM customers c\nLEFT JOIN orders o ON c.customer_id = o.customer_id\nWHERE o.status = 'Shipped';",
    codeB: "SELECT c.first_name, o.total_amount\nFROM customers c\nLEFT JOIN orders o ON c.customer_id = o.customer_id\n                  AND o.status = 'Shipped';"
  },
  'SQL-05-R2': {
    day: 'day05',
    slideIndex: 0,
    title: 'CONDITIONAL COUNT TRAP 🤯',
    task: 'Conditional Aggregation: COUNT(CASE ... ELSE 0) vs SUM(CASE ... ELSE 0)',
    prompt: `Analytics needs the total number of SHIPPED orders for each customer. Run Option A (COUNT with ELSE 0) vs Option B (SUM with ELSE 0) to see why COUNT(0) inflates the count.<br/>
      <div style="margin-top:10px; display:flex; gap:8px; flex-wrap:wrap;">
        <button type="button" class="btn-sec" style="font-size:0.75rem; padding:5px 12px; border-radius:6px; background:rgba(239,68,68,0.2); border:1px solid #ef4444; color:#fca5a5; font-weight:700; cursor:pointer;" onclick="loadReelCode('SQL-05-R2', 'A')">⚡ Load Option A (Trap)</button>
        <button type="button" class="btn-sec" style="font-size:0.75rem; padding:5px 12px; border-radius:6px; background:rgba(16,185,129,0.2); border:1px solid #10b981; color:#6ee7b7; font-weight:700; cursor:pointer;" onclick="loadReelCode('SQL-05-R2', 'B')">⚡ Load Option B (Fix)</button>
      </div>`,
    trapExplanation: 'In SQL, <code>COUNT()</code> increments for EVERY non-NULL value! Because <code>0</code> is a valid number, <code>COUNT(0)</code> still counts the row, returning total orders! Option B uses <code>SUM()</code>, adding 1 for shipped and 0 for others.',
    codeA: "SELECT customer_id,\n       COUNT(CASE WHEN status = 'Shipped'\n                  THEN 1 ELSE 0 END) AS shipped_orders\nFROM orders\nGROUP BY customer_id;",
    codeB: "SELECT customer_id,\n       SUM(CASE WHEN status = 'Shipped'\n                THEN 1 ELSE 0 END) AS shipped_orders\nFROM orders\nGROUP BY customer_id;"
  },
  'SQL-06-R2': {
    day: 'day06',
    slideIndex: 0,
    title: 'CEO DISAPPEARED TRAP 👔💀',
    task: 'Self Join Trap: Why Plain JOIN Drops the Top-Level CEO',
    prompt: `HR needs an org chart report with all employees and their managers. Run Option A (plain JOIN) vs Option B (LEFT JOIN) to see why Option A deletes the CEO from the report.<br/>
      <div style="margin-top:10px; display:flex; gap:8px; flex-wrap:wrap;">
        <button type="button" class="btn-sec" style="font-size:0.75rem; padding:5px 12px; border-radius:6px; background:rgba(239,68,68,0.2); border:1px solid #ef4444; color:#fca5a5; font-weight:700; cursor:pointer;" onclick="loadReelCode('SQL-06-R2', 'A')">⚡ Load Option A (Trap)</button>
        <button type="button" class="btn-sec" style="font-size:0.75rem; padding:5px 12px; border-radius:6px; background:rgba(16,185,129,0.2); border:1px solid #10b981; color:#6ee7b7; font-weight:700; cursor:pointer;" onclick="loadReelCode('SQL-06-R2', 'B')">⚡ Load Option B (Fix)</button>
      </div>`,
    trapExplanation: 'Option A silently <strong>deletes the CEO</strong>! Because the CEO has a NULL <code>manager_id</code>, plain <code>JOIN</code> (INNER JOIN) rejects the row. Option B uses <code>LEFT JOIN</code>, preserving the CEO.',
    codeA: "SELECT e.first_name AS employee,\n       m.first_name AS manager\nFROM employees e\nJOIN employees m ON e.manager_id = m.employee_id;",
    codeB: "SELECT e.first_name AS employee,\n       COALESCE(m.first_name, 'TOP BOSS') AS manager\nFROM employees e\nLEFT JOIN employees m ON e.manager_id = m.employee_id;"
  },
  'SQL-07-R1': {
    day: 'day07',
    slideIndex: 0,
    title: 'NOT IN NULL TRAP 🕳️💀',
    task: 'Subquery Trap: Why a Single NULL Breaks NOT IN Queries',
    prompt: `Analytics needs all customers who have NEVER placed an order. Run Option A (NOT IN) vs Option B (NOT EXISTS) to see why Option A returns 0 rows when orders contain guest checkouts.<br/>
      <div style="margin-top:10px; display:flex; gap:8px; flex-wrap:wrap;">
        <button type="button" class="btn-sec" style="font-size:0.75rem; padding:5px 12px; border-radius:6px; background:rgba(239,68,68,0.2); border:1px solid #ef4444; color:#fca5a5; font-weight:700; cursor:pointer;" onclick="loadReelCode('SQL-07-R1', 'A')">⚡ Load Option A (Trap)</button>
        <button type="button" class="btn-sec" style="font-size:0.75rem; padding:5px 12px; border-radius:6px; background:rgba(16,185,129,0.2); border:1px solid #10b981; color:#6ee7b7; font-weight:700; cursor:pointer;" onclick="loadReelCode('SQL-07-R1', 'B')">⚡ Load Option B (Fix)</button>
      </div>`,
    trapExplanation: 'If the subquery contains even one <code>NULL</code>, <code>customer_id NOT IN (..., NULL)</code> evaluates to <strong>UNKNOWN</strong> for every row, returning 0 rows! Option B uses <code>NOT EXISTS</code>, which is 100% NULL-safe.',
    codeA: "SELECT first_name FROM customers\nWHERE customer_id NOT IN (\n    SELECT customer_id FROM orders\n);",
    codeB: "SELECT c.first_name FROM customers c\nWHERE NOT EXISTS (\n    SELECT 1 FROM orders o\n    WHERE o.customer_id = c.customer_id\n);"
  },
  'SQL-07-R2': {
    day: 'day07',
    slideIndex: 0,
    title: 'SALARY TIE GAP TRAP 🥈⚔️',
    task: 'Ranking Functions: RANK() vs DENSE_RANK() on Tied Salaries',
    prompt: `HR needs the salary leaderboard! Two employees share the #1 salary. Run Option A (RANK) vs Option B (DENSE_RANK) to see why RANK() skips 2nd place and JUMPS straight to 3.<br/>
      <div style="margin-top:10px; display:flex; gap:8px; flex-wrap:wrap;">
        <button type="button" class="btn-sec" style="font-size:0.75rem; padding:5px 12px; border-radius:6px; background:rgba(239,68,68,0.2); border:1px solid #ef4444; color:#fca5a5; font-weight:700; cursor:pointer;" onclick="loadReelCode('SQL-07-R2', 'A')">⚡ Load Option A (RANK)</button>
        <button type="button" class="btn-sec" style="font-size:0.75rem; padding:5px 12px; border-radius:6px; background:rgba(16,185,129,0.2); border:1px solid #10b981; color:#6ee7b7; font-weight:700; cursor:pointer;" onclick="loadReelCode('SQL-07-R2', 'B')">⚡ Load Option B (DENSE_RANK)</button>
      </div>`,
    trapExplanation: 'When ties occur, <code>RANK()</code> leaves gaps (1, 1, 3), skipping 2nd place! <code>DENSE_RANK()</code> assigns consecutive ranks (1, 1, 2) without any gaps.',
    codeA: "SELECT employee_id, first_name, salary,\n       RANK() OVER (ORDER BY salary DESC) AS sal_rank\nFROM employees;",
    codeB: "SELECT employee_id, first_name, salary,\n       DENSE_RANK() OVER (ORDER BY salary DESC) AS sal_rank\nFROM employees;"
  },
  'SQL-08-R1': {
    day: 'day08',
    slideIndex: 0,
    title: 'LIKE WILDCARD TRAP 🔍💥',
    task: 'Pattern Matching: Escaping Literal % and _ in LIKE Queries',
    prompt: `Marketing needs all promo codes with a literal 50% discount. Run Option A (plain LIKE) vs Option B (ESCAPE) to see why Option A accidentally matches 500_FLAT, 50_OFF, etc.<br/>
      <div style="margin-top:10px; display:flex; gap:8px; flex-wrap:wrap;">
        <button type="button" class="btn-sec" style="font-size:0.75rem; padding:5px 12px; border-radius:6px; background:rgba(239,68,68,0.2); border:1px solid #ef4444; color:#fca5a5; font-weight:700; cursor:pointer;" onclick="loadReelCode('SQL-08-R1', 'A')">⚡ Load Option A (Trap)</button>
        <button type="button" class="btn-sec" style="font-size:0.75rem; padding:5px 12px; border-radius:6px; background:rgba(16,185,129,0.2); border:1px solid #10b981; color:#6ee7b7; font-weight:700; cursor:pointer;" onclick="loadReelCode('SQL-08-R1', 'B')">⚡ Load Option B (Fix)</button>
      </div>`,
    trapExplanation: 'In SQL <code>LIKE</code>, <code>%</code> matches any character sequence. Option A (<code>\'%50%%\'</code>) matches 500_FLAT and 50_OFF! Option B uses <code>ESCAPE \'\\\'</code> to match literal 50%.',
    codeA: "SELECT promo_code\nFROM coupons\nWHERE promo_code LIKE '%50%%';",
    codeB: "SELECT promo_code\nFROM coupons\nWHERE promo_code LIKE '%50\\%%' ESCAPE '\\';"
  },
  'SQL-08-R2': {
    day: 'day08',
    slideIndex: 0,
    title: 'UNION DEDUPLICATION TRAP ⚡💣',
    task: 'Set Operations: UNION vs UNION ALL Deduplication and Revenue Loss',
    prompt: `Finance needs to merge January and February sales transactions. Run Option A (UNION) vs Option B (UNION ALL) to see why Option A accidentally deletes identical sales transactions!<br/>
      <div style="margin-top:10px; display:flex; gap:8px; flex-wrap:wrap;">
        <button type="button" class="btn-sec" style="font-size:0.75rem; padding:5px 12px; border-radius:6px; background:rgba(239,68,68,0.2); border:1px solid #ef4444; color:#fca5a5; font-weight:700; cursor:pointer;" onclick="loadReelCode('SQL-08-R2', 'A')">⚡ Load Option A (UNION)</button>
        <button type="button" class="btn-sec" style="font-size:0.75rem; padding:5px 12px; border-radius:6px; background:rgba(16,185,129,0.2); border:1px solid #10b981; color:#6ee7b7; font-weight:700; cursor:pointer;" onclick="loadReelCode('SQL-08-R2', 'B')">⚡ Load Option B (UNION ALL)</button>
      </div>`,
    trapExplanation: 'Plain <code>UNION</code> automatically deduplicates records, silently deleting legitimate identical transactions! <code>UNION ALL</code> keeps all rows and runs 5x faster.',
    codeA: "SELECT customer_id, amount FROM jan_sales\nUNION\nSELECT customer_id, amount FROM feb_sales;",
    codeB: "SELECT customer_id, amount FROM jan_sales\nUNION ALL\nSELECT customer_id, amount FROM feb_sales;"
  },
  'SQL-09-R1': {
    day: 'day09',
    slideIndex: 0,
    title: 'LATEST RECORD PER USER 📊⚡',
    task: 'Window Functions vs Aggregation: Finding the Latest Transaction per Customer',
    prompt: `Analytics needs the single most recent order placed by each customer. Run Option A (ROW_NUMBER CTE) vs Option B (GROUP BY MAX + JOIN) to see why Option A is the FAANG standard.<br/>
      <div style="margin-top:10px; display:flex; gap:8px; flex-wrap:wrap;">
        <button type="button" class="btn-sec" style="font-size:0.75rem; padding:5px 12px; border-radius:6px; background:rgba(16,185,129,0.2); border:1px solid #10b981; color:#6ee7b7; font-weight:700; cursor:pointer;" onclick="loadReelCode('SQL-09-R1', 'A')">⚡ Load Option A (CTE - Standard)</button>
        <button type="button" class="btn-sec" style="font-size:0.75rem; padding:5px 12px; border-radius:6px; background:rgba(239,68,68,0.2); border:1px solid #ef4444; color:#fca5a5; font-weight:700; cursor:pointer;" onclick="loadReelCode('SQL-09-R1', 'B')">⚡ Load Option B (Self-Join - Trap on Ties)</button>
      </div>`,
    trapExplanation: 'Option A uses <code>ROW_NUMBER()</code> inside a CTE, which guarantees exactly 1 row per customer even when order timestamps tie! Option B uses <code>GROUP BY MAX + JOIN</code>, which returns duplicate rows if two orders occur on the same date.',
    codeA: "WITH ranked AS (\n  SELECT *,\n         ROW_NUMBER() OVER (\n           PARTITION BY customer_id\n           ORDER BY order_date DESC\n         ) AS rn\n  FROM orders\n)\nSELECT * FROM ranked WHERE rn = 1;",
    codeB: "SELECT o.*\nFROM orders o\nJOIN (\n  SELECT customer_id, MAX(order_date) AS max_date\n  FROM orders GROUP BY customer_id\n) m ON o.customer_id = m.customer_id\n   AND o.order_date = m.max_date;"
  },
  'SQL-10-R1': {
    day: 'day10',
    slideIndex: 0,
    title: 'GAPS & ISLANDS TRAP 🏝️⚡',
    task: 'Advanced Algorithmic SQL: Grouping Consecutive Login Streaks',
    prompt: `Analytics needs to group consecutive active days into unbroken login streaks. Run Option A (Date - ROW_NUMBER trick) vs Option B (DENSE_RANK) to see why Option A is the Meta/Google FAANG standard.<br/>
      <div style="margin-top:10px; display:flex; gap:8px; flex-wrap:wrap;">
        <button type="button" class="btn-sec" style="font-size:0.75rem; padding:5px 12px; border-radius:6px; background:rgba(16,185,129,0.2); border:1px solid #10b981; color:#6ee7b7; font-weight:700; cursor:pointer;" onclick="loadReelCode('SQL-10-R1', 'A')">⚡ Load Option A (Date - ROW_NUMBER Trick)</button>
        <button type="button" class="btn-sec" style="font-size:0.75rem; padding:5px 12px; border-radius:6px; background:rgba(239,68,68,0.2); border:1px solid #ef4444; color:#fca5a5; font-weight:700; cursor:pointer;" onclick="loadReelCode('SQL-10-R1', 'B')">⚡ Load Option B (DENSE_RANK Trap)</button>
      </div>`,
    trapExplanation: 'Option B uses plain <code>DENSE_RANK()</code>, which simply counts 1, 2, 3... ignoring multi-day gaps! Option A subtracts <code>ROW_NUMBER()</code> from consecutive dates to form a constant date anchor for each unbroken streak.',
    successExplanation: 'Option A uses the Date - ROW_NUMBER trick to generate a constant date anchor for each unbroken streak!',
    correctOption: 'A',
    codeA: "SELECT user_id, login_date,\n       DATE(login_date, '-' || (\n         ROW_NUMBER() OVER (\n           PARTITION BY user_id ORDER BY login_date\n         )\n       ) || ' days') AS streak_grp\nFROM user_logins;",
    codeB: "SELECT user_id, login_date,\n       DENSE_RANK() OVER (\n         PARTITION BY user_id ORDER BY login_date\n       ) AS streak_grp\nFROM user_logins;"
  },
  'SQL-11-R1': {
    day: 'day11',
    slideIndex: 0,
    title: 'MANAGER SALARY TRAP 💼⚡',
    task: 'Self Joins: Finding Employees Earning More Than Their Direct Manager',
    prompt: `HR needs to find all employees who earn more than their direct manager. Run Option A (Self JOIN) vs Option B (Subquery Trap) to see why Option A is the Flipkart / Amazon standard.<br/>
      <div style="margin-top:10px; display:flex; gap:8px; flex-wrap:wrap;">
        <button type="button" class="btn-sec" style="font-size:0.75rem; padding:5px 12px; border-radius:6px; background:rgba(16,185,129,0.2); border:1px solid #10b981; color:#6ee7b7; font-weight:700; cursor:pointer;" onclick="loadReelCode('SQL-11-R1', 'A')">⚡ Load Option A (Self JOIN Standard)</button>
        <button type="button" class="btn-sec" style="font-size:0.75rem; padding:5px 12px; border-radius:6px; background:rgba(239,68,68,0.2); border:1px solid #ef4444; color:#fca5a5; font-weight:700; cursor:pointer;" onclick="loadReelCode('SQL-11-R1', 'B')">⚡ Load Option B (Subquery Trap)</button>
      </div>`,
    trapExplanation: 'Option B fails because <code>WHERE employee_id = manager_id</code> inside the inner subquery evaluates against the inner row itself (checking if someone is their own manager) rather than joining to the outer employee row! Option A explicitly joins <code>e.manager_id = m.employee_id</code> to compare the direct pair.',
    successExplanation: 'Option A uses Self JOIN to explicitly compare each employee with their direct manager!',
    correctOption: 'A',
    codeA: "SELECT e.first_name AS emp_name,\n       e.salary AS emp_salary,\n       m.first_name AS manager_name,\n       m.salary AS mgr_salary\nFROM employees e\nJOIN employees m ON e.manager_id = m.employee_id\nWHERE e.salary > m.salary;",
    codeB: "SELECT first_name\nFROM employees e\nWHERE salary > (\n  SELECT salary FROM employees\n  WHERE employee_id = manager_id\n);"
  },
  'SQL-12-R1': {
    day: 'day12',
    slideIndex: 0,
    title: 'GHOST EMPLOYEE PAYROLL TRAP 👻💸',
    task: 'Date Filtering vs Status Flags: Detecting Salaries Credited After Resignation',
    prompt: `HR Audit discovered an ex-employee who resigned 3 months ago is still receiving salary credits! Run Option A (Date Check) vs Option B (Status Trap) to see why Option A is the real-world audit standard.<br/>
      <div style="margin-top:10px; display:flex; gap:8px; flex-wrap:wrap;">
        <button type="button" class="btn-sec" style="font-size:0.75rem; padding:5px 12px; border-radius:6px; background:rgba(16,185,129,0.2); border:1px solid #10b981; color:#6ee7b7; font-weight:700; cursor:pointer;" onclick="loadReelCode('SQL-12-R1', 'A')">⚡ Load Option A (Date Check Standard)</button>
        <button type="button" class="btn-sec" style="font-size:0.75rem; padding:5px 12px; border-radius:6px; background:rgba(239,68,68,0.2); border:1px solid #ef4444; color:#fca5a5; font-weight:700; cursor:pointer;" onclick="loadReelCode('SQL-12-R1', 'B')">⚡ Load Option B (Status Trap)</button>
      </div>`,
    trapExplanation: 'Option B simply checks <code>WHERE status = \'Resigned\'</code>, which flags every historical legitimate salary ever paid while the employee was actively working! Option A correctly checks <code>WHERE pay_date > exit_date</code> to catch only unauthorized payments after resignation.',
    successExplanation: 'Option A correctly filters <code>pay_date > exit_date</code> to catch only unauthorized payments made after resignation!',
    correctOption: 'A',
    codeA: "SELECT p.emp_id, p.amount, p.pay_date\nFROM payroll p JOIN employees e\n  ON p.emp_id = e.emp_id\nWHERE p.pay_date > e.exit_date;",
    codeB: "SELECT p.emp_id, p.amount, p.pay_date\nFROM payroll p JOIN employees e\n  ON p.emp_id = e.emp_id\nWHERE e.status = 'Resigned';"
  },
  'SQL-13-R1': {
    day: 'day13',
    slideIndex: 0,
    title: 'PEAK CONCURRENCY TRAP 🎬🍿',
    task: 'Event Delta Counters vs Quadratic Self-Joins: Tracking Peak Concurrent Streamers',
    prompt: `Netflix and Hotstar need to calculate peak concurrent viewers during live streaming. Run Option A (Event Delta Trick) vs Option B (Quadratic Join Trap) to see why Option A is the O(N log N) FAANG standard.<br/>
      <div style="margin-top:10px; display:flex; gap:8px; flex-wrap:wrap;">
        <button type="button" class="btn-sec" style="font-size:0.75rem; padding:5px 12px; border-radius:6px; background:rgba(16,185,129,0.2); border:1px solid #10b981; color:#6ee7b7; font-weight:700; cursor:pointer;" onclick="loadReelCode('SQL-13-R1', 'A')">⚡ Load Option A (Delta Event Standard)</button>
        <button type="button" class="btn-sec" style="font-size:0.75rem; padding:5px 12px; border-radius:6px; background:rgba(239,68,68,0.2); border:1px solid #ef4444; color:#fca5a5; font-weight:700; cursor:pointer;" onclick="loadReelCode('SQL-13-R1', 'B')">⚡ Load Option B (Self-Join Trap)</button>
      </div>`,
    trapExplanation: 'Option B runs an O(N²) quadratic Self-Join between every single stream start and end time! On millions of live streams, this crashes with catastrophic memory exhaustion. Option A tags starts as +1 and ends as -1, running in O(N log N) time.',
    successExplanation: 'Option A uses the genius Event Delta (+1 on start, -1 on end) counter to track live concurrent viewership cleanly in O(N log N) time!',
    correctOption: 'A',
    codeA: "WITH events AS (\n  SELECT start_time AS t, 1 AS delta FROM streams\n  UNION ALL\n  SELECT end_time AS t, -1 AS delta FROM streams\n)\nSELECT t, SUM(delta) OVER (ORDER BY t) AS concurrent_users\nFROM events;",
    codeB: "SELECT s1.start_time AS t,\n       COUNT(*) AS concurrent_users\nFROM streams s1\nJOIN streams s2\n  ON s1.start_time BETWEEN s2.start_time AND s2.end_time\nGROUP BY s1.stream_id;"
  }
};

window.loadReelCode = function(challengeId, optionKey) {
  const chal = REEL_CHALLENGES[challengeId];
  if (!chal || !mainEditor) return;
  const code = optionKey === 'A' ? chal.codeA : chal.codeB;
  mainEditor.setValue(code);
  mainEditor.focus();
  showToast(`⚡ Loaded Option ${optionKey}! Click Run (Ctrl+Enter) to execute.`);
};

function getActiveChallengeId() {
  const urlP = new URLSearchParams(window.location.search);
  const directChal = urlP.get('challenge') || urlP.get('reel');
  if (directChal && REEL_CHALLENGES[directChal]) return directChal;

  const camp = (urlP.get('utm_campaign') || '').toLowerCase();
  if (camp.includes('reel_day04_q1') || camp.includes('reel_01') || camp.includes('instagram_reel_01') || camp.includes('high_performer')) return 'SQL-01-R1';
  if (camp.includes('reel_day04_q2') || camp.includes('reel_02') || camp.includes('instagram_reel_02') || camp.includes('salary_analytic')) return 'SQL-01-R2';
  if (camp.includes('reel_day04_q3') || camp.includes('reel_03') || camp.includes('instagram_reel_03') || camp.includes('dept_ranking')) return 'SQL-02-R1';
  if (camp.includes('reel_day04_q4') || camp.includes('reel_04') || camp.includes('instagram_reel_04') || camp.includes('sales_growth')) return 'SQL-02-R2';
  if (camp.includes('reel_day04_q5') || camp.includes('reel_05') || camp.includes('instagram_reel_05') || camp.includes('count_null')) return 'SQL-03-R1';
  if (camp.includes('reel_day04_q6') || camp.includes('reel_06') || camp.includes('precedence')) return 'SQL-03-R2';
  if (camp.includes('reel_day04_q7') || camp.includes('reel_07') || camp.includes('where_having')) return 'SQL-04-R1';
  if (camp.includes('reel_day04_q8') || camp.includes('reel_08') || camp.includes('date_range') || camp.includes('between')) return 'SQL-04-R2';
  if (camp.includes('reel_day05_q1') || camp.includes('reel_09') || camp.includes('q9') || camp.includes('left_join')) return 'SQL-05-R1';
  if (camp.includes('reel_day05_q2') || camp.includes('reel_10') || camp.includes('q10') || camp.includes('conditional_count')) return 'SQL-05-R2';
  if (camp.includes('reel_day06_q2') || camp.includes('reel_11') || camp.includes('q11') || camp.includes('ceo') || camp.includes('hierarchy')) return 'SQL-06-R2';
  if (camp.includes('reel_day07_q1') || camp.includes('reel_12') || camp.includes('q12') || camp.includes('not_in') || camp.includes('exists')) return 'SQL-07-R1';
  if (camp.includes('reel_day07_q2') || camp.includes('reel_13') || camp.includes('q13') || camp.includes('dense_rank') || camp.includes('salary_dense_rank')) return 'SQL-07-R2';
  if (camp.includes('reel_day08_q14') || camp.includes('reel_14') || camp.includes('q14') || camp.includes('like_wildcard') || camp.includes('wildcard')) return 'SQL-08-R1';
  if (camp.includes('reel_day08_q15') || camp.includes('reel_15') || camp.includes('q15') || camp.includes('union_dedup') || camp.includes('union')) return 'SQL-08-R2';
  if (camp.includes('reel_day09_q16') || camp.includes('reel_16') || camp.includes('q16') || camp.includes('latest_record') || camp.includes('row_number')) return 'SQL-09-R1';
  if (camp.includes('reel_day10_q17') || camp.includes('reel_17') || camp.includes('q17') || camp.includes('gaps_islands') || camp.includes('streaks')) return 'SQL-10-R1';
  if (camp.includes('reel_day11_q18') || camp.includes('reel_18') || camp.includes('q18') || camp.includes('manager_salary') || camp.includes('self_join')) return 'SQL-11-R1';
  if (camp.includes('reel_day12_q19') || camp.includes('reel_19') || camp.includes('q19') || camp.includes('ghost_employee') || camp.includes('payroll_leak')) return 'SQL-12-R1';
  if (camp.includes('reel_day13_q20') || camp.includes('reel_20') || camp.includes('q20') || camp.includes('peak_streamers') || camp.includes('concurrency')) return 'SQL-13-R1';

  const dayParam = urlP.get('day');
  const qParam = urlP.get('q') || urlP.get('question');
  if (dayParam === '4' || dayParam === '04') {
    if (qParam === '1') return 'SQL-01-R1';
    if (qParam === '2') return 'SQL-01-R2';
    if (qParam === '3') return 'SQL-02-R1';
    if (qParam === '4') return 'SQL-02-R2';
    if (qParam === '5') return 'SQL-03-R1';
    if (qParam === '6') return 'SQL-03-R2';
    if (qParam === '7') return 'SQL-04-R1';
    if (qParam === '8') return 'SQL-04-R2';
  }
  if (dayParam === '5' || dayParam === '05') {
    if (qParam === '1' || qParam === '9') return 'SQL-05-R1';
    if (qParam === '2' || qParam === '10') return 'SQL-05-R2';
  }
  if (dayParam === '6' || dayParam === '06') {
    if (qParam === '1' || qParam === '2' || qParam === '11') return 'SQL-06-R2';
  }
  if (dayParam === '7' || dayParam === '07') {
    if (qParam === '1' || qParam === '12') return 'SQL-07-R1';
    if (qParam === '2' || qParam === '13') return 'SQL-07-R2';
  }
  if (dayParam === '8' || dayParam === '08') {
    if (qParam === '1' || qParam === '14') return 'SQL-08-R1';
    if (qParam === '2' || qParam === '15') return 'SQL-08-R2';
  }
  if (dayParam === '9' || dayParam === '09') {
    if (qParam === '1' || qParam === '16') return 'SQL-09-R1';
  }
  if (dayParam === '10') {
    if (qParam === '1' || qParam === '17') return 'SQL-10-R1';
  }
  if (dayParam === '11') {
    if (qParam === '1' || qParam === '18') return 'SQL-11-R1';
  }
  if (dayParam === '12') {
    if (qParam === '1' || qParam === '19') return 'SQL-12-R1';
  }
  if (dayParam === '13') {
    if (qParam === '1' || qParam === '20') return 'SQL-13-R1';
  }
  if (qParam === '12' || qParam === 'q12') return 'SQL-07-R1';
  if (qParam === '13' || qParam === 'q13') return 'SQL-07-R2';
  if (qParam === '14' || qParam === 'q14') return 'SQL-08-R1';
  if (qParam === '15' || qParam === 'q15') return 'SQL-08-R2';
  if (qParam === '16' || qParam === 'q16') return 'SQL-09-R1';
  if (qParam === '17' || qParam === 'q17') return 'SQL-10-R1';
  if (qParam === '18' || qParam === 'q18') return 'SQL-11-R1';
  if (qParam === '19' || qParam === 'q19') return 'SQL-12-R1';
  if (qParam === '20' || qParam === 'q20') return 'SQL-13-R1';
  return null;
}

let currentPracticeQ = 0;
let currentDay = 'day01';

function loadQuestionsForDay(day) {
  currentDay = day || currentDay || 'day01';
  let questions = null;
  const dayContent = (window.COURSE_CONTENT && window.COURSE_CONTENT[currentDay]) || COURSE_CONFIG;
  const tpq = (COURSE_CONFIG && COURSE_CONFIG.topicPracticeQuestions) || (dayContent && dayContent.topicPracticeQuestions);

  const chalId = getActiveChallengeId();
  if (chalId && REEL_CHALLENGES[chalId]) {
    const chal = REEL_CHALLENGES[chalId];
    const isCorrectA = chal.correctOption === 'A';
    questions = [{
      id: 1,
      isChallenge: true,
      title: chal.title,
      prompt: `<strong>${chal.task}</strong><br/>${chal.prompt}`,
      referenceSql: isCorrectA ? chal.codeA : chal.codeB,
      codeA: chal.codeA,
      codeB: chal.codeB,
      correctOption: isCorrectA ? 'A' : 'B',
      trapOption: isCorrectA ? 'B' : 'A'
    }];
  } else if (tpq && (tpq[currentSlide] || tpq[String(currentSlide)])) {
    questions = [...(tpq[currentSlide] || tpq[String(currentSlide)])];
  } else if (COURSE_CONFIG.allPracticeQuestions && COURSE_CONFIG.allPracticeQuestions[currentDay]) {
    questions = [...COURSE_CONFIG.allPracticeQuestions[currentDay]];
  } else {
    questions = [...((dayContent && dayContent.practiceQuestions) || COURSE_CONFIG.practiceQuestions || [])];
  }

  COURSE_CONFIG.practiceQuestions = questions;
  currentPracticeQ = 0;
  renderPracticeQuestion();
  updatePracticeStats();

  if (chalId && REEL_CHALLENGES[chalId]) {
    const chal = REEL_CHALLENGES[chalId];
    setTimeout(() => {
      if (mainEditor) {
        mainEditor.setValue(chal.codeA);
      }
    }, 150);
  }
}

// Mapping of question id → audio file (for Day 01)
const questionAudioMap = {
  'day01': {
    topics: {
      0: {
        1: 'New_Day1Part1Question01.mp3',
        2: 'New_Day1Part1Question03.mp3'
      },
      1: {
        1: 'Day01topic2/New_Day1Part2Question01.mp3',
        2: 'Day01topic2/New_Day1Part2Question02.mp3'
      }
    },
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
    1: {
      src: "Day03/New_Day3Question01sol.mp3",
      code: "SELECT name,\n       unit_price\nFROM   products\nWHERE  unit_price > 10000\nORDER BY unit_price DESC;",
      segments: [
        { text: "SELECT name,\n", startAt: 1.98, charInterval: 45 },
        { text: "       unit_price\n", startAt: 2.64, charInterval: 35 },
        { text: "FROM   products\n", startAt: 3.8, charInterval: 35 },
        { text: "WHERE  unit_price > 10000\n", startAt: 4.88, charInterval: 50 },
        { text: "ORDER BY unit_price DESC;", startAt: 7.9, charInterval: 50 }
      ],
      scrollAt: 9.75
    },
    2: {
      src: "Day03/New_Day3Question02sol.mp3",
      code: "SELECT first_name,\n       last_name,\n       region\nFROM   customers\nWHERE  region IN ('North', 'East');",
      segments: [
        { text: "SELECT first_name,\n", startAt: 1.8, charInterval: 35 },
        { text: "       last_name,\n", startAt: 2.78, charInterval: 35 },
        { text: "       region\n", startAt: 3.82, charInterval: 35 },
        { text: "FROM   customers\n", startAt: 4.58, charInterval: 36 },
        { text: "WHERE  region IN ('North', 'East');", startAt: 5.74, charInterval: 52 }
      ],
      scrollAt: 8.16
    },
    3: {
      src: "Day03/New_Day3Question03sol.mp3",
      code: "SELECT first_name,\n       last_name,\n       salary\nFROM   employees\nWHERE  salary BETWEEN 60000 AND 100000;",
      segments: [
        { text: "SELECT first_name,\n", startAt: 1.8, charInterval: 35 },
        { text: "       last_name,\n", startAt: 2.74, charInterval: 35 },
        { text: "       salary\n", startAt: 3.82, charInterval: 35 },
        { text: "FROM   employees\n", startAt: 4.68, charInterval: 41 },
        { text: "WHERE  salary BETWEEN 60000 AND 100000;", startAt: 5.94, charInterval: 50 }
      ],
      scrollAt: 8.49
    },
    4: {
      src: "Day03/New_Day3Question04sol.mp3",
      code: "SELECT first_name,\n       last_name,\n       salary\nFROM   employees\nWHERE  first_name LIKE 'S%';",
      segments: [
        { text: "SELECT first_name,\n", startAt: 2.68, charInterval: 35 },
        { text: "       last_name,\n", startAt: 3.92, charInterval: 35 },
        { text: "       salary\n", startAt: 5.0, charInterval: 35 },
        { text: "FROM   employees\n", startAt: 5.88, charInterval: 39 },
        { text: "WHERE  first_name LIKE 'S%';", startAt: 7.1, charInterval: 54 }
      ],
      scrollAt: 9.21
    },
    5: {
      src: "Day03/New_Day3Question05sol.mp3",
      code: "SELECT first_name,\n       department_id,\n       salary\nFROM   employees\nWHERE  is_active = 1\n  AND  department_id = 20;",
      segments: [
        { text: "SELECT first_name,\n", startAt: 1.34, charInterval: 38 },
        { text: "       department_id,\n", startAt: 2.68, charInterval: 35 },
        { text: "       salary\n", startAt: 4.0, charInterval: 35 },
        { text: "FROM   employees\n", startAt: 4.98, charInterval: 35 },
        { text: "WHERE  is_active = 1\n", startAt: 6.08, charInterval: 75 },
        { text: "  AND  department_id = 20;", startAt: 7.66, charInterval: 73 }
      ],
      scrollAt: 10.16
    },
    6: {
      src: "Day03/New_Day3Question06sol.mp3",
      code: "SELECT first_name,\n       last_name,\n       commission\nFROM   employees\nWHERE  commission IS NULL;",
      segments: [
        { text: "SELECT first_name,\n", startAt: 2.78, charInterval: 35 },
        { text: "       last_name,\n", startAt: 4.04, charInterval: 35 },
        { text: "       commission\n", startAt: 5.08, charInterval: 35 },
        { text: "FROM   employees\n", startAt: 5.94, charInterval: 41 },
        { text: "WHERE  commission IS NULL;", startAt: 7.2, charInterval: 42 }
      ],
      scrollAt: 8.89
    }
  },
  'day04': {
    1: {
      src: "Day04/New_Day4Question01sol.mp3",
      code: "SELECT first_name,\n       salary,\n       salary / 12.0 AS monthly_salary\nFROM   employees;",
      segments: [
        { text: "SELECT first_name,\n", startAt: 2.7, charInterval: 35 },
        { text: "       salary,\n", startAt: 4.28, charInterval: 35 },
        { text: "       salary / 12.0 AS monthly_salary\n", startAt: 5.74, charInterval: 80 },
        { text: "FROM   employees;", startAt: 10.22, charInterval: 35 }
      ],
      scrollAt: 11.42
    },
    2: {
      src: "Day04/New_Day4Question02sol.mp3",
      code: "SELECT name,\n       unit_price,\n       cost_price,\n       unit_price - cost_price AS gross_profit\nFROM   products\nORDER BY gross_profit DESC;",
      segments: [
        { text: "SELECT name,\n", startAt: 1.88, charInterval: 38 },
        { text: "       unit_price,\n", startAt: 2.66, charInterval: 35 },
        { text: "       cost_price,\n", startAt: 4.06, charInterval: 35 },
        { text: "       unit_price - cost_price AS gross_profit\n", startAt: 6.12, charInterval: 50 },
        { text: "FROM   products\n", startAt: 11.1, charInterval: 45 },
        { text: "ORDER BY gross_profit DESC;", startAt: 12.22, charInterval: 50 }
      ],
      scrollAt: 14.17
    },
    3: {
      src: "Day04/New_Day4Question03sol.mp3",
      code: "SELECT first_name,\n       salary,\n       commission,\n       salary + COALESCE(commission, 0) AS total_comp\nFROM   employees;",
      segments: [
        { text: "SELECT first_name,\n", startAt: 1.64, charInterval: 36 },
        { text: "       salary,\n", startAt: 3.44, charInterval: 40 },
        { text: "       commission,\n", startAt: 4.04, charInterval: 35 },
        { text: "       salary + COALESCE(commission, 0) AS total_comp\n", startAt: 5.58, charInterval: 64 },
        { text: "FROM   employees;", startAt: 10.02, charInterval: 56 }
      ],
      scrollAt: 11.57
    },
    4: {
      src: "Day04/New_Day4Question04sol.mp3",
      code: "SELECT *\nFROM   employees\nWHERE  (department_id = 10 OR department_id = 20)\n  AND  salary > 70000;",
      segments: [
        { text: "SELECT *\n", startAt: 2.62, charInterval: 44 },
        { text: "FROM   employees\n", startAt: 3.28, charInterval: 56 },
        { text: "WHERE  (department_id = 10 OR department_id = 20)\n", startAt: 4.66, charInterval: 50 },
        { text: "  AND  salary > 70000;", startAt: 11.22, charInterval: 50 }
      ],
      scrollAt: 12.92
    },
    5: {
      src: "Day04/New_Day4Question05sol.mp3",
      code: "SELECT first_name,\n       salary\nFROM   employees\nWHERE  salary > (\n  SELECT MAX(salary)\n  FROM   employees\n  WHERE  department_id = 40\n);",
      segments: [
        { text: "SELECT first_name,\n", startAt: 1.78, charInterval: 37 },
        { text: "       salary\n", startAt: 4.06, charInterval: 57 },
        { text: "FROM   employees\n", startAt: 4.06, charInterval: 54 },
        { text: "WHERE  salary > (\n", startAt: 5.44, charInterval: 35 },
        { text: "  SELECT MAX(salary)\n", startAt: 8.1, charInterval: 50 },
        { text: "  FROM   employees\n", startAt: 9.32, charInterval: 45 },
        { text: "  WHERE  department_id = 40\n", startAt: 10.52, charInterval: 85 }
      ],
      scrollAt: 13.5
    },
    6: {
      src: "Day04/New_Day4Question06sol.mp3",
      code: "SELECT name,\n       unit_price * 1.18 AS markup_price\nFROM   products;",
      segments: [
        { text: "SELECT name,\n", startAt: 1.82, charInterval: 35 },
        { text: "       unit_price * 1.18 AS markup_price\n", startAt: 2.64, charInterval: 91 },
        { text: "FROM   products;", startAt: 7.46, charInterval: 51 }
      ],
      scrollAt: 8.88
    },
    7: {
      src: "Day04/New_Day4Question07sol.mp3",
      code: "SELECT first_name,\n       commission\nFROM   employees\nWHERE  commission > 5000\n   OR  commission IS NULL;",
      segments: [
        { text: "SELECT first_name,\n", startAt: 1.98, charInterval: 35 },
        { text: "       commission\n", startAt: 3.64, charInterval: 35 },
        { text: "FROM   employees\n", startAt: 3.92, charInterval: 68 },
        { text: "WHERE  commission > 5000\n", startAt: 5.58, charInterval: 50 },
        { text: "   OR  commission IS NULL;", startAt: 7.13, charInterval: 50 }
      ],
      scrollAt: 9.03
    },
    8: {
      src: "Day04/New_Day4Question08sol.mp3",
      code: "SELECT name,\n       (unit_price - cost_price) * 1.0 / NULLIF(unit_price, 0) AS margin\nFROM   products;",
      segments: [
        { text: "SELECT name,\n", startAt: 2.1, charInterval: 35 },
        { text: "       (unit_price - cost_price) * 1.0 / NULLIF(unit_price, 0) AS margin\n", startAt: 3.6, charInterval: 50 },
        { text: "FROM   products;", startAt: 13.2, charInterval: 35 }
      ],
      scrollAt: 14.36
    },
    9: {
      src: "Day04/New_Day4Question09sol.mp3",
      code: "SELECT name,\n       ROUND((unit_price - cost_price) * 100.0 / unit_price, 2) AS profit_pct\nFROM   products;",
      segments: [
        { text: "SELECT name,\n", startAt: 2.48, charInterval: 38 },
        { text: "       ROUND((unit_price - cost_price) * 100.0 / unit_price, 2) AS profit_pct\n", startAt: 3.3, charInterval: 50 },
        { text: "FROM   products;", startAt: 14.5, charInterval: 35 }
      ],
      scrollAt: 15.66
    },
    10: {
      src: "Day04/New_Day4Question10sol.mp3",
      code: "SELECT first_name,\n       salary\nFROM   employees\nWHERE  salary > (\n  SELECT MIN(salary)\n  FROM   employees\n  WHERE  department_id = 30\n);",
      segments: [
        { text: "SELECT first_name,\n", startAt: 2.72, charInterval: 35 },
        { text: "       salary\n", startAt: 4.76, charInterval: 57 },
        { text: "FROM   employees\n", startAt: 4.76, charInterval: 55 },
        { text: "WHERE  salary > (\n", startAt: 6.14, charInterval: 35 },
        { text: "  SELECT MIN(salary)\n", startAt: 8.82, charInterval: 50 },
        { text: "  FROM   employees\n", startAt: 9.98, charInterval: 44 },
        { text: "  WHERE  department_id = 30\n", startAt: 11.14, charInterval: 86 }
      ],
      scrollAt: 14.15
    },
    11: {
      src: "Day04/New_Day4Question11sol.mp3",
      code: "SELECT product_id,\n       name\nFROM   products\nWHERE  product_id % 2 = 0;",
      segments: [
        { text: "SELECT product_id,\n", startAt: 2.42, charInterval: 38 },
        { text: "       name\n", startAt: 4.4, charInterval: 35 },
        { text: "FROM   products\n", startAt: 4.7, charInterval: 44 },
        { text: "WHERE  product_id % 2 = 0;", startAt: 5.84, charInterval: 50 }
      ],
      scrollAt: 7.74
    },
    12: {
      src: "Day04/New_Day4Question12sol.mp3",
      code: "SELECT name,\n       stock_qty * cost_price AS stock_value\nFROM   products\nWHERE  stock_qty * cost_price > 100000;",
      segments: [
        { text: "SELECT name,\n", startAt: 1.86, charInterval: 69 },
        { text: "       stock_qty * cost_price AS stock_value\n", startAt: 2.9, charInterval: 35 },
        { text: "FROM   products\n", startAt: 7.24, charInterval: 44 },
        { text: "WHERE  stock_qty * cost_price > 100000;", startAt: 8.48, charInterval: 50 }
      ],
      scrollAt: 11.03
    }
  },
  'day05': {
    1: 'Day05/New_Day5Question01.mp3',
    2: 'Day05/New_Day5Question02.mp3',
    3: 'Day05/New_Day5Question03.mp3',
    4: 'Day05/New_Day5Question04.mp3',
    5: 'Day05/New_Day5Question05.mp3',
    6: 'Day05/New_Day5Question06.mp3',
    7: 'Day05/New_Day5Question07.mp3',
    8: 'Day05/New_Day5Question08.mp3',
    9: 'Day05/New_Day5Question09.mp3',
    10: 'Day05/New_Day5Question10.mp3',
    11: 'Day05/New_Day5Question11.mp3',
    12: 'Day05/New_Day5Question12.mp3',
    13: 'Day05/New_Day5Question13.mp3',
    14: 'Day05/New_Day5Question14.mp3',
    15: 'Day05/New_Day5Question15.mp3'
  }
};

// Map per day → question id → { src, code, startAt (seconds), charInterval (ms) }

function getSolutionEntry(qId, topicIdx) {
  const tIdx = typeof topicIdx === 'number' ? topicIdx : (typeof currentSlide !== 'undefined' ? currentSlide : 0);
  const daySolMap = typeof questionSolutionMap !== 'undefined' ? (questionSolutionMap[currentDay] || questionSolutionMap['day01']) : null;
  if (!daySolMap) return null;
  if (daySolMap.topics && daySolMap.topics[tIdx] && daySolMap.topics[tIdx][qId]) {
    return daySolMap.topics[tIdx][qId];
  }
  if (daySolMap[tIdx] && typeof daySolMap[tIdx] === 'object' && daySolMap[tIdx][qId]) {
    return daySolMap[tIdx][qId];
  }
  if (daySolMap[qId]) {
    return daySolMap[qId];
  }
  return null;
}

function getQuestionAudioSrc(qId, topicIdx) {
  const tIdx = typeof topicIdx === 'number' ? topicIdx : (typeof currentSlide !== 'undefined' ? currentSlide : 0);
  const dayAudioMap = typeof questionAudioMap !== 'undefined' ? (questionAudioMap[currentDay] || questionAudioMap['day01']) : null;
  if (!dayAudioMap) return null;
  if (dayAudioMap.topics && dayAudioMap.topics[tIdx] && dayAudioMap.topics[tIdx][qId]) {
    return dayAudioMap.topics[tIdx][qId];
  }
  if (dayAudioMap[tIdx] && typeof dayAudioMap[tIdx] === 'object' && dayAudioMap[tIdx][qId]) {
    return dayAudioMap[tIdx][qId];
  }
  if (dayAudioMap[qId]) {
    return dayAudioMap[qId];
  }
  return null;
}

const questionSolutionMap = {
  'day01': {
    topics: {
      0: {
        1: {
          src: 'New_Day1Part1Question02.mp3',
          code: 'SELECT *\nFROM employees;',
          segments: [
            { text: "SELECT *\n", startAt: 1.16, charInterval: 58 },
            { text: "FROM employees;", startAt: 2.38, charInterval: 47 }
          ],
          scrollAt: 4.0
        }
      },
      1: {
        1: {
          src: 'Day01topic2/New_Day1Part2Question01.mp3',
          code: 'SELECT name,\n       department\nFROM   employees;',
          segments: [
            { text: "SELECT ", startAt: 12.48, charInterval: 45 },
            { text: "name,\n", startAt: 12.80, charInterval: 45 },
            { text: "       department\n", startAt: 13.50, charInterval: 20 },
            { text: "FROM   employees;", startAt: 13.86, charInterval: 40 }
          ],
          scrollAt: 15.2
        },
        2: {
          src: 'Day01topic2/New_Day1Part2Question02.mp3',
          code: 'SELECT id,\n       name,\n       salary\nFROM   employees;',
          segments: [
            { text: "SELECT id,\n", startAt: 5.20, charInterval: 45 },
            { text: "       name,\n", startAt: 6.34, charInterval: 25 },
            { text: "       salary\n", startAt: 6.70, charInterval: 25 },
            { text: "FROM   employees;", startAt: 8.44, charInterval: 40 }
          ],
          scrollAt: 11.5
        }
      }
    },
    1: {
      src: 'New_Day1Part1Question02.mp3',
      code: 'SELECT *\nFROM employees;',
      segments: [
        { text: "SELECT *\n", startAt: 1.16, charInterval: 58 },
        { text: "FROM employees;", startAt: 2.38, charInterval: 47 }
      ],
      scrollAt: 4.0
    }
  },
  'day02': {
    1: {
      src: 'Day02/New_Day2Question01sol.mp3',
      code: 'SELECT name, unit_price, stock_qty\nFROM products\nORDER BY unit_price DESC;',
      // Segments aligned to exact Whisper word timestamps from narration:
      // 3.14s "select" → 3.42s "name," → 4.48s "unit [_price]" → 6.06s "stock [_qty]"
      // 11.18s "from products" → 15.16s "order" → 15.60s "unit [_price DESC]"
      segments: [
        { text: "SELECT ", startAt: 3.14, charInterval: 80 },
        { text: "name, ", startAt: 3.42, charInterval: 60 },
        { text: "unit_price, ", startAt: 4.48, charInterval: 50 },
        { text: "stock_qty\n", startAt: 6.06, charInterval: 55 },
        { text: "FROM products\n", startAt: 11.18, charInterval: 55 },
        { text: "ORDER BY ", startAt: 15.16, charInterval: 50 },
        { text: "unit_price DESC;", startAt: 15.60, charInterval: 45 }
      ],
      scrollAt: 17.0
    },
    2: {
      src: 'Day02/New_Day2Question02sol.mp3',
      code: 'SELECT first_name, last_name, salary\nFROM employees\nORDER BY salary DESC\nLIMIT 5;',
      segments: [
        { text: "SELECT ", startAt: 2.64, charInterval: 80 },
        { text: "first_name, ", startAt: 3.06, charInterval: 50 },
        { text: "last_name, ", startAt: 4.02, charInterval: 50 },
        { text: "salary\n", startAt: 4.88, charInterval: 55 },
        { text: "FROM employees\n", startAt: 5.22, charInterval: 55 },
        { text: "ORDER BY ", startAt: 11.48, charInterval: 50 },
        { text: "salary DESC\n", startAt: 12.04, charInterval: 50 },
        { text: "LIMIT 5;", startAt: 16.70, charInterval: 50 }
      ],
      scrollAt: 17.3
    },
    3: {
      src: 'Day02/New_Day2Question03sol.mp3',
      code: 'SELECT DISTINCT region\nFROM customers;',
      segments: [
        // "SELECT DISTINCT " — merged to avoid RAF overlap (4.62→5.08s = 28ms/char)
        { text: "SELECT DISTINCT ", startAt: 4.62, charInterval: 28 },
        { text: "region\n", startAt: 5.08, charInterval: 55 },
        { text: "FROM ", startAt: 9.20, charInterval: 30 },
        { text: "customers;", startAt: 9.42, charInterval: 45 }
      ],
      scrollAt: 13.5
    },
    4: {
      src: 'Day02/New_Day2Question04sol.mp3',
      code: 'SELECT first_name, salary AS annual_salary\nFROM employees\nORDER BY first_name ASC;',
      segments: [
        { text: "SELECT ", startAt: 2.74, charInterval: 60 },
        { text: "first_name, ", startAt: 3.30, charInterval: 45 },
        { text: "salary AS ", startAt: 5.50, charInterval: 45 },
        { text: "annual_salary\n", startAt: 6.68, charInterval: 50 },
        { text: "FROM employees\n", startAt: 13.50, charInterval: 50 },
        { text: "ORDER BY ", startAt: 18.62, charInterval: 45 },
        { text: "first_name ASC;", startAt: 19.36, charInterval: 45 }
      ],
      scrollAt: 24.0
    },
    5: {
      src: 'Day02/New_Day2Question05sol.mp3',
      code: 'SELECT *\nFROM customers\nLIMIT 5;',
      segments: [
        { text: "SELECT *\n", startAt: 2.36, charInterval: 60 },
        { text: "FROM customers\n", startAt: 6.88, charInterval: 50 },
        { text: "LIMIT 5;", startAt: 8.94, charInterval: 50 }
      ],
      scrollAt: 9.8
    },
    6: {
      src: 'Day02/New_Day2Question06sol.mp3',
      code: 'SELECT name,\n       unit_price,\n       cost_price,\n       unit_price - cost_price AS profit\nFROM products\nORDER BY profit DESC;',
      // Whisper word timestamps from New_Day2Question06sol.mp3 (24.1s)
      // Formatted in structured multi-line order matching reference image:
      segments: [
        { text: "SELECT name,\n", startAt: 3.40, charInterval: 45 },
        { text: "       unit_price,\n", startAt: 4.44, charInterval: 45 },
        { text: "       cost_price,\n", startAt: 5.32, charInterval: 45 },
        { text: "       unit_price - cost_price ", startAt: 10.78, charInterval: 40 },
        { text: "AS profit\n", startAt: 14.36, charInterval: 45 },
        { text: "FROM products\n", startAt: 17.58, charInterval: 45 },
        { text: "ORDER BY profit DESC;", startAt: 22.56, charInterval: 40 }
      ],
      scrollAt: 23.9
    }
  },
  'day03': {
    1: {
      src: 'Day03/New_Day3Question01sol.mp3',
      code: 'SELECT name,\n       unit_price\nFROM   products\nWHERE  unit_price > 10000\nORDER BY unit_price DESC;',
      segments: [
        { text: "SELECT name,\n", startAt: 1.68, charInterval: 45 },
        { text: "       unit_price\n", startAt: 2.58, charInterval: 45 },
        { text: "FROM   products\n", startAt: 3.54, charInterval: 40 },
        { text: "WHERE  unit_price > 10000\n", startAt: 4.66, charInterval: 65 },
        { text: "ORDER BY unit_price DESC;", startAt: 7.64, charInterval: 50 }
      ],
      scrollAt: 9.5
    },
    2: {
      src: 'Day03/New_Day3Question02sol.mp3',
      code: 'SELECT first_name,\n       last_name,\n       region\nFROM   customers\nWHERE  region IN (\'North\', \'East\');',
      segments: [
        { text: "SELECT first_name,\n", startAt: 1.46, charInterval: 45 },
        { text: "       last_name,\n", startAt: 2.74, charInterval: 45 },
        { text: "       region\n", startAt: 3.54, charInterval: 45 },
        { text: "FROM   customers\n", startAt: 3.98, charInterval: 40 },
        { text: "WHERE  region IN ('North', 'East');", startAt: 5.52, charInterval: 65 }
      ],
      scrollAt: 8.2
    },
    3: {
      src: 'Day03/New_Day3Question03sol.mp3',
      code: 'SELECT first_name,\n       last_name,\n       salary\nFROM   employees\nWHERE  salary BETWEEN 60000 AND 100000;',
      segments: [
        { text: "SELECT first_name,\n", startAt: 1.50, charInterval: 45 },
        { text: "       last_name,\n", startAt: 2.70, charInterval: 45 },
        { text: "       salary\n", startAt: 3.42, charInterval: 40 },
        { text: "FROM   employees\n", startAt: 4.46, charInterval: 40 },
        { text: "WHERE  salary BETWEEN 60000 AND 100000;", startAt: 5.72, charInterval: 60 }
      ],
      scrollAt: 9.5
    },
    4: {
      src: 'Day03/New_Day3Question04sol.mp3',
      code: 'SELECT first_name,\n       last_name,\n       salary\nFROM   employees\nWHERE  first_name LIKE \'S%\';',
      segments: [
        { text: "SELECT first_name,\n", startAt: 2.62, charInterval: 45 },
        { text: "       last_name,\n", startAt: 3.86, charInterval: 45 },
        { text: "       salary\n", startAt: 4.60, charInterval: 40 },
        { text: "FROM   employees\n", startAt: 5.66, charInterval: 40 },
        { text: "WHERE  first_name LIKE 'S%';", startAt: 6.78, charInterval: 65 }
      ],
      scrollAt: 9.6
    },
    5: {
      src: 'Day03/New_Day3Question05sol.mp3',
      code: 'SELECT first_name,\n       department_id,\n       salary\nFROM   employees\nWHERE  is_active = 1\n  AND  department_id = 20;',
      segments: [
        { text: "SELECT first_name,\n", startAt: 1.32, charInterval: 45 },
        { text: "       department_id,\n", startAt: 2.56, charInterval: 45 },
        { text: "       salary\n", startAt: 3.54, charInterval: 40 },
        { text: "FROM   employees\n", startAt: 4.66, charInterval: 40 },
        { text: "WHERE  is_active = 1\n", startAt: 5.86, charInterval: 55 },
        { text: "  AND  department_id = 20;", startAt: 7.68, charInterval: 60 }
      ],
      scrollAt: 9.8
    },
    6: {
      src: 'Day03/New_Day3Question06sol.mp3',
      code: 'SELECT first_name,\n       last_name,\n       commission\nFROM   employees\nWHERE  commission IS NULL;',
      segments: [
        { text: "SELECT first_name,\n", startAt: 2.46, charInterval: 45 },
        { text: "       last_name,\n", startAt: 3.72, charInterval: 45 },
        { text: "       commission\n", startAt: 4.46, charInterval: 45 },
        { text: "FROM   employees\n", startAt: 5.60, charInterval: 40 },
        { text: "WHERE  commission IS NULL;", startAt: 6.70, charInterval: 65 }
      ],
      scrollAt: 8.6
    }
  },
  'day04': {
    1: {
      src: 'Day04/New_Day4Question01sol.mp3',
      code: 'SELECT first_name,\n       salary,\n       salary / 12.0 AS monthly_salary\nFROM   employees;',
      segments: [
        { text: "SELECT first_name,\n", startAt: 1.70, charInterval: 55 },
        { text: "       salary,\n", startAt: 3.40, charInterval: 60 },
        { text: "       salary / 12.0 AS monthly_salary\n", startAt: 5.40, charInterval: 65 },
        { text: "FROM   employees;", startAt: 10.30, charInterval: 45 }
      ],
      scrollAt: 10.8
    },
    2: {
      src: 'Day04/New_Day4Question02sol.mp3',
      code: 'SELECT name,\n       unit_price,\n       cost_price,\n       unit_price - cost_price AS gross_profit\nFROM   products\nORDER BY gross_profit DESC;',
      segments: [
        { text: "SELECT name,\n", startAt: 1.70, charInterval: 55 },
        { text: "       unit_price,\n", startAt: 3.00, charInterval: 60 },
        { text: "       cost_price,\n", startAt: 4.60, charInterval: 60 },
        { text: "       unit_price - cost_price AS gross_profit\n", startAt: 6.80, charInterval: 65 },
        { text: "FROM   products\n", startAt: 11.50, charInterval: 45 },
        { text: "ORDER BY gross_profit DESC;", startAt: 12.60, charInterval: 50 }
      ],
      scrollAt: 13.5
    },
    3: {
      src: 'Day04/New_Day4Question03sol.mp3',
      code: 'SELECT first_name,\n       salary,\n       commission,\n       salary + COALESCE(commission, 0) AS total_comp\nFROM   employees;',
      segments: [
        { text: "SELECT first_name,\n", startAt: 1.70, charInterval: 55 },
        { text: "       salary,\n", startAt: 3.40, charInterval: 60 },
        { text: "       commission,\n", startAt: 4.50, charInterval: 60 },
        { text: "       salary + COALESCE(commission, 0) AS total_comp\n", startAt: 6.20, charInterval: 70 },
        { text: "FROM   employees;", startAt: 10.30, charInterval: 45 }
      ],
      scrollAt: 10.8
    },
    4: {
      src: 'Day04/New_Day4Question04sol.mp3',
      code: 'SELECT *\nFROM   employees\nWHERE  (department_id = 10 OR department_id = 20)\n  AND  salary > 70000;',
      segments: [
        { text: "SELECT *\n", startAt: 2.20, charInterval: 50 },
        { text: "FROM   employees\n", startAt: 3.40, charInterval: 50 },
        { text: "WHERE  (department_id = 10 OR department_id = 20)\n", startAt: 4.80, charInterval: 75 },
        { text: "  AND  salary > 70000;", startAt: 11.20, charInterval: 55 }
      ],
      scrollAt: 12.0
    },
    5: {
      src: 'Day04/New_Day4Question05sol.mp3',
      code: 'SELECT first_name,\n       salary\nFROM   employees\nWHERE  salary > (\n  SELECT MAX(salary)\n  FROM   employees\n  WHERE  department_id = 40\n);',
      segments: [
        { text: "SELECT first_name,\n", startAt: 1.70, charInterval: 55 },
        { text: "       salary\n", startAt: 3.40, charInterval: 55 },
        { text: "FROM   employees\n", startAt: 4.50, charInterval: 50 },
        { text: "WHERE  salary > (\n", startAt: 5.80, charInterval: 60 },
        { text: "  SELECT MAX(salary)\n", startAt: 7.80, charInterval: 60 },
        { text: "  FROM   employees\n", startAt: 9.10, charInterval: 50 },
        { text: "  WHERE  department_id = 40\n);", startAt: 10.40, charInterval: 65 }
      ],
      scrollAt: 12.5
    },
    6: {
      src: 'Day04/New_Day4Question06sol.mp3',
      code: 'SELECT name,\n       unit_price * 1.18 AS markup_price\nFROM   products;',
      segments: [
        { text: "SELECT name,\n", startAt: 1.40, charInterval: 50 },
        { text: "       unit_price * 1.18 AS markup_price\n", startAt: 2.50, charInterval: 75 },
        { text: "FROM   products;", startAt: 7.50, charInterval: 45 }
      ],
      scrollAt: 8.0
    },
    7: {
      src: 'Day04/New_Day4Question07sol.mp3',
      code: 'SELECT first_name,\n       commission\nFROM   employees\nWHERE  commission > 5000\n   OR  commission IS NULL;',
      segments: [
        { text: "SELECT first_name,\n", startAt: 1.70, charInterval: 55 },
        { text: "       commission\n", startAt: 3.40, charInterval: 55 },
        { text: "FROM   employees\n", startAt: 4.20, charInterval: 50 },
        { text: "WHERE  commission > 5000\n", startAt: 5.30, charInterval: 65 },
        { text: "   OR  commission IS NULL;", startAt: 8.10, charInterval: 60 }
      ],
      scrollAt: 9.2
    },
    8: {
      src: 'Day04/New_Day4Question08sol.mp3',
      code: 'SELECT name,\n       (unit_price - cost_price) * 1.0 / NULLIF(unit_price, 0) AS margin\nFROM   products;',
      segments: [
        { text: "SELECT name,\n", startAt: 1.80, charInterval: 50 },
        { text: "       (unit_price - cost_price) * 1.0 / NULLIF(unit_price, 0) AS margin\n", startAt: 2.80, charInterval: 85 },
        { text: "FROM   products;", startAt: 13.00, charInterval: 45 }
      ],
      scrollAt: 13.5
    },
    9: {
      src: 'Day04/New_Day4Question09sol.mp3',
      code: 'SELECT name,\n       ROUND((unit_price - cost_price) * 100.0 / unit_price, 2) AS profit_pct\nFROM   products;',
      segments: [
        { text: "SELECT name,\n", startAt: 2.20, charInterval: 50 },
        { text: "       ROUND((unit_price - cost_price) * 100.0 / unit_price, 2) AS profit_pct\n", startAt: 3.10, charInterval: 95 },
        { text: "FROM   products;", startAt: 14.40, charInterval: 45 }
      ],
      scrollAt: 14.8
    },
    10: {
      src: 'Day04/New_Day4Question10sol.mp3',
      code: 'SELECT first_name,\n       salary\nFROM   employees\nWHERE  salary > (\n  SELECT MIN(salary)\n  FROM   employees\n  WHERE  department_id = 30\n);',
      segments: [
        { text: "SELECT first_name,\n", startAt: 2.40, charInterval: 55 },
        { text: "       salary\n", startAt: 4.20, charInterval: 55 },
        { text: "FROM   employees\n", startAt: 4.90, charInterval: 50 },
        { text: "WHERE  salary > (\n", startAt: 6.00, charInterval: 60 },
        { text: "  SELECT MIN(salary)\n", startAt: 8.60, charInterval: 60 },
        { text: "  FROM   employees\n", startAt: 9.70, charInterval: 50 },
        { text: "  WHERE  department_id = 30\n);", startAt: 11.00, charInterval: 65 }
      ],
      scrollAt: 13.0
    },
    11: {
      src: 'Day04/New_Day4Question11sol.mp3',
      code: 'SELECT product_id,\n       name\nFROM   products\nWHERE  product_id % 2 = 0;',
      segments: [
        { text: "SELECT product_id,\n", startAt: 2.30, charInterval: 55 },
        { text: "       name\n", startAt: 4.30, charInterval: 50 },
        { text: "FROM   products\n", startAt: 4.70, charInterval: 50 },
        { text: "WHERE  product_id % 2 = 0;", startAt: 5.60, charInterval: 65 }
      ],
      scrollAt: 8.5
    },
    12: {
      src: 'Day04/New_Day4Question12sol.mp3',
      code: 'SELECT name,\n       stock_qty * cost_price AS stock_value\nFROM   products\nWHERE  stock_qty * cost_price > 100000;',
      segments: [
        { text: "SELECT name,\n", startAt: 1.80, charInterval: 50 },
        { text: "       stock_qty * cost_price AS stock_value\n", startAt: 2.70, charInterval: 75 },
        { text: "FROM   products\n", startAt: 7.10, charInterval: 50 },
        { text: "WHERE  stock_qty * cost_price > 100000;", startAt: 8.20, charInterval: 75 }
      ],
      scrollAt: 12.0
    }
  },
    'day05': {
    1: {
      src: 'Day05/New_Day5Question01sol.mp3',
      code: 'SELECT SUM(salary) AS total_payroll,\n       AVG(salary) AS avg_salary,\n       MIN(salary) AS min_salary,\n       MAX(salary) AS max_salary\nFROM   employees;',
      segments: [
        { text: 'SELECT SUM(salary) AS total_payroll,\n', startAt: 2.44, charInterval: 65 },
        { text: '       AVG(salary) AS avg_salary,\n', startAt: 5.31, charInterval: 71 },
        { text: '       MIN(salary) AS min_salary,\n', startAt: 8.18, charInterval: 71 },
        { text: '       MAX(salary) AS max_salary\n', startAt: 11.06, charInterval: 73 },
        { text: 'FROM   employees;', startAt: 13.93, charInterval: 85 }
      ],
      scrollAt: 15.96
    },
    2: {
      src: 'Day05/New_Day5Question02sol.mp3',
      code: 'SELECT COUNT(*) AS active_employees\nFROM   employees\nWHERE  is_active = 1;',
      segments: [
        { text: 'SELECT COUNT(*) AS active_employees\n', startAt: 2.06, charInterval: 53 },
        { text: 'FROM   employees\n', startAt: 4.32, charInterval: 85 },
        { text: 'WHERE  is_active = 1;', startAt: 6.58, charInterval: 85 }
      ],
      scrollAt: 8.4
    },
    3: {
      src: 'Day05/New_Day5Question03sol.mp3',
      code: 'SELECT MIN(unit_price) AS cheapest,\n       MAX(unit_price) AS most_expensive\nFROM   products;',
      segments: [
        { text: 'SELECT MIN(unit_price) AS cheapest,\n', startAt: 2.02, charInterval: 67 },
        { text: '       MAX(unit_price) AS most_expensive\n', startAt: 4.87, charInterval: 59 },
        { text: 'FROM   products;', startAt: 7.73, charInterval: 85 }
      ],
      scrollAt: 10.05
    },
    4: {
      src: 'Day05/New_Day5Question04sol.mp3',
      code: 'SELECT COUNT(*) AS total,\n       COUNT(commission) AS has_commission,\n       COUNT(*) - COUNT(commission) AS no_commission\nFROM   employees;',
      segments: [
        { text: 'SELECT COUNT(*) AS total,\n', startAt: 2.18, charInterval: 75 },
        { text: '       COUNT(commission) AS has_commission,\n', startAt: 4.5, charInterval: 44 },
        { text: '       COUNT(*) - COUNT(commission) AS no_commission\n', startAt: 6.81, charInterval: 37 },
        { text: 'FROM   employees;', startAt: 9.12, charInterval: 85 }
      ],
      scrollAt: 10.87
    },
    5: {
      src: 'Day05/New_Day5Question05sol.mp3',
      code: 'SELECT SUM(total_amount) AS shipped_revenue\nFROM   orders\nWHERE  status = \'Shipped\';',
      segments: [
        { text: 'SELECT SUM(total_amount) AS shipped_revenue\n', startAt: 2.24, charInterval: 41 },
        { text: 'FROM   orders\n', startAt: 4.4, charInterval: 85 },
        { text: 'WHERE  status = \'Shipped\';', startAt: 6.56, charInterval: 70 }
      ],
      scrollAt: 8.28
    },
    6: {
      src: 'Day05/New_Day5Question06sol.mp3',
      code: 'SELECT COUNT(DISTINCT department_id) AS num_departments\nFROM   employees;',
      segments: [
        { text: 'SELECT COUNT(DISTINCT department_id) AS num_departments\n', startAt: 2.42, charInterval: 45 },
        { text: 'FROM   employees;', startAt: 5.39, charInterval: 85 }
      ],
      scrollAt: 7.94
    },
    7: {
      src: 'Day05/New_Day5Question07sol.mp3',
      code: 'SELECT SUM(stock_qty * unit_price) AS inventory_value\nFROM   products;',
      segments: [
        { text: 'SELECT SUM(stock_qty * unit_price) AS inventory_value\n', startAt: 2.58, charInterval: 51 },
        { text: 'FROM   products;', startAt: 5.82, charInterval: 85 }
      ],
      scrollAt: 8.61
    },
    8: {
      src: 'Day05/New_Day5Question08sol.mp3',
      code: 'SELECT AVG(commission) AS avg_non_null,\n       AVG(COALESCE(commission, 0)) AS avg_all\nFROM   employees;',
      segments: [
        { text: 'SELECT AVG(commission) AS avg_non_null,\n', startAt: 2.12, charInterval: 70 },
        { text: '       AVG(COALESCE(commission, 0)) AS avg_all\n', startAt: 5.42, charInterval: 59 },
        { text: 'FROM   employees;', startAt: 8.72, charInterval: 85 }
      ],
      scrollAt: 11.42
    },
    9: {
      src: 'Day05/New_Day5Question09sol.mp3',
      code: 'SELECT COUNT(*) AS premium_count\nFROM   products\nWHERE  unit_price > 5000;',
      segments: [
        { text: 'SELECT COUNT(*) AS premium_count\n', startAt: 2.12, charInterval: 60 },
        { text: 'FROM   products\n', startAt: 4.48, charInterval: 85 },
        { text: 'WHERE  unit_price > 5000;', startAt: 6.84, charInterval: 80 }
      ],
      scrollAt: 8.74
    },
    10: {
      src: 'Day05/New_Day5Question10sol.mp3',
      code: 'SELECT COALESCE(AVG(salary), 0) AS avg_salary\nFROM   employees\nWHERE  department_id = 99;',
      segments: [
        { text: 'SELECT COALESCE(AVG(salary), 0) AS avg_salary\n', startAt: 2.6, charInterval: 57 },
        { text: 'FROM   employees\n', startAt: 5.73, charInterval: 85 },
        { text: 'WHERE  department_id = 99;', startAt: 8.85, charInterval: 85 }
      ],
      scrollAt: 11.38
    },
    11: {
      src: 'Day05/New_Day5Question11sol.mp3',
      code: 'SELECT MAX(total_amount) AS largest_order\nFROM   orders;',
      segments: [
        { text: 'SELECT MAX(total_amount) AS largest_order\n', startAt: 2.0, charInterval: 54 },
        { text: 'FROM   orders;', startAt: 4.69, charInterval: 85 }
      ],
      scrollAt: 7.01
    },
    12: {
      src: 'Day05/New_Day5Question12sol.mp3',
      code: 'SELECT COUNT(DISTINCT region) AS num_regions\nFROM   customers;',
      segments: [
        { text: 'SELECT COUNT(DISTINCT region) AS num_regions\n', startAt: 2.3, charInterval: 42 },
        { text: 'FROM   customers;', startAt: 4.53, charInterval: 85 }
      ],
      scrollAt: 6.42
    },
    13: {
      src: 'Day05/New_Day5Question13sol.mp3',
      code: 'SELECT SUM(CASE WHEN status = \'Shipped\' THEN total_amount ELSE 0 END) AS shipped_rev,\n       SUM(CASE WHEN status = \'Processing\' THEN total_amount ELSE 0 END) AS processing_rev\nFROM   orders;',
      segments: [
        { text: 'SELECT SUM(CASE WHEN status = \'Shipped\' THEN total_amount ELSE 0 END) AS shipped_rev,\n', startAt: 2.98, charInterval: 51 },
        { text: '       SUM(CASE WHEN status = \'Processing\' THEN total_amount ELSE 0 END) AS processing_rev\n', startAt: 8.15, charInterval: 48 },
        { text: 'FROM   orders;', startAt: 13.33, charInterval: 85 }
      ],
      scrollAt: 17.58
    },
    14: {
      src: 'Day05/New_Day5Question14sol.mp3',
      code: 'SELECT ROUND(SUM(unit_price * qty) * 1.0 / NULLIF(SUM(qty), 0), 2) AS weighted_avg_price\nFROM   order_items;',
      segments: [
        { text: 'SELECT ROUND(SUM(unit_price * qty) * 1.0 / NULLIF(SUM(qty), 0), 2) AS weighted_avg_price\n', startAt: 2.56, charInterval: 63 },
        { text: 'FROM   order_items;', startAt: 9.16, charInterval: 85 }
      ],
      scrollAt: 14.97
    },
    15: {
      src: 'Day05/New_Day5Question15sol.mp3',
      code: 'SELECT GROUP_CONCAT(name, \', \') AS engineering_team\nFROM   employees\nWHERE  department_id = 10;',
      segments: [
        { text: 'SELECT GROUP_CONCAT(name, \', \') AS engineering_team\n', startAt: 2.1, charInterval: 50 },
        { text: 'FROM   employees\n', startAt: 5.19, charInterval: 85 },
        { text: 'WHERE  department_id = 10;', startAt: 8.29, charInterval: 85 }
      ],
      scrollAt: 10.81
    }
  }
};

let typewriterTimers = [];
let typewriterRafId = null;
let currentTableScrollInterval = null;

// ???????????????????????????????????????????????????????????????
// UNIFIED AUDIO-SYNCED TYPEWRITER ENGINE (Robust & Resilient)
// ???????????????????????????????????????????????????????????????

let typewriterAttachedAudio = null;
let typewriterPlayHandler = null;
let typewriterTimeupdateHandler = null;
let typewriterEndedHandler = null;

function cancelTypewriter() {
  removeYourTurnBanner();
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
  if (typewriterAttachedAudio) {
    try {
      if (typewriterPlayHandler) {
        typewriterAttachedAudio.removeEventListener('play', typewriterPlayHandler);
        typewriterAttachedAudio.removeEventListener('playing', typewriterPlayHandler);
      }
      if (typewriterTimeupdateHandler) {
        typewriterAttachedAudio.removeEventListener('timeupdate', typewriterTimeupdateHandler);
      }
      if (typewriterEndedHandler) {
        typewriterAttachedAudio.removeEventListener('ended', typewriterEndedHandler);
      }
    } catch (e) {}
    typewriterAttachedAudio = null;
  }
}

function setEditorCodeSafely(val) {
  if (!mainEditor) return;
  isProgrammaticTyping = true;
  try {
    mainEditor.setValue(val || '');
    if (val) {
      const lastLine = mainEditor.lastLine();
      mainEditor.setCursor({ line: lastLine, ch: mainEditor.getLine(lastLine).length });
    }
  } catch (e) {
  } finally {
    isProgrammaticTyping = false;
  }
}

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
        syncEvents.push({ atSec: seg.startAt / speed + idx * intervalSec, text: currentCode, char: ch });
      });
    });
  } else {
    const chars = (solEntry.code || '').split('');
    let currentCode = '';
    const startAtSec = (solEntry.startAt || 1.5) / speed;
    const intervalSec = ((solEntry.charInterval || 70) / 1000) / speed;
    chars.forEach((ch, idx) => {
      currentCode += ch;
      syncEvents.push({ atSec: startAtSec + idx * intervalSec, text: currentCode, char: ch });
    });
  }

  syncEvents.sort((a, b) => a.atSec - b.atSec);

  const scrollAtSec = (solEntry.scrollAt || 13.5) / speed;
  const initialTime = (audioObj && typeof audioObj.currentTime === 'number') ? audioObj.currentTime : 0;

  // Fast-forward editor state to initialTime if seeked into middle of track
  let nextEvtIdx = 0;
  let currentText = '';
  while (nextEvtIdx < syncEvents.length && initialTime >= syncEvents[nextEvtIdx].atSec) {
    currentText = syncEvents[nextEvtIdx].text;
    nextEvtIdx++;
  }

  setEditorCodeSafely(currentText);

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

  function step() {
    if (!audioObj || audioObj.ended) {
      typewriterRafId = null;
      return;
    }
    const ct = audioObj.currentTime || 0;

    // Handle backward seek/scrubbing seamlessly
    if (nextEvtIdx > 0 && ct < syncEvents[nextEvtIdx - 1].atSec) {
      nextEvtIdx = 0;
      let text = '';
      while (nextEvtIdx < syncEvents.length && ct >= syncEvents[nextEvtIdx].atSec) {
        text = syncEvents[nextEvtIdx].text;
        nextEvtIdx++;
      }
      setEditorCodeSafely(text);
    }

    while (nextEvtIdx < syncEvents.length && ct >= syncEvents[nextEvtIdx].atSec) {
      const ev = syncEvents[nextEvtIdx];
      setEditorCodeSafely(ev.text);
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

    if (!audioObj.paused && !audioObj.ended) {
      typewriterRafId = requestAnimationFrame(step);
    } else {
      typewriterRafId = null;
    }
  }

  function ensureRunning() {
    if (!typewriterRafId) {
      typewriterRafId = requestAnimationFrame(step);
    }
  }

  // Bind lifecycle listeners if audioObj is an EventTarget
  if (typeof audioObj.addEventListener === 'function') {
    typewriterAttachedAudio = audioObj;
    typewriterPlayHandler = ensureRunning;
    typewriterTimeupdateHandler = step;
    typewriterEndedHandler = () => cancelTypewriter();

    audioObj.addEventListener('play', typewriterPlayHandler);
    audioObj.addEventListener('playing', typewriterPlayHandler);
    audioObj.addEventListener('timeupdate', typewriterTimeupdateHandler);
    audioObj.addEventListener('ended', typewriterEndedHandler, { once: true });
  }

  ensureRunning();
  step();
}

function showYourTurnBanner() {
  const toolbar = document.querySelector('.editor-toolbar');
  if (toolbar && !document.getElementById('yourTurnBanner')) {
    const banner = document.createElement('div');
    banner.id = 'yourTurnBanner';
    banner.className = 'your-turn-banner';
    banner.innerHTML = `💡 <strong>Your Turn!</strong> Write & Run query before solution plays!`;
    toolbar.appendChild(banner);
  }
}

function removeYourTurnBanner() {
  const existing = document.getElementById('yourTurnBanner');
  if (existing) existing.remove();
}

function renderPracticeQuestion() {
  const q = COURSE_CONFIG.practiceQuestions[currentPracticeQ];
  if (q) {
    const promptEl = document.getElementById('questionPrompt');
    if (promptEl) promptEl.innerHTML = q.isChallenge ? q.prompt : `Q${q.id}. ${q.prompt}`;
    setTimeout(() => { if (typeof initSchemaCodePeeking === 'function') initSchemaCodePeeking(); }, 20);
    const counterEl = document.getElementById('qCounter');
    if (counterEl) counterEl.textContent = q.isChallenge ? 'Challenge' : `Question-${String(q.id).padStart(2, '0')}`;

    // Update question audio button based on the question id & active topic slide
    const btn = document.getElementById('questionAudioBtn');
    let audioSrc = q.questionAudio || getQuestionAudioSrc(q.id);
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
      let solEntry = (q && q.solutionAudio) ? { src: q.solutionAudio, code: q.referenceSql, startAt: 1.5, charInterval: 70 } : getSolutionEntry(q.id);
      solBtn.style.display = solEntry ? 'inline-flex' : 'none';
      if (solBtn.style.display === 'inline-flex') {
        solBtn.onclick = () => playSolutionAudioFromBtn(solBtn);
      }
    }

    // Remove highlight when question changes
    const bar = document.getElementById('questionBar');
    if (bar && !isCombinedPlaying) bar.classList.remove('question-playing');

    // Instantly sync button states
    updatePlayButtonStates(isCombinedPlaying);
  }
}

function playQuestionAudio(btn, audioSrc) {
  if (IS_GUEST_REEL || (!isPaidUser() && !isAdminUser() && currentDay !== 'day01' && currentDay !== 'day02')) {
    showGuestPaywallModal('question audio narration');
    return;
  }
  const q = (typeof COURSE_CONFIG !== 'undefined' && COURSE_CONFIG.practiceQuestions) ? COURSE_CONFIG.practiceQuestions[currentPracticeQ] : null;
  const qId = q ? q.id : 1;
  const src = audioSrc || (q ? q.questionAudio : null) || getQuestionAudioSrc(qId) || 'New_Day1Part1Question01.mp3';

  // Find matching track index in the combined timeline
  let idx = combinedTracks.findIndex(t => t.src === src || t.src.endsWith(src) || src.endsWith(t.src));
  if (idx === -1 && q) {
    idx = combinedTracks.findIndex(t => (t.type === 'question' || t.type === 'solution') && t.qId === q.id);
  }

  if (idx !== -1) {
    if (combinedTrackIndex === idx && isCombinedPlaying) {
      pauseCombinedPlayback();
    } else {
      playbackMode = 'single';
      currentPlayingBtn = btn;
      let elapsedBefore = 0;
      for (let i = 0; i < idx; i++) {
        elapsedBefore += combinedTrackDurations[i] || 0;
      }
      seekCombinedPlayback(elapsedBefore, true);
      updateAllPlayButtonStates(true, btn);
    }
    return;
  }

  // Fallback for standalone audio not found in timeline
  const fullSrc = src.startsWith('http') || src.startsWith('/') ? src : `/Version-3/${src}`;
  if (currentPlayingAudio) currentPlayingAudio.pause();
  cancelTypewriter();
  const audio = new Audio(fullSrc);
  if (typeof currentPlaybackSpeed !== 'undefined') audio.playbackRate = currentPlaybackSpeed;
  if (typeof currentPlaybackVolume !== 'undefined') audio.volume = currentPlaybackVolume;
  currentPlayingAudio = audio;
  currentPlayingBtn = btn;
  audio.play().catch(e => console.log('Question audio play error:', e));
  updateAllPlayButtonStates(true, btn);
  audio.addEventListener('ended', () => {
    updateAllPlayButtonStates(false);
    currentPlayingAudio = null;
    currentPlayingBtn = null;
  }, { once: true });
}

// ??? Solution audio + code typewriter ???????????????????????????????????????

function playSolutionAudio(solutionEntry, triggerBtn) {
  if (IS_GUEST_REEL || (!isPaidUser() && !isAdminUser() && currentDay !== 'day01' && currentDay !== 'day02')) {
    showGuestPaywallModal('audio solutions and code typewriter');
    return;
  }
  const q = (typeof COURSE_CONFIG !== 'undefined' && COURSE_CONFIG.practiceQuestions) ? COURSE_CONFIG.practiceQuestions[currentPracticeQ] : null;
  const solEntry = solutionEntry || (q ? getSolutionEntry(q.id) : null);
  if (!solEntry) return;
  const { src } = solEntry;
  const btn = triggerBtn || document.getElementById('solutionAudioBtn');

  // Find matching track index in the combined timeline
  let idx = combinedTracks.findIndex(t => t.src === src || t.src.endsWith(src) || src.endsWith(t.src));
  if (idx === -1 && q) {
    idx = combinedTracks.findIndex(t => (t.type === 'solution' || t.type === 'question') && t.qId === q.id);
  }

  if (idx !== -1) {
    if (combinedTrackIndex === idx && isCombinedPlaying) {
      pauseCombinedPlayback();
    } else {
      playbackMode = 'single';
      currentPlayingBtn = btn;
      let elapsedBefore = 0;
      for (let i = 0; i < idx; i++) {
        elapsedBefore += combinedTrackDurations[i] || 0;
      }
      let targetOffset = 0;
      if (src.includes('New_Day1Part2Question01.mp3')) {
        targetOffset = 9.0;
      }
      seekCombinedPlayback(elapsedBefore + targetOffset, true);
      updateAllPlayButtonStates(true, btn);
    }
    return;
  }

  // Fallback for standalone solution audio
  const fullSrc = src.startsWith('http') || src.startsWith('/') ? src : `/Version-3/${src}`;
  if (currentPlayingAudio) currentPlayingAudio.pause();
  cancelTypewriter();
  setEditorCodeSafely('');
  const audio = new Audio(fullSrc);
  if (src.includes('New_Day1Part2Question01.mp3')) audio.currentTime = 9.0;
  if (typeof currentPlaybackSpeed !== 'undefined') audio.playbackRate = currentPlaybackSpeed;
  if (typeof currentPlaybackVolume !== 'undefined') audio.volume = currentPlaybackVolume;
  audio.play().catch(e => console.log('Solution audio play error:', e));
  startAudioSyncedTypewriter(audio, solEntry);
  currentPlayingAudio = audio;
  currentPlayingBtn = btn;
  updateAllPlayButtonStates(true, btn);
  audio.addEventListener('ended', () => {
    updateAllPlayButtonStates(false);
    currentPlayingAudio = null;
    currentPlayingBtn = null;
  }, { once: true });
}

function playSolutionAudioFromBtn(btn) {
  const q = (typeof COURSE_CONFIG !== 'undefined' && COURSE_CONFIG.practiceQuestions) ? COURSE_CONFIG.practiceQuestions[currentPracticeQ] : null;
  const solEntry = q ? getSolutionEntry(q.id) : null;
  if (!solEntry) return;

  const solBtn = btn || document.getElementById('solutionAudioBtn');
  playSolutionAudio(solEntry, solBtn);
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
    const saved = dp && dp.practiceAnswers ? dp.practiceAnswers[q.id] : null;
    if (saved && saved.trim() && !saved.startsWith('-- Write your SQL query here') && !saved.startsWith('-- Write your answer here')) {
      mainEditor.setValue(saved);
      return;
    }
  }
  mainEditor.setValue('');
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
  if (IS_GUEST_REEL) {
    showGuestPaywallModal('all 750+ practice questions');
    return;
  }
  if (currentPracticeQ < COURSE_CONFIG.practiceQuestions.length - 1) {
    saveCurrentPracticeAnswer();
    clearOutputSection();
    currentPracticeQ++;
    renderPracticeQuestion();
    loadSavedPracticeAnswer();
  }
}

function prevQuestion() {
  if (IS_GUEST_REEL) {
    showGuestPaywallModal('all 750+ practice questions');
    return;
  }
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

function updateOverallScoreUI() {
  // 1. Ensure badge exists in .header-right
  const headerRight = document.querySelector('.header-right');
  if (headerRight && !document.getElementById('headerOverallScoreBadge')) {
    const scoreBtn = document.getElementById('scoreBtn') || headerRight.querySelector('.hdr-btn--score');
    const badge = document.createElement('div');
    badge.className = 'header-overall-score';
    badge.id = 'headerOverallScoreBadge';
    badge.title = 'View Overall Course Score & Certificate Status';
    badge.onclick = () => openCertificateStatus();
    badge.innerHTML = `
      <div class="overall-score-icon">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
      </div>
      <div class="overall-score-content">
        <div class="overall-score-val">
          <span class="overall-score-num" id="headerOverallScore">0</span>
          <span class="overall-score-max">/ 1500</span>
        </div>
      </div>
      <div class="overall-score-bar">
        <div class="overall-score-bar-fill" id="overallScoreBarFill" style="width: 0%"></div>
      </div>
    `;
    if (scoreBtn && scoreBtn.nextSibling) {
      headerRight.insertBefore(badge, scoreBtn.nextSibling);
    } else {
      headerRight.appendChild(badge);
    }
  }

  // 2. Ensure badge exists in test-header-right
  const testHeaderRight = document.querySelector('.test-header-right');
  if (testHeaderRight && !document.getElementById('testHeaderOverallScoreBadge')) {
    const testScoreBtn = document.getElementById('testScoreBtn') || testHeaderRight.querySelector('.hdr-btn--score');
    const testBadge = document.createElement('div');
    testBadge.className = 'header-overall-score';
    testBadge.id = 'testHeaderOverallScoreBadge';
    testBadge.title = 'View Overall Course Score & Certificate Status';
    testBadge.onclick = () => openCertificateStatus();
    testBadge.innerHTML = `
      <div class="overall-score-icon">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
      </div>
      <div class="overall-score-content">
        <div class="overall-score-val">
          <span class="overall-score-num" id="testHeaderOverallScore">0</span>
          <span class="overall-score-max">/ 1500</span>
        </div>
      </div>
      <div class="overall-score-bar">
        <div class="overall-score-bar-fill" id="testOverallScoreBarFill" style="width: 0%"></div>
      </div>
    `;
    if (testScoreBtn && testScoreBtn.nextSibling) {
      testHeaderRight.insertBefore(testBadge, testScoreBtn.nextSibling);
    } else {
      testHeaderRight.appendChild(testBadge);
    }
  }

  // 3. Compute score and update values
  let totalScore = 0;
  if (window.ProgressManager) {
    try {
      if (typeof window.ProgressManager.getOverallScore === 'function') {
        const overall = window.ProgressManager.getOverallScore();
        totalScore = (overall && overall.totalScore) || 0;
      } else if (typeof window.ProgressManager.getCertificationReport === 'function') {
        const overall = window.ProgressManager.getCertificationReport();
        totalScore = (overall && overall.totalScore) || 0;
      } else if (typeof window.ProgressManager.getOverallStats === 'function') {
        const overall = window.ProgressManager.getOverallStats();
        totalScore = (overall && overall.totalScore) || 0;
      }
    } catch (e) {
      console.warn('Error reading ProgressManager score:', e);
    }
  } else {
    try {
      const raw = localStorage.getItem('manodemy_sql_v3_progress');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && parsed.days) {
          Object.keys(parsed.days).forEach(k => {
            totalScore += (parsed.days[k].bestScore || 0);
          });
        }
      }
    } catch (e) {}
  }

  const scoreEls = document.querySelectorAll('#headerOverallScore, #testHeaderOverallScore, .overall-score-num');
  scoreEls.forEach(el => {
    el.textContent = totalScore;
  });

  const fills = document.querySelectorAll('#overallScoreBarFill, #testOverallScoreBarFill, .overall-score-bar-fill');
  const pct = Math.min(100, Math.max(0, (totalScore / 1500) * 100));
  fills.forEach(f => {
    f.style.width = `${pct}%`;
  });
}
window.updateOverallScoreUI = updateOverallScoreUI;


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

  // Always keep overall score out of 1500 in sync
  updateOverallScoreUI();
}

function runCurrentQuery() {
  const query = mainEditor.getValue().trim();
  try {
    const result = runSQL(query);
    renderResultTable(result, 'mainOutput');
    logRecQueryExec(query, result);

    // Auto-grade current practice question
    const chalId = typeof getActiveChallengeId === 'function' ? getActiveChallengeId() : null;
    const chal = chalId ? REEL_CHALLENGES[chalId] : null;

    let q = (COURSE_CONFIG.practiceQuestions && COURSE_CONFIG.practiceQuestions[currentPracticeQ]) || null;
    if (chal) {
      const isCorrectA = chal.correctOption === 'A';
      q = {
        id: 1,
        isChallenge: true,
        title: chal.title,
        prompt: `<strong>${chal.task}</strong><br/>${chal.prompt}`,
        referenceSql: isCorrectA ? chal.codeA : chal.codeB,
        codeA: chal.codeA,
        codeB: chal.codeB,
        correctOption: isCorrectA ? 'A' : 'B',
        trapOption: isCorrectA ? 'B' : 'A'
      };
    }

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
          label.innerHTML = `Query Result <span class="correct-badge" style="background: rgba(16,185,129,0.15); color: #34d399; padding: 3px 10px; border-radius: 6px; font-size: 0.72rem; margin-left: 8px; font-weight: 800; border: 1px solid rgba(16, 185, 129, 0.4); display: inline-flex; align-items: center; gap: 4px;">✓ Correct! You Nailed It!</span>`;
        }
        // Append correct answer banner
        const successBanner = document.createElement('div');
        successBanner.className = 'output-success';
        successBanner.style.marginTop = '10px';
        if (q.isChallenge && chal) {
          const successDetail = chal.successExplanation 
            || (chal.task ? `${chal.task} solved cleanly!` : 'You successfully solved the challenge!');
          successBanner.innerHTML = `🎉 <strong>BOOM! Perfect Query!</strong><br/>${successDetail}`;
        } else {
          successBanner.innerHTML = '🎉 Correct Answer! Good job.';
        }
        document.getElementById('mainOutput').appendChild(successBanner);
      } else {
        // Show grading differences or challenge trap explanation
        const label = document.querySelector('#mainOutput .output-label');
        if (label) {
          const trapOpt = (q && q.trapOption) || 'A';
          const badgeText = q.isChallenge ? `💀 Trap Encountered (Option ${trapOpt})` : '❌ Incorrect';
          label.innerHTML = `Query Result <span class="incorrect-badge" style="background: rgba(239,68,68,0.15); color: #f87171; padding: 3px 10px; border-radius: 6px; font-size: 0.72rem; margin-left: 8px; font-weight: 800; border: 1px solid rgba(239, 68, 68, 0.4); display: inline-flex; align-items: center; gap: 4px;">${badgeText}</span>`;
        }
        const diffDiv = document.createElement('div');
        if (q.isChallenge && chal) {
          const trapDetail = chal.trapExplanation || 'This query demonstrates the common SQL trap shown in our Reel. Notice the output produced unexpected values!';
          const fixOpt = (q && q.correctOption) || 'A';
          const fixLabel = `⚡ Load Option ${fixOpt} (${fixOpt === 'A' ? 'Correct Standard' : 'Fix'})`;
          diffDiv.innerHTML = `
            <div style="margin-top: 10px; padding: 12px 14px; background: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 8px; font-size: 0.8rem; line-height: 1.5; color: #fca5a5;">
              <div style="font-weight: 800; color: #ef4444; margin-bottom: 4px; display: flex; align-items: center; gap: 6px;">💀 Trap Caught!</div>
              <div>${trapDetail}</div>
              <div style="margin-top: 8px; font-size: 0.76rem; color: #cbd5e1;">👉 Click <strong>[${fixLabel}]</strong> in the question card above to test the corrected query!</div>
            </div>
          `;
        } else {
          diffDiv.innerHTML = formatGradingDiff(gradingResult.diff);
        }
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
  panelL.style.flex = '0 0 55%';
  panelL.style.minWidth = '';
  panelL.style.borderRightWidth = '';
  panelR.style.flex = '1 1 auto';

  updateDividerArrows();

  // Reset theory scroll position to top
  const sc = document.getElementById('slideContent');
  if (sc) sc.scrollTop = 0;

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
  const right = document.getElementById('panelRight');
  let dragging = false;

  divider.addEventListener('mousedown', (e) => {
    if (e.target.closest('.div-toggle-btn')) return;

    // Auto-restore collapsed panels on drag initiation
    if (leftCollapsed) toggleLeftPanel();
    if (rightCollapsed) toggleRightPanel();

    dragging = true;
    divider.classList.add('dragging');
    const ws = document.querySelector('.workspace');
    if (ws) ws.classList.add('workspace-dragging');
    e.preventDefault();
  });

  document.addEventListener('mousemove', (e) => {
    if (!dragging) return;
    const workspace = document.querySelector('.workspace');
    const rect = workspace.getBoundingClientRect();

    if (window.innerWidth > 768) {
      // Horizontal split (desktop)
      const pct = ((e.clientX - rect.left) / rect.width) * 100;
      const clamped = Math.max(25, Math.min(75, pct));
      savedLeftWidth = clamped + '%';
      left.style.flex = `0 0 ${clamped}%`;
      if (right) right.style.flex = `1 1 auto`;
    } else {
      // Vertical split (mobile)
      // Notes is at the top (order: 1), and left panel (code) is at the bottom (order: 3)
      const heightPx = rect.bottom - e.clientY;
      const pct = (heightPx / rect.height) * 100;
      const clamped = Math.max(25, Math.min(70, pct));
      savedLeftWidth = clamped + '%';
      left.style.flex = `0 0 ${clamped}%`;
      if (right) right.style.flex = `1 1 auto`;
    }
    if (mainEditor) mainEditor.refresh();
    resizeWsCanvas();
  });

  document.addEventListener('mouseup', () => {
    if (dragging) {
      dragging = false;
      divider.classList.remove('dragging');
      const ws = document.querySelector('.workspace');
      if (ws) ws.classList.remove('workspace-dragging');
      if (mainEditor) mainEditor.refresh();
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
    const dayNum = d.day || d.globalDay || (i + 1);
    const dayStr = String(dayNum).padStart(2, '0');
    const emoji = d.emoji || '';
    const selected = i === 0 ? ' selected' : '';
    return `<option value="${d.id}"${selected}>${emoji} Day ${dayStr}: ${d.title}</option>`;
  }).join('');
}

function loadDayContent(dayId) {
  const manifest = window.COURSE_MANIFEST || [];
  const dayMeta = manifest.find(d => d.id === dayId);
  const dayNum = parseInt(dayId.replace('day', ''), 10) || 1;

  const chalId = typeof getActiveChallengeId === 'function' ? getActiveChallengeId() : null;
  const urlP = new URLSearchParams(window.location.search);
  const isGuestReelPass = (typeof IS_GUEST_REEL !== 'undefined' && IS_GUEST_REEL) || 
                          Boolean(chalId) || 
                          Boolean(urlP.get('challenge')) || 
                          Boolean(urlP.get('reel')) || 
                          urlP.get('guest') === 'true' || 
                          urlP.has('utm_campaign') || 
                          Boolean(urlP.get('q')) || 
                          Boolean(urlP.get('question'));

  // 1. Days 06–60: Coming Soon lock ONLY for regular non-admin students (Reel visitors get Reel Pass!)
  if (dayNum >= 6 && !isAdminUser() && !isGuestReelPass) {
    if (window.showComingSoonToast) {
      window.showComingSoonToast(dayMeta?.title || `Day ${String(dayNum).padStart(2, '0')}`, dayNum);
    }
    const slideContent = document.getElementById('slideBodyText');
    if (slideContent) {
      slideContent.innerHTML = `
        <div style="padding:48px 24px;text-align:center;color:#fff;font-family:Inter,sans-serif;">
          <div style="font-size:3.5rem;margin-bottom:1rem;">⏳</div>
          <h2 style="font-size:1.6rem;font-weight:900;color:#38bdf8;margin-bottom:0.5rem;">Day ${String(dayNum).padStart(2, '0')} is Coming Soon!</h2>
          <p style="color:#94a3b8;font-size:0.95rem;max-width:420px;margin:0 auto 1.5rem auto;line-height:1.6;">
            This interactive SQL studio lesson is in active development and will be released shortly as part of your masterclass.
          </p>
          <button onclick="loadDayContent('day01')" style="background:linear-gradient(135deg, #00e6f6, #a855f7);border:none;color:#060913;font-weight:800;padding:10px 22px;border-radius:10px;cursor:pointer;">
            ← Return to Active Lessons
          </button>
        </div>
      `;
    }
    return;
  }

  // 2. Days 03–30: Paywall check for non-paid users (Reel visitors get Reel Pass!)
  if (!isPaidUser() && !isAdminUser()) {
    if (dayNum >= 3 && !isGuestReelPass) {
      showGuestPaywallModal(`Day ${String(dayNum).padStart(2, '0')}`);
      return;
    }
  }

  // Pre-render challenge question immediately if challenge param is active (0ms instant render)
  if (chalId && REEL_CHALLENGES[chalId]) {
    const chal = REEL_CHALLENGES[chalId];
    const isCorrectA = chal.correctOption === 'A';
    COURSE_CONFIG.practiceQuestions = [{
      id: 1,
      isChallenge: true,
      title: chal.title,
      prompt: `<strong>${chal.task}</strong><br/>${chal.prompt}`,
      referenceSql: isCorrectA ? chal.codeA : chal.codeB,
      codeA: chal.codeA,
      codeB: chal.codeB,
      correctOption: isCorrectA ? 'A' : 'B',
      trapOption: isCorrectA ? 'B' : 'A'
    }];
    currentPracticeQ = 0;
    renderPracticeQuestion();
    if (mainEditor) mainEditor.setValue(chal.codeA);
  }

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
    const script = document.createElement('script');
    script.src = `/Version-3/content/day-${String(dayNum).padStart(2, '0')}.js?v=14.40`;
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
    if (dayContent.topicPracticeQuestions) {
      COURSE_CONFIG.topicPracticeQuestions = dayContent.topicPracticeQuestions;
    } else {
      delete COURSE_CONFIG.topicPracticeQuestions;
    }
    if (!chalId && dayContent.practiceQuestions) {
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

    // ── Determine Target Slide ──
    const __urlParams = new URLSearchParams(window.location.search);
    const __challengeId = typeof getActiveChallengeId === 'function' ? getActiveChallengeId() : (__urlParams.get('challenge') || __urlParams.get('reel'));
    const __qpQ = __urlParams.get('q') || __urlParams.get('question');
    const __utmCamp = __urlParams.get('utm_campaign') || '';

    let targetSlide = 0;
    if (__challengeId && REEL_CHALLENGES[__challengeId] && REEL_CHALLENGES[__challengeId].slideIndex !== undefined) {
      targetSlide = REEL_CHALLENGES[__challengeId].slideIndex;
    } else if (__qpQ && dayContent && dayContent.topicPracticeQuestions) {
      const qNum = parseInt(__qpQ, 10);
      for (const [topicKey, qList] of Object.entries(dayContent.topicPracticeQuestions)) {
        if (Array.isArray(qList) && qList.some(q => q.id === qNum)) {
          targetSlide = parseInt(topicKey, 10);
          break;
        }
      }
    }

    currentSlide = targetSlide;
    currentDay = dayId;

    // Guest pass banner if arrived via Instagram / Reel link
    const __isGuestPass = __urlParams.get('guest') === 'true' || Boolean(__qpQ) || Boolean(__challengeId) || __urlParams.has('utm_campaign');
    if (__isGuestPass) {
      const existingBanner = document.getElementById('reelGuestPassBanner');
      if (!existingBanner) {
        const banner = document.createElement('div');
        banner.id = 'reelGuestPassBanner';
        banner.style.cssText = 'background: linear-gradient(135deg, #1e1b4b, #311042); border-bottom: 1px solid #7c3aed; color: #f8fafc; padding: 8px 16px; font-size: 0.82rem; display: flex; align-items: center; justify-content: space-between; gap: 12px; z-index: 100; font-family: sans-serif;';
        
        const bannerTitle = (__challengeId && REEL_CHALLENGES[__challengeId]) 
          ? REEL_CHALLENGES[__challengeId].title 
          : `Day ${dayId.replace('day', '')}, Question ${currentPracticeQ + 1}`;
        
        const checkoutUrl = `/landing_v2/index.html?utm_source=instagram&utm_medium=reels&utm_campaign=${encodeURIComponent(__utmCamp || 'reel_challenge')}#pricing`;

        banner.innerHTML = `
          <div style="display:flex; align-items:center; gap:8px;">
            <span style="background:#8b5cf6; color:#fff; font-size:0.68rem; font-weight:800; padding:2px 7px; border-radius:4px; text-transform:uppercase;">Reel Pass</span>
            <span>🎁 <strong>Instagram Challenge:</strong> ${bannerTitle}</span>
          </div>
          <a href="${checkoutUrl}" style="background:linear-gradient(135deg, #00e6f6, #a855f7); color:#060913; font-weight:800; text-decoration:none; padding:5px 14px; border-radius:8px; font-size:0.75rem; box-shadow:0 0 15px rgba(0,230,246,0.3); transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.04)'" onmouseout="this.style.transform='none'">Unlock All 60 Days — ₹1,499 →</a>
        `;
        document.body.prepend(banner);

        // Apply visual locked indicator on guest buttons
        setTimeout(() => {
          const scoreBtns = document.querySelectorAll('#scoreBtn, #testScoreBtn');
          scoreBtns.forEach(btn => {
            btn.title = '🔒 Enroll in Masterclass to view full Score Card';
            btn.innerHTML = `<svg class="score-icon" width="14" height="14" viewBox="0 0 14 14" fill="none" style="margin-right: 4px;"><path d="M1.5 1.5H5.5V5.5H1.5V1.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M8.5 1.5H12.5V5.5H8.5V1.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M1.5 8.5H5.5V12.5H1.5V8.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M8.5 8.5H12.5V12.5H8.5V8.5Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg> Score Card <span style="font-size:10px; margin-left:4px; opacity:0.85;">🔒</span>`;
          });

          const badges = document.querySelectorAll('#headerOverallScoreBadge, #testHeaderOverallScoreBadge');
          badges.forEach(b => {
            b.title = '🔒 Enroll in Masterclass to unlock Certification & 1,500 Marks Tracking';
            b.style.cursor = 'pointer';
          });
        }, 150);
      }
    }

    // Auto-select Practice / Coding Editor tab on mobile viewports for Reel visitors or ?q= questions
    if (__isGuestPass || Boolean(__qpQ) || Boolean(__challengeId) || __urlParams.get('tab') === 'practice' || __urlParams.get('mobile_tab') === 'practice') {
      setTimeout(() => {
        if (typeof setMobileTab === 'function') {
          setMobileTab('practice');
        }
      }, 100);
    }

    renderSideSlide();
    clearDrawCanvas();
    loadQuestionsForDay(dayId);
    renderSchemaCards();

    // Rebuild topicSelect
    const topicSel = document.getElementById('topicSelect');
    if (topicSel && COURSE_CONFIG.slides) {
      const multiTopic = COURSE_CONFIG.slides.length > 1;
      topicSel.innerHTML = COURSE_CONFIG.slides.map((s, i) => {
        const cleaned = s.title.replace(/^(Topic\s+\d+:\s*|\d+\.\s*)/i, '');
        return `<option value="${i}">${multiTopic ? `Topic ${String(i + 1).padStart(2, '0')}: ` : ''}${cleaned}</option>`;
      }).join('');
      topicSel.value = currentSlide;
      initCustomDropdowns();
    }

    // Update test title dynamically
    const testTitleEl = document.querySelector('.test-title');
    if (testTitleEl) {
      const dayStr = String(parseInt(dayId.replace('day', ''), 10)).padStart(2, '0');
      testTitleEl.textContent = `📝 Day ${dayStr} — SQL Interview Test`;
    }

    // Clear editor and terminal on fresh load
    clearOutputSection();
    if (mainEditor) {
      const activeChal = typeof getActiveChallengeId === 'function' ? getActiveChallengeId() : null;
      if (activeChal && REEL_CHALLENGES[activeChal]) {
        mainEditor.setValue(REEL_CHALLENGES[activeChal].codeA);
      } else {
        mainEditor.setValue('');
      }
      mainEditor.clearHistory();
    }

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
    // Check if user is typing in an active input field or CodeMirror editor
    const isTyping = e.target.tagName === 'INPUT' || 
                     e.target.tagName === 'TEXTAREA' || 
                     e.target.isContentEditable || 
                     (e.target.closest && (e.target.closest('.CodeMirror') || e.target.closest('#mainEditorWrap') || e.target.closest('#testEditorWrap')));

    // Ctrl+Enter ? Run query
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      if (document.getElementById('testOverlay')?.classList.contains('open')) {
        runTestQuery();
      } else {
        runCurrentQuery();
      }
      return;
    }
    // Ctrl+L ? Clear editor
    if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
      e.preventDefault();
      if (document.getElementById('testOverlay')?.classList.contains('open')) {
        clearTestEditor();
      } else {
        clearEditor();
      }
      return;
    }
    // Ctrl+? ? Next question
    if ((e.ctrlKey || e.metaKey) && e.key === 'ArrowRight') {
      e.preventDefault();
      nextQuestion();
      return;
    }
    // Ctrl+? ? Previous question
    if ((e.ctrlKey || e.metaKey) && e.key === 'ArrowLeft') {
      e.preventDefault();
      prevQuestion();
      return;
    }
    // Esc ? Close any open overlay
    if (e.key === 'Escape') {
      const testOverlay = document.getElementById('testOverlay');
      const scorecardOverlay = document.getElementById('scorecardOverlay');
      const peekPopover = document.getElementById('peekPopover');
      if (scorecardOverlay?.classList.contains('open')) { closeScorecard(); return; }
      if (peekPopover?.classList.contains('open')) { closePeekPopover(); return; }
      if (testOverlay?.classList.contains('open')) { closeTestPortal(); return; }
    }

    // Media Player Shortcuts (Only when not typing inside editor or search inputs)
    if (!isTyping) {
      if (e.key === ' ' || e.key === 'k' || e.key === 'K') {
        e.preventDefault();
        toggleCombinedPlayback();
      } else if (e.key === 'j' || e.key === 'J') {
        e.preventDefault();
        skipCombined(-10);
      } else if (e.key === 'l' || e.key === 'L') {
        e.preventDefault();
        skipCombined(10);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        skipCombined(-5);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        skipCombined(5);
      } else if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        if (activeAudioInstance) {
          activeAudioInstance.muted = !activeAudioInstance.muted;
        }
      } else if (e.key === '>' || (e.shiftKey && e.key === '.')) {
        e.preventDefault();
        const speeds = [0.75, 1.0, 1.25, 1.5, 1.75, 2.0];
        const curIdx = speeds.indexOf(currentPlaybackSpeed || 1.0);
        const nextSpeed = speeds[Math.min(speeds.length - 1, (curIdx === -1 ? 1 : curIdx) + 1)];
        selectSpeedOption(nextSpeed, `${nextSpeed}x`);
      } else if (e.key === '<' || (e.shiftKey && e.key === ',')) {
        e.preventDefault();
        const speeds = [0.75, 1.0, 1.25, 1.5, 1.75, 2.0];
        const curIdx = speeds.indexOf(currentPlaybackSpeed || 1.0);
        const prevSpeed = speeds[Math.max(0, (curIdx === -1 ? 1 : curIdx) - 1)];
        selectSpeedOption(prevSpeed, `${prevSpeed}x`);
      }
    }
  });
}

function restorePlayerPreferences() {
  try {
    const savedSpeed = localStorage.getItem('manodemy_playback_speed');
    if (savedSpeed) {
      const speedNum = parseFloat(savedSpeed);
      if (!isNaN(speedNum) && typeof selectSpeedOption === 'function') {
        selectSpeedOption(speedNum, `${speedNum}x`);
      }
    }
  } catch (e) {}
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

    // Instant 0ms render for reel challenge on initial DOMContentLoaded
    const initialChal = typeof getActiveChallengeId === 'function' ? getActiveChallengeId() : null;
    if (initialChal && REEL_CHALLENGES[initialChal]) {
      const chal = REEL_CHALLENGES[initialChal];
      const isCorrectA = chal.correctOption === 'A';
      COURSE_CONFIG.practiceQuestions = [{
        id: 1,
        isChallenge: true,
        title: chal.title,
        prompt: `<strong>${chal.task}</strong><br/>${chal.prompt}`,
        referenceSql: isCorrectA ? chal.codeA : chal.codeB,
        codeA: chal.codeA,
        codeB: chal.codeB,
        correctOption: isCorrectA ? 'A' : 'B',
        trapOption: isCorrectA ? 'B' : 'A'
      }];
      currentPracticeQ = 0;
      renderPracticeQuestion();
      if (mainEditor) mainEditor.setValue(chal.codeA);
    }

    // Eagerly load the manifest so accurate durations are available immediately
    loadManifest().catch(() => { }); // Non-blocking — fallback durations already set

    // Populate Day Selector from COURSE_MANIFEST
    populateDaySelector();

    // Detect default day dynamically from the page URL so a refresh keeps the
    // user on the SAME day. Matches BOTH modern routes ("/notebook/sql-day05")
    // and legacy ones ("/sql/day05.html"), plus an optional "?day=5" query
    // fallback. Mirrors the proven getDayId() logic in /notebook.js.
    let defaultDay = 'day01';
    const __path = window.location.pathname;
    const __pathMatch = __path.match(/(?:sql-day|excel-day|day)(\d{1,2})/i);
    if (__pathMatch) {
      defaultDay = `day${__pathMatch[1].padStart(2, '0')}`;
    } else {
      const __qp = new URLSearchParams(window.location.search).get('day');
      if (__qp) defaultDay = `day${__qp.padStart(2, '0')}`;
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

      // Keep the address bar in sync with the active day so a refresh (or
      // browser back/forward) lands on the SAME day. Handles BOTH route
      // shapes: modern "/notebook/sql-dayNN" and legacy "/sql/dayNN.html".
      const __syncPath = window.location.pathname;
      const __num = (selectedDay.match(/\d+/) || ['01'])[0].padStart(2, '0');
      if (/(?:sql-day|excel-day|day)\d{1,2}/i.test(__syncPath)) {
        const __newPath = __syncPath.replace(/(sql-day|excel-day|day)\d{1,2}/i, (m, p) => `${p}${__num}`);
        if (__newPath !== __syncPath) history.pushState({ day: selectedDay }, '', __newPath);
      } else if (/day\d{1,2}\.html/i.test(__syncPath)) {
        const __newPath = __syncPath.replace(/day\d{1,2}\.html/i, `day${__num}.html`);
        history.pushState({ day: selectedDay }, '', __newPath);
      }
    });

    // Browser back/forward: reload the day the URL now points to, so history
    // navigation (and refresh after navigating) always shows the right day.
    window.addEventListener('popstate', () => {
      const __pp = window.location.pathname;
      const __pm = __pp.match(/(?:sql-day|excel-day|day)(\d{1,2})/i);
      if (__pm) {
        const __target = `day${__pm[1].padStart(2, '0')}`;
        const __sel = document.getElementById('daySelect');
        if (__sel && __sel.value !== __target) __sel.value = __target;
        loadDayContent(__target);
      }
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
  // Load topic-specific questions only if not on a dedicated challenge pass
  const chalId = typeof getActiveChallengeId === 'function' ? getActiveChallengeId() : null;
  if (!chalId) {
    loadQuestionsForDay(currentDay || 'day01');
  }
}

function openScoreCard() {
  if (IS_GUEST_REEL || (!isPaidUser() && !isAdminUser())) {
    showGuestPaywallModal('Full Course Progress & Score Card');
    return;
  }
  window.location.href = '/home.html';
}
window.openScoreCard = openScoreCard;

function openTestScoreCard() {
  if (IS_GUEST_REEL || (!isPaidUser() && !isAdminUser())) {
    showGuestPaywallModal('Full Course Progress & Score Card');
    return;
  }
  window.location.href = '/home.html';
}
window.openTestScoreCard = openTestScoreCard;

function openCertificateStatus() {
  if (IS_GUEST_REEL || (!isPaidUser() && !isAdminUser())) {
    showGuestPaywallModal('1,500 Marks Certification System');
    return;
  }
  window.location.href = '/home.html';
}
window.openCertificateStatus = openCertificateStatus;

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

function updatePlayButtonStates(isPlaying) {
  try {
    const playBtn = document.getElementById('playPauseBtn') || document.querySelector('.play-btn-red-pill');
    if (playBtn) {
      const label = playBtn.querySelector('.play-btn-label') || playBtn;
      if (isPlaying) {
        label.textContent = 'Pause Lesson';
      } else {
        label.textContent = 'Play Lesson';
      }
    }
  } catch (e) {}
}

function updateProgressUI() {
  try {
    if (typeof updateTimelinePlayhead === 'function') {
      updateTimelinePlayhead();
    }
  } catch (e) {}
}

function initSlideNarration() {
  // Stub: slide narration initialized via timeline
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
    if (!wrapper) return;

    select.style.display = 'none';

    let trigger = wrapper.querySelector('.custom-select-trigger');
    let optionsMenu = wrapper.querySelector('.custom-select-options');

    // Remove legacy dot and chevron elements to prevent duplicate icons
    wrapper.querySelectorAll('.day-picker-dot, .day-picker-chevron').forEach(el => {
      if (!el.closest('.custom-select-trigger')) el.remove();
    });

    if (!trigger) {
      trigger = document.createElement('div');
      trigger.className = 'custom-select-trigger';
      wrapper.appendChild(trigger);
    }

    if (!trigger.querySelector('.selected-text')) {
      trigger.innerHTML = `
        <span class="selected-text"></span>
        <span class="day-picker-chevron">
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1.5L5 5L9 1.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </span>
      `;
    }

    if (!optionsMenu) {
      optionsMenu = document.createElement('div');
      optionsMenu.className = 'custom-select-options';
      wrapper.appendChild(optionsMenu);
    }

    function updateTriggerText() {
      const textSpan = trigger.querySelector('.selected-text');
      if (!textSpan) return;

      if (select.selectedIndex < 0 && select.options.length > 0) {
        select.selectedIndex = 0;
      }
      const option = select.options[select.selectedIndex] || select.options[0];

      if (select.id === 'topicSelect') {
        const slideIdx = option ? parseInt(option.value, 10) : (typeof currentSlide !== 'undefined' ? currentSlide : 0);
        const duration = getSlideDurationString(slideIdx);
        const slide = (typeof COURSE_CONFIG !== 'undefined' && COURSE_CONFIG.slides) ? COURSE_CONFIG.slides[slideIdx] : null;
        let cleanedTitle = slide ? slide.title.replace(/^(Topic\s+\d+:\s*|\d+\.\s*)/i, '') : (option ? option.text : 'Topic Overview');
        cleanedTitle = cleanedTitle.replace(/\s*\([0-9:]+\)\s*$/, '');
        const multiTopic = (typeof COURSE_CONFIG !== 'undefined' && COURSE_CONFIG.slides && COURSE_CONFIG.slides.length > 1);

        textSpan.innerHTML = `
          <span class="trigger-title">${multiTopic ? `Topic 0${slideIdx + 1}: ` : ''}${cleanedTitle}</span>
          <span class="trigger-duration-badge">${duration}</span>
        `;
      } else if (select.id === 'daySelect') {
        const dayVal = option ? option.value : (typeof currentDay !== 'undefined' ? currentDay : 'day01');
        const dayNum = dayVal.replace('day', '');
        const allDays = window.COURSE_MANIFEST_60 || [];
        const activeDay = allDays.find(d => d.id === dayVal) || { track: 'sql' };
        const svgIcons = window.SVG_TRACK_ICONS || {};
        const iconHtml = svgIcons[activeDay.track] || svgIcons.sql || '🗄️';

        textSpan.innerHTML = `
          <span style="display:inline-flex;align-items:center;gap:6px;">
            ${iconHtml}
            <strong>Day ${String(dayNum).padStart(2, '0')}</strong>
          </span>
        `;
      } else if (option) {
        textSpan.textContent = option.text;
      }
    }

    function populateOptions() {
      optionsMenu.innerHTML = '';
      const isPaid = (typeof isPaidUser === 'function') ? isPaidUser() : false;
      const allDays = window.COURSE_MANIFEST_60 || [];
      const svgIcons = window.SVG_TRACK_ICONS || {};

      if (select.id === 'daySelect' && allDays.length > 0) {
        // Group all 60 days into 3 categorized sections
        const tracks = [
          { key: 'sql', label: '🗄️ SQL Mastery (Days 01–18)', days: allDays.filter(d => d.track === 'sql') },
          { key: 'excel', label: '📊 Advanced Excel & BI (Days 19–30)', days: allDays.filter(d => d.track === 'excel') },
          { key: 'python', label: '🐍 Python for Data Analysis (Days 31–60)', days: allDays.filter(d => d.track === 'python') }
        ];

        tracks.forEach(trackGroup => {
          const header = document.createElement('div');
          header.className = 'dropdown-section-header';
          header.innerHTML = `<span>${trackGroup.label}</span>`;
          optionsMenu.appendChild(header);

          trackGroup.days.forEach(d => {
            const isUnpaidLocked = (!d.free && !isPaid);
            const isComingSoon = (!d.prepared);
            const isSelected = (select.value === d.id || (select.value === 'day01' && d.id === 'day01'));
            const optionItem = document.createElement('div');
            optionItem.className = `custom-select-option${isSelected ? ' selected' : ''}${isUnpaidLocked ? ' is-locked' : ''}`;
            
            const iconSvg = svgIcons[d.track] || '';
            const dayNumStr = String(d.globalDay).padStart(2, '0');

            let badgeHtml = '';
            if (isUnpaidLocked) {
              badgeHtml = '<span class="day-lock-badge" title="Pro subscription required">🔒</span>';
            } else if (isComingSoon) {
              badgeHtml = '<span class="day-coming-soon-badge" title="Under active development">Coming Soon</span>';
            } else if (d.free) {
              badgeHtml = '<span class="day-free-badge">FREE</span>';
            }

            optionItem.innerHTML = `
              <span class="option-day-tag">
                <span class="track-icon-wrap">${iconSvg}</span>
                <span style="display:flex;flex-direction:column;gap:1px;overflow:hidden;">
                  <strong>Day ${dayNumStr}</strong>
                  <span class="option-day-title">${d.title}</span>
                </span>
              </span>
              ${badgeHtml}
            `;

            optionItem.dataset.value = d.id;
            optionItem.addEventListener('click', (e) => {
              e.stopPropagation();
              if (isUnpaidLocked) {
                window.location.href = '../index.html#pricing?locked=true';
                return;
              }
              if (isComingSoon) {
                if (window.showComingSoonToast) {
                  window.showComingSoonToast(d.title, d.globalDay);
                } else {
                  alert(`Day ${dayNumStr} is currently in active development and coming soon!`);
                }
                return;
              }
              window.location.href = d.url;
            });
            optionsMenu.appendChild(optionItem);
          });
        });
      } else {
        // Topic select rendering
        Array.from(select.options).forEach((opt) => {
          const optionItem = document.createElement('div');
          optionItem.className = `custom-select-option${opt.selected ? ' selected' : ''}`;

          if (select.id === 'topicSelect') {
            const slideIdx = parseInt(opt.value, 10);
            const duration = getSlideDurationString(slideIdx);
            const slide = (typeof COURSE_CONFIG !== 'undefined' && COURSE_CONFIG.slides) ? COURSE_CONFIG.slides[slideIdx] : null;
            let cleanedTitle = slide ? slide.title.replace(/^(Topic\s+\d+:\s*|\d+\.\s*)/i, '') : opt.text;
            cleanedTitle = cleanedTitle.replace(/\s*\([0-9:]+\)\s*$/, '');
            const multiTopic4 = (typeof COURSE_CONFIG !== 'undefined' && COURSE_CONFIG.slides && COURSE_CONFIG.slides.length > 1);
            optionItem.innerHTML = `
              <span class="option-title">${multiTopic4 ? `Topic 0${slideIdx + 1}: ` : ''}${cleanedTitle}</span>
              <span class="option-duration">${duration}</span>
            `;
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
      }

      const isSingleTopic = (select.id === 'topicSelect' && (!COURSE_CONFIG.slides || COURSE_CONFIG.slides.length <= 1));

      if (isSingleTopic) {
        wrapper.classList.add('no-dropdown');
        const chev = trigger.querySelector('.day-picker-chevron');
        if (chev) chev.style.display = 'none';
        wrapper.onclick = null;
      } else {
        wrapper.classList.remove('no-dropdown');
        const chev = trigger.querySelector('.day-picker-chevron');
        if (chev) chev.style.display = 'flex';

        wrapper.onclick = (e) => {
          e.stopPropagation();
          const isOpen = optionsMenu.classList.contains('open');
          document.querySelectorAll('.custom-select-options').forEach(menu => {
            menu.classList.remove('open');
            menu.parentElement.classList.remove('open');
            if (menu.previousElementSibling) menu.previousElementSibling.classList.remove('open');
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
    // Guard: skip re-defining if already patched (prevents TypeError on re-init)
    if (!Object.getOwnPropertyDescriptor(select, 'value')) {
      const descriptor = Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, 'value');
      Object.defineProperty(select, 'value', {
        configurable: true,
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
    }
  });

  // Close menu on click outside
  document.addEventListener('click', () => {
    document.querySelectorAll('.custom-select-options').forEach(menu => {
      menu.classList.remove('open');
      menu.parentElement.classList.remove('open');
      if (menu.previousElementSibling) menu.previousElementSibling.classList.remove('open');
    });
  });
}

function setupTimelineDragging() {
  const seekBar = document.getElementById('seekBar');
  const tooltip = document.getElementById('timelineHoverTooltip');
  const timelineRow = document.getElementById('playbackTimelineRow');
  if (!seekBar || !timelineRow) return;

  if (timelineRow.dataset.timelineDragBound) return;
  timelineRow.dataset.timelineDragBound = 'true';

  // Real-time hover preview tooltip showing Scene Title + Time + Category Badge
  timelineRow.addEventListener('mousemove', (e) => {
    const rect = seekBar.getBoundingClientRect();
    const mouseX = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    const pos = rect.width > 0 ? (mouseX / rect.width) : 0;
    const targetTime = pos * (totalCombinedDuration || 100);

    // Resolve track at this hover position
    let elapsed = 0;
    let trackTitle = '';
    let trackType = 'Theory';
    if (typeof combinedTrackDurations !== 'undefined' && typeof combinedTracks !== 'undefined') {
      for (let i = 0; i < combinedTrackDurations.length; i++) {
        const dur = combinedTrackDurations[i];
        if (targetTime < elapsed + dur || i === combinedTrackDurations.length - 1) {
          const t = combinedTracks[i];
          if (t) {
            trackTitle = t.title || t.src || '';
            if (t.type === 'question') trackType = 'Practice';
            else if (t.type === 'solution') trackType = 'Solution';
            else if (t.type === 'completion') trackType = 'Milestone';
          }
          break;
        }
        elapsed += dur;
      }
    }

    if (tooltip) {
      tooltip.classList.add('active');

      const svgTheory = '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right:4px; vertical-align:-1px;"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>';
      const svgPractice = '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right:4px; vertical-align:-1px;"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>';
      const svgSolution = '<svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" style="margin-right:4px; vertical-align:-1px;"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>';
      const svgMilestone = '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right:4px; vertical-align:-1px;"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.45 1-1 1H7"/><path d="M14 14.66V17c0 .55.45 1 1 1h2"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>';

      let badgeHtml = '';
      if (trackType === 'Theory') {
        badgeHtml = '<span class="tt-badge tt-badge--theory">' + svgTheory + 'THEORY</span>';
      } else if (trackType === 'Practice') {
        badgeHtml = '<span class="tt-badge tt-badge--practice">' + svgPractice + 'PRACTICE</span>';
      } else if (trackType === 'Solution') {
        badgeHtml = '<span class="tt-badge tt-badge--solution">' + svgSolution + 'SOLUTION</span>';
      } else {
        badgeHtml = '<span class="tt-badge tt-badge--milestone">' + svgMilestone + 'MILESTONE</span>';
      }

      tooltip.innerHTML = `
        <span class="tt-time">${formatTime(targetTime)}</span>
        <span class="tt-divider"></span>
        ${badgeHtml}
        <span class="tt-title">${typeof escHtml === 'function' ? escHtml(trackTitle) : trackTitle}</span>
      `;

      // Smart Edge Clamping: Ensure tooltip is NEVER cropped at left or right window boundary
      const tooltipWidth = tooltip.offsetWidth || 220;
      const halfWidth = tooltipWidth / 2;
      const minCenter = halfWidth + 8;
      const maxCenter = Math.max(minCenter, rect.width - halfWidth - 8);
      const clampedCenter = Math.max(minCenter, Math.min(maxCenter, mouseX));

      tooltip.style.left = `${clampedCenter}px`;

      // Position the pointer arrow precisely above the cursor
      const arrowOffset = mouseX - clampedCenter;
      tooltip.style.setProperty('--arrow-x', `${arrowOffset}px`);
    }
  });

  timelineRow.addEventListener('mouseleave', () => {
    if (tooltip) tooltip.classList.remove('active');
  });

  // Direct click on timeline row to seek instantly
  timelineRow.addEventListener('click', async (e) => {
    const rect = seekBar.getBoundingClientRect();
    if (rect.width <= 0) return;
    const clickX = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    const pos = rect.width > 0 ? (clickX / rect.width) : 0;
    const targetTime = pos * (totalCombinedDuration || 100);
    const sb = document.getElementById('seekBar');
    if (sb) {
      sb.value = targetTime;
      const fillPct = Math.max(0, Math.min(100, pos * 100));
      sb.style.background = `linear-gradient(to right, #ef4444 0%, #ff4d4d ${fillPct}%, rgba(255, 255, 255, 0.15) ${fillPct}%)`;
    }
    seekCombinedPlayback(targetTime);
  });

  // Smooth live scrubbing
  seekBar.addEventListener('input', (e) => {
    isScrubbing = true;
    const targetTime = parseFloat(e.target.value);
    currentCombinedTime = targetTime;
    updateProgressUI();
    // Live visual scene sync during scrub
    seekCombinedPlayback(targetTime, false);
  });

  seekBar.addEventListener('change', (e) => {
    isScrubbing = false;
    seekCombinedPlayback(e.target.value, true);
  });
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
let playbackMode = 'master'; // 'master' (continuous lesson) | 'single' (individual button snippet)

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

const topic02Durations = [25.3, 25.2, 18.5, 16.6, 12.3, 7.7, 8.2, 8.7, 8.1, 6.7, 9.5, 9.8, 12.7, 12.2, 19.9, 15.4, 17.6, 14.1, 14.0, 16.2, 14.9, 35.7, 31.1, 28.6, 35.6, 24.8, 24.2];
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
  // Theory narrations (audio01–31)
  17.4, 16.5, 17.1, 6.4, 21.3, 18.3, 7.6, 10.5, 10.0, 7.8, 16.2, 17.3, 20.4,
  15.4, 19.8, 13.8, 21.0, 17.1, 18.0, 21.8, 13.1, 18.4, 20.4, 14.7, 20.3,
  16.8, 20.3, 14.6, 23.3, 24.4, 19.9,
  // Practice Q & Solution narrations (Q01–Q06 + sols)
  9.5, 18.1, 9.0, 15.8, 10.4, 21.1, 8.9, 18.4, 12.1, 21.4, 8.4, 20.5
];

const day03Tracks = [
  { src: 'Day03/New_Day3Part1audio01.mp3', target: '#day03Where', title: '01. The WHERE Clause' },
  { src: 'Day03/New_Day3Part1audio02.mp3', target: '#day03WhereCode', title: 'WHERE Clause Syntax & Examples' },
  { src: 'Day03/New_Day3Part1audio03.mp3', target: '#day03WhereInfo', title: 'Execution Order' },
  { src: 'Day03/New_Day3Part1audio04.mp3', target: '#day03CompOps', title: '02. Comparison Operators' },
  { src: 'Day03/New_Day3Part1audio05.mp3', target: '#day03OpsTable', title: 'Comparison Operator Reference' },
  { src: 'Day03/New_Day3Part1audio06.mp3', target: '#day03CompCode', title: 'Comparison Operator Examples' },
  { src: 'Day03/New_Day3Part1audio07.mp3', target: '#day03LogicOps', title: '03. Logical Operators' },
  { src: 'Day03/New_Day3Part1audio08.mp3', target: '.prec-card--not', title: 'Logical Operator — NOT' },
  { src: 'Day03/New_Day3Part1audio09.mp3', target: '.prec-card--and', title: 'Logical Operator — AND' },
  { src: 'Day03/New_Day3Part1audio10.mp3', target: '.prec-card--or', title: 'Logical Operator — OR' },
  { src: 'Day03/New_Day3Part1audio11.mp3', target: '#day03PrecedenceNote', title: 'Operator Precedence Rules' },
  { src: 'Day03/New_Day3Part1audio12.mp3', target: '#day03LogicCode', title: 'AND / OR / NOT Examples' },
  { src: 'Day03/New_Day3Part1audio13.mp3', target: '#day03LogicWarn', title: 'Precedence Trap Warning' },
  { src: 'Day03/New_Day3Part1audio14.mp3', target: '#day03Between', title: '04. The BETWEEN Operator' },
  { src: 'Day03/New_Day3Part1audio15.mp3', target: '#day03BetweenCode', title: 'BETWEEN Code Examples' },
  { src: 'Day03/New_Day3Part1audio16.mp3', target: '#day03BetweenOk', title: 'BETWEEN — Correct Usage' },
  { src: 'Day03/New_Day3Part1audio17.mp3', target: '#day03BetweenDateTip', title: 'BETWEEN — Date Precision Gotcha' },
  { src: 'Day03/New_Day3Part1audio18.mp3', target: '#day03In', title: '05. The IN Operator' },
  { src: 'Day03/New_Day3Part1audio19.mp3', target: '#day03InCode', title: 'IN / NOT IN Examples' },
  { src: 'Day03/New_Day3Part1audio20.mp3', target: '#day03InWarn', title: 'NOT IN with NULLs Warning' },
  { src: 'Day03/New_Day3Part1audio21.mp3', target: '#day03Like', title: '06. The LIKE Operator' },
  { src: 'Day03/New_Day3Part1audio22.mp3', target: '#day03LikePercent', title: 'LIKE — % Wildcard' },
  { src: 'Day03/New_Day3Part1audio23.mp3', target: '#day03LikeUnderscore', title: 'LIKE — _ Wildcard' },
  { src: 'Day03/New_Day3Part1audio24.mp3', target: '#day03LikeCode', title: 'LIKE in Context Examples' },
  { src: 'Day03/New_Day3Part1audio25.mp3', target: '#day03LikeTip', title: 'LIKE Case Sensitivity Note' },
  { src: 'Day03/New_Day3Part1audio26.mp3', target: '#day03Null', title: '07. IS NULL & IS NOT NULL' },
  { src: 'Day03/New_Day3Part1audio27.mp3', target: '#day03NullCode', title: 'IS NULL Code Examples' },
  { src: 'Day03/New_Day3Part1audio28.mp3', target: '#day03NullVs', title: 'Wrong = NULL vs. Correct IS NULL' },
  { src: 'Day03/New_Day3Part1audio29.mp3', target: '#day03QANull', title: 'Interview Q1: WHERE commission = NULL' },
  { src: 'Day03/New_Day3Part1audio30.mp3', target: '#day03QANotIn', title: 'Interview Q2: NOT IN Subquery with NULL' },
  { src: 'Day03/New_Day3Part1audio31.mp3', target: '#day03QALike', title: 'Interview Q3: Leading % Wildcard Performance' },
  // ── 6 Practice Questions & Solutions ──
  { src: 'Day03/New_Day3Question01.mp3',    target: '#questionBar', title: 'Q1: High-Value Products',       type: 'question', qId: 1 },
  { src: 'Day03/New_Day3Question01sol.mp3', target: '#questionBar', title: 'Q1 Solution: High-Value Products', type: 'solution', qId: 1 },
  { src: 'Day03/New_Day3Question02.mp3',    target: '#questionBar', title: 'Q2: Regional Customers',        type: 'question', qId: 2 },
  { src: 'Day03/New_Day3Question02sol.mp3', target: '#questionBar', title: 'Q2 Solution: Regional Customers', type: 'solution', qId: 2 },
  { src: 'Day03/New_Day3Question03.mp3',    target: '#questionBar', title: 'Q3: Mid-Range Salary Band',     type: 'question', qId: 3 },
  { src: 'Day03/New_Day3Question03sol.mp3', target: '#questionBar', title: 'Q3 Solution: Mid-Range Salary Band', type: 'solution', qId: 3 },
  { src: 'Day03/New_Day3Question04.mp3',    target: '#questionBar', title: 'Q4: Name Pattern Search',      type: 'question', qId: 4 },
  { src: 'Day03/New_Day3Question04sol.mp3', target: '#questionBar', title: 'Q4 Solution: Name Pattern Search', type: 'solution', qId: 4 },
  { src: 'Day03/New_Day3Question05.mp3',    target: '#questionBar', title: 'Q5: Active Data Science Team', type: 'question', qId: 5 },
  { src: 'Day03/New_Day3Question05sol.mp3', target: '#questionBar', title: 'Q5 Solution: Active Data Science Team', type: 'solution', qId: 5 },
  { src: 'Day03/New_Day3Question06.mp3',    target: '#questionBar', title: 'Q6: Employees Without Commission', type: 'question', qId: 6 },
  { src: 'Day03/New_Day3Question06sol.mp3', target: '#questionBar', title: 'Q6 Solution: Employees Without Commission', type: 'solution', qId: 6 }
];

const day04Durations = [
  9.91, 33.58, 16.44, 14.04, 10.66, 13.82, 15.29, 9.72, 7.92, 9.36, 9.0, 13.78, 12.07, 9.07, 11.64, 11.33, 10.51, 14.21, 11.95, 9.84, 11.26, 10.97, 9.74,
  9.6, 11.35, 10.66, 14.52, 10.01, 11.4, 10.92, 13.37, 9.79, 13.8, 8.45, 8.74, 7.85, 10.01, 10.99, 14.23, 7.01, 15.53, 9.34, 14.42, 7.13, 9.31, 10.42, 13.44
];

const day04Tracks = [
  { src: 'Day04/New_Day4Part1audio01.mp3', target: '#day04Arithmetic', title: '01. Arithmetic Operators' },
  { src: 'Day04/New_Day4Part1audio02.mp3', target: '#day04ArithmeticTable', title: 'Arithmetic Operator Reference' },
  { src: 'Day04/New_Day4Part1audio03.mp3', target: '#day04ArithmeticExamples', title: 'Arithmetic Operator Examples' },
  { src: 'Day04/New_Day4Part1audio04.mp3', target: '#day04IntDivWarn', title: '⚠️ Integer Division' },
  { src: 'Day04/New_Day4Part1audio05.mp3', target: '#day04Precedence', title: '02. Operator Precedence' },
  { src: 'Day04/New_Day4Part1audio06.mp3', target: '#day04PrecedenceTable', title: 'Operator Precedence Table' },
  { src: 'Day04/New_Day4Part1audio07.mp3', target: '#day04PrecedenceExamples', title: 'AND / OR Precedence Examples' },
  { src: 'Day04/New_Day4Part1audio08.mp3', target: '#day04PrecedenceInfo', title: 'ℹ️ Always parenthesise mixed AND/OR' },
  { src: 'Day04/New_Day4Part1audio09.mp3', target: '#day04AllAny', title: '03. ALL and ANY' },
  { src: 'Day04/New_Day4Part1audio10.mp3', target: '#day04AnyCard', title: '> ANY Subquery' },
  { src: 'Day04/New_Day4Part1audio11.mp3', target: '#day04AllCard', title: '> ALL Subquery' },
  { src: 'Day04/New_Day4Part1audio12.mp3', target: '#day04AllAnyWarn', title: '⚠️ Engine support' },
  { src: 'Day04/New_Day4Part1audio13.mp3', target: '#day04AllAnyTip', title: '💡 Equivalences to memorise' },
  { src: 'Day04/New_Day4Part1audio14.mp3', target: '#day04Escape', title: '04. ESCAPE in LIKE' },
  { src: 'Day04/New_Day4Part1audio15.mp3', target: '#day04EscapeCode', title: 'ESCAPE Examples' },
  { src: 'Day04/New_Day4Part1audio16.mp3', target: '#day04EscapeInfo', title: 'ℹ️ Which escape char?' },
  { src: 'Day04/New_Day4Part1audio17.mp3', target: '#day04NullHandling', title: '05. Handling NULLs' },
  { src: 'Day04/New_Day4Part1audio18.mp3', target: '#day04NullCode', title: 'NULL Propagation Examples' },
  { src: 'Day04/New_Day4Part1audio19.mp3', target: '#day04NullInfo', title: 'ℹ️ NULL ≠ 0' },
  { src: 'Day04/New_Day4Part1audio20.mp3', target: '#day04ThreeVal', title: '06. Three-Valued Logic' },
  { src: 'Day04/New_Day4Part1audio21.mp3', target: '#day04ThreeValTable', title: 'Three-Valued Logic Truth Table' },
  { src: 'Day04/New_Day4Part1audio22.mp3', target: '#day04NotInTrapCode', title: 'The NOT IN + NULL Trap' },
  { src: 'Day04/New_Day4Part1audio23.mp3', target: '#day04NotInTrapWarn', title: '⚠️ The NOT IN NULL trap' },
  { src: 'Day04/New_Day4Question01.mp3', target: '#questionBar', title: 'Q1: Monthly Pay', type: 'question', qId: 1 },
  { src: 'Day04/New_Day4Question01sol.mp3', target: '#questionBar', title: 'Q1 Solution: Monthly Pay', type: 'solution', qId: 1 },
  { src: 'Day04/New_Day4Question02.mp3', target: '#questionBar', title: 'Q2: Gross Profit', type: 'question', qId: 2 },
  { src: 'Day04/New_Day4Question02sol.mp3', target: '#questionBar', title: 'Q2 Solution: Gross Profit', type: 'solution', qId: 2 },
  { src: 'Day04/New_Day4Question03.mp3', target: '#questionBar', title: 'Q3: Total Comp', type: 'question', qId: 3 },
  { src: 'Day04/New_Day4Question03sol.mp3', target: '#questionBar', title: 'Q3 Solution: Total Comp', type: 'solution', qId: 3 },
  { src: 'Day04/New_Day4Question04.mp3', target: '#questionBar', title: 'Q4: High Earners', type: 'question', qId: 4 },
  { src: 'Day04/New_Day4Question04sol.mp3', target: '#questionBar', title: 'Q4 Solution: High Earners', type: 'solution', qId: 4 },
  { src: 'Day04/New_Day4Question05.mp3', target: '#questionBar', title: 'Q5: Earn > Sales', type: 'question', qId: 5 },
  { src: 'Day04/New_Day4Question05sol.mp3', target: '#questionBar', title: 'Q5 Solution: Earn > Sales', type: 'solution', qId: 5 },
  { src: 'Day04/New_Day4Question06.mp3', target: '#questionBar', title: 'Q6: Price Markup', type: 'question', qId: 6 },
  { src: 'Day04/New_Day4Question06sol.mp3', target: '#questionBar', title: 'Q6 Solution: Price Markup', type: 'solution', qId: 6 },
  { src: 'Day04/New_Day4Question07.mp3', target: '#questionBar', title: 'Q7: Include NULLs', type: 'question', qId: 7 },
  { src: 'Day04/New_Day4Question07sol.mp3', target: '#questionBar', title: 'Q7 Solution: Include NULLs', type: 'solution', qId: 7 },
  { src: 'Day04/New_Day4Question08.mp3', target: '#questionBar', title: 'Q8: Safe Ratio', type: 'question', qId: 8 },
  { src: 'Day04/New_Day4Question08sol.mp3', target: '#questionBar', title: 'Q8 Solution: Safe Ratio', type: 'solution', qId: 8 },
  { src: 'Day04/New_Day4Question09.mp3', target: '#questionBar', title: 'Q9: Profit Pct', type: 'question', qId: 9 },
  { src: 'Day04/New_Day4Question09sol.mp3', target: '#questionBar', title: 'Q9 Solution: Profit Pct', type: 'solution', qId: 9 },
  { src: 'Day04/New_Day4Question10.mp3', target: '#questionBar', title: 'Q10: Earn > Marketing', type: 'question', qId: 10 },
  { src: 'Day04/New_Day4Question10sol.mp3', target: '#questionBar', title: 'Q10 Solution: Earn > Marketing', type: 'solution', qId: 10 },
  { src: 'Day04/New_Day4Question11.mp3', target: '#questionBar', title: 'Q11: Parity Check', type: 'question', qId: 11 },
  { src: 'Day04/New_Day4Question11sol.mp3', target: '#questionBar', title: 'Q11 Solution: Parity Check', type: 'solution', qId: 11 },
  { src: 'Day04/New_Day4Question12.mp3', target: '#questionBar', title: 'Q12: Stock Value', type: 'question', qId: 12 },
  { src: 'Day04/New_Day4Question12sol.mp3', target: '#questionBar', title: 'Q12 Solution: Stock Value', type: 'solution', qId: 12 }
];

const day05Durations = [11.88, 31.0, 8.4, 19.94, 29.7, 9.38, 13.54, 26.74, 12.54, 5.86, 20.8, 16.14, 18.2, 19.74, 10.48, 7.52, 16.72, 10.48, 5.06, 31.34, 11.84, 8.46, 9.92, 15.92, 16.8, 10.0, 8.84, 9.28, 10.58, 10.8, 11.44, 8.72, 8.72, 9.2, 8.36, 10.0, 9.06, 10.0, 12.02, 10.0, 9.2, 8.0, 11.98, 8.16, 7.38, 8.72, 6.76, 7.8, 18.5, 13.84, 15.76, 10.0, 11.38];

const day05Tracks = [
  // ── Section 1: Why Aggregation Matters ──
  { src: 'Day05/New_Day5Part1audio01.mp3', target: '#day05WhyAgg', title: '01. Why Aggregation Matters' },
  { src: 'Day05/New_Day5Part1audio02.mp3', target: '#day05AggRefTable', title: 'The Big 5 Aggregates' },
  { src: 'Day05/New_Day5Part1audio03.mp3', target: '#day05FiveAggs', title: '💡 Core Rule of Thumb' },

  // ── Section 2: COUNT Variations ──
  { src: 'Day05/New_Day5Part1audio04.mp3', target: '#day05Count', title: '02. COUNT Variations' },
  { src: 'Day05/New_Day5Part1audio05.mp3', target: '#day05CountExamples', title: 'COUNT in Action' },
  { src: 'Day05/New_Day5Part1audio06.mp3', target: '#day05CountInfo', title: '📊 Data Quality Formula' },

  // ── Section 3: SUM & AVG ──
  { src: 'Day05/New_Day5Part1audio07.mp3', target: '#day05SumAvg', title: '03. SUM & AVG' },
  { src: 'Day05/New_Day5Part1audio08.mp3', target: '#day05SumAvgCode', title: 'SUM & AVG Examples' },
  { src: 'Day05/New_Day5Part1audio09.mp3', target: '#day05AvgNullWarn', title: '⚠️ The AVG & NULL Trap' },

  // ── Section 4: COALESCE Safety Net ──
  { src: 'Day05/New_Day5Part1audio10.mp3', target: '#day05Coalesce', title: '04. COALESCE Safety Net' },
  { src: 'Day05/New_Day5Part1audio11.mp3', target: '#day05CoalesceCode', title: 'COALESCE in Action' },
  { src: 'Day05/New_Day5Part1audio12.mp3', target: '#day05CoalesceTip', title: '💡 Inside vs Outside COALESCE' },

  // ── Section 5: MIN & MAX Beyond Numbers ──
  { src: 'Day05/New_Day5Part1audio13.mp3', target: '#day05MinMax', title: '05. MIN & MAX Beyond Numbers' },
  { src: 'Day05/New_Day5Part1audio14.mp3', target: '#day05MinMaxCode', title: 'MIN & MAX Examples' },
  { src: 'Day05/New_Day5Part1audio15.mp3', target: '#day05MinMaxTip', title: '💡 ISO-8601 Date Standard' },

  // ── Section 6: Multi-Aggregate Dashboards ──
  { src: 'Day05/New_Day5Part1audio16.mp3', target: '#day05Stacking', title: '06. Stacking Aggregates' },
  { src: 'Day05/New_Day5Part1audio17.mp3', target: '#day05StackCode', title: 'Executive KPI Dashboard' },
  { src: 'Day05/New_Day5Part1audio18.mp3', target: '#day05StackInfo', title: '💡 Row-Level Expression' },

  // ── Section 7: NULL Behavior & Auditing ──
  { src: 'Day05/New_Day5Part1audio19.mp3', target: '#day05NullDeep', title: '07. NULL Deep Dive' },
  { src: 'Day05/New_Day5Part1audio20.mp3', target: '#day05NullBehavTable', title: 'NULL Behavior Reference' },
  { src: 'Day05/New_Day5Part1audio21.mp3', target: '#day05NullDemoCode', title: 'Live Aggregation Demo' },
  { src: 'Day05/New_Day5Part1audio22.mp3', target: '#day05NullTip', title: '💡 Pro-Tip: Missing Value Audit' },
  { src: 'Day05/New_Day5Part1audio23.mp3', target: '#day05DistinctWarn', title: '⚠️ Caution with SUM(DISTINCT)' },

  // ── 15 Practice Questions & Solutions ──
  { src: 'Day05/New_Day5Question01.mp3', target: '#questionBar', title: 'Q1: Payroll Summary', type: 'question', qId: 1 },
  { src: 'Day05/New_Day5Question01sol.mp3', target: '#questionBar', title: 'Q1 Solution: Payroll Summary', type: 'solution', qId: 1 },
  { src: 'Day05/New_Day5Question02.mp3', target: '#questionBar', title: 'Q2: Active Employees', type: 'question', qId: 2 },
  { src: 'Day05/New_Day5Question02sol.mp3', target: '#questionBar', title: 'Q2 Solution: Active Employees', type: 'solution', qId: 2 },
  { src: 'Day05/New_Day5Question03.mp3', target: '#questionBar', title: 'Q3: Product Price Range', type: 'question', qId: 3 },
  { src: 'Day05/New_Day5Question03sol.mp3', target: '#questionBar', title: 'Q3 Solution: Product Price Range', type: 'solution', qId: 3 },
  { src: 'Day05/New_Day5Question04.mp3', target: '#questionBar', title: 'Q4: Commission Coverage Audit', type: 'question', qId: 4 },
  { src: 'Day05/New_Day5Question04sol.mp3', target: '#questionBar', title: 'Q4 Solution: Commission Coverage Audit', type: 'solution', qId: 4 },
  { src: 'Day05/New_Day5Question05.mp3', target: '#questionBar', title: 'Q5: Shipped Revenue Total', type: 'question', qId: 5 },
  { src: 'Day05/New_Day5Question05sol.mp3', target: '#questionBar', title: 'Q5 Solution: Shipped Revenue Total', type: 'solution', qId: 5 },
  { src: 'Day05/New_Day5Question06.mp3', target: '#questionBar', title: 'Q6: Distinct Department Count', type: 'question', qId: 6 },
  { src: 'Day05/New_Day5Question06sol.mp3', target: '#questionBar', title: 'Q6 Solution: Distinct Department Count', type: 'solution', qId: 6 },
  { src: 'Day05/New_Day5Question07.mp3', target: '#questionBar', title: 'Q7: Total Inventory Valuation', type: 'question', qId: 7 },
  { src: 'Day05/New_Day5Question07sol.mp3', target: '#questionBar', title: 'Q7 Solution: Total Inventory Valuation', type: 'solution', qId: 7 },
  { src: 'Day05/New_Day5Question08.mp3', target: '#questionBar', title: 'Q8: Dual Commission Averages', type: 'question', qId: 8 },
  { src: 'Day05/New_Day5Question08sol.mp3', target: '#questionBar', title: 'Q8 Solution: Dual Commission Averages', type: 'solution', qId: 8 },
  { src: 'Day05/New_Day5Question09.mp3', target: '#questionBar', title: 'Q9: Premium Product Count', type: 'question', qId: 9 },
  { src: 'Day05/New_Day5Question09sol.mp3', target: '#questionBar', title: 'Q9 Solution: Premium Product Count', type: 'solution', qId: 9 },
  { src: 'Day05/New_Day5Question10.mp3', target: '#questionBar', title: 'Q10: Safe Average on Unmatched', type: 'question', qId: 10 },
  { src: 'Day05/New_Day5Question10sol.mp3', target: '#questionBar', title: 'Q10 Solution: Safe Average on Unmatched', type: 'solution', qId: 10 },
  { src: 'Day05/New_Day5Question11.mp3', target: '#questionBar', title: 'Q11: Peak Transaction Value', type: 'question', qId: 11 },
  { src: 'Day05/New_Day5Question11sol.mp3', target: '#questionBar', title: 'Q11 Solution: Peak Transaction Value', type: 'solution', qId: 11 },
  { src: 'Day05/New_Day5Question12.mp3', target: '#questionBar', title: 'Q12: Geographic Reach Metric', type: 'question', qId: 12 },
  { src: 'Day05/New_Day5Question12sol.mp3', target: '#questionBar', title: 'Q12 Solution: Geographic Reach Metric', type: 'solution', qId: 12 },
  { src: 'Day05/New_Day5Question13.mp3', target: '#questionBar', title: 'Q13: Single-Pass Revenue Segmentation', type: 'question', qId: 13 },
  { src: 'Day05/New_Day5Question13sol.mp3', target: '#questionBar', title: 'Q13 Solution: Single-Pass Revenue Segmentation', type: 'solution', qId: 13 },
  { src: 'Day05/New_Day5Question14.mp3', target: '#questionBar', title: 'Q14: Weighted Average Price', type: 'question', qId: 14 },
  { src: 'Day05/New_Day5Question14sol.mp3', target: '#questionBar', title: 'Q14 Solution: Weighted Average Price', type: 'solution', qId: 14 },
  { src: 'Day05/New_Day5Question15.mp3', target: '#questionBar', title: 'Q15: Department Staff String', type: 'question', qId: 15 },
  { src: 'Day05/New_Day5Question15sol.mp3', target: '#questionBar', title: 'Q15 Solution: Department Staff String', type: 'solution', qId: 15 }
];

const slideTrackMap = {
  'day01': {
    0: { tracks: topic01Tracks, durations: topic01Durations },
    1: { tracks: topic02Tracks, durations: topic02Durations }
  },
  'day02': {
    0: { tracks: day02Tracks, durations: day02Durations }
  },
  'day03': {
    0: { tracks: day03Tracks, durations: day03Durations }
  },
  'day04': {
    0: { tracks: day04Tracks, durations: day04Durations }
  },
'day05': {
    0: { tracks: day05Tracks, durations: day05Durations }
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
      const res = await fetch('/Version-3/manifest.json?v=19.0');
      if (res.ok) {
        manifest = await res.json();
      }
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
    if (!res.ok) return null;
    const text = await res.text();
    if (!text || !text.trim()) return null;
    return JSON.parse(text);
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



// ═══════════════════════════════════════════════════════════════════════════════
// ║  DAY 01 & SCHEMA PEEKING VISUAL HIGHLIGHT & CODE TOOLTIP SYSTEM          ║
// ═══════════════════════════════════════════════════════════════════════════════

let activePeekTooltip = null;
let peekHideTimer = null;

function cancelHideSchemaPeekTooltip() {
  if (peekHideTimer) {
    clearTimeout(peekHideTimer);
    peekHideTimer = null;
  }
}

function scheduleHideSchemaPeekTooltip() {
  cancelHideSchemaPeekTooltip();
  peekHideTimer = setTimeout(() => {
    hideSchemaPeekTooltip();
  }, 250);
}

function hideSchemaPeekTooltip() {
  cancelHideSchemaPeekTooltip();
  if (activePeekTooltip) {
    activePeekTooltip.remove();
    activePeekTooltip = null;
  }
}

function insertSqlSnippet(snippet, cursorOffset = 0) {
  const isTest = document.getElementById('testOverlay')?.classList.contains('open');
  const targetEditor = (isTest && testEditor) ? testEditor : mainEditor;
  if (!targetEditor) return;

  const doc = targetEditor.getDoc();
  const cursor = doc.getCursor();
  doc.replaceRange(snippet, cursor);
  
  const newPos = {
    line: cursor.line,
    ch: cursor.ch + snippet.length + cursorOffset
  };
  doc.setCursor(newPos);
  targetEditor.focus();
}
window.insertSqlSnippet = insertSqlSnippet;

function handleColumnChipClick(colName, event) {
  if (event) event.stopPropagation();
  insertSqlSnippet(colName + ' ', 0);
  
  // Instant visual feedback on chip
  const chip = event ? event.currentTarget : null;
  if (chip) {
    const prevBg = chip.style.background;
    chip.style.background = '#10b981';
    chip.style.color = '#fff';
    setTimeout(() => {
      if (chip) {
        chip.style.background = prevBg;
        chip.style.color = '';
      }
    }, 250);
  }
}
window.handleColumnChipClick = handleColumnChipClick;

function showSchemaPeekTooltip(tableName, anchorEl, isClick = false) {
  cancelHideSchemaPeekTooltip();
  const schema = getSchemaInfo();
  const cols = schema[tableName] || [];
  if (cols.length === 0) return;

  if (activePeekTooltip && activePeekTooltip.dataset.table === tableName && isClick) {
    hideSchemaPeekTooltip();
    return;
  }

  hideSchemaPeekTooltip();

  const tooltip = document.createElement('div');
  tooltip.className = 'schema-peek-tooltip';
  tooltip.id = 'schemaPeekTooltip';
  tooltip.dataset.table = tableName;

  const svgTable = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right:4px; vertical-align:-1px;"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M3 15h18"/><path d="M9 3v18"/></svg>';
  const svgBulb = '<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-right:4px; vertical-align:-1px;"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M15 2a6 6 0 0 0-6 6c0 2 1 3.5 2 4.5V15h2v-2.5c1-1 2-2.5 2-4.5a6 6 0 0 0-6-6z"/></svg>';

  const colsHtml = cols.map(c => `
    <span class="schema-peek-col" onclick="handleColumnChipClick('${c}', event)" title="Click to insert '${c}' into code cell">
      ${c}
    </span>
  `).join('');

  tooltip.innerHTML = `
    <div class="schema-peek-header">
      <div style="display:flex; align-items:center;">
        ${svgTable}
        <strong style="cursor:pointer;" onclick="handleColumnChipClick('${tableName}', event)" title="Click to insert '${tableName}'">${tableName}</strong>
      </div>
      <div style="display:flex; align-items:center; gap:6px;">
        <span style="font-size:0.68rem; color:#94a3b8;">${cols.length} columns</span>
        <button class="peek-close-mini" onclick="hideSchemaPeekTooltip()" title="Close" style="background:transparent; border:none; color:#94a3b8; cursor:pointer; font-size:0.75rem; padding:0 4px;">&times;</button>
      </div>
    </div>
    <div class="schema-peek-cols">${colsHtml}</div>
    <div class="schema-peek-preview">${svgBulb} Click any column or table name to paste into code cell</div>
  `;

  // Bridge hover between anchor and tooltip
  tooltip.addEventListener('mouseenter', cancelHideSchemaPeekTooltip);
  tooltip.addEventListener('mouseleave', scheduleHideSchemaPeekTooltip);

  document.body.appendChild(tooltip);
  activePeekTooltip = tooltip;

  const rect = anchorEl.getBoundingClientRect();
  const top = Math.max(10, rect.bottom + 6);
  const left = Math.max(10, Math.min(window.innerWidth - 300, rect.left));
  tooltip.style.top = `${top}px`;
  tooltip.style.left = `${left}px`;
}

function initSchemaCodePeeking() {
  const codeTags = document.querySelectorAll('#questionBar code, #questionPrompt code, #slideBodyText code, #testQuestionPrompt code, .test-question-prompt code, .question-prompt code');
  const schema = getSchemaInfo();
  const tableNames = Object.keys(schema);

  // Collect all column names across all schema tables
  const allColumns = [];
  tableNames.forEach(t => {
    if (schema[t]) schema[t].forEach(c => allColumns.push(c));
  });

  codeTags.forEach(tag => {
    if (tag.dataset.peekInit) return;
    tag.dataset.peekInit = 'true';

    const text = tag.textContent.trim().toLowerCase();
    
    // If tag matches a table name
    if (tableNames.includes(text)) {
      tag.classList.add('schema-peek-trigger');
      tag.title = `Table '${text}' ? Hover or tap to view columns and insert`;
      
      tag.addEventListener('mouseenter', (e) => {
        showSchemaPeekTooltip(text, tag, false);
      });
      tag.addEventListener('mouseleave', () => {
        scheduleHideSchemaPeekTooltip();
      });
      tag.addEventListener('click', (e) => {
        e.stopPropagation();
        showSchemaPeekTooltip(text, tag, true);
      });
    } else if (allColumns.includes(text)) {
      // If tag is a column name, make it click-to-insert directly
      tag.classList.add('schema-peek-trigger');
      tag.title = `Column '${text}' ? Click to insert into code cell`;
      tag.addEventListener('click', (e) => {
        e.stopPropagation();
        insertSqlSnippet(text + ' ', 0);
        const prevColor = tag.style.color;
        tag.style.color = '#10b981';
        setTimeout(() => { tag.style.color = prevColor; }, 300);
      });
    }
  });
}

// Global outside click listener to dismiss peek popover
document.addEventListener('click', (e) => {
  if (activePeekTooltip && !activePeekTooltip.contains(e.target) && !e.target.closest('.schema-peek-trigger')) {
    hideSchemaPeekTooltip();
  }
});


document.addEventListener('DOMContentLoaded', () => { setTimeout(() => { updateOverallScoreUI(); }, 50); });


// Visual highlight synchronizer for Day 01 Topic 02 (Column Projection & Performance)


function updateDay01Audio01Highlights(currentTime, isPlaying) {
  const section = document.getElementById('rdbmsIntro');
  const tableCard = document.getElementById('rdbmsTableCard');
  const table = document.getElementById('rdbmsMockTable');

  if (!section) return;

  if (!isPlaying) {
    section.classList.remove('narration-zoomed');
    if (tableCard) {
      tableCard.classList.remove('narration-hidden', 'narration-revealed');
    }
    if (table) {
      table.querySelectorAll('.column-narration-active').forEach(el => el.classList.remove('column-narration-active'));
      const row2 = table.querySelector('tbody tr.highlighted-row');
      if (row2) row2.classList.remove('narration-row-pulse');
    }
    return;
  }

  // Active playing:
  // 1. Zoom in on narration start
  section.classList.add('narration-zoomed');

  // 2. Control Table Card appearance (Second Image) at 13.94s
  if (tableCard) {
    if (currentTime < 13.94) {
      tableCard.classList.add('narration-hidden');
      tableCard.classList.remove('narration-revealed');
    } else {
      tableCard.classList.remove('narration-hidden');
      tableCard.classList.add('narration-revealed');
    }
  }

  // 3. Keyword column highlighting in table
  if (table) {
    let activeCol = -1; // 0: ID, 1: Name, 2: Role, 3: Salary
    let highlightRows = false;

    if (currentTime >= 17.86 && currentTime < 18.88) {
      activeCol = 0; // "ID"
    } else if (currentTime >= 18.88 && currentTime < 19.78) {
      activeCol = 1; // "employee name"
    } else if (currentTime >= 19.78 && currentTime < 20.12) {
      activeCol = 2; // "role"
    } else if (currentTime >= 20.12 && currentTime < 20.88) {
      activeCol = 3; // "salary"
    } else if (currentTime >= 20.88 && currentTime <= 23.40) {
      highlightRows = true; // "while the rows represent individual records."
    }

    // Apply column active class to headers and cells of matching index
    const ths = table.querySelectorAll('thead th');
    const rows = table.querySelectorAll('tbody tr');

    ths.forEach((th, idx) => {
      th.classList.toggle('column-narration-active', idx === activeCol);
    });

    rows.forEach(tr => {
      const tds = tr.querySelectorAll('td');
      tds.forEach((td, idx) => {
        td.classList.toggle('column-narration-active', idx === activeCol);
      });
      if (tr.classList.contains('highlighted-row')) {
        tr.classList.toggle('narration-row-pulse', highlightRows);
      }
    });
  }
}


function updateDay01Audio03Highlights(currentTime, isPlaying) {
  const container = document.getElementById('rdbmsProblems');
  if (!container) return;

  const cardRedundancy = document.getElementById('cardRedundancy') || container.querySelector('.info-card--green');
  const cardIntegrity = document.getElementById('cardIntegrity') || container.querySelector('.info-card--blue');
  const cardConcurrent = document.getElementById('cardConcurrent') || container.querySelector('.info-card--orange');
  const infoColumns = container.querySelector('.info-columns');

  if (!cardRedundancy || !cardIntegrity || !cardConcurrent) return;

  if (!isPlaying) {
    if (infoColumns) infoColumns.classList.remove('has-narration-active');
    cardRedundancy.classList.remove('card-narration-active');
    cardIntegrity.classList.remove('card-narration-active');
    cardConcurrent.classList.remove('card-narration-active');
    return;
  }

  if (infoColumns) infoColumns.classList.add('has-narration-active');

  // Whisper ASR Timestamps for New_Day1Part1audio03.mp3:
  // 0.00s - 5.80s: Card 1 (Redundancy) - "First, it eliminates data redundancy..."
  // 5.80s - 10.60s: Card 2 (Integrity) - "Second, it maintains data integrity..."
  // 10.60s - 22.00s: Card 3 (Concurrent Access) - "And third, it handles concurrent access..."

  const isCard1 = (currentTime >= 0 && currentTime < 5.80);
  const isCard2 = (currentTime >= 5.80 && currentTime < 10.60);
  const isCard3 = (currentTime >= 10.60 && currentTime <= 22.00);

  cardRedundancy.classList.toggle('card-narration-active', isCard1);
  cardIntegrity.classList.toggle('card-narration-active', isCard2);
  cardConcurrent.classList.toggle('card-narration-active', isCard3);
}


function updateDay01CoreEntitiesHighlights(activeTarget, isPlaying) {
  const tableWrap = document.getElementById('coreEntitiesTableWrap');
  if (!tableWrap) return;

  const rows = {
    database: document.getElementById('rowDatabase'),
    table: document.getElementById('rowTable'),
    column: document.getElementById('rowColumn'),
    row: document.getElementById('rowRow')
  };

  const allRows = [rows.database, rows.table, rows.column, rows.row].filter(Boolean);

  // Always keep all rows and their child contents fully visible in the DOM
  allRows.forEach(r => {
    r.classList.remove('vis-target-hidden');
    r.style.display = '';
    r.querySelectorAll('*').forEach(c => {
      c.classList.remove('vis-target-hidden');
      c.style.display = '';
    });
  });

  if (!isPlaying || !activeTarget) {
    allRows.forEach(r => r.classList.remove('row-active-spotlight'));
    return;
  }

  let highlightedRow = null;

  if (activeTarget.includes('entityDatabase') || activeTarget.includes('New_Day1Part1audio07')) {
    highlightedRow = rows.database;
  } else if (activeTarget.includes('entityTable') || activeTarget.includes('New_Day1Part1audio06')) {
    highlightedRow = rows.table;
  } else if (activeTarget.includes('entityColumn') || activeTarget.includes('New_Day1Part1audio05')) {
    highlightedRow = rows.column;
  } else if (activeTarget.includes('entityRow') || activeTarget.includes('New_Day1Part1audio08')) {
    highlightedRow = rows.row;
  }

  allRows.forEach(r => {
    r.classList.toggle('row-active-spotlight', r === highlightedRow);
  });
}


function updateDay01SqlSubLanguagesHighlights(activeTarget, isPlaying) {
  const table = document.getElementById('sqlSubLanguagesTable');
  if (!table) return;

  const rows = {
    dql: document.getElementById('subLangDql'),
    dml: document.getElementById('subLangDml'),
    ddl: document.getElementById('subLangDdl'),
    tcl: document.getElementById('subLangTcl'),
    dcl: document.getElementById('subLangDcl')
  };

  const allRows = [rows.dql, rows.dml, rows.ddl, rows.tcl, rows.dcl].filter(Boolean);

  if (!isPlaying || !activeTarget) {
    allRows.forEach(r => r.classList.remove('row-active-spotlight'));
    return;
  }

  let highlightedRow = null;

  if (activeTarget.includes('subLangDql') || activeTarget.includes('New_Day1Part1audio17')) {
    highlightedRow = rows.dql;
  } else if (activeTarget.includes('subLangDml') || activeTarget.includes('New_Day1Part1audio18')) {
    highlightedRow = rows.dml;
  } else if (activeTarget.includes('subLangDdl') || activeTarget.includes('New_Day1Part1audio19')) {
    highlightedRow = rows.ddl;
  } else if (activeTarget.includes('subLangTcl') || activeTarget.includes('New_Day1Part1audio20')) {
    highlightedRow = rows.tcl;
  } else if (activeTarget.includes('subLangDcl') || activeTarget.includes('New_Day1Part1audio21')) {
    highlightedRow = rows.dcl;
  }

  allRows.forEach(r => {
    r.classList.toggle('row-active-spotlight', r === highlightedRow);
  });
}


function updateDay01Topic02Spotlights(activeTarget, isPlaying) {
  if (currentDay !== 'day01' || currentSlide !== 1) return;

  const containers = [
    document.getElementById('slideBodyText'),
    document.getElementById('presentSlideContent')
  ].filter(Boolean);

  containers.forEach(container => {
    // 1. Clear previous diagram highlights
    container.querySelectorAll('#projectionDiskPage, #projectionLoads, #projectionFilter, #projectionResultSet, .relation-node, .relation-link').forEach(el => {
      el.classList.remove('diagram-step-active', 'diagram-step-pulse');
    });

    if (!isPlaying || !activeTarget) return;

    // 2. Relational Projection Diagram Step Highlight
    if (activeTarget === '#projectionDiagram') {
      const diag = container.querySelector('#projectionDiagram');
      if (diag) diag.classList.add('diagram-step-active');
    } else if (activeTarget === '#projectionDiskPage' || activeTarget === '#cardPagesBlocks') {
      const node = container.querySelector('#projectionDiskPage');
      if (node) node.classList.add('diagram-step-pulse');
    } else if (activeTarget === '#projectionLoads') {
      const link = container.querySelector('#projectionLoads');
      if (link) link.classList.add('diagram-step-pulse');
    } else if (activeTarget === '#projectionFilter') {
      const filterNode = container.querySelector('#projectionFilter');
      if (filterNode) filterNode.classList.add('diagram-step-pulse');
    } else if (activeTarget === '#projectionResultSet') {
      const resNode = container.querySelector('#projectionResultSet');
      if (resNode) resNode.classList.add('diagram-step-pulse');
    }

    // 3. Performance Costs Highlight
    if (['#costExcessDiskIO', '#costBufferPool', '#costNetworkOverhead', '#costDefeatedIndex'].includes(activeTarget)) {
      const targetCard = container.querySelector(activeTarget);
      if (targetCard) targetCard.classList.add('card-active-spotlight');
    }

    // 4. Index-Only Scans vs Heap Lookup
    if (['#heapLookupRequired', '#indexOnlyScanGood'].includes(activeTarget)) {
      const vsCard = container.querySelector(activeTarget);
      if (vsCard) vsCard.classList.add('card-active-spotlight');
    }

    // 5. Column-Oriented DB cards
    if (['#cardZeroOverhead', '#cardBilledPerByte', '#cardCompression'].includes(activeTarget)) {
      const colCard = container.querySelector(activeTarget);
      if (colCard) colCard.classList.add('card-active-spotlight');
    }
  });
}


function updateDay01Topic02StorageCards(currentTime, isPlaying, trackKey) {
  const container = document.getElementById('storageConceptsBlock');
  if (!container) return;

  const cardPages = document.getElementById('cardPagesBlocks');
  const cardRow = document.getElementById('cardRowOriented');
  const cardFull = document.getElementById('cardFullPageLoad');

  if (!cardPages || !cardRow || !cardFull) return;

  if (!isPlaying) {
    cardPages.classList.remove('card-narration-active');
    cardRow.classList.remove('card-narration-active');
    cardFull.classList.remove('card-narration-active');
    container.querySelectorAll('.bullet-highlight').forEach(el => el.classList.remove('bullet-highlight'));
    return;
  }

  // Clear previous active bullets
  container.querySelectorAll('.bullet-highlight').forEach(el => el.classList.remove('bullet-highlight'));

  if (trackKey === 'audio02') {
    cardPages.classList.add('card-narration-active');
    cardRow.classList.remove('card-narration-active');
    cardFull.classList.remove('card-narration-active');

    const b1 = document.getElementById('bulletPages1');
    const b2 = document.getElementById('bulletPages2');
    const b3 = document.getElementById('bulletPages3');
    if (currentTime >= 7.92 && currentTime < 18.58) {
      if (b1) b1.classList.add('bullet-highlight');
    } else if (currentTime >= 18.58) {
      if (b2) b2.classList.add('bullet-highlight');
      if (b3) b3.classList.add('bullet-highlight');
    }
  } else if (trackKey === 'audio03') {
    cardPages.classList.remove('card-narration-active');
    cardRow.classList.add('card-narration-active');
    cardFull.classList.remove('card-narration-active');

    const b1 = document.getElementById('bulletRow1');
    const b2 = document.getElementById('bulletRow2');
    const b3 = document.getElementById('bulletRow3');
    if (currentTime >= 0 && currentTime < 5.90) {
      if (b1) b1.classList.add('bullet-highlight');
    } else if (currentTime >= 5.90 && currentTime < 9.86) {
      if (b2) b2.classList.add('bullet-highlight');
    } else if (currentTime >= 9.86) {
      if (b3) b3.classList.add('bullet-highlight');
    }
  } else if (trackKey === 'audio03new') {
    cardPages.classList.remove('card-narration-active');
    cardRow.classList.remove('card-narration-active');
    cardFull.classList.add('card-narration-active');

    const b1 = document.getElementById('bulletFull1');
    const b2 = document.getElementById('bulletFull2');
    const b3 = document.getElementById('bulletFull3');
    if (currentTime >= 0 && currentTime < 6.94) {
      if (b1) b1.classList.add('bullet-highlight');
    } else if (currentTime >= 6.94 && currentTime < 12.28) {
      if (b2) b2.classList.add('bullet-highlight');
    } else if (currentTime >= 12.28) {
      if (b3) b3.classList.add('bullet-highlight');
    }
  }
}


function updateDay01Topic02Pipeline(currentTime, isPlaying, trackKey) {
  const diag = document.getElementById('projectionDiagram');
  if (!diag) return;

  const nodeDisk = document.getElementById('projectionDiskPage');
  const connLoads = document.getElementById('projectionLoads');
  const nodeFilter = document.getElementById('projectionFilter');
  const connReturns = document.getElementById('projectionReturns');
  const nodeResult = document.getElementById('projectionResultSet');

  if (!isPlaying) {
    diag.classList.remove('diagram-overview-glow');
    if (nodeDisk) nodeDisk.classList.remove('diagram-node-active');
    if (connLoads) connLoads.classList.remove('connector-active-pulse');
    if (nodeFilter) nodeFilter.classList.remove('diagram-node-active', 'diagram-filter-active');
    if (connReturns) connReturns.classList.remove('connector-active-pulse');
    if (nodeResult) nodeResult.classList.remove('diagram-node-active', 'diagram-result-active');
    diag.querySelectorAll('.attr-tag-pulse').forEach(el => el.classList.remove('attr-tag-pulse'));
    return;
  }

  // Clear all states before applying active track
  diag.classList.remove('diagram-overview-glow');
  if (nodeDisk) nodeDisk.classList.remove('diagram-node-active');
  if (connLoads) connLoads.classList.remove('connector-active-pulse');
  if (nodeFilter) nodeFilter.classList.remove('diagram-node-active', 'diagram-filter-active');
  if (connReturns) connReturns.classList.remove('connector-active-pulse');
  if (nodeResult) nodeResult.classList.remove('diagram-node-active', 'diagram-result-active');
  diag.querySelectorAll('.attr-tag-pulse').forEach(el => el.classList.remove('attr-tag-pulse'));

  if (trackKey === 'audio04') {
    if (currentTime < 2.64) {
      diag.classList.add('diagram-overview-glow');
    } else {
      if (nodeDisk) nodeDisk.classList.add('diagram-node-active');
      diag.querySelectorAll('#attrId, #attrName, #attrDept, #attrSalary').forEach(el => el.classList.add('attr-tag-pulse'));
    }
  } else if (trackKey === 'audio05') {
    if (nodeDisk) nodeDisk.classList.add('diagram-node-active');
    if (connLoads) connLoads.classList.add('connector-active-pulse');
  } else if (trackKey === 'audio06') {
    if (nodeFilter) nodeFilter.classList.add('diagram-node-active', 'diagram-filter-active');
  } else if (trackKey === 'audio07') {
    if (connReturns) connReturns.classList.add('connector-active-pulse');
    if (nodeResult) nodeResult.classList.add('diagram-node-active', 'diagram-result-active');
  }
}


function updateDay01Topic02ColumnarCards(currentTime, isPlaying, trackKey) {
  const container = document.getElementById('columnarConceptsBlock');
  if (!container) return;

  const cardZero = document.getElementById('cardZeroOverhead');
  const cardBilled = document.getElementById('cardBilledPerByte');
  const cardComp = document.getElementById('cardCompression');

  if (!cardZero || !cardBilled || !cardComp) return;

  if (!isPlaying) {
    cardZero.classList.remove('card-narration-active');
    cardBilled.classList.remove('card-narration-active');
    cardComp.classList.remove('card-narration-active');
    container.querySelectorAll('.bullet-highlight').forEach(el => el.classList.remove('bullet-highlight'));
    return;
  }

  // Clear previous active bullets
  container.querySelectorAll('.bullet-highlight').forEach(el => el.classList.remove('bullet-highlight'));

  if (trackKey === 'audio17') {
    cardZero.classList.add('card-narration-active');
    cardBilled.classList.remove('card-narration-active');
    cardComp.classList.remove('card-narration-active');

    const b1 = document.getElementById('bulletZero1');
    const b2 = document.getElementById('bulletZero2');
    const b3 = document.getElementById('bulletZero3');
    if (currentTime >= 2.58 && currentTime < 6.18) {
      if (b1) b1.classList.add('bullet-highlight');
    } else if (currentTime >= 6.18 && currentTime < 9.52) {
      if (b2) b2.classList.add('bullet-highlight');
    } else if (currentTime >= 9.52) {
      if (b3) b3.classList.add('bullet-highlight');
    }
  } else if (trackKey === 'audio18new') {
    cardZero.classList.remove('card-narration-active');
    cardBilled.classList.add('card-narration-active');
    cardComp.classList.remove('card-narration-active');

    const b1 = document.getElementById('bulletBilled1');
    const b2 = document.getElementById('bulletBilled2');
    const b3 = document.getElementById('bulletBilled3');
    if (currentTime >= 1.90 && currentTime < 5.38) {
      if (b1) b1.classList.add('bullet-highlight');
    } else if (currentTime >= 5.38 && currentTime < 12.74) {
      if (b2) b2.classList.add('bullet-highlight');
    } else if (currentTime >= 12.74) {
      if (b3) b3.classList.add('bullet-highlight');
    }
  } else if (trackKey === 'audio18') {
    cardZero.classList.remove('card-narration-active');
    cardBilled.classList.remove('card-narration-active');
    cardComp.classList.add('card-narration-active');

    const b1 = document.getElementById('bulletComp1');
    const b2 = document.getElementById('bulletComp2');
    const b3 = document.getElementById('bulletComp3');
    if (currentTime >= 2.52 && currentTime < 5.78) {
      if (b1) b1.classList.add('bullet-highlight');
    } else if (currentTime >= 5.78 && currentTime < 9.02) {
      if (b2) b2.classList.add('bullet-highlight');
    } else if (currentTime >= 9.02) {
      if (b3) b3.classList.add('bullet-highlight');
    }
  }
}




function updateTableHighlights(currentTime, isPlaying) {
  const rows = document.querySelectorAll('#day03OpsTable tbody tr');
  if (!rows.length) return;

  if (!isPlaying) {
    rows.forEach(row => {
      row.classList.remove('narration-highlight', 'row-active-spotlight');
    });
    return;
  }

  // Exact Whisper ASR word-level timestamps for New_Day3Part1audio05.mp3 (20.88s):
  // 0.00s - 3.20s  : "The equals operator checks for an exact match." -> Row 0 (=)
  // 3.20s - 8.80s  : "Not equal. Written as less than greater than or exclamation equals. Test for inequality." -> Row 1 (<>, !=)
  // 8.80s - 10.40s : "Greater than..." -> Row 2 (>)
  // 10.40s - 13.00s: "...and less than test numerical and date boundaries." -> Row 4 (<)
  // 13.00s - 16.50s: "Greater than or equal..." -> Row 3 (>=)
  // 16.50s - 20.88s: "...and less than or equal include the boundary value itself in your results." -> Row 5 (<=)
  let activeIndex = -1;
  if (currentTime >= 0.00 && currentTime < 3.20) {
    activeIndex = 0; // = Equal to
  } else if (currentTime >= 3.20 && currentTime < 8.80) {
    activeIndex = 1; // <> or != Not equal
  } else if (currentTime >= 8.80 && currentTime < 10.40) {
    activeIndex = 2; // > Greater than
  } else if (currentTime >= 10.40 && currentTime < 13.00) {
    activeIndex = 4; // < Less than
  } else if (currentTime >= 13.00 && currentTime < 16.50) {
    activeIndex = 3; // >= Greater than or equal
  } else if (currentTime >= 16.50 && currentTime <= 21.00) {
    activeIndex = 5; // <= Less than or equal
  }

  rows.forEach((row, idx) => {
    if (idx === activeIndex) {
      row.classList.add('narration-highlight', 'row-active-spotlight');
    } else {
      row.classList.remove('narration-highlight', 'row-active-spotlight');
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
  if (currentTime >= 5.60) revealed.not = true;
  if (currentTime >= 11.00) revealed.and = true;
  if (currentTime >= 15.50) revealed.or = true;
  if (currentTime >= 19.00) revealed.note = true;

  // Determine active highlight item
  let activeItem = null;
  if (currentTime >= 0.00 && currentTime < 5.60) {
    activeItem = 'intro';
  } else if (currentTime >= 5.60 && currentTime < 11.00) {
    activeItem = 'not';
  } else if (currentTime >= 11.00 && currentTime < 15.50) {
    activeItem = 'and';
  } else if (currentTime >= 15.50 && currentTime < 19.00) {
    activeItem = 'or';
  } else if (currentTime >= 19.00) {
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

  if (!isPlaying) {
    if (note) note.classList.remove('narration-highlight');
    if (cards.not) cards.not.classList.remove('narration-highlight');
    if (cards.and) cards.and.classList.remove('narration-highlight');
    if (cards.or) cards.or.classList.remove('narration-highlight');
    return;
  }

  // Exact Whisper ASR word-level timestamps for New_Day3Part1audio11.mp3 (15.78s):
  // 0.00s - 3.56s : Intro to precedence -> Note highlight
  // 3.56s - 5.22s : NOT card ("not evaluates first") -> NOT card highlight
  // 5.22s - 6.42s : AND card ("followed by and") -> AND card highlight
  // 6.42s - 7.84s : OR card ("and then, or") -> OR card highlight
  // 7.84s - 15.78s: "Because and binds before or, always use parentheses..." -> Note highlight
  const isNot = currentTime >= 3.56 && currentTime < 5.22;
  const isAnd = currentTime >= 5.22 && currentTime < 6.42;
  const isOr = currentTime >= 6.42 && currentTime < 7.84;
  const isNote = (currentTime >= 0.00 && currentTime < 3.56) || (currentTime >= 7.84 && currentTime <= 16.00);

  if (cards.not) cards.not.classList.toggle('narration-highlight', isNot);
  if (cards.and) cards.and.classList.toggle('narration-highlight', isAnd);
  if (cards.or) cards.or.classList.toggle('narration-highlight', isOr);
  if (note) note.classList.toggle('narration-highlight', isNote);
}

function updateWhereCodeHighlights(currentTime, isPlaying) {
  const block1 = document.getElementById('whereCodeSyntax');
  const block2 = document.getElementById('whereCodeExample');
  if (!block1 || !block2) return;

  if (!isPlaying) {
    block1.classList.remove('narration-highlight', 'code-active-spotlight');
    block2.classList.remove('narration-highlight', 'code-active-spotlight');
    return;
  }

  // Whisper ASR timestamps for New_Day3Part1audio02.mp3 (16.51s):
  // 0.00s - 12.30s : "First, write SELECT... Next, write FROM... Finally, write WHERE..." -> Syntax Skeleton
  // 12.30s - 16.51s: "for example, WHERE salary is greater than eighty thousand." -> Concrete Example
  const isB1 = currentTime >= 0.00 && currentTime < 12.30;
  const isB2 = currentTime >= 12.30 && currentTime <= 16.60;

  block1.classList.toggle('narration-highlight', isB1);
  block1.classList.toggle('code-active-spotlight', isB1);
  block2.classList.toggle('narration-highlight', isB2);
  block2.classList.toggle('code-active-spotlight', isB2);
  if (isB1) narrationScrollToSubblock(block1);
  if (isB2) narrationScrollToSubblock(block2);
}

function updateCompCodeHighlights(currentTime, isPlaying) {
  const q1 = document.getElementById('compCodeQuery1');
  const q2 = document.getElementById('compCodeQuery2');
  const q3 = document.getElementById('compCodeQuery3');
  if (!q1 || !q2 || !q3) return;

  if (!isPlaying) {
    [q1, q2, q3].forEach(el => el.classList.remove('narration-highlight', 'code-active-spotlight'));
    return;
  }

  // Exact Whisper ASR timestamps for New_Day3Part1audio06.mp3 (17.88s):
  // 2.50s - 8.14s : "The first query retrieves employees with a salary exceeding 60,000..." -> Query 1
  // 8.14s - 13.70s: "The second finds products where stock quantity is zero or less..." -> Query 2
  // 13.70s - 17.88s: "The third uses not equal to filter out a specific department." -> Query 3
  const isQ1 = currentTime >= 2.50 && currentTime < 8.14;
  const isQ2 = currentTime >= 8.14 && currentTime < 13.70;
  const isQ3 = currentTime >= 13.70 && currentTime <= 18.00;

  q1.classList.toggle('narration-highlight', isQ1);
  q1.classList.toggle('code-active-spotlight', isQ1);
  q2.classList.toggle('narration-highlight', isQ2);
  q2.classList.toggle('code-active-spotlight', isQ2);
  q3.classList.toggle('narration-highlight', isQ3);
  q3.classList.toggle('code-active-spotlight', isQ3);
  if (isQ1) narrationScrollToSubblock(q1);
  if (isQ2) narrationScrollToSubblock(q2);
  if (isQ3) narrationScrollToSubblock(q3);
}

function updateLogicCodeHighlights(currentTime, isPlaying) {
  const q1 = document.getElementById('logicCodeQuery1');
  const q2 = document.getElementById('logicCodeQuery2');
  const q3 = document.getElementById('logicCodeQuery3');
  if (!q1 || !q2 || !q3) return;

  if (!isPlaying) {
    [q1, q2, q3].forEach(el => el.classList.remove('narration-highlight', 'code-active-spotlight'));
    return;
  }

  // Exact Whisper ASR timestamps for New_Day3Part1audio12.mp3 (16.90s):
  // 2.66s - 7.84s : Query 1 (AND active employees in department 20)
  // 7.84s - 12.52s: Query 2 (OR customers in North or South region)
  // 12.52s - 16.90s: Query 3 (NOT with LIKE to exclude specific name pattern)
  const isQ1 = currentTime >= 2.66 && currentTime < 7.84;
  const isQ2 = currentTime >= 7.84 && currentTime < 12.52;
  const isQ3 = currentTime >= 12.52 && currentTime <= 17.00;

  q1.classList.toggle('narration-highlight', isQ1);
  q1.classList.toggle('code-active-spotlight', isQ1);
  q2.classList.toggle('narration-highlight', isQ2);
  q2.classList.toggle('code-active-spotlight', isQ2);
  q3.classList.toggle('narration-highlight', isQ3);
  q3.classList.toggle('code-active-spotlight', isQ3);
  if (isQ1) narrationScrollToSubblock(q1);
  if (isQ2) narrationScrollToSubblock(q2);
  if (isQ3) narrationScrollToSubblock(q3);
}

/* ─────────────────────────────────────────────────────────────────
   [SYNC-020] Narration Subblock Smart Heading-Preserving Card Windowing
   Ensures that section titles/headings NEVER get pushed offscreen or
   hidden underneath the top header bar when code blocks are highlighted.
   When the 3rd or 4th card is active / extending past the bottom safe zone,
   earlier cards (card 1, card 2) smoothly disappear/collapse, causing the
   remaining cards to smoothly glide up into place below the fixed heading!
   ───────────────────────────────────────────────────────────────── */
const _narScrollTimers = new WeakMap();
function narrationScrollToSubblock(el) {
  if (!el) return;
  if (_narScrollTimers.has(el)) return;

  const container = document.getElementById('slideContent') || el.closest('.slide-content');
  if (!container) return;

  const section = el.closest('.slide-section') || el.closest('.code-block-container') || el.parentElement;
  const heading = section ? (section.querySelector('h2, h3, h4, .heading-with-audio') || section) : null;
  const cardContainer = el.closest('.code-block-container') || (section ? section.querySelector('.code-block-container') : null);

  const containerRect = container.getBoundingClientRect();
  const elRect = el.getBoundingClientRect();
  const headingRect = heading ? heading.getBoundingClientRect() : null;

  const topPadding = 26; // Generous 26px headroom so heading is never cropped or touching top

  // 1. Keep heading pinned in view at top of container
  if (headingRect && Math.abs(headingRect.top - (containerRect.top + topPadding)) > 6) {
    const scrollDiff = headingRect.top - (containerRect.top + topPadding);
    container.scrollBy({ top: scrollDiff, behavior: 'smooth' });
  }

  // 2. Card Windowing: If we are in a multi-card container (.code-block-container)
  if (cardContainer) {
    const allCards = Array.from(cardContainer.querySelectorAll('.code-subblock'));
    const activeIdx = allCards.indexOf(el);

    if (activeIdx <= 0) {
      // Restore all cards when 1st query/card is active
      allCards.forEach(c => c.classList.remove('subblock-scrolled-out'));
      return;
    }

    // Check if active element bottom extends near or past the container bottom safe zone
    const isBottomCutoff = elRect.bottom > containerRect.bottom - 20;

    if (activeIdx >= 2 || isBottomCutoff) {
      // Collapse earlier cards so active card glides smoothly into view below heading
      // For card 3 (index 2): collapse card 1 (index 0)
      // For card 4 (index 3): collapse card 1 and card 2 (index 0 and 1)
      const cardsToCollapse = activeIdx - 1;
      for (let i = 0; i < allCards.length; i++) {
        if (i < cardsToCollapse) {
          allCards[i].classList.add('subblock-scrolled-out');
        } else {
          allCards[i].classList.remove('subblock-scrolled-out');
        }
      }
    } else {
      // For activeIdx 1 (2nd card), if it fits, keep earlier cards visible
      allCards.forEach(c => c.classList.remove('subblock-scrolled-out'));
    }
  }
}

function updateBetweenCodeHighlights(currentTime, isPlaying) {
  const q1 = document.getElementById('betweenCodeQuery1');
  const q2 = document.getElementById('betweenCodeQuery2');
  const q3 = document.getElementById('betweenCodeQuery3');
  if (!q1 || !q2 || !q3) return;

  if (!isPlaying) {
    [q1, q2, q3].forEach(el => el.classList.remove('narration-highlight', 'code-active-spotlight'));
    return;
  }

  // Whisper ASR timestamps for New_Day3Part1audio15.mp3 (19.46s):
  // 0.00s - 8.40s : "The first query filters employees earning between 50k and 90k using the between operator." -> Query 1
  // 8.40s - 13.50s: "The second retrieves all orders placed in 2024 using date boundaries." -> Query 2
  // 13.50s - 19.50s: "And the third uses the not between operator to cleanly select products outside a given price band." -> Query 3
  const isQ1 = currentTime >= 0.00 && currentTime < 8.40;
  const isQ2 = currentTime >= 8.40 && currentTime < 13.50;
  const isQ3 = currentTime >= 13.50 && currentTime <= 19.50;

  q1.classList.toggle('narration-highlight', isQ1);
  q1.classList.toggle('code-active-spotlight', isQ1);
  q2.classList.toggle('narration-highlight', isQ2);
  q2.classList.toggle('code-active-spotlight', isQ2);
  q3.classList.toggle('narration-highlight', isQ3);
  q3.classList.toggle('code-active-spotlight', isQ3);
  if (isQ1) narrationScrollToSubblock(q1);
  if (isQ2) narrationScrollToSubblock(q2);
  if (isQ3) narrationScrollToSubblock(q3);
}

function updateInCodeHighlights(currentTime, isPlaying) {
  const q1 = document.getElementById('inCodeQuery1');
  const q2 = document.getElementById('inCodeQuery2');
  const q3 = document.getElementById('inCodeQuery3');
  if (!q1 || !q2 || !q3) return;

  if (!isPlaying) {
    [q1, q2, q3].forEach(el => el.classList.remove('narration-highlight', 'code-active-spotlight'));
    return;
  }

  // Whisper ASR timestamps for New_Day3Part1audio19.mp3 (17.46s):
  // 0.00s - 8.20s : "The first query checks if department ID is in 10, 20, or 30 using the in operator." -> Query 1
  // 8.20s - 12.80s: "The second finds customers located in north, south, or east regions." -> Query 2
  // 12.80s - 17.50s: "And the third uses the not in operator to exclude specific department IDs." -> Query 3
  const isQ1 = currentTime >= 0.00 && currentTime < 8.20;
  const isQ2 = currentTime >= 8.20 && currentTime < 12.80;
  const isQ3 = currentTime >= 12.80 && currentTime <= 17.50;

  q1.classList.toggle('narration-highlight', isQ1);
  q1.classList.toggle('code-active-spotlight', isQ1);
  q2.classList.toggle('narration-highlight', isQ2);
  q2.classList.toggle('code-active-spotlight', isQ2);
  q3.classList.toggle('narration-highlight', isQ3);
  q3.classList.toggle('code-active-spotlight', isQ3);
  if (isQ1) narrationScrollToSubblock(q1);
  if (isQ2) narrationScrollToSubblock(q2);
  if (isQ3) narrationScrollToSubblock(q3);
}

function updateLikeCodeHighlights(currentTime, isPlaying) {
  const q1 = document.getElementById('likeCodeQuery1');
  const q2 = document.getElementById('likeCodeQuery2');
  const q3 = document.getElementById('likeCodeQuery3');
  if (!q1 || !q2 || !q3) return;

  if (!isPlaying) {
    [q1, q2, q3].forEach(el => el.classList.remove('narration-highlight', 'code-active-spotlight'));
    return;
  }

  // Whisper ASR timestamps for New_Day3Part1audio24.mp3 (14.09s):
  // 0.00s - 6.60s : "The first retrieves employees whose first name begins with S." -> Query 1
  // 6.60s - 9.70s : "The second finds products containing the word mouse." -> Query 2
  // 9.70s - 14.10s: "And the third uses the not like operator to exclude all Gmail addresses." -> Query 3
  const isQ1 = currentTime >= 0.00 && currentTime < 6.60;
  const isQ2 = currentTime >= 6.60 && currentTime < 9.70;
  const isQ3 = currentTime >= 9.70 && currentTime <= 14.10;

  q1.classList.toggle('narration-highlight', isQ1);
  q1.classList.toggle('code-active-spotlight', isQ1);
  q2.classList.toggle('narration-highlight', isQ2);
  q2.classList.toggle('code-active-spotlight', isQ2);
  q3.classList.toggle('narration-highlight', isQ3);
  q3.classList.toggle('code-active-spotlight', isQ3);
  if (isQ1) narrationScrollToSubblock(q1);
  if (isQ2) narrationScrollToSubblock(q2);
  if (isQ3) narrationScrollToSubblock(q3);
}

function updateNullCodeHighlights(currentTime, isPlaying) {
  const q1 = document.getElementById('nullCodeQuery1');
  const q2 = document.getElementById('nullCodeQuery2');
  const q3 = document.getElementById('nullCodeQuery3');
  const q4 = document.getElementById('nullCodeQuery4');
  if (!q1 || !q2 || !q3 || !q4) return;

  if (!isPlaying) {
    [q1, q2, q3, q4].forEach(el => el.classList.remove('narration-highlight', 'code-active-spotlight'));
    return;
  }

  // Whisper ASR timestamps for New_Day3Part1audio27.mp3 (19.92s):
  // 0.00s - 7.00s : "The first finds top level employees who have no manager using the is null predicate." -> Query 1
  // 7.00s - 12.00s: "The second finds employees who report to a manager using the is not null predicate." -> Query 2
  // 12.00s - 15.30s: "The third finds staff with no commission using is null." -> Query 3
  // 15.30s - 20.00s: "And the fourth retrieves active employees who do earn a commission using is not null." -> Query 4
  const isQ1 = currentTime >= 0.00 && currentTime < 7.00;
  const isQ2 = currentTime >= 7.00 && currentTime < 12.00;
  const isQ3 = currentTime >= 12.00 && currentTime < 15.30;
  const isQ4 = currentTime >= 15.30 && currentTime <= 20.00;

  q1.classList.toggle('narration-highlight', isQ1);
  q1.classList.toggle('code-active-spotlight', isQ1);
  q2.classList.toggle('narration-highlight', isQ2);
  q2.classList.toggle('code-active-spotlight', isQ2);
  q3.classList.toggle('narration-highlight', isQ3);
  q3.classList.toggle('code-active-spotlight', isQ3);
  q4.classList.toggle('narration-highlight', isQ4);
  q4.classList.toggle('code-active-spotlight', isQ4);
  if (isQ1) narrationScrollToSubblock(q1);
  if (isQ2) narrationScrollToSubblock(q2);
  if (isQ3) narrationScrollToSubblock(q3);
  if (isQ4) narrationScrollToSubblock(q4);
}

// ════════════════════════════════════════════════════════════════════// ══════════════════════════════════════════════════════════════════════
// DAY 04: OPERATORS & EXPRESSIONS PROGRESSIVE NARRATION HIGHLIGHTS
// ══════════════════════════════════════════════════════════════════════

function updateDay04ArithTableHighlights(currentTime, isPlaying) {
  const rows = {
    add: document.getElementById('arithOpAdd'),
    sub: document.getElementById('arithOpSub'),
    mul: document.getElementById('arithOpMul'),
    div: document.getElementById('arithOpDiv'),
    mod: document.getElementById('arithOpMod')
  };

  if (!isPlaying) {
    Object.values(rows).forEach(r => {
      if (r) r.classList.remove('row-active-spotlight', 'narration-highlight');
    });
    return;
  }

  // Whisper ASR timestamps for New_Day4Part1audio02.mp3 (33.58s):
  // 4.18s - 9.84s : Plus sign addition
  // 9.84s - 15.18s: Minus sign subtraction
  // 15.18s - 21.14s: Asterisk multiplication
  // 21.14s - 26.64s: Forward slash division
  // 26.64s - 33.58s: Percent sign modulo
  if (rows.add) rows.add.classList.toggle('row-active-spotlight', currentTime >= 4.18 && currentTime < 9.84);
  if (rows.sub) rows.sub.classList.toggle('row-active-spotlight', currentTime >= 9.84 && currentTime < 15.18);
  if (rows.mul) rows.mul.classList.toggle('row-active-spotlight', currentTime >= 15.18 && currentTime < 21.14);
  if (rows.div) rows.div.classList.toggle('row-active-spotlight', currentTime >= 21.14 && currentTime < 26.64);
  if (rows.mod) rows.mod.classList.toggle('row-active-spotlight', currentTime >= 26.64 && currentTime <= 33.60);
}

function updateDay04ArithCodeHighlights(currentTime, isPlaying) {
  const q1 = document.getElementById('arithCodeQuery1');
  const q2 = document.getElementById('arithCodeQuery2');
  if (!q1 || !q2) return;

  if (!isPlaying) {
    [q1, q2].forEach(el => el.classList.remove('narration-highlight', 'code-active-spotlight'));
    return;
  }

  // Whisper ASR timestamps for New_Day4Part1audio03.mp3 (16.44s):
  // 0.00s - 10.40s: Query 1 (Monthly pay & bonus)
  // 10.40s - 16.44s: Query 2 (Gross profit)
  const isQ1 = currentTime >= 0.00 && currentTime < 10.40;
  const isQ2 = currentTime >= 10.40 && currentTime <= 16.50;

  q1.classList.toggle('narration-highlight', isQ1);
  q1.classList.toggle('code-active-spotlight', isQ1);
  q2.classList.toggle('narration-highlight', isQ2);
  q2.classList.toggle('code-active-spotlight', isQ2);

  if (isQ1) narrationScrollToSubblock(q1);
  if (isQ2) narrationScrollToSubblock(q2);
}

function updateDay04PrecedenceTableHighlights(currentTime, isPlaying) {
  const rows = {
    r1: document.getElementById('precRow1'),
    r2: document.getElementById('precRow2'),
    r3: document.getElementById('precRow3'),
    r4: document.getElementById('precRow4'),
    r5: document.getElementById('precRow5'),
    r6: document.getElementById('precRow6'),
    r7: document.getElementById('precRow7')
  };

  if (!isPlaying) {
    Object.values(rows).forEach(r => {
      if (r) r.classList.remove('row-active-spotlight', 'narration-highlight');
    });
    return;
  }

  // Whisper ASR timestamps for New_Day4Part1audio06.mp3 (13.82s):
  // 2.58s - 4.64s : Parentheses (highest)
  // 4.64s - 8.24s : Multiplication, Division, Modulo
  // 8.24s - 11.20s: Addition, Subtraction, Comparisons
  // 11.20s - 13.82s: NOT, AND, OR
  if (rows.r1) rows.r1.classList.toggle('row-active-spotlight', currentTime >= 2.58 && currentTime < 4.64);
  if (rows.r2) rows.r2.classList.toggle('row-active-spotlight', currentTime >= 4.64 && currentTime < 8.24);
  if (rows.r3) rows.r3.classList.toggle('row-active-spotlight', currentTime >= 8.24 && currentTime < 9.70);
  if (rows.r4) rows.r4.classList.toggle('row-active-spotlight', currentTime >= 9.70 && currentTime < 11.20);
  if (rows.r5) rows.r5.classList.toggle('row-active-spotlight', currentTime >= 11.20 && currentTime < 12.00);
  if (rows.r6) rows.r6.classList.toggle('row-active-spotlight', currentTime >= 12.00 && currentTime < 12.80);
  if (rows.r7) rows.r7.classList.toggle('row-active-spotlight', currentTime >= 12.80 && currentTime <= 13.90);
}

function updateDay04PrecedenceCodeHighlights(currentTime, isPlaying) {
  const q1 = document.getElementById('precCodeQuery1');
  const q2 = document.getElementById('precCodeQuery2');
  if (!q1 || !q2) return;

  if (!isPlaying) {
    [q1, q2].forEach(el => el.classList.remove('narration-highlight', 'code-active-spotlight'));
    return;
  }

  // Whisper ASR timestamps for New_Day4Part1audio07.mp3 (15.29s):
  // 0.00s - 8.00s : Query 1 (Without parentheses)
  // 8.00s - 15.29s: Query 2 (With parentheses)
  const isQ1 = currentTime >= 0.00 && currentTime < 8.00;
  const isQ2 = currentTime >= 8.00 && currentTime <= 15.30;

  q1.classList.toggle('narration-highlight', isQ1);
  q1.classList.toggle('code-active-spotlight', isQ1);
  q2.classList.toggle('narration-highlight', isQ2);
  q2.classList.toggle('code-active-spotlight', isQ2);

  if (isQ1) narrationScrollToSubblock(q1);
  if (isQ2) narrationScrollToSubblock(q2);
}

function updateDay04AnyCardHighlight(isPlaying) {
  const card = document.getElementById('day04AnyCard');
  if (!card) return;
  card.classList.toggle('block-active-spotlight', isPlaying);
  if (isPlaying) narrationScrollToSubblock(card);
}

function updateDay04AllCardHighlight(isPlaying) {
  const card = document.getElementById('day04AllCard');
  if (!card) return;
  card.classList.toggle('block-active-spotlight', isPlaying);
  if (isPlaying) narrationScrollToSubblock(card);
}

function updateDay04EscapeCodeHighlights(currentTime, isPlaying) {
  const q1 = document.getElementById('escapeCodeQuery1');
  const q2 = document.getElementById('escapeCodeQuery2');
  const q3 = document.getElementById('escapeCodeQuery3');
  if (!q1 || !q2 || !q3) return;

  if (!isPlaying) {
    [q1, q2, q3].forEach(el => el.classList.remove('narration-highlight', 'code-active-spotlight'));
    return;
  }

  // Whisper ASR timestamps for New_Day4Part1audio15.mp3 (11.64s):
  // 0.00s - 6.50s : Query 1 (Literal %)
  // 6.50s - 9.50s : Query 2 (Literal _)
  // 9.50s - 11.64s: Query 3 (Leading space)
  const isQ1 = currentTime >= 0.00 && currentTime < 6.50;
  const isQ2 = currentTime >= 6.50 && currentTime < 9.50;
  const isQ3 = currentTime >= 9.50 && currentTime <= 11.70;

  q1.classList.toggle('narration-highlight', isQ1);
  q1.classList.toggle('code-active-spotlight', isQ1);
  q2.classList.toggle('narration-highlight', isQ2);
  q2.classList.toggle('code-active-spotlight', isQ2);
  q3.classList.toggle('narration-highlight', isQ3);
  q3.classList.toggle('code-active-spotlight', isQ3);

  if (isQ1) narrationScrollToSubblock(q1);
  if (isQ2) narrationScrollToSubblock(q2);
  if (isQ3) narrationScrollToSubblock(q3);
}

function updateDay04NullCodeHighlights(currentTime, isPlaying) {
  const q1 = document.getElementById('nullCodeQuery1');
  const q2 = document.getElementById('nullCodeQuery2');
  if (!q1 || !q2) return;

  if (!isPlaying) {
    [q1, q2].forEach(el => el.classList.remove('narration-highlight', 'code-active-spotlight'));
    return;
  }

  // Whisper ASR timestamps for New_Day4Part1audio18.mp3 (14.21s):
  // 0.00s - 8.20s : Query 1 (NULL propagation & COALESCE)
  // 8.20s - 14.21s: Query 2 (Filtering with OR IS NULL)
  const isQ1 = currentTime >= 0.00 && currentTime < 8.20;
  const isQ2 = currentTime >= 8.20 && currentTime <= 14.30;

  q1.classList.toggle('narration-highlight', isQ1);
  q1.classList.toggle('code-active-spotlight', isQ1);
  q2.classList.toggle('narration-highlight', isQ2);
  q2.classList.toggle('code-active-spotlight', isQ2);

  if (isQ1) narrationScrollToSubblock(q1);
  if (isQ2) narrationScrollToSubblock(q2);
}

function updateDay04ThreeValTableHighlights(currentTime, isPlaying) {
  const rows = {
    r1: document.getElementById('threeValRow1'),
    r2: document.getElementById('threeValRow2'),
    r3: document.getElementById('threeValRow3'),
    r4: document.getElementById('threeValRow4'),
    r5: document.getElementById('threeValRow5'),
    r6: document.getElementById('threeValRow6')
  };

  if (!isPlaying) {
    Object.values(rows).forEach(r => {
      if (r) r.classList.remove('row-active-spotlight', 'narration-highlight');
    });
    return;
  }

  // Whisper ASR timestamps for New_Day4Part1audio21.mp3 (11.26s):
  // 0.00s - 4.80s : Any comparison against NULL yields UNKNOWN (Rows 2, 3)
  // 4.80s - 11.26s: WHERE discards UNKNOWN results just like FALSE (Rows 4, 5, 6)
  const isP1 = currentTime >= 0.00 && currentTime < 4.80;
  const isP2 = currentTime >= 4.80 && currentTime <= 11.30;

  if (rows.r2) rows.r2.classList.toggle('row-active-spotlight', isP1);
  if (rows.r3) rows.r3.classList.toggle('row-active-spotlight', isP1);
  if (rows.r4) rows.r4.classList.toggle('row-active-spotlight', isP2);
  if (rows.r5) rows.r5.classList.toggle('row-active-spotlight', isP2);
  if (rows.r6) rows.r6.classList.toggle('row-active-spotlight', isP2);
}

function updateDay04NotInTrapCodeHighlights(currentTime, isPlaying) {
  const q1 = document.getElementById('notInTrapQuery1');
  const q2 = document.getElementById('notInTrapQuery2');
  if (!q1 || !q2) return;

  if (!isPlaying) {
    [q1, q2].forEach(el => el.classList.remove('narration-highlight', 'code-active-spotlight'));
    return;
  }

  // Whisper ASR timestamps for New_Day4Part1audio22.mp3 (10.97s):
  // 0.00s - 6.00s : Query 1 (NOT IN subquery trap)
  // 6.00s - 10.97s: Query 2 (NOT EXISTS alternative)
  const isQ1 = currentTime >= 0.00 && currentTime < 6.00;
  const isQ2 = currentTime >= 6.00 && currentTime <= 11.00;

  q1.classList.toggle('narration-highlight', isQ1);
  q1.classList.toggle('code-active-spotlight', isQ1);
  q2.classList.toggle('narration-highlight', isQ2);
  q2.classList.toggle('code-active-spotlight', isQ2);

  if (isQ1) narrationScrollToSubblock(q1);
  if (isQ2) narrationScrollToSubblock(q2);
}




// ══════════════════════════════════════════════════════════════════════
// DAY 05: AGGREGATE FUNCTIONS PROGRESSIVE NARRATION HIGHLIGHTS (WHISPER SYNC)
// ══════════════════════════════════════════════════════════════════════

function updateDay05AggTableHighlights(currentTime, isPlaying) {
  const rows = {
    r1: document.getElementById('day05AggRow1'),
    r2: document.getElementById('day05AggRow2'),
    r3: document.getElementById('day05AggRow3'),
    r4: document.getElementById('day05AggRow4'),
    r5: document.getElementById('day05AggRow5')
  };

  if (!isPlaying) {
    Object.values(rows).forEach(r => {
      if (r) r.classList.remove('row-active-spotlight', 'narration-highlight');
    });
    return;
  }

  // Calibrated Whisper ASR timestamps for New_Day5Part1audio02.mp3 (31.00s):
  // 2.74s -  8.48s : Row 1 (COUNT(*) - Total row count, counts ALL rows)
  // 8.48s - 13.62s : Row 2 (COUNT(col) - Populated rows, ignores NULLs)
  // 13.62s - 18.12s: Row 3 (SUM(col) - Total sum of column, ignores NULLs)
  // 18.12s - 24.24s: Row 4 (AVG(col) - Arithmetic mean, ignores NULLs in divisor)
  // 24.24s - 31.00s: Row 5 (MIN/MAX(col) - Smallest/Largest value, ignores NULLs)
  if (rows.r1) rows.r1.classList.toggle('row-active-spotlight', currentTime >= 2.74 && currentTime < 8.48);
  if (rows.r2) rows.r2.classList.toggle('row-active-spotlight', currentTime >= 8.48 && currentTime < 13.62);
  if (rows.r3) rows.r3.classList.toggle('row-active-spotlight', currentTime >= 13.62 && currentTime < 18.12);
  if (rows.r4) rows.r4.classList.toggle('row-active-spotlight', currentTime >= 18.12 && currentTime < 24.24);
  if (rows.r5) rows.r5.classList.toggle('row-active-spotlight', currentTime >= 24.24 && currentTime <= 31.00);
}

function updateDay05CountListHighlights(currentTime, isPlaying) {
  const items = {
    i1: document.getElementById('day05CountCard1'),
    i2: document.getElementById('day05CountCard2'),
    i3: document.getElementById('day05CountCard3')
  };

  if (!isPlaying) {
    Object.values(items).forEach(i => {
      if (i) i.classList.remove('narration-highlight', 'card-active-spotlight');
    });
    return;
  }

  // Calibrated Whisper ASR timestamps for New_Day5Part1audio04.mp3 (19.94s):
  // 3.66s -  8.26s : Card 1 (COUNT(*) - Volume: How many total records exist?)
  // 8.26s - 13.66s : Card 2 (COUNT(col) - Completeness: How many rows have a value?)
  // 13.66s - 19.94s: Card 3 (COUNT(DISTINCT col) - Unique Entities: How many unique?)
  const isC1 = currentTime >= 3.66 && currentTime < 8.26;
  const isC2 = currentTime >= 8.26 && currentTime < 13.66;
  const isC3 = currentTime >= 13.66 && currentTime <= 20.00;

  if (items.i1) {
    items.i1.classList.toggle('narration-highlight', isC1);
    items.i1.classList.toggle('card-active-spotlight', isC1);
  }
  if (items.i2) {
    items.i2.classList.toggle('narration-highlight', isC2);
    items.i2.classList.toggle('card-active-spotlight', isC2);
  }
  if (items.i3) {
    items.i3.classList.toggle('narration-highlight', isC3);
    items.i3.classList.toggle('card-active-spotlight', isC3);
  }
}

function updateDay05CountCodeHighlights(currentTime, isPlaying) {
  const q1 = document.getElementById('day05CountQuery1');
  const q2 = document.getElementById('day05CountQuery2');
  const q3 = document.getElementById('day05CountQuery3');
  if (!q1 || !q2 || !q3) return;

  if (!isPlaying) {
    [q1, q2, q3].forEach(el => el.classList.remove('narration-highlight', 'code-active-spotlight'));
    return;
  }

  // Calibrated Whisper ASR timestamps for New_Day5Part1audio05.mp3 (29.70s):
  // 2.56s - 11.56s: Query 1 (Total headcount)
  // 11.56s - 21.34s: Query 2 (Staff with commissions)
  // 21.34s - 29.70s: Query 3 (Unique departments)
  const isQ1 = currentTime >= 2.56 && currentTime < 11.56;
  const isQ2 = currentTime >= 11.56 && currentTime < 21.34;
  const isQ3 = currentTime >= 21.34 && currentTime <= 29.70;

  q1.classList.toggle('narration-highlight', isQ1);
  q1.classList.toggle('code-active-spotlight', isQ1);
  q2.classList.toggle('narration-highlight', isQ2);
  q2.classList.toggle('code-active-spotlight', isQ2);
  q3.classList.toggle('narration-highlight', isQ3);
  q3.classList.toggle('code-active-spotlight', isQ3);

  if (isQ1) narrationScrollToSubblock(q1);
  if (isQ2) narrationScrollToSubblock(q2);
  if (isQ3) narrationScrollToSubblock(q3);
}

function updateDay05SumAvgCodeHighlights(currentTime, isPlaying) {
  const q1 = document.getElementById('day05SumAvgQuery1');
  const q2 = document.getElementById('day05SumAvgQuery2');
  const q3 = document.getElementById('day05SumAvgQuery3');
  if (!q1 || !q2 || !q3) return;

  if (!isPlaying) {
    [q1, q2, q3].forEach(el => el.classList.remove('narration-highlight', 'code-active-spotlight'));
    return;
  }

  // Calibrated Whisper ASR timestamps for New_Day5Part1audio08.mp3 (26.74s):
  // 2.96s - 10.76s: Query 1 (Full summary stats)
  // 10.76s - 18.18s: Query 2 (Commission earners only)
  // 18.18s - 26.74s: Query 3 (All staff with COALESCE)
  const isQ1 = currentTime >= 2.96 && currentTime < 10.76;
  const isQ2 = currentTime >= 10.76 && currentTime < 18.18;
  const isQ3 = currentTime >= 18.18 && currentTime <= 26.74;

  q1.classList.toggle('narration-highlight', isQ1);
  q1.classList.toggle('code-active-spotlight', isQ1);
  q2.classList.toggle('narration-highlight', isQ2);
  q2.classList.toggle('code-active-spotlight', isQ2);
  q3.classList.toggle('narration-highlight', isQ3);
  q3.classList.toggle('code-active-spotlight', isQ3);

  if (isQ1) narrationScrollToSubblock(q1);
  if (isQ2) narrationScrollToSubblock(q2);
  if (isQ3) narrationScrollToSubblock(q3);
}

function updateDay05CoalesceCodeHighlights(currentTime, isPlaying) {
  const q1 = document.getElementById('day05CoalesceQuery1');
  const q2 = document.getElementById('day05CoalesceQuery2');
  if (!q1 || !q2) return;

  if (!isPlaying) {
    [q1, q2].forEach(el => el.classList.remove('narration-highlight', 'code-active-spotlight'));
    return;
  }

  // Calibrated Whisper ASR timestamps for New_Day5Part1audio11.mp3 (20.80s):
  // 1.50s - 10.84s: Query 1 (Pattern A Inside)
  // 10.84s - 20.80s: Query 2 (Pattern B Outside)
  const isQ1 = currentTime >= 1.50 && currentTime < 10.84;
  const isQ2 = currentTime >= 10.84 && currentTime <= 20.80;

  q1.classList.toggle('narration-highlight', isQ1);
  q1.classList.toggle('code-active-spotlight', isQ1);
  q2.classList.toggle('narration-highlight', isQ2);
  q2.classList.toggle('code-active-spotlight', isQ2);

  if (isQ1) narrationScrollToSubblock(q1);
  if (isQ2) narrationScrollToSubblock(q2);
}

function updateDay05MinMaxListHighlights(currentTime, isPlaying) {
  const items = {
    i1: document.getElementById('day05MinMaxCard1'),
    i2: document.getElementById('day05MinMaxCard2'),
    i3: document.getElementById('day05MinMaxCard3')
  };

  if (!isPlaying) {
    Object.values(items).forEach(i => {
      if (i) i.classList.remove('narration-highlight', 'card-active-spotlight');
    });
    return;
  }

  // Calibrated Whisper ASR timestamps for New_Day5Part1audio13.mp3 (18.20s):
  // 6.80s - 10.04s: Card 1 (Numeric - Smallest and largest amounts)
  // 10.04s - 15.66s: Card 2 (Dates - Earliest and most recent date)
  // 15.66s - 18.20s: Card 3 (Strings - Alphabetical first and last)
  const isC1 = currentTime >= 6.80 && currentTime < 10.04;
  const isC2 = currentTime >= 10.04 && currentTime < 15.66;
  const isC3 = currentTime >= 15.66 && currentTime <= 18.20;

  if (items.i1) {
    items.i1.classList.toggle('narration-highlight', isC1);
    items.i1.classList.toggle('card-active-spotlight', isC1);
  }
  if (items.i2) {
    items.i2.classList.toggle('narration-highlight', isC2);
    items.i2.classList.toggle('card-active-spotlight', isC2);
  }
  if (items.i3) {
    items.i3.classList.toggle('narration-highlight', isC3);
    items.i3.classList.toggle('card-active-spotlight', isC3);
  }
}

function updateDay05MinMaxCodeHighlights(currentTime, isPlaying) {
  const q1 = document.getElementById('day05MinMaxQuery1');
  const q2 = document.getElementById('day05MinMaxQuery2');
  const q3 = document.getElementById('day05MinMaxQuery3');
  if (!q1 || !q2 || !q3) return;

  if (!isPlaying) {
    [q1, q2, q3].forEach(el => el.classList.remove('narration-highlight', 'code-active-spotlight'));
    return;
  }

  // Calibrated Whisper ASR timestamps for New_Day5Part1audio14.mp3 (19.74s):
  // 1.56s -  7.84s: Query 1 (Numbers: Price boundaries)
  // 7.84s - 14.40s: Query 2 (Dates: Tenure range)
  // 14.40s - 19.74s: Query 3 (Strings: Alphabetical boundaries)
  const isQ1 = currentTime >= 1.56 && currentTime < 7.84;
  const isQ2 = currentTime >= 7.84 && currentTime < 14.40;
  const isQ3 = currentTime >= 14.40 && currentTime <= 19.80;

  q1.classList.toggle('narration-highlight', isQ1);
  q1.classList.toggle('code-active-spotlight', isQ1);
  q2.classList.toggle('narration-highlight', isQ2);
  q2.classList.toggle('code-active-spotlight', isQ2);
  q3.classList.toggle('narration-highlight', isQ3);
  q3.classList.toggle('code-active-spotlight', isQ3);

  if (isQ1) narrationScrollToSubblock(q1);
  if (isQ2) narrationScrollToSubblock(q2);
  if (isQ3) narrationScrollToSubblock(q3);
}

function updateDay05NullTableHighlights(currentTime, isPlaying) {
  const rows = {
    r1: document.getElementById('day05NullRow1'),
    r2: document.getElementById('day05NullRow2'),
    r3: document.getElementById('day05NullRow3'),
    r4: document.getElementById('day05NullRow4'),
    r5: document.getElementById('day05NullRow5'),
    r6: document.getElementById('day05NullRow6')
  };

  if (!isPlaying) {
    Object.values(rows).forEach(r => {
      if (r) r.classList.remove('row-active-spotlight', 'narration-highlight');
    });
    return;
  }

  // Calibrated Whisper ASR timestamps for New_Day5Part1audio20.mp3 (31.34s):
  // 2.94s -  8.00s: Row 1 (15 rows, 4 NULLs -> COUNT(*) = 15)
  // 8.00s - 11.20s: Row 2 (15 rows, 4 NULLs -> COUNT(col) = 11)
  // 11.20s - 16.42s: Row 3 (15 rows, 4 NULLs -> AVG = SUM / 11)
  // 16.42s - 22.16s: Row 4 (All NULLs -> SUM/AVG = NULL)
  // 22.16s - 26.62s: Row 5 (0 rows -> COUNT(*) = 0)
  // 26.62s - 31.34s: Row 6 (0 rows -> SUM/AVG = NULL)
  if (rows.r1) rows.r1.classList.toggle('row-active-spotlight', currentTime >= 2.94 && currentTime < 8.00);
  if (rows.r2) rows.r2.classList.toggle('row-active-spotlight', currentTime >= 8.00 && currentTime < 11.20);
  if (rows.r3) rows.r3.classList.toggle('row-active-spotlight', currentTime >= 11.20 && currentTime < 16.42);
  if (rows.r4) rows.r4.classList.toggle('row-active-spotlight', currentTime >= 16.42 && currentTime < 22.16);
  if (rows.r5) rows.r5.classList.toggle('row-active-spotlight', currentTime >= 22.16 && currentTime < 26.62);
  if (rows.r6) rows.r6.classList.toggle('row-active-spotlight', currentTime >= 26.62 && currentTime <= 31.40);
}

// ═══════════════════════════════════════════════════════════════════════════════
// ║  GLOBAL TRACK VISUAL HIGHLIGHTS DISPATCHER                               ║
// ═══════════════════════════════════════════════════════════════════════════════

function dispatchTrackVisualHighlights(track, currentTime, isPlaying) {
  if (!track || !track.src) return;
  const src = track.src;

  // Day 01 Highlights
  if (typeof updateDay01Audio01Highlights === 'function' && src.includes('New_Day1Part1audio01.mp3')) updateDay01Audio01Highlights(currentTime, isPlaying);
  if (typeof updateDay01Audio03Highlights === 'function' && src.includes('New_Day1Part1audio03.mp3')) updateDay01Audio03Highlights(currentTime, isPlaying);
  if (typeof updateDay01CoreEntitiesHighlights === 'function' && (
      src.includes('New_Day1Part1audio04.mp3') || 
      src.includes('New_Day1Part1audio07.mp3') || 
      src.includes('New_Day1Part1audio06.mp3') || 
      src.includes('New_Day1Part1audio05.mp3') || 
      src.includes('New_Day1Part1audio08.mp3'))) updateDay01CoreEntitiesHighlights(isPlaying ? track.target : null, isPlaying);
  if (typeof updateDay01SqlSubLanguagesHighlights === 'function' && (
      src.includes('New_Day1Part1audio16.mp3') || 
      src.includes('New_Day1Part1audio17.mp3') || 
      src.includes('New_Day1Part1audio18.mp3') || 
      src.includes('New_Day1Part1audio19.mp3') || 
      src.includes('New_Day1Part1audio20.mp3') || 
      src.includes('New_Day1Part1audio21.mp3'))) updateDay01SqlSubLanguagesHighlights(isPlaying ? track.target : null, isPlaying);

  // Day 01 Topic 02 Spotlights & Animations
  if (typeof updateDay01Topic02Spotlights === 'function') updateDay01Topic02Spotlights(isPlaying ? track.target : null, isPlaying);
  if (typeof updateDay01Topic02StorageCards === 'function') {
    if (src.includes('New_Day1Part2audio02.mp3')) updateDay01Topic02StorageCards(currentTime, isPlaying, 'audio02');
    if (src.includes('New_Day1Part2audio03.mp3')) updateDay01Topic02StorageCards(currentTime, isPlaying, 'audio03');
    if (src.includes('New_Day1Part2audio03(new).mp3')) updateDay01Topic02StorageCards(currentTime, isPlaying, 'audio03new');
  }
  if (typeof updateDay01Topic02Pipeline === 'function') {
    if (src.includes('New_Day1Part2audio04.mp3')) updateDay01Topic02Pipeline(currentTime, isPlaying, 'audio04');
    if (src.includes('New_Day1Part2audio05.mp3')) updateDay01Topic02Pipeline(currentTime, isPlaying, 'audio05');
    if (src.includes('New_Day1Part2audio06.mp3')) updateDay01Topic02Pipeline(currentTime, isPlaying, 'audio06');
    if (src.includes('New_Day1Part2audio07.mp3')) updateDay01Topic02Pipeline(currentTime, isPlaying, 'audio07');
  }
  if (typeof updateDay01Topic02ColumnarCards === 'function') {
    if (src.includes('New_Day1Part2audio17.mp3')) updateDay01Topic02ColumnarCards(currentTime, isPlaying, 'audio17');
    if (src.includes('New_Day1Part2audio18(new).mp3')) updateDay01Topic02ColumnarCards(currentTime, isPlaying, 'audio18new');
    if (src.includes('New_Day1Part2audio18.mp3')) updateDay01Topic02ColumnarCards(currentTime, isPlaying, 'audio18');
  }

  // Day 03 Highlights
  if (typeof updateWhereCodeHighlights === 'function' && src.includes('New_Day3Part1audio02.mp3')) updateWhereCodeHighlights(currentTime, isPlaying);
  if (typeof updateTableHighlights === 'function' && src.includes('New_Day3Part1audio05.mp3')) updateTableHighlights(currentTime, isPlaying);
  if (typeof updateCompCodeHighlights === 'function' && src.includes('New_Day3Part1audio06.mp3')) updateCompCodeHighlights(currentTime, isPlaying);
  if (typeof updateIntroHighlight === 'function' && src.includes('New_Day3Part1audio07.mp3')) updateIntroHighlight(currentTime, isPlaying);
  if (typeof updateNotCardHighlight === 'function' && src.includes('New_Day3Part1audio08.mp3')) updateNotCardHighlight(currentTime, isPlaying);
  if (typeof updateAndCardHighlight === 'function' && src.includes('New_Day3Part1audio09.mp3')) updateAndCardHighlight(currentTime, isPlaying);
  if (typeof updateOrCardHighlight === 'function' && src.includes('New_Day3Part1audio10.mp3')) updateOrCardHighlight(currentTime, isPlaying);
  if (typeof updatePrecedenceNoteHighlight === 'function' && src.includes('New_Day3Part1audio11.mp3')) updatePrecedenceNoteHighlight(currentTime, isPlaying);
  if (typeof updateLogicCodeHighlights === 'function' && src.includes('New_Day3Part1audio12.mp3')) updateLogicCodeHighlights(currentTime, isPlaying);
  if (typeof updateBetweenCodeHighlights === 'function' && src.includes('New_Day3Part1audio15.mp3')) updateBetweenCodeHighlights(currentTime, isPlaying);
  if (typeof updateInCodeHighlights === 'function' && src.includes('New_Day3Part1audio19.mp3')) updateInCodeHighlights(currentTime, isPlaying);
  if (typeof updateLikeCodeHighlights === 'function' && src.includes('New_Day3Part1audio24.mp3')) updateLikeCodeHighlights(currentTime, isPlaying);
  if (typeof updateNullCodeHighlights === 'function' && src.includes('New_Day3Part1audio27.mp3')) updateNullCodeHighlights(currentTime, isPlaying);

  // Day 04 Highlights
  if (typeof updateDay04ArithTableHighlights === 'function' && src.includes('New_Day4Part1audio02.mp3')) updateDay04ArithTableHighlights(currentTime, isPlaying);
  if (typeof updateDay04ArithCodeHighlights === 'function' && src.includes('New_Day4Part1audio03.mp3')) updateDay04ArithCodeHighlights(currentTime, isPlaying);
  if (typeof updateDay04PrecedenceTableHighlights === 'function' && src.includes('New_Day4Part1audio06.mp3')) updateDay04PrecedenceTableHighlights(currentTime, isPlaying);
  if (typeof updateDay04PrecedenceCodeHighlights === 'function' && src.includes('New_Day4Part1audio07.mp3')) updateDay04PrecedenceCodeHighlights(currentTime, isPlaying);
  if (typeof updateDay04AnyCardHighlight === 'function' && src.includes('New_Day4Part1audio10.mp3')) updateDay04AnyCardHighlight(isPlaying);
  if (typeof updateDay04AllCardHighlight === 'function' && src.includes('New_Day4Part1audio11.mp3')) updateDay04AllCardHighlight(isPlaying);
  if (typeof updateDay04EscapeCodeHighlights === 'function' && src.includes('New_Day4Part1audio15.mp3')) updateDay04EscapeCodeHighlights(currentTime, isPlaying);
  if (typeof updateDay04NullCodeHighlights === 'function' && src.includes('New_Day4Part1audio18.mp3')) updateDay04NullCodeHighlights(currentTime, isPlaying);
  if (typeof updateDay04ThreeValTableHighlights === 'function' && src.includes('New_Day4Part1audio21.mp3')) updateDay04ThreeValTableHighlights(currentTime, isPlaying);
  if (typeof updateDay04NotInTrapCodeHighlights === 'function' && src.includes('New_Day4Part1audio22.mp3')) updateDay04NotInTrapCodeHighlights(currentTime, isPlaying);

  // Day 05 Highlights
  if (typeof updateDay05AggTableHighlights === 'function' && src.includes('New_Day5Part1audio02.mp3')) updateDay05AggTableHighlights(currentTime, isPlaying);
  if (typeof updateDay05CountListHighlights === 'function' && src.includes('New_Day5Part1audio04.mp3')) updateDay05CountListHighlights(currentTime, isPlaying);
  if (typeof updateDay05CountCodeHighlights === 'function' && src.includes('New_Day5Part1audio05.mp3')) updateDay05CountCodeHighlights(currentTime, isPlaying);
  if (typeof updateDay05SumAvgCodeHighlights === 'function' && src.includes('New_Day5Part1audio08.mp3')) updateDay05SumAvgCodeHighlights(currentTime, isPlaying);
  if (typeof updateDay05CoalesceCodeHighlights === 'function' && src.includes('New_Day5Part1audio11.mp3')) updateDay05CoalesceCodeHighlights(currentTime, isPlaying);
  if (typeof updateDay05MinMaxListHighlights === 'function' && src.includes('New_Day5Part1audio13.mp3')) updateDay05MinMaxListHighlights(currentTime, isPlaying);
  if (typeof updateDay05MinMaxCodeHighlights === 'function' && src.includes('New_Day5Part1audio14.mp3')) updateDay05MinMaxCodeHighlights(currentTime, isPlaying);
  if (typeof updateDay05NullTableHighlights === 'function' && src.includes('New_Day5Part1audio20.mp3')) updateDay05NullTableHighlights(currentTime, isPlaying);
}

// ═══════════════════════════════════════════════════════════════════════════════
// ║  AUDIO TIMELINE, SCRUBBING & PLAYBACK ENGINE (PORTED FROM PROVEN ENGINE)   ║
// ═══════════════════════════════════════════════════════════════════════════════

function loadAndPlayTrack(index, targetTime = 0) {
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

  // Trigger audio.play() synchronously inside gesture stack before async ticks
  audio.play()
    .then(() => {
      if (myGeneration !== currentGeneration) return;
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
      if (myGeneration !== currentGeneration) return;
      console.log('Play rejected:', err);
      if (err.name === 'AbortError') {
        // Interrupted by new seek or track swap — normal browser behavior
        return;
      }
      if (audio.error) {
        retryOrShowError(index, myGeneration, 'network');
      } else if (!hasCompletedFirstGestureBoundPlay) {
        showTapToPlayFallback(index);
      } else {
        setTimeout(() => {
          if (myGeneration === currentGeneration && activeAudioInstance) {
            activeAudioInstance.play().catch(e => console.log('Retry play failed:', e));
          }
        }, 150);
      }
    });

  // Load events in background without blocking audio.play gesture context
  let trackEvents = null;
  loadTrackEvents(trackId).then(ev => { trackEvents = ev; }).catch(() => {});



  audio.addEventListener('ended', () => {
    if (myGeneration !== currentGeneration) return;
    dispatchTrackVisualHighlights(track, 0, false);
    onNarrationSegmentEnded(index, trackEvents);
  });

  audio.addEventListener('pause', () => {
    if (myGeneration !== currentGeneration) return;
    dispatchTrackVisualHighlights(track, 0, false);
  });

  audio.addEventListener('timeupdate', () => {
    if (myGeneration !== currentGeneration) return;
    dispatchTrackVisualHighlights(track, audio.currentTime, !audio.paused);

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
    const solEntry = (typeof getSolutionEntry === 'function' ? getSolutionEntry(track.qId) : null) ||
                     (questionSolutionMap && questionSolutionMap[currentDay] ? questionSolutionMap[currentDay][track.qId] : null);
    if (solEntry) {
      startAudioSyncedTypewriter(audio, solEntry);
    }
    setMobileTab('practice');
  } else if (track.type === 'completion') {
    isNarrationActive = false;
    if (typeof clearSlidePlaybackVisibility === 'function') clearSlidePlaybackVisibility();
    const bar = document.getElementById('questionBar');
    if (bar) bar.classList.remove('question-playing');
    setMobileTab('theory');
    launchCompletionAnimation(audio, targetTime);
  } else {
    isNarrationActive = true;
    const bar = document.getElementById('questionBar');
    if (bar) bar.classList.remove('question-playing');
    scrollToTarget(track.target);
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
  if (IS_GUEST_REEL || (!isPaidUser() && !isAdminUser() && currentDay !== 'day01' && currentDay !== 'day02')) {
    showGuestPaywallModal('video & voice narration');
    return;
  }
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
  const dur = totalCombinedDuration > 0 ? totalCombinedDuration : 100;
  if (seekBar) {
    seekBar.max = dur;
    if (!isDragging) {
      seekBar.value = currentCombinedTime;
    }
    const val = isDragging ? parseFloat(seekBar.value) : currentCombinedTime;
    const fillPct = Math.max(0, Math.min(100, (val / dur) * 100));
    seekBar.style.background = `linear-gradient(to right, #ef4444 0%, #ff4d4d ${fillPct}%, rgba(255, 255, 255, 0.15) ${fillPct}%)`;
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

  // In 'single' playback mode (e.g. user clicked individual Q or solution play button), stop cleanly without cascading
  if (playbackMode === 'single') {
    currentGeneration++; // Immediately invalidate any pending retries or error events
    if (activeAudioInstance) {
      const a = activeAudioInstance;
      activeAudioInstance = null;
      try { a.pause(); } catch (e) { }
      a.src = "";
    }
    isCombinedPlaying = false;
    isNarrationActive = false;
    playbackMode = 'master';
    updatePlayButtonStates(false);
    if (typeof updateAllPlayButtonStates === 'function') updateAllPlayButtonStates(false);
    cancelTypewriter();
    if (typeof clearSlidePlaybackVisibility === 'function') clearSlidePlaybackVisibility();
    const bar = document.getElementById('questionBar');
    if (bar) bar.classList.remove('question-playing');
    return;
  }

  if (combinedTrackIndex < combinedTracks.length - 1) {
    combinedTrackIndex++;
    loadAndPlayTrack(combinedTrackIndex);
  } else {
    // All tracks complete across Day 01 through Day 18 — clean stop, zero infinite loop!
    currentGeneration++; // Immediately invalidate any pending retries or error events
    if (activeAudioInstance) {
      const a = activeAudioInstance;
      activeAudioInstance = null;
      try { a.pause(); } catch (e) { }
      a.src = "";
    }
    isCombinedPlaying = false;
    isNarrationActive = false;
    playbackMode = 'master';
    combinedTrackIndex = 0;
    currentCombinedTime = 0;
    updatePlayButtonStates(false);
    if (typeof updateAllPlayButtonStates === 'function') updateAllPlayButtonStates(false);
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

function seekCombinedPlayback(val, shouldPlay = true) {
  const targetTime = parseFloat(val);
  currentCombinedTime = targetTime;

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
      localOffset = Math.max(0, dur - 0.1);
    }
  }

  const track = combinedTracks[trackIdx];

  // 1. INSTANT SYNCHRONOUS SCENE TRANSITION (Zero latency DOM visual directing)
  if (track) {
    if (track.type === 'question' || track.type === 'solution') {
      teardownCompletionAnimation();
      const targetQIdx = COURSE_CONFIG.practiceQuestions ? COURSE_CONFIG.practiceQuestions.findIndex(q => q.id === track.qId) : -1;
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
          startAudioSyncedTypewriter({ currentTime: localOffset, paused: !isCombinedPlaying }, solEntry);
        }
      }
    } else if (track.type === 'completion') {
      if (!completionOverlayDiv || !completionScene) {
        launchCompletionAnimation();
      }
    } else {
      teardownCompletionAnimation();
      const bar = document.getElementById('questionBar');
      if (bar) bar.classList.remove('question-playing');
      setMobileTab('theory');
      if (track.target) {
        scrollToTarget(track.target, true);
      }
    }
  }

  // 2. AUDIO TRACK RESOLUTION & PLAYBACK
  if (shouldPlay) {
    if (combinedTrackIndex !== trackIdx || !activeAudioInstance) {
      loadAndPlayTrack(trackIdx, localOffset);
    } else {
      try {
        activeAudioInstance.currentTime = localOffset;
      } catch (e) { }

      if (track && track.type === 'solution') {
        const solMap = questionSolutionMap[currentDay] || questionSolutionMap['day01'];
        const solEntry = solMap ? solMap[track.qId] : null;
        if (solEntry) {
          startAudioSyncedTypewriter(activeAudioInstance, solEntry);
        }
      }

      if (!isCombinedPlaying) {
        activeAudioInstance.play().then(() => {
          isCombinedPlaying = true;
          updatePlayButtonStates(true);
        }).catch(() => {});
      }
    }
  }

  updateProgressUI();
  if (typeof updateChapterListActive === 'function') updateChapterListActive();
}

function scrollToTarget(selector, isSeek = true) {
  if (typeof isCombinedPlaying !== 'undefined' && isCombinedPlaying) {
    if (typeof updateSlidePlaybackVisibility === 'function') updateSlidePlaybackVisibility(selector, isSeek);
  } else {
    if (typeof clearSlidePlaybackVisibility === 'function') clearSlidePlaybackVisibility();
  }

  const subLangTracks = ['#sqlSubLanguages', '#subLangDql', '#subLangDml', '#subLangDdl', '#subLangTcl', '#subLangDcl'];
  const coreEntitiesTracks = ['#coreEntities', '#entityDatabase', '#entityTable', '#entityColumn', '#entityRow'];

  // For Sub-Languages Table: Keep table 100% stationary and fixed in place during narration!
  if (subLangTracks.includes(selector)) {
    const container = document.getElementById('slideContent') || document.getElementById('slideBodyText');
    if (selector === '#sqlSubLanguages' && container) {
      container.scrollTo({ top: 0, behavior: isSeek ? 'auto' : 'smooth' });
    }
    return;
  }

  // For Core Entities Table: Keep table 100% stationary and fixed in place during narration!
  if (coreEntitiesTracks.includes(selector)) {
    const container = document.getElementById('slideContent') || document.getElementById('slideBodyText');
    if (selector === '#coreEntities' && container) {
      container.scrollTo({ top: 0, behavior: isSeek ? 'auto' : 'smooth' });
    }
    return;
  }

  // For Interview Q&A Cards: Keep box at top and bypass individual question scrolling
  if (selector.startsWith('#iq')) {
    const container = document.getElementById('slideContent') || document.getElementById('slideBodyText');
    if (container) {
      container.scrollTo({ top: 0, behavior: isSeek ? 'auto' : 'smooth' });
    }
    return;
  }

  const container = document.getElementById('slideContent');
  const targetEl = container ? container.querySelector(selector) : null;
  if (targetEl && container) {
    if (targetEl.closest('.interview-box')) {
      container.scrollTo({ top: 0, behavior: isSeek ? 'auto' : 'smooth' });
      return;
    }
    const blockToScroll = typeof getVisibilityBlock === 'function' ? getVisibilityBlock(targetEl, container) : targetEl;
    const containerRect = container.getBoundingClientRect();
    const targetRect = blockToScroll.getBoundingClientRect();
    const relativeTop = targetRect.top - containerRect.top + container.scrollTop;
    container.scrollTo({
      top: Math.max(0, relativeTop - 26),
      behavior: isSeek ? 'auto' : 'smooth'
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
      currentPlayingAudio.ontimeupdate = () => {
        if (src.includes('New_Day1Part1audio01.mp3')) updateDay01Audio01Highlights(currentPlayingAudio.currentTime, !currentPlayingAudio.paused);
        if (src.includes('New_Day1Part1audio03.mp3')) updateDay01Audio03Highlights(currentPlayingAudio.currentTime, !currentPlayingAudio.paused);
        if (src.includes('New_Day1Part1audio04.mp3') || 
            src.includes('New_Day1Part1audio07.mp3') || 
            src.includes('New_Day1Part1audio06.mp3') || 
            src.includes('New_Day1Part1audio05.mp3') || 
            src.includes('New_Day1Part1audio08.mp3')) updateDay01CoreEntitiesHighlights(src, !currentPlayingAudio.paused);
        if (src.includes('New_Day1Part1audio16.mp3') || 
            src.includes('New_Day1Part1audio17.mp3') || 
            src.includes('New_Day1Part1audio18.mp3') || 
            src.includes('New_Day1Part1audio19.mp3') || 
            src.includes('New_Day1Part1audio20.mp3') || 
            src.includes('New_Day1Part1audio21.mp3')) updateDay01SqlSubLanguagesHighlights(src, !currentPlayingAudio.paused);
      };
      currentPlayingAudio.onpause = () => {
        if (src.includes('New_Day1Part1audio01.mp3')) updateDay01Audio01Highlights(0, false);
        if (src.includes('New_Day1Part1audio03.mp3')) updateDay01Audio03Highlights(0, false);
        if (src.includes('New_Day1Part1audio04.mp3') || 
            src.includes('New_Day1Part1audio07.mp3') || 
            src.includes('New_Day1Part1audio06.mp3') || 
            src.includes('New_Day1Part1audio05.mp3') || 
            src.includes('New_Day1Part1audio08.mp3')) updateDay01CoreEntitiesHighlights(null, false);
        if (src.includes('New_Day1Part1audio16.mp3') || 
            src.includes('New_Day1Part1audio17.mp3') || 
            src.includes('New_Day1Part1audio18.mp3') || 
            src.includes('New_Day1Part1audio19.mp3') || 
            src.includes('New_Day1Part1audio20.mp3') || 
            src.includes('New_Day1Part1audio21.mp3')) updateDay01SqlSubLanguagesHighlights(null, false);
      };
      currentPlayingBtn = btn;
      currentPlayingAudio.play();
      btn.innerHTML = `<svg class="pause-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`;
      btn.classList.add('playing');
      currentPlayingAudio.onended = () => {
        if (src.includes('New_Day1Part1audio01.mp3')) updateDay01Audio01Highlights(0, false);
        if (src.includes('New_Day1Part1audio03.mp3')) updateDay01Audio03Highlights(0, false);
        if (src.includes('New_Day1Part1audio04.mp3') || 
            src.includes('New_Day1Part1audio07.mp3') || 
            src.includes('New_Day1Part1audio06.mp3') || 
            src.includes('New_Day1Part1audio05.mp3') || 
            src.includes('New_Day1Part1audio08.mp3')) updateDay01CoreEntitiesHighlights(null, false);
        if (src.includes('New_Day1Part1audio16.mp3') || 
            src.includes('New_Day1Part1audio17.mp3') || 
            src.includes('New_Day1Part1audio18.mp3') || 
            src.includes('New_Day1Part1audio19.mp3') || 
            src.includes('New_Day1Part1audio20.mp3') || 
            src.includes('New_Day1Part1audio21.mp3')) updateDay01SqlSubLanguagesHighlights(null, false);
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

function syncCombinedToTrack(srcFilename) {
  const idx = combinedTracks.findIndex(t => t.src === srcFilename);
  if (idx === -1) return null;
  loadAndPlayTrack(idx);
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
      seekBar.oninput = null;
      seekBar.removeAttribute('oninput');
      seekBar.addEventListener('mousedown', () => { isScrubbing = true; });
      seekBar.addEventListener('touchstart', () => { isScrubbing = true; });
      seekBar.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value);
        const dur = totalCombinedDuration > 0 ? totalCombinedDuration : 100;
        const fillPct = Math.max(0, Math.min(100, (val / dur) * 100));
        seekBar.style.background = `linear-gradient(to right, #ef4444 0%, #ff4d4d ${fillPct}%, rgba(255, 255, 255, 0.15) ${fillPct}%)`;
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

  const timelineRow = document.querySelector('.playback-timeline-row');
  if (timelineRow && !timelineRow.dataset.clickBound) {
    timelineRow.dataset.clickBound = 'true';
    const tooltip = document.getElementById('timelineHoverTooltip');

    timelineRow.addEventListener('mousemove', (e) => {
      const rect = timelineRow.getBoundingClientRect();
      if (rect.width <= 0) return;
      const clickX = e.clientX - rect.left;
      const pct = Math.max(0, Math.min(1, clickX / rect.width));
      const hoverTime = pct * (totalCombinedDuration || 100);
      if (tooltip) {
        tooltip.textContent = formatTime(hoverTime);
        tooltip.style.left = `${clickX}px`;
        tooltip.classList.add('active');
      }
    });

    timelineRow.addEventListener('mouseleave', () => {
      if (tooltip) tooltip.classList.remove('active');
    });

    timelineRow.addEventListener('click', async (e) => {
      const rect = timelineRow.getBoundingClientRect();
      if (rect.width <= 0) return;
      const clickX = e.clientX - rect.left;
      const pct = Math.max(0, Math.min(1, clickX / rect.width));
      const targetTime = pct * (totalCombinedDuration || 100);
      const sb = document.getElementById('seekBar');
      if (sb) {
        sb.value = targetTime;
        const fillPct = Math.max(0, Math.min(100, pct * 100));
        sb.style.background = `linear-gradient(to right, #ef4444 0%, #ff4d4d ${fillPct}%, rgba(255, 255, 255, 0.15) ${fillPct}%)`;
      }
      seekCombinedPlayback(targetTime);
    });
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
  const typeIcons = { narration: '▶', question: '❓', solution: '✅', completion: '🏆' };
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
      <span class="chapter-item__title">${track.title || track.src.split('/').pop().replace('.mp3', '')}</span>`;
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      seekCombinedPlayback(elapsed);
      if (!isCombinedPlaying) playCombinedPlayback();
      listEl.style.display = 'none';
    });
    listEl.appendChild(item);
    elapsed += dur;
  });
}

function updateChapterListActive() {
  const listEl = document.getElementById('chapterList');
  if (listEl) {
    listEl.querySelectorAll('.chapter-item').forEach(item => {
      item.classList.toggle('active', parseInt(item.dataset.idx, 10) === combinedTrackIndex);
    });
  }
  const titleEl = document.getElementById('activeChapterTitle');
  if (titleEl && typeof combinedTracks !== 'undefined' && combinedTracks[combinedTrackIndex]) {
    titleEl.textContent = combinedTracks[combinedTrackIndex].title || 'In this lesson';
  }
}

function toggleChapterList(e) {
  if (e && e.stopPropagation) e.stopPropagation();
  const listEl = document.getElementById('chapterList');
  const btn = document.getElementById('chapterPillBtn') || document.getElementById('chaptersBtn');
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

// Global outside-click listener to close chapter list popover
document.addEventListener('click', (e) => {
  const listEl = document.getElementById('chapterList');
  const pillBtn = document.getElementById('chapterPillBtn');
  if (listEl && listEl.style.display !== 'none') {
    if (!listEl.contains(e.target) && (!pillBtn || !pillBtn.contains(e.target))) {
      listEl.style.display = 'none';
    }
  }
});

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
  const equalizerHtml = `<span class="audio-wave-equalizer" aria-hidden="true"><span></span><span></span><span></span></span>`;

  const navBtn = document.getElementById('navPlayBtn');
  if (navBtn) {
    if (isPlaying) {
      navBtn.innerHTML = `${equalizerHtml} <span class="btn-icon" aria-hidden="true">⏸</span> <span class="btn-text">Pause Lesson</span>`;
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
      playPauseBtn.innerHTML = `${equalizerHtml} <span class="btn-icon" aria-hidden="true">⏸</span> <span class="btn-text">Pause Lesson</span>`;
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

  const captionEl = document.getElementById('workspaceVpCaption');
  if (captionEl) {
    captionEl.classList.toggle('narration-active', isPlaying);
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
    const subLangTracks = ['#sqlSubLanguages', '#subLangDql', '#subLangDml', '#subLangDdl', '#subLangTcl', '#subLangDcl'];
    const coreEntitiesTracks = ['#coreEntities', '#entityDatabase', '#entityTable', '#entityColumn', '#entityRow'];

    if (activeTrack && activeTrack.target && !subLangTracks.includes(activeTrack.target) && !coreEntitiesTracks.includes(activeTrack.target)) {
      const container = document.getElementById('slideContent');
      const targetEl = container ? container.querySelector(activeTrack.target) : null;
      if (targetEl && container) {
        const blockToScroll = typeof getVisibilityBlock === 'function' ? getVisibilityBlock(targetEl, container) : targetEl;
        const containerRect = container.getBoundingClientRect();
        const targetRect = blockToScroll.getBoundingClientRect();
        const relativeTop = targetRect.top - containerRect.top + container.scrollTop;
        container.scrollTo({
          top: Math.max(0, relativeTop - 26),
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
    container.querySelectorAll('.section-hidden, .vis-target-hidden, .vis-target-dimmed, .narration-spotlight-active, .active-section-mounted, .stunning-section-entry, .instant-display, .row-active-spotlight, .card-active-spotlight, .block-active-spotlight, .subblock-scrolled-out').forEach(el => {
      el.classList.remove('section-hidden', 'vis-target-hidden', 'vis-target-dimmed', 'narration-spotlight-active', 'active-section-mounted', 'stunning-section-entry', 'instant-display', 'row-active-spotlight', 'card-active-spotlight', 'block-active-spotlight', 'subblock-scrolled-out');
      // Also clear any legacy inline styles from previous runs
      el.style.display = '';
      el.style.opacity = '';
    });
    // Sweep remaining inline styles left by older runs
    container.querySelectorAll('[style]').forEach(el => {
      el.style.display = '';
      el.style.opacity = '';
    });
    // Ensure all interview question cards are restored to visible when paused
    container.querySelectorAll('.interview-box > div').forEach(card => {
      card.classList.remove('vis-target-hidden');
      card.style.display = '';
    });
  });

  if (typeof updateDay01CoreEntitiesHighlights === 'function') {
    updateDay01CoreEntitiesHighlights(null, false);
  }
  if (typeof updateDay01SqlSubLanguagesHighlights === 'function') {
    updateDay01SqlSubLanguagesHighlights(null, false);
  }
}

/**
 * Given a target element (the element with the track's ID), walk UP the DOM
 * to find the logical visual block that should be shown/hidden as a unit.
 * e.g. a <div id="entityDatabase"> inside a <td> should hide the entire <tr>.
 */
function getVisibilityBlock(targetElement, sectionBoundary) {
  // If targetElement is within a .slide-section, return that section so headings are never cropped
  const section = targetElement.closest('.slide-section');
  if (section && (!sectionBoundary || sectionBoundary.contains(section))) return section;

  // If the target is inside a table row, hide the whole row
  const tr = targetElement.closest('tr');
  if (tr && (!sectionBoundary || sectionBoundary.contains(tr))) return tr;

  // If the target is inside a comparison card (.vs-card), hide the whole card
  const vsCard = targetElement.closest('.vs-card');
  if (vsCard && (!sectionBoundary || sectionBoundary.contains(vsCard))) return vsCard;

  // For standalone blocks, return the element itself
  return targetElement;
}

// P2 #15: Class-based updateSlidePlaybackVisibility
function updateSlidePlaybackVisibility(targetSelector, isSeek = false) {
  const containers = [
    document.getElementById('slideBodyText'),
    document.getElementById('presentSlideContent')
  ].filter(Boolean);

  containers.forEach(container => {
    container.classList.add('playback-active');

    // 1. Clear previous sub-element spotlight highlights and scrolled-out cards
    container.querySelectorAll('.narration-spotlight-active, .row-active-spotlight, .card-active-spotlight, .block-active-spotlight, .subblock-scrolled-out').forEach(el => {
      el.classList.remove('narration-spotlight-active', 'row-active-spotlight', 'card-active-spotlight', 'block-active-spotlight', 'subblock-scrolled-out');
    });

    // 2. Find the target element inside this container
    const targetEl = container.querySelector(targetSelector);
    if (!targetEl) return;

    // 3. Find the active section wrapper (.slide-section) that contains targetEl
    const activeSection = targetEl.closest('.slide-section');
    if (!activeSection) {
      container.querySelectorAll('.slide-section').forEach(s => s.classList.remove('section-hidden'));
      return;
    }

    // 4. Check if activeSection is ALREADY active and mounted
    const isAlreadyActiveSection = !activeSection.classList.contains('section-hidden') && 
                                   activeSection.classList.contains('active-section-mounted');

    if (!isAlreadyActiveSection) {
      // Hide all non-active slide-sections and remove mounted flag
      container.querySelectorAll('.slide-section').forEach(section => {
        if (section !== activeSection) {
          section.classList.add('section-hidden');
          section.classList.remove('stunning-section-entry', 'active-section-mounted', 'instant-display');
        } else {
          section.classList.remove('section-hidden');
          section.classList.add('active-section-mounted');
          if (isSeek) {
            section.classList.add('instant-display');
            section.classList.remove('stunning-section-entry');
          } else {
            section.classList.remove('instant-display');
            section.classList.add('stunning-section-entry');
          }
        }
      });

      // Ensure all elements inside activeSection are fully visible
      activeSection.querySelectorAll('.vis-target-hidden').forEach(el => {
        el.classList.remove('vis-target-hidden');
        el.style.display = '';
      });

      // Reset container scroll position to top ONLY when entering a NEW section!
      container.scrollTop = 0;
    }

    // Keep H2 at the top always visible
    const h2 = container.querySelector('h2');
    if (h2) h2.classList.remove('section-hidden', 'vis-target-hidden');

    // 5. If target is inside an .interview-box, show ONLY the active question card and hide all other sibling cards
    const interviewBox = targetEl.closest('.interview-box');
    if (interviewBox) {
      const activeQCard = targetEl.closest('.interview-box > div') || targetEl;
      interviewBox.querySelectorAll('.interview-box > div').forEach(card => {
        if (card === activeQCard) {
          card.classList.remove('vis-target-hidden');
          card.style.display = '';
        } else {
          card.classList.add('vis-target-hidden');
          card.style.display = 'none';
        }
      });
      const h4 = interviewBox.querySelector('h4');
      if (h4) {
        h4.classList.remove('vis-target-hidden');
        h4.style.display = '';
      }
    } else {
      activeSection.querySelectorAll('.interview-box > div').forEach(card => {
        card.classList.remove('vis-target-hidden');
        card.style.display = '';
      });
    }

    // 6. Highlight active target row / card / Q&A block without shifting layout
    const targetRow = targetEl.closest('tr');
    const targetCard = targetEl.closest('.vs-card, .info-card');
    const targetIQ = targetEl.closest('#iqReferentialIntegrity, #iqSqlVsNosql, #iqCompositePk, #parentTableDept');

    if (targetRow) {
      targetRow.classList.add('row-active-spotlight');
    } else if (targetCard) {
      targetCard.classList.add('card-active-spotlight');
    } else if (targetIQ) {
      targetIQ.classList.add('block-active-spotlight');
    } else if (targetEl) {
      targetEl.classList.add('narration-spotlight-active');
    }

    // 7. Trigger specific audio visual sync handlers
    if (typeof updateDay01CoreEntitiesHighlights === 'function') {
      updateDay01CoreEntitiesHighlights(targetSelector, true);
    }
    if (typeof updateDay01SqlSubLanguagesHighlights === 'function') {
      updateDay01SqlSubLanguagesHighlights(targetSelector, true);
    }
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
