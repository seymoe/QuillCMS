/**
 * 文章标签
 */

import mongoose from 'mongoose'
import shortid from 'shortid'
const Schema = mongoose.Schema

const PostTagSchema = new Schema({
  _id: {
    type: String,
    default: shortid.generate
  },
  name: String,  // 标签名
  alias: String, // 标签别名
  create_time: {
    type: Date,
    default: Date.now
  },
  cover: String // 标签图片 / 字体图标
})

export default mongoose.model('PostTag', PostTagSchema)