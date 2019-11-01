<template>
  <div class="admin-page">
    <app-header 
      :spanPostion="menuSetting.btnPosition"
      :loginState="loginState"
      @toggle-appmenu="handleToggleAppmenu"
    />
    <div class="admin-main-content">
      <app-menu 
        :activeIndex="routePath + '/categories'"
        :isCollapse="menuSetting.isCollapse"
      />
      <main class="admin-main-wrap">
        <app-page-title :cateObj="cateObj" />
        <categories-top
          @add-cate="handleToggleAddDialog"
        />
        <categories-tree 
          :categoryTree="categoryList"
          @add-cate="handleToggleAddDialog"
          @delete-cate="clientDeleteOneCate"
          @update-cate="handleToggleUpdateDialog"
        />
        <add-cate-dialog 
          :dialogFormVisible="dialogFormVisible"
          :dialogParentNode="dialogParentNode"
          @add-cate="handleToggleAddDialog"
          @create-new-cate="clientCreateOneCate"
        />
        <edit-cate-dialog 
          :dialogFormVisible="updateFormVisible"
          :form="currentCateData"
          @add-cate="handleToggleUpdateDialog"
          @update-cate="clientUpdateOneCate"
        />
      </main>
    </div>
    <app-footer />
  </div>
</template>

<script>
import siteConf from '~/config/site'

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
import EditCateDialog from '~/components/Admin/Categories/EditCateDialog'

export default {
  data() {
    return {
      routePath: siteConf.adminPath,
      cateObj: {
        cateName: '分类管理',
        pathArray: [
          {
            name: '首页',
            path: siteConf.adminPath
          },
          {
            name: '分类管理',
            path: siteConf.adminPath + '/categories'
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
      dialogParentNode: {},

      // 是否显示更新框
      updateFormVisible: false,
      // 当前选中的链接对象
      currentCateData: {}
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

    // 切换显示编辑框
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
        this.clientGetOneCate(data, () => {
          this.updateFormVisible = bool
        })
      } else {
        this.updateFormVisible = bool
      }
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
    },

    // 客户端拉取单个详情
    clientGetOneCate(node, callback) {
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

      log(node)

      this.$request
        .get(API.categoryDelete + '/' + node._id)
        .then(res => {
          if (res.data.success) {
            this.currentCateData = res.data.data
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

    // 客户端更新友链
    clientUpdateOneCate(data, successCB, failCB) {
      log(data)
      this.$request
        .post(API.categoryUpdate, data)
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
    AddCateDialog,
    EditCateDialog
  }
}
</script>

<style lang="scss" scoped>
</style>
