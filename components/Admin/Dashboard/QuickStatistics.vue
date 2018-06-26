<template>
  <section class="quick-statistics">
    <h2>数据预览</h2>
    <el-row class="quick-wrap" type="flex" justify="space-between">
      <el-col :span="5">
        <div class="box">
          <div>
            <p>用户统计</p>
            <h3 style="color: #409EFF">{{ quickData.usersCount }}</h3>
          </div>
          <div class="usericon">
            <i class="iconfont">&#xe602;</i>
          </div>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="box">
          <div>
            <p>文档统计</p>
            <h3 style="color: #67C23A">{{ quickData.docsCount }}</h3>
          </div>
          <div class="posticon">
            <i class="iconfont">&#xe67d;</i>
          </div>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="box">
          <div>
            <p>留言统计</p>
            <h3 style="color: #8061EF">{{ quickData.commentsCount }}</h3>
          </div>
          <div class="commenticon">
            <i class="iconfont">&#xe69a;</i>
          </div>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="box">
          <div>
            <p>收入统计</p>
            <h3 style="color: #F56C6C">¥ {{ quickData.incomeCount }}</h3>
          </div>
          <div class="inicon">
            <i class="iconfont">&#xe645;</i>
          </div>
        </div>
      </el-col>
    </el-row>
  </section>
</template>

<script>
export default {
  props: ['quickData']
}
</script>


<style lang="scss" scoped>
.quick-statistics{
  padding: 0 15px;
  h2{
    font-size: 16px;
    color: #909399;
  }
}
.quick-wrap{
  .box{
    padding: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    p{
      margin: 0;
      color: #B7B7B7;
      text-indent: 20px;
    }
    h3{
      margin: 0;
      font-size: 26px;
      text-indent: 20px;
    }
    div{
      &:last-child{
        width: 50px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        i{
          font-size: 26px;
          color: #fff;
        }
      }
    }
  }
}
.usericon{
  background-color: #409EFF;
}
.posticon{
  background-color: #67C23A;
}
.commenticon{
  background-color: #8061EF;
}
.inicon{
  background-color: #F56C6C;
}
</style>
