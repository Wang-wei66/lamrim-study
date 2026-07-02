/**
 * 精细分配 part2 里的 64 道题到具体节点 v2
 * 使用真实存在的节点 ID
 */

import examQuestions from './js/data/exam-questions.js';
import structureData from './js/data/lamrim-structure.js';
import fs from 'fs';

// 获取所有有效节点
const validNodes = [];
function walk(nodes, depth) {
  for (const n of nodes) {
    if (n.id !== 'root') {
      validNodes.push({ id: n.id, title: n.title, level: n.level, depth });
    }
    if (n.children && n.children.length) {
      walk(n.children, depth + 1);
    }
  }
}
walk(structureData.children, 0);

const validIds = new Set(validNodes.map(n => n.id));

// 检查关键节点是否存在
const CHECK_IDS = [
  'part2-4-2-2-2-3-2-4',       // 仪轨受法
  'part2-4-2-2-2-3-2-4-1',       // 未得令得
  'part2-4-2-2-2-3-2-4-2',       // 已得守护不坏
  'part2-4-2-2-2-3-3-1-3-3-1-1', // 学习布施
  'part2-4-2-2-2-3-3-1-3-3-1-2', // 学习持戒
  'part2-4-2-2-2-3-3-1-3-3-1-3', // 学习忍辱
  'part2-4-2-2-2-3-3-1-3-3-1-4', // 学习精进
  'part2-4-2-2-2-3-3-1-3-3-1-5', // 学习静虑
  'part2-4-2-2-2-3-3-1-3-3-1-6', // 学习般若
  'part2-4-2-2-2-3-3-2-6-1',     // 学奢摩他法
  'part2-4-2-2-2-3-3-2-6-2',     // 学毗钵舍那法
  'part2-4-2-2-2-3-2-2',           // 修菩提心次第
  'part2-4-2-2-2-3-2-1',           // 由依何因如何生起
];

console.log('=== 检查关键节点 ===');
for (const tid of CHECK_IDS) {
  console.log(`  ${validIds.has(tid) ? '✅' : '❌'} ${tid}`);
}

// 获取 part2 里的题目
const part2 = examQuestions['part2'] || [];
console.log(`\npart2 里有 ${part2.length} 道题`);

// 手动分配规则（根据题目内容关键词 -> 真实节点 ID）
// 这些是经过验证的真实 ID
const RULES_V2 = [
  // 仪轨受法（菩提心仪轨、受戒、守护、退失补救）
  { pattern: /仪轨受法|受菩提心仪轨|守护菩提心|菩提心.*退失|设坏还出/i, targetId: 'part2-4-2-2-2-3-2-4' },
  
  // 修菩提心次第（七因果、自他相换）
  { pattern: /修菩提心次第|七种因果|自他相换|七因果/i, targetId: 'part2-4-2-2-2-3-2-2' },
  
  // 由依何因如何生起（发心的因）
  { pattern: /由依何因|如何发生此心/i, targetId: 'part2-4-2-2-2-3-2-1' },
  
  // 发起之量（发心的标准）
  { pattern: /发起之量|发此心.*量/i, targetId: 'part2-4-2-2-2-3-2-3' },
  
  // 学习布施（布施度性、布施差别、惠施道理）
  { pattern: /布施度|布施.*核心|布施.*三种|财施|法施|无畏施|惠施.*田|惠施.*物/i, targetId: 'part2-4-2-2-2-3-3-1-3-3-1-1' },
  
  // 学习持戒（尸罗自性、尸罗差别）
  { pattern: /持戒度|持戒.*核心|三种戒|摄律仪戒|摄善法戒|饶益有情戒/i, targetId: 'part2-4-2-2-2-3-3-1-3-3-1-2' },
  
  // 学习忍辱（忍之自性、忍之差别）
  { pattern: /忍辱度|忍.*核心|耐怨害忍|安受苦忍|谛察法忍/i, targetId: 'part2-4-2-2-2-3-3-1-3-3-1-3' },
  
  // 学习精进（精进自性、精进差别）
  { pattern: /精进度|精进.*核心|擐甲精进|摄善法精进/i, targetId: 'part2-4-2-2-2-3-3-1-3-3-1-4' },
  
  // 学习静虑（静虑自性、静虑差别）
  { pattern: /静虑|禅定.*核心|奢摩他|修止.*资粮/i, targetId: 'part2-4-2-2-2-3-3-1-3-3-1-5' },
  
  // 学习般若（慧之自性、生慧方便）
  { pattern: /般若度|智慧度.*核心|慧之自性|生慧方便/i, targetId: 'part2-4-2-2-2-3-3-1-3-3-1-6' },
  
  // 止观双运（学奢摩他法、学毗钵舍那法）
  { pattern: /止观|奢摩他.*核心|毗钵舍那.*核心|修奢摩他|修毗钵舍那/i, targetId: 'part2-4-2-2-2-3-3-2-6' },
  
  // 愿菩提心、行菩提心（如何发生此心道理 区域）
  { pattern: /愿菩提心|行菩提心|愿心.*行心|既发心已学行道理/i, targetId: 'part2-4-2-2-2-3-2' },
  
  // 显示学习智能方便一分不能成佛（正释学习学处之次第）
  { pattern: /一分不能成佛|学习智能方便/i, targetId: 'part2-4-2-2-2-3-3-2' },
];

// 先处理可以精确匹配的题目
const qidToTarget = {}; // qid -> targetId
const unmatched = [];

for (const q of part2) {
  const qid = String(q.id);
  let matched = false;
  
  for (const rule of RULES_V2) {
    if (rule.pattern.test(q.question) || rule.pattern.test(q.explanation || '')) {
      if (validIds.has(rule.targetId)) {
        qidToTarget[qid] = rule.targetId;
        matched = true;
        break;
      }
    }
  }
  
  if (!matched) {
    unmatched.push(q);
  }
}

console.log(`\n精确匹配: ${Object.keys(qidToTarget).length} 道`);
console.log(`未匹配: ${unmatched.length} 道`);

// 打印未匹配的题目
if (unmatched.length > 0) {
  console.log('\n=== 未匹配的题目 ===');
  unmatched.forEach((q, i) => {
    console.log(`  Q${i+1} (id=${q.id}): ${q.question.substring(0, 60)}`);
  });
}

// 对未匹配的题目做二次分配
// 基于题目内容做更宽泛的匹配
for (const q of unmatched) {
  const qid = String(q.id);
  const text = q.question + ' ' + (q.explanation || '');
  
  if (/六度|六波罗蜜/i.test(text)) {
    // 六度总论 -> 既发心已学行道理
    qidToTarget[qid] = 'part2-4-2-2-2-3-3';
  } else if (/四摄法/i.test(text)) {
    // 四摄 -> 学习四摄熟他有情
    qidToTarget[qid] = 'part2-4-2-2-2-3-3-1-3-4';
  } else if (/正论.*四门|开为四门/i.test(text)) {
    // 正论总论 -> part2（兜底）
    qidToTarget[qid] = 'part2';
  } else {
    // 完全无法匹配 -> part2 兜底
    qidToTarget[qid] = 'part2';
  }
}

// 应用分配：从 part2 移动题目到目标节点
let moved = 0;
for (const [qid, targetId] of Object.entries(qidToTarget)) {
  if (targetId === 'part2') continue;
  
  const idx = part2.findIndex(q => String(q.id) === qid);
  if (idx === -1) continue;
  
  const [qObj] = part2.splice(idx, 1);
  
  if (!examQuestions[targetId]) {
    examQuestions[targetId] = [];
  }
  examQuestions[targetId].push(qObj);
  moved++;
}

console.log(`\n移动了 ${moved} 道题`);
console.log(`part2 剩余 ${part2.length} 道题`);

// 重新生成文件
let output = `/**
 * 菩提道次第广论 —— 考试题库
 * 按章节（科判节点）组织，覆盖广论核心内容
 * 总计 ${Object.values(examQuestions).reduce((s, a) => s + a.length, 0)} 道题 + 20 道场景模拟题
 */

export default {\n`;

const sortedKeys = Object.keys(examQuestions).filter(k => k !== 'scenario').sort();
const nodes = validNodes;

for (const key of sortedKeys) {
  const questions = examQuestions[key];
  if (questions.length === 0) continue;
  const node = nodes.find(n => n.id === key);
  const title = node ? node.title : '';
  output += `  // ${key} — ${title}\n`;
  const qStr = JSON.stringify(questions, null, 4);
  const indented = qStr.split('\n').map((line, i) => {
    if (i === 0) return '  ' + line;
    return '    ' + line;
  }).join('\n');
  output += `  '${key}': ${indented},\n\n`;
}

output += `  // 场景模拟——佛法在现代生活中的应用（20题）\n`;
const scenarioStr = JSON.stringify(examQuestions['scenario'], null, 4);
const scenarioIndented = scenarioStr.split('\n').map((line, i) => {
  if (i === 0) return '  ' + line;
  return '    ' + line;
}).join('\n');
output += `  'scenario': ${scenarioIndented},\n`;
output += `};\n`;

fs.writeFileSync('/workspace/lamrim-study/js/data/exam-questions.js', output, 'utf8');
console.log('\n✅ 已更新 exam-questions.js');

// 打印最终统计
console.log('\n=== 最终统计 ===');
const finalKeys = Object.keys(examQuestions).filter(k => k !== 'scenario').sort();
for (const key of finalKeys) {
  const count = examQuestions[key].length;
  if (count > 0) {
    const node = nodes.find(n => n.id === key);
    console.log(`  ${key} (${node?.title || ''}): ${count} 题`);
  }
}
