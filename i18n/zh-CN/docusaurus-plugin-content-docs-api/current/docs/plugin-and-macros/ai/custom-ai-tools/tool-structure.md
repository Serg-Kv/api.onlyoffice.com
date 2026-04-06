---
sidebar_position: 2
---

# 工具结构

本页描述自定义 AI 工具的完整结构，涵盖配置对象、JSON Schema 参数、示例格式、UI 命名规范和错误处理。

## RegisteredFunction 字段 {#fields}

| 字段 | 类型 | 必需 | 描述 |
| ----- | ---- | ---- | ----------- |
| `name` | `string` | 是 | 助手用于调用工具的标识符。在所有已注册工具中必须唯一。 |
| `text` | `string` | 是 | 在 UI 中显示的简短名称（例如 `"Add Comment to Text"`）。 |
| `description` | `string` | 是 | 描述工具用途的句子。当注册了多个工具时，帮助助手选择正确的工具。 |
| `parameters` | `object` | 是 | 描述助手将传递给工具的参数的 JSON Schema 对象。 |
| `examples` | `object[]` | 是 | 教助手何时以及如何调用工具的示例调用。 |
| `call` | `async function` | 是 | 助手调用工具时运行的处理程序。在构造后分配。接收一个包含从助手响应中解析的值的 `params` 对象。 |

## 参数格式 {#params-format}

`parameters` 字段遵循 [JSON Schema](https://json-schema.org/) 格式。将每个参数定义为具有 `type` 和 `description` 的属性。在 `required` 数组中标记必需参数。

``` ts
"parameters": {
    "type": "object",
    "properties": {
        "prompt": {
            "type": "string",
            "description": "The user's instruction."
        },
        "count": {
            "type": "number",
            "description": "The number of rows to insert."
        },
        "position": {
            "type": "string",
            "enum": ["before", "after"],
            "description": "Where to insert — before or after the selection.",
            "default": "after"
        }
    },
    "required": ["prompt"]
}
```

使用 `enum` 将参数限制为固定值集。使用 `default` 记录省略参数时的回退值。

## 示例格式 {#examples-format}

`examples` 中的每个条目都是一个包含两个字段的对象：

- `prompt` — 用户可能输入的自然语言短语。
- `arguments` — 助手应生成的确切参数对象。

``` ts
"examples": [
    {
        "prompt": "Insert 3 rows after the selection",
        "arguments": { "prompt": "Insert 3 rows after the selection", "count": 3, "position": "after" }
    },
    {
        "prompt": "Add a row before this one",
        "arguments": { "prompt": "Add a row before this one", "count": 1, "position": "before" }
    }
]
```

每个工具至少提供两个示例。涵盖参数的各种变化——包括省略可选参数的情况——以提高助手的匹配准确性。

## UI 命名 {#ui-naming}

在编辑器 UI 中显示工具名称或结果时，请遵循以下规范：

- `text` 字段使用句子式大小写：`"Insert rows"`，而非 `"Insert Rows"`。
- 产品名称使用 **ONLYOFFICE**，而非 **OnlyOffice** 或 **Onlyoffice**。
- 使用 UI 中显示的确切编辑器名称：**Text Document Editor**、**Spreadsheet Editor**、**Presentation Editor**。
- 引用 UI 元素（如选项卡、按钮或菜单项）时使用**粗体**：点击**确定**，打开**AI**选项卡。

## 翻译 {#translations}

工具元数据（`parameters`、`examples`、`description`）始终用英文编写，因为它们直接发送到 AI 模型。请勿本地化这些字段。

您的工具插入到文档中或在通知中显示的面向用户的字符串应来自插件的本地化文件。有关插件本地化的详细信息，请参阅[本地化](../../structure/localization.md)页面。

## 错误处理 {#error-handling}

在 `func.call` 中显式处理错误。不要让未处理的拒绝传播——如果已经调用了 `StartAction`，它们可能使编辑器处于不一致的撤销状态。

安全模式：

``` ts
func.call = async function(params) {
    await Asc.Editor.callMethod("StartAction", ["Block", "AI (myTool)"]);

    try {
        Asc.scope.value = params.value;
        await Asc.Editor.callCommand(function() {
            let doc = Api.GetDocument();
            // Tool logic here.
        });
    } catch (e) {
        console.error("myTool failed:", e);
    } finally {
        await Asc.Editor.callMethod("EndAction", ["Block", "AI (myTool)"]);
    }
};
```

始终在 `finally` 块中调用 `EndAction`，以确保即使发生错误，撤销堆栈也保持平衡。

### 常见错误场景 {#error-scenarios}

| 场景 | 建议处理方式 |
| -------- | -------------------- |
| 必需参数缺失或类型错误 | 记录日志后提前返回；不要调用 `StartAction`。 |
| `callCommand` 返回 `null`（无选择） | 使用 `Asc.plugin.showMessage` 显示通知并返回。 |
| AI 模型请求失败 | 检查 `chatRequest` 的返回值；妥善处理 `null` 或错误响应。 |
| Office API 方法在目标编辑器中不可用 | 用 `try/catch` 包装并回退到替代实现。 |
