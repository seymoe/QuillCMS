import mongoose from 'mongoose'
import shortid from 'shortid'
const Schema = mongoose.Schema

const CouponCategorySchema = new Schema({
  // 数据库中存储ID
  _id: {
    type: String,
    'default': shortid.generate
  },
  cate_name: String,    // 分类名称
  parent_id: String,    // 父级分类ID
  select_library: [{    // 选品库列表
    _id: {
      type: String,
      'default': shortid.generate
    },
    type: {type: Number},     // 选品库类型 1：普通类型，2高佣金类型
    favorites_id: Number,   // 选品库ID
    favorites_title: String  // 选品库标题
  }]
})

export default mongoose.model('CouponCategory', CouponCategorySchema)