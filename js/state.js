const STORAGE_KEY = 'lamrim_study_state';

const ACHIEVEMENT_LEVELS = [
  { name: '初发心', threshold: 0 },
  { name: '资粮位', threshold: 100 },
  { name: '加行位', threshold: 300 },
  { name: '见道位', threshold: 600 },
  { name: '修道位', threshold: 1200 },
  { name: '究竟位', threshold: 2400 },
];

const POINTS_HISTORY_LIMIT = 50;
const EXAM_UNLOCK_THRESHOLD = 0.6;

function getDefaultState() {
  return {
    progress: {},
    points: 0,
    pointsHistory: [],
    examRecords: [],
    wrongQuestions: [],
    chapterUnlockStatus: {},
    studySessions: [],
    dailyCheckins: [],
    currentSession: null,
  };
}

function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function weekKey(dateStr) {
  const d = new Date(dateStr);
  const start = new Date(d);
  start.setDate(d.getDate() - d.getDay());
  return `${start.getFullYear()}-${String(start.getMonth() + 1).padStart(2, '0')}-${String(start.getDate()).padStart(2, '0')}`;
}

function monthKey(dateStr) {
  return dateStr.substring(0, 7);
}

class StudyState {
  constructor() {
    this._state = getDefaultState();
    this._listeners = [];
    this._load();
  }

  // 暴露 state 的只读访问
  get state() {
    return this._state;
  }

  // ── Progress ──────────────────────────────────────────

  setProgress(nodeId, status) {
    if (!['locked', 'studying', 'completed'].includes(status)) {
      throw new Error(`Invalid progress status: ${status}`);
    }
    this._state.progress[nodeId] = status;
    this._notify();
    this._save();
  }

  getProgress(nodeId) {
    return this._state.progress[nodeId] || 'locked';
  }

  getOverallProgress() {
    const entries = Object.entries(this._state.progress);
    if (entries.length === 0) return 0;
    const completed = entries.filter(([, s]) => s === 'completed').length;
    return Math.round((completed / entries.length) * 100);
  }

  // ── Points ────────────────────────────────────────────

  addPoints(amount, reason) {
    this._state.points += amount;
    this._state.pointsHistory.unshift({
      amount,
      reason,
      date: new Date().toISOString(),
    });
    if (this._state.pointsHistory.length > POINTS_HISTORY_LIMIT) {
      this._state.pointsHistory.length = POINTS_HISTORY_LIMIT;
    }
    this._notify();
    this._save();
  }

  getPoints() {
    return this._state.points;
  }

  getLevel() {
    let current = ACHIEVEMENT_LEVELS[0];
    for (const level of ACHIEVEMENT_LEVELS) {
      if (this._state.points >= level.threshold) {
        current = level;
      }
    }
    const nextIndex = ACHIEVEMENT_LEVELS.indexOf(current) + 1;
    const next = nextIndex < ACHIEVEMENT_LEVELS.length
      ? ACHIEVEMENT_LEVELS[nextIndex]
      : null;
    return {
      name: current.name,
      threshold: current.threshold,
      points: this._state.points,
      nextLevel: next ? next.name : null,
      nextThreshold: next ? next.threshold : null,
      progress: next
        ? Math.min(1, (this._state.points - current.threshold) / (next.threshold - current.threshold))
        : 1,
    };
  }

  // ── Exam ──────────────────────────────────────────────

  recordExamResult(chapterId, score, correct, total, time) {
    this._state.examRecords.unshift({
      chapterId,
      score,
      correct,
      total,
      time,
      date: new Date().toISOString(),
    });
    // Update chapter unlock status based on score percentage
    const pct = total > 0 ? correct / total : 0;
    this._state.chapterUnlockStatus[chapterId] = pct >= EXAM_UNLOCK_THRESHOLD;
    this._notify();
    this._save();
  }

  getExamRecords() {
    return this._state.examRecords;
  }

  addWrongQuestion(chapterId, questionId) {
    const exists = this._state.wrongQuestions.some(
      (w) => w.chapterId === chapterId && w.questionId === questionId,
    );
    if (!exists) {
      this._state.wrongQuestions.push({ chapterId, questionId });
      this._notify();
      this._save();
    }
  }

  removeWrongQuestion(chapterId, questionId) {
    this._state.wrongQuestions = this._state.wrongQuestions.filter(
      (w) => w.chapterId !== chapterId || w.questionId !== questionId,
    );
    this._notify();
    this._save();
  }

  getWrongQuestions() {
    return this._state.wrongQuestions;
  }

  isChapterUnlocked(chapterId) {
    // Chapter 0 or first chapter is always unlocked
    if (chapterId === 0 || chapterId === '0' || chapterId === '1') return true;
    // Check if previous chapter passed the threshold
    const prevId = String(Number(chapterId) - 1);
    const passed = this._state.chapterUnlockStatus[prevId];
    if (passed === undefined) {
      // If no record for previous chapter, check if it was studied/completed
      const prevProgress = this._state.progress[prevId];
      return prevProgress === 'completed';
    }
    return passed;
  }

  // ── Study Time ────────────────────────────────────────

  startStudySession() {
    this._state.currentSession = {
      startTime: Date.now(),
      date: todayKey(),
    };
    this._notify();
    this._save();
  }

  endStudySession() {
    if (!this._state.currentSession) return;
    const duration = Math.round((Date.now() - this._state.currentSession.startTime) / 1000);
    const session = {
      date: this._state.currentSession.date,
      duration,
      startTime: this._state.currentSession.startTime,
      endTime: Date.now(),
    };
    this._state.studySessions.unshift(session);
    this._state.currentSession = null;
    this._notify();
    this._save();
  }

  getStudyStats() {
    const sessions = this._state.studySessions;
    const today = todayKey();

    // Current session duration (if active)
    let currentDuration = 0;
    if (this._state.currentSession) {
      currentDuration = Math.round((Date.now() - this._state.currentSession.startTime) / 1000);
    }

    const daily = {};
    const weekly = {};
    const monthly = {};

    // Include current session in today's count
    const todaySeconds = sessions
      .filter((s) => s.date === today)
      .reduce((sum, s) => sum + s.duration, 0) + currentDuration;

    for (const s of sessions) {
      const wk = weekKey(s.date);
      const mk = monthKey(s.date);
      daily[s.date] = (daily[s.date] || 0) + s.duration;
      weekly[wk] = (weekly[wk] || 0) + s.duration;
      monthly[mk] = (monthly[mk] || 0) + s.duration;
    }

    // Add current session to aggregation
    if (currentDuration > 0) {
      daily[today] = todaySeconds;
      weekly[weekKey(today)] = (weekly[weekKey(today)] || 0) + currentDuration;
      monthly[monthKey(today)] = (monthly[monthKey(today)] || 0) + currentDuration;
    }

    return {
      today: todaySeconds,
      week: weekly[weekKey(today)] || 0,
      month: monthly[monthKey(today)] || 0,
      daily,
      weekly,
      monthly,
    };
  }

  // ── Daily Checkin ─────────────────────────────────────

  checkin() {
    const key = todayKey();
    const exists = this._state.dailyCheckins.includes(key);
    if (!exists) {
      this._state.dailyCheckins.push(key);
      this.addPoints(5, '每日打卡');
      this._notify();
      this._save();
    }
    return !exists;
  }

  hasCheckedInToday() {
    return this._state.dailyCheckins.includes(todayKey());
  }

  getCheckinDates() {
    return this._state.dailyCheckins;
  }

  // ── Persistence ───────────────────────────────────────

  _save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this._state));
    } catch (e) {
      // localStorage may be unavailable or quota exceeded
      console.warn('StudyState: failed to save to localStorage', e);
    }
  }

  _load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        // Merge with defaults to handle missing fields from older versions
        const defaults = getDefaultState();
        this._state = { ...defaults, ...parsed };
        // Ensure nested objects are properly merged
        for (const key of Object.keys(defaults)) {
          if (
            typeof defaults[key] === 'object' &&
            !Array.isArray(defaults[key]) &&
            defaults[key] !== null
          ) {
            this._state[key] = { ...defaults[key], ...(parsed[key] || {}) };
          }
        }
      }
    } catch (e) {
      console.warn('StudyState: failed to load from localStorage', e);
      this._state = getDefaultState();
    }
  }

  reset() {
    this._state = getDefaultState();
    this._notify();
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn('StudyState: failed to clear localStorage', e);
    }
  }

  // ── Listener ──────────────────────────────────────────

  onChange(listener) {
    if (typeof listener === 'function') {
      this._listeners.push(listener);
    }
  }

  offChange(listener) {
    this._listeners = this._listeners.filter((l) => l !== listener);
  }

  _notify() {
    for (const listener of this._listeners) {
      try {
        listener(this._state);
      } catch (e) {
        console.warn('StudyState: listener error', e);
      }
    }
  }
}

export default new StudyState();
