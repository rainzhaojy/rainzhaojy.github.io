---
layout: post
title: GoF行为型模式之Observer
category: GoF_Patterns
---

存在一对多的依赖关系时, 当被依赖的这个对象状态发生变化, 所有依赖对象将会被通知并自动更新.

Observer模式结构图:

![](/img/gof/observer.gif)

Observer模式是一个发布/订阅形式的模式，在JAVA里有相应的API可以非常方便的应用观察者模式. 与Observer模式相关的API有:

* java.util.Observable - 这是被观察的对象，这是一个JAVA类,主要有下面2个方法:
    * addObserver(Observer o) - 增加观察者
    * notifyObservers(Object arg) - 如果被观察的对象发生变化时使用此方法通知所有观察者,并把相关参数通过arg传递
* java.util.Observer - 这是观察者, 这是一个JAVA接口, 里面只有一个方法:
    * update(Observable o, Object arg) - 使用此方法响应被观察对象的变化
