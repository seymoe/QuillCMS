<template>
  <div class="app-page">
    <app-header :topMenuData="topMenu"></app-header>
    <section class="app-wrap">
      <el-row class="container main" type="flex" justify="space-between">
        <el-col class="content" :xs="24" :sm="18">
          <index-swiper></index-swiper>
          <index-post-tab></index-post-tab>
        </el-col>
        <el-col class="sidebar" :xs="24" :sm="6">
          <advertise-box></advertise-box>
          <hot-posts></hot-posts>
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
import IndexSwiper from '~/components/Client/Index/IndexSwiper'
import IndexPostTab from '~/components/Client/Index/IndexPostTab'
import AdvertiseBox from '~/components/Client/AdvertiseBox'
import HotPosts from '~/components/Client/HotPosts'
import HotTags from '~/components/Client/HotTags'
import HotCreaters from '~/components/Client/HotCreaters'

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
        return _tree
      }
    })
    .catch(e => {
      return []
    })
}
// 推荐文章
// let serverGetTopPosts = () => {
//   return axios
//     .get(API.weekHot, {
//       params: {
//         limit: 6
//       }
//     })
//     .then(res => {
//       log(res.data)
//       if (res.status === 200) {
//         return res.data
//       }
//     })
//     .catch(e => {
//       return []
//     })
// }
// 最新文章

// 热门标签

// 热门文章

export default {
  layout: 'app',
  data() {
    return {

    }
  },

  async fetch({ store, params }) {
    let topMenuData = await serverGetMenuData()
    store.commit('SET_TOP_MENU', topMenuData)
  },

  computed: mapState([
    'topMenu'
  ]),

  components: {
    AppHeader,
    IndexSwiper,
    IndexPostTab,
    AdvertiseBox,
    HotPosts,
    HotTags,
    HotCreaters
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
