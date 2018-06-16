<template>
  <div class="page-title">
    <h1>{{ cateObj.cateName }}</h1>
    <el-breadcrumb separator="/" class="page-title-bread">
      <el-breadcrumb-item 
        v-if="cateObj.pathArray.length > 0" 
        v-for="(item, index) in cateObj.pathArray"
        :key="index"
        :to="{ path: item.path }"
        >{{ item.name }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  props: {
    cateObj: {
      type: Object,
      default: function() {
        return {
          cateName: '仪表盘',
          pathArray: [
            {
              name: '首页',
              path: '/admin'
            },
            {
              name: '仪表盘',
              path: ''
            }
          ]
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.page-title {
  display: flex;
  justify-content: space-between;
  line-height: 50px;
  padding: 0 15px;
  h1{
    margin: 0;
    height: 50px;
    color: #475669;
    font-size: 18px;
  }
}
.page-title-bread{
  display: flex;
  align-items: center;
}
</style>

