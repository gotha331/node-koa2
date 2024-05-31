const path = require('path')
const { createGoods, updateGoods } = require('../service/goods.service')
const {
  fileUploadError,
  unSupportedFileType,
  publishGoodsError,
  invalidGoodsId
} = require('../constant/err.type')

class GoodsController {
  /**
   * 商品图片上传
   * @param {*} ctx
   * @param {*} next
   * @returns
   */
  async upload(ctx, next) {
    const { file } = ctx.request.files

    const fileTypes = ['image/jpeg', 'image/png']

    if (file) {
      if (!fileTypes.includes(file.mimetype)) {
        return ctx.app.emit('error', unSupportedFileType, ctx)
      }

      ctx.body = {
        code: 0,
        message: '商品图片上传成功',
        result: {
          goods_img: path.basename(file.filepath)
        }
      }
    } else {
      return ctx.app.emit('error', fileUploadError, ctx)
    }
  }

  /**
   * 发布商品
   * @param {*} ctx
   * @param {*} next
   */
  async create(ctx, next) {
    // 直接调用service的createGoods方法
    try {
      const { createdAt, updatedAt, ...res } = await createGoods(
        ctx.request.body
      )

      ctx.body = {
        code: 0,
        message: '发布商品成功',
        result: res
      }
    } catch (error) {
      console.error(error)
      return ctx.app.emit('error', publishGoodsError, ctx)
    }
  }

  /**
   * 更新/修改商品
   * @param {*} ctx
   * @param {*} next
   */
  async update(ctx, next) {
    // 字节调用service的updateGoods方法

    try {
      const res = await updateGoods(ctx.params.id, ctx.request.body)

      if (res) {
        ctx.body = {
          code: 0,
          message: '修改商品成功',
          result: ''
        }
      } else {
        return ctx.app.emit('error', invalidGoodsId, ctx)
      }
    } catch (error) {
      console.error(error)
    }
  }
}

module.exports = new GoodsController()
