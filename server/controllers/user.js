import fs from 'fs'
import User from '../models/User'
import shortid from 'shortid'
import { log, renderApiData, renderApiErr, getClientIp } from '../../utils/util'
import valiObj from '../../utils/validate'
import xss from 'xss'

// 检验登陆请求
let checkLoginActionFields = (formData) => {
  // fakemark 防伪标识， 值为 quillcms_login_mark_[时间戳]
  let { email, password, fakemark } = formData

  if (!/^quillcms_login_mark_\d{13}$/.test(fakemark)) {
    return false
  } else if (!valiObj.checkEmail(email) || !valiObj.checkPass(password)) {
    return false
  }

  return true
}

// 检验创建用户请求
let checkCreateUserFields = (formData, req) => {
  // 超级管理员用户才可以创建用户
  let hasLogin = req.session.userLogined
  let userInfo = req.session.userInfo
  if (!hasLogin || userInfo.role !== 'super') {
    return false
  }
  // fakemark 防伪标识， 值为 quillcms_login_mark_[时间戳]
  let { email, password, username, nickname, role, enable, fakemark } = formData

  if (!/^quillcms_user_mark_\d{13}$/.test(fakemark)) {
    return false
  } else if (!valiObj.checkEmail(email) || !valiObj.checkPass(password) || !valiObj.checkUserName(username)) {
    return false
  } else if (nickname.length > 20 || nickname.length <= 0) {
    return false
  } else if (role !== 'member' && role !== 'admin') {
    return false
  }
  return true
}

// 检验会员注册请求
let checkMemberRegistFields = (formData) => {
  // fakemark 防伪标识， 值为 quillcms_login_mark_[时间戳]
  let { email, password, username, nickname, fakemark } = formData

  if (!/^quillcms_user_mark_\d{13}$/.test(fakemark)) {
    return {
      status: false,
      msg: '未知错误'
    }
  } else if (!valiObj.checkEmail(email) || !valiObj.checkPass(password)) {
    return {
      status: false,
      msg: '邮箱格式错误'
    }
  } else if (nickname.length > 10 || nickname.length <= 0) {
    return {
      status: false,
      msg: '昵称不能超过10个字符'
    }
  } else if (!valiObj.checkUserName(username)) {
    return {
      status: false,
      msg: '用户名格式由4-16位字母、数字、_、-组成'
    }
  }
  return {
    status: true,
    msg: '校验成功'
  }
}

// 检验会员更新请求
let checkMemberUpdateProfileFields = (formData) => {
  // fakemark 防伪标识， 值为 quillcms_login_mark_[时间戳]
  let { nickname, signature, province, city, address, fakemark } = formData

  if (!/^quillcms_user_mark_\d{13}$/.test(fakemark)) {
    return {
      status: false,
      msg: '未知错误'
    }
  } else if (nickname.length > 20 || nickname.length <= 0) {
    return {
      status: false,
      msg: '昵称不能超过20个字符'
    }
  } else if (province.length > 10 || city.length > 10 || address.length > 80) {
    return {
      status: false,
      msg: '省份、城市或地址的长度超出'
    }
  } else if (signature.length > 40) {
    return {
      status: false,
      msg: '个性签名不能超过40个字符'
    }
  }
  return {
    status: true,
    msg: '校验成功'
  }
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
      let validateResult = checkCreateUserFields(fields, req)
      if (!validateResult) {
        return res.status(500).send(renderApiErr(req, res, 500, '数据校验失败'))
      }
    } catch (err) {
      return res.status(500).send(renderApiErr(req, res, 500, err))
    }

    const obj = {
      username: fields.username,
      nickname: fields.nickname,
      email: fields.email,
      password: fields.password,
      role: fields.role,
      enable: fields.enable ? true : false
    }

    const newUser = new User(obj)

    try {
      let userObj = await newUser.save()
      return res.send(renderApiData(res, 200, '用户创建成功', { id: userObj._id }))
    } catch (err) {
      return res.status(500).send(renderApiErr(req, res, 500, err))
    }
  },

  /**
   * 删除一个用户
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  async deleteOne(req, res, next) {
    try {
      let userInfo = req.session.userInfo
      let errMsg = ''
      let id = req.params.id
      log(id)
      if (!shortid.isValid(id)) {
        errMsg = 'ID格式校验失败'
      }

      if (userInfo.role !== 'super') {
        errMsg = '没有操作权限'
      }

      if (id === userInfo.id) {
        errMsg = '无法删除'
      }

      if (errMsg) {
        return res.status(500).send(renderApiErr(req, res, 500, errMsg))
      }

      await User.remove({ _id: id })
      return res.send(renderApiData(res, 200, '删除成功', {}))
    } catch (err) {
      return res.status(500).send(renderApiErr(req, res, 500, err))
    }
  },

  /**
   * 更新用户
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  async updateOne(req, res, next) {
    // 校验传入的参数
    let fields = req.body
    try {
      let validateResult = checkCreateUserFields(fields, req)
      if (!validateResult) {
        return res.status(500).send(renderApiErr(req, res, 500, '数据校验失败'))
      }
      // 如果用户id不合法，则返回校验失败
      if (!shortid.isValid(fields._id)) {
        return res.status(500).send(renderApiErr(req, res, 500, '数据校验失败'))
      }
    } catch (err) {
      return res.status(500).send(renderApiErr(req, res, 500, err))
    }

    const obj = {
      nickname: fields.nickname,
      email: fields.email,
      password: fields.password,
      enable: fields.enable ? true : false
    }

    try {
      let item_id = fields._id
      await User.findOneAndUpdate({ _id: item_id }, { $set: obj })
      return res.send(renderApiData(res, 200, '用户资料更新成功', { id: item_id }))
    } catch (err) {
      return res.status(500).send(renderApiErr(req, res, 500, err))
    }
  },

  /**
   * 获取用户列表
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  async getUsers(req, res, next) {
    try {
      log(req.query)
      let fields = req.query
      let queryObj = {}, sortObj = {create_time: -1}
      let page = Number(fields.page) || 1
      let pageSize = Number(fields.pageSize) || 10
      let role = fields.role  // 角色 super/admin/member
      let sortBy = fields.sortBy  // 排序参数

      if (role === 'super' || role === 'admin' || role === 'member') {
        queryObj.role = role
      }

      // 排序
      if (sortBy) {
        delete sortObj.create_time
        sortObj[sortBy] = -1
      }

      log(queryObj)

      // 查询文档
      const userList = await User.find(queryObj, { password: 0 }).sort(sortObj).skip((page - 1) * pageSize).limit(pageSize).exec()
      const totalCounts = await User.count(queryObj)

      log(userList, totalCounts)

      let userObj = {
        list: userList,
        page: page,
        lastPage: Math.ceil(totalCounts / pageSize),
        pageSize: pageSize,
        totalCounts: totalCounts
      }
      return res.send(renderApiData(res, 200, '用户列表获取成功', userObj))
    } catch (err) {
      return res.status(500).send(renderApiErr(req, res, 500, err))
    }
  },

  /**
   * 获取一个用户
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  async getOne(req, res, next) {
    try {
      let targetId = req.params.id
      let queryObj = { _id: targetId }
      const user = await User.findOne(queryObj).exec()

      return res.send(renderApiData(res, 200, '获取成功', user || {}))
    } catch (err) {
      return res.status(500).send(renderApiErr(req, res, 500, err))
    }
  },

  /**
   * 处理登陆请求
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  async loginAction(req, res, next) {
    let fields = req.body
    try {
      let validateResult = checkLoginActionFields(fields)
      log(validateResult)
      if (!validateResult) {
        return res.status(500).send(renderApiErr(req, res, 500, '邮箱或密码错误'))
      }
    } catch (err) {
      return res.status(500).send(renderApiErr(req, res, 500, err))
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
          return res.status(401).send(renderApiErr(req, res, 401, '账号已被禁用'))
        }

        if (user.role === 'member') {
          return res.status(404).send(renderApiErr(req, res, 404, '用户不存在'))
        }

        // 用户信息正确，未被禁用
        log(user)

        req.session.userLogined = true,
        req.session.userInfo = {
          username: user.username,
          id: user._id,
          email: user.email,
          nickname: user.nickname,
          role: user.role,
          avatar: user.avatar
        }
        req.session.save()

        // 更新登陆信息
        let ip = getClientIp(req)
        user.last_login_ip = ip
        user.last_login_time = Date.now()
        await user.save()

        return res.send(renderApiData(res, 200, '登陆成功'))
      } else {
        return res.status(404).send(renderApiErr(req, res, 404, '用户不存在'))
      }
    } catch (err) {
      return res.status(500).send(renderApiErr(req, res, 500, err))
    }
  },

  /**
   * 退出登陆
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  logoutAction(req, res, next) {
    delete req.session.userLogined
    delete req.session.userInfo
    return res.send(renderApiData(res, 200, '成功退出登陆'))
  },

  // ------------------------ 会员相关 --------------------------

  /**
   * 处理会员登陆
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  async memberLoginAction(req, res, next) {
    let fields = req.body
    try {
      let validateResult = checkLoginActionFields(fields)
      log(validateResult)
      if (!validateResult) {
        return res.status(500).send(renderApiErr(req, res, 500, '邮箱或密码错误'))
      }
    } catch (err) {
      return res.status(500).send(renderApiErr(req, res, 500, err))
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
          return res.status(401).send(renderApiErr(req, res, 401, '账号已被禁用'))
        }

        // 管理员不可在前台登陆
        if (user.role !== 'member') {
          return res.status(404).send(renderApiErr(req, res, 404, '用户不存在'))
        }

        // 用户信息正确，未被禁用
        log(user)

        req.session.userLogined = true,
        req.session.userInfo = {
          username: user.username,
          id: user._id,
          email: user.email,
          nickname: user.nickname,
          role: user.role,
          avatar: user.avatar
        }
        req.session.save()

        // 更新登陆信息
        let ip = getClientIp(req)
        user.last_login_ip = ip
        user.last_login_time = Date.now()
        await user.save()

        return res.send(renderApiData(res, 200, '登陆成功'))
      } else {
        return res.status(404).send(renderApiErr(req, res, 404, '用户不存在'))
      }
    } catch (err) {
      return res.status(500).send(renderApiErr(req, res, 500, err))
    }
  },

  /**
   * 会员注册
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  async memberRegistAction(req, res, next) {
    // 校验传入的参数
    let fields = req.body
    try {
      let validateResult = checkMemberRegistFields(fields)
      if (!validateResult.status) {
        return res.status(500).send(renderApiErr(req, res, 500, validateResult.msg))
      }
    } catch (err) {
      return res.status(500).send(renderApiErr(req, res, 500, err))
    }

    const obj = {
      username: fields.username,
      nickname: fields.nickname,
      email: fields.email,
      password: fields.password,
      role: 'member'
    }

    const newUser = new User(obj)

    try {
      // 查询数据库中是否已经存在邮箱
      let _user = await User.findOne({email: obj.email})
      if (_user) {
        return res.status(500).send(renderApiErr(req, res, 500, '邮箱已被占用'))
      }
      
      let userObj = await newUser.save()
      return res.send(renderApiData(res, 200, '注册成功', { id: userObj._id }))
    } catch (err) {
      return res.status(500).send(renderApiErr(req, res, 500, err))
    }
  },

  /**
   * 获取会员基本信息
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns
   */
  async memberGetBaseInfo(req, res, next) {
    try {
      let targetId = req.params.id
      let _session = req.session
      log(_session, targetId)
      let files = {
        _id: 1,
        username: 1,
        nickname: 1,
        avatar: 1,
        signature: 1,
        sex: 1,
        age: 1,
        province: 1,
        city: 1,
        postsNum: 1,
        followsNum: 1,
        fansNum: 1,
        follow_users: 1,
        fans_users: 1
      }

      if (_session.userLogined && _session.userInfo.id === targetId) {
        // 登陆用户请求自己的个人资料
        req.session.userLogined = _session.userLogined
        req.session.userInfo = _session.userInfo
        req.session.save()
        files = {
          _id: 1,
          username: 1,
          nickname: 1,
          avatar: 1,
          signature: 1,
          email: 1,
          phone: 1,
          role: 1,
          enable: 1,
          sex: 1,
          age: 1,
          province: 1,
          city: 1,
          address: 1,
          coin: 1,
          postsNum: 1,
          followsNum: 1,
          fansNum: 1,
          follow_users: 1,
          fans_users: 1
        }
      }

      let queryObj = { _id: targetId }
      let user = await User.findOne(queryObj, files).populate([
        {
          path: 'follow_users',
          select: 'nickname _id avatar signature',
          model: User,
          options: {limit: 5}
        },
        {
          path: 'fans_users',
          select: 'nickname _id avatar signature',
          model: User,
          options: {limit: 5}
        }
      ]).exec()
      user = user.toObject()

      // 判断用户间状态返回是否关注的信息
      if (_session.userLogined && _session.userInfo.id !== targetId) {
        let targetUser = await User.findOne({_id: targetId})
        if (targetUser.fans_users.indexOf(_session.userInfo.id) > -1) {
          // 说明该登陆用户已经关注了访问的用户
          user.hasFollow = true
        } else {
          user.hasFollow = false
        }
      } else {
        user.hasFollow = false
      }

      log(user)

      return res.send(renderApiData(res, 200, '获取成功', user || {}))
    } catch (err) {
      return res.status(500).send(renderApiErr(req, res, 500, err))
    }
  },

  /**
   * 更新会员头像
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns
   */
  async memberUpdateAvatar(req, res, next) {
    let fields = req.body
    let _session = req.session
    if (!shortid.isValid(fields._id) || !_session.userLogined || _session.userInfo.id !== fields._id) {
      return res.status(500).send(renderApiErr(req, res, 500, '更新失败'))
    } else if (!fields.avatar || fields.avatar.length > 80) {
      return res.status(500).send(renderApiErr(req, res, 500, '更新失败'))
    }

    let obj = {
      avatar: fields.avatar
    }

    try {
      let item_id = fields._id

      let oldUser = await User.findOne({_id: item_id})
      // 如果新传来的图片路径和之前的图片路径不同，则删掉之前的图片并更新
      if (oldUser.cover !== obj.cover) {
        if (oldUser.cover.indexOf('/upload/images/') >= 0) {
          // 文件存储于服务器
          let _path = process.cwd() + '/static' + oldUser.cover
          log('imgpath -> ', _path)
          if (fs.existsSync(_path)) {
            // 存在，删掉
            fs.unlinkSync(_path)
          }
        }
      }

      await User.findOneAndUpdate({ _id: item_id }, { $set: obj })
      // 更新session
      req.session.userInfo.avatar = fields.avatar
      req.session.save()
      return res.send(renderApiData(res, 200, '头像更新成功', { id: item_id }))
    } catch (err) {
      return res.status(500).send(renderApiErr(req, res, 500, err))
    }
  },

  /**
   * 更新会员资料
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns
   */
  async memberUpdateProfile(req, res, next) {
    let fields = req.body
    try {
      let _session = req.session
      if (!shortid.isValid(fields._id) || !_session.userLogined || _session.userInfo.id !== fields._id) {
        return res.status(500).send(renderApiErr(req, res, 500, '更新失败'))
      }
      let validateResult = checkMemberUpdateProfileFields(fields)
      if (!validateResult.status) {
        return res.status(500).send(renderApiErr(req, res, 500, validateResult.msg))
      }
    } catch (err) {
      return res.status(500).send(renderApiErr(req, res, 500, err))
    }

    let obj = {
      nickname: fields.nickname,
      signature: xss(fields.signature),
      sex: parseInt(fields.sex) === 2 ? 2 : 1,
      age: parseInt(fields.age),
      province: fields.province,
      city: fields.province,
      address: xss(fields.address)
    }

    try {
      let item_id = fields._id
      await User.findOneAndUpdate({ _id: item_id }, { $set: obj })
      return res.send(renderApiData(res, 200, '资料更新成功', { id: item_id }))
    } catch (err) {
      return res.status(500).send(renderApiErr(req, res, 500, err))
    }
  },

  /**
   * 关注一个用户
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  async memberFollow(req, res, next) {
    let targetId = req.body.id
    let userId = req.session.userInfo.id
    // 校验数据
    if (!shortid.isValid(targetId) || !shortid.isValid(userId)) {
      return res.status(500).send(renderApiErr(req, res, 500, '参数错误'))
    }
    try {
      let oldTargetUser = await User.findOne({ _id: targetId })
      if (!oldTargetUser) {
        return res.status(500).send(renderApiErr(req, res, 500, '用户不存在'))
      } else if ((oldTargetUser.fans_users).indexOf(userId) > -1) {
        return res.status(500).send(renderApiErr(req, res, 500, '您已经关注了对方'))
      } else {
        let newTargetUser = await User.findOneAndUpdate({ _id: targetId }, { '$inc': { 'fansNum': 1 }, '$push': { 'fans_users': userId } })
        let newUser = await User.findOneAndUpdate({ _id: userId }, { '$inc': { 'followsNum': 1 }, '$push': { 'follow_users': newTargetUser._id } })
        return res.send(renderApiData(res, 200, '关注成功'))
      }
    } catch (err) {
      return res.status(500).send(renderApiErr(req, res, 500, err))
    }
  },

  /**
   * 取消关注用户
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  async memberUnFollow(req, res, next) {
    let targetId = req.body.id
    let userId = req.session.userInfo.id
    // 校验数据
    if (!shortid.isValid(targetId) || !shortid.isValid(userId)) {
      return res.status(500).send(renderApiErr(req, res, 500, '参数错误'))
    }
    try {
      let oldTargetUser = await User.findOne({ _id: targetId })
      if (!oldTargetUser) {
        return res.status(500).send(renderApiErr(req, res, 500, '用户不存在'))
      } else if ((oldTargetUser.fans_users).indexOf(userId) < 0) {
        return res.status(500).send(renderApiErr(req, res, 500, '您还没有关注对方'))
      } else {
        let newTargetUser = await User.findOneAndUpdate({ _id: targetId }, { '$inc': { 'fansNum': -1 }, '$pull': { 'fans_users': userId } })
        let newUser = await User.findOneAndUpdate({ _id: userId }, { '$inc': { 'followsNum': -1 }, '$pull': { 'follow_users': newTargetUser._id } })
        return res.send(renderApiData(res, 200, '取消关注成功'))
      }
    } catch (err) {
      return res.status(500).send(renderApiErr(req, res, 500, err))
    }
  },
}