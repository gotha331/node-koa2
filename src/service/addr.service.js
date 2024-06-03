const Addr = require('../model/addr.model')

class AddrService {
  async createAddr(params) {
    return await Addr.create(params)
  }

  async findAllAddr(user_id) {
    const res = Addr.findAll({
      attributes: {
        exclude: ['user_id', 'createdAt', 'updatedAt']
      },
      where: { user_id }
    })

    return res
  }

  async updateAddr(id, address) {
    return await Addr.update(address, { where: { id } })
  }

  async removeAddr(id) {
    return await Addr.destroy({ where: { id } })
  }

  async setDefaultAddr(user_id, id) {
    // 将当前用户所有地址的 is_default 字段设置为 false
    await Addr.update({ is_default: false }, { where: { user_id } })

    // 将当前地址的 is_default 字段设置为 true
    return await Addr.update({ is_default: true }, { where: { id } })
  }
}
 
module.exports = new AddrService()
