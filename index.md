---
layout: default
title: Welcome
whereami: index
---

<h5>欢迎访问我的个人站点</h5>
<p>
好记性不如烂笔头，曾经使用和学习过很多技术，包括Web开发, 桌面开发(C++, COM, Windows等), 移动开发(Android, iPhone等），Server开发，等等，但在长时间不使用后，很多东西就忘掉了，因此使用这个网站记录日常工作中的知识点滴。
</p>

<hr>

<h5>文章列表:</h5>

<div class="post-list-body">
    <div class="all-posts" post-cate="All">
        <ul>
            {% for post in site.posts %}
            <li>{{ post.date | date:"%Y-%m-%d" }} <a href="{{ post.url }}"> {{ post.title }}</a></li>
            {% endfor %}
        </ul>
    </div>
    <!-- <div class="posts-in-categories"> -->
    {% for category in site.categories %}
      <div post-cate="{{category | first}}">
        <ul>
        {% for posts in category  %}
          {% for post in posts %}
            {% if post.url %}
              <li>{{ post.date | date:"%Y-%m-%d" }} <a href="{{ post.url }}"> {{ post.title }}</a></li>
            {% endif %}
          {% endfor %}
        {% endfor %}
        </ul>
      </div>
    {% endfor %}
    <!-- </div> -->
</div>