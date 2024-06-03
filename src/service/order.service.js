const Order = require('../model/order.model')

class OrderService {
  async createOrder(order) {
    return await Order.create(order)
  }

  async findAllOrder(pageNum, pageSize, status) {
    const offset = (pageNum - 1) * pageSize

    const { count, rows } = await Order.findAndCountAll({
      attributes: [
        'goods_info',
        'total',
        'order_number',
        'status'
      ],
      where: {
        status
      },
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
}

module.exports = new OrderService()
