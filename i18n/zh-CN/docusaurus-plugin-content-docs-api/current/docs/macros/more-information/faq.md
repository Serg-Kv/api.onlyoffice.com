---
sidebar_position: 1
---

# 常见问题

## 可以在 ONLYOFFICE 编辑器中使用 Microsoft Office 宏吗？

Microsoft Office 宏使用的是 VBA 脚本语言，而 ONLYOFFICE 编辑器使用 JavaScript。但将宏转换为新格式并不困难。你可以在[此处](../macros/converting-vba-macros.md)查看 MS VBA 宏的转换示例。

## 在哪里可以找到编写宏的方法？

宏使用 JavaScript 语言语法和 [Office JavaScript API](../../office-api/get-started/overview.md) 脚本格式，因此 JavaScript 中可用的方法以及 **Office API** 所支持的方法也可用于宏。

## 我可以将宏设为全局宏吗？

宏是绑定到特定文档的，不能设置为全局宏。但你可以编写一个可以被所有用户加载的[插件](../../plugins/fundamentals/configuration/config-json.md)。

## 有关于插件的问题？

有关插件安装、样式、本地化和分发的问题，请参阅[插件常见问题](../../plugins/more-information/faq.md)。
