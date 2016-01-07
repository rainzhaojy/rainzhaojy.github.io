---
layout: post
title: svn常用命令简介
category: misc
---

### vss, cvs, svn的区别

* vss - 版本模型为 lock-modify-unlock, 缺点是团队工作效率较低
* cvs - 版本模型为 copy-modify-merge
* svn - 兼容两种版本模型，被设计为cvs的替代者,支持目录版本化

### 常用命令

使用svn时，一个常见的工作流程如下:

<pre class="prettyprint">
# 0. Check out a working copy from repo
$ svn co     # svn checkout

# 1. Update your working copy from repo
$ svn update

# 2. Make changes
$ svn add foo       # 将文件或目录foo添加到版本库
$ svn delete foo    # 删除文件或目录foo
$ svn copy foo bar  # 复制文件或目录foo为bar, copy命令也用于创建branch和tag
$ svn move foo bar  # 等同于svn copy foo bar; svn delete foo
$ svn mkdir foo     # 等同于mkdir foo; svn add foo

# 3. Examine your changes. 
$ svn status        #检查working copy修改情况，无需网络访问
$ svn diff

# 4. Possibly undo some changes. 
$ svn revert README   # 取消本地修改

# 5. Resolve conflicts (merge others' changes). 
$ svn update
$ svn resolve

# 6. Commit your changes
$ svn ci     # svn commit
</pre>

### 查看历史版本信息

svn repo就像一个时间机器，记录了每一次提交和每一个时间点的代码，使用下面几个命令可以查看 svn repo 的各种历史信息:

<pre class="prettyprint">
$ svn log    # 显示各个版本的author/date/commit message等信息
$ svn diff   # 比较文件内容的diff
$ svn cat -r 2 rules.txt    # 显示版本2的内容
$ svn list http://svn.collab.net/repos/svn     # 显示repo列表
$ svn info README    #显示文件README的svn url, 版本等详细信息
</pre>

log命令显示整个repo，某个文件或某个目录的历史版本信息:

<pre class="prettyprint">
$ svn log

$ svn log -r 5:19      # 顺序显示版本5至版本19的各个版本信息
$ svn log -r 19:5      # 倒序显示版本5至版本19的各个版本信息
$ svn log -r 8         # 显示版本8的版本信息

$ svn log foo.c
$ svn log http://foo.com/svn/trunk/code/foo.c
</pre>

diff命令有3种比较用途:

<pre class="prettyprint">
$ svn diff                   # diff local changes
$ svn diff -r 3 rules.txt    # diff working copy with repo
$ svn diff -r 2:3 rules.txt  # diff repo revisions
</pre>

### 应用patch

利用patch可以实现同事之间相互code review:

<pre class="prettyprint">
# 1. 同事A生成patch
$ svn diff > aaa.diff    # 生成diff文件
$ svn diff > aaa.patch   # 生成patch文件

# 2. 同事B应用patch
$ patch –p0 < aaa.patch

# 3. 同事B review code后删除patch
$ patch –p0 -R < aaa.patch
</pre> 

### 属性svn:externals

利用属性svn:externals可以在某个版本库里链接其他版本库:

<pre class="prettyprint">
$ svn propset svn:externals “doc http://doc-svn/trunk”
</pre>

checkout后将会多一个doc目录，目录内容来自另一个repo

### 关键字替换

在文件开头的文件注释里通常会加上作者,时间等注释:

<pre class="prettyprint">
**
 * foo.cpp
 * Last modified on 2014-03-01
 * Last modified by Rain Zhao
 */
</pre>

这里的时间和作者需要每个人在修改这个文件时手工修改，比较低效也很容易忘记. svn提供了关键字替换功能，可以自动添加一些revision, author, date等信息，实现如下:

先将上面的注释改为:

<pre class="prettyprint">
**
 * foo.cpp
 * Last modified on $Date$
 * Last modified by $Author$
 */
</pre>

然后设置svn:keywords属性，如果没有设置svn:keywords属性则svn不会自动替换:

<pre class="prettyprint">
$ svn propset svn:keywords "Date Author" foo.cpp
</pre>

commit后再checkout，会发现$Date$和$Author$已经被自动替换了。

svn提供了5个关键字:

<table class="ink-table bordered hover">
  <thead>
    <tr><th>keyword</th><th>同义keyword</th><th>替换后输出</th></tr>
  </thead>
  <tbody>
    <tr><td> Date </td><td> LastChangedDate </td><td>$Date: 2006-07-22 21:42:37 -0700 (Sat, 22 Jul 2006) $</td></tr>
    <tr><td> Revision </td><td> LastChangedRevision, Rev </td><td>$Revision: 144 $</td></tr>
    <tr><td> Author </td><td> LastChangedBy </td><td>$Author: jiayzhao $</td></tr>
    <tr><td> HeadURL </td><td> URL </td><td>$HeadURL: http://svn.collab.net/repos/trunk/README $</td></tr>
    <tr><td> Id </td><td> </td><td>$Id: foo.cpp 148 2013-07-28 21:30:43Z jiayzhao $</td></tr>
  </tbody>
</table>

svn支持固定长度关键字，格式为<mark>“$Date::&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$“</mark>,这样svn只会替换关键字后面的空格部分.

### 其他命令

<pre class="prettyprint">
$ svn import      # 将某个目录导入到svn
$ svn export      # 将svn导出到本地，不带有svn信息

# 操作svn属性
$ svn propdel
$ svn propedit
$ svn propget
$ svn proplist
$ svn propset
</pre>