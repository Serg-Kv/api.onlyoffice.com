---
sidebar_position: 4
---

# 测试和调试

本页介绍如何验证自定义 AI 工具、处理重试以及诊断不正确或意外的输出。

## 验证工具注册 {#validating-registration}

在测试工具逻辑之前，请在插件加载后通过在浏览器控制台中检查函数映射来确认工具已正确注册：

``` ts
console.log(Object.keys(WORD_FUNCTIONS));
```

如果您的工具名称出现在输出中，则工厂函数已成功运行。如果缺失，请检查工厂函数是否在插件初始化期间被调用，以及函数是否返回了 `RegisteredFunction` 对象。

## 测试工具调用 {#testing-invocation}

要在不通过 AI 助手的情况下测试工具，请调用工厂函数并直接使用模拟参数对象调用 `func.call`：

``` ts
let func = WORD_FUNCTIONS.myTool();
func.call({ prompt: "Test prompt", targetStyle: "Heading 1" });
```

这将工具逻辑与 AI 模型隔离，让您可以独立验证文档更改。

## 在浏览器开发者工具中调试 {#debugging}

在插件处于活动状态时打开浏览器开发者工具（`F12`）。来自插件脚本的所有 `console.log` 和 `console.error` 调用都会出现在**控制台**选项卡中。有用的记录检查点：

- `func.call` 开始时的参数值
- `callCommand` 返回的值
- `chatRequest` 回调中的 `data` 参数
- 任何可能为 `null` 的 Office API 返回值

有关在 Web 编辑器插件环境中打开开发者工具的说明，请参阅[Web 编辑器调试](../../tutorials/debugging/for-web-editors.md)。

## 处理重试 {#retries}

如果工具静默失败，AI 助手不会自动重试工具调用。如果您的工具可能由于瞬态条件（例如 `chatRequest` 中的网络请求）而失败，请手动实现重试逻辑：

``` ts
func.call = async function(params) {
    const maxAttempts = 3;
    let attempt = 0;
    let success = false;

    while (attempt < maxAttempts && !success) {
        attempt++;
        try {
            let requestEngine = AI.Request.create(AI.ActionType.Chat);
            if (!requestEngine)
                break;

            await requestEngine.chatRequest(params.prompt, false, async function(data) {
                if (!data)
                    return;

                Asc.scope.data = data;
                await Asc.Editor.callCommand(function() {
                    Asc.Library.PasteText(Asc.scope.data);
                });
                success = true;
            });
        } catch (e) {
            console.warn("Attempt " + attempt + " failed:", e);
        }
    }

    if (!success) {
        console.error("myTool failed after " + maxAttempts + " attempts.");
    }
};
```

## 不正确或意外的输出 {#incorrect-outputs}

如果 AI 助手使用错误的参数值调用工具，最常见的原因是：

- **模糊的 `params` 描述。** 如果 AI 无法从描述中确定正确的值，它会猜测。使描述明确，并包含预期的类型和有效值。
- **`examples` 太少。** 只有一个示例时，助手可能无法正确泛化。添加涵盖不同参数组合的示例，包括边缘情况。
- **工具名称冲突。** 如果两个已注册工具具有相似的名称或描述，助手可能会调用错误的工具。使 `func.description` 独特且具体。

**不正确输出的检查清单：**

1. 在 `func.call` 开始时记录原始 `params` 对象，并验证值是否符合您的预期。
2. 检查 `examples` 和 `params` 字段是否存在歧义。
3. 隔离测试工具（参见[测试工具调用](#testing-invocation)）。
4. 如果助手持续选择错误的工具，请添加更具体的 `func.description`。

## 撤销状态问题 {#undo-state}

如果工具失败后编辑器的撤销历史损坏，最可能的原因是不平衡的 `StartAction`/`EndAction` 对。始终使用 `try/finally` 确保 `EndAction` 被调用：

``` ts
func.call = async function(params) {
    await Asc.Editor.callMethod("StartAction", ["Block", "AI (myTool)"]);
    try {
        // Tool logic here.
    } finally {
        await Asc.Editor.callMethod("EndAction", ["Block", "AI (myTool)"]);
    }
};
```

有关 `StartAction` 和 `EndAction` 的更多详情，请参阅 [StartAction](../../interacting-with-editors/text-document-api/Methods/StartAction.md) 和 [EndAction](../../interacting-with-editors/text-document-api/Methods/EndAction.md)。
