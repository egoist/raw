var fs = require('fs'),
    path = require('path'),
    marked = require('marked'),
    yaml = require('js-yaml'),
    mkdirp = require('mkdirp'),
    swig = require('swig')

require('node-slug').slug()

var dir = __dirname + '/_posts/',
    encoding = 'utf-8',
    api_posts = __dirname + '/api/',
    index = {config: {}, posts: []}

mkdirp.sync(api_posts)
var config = yaml.load(fs.readFileSync('config.yaml', encoding))

fs.readdir(dir, function (err, temp_files) {
  var files = []
  for(var i in temp_files) {
    var ext = path.extname(temp_files[i])
    if(ext == '.md' || ext == '.markdown'){
      files.push(temp_files[i])
    }
  }
  files.forEach(function(file, ord) {
    var file_content = fs.readFileSync(dir + file, encoding)
    var meta = yaml.load(file_content.split('---')[1])
    console.log('...' + meta.title)
    var slug = meta.title.slug()
    index.posts.push({
      ord: ord,
      title: meta.title,
      slug: slug
    })
    var post = {
      ord: ord,
      title: meta.title,
      slug: slug,
      content: marked(file_content.split('---')[2])
    }
    post = JSON.stringify(post, null, 4)
    fs.writeFileSync(api_posts + slug + '.json', post, encoding)
    if(files.length == ord + 1){
      tpl = swig.compileFile(__dirname + '/' + config.theme + '.swig')
      var date = new Date
      config.build = date.getTime()
      index.config = config
      var json = JSON.stringify(index, null, 4)
      fs.writeFileSync(api_posts + 'index.json', json, encoding)
      fs.writeFileSync(__dirname + '/index.html', tpl(index), encoding)
      return
    }
  })
})