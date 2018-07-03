import mongoose from 'mongoose'
import shortid from 'shortid'
import moment from 'moment'

const Schema = mongoose.Schema

const SystemLogSchema = new Schema({
  // 数据库中存储ID
  _id: {
    type: String,
    'default': shortid.generate
  },
  logs: {
    type: String
  },
  // 日志类型
  type: {
    type: String
  },
  create_time: {
    type: Date,
    default: Date.now
  }
})

SystemLogSchema.set('toJSON', { getters: true, virtuals: true })
SystemLogSchema.set('toObject', { getters: true, virtuals: true })

SystemLogSchema.path('create_time').get(function (v) {
  return moment(v).format("YYYY-MM-DD HH:mm:ss")
})

export default mongoose.model('SystemLog', SystemLogSchema)
