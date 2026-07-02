#!/usr/bin/env python3
"""
最终修复：把 part2 里的题目全部分配到正确的节点
方法：读取当前 exam-questions.js，解析 JSON，重新分配
"""

import json
import re

# 读取当前 exam-questions.js
with open('/workspace/lamrim-study/js/data/exam-questions.js', 'r', encoding='utf8') as f:
    content = f.read()

# 提取 JSON 部分（在 export default 之后）
# 找到 export default 之后的内容
match = re.search(r'export\s+default\s+(\{.*\})\s*;', content, re.DOTALL)
if not match:
    print("无法解析文件")
    exit(1)

# 尝试解析（需要处理 JS 语法）
# 改用：直接运行 Node.js 来加载和重新分配
print("改用 Node.js 脚本来处理")
print("请运行: node scripts/final-fix.mjs")
