---
---

# 概述

自定义 AI 工具允许您通过定义 AI 助手可以在 ONLYOFFICE 编辑器中执行的新操作来扩展其内置功能。每个工具封装了一个特定的操作——例如格式化文本、插入结构化内容或查询外部数据——并通过结构化接口将其暴露给 AI。

## 什么是自定义 AI 工具 {#what-are-tools}

自定义 AI 工具是在 AI 助手中注册的 JavaScript 函数，助手可以响应用户提示来调用它。该工具通过 Office API 处理文档交互，并可以选择性地向 AI 模型发送额外请求。

自定义 AI 工具由以下部分组成：

- 助手用于标识工具的**名称**；
- 助手调用工具时传递的**参数**列表；
- 教助手何时以及如何调用工具的**示例**；
- 包含实际实现的 **call** 函数。

`RegisteredFunction` 对象是每个自定义 AI 工具的构建块。它在 [helperFuncs.js](https://github.com/ONLYOFFICE/onlyoffice.github.io/blob/master/sdkjs-plugins/content/ai/scripts/helpers/helperFuncs.js) 文件中定义。

## 何时使用自定义 AI 工具 {#when-to-use}

在以下情况下使用自定义 AI 工具：

- 内置 AI 助手操作无法覆盖您需要的特定文档操作；
- 您希望向 AI 暴露特定业务逻辑，例如填充模板、验证表单字段或触发外部集成；
- 您正在构建应响应用户自然语言指令的插件。

有关现成可用的示例，请参阅[自定义 AI 工具示例](../../samples/custom-ai-tools/custom-ai-tools.md)。

## 工具如何融入 AI 工作流 {#workflow}

当用户在 AI 助手对话框（`CTRL + /`）中输入提示时，助手会评估所有已注册的工具并确定是否有匹配的工具。如果找到匹配项，助手将使用适当的参数调用该工具。

自定义工具在插件初始化时注册，并在插件会话的整个生命周期内保持可用：

1. 插件在启动期间通过向适当的映射（`WORD_FUNCTIONS`、`CELL_FUNCTIONS` 或 `SLIDE_FUNCTIONS`）添加工厂函数来注册其工具。
2. 用户打开 AI 助手对话框并输入提示。
3. 助手使用工具的 `examples` 和 `description` 元数据将提示与已注册工具进行匹配。
4. 助手使用从其响应中解析的参数对象调用 `func.call`。
5. 工具运行其文档逻辑，并可选择向助手返回结果字符串。

## 后续步骤 {#next-steps}

- [创建自定义 AI 工具](creating-a-custom-ai-tool.md) — 从头开始设置您的第一个工具。
- [工具结构](tool-structure.md) — 了解参数、模式、UI 命名和错误处理。
- [示例和模式](examples-and-patterns.md) — 探索常见的工具设计。
- [测试和调试](testing-and-debugging.md) — 验证和排查工具问题。
