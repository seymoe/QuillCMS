<template>
  <section class="table-wrap">
    <el-table
      ref="tagTable"
      :data="tableData"
      style="width: 100%"
      tooltip-effect="dark"
      size="small">
        <el-table-column
          label="ID"
          width="100">
          <template slot-scope="scope">{{ scope.row._id }}</template>
        </el-table-column>
        <el-table-column
          label="文章标题">
          <template slot-scope="scope">
            {{ scope.row.post.title }}
          </template>
        </el-table-column>
        <el-table-column
          label="评论内容">
          <template slot-scope="scope">
            {{ scope.row.content }}
          </template>
        </el-table-column>
        <el-table-column
          label="评论人"
          width="120">
          <template slot-scope="scope">
            {{ scope.row.owner.nickname}}
          </template>
        </el-table-column>
        <el-table-column
          label="评论时间"
          width="100">
          <template slot-scope="scope">
            {{ scope.row.create_time}}
          </template>
        </el-table-column>
        <el-table-column
          label="状态"
          width="80">
          <template slot-scope="scope">
            {{ scope.row.enable ? '启用' : '禁用' }}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="140">
          <template slot-scope="scope">
            <div class="btns">
              <el-button @click="handleUpdate(scope.row)" type="info" size="mini">{{ scope.row.enable ? '禁用' : '启用' }}</el-button>
              <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
            </div>
          </template>
        </el-table-column>
    </el-table>
    <div class="pagination-wrap">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="totalCounts"
        :page-size="pageSize">
      </el-pagination>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    tableData: {
      type: Array,
      default: function() {
        return []
      }
    },
    pageSize: {
      type: Number,
      default: 10
    },
    totalCounts: {
      type: Number,
      default: 0
    }
  },
  methods: {
    handleDelete(data) {
      console.log(data)
      this.$emit('delete-comment', data)
    },
    handleUpdate(status) {
      this.$emit('update-comment', status)
    }
  }
}
</script>

<style lang="scss" scoped>
.table-wrap {
  margin-top: 20px;
  padding: 15px;
  background-color: #fff;
}
.btns {
  display: flex;
  justify-content: center;
  align-items: center;
}
.pagination-wrap{
  margin-top: 15px;
  display: flex;
  justify-content: center;
}
</style>

