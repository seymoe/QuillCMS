import User from '../models/User'
import validator from 'validator'
import { log, renderApiData, renderApiErr } from '../../utils/util'

export default {
  async createUser(req, res, next) {
    // 校验传入的参数
    let fields = req.body
    try {
      log(fields)
    } catch (err) {
      res.send(renderApiErr(req, res, 500, err))
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
      res.send(renderApiErr(req, res, 500, err))
    }
  }
}