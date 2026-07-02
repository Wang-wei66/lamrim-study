/**
 * 精细分配 part2 里的 64 道题到具体节点
 * 
 * 题目内容分析：
 * Q1-Q17：关于上士道、发菩提心、菩萨戒、六度总论——属于 part2-4-2-2-3 区域
 * Q18-Q22：菩提心仪轨、愿行菩提心——属于 part2-4-2-2-3-2-4（仪轨受法）
 * Q23-Q45：六度（布施、持戒、忍辱、精进）——属于 part2-4-2-2-3-3-1-3-3（学习六度）
 * Q46-Q50：静虑度（禅定）——属于 part2-4-2-2-3-3-1-3-3-1-5（学习静虑）
 * Q51-Q54：般若度（智慧）——属于 part2-4-2-2-3-3-1-3-3-1-6（学习般若）
 * Q55-Q60：止观（奢摩他、毗钵舍那）——属于 part2-4-2-2-3-3-2（特于后二波罗蜜多学习道理 / 止观）
 * Q61-Q64：止观关系、修观断烦恼——同上
 */

import examQuestions from './js/data/exam-questions.js';
import structureData from './js/data/lamrim-structure.js';
import fs from 'fs';

// 验证节点是否存在
function findNode(nodes, targetId) {
  for (const n of nodes) {
    if (n.id === targetId) return n;
    if (n.children && n.children.length) {
      const found = findNode(n.children, targetId);
      if (found) return found;
    }
  }
  return null;
}

// 检查所有目标节点是否存在
const targetIds = [
  'part2-4-2-2-3-2-4',           // 仪轨受法
  'part2-4-2-2-3-2-4-1',       // 未得令得
  'part2-4-2-2-3-2-4-2',       // 已得守护不坏
  'part2-4-2-2-3-3-1-3-3-1-1', // 学习布施
  'part2-4-2-2-3-3-1-3-3-1-2', // 学习持戒
  'part2-4-2-2-3-3-1-3-3-1-3', // 学习忍辱
  'part2-4-2-2-3-3-1-3-3-1-4', // 学习精进
  'part2-4-2-2-3-3-1-3-3-1-5', // 学习静虑
  'part2-4-2-2-3-3-1-3-3-1-6', // 学习般若
  'part2-4-2-2-3-3-2-6-1',     // 学奢摩他法（止）
  'part2-4-2-2-3-3-2-6-2',     // 学毗钵舍那法（观）
];

console.log('=== 检查目标节点是否存在 ===');
const validTargets = new Set();
for (const tid of targetIds) {
  const node = findNode(structureData.children, tid);
  if (node) {
    console.log(`  ✅ ${tid}: ${node.title}`);
    validTargets.add(tid);
  } else {
    console.log(`  ❌ ${tid}: 不存在！`);
  }
}

// 获取 part2 里的题目
const part2 = examQuestions['part2'] || [];
console.log(`\npart2 里有 ${part2.length} 道题`);

// 手动分配规则（根据题目 id 范围）
// 这些 ID 是从 print-part2.mjs 的输出中整理出来的
const MANUAL_RULES = [
  // 仪轨受法（Q18=id436, Q19=id439, Q20=id440）
  { idRange: [436, 440], targetId: 'part2-4-2-2-3-2-4' },
  
  // 发心已后须学学处（Q21=id441 ~ Q45 关于六度）
  // 布施度（Q4=id105, Q6=id107, Q26=id446, Q27=id447, Q28=id448, Q29=id449, Q30=id450）
  { ids: [105, 107, 446, 447, 448, 449, 450], targetId: 'part2-4-2-2-3-3-1-3-3-1-1' },
  
  // 持戒度（Q7=id108, Q31=id451, Q32=id452, Q33=id453, Q34=id454, Q35=id455）
  { ids: [108, 451, 452, 453, 454, 455], targetId: 'part2-4-2-2-3-3-1-3-3-1-2' },
  
  // 忍辱度（Q8=id109, Q36=id456, Q37=id457, Q38=id458, Q39=id459, Q40=id460, Q41=id461）
  { ids: [109, 456, 457, 458, 459, 460, 461], targetId: 'part2-4-2-2-3-3-1-3-3-1-3' },
    
  // 精进度（Q9=id110, Q42=id462, Q43=id463, Q44=id465）
  { ids: [110, 462, 463, 465], targetId: 'part2-4-2-2-3-3-1-3-3-1-4' },
  
  // 静虑度（Q10=id111, Q46=id466, Q47=id467, Q48=id468, Q49=id469, Q50=id470）
  { ids: [111, 466, 467, 468, 469, 470], targetId: 'part2-4-2-2-3-3-1-3-3-1-5' },
  
  // 般若度（Q5=id106, Q11=id113, Q12=id115, Q51=id471, Q52=id472, Q53=id473, Q54=id474）
  { ids: [106, 113, 115, 471, 472, 473, 474], targetId: 'part2-4-2-2-3-3-1-3-3-1-6' },
  
  // 止观（Q55=id476 ~ Q64=id485）
  { idRange: [476, 485], targetId: 'part2-4-2-2-3-3-2-6' },
  
  // 愿菩提心、行菩提心（Q2=id103, Q3=id104, Q21=id441, Q22=id442, Q23=id443, Q24=id444, Q25=id445）
  { ids: [103, 104, 441, 442, 443, 444, 445], targetId: 'part2-4-2-2-3-2-2' },
  
  // 正论四门概述（Q13=id122, Q14=id123, Q15=id124, Q16=id125, Q17=id126）
  { ids: [122, 123, 124, 125, 126], targetId: 'part2' },
];

// 应用分配
const qidToTarget = {};

for (const rule of MANUAL_RULES) {
  const targetId = rule.targetId;
  if (!validTargets.has(targetId) && targetId !== 'part2') {
    console.log(`  跳过无效目标: ${targetId}`);
    continue;
  }
  
  const qids = [];
  if (rule.ids) {
    qids.push(...rule.ids.map(String));
  }
  if (rule.idRange) {
    for (let i = rule.idRange[0]; i <= rule.idRange[1]; i++) {
      qids.push(String(i));
    }
  }
  
  for (const qid of qids) {
    qidToTarget[qid] = targetId;
  }
}

// 从 part2 移动题目到目标节点
let moved = 0;
for (const [qid, targetId] of Object.entries(qidToTarget)) {
  if (targetId === 'part2') continue;
  
  const idx = part2.findIndex(q => String(q.id) === qid);
  if (idx === -1) {
    console.log(`  警告：在 part2 中找不到 qid=${qid}`);
    continue;
  }
  
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
const nodes = [];
function walk(nodes2, depth) {
  for (const n of nodes2) {
    if (n.id !== 'root') nodes.push({ id: n.id, title: n.title });
    if (n.children && n.children.length) walk(n.children, depth + 1);
  }
}
walk(structureData.children, 0);

const sortedKeys = Object.keys(examQuestions).filter(k => k !== 'scenario').sort();

let output = `/**
 * 菩提道次第广论 —— 考试题库
 * 按章节（科判节点）组织，覆盖广论核心内容
 * 总计 ${Object.values(examQuestions).reduce((s, a) => s + a.length, 0)} 道题 + 20 道场景模拟题
 */

export default {\n`;

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
console.log('请检查统计：');

// 打印统计
for (const key of sortedKeys) {
  const count = examQuestions[key]?.length || 0;
  if (count > 0) {
    const node = nodes.find(n => n.id === key);
    console.log(`  ${key} (${node?.title || ''}): ${count} 题`);
  }
}
