---
sidebar_position: 3
---

# Custom AI tools reference

This page is the technical reference for all APIs used when creating custom AI tools.

## RegisteredFunction

`RegisteredFunction` is the core object used to register a custom AI tool with the agent. It is defined in [helperFuncs.js](https://github.com/ONLYOFFICE/onlyoffice.github.io/blob/master/sdkjs-plugins/content/ai/scripts/helpers/helperFuncs.js).

### Constructor parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `name` | `string` | Yes | The function identifier. Must be unique across all registered tools. Used by the AI model to call this tool. |
| `description` | `string` | Yes | Explains to the AI model what this tool does and when to use it. Write it as a clear, specific instruction. |
| `parameters` | `object` | Yes | A JSON Schema object describing the arguments the AI model should pass when calling this tool. |
| `examples` | `array of objects` | Yes | Sample calls that teach the model the correct argument format. Each entry has a `prompt` (user input) and `arguments` (expected model output). |

### parameters schema

The `parameters` field follows the [JSON Schema](https://json-schema.org/) specification:

```js
parameters: {
  type: "object",
  properties: {
    paramName: {
      type: "string" | "number" | "boolean",
      description: "What this parameter controls",
      enum: ["value1", "value2"],  // optional: restrict to specific values
      default: "value1",           // optional: default value
    },
  },
  required: ["paramName"],         // list of required parameter names
}
```

### examples format

```js
examples: [
  {
    prompt: "The user input that triggers this call",
    arguments: {
      paramName: "value the model should supply",
    },
  },
]
```

Provide at least 2–3 diverse examples to improve model accuracy.


## AI.Request

`AI.Request` is the interface for sending requests to the configured AI model.

### AI.Request.create()

```js
let requestEngine = AI.Request.create(actionType);
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `actionType` | `AI.ActionType` | The type of AI operation to perform |

Returns a request engine object, or `null` if no model is configured for the given action type.

### AI.ActionType

| Value | Description |
|-------|-------------|
| `AI.ActionType.Chat` | General text generation and conversation |
| `AI.ActionType.Image` | Image generation |
| `AI.ActionType.Embeddings` | Semantic embeddings |

### requestEngine.chatRequest()

```js
await requestEngine.chatRequest(prompt, stream, callback);
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `prompt` | `string` | The text prompt sent to the AI model |
| `stream` | `boolean` | `false` to receive the full response at once; `true` for token-by-token streaming |
| `callback` | `async function(data)` | Called for each response chunk (or once for non-streaming) |

### requestEngine.modelUI

An object describing the active model:

| Property | Type | Description |
|----------|------|-------------|
| `name` | `string` | Display name of the model (e.g., `"GPT-4o"`) |


## Asc.Editor

`Asc.Editor` provides the bridge between the plugin context and the editor context.

### Asc.Editor.callCommand()

Executes a function inside the editor context, where Office API methods are available:

```js
let result = await Asc.Editor.callCommand(function () {
  // Office API calls available here
  let doc = Api.GetDocument();
  return doc.GetCurrentWord();
});
```

Data passed between contexts must use `Asc.scope`:

```js
Asc.scope.myValue = "hello";

await Asc.Editor.callCommand(function () {
  let value = Asc.scope.myValue; // "hello"
});
```

### Asc.Editor.callMethod()

Calls a built-in editor method by name:

```js
await Asc.Editor.callMethod("StartAction", ["Block", "AI (GPT-4o)"]);
await Asc.Editor.callMethod("EndAction", ["Block", "AI (GPT-4o)"]);
await Asc.Editor.callMethod("StartAction", ["GroupActions"]);
await Asc.Editor.callMethod("EndAction", ["GroupActions"]);
```

### Asc.Library.PasteText()

Inserts text at the current cursor position:

```js
await Asc.Library.PasteText(text);
```


## Action tracking pattern

Wrap all document changes in `StartAction`/`EndAction` so that the entire AI operation can be undone as a single step:

```js
// Start the undo block
await Asc.Editor.callMethod("StartAction", ["Block", "AI (" + requestEngine.modelUI.name + ")"]);
await Asc.Editor.callMethod("StartAction", ["GroupActions"]);

// ... perform document changes ...

// End the undo block
await Asc.Editor.callMethod("EndAction", ["GroupActions"]);
await Asc.Editor.callMethod("EndAction", ["Block", "AI (" + requestEngine.modelUI.name + ")"]);
```

For streaming responses, call `EndAction` on the first data chunk (not after the full response):

```js
let ended = false;
async function checkEndAction() {
  if (!ended) {
    await Asc.Editor.callMethod("EndAction", ["Block", "AI (" + requestEngine.modelUI.name + ")"]);
    ended = true;
  }
}
```


## Office API methods commonly used in tools

| Method | Description | Link |
|--------|-------------|------|
| `Api.GetDocument()` | Get the active document | [Reference](../../interacting-with-editors/overview/overview.md) |
| `doc.GetRangeBySelect()` | Get the current selection | [Reference](../../interacting-with-editors/overview/overview.md) |
| `doc.GetCurrentWord()` | Get the word at the cursor | [Reference](../../interacting-with-editors/overview/overview.md) |
| `doc.SelectCurrentWord()` | Select the word at the cursor | [Reference](../../interacting-with-editors/overview/overview.md) |
| `range.GetText()` | Get text content of a range | [Reference](../../interacting-with-editors/overview/overview.md) |
| `range.AddComment()` | Add a comment to a range | [Reference](../../interacting-with-editors/overview/overview.md) |
| `doc.AddFootnote()` | Add a footnote at the cursor | [Reference](../../interacting-with-editors/overview/overview.md) |
| `doc.ShowComment()` | Show a comment in the UI | [Reference](../../interacting-with-editors/overview/overview.md) |
| `StartAction` / `EndAction` | Wrap changes for undo/redo | [StartAction](../../interacting-with-editors/text-document-api/Methods/StartAction.md) · [EndAction](../../interacting-with-editors/text-document-api/Methods/EndAction.md) |
