<template>
  <section>
    <div class="container">
      <div class="friend-link-wrap">
        <div class="title">
          <h1>友情链接</h1>
        </div>
        <div class="links flex-row">
          <a v-for="item in friendLinks" 
            class="link-item" 
            :title="item.desc"
            :key="item._id"
            :href="item.link"
            target="_blank">
            <span>{{ item.name }}</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    friendLinks: {
      type: Array,
      default: function () {
        return []
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.friend-link-wrap{
  margin-top: 20px;
  margin-bottom: 20px;
  box-sizing: border-box;
  padding: 10px 15px;
  background-color: #fff;
}
.title{
  margin: 10px 0;
  h1{
    margin: 0;
    font-size: 16px;
    color: #409eff;
  }
}

.links{
  .link-item {
    padding: 5px 0;
    margin-right: 10px;
    color: #666;
    transition: all .3s;
    &:hover{
      color: #409eff;
    }
  }
}
</style>
