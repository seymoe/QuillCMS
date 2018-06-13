<template>
  <section class="table-wrap">
    <el-table
      ref="userTable"
      :data="userTableData"
      style="width: 100%"
      tooltip-effect="dark"
      @selection-change="handleSelectionChange"
      size="small">
        <el-table-column
          type="selection"
          width="50">
        </el-table-column>
        <el-table-column
          width="100"
          label="ID">
          <template slot-scope="scope">{{ scope.row._id }}</template>
        </el-table-column>
        <el-table-column
          width="100"
          label="用户名">
          <template slot-scope="scope">
            {{ scope.row.username }}
          </template>
        </el-table-column>
        <el-table-column
          width="100"
          label="昵称">
          <template slot-scope="scope">
            {{ scope.row.nickname }}
          </template>
        </el-table-column>
        <el-table-column
          width="100"
          label="用户类型">
          <template slot-scope="scope">
            {{ scope.row.role === 'super' ? '超级管理员' : '' }}
            {{ scope.row.role === 'admin' ? '管理员' : '' }}
            {{ scope.row.role === 'member' ? '普通会员' : '' }}
          </template>
        </el-table-column>
        <el-table-column
          label="手机号">
          <template slot-scope="scope">
            {{ scope.row.phone ? scope.row.phone : '无' }}
          </template>
        </el-table-column>
        <el-table-column
          label="邮箱">
          <template slot-scope="scope">
            {{ scope.row.email }}
          </template>
        </el-table-column>
        <el-table-column
          width="80"
          label="状态">
          <template slot-scope="scope">
            {{ scope.row.enable ? '启用' : '禁用' }}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="140">
          <template slot-scope="scope">
            <div class="btns">
              <el-button @click="handleClick(scope.row)" type="primary" size="mini">编辑</el-button>
              <el-button type="danger" size="mini" @click="handleDeleteUser(scope.row)">删除</el-button>
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
    return {
      multipleSelection: []
    }
  },
  props: {
    userTableData: {
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
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleDeleteUser(data) {
      console.log(data)
      this.$emit('delete-user', data)
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

