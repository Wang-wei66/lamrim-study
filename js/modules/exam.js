/**
 * 考试测试系统模块
 * 负责考试界面渲染、答题交互、成绩计算、错题记录
 */

import defaultState from '../state.js';
import LAMRIM_STRUCTURE from '../data/lamrim-structure.js';
import EXAM_QUESTIONS from '../data/exam-questions.js';

// ── 工具函数 ──────────────────────────────────────────

const DIFFICULTY_LABELS = { 1: 'easy', 2: 'medium', 3: 'hard' };
const DIFFICULTY_NAMES = { 1: '基础', 2: '进阶', 3: '深究' };

function _findChapterTitle(chapterId) {
  const flat = _getFlatList();
  const node = flat.find((n) => n.id === chapterId);
  return node ? node.title : chapterId;
}

let _flatCache = null;
function _getFlatList() {
  if (_flatCache) return _flatCache;
  _flatCache = [];
  function walk(nodes) {
    for (const n of nodes) {
      _flatCache.push(n);
      if (n.children && n.children.length) walk(n.children);
    }
  }
  walk(LAMRIM_STRUCTURE.children);
  return _flatCache;
}

function _shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function _formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}分${s}秒`;
}

function _calculateScore(pct) {
  if (pct >= 0.9) return 30;
  if (pct >= 0.7) return 20;
  if (pct >= 0.6) return 15;
  return 5;
}

// ── 考试状态 ──────────────────────────────────────────

let _examState = null;

function _resetExam(chapterId, questions) {
  _examState = {
    chapterId,
    questions: questions || [],
    answers: {},
    currentIndex: 0,
    startTime: Date.now(),
    submitted: false,
    showAnswerSheet: false,
  };
}

// ── 导出入口 ──────────────────────────────────────────

export function renderExam(container, chapterId) {
  const questions = (EXAM_QUESTIONS && EXAM_QUESTIONS[chapterId]) ? [...EXAM_QUESTIONS[chapterId]] : [];

  _resetExam(chapterId, questions);

  if (questions.length === 0) {
    container.innerHTML = `
      <div class="exam-container">
        <div class="exam-result-page">
          <div style="font-size:48px;margin-bottom:16px;">📝</div>
          <h3 style="color:var(--text-muted);margin-bottom:8px;">此章节暂无考试题目</h3>
          <p style="color:var(--text-muted);">敬请期待</p>
        </div>
      </div>
    `;
    return;
  }

  _renderExamUI(container);
}

export function initExam(container) {
  if (!_examState || _examState.submitted) {
    container.innerHTML = `
      <div class="exam-container">
        <div class="exam-result-page">
          <div style="font-size:48px;margin-bottom:16px;">📝</div>
          <p style="color:var(--text-muted);">请从目录选择一个章节开始考试</p>
        </div>
      </div>
    `;
    return;
  }
  _renderExamUI(container);
}

// ── UI 渲染 ──────────────────────────────────────────

function _renderExamUI(container) {
  const { questions, answers, currentIndex, submitted, showAnswerSheet } = _examState;
  const total = questions.length;
  const answered = Object.keys(answers).length;

  if (submitted) {
    _renderResult(container);
    return;
  }

  const q = questions[currentIndex];
  const chapterTitle = _findChapterTitle(_examState.chapterId);
  const answeredSet = new Set(Object.keys(answers).map(Number));

  container.innerHTML = `
    <div class="exam-container">
      <div class="exam-header">
        <div class="exam-title">${_escapeHtml(chapterTitle)}</div>
        <div class="exam-subtitle">共 ${total} 题 · 建议用时 ${Math.round(total * 1.5)} 分钟</div>
      </div>

      <div class="exam-progress-bar">
        <div class="exam-progress-track">
          <div class="exam-progress-fill" style="width:${((currentIndex + 1) / total) * 100}%"></div>
        </div>
        <span class="exam-progress-text">${currentIndex + 1}/${total}</span>
        <button class="exam-answer-sheet-btn" id="exam-toggle-sheet">${showAnswerSheet ? '隐藏' : ''}答题卡</button>
      </div>

      ${showAnswerSheet ? _buildAnswerSheet(answeredSet, total, currentIndex) : ''}

      <div class="exam-question-card">
        <div class="eq-number">第 ${currentIndex + 1} 题 / 共 ${total} 题</div>
        <span class="eq-difficulty ${DIFFICULTY_LABELS[q.difficulty] || 'medium'}">${DIFFICULTY_NAMES[q.difficulty] || '进阶'}</span>
        <div class="eq-text">${_escapeHtml(q.question)}</div>
        <div class="eq-type-label" style="font-size:12px;color:var(--text-muted);margin-bottom:8px;">${
          q.type === 'single' ? '单选题' : q.type === 'multiple' ? '多选题' : '判断题'
        }</div>
        <div class="eq-options" data-qid="${q.id}">
          ${q.options.map((opt, i) => _buildOption(q, i)).join('')}
        </div>
      </div>

      <div class="exam-nav" style="display:flex;justify-content:space-between;align-items:center;gap:12px;">
        <button class="btn btn-secondary" id="exam-prev" ${currentIndex === 0 ? 'disabled' : ''}>上一题</button>
        <span style="font-size:13px;color:var(--text-muted);">已答 ${answered}/${total} 题</span>
        ${currentIndex < total - 1
          ? '<button class="btn btn-primary" id="exam-next">下一题</button>'
          : '<button class="btn btn-primary" id="exam-submit">交卷</button>'}
      </div>
    </div>
  `;

  _bindEvents(container, q, total);
}

function _buildOption(q, index) {
  const marker = String.fromCharCode(65 + index); // A, B, C, D
  const userAnswer = _examState.answers[q.id];

  let selectedClass = '';
  if (q.type === 'single' || q.type === 'truefalse') {
    if (userAnswer === index) selectedClass = 'selected';
  } else if (q.type === 'multiple') {
    if (Array.isArray(userAnswer) && userAnswer.includes(index)) selectedClass = 'selected';
  }

  const optText = q.options[index].replace(/^[A-F][.、．]\s*/, '');

  return `
    <div class="eq-option ${selectedClass}" data-index="${index}">
      <div class="eq-option-marker">${marker}</div>
      <span>${_escapeHtml(optText)}</span>
    </div>
  `;
}

function _buildAnswerSheet(answeredSet, total, currentIndex) {
  let html = '<div class="exam-answer-sheet" style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px;padding:12px;background:var(--bg-card);border:1px solid var(--border);border-radius:var(--radius);">';
  for (let i = 0; i < total; i++) {
    const isAnswered = answeredSet.has(i);
    const isCurrent = i === currentIndex;
    html += `
      <button class="exam-sheet-cell" data-index="${i}" style="
        width:36px;height:36px;border-radius:6px;border:1px solid var(--border);
        display:flex;align-items:center;justify-content:center;
        font-size:13px;cursor:pointer;
        background:${isCurrent ? 'var(--accent-gold)' : isAnswered ? '#e8f5e9' : 'var(--bg-secondary)'};
        color:${isCurrent ? '#fff' : isAnswered ? 'var(--good)' : 'var(--text-muted)'};
        border-color:${isCurrent ? 'var(--accent-gold)' : isAnswered ? 'var(--good)' : 'var(--border)'};
      ">${i + 1}</button>
    `;
  }
  html += '</div>';
  return html;
}

// ── 事件绑定 ──────────────────────────────────────────

function _bindEvents(container, q, total) {
  const optionsContainer = container.querySelector('.eq-options');
  if (optionsContainer) {
    optionsContainer.addEventListener('click', (e) => {
      if (_examState.submitted) return;
      const opt = e.target.closest('.eq-option');
      if (!opt) return;
      const index = parseInt(opt.dataset.index, 10);
      _handleOptionSelect(q, index, container);
    });
  }

  const prevBtn = container.querySelector('#exam-prev');
  const nextBtn = container.querySelector('#exam-next');
  const submitBtn = container.querySelector('#exam-submit');
  const toggleBtn = container.querySelector('#exam-toggle-sheet');

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (_examState.currentIndex > 0) {
        _examState.currentIndex--;
        _renderExamUI(container);
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (_examState.currentIndex < total - 1) {
        _examState.currentIndex++;
        _renderExamUI(container);
      }
    });
  }

  if (submitBtn) {
    submitBtn.addEventListener('click', () => _handleSubmit(container));
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      _examState.showAnswerSheet = !_examState.showAnswerSheet;
      _renderExamUI(container);
    });
  }

  // 答题卡格子点击
  container.querySelectorAll('.exam-sheet-cell').forEach((cell) => {
    cell.addEventListener('click', () => {
      const idx = parseInt(cell.dataset.index, 10);
      _examState.currentIndex = idx;
      _examState.showAnswerSheet = false;
      _renderExamUI(container);
    });
  });
}

function _handleOptionSelect(q, index, container) {
  if (_examState.submitted) return;

  if (q.type === 'single' || q.type === 'truefalse') {
    _examState.answers[q.id] = index;
  } else if (q.type === 'multiple') {
    let current = _examState.answers[q.id];
    if (!Array.isArray(current)) current = [];
    const pos = current.indexOf(index);
    if (pos >= 0) {
      current.splice(pos, 1);
    } else {
      current.push(index);
    }
    _examState.answers[q.id] = current;
  }
  _renderExamUI(container);
}

// ── 提交逻辑 ──────────────────────────────────────────

function _handleSubmit(container) {
  const { questions, answers } = _examState;
  const total = questions.length;
  const answered = Object.keys(answers).length;
  const unanswered = total - answered;

  if (unanswered > 0) {
    const confirmed = confirm(`还有 ${unanswered} 题未作答，确定交卷吗？`);
    if (!confirmed) return;
  } else {
    const confirmed = confirm('确定交卷吗？交卷后将无法修改答案。');
    if (!confirmed) return;
  }

  _examState.submitted = true;
  _examState.endTime = Date.now();

  // 计算成绩
  let correct = 0;
  const results = questions.map((q) => {
    const userAnswer = answers[q.id];
    let isCorrect = false;

    if (q.type === 'single' || q.type === 'truefalse') {
      isCorrect = userAnswer === q.correct;
    } else if (q.type === 'multiple') {
      const correctArr = Array.isArray(q.correct) ? q.correct : [q.correct];
      const userArr = Array.isArray(userAnswer) ? userAnswer : [];
      isCorrect = correctArr.length === userArr.length && correctArr.every((v) => userArr.includes(v));
    }

    if (isCorrect) correct++;
    return { question: q, userAnswer, isCorrect };
  });

  const pct = total > 0 ? correct / total : 0;
  const timeSeconds = Math.round((_examState.endTime - _examState.startTime) / 1000);
  const pointsEarned = _calculateScore(pct);

  // 记录成绩
  try {
    defaultState.recordExamResult(_examState.chapterId, Math.round(pct * 100), correct, total, timeSeconds);
    defaultState.addPoints(pointsEarned, `完成"${_findChapterTitle(_examState.chapterId)}"考试 (正确率${Math.round(pct * 100)}%)`);
  } catch (e) {
    console.warn('exam: failed to record result', e);
  }

  // 错题加入错题本
  results.forEach((r) => {
    if (!r.isCorrect) {
      try {
        defaultState.addWrongQuestion(_examState.chapterId, r.question.id);
      } catch (e) {
        console.warn('exam: failed to add wrong question', e);
      }
    }
  });

  _examState.results = results;
  _examState.score = { correct, total, pct, timeSeconds, pointsEarned };
  _renderResult(container);
}

// ── 成绩展示 ──────────────────────────────────────────

function _renderResult(container) {
  const { score, results, chapterId } = _examState;
  if (!score) return;

  const { correct, total, pct, timeSeconds, pointsEarned } = score;
  const passed = pct >= 0.6;
  const gradeText = pct >= 0.9 ? '优秀' : pct >= 0.7 ? '良好' : pct >= 0.6 ? '通过' : '未通过';

  container.innerHTML = `
    <div class="exam-container">
      <div class="exam-result-page">
        <div class="er-score">${Math.round(pct * 100)}<span style="font-size:24px;">分</span></div>
        <div class="er-grade ${passed ? 'pass' : 'fail'}">${gradeText}</div>
        <div style="margin-bottom:24px;color:var(--text-muted);font-size:14px;">
          <p>正确 ${correct}/${total} 题 · 用时 ${_formatTime(timeSeconds)}</p>
          <p style="margin-top:4px;">获得积分 <strong style="color:var(--accent-gold);">+${pointsEarned}</strong></p>
        </div>
        <button class="btn btn-primary" id="exam-retry" style="margin-bottom:12px;">重新考试</button>
      </div>

      <div style="margin-top:24px;">
        <h3 style="font-size:16px;font-weight:600;margin-bottom:16px;color:var(--text-primary);">答题详情</h3>
        ${results.map((r, i) => _buildResultCard(r, i, total)).join('')}
      </div>
    </div>
  `;

  container.querySelector('#exam-retry')?.addEventListener('click', () => {
    const questions = _shuffle((EXAM_QUESTIONS && EXAM_QUESTIONS[chapterId]) ? EXAM_QUESTIONS[chapterId] : []);
    _resetExam(chapterId, questions);
    _renderExamUI(container);
  });
}

function _buildResultCard(r, index, total) {
  const { question: q, userAnswer, isCorrect } = r;
  const diffLabel = DIFFICULTY_LABELS[q.difficulty] || 'medium';
  const diffName = DIFFICULTY_NAMES[q.difficulty] || '进阶';

  const optionsHtml = q.options.map((opt, i) => {
    const marker = String.fromCharCode(65 + i);
    const optText = opt.replace(/^[A-F][.、．]\s*/, '');

    let cls = '';
    if (q.type === 'single' || q.type === 'truefalse') {
      const correctIdx = q.correct;
      if (i === correctIdx) cls = 'correct';
      else if (i === userAnswer && userAnswer !== correctIdx) cls = 'wrong';
    } else if (q.type === 'multiple') {
      const correctArr = Array.isArray(q.correct) ? q.correct : [q.correct];
      const userArr = Array.isArray(userAnswer) ? userAnswer : [];
      if (correctArr.includes(i)) cls = 'correct';
      else if (userArr.includes(i) && !correctArr.includes(i)) cls = 'wrong';
    }

    return `
      <div class="eq-option ${cls}" style="cursor:default;">
        <div class="eq-option-marker">${marker}</div>
        <span>${_escapeHtml(optText)}</span>
      </div>
    `;
  }).join('');

  return `
    <div class="exam-question-card">
      <div class="eq-number" style="display:flex;justify-content:space-between;align-items:center;">
        <span>第 ${index + 1} 题 / 共 ${total} 题</span>
        <span class="eq-difficulty ${diffLabel}">${diffName}</span>
      </div>
      <div class="eq-text">${_escapeHtml(q.question)}</div>
      <div class="eq-options">${optionsHtml}</div>
      <div class="exam-result">
        <div class="er-label ${isCorrect ? 'correct' : 'wrong'}">${isCorrect ? '✓ 回答正确' : '✗ 回答错误'}</div>
        ${!isCorrect && q.explanation ? `<div class="er-text">${_escapeHtml(q.explanation)}</div>` : ''}
      </div>
    </div>
  `;
}

function _escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
