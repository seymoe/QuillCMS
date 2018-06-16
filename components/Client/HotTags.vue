<template>
  <section class="hot-tags-wrap">
    <div class="title">
      <h1>热门标签</h1>
    </div>
    <div class="tags flex-row">
      <nuxt-link to="/">
      <el-button plain class="tag" size="mini">NodeJS</el-button>
    </nuxt-link>
    <nuxt-link to="/">
      <el-button plain class="tag" size="mini">JavaScript</el-button>
    </nuxt-link>
    <nuxt-link to="/">
      <el-button plain class="tag" size="mini">NodeJS</el-button>
    </nuxt-link>
    <nuxt-link to="/">
      <el-button plain class="tag" size="mini">PHP</el-button>
    </nuxt-link>
    <nuxt-link to="/">
      <el-button plain class="tag" size="mini">Pyhton</el-button>
    </nuxt-link>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.hot-tags-wrap{
  margin-top: 20px;
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
