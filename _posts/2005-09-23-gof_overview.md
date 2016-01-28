---
layout: post
title: GoF设计模式
tag: design patterns
toc: true
---

好的OO设计非常困难，必须先寻找相关对象，以适当的粒度将对象归类，再定义类的接口和继承关系，这是一个宏观建模结合细节分析设计并配合设计者经验的过程，好的OO设计是可扩展、易维护、可重用、强壮的。

设计模式就是做OO设计时的经验的总结，是一组模板和一些典型问题的解决方案. 关于设计模式最重要的著作是《Design Patterns: Elements of Reusable Object-Oriented Software》, 这本书的四位作者常被称为”四人帮”(Gang of Four,简称GoF),1994年出版，在这本书里系统的介绍了3类共23种设计模式.

国内也有很多介绍GoF模式的，jdon介绍的相对早一点和全一点: <http://www.jdon.com/designpatterns>

随着新语言，新技术的出现，新的设计思想也不断出现，因此模式并不仅限于GoF 23种模式，另外，随着技术变化，还有模式已经被语言原生支持了, 还有些GoF模式已经不是很常用了。GoF放在当今，比较适合作为设计模式的起点读物和参考读物。

### 创建型模式 (Creational Patterns)

创建型模式把类实例的创建过程封装起来,使得创建实例的责任与使用实例的责任分割开, 并由专门的模块分管实例的创建,而系统在宏观上不再依赖于类实例创建过程的细节。

创建型模式基于两个基本思想,第一是`面向接口编程`,第二就是`封装`. 使用创建型模式后系统将和接口交互,创建类实例的工作由专门的模块负责,系统不再关心复杂多变的类继承结构,也无需关心如何实例化一个实现类,从而使系统获得更好的灵活性和扩展性.至于类实例何时创建,如何创建,在哪里创建,系统都无需关心.

创建型模式解决的是类A使用类B时所产生的耦合依赖问题, 应用创建型模式后类A将不使用new操作符直接创建类B实例, 而是封装单独的方法或使用专门的类(譬如C)创建B实例, A将针对B的接口编程, 从而实现A对B的解耦.

GoF里介绍了5种创建型模式: factory method, abstract factory, builder, prototype, singleton. 其中, protoype已经被语言原生支持, 工厂模式和singleton仍然被大量使用.

#### 工厂模式

GoF里有2种工厂模式: factory method, abstract factory, 在实际应用中还有一些工厂模式的变种，例如简单工厂模式等, 这些模式被通称为工厂模式(Factory模式).

系统需要使用某个类时, 在系统里使用一个方法来创建需要的类实例而不是使用new操作符来创建类实例, 此方法就被称为`factory method`, 工厂方法在具体实现时有静态工厂方法, 非静态工厂方法, 参数化工厂方法等.

`Abstract Factory`用于创建一组类实例, 与工厂方法的区别在于需要创建对象的复杂程度上, 一般用于创建一组相关类. 

#### Builder

如果创建某个对象的逻辑与过程比较复杂，就适宜使用 Builder 模式, 可以将构造目标类的过程封装在一个单独的类里或方法里, 这个类就是Builder类, Builder在构造目标类时将一个复杂的构造过程分成多个步骤, 系统可以组合不同的构造过程从而构造出不同的目标类实例.

javax.xml.parsers.DocumentBuilder就是使用了 Builder 模式，将一个XML输入（文件、流、字符串等）解析成一棵 DOM 树（Document对象）是一个复杂的过程，所以parse方法就是 Builder 模式的应用, 当然如何获得 DocumentBuilder 使用的是工厂模式.

#### Prototype

使用工厂类创建一个和原型对象相同的类实例, 在Java中就是clone()方法的使用, 在C++里Prototype模式就是赋值运算符的调用. 考虑到数据的完整复制，有时需要重载Java里的clone方法和重载C++里的赋值运算符, 以实现深拷贝.

#### Singleton

保证在应用里只有一个类实例同时存在, 一般使用一个工厂方法实现单例模式, 常见的做法是使用static member保存单例对象, 使用static method返回单例对象, 如果你的程序有多线程和序列化问题, 问题可能会复杂一点.

具体实现时有懒汉式与饿汉式单例实现, JAVA里两种方式都容易实现, 在C++里, 由于静态初始化没有固定顺序, 因此通常使用懒汉式实现单例应用.

### 结构型模式 (Structural Patterns)

结构型模式讨论如何组合类以获得更丰富的结构。有两种组合方式：一种是使用继承（inheritance）来把类，接口等组合在一起，形成更大的结构，这是一种静态组合；另一种是把描述各种不同类型的对象组合在一起，实现新的功能的方法，这是一种动态组合。JAVA由于不支持多继承，在应用时通常使用后一种方式组合对象，C++可以使用类继承组合，但为了获得更多的灵活性，一般也使用后一种方式。

结构型模式中，Composite使用继承方式实现, Decorator, Adapter, Bridge, Proxy, Facade一般使用组合方式实现.

#### Composite

对象被组织成树形结构，用户对于单个对象和对象树的操作相同。这样客户程序就无需关心自己使用的是叶子还是树，因为操作都是一样的. 

这样的结构一者便于扩展，二者简化调用程序. 简单应用时可能只需要使用叶子，当应用复杂时，就将这个叶子换成树，里面有一些叶子，应用再复杂时，树里还可以包含树，这样就可以组成一棵很庞大的树了，对于客户程序而言操作并没有变化，就如同操作单个叶子一样简单。

JUnit 就是使用了 Composite 模式，TestCase 是叶子，TestSuite 是树

#### Decorator

动态给一个对象添加一些额外的职责, 就象在墙上刷油漆。使用子类也可以达到为父类添加功能的目的，但使用Decorator模式显得更为灵活。

Java IO API就是使用 Decorator 实现的, 例如:

```java
FileReader fReader = new FileReader("a.txt");
BufferedReader reader = new BufferedReader(fReader);
String s = reader.readLine();
```

BufferedReader 就是油漆工（decorator），FileReader就是被油漆的对象（decoratee），包装出了一个新的方法 readLine().

JAVA中的Wrapper模式也可以理解为Decorator模式

#### Adapter

有一个已经存在的类，但与客户需要的接口不一致，这时可以使用 Adapter 模式来适配原来的类以满足客户程序的调用，原来的类就是 Adaptee，完成适配工作的类就是 Adapter. 类继承也可以用子类改变父类的行为, 但继承是一种静态适配, 没有适配模式灵活.

Adapter与Bridge模式比较:

Adapter通常和Bridge相反，Adapter是为了让两个不同的类可以一起工作，而Bridge是为了解除继承带来的强耦合，以使得Bridge的两方(接口和实现)都可以灵活变化。已有两个类且接口不一致时，使用Adapter模式；设计新类时，为了解耦，使用Bridge模式。因此，Adapter在设计之后使用，Bridge在设计之前使用

#### Bridge

将抽象与实现解耦，使得二者可以独立变化, 这种应用方式被称为Bridge模式. 

JAVA里的JDBC/ODBC桥并不是Bridge模式的应用.

#### Proxy

为其他对象提供一种代理以控制对这个对象的访问，代理通常是为了做权限控制，log，屏蔽远程调用等. 代理对于客户来说是透明的，客户感觉不到代理的存在.

Jive中使用代理来实现权限控制, RMI中的stub/skeleton也是一种proxy应用, stub负责调用远程对象.

#### Facade

Facade模式是 高内聚,低耦合 的具体实现, 对于一个功能相对独立的子系统或子模块, 可以考虑为这个子系统实现一个Facade, 调用者只需调用Facade里的商业方法, 这样保证此子系统自身的内聚性和对外的低耦合, 如果需要扩展或修改时，只需保证Facade里的方法不变就行，子系统内部可以自由改动.

在JAVA里，通常使用一个SessionBean作为商业层的Facade, 即降低前端应用对于商业层的耦合度, 也为商业层增加了远程部署和访问的能力.

C++里的COM interface也是一种facade应用. Facade与Interface Driven Design的概念是很吻合的.

#### Flyweight

Flyweight模式是为了避免大量小粒度对象的创建和销毁所造成的性能的消耗, 随着硬件成本降低, 在一般的应用程序里不需要使用这个模式.

### 行为型模式 (Behavioral Patterns)

创建型模式解决了类实例的创建，结构型模式讨论了类组合，行为型模式则是针对一些常见的问题给出了相对通用的解决方案。行为型模式关注的是算法和各个对象的责任分配和相互协作。

Template Method模式是对共同算法的抽象, Interpreter是对语法的抽象, Mediator是将对象关系从网状变成星状以减少对象间的相互耦合, Chain of Responsibility也是为了降低耦合, 请求被送给一个开放的目标对象链, Observer模式定义了一对多的对象依赖关系.

其他的行为型模式都是对一些行为的封装, Strategy封装了算法, Command封装了请求, State封装了对象状态, Visitor封装了分发到多个对象的行为, Iterator封装了迭代容器对象的方法.

#### Template Method

在父类里实现方法的部分操作，把其余操作留到子类里实现，这就是Template Method模式. Template Method模式在JAVA中应用非常广泛，可以在抽象类里实现一些通用操作，譬如log，权限检查等，而把具体的操作留在各个子类里实现。

Struts里的Action，一般在项目里会在父类里实现 OnAction 方法，并提供虚方法 OnPerform，子类实现 OnPerform

#### Iterator

Iterator模式用于遍历容器类, 由于Iterator模式非常常用, 因此已经被整合在很多流行的语言框架里.

在JAVA里, 这个模式已经被整合入Collection框架中，Collection里的很多容器类都提供了方法返回一个Iterator, 因此只要将对象装入容器类中，就可以直接使用Iterator进行对象遍历。

在C++的STL中，也已经封装了几个标准的Iterator模板，将对象放入STL容器后，使用对应的Iterator遍历即可

#### Mediator

Mediator模式用于解决多个类之间的复杂关系以提高类的使用效率。如果很多个类之间需要相互访问，他们的访问关系是一种网状调用关系，这时可以考虑引入Mediator类，所有的类都与Mediator发生关系而不直接与对方发生关系，这样网状关系将被调整为一对多的关系，所有调用关系由Mediator负责协调，这样可以使得调用关系简单，也降低了原先的多个类之间的耦合关系。

Message Bus就是一种mediator模式的应用

#### Observer

存在一对多的依赖关系时, 当被依赖的这个对象状态发生变化, 所有依赖对象将会被通知并自动更新, 这时应该使用observer模式.

Observer模式是一个发布/订阅形式的模式，在JAVA里有相应的API可以非常方便的应用观察者模式, java.util.Observable是被观察的对象, java.util.Observer是观察者.

#### Strategy

如果某个类里所使用的算法有多种,而且会有变化和扩展, 这时可以把算法从类里分离出来,并把不同的算法一个个封装成单独的类,算法可以单独变化和扩展,程序在使用时可以从这组算法里选择,对于算法的这种封装方式就是Strategy模式.

Strategy模式中，对象与其行为（behaviour）这本来紧密联系的两部分被解耦，分别放在了不同的类中。这使得对同一个行为，可以方便的在任何时候切换不同的实现算法。而通过对策略的封装，为其提供统一的接口，也可以很容易的引入新的策略.

Strategy容易和Bridge模式相混淆, 他们有着很相近的结构，但是，他们却是为解决不同的问题而设计的。Strategy模式注重于算法的封装，而Bridge模式注重于分离抽象和实现，为一个抽象体系提供不同的实现.

#### State

不同的状态,不同的行为;或者说,每个状态有着相应的行为. 有限状态机就是state模式的应用.

#### Chain of Responsibility

Chain of Responsibility模式是用一系列类(classes)试图处理一个请求request,这些类之间是一个松散的耦合,唯一共同点是在他们之间传递request. 也就是说，来了一个请求，A类先处理，如果没有处理，就传递到B类处理，如果没有处理，就传递到C类处理，就这样象一个链条(chain)一样传递下去。

Servlet里的HTTP Filter机制和WTL里的消息传递都有点类似责任链模式.

#### Command

Command模式是对功能请求的封装，请求一方发出请求后，请求的相关参数被以命令的形式组织起来，然后命令的接收方负责执行这个命令

对于HTTP Request的响应和处理就可以应用Command模式，浏览器是命令的请求方，相关的HTTP参数可以封装在Command对象里，然后由具体的JSP或Servlet来执行此命令。在这里HTTP协议就是负责命令分发的.

#### Interpreter

Interpreter模式多用于实现语言解释器，在应用软件里的使用面不是很广

#### Memento

Memento很简单, 是一个保存另外一个对象内部状态拷贝的对象.这样以后就可以将该对象恢复到原先保存的状态

#### Visitor

访问者模式把数据结构和作用于结构上的操作解耦合，使得操作集合可相对自由地演化。访问者模式适用于数据结构相对稳定算法又易变化的系统.