---
layout: post
title: 使用GitHub搭建个人博客(2)进阶设定
category: GitHub
toc: true
---

经过上一篇的介绍，我们已经在GitHub上搭建了一个最简单的blog，接下来我们介绍一些进阶设定。


#### 搭建本机jekyll环境

你可以不在本机安装jekyll，但为了在上传文件到GitHub前能在本地看一下效果，强烈建议你在本机安装jekyll。个人体会，因为jekyll只支持UTF8编码，我从原来的wiki里copy文档时常有编码不对的问题导致jekyll编译失败，另外我自己写了一个template，需要时时看到效果，因此，本地的jekyll环境对我是非常重要的。

下面是在我的Mac OS X 10.8上安装本机jekyll环境的步骤，采用的RVM（Ruby Version Manager）方式安装。

1. install Ruby - Jekyll是基于ruby的，因此需要先安装ruby。Mac自带了一个Ruby，但版本较老，因此需要安装一个较新版本的ruby.
    * Step 1 - 安装Xcode, 可以在 mac app store里下载安装
    * Step 2 - 安装Command Line Tools, 在菜单栏中选择Xcode -> Preference -> Download，然后点击Command Line Tools对应的install即可
    * Step 3 - 确认Git已经安装: `git --version`
    * Step 4 - 安装RVM
    * Step 5 - 安装ruby
2. install jekyll

详细安装步骤请参考网上的教程.

更多资料:

* <http://www.hoowolf.net/2012/03/29/installing-ruby-on-rails-on-mac-os-x-lion>
* <http://equation85.github.com/blog/install-jekyll-on-mac>
* [jekyll wiki on github](https://github.com/mojombo/jekyll/wiki/Install)
* <http://brandonbohling.com/2011/08/27/Installing-Jekyll-on-Mac>
* <http://jekyllbootstrap.com/lessons/jekyll-introduction.html> - jekyll官方文档，还包含了一些有用的link
* <http://jekyllbootstrap.com/api/jekyll-liquid-api.html> - jekyll对liquid的扩展
* [jekyll wiki](https://github.com/mojombo/jekyll/wiki/Usage) - jekyll wiki
* [jekyll configuration](https://github.com/mojombo/jekyll/wiki/Configuration) - \_config.yml配置项

#### 绑定域名

user pages可以通过域名`http://username.github.io`访问, project page可以通过域名`http(s)://username.github.io/projectname`访问, 因此绑定域名不是必须的, 但如果你有自己的域名, 那么可以绑定域名, 请参考 <https://help.github.com/articles/setting-up-a-custom-domain-with-pages>

譬如我的博客, github提供的地址为<http://rainzhaojy.github.io>, 但我绑定了自己的博客域名: <http://rainzhao.com>

#### 创建模板

一个简单的办法是找一个现成的模板，13年我搭建博客时没有发现满意的模板，因此当时自己做了一个, 15年做了一些小修改, 我的模版素材主要来源于:

* 样式参考了我之前jspwiki时的网站模版, 并使用了[INK CSS](http://ink.sapo.pt)方便实现各种CSS效果
* 15年参考<http://jekyllthemes.org/themes/wiki-blog>做了一些修改

如果你对jekyll已经比较了解，做一个简单的模板还是比较容易的，不了解jekyll的可以仔细看一下文档: <http://jekyllbootstrap.com/lessons/jekyll-introduction.html>,了解jekyll以后定义模板的主要工作其实就是CSS和UI设计了, 下面是我的目录结构:

<pre class="prettyprint">
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
    |      +- google-code-prettify /* 实现代码高亮 */
    |      +- jquery.toc           /* jquery插件, 实现toc功能 */
    |      |- jquery-1.11.1.min.js /* jquery库 */
    |      |- rain.css             /* 自定义CSS */
    |      |- rain.js              /* 切换不同category */
    +- img            /* 博客里用到的图片都放在这个目录 */
    |- _config.yml    /* jekyll配置文件 */
    |- CNAME          /* 自定义域名 */
    |- README.md
    |- index.md
    |- about.md
    |- .gitignore     /* 忽略_site目录 */
</pre>

jekyll编译时会将.md文件转换成.html文件, 并放在\_site目录, 同时会将非下划线\_开头的目录直接拷贝到\_site目录下

#### 代码高亮

看了一些资料提到GitHub Pages代码高亮可以使用pygments或者gist，看了一些文档后还是没有完全理解，而且有人提到pygments有时不work，因此决定自己找一个方案，一者省得继续花时间了解pygments，二者对GitHub Pages减少依赖。

一般页面的语法高亮都是JavaScript实现的，搜索"javascript 语法高亮"可以找到很多实现，我使用的是[google code prettify](https://code.google.com/p/google-code-prettify)，步骤如下:

1. 下载 google code prettify, 我是放在 /static 目录下
3. 在模板文件的header部分加上 `<script src="/static/google-code-prettify/run_prettify.js></script>`
4. 将需要高亮的代码段放在pre or code tag里: `<pre class="prettyprint">...</pre> or <code class="prettyprint">...</code>`

本站定义了一个自己的skin:

在目录`/static/google-code-prettify/loader/skins`里, 复制一份 `sunburst.css` 并命名为 `rain.css`, 修改上文步骤3里的语句为 &lt;script src="/static/google-code-prettify/run_prettify.js**?skin=rain**>&lt;/script>, 然后就可以在rain.css里修改或定义自己的CSS样式了.

#### TOC功能

使用jQuery插件<http://ndabas.github.io/toc/>实现TOC功能, 这个插件支持nested header, 本站配置为h1 - h4会被构建成toc, 另外, 使用page.toc变量决定是否显示toc, 默认page.toc为false, 因此默认没有toc, 如果想在博客上显示toc, 需要在博客文件开头的YAML部分定义`toc: true`.

如果想在博客里显示toc, 需要满足两个条件: `layout: post` & `toc: true`, 示例如下:

<pre class="prettyprint">
---
layout: post
title: your blog title
category: your blog category
toc: true
---
</pre>