---
layout: post
title: 使用GitHub搭建个人博客(1)创建一个最简单的blog
category: GitHub
---

GitHub允许大家在GitHub上创建自己的博客网站或主页，而且免费，不限流量，还可以绑定自己的域名，因此利用GitHub搭建个人主页是个不错的选择。缺点是GitHub在国外，有时可能会慢一点，另外有一些技术门槛，但对于研发人员应该问题不大。

网上有很多使用GitHub搭建个人博客的文章，使用google搜索"github 博客"可以找到很多相应的介绍，我的工作机为Mac OS X 10.8，本文主要是从我的角度介绍最基本的入门几步。

#### What is Git?

Git是一个分布式源代码版本控制管理软件，类似的源码管理软件有CVS, Subversion等，Git由Linux大牛Linus Torvalds创立，目前被广泛用于open source项目的管理。Git相比svn有如下一些非常好的优点:

* Git提供了本地代码库，用户可以先在本地开发代码并提交到本地代码库，等到修改完成时再与远程代码库同步，因此降低了网络需求
* Git的fork and pull模式方便了code review, SVN并不自带code review功能，如果需要做code review，通常需要一个第三方软件来做，譬如用code collaborator，利用Git的fork and pull很容易做，因此Git非常适合管理Open Source项目，contributor可以将自己的改动送给project owner，由project owner review后merge到Git repo里

关于Git的详细介绍请参考:

* <http://git-scm.com/book> - Git英文版手册，非常好的文档
* <http://www.progit.org/book/zh> - Git中文版手册，是上面英文版的翻译

#### 在Mac上安装Git

按照<http://git-scm.com/book/en/Getting-Started-Installing-Git>的说明，下载了Git OS X installer，我下载的是 <mark>git-1.8.1.3-intel-universal-snow-leopard.dmg</mark>, 双击dmg文件后按照提示一步步next即可安装成功.

接下来需要做 first-time git setup，<http://git-scm.com/book/en/Getting-Started-First-Time-Git-Setup>有 git config 的详细说明.

#### GitHub

GitHub 是一个商业公司，提供源代码托管服务，使用Git实现版本控制。GitHub网站使用Ruby on Rails编写而成。GitHub同时提供付费账户和为开源项目提供的免费账户，免费帐户托管的项目都是public的，目前非常多的open source项目都托管在GitHub。

GitHub 号称是程序员的Facebook，不仅为程序员提供了免费源代码托管空间，还为程序员提供了一个社交平台，在GitHub有多种和别人的互动方式，可以fork别人的项目后提交pull request贡献自己的代码，可以watch某个人或某个项目，等等。

* <http://www.yangzhiping.com/tech/github.html> - 如果高效利用GitHub，整理了一些很有用的文章

GitHub帐号可以免费注册，因此，just feel free to register your GitHub account!

#### GitHub Pages

GitHub上托管的每个项目都有一个主页，列出项目的源文件，可读性不太好，因此，github就设计了Pages功能，允许用户自定义项目首页，用来替代默认的源码列表。所以，github Pages可以被认为是用户编写的、托管在github上的静态网页。下面是GitHub Pages 官方文档:

* <https://pages.github.com/>
* <http://help.github.com/pages>

GitHub提供两种类型的主页(<https://help.github.com/articles/user-organization-and-project-pages>):

* 个人或组织主页 - 页面内容位于 master 下
* 项目主页 - 页面内容位于 branch gh-pages 分支下，我们一般创建的都是项目主页

举例说明一下user pages与project pages的区别, 以我的github帐号rainzhaojy为例, 如果以user pages方式创建个人网站, 需要创建一个名为`rainzhaojy.github.io`的repo, 然后在主干上(master)提交我的个人网站的页面, 这样可以通过网址 `http(s)://rainzhaojy.github.io` 来访问我的个人网站.

如果以project pages的方式创建个人网站, 可以创建一个任意名字的repo(譬如rain-site), 然后将我的个人网站的页面提交到分支gh-pages下, 这样可以通过网址 `http(s)://rainzhaojy.github.io/rain-site` 来访问我的个人网站.

user pages只有一个, project pages可以有多个, 对于个人博客而言, 两种方式都可以.

如果用户申请了自己的域名, 还可以使用CNAME文件自定义domain name, 这样访问你的域名就自动访问到github上的页面. 用户也可以自定义404页面.

w3c的spec就利用了github的版本管理和协作功能来多人协作完成spec, 并且利用了github pages功能来发布spec, w3c在github上的用户名就是`w3c`, 使用user pages功能定义了如何使用github来写规范, 参见<http://w3c.github.io>, 每一个具体的规范对应一个单独的repo, 譬如webrtc规范Media Capture, 对应的github repo为`mediacapture-main`: <https://github.com/w3c/mediacapture-main>, 具体规范在分支 gh-pages 下, 用户可以通过地址 <http://w3c.github.io/mediacapture-main> 访问到对应的规范页面.

GitHub Pages支持Jekyll，用户push到GitHub库的静态页面都会经过Jekyll模板引擎的处理。

#### What is Jekyll?

jekyll基于Ruby，是一种静态页面转换引擎，是模板引擎liquid的扩展。jekyll的文档: 

* <http://jekyllbootstrap.com/lessons/jekyll-introduction.html> - jekyll介绍，页面里有一些有用的文档link
* <http://jekyllbootstrap.com/api/jekyll-liquid-api.html> - liquid介绍，jekyll对liquid的扩展

与asp、jsp、php等动态页面语言不同的是，jekyll对模板的解析仅仅只有一次，它的目标就是将模板一次性的转化成静态网站。解析完后，所有静态页面都位于 '\_site' 目录下，用户访问的每个页面都对应一个html page.

#### 创建一个简单的blog

到目前为止，假设你已经完成了下面两步:

* 在本机安装了Git
* 注册了GitHub帐户

接下来通过简单几步创建一个最简单的blog。

##### 第一步，创建项目

有两种方式创建一个项目:

1. 在<http://github.com>页面上创建一个repository，然后clone到本地
2. 在本地创建一个repository，然后push到GitHub上

如果使用方式1，则执行如下命令将远程repo同步到本地:

<pre class="prettyprint">
    $ git clone git://github.com/schacon/grit.git
</pre>

本文使用方式2，在你的电脑上，建立一个目录，作为项目的主目录。我们假定，它的名称为jekyll_demo, 打开 terminal, 进入目录 jekyll_demo 下，运行下面的命令对该目录进行git初始化:

<pre class="prettyprint">
    $ git init
</pre>
    
该命令实际上是在该目录下初始化一个本地的仓库，会在目录下新建一个.git的隐藏文件夹，可以看成是一个仓库数据库。
    
然后，创建一个没有父节点的分支gh-pages。因为github规定，只有该分支中的页面，才会生成网页文件。

<pre class="prettyprint">
    $ git checkout --orphan gh-pages
</pre>

以下所有动作，都在该分支下完成.

##### 第二步，创建如下文件和文件夹

在jekyll_demo目录下创建如下文件和文件夹:

<pre class="prettyprint">
    jekyll_demo
        |- _layouts       用于存放模板文件的目录
        |- _posts         用于存放blog文章的目录
        |- _config.yml    jelyll的配置文件
</pre>

'_config.yml'是jekyll的设置文件，具体解释参考 <https://github.com/mojombo/jekyll/wiki/Configuration>

##### 第三步，创建模板文件

在_layouts目录下创建一个default.html，在其中输入如下内容（注意：文件本身要以UTF-8 without BOM的格式保存）:

<pre class="prettyprint">
    &lt;!DOCTYPE html>
    &lt;html>
    &lt;head>
      &lt;meta http-equiv="content-type" content="text/html; charset=utf-8" />
      &lt;title>&#123;&#123; page.title }}&lt;/title>
    &lt;/head>
    &lt;body>
      &#123;&#123; content }}
    &lt;/body>
    &lt;/html>
</pre>

目录结构变为:

<pre class="prettyprint">
    jekyll_demo
        |- _layouts
              |- default.html
        |- _posts
        |- _config.yml
</pre>

##### 第四步，创建第一个blog

进入 '_posts' 目录，创建第一篇文章。文章就是普通的文本文件，文件名假定为2013-03-09-hello-world.md(注意，文件名必须为"年-月-日-文章标题.后缀名"的格式)。Jekyll支持 md, textile, html等格式，Markdown语法参考 <http://daringfireball.net/projects/markdown/syntax>，文件内容如下:

<pre class="prettyprint">
    ---
    layout: default
    title: 你好，世界
    ---
　　
    Hello, this is my first post
</pre>

文件内容包括2部分，第一部分为 [YAML Front Matter](https://github.com/mojombo/jekyll/wiki/YAML-Front-Matter), 第二部分是内容，内容会出现在第三步里 \{\{content}} 的位置。

目录结构变成:

<pre class="prettyprint">
    jekyll_demo
        |- _layouts
              |- default.html
        |- _posts
              |- 2013-03-09-hello-world.md
        |- _config.yml
</pre>

##### 第五步，创建首页

回到根目录jekyll_demo，创建一个index.html文件，填入以下内容:

<pre class="prettyprint">
    ---
    layout: default
    title: My Blog
    ---
    &lt;h2>文章列表&lt;/h2>
    &lt;ul>
        &#123;% for post in site.posts %}
            &lt;li>&#123;&#123; post.date | date:"%Y-%m-%d" }} &lt;a href="&#123;&#123; post.url }}">&#123;&#123; post.title }}&lt;/a>&lt;/li>
        &#123;% endfor %}
    &lt;/ul>
</pre>

它的Yaml文件头表示，首页使用default模板，标题为"My Blog"。然后，对所有帖子进行一个遍历。

目录结构变成:

<pre class="prettyprint">
    jekyll_demo
        |- _layouts
              |- default.html
        |- _posts
              |- 2013-03-09-hello-world.md
        |- _config.yml
        |- index.html
</pre>

##### 第六步，发布内容到GitHub

现在，这个简单的Blog就可以发布到GitHub了。先把所有内容加入本地git库。

<pre class="prettyprint">
    $ git add .
    $ git commit -m "first post"
</pre>

然后，将本地内容推送到github上。注意，下面命令中的username，要替换成你的username。

<pre class="prettyprint">
    $ git remote add origin https://github.com/username/jekyll_demo.git
    $ git push origin gh-pages
</pre>

上传成功之后，等10分钟左右，访问http://username.github.com/jekyll_demo/就可以看到Blog已经生成了（将username换成你的用户名）

更多资料:

* <http://www.yangzhiping.com/tech/github.html> - 如果高效利用GitHub，整理了一些很有用的文章
* <http://help.github.com/pages>