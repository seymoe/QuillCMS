import FriendLink from '../models/FriendLink'
import validator from 'validator'
import shortid from 'shortid'
import { log, renderApiData, renderApiErr, checkCurrentId } from '../utils'
import valiObj from '../../utils/validate'

let checkFriendLinkFields = (formData, req) => {
  // 管理员用户以上权限才可以创建标签
  let hasLogin = req.session.userLogined
  let userInfo = req.session.userInfo

  if (!hasLogin || (userInfo.role !== 'super' && userInfo.role !== 'admin')) {
    return false
  }

  let { name, desc, link, cover, enable } = formData
  if (name.length <= 0 || name.length > 20) {
    return false
  } else if (desc.length > 40) {
    return false
  } else if (cover.length > 20) {
    return false
  } else if (!validator.isURL(link)) {
    return false
  }
  return true
}

export default {
  /**
   * 创建友情链接
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  async createOne(req, res, next) {
    // 校验传入的参数
    let fields = req.body
    try {
      let validateResult = checkFriendLinkFields(fields, req)
      if (!validateResult) {
        return res.status(500).send(renderApiErr(req, res, 500, '数据校验失败'))
      }
    } catch (err) {
      return res.status(500).send(renderApiErr(req, res, 500, err))
    }

    const obj = {
      name: fields.name,
      desc: fields.desc,
      cover: fields.cover,
      link: fields.link,
      enable: fields.enable ? true : false
    }

    const newLink = new FriendLink(obj)

    try {
      let linkObj = await newLink.save()
      return res.send(renderApiData(req, res, 200, '友情链接创建成功', { id: linkObj._id }))
    } catch (err) {
      return res.status(500).send(renderApiErr(req, res, 500, err))
    }
  },

  /**
   * 获取一个链接
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  async getOne(req, res, next) {
    try {
      let targetId = req.params.id
      let queryObj = { _id: targetId }
      const link = await FriendLink.findOne(queryObj).exec()

      return res.send(renderApiData(req, res, 200, '获取成功', link || {}))
    } catch (err) {
      return res.status(500).send(renderApiErr(req, res, 500, err))
    }
  },

  /**
   * 获取友情链接列表
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  async getList(req, res, next) {
    try {
      log(req.query)
      let fields = req.query
      let queryObj = {enable: true}
      let page = Number(fields.page) || 1
      let pageSize = Number(fields.pageSize) || 10

      // 排序
      let sortObj = { data: -1 }

      // 查询文档
      const linkList = await FriendLink.find(queryObj).sort(sortObj).skip((page - 1) * pageSize).limit(pageSize).exec()
      const totalCounts = await FriendLink.count(queryObj)

      log(linkList, totalCounts)

      let linkObj = {
        list: linkList,
        page: page,
        lastPage: Math.ceil(totalCounts / pageSize),
        pageSize: pageSize,
        totalCounts: totalCounts
      }
      return res.send(renderApiData(req, res, 200, '友情链接列表获取成功', linkObj))
    } catch (err) {
      return res.status(500).send(renderApiErr(req, res, 500, err))
    }
  },

  /**
   * 删除一个标签
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

      if (userInfo.role !== 'super' && userInfo.role !== 'admin') {
        errMsg = '没有操作权限'
      }

      if (errMsg) {
        return res.send(renderApiErr(req, res, 500, errMsg))
      }

      await FriendLink.remove({ _id: id })
      return res.send(renderApiData(req, res, 200, '删除成功', {}))
    } catch (err) {
      return res.status(500).send(renderApiErr(req, res, 500, err))
    }
  },

  /**
   * 更新
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  async updateOne(req, res, next) {
    // 校验传入的参数
    let fields = req.body
    try {
      let validateResult = checkFriendLinkFields(fields, req)
      if (!validateResult) {
        return res.status(500).send(renderApiErr(req, res, 500, '数据校验失败'))
      }
      // 如果文章id不合法，则返回校验失败
      if (!shortid.isValid(fields._id)) {
        return res.status(500).send(renderApiErr(req, res, 500, '数据校验失败'))
      }
    } catch (err) {
      return res.status(500).send(renderApiErr(req, res, 500, err))
    }

    const obj = {
      name: fields.name,
      desc: fields.desc,
      cover: fields.cover,
      link: fields.link,
      enable: fields.enable ? true : false
    }

    log(obj)

    try {
      let item_id = fields._id
      await FriendLink.findOneAndUpdate({ _id: item_id }, { $set: obj })
      return res.send(renderApiData(req, res, 200, '友链更新成功', { id: item_id }))
    } catch (err) {
      return res.status(500).send(renderApiErr(req, res, 500, err))
    }
  }
}