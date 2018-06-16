<template>
  <section class="post-top">
    <div class="left">
      <span class="label">文本格式</span>
      <el-radio-group v-model="postFormData.content_type" size="mini">
        <el-radio-button label="M">Markdown</el-radio-button>
        <!-- <el-radio-button label="T">富文本</el-radio-button> -->
      </el-radio-group>
      <span class="label">文章权限</span>
      <el-radio-group v-model="postFormData.auth" size="mini">
        <el-radio-button label="public">公开</el-radio-button>
        <el-radio-button label="secret">私密</el-radio-button>
      </el-radio-group>
      <span class="label">文章来源</span>
      <el-radio-group v-model="postFormData.from" size="mini">
        <el-radio-button label="0">原创</el-radio-button>
        <el-radio-button label="1">转载</el-radio-button>
      </el-radio-group>
      <span class="label">文章状态</span>
      <el-radio-group v-model="postFormData.state" size="mini">
        <el-radio-button label="published">发布</el-radio-button>
        <el-radio-button label="draft">草稿</el-radio-button>
      </el-radio-group>
    </div>
    <div class="right">
      <span class="label">是否推荐</span>
      <el-switch
        v-model="postFormData.isTop"
        active-color="#13ce66"
        inactive-color="#ff4949">
      </el-switch>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      selectValue: 1,
      selectOptions: [
        {
          value: 1,
          label: '全部'
        },
        {
          value: 2,
          label: '原创'
        },
        {
          value: 3,
          label: '转载'
        },
        {
          value: 4,
          label: '已推荐'
        }
      ]
    }
  },
  props: ['postFormData'],
  methods: {
    toNewPage() {
      this.$emit('switch-content-type')
    }
  }
}
</script>

<style lang="scss" scoped>
.post-top{
  background-color: #fff;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  .left{
    > span.label{
      margin: 0 10px 0 20px;
      line-height: 28px;
      font-weight: bold;
      color: #999;
      &:first-child{
        margin-left: 10px;
      }
    }
  }
  .right{
    display: flex;
    justify-content: flex-end;
    align-items: center;
    > span.label{
      margin: 0 10px 0 20px;
      line-height: 28px;
      font-weight: bold;
      color: #999;
      &:first-child{
        margin-left: 10px;
      }
    }
  }
}
</style>

