<template>
  <section class="tab-wrap">
    <div class="head flex-row">
      <el-radio-group v-model="currentTab" size="small">
        <el-radio-button label="article">文章</el-radio-button>
        <el-radio-button label="action">动态</el-radio-button>
      </el-radio-group>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      currentTab: 'article'
    }
  }
}
</script>

<style lang="scss" scoped>
.head {
  padding: 10px 0;
  justify-content: center;
}
</style>
