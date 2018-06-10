<template>
  <section class="tree-wrap">
    <el-tree
      :data="categoryTree"
      node-key="_id"
      :props="defaultProps"
      default-expand-all
      highlight-current
      :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button
            class="btn"
            v-if="data.children"
            type="primary"
            size="mini"
            @click="addSubCate(data)">
            添加
          </el-button>
          <el-button
            class="btn"
            type="success"
            size="mini"
            @click="() => deleteOneCate(data)">
            编辑
          </el-button>
          <el-button
            class="btn"
            type="danger"
            size="mini"
            @click="() => deleteOneCate(data)">
            删除
          </el-button>
        </span>
      </span>
    </el-tree>
  </section>
</template>

<script>
import { log } from '~/utils/util'

export default {
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  props: {
    categoryTree: {
      type: Array,
      default: []
    }
  },
  methods: {
    // 添加子类目
    addSubCate(data) {
      this.$emit('add-cate', true, data)
    },
    // 删除一个分类
    deleteOneCate(data) {
      if (data.children && data.children.length > 0) {
        this.$notify.error({
          title: '错误',
          message: '该分类含有下级分类，请先删除下级分类再进行操作'
        })
        return false
      } else {
        this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            // 继续删除
            this.$emit('delete-cate', data)
          })
          .catch(() => {
            log('取消删除')
          })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tree-wrap {
  margin-top: 20px;
  padding: 15px;
  background-color: #fff;
  /deep/ .el-tree-node__content {
    height: 40px;
  }
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
  .btn{
    border-radius: 0;
  }
}
</style>
