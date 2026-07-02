#!/usr/bin/env python3
"""
最终修复：把 part2 里的题目分配到正确的节点
直接解析 exam-questions-new.js 并重新分配
"""

import re
import json

# 读取文件
with open('/workspace/lamrim-study/js/data/exam-questions-new.js', 'r', encoding='utf8') as f:
    content = f.read()

# 提取 JSON 对象（export default 后面的部分）
# 找到 export default 之后的内容
start = content.index('export default')
# 找到 { 和匹配的 }
brace_start = content.index('{', start)
brace_count = 0
brace_end = -1
for i in range(brace_start, len(content)):
    if content[i] == '{':
        brace_count += 1
    elif content[i] == '}':
        brace_count -= 1
        if brace_count == 0:
            brace_end = i
            break

json_str = content[brace_start:brace_end+1]
print(f"提取了 JSON 字符串，长度: {len(json_str)}")

# 尝试解析（需要处理 JS 语法：单引号、trailing comma）
# 先做一些替换让它能用 json.loads 解析
# 把单引号替换成双引号（但要小心字符串内的单引号）

# 改用更簡单的方法：直接用 node 来加载和分配
print("\n改用 Node.js 来处理...")
print("请运行: node /workspace/lamrim-study/scripts/do-final-fix.mjs")
