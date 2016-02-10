---
layout: post
title: 深入理解JS里的函数
tag: javascript
---

### First-class function

JS函数也是对象，这使得JS中的函数变成`一级公民`，这表示，函数可以作为其他函数的参数，可以作为返回值，可以赋值给某个变量，可以被存储在某个数据结构里。

### function与object的区别

函数可以通过()调用，普通对象不可以。

函数中有一个隐含的内部属性为 `[[Call]]`，typeof 就是判断object是否有属性`[[Call]]`决定是否返回"function"的.

函数对象的原型是Function.prototype（Function.prototype本身会连接到Object.prototype）, 此外，函数对象还有两个特殊的隐藏的属性：函数的上下文和执行函数的代码。

### Declarations vs Expressions

```javascript
// declaration
function add(num1, num2) {
    return num1 + num2;
}

//expression
var add = function(num1, num2) {
    return num1 + num2;
};
```

两种定义函数的方法没有本质区别，但只有function declaration才会发生hoisting。

### 动态参数列表

js函数支持动态参数列表，调用时实际传递的参数（arguments）可以和函数声明时的参数列表不一致，实际参数少于形参(named parameters)时，多余的形参会被赋值为undefined，实际参数多于行参时，多出的参数可以使用arguments对象访问到。

### No overloading

C++/Java可以定义同名函数，但参数列表不一致，实现函数overloading，js函数不支持overloading，后定义的同名函数会覆盖前面定义的函数。

### 函数返回值

函数通过()方式调用时，如果在函数里有return语句，返回值就是return语句返回的变量，如果没有return语句，则返回值为undefined。

函数通过new调用时，默认返回的就是this。

### arguments对象

函数调用时会创建一个类似数组的临时变量arguments，所有参数都可以用arguments访问到。

函数形参的长度可以通过函数的length属性得到, 譬如函数foo(){}, `foo.length`会返回foo的形参长度，length值不会因为实际传递的参数个数改变而改变。

arguments对象很像是Array，但并不是真的array, `Array.isArray(arguments)`返回false。

### caller and callee

callee是arguments对象里面的一个属性，表示当前方法是谁，这个属性在ECMAScript 5里被deprecated，在strict模式下使用会报错。

caller原来也是arguments对象的一个属性，表示谁调用了当前方法，这个属性也被deprecated了，目前的主流浏览器都提供了Function.caller属性支持，假设有方法foo(), 在foo()方法里使用foo.caller可以得到谁调用了函数foo，如果调用者是top level，则返回null，否则返回调用者:

```javascript
function foo() {
  var callerFunc = foo.caller; //better than arguments.callee.caller
  if (!callerFunc) {
    return 'The function was called from the top!';
  } else {
    return "This function's caller was " + callerFunc.name;
  }
}
```

[stackoverflow](http://stackoverflow.com/questions/103598/why-was-the-arguments-callee-caller-property-deprecated-in-javascript) 解释了为什么会deprecate属性arguments.callee

### Function.prototype

所有js函数的原型链都继承于[Function.prototype](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/prototype), 所以, js函数都具有下述属性和方法:

属性:

* caller - foo.caller会返回foo()的调用者
* length - foo.length会返回foo的形参长度

方法:

```js
Function.prototype.apply()
Function.prototype.bind()
Function.prototype.call()
Function.prototype.toSource()
Function.prototype.toString()
```