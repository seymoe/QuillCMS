import mongoose from 'mongoose'
import Post from './Post'
import User from './User'
import shortid from 'shortid'
import moment from 'moment'

const Schema = mongoose.Schema

const NotifySchema = new Schema({
  // 数据库中存储ID
  _id: {
    type: String,
    'default': shortid.generate
  },
  title: String,
  content: String,
  // 通知类型 notice 公告 | remind 提醒 | message 信息
  type: {
    type: String,
    enum: ['notice', 'remind', 'message']
  },
  target: {
    type: String,
    ref: 'Post'
  },
  // 发送者
  sender: {
    type: String,
    ref: 'User'
  },
  systemSender: {
    type: String
  },
  create_time: {
    type: Date,
    default: Date.now
  }
})

NotifySchema.set('toJSON', { getters: true, virtuals: true })
NotifySchema.set('toObject', { getters: true, virtuals: true })

NotifySchema.path('create_time').get(function (v) {
  return moment(v).format("YYYY-MM-DD HH:mm:ss")
})

export default mongoose.model('Notify', NotifySchema)
