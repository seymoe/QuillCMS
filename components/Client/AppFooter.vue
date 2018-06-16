<template>
  <footer class="app-footer">
    <el-row class="container" type="flex" justify="space-between">
      <el-col :span="18">
        <div class="left">
          <h1>
            <img src="~/assets/img/logo.png" alt="">
          </h1>
        </div>
        <div class="right">
          <p>Copyright © 2018 QuillCMS 版权所有 Powered by QuillCMS</p>
        </div>
      </el-col>
    </el-row>
  </footer>
</template>

<style lang="scss" scoped>
.app-footer{
  padding: 15px 0;
  background-color: #2d3237;
  color: #5f676f;
}
.left{
  h1{
    img{
      display: block;
      height: 40px;
    }
  }
}
</style>

