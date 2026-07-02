/**
 * 最终修复：把 part2 里的 64 道题分配到正确的节点
 * 
 * 策略：分配到最相关的、真实存在的节点
 * 由于很多题目内容比较概括，分配到对应的父节点是合理的
 */

import examQuestions from './js/data/exam-questions.js';
import structureData from './js/data/lamrim-structure.js';
import fs from 'fs';

// 获取所有有效节点
const validNodes = [];
const validIds = new Set();
function walk(nodes) {
  for (const n of nodes) {
    if (n.id !== 'root') {
      validNodes.push({ id: n.id, title: n.title });
      validIds.add(n.id);
    }
    if (n.children) walk(n.children);
  }
}
walk(structureData.children);

const part2 = examQuestions['part2'] || [];
console.log(`part2 有 ${part2.length} 道题`);

// ── 分配规则 ─────────────────────────────────────────────
// 把这些题目分配到真实存在的节点
// 经过验证，以下 ID 都是真实存在的

const FINAL_MAP = [
  // ── 仪轨受法、菩提心守护 ─────────────────
  { ids: [436, 439, 440], target: 'part2-4-2-2-2-3-2-4' },
  
  // ── 修菩提心次第、七因果、自他相换 ─────────
  { ids: [103, 104, 441, 442], target: 'part2-4-2-2-2-3-2-2' },
  { ids: [443, 444, 445], target: 'part2-4-2-2-2-3-3' },
  
  // ── 学习六度（布施、持戒、忍辱、精进、静虑、般若）──
  // 这些题目比较概括，分配到"既发心已学行道理"（part2-4-2-2-2-3-3）
  // 或者更具体的节点
  { ids: [105, 106, 107, 446, 447, 448, 449, 450],
    target: 'part2-4-2-2-2-3-3-1-3-3-1-1' },  // 学习布施
  { ids: [108, 451, 452, 453, 454, 455],
    target: 'part2-4-2-2-2-3-3-1-3-3-1-2' },  // 学习持戒
  { ids: [109, 456, 457, 458, 459, 460],
    target: 'part2-4-2-2-2-3-3-1-3-3-1-3' },  // 学习忍辱
  { ids: [110, 461, 462, 463, 465],
    target: 'part2-4-2-2-2-3-3-1-3-3-1-4' },  // 学习精进
  { ids: [111, 466, 467, 468, 469, 470],
    target: 'part2-4-2-2-2-3-3-1-3-3-1-5' },  // 学习静虑
  { ids: [113, 115, 471, 472, 473, 474, 475],
    target: 'part2-4-2-2-2-3-3-1-3-3-1-6' },  // 学习般若
  
  // ── 止观 ─────────────────────────────────────
  { ids: [476, 477, 478, 479, 480],
    target: 'part2-4-2-2-2-3-3-2-6-1' },  // 学奢摩他法
  { ids: [481, 482, 483, 484, 485],
    target: 'part2-4-2-2-2-3-3-2-6-2' },  // 学毗钵舍那法
  
  // ── 正论四门总论（保留在 part2）───────────────
  { ids: [122, 123, 124, 125, 126], target: 'part2' },
];

// 验证所有目标 ID
const invalid = FINAL_MAP.filter(r => !validIds.has(r.target) && r.target !== 'part2');
if (invalid.length > 0) {
  console.error('错误：以下目标 ID 不存在：');
  invalid.forEach(r => console.error(`  ${r.target}`));
  process.exit(1);
}
console.log('✅ 所有目标 ID 验证通过');

// ── 执行分配 ─────────────────────────────────────────────
let moved = 0;
for (const rule of FINAL_MAP) {
  const targetId = rule.target;
  if (targetId === 'part2') continue;
  
  for (const qid of rule.ids) {
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
    moved++;
  }
}

// 更新 part2
examQuestions['part2'] = part2;

console.log(`移动了 ${moved} 道题`);
console.log(`part2 剩余 ${part2.length} 道题`);

// ── 重新生成文件 ─────────────────────────────────────────
let output = `/**
 * 菩提道次第广论 —— 考试题库（最终版）
 * 按章节（科判节点）组织，覆盖广论核心内容
 * 总计 ${Object.values(examQuestions).reduce((s,a) => s + a.length, 0) - (examQuestions['scenario']?.length || 0)} 道题 + 20 道场景模拟题
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
const scenarioFmt = scenarioLines.map((line, i) => {
  if (i === 0) return '  ' + line;
  return '    ' + line;
}).join('\n');
output += `  'scenario': ${scenarioFmt},\n`;
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
