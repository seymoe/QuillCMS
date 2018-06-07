<template>
  <section class="quick-action">
    <h2>快捷操作</h2>
    <div class="actionbox">
      <el-button 
        v-for="item in quickActions"
        :key="item.id"
        :type="item.type"
        size="mini">{{ item.name }}</el-button>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      quickActions: [
        {
          id: 1,
          path: '',
          name: '添加文章',
          type: 'primary'
        },
        {
          id: 2,
          path: '',
          name: '查看用户',
          type: 'success'
        },
        {
          id: 3,
          path: '',
          name: '添加分类',
          type: 'info'
        },
        {
          id: 4,
          path: '',
          name: '查看评论',
          type: 'warning'
        },
        {
          id: 5,
          path: '',
          name: '系统设置',
          type: 'danger'
        }
      ]
    }
  },
  methods: {
    clickToPage(item) {
      if (!item.path) return false
      this.$router.push(item.path)
    }
  }
}
</script>


<style lang="scss" scoped>
.quick-action{
  padding: 0 15px;
  h2{
    font-size: 16px;
    color: #909399;
  }
}
.actionbox{
  padding: 30px 15px;
  background-color: #fff;
}
</style>
