const Goods = require('../model/goods.model')

class GoodsService {
  async createGoods(goods) {
    const res = await Goods.create(goods)
    return res.dataValues
  }

  async updateGoods(id, goods) {
    const res = await Goods.update(goods, { where: { id } })

    return res[0] > 0 ? true : false
  }

  async removeGoods(id) {
    const res = await Goods.destroy({ where: { id } })

    return res
  }

  async restoreGoods(id) {
    const res = await Goods.restore({ where: { id } })

    return res
  }

  async findGoods(pageNum, pageSize) {
    const offset = (pageNum - 1) * pageSize
    const { count, rows } = await Goods.findAndCountAll({
      attributes: ['goods_name', 'goods_price', 'goods_num', 'goods_img'],
      offset: offset,
      limit: pageSize * 1
    })

    return {
      pageNum,
      pageSize,
      total: count,
      list: rows
    }
  }

  async updateCarts(id,number,selected) {

  }
}

module.exports = new GoodsService()
