<template>
  <section class="post-top">
    <div class="left">
      <el-button 
        class="btn" 
        type="primary" 
        size="mini"
        @click="showAddDialog">新增</el-button>
    </div>
  </section>
</template>

<script>
export default {
  methods: {
    showAddDialog() {
      this.$emit('add-cate', true)
    }
  }
}
</script>


<style lang="scss" scoped>
.post-top{
  background-color: #fff;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  .left{
    .btn{
      border-radius: 0;
    }
  }
}
</style>

