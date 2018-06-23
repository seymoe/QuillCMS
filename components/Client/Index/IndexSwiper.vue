<template>
  <section class="swiper-wrap flex-row">
    <div class="swiper flex-1">
      <el-carousel trigger="click" height="320px">
        <el-carousel-item v-for="(item, index) in swiper" :key="index">
          <nuxt-link class="swiper-link" :to="'/post/' + item._id ">
            <img :src="item.cover" :alt="item.title">
            <p class="title"><span>{{ item.title }}</span></p>
          </nuxt-link>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="list flex-column hidden-xs-only">
      <div class="listitem" v-for="(item, index) in topList" :key="index">
        <nuxt-link :to="'/post/' + item._id " class="imgbox">
          <img :src="item.cover" :alt="item.title">
          <span>{{ item.title }}</span>
        </nuxt-link>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ['swiperList'],
  computed: {
    swiper: function() {
      if (this.swiperList.length > 3) {
        return this.swiperList.slice(0, 3)
      } else {
        return this.swiperList
      }
    },
    topList: function() {
      if (this.swiperList.length > 3) {
        return this.swiperList.slice(3)
      } else {
        return []
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.swiper-wrap {
  margin-bottom: 20px;
  justify-content: space-between;
  @media screen and (max-width: 767px) {
    margin-bottom: 15px;
    margin-right: -15px;
    margin-left: -15px;
    .el-carousel {
      height: 200px;
      /deep/ .el-carousel__container {
        height: 200px !important;
      }
    }
  }
  .swiper {
    margin-right: 10px;
    @media screen and (max-width: 767px) {
      margin-right: 0px;
    }
  }
  .list {
    width: 180px;
    justify-content: space-between;
    .listitem {
      position: relative;
      height: 100px;
      overflow: hidden;
      &:hover {
        img {
          transform: scale(1.05);
        }
      }
      img {
        transform: scale(1);
        transition: all 0.5s;
      }
      span {
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
        background-color: rgba(0, 0, 0, 0.3);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        box-sizing: border-box;
      }
    }
  }
}
.swiper-link {
  position: relative;
  display: block;
  height: 100%;
  overflow: hidden;
  .title {
    margin: 0;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 36px;
    line-height: 36px;
    background-color: rgba(0, 0, 0, 0.3);
    span{
      display: block;
      width: 60%;
      color: #fff;
      text-indent: 15px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
.el-carousel /deep/ .el-carousel__indicators{
  left: unset;
  right: 0;
  bottom: 5px;
  transform: unset;
}
.el-carousel__item img {
  display: block;
  width: 100%;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
