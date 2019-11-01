import PostCategory from '../models/PostCategory'
import validator from 'validator'
import shortid from 'shortid'
import { log, renderApiData, renderApiErr, checkCurrentId } from '../utils'
import valiObj from '../../utils/validate'

// 校验创建分类的参数
let checkCateFields = (formData, req) => {
  // 超级管理员用户才可以创建分类
  let hasLogin = req.session.userLogined
  let userInfo = req.session.userInfo

  if (!hasLogin || userInfo.role !== 'super') {
    return false
  }

  let { name, description, default_url, sort_id, type, parent_id, enable } = formData

  if (name.length <= 0 || name.length > 10) {
    return false
  } else if (description.length > 40) {
    return false
  } else if (!/^[a-zA-Z0-9_-]{1,32}$/.test(default_url)) {
    return false
  } else if (Number(sort_id) <= 0) {
    return false
  } else if (type !== 1 && type !== 2 && type !== 3) {
    return false
  } else if (!shortid.isValid(parent_id) && parent_id !== '0') {
    return false
  }

  return true
}

export default {
  /**
   * 创建分类
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  async createOne(req, res, next) {
    // 校验传入的参数
    let fields = req.body
    try {
      let validateResult = checkCateFields(fields, req)
      if (!validateResult) {
        return res.status(500).send(renderApiErr(req, res, 500, '数据校验失败'))
      }
    } catch (err) {
      return res.status(500).send(renderApiErr(req, res, 500, err))
    }

    const obj = {
      type: fields.type,
      sort_id: fields.sort_id,
      parent_id: fields.parent_id,
      name: fields.name,
      description: fields.description,
      default_url: fields.default_url,
      enable: fields.enable ? true : false
    }

    const newPostCategory = new PostCategory(obj)

    try {
      let cateObj = await newPostCategory.save()
      // 更新sortPath defaultUrl
      let newQuery = {}
      if (fields.parent_id === '0') {
        newQuery.sort_path = '0,' + cateObj._id
      } else {
        let parentObj = await PostCategory.findOne({ '_id': fields.parent_id }, 'sort_path default_url')
        log('parentObj ', parentObj)
        newQuery.sort_path = parentObj.sort_path + "," + cateObj._id
        newQuery.default_url = parentObj.default_url + '-' + fields.default_url
      }
      await PostCategory.findOneAndUpdate({ _id: cateObj._id }, { $set: newQuery })
      return res.send(renderApiData(req, res, 200, '分类创建成功', { id: cateObj._id }))
    } catch (err) {
      return res.status(500).send(renderApiErr(req, res, 500, err))
    }
  },

  /**
   * 获取分类列表
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  async getList(req, res, next) {
    try {
      let fields = req.query
      let queryObj = {}
      let page = Number(fields.page) || 1
      let pageSize = Number(fields.pageSize) || 10
      let mode = fields.mode  // 模式 full/simple
      let parent_id = fields.parent_id  // 父级分类ID
      let enable = fields.enable  // 是否启用
      let type = fields.type

      if (parent_id) {
        queryObj['parent_id'] = parent_id
      }

      if (enable === 'true') {
        queryObj['enable'] = true
      }

      if (type) {
        queryObj['type'] = type
      }

      if (mode === 'full') {
        page = 1
        pageSize = 1000
      }

      log(queryObj)

      // 查询文档
      const categoryList = await PostCategory.find(queryObj).sort({ sort_id: -1 }).skip((page - 1) * pageSize).limit(pageSize).exec()
      const totalCounts = await PostCategory.count(queryObj)

      let cateObj = {
        list: categoryList,
        page: page,
        lastPage: Math.ceil(totalCounts / pageSize),
        pageSize: pageSize,
        totalCounts: totalCounts
      }
      return res.send(renderApiData(req, res, 200, '分类列表获取成功', cateObj))
    } catch (err) {
      return res.status(500).send(renderApiErr(req, res, 500, err))
    }
  },

  /**
   * 删除分类 可同时删除多个
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  async deleteOne(req, res, next) {
    try {
      let errMsg = ''
      let id = req.params.id
      log(id)
      if (!shortid.isValid(id)) {
        errMsg = 'ID格式校验失败'
      }
      if (errMsg) {
        return res.status(500).send(renderApiErr(req, res, 500, errMsg))
      }

      // 判断该分类是否含有下级分类，如果存在，强制删除下级分类才可删除该分类
      let subCateCount = await PostCategory.count({parent_id: id})
      if (subCateCount > 0) {
        errMsg = '请先删除下级分类再删除该分类'
      }
      if (errMsg) {
        return res.status(500).send(renderApiErr(req, res, 500, errMsg))
      }

      await PostCategory.remove({ _id: id })
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
      let validateResult = checkCateFields(fields, req)
      if (!validateResult) {
        return res.status(500).send(renderApiErr(req, res, 500, '数据校验失败'))
      }
      // 如果id不合法，则返回校验失败
      if (!shortid.isValid(fields._id)) {
        return res.status(500).send(renderApiErr(req, res, 500, '数据校验失败'))
      }
    } catch (err) {
      return res.status(500).send(renderApiErr(req, res, 500, err))
    }

    const obj = {
      type: fields.type,
      sort_id: fields.sort_id,
      name: fields.name,
      description: fields.description,
      default_url: fields.default_url,
      enable: fields.enable ? true : false
    }

    log(obj)

    try {
      let item_id = fields._id
      await PostCategory.findOneAndUpdate({ _id: item_id }, { $set: obj })
      return res.send(renderApiData(req, res, 200, '分类更新成功', { id: item_id }))
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
      const cate = await PostCategory.findOne(queryObj).exec()

      return res.send(renderApiData(req, res, 200, '获取成功', cate || {}))
    } catch (err) {
      return res.status(500).send(renderApiErr(req, res, 500, err))
    }
  }
}