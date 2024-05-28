const Koa = require('koa')
const { koaBody } = require('koa-body')
const errHandler = require('./errHandler')

const router = require('../router')

const app = new Koa()

app.use(koaBody())
app.use(router.routes()).use(router.allowedMethods())

// 统一的错误处理
app.on('error', (err, ctx) => {
  errHandler(err, ctx)
})

module.exports = app
