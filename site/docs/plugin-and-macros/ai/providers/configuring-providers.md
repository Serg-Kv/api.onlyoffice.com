---
sidebar_position: 1
---

# Configuring AI providers

This page explains how to connect AI providers to the ONLYOFFICE AI plugin, manage API keys, and assign models to specific tasks.

## Adding a provider

To set up an AI provider:

1. Open the **Plugins** tab and click the **Plugin Manager** icon. Find the **AI plugin** and click **Install** or **Update** if it is already installed.
2. Click the **Background Plugins** button and activate the **AI** switch.
3. Go to the **AI** tab and click **Settings** to open the configuration window.
4. Select **Edit AI models** and click ![Plus icon](/assets/images/plugins/plus.svg#gh-light-mode-only)![Plus icon](/assets/images/plugins/plus.dark.svg#gh-dark-mode-only).
5. Choose an AI provider from the list or enter a custom base URL and API key.
6. In the row of icons, select what the model is used for (see [model task types](#model-task-types) below).
7. Click **OK** to save.

For adding a provider not in the default list, see [Adding custom providers](custom-providers.md).

## Model task types

When adding a model, you assign it to one or more task types using the icon row:

| Icon | Task type | Description |
|------|-----------|-------------|
| Text | **Text** | General text generation, chatbot, summarization |
| Images | **Images** | Image generation and analysis |
| Embeddings | **Embeddings** | Semantic search and similarity |
| Audio | **Audio processing** | Speech-to-text, audio analysis |
| Moderation | **Content moderation** | Safety filtering |
| Realtime | **Realtime tasks** | Low-latency streaming responses |
| Coding | **Coding help** | Code generation and explanation |
| Visual | **Visual analysis** | Image understanding (multimodal models) |

## API key management

- API keys are stored locally in the plugin configuration — they are not sent to ONLYOFFICE servers.
- Each provider has its own API key field. Some self-hosted providers (e.g., Ollama) do not require a key.
- To update a key: open **Settings → Edit AI models**, select the model, and edit the key field.

## Rate limiting and error handling

- The AI plugin does not implement its own rate limiting — limits are enforced by the provider.
- If a request fails (network error, invalid key, quota exceeded), the plugin surfaces the error in the chat panel.
- For high-volume usage, consider using a provider that supports request batching or a self-hosted model.

## Supported providers

The plugin ships with built-in support for the following providers (non-exhaustive):

- OpenAI (GPT-4o, GPT-4o mini, o1, o3)
- Anthropic Claude
- DeepSeek
- Mistral
- Gemini
- Ollama (local, see [Configuring Ollama with CORS](configuring-ollama-with-cors.md))
- Any OpenAI-compatible API endpoint

For providers not in this list, use the [custom provider](custom-providers.md) workflow.
