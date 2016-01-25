---
layout: post
title: GoF结构型模式之Composite
category: GoF_Patterns
---

对象被组织成树形结构，用户对于单个对象和对象树的操作相同。这样客户程序就无需关心自己使用的是叶子还是树，因为操作都是一样的。 

组合模式结构图:

![](/img/gof/compo073.gif)

这样的结构一者便于扩展，二者简化客户程序。简单应用时可能只需要使用叶子，当应用复杂时，就将这个叶子换成树，里面有一些叶子，应用再复杂时，树里还可以包含树，这样就可以组成一棵很庞大的树了，对于客户程序而言操作并没有变化，就如同操作单个叶子一样简单。 

对于树，需要遍历树里的元素（叶子或子树），所以可以使用 **Iterator模式**（Java中的Iterator, C++/STL中的iterator）。 

在Java中应用 Composite 模式，通常先定义一个接口，叶子和树都实现这个接口，类图如下： 

```
              IProduct
              /     \
    ProductLeaf     ProductTree
```

对于客户程序而言，使用的都是 IProduct，而不用关心这是一个 Leaf 还是一个 Tree。当然对于 Tree 中的操作其实是遍历自己的元素（叶子或子树，如果是子树，继续遍历，这里是一种 **递归**），然后执行他们。 

###### 典型应用

JUnit 就是使用了 Composite 模式，TestCase 是叶子，TestSuite 是树，下面是JUnit的类图，关于JUnit的详细介绍参考其他文档。

JUnit类图:

![](/img/gof/junit.gif)
