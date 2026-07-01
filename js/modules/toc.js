/**
 * 目录模块 (Table of Contents - 重新设计版)
 * 
 * 将473个科判节点重组为4大学习路径的目录：
 * - 道前基础
 * - 共下士道
 * - 共中士道  
 * - 上士道
 * 
 * 每个目录项点击可跳转到对应章节内容
 * 默认全部展开，以目录形式展示完整层级
 */

import defaultState from '../state.js';
import LAMRIM_STRUCTURE from '../data/lamrim-structure.js';

// ── 学习路径分组 ──────────────────────────────────────────

/**
 * 将473个科判节点按学习路径分为4大类
 * 基于传统《广论》学习路径：
 *   道前基础 = 乙一(造者殊胜) + 乙二(教授殊胜) + 乙三(讲闻轨理) + 丙一(亲近知识) + 丁一(修持轨理) + 丁一(暇满) + 丁二(道总建立)
 *   共下士道 = 己一(下士意乐:念死无常+三恶趣+皈依+业果) + 发此意乐之量 + 除遣邪执
 *   共中士道 = 己二(中士意乐:苦谛+集谛+十二缘起) + 生起之量 + 除遣邪执 + 解脱道
 *   上士道   = 己三(入大乘门+菩提心+仪轨受法+学行道理+六度+止观)
 */

// 从科判树中提取路径信息
const PATH_CONFIG = [
  {
    id: 'path-daoqian',
    title: '道前基础',
    icon: '📖',
    color: '#8B0000',
    description: '造者殊胜、教授殊胜、讲闻轨理、亲近善知识、修持轨理、暇满义大、道总建立',
    // 道前基础对应的顶层节点
    sourceNodes: ['part2-1', 'part2-2', 'part2-3', 'part2-4-1', 'part2-4-2-1', 'part2-4-2-2-1']
  },
  {
    id: 'path-xiashi',
    title: '共下士道',
    icon: '🌱',
    color: '#B8860B',
    description: '念死无常、三恶趣苦、皈依三宝、深信业果',
    sourceNodes: ['part2-4-2-2-2-1']
  },
  {
    id: 'path-zhongshi',
    title: '共中士道',
    icon: '🌿',
    color: '#2E7D32',
    description: '希求解脱、思惟苦谛、思惟集谛、十二缘起、解脱正道',
    sourceNodes: ['part2-4-2-2-2-2']
  },
  {
    id: 'path-shangshi',
    title: '上士道',
    icon: '🪷',
    color: '#6A1B9A',
    description: '入大乘门、菩提心次第、仪轨受法、学菩萨行、六度四摄、止观',
    sourceNodes: ['part2-4-2-2-2-3']
  }
];

// ── 节点查找工具 ──────────────────────────────────────────

function _findNodeById(nodeId, nodes = LAMRIM_STRUCTURE.children) {
  for (const node of nodes) {
    if (node.id === nodeId) return node;
    if (node.children && node.children.length) {
      const found = _findNodeById(nodeId, node.children);
      if (found) return found;
    }
  }
  return null;
}

function _findParent(childId, nodes = LAMRIM_STRUCTURE.children) {
  for (const node of nodes) {
    if (node.children) {
      for (const c of node.children) {
        if (c.id === childId) return node;
      }
      const found = _findParent(childId, node.children);
      if (found) return found;
    }
  }
  return null;
}

// ── 层级映射 ──────────────────────────────────────────

const LEVEL_MAP = {
  '甲': 'a', '乙': 'b', '丙': 'c', '丁': 'd', '戊': 'e',
  '己': 'f', '庚': 'g', '辛': 'h', '壬': 'i', '癸': 'j',
  '子': 'k', '丑': 'l', '寅': 'm', '卯': 'n', '辰': 'o',
  '巳': 'p', '午': 'q', '未': 'r', '申': 's', '酉': 't',
  '戌': 'u', '亥': 'v'
};

// ── 渲染 ──────────────────────────────────────────

/**
 * 渲染目录到 container
 * @param {HTMLElement} container
 * @param {Function} onNodeClick - 点击节点回调
 */
export function renderToc(container, onNodeClick) {
  if (!container) return;
  container.innerHTML = '';

  // 归敬颂单独放在最前面
  const guijingNode = _findNodeById('part1');
  if (guijingNode) {
    const itemEl = _renderDirectoryItem(guijingNode, 0, onNodeClick, '#8B0000');
    container.appendChild(itemEl);
  }

  // 4大学习路径
  for (const pathConfig of PATH_CONFIG) {
    // 路径标题卡片
    const pathCard = document.createElement('div');
    pathCard.className = 'toc-path-card';
    pathCard.dataset.pathId = pathConfig.id;

    const pathHeader = document.createElement('div');
    pathHeader.className = 'toc-path-header';
    pathHeader.style.borderLeftColor = pathConfig.color;

    const pathIcon = document.createElement('span');
    pathIcon.className = 'toc-path-icon';
    pathIcon.textContent = pathConfig.icon;

    const pathTitle = document.createElement('span');
    pathTitle.className = 'toc-path-title';
    pathTitle.textContent = pathConfig.title;
    pathTitle.style.color = pathConfig.color;

    const pathDesc = document.createElement('span');
    pathDesc.className = 'toc-path-desc';
    pathDesc.textContent = pathConfig.description;

    pathHeader.appendChild(pathIcon);
    pathHeader.appendChild(pathTitle);
    pathHeader.appendChild(pathDesc);
    pathCard.appendChild(pathHeader);

    // 该路径下的所有节点
    const pathContent = document.createElement('div');
    pathContent.className = 'toc-path-content';

    for (const sourceNodeId of pathConfig.sourceNodes) {
      const sourceNode = _findNodeById(sourceNodeId);
      if (!sourceNode) continue;
      _renderNodeTree(sourceNode, 1, pathContent, onNodeClick, pathConfig.color);
    }

    pathCard.appendChild(pathContent);
    container.appendChild(pathCard);
  }
}

/**
 * 递归渲染节点树（目录形式，全部展开）
 */
function _renderNodeTree(node, depth, container, onNodeClick, pathColor) {
  if (!node || !node.id) return;

  const itemEl = _renderDirectoryItem(node, depth, onNodeClick, pathColor);
  container.appendChild(itemEl);

  // 递归渲染子节点（全部展开）
  if (node.children && node.children.length > 0) {
    const childrenWrap = document.createElement('div');
    childrenWrap.className = 'toc-dir-children';
    childrenWrap.style.paddingLeft = (depth <= 1 ? '8px' : '12px');
    
    for (const child of node.children) {
      _renderNodeTree(child, depth + 1, childrenWrap, onNodeClick, pathColor);
    }
    
    itemEl.appendChild(childrenWrap);
  }
}

/**
 * 渲染单个目录条目
 */
function _renderDirectoryItem(node, depth, onNodeClick, pathColor) {
  const item = document.createElement('div');
  item.className = 'toc-dir-item';
  item.dataset.nodeId = node.id;
  item.dataset.depth = depth;

  const levelClass = LEVEL_MAP[node.level] || 'h';
  
  // 行条目
  const row = document.createElement('div');
  row.className = `toc-dir-row depth-${Math.min(depth, 5)}`;
  row.style.borderLeftColor = depth <= 1 ? pathColor : '';

  // 层级标记
  const levelBadge = document.createElement('span');
  levelBadge.className = 'toc-dir-level level-' + levelClass;
  levelBadge.textContent = node.number || '';
  if (depth <= 2) {
    levelBadge.style.color = pathColor;
  }

  // 标题
  const titleSpan = document.createElement('span');
  titleSpan.className = 'toc-dir-title';
  titleSpan.textContent = node.title || '';
  // 根据深度调整字号和粗细
  if (depth === 0) {
    titleSpan.style.fontWeight = '700';
    titleSpan.style.fontSize = '15px';
  } else if (depth === 1) {
    titleSpan.style.fontWeight = '600';
    titleSpan.style.fontSize = '14px';
  } else if (depth === 2) {
    titleSpan.style.fontWeight = '500';
    titleSpan.style.fontSize = '13px';
  } else {
    titleSpan.style.fontWeight = '400';
    titleSpan.style.fontSize = depth >= 4 ? '12px' : '13px';
  }

  // 进度标记
  const progressDot = document.createElement('span');
  progressDot.className = 'toc-dir-progress';
  const status = defaultState.getProgress(node.id);
  if (status === 'completed') {
    progressDot.classList.add('done');
    progressDot.textContent = '✓';
  } else if (status === 'studying') {
    progressDot.classList.add('doing');
    progressDot.textContent = '◐';
  } else {
    progressDot.classList.add('locked');
  }

  row.appendChild(levelBadge);
  row.appendChild(titleSpan);
  row.appendChild(progressDot);
  item.appendChild(row);

  // 点击整行跳转
  row.addEventListener('click', (e) => {
    e.stopPropagation();
    if (typeof onNodeClick === 'function') {
      onNodeClick(node.id);
    }
    _highlightNode(node.id);
  });

  return item;
}

// ── 高亮 ──────────────────────────────────────────

let _lastHighlightedId = null;

function _highlightNode(nodeId) {
  // 清除旧高亮
  if (_lastHighlightedId) {
    const oldEls = document.querySelectorAll(`[data-node-id="${_lastHighlightedId}"] .toc-dir-row`);
    oldEls.forEach(el => el.classList.remove('active'));
  }
  const els = document.querySelectorAll(`[data-node-id="${nodeId}"] .toc-dir-row`);
  els.forEach(el => el.classList.add('active'));
  _lastHighlightedId = nodeId;
}

// ── 公开 API ──────────────────────────────────────────

/**
 * 更新某个节点的进度状态 UI
 */
export function updateTocProgress(nodeId, status) {
  const items = document.querySelectorAll(`[data-node-id="${nodeId}"] .toc-dir-progress`);
  items.forEach(dot => {
    dot.className = 'toc-dir-progress';
    if (status === 'completed') {
      dot.classList.add('done');
      dot.textContent = '✓';
    } else if (status === 'studying') {
      dot.classList.add('doing');
      dot.textContent = '◐';
    } else {
      dot.classList.add('locked');
    }
  });
}

/**
 * 展开至指定节点并滚动可见、高亮
 */
export function expandToNode(nodeId) {
  // 目录模式下全部展开，只需滚动和高亮
  const targetEls = document.querySelectorAll(`[data-node-id="${nodeId}"]`);
  if (targetEls.length > 0) {
    const first = targetEls[0];
    first.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    _highlightNode(nodeId);
  }

  // 如果正在搜索，退出搜索模式
  if (_searchActive) {
    _clearSearch();
  }
}

/**
 * 搜索目录
 */
let _searchActive = false;
let _searchQuery = '';

export function searchToc(query) {
  if (!query || !query.trim()) {
    _clearSearch();
    return;
  }
  const q = query.trim().toLowerCase();
  _searchQuery = q;
  _searchActive = true;

  // 收集所有节点
  const allNodes = _getAllFlatNodes();
  const matchedIds = new Set();

  for (const node of allNodes) {
    if (node.title && node.title.toLowerCase().includes(q)) {
      matchedIds.add(node.id);
      // 也包含所有祖先
      const ancestors = _getAncestorIds(node.id);
      for (const aid of ancestors) matchedIds.add(aid);
    }
  }

  // 遍历所有目录条目DOM
  const allItems = document.querySelectorAll('.toc-dir-item');
  allItems.forEach(item => {
    const nid = item.dataset.nodeId;
    if (matchedIds.has(nid)) {
      item.style.display = '';
      item.classList.add('search-match');
    } else {
      item.style.display = 'none';
      item.classList.remove('search-match');
    }
  });

  // 路径卡片也根据是否有匹配的子节点来显示/隐藏
  const pathCards = document.querySelectorAll('.toc-path-card');
  pathCards.forEach(card => {
    const visibleChildren = card.querySelectorAll('.toc-dir-item:not([style*="display: none"])');
    card.style.display = visibleChildren.length > 0 ? '' : 'none';
  });
}

function _clearSearch() {
  _searchActive = false;
  _searchQuery = '';
  const allItems = document.querySelectorAll('.toc-dir-item');
  allItems.forEach(item => {
    item.style.display = '';
    item.classList.remove('search-match');
  });
  const pathCards = document.querySelectorAll('.toc-path-card');
  pathCards.forEach(card => {
    card.style.display = '';
  });
}

// ── 节点查找辅助 ──────────────────────────────────────────

let _flatNodesCache = null;

function _getAllFlatNodes() {
  if (_flatNodesCache) return _flatNodesCache;
  _flatNodesCache = [];
  function walk(nodes) {
    if (!nodes || !nodes.length) return;
    for (const node of nodes) {
      _flatNodesCache.push(node);
      if (node.children && node.children.length) {
        walk(node.children);
      }
    }
  }
  walk(LAMRIM_STRUCTURE.children);
  return _flatNodesCache;
}

function _getAncestorIds(nodeId) {
  const ids = [];
  let cur = _findNodeById(nodeId);
  while (cur) {
    ids.unshift(cur.id);
    cur = _findParent(cur.id);
  }
  return ids;
}
