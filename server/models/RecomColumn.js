import mongoose from 'mongoose'
import shortid from 'shortid'
const Schema = mongoose.Schema

const RecomColumnSchema = new Schema({
  // 数据库中存储ID
  _id: {
    type: String,
    'default': shortid.generate
  },
  name: String     // 推荐栏目名称
})

export default mongoose.model('RecomColumn', RecomColumnSchema)