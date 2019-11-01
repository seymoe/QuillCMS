export default ({ app: { router } }) => {
  /* 每次路由变更时进行pv统计 */
  router.afterEach((to) => {
    /* 告诉增加一个PV */
    try {
      window._hmt = window._hmt || []
      window._hmt.push(['_trackPageview', to.fullPath])
    } catch (e) {
      console.log(e)
    }
  })
}
