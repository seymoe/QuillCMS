// 计算出优惠券额度以及优惠价格
const calcCoupon = (array) => {
  let pattern = /^满(\d+)元减(\d+)元$/
  let _list = array
  _list.forEach(item => {
    console.log('佣金比例 ', item.commission_rate)
    console.log('券信息 ', item.coupon_info)
    let priceArr = pattern.exec(item.coupon_info)
    console.log(priceArr[2])
    if (priceArr[1] && priceArr[2]) {
      // 设置优惠券额度
      item.calc_coupon_num = priceArr[2]
      // 设置优惠之后的价格
      item.calc_after_price = (item.zk_final_price - priceArr[2]).toFixed(2)
    }
  })
  return _list
}

export { calcCoupon }
