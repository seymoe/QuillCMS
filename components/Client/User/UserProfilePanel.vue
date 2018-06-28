<template>
  <section class="profile">
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <span>{{ userData.nickname }}</span>
        <el-button style="float: right; padding: 3px 0" type="text">关注</el-button>
      </div>
      <div class="item flex-row">
        <span>粉丝：30</span>
        <span>关注：12</span>
        <span>发文：7</span>
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
    props: ['userData']
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

