---
layout: post
title: JavaScript闭包(closure)
tag: javascript
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

foo.name;        // undefined
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
var mymodule = (function(my){
    var name = 'apple';

    my.Foo = function () {};

    my.Foo.prototype.getName = function(){
        return name;
    };
    my.Foo.prototype.setName = function(str){
        name = str;
    };

    return my;
}(mymodule || {}));

var foo1 = new mymodule.Foo();
foo1.setName('rain');

var foo2 = new mymodule.Foo();
foo2.setName('bella');

console.log(foo1.getName()); // 'bella'
console.log(foo2.getName()); // 'bella'
```

结论：如果使用闭包变量的方法是多份copy，那么对应的闭包变量也是多份，相互不影响，在例子1)里，getName()和setName()方法多多份copy，foo1和foo2各有自己的getName()和setName()方法，因此，闭包变量name也是多份的。

如果使用闭包变量的方法是一份copy，那么对应的闭包变量也是一份，在例子2)里，foo1和foo2的getName/setName方法是一个方法，都是Foo.prototype里的方法，因此操作的闭包变量也是一份，foo1会影响到foo2的闭包变量。