<template>
  <article class="post-detail">
    <header class="head">
      <h1>{{ postData.title }}</h1>
      <div class="foot flex-row">
        <nuxt-link :to="'/user/' + postData.author._id">{{ postData.author.nickname }}</nuxt-link>
        <span v-if="postData.categories.length > 0">{{ postData.categories[postData.categories.length - 1]['name'] }}</span>
        <span>{{ postData.create_time }}</span>
        <span><i class="iconfont">&#xe603;</i>{{ postData.clicksNum }}</span>
        <span><i class="iconfont">&#xe606;</i>{{ postData.likesNum }}</span>
        <span><i class="iconfont">&#xe8f8;</i>{{ postData.collectionsNum }}</span>
      </div>
    </header>
    <!-- <div class="cover-box" v-if="postData.cover">
      <img :src="postData.cover" alt="">
    </div> -->
    <div class="posthtml" v-html="postData.content"></div>
    <footer>
      <div class="tag-list" v-if="postData.tags.length > 0">
        <el-button 
          class="tagitem"
          v-for="item in postData.tags"
          :key="item._id"
          type="primary" 
          size="mini">{{ item.name }}</el-button>
      </div>
    </footer>
    <!-- 喜欢 -->
    <div class="like-box flex-row">
      <div class="sharebox flex-row">
        <a 
          :href="weiboShare" target="_blank" 
          class="share-item flex-column weibo">
          <i class="iconfont">&#xe611;</i>
          <span>分享至微博</span>
        </a>
        <a 
          :href="weixinShare" target="_blank" 
          class="share-item flex-column weixin">
          <i class="iconfont">&#xe605;</i>
          <span>分享至微信</span>
        </a>
      </div>
      <div class="likebox flex-column" @click="handleLike">
        <span>
          <i class="iconfont">&#xe606;</i>
        </span>
        <b v-if="postData.hasLiked">已喜欢</b>
        <b v-else>{{ postData.likesNum }}人喜欢</b>
      </div>
      <div class="likebox flex-column" @click="handleCollect">
        <span>
          <i class="iconfont">&#xe8f8;</i>
        </span>
        <b v-if="postData.hasCollected">已收藏</b>
        <b v-else>{{ postData.collectionsNum }}人收藏</b>
      </div>
      <div class="sharebox flex-row">
        <a 
          :href="twitterShare" target="_blank" 
          class="share-item flex-column twitter">
          <i class="iconfont">&#xe600;</i>
          <span>分享至Twitter</span>
        </a>
        <a 
          :href="fbShare" target="_blank" 
          class="share-item flex-column facebook">
          <i class="iconfont">&#xe669;</i>
          <span>分享至Facebook</span>
        </a>
      </div>
    </div>
  </article>
</template>

<script>

export default {
  data() {
    return {
      baseLocal: ''
    }
  },
  props: ['postData', 'loginState'],
  methods: {
    handleLike() {
      // 判断是否登陆
      if (!this.loginState.hasLogin || !this.loginState.userInfo.id) {
        this.showConfirmBox()
        return false
      }

      // 判断是否已经赞了
      if (this.postData.hasLiked) {
        return false
      }

      let successCallback = (data) => {
        this.postData.likesNum = data.likesNum
        this.postData.hasLiked = data.hasLiked
      }
      this.$emit('like-post', this.postData._id, successCallback)
    },
    handleCollect() {
      // 判断是否登陆
      if (!this.loginState.hasLogin || !this.loginState.userInfo.id) {
        this.showConfirmBox()
        return false
      }

      // 判断是否已经收藏
      if (this.postData.hasCollected) {
        return false
      }

      let successCallback = (data) => {
        this.postData.collectionsNum = data.collectionsNum
        this.postData.hasCollected = data.hasCollected
      }
      this.$emit('collect-post', this.postData._id, successCallback)
    },
    // 提示登陆注册
    showConfirmBox() {
      this.$confirm('您还未登录，请登录后再进行相关操作', '请登陆', {
        confirmButtonText: '去登陆',
        cancelButtonText: '放弃了',
        type: 'info',
        center: true
      })
        .then(() => {
          let fromUrl = '/post/' + this.postData._id
          this.$router.push('/signin?fromUrl=' + fromUrl)
        })
        .catch(() => {})
    }
  },
  computed: {
    weiboShare: function () {
      return `http://service.weibo.com/share/share.php?url=${this.baseLocal}&title=${this.postData.title}&pic=${this.postData.cover}&searchPic=false`
    },
    weixinShare: function () {
      return `http://qr.liantu.com/api.php?text=${this.baseLocal}`
    },
    twitterShare: function () {
      return `https://twitter.com/intent/tweet?text=${this.postData.title}&url=${this.baseLocal}`
    },
    fbShare: function () {
      return `https://www.facebook.com/sharer/sharer.php?u=${this.baseLocal}&t=${this.postData.title}&pic=${this.postData.cover}`
    }
  },
  mounted() {
    this.baseLocal = location.href
  }
}
</script>

<style lang="scss" scoped>
.post-detail{
  padding: 30px;
  background-color: #fff;
  @media screen and (max-width: 767px) {
    padding: 30px 15px;
    margin-left: -15px;
    margin-right: -15px;
  }
}
.head{
  h1{
    margin: 0 0 15px 0;
    font-size: 26px;
    color: #3d464d;
  }
  .foot{
    align-items: center;
    color: #999;
    a{
      color: #409eff;
    }
    a, span{
      margin-right: 15px;
      i{
        margin-right: 5px;
      }
    }
  }
}
.posthtml, .cover-box{
  margin: 30px 0 0 0;
}
.tag-list{
  padding: 15px 0;
  .tagitem{
    background-color: transparent;
    border-color: #666;
    color: #666;
    border-radius: 20px;
    transition: all .3s;
    &:hover{
      border-color: #409eff;
      color: #409eff;
    }
  }
}
.like-box{
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 10px solid #f8f8f8;
  .likebox{
    margin: 0 15px;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    span{
      margin-bottom: 5px;
      display: block;
      width: 30px;
      height: 30px;
      line-height: 30px;
      border-radius: 100%;
      background-color: #409eff;
      color: #fff;
      transition: all .3s;
      opacity: 1;
      &:hover{
        opacity: 0.9;
      }
      i{
        font-size: 16px;
      }
    }
    b{
      font-weight: normal;
      color: #409eff;
    }
  }
}
.share-item{
  margin: 0 15px;
  color: #999;
  transition: all .3s;
  i{
    margin-bottom: 5px;
    font-size: 30px;
  }
  span{
    font-size: 12px;
  }
}
.weibo{
  &:hover{
    color: #d81e06;
  }
}
.weixin{
  &:hover{
    color: #38AE37;
  }
}
.twitter{
  &:hover{
    color: #1296db;
  }
}
.facebook{
  &:hover{
    color: #2D598F;
  }
}
</style>

