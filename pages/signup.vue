<template>
  <section class="wrap">
    <div class="head">
      <img src="../assets/img/logo.png" alt="">
    </div>
    <div class="signin-box">
      <div class="top">
        <h1>账户注册</h1>
        <nuxt-link to="/signin">已有账号，立即登录 ></nuxt-link>
      </div>
      <div class="form">
        <el-form :model="form" status-icon :rules="rule" ref="form">
          <el-form-item prop="email">
            <el-input class="input"
              placeholder="邮箱地址"
              prefix-icon="el-icon-mobile-phone"
              v-model="form.email">
            </el-input>
          </el-form-item>
          <el-form-item prop="nickname">
            <el-input class="input"
              minlength="1"
              maxlength="20"
              placeholder="你的昵称"
              prefix-icon="el-icon-mobile-phone"
              v-model="form.nickname">
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input class="input"
              type="password"
              minlength="6"
              maxlength="16"
              placeholder="设置密码"
              prefix-icon="el-icon-mobile-phone"
              v-model="form.password">
            </el-input>
          </el-form-item>
          <el-form-item prop="confirmPassword">
            <el-input class="input"
              type="password"
              minlength="6"
              maxlength="16"
              placeholder="确认密码"
              prefix-icon="el-icon-mobile-phone"
              v-model="form.confirmPassword">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="btn-submit" type="success" @click="submitForm('form')">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="info">
        <p>点击 “注册” 即表示您同意并愿意遵守跨界猿用户协议和隐私政策。</p>
      </div>
    </div>
  </section>
</template>

<script>
import validate from '~/utils/validate'

export default {
  layout: 'single',
  data() {
    // 校验邮箱
    let validateEmail = (rule, value, callback) => {
      value = value.trim()
      if (value === '') {
        callback(new Error('邮箱不能为空'))
      } else if (!validate.checkEmail(value)) {
        callback(new Error('邮箱格式错误'))
      } else {
        callback()
      }
    }
    // 校验昵称
    let validateNickname = (rule, value, callback) => {
      value = value.trim()
      if (value === '') {
        callback(new Error('请填写昵称'))
      } else {
        callback()
      }
    }
    // 校验密码
    let validatePasswd = (rule, value, callback) => {
      value = value.trim()
      if (value === '') {
        callback(new Error('密码不能为空'))
      } else if (!validate.checkPass(value)) {
        callback(new Error('密码格式错误'))
      } else {
        callback()
      }
    }
    // 校验再次确认密码
    let confirmPasswd = (rule, value, callback) => {
      value = value.trim()
      if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }
    return {
      form: {
        email: '',
        password: '',
        nickname: '',
        confirmPassword: ''
      },
      rule: {
        email: [
          { validator: validateEmail, trigger: 'blur' }
        ],
        nickname: [
          { validator: validateNickname, trigger: 'blur' }
        ],
        password: [
          { validator: validatePasswd, trigger: 'blur' }
        ],
        confirmPassword: [
          { validator: confirmPasswd, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // submitForm(formName) {
    //   this.$refs[formName].validate((valid) => {
    //     if (valid) {
    //       signupApi(this.form).then(res => {
    //         if (res.success) {
    //           this.$message({
    //             message: '注册成功',
    //             type: 'success'
    //           })
    //           setTimeout(() => {
    //             location.replace('/')
    //           }, 1500)
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
.wrap{
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items:center;
}
.head{
  margin: 50px 0;
}
.head img{
  display: block;
  height: 40px;
}
.signin-box{
  width: 400px;
  padding: 40px;
  margin-bottom: 40px;
  box-sizing: border-box;
  background-color: #fff;
}
.top{
  display: flex;
  justify-content: space-between;
  line-height: 40px;
}
.top h1,.top a{
  height: 40px;
  margin: 0 0 10px;
}
.form .input{
  margin-bottom: 15px;
}
.form-foot{
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}
.btn-submit{
  width: 100%;
  letter-spacing: 5px;
  text-indent: 5px;
}
.info{
  text-align: center;
  line-height: 24px;
}
@media screen and (max-width: 414px) {
  .head{
    margin: 30px auto;
  }
  .signin-box{
    width: 100%;
    margin-bottom: 0;
  }
}
</style>
