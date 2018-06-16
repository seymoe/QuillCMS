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

        </el-col>
      </el-row>
    </section>
  </div>
</template>

<script>
import AppHeader from '~/components/Client/AppHeader'
import IndexSwiper from '~/components/Client/Index/IndexSwiper'
import IndexPostTab from '~/components/Client/Index/IndexPostTab'

export default {
  layout: 'app',
  components: {
    AppHeader,
    IndexSwiper,
    IndexPostTab
  }
}
</script>
