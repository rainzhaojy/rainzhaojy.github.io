---
layout: post
title: GoF结构型模式之Bridge
category: GoF_Patterns
---

将抽象与实现解耦，使得二者可以独立变化, 这种应用方式被称为Bridge模式.

Bridge结构图:

![](/img/gof/bridge.gif)

假设我们准备实现一个用户界面, 需要支持两种平台: X Window 和IBM Presentation Manager (PM), 按照一般的OO设计, 可以先定义一个窗口接口 Window, 然后定义两个子类 XWindow 和 PMWindow. 在实现时, 我们还希望用户界面支持两种风格, Icon风格和transient风格, 这时也许需要对原来的类继承结构做下面的调整:

![](/img/gof/bridge098.gif)

从上图可以看出, 这样的类继承结构非常别扭, 如果需要支持新的窗口风格时, 就需要增加3个类, 而且窗口风格和窗口所运行的平台本身是没有关系的, 他们不应该出现在同一个类继承关系里.

对于窗口所运行的平台, 这是每个风格的窗口都要关心的问题, 这时可以考虑把平台相关的关系从窗口类继承关系里分离出去, 如下:

![](/img/gof/bridge100.gif)

**对于一个类继承关系, 如果设计到多种类型的继承关系时(例子里的窗口风格和窗口平台两种关系), 就适宜使用Bridge模式**, 把与平台相关的和与实现相关的东西独立出去, 和本身的OO关系之间使用桥连接. 例子里的Window和WindowImpl之间的关系就是**Bridge**, Bridge是一种逻辑关系, 在Bridge模式里并没有某个实际的Bridge类.

JAVA里的JDBC/ODBC桥并不是Bridge模式的应用.
