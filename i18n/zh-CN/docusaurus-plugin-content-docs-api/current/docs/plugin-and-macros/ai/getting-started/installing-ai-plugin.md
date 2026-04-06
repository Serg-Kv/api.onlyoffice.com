---
sidebar_position: 1
---

# 安装 AI 插件

AI 插件是一个后台插件，用于将 AI 提供商连接到 ONLYOFFICE 编辑器。本页介绍安装和初始配置。

## 安装

从 9.0.4 版本开始，AI 插件已包含在使用 ONLYOFFICE 品牌构建的服务器和桌面发行版中。

如果需要手动添加：

1. 从 [ONLYOFFICE 应用目录](https://www.onlyoffice.com/app-directory/en/ai)下载插件。
2. 按照您的部署类型的说明进行安装：
   - [ONLYOFFICE 桌面编辑器](../../tutorials/installing/onlyoffice-desktop-editors.md)
   - [ONLYOFFICE Docs（本地部署）](../../tutorials/installing/onlyoffice-docs-on-premises.md)
   - [ONLYOFFICE Cloud](../../tutorials/installing/onlyoffice-cloud.md)

插件 GUID 为 `{9DC93CDB-B576-4F0C-B55E-FCC9C48DD007}`。

[GitHub 上的仓库](https://github.com/ONLYOFFICE/onlyoffice.github.io/tree/master/sdkjs-plugins/content/ai)

## 启用插件

1. 打开**插件**选项卡，点击**插件管理器**图标。
2. 找到**AI**插件，点击**安装**（如果已安装则点击**更新**）。
3. 点击**后台插件**，激活**AI**开关。

## 配置 AI 提供商

1. 转到**AI**选项卡，点击**设置**。
2. 选择**编辑 AI 模型**，然后点击![Plus icon](/assets/images/plugins/plus.svg#gh-light-mode-only)![Plus icon](/assets/images/plugins/plus.dark.svg#gh-dark-mode-only)。
3. 从列表中选择一个提供商，或输入自定义提供商的详细信息和 API 密钥。
4. 在图标行中，选择模型的用途：*文本*、*图像*、*嵌入*、*音频处理*、*内容审核*、*实时任务*、*编码帮助*、*视觉分析*。
5. 点击**确定**保存。

有关自定义提供商，请参阅[添加自定义提供商](../providers/adding-custom-providers.md)。

## 支持

要请求功能或报告错误，请使用 [GitHub](https://github.com/ONLYOFFICE/onlyoffice.github.io/issues) 上的问题部分。
