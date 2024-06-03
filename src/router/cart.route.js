const Router = require('koa-router')

const { auth } = require('../middleware/auth.middleware')
const { validator } = require('../middleware/cart.middleware')
const { add, findAll } = require('../controller/cart.controller')

const router = new Router({ prefix: '/carts' })

// 添加到购物车
router.post('/', auth, validator, add)

// 获取购物车列表
router.get('/', auth, findAll)

module.exports = router