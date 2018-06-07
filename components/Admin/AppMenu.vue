<template>
  <aside class="app-menu">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose">
      <el-menu-item index="1">
        <i class="iconfont">&#xe61a;</i>
        <span slot="title">数据面板</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="iconfont">&#xe602;</i>
        <span slot="title">用户管理</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="iconfont">&#xe67d;</i>
        <span slot="title">文章管理</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="iconfont">&#xe69a;</i>
        <span slot="title">评论管理</span>
      </el-menu-item>
      <el-menu-item index="5">
        <i class="iconfont">&#xe601;</i>
        <span slot="title">分类管理</span>
      </el-menu-item>
      <el-menu-item index="6">
        <i class="iconfont">&#xe6a4;</i>
        <span slot="title">标签管理</span>
      </el-menu-item>
      <el-menu-item index="7">
        <i class="iconfont">&#xe674;</i>
        <span slot="title">广告管理</span>
      </el-menu-item>
      <el-menu-item index="8">
        <i class="iconfont">&#xe636;</i>
        <span slot="title">友链管理</span>
      </el-menu-item>
      <el-submenu index="9">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span>系统管理</span>
        </template>
        <el-menu-item index="9-1">站点设置</el-menu-item>
        <el-menu-item index="9-1">轮播管理</el-menu-item>
      </el-submenu>
    </el-menu>
  </aside>
</template>

<script>
export default {
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
  position: absolute;
  top: 0;
  left: 0;
  width: 200px;
  min-height: 100%;
  background-color: #fff;
  border-right: 1px solid #e6e6e6;
  overflow-x: hidden;
  overflow-y: scroll;
  .iconfont{
    margin-right: 4px;
    font-size: 18px;
  }
}
</style>

