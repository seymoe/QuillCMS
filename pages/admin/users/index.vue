<template>
  <div class="admin-page">
    <app-header 
      :spanPostion="menuSetting.btnPosition"
      :loginState="loginState"
      @toggle-appmenu="handleToggleAppmenu"></app-header>
    <div class="admin-main-content">
      <app-menu 
        activeIndex="/admin/users"
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
          @delete-user="clientDeleteOneUser"></user-table>
        <add-user-dialog
          :dialogFormVisible="dialogFormVisible"
          @add-user="handleToggleAddDialog"
          @create-new-user="clientCreateOneUser"></add-user-dialog>
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
import UserTop from '~/components/Admin/Users/UserTop'
import UserTable from '~/components/Admin/Users/UserTable'
import AddUserDialog from '~/components/Admin/Users/AddUserDialog'

export default {
  data() {
    return {
      cateObj: {
        cateName: '仪表盘',
        pathArray: [
          {
            name: '首页',
            path: '/admin'
          },
          {
            name: '用户管理',
            path: '/admin/users'
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

    // 切换增加用户弹框显示
    /*
    * bool { Boolean } 是否显示弹窗
    */
    handleToggleAddDialog(bool) {
      if (this.dialogFormVisible === bool) return false
      this.dialogFormVisible = bool
    },

    // 客户端发送增加分类请求
    clientCreateOneUser(data, successCB, failCB) {
      data.fakemark = 'quillcms_login_mark_' + Date.now()
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
            message: JSON.stringify(err)
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

    // 客户端发起删除分类请求
    clientDeleteOneUser(userObj) {
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
    AddUserDialog
  }
}
</script>

<style lang="scss" scoped>
</style>

