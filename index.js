

var app = require('koa')()
var body = require('koa-better-body')
var router = require('koa-router')()

var serve = require('koa-static');

var fs = require('fs');
var moveFile = function(oldPath,newPath) {
  return function(fn) {
    fs.rename(oldPath, newPath,fn)
  }
}
router.options('/upload', function*(next){
  this.body=true
})
router.post('/upload', body(), function * (next) {
  // console.log(this.request.files[0].path)
  // console.log(this.request.fields)
  // console.log(this.request.files.path)
  // there's no `.body` when `multipart`,
  // `urlencoded` or `json` request
  // console.log(this.request.body)
    // console.log(this.request.files[0])
    var file = this.request.files[0]
    var obj = yield moveFile(file.path, './upload/'+file.name)
    this.body = {
      status:1,
      img_url:"http://localhost:3000/upload/"+file.name
    }
    // yield fs.rename(this.request.files[0].path, './upload/ss.png', 
    //     function (err) {
    //         console.log(err)
    //       if (err) {
    //           if (err.code === 'EXDEV') {
    //               copy_and_delete();
    //           } else {
    //               callback(err);
    //           }
    //           return;// << both cases (err/copy_and_delete)
    //       }
    //       // yield next
    //       // callback();
    //     }
    // );
  // print it to the API requester
  // this.body = JSON.stringify({
  //   fields: this.request.fields,
  //   files: this.request.files,
  //   body: this.request.body || null
  // }, null, 2)

  // yield next
})
app.use(serve('.'));
app.use(router.routes())
app.listen(3000)

var format = require('util').format
var host = 'http://localhost:4292'
var cmd = 'curl -i %s/upload -F "source=@%s/.editorconfig"'

// console.log('Try it out with below CURL for `koa-better-body` repository.')
// console.log(format(cmd, host, __dirname))