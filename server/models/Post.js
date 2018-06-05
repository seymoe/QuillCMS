import mongoose from 'mongoose'
import PostCategory from './PostCategory'
import PostComments from './PostComments'
import User from './User'
import shortid from 'shortid'

const Schema = mongoose.Schema

const PostSchema = new Schema({
  // 数据库中存储ID
  _id: {
    type: String,
    'default': shortid.generate
  },
  sentence: String,    // 标题
  picture: String,     // 图片
  author: {
    type: String,
    ref: 'User'
  },
  likes: {
    tpye: Number,
    default: 0
  },
  location: {
    type: String,
    default: ''
  },
  // 卡片分类
  category: {
    type: String,
    ref: PostCategory
  },
  // 显示样式
  stlye: {
    type: Number,
    default: 1
  },
  auth: {
    type: String,
    default: 'public'
  },
  comments: [
    {
      type: String,
      ref: 'PostComments'
    }
  ],
  create_time: Date
})

export default mongoose.model('Post', PostSchema)
