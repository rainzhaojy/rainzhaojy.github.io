---
layout: post
title: GoF设计模式
category: GoF_Patterns
---

好的OO设计非常困难，必须先寻找相关对象，以适当的粒度将对象归类，再定义类的接口和继承关系，这是一个宏观建模结合细节分析设计并配合设计者经验的过程，好的OO设计是可扩展、易维护、可重用、强壮的。

设计模式就是做OO设计时的经验的总结，是一组模板和一些典型问题的解决方案. 关于设计模式最重要的著作是《Design Patterns: Elements of Reusable Object-Oriented Software》, 这本书的四位作者常被称为”四人帮”(Gang of Four,简称GoF),1994年出版，在这本书里系统的介绍了3类共23种设计模式.

国内也有很多介绍GoF模式的，jdon介绍的相对早一点和全一点: <http://www.jdon.com/designpatterns>

随着新语言，新技术的出现，新的设计思想也不断出现，因此模式并不仅限于GoF 23种模式，另外，随着技术变化，有些GoF模式也已经不是很常用了。GoF放在当今，比较适合作为设计模式的起点读物和参考读物。

### 创建型模式 (Creational Patterns)

创建型模式把类实例的创建过程封装起来,使得创建实例的责任与使用实例的责任分割开, 并由专门的模块分管实例的创建,而系统在宏观上不再依赖于类实例创建过程的细节。

创建型模式基于两个基本思想,第一是**面向接口编程**,第二就是封装. 使用创建型模式后系统将和接口交互,创建类实例的工作由专门的模块负责,系统不再关心复杂多变的类继承结构,也无需关心如何实例化一个实现类,从而使系统获得更好的灵活性和扩展性.至于类实例何时创建,如何创建,在哪里创建,系统都无需关心.

创建型模式解决的是类A使用类B时所产生的耦合依赖问题, 应用创建型模式后类A将不使用new操作符直接创建类B实例, 而是封装单独的方法或使用专门的类(譬如C)创建B实例, A将针对B的接口编程, 从而实现A对B的解耦.

GoF里介绍了5种创建型模式:

1. Factory Method - 在调用类里抽象一个方法("factory method",工厂方法)来创建实例
2. Abstract Factory - 使用工厂类创建一组类实例
3. Builder - 使用工厂类创建一个复杂的类实例
4. Prototype - 使用工厂类创建一个和原型对象相同的类实例
5. Singleton - 保证在应用里只有一个类实例同时存在

### 结构型模式 (Structural Patterns)

结构型模式讨论如何组合类以获得更丰富的结构。有两种组合方式：一种是使用继承（inheritance）来把类，接口等组合在一起，形成更大的结构，这是一种静态组合；另一种是把描述各种不同类型的对象组合在一起，实现新的功能的方法，这是一种动态组合。JAVA由于不支持多继承，在应用时通常使用后一种方式组合对象，C++可以使用类继承组合，但为了获得更多的灵活性，一般也使用后一种方式。

结构型模式中，Composite使用继承方式实现, Decorator, Adapter, Bridge, Proxy, Facade一般使用组合方式实现.

6. Composite
7. Decorator
8. Adapter
9. Bridge
10. Proxy
11. Facade
12. Flyweight

### 行为型模式 (Behavioral Patterns)

创建型模式解决了类实例的创建，结构型模式讨论了类组合，行为型模式则是针对一些常见的问题给出了相对通用的解决方案。行为型模式关注的是算法和各个对象的责任分配和相互协作。

Template Method模式是对共同算法的抽象, Interpreter是对语法的抽象, Mediator是将对象关系从网状变成星状以减少对象间的相互耦合, Chain of Responsibility也是为了降低耦合, 请求被送给一个开放的目标对象链, Observer模式定义了一对多的对象依赖关系.

其他的行为型模式都是对一些行为的封装, Strategy封装了算法, Command封装了请求, State封装了对象状态, Visitor封装了分发到多个对象的行为, Iterator封装了迭代容器对象的方法.

13. Template Method
14. Iterator
15. Mediator
16. Observer
17. Strategy
18. State
19. Chain of Responsibility
20. Command
21. Interpreter
22. Memento
23. Visitor