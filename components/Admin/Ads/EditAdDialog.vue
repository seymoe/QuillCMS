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
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" size="small" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="desc">
        <el-input v-model="form.desc" size="small" placeholder="请输入描述"></el-input>
      </el-form-item>
      <el-form-item label="链接" prop="link">
        <el-input v-model="form.link" size="small" placeholder="请输入链接地址"></el-input>
      </el-form-item>
      <!-- 上传图片 -->
      <el-form-item label="图片" prop="cover">
        <el-upload
          class="upload-box"
          drag
          :action="uploadAction"
          :before-upload="beforeAvatarUpload"
          :http-request="uploadImage"
          :show-file-list="false"
          >
          <template v-if="form.cover">
            <img :src="form.cover" alt="">
          </template>
          <template v-else>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em>任何JPG,JPEG,PNG,或GIF最高可达1MB</div>
          </template>
        </el-upload>
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
import API from '~/config/api'

export default {
  data() {
    let checkTitle = (rule, value, callback) => {
      if (value.length > 40) {
        return callback(new Error('标题不能超过40字符'))
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
      if (value !== '' && !validator.isURL(value)) {
        return callback(new Error('请输入链接'))
      } else {
        callback()
      }
    }
    return {
      addCateRules: {
        title: [
          { required: true, message: '标题不能为空' },
          { validator: checkTitle, trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '描述不能为空' },
          { validator: checkDesc, trigger: 'blur' }
        ],
        link: [
          { validator: checkLink, trigger: 'blur' }
        ]
      },
      // 文件上传API
      uploadAction: API.uploadImage
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
          title: '',
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
      this.$emit('add-ad', false)
    },

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
      formData.append('advertise', content.file)
      this.$request
        .post(content.action + '?name=advertise', formData)
        .then(res => {
          if (res.data.success) {
            log('上传成功')
            this.form.cover = res.data.data
          }
        })
        .catch(err => {
          log(err)
        })
    },

    // 确定添加，添加成功后关闭Dialog
    confirmAddLink(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = this.form
          let successCallback = () => {
            this.$refs[formName].resetFields()
            this.$emit('add-ad', false)
          }
          log(data)
          this.$emit('update-ad', data, successCallback)
        } else {
          return false
        }
      })
    }
  }
}
</script>

