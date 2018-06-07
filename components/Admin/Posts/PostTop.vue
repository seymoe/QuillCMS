<template>
  <section class="post-top">
    <div class="left">
      <el-button class="btn" type="primary" size="mini">新增</el-button>
      <el-button class="btn" type="danger" size="mini">删除</el-button>
    </div>
    <div class="right">
      <el-input
        size="mini"
        placeholder="请输入关键词搜索"
        suffix-icon="el-icon-search"
        v-model="searchKeyword">
      </el-input>
    </div>
  </section>
</template>

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

