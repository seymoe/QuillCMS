<template>
  <el-dialog 
    title="添加标签" 
    :visible.sync="showDialog"
    width="40%"
    center
    @close="cancelAddCate">
    <el-form 
      :model="form"
      :rules="addCateRules"
      ref="addCateForm"
      label-position="right"
      label-width="90px">
      <el-form-item label="标签名称" prop="name">
        <el-input v-model="form.name" size="small" placeholder="请输入分类名称"></el-input>
      </el-form-item>
      <el-form-item label="标签别名" prop="alias">
        <el-input v-model="form.alias" size="small" placeholder="1-20位字母、数字、-、_组成"></el-input>
      </el-form-item>
      <el-form-item label="标签图标" prop="cover">
        <el-input v-model="form.cover" size="small" placeholder="iconfont图标"></el-input>
      </el-form-item>
      <el-form-item label="是否启用" prop="enable">
        <el-switch
          v-model="form.enable"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="cancelAddCate">取 消</el-button>
      <el-button size="small" type="primary" @click="confirmAddCate('addCateForm')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { log } from '~/utils/util'

export default {
  data() {
    let checkName = (rule, value, callback) => {
      if (value.length > 20) {
        return callback(new Error('标签名称不能超过20字符'))
      } else {
        callback()
      }
    }

    let checkCover = (rule, value, callback) => {
      if (value) {
        if (value.length > 20) {
          return callback(new Error('标签图标不能超过20字符'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }

    let checkAlias = (rule, value, callback) => {
      if (!/^[a-zA-Z0-9_-]{1,20}$/.test(value)) {
        return callback(new Error('SEO标识由1-32位字母、数字、-、_组成'))
      } else {
        callback()
      }
    }
    return {
      form: {
        name: '',
        alias: '',
        cover: '',
        enable: true
      },
      addCateRules: {
        name: [
          { required: true, message: '标签名称不能为空' },
          { validator: checkName, trigger: 'blur' }
        ],
        cover: [{ validator: checkCover, trigger: 'blur' }],
        alias: [
          { required: true, message: '别名不能为空' },
          { validator: checkAlias, trigger: 'blur' }
        ]
      }
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
    cancelAddCate() {
      // 弹窗确认一次
      this.form = {
        name: '',
        alias: '',
        cover: '',
        enable: true
      }
      this.$emit('add-tag', false)
    },

    // 确定添加，添加成功后关闭Dialog
    confirmAddCate(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = this.form
          let successCallback = () => {
            this.form = {
              name: '',
              alias: '',
              cover: '',
              enable: true
            }
            this.$refs[formName].resetFields()
            this.$emit('add-tag', false)
          }
          log(data)
          this.$emit('create-new-tag', data, successCallback)
        } else {
          return false
        }
      })
    }
  }
}
</script>

