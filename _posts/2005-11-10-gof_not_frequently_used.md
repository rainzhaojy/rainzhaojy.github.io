---
layout: post
title: GoF里比较冷门的几个模式
category: GoF_Patterns
---

下面几个模式要么用的不多，要么在各种语言里已经有很常见和自然的实现了，这里只做一些简单介绍。

* 创建型
    * Prototype - java/c++等语言已经很好的支持了
* 结构型
    * Flyweight - 需要非常关注内存碎片问题时才需要考虑
* 行为型
    * Iterator - java/c++等语言已经很好支持容器遍历了
    * Mediator
    * Interpreter
    * Memento
    * State
    * Chain of Responsibility

##### Prototype

使用工厂类创建一个和原型对象相同的类实例, Prototype模式里原型对象和工厂类通常是一个类, 所以应用Prototype模式的常见用法就是原型对象clone方法的调用.

Prototype结构图:

![prototype](/img/gof/prototype.gif)

JAVA语言和C++语言都很好的支持了Prototype模式, 在Java中就是clone()方法的使用, 在C++里Prototype模式就是赋值运算符的调用. 考虑到数据的完整复制，有时需要重载Java里的clone方法和重载C++里的赋值运算符, 以实现深拷贝.

##### Flyweight

Flyweight模式是为了避免大量小粒度对象的创建和销毁所造成的性能的消耗。

Flyweight结构图:

![](/img/gof/flywe050.gif)

JDK中java.lang.Integer#valueOf(int)，java.lang.Boolean#valueOf(boolean)也是Flyweight模式的一种应用。

##### Interator

Iterator模式用于遍历容器类, 由于Iterator模式非常常用, 因此已经被整合在很多流行的语言框架里.

在JAVA里, 这个模式已经被整合入Collection框架中，Collection里的很多容器类都提供了方法返回一个Iterator, 因此只要将对象装入容器类中，就可以直接使用Iterator进行对象遍历。

在C++的STL中，也已经封装了几个标准的Iterator模板，将对象放入STL容器后，使用对应的Iterator遍历即可。

##### Mediator

Mediator模式用于解决多个类之间的复杂关系以提高类的使用效率。如果很多个类之间需要相互访问，他们的访问关系是一种网状调用关系，这时可以考虑引入Mediator类，所有的类都与Mediator发生关系而不直接与对方发生关系，这样网状关系将被调整为一对多的关系，所有调用关系由Mediator负责协调，这样可以使得调用关系简单，也降低了原先的多个类之间的耦合关系。

Message Bus就是一种mediator模式的应用。

##### Interpreter

Interpreter模式多用于实现语言解释器，在应用软件里的使用面不是很广。

##### Memento

Memento很简单, 是一个保存另外一个对象内部状态拷贝的对象.这样以后就可以将该对象恢复到原先保存的状态.

##### State

不同的状态,不同的行为;或者说,每个状态有着相应的行为.

State模式结构图:

![](/img/gof/state.gif)

有限状态机就是state模式的应用。

##### Chain of Responsibility

Chain of Responsibility模式是用一系列类(classes)试图处理一个请求request,这些类之间是一个松散的耦合,唯一共同点是在他们之间传递request. 也就是说，来了一个请求，A类先处理，如果没有处理，就传递到B类处理，如果没有处理，就传递到C类处理，就这样象一个链条(chain)一样传递下去。

Servlet里的HTTP Filter机制和WTL里的消息传递都有点类似责任链模式.

##### Visitor

