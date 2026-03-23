---
sidebar_position: 1
---

# Custom AI tools overview

Custom AI tools are JavaScript functions that extend the ONLYOFFICE AI agent's capabilities. Each tool defines:

- what request to send to the AI model;
- what manipulations to perform on the document.

Adding custom AI tools allows you to adapt the agent to specific workflows. Whether working with documents, spreadsheets, or presentations, custom tools let you integrate AI-driven operations directly into your editing environment.

:::caution Current limitation
Adding a custom AI tool requires modifying the [AI plugin source code](https://github.com/ONLYOFFICE/onlyoffice.github.io/tree/master/sdkjs-plugins/content/ai) directly — you can then install the modified plugin via a custom [store link](creating-custom-ai-tools.md#setup).
:::

## How it works

Custom AI tool calling follows a flow similar to [function calling in LLM APIs](https://platform.openai.com/docs/guides/function-calling):

1. **Function registration.** Each tool is registered with a name, parameter list, description, and usage examples. This metadata tells the AI model what the tool does and when to invoke it.
2. **User prompt.** The user opens the AI agent (`Ctrl + /`) and types a request.
3. **Tool selection.** The AI model examines the prompt and the list of available tools, then decides which tool to call and with what arguments.
4. **Execution.** The selected tool runs: it sends a request to the AI model (if needed) and applies the result to the document using the [Office API](../../../office-api/get-started/overview.md).

## Two phases of every custom tool

Every custom AI tool consists of two phases:

| Phase | What it does |
|-------|-------------|
| **Registration** | Defines the tool's name, parameters, description, and examples for the AI model |
| **Execution** | Implements the logic: retrieve document content, send AI request, insert result |

For the full implementation walkthrough, see [Creating custom AI tools](creating-custom-ai-tools.md).

## Ready-made examples

Before creating your own tool, browse the existing samples:

- [Text document editor tools](../../samples/custom-ai-tools-samples/text-document-editor/commentText.md) — commenting, styling, spell checking, and more
- [Spreadsheet editor tools](../../samples/custom-ai-tools-samples/spreadsheet-editor/addChart.md) — charts, pivot tables, formulas, filtering
- [Presentation editor tools](../../samples/custom-ai-tools-samples/presentation-editor/addNewSlide.md) — slides, shapes, tables, backgrounds

Full index: [Custom AI tool samples](../../samples/custom-ai-tools-samples/custom-ai-tools-samples.md)

## Next steps

- [Creating custom AI tools](creating-custom-ai-tools.md) — step-by-step guide with full code example
- [Custom AI tools reference](custom-ai-tools-reference.md) — `RegisteredFunction` API and execution patterns
- [Testing and debugging](testing-and-debugging.md) — how to test and debug your tools
