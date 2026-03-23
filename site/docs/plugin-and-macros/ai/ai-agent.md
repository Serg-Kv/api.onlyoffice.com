---
sidebar_position: 4
---

# AI agent (beta)

Starting from version 2.4.2, the AI plugin brings the new AI agent functionality.

The AI inline agent is a contextual assistant integrated into ONLYOFFICE editors. It is accessed via a floating panel and is currently available as a beta feature of the AI plugin.

The AI agent:

- Provides natural language interaction for executing common editing tasks without navigating menus.
- Includes a collection of simple predefined [tools](custom-ai-tools/custom-ai-tools-overview.md) adapted to common tasks for each editor.
- Maintains conversation history to support iterative refinement and multi-step requests.

## What the AI agent can do {#functions}

- **Text generation and rewriting**. Create new text or enhance existing content directly in the editor. Generate summaries, expand ideas, rephrase sentences, or adjust tone and style with natural language commands.
- **Smart formatting**. Apply formatting without searching through menus. Request formatting changes, and the editor updates the document automatically.
- **Data analysis and visualization**. Aggregate, sort, and filter data in spreadsheets, and generate visual representations from selected ranges or entire sheets. Create diagrams and slide images based on simple text descriptions.

## How to use the AI agent {#usage}

Before using the AI agent, make sure the AI plugin is installed and configured. See [Getting started](getting-started.md) and [Configuring AI providers](providers/configuring-providers.md).

To invoke the AI agent:

1. Press `Ctrl + /` in any editor to open the AI agent input.

   ![commentText execution](/assets/images/plugins/inline-ai-agent.png#gh-light-mode-only)![commentText execution](/assets/images/plugins/inline-ai-agent.dark.png#gh-dark-mode-only)

2. Type your request and press `Enter` to receive an immediate response.

The editor supports request history, so you can continue the conversation, giving instructions step by step.

To reset the history, press `Ctrl + Alt + /`.

To disable the agent, use `Esc`.

## Use cases and examples

| Request | What the agent does |
|---------|-------------------|
| `Make this paragraph more formal` | Rewrites selected text in a formal tone |
| `Add a comment explaining this formula` | Runs `commentText` tool on selected cell |
| `Insert a 3x3 table with headers` | Runs `addTableToSlide` or creates a table inline |
| `Summarize the selected text` | Generates a summary and inserts it |
| `Change the font size to 14` | Applies formatting via `changeTextStyle` tool |

## Limitations and roadmap {#limitations}

**Current limitations:**

- Adding a custom AI tool requires modifying the AI plugin source code directly and rebuilding the plugin. There is no runtime plugin registration yet.
- The agent is available only in ONLYOFFICE Docs version 9.0.4 and later.
- Context window is limited by the configured model's token limit.

**Planned improvements:**

- Runtime tool registration without source modification.
- Broader predefined tool coverage across all editor types.
- Multi-step task planning with agent memory.

To follow development progress or submit feedback, see the [GitHub repository](https://github.com/ONLYOFFICE/onlyoffice.github.io/issues).

## Extending the agent

The predefined tools cover common tasks, but you can add your own. See [Custom AI tools](custom-ai-tools/custom-ai-tools-overview.md) to learn how to create and register new tools.
