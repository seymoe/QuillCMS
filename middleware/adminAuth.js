export default function ({ route, store, req, redirect }) {
  let routerPath = route.path
  if (routerPath.indexOf('/admin') > -1) {
    let { loginState } = store.state
    if (!loginState.hasLogin || !loginState.userInfo.id || (loginState.userInfo.role !== 'admin' && loginState.userInfo.role !== 'super')) {
      delete req.session.userLogined
      delete req.session.userInfo
      return redirect('/admin/login')
    }
  } else if (routerPath.indexOf('/post/new') > -1) {
    let { loginState } = store.state
    if (!loginState.hasLogin || !loginState.userInfo.id || loginState.userInfo.role === 'admin' || loginState.userInfo.role === 'super') {
      delete req.session.userLogined
      delete req.session.userInfo
      return redirect('/signin')
    }
  }
}
