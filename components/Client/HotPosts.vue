<template>
  <section class="hot-post">
    <div class="title">
      <h1>热门文章</h1>
    </div>
    <div class="post-list">
      <div class="post-item-top">
        <nuxt-link to="/" class="imgbox">
          <img src="~/assets/img/place.png" alt="">
          <span>刚刚美国加息，刚刚美国加息，刚刚美国加息</span>
        </nuxt-link>
      </div>
      <div class="post-item-btm flex-row">
        <nuxt-link to="/" class="imgbox">
          <img src="~/assets/img/place.png" alt="">
        </nuxt-link>
        <div class="txtbox flex-column flex-1">
          <h2>
            <nuxt-link to="/">小米上市倒计时，小米上市倒计时，小米上市倒计时</nuxt-link>
          </h2>
          <p>2018年6月13日</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.hot-post{
  margin-top: 20px;
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
    img{
      display: block;
      height: 153px;
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

