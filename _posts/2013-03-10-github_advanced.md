---
layout: post
title: 使用GitHub搭建个人博客(2)进阶设定
category: GitHub
toc: true
---

经过上一篇的介绍，我们已经在GitHub上搭建了一个最简单的blog，接下来我们介绍一些进阶设定。


#### 搭建本机jekyll环境

你可以不在本机安装jekyll，但为了在上传文件到GitHub前能在本地看一下效果，强烈建议你在本机安装jekyll。个人体会，因为jekyll只支持UTF8编码，我从原来的wiki里copy文档时常有编码不对的问题导致jekyll编译失败，另外我自己写了一个template，需要时时看到效果，因此，本地的jekyll环境对我是非常重要的。

详细的安装步骤可以参考 <http://jekyllrb.com/docs/installation/> 或者网上找一些教程.下面是在我的Macbook上安装本机jekyll环境的步骤:

1. install Xcode - jekyll可能会依赖xcode某些组件, 因此建议先安装Xcode和Xcode command line tools
2. install Ruby (可选) - Jekyll是基于ruby的, 所以需要有ruby环境. Mac自带了一个Ruby, 因此这一步可以省略, 但如果想安装最新版本的ruby, 步骤如下:
    1. 安装RVM - 用Ruby Version Manager(RVM)管理多个版本的Ruby
    2. 安装最新版本的ruby
    3. 安装RubyGems (可选) - Ruby的包管理器, Ruby1.9.1 以后的版本自带RubyGems
3. install jekyll - 使用RubyGems安装Jekyll: `gem install jekyll`

参考:

* <http://jekyllrb.com/docs/home/> - jekyll官网文档
* <http://jekyllbootstrap.com/lessons/jekyll-introduction.html> - jekyll bootstrap

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

##### 方法1: 使用JavaScript实现代码高亮

一般页面的语法高亮都是JavaScript实现的，搜索"javascript 语法高亮"可以找到很多实现，我使用的是[google code prettify](https://code.google.com/p/google-code-prettify)，下载后将google code prettify目录放在 `/static` 目录下, 本站定义了一个自己的skin:

在目录`/static/google-code-prettify/loader/skins`里, 复制一份 `sunburst.css` 并命名为 `rain.css`, 在rain.css里修改或定义自己的CSS样式.

然后在模板文件的header部分加上 `<script src="/static/google-code-prettify/run_prettify.js?skin=rain></script>`

用法如下:

`<pre class="prettyprint">...</pre>`

##### 方法2: redcarpet

在_config.yml里面配置如下:

markdown: redcarpet
redcarpet:
    extensions: ["fenced_code_blocks", "autolink", "tables", "strikethrough"]

然后在你的主题的default.html模版文件里面增加代码高亮的css这样就可以用

```javascript
var s = "JavaScript syntax highlighting";
alert(s);
```

##### 方法3: Pygments

Pygments是基于Python的代码高亮工具, 参考<http://zyzhang.github.io/blog/2012/08/31/highlight-with-Jekyll-and-Pygments/>, 用法如下:

<pre>
&#123;% highlight language %}
code here
&#123;% endhighlight %}
</pre>

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

#### 使用哪一个markdown引擎?

Github Pages支持下面几种markdown engine:

* Maruku: 早期的默认引擎, 已经很久没有更新了
* Redcarpet: C实现, 
* Rdiscount: C实现, supports a superset of Markdown.
* kramdown(default): 目前的默认引擎

Github Pages上个引擎的版本参考 <https://pages.github.com/versions>