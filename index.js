

var app = require('koa')()
var body = require('koa-better-body')
var router = require('koa-router')()

var serve = require('koa-static');

var fs = require('fs');

router.post('/upload', body(), function * (next) {
  // console.log(this.request.files[0].path)
  // console.log(this.request.fields)
  // console.log(this.request.files.path)
  // there's no `.body` when `multipart`,
  // `urlencoded` or `json` request
  // console.log(this.request.body)


    fs.rename(this.request.files[0].path, './upload/ss.png', 
        function (err) {
            console.log(err)
          if (err) {
              if (err.code === 'EXDEV') {
                  copy_and_delete();
              } else {
                  callback(err);
              }
              return;// << both cases (err/copy_and_delete)
          }
          // yield next
          // callback();
        }
    );
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
app.listen(4292)

var format = require('util').format
var host = 'http://localhost:4292'
var cmd = 'curl -i %s/upload -F "source=@%s/.editorconfig"'

// console.log('Try it out with below CURL for `koa-better-body` repository.')
// console.log(format(cmd, host, __dirname))