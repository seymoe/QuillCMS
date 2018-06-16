<template>
  <div class="admin-page">
    <app-header 
      :spanPostion="menuSetting.btnPosition"
      :loginState="loginState"
      @toggle-appmenu="handleToggleAppmenu"></app-header>
    <div class="admin-main-content">
      <app-menu 
        activeIndex="/admin/posts"
        :isCollapse="menuSetting.isCollapse"></app-menu>
      <main class="admin-main-wrap">
        <app-page-title :cateObj="cateObj"></app-page-title>
        <post-new-top
          :postFormData="postFormData"></post-new-top>
        <section class="editbox">
          <el-form
            :model="postFormData"
            :rules="addPostRules"
            ref="addPostForm"
            label-position="left"
            label-width="90px">
            <div class="flex-row">
              <el-form-item label="标  题" prop="title">
                <el-input class="short-input" v-model="postFormData.title" size="small" placeholder="请输入标题"></el-input>
              </el-form-item>
              <el-form-item label="副标题" prop="sub_title">
                <el-input class="short-input" v-model="postFormData.sub_title" size="small" placeholder="请输入副标题"></el-input>
              </el-form-item>
            </div>
            <el-form-item label="简  介" prop="description">
              <el-input class="short-input" type="textarea" row="3" v-model="postFormData.description" size="small" placeholder="请输入简介"></el-input>
            </el-form-item>
            <div class="flex-row">
              <el-form-item label="文章分类" prop="categories">
                <el-cascader
                  class="select"
                  expand-trigger="hover"
                  :options="categoryList"
                  :props="cateProps"
                  v-model="postFormData.categories">
                </el-cascader>
              </el-form-item>
              <el-form-item label="文章标签" prop="tags">
                <el-select
                  class="select"
                  v-model="postFormData.tags"
                  multiple
                  filterable
                  allow-create
                  placeholder="请选择文章标签"
                  @change="handleTagChange">
                  <el-option
                    v-for="item in tagList"
                    :key="item._id"
                    :label="item.name"
                    :value="item._id">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
            <markdown-editor
              :data="postFormData"></markdown-editor>
            <div class="form-footer flex-row">
              <el-button type="primary" size="small">保存</el-button>
              <el-button type="danger" size="small">取消</el-button>
            </div>
            </el-form>
        </section>
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
import PostNewTop from '~/components/Admin/Posts/PostNewTop'
import MarkdownEditor from '~/components/Common/MarkdownEditor'

export default {
  data() {
    return {
      cateObj: {
        cateName: '新增文章',
        pathArray: [
          {
            name: '首页',
            path: '/admin'
          },
          {
            name: '文章管理',
            path: '/admin/posts'
          },
          {
            name: '新增',
            path: '/admin/posts/new'
          }
        ]
      },
      menuSetting: {
        btnPosition: 145,
        isCollapse: false
      },

      addPostRules: {},

      //  可供选择的分类列表
      categoryList: [],
      cateProps: {
        value: '_id',
        label: 'name',
        children: 'children'
      },

      // 可供选择和创建的文章标签
      tagList: [],

      // 文章相关
      postFormData: {
        title: '',
        sub_title: '',
        cover: '',
        discription: '',
        content: '',
        author: '',
        auth: 'public',
        state: 'published',
        isTop: false,
        from: 0,
        categories: [],
        tags: [],
        content_type: 'M'
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
    },

    // 选择标签
    handleTagChange(value) {
      if (value.length > 3) {
        this.$message({
          message: '每篇文章最多能添加3个标签'
        })
        this.postFormData.tags = value.slice(0, 3)
      }
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
            _tree.forEach(item => {
              if (item.children.length === 0) {
                delete item.children
              }
            })
            this.categoryList = _tree
          }
        })
        .catch(e => {
          log(e)
        })
    },

    // 客户端拉取标签列表请求
    clientGetTagList() {
      this.$request
        .get(API.tagList, {
          params: {
            mode: 'full'
          }
        })
        .then(res => {
          if (res.data.success) {
            this.tagList = res.data.data.list
          }
        })
        .catch(e => {
          log(e)
        })
    }
  },
  computed: mapState(['loginState']),
  mounted() {
    this.clientGetCategoryList()
    this.clientGetTagList()
  },
  components: {
    AppHeader,
    AppFooter,
    AppMenu,
    AppPageTitle,
    PostNewTop,
    MarkdownEditor
  }
}
</script>

<style lang="scss" scoped>
.editbox {
  background-color: #fff;
  padding: 15px 30px;
  .flex-row {
    justify-content: space-between;
    .el-form-item {
      width: 48%;
      .select{
        width: 100%;
      }
    }
  }
  .form-footer{
    padding: 15px 0;
    justify-content: flex-start;
    .btn{
      margin-right: 20px;
    }
  }
}
</style>

