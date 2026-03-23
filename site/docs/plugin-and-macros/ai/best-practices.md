---
sidebar_position: 6
---

# Best practices

This page covers recommendations for building reliable, cost-efficient, and user-friendly AI integrations with the ONLYOFFICE AI plugin.

## Prompt engineering

### Write specific tool descriptions

The `description` field in `RegisteredFunction` directly controls whether the AI model calls your tool or not. Write it as a clear, specific instruction:

```js
// Too vague — model may not call this tool
description: "Handles text"

// Specific — model knows exactly when to use it
description: "Adds an AI-generated comment or footnote to the selected text to explain, annotate, or provide historical context. If no text is selected, works with the current paragraph."
```

### Use examples to teach argument format

Provide at least 2–3 diverse examples that cover different use cases and argument values:

```js
examples: [
  { prompt: "Explain this term", arguments: { prompt: "Explain this term", type: "comment" } },
  { prompt: "Add a footnote with historical context", arguments: { prompt: "Add historical context", type: "footnote" } },
  { prompt: "What does this mean?", arguments: { prompt: "Explain the meaning", type: "comment" } },
]
```

### Keep prompts focused

When building the prompt inside `func.call`, combine the user instruction with only the relevant document content. Avoid sending the entire document when only a selection is needed:

```js
// Send only what the model needs
let argPrompt = params.prompt + ":\n" + selectedText;

// Avoid sending large amounts of unnecessary context
```


## Managing API costs

### Choose the right model for each task

Assign lightweight models to simple, high-frequency tasks and reserve larger models for complex reasoning:

| Task type | Recommended model tier |
|-----------|----------------------|
| Formatting, short edits | Small/fast models (e.g., GPT-4o mini) |
| Summarization, translation | Mid-tier models |
| Complex analysis, code generation | Large models (e.g., GPT-4o, Claude) |

### Consider self-hosted models

For high-volume or cost-sensitive workflows, consider running a local model with [Ollama](providers/configuring-ollama-with-cors.md). Self-hosted models eliminate per-request costs entirely.

### Avoid unnecessary AI requests

Only call the AI model when the task genuinely requires it. For deterministic operations (formatting, structure changes), use the Office API directly without an AI request.


## Handling async operations

### Always await async calls

Every `Asc.Editor.callCommand`, `Asc.Editor.callMethod`, and `requestEngine.chatRequest` call is async. Missing an `await` leads to race conditions and unpredictable document state:

```js
// Incorrect — missing await
Asc.Editor.callCommand(function () {
  return Api.GetDocument().GetCurrentWord();
});

// Correct
let word = await Asc.Editor.callCommand(function () {
  return Api.GetDocument().GetCurrentWord();
});
```

### Handle the null requestEngine case

Always check that `AI.Request.create()` returned a valid engine before proceeding:

```js
let requestEngine = AI.Request.create(AI.ActionType.Chat);
if (!requestEngine) {
  // Inform the user or exit gracefully
  return;
}
```

### Use StartAction/EndAction consistently

Wrap all document modifications in `StartAction`/`EndAction` so users can undo the entire AI operation as a single step. See the [action tracking pattern](custom-ai-tools/custom-ai-tools-reference.md#action-tracking-pattern).


## User experience considerations

### Show feedback during long operations

AI requests can take several seconds. The `StartAction` call with the `"Block"` type shows a loading indicator in the editor UI automatically — make sure to always call it before sending the AI request.

### Design for streaming

Streaming responses (receiving text chunk by chunk) feel faster and more responsive to users. Use the streaming callback pattern and insert text progressively rather than waiting for the full response.

### Handle empty selections gracefully

Always check whether text is selected before proceeding. Fall back to a sensible default (e.g., the current word or paragraph):

```js
let text = await Asc.Editor.callCommand(function () {
  let doc = Api.GetDocument();
  let range = doc.GetRangeBySelect();
  if (!range || !range.GetText()) {
    // Fallback: use the current word
    doc.SelectCurrentWord();
    return doc.GetCurrentWord();
  }
  return range.GetText();
});
```


## Privacy and data handling

### Understand what is sent to the provider

When a user invokes an AI tool, the selected text (or document content) is sent to the configured AI provider. Make this clear in user-facing documentation for any plugin you distribute.

### Use self-hosted models for sensitive content

For documents containing personally identifiable information (PII), financial data, or confidential business content, recommend or require a self-hosted model (e.g., Ollama) so data never leaves the organization's infrastructure.

### Do not store API keys in code

API keys must be entered by the user in the plugin settings, not hardcoded in tool implementations or configuration files:

```js
// Never do this
const API_KEY = "sk-...";

// Keys are managed via AI → Settings in the plugin UI
```

### Apply the principle of least privilege

Request only the document content your tool needs. If the tool only needs the selected text, do not read the entire document.
