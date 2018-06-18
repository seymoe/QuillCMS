<template>
  <section class="wrap">
    <div class="head">
      <img src="../assets/img/logo.png" alt="">
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
              prefix-icon="el-icon-email"
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
              prefix-icon="el-icon-mobile-phone"
              v-model="form.password">
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
      <div class="other-way">
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
      </div>
    </div>
  </section>
</template>

<script>
import validate from '~/utils/validate'

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
  methods: {
    // submitForm(formName) {
    //   this.$refs[formName].validate((valid) => {
    //     if (valid) {
    //       signinApi(this.form).then(res => {
    //         if (res.success) {
    //           this.$message({
    //             message: '登陆成功',
    //             type: 'success'
    //           })
    //           let _form = {
    //             source: 'form',
    //             email: this.form.email,
    //             password: this.form.password
    //           }
    //           signinApi(_form).then(res => {
    //             if (res.msg === 'ok') {
    //               setTimeout(() => {
    //                 location.replace('/')
    //               }, 1500)
    //             }
    //           })
    //         } else {
    //           this.$message.error(res.msg)
    //         }
    //       }).catch(e => {
    //         this.$message.error('未知错误，请稍后再试')
    //       })
    //     } else {
    //       console.log('error submit!!')
    //       return false
    //     }
    //   })
    // }
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
