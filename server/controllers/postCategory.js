import PostCategory from '../models/PostCategory'
import validator from 'validator'
import formidable from 'formidable'
import { log, renderApiData, renderApiErr } from '../../utils/util'
import postCategory from '../api/server/postCategory';

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
      log(fields)
    } catch (err) {
      res.send(renderApiErr(req, res, 500, err, 'checkform'))
    }

    const obj = {
      type: fields.type,
      sort_id: fields.sort_id,
      parent_id: fields.parent_id,
      name: fields.name,
      description: fields.description,
      default_url: fields.default_url,
      sort_path: fields.sort_path,
      enable: fields.enable
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
        newQuery.default_url = parentObj.default_url + '/' + fields.default_url
      }
      await PostCategory.findOneAndUpdate({ _id: cateObj._id }, { $set: newQuery })
      res.send(renderApiData(res, 200, '分类创建成功', { id: cateObj._id }))
    } catch (err) {
      res.send(renderApiErr(req, res, 500, err))
    }
  },

  async getList(req, res, next) {
    try {
      let fields = req.query
      log(fields)
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
      } else {
        queryObj['enable'] = false
      }

      if (type) {
        queryObj['type'] = type
      }
      
      if (mode === 'full') {
        page = 1
        pageSize = 1000
      }

      // 查询文档
      const categoryList = await PostCategory.find(queryObj).sort({sort_id: 1}).skip((page - 1) * pageSize).limit(pageSize).exec()
      const totalCounts = await PostCategory.count(queryObj)

      let cateObj = {
        data: categoryList,
        page: page || 1,
        pageSize: pageSize || 10,
        totalCounts: totalCounts
      }
      res.send(renderApiData(res, 200, '分类列表获取成功', cateObj))
    } catch (err) {
      res.send(renderApiErr(req, res, 500, err))
    }
  }
}