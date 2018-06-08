<template>
  <section class="post-top">
    <div class="left">
      <el-button class="btn" type="primary" size="mini">新增</el-button>
    </div>
    <div class="right">
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
      selectValue: 1,
      selectOptions: [
        {
          value: 1,
          label: '全部'
        },
        {
          value: 2,
          label: '超级管理员'
        },
        {
          value: 3,
          label: '普通管理员'
        },
        {
          value: 4,
          label: '注册会员'
        }
      ]
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
    .select{
      margin-left: 15px;
      width: 135px;
    }
  }
}
</style>

