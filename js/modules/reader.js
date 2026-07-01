/**
 * 内容阅读器模块
 * 负责渲染章节内容、导航、状态标记、思惟引导
 */

import defaultState from '../state.js';
import LAMRIM_CONTENT from '../data/lamrim-content.js';
import LAMRIM_STRUCTURE from '../data/lamrim-structure.js';

// ── 颜色体系 ──────────────────────────────────────────

const LEVEL_COLORS = {
  'a': '#8B0000',  // 深红（甲级）
  'b': '#B8860B',  // 深金（乙级）
  'c': '#2E7D32',  // 深绿（丙级）
  'd': '#1565C0',  // 深蓝（丁级）
  'e': '#6A1B9A',  // 深紫（戊级）
};

// ── 工具函数 ──────────────────────────────────────────

/** 根据 nodeId 在科判树中找到该节点 */
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

/** 获取扁平节点列表（按树遍历顺序） */
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

/** 找到当前节点在扁平列表中的索引 */
function _getNodeIndex(nodeId) {
  const list = _getFlatList();
  return list.findIndex(n => n.id === nodeId);
}

/** 获取上一个/下一个节点 id */
function _getPrevNext(nodeId) {
  const list = _getFlatList();
  const idx = _getNodeIndex(nodeId);
  return {
    prev: idx > 0 ? list[idx - 1].id : null,
    next: idx >= 0 && idx < list.length - 1 ? list[idx + 1].id : null,
  };
}

// ── 内容渲染 ──────────────────────────────────────────

/**
 * 渲染指定节点的内容到 container
 * @param {HTMLElement} container - 内容容器
 * @param {string} nodeId - 节点 ID
 * @param {object} [options] - 可选参数
 * @param {Function} [options.onNavigate] - 导航回调，接收 nodeId
 * @param {Function} [options.onStartExam] - 考试回调，接收 nodeId
 */
export function renderContent(container, nodeId, options = {}) {
  if (!container) return;

  const { onNavigate, onStartExam } = options;

  // 清空
  container.innerHTML = '';

  const data = LAMRIM_CONTENT[nodeId];

  // ── 章节头部 ────────────────────────────────────────
  const headerEl = document.createElement('div');
  headerEl.className = 'reader-chapter-header';

  // 从科判树取 number
  const nodeInfo = _findNode(nodeId);

  const numEl = document.createElement('div');
  numEl.className = 'rch-number';
  numEl.textContent = (nodeInfo && nodeInfo.number) || '';

  const titleEl = document.createElement('h2');
  titleEl.className = 'rch-title';
  titleEl.textContent = (data && data.title) || (nodeInfo && nodeInfo.title) || '';

  const summaryEl = document.createElement('p');
  summaryEl.className = 'rch-summary';
  summaryEl.textContent = (data && data.summary) || '';

  headerEl.appendChild(numEl);
  headerEl.appendChild(titleEl);
  headerEl.appendChild(summaryEl);
  container.appendChild(headerEl);

  // ── 内容体 ──────────────────────────────────────────
  if (!data || !data.content || data.content.length === 0) {
    const placeholder = document.createElement('div');
    placeholder.className = 'reader-placeholder';
    placeholder.textContent = '此章节内容正在建设中，敬请期待...';
    container.appendChild(placeholder);
  } else {
    const contentWrap = document.createElement('div');
    contentWrap.className = 'reader-content-body';

    for (const block of data.content) {
      const el = _renderBlock(block);
      if (el) contentWrap.appendChild(el);
    }

    container.appendChild(contentWrap);
  }

  // ── 思惟引导 ─────────────────────────────────────────
  if (data && data.reflection) {
    const reflWrap = document.createElement('div');
    reflWrap.className = 'content-reflection';

    const reflTitle = document.createElement('h4');
    reflTitle.className = 'reflection-title';
    reflTitle.textContent = '🧘 思惟引导';

    const reflBody = document.createElement('p');
    reflBody.className = 'reflection-body';
    reflBody.textContent = data.reflection;

    reflWrap.appendChild(reflTitle);
    reflWrap.appendChild(reflBody);
    container.appendChild(reflWrap);
  }

  // ── 底部操作栏 ──────────────────────────────────────
  const actionsEl = _renderActions(nodeId, { onNavigate, onStartExam });
  container.appendChild(actionsEl);

  // 更新阅读器状态指示
  updateReaderStatus(nodeId);
}

/**
 * 渲染单个内容块
 */
function _renderBlock(block) {
  if (!block || !block.type) return null;

  switch (block.type) {
    case 'heading':
      return _renderHeading(block);
    case 'paragraph':
      return _renderParagraph(block);
    case 'key-point':
      return _renderKeyPoint(block);
    case 'teaching':
      return _renderTeaching(block);
    case 'quote':
      return _renderQuote(block);
    case 'good-point':
      return _renderGoodPoint(block);
    case 'warning-point':
      return _renderWarningPoint(block);
    case 'list':
      return _renderList(block);
    default:
      // 未知类型：尝试作为段落渲染
      if (block.text) {
        const p = document.createElement('p');
        p.className = 'content-paragraph';
        p.textContent = block.text;
        return p;
      }
      return null;
  }
}

function _renderHeading(block) {
  // level: 'a'/'b'/'c'/'d'/'e' 对应 h3~h6 或自定义 class
  const level = block.level || 'a';
  const tagMap = { 'a': 'h3', 'b': 'h3', 'c': 'h4', 'd': 'h5', 'e': 'h6' };
  const tag = tagMap[level] || 'h3';

  const el = document.createElement(tag);
  el.className = `content-heading level-${level}`;
  el.style.color = LEVEL_COLORS[level] || LEVEL_COLORS['a'];
  el.textContent = block.text || '';
  return el;
}

function _renderParagraph(block) {
  const el = document.createElement('p');
  el.className = 'content-paragraph';

  const text = block.text || '';
  const highlights = block.highlights || [];

  if (!highlights.length) {
    el.textContent = text;
  } else {
    // 将文本按 highlights 拆分为片段，高亮词用 span 包裹
    let html = text;
    // 为避免嵌套问题，按顺序替换（从高优先级到低优先级）
    // 这里简单处理：直接创建文本节点 + highlight span
    // 使用 DocumentFragment 手动构建
    const frag = document.createDocumentFragment();

    // 找到所有高亮词的索引位置（简单方法：顺序替换，不支持重叠）
    let cursor = 0;
    const sorted = [...highlights].sort((a, b) => text.indexOf(a.word) - text.indexOf(b.word));
    // 实际上直接按原文顺序替换
    let remaining = text;
    for (const hl of highlights) {
      const word = hl.word;
      const idx = remaining.indexOf(word);
      if (idx === -1) continue;
      // 前面的普通文本
      if (idx > 0) {
        frag.appendChild(document.createTextNode(remaining.substring(0, idx)));
      }
      // 高亮 span
      const span = document.createElement('span');
      span.className = 'term-highlight';
      span.textContent = word;
      if (hl.explanation) {
        span.setAttribute('data-tooltip', hl.explanation);
        span.title = hl.explanation;
      }
      frag.appendChild(span);
      remaining = remaining.substring(idx + word.length);
    }
    // 剩余文本
    if (remaining) {
      frag.appendChild(document.createTextNode(remaining));
    }
    el.appendChild(frag);
  }

  return el;
}

function _renderKeyPoint(block) {
  const el = document.createElement('div');
  el.className = 'content-key-point';

  const label = document.createElement('div');
  label.className = 'kp-label';
  label.textContent = '核心要点';

  const body = document.createElement('p');
  body.className = 'kp-body';
  body.textContent = block.text || '';

  el.appendChild(label);
  el.appendChild(body);
  return el;
}

function _renderTeaching(block) {
  const el = document.createElement('div');
  el.className = 'content-teaching';

  const label = document.createElement('div');
  label.className = 'teach-label';
  label.textContent = '💡 法师开示';

  const body = document.createElement('p');
  body.className = 'teach-body';
  body.textContent = block.text || '';

  el.appendChild(label);
  el.appendChild(body);
  return el;
}

function _renderQuote(block) {
  const el = document.createElement('div');
  el.className = 'content-quote';

  const body = document.createElement('p');
  body.className = 'quote-body';
  body.textContent = block.text || '';
  if (block.color) {
    body.style.setProperty('--quote-color', block.color);
  }

  el.appendChild(body);
  return el;
}

function _renderGoodPoint(block) {
  const el = document.createElement('div');
  el.className = 'content-good-point';

  const body = document.createElement('p');
  body.className = 'good-body';
  body.textContent = block.text || '';

  el.appendChild(body);
  return el;
}

function _renderWarningPoint(block) {
  const el = document.createElement('div');
  el.className = 'content-warning-point';

  const body = document.createElement('p');
  body.className = 'warning-body';
  body.textContent = block.text || '';

  el.appendChild(body);
  return el;
}

function _renderList(block) {
  const el = document.createElement('ul');
  el.className = 'content-list';

  const items = block.items || [];
  for (const item of items) {
    const li = document.createElement('li');
    li.className = 'content-list-item';
    li.textContent = typeof item === 'string' ? item : (item.text || '');
    el.appendChild(li);
  }

  return el;
}

// ── 底部操作栏 ──────────────────────────────────────────

function _renderActions(nodeId, { onNavigate, onStartExam }) {
  const wrap = document.createElement('div');
  wrap.className = 'reader-actions';

  // 获取前后节点
  const { prev, next } = _getPrevNext(nodeId);
  const currentStatus = defaultState.getProgress(nodeId);

  // 上一章按钮
  const prevBtn = document.createElement('button');
  prevBtn.className = 'reader-btn btn-prev';
  prevBtn.textContent = '← 上一章';
  prevBtn.disabled = !prev;
  prevBtn.addEventListener('click', () => {
    if (prev) {
      if (typeof onNavigate === 'function') {
        onNavigate(prev);
      } else {
        renderContent(wrap.parentElement, prev, { onNavigate, onStartExam });
      }
    }
  });

  // 下一章按钮
  const nextBtn = document.createElement('button');
  nextBtn.className = 'reader-btn btn-next';
  nextBtn.textContent = '下一章 →';
  nextBtn.disabled = !next;
  nextBtn.addEventListener('click', () => {
    if (next) {
      if (typeof onNavigate === 'function') {
        onNavigate(next);
      } else {
        renderContent(wrap.parentElement, next, { onNavigate, onStartExam });
      }
    }
  });

  // 状态按钮组
  const statusWrap = document.createElement('div');
  statusWrap.className = 'reader-status-btns';

  const studyingBtn = document.createElement('button');
  studyingBtn.className = 'reader-btn btn-studying';
  studyingBtn.textContent = '标记为学习中';
  if (currentStatus === 'studying') studyingBtn.classList.add('active');

  const completedBtn = document.createElement('button');
  completedBtn.className = 'reader-btn btn-completed';
  completedBtn.textContent = '标记为已掌握';
  if (currentStatus === 'completed') completedBtn.classList.add('active');

  studyingBtn.addEventListener('click', () => {
    defaultState.setProgress(nodeId, 'studying');
    studyingBtn.classList.add('active');
    completedBtn.classList.remove('active');
    updateReaderStatus(nodeId);
  });

  completedBtn.addEventListener('click', () => {
    defaultState.setProgress(nodeId, 'completed');
    completedBtn.classList.add('active');
    studyingBtn.classList.remove('active');
    // 奖励积分
    defaultState.addPoints(10, `完成章节：${nodeId}`);
    updateReaderStatus(nodeId);
  });

  statusWrap.appendChild(studyingBtn);
  statusWrap.appendChild(completedBtn);

  // 考试按钮
  const examBtn = document.createElement('button');
  examBtn.className = 'reader-btn btn-exam';
  examBtn.textContent = '参加本章考试';
  examBtn.addEventListener('click', () => {
    if (typeof onStartExam === 'function') {
      onStartExam(nodeId);
    }
  });

  wrap.appendChild(prevBtn);
  wrap.appendChild(statusWrap);
  wrap.appendChild(examBtn);
  wrap.appendChild(nextBtn);

  return wrap;
}

// ── 状态更新 ──────────────────────────────────────────

/**
 * 更新阅读器中的状态指示（如头部状态徽章等）
 * @param {string} nodeId
 */
export function updateReaderStatus(nodeId) {
  const status = defaultState.getProgress(nodeId);

  // 更新操作栏中按钮的 active 状态
  const studyingBtn = document.querySelector('.reader-actions .btn-studying');
  const completedBtn = document.querySelector('.reader-actions .btn-completed');
  if (studyingBtn) {
    studyingBtn.classList.toggle('active', status === 'studying');
  }
  if (completedBtn) {
    completedBtn.classList.toggle('active', status === 'completed');
  }
}
