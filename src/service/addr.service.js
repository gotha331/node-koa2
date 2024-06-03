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
}

module.exports = new AddrService()
