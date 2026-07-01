/**
 * 科判目录树模块 (Table of Contents)
 * 负责渲染科判树、搜索、展开/折叠、进度状态显示
 */

import defaultState from '../state.js';
import LAMRIM_STRUCTURE from '../data/lamrim-structure.js';

// ── 内部状态 ──────────────────────────────────────────

// 保存当前搜索过滤状态，避免重复搜索时丢失
let _searchActive = false;
let _searchQuery = '';

// 扁平节点缓存，用于快速查找
let _flatNodes = null;

function _getFlatNodes() {
  if (_flatNodes) return _flatNodes;
  _flatNodes = [];
  function walk(nodes) {
    if (!nodes || !nodes.length) return;
    for (const node of nodes) {
      _flatNodes.push(node);
      if (node.children && node.children.length) {
        walk(node.children);
      }
    }
  }
  walk(LAMRIM_STRUCTURE.children);
  return _flatNodes;
}

// 建立 id → 节点 映射
function _getNodeMap() {
  const map = {};
  for (const n of _getFlatNodes()) {
    map[n.id] = n;
  }
  return map;
}

// 获取节点的所有祖先 id（含自身）
function _getAncestorIds(nodeId) {
  const map = _getNodeMap();
  const ids = [];
  let cur = map[nodeId];
  while (cur) {
    ids.unshift(cur.id);
    // 找到父节点
    const parent = _findParent(cur.id);
    cur = parent;
  }
  return ids;
}

function _findParent(childId) {
  function walk(nodes) {
    for (const node of nodes) {
      if (node.children) {
        for (const c of node.children) {
          if (c.id === childId) return node;
        }
        const found = walk(node.children);
        if (found) return found;
      }
    }
    return null;
  }
  return walk(LAMRIM_STRUCTURE.children);
}

// ── 渲染 ──────────────────────────────────────────────

/**
 * 渲染完整科判树到 container
 * @param {HTMLElement} container - 挂载容器
 * @param {Function} onNodeClick - 点击节点标题时的回调，接收 nodeId
 */
export function renderToc(container, onNodeClick) {
  if (!container) return;
  container.innerHTML = '';

  const fragment = document.createDocumentFragment();

  for (const node of LAMRIM_STRUCTURE.children) {
    const el = _renderNode(node, onNodeClick, 0);
    if (el) fragment.appendChild(el);
  }

  container.appendChild(fragment);
}

/**
 * 渲染单个节点（递归）
 */
function _renderNode(node, onNodeClick, depth) {
  if (!node || !node.id) return null;

  // 用 CSS 类 toc-level-a ~ toc-level-h (支持8层，超过的复用 toc-level-h)
  // 映射：甲→a, 乙→b, 丙→c, 丁→d, 戊→e, 己→f, 庚→g, 辛→h, 壬→h, 癸→h, ...
  const levelMap = { 
    '甲': 'a', '乙': 'b', '丙': 'c', '丁': 'd', '戊': 'e',
    '己': 'f', '庚': 'g', '辛': 'h', '壬': 'h', '癸': 'h',
    '子': 'h', '丑': 'h', '寅': 'h', '卯': 'h', '辰': 'h',
    '巳': 'h', '午': 'h', '未': 'h', '申': 'h', '酉': 'h',
    '戌': 'h', '亥': 'h'
  };
  const levelClass = 'toc-level-' + (levelMap[node.level] || 'h');

  const wrapper = document.createElement('div');
  wrapper.className = `toc-node ${levelClass}`;
  wrapper.dataset.nodeId = node.id;

  // header
  const header = document.createElement('div');
  header.className = 'toc-node-header';

  // toggle（有子节点才显示）
  const toggle = document.createElement('span');
  toggle.className = 'toc-toggle';
  const hasChildren = node.children && node.children.length > 0;
  toggle.textContent = hasChildren ? '▶' : '•';
  toggle.style.visibility = hasChildren ? 'visible' : 'hidden';

  // number
  const numSpan = document.createElement('span');
  numSpan.className = 'toc-number';
  numSpan.textContent = node.number || '';

  // title
  const titleSpan = document.createElement('span');
  titleSpan.className = 'toc-title';
  titleSpan.textContent = node.title || '';

  // status
  const statusSpan = document.createElement('span');
  statusSpan.className = 'toc-status';
  _applyStatusClass(statusSpan, defaultState.getProgress(node.id));

  header.appendChild(toggle);
  header.appendChild(numSpan);
  header.appendChild(titleSpan);
  header.appendChild(statusSpan);
  wrapper.appendChild(header);

  // children container
  const childrenWrap = document.createElement('div');
  childrenWrap.className = 'toc-children';

  if (hasChildren) {
    for (const child of node.children) {
      const childEl = _renderNode(child, onNodeClick, depth + 1);
      if (childEl) childrenWrap.appendChild(childEl);
    }
  }
  wrapper.appendChild(childrenWrap);

  // 默认展开策略：《广论》科判结构很深（21层），
  // 默认全部展开，让用户能完整看到科判树
  // 用户可以通过点击节点来折叠/展开
  _setExpanded(wrapper, true);

  // 点击 header → 切换展开/折叠
  header.addEventListener('click', (e) => {
    // 如果点击的是 titleSpan，交给 title 的点击处理
    if (e.target === titleSpan || e.target === numSpan) return;
    e.stopPropagation();
    _toggleExpand(wrapper);
  });

  // 点击 title → 触发 onNodeClick
  titleSpan.addEventListener('click', (e) => {
    e.stopPropagation();
    if (typeof onNodeClick === 'function') {
      onNodeClick(node.id);
    }
    // 高亮当前节点
    _highlightNode(node.id);
  });

  numSpan.addEventListener('click', (e) => {
    e.stopPropagation();
    if (typeof onNodeClick === 'function') {
      onNodeClick(node.id);
    }
    _highlightNode(node.id);
  });

  return wrapper;
}

function _setExpanded(wrapper, expanded) {
  const childrenWrap = wrapper.querySelector(':scope > .toc-children');
  const toggle = wrapper.querySelector(':scope > .toc-node-header > .toc-toggle');
  if (!childrenWrap) return;
  if (expanded) {
    childrenWrap.style.display = '';
    if (toggle) toggle.textContent = '▼';
    wrapper.classList.add('expanded');
  } else {
    childrenWrap.style.display = 'none';
    if (toggle) toggle.textContent = '▶';
    wrapper.classList.remove('expanded');
  }
}

function _toggleExpand(wrapper) {
  const childrenWrap = wrapper.querySelector(':scope > .toc-children');
  if (!childrenWrap) return;
  const isExpanded = childrenWrap.style.display !== 'none';
  _setExpanded(wrapper, !isExpanded);
}

function _applyStatusClass(statusSpan, progress) {
  statusSpan.className = 'toc-status';
  if (progress === 'completed') {
    statusSpan.classList.add('done');
  } else if (progress === 'studying') {
    statusSpan.classList.add('doing');
  } else {
    statusSpan.classList.add('locked');
  }
}

// 存储当前高亮节点 id，用于清除上一次高亮
let _lastHighlightedId = null;

function _highlightNode(nodeId) {
  // 清除旧高亮
  if (_lastHighlightedId) {
    const oldEls = document.querySelectorAll(`[data-node-id="${_lastHighlightedId}"]`);
    oldEls.forEach(el => el.classList.remove('active'));
  }
  const els = document.querySelectorAll(`[data-node-id="${nodeId}"]`);
  els.forEach(el => el.classList.add('active'));
  _lastHighlightedId = nodeId;
}

// ── 公开 API ──────────────────────────────────────────

/**
 * 更新某个节点的进度状态 UI
 * @param {string} nodeId
 * @param {string} status - 'locked' | 'studying' | 'completed'
 */
export function updateTocProgress(nodeId, status) {
  const statusSpans = document.querySelectorAll(
    `.toc-node[data-node-id="${nodeId}"] .toc-status`
  );
  statusSpans.forEach(span => _applyStatusClass(span, status));
}

/**
 * 展开至指定节点（所有祖先节点展开），并滚动可见、高亮
 * @param {string} nodeId
 */
export function expandToNode(nodeId) {
  const ancestorIds = _getAncestorIds(nodeId);

  // 展开所有祖先
  for (const aid of ancestorIds) {
    const wrappers = document.querySelectorAll(
      `.toc-node[data-node-id="${aid}"]`
    );
    wrappers.forEach(w => _setExpanded(w, true));
  }

  // 滚动到目标节点
  const targetEls = document.querySelectorAll(
    `.toc-node[data-node-id="${nodeId}"]`
  );
  if (targetEls.length > 0) {
    const first = targetEls[0];
    first.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    _highlightNode(nodeId);
  }

  // 如果正在搜索，退出搜索模式（显示所有节点）
  if (_searchActive) {
    _clearSearch();
  }
}

/**
 * 搜索科判树
 * @param {string} query - 搜索关键词
 */
export function searchToc(query) {
  if (!query || !query.trim()) {
    _clearSearch();
    return;
  }
  const q = query.trim().toLowerCase();
  _searchQuery = q;
  _searchActive = true;

  const allNodes = _getFlatNodes();
  const matchedIds = new Set();

  for (const node of allNodes) {
    if (node.title && node.title.toLowerCase().includes(q)) {
      matchedIds.add(node.id);
      // 包含该节点所有祖先
      const ancestors = _getAncestorIds(node.id);
      for (const aid of ancestors) matchedIds.add(aid);
    }
  }

  // 遍历所有 DOM 节点，匹配则显示并展开祖先，不匹配则隐藏
  const allWrappers = document.querySelectorAll('.toc-node');
  allWrappers.forEach(wrapper => {
    const nid = wrapper.dataset.nodeId;
    if (matchedIds.has(nid)) {
      wrapper.style.display = '';
      wrapper.classList.add('search-match');
      // 展开该节点
      _setExpanded(wrapper, true);
    } else {
      wrapper.style.display = 'none';
      wrapper.classList.remove('search-match');
    }
  });
}

function _clearSearch() {
  _searchActive = false;
  _searchQuery = '';
  const allWrappers = document.querySelectorAll('.toc-node');
  allWrappers.forEach(wrapper => {
    wrapper.style.display = '';
    wrapper.classList.remove('search-match');
  });
  // 恢复默认展开状态：根节点和第一级展开
  allWrappers.forEach(wrapper => {
    const depth = _getDepth(wrapper);
    if (depth <= 1) {
      _setExpanded(wrapper, true);
    } else {
      _setExpanded(wrapper, false);
    }
  });
}

function _getDepth(wrapper) {
  let depth = 0;
  let el = wrapper;
  while (el) {
    if (el.classList && el.classList.contains('toc-children')) depth++;
    el = el.parentElement;
  }
  return depth;
}
