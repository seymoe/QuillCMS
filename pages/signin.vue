<template>
  <section class="wrap">
    <div class="head">
      <nuxt-link to="/">
        <img src="../assets/img/logo.png" alt="">
      </nuxt-link>
    </div>
    <div class="signin-box">
      <div class="top">
        <h1>账户登录</h1>
        <nuxt-link to="/signup">立即注册 ></nuxt-link>
      </div>
      <div class="form">
        <el-form :model="form" status-icon :rules="rule" ref="form">
          <el-form-item prop="email">
            <el-input 
              class="input"
              placeholder="邮箱地址"
              prefix-icon="el-icon-message"
              v-model="form.email">
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input 
              minlength="6"
              maxlength="16"
              class="input"
              type="password"
              placeholder="密码"
              v-model="form.password">
              <i slot="prefix" class="el-input__icon iconfont" style="position:relative;left: 3px;">&#xe62d;</i>
            </el-input>
          </el-form-item>
          <div class="form-foot">
            <el-checkbox v-model="checked">记住账号</el-checkbox>
            <span class="forgot-passwd">忘记密码？</span>
          </div>
          <el-form-item>
            <el-button class="btn-submit" type="primary" @click="submitForm('form')">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- <div class="other-way">
        <div class="title">
          <span>社交账号登录</span>
        </div>
        <div class="ways">
          <div class="wayitem">
            <img src="../assets/img/logo.png" alt="">
            <span>微信登录</span>
          </div>
          <div class="wayitem">
            <img src="../assets/img/logo.png" alt="">
            <span>Github登录</span>
          </div>
        </div>
      </div> -->
    </div>
  </section>
</template>

<script>
import validate from '~/utils/validate'
import API from '~/config/api'
import { log } from '~/utils/util'

export default {
  layout: 'single',
  data() {
    // 校验邮箱和密码
    let validateEmail = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('邮箱不能为空'))
      } else if (!validate.checkEmail(value)) {
        callback(new Error('邮箱格式错误'))
      } else {
        callback()
      }
    }
    let validatePasswd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('密码不能为空'))
      } else if (!validate.checkPass(value)) {
        callback(new Error('密码格式错误'))
      } else {
        callback()
      }
    }
    return {
      formUrl: '',
      form: {
        email: '',
        password: ''
      },
      checked: true,
      rule: {
        email: [
          { validator: validateEmail, trigger: 'blur' }
        ],
        password: [
          { validator: validatePasswd, trigger: 'blur' }
        ]
      }
    }
  },

  asyncData({ query }) {
    log(query)
    return {
      fromUrl: query.fromUrl
    }
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = this.form
          data.fakemark = 'quillcms_login_mark_' + Date.now()
          this.$request.post(API.memberLogin, data).then(res => {
            if (res.data.success) {
              this.$notify({
                title: '成功',
                message: res.data.message,
                type: 'success'
              })
              // 如果记住密码的选项为选中状态，则本地存储Email账户
              if (this.checked) {
                localStorage.setItem('login_email', data.email)
              } else {
                localStorage.removeItem('login_email')
              }
              setTimeout(() => {
                let url = '/'
                if (this.fromUrl) {
                  url = this.fromUrl
                }
                location.href = url
              }, 300)
            }
          }).catch(err => {
            log(err)
            this.$notify({
              title: '错误',
              message: err.message,
              type: 'danger'
            })
            this.$refs[formName].resetFields()
          })
        } else {
          log('error submit!!')
          return false
        }
      })
    }
  },

  mounted() {
    // 如果存储了Email，则取出来
    let localEmail = localStorage.getItem('login_email')
    if (localEmail && validate.checkEmail(localEmail)) {
      this.form.email = localEmail
    }
  }
}
</script>


<style scoped>
.wrap {
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.head {
  margin: 50px 0;
}
.head img {
  display: block;
  height: 40px;
}
.signin-box {
  width: 400px;
  padding: 40px;
  margin-bottom: 40px;
  box-sizing: border-box;
  background-color: #fff;
}
.top {
  display: flex;
  justify-content: space-between;
  line-height: 40px;
}
.top h1,
.top a {
  height: 40px;
  margin: 0 0 10px;
}

.form-foot {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}
.btn-submit {
  width: 100%;
  letter-spacing: 5px;
  text-indent: 5px;
}
.other-way {
  margin-top: 50px;
}
.title {
  display: flex;
  justify-content: center;
}
.title span {
  position: relative;
}
.ways {
  display: flex;
  justify-content: center;
}
.wayitem {
  margin: 10px 0;
  width: 25%;
  text-align: center;
  font-size: 13px;
}
.wayitem img {
  display: block;
  width: 30px;
  height: 30px;
  margin: 0 auto 5px;
}
@media screen and (max-width: 414px) {
  .head {
    margin: 30px auto;
  }
  .signin-box {
    width: 100%;
    margin-bottom: 0;
  }
}
</style>
