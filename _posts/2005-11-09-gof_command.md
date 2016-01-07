---
layout: post
title: GoF行为型模式之Command
category: GoF_Patterns
---

Command模式是对功能请求的封装，请求一方发出请求后，请求的相关参数被以命令的形式组织起来，然后命令的接收方负责执行这个命令。命令模式里涉及五个角色:
  
* 客户
* 命令接口
* 具体命令
* 请求者
* 接受者

###### 典型应用

对于HTTP Request的响应和处理就可以应用Command模式，浏览器是命令的请求方，相关的HTTP参数可以封装在Command对象里，然后由具体的JSP或Servlet来执行此命令。在这里HTTP协议就是负责命令分发的。
