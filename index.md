---
layout: default
title: Welcome
whereami: index
---

#### 欢迎访问我的个人站点

好记性不如烂笔头, 曾经使用和学习过很多技术, 但在长时间不使用后, 很多东西就忘掉了, 因此使用wiki/blog来记录一些学习笔记.

---

#### 文章列表:

<div class="post-list-body">
    <div post-cate="All">
        <ul>
            {% for post in site.posts %}
            <li>{{ post.date | date:"%Y-%m-%d" }} <a href="{{ post.url }}"> {{ post.title }}</a></li>
            {% endfor %}
        </ul>
    </div>
    {% for tag in site.tags %}
      <div post-cate="{{tag | first}}">
        <ul>
        {% for posts in tag  %}
          {% for post in posts %}
            {% if post.url %}
              <li>{{ post.date | date:"%Y-%m-%d" }} <a href="{{ post.url }}"> {{ post.title }}</a></li>
            {% endif %}
          {% endfor %}
        {% endfor %}
        </ul>
      </div>
    {% endfor %}
</div>