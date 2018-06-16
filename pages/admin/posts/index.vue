<template>
  <div class="admin-page">
    <app-header 
      :spanPostion="menuSetting.btnPosition"
      :loginState="loginState"
      @toggle-appmenu="handleToggleAppmenu"></app-header>
    <div class="admin-main-content">
      <app-menu 
        activeIndex="/admin/posts"
        :isCollapse="menuSetting.isCollapse"></app-menu>
      <main class="admin-main-wrap">
        <app-page-title :cateObj="cateObj"></app-page-title>
        <post-top
          @route-to-new="handleToNewPage"></post-top>
        <post-table
          :postTableData="postList"></post-table>
      </main>
    </div>
    <app-footer></app-footer>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import API from '~/config/api'
import { log } from '~/utils/util'
import AppHeader from '~/components/Admin/AppHeader'
import AppFooter from '~/components/Admin/AppFooter'
import AppMenu from '~/components/Admin/AppMenu'
import AppPageTitle from '~/components/Admin/AppPageTitle'
import PostTop from '~/components/Admin/Posts/PostTop'
import PostTable from '~/components/Admin/Posts/PostTable'

export default {
  data() {
    return {
      cateObj: {
        cateName: '文章管理',
        pathArray: [
          {
            name: '首页',
            path: '/admin'
          },
          {
            name: '文章管理',
            path: '/admin/posts'
          }
        ]
      },
      menuSetting: {
        btnPosition: 145,
        isCollapse: false
      },
      postList: []
    }
  },
  methods: {
    handleToggleAppmenu() {
      this.menuSetting.isCollapse = !this.menuSetting.isCollapse
      if (this.menuSetting.isCollapse) {
        this.menuSetting.btnPosition = 50
      } else {
        this.menuSetting.btnPosition = 145
      }
    },

    // 客户端拉取文章列表请求
    clientGetPostList() {
      this.$request
        .get(API.postList)
        .then(res => {
          log(res.data.data)
          if (res.data.success) {
            this.postList = res.data.data.list
          }
        })
        .catch(e => {
          log(e)
          // 发生错误则刷新页面从服务端重新拉取列表
          location.reload()
        })
    },

    // 跳转至新增页面
    handleToNewPage() {
      if (!this.loginState.hasLogin) {
        return false
      } else if (this.loginState.userInfo.role !== 'super') {
        this.$message({
          type: 'warning',
          message: '权限不足'
        })
        return false
      }

      this.$router.push('/admin/posts/new')
    }
  },
  computed: mapState([
    'loginState'
  ]),
  mounted() {
    this.clientGetPostList()
  },
  components: {
    AppHeader,
    AppFooter,
    AppMenu,
    AppPageTitle,
    PostTop,
    PostTable
  }
}
</script>

<style lang="scss" scoped>

</style>

