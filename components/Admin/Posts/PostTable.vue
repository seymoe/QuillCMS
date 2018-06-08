<template>
  <section class="table-wrap">
    <el-table
      ref="postTable"
      :data="postTableData"
      tooltip-effect="dark"
      @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          width="50"
          label="ID">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column
          width="50"
          label="推荐">
          <template slot-scope="scope">
            {{ scope.row.isTop }}
          </template>
        </el-table-column>
        <el-table-column
          width="180"
          label="标题">
          <template slot-scope="scope">
            {{ scope.row.title }}
          </template>
        </el-table-column>
        <el-table-column
          width="100"
          label="分类">
          <template slot-scope="scope">
            {{ scope.row.category }}
          </template>
        </el-table-column>
        <el-table-column
          width="50"
          label="来源">
          <template slot-scope="scope">
            {{ scope.row.from }}
          </template>
        </el-table-column>
        <el-table-column
          width="180"
          label="创建时间">
          <template slot-scope="scope">
            {{ scope.row.create_time }}
          </template>
        </el-table-column>
        <el-table-column
          width="100"
          label="点击数">
          <template slot-scope="scope">
            {{ scope.row.clicks }}
          </template>
        </el-table-column>
        <el-table-column
          width="100"
          label="喜欢数">
          <template slot-scope="scope">
            {{ scope.row.likes }}
          </template>
        </el-table-column>
        <el-table-column
          width="100"
          label="评论数">
          <template slot-scope="scope">
            {{ scope.row.comments }}
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <div class="btns">
              <el-button @click="handleClick(scope.row)" type="primary" size="mini">编辑</el-button>
              <el-button type="danger" size="mini">编辑</el-button>
            </div>
          </template>
        </el-table-column>
    </el-table>
  </section>
</template>

<script>
export default {
  data() {
    return {
      multipleSelection: []
    }
  },
  props: {
    postTableData: {
      type: Array,
      default: function () {
        return [
          {
            id: 1,
            isTop: true,
            title: 'QuillCMS正在开发中...',
            category: '其他',
            from: '来源',
            create_time: '2018-06-08',
            clicks: 301,
            likes: 20,
            comments: 12,
            author: 'admin'
          }
        ]
      }
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>

<style lang="scss" scoped>
.table-wrap{
  margin-top: 20px;
  padding: 0 15px;
  background-color: #fff;
}
.btns{
  display: flex;
}
</style>

