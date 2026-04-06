---
sidebar_position: 1
---

# 创建自定义 AI 工具

本页介绍创建 ONLYOFFICE AI 助手可以调用的自定义 AI 工具的核心概念和实现步骤。

## 核心概念 {#concept}

自定义 AI 工具围绕 `RegisteredFunction` 对象构建。您通过传递包含元数据字段的配置对象来创建实例，然后分配一个 `call` 处理程序，该处理程序在 AI 调用工具时运行。配置好的对象从工厂函数返回，并通过适当的编辑器函数映射注册到 AI 助手。

## 步骤 1：创建工厂函数 {#step-factory}

将工具定义封装在工厂函数中，并将其添加到与目标编辑器匹配的函数映射中：

``` ts
WORD_FUNCTIONS.myTool = function() {
    let func = new RegisteredFunction({ ... });
    return func;
};
```

对文本文档使用 `WORD_FUNCTIONS`，对电子表格使用 `CELL_FUNCTIONS`，对演示文稿使用 `SLIDE_FUNCTIONS`。

## 步骤 2：定义配置对象 {#step-config}

将配置对象传递给 `RegisteredFunction` 构造函数。AI 助手读取此元数据以确定何时以及如何调用工具：

``` ts
WORD_FUNCTIONS.myTool = function() {
    let func = new RegisteredFunction({
        "name": "myTool",
        "text": "Apply Paragraph Style",
        "description": "Use this function when the user asks to change the style of a paragraph.",
        "parameters": {
            "type": "object",
            "properties": {
                "prompt": {
                    "type": "string",
                    "description": "The user's instruction."
                },
                "targetStyle": {
                    "type": "string",
                    "description": "The paragraph style to apply, e.g. 'Heading 1'."
                }
            },
            "required": ["prompt"]
        },
        "examples": [
            {
                "prompt": "Make it a heading",
                "arguments": { "prompt": "Make it a heading", "targetStyle": "Heading 1" }
            },
            {
                "prompt": "Reset paragraph style",
                "arguments": { "prompt": "Reset paragraph style", "targetStyle": "Normal" }
            }
        ]
    });

    return func;
};
```

| 字段 | 描述 |
| --- | --- |
| `name` | 助手用于调用工具的标识符。 |
| `text` | 在 UI 中显示的简短名称。 |
| `description` | 告诉助手此工具的功能以及何时使用它。 |
| `parameters` | 描述助手将传递的参数的 JSON Schema 对象。 |
| `examples` | 带有匹配参数对象的示例提示，教助手如何调用工具。 |

提供至少两个涵盖不同有效输入的 `examples`，以提高匹配准确性。

## 步骤 3：实现调用处理程序 {#step-call}

将异步函数分配给 `func.call`。此处理程序接收 AI 助手从其响应中解析的参数对象：

``` ts
func.call = async function(params) {
    let style = params.targetStyle || "Normal";

    // Starts a block action so the change can be undone in a single step.
    await Asc.Editor.callMethod("StartAction", ["Block", "AI (myTool)"]);

    Asc.scope.style = style;
    await Asc.Editor.callCommand(function() {
        let doc = Api.GetDocument();
        let paragraph = doc.GetElement(0);
        if (paragraph) {
            paragraph.SetStyle(Api.GetStyle(Asc.scope.style));
        }
    });

    await Asc.Editor.callMethod("EndAction", ["Block", "AI (myTool)"]);
};
```

> `Asc.scope` 对象是将数据从外部插件上下文传递到 `callCommand` 闭包的正确方式。在闭包外部声明的变量无法在闭包内部直接访问。

## 完整示例 {#full-example}

``` ts
WORD_FUNCTIONS.myTool = function() {
    let func = new RegisteredFunction({
        "name": "myTool",
        "text": "Apply Paragraph Style",
        "description": "Use this function when the user asks to change the style of a paragraph.",
        "parameters": {
            "type": "object",
            "properties": {
                "prompt": {
                    "type": "string",
                    "description": "The user's instruction."
                },
                "targetStyle": {
                    "type": "string",
                    "description": "The paragraph style to apply, e.g. 'Heading 1'."
                }
            },
            "required": ["prompt"]
        },
        "examples": [
            {
                "prompt": "Make it a heading",
                "arguments": { "prompt": "Make it a heading", "targetStyle": "Heading 1" }
            },
            {
                "prompt": "Reset paragraph style",
                "arguments": { "prompt": "Reset paragraph style", "targetStyle": "Normal" }
            }
        ]
    });

    func.call = async function(params) {
        let style = params.targetStyle || "Normal";

        await Asc.Editor.callMethod("StartAction", ["Block", "AI (myTool)"]);

        Asc.scope.style = style;
        await Asc.Editor.callCommand(function() {
            let doc = Api.GetDocument();
            let paragraph = doc.GetElement(0);
            if (paragraph) {
                paragraph.SetStyle(Api.GetStyle(Asc.scope.style));
            }
        });

        await Asc.Editor.callMethod("EndAction", ["Block", "AI (myTool)"]);
    };

    return func;
};
```

## 在工具内使用 AI {#using-ai}

如果您的工具需要向 AI 模型发送请求（例如，在插入之前生成文本），请使用 `AI.Request.create` 初始化请求引擎，并使用 `StartAction`/`EndAction` 包装调用。使用 `requestEngine.modelUI.name` 使操作标签反映活动模型：

``` ts
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

await requestEngine.chatRequest(params.prompt, false, async function(data) {
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
```

> `checkEndAction` 确保即使回调在流式传输期间多次触发，`EndAction` 也只被调用一次。始终在回调内部（首次数据时）和 `chatRequest` 完成后都调用它。

`AI.Request.create` 和 `chatRequest` 方法在 [engine.js](https://github.com/ONLYOFFICE/onlyoffice.github.io/blob/master/sdkjs-plugins/content/ai/scripts/engine/engine.js) 中定义。

有关参数和模式定义的更深入了解，请参阅[工具结构](tool-structure.md)。
