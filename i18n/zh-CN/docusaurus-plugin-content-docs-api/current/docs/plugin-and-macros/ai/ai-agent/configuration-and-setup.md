---
sidebar_position: 2
---

# 配置和设置

AI 助手是 AI 插件的一部分。在使用助手之前，必须安装插件并配置 AI 提供商。

## 前提条件

- ONLYOFFICE Docs 9.0.4 或更高版本（默认包含插件）。
- 拥有 API 密钥的 AI 提供商帐户，或自托管模型（如 Ollama）。

如果您尚未安装插件，请参阅[安装 AI 插件](../getting-started/installing-ai-plugin.md)。

## 启用 AI 助手

1. 打开**插件**选项卡，点击**插件管理器**图标。
2. 找到**AI**插件，如果已安装则点击**安装**或**更新**。

   ![AI 插件](/assets/images/plugins/install-ai-plugin.png#gh-light-mode-only)![AI 插件](/assets/images/plugins/install-ai-plugin.dark.png#gh-dark-mode-only)

3. 点击**后台插件**按钮，激活**AI**开关。

   ![激活 AI](/assets/images/plugins/activate-ai.png#gh-light-mode-only)![激活 AI](/assets/images/plugins/activate-ai.dark.png#gh-dark-mode-only)

4. 在顶部工具栏中找到新的**AI**选项卡。
5. 点击**设置**打开配置窗口。
6. 选择**编辑 AI 模型**，然后点击![Plus icon](/assets/images/plugins/plus.svg#gh-light-mode-only)![Plus icon](/assets/images/plugins/plus.dark.svg#gh-dark-mode-only)。
7. 从列表中选择一个 AI 提供商，或使用您的 API 密钥添加自定义提供商。
8. 在图标行中，选择模型处理的任务类型。
9. 点击**确定**保存。

   ![AI 设置](/assets/images/plugins/ai-settings.png#gh-light-mode-only)![AI 设置](/assets/images/plugins/ai-settings.dark.png#gh-dark-mode-only)

10. 返回**设置**，为**聊天机器人**设置模型（这是 AI 助手使用的模型）。

AI 助手现已激活并准备就绪。

## 助手行为设置

助手使用分配给**聊天机器人**任务类型的模型。要更改模型：

1. 打开**设置 → 编辑 AI 模型**。
2. 选择模型行并点击编辑图标。
3. 确保在任务类型行中选中了**聊天机器人**图标。
4. 点击**确定**。
