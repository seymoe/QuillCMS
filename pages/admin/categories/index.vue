<template>
  <div class="admin-page">
    <app-header 
      :spanPostion="menuSetting.btnPosition"
      @toggle-appmenu="handleToggleAppmenu"></app-header>
    <div class="admin-main-content">
      <app-menu 
        activeIndex="/admin/categories"
        :isCollapse="menuSetting.isCollapse"></app-menu>
      <main class="admin-main-wrap">
        <app-page-title :cateObj="cateObj"></app-page-title>
        <categories-top></categories-top>
        <categories-tree :categoryTree="categoryList"></categories-tree>
      </main>
    </div>
    <app-footer></app-footer>
  </div>
</template>

<script>
import axios from 'axios'
import API from '~/config/api'
import { log, arrayToTree } from '~/utils/util'
import AppHeader from '~/components/Admin/AppHeader'
import AppFooter from '~/components/Admin/AppFooter'
import AppMenu from '~/components/Admin/AppMenu'
import AppPageTitle from '~/components/Admin/AppPageTitle'
import CategoriesTop from '~/components/Admin/Categories/CategoriesTop'
import CategoriesTree from '~/components/Admin/Categories/CategoriesTree'

let serverGetCategoryList = () => {
  return axios.get(API.categoryList, {
    params: {
      mode: 'full'
    }
  }).then(res => {
    log(1)
    if (res.data.success) {
      let _tree = arrayToTree(res.data.data.list)
      return _tree
    } else {
      return []
    }
  }).catch(e => {
    return []
  })
}

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
            name: '分类管理',
            path: '/admin/categories'
          }
        ]
      },
      menuSetting: {
        btnPosition: 145,
        isCollapse: false
      },

      // ------- 以上为每个页面固定状态值 -------

      categoryList: []
    }
  },

  async asyncData ({ params }) {
    let [
      categoryList
    ] = await Promise.all([
      serverGetCategoryList()
    ])
    return {
      categoryList
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
  components: {
    AppHeader,
    AppFooter,
    AppMenu,
    AppPageTitle,
    CategoriesTop,
    CategoriesTree
  }
}
</script>

<style lang="scss" scoped>

</style>

