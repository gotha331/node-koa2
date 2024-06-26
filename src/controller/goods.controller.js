const path = require('path')
const {
  createGoods,
  updateGoods,
  removeGoods,
  restoreGoods,
  findGoods
} = require('../service/goods.service')
const {
  fileUploadError,
  unSupportedFileType,
  publishGoodsError,
  invalidGoodsId
} = require('../constant/err.type')

class GoodsController {
  // 上传商品图片
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

  // 发布商品
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

  // 更新/修改商品
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

  // 下架商品
  async remove(ctx, next) {
    try {
      const res = await removeGoods(ctx.params.id)

      if (res) {
        ctx.body = {
          code: 0,
          message: '下架商品成功',
          result: ''
        }
      } else {
        return ctx.app.emit('error', invalidGoodsId, ctx)
      }
    } catch (error) {
      console.error(error)
    }
  }

  // 上架商品
  async restore(ctx, next) {
    try {
      const res = await restoreGoods(ctx.params.id)

      if (res) {
        ctx.body = {
          code: 0,
          message: '上架商品成功',
          result: ''
        }
      } else {
        return ctx.app.emit('error', invalidGoodsId, ctx)
      }
    } catch (error) {
      console.error(error)
    }
  }

  // 获取商品列表
  async findAll(ctx, next) {
    // 1. 解析pageNum 和 pageSize
    const { pageNum = 1, pageSize = 10 } = ctx.request.query
    // 2. 调用数据处理的相关方法
    const res = await findGoods(pageNum, pageSize)
    // 3. 返回结果
    ctx.body = {
      code: 0,
      message: '获取商品列表成功',
      result: res
    }
  }
}

module.exports = new GoodsController()
