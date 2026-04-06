---
sidebar_position: 2
---

# AI 工作原理

本页介绍 ONLYOFFICE AI 系统各层级的执行流程。

## AI 插件示例流程

1. 用户打开**AI**选项卡并点击**聊天机器人**（或右键点击选定的文本）。
2. 插件通过其 API 将文本和用户提示发送到配置的 AI 提供商。
3. 提供商返回响应（流式或完整）。
4. 插件显示响应并允许用户将其插入到文档中。

```
用户输入 → AI 插件 → 提供商 API → 响应 → 文档
```
![激活 AI](/assets/images/plugins/activate-ai.png#gh-light-mode-only)![激活 AI](/assets/images/plugins/activate-ai.dark.png#gh-dark-mode-only)

## AI 助手示例流程

1. 用户按 `Ctrl + /` 打开内联助手面板。
2. 用户输入自然语言请求（例如，"为这段文字添加注释"）。
3. 助手检查请求和已注册工具的列表，然后选择最匹配的工具。
4. 选定的工具运行：它向 AI 模型发送请求，并使用 Office API 将结果应用到文档中。
5. 助手保存对话历史，因此用户可以逐步优化结果。

```
用户请求 → 助手 → 工具选择 → 工具执行 → Office API → 文档
```
![内联 AI 助手](/assets/images/plugins/inline-ai-agent.png#gh-light-mode-only)![内联 AI 助手](/assets/images/plugins/inline-ai-agent.dark.png#gh-dark-mode-only)

## 何时使用自定义 AI 工具

当内置助手工具无法覆盖您的使用场景时，请使用自定义 AI 工具。工具的作用域限定于特定编辑器类型——请在您的插件目标编辑器的正确映射中注册工具。

常见场景：

| 场景 | 使用自定义 AI 工具 |
|------|-------------------|
| 特定领域的文档操作 | 是 |
| 团队独有的工作流自动化 | 是 |
| 为特定编辑器类型扩展助手 | 是 |
| 通用文本生成或摘要 | 否——直接使用 AI 插件 |
| 简单的格式更改 | 否——使用 AI 助手的内置工具 |

有关实现详情，请参阅[创建自定义 AI 工具](../custom-ai-tools/creating-a-custom-ai-tool.md)。
