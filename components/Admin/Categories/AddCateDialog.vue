<template>
  <el-dialog 
    title="添加分类" 
    :visible.sync="showDialog"
    width="40%"
    center
    @close="cancelAddCate">
    <el-form 
      :model="form"
      label-position="left"
      label-width="80px">
      <el-form-item label="父级分类" v-if="dialogParentNode.parent_id">
        <el-input size="small" disabled :value="dialogParentNode.name"></el-input>
      </el-form-item>
      <el-form-item label="分类名称">
        <el-input v-model="form.name" size="small" placeholder="请输入分类名称"></el-input>
      </el-form-item>
      <el-form-item label="分类描述">
        <el-input v-model="form.description" size="small" placeholder="请输入分类描述"></el-input>
      </el-form-item>
      <el-form-item label="SEO标识">
        <el-input v-model="form.default_url" size="small" placeholder="请输入分类名称对应拼音或英文"></el-input>
      </el-form-item>
      <el-form-item label="是否启用">
        <el-switch
          v-model="form.enable"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
      </el-form-item>
      <el-form-item label="排序">
        <el-input-number size="small" v-model="form.sort_id"></el-input-number>
      </el-form-item>
      <el-form-item label="分类类型">
        <el-select size="small" v-model="form.type" placeholder="请选择分类类型">
          <el-option label="文章" value="1"></el-option>
          <el-option label="专题" value="2"></el-option>
          <el-option label="快讯" value="3"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="cancelAddCate">取 消</el-button>
      <el-button size="small" type="primary" @click="confirmAddCate">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { log } from '~/utils/util'

export default {
  data() {
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

      }
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
      get: function () {
        return this.dialogFormVisible
      },
      set: function () {}
    }
  },
  methods: {
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
    confirmAddCate() {
      log('添加成功')
      this.form = {
        name: '',
        description: '',
        default_url: '',
        enable: true,
        sort_id: 1,
        type: 1
      }
      this.$emit('add-cate', false)
    }
  }
}
</script>

