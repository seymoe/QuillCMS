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
            :postList="postsData.list"></post-list>
          <div class="loading" v-if="meta.isLoading">加载中...</div>
          <div class="loadmore" 
            v-if="!meta.isLoading && !meta.noMore"
            @click="clientGetPostsData">查看更多</div>
          <div class="nomore"
            v-if="!meta.isLoading && meta.noMore">已经到底了</div>
        </el-col>
        <el-col class="sidebar" :xs="24" :sm="6">
          <advertise-box></advertise-box>
          <hot-posts :hotPosts="hotPostList"></hot-posts>
          <hot-creaters :hotCreaters="hotCreaters"></hot-creaters>
          <hot-tags :tagList="hotTagList"></hot-tags>
        </el-col>
      </el-row>
    </section>
    <friend-link-box :friendLinks="friendLink"></friend-link-box>
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
import FriendLinkBox from '~/components/Client/FriendLinkBox'

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

// 友情链接
let serverGetFriendLinks = () => {
  return axios
    .get(API.friendLink, {
      params: {
        limit: 10
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
        return res.data.data
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
      postsData: {}, // 文章列表
      hotPostList: [],
      hotTagList: [],
      // 热门创作人
      hotCreaters: [],

      meta: {
        isLoading: false,
        noMore: false,
        page: 1,
        lastPage: 1,
        limit: 10
      }
    }
  },

  async fetch({ store, params }) {
    let topMenuData = await serverGetMenuData()
    let friendLinkData = await serverGetFriendLinks()
    store.commit('SET_FRIEND_LINK', friendLinkData)
    store.commit('SET_TOP_MENU', topMenuData)
  },

  async asyncData({ params }) {
    let [postsData, hotPostList, hotTagList] = await Promise.all([
      serverGetPostsBycateName(params.name),
      serverGetHotPosts(params.name),
      serverGetHotTags()
    ])
    return {
      postsData,
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
    },
    // 客户端拉取文章列表
    clientGetPostsData() {
      let { isLoading, page, lastPage, limit } = this.meta
      if (isLoading) return false
      this.meta.isLoading = true

      if (page + 1 > lastPage) {
        // 没有更多的数据了
        this.meta.noMore = true
        this.meta.isLoading = false
        return false
      }

      // 开始拉取
      this.$request
        .get(API.appPostList, {
          params: {
            mode: 'normal',
            cateName: this.cateName,
            page: page + 1,
            limit: limit
          }
        })
        .then(res => {
          if (res.data.success) {
            let _data = res.data.data
            let _list = res.data.data.list
            if (this.postsData.list.length > 0) {
              _list = this.postsData.list.concat(_list)
            }
            _data.list = _list
            this.postsData = _data

            // 判断还有没有分页
            let _page = this.postsData.page
            let _lastpage = this.postsData.lastPage
            this.meta = {
              isLoading: false,
              noMore: (_page + 1) > _lastpage,
              page: _page,
              lastPage: _lastpage,
              limit: this.postsData.pageSize
            }
          }
        })
        .catch(e => {
          log(e)
          this.meta.isLoading = false
        })
    }
  },

  mounted() {
    this.clientGetHotCreaters()
    // 初始化列表相关信息
    let _page = this.postsData.page
    let _lastpage = this.postsData.lastPage
    this.meta = {
      isLoading: false,
      noMore: (_page + 1) > _lastpage,
      page: _page,
      lastPage: _lastpage,
      limit: this.postsData.pageSize
    }
  },

  computed: mapState(['topMenu', 'loginState', 'friendLink']),

  components: {
    AppHeader,
    AdvertiseBox,
    HotPosts,
    HotTags,
    HotCreaters,
    PostList,
    FriendLinkBox
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
.loadmore, .nomore, .loading{
  margin-top: 15px;
  padding: 15px 0;
  text-align: center;
  background-color: #fff;
}
.loadmore{
  cursor: pointer;
  transition: all .3s;
  font-weight: bold;
  color: #666;
  &:hover{
    background-color: #409eff;
    color: #fff;
  }
}
</style>
