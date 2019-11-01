/**
 * 文章分类
 */

import mongoose from 'mongoose'
import shortid from 'shortid'
import moment from 'moment'
const Schema = mongoose.Schema

const PostCategorySchema = new Schema({
  // 数据库中存储ID
  _id: {
    type: String,
    'default': shortid.generate
  },
  // 分类类别 1: 文章分类 2. 专栏分类 3. 快讯分类 4. 话题讨论分类 5. 资料分类
  type: {
    type: Number,
    default: 1
  },
  // 排序 正整数
  sort_id: {
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
  // seo link
  default_url: {
    type: String,
    default: ''
  },
  //存储所有父节点结构路径 ","分割
  sort_path: {
    type: String,
    default: '0'
  },
  // 是否激活
  enable: {
    type: Boolean,
    default: true
  },
  create_time: {
    type: Date,
    default: Date.now
  }
})

PostCategorySchema.path('create_time').get(function (v) {
  return moment(v).utcOffset(8).format("YYYY-MM-DD")
})

export default mongoose.model('PostCategory', PostCategorySchema)