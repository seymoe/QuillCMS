<template>
  <section class="wrap">
    <div class="head">
      <nuxt-link to="/">
        <img src="../assets/img/logo.png" alt="">
      </nuxt-link>
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
              prefix-icon="el-icon-message"
              v-model="form.email">
            </el-input>
          </el-form-item>
          <el-form-item prop="username">
            <el-input class="input"
              minlength="4"
              maxlength="16"
              placeholder="用户名，4-16位字母 数字 _ - 组成"
              v-model="form.username">
              <i slot="prefix" class="el-input__icon iconfont" style="position:relative;left: 5px;">&#xe604;</i>
            </el-input>
          </el-form-item>
          <el-form-item prop="nickname">
            <el-input class="input"
              minlength="1"
              maxlength="10"
              placeholder="你的昵称"
              v-model="form.nickname">
              <i slot="prefix" class="el-input__icon iconfont" style="position:relative;left: 5px;">&#xe604;</i>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input class="input"
              type="password"
              minlength="8"
              maxlength="16"
              placeholder="设置密码"
              v-model="form.password">
              <i slot="prefix" class="el-input__icon iconfont" style="position:relative;left: 5px;">&#xe62d;</i>
            </el-input>
          </el-form-item>
          <el-form-item prop="confirmPassword">
            <el-input class="input"
              type="password"
              minlength="8"
              maxlength="16"
              placeholder="确认密码"
              v-model="form.confirmPassword">
              <i slot="prefix" class="el-input__icon iconfont" style="position:relative;left: 5px;">&#xe62d;</i>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="btn-submit" type="success" @click="submitForm('form')">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="info">
        <p>点击 “注册” 即表示您同意并愿意遵守QuillCMS用户协议和隐私政策。</p>
      </div>
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
    // 校验邮箱
    let validateEmail = (rule, value, callback) => {
      if (!validate.checkEmail(value)) {
        callback(new Error('邮箱格式错误'))
      } else {
        callback()
      }
    }
    // 校验昵称
    let validateNickname = (rule, value, callback) => {
      if (value.length > 10) {
        callback(new Error('昵称不能超过10个字符'))
      } else {
        callback()
      }
    }

    // 校验用户名
    let validateUsername = (rule, value, callback) => {
      if (!validate.checkUserName(value)) {
        callback(new Error('用户名格式由4-16位字母、数字、_、-组成'))
      } else {
        callback()
      }
    }

    // 校验密码
    let validatePasswd = (rule, value, callback) => {
      if (!validate.checkPass(value)) {
        callback(new Error('密码格式错误'))
      } else {
        callback()
      }
    }

    // 校验再次确认密码
    let confirmPasswd = (rule, value, callback) => {
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
          { required: true, message: '请输入邮箱' },
          { validator: validateEmail, trigger: 'blur' }
        ],
        username: [
          { required: true, message: '请输入用户名' },
          { validator: validateUsername, trigger: 'blur' }
        ],
        nickname: [
          { required: true, message: '请输入昵称' },
          { validator: validateNickname, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码' },
          { validator: validatePasswd, trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: '请确认密码' },
          { validator: confirmPasswd, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = this.form
          data.fakemark = 'quillcms_user_mark_' + Date.now()
          this.$request.post(API.memberRegist, data).then(res => {
            log(res.data)
            if (res.data.success) {
              this.$message({
                message: '注册成功，赶快登陆去吧',
                type: 'success'
              })
              this.$refs[formName].resetFields()
              setTimeout(() => {
                location.replace('/login')
              }, 500)
            }
          }).catch(e => {
            this.$message.error('未知错误，请重试')
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
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
