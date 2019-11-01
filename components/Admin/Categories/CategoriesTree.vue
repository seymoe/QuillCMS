<template>
  <section class="tree-wrap">
    <el-tree
      :data="categoryTree"
      :props="defaultProps"
      :expand-on-click-node="false"
      node-key="_id"
      default-expand-all
      highlight-current
    >
      <span
        slot-scope="{ node, data }"
        class="custom-tree-node"
      >
        <span>{{ node.label }}</span>
        <span>
          <el-button
            v-if="data.children"
            @click="addSubCate(data)"
            class="btn"
            type="primary"
            size="mini"
          >
            添加
          </el-button>
          <el-button
            @click="() => deleteUpdateCate(data)"
            class="btn"
            type="success"
            size="mini"
          >
            编辑
          </el-button>
          <el-button
            @click="() => deleteOneCate(data)"
            class="btn"
            type="danger"
            size="mini"
          >
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
  props: {
    categoryTree: {
      type: Array,
      default: () => {return []}
    }
  },
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'name'
      }
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
    },
    deleteUpdateCate(data) {
      this.$emit('update-cate', true, data)
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
