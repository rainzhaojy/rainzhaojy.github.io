---
layout: post
title: 什么是github pages?
tag: github
---

这不是一个step by step guide, 这里会介绍相关的一些知识点. 关于Github Pages, 可以参考官网介绍: [github pages basics](https://help.github.com/categories/github-pages-basics)与[github pages features](https://help.github.com/categories/github-pages-features). 关于如何使用github pages搭建blog, 可以参考[使用GitHub搭建个人博客(1)创建一个最简单的blog]({% post_url 2013-03-08-setup_blog_on_github %})

### 背景知识

了解下面几个概念会有助于了解github pages:

* `markdown`, `textile`, `reStructuredText`等标记语言, 这些都被称为轻量级标记语言(lightweight markup language, 参考 https://en.wikipedia.org/wiki/Lightweight_markup_language ), 这些标记语言可以被转换成HTML页面
    * 这几种标记语言的区别可以参考知乎问答[Textile 和 Markdown 各有什么优劣？](http://www.zhihu.com/question/20912653)
    * wiki所使用的语言也是一种标记语言, 被称为[wiki markup](https://en.wikipedia.org/wiki/Wiki_markup), wiki markup与markdown/textile语法有些类似, 但并不完全一样. wiki markup没有统一的标准, 不同的wiki engine可能使用不同的wiki markup. [Creole](https://en.wikipedia.org/wiki/Creole_(markup))试图定义一个统一的wiki markup, 但应用并不多.
* jekyll模版引擎, jekyll是Ruby实现的静态页面模版引擎, 可以把markdown等标记语言文档转换成HTML页面
    * jekyll配置文件为网站根目录下的`_config.yml`文件, 参考[_config.yml配置文件](http://jekyllrb.com/docs/configuration)
    * jekyll文档: [jekyll的官方文档](http://jekyllrb.com/docs/home)或者[jekyllbootstrap](http://jekyllbootstrap.com/lessons/jekyll-introduction.html)
* liquid模版引擎, 语法类似 <mark>&#123;{ something }}</mark>, <mark>&#123;% something %}</mark>
    * liquid文档[liquid for designers](https://github.com/Shopify/liquid/wiki/Liquid-for-Designers), http://liquidmarkup.org

Github Pages基于这几个技术: markdown, jekyll, liquid

### User page and project page

Github Pages提供两种pages, 一种是user/org pages, 另一种是project pages, 详细可以参考github的介绍[User, Organization, and Project Pages](https://help.github.com/articles/user-organization-and-project-pages):

| |User Page |Project Page |
| -------- | -------- | -------- |
|是否多个 |一个帐号只有一个 |可以有多个, 每个repo都可以有对应的Project page |
|repo name and branch name |repo名必须为`<username>.github.io`, 页面在master主干上 |repo名随意, 页面必须在分支`gh-pages`下 |
|URL |http(s)://\<username\>.github.io |http(s)://\<username\>.github.io/\<projectname\> |
|URL示例 |http://rainzhaojy.github.io |http://rainzhaojy.github.io/rain-site |
|repo address |https://github.com/rainzhaojy/rainzhaojy.github.io |https://github.com/rainzhaojy/rain-site |

W3C是一个使用github pages的一个很好的例子, w3c是github帐号名, 在user pages上定义了如何定义w3c spec, 即在repo "w3c.github.io" (对应的repo地址为 https://github.com/w3c/w3c.github.io ), 我们可以使用URL http://w3c.github.io 访问对应页面, 每一个spec都对应了一个project repo, 譬如webrtc, 文档定义在repo "webrtc-pc"的分支"gh-pages"下面, 对应的URL为 http://w3c.github.io/webrtc-pc

### 利用Jekyll搭建个人博客

Github pages基于Jekyll, 因此最基本的方式就是使用jekyll搭建blog, 多数的网上教程介绍的都是这种, 你可以选择user page或者project page, 在这种方式下, 就是按照jekyll要求的目录结构利用markdown写blog, 提交到github后, github会使用jekyll编译你的blog, 然后host你的blog, 也就是host目录`_site`下的静态页面.

这是最常见的方法, 但你也可以有很多变通办法来整理博客, 下面会介绍几种.
