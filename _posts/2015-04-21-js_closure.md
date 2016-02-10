---
layout: post
title: 闭包(closure)与私有变量
tag: javascript
toc: true
---

闭包是javascript中实现公有，私有，特权变量的关键。

### 闭包的定义

要理解闭包，首先要理解Javascript作用域，Javascript没有块级作用域，只有函数作用域，inner function总是可以访问outer function里的变量，访问变量的过程就是从自身作用域开始查找变量，没有找到的话继续向上一级作用域查找，这一过程逐级往上，直到全局作用域。

闭包是指在 JavaScript 中，内部函数总是可以访问其所在的外部函数中声明的参数和变量，即使在其外部函数被返回（寿命终结）了之后.

### 闭包的例子

```javascript
function foo(x) {
    var tmp = 3;

    function bar(y) {
        alert(x + y + (++tmp)); // will alert 16
    }

    bar(10);
}

foo(2);
```

上面例子里，bar方法可以访问到变量x，tmp，这就是闭包。把上面的例子修改一下:

```javascript
function foo(x) {
    var tmp = 3;

    return function (y) {
        alert(x + y + (++tmp));
    }
}

var bar = foo(2); // bar is now a closure.
bar(10); // will also alert 16
bar(10); // will alert 17 because tmp increased 1
```

这是一个闭包的常见应用，bar是一个foo返回的内部函数，bar使用了变量tmp，所以局部变量tmp不会被销毁，而且每次调用bar都会导致tmp数字加1.

例子参考 http://stackoverflow.com/questions/111102/how-do-javascript-closures-work

### 闭包的应用：定义私有变量

```javascript
var Foo = function(){
    var name = 'apple';
    this.getName = function(){
        return name;
    };
    this.setName = function(str){
        name = str;
    };
};
var foo = new Foo();

foo.name;        // undefined, name是私有变量, 无法直接访问
foo.getName();   // 'apple'
foo.setName('banana');    // name changed to 'banana'
```

### 闭包变量是multi instance 还是 single instance?

1) 多实例闭包变量：

```javascript
var Foo = function(){
    var name = 'apple';
    this.getName = function(){
        return name;
    };
    this.setName = function(str){
        name = str;
    };
};
var foo1 = new Foo();
foo1.setName('rain');

var foo2 = new Foo();
foo2.setName('bella');

console.log(foo1.getName()); // 'rain'
console.log(foo2.getName()); // 'bella'
```

2) 单实例闭包变量：

```javascript
var mymodule = (function(mymodule){
    var name = 'apple';

    mymodule.Foo = function () {};

    mymodule.Foo.prototype.getName = function(){
        return name;
    };
    mymodule.Foo.prototype.setName = function(str){
        name = str;
    };

    return mymodule;
}(mymodule || {}));

var foo1 = new mymodule.Foo();
foo1.setName('rain');

var foo2 = new mymodule.Foo();
foo2.setName('bella');

console.log(foo1.getName()); // 'bella'
console.log(foo2.getName()); // 'bella'
```

结论：`如果访问闭包变量的方法是多份copy，那么对应的闭包变量也是多份，相互不影响.`

在例子1)里，getName()和setName()方法为多份copy，foo1和foo2各有自己的getName()和setName()方法，因此，闭包变量name也是多份的。

在例子2)里，foo1和foo2的getName/setName方法是一个方法，都是Foo.prototype里的方法，因此操作的闭包变量也是一份，foo1会影响到foo2的闭包变量。

### 为单个对象定义私有变量:

使用immediately invoked function expression (IIFE)和closure为单个对象定义私有变量:

```javascript
var person = (function() {
    var age = 25; //私有变量
    return {
        name: "Nicholas",
        function getAge() {
            return age;
        }
        function growOlder() {
            age++;
        }
    }; 
}());
```

### 为构造函数定义instance specific private member

instance specific private member就是multi instance私有变量, 要让访问私有变量的方法变成多份:

```javascript
function Person(name) {
    var age = 25; //私有变量, instance specific private member
    
    this.name = name; //成员变量
    this.getAge = function() {
        return age;
    };
    this.growOlder = function() {
        age++;
    };
}

var person1 = new Person("Nicholas");
var person2 = new Person("Rain");
person1.growOlder();
console.log(person1.getAge()); //26, person1里的age变量加1
console.log(person2.getAge()); //25, person1.growOlder()不影响person2里的age变量
```

变量age是instance-specific的，person1和person2拥有自己的私有变量age，相互不影响。

方法getAge()和growOlder()直接定义在构造函数里，没有放在prototype对象里，这种做法会导致每个new出来的Person对象都有这两个方法定义，这样定义对象方法并不高效，但这是定义private, instance-specific data的唯一方式。

### 为构造函数定义instance shared private member

instance shared private member其实就是single instance私有变量, 其实就是让访问私有变量的方法只有一份:

```javascript
var Person = (function() {
    var age = 25; //私有变量, instance shared private member
    
    function InnerPerson(name) { 
        this.name = name; //成员变量
    }
    InnerPerson.prototype.getAge = function() {
        return age;
    };
    InnerPerson.prototype.growOlder = function() {
        age++;
    };
    return InnerPerson;
}());

var person1 = new Person("Nicholas");
var person2 = new Person("Rain");
person1.growOlder();
console.log(person1.getAge()); //26, person1里的age变量加1
console.log(person2.getAge()); //26, person2里的age与person1里的age是同一个变量
```

实现instance shared private member的本质就是把prototype对象放在IIFE里并定义私有变量，下面的写法也可以定义instance shared private member:

```javascript
function Person(name) {
    this.name = name; //成员变量
}
Person.prototype = (function () {
    var age = 25; //私有变量, instance shared private member

    return {
        constructor: Person,
        getAge: function () {
            return age;
        }
        growOlder: function() {
            age++;
        };
    };
}());
```

### 定义static变量

#### 1) public static member

```javascript
// constructor
var Gadget = function () {};

// static variable and method
Gadget.counter = 0;
Gadget.isShiny = function () {
    return "I am static method";
};

// a normal method added to the prototype
Gadget.prototype.setPrice = function (price) {
    this.price = price;
};

// calling a static method
Gadget.isShiny();
// creating an instance and calling a method
var iphone = new Gadget();
iphone.setPrice(500);

typeof Gadget.setPrice; // "undefined" 
typeof iphone.isShiny; // "undefined"
```

#### 2) private static member

private static member应该具有如下特性:

  * Shared by all the objects created with the same constructor function
  * Not accessible outside the constructor

下面是一个例子:

```javascript
var Gadget = (function () {
    var counter = 0; //private static variable

    // returning the new implementation of the constructor
    return function () {
        console.log(++counter);
    };
}()); // execute immediately

var g1 = new Gadget(); // logs 1
var g2 = new Gadget(); // logs 2
var g3 = new Gadget(); // logs 3
```

请注意：private static member和instance shared private member其实是一回事。

### 定义常量

定义常量和定义public static member类似，使用`objectName.constantName = constantValue`的方式定义，这里的objectName可以理解为namespace或module:

```javascript
myapp.MAX_NUM = 1000;
```

定义常量一般要注意两点:

  * 常量名全大写
  * 常量值一般为基本数据类型