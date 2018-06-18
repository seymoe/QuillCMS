import Post from '../models/Post'
import PostTag from '../models/PostTag'
import validator from 'validator'
import shortid from 'shortid'
import marked from 'marked'
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
      let page = Number(fields.page) || 1
      let pageSize = Number(fields.limit) || 10
      let isTop = fields.isTop  // 是否置顶
      let sortBy = fields.sortBy  // 排序参数
      let mode = fields.mode  // 返回数据的模式 simple normal
      let cateId = fields.cateId  // 分类id
      let tagName = fields.tagName  // 文章标签
      let state = fields.state  // 文章状态 published draft
      let user = fields.user  // 用户ID
      let from = fields.from  // 文章类型 1 0
      let searchKey = fields.searchKey  // 搜索词

      // 查询参数配置
      let queryObj = { auth: 'public' }, sortObj = { create_time: -1 }, files = null, postList = [], totalCounts = 0

      if (isTop) {
        queryObj.isTop = true
      }

      // 排序
      if (sortBy) {
        delete sortObj.create_time
        sortObj[sortBy] = -1
      }

      // 搜索
      if (searchKey) {
        let reKey = new RegExp(searchKey, 'i')
        queryObj.content = { $regex: reKey }
        queryObj.from = 0
      }

      // 文章分类
      if (cateId && cateId !== 'AppIndex') {
        queryObj.categories = cateId
      }

      // 文章标签
      if (tagName) {
        let targetTag = await PostTag.findOne({ name: tagName })
        if (targetTag) {
          queryObj.tags = targetTag._id
          // 如果有标签，则查询全部类别
          delete queryObj.categories
        }
      }

      // 文章状态
      if (state === 'draft') {
        queryObj.state = 'draft'
      } else {
        queryObj.state = 'published'
      }

      // 文章类型
      if (from === 1 || from === 0) {
        queryObj.from = from
      }

      // 返回的字段
      if (mode === 'simple') {
        files = {
          _id: 1,
          title: 1,
          cover: 1,
          create_time: 1
        }
      } else if (mode === 'normal') {
        files = {
          _id: 1,
          title: 1,
          cover: 1,
          description: 1,
          author: 1,
          categories: 1,
          tags: 1,
          likesNum: 1,
          clicksNum: 1,
          collectionsNum: 1,
          create_time: 1
        }
      }

      // 查询文档
      if (mode === 'simple') {
        postList = await Post.find(queryObj, files).sort(sortObj).skip((page - 1) * pageSize).limit(pageSize).exec()
      } else {
        postList = await Post.find(queryObj, files).sort(sortObj).skip((page - 1) * pageSize).limit(pageSize).populate([
          {
            path: 'author',
            select: 'nickname _id avatar'
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
      }
      totalCounts = await Post.count(queryObj)

      let postObj = {
        list: postList,
        page: page,
        lastPage: Math.ceil(totalCounts / pageSize),
        searchKey: searchKey || '',
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
      isTop: fields.isTop === false ? false : true,
      from: fields.from === '1' ? 1 : 0,
      categories: fields.categories,
      tags: fields.tags,
      content_type: fields.content_type === 'T' ? 'T' : 'M',
      author: fields.author
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
  async getOne(req, res, next) {
    try {
      let targetId = req.params.id
      let queryObj = { _id: targetId }

      const content = await Post.findOneAndUpdate(queryObj, { '$inc': { 'clicksNum': 1 } }).populate([
        {
          path: 'author',
          select: 'nickname _id'
        },
        {
          path: 'tags',
          select: 'name _id'
        },
        {
          path: 'categories',
          select: 'name _id'
        }]
      ).exec()

      if (content.content) {
        content.content = marked(content.content)
      }

      res.send(renderApiData(res, 200, '获取成功', content || {}))
    } catch (err) {
      res.status(500).send(renderApiErr(req, res, 500, err))
    }
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