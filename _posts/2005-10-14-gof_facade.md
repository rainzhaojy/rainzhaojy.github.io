---
layout: post
title: GoF结构型模式之Facade
category: GoF_Patterns
---

Facade模式是 *高内聚,低耦合* 的具体实现, 对于一个功能相对独立的子系统或子模块, 可以考虑为这个子系统实现一个Facade, 调用者只需调用Facade里的商业方法, 这样保证此子系统自身的内聚性和对外的低耦合, 如果需要扩展或修改时，只需保证Facade里的方法不变就行，子系统内部可以自由改动.

Facade结构图:

![](/img/gof/facade.gif)

在JAVA里，通常使用一个SessionBean作为商业层的Facade, 即前端应用对于商业层的耦合度, 也为商业层增加了远程部署和访问的能力.
