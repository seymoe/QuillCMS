import Post from '../models/Post'
import validator from 'validator'
import shortid from 'shortid'
import { log, renderApiData, renderApiErr, checkCurrentId } from '../../utils/util'

let checkCreatePostFields = (formData, req) => {
  // 管理员用户才可以创建文章
  let hasLogin = req.session.userLogined
  let userInfo = req.session.userInfo
  if (!hasLogin || userInfo.id !== formData.author) {
    return false
  }

  if (!/^quillcms_post_mark_\d{13}$/.test(formData.fakemark)) {
    return false
  }

  if (formData.title.length === 0 
      || formData.title.length > 40 
      || formData.sub_title.length > 40 
      || formData.description.length === 0 
      || formData.description.length > 80
      || formData.content.length === 0) {
    return false
  }
  return true
}

export default {
  /**
   * 获取post数据列表
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
      let isTop = fields.isTop
      let clickSort = fields.click_sort
      // 排序
      let sortObj = { data: -1 }
      if (clickSort === -1 || clickSort === 1) {
        sortObj = { clicks: clickSort }
      }

      // 查询文档
      const postList = await Post.find(queryObj).sort(sortObj).skip((page - 1) * pageSize).limit(pageSize).populate([
        {
          path: 'author',
          select: 'username nickname _id avatar'
        },
        {
          path: 'categories',
          select: 'name _id'
        },
        {
          path: 'tags',
          select: 'name _id'
        }
      ]).exec()
      const totalCounts = await Post.count(queryObj)

      log(postList, totalCounts)

      let postObj = {
        list: postList,
        page: page,
        lastPage: Math.ceil(totalCounts / pageSize),
        pageSize: pageSize,
        totalCounts: totalCounts
      }
      res.send(renderApiData(res, 200, '文章列表获取成功', postObj))
    } catch (err) {
      res.status(500).send(renderApiErr(req, res, 500, err))
    }
  },

  async getListByCateId(req, res, next) {
    try {
      log(req.query)
      let fields = req.query
      let queryObj = {}
      let cateId = fields.cateid
      let page = Number(fields.page) || 1
      let pageSize = Number(fields.pageSize) || 10
      let clickSort = fields.click_sort

      // 判断分类ID是否为有效值
      if (!checkCurrentId(cateId)) {
        res.status(404).send(renderApiErr(req, res, 500, '无效分类ID'))
      } else {
        queryObj['categories'] = cateId
      }

      // 排序
      let sortObj = { data: -1 }
      if (clickSort === -1 || clickSort === 1) {
        sortObj = { clicks: clickSort }
      }

      // 查询文档
      const postList = await Post.find(queryObj).sort(sortObj).skip((page - 1) * pageSize).limit(pageSize).exec()
      const totalCounts = await Post.count(queryObj)

      log(postList, totalCounts)

      let postObj = {
        list: postList,
        page: page,
        lastPage: Math.ceil(totalCounts / pageSize),
        pageSize: pageSize,
        totalCounts: totalCounts
      }
      res.send(renderApiData(res, 200, '文章列表获取成功', tagObj))
    } catch (err) {
      res.status(500).send(renderApiErr(req, res, 500, err))
    }
  },

  /**
   * 创建一篇文章
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  async createOne(req, res, next) {
    // 校验传入的参数
    let fields = req.body
    try {
      let validateResult = checkCreatePostFields(fields, req)
      if (!validateResult) {
        res.status(500).send(renderApiErr(req, res, 500, '数据校验失败'))
      }
    } catch (err) {
      res.status(500).send(renderApiErr(req, res, 500, err))
    }

    const obj = {
      title: fields.title,
      sub_title: fields.sub_title,
      description: fields.description,
      cover: fields.cover,
      content: fields.content,
      auth: fields.auth === 'secret' ? 'secret' : 'public',
      state: fields.state === 'draft' ? 'draft' : 'published',
      isTop: fields.isTop === false ? false : true ,
      from: fields.from === '1' ? 1 : 0,
      categories: fields.categories,
      tags: fields.tags,
      content_type: fields.content_type === 'T' ? 'T' : 'M',
      author: fields.author,
      clicks: 0,
      likes: 0
    }

    log(obj)

    const newPost = new Post(obj)

    try {
      let postObj = await newPost.save()
      res.send(renderApiData(res, 200, '文章创建成功', { id: postObj._id }))
    } catch (err) {
      res.status(500).send(renderApiErr(req, res, 500, err))
    }
  },

  /**
   * 获取一篇文章
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */
  getOne(req, res, next) {
    return true
  },

  /**
   * 删除一篇文章
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
        res.send(renderApiErr(req, res, 500, errMsg))
      }

      await Post.remove({ _id: id })
      res.send(renderApiData(res, 200, '删除成功', {}))
    } catch (err) {
      res.send(renderApiErr(req, res, 500, err))
    }
  }
}