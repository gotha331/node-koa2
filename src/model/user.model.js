const { DataTypes } = require('sequelize')

const seq = require('../db/seq')

// 创建模型（Model user -> users）
const User = seq.define('User', {
  // 定义模型属性
  // id会被自动创建与处理
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // 表示该字段是唯一的
    comment: '用户名，唯一'
  },
  password: {
    type: DataTypes.CHAR(64),
    allowNull: false,
    comment: '密码'
  },
  is_admin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
    comment: '是否为管理员,0:不是管理员(默认);1:是管理员'
  }
})

// 强制同步数据库（创建数据表）
// User.sync({ force: true })

module.exports = User
