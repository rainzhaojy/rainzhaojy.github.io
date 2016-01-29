---
layout: post
title: 使用GitHub搭建个人博客(3)定制模版与语法扩展
tag: github
toc: true
---

一个简单的办法是找一个现成的模板, http://jekyllthemes.org 上面列出了很多模版, 但我在13年搭建博客时没有发现满意的模板，因此就自己做了一个, 15年又做了一些改进.

自己创建模版需要了解这些知识:

* html/css - 你要能够用html和css创建模版页面, 如果你的模版用到了js, 还要懂一些js
* jekyll - 可以看一下[jekyll的官方文档](http://jekyllrb.com/docs/home)或者[jekyllbootstrap](http://jekyllbootstrap.com/lessons/jekyll-introduction.html)
* liquid - 花2小时看一下[liquid for designers](https://github.com/Shopify/liquid/wiki/Liquid-for-Designers)

### 创建模板

我的模版素材主要来源于:

* 样式参考了我之前jspwiki时的网站模版, 并使用了[INK CSS](http://ink.sapo.pt)方便实现各种CSS效果
* 15年参考<http://jekyllthemes.org/themes/wiki-blog>做了一些修改

如果你对jekyll已经比较了解，做一个简单的模板还是比较容易的，主要工作其实就是CSS和UI设计, 下面是我的目录结构:

```
rainzhaojy.github.io
    +- _includes
    |      |- head.html      /* 页面head部分, 引入了各种js/css文件 */
    |      |- header.html
    |      |- footer.html
    +- _layouts
    |      |- default.html
    |      |- post.html
    +- _posts
    +- static
    |      +- ink-3.0.5            /* Ink CSS样式 */
    |      +- highlight-9.1        /* 实现代码高亮 */
    |      +- jquery.toc           /* jquery插件, 实现toc功能 */
    |      |- jquery-1.11.1.min.js /* jquery库 */
    |      |- rain.css             /* 自定义CSS */
    |      |- rain.js              /* 自定义javascript */
    +- img            /* 博客里用到的图片都放在这个目录 */
    |- _config.yml    /* jekyll配置文件 */
    |- CNAME          /* 自定义域名 */
    |- README.md
    |- index.md
    |- about.md
    |- .gitignore     /* 忽略_site目录 */
```

jekyll编译时会将.md文件转换成.html文件, 并放在\_site目录, 同时会将非下划线\_开头的目录直接拷贝到\_site目录下

### 使用哪一个markdown engine?

选择之前请先注意下面两个概念是不同的:

* Github Flavored Markdown(GFM), 参考[GFM](https://help.github.com/articles/github-flavored-markdown/)
* 你的个人博客的markdown engine

GFW是Github自身的markdown engine, 用于转换github上的markdown文本, 包括issues, comments, and pull requests等, GFM支持了一些很有用的markdown扩展, 譬如 URL auto linking, fenced code blocks, syntax highlighting, table等等.

利用Github Pages搭建个人博客时, 我们可以在站点的`_config.yml`里指定自己博客的markdown engine, 可以和GFM不同, 当然, 这些markdown engine必须是github支持的, 目前github pages支持下面几种markdown engine:

* Maruku: 早期的GFM引擎, 已经很久没有更新了
* Redcarpet: C实现
* Rdiscount: C实现, supports a superset of Markdown.
* kramdown(default): 目前的GFM使用kramdown

Github Pages上各个引擎的版本参考 https://pages.github.com/versions

本站最早使用rdiscount, 因为rdiscount支持autolink, 目前使用`redcarpet`, 因为redcarpet支持更多功能, 包括:

* auto link - URL自动生成link
* strikethrough - 在文本前后各加上两个`~`, ~~your text~~
* no_intra_emphasis - 单词里的下划线不会被解释成斜体, 如果没有这个功能, `foo_bar`会变成 foo<em>bar</em>

redcarpet还支持 fenced code blocks, table, 下面的章节会详细介绍.

### 代码高亮

有下面几种方法实现代码高亮.

1. 使用JavaScript实现代码高亮 - 多数页面的语法高亮都是JavaScript实现的，搜索"javascript 语法高亮"可以找到很多实现，本站开始使用的是[google code prettify](https://code.google.com/p/google-code-prettify)，目前使用 https://highlightjs.org
2. Pygments - 这是基于Python的代码高亮工具, 有很多github pages上的博客使用pygments实现

本站使用的方案为 `redcarpet + highlightjs`

#### 使用redcarpet+highlightjs实现代码高亮

在_config.yml里面配置使用redcarpet作为markdown引擎, 并配置"fenced_code_blocks", 如下:

```
markdown: redcarpet
redcarpet:
    extensions: ["fenced_code_blocks", "autolink", "tables", "strikethrough"]
```

然后在head.html里引入hightlighjs相关javascript/css文件实现代码高亮. 这样下面的markdown文本

<pre>
```js
var s = "JavaScript syntax highlighting";
alert(s);
```
</pre>

首先被redcarpet fenced code blocks插件翻译成下面的html文本:

```html
<div class="highlight"><pre><code class="js language-js" data-lang="js">
var s = "JavaScript syntax highlighting";
alert(s);
</code></pre></div>
```

然后highlightjs会进行代码高亮处理, 就是使用highlight.pack.js解析你的代码然后加上相应的css样式, 最终效果如下:

```js
var s = "JavaScript syntax highlighting";
alert(s);
```

redcarpet fenced code blocks支持的语言列表可以参考[languages.yml](https://github.com/github/linguist/blob/master/lib/linguist/languages.yml), highlightjs支持的语言列表可以参考https://highlightjs.org, 本站在下载highlighjs时配置了下面一些语言:

| 支持语言 | 别名 |
| -------- | -------- |
| javascript | js |
| cpp | c, cc, h, c++, h++, hpp |
| python | py, gyp |
| makefile | mk, mak |
| markdown | md, mkdown, mkd |
| cs | csharp |
| diff | patch |
| perl | pl |
| bash | sh, zsh |
| objectivec | mm, objc, obj-c |

其他还有 xml, ruby, css, html, json, nginx, java, php, ini, http, sql, go, erlang 等等.


#### 给普通文本增加highlightjs样式

如果在markdown文本想输出普通文本块(非代码, 但希望保留格式, 也就是使用pre输出), md文本如下

<pre>
```
your text
```
</pre>

redcarpet fenced code blocks插件将会翻译成下面的html文本:

```html
<div class="highlight"><pre><code class="text language-text" data-lang="text">
your text
</code></pre></div>
```

请注意, redcarpet输出的语言为"text", 但highlightjs并没有一种语言叫text, 因此不会做任何处理, 也没有定义任何样式, 最后出来的效果就是普通pre标签的效果, 没有任何css样式. 

为了让普通文本也有基本的css样式, 我使用jquery给code标签增加css样式hljs, 下面是两种写法, 任选一个即可:

```js
$("code.language-text").addClass("hljs");     // 方法1
$("code[data-lang='text']").addClass("hljs"); // 方法2
```

### 表格

本站之前是在makrdown里直接写html文本实现表格支持, 并使用INK CSS样式定定制表格样式, 目前使用redcarpet.

Inline HTML+INK CSS的写法比较麻烦, 而且在markdown夹杂html的写法也显得怪异, 因此目前改为 redcarpet tables + ink css, 这样就可以直接用markdown输出表格了.

本站做了2个改动实现表格支持:

1. 在_config.yml文件里配置使用redcarpet并且配置插件tables:

```
markdown: redcarpet
redcarpet:
    extensions: ["fenced_code_blocks", "autolink", "tables", "strikethrough"]
```

2. 在rain.js里使用jquery给表格加上INK CSS:

```js
$("table").addClass("ink-table alternating hover bordered");
```

这样, 就可以使用markdown文本输出表格了, 语法为:

```
| header 1 | header 2 |
| -------- | -------- |
| cell 1   | cell 2   |
| cell 3   | cell 4   |
```

效果如下:

| header 1 | header 2 |
| -------- | -------- |
| cell 1   | cell 2   |
| cell 3   | cell 4   |

还可以定义对齐方式:

```
| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |
```

效果如下:

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

### TOC功能

本站使用JavaScript实现TOC功能: https://github.com/jgallen23/toc 使用page.toc变量决定是否显示toc, 默认page.toc为false, 因此默认没有toc, 如果想在博客上显示toc, 需要在博客文件开头的YAML部分定义`toc: true`.

如果想在博客里显示toc, 需要满足两个条件: `layout: post` & `toc: true`, 示例如下:

```
---
layout: post
title: your blog title
category: your blog category
toc: true
---
```

### 其他功能

1. 使用js实现category, 给每个category一个单独的URL, 譬如index.html?cate=github, 可以解决页面跳转后再返回的问题, 本站使用的是tag不是category
2. inline code样式使用bootstrap里的样式: http://getbootstrap.com/customize/#code
3. 利用css media screen适配不同屏幕尺寸
4. 利用css media print定制打印样式