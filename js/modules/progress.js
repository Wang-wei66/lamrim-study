/**
 * 学习进度追踪模块
 * 展示总体进度、章节进度、学习时长统计、学习日历热力图
 */

import defaultState from '../state.js';
import LAMRIM_STRUCTURE from '../data/lamrim-structure.js';

// ── 章节分组定义 ──────────────────────────────────────

const CHAPTER_GROUPS = [
  { id: 'part1', title: '归敬颂及造论宗旨', ids: ['part1'] },
  { id: 'part2-1', title: '造者殊胜', ids: ['part2-1'] },
  { id: 'part2-2', title: '法殊胜', ids: ['part2-2'] },
  { id: 'part2-3', title: '讲闻轨理', ids: ['part2-3'] },
  { id: 'part2-4', title: '道前基础', ids: ['part2-4-1', 'part2-4-2', 'part2-4-3', 'part2-4-4', 'part2-4-5', 'part2-4-6'] },
  { id: 'part2-5', title: '共下士道', ids: ['part2-5'] },
  { id: 'part2-6', title: '共中士道', ids: ['part2-6'] },
  { id: 'part2-7', title: '共上士道', ids: ['part2-7', 'part2-8', 'part2-9'] },
];

// ── 工具函数 ──────────────────────────────────────────

function _getFlatList() {
  const result = [];
  function walk(nodes) {
    for (const n of nodes) {
      result.push(n);
      if (n.children && n.children.length) walk(n.children);
    }
  }
  walk(LAMRIM_STRUCTURE.children);
  return result;
}

function _getLeafNodes(nodes) {
  const result = [];
  function walk(list) {
    for (const n of list) {
      if (!n.children || n.children.length === 0) {
        result.push(n);
      } else {
        walk(n.children);
      }
    }
  }
  walk(nodes || LAMRIM_STRUCTURE.children);
  return result;
}

function _countProgress(nodeList) {
  let completed = 0;
  let total = 0;
  for (const node of nodeList) {
    const leaves = _getLeafNodes([node]);
    for (const leaf of leaves) {
      total++;
      try {
        if (defaultState.getProgress(leaf.id) === 'completed') completed++;
      } catch (e) { /* ignore */ }
    }
  }
  return { completed, total };
}

function _formatDuration(seconds) {
  if (!seconds || seconds < 0) return '0分钟';
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0) return `${h}小时${m}分钟`;
  return `${m}分钟`;
}

// ── 导出入口 ──────────────────────────────────────────

export function renderProgress(container) {
  container.innerHTML = '';

  const progressContainer = document.createElement('div');
  progressContainer.className = 'progress-container';
  progressContainer.style.cssText = 'max-width:680px;margin:0 auto;padding:32px 24px 80px;';

  // ── 总体进度 ────────────────────────────────────
  const flat = _getFlatList();
  let totalCompleted = 0;
  let totalNodes = 0;
  try {
    for (const node of flat) {
      totalNodes++;
      if (defaultState.getProgress(node.id) === 'completed') totalCompleted++;
    }
  } catch (e) {
    totalNodes = flat.length || 1;
  }
  const overallPct = totalNodes > 0 ? Math.round((totalCompleted / totalNodes) * 100) : 0;

  progressContainer.innerHTML += `
    <div class="progress-overall" style="text-align:center;margin-bottom:32px;">
      <div class="progress-ring-container" style="display:inline-block;position:relative;">
        <svg width="140" height="140" viewBox="0 0 140 140">
          <circle cx="70" cy="70" r="60" fill="none" stroke="var(--bg-secondary)" stroke-width="10"/>
          <circle cx="70" cy="70" r="60" fill="none" stroke="var(--accent-green)" stroke-width="10"
            stroke-dasharray="${2 * Math.PI * 60}" stroke-dashoffset="${2 * Math.PI * 60 * (1 - overallPct / 100)}"
            stroke-linecap="round" transform="rotate(-90 70 70)"/>
        </svg>
        <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center;">
          <div style="font-size:28px;font-weight:700;color:var(--accent-green);">${overallPct}%</div>
          <div style="font-size:11px;color:var(--text-muted);">总进度</div>
        </div>
      </div>
      <p style="margin-top:8px;font-size:13px;color:var(--text-muted);">已完成 ${totalCompleted}/${totalNodes} 个节点</p>
    </div>
  `;

  // ── 章节分组进度 ────────────────────────────────
  progressContainer.innerHTML += '<h3 style="font-size:16px;font-weight:600;margin-bottom:16px;color:var(--text-primary);">各章节进度</h3>';

  const structureChildren = LAMRIM_STRUCTURE.children || [];
  for (const group of CHAPTER_GROUPS) {
    const nodes = [];
    for (const gid of group.ids) {
      const found = structureChildren.find((n) => n.id === gid);
      if (found) nodes.push(found);
    }

    const { completed, total } = _countProgress(nodes);
    const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

    progressContainer.innerHTML += `
      <div class="progress-chapter-item" style="margin-bottom:12px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
          <span style="font-size:14px;color:var(--text-primary);">${_escapeHtml(group.title)}</span>
          <span style="font-size:12px;color:var(--text-muted);">${completed}/${total}</span>
        </div>
        <div style="height:8px;background:var(--bg-secondary);border-radius:4px;overflow:hidden;">
          <div style="height:100%;width:${pct}%;background:${pct === 100 ? 'var(--good)' : 'var(--accent-green)'};border-radius:4px;transition:width 0.3s ease;"></div>
        </div>
      </div>
    `;
  }

  // ── 学习时长统计 ────────────────────────────────
  let stats = { today: 0, week: 0, month: 0 };
  let totalDuration = 0;
  try {
    stats = defaultState.getStudyStats();
    const sessions = defaultState._state?.studySessions || [];
    totalDuration = sessions.reduce((sum, s) => sum + (s.duration || 0), 0);
  } catch (e) { /* ignore */ }

  progressContainer.innerHTML += `
    <h3 style="font-size:16px;font-weight:600;margin:24px 0 16px;color:var(--text-primary);">学习时长</h3>
    <div class="progress-time-stats" style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:24px;">
      <div class="progress-time-card" style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius);padding:16px;text-align:center;">
        <div style="font-size:22px;font-weight:700;color:var(--accent-gold);">${_formatDuration(stats.today)}</div>
        <div style="font-size:12px;color:var(--text-muted);margin-top:4px;">今日</div>
      </div>
      <div class="progress-time-card" style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius);padding:16px;text-align:center;">
        <div style="font-size:22px;font-weight:700;color:var(--accent-green);">${_formatDuration(stats.week)}</div>
        <div style="font-size:12px;color:var(--text-muted);margin-top:4px;">本周</div>
      </div>
      <div class="progress-time-card" style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius);padding:16px;text-align:center;">
        <div style="font-size:22px;font-weight:700;color:var(--primary);">${_formatDuration(stats.month)}</div>
        <div style="font-size:12px;color:var(--text-muted);margin-top:4px;">本月</div>
      </div>
      <div class="progress-time-card" style="background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius);padding:16px;text-align:center;">
        <div style="font-size:22px;font-weight:700;color:var(--text-primary);">${_formatDuration(totalDuration)}</div>
        <div style="font-size:12px;color:var(--text-muted);margin-top:4px;">总计</div>
      </div>
    </div>
  `;

  // ── 学习日历热力图 ──────────────────────────────
  progressContainer.innerHTML += `
    <h3 style="font-size:16px;font-weight:600;margin-bottom:16px;color:var(--text-primary);">学习日历</h3>
    <div class="progress-calendar" style="margin-bottom:24px;">
      ${_buildHeatmap()}
    </div>
  `;

  // ── 最近学习记录 ────────────────────────────────
  const sessions = (() => {
    try { return defaultState._state?.studySessions || []; } catch (e) { return []; }
  })();

  progressContainer.innerHTML += '<h3 style="font-size:16px;font-weight:600;margin-bottom:16px;color:var(--text-primary);">最近学习记录</h3>';

  if (sessions.length === 0) {
    progressContainer.innerHTML += '<p style="color:var(--text-muted);font-size:14px;">暂无学习记录，开始学习吧！</p>';
  } else {
    const recent = sessions.slice(0, 20);
    progressContainer.innerHTML += '<div class="progress-sessions" style="display:flex;flex-direction:column;gap:8px;">';
    for (const s of recent) {
      const dateStr = s.date || '';
      const timeStr = s.startTime ? new Date(s.startTime).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }) : '';
      progressContainer.innerHTML += `
        <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 12px;background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius-sm);font-size:13px;">
          <span style="color:var(--text-primary);">${_escapeHtml(dateStr)}</span>
          <span style="color:var(--text-muted);">${_formatDuration(s.duration)}</span>
        </div>
      `;
    }
    progressContainer.innerHTML += '</div>';
  }

  container.appendChild(progressContainer);
}

// ── 热力图构建 ──────────────────────────────────────────

function _buildHeatmap() {
  let checkinDates = [];
  let studySessions = [];
  try {
    checkinDates = defaultState.getCheckinDates();
    studySessions = defaultState._state?.studySessions || [];
  } catch (e) { /* ignore */ }

  // 按日期聚合学习时长
  const durationByDate = {};
  for (const s of studySessions) {
    if (s.date) {
      durationByDate[s.date] = (durationByDate[s.date] || 0) + (s.duration || 0);
    }
  }

  // 最近30天
  const days = [];
  const now = new Date();
  for (let i = 29; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    const hasCheckin = checkinDates.includes(key);
    const duration = durationByDate[key] || 0;
    days.push({ date: key, day: d.getDate(), weekday: d.getDay(), hasCheckin, duration });
  }

  // 热度颜色
  function heatColor(duration) {
    if (duration <= 0) return 'var(--bg-secondary)';
    if (duration < 600) return '#c8e6c9';   // < 10min
    if (duration < 1800) return '#81c784';  // < 30min
    if (duration < 3600) return '#4caf50';  // < 1h
    return '#2e7d32';                       // >= 1h
  }

  const weekdayLabels = ['日', '一', '二', '三', '四', '五', '六'];

  // 按周分组
  const weeks = [];
  let currentWeek = [];
  for (const day of days) {
    currentWeek.push(day);
    if (day.weekday === 6 || days.indexOf(day) === days.length - 1) {
      // 补齐不足7天的周
      while (currentWeek.length < 7) {
        const first = currentWeek[0];
        if (!first) break;
        currentWeek.unshift(null);
      }
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }

  let html = '<div class="heatmap" style="display:flex;gap:4px;">';

  // 星期标签
  html += '<div style="display:flex;flex-direction:column;gap:4px;margin-right:4px;">';
  for (let w = 0; w < 7; w++) {
    html += `<span style="font-size:10px;color:var(--text-muted);height:24px;line-height:24px;text-align:center;">${weekdayLabels[w]}</span>`;
  }
  html += '</div>';

  // 日期格子
  for (const week of weeks) {
    html += '<div style="display:flex;flex-direction:column;gap:4px;">';
    for (let w = 0; w < 7; w++) {
      const day = week[w];
      if (!day) {
        html += '<div style="width:24px;height:24px;"></div>';
      } else {
        const color = heatColor(day.duration);
        html += `<div title="${day.date} · ${_formatDuration(day.duration)}" style="
          width:24px;height:24px;border-radius:4px;background:${color};
          cursor:default;
        "></div>`;
      }
    }
    html += '</div>';
  }

  html += '</div>';

  // 图例
  html += `
    <div style="display:flex;align-items:center;gap:8px;margin-top:12px;font-size:11px;color:var(--text-muted);">
      <span>少</span>
      <span style="width:16px;height:16px;border-radius:3px;background:var(--bg-secondary);"></span>
      <span style="width:16px;height:16px;border-radius:3px;background:#c8e6c9;"></span>
      <span style="width:16px;height:16px;border-radius:3px;background:#81c784;"></span>
      <span style="width:16px;height:16px;border-radius:3px;background:#4caf50;"></span>
      <span style="width:16px;height:16px;border-radius:3px;background:#2e7d32;"></span>
      <span>多</span>
    </div>
  `;

  return html;
}

function _escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
