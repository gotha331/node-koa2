const bcrypt = require('bcryptjs')

const { getUserInfo } = require('../service/user.service')
const {
  userFormateError,
  userAlreadyExited,
  userRegisterError,
  userDoseNotExist,
  userLoginError,
  invalidPassword
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

// 登陆校验
const verifyLogin = async (ctx, next) => {
  const { username, password } = ctx.request.body

  try {
    const res = await getUserInfo({ username })

    // 1.判断用户是否存在(不存在: 报错)
    if (!res) {
      console.error('用户不存在', { username })
      ctx.app.emit('error', userDoseNotExist, ctx)
      return
    }

    // 2.密码是否匹配(不匹配: 报错)
    if (!bcrypt.compareSync(password, res.password)) {
      console.error('密码不匹配', { username })
      ctx.app.emit('error', invalidPassword, ctx)
    }

    await next()
  } catch (error) {
    console.error(error)
    ctx.app.emit('error', userLoginError, ctx)
  }
}

module.exports = {
  userValidator,
  verifyUser,
  cryptPassword,
  verifyLogin
}
