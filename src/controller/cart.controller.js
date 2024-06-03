const { createOrUpdate, findCarts } = require('../service/cart.service')

class CartController {
  // 将商品添加到购物车
  async add(ctx) {
    // 1. 解析user_id，goods_id
    const user_id = ctx.state.user.dataValues.id
    const goods_id = ctx.request.body.goods_id

    // 2. 操作数据库
    const res = await createOrUpdate(user_id, goods_id)

    // 3. 返回结果
    ctx.body = {
      code: 0,
      message: '添加到购物车成功',
      result: res
    }
  }

  // 获取购物车列表
  async findAll(ctx) {
    // 1. 解析请求参数
    const { pageNum = 1, pageSize = 10 } = ctx.request.query
    const user_id = ctx.state.user.dataValues.id

    // 2. 操作数据库
    const res = await findCarts(user_id, pageNum, pageSize)

    // 3. 返回结构
    ctx.body = {
      code: 0,
      message: '获取购物车列表成功',
      result: res
    }
  }
}

module.exports = new CartController()
