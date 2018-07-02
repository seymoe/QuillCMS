export default function (req, res, next) {
  if (req.session.userLogined && req.session.userInfo) {
    req.session.userLogined = req.session.userLogined
    req.session.userInfo = req.session.userInfo
  }
  next()
}
