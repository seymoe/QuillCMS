<template>
  <div class="admin-page">
    <app-header 
      :spanPostion="menuSetting.btnPosition"
      :loginState="loginState"
      @toggle-appmenu="handleToggleAppmenu"></app-header>
    <div class="admin-main-content">
      <app-menu 
        activeIndex="/admin/tags"
        :isCollapse="menuSetting.isCollapse"></app-menu>
      <main class="admin-main-wrap">
        <app-page-title :cateObj="cateObj"></app-page-title>
        <tag-top
          @add-tag="handleToggleAddDialog"></tag-top>
        <tag-table 
          :tagTableData="tagList"
          :pageSize="tagMeta.pageSize"
          :totalCounts="tagMeta.totalCounts"
          @delete-tag="clientDeleteOneTag"></tag-table>
        <add-tag-dialog 
          :dialogFormVisible="dialogFormVisible"
          @add-tag="handleToggleAddDialog"
          @create-new-tag="clientCreateOneTag"></add-tag-dialog>
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
import TagTop from '~/components/Admin/Tags/TagTop'
import TagTable from '~/components/Admin/Tags/TagTable'
import AddTagDialog from '~/components/Admin/Tags/AddTagDialog'

export default {
  data() {
    return {
      cateObj: {
        cateName: '标签管理',
        pathArray: [
          {
            name: '首页',
            path: '/admin'
          },
          {
            name: '标签管理',
            path: '/admin/tags'
          }
        ]
      },
      menuSetting: {
        btnPosition: 145,
        isCollapse: false
      },

      // ------- 以上为每个页面固定状态值 -------
      // 标签列表
      tagList: [],
      tagMeta: {
        page: 1,
        pageSize: 10,
        totalCounts: 0
      },
      // 是否显示添加标签弹框
      dialogFormVisible: false
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

    // 切换增加标签弹框显示
    /*
    * bool { Boolean } 是否显示弹窗
    */
    handleToggleAddDialog(bool) {
      if (this.dialogFormVisible === bool) return false

      // 只有管理员才能添加添加分类
      if (this.loginState.userInfo.role !== 'super' && this.loginState.userInfo.role !== 'admin') {
        this.$message({
          type: 'warning',
          message: '权限不足'
        })
        return false
      }

      this.dialogFormVisible = bool
    },

    // 客户端发送增加标签请求
    clientCreateOneTag(data, successCB, failCB) {
      log(data)
      this.$request
        .post(API.tagAdd, data)
        .then(res => {
          if (res.data.success) {
            this.$notify({
              title: '成功',
              message: res.data.message,
              type: 'success'
            })
            successCB && successCB()
            this.clientGetTagList()
          }
        })
        .catch(err => {
          log(err)
          this.$notify.error({
            title: '错误',
            message: err.message
          })
          failCB && failCB()
        })
    },

    // 客户端拉取标签列表请求
    clientGetTagList() {
      this.$request
        .get(API.tagList, {
          params: {
            mode: 'full'
          }
        })
        .then(res => {
          if (res.data.success) {
            this.tagList = res.data.data.list
          }
        })
        .catch(e => {
          log(e)
          // 发生错误则刷新页面从服务端重新拉取列表
          location.reload()
        })
    },

    // 客户端发起删除标签请求
    clientDeleteOneTag(tagNode) {
      // 只有超级管理员才能删除分类
      if (this.loginState.userInfo.role !== 'super' && this.loginState.userInfo.role !== 'admin') {
        this.$message({
          type: 'warning',
          message: '权限不足'
        })
        return false
      }

      log(tagNode)

      this.$request
        .delete(API.tagDelete + '/' + tagNode._id)
        .then(res => {
          if (res.data.success) {
            this.$notify({
              title: '成功',
              message: res.data.message,
              type: 'success'
            })
            this.clientGetTagList()
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
  computed: mapState([
    'loginState'
  ]),
  mounted() {
    this.clientGetTagList()
  },
  components: {
    AppHeader,
    AppFooter,
    AppMenu,
    AppPageTitle,
    TagTop,
    TagTable,
    AddTagDialog
  }
}
</script>

<style lang="scss" scoped>
</style>

