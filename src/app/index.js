const Koa = require('koa')
const { koaBody } = require('koa-body')

const userRouter = require('../router/user.route')

const app = new Koa()

app.use(koaBody())
app.use(userRouter.routes()).use(userRouter.allowedMethods())

module.exports = app
