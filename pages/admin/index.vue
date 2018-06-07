<template>
  <div class="dashbord-page">
    <app-header></app-header>
    <div class="main-content">
      <app-menu></app-menu>
      <main class="main">
        <app-page-title></app-page-title>
        <quick-statistics></quick-statistics>
        <quick-action></quick-action>
        <system-info></system-info>
      </main>
    </div>
    <app-footer></app-footer>
  </div>
</template>

<script>
import AppHeader from '~/components/Admin/AppHeader'
import AppFooter from '~/components/Admin/AppFooter'
import AppMenu from '~/components/Admin/AppMenu'
import AppPageTitle from '~/components/Admin/AppPageTitle'
import QuickStatistics from '~/components/Admin/Dashboard/QuickStatistics'
import SystemInfo from '~/components/Admin/Dashboard/SystemInfo'
import QuickAction from '~/components/Admin/Dashboard/QuickAction'

export default {
  components: {
    AppHeader,
    AppFooter,
    AppMenu,
    AppPageTitle,
    QuickStatistics,
    SystemInfo,
    QuickAction
  }
}
</script>

<style lang="scss" scoped>
.dashbord-page{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #f8f8f8;
}
.main-content{
  display: flex;
  position: absolute;
  top: 50px;
  left: 0;
  width: 100%;
  bottom: 50px;
}
main.main{
  flex: 1;
}
</style>

