/**
 * 生成 part2 题目列表，用于手动分配
 */

import examQuestions from './js/data/exam-questions.js';
import fs from 'fs';

const part2 = examQuestions['part2'] || [];
console.log('part2 题目数:', part2.length);

let output = '';
part2.forEach((q, i) => {
  const qText = (q.question || '').replace(/\n/g, ' ');
  output += `Q${i+1} | id=${q.id} | ${qText}\n`;
});
fs.writeFileSync('/workspace/lamrim-study/scripts/part2-q-list.txt', output, 'utf8');
console.log('已生成题目列表');
