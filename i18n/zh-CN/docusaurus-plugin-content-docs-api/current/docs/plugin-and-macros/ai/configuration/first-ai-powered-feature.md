---
sidebar_position: -2
title: "您的第一个自定义 AI 工具"
---

# 您的第一个自定义 AI 工具

本页引导您从头构建一个完整的、可工作的自定义 AI 工具：一个 `summarizeSelection` 工具，它读取用户选定的文本，将其发送到 AI 模型，并将摘要插入回文档中。

## 您将构建什么 {#what-you-will-build}

`summarizeSelection` 工具向 AI 助手注册，并通过 **Ctrl + /** 对话框可用。当用户选择文本并输入诸如"Summarize this"之类的提示时，助手读取选择内容，调用配置的 AI 提供商，并将结果流式传输回文档中的光标位置。

## 前提条件 {#prerequisites}

- AI 插件已安装且至少配置了一个提供商。请参阅[前提条件](./prerequisites.md)。
- 您对 ONLYOFFICE 插件架构有基本了解。请参阅[AI 集成概述](./ai-integration-overview.md)。

## 步骤 1：注册工具 {#step-1-register}

将工具添加到 `WORD_FUNCTIONS`，以便 AI 助手可以发现它。`RegisteredFunction` 构造函数接受一个描述工具身份、参数和示例调用的配置对象。

``` ts
WORD_FUNCTIONS.summarizeSelection = function() {
    let func = new RegisteredFunction({
        "name": "summarizeSelection",
        "text": "Summarize Selection",
        "description": "Use this function when the user asks to summarize, shorten, or condense the selected text.",
        "parameters": {
            "type": "object",
            "properties": {
                "prompt": {
                    "type": "string",
                    "description": "The user's instruction, e.g. 'Summarize this in two sentences'."
                },
                "length": {
                    "type": "string",
                    "enum": ["one sentence", "two sentences", "a short paragraph"],
                    "description": "How long the summary should be.",
                    "default": "two sentences"
                }
            },
            "required": ["prompt"]
        },
        "examples": [
            {
                "prompt": "Summarize this",
                "arguments": { "prompt": "Summarize this", "length": "two sentences" }
            },
            {
                "prompt": "Condense this to one sentence",
                "arguments": { "prompt": "Condense this to one sentence", "length": "one sentence" }
            },
            {
                "prompt": "Give me a short paragraph summary",
                "arguments": { "prompt": "Give me a short paragraph summary", "length": "a short paragraph" }
            }
        ]
    });

    return func;
};
```

> `WORD_FUNCTIONS` 将工具的作用域限定为文本文档编辑器。对电子表格使用 `CELL_FUNCTIONS`，对演示文稿使用 `SLIDE_FUNCTIONS`。

## 步骤 2：实现调用处理程序 {#step-2-implement}

将 `func.call` 分配给一个异步函数，该函数读取选定的文本，将其发送到 AI 模型，并将响应流式传输回文档。

``` ts
func.call = async function(params) {
    let selectedText = await Asc.Editor.callCommand(function() {
        let doc = Api.GetDocument();
        let range = doc.GetRangeBySelect();
        return range ? range.GetText() : "";
    });

    if (!selectedText)
        return;

    let length = params.length || "two sentences";
    let prompt = params.prompt + " in " + length + ":\n\n" + selectedText;

    let requestEngine = AI.Request.create(AI.ActionType.Chat);
    if (!requestEngine)
        return;

    let isSentEndAction = false;
    async function checkEndAction() {
        if (!isSentEndAction) {
            await Asc.Editor.callMethod("EndAction", ["Block", "AI (" + requestEngine.modelUI.name + ")"]);
            isSentEndAction = true;
        }
    }

    await Asc.Editor.callMethod("StartAction", ["Block", "AI (" + requestEngine.modelUI.name + ")"]);
    await Asc.Editor.callMethod("StartAction", ["GroupActions"]);

    await requestEngine.chatRequest(prompt, false, async function(data) {
        if (!data)
            return;

        await checkEndAction();
        Asc.scope.data = data;
        await Asc.Editor.callCommand(function() {
            Asc.Library.PasteText(Asc.scope.data);
        });
    });

    await checkEndAction();
    await Asc.Editor.callMethod("EndAction", ["GroupActions"]);
};
```

## 步骤 3：测试工具 {#step-3-test}

1. 在 ONLYOFFICE Docs 或桌面编辑器中打开一个文本文档。
2. 选择一个段落或几个句子。
3. 按 **Ctrl + /** 打开 AI 助手对话框。
4. 输入诸如 `Summarize this` 之类的提示并按 **Enter**。
5. 助手将提示匹配到 `summarizeSelection`，调用 `func.call`，并将摘要流式传输到文档中。

要撤销插入，按 **Ctrl + Z** —— 由于 `StartAction`/`EndAction` 对，整个操作在一步中恢复。

## 完整实现 {#complete-implementation}

以下是准备添加到 AI 插件源代码的完整 `summarizeSelection` 工具。

``` ts
WORD_FUNCTIONS.summarizeSelection = function() {
    let func = new RegisteredFunction({
        "name": "summarizeSelection",
        "text": "Summarize Selection",
        "description": "Use this function when the user asks to summarize, shorten, or condense the selected text.",
        "parameters": {
            "type": "object",
            "properties": {
                "prompt": {
                    "type": "string",
                    "description": "The user's instruction, e.g. 'Summarize this in two sentences'."
                },
                "length": {
                    "type": "string",
                    "enum": ["one sentence", "two sentences", "a short paragraph"],
                    "description": "How long the summary should be.",
                    "default": "two sentences"
                }
            },
            "required": ["prompt"]
        },
        "examples": [
            {
                "prompt": "Summarize this",
                "arguments": { "prompt": "Summarize this", "length": "two sentences" }
            },
            {
                "prompt": "Condense this to one sentence",
                "arguments": { "prompt": "Condense this to one sentence", "length": "one sentence" }
            },
            {
                "prompt": "Give me a short paragraph summary",
                "arguments": { "prompt": "Give me a short paragraph summary", "length": "a short paragraph" }
            }
        ]
    });

    func.call = async function(params) {
        let selectedText = await Asc.Editor.callCommand(function() {
            let doc = Api.GetDocument();
            let range = doc.GetRangeBySelect();
            return range ? range.GetText() : "";
        });

        if (!selectedText)
            return;

        let length = params.length || "two sentences";
        let prompt = params.prompt + " in " + length + ":\n\n" + selectedText;

        let requestEngine = AI.Request.create(AI.ActionType.Chat);
        if (!requestEngine)
            return;

        let isSentEndAction = false;
        async function checkEndAction() {
            if (!isSentEndAction) {
                await Asc.Editor.callMethod("EndAction", ["Block", "AI (" + requestEngine.modelUI.name + ")"]);
                isSentEndAction = true;
            }
        }

        await Asc.Editor.callMethod("StartAction", ["Block", "AI (" + requestEngine.modelUI.name + ")"]);
        await Asc.Editor.callMethod("StartAction", ["GroupActions"]);

        await requestEngine.chatRequest(prompt, false, async function(data) {
            if (!data)
                return;

            await checkEndAction();
            Asc.scope.data = data;
            await Asc.Editor.callCommand(function() {
                Asc.Library.PasteText(Asc.scope.data);
            });
        });

        await checkEndAction();
        await Asc.Editor.callMethod("EndAction", ["GroupActions"]);
    };

    return func;
};
```

有关更多工具示例和模式，请参阅[示例和模式](../custom-ai-tools/examples-and-patterns.md)。
