/**
 * 积分成就系统模块
 * 展示积分、等级、成就徽章、积分历史
 */

import defaultState from '../state.js';

// ── 成就定义 ──────────────────────────────────────────

const ACHIEVEMENTS = [
  { id: 'level_0', name: '初发心', icon: '\u{1FAB7}', desc: '开始学习之旅', threshold: 0, type: 'points' },
  { id: 'level_100', name: '资粮位', icon: '\u{1F4DA}', desc: '累积100积分', threshold: 100, type: 'points' },
  { id: 'level_300', name: '加行位', icon: '\u26A1', desc: '累积300积分', threshold: 300, type: 'points' },
  { id: 'level_600', name: '见道位', icon: '\u{1F441}\uFE0F', desc: '累积600积分', threshold: 600, type: 'points' },
  { id: 'level_1200', name: '修道位', icon: '\u{1F6E4}\uFE0F', desc: '累积1200积分', threshold: 1200, type: 'points' },
  { id: 'level_2400', name: '究竟位', icon: '\u{1F31F}', desc: '累积2400积分', threshold: 2400, type: 'points' },
  { id: 'checkin_7', name: '坚持7天', icon: '\u{1F305}', desc: '连续打卡7天', threshold: 7, type: 'checkin_days' },
  { id: 'checkin_30', name: '坚持30天', icon: '\u{1F319}', desc: '连续打卡30天', threshold: 30, type: 'checkin_days' },
  { id: 'all_basics', name: '道前基础', icon: '\u{1F4D6}', desc: '完成全部道前基础', threshold: 1, type: 'custom' },
  { id: 'perfect_exam', name: '考试满分', icon: '\u{1F4AF}', desc: '一次考试获得满分', threshold: 1, type: 'custom' },
  { id: 'clear_wrong', name: '错题清零', icon: '\u{1F9F9}', desc: '错题本清零', threshold: 1, type: 'custom' },
];

// ── 工具函数 ──────────────────────────────────────────

function _getPoints() {
  try { return defaultState.getPoints(); } catch (e) { return 0; }
}

function _getLevel() {
  try { return defaultState.getLevel(); } catch (e) {
    return { name: '初发心', threshold: 0, points: 0, nextLevel: '资粮位', nextThreshold: 100, progress: 0 };
  }
}

function _getPointsHistory() {
  try { return defaultState._state?.pointsHistory || []; } catch (e) { return []; }
}

function _getCheckinDates() {
  try { return defaultState.getCheckinDates(); } catch (e) { return []; }
}

function _getExamRecords() {
  try { return defaultState.getExamRecords(); } catch (e) { return []; }
}

function _getWrongQuestions() {
  try { return defaultState.getWrongQuestions(); } catch (e) { return []; }
}

// ── 成就检测 ──────────────────────────────────────────

function _checkAchievements() {
  const points = _getPoints();
  const checkinDates = _getCheckinDates();
  const examRecords = _getExamRecords();
  const wrongQuestions = _getWrongQuestions();

  const unlocked = new Set();

  for (const ach of ACHIEVEMENTS) {
    let isUnlocked = false;

    switch (ach.type) {
      case 'points':
        isUnlocked = points >= ach.threshold;
        break;
      case 'checkin_days':
        isUnlocked = checkinDates.length >= ach.threshold;
        break;
      case 'custom':
        if (ach.id === 'perfect_exam') {
          isUnlocked = examRecords.some((r) => r.correct === r.total && r.total > 0);
        } else if (ach.id === 'clear_wrong') {
          isUnlocked = wrongQuestions.length === 0 && examRecords.length > 0;
        } else if (ach.id === 'all_basics') {
          // 检查道前基础6个子项是否完成（简化判断：有考试记录即为有进展）
          const basicsExams = examRecords.filter((r) =>
            r.chapterId && r.chapterId.startsWith('part2-4-')
          );
          isUnlocked = basicsExams.filter((r) => {
            const pct = r.total > 0 ? r.correct / r.total : 0;
            return pct >= 0.6;
          }).length >= 6;
        }
        break;
    }

    if (isUnlocked) unlocked.add(ach.id);
  }

  return unlocked;
}

// ── 导出入口 ──────────────────────────────────────────

export function renderPoints(container) {
  container.innerHTML = '';

  const pointsContainer = document.createElement('div');
  pointsContainer.className = 'points-container';

  const points = _getPoints();
  const level = _getLevel();
  const unlockedAchievements = _checkAchievements();

  // ── 积分头部 ────────────────────────────────────
  const nextDiff = level.nextThreshold ? level.nextThreshold - points : 0;

  pointsContainer.innerHTML += `
    <div class="points-header">
      <div class="points-total">${points}</div>
      <div class="points-label">当前积分</div>
      <div style="margin-top:12px;">
        <span style="font-size:18px;font-weight:600;color:var(--accent-gold);">${_escapeHtml(level.name)}</span>
      </div>
      ${level.nextLevel ? `
        <div style="margin-top:8px;">
          <div style="font-size:12px;color:var(--text-muted);margin-bottom:4px;">距下一级「${_escapeHtml(level.nextLevel)}」还差 ${nextDiff} 分</div>
          <div style="height:6px;background:var(--bg-secondary);border-radius:3px;overflow:hidden;max-width:300px;margin:0 auto;">
            <div style="height:100%;width:${Math.round(level.progress * 100)}%;background:var(--accent-gold);border-radius:3px;transition:width 0.3s;"></div>
          </div>
        </div>
      ` : '<div style="margin-top:8px;font-size:13px;color:var(--good);">已达最高等级！</div>'}
    </div>
  `;

  // ── 积分规则说明 ────────────────────────────────
  pointsContainer.innerHTML += `
    <div class="profile-section">
      <div class="profile-section-title">📋 积分获取规则</div>
      <div style="font-size:13px;color:var(--text-secondary);line-height:2;">
        <p>每日打卡 <strong style="color:var(--accent-gold);">+5分</strong></p>
        <p>考试正确率 ≥ 90% <strong style="color:var(--accent-gold);">+30分</strong></p>
        <p>考试正确率 ≥ 70% <strong style="color:var(--accent-gold);">+20分</strong></p>
        <p>考试正确率 ≥ 60% <strong style="color:var(--accent-gold);">+15分</strong></p>
        <p>考试正确率 &lt; 60% <strong style="color:var(--accent-gold);">+5分</strong>（参与奖）</p>
      </div>
    </div>
  `;

  // ── 成就徽章网格 ────────────────────────────────
  pointsContainer.innerHTML += `
    <div class="profile-section">
      <div class="profile-section-title">🏆 成就徽章</div>
      <div class="achievements-grid">
        ${ACHIEVEMENTS.map((ach) => {
          const isUnlocked = unlockedAchievements.has(ach.id);
          return `
            <div class="achievement-card ${isUnlocked ? 'unlocked' : 'locked'}">
              <div class="achievement-icon">${ach.icon}</div>
              <div class="achievement-name">${_escapeHtml(ach.name)}</div>
              <div class="achievement-desc">${_escapeHtml(ach.desc)}</div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;

  // ── 积分历史 ────────────────────────────────────
  const history = _getPointsHistory().slice(0, 20);

  pointsContainer.innerHTML += `
    <div class="profile-section">
      <div class="profile-section-title">📜 积分记录</div>
      ${history.length === 0
        ? '<p style="color:var(--text-muted);font-size:14px;">暂无积分记录</p>'
        : `<div style="display:flex;flex-direction:column;gap:8px;">
            ${history.map((h) => {
              const dateStr = h.date ? new Date(h.date).toLocaleDateString('zh-CN') : '';
              return `
                <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 12px;background:var(--bg-secondary);border-radius:var(--radius-sm);font-size:13px;">
                  <span style="color:var(--text-primary);">${_escapeHtml(h.reason || '')}</span>
                  <div style="text-align:right;">
                    <span style="color:var(--accent-gold);font-weight:600;">+${h.amount || 0}</span>
                    <span style="color:var(--text-muted);font-size:11px;margin-left:8px;">${_escapeHtml(dateStr)}</span>
                  </div>
                </div>
              `;
            }).join('')}
          </div>`
      }
    </div>
  `;

  container.appendChild(pointsContainer);
}

function _escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
