<template>
  <div class="side-bar">
    <ul class="menu-list">
      <li v-for="(item, index) in MenuArr" :key="index" :class="item.name === active ? 'active' : ''">
        <nuxt-link class="menu-item" to="/">{{ item.name }}</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        active: '精选清单',
        MenuArr: [
          {
            name: '精选清单'
          },
          {
            name: '女装尖货'
          },
          {
            name: '母婴热推'
          },
          {
            name: '9块9包邮'
          },
          {
            name: '20元封顶'
          },
          {
            name: '特价好货'
          }
        ]
      }
    }
  }
</script>

<style scoped>
.side-bar{
  position: absolute;
  width: 100px;
  top: 60px;
  left: 0;
  bottom: 0;
  background-color: #333;
}
.menu-list{
  padding: 15px 0;
}
.menu-item{
  display: block;
  height: 34px;
  line-height: 34px;
  text-indent: 15px;
  color: #fff;
}
.active{
  background-color: #666;
}
</style>
