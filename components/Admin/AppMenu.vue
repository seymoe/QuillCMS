<template>
  <aside class="app-menu" :style="{ 'width': isCollapse ? '65px' : '160px' }">
    <div class="menu-top-box">
      <h1 v-if="!isCollapse">QUILLCMS</h1>
      <h1 v-else>Q</h1>
    </div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-vertical-demo"
      background-color="#409eff"
      text-color="#fff"
      active-text-color="#ffd04b"
      :router="true"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse">
      <el-menu-item :index="routePath">
        <i class="iconfont">&#xe61a;</i>
        <span slot="title">仪表盘</span>
      </el-menu-item>
      <el-menu-item :index="routePath + '/users'">
        <i class="iconfont">&#xe602;</i>
        <span slot="title">用户管理</span>
      </el-menu-item>
      <el-menu-item :index="routePath + '/posts'">
        <i class="iconfont">&#xe67d;</i>
        <span slot="title">文章管理</span>
      </el-menu-item>
      <el-menu-item :index="routePath + '/categories'">
        <i class="iconfont">&#xe601;</i>
        <span slot="title">分类管理</span>
      </el-menu-item>
      <el-menu-item :index="routePath + '/comments'">
        <i class="iconfont">&#xe69a;</i>
        <span slot="title">评论管理</span>
      </el-menu-item>
      <el-menu-item :index="routePath + '/tags'">
        <i class="iconfont">&#xe6a4;</i>
        <span slot="title">标签管理</span>
      </el-menu-item>
      <el-menu-item :index="routePath + '/ads'">
        <i class="iconfont">&#xe674;</i>
        <span slot="title">广告管理</span>
      </el-menu-item>
      <el-menu-item :index="routePath + '/links'">
        <i class="iconfont">&#xe636;</i>
        <span slot="title">友链管理</span>
      </el-menu-item>
      <!-- <el-submenu :index="routePath + '/system'">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span>系统管理</span>
        </template>
        <el-menu-item :index="routePath + '/system/site'">站点设置</el-menu-item>
        <el-menu-item :index="routePath + '/system/slider'">轮播管理</el-menu-item>
      </el-submenu> -->
    </el-menu>
  </aside>
</template>

<script>
import siteConf from '~/config/site'

export default {
  data() {
    return {
      routePath: siteConf.adminPath
    }
  },
  props: {
    activeIndex: {
      type: String,
      default: siteConf.adminPath
    },
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="scss" scoped>
.app-menu{
  margin-top: -50px;
  margin-bottom: -50px;
  min-height: 100%;
  background-color: #409eff;
  border-right: 1px solid #e6e6e6;
  overflow-x: hidden;
  overflow-y: scroll;
  transition: all .5s;
  i{
    margin-right: 4px;
    font-size: 18px;
    color: #fff;
  }
  .el-menu{
    border-right: none;
    .el-menu-item.is-active i{
      color: rgb(255, 208, 75);
    }
  }
}
.menu-top-box{
  height: 100px;
  line-height: 100px;
  background-color: #3796f7;
  h1{
    margin: 0;
    color: #fff;
    text-align: center;
    font-size: 24px;
  }
}
</style>

