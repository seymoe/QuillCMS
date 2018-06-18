<template>
  <section class="post-detail-wrap" style="background: #fff">
    <header>
      <h1>{{ postData.title }}</h1>
      <p>{{ postData.author.nickname }}</p>
    </header>
    <div class="posthtml" v-html="postData.content"></div>
  </section>
</template>

<script>
export default {
  props: ['postData']
}
</script>

<style lang="scss">
.post-detail-wrap{
  background-color: #fff;
}
</style>

