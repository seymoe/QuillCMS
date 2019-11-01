import mongoose from 'mongoose'
import shortid from 'shortid'
import moment from 'moment'
import User from './User'
import Post from './Post'

moment.locale('zh-cn')

const Schema = mongoose.Schema

const PostCommentSchema = new Schema({
  // 评论ID
  _id: {
    type: String,
    'default': shortid.generate
  },
  //评论目标文章
  post: {
    type: String,
    ref: 'Post'
  },
  //评论用户ID
  owner: {
    type: String,
    ref: 'User'
  },
  //被回复用户ID
  replyer: {
    type: String,
    ref: 'User'
  },
  //评论内容
  content: {
    type: String,
    default: ''
  },
  //该评论被点赞的数量
  likes_num: {
    type: Number,
    default: 0
  },
  // 喜欢该评论的用户列表
  like_users: [
    {
      type: String,
      default: []
    }
  ],
  //创建时间
  create_time: {
    type: Date,
    default: Date.now
  },
  // 是否显示
  enable: {
    type: Boolean,
    default: true
  },
  create_ip: String  // 创建ip
})

PostCommentSchema.set('toJSON', { getters: true, virtuals: true })
PostCommentSchema.set('toObject', { getters: true, virtuals: true })
PostCommentSchema.path('create_time').get(function (v) {
  return moment(v).utcOffset(8).startOf('hour').fromNow()
})

export default mongoose.model('PostComment', PostCommentSchema)