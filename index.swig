<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>{{ config.sitename }}</title>
  <meta name="description" content="{{ config.description }}">
  <link rel="stylesheet" href="assets/css/markdown.css">
  <link rel="stylesheet" href="assets/css/style.css?v={{ config.build }}">
</head>
<body>
<div class="wrap">
  <header class="header">
    <h1><a href="#!home">{{ config.sitename }}</a></h1>
    <h2 class="slogan">{{ config.description }}</h2>
  </header>
  <div class="main">
    <div class="posts" id="posts"><div class="loading">loading...</div></div>
  </div>
</div>

{% raw %}
<script id="posts-template" type="x-tmpl-mustache">
  {{#posts}}
    <div class="post"><h2 class="post-title"><a href="#!{{ord}}">{{ title }}</a></h2></div>
  {{/posts}}
</script>

<script id="post-template" type="x-tmpl-mustache">
  <div class="post-header">
    <h2 class="post-title">{{ title }}</h2>
  </div>
  <div class="post-content markdown-body">{{{ content }}}</div>
</script>
{% endraw %}

<script src="assets/js/jquery.min.js"></script>
<script src="assets/js/mustache.min.js"></script>
<script src="assets/js/q.min.js"></script>
<script src="assets/js/app.js?v={{ config.build }}"></script>
</body>
</html>