<template>
  <div class="dashbord-page">
    <app-header></app-header>
    <div class="main-content">
      <app-menu activeIndex="/admin/posts"></app-menu>
      <main class="main">
        <app-page-title :cateObj="cateObj"></app-page-title>
        <post-top></post-top>
        <post-table></post-table>
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
import PostTop from '~/components/Admin/Posts/PostTop'
import PostTable from '~/components/Admin/Posts/PostTable'

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
            name: '文章管理',
            path: '/admin/posts'
          }
        ]
      }
    }
  },
  components: {
    AppHeader,
    AppFooter,
    AppMenu,
    AppPageTitle,
    PostTop,
    PostTable
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

