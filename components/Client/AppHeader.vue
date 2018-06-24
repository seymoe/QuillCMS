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
          <nuxt-link :class="{'nav-link': true, 'active': currentNav === '首页'}" to="/">首页</nuxt-link>
          <template v-for="item in topMenuData">
            <nuxt-link 
              v-if="!item.children || item.children.length <= 0"
              :class="{'nav-link': true, 'active': currentNav === item.name}"
              :to="'/category/' + item.name"
              :key="item._id">{{ item.name }}</nuxt-link>

            <el-dropdown v-else :key="item._id">
              <nuxt-link :class="{'nav-link': true, 'el-dropdown-link': true, 'active': currentNav === item.name}" :to="'/category/' + item.name">
                {{ item.name }}<i class="el-icon-arrow-down el-icon--right"></i>
              </nuxt-link>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-for="sub in item.children" :key="sub._id">
                  <nuxt-link :class="{'nav-link': true}"
                    :to="'/category/' + sub.name">{{ sub.name }}</nuxt-link>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </nav>
      </el-col>
      <el-col :span="6" class="head-right flex-row">
        <el-button type="primary" size="mini" class="btn-write" @click="toNewPostPage">写文章</el-button>
        <div v-if="!loginState.hasLogin" class="unloigin-box flex-row">
          <el-button type="text" class="btn" @click="handleSignin">登陆</el-button>
          <el-button type="text" class="btn" @click="handleSignup">注册</el-button>
        </div>
        <div v-else class="login-box flex-row">
          <el-dropdown>
            <div class="avatar">
              <img v-if="loginState.userInfo.avatar" :src="loginState.userInfo.avatar" :alt="loginState.userInfo.nickname">
              <img v-else src="~assets/img/avatar.png" :alt="loginState.userInfo.nickname">
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <nuxt-link :to="'/user/' + loginState.userInfo.id">我的主页</nuxt-link>
              </el-dropdown-item>
              <el-dropdown-item>
                <span @click="clientMemberLogout">退出</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
  </header>
</template>

<script>
import API from '~/config/api'

export default {
  data() {
    return {}
  },
  props: ['topMenuData', 'currentNav', 'loginState'],
  methods: {
    handleSignin() {
      this.$router.push('/signin')
    },
    handleSignup() {
      this.$router.push('/signup')
    },

    // 会员退出登陆
    clientMemberLogout() {
      this.$request
        .post(API.memberLogout)
        .then(res => {
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
        })
        .catch(err => {
          this.$notify.error({
            title: '错误',
            message: err.message
          })
          setTimeout(() => {
            location.reload()
          }, 300)
        })
    },

    // 跳转至发布文章页
    toNewPostPage() {
      if (!this.loginState.hasLogin || !this.loginState.userInfo.id) {
        this.showConfirmBox()
        return false
      } else {
        this.$router.push('/post/new')
      }
    },

    // 提示登陆注册
    showConfirmBox() {
      this.$confirm('您还未登录，请登录后再进行相关操作', '请登陆', {
        confirmButtonText: '去登陆',
        cancelButtonText: '放弃了',
        type: 'info',
        center: true
      })
        .then(() => {
          let fromUrl = '/post/new'
          this.$router.push('/signin?fromUrl=' + fromUrl)
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.1);
  z-index: 100;
}
.head-left {
  align-items: center;
}
.head-right {
  position: relative;
  align-items: center;
  justify-content: flex-end;
}
.app-logo {
  margin: 0;
  padding: 10px 0;
  img {
    display: block;
    height: 40px;
  }
}
.app-nav {
  margin-left: 20px;
  .nav-link {
    display: block;
    height: 60px;
    line-height: 60px;
    padding: 0 15px;
    font-size: 15px;
    transition: all 0.3s;
    color: #333;
    &:hover {
      color: #409eff;
    }
  }
  .active {
    color: #409eff;
  }
}
.unloigin-box {
  margin-left: 15px;
  align-items: center;
  height: 60px;
}
.login-box {
  margin-left: 15px;
  height: 60px;
  align-items: center;
  .avatar {
    cursor: pointer;
    height: 34px;
    width: 34px;
    img {
      display: block;
    }
  }
}
</style>
