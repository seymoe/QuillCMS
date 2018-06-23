<template>
  <section class="user-head flex-column" :style="backgroundDiv">
    <div class="avatar">
      <img v-if="!userData.avatar" src="~assets/img/avatar.png" :alt="userData.nickname">
      <img v-else :src="userData.avatar" :alt="userData.nickname">
    </div>
    <div class="info">
      <h1>{{ userData.nickname }}</h1>
      <p>{{ userData.signature ? userData.signature : '该用户还没有个性签名' }}</p>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      backgroundDiv: {
        backgroundImage: 'url(' + require('~/assets/img/userbg.jpeg') + ')'
      }
    }
  },
  props: {
    userData: {
      type: Object,
      default: function () {
        return {
          _id: '',
          username: '',
          nickname: '',
          avatar: '',
          signature: ''
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.user-head{
  justify-content: center;
  align-items: center;
  padding: 30px 0;
  background-color: #fff;
  background-size: cover;
  background-position: center;
}
.avatar{
  width: 100px;
  height: 100px;
  border-radius: 100%;
  overflow: hidden;
  img{
    display: block;
    width: 100%;
    height: 100%;
  }
}
.info{
  text-align: center;
  h1{
    margin: 15px;
    color: #fff;
    font-size: 22px;
  }
  p{
    margin: 0;
    color: #fff;
    font-size: 14px;
  }
}
</style>

