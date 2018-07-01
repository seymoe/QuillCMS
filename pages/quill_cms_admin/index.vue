<template>
  <div class="admin-page">
    <app-header
      :spanPostion="menuSetting.btnPosition"
      :loginState="loginState"
      @toggle-appmenu="handleToggleAppmenu"></app-header>
    <div class="admin-main-content">
      <app-menu
        :isCollapse="menuSetting.isCollapse"></app-menu>
      <main class="admin-main-wrap">
        <app-page-title :cateObj="cateObj"></app-page-title>
        <quick-statistics :quickData="previewData"></quick-statistics>
        <quick-action></quick-action>
        <system-info></system-info>
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
import QuickStatistics from '~/components/Admin/Dashboard/QuickStatistics'
import SystemInfo from '~/components/Admin/Dashboard/SystemInfo'
import QuickAction from '~/components/Admin/Dashboard/QuickAction'

export default {
  data() {
    return {
      cateObj: {
        cateName: '仪表盘',
        pathArray: [
          {
            name: '首页',
            path: siteConf.adminPath
          },
          {
            name: '仪表盘',
            path: siteConf.adminPath
          }
        ]
      },
      menuSetting: {
        btnPosition: 145,
        isCollapse: false
      },
      // 总览
      previewData: {}
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

    // 客户端拉取数据预览请求
    clientGetDataPreview() {
      this.$request
        .get(API.dataPreview)
        .then(res => {
          if (res.data.success) {
            this.previewData = res.data.data
          }
        })
        .catch(e => {
          log(e)
          // 发生错误则刷新页面从服务端重新拉取列表
          // location.reload()
        })
    }
  },
  computed: mapState(['loginState']),
  components: {
    AppHeader,
    AppFooter,
    AppMenu,
    AppPageTitle,
    QuickStatistics,
    SystemInfo,
    QuickAction
  },
  mounted() {
    this.clientGetDataPreview()
  }
}
</script>

<style lang="scss" scoped>
</style>

