---
layout: post
title: About
whereami: about
---

### About the site

这是Rain Zhao的个人博客站点, 部署在Github Pages上, 主要用于记录个人的一些技术博客, 如果你也想部署类似的个人博客站点, 可以参考我的博客里关于Github Pages的文档.

### About me

做技术, 也做管理, 爱好阅读和足球. 联系我:

* <i class="fa fa-envelope"></i> [rainzhao@outlook.com](mailto:rainzhao@outlook.com)
* <i class="fa fa-linkedin"></i> <http://cn.linkedin.com/in/rainz>

### 对待技术的看法

* 没有一步到位的架构, 够用就好, 要不断重构与迭代
* 语言没有优劣, 适用就行
* 没有解决不了的问题, 只要想解决
* 简单最好, 要用简单的代码解决复杂的问题
* 要善于整理工作日记, wiki+plantuml是很好的方式, markdown也不错
* 多数问题都不是你独有的, 因此要善用google/stackoverflow等
* 代码加适当的注释是最好的文档
* 静下心来自学比找人讨论和培训效率更高

### 个人建站经历

个人一直喜欢将工作和学习心得纪录下来，刚工作时，使用纸来纪录自己的学习工作心得，从02年开始，在免费的博客空间上写博客，从03年开始，自己建站。

最早使用Struts1.1+Tiles构建, 并在now.net.cn上租用了一个jsp空间部署个人站点。05年开始基于JSPWiki v2.2.27构建, 内容管理更加方便, 可以享受更多wiki的优势. 之所以选择JSPWiki，是因为JSPWiki由JSP实现，是自己熟悉的语言，更新也比较活跃，使用文件系统保存wiki page，容易部署在公共空间上。

11年开始使用dokuwiki，JSPWiki 和 DokuWiki 都是开源 wiki engine，都使用文件系统保存wiki page，都比较活跃也比较受欢迎，功能都很丰富，有很好的插件机制，JSPWiki基于JSP/Servlet，DokuWiki基于PHP。参考 <http://www.wikimatrix.org/compare/DokuWiki+JSPWiki>。

之所以从 JSPWiki 转到 DokuWiki，有两个简单的原因:

* 一直在Macbook Pro上工作，Mac OS X 自带了 Apache，很容易搭建 PHP wiki engine，而DokuWiki是了解下来比较不错的 wiki engine
* 考虑到如果将来要租用虚拟空间部署自己的wiki，支持PHP的空间要比支持JSP的空间便宜不少

13年初开始使用GitHub Pages搭建个人博客，同时继续在本机使用dokuwiki+plantuml整理文档.

### Todo list

* 选择某个category->打开某个blog->点击浏览器返回, 这时会显示所有category, 如果每个category有单独的URL, 譬如index.html?cate=github, 这样就可以解决浏览器返回的问题了
* 文章显示last modified date