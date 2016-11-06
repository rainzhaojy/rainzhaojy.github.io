---
layout: post
title: 使用GitHub搭建个人博客(1)创建一个最简单的blog
tag: github
---

GitHub允许大家在GitHub上创建自己的博客网站或主页，而且免费，不限流量，还可以绑定自己的域名，因此利用GitHub搭建个人主页是个不错的选择。缺点是GitHub在国外，有时可能会慢一点，另外有一些技术门槛，但对于研发人员应该问题不大。

### Install Git

Git是一个分布式源代码版本控制管理软件，类似的源码管理软件有CVS, Subversion等，目前被广泛用于open source项目的管理。入门请看:

* <http://git-scm.com/book> - Git英文版手册，非常好的文档
* <http://git-scm.com/book/zh> - Git中文版手册，是上面英文版的翻译

按照<http://git-scm.com/book/en/Getting-Started-Installing-Git>的说明，根据自己的电脑安装相应平台的git, 我是在mac上安装了git.

接下来需要做 first-time git setup，<http://git-scm.com/book/en/Getting-Started-First-Time-Git-Setup>有 git config 的详细说明.

### 注册GitHub账户

GitHub 是一个商业公司，提供源代码托管服务，使用Git实现版本控制。GitHub网站使用Ruby on Rails编写而成。GitHub同时提供付费账户和为开源项目提供的免费账户，免费帐户托管的项目都是public的，目前非常多的open source项目都托管在GitHub。

GitHub除了提供免费源代码托管空间，还为程序员提供了一个社交平台，在GitHub有多种和别人的互动方式，可以fork别人的项目后提交pull request贡献自己的代码，可以watch某个人或某个项目，等等。

GitHub帐号可以免费注册，因此，去免费注册一个账号吧.

### GitHub Pages

GitHub上托管的每个项目都有一个主页，列出项目的源文件，可读性不太好，因此，github就设计了Pages功能，允许用户自定义项目首页，用来替代默认的源码列表。所以，github Pages可以被认为是用户编写的、托管在github上的静态网页。下面是GitHub Pages 官方文档:

* <https://pages.github.com/>
* <http://help.github.com/pages>

GitHub提供两种类型的主页(<https://help.github.com/articles/user-organization-and-project-pages>):

* 个人或组织主页 - 页面内容位于 master 下
* 项目主页 - 页面内容位于 branch gh-pages 分支下

举例说明一下user pages与project pages的区别, 以我的github帐号rainzhaojy为例, 如果以user pages方式创建个人网站, 需要创建一个名为`rainzhaojy.github.io`的repo, 然后在主干上(master)提交我的个人网站的页面, 这样可以通过网址 `http(s)://rainzhaojy.github.io` 来访问我的个人网站.

如果以project pages的方式创建个人网站, 可以创建一个任意名字的repo(譬如rain-site), 然后将我的个人网站的页面提交到分支gh-pages下, 这样可以通过网址 `http(s)://rainzhaojy.github.io/rain-site` 来访问我的个人网站.

user pages只有一个, project pages可以有多个, 对于个人博客而言, 两种方式都可以.

如果用户申请了自己的域名, 还可以使用CNAME文件自定义domain name, 这样访问你的域名就自动访问到github上的页面. 用户也可以自定义404页面.

GitHub Pages支持Jekyll，用户push到GitHub库的静态页面都会经过Jekyll模板引擎的处理。jekyll基于Ruby，是一种静态页面转换引擎，是模板引擎liquid的扩展。jekyll的文档: 

* <http://jekyllbootstrap.com/lessons/jekyll-introduction.html> - jekyll介绍，页面里有一些有用的文档link
* <http://jekyllbootstrap.com/api/jekyll-liquid-api.html> - liquid介绍，jekyll对liquid的扩展

与asp、jsp、php等动态页面语言不同的是，jekyll对模板的解析仅仅只有一次，它的目标就是将模板一次性的转化成静态网站。解析完后，所有静态页面都位于 '\_site' 目录下，用户访问的每个页面都对应一个html page.

### 创建一个简单的blog

到目前为止，假设你已经完成了下面两步:

* 在本机安装了Git
* 注册了GitHub帐户

接下来通过简单几步创建一个最简单的blog, 本文以project pages为例.

#### 第一步，创建项目

有两种方式创建一个项目:

1. 在<http://github.com>页面上创建一个repository，然后clone到本地
2. 在本地创建一个repository，然后push到GitHub上

如果使用方式1，则先在github页面上创建一个repo, 然后执行如下命令将远程repo同步到本地:

```sh
    $ git clone https://github.com/username/jekyll_demo.git
```

然后，创建一个没有父节点的分支gh-pages。因为github规定，对于project pages, 只有该分支中的页面，才会生成网页文件。(请注意, user pages是在master上)

```sh
    $ git checkout --orphan gh-pages
```

接下来所有动作，都在分支gh-pages下完成.

#### 第二步，创建如下文件和文件夹

在jekyll_demo目录下创建如下文件和文件夹:

```
    jekyll_demo
        |- _layouts       用于存放模板文件的目录
        |- _posts         用于存放blog文章的目录
        |- _config.yml    jelyll的配置文件
```

'_config.yml'是jekyll的设置文件，具体解释参考 <https://github.com/mojombo/jekyll/wiki/Configuration>

#### 第三步，创建模板文件

在_layouts目录下创建一个default.html，在其中输入如下内容（注意：文件本身要以UTF-8 without BOM的格式保存）:

```html
    <!DOCTYPE html>
    <html>
    <head>
      <meta http-equiv="content-type" content="text/html; charset=utf-8" />
      <title>&#123;{ page.title }}</title>
    </head>
    <body>
      &#123;{ content }}
    </body>
    </html>
```

目录结构变为:

```
    jekyll_demo
        |- _layouts
              |- default.html
        |- _posts
        |- _config.yml
```

#### 第四步，创建第一个blog

进入 '_posts' 目录，创建第一篇文章。文章就是普通的文本文件，文件名假定为2013-03-09-hello-world.md(注意，文件名必须为"年-月-日-文章标题.后缀名"的格式)。Jekyll支持 md, textile, html等格式，这里使用markdown，文件内容如下:

```
    ---
    layout: default
    title: 你好，世界
    ---
　　
    Hello, this is my first post
```

文件内容包括2部分，第一部分为 [YAML Front Matter](https://github.com/mojombo/jekyll/wiki/YAML-Front-Matter), 第二部分是内容，内容会出现在第三步里 \{\{content}} 的位置。

目录结构变成:

```
    jekyll_demo
        |- _layouts
              |- default.html
        |- _posts
              |- 2013-03-09-hello-world.md
        |- _config.yml
```

#### 第五步，创建首页

回到根目录jekyll_demo，创建一个index.html文件，填入以下内容:

```html
    ---
    layout: default
    title: My Blog
    ---
    <h2>文章列表</h2>
    <ul>
        \{\% for post in site.posts %}
            <li>&#123;{ post.date | date:"%Y-%m-%d" }} <a href="&#123;{ post.url }}">&#123;{ post.title }}</a></li>
        &#123;% endfor %}
    </ul>
```

它的Yaml文件头表示，首页使用default模板，标题为"My Blog"。然后，对所有帖子进行一个遍历。

目录结构变成:

```
    jekyll_demo
        |- _layouts
              |- default.html
        |- _posts
              |- 2013-03-09-hello-world.md
        |- _config.yml
        |- index.html
```

#### 第六步，发布内容到GitHub

现在，这个简单的Blog就可以发布到GitHub了。先把所有内容加入本地git库。

```sh
    $ git add .
    $ git commit -m "first post"
```

然后，将本地内容推送到github上。注意，下面命令中的username，要替换成你的username。

```sh
    $ git remote add origin https://github.com/username/jekyll_demo.git
    $ git push origin gh-pages
```

上传成功之后，等几分钟，访问 http://username.github.com/jekyll_demo 就可以看到Blog已经生成了.
