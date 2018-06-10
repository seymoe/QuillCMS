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
            type="primary"
            size="mini"
            @click="addSubCate(data)">
            添加
          </el-button>
          <el-button
            type="success"
            size="mini"
            @click="() => remove(node, data)">
            编辑
          </el-button>
          <el-button
            type="danger"
            size="mini"
            @click="() => remove(node, data)">
            删除
          </el-button>
        </span>
      </span>
    </el-tree>
  </section>
</template>

<script>
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
    addSubCate(node) {
      console.log(node)
      this.$emit('add-cate', true, node)
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
}
</style>
