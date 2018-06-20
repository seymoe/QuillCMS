<template>
  <article class="post-detail">
    <header class="head">
      <h1>{{ postData.title }}</h1>
      <div class="foot flex-row">
        <nuxt-link :to="'/user/' + postData.author._id">{{ postData.author.nickname }}</nuxt-link>
        <span v-if="postData.categories.length > 0">{{ postData.categories[postData.categories.length - 1]['name'] }}</span>
        <span>{{ postData.create_time }}</span>
        <span><i class="iconfont">&#xe603;</i>{{ postData.clicksNum }}</span>
        <span><i class="iconfont">&#xe606;</i>{{ postData.likesNum }}</span>
        <span><i class="iconfont">&#xe8f8;</i>{{ postData.collectionsNum }}</span>
      </div>
    </header>
    <div class="cover-box" v-if="postData.cover">
      <img :src="postData.cover" alt="">
    </div>
    <div class="posthtml" v-html="postData.content"></div>
  </article>
</template>

<script>
export default {
  props: ['postData']
}
</script>

<style lang="scss" scoped>
.post-detail{
  padding: 30px;
  background-color: #fff;
  @media screen and (max-width: 767px) {
    padding: 30px 15px;
    margin-left: -15px;
    margin-right: -15px;
  }
}
.head{
  h1{
    margin: 0 0 15px 0;
    font-size: 26px;
    color: #3d464d;
  }
  .foot{
    align-items: center;
    color: #999;
    a{
      color: #409eff;
    }
    a, span{
      margin-right: 15px;
      i{
        margin-right: 5px;
      }
    }
  }
}
.posthtml, .cover-box{
  margin: 30px 0 0 0;
}
</style>

