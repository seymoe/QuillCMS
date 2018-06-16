<template>
  <section class="post-top">
    <div class="left">
      <el-button class="btn" type="primary" size="mini" @click="toNewPage">新增</el-button>
      <!-- <el-button class="btn" type="danger" size="mini">删除</el-button> -->
    </div>
    <div class="right">
      <el-input
        class="input"
        size="mini"
        placeholder="输入关键词"
        suffix-icon="el-icon-search"
        v-model="searchKeyword">
      </el-input>
      <el-select v-model="selectValue" placeholder="请选择" size="mini" class="select">
        <el-option
          v-for="item in selectOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      searchKeyword: '',
      selectValue: 1,
      selectOptions: [
        {
          value: 1,
          label: '全部'
        },
        {
          value: 2,
          label: '原创'
        },
        {
          value: 3,
          label: '转载'
        },
        {
          value: 4,
          label: '已推荐'
        }
      ]
    }
  },
  methods: {
    toNewPage() {
      this.$emit('route-to-new')
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
  .right{
    display: flex;
    .input, .select{
      margin-left: 15px;
      width: 135px;
    }
  }
}
</style>

