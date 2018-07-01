<template>
  <div class="admin-page">
    <app-header 
      :spanPostion="menuSetting.btnPosition"
      :loginState="loginState"
      @toggle-appmenu="handleToggleAppmenu"></app-header>
    <div class="admin-main-content">
      <app-menu 
        :activeIndex="routePath + '/posts'"
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
                  placeholder="请选择文章分类"
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
            <!-- 上传图片 -->
            <el-form-item label="配图" prop="cover">
              <el-upload
                class="upload-box"
                drag
                :action="uploadAction"
                :before-upload="beforeAvatarUpload"
                :http-request="uploadImage"
                :show-file-list="false"
                >
                <template v-if="postFormData.cover">
                  <img :src="postFormData.cover" alt="">
                </template>
                <template v-else>
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em>任何JPG,JPEG,PNG,或GIF最高可达1MB</div>
                </template>
              </el-upload>
            </el-form-item>
            <markdown-editor
              :data="postFormData"></markdown-editor>
            <div class="form-footer flex-row">
              <el-button type="primary" size="small" @click="submitPost('addPostForm')">保存</el-button>
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
import siteConf from '~/config/site'

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
    let checkTitle = (rule, value, callback) => {
      if (value.length > 40) {
        return callback(new Error('标题不能超过40个字符'))
      } else {
        callback()
      }
    }
    let checkSubTitle = (rule, value, callback) => {
      if (value.length > 40) {
        return callback(new Error('副标题不能超过40个字符'))
      } else {
        callback()
      }
    }
    let checkDescription = (rule, value, callback) => {
      if (value.length > 80) {
        return callback(new Error('简介不能超过80个字符'))
      } else {
        callback()
      }
    }
    return {
      routePath: siteConf.adminPath,
      cateObj: {
        cateName: '编辑文章',
        pathArray: [
          {
            name: '首页',
            path: siteConf.adminPath
          },
          {
            name: '文章管理',
            path: siteConf.adminPath + '/posts'
          },
          {
            name: '编辑',
            path: ''
          }
        ]
      },
      menuSetting: {
        btnPosition: 145,
        isCollapse: false
      },

      addPostRules: {
        title: [
          { required: true, message: '标题不能为空' },
          { validator: checkTitle, trigger: 'blur' }
        ],
        sub_title: [{ validator: checkSubTitle, trigger: 'blur' }],
        description: [
          { required: true, message: '简介不能为空' },
          { validator: checkDescription, trigger: 'blur' }
        ],
        categories: [{ required: true, message: '分类不能为空' }]
      },

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
      postId: '',
      postFormData: {
        title: '',
        sub_title: '',
        cover: '',
        description: '',
        content: '',
        author: '',
        auth: 'public',
        state: 'published',
        isTop: false,
        from: 0,
        categories: [],
        tags: [],
        content_type: 'M'
      },

      // 文件上传API
      uploadAction: API.uploadImage
    }
  },

  async asyncData({ params }) {
    return {
      postId: params.id
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

    // 客户端拉取文章详情
    clientGetPostDetail(postId) {
      this.$request
        .get(API.postDelete + '/' + postId, {
          params: {
            getFrom: 'server'
          }
        })
        .then(res => {
          if (res.data.success) {
            let _data = res.data.data
            if (_data.categories.length > 0) {
              let _ids = []
              _data.categories.forEach(item => {
                _ids.push(item._id)
              })
              _data.categories = _ids
            }
            if (_data.tags.length > 0) {
              let _ids = []
              _data.tags.forEach(item => {
                _ids.push(item._id)
              })
              _data.tags = _ids
            }
            this.postFormData = _data
          }
        })
        .catch(e => {
          log(e)
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
    },

    // 上传图片相关方法
    beforeAvatarUpload(file) {
      const isJPG =
        file.type === 'image/jpeg' ||
        file.type === 'image/png' ||
        file.type === 'image/gif'
      const isLt1M = file.size / 1024 / 1024 < 1

      if (!isJPG) {
        this.$message({
          message: '上传图片只能是JPG、JPEG、GIF或PNG格式!',
          type: 'error'
        })
      }
      if (!isLt1M) {
        this.$message({
          message: '上传图片大小不能超过 1MB!',
          type: 'error'
        })
      }
      return isJPG && isLt1M
    },

    // 上传图片
    uploadImage(content) {
      log(content)
      let formData = new FormData()
      formData.append('cover', content.file)
      this.$request
        .post(content.action + '?name=cover', formData)
        .then(res => {
          if (res.data.success) {
            log('上传成功')
            this.postFormData.cover = res.data.data
          }
        })
        .catch(err => {
          log(err)
        })
    },

    // 提交文章
    submitPost(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = this.postFormData
          let successCB = () => {
            this.postFormData = {
              title: '',
              sub_title: '',
              cover: '',
              description: '',
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
            this.$refs[formName].resetFields()

            setTimeout(() => {
              this.$router.push(siteConf.adminPath + '/posts')
            })
          }
          // 校验文章内容是否为空
          if (data.content === '') {
            this.$message({
              message: '请输入文章内容'
            })
            return false
          }

          data.fakemark = 'quillcms_post_mark_' + Date.now()
          data.author = this.loginState.userInfo.id
          data._id = this.postId

          log(data)
          this.$request
            .post(API.postUpdate, data)
            .then(res => {
              if (res.data.success) {
                this.$notify({
                  title: '成功',
                  message: res.data.message,
                  type: 'success'
                })
                successCB && successCB()
              }
            })
            .catch(err => {
              log(err)
              this.$notify.error({
                title: '错误',
                message: err.message
              })
            })
        } else {
          return false
        }
      })
    }
  },
  computed: mapState(['loginState']),
  mounted() {
    this.clientGetCategoryList()
    this.clientGetTagList()
    this.clientGetPostDetail(this.postId)
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
.upload-box {
  width: 100%;
  height: 100%;
  .el-upload {
    width: 100%;
  }
  .el-upload-dragger {
    width: 100% !important;
    height: 146px;
    background-color: #eeeeee;
    .el-upload__text{
      line-height: 1.8;
    }
  }
}
</style>

