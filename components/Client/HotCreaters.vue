<template>
  <section class="hot-creater-wrap">
    <div class="title">
      <h1>创作达人</h1>
    </div>
    <div class="creaters">
      <div class="creater flex-row">
        <nuxt-link to="/" class="imgbox">
          <img src="~/assets/img/avatar.png" alt="">
        </nuxt-link>
        <div class="txtbox flex-column flex-1">
          <h2>曦莫琅</h2>
          <p>发文量: 300 | 粉丝数：200</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.hot-creater-wrap{
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

.creater{
  padding: 10px 0;
  justify-content: space-between;
  .imgbox{
    margin-right: 20px;
    display: block;
    width: 60px;
    height: 60px;
    border-radius: 100%;
    overflow: hidden;
    transform: rotate(0deg);
    transition: all .8s;
    &:hover{
      transform: rotate(360deg)
    }
    img{
      display: block;
      width: 60px;
      height: 60px;
    }
  }
  .txtbox{
    justify-content: space-around;
    h2{
      margin: 0;
      font-size: 16px;
      color: #666;
    }
    p{
      color: #999;
      margin: 0;
      font-size: 12px;
    }
  }
}
</style>
