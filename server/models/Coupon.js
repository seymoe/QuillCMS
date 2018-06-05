import mongoose from 'mongoose'
import CouponCategory from './CouponCategory'
import shortid from 'shortid'

const Schema = mongoose.Schema

const CouponSchema = new Schema({
  // 本地数据库中存储ID
  _id: {
    type: String,
    'default': shortid.generate
  },
  num_iid: String,      // 商品ID
  title: String,        // 商品标题
  item_description: String,   // 宝贝描述（推荐理由）
  pict_url: String,     // 商品主图
  item_url: String,     // 商品详情页
  small_images: Array,  // 商品小图列表
  shop_title: String,   // 店铺名称
  user_type: Number,    // 卖家类型，0表示集市，1表示商城
  nick: String,         // 卖家昵称
  seller_id: Number,    // 卖家ID
  provcity: String,       // 宝贝所在地
  reserve_price: String,  // 商品一口价格
  zk_final_price: Number, // 折扣价
  volume: Number,       // 30天销量
  coupon_total_count: Number,   // 优惠券总量
  coupon_remain_count: Number,  // 优惠券剩余量
  commission_rate: String,  // 佣金比率(%)
  coupon_info: String,    // 优惠券信息
  category: Number,       // 淘宝后台一级目录
  coupon_start_time: String,  // 优惠券开始时间
  coupon_end_time: String,    // 优惠券结束时间
  click_url: String,        // 淘客地址
  tk_rate: String,          // 收入比例，举例，取值为20.00，表示比例20.00%
  zk_final_price_wap: String,     // 无线折扣价，即宝贝在无线上的实际售卖价格
  event_start_time: Date,       // 招商活动开始时间；如果该宝贝取自普通选品组，则取值为1970-01-01 00:00:00
  event_end_time: Date,         // 招行活动的结束时间；如果该宝贝取自普通的选品组，则取值为1970-01-01 00:00:00
  status: Number,           // 宝贝状态，0失效，1有效；注：失效可能是宝贝已经下线或者是被处罚不能在进行推广
  coupon_click_url: String,   // 优惠券推广链接 ！重要

  // 本地数据库中的栏目: 9块9包邮、等
  coupon_cate: {
    type: String,
    default: ''
  },
  // 淘口令， 通过接口获取并存储 默认为空
  tao_pwd: {
    type: String,
    default: ''
  }
})

export default mongoose.model('Coupon', CouponSchema)
