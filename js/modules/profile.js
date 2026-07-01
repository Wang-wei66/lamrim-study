/**
 * 个人中心模块
 * 学习统计、错题本、设置、关于
 */

import defaultState from '../state.js';
import LAMRIM_STRUCTURE from '../data/lamrim-structure.js';
import EXAM_QUESTIONS from '../data/exam-questions.js';

// ── 工具函数 ──────────────────────────────────────────

function _formatDuration(seconds) {
  if (!seconds || seconds < 0) return '0分钟';
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0) return `${h}小时${m}分钟`;
  return `${m}分钟`;
}

function _findNode(nodeId, nodes) {
  if (!nodes || !nodes.length) nodes = LAMRIM_STRUCTURE.children;
  for (const node of nodes) {
    if (node.id === nodeId) return node;
    if (node.children && node.children.length) {
      const found = _findNode(nodeId, node.children);
      if (found) return found;
    }
  }
  return null;
}

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

function _getAllQuestions() {
  if (!EXAM_QUESTIONS) return {};
  return EXAM_QUESTIONS;
}

function _truncate(str, maxLen) {
  if (!str) return '';
  return str.length > maxLen ? str.substring(0, maxLen) + '...' : str;
}

// ── 导出入口 ──────────────────────────────────────────

export function renderProfile(container) {
  container.innerHTML = '';

  const profileContainer = document.createElement('div');
  profileContainer.className = 'profile-container';

  // ── 学习统计区 ──────────────────────────────────
  _renderStatsSection(profileContainer);

  // ── 错题本区 ────────────────────────────────────
  _renderWrongQuestionsSection(profileContainer);

  // ── 设置区 ──────────────────────────────────────
  _renderSettingsSection(profileContainer);

  // ── 关于 ────────────────────────────────────────
  _renderAboutSection(profileContainer);

  container.appendChild(profileContainer);
}

// ── 学习统计区 ──────────────────────────────────────────

function _renderStatsSection(container) {
  let chaptersStudied = 0;
  let examRecords = [];
  let studySessions = [];
  let totalDuration = 0;
  let checkinDates = [];

  try {
    const progress = defaultState._state?.progress || {};
    chaptersStudied = Object.values(progress).filter((s) => s === 'completed').length;
    examRecords = defaultState.getExamRecords();
    studySessions = defaultState._state?.studySessions || [];
    totalDuration = studySessions.reduce((sum, s) => sum + (s.duration || 0), 0);
    checkinDates = defaultState.getCheckinDates();
  } catch (e) { /* ignore */ }

  // 连续打卡天数
  let streakDays = 0;
  if (checkinDates.length > 0) {
    const sorted = [...checkinDates].sort().reverse();
    streakDays = 1;
    for (let i = 1; i < sorted.length; i++) {
      const prev = new Date(sorted[i - 1]);
      const curr = new Date(sorted[i]);
      const diff = (prev.getTime() - curr.getTime()) / (1000 * 60 * 60 * 24);
      if (Math.round(diff) === 1) {
        streakDays++;
      } else {
        break;
      }
    }
  }

  const totalExams = examRecords.length;
  const passedExams = examRecords.filter((r) => {
    const pct = r.total > 0 ? r.correct / r.total : 0;
    return pct >= 0.6;
  }).length;
  const passRate = totalExams > 0 ? Math.round((passedExams / totalExams) * 100) : 0;

  const section = document.createElement('div');
  section.className = 'profile-section';
  section.innerHTML = `
    <div class="profile-section-title">📊 学习统计</div>
    <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:12px;">
      <div style="background:var(--bg-secondary);border-radius:var(--radius-sm);padding:16px;text-align:center;">
        <div style="font-size:24px;font-weight:700;color:var(--primary);">${chaptersStudied}</div>
        <div style="font-size:12px;color:var(--text-muted);margin-top:4px;">已学章节</div>
      </div>
      <div style="background:var(--bg-secondary);border-radius:var(--radius-sm);padding:16px;text-align:center;">
        <div style="font-size:24px;font-weight:700;color:var(--accent-gold);">${totalExams}</div>
        <div style="font-size:12px;color:var(--text-muted);margin-top:4px;">考试次数</div>
      </div>
      <div style="background:var(--bg-secondary);border-radius:var(--radius-sm);padding:16px;text-align:center;">
        <div style="font-size:24px;font-weight:700;color:${passRate >= 60 ? 'var(--good)' : 'var(--accent-red)'};">${passRate}%</div>
        <div style="font-size:12px;color:var(--text-muted);margin-top:4px;">通过率</div>
      </div>
      <div style="background:var(--bg-secondary);border-radius:var(--radius-sm);padding:16px;text-align:center;">
        <div style="font-size:24px;font-weight:700;color:var(--accent-green);">${streakDays}</div>
        <div style="font-size:12px;color:var(--text-muted);margin-top:4px;">连续打卡</div>
      </div>
    </div>
    <div style="margin-top:12px;font-size:13px;color:var(--text-muted);text-align:center;">
      总学习时长：${_formatDuration(totalDuration)}
    </div>
  `;
  container.appendChild(section);
}

// ── 错题本区 ──────────────────────────────────────────

function _renderWrongQuestionsSection(container) {
  let wrongQuestions = [];
  try {
    wrongQuestions = defaultState.getWrongQuestions();
  } catch (e) { wrongQuestions = []; }

  const section = document.createElement('div');
  section.className = 'profile-section';

  if (wrongQuestions.length === 0) {
    section.innerHTML = `
      <div class="profile-section-title">📝 错题本</div>
      <p style="color:var(--text-muted);font-size:14px;">暂无错题，继续保持！</p>
    `;
    container.appendChild(section);
    return;
  }

  const allQuestions = _getAllQuestions();

  // 按章节分组
  const grouped = {};
  for (const wq of wrongQuestions) {
    const chapterId = wq.chapterId;
    if (!grouped[chapterId]) grouped[chapterId] = [];
    grouped[chapterId].push(wq);
  }

  let html = '<div class="profile-section-title">📝 错题本（共 ' + wrongQuestions.length + ' 题）</div>';

  // 再做一次按钮
  html += `
    <div style="margin-bottom:16px;">
      <button class="btn btn-primary btn-sm" id="profile-retry-wrong" style="font-size:13px;padding:6px 16px;">
        再做一次（随机抽取错题）
      </button>
    </div>
  `;

  html += '<div class="wrong-questions-list">';

  for (const [chapterId, items] of Object.entries(grouped)) {
    const chapterTitle = (() => {
      const node = _findNode(chapterId, LAMRIM_STRUCTURE.children);
      return node ? node.title : chapterId;
    })();

    html += `<div style="margin-bottom:8px;font-size:13px;font-weight:600;color:var(--text-muted);">${_escapeHtml(chapterTitle)}</div>`;

    for (const item of items) {
      const questions = allQuestions[chapterId] || [];
      const question = questions.find((q) => q.id === item.questionId);

      if (!question) continue;

      html += `
        <div class="wq-item">
          <div class="wq-question" title="${_escapeHtml(question.question)}">
            ${_escapeHtml(_truncate(question.question, 50))}
          </div>
          <div class="wq-actions">
            <button class="btn btn-secondary btn-sm wq-view-btn" data-chapter="${_escapeHtml(chapterId)}" data-qid="${question.id}" style="font-size:11px;padding:4px 10px;">查看</button>
            <button class="btn btn-secondary btn-sm wq-remove-btn" data-chapter="${_escapeHtml(chapterId)}" data-qid="${question.id}" style="font-size:11px;padding:4px 10px;">已掌握</button>
          </div>
        </div>
      `;
    }
  }

  html += '</div>';
  section.innerHTML = html;
  container.appendChild(section);

  // 绑定事件
  _bindWrongQuestionEvents(section, allQuestions);
}

function _bindWrongQuestionEvents(section, allQuestions) {
  // 查看按钮
  section.querySelectorAll('.wq-view-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const chapterId = btn.dataset.chapter;
      const qid = parseInt(btn.dataset.qid, 10);
      const questions = allQuestions[chapterId] || [];
      const question = questions.find((q) => q.id === qid);
      if (question) {
        _showQuestionModal(question, chapterId);
      }
    });
  });

  // 已掌握按钮
  section.querySelectorAll('.wq-remove-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const chapterId = btn.dataset.chapter;
      const qid = parseInt(btn.dataset.qid, 10);
      try {
        defaultState.removeWrongQuestion(chapterId, qid);
      } catch (e) {
        console.warn('profile: failed to remove wrong question', e);
      }
      // 重新渲染当前容器
      const profileContainer = btn.closest('.profile-container');
      if (profileContainer) {
        renderProfile(profileContainer);
      }
    });
  });

  // 再做一次按钮
  const retryBtn = section.querySelector('#profile-retry-wrong');
  if (retryBtn) {
    retryBtn.addEventListener('click', () => {
      let wrongList = [];
      try {
        wrongList = defaultState.getWrongQuestions();
      } catch (e) { /* ignore */ }

      if (wrongList.length === 0) {
        alert('错题本已清空！');
        return;
      }

      // 从错题中随机抽取题目
      const pickedQuestions = [];
      for (const wq of wrongList) {
        const questions = allQuestions[wq.chapterId] || [];
        const question = questions.find((q) => q.id === wq.questionId);
        if (question) pickedQuestions.push(question);
      }

      // 随机打乱，最多20题
      const shuffled = pickedQuestions.sort(() => Math.random() - 0.5).slice(0, 20);

      // 触发考试（通过自定义事件，让主逻辑处理）
      const event = new CustomEvent('lamrim:start-exam', {
        detail: { chapterId: 'wrong-questions', questions: shuffled },
      });
      document.dispatchEvent(event);
    });
  }
}

function _showQuestionModal(question, chapterId) {
  const chapterTitle = (() => {
    const node = _findNode(chapterId, LAMRIM_STRUCTURE.children);
    return node ? node.title : chapterId;
  })();

  const optionsHtml = question.options.map((opt, i) => {
    const marker = String.fromCharCode(65 + i);
    const optText = opt.replace(/^[A-F][.、．]\s*/, '');

    let cls = '';
    if (question.type === 'single' || question.type === 'truefalse') {
      if (i === question.correct) cls = 'correct';
    } else if (question.type === 'multiple') {
      const correctArr = Array.isArray(question.correct) ? question.correct : [question.correct];
      if (correctArr.includes(i)) cls = 'correct';
    }

    return `
      <div class="eq-option ${cls}" style="cursor:default;">
        <div class="eq-option-marker">${marker}</div>
        <span>${_escapeHtml(optText)}</span>
      </div>
    `;
  }).join('');

  const modalContent = document.getElementById('modal-body');
  const modalContainer = document.getElementById('modal-container');

  if (!modalContent || !modalContainer) {
    alert(question.question + '\n\n正确答案：' + (Array.isArray(question.correct) ? question.correct.map((i) => String.fromCharCode(65 + i)).join(', ') : String.fromCharCode(65 + question.correct)) + '\n\n解析：' + (question.explanation || ''));
    return;
  }

  modalContent.innerHTML = `
    <div class="exam-question-card" style="border:none;box-shadow:none;padding:0;">
      <div style="font-size:12px;color:var(--text-muted);margin-bottom:8px;">${_escapeHtml(chapterTitle)}</div>
      <div class="eq-text">${_escapeHtml(question.question)}</div>
      <div class="eq-options">${optionsHtml}</div>
      ${question.explanation ? `
        <div class="exam-result" style="margin-top:16px;">
          <div class="er-label correct">📖 解析</div>
          <div class="er-text">${_escapeHtml(question.explanation)}</div>
        </div>
      ` : ''}
    </div>
  `;
  modalContainer.classList.remove('hidden');
}

// ── 设置区 ──────────────────────────────────────────

function _renderSettingsSection(container) {
  const section = document.createElement('div');
  section.className = 'profile-section';

  // 从 localStorage 读取当前设置
  let fontSize = 'medium';
  let theme = 'light';
  try {
    fontSize = localStorage.getItem('lamrim-font-size') || 'medium';
    theme = localStorage.getItem('lamrim-theme') || 'light';
  } catch (e) { /* ignore */ }

  const fontSizeLabels = { small: '小', medium: '中', large: '大' };
  const themeLabels = { light: '日间模式', dark: '夜间模式' };

  section.innerHTML = `
    <div class="profile-section-title">⚙️ 设置</div>

    <div style="margin-bottom:16px;">
      <div style="font-size:13px;font-weight:600;color:var(--text-primary);margin-bottom:8px;">字体大小</div>
      <div style="display:flex;gap:8px;">
        ${['small', 'medium', 'large'].map((size) => `
          <button class="btn ${fontSize === size ? 'btn-primary' : 'btn-secondary'} btn-sm setting-font-btn"
            data-size="${size}" style="font-size:12px;padding:6px 16px;">
            ${fontSizeLabels[size]}
          </button>
        `).join('')}
      </div>
    </div>

    <div style="margin-bottom:16px;">
      <div style="font-size:13px;font-weight:600;color:var(--text-primary);margin-bottom:8px;">主题切换</div>
      <div style="display:flex;gap:8px;">
        ${['light', 'dark'].map((t) => `
          <button class="btn ${theme === t ? 'btn-primary' : 'btn-secondary'} btn-sm setting-theme-btn"
            data-theme="${t}" style="font-size:12px;padding:6px 16px;">
            ${themeLabels[t]}
          </button>
        `).join('')}
      </div>
    </div>

    <div>
      <div style="font-size:13px;font-weight:600;color:var(--text-primary);margin-bottom:8px;">数据管理</div>
      <button class="btn btn-secondary btn-sm" id="setting-reset" style="font-size:12px;padding:6px 16px;color:var(--accent-red);border-color:var(--accent-red);">
        重置所有数据
      </button>
    </div>
  `;

  container.appendChild(section);

  // 绑定事件
  section.querySelectorAll('.setting-font-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const size = btn.dataset.size;
      try { localStorage.setItem('lamrim-font-size', size); } catch (e) { /* ignore */ }
      _applyFontSize(size);
      // 更新按钮状态
      section.querySelectorAll('.setting-font-btn').forEach((b) => {
        b.className = b.dataset.size === size ? 'btn btn-primary btn-sm setting-font-btn' : 'btn btn-secondary btn-sm setting-font-btn';
      });
    });
  });

  section.querySelectorAll('.setting-theme-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const t = btn.dataset.theme;
      try { localStorage.setItem('lamrim-theme', t); } catch (e) { /* ignore */ }
      _applyTheme(t);
      section.querySelectorAll('.setting-theme-btn').forEach((b) => {
        b.className = b.dataset.theme === t ? 'btn btn-primary btn-sm setting-theme-btn' : 'btn btn-secondary btn-sm setting-theme-btn';
      });
    });
  });

  const resetBtn = section.querySelector('#setting-reset');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      const confirmed = confirm('确定要重置所有数据吗？此操作不可撤销！\n\n将清除：学习进度、积分、考试记录、错题本、打卡记录等所有数据。');
      if (confirmed) {
        const doubleConfirm = confirm('再次确认：真的要重置所有数据吗？');
        if (doubleConfirm) {
          try {
            defaultState.reset();
            localStorage.removeItem('lamrim-font-size');
            localStorage.removeItem('lamrim-theme');
          } catch (e) {
            console.warn('profile: failed to reset', e);
          }
          alert('数据已重置。');
          // 重新渲染
          const profileContainer = resetBtn.closest('.profile-container');
          if (profileContainer) {
            renderProfile(profileContainer);
          }
        }
      }
    });
  }
}

function _applyFontSize(size) {
  const sizes = { small: '14px', medium: '16px', large: '18px' };
  document.documentElement.style.fontSize = sizes[size] || '16px';
}

function _applyTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
}

// ── 关于区 ──────────────────────────────────────────

function _renderAboutSection(container) {
  const section = document.createElement('div');
  section.className = 'profile-section';
  section.innerHTML = `
    <div class="profile-section-title">📖 关于</div>

    <div style="margin-bottom:20px;">
      <h4 style="font-size:15px;font-weight:600;color:var(--text-primary);margin-bottom:8px;">宗喀巴大师</h4>
      <p style="font-size:13px;color:var(--text-secondary);line-height:1.8;">
        宗喀巴大师（1357-1419），藏传佛教格鲁派创始人。大师出生于青海宗喀地区，
        自幼出家，遍学显密教法，后以阿底峡尊者《菩提道灯论》为蓝本，造《菩提道次第广论》，
        系统阐述了从凡夫到成佛的完整修行次第。大师一生著述宏富，度化众生无量，
        被尊为"第二佛陀"。
      </p>
    </div>

    <div style="margin-bottom:20px;">
      <h4 style="font-size:15px;font-weight:600;color:var(--text-primary);margin-bottom:8px;">《菩提道次第广论》</h4>
      <p style="font-size:13px;color:var(--text-secondary);line-height:1.8;">
        《菩提道次第广论》是宗喀巴大师最重要的著作之一，于1402年完成。
        本论以"三士道"为框架——下士道（人天乘）、中士道（解脱乘）、上士道（菩萨乘），
        将佛陀一代时教融会贯通，使修行者有次第可循、有标准可依。
        法尊法师于1934年将此论译为汉文，对汉传佛教产生了深远影响。
      </p>
    </div>

    <div>
      <h4 style="font-size:15px;font-weight:600;color:var(--text-primary);margin-bottom:8px;">版本信息</h4>
      <p style="font-size:13px;color:var(--text-muted);line-height:1.8;">
        菩提道次第广论 交互式学习网站 v1.0<br>
        数据来源：宗喀巴大师 造 · 法尊法师 译<br>
        仅供学习参考使用
      </p>
    </div>
  `;
  container.appendChild(section);
}

function _escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
