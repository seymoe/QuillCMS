<template>
  <section class="post-top">
    <div class="left">
      <el-button class="btn" type="primary" size="mini" @click="showAddDialog">新增</el-button>
    </div>
    <div class="right">
      <el-select 
        v-model="selectValue" 
        placeholder="请选择" 
        size="mini" 
        class="select"
        @change="toggleRole">
        <el-option
          v-for="item in selectOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
          <span>{{ item.label }}</span>
        </el-option>
      </el-select>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      selectValue: 'all',
      selectOptions: [
        {
          value: 'all',
          label: '全部'
        },
        {
          value: 'super',
          label: '超级管理员'
        },
        {
          value: 'admin',
          label: '普通管理员'
        },
        {
          value: 'member',
          label: '注册会员'
        }
      ]
    }
  },
  methods: {
    toggleRole(value) {
      this.$emit('toggle-role', value)
    },
    showAddDialog() {
      this.$emit('add-user', true)
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

