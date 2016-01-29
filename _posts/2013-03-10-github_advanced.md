---
layout: post
title: 使用GitHub搭建个人博客(2)进阶设定
tag: github
---

经过上一篇的介绍，我们已经在GitHub上搭建了一个最简单的blog，接下来我们介绍一些进阶设定。

### 搭建本机jekyll环境

你可以不在本机安装jekyll，但为了在上传文件到GitHub前能在本地看一下效果，强烈建议你在本机安装jekyll。个人体会，因为jekyll只支持UTF8编码，我从原来的wiki里copy文档时常有编码不对的问题导致jekyll编译失败，另外我自己写了一个template，需要时时看到效果，因此，本地的jekyll环境对我是非常重要的。

详细的安装步骤可以参考 <http://jekyllrb.com/docs/installation/> 或者网上找一些教程.下面是在Mac上安装本机jekyll环境的大概步骤:

1. install Xcode - jekyll可能会依赖xcode某些组件, 因此建议先安装Xcode和Xcode command line tools
2. install Ruby (可选) - Jekyll是基于ruby的, 所以需要有ruby环境. Mac自带了一个Ruby, 因此这一步可以省略, 但如果想安装最新版本的ruby, 步骤如下:
    1. 安装RVM - 用Ruby Version Manager(RVM)管理多个版本的Ruby
    2. 安装最新版本的ruby
    3. 安装RubyGems (可选) - Ruby的包管理器, Ruby1.9.1 以后的版本自带RubyGems
3. install jekyll - 使用RubyGems安装Jekyll: `gem install jekyll`

参考:

* <http://jekyllrb.com/docs/home/> - jekyll官网文档
* <http://jekyllbootstrap.com/lessons/jekyll-introduction.html> - jekyll bootstrap

### 绑定域名

你可以不绑定域名, user pages可以通过域名`http(s)://username.github.io`访问, project page可以通过域名`http(s)://username.github.io/projectname`访问.

但如果你有自己的域名, 那么可以绑定域名, 请参考 <https://help.github.com/articles/setting-up-a-custom-domain-with-pages>

譬如我的博客, github提供的地址为<http://rainzhaojy.github.io>, 但我绑定了自己的博客域名: <http://rainzhao.com>

### Custom 404 page