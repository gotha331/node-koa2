const path = require('path')

const Koa = require('koa')
const { koaBody } = require('koa-body')
const KoaStatic = require('koa-static')
const parameter = require('koa-parameter')

const errHandler = require('./errHandler')
const router = require('../router')

const app = new Koa()

app.use(
  koaBody({
    multipart: true,
    formidable: {
      // 在配置选项option里，不推荐使用相对路径
      // 在option里的相对路径，不是相对的当前文件，而是相对process.cwd()
      uploadDir: path.resolve(__dirname, '../upload'),
      keepExtensions: true
    },
    parsedMethods: ['POST', 'PUT', 'PATCH', 'DELETE']
  })
)

app.use(KoaStatic(path.resolve(__dirname, '../upload')))
app.use(parameter(app))

app.use(router.routes()).use(router.allowedMethods())

// 统一的错误处理
app.on('error', (err, ctx) => {
  errHandler(err, ctx)
})

module.exports = app
