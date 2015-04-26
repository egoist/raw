var fs = require('fs'),
    marked = require('marked'),
    yaml = require('js-yaml'),
    mkdirp = require('mkdirp'),
    swig = require('swig')

var dir = __dirname + '/_posts/',
    encoding = 'utf-8',
    api_posts = __dirname + '/api/',
    index = {config: {}, posts: []}

mkdirp.sync(api_posts)
var config = yaml.load(fs.readFileSync('config.yaml', encoding))

fs.readdir(dir, function (err, files) {
  var ord = 0
  files.forEach(function(file) {
    var file_content = fs.readFileSync(dir + file, encoding)
    var meta = yaml.load(file_content.split('---')[0])
    index.posts.push({
      ord: ord,
      title: meta.title
    })
    var post = {
      ord: ord,
      title: meta.title,
      content: marked(file_content.split('---')[1])
    }
    post = JSON.stringify(post, null, 4)
    fs.writeFileSync(api_posts + ord + '.json', post, encoding)
    if(files.length = ord + 1){
      tpl = swig.compileFile(__dirname + '/' + config.theme + '.swig')
      var date = new Date
      config.build = date.getTime()
      index.config = config
      var json = JSON.stringify(index, null, 4)
      fs.writeFileSync(api_posts + 'index.json', json, encoding)
      fs.writeFileSync(__dirname + '/index.html', tpl(index), encoding)
      return
    }
    ord++
  })
})