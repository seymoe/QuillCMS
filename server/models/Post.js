import mongoose from 'mongoose'
import PostCategory from './PostCategory'
import PostTag from './PostTag'
import PostComment from './PostComment'
import User from './User'
import shortid from 'shortid'

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
  discription: String,  // 简介
  content: String,      // 文章内容
  author: {
    type: String,
    ref: 'User'
  },
  // 分类
  categories: [
    {
      type: String,
      ref: PostCategory
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
  // 文章来源 0: 原创 1: 转载
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
  // 评论
  comments: [
    {
      type: String,
      ref: 'PostComment'
    }
  ],
  // 喜欢次数
  likes: {
    tpye: Number,
    default: 0
  },
  // 浏览次数
  views: {
    type: Number,
    default: 0
  },
  // 收藏
  collections: {
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
  ]
  create_time: Date,
  modify_time: Date
})

export default mongoose.model('Post', PostSchema)
