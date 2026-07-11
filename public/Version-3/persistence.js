// ═══════════════════════════════════════════════════════════════
// MANODEMY PROGRESS & PERSISTENCE MANAGER
// ═══════════════════════════════════════════════════════════════

(function() {
  'use strict';

  const STORAGE_KEY = 'manodemy_sql_v3_progress';

  const ProgressManager = {
    _data: null,

    // Load state from localStorage or return defaults
    load() {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        try {
          this._data = JSON.parse(raw);
        } catch (e) {
          console.error("Failed to parse progress data, resetting", e);
          this._data = this._defaults();
        }
      } else {
        this._data = this._defaults();
      }
      return this._data;
    },

    // Save state to localStorage
    save() {
      if (!this._data) this._data = this._defaults();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this._data));
    },

    // Default structure
    _defaults() {
      return {
        currentDay: 'day01',
        streakCount: 0,
        lastActiveDate: null,
        days: {} // Keyed by day01, day02...
      };
    },

    // Get stats for a specific day safely
    getDayProgress(dayId) {
      if (!this._data) this.load();
      if (!this._data.days[dayId]) {
        this._data.days[dayId] = {
          practiceAnswers: {}, // Keyed by Q-ID -> student query string
          solvedPractice: [], // Array of solved Q-IDs
          testAttempt: null,  // { startedAt, timeRemaining, answers: { q1: query... }, submitted: bool, score: int }
          bestScore: 0
        };
      }
      return this._data.days[dayId];
    },

    // Save practice answer
    savePracticeAnswer(dayId, qId, query, isSolved) {
      const p = this.getDayProgress(dayId);
      p.practiceAnswers[qId] = query;
      if (isSolved && !p.solvedPractice.includes(qId)) {
        p.solvedPractice.push(qId);
      }
      this.save();
    },

    // Save test state (answers, timer, status)
    saveTestAttempt(dayId, attempt) {
      const p = this.getDayProgress(dayId);
      p.testAttempt = attempt;
      if (attempt && attempt.submitted) {
        p.bestScore = Math.max(p.bestScore, attempt.score || 0);
      }
      this.save();
    },

    // Increment learning streak
    updateStreak() {
      const today = new Date().toISOString().slice(0, 10);
      if (this._data.lastActiveDate === today) return;

      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      if (this._data.lastActiveDate === yesterday) {
        this._data.streakCount += 1;
      } else {
        this._data.streakCount = 1;
      }
      this._data.lastActiveDate = today;
      this.save();
    },

    // Get progress stats for UI display
    getOverallStats() {
      if (!this._data) this.load();
      let completedDays = 0;
      let totalXP = 0;
      
      const dayIds = Object.keys(this._data.days);
      dayIds.forEach(dId => {
        const dp = this._data.days[dId];
        if (dp.bestScore >= 13) {
          completedDays++;
        }
        totalXP += (dp.solvedPractice.length * 10) + (dp.bestScore * 20);
      });

      return {
        completedDays,
        streak: this._data.streakCount,
        totalXP,
        currentDay: this._data.currentDay
      };
    }
  };

  // Attach to window namespace
  window.ProgressManager = ProgressManager;

})();
