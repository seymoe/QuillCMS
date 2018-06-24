<template>
  <div class="app-page">
    <app-header 
      :topMenuData="topMenu"
      :loginState="loginState"></app-header>
    <section class="app-wrap">
      <el-row class="container main" type="flex" justify="space-between">
        <el-col class="content" :xs="24" :sm="18">
          <user-head 
            :userData="userData"
            :loginState="loginState"
            :uploadAction="uploadAction"
            @update-avatar="handleUpdateAvatar"></user-head>
        </el-col>
        <el-col class="sidebar" :xs="24" :sm="6">
          <hot-posts :hotPosts="hotPostList"></hot-posts>
          <hot-creaters></hot-creaters>
          <hot-tags></hot-tags>
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
import HotPosts from '~/components/Client/HotPosts'
import HotTags from '~/components/Client/HotTags'
import HotCreaters from '~/components/Client/HotCreaters'

import UserHead from '~/components/Client/User/UserHead'

// 服务端请求数据
let serverGetMenuData = () => {
  return axios
    .get(API.topMenu, {
      params: {
        mode: 'full'
      }
    })
    .then(res => {
      // log(res.data)
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

// 用户详情
let serverGetUserData = userId => {
  return axios
    .get(API.member + '/' + userId)
    .then(res => {
      log(res.data)
      if (res.data.success) {
        return res.data.data
      }
    })
    .catch(e => {
      return {}
    })
}

// 热门文章
let serverGetHotPosts = () => {
  return axios
    .get(API.appPostList, {
      params: {
        sortBy: 'clicks',
        mode: 'simple',
        limit: 5
      }
    })
    .then(res => {
      if (res.data.success) {
        return res.data.data.list
      }
    })
    .catch(e => {
      return []
    })
}

export default {
  layout: 'app',
  data() {
    return {
      userId: '',
      userData: {},
      hotPostList: [],
      // 用户图像相关
      uploadAction: API.appUploadImage
    }
  },

  async fetch({ store, params }) {
    let topMenuData = await serverGetMenuData()
    store.commit('SET_TOP_MENU', topMenuData)
  },

  async asyncData({ params }) {
    let [hotPostList, userData] = await Promise.all([
      serverGetHotPosts(),
      serverGetUserData(params.id)
    ])
    return {
      hotPostList,
      userData,
      userId: params.id
    }
  },

  methods: {
    // 更新会员头像
    handleUpdateAvatar(data) {
      this.$request
        .post(API.member + '/avatar', data)
        .then(res => {
          if (res.data.success) {
            this.$notify({
              title: '成功',
              message: res.data.message,
              type: 'success'
            })
            this.clientGetUserData(data._id)
          }
        })
        .catch(err => {
          log(err)
          this.$notify.error({
            title: '错误',
            message: err.message
          })
        })
    },

    // 拉取用户资料
    clientGetUserData(userId) {
      this.$request
        .get(API.member + '/' + userId)
        .then(res => {
          if (res.data.success) {
            this.userData = res.data.data
          }
        })
        .catch(e => {
          log(e)
        })
    }
  },

  computed: mapState(['topMenu', 'loginState']),

  components: {
    AppHeader,
    HotPosts,
    HotTags,
    HotCreaters,
    UserHead
  }
}
</script>

<style lang="scss" scoped>
.sidebar {
  padding-left: 20px;
  @media screen and (max-width: 767px) {
    padding-left: 0;
  }
}
</style>
