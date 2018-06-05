<template>
  <header class="head">
    <h1>{{ headTitle }}</h1>
    <span class="iconfont">&#xe651;</span>
  </header>
</template>

<script>
  export default {
    data () {
      return {
        headTitle: '折精选'
      }
    }
  }
</script>

<style scoped>
.head{
  position: relative;
  height: 40px;
  text-align: center;
  background-color: #ff5722;
}
.head h1{
  margin: 0;
  line-height: 40px;
  font-weight: 100;
  font-size: 16px;
  color: #fff;
}
.head span{
  position: absolute;
  display: block;
  width: 30px;
  height: 30px;
  line-height: 30px;
  top: 5px;  
  right: 5px;
  font-size: 18px;
  text-align: center;
  color: #fff;
}
</style>

