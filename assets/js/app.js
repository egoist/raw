var index = '/api/index.json'
var loading = '<div class="loading">loading...</div>'

$(function() {


})

function render(tpl, data) {
  var template = $('#' + tpl + '-template').html()
  Mustache.parse(template)
  var rendered = Mustache.render(template, data)
  return rendered
}

Q.reg('home', function(){
  $('.posts').html(loading)
  $.get(index, function(data) {
    var posts_html = render('posts', {posts: data.posts})
    $('#posts').html(posts_html)
    $('title').html(data.config.sitename)
  })
});

Q.reg(/(\d+)/, function(ord) {
  $('.posts').html(loading)
  $.get('/api/' + ord + '.json',function (data) {
    var post_html = render('post', data)
    $('.posts').html(post_html)
    $('title').html(data.title)
  })
})

Q.init({
    index:'home'
});