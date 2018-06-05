<template>
  <div class="admin-container">
    <main-header></main-header>
    <left-side-bar></left-side-bar>

    <main class="main">
      <button @click="createCategory">创建栏目</button>
      <button @click="collectCoupon">采集好券清单</button>
      <button @click="clearCoupon">清除失效券</button>
      <button @click="fetchFavorites">更新选品库列表</button>
      <button @click="fetchFavoriteItems">更新选品库商品</button>
    </main>
  </div>
</template>

<script>
import axios from '~/plugins/axios'
import MainHeader from '~/components/admin/MainHeader'
import LeftSideBar from '~/components/admin/LeftSideBar'

export default {
  methods: {
    createCategory () {
      axios.get('/server/api/coupons/createcate').then(res => {
        console.log(res)
      }).then(err => {
        console.log(err)
      })
    },
    collectCoupon () {
      for (let i = 1; i <= 100; i++) {
        axios.get('/server/api/coupons/pull?pageNum=' + i).then(res => {
          console.log(res)
        }).catch(err => {
          console.error(err)
        })
      }
    },
    clearCoupon () {
      for (let i = 1; i <= 100; i++) {
        axios.get('/server/api/coupons/clear').then(res => {
          console.log(res)
        }).catch(err => {
          console.error(err)
        })
      }
    },
    fetchFavorites () {
      axios.get('/server/api/coupons/selectlib').then(res => {
        console.log(res)
      }).catch(err => {
        console.error(err)
      })
    },
    fetchFavoriteItems () {
      axios.get('/server/api/coupons/selectlib/items').then(res => {
        console.log(res)
      }).catch(err => {
        console.error(err)
      })
    }
  },
  components: {
    MainHeader,
    LeftSideBar
  }
}
</script>

<style scoped>
.admin-container{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.main{
  margin-left: 100px;
  height: calc(100% - 60px);
}
</style>


