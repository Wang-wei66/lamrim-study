/**
 * 打印上士道所有子节点
 */

import structureData from './js/data/lamrim-structure.js';

function findAndPrint(nodes, targetId, depth=0) {
  for (const n of nodes) {
    if (n.id === targetId) {
      console.log(`找到目标节点: ${n.id} | ${n.title}`);
      console.log(`子节点数: ${n.children ? n.children.length : 0}`);
      if (n.children) {
        function printTree(children, d) {
          for (const c of children) {
            console.log(`${'  '.repeat(d)}${c.id} | ${c.title}`);
            if (c.children) printTree(c.children, d+1);
          }
        }
        printTree(n.children, 0);
      }
      return;
    }
    if (n.children) findAndPrint(n.children, targetId, depth+1);
  }
}

findAndPrint(structureData.children, 'part2-4-2-2-2-3');
