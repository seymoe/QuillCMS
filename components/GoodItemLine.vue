<template>
  <div class="good-item-line">
    <a :href="data.coupon_click_url">
      <img class="imgbox" :src="data.pict_url" :alt="data.title">
      <div class="txtbox">
        <h3>{{ data.title }}</h3>
        <p class="price">
          <span class="coupon-after">￥<b>{{ data.calc_after_price }}</b></span>
          <span class="before-price"><del>{{ data.zk_final_price }}</del></span>
          <span class="coupon-num"><i class="iconfont">&#xe706;</i><b>{{ data.calc_coupon_num }}元</b></span>
        </p>
        <p class="info">
          <span>券剩{{ data.coupon_remain_count }}张</span>
          <span>月销{{ data.volume }}件</span>
        </p>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  props: ['data']
}
</script>

<style scoped>
.good-item-line a{
  display: flex;
  padding: 10px;
}
.imgbox{
  margin-right: 10px;
  display: block;
  max-width: 100px;
  height: 100px;
}
.txtbox{
  border-bottom: 1px solid #f3f3f3;
}
.txtbox h3{
  margin: 0;
  font-size: 14px;
  font-weight: normal;
  height: 40px;
  line-height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  word-break: break-word;
}
.txtbox p{
  margin: 0;
}
.price{
  position: relative;
  height: 40px;
}
.price span{
  vertical-align: middle;
  display: inline-block;
  height: 40px;
}
.coupon-after{
  line-height: 40px;
  font-size: 14px;
  color: #f23030;
}
.coupon-after b{
  font-size: 22px;
}
.before-price{
  line-height: 45px;
  margin-left: 8px;
  font-size: 14px;
  color: #666;
}
span.coupon-num{
  display: flex;
  height: 26px;
  line-height: 26px;
  position: absolute;
  right: 0;
  top: 7px;
  background-color: #fff;
  border: 1px solid #f23030;
  color: #fff;
  box-sizing: border-box;
}
span.coupon-num i{
  padding: 0 4px;
  color: #f23030;
  font-size: 20px;
}
span.coupon-num b{
  display: inline-block;
  height: 24px;
  line-height: 24px;
  padding: 0 4px;
  background-color: #f23030;
  font-size: 14px;
  font-weight: 100;
}

/* 底部信息 */
.info{
  font-size: 12px;
}
.info span{
  height: 20px;
  line-height: 20px;
  margin-right: 8px;
  display: inline-block;
  color: #848689;
}
</style>


