---
layout: post
title: 使用GitHub搭建个人博客(4)常见问题与回答
tag: GitHub
---

##### 1. markdown, textile, html应该选择哪个格式写文档？

不推荐html，markdown 和 textile 推荐 markdown，因为markdown支持auto link

##### 2. nested list not work?

按照mark-down语法，缩进4个空格可以实现二级列表，但使用默认markdown解析器maruku不work，换成rdiscount或者redcarpet就可以了, 在\_config.yml文件里加上配置项: `markdown: rdiscount`

##### 3. categories 与 tags 有什么区别?

category与tag都可以有多个, 两者的一个区别就是blog生成的url不同 (其实url也可以通过permalink修改), 另外tag好像是大小写敏感的

##### 4: 博客里怎么链接图片?

可以将图片放在目录 `/img` 下或者其他非\_开始的目录下，然后在blog里引用即可，image link语法为\!\[Alt text]\(/path/to/img.jpg)

##### 5: auto link 语法是什么?

markdown支持auto link，rdiscount的格式为 `<url address>`, redcarpet直接写URL就会生成link

##### 6: 怎么给文章增加评论功能？

国外的: <http://disqus.com>, 国内的: 评论啦、友言、多说、贝米

##### 7: 怎么提供站内搜索？

使用google的站内搜索: <http://www.google.com/cse>

##### 8: RSS怎么实现？

to be answered

##### 9: 让博客里的link在新窗口里打开，有语法支持吗？

好像没有办法

##### 10: Internal link

文章在kekyll编译后会变成一个html，url形如"/category/year/month/date/post_name.html", 那么在某个博客里要link另外一个post，url应该怎么写?也需要写这么长的url吗？

博客地址为 <mark>&#123;% post_url 2013-03-08-setup_blog_on_github %}</mark>, 举例\[blog on github]\(&#123;% post_url 2013-03-08-setup_blog_on_github %}), 显示为[blog on github]({% post_url 2013-03-08-setup_blog_on_github %})

##### 11: 怎么输出表格？

基本的markdown并没有表格语法，如果要输出表格, 可以直接写html，也可以使用支持表格语法的markdown engine, 譬如redcarpet

##### 12: 怎么输出table of contents?

使用javascript: <http://www.kryogenix.org/code/browser/generated-toc>, <http://projects.jga.me/toc>, <http://ndabas.github.io/toc/> (本站使用这个)

##### 13. last modified date

使用插件<https://github.com/gjtorikian/jekyll-last-modified-at>