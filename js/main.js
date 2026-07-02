/**
 * 菩提道次第广论 - 交互式学习网站
 * 主控制器
 */

import studyState from './state.js';
import structureData from './data/lamrim-structure.js';
import { renderToc, updateTocProgress, expandToNode, searchToc } from './modules/toc.js';
import { renderContent, updateReaderStatus } from './modules/reader.js';
import { renderExam } from './modules/exam.js';
import { renderProgress } from './modules/progress.js';
import { renderPoints } from './modules/points.js';
import { renderProfile } from './modules/profile.js';

// ---------- DOM 引用 ----------
const tocTree = document.getElementById('toc-tree');
const contentArea = document.getElementById('content-area');
const readerContainer = document.getElementById('reader-container');
const examContainer = document.getElementById('exam-container');
const progressContainer = document.getElementById('progress-container');
const pointsContainer = document.getElementById('points-container');
const profileContainer = document.getElementById('profile-container');
const progressFill = document.getElementById('progress-fill');
const progressText = document.getElementById('progress-text');
const pointsValue = document.getElementById('points-value');
const footerPoints = document.getElementById('footer-points');
const footerChapters = document.getElementById('footer-chapters');
const footerExams = document.getElementById('footer-exams');
const completedCount = document.getElementById('completed-count');
const totalCount = document.getElementById('total-count');
const searchInput = document.getElementById('search-input');
const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');
const sidebarClose = document.getElementById('sidebar-close');
const sidebarOverlay = document.getElementById('sidebar-overlay');
const modalContainer = document.getElementById('modal-container');
const modalBody = document.getElementById('modal-body');
const modalClose = document.getElementById('modal-close');

// ---------- 页面管理 ----------
let currentPage = 'welcome';
let currentNodeId = null;

function showPage(pageName) {
  currentPage = pageName;
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const page = document.getElementById(`page-${pageName}`);
  if (page) page.classList.add('active');
  contentArea.scrollTop = 0;
}

// ---------- 节点点击处理 ----------
function onTocNodeClick(nodeId) {
  currentNodeId = nodeId;
  showPage('reader');
  studyState.setProgress(nodeId, 'studying');
  studyState.startStudySession();
  renderContent(readerContainer, nodeId, {
    onPrev: getPrevNode,
    onNext: getNextNode,
    onStartExam: () => {
      showPage('exam');
      renderExam(examContainer, nodeId);
    }
  });
  updateTocProgress(nodeId, 'studying');
  updateUIStats();
}

// 获取所有有内容节点的扁平列表（按树遍历顺序，包含非叶子节点）
function getAllContentNodes(node = structureData) {
  const nodes = [];
  function traverse(n) {
    if (n.id !== 'root') {
      // 检查该节点是否有内容数据（lamrim-content.js 中已定义）
      // 所有科判节点都应该可以点击查看，不仅仅是叶子节点
      nodes.push(n);
    }
    if (n.children && n.children.length) {
      n.children.forEach(traverse);
    }
  }
  traverse(node);
  return nodes;
}

const allContentNodes = getAllContentNodes();

function getPrevNode(nodeId) {
  const idx = allContentNodes.findIndex(n => n.id === nodeId);
  return idx > 0 ? allContentNodes[idx - 1].id : null;
}

function getNextNode(nodeId) {
  const idx = allContentNodes.findIndex(n => n.id === nodeId);
  return idx < allContentNodes.length - 1 ? allContentNodes[idx + 1].id : null;
}

// ---------- 全局统计更新 ----------
function updateUIStats() {
  const progress = studyState.getOverallProgress();
  progressFill.style.width = `${progress}%`;
  progressText.textContent = `学习进度 ${Math.round(progress)}%`;

  const pts = studyState.getPoints();
  pointsValue.textContent = pts;
  footerPoints.textContent = pts;

  const stats = studyState.getStudyStats();
  const completed = Object.values(studyState.state?.progress || {}).filter(s => s === 'completed').length;
  footerChapters.textContent = completed;

  const exams = studyState.getExamRecords();
  const passed = exams.filter(e => e.score >= 60).length;
  footerExams.textContent = passed;

  completedCount.textContent = completed;
  totalCount.textContent = allContentNodes.length;
}

// ---------- 弹窗 ----------
function openModal(content) {
  modalBody.innerHTML = '';
  if (typeof content === 'string') {
    modalBody.innerHTML = content;
  } else if (content instanceof HTMLElement) {
    modalBody.appendChild(content);
  }
  modalContainer.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modalContainer.classList.add('hidden');
  document.body.style.overflow = '';
}

modalClose?.addEventListener('click', closeModal);
modalContainer?.querySelector('.modal-overlay')?.addEventListener('click', closeModal);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !modalContainer.classList.contains('hidden')) {
    closeModal();
  }
});

// ---------- 侧栏控制 ----------
function openSidebar() {
  sidebar.classList.add('open');
  sidebarOverlay.classList.remove('hidden');
}

function closeSidebar() {
  sidebar.classList.remove('open');
  sidebarOverlay.classList.add('hidden');
}

menuToggle?.addEventListener('click', openSidebar);
sidebarClose?.addEventListener('click', closeSidebar);
sidebarOverlay?.addEventListener('click', closeSidebar);

// ---------- 搜索 ----------
searchInput?.addEventListener('input', (e) => {
  const query = e.target.value.trim();
  searchToc(query);
});

// ---------- 欢迎页按钮 ----------
document.getElementById('btn-start-study')?.addEventListener('click', () => {
  // 找到第一个有内容的节点
  if (allContentNodes.length > 0) {
    onTocNodeClick(allContentNodes[0].id);
    expandToNode(allContentNodes[0].id);
  }
});

document.getElementById('btn-take-exam')?.addEventListener('click', () => {
  showPage('exam');
  // 默认选择最近学习的章节
  if (currentNodeId) {
    renderExam(examContainer, currentNodeId);
  } else {
    renderExam(examContainer, null);
  }
});

// 场景模拟按钮
document.getElementById('btn-scenario')?.addEventListener('click', () => {
  showPage('exam');
  renderExam(examContainer, 'scenario');
});

// ---------- 顶部按钮 ----------
document.getElementById('btn-points')?.addEventListener('click', () => {
  showPage('points');
  renderPoints(pointsContainer);
});

document.getElementById('btn-profile')?.addEventListener('click', () => {
  showPage('profile');
  renderProfile(profileContainer);
});

// ---------- 欢迎页卡片点击 ----------
document.querySelector('.welcome-features')?.addEventListener('click', (e) => {
  const card = e.target.closest('.feature-card');
  if (!card) return;
  const name = card.querySelector('.feature-name')?.textContent;
  if (name === '完整科判' && allContentNodes.length > 0) {
    onTocNodeClick(allContentNodes[0].id);
    expandToNode(allContentNodes[0].id);
  } else if (name === '考试测试') {
    showPage('exam');
    renderExam(examContainer, currentNodeId || null);
  } else if (name === '积分成就') {
    showPage('points');
    renderPoints(pointsContainer);
  } else if (name === '颜色区分' && allContentNodes.length > 0) {
    onTocNodeClick(allContentNodes[0].id);
    expandToNode(allContentNodes[0].id);
  }
});

// ---------- 全局页面暴露 ----------
window.showPage = showPage;
window.renderExam = (chapterId) => {
  showPage('exam');
  renderExam(examContainer, chapterId);
};
window.renderProfile = () => {
  showPage('profile');
  renderProfile(profileContainer);
};
window.renderPoints = () => {
  showPage('points');
  renderPoints(pointsContainer);
};
window.renderProgress = () => {
  showPage('progress');
  renderProgress(progressContainer);
};

// ---------- 状态变化监听 ----------
studyState.onChange(() => {
  updateUIStats();
});

// ---------- 初始化 ----------
function init() {
  // 渲染科判树
  renderToc(tocTree, onTocNodeClick);

  // 恢复上次学习进度
  const lastNode = studyState.state?.lastNodeId;
  if (lastNode) {
    currentNodeId = lastNode;
  }

  // 更新统计
  updateUIStats();

  // 每日打卡
  studyState.checkin();

  console.log('🪷 菩提道次第广论学习网站已就绪');
  console.log(`   共 ${allContentNodes.length} 个学习节点`);
  console.log(`   积分: ${studyState.getPoints()} | 等级: ${studyState.getLevel().name}`);

  // 监听页面切换时保存
  window.addEventListener('beforeunload', () => {
    studyState.endStudySession();
    if (currentNodeId) {
      studyState.state.lastNodeId = currentNodeId;
      studyState.save();
    }
  });

  // 定期保存学习时长
  setInterval(() => {
    studyState.save();
  }, 30000);
}

// 暴露到全局
window.__studyState = studyState;
window.__structure = structureData;
window.__examQuestions = examQuestions;

init();
