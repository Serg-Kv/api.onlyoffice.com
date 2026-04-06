---
sidebar_position: 3
---

# 速率限制

AI 提供商强制执行速率限制，以控制在给定时间窗口内可以发出多少请求。本页解释速率限制的工作原理以及如何在 ONLYOFFICE AI 插件中处理它。

## 速率限制的工作原理

速率限制由 AI 提供商强制执行，而非 ONLYOFFICE AI 插件。它们通常适用于：

- **每分钟请求数（RPM）** — 每分钟允许的 API 调用次数。
- **每分钟令牌数（TPM）** — 每分钟处理的输入和输出令牌总数。
- **每天请求数（RPD）** — 总请求的每日上限（在免费层级中常见）。

当超过限制时，提供商返回 `429 Too Many Requests` 响应。

## 处理速率限制错误

当 AI 插件收到 `429` 响应时，当前请求失败。要降低触发限制的可能性：

- **对简单任务使用较轻量的模型。** 小型模型处理更快，消耗更少的令牌。
- **避免不必要地发送大量文本块。** 在触发 AI 操作之前只选择相关的文本部分。
- **使用自托管模型。** 像 [Ollama](../configuration/configuring-ollama-with-cors.md) 这样的本地模型没有提供商强制的速率限制。

## 提供商特定的限制

速率限制在提供商和计划层级之间差异很大。请查看提供商的文档了解当前限制：

| 提供商 | 限制参考 |
|--------|----------|
| OpenAI | [platform.openai.com/docs/guides/rate-limits](https://platform.openai.com/docs/guides/rate-limits) |
| Anthropic | [docs.anthropic.com/en/api/rate-limits](https://docs.anthropic.com/en/api/rate-limits) |
| DeepSeek | 提供商仪表板 |
| Ollama（自托管） | 无速率限制 |

## 节流策略

如果您的使用场景涉及高频率 AI 请求（例如处理多个文档），请考虑：

1. **批量处理请求** — 按顺序而非并行处理文档。
2. **在请求之间添加延迟** — 在连续调用之间引入短暂等待。
3. **升级您的计划** — 更高层级的计划提供显著更高的限制。
4. **使用自托管模型** — 完全消除提供商侧的速率限制。
