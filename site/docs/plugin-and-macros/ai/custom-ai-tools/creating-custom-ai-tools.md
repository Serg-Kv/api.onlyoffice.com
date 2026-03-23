---
sidebar_position: 2
---

# Creating custom AI tools

This page walks you through creating a custom AI tool from scratch, using the `commentText` function as a running example.

**Estimated time:** 30–60 minutes
**Prerequisites:** Basic JavaScript knowledge, Git installed

## Setup {#setup}

To add a custom AI tool and make it available in the AI agent:

1. Clone the [onlyoffice.github.io](https://github.com/ONLYOFFICE/onlyoffice.github.io) repository to your local machine.
2. Write your function in the helpers folder (`sdkjs-plugins/content/ai/.dev/helpers`). Depending on the editor type, place it in the `cell/`, `slide/`, or `word/` folder (see [Function registration](#registration) below).
3. Update the current version of the AI plugin in `config.json` to avoid caching issues (for example, `3.0.3` → `3.0.4`).
4. Run the `helpers.py` file.
5. Select all plugin files in the `ai` folder (`sdkjs-plugins/content/ai`), zip them, and rename the archive to `ai.plugin`.
6. Place the file back into `sdkjs-plugins/content/ai/deploy`.
7. Push the changes.
8. Build your GitHub Pages site from this repository (see the [GitHub Pages documentation](https://docs.github.com/en/pages)).
9. Prepare a link to your custom store by appending `/store/index.html` to your GitHub Pages URL: `https://YOUR-USERNAME.github.io/onlyoffice.github.io/store/index.html`.
10. Go to **Plugins → Plugin Manager**.
11. Click the **Store** icon `(</>)` in the top-right corner of the Plugin Manager and enter your custom store URL.
12. Update the AI plugin.

## Phase 1: Function registration {#registration}

Every custom AI tool starts with a `RegisteredFunction` object. This is the metadata the AI model uses to decide when and how to call your tool.

### Minimal example

```js
let func = new RegisteredFunction({
  name: "commentText",
  description: "Adds a comment or footnote to explain or annotate the selected text. If no text is selected, works with the current paragraph.",
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
  ],
});
```

### What each field does

| Field | Purpose |
|-------|---------|
| `name` | Unique identifier used by the AI model to call this tool |
| `description` | Tells the model when to use this tool — write it as a clear instruction |
| `parameters` | JSON Schema object describing the arguments the model should provide |
| `examples` | Sample calls that teach the model the correct argument format |

For the full parameter reference, see [Custom AI tools reference](custom-ai-tools-reference.md).

## Phase 2: Function execution {#execution}

After registration, implement the tool's logic in `func.call`:

```js
func.call = async function (params) {
  // Step 1: Retrieve content from the document
  let text = await Asc.Editor.callCommand(function () {
    let doc = Api.GetDocument();
    let range = doc.GetRangeBySelect();
    return range ? range.GetText() : doc.GetCurrentWord();
  });

  // Step 2: Build the prompt
  let argPrompt = params.prompt + ":\n" + text;

  // Step 3: Create a request engine
  let requestEngine = AI.Request.create(AI.ActionType.Chat);
  if (!requestEngine) return;

  // Step 4: Track undo/redo as a single block
  await Asc.Editor.callMethod("StartAction", ["Block", "AI (" + requestEngine.modelUI.name + ")"]);
  await Asc.Editor.callMethod("StartAction", ["GroupActions"]);

  // Step 5: Send the request and handle the streaming response
  await requestEngine.chatRequest(argPrompt, false, async function (data) {
    if (!data) return;
    Asc.scope.data = data;
    await Asc.Editor.callCommand(function () {
      // Insert the AI response into the document
      // (implementation varies by tool type)
    });
  });

  await Asc.Editor.callMethod("EndAction", ["GroupActions"]);
};

return func;
```

### The five-step execution pattern

| Step | What it does | Key API |
|------|-------------|---------|
| 1. Retrieve content | Read selected text or document state | `Asc.Editor.callCommand`, `Api.GetDocument()` |
| 2. Build prompt | Combine user instruction with document content | JavaScript string operations |
| 3. Create request engine | Initialize the AI communication channel | `AI.Request.create(AI.ActionType.Chat)` |
| 4. Track actions | Wrap changes so they can be undone as one block | `StartAction` / `EndAction` |
| 5. Send request | Stream response and insert result | `requestEngine.chatRequest()` |

## Complete example: commentText

The following is the full `commentText` implementation with inline comments:

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

    // 1) Retrieve the selected text (or fallback to the current word).
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

    // 2) Build the prompt.
    let argPrompt = params.prompt + ":\n" + text;

    // 3) Initialize the request engine.
    let requestEngine = AI.Request.create(AI.ActionType.Chat);
    if (!requestEngine) return;

    // Helper to call EndAction only once across streaming chunks.
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

    // 4) Start action tracking.
    await Asc.Editor.callMethod("StartAction", [
      "Block",
      "AI (" + requestEngine.modelUI.name + ")",
    ]);
    await Asc.Editor.callMethod("StartAction", ["GroupActions"]);

    // 5) Send request and insert result.
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

> To ensure the entire block of changes can be rolled back, we use [StartAction](../../interacting-with-editors/text-document-api/Methods/StartAction.md) and [EndAction](../../interacting-with-editors/text-document-api/Methods/EndAction.md) methods across the function.

## Next steps

- [Custom AI tools reference](custom-ai-tools-reference.md) — full API reference for `RegisteredFunction`, `AI.Request`, and helpers
- [Testing and debugging](testing-and-debugging.md) — how to test and troubleshoot your tool
- [Custom AI tool samples](../../samples/custom-ai-tools-samples/custom-ai-tools-samples.md) — 19 ready-made examples across all editor types
