const { invalidGoodsId } = require('../constant/err.type')

const validator = async (ctx, next) => {
  try {
    ctx.verifyParams({
      goods_id: 'number' // type:"number",require:true
    })

    await next()
  } catch (error) {
    console.error(error)
    invalidGoodsId.result = error
    return ctx.app.emit('error', invalidGoodsId, ctx)
  }
}

module.exports = { validator }
