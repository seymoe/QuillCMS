/**
 * 广告
 */

import mongoose from 'mongoose'
import shortid from 'shortid'
const Schema = mongoose.Schema

const AdvertisementSchema = new Schema({
  _id: {
    type: String,
    default: shortid.generate
  },
  title: String,  // 友链名称
  // 描述
  desc: {
    type: String,
    default: ''
  },
  cover: String, // 图片 / 图标
  link: String,   // 链接
  create_time: {
    type: Date,
    default: Date.now
  },
  // 是否激活
  enable: {
    type: Boolean,
    default: true
  }
})

export default mongoose.model('Advertisement', AdvertisementSchema)