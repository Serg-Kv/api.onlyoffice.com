---
sidebar_position: -3
title: 处理异步操作
description: 管理延迟和响应。
---

# 处理异步操作 {#handling-async-operations}

ONLYOFFICE 插件中的 AI 工具函数本质上是异步的。`func.call` 是一个 `async` 函数，其中几乎每个操作——读取文档状态、发送 AI 请求和写回结果——都必须被等待。遗漏 `await` 是最常见的细微错误来源之一。

## 为什么异步很重要 {#why-async-matters}

以下操作都是异步的，必须被等待：

- `Asc.Editor.callCommand(...)` — 在编辑器上下文中执行命令
- `Asc.Editor.callMethod(...)` — 读取或写入文档状态
- `chatRequest(...)` — 向 AI 提供商发送请求并等待响应（或流式传输时的第一个块）

如果这些调用中的任何一个没有被等待，插件会在前一个操作完成之前继续执行下一行。这会导致：

- 从文档中读取过时或空的值
- 在错误的光标位置插入文本
- 由于 `StartAction`/`EndAction` 括号不匹配导致撤销栈损坏
- 难以重现和调试的竞态条件

## 始终 `await` 编辑器调用 {#always-await}

每次调用 `Asc.Editor.callCommand` 和 `Asc.Editor.callMethod` 都必须加上 `await` 前缀：

```ts
// 正确
const selectedText = await Asc.Editor.callMethod("GetSelectedText");

// 错误 — selectedText 将是一个 Promise，而不是字符串
const selectedText = Asc.Editor.callMethod("GetSelectedText");
```

同样的规则适用于命令序列：

```ts
// 正确 — 每个步骤在下一个开始之前完成
await Asc.Editor.callCommand("StartAction", "Insert AI result");
await Asc.Editor.callMethod("InsertText", result);
await Asc.Editor.callCommand("EndAction");
```

## `StartAction`/`EndAction` 模式 {#start-end-action}

将文档修改包装在 `StartAction`/`EndAction` 中会将所有更改分组为单个撤销步骤。没有这个，用户可能需要多次按 **Ctrl+Z** 才能撤销单次 AI 生成的插入。

```ts
async call(params) {
  const result = await generateText(params);

  await Asc.Editor.callCommand("StartAction", "AI insert");
  try {
    await Asc.Editor.callMethod("InsertText", result);
  } finally {
    await Asc.Editor.callCommand("EndAction");
  }
}
```

> 始终将 `EndAction` 放在 `finally` 块中。如果在 `StartAction` 和 `EndAction` 之间发生错误，省略 `EndAction` 会使撤销栈处于损坏状态。

为什么这对撤销/重做很重要：

- `StartAction` 在编辑器历史中打开一个事务边界。
- `StartAction` 和 `EndAction` 之间的每个修改都被记录为单个原子更改。
- `EndAction` 关闭边界并提交事务。
- 如果 `EndAction` 从未被调用，事务保持打开状态，后续的用户编辑可能会意外地合并到其中。

## 流式响应 {#streaming-responses}

当您将回调作为 `chatRequest` 的第三个参数传递时，回调会在文本块从提供商到达时多次触发。每个块是最终响应的部分片段——通常是一个词或一个短语。

```ts
let buffer = "";

await chatRequest(
  prompt,
  null,
  async (chunk) => {
    buffer += chunk;
    // 在每个块到达时插入
    await Asc.Editor.callMethod("InsertText", chunk);
  }
);
```

流式传输指南：

- **追加，不要替换。** 每个块只包含新文本，而不是到目前为止的完整响应。
- **将 `StartAction`/`EndAction` 括号保持在回调外部。** 在调用 `chatRequest` 之前打开 `StartAction`，在 `await` 解析后关闭 `EndAction`，这样整个流式插入就是单个撤销步骤。
- **避免在回调中执行昂贵的操作。** 回调频繁触发；其中任何缓慢的同步工作都会延迟渲染。

## 处理取消 {#handling-cancellation}

如果用户在请求进行中关闭插件面板或按 **Esc**，插件上下文可能会在 `chatRequest` 解析之前被拆除。要优雅地处理这种情况：

- 在从流式回调插入文本之前检查插件是否仍然活跃。
- 使用取消标志：

```ts
let cancelled = false;

// 在插件的关闭/卸载处理程序中设置此标志
function onPluginClose() {
  cancelled = true;
}

await chatRequest(prompt, null, async (chunk) => {
  if (cancelled) return;
  await Asc.Editor.callMethod("InsertText", chunk);
});
```

- 如果在请求开始之前调用了 `StartAction`，请确保在检测到取消时仍然调用 `EndAction`——例如，在 `finally` 块中。

## 超时模式 {#timeout-patterns}

云 AI 提供商偶尔会停滞或不返回响应。为避免让用户无限期等待，将请求包装在超时中：

```ts
async function chatRequestWithTimeout(prompt, options, onChunk, timeoutMs = 30000) {
  let timedOut = false;

  const timeout = setTimeout(() => {
    timedOut = true;
  }, timeoutMs);

  await chatRequest(prompt, options, async (chunk) => {
    if (timedOut) return;
    if (onChunk) await onChunk(chunk);
  });

  clearTimeout(timeout);

  if (timedOut) {
    throw new Error("The AI model did not respond in time. Please try again.");
  }
}
```

使用 `Asc.plugin.showMessage` 向用户显示超时错误，而不是静默吞掉它。

## 代码示例：带完整错误处理的流式传输 {#streaming-example}

以下示例演示了一个将补全流式传输到文档中的工具，并正确处理部分响应、取消和撤销边界：

```ts
async call(params) {
  const selectedText = await Asc.Editor.callMethod("GetSelectedText");

  if (!selectedText) {
    Asc.plugin.showMessage("Please select text before running this tool.");
    return;
  }

  const prompt = `Rewrite the following text to be more concise:\n\n${selectedText}`;
  let cancelled = false;

  await Asc.Editor.callCommand("StartAction", "AI rewrite");

  try {
    await chatRequest(prompt, null, async (chunk) => {
      if (cancelled) return;
      await Asc.Editor.callMethod("InsertText", chunk);
    });
  } catch (err) {
    cancelled = true;
    Asc.plugin.showMessage("The AI model did not respond. Please try again.");
  } finally {
    await Asc.Editor.callCommand("EndAction");
  }
}
```
