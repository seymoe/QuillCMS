<template>
  <section class="profile">
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <span>{{ userData.nickname }}</span>
        <template v-if="loginState.userInfo.id !== userData._id">
          <el-button @click="handleFollow(userData._id)" v-if="!userData.hasFollow" style="float: right; padding: 3px 0" type="text">关注</el-button>
          <el-button @click="handleUnFollow(userData._id)" v-else style="float: right; padding: 3px 0" type="text">取消关注</el-button>
        </template>
      </div>
      <div class="item flex-row">
        <span>发文：{{ userData.postsNum }}</span>
        <span>粉丝：{{ userData.fansNum }}</span>
        <span>关注：{{ userData.followsNum }}</span>
      </div>
      <div class="item" v-if="userData.email">邮箱：{{ userData.email }}</div>
      <div class="item" v-if="userData.phone">手机：{{ userData.phone }}</div>
      <div class="item"><span>性别：{{ userData.sex == 1 ? '男' : '女' }}</span></div>
      <div class="item"><span>年龄：{{ userData.age }}岁</span></div>
      <div class="item"><span>省份：{{ userData.province ? userData.province : '未填写' }}</span></div>
      <div class="item"><span>城市：{{ userData.city ? userData.city : '未填写' }}</span></div>
      <div class="item" v-if="userData.address"><span>地址：{{ userData.address }}</span></div>
    </el-card>
  </section>
</template>

<script>
  export default {
    props: ['userData', 'loginState'],
    methods: {
      // 关注
      handleFollow(id) {
        // 判断是否登陆
        if (!this.loginState.hasLogin || !this.loginState.userInfo.id) {
          this.showConfirmBox()
          return false
        }
        this.$emit('follow-user', id)
      },
      // 取消关注
      handleUnFollow(id) {
        // 判断是否登陆
        if (!this.loginState.hasLogin || !this.loginState.userInfo.id) {
          this.showConfirmBox()
          return false
        }
        this.$emit('unfollow-user', id)
      },

      // 提示登陆注册
      showConfirmBox() {
        this.$confirm('您还未登录，请登录后再进行相关操作', '请登陆', {
          confirmButtonText: '去登陆',
          cancelButtonText: '放弃了',
          type: 'info',
          center: true
        })
          .then(() => {
            let fromUrl = '/user/' + this.userData._id
            this.$router.push('/signin?fromUrl=' + fromUrl)
          })
          .catch(() => {})
      }
    }
  }
</script>

<style lang="scss" scoped>
.profile{
  margin-bottom: 20px;
}
.box-card{
  border: none;
  border-radius: none;
  .item{
    padding: 6px 0;
    align-items: 'center';
    justify-content: space-between;
  }
}
</style>
