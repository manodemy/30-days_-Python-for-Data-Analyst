/**
 * Manodemy Intelligence Suite — Telemetry Engine v3
 * Market-standard visit & engagement tracking.
 *
 * VISIT COUNTING LOGIC (GA4-style):
 *   - A "visit" = one session. Session resets after 30 min of inactivity.
 *   - Every page load within the same session shares the same session_id.
 *   - Sessions are stored in sessionStorage (NOT localStorage), so:
 *       * New browser tab = new session
 *       * Incognito window = new session
 *       * Closing & reopening browser = new session
 *
 * TIME SPENT LOGIC (Market-standard):
 *   - Active time only — pauses when tab is hidden (visibilitychange).
 *   - Tracks active_seconds accurately using periodic heartbeats every 30s.
 *   - Final flush on page unload using fetch keepalive.
 *   - Minimum 5s engagement threshold to filter accidental flickers.
 */
(function () {
  if (window.ManodemyTelemetry) return; // Already initialized

  // ── Constants ───────────────────────────────────────────────────────────────
  const SESSION_TIMEOUT_MS = 30 * 60 * 1000; // 30 min inactivity = new session
  const HEARTBEAT_INTERVAL_MS = 30 * 1000;   // Heartbeat every 30s
  const MIN_ENGAGEMENT_SECS = 5;             // Ignore < 5s sessions

  // ── Session Management (GA4-style) ─────────────────────────────────────────
  // Use sessionStorage so each browser tab/window gets its own session.
  // A new session_id is minted if none exists or if the last activity was > 30 min ago.
  function getOrCreateSession() {
    const now = Date.now();
    let sid = sessionStorage.getItem('mano_sid');
    const lastActivity = parseInt(sessionStorage.getItem('mano_last_activity') || '0', 10);

    // New session if: no ID, or last activity was > 30 min ago
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
    _activeStart: null,       // Timestamp when tab became active
    _totalActiveSecs: 0,      // Accumulated active seconds this page
    _heartbeatTimer: null,
    _flushed: false,

    // ── Init ──────────────────────────────────────────────────────────────────
    init: async function () {
      if (!window.MANODEMY_CONFIG || !window.MANODEMY_CONFIG.SUPA_URL) {
        console.warn('[Telemetry] MANODEMY_CONFIG missing. Disabled.');
        return;
      }

      // Reuse existing Supabase client or create a new one
      this.sb = window.sb || supabase.createClient(
        window.MANODEMY_CONFIG.SUPA_URL,
        window.MANODEMY_CONFIG.SUPA_KEY
      );

      // Get session ID
      this.sessionId = getOrCreateSession();

      // Get logged-in user (if any)
      try {
        const { data: { session } } = await this.sb.auth.getSession();
        this.userId = session?.user?.id || null;
      } catch (e) {
        this.userId = null;
      }

      // Track this page view
      await this._trackPageView();

      // Start active time tracking
      this._startActiveTimer();

      // Pause/resume timer on tab visibility changes
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
          this._pauseActiveTimer();
          this._flushSession(false); // Flush with keepalive on hide
        } else {
          this._resumeActiveTimer();
        }
      });

      // Final flush on unload
      window.addEventListener('pagehide', () => this._flushSession(true));
      window.addEventListener('beforeunload', () => this._flushSession(true));

      console.log(`[Telemetry] ✅ Initialized | Session: ${this.sessionId} | User: ${this.userId || 'anon'}`);
    },

    // ── Page View ─────────────────────────────────────────────────────────────
    // Records one row per page visit. Both anonymous and logged-in users are captured.
    _trackPageView: async function () {
      try {
        const pageCount = parseInt(sessionStorage.getItem('mano_session_page_count') || '0', 10);
        sessionStorage.setItem('mano_session_page_count', String(pageCount + 1));

        // IMPORTANT: Only include user_id when logged in.
        // Sending user_id: null explicitly causes PostgREST RLS to reject the insert.
        const payload = {
          session_id: this.sessionId,
          page_url: window.location.pathname,
          referrer: document.referrer || null,
          country: null
        };
        if (this.userId) {
          payload.user_id = this.userId;
        }

        const { error } = await this.sb.from('page_views').insert([payload]);

        if (error) {
          console.warn('[Telemetry] ⚠️ Page View insert failed:', error.message);
        } else {
          console.log(`[Telemetry] ✅ Page View → ${window.location.pathname}`);
        }
      } catch (e) {
        console.warn('[Telemetry] ⚠️ Page View exception:', e.message);
      }
    },

    // ── Active Timer ──────────────────────────────────────────────────────────
    _startActiveTimer: function () {
      if (document.visibilityState !== 'hidden') {
        this._activeStart = Date.now();
      }

      // Heartbeat: write accumulated active time to DB every 30s
      this._heartbeatTimer = setInterval(() => {
        this._accumulateActive();
        if (this.userId && this._totalActiveSecs > 0) {
          // Also sync the Active Focus localStorage timer (set by notebook.js every 5s)
          // so admin panel always shows the latest client-side time.
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
        this._activeStart = Date.now(); // Reset anchor
      }
    },

    // ── Session Flush ─────────────────────────────────────────────────────────
    // Records total active time at end of page. Called on hide/unload.
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
          active_seconds: finalSecs  // included for RPC compatibility
        }
      };

      // Use fetch keepalive for reliability on page unload
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
      }).catch(() => {});

      console.log(`[Telemetry] ✅ Session flush | Active: ${this._totalActiveSecs}s`);
    },

    // ── Helper: Write activity log via Supabase client ─────────────────────────
    _writeActivityLog: async function (eventType, metadata) {
      if (!this.userId || !this.sb) return;
      try {
        await this.sb.from('activity_logs').insert([{
          user_id: this.userId,
          event_type: eventType,
          page_url: window.location.pathname,
          metadata: metadata
        }]);
      } catch (e) { /* silent */ }
    },

    // ── Helper: Get current Supabase access token ──────────────────────────────
    _getAccessToken: function () {
      // Try to read from localStorage (Supabase stores it there)
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

  // Boot when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => T.init());
  } else {
    T.init();
  }
})();
