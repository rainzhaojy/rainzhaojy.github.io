---
layout: post
title: GitHub Pages 常见问题
category: GitHub
---

常见问题与回答:

* 问题1: 使用 markdown or textile or html 写文档？
    * 不推荐html，markdown 和 textile 推荐 markdown，因为markdown支持auto link
* 问题2: nested list not work?
    * 按照mark-down语法，缩进4个空格可以实现二级列表，但使用默认markdown解析器maruku不work，换成rdiscount就可以了
* 问题3: categories 与 tags 有什么区别?
    * category只能有一个，tag可以有多个, <a href="http://stackoverflow.com/questions/8675841/whats-the-difference-between-categories-and-tags-in-jekyll">stackoverflow</a>上有人认为唯一区别就是blog生成的url不同
* 问题4: image link
    * 可以将图片放在目录 /assets/image/ 下或者目录 /image/ 下或者其他非\_开始的目录下，然后在blog里引用即可，image link语法为\!\[Alt text]\(/path/to/img.jpg)
* 问题5: auto link 语法是什么?
    * markdown支持auto link，格式为 &lt;url address>
* 问题6: git ignore 的用法？
    * 用法和.cvsignore类似，譬如我在项目根目录下创建文件 .gitignore 内容为 /_site, 这样每次提交和同步时就忽略 _site 目录了
* 问题7: 怎么给文章增加评论功能？
    * 国外的: <http://disqus.com>, 国内的: 评论啦、友言、多说、贝米
* 问题8: 怎么提供站内搜索？
    * 使用google的站内搜索: <http://www.google.com/cse>
* 问题9: RSS怎么实现？
    * ????
* 问题10: markdown里的link在新窗口里打开，有语法支持吗？
    * 好像没有办法
* 问题11: 搭建个人博客有哪些方案？
    * workpress
    * octopress
* 问题12: 文章在kekyll编译后会变成一个html，url形如"/category/year/month/date/post_name.html"，那么在某个post里要link另外一个post，url应该怎么写?也需要写这么长的url吗？
    * 博客地址为 &#123;% post_url 2013-03-08-setup_blog_on_github %}, 举例[blog on github]({% post_url 2013-03-08-setup_blog_on_github %})
* 问题13: 怎么实现页面计数器？
    * to be answered
* 问题14: 怎么输出表格？
    * markdown并没有表格语法，可以直接写html，可以利用ink的CSS，参考 <http://ink.sapo.pt/index.php/tables>
* 问题15: 怎么输出table of contents?
    * 使用javascript: <http://www.kryogenix.org/code/browser/generated-toc>, <http://projects.jga.me/toc>