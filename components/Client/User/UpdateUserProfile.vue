<template>
  <el-dialog 
    title="更新资料" 
    :visible.sync="showDialog"
    width="40%"
    center
    @close="cancelAddUser">
    <el-form 
      :model="form"
      :rules="addUserRules"
      ref="addUserForm"
      label-position="left"
      label-width="60px">
      <el-form-item label="昵 称" prop="nickname">
        <el-input v-model="form.nickname" size="small" placeholder="请输入昵称"></el-input>
      </el-form-item>
      <el-form-item label="性 别" prop="sex">
        <el-radio v-model="form.sex" :label="1">男</el-radio>
        <el-radio v-model="form.sex" :label="2">女</el-radio>
      </el-form-item>
      <el-form-item label="年 龄" prop="age">
        <el-input type="number" v-model="form.age" size="small" placeholder="请输入年龄"></el-input>
      </el-form-item>
      <el-form-item label="省 份" prop="province">
        <el-input 
          type="text"
          v-model="form.province" 
          size="small" 
          placeholder="请输入省份"></el-input>
      </el-form-item>
      <el-form-item label="城 市" prop="city">
        <el-input 
          type="text"
          v-model="form.city" 
          size="small" 
          placeholder="请输入城市"></el-input>
      </el-form-item>
      <el-form-item label="地 址" prop="address">
        <el-input 
          type="text"
          v-model="form.address" 
          size="small" 
          placeholder="请输入地址"></el-input>
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
// import validate from '~/utils/validate'

export default {
  data() {
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
    // 城市 省份
    let validateCity = (rule, value, callback) => {
      if (value === '') {
        callback()
      } else if (value.length > 10) {
        callback(new Error('长度必须小于10'))
      } else {
        callback()
      }
    }
    // 地址
    let validateAddress = (rule, value, callback) => {
      if (value === '') {
        callback()
      } else if (value.length > 40) {
        callback(new Error('地址不能超过40个字'))
      } else {
        callback()
      }
    }
    return {
      addUserRules: {
        phone: [{ validator: validateNickname, trigger: 'blur' }],
        province: [{ validator: validateCity, trigger: 'blur' }],
        city: [{ validator: validateCity, trigger: 'blur' }],
        address: [{ validator: validateAddress, trigger: 'blur' }]
      }
    }
  },
  props: {
    dialogFormVisible: {
      type: Boolean,
      default: true
    },
    form: {
      type: Object,
      default: function () {
        return {
          _id: '',
          phone: '',
          sex: '',
          age: '',
          province: '',
          city: '',
          address: ''
        }
      }
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
      this.$emit('edit-profile', false)
    },

    // 确定更新成功后关闭Dialog
    confirmAddUser(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = this.form
          data.fakemark = 'quillcms_user_mark_' + Date.now()
          let successCallback = () => {
            this.$refs[formName].resetFields()
            this.$emit('edit-profile', false)
          }
          this.$emit('update-user', data, successCallback)
        } else {
          return false
        }
      })
    }
  }
}
</script>

