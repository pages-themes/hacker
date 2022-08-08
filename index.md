# Minerva-007

Hi there! Enjoy some posts!

## Mechanical engg posts
{% for category in site.categories %}
  <h3>{{ category[0] }}</h3>
  <ul>
    {% for post in category[1] %}
      <li><a href="{{ post.url }}">{{ post.title }}</a></li>
      {{ post.excerpt }}
    {% endfor %}
  </ul>
{% endfor %}

[About me](https://minerva-007.github.io/about)
```
But in this world of infinite choices,
what will it take just to find that special day?
- Monika
```