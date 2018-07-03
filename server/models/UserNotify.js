import mongoose from 'mongoose'
import Notify from './Notify'
import User from './User'
import shortid from 'shortid'
import moment from 'moment'

const Schema = mongoose.Schema

const UserNotifySchema = new Schema({
  // 数据库中存储ID
  _id: {
    type: String,
    'default': shortid.generate
  },
  notify: {
    type: String,
    ref: 'Notify'
  },
  // 消息所属者
  user: {
    type: String,
    ref: 'User'
  },
  // 发送者
  sender: {
    type: String,
    ref: 'User'
  },
  is_read: {
    type: Boolean,
    default: false
  },
  create_time: {
    type: Date,
    default: Date.now
  }
})

UserNotifySchema.set('toJSON', { getters: true, virtuals: true })
UserNotifySchema.set('toObject', { getters: true, virtuals: true })

UserNotifySchema.path('create_time').get(function (v) {
  return moment(v).format("YYYY-MM-DD HH:mm:ss")
})

export default mongoose.model('UserNotify', UserNotifySchema)
