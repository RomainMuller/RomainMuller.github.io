---
---
{% for post in site.posts limit: 5 %}
<div class="card">
  <h5 class="card-header card-title">
    {{ post.title }}
    <a href="{{ post.url }}" class="float-right">
      <img src="{{root_url}}/assets/svg/octicons/link.svg" alt="Permalink" />
    </a>
  </h5>
  <div class="card-body">
    {{ post.content }}
  </div>
</div>
{% endfor %}
