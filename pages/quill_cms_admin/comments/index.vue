<template>
  <div class="admin-page">
    <app-header 
      :spanPostion="menuSetting.btnPosition"
      :loginState="loginState"
      @toggle-appmenu="handleToggleAppmenu"></app-header>
    <div class="admin-main-content">
      <app-menu 
        :activeIndex="routePath + '/comments'"
        :isCollapse="menuSetting.isCollapse"></app-menu>
      <main class="admin-main-wrap">
        <app-page-title :cateObj="cateObj"></app-page-title>
        <comment-table 
          :tableData="commentsList"
          :pageSize="meta.pageSize"
          :totalCounts="meta.totalCounts"
          @delete-comment="clientDeleteOneComment"
          @update-comment="clientUpdateOneComment"></comment-table>
      </main>
    </div>
    <app-footer></app-footer>
  </div>
</template>

<script>
import siteConf from '~/config/site'

import { mapState } from 'vuex'
import API from '~/config/api'
import { log } from '~/utils/util'
import AppHeader from '~/components/Admin/AppHeader'
import AppFooter from '~/components/Admin/AppFooter'
import AppMenu from '~/components/Admin/AppMenu'
import AppPageTitle from '~/components/Admin/AppPageTitle'
import AdTop from '~/components/Admin/Ads/AdTop'
import CommentTable from '~/components/Admin/Comments/CommentTable'

export default {
  data() {
    return {
      routePath: siteConf.adminPath,
      cateObj: {
        cateName: '评论管理',
        pathArray: [
          {
            name: '首页',
            path: siteConf.adminPath
          },
          {
            name: '评论管理',
            path: siteConf.adminPath + '/comments'
          }
        ]
      },
      menuSetting: {
        btnPosition: 145,
        isCollapse: false
      },

      // ------- 以上为每个页面固定状态值 -------
      // 列表
      commentsList: [],
      meta: {
        page: 1,
        pageSize: 10,
        lastPage: 1,
        totalCounts: 0
      }
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

    // 客户端拉取标签列表请求
    clientGetCommentList() {
      this.$request
        .get(API.commentList, {
          params: {
            page: 1,
            pageSize: 100
          }
        })
        .then(res => {
          if (res.data.success) {
            this.commentsList = res.data.data.list
            this.meta.page = res.data.data.page
            this.meta.lastPage = res.data.data.lastPage
            this.meta.totalCounts = res.data.data.totalCounts
          }
        })
        .catch(e => {
          log(e)
          // 发生错误则刷新页面从服务端重新拉取列表
          // location.reload()
        })
    },

    // 客户端发起删除请求
    clientDeleteOneComment(Node) {
      // 只有超级管理员才能删除
      if (
        this.loginState.userInfo.role !== 'super' &&
        this.loginState.userInfo.role !== 'admin'
      ) {
        this.$message({
          type: 'warning',
          message: '权限不足'
        })
        return false
      }

      log(Node)

      this.$request
        .delete(API.commentDelete + '/' + Node._id)
        .then(res => {
          if (res.data.success) {
            this.$notify({
              title: '成功',
              message: res.data.message,
              type: 'success'
            })
            this.clientGetCommentList()
          } else {
            this.$notify({
              title: '错误',
              message: res.data.message,
              type: 'danger'
            })
          }
        })
        .catch(e => {
          log(e)
        })
    },

    clientUpdateOneComment(Node) {
      // 只有超级管理员才能更新
      if (
        this.loginState.userInfo.role !== 'super' &&
        this.loginState.userInfo.role !== 'admin'
      ) {
        this.$message({
          type: 'warning',
          message: '权限不足'
        })
        return false
      }

      log(Node)

      this.$request
        .post(API.commentUpdate, {
          _id: Node._id,
          enable: String(!Node.enable)
        })
        .then(res => {
          if (res.data.success) {
            this.$notify({
              title: '成功',
              message: res.data.message,
              type: 'success'
            })
            this.clientGetCommentList()
          } else {
            this.$notify({
              title: '错误',
              message: res.data.message,
              type: 'danger'
            })
          }
        })
        .catch(e => {
          log(e)
        })
    }
  },
  computed: mapState(['loginState']),
  mounted() {
    this.clientGetCommentList()
  },
  components: {
    AppHeader,
    AppFooter,
    AppMenu,
    AppPageTitle,
    AdTop,
    CommentTable
  }
}
</script>

<style lang="scss" scoped>
</style>
