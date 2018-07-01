<template>
  <div class="admin-page">
    <app-header 
      :spanPostion="menuSetting.btnPosition"
      :loginState="loginState"
      @toggle-appmenu="handleToggleAppmenu"></app-header>
    <div class="admin-main-content">
      <app-menu 
        :activeIndex="routePath + '/users'"
        :isCollapse="menuSetting.isCollapse"></app-menu>
      <main class="admin-main-wrap">
        <app-page-title :cateObj="cateObj"></app-page-title>
        <user-top
          @toggle-role="clientGetUserList"
          @add-user="handleToggleAddDialog"></user-top>
        <user-table 
          :userTableData="userList"
          :pageSize="userMeta.pageSize"
          :totalCounts="userMeta.totalCounts"
          @delete-user="clientDeleteOneUser"
          @update-user="handleToggleUpdateDialog"></user-table>
        <add-user-dialog
          :dialogFormVisible="dialogFormVisible"
          @add-user="handleToggleAddDialog"
          @create-new-user="clientCreateOneUser"></add-user-dialog>
        <edit-user-dialog 
          :dialogFormVisible="updateFormVisible"
          :form="currentUserData"
          @add-user="handleToggleUpdateDialog"
          @update-user="clientUpdateOne"></edit-user-dialog>
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
import UserTop from '~/components/Admin/Users/UserTop'
import UserTable from '~/components/Admin/Users/UserTable'
import AddUserDialog from '~/components/Admin/Users/AddUserDialog'
import EditUserDialog from '~/components/Admin/Users/EditUserDialog'

export default {
  data() {
    return {
      routePath: siteConf.adminPath,
      cateObj: {
        cateName: '用户管理',
        pathArray: [
          {
            name: '首页',
            path: siteConf.adminPath
          },
          {
            name: '用户管理',
            path: siteConf.adminPath + '/users'
          }
        ]
      },
      menuSetting: {
        btnPosition: 145,
        isCollapse: false
      },
      userList: [],
      userMeta: {
        page: 1,
        pageSize: 10,
        totalCounts: 0
      },
      // 是否显示添加用户弹框
      dialogFormVisible: false,

      // 更新
      updateFormVisible: false,
      currentUserData: {}
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

    // 切换增加用户弹框显示
    /*
    * bool { Boolean } 是否显示弹窗
    */
    handleToggleAddDialog(bool) {
      if (this.dialogFormVisible === bool) return false

      // 只有超级管理员才能添加用户
      if (this.loginState.userInfo.role !== 'super') {
        this.$message({
          type: 'warning',
          message: '权限不足'
        })
        return false
      }

      this.dialogFormVisible = bool
    },

    // 更新弹窗
    handleToggleUpdateDialog(bool, data) {
      if (this.updateFormVisible === bool) return false
      // 只有管理员才能添加添加友链
      if (this.loginState.userInfo.role !== 'super') {
        this.$message({
          type: 'warning',
          message: '权限不足'
        })
        return false
      }

      if (bool) {
        // 拉取详情成功后，显示弹窗，注入数据
        this.clientGetOne(data, () => {
          this.updateFormVisible = bool
        })
      } else {
        this.updateFormVisible = bool
      }
    },

    // 客户端发送增加用户请求
    clientCreateOneUser(data, successCB, failCB) {
      data.fakemark = 'quillcms_user_mark_' + Date.now()
      log(data)
      this.$request
        .post(API.userAdd, data)
        .then(res => {
          if (res.data.success) {
            this.$notify({
              title: '成功',
              message: res.data.message,
              type: 'success'
            })
            successCB && successCB()
            this.clientGetUserList()
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

    // 客户端获取用户列表
    clientGetUserList(role) {
      this.$request
        .get(API.userList, {
          params: {
            role: role || 'all'
          }
        })
        .then(res => {
          if (res.data.success) {
            this.userList = res.data.data.list
            this.userMeta.page = res.data.data.page
            this.userMeta.pageSize = res.data.data.pageSize
            this.userMeta.totalCounts = res.data.data.totalCounts
          }
        })
        .catch(e => {
          log(e)
        })
    },

    // 客户端发起删除用户请求
    clientDeleteOneUser(userObj) {
      // 只有超级管理员才能删除用户
      if (this.loginState.userInfo.role !== 'super') {
        this.$message({
          type: 'warning',
          message: '权限不足'
        })
        return false
      }

      log(userObj)
      this.$request
        .delete(API.userDelete + '/' + userObj._id)
        .then(res => {
          if (res.data.success) {
            this.$notify({
              title: '成功',
              message: res.data.message,
              type: 'success'
            })
            this.clientGetUserList()
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

    // 客户端更新用户
    clientUpdateOne(data, successCB, failCB) {
      log(data)
      this.$request
        .post(API.userUpdate, data)
        .then(res => {
          if (res.data.success) {
            this.$notify({
              title: '成功',
              message: res.data.message,
              type: 'success'
            })
            successCB && successCB()
            this.clientGetUserList()
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

    // 客户端拉取单个详情
    clientGetOne(node, callback) {
      // 只有超级管理员才能编辑链接
      if (this.loginState.userInfo.role !== 'super') {
        this.$message({
          type: 'warning',
          message: '权限不足'
        })
        return false
      }

      log(node)

      this.$request
        .get(API.userDelete + '/' + node._id)
        .then(res => {
          if (res.data.success) {
            this.currentUserData = res.data.data
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
    }
  },
  computed: mapState(['loginState']),
  mounted() {
    // 拉取用户列表
    this.clientGetUserList('all')
  },
  components: {
    AppHeader,
    AppFooter,
    AppMenu,
    AppPageTitle,
    UserTop,
    UserTable,
    AddUserDialog,
    EditUserDialog
  }
}
</script>

<style lang="scss" scoped>
</style>

