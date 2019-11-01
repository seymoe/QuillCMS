/**
 * 友情链接
 */

import mongoose from 'mongoose'
import shortid from 'shortid'
import moment from 'moment'
const Schema = mongoose.Schema

const FriendLinkSchema = new Schema({
  _id: {
    type: String,
    default: shortid.generate
  },
  name: String,  // 友链名称
  // 描述
  desc: {
    type: String,
    default: ''
  },
  link: String,
  cover: String, // 图片 / 图标
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

FriendLinkSchema.path('create_time').get(function (v) {
  return moment(v).utcOffset(8).format("YYYY-MM-DD")
})

export default mongoose.model('FriendLink', FriendLinkSchema)