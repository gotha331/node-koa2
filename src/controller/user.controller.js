const { createUser, getUserInfo } = require('../service/user.service')

class UserController {
  async register(ctx, next) {
    // 1.获取数据
    const { username, password } = ctx.request.body

    // 合法性
    if (!username || !password) {
      console.error('用户名或密码为空', ctx.request.body)

      ctx.status = 400
      ctx.body = {
        code: '10001',
        message: '用户名或密码为空',
        result: ''
      }
      return
    }

    // 合理性
    if (await getUserInfo({ username })) {
      ctx.status = 409
      ctx.body = {
        code: '10002',
        message: '用户已存在',
        result: ''
      }
      return
    }

    // 2.操作数据库
    const res = await createUser(username, password)

    ctx.body = {
      code: 0,
      message: '用户注册成功',
      result: {
        id: res.id,
        username: res.username
      }
    }
  }

  async login(ctx, next) {
    ctx.body = '用户登录成功'
  }
}

module.exports = new UserController()
