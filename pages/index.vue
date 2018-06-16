<template>
  <div class="app-page">
    <app-header></app-header>
    <section class="app-wrap">
      <el-row class="container main" type="flex" justify="space-between">
        <el-col class="content" :span="18">
          <index-swiper></index-swiper>
          <index-post-tab></index-post-tab>
        </el-col>
        <el-col class="sidebar" :span="6">
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
import AppHeader from '~/components/Client/AppHeader'
import IndexSwiper from '~/components/Client/Index/IndexSwiper'
import IndexPostTab from '~/components/Client/Index/IndexPostTab'
import AdvertiseBox from '~/components/Client/AdvertiseBox'
import HotPosts from '~/components/Client/HotPosts'
import HotTags from '~/components/Client/HotTags'
import HotCreaters from '~/components/Client/HotCreaters'

export default {
  layout: 'app',
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
  margin-left: 20px;
}
</style>
