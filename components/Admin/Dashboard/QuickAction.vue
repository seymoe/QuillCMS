<template>
  <section class="quick-action">
    <h2>快捷操作</h2>
    <div class="actionbox">
      <el-button 
        class="btn"
        v-for="item in quickActions"
        :key="item.id"
        :type="item.type"
        @click="clickToPage(item)"
        size="mini">{{ item.name }}</el-button>
    </div>
  </section>
</template>

<script>
import siteConf from '~/config/site'

export default {
  data() {
    return {
      quickActions: [
        {
          id: 1,
          name: '添加文章',
          type: 'primary',
          url: siteConf.adminPath + '/posts/new'
        },
        {
          id: 2,
          name: '查看用户',
          type: 'success',
          url: siteConf.adminPath + '/users'
        },
        {
          id: 3,
          name: '查看分类',
          type: 'info',
          url: siteConf.adminPath + '/categories'
        },
        {
          id: 4,
          name: '查看评论',
          type: 'warning',
          url: siteConf.adminPath + '/comments'
        },
        {
          id: 5,
          name: '系统设置',
          type: 'danger',
          url: siteConf.adminPath + '/system/site'
        }
      ]
    }
  },
  methods: {
    clickToPage(item) {
      if (!item.url) return false
      this.$router.push(item.url)
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
  .btn{
    border-radius: 0;
  }
}
</style>
