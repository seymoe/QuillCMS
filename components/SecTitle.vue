<template>
  <div class="title">
    <h2>{{ title }}</h2>
  </div>
</template>

<script>
export default {
  props: ['title']
}
</script>

<style scoped>
.title{
  padding-top: 5px;
  text-align: center;
}
.title h2{
  position: relative;
  margin: 0;
  display: inline-block;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  font-weight: 100;
  color: #ff5722;
}
.title h2::before,.title h2::after{
  position: absolute;
  display: block;
  content: '';
  width: 15px;
  height: 1px;
  background-color: #ffbaa4;
  top: 14px;
}
.title h2::before{
  left: -25px;
}
.title h2::after{
  right: -25px;
}
</style>


