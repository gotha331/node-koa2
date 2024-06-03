const {
  createOrUpdate,
  findCarts,
  updateCarts,
  removeCarts
} = require('../service/cart.service')

const { cartFormatError } = require('../constant/err.type')

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

  // 更新购物车
  async update(ctx) {
    const { id } = ctx.request.params
    const { number, selected } = ctx.request.body

    if (number === undefined && selected === undefined) {
      cartFormatError.message = 'number和selected不能同时为空'
      return ctx.app.emit('error', cartFormatError, ctx)
    }

    // 操作数据库
    const res = await updateCarts({ id, number, selected })

    ctx.body = {
      code: 0,
      message: '更新购物车成功',
      result: res
    }
  }

  // 删除购物车
  async remove(ctx) {
    const { ids } = ctx.request.body
    console.log(ids)

    const res = await removeCarts(ids)

    ctx.body = {
      code: 0,
      message: '删除购物车成功',
      result: res
    }
  }
}

module.exports = new CartController()
