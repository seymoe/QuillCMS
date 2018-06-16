<template>
  <section class="table-wrap">
    <el-table
      ref="postTable"
      :data="postTableData"
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
          width="80"
          label="推荐">
          <template slot-scope="scope">
            <i :class="{'iconfont': true, 'topicon': true, 'top': scope.row.isTop }">&#xe62a;</i>
          </template>
        </el-table-column>
        <el-table-column
          label="标题">
          <template slot-scope="scope">
            {{ scope.row.title }}
          </template>
        </el-table-column>
        <el-table-column
          width="80"
          label="分类">
          <template slot-scope="scope">
            {{ scope.row.categories[scope.row.categories.length - 1]['name'] }}
          </template>
        </el-table-column>
        <el-table-column
          width="80"
          label="来源">
          <template slot-scope="scope">
            {{ scope.row.from === 0 ? '原创' : '转载' }}
          </template>
        </el-table-column>
        <el-table-column
          width="100"
          label="创建时间">
          <template slot-scope="scope">
            {{ scope.row.create_time }}
          </template>
        </el-table-column>
        <el-table-column
          width="80"
          label="点击数">
          <template slot-scope="scope">
            {{ scope.row.clicks }}
          </template>
        </el-table-column>
        <el-table-column
          width="80"
          label="喜欢数">
          <template slot-scope="scope">
            {{ scope.row.likes }}
          </template>
        </el-table-column>
        <el-table-column
          width="80"
          label="评论数">
          <template slot-scope="scope">
            {{ scope.row.comments.length }}
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
    postTableData: {
      type: Array,
      default: function() {
        return []
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
.topicon{
  font-size: 20px;
  color: #999;
}
.topicon.top{
  color: #409EFF;
}
.btns {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

