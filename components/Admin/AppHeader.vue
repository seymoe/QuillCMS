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
            <img v-if="loginState.userInfo.avatar" :src="loginState.userInfo.avatar" :alt="loginState.userInfo.nickname">
            <img v-else src="~/assets/img/avatar.png" :alt="loginState.userInfo.nickname">
            <span>{{ loginState.userInfo.nickname ? loginState.userInfo.nickname : '' }}</span>
          </div>
        </div>
        <transition name="fade">
          <el-card v-show="showPanel" class="panal" :body-style="{ padding: '0px' }">
            <img v-if="loginState.userInfo.avatar" :src="loginState.userInfo.avatar" :alt="loginState.userInfo.nickname">
            <img v-else src="~/assets/img/avatar.png" :alt="loginState.userInfo.nickname">
            <h2>{{ loginState.userInfo.nickname ? loginState.userInfo.nickname : '' }}</h2>
            <p>{{ loginState.userInfo.role === 'super' ? '超级管理员' : '' }}</p>
            <p>{{ loginState.userInfo.role === 'admin' ? '管理员' : '' }}</p>
            <div class="foot">
              <el-button type="text" class="button" @click="clickToFrontEnd">前台</el-button>
              <el-button type="text" class="button" @click="clientUserLogout">退出</el-button>
            </div>
          </el-card>
        </transition>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import API from '~/config/api'

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
    },
    clientUserLogout() {
      this.$request.post(API.userLogout).then(res => {
        if (res.data.success) {
          this.$notify({
            title: '成功',
            message: res.data.message,
            type: 'success'
          })
          setTimeout(() => {
            location.reload()
          }, 300)
        }
      }).catch(err => {
        this.$notify.error({
          title: '错误',
          message: err.message
        })
        setTimeout(() => {
          location.reload()
        }, 300)
      })
    },
    clickToFrontEnd() {
      location.href = '/'
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
      border-radius: 100%;
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
    p{
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
