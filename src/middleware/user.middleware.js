const bcrypt = require('bcryptjs')

const { getUserInfo } = require('../service/user.service')
const {
  userFormateError,
  userAlreadyExited,
  userRegisterError
} = require('../constant/err.type')

// 校验输入的用户名或密码是否为空
const userValidator = async (ctx, next) => {
  const { username, password } = ctx.request.body

  // 合法性
  if (!username || !password) {
    ctx.app.emit('error', userFormateError, ctx)
    return
  }

  await next()
}

// 注册时：校验用户名是否已经存在
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

// 密码加密
const cryptPassword = async (ctx, next) => {
  const { password } = ctx.request.body

  const salt = bcrypt.genSaltSync(10)
  //hash 保存的是密文
  const hash = bcrypt.hashSync(password, salt)

  ctx.request.body.password = hash

  await next()
}

module.exports = {
  userValidator,
  verifyUser,
  cryptPassword
}
