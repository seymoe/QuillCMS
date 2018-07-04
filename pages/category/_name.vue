<template>
  <div class="app-page">
    <app-header 
      :topMenuData="topMenu" 
      :currentNav="cateName"
      :loginState="loginState"></app-header>
    <section class="app-wrap">
      <el-row class="container main" type="flex" justify="space-between">
        <el-col class="content" :xs="24" :sm="18">
          <post-list 
            :cateName="cateName"
            :postList="postsList"></post-list>
        </el-col>
        <el-col class="sidebar" :xs="24" :sm="6">
          <advertise-box></advertise-box>
          <hot-posts :hotPosts="hotPostList"></hot-posts>
          <hot-creaters :hotCreaters="hotCreaters"></hot-creaters>
          <hot-tags :tagList="hotTagList"></hot-tags>
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
import AdvertiseBox from '~/components/Client/AdvertiseBox'
import HotPosts from '~/components/Client/HotPosts'
import HotTags from '~/components/Client/HotTags'
import HotCreaters from '~/components/Client/HotCreaters'
import PostList from '~/components/Client/Post/PostList'

// 服务端请求列表数据
let serverGetMenuData = () => {
  return axios
    .get(API.topMenu, {
      params: {
        mode: 'full'
      }
    })
    .then(res => {
      log(res.data)
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

// 文章列表
let serverGetPostsBycateName = name => {
  return axios
    .get(API.appPostList, {
      params: {
        page: 1,
        limit: 10,
        cateName: name,
        mode: 'normal'
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

// 热门文章
let serverGetHotPosts = name => {
  return axios
    .get(API.appPostList, {
      params: {
        sortBy: 'clicks',
        mode: 'simple',
        cateName: name,
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

// 热门标签
let serverGetHotTags = () => {
  return axios
    .get(API.appTagList, {
      params: {
        isHot: true,
        limit: 5
      }
    })
    .then(res => {
      log(res.data)
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
      cateName: '',
      postsList: [], // 文章列表
      hotPostList: [],
      hotTagList: [],
      // 热门创作人
      hotCreaters: []
    }
  },

  async fetch({ store, params }) {
    let topMenuData = await serverGetMenuData()
    store.commit('SET_TOP_MENU', topMenuData)
  },

  async asyncData({ params }) {
    let [postsList, hotPostList, hotTagList] = await Promise.all([
      serverGetPostsBycateName(params.name),
      serverGetHotPosts(params.name),
      serverGetHotTags()
    ])
    return {
      postsList,
      hotPostList,
      hotTagList,
      cateName: params.name
    }
  },

  methods: {
    clientGetHotCreaters() {
      this.$request
        .get(API.member, {
          params: {
            role: 'member',
            sortBy: 'postsNum',
            limit: 5
          }
        })
        .then(res => {
          if (res.data.success) {
            this.hotCreaters = res.data.data.list
          }
        })
        .catch(e => {
          log(e)
        })
    }
  },

  mounted() {
    this.clientGetHotCreaters()
  },

  computed: mapState(['topMenu', 'loginState']),

  components: {
    AppHeader,
    AdvertiseBox,
    HotPosts,
    HotTags,
    HotCreaters,
    PostList
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
