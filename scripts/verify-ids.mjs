/**
 * 验证关键节点 ID 是否真实存在
 */

import structureData from './js/data/lamrim-structure.js';

function findById(nodes, targetId) {
  for (const n of nodes) {
    if (n.id === targetId) return n;
    if (n.children && n.children.length) {
      const found = findById(n.children, targetId);
      if (found) return found;
    }
  }
  return null;
}

const testIds = [
  'part2-4-2-2-2-3-3-1-3-3-1-1', // 学习布施
  'part2-4-2-2-2-3-3-1-3-3-1-2', // 学习持戒
  'part2-4-2-2-2-3-3-1-3-3-1-3', // 学习忍辱
  'part2-4-2-2-2-3-3-1-3-3-1-4', // 学习精进
  'part2-4-2-2-2-3-3-1-3-3-1-5', // 学习静虑
  'part2-4-2-2-2-3-3-1-3-3-1-6', // 学习般若
  'part2-4-2-2-2-3-3-2-6-1',     // 学奢摩他法
  'part2-4-2-2-2-3-3-2-6-2',     // 学毗钵舍那法
];

for (const tid of testIds) {
  const node = findById(structureData.children, tid);
  console.log(`${node ? '✅' : '❌'} ${tid}: ${node?.title || '未找到'}`);
}
