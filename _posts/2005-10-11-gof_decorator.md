---
layout: post
title: GoF结构型模式之Decorator
category: GoF_Patterns
---

动态给一个对象添加一些额外的职责，就象在墙上刷油漆。使用子类也可以达到为父类添加功能的目的，但使用Decorator模式显得更为灵活。 

Decorator先看到一个已存在的类，然后通过 Decorator 来添加更多功能，Decorator模式重在向已有类添加行为，JAVA中的Wrapper模式可以理解为Decorator模式.

###### 核心思想

在不改变原有对象的情况下为对象添加更多动能 

###### 典型应用

* 1) Java IO API就是使用 Decorator 实现的，例如如下代码： 
<pre class="prettyprint">
    FileReader fReader = new FileReader("a.txt");
    BufferedReader reader = new BufferedReader(fReader);
    String s = reader.readLine();
</pre>

BufferedReader 就是油漆工（decorator），FileReader就是被油漆的对象（decoratee），包装出了一个新的方法 readLine()

* 2) javax.servlet.http.HttpServletRequestWrapper，底层对象是 HttpServletRequest
