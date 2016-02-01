---
layout: post
title: 利用GitHub写博客的几种方式
tag: github
---

搭建个人blog站点有很多方案, 知乎问答[FarBox、Jekyll、Octopress、ghost、marboo、Hexo、Medium、Logdown、prose.io，这些博客程序有什么特点](http://www.zhihu.com/question/21981094)介绍了个人blog的几个方案, 本文主要介绍github.

网上有很多介绍基于github pages搭建blog的方法, 但介绍的一般是常见的做法, 使用Github Pages来整理个人笔记还有其他几种方式, 本文将一一介绍.

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

Github Pages基于上述技术.

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

### 方法1: jekyll

Github pages基于Jekyll, 因此最基本的方式就是使用jekyll搭建blog, 多数的网上教程介绍的都是这种, 你可以选择user page或者project page, 在这种方式下, 就是按照jekyll要求的目录结构利用markdown写blog, 提交到github后, github会使用jekyll编译你的blog, 然后host你的blog, 也就是host目录`_site`下的静态页面.

这是最常见的方法, 但你也可以有很多变通办法来整理博客, 下面会介绍几种.

### 方法2: Hexo + github

Github Pages其实等于jekyll engine + static web server, 利用jekyll搭建blog的方式这两个功能都用到了.

我们也可以不使用jekyll engine, 只利用static web server这个功能, 也就是说, 直接上传静态站点文件html/css/javascript/image等等, 让Github Pages帮我们host这些静态页面.

Hexo + Github pages搭建blog其实就是只利用了github pages的static web server功能, hexo在本机将用户的blog翻译成静态页面, 然后将这些静态页面上传到github上, 由github pages的static web server部署这些静态页面. 

hexo与jekyll的主要区别是: 

* md到html的转换时机不同, hexo在本机完成, jekyll是由github pages完成
* 提交到github库里的文件不同, hexo是提交转换后的静态页面, jekyll是提交转换前的md文件

我们可以使用hexo在本机写博客, 然后上传静态文件到github, 我们也可以使用其他模版引擎在本机写博客, 其实方法1里, 我们如果利用本机jekyll编译出静态文件, 然后只提交这些静态文件, 这样的做法和Hexo是一样的.

### 方法3: 直接在repo里提交markdown

github建议每个项目都提供一个README.md文件, 在网页上浏览项目或子目录时, github会自动显示当前目录里的README.md文件, 利用这一功能, 也有人直接提交markdown文件, 譬如 https://github.com/kilimchoi/engineering-blogs, 这样也是一种方法, 只是打开你的blog时上面会先看到folder list.

### 方法4: 利用issue写博客

利用github issues写博客也是一种做法. 譬如https://github.com/lifesinger/blog/issues, https://github.com/jikeytang/jikeytang.github.io/issues 和 https://github.com/jsfront, 知乎有人解释了为什么用issues写博客: https://www.zhihu.com/question/32066000