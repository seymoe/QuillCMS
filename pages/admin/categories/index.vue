<template>
  <div class="admin-page">
    <app-header 
      :spanPostion="menuSetting.btnPosition"
      :loginState="loginState"
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
          @add-cate="handleToggleAddDialog"
          @delete-cate="clientDeleteOneCate"></categories-tree>
        <add-cate-dialog 
          :dialogFormVisible="dialogFormVisible"
          :dialogParentNode="dialogParentNode"
          @add-cate="handleToggleAddDialog"
          @create-new-cate="clientCreateOneCate"></add-cate-dialog>
      </main>
    </div>
    <app-footer></app-footer>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import API from '~/config/api'
import { log, arrayToTree } from '~/utils/util'
import AppHeader from '~/components/Admin/AppHeader'
import AppFooter from '~/components/Admin/AppFooter'
import AppMenu from '~/components/Admin/AppMenu'
import AppPageTitle from '~/components/Admin/AppPageTitle'
import CategoriesTop from '~/components/Admin/Categories/CategoriesTop'
import CategoriesTree from '~/components/Admin/Categories/CategoriesTree'
import AddCateDialog from '~/components/Admin/Categories/AddCateDialog'

export default {
  data() {
    return {
      cateObj: {
        cateName: '分类管理',
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

      // 只有超级管理员才能添加添加分类
      if (this.loginState.userInfo.role !== 'super') {
        this.$message({
          type: 'warning',
          message: '权限不足'
        })
        return false
      }

      this.dialogFormVisible = bool
      this.dialogParentNode = topCateNode || {}
    },

    // 客户端发送增加分类请求
    clientCreateOneCate(data, successCB, failCB) {
      log(data)
      this.$request
        .post(API.categoryAdd, data)
        .then(res => {
          if (res.data.success) {
            this.$notify({
              title: '成功',
              message: res.data.message,
              type: 'success'
            })
            successCB && successCB()
            this.clientGetCategoryList()
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

    // 客户端拉取分类列表请求
    clientGetCategoryList() {
      this.$request
        .get(API.categoryList, {
          params: {
            mode: 'full'
          }
        })
        .then(res => {
          if (res.data.success) {
            let _tree = arrayToTree(res.data.data.list)
            this.categoryList = _tree
          }
        })
        .catch(e => {
          log(e)
          // 发生错误则刷新页面从服务端重新拉取列表
          // location.reload()
        })
    },

    // 客户端发起删除分类请求
    clientDeleteOneCate(cateNode) {
      // 只有超级管理员才能删除分类
      if (this.loginState.userInfo.role !== 'super') {
        this.$message({
          type: 'warning',
          message: '权限不足'
        })
        return false
      }

      log(cateNode)
      this.$request
        .delete(API.categoryDelete + '/' + cateNode._id)
        .then(res => {
          if (res.data.success) {
            this.$notify({
              title: '成功',
              message: res.data.message,
              type: 'success'
            })
            this.clientGetCategoryList()
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
  computed: mapState([
    'loginState'
  ]),
  mounted() {
    this.clientGetCategoryList()
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

