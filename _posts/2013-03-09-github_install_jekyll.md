---
layout: post
title: 使用GitHub搭建个人博客(2)在本机搭建jekyll环境
category: GitHub
---

你可以不在本机安装jekyll，但为了在上传文件到GitHub前能在本地看一下效果，强烈建议你在本机安装jekyll。个人体会，因为jekyll只支持UTF8编码，我从原来的wiki里copy文档时常有编码不对的问题导致jekyll编译失败，另外我对jekyll语法不熟悉，常会写错，还有，我是自己写了一个template，因此也需要时时看到效果，因此，本地的jekyll环境对我是非常重要的。

下面是在我的Mac OS X 10.8上安装本机jekyll环境的步骤，采用的RVM（Ruby Version Manager）方式安装。

##### 1. install Ruby

Jekyll是基于ruby的，因此需要先安装ruby。Mac自带了一个Ruby，但版本较老，因此需要安装一个较新版本的ruby.

###### Step 1 - 安装Xcode

Xcode是apple推出的IDE，可以在 mac app store里下载安装

###### Step 2 - 安装Command Line Tools

在菜单栏中选择Xcode -> Preference -> Download，然后点击Command Line Tools对应的install即可

###### Step 3 - 确认Git已经安装

在前一片博客里已经介绍[怎么安装git](http://git-scm.com/book/en/Getting-Started-Installing-Git)了，这里可以用下面的命令确认一下git已经安装

<pre class="prettyprint">
    $ git --version
    git version 1.7.12.4 (Apple Git-37)
</pre>

上面的输出说明git已经安装了。

###### Step 4 - 安装RVM

<pre class="prettyprint">
$ bash -s stable &lt; &lt;(curl -s https://raw.github.com/wayneeseguin/rvm/master/binscripts/rvm-installer)
或者
$ bash &lt; &lt;( curl -s https://rvm.beginrescueend.com/install/rvm )
</pre>

接着需要配置RVM快捷命令，将脚本插入到.bash_profile中, 否则你无法在终端里直接使用rvm命令：

<pre class="prettyprint">
$ echo '[[ -s "$HOME/.rvm/scripts/rvm" ]] &amp;&amp; . "$HOME/.rvm/scripts/rvm" ' >> ~/.bash_profile
</pre>

然后运行：

<pre class="prettyprint">
$ source ~/.bash_profile
</pre>

或者是直接重启Terminal，然后可以输入如下命令进行验证：

<pre class="prettyprint">
$ type rvm | head -1
rvm is a function
</pre>

上面的输出证明rvm命令配置成功了。

###### Step 5 - 安装ruby

<pre class="prettyprint">
    $ rvm install 1.9.3
</pre>

然后提示下面的错误:

<pre class="prettyprint">
Error running 'make', please read /Users/rainz/.rvm/log/ruby-1.9.3-p392/make.log
There has been an error while running make. Halting the installation.

st.c:520:35: error: implicit conversion loses integer precision: 'st_index_t' (aka 'unsigned long') to 'int'
</pre>

根据stackoverflow的建议执行下面的命令

<pre class="prettyprint">
    $ export CC=gcc
</pre>

继续运行 rvm install 1.9.3 可以成功安装ruby

##### 2. install jekyll

运行下面的命令即可安装jekyll:

<pre class="prettyprint">
    $ gem install jekyll
</pre>

##### 3. have a try

* go to the dir ".../jekyll_demo"
* run "$ jekyll &#45;&#45;server"
* type http://localhost:4000/index.html in your browser

##### 更多资料

* <http://www.hoowolf.net/2012/03/29/installing-ruby-on-rails-on-mac-os-x-lion>
* <http://equation85.github.com/blog/install-jekyll-on-mac>
* [jekyll wiki on github](https://github.com/mojombo/jekyll/wiki/Install)
* <http://brandonbohling.com/2011/08/27/Installing-Jekyll-on-Mac>
* <http://jekyllbootstrap.com/lessons/jekyll-introduction.html> - jekyll官方文档，还包含了一些有用的link
* <http://jekyllbootstrap.com/api/jekyll-liquid-api.html> - jekyll对liquid的扩展
* [jekyll wiki](https://github.com/mojombo/jekyll/wiki/Usage) - jekyll wiki
* [jekyll configuration](https://github.com/mojombo/jekyll/wiki/Configuration) - \_config.yml配置项