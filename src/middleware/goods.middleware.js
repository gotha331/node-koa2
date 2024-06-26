const { goodsFormatError } = require('../constant/err.type')

const validator = async (ctx, next) => {
  try {
    ctx.verifyParams({
      goods_name: { type: 'string', required: true },
      goods_price: { type: 'number', required: true },
      goods_num: { type: 'number', required: true },
      goods_img: { type: 'string', required: true }
    })

    await next()
  } catch (error) {
    console.log(error)
    goodsFormatError.result = error
    return ctx.app.emit('error', goodsFormatError, ctx)
  }
}

module.exports = {
  validator
}
