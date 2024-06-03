const {
  createAddr,
  findAllAddr,
  updateAddr
} = require('../service/addr.service')

class AddrController {
  // 创建地址
  async create(ctx) {
    const user_id = ctx.state.user.dataValues.id
    const { consignee, phone, address } = ctx.request.body

    const res = await createAddr({ user_id, consignee, phone, address })

    ctx.body = {
      code: 0,
      message: '添加地址成功',
      result: res
    }
  }

  // 获取地址列表
  async findAll(ctx) {
    const user_id = ctx.state.user.dataValues.id

    const res = await findAllAddr(user_id)

    ctx.body = {
      code: 0,
      message: '地址列表获取成功',
      result: res
    }
  }

  // 修改地址
  async update(ctx) {
    const id = ctx.request.params.id
    
    const res = await updateAddr(id, ctx.request.body)

    ctx.body = {
      code: 0,
      message: '修改地址成功',
      result: res
    }
  }
}

module.exports = new AddrController()
