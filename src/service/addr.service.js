const Addr = require('../model/addr.model')

class AddrService {
  async createAddr(params) {
    return await Addr.create(params)
  }
}

module.exports = new AddrService()
