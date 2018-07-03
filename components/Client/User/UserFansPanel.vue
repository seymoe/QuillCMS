<template>
  <section class="hot-creater-wrap">
    <div class="title flex-row">
      <h1>{{ loginState.userInfo.id === userData._id ? '我' : (userData.sex === 1 ? '他' : '她') }}关注的人</h1>
      <el-button class="btn" type="text">全部</el-button>
    </div>
    <div class="creaters">
      <div
        v-for="(item, index) in userData.follow_users"
        :key="index"
        >
        <nuxt-link tag="a" target="_blank" class="creater flex-row" :to="'/user/' + item._id">
          <div class="imgbox">
            <img v-if="item.avatar" :src="item.avatar" :alt="item.nickname">
            <img v-else src="~/assets/img/avatar.png" :alt="item.nickname">
          </div>
          <div class="txtbox flex-column flex-1">
            <h2>{{ item.nickname }}</h2>
            <p>{{ item.signature ? item.signature : '' }}</p>
          </div>
        </nuxt-link>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ['userData', 'loginState']
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
  justify-content: space-between;
  align-items: center;
  h1{
    margin: 0;
    font-size: 16px;
    text-align: left;
    color: #409eff;
  }
  .btn{
    padding: 3px 10px;
    color: #999;
    font-weight: normal;
    font-size: 12px;
    &:hover{
      color: #409eff;
    }
  }
}

.creater{
  padding: 10px 0;
  justify-content: space-between;
  .imgbox{
    margin-right: 15px;
    display: block;
    width: 50px;
    height: 50px;
    border-radius: 100%;
    overflow: hidden;
    transform: rotate(0deg);
    transition: all .8s;
    &:hover{
      transform: rotate(360deg)
    }
    img{
      display: block;
      width: 50px;
      height: 50px;
    }
  }
  .txtbox{
    justify-content: center;
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
