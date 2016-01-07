---
layout: post
title: GoF结构型模式之Adapter
category: GoF_Patterns
---

有一个已经存在的类，但与客户需要的接口不一致，这时可以使用 Adapter 模式来适配原来的类以满足客户程序的调用，原来的类就是 Adaptee，完成适配工作的类就是 Adapter。 

适配一个已有类，可以通过继承的方式来改造接口和实现，这属于**类适配**；也可以通过在适配器里调用已有类的方法并提供合适的目标方法给客户程序，这属于**实例适配**；类适配可以屏蔽已有类的方法，因为是继承原有类，因此可以重载父类行为，改造能力强，但类适配是一种静态适配，不够灵活，实例适配相对比较灵活，也是比较常见的做法。下面是两种适配器的结构图： 

![](/img/gof/adapter.png)

**说明：** 客户程序是Client，需要的方法在接口 Target 中定义，已有的类是Adaptee，适配器是Adapter 

图中第一种使用类适配，Adapter 继承 Adaptee 并且实现接口 Target；图中第二种使用实例适配，Adapter 实现接口 Target，并且调用 Adaptee。

Adapter侧重解决两个不同接口的合作，在结构图里，Client和Target是一个已有应用A，Adapee是另一个已有应用B，A需要的接口是Target，但B的接口是Adaptee，两者并不一样，为了使A可以使用B，这时可以引入一个Adaper来弥合Target接口和Adaptee之间的不同。

###### 与Bridge模式比较

Adapter通常和Bridge相反，Adapter是为了让两个不同的类可以一起工作，而Bridge是为了解除继承带来的强耦合，以使得Bridge的两方(接口和实现)都可以灵活变化。已有两个类且接口不一致时，使用Adapter模式；设计新类时，为了解耦，使用Bridge模式。因此，Adapter在设计之后使用，Bridge在设计之前使用。

###### 核心思想

如果已有类和客户程序不一致时，可以实现一个适配器让客户程序使用，出发点是当前的客户程序，然后来适配原有类。
