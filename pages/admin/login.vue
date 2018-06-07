<template>
  <div class="admin-login-page">
    <section class="container wrap">
      <div class="loginbox">
        <h1>QuillCMS</h1>
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
              prefix-icon="el-icon-mobile-phone"
              v-model="form.password">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="btn-submit" type="primary" @click="submitForm('form')">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
      <p class="footer">Powered By QuillCMS</p>
    </section>
  </div>
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
      rule: {
        email: [{ validator: validateEmail, trigger: 'blur' }],
        password: [{ validator: validatePasswd, trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log('success')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap{
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #56CCF2;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to bottom, #2F80ED, #56CCF2);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to bottom, #2F80ED, #56CCF2); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.loginbox {
  width: 400px;
  padding: 50px;
  margin-bottom: 40px;
  box-sizing: border-box;
  background-color: rgba(255,255,255,0.2);
  border-radius: 10px;
  h1{
    margin-top: 0;
    font-size: 26px;
    text-align: center;
    color: #fff;
    text-shadow: 0 1px 5px rgba(255,255,255,0.2);
  }
}
.btn-submit {
  width: 100%;
  letter-spacing: 5px;
  text-indent: 5px;
}
.footer{
  color: #fff;
}
@media screen and (max-width: 414px) {
  .loginbox {
    width: 90%;
    margin-bottom: 0;
    padding: 30px;
  }
}
</style>
