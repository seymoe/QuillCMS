import PostTag from '../models/PostTag'
import validator from 'validator'
import shortid from 'shortid'
import { log, renderApiData, renderApiErr, checkCurrentId } from '../../utils/util'
import valiObj from '../../utils/validate'

let checkTagFields = (formData, req) => {
  // 管理员用户以上权限才可以创建标签
  let hasLogin = req.session.userLogined
  let userInfo = req.session.userInfo

  if (!hasLogin || (userInfo.role !== 'super' && userInfo.role !== 'admin')) {
    return false
  }

  let { name, alias, cover, enable } = formData
  if (name.length <= 0 || name.length > 20) {
    return false
  } else if (!/^[a-zA-Z0-9_-]{1,20}$/.test(alias)) {
    return false
  } else if (cover.length > 20) {
    return false
  }
  return true
}

export default {
  /**
   * 创建标签
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  async createOne(req, res, next) {
    // 校验传入的参数
    let fields = req.body
    try {
      let validateResult = checkTagFields(fields, req)
      if (!validateResult) {
        res.status(500).send(renderApiErr(req, res, 500, '数据校验失败'))
      }
    } catch (err) {
      res.status(500).send(renderApiErr(req, res, 500, err))
    }

    const obj = {
      name: fields.name,
      alias: fields.alias,
      cover: fields.cover,
      enable: fields.enable ? true : false
    }

    const newTag = new PostTag(obj)

    try {
      let tagObj = await newTag.save()
      res.send(renderApiData(res, 200, '标签创建成功', { id: tagObj._id }))
    } catch (err) {
      res.status(500).send(renderApiErr(req, res, 500, err))
    }
  },

  /**
   * 获取标签列表
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  async getList(req, res, next) {
    try {
      log(req.query)
      let fields = req.query
      let queryObj = {}
      let page = Number(fields.page) || 1
      let pageSize = Number(fields.pageSize) || 10
      let isHot = fields.isHot

      // 排序
      let sortObj = { data: -1 }
      if (isHot) {
        sortObj = { clicks: -1 }
      }

      // 查询文档
      const tagList = await PostTag.find(queryObj).sort(sortObj).skip((page - 1) * pageSize).limit(pageSize).exec()
      const totalCounts = await PostTag.count(queryObj)

      log(tagList, totalCounts)

      let tagObj = {
        list: tagList,
        page: page,
        lastPage: Math.ceil(totalCounts / pageSize),
        pageSize: pageSize,
        totalCounts: totalCounts
      }
      res.send(renderApiData(res, 200, '标签列表获取成功', tagObj))
    } catch (err) {
      res.send(renderApiErr(req, res, 500, err))
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

      if (userInfo.role !== 'super' && userInfo.role !== 'admin') {
        errMsg = '没有操作权限'
      }

      if (errMsg) {
        res.send(renderApiErr(req, res, 500, errMsg))
      }

      await PostTag.remove({ _id: id })
      res.send(renderApiData(res, 200, '删除成功', {}))
    } catch (err) {
      res.send(renderApiErr(req, res, 500, err))
    }
  }
}