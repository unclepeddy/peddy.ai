---
layout: base
title: Thoughts 
permalink: /meta
---

{% for thought in site.thoughts %}
  <div class='thought block'>
    <h2 class='thought title'><a href="{{thought.url}}">{{thought.title}}</a></h2>
  </div>
{% endfor %}
