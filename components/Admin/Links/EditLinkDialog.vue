<template>
  <el-dialog 
    title="编辑友链" 
    :visible.sync="showDialog"
    width="40%"
    center
    @close="cancelAddLink">
    <el-form 
      :model="form"
      :rules="addCateRules"
      ref="addLinkForm"
      label-position="right"
      label-width="90px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" size="small" placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="desc">
        <el-input v-model="form.desc" size="small" placeholder="请输入描述"></el-input>
      </el-form-item>
      <el-form-item label="链接" prop="link">
        <el-input v-model="form.link" size="small" placeholder="请输入链接地址"></el-input>
      </el-form-item>
      <el-form-item label="图标" prop="cover">
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
      <el-button size="small" @click="cancelAddLink">取 消</el-button>
      <el-button size="small" type="primary" @click="confirmAddLink('addLinkForm')">更 新</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { log } from '~/utils/util'
import validator from 'validator'

export default {
  data() {
    let checkName = (rule, value, callback) => {
      if (value.length > 20) {
        return callback(new Error('名称不能超过20字符'))
      } else {
        callback()
      }
    }

    let checkCover = (rule, value, callback) => {
      if (value) {
        if (value.length > 20) {
          return callback(new Error('图标不能超过20字符'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }

    let checkDesc = (rule, value, callback) => {
      if (value.length > 40) {
        return callback(new Error('描述不能超过40字符'))
      } else {
        callback()
      }
    }

    let checkLink = (rule, value, callback) => {
      if (!validator.isURL(value)) {
        return callback(new Error('请输入链接'))
      } else {
        callback()
      }
    }
    return {
      addCateRules: {
        name: [
          { required: true, message: '名称不能为空' },
          { validator: checkName, trigger: 'blur' }
        ],
        cover: [{ validator: checkCover, trigger: 'blur' }],
        desc: [
          { required: true, message: '描述不能为空' },
          { validator: checkDesc, trigger: 'blur' }
        ],
        link: [
          { required: true, message: '链接地址不能为空' },
          { validator: checkLink, trigger: 'blur' }
        ]
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
          name: '',
          desc: '',
          cover: '',
          link: '',
          enable: true
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
    cancelAddLink() {
      // 弹窗确认一次
      this.form = {
        name: '',
        alias: '',
        cover: '',
        link: '',
        enable: true
      }
      this.$emit('add-link', false)
    },

    // 确定添加，添加成功后关闭Dialog
    confirmAddLink(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = this.form
          let successCallback = () => {
            this.form = {
              name: '',
              alias: '',
              cover: '',
              link: '',
              enable: true
            }
            this.$refs[formName].resetFields()
            this.$emit('add-link', false)
          }
          log(data)
          this.$emit('update-link', data, successCallback)
        } else {
          return false
        }
      })
    }
  }
}
</script>

