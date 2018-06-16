<template>
  <section class="swiper-wrap flex-row">
    <div class="swiper flex-1">
      <el-carousel trigger="click" height="320px">
        <el-carousel-item v-for="item in 4" :key="item">
          <img src="~/assets/img/place.png" alt="">
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="list flex-column hidden-xs-only">
      <div class="listitem" v-for="item in 3" :key="item">
        <nuxt-link to="/">
          <img src="~/assets/img/place.png" alt="">
          <span>前端用户中心</span>
        </nuxt-link>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.swiper-wrap{
  margin-bottom: 20px;
  justify-content: space-between;
  @media screen and (max-width: 767px) {
    margin-bottom: 15px;
    margin-right: -15px;
    margin-left: -15px;
    .el-carousel{
      height: 200px;
      /deep/ .el-carousel__container{
        height: 200px !important;
      }
    }
  }
  .swiper{
    margin-right: 10px;
    @media screen and (max-width: 767px) {
      margin-right: 0px;
    }
  }
  .list{
    width: 180px;
    justify-content: space-between;
    .listitem{
      position: relative;
      height: 100px;
      span{
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        padding: 0 15px;
        display: block;
        height: 26px;
        line-height: 26px;
        color: #fff;
        font-size: 12px;
        background-color: rgba(0,0,0,.3);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        box-sizing: border-box;
      }
    }
  }
}
.el-carousel__item img {
    display: block;
    width: 100%;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
</style>
