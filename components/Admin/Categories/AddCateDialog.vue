<template>
  <el-dialog 
    title="添加分类" 
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
      <el-form-item label="父级分类" v-if="dialogParentNode.parent_id">
        <el-input size="small" disabled :value="dialogParentNode.name"></el-input>
      </el-form-item>
      <el-form-item label="分类名称" prop="name">
        <el-input v-model="form.name" size="small" placeholder="请输入分类名称"></el-input>
      </el-form-item>
      <el-form-item label="分类描述" prop="description">
        <el-input 
          type="textarea"
          :rows="2" 
          v-model="form.description" 
          size="small" 
          placeholder="请输入分类描述"></el-input>
      </el-form-item>
      <el-form-item label="SEO标识" prop="default_url">
        <el-input v-model="form.default_url" size="small" placeholder="1-32位字母、数字、-、_组成"></el-input>
      </el-form-item>
      <el-form-item label="是否启用" prop="enable">
        <el-switch
          v-model="form.enable"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
      </el-form-item>
      <el-form-item label="排序" prop="sort_id">
        <el-input-number size="small" v-model="form.sort_id"></el-input-number>
      </el-form-item>
      <el-form-item label="分类类型" prop="type">
        <el-select size="small" v-model="form.type" placeholder="请选择分类类型">
          <el-option 
            v-for="item in typeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"></el-option>
        </el-select>
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
      if (value.length > 10) {
        return callback(new Error('分类名称不能超过10字符'))
      } else {
        callback()
      }
    }

    let checkDescription = (rule, value, callback) => {
      if (value) {
        if (value.length > 40) {
          return callback(new Error('分类描述不能超过40字符'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }

    let checkSeoURL = (rule, value, callback) => {
      if (!/^[a-zA-Z0-9_-]{1,32}$/.test(value)) {
        return callback(new Error('SEO标识由1-32位字母、数字、-、_组成'))
      } else {
        callback()
      }
    }
    return {
      form: {
        name: '',
        description: '',
        default_url: '',
        enable: true,
        sort_id: 1,
        type: 1
      },
      addCateRules: {
        name: [
          { required: true, message: '分类名称不能为空' },
          { validator: checkName, trigger: 'blur' }
        ],
        description: [{ validator: checkDescription, trigger: 'blur' }],
        default_url: [
          { required: true, message: 'SEO标识不能为空' },
          { validator: checkSeoURL, trigger: 'blur' }
        ]
      },
      typeOptions: [
        {
          value: 1,
          label: '文章'
        },
        {
          value: 2,
          label: '专题'
        },
        {
          value: 3,
          label: '快讯'
        }
      ]
    }
  },
  props: {
    dialogFormVisible: {
      type: Boolean,
      default: true
    },
    dialogParentNode: {
      type: Object,
      default: {}
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
        description: '',
        default_url: '',
        enable: true,
        sort_id: 1,
        type: 1
      }
      this.$emit('add-cate', false)
    },

    // 确定添加，添加成功后关闭Dialog
    confirmAddCate(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = this.form
          let successCallback = () => {
            this.form = {
              name: '',
              description: '',
              default_url: '',
              enable: true,
              sort_id: 1,
              type: 1
            }
            this.$refs[formName].resetFields()
            this.$emit('add-cate', false)
          }
          data.parent_id = this.dialogParentNode._id
            ? this.dialogParentNode._id
            : '0'
          log(data)
          this.$emit('create-new-cate', data, successCallback)
        } else {
          return false
        }
      })
    }
  }
}
</script>

