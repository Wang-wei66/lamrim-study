/**
 * 精细分配 part2 节点里的 66 道题目
 * 这些题目是之前脚本无法自动匹配的，需要更具体的关键词规则
 */

import examQuestions from './js/data/exam-questions.js';
import structureData from './js/data/lamrim-structure.js';
import fs from 'fs';

const validIds = new Set();
function walk(nodes) {
  for (const n of nodes) {
    if (n.id !== 'root') validIds.add(n.id);
    if (n.children && n.children.length) walk(n.children);
  }
}
walk(structureData.children);

// 获取 part2 里的所有题目
const part2Questions = examQuestions['part2'] || [];
console.log(`part2 里有 ${part2Questions.length} 道题需要精细分配`);

// 更精细的关键词规则（专门针对那些没匹配到的题目）
const FINE_RULES = [
  // 归敬颂 & 造论宗旨
  { pattern: /归敬|释迦|文殊|弥勒|龙树|无著|造论|略述本论/i, targetId: 'part1' },

  // 正论四门概述
  { pattern: /正论.*四门|开为四门|乙一.*乙四|引导学徒.*次第/i, targetId: 'part2' },

  // 法殊胜
  { pattern: /法殊胜|四种殊胜|通达一切|圣言.*教授|胜者密意|极大罪行|谤法/i, targetId: 'part2-2' },

  // 讲闻轨理 概述
  { pattern: /讲闻.*轨理|讲闻.*相应|断器三过|六种想|依六种想/i, targetId: 'part2-3' },

  // 亲近善知识 概述
  { pattern: /亲近.*知识|道.*根本|依止.*善知识|华严九心|善知识.*十德/i, targetId: 'part2-4-1' },

  // 暇满
  { pattern: /暇满|八无暇|十圆满|有暇身|义大|难得/i, targetId: 'part2-4-2-1' },

  // 下士道 概述
  { pattern: /下士道|共下士|希求后世|三恶趣|皈依|业果/i, targetId: 'part2-4-2-2-2-1-1' },

  // 中士道 概述
  { pattern: /中士道|共中士|求解脱|出离心|苦谛|集谛|十二缘起/i, targetId: 'part2-4-2-2-2-2' },

  // 上士道 概述
  { pattern: /上士道|发菩提心|大悲|七因果|自他相换/i, targetId: 'part2-4-2-2-2-3' },

  // 修持轨理
  { pattern: /修持轨理|正明修法|观察修|止住修|座上.*座间/i, targetId: 'part2-4-1-2' },
];

// 重新分配 part2 里的题目
const reasignedPart2 = {}; // qid -> targetId

for (const q of part2Questions) {
  const qid = String(q.id);
  let matched = false;

  for (const rule of FINE_RULES) {
    if (rule.pattern.test(q.question) || rule.pattern.test(q.explanation || '')) {
      if (validIds.has(rule.targetId)) {
        reasignedPart2[qid] = rule.targetId;
        matched = true;
        break;
      }
    }
  }

  if (!matched) {
    // 仍然无法匹配——保留在 part2
    reasignedPart2[qid] = 'part2';
  }
}

// 打印分配结果
const targetCounts = {};
for (const [qid, tid] of Object.entries(reasignedPart2)) {
  if (!targetCounts[tid]) targetCounts[tid] = 0;
  targetCounts[tid]++;
}
console.log('\n=== part2 题目重新分配结果 ===');
for (const [tid, count] of Object.entries(targetCounts)) {
  console.log(`  ${tid}: ${count} 题`);
}

// 应用重新分配：更新 examQuestions 对象
for (const [qid, targetId] of Object.entries(reasignedPart2)) {
  if (targetId === 'part2') continue; // 不需要移动

  // 从 part2 中移除这道题
  const idx = examQuestions['part2'].findIndex(q => String(q.id) === qid);
  if (idx === -1) continue;

  const [qObj] = examQuestions['part2'].splice(idx, 1);

  // 添加到目标节点
  if (!examQuestions[targetId]) {
    examQuestions[targetId] = [];
  }
  examQuestions[targetId].push(qObj);
}

// 重新统计
console.log('\n=== 最终统计 ===');
const sortedKeys = Object.keys(examQuestions).filter(k => k !== 'scenario').sort();
for (const key of sortedKeys) {
  console.log(`  ${key}: ${examQuestions[key].length} 题`);
}
console.log(`  场景模拟: ${examQuestions['scenario']?.length || 0} 题`);

const total = Object.values(examQuestions).reduce((sum, arr) => sum + arr.length, 0);
console.log(`\n总题目数: ${total}`);

// 重新生成文件
const nodes = [];
function walk2(nodes2, depth) {
  for (const n of nodes2) {
    if (n.id !== 'root') nodes.push({ id: n.id, title: n.title });
    if (n.children && n.children.length) walk2(n.children, depth + 1);
  }
}
walk2(structureData.children, 0);

let output = `/**
 * 菩提道次第广论 —— 考试题库
 * 按章节（科判节点）组织，覆盖广论核心内容
 * 总计 ${total} 道题 + 20 道场景模拟题
 */

export default {\n`;

const filteredKeys = sortedKeys.filter(k => examQuestions[k].length > 0);
for (const key of filteredKeys) {
  const questions = examQuestions[key];
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
