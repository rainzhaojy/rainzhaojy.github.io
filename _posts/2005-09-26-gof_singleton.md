---
layout: post
title: GoF创建型模式之Singleton
category: GoF_Patterns
---

Singleton模式主要作用是保证一个类只有一个实例存在，并提供一个访问它的全局访问点。 

Singleton能够被状态化，例如论坛中帖子的计数器;Singleton也能够被无状态化，用于提供工具性质的功能。 

在具体应用中对象通常可以分成2种：商业组件（Business Object）和数据组件（Data Object），对于Business Object,一般应该使用Singleton模式，节省创建对象和回收对象的时间。 而对于数据组件, 一般不宜使用单例模式, 如果是为了防止大量数据组件创建和销毁, 可以考虑使用 **对象池技术** 或使用 *Flyweight* 模式.

##### 懒汉式单例类

Singleton常结合 Factory Method 来实现，JAVA中常见的实现如下(懒汉式)：
<pre class="prettyprint">
public class Singleton{
    private static Singleton instance = null;
    private Singleton(){}
    public static Singleton getInstance(){
        if (instance == null){
            instance = new Singleton();
        }
        return instance;
    }
    ......
}
</pre>

以上的用法非常简单,是比较常见的Singleton模式的实现方法，但没有考虑多线程和序列化的情况。在上例中如下的代码块不是线程安全的（thread-safe）: 

<pre class="prettyprint">
1   if (instance == null){
2       instance = new Singleton();
3   }
</pre>

如果 thread1 执行到语句2之前，thread2 也进入判断语句1，那么 thread2 也将执行语句2，那么 thread1 和 thread2 获得的 instance 将不一样. 当然如果Singleton没有状态, 也并不影响程序的正确执行. 在 <http://www.javaworld.com/javaworld/jw-04-2003/jw-0425-designpatterns.html> 上有比较深入的单例模式的讨论, 改进的方法一是同步化上面的getInstance方法, 还有就是使用饿汉式单例类.

##### 饿汉式单例类

<pre class="prettyprint">
public class Singleton{
    private static Singleton instance = new Singleton();
    private Singleton(){}
    public static Singleton getInstance(){
        return instance;
    }
    ......
}
</pre>

例子里使用的是JAVA实现,懒汉式与饿汉式都是常见的单例实现. 在C++里, 由于静态初始化没有固定顺序, 因此通常使用懒汉式实现单例应用.
