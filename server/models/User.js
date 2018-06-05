const mongoose = require('mongoose')
const shortid = require('shortid')

const Schema = mongoose.Schema

const UserSchema = new Schema({
  // 数据库中存储ID 唯一
  _id: {
    type: String,
    'default': shortid.generate
  },
  username: String,       // 用户名 唯一 必填
  password: String,       // 密码 必填
  email: String,          // 邮箱 唯一 必填
  phone: String,          // 电话号码 唯一
  role: {
    type: String,
    default: 'member'
  },           // 角色标识 super admin member
  status: {
    type: Boolean,
    default: true        // 角色状态 开启，禁用
  },
  // 其他信息字段
  nickname: String,
  realname: String,
  avatar: String,
  sex: Number,
  age: Number,
  signature: String,      // 个性签名
  province: String,       // 省份
  city: String,           // 城市
  address: String,        // 地址

  // 统计字段
  register_time: Date,
  update_time: Date,
　register_ip: String,
  last_login_time: Date,
　login_ip: String
})

module.exports = mongoose.model('User', UserSchema)