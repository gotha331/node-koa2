class GoodsController {
  async upload(ctx, next) {
    ctx.body = {
      code: '0',
      message: '图片上传成功',
      result: ''
    }
  }
}


module.exports = new GoodsController()