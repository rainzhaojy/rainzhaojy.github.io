---
layout: post
title: 在OS X 10.9和Xcode 5.1上搭建jekyll环境
category: GitHub
---

最近换了一台Macbook Pro,系统为OS X Mavericks(10.9.2),搭建本机jekyll环境时步骤和遇到的问题都和上一篇10.8时有所不同，因此重新整理了相关步骤，下面就是我安装本机jekyll环境的步骤，仍然采用RVM（Ruby Version Manager）方式安装。

OS X 10.9系统自带了一些工具,在App Store下载安装了Xcode 5.1后,下面几个工具都已经在了:

* git 1.8.5.2
* RubyGems 2.0.3
* ruby 2.0.0p247

##### 0. Download site pages

我在github已经有repo和一些page了，因此使用git clone下载到本地:

<pre class="prettyprint">
    $ git clone https://github.com/rainzhaojy/rain-site.git
</pre>

本文接下来介绍如何搭建本机jekyll环境.

##### 1. install Command Line Tools

10.9里不再通过Xcode菜单安装Command Line Tools了,需要在terminal里执行如下命令

<pre class="prettyprint">
    $ xcode-select --install
</pre>

接下来会弹出一个对话框让你安装Command Line Tools,选择安装即可.

##### 2. 升级ruby版本

系统自己的ruby版本有点问题，使用命令”gem install jekyll”安装jekyll时会遇到如下问题:

问题参考 <https://github.com/jekyll/jekyll/issues/2147>

解决的办法就是要升级ruby, ruby 2.1.1是本文安装时的最新版本，因此决定安装ruby 2.1.1，直接使用命令”rvm install ruby”升级ruby时会遇到如下问题:

问题参考 <https://github.com/wayneeseguin/rvm/issues/2706>

解决的办法是安装homebrew，所以，在安装jekyll之前要做两个工作:

1. install homebrew
2. upgrade ruby

###### Step 1. install homebrew

参考homebrew首页<http://brew.sh>的介绍:

<pre class="prettyprint">
    $ sudo gem update --system      //optional: upgrade RubyGems to 2.2.2
    $ ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)"
    $ brew doctor
</pre>

###### Step 2. upgrade ruby to 2.1.1

<pre class="prettyprint">
    $ rvm install 2.1.1
</pre>

##### 3. install jekyll

运行下面的命令即可安装jekyll:

<pre class="prettyprint">
    $ gem install jekyll
</pre>

##### 4. have a try

* go to the dir “$ cd rain-site”
* run "$ jekyll serve"
* type <http://localhost:4000> in your browser
