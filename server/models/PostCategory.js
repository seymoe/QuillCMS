import mongoose from 'mongoose'
import shortid from 'shortid'
const Schema = mongoose.Schema

const PostCategorySchema = new Schema({
  // 数据库中存储ID
  _id: {
    type: String,
    'default': shortid.generate
  },
  cate_name: String,    // 分类名称
  cate_desc: String,    // 分类描述
  // 是否激活
  enable: {
    type: Boolean,
    default: true
  },
  create_time: Date
})

export default mongoose.model('PostCategory', PostCategorySchema)