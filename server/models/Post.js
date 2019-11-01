import mongoose from 'mongoose'
import PostCategory from './PostCategory'
import PostTag from './PostTag'
import User from './User'
import shortid from 'shortid'
import moment from 'moment'

const Schema = mongoose.Schema

const PostSchema = new Schema({
  // 数据库中存储ID
  _id: {
    type: String,
    'default': shortid.generate
  },
  title: String,        // 标题
  sub_title: String,    // 二级标题
  cover: String,        // 图片
  description: String,  // 简介
  content: String,      // 文章内容
  // 内容格式 M：markdown T：Text
  content_type: {
    type: String,
    default: 'M'
  },
  author: {
    type: String,
    ref: 'User'
  },
  // 分类
  categories: [
    {
      type: String,
      ref: 'PostCategory'
    }
  ],
  // 权限 public secret
  auth: {
    type: String,
    default: 'public'
  },
  // 状态 published draft
  state: {
    type: String,
    default: 'published'
  },
  // 是否置顶推荐
  isTop: {
    type: Boolean,
    default: false
  },

  // 文档类型 0: 原创 -- 1: 转载
  from: {
    type: Number,
    default: 0
  },

  // 文章标签
  tags: [
    {
      type: String,
      ref: 'PostTag'
    }
  ],
  // 评论次数
  commentsNum: {
    type: Number,
    default: 0
  },
  // 喜欢次数
  likesNum: {
    type: Number,
    default: 0
  },
  // 浏览次数
  clicksNum: {
    type: Number,
    default: 0
  },
  // 收藏次数
  collectionsNum: {
    type: Number,
    default: 0
  },
  // 喜欢该文章的用户列表
  like_users: [
    {
      type: String,
      default: []
    }
  ],
  // 收藏该文章的用户列表
  collect_users: [
    {
      type: String,
      default: []
    }
  ],
  create_time: {
    type: Date,
    default: Date.now
  },
  modify_time: {
    type: Date,
    default: Date.now
  }
})

PostSchema.set('toJSON', { getters: true, virtuals: true })
PostSchema.set('toObject', { getters: true, virtuals: true })

PostSchema.path('create_time').get(function (v) {
  return moment(v).utcOffset(8).format("YYYY-MM-DD")
})
PostSchema.path('modify_time').get(function (v) {
  return moment(v).utcOffset(8).format("YYYY-MM-DD")
})

export default mongoose.model('Post', PostSchema)
