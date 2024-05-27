const Router = require('koa-router')
const { register, login } = require('../controller/user.controller')
const {
  userValidator,
  verifyUser,
  verifyLogin,
  cryptPassword
} = require('../middleware/user.middleware')

const router = new Router({ prefix: '/user' })

// 注册接口
router.post('/register', userValidator, verifyUser, cryptPassword, register)

// 登录接口
router.post('/login', userValidator, verifyLogin, login)

module.exports = router
