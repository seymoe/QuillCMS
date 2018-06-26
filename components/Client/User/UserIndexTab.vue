<template>
  <section class="tab-wrap">
    <div class="head flex-row">
      <el-radio-group v-model="currentTab" size="small">
        <el-radio-button label="article">文章</el-radio-button>
        <el-radio-button label="action">动态</el-radio-button>
      </el-radio-group>
    </div>
    <div class="body">
      <template v-if="currentTab === 'article'">
        <user-post-list :postList="articleList"></user-post-list>
      </template>
      <template v-if="currentTab === 'action'">
        <user-post-list :postList="actionList"></user-post-list>
      </template>
    </div>
  </section>
</template>

<script>
import UserPostList from '~/components/Client/User/UserPostList'

export default {
  data() {
    return {
      currentTab: 'article'
    }
  },
  props: {
    articleList: {
      type: Array,
      default: function () {
        return []
      }
    },
    actionList: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  components: {
    UserPostList
  }
}
</script>

<style lang="scss" scoped>
.head {
  padding: 10px 0;
  justify-content: center;
}
</style>
