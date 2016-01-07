---
layout: post
title: GoF行为型模式之Template Method
category: GoF_Patterns
---

在父类里实现方法的部分操作，把其余操作留到子类里实现，这就是Template Method模式。

TemplateMethod模式结构图:

![](/img/gof/tmethod.gif)

Template Method模式在JAVA中应用非常广泛，可以在抽象类里实现一些通用操作，譬如log，权限检查等，而把具体的操作留在各个子类里实现。

###### 典型应用

1. Struts里的Action，一般在项目里会在父类里实现 OnAction 方法，并提供虚方法 OnPerform，子类实现 OnPerform