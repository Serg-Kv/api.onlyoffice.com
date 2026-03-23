---
sidebar_position: 1
---

# AI plugin overview

The ONLYOFFICE AI plugin is a background plugin that connects AI providers (e.g., OpenAI, DeepSeek, Anthropic Claude) to ONLYOFFICE editors, enabling intelligent text generation, editing, summarization, translation, and document automation.

**Supported editors:** documents, spreadsheets, presentations, PDF.

**Repository on GitHub:** [ai](https://github.com/ONLYOFFICE/onlyoffice.github.io/tree/master/sdkjs-plugins/content/ai)

```mdx-code-block
import YoutubeVideo from '@site/src/components/YoutubeVideo/YoutubeVideo';

<YoutubeVideo videoId="oQbH8JIe3eE"/>
```

## What you can build

The AI plugin provides three layers of capability, each building on the previous:

| Layer | What it is | Who it is for |
|-------|-----------|---------------|
| **AI plugin** | Built-in chatbot, summarization, translation | End users |
| **AI agent** | Inline agent (Ctrl+/) with predefined tools | Power users & developers |
| **Custom AI tools** | Developer-defined tools that extend the agent | Developers |

## How the layers connect

```
AI plugin (installed & configured)
    └── AI agent (Ctrl+/ inline panel)
            └── Custom AI tools (RegisteredFunction objects)
                        └── Office API (document manipulation)
```

When a user types a request in the AI agent, the AI model selects which registered tool to call, runs the tool's logic, and the tool manipulates the document via the Office API.

## Prerequisites

Before building with the AI plugin:

- **ONLYOFFICE Docs** version 9.0.4 or later (plugin is included by default).
- **AI provider account** with an API key (OpenAI, Anthropic, DeepSeek, or any OpenAI-compatible provider).
- For **custom AI tools**: basic JavaScript knowledge and access to the [AI plugin source repository](https://github.com/ONLYOFFICE/onlyoffice.github.io/tree/master/sdkjs-plugins/content/ai).

## Cost considerations

Using the AI plugin requires API calls to external AI providers. Costs depend on:

- The provider and model selected (e.g., GPT-4o vs. GPT-4o mini).
- The volume of requests and text processed.
- Whether streaming responses are used.

To minimize costs:
- Choose lightweight models for simple tasks (formatting, short text edits).
- Reserve larger models for complex reasoning tasks (summarization, analysis).
- Self-hosted models like [Ollama](providers/configuring-ollama-with-cors.md) eliminate per-request costs entirely.

## Where to start

| Goal | Start here |
|------|-----------|
| Install and configure the plugin | [Getting started](getting-started.md) |
| Add or configure an AI provider | [Configuring AI providers](providers/configuring-providers.md) |
| Use a self-hosted model (Ollama) | [Configuring Ollama with CORS](providers/configuring-ollama-with-cors.md) |
| Understand the AI agent | [AI agent](ai-agent.md) |
| Create your own AI tool | [Creating custom AI tools](custom-ai-tools/creating-custom-ai-tools.md) |
| Browse ready-made tool examples | [Custom AI tool samples](../samples/custom-ai-tools-samples/custom-ai-tools-samples.md) |

## Support

To request a feature or report a bug, use the issues section on [GitHub](https://github.com/ONLYOFFICE/onlyoffice.github.io/issues).
