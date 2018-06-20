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
        <link-top
          @add-link="handleToggleAddDialog"></link-top>
        <link-table 
          :linkTableData="linkList"
          :pageSize="linkMeta.pageSize"
          :totalCounts="linkMeta.totalCounts"
          @delete-link="clientDeleteOneLink"
          @update-link="handleToggleUpdateDialog"></link-table>
        <add-link-dialog 
          :dialogFormVisible="dialogFormVisible"
          @add-link="handleToggleAddDialog"
          @create-new-link="clientCreateOneLink"></add-link-dialog>
        <edit-link-dialog 
          :dialogFormVisible="updateFormVisible"
          :form="currentLinkData"
          @add-link="handleToggleUpdateDialog"
          @update-link="clientUpdateOneLink"></edit-link-dialog>
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
import LinkTop from '~/components/Admin/Links/LinkTop'
import LinkTable from '~/components/Admin/Links/LinkTable'
import AddLinkDialog from '~/components/Admin/Links/AddLinkDialog'
import EditLinkDialog from '~/components/Admin/Links/EditLinkDialog'

export default {
  data() {
    return {
      cateObj: {
        cateName: '友链管理',
        pathArray: [
          {
            name: '首页',
            path: '/admin'
          },
          {
            name: '友链管理',
            path: '/admin/links'
          }
        ]
      },
      menuSetting: {
        btnPosition: 145,
        isCollapse: false
      },

      // ------- 以上为每个页面固定状态值 -------
      // 友链列表
      linkList: [],
      linkMeta: {
        page: 1,
        pageSize: 10,
        totalCounts: 0
      },
      // 是否显示添加标签弹框
      dialogFormVisible: false,
      // 是否显示更新框
      updateFormVisible: false,
      // 当前选中的链接对象
      currentLinkData: {}
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

    // 切换增加友链弹框显示
    /*
    * bool { Boolean } 是否显示弹窗
    */
    handleToggleAddDialog(bool) {
      if (this.dialogFormVisible === bool) return false

      // 只有管理员才能添加添加友链
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

      this.dialogFormVisible = bool
    },

    handleToggleUpdateDialog(bool, data) {
      if (this.updateFormVisible === bool) return false
      // 只有管理员才能添加添加友链
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

      if (bool) {
        // 拉取详情成功后，显示弹窗，注入数据
        this.clientGetOneLink(data, () => {
          this.updateFormVisible = bool
        })
      } else {
        this.updateFormVisible = bool
      }
    },

    // 客户端发送增加友链请求
    clientCreateOneLink(data, successCB, failCB) {
      log(data)
      this.$request
        .post(API.linkAdd, data)
        .then(res => {
          if (res.data.success) {
            this.$notify({
              title: '成功',
              message: res.data.message,
              type: 'success'
            })
            successCB && successCB()
            this.clientGetLinkList()
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

    // 客户端更新友链
    clientUpdateOneLink(data, successCB, failCB) {
      log(data)
      this.$request
        .post(API.linkUpdate, data)
        .then(res => {
          if (res.data.success) {
            this.$notify({
              title: '成功',
              message: res.data.message,
              type: 'success'
            })
            successCB && successCB()
            this.clientGetLinkList()
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
    clientGetLinkList() {
      this.$request
        .get(API.linkList, {
          params: {
            mode: 'full'
          }
        })
        .then(res => {
          if (res.data.success) {
            this.linkList = res.data.data.list
          }
        })
        .catch(e => {
          log(e)
          // 发生错误则刷新页面从服务端重新拉取列表
          // location.reload()
        })
    },

    // 客户端拉取单个详情
    clientGetOneLink(linkNode, callback) {
      // 只有超级管理员才能编辑链接
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

      log(linkNode)

      this.$request
        .get(API.linkDelete + '/' + linkNode._id)
        .then(res => {
          if (res.data.success) {
            this.currentLinkData = res.data.data
            callback && callback()
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

    // 客户端发起删除友链请求
    clientDeleteOneLink(linkNode) {
      // 只有超级管理员才能删除分类
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

      log(linkNode)

      this.$request
        .delete(API.linkDelete + '/' + linkNode._id)
        .then(res => {
          if (res.data.success) {
            this.$notify({
              title: '成功',
              message: res.data.message,
              type: 'success'
            })
            this.clientGetLinkList()
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
    this.clientGetLinkList()
  },
  components: {
    AppHeader,
    AppFooter,
    AppMenu,
    AppPageTitle,
    LinkTop,
    LinkTable,
    AddLinkDialog,
    EditLinkDialog
  }
}
</script>

<style lang="scss" scoped>
</style>

