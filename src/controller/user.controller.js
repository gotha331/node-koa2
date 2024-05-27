const { createUser } = require('../service/user.service')
const { userRegisterError } = require('../constant/err.type')

class UserController {
  async register(ctx, next) {
    // 1.获取数据
    const { username, password } = ctx.request.body

    // 2.操作数据库
    try {
      const res = await createUser(username, password)
      ctx.body = {
        code: 0,
        message: '用户注册成功',
        result: {
          id: res.id,
          username: res.username
        }
      }
    } catch (error) {
      console.log(error)
      ctx.app.emit('error', userRegisterError, ctx)
    }
  }

  async login(ctx, next) {
    ctx.body = '用户登录成功'
  }
}

module.exports = new UserController()
