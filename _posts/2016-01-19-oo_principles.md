---
layout: post
title: 面向对象设计的几个原则
category: design patterns
---

SOLID原则:

<table class="ink-table bordered hover alternating">
  <thead>
    <tr>
      <th class="align-left"></th>
      <th class="align-left">Name</th>
      <th class="align-left">Name</th>
      <th class="align-left">Desc</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>S</td>
      <td>Single responsibility principle</td>
      <td>单一功能原则</td>
      <td></td>
    </tr>
    <tr>
      <td>O</td>
      <td>Open/closed Principle</td>
      <td>开放封闭原则</td>
      <td>对扩展开放，对修改封闭</td>
    </tr>
    <tr>
      <td>L</td>
      <td>Liskov substitution principle</td>
      <td>里氏替换原则</td>
      <td></td>
    </tr>
    <tr>
      <td>I</td>
      <td>Interface segregation principle</td>
      <td>接口隔离原则</td>
      <td>多个特定客户端接口要好于一个宽泛用途的接口</td>
    </tr>
    <tr>
      <td>D</td>
      <td>Dependency inversion principle</td>
      <td>依赖反转原则</td>
      <td>依赖于抽象而不是一个实例, 依赖注入是该原则的一种实现方式</td>
    </tr>
  </tbody>
</table>

```javascript
var s = "JavaScript syntax highlighting";
alert(s);
```

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

1. 封装变化 - 找出应用中可能需要变化之处, 把他们独立出来, 不要和那些不需要变化的代码混在一起
2. Interface Driven - 针对接口编程, 而不是针对实现编程
3. 多用组合, 少用继承
4. DRY – Don’t repeat yourself, 项目里不应该出现重复的代码