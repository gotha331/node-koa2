const { getUserInfo } = require('../service/user.service')
const {
  userFormateError,
  userAlreadyExited,
  userRegisterError
} = require('../constant/err.type')

const userValidator = async (ctx, next) => {
  const { username, password } = ctx.request.body

  // 合法性
  if (!username || !password) {
    ctx.app.emit('error', userFormateError, ctx)
    return
  }

  await next()
}

const verifyUser = async (ctx, next) => {
  const { username } = ctx.request.body

  // 合理性
  try {
    if (await getUserInfo({ username })) {
      console.error('用户名已经存在', { username })
      ctx.app.emit('error', userAlreadyExited, ctx)
      return
    }
  } catch (error) {
    console.error('获取用户信息错误', error)
    ctx.app.emit('error', userRegisterError, ctx)
    return
  }

  await next()
}

module.exports = {
  userValidator,
  verifyUser
}
