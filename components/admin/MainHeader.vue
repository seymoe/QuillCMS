<template>
  <header>
    <h1>{{ title }}</h1>
    <div class="avator">
      <p>{{ adminUser.nickName }}</p>
    </div>
  </header>
</template>

<script>
export default {
  data () {
    return {
      title: '折精选',
      adminUser: {
        userName: 'admin',
        nickName: '曦莫琅'
      }
    }
  }
}
</script>

<style scoped>
header{
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
  height: 60px;
  background-color: #f23030;
}
h1{
  margin: 0;
  color: #fff;
  font-size: 16px;
  font-weight: 100;
  line-height: 60px;
}
.avator{
  line-height: 60px;
  text-align: center;
}
.avator p{
  margin: 0;
  color: #fff;
}
</style>

