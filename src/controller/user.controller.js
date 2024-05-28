const jwt = require('jsonwebtoken')
const { createUser, getUserInfo } = require('../service/user.service')
const { userRegisterError } = require('../constant/err.type')
const { JWT_SECRET } = require('../config/config.default')

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
    const { username } = ctx.request.body
    ctx.body = `欢迎回来,${username}`

    // 1. 获取用户信息(在token的payload中，记录id,username,is_admin)
    try {
      const { password, ...res } = await getUserInfo({ username })

      ctx.body = {
        code: '0',
        message: '用户登录成功',
        result: {
          token: jwt.sign(res, JWT_SECRET, { expiresIn: '1d' })
        }
      }
    } catch (error) {
      console.error('用户登录失败', error)
    }
  }
}

module.exports = new UserController()
