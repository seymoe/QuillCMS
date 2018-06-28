<template>
  <section class="user-head flex-column" :style="backgroundDiv">
    <div class="avatar">
      <template v-if="loginState.hasLogin && loginState.userInfo.id === userData._id">
        <el-upload
          class="upload-box"
          :action="uploadAction"
          :before-upload="beforeAvatarUpload"
          :http-request="uploadImage"
          :show-file-list="false"
          >
          <img v-if="!userData.avatar" src="~assets/img/avatar.png" :alt="userData.nickname">
          <img v-else :src="userData.avatar" :alt="userData.nickname">
        </el-upload>
      </template>
      <template v-else>
        <img v-if="!userData.avatar" src="~assets/img/avatar.png" :alt="userData.nickname">
        <img v-else :src="userData.avatar" :alt="userData.nickname">
      </template>
    </div>
    <div class="info">
      <h1>{{ userData.nickname }}</h1>
      <p>{{ userData.signature ? userData.signature : '该用户还没有个性签名' }}</p>
    </div>
    <i v-if="loginState.hasLogin && loginState.userInfo.id === userData._id" class="icon el-icon-setting" @click="editProfile"></i>
  </section>
</template>

<script>
import { log } from '~/utils/util'

export default {
  data() {
    return {
      backgroundDiv: {
        backgroundImage: 'url(' + require('~/assets/img/userbg.jpeg') + ')'
      }
    }
  },
  props: {
    userData: {
      type: Object,
      default: function() {
        return {
          _id: '',
          username: '',
          nickname: '',
          avatar: '',
          signature: ''
        }
      }
    },
    uploadAction: {
      type: String,
      default: ''
    },
    loginState: {
      type: Object,
      default: function () {
        return {
          hasLogin: false,
          userInfo: {
            _id: ''
          }
        }
      }
    }
  },
  methods: {
    // 上传图片相关方法
    beforeAvatarUpload(file) {
      const isJPG =
        file.type === 'image/jpeg' ||
        file.type === 'image/png' ||
        file.type === 'image/gif'
      const isLt1M = file.size / 1024 / 1024 < 1
      if (!isJPG) {
        this.$message({
          message: '上传图片只能是JPG、JPEG、GIF或PNG格式!',
          type: 'error'
        })
      }
      if (!isLt1M) {
        this.$message({
          message: '上传图片大小不能超过 1MB!',
          type: 'error'
        })
      }
      return isJPG && isLt1M
    },
    // 上传图片
    uploadImage(content) {
      log(content)
      let formData = new FormData()
      formData.append('avatar', content.file)
      this.$request
        .post(content.action + '?name=avatar', formData)
        .then(res => {
          if (res.data.success) {
            log('上传成功')
            // 出发图像更新
            let data = {
              _id: this.userData._id,
              avatar: res.data.data
            }
            this.$emit('update-avatar', data)
          }
        })
        .catch(err => {
          log(err)
        })
    },
    editProfile() {
      this.$emit('edit-profile', true)
    }
  }
}
</script>

<style lang="scss" scoped>
.user-head {
  position: relative;
  justify-content: center;
  align-items: center;
  padding: 30px 0;
  background-color: #fff;
  background-size: cover;
  background-position: center;
}
.avatar {
  width: 100px;
  height: 100px;
  border-radius: 100%;
  overflow: hidden;
  /deep/ .el-upload{
    display: block !important;
  }
  img {
    display: block;
    width: 100%;
    height: 100%;
  }
}
.info {
  text-align: center;
  h1 {
    margin: 15px;
    color: #fff;
    font-size: 22px;
  }
  p {
    margin: 0;
    color: #fff;
    font-size: 14px;
  }
}
.icon {
  display: block;
  position: absolute;
  right: 15px;
  top: 15px;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
}
</style>

