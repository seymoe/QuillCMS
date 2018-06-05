<template>
  <div class="scroll-menu">
    <ul class="menu-ul">
      <li :class="['menu-li', active === item.name ? 'active' : '']" v-for="(item, index) in scrollMenu" :key="index"
        @click="commitFetch(item.name)">
        <span>{{ item.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        scrollMenu: [
          {
            name: '全部'
          },
          {
            name: '女装'
          },
          {
            name: '家居家装'
          },
          {
            name: '数码家电'
          },
          {
            name: '母婴'
          },
          {
            name: '食品'
          },
          {
            name: '鞋包配饰'
          },
          {
            name: '美妆个护'
          },
          {
            name: '男装'
          },
          {
            name: '内衣'
          },
          {
            name: '运动户外'
          },
          {
            name: '图书'
          }
        ],
        active: '全部'
      }
    },
    methods: {
      commitFetch (queryWord) {
        this.active = queryWord
        this.$emit('event-fetch', queryWord, 1)
      }
    }
  }
</script>

<style scoped>
.scroll-menu{
  width: 100%;
  background-color:#fff; 
  overflow-x: scroll; 
  -webkit-overflow-x: scroll;
  border-bottom: 5px solid #f8f8f8;
}
.scroll-menu::-webkit-scrollbar{ 
  width: 0;
  height: 0;
  background-color: #fff;
}
.menu-ul { 
  min-width:500px; 
  display: flex;
  justify-content: flex-start;
}
.menu-li{ 
  display: inline-block; 
  font-size: 12px;
  padding: 0px 12px;
  height: 34px;
  line-height: 34px;
  text-align: center;
  position: relative;
  text-overflow: ellipsis;
  word-break: keep-all;
  box-sizing: border-box;
}
.menu-li span{
  text-decoration: none;
}
.active{
  border-bottom: 3px solid #f23030;
}
</style>

