const { createUser } = require('../service/user.service')

class UserController {
  async register(ctx, next) {
    console.log(ctx)
    console.log(ctx.request.body)

    const { username, password } = ctx.request.body

    //操作数据库
    const res = await createUser(username, password)

    ctx.body = {
      code: '0000',
      msg: 'success',
      data: res
    }
  }

  async login(ctx, next) {
    ctx.body = '用户登录成功'
  }
}

module.exports = new UserController()
