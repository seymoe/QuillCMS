<template>
  <el-dialog 
    title="添加用户" 
    :visible.sync="showDialog"
    width="40%"
    center
    @close="cancelAddUser">
    <el-form 
      :model="form"
      :rules="addUserRules"
      ref="addUserForm"
      label-position="right"
      label-width="90px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" size="small" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="昵 称" prop="nickname">
        <el-input v-model="form.nickname" size="small" placeholder="请输入昵称"></el-input>
      </el-form-item>
      <el-form-item label="邮 箱" prop="email">
        <el-input 
          type="email"
          v-model="form.email" 
          size="small" 
          placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item label="密 码" prop="password">
        <el-input 
          type="password"
          v-model="form.password" 
          size="small" 
          placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="启 用" prop="enable">
        <el-switch
          v-model="form.enable"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
      </el-form-item>
      <el-form-item label="角 色" prop="role">
        <el-select size="small" v-model="form.role" placeholder="请选择用户角色">
          <el-option 
            v-for="item in roleOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
              <span>{{ item.label }}</span>
            </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="cancelAddUser">取 消</el-button>
      <el-button size="small" type="primary" @click="confirmAddUser('addUserForm')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// import { log } from '~/utils/util'
import validate from '~/utils/validate'

export default {
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
      } else if (value.length > 10) {
        callback(new Error('昵称长度必须小于10'))
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
        callback(new Error('密码由6-16位字母数字和符号组成'))
      } else {
        callback()
      }
    }
    return {
      form: {
        username: '',
        email: '',
        password: '',
        nickname: '',
        enable: true,
        role: 'member'
      },
      addUserRules: {
        username: [{ required: true, message: '用户名不能为空' }],
        nickname: [
          { required: true, message: '昵称不能为空' },
          { validator: validateNickname, trigger: 'blur' }
        ],
        email: [
          { required: true, message: '邮箱不能为空' },
          { validator: validateEmail, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空' },
          { validator: validatePasswd, trigger: 'blur' }
        ]
      },
      roleOptions: [
        {
          value: 'admin',
          label: '管理员'
        },
        {
          value: 'member',
          label: '普通会员'
        }
      ]
    }
  },
  props: {
    dialogFormVisible: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    showDialog: {
      get: function() {
        return this.dialogFormVisible
      },
      set: function() {}
    }
  },
  methods: {
    // 取消，关闭弹出框
    cancelAddUser() {
      // 弹窗确认一次
      this.form = {
        nickname: '',
        username: '',
        email: '',
        password: '',
        enable: true,
        role: 'member'
      }
      this.$emit('add-user', false)
    },

    // 确定添加，添加成功后关闭Dialog
    confirmAddUser(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = this.form
          let successCallback = () => {
            this.form = {
              nickname: '',
              username: '',
              email: '',
              password: '',
              enable: true,
              role: 'member'
            }
            this.$refs[formName].resetFields()
            this.$emit('add-user', false)
          }
          this.$emit('create-new-user', data, successCallback)
        } else {
          return false
        }
      })
    }
  }
}
</script>

