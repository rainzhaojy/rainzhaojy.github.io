---
layout: post
title: 面向对象设计的几个原则
category: design patterns
---

设计模式只是具体的招式, 理解面向对象的设计原则, 才能更好的使用设计模式, 并且能灵活的运用设计模式, 甚至创造适合自己项目的设计模式.

比较常见的原则有SOLID原则以及其他几个原则:

1. S - Single responsibility principle, 单一功能原则
2. O - Open/closed Principle, 开放封闭原则, 对扩展开放，对修改封闭
3. L - Liskov substitution principle, 里氏替换原则
4. I - Interface segregation principle, 接口隔离原则, 多个特定客户端接口要好于一个宽泛用途的接口
5. D - Dependency inversion principle, 依赖反转原则, 依赖于抽象而不是一个实例, 依赖注入是该原则的一种实现方式
6. 封装变化 - 找出应用中可能需要变化之处, 把他们独立出来, 不要和那些不需要变化的代码混在一起
7. Interface Driven - 针对接口编程, 而不是针对实现编程
8. 多用组合, 少用继承
9. DRY – Don’t repeat yourself, 项目里不应该出现重复的代码