import Advertisement from '../models/Advertisement'
import validator from 'validator'
import shortid from 'shortid'
import { log, renderApiData, renderApiErr, checkCurrentId } from '../../utils/util'

let checkAdsFields = (formData, req) => {
  // 管理员用户以上权限才可以创建标签
  let hasLogin = req.session.userLogined
  let userInfo = req.session.userInfo

  if (!hasLogin || (userInfo.role !== 'super' && userInfo.role !== 'admin')) {
    return false
  }

  let { title, desc, link, cover, enable } = formData
  if (title.length <= 0 || title.length > 40) {
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
   * 创建
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  async createOne(req, res, next) {
    // 校验传入的参数
    let fields = req.body
    try {
      let validateResult = checkAdsFields(fields, req)
      if (!validateResult) {
        return res.status(500).send(renderApiErr(req, res, 500, '数据校验失败'))
      }
    } catch (err) {
      return res.status(500).send(renderApiErr(req, res, 500, err))
    }

    const obj = {
      title: fields.title,
      desc: fields.desc,
      cover: fields.cover,
      link: fields.link,
      enable: fields.enable ? true : false
    }

    const newAd = new Advertisement(obj)

    try {
      let adObj = await newAd.save()
      return res.send(renderApiData(res, 200, '广告创建成功', { id: adObj._id }))
    } catch (err) {
      return res.status(500).send(renderApiErr(req, res, 500, err))
    }
  },

  /**
   * 获取一个广告
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  async getOne(req, res, next) {
    try {
      let targetId = req.params.id
      let queryObj = { _id: targetId }
      const ad = await Advertisement.findOne(queryObj).exec()

      return res.send(renderApiData(res, 200, '获取成功', ad || {}))
    } catch (err) {
      return res.status(500).send(renderApiErr(req, res, 500, err))
    }
  },

  /**
   * 获取广告列表
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

      // 排序
      let sortObj = { data: -1 }

      // 查询文档
      const adList = await Advertisement.find(queryObj).sort(sortObj).skip((page - 1) * pageSize).limit(pageSize).exec()
      const totalCounts = await Advertisement.count(queryObj)

      log(adList, totalCounts)

      let adObj = {
        list: adList,
        page: page,
        lastPage: Math.ceil(totalCounts / pageSize),
        pageSize: pageSize,
        totalCounts: totalCounts
      }
      return res.send(renderApiData(res, 200, '广告列表获取成功', adObj))
    } catch (err) {
      return res.status(500).send(renderApiErr(req, res, 500, err))
    }
  },

  /**
   * 删除一个广告
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
        return res.status().send(renderApiErr(req, res, 500, errMsg))
      }

      await Advertisement.remove({ _id: id })
      return res.send(renderApiData(res, 200, '删除成功', {}))
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
      let validateResult = checkAdsFields(fields, req)
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
      title: fields.title,
      desc: fields.desc,
      cover: fields.cover,
      link: fields.link,
      enable: fields.enable ? true : false
    }

    log(obj)

    try {
      let item_id = fields._id
      await Advertisement.findOneAndUpdate({ _id: item_id }, { $set: obj })
      return res.send(renderApiData(res, 200, '广告更新成功', { id: item_id }))
    } catch (err) {
      return res.status(500).send(renderApiErr(req, res, 500, err))
    }
  }
}