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
        <categories-top
          @add-cate="handleToggleAddDialog"></categories-top>
        <categories-tree 
          :categoryTree="categoryList"
          @add-cate="handleToggleAddDialog"></categories-tree>
        <add-cate-dialog 
          :dialogFormVisible="dialogFormVisible"
          :dialogParentNode="dialogParentNode"
          @add-cate="handleToggleAddDialog"></add-cate-dialog>
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
import AddCateDialog from '~/components/Admin/Categories/AddCateDialog'

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
      // 分类列表
      categoryList: [],
      // 是否显示添加分类弹框
      dialogFormVisible: false,
      dialogParentNode: {}
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
    },

    // 切换增加分类弹框显示
    /*
    * bool { Boolean } 是否显示弹窗
    * topCateNode { String } 父级分类ID，默认为0
    */
    handleToggleAddDialog(bool, topCateNode) {
      if (this.dialogFormVisible === bool) return false
      this.dialogFormVisible = bool
      this.dialogParentNode = topCateNode || {}
    },

    // 客户端发送请求
    clientCreateOneCate() {
      log(1)
    }
  },
  components: {
    AppHeader,
    AppFooter,
    AppMenu,
    AppPageTitle,
    CategoriesTop,
    CategoriesTree,
    AddCateDialog
  }
}
</script>

<style lang="scss" scoped>

</style>

