const User = require('../model/user.model')
class UserService {
  /**
   * 创建用户
   * @param {*} username
   * @param {*} password
   * @returns
   */
  async createUser(username, password) {
    // 插入数据
    const res = await User.create({ username, password })
    return res
  }

  /**
   * 获取用户信息
   * @param {*} param0
   * @returns
   */
  async getUserInfo({ id, username, password, is_admin }) {
    const whereOpt = {}

    id && Object.assign(whereOpt, { id })
    username && Object.assign(whereOpt, { username })
    password && Object.assign(whereOpt, { password })
    is_admin && Object.assign(whereOpt, { is_admin })

    const res = await User.findOne({
      attributes: ['id', 'username', 'password', 'is_admin'],
      where: whereOpt
    })

    return res || null
  }

  /**
   * 根据id更新用户信息
   * @param {*} param0
   */
  async updateById({ id, username, password, is_admin }) {
    const whereOpt = { id }
    const newUser = {}

    username && Object.assign(newUser, { username })
    password && Object.assign(newUser, { password })
    is_admin && Object.assign(newUser, { is_admin })

    const res = await User.update(newUser, { where: whereOpt })

    return res[0] > 0 ? true : false
  }
}

module.exports = new UserService()
