---
sidebar_position: -3
title: "AI 集成概述"
---

# AI 集成概述 {#ai-integration-overview}

本页介绍 ONLYOFFICE AI 插件中每个 AI 功能所依赖的概念、架构和系统流程。

## 高级架构 {#high-level-architecture}

从最高层看，ONLYOFFICE 中的 AI 驱动功能涉及三个层级：

1. **ONLYOFFICE 编辑器** — 文档编辑环境（Writer、电子表格或演示文稿）。编辑器暴露插件 API 和 `Asc.Editor.callCommand` 桥接。
2. **AI 插件** — 中间层，负责注册工具、管理 AI 助手、构建请求并将结果写回文档。
3. **AI 提供商** — 云服务（OpenAI、DeepSeek 等）或本地运行的模型服务器（Ollama），处理自然语言提示并返回补全结果。

插件通过 HTTP/HTTPS 向外与提供商通信，通过插件 API 向内与编辑器通信。编辑器和提供商都不直接了解对方。

## 关键组件 {#key-components}

### AI 插件 {#ai-plugin}

AI 插件（GUID `{9DC93CDB-B576-4F0C-B55E-FCC9C48DD007}`）是托管所有 AI 功能的运行时。它从 v9.0.4 起随 ONLYOFFICE Docs 和桌面编辑器一起发布，也可以从应用目录安装。

### AI 助手（测试版） {#ai-agent}

从插件 **v2.4.2** 开始提供，AI 助手是一个自主循环，它：

- 接收用户的自由文本提示（通过 **Ctrl + /** 快捷键输入）。
- 决定哪个已注册工具最匹配提示。
- 调用工具，观察结果，然后返回最终答案或继续推理。

助手目前处于测试版。其行为和 API 接口可能会在未来版本中更改。

### AI 请求引擎（`AI.Request.create`） {#ai-request-engine}

`AI.Request.create` 是用于向当前配置的提供商发送提示并接收补全结果的底层函数。每个工具实现都调用此函数（直接或通过助手循环间接调用）与模型交互。

### 自定义工具和函数 {#custom-tools-and-functions}

工具是扩展的基本单位。每个工具是一个纯 JavaScript 对象，至少包含：

- 助手用于工具选择的**名称**和**描述**。
- 在工具被选中时执行操作的 **`func.call`** 实现。

工具按编辑器范围的函数映射分组（见下文），以确保只有与活动编辑器类型相关的工具才会暴露给助手。

## 编辑器范围的函数映射 {#editor-scoped-function-maps}

AI 插件维护三个独立的已注册工具映射，每种编辑器类型一个：

| 映射名称 | 编辑器类型 |
| --- | --- |
| `WORD_FUNCTIONS` | 文档编辑器 |
| `CELL_FUNCTIONS` | 电子表格编辑器 |
| `SLIDE_FUNCTIONS` | 演示文稿编辑器 |

当助手收到提示时，它查找与当前打开的文档类型对应的映射，从该映射构建工具列表，并将其作为可用函数传递给模型。这确保电子表格专用工具不会在演示文稿中被意外调用。

## `Asc.Editor.callCommand` 如何桥接上下文 {#how-callcommand-bridges-contexts}

AI 插件在隔离的 JavaScript 上下文中运行（沙盒 iframe 或单独的插件线程）。编辑器文档模型在不同的上下文中运行。`Asc.Editor.callCommand` 是桥接：

- `callCommand` 内部的代码在**编辑器上下文**中执行，完整的文档 API 可用。
- `callCommand` 外部的代码在**插件上下文**中执行，网络访问、`AI.Request.create` 和 DOM 可用。
- 数据必须在两个上下文之间显式传递——参见下面关于 `Asc.scope` 的部分。

忘记这个边界是构建 AI 功能时最常见的错误来源。

## `Asc.scope` 数据桥接 {#asc-scope-data-bridge}

`Asc.scope` 是一个纯对象，在调用 `callCommand` 时被序列化并复制到插件/编辑器上下文边界。使用它在两个方向传递数据：

- **传入编辑器：** 在调用 `callCommand` 之前设置 `Asc.scope` 的属性，然后在命令内部读取 `Asc.scope.myProperty`。
- **传出编辑器：** 在命令内部设置 `Asc.scope` 的属性，然后在命令返回后的 `callCommand` 回调中读取。

任何无法序列化为 JSON 的值（函数、DOM 节点、具有方法的类实例）都无法通过 `Asc.scope` 传输。

## 系统流程 {#system-flow}

以下编号列表描述了单次 AI 助手交互的端到端流程：

1. 用户在编辑器中按 **Ctrl + /** 并输入提示。
2. AI 助手接收提示文本。
3. 助手根据活动编辑器选择正确的编辑器范围函数映射（`WORD_FUNCTIONS`、`CELL_FUNCTIONS` 或 `SLIDE_FUNCTIONS`）。
4. 助手调用 `AI.Request.create`，传递提示和从函数映射派生的可用工具列表。
5. AI 提供商返回响应。如果响应包含工具调用指令，助手按名称识别匹配的工具。
6. 助手在匹配的工具上调用 `func.call`，传递模型提供的任何参数。
7. 在 `func.call` 内部，实现通常：
   a. 通过调用 `Asc.Editor.callCommand` 读取文档状态（通过 `Asc.scope` 返回数据）。
   b. 可选地再次调用 `AI.Request.create` 进行后续模型补全。
   c. 通过第二个 `Asc.Editor.callCommand` 将结果写回文档。
8. `func.call` 将其结果返回给助手循环。
9. 助手确定是否需要进一步的工具调用。如果不需要，它将最终答案呈现给用户。
10. 插件调用 `Asc.Editor.callMethod("EndAction", [...])` 以表示操作完成。
