---
layout: post
title: GoF创建型模式之Abstract Factory
category: GoF_Patterns
---

抽象工厂提供一个创建一系列相关或相互依赖对象的接口，而无需指定他们具体的类。抽象工厂基于工厂方法，与工厂方法的区别在于需要创建对象的复杂程度上。

抽象工厂模式结构图:

![](/img/gof/abstractfactory.png)

###### 举例说明

实现一个可视化窗口，包括按钮（Button）和文本输入框（Text），分别实现两种风格的界面，一种基于AWT，一种基于Swing，那么将出现如下几个类： 

```
            IButton                   IText
            /   \                     /   \
    AWTButton  SwingButton      AWTText   SwingText
```

为了将Button与Text的创建过程与使用过程分开，这里使用工厂模式，我们可以定义两个工厂类，ButtonCreator 和 TextCreator：（工厂方法的使用也有多种，例如静态方法，参数化工厂方法，等，具体参考**Factory Method**）

```java
    public interface IButtonCreator{
        public IButton createButton();
    }
    public class AWTButtonCreator implements IButtonCreator{
        public IButton createButton(){
            return new AWTButton();
        }
    }
    public class SwingButtonCreator implements IButtonCreator{
        public IButton createButton(){
            return new SwingButton();
        }
    }
    public interface ITextCreator{
        public IText createText();
    }
    public class AWTTextCreator implements ITextCreator{
        public IText createText(){
            return new AWTText();
        }
    }
    public class SwingTextCreator implements ITextCreator{
        public IText createText(){
            return new SwingText();
        }
    }
```

如上的用法仅仅使用了工厂方法，也可以满足实际应用，其工厂类的类图如下： 

```
                IButtonCreator                         ITextCreator
                 /      \                               /       \
    AWTButtonCreator   SwingButtonCreator     AWTTextCreator    SwingTextCreator
```

但我们会发现，AWTButton 和 AWTText 肯定一起出现，SwingButton 和 SwingText 也肯定一起出现，那么我们就可以对于工厂方法的使用做一些改进，类图如下： 

```
            IFactory
            /     \
    AWTFactory   SwingFactory
```

在IFactory里定义两个方法来创建我们需要的两个组件 Button 和 Text，在 AWTFactory 和 SwingFactory 里创建不同类型的 Button 和 Text，这样我们使用具体的工厂类可以创建一组相关的类，IFactory定义如下： 

```java
    public interface IFactory{
        public IButton createButton();
        public Itext createText();
    }
```

如上的用法就是 Abstract Factory，由此也可以看出 **Factory Method 是针对某个特定类的，Abstract Factory 是针对一组相关类的**
