<template>
  <div class="app-page">
    <app-header 
      :topMenuData="topMenu"
      :loginState="loginState"></app-header>
    <section class="app-wrap">
      <el-row class="container main" type="flex" justify="space-between">
        <el-col class="content" :xs="24" :sm="18">
          <post-detail 
            :postData="postData"
            :loginState="loginState"
            @like-post="clientLikePost"
            @collect-post="clientCollectPost"
            ></post-detail>
          <comment-box 
            :commentList="commentList"
            :loginState="loginState"
            :postId="postId"
            @post-comment="clientPostComment"
            @toggle-replybox="handleToggleReplybox"></comment-box>
        </el-col>
        <el-col class="sidebar" :xs="24" :sm="6">
          <advertise-box></advertise-box>
          <hot-posts 
            :hotPosts="hotPostList"
            :author="postData.author"></hot-posts>
          <!-- <hot-creaters></hot-creaters> -->
          <!-- <hot-tags></hot-tags> -->
        </el-col>
      </el-row>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'
import API from '~/config/api'
import { log, arrayToTree } from '~/utils/util'
import AppHeader from '~/components/Client/AppHeader'
import AdvertiseBox from '~/components/Client/AdvertiseBox'
import HotPosts from '~/components/Client/HotPosts'
import HotTags from '~/components/Client/HotTags'
import HotCreaters from '~/components/Client/HotCreaters'

import PostDetail from '~/components/Client/Post/PostDetail'
import CommentBox from '~/components/Client/Post/CommentBox'

// 服务端请求数据
let serverGetMenuData = () => {
  return axios
    .get(API.topMenu, {
      params: {
        mode: 'full'
      }
    })
    .then(res => {
      // log(res.data)
      if (res.data.success) {
        let _tree = arrayToTree(res.data.data.list)
        _tree.forEach(item => {
          if (item.children.length === 0) {
            delete item.children
          }
        })
        return _tree
      }
    })
    .catch(e => {
      return []
    })
}

// 文章详情
let serverGetPostData = postId => {
  return axios
    .get(API.appPostDetail + '/' + postId)
    .then(res => {
      if (res.data.success) {
        return res.data.data
      }
    })
    .catch(e => {
      return {}
    })
}

export default {
  layout: 'app',
  data() {
    return {
      postId: '',
      postData: {},
      hotPostList: [],
      // 评论列表
      commentList: []
    }
  },

  async fetch({ store, params }) {
    let topMenuData = await serverGetMenuData()
    store.commit('SET_TOP_MENU', topMenuData)
  },

  async asyncData({ params }) {
    let [postData] = await Promise.all([
      serverGetPostData(params.id)
    ])
    return {
      postData,
      postId: params.id
    }
  },

  computed: mapState(['topMenu', 'loginState']),

  methods: {
    // 客户端拉取用户相关文章
    clientGetRelativePosts() {
      log(this.postData.author._id)
      this.$request
        .get(API.appPostList, {
          params: {
            user: this.postData.author._id,
            sortBy: 'clicks',
            mode: 'simple',
            limit: 5
          }
        })
        .then(res => {
          if (res.data.success) {
            this.hotPostList = res.data.data.list
          }
        })
        .catch(e => {
          log(e)
        })
    },

    // 客户端拉取评论列表
    clientGetCommentList() {
      this.$request
        .get(API.comments, {
          params: {
            postId: this.postId
          }
        })
        .then(res => {
          let _list = res.data.data.list
          if (_list.length > 0) {
            _list.forEach(item => {
              item.showReplyBox = false
            })
          }
          this.commentList = _list
        })
        .catch(err => {
          log(err)
        })
    },

    // 切换回复框显示隐藏
    handleToggleReplybox(index, bool) {
      let list = this.commentList
      list.forEach((item, idx) => {
        item.showReplyBox = false
        if (idx === index) {
          item.showReplyBox = bool
        }
      })
    },

    // 发表评论
    clientPostComment(data, successCB, failedCB) {
      data.fakemark = 'quillcms_comment_mark_' + Date.now()
      log(data)
      this.$request
        .post(API.commentNew, data)
        .then(res => {
          log(res.data)
          this.$notify({
            title: '成功',
            message: res.data.message,
            type: 'success'
          })
          successCB && successCB()
          this.clientGetCommentList()
        })
        .catch(err => {
          log(err)
          this.$notify.error({
            title: '错误',
            message: err.message
          })
          failedCB && failedCB()
        })
    },

    // 喜欢文章
    clientLikePost(postId, successCB) {
      this.$request
        .post(API.appPostLike, {
          id: postId
        })
        .then(res => {
          log(res.data)
          // this.$notify({
          //   title: '成功',
          //   message: res.data.message,
          //   type: 'success'
          // })
          successCB && successCB(res.data.data)
          // this.clientGetCommentList()
        })
        .catch(err => {
          log(err)
          // this.$notify.error({
          //   title: '错误',
          //   message: err.message
          // })
          // failedCB && failedCB()
        })
    },
    // 收藏文章
    clientCollectPost(postId, successCB) {
      this.$request
        .post(API.appPostCollect, {
          id: postId
        })
        .then(res => {
          log(res.data)
          // this.$notify({
          //   title: '成功',
          //   message: res.data.message,
          //   type: 'success'
          // })
          successCB && successCB(res.data.data)
          // this.clientGetCommentList()
        })
        .catch(err => {
          log(err)
          // this.$notify.error({
          //   title: '错误',
          //   message: err.message
          // })
          // failedCB && failedCB()
        })
    }
  },

  mounted() {
    this.clientGetCommentList()
    this.clientGetRelativePosts()
  },

  components: {
    AppHeader,
    AdvertiseBox,
    HotPosts,
    HotTags,
    HotCreaters,
    PostDetail,
    CommentBox
  }
}
</script>

<style lang="scss" scoped>
.sidebar {
  padding-left: 20px;
  @media screen and (max-width: 767px) {
    padding-left: 0;
  }
}
</style>
