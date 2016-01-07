---
layout: post
title: GoF创建型模式之Factory Method
category: GoF_Patterns
---

在GoF中有两种工厂模式，分别是 Factory Method 和 Abstract Factory 。在实际应用中还有一些工厂模式的变种，例如简单工厂模式等。这些模式被通称为工厂模式(Factory模式)。这里介绍Factory Method模式。

系统需要使用某个类时,在系统里使用一个方法来创建需要的类实例而不是使用new操作符来创建类实例,此方法就被称为 **工厂方法** . 正因为使用一个方法来创建类实例而不是直接使用new操作符,这为系统带来了更多的灵活性,我们可以重载这个方法以创建不同的实例(具有相同接口),或者在这个方法里应用Singleton和对象池等技术. 我们应该在系统中尽可能的使用工厂模式.

![factory method](/img/gof/factorymethod1.gif)

如结构图所示,我们的应用程序是Creator,需要使用Product类,使用了工厂方法后,创建具体类实例的责任交给了子类ConcreteCreator,如果Product增加了一个新的实现类AnotherProduct,我们无需修改现有代码,只需实现一个新的子类AnotherCreator并重载工厂方法MakeProduct(),在AnotherCreator.MakeProduct()方法里实例化AnotherProduct实例,从而达到系统的扩展要求和灵活性.

使用子类是应用工厂方法非常常见的用法,但有时子类不方便使用时,可以考虑使用参数化工厂方法.如下图所示,应用程序(Creator)本身没有类继承结构,也不希望使用类继承,但需要访问的类(Product)具有复杂的类继承结构,这时可以在Creator里使用参数化工厂方法.

参数化工厂方法结构图:

![](/img/gof/factorymethod2.gif)

避免使用子类的另一个方法是使用C++里的模板技术,这在C++程序里可以使用.

在程序中我们应该尽量使用工厂模式以取代直接使用new操作符, 这出于如下考虑:

* 责任分离 - 使用 new 操作符使得创建对象和使用对象两种责任统统交给了对象使用者。 
* 减少依赖 - 使用 new 操作符会过分依赖具体对象，如果对象有所变化，或者需要使用对象池等技术时，不利于扩展。 

Factory 模式解决了创建目标类的问题，但用户在使用 Factory 模式来创建目标类时需要先得到 Factory 类实例，如何获得工厂类实例是用户的另一层设计，用户可以使用创建型模式中的任意一种模式，也可以不使用模式，直接使用 new 操作符。 

下面举例说明4种Factory Method应用,假设要建一个房子，房子有木头和石头两种，程序中我们定义一个房子接口 IHouse，两种实现类分别是 WoodHouse 和 StoneHouse，类图如下： 

<pre class="prettyprint">
            IHouse
            /   \
    WoodHouse   StoneHouse
</pre>

###### 1. 静态工厂方法 － 在自身类里定义

在实现类里定义一个静态方法 getInstance 返回自身实例。 
<pre class="prettyprint">
    public class WoodHouse implements IHouse{
        public static IHouse getInstance(){
            return new WoodHouse();
        }
        ......
    }

    public class StoneHouse implements IHouse{
        public static IHouse getInstance(){
            return new StoneHouse();
        }
        ......
    }
</pre>

这种用法有一些不足： 

* 每一种实现类都要定义工厂方法，假设再多一种 BrickHouse 的话，也需要定义工厂方法getInstance。工厂方法和类实现绑的太紧，有违创建型模式的初衷； 
* 工厂方法无法体现类的继承关系，即无法在接口中定义一个静态的工厂方法，强制要求实现类实现这个静态的工厂方法。（无法将getInstance方法定义到IHouse里，因为接口中不能定义静态方法） 

但由于这种实现比较简单，所以常在如下的环境下使用：只有一种 House 时（如下）；在某个类实现 Singleton 时就可以在这个类里如此使用工厂方法模式。 

<pre class="prettyprint">
    public class House{
        public static House getInstance(){
            return new House();
        }
        ......
    }
</pre>

###### 2. 静态工厂方法 － 在一个单独类里定义

这种用法与用法1没有本质区别，但因为工厂方法位于一个单独的地方，稍微降低了工厂方法对于实现类的依赖，这样保证创建实例的逻辑被集中在一个地方。 

如下示例定义了多个方法，这有一个缺点，如果多了一种实现类（SteelHouse），必须多加一个工厂方法(getSteelHouse)： 

<pre class="prettyprint">
    public class HouseCreator{
        public static IHouse getWoodHouse(){
            return new WoodHouse();
        }
        public static IHouse getStoneHouse(){
            return new StoneHouse();
        }
    }
</pre>

如下使用参数化工厂方法，如果多了一种实现类（SteelHouse），需要修改工厂方法。 

<pre class="prettyprint">
    public class HouseCreator{
        public static IHouse getHouse(String param){
            // instantiate WoodHouse or StoneHouse by the param
        }
    }
</pre>

###### 3. 非静态工厂方法（not-static Factory Method）

这种用法与结构图所示类似，对应于类的继承关系，定义一组相应的构造类，这里定义构造类接口为 IHouseCreator，定义实现类 WoodHouseCreator 和 StoneHouseCreator，类图如下： 

<pre class="prettyprint">
               IHouseCreator
                /       \
    WoodHouseCreator   StoneHouseCreator
</pre>

类定义如下：
 
<pre class="prettyprint">
    public interface IHouseCreator{
        public IHouse create();
    }

    public class WoodHouseCreator implements IHouseCreator{
        public IHouse create(){
            return new WoodHouse();
        }
    }

    public class StoneHouseCreator implements IHouseCreator{
        public IHouse create(){
            return new StoneHouse();
        }
    }
</pre>

###### 4. 参数化工厂方法

<pre class="prettyprint">
    public class HouseCreator{
        public IHouse create(String param){
            ...... // instantiate ConcreteHouse by param
        }
    }
</pre>

在Factory Method里根据不同参数创建不同对象。
