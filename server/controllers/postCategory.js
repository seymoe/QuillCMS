import PostCategory from '../models/PostCategory'
import validator from 'validator'
import formidable from 'formidable'
import { log, renderApiData, renderApiErr } from '../../utils/util'

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
      sort_path: fields.sort_path || '0',
      enable: fields.enable
    }

    const newPostCategory = new PostCategory(obj)

    try {
      let cateObj = await newPostCategory.save()
      // 更新sortPath defaultUrl
      let newQuery = {}
      if (fields.parent_id == '0') {
        newQuery.sortPath = '0,' + cateObj._id
      } else {
        let parentObj = await PostCategory.findOne({ '_id': fields.parent_id }, 'sort_path default_url')
        newQuery.sort_path = parentObj.sort_path + "," + cateObj._id
        newQuery.default_url = parentObj.default_url + '/' + fields.default_url
      }
      await PostCategory.findOneAndUpdate({ _id: cateObj._id }, { $set: newQuery })
      res.send(renderApiData(res, 200, 'postCategory', { id: cateObj._id }, 'save'))
    } catch (err) {
      res.send(renderApiErr(req, res, 500, err, 'save'))
    }
  }
}