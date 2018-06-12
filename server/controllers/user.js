import User from '../models/User'
import validator from 'validator'
import { log, renderApiData, renderApiErr, getClientIp } from '../../utils/util'
import valiObj from '../../utils/validate'

// 检验登陆请求
let checkLoginActionFields = (formData) => {
  // fakemark 防伪标识， 值为 quillcms_login_mark_[时间戳]
  let { email, password, fakemark } = formData

  if (!/^quillcms_login_mark_\d{13}$/.test(fakemark)) {
    return false
  } else if (!valiObj.checkEmail(email) || !valiObj.checkPass(password)){
    return false
  }

  return true
}

export default {
  /**
   * 创建一个用户，创建需要最高权限，超级管理员只允许一个存在
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  async createUser(req, res, next) {
    // 校验传入的参数
    let fields = req.body
    try {
      log(fields)
    } catch (err) {
      res.status(500).send(renderApiErr(req, res, 500, err))
    }

    const obj = {
      username: fields.username,
      email: fields.email,
      password: fields.password,
      role: fields.role
    }

    const newUser = new User(obj)

    try {
      let userObj = await newUser.save()
      res.send(renderApiData(res, 200, '用户创建成功', { id: userObj._id }))
    } catch (err) {
      res.status(500).send(renderApiErr(req, res, 500, err))
    }
  },

  async loginAction(req, res, next) {
    let fields = req.body
    try {
      let validateResult = checkLoginActionFields(fields)
      log(validateResult)
      if (!validateResult) {
        res.status(500).send(renderApiErr(req, res, 500, '邮箱或密码错误'))
      }
    } catch (err) {
      res.status(500).send(renderApiErr(req, res, 500, err))
    }

    // 数据格式校验成功，则查找数据库中是否存在用户，比对其密码
    let userObj = {
      email: fields.email,
      password: fields.password
    }

    try {
      let user = await User.findOne(userObj).exec()
      if (user) {
        if (!user.enable) {
          res.status(401).send(renderApiErr(req, res, 401, '账号已被禁用'))
        }

        // 用户信息正确，未被禁用
        log(user)

        req.session.userLogined = true,
        req.session.userInfo = {
          username: user.username,
          id: user._id,
          email: user.email,
          nickname: user.nickname
        }

        // 更新登陆信息
        let ip = getClientIp(req)
        user.last_login_ip = ip
        user.last_login_time = Date.now()
        await user.save()

        res.send(renderApiData(res, 200, '登陆成功', {
          hasLogin: req.session.userLogined,
          userInfo: req.session.userInfo
        }))
      } else {
        res.status(404).send(renderApiErr(req, res, 404, '用户不存在'))
      }
    } catch (err) {
      res.status(500).send(renderApiErr(req, res, 500, err))
    }
  }
}