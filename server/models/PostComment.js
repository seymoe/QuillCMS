import mongoose from 'mongoose'
import shortid from 'shortid'
import User from './User'
import Post from './Post'

const Schema = mongoose.Schema

const PostCommentSchema = new Schema({
  // 评论ID
  _id: {
    type: String,
    'default': shortid.generate
  },
  post_id: {
    type: String, //评论的目标
    ref: 'Post'
  },
  //发表评论的用户
  owner_user: {
    type: String,
    ref: 'User'
  },
  //评论的目标用户
  replay_user: {
    type: String,
    ref: 'User'
  },
  //评论内容
  content: {
    type: String,
    default: ''
  },
  //该评论被点赞的数量
  likes: {
    type: Number,
    default: 0
  },
  created_date: Date, //创建时间
  created_ip: String  // 创建ip
})

export default mongoose.model('PostComment', PostCommentSchema)