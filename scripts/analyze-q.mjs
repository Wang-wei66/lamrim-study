/**
 * 分析 part2 兜底节点里的题目内容
 * 看这些题目实际应该属于哪个节点
 */

import examQuestions from './js/data/exam-questions.js';
import fs from 'fs';

const part2 = examQuestions['part2'] || [];
const extended = examQuestions['part2-4-1-extended'] || [];
const part2_3 = examQuestions['part2-4-3'] || [];
const part2_4 = examQuestions['part2-4-4'] || [];
const part2_5 = examQuestions['part2-4-5'] || [];
const part2_6 = examQuestions['part2-4-6'] || [];
const part2_7 = examQuestions['part2-4-7'] || [];
const part2_8 = examQuestions['part2-4-8'] || [];
const part2_9 = examQuestions['part2-4-9'] || [];

let output = '=== part2 正论概览 + part2-4-1-extended ===\n\n';
[...part2, ...extended].forEach((q, i) => {
  output += `  Q${i+1}: ${q.question || ''}\n`;
});

output += '\n=== part2-4-3 (8题) ===\n';
part2_3.forEach((q, i) => { output += `  Q${i+1}: ${q.question || ''}\n`; });

output += '\n=== part2-4-4 (8题) ===\n';
part2_4.forEach((q, i) => { output += `  Q${i+1}: ${q.question || ''}\n`; });

output += '\n=== part2-4-5 (8题) ===\n';
part2_5.forEach((q, i) => { output += `  Q${i+1}: ${q.question || ''}\n`; });

output += '\n=== part2-4-6 (8题) ===\n';
part2_6.forEach((q, i) => { output += `  Q${i+1}: ${q.question || ''}\n`; });

output += '\n=== part2-4-7 (8题) ===\n';
part2_7.forEach((q, i) => { output += `  Q${i+1}: ${q.question || ''}\n`; });

output += '\n=== part2-4-8 (8题) ===\n';
part2_8.forEach((q, i) => { output += `  Q${i+1}: ${q.question || ''}\n`; });

output += '\n=== part2-4-9 (8题) ===\n';
part2_9.forEach((q, i) => { output += `  Q${i+1}: ${q.question || ''}\n`; });

fs.writeFileSync('/workspace/lamrim-study/scripts/analyze-questions.txt', output, 'utf8');
console.log('已生成分析文件');
