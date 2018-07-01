<template>
  <div class="admin-page">
    <app-header 
      :spanPostion="menuSetting.btnPosition"
      :loginState="loginState"
      @toggle-appmenu="handleToggleAppmenu"></app-header>
    <div class="admin-main-content">
      <app-menu 
        :activeIndex="routePath + '/ads'"
        :isCollapse="menuSetting.isCollapse"></app-menu>
      <main class="admin-main-wrap">
        <app-page-title :cateObj="cateObj"></app-page-title>
        <ad-top
          @add-ad="handleToggleAddDialog"></ad-top>
        <ad-table 
          :adsTableData="adsList"
          :pageSize="adsMeta.pageSize"
          :totalCounts="adsMeta.totalCounts"
          @delete-ad="clientDeleteOneAd"
          @update-ad="handleToggleUpdateDialog"></ad-table>
        <add-ad-dialog 
          :dialogFormVisible="dialogFormVisible"
          @add-ad="handleToggleAddDialog"
          @create-new-ad="clientCreateOneAd"></add-ad-dialog>
        <edit-ad-dialog 
          :dialogFormVisible="updateFormVisible"
          :form="currentAdData"
          @add-ad="handleToggleUpdateDialog"
          @update-ad="clientUpdateOneAd"></edit-ad-dialog>
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
import AdTable from '~/components/Admin/Ads/AdTable'
import AddAdDialog from '~/components/Admin/Ads/AddAdDialog'
import EditAdDialog from '~/components/Admin/Ads/EditAdDialog'

export default {
  data() {
    return {
      routePath: siteConf.adminPath,
      cateObj: {
        cateName: '广告管理',
        pathArray: [
          {
            name: '首页',
            path: siteConf.adminPath
          },
          {
            name: '广告管理',
            path: siteConf.adminPath + '/ads'
          }
        ]
      },
      menuSetting: {
        btnPosition: 145,
        isCollapse: false
      },

      // ------- 以上为每个页面固定状态值 -------
      // 友链列表
      adsList: [],
      adsMeta: {
        page: 1,
        pageSize: 10,
        totalCounts: 0
      },
      // 是否显示添加标签弹框
      dialogFormVisible: false,
      // 是否显示更新框
      updateFormVisible: false,
      // 当前选中的链接对象
      currentAdData: {}
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
        this.clientGetOneAd(data, () => {
          this.updateFormVisible = bool
        })
      } else {
        this.updateFormVisible = bool
      }
    },

    // 客户端发送增加友链请求
    clientCreateOneAd(data, successCB, failCB) {
      log(data)
      this.$request
        .post(API.adAdd, data)
        .then(res => {
          if (res.data.success) {
            this.$notify({
              title: '成功',
              message: res.data.message,
              type: 'success'
            })
            successCB && successCB()
            this.clientGetAdList()
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
    clientUpdateOneAd(data, successCB, failCB) {
      log(data)
      this.$request
        .post(API.adUpdate, data)
        .then(res => {
          if (res.data.success) {
            this.$notify({
              title: '成功',
              message: res.data.message,
              type: 'success'
            })
            successCB && successCB()
            this.clientGetAdList()
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
    clientGetAdList() {
      this.$request
        .get(API.adList, {
          params: {
            mode: 'full'
          }
        })
        .then(res => {
          if (res.data.success) {
            this.adsList = res.data.data.list
          }
        })
        .catch(e => {
          log(e)
          // 发生错误则刷新页面从服务端重新拉取列表
          // location.reload()
        })
    },

    // 客户端拉取单个详情
    clientGetOneAd(adNode, callback) {
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

      log(adNode)

      this.$request
        .get(API.adDelete + '/' + adNode._id)
        .then(res => {
          if (res.data.success) {
            this.currentAdData = res.data.data
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
    clientDeleteOneAd(adNode) {
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

      log(adNode)

      this.$request
        .delete(API.adDelete + '/' + adNode._id)
        .then(res => {
          if (res.data.success) {
            this.$notify({
              title: '成功',
              message: res.data.message,
              type: 'success'
            })
            this.clientGetAdList()
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
    this.clientGetAdList()
  },
  components: {
    AppHeader,
    AppFooter,
    AppMenu,
    AppPageTitle,
    AdTop,
    AdTable,
    AddAdDialog,
    EditAdDialog
  }
}
</script>

<style lang="scss" scoped>
</style>

