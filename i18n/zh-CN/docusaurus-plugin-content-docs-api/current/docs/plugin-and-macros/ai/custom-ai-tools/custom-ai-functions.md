---
sidebar_position: 5
---

# 创建自定义函数（测试版）

自定义 AI 工具是定义 AI 助手功能的函数。它们指定：

- 向 AI 模型发送什么请求；
- 对文档执行什么操作。

添加自定义 AI 工具可以扩展 AI 助手的功能，使其适应特定的使用场景。无论是处理文档、电子表格还是演示文稿，自定义 AI 工具都能让您将 AI 驱动的操作直接集成到工作流中，并使助手的行为符合您的需求。

您可以在[这里](../../samples/custom-ai-tools/custom-ai-tools.md)找到现成可用的自定义 AI 工具，或创建自己的工具。

:::caution 当前限制
添加自定义 AI 工具需要直接修改 [AI 插件源代码](https://github.com/ONLYOFFICE/onlyoffice.github.io/tree/master/sdkjs-plugins/content/ai)——然后您可以通过自定义[商店链接](#setup)安装修改后的插件。
:::

## 工作原理 {#how-it-works}

ONLYOFFICE AI 助手中的自定义 AI 工具调用遵循与 [LLM API 中的函数调用](https://platform.openai.com/docs/guides/function-calling)类似的流程：

1. **函数注册。** 每个函数注册时都包含名称、参数列表、描述和使用示例。这些元数据告诉 AI 模型该函数的功能以及何时调用它。
2. **用户提示。** 用户打开 AI 助手并输入请求。
3. **函数选择。** AI 模型检查提示和可用函数列表，然后决定调用哪个函数以及使用什么参数。
4. **执行。** 选定的函数运行：它向 AI 模型发送请求，并使用 [Office API](../../../office-api/get-started/overview.md) 将结果应用于文档。

## 设置 {#setup}

要添加自定义 AI 工具并使其在 AI 助手中可用：

1. 将 [onlyoffice.github.io](https://github.com/ONLYOFFICE/onlyoffice.github.io) 仓库克隆到本地。
2. 在 helpers 文件夹（`sdkjs-plugins/content/ai/.dev/helpers`）中编写函数。根据编辑器类型，将其放在 `cell/`、`slide/` 或 `word/` 子文件夹中（参见下面的[函数注册](#registration)）。
3. 更新 `config.json` 中 AI 插件的当前版本以避免缓存问题（例如 `3.0.3` → `3.0.4`）。
4. 运行 `helpers.py` 文件。
5. 选择 `ai` 文件夹（`sdkjs-plugins/content/ai`）中的所有插件文件，压缩并将存档重命名为 `ai.plugin`。
6. 将文件放回 `sdkjs-plugins/content/ai/deploy`。
7. 推送更改。
8. 从此仓库构建您的 GitHub Pages 站点（参见 [GitHub Pages 文档](https://docs.github.com/en/pages)）。
9. 通过在 GitHub Pages URL 后附加 `/store/index.html` 来准备自定义商店链接：`https://YOUR-USERNAME.github.io/onlyoffice.github.io/store/index.html`。
10. 转到**插件 > 插件管理器**。
11. 点击插件管理器右上角的**商店**图标 `(</>)`，输入您的自定义商店 URL。
12. 更新 AI 插件。

## 示例：commentText 函数 {#example}

`commentText` 函数允许直接向文档添加 AI 生成的注释。以下是其工作方式：

1. 确保 AI 插件已安装并[正确配置](../getting-started/installing-ai-plugin.md)。
2. 选择要留下注释的单词或句子。
3. 打开 AI 助手对话框（**Ctrl + /**）。
4. 为 AI 助手输入指令，例如：`Explain this text` 或 `Add a footnote to this text`。
5. 按 **Enter**。

![commentText 执行](/assets/images/plugins/comment-text-function.png#gh-light-mode-only)![commentText 执行](/assets/images/plugins/comment-text-function.dark.png#gh-dark-mode-only)

AI 助手运行 `commentText` 函数并将注释插入文档。

![commentText 结果](/assets/images/plugins/comment-text-result.png#gh-light-mode-only)![commentText 结果](/assets/images/plugins/comment-text-result.dark.png#gh-dark-mode-only)

## 如何创建自定义 AI 工具 {#creating-ai-tools}

创建自定义 AI 工具涉及两个阶段：

- [函数注册](#registration) — 向助手注册函数及其元数据。
- [函数执行](#execution) — 实现核心逻辑：向 AI 模型发送请求并将结果写入文档。

### 函数注册 {#registration}

使用 `RegisteredFunction` 对象注册函数。传递包含工具元数据的配置对象。

#### 参数 {#parameters}

| 名称 | 类型 | 示例 | 描述 |
| --- | --- | --- | --- |
| `name` | `string` | `"commentText"` | 助手用于标识和调用工具的函数名称。 |
| `parameters` | `object` | `{ type: "object", properties: { prompt: { type: "string" } }, required: ["prompt"] }` | 描述助手将传递的参数的 [JSON Schema](https://json-schema.org/) 对象。 |
| `examples` | `object[]` | `[{ prompt: "Explain this text", arguments: { prompt: "Explain this text", type: "comment" } }]` | 教助手何时以及如何调用函数的示例调用。 |
| `description` | `string` | `"Adds a comment or footnote to explain or annotate the selected text."` | 告诉助手函数的功能以及何时使用它。 |

`RegisteredFunction` 对象在 [helperFuncs.js](https://github.com/ONLYOFFICE/onlyoffice.github.io/blob/master/sdkjs-plugins/content/ai/scripts/helpers/helperFuncs.js) 中定义。

### 函数执行 {#execution}

带有内联注释的完整 `commentText` 函数，解释每个步骤：

```js
(function () {
  let func = new RegisteredFunction({
    name: "commentText",
    description:
      "Adds a comment or footnote to explain or annotate the selected text. If no text is selected, works with the current paragraph.",
    parameters: {
      type: "object",
      properties: {
        prompt: {
          type: "string",
          description: "The instruction for what to explain or comment about the text.",
        },
        type: {
          type: "string",
          enum: ["comment", "footnote"],
          description: "Whether to add as a comment or as a footnote.",
          default: "comment",
        },
      },
      required: ["prompt"],
    },
    examples: [
      {
        prompt: "Explain this text",
        arguments: { prompt: "Explain this text", type: "comment" },
      },
      {
        prompt: "Add a historical context as footnote",
        arguments: { prompt: "Add historical context", type: "footnote" },
      },
      {
        prompt: "Comment on the significance",
        arguments: { prompt: "Explain significance", type: "comment" },
      },
    ],
  });

  func.call = async function (params) {
    let type = params.type;
    let isFootnote = "footnote" === type;

    let text = await Asc.Editor.callCommand(function () {
      let doc = Api.GetDocument();
      let range = doc.GetRangeBySelect();
      let text = range ? range.GetText() : "";

      if (!text) {
        text = doc.GetCurrentWord();
        doc.SelectCurrentWord();
      }

      return text;
    });

    let argPrompt = params.prompt + ":\n" + text;

    let requestEngine = AI.Request.create(AI.ActionType.Chat);
    if (!requestEngine) return;

    let isSendedEndLongAction = false;
    async function checkEndAction() {
      if (!isSendedEndLongAction) {
        await Asc.Editor.callMethod("EndAction", [
          "Block",
          "AI (" + requestEngine.modelUI.name + ")",
        ]);
        isSendedEndLongAction = true;
      }
    }

    await Asc.Editor.callMethod("StartAction", [
      "Block",
      "AI (" + requestEngine.modelUI.name + ")",
    ]);
    await Asc.Editor.callMethod("StartAction", ["GroupActions"]);

    if (isFootnote) {
      let addFootnote = true;

      await requestEngine.chatRequest(argPrompt, false, async function (data) {
        if (!data) return;

        await checkEndAction();

        Asc.scope.data = data;
        Asc.scope.model = requestEngine.modelUI.name;

        if (addFootnote) {
          await Asc.Editor.callCommand(function () {
            Api.GetDocument().AddFootnote();
          });
          addFootnote = false;
        }

        await Asc.Library.PasteText(data);
      });
    } else {
      let commentId = null;

      await requestEngine.chatRequest(argPrompt, false, async function (data) {
        if (!data) return;

        await checkEndAction();

        Asc.scope.data = data;
        Asc.scope.model = requestEngine.modelUI.name;
        Asc.scope.commentId = commentId;

        commentId = await Asc.Editor.callCommand(function () {
          let doc = Api.GetDocument();

          let commentId = Asc.scope.commentId;
          if (!commentId) {
            let range = doc.GetRangeBySelect();
            if (!range) return null;

            let comment = range.AddComment(
              Asc.scope.data,
              Asc.scope.model,
              "uid" + Asc.scope.model
            );
            if (!comment) return null;

            doc.ShowComment([comment.GetId()]);
            return comment.GetId();
          }

          let comment = doc.GetCommentById(commentId);
          if (!comment) return commentId;

          comment.SetText(comment.GetText() + Asc.scope.data);
          return commentId;
        });
      });
    }

    await checkEndAction();
    await Asc.Editor.callMethod("EndAction", ["GroupActions"]);
  };

  return func;
})();
```

> [StartAction](../../interacting-with-editors/text-document-api/Methods/StartAction.md) 和 [EndAction](../../interacting-with-editors/text-document-api/Methods/EndAction.md) 对确保整个操作——包括所有流式传输块——可以通过单次 **Ctrl + Z** 回滚。

AI 助手功能将持续发展。通过创建针对您特定使用场景的自定义工具来扩展其功能。
