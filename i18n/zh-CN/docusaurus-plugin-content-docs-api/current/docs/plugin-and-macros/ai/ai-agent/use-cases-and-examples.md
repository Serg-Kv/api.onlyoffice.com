---
sidebar_position: 4
---

# 使用场景和示例

本页展示 AI 助手在不同编辑器类型中的实际应用场景。

## 文本文档编辑器

![文本文档编辑器使用场景](/assets/images/plugins/ai-agent-prompt.png#gh-light-mode-only)![文本文档编辑器使用场景](/assets/images/plugins/ai-agent-prompt.dark.png#gh-dark-mode-only)

**内容批注**

选择一个段落并输入：
> "解释这段文字并将其添加为注释"

助手调用 `commentText` 工具，将选定的文本发送到 AI 模型，并将响应作为文档注释插入。

**语气改写**

选择一个正式段落并输入：
> "用轻松友好的语气改写这段文字"

助手将选定的文本替换为改写后的版本。

**拼写和语法检查**

输入：
> "检查这段文字的拼写和语法"

助手检查文本并使用修订标记应用更正，以便您可以在接受之前审查每项更改。

## 电子表格编辑器

![电子表格编辑器使用场景](/assets/images/plugins/ai-use-case-spreadsheet.png#gh-light-mode-only)![电子表格编辑器使用场景](/assets/images/plugins/ai-use-case-spreadsheet.dark.png#gh-dark-mode-only)

**图表生成**

选择一个数据范围并输入：
> "根据这些数据创建一个柱状图"

助手使用选定的范围调用图表工具，并将图表插入到工作表中。

**公式解释**

点击包含复杂公式的单元格并输入：
> "解释这个公式的作用"

助手向单元格添加注释，用通俗的语言解释公式的逻辑。

**排序和筛选**

输入：
> "按收入列降序排列此表格"

助手应用排序，无需您打开任何菜单。

## 演示文稿编辑器

![演示文稿编辑器使用场景](/assets/images/plugins/ai-use-case-presentation.png#gh-light-mode-only)![演示文稿编辑器使用场景](/assets/images/plugins/ai-use-case-presentation.dark.png#gh-dark-mode-only)

**添加幻灯片**

输入：
> "在演示文稿末尾添加一张新幻灯片"

助手使用默认布局插入一张空白幻灯片。

**向幻灯片添加内容**

输入：
> "在当前幻灯片中添加一个3列4行的表格"

助手创建表格并将其放置在活动幻灯片上。

**更改幻灯片背景**

输入：
> "将此幻灯片的背景更改为深蓝色渐变"

助手使用 Office API 应用背景更改。

## 多步骤对话示例

助手保存对话历史，支持迭代优化：

1. "总结选定的文本" → 助手插入摘要
2. "使其更简短" → 助手修改摘要
3. "将其改为脚注" → 助手将摘要移至脚注

按 `Ctrl + Alt + /` 重置历史记录并开始新对话。
