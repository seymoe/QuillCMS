export default function ({ route, store, req, redirect }) {
  let routerPath = route.path
  if (routerPath.indexOf('/admin') > -1) {
    let { loginState } = store.state
    if (!loginState.hasLogin || !loginState.userInfo.id) {
      console.log(loginState)
      return redirect('/admin/login')
    }
  }
}
