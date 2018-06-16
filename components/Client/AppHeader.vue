<template>
  <header class="app-header">
    <el-row class="container">
      <el-col :span="18" class="head-left flex-row">
        <h1 class="app-logo">
          <nuxt-link to="/">
            <img src="~/assets/img/logo.png" alt="">
          </nuxt-link>
        </h1>
        <nav class="app-nav flex-row flex-1 hidden-xs-only">
          <nuxt-link class="nav-link active" to="/">首页</nuxt-link>
          <nuxt-link class="nav-link" to="/" 
            v-for="item in topMenuData" 
            :key="item._id">{{ item.name }}</nuxt-link>
        </nav>
      </el-col>
      <el-col :span="6" class="head-right flex-row">
        <div class="unloigin-box flex-row">
          <el-button type="text" class="btn">登陆</el-button>
          <el-button type="text" class="btn">注册</el-button>
        </div>
        <div class="login-box"></div>
      </el-col>
    </el-row>
  </header>
</template>

<script>
export default {
  props: ['topMenuData']
}
</script>


<style lang="scss" scoped>
.app-header{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  box-shadow: 0 0 3px 1px rgba(0,0,0,.1);
  z-index: 100;
}
.head-left{
  align-items: center;
}
.head-right{
  align-items: center;
  justify-content: flex-end;
}
.app-logo{
  margin: 0;
  padding: 10px 0;
  img{
    display: block;
    height: 40px;
  }
}
.app-nav{
  margin-left: 20px;
  .nav-link{
    display: block;
    height: 60px;
    line-height: 60px;
    padding: 0 15px;
    font-size: 16px;
    transition: all .3s;
    &:hover{
      color: #409eff;
    }
  }
  .active{
    color: #409eff;
  }
}
.unloigin-box{
  align-items: center;
  height: 60px;
  .btn{

  }
}
</style>
