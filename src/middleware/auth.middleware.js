const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/config.default')
const {
  tokenExpiredError,
  invalidToken,
  hasNotAdminPermission
} = require('../constant/err.type')

/**
 * 验证token
 * @param {*} ctx
 * @param {*} next
 * @returns
 */
const auth = async (ctx, next) => {
  const { authorization } = ctx.request.header
  const token = authorization.replace('Bearer ', '')

  try {
    // user中包含了payload的信息(id,username,is_admin)
    const user = jwt.verify(token, JWT_SECRET)
    ctx.state.user = user
  } catch (error) {
    console.log(error)

    switch (error.name) {
      case 'TokenExpiredError':
        console.error('token已过期', error)
        return ctx.app.emit('error', tokenExpiredError, ctx)

      case 'JsonWebTokenError':
        console.error('无效的token', error)
        return ctx.app.emit('error', invalidToken, ctx)
    }
  }

  await next()
}

/**
 * 验证是否有管理员权限
 * @param {*} ctx
 * @param {*} next
 */
const hadAdminPermission = async (ctx, next) => {
  const { is_admin } = ctx.state.user.dataValues

  if (!is_admin) {
    console.error('该用户没有管理员权限', ctx.state.user.dataValues)
    return ctx.app.emit('error', hasNotAdminPermission, ctx)
  }

  await next()
}

module.exports = {
  auth,
  hadAdminPermission
}
