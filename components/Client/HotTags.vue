<template>
  <section class="hot-tags-wrap">
    <div class="title">
      <h1>热门标签</h1>
    </div>
    <div class="tags flex-row">
      <nuxt-link 
        v-for="(item, index) in tagList" 
        :key="index" 
        :to="'/tag/' + item.name"
        tag="a" target="_blank">
        <el-button plain class="tag" size="mini">{{ item.name }}</el-button>
      </nuxt-link>
    </div>
  </section>
</template>

<script>
export default {
  props: ['tagList']
}
</script>


<style lang="scss" scoped>
.hot-tags-wrap{
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
.tags{
  padding: 10px 0;
  flex-wrap: wrap;
  .tag{
    margin: 0 10px 10px 0;
    border-radius: 0;
  }
}
</style>
