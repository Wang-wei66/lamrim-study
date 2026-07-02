/**
 * 最终修复：把 part2 里的题目分配到正确的节点
 * 直接操作数据对象，然后重新生成文件
 */

import examQuestions from './js/data/exam-questions.js';
import structureData from './js/data/lamrim-structure.js';
import fs from 'fs';

console.log('开始处理...');

// 获取所有有效节点 ID
const validIds = new Set();
const validNodes = [];
function walk(nodes) {
  for (const n of nodes) {
    if (n.id !== 'root') {
      validIds.add(n.id);
      validNodes.push({ id: n.id, title: n.title });
    }
    if (n.children && n.children.length) walk(n.children);
  }
}
walk(structureData.children);

const part2 = examQuestions['part2'] || [];
console.log(`part2 有 ${part2.length} 道题`);

// ── 分配规则 ──────────────────────────────────
// 这些是基于题目内容手动整理的正确分配
// 每个题目 ID -> 目标节点 ID

const ASSIGN_MAP = {
  // ── 仪轨受法 ──────────────────────────────
  436: 'part2-4-2-2-2-3-2-4',
  439: 'part2-4-2-2-2-3-2-4-3',
  440: 'part2-4-2-2-2-3-2-4-2',
  
  // ── 修菩提心次第 ────────────────────────────
  103: 'part2-4-2-2-2-3-2-2',
  104: 'part2-4-2-2-2-3-3-2',
  441: 'part2-4-2-2-2-3-3',
  442: 'part2-4-2-2-2-3-2-2',
  443: 'part2-4-2-2-2-3-3',
  444: 'part2-4-2-2-2-3-2-2',
  445: 'part2-4-2-2-2-3-3',
  
  // ── 学习布施 ─────────────────────────────────
  105: 'part2-4-2-2-2-3-3-1-3-3-1-1',
  106: 'part2-4-2-2-2-3-3-1-3-3-1-1',
  107: 'part2-4-2-2-2-3-3-1-3-3-1-1',
  446: 'part2-4-2-2-2-3-3-1-3-3-1-1',
  447: 'part2-4-2-2-2-3-3-1-3-3-1-3',
  448: 'part2-4-2-2-2-3-3-1-3-3-1-1',
  449: 'part2-4-2-2-2-3-3-1-3-3-1-1',
  450: 'part2-4-2-2-2-3-3-1-3-3-1-4',
  
  // ── 学习持戒 ─────────────────────────────────
  108: 'part2-4-2-2-2-3-3-1-3-3-1-2',
  451: 'part2-4-2-2-2-3-3-1-3-3-1-2',
  452: 'part2-4-2-2-2-3-3-1-3-3-1-2',
  453: 'part2-4-2-2-2-3-3-1-3-3-1-2',
  454: 'part2-4-2-2-2-3-3-1-3-3-1-2',
  455: 'part2-4-2-2-2-3-3-1-3-3-1-2',
  
  // ── 学习忍辱 ─────────────────────────────────
  109: 'part2-4-2-2-2-3-3-1-3-3-1-3',
  456: 'part2-4-2-2-2-3-3-1-3-3-1-3',
  457: 'part2-4-2-2-2-3-3-1-3-3-1-3',
  458: 'part2-4-2-2-2-3-3-1-3-3-1-3',
  459: 'part2-4-2-2-2-3-3-1-3-3-1-3',
  460: 'part2-4-2-2-2-3-3-1-3-3-1-3',
  
  // ── 学习精进 ─────────────────────────────────
  110: 'part2-4-2-2-2-3-3-1-3-3-1-4',
  461: 'part2-4-2-2-2-3-3-1-3-3-1-4',
  462: 'part2-4-2-2-2-3-3-1-3-3-1-4',
  463: 'part2-4-2-2-2-3-3-1-3-3-1-4',
  465: 'part2-4-2-2-2-3-3-1-3-3-1-4',
  
  // ── 学习静虑 ─────────────────────────────────
  111: 'part2-4-2-2-2-3-3-1-3-3-1-5',
  466: 'part2-4-2-2-2-3-3-1-3-3-1-5',
  467: 'part2-4-2-2-2-3-3-1-3-3-1-5',
  468: 'part2-4-2-2-2-3-3-1-3-3-1-5',
  469: 'part2-4-2-2-2-3-3-1-3-3-1-5',
  470: 'part2-4-2-2-2-3-3-1-3-3-1-5',
  
  // ── 学习般若 ─────────────────────────────────
  113: 'part2-4-2-2-2-3-3-1-3-3-1-6',
  115: 'part2-4-2-2-2-3-3-2-6',
  471: 'part2-4-2-2-2-3-3-1-3-3-1-6',
  472: 'part2-4-2-2-2-3-3-1-3-3-1-6',
  473: 'part2-4-2-2-2-3-3-1-3-3-1-6',
  474: 'part2-4-2-2-2-3-3-1-3-3-1-6',
  475: 'part2-4-2-2-2-3-3-1-3-3-1-6',
  
  // ── 止观 ─────────────────────────────────
  476: 'part2-4-2-2-2-3-3-2-6',
  477: 'part2-4-2-2-2-3-3-2-6',
  478: 'part2-4-2-2-2-3-3-2-6',
  479: 'part2-4-2-2-2-3-3-2-6',
  480: 'part2-4-2-2-2-3-3-2-6-1',
  481: 'part2-4-2-2-2-3-3-2-6-2',
  482: 'part2-4-2-2-2-3-3-2-6',
  483: 'part2-4-2-2-2-3-3-2-6',
  484: 'part2-4-2-2-2-3-3-2-6-2',
  485: 'part2-4-2-2-2-3-3-2-6-2',
  
  // ── 正论四门总论（保留在 part2）────────────
  122: 'part2',
  123: 'part2',
  124: 'part2',
  125: 'part2',
  126: 'part2',
};

// 验证所有目标 ID 是否存在
const invalidTargets = new Set();
for (const [qid, tid] of Object.entries(ASSIGN_MAP)) {
  if (tid !== 'part2' && !validIds.has(tid)) {
    invalidTargets.add(tid);
  }
}
if (invalidTargets.size > 0) {
  console.error('错误：以下目标 ID 不存在：');
  for (const tid of invalidTargets) console.error(`  ${tid}`);
  console.error('请修正后重新运行');
  process.exit(1);
}
console.log('✅ 所有目标 ID 验证通过');

// ── 执行移动 ──────────────────────────────────
let movedCount = 0;
for (const [qid, targetId] of Object.entries(ASSIGN_MAP)) {
  if (targetId === 'part2') continue;
  
  const idx = part2.findIndex(q => String(q.id) === String(qid));
  if (idx === -1) {
    console.log(`  警告：找不到 qid=${qid}`);
    continue;
  }
  
  const [q] = part2.splice(idx, 1);
  if (!examQuestions[targetId]) {
    examQuestions[targetId] = [];
  }
  examQuestions[targetId].push(q);
  movedCount++;
}

console.log(`移动了 ${movedCount} 道题`);
console.log(`part2 剩余 ${part2.length} 道题`);

// 更新 part2
examQuestions['part2'] = part2;

// ── 重新生成文件 ──────────────────────────────
let output = `/**
 * 菩提道次第广论 —— 考试题库（最终版）
 * 按章节（科判节点）组织，覆盖广论核心内容
 * 总计 ${Object.values(examQuestions).reduce((s,a) => s + (a?.length || 0), 0) - (examQuestions['scenario']?.length || 0)} 道题 + 20 道场景模拟题
 */

export default {\n`;

const sortedKeys = Object.keys(examQuestions).filter(k => k !== 'scenario').sort();
for (const key of sortedKeys) {
  const qs = examQuestions[key];
  if (!qs || qs.length === 0) continue;
  const node = validNodes.find(n => n.id === key);
  const title = node ? node.title : '';
  output += `  // ${key} — ${title}\n`;
  
  const qsStr = JSON.stringify(qs, null, 4);
  const lines = qsStr.split('\n');
  const formatted = lines.map((line, i) => {
    if (i === 0) return '  ' + line;
    return '    ' + line;
  }).join('\n');
  
  output += `  '${key}': ${formatted},\n\n`;
}

// scenario
output += `  // 场景模拟——佛法在现代生活中的应用（20题）\n`;
const scenarioStr = JSON.stringify(examQuestions['scenario'], null, 4);
const scenarioLines = scenarioStr.split('\n');
const scenarioFormatted = scenarioLines.map((line, i) => {
  if (i === 0) return '  ' + line;
  return '    ' + line;
}).join('\n');
output += `  'scenario': ${scenarioFormatted},\n`;
output += `};\n`;

fs.writeFileSync('/workspace/lamrim-study/js/data/exam-questions.js', output, 'utf8');
console.log('\n✅ 已更新 exam-questions.js');

// 统计
console.log('\n=== 最终统计 ===');
const finalKeys = Object.keys(examQuestions).filter(k => k !== 'scenario').sort();
for (const key of finalKeys) {
  const count = examQuestions[key]?.length || 0;
  if (count > 0) {
    const node = validNodes.find(n => n.id === key);
    console.log(`  ${key} (${node?.title || ''}): ${count} 题`);
  }
}
