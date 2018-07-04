<template>
  <section class="hot-post">
    <div class="title">
      <h1>{{ (author && author._id) ? (author.nickname + '的其他文章') : '热门文章' }}</h1>
    </div>
    <div class="post-list">
      <div 
        :class="{'post-item-top': index < 3, 'post-item-btm flex-row': index >= 3}" 
        v-for="(item,index) in hotPosts" 
        :key="index">
        <template v-if="index < 3">
          <nuxt-link :to="'/post/' + item._id" class="imgbox">
            <img  v-if="!item.cover" src="~/assets/img/place.png" alt="">
            <img  v-else :src="item.cover" alt="">
            <span>{{ item.title }}</span>
          </nuxt-link>
        </template>
        <template v-else>
          <nuxt-link :to="'/post/' + item._id" class="imgbox">
            <img  v-if="!item.cover" src="~/assets/img/place.png" alt="">
            <img  v-else :src="item.cover" alt="">
          </nuxt-link>
          <div class="txtbox flex-column flex-1">
            <h2>
              <nuxt-link :to="'/post/' + item._id">{{ item.title }}</nuxt-link>
            </h2>
            <p>{{ item.create_time }}</p>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ['hotPosts', 'author']
}
</script>

<style lang="scss" scoped>
.hot-post{
  margin-bottom: 20px;
  width: 100%;
  box-sizing: border-box;
  padding: 10px 15px;
  background-color: #fff;
}
.title{
  margin: 5px 0;
  h1{
    margin: 0;
    font-size: 16px;
    text-align: center;
    color: #409eff;
  }
}
.post-item-top{
  padding: 10px 0;
  .imgbox{
    position: relative;
    display: block;
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
      @media screen and (max-width: 767px) {
        height: auto;
      }
    }
    span{
      position: absolute;
      left: 0;
      bottom: 0;
      right: 0;
      width: 100%;
      background-color: rgba(0,0,0,.3);
      color: #fff;
      padding: 10px;
      font-size: 12px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      box-sizing: border-box;
    }
  }
}
.post-item-btm{
  padding: 10px 0;
  justify-content: space-between;
  .imgbox{
    width: 100px;
    margin-right: 10px;
    img{
      display: block;
      width: 100%;
      height: 70px;
    }
  }
  .txtbox{
    justify-content: space-between;
    h2{
      font-weight: 400;
      line-height: 1;
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
        font-size: 14px;
        color: #333;
      }
    }
    p{
      margin: 0;
      font-size: 12px;
      color: #999;
    }
  }
}
</style>

