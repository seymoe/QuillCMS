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
          width="50"
          label="ID">
          <template slot-scope="scope">{{ scope.row.id }}</template>
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
            {{ scope.row.role }}
          </template>
        </el-table-column>
        <el-table-column
          label="手机号">
          <template slot-scope="scope">
            {{ scope.row.phone }}
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
          label="是否有效">
          <template slot-scope="scope">
            {{ scope.row.status ? '是' : '否' }}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="140">
          <template slot-scope="scope">
            <div class="btns">
              <el-button @click="handleClick(scope.row)" type="primary" size="mini">编辑</el-button>
              <el-button type="danger" size="mini">删除</el-button>
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
    userTableData: {
      type: Array,
      default: function() {
        return [
          {
            id: 1,
            username: 'admin',
            nickname: '曦莫琅',
            role: 'super',
            phone: '15073171302',
            email: 'ximolang@yeah.net',
            status: true
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
</style>

