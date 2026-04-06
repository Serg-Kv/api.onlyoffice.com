---
sidebar_position: 2
---

# 提供商配置

本页介绍在 ONLYOFFICE AI 插件中使用 AI 提供商时如何管理 API 密钥、了解请求/响应流程以及处理错误。

## API 密钥管理

每个 AI 提供商都需要 API 密钥进行身份验证。密钥存储在插件设置中的本地，除了提供商的 API 端点之外，不会发送到任何地方。

**最佳实践：**

- 为开发和生产环境使用不同的 API 密钥。
- 根据提供商的安全建议定期轮换密钥。
- 对于自托管模型（如 Ollama），不需要 API 密钥——将密钥字段留空。

要更新密钥：

1. 打开**AI**选项卡，点击**设置**。
2. 选择**编辑 AI 模型**，然后点击![Edit icon](/assets/images/plugins/edit.svg#gh-light-mode-only)![Edit icon](/assets/images/plugins/edit.dark.svg#gh-dark-mode-only)。
3. 更新 API 密钥字段，然后点击**确定**。

## 请求和响应流程

当用户操作触发 AI 插件时，会发生以下过程：

1. 插件收集相关的文档内容（选定的文本、段落或范围）。
2. 它使用用户的提示和收集的内容构建请求。
3. 使用 `AI.Request.create()` 将请求发送到配置的提供商 API 端点。
4. 提供商流式传输或返回完整的响应。
5. 插件通过 Office API 将响应插入到文档中。

流式响应逐块处理，允许文本在编辑器中增量显示而不阻塞 UI。

## 错误处理

常见错误及其解决方法：

| 错误 | 原因 | 解决方法 |
|------|------|----------|
| `401 Unauthorized` | API 密钥无效或缺失 | 在设置中检查并更新 API 密钥 |
| `429 Too Many Requests` | 超出速率限制 | 等待并重试，或切换到更高级别的计划 |
| `503 Service Unavailable` | 提供商暂时不可用 | 短暂延迟后重试 |
| CORS 错误 | 提供商不允许浏览器请求 | 使用服务器端代理或配置 CORS（参见[配置 Ollama 的 CORS](../configuration/configuring-ollama-with-cors.md)） |
| 空响应 | 模型未返回输出 | 重新措辞提示或检查模型的上下文窗口限制 |

插件使用 `StartAction` 和 `EndAction` 确保即使请求在流式传输过程中失败，编辑器状态也能干净地回滚。
