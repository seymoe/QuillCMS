<template>
  <div class="app-page">
    <app-header 
      :topMenuData="topMenu"
      :loginState="loginState"></app-header>
    <section class="app-wrap">
      <el-row class="container main" type="flex" justify="space-between">
        <el-col :xs="24" :sm="18">
          <div class="title-box flex-row">
            <el-input type="text" class="title flex-1" placeholder="输入文章标题..." v-model="postFormData.title">
              <template slot="append">{{ postFormData.title.length }}/40</template>
            </el-input>
          </div>
          <div class="desc-box">
            <el-input type="text" class="desc" placeholder="输入文章简介..." v-model="postFormData.description">
              <template slot="append">{{ postFormData.description.length }}/80</template>
            </el-input>
          </div>
          <div class="content-box">
            <markdown-editor :data="postFormData"></markdown-editor>
          </div>
        </el-col>
        <el-col :xs="24" :sm="6" style="background: #fff">
          <div class="sidebar">
            <div class="box">
              <h3>上传封面图</h3>
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
                  <p class="el-upload__text">JPG、JPEG、GIF或PNG格式</p>
                </template>
              </el-upload>
            </div>
            <div class="box">
              <h3>选择分类</h3>
              <el-cascader
                class="select"
                expand-trigger="hover"
                :options="topMenu"
                :props="cateProps"
                placeholder="选择文章分类"
                v-model="postFormData.categories">
              </el-cascader>
            </div>
            <div class="box">
              <h3>选择标签</h3>
              <el-select
                class="select"
                v-model="postFormData.tags"
                multiple
                filterable
                allow-create
                placeholder="选择文章标签"
                @change="handleTagChange">
                <el-option
                  v-for="item in tagList"
                  :key="item._id"
                  :label="item.name"
                  :value="item._id">
                </el-option>
              </el-select>
            </div>
            <div class="box flex-row">
              <el-button class="btn-post" type="primary" size="small" @click="clientSubmitNewPost" :disabled="submiting">发布</el-button>
              <el-button class="btn-post" type="info" size="small" :disabled="submiting">存为草稿</el-button>
            </div>
          </div>
        </el-col>
      </el-row>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'
import API from '~/config/api'
import { log, arrayToTree } from '~/utils/util'
import AppHeader from '~/components/Client/AppHeader'
import MarkdownEditor from '~/components/Common/MarkdownEditor'

// 服务端请求数据
let serverGetMenuData = () => {
  return axios
    .get(API.topMenu, {
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
        return _tree
      }
    })
    .catch(e => {
      return []
    })
}

// 校验发布文章
let checkPostForm = formData => {
  let { title, description, content, categories } = formData
  if (title.length <= 0 || title.length > 40) {
    return {
      status: false,
      msg: '标题长度为0-40个字符'
    }
  } else if (description.length <= 0 || description.length > 80) {
    return {
      status: false,
      msg: '简介长度为0-80个字符'
    }
  } else if (content.length <= 0) {
    return {
      status: false,
      msg: '正文不能为空'
    }
  } else if (categories.length <= 0) {
    return {
      status: false,
      msg: '请选择一个分类'
    }
  }

  return {
    status: true,
    msg: '校验成功'
  }
}

export default {
  layout: 'app',
  data() {
    return {
      // 文章相关
      postFormData: {
        title: '',
        cover: '',
        description: '',
        content: '',
        author: '',
        auth: 'public',
        state: 'published',
        categories: [],
        tags: []
      },
      // 上传图片API
      uploadAction: API.appUploadImage,
      // 文章分类
      cateProps: {
        value: '_id',
        label: 'name',
        children: 'children'
      },
      // 文章标签
      tagList: [],

      submiting: false
    }
  },

  async fetch({ store, params }) {
    let topMenuData = await serverGetMenuData()
    store.commit('SET_TOP_MENU', topMenuData)
  },

  async asyncData({ params }) {
    // let [] = await Promise.all([])
    // return {}
  },

  computed: mapState(['topMenu', 'loginState']),

  methods: {
    // 客户端拉取标签列表
    clientGetTagList() {
      this.$request
        .get(API.appTagList, {
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

    // 选择标签
    handleTagChange(value) {
      if (value.length > 3) {
        this.$message({
          message: '每篇文章最多能添加3个标签'
        })
        this.postFormData.tags = value.slice(0, 3)
      }
    },

    // 发表文章
    clientSubmitNewPost() {
      let data = this.postFormData
      // 判断是否登陆
      if (!this.loginState.hasLogin || !this.loginState.userInfo.id) {
        this.showConfirmBox()
        return false
      }
      // 表单校验
      let checkResult = checkPostForm(data)
      if (!checkResult.status) {
        this.$message({
          type: 'warning',
          message: checkResult.msg
        })
        return false
      }

      // 是否正在提交
      if (this.submiting) return false
      this.submiting = true

      data.fakemark = 'quillcms_post_mark_' + Date.now()
      data.author = this.loginState.userInfo.id

      log(data)
      this.$request
        .post(API.appPostNew, data)
        .then(res => {
          if (res.data.success) {
            this.$notify({
              title: '成功',
              message: res.data.message,
              type: 'success'
            })
            // 成功之后清除表单，跳转至用户主页
            this.postFormData = {
              title: '',
              cover: '',
              description: '',
              content: '',
              author: '',
              auth: 'public',
              state: 'published',
              categories: [],
              tags: []
            }
            this.submiting = false
            setTimeout(() => {
              this.$router.push('/user/' + this.loginState.userInfo.id)
            }, 500)
          }
        })
        .catch(err => {
          log(err)
          this.$notify.error({
            title: '错误',
            message: err.message
          })
          this.submiting = false
        })
    },

    // 提示登陆注册
    showConfirmBox() {
      this.$confirm('您还未登录，请登录后再进行相关操作', '请登陆', {
        confirmButtonText: '去登陆',
        cancelButtonText: '放弃了',
        type: 'info',
        center: true
      })
        .then(() => {
          let fromUrl = '/post/new'
          this.$router.push('/signin?fromUrl=' + fromUrl)
        })
        .catch(() => {})
    }
  },

  mounted() {
    this.clientGetTagList()
  },

  components: {
    AppHeader,
    MarkdownEditor
  }
}
</script>

<style lang="scss" scoped>
.sidebar {
  background-color: #fff;
  padding: 0 15px 15px 15px;
  border-left: 1px solid #f8f8f8;
  @media screen and (max-width: 767px) {
    padding-left: 0;
  }
}
.title-box {
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: #fff;
  .title {
    font-size: 28px;
    /deep/ .el-input__inner {
      padding-left: 0;
      border: none;
    }
    /deep/ .el-input-group__append {
      background-color: #fff;
      border: none;
      font-size: 16px;
    }
  }
}
.desc-box {
  padding: 0 15px 15px 15px;
  background-color: #fff;
  .desc {
    font-size: 16px;
    /deep/ .el-input__inner {
      padding-left: 0;
      border: none;
    }
    /deep/ .el-input-group__append {
      background-color: #fff;
      border: none;
      font-size: 16px;
    }
  }
}

// 右侧边栏
.box {
  padding: 15px 0 0 0;
  h3 {
    margin: 0 0 15px 0;
    color: #666;
  }
  .upload-box {
    width: 100%;
    height: 100%;
    /deep/ .el-upload {
      width: 100%;
    }
    /deep/ .el-upload-dragger {
      width: 100% !important;
      height: 146px;
      background-color: #f8f8f8;
      border-radius: 0 !important;
      .el-upload__text {
        margin: 0;
        line-height: 1.8;
        color: #999;
      }
    }
  }
  .el-cascader,
  .select {
    width: 100%;
  }
  .btn-post {
    display: block;
    width: 50%;
  }
}
</style>
