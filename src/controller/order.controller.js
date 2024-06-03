const { createOrder } = require('../service/order.service')

class OrderController {
  // 生成订单
  async create(ctx) {
    // 准备数据
    const user_id = ctx.state.user.dataValues.id

    const { address_id, goods_info, total } = ctx.request.body

    const order_number = 'TM' + Date.now()

    const res = await createOrder({
      user_id,
      address_id,
      goods_info,
      total,
      order_number
    })

    ctx.body = {
      code: 0,
      message: '订单创建成功',
      result: res
    }
  }
}

module.exports = new OrderController()
