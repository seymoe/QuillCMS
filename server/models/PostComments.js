const mongoose = require('mongoose')
const shortid = require('shortid')
const User = require('./User')

const Schema = mongoose.Schema

const PostCommentsSchema = new Schema({
  // 评论ID
  _id: {
    type: String,
    'default': shortid.generate
  },
  parent_id: String, //评论的目标
  //发表评论的用户
  owner_userid: {
    type: String,
    ref: 'User'
  },
  //评论的目标用户
  target_userid: {
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

module.exports = mongoose.model('PostComments', PostCommentsSchema)