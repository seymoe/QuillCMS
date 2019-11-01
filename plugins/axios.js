import axios from 'axios'
import Vue from 'vue'
import siteConf from '~/config/site'

const instance = axios.create({
  baseURL: siteConf.api_url,
  withCredentials: true,
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('token')
  },
  timeout: 10000
})

// 添加客户端请求响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, function (error) {
  // 对响应错误做点什么
  // console.log('error response', error.response)
  return Promise.reject(error.response.data)
})

const install = function (Vue) {
  Vue.prototype.$request = instance
}

Vue.use(install)
