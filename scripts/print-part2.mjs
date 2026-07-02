/**
 * 打印 part2 里所有题目的内容，用于手动分析和分配
 */

import examQuestions from './js/data/exam-questions.js';
import fs from 'fs';

const part2 = examQuestions['part2'] || [];

let output = `part2 节点里现有 ${part2.length} 道题，需要手动分配：\n\n`;

part2.forEach((q, i) => {
  output += `=== Q${i+1} (id=${q.id}) ===\n`;
  output += `  题目: ${q.question}\n`;
  output += `  类型: ${q.type} | 难度: ${q.difficulty}\n`;
  if (q.explanation) output += `  解释: ${q.explanation}\n`;
  output += `\n`;
});

fs.writeFileSync('/workspace/lamrim-study/scripts/part2-questions.txt', output, 'utf8');
console.log('已生成 part2-questions.txt，共', part2.length, '道题');
