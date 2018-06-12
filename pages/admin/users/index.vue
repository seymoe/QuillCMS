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
        <user-top></user-top>
        <user-table></user-table>
      </main>
    </div>
    <app-footer></app-footer>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AppHeader from '~/components/Admin/AppHeader'
import AppFooter from '~/components/Admin/AppFooter'
import AppMenu from '~/components/Admin/AppMenu'
import AppPageTitle from '~/components/Admin/AppPageTitle'
import UserTop from '~/components/Admin/Users/UserTop'
import UserTable from '~/components/Admin/Users/UserTable'

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
    }
  },
  computed: mapState([
    'loginState'
  ]),
  components: {
    AppHeader,
    AppFooter,
    AppMenu,
    AppPageTitle,
    UserTop,
    UserTable
  }
}
</script>

<style lang="scss" scoped>

</style>

