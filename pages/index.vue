<template>
  <section class="container">
    <main-header />
    <top-menu />
    <sec-title title="好券直播" />
    <scroll-menu @event-fetch="fetchCouponsData"/>

    <!-- 商品列表 -->
    <div class="good-list" v-if="coupons.length > 0">
      <div v-if="showWithLine" :class="listStyle">
        <good-item-line 
          v-for="(good, index) in coupons" 
          :key="index" 
          :data="good"></good-item-line>
      </div>
      <div :class="listStyle" v-else>
        <good-item-block 
        v-for="(good, index) in coupons" 
        :key="index" 
        :data="good"></good-item-block>
      </div>
    </div>
    <div class="nodata-info" v-else>
      <p>加载中...</p>
    </div>
  </section>
</template>

<script>
import axios from '~/plugins/axios'
import { calcCoupon } from '~/plugins/utils'
import MainHeader from '~/components/MainHeader'

import TopMenu from '~/components/TopMenu'
import ScrollMenu from '~/components/ScrollMenu'
import SecTitle from '~/components/SecTitle'

import GoodItemLine from '~/components/GoodItemLine'
import GoodItemBlock from '~/components/GoodItemBlock'

export default {
  data () {
    return {
      showWithLine: true,
      queryWord: '',
      pageNum: 1,
      isLoading: false
    }
  },
  async asyncData () {
    let { data } = await axios.get('/client/api/goods')
    if (!data.data) {
      return { coupons: [] }
    } else {
      // 计算出优惠券额度以及优惠价格
      let list = calcCoupon(data.data)
      return { coupons: list }
    }
  },
  head () {
    return {
      title: '折精选 - 优券折扣,好物导购'
    }
  },
  computed: {
    listStyle () {
      return this.showWithLine ? 'showline' : 'showblock'
    }
  },
  methods: {
    fetchCouponsData (queryWord, initPage) {
      if (this.isLoading) return
      // 设置加载状态
      this.isLoading = true
      // 设置查询词
      if (queryWord) {
        this.queryWord = queryWord === '全部' ? '' : queryWord
      }
      // 设置初始页数
      if (initPage) {
        this.pageNum = initPage
        this.coupons = []
      } else {
        this.pageNum = this.pageNum += 1
      }
      axios.get(`/client/api/goods?q=${this.queryWord}&page=${this.pageNum}`)
        .then(res => {
          return res.data
        })
        .then(data => {
          if (data.success && data.data.length > 0) {
            let _list = calcCoupon(data.data)
            if (this.coupons.length > 0) {
              this.coupons = this.coupons.concat(_list)
            } else {
              this.coupons = _list
            }
            this.isLoading = false
            console.log(this.pageNum, this.queryWord)
          }
        })
        .catch(err => {
          console.log(err)
          this.isLoading = false
        })
    }
  },
  mounted () {
    window.addEventListener('scroll', () => {
      let scrollTop = document.body.scrollTop || document.documentElement.scrollTop
      if (scrollTop + window.innerHeight >= document.body.clientHeight) {
        console.log('scroll')
        this.fetchCouponsData()
      }
    })
  },
  components: {
    MainHeader,
    TopMenu,
    ScrollMenu,
    SecTitle,
    GoodItemLine,
    GoodItemBlock
  }
}
</script>

<style scoped>
.showline {
  display: block;
}
.showblock {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  background-color: #f8f8f8;
}
.nodata-info {
  text-align: center;
  font-size: 12px;
}
.nodata-info p {
  margin: 0;
}
</style>
