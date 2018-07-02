<template>
  <section class="hot-creater-wrap">
    <div class="title">
      <h1>创作达人</h1>
    </div>
    <div class="creaters">
      <div
        v-for="(item, index) in hotCreaters"
        :key="index"
        class="creater flex-row">
        <nuxt-link :to="'/user/' + item._id" class="imgbox">
          <img v-if="item.avatar" :src="item.avatar" :alt="item.nickname">
          <img v-else src="~/assets/img/avatar.png" :alt="item.nickname">
        </nuxt-link>
        <div class="txtbox flex-column flex-1">
          <h2><nuxt-link :to="'/user/' + item._id">{{ item.nickname }}</nuxt-link></h2>
          <p>发文量: {{ item.postsNum ? item.postsNum : 0 }} | 粉丝数：{{ item.fansNum ? item.fansNum : 0 }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ['hotCreaters']
}
</script>


<style lang="scss" scoped>
.hot-creater-wrap{
  margin-bottom: 20px;
  width: 100%;
  box-sizing: border-box;
  padding: 10px 15px;
  background-color: #fff;
}
.title{
  margin: 5px 0;
  h1{
    margin: 0;
    font-size: 16px;
    text-align: center;
    color: #409eff;
  }
}

.creater{
  padding: 10px 0;
  justify-content: space-between;
  .imgbox{
    margin-right: 20px;
    display: block;
    width: 60px;
    height: 60px;
    border-radius: 100%;
    overflow: hidden;
    transform: rotate(0deg);
    transition: all .8s;
    &:hover{
      transform: rotate(360deg)
    }
    img{
      display: block;
      width: 60px;
      height: 60px;
    }
  }
  .txtbox{
    justify-content: space-around;
    h2{
      margin: 0;
      a{
        font-size: 16px;
        color: #666;
        transition: all .3s;
        &:hover{
          color: #409eff;
        }
      }
    }
    p{
      color: #999;
      margin: 0;
      font-size: 12px;
    }
  }
}
</style>
