<template>
  <div class="dashbord-page">
    <app-header></app-header>
    <div class="main-content">
      <app-menu></app-menu>
    </div>
  </div>
</template>

<script>
import AppHeader from '~/components/Admin/AppHeader'
import AppMenu from '~/components/Admin/AppMenu'
export default {
  components: {
    AppHeader,
    AppMenu
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
  background-color: #ecf0f5;
}
.main-content{
  display: flex;
  position: absolute;
  top: 50px;
  left: 0;
  width: 100%;
  bottom: 0;
}
</style>

