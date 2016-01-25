---
layout: post
title: GoF创建型模式之Builder
category: GoF_Patterns
---

系统所要调用的目标类如果是一个复杂的对象,则可以将构造目标类的过程封装在一个单独的类里,这个类就是Builder类,Builder在构造目标类时将一个复杂的构造过程分成多个步骤,系统可以组合不同的构造过程从而构造出不同的目标类实例,最后Builder提供方法返回所构造的类实例.

Builder结构图:

![](/img/gof/builder.png)

将一个复杂对象的构造交给一个单独的类来完成。有两点值得注意：

1. 多了一个角色 Director。负责使用 Builder 构造对象（如何构造，步骤如何，都由 Director 决定）； 
2. 在 ConcreteBuilder 里多了一个方法 getProduct。用于在构造过程结束后返回构造的对象。 

Builder也是构造类，相当于Factory模式里的工厂类，但这里变的复杂，因为Product可能由很多部分组成，构造顺序也有不同，下面是顺序图： 

![](/img/gof/builder095.gif)

###### 举例说明

回到结构图里，Product 由3部分组成，假设构造一个 Product 的过程如下：

```
PartA
PartB
PartC
```

在客户程序里，当然也可以自己来完成这样的构建过程，那么每个需要 Product 的地方都有这段代码，一者出现了相同代码的大量重复，二者构造 Product 的逻辑被分散在各个地方，如果这个逻辑有所变化，那么需要修改的地方就很多。 

如果构造一个 Product 的过程变成下面 

```
PartA
PartB
PartA
```

如果使用了Builder模式，只需要修改 Director 就可以了（Director里的construct方法）。
 
**如果创建某个对象的逻辑与过程比较复杂，就适宜使用 Builder 模式**，上例中看到的是所创建对象由很多部分组成，具体应用中也可能创建一个对象要做很多额外的工作（读文件，查数据库等），要执行某些复杂的算法，这些都适宜使用 Builder 模式。在具体应用 Builder 模式时也未必与结构图所示完全一致。 

###### 典型应用

javax.xml.parsers.DocumentBuilder就是使用了 Builder 模式，将一个XML输入（文件、流、字符串等）解析成一棵 DOM 树（Document对象）是一个复杂的过程，所以parse方法就是 Builder 模式的应用，当然如何获得 DocumentBuilder 使用的是工厂模式（DocumentBuilderFactory.newDocumentBuilder()）。 

这里没有完全依照 Builder 模式中讨论的结构，但核心思想没有变。
