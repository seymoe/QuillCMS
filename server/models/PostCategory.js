/**
 * 文章分类
 */

import mongoose from 'mongoose'
import shortid from 'shortid'
const Schema = mongoose.Schema

const PostCategorySchema = new Schema({
  // 数据库中存储ID
  _id: {
    type: String,
    'default': shortid.generate
  },
  // 分类类别 1: 文章分类 2. 专题分类 3. 快讯分类
  type: {
    type: Number,
    default: 1
  },
  // 父级分类 默认为0：顶级分类
  parent_id: {
    type: String,
    default: '0'
  },
  name: String,    // 分类名称
  description: String,    // 分类描述
  // 是否激活
  enable: {
    type: Boolean,
    default: true
  },
  create_time: Date
})

export default mongoose.model('PostCategory', PostCategorySchema)