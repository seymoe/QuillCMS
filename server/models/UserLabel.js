/**
 * 用户身份标签
 */

import mongoose from 'mongoose'
import shortid from 'shortid'
import moment from 'moment'
const Schema = mongoose.Schema

const UserLabelSchema = new Schema({
  _id: {
    type: String,
    default: shortid.generate
  },
  name: String,  // 标签名
  alias: String, // 标签别名
  cover: String, // 标签图片 / 字体图标
  create_time: {
    type: Date,
    default: Date.now
  },
  // 是否激活
  enable: {
    type: Boolean,
    default: true
  },
  clicks: {
    type: Number,
    default: 0
  }
})

UserLabelSchema.set('toJSON', { getters: true, virtuals: true })
UserLabelSchema.set('toObject', { getters: true, virtuals: true })

UserLabelSchema.path('create_time').get(function (v) {
  return moment(v).utcOffset(8).format("YYYY-MM-DD")
})

export default mongoose.model('UserLabel', UserLabelSchema)