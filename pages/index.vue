<template>
  <div class="app-page">
    <app-header 
      :topMenuData="topMenu" 
      :loginState="loginState"
      currentNav="首页"></app-header>
    <section class="app-wrap">
      <el-row class="container main" type="flex" justify="space-between">
        <el-col class="content" :xs="24" :sm="18">
          <index-swiper :swiperList="swiperTopList"></index-swiper>
          <index-post-tab
            :tabPostList="newestPostList"></index-post-tab>
        </el-col>
        <el-col class="sidebar" :xs="24" :sm="6">
          <advertise-box></advertise-box>
          <hot-posts :hotPosts="hotPostList"></hot-posts>
          <hot-creaters></hot-creaters>
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
import IndexSwiper from '~/components/Client/Index/IndexSwiper'
import IndexPostTab from '~/components/Client/Index/IndexPostTab'
import AdvertiseBox from '~/components/Client/AdvertiseBox'
import HotPosts from '~/components/Client/HotPosts'
import HotTags from '~/components/Client/HotTags'
import HotCreaters from '~/components/Client/HotCreaters'
import FriendLinkBox from '~/components/Client/FriendLinkBox'

// 服务端请求数据
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

// 轮播图，推荐文章
let serverGetTopPosts = () => {
  return axios
    .get(API.appPostList, {
      params: {
        mode: 'normal',
        isTop: true,
        limit: 6
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

// 最新文章
let serverGetNewestPosts = () => {
  return axios
    .get(API.appPostList, {
      params: {
        mode: 'normal',
        isTop: false,
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
      swiperTopList: [],
      newestPostList: [],
      hotPostList: [],
      hotTagList: []
    }
  },

  async fetch({ store, params }) {
    let topMenuData = await serverGetMenuData()
    let friendLinkData = await serverGetFriendLinks()
    store.commit('SET_TOP_MENU', topMenuData)
    store.commit('SET_FRIEND_LINK', friendLinkData)
  },

  async asyncData() {
    let [
      swiperTopList,
      newestPostList,
      hotPostList,
      hotTagList
    ] = await Promise.all([
      serverGetTopPosts(),
      serverGetNewestPosts(),
      serverGetHotPosts(),
      serverGetHotTags()
    ])
    return {
      swiperTopList,
      hotPostList,
      newestPostList,
      hotTagList
    }
  },

  computed: mapState([
    'loginState',
    'topMenu',
    'friendLink'
  ]),

  components: {
    AppHeader,
    IndexSwiper,
    IndexPostTab,
    AdvertiseBox,
    HotPosts,
    HotTags,
    HotCreaters,
    FriendLinkBox
  }
}
</script>

<style lang="scss" scoped>
.sidebar{
  padding-left: 20px;
  @media screen and (max-width: 767px) {
    padding-left: 0;
  }
}
</style>
