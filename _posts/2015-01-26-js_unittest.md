---
layout: post
title: JavaScript单元测试框架jsTestDriver与QUnit
tag: javascript
---

本文讨论一下JS代码怎么做unit test，框架jsTestDriver和QUnit的区别，怎么统计code coverage，怎么和jenkins集成等，jsTestDriver/QUnit/PhantomJS的安装与使用请参考官网上的介绍。

### jsTestDriver

jsTestDriver由java实现，是Apache 2.0许可下的一个开源项目，托管在Google Code上, 是JavaScript的单元测试框架。整个框架都包含在一个jar包里，安装非常简单，只要下载这个jar包，并保证本机安装了jdk，就可以使用命令行 `java -jar jsTestDriver.jar --options`使用jsTestDriver了。

下面是jsTestDriver的架构图:

![jsTestDriver framework](http://js-test-driver.googlecode.com/svn/wiki/Overview.png)

jsTestDriver包括两部分：客户端和服务端，两部分都包含在同一个jar里，server端负责驱动浏览器，client端负责接受用户测试指令，然后交给server端的浏览器执行。

一个server端可以驱动多个浏览器，甚至可以驱动remote browser，每一个测试都将被server端对应的所有浏览器执行，server端可以和client端在一起，也可以不在一起，譬如，在mac上开发代码，在另一个windows机器的IE里测试。

jsTestDriver可以在命令行下启动运行，也可以和Eclipse和IntelliJ IDEA等IDE集成。常用的命令行命令有:

```java
//在端口42442启动jsTestDriver，并启动几个浏览器实例
java -jar jsTestDriver.jar --port 42442 --browser browserpath1,browserpath2

//根据jsTestDriver.conf配置文件，载入js文件列表并运行test
java -jar jsTestDriver.jar --tests all
```

完整的options可以用help命令查看 `java -jar jsTestDriver.jar --help`，也可以查看文档: <https://code.google.com/p/js-test-driver/wiki/CommandLineFlags>

DEV在使用jsTestDriver写unit test时，一般有下面几个事情:

1. 写功能相关的js文件，譬如为 `project-root/src/a.js`
2. 写对应的unit test文件，譬如 `project-root/test/testA.js`，示例在下面
3. 写对应的config文件，譬如 `project-root/jsTestDriver.conf`，conf文件怎么写可以参考 <https://code.google.com/p/js-test-driver/wiki/ConfigurationFile>
4. 运行命令 `java -jar jsTestDriver.jar --port 42442 --browser browserpath` 启动server端
5. 运行命令 `java -jar jsTestDriver.jar --tests all` 运行测试

**步骤4和5可以在ant里配置，也可以和jenkins集成。**

### Code coverage report in jsTestDriver

jsTestDriver提供了coverage plugin，就是一个jar包，详细使用文档参考 <https://code.google.com/p/js-test-driver/wiki/CodeCoverage>

### QUnit

QUnit来自jQuery团队，但并不依赖jQuery，可以独立运行，整个框架就是一个js文件和一个css文件，我们可以把这个两个文件保存到本地，然后在代码里使用本地路径，也可以直接在代码里使用远程URL（不推荐这样，可能影响加载速度）。

qunit的运行没有任何依赖，只要在浏览器里打开测试的html文件就会运行相关tests，测试html会载入qunit框架和需要测试的js文件。

### QUnit vs jsTestDriver

qunit与jsTestDriver有几个区别:

* jsTestDriver由java实现，qunit是纯js的
* jsTestDriver可以在命令行下运行，qunit需要在浏览器里打开测试html，无法直接在命令行下运行（下面会介绍怎么在命令行运行qunit）
* jsTestDriver可以同时在多个浏览器下运行测试，qunit一次只能在单个浏览器里运行测试
* jsTestDriver提供的断言比较基础和简单，qunit提供了丰富的断言和同步异步支持

在目录结构上，两者也有一些不同:

```
    //jsTestDriver目录结构示例
    project-root/
        src/a.js
        test/testA.js
        jsTestDriver.conf   //qunit没有这样的conf文件

    //QUnit目录结构示例
    project-root/
        src/a.js
        test/
            testA.js
            testA.html    //jsTestDriver没有这样的文件
```

### 利用PhantomJS在命令行下运行QUnit

QUnit tests需要在浏览器里运行，jenkins用于组织CI流程，可以在Jenkins里运行QUnit测试吗? Jenkins一般是执行bat脚本或者shell脚本，如果QUnit可以在command line下执行，那么就可以由jenkins执行了。那么，如何脱离浏览器，在command line下执行qunit tests呢？

一个办法是使用bat或shell脚本直接打开浏览器，然后在浏览器里打开测试html，这个方法简单但很有效，而且可以打开各种浏览器，因此各种浏览器都可以被测试。

另一个办法就是使用PhantomJS, PhantomJS是一个没有UI的webkit浏览器，虽然没有UI，但dom渲染、js运行、网络访问、canvas/svg绘制等功能都很完备，在页面抓取、页面输出、自动化测试等方面有广泛的应用。由于PhantomJS是基于webkit的，所以使用PhantomJS没法测试Firefox/Chrome/IE等浏览器.

下面是步骤:

* 安装 PhantomJS (<http://phantomjs.org>), 有linux, windows, mac等版本，根据需要下载安装对应平台的版本
* 安装2个qunit plugins:
    * PhantomJS Runner: <https://github.com/jonkemp/qunit-phantomjs-runner>, 用于在phantomjs里执行qunit tests
    * JUnit reporter, 用于生成junit格式的report xml

上述的两个plugin其实就是2个js文件.

### Code coverage report in QUnit

有一些开源的工具可以统计code coverage，譬如JSCover，blanket.js