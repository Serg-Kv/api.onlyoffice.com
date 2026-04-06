---
sidebar_position: 3
---

# 示例和模式

本页介绍常见的自定义 AI 工具设计和构建 ONLYOFFICE 编辑器工具时可应用的常见模式。

## 模式 1：文档内容插入 {#pattern-insertion}

一个使用 AI 模型生成内容并将其插入到当前光标位置的工具。这是最常见的模式。

``` ts
WORD_FUNCTIONS.generateSummary = function() {
    let func = new RegisteredFunction({
        "name": "generateSummary",
        "text": "Generate Summary",
        "description": "Use this function when the user asks to summarize, shorten, or condense the document content.",
        "parameters": {
            "type": "object",
            "properties": {
                "prompt": {
                    "type": "string",
                    "description": "The user's instruction."
                },
                "length": {
                    "type": "string",
                    "enum": ["short", "medium", "long"],
                    "description": "Desired summary length.",
                    "default": "medium"
                }
            },
            "required": ["prompt"]
        },
        "examples": [
            {
                "prompt": "Summarize this document",
                "arguments": { "prompt": "Summarize this document", "length": "medium" }
            },
            {
                "prompt": "Write a short summary",
                "arguments": { "prompt": "Write a short summary", "length": "short" }
            }
        ]
    });

    func.call = async function(params) {
        let length = params.length || "medium";

        let text = await Asc.Editor.callCommand(function() {
            return Api.GetDocument().GetRangeBySelect()?.GetText() || "";
        });

        if (!text)
            return;

        let requestEngine = AI.Request.create(AI.ActionType.Chat);
        if (!requestEngine)
            return;

        let prompt = "Write a " + length + " summary of the following text:\n" + text;

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

## 模式 2：无 AI 模型请求的格式化 {#pattern-formatting}

一个直接使用 Office API 应用格式的工具，无需向 AI 模型发送请求。当 AI 只需要识别应用哪种格式时，使用此模式进行确定性操作。

``` ts
WORD_FUNCTIONS.applyHeading = function() {
    let func = new RegisteredFunction({
        "name": "applyHeading",
        "text": "Apply Heading Style",
        "description": "Use this function when the user asks to apply a heading style to the selected paragraph.",
        "parameters": {
            "type": "object",
            "properties": {
                "prompt": {
                    "type": "string",
                    "description": "The user's instruction."
                },
                "level": {
                    "type": "number",
                    "description": "Heading level from 1 to 6."
                }
            },
            "required": ["prompt"]
        },
        "examples": [
            {
                "prompt": "Make this a heading",
                "arguments": { "prompt": "Make this a heading", "level": 1 }
            },
            {
                "prompt": "Apply heading 2",
                "arguments": { "prompt": "Apply heading 2", "level": 2 }
            }
        ]
    });

    func.call = async function(params) {
        let level = params.level || 1;

        if (level < 1 || level > 6)
            return;

        Asc.scope.styleName = "Heading " + level;

        await Asc.Editor.callMethod("StartAction", ["Block", "AI (applyHeading)"]);

        await Asc.Editor.callCommand(function() {
            let doc = Api.GetDocument();
            let range = doc.GetRangeBySelect();
            if (!range)
                return;

            let paragraph = range.GetElement(0);
            if (paragraph) {
                paragraph.SetStyle(Api.GetStyle(Asc.scope.styleName));
            }
        });

        await Asc.Editor.callMethod("EndAction", ["Block", "AI (applyHeading)"]);
    };

    return func;
};
```

## 模式 3：电子表格数据工具 {#pattern-spreadsheet}

一个针对电子表格编辑器的工具，读取单元格数据，使用 AI 处理，然后将结果写回。

``` ts
CELL_FUNCTIONS.explainCell = function() {
    let func = new RegisteredFunction({
        "name": "explainCell",
        "text": "Explain Cell",
        "description": "Use this function to explain the value or formula of the currently selected cell.",
        "parameters": {
            "type": "object",
            "properties": {
                "prompt": {
                    "type": "string",
                    "description": "The user's instruction."
                }
            },
            "required": ["prompt"]
        },
        "examples": [
            {
                "prompt": "Explain this cell",
                "arguments": { "prompt": "Explain this cell" }
            },
            {
                "prompt": "What does this formula do?",
                "arguments": { "prompt": "What does this formula do?" }
            }
        ]
    });

    func.call = async function(params) {
        let cellValue = await Asc.Editor.callCommand(function() {
            let sheet = Api.GetActiveSheet();
            let range = sheet.GetSelection();
            return range ? range.GetValue() : "";
        });

        if (!cellValue)
            return;

        let requestEngine = AI.Request.create(AI.ActionType.Chat);
        if (!requestEngine)
            return;

        let prompt = params.prompt + ":\n" + cellValue;

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

## 模式选择 {#choosing}

| 使用场景 | 遵循的模式 |
| -------- | ---------- |
| 生成或改写文本并插入文档 | 模式 1（内容插入） |
| 应用由 AI 确定的样式、格式或结构更改 | 模式 2（无 AI 请求的格式化） |
| 读取单元格或幻灯片数据，用 AI 处理，然后写回结果 | 模式 3（电子表格/数据工具） |
| 将 AI 生成的内容与程序化文档更改结合 | 结合模式 1 和模式 2 |

有关更完整的工具实现，请参阅[自定义 AI 工具示例](../../samples/custom-ai-tools/custom-ai-tools.md)。
