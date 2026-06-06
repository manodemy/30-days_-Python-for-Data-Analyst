/**
 * Manodemy Intelligence Suite — Telemetry Engine v3.1 (Resilient Offline Queue)
 * Market-standard visit & engagement tracking with offline queuing support.
 *
 * VISIT COUNTING LOGIC (GA4-style):
 *   - A "visit" = one session. Session resets after 30 min of inactivity.
 *   - Every page load within the same session shares the same session_id.
 *   - Sessions are stored in sessionStorage (NOT localStorage).
 *
 * TIME SPENT LOGIC (Market-standard):
 *   - Active time only — pauses when tab is hidden (visibilitychange).
 *   - Tracks active_seconds accurately using periodic heartbeats every 30s.
 *   - Final flush on page unload using fetch keepalive.
 */
(function () {
  if (window.ManodemyTelemetry) return; // Already initialized

  // ── Constants ───────────────────────────────────────────────────────────────
  const SESSION_TIMEOUT_MS = 30 * 60 * 1000; // 30 min inactivity = new session
  const HEARTBEAT_INTERVAL_MS = 30 * 1000;   // Heartbeat every 30s
  const MIN_ENGAGEMENT_SECS = 5;             // Ignore < 5s sessions
  const MAX_QUEUE_SIZE = 100;                // Max items in offline queue
  const DB_NAME = 'ManodemyTelemetryDB';
  const STORE_NAME = 'telemetry_queue';
  const LS_KEY = 'manodemy_telemetry_queue';

  // ── IndexedDB Helpers ───────────────────────────────────────────────────────
  function openDB() {
    return new Promise((resolve, reject) => {
      if (!window.indexedDB) {
        reject(new Error('IndexedDB not supported'));
        return;
      }
      const request = indexedDB.open(DB_NAME, 1);
      request.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
        }
      };
      request.onsuccess = (e) => resolve(e.target.result);
      request.onerror = (e) => reject(e.target.error);
    });
  }

  async function getQueueIndexedDB() {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async function pushQueueIndexedDB(item) {
    const db = await openDB();
    const current = await getQueueIndexedDB();
    if (current.length >= MAX_QUEUE_SIZE) {
      await deleteQueueIndexedDB(current[0].id);
    }
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.add(item);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async function deleteQueueIndexedDB(id) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(id);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  // ── LocalStorage Fallback Helpers ──────────────────────────────────────────
  function getQueueLocalStorage() {
    try {
      const str = localStorage.getItem(LS_KEY);
      return str ? JSON.parse(str) : [];
    } catch (e) {
      return [];
    }
  }

  function pushQueueLocalStorage(item) {
    try {
      const queue = getQueueLocalStorage();
      if (queue.length >= MAX_QUEUE_SIZE) {
        queue.shift(); // Remove oldest
      }
      item.id = Date.now() + Math.random();
      queue.push(item);
      localStorage.setItem(LS_KEY, JSON.stringify(queue));
    } catch (e) {}
  }

  function deleteQueueLocalStorage(id) {
    try {
      let queue = getQueueLocalStorage();
      queue = queue.filter(item => item.id !== id);
      localStorage.setItem(LS_KEY, JSON.stringify(queue));
    } catch (e) {}
  }

  // ── Queue Manager Module ──────────────────────────────────────────────────
  const QueueManager = {
    useLS: false,

    init: async function () {
      try {
        await openDB();
        this.useLS = false;
      } catch (e) {
        this.useLS = true;
        console.warn('[Telemetry] IndexedDB unavailable, using localStorage fallback.');
      }
    },

    getQueue: async function () {
      if (this.useLS) return getQueueLocalStorage();
      try {
        return await getQueueIndexedDB();
      } catch (e) {
        return getQueueLocalStorage();
      }
    },

    push: async function (table, payload) {
      const item = { table, payload, timestamp: Date.now() };
      if (this.useLS) {
        pushQueueLocalStorage(item);
      } else {
        try {
          await pushQueueIndexedDB(item);
        } catch (e) {
          pushQueueLocalStorage(item);
        }
      }
    },

    remove: async function (id) {
      if (this.useLS) {
        deleteQueueLocalStorage(id);
      } else {
        try {
          await deleteQueueIndexedDB(id);
        } catch (e) {
          deleteQueueLocalStorage(id);
        }
      }
    }
  };

  // ── Session Management (GA4-style) ─────────────────────────────────────────
  function getOrCreateSession() {
    const now = Date.now();
    let sid = sessionStorage.getItem('mano_sid');
    const lastActivity = parseInt(sessionStorage.getItem('mano_last_activity') || '0', 10);

    if (!sid || (now - lastActivity) > SESSION_TIMEOUT_MS) {
      sid = 'sess_' + now + '_' + Math.random().toString(36).substring(2, 10);
      sessionStorage.setItem('mano_sid', sid);
      sessionStorage.setItem('mano_session_page_count', '0');
    }
    sessionStorage.setItem('mano_last_activity', String(now));
    return sid;
  }

  // ── Core Engine ─────────────────────────────────────────────────────────────
  const T = window.ManodemyTelemetry = {
    sb: null,
    sessionId: null,
    userId: null,
    _activeStart: null,
    _totalActiveSecs: 0,
    _heartbeatTimer: null,
    _flushed: false,
    _flushing: false,
    _flushAttempt: 0,

    init: async function () {
      if (!window.MANODEMY_CONFIG || !window.MANODEMY_CONFIG.SUPA_URL) {
        console.warn('[Telemetry] MANODEMY_CONFIG missing. Disabled.');
        return;
      }

      this.sb = window.sb || supabase.createClient(
        window.MANODEMY_CONFIG.SUPA_URL,
        window.MANODEMY_CONFIG.SUPA_KEY
      );

      this.sessionId = getOrCreateSession();

      try {
        const { data: { session } } = await this.sb.auth.getSession();
        this.userId = session?.user?.id || null;
      } catch (e) {
        this.userId = null;
      }

      // Initialize queue and schedule sync
      await QueueManager.init();
      this.flushQueue();

      // Track current page view
      await this._trackPageView();

      this._startActiveTimer();

      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
          this._pauseActiveTimer();
          this._flushSession(false);
        } else {
          this._resumeActiveTimer();
        }
      });

      // Listen for online events to flush the queue
      window.addEventListener('online', () => this.flushQueue());

      window.addEventListener('pagehide', () => this._flushSession(true));
      window.addEventListener('beforeunload', () => this._flushSession(true));

      console.log(`[Telemetry] ✅ Initialized | Session: ${this.sessionId} | User: ${this.userId || 'anon'}`);
    },

    _trackPageView: async function () {
      const pageCount = parseInt(sessionStorage.getItem('mano_session_page_count') || '0', 10);
      sessionStorage.setItem('mano_session_page_count', String(pageCount + 1));

      const payload = {
        session_id: this.sessionId,
        page_url: window.location.pathname,
        referrer: document.referrer || null,
        country: null
      };
      if (this.userId) {
        payload.user_id = this.userId;
      }

      await this._queueOrSend('page_views', payload);
    },

    _startActiveTimer: function () {
      if (document.visibilityState !== 'hidden') {
        this._activeStart = Date.now();
      }

      this._heartbeatTimer = setInterval(() => {
        this._accumulateActive();
        if (this.userId && this._totalActiveSecs > 0) {
          const dayMatch = window.location.pathname.match(/day(\d{2})\.html/);
          const lsKey = dayMatch ? `manodemy_day${dayMatch[1]}_time_spent` : null;
          const lsSecs = lsKey ? parseInt(localStorage.getItem(lsKey) || '0', 10) : 0;
          const bestSecs = Math.max(this._totalActiveSecs, lsSecs);

          this._writeActivityLog('session_heartbeat', {
            session_id: this.sessionId,
            active_seconds: bestSecs,
            page_url: window.location.pathname
          });
        }
        sessionStorage.setItem('mano_last_activity', String(Date.now()));
      }, HEARTBEAT_INTERVAL_MS);
    },

    _pauseActiveTimer: function () {
      this._accumulateActive();
      this._activeStart = null;
    },

    _resumeActiveTimer: function () {
      this._activeStart = Date.now();
      sessionStorage.setItem('mano_last_activity', String(Date.now()));
    },

    _accumulateActive: function () {
      if (this._activeStart) {
        const elapsed = Math.round((Date.now() - this._activeStart) / 1000);
        this._totalActiveSecs += elapsed;
        this._activeStart = Date.now();
      }
    },

    _flushSession: function (useBeacon) {
      if (this._flushed || !this.userId) return;
      this._flushed = true;
      clearInterval(this._heartbeatTimer);

      this._accumulateActive();
      const dayMatch2 = window.location.pathname.match(/day(\d{2})\.html/);
      const lsKey2 = dayMatch2 ? `manodemy_day${dayMatch2[1]}_time_spent` : null;
      const lsTotal = lsKey2 ? parseInt(localStorage.getItem(lsKey2) || '0', 10) : 0;
      const finalSecs = Math.max(this._totalActiveSecs, lsTotal);

      if (finalSecs < MIN_ENGAGEMENT_SECS) return;

      const payload = {
        user_id: this.userId,
        event_type: 'session_end',
        page_url: window.location.pathname,
        metadata: {
          session_id: this.sessionId,
          duration_seconds: finalSecs,
          active_seconds: finalSecs
        }
      };

      if (!navigator.onLine) {
        pushQueueLocalStorage({ table: 'activity_logs', payload, timestamp: Date.now() });
        return;
      }

      fetch(`${window.MANODEMY_CONFIG.SUPA_URL}/rest/v1/activity_logs`, {
        method: 'POST',
        keepalive: true,
        headers: {
          'Content-Type': 'application/json',
          'apikey': window.MANODEMY_CONFIG.SUPA_KEY,
          'Authorization': `Bearer ${this._getAccessToken()}`,
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify(payload)
      }).catch(() => {
        pushQueueLocalStorage({ table: 'activity_logs', payload, timestamp: Date.now() });
      });

      console.log(`[Telemetry] ✅ Session flush | Active: ${this._totalActiveSecs}s`);
    },

    _writeActivityLog: async function (eventType, metadata) {
      if (!this.userId) return;
      const payload = {
        user_id: this.userId,
        event_type: eventType,
        page_url: window.location.pathname,
        metadata: metadata
      };
      await this._queueOrSend('activity_logs', payload);
    },

    _sendEventDirect: async function (table, payload) {
      if (!this.sb) return false;
      try {
        const { error } = await this.sb.from(table).insert([payload]);
        if (error) {
          console.warn(`[Telemetry] ⚠️ Direct send failed for ${table}:`, error.message);
          const status = error.status || 400;
          if (status >= 400 && status < 500) {
            return true; // Discard bad client requests or RLS violations (avoid infinite loops)
          }
          return false;
        }
        return true;
      } catch (e) {
        return false;
      }
    },

    _queueOrSend: async function (table, payload) {
      if (!payload.user_id && this.userId) {
        payload.user_id = this.userId;
      }

      if (!navigator.onLine) {
        console.log(`[Telemetry] 📥 Offline. Queued event for ${table}.`);
        await QueueManager.push(table, payload);
        return;
      }

      try {
        const success = await this._sendEventDirect(table, payload);
        if (!success) {
          console.log(`[Telemetry] 📥 Network issue. Queueing event for ${table}.`);
          await QueueManager.push(table, payload);
          this.flushQueue();
        } else {
          console.log(`[Telemetry] ✅ Event successfully sent directly to ${table}.`);
        }
      } catch (err) {
        console.log(`[Telemetry] 📥 Network exception. Queueing event for ${table}.`);
        await QueueManager.push(table, payload);
        this.flushQueue();
      }
    },

    flushQueue: async function () {
      if (this._flushing) return;
      if (!navigator.onLine) return;

      const queue = await QueueManager.getQueue();
      if (queue.length === 0) {
        this._flushAttempt = 0;
        return;
      }

      this._flushing = true;
      console.log(`[Telemetry] 🔄 Flushing ${queue.length} queued events...`);

      for (const item of queue) {
        try {
          const success = await this._sendEventDirect(item.table, item.payload);
          if (success) {
            await QueueManager.remove(item.id);
          } else {
            break; // Pause flush and retry later
          }
        } catch (err) {
          break;
        }
      }

      this._flushing = false;

      const remaining = await QueueManager.getQueue();
      if (remaining.length > 0) {
        this._flushAttempt++;
        const delay = Math.min(1000 * Math.pow(2, this._flushAttempt), 60000);
        console.log(`[Telemetry] Retrying queue flush in ${delay}ms`);
        setTimeout(() => this.flushQueue(), delay);
      } else {
        this._flushAttempt = 0;
        console.log('[Telemetry] ✅ All queued events successfully flushed.');
      }
    },

    _getAccessToken: function () {
      const storageKey = Object.keys(localStorage).find(k => k.includes('auth-token'));
      if (storageKey) {
        try {
          const parsed = JSON.parse(localStorage.getItem(storageKey));
          return parsed?.access_token || window.MANODEMY_CONFIG.SUPA_KEY;
        } catch (e) {}
      }
      return window.MANODEMY_CONFIG.SUPA_KEY;
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => T.init());
  } else {
    T.init();
  }
})();
