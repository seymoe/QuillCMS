<template>
  <div class="app-header">
    <el-row>
      <!-- <el-col :span="2">
        <h1 class="logo"></h1>
      </el-col> -->
      <el-col :span="24" class="header-right">
        <span class="btn-collapse" 
          :style="{'margin-left': spanPostion + 'px'}"
          @click="toggleAppMenu">
          <i class="iconfont">&#xe601;</i>
        </span>
        <div class="box">
          <i class="el-icon-bell">
            <!-- <span></span> -->
          </i>
          <i class="el-icon-message">
            <!-- <span></span> -->
          </i>
          <div class="avatar" 
            @click="handleTogglePanel"
            v-click-outside="handleOutsideClickMenu">
            <img src="~/assets/img/avatar.png" alt="">
            <span>{{ loginState.userInfo.username ? loginState.userInfo.username : '' }}</span>
          </div>
        </div>
        <transition name="fade">
          <el-card v-show="showPanel" class="panal" :body-style="{ padding: '0px' }">
            <img src="~/assets/img/avatar.png" alt="">
            <h2>{{ loginState.userInfo.username ? loginState.userInfo.username : '' }}</h2>
            <div class="foot">
              <el-button type="text" class="button">设置</el-button>
              <el-button type="text" class="button">退出</el-button>
            </div>
          </el-card>
        </transition>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showPanel: false
    }
  },
  props: ['spanPostion', 'loginState'],
  methods: {
    handleTogglePanel() {
      this.showPanel = !this.showPanel
    },
    // 外部点击
    handleOutsideClickMenu() {
      if (this.showPanel) {
        this.showPanel = false
      }
    },
    toggleAppMenu() {
      this.$emit('toggle-appmenu')
    }
  }
}
</script>


<style lang="scss" scoped>
.app-header {
  padding: 0 15px;
  background-color: #fff;
}
.logo,
.welcome {
  margin: 0;
  line-height: 50px;
  color: #409eff;
}
.header-right {
  position: relative;
  display: flex;
  justify-content: space-between;
  .btn-collapse{
    display: block;
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    cursor: pointer;
    transition: all .5s;
    &:hover{
      color: #409eff;
    }
    i{
      font-size: 20px;
    }
  }
  .box {
    display: flex;
    justify-content: flex-end;
    height: 50px;
    color: #409eff;
    i {
      position: relative;
      width: 40px;
      display: block;
      line-height: 50px;
      text-align: center;
      font-size: 18px;
      transition: all 0.3s;
      cursor: pointer;
      span{
        position: absolute;
        right: 6px;
        top: 14px;
        width: 10px;
        height: 10px;
        background-color: red;
        display: block;
        border-radius: 50%;
      }
      &:hover {
        background-color: #f8f8f8;
      }
    }
  }
  .avatar {
    padding: 0 10px;
    display: flex;
    align-content: center;
    transition: all 0.3s;
    cursor: pointer;
    &:hover {
      background-color: #f8f8f8;
    }
    > img {
      display: block;
      width: 30px;
      height: 30px;
      margin-top: 10px;
    }
    > span {
      display: block;
      height: 30px;
      line-height: 30px;
      margin-top: 10px;
      margin-left: 5px;
    }
  }
  .panal {
    position: absolute;
    right: 0;
    top: 55px;
    width: 150px;
    z-index: 10;
    img {
      margin: 20px auto;
      display: block;
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
    h2 {
      margin: 20px 0;
      text-align: center;
    }
    div.foot {
      display: flex;
      justify-content: space-around;
      background-color: #f8f8f8;
    }
  }
}
</style>
