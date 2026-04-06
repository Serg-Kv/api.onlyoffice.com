---
sidebar_position: -4
title: 管理 API 成本
description: 成本优化策略。
---

# 管理 API 成本 {#managing-api-costs}

每次调用云 AI 提供商都会消耗由提供商计费的 token。周到的插件设计可以显著减少发送和接收的 token 数量，使成本保持可预测且低廉。

## 为什么 API 成本很重要 {#why-api-costs-matter}

每次 `chatRequest` 调用都会向配置的 AI 提供商传输提示并接收补全结果。提示（输入 token）和补全（输出 token）都计入计费使用量。在文档编辑器上下文中，如果提示包含文档内容，它们可能会迅速增长，因此小的低效率会在许多用户中累积。

主要成本驱动因素：

- 传递给 `chatRequest` 的 `prompt` 字符串的长度
- 模型响应的长度
- 每次用户操作的调用次数
- 用户选择的模型层级（更大的模型每个 token 成本更高）

## 最小化提示大小 {#minimize-prompt-size}

仅提取任务所需的内容。当单个段落或单元格值就足够时，不要发送整个文档。

**避免：**

```ts
const fullText = await Asc.Editor.callMethod("GetDocumentText");
const prompt = `Summarize this document:\n\n${fullText}`;
```

**推荐：**

```ts
const selectedText = await Asc.Editor.callMethod("GetSelectedText");
const prompt = `Summarize the following paragraph in one sentence:\n\n${selectedText}`;
```

其他策略：

- 在将文本嵌入提示之前，修剪空白并规范化换行符。
- 如果模型不需要，删除样板或重复的标题。
- 如果需要模型操作表格，只发送相关行，而不是整个工作表。

## 避免不必要的请求 {#avoid-unnecessary-requests}

在创建 `AI.Request` 之前验证所有输入。如果缺少必需参数或参数无效，请尽早退出并显示清晰的错误消息，而不是发出会失败或产生无用输出的请求。

```ts
async call(params) {
  const selectedText = await Asc.Editor.callMethod("GetSelectedText");

  if (!selectedText || selectedText.trim().length === 0) {
    Asc.plugin.showMessage("Please select some text before running this tool.");
    return;
  }

  const request = AI.Request.create(/* ... */);
  // proceed only when input is valid
}
```

在调用 `AI.Request.create` 之前要添加的其他检查：

- 确认必需的 `params` 字段存在且在预期范围内。
- 当工具需要选定文本时，检查选择是否为空。
- 拒绝明显过大的输入（例如，超过可配置的字符限制）。

## 使用流式传输提升感知性能 {#use-streaming}

将回调作为 `chatRequest` 的第三个参数传递可启用流式传输——回调在响应块到达时重复触发，而不是在完整响应准备好时只触发一次。

```ts
let result = "";
await chatRequest(
  prompt,
  null,
  async (chunk) => {
    result += chunk;
    await Asc.Editor.callMethod("InsertText", chunk);
  }
);
```

> 流式传输不会减少 token 使用量——无论如何都会消耗相同数量的 token。但是，它消除了用户的感知等待时间，这对于长时间的补全特别有价值。

何时使用流式传输：

- 输出直接插入文档的文本生成工具
- 长段落的摘要或翻译
- 任何用户否则会盯着加载动画超过一秒的操作

## 使用本地提供商进行开发和测试 {#local-providers}

即使在开发期间，云 API 调用也会产生费用。使用本地提供商如 [Ollama](../../ai/configuring-ollama-with-cors.md) 意味着所有请求都在您的机器上处理，无论运行多少次测试迭代都不会产生费用。

推荐的工作流程：

1. 针对本地 Ollama 实例进行开发和迭代。
2. 在推广到生产环境之前，使用小型云模型（如较低层级的 GPT 或 Claude 模型）进行测试。
3. 将最强大——也是最昂贵的——模型保留用于最终验证和生产使用。

## 选择正确的 `AI.ActionType` {#action-type}

`AI.ActionType` 枚举描述正在执行的操作类型。使用正确的操作类型有助于插件运行时和 AI 提供商正确路由请求。

| 值 | 何时使用 |
|-------|-------------|
| `AI.ActionType.Chat` | 通用对话请求、摘要、重写、问答 |
| 其他操作类型 | 有关专门操作，请参阅 API 参考 |

对每个请求使用 `AI.ActionType.Chat` 可以工作，但当有更具体的操作类型可用时可能不是最优的。选择最合适的类型允许运行时应用正确的上下文窗口和系统提示，这可以减少您需要在提示字符串中包含的手动上下文量——直接降低 token 使用量。
