<template>
  <div class="top-menu">
    <div class="menu-item">
      <a href="">
        <img src="~assets/img/jutemai_80x80.png" alt="销量榜">
        <span>销量榜</span>
      </a>
    </div>
    <div class="menu-item">
      <a href="">
        <img src="~assets/img/jutemai_80x80.png" alt="聚特卖">
        <span>聚特卖</span>
      </a>
    </div>
    <div class="menu-item">
      <a href="">
        <img src="~assets/img/miaosha_80x80.png" alt="品牌秒">
        <span>品牌秒</span>
      </a>
    </div>
    <div class="menu-item">
      <a href="">
        <img src="~assets/img/bang_80x80.png" alt="九块邮">
        <span>九块邮</span>
      </a>
    </div>
  </div>
</template>

<style scoped>
.top-menu{
  display: flex;
  padding: 10px;
  background-color: #f5f5f5;
}
.menu-item{
  width: 25%;
  text-align: center;
}
.menu-item img{
  display: inline-block;
  width: 60%;
}
.menu-item span{
  display: block;
  font-size: 14px;
}

</style>

