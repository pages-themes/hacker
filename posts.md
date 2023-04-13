# Blog Posts

{% for category in site.categories %}
  <h3>{{ category[0] }}</h3>
  <ul>
    {% for post in category[1] %}
      <li><a href="{{ post.url }}">{{ post.title }}</a></li>
          <blockquote><p>{{ post.excerpt }}</p></blockquote>
    {% endfor %}
  </ul>
{% endfor %}
