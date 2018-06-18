<template>
  <section class="post-list-wrap">
    <div class="head">
      <h1>{{ cateName }}</h1>
    </div>
    <div class="post-list" v-if="postList.length > 0">
      <div class="post-img-item flex-row" v-for="item in postList" :key="item._id">
        <div class="imgbox">
          <nuxt-link :to="'/post/' + item._id">
            <img src="~/assets/img/place.png" alt="">
          </nuxt-link>
        </div>
        <div class="txtbox flex-column flex-1">
          <h2><nuxt-link :to="'/post/' + item._id">{{ item.title }}</nuxt-link></h2>
          <p class="desc">{{ item.description }}</p>
          <div class="foot flex-row">
            <div class="author-box flex-row hidden-xs-only">
              <img src="~/assets/img/avatar.png" alt="">
              <span>{{ item.author.nickname }}</span>
            </div>
            <div class="action-box">
              <span>{{ item.create_time }}</span>
              <span><i class="iconfont">&#xe603;</i>{{ item.clicksNum }}</span>
              <span><i class="iconfont">&#xe606;</i>{{ item.likesNum }}</span>
              <span><i class="iconfont">&#xe8f8;</i>{{ item.collectionsNum }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="post-list" v-else>
      <p class="nodata">没有数据</p>
    </div>
  </section>
</template>

<script>
export default {
  props: ['postList', 'cateName']
}
</script>

<style lang="scss" scoped>
.post-list-wrap{
  background-color: #fff;
  padding: 15px;
  @media screen and (max-width: 767px) {
    margin-top: 20px;
  }
  .head{
    padding-bottom: 12px;
    border-bottom: 1px solid #f0f0f0;
    h1{
      margin: 0;
    }
  }
}
.post-list{
  .post-img-item{
    justify-content: space-between;
    padding: 20px 0;
    border-bottom: 1px solid #f8f8f8;
    transition: all .3s;
    @media screen and (max-width: 767px) {
      flex-direction: column;
    }
    &:hover{
      background-color: #fafafa;
    }
  }
  .nodata{
    text-align: center;
    color: #999;
  }
}
.imgbox{
  margin-right: 20px;
  width: 245px;
  overflow: hidden;
  &:hover{
    img{
      transform: scale(1.05);
    }
  }
  img{
    display: block;
    width: 100%;
    height: 153px;
    transform: scale(1);
    transition: all .5s;
  }
  @media screen and (max-width: 767px) {
    margin-bottom: 10px;
    width: 100%;
    margin-right: 0;
  }
}
.txtbox{
  justify-content: space-between;
  h2{
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    transition: all .3s;
    &:hover{
      color: #409eff;
      a{
        color: #409eff;
      }
    }
    a{
      transition: all .3s;
      font-size: 20px;
      color: #333;
    }
  }
  p.desc{
    margin: 10px 0;
    color: #666;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .foot{
    justify-content: flex-start;
    height: 30px;
    line-height: 30px;
    color: #999;
  }
}
.author-box{
  margin-right: 30px;
  img{
    margin-right: 10px;
    display: block;
    width: 30px;
    height: 30px;
    border-radius: 100%;
  }
}
.action-box{
  span{
    margin-right: 15px;
    i{
      margin-right: 5px;
    }
  }
}
</style>
