/**
 * 考试题目重新整理脚本
 * 把 487 道题重新正确分配到 lamrim-structure.js 中的真实节点 ID
 */

import examQuestions from './js/data/exam-questions.js';
import structureData from './js/data/lamrim-structure.js';
import fs from 'fs';

// ── 获取所有有效节点 ──────────────────────────────────────────
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

// ── 题目内容分析：根据关键词判断题目应该属于哪个节点 ─────────

// 收集所有题目（包括无效ID的）
const allQuestions = []; // { originalKey, question Obj }

for (const [key, questions] of Object.entries(examQuestions)) {
  if (key === 'scenario') continue;
  for (const q of questions) {
    allQuestions.push({
      originalKey: key,
      ...q,
      _content: q.question + ' ' + (q.explanation || ''),
    });
  }
}

console.log(`总题目数: ${allQuestions.length}`);

// ── 根据题目内容关键词，映射到正确的节点 ID ──────────────────

// 定义关键词 → 节点 ID 的映射规则（按匹配优先级排列）
const RULES = [
  // 归敬颂
  { pattern: /归敬颂|归敬.*颂|广论.*开篇|造论.*殊胜/i, targetId: 'part1' },

  // 正论四门
  { pattern: /正论.*四门|开为四门|造者殊胜.*第一位/i, targetId: 'part2' },

  // 造者殊胜（part2-1 系列）
  { pattern: /圆满种|受生事理/i, targetId: 'part2-1-1' },
  { pattern: /教功德|知见广博|尊者.*教/i, targetId: 'part2-1-2-1' },
  { pattern: /证功德|如理修行.*证/i, targetId: 'part2-1-2-2' },
  { pattern: /印度.*事业|超岩寺|辩败外道/i, targetId: 'part2-1-3-1' },
  { pattern: /西藏.*事业|菩提道炬|赴藏|尊者.*西藏/i, targetId: 'part2-1-3-2' },
  { pattern: /阿底峡|造者殊胜|根源净/i, targetId: 'part2-1' },

  // 法殊胜（part2-2）
  { pattern: /法殊胜|四种殊胜|通达一切圣教无违|圣言现为教授|胜者密意|极大罪行.*消灭|谤法/i, targetId: 'part2-2' },

  // 讲闻轨理（part2-3 系列）
  { pattern: /闻法.*胜利|思惟闻法/i, targetId: 'part2-3-1-1' },
  { pattern: /承事.*法师|于法法师/i, targetId: 'part2-3-1-2' },
  { pattern: /断器三过|覆器|秽器|漏器/i, targetId: 'part2-3-1-3-1' },
  { pattern: /六种想|病者想|于己作病者/i, targetId: 'part2-3-1-3-2' },
  { pattern: /听闻.*轨理/i, targetId: 'part2-3-1' },
  { pattern: /说法.*胜利|讲法.*利益/i, targetId: 'part2-3-2-1' },
  { pattern: /讲说.*轨理|说法.*心态|应说不说|于何等境/i, targetId: 'part2-3-2' },
  { pattern: /回向.*讲法|完结.*共作|讲法.*回向/i, targetId: 'part2-3-3' },
  { pattern: /讲闻.*轨理|讲闻.*相应/i, targetId: 'part2-3' },

  // 亲近善知识（part2-4-1 系列）
  { pattern: /善知识.*十德|调伏|寂静|惑除|德增|善巧.*说|悲为体|具精勤|远离厌|所依善知识/i, targetId: 'part2-4-1-1-1' },
  { pattern: /学者.*相|正住|具慧|希求|能依学者/i, targetId: 'part2-4-1-1-2' },
  { pattern: /华严九心|如孝子心|如金刚心|依止.*意乐|依止.*加行|如何依师/i, targetId: 'part2-4-1-1-3' },
  { pattern: /依止.*胜利|令诸佛欢喜/i, targetId: 'part2-4-1-1-4' },
  { pattern: /未依.*过患|不如法.*依止|毁谤.*善知识/i, targetId: 'part2-4-1-1-5' },
  { pattern: /修持轨理|正明修法|座上.*座间|观察修.*止住修|邪妄分别|闻思.*不是.*修行/i, targetId: 'part2-4-1-2' },
  { pattern: /亲近.*善知识|道.*根本.*知识|依止/i, targetId: 'part2-4-1' },

  // 暇满人身（part2-4-2-1）
  { pattern: /暇满|八无暇|十圆满|义大|难得|有暇身/i, targetId: 'part2-4-2-1' },

  // 共下士道——念死无常（part2-4-2-2-2-1-1-1）
  { pattern: /念死|决定死|死无定期|死时.*无益|未修念死.*过患|修念死.*胜利|思决定死|思惟死无定期/i, targetId: 'part2-4-2-2-2-1-1-1' },

  // 共下士道——三恶趣苦（part2-4-2-2-2-1-1-2）
  { pattern: /地狱.*苦|旁生.*苦|饿鬼.*苦|三恶趣|大有情地狱|近边地狱|寒冷地狱|独一地狱/i, targetId: 'part2-4-2-2-2-1-1-2' },

  // 共下士道——皈依（part2-4-2-2-2-1-1-2-1）
  { pattern: /皈依|归依.*三宝|皈依.*学处|趣入圣教|净修归依|知功德.*佛.*法.*僧/i, targetId: 'part2-4-2-2-2-1-1-2-1' },

  // 共下士道——业果（part2-4-2-2-2-1-1-2-2）
  { pattern: /业果|十业道|异熟|黑业|白业|四力.*净修|业增长广大|深忍信/i, targetId: 'part2-4-2-2-2-1-1-2-2' },

  // 下士道发心之量（part2-4-2-2-2-1-2）
  { pattern: /发此意乐.*量|下士道.*量|检验.*意乐|除遣.*邪执.*下士/i, targetId: 'part2-4-2-2-2-1-2' },

  // 共中士道——解脱（part2-4-2-2-2-2-1）
  { pattern: /中士道|求解脱|出离心|解脱.*心|明求解脱/i, targetId: 'part2-4-2-2-2-2-1' },

  // 共中士道——苦谛（part2-4-2-2-2-2-1-2-1 或 part2-4-2-2-2-2-1-2）
  // 注：结构中 part2-4-2-2-2-1-2 是"发此之方便"，苦谛在更深层
  { pattern: /苦谛|八苦|六苦|三苦|五取蕴苦|思惟苦谛/i, targetId: 'part2-4-2-2-2-2-1-2' },

  // 共中士道——集谛（part2-4-2-2-2-2-1-2）
  { pattern: /集谛|烦恼.*发生|无明|萨迦耶见|集业|死没.*结生|十二缘起/i, targetId: 'part2-4-2-2-2-2-1-2' },

  // 上士道——发菩提心（part2-4-2-2-2-3）
  { pattern: /上士道|发菩提心|大悲|七种因果|自他相换|入大乘门/i, targetId: 'part2-4-2-2-2-3' },
];

// 分配题目
const reassigned = {}; // { questionId: targetId }

// 先处理 originalKey 有效的题目（直接保留）
for (const q of allQuestions) {
  if (validIds.has(q.originalKey)) {
    if (!reassigned[q.id]) {
      reassigned[q.id] = q.originalKey;
    }
  }
}

// 再处理 originalKey 无效的题目（需要重新分配）
for (const q of allQuestions) {
  if (reassigned[q.id]) continue;

  let matched = false;
  for (const rule of RULES) {
    if (rule.pattern.test(q._content) || rule.pattern.test(q.question)) {
      if (validIds.has(rule.targetId)) {
        reassigned[q.id] = rule.targetId;
        matched = true;
        break;
      }
    }
  }

  if (!matched) {
    // 兜底：分配到 part2（正论概览）
    reassigned[q.id] = 'part2';
  }
}

// ── 按新分配的 ID 重新组织题目 ─────────────────────────────
const newExamQuestions = {};

for (const [qid, targetId] of Object.entries(reassigned)) {
  if (!newExamQuestions[targetId]) {
    newExamQuestions[targetId] = [];
  }
  // 找出原始题目对象（去掉 _content 和 originalKey 字段）
  const orig = allQuestions.find(q => q.id === qid);
  const { _content, originalKey, ...cleanQ } = orig;
  newExamQuestions[targetId].push(cleanQ);
}

// 加上场景题
newExamQuestions['scenario'] = examQuestions['scenario'];

// ── 验证：所有 key 都必须是有效节点 ─────────────────────
const invalid = Object.keys(newExamQuestions).filter(k => k !== 'scenario' && !validIds.has(k));
if (invalid.length > 0) {
  console.error('错误：还有无效的章节 ID:', invalid);
  process.exit(1);
}

// ── 打印统计 ─────────────────────────────────────────────
console.log('\n=== 重新分配后的题目统计 ===');
const sortedKeys = Object.keys(newExamQuestions).filter(k => k !== 'scenario').sort();
for (const key of sortedKeys) {
  const node = validNodes.find(n => n.id === key);
  const title = node ? node.title : '';
  console.log(`  ${key} (${title}): ${newExamQuestions[key].length} 题`);
}
console.log(`  场景模拟: ${newExamQuestions['scenario']?.length || 0} 题`);

const total = Object.values(newExamQuestions).reduce((sum, arr) => sum + arr.length, 0);
console.log(`\n总题目数: ${total}`);

// ── 生成新的 exam-questions.js 文件 ─────────────────────
// 只保留有题目的章节（每个节点 5-8 道题）
const filteredKeys = sortedKeys.filter(k => newExamQuestions[k].length > 0);

let output = `/**
 * 菩提道次第广论 —— 考试题库
 * 按章节（科判节点）组织，覆盖广论核心内容
 * 总计 ${total} 道题 + 20 道场景模拟题
 *
 * 格式：export default { '节点ID': [ { id, type, difficulty, question, options, correct, explanation, points } ] }
 */

export default {\n`;

for (const key of filteredKeys) {
  const questions = newExamQuestions[key];
  const node = validNodes.find(n => n.id === key);
  const title = node ? node.title : '';
  output += `  // ${key} — ${title}\n`;
  const qStr = JSON.stringify(questions, null, 4);
  // 缩进
  const indented = qStr.split('\n').map((line, i) => {
    if (i === 0) return '  ' + line;
    return '    ' + line;
  }).join('\n');
  output += `  '${key}': ${indented},\n\n`;
}

output += `  // 场景模拟——佛法在现代生活中的应用（20题）\n`;
const scenarioStr = JSON.stringify(newExamQuestions['scenario'], null, 4);
const scenarioIndented = scenarioStr.split('\n').map((line, i) => {
  if (i === 0) return '  ' + line;
  return '    ' + line;
}).join('\n');
output += `  'scenario': ${scenarioIndented},\n`;
output += `};\n`;

fs.writeFileSync('/workspace/lamrim-study/js/data/exam-questions-new.js', output, 'utf8');
console.log('\n已生成新文件: js/data/exam-questions-new.js');
console.log('请检查无误后替换为原文件。');
