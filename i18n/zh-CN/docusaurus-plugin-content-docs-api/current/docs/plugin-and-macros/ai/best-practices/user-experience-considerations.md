---
sidebar_position: -2
title: 用户体验注意事项
description: AI 功能的用户体验。
---

# 用户体验注意事项 {#user-experience-considerations}

设计良好的 AI 工具让人感觉自然且可靠。设计不良的工具会让用户困惑，产生意外的更改，并削弱信任。以下指南解决了在 ONLYOFFICE 插件中构建 AI 功能时最常见的用户体验陷阱。

## 保持工具专注 {#keep-tools-focused}

每个注册的工具应该只做一件事。一个试图处理多个不相关任务的工具——例如，根据模糊的输入表述同时翻译和摘要——对 AI 模型来说更难正确调用，对用户来说也更难理解。

**工具做了太多事情的迹象：**

- `description` 包含"or"一词来描述不同的行为
- `examples` 涵盖完全不同的用户意图
- `params` 包含模式切换字段，如 `"action": "translate" | "summarize" | "rewrite"`

**推荐方法：** 为每个不同的操作注册单独的工具。AI 模型根据用户的表述自动在它们之间选择。

## 清晰命名工具 {#name-tools-clearly}

`func.name` 字符串和 `description` 字段都是可见的信号。`func.name` 可能出现在日志和开发者工具中；`description` 由模型读取，也可能在设置界面中显示。

指南：

- 为 `func.name` 使用动词-名词命名：`"translateSelection"`、`"summarizeParagraph"`、`"insertBulletList"`。
- 避免使用通用名称，如 `"doAction"` 或 `"processText"`。
- 使 `description` 让第一次阅读的非技术用户立即能理解。

## 在长时间操作中提供反馈 {#provide-feedback}

任何超过大约一秒的操作都应向用户指示进度。没有反馈，用户会认为插件已冻结，并可能重复点击，触发重复请求。

在开始长时间运行的调用之前，使用 `Asc.plugin.showMessage` 显示状态消息：

```ts
async call(params) {
  Asc.plugin.showMessage("Generating summary, please wait...");

  const result = await generateSummary(params);

  Asc.plugin.showMessage(""); // clear the message
  await Asc.Editor.callMethod("InsertText", result);
}
```

对于具有流式输出的操作，在文档中出现的可见文本本身就是进度指示器——一旦文本开始流动，就不需要额外的消息。

## 正确使用 `StartAction`/`EndAction` {#start-end-action}

将所有 AI 生成的文档修改包装在 `StartAction`/`EndAction` 对中，让用户可以通过单次 **Ctrl+Z** 撤销整个更改。

```ts
await Asc.Editor.callCommand("StartAction", "AI generate");
try {
  await Asc.Editor.callMethod("InsertText", result);
} finally {
  await Asc.Editor.callCommand("EndAction");
}
```

> 如果 `EndAction` 从未被调用——例如，因为抛出了异常——撤销栈会变得不一致。始终使用 `finally` 块。

从用户的角度来看：

- 单个撤销步骤意味着 AI 的贡献被视为一个原子操作，这符合"AI 做了这个，我想撤销 AI 做的事情"的心理模型。
- 对于单个 AI 操作的多个撤销步骤感觉是错误的，会削弱信任。

## 对文本生成使用流式输出 {#streaming-output}

对于生成或转换文本的工具，在块到达时直接将输出流式传输到文档中会创造一种响应性和进度的感觉。用户看到文字实时出现，而不是等待加载动画消失。

有关使用 `chatRequest` 进行流式传输的实现细节，请参阅[处理异步操作](./handling-async-operations.md)。

## 不要在没有确认的情况下插入大块文本 {#confirmation-for-large-changes}

在没有明确用户同意的情况下替换段落、章节或整个文档是具有破坏性的，并且难以恢复。请遵循以下指南：

- **在光标处插入**而不是替换现有内容，除非用户明确选择了文本并要求替换。
- 对于大的替换（超过几句话），考虑显示预览或在应用更改之前要求确认。
- 替换选定的文本时，将原始文本保留在剪贴板上，以便用户在需要时可以粘贴回来。

## 以用户友好的方式显示错误 {#error-messages}

永远不要让原始错误对象或堆栈跟踪到达用户。捕获 `chatRequest` 的所有错误并将其转换为通俗的消息：

```ts
try {
  await chatRequest(prompt, null, onChunk);
} catch (err) {
  Asc.plugin.showMessage(
    "The AI model did not respond. Please check your connection and try again."
  );
}
```

要处理的常见错误场景：

| 场景 | 建议的消息 |
|----------|-------------------|
| 网络超时 | "The AI model did not respond. Please try again." |
| 无效或缺少 API 密钥 | "AI is not configured. Open **Settings** to add your API key." |
| 需要选择时选择为空 | "Please select some text before running this tool." |
| 提供商速率限制超限 | "Too many requests. Please wait a moment and try again." |

使用 `Asc.plugin.showMessage` 显示临时状态消息。对于需要用户操作的错误（如缺少 API 密钥），考虑将用户引导到相关的设置面板。
