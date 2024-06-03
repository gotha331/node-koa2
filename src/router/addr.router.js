const Router = require('koa-router')
const router = new Router({ prefix: '/address' })

const { auth } = require('../middleware/auth.middleware')
const { validator } = require('../middleware/addr.middleware')

const { create } = require('../controller/addr.controller')

router.post(
  '/',
  auth,
  validator({
    consignee: 'string',
    phone: { type: 'string', format: /^1[3-9]\d{9}$/ },
    address: 'string'
  }),
  create
)

module.exports = router
