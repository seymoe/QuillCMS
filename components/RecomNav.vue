<template>
  <section class="recom">
    <div class="left">
      <img src="~assets/img/jutemai.png" alt="聚特卖">
    </div>
    <div class="right">
      <div class="right-top">
        <img src="~assets/img/bang.png" alt="销量榜单">
      </div>
      <div class="right-btm">
        <div>
          <img src="~assets/img/miaosha.png" alt="大牌秒杀">
        </div>
        <div>
          <img src="~assets/img/9.9.png" alt="9.9包邮">
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.recom{
  padding: 10px;
  display: flex;
  justify-content: space-between;
}
.recom img{
  display: block;
  max-width: 100%;
}
.left{
  width: 31.5%;
}
.right{
  width: 67%;
}
.right-btm{
  margin-top: 5px;
  display: flex;
  justify-content: space-between;
}
.right-btm>div{
  width: 48.5%;
}
</style>
